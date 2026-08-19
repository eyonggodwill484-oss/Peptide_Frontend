import { headers } from "next/headers";
import { TRANSLATIONS, PRODUCT_TRANSLATIONS, CATEGORY_TRANSLATIONS, type Locale } from "@/constants/translations";
import type { Product, Category } from "@/types";

export async function getServerLocale(): Promise<Locale> {
  const headersList = await headers();
  const locale = headersList.get("x-locale");
  return locale === "en" ? "en" : "de";
}

export async function getServerTranslations() {
  const locale = await getServerLocale();
  return TRANSLATIONS[locale];
}

export function localizeProduct(product: Product, locale: Locale): Product {
  const translation = PRODUCT_TRANSLATIONS[product.slug];
  if (translation) {
    const isDe = locale === "de";
    return {
      ...product,
      name: translation.name || product.name,
      description: isDe && translation.description ? translation.description : product.description,
      shortDescription: isDe && translation.shortDescription ? translation.shortDescription : product.shortDescription,
    };
  }
  return product;
}

export function localizeCategory(category: Category, locale: Locale): Category {
  const translation = CATEGORY_TRANSLATIONS[category.slug];
  if (translation) {
    const isDe = locale === "de";
    return {
      ...category,
      name: isDe && translation.name ? translation.name : category.name,
      description: isDe && translation.description ? translation.description : category.description,
    };
  }
  return category;
}
