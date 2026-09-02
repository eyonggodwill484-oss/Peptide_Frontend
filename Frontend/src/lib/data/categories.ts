import { cache } from "react";

import { supabase } from "@/lib/supabase/client";
import { extractBaseName } from "@/lib/variant-parser";
import type { Category } from "@/types";

const FALLBACK_IMAGE = {
  src: "/images/hero/hero-lab-vials.png",
  alt: "Research category placeholder",
  title: "Research category",
  width: 1200,
  height: 800,
};

let memoryCategoriesCache: Category[] | null = null;
let memoryCategoriesPromise: Promise<Category[]> | null = null;

async function fetchCategoriesFromDb(): Promise<Category[]> {
  if (memoryCategoriesCache) return memoryCategoriesCache;

  try {
    const [{ data: rows, error }, { data: productRows }] = await Promise.all([
      supabase
        .from("categories")
        .select("id, name, slug, description, image")
        .eq("status", "active")
        .order("name", { ascending: true }),
      supabase.from("products").select("name, category_id").eq("status", "published"),
    ]);

    if (error) {
      console.error("Failed to load categories:", error.message);
      return [];
    }

    const distinctLinesByCategory = new Map<string, Set<string>>();
    for (const p of productRows ?? []) {
      if (!p.category_id) continue;
      if (!distinctLinesByCategory.has(p.category_id)) {
        distinctLinesByCategory.set(p.category_id, new Set());
      }
      const baseName = extractBaseName(p.name).toLowerCase();
      distinctLinesByCategory.get(p.category_id)!.add(baseName);
    }

    const result = (rows ?? []).map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      description: row.description ?? "",
      image: row.image
        ? { src: row.image, alt: row.name, title: row.name, width: 1200, height: 800 }
        : FALLBACK_IMAGE,
      productCount: distinctLinesByCategory.get(row.id)?.size ?? 0,
      featured: true,
    }));

    memoryCategoriesCache = result;
    return result;
  } catch (err) {
    console.error("Exception loading categories:", err);
    return [];
  }
}

/** All active categories, memoized per request and process. */
export const getCategories = cache(async (): Promise<Category[]> => {
  if (!memoryCategoriesPromise) {
    memoryCategoriesPromise = fetchCategoriesFromDb();
  }
  return memoryCategoriesPromise;
});

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return (await getCategories()).find((c) => c.slug === slug);
}

export async function getFeaturedCategories(): Promise<Category[]> {
  return (await getCategories()).filter((c) => c.featured);
}
