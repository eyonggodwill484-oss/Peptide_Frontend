import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ArticleJsonLd } from "@/components/structured-data";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import { ARTICLES } from "@/lib/data/content";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/articles/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      images: [{ url: article.coverImage.src, width: article.coverImage.width, height: article.coverImage.height, alt: article.coverImage.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage.src],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <ArticleJsonLd article={article} />
      <PageHeader title={article.title} crumbs={[{ label: "Articles", href: "/articles" }, { label: article.title }]} />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl bg-muted">
          <Image src={article.coverImage.src} alt={article.coverImage.alt} fill sizes="100vw" className="object-cover" priority />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{article.author}</span>
            <span>·</span>
            <span>{new Date(article.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span>·</span>
            <span>{article.readingTimeMinutes} min read</span>
          </div>

          <p className="text-lg leading-relaxed text-foreground">{article.excerpt}</p>
          <p className="mt-6 leading-relaxed text-muted-foreground">{article.content}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <Link href={ROUTES.articles} className="mt-10 inline-block text-sm font-medium text-primary hover:underline">
            ← Back to all articles
          </Link>
        </Reveal>
      </article>
    </>
  );
}
