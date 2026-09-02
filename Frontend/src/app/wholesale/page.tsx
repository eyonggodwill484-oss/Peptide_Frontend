import type { Metadata } from "next";
import Link from "@/components/ui/localized-link";
import { 
  Building2, 
  FlaskConical, 
  ShieldCheck, 
  Truck, 
  FileText, 
  Mail, 
  Phone, 
  Sparkles, 
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Clock,
  Layers
} from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { getServerLocale } from "@/lib/i18n";
import { CONTACT_EMAIL, CONTACT_PHONE, COMPANY_ADDRESS } from "@/constants/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const title = locale === "de" 
    ? "Großhandel & B2B Peptid-Lieferung | Wardiere Peptide Sciences" 
    : "Bulk Wholesale & B2B Peptides | Wardiere Peptide Sciences";
  const description = locale === "de"
    ? "Exklusive Mengenrabatte und B2B-Konditionen für Universitäten, Forschungsinstitute und Labore. Geprüfte HPLC-Qualität aus München mit Kühlkettenversand."
    : "Exclusive volume discounts and institutional procurement for universities, research facilities, and clinical laboratories. Munich fulfillment with verified CoA.";
  return { title, description };
}

export default async function WholesalePage() {
  const locale = await getServerLocale();
  const isDe = locale === "de";

  const titleText = isDe ? "Großhandel & Institutionelle B2B-Konditionen" : "Bulk Wholesale & Institutional Supply";
  const crumbsLabel = isDe ? "Großhandel" : "Wholesale";

  return (
    <>
      <PageHeader 
        title={titleText} 
        crumbs={[{ label: crumbsLabel }]} 
        description={isDe 
          ? "Mengenrabatte, kundenspezifische Chargensynthesen und priorisierter Kühlketten-Versand für akkreditierte Forschungslabore und Institute." 
          : "Tiered volume discounts, custom batch synthesis, and priority cold-chain logistics for accredited research laboratories and institutions."
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top Banner / Trust Bar */}
        <Reveal>
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-brand-dark/5 to-muted/40 p-6 sm:p-8 mb-12 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary">
                  <Building2 className="size-3.5" />
                  <span>{isDe ? "Offizieller B2B-Lieferant für Forschung & Industrie" : "Official B2B Research Supplier"}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {isDe ? "Sparen Sie bis zu 35% bei Labor-Großbestellungen" : "Save up to 35% on Institutional Bulk Procurement"}
                </h2>
                <p className="text-sm text-muted-foreground max-w-2xl">
                  {isDe
                    ? "Wir beliefern europäische Universitäten, pharmazeutische Labore und biowissenschaftliche Forschungseinrichtungen direkt aus unserem Distributionszentrum in München."
                    : "We supply European universities, pharmaceutical facilities, and life-science research teams directly from our Munich fulfillment hub."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Button size="lg" asChild className="gap-2 shadow-md">
                  <a href="#quote-form">
                    <Mail className="size-4" />
                    <span>{isDe ? "B2B-Angebot anfordern" : "Request Bulk Quote"}</span>
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="gap-2">
                  <Link href="/shop">
                    <span>{isDe ? "Katalog ansehen" : "Browse Catalog"}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4 Volume Pricing Tiers */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-foreground">
              {isDe ? "Transparente Mengenrabatt-Staffelung" : "Transparent Volume Pricing Tiers"}
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              {isDe
                ? "Rabatte werden im Warenkorb automatisch ab der jeweiligen Mindestmenge pro Artikel oder im Mischsortiment angewendet."
                : "Volume discounts apply automatically at checkout when reaching unit thresholds per compound or mixed line orders."}
            </p>
          </div>

          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tier 1 */}
            <RevealItem className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  {isDe ? "Starter Pack" : "Starter Lab Pack"}
                </div>
                <div className="text-3xl font-extrabold text-foreground mb-1">
                  5 – 9 <span className="text-base font-normal text-muted-foreground">{isDe ? "Ampullen" : "Vials"}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 text-xs font-bold mb-4">
                  <TrendingDown className="size-3.5" />
                  <span>10% {isDe ? "Rabatt" : "Discount"}</span>
                </div>
                <ul className="space-y-2.5 text-xs text-muted-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>{isDe ? "Automatischer Rabatt im Checkout" : "Automatic checkout discount"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>{isDe ? "Standard HPLC Analysezertifikat (CoA)" : "Standard HPLC Certificate of Analysis"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>{isDe ? "Kühlketten-Versand aus München" : "Cold-chain dispatch from Munich"}</span>
                  </li>
                </ul>
              </div>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link href="/shop">{isDe ? "Produkte wählen" : "Select Products"}</Link>
              </Button>
            </RevealItem>

            {/* Tier 2 */}
            <RevealItem className="rounded-2xl border border-primary/40 bg-card p-6 flex flex-col justify-between shadow-md relative ring-1 ring-primary/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                {isDe ? "Beliebteste Staffel" : "Most Popular"}
              </div>
              <div>
                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  {isDe ? "Research Batch" : "Research Batch"}
                </div>
                <div className="text-3xl font-extrabold text-foreground mb-1">
                  10 – 24 <span className="text-base font-normal text-muted-foreground">{isDe ? "Ampullen" : "Vials"}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 text-xs font-bold mb-4">
                  <TrendingDown className="size-3.5" />
                  <span>20% {isDe ? "Rabatt" : "Discount"}</span>
                </div>
                <ul className="space-y-2.5 text-xs text-muted-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>{isDe ? "20% Direktrabatt auf alle Vials" : "20% direct discount across all vials"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>{isDe ? "Kostenloser DHL Express Versand" : "Free DHL Express priority shipping"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>{isDe ? "Chargen-spezifische MS/HPLC Berichte" : "Batch-specific MS & HPLC reports"}</span>
                  </li>
                </ul>
              </div>
              <Button size="sm" asChild className="w-full">
                <Link href="/shop">{isDe ? "Bestellung zusammenstellen" : "Build Order"}</Link>
              </Button>
            </RevealItem>

            {/* Tier 3 */}
            <RevealItem className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  {isDe ? "Institutional Supply" : "Institutional Supply"}
                </div>
                <div className="text-3xl font-extrabold text-foreground mb-1">
                  25 – 49 <span className="text-base font-normal text-muted-foreground">{isDe ? "Ampullen" : "Vials"}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 text-xs font-bold mb-4">
                  <TrendingDown className="size-3.5" />
                  <span>30% {isDe ? "Rabatt" : "Discount"}</span>
                </div>
                <ul className="space-y-2.5 text-xs text-muted-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>{isDe ? "30% Mengenrabatt" : "30% volume discount"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>{isDe ? "Prioritäre Laborkonfektionierung" : "Priority lab preparation"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                    <span>{isDe ? "Rechnungskauf für Institute (Net 30)" : "Invoice payment for institutes (Net 30)"}</span>
                  </li>
                </ul>
              </div>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link href="/shop">{isDe ? "Mengen bestellen" : "Order Volume"}</Link>
              </Button>
            </RevealItem>

            {/* Tier 4 */}
            <RevealItem className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow bg-gradient-to-b from-muted/30 to-card">
              <div>
                <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
                  {isDe ? "Custom & Enterprise" : "Custom & Enterprise"}
                </div>
                <div className="text-3xl font-extrabold text-foreground mb-1">
                  50+ <span className="text-base font-normal text-muted-foreground">{isDe ? "Vials / Synthese" : "Vials / Synthesis"}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 px-2.5 py-1 text-xs font-bold mb-4">
                  <Sparkles className="size-3.5" />
                  <span>35%+ {isDe ? "Rabatt & Individuell" : "Discount & Custom"}</span>
                </div>
                <ul className="space-y-2.5 text-xs text-muted-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-500 shrink-0" />
                    <span>{isDe ? "Individuelle Peptidsynthese & Reinheiten (>99.5%)" : "Custom peptide synthesis (>99.5% purity)"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-500 shrink-0" />
                    <span>{isDe ? "Persönlicher Key-Account Manager" : "Dedicated Key Account Manager"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-amber-500 shrink-0" />
                    <span>{isDe ? "Garantierte Chargen-Reservierung" : "Guaranteed batch reservation"}</span>
                  </li>
                </ul>
              </div>
              <Button variant="default" size="sm" asChild className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                <a href="#quote-form">{isDe ? "Individuelles Angebot" : "Custom Quote"}</a>
              </Button>
            </RevealItem>
          </RevealGroup>
        </div>

        {/* Core Institutional Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <FlaskConical className="size-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">
              {isDe ? "Akkreditierte Reinheitszertifikate (CoA)" : "Accredited Certificate of Analysis (CoA)"}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isDe
                ? "Jede Charge wird von unabhängigen europäischen Drittlaboren mittels HPLC (High-Performance Liquid Chromatography) und Massenspektrometrie (MS) zertifiziert."
                : "Every batch is verified by independent third-party European analytical laboratories via HPLC and Mass Spectrometry."}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Truck className="size-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">
              {isDe ? "Garantierte Kühlketten-Logistik aus München" : "Guaranteed Cold-Chain Logistics from Munich"}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isDe
                ? "Versand in isolierten Thermo-Containern mit Trockeneis oder Kühlakkus. 24–48h Express-Zustellung innerhalb Deutschlands und der EU."
                : "Dispatched in temperature-controlled thermal containers with gel packs or dry ice. 24–48h express delivery across Germany and the EU."}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <FileText className="size-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">
              {isDe ? "Deutsche & EU-Rechnungsstellung" : "EU & German Compliant Invoicing"}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isDe
                ? "Offizielle Rechnungen mit ausgewiesener deutscher MwSt. oder steuerfreie EU-Innergemeinschaftliche Lieferungen mit gültiger USt-IdNr. (VAT ID)."
                : "Official commercial invoices with German VAT or tax-free reverse-charge EU intra-community supply with valid VAT ID."}
            </p>
          </div>
        </div>

        {/* Inquiry Form & Direct Contact */}
        <div id="quote-form" className="rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  {isDe ? "Direkter Großhandels-Kontakt" : "Direct Wholesale Desk"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {isDe ? "Individuelles B2B-Angebot anfordern" : "Request an Institutional Quote"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isDe
                    ? "Benötigen Sie größere Mengen, individuelle Reinheitsstufen oder eine Rahmenvereinbarung für Ihr Institut? Unser Fachberater in München antwortet innerhalb von 4 Stunden."
                    : "Need bulk quantities, custom purities, or an institutional supply agreement? Our Munich B2B team responds within 4 business hours."}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-border text-sm">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-muted flex items-center justify-center text-primary shrink-0">
                    <Mail className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{isDe ? "Großhandels-E-Mail" : "B2B Email"}</div>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-muted flex items-center justify-center text-primary shrink-0">
                    <Phone className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{isDe ? "Telefon (München)" : "Phone (Munich Desk)"}</div>
                    <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                      {CONTACT_PHONE}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-muted flex items-center justify-center text-primary shrink-0">
                    <Building2 className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{isDe ? "Standort" : "Headquarters"}</div>
                    <div className="font-medium text-foreground text-xs">
                      {COMPANY_ADDRESS.line1}, {COMPANY_ADDRESS.postalCode} {COMPANY_ADDRESS.city}, {COMPANY_ADDRESS.country}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 bg-muted/30 rounded-2xl p-6 sm:p-8 border border-border/80">
              <form className="space-y-4" action={`mailto:${CONTACT_EMAIL}`} method="GET">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">
                      {isDe ? "Vor- & Nachname *" : "Full Name *"}
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      placeholder={isDe ? "Dr. Thomas Weber" : "Dr. Thomas Weber"}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">
                      {isDe ? "Institution / Labor / Firma *" : "Institution / Company *"}
                    </label>
                    <input 
                      type="text" 
                      name="institution" 
                      required 
                      placeholder={isDe ? "Max-Planck-Institut / BioTech GmbH" : "University Lab / Pharma Ltd"}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">
                      {isDe ? "Offizielle E-Mail-Adresse *" : "Official Email *"}
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      placeholder="researcher@university.de"
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">
                      {isDe ? "Telefonnummer" : "Phone Number"}
                    </label>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="+49 170 1234567"
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    {isDe ? "Gewünschte Peptide & Mengen *" : "Peptide Compounds & Estimated Quantities *"}
                  </label>
                  <textarea 
                    rows={4}
                    name="body" 
                    required 
                    placeholder={isDe 
                      ? "z.B. 50x BPC-157 5mg, 30x TB-500 5mg, 20x GHK-Cu 50mg. Bitte um Angabe von Chargen-Verfügbarkeit und Lieferzeit nach München."
                      : "e.g. 50x BPC-157 5mg, 30x TB-500 5mg, 20x GHK-Cu 50mg. Please specify batch lead times."
                    }
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" size="lg" className="w-full font-bold shadow-md">
                    {isDe ? "Großhandelsanfrage absenden" : "Submit Wholesale Inquiry"}
                  </Button>
                  <p className="text-[11px] text-muted-foreground text-center mt-2">
                    {isDe 
                      ? "🔒 Streng vertraulich. Ihre Daten werden ausschließlich zur Bearbeitung des B2B-Angebots verwendet."
                      : "🔒 Strictly confidential. Your details are used exclusively for institutional quotation."}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
