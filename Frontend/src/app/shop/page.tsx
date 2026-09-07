import type { Metadata } from "next";

import { getCategories } from "@/lib/data/categories";
import { getProducts } from "@/lib/data/products";
import { ROUTES } from "@/constants/routes";
import { buildAlternates } from "@/lib/seo/alternates";
import { ShopClient } from "./shop-client";

export const metadata: Metadata = {
  title: "Shop Research Peptides",
  description: "Browse the full catalog of third-party verified research peptides, bundles, and lab accessories.",
  alternates: buildAlternates(ROUTES.shop),
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; category?: string }>;
}) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  return (
    <ShopClient
      initialSort={params.sort}
      initialCategory={params.category}
      products={products}
      categories={categories}
    />
  );
}
