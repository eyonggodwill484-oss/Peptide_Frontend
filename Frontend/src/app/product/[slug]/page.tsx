import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { ProductGroupCard } from "@/components/product-group-card";
import { ProductJsonLd } from "@/components/structured-data";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getProductBySlug, getProducts, getRelatedProducts, getSiblingVariants } from "@/lib/data/products";
import { groupProductsByLine } from "@/lib/product-grouping";
import type { Product } from "@/types";
import { ProductDetail } from "./product-detail";

import { getServerLocale, getServerTranslations, localizeProduct } from "@/lib/i18n";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const rawProduct = await getProductBySlug(slug);
  if (!rawProduct) return {};

  const locale = await getServerLocale();
  const product = localizeProduct(rawProduct, locale);
  const image = product.images[0];

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      url: `/product/${product.slug}`,
      type: "website",
      images: image ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: image ? [image.src] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rawProduct = await getProductBySlug(slug);
  if (!rawProduct) notFound();

  const locale = await getServerLocale();
  const t = await getServerTranslations();
  const product = localizeProduct(rawProduct, locale);

  const related = await getRelatedProducts(product);
  const localizedRelated = related.map((p) => localizeProduct(p, locale));
  const relatedGroups = groupProductsByLine(localizedRelated).slice(0, 4);

  const siblingVariants = await getSiblingVariants(rawProduct);
  const localizedVariants = siblingVariants.map((v: Product) => localizeProduct(v, locale));

  // Localize category name in breadcrumbs if mapped
  const rawCategoryName = product.categoryName;
  let categoryName = rawCategoryName;
  if (locale === "de") {
    if (product.categorySlug === "healing-recovery") categoryName = "Heilung & Regeneration";
    else if (product.categorySlug === "weight-management") categoryName = "Gewichtsmanagement & Stoffwechsel";
    else if (product.categorySlug === "cognitive-health") categoryName = "Kognitive Gesundheit";
    else if (product.categorySlug === "anti-aging-longevity") categoryName = "Langlebigkeit & Anti-Aging";
  }

  return (
    <>
      <ProductJsonLd product={product} />
      <PageHeader
        title={product.name}
        crumbs={[
          { label: t.nav.shop, href: "/shop" },
          { label: categoryName, href: `/categories/${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ProductDetail product={product} variants={localizedVariants} />

        {relatedGroups.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
                {locale === "de" ? "Ähnliche Produkte" : "Related Products"}
              </h2>
            </Reveal>
            <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {relatedGroups.map((group) => (
                <RevealItem key={group.key}>
                  <ProductGroupCard group={group} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        )}
      </div>
    </>
  );
}
