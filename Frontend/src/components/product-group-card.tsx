"use client";

import Image from "next/image";
import Link from "@/components/ui/localized-link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion/variants";
import { formatPrice } from "@/lib/format-currency";
import type { ProductGroup } from "@/lib/product-grouping";
import type { ProductBadge } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/lib/i18n-client";

export function ProductGroupCard({ group }: { group: ProductGroup }) {
  const image = group.image;
  const isRange = group.priceTo > group.priceFrom;
  const locale = useLocale();

  const BADGE_LABELS: Record<ProductBadge, string> = {
    new: locale === "de" ? "Neu" : "New",
    "best-seller": locale === "de" ? "Bestseller" : "Best Seller",
    limited: locale === "de" ? "Limitiert" : "Limited",
    sale: locale === "de" ? "Angebot" : "Sale",
    "coa-verified": locale === "de" ? "CoA Verifiziert" : "CoA Verified",
    featured: locale === "de" ? "Empfohlen" : "Featured",
  };

  return (
    <motion.div whileHover={{ y: -6 }} whileTap={{ y: -2 }} transition={{ duration: 0.25, ease: EASE }} className="group h-full">
      <Link
        href={ROUTES.product(group.slug)}
        className="flex h-full flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand/15"
      >
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          )}
          {group.badges.length > 0 && (
            <div className="absolute left-2 top-2 flex flex-wrap gap-1">
              {group.badges.slice(0, 2).map((badge) => (
                <Badge key={badge} variant={badge === "sale" ? "destructive" : "default"} className={cn(badge !== "sale" && "bg-foreground/90 text-background")}>
                  {BADGE_LABELS[badge]}
                </Badge>
              ))}
            </div>
          )}
          {group.optionCount > 1 && (
            <div className="absolute right-2 top-2">
              <Badge variant="secondary" className="bg-background/90 text-foreground">
                {group.optionCount} {locale === "de" ? "Optionen" : "options"}
              </Badge>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{group.categoryName}</span>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">{group.name}</h3>

          <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">{group.rating.toFixed(1)}</span>
            <span>({group.reviewCount})</span>
          </div>

          <div className="mt-auto flex items-center gap-2 pt-2">
            <span className="text-base font-semibold text-foreground">
              {isRange && <span className="font-normal text-muted-foreground">{locale === "de" ? "Ab " : "From "}</span>}
              {formatPrice(group.priceFrom)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
