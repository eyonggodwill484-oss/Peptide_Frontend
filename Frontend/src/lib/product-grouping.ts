import type { Product, ProductBadge, StockStatus } from "@/types";
import { extractBaseName } from "@/lib/variant-parser";

export interface ProductGroup {
  key: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  image: Product["images"][number] | undefined;
  slug: string; // links to the cheapest variant's page
  priceFrom: number;
  priceTo: number;
  optionCount: number;
  rating: number;
  reviewCount: number;
  stock: StockStatus;
  badges: ProductBadge[];
  featured: boolean;
  bestSeller: boolean;
  createdAt: string;
}

const STOCK_RANK: Record<StockStatus, number> = {
  "in-stock": 0,
  "low-stock": 1,
  preorder: 2,
  "out-of-stock": 3,
};

function bestStock(items: Product[]): StockStatus {
  return items.reduce<StockStatus>(
    (best, p) => (STOCK_RANK[p.stock] < STOCK_RANK[best] ? p.stock : best),
    items[0].stock
  );
}

/**
 * Groups products that share a category and base name.
 */
export function groupProductsByLine(products: Product[]): ProductGroup[] {
  const byKey = new Map<string, Product[]>();

  for (const product of products) {
    const key = `${product.categorySlug}::${extractBaseName(product.name).toLowerCase()}`;
    const existing = byKey.get(key);
    if (existing) existing.push(product);
    else byKey.set(key, [product]);
  }

  return [...byKey.values()].map((items) => {
    const sorted = [...items].sort((a, b) => a.price - b.price);
    const cheapest = sorted[0];
    const priceFrom = sorted[0].price;
    const priceTo = sorted[sorted.length - 1].price;

    return {
      key: `${cheapest.categorySlug}::${extractBaseName(cheapest.name).toLowerCase()}`,
      name: extractBaseName(cheapest.name),
      categorySlug: cheapest.categorySlug,
      categoryName: cheapest.categoryName,
      image: cheapest.images[0],
      slug: cheapest.slug,
      priceFrom,
      priceTo,
      optionCount: items.length,
      rating: items.reduce((sum, p) => sum + p.rating, 0) / items.length,
      reviewCount: items.reduce((sum, p) => sum + p.reviewCount, 0),
      stock: bestStock(items),
      badges: [...new Set(items.flatMap((p) => p.badges))],
      featured: items.some((p) => p.featured),
      bestSeller: items.some((p) => p.bestSeller),
      createdAt: cheapest.createdAt,
    };
  });
}

