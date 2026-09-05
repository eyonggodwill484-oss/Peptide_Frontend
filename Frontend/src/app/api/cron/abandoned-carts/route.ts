import { NextResponse } from "next/server";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { sendCartRecoveryEmail } from "@/lib/email/send";
import { SITE_URL } from "@/constants/site";
import type { CartSnapshotItem } from "@/types/database.types";

export const maxDuration = 60;

const HOUR_MS = 60 * 60 * 1000;

// [minimum age before this stage fires, discount code to attach]
const STAGES: { minAgeMs: number; discountCode: string | null; discountPercent: number | null }[] = [
  { minAgeMs: 1 * HOUR_MS, discountCode: null, discountPercent: null },
  { minAgeMs: 24 * HOUR_MS, discountCode: "COMEBACK10", discountPercent: 10 },
  { minAgeMs: 72 * HOUR_MS, discountCode: "COMEBACK15", discountPercent: 15 },
];

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminSupabaseClient();
  const now = Date.now();

  const { data: sessions, error } = await admin
    .from("cart_sessions")
    .select("*")
    .is("recovered_at", null)
    .is("unsubscribed_at", null)
    .lt("recovery_stage", STAGES.length);

  if (error) {
    console.error("Failed to load cart sessions:", error);
    return NextResponse.json({ error: "Failed to load cart sessions." }, { status: 500 });
  }

  let sent = 0;
  let skipped = 0;

  for (const session of sessions ?? []) {
    const stageIndex = session.recovery_stage;
    const stage = STAGES[stageIndex];
    if (!stage) continue;

    const ageMs = now - new Date(session.last_active_at).getTime();
    if (ageMs < stage.minAgeMs) {
      skipped++;
      continue;
    }

    // An order may have come in for this email between cron runs even if the
    // checkout route didn't mark it recovered (e.g. order placed under a slightly
    // different flow) — double-check before spending a send.
    const { data: existingOrder } = await admin
      .from("orders")
      .select("id, customers!inner(email)")
      .eq("customers.email", session.email)
      .gte("created_at", session.last_active_at)
      .limit(1)
      .maybeSingle();

    if (existingOrder) {
      await admin.from("cart_sessions").update({ recovered_at: new Date().toISOString() }).eq("id", session.id);
      continue;
    }

    const items = (session.items as CartSnapshotItem[]).map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const result = await sendCartRecoveryEmail(session.email, session.id, {
      stage: (stageIndex + 1) as 1 | 2 | 3,
      items,
      subtotal: session.subtotal,
      discountCode: stage.discountCode ?? undefined,
      discountPercent: stage.discountPercent ?? undefined,
      unsubscribeUrl: `${SITE_URL}/api/cart/unsubscribe?id=${session.id}`,
    });

    if (result.ok) {
      sent++;
      await admin
        .from("cart_sessions")
        .update({ recovery_stage: stageIndex + 1, last_recovery_sent_at: new Date().toISOString() })
        .eq("id", session.id);
    }
  }

  return NextResponse.json({ ok: true, sent, skipped, checked: sessions?.length ?? 0 });
}
