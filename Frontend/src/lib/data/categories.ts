import { cache } from "react";

import { supabase } from "@/lib/supabase/client";
import type { Category } from "@/types";

const FALLBACK_IMAGE = {
  src: "/images/hero/hero-lab-vials.png",
  alt: "Research category placeholder",
  title: "Research category",
  width: 1200,
  height: 800,
};

/** All active categories, memoized per request. */
export const getCategories = cache(async (): Promise<Category[]> => {
  const [{ data: rows, error }, { data: productRows }] = await Promise.all([
    supabase
      .from("categories")
      .select("id, name, slug, description, image")
      .eq("status", "active")
      .order("name", { ascending: true }),
    supabase.from("products").select("category_id").eq("status", "published"),
  ]);

  if (error) {
    console.error("Failed to load categories:", error.message);
    return [];
  }

  const productCounts = new Map<string, number>();
  for (const p of productRows ?? []) {
    productCounts.set(p.category_id, (productCounts.get(p.category_id) ?? 0) + 1);
  }

  return (rows ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
    image: row.image
      ? { src: row.image, alt: row.name, title: row.name, width: 1200, height: 800 }
      : FALLBACK_IMAGE,
    productCount: productCounts.get(row.id) ?? 0,
    featured: true,
  }));
});

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return (await getCategories()).find((c) => c.slug === slug);
}

export async function getFeaturedCategories(): Promise<Category[]> {
  return (await getCategories()).filter((c) => c.featured);
}
