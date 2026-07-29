import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constants/site";
import { ROUTES } from "@/constants/routes";
import { ARTICLES } from "@/lib/data/content";
import { getCategories } from "@/lib/data/categories";
import { getProducts } from "@/lib/data/products";

export const revalidate = 60;

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: ROUTES.home, changeFrequency: "daily", priority: 1 },
  { path: ROUTES.shop, changeFrequency: "daily", priority: 0.9 },
  { path: ROUTES.categories, changeFrequency: "weekly", priority: 0.8 },
  { path: ROUTES.articles, changeFrequency: "weekly", priority: 0.7 },
  { path: ROUTES.about, changeFrequency: "monthly", priority: 0.5 },
  { path: ROUTES.research, changeFrequency: "monthly", priority: 0.6 },
  { path: ROUTES.contact, changeFrequency: "yearly", priority: 0.4 },
  { path: ROUTES.faq, changeFrequency: "monthly", priority: 0.4 },
  { path: ROUTES.shipping, changeFrequency: "yearly", priority: 0.3 },
  { path: ROUTES.returns, changeFrequency: "yearly", priority: 0.3 },
  { path: ROUTES.privacy, changeFrequency: "yearly", priority: 0.2 },
  { path: ROUTES.terms, changeFrequency: "yearly", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}${ROUTES.product(product.slug)}`,
    lastModified: product.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}${ROUTES.category(category.slug)}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const articleEntries: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${SITE_URL}${ROUTES.article(article.slug)}`,
    lastModified: article.updatedAt ?? article.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries, ...articleEntries];
}
