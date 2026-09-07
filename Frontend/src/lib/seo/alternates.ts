import type { Metadata } from "next";

import { SITE_URL } from "@/constants/site";

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

/** Self-referencing canonical + hreflang alternates for a page's <head> metadata. */
export function buildAlternates(path: string): Metadata["alternates"] {
  return { canonical: path, languages: localeUrls(path) };
}
