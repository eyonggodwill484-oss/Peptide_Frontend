import type { Metadata } from "next";

import { SearchClient } from "./search-client";
import { SITE_NAME } from "@/constants/site";
import { getProducts } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Search",
  description: `Search the ${SITE_NAME} catalog.`,
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const products = await getProducts();
  return <SearchClient initialQuery={q ?? ""} products={products} />;
}
