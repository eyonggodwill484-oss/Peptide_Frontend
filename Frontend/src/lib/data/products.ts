import { cache } from "react";

import { supabase } from "@/lib/supabase/client";
import { SITE_CURRENCY } from "@/constants/site";
import type { Product, ProductBadge, ProductImage, StockStatus } from "@/types";
import { extractBaseName } from "@/lib/variant-parser";
import { getProductImagesForProduct } from "./product-images";
import { ALL_VARIABLE_PRODUCTS } from "./variable-products";
import { ALL_SARMS_PRODUCTS } from "./sarms-products";
import { ALL_WEIGHT_LOSS_PRODUCTS } from "./weight-loss-products";
import { ALL_TABLET_PRODUCTS } from "./tablet-products";
import { ALL_STEROID_OILS_PRODUCTS } from "./steroid-oils-products";
import { generateProductReviews, generateProductSpecifications } from "./reviews-and-specs";

function ensureReviewsAndSpecs(p: Product): Product {
  const reviews = (p.reviews && p.reviews.length >= 8)
    ? p.reviews
    : generateProductReviews(p.name, p.categorySlug, p.slug);

  const avgRating = reviews.length > 0
    ? Number((reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(2))
    : 4.93;

  const specifications = (p.specifications && p.specifications.length >= 4)
    ? p.specifications
    : generateProductSpecifications(p);

  return {
    ...p,
    reviews,
    reviewCount: reviews.length,
    rating: avgRating,
    specifications,
  };
}

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

function mapProduct(row: ProductRow, reviews: Product["reviews"]): Product {
  const onSale = row.discount_price != null && row.discount_price < row.price;
  const images = row.product_images.length
    ? row.product_images
        .slice()
        .sort((a, b) => a.created_at.localeCompare(b.created_at))
        .map((img) => ({ src: img.image_url, alt: row.name, title: row.name, width: 1200, height: 1200 }))
    : getProductImagesForProduct(row.name, row.category?.slug ?? "");

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
    currency: SITE_CURRENCY,
    purity: "—",
    concentration: "—",
    images,
    badges: deriveBadges(row, onSale),
    stock: deriveStock(row.stock),
    stockCount: row.stock,
    rating: row.rating || 5,
    reviewCount: reviews.length,
    reviews,
    specifications: [],
    certificateOfAnalysisUrl: undefined,
    featured: row.featured,
    bestSeller: row.best_seller,
    createdAt: row.created_at,
  };
}

const LOCAL_PRODUCTS: Product[] = [
  ...ALL_VARIABLE_PRODUCTS,
  ...ALL_SARMS_PRODUCTS,
  ...ALL_WEIGHT_LOSS_PRODUCTS,
  ...ALL_TABLET_PRODUCTS,
  ...ALL_STEROID_OILS_PRODUCTS,
].map(ensureReviewsAndSpecs);

let memoryProductsCache: Product[] | null = null;
let memoryProductsPromise: Promise<Product[]> | null = null;

async function fetchProductsFromDb(): Promise<Product[]> {
  if (memoryProductsCache) return memoryProductsCache;

  try {
    const [{ data: rows, error }, { data: reviewRows }] = await Promise.all([
      supabase
        .from("products")
        .select(PRODUCT_SELECT)
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .returns<ProductRow[]>(),
      supabase
        .from("reviews")
        .select("id, product_id, author_name, rating, title, body, created_at, customer_id")
        .eq("status", "approved")
        .order("created_at", { ascending: false }),
    ]);

    if (error) {
      console.error("Failed to load products from DB:", error.message);
    }

    const reviewsByProduct = new Map<string, Product["reviews"]>();
    for (const r of reviewRows ?? []) {
      const list = reviewsByProduct.get(r.product_id) ?? [];
      list.push({
        id: r.id,
        author: r.author_name,
        rating: r.rating,
        title: r.title ?? "",
        content: r.body,
        date: r.created_at,
        verified: r.customer_id != null,
      });
      reviewsByProduct.set(r.product_id, list);
    }

    const dbProductsBySlug = new Map<string, Product>();
    const allDbMappedProducts: Product[] = [];

    for (const row of rows ?? []) {
      const p = mapProduct(row, reviewsByProduct.get(row.id) ?? []);
      dbProductsBySlug.set(p.slug, p);
      allDbMappedProducts.push(p);
    }

    // 1. Merge standard variable products catalogue (Peptides + SARMs + Weight Loss + Tablets + Steroid Oils) with any DB reviews or live updates
    const localCatalog = [
      ...ALL_VARIABLE_PRODUCTS,
      ...ALL_SARMS_PRODUCTS,
      ...ALL_WEIGHT_LOSS_PRODUCTS,
      ...ALL_TABLET_PRODUCTS,
      ...ALL_STEROID_OILS_PRODUCTS,
    ];
    const variableProductSlugs = new Set(localCatalog.map((stdProd) => stdProd.slug));
    const enrichedVariableProducts: Product[] = localCatalog.map((stdProd) => {
      const dbProd = dbProductsBySlug.get(stdProd.slug);
      if (dbProd) {
        return {
          ...stdProd,
          id: dbProd.id,
          reviews: dbProd.reviews,
          reviewCount: dbProd.reviewCount > 0 ? dbProd.reviewCount : stdProd.reviewCount,
          rating: dbProd.rating > 0 ? dbProd.rating : stdProd.rating,
        };
      }
      return stdProd;
    });

    // 2. Include all other products from DB
    const otherDbProducts = allDbMappedProducts.filter(
      (p) =>
        !variableProductSlugs.has(p.slug) &&
        p.categorySlug !== "sarms-powders" &&
        p.categorySlug !== "diabetes-and-weight-loss" &&
        p.categorySlug !== "steroid-and-sarms-tablets" &&
        p.categorySlug !== "steroid-oils"
    );

    const finalProducts: Product[] = [...enrichedVariableProducts, ...otherDbProducts].map(ensureReviewsAndSpecs);

    memoryProductsCache = finalProducts;
    return finalProducts;
  } catch (err) {
    console.error("Exception loading products:", err);
    return LOCAL_PRODUCTS;
  }
}

/** All published products, memoized per request and process. */
export const getProducts = cache(async (): Promise<Product[]> => {
  if (!memoryProductsPromise) {
    memoryProductsPromise = fetchProductsFromDb();
  }
  return memoryProductsPromise;
});

export const getProductBySlug = cache(async (slug: string): Promise<Product | undefined> => {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
});

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.categorySlug === categorySlug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.featured);
}

export async function getBestSellers(): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.bestSeller);
}

function productLineName(name: string): string {
  return extractBaseName(name).toLowerCase();
}

/** Get all variations/strengths belonging to the same product line */
export async function getSiblingVariants(product: Product): Promise<Product[]> {
  const currentLine = productLineName(product.name);
  const allProducts = await getProducts();
  return allProducts
    .filter(
      (p) =>
        p.categorySlug === product.categorySlug &&
        productLineName(p.name) === currentLine
    )
    .sort((a, b) => a.price - b.price);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const currentLine = productLineName(product.name);
  // Exclude other dosages/sizes of the same product — those aren't useful
  // "you might also like" suggestions, they're the thing already being viewed.
  return (await getProducts())
    .filter(
      (p) =>
        p.categorySlug === product.categorySlug &&
        p.id !== product.id &&
        productLineName(p.name) !== currentLine
    )
    .slice(0, limit * 3); // over-fetch; caller groups remaining sibling sets down to `limit`
}
