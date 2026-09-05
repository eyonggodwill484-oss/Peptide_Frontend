import { NextResponse } from "next/server";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** One-click unsubscribe link from cart-recovery emails. Low-stakes action (stops a
 *  reminder sequence), so a bare cart_session id in the URL is an acceptable token. */
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");

  if (!id || !UUID_RE.test(id)) {
    return new NextResponse("Invalid unsubscribe link.", { status: 400 });
  }

  try {
    const admin = createAdminSupabaseClient();
    await admin.from("cart_sessions").update({ unsubscribed_at: new Date().toISOString() }).eq("id", id);
  } catch (err) {
    console.error("Failed to process unsubscribe:", err);
  }

  return new NextResponse(
    "<!doctype html><html><body style=\"font-family:sans-serif;text-align:center;padding:64px 24px;\">" +
      "<h1>You've been unsubscribed</h1><p>We won't send any more reminders about that cart.</p></body></html>",
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
