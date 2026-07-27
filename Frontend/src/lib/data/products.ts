import { cache } from "react";

import { supabase } from "@/lib/supabase/client";
import type { Product, ProductBadge, ProductImage, StockStatus } from "@/types";

const FALLBACK_IMAGE: ProductImage = {
  src: "/images/hero/hero-lab-vials.png",
  alt: "Research peptide vial placeholder",
  title: "Research peptide vial",
  width: 1200,
  height: 1200,
};

const NEW_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

const PRODUCT_SELECT = `
  id, name, slug, short_description, description, price, discount_price, sku, brand,
  stock, featured, best_seller, status, rating, category_id, created_at,
  category:categories(id, name, slug),
  product_images(id, image_url, created_at)
`;

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price: number;
  discount_price: number | null;
  sku: string | null;
  brand: string | null;
  stock: number;
  featured: boolean;
  best_seller: boolean;
  rating: number;
  created_at: string;
  category: { id: string; name: string; slug: string } | null;
  product_images: { id: string; image_url: string; created_at: string }[];
};

function deriveStock(stock: number): StockStatus {
  if (stock <= 0) return "out-of-stock";
  if (stock < 10) return "low-stock";
  return "in-stock";
}

function deriveBadges(row: ProductRow, onSale: boolean): ProductBadge[] {
  const badges: ProductBadge[] = [];
  if (row.best_seller) badges.push("best-seller");
  if (onSale) badges.push("sale");
  if (Date.now() - new Date(row.created_at).getTime() < NEW_WINDOW_MS) badges.push("new");
  return badges;
}

function mapProduct(row: ProductRow, reviewCount: number): Product {
  const onSale = row.discount_price != null && row.discount_price < row.price;
  const images = row.product_images.length
    ? row.product_images
        .slice()
        .sort((a, b) => a.created_at.localeCompare(b.created_at))
        .map((img) => ({ src: img.image_url, alt: row.name, title: row.name, width: 1200, height: 1200 }))
    : [FALLBACK_IMAGE];

  return {
    id: row.id,
    slug: row.slug,
    sku: row.sku ?? "",
    name: row.name,
    shortDescription: row.short_description ?? "",
    description: row.description ?? "",
    categorySlug: row.category?.slug ?? "",
    categoryName: row.category?.name ?? "Uncategorized",
    price: onSale ? row.discount_price! : row.price,
    compareAtPrice: onSale ? row.price : undefined,
    currency: "USD",
    purity: "—",
    concentration: "—",
    images,
    badges: deriveBadges(row, onSale),
    stock: deriveStock(row.stock),
    stockCount: row.stock,
    rating: row.rating,
    reviewCount,
    reviews: [],
    specifications: [],
    certificateOfAnalysisUrl: undefined,
    featured: row.featured,
    bestSeller: row.best_seller,
    createdAt: row.created_at,
  };
}

/** All published products, memoized per request. */
export const getProducts = cache(async (): Promise<Product[]> => {
  const [{ data: rows, error }, { data: reviewRows }] = await Promise.all([
    supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .returns<ProductRow[]>(),
    supabase.from("reviews").select("product_id").eq("status", "approved"),
  ]);

  if (error) {
    console.error("Failed to load products:", error.message);
    return [];
  }

  const reviewCounts = new Map<string, number>();
  for (const r of reviewRows ?? []) {
    reviewCounts.set(r.product_id, (reviewCounts.get(r.product_id) ?? 0) + 1);
  }

  return (rows ?? []).map((row) => mapProduct(row, reviewCounts.get(row.id) ?? 0));
});

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const product = (await getProducts()).find((p) => p.slug === slug);
  if (!product) return undefined;

  const { data: reviewRows } = await supabase
    .from("reviews")
    .select("id, author_name, rating, title, body, created_at, customer_id")
    .eq("product_id", product.id)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  return {
    ...product,
    reviews: (reviewRows ?? []).map((r) => ({
      id: r.id,
      author: r.author_name,
      rating: r.rating,
      title: r.title ?? "",
      content: r.body,
      date: r.created_at,
      verified: r.customer_id != null,
    })),
  };
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.categorySlug === categorySlug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.featured);
}

export async function getBestSellers(): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.bestSeller);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return (await getProducts())
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
}
