"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

/** Reactive auth state for Client Components — avoids reading cookies in the root layout, which would force every page to render dynamically. */
export function useAuthUser() {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return { user, loading, supabase };
}
