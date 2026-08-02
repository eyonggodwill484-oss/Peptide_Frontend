import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CONTACT_EMAIL } from "@/constants/site";

export const metadata: Metadata = {
  title: "Returns Policy",
  description: "Our returns policy for temperature-sensitive research compounds.",
};

export default function ReturnsPage() {
  return (
    <>
      <PageHeader title="Returns Policy" crumbs={[{ label: "Returns" }]} />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <RevealGroup className="flex flex-col gap-8 text-sm leading-relaxed text-muted-foreground">
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Eligibility</h2>
            <p>
              Due to the temperature-sensitive nature of research compounds, we accept returns only in the following
              cases: verified shipping damage, fulfillment errors (wrong item or quantity shipped), or a failed
              cold-chain delivery confirmed by temperature indicator data.
            </p>
          </RevealItem>
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Reporting Window</h2>
            <p>
              Claims must be reported within 48 hours of delivery with photos of the packaging, product, and any
              temperature indicators included in your shipment. Claims submitted after this window cannot be
              honored.
            </p>
          </RevealItem>
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Non-Returnable Items</h2>
            <p>
              Products that have been reconstituted, opened, or stored outside of the recommended conditions cannot
              be returned. Lab accessories and consumables are non-returnable once the packaging has been opened.
            </p>
          </RevealItem>
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Resolution</h2>
            <p>
              Approved claims are resolved with a replacement shipment or a full refund to the original payment
              method, at your preference. Refunds are processed within 5–7 business days of approval.
            </p>
          </RevealItem>
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">EU / UK Right of Withdrawal</h2>
            <p>
              Customers ordering from the European Union or United Kingdom have the right to withdraw from an order
              within 14 calendar days of delivery without giving a reason, provided the item is unopened, unused, and
              in its original sealed packaging. As with all orders, this right does not apply once temperature-sensitive
              or reconstituted products have been opened or removed from their sealed packaging, consistent with the
              Non-Returnable Items policy above, since these goods cannot be resold once their cold-chain seal is
              broken. To withdraw from an eligible order, contact us using the details below within the 14-day window;
              approved withdrawals are refunded to the original payment method within 14 days of receiving the
              returned item.
            </p>
          </RevealItem>
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">Filing a Claim</h2>
            <p>
              Email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                {CONTACT_EMAIL}
              </a>{" "}
              with your order number and supporting documentation to begin the process.
            </p>
          </RevealItem>
        </RevealGroup>
      </div>
    </>
  );
}
