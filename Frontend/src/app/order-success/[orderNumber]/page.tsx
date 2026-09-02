import type { Metadata } from "next";
import { OrderSuccessClient } from "./order-success-client";

export const metadata: Metadata = {
  title: "Order Confirmed | Wardiere Peptide Sciences",
  robots: { index: false, follow: true },
};

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  return <OrderSuccessClient orderNumber={orderNumber} />;
}
