import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { ProductJsonLd } from "@/components/structured-data";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/data/products";
import { ProductDetail } from "./product-detail";

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
  const product = await getProductBySlug(slug);
  if (!product) return {};
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
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);

  return (
    <>
      <ProductJsonLd product={product} />
      <PageHeader
        title={product.name}
        crumbs={[
          { label: "Shop", href: "/shop" },
          { label: product.categoryName, href: `/categories/${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ProductDetail product={product} />

        {related.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">Related Products</h2>
            </Reveal>
            <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {related.map((p) => (
                <RevealItem key={p.id}>
                  <ProductCard product={p} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        )}
      </div>
    </>
  );
}
