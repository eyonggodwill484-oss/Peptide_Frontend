"use client";

import Image from "next/image";
import Link from "@/components/ui/localized-link";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import {
  FileText,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  CheckCircle2,
  Award,
  FlaskConical,
  Clock,
  Sparkles,
  Truck,
  ThumbsUp,
  Snowflake,
  Lock,
  ChevronRight,
  Copy,
  Check,
  Info,
  Building2,
  TrendingDown,
  Layers,
  ArrowRight
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { Reveal } from "@/components/motion/reveal";
import { ProductLongDescription } from "@/components/product-long-description";
import { useLocale, useTranslations } from "@/lib/i18n-client";

import { buildMultiAttributeGroup, parseVariantOption } from "@/lib/variant-parser";
import { trackAnalytics } from "@/lib/posthog";

export function ProductDetail({ product, variants = [] }: { product: Product; variants?: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product>(product);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<string>("specs");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [copiedSpec, setCopiedSpec] = useState<string | null>(null);
  
  const reviewsTabRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((state) => state.addItem);
  const locale = useLocale();
  const t = useTranslations();
  const isDe = locale === "de";

  useEffect(() => {
    setSelectedProduct(product);
    setActiveImage(0);
    trackAnalytics.viewProduct(product);
  }, [product]);

  const multiGroup = buildMultiAttributeGroup(variants.length > 0 ? variants : [product]);
  const activeParsed = parseVariantOption(selectedProduct);
  const [selectedFormat, setSelectedFormat] = useState<string>(activeParsed.format);

  useEffect(() => {
    const parsed = parseVariantOption(selectedProduct);
    setSelectedFormat(parsed.format);
  }, [selectedProduct]);

  const BADGE_LABELS: Record<Product["badges"][number], string> = {
    new: isDe ? "Neu" : "New",
    "best-seller": isDe ? "Bestseller" : "Best Seller",
    limited: isDe ? "Limitiert" : "Limited",
    sale: isDe ? "Angebot" : "Sale",
    "coa-verified": isDe ? "CoA Verifiziert" : "CoA Verified",
    featured: isDe ? "Empfohlen" : "Featured",
  };

  const STOCK_LABELS: Record<Product["stock"], { label: string; className: string; dotColor: string }> = {
    "in-stock": { label: t.products.inStock, className: "text-emerald-600 dark:text-emerald-400", dotColor: "bg-emerald-500" },
    "low-stock": { label: t.products.lowStock, className: "text-amber-600 dark:text-amber-400", dotColor: "bg-amber-500" },
    "out-of-stock": { label: t.products.outOfStock, className: "text-destructive", dotColor: "bg-destructive" },
    preorder: { label: isDe ? "Vorbestellbar" : "Available for Preorder", className: "text-primary", dotColor: "bg-primary" },
  };

  const currentImages = selectedProduct.images?.length > 0 ? selectedProduct.images : product.images ?? [];
  const image = currentImages[activeImage] ?? currentImages[0];
  const onSale = typeof selectedProduct.compareAtPrice === "number" && selectedProduct.compareAtPrice > selectedProduct.price;
  const stock = STOCK_LABELS[selectedProduct.stock];
  const canAddToCart = selectedProduct.stock !== "out-of-stock";

  function handleSelectVariant(prod: Product) {
    setSelectedProduct(prod);
    setActiveImage(0);
    const parsed = parseVariantOption(prod);
    setSelectedFormat(parsed.format);
    trackAnalytics.viewProduct(prod);
  }

  function handleSelectFormat(fmt: string) {
    setSelectedFormat(fmt);
    const optionsForFmt = multiGroup.optionsByFormat[fmt];
    if (optionsForFmt && optionsForFmt.length > 0) {
      const matchStrength = optionsForFmt.find((o) => o.strength === activeParsed.strength) || optionsForFmt[0];
      handleSelectVariant(matchStrength.product);
    }
  }

  function handleAddToCart() {
    addItem(selectedProduct, quantity);
    trackAnalytics.addToCart(selectedProduct, quantity);
    toast.success(
      isDe
        ? `${selectedProduct.name} zum Warenkorb hinzugefügt`
        : `${selectedProduct.name} added to cart`,
      {
        description: isDe ? `Menge: ${quantity}` : `Quantity: ${quantity}`,
      }
    );
  }

  function scrollToReviews() {
    setActiveTab("reviews");
    if (reviewsTabRef.current) {
      reviewsTabRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function copyToClipboard(text: string, label: string) {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(text);
      setCopiedSpec(label);
      toast.success(isDe ? "In die Zwischenablage kopiert" : "Copied to clipboard");
      setTimeout(() => setCopiedSpec(null), 2000);
    }
  }

  // Specifications
  const rawSpecs = selectedProduct.specifications?.length > 0
    ? selectedProduct.specifications
    : product.specifications ?? [];

  const localizedSpecifications = rawSpecs.map((spec) => {
    const label = spec.label || spec.name || "Spezifikation";
    const value = spec.value || "";
    return { label, value };
  });

  // Review breakdown calculations
  const reviews = selectedProduct.reviews ?? [];
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? Number((reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(2))
    : 4.94;

  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const fourStarCount = reviews.filter((r) => r.rating === 4).length;
  const threeStarCount = reviews.filter((r) => r.rating <= 3).length;

  const fiveStarPct = totalReviews > 0 ? Math.round((fiveStarCount / totalReviews) * 100) : 92;
  const fourStarPct = totalReviews > 0 ? Math.round((fourStarCount / totalReviews) * 100) : 8;
  const threeStarPct = totalReviews > 0 ? Math.round((threeStarCount / totalReviews) * 100) : 0;

  const filteredReviews = ratingFilter
    ? reviews.filter((r) => r.rating === ratingFilter)
    : reviews;

  // Wholesale Tier Pricing Calculation
  const basePrice = selectedProduct.price;
  const priceTier5 = basePrice * 0.9;   // 10% off
  const priceTier10 = basePrice * 0.8;  // 20% off
  const priceTier25 = basePrice * 0.7;  // 30% off

  return (
    <div className="flex flex-col gap-16 max-w-7xl mx-auto">
      {/* 1. HERO 2-COLUMN SECTION: Image Gallery & Buy Box */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
        {/* Left Column: Gallery (6 cols) */}
        <Reveal className="flex flex-col gap-4 lg:col-span-6 xl:col-span-6">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-muted/40 border border-border/80 shadow-sm backdrop-blur-xs">
            {image && (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority
              />
            )}
            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-foreground shadow-xs border border-border/60">
                <ShieldCheck className="size-3.5 text-emerald-500" /> HPLC ≥99.0% Reinheit
              </span>
            </div>
          </div>
          {currentImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {currentImages.map((img, i) => (
                <button
                  key={img.src + i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative size-20 shrink-0 overflow-hidden rounded-2xl bg-muted ring-1 ring-border/80 transition-all hover:opacity-90",
                    activeImage === i && "ring-2 ring-primary shadow-md scale-105"
                  )}
                >
                  <Image src={img.src} alt={img.alt} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </Reveal>

        {/* Right Column: Buy Box (6 cols) */}
        <Reveal delay={0.08} className="flex flex-col gap-5 lg:col-span-6 xl:col-span-6">
          {/* Header & Badges */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                href={`/categories/${selectedProduct.categorySlug}`}
                className="text-xs font-bold uppercase tracking-wider text-primary hover:underline"
              >
                {selectedProduct.categoryName}
              </Link>
              <span className="text-muted-foreground/40">•</span>
              <span className="text-xs text-muted-foreground font-mono">SKU: {selectedProduct.sku}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
              {selectedProduct.name}
            </h1>
          </div>

          {/* Rating Summary Link */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToReviews}
              className="flex items-center gap-1.5 group cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "size-4",
                      i < Math.round(avgRating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-foreground group-hover:text-primary">
                {avgRating.toFixed(1)}
              </span>
              <span className="text-xs text-muted-foreground underline underline-offset-4">
                ({totalReviews} {isDe ? "Bewertungen" : "Reviews"})
              </span>
            </button>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-3" /> {isDe ? "100% Weiterempfehlung" : "100% Recommended"}
            </span>
          </div>

          {/* Price & Badges */}
          <div className="flex items-baseline gap-3 py-1">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {formatPrice(selectedProduct.price)}
            </span>
            {onSale && (
              <span className="text-xl text-muted-foreground line-through font-medium">
                {formatPrice(selectedProduct.compareAtPrice!)}
              </span>
            )}
            {selectedProduct.badges?.length > 0 && (
              <div className="flex gap-1.5 ml-2">
                {selectedProduct.badges.map((badge) => (
                  <Badge key={badge} variant={badge === "sale" ? "destructive" : "secondary"}>
                    {BADGE_LABELS[badge]}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Multi-Attribute Variant Selector */}
          {variants.length > 1 && (
            <div className="flex flex-col gap-4 rounded-2xl border border-border/80 bg-card/70 p-4.5 shadow-xs">
              {/* Package Format Selector */}
              {multiGroup.hasMultipleFormats && (
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {isDe ? "Packungsformat:" : "Package Format:"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {multiGroup.formats.map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => handleSelectFormat(fmt)}
                        className={cn(
                          "rounded-xl px-4 py-2 text-xs font-bold transition-all border cursor-pointer",
                          selectedFormat === fmt
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted"
                        )}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dosage / Strength Selector */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {isDe ? "Dosierung / Wirkstärke wählen:" : "Select Dosage / Strength:"}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {(multiGroup.hasMultipleFormats
                    ? (multiGroup.optionsByFormat[selectedFormat] || multiGroup.allOptions)
                    : multiGroup.allOptions
                  ).map((opt) => {
                    const isSelected = opt.product.slug === selectedProduct.slug;
                    return (
                      <button
                        key={opt.product.slug}
                        type="button"
                        onClick={() => handleSelectVariant(opt.product)}
                        className={cn(
                          "flex flex-col items-start justify-between rounded-xl p-3 text-xs font-bold transition-all border text-left cursor-pointer",
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary shadow-sm ring-2 ring-primary/40"
                            : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted"
                        )}
                      >
                        <span className="font-extrabold text-xs leading-snug w-full">{opt.strength}</span>
                        <span
                          className={cn(
                            "mt-1.5 text-[11px] font-extrabold rounded-md px-2 py-0.5",
                            isSelected
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "bg-muted text-foreground font-bold"
                          )}
                        >
                          {formatPrice(opt.product.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* HIGH-VISIBILITY BULK WHOLESALE & VOLUME DISCOUNT TABLE */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                <Building2 className="size-3.5 text-primary" />
                <span>{isDe ? "Mengenrabatte für Labore & Institute" : "Bulk Wholesale & Volume Discounts"}</span>
              </div>
              <Link href="/wholesale" className="text-[11px] font-semibold text-primary underline hover:opacity-80">
                {isDe ? "B2B-Konditionen →" : "B2B Terms →"}
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {/* 5-9 Units */}
              <button
                type="button"
                onClick={() => setQuantity(5)}
                className={cn(
                  "rounded-xl border p-2 text-left transition-all cursor-pointer",
                  quantity >= 5 && quantity < 10
                    ? "bg-primary/15 border-primary ring-1 ring-primary"
                    : "bg-background/80 border-border hover:border-primary/40"
                )}
              >
                <div className="text-[11px] font-bold text-foreground">5 – 9 {isDe ? "Stk." : "Units"}</div>
                <div className="text-xs font-extrabold text-primary">{formatPrice(priceTier5)}</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">-10% {isDe ? "Rabatt" : "Off"}</div>
              </button>

              {/* 10-24 Units */}
              <button
                type="button"
                onClick={() => setQuantity(10)}
                className={cn(
                  "rounded-xl border p-2 text-left transition-all cursor-pointer relative",
                  quantity >= 10 && quantity < 25
                    ? "bg-primary/15 border-primary ring-1 ring-primary"
                    : "bg-background/80 border-border hover:border-primary/40"
                )}
              >
                <span className="absolute -top-2 right-1.5 bg-primary text-primary-foreground text-[8px] font-bold px-1.5 py-0.2 rounded-full">
                  POPULAR
                </span>
                <div className="text-[11px] font-bold text-foreground">10 – 24 {isDe ? "Stk." : "Units"}</div>
                <div className="text-xs font-extrabold text-primary">{formatPrice(priceTier10)}</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">-20% {isDe ? "Rabatt" : "Off"}</div>
              </button>

              {/* 25+ Units */}
              <button
                type="button"
                onClick={() => setQuantity(25)}
                className={cn(
                  "rounded-xl border p-2 text-left transition-all cursor-pointer",
                  quantity >= 25
                    ? "bg-primary/15 border-primary ring-1 ring-primary"
                    : "bg-background/80 border-border hover:border-primary/40"
                )}
              >
                <div className="text-[11px] font-bold text-foreground">25+ {isDe ? "Stk." : "Units"}</div>
                <div className="text-xs font-extrabold text-primary">{formatPrice(priceTier25)}</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">-30% {isDe ? "Rabatt" : "Off"}</div>
              </button>
            </div>
          </div>

          {/* Stock & Shipping Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-y border-border py-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground"><span>{isDe ? "Verfügbarkeit:" : "Availability:"}</span></span>
              <span className={cn("font-bold text-xs flex items-center gap-1.5", stock.className)}>
                <span className={cn("size-2 rounded-full inline-block animate-pulse", stock.dotColor)} />
                {stock.label}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Truck className="size-3.5 text-primary" />
              <span>{isDe ? "Versandfertig in 24h aus München (1–2 Werktage)" : "Dispatched in 24h from Munich (1–2 days)"}</span>
            </div>
          </div>

          {/* Add to Cart Stepper & CTA */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex items-center rounded-2xl border border-input bg-card shadow-xs">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="size-12 rounded-l-2xl cursor-pointer"
              >
                <Minus className="size-4" />
              </Button>
              <span className="w-10 text-center text-base font-extrabold">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="size-12 rounded-r-2xl cursor-pointer"
              >
                <Plus className="size-4" />
              </Button>
            </div>
            <Button
              size="lg"
              className="h-12 flex-1 text-sm font-extrabold shadow-md rounded-2xl cursor-pointer hover:shadow-lg transition-all"
              disabled={!canAddToCart}
              onClick={handleAddToCart}
            >
              {canAddToCart ? t.products.addToCart : t.products.outOfStock}
            </Button>
          </div>

          {/* High-Impact Trust Checklist */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-muted/20 p-2.5 text-xs">
              <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
              <span className="font-semibold text-foreground">HPLC Reinheit ≥99.0%</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-muted/20 p-2.5 text-xs">
              <Snowflake className="size-4 text-sky-500 shrink-0" />
              <span className="font-semibold text-foreground">{isDe ? "Kühlketten-Logistik" : "Cold-Chain Logistics"}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-muted/20 p-2.5 text-xs">
              <Lock className="size-4 text-primary shrink-0" />
              <span className="font-semibold text-foreground">{isDe ? "100% Diskreter Versand" : "100% Discreet Delivery"}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-muted/20 p-2.5 text-xs">
              <Award className="size-4 text-amber-500 shrink-0" />
              <span className="font-semibold text-foreground">{isDe ? "Zertifiziertes CoA Labor" : "Certified CoA Lab"}</span>
            </div>
          </div>

          {/* B2B Wholesale / Bulk Institutional Order Banner */}
          <div className="rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/10 via-card to-primary/5 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Building2 className="size-4" />
              </div>
              <div className="text-xs">
                <p className="font-black text-foreground">
                  {isDe ? "Großhandel & B2B-Mengenrabatte (Bis zu -35%)" : "Bulk Wholesale & Institutional Discounts (Up to -35%)"}
                </p>
                <p className="text-muted-foreground text-[11px] mt-0.5">
                  {isDe ? "Sonderpreise für Universitäten, Labore & Kliniken." : "Custom volume pricing for research labs & resellers."}
                </p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="rounded-xl font-bold text-xs h-8 shrink-0 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground" asChild>
              <Link href="/wholesale">
                {isDe ? "B2B Konditionen" : "Wholesale Portal"}
                <ArrowRight className="size-3 ml-1" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>

      {/* 2. Bento Trust Pillars Grid */}
      <Reveal delay={0.12} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border/80 bg-card p-4.5 flex flex-col gap-2 shadow-2xs">
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="size-5" />
          </div>
          <h3 className="text-sm font-extrabold text-foreground">{isDe ? "Zertifizierte Reinheit" : "Certified Purity"}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {isDe ? "Geprüft durch High-Performance Liquid Chromatography (HPLC) & Massenspektrometrie." : "Verified by HPLC & mass spectrometry analytics."}
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-4.5 flex flex-col gap-2 shadow-2xs">
          <div className="flex size-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
            <Snowflake className="size-5" />
          </div>
          <h3 className="text-sm font-extrabold text-foreground">{isDe ? "Temperaturgarantie" : "Cold-Chain Safety"}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {isDe ? "Thermogeschützte Verpackung für maximale biologische Peptidstabilität." : "Insulated packaging for optimal peptide stability."}
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-4.5 flex flex-col gap-2 shadow-2xs">
          <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Award className="size-5" />
          </div>
          <h3 className="text-sm font-extrabold text-foreground">{isDe ? "GMP & ISO 9001" : "GMP & ISO 9001"}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {isDe ? "Höchste Produktionsstandards ohne Verunreinigungen oder Schwermetalle." : "Produced according to the strictest pharmaceutical standards."}
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-4.5 flex flex-col gap-2 shadow-2xs">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Truck className="size-5" />
          </div>
          <h3 className="text-sm font-extrabold text-foreground">{isDe ? "Expressversand aus München" : "Fast Express Delivery"}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {isDe ? "Schneller, neutraler und versicherter DHL Express Versand direkt aus München." : "Tracked and insured delivery directly from Munich."}
          </p>
        </div>
      </Reveal>

      {/* 3. FULL-WIDTH ADDITIONAL DETAILS & REVIEWS HUB */}
      <div ref={reviewsTabRef} className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-5 mb-8 gap-4">
            <TabsList className="grid grid-cols-3 max-w-lg h-12 p-1 bg-muted/80 rounded-2xl">
              <TabsTrigger
                value="specs"
                className="rounded-xl text-xs sm:text-sm font-bold gap-2 data-[state=active]:bg-card data-[state=active]:shadow-xs cursor-pointer"
              >
                <FlaskConical className="size-4 text-primary" />
                <span>{isDe ? "Spezifikationen" : "Specs"}</span>
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-xl text-xs sm:text-sm font-bold gap-2 data-[state=active]:bg-card data-[state=active]:shadow-xs cursor-pointer"
              >
                <Star className="size-4 text-amber-400 fill-amber-400" />
                <span>{isDe ? `Bewertungen (${totalReviews})` : `Reviews (${totalReviews})`}</span>
              </TabsTrigger>
              <TabsTrigger
                value="guide"
                className="rounded-xl text-xs sm:text-sm font-bold gap-2 data-[state=active]:bg-card data-[state=active]:shadow-xs cursor-pointer"
              >
                <FileText className="size-4 text-sky-500" />
                <span>{isDe ? "Leitfaden" : "Protocol"}</span>
              </TabsTrigger>
            </TabsList>

            <Link
              href="/quality-documentation"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
            >
              <Award className="size-4" />
              <span>{isDe ? "Analysezertifikat (CoA) anfordern →" : "Request Official CoA →"}</span>
            </Link>
          </div>

          {/* TAB 1: SPEZIFIKATIONEN & COA */}
          <TabsContent value="specs" className="space-y-6 outline-none">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Specs List (7 cols) */}
              <div className="md:col-span-7 flex flex-col gap-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  {isDe ? "Laboranalytische Daten & Parameter" : "Laboratory Analytical Parameters"}
                </h3>
                <div className="rounded-2xl border border-border/80 bg-card overflow-hidden divide-y divide-border/60">
                  {localizedSpecifications.map((spec, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3.5 text-xs hover:bg-muted/30 transition-colors">
                      <span className="font-semibold text-muted-foreground">{spec.label}</span>
                      <div className="flex items-center gap-2 font-mono font-bold text-foreground">
                        <span>{spec.value}</span>
                        <button
                          onClick={() => copyToClipboard(spec.value, spec.label)}
                          className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors"
                          title="Copy value"
                        >
                          {copiedSpec === spec.label ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CoA Card (5 cols) */}
              <div className="md:col-span-5 flex flex-col gap-4 rounded-2xl border border-border/80 bg-muted/20 p-6">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Award className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Certificate of Analysis (CoA)</h4>
                    <p className="text-xs text-muted-foreground">HPLC & MS Chargenprüfung</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {isDe
                    ? "Jedes Peptid wird chargenrein dokumentiert. Das vollständige Analysedokument mit chromatographischem Reinheitsprofil liegt jeder Sendung bei oder kann digital heruntergeladen werden."
                    : "Full analytical documentation with chromatographic purity profiling is available for download and included with every laboratory shipment."}
                </p>

                <Button variant="outline" size="sm" asChild className="w-full font-bold gap-2">
                  <Link href="/quality-documentation">
                    <FileText className="size-4" />
                    <span>{isDe ? "CoA Dokumentation einsehen" : "View Quality Documentation"}</span>
                  </Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: KUNDENBEWERTUNGEN */}
          <TabsContent value="reviews" className="space-y-8 outline-none">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 rounded-3xl border border-border/80 bg-muted/20 p-6 sm:p-8 items-center">
              <div className="md:col-span-4 flex flex-col items-center justify-center text-center md:border-r border-border pb-6 md:pb-0 md:pr-6">
                <span className="text-5xl font-black text-foreground tracking-tight">{avgRating.toFixed(2)}</span>
                <div className="flex items-center gap-1 my-2.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground font-semibold">
                  {isDe ? `Basierend auf ${totalReviews} verifizierten Käufen` : `Based on ${totalReviews} verified purchases`}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <ThumbsUp className="size-3.5" /> 100% Weiterempfehlung
                </span>
              </div>

              <div className="md:col-span-5 flex flex-col justify-center gap-2.5 md:border-r border-border pb-6 md:pb-0 md:pr-6">
                <div className="flex items-center gap-3 text-xs">
                  <span className="w-16 font-bold text-foreground">5 Sterne</span>
                  <div className="h-2.5 flex-1 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-amber-400 transition-all duration-700" style={{ width: `${fiveStarPct}%` }} />
                  </div>
                  <span className="w-10 text-right font-extrabold text-foreground">{fiveStarPct}%</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="w-16 font-bold text-foreground">4 Sterne</span>
                  <div className="h-2.5 flex-1 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-amber-400 transition-all duration-700" style={{ width: `${fourStarPct}%` }} />
                  </div>
                  <span className="w-10 text-right font-extrabold text-foreground">{fourStarPct}%</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="w-16 font-bold text-foreground">3 Sterne</span>
                  <div className="h-2.5 flex-1 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-amber-400" style={{ width: `${threeStarPct}%` }} />
                  </div>
                  <span className="w-10 text-right font-extrabold text-foreground">{threeStarPct}%</span>
                </div>
              </div>

              <div className="md:col-span-3 flex flex-col justify-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  {isDe ? "Nach Bewertung filtern:" : "Filter Reviews:"}
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setRatingFilter(null)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer",
                      ratingFilter === null
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border hover:bg-muted"
                    )}
                  >
                    Alle ({totalReviews})
                  </button>
                  <button
                    onClick={() => setRatingFilter(5)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer",
                      ratingFilter === 5
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border hover:bg-muted"
                    )}
                  >
                    5 ★ ({fiveStarCount})
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReviews.map((review) => {
                const initials = review.author
                  .split(" ")
                  .slice(0, 2)
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase();

                return (
                  <div
                    key={review.id}
                    className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-2xs transition-all hover:border-primary/40 hover:shadow-xs"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-extrabold text-primary shadow-2xs">
                            {initials}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-foreground leading-snug">{review.author}</p>
                            <span className="text-[11px] text-muted-foreground font-medium">
                              {new Date(review.date).toLocaleDateString(isDe ? "de-DE" : "en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                        {review.verified && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="size-3.5" /> {isDe ? "Verifizierter Kauf" : "Verified"}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-0.5 mt-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "size-4",
                              i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                            )}
                          />
                        ))}
                      </div>

                      <h4 className="mt-2.5 text-sm font-bold text-foreground leading-snug">{review.title}</h4>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{review.content}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">✓ Empfiehlt dieses Produkt</span>
                      <span>Laborgeprüfte Charge aus München</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* TAB 3: ANWENDUNG & LEITFADEN */}
          <TabsContent value="guide" className="space-y-6 outline-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-border/80 bg-muted/20 p-5 flex flex-col gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs">
                  01
                </div>
                <h4 className="text-sm font-extrabold text-foreground">Vorbereitung & Rekonstitution</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Verwenden Sie steriles bakteriostatisches Wasser. Lassen Sie die Flüssigkeit langsam an der Glaswand entlang einfließen und schwenken Sie die Vial sanft (nicht schütteln).
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-muted/20 p-5 flex flex-col gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs">
                  02
                </div>
                <h4 className="text-sm font-extrabold text-foreground">Präzise Dosierung</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Nutzen Sie feinskalierte 1-ml-Insulinspritzen (30G/31G) oder den Mehrdosis-Klickmechanismus für exakte Mikrogramm- bzw. Milligramm-Dosierungen.
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-muted/20 p-5 flex flex-col gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs">
                  03
                </div>
                <h4 className="text-sm font-extrabold text-foreground">Kühlung & Haltbarkeit</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Gelöste Peptide stets im Kühlschrank bei 2°C bis 8°C lagern und vor Licht schützen. Unrekonstituiertes Pulver im Gefrierschrank aufbewahren.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-5">
              <h4 className="text-sm font-extrabold text-foreground mb-1.5">Produktübersicht & Anwendungsgebiete</h4>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {selectedProduct.description}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 4. Bottom Centered Long SEO Monograph */}
      {selectedProduct.longDescription && (
        <ProductLongDescription
          content={selectedProduct.longDescription}
          title={selectedProduct.name}
        />
      )}
    </div>
  );
}
