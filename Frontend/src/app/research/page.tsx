import Image from "next/image";
import type { Metadata } from "next";
import { Snowflake, ThermometerSnowflake } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { RESEARCH_USE_DISCLAIMER } from "@/constants/site";
import { CERTIFICATES } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Research & Quality",
  description: "Our quality standards, storage guidelines, and independent certificates of analysis.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        title="Research & Quality Standards"
        description="How we verify, document, and preserve every batch we ship."
        crumbs={[{ label: "Research" }]}
      />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <section id="quality" className="scroll-mt-24">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Quality Standards</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Every batch we release undergoes independent third-party verification via high-performance liquid
              chromatography (HPLC) and mass spectrometry prior to fulfillment. Our manufacturing partners follow
              GMP-aligned process controls, and our fulfillment facility operates under ISO 9001-aligned quality
              management practices. Results are not self-reported — each certificate of analysis is issued by an
              independent analytical laboratory with no financial interest in the outcome.
            </p>
          </Reveal>
        </section>

        <section id="certificates" className="mt-16 scroll-mt-24">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Certificates of Analysis</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Every product page includes a link to download the certificate of analysis for that batch. Certificates
              include chromatography traces, purity percentage, molecular identity confirmation, and batch numbers for
              full traceability.
            </p>
          </Reveal>
          <RevealGroup className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {CERTIFICATES.map((certificate) => (
              <RevealItem key={certificate.id} className="flex flex-col items-center gap-3 rounded-xl bg-card p-6 text-center ring-1 ring-foreground/10">
                <Image src={certificate.image.src} alt={certificate.image.alt} width={64} height={64} className="size-16 object-contain" />
                <h3 className="text-sm font-semibold text-foreground">{certificate.name}</h3>
                <p className="text-xs text-muted-foreground">{certificate.issuer}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{certificate.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        <section id="storage" className="mt-16 scroll-mt-24">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Storage Guidelines</h2>
          </Reveal>
          <RevealGroup className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <RevealItem className="flex gap-3 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
              <Snowflake className="size-5 shrink-0 text-primary" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">Lyophilized (Powder) Storage</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Store at -20°C until reconstitution. Protect from light and repeated freeze-thaw cycles to preserve
                  peptide integrity.
                </p>
              </div>
            </RevealItem>
            <RevealItem className="flex gap-3 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
              <ThermometerSnowflake className="size-5 shrink-0 text-primary" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">After Reconstitution</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Most reconstituted compounds should be stored at 2–8°C and used within the timeframe listed on the
                  product specification sheet.
                </p>
              </div>
            </RevealItem>
          </RevealGroup>
        </section>

        <section id="disclaimer" className="mt-16 scroll-mt-24 rounded-xl border border-border bg-muted/40 p-6">
          <Reveal>
            <h2 className="text-lg font-semibold text-foreground">Research Use Disclaimer</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{RESEARCH_USE_DISCLAIMER}</p>
          </Reveal>
        </section>
      </div>
    </>
  );
}
