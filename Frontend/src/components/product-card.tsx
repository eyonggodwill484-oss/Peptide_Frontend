"use client";

import Image from "next/image";
import Link from "@/components/ui/localized-link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Star } from "lucide-react";
import { toast } from "sonner";

import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion/variants";
import { formatPrice } from "@/lib/format-currency";
import { useCartStore } from "@/lib/store/cart-store";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/lib/i18n-client";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0];
  const [imgSrc, setImgSrc] = useState(image?.src || "/images/hero/hero-lab-vials.png");
  const onSale = typeof product.compareAtPrice === "number" && product.compareAtPrice > product.price;
  const canAddToCart = product.stock !== "out-of-stock";
  const addItem = useCartStore((state) => state.addItem);
  const locale = useLocale();

  const BADGE_LABELS: Record<Product["badges"][number], string> = {
    new: locale === "de" ? "Neu" : "New",
    "best-seller": locale === "de" ? "Bestseller" : "Best Seller",
    limited: locale === "de" ? "Limitiert" : "Limited",
    sale: locale === "de" ? "Angebot" : "Sale",
    "coa-verified": locale === "de" ? "CoA Verifiziert" : "CoA Verified",
    featured: locale === "de" ? "Empfohlen" : "Featured",
  };

  function handleAddToCart(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    addItem(product, 1);
    toast.success(
      locale === "de" ? `${product.name} zum Warenkorb hinzugefügt` : `${product.name} added to cart`
    );
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ y: -2 }}
      transition={{ duration: 0.25, ease: EASE }}
      className="group h-full"
    >
      <Link
        href={ROUTES.product(product.slug)}
        className="flex h-full flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand/15"
      >
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <Image
            src={imgSrc}
            alt={image?.alt || product.name}
            fill
            unoptimized={imgSrc.startsWith("http")}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={() => setImgSrc("/images/hero/hero-lab-vials.png")}
          />
          {product.badges.length > 0 && (
            <div className="absolute left-2 top-2 flex flex-wrap gap-1">
              {product.badges.slice(0, 2).map((badge) => (
                <Badge
                  key={badge}
                  variant={badge === "sale" ? "destructive" : "default"}
                  className={cn(badge !== "sale" && "bg-foreground/90 text-background")}
                >
                  {BADGE_LABELS[badge]}
                </Badge>
              ))}
            </div>
          )}

          {canAddToCart && (
            <button
              type="button"
              onClick={handleAddToCart}
              aria-label={locale === "de" ? `${product.name} in den Warenkorb` : `Add ${product.name} to cart`}
              className="absolute inset-x-2 bottom-2 z-10 flex translate-y-14 items-center justify-center gap-1.5 rounded-lg bg-brand py-2 text-sm font-semibold text-white opacity-0 shadow-lg shadow-brand/30 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 hover:bg-brand-dark focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              <Plus className="size-4" />
              {locale === "de" ? "In den Warenkorb" : "Add to Cart"}
            </button>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {product.categoryName}
            </span>
            {(product.categorySlug === "diabetes-and-weight-loss" || product.categorySlug === "weight-management") && (
              <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded-md shrink-0">
                {locale === "de" ? "💊 Verzehrbar" : "💊 Consumable"}
              </span>
            )}
          </div>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">{product.name}</h3>

          <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
            <span>({product.reviewCount})</span>
          </div>

          <div className="mt-auto flex items-center gap-2 pt-2">
            <span className="text-base font-semibold text-foreground">{formatPrice(product.price)}</span>
            {onSale && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice!)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
