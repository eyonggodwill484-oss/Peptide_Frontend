import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CONTACT_EMAIL, SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, and protects your information.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" description="Last updated July 2026" crumbs={[{ label: "Privacy" }]} />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <RevealGroup className="flex flex-col gap-8 text-sm leading-relaxed text-muted-foreground">
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Information We Collect</h2>
            <p>
              We collect information you provide directly, including name, email, shipping address, and payment
              details when you place an order, contact support, or create an account. We also collect standard
              technical data such as IP address and browser type to secure and operate the site.
            </p>
          </RevealItem>
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">How We Use Information</h2>
            <p>
              Information is used to process orders, provide customer support, maintain account security, and
              communicate order and shipping updates. We do not sell customer data to third parties.
            </p>
          </RevealItem>
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Payment Processing</h2>
            <p>
              Payment card data is processed by PCI-compliant third-party payment processors. {SITE_NAME} does not
              store full payment card numbers on its own servers.
            </p>
          </RevealItem>
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Data Retention</h2>
            <p>
              Order and account records are retained as required for tax, compliance, and warranty purposes. You may
              request deletion of your account data at any time, subject to legal recordkeeping requirements.
            </p>
          </RevealItem>
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal information by contacting{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </RevealItem>
        </RevealGroup>
      </div>
    </>
  );
}
