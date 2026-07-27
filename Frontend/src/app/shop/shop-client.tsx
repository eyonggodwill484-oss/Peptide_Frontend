"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterProducts } from "@/services/product-service";
import type { Category, Product, ProductFilters } from "@/types";

const SORT_OPTIONS: { value: NonNullable<ProductFilters["sortBy"]>; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Top Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const VALID_SORTS = new Set(SORT_OPTIONS.map((s) => s.value));

export function ShopClient({
  initialSort,
  initialCategory,
  products,
  categories,
}: {
  initialSort?: string;
  initialCategory?: string;
  products: Product[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [sortBy, setSortBy] = useState<NonNullable<ProductFilters["sortBy"]>>(
    initialSort && VALID_SORTS.has(initialSort as never) ? (initialSort as never) : "featured"
  );
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = useMemo(
    () =>
      filterProducts(products, {
        categorySlugs: selectedCategories.length ? selectedCategories : undefined,
        query: query || undefined,
        sortBy,
        inStockOnly: inStockOnly || undefined,
      }),
    [products, selectedCategories, query, sortBy, inStockOnly]
  );

  function toggleCategory(slug: string) {
    setSelectedCategories((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }

  const filtersPanel = (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="shop-search">Search</Label>
        <Input id="shop-search" placeholder="Search products…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="text-sm font-medium text-foreground">Category</span>
        {categories.map((category) => (
          <label key={category.slug} className="group flex items-center gap-2 text-sm text-foreground">
            <Checkbox
              checked={selectedCategories.includes(category.slug)}
              onCheckedChange={() => toggleCategory(category.slug)}
            />
            {category.name}
          </label>
        ))}
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <Checkbox checked={inStockOnly} onCheckedChange={(v) => setInStockOnly(v === true)} />
        In stock only
      </label>

      {(selectedCategories.length > 0 || query || inStockOnly) && (
        <Button
          variant="ghost"
          size="sm"
          className="w-fit"
          onClick={() => {
            setSelectedCategories([]);
            setQuery("");
            setInStockOnly(false);
          }}
        >
          <X /> Clear filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      <PageHeader
        title="Shop Research Peptides"
        description="Third-party verified, cold-chain fulfilled research compounds and lab accessories."
        crumbs={[{ label: "Shop" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">{filtersPanel}</aside>

          <div>
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setFiltersOpen((v) => !v)}>
                  <SlidersHorizontal /> Filters
                </Button>
                <span className="text-sm text-muted-foreground">{filteredProducts.length} products</span>
              </div>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as never)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filtersOpen && <div className="mb-6 rounded-xl border border-border p-4 lg:hidden">{filtersPanel}</div>}

            {filteredProducts.length > 0 ? (
              <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <RevealItem key={product.id}>
                    <ProductCard product={product} />
                  </RevealItem>
                ))}
              </RevealGroup>
            ) : (
              <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-20 text-center">
                <p className="text-sm font-medium text-foreground">No products match your filters</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or category selection.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
