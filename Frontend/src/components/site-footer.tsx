import Link from "@/components/ui/localized-link";

import { ROUTES } from "@/constants/routes";
import { FOOTER_LINKS } from "@/constants/navigation";
import {
  CONTACT_EMAIL,
  RESEARCH_USE_DISCLAIMER,
  SITE_SHORT_NAME,
  SOCIAL_LINKS,
} from "@/constants/site";
import { getServerLocale, getServerTranslations } from "@/lib/i18n";

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125M7.114 20.452H3.558V9h3.556zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.69.072 4.948.072s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.668-.072-4.948C23.728 2.7 21.306.273 16.949.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

// Bitcoin Official Logo
function BitcoinPaymentBadge() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3.5 py-2 shadow-xs transition-colors hover:border-amber-400/50 hover:bg-white/15">
      <svg className="size-6 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#F7931A" />
        <path
          d="M21.9 14.2c.3-2.1-1.3-3.2-3.5-4l.7-2.9-1.8-.4-.7 2.8c-.5-.1-1-.2-1.5-.3l.7-2.8-1.8-.4-.7 2.9c-.4-.1-.8-.2-1.1-.3l-2.4-.6-.5 1.9s1.3.3 1.3.3c.7.2.8.7.8 1.1l-.8 3.2c.1 0 .1 0 .2.1l-.2-.1-1.1 4.5c-.1.2-.3.6-.8.5 0 0-1.3-.3-1.3-.3l-.9 2 2.3.6c.4.1.8.2 1.3.3l-.7 2.9 1.8.4.7-2.9c.5.1 1 .2 1.5.3l-.7 2.8 1.8.4.7-2.9c3.1.6 5.4.3 6.4-2.5.8-2.2-.04-3.5-1.7-4.3 1.2-.3 2.1-1.1 2.3-2.7zm-4.1 5.9c-.6 2.3-4.5 1-5.7.8l1-4.1c1.3.3 5.3 1 4.7 3.3zm.6-5.9c-.5 2.1-3.7.9-4.8.7l.9-3.7c1.1.3 4.4 1 3.9 3z"
          fill="#FFFFFF"
        />
      </svg>
      <div className="flex flex-col">
        <span className="text-xs font-bold leading-none text-white">Bitcoin</span>
        <span className="text-[10px] leading-tight text-white/70">BTC / Crypto</span>
      </div>
    </div>
  );
}

// Remitly Official Logo
function RemitlyPaymentBadge() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3.5 py-2 shadow-xs transition-colors hover:border-[#30D5C8]/60 hover:bg-white/15">
      <svg className="size-6 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#002D54" />
        <path
          d="M8.5 22.5V9.5h6.2c3.2 0 5.3 1.6 5.3 4.2 0 1.9-1 3.2-2.6 3.8L21.5 22.5h-3.6l-3.3-4.4H11.5v4.4H8.5zm3-6.8h3.2c1.6 0 2.4-.7 2.4-1.7s-.8-1.7-2.4-1.7h-3.2v3.4z"
          fill="#30D5C8"
        />
        <circle cx="21" cy="11.5" r="2" fill="#30D5C8" />
      </svg>
      <div className="flex flex-col">
        <span className="text-xs font-bold leading-none text-white">Remitly</span>
        <span className="text-[10px] leading-tight text-white/70">Fast Transfer</span>
      </div>
    </div>
  );
}

