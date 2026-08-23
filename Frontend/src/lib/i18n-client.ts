"use client";

import { usePathname } from "next/navigation";
import { TRANSLATIONS, type Locale } from "@/constants/translations";

export function useLocale(): Locale {
  const pathname = usePathname();
  // Safe check if running on client
  if (!pathname) return "de";
  return pathname.startsWith("/en/") || pathname === "/en" ? "en" : "de";
}

export function useTranslations() {
  const locale = useLocale();
  return TRANSLATIONS[locale];
}
