import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log In",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <>
      <PageHeader title="Log In" description="Sign in to manage your orders and account." crumbs={[{ label: "Log In" }]} />
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
        <LoginForm />
      </div>
    </>
  );
}
