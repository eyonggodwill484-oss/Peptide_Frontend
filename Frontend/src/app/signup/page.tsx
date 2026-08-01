import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  robots: { index: false },
};

export default function SignupPage() {
  return (
    <>
      <PageHeader
        title="Sign Up"
        description="Create an account to track orders and speed through checkout."
        crumbs={[{ label: "Sign Up" }]}
      />
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
        <SignupForm />
      </div>
    </>
  );
}
