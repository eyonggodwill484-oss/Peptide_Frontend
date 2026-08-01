"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signUpAction, type AuthActionState } from "@/lib/supabase/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/constants/routes";

const initialState: AuthActionState = { error: null };

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signUpAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" name="fullName" required placeholder="Jane Doe" autoComplete="name" />
      </div>
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
          minLength={8}
          placeholder="At least 8 characters"
          autoComplete="new-password"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </div>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state.message && <p className="text-sm text-foreground">{state.message}</p>}
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Creating account…" : "Sign Up"}
      </Button>
      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href={ROUTES.login} className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
