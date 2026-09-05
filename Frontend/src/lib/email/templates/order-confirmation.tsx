import { Column, Row, Section, Text, Hr, Button } from "@react-email/components";

import { formatPrice } from "@/lib/format-currency";
import { SITE_URL } from "@/constants/site";
import { EmailLayout } from "./layout";

export type OrderConfirmationLineItem = {
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type OrderConfirmationProps = {
  customerName: string;
  orderNumber: string;
  items: OrderConfirmationLineItem[];
  subtotal: number;
  shippingFee: number;
  shippingName: string;
  discountAmount: number;
  total: number;
  paymentMethod: "crypto" | "remitly";
};

export function OrderConfirmationEmail({
  customerName,
  orderNumber,
  items,
  subtotal,
  shippingFee,
  shippingName,
  discountAmount,
  total,
  paymentMethod,
}: OrderConfirmationProps) {
  return (
    <EmailLayout preview={`Order ${orderNumber} confirmed — ${formatPrice(total)}`}>
      <Text style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>Thank you, {customerName}!</Text>
      <Text style={{ fontSize: "14px", color: "#374151", lineHeight: "22px" }}>
        We&apos;ve received your order <strong>#{orderNumber}</strong>. Here&apos;s a summary of what you ordered.
      </Text>

      <Section style={{ marginTop: "20px" }}>
        {items.map((item, i) => (
          <Row key={i} style={{ marginBottom: "8px" }}>
            <Column>
              <Text style={{ fontSize: "13px", color: "#111827", margin: 0, fontWeight: 600 }}>{item.name}</Text>
              <Text style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                Qty {item.quantity} × {formatPrice(item.unitPrice)}
              </Text>
            </Column>
            <Column align="right">
              <Text style={{ fontSize: "13px", color: "#111827", margin: 0, fontWeight: 600 }}>{formatPrice(item.lineTotal)}</Text>
            </Column>
          </Row>
        ))}
      </Section>

      <Hr style={{ borderColor: "#e5e7eb", margin: "16px 0" }} />

      <Row>
        <Column><Text style={{ fontSize: "13px", color: "#6b7280", margin: "2px 0" }}>Subtotal</Text></Column>
        <Column align="right"><Text style={{ fontSize: "13px", color: "#111827", margin: "2px 0" }}>{formatPrice(subtotal)}</Text></Column>
      </Row>
      <Row>
        <Column><Text style={{ fontSize: "13px", color: "#6b7280", margin: "2px 0" }}>Shipping ({shippingName})</Text></Column>
        <Column align="right"><Text style={{ fontSize: "13px", color: "#111827", margin: "2px 0" }}>{formatPrice(shippingFee)}</Text></Column>
      </Row>
      {discountAmount > 0 && (
        <Row>
          <Column><Text style={{ fontSize: "13px", color: "#059669", margin: "2px 0" }}>Discount</Text></Column>
          <Column align="right"><Text style={{ fontSize: "13px", color: "#059669", margin: "2px 0" }}>-{formatPrice(discountAmount)}</Text></Column>
        </Row>
      )}
      <Row>
        <Column><Text style={{ fontSize: "15px", fontWeight: 800, color: "#111827", margin: "8px 0" }}>Total</Text></Column>
        <Column align="right"><Text style={{ fontSize: "15px", fontWeight: 800, color: "#111827", margin: "8px 0" }}>{formatPrice(total)}</Text></Column>
      </Row>

      <Section style={{ marginTop: "20px", backgroundColor: "#f9fafb", borderRadius: "10px", padding: "14px" }}>
        <Text style={{ fontSize: "13px", color: "#374151", margin: 0 }}>
          {paymentMethod === "crypto"
            ? "Your payment terminal with wallet address, amount, and QR code is on your order page. Complete the transfer to move your order into processing."
            : "We'll follow up on WhatsApp to finalize your Remitly transfer details."}
        </Text>
      </Section>

      <Button
        href={`${SITE_URL}/order-success/${orderNumber}`}
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
        View order & complete payment
      </Button>
    </EmailLayout>
  );
}
