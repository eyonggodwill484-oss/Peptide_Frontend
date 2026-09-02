"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ShieldCheck,
  Truck,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  Lock
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ROUTES } from "@/constants/routes";
import { formatPrice } from "@/lib/format-currency";
import { useCartStore, useCartSummary } from "@/lib/store/cart-store";
import {
  SHIPPING_OPTIONS,
  CRYPTO_WALLETS,
  DEFAULT_WHATSAPP_NUMBER
} from "@/constants/payment";
import {
  calculateCryptoAmount,
  saveOrderToStorage,
  type StoredOrder
} from "@/lib/order-storage";
import { trackAnalytics } from "@/lib/posthog";
import { useLocale } from "@/lib/i18n-client";
import { cn } from "@/lib/utils";

export function CheckoutClient() {
  const router = useRouter();
  const locale = useLocale();
  const { items, selectedShippingId, setSelectedShippingId } = useCartStore();
  const summary = useCartSummary();

  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState(locale === "de" ? "Deutschland" : "Germany");
  const [paymentMethod, setPaymentMethod] = useState<"crypto" | "remitly">("crypto");
  const [selectedCoin, setSelectedCoin] = useState<"btc" | "usdt_trc20" | "eth">("btc");

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeWallet = CRYPTO_WALLETS[selectedCoin];
  const cryptoAmount = calculateCryptoAmount(summary.total, selectedCoin);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!summary.isMinMet) {
      toast.error(
        locale === "de"
          ? `Mindestbestellwert von ${formatPrice(summary.minOrderAmount)} nicht erreicht!`
          : `A minimum order of ${formatPrice(summary.minOrderAmount)} is required before checkout.`
      );
      return;
    }

    setSubmitting(true);
    const orderNumber = `MPS-${Math.floor(100000 + Math.random() * 900000)}`;

    const storedOrder: StoredOrder = {
      orderNumber,
      createdAt: new Date().toISOString(),
      customer: {
        fullName,
        email,
        phone,
        address1,
        city,
        state,
        postalCode,
        country,
      },
      items: [...items],
      subtotal: summary.subtotal,
      shipping: {
        id: summary.selectedShipping.id,
        name: summary.selectedShipping.name,
        duration: summary.selectedShipping.duration,
        price: summary.selectedShipping.price,
      },
      total: summary.total,
      paymentMethod,
      cryptoDetails:
        paymentMethod === "crypto"
          ? {
              coinId: selectedCoin,
              coinName: activeWallet.name,
              coinSymbol: activeWallet.symbol,
              network: activeWallet.network,
              address: activeWallet.address,
              cryptoAmount,
              qrData: activeWallet.address,
            }
          : undefined,
      status: paymentMethod === "crypto" ? "pending_payment" : "remitly_initiated",
    };

    // Save to persistent storage
    saveOrderToStorage(storedOrder);

    // Track analytics event
    trackAnalytics.orderPlaced({
      orderNumber,
      total: summary.total,
      paymentMethod,
      shippingMethod: summary.selectedShipping.name,
    });

    // If Remitly, prepare WhatsApp message and open window
    if (paymentMethod === "remitly") {
      const cleanPhone = DEFAULT_WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
      const waMsg = encodeURIComponent(
        `Hello! I just placed Order #${orderNumber} for ${formatPrice(summary.total)} on Wardiere Peptide Sciences using Remitly.\n\nCustomer: ${fullName}\nEmail: ${email}\nShipping: ${summary.selectedShipping.name}\n\nPlease send me the Remitly receiver name and transfer instructions to complete my payment.`
      );
      const waUrl = `https://wa.me/${cleanPhone}?text=${waMsg}`;
      if (typeof window !== "undefined") {
        window.open(waUrl, "_blank");
      }
    }

    // Direct redirection to the Payment Terminal
    if (typeof window !== "undefined") {
      window.location.href = ROUTES.orderSuccess(orderNumber);
    } else {
      router.push(ROUTES.orderSuccess(orderNumber));
    }
  }

  if (mounted && items.length === 0) {
    return (
      <>
        <PageHeader
          title={locale === "de" ? "Kasse" : "Checkout"}
          crumbs={[{ label: locale === "de" ? "Warenkorb" : "Cart", href: "/cart" }, { label: locale === "de" ? "Kasse" : "Checkout" }]}
        />
        <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="text-base font-bold text-foreground">
            {locale === "de" ? "Ihr Warenkorb ist leer." : "Your cart is empty."}
          </p>
          <Button className="mt-4 rounded-xl font-bold" asChild>
            <Link href={ROUTES.shop}>{locale === "de" ? "Zum Katalog" : "Browse the Catalog"}</Link>
          </Button>
        </div>
      </>
    );
  }

  // If subtotal is below minimum order amount
  if (mounted && !summary.isMinMet) {
    return (
      <>
        <PageHeader
          title={locale === "de" ? "Kasse" : "Checkout"}
          crumbs={[{ label: locale === "de" ? "Warenkorb" : "Cart", href: "/cart" }, { label: locale === "de" ? "Kasse" : "Checkout" }]}
        />
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-8 shadow-sm flex flex-col items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <AlertCircle className="size-7" />
            </div>
            <h2 className="text-xl font-extrabold text-foreground">
              {locale === "de"
                ? `Mindestbestellwert von ${formatPrice(summary.minOrderAmount)} erforderlich`
                : `A Minimum of ${formatPrice(summary.minOrderAmount)} is required before checking out.`}
            </h2>
            <p className="text-sm text-muted-foreground max-w-md">
              {locale === "de"
                ? `Ihr aktueller Warenkorbwert beträgt ${formatPrice(summary.subtotal)}. Bitte fügen Sie noch mindestens ${formatPrice(summary.minDifference)} hinzu.`
                : `Your current cart subtotal is ${formatPrice(summary.subtotal)}. Please add at least ${formatPrice(summary.minDifference)} more to proceed.`}
            </p>
            <div className="flex gap-3 mt-2">
              <Button size="lg" className="rounded-xl font-bold" asChild>
                <Link href={ROUTES.shop}>{locale === "de" ? "Weiter einkaufen" : "Continue Shopping"}</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl font-bold" asChild>
                <Link href={ROUTES.cart}>{locale === "de" ? "Warenkorb ansehen" : "View Cart"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={locale === "de" ? "Kasse & Bezahlung" : "Checkout & Payment"}
        crumbs={[{ label: locale === "de" ? "Warenkorb" : "Cart", href: "/cart" }, { label: locale === "de" ? "Kasse" : "Checkout" }]}
      />

      <form onSubmit={handleSubmit} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_390px]">
          <div className="flex flex-col gap-8">
            {/* 1. Contact Information */}
            <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs flex flex-col gap-4">
              <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
                {locale === "de" ? "Kontaktinformationen" : "Contact Information"}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email" className="text-xs font-bold">{locale === "de" ? "E-Mail-Adresse *" : "Email Address *"}</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dr.mueller@lab.de"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone" className="text-xs font-bold">{locale === "de" ? "Telefonnummer / WhatsApp *" : "Phone / WhatsApp *"}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+49 152 12345678"
                    className="rounded-xl h-11"
                  />
                </div>
              </div>
            </section>

            {/* 2. Shipping Address */}
            <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs flex flex-col gap-4">
              <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
                {locale === "de" ? "Lieferadresse" : "Shipping Address"}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="fullName" className="text-xs font-bold">{locale === "de" ? "Vollständiger Name / Empfänger *" : "Full Name / Recipient *"}</Label>
                  <Input
                    id="fullName"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dr. Maximilian Mueller"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="address1" className="text-xs font-bold">{locale === "de" ? "Straße und Hausnummer *" : "Street Address *"}</Label>
                  <Input
                    id="address1"
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    placeholder="Wissenschaftspark 14, Gebäude B"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="city" className="text-xs font-bold">{locale === "de" ? "Stadt *" : "City *"}</Label>
                  <Input
                    id="city"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="München"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="postalCode" className="text-xs font-bold">{locale === "de" ? "Postleitzahl *" : "Postal Code *"}</Label>
                  <Input
                    id="postalCode"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="80331"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="state" className="text-xs font-bold">{locale === "de" ? "Bundesland / Region" : "State / Region"}</Label>
                  <Input
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Bayern"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="country" className="text-xs font-bold">{locale === "de" ? "Land *" : "Country *"}</Label>
                  <Input
                    id="country"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Deutschland"
                    className="rounded-xl h-11"
                  />
                </div>
              </div>
            </section>

            {/* 3. Shipping Options (Exact 3 options requested) */}
            <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
                  {locale === "de" ? "Versandoptionen" : "Shipping options"}
                </h2>
                <span className="text-xs font-bold text-primary flex items-center gap-1">
                  <Truck className="size-3.5" /> {locale === "de" ? "Kühlkettenverpackung" : "Cold-Chain Packaging"}
                </span>
              </div>

              <RadioGroup
                value={selectedShippingId}
                onValueChange={(val) => setSelectedShippingId(val)}
                className="flex flex-col gap-3"
              >
                {SHIPPING_OPTIONS.map((opt) => {
                  const isSelected = selectedShippingId === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer",
                        isSelected
                          ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary"
                          : "border-border bg-card hover:bg-muted/40 hover:border-primary/40"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={opt.id} id={opt.id} />
                        <div>
                          <p className="text-sm font-extrabold text-foreground">{opt.name}</p>
                          <p className="text-xs text-muted-foreground">{opt.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-primary">{formatPrice(opt.price)}</span>
                        <span className="block text-[11px] text-muted-foreground font-semibold">
                          {opt.duration}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </RadioGroup>
            </section>

            {/* 4. Payment Method */}
            <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">4</span>
                  {locale === "de" ? "Zahlungsmethode wählen" : "Payment Method"}
                </h2>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="size-3.5" /> 256-Bit SSL Encrypted
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Crypto Payment */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("crypto")}
                  className={cn(
                    "flex flex-col items-start p-5 rounded-2xl border text-left transition-all cursor-pointer relative",
                    paymentMethod === "crypto"
                      ? "border-primary bg-primary/5 ring-2 ring-primary/40 shadow-xs"
                      : "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-sm font-extrabold text-foreground flex items-center gap-2">
                      <span className="flex size-7 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 font-bold text-xs">₿</span>
                      {locale === "de" ? "Kryptowährung" : "Cryptocurrency"}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5">
                      0% Gebühren
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {locale === "de"
                      ? "Automatische Sofortzahlung mit Bitcoin (BTC), Tether USDT (TRC-20) oder Ethereum (ETH). Im nächsten Schritt scannen Sie den QR-Code oder überweisen an die Wallet."
                      : "Instant automatic payment via Bitcoin (BTC), Tether USDT (TRC-20), or Ethereum (ETH). Scan QR or transfer on the terminal."}
                  </p>
                  <div className="flex items-center gap-1.5 mt-3">
                    <span className="text-[11px] font-extrabold bg-muted px-2 py-0.5 rounded-md text-foreground">₿ BTC</span>
                    <span className="text-[11px] font-extrabold bg-muted px-2 py-0.5 rounded-md text-foreground">₮ USDT (TRC-20)</span>
                    <span className="text-[11px] font-extrabold bg-muted px-2 py-0.5 rounded-md text-foreground">Ξ ETH</span>
                  </div>
                </button>

                {/* 2. Remitly via WhatsApp */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("remitly")}
                  className={cn(
                    "flex flex-col items-start p-5 rounded-2xl border text-left transition-all cursor-pointer relative",
                    paymentMethod === "remitly"
                      ? "border-primary bg-primary/5 ring-2 ring-primary/40 shadow-xs"
                      : "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-sm font-extrabold text-foreground flex items-center gap-2">
                      <span className="flex size-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 font-bold text-xs">R</span>
                      Remitly (WhatsApp)
                    </span>
                    <span className="text-[10px] font-extrabold uppercase rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 px-2 py-0.5">
                      {locale === "de" ? "Direkt-Support" : "Support"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {locale === "de"
                      ? "Banküberweisung, Kreditkarte oder Bareinzahlung via Remitly. Nach Klick auf Bestellen öffnet sich WhatsApp für die finale Zahlungsabwicklung."
                      : "Bank transfer, card, or cash via Remitly finalized with verified customer support on WhatsApp."}
                  </p>
                  <div className="flex items-center gap-1.5 mt-3">
                    <span className="text-[11px] font-extrabold bg-muted px-2 py-0.5 rounded-md text-foreground">Kreditkarte / Bank</span>
                    <span className="text-[11px] font-extrabold bg-muted px-2 py-0.5 rounded-md text-foreground">WhatsApp Live</span>
                  </div>
                </button>
              </div>

              {/* Quick Currency Picker if Crypto */}
              {paymentMethod === "crypto" && (
                <div className="rounded-2xl border border-primary/20 bg-muted/30 p-4.5 flex flex-col gap-3">
                  <Label className="text-xs font-extrabold uppercase tracking-wider text-foreground">
                    {locale === "de" ? "Bevorzugte Kryptowährung auswählen:" : "Choose Preferred Cryptocurrency:"}
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["btc", "usdt_trc20", "eth"] as const).map((coinId) => {
                      const coin = CRYPTO_WALLETS[coinId];
                      const isSelected = selectedCoin === coinId;
                      const amt = calculateCryptoAmount(summary.total, coinId);
                      return (
                        <button
                          type="button"
                          key={coinId}
                          onClick={() => setSelectedCoin(coinId)}
                          className={cn(
                            "flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer",
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary shadow-xs ring-1 ring-primary"
                              : "bg-card text-foreground border-border hover:border-primary/50"
                          )}
                        >
                          <span className="text-sm font-extrabold flex items-center gap-1">
                            <span>{coin.icon}</span> {coin.symbol}
                          </span>
                          <span className={cn("text-[11px] font-mono mt-1 font-bold", isSelected ? "text-primary-foreground/90" : "text-muted-foreground")}>
                            {amt} {coin.symbol}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Order Summary & Place Order CTA */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs flex flex-col gap-5">
              <h3 className="text-base font-extrabold text-foreground border-b border-border pb-3">
                {locale === "de" ? "Bestellübersicht" : "Order Summary"}
              </h3>

              {/* Items List */}
              <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
                {items.map((item, idx) => {
                  const fallback = item as unknown as { product?: { id?: string; name?: string; price?: number; images?: Array<{ src?: string; alt?: string }> } };
                  const id = item.productId || fallback.product?.id || `item-${idx}`;
                  const name = item.name || fallback.product?.name || "Product";
                  const price = typeof item.price === "number" ? item.price : (fallback.product?.price || 0);
                  const qty = item.quantity || 1;
                  const imgSrc = item.image?.src || fallback.product?.images?.[0]?.src || "";
                  const imgAlt = item.image?.alt || fallback.product?.images?.[0]?.alt || name;

                  return (
                    <div key={id} className="flex items-center justify-between text-xs gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-muted border">
                          {imgSrc ? (
                            <Image
                              src={imgSrc}
                              alt={imgAlt}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="size-full flex items-center justify-center bg-muted text-[9px] font-bold text-muted-foreground">
                              MPS
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-foreground truncate">{name}</p>
                          <p className="text-muted-foreground font-medium">Menge: {qty} × {formatPrice(price)}</p>
                        </div>
                      </div>
                      <span className="font-bold text-foreground shrink-0 font-mono">
                        {formatPrice(price * qty)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="border-t border-border pt-4 flex flex-col gap-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>{locale === "de" ? "Zwischensumme" : "Subtotal"}</span>
                  <span className="font-mono font-bold text-foreground">{formatPrice(summary.subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{locale === "de" ? "Versand" : "Shipping"} ({summary.selectedShipping.name})</span>
                  <span className="font-mono font-bold text-foreground">{formatPrice(summary.selectedShipping.price)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between items-baseline text-base font-black text-foreground">
                  <span>{locale === "de" ? "Gesamtbetrag" : "Total Amount"}</span>
                  <span className="text-xl font-extrabold text-primary font-mono">{formatPrice(summary.total)}</span>
                </div>
                {paymentMethod === "crypto" && (
                  <div className="rounded-xl bg-primary/10 p-2.5 text-center mt-1">
                    <span className="text-xs font-extrabold text-primary font-mono">
                      ≈ {cryptoAmount} {activeWallet.symbol}
                    </span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full rounded-xl font-bold h-12 text-sm shadow-md gap-2"
              >
                {submitting ? (
                  <span>{locale === "de" ? "Bestellung wird erstellt…" : "Processing Order…"}</span>
                ) : (
                  <>
                    <Lock className="size-4" />
                    {paymentMethod === "crypto"
                      ? (locale === "de" ? "Bestellen & Zur Krypto-Zahlung" : "Place Order & Pay with Crypto")
                      : (locale === "de" ? "Bestellen & WhatsApp öffnen" : "Place Order via Remitly")}
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>

              <div className="flex flex-col gap-2 pt-2 border-t border-border/60 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
                  <span>{locale === "de" ? "Garantierte Reinheit ≥99% HPLC-zertifiziert" : "Guaranteed Purity ≥99% HPLC Certified"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="size-3.5 text-primary shrink-0" />
                  <span>{locale === "de" ? "Kühlkettenversand mit Temperaturkontrolle" : "Cold-Chain Insured Express Delivery"}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </form>
    </>
  );
}
