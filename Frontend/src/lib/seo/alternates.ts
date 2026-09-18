import type { Metadata } from "next";

import { SITE_URL } from "@/constants/site";
import { getServerLocale } from "@/lib/i18n";

/**
 * The absolute URL for each locale variant of a root-relative path.
 *
 * The store's primary market is Germany: German serves at the path itself,
 * English under an `/en` prefix (see middleware.ts). `de-DE` (not the bare
 * `de`) is used because the target is Germany specifically, not German
 * speakers generally, and `x-default` falls back to the German page since
 * that's what every visitor gets unless they're on `/en`.
 */
export function localeUrls(path: string): Record<"de-DE" | "en" | "x-default", string> {
  const de = `${SITE_URL}${path}`;
  const en = `${SITE_URL}${path === "/" ? "/en" : `/en${path}`}`;
  return { "de-DE": de, en, "x-default": de };
}

/**
 * Self-referencing canonical + hreflang alternates for a page's <head> metadata.
 *
 * `path` is always the bare (German) route — e.g. `/shop`, never `/en/shop` —
 * because middleware.ts rewrites `/en/*` requests down to their bare path
 * before the page ever sees them. Without reading the locale here, every
 * page would emit a canonical pointing at the German URL even when serving
 * the English one, which tells Google the `/en/*` pages are duplicates and
 * keeps them out of the index despite being listed in the sitemap.
 */
export async function buildAlternates(path: string): Promise<Metadata["alternates"]> {
  const languages = localeUrls(path);
  const locale = await getServerLocale();
  return { canonical: locale === "en" ? languages.en : languages["de-DE"], languages };
}
