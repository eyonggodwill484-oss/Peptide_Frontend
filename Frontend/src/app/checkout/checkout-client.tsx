"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Landmark, Lock } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ROUTES } from "@/constants/routes";
import { useCartStore, useCartSummary } from "@/lib/store/cart-store";

export function CheckoutClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const summary = useCartSummary();

  useEffect(() => setMounted(true), []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const orderNumber = `MPS-${Math.floor(100000 + Math.random() * 900000)}`;
    clear();
    router.push(ROUTES.orderSuccess(orderNumber));
  }

  if (mounted && items.length === 0) {
    return (
      <>
        <PageHeader title="Checkout" crumbs={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
        <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">Your cart is empty. Add products before checking out.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Checkout" crumbs={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />

      <form onSubmit={handleSubmit} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-8">
            <section className="flex flex-col gap-4">
              <h2 className="text-base font-semibold text-foreground">Contact Information</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required placeholder="you@lab.edu" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" required placeholder="+1 (555) 000-0000" />
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-base font-semibold text-foreground">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" required placeholder="Jane Doe" />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="address1">Address</Label>
                  <Input id="address1" required placeholder="1180 Innovation Parkway, Suite 400" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required placeholder="Cambridge" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" required placeholder="MA" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input id="postalCode" required placeholder="02142" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" required placeholder="United States" />
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-base font-semibold text-foreground">Payment Method</h2>
              <RadioGroup defaultValue="card">
                <label className="flex items-center gap-3 rounded-lg border border-input p-3 text-sm">
                  <RadioGroupItem value="card" /> Credit / Debit Card
                </label>
                <label className="flex items-center gap-3 rounded-lg border border-input p-3 text-sm">
                  <RadioGroupItem value="ach" /> <Landmark className="size-4" /> Bank Transfer (ACH)
                </label>
              </RadioGroup>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" required placeholder="4242 4242 4242 4242" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" required placeholder="MM/YY" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" required placeholder="123" />
                </div>
              </div>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="size-3.5" /> This is a demo checkout — no payment is processed.
              </p>
            </section>
          </div>

          <div className="flex h-fit flex-col gap-3 rounded-xl border border-border p-5">
            <h2 className="text-base font-semibold text-foreground">Order Summary</h2>
            <div className="flex max-h-64 flex-col gap-3 overflow-y-auto">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between gap-3 text-sm">
                  <span className="text-foreground">
                    {item.name} <span className="text-muted-foreground">× {item.quantity}</span>
                  </span>
                  <span className="shrink-0 font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">${summary.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium text-foreground">{summary.shipping === 0 ? "Free" : `$${summary.shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Estimated Tax</span>
              <span className="font-medium text-foreground">${summary.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-foreground">
              <span>Total</span>
              <span>${summary.total.toFixed(2)}</span>
            </div>
            <Button size="lg" type="submit" className="mt-2" disabled={submitting}>
              {submitting ? "Placing Order…" : "Place Order"}
            </Button>
          </div>
        </Reveal>
      </form>
    </>
  );
}
