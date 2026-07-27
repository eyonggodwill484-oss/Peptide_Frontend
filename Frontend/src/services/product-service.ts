import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/data/products";
import type { Product, ProductFilters } from "@/types";

/** Pure, synchronous filter/sort over an already-fetched product list. */
export function filterProducts(products: Product[], filters: ProductFilters = {}): Product[] {
  let results = [...products];

  if (filters.categorySlugs?.length) {
    results = results.filter((p) => filters.categorySlugs!.includes(p.categorySlug));
  }
  if (typeof filters.minPrice === "number") {
    results = results.filter((p) => p.price >= filters.minPrice!);
  }
  if (typeof filters.maxPrice === "number") {
    results = results.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters.inStockOnly) {
    results = results.filter((p) => p.stock === "in-stock" || p.stock === "low-stock");
  }
  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
    );
  }

  switch (filters.sortBy) {
    case "price-asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    default:
      results.sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  return results;
}

export async function fetchProducts(filters?: ProductFilters): Promise<Product[]> {
  return filterProducts(await getProducts(), filters);
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  return getProductBySlug(slug);
}

export async function fetchRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return getRelatedProducts(product, limit);
}

export async function fetchProductPriceBounds(): Promise<{ min: number; max: number }> {
  const products = await getProducts();
  if (products.length === 0) return { min: 0, max: 0 };
  return {
    min: Math.min(...products.map((p) => p.price)),
    max: Math.max(...products.map((p) => p.price)),
  };
}
