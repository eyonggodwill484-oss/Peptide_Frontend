import { TESTIMONIALS, FAQ_ITEMS, ARTICLES, COMPANY_STATS, CERTIFICATES, BENEFITS } from "@/lib/data/content";
import type { Testimonial, FaqItem, Article } from "@/types";

export async function fetchTestimonials(): Promise<Testimonial[]> {
  return TESTIMONIALS;
}

export async function fetchFaqItems(): Promise<FaqItem[]> {
  return FAQ_ITEMS;
}

export async function fetchArticles(): Promise<Article[]> {
  return [...ARTICLES].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function fetchArticleBySlug(slug: string): Promise<Article | undefined> {
  return ARTICLES.find((a) => a.slug === slug);
}

export async function fetchCompanyStats() {
  return COMPANY_STATS;
}

export async function fetchCertificates() {
  return CERTIFICATES;
}

export async function fetchBenefits() {
  return BENEFITS;
}
