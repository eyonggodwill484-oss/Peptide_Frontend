"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Star } from "lucide-react";
import { toast } from "sonner";

import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion/variants";
import { useCartStore } from "@/lib/store/cart-store";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";

const BADGE_LABELS: Record<Product["badges"][number], string> = {
  new: "New",
  "best-seller": "Best Seller",
  limited: "Limited",
  sale: "Sale",
  "coa-verified": "CoA Verified",
};

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  const onSale = typeof product.compareAtPrice === "number" && product.compareAtPrice > product.price;
  const canAddToCart = product.stock !== "out-of-stock";
  const addItem = useCartStore((state) => state.addItem);

  function handleAddToCart(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
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
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          )}
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
              aria-label={`Add ${product.name} to cart`}
              className="absolute inset-x-2 bottom-2 z-10 flex translate-y-14 items-center justify-center gap-1.5 rounded-lg bg-brand py-2 text-sm font-semibold text-white opacity-0 shadow-lg shadow-brand/30 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 hover:bg-brand-dark focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              <Plus className="size-4" />
              Add to Cart
            </button>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {product.categoryName}
          </span>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">{product.name}</h3>

          <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
            <span>({product.reviewCount})</span>
          </div>

          <div className="mt-auto flex items-center gap-2 pt-2">
            <span className="text-base font-semibold text-foreground">${product.price.toFixed(2)}</span>
            {onSale && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.compareAtPrice!.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
