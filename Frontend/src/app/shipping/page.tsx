import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getServerLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const title = locale === "de" ? "Versandbedingungen & Isolierung" : "Shipping Policy & Packaging";
  const description = locale === "de"
    ? "Informationen zu Kühlketten-Versand, diskreter Verpackung, Lieferzeiten und internationalem Versand von Wardiere."
    : "Details on cold-chain shipping, discreet packaging, delivery timelines, and international transit from Wardiere.";
  return { title, description };
}

export default async function ShippingPage() {
  const locale = await getServerLocale();

  const titleText = locale === "de" ? "Versandbedingungen & Verpackung" : "Shipping & Packaging Policy";
  const crumbsLabel = locale === "de" ? "Versand" : "Shipping";

  return (
    <>
      <PageHeader title={titleText} crumbs={[{ label: crumbsLabel }]} />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <RevealGroup className="flex flex-col gap-8 text-sm leading-relaxed text-muted-foreground">
          {/* Cold chain */}
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">
              {locale === "de" ? "Kühlketten-Logistik" : "Cold-Chain Fulfillment"}
            </h2>
            <p>
              {locale === "de" ? (
                "Temperaturempfindliche Peptide werden mit speziellen Kühlakkus (Gel-Packs) oder Trockeneis in isolierten Thermo-Boxen versendet. Dies schützt die Struktur der Verbindungen während des Transports zuverlässig. Die Verpackung wird automatisch anhand des Inhalts und des Bestimmungsorts ausgewählt."
              ) : (
                "Temperature-sensitive orders ship with gel packs or dry ice inside insulated packaging to maintain product integrity in transit. Packaging is selected automatically based on your order contents and destination."
              )}
            </p>
          </RevealItem>

          {/* Privacy packaging */}
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">
              {locale === "de" ? "Diskrete & Sichere Verpackung" : "Secure & Discreet Packaging"}
            </h2>
            <p>
              {locale === "de" ? (
                "Um die Privatsphäre und die Sicherheit Ihrer Forschung zu schützen, versenden wir alle Bestellungen in neutralen, unbeschrifteten Kartons ohne direkten Hinweis auf Peptide. Die Ampullen sind im Inneren doppelt versiegelt und stoßgeschützt verpackt."
              ) : (
                "To protect your privacy and ensure the security of your laboratory procurement, all orders are dispatched in unmarked, neutral boxes with no external mention of peptides. The vials inside are double-sealed and shock-protected."
              )}
            </p>
          </RevealItem>

          {/* Delivery Timelines */}
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">
              {locale === "de" ? "Lieferfristen & Versand" : "Delivery Timelines"}
            </h2>
            <p>
              {locale === "de" ? (
                "Bestellungen, die vor 14:00 Uhr eingehen, werden noch am selben Werktag bearbeitet. Sendungen innerhalb Deutschlands und Zentraleuropas kommen in der Regel innerhalb von 1–3 Werktagen per Express-Kurier an. Internationale Sendungen dauern je nach Zollabwicklung 5–10 Werktage."
              ) : (
                "Orders placed before 2:00 PM EST ship the same business day. Central European orders typically arrive within 1–3 business days via tracked overnight or express courier. International shipments arrive within 5–10 business days depending on customs processing."
              )}
            </p>
          </RevealItem>

          {/* Shipping Rates */}
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">
              {locale === "de" ? "Versandkosten" : "Shipping Rates"}
            </h2>
            <p>
              {locale === "de" ? (
                "Die Standardversandkosten werden an der Kasse basierend auf Gewicht und Lieferadresse berechnet. Ab einem Bestellwert von 150 € bieten wir kostenlosen Standardversand an."
              ) : (
                "Standard shipping is calculated at checkout based on order weight and destination. Orders over €150 qualify for free standard shipping."
              )}
            </p>
          </RevealItem>

          {/* International Orders */}
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">
              {locale === "de" ? "Internationaler Versand" : "International Orders"}
            </h2>
            <p>
              {locale === "de" ? (
                "Wir liefern in 42 Länder weltweit. Internationale Empfänger sind für eventuell anfallende Zölle, Einfuhrsteuern oder Gebühren verantwortlich, die von den örtlichen Behörden bei der Einfuhr erhoben werden."
              ) : (
                "We ship to 42 countries. International customers are responsible for any customs duties, import taxes, or fees assessed by their local authorities upon arrival."
              )}
            </p>
          </RevealItem>

          {/* Shipping to EU & Exceptions */}
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">
              {locale === "de" ? "Versand innerhalb der Europäischen Union & Ausnahmen" : "Shipping to the European Union & Exceptions"}
            </h2>
            <p>
              {locale === "de" ? (
                "EU-Bestellungen kommen per Kurierdienst an und sind durchgängig isoliert. Bei Lieferverzögerungen oder Zollprüfungen kann sich die Lieferzeit verlängern. Sollte eine temperaturempfindliche Sendung aufgrund von Zollverzögerungen beschädigt ankommen, kontaktieren Sie bitte unverzüglich unseren Support für eine Ersatzlieferung."
              ) : (
                "EU orders typically arrive within 5–10 business days via tracked international courier, cold-chain packed. If transport delays or customs audits occur, delivery estimates might be extended. In the rare event of a temperature-sensitive batch compromise due to shipping exceptions, please contact our support team immediately for a resolution."
              )}
            </p>
          </RevealItem>
        </RevealGroup>
      </div>
    </>
  );
}
