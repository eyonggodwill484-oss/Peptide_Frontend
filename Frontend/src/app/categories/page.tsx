import Image from "next/image";
import Link from "@/components/ui/localized-link";
import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ROUTES } from "@/constants/routes";
import { getCategories } from "@/lib/data/categories";
import { getServerLocale, getServerTranslations } from "@/lib/i18n";
import { CATEGORY_TRANSLATIONS } from "@/constants/translations";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerTranslations();
  return {
    title: t.nav.categories,
    description: "Browse research peptide categories including growth factor, metabolic, cognitive, and recovery research compounds.",
  };
}

export default async function CategoriesPage() {
  const locale = await getServerLocale();
  const rawCategories = await getCategories();

  const categories = rawCategories.map((c) => {
    const translation = CATEGORY_TRANSLATIONS[c.slug];
    return {
      ...c,
      name: locale === "de" && translation?.name ? translation.name : c.name,
      description: locale === "de" && translation?.description ? translation.description : c.description,
    };
  });

  return (
    <>
      <PageHeader
        title={locale === "de" ? "Forschungskategorien" : "Research Categories"}
        description={locale === "de" ? "Entdecken Sie unseren Katalog, sortiert nach Forschungsanwendung." : "Explore our catalog organized by research application."}
        crumbs={[{ label: locale === "de" ? "Kategorien" : "Categories" }]}
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
                  <span className="mt-1 text-xs font-medium text-primary">
                    {category.productCount} {locale === "de" ? "Produkte" : "products"}
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </>
  );
}
