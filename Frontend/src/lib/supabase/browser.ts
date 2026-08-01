import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** Session-aware client for use in Client Components (login/signup forms, auth state). */
export function createBrowserSupabaseClient() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
