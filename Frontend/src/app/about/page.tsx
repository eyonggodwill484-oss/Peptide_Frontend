import Image from "next/image";
import type { Metadata } from "next";
import { FileCheck2, MessagesSquare, ShieldCheck, Snowflake } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CountUpStat } from "@/components/motion/count-up-stat";
import { COMPANY_ADDRESS, SITE_NAME } from "@/constants/site";
import { BENEFITS, COMPANY_STATS } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Wardiere Peptide Sciences' commitment to third-party verified, research-grade peptides.",
};

const BENEFIT_ICONS: Record<string, typeof ShieldCheck> = {
  ShieldCheck,
  Snowflake,
  FileCheck2,
  MessagesSquare,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={`About ${SITE_NAME}`}
        description="Supplying verified, research-grade peptides to laboratories worldwide since 2019."
        crumbs={[{ label: "About" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Our Mission</h2>
            <p className="leading-relaxed text-muted-foreground">
              {SITE_NAME} was founded to close the gap between research demand and verifiable supply quality. Too
              many laboratories were forced to choose between speed and documentation. We built a supply chain that
              delivers both: every batch we release is independently verified by third-party HPLC and mass
              spectrometry, and every order ships with a matching certificate of analysis.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Headquartered in Cambridge, Massachusetts, our team works directly with GMP-aligned manufacturing
              partners and cold-chain logistics providers to ensure every vial arrives exactly as documented —
              consistent purity, accurate concentration, and complete batch traceability.
            </p>
            <p className="text-sm text-muted-foreground">
              {COMPANY_ADDRESS.line1}, {COMPANY_ADDRESS.city}, {COMPANY_ADDRESS.state} {COMPANY_ADDRESS.postalCode},{" "}
              {COMPANY_ADDRESS.country}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
            <Image src="/images/hero/bottle-4.png" alt="Research peptide vials in laboratory storage" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
        </div>

        <RevealGroup className="mt-20 grid grid-cols-2 gap-6 rounded-2xl bg-primary px-6 py-10 text-primary-foreground sm:grid-cols-4">
          {COMPANY_STATS.map((stat) => (
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
            <h2 className="mb-8 text-2xl font-semibold tracking-tight text-foreground">What Sets Us Apart</h2>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit) => {
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
