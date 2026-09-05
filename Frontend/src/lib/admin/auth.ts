import { createServerSupabaseClient } from "@/lib/supabase/server";

function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Minimal admin gate: no roles table exists yet, so admin access is a hardcoded
 * allow-list of Supabase Auth emails (ADMIN_EMAILS, comma-separated). Good enough
 * until there's an actual staff-accounts system to build against.
 */
export async function getAdminUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;

  const adminEmails = getAdminEmails();
  if (adminEmails.length === 0 || !adminEmails.includes(user.email.toLowerCase())) {
    return null;
  }

  return user;
}
