"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { FileText, Minus, Plus, ShieldCheck, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { Reveal } from "@/components/motion/reveal";
import { ReadMore } from "@/components/read-more";

const BADGE_LABELS: Record<Product["badges"][number], string> = {
  new: "New",
  "best-seller": "Best Seller",
  limited: "Limited",
  sale: "Sale",
  "coa-verified": "CoA Verified",
};

const STOCK_LABELS: Record<Product["stock"], { label: string; className: string }> = {
  "in-stock": { label: "In Stock", className: "text-emerald-600 dark:text-emerald-400" },
  "low-stock": { label: "Low Stock", className: "text-amber-600 dark:text-amber-400" },
  "out-of-stock": { label: "Out of Stock", className: "text-destructive" },
  preorder: { label: "Available for Preorder", className: "text-primary" },
};

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const image = product.images[activeImage] ?? product.images[0];
  const onSale = typeof product.compareAtPrice === "number" && product.compareAtPrice > product.price;
  const stock = STOCK_LABELS[product.stock];
  const canAddToCart = product.stock !== "out-of-stock";

  function handleAddToCart() {
    addItem(product, quantity);
    toast.success(`${product.name} added to cart`, {
      description: `Quantity: ${quantity}`,
    });
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <Reveal className="flex flex-col gap-3">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
          {image && <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />}
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/10",
                  activeImage === i && "ring-2 ring-primary"
                )}
              >
                <Image src={img.src} alt={img.alt} fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </Reveal>

      <Reveal delay={0.1} className="flex flex-col gap-4">
        <div>
          <Link href={`/categories/${product.categorySlug}`} className="text-xs font-medium uppercase tracking-wide text-primary">
            {product.categoryName}
          </Link>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{product.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">SKU: {product.sku}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn("size-4", i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30")}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">{product.rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-3xl font-semibold text-foreground">{formatPrice(product.price)}</span>
          {onSale && <span className="text-lg text-muted-foreground line-through">{formatPrice(product.compareAtPrice!)}</span>}
          {product.badges.length > 0 && (
            <div className="flex gap-1.5">
              {product.badges.map((badge) => (
                <Badge key={badge} variant={badge === "sale" ? "destructive" : "secondary"}>
                  {BADGE_LABELS[badge]}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{product.shortDescription}</p>

        <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted/50 p-4 text-sm">
          <div>
            <span className="text-muted-foreground">Purity</span>
            <p className="font-medium text-foreground">{product.purity}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Concentration</span>
            <p className="font-medium text-foreground">{product.concentration}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Availability</span>
            <p className={cn("font-medium", stock.className)}>{stock.label}</p>
          </div>
          {product.certificateOfAnalysisUrl && (
            <div>
              <span className="text-muted-foreground">Documentation</span>
              <a
                href={product.certificateOfAnalysisUrl}
                className="flex items-center gap-1 font-medium text-primary hover:underline"
              >
                <FileText className="size-3.5" /> View CoA
              </a>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <div className="flex items-center rounded-lg border border-input">
            <Button variant="ghost" size="icon" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
              <Minus />
            </Button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
              <Plus />
            </Button>
          </div>
          <Button size="lg" className="h-9 flex-1" disabled={!canAddToCart} onClick={handleAddToCart}>
            {canAddToCart ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-primary" />
          Verified by independent third-party HPLC analysis
        </div>

        <Tabs defaultValue="description" className="mt-4">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-3 leading-relaxed text-muted-foreground">
            <ReadMore text={product.description} collapsedLines={6} />
          </TabsContent>
          <TabsContent value="specs" className="pt-3">
            <dl className="divide-y divide-border">
              {product.specifications.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 py-2 text-sm">
                  <dt className="text-muted-foreground">{spec.label}</dt>
                  <dd className="font-medium text-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </TabsContent>
          <TabsContent value="reviews" className="flex flex-col gap-4 pt-3">
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={cn("size-3.5", i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30")} />
                    ))}
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-foreground">{review.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{review.content}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {review.author} · {new Date(review.date).toLocaleDateString()}
                    {review.verified && " · Verified Purchase"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No reviews yet for this product.</p>
            )}
          </TabsContent>
        </Tabs>
      </Reveal>
    </div>
  );
}
