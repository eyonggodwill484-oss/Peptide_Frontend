import { Button, Column, Row, Section, Text } from "@react-email/components";

import { formatPrice } from "@/lib/format-currency";
import { SITE_URL } from "@/constants/site";
import { EmailLayout } from "./layout";

export type CartRecoveryItem = {
  name: string;
  quantity: number;
  price: number;
};

export type CartRecoveryProps = {
  stage: 1 | 2 | 3;
  items: CartRecoveryItem[];
  subtotal: number;
  discountCode?: string;
  discountPercent?: number;
  unsubscribeUrl: string;
};

const STAGE_COPY: Record<1 | 2 | 3, { subject: string; headline: string; body: string }> = {
  1: {
    subject: "You left something in your cart",
    headline: "Still thinking it over?",
    body: "Your cart is saved and ready whenever you are — here's what's waiting for you.",
  },
  2: {
    subject: "10% off what's in your cart",
    headline: "Here's 10% off to help you decide",
    body: "Your cart is still saved. Use the code below at checkout to save on your order.",
  },
  3: {
    subject: "Last chance — 15% off your cart",
    headline: "Final reminder: 15% off",
    body: "This is the last reminder we'll send about this cart. Use the code below before it expires.",
  },
};

export function CartRecoveryEmail({ stage, items, subtotal, discountCode, discountPercent, unsubscribeUrl }: CartRecoveryProps) {
  const copy = STAGE_COPY[stage];

  return (
    <EmailLayout preview={copy.subject}>
      <Text style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>{copy.headline}</Text>
      <Text style={{ fontSize: "14px", color: "#374151", lineHeight: "22px" }}>{copy.body}</Text>

      <Section style={{ marginTop: "20px" }}>
        {items.map((item, i) => (
          <Row key={i} style={{ marginBottom: "8px" }}>
            <Column>
              <Text style={{ fontSize: "13px", color: "#111827", margin: 0, fontWeight: 600 }}>{item.name}</Text>
              <Text style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Qty {item.quantity}</Text>
            </Column>
            <Column align="right">
              <Text style={{ fontSize: "13px", color: "#111827", margin: 0, fontWeight: 600 }}>
                {formatPrice(item.price * item.quantity)}
              </Text>
            </Column>
          </Row>
        ))}
      </Section>

      <Row style={{ marginTop: "8px" }}>
        <Column><Text style={{ fontSize: "14px", fontWeight: 800, color: "#111827" }}>Subtotal</Text></Column>
        <Column align="right"><Text style={{ fontSize: "14px", fontWeight: 800, color: "#111827" }}>{formatPrice(subtotal)}</Text></Column>
      </Row>

      {discountCode && (
        <Section style={{ marginTop: "16px", backgroundColor: "#ecfdf5", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
          <Text style={{ fontSize: "12px", color: "#065f46", margin: "0 0 6px" }}>
            Use this code for {discountPercent}% off
          </Text>
          <Text style={{ fontSize: "18px", fontWeight: 800, color: "#065f46", letterSpacing: "2px", margin: 0 }}>
            {discountCode}
          </Text>
        </Section>
      )}

      <Button
        href={`${SITE_URL}/checkout`}
        style={{
          marginTop: "20px",
          backgroundColor: "#111827",
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: 700,
          padding: "12px 20px",
          borderRadius: "10px",
          textDecoration: "none",
        }}
      >
        Return to checkout
      </Button>

      <Text style={{ fontSize: "11px", color: "#9ca3af", marginTop: "24px" }}>
        Don&apos;t want these reminders?{" "}
        <a href={unsubscribeUrl} style={{ color: "#9ca3af" }}>
          Unsubscribe
        </a>
      </Text>
    </EmailLayout>
  );
}
