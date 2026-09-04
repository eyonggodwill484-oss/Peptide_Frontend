import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { RESEARCH_USE_DISCLAIMER, SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of the ${SITE_NAME} website and purchase of research products.`,
};

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of Service" description="Last updated July 2026" crumbs={[{ label: "Terms" }]} />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <RevealGroup className="flex flex-col gap-8 text-sm leading-relaxed text-muted-foreground">
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Product Guidelines & Intended Use</h2>
            <p>{RESEARCH_USE_DISCLAIMER}</p>
          </RevealItem>
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Eligibility & Responsible Use</h2>
            <p>
              By purchasing from {SITE_NAME}, you represent that you are at least 18 years of age and that all products will be utilized responsibly according to their packaging, dosage directions, and intended regulatory context. Dedicated research-grade compounds must be handled in controlled environments by qualified personnel.
            </p>
          </RevealItem>
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Orders and Payment</h2>
            <p>
              All prices are listed in EUR and are subject to change without notice. We reserve the right to refuse
              or cancel any order at our discretion, including orders that appear to violate our research-use
              policy.
            </p>
          </RevealItem>
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Limitation of Liability</h2>
            <p>
              {SITE_NAME} is not liable for any misuse of products outside their intended research application. All
              products are sold &ldquo;as is&rdquo; for laboratory research purposes only, with quality documented via the
              accompanying certificate of analysis.
            </p>
          </RevealItem>
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Intellectual Property</h2>
            <p>
              All content on this site, including product descriptions, images, and branding, is the property of{" "}
              {SITE_NAME} and may not be reproduced without written permission.
            </p>
          </RevealItem>
        </RevealGroup>
      </div>
    </>
  );
}
