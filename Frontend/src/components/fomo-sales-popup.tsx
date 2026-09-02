"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "@/components/ui/localized-link";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, X } from "lucide-react";

import { ROUTES } from "@/constants/routes";

interface FomoEvent {
  id: string;
  name: { en: string; de: string };
  location: { en: string; de: string };
  productName: { en: string; de: string };
  productSlug: string;
  imageSrc: string;
  price: string;
  timeAgo: { en: string; de: string };
  scarcityBadge: { en: string; de: string };
  scarcityType: "fire" | "zap" | "verified";
}

const FOMO_EVENTS: FomoEvent[] = [
  {
    id: "fomo-1",
    name: { en: "Dr. Maximilian B.", de: "Dr. Maximilian B." },
    location: { en: "München, Germany", de: "München, Bayern" },
    productName: { en: "BPC-157 Research Peptide 5mg", de: "BPC-157 Forschungspeptid 5mg" },
    productSlug: "bpc-157-research-peptide-5mg",
    imageSrc: "/images/products/bpc-157-research-peptide-5mg.png",
    price: "€44.90",
    timeAgo: { en: "About 4 minutes ago", de: "Vor 4 Minuten" },
    scarcityBadge: { en: "⚡ High Demand Compound", de: "⚡ Hohe Labornachfrage" },
    scarcityType: "fire",
  },
  {
    id: "fomo-2",
    name: { en: "Stefan W.", de: "Stefan W." },
    location: { en: "Berlin, Germany", de: "Berlin, Deutschland" },
    productName: { en: "TB-500 (Thymosin Beta-4) 5mg", de: "TB-500 (Thymosin Beta-4) 5mg" },
    productSlug: "tb-500-thymosin-beta4-research-5mg",
    imageSrc: "/images/products/tb-500-thymosin-beta4-research-5mg.png",
    price: "€49.90",
    timeAgo: { en: "About 9 minutes ago", de: "Vor 9 Minuten" },
    scarcityBadge: { en: "✓ HPLC Batch Tested (>99%)", de: "✓ HPLC-getestet (>99% Reinheit)" },
    scarcityType: "verified",
  },
  {
    id: "fomo-3",
    name: { en: "Laura H.", de: "Laura H." },
    location: { en: "Hamburg, Germany", de: "Hamburg, Deutschland" },
    productName: { en: "GHK-Cu Copper Tripeptide 50mg", de: "GHK-Cu Kupferpeptid 50mg" },
    productSlug: "ghk-cu-complex-50mg",
    imageSrc: "/images/products/ghk-cu-complex-50mg.png",
    price: "€54.90",
    timeAgo: { en: "About 14 minutes ago", de: "Vor 14 Minuten" },
    scarcityBadge: { en: "🔥 Trending in Cosmetics R&D", de: "🔥 Beliebt in der Kosmetikforschung" },
    scarcityType: "fire",
  },
  {
    id: "fomo-4",
    name: { en: "Johannes K.", de: "Johannes K." },
    location: { en: "Frankfurt am Main, Germany", de: "Frankfurt am Main, Hessen" },
    productName: { en: "Recovery Complex Blend 10mg", de: "Recovery Complex Blend 10mg" },
    productSlug: "recovery-complex-blend-10mg",
    imageSrc: "/images/products/recovery-complex-blend-10mg.png",
    price: "€129.00",
    timeAgo: { en: "About 21 minutes ago", de: "Vor 21 Minuten" },
    scarcityBadge: { en: "📦 Bulk Lab Pack Ordered", de: "📦 Labor-Großbestellung versendet" },
    scarcityType: "zap",
  },
  {
    id: "fomo-5",
    name: { en: "Dr. Markus T.", de: "Dr. Markus T." },
    location: { en: "Stuttgart, Germany", de: "Stuttgart, Baden-Württemberg" },
    productName: { en: "Bacteriostatic Water 30ml", de: "Bakteriostatisches Wasser 30ml" },
    productSlug: "bacteriostatic-water-30ml",
    imageSrc: "/images/products/bacteriostatic-water-30ml.png",
    price: "€14.90",
    timeAgo: { en: "About 27 minutes ago", de: "Vor 27 Minuten" },
    scarcityBadge: { en: "✓ 0.9% Benzyl Alcohol USP", de: "✓ 0,9% Benzylalkohol USP" },
    scarcityType: "verified",
  },
  {
    id: "fomo-6",
    name: { en: "Felix S.", de: "Felix S." },
    location: { en: "Köln, Germany", de: "Köln, NRW" },
    productName: { en: "Semax Research Solution 10mg", de: "Semax Forschungslösung 10mg" },
    productSlug: "semax-research-solution-10mg",
    imageSrc: "/images/products/semax-research-solution-10mg.png",
    price: "€69.90",
    timeAgo: { en: "About 32 minutes ago", de: "Vor 32 Minuten" },
    scarcityBadge: { en: "🧪 Neuro-Research Grade", de: "🧪 Neuropeptid-Forschungsqualität" },
    scarcityType: "fire",
  },
  {
    id: "fomo-7",
    name: { en: "Christian R.", de: "Christian R." },
    location: { en: "Düsseldorf, Germany", de: "Düsseldorf, NRW" },
    productName: { en: "AOD-9604 Peptide 5mg", de: "AOD-9604 Peptid 5mg" },
    productSlug: "aod-9604-fragment-5mg",
    imageSrc: "/images/products/aod-9604-fragment-5mg.png",
    price: "€42.90",
    timeAgo: { en: "About 38 minutes ago", de: "Vor 38 Minuten" },
    scarcityBadge: { en: "✓ 99.4% HPLC Purity Certified", de: "✓ 99,4% HPLC Reinheit zertifiziert" },
    scarcityType: "verified",
  },
  {
    id: "fomo-8",
    name: { en: "Moritz V.", de: "Moritz V." },
    location: { en: "Nürnberg, Germany", de: "Nürnberg, Bayern" },
    productName: { en: "Advanced Reconstitution Kit", de: "Erweitertes Rekonstitutions-Kit" },
    productSlug: "advanced-reconstitution-kit",
    imageSrc: "/images/products/advanced-reconstitution-kit.png",
    price: "€29.90",
    timeAgo: { en: "About 46 minutes ago", de: "Vor 46 Minuten" },
    scarcityBadge: { en: "⚡ Only 3 kits left in stock", de: "⚡ Nur noch 3 Kits auf Lager" },
    scarcityType: "zap",
  },
  {
    id: "fomo-9",
    name: { en: "Patrick M.", de: "Patrick M." },
    location: { en: "Wien, Austria", de: "Wien, Österreich" },
    productName: { en: "Sermorelin Acetate 5mg", de: "Sermorelin Acetat 5mg" },
    productSlug: "sermorelin-acetate-5mg",
    imageSrc: "/images/products/sermorelin-acetate-5mg.png",
    price: "€46.90",
    timeAgo: { en: "About 52 minutes ago", de: "Vor 52 Minuten" },
    scarcityBadge: { en: "🚀 Express Dispatched to Austria", de: "🚀 Express-Versand nach Österreich" },
    scarcityType: "verified",
  },
  {
    id: "fomo-10",
    name: { en: "Dr. Andreas K.", de: "Dr. Andreas K." },
    location: { en: "Heidelberg, Germany", de: "Heidelberg, Baden-Württemberg" },
    productName: { en: "Cold-Chain Starter Bundle", de: "Kühlketten-Starter-Bundle" },
    productSlug: "cold-chain-starter-bundle",
    imageSrc: "/images/products/cold-chain-starter-bundle.png",
    price: "€149.00",
    timeAgo: { en: "About 58 minutes ago", de: "Vor 58 Minuten" },
    scarcityBadge: { en: "❄️ Free Cold-Chain Shipping", de: "❄️ Gratis Kühlkettenversand" },
    scarcityType: "fire",
  },
];

