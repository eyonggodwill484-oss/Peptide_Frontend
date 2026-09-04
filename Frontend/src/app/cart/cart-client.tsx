"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { formatPrice } from "@/lib/format-currency";
import { useCartStore, useCartSummary } from "@/lib/store/cart-store";
import { useLocale } from "@/lib/i18n-client";

export function CartClient() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const summary = useCartSummary();
  const locale = useLocale();

  useEffect(() => setMounted(true), []);

  const minProgressPct = Math.min(100, Math.round((summary.subtotal / summary.minOrderAmount) * 100));

  return (
    <>
      <PageHeader
        title={locale === "de" ? "Warenkorb" : "Shopping Cart"}
        crumbs={[{ label: locale === "de" ? "Warenkorb" : "Cart" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {!mounted ? null : items.length === 0 ? (
          <Reveal className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-24 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <ShoppingBag className="size-6" />
            </div>
            <p className="text-lg font-bold text-foreground">
              {locale === "de" ? "Ihr Warenkorb ist leer" : "Your cart is empty"}
            </p>
            <p className="text-sm text-muted-foreground max-w-md">
              {locale === "de"
                ? "Fügen Sie hochreine Peptide, SARMs oder pharmazeutische Präparate zu Ihrem Warenkorb hinzu."
                : "Add high-purity peptides or research compounds to your cart to see them here."}
            </p>
            <Button className="mt-4 rounded-xl font-bold" asChild>
              <Link href={ROUTES.shop}>{locale === "de" ? "Zum Katalog" : "Browse the Catalog"}</Link>
            </Button>
          </Reveal>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Minimum Order Alert Banner */}
            {!summary.isMinMet ? (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    <AlertCircle className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-foreground">
                      {locale === "de"
                        ? `Mindestbestellwert von ${formatPrice(summary.minOrderAmount)} erforderlich`
                        : `A Minimum of ${formatPrice(summary.minOrderAmount)} is required before checking out.`}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {locale === "de"
                        ? `Fügen Sie noch ${formatPrice(summary.minDifference)} hinzu, um zur Kasse zu gehen.`
                        : `Add ${formatPrice(summary.minDifference)} more to your cart to proceed.`}
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-48 flex flex-col gap-1.5 shrink-0">
                  <div className="flex justify-between text-xs font-bold text-foreground">
                    <span>{formatPrice(summary.subtotal)}</span>
                    <span className="text-muted-foreground">{formatPrice(summary.minOrderAmount)}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-amber-200 dark:bg-amber-950 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-500 transition-all duration-500"
                      style={{ width: `${minProgressPct}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 shadow-xs flex items-center gap-3 text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>
                  {locale === "de"
                    ? `Mindestbestellwert erreicht (${formatPrice(summary.subtotal)} / ${formatPrice(summary.minOrderAmount)}). Sie können jetzt bestellen!`
                    : `Minimum order amount met (${formatPrice(summary.subtotal)} / ${formatPrice(summary.minOrderAmount)}). You are ready to check out!`}
                </span>
              </div>
            )}

            <Reveal className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
              {/* Items List */}
              <div className="flex flex-col divide-y divide-border rounded-2xl border border-border/80 bg-card overflow-hidden">
                {items.map((item) => (
                  <div key={item.productId} className="flex flex-col gap-3 p-4.5 sm:flex-row sm:items-center sm:gap-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted border border-border/60">
                        <Image
                          src={item.image?.src || "/images/hero/hero-lab-vials.png"}
                          alt={item.image?.alt || item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1 sm:hidden">
                        <Link href={ROUTES.product(item.slug)} className="text-sm font-bold text-foreground hover:underline">
                          {item.name}
                        </Link>
                        <span className="text-xs text-muted-foreground font-mono">SKU: {item.sku}</span>
                        <span className="text-sm font-bold text-foreground">{formatPrice(item.price)}</span>
                      </div>
                    </div>

                    <div className="hidden flex-1 flex-col gap-1 sm:flex">
                      <Link href={ROUTES.product(item.slug)} className="text-sm font-bold text-foreground hover:underline">
                        {item.name}
                      </Link>
                      <span className="text-xs text-muted-foreground font-mono">SKU: {item.sku}</span>
                      <span className="text-sm font-bold text-foreground">{formatPrice(item.price)}</span>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-4">
                      <div className="flex items-center rounded-xl border border-input bg-card shadow-2xs">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setQuantity(item.productId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="size-8"
                        >
                          <Minus className="size-3.5" />
                        </Button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setQuantity(item.productId, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="size-8"
                        >
                          <Plus className="size-3.5" />
                        </Button>
                      </div>
                      <span className="w-20 shrink-0 text-right text-sm font-extrabold text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.productId)}
                        aria-label="Remove item"
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg size-8"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Sidebar */}
              <div className="flex h-fit flex-col gap-4 rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
                <h2 className="text-base font-extrabold text-foreground">
                  {locale === "de" ? "Bestellübersicht" : "Order Summary"}
                </h2>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{locale === "de" ? "Zwischensumme" : "Subtotal"}</span>
                  <span className="font-bold text-foreground">{formatPrice(summary.subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{locale === "de" ? "Versand (Standard)" : "Shipping (Standard)"}</span>
                  <span className="font-bold text-foreground">
                    {summary.shipping === 0 ? "—" : formatPrice(summary.shipping)}
                  </span>
                </div>

                <div className="flex justify-between border-t border-border pt-4 text-base font-extrabold text-foreground">
                  <span>{locale === "de" ? "Gesamtsumme" : "Estimated Total"}</span>
                  <span className="text-xl font-black text-primary">{formatPrice(summary.total)}</span>
                </div>

                {summary.isMinMet ? (
                  <Button size="lg" className="mt-2 h-12 rounded-xl font-extrabold shadow-md gap-2" asChild>
                    <Link href={ROUTES.checkout}>
                      <span>{locale === "de" ? "Zur Kasse gehen" : "Proceed to Checkout"}</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2 mt-2">
                    <Button size="lg" className="h-12 rounded-xl font-extrabold opacity-60 cursor-not-allowed" disabled>
                      {locale === "de" ? `Mindestbestellwert: ${formatPrice(summary.minOrderAmount)}` : `Min. Order: ${formatPrice(summary.minOrderAmount)}`}
                    </Button>
                    <Button variant="outline" className="rounded-xl font-semibold" asChild>
                      <Link href={ROUTES.shop}>
                        {locale === "de" ? "Weitere Produkte hinzufügen" : "Add More Products"}
                      </Link>
                    </Button>
                  </div>
                )}

                {/* B2B Wholesale Callout in Cart */}
                <div className="mt-2 rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-xs flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-foreground">
                    <span>🏢</span>
                    <span>{locale === "de" ? "Großhandel & B2B-Mengenrabatte" : "B2B Wholesale & Volume Orders"}</span>
                  </div>
                  <p className="text-muted-foreground text-[11px]">
                    {locale === "de"
                      ? "Bestellungen ab 10+ Einheiten erhalten bis zu 35% Rabatt."
                      : "Orders of 10+ units qualify for up to 35% volume discounts."}
                  </p>
                  <Link href="/wholesale" className="font-bold text-primary text-[11px] hover:underline inline-flex items-center gap-1">
                    <span>{locale === "de" ? "Großhandels-Konditionen ansehen" : "View wholesale tiers"}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </>
  );
}
