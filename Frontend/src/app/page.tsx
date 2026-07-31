import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { ROUTES } from "@/constants/routes";
import { SITE_DESCRIPTION, SITE_LOCALE, SITE_NAME } from "@/constants/site";
import { getBestSellers, getFeaturedProducts } from "@/lib/data/products";
import { getFeaturedCategories } from "@/lib/data/categories";
import { CERTIFICATES, COMPANY_STATS, TESTIMONIALS } from "@/lib/data/content";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { HeroSlideshow } from "@/components/motion/hero-slideshow";
import { HeroBackground, HeroEntrance, HeroEntranceItem } from "@/components/motion/hero-entrance";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { CountUpStat } from "@/components/motion/count-up-stat";

export const revalidate = 60;

const OG_TITLE = `${SITE_NAME} | Research-Grade Peptides`;
const OG_IMAGE = { url: "/images/hero/hero-lab-vials.png", width: 2048, height: 1152 };

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: OG_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    locale: SITE_LOCALE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default async function Home() {
  const [allFeaturedProducts, allBestSellers, featuredCategories] = await Promise.all([
    getFeaturedProducts(),
    getBestSellers(),
    getFeaturedCategories(),
  ]);
  const featuredProducts = allFeaturedProducts.slice(0, 8);
  const bestSellers = allBestSellers.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[36rem] items-center overflow-hidden border-b border-border sm:min-h-[42rem]">
        <HeroSlideshow
          images={[
            {
              src: "/images/black-lab-scientist-monitoring-chemical-reaction-compound-molecules-working-rd-strategy.jpg",
              alt: "Lab scientist monitoring a chemical reaction during R&D research",
            },
            {
              src: "/images/microscope-dna.jpg",
              alt: "Microscope used for DNA and molecular research",
            },
            {
              src: "/images/covid19-vaccine-vials-syringe.jpg",
              alt: "Research vials and syringe used in laboratory studies",
            },
          ]}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <HeroBackground />

        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <HeroEntrance className="flex max-w-2xl flex-col gap-6">
            <HeroEntranceItem>
              <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white ring-1 ring-white/20 backdrop-blur">
                Research Use Only
              </span>
            </HeroEntranceItem>
            <HeroEntranceItem>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                {SITE_NAME.split(" ")[0]} Peptide Sciences
              </h1>
            </HeroEntranceItem>
            <HeroEntranceItem>
              <p className="max-w-lg text-lg leading-relaxed text-white/85">{SITE_DESCRIPTION}</p>
            </HeroEntranceItem>
            <HeroEntranceItem className="flex flex-wrap items-center gap-3">
              <Button size="lg" className="h-11 px-6 text-base" asChild>
                <Link href={ROUTES.shop}>
                  Shop Research Peptides
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 border-white/40 bg-white/5 px-6 text-base text-white hover:bg-white/15 hover:text-white"
                asChild
              >
                <Link href={ROUTES.research}>View Certificates of Analysis</Link>
              </Button>
            </HeroEntranceItem>
          </HeroEntrance>
        </div>
      </section>

      {/* Featured categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Shop by Research Category</h2>
            <p className="mt-1 text-sm text-muted-foreground">Curated peptide categories for every research protocol.</p>
          </div>
          <Link href={ROUTES.categories} className="hidden shrink-0 text-sm font-medium text-primary hover:underline sm:inline-flex">
            View all categories
          </Link>
        </Reveal>
        <RevealGroup className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featuredCategories.map((category) => (
            <RevealItem key={category.id}>
              <Link
                href={ROUTES.category(category.slug)}
                className="group relative flex aspect-4/5 flex-col justify-end overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
              >
                <Image
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="relative z-10 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 pt-16">
                  <h3 className="text-sm font-semibold text-white">{category.name}</h3>
                  <span className="text-xs text-white/80">{category.productCount} products</span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Featured products */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">Featured Research Peptides</h2>
              <p className="mt-1 text-sm text-muted-foreground">Third-party verified, cold-chain fulfilled.</p>
            </div>
            <Link href={ROUTES.shop} className="hidden shrink-0 text-sm font-medium text-primary hover:underline sm:inline-flex">
              Shop all products
            </Link>
          </Reveal>
          <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <RevealItem key={product.id}>
                <ProductCard product={product} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <RevealGroup className="grid grid-cols-2 gap-6 rounded-2xl bg-primary px-6 py-10 text-primary-foreground sm:grid-cols-4">
          {COMPANY_STATS.map((stat) => (
            <RevealItem key={stat.id} className="flex flex-col items-center gap-1 text-center">
              <CountUpStat
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="text-3xl font-semibold tracking-tight"
              />
              <span className="text-sm text-primary-foreground/80">{stat.label}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Best sellers */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Reveal className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Best Sellers</h2>
          <p className="mt-1 text-sm text-muted-foreground">The peptides research labs order again and again.</p>
        </Reveal>
        <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {bestSellers.map((product) => (
            <RevealItem key={product.id}>
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal className="mb-8 max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Trusted by Research Labs</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Feedback from postdoctoral researchers, lab managers, and principal investigators.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <TestimonialsCarousel testimonials={TESTIMONIALS} />
          </Reveal>
        </div>
      </section>

      {/* Certificates */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="mb-8 max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Quality &amp; Compliance</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Every batch is independently verified and documented before it ships.
          </p>
        </Reveal>
        <RevealGroup className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CERTIFICATES.map((certificate) => (
            <RevealItem
              key={certificate.id}
              className="group flex flex-col items-center gap-3 rounded-xl bg-card p-6 text-center ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/10 hover:ring-brand/30"
            >
              <Image
                src={certificate.image.src}
                alt={certificate.image.alt}
                width={64}
                height={64}
                className="size-16 object-contain transition-transform duration-300 ease-out group-hover:scale-110"
              />
              <h3 className="text-sm font-semibold text-foreground">{certificate.name}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{certificate.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <Reveal className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Ready to standardize your research supply?
          </h2>
          <p className="max-w-lg text-sm text-muted-foreground">
            Browse the full catalog of third-party verified research peptides, bundles, and lab accessories.
          </p>
          <Button size="lg" className="mt-2 h-11 px-6 text-base" asChild>
            <Link href={ROUTES.shop}>
              Browse the Catalog
              <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
