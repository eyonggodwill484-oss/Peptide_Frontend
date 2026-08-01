import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { signOutAction } from "@/lib/supabase/auth-actions";

export const metadata: Metadata = {
  title: "My Account",
  robots: { index: false, follow: true },
};

export default async function AccountPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(ROUTES.login);

  const fullName = typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : null;

  return (
    <>
      <PageHeader title="My Account" crumbs={[{ label: "My Account" }]} />

      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border p-6">
          <p className="text-sm text-muted-foreground">Signed in as</p>
          <p className="text-lg font-semibold text-foreground">{fullName ?? user.email}</p>
          {fullName && <p className="text-sm text-muted-foreground">{user.email}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/account/orders">Order History</Link>
          </Button>
          <form action={signOutAction}>
            <Button type="submit" variant="ghost">
              Log Out
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
