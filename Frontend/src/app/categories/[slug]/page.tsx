import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { ProductGroupCard } from "@/components/product-group-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getCategories, getCategoryBySlug } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";
import { groupProductsByLine } from "@/lib/product-grouping";

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: {
      title: category.name,
      description: category.description,
      url: `/categories/${category.slug}`,
      images: [{ url: category.image.src, alt: category.image.alt }],
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(category.slug);
  const productGroups = groupProductsByLine(products);

  return (
    <>
      <PageHeader
        title={category.name}
        description={category.description}
        crumbs={[{ label: "Categories", href: "/categories" }, { label: category.name }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Reveal className="relative mb-10 aspect-[21/6] w-full overflow-hidden rounded-xl bg-muted">
          <Image src={category.image.src} alt={category.image.alt} fill sizes="100vw" className="object-cover" />
        </Reveal>

        {productGroups.length > 0 ? (
          <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {productGroups.map((group) => (
              <RevealItem key={group.key}>
                <ProductGroupCard group={group} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-20 text-center">
            <p className="text-sm font-medium text-foreground">No products in this category yet</p>
          </div>
        )}
      </div>
    </>
  );
}
