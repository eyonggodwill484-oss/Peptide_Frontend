import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { ProductGroupCard } from "@/components/product-group-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getCategories, getCategoryBySlug } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";
import { groupProductsByLine } from "@/lib/product-grouping";

import { getServerLocale, getServerTranslations } from "@/lib/i18n";
import { CATEGORY_TRANSLATIONS } from "@/constants/translations";

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
  const locale = await getServerLocale();
  const rawCategory = await getCategoryBySlug(slug);
  if (!rawCategory) return {};

  const translation = CATEGORY_TRANSLATIONS[rawCategory.slug];
  const name = locale === "de" && translation?.name ? translation.name : rawCategory.name;
  const description = locale === "de" && translation?.description ? translation.description : rawCategory.description;

  return {
    title: name,
    description,
    alternates: { canonical: `/categories/${rawCategory.slug}` },
    openGraph: {
      title: name,
      description,
      url: `/categories/${rawCategory.slug}`,
      images: [{ url: rawCategory.image.src, alt: rawCategory.image.alt }],
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const rawCategory = await getCategoryBySlug(slug);
  if (!rawCategory) notFound();

  const translation = CATEGORY_TRANSLATIONS[rawCategory.slug];
  const category = {
    ...rawCategory,
    name: locale === "de" && translation?.name ? translation.name : rawCategory.name,
    description: locale === "de" && translation?.description ? translation.description : rawCategory.description,
  };

  const products = await getProductsByCategory(category.slug);
  const productGroups = groupProductsByLine(products);

  return (
    <>
      <PageHeader
        title={category.name}
        description={category.description}
        crumbs={[
          { label: locale === "de" ? "Kategorien" : "Categories", href: "/categories" },
          { label: category.name }
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Reveal className="relative mb-10 aspect-[21/6] w-full overflow-hidden rounded-xl bg-muted">
          <Image src={category.image.src} alt={category.image.alt} fill sizes="100vw" className="object-cover" />
        </Reveal>

        {/* Minimum Order Announcement Banner */}
        <div className="mb-8 rounded-2xl border border-primary/30 bg-primary/5 px-6 py-3.5 text-center shadow-xs">
          <p className="text-sm sm:text-base font-extrabold text-foreground tracking-wide">
            {locale === "de"
              ? "Ein Mindestbestellwert von €200,00 ist für die Kasse erforderlich."
              : "A Minimum of €200.00 is required before checking out."}
          </p>
        </div>

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
            <p className="text-sm font-medium text-foreground">
              {locale === "de" ? "Noch keine Produkte in dieser Kategorie" : "No products in this category yet"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
