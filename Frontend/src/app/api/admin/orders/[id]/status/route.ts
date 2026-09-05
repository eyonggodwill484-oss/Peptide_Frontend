import { NextResponse } from "next/server";

import { getAdminUser } from "@/lib/admin/auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { sendOrderStatusEmail } from "@/lib/email/send";
import type { OrderStatus, PaymentStatus } from "@/types/database.types";

const STATUS_TO_EMAIL_KIND: Partial<Record<OrderStatus, "shipped" | "delivered" | "cancelled" | "refunded">> = {
  shipped: "shipped",
  delivered: "delivered",
  cancelled: "cancelled",
  refunded: "refunded",
};

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const status = body?.status as OrderStatus | undefined;
  const paymentStatus = body?.paymentStatus as PaymentStatus | undefined;
  const trackingNumber = typeof body?.trackingNumber === "string" ? body.trackingNumber : undefined;

  if (!status && !paymentStatus) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  const db = createAdminSupabaseClient();

  const update: { status?: OrderStatus; payment_status?: PaymentStatus } = {};
  if (status) update.status = status;
  if (paymentStatus) update.payment_status = paymentStatus;

  const { data: order, error } = await db
    .from("orders")
    .update(update)
    .eq("id", id)
    .select("id, order_number, customers(email, full_name)")
    .single();

  if (error || !order) {
    console.error("Failed to update order status:", error);
    return NextResponse.json({ error: "Failed to update order." }, { status: 502 });
  }

  const customer = Array.isArray(order.customers) ? order.customers[0] : order.customers;
  if (!customer?.email) {
    return NextResponse.json({ ok: true, emailSent: false });
  }

  let emailSent = false;
  if (paymentStatus === "paid") {
    await sendOrderStatusEmail(customer.email, order.id, {
      customerName: customer.full_name,
      orderNumber: order.order_number,
      kind: "paid",
    });
    emailSent = true;
  } else if (status && STATUS_TO_EMAIL_KIND[status]) {
    await sendOrderStatusEmail(customer.email, order.id, {
      customerName: customer.full_name,
      orderNumber: order.order_number,
      kind: STATUS_TO_EMAIL_KIND[status]!,
      trackingNumber,
    });
    emailSent = true;
  }

  return NextResponse.json({ ok: true, emailSent });
}
