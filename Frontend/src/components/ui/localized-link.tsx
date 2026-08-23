"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n-client";

export function LocalizedLink({
  href,
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  const locale = useLocale();

  let localizedHref = href;

  if (locale === "en" && typeof href === "string" && href.startsWith("/")) {
    localizedHref = href === "/" ? "/en" : `/en${href}`;
  }

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}

export default LocalizedLink;
