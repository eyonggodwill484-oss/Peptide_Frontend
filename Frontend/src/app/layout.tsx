import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";
import { TawkChatWidget } from "@/components/tawk-chat-widget";
import { FomoSalesPopup } from "@/components/fomo-sales-popup";
import { SiteJsonLd } from "@/components/structured-data";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProvider } from "@/components/posthog-provider";
import { SITE_NAME, SITE_URL } from "@/constants/site";
import { getFeaturedCategories } from "@/lib/data/categories";

import { getServerLocale, getServerTranslations } from "@/lib/i18n";
import { CATEGORY_TRANSLATIONS } from "@/constants/translations";

const geistSans = { variable: "--font-geist-sans" };
const geistMono = { variable: "--font-geist-mono" };

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = await getServerTranslations();

  return {
    title: {
      default: `${t.meta.title}`,
      template: `%s | ${t.meta.title}`,
    },
    description: t.meta.description,
    metadataBase: new URL(SITE_URL),
    robots: { index: true, follow: true },
    openGraph: {
      siteName: SITE_NAME,
      locale: locale === "en" ? "en_US" : "de_DE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      canonical: SITE_URL,
      languages: {
        de: SITE_URL,
        en: `${SITE_URL}/en`,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();
  const rawCategories = await getFeaturedCategories();

  // Localize categories before passing to SiteHeader
  const categories = rawCategories.map((c) => {
    const translation = CATEGORY_TRANSLATIONS[c.slug];
    return {
      ...c,
      name: locale === "de" && translation?.name ? translation.name : c.name,
    };
  });

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground">
        <PostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <LenisProvider>
              <SiteJsonLd />
              <SiteHeader categories={categories} />
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <Toaster position="bottom-right" />
            </LenisProvider>
            <FomoSalesPopup locale={locale} />
            <TawkChatWidget />
            <Analytics />
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
