import Image from "next/image";
import type { Metadata } from "next";
import { FileCheck2, MessagesSquare, ShieldCheck, Snowflake } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CountUpStat } from "@/components/motion/count-up-stat";
import { COMPANY_ADDRESS, SITE_NAME } from "@/constants/site";
import { BENEFITS, COMPANY_STATS } from "@/lib/data/content";
import { getServerLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const title = locale === "de" ? "Über uns" : "About Us";
  const description = locale === "de" 
    ? "Erfahren Sie mehr über das Engagement von Wardiere Peptide Sciences für drittanbieter-verifizierte Peptide in Forschungsqualität."
    : "Learn about Wardiere Peptide Sciences' commitment to third-party verified, research-grade peptides.";
  return { title, description };
}

const BENEFIT_ICONS: Record<string, typeof ShieldCheck> = {
  ShieldCheck,
  Snowflake,
  FileCheck2,
  MessagesSquare,
};

export default async function AboutPage() {
  const locale = await getServerLocale();

  // Localize stats
  const localizedCompanyStats = COMPANY_STATS.map((stat) => {
    let label = stat.label;
    if (locale === "de") {
      if (stat.id === "stat-batches") label = "Chargen unabhängig verifiziert";
      else if (stat.id === "stat-labs") label = "Forschungslabore beliefert";
      else if (stat.id === "stat-countries") label = "Länder beliefert";
      else if (stat.id === "stat-purity") label = "Durchschnittliche Reinheit";
    }
    return { ...stat, label };
  });

  // Localize benefits
  const localizedBenefits = BENEFITS.map((benefit) => {
    let title = benefit.title;
    let description = benefit.description;
    if (locale === "de") {
      if (benefit.id === "benefit-verified") {
        title = "Drittanbieter-verifiziert";
        description = "Jede Charge wird vor der Freigabe unabhängig per HPLC- und Massenspektrometrie-Analyse geprüft.";
      } else if (benefit.id === "benefit-cold-chain") {
        title = "Kühlketten-Versand";
        description = "Temperaturempfindliche Bestellungen werden in isolierter Kühlkettenverpackung versendet.";
      } else if (benefit.id === "benefit-documentation") {
        title = "Vollständige Dokumentation";
        description = "Analysezertifikate und Chargenprotokolle sind für jedes von uns versandte Produkt verfügbar.";
      } else if (benefit.id === "benefit-support") {
        title = "Reaktionsschneller Support";
        description = "Unser wissenschaftlich geschultes Support-Team antwortet innerhalb von Stunden, nicht Tagen.";
      }
    }
    return { ...benefit, title, description };
  });

  const addressCountry = locale === "de" ? "Deutschland" : COMPANY_ADDRESS.country;

  return (
    <>
      <PageHeader
        title={locale === "de" ? `Über ${SITE_NAME}` : `About ${SITE_NAME}`}
        description={locale === "de" ? "Lieferung verifizierter Peptide in Forschungsqualität an Labore weltweit seit 2014." : "Supplying verified, research-grade peptides to laboratories worldwide since 2014."}
        crumbs={[{ label: locale === "de" ? "Über uns" : "About" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{locale === "de" ? "Unsere Mission" : "Our Mission"}</h2>
            <p className="leading-relaxed text-muted-foreground">
              {locale === "de" ? (
                `Wardiere wurde gegründet, um die Lücke zwischen der Forschungsnachfrage und der verifizierten Lieferqualität zu schließen. Zu viele Laboratorien mussten sich zwischen Geschwindigkeit und Dokumentation entscheiden. Wir haben eine Lieferkette aufgebaut, die beides bietet: Jede von uns freigegebene Charge wird unabhängig durch HPLC und Massenspektrometrie von Drittanbietern verifiziert, und jede Bestellung wird mit einem passenden Analyzertifikat versendet.`
              ) : (
                `${SITE_NAME} was founded to close the gap between research demand and verifiable supply quality. Too many laboratories were forced to choose between speed and documentation. We built a supply chain that delivers both: every batch we release is independently verified by third-party HPLC and mass spectrometry, and every order ships with a matching certificate of analysis.`
              )}
            </p>
            <p className="leading-relaxed text-muted-foreground">
              {locale === "de" ? (
                `Mit Hauptsitz in München arbeitet unser Team direkt mit GMP-konformen Produktionspartnern und Logistikdienstleistern für die Kühlkette zusammen, um sicherzustellen, dass jede Ampulle genau wie dokumentiert ankommt – konsistente Reinheit, genaue Konzentration und vollständige Chargenrückverfolgbarkeit.`
              ) : (
                `Headquartered in Munich, Germany, our team works directly with GMP-aligned manufacturing partners and cold-chain logistics providers to ensure every vial arrives exactly as documented — consistent purity, accurate concentration, and complete batch traceability.`
              )}
            </p>
            <p className="text-sm text-muted-foreground">
              {COMPANY_ADDRESS.line1}, {COMPANY_ADDRESS.city}, {COMPANY_ADDRESS.state} {COMPANY_ADDRESS.postalCode},{" "}
              {addressCountry}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
            <Image src="/images/hero/bottle-4.png" alt="Research peptide vials in laboratory storage" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
        </div>

        <RevealGroup className="mt-20 grid grid-cols-2 gap-6 rounded-2xl bg-primary px-6 py-10 text-primary-foreground sm:grid-cols-4">
          {localizedCompanyStats.map((stat) => (
            <RevealItem key={stat.id} className="flex flex-col items-center gap-1 text-center">
              <CountUpStat
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="text-3xl font-semibold tracking-tight"
              />
              <span className="text-sm text-primary-foreground/80">{stat.label}</span>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-20">
          <Reveal>
            <h2 className="mb-8 text-2xl font-semibold tracking-tight text-foreground">{locale === "de" ? "Was uns auszeichnet" : "What Sets Us Apart"}</h2>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {localizedBenefits.map((benefit) => {
              const Icon = BENEFIT_ICONS[benefit.icon] ?? ShieldCheck;
              return (
                <RevealItem key={benefit.id} className="flex flex-col gap-2 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4.5" />
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </>
  );
}
