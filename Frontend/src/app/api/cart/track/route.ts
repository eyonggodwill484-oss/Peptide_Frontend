import { NextResponse } from "next/server";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { SITE_CURRENCY } from "@/constants/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type TrackBody = {
  email: string;
  items: { productId: string; slug: string; name: string; price: number; quantity: number; image?: string }[];
  subtotal: number;
};

/**
 * Called from the checkout email field (on blur) so we have an email-to-cart pairing
 * before the order is placed — the only way abandoned-cart recovery can work, since the
 * cart itself is anonymous browser state until now. Silently no-ops on bad input; this
 * is a background tracking call, never something that should surface an error to the
 * shopper.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as TrackBody | null;

  if (!body?.email || !EMAIL_RE.test(body.email) || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  let admin;
  try {
    admin = createAdminSupabaseClient();
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  const email = body.email.trim().toLowerCase();

  const { error } = await admin.from("cart_sessions").upsert(
    {
      email,
      items: body.items.map((item) => ({
        productId: item.productId,
        slug: item.slug,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image ?? null,
      })),
      subtotal: body.subtotal,
      currency: SITE_CURRENCY,
      last_active_at: new Date().toISOString(),
      recovery_stage: 0,
      last_recovery_sent_at: null,
      recovered_at: null,
    },
    { onConflict: "email" }
  );

  if (error) {
    console.error("Failed to track cart session:", error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true });
}
