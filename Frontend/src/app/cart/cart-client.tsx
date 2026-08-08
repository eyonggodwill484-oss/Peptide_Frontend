"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { formatPrice } from "@/lib/format-currency";
import { useCartStore, useCartSummary } from "@/lib/store/cart-store";

export function CartClient() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const summary = useCartSummary();

  useEffect(() => setMounted(true), []);

  return (
    <>
      <PageHeader title="Shopping Cart" crumbs={[{ label: "Cart" }]} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {!mounted ? null : items.length === 0 ? (
          <Reveal className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-24 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" />
            <p className="text-base font-medium text-foreground">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Add research peptides to your cart to see them here.</p>
            <Button className="mt-2" asChild>
              <Link href={ROUTES.shop}>Browse the Catalog</Link>
            </Button>
          </Reveal>
        ) : (
          <Reveal className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
            <div className="flex flex-col divide-y divide-border rounded-xl border border-border">
              {items.map((item) => (
                <div key={item.productId} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {item.image.src && <Image src={item.image.src} alt={item.image.alt} fill sizes="80px" className="object-cover" />}
                    </div>
                    <div className="flex flex-1 flex-col gap-1 sm:hidden">
                      <Link href={ROUTES.product(item.slug)} className="text-sm font-medium text-foreground hover:underline">
                        {item.name}
                      </Link>
                      <span className="text-xs text-muted-foreground">SKU: {item.sku}</span>
                      <span className="text-sm font-semibold text-foreground">{formatPrice(item.price)}</span>
                    </div>
                  </div>

                  <div className="hidden flex-1 flex-col gap-1 sm:flex">
                    <Link href={ROUTES.product(item.slug)} className="text-sm font-medium text-foreground hover:underline">
                      {item.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">SKU: {item.sku}</span>
                    <span className="text-sm font-semibold text-foreground">{formatPrice(item.price)}</span>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-4">
                    <div className="flex items-center rounded-lg border border-input">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setQuantity(item.productId, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus />
                      </Button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setQuantity(item.productId, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus />
                      </Button>
                    </div>
                    <span className="w-16 shrink-0 text-right text-sm font-semibold text-foreground">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.productId)} aria-label="Remove item">
                      <Trash2 className="text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex h-fit flex-col gap-3 rounded-xl border border-border p-5">
              <h2 className="text-base font-semibold text-foreground">Order Summary</h2>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">{formatPrice(summary.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-foreground">
                  {summary.shipping === 0 ? "Free" : formatPrice(summary.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span className="font-medium text-foreground">{formatPrice(summary.tax)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-foreground">
                <span>Total</span>
                <span>{formatPrice(summary.total)}</span>
              </div>
              <Button size="lg" className="mt-2" asChild>
                <Link href={ROUTES.checkout}>Proceed to Checkout</Link>
              </Button>
              {summary.subtotal < 150 && summary.subtotal > 0 && (
                <p className="text-center text-xs text-muted-foreground">
                  Add {formatPrice(150 - summary.subtotal)} more for free shipping
                </p>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </>
  );
}
