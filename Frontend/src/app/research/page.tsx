import Image from "next/image";
import type { Metadata } from "next";
import { Snowflake, ThermometerSnowflake } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { RESEARCH_USE_DISCLAIMER } from "@/constants/site";
import { CERTIFICATES } from "@/lib/data/content";
import { getServerLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const title = locale === "de" ? "Forschung & Qualität" : "Research & Quality";
  const description = locale === "de" 
    ? "Unsere Qualitätsstandards, Richtlinien zur Lagerung und unabhängigen Analysezertifikate."
    : "Our quality standards, storage guidelines, and independent certificates of analysis.";
  return { title, description };
}

export default async function ResearchPage() {
  const locale = await getServerLocale();

  const localizedCertificates = CERTIFICATES.map((cert) => {
    let name = cert.name;
    let description = cert.description;
    let issuer = cert.issuer;
    if (locale === "de") {
      issuer = cert.id === "iso-9001-facility" ? "Unabhängiger Qualitätsprüfer" :
               cert.id === "third-party-hplc" ? "Unabhängiges Analyselabor" :
               cert.id === "gmp-aligned-process" ? "Interne Qualitätssicherung" :
               "Logistik-Compliance-Partner";
      if (cert.id === "iso-9001-facility") {
        name = "ISO 9001 konforme Anlage";
        description = "Unsere Versandzentren arbeiten nach ISO 9001-konformen Qualitätsmanagement-Prozessen.";
      } else if (cert.id === "third-party-hplc") {
        name = "HPLC-Verifizierung durch Drittanbieter";
        description = "Jede Charge wird von einem unabhängigen Analyselabor per HPLC-Analyse geprüft.";
      } else if (cert.id === "gmp-aligned-process") {
        name = "GMP-konforme Prozesskontrollen";
        description = "Unsere Produktionspartner folgen Good Manufacturing Practice-konformen Kontrollen.";
      } else if (cert.id === "cold-chain-certified") {
        name = "Zertifizierter Kühlketten-Versand";
        description = "Unsere Logistikpartner sind für die Einhaltung der Kühlkette zertifiziert.";
      }
    }
    return { ...cert, name, description, issuer };
  });

  const localizedDisclaimer = locale === "de"
    ? "Alle von Wardiere gelieferten Produkte werden nach strengsten pharmazeutischen und analytischen Qualitätsstandards hergestellt. Spezifische Laborwirkstoffe sind für wissenschaftliche Forschungs- und Testzwecke vorgesehen, während Gewichtsmanagement- und Wellness-Präparate gemäß der jeweiligen Produktkennzeichnung und den entsprechenden Richtlinien anzuwenden sind."
    : RESEARCH_USE_DISCLAIMER;

  return (
    <>
      <PageHeader
        title={locale === "de" ? "Forschungs- & Qualitätsstandards" : "Research & Quality Standards"}
        description={locale === "de" ? "Wie wir jede von uns versandte Charge verifizieren, dokumentieren und konservieren." : "How we verify, document, and preserve every batch we ship."}
        crumbs={[{ label: locale === "de" ? "Forschung" : "Research" }]}
      />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <section id="quality" className="scroll-mt-24">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{locale === "de" ? "Qualitätsstandards" : "Quality Standards"}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {locale === "de" ? (
                "Jede von uns freigegebene Charge wird vor der Auslieferung einer unabhängigen Überprüfung durch Dritte mittels Hochleistungsflüssigkeitschromatographie (HPLC) und Massenspektrometrie unterzogen. Unsere Produktionspartner halten GMP-konforme Prozesskontrollen ein, und unsere Logistik arbeitet nach ISO 9001-konformen Qualitätsmanagementverfahren. Die Ergebnisse werden nicht selbst deklariert – jedes Analysezertifikat wird von einem unabhängigen Analyselabor ausgestellt, das kein finanzielles Interesse am Ergebnis hat."
              ) : (
                "Every batch we release undergoes independent third-party verification via high-performance liquid chromatography (HPLC) and mass spectrometry prior to fulfillment. Our manufacturing partners follow GMP-aligned process controls, and our fulfillment facility operates under ISO 9001-aligned quality management practices. Results are not self-reported — each certificate of analysis is issued by an independent analytical laboratory with no financial interest in the outcome."
              )}
            </p>
          </Reveal>
        </section>

        <section id="certificates" className="mt-16 scroll-mt-24">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{locale === "de" ? "Analysezertifikate (CoA)" : "Certificates of Analysis"}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {locale === "de" ? (
                "Jede Produktseite enthält einen Link zum Herunterladen des Analysezertifikats für die entsprechende Charge. Die Zertifikate enthalten Chromatogramme, den Reinheitsprozentsatz, die Bestätigung der molekularen Identität und Chargennummern für eine lückenlose Rückverfolgbarkeit."
              ) : (
                "Every product page includes a link to download the certificate of analysis for that batch. Certificates include chromatography traces, purity percentage, molecular identity confirmation, and batch numbers for full traceability."
              )}
            </p>
          </Reveal>
          <RevealGroup className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {localizedCertificates.map((certificate) => (
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
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{locale === "de" ? "Lagerungsrichtlinien" : "Storage Guidelines"}</h2>
          </Reveal>
          <RevealGroup className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <RevealItem className="flex gap-3 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
              <Snowflake className="size-5 shrink-0 text-primary" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">{locale === "de" ? "Lagerung als Lyophilisat (Pulver)" : "Lyophilized (Powder) Storage"}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {locale === "de" ? (
                    "Bis zur Rekonstitution bei -20 °C lagern. Vor Licht und wiederholten Einfrier-Auftau-Zyklen schützen, um die Peptidintegrität zu bewahren."
                  ) : (
                    "Store at -20°C until reconstitution. Protect from light and repeated freeze-thaw cycles to preserve peptide integrity."
                  )}
                </p>
              </div>
            </RevealItem>
            <RevealItem className="flex gap-3 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
              <ThermometerSnowflake className="size-5 shrink-0 text-primary" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">{locale === "de" ? "Nach der Rekonstitution" : "After Reconstitution"}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {locale === "de" ? (
                    "Die meisten rekonstituierten Verbindungen sollten bei 2–8 °C gelagert und innerhalb des im Produktspezifikationsblatt angegebenen Zeitraums verwendet werden."
                  ) : (
                    "Most reconstituted compounds should be stored at 2–8°C and used within the timeframe listed on the product specification sheet."
                  )}
                </p>
              </div>
            </RevealItem>
          </RevealGroup>
        </section>

        <section id="disclaimer" className="mt-16 scroll-mt-24 rounded-xl border border-border bg-muted/40 p-6">
          <Reveal>
            <h2 className="text-lg font-semibold text-foreground">{locale === "de" ? "Qualitäts- & Produktrichtlinien" : "Product Guidelines & Compliance"}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{localizedDisclaimer}</p>
          </Reveal>
        </section>
      </div>
    </>
  );
}
