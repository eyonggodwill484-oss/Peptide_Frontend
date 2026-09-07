import type { MetadataRoute } from "next";

import { ROUTES } from "@/constants/routes";
import { localeUrls } from "@/lib/seo/alternates";
import { BLOG_POSTS } from "@/lib/data/blog-posts";
import { getCategories } from "@/lib/data/categories";
import { getProducts } from "@/lib/data/products";

export const revalidate = 3600;

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const STATIC_ROUTES: { path: string; changeFrequency: ChangeFrequency; priority: number }[] = [
  { path: ROUTES.home, changeFrequency: "daily", priority: 1 },
  { path: ROUTES.shop, changeFrequency: "daily", priority: 0.9 },
  { path: ROUTES.categories, changeFrequency: "weekly", priority: 0.8 },
  { path: ROUTES.blog, changeFrequency: "daily", priority: 0.8 },
  { path: ROUTES.reviews, changeFrequency: "weekly", priority: 0.7 },
  { path: ROUTES.about, changeFrequency: "monthly", priority: 0.5 },
  { path: ROUTES.research, changeFrequency: "monthly", priority: 0.6 },
  { path: ROUTES.qualityDocumentation, changeFrequency: "monthly", priority: 0.6 },
  { path: "/wholesale", changeFrequency: "monthly", priority: 0.6 },
  { path: "/research-peptides-ireland", changeFrequency: "monthly", priority: 0.5 },
  { path: ROUTES.contact, changeFrequency: "yearly", priority: 0.4 },
  { path: ROUTES.faq, changeFrequency: "monthly", priority: 0.4 },
  { path: ROUTES.shipping, changeFrequency: "yearly", priority: 0.3 },
  { path: ROUTES.returns, changeFrequency: "yearly", priority: 0.3 },
  { path: ROUTES.privacy, changeFrequency: "yearly", priority: 0.2 },
  { path: ROUTES.terms, changeFrequency: "yearly", priority: 0.2 },
];

/**
 * Normalize any date-ish value into a valid Date.
 * DB timestamps (Postgres) arrive with inconsistent microsecond precision
 * (e.g. "2026-07-29T20:22:07.448385+00:00") which some sitemap validators
 * reject; static content uses plain "YYYY-MM-DD" strings. Routing everything
 * through `new Date()` -> Next's serializer guarantees a single, always-valid
 * "YYYY-MM-DDTHH:mm:ss.sssZ" format on output, and drops the field entirely
 * for anything unparsable instead of emitting an invalid "Invalid Date" node.
 */
function toLastModified(value: string | Date | null | undefined): Date | undefined {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

/**
 * Emits one <url> entry per locale for a given path, each carrying a full,
 * self-referencing hreflang alternates map (de-DE / en / x-default) — the
 * format Google's docs require for multi-language sitemaps, and the same
 * map every page's own <head> declares via buildAlternates(). Germany is
 * the primary market, so the German entry keeps the full priority weight
 * and the English variant is weighted down (Google mostly ignores
 * <priority> as a cross-site ranking signal, but it's still the sitemap's
 * one lever to say "this version is the one we care about most").
 */
function localizedEntries(
  path: string,
  options: { lastModified?: Date; changeFrequency: ChangeFrequency; priority: number }
): MetadataRoute.Sitemap {
  const languages = localeUrls(path);

  return [
    { url: languages["de-DE"], alternates: { languages }, ...options },
    { url: languages.en, alternates: { languages }, ...options, priority: Number((options.priority * 0.7).toFixed(2)) },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const staticEntries = STATIC_ROUTES.flatMap((route) =>
    localizedEntries(route.path, { changeFrequency: route.changeFrequency, priority: route.priority })
  );

  const productEntries = products.flatMap((product) =>
    localizedEntries(ROUTES.product(product.slug), {
      lastModified: toLastModified(product.createdAt),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  const categoryEntries = categories.flatMap((category) =>
    localizedEntries(ROUTES.category(category.slug), {
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  const blogEntries = BLOG_POSTS.flatMap((post) =>
    localizedEntries(ROUTES.blogPost(post.slug), {
      lastModified: toLastModified(post.updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  return [...staticEntries, ...categoryEntries, ...productEntries, ...blogEntries];
}
