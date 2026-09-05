import { NextResponse } from "next/server";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code.trim() : "";
  const subtotal = typeof body?.subtotal === "number" ? body.subtotal : 0;

  if (!code) {
    return NextResponse.json({ valid: false }, { status: 200 });
  }

  try {
    const admin = createAdminSupabaseClient();
    const { data } = await admin.rpc("peek_discount_code", { p_code: code });

    if (!data) {
      return NextResponse.json({ valid: false });
    }

    const discountAmount = data.type === "percent" ? Math.round(subtotal * (data.value / 100) * 100) / 100 : data.value;

    return NextResponse.json({ valid: true, code: data.code, type: data.type, value: data.value, discountAmount });
  } catch (err) {
    console.error("Failed to validate discount code:", err);
    return NextResponse.json({ valid: false }, { status: 200 });
  }
}
