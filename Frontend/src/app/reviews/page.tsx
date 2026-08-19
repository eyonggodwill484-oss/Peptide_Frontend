import type { Metadata } from "next";
import { Star, ShieldCheck, CheckCircle2 } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getServerLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const title = locale === "de" ? "Kundenberichte & Labor-Feedback" : "Customer Reviews & Laboratory Feedback";
  const description = locale === "de"
    ? "Verifizierte Rückmeldungen von akkreditierten europäischen und internationalen Labors zur Qualität, Reinheit und Liefergeschwindigkeit unserer Forschungspeptide."
    : "Verified feedback from accredited European and international laboratories regarding the quality, purity, and shipping reliability of our research-grade peptides.";
  return { title, description };
}

interface Testimonial {
  id: string;
  author: string;
  role: { de: string; en: string };
  institution: string;
  rating: number;
  text: { de: string; en: string };
  date: string;
  tags: string[];
}

const REVIEWS: Testimonial[] = [
  {
    id: "rev-1",
    author: "Dr. Hannah Reinhardt",
    role: { de: "Hauptforscherin für Endokrinologie", en: "Lead Endocrinological Researcher" },
    institution: "München BioLabs",
    rating: 5,
    text: {
      de: "Die Chargenkonsistenz von Wardiere ist bemerkenswert. Die HPLC-Analysen stimmen exakt mit den mitgelieferten COAs überein. Für unsere In-vitro-Studien ist diese Reinheit unverzichtbar.",
      en: "The batch consistency of Wardiere's compounds is remarkable. The HPLC analyses match the supplied COAs precisely. For our in-vitro studies, this level of purity is indispensable."
    },
    date: "2026-08-02",
    tags: ["Purity Verified", "HPLC"]
  },
  {
    id: "rev-2",
    author: "Liam O'Connor",
    role: { de: "Leiter der Zellbiologie", en: "Director of Cell Biology" },
    institution: "Dublin Biotech Research",
    rating: 5,
    text: {
      de: "Wir haben Tirzepatid für ein Rezeptor-Forschungsprojekt bestellt. Die Lieferung per Kühlkette nach Irland verlief reibungslos, hervorragend isoliert und temperaturstabil.",
      en: "We ordered Tirzepatide for a receptor-mapping project. The cold-chain delivery to Ireland was seamless, exceptionally well-insulated, and arrived temperature-stable."
    },
    date: "2026-07-28",
    tags: ["Ireland Shipping", "Cold-Chain"]
  },
  {
    id: "rev-3",
    author: "Prof. Dr. Stefan Meier",
    role: { de: "Professor für Biochemie", en: "Professor of Biochemistry" },
    institution: "Heidelberg BioSciences",
    rating: 5,
    text: {
      de: "Der Support durch das wissenschaftliche Team ist herausragend. Unsere Fragen zur Peptid-Rekonstitution wurden innerhalb von zwei Stunden fachlich fundiert beantwortet.",
      en: "The support from the scientific team is outstanding. Our questions regarding peptide reconstitution were answered professionally within two hours."
    },
    date: "2026-07-15",
    tags: ["Customer Support", "Technical Response"]
  },
  {
    id: "rev-4",
    author: "Sarah Jenkins",
    role: { de: "Labor-Managerin", en: "Laboratory Operations Manager" },
    institution: "Cambridge Peptide Labs",
    rating: 5,
    text: {
      de: "Doppelt versiegelte, absolut neutrale Verpackung. Schneller, unkomplizierter Versand und lückenlose Chargenrückverfolgbarkeit. Ein verlässlicher Partner für institutionelle Labore.",
      en: "Double-sealed, completely neutral packaging. Fast shipping and full batch traceability. A highly reliable partner for institutional laboratories."
    },
    date: "2026-06-30",
    tags: ["Discreet Packaging", "Traceability"]
  },
  {
    id: "rev-5",
    author: "Dr. Marc Dubois",
    role: { de: "Senior Analytiker", en: "Senior Analytical Chemist" },
    institution: "Sorbonne Research Centre",
    rating: 5,
    text: {
      de: "Dass jede Charge mit unabhängigen Chromatogrammen geliefert wird, spart uns interne Verifizierungszeit. Die Qualitätsergebnisse sprechen für sich.",
      en: "Having every batch delivered with independent chromatograms saves us internal verification time. The quality outcomes speak for themselves."
    },
    date: "2026-06-12",
    tags: ["HPLC Verifiziert", "COA Documentation"]
  },
  {
    id: "rev-6",
    author: "Dr. Elena Gatti",
    role: { de: "Neurowissenschaftlerin", en: "Neuroscience Researcher" },
    institution: "Milan Neuro-Lab",
    rating: 5,
    text: {
      de: "Hocheffektiver overnight Versand. Die Kühlakkus waren bei der Ankunft noch gefroren. Die Peptidqualität hat unsere Erwartungen bei Zellkulturversuchen übertroffen.",
      en: "Highly effective overnight shipping. The gel packs were still frozen upon arrival. The peptide quality exceeded our expectations during cell culture assays."
    },
    date: "2026-05-24",
    tags: ["Fast Delivery", "Assay Quality"]
  }
];

