"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signInAction, type AuthActionState } from "@/lib/supabase/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/constants/routes";

const initialState: AuthActionState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signInAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="you@lab.edu" autoComplete="email" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </div>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Logging in…" : "Log In"}
      </Button>
      <p className="text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href={ROUTES.signup} className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
