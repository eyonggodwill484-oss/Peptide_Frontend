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
                "Bestellungen, die vor 14:00 Uhr MEZ eingehen und bezahlt werden, werden noch am selben Werktag aus unserem Distributionszentrum in München versendet. Express-Sendungen innerhalb Deutschlands und Zentraleuropas werden im 24h-Kühlketten-Verfahren zugestellt. Standard-Lieferungen dauern 3–4 Werktage. Internationale Sendungen dauern je nach Land und Zollabwicklung 5–8 Werktage."
              ) : (
                "Orders placed and confirmed before 2:00 PM CET dispatch the same business day directly from our logistics hub in Munich, Germany. Express 24-Hour shipments within Germany and Central Europe arrive next-day under active temperature control. Standard deliveries arrive in 3–4 business days, and international shipments arrive in 5–8 business days."
              )}
            </p>
          </RevealItem>

          {/* Shipping Rates */}
          <RevealItem as="section">
            <h2 className="mb-2 text-base font-semibold text-foreground">
              {locale === "de" ? "Versandoptionen & Tarife" : "Shipping Options & Rates"}
            </h2>
            <p>
              {locale === "de" ? (
                "Wir bieten 3 transparente Versandstufen an der Kasse: Express 24h Priority mit Kühlkettenverpackung (90,00 €), Standardversand 3–4 Werktage (45,00 €) und Internationaler Priority-Versand (75,00 €). Der Mindestbestellwert im Shop beträgt 200,00 €."
              ) : (
                "We provide 3 transparent fulfillment tiers at checkout: Express 24-Hour Cold-Chain Delivery (€90.00), Standard Tracked Courier in 3–4 days (€45.00), and International Priority Shipping (€75.00). A storewide minimum order of €200.00 applies to guarantee temperature-controlled packaging integrity."
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
