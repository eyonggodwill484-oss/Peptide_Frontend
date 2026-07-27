import type { Metadata } from "next";

import { CartClient } from "./cart-client";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review the items in your cart before checkout.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartClient />;
}