export async function SiteFooter() {
  const locale = await getServerLocale();
  const t = await getServerTranslations();

  // Localize footer links headings and labels
  const localizedFooterLinks = FOOTER_LINKS.map((column) => {
    let heading = column.heading;
    if (column.heading === "Shop") heading = t.nav.shop;
    else if (column.heading === "Company") heading = t.nav.about;
    else if (column.heading === "Support") heading = "Support";
    else if (column.heading === "Legal") heading = "Legal";

    const links = column.links.map((link) => {
      let label = link.label;
      if (link.label === "All Products") label = t.nav.allProducts;
      else if (link.label === "Categories") label = t.nav.categories;
      else if (link.label === "Best Sellers") label = t.nav.bestSellers;
      else if (link.label === "New Arrivals") label = t.nav.newArrivals;
      else if (link.label === "Bulk Wholesale (B2B)") label = locale === "de" ? "B2B Großhandel & Rabatte" : "Bulk Wholesale (B2B)";
      else if (link.label === "About Us") label = t.nav.about;
      else if (link.label === "Research Information") label = t.nav.research;
      else if (link.label === "Blog & Articles" || link.label === "Latest Articles") label = locale === "de" ? "Wissenschaftlicher Blog" : "Research Articles";
      else if (link.label === "Customer Reviews") label = t.nav.reviewsNav;
      else if (link.label === "Contact") label = t.nav.contact;
      else if (link.label === "FAQ") label = t.nav.faq;
      else if (link.label === "Shipping Policy") label = t.nav.shipping;
      else if (link.label === "Returns Policy") label = t.nav.returns;
      else if (link.label === "Quality Documentation") label = t.nav.qualityDocsNav;
      else if (link.label === "Ireland Research Support") label = t.nav.irelandSupplierNav;
      else if (link.label === "Track Order") label = t.nav.trackOrder;
      else if (link.label === "Privacy Policy") label = t.nav.privacy;
      else if (link.label === "Terms of Service") label = t.nav.terms;
      else if (link.label === "Research Use Disclaimer") label = t.nav.disclaimer;

      return { ...link, label };
    });

    return { heading, links };
  });

  const localizedDisclaimer = locale === "de"
    ? "Alle Produkte sind ausschließlich für Laboruntersuchungen und Forschungszwecke bestimmt. Nicht für den menschlichen Verzehr, die medizinische Diagnose oder therapeutische Zwecke."
    : RESEARCH_USE_DISCLAIMER;

  const rightsReserved = locale === "de"
    ? `Alle Rechte vorbehalten.`
    : `All rights reserved.`;

  return (
    <footer className="border-t border-brand-dark bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 flex flex-col gap-3 lg:col-span-2">
            <Link href={ROUTES.home} className="flex items-center gap-2 text-white">
              <img src="/logo.svg" alt={SITE_SHORT_NAME} className="size-9 rounded-lg" />
              <span className="text-lg font-semibold tracking-tight">{SITE_SHORT_NAME}</span>
            </Link>
            <p className="max-w-xs text-sm text-white/70">{t.meta.tagline}</p>
            <div className="text-xs text-white/60 space-y-0.5">
              <p className="font-semibold text-white/90">📍 Wardiere Peptide Sciences GmbH</p>
              <p>Maximilianstraße 24, 80539 München, Deutschland</p>
              <p className="text-amber-400/90 font-medium">❄️ Kühlketten-Logistikzentrum Bayern</p>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-white/70 transition-colors hover:text-white"
              >
                <XIcon className="size-4" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/70 transition-colors hover:text-white"
              >
                <LinkedInIcon className="size-4.5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/70 transition-colors hover:text-white"
              >
                <InstagramIcon className="size-4.5" />
              </a>
            </div>
          </div>

          {localizedFooterLinks.map((column) => (
            <div key={column.heading} className="flex flex-col gap-2.5">
              <span className="text-sm font-semibold text-white">{column.heading}</span>
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Accepted Payment Methods Indicator */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:p-5">
          <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-white">
              {locale === "de" ? "Akzeptierte Zahlungsmethoden" : "Accepted Payment Methods"}
            </span>
            <span className="text-[11px] text-white/60">
              {locale === "de"
                ? "Sichere & verschlüsselte Bezahlung per Krypto & Direktüberweisung"
                : "Encrypted, fast, and secure checkout via Bitcoin & Remitly"}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <BitcoinPaymentBadge />
            <RemitlyPaymentBadge />
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-6">
          <p className="text-xs leading-relaxed text-white/60">{localizedDisclaimer}</p>
          <div className="mt-4 flex flex-col gap-2 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {new Date().getFullYear()} {SITE_SHORT_NAME} Peptide Sciences. {rightsReserved}
            </span>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