export default async function ReviewsPage() {
  const locale = await getServerLocale();

  const titleText = locale === "de" ? "Laborberichte & Kundenfeedback" : "Laboratory Reviews & Feedback";
  const descText = locale === "de"
    ? "Verifiziertes Feedback von akkreditierten Instituten zur chemischen Präzision und logistischen Zuverlässigkeit von Wardiere."
    : "Verified feedback from accredited institutions regarding the chemical precision and logistical reliability of Wardiere.";

  return (
    <>
      <PageHeader
        title={titleText}
        description={descText}
        crumbs={[{ label: locale === "de" ? "Kundenberichte" : "Reviews" }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Aggregated Score Summary */}
        <div className="mb-16 rounded-2xl bg-muted/40 p-8 ring-1 ring-border">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:divide-x md:divide-border">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-bold text-foreground">4.9</span>
              <div className="mt-2 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="mt-2 text-sm text-muted-foreground">
                {locale === "de" ? "Gesamtbewertung (Laborberichte)" : "Overall Rating (Lab Feedback)"}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center px-4 text-center">
              <span className="text-3xl font-semibold text-foreground">100%</span>
              <span className="mt-2 flex items-emerald-600 gap-1 text-sm font-medium">
                <CheckCircle2 className="size-4" />
                {locale === "de" ? "Reinheitsgeprüft" : "Purity Compliant"}
              </span>
              <span className="mt-1 text-sm text-muted-foreground">
                {locale === "de" ? "Alle Chargen drittanbieter-verifiziert" : "All batches third-party verified"}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-semibold text-foreground">51</span>
              <span className="mt-2 flex items-center gap-1 text-sm font-medium text-primary">
                <ShieldCheck className="size-4" />
                {locale === "de" ? "Akkreditierte Partner" : "Accredited Partners"}
              </span>
              <span className="mt-1 text-sm text-muted-foreground">
                {locale === "de" ? "Einreichungen aus europäischen Forschungszentren" : "Submissions from European research centers"}
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <RevealItem
              key={review.id}
              className="flex flex-col rounded-xl bg-card p-6 shadow-sm ring-1 ring-foreground/10 transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(review.date).toLocaleDateString(locale === "de" ? "de-DE" : "en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{locale === "de" ? review.text.de : review.text.en}&rdquo;
              </p>

              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">{review.author}</p>
                <p className="text-xs text-muted-foreground">
                  {locale === "de" ? review.role.de : review.role.en}
                </p>
                <p className="mt-0.5 text-xs font-medium text-primary">{review.institution}</p>
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {review.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </>
  );
}
