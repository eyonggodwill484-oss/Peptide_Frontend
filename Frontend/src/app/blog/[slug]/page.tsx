import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Clock,
  Calendar,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  ShoppingBag,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SITE_NAME, SITE_URL } from "@/constants/site";
import { BLOG_POSTS } from "@/lib/data/blog-posts";
import { getServerLocale } from "@/lib/i18n";
import { SocialShareButtons } from "./social-share";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  const title = `${post.title} | ${SITE_NAME} Blog`;
  const description = post.excerpt;
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title,
    description,
    keywords: post.tags,
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: {
        en: `${SITE_URL}/en/blog/${post.slug}`,
        de: `${SITE_URL}/blog/${post.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      section: post.category,
      images: [
        {
          url: post.coverImage.src,
          width: post.coverImage.width,
          height: post.coverImage.height,
          alt: post.coverImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.coverImage.src],
    },
  };
}

function renderInlineFormatted(text: string) {
  // Regex to split on [text](url) and **bold**
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const before = text.slice(lastIndex, match.index);
      parts.push(renderBoldText(before, `txt-${lastIndex}`));
    }
    const linkText = match[1];
    const linkHref = match[2];
    parts.push(
      <Link
        key={`link-${match.index}`}
        href={linkHref}
        className="font-semibold text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
      >
        {linkText}
      </Link>
    );
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(renderBoldText(text.slice(lastIndex), `txt-end`));
  }

  return parts;
}

function renderBoldText(text: string, keyPrefix: string): React.ReactNode {
  const boldRegex = /\*\*([^*]+)\*\*/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={`${keyPrefix}-bold-${match.index}`} className="font-semibold text-foreground">
        {match[1]}
      </strong>
    );
    lastIndex = boldRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : parts;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const locale = await getServerLocale();
  const isDe = locale === "de";

  // Related posts (excluding current post)
  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  // 1. JSON-LD BlogPosting Schema for AI & Google Rich Results
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${post.slug}/#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    inLanguage: isDe ? "de" : "en",
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
    },
    image: `${SITE_URL}${post.coverImage.src}`,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
  };

  // 2. BreadcrumbList Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isDe ? "Forschungs-Blog" : "Research Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  // 3. FAQPage Schema if article contains FAQs
  const faqJsonLd = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <>
      {/* Search Engine & AI Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Header Banner */}
      <div className="border-b border-border bg-gradient-to-b from-card/80 via-background to-background py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-foreground">
              Blog
            </Link>
            <span>/</span>
            <span className="truncate max-w-[200px] text-foreground font-medium">
              {post.title}
            </span>
          </div>

          {/* Category & Metadata */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {post.readingTimeMinutes} min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="size-3.5" />
              {isDe ? "Veröffentlicht am" : "Published"}{" "}
              {new Date(post.publishedAt).toLocaleDateString(isDe ? "de-DE" : "en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Main Title (H1) */}
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {post.excerpt}
          </p>

          {/* Author Card & Social Share Row */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-5">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {post.author.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">{post.author.name}</span>
                <span className="text-xs text-muted-foreground">{post.author.role}</span>
              </div>
            </div>

            <SocialShareButtons
              title={post.title}
              url={`${SITE_URL}/blog/${post.slug}`}
              locale={locale}
            />
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Cover Image */}
        <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-3xl border border-border/80 bg-muted shadow-md">
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* AI-Optimized TL;DR / Key Takeaways Box (Featured Snippet Format) */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="mb-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 shadow-xs dark:bg-primary/10">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="size-5" />
              <h2 className="text-base font-bold sm:text-lg">
                {isDe ? "Wissenschaftliche Kernaussagen (TL;DR)" : "Key Takeaways (Executive Summary)"}
              </h2>
            </div>
            <ul className="mt-4 flex flex-col gap-2.5">
              {post.keyTakeaways.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90">
                  <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-p:leading-relaxed prose-p:text-muted-foreground prose-li:text-muted-foreground prose-table:border prose-table:border-border prose-th:bg-muted/60 prose-th:p-3 prose-td:p-3 prose-td:border prose-td:border-border">
          {post.content.split("\n\n").map((block, idx) => {
            const trimmed = block.trim();
            if (trimmed.startsWith("## ")) {
              return (
                <h2 key={idx} className="text-2xl font-bold tracking-tight text-foreground mt-10 mb-4">
                  {trimmed.replace("## ", "")}
                </h2>
              );
            }
            if (trimmed.startsWith("### ")) {
              return (
                <h3 key={idx} className="text-xl font-semibold text-foreground mt-6 mb-3">
                  {trimmed.replace("### ", "")}
                </h3>
              );
            }
            if (trimmed.startsWith("| ")) {
              // Markdown Table rendering
              const rows = trimmed.split("\n").filter((r) => !r.includes("---"));
              const headers = rows[0]?.split("|").filter(Boolean).map((h) => h.trim());
              const bodyRows = rows.slice(1).map((r) => r.split("|").filter(Boolean).map((c) => c.trim()));

              return (
                <div key={idx} className="my-6 overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-left text-sm">
                    {headers && (
                      <thead className="bg-muted/70 text-xs uppercase font-semibold text-foreground">
                        <tr>
                          {headers.map((h, i) => (
                            <th key={i} className="p-3.5 border-b border-border">
                              {h.replace(/\*\*/g, "")}
                            </th>
                          ))}
                        </tr>
                      </thead>
                    )}
                    <tbody className="divide-y divide-border">
                      {bodyRows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-muted/30">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3.5 text-muted-foreground">
                              {cell.replace(/\*\*/g, "")}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            if (trimmed.startsWith("- ") || trimmed.startsWith("1. ")) {
              const listItems = trimmed.split("\n");
              return (
                <ul key={idx} className="my-4 list-disc pl-6 space-y-1.5 text-muted-foreground text-sm sm:text-base">
                  {listItems.map((item, i) => {
                    const rawText = item.replace(/^[-*0-9.]+\s*/, "");
                    return (
                      <li key={i}>
                        {renderInlineFormatted(rawText)}
                      </li>
                    );
                  })}
                </ul>
              );
            }
            if (trimmed === "---") {
              return <hr key={idx} className="my-8 border-border" />;
            }
            return (
              <p key={idx} className="my-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {renderInlineFormatted(trimmed)}
              </p>
            );
          })}
        </div>

        {/* Relevant Products Spotlight Widget */}
        {post.relatedProducts && post.relatedProducts.length > 0 && (
          <div className="mt-14 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm dark:bg-card/90">
            <div className="flex items-center gap-2 text-foreground font-bold text-lg sm:text-xl">
              <ShoppingBag className="size-5 text-primary" />
              <span>{isDe ? "Im Artikel erwähnte Forschungspeptide" : "Referenced Research Compounds"}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              {isDe
                ? "Drittanbieter-geprüft per HPLC mit downloadbarem Analysezertifikat (CoA)."
                : "Third-party verified via HPLC & Mass Spectrometry with batch-specific CoA."}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {post.relatedProducts.map((prod) => (
                <Link
                  key={prod.slug}
                  href={`/product/${prod.slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-muted/40 p-3.5 transition-all hover:border-primary hover:bg-card hover:shadow-md"
                >
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-background p-1 border border-border/60">
                    <Image src={prod.image} alt={prod.name} fill className="object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-xs font-bold text-foreground group-hover:text-primary sm:text-sm">
                      {prod.name}
                    </h3>
                    <span className="text-xs font-semibold text-primary">{prod.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQs Accordion if any */}
        {post.faqs && post.faqs.length > 0 && (
          <div className="mt-14 border-t border-border pt-10">
            <div className="flex items-center gap-2 text-foreground font-bold text-xl">
              <HelpCircle className="size-5 text-primary" />
              <span>{isDe ? "Häufig gestellte Fragen (FAQ)" : "Frequently Asked Questions"}</span>
            </div>
            <div className="mt-6 flex flex-col gap-4">
              {post.faqs.map((faq, index) => (
                <div key={index} className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-sm sm:text-base font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-6">
          <span className="text-xs font-semibold text-muted-foreground">
            {isDe ? "Schlagwörter:" : "Tags:"}
          </span>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Back to Blog Navigation */}
        <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="size-4" />
            <span>{isDe ? "Zurück zur Blog-Übersicht" : "Back to All Articles"}</span>
          </Link>
        </div>
      </article>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {isDe ? "Weitere Fachartikel & Leitfäden" : "Related Research Publications"}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rel) => (
                <article
                  key={rel.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link href={`/blog/${rel.slug}`} className="relative aspect-video w-full overflow-hidden bg-muted">
                    <Image
                      src={rel.coverImage.src}
                      alt={rel.coverImage.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                  <div className="p-5">
                    <span className="text-[11px] font-semibold text-primary">{rel.category}</span>
                    <Link href={`/blog/${rel.slug}`}>
                      <h3 className="mt-1.5 line-clamp-2 text-sm sm:text-base font-bold text-foreground group-hover:text-primary">
                        {rel.title}
                      </h3>
                    </Link>
                    <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{rel.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
