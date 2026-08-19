import Image from "next/image";
import Link from "@/components/ui/localized-link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { ROUTES } from "@/constants/routes";
import { SITE_NAME } from "@/constants/site";
import { getBestSellers, getFeaturedProducts } from "@/lib/data/products";
import { getFeaturedCategories } from "@/lib/data/categories";
import { CERTIFICATES, COMPANY_STATS, TESTIMONIALS } from "@/lib/data/content";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { HeroSlideshow } from "@/components/motion/hero-slideshow";
import { HeroBackground, HeroEntrance, HeroEntranceItem } from "@/components/motion/hero-entrance";
import { AnimatedHeroHeadline } from "@/components/motion/animated-hero-headline";
import { HeroScrollDemo } from "@/components/hero-scroll-demo";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { CountUpStat } from "@/components/motion/count-up-stat";
import { getServerLocale, getServerTranslations } from "@/lib/i18n";
import { PRODUCT_TRANSLATIONS, CATEGORY_TRANSLATIONS } from "@/constants/translations";
import type { Product, Category } from "@/types";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = await getServerTranslations();

  const title = `${SITE_NAME} | ${t.meta.title}`;
  const description = t.meta.description;

  return {
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: SITE_NAME,
      locale: locale === "en" ? "en_US" : "de_DE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function localizeProduct(product: Product, locale: string): Product {
  const translation = PRODUCT_TRANSLATIONS[product.slug];
  if (translation) {
    return {
      ...product,
      name: translation.name || product.name,
      description: locale === "de" && translation.description ? translation.description : product.description,
      shortDescription: locale === "de" && translation.shortDescription ? translation.shortDescription : product.shortDescription,
    };
  }
  return product;
}

function localizeCategory(category: Category, locale: string): Category {
  const translation = CATEGORY_TRANSLATIONS[category.slug];
  if (translation) {
    return {
      ...category,
      name: locale === "de" && translation.name ? translation.name : category.name,
      description: locale === "de" && translation.description ? translation.description : category.description,
    };
  }
  return category;
}

