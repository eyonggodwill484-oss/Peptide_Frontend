import type { Metadata } from "next";
import { ShieldCheck, HelpCircle, FileText, BadgeCheck } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getServerLocale } from "@/lib/i18n";
import { QaRequestForm } from "./qa-request-form";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const title = locale === "de" ? "Qualitätsdokumentation & Chargenberichte" : "Quality Documentation & Batch Reports";
  const description = locale === "de"
    ? "Fordern Sie chargenspezifische Analysezertifikate (CoA) für Ihre Forschungspeptide an. HPLC- und massenspektrometrische Verifizierungsberichte."
    : "Request batch-specific Certificates of Analysis (CoA) for your research compounds. Access HPLC and mass spectrometry verification reports.";
  return { title, description };
}

export default async function QualityDocumentationPage() {
  const locale = await getServerLocale();

  const titleText = locale === "de" ? "Qualitätsdokumentation & Berichte" : "Quality Documentation & Reports";
  const descText = locale === "de"
    ? "Unabhängige analytische Prüfungen und Analysezertifikate für Ihre biologische Forschung."
    : "Independent analytical verification and Certificates of Analysis for your biological research.";

  const content = {
    overview: {
      title: locale === "de" ? "Qualitätssicherungs-Standard" : "Quality Assurance Standards",
      p1: locale === "de"
        ? "Wardiere Peptide Sciences arbeitet ausschließlich mit GMP-konformen Herstellern zusammen. Jede produzierte Charge wird unabhängig per HPLC (Reinheitsbestimmung) und Massenspektrometrie (Identitätsnachweis) analysiert. Die Ergebnisse werden in einem Analysezertifikat (CoA) dokumentiert."
        : "Wardiere Peptide Sciences partners strictly with GMP-aligned manufacturing facilities. Every production batch is independently analyzed via HPLC (purity confirmation) and mass spectrometry (identity confirmation). The verified results are documented in a Certificate of Analysis (CoA).",
      p2: locale === "de"
        ? "Diese analytischen Daten stellen sicher, dass Ihre Forschung mit Verbindungen durchgeführt wird, die den exakten Konzentrations- und Reinheitsspezifikationen entsprechen."
        : "This analytical data ensures that your laboratory assays are conducted using compounds that match exact concentration and purity specifications."
    },
    methods: {
      title: locale === "de" ? "Analysemethoden erklärt" : "Analytical Methods Explained",
      hplcTitle: locale === "de" ? "HPLC (Flüssigkeitschromatographie)" : "HPLC (Liquid Chromatography)",
      hplcDesc: locale === "de"
        ? "Wird verwendet, um die exakte Reinheit der Peptidverbindung zu messen. Jedes unserer Produkte weist eine garantierte Reinheit von über 98% auf, oft sogar über 99%."
        : "Used to separate, identify, and quantify each component in a compound. Our peptides maintain a verified purity rating exceeding 98% (often 99%+).",
      msTitle: locale === "de" ? "Massenspektometrie (MS)" : "Mass Spectrometry (MS)",
      msDesc: locale === "de"
        ? "Bestätigt die molekulare Identität der chemischen Struktur anhand ihres Masse-zu-Ladung-Verhältnisses, um Verunreinigungen auszuschließen."
        : "Confirms the molecular identity of the synthesized chemical structure based on mass-to-charge ratios, eliminating batch mismatch risk."
    },
    faqs: [
      {
        q: locale === "de" ? "Wo finde ich das Analysezertifikat (CoA)?" : "Where can I find the Certificate of Analysis (CoA)?",
        a: locale === "de"
          ? "Ein Link zum Herunterladen des entsprechenden COAs befindet sich auf der jeweiligen Produktseite. Wenn Sie eine ältere Charge haben, können Sie das Zertifikat über das Formular auf dieser Seite anfordern."
          : "A link to download the relevant CoA is available directly on each product detail page. For older batches or specific requests, submit a query via the request form below."
      },
      {
        q: locale === "de" ? "Warum sind COAs für die Forschung wichtig?" : "Why are CoAs critical for research studies?",
        a: locale === "de"
          ? "Unverifizierte Peptide können Verunreinigungen oder falsche Konzentrationen aufweisen, was biologische Assays verfälscht. COAs bieten den dokumentierten Nachweis der Chargenpräzision."
          : "Unverified compounds can introduce cellular toxicity or incorrect molar inputs, invalidating assays. CoAs provide peer-reviewable verification of batch precision."
      }
    ]
  };

  return (
    <>
      <PageHeader
        title={titleText}
        description={descText}
        crumbs={[{ label: locale === "de" ? "Dokumentation" : "Documentation" }]}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] items-start">
          {/* Main Content */}
          <RevealGroup className="flex flex-col gap-10">
            {/* Overview */}
            <RevealItem className="flex gap-4">
              <ShieldCheck className="size-6 shrink-0 text-primary mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-foreground">{content.overview.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{content.overview.p1}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{content.overview.p2}</p>
              </div>
            </RevealItem>

            {/* Methods */}
            <RevealItem className="flex gap-4">
              <FileText className="size-6 shrink-0 text-primary mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-foreground">{content.methods.title}</h2>
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="rounded-xl bg-card p-5 ring-1 ring-border shadow-sm">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      <BadgeCheck className="size-4 text-emerald-600" />
                      {content.methods.hplcTitle}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{content.methods.hplcDesc}</p>
                  </div>
                  <div className="rounded-xl bg-card p-5 ring-1 ring-border shadow-sm">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      <BadgeCheck className="size-4 text-emerald-600" />
                      {content.methods.msTitle}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{content.methods.msDesc}</p>
                  </div>
                </div>
              </div>
            </RevealItem>

            {/* FAQs */}
            <RevealItem className="border-t border-border pt-10">
              <div className="flex gap-2 items-center mb-6">
                <HelpCircle className="size-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  {locale === "de" ? "Fragen zur Qualitätssicherung" : "QA Frequently Asked Questions"}
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                {content.faqs.map((faq, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-semibold text-foreground">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </RevealItem>
          </RevealGroup>

          {/* Sidebar Request Form */}
          <Reveal delay={0.1}>
            <QaRequestForm />
          </Reveal>
        </div>
      </div>
    </>
  );
}
