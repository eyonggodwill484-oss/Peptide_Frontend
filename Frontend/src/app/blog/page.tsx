import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Calendar, ArrowRight, Sparkles } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { SITE_NAME, SITE_URL } from "@/constants/site";
import { BLOG_POSTS } from "@/lib/data/blog-posts";
import { getServerLocale } from "@/lib/i18n";
import { BlogSearchAndFilter } from "./blog-search-filter";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const isDe = locale === "de";

  const title = isDe
    ? "Peptid-Forschungsblog & Labor-Leitfäden | Wardiere"
    : "Peptide Research Blog & Analytical Guides | Wardiere";
  const description = isDe
    ? "Wissenschaftliche Fachartikel, HPLC-Prüfmethoden, Rekonstitutionsanleitungen und Kühlketten-Praktiken für BPC-157, TB-500, GLP-1 und Forschungspeptide."
    : "Peer-reviewed research articles, HPLC analytical methods, reconstitution protocols, and cold-chain guides for BPC-157, TB-500, GLP-1, and research peptides.";

  return {
    title,
    description,
    alternates: {
      canonical: "/blog",
      languages: {
        en: `${SITE_URL}/en/blog`,
        de: `${SITE_URL}/blog`,
      },
    },
    openGraph: {
      title,
      description,
      url: "/blog",
      siteName: SITE_NAME,
      locale: isDe ? "de_DE" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/hero/hero-lab-vials.png",
          width: 1200,
          height: 630,
          alt: "Wardiere Peptide Sciences Research Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero/hero-lab-vials.png"],
    },
  };
}

export default async function BlogIndexPage() {
  const locale = await getServerLocale();
  const isDe = locale === "de";

  // Blog Schema for SEO & AI indexing
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog/#blog`,
    name: `${SITE_NAME} Research Blog`,
    description:
      "Authoritative research publications, HPLC validation standards, and peptide protocol guides.",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
    },
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
      image: `${SITE_URL}${post.coverImage.src}`,
      keywords: post.tags.join(", "),
    })),
  };

  const featuredPost = BLOG_POSTS[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <PageHeader
        title={isDe ? "Forschungs-Blog & Fachartikel" : "Research Blog & Analytical Guides"}
        description={
          isDe
            ? "Wissenschaftlich fundierte Leitfäden zu Reinheitstests, Rekonstitution, Kühlkettenlogistik und Peptidprotokollen."
            : "Peer-reviewed insights, HPLC purity testing standards, cold-chain handling, and laboratory reconstitution guides."
        }
        crumbs={[{ label: isDe ? "Blog & Forschung" : "Blog" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured Post Card */}
        {featuredPost && (
          <div className="mb-14 overflow-hidden rounded-3xl border border-border/80 bg-card shadow-lg ring-1 ring-primary/20 transition-all hover:shadow-xl dark:bg-card/90">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative min-h-[260px] lg:col-span-6 lg:min-h-full">
                <Image
                  src={featuredPost.coverImage.src}
                  alt={featuredPost.coverImage.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  {isDe ? "⭐ Empfohlener Leitfaden" : "⭐ Featured Guide"}
                </div>
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6 lg:p-10">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 font-semibold text-primary">
                      {featuredPost.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {featuredPost.readingTimeMinutes} min read
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString(
                        isDe ? "de-DE" : "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="mt-3 text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary sm:text-2xl lg:text-3xl">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {featuredPost.excerpt}
                  </p>

                  {/* Key Takeaway snippet for quick scanning */}
                  <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-3.5">
                    <span className="flex items-center gap-1 text-xs font-bold text-primary">
                      <Sparkles className="size-3.5" />
                      {isDe ? "Kernaussage für Forscher:" : "Key Takeaway:"}
                    </span>
                    <p className="mt-1 text-xs leading-relaxed text-foreground/90">
                      {featuredPost.keyTakeaways[0]}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-xs">
                      {featuredPost.author.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-foreground">
                        {featuredPost.author.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {featuredPost.author.role}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline sm:text-sm"
                  >
                    <span>{isDe ? "Vollständigen Artikel lesen" : "Read Full Article"}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Search & Category Filter Section */}
        <BlogSearchAndFilter posts={BLOG_POSTS} locale={locale} />
      </div>
    </>
  );
}