interface FomoSalesPopupProps {
  locale?: string;
}

export function FomoSalesPopup({ locale = "en" }: FomoSalesPopupProps) {
  const isDe = locale === "de";
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isDismissed) return;

    // Initial popup after 4 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(initialTimer);
  }, [isDismissed]);

  useEffect(() => {
    if (isDismissed || isPaused) return;

    let hideTimer: NodeJS.Timeout;
    let nextTimer: NodeJS.Timeout;

    if (isVisible) {
      // Stay visible for 6.5 seconds
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 6500);
    } else {
      // Wait 30 seconds before showing the next popup
      nextTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % FOMO_EVENTS.length);
        setIsVisible(true);
      }, 30000);
    }

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [isVisible, isDismissed, isPaused]);

  if (isDismissed) return null;

  const currentEvent = FOMO_EVENTS[currentIndex];
  if (!currentEvent) return null;

  return (
    <div
      className="fixed bottom-4 left-4 z-40 max-w-[calc(100vw-2rem)] sm:max-w-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={currentEvent.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/95 p-3.5 shadow-2xl shadow-black/20 ring-1 ring-primary/20 backdrop-blur-md dark:bg-card/90"
          >
            {/* Ambient blue/cyan gradient overlay */}
            <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-primary/10 blur-2xl" />

            {/* Top Close Button */}
            <button
              onClick={() => {
                setIsVisible(false);
                setIsDismissed(true);
              }}
              className="absolute right-2.5 top-2.5 rounded-full p-1 text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Dismiss notification"
            >
              <X className="size-3.5" />
            </button>

            <Link
              href={ROUTES.product(currentEvent.productSlug)}
              className="flex items-center gap-3"
            >
              {/* Product Thumbnail with Badge */}
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted/40 p-1">
                <Image
                  src={currentEvent.imageSrc}
                  alt={isDe ? currentEvent.productName.de : currentEvent.productName.en}
                  fill
                  sizes="64px"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Text Info */}
              <div className="min-w-0 flex-1 pr-4">
                {/* Buyer Name & Location */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {isDe ? currentEvent.name.de : currentEvent.name.en}
                  </span>
                  <span>{isDe ? "aus" : "in"}</span>
                  <span className="inline-flex items-center gap-0.5 font-medium text-foreground">
                    <MapPin className="size-3 text-primary" />
                    <span className="truncate max-w-[110px]">
                      {isDe ? currentEvent.location.de : currentEvent.location.en}
                    </span>
                  </span>
                </div>

                {/* Action & Product Name */}
                <div className="mt-0.5">
                  <p className="text-[11px] text-muted-foreground">
                    {isDe ? "hat soeben bestellt:" : "recently purchased"}
                  </p>
                  <p className="truncate text-xs font-bold text-primary group-hover:underline">
                    {isDe ? currentEvent.productName.de : currentEvent.productName.en}
                  </p>
                </div>

                {/* Scarcity / Urgency Chip & Time */}
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300 ring-1 ring-amber-500/20">
                    {isDe ? currentEvent.scarcityBadge.de : currentEvent.scarcityBadge.en}
                  </span>
                  <span className="text-[10px] text-muted-foreground/80">
                    {isDe ? currentEvent.timeAgo.de : currentEvent.timeAgo.en}
                  </span>
                </div>
              </div>
            </Link>

            {/* Bottom Animated Progress Indicator Bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 6.5, ease: "linear" }}
              className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-primary to-amber-500"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
