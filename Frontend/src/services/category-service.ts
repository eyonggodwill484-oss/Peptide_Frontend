import { getCategories, getCategoryBySlug, getFeaturedCategories } from "@/lib/data/categories";
import type { Category } from "@/types";

export async function fetchCategories(): Promise<Category[]> {
  return getCategories();
}

export async function fetchFeaturedCategories(): Promise<Category[]> {
  return getFeaturedCategories();
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | undefined> {
  return getCategoryBySlug(slug);
}
