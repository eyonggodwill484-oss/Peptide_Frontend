import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Cold-chain shipping, delivery timelines, and order tracking information.",
};

export default function ShippingPage() {
  return (
    <>
      <PageHeader title="Shipping Policy" crumbs={[{ label: "Shipping" }]} />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <RevealGroup className="flex flex-col gap-8 text-sm leading-relaxed text-muted-foreground">
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Cold-Chain Fulfillment</h2>
            <p>
              Temperature-sensitive orders ship with gel packs or dry ice inside insulated packaging to maintain
              product integrity in transit. Packaging is selected automatically based on your order contents and
              destination.
            </p>
          </RevealItem>
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Delivery Timelines</h2>
            <p>
              Orders placed before 2:00 PM EST ship the same business day. Domestic orders typically arrive within
              1–3 business days via tracked overnight or two-day courier service. International orders typically
              arrive within 5–10 business days depending on destination and customs processing.
            </p>
          </RevealItem>
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Shipping Rates</h2>
            <p>
              Standard shipping is calculated at checkout based on order weight and destination. Orders over $150
              qualify for free standard shipping within the continental United States.
            </p>
          </RevealItem>
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Order Tracking</h2>
            <p>
              A tracking number is emailed as soon as your order ships. You can also view order status from your
              account&apos;s order history at any time.
            </p>
          </RevealItem>
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">International Orders</h2>
            <p>
              We ship to 42 countries. International customers are responsible for any customs duties, import taxes,
              or fees assessed by their local authorities upon arrival.
            </p>
          </RevealItem>
        </RevealGroup>
      </div>
    </>
  );
}
