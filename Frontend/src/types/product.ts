export type ProductBadge = "new" | "best-seller" | "limited" | "sale" | "coa-verified" | "featured";

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock" | "preorder";

export interface ProductImage {
  src: string;
  alt: string;
  title: string;
  caption?: string;
  width: number;
  height: number;
}

export interface ProductSpecification {
  label?: string;
  name?: string;
  value: string;
}

export interface ProductVariant {
  /** Short display label shown on the pill button, e.g. "5mg", "250mcg / 60 caps", "10ml" */
  label: string;
  /** Price for this variation in the store currency */
  price: number;
  /** Unique SKU for this variation */
  sku: string;
  /** Human-readable package/delivery descriptor, e.g. "10 Vials", "60 Capsules", "4 Pens" */
  format?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  shortDescription: string;
  description: string;
  longDescription?: string;
  categorySlug: string;
  categoryName: string;
  /** Base / starting price (cheapest variant) */
  price: number;
  compareAtPrice?: number;
  currency: string;
  purity: string;
  concentration: string;
  images: ProductImage[];
  badges: ProductBadge[];
  stock: StockStatus;
  stockCount: number;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  specifications: ProductSpecification[];
  certificateOfAnalysisUrl?: string;
  featured: boolean;
  bestSeller: boolean;
  createdAt: string;
  /** All dosage / size / format variations for this product */
  variants?: ProductVariant[];
}

export interface ProductFilters {
  categorySlugs?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
  query?: string;
}