export default async function Home() {
  const locale = await getServerLocale();
  const t = await getServerTranslations();

  const [allFeaturedProducts, allBestSellers, rawFeaturedCategories] = await Promise.all([
    getFeaturedProducts(),
    getBestSellers(),
    getFeaturedCategories(),
  ]);

  const featuredProducts = allFeaturedProducts.slice(0, 8).map((p) => localizeProduct(p, locale));
  const bestSellers = allBestSellers.slice(0, 4).map((p) => localizeProduct(p, locale));
  const featuredCategories = rawFeaturedCategories.map((c) => localizeCategory(c, locale));

  const localizedCompanyStats = COMPANY_STATS.map((stat) => {
    let label = stat.label;
    if (locale === "de") {
      if (stat.id === "stat-batches") label = "Chargen unabhängig verifiziert";
      else if (stat.id === "stat-labs") label = "Forschungslabore beliefert";
      else if (stat.id === "stat-countries") label = "Länder beliefert";
      else if (stat.id === "stat-purity") label = "Durchschnittliche Reinheit";
    }
    return { ...stat, label };
  });

  const localizedCertificates = CERTIFICATES.map((cert) => {
    let name = cert.name;
    let description = cert.description;
    if (locale === "de") {
      if (cert.id === "iso-9001-facility") {
        name = "ISO 9001 konforme Anlage";
        description = "Unsere Versandzentren arbeiten nach ISO 9001-konformen Qualitätsmanagement-Prozessen.";
      } else if (cert.id === "third-party-hplc") {
        name = "HPLC-Verifizierung durch Drittanbieter";
        description = "Jede Charge wird von einem unabhängigen Analyselabor per HPLC-Analyse geprüft.";
      } else if (cert.id === "gmp-aligned-process") {
        name = "GMP-konforme Prozesskontrollen";
        description = "Unsere Produktionspartner folgen Good Manufacturing Practice-konformen Kontrollen.";
      } else if (cert.id === "cold-chain-certified") {
        name = "Zertifizierter Kühlketten-Versand";
        description = "Unsere Logistikpartner sind für die Einhaltung der Kühlkette zertifiziert.";
      }
    }
    return { ...cert, name, description };
  });

  const localizedTestimonials = TESTIMONIALS.map((t) => {
    let content = t.content;
    let role = t.role;
    if (locale === "de") {
      if (t.id === "reviewer-1") {
        role = "Postdoktorand";
        content = "Die Konsistenz zwischen den Chargen ist bemerkenswert. Jedes Analyzertifikat, das wir mit unseren eigenen HPLC-Läufen abgeglichen haben, stimmte bis auf einen Bruchteil eines Prozents überein.";
      } else if (t.id === "reviewer-2") {
        role = "Laborleiter";
        content = "Die Kühlkettenverpackung hat uns in zwei Jahren mit zweiwöchentlichen Bestellungen noch nie im Stich gelassen. Die Dokumentation ist gründlich und der Support antwortet innerhalb von Stunden.";
      } else if (t.id === "reviewer-3") {
        role = "Hauptforscher (PI)";
        content = "Wir haben unsere gesamte Neuropeptid-Forschungspipeline nach einem einzigen vergleichenden Reinheitsaudit mit drei anderen Anbietern auf Wardiere standardisiert.";
      } else if (t.id === "reviewer-4") {
        role = "Doktorand";
        content = "Als Doktorand mit knappem Budget machten es mir die Bundle-Kits möglich, eine vollständige Vergleichsstudie durchzuführen, ohne Kompromisse bei der Reinheit einzugehen.";
      } else if (t.id === "reviewer-5") {
        role = "Forschungswissenschaftler";
        content = "Ihr Rekonstitutionskit allein hat den Großteil unserer Kontaminationsvarianz beseitigt. Ein kleines Detail, das für unsere Datenqualität jedoch enorm wichtig war.";
      } else if (t.id === "reviewer-6") {
        role = "Leiter des Laborbetriebs";
        content = "Die Bestellverfolgung und der Support-Kontakt sind die besten, die wir je bei einem Forschungslieferanten erlebt haben.";
      }
    }
    return { ...t, content, role };
  });

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[36rem] items-center overflow-hidden border-b border-border sm:min-h-[42rem]">
        <HeroSlideshow
          images={[
            {
              src: "/images/female-researcher-laboratory-with-safety-glasses-test-tubes.jpg",
              alt: "Female researcher in safety glasses working with test tubes",
            },
            {
              src: "/images/laboratory-supplies-medical-work.jpg",
              alt: "Laboratory supplies used in research and medical work",
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
            <HeroEntranceItem className="flex flex-wrap items-center gap-2">
              <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white ring-1 ring-white/20 backdrop-blur">
                {t.common.researchUseOnly}
              </span>
              <span className="w-fit rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground ring-1 ring-primary/40 backdrop-blur">
                {t.common.trustedSince}
              </span>
            </HeroEntranceItem>
            <HeroEntranceItem>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                <AnimatedHeroHeadline
                  phrases={[...t.home.heroPhrases]}
                />
              </h1>
            </HeroEntranceItem>
            <HeroEntranceItem>
              <p className="max-w-lg text-lg leading-relaxed text-white/85">
                {t.home.heroDesc}
              </p>
            </HeroEntranceItem>
            <HeroEntranceItem className="flex flex-wrap items-center gap-3">
              <Button size="lg" className="h-11 px-6 text-base" asChild>
                <Link href={ROUTES.shop}>
                  {t.home.shopBtn}
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 border-white/40 bg-white/5 px-6 text-base text-white hover:bg-white/15 hover:text-white"
                asChild
              >
                <Link href={ROUTES.research}>{t.home.coaBtn}</Link>
              </Button>
            </HeroEntranceItem>
          </HeroEntrance>
        </div>
      </section>

      {/* Value Pillars Section */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <RevealGroup className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <RevealItem className="flex flex-col gap-2 rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
            <h3 className="text-base font-semibold text-foreground">{t.home.pillar1Title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{t.home.pillar1Desc}</p>
          </RevealItem>
          <RevealItem className="flex flex-col gap-2 rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
            <h3 className="text-base font-semibold text-foreground">{t.home.pillar2Title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{t.home.pillar2Desc}</p>
          </RevealItem>
          <RevealItem className="flex flex-col gap-2 rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
            <h3 className="text-base font-semibold text-foreground">{t.home.pillar3Title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{t.home.pillar3Desc}</p>
          </RevealItem>
        </RevealGroup>

        {/* Why Choose Us */}
        <div className="mt-16 rounded-2xl bg-muted/40 p-8 ring-1 ring-border">
          <Reveal className="mb-8">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{t.home.whyChooseTitle}</h2>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {t.home.whyChooseBullets.map((bullet, index) => {
              const parts = bullet.split(": ");
              const label = parts[0];
              const desc = parts.slice(1).join(": ");
              return (
                <RevealItem key={index} className="flex gap-3">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <svg className="size-3.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div className="text-xs leading-relaxed text-muted-foreground">
                    <strong className="text-foreground">{label}:</strong> {desc}
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Scroll-reveal showcase */}
      <HeroScrollDemo />

      {/* Featured categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t.home.shopByCategory}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.home.shopByCategoryDesc}</p>
          </div>
          <Link href={ROUTES.categories} className="hidden shrink-0 text-sm font-medium text-primary hover:underline sm:inline-flex">
            {t.home.viewAllCats}
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
                  <span className="text-xs text-white/80">{category.productCount} {locale === "de" ? "Produkte" : "products"}</span>
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
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t.home.featuredPeptides}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t.home.featuredPeptidesDesc}</p>
            </div>
            <Link href={ROUTES.shop} className="hidden shrink-0 text-sm font-medium text-primary hover:underline sm:inline-flex">
              {t.home.shopAll}
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
          {localizedCompanyStats.map((stat) => (
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
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t.home.bestSellers}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t.home.bestSellersDesc}</p>
        </Reveal>
        <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {bestSellers.map((product) => (
            <RevealItem key={product.id}>
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Science Meets Performance Editorial Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border">
        <RevealGroup className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <RevealItem className="flex flex-col justify-center gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t.home.scienceTitle}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t.home.scienceDesc}
            </p>
          </RevealItem>
          <RevealItem className="flex flex-col justify-center gap-4 rounded-2xl bg-brand-dark/5 p-8 dark:bg-white/5 ring-1 ring-border">
            <h3 className="text-lg font-semibold text-foreground">
              {t.home.revolutionTitle}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t.home.revolutionDesc}
            </p>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal className="mb-8 max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t.home.trustedByLabs}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.home.trustedByLabsDesc}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <TestimonialsCarousel testimonials={localizedTestimonials} />
          </Reveal>
        </div>
      </section>

      {/* Certificates */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="mb-8 max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t.home.qualityCompliance}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t.home.qualityComplianceDesc}
          </p>
        </Reveal>
        <RevealGroup className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {localizedCertificates.map((certificate) => (
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

      {/* Research resources */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal className="mb-8 max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {locale === "de" ? "Forschungsressourcen & Support" : "Research Resources & Support"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {locale === "de" ? "Greifen Sie auf Ländertests, Logistikanleitungen und Labordokumente zu." : "Access regional logistics guides, quality reports, and technical manuals."}
            </p>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <RevealItem className="flex flex-col gap-2 rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
              <h3 className="text-base font-semibold text-foreground">
                {locale === "de" ? "Qualitätsdokumentation" : "Quality Documentation"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                {locale === "de" 
                  ? "Fordern Sie chargenspezifische Analysezertifikate (CoA) und HPLC-Prüfprotokolle direkt von unserer Qualitätssicherung an."
                  : "Request batch-specific Certificates of Analysis (CoA) and HPLC verification logs directly from our Quality Assurance team."}
              </p>
              <Link href="/quality-documentation" className="mt-4 text-xs font-semibold text-primary hover:underline">
                {locale === "de" ? "Unterlagen anfordern →" : "Request Records →"}
              </Link>
            </RevealItem>

            <RevealItem className="flex flex-col gap-2 rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
              <h3 className="text-base font-semibold text-foreground">
                {locale === "de" ? "Irland & EU Support" : "Ireland & EU Support"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                {locale === "de"
                  ? "Detaillierte Informationen zu Versandlaufzeiten, temperatursicherer Kühlkettenverpackung und Zollabwicklung für Irland."
                  : "Detailed information regarding shipping transit times, temperature-controlled packaging, and EU customs processing."}
              </p>
              <Link href="/research-peptides-ireland" className="mt-4 text-xs font-semibold text-primary hover:underline">
                {locale === "de" ? "Versandinfos Irland →" : "Ireland Shipping Info →"}
              </Link>
            </RevealItem>

            <RevealItem className="flex flex-col gap-2 rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
              <h3 className="text-base font-semibold text-foreground">
                {locale === "de" ? "Kundenbewertungen" : "Customer Reviews"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                {locale === "de"
                  ? "Lesen Sie verifizierte Testberichte und Erfahrungsberichte von akkreditierten europäischen Forschungsinstituten."
                  : "Browse verified testing feedback and operational reviews from accredited European research facilities."}
              </p>
              <Link href="/reviews" className="mt-4 text-xs font-semibold text-primary hover:underline">
                {locale === "de" ? "Kundenberichte lesen →" : "Read Customer Reviews →"}
              </Link>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Why Buy Detailed Section */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t.home.whyBuyTitle}
            </h2>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.whyBuyItems.map((item, index) => (
              <RevealItem key={index} className="flex flex-col gap-2 p-4 rounded-xl bg-muted/30 ring-1 ring-border">
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t.home.faqTitle}
            </h2>
          </Reveal>
          <RevealGroup className="flex flex-col gap-4">
            {t.home.faqItems.map((item, index) => (
              <RevealItem key={index} className="border-b border-border pb-4">
                <details className="group [&_summary::-webkit-details-marker]:hidden" open={index === 0}>
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-base font-medium text-foreground">
                    <span>{item.q}</span>
                    <span className="shrink-0 rounded-full bg-muted p-1.5 text-foreground transition duration-300 group-open:-rotate-180">
                      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </details>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <Reveal className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t.common.standardizeSupply}
          </h2>
          <p className="max-w-lg text-sm text-muted-foreground">
            {t.common.standardizeDesc}
          </p>
          <Button size="lg" className="mt-2 h-11 px-6 text-base" asChild>
            <Link href={ROUTES.shop}>
              {t.common.browseCatalog}
              <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
