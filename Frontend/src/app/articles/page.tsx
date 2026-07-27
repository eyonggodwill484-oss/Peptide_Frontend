import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ROUTES } from "@/constants/routes";
import { ARTICLES } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Articles",
  description: "Research guides on purity testing, cold-chain storage, and reconstitution technique.",
};

export default function ArticlesPage() {
  const articles = [...ARTICLES].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <>
      <PageHeader title="Latest Articles" description="Guides and insights from our research team." crumbs={[{ label: "Articles" }]} />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <RevealGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {articles.map((article) => (
            <RevealItem key={article.id}>
              <Link href={ROUTES.article(article.slug)} className="group flex flex-col gap-3">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={article.coverImage.src}
                    alt={article.coverImage.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{new Date(article.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  <span>·</span>
                  <span>{article.readingTimeMinutes} min read</span>
                </div>
                <h2 className="text-lg font-semibold leading-snug text-foreground group-hover:text-primary">{article.title}</h2>
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </>
  );
}
