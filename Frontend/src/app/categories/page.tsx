import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ROUTES } from "@/constants/routes";
import { getCategories } from "@/lib/data/categories";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse research peptide categories including growth factor, metabolic, cognitive, and recovery research compounds.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <PageHeader
        title="Research Categories"
        description="Explore our catalog organized by research application."
        crumbs={[{ label: "Categories" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <RevealItem key={category.id}>
              <Link
                href={ROUTES.category(category.slug)}
                className="group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-shadow hover:shadow-lg hover:shadow-foreground/5"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <Image
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-1.5 p-5">
                  <h2 className="text-base font-semibold text-foreground">{category.name}</h2>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{category.description}</p>
                  <span className="mt-1 text-xs font-medium text-primary">{category.productCount} products</span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </>
  );
}
