import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Server-only client authenticated with the service_role key — bypasses RLS.
 * Never import this from a Client Component or anything bundled to the browser.
 * Used for order/customer writes, cart-session tracking, and the abandoned-cart cron,
 * none of which the anon key is allowed to touch.
 */
export function createAdminSupabaseClient() {
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set — required for order/email operations.");
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
