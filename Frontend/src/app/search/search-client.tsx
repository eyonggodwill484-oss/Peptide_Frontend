"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { ProductGroupCard } from "@/components/product-group-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Input } from "@/components/ui/input";
import { filterProducts } from "@/services/product-service";
import { groupProductsByLine } from "@/lib/product-grouping";
import type { Product } from "@/types";

export function SearchClient({ initialQuery, products }: { initialQuery: string; products: Product[] }) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(
    () => (query.trim() ? filterProducts(products, { query: query.trim() }) : []),
    [products, query]
  );
  const resultGroups = useMemo(() => groupProductsByLine(results), [results]);

  return (
    <>
      <PageHeader title="Search" crumbs={[{ label: "Search" }]} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Reveal className="relative mx-auto mb-10 max-w-xl">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products by name, category, or description…"
            className="h-11 pl-9 text-base"
          />
        </Reveal>

        {query.trim() === "" ? (
          <p className="text-center text-sm text-muted-foreground">Start typing to search the catalog.</p>
        ) : resultGroups.length > 0 ? (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              {resultGroups.length} result{resultGroups.length === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
            </p>
            <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {resultGroups.map((group) => (
                <RevealItem key={group.key}>
                  <ProductGroupCard group={group} />
                </RevealItem>
              ))}
            </RevealGroup>
          </>
        ) : (
          <p className="text-center text-sm text-muted-foreground">No results for &ldquo;{query}&rdquo;.</p>
        )}
      </div>
    </>
  );
}
