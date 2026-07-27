export type ProductBadge = "new" | "best-seller" | "limited" | "sale" | "coa-verified";

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
  label: string;
  value: string;
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
  categorySlug: string;
  categoryName: string;
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
}

export interface ProductFilters {
  categorySlugs?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
  query?: string;
}
