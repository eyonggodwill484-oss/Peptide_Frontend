import { Button, Section, Text } from "@react-email/components";

import { SITE_URL } from "@/constants/site";
import { EmailLayout } from "./layout";

export type OrderStatusKind = "paid" | "shipped" | "delivered" | "cancelled" | "refunded";

export type OrderStatusUpdateProps = {
  customerName: string;
  orderNumber: string;
  kind: OrderStatusKind;
  trackingNumber?: string;
};

const COPY: Record<OrderStatusKind, { subject: string; headline: string; body: (props: OrderStatusUpdateProps) => string }> = {
  paid: {
    subject: "Payment received",
    headline: "Payment confirmed",
    body: () => "We've confirmed your payment. Your order is now being prepared for cold-chain dispatch.",
  },
  shipped: {
    subject: "Your order has shipped",
    headline: "Your order is on its way",
    body: (p) =>
      p.trackingNumber
        ? `Your order has shipped. Tracking number: ${p.trackingNumber}.`
        : "Your order has shipped and is on its way to you.",
  },
  delivered: {
    subject: "Order delivered",
    headline: "Delivered",
    body: () => "Your order has been marked as delivered. Thank you for choosing us.",
  },
  cancelled: {
    subject: "Order cancelled",
    headline: "Your order was cancelled",
    body: () => "Your order has been cancelled. If this is unexpected, please contact support.",
  },
  refunded: {
    subject: "Order refunded",
    headline: "Refund processed",
    body: () => "Your refund has been processed. It may take a few business days to appear.",
  },
};

export function OrderStatusUpdateEmail(props: OrderStatusUpdateProps) {
  const copy = COPY[props.kind];

  return (
    <EmailLayout preview={`${copy.subject} — #${props.orderNumber}`}>
      <Text style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>{copy.headline}</Text>
      <Text style={{ fontSize: "14px", color: "#374151", lineHeight: "22px" }}>
        Hi {props.customerName}, regarding order <strong>#{props.orderNumber}</strong>:
      </Text>
      <Section style={{ marginTop: "8px" }}>
        <Text style={{ fontSize: "14px", color: "#374151", lineHeight: "22px" }}>{copy.body(props)}</Text>
      </Section>
      <Button
        href={`${SITE_URL}/order-success/${props.orderNumber}`}
        style={{
          marginTop: "16px",
          backgroundColor: "#111827",
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: 700,
          padding: "12px 20px",
          borderRadius: "10px",
          textDecoration: "none",
        }}
      >
        View order
      </Button>
    </EmailLayout>
  );
}
