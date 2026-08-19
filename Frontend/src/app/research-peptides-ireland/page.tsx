import type { Metadata } from "next";
import { ShieldCheck, Truck, Snowflake, HelpCircle, FileText } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getServerLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const title = locale === "de" ? "Forschungspeptide Irland & EU Lieferant" : "Research Peptides Ireland & EU Supplier";
  const description = locale === "de"
    ? "Zuverlässiger Versand von hochreinen Forschungspeptiden nach Irland und in die EU. Inklusive Kühlkettenverpackung, HPLC-Analysen und vollständiger Dokumentation."
    : "Reliable shipping of high-purity research peptides to Ireland and the EU. Includes cold-chain packaging, HPLC verification, and full batch documentation.";
  return { title, description };
}

export default async function IrelandSupplierPage() {
  const locale = await getServerLocale();

  const titleText = locale === "de" ? "Forschungspeptide Irland & EU Lieferant" : "Research Peptides Ireland & EU Supplier";
  const descText = locale === "de"
    ? "Qualitätssicherung, temperaturkontrollierte Logistik und Dokumentationsstandards für die irische und europäische Wissenschaft."
    : "Quality assurance, temperature-controlled logistics, and documentation standards for Irish and European science.";

  const content = {
    intro: {
      title: locale === "de" ? "Forschungskonforme Beschaffung" : "Research-Compliant Sourcing",
      p1: locale === "de"
        ? "Wardiere Peptide Sciences beliefert akademische Einrichtungen, Pharmaunternehmen und klinische Forschungslabors in ganz Irland und der Europäischen Union mit hochreinen Forschungspeptiden. Da biologische Assays reproduzierbare Ergebnisse verlangen, bieten wir lückenlose Dokumentation und temperatursichere Logistik."
        : "Wardiere Peptide Sciences supplies academic institutions, pharmaceutical firms, and clinical research laboratories across Ireland and the European Union with high-purity research peptides. Because biological assays demand reproducible results, we offer complete documentation and temperature-secure logistics.",
      p2: locale === "de"
        ? "Alle Lieferungen in die Republik Irland und die EU erfolgen direkt aus unserem Logistiknetzwerk unter Einhaltung strenger Qualitätsmanagement-Richtlinien."
        : "All deliveries to the Republic of Ireland and the wider EU are dispatched from our logistics network in compliance with strict quality management guidelines."
    },
    doc: {
      title: locale === "de" ? "Analytische Dokumentation" : "Analytical Documentation",
      p1: locale === "de"
        ? "Wir überlassen Qualität nicht dem Zufall. Jede Charge wird unabhängig per HPLC (Hochleistungsflüssigkeitschromatographie) und Massenspektrometrie verifiziert. Sie können das batchspezifische Analysezertifikat (CoA) direkt auf der Produktseite einsehen und herunterladen."
        : "We do not leave quality to chance. Every batch undergoes independent HPLC and mass spectrometry verification. You can review and download the batch-specific Certificate of Analysis (CoA) directly on the product detail page."
    },
    shipping: {
      title: locale === "de" ? "Kühlketten-Logistik & Versand nach Irland" : "Cold-Chain Logistics & Ireland Shipping",
      p1: locale === "de"
        ? "Da viele Peptide temperaturempfindlich sind, werden Bestellungen nach Irland in isolierten Thermo-Boxen mit gefrorenen Gelpacks versendet. Die Laufzeit aus unserem Lager nach Dublin, Cork, Galway oder Belfast beträgt in der Regel 5–10 Werktage."
        : "Because many peptides are temperature-sensitive, orders to Ireland ship in insulated thermal containers with frozen gel packs. The transit time from our facility to Dublin, Cork, Galway, or Belfast is typically 5–10 business days.",
      p2: locale === "de"
        ? "Als Importe in die Republik Irland unterliegen Sendungen der Einfuhrumsatzsteuer (VAT) und eventuellen Zollgebühren, die vom Transportdienstleister bei der Zustellung erhoben werden. Wir deklarieren alle Sendungen ordnungsgemäß als Laborchemikalien für Forschungszwecke."
        : "As imports into the Republic of Ireland, shipments are subject to import VAT and potential customs duties assessed by customs authorities on delivery. We declare all shipments transparently as laboratory reagents for research use only."
    },
    storage: {
      title: locale === "de" ? "Richtige Lagerung nach Ankunft" : "Proper Storage on Arrival",
      p1: locale === "de"
        ? "Um die Integrität der Peptide zu bewahren, lagern Sie das erhaltene Lyophilisat (Pulver) bei -20 °C. Nach der Rekonstitution sollten die gelösten Peptide bei 2–8 °C aufbewahrt und innerhalb des im Spezifikationsblatt angegebenen Zeitraums verwendet werden."
        : "To preserve peptide integrity, store the received lyophilized powder at -20°C. Once reconstituted, the liquid compound should be stored at 2–8°C and used within the timeframe listed on the specifications."
    },
    faqs: [
      {
        q: locale === "de" ? "Sind die Peptide für den therapeutischen Einsatz zugelassen?" : "Are these peptides approved for therapeutic use?",
        a: locale === "de"
          ? "Nein. Alle Produkte von Wardiere sind ausschließlich für In-vitro-Laboruntersuchungen und Forschungszwecke bestimmt. Sie sind nicht für den menschlichen oder tierischen Verzehr, Diagnostik oder medizinische Zwecke zugelassen."
          : "No. All Wardiere products are intended strictly for in-vitro laboratory research and chemical analysis. They are not approved for human or animal consumption, diagnostic, or therapeutic use."
      },
      {
        q: locale === "de" ? "Wie hoch sind die Versandkosten nach Irland?" : "What are the shipping costs to Ireland?",
        a: locale === "de"
          ? "Die Versandkosten werden an der Kasse basierend auf Gewicht und Lieferadresse berechnet. Alle Lieferungen beinhalten die notwendige Kühlketten-Isolierung."
          : "Shipping rates are calculated at checkout based on package weight and delivery address. All shipments include the necessary cold-chain insulation safeguards."
      },
      {
        q: locale === "de" ? "Kann ich eine Großbestellung für meine Universität anfragen?" : "Can I request bulk orders for my university laboratory?",
        a: locale === "de"
          ? "Ja. Für akademische Labore und Großbestellungen bieten wir flexible Angebote und institutionelle Rabatte an. Nutzen Sie dazu unser Kontaktformular oder schreiben Sie an sales@wardierepeptidesciences.com."
          : "Yes. We offer institutional quotes and volume pricing for academic laboratories and research centers. Please submit a request via our Contact page or email sales@wardierepeptidesciences.com."
      }
    ]
  };

  return (
    <>
      <PageHeader
        title={titleText}
        description={descText}
        crumbs={[{ label: locale === "de" ? "Irland-Support" : "Ireland Support" }]}
      />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <RevealGroup className="flex flex-col gap-12">
          {/* Section 1: Intro */}
          <RevealItem className="flex gap-4">
            <ShieldCheck className="size-6 shrink-0 text-primary mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">{content.intro.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{content.intro.p1}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{content.intro.p2}</p>
            </div>
          </RevealItem>

          {/* Section 2: Quality */}
          <RevealItem className="flex gap-4">
            <FileText className="size-6 shrink-0 text-primary mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">{content.doc.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{content.doc.p1}</p>
            </div>
          </RevealItem>

          {/* Section 3: Shipping */}
          <RevealItem className="flex gap-4">
            <Truck className="size-6 shrink-0 text-primary mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">{content.shipping.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{content.shipping.p1}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{content.shipping.p2}</p>
            </div>
          </RevealItem>

          {/* Section 4: Storage */}
          <RevealItem className="flex gap-4">
            <Snowflake className="size-6 shrink-0 text-primary mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">{content.storage.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{content.storage.p1}</p>
            </div>
          </RevealItem>

          {/* Section 5: FAQs */}
          <RevealItem className="border-t border-border pt-12">
            <div className="flex gap-2 items-center mb-6">
              <HelpCircle className="size-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                {locale === "de" ? "Häufig gestellte Fragen" : "Frequently Asked Questions"}
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
      </div>
    </>
  );
}
