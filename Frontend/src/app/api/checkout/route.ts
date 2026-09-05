import { NextResponse } from "next/server";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { sendOrderConfirmationEmail } from "@/lib/email/send";
import { MINIMUM_ORDER_AMOUNT } from "@/constants/payment";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type CheckoutItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

type CheckoutBody = {
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address1: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  items: CheckoutItem[];
  subtotal: number;
  shipping: { name: string; price: number };
  discountCode?: string;
  total: number;
  paymentMethod: "crypto" | "remitly";
};

function generateOrderNumber(): string {
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `MPS-${rand}`;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as CheckoutBody | null;

  if (
    !body?.customer?.email ||
    !EMAIL_RE.test(body.customer.email) ||
    !body.customer.fullName ||
    !Array.isArray(body.items) ||
    body.items.length === 0 ||
    typeof body.total !== "number" ||
    typeof body.subtotal !== "number" ||
    body.subtotal < MINIMUM_ORDER_AMOUNT
  ) {
    return NextResponse.json({ error: "Missing or invalid checkout fields." }, { status: 400 });
  }

  let admin;
  try {
    admin = createAdminSupabaseClient();
  } catch {
    // No service role key configured yet — fail soft so checkout still completes locally.
    return NextResponse.json({ error: "Order service unavailable." }, { status: 503 });
  }

  const email = body.customer.email.trim().toLowerCase();

  const { data: customer, error: customerError } = await admin
    .from("customers")
    .upsert(
      {
        full_name: body.customer.fullName,
        email,
        phone: body.customer.phone,
        address_line1: body.customer.address1,
        city: body.customer.city,
        state: body.customer.state ?? null,
        postal_code: body.customer.postalCode,
        country: body.customer.country,
      },
      { onConflict: "email" }
    )
    .select("id")
    .single();

  if (customerError || !customer) {
    console.error("Failed to upsert customer:", customerError);
    return NextResponse.json({ error: "Failed to save order." }, { status: 502 });
  }

  let discountAmount = 0;
  let appliedDiscountCode: string | null = null;
  if (body.discountCode) {
    const { data: redeemed } = await admin.rpc("redeem_discount_code", { p_code: body.discountCode });
    if (redeemed) {
      appliedDiscountCode = redeemed.code;
      discountAmount =
        redeemed.type === "percent" ? Math.round(body.subtotal * (redeemed.value / 100) * 100) / 100 : redeemed.value;
    }
  }

  const total = Math.max(0, body.subtotal + body.shipping.price - discountAmount);

  let order: { id: string; order_number: string } | null = null;
  for (let attempt = 0; attempt < 5 && !order; attempt++) {
    const orderNumber = generateOrderNumber();
    const { data, error } = await admin
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_id: customer.id,
        payment_method: body.paymentMethod,
        subtotal: body.subtotal,
        shipping_fee: body.shipping.price,
        discount_code: appliedDiscountCode,
        discount_amount: discountAmount,
        total,
        shipping_address: {
          name: body.customer.fullName,
          addressLine1: body.customer.address1,
          city: body.customer.city,
          state: body.customer.state ?? null,
          postalCode: body.customer.postalCode,
          country: body.customer.country,
          phone: body.customer.phone,
        },
      })
      .select("id, order_number")
      .single();

    if (!error && data) {
      order = data;
      break;
    }
    // Unique violation on order_number — regenerate and retry; anything else, bail out.
    if (error && error.code !== "23505") {
      console.error("Failed to create order:", error);
      return NextResponse.json({ error: "Failed to save order." }, { status: 502 });
    }
  }

  if (!order) {
    return NextResponse.json({ error: "Failed to allocate an order number." }, { status: 502 });
  }

  const lineItems = body.items.map((item) => ({
    order_id: order!.id,
    product_id: UUID_RE.test(item.productId) ? item.productId : null,
    product_name: item.name,
    unit_price: item.price,
    quantity: item.quantity,
    line_total: item.price * item.quantity,
  }));

  const { error: itemsError } = await admin.from("order_items").insert(lineItems);
  if (itemsError) {
    console.error("Failed to save order items:", itemsError);
  }

  // Stop any in-flight abandoned-cart recovery sequence for this email.
  await admin
    .from("cart_sessions")
    .update({ recovered_at: new Date().toISOString() })
    .eq("email", email)
    .is("recovered_at", null);

  await sendOrderConfirmationEmail(email, order.id, {
    customerName: body.customer.fullName,
    orderNumber: order.order_number,
    items: body.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.price,
      lineTotal: item.price * item.quantity,
    })),
    subtotal: body.subtotal,
    shippingFee: body.shipping.price,
    shippingName: body.shipping.name,
    discountAmount,
    total,
    paymentMethod: body.paymentMethod,
  });

  return NextResponse.json({ orderNumber: order.order_number, orderId: order.id, discountAmount });
}
