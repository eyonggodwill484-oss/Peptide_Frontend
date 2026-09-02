import Link from "@/components/ui/localized-link";
import { Building2, TrendingDown, Truck, ShieldCheck, Sparkles, ArrowRight, MessageSquare, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { DEFAULT_WHATSAPP_NUMBER } from "@/constants/payment";

interface B2BWholesaleShowcaseProps {
  locale?: string;
}

export function B2BWholesaleShowcase({ locale = "de" }: B2BWholesaleShowcaseProps) {
  const isDe = locale === "de";
  const cleanPhone = DEFAULT_WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
  const waMessage = encodeURIComponent(
    isDe
      ? "Hallo Wardiere Peptide Sciences, ich interessiere mich für eine B2B-Großbestellung / Mengenrabatte für unser Labor. Bitte senden Sie mir die Großhandelskonditionen."
      : "Hello Wardiere Peptide Sciences, I am inquiring about B2B bulk wholesale pricing and institutional lab orders. Please provide your volume discount catalog."
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMessage}`;

  const tiers = [
    {
      range: isDe ? "10 – 24 Einheiten" : "10 – 24 Units",
      tierName: isDe ? "Lab Starter Pack" : "Lab Starter Tier",
      discount: "-15%",
      discountLabel: isDe ? "15% Sofort-Rabatt" : "15% Instant Savings",
      features: isDe 
        ? ["Mischsortiment möglich", "Express Kühlkettenversand", "Chargen-CoA inklusive"]
        : ["Mix & match products", "Express cold-chain dispatch", "Batch CoA included"],
      popular: false,
    },
    {
      range: isDe ? "25 – 49 Einheiten" : "25 – 49 Units",
      tierName: isDe ? "Research Facility" : "Research Facility",
      discount: "-25%",
      discountLabel: isDe ? "25% Großmengen-Rabatt" : "25% Volume Savings",
      features: isDe 
        ? ["Priorisierte Chargen-Reservierung", "Kostenloser 24h Expressversand", "Volle HPLC & LC-MS Analytik"]
        : ["Priority batch allocation", "Free 24h express shipping", "Full HPLC & LC-MS analysis"],
      popular: true,
    },
    {
      range: isDe ? "50+ Einheiten" : "50+ Units",
      tierName: isDe ? "Institutional Master" : "Institutional Master",
      discount: "-35%",
      discountLabel: isDe ? "35% Maximal-Rabatt" : "35% Maximum Savings",
      features: isDe 
        ? ["Höchste Preiskonditionen", "Persönlicher B2B-Account Manager", "Individuelle Bulk-Chargensynthese"]
        : ["Maximum volume discount", "Dedicated B2B account manager", "Custom bulk batch synthesis"],
      popular: false,
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-border bg-gradient-to-b from-background via-muted/20 to-background py-20">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-extrabold text-primary mb-4 shadow-2xs">
              <Building2 className="size-3.5 text-primary" />
              <span>{isDe ? "Offizieller B2B Großhandel & Institutslieferant" : "Official B2B & Institutional Wholesale"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
              {isDe 
                ? "Großhandel & Staffelpreise für Forschungslabore & Händler" 
                : "Bulk Wholesale & Volume Discounts for Labs & Resellers"}
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {isDe
                ? "Profitieren Sie von bis zu 35% Rabatt bei institutionellen Bestellungen. Direkte Auslieferung aus unserem Zentrallager in München mit lückenloser Kühlkette, HPLC-Qualitätsprüfung und Express-Abwicklung in Euro (€)."
                : "Save up to 35% on volume orders. Direct fulfillment from our Munich fulfillment center with active cold-chain logistics, certified HPLC purity, and priority processing in Euro (€)."}
            </p>
          </Reveal>
        </div>

        {/* 3 Tier Cards */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier, idx) => (
            <RevealItem 
              key={idx} 
              className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                tier.popular 
                  ? "border-2 border-primary bg-card shadow-lg shadow-primary/5 ring-4 ring-primary/10" 
                  : "border border-border bg-card/80 shadow-xs hover:border-primary/40 hover:shadow-md"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3.5 py-1 text-[11px] font-black text-primary-foreground uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Sparkles className="size-3" />
                  {isDe ? "Beliebteste B2B-Stufe" : "Most Popular Tier"}
                </div>
              )}

              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {tier.tierName}
                  </span>
                  <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-black text-primary font-mono">
                    {tier.range}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl sm:text-4xl font-black text-foreground font-mono">
                    {tier.discount}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {tier.discountLabel}
                  </span>
                </div>

                <div className="h-px w-full bg-border mb-5" />

                <ul className="space-y-2.5 mb-6">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2.5 text-xs text-muted-foreground font-medium">
                      <CheckCircle2 className="size-4 shrink-0 text-primary" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                variant={tier.popular ? "default" : "outline"} 
                className="w-full rounded-2xl font-extrabold h-11 shadow-xs" 
                asChild
              >
                <Link href="/wholesale">
                  {isDe ? "Großhandels-Konditionen ansehen" : "Explore Wholesale Pricing"}
                </Link>
              </Button>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Bottom Fast Action Banner */}
        <Reveal>
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-primary/5 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                <Truck className="size-7" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-foreground">
                  {isDe 
                    ? "Benötigen Sie ein maßgeschneidertes Angebot oder Großmengen ab 100+ Einheiten?" 
                    : "Need custom batch synthesis or bulk orders exceeding 100+ units?"}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
                  {isDe
                    ? "Unser B2B-Vertriebsteam in München erstellt Ihnen innerhalb von 2 Stunden ein verbindliches Großhandels-Angebot inklusive Staffelpreisen und Lieferzusicherung."
                    : "Our Munich procurement desk provides tailored volume quotations with fixed-price commitments and priority cold-chain allocation."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button asChild size="lg" className="rounded-2xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md gap-2">
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="size-4" />
                  {isDe ? "WhatsApp B2B-Anfrage" : "Instant WhatsApp Quote"}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-2xl font-bold gap-2">
                <Link href="/wholesale">
                  {isDe ? "Großhandels-Portal" : "Wholesale Hub"}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
