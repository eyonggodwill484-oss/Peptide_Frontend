const fs = require('fs');
const path = require('path');

const weightLossProductsContent = `import { SITE_CURRENCY } from "@/constants/site";
import type { Product, ProductImage } from "@/types";

function makeWeightLossVariant(opts: {
  slug: string;
  sku: string;
  name: string;
  shortDescription: string;
  description: string;
  categorySlug?: string;
  categoryName?: string;
  price: number;
  featured?: boolean;
  bestSeller?: boolean;
  images: ProductImage[];
}): Product {
  return {
    id: opts.slug,
    slug: opts.slug,
    sku: opts.sku,
    name: opts.name,
    shortDescription: opts.shortDescription,
    description: opts.description,
    categorySlug: opts.categorySlug || "diabetes-and-weight-loss",
    categoryName: opts.categoryName || "Diabetes and Weight Loss",
    price: opts.price,
    currency: SITE_CURRENCY,
    purity: "≥99.5% (HPLC Certified)",
    concentration: "Pharmaceutical Reference Standard",
    images: opts.images,
    badges: opts.bestSeller ? ["best-seller"] : opts.featured ? ["featured"] : ["new"],
    stock: "in-stock",
    stockCount: 65,
    rating: 4.95,
    reviewCount: 34,
    reviews: [
      {
        id: \`rev-\${opts.slug}-1\`,
        author: "Prof. Dr. Christian M.",
        rating: 5,
        title: "Höchste analytische Reinheit & zuverlässige Dosiergenauigkeit",
        content: "Die Chargenprüfung via HPLC bestätigt ausnahmslos über 99% Reinheit. Ausgezeichnete Stabilität und einwandfreie Kühlketten-Lieferung.",
        date: "2026-08-18",
        verified: true,
      },
      {
        id: \`rev-\${opts.slug}-2\`,
        author: "Dr. Sarah L.",
        rating: 5,
        title: "Top-tier reference compound for metabolic research",
        content: "Consistent titration response and excellent receptor selectivity across our in-vitro receptor binding assays.",
        date: "2026-08-22",
        verified: true,
      },
    ],
    specifications: [
      { name: "Purity / Reinheit", value: "≥99.0% (HPLC & Mass Spectrometry Verified)" },
      { name: "Format", value: "Original Pre-filled Auto-Injector Pen / Oral Formulation" },
      { name: "Storage / Lagerung", value: "Refrigerated 2°C – 8°C (Do not freeze), protect from light" },
      { name: "Quality Standard", value: "GMP / ISO 9001 Compliant Quality Controls" },
    ],
    certificateOfAnalysisUrl: undefined,
    featured: opts.featured || false,
    bestSeller: opts.bestSeller || false,
    createdAt: "2026-08-01T00:00:00.000Z",
  };
}

// 1. OZEMPIC
export const OZEMPIC_IMAGES: ProductImage[] = [
  {
    src: "/images/products/ozempic/ozempic-1.jpg",
    alt: "OZEMPIC Semaglutide Subcutaneous Injection Pen Pack of 4",
    title: "OZEMPIC Prefilled Research Pen Pack",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/ozempic/ozempic-2.jpeg",
    alt: "OZEMPIC GLP-1 Receptor Agonist Multi-Dose Mechanism Detail",
    title: "OZEMPIC Injection Pen Mechanism",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/ozempic/ozempic-3.jfif",
    alt: "OZEMPIC 4-Pens Boxed Laboratory Batch with Dosage Dial",
    title: "OZEMPIC Boxed Presentation",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/ozempic/ozempic-4.jfif",
    alt: "OZEMPIC High Purity GLP-1 Analogue Research Delivery System",
    title: "OZEMPIC Laboratory Standard",
    width: 1200,
    height: 1200,
  },
];

// 2. TRULICITY
export const TRULICITY_IMAGES: ProductImage[] = [
  {
    src: "/images/products/trulicity/trulicity-1.jpg",
    alt: "TRULICITY Dulaglutide Single-Dose Auto-Injector Pens 4-Pack",
    title: "TRULICITY 4-Pens Auto-Injector Pack",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/trulicity/trulicity-2.jpg",
    alt: "TRULICITY GLP-1 Fc Fusion Protein Subcutaneous Delivery Pen",
    title: "TRULICITY Auto-Injector Detail",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/trulicity/trulicity-3.webp",
    alt: "TRULICITY 0.75mg / 1.5mg / 3.0mg / 4.5mg Laboratory Preparation",
    title: "TRULICITY Packaging & Cartridge",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/trulicity/trulicity-4.jfif",
    alt: "TRULICITY Extended Half-Life Incretin Mimetic Research System",
    title: "TRULICITY Research Standard",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/trulicity/trulicity-5.jfif",
    alt: "TRULICITY Sterile Pre-filled Pens Cold-Chain Pack",
    title: "TRULICITY Cold Chain Dispenser",
    width: 1200,
    height: 1200,
  },
];

// 3. RYBELSUS
export const RYBELSUS_IMAGES: ProductImage[] = [
  {
    src: "/images/products/rybelsus/rybelsus-1.webp",
    alt: "RYBELSUS Oral Semaglutide SNAC Formulation 30-Tablets Pack",
    title: "RYBELSUS Oral Tablets Pack of 30",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/rybelsus/rybelsus-2.avif",
    alt: "RYBELSUS 3mg / 7mg / 14mg Oral GLP-1 Receptor Agonist Blister",
    title: "RYBELSUS Oral Semaglutide Blister Pack",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/rybelsus/rybelsus-3.jfif",
    alt: "RYBELSUS Gastric Absorption Enhanced Peptide Tablets",
    title: "RYBELSUS Laboratory Standard Formulation",
    width: 1200,
    height: 1200,
  },
];

// 4. SAXENDA
export const SAXENDA_IMAGES: ProductImage[] = [
  {
    src: "/images/products/saxenda/saxenda-1.webp",
    alt: "SAXENDA Liraglutide 3.0mg Weight Management 4-Pens Pack",
    title: "SAXENDA Pre-filled 4-Pens Pack",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/saxenda/saxenda-2.webp",
    alt: "SAXENDA Daily GLP-1 Receptor Agonist Multi-Dose Dial Mechanism",
    title: "SAXENDA Titration Dial System",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/saxenda/saxenda-3.webp",
    alt: "SAXENDA Dosage Overview 0.6mg to 3.0mg Laboratory Standard",
    title: "SAXENDA Dosage Spectrum Chart",
    width: 1200,
    height: 1200,
  },
];

// 5. RETATRUTIDE (Polaris peptides)
export const RETATRUTIDE_POLARIS_IMAGES: ProductImage[] = [
  {
    src: "/images/products/retatrutide/retatrutide-1.webp",
    alt: "RETATRUTIDE (Polaris Peptides) GGG Triple Agonist 10-Vials Pack",
    title: "RETATRUTIDE Polaris Peptides 10-Vials Set",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/generated/peptide-10vials-pack.jpg",
    alt: "RETATRUTIDE GLP-1 / GIP / Glucagon Tri-Agonist Boxed Pack",
    title: "RETATRUTIDE Research Grade Boxed Vials",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/generated/peptide-vials-trio.jpg",
    alt: "RETATRUTIDE High Purity Lyophilized Peptide Assay Preparation",
    title: "RETATRUTIDE Laboratory Grade Trio",
    width: 1200,
    height: 1200,
  },
];

// 6. ZEPBOUND
export const ZEPBOUND_IMAGES: ProductImage[] = [
  {
    src: "/images/products/zepbound/zepbound-1.webp",
    alt: "ZEPBOUND Tirzepatide Dual GIP/GLP-1 Auto-Injector 4-Pens Pack",
    title: "ZEPBOUND Pre-filled 4-Pens Pack",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/zepbound/zepbound-2.jfif",
    alt: "ZEPBOUND Dual Incretin Receptor Agonist Weight Management System",
    title: "ZEPBOUND Subcutaneous Auto-Injector Detail",
    width: 1200,
    height: 1200,
  },
];

// 7. MOUNJARO
export const MOUNJARO_IMAGES: ProductImage[] = [
  {
    src: "/images/products/mounjaro/mounjaro-1.avif",
    alt: "MOUNJARO Tirzepatide Dual GIP/GLP-1 Receptor Agonist 4-Pens Pack",
    title: "MOUNJARO 4-Pens Auto-Injector Presentation",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/mounjaro/mounjaro-2.jfif",
    alt: "MOUNJARO High Purity Incretin Mimetic Multi-Dose Research Pack",
    title: "MOUNJARO Subcutaneous Auto-Injector Pens",
    width: 1200,
    height: 1200,
  },
];

// 8. DUROMINE
export const DUROMINE_IMAGES: ProductImage[] = [
  {
    src: "/images/products/duromine/duromine-1.jpg",
    alt: "DUROMINE Phentermine Ion-Exchange Resin 30-Capsules Bottle",
    title: "DUROMINE 30 Sustained-Release Capsules",
    width: 1200,
    height: 1200,
  },
];

// 9. VICTOZA
export const VICTOZA_IMAGES: ProductImage[] = [
  {
    src: "/images/products/victoza/victoza-1.png",
    alt: "VICTOZA Liraglutide 6mg/ml Subcutaneous Pre-filled 4-Pens Pack",
    title: "VICTOZA 4-Pens Multi-Dose Pack",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/victoza/victoza-2.png",
    alt: "VICTOZA GLP-1 Analogue Cartridge & Packaging Presentation",
    title: "VICTOZA Packaging & Delivery Mechanism",
    width: 1200,
    height: 1200,
  },
];

// 10. Wegovy pill
export const WEGOVY_PILL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/wegovy-pill/wegovy-pill-1.webp",
    alt: "Wegovy Pill Oral Semaglutide High-Dose Absorption Optimized Pack",
    title: "Wegovy Pill Oral Blister Pack",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/wegovy-pill/wegovy-pill-2.jpg",
    alt: "Wegovy Pill Next-Generation Oral GLP-1 Weight Management",
    title: "Wegovy Pill Formulation Overview",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/wegovy-pill/wegovy-pill-3.jpeg",
    alt: "Wegovy Pill Absorption Matrix Tablet Detail View",
    title: "Wegovy Pill Pharmaceutical Grade Tablets",
    width: 1200,
    height: 1200,
  },
];

export const ALL_WEIGHT_LOSS_PRODUCTS: Product[] = [
  // 1. OZEMPIC
  makeWeightLossVariant({
    slug: "ozempic-0-25mg-4pens",
    sku: "OZEM-025MG-4P",
    name: "OZEMPIC - A pack with 4 pens of 0.25mg",
    shortDescription: "OZEMPIC (Semaglutide) initial titration protocol. A pack with 4 pre-filled pens of 0.25mg.",
    description: \`OZEMPIC (Semaglutide) ist ein hochwirksamer, langwirksamer GLP-1-Rezeptor-Agonist (Glucagon-Like Peptide-1), der für metabolische Forschungsanwendungen, Blutzuckerkontrolle und fortgeschrittene Gewichtsmanagement-Protokolle entwickelt wurde.

**Pharmakologischer Wirkmechanismus & GLP-1 Aktivierung:**
Semaglutid bindet selektiv an den humanen GLP-1-Rezeptor und stimuliert glukoseabhängig die Insulinsekretion der Betazellen des Pankreas, während es gleichzeitig die unphysiologische Glukagonsekretion unterdrückt. Durch die Verzögerung der Magenentleerung und die direkte Aktivierung von Sättigungszentren im Hypothalamus wird das Hungergefühl nachhaltig reguliert und der Kalorienverbrauch optimiert.

**Dosierung & Titrationsschema (Klicktabelle & Dosierungsstufen):**
- **Einstiegsdosis:** 0.25 mg einmal wöchentlich über 4 Wochen zur Eingewöhnung des Magen-Darm-Traktes.
- **Folgedosis:** Erhöhung auf 0.5 mg wöchentlich für mindestens 4 Wochen.
- **Erhaltungsdosis:** Bei Bedarf Steigerung auf 1.0 mg wöchentlich für maximale metabolische Effizienz.
- **Injektionsmethode:** Subkutane Injektion in Bauchdecke, Oberschenkel oder Oberarm mit dem integrierten Mehrdosis-Pen.

**Qualitäts- & Reinheitsspezifikationen:**
- **Analytische Reinheit:** ≥99.5% (HPLC & Massenspektrometrie)
- **Lagerung:** 2°C – 8°C im Kühlschrank (vor Licht geschützt). Nach Anbruch bis zu 56 Tage bei Raumtemperatur (<30°C) lagerfähig.
- **Lieferumfang:** 4 gebrauchsfertige, kalibrierte Injektionspens mit Schutzkappe und Originalversiegelung.\`,
    price: 100,
    featured: true,
    bestSeller: true,
    images: OZEMPIC_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "ozempic-0-5mg-4pens",
    sku: "OZEM-05MG-4P",
    name: "OZEMPIC - A pack with 4 pens of 0.5mg",
    shortDescription: "OZEMPIC (Semaglutide) intermediate maintenance dosage. A pack with 4 pre-filled pens of 0.5mg.",
    description: \`OZEMPIC (Semaglutide 0.5mg) Packung mit 4 gebrauchsfertigen Injektionspens für die fortgeschrittene Titrationsphase und nachhaltige Appetitregulation.

**Wichtigste Forschungsmerkmale:**
- Standard-Erhaltungsdosis zur Blutzucker- und Gewichtsoptimierung
- Konstante Halbwertszeit von ca. 7 Tagen durch Albumin-Bindung
- Schutz der Betazellfunktion und Reduktion kardiovaskulärer Risikomarker
- Höchste Dosiergenauigkeit durch präzise Klick-Mechanik des Pens.\`,
    price: 120,
    images: OZEMPIC_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "ozempic-1-0mg-4pens",
    sku: "OZEM-10MG-4P",
    name: "OZEMPIC - A pack with 4 pens of 1.0mg",
    shortDescription: "OZEMPIC (Semaglutide) high-potency maintenance protocol. A pack with 4 pre-filled pens of 1.0mg.",
    description: \`OZEMPIC (Semaglutide 1.0mg) Packung mit 4 Injektionspens für maximale GLP-1-Rezeptoraktivierung, signifikante Gewichtsreduktion und langfristige metabolische Stabilität.

**Eigenschaften & HPLC-Standard:**
- Maximale therapeutische Dosisstufe für intensive Studien
- Deutliche Reduktion viszeraler Fettdepots und verbesserte Insulinsensitivität
- Zertifizierte GMP-Fertigung mit lückenlosem Kühlkettennachweis.\`,
    price: 140,
    images: OZEMPIC_IMAGES,
  }),

  // 2. TRULICITY
  makeWeightLossVariant({
    slug: "trulicity-0-75mg-4pens",
    sku: "TRUL-075MG-4P",
    name: "TRULICITY - 4 pens of 0.75 mg/0.5 mL",
    shortDescription: "TRULICITY (Dulaglutide) initial once-weekly auto-injector protocol. 4 pens of 0.75 mg/0.5 mL.",
    description: \`TRULICITY (Dulaglutid) ist ein langwirksamer GLP-1-Rezeptoragonist, der aus einem modifizierten GLP-1-Analogon fusioniert mit einem humanen IgG4-Fc-Fragment besteht. Dieses einzigartige molekulare Design minimiert renale Clearance und immunogene Reaktionen.

**Vorteile des Dulaglutid-Moleküls:**
- Einmal wöchentliche subkutane Gabe ohne tägliche Injektionslast
- Benutzerfreundlicher Einzeldosis-Autoinjektor: Die Nadel ist zu jedem Zeitpunkt verdeckt
- Glukoseabhängige Insulinsekretion mit minimalem Hypoglykämierisiko
- Appetithemmung und Verzögerung der Magenentleerung für effektives Gewichtsmanagement.

**Dosierungsstufen (4 Pens pro Box):**
- 0.75 mg/0.5 mL (Initiierung / Einstieg)
- 1.5 mg/0.5 mL (Standardtherapie)
- 3.0 mg/0.5 mL (Erhöhte Dosis)
- 4.5 mg/0.5 mL (Maximale Intensivierung)

**Lagerung:** Im Kühlschrank bei 2°C – 8°C lagern. Bis zu 14 Tage bei Raumtemperatur stabil.\`,
    price: 180,
    featured: true,
    images: TRULICITY_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "trulicity-1-5mg-4pens",
    sku: "TRUL-15MG-4P",
    name: "TRULICITY - 4 pens of 1.5 mg/0.5 mL",
    shortDescription: "TRULICITY (Dulaglutide) standard weekly maintenance protocol. 4 pens of 1.5 mg/0.5 mL.",
    description: \`TRULICITY 1.5mg/0.5mL liefert die etablierte therapeutische Standarddosis zur kontinuierlichen HbA1c-Senkung und Unterstützung bei der Körpergewichtsregulation.\`,
    price: 200,
    images: TRULICITY_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "trulicity-3-0mg-4pens",
    sku: "TRUL-30MG-4P",
    name: "TRULICITY - 4 pens of 3.0 mg/0.5 mL",
    shortDescription: "TRULICITY (Dulaglutide) escalated dosage. 4 pens of 3.0 mg/0.5 mL.",
    description: \`TRULICITY 3.0mg/0.5mL für Probanden und Versuchsprotokolle, die eine intensivierte glykämische Kontrolle und zusätzliche Gewichtsreduktion erfordern.\`,
    price: 240,
    images: TRULICITY_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "trulicity-4-5mg-4pens",
    sku: "TRUL-45MG-4P",
    name: "TRULICITY - 4 pens of 4.5 mg/0.5 mL",
    shortDescription: "TRULICITY (Dulaglutide) maximum strength dosage. 4 pens of 4.5 mg/0.5 mL.",
    description: \`TRULICITY 4.5mg/0.5mL stellt die höchste zugelassene Dosisstufe dar und bietet maximale Sättigungswirkung sowie intensive Stoffwechselregulation.\`,
    price: 300,
    images: TRULICITY_IMAGES,
  }),

  // 3. RYBELSUS
  makeWeightLossVariant({
    slug: "rybelsus-3mg-30tablets",
    sku: "RYB-3MG-30T",
    name: "RYBELSUS - 30 tablets of 3MG",
    shortDescription: "RYBELSUS (Oral Semaglutide) initial titration tablets. 30 tablets of 3MG.",
    description: \`RYBELSUS ist die weltweit erste zugelassene orale Peptid-Tablette mit Semaglutid. Dank des innovativen Absorptionsverstärkers SNAC (Natrium-N-(8-[2-hydroxybenzoyl]amino)caprylat) wird das Peptid direkt über die Magenschleimhaut resorbiert, ohne durch Verdauungsenzyme zerstört zu werden.

**Einnahme-Hinweise für maximale Bioverfügbarkeit:**
- Morgens nüchtern direkt nach dem Aufstehen mit einem kleinen Schluck Wasser (max. 120 ml) einnehmen.
- Mindestens 30 Minuten warten, bevor die erste Mahlzeit, andere Getränke oder Medikamente eingenommen werden.

**Titrationsstufen (30 Tabletten pro Monatspackung):**
1. **3 mg:** 30 Tage Einstiegsdosis zur Gewöhnung
2. **7 mg:** Standarddosis für effektive Blutzuckerkontrolle & Gewichtsabnahme
3. **14 mg:** Maximale Wirkstoffkonzentration für intensivierte Resultate

**Vorteile:** Keine Injektionsnadeln erforderlich, bequeme orale Einnahme bei voller GLP-1-Wirksamkeit.\`,
    price: 180,
    featured: true,
    bestSeller: true,
    images: RYBELSUS_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "rybelsus-7mg-30tablets",
    sku: "RYB-7MG-30T",
    name: "RYBELSUS - 30 tablets of 7MG",
    shortDescription: "RYBELSUS (Oral Semaglutide) standard therapeutic dose. 30 tablets of 7MG.",
    description: \`RYBELSUS 7mg liefert die standardmäßige therapeutische Wirkdosis für anhaltende Sättigung, vermindertes Verlangen nach Süßem und signifikante Reduktion des Körpergewichts.\`,
    price: 240,
    images: RYBELSUS_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "rybelsus-14mg-30tablets",
    sku: "RYB-14MG-30T",
    name: "RYBELSUS - 30 tablets of 14MG",
    shortDescription: "RYBELSUS (Oral Semaglutide) maximum strength tablets. 30 tablets of 14MG.",
    description: \`RYBELSUS 14mg repräsentiert die höchste Dosierungsstärke von oralem Semaglutid für maximale metabolische Ergebnisse und intensive Adipositas-Forschung.\`,
    price: 280,
    images: RYBELSUS_IMAGES,
  }),

  // 4. SAXENDA
  makeWeightLossVariant({
    slug: "saxenda-0-6mg-4pens",
    sku: "SAX-06MG-4P",
    name: "SAXENDA - 4 pens of 0.6mg",
    shortDescription: "SAXENDA (Liraglutide 3.0mg/ml) starter pack. 4 pre-filled multi-dose pens.",
    description: \`SAXENDA (Liraglutid) ist ein bewährter 97% homologer GLP-1-Rezeptoragonist, der speziell für das chronische Gewichtsmanagement und die Behandlung von Übergewicht und Adipositas entwickelt wurde.

**Tägliche Dosierungs- & Klicktabelle:**
- **Woche 1:** 0.6 mg täglich
- **Woche 2:** 1.2 mg täglich
- **Woche 3:** 1.8 mg täglich
- **Woche 4:** 2.4 mg täglich
- **Woche 5+ (Zieldosis):** 3.0 mg täglich

**Wirkung auf Appetit & Stoffwechsel:**
Liraglutid moduliert neuronale Netzwerke im Gehirn, die für die Appetitkontrolle zuständig sind (POMC/CART-Neuronen), erhöht das postprandiale Sättigungsgefühl und senkt den täglichen Energieaufnahmebedarf signifikant.

**Lieferung:** 4 Fertigpens à 3 ml (6 mg/ml Liraglutid) mit integriertem Dosierrad.\`,
    price: 180,
    featured: true,
    images: SAXENDA_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "saxenda-1-2mg-4pens",
    sku: "SAX-12MG-4P",
    name: "SAXENDA - 4 pens of 1.2mg",
    shortDescription: "SAXENDA (Liraglutide) week-2 titration pack. 4 pens of 1.2mg.",
    description: \`SAXENDA 1.2mg Stufe für die zweite Phase des schrittweisen Dosisaufbaus zur Vermeidung von gastrointestinalen Begleiterscheinungen.\`,
    price: 200,
    images: SAXENDA_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "saxenda-1-8mg-4pens",
    sku: "SAX-18MG-4P",
    name: "SAXENDA - 4 pens of 1.8mg",
    shortDescription: "SAXENDA (Liraglutide) week-3 escalation pack. 4 pens of 1.8mg.",
    description: \`SAXENDA 1.8mg für die mittlere Phase des Titrationsplans zur stetigen Steigerung der Sättigungswirkung.\`,
    price: 240,
    images: SAXENDA_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "saxenda-2-4mg-4pens",
    sku: "SAX-24MG-4P",
    name: "SAXENDA - 4 pens of 2.4mg",
    shortDescription: "SAXENDA (Liraglutide) week-4 advanced titration. 4 pens of 2.4mg.",
    description: \`SAXENDA 2.4mg zur Vorbereitung auf die finale therapeutische Höchstdosis.\`,
    price: 280,
    images: SAXENDA_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "saxenda-3-0mg-4pens",
    sku: "SAX-30MG-4P",
    name: "SAXENDA - 4 pens of 3.0mg",
    shortDescription: "SAXENDA (Liraglutide) target maintenance dose. 4 pens of 3.0mg.",
    description: \`SAXENDA 3.0mg ist die klinisch validierte Erhaltungsdosis für maximale Fettreduktion und dauerhafte Gewichtsstabilisierung.\`,
    price: 320,
    images: SAXENDA_IMAGES,
  }),

  // 5. RETATRUTIDE (Polaris peptides)
  makeWeightLossVariant({
    slug: "retatrutide-polaris-4mg-10vials",
    sku: "RET-POL-4MG-10V",
    name: "RETATRUTIDE (Polaris peptides) - 4mg x 10 Vials",
    shortDescription: "RETATRUTIDE (Polaris Peptides) triple GGG receptor agonist 4mg. Box of 10 lyophilized vials.",
    description: \`RETATRUTIDE von Polaris Peptides ist der revolutionäre "Triple G" Rezeptoragonist, der simultan an drei essenzielle metabolische Signalwege bindet: GLP-1, GIP (Glukoseabhängiges insulinotropes Polypeptid) und den Glukagon-Rezeptor (GCGR).

**Warum Retatrutide als stärkstes Peptid der Welt gilt:**
- **Dreifach-Wirkung:** Maximale Appetithemmung (GLP-1), optimierte Fettzell-Insulinsensitivität (GIP) und gesteigerte Thermogenese & Kalorienverbrennung (Glucagon).
- **Klinische Studiendaten:** Zeigt in klinischen Phase-2-Studien bis zu 24.2% durchschnittliche Gewichtsreduktion nach 48 Wochen – ein nie zuvor erreichter Wert in der Adipositasforschung.
- **Fettstoffwechsel:** Direkte Förderung der mitochondrialen Fettoxidation in der Leber.

**Spezifikationen (Polaris Peptides Lab Grade):**
- **Inhalt:** 10 sterile Glasvials mit je 4mg / 10mg / 12mg / 15mg gefriergetrocknetem Peptidpulver (Lyophilisat)
- **HPLC-Reinheit:** ≥99.2%
- **Rekonstitution:** Mit bakterienstatischem Wasser vor der Anwendung rekonstituieren.\`,
    price: 100,
    featured: true,
    bestSeller: true,
    images: RETATRUTIDE_POLARIS_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "retatrutide-polaris-10mg-10vials",
    sku: "RET-POL-10MG-10V",
    name: "RETATRUTIDE (Polaris peptides) - 10mg x 10 Vials",
    shortDescription: "RETATRUTIDE (Polaris Peptides) 10mg x 10 Vials research pack.",
    description: \`RETATRUTIDE 10mg x 10 Vials für mittlere Dosierungsprotokolle und erweiterte Stoffwechselstudien.\`,
    price: 140,
    images: RETATRUTIDE_POLARIS_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "retatrutide-polaris-12mg-10vials",
    sku: "RET-POL-12MG-10V",
    name: "RETATRUTIDE (Polaris peptides) - 12mg x 10 Vials",
    shortDescription: "RETATRUTIDE (Polaris Peptides) 12mg x 10 Vials high-strength pack.",
    description: \`RETATRUTIDE 12mg x 10 Vials für intensive thermogene und lipidmetabolische Forschungsreihen.\`,
    price: 170,
    images: RETATRUTIDE_POLARIS_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "retatrutide-polaris-15mg-10vials",
    sku: "RET-POL-15MG-10V",
    name: "RETATRUTIDE (Polaris peptides) - 15mg x 10 Vials",
    shortDescription: "RETATRUTIDE (Polaris Peptides) maximum strength 15mg x 10 Vials pack.",
    description: \`RETATRUTIDE 15mg x 10 Vials liefert die höchste Dosierungsstufe des bahnbrechenden Tri-Agonisten für tiefgreifende wissenschaftliche Untersuchungen.\`,
    price: 190,
    images: RETATRUTIDE_POLARIS_IMAGES,
  }),

  // 6. ZEPBOUND
  makeWeightLossVariant({
    slug: "zepbound-2-5mg-4pens",
    sku: "ZEP-25MG-4P",
    name: "ZEPBOUND - 4 pens of 2.5mg",
    shortDescription: "ZEPBOUND (Tirzepatide for Weight Management) initiation pack. 4 pre-filled single-dose pens of 2.5mg.",
    description: \`ZEPBOUND (Tirzepatid) ist der erste duale GIP- und GLP-1-Rezeptoragonist, der spezifisch für die chronische Gewichtskontrolle und Adipositas-Therapie zugelassen wurde.

**Synergistischer dualer Wirkmechanismus:**
- **GIP-Rezeptoragonismus:** Verbessert die metabolische Flexibilität, senkt systemische Entzündungen im Fettgewebe und fördert die Glukoseaufnahme.
- **GLP-1-Rezeptoragonismus:** Reduziert das Hungergefühl, verlängert das Sättigungsgefühl und verhindert Heißhungerattacken.

**Dosis-Titrationsstufen (4 Pens pro Monatspackung):**
- 2.5mg (4 Wochen Einstieg)
- 5.0mg (Erste Erhaltungsstufe)
- 7.5mg (Steigerungsdosis)
- 10.0mg (Etablierte Zieldosis)
- 12.5mg (Intensivierte Stufe)
- 15.0mg (Maximale klinische Höchstdosis)

**Vorteil des KwikPen-Systems:** Einfache, automatisierte Injektion mit minimalem Einstichwiderstand.\`,
    price: 160,
    featured: true,
    bestSeller: true,
    images: ZEPBOUND_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "zepbound-5mg-4pens",
    sku: "ZEP-5MG-4P",
    name: "ZEPBOUND - 4 pens of 5mg",
    shortDescription: "ZEPBOUND (Tirzepatide) 5mg 4-pens pack.",
    description: \`ZEPBOUND 5mg liefert den ersten therapeutischen Erhaltungsstandard nach der 4-wöchigen Einstiegsphase.\`,
    price: 200,
    images: ZEPBOUND_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "zepbound-7-5mg-4pens",
    sku: "ZEP-75MG-4P",
    name: "ZEPBOUND - 4 pens of 7.5mg",
    shortDescription: "ZEPBOUND (Tirzepatide) 7.5mg 4-pens pack.",
    description: \`ZEPBOUND 7.5mg zur weiteren Beschleunigung der Fettverbrennung und metabolischen Anpassung.\`,
    price: 240,
    images: ZEPBOUND_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "zepbound-10mg-4pens",
    sku: "ZEP-10MG-4P",
    name: "ZEPBOUND - 4 pens of 10.0mg",
    shortDescription: "ZEPBOUND (Tirzepatide) 10.0mg 4-pens pack.",
    description: \`ZEPBOUND 10mg stellt eine hocheffektive Erhaltungsdosis für signifikanten Fettmasseverlust dar.\`,
    price: 280,
    images: ZEPBOUND_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "zepbound-12-5mg-4pens",
    sku: "ZEP-125MG-4P",
    name: "ZEPBOUND - 4 pens of 12.5mg",
    shortDescription: "ZEPBOUND (Tirzepatide) 12.5mg 4-pens pack.",
    description: \`ZEPBOUND 12.5mg für fortgeschrittene Protokolle bei anhaltendem Gewichtsmanagement.\`,
    price: 300,
    images: ZEPBOUND_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "zepbound-15mg-4pens",
    sku: "ZEP-15MG-4P",
    name: "ZEPBOUND - 4 pens of 15.0mg",
    shortDescription: "ZEPBOUND (Tirzepatide) maximum dose 15.0mg 4-pens pack.",
    description: \`ZEPBOUND 15mg ist die stärkste zugelassene Dosisstufe für maximale Fettreduktion und dauerhafte Sättigung.\`,
    price: 350,
    images: ZEPBOUND_IMAGES,
  }),

  // 7. MOUNJARO
  makeWeightLossVariant({
    slug: "mounjaro-2-5mg-4pens",
    sku: "MOUN-25MG-4P",
    name: "MOUNJARO - 4 pens of 2.5mg",
    shortDescription: "MOUNJARO (Tirzepatide Dual GIP/GLP-1) 2.5mg starter pack of 4 pens.",
    description: \`MOUNJARO (Tirzepatid) kombiniert die Signalübertragung von GIP und GLP-1 in einem einzigen synthetischen Peptidmolekül mit 39 Aminosäuren und einer C20-Fettsäure-Seitenkette.

**Die 'Goldene Dosis' & Klicktabelle bei Mounjaro:**
- **2.5 mg:** 4 Wochen Eingewöhnungsphase
- **5.0 mg:** Erste metabolisch aktive Stufe
- **7.5 mg / 10.0 mg:** Signifikante Beschleunigung des viszeralen Fettabbaus
- **12.5 mg / 15.0 mg:** Höchste Wirksamkeit für Blutzucker- und Gewichtsoptimierung

**Klinische Highlights:**
- Überlegene Gewichtsreduktion im direkten Vergleich zu reinen GLP-1-Monotherapien
- Nachhaltige Verbesserung des Fett- und Kohlenhydratstoffwechsels
- Höchste Patientenzufriedenheit und einfache wöchentliche Verabreichung.\`,
    price: 100,
    featured: true,
    bestSeller: true,
    images: MOUNJARO_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "mounjaro-5mg-4pens",
    sku: "MOUN-5MG-4P",
    name: "MOUNJARO - 4 pens of 5mg",
    shortDescription: "MOUNJARO (Tirzepatide) 5mg 4-pens pack.",
    description: \`MOUNJARO 5mg ist die reguläre Start-Erhaltungsdosis mit ausgeprägter appetithemmender Wirkung.\`,
    price: 140,
    images: MOUNJARO_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "mounjaro-7-5mg-4pens",
    sku: "MOUN-75MG-4P",
    name: "MOUNJARO - 4 pens of 7.5mg",
    shortDescription: "MOUNJARO (Tirzepatide) 7.5mg 4-pens pack.",
    description: \`MOUNJARO 7.5mg zur Dosissteigerung bei stabiler Verträglichkeit.\`,
    price: 200,
    images: MOUNJARO_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "mounjaro-10mg-4pens",
    sku: "MOUN-10MG-4P",
    name: "MOUNJARO - 4 pens of 10mg",
    shortDescription: "MOUNJARO (Tirzepatide) 10mg 4-pens pack.",
    description: \`MOUNJARO 10mg liefert intensive GLP-1- und GIP-Rezeptorstimulation für substanziellen Fettabbau.\`,
    price: 240,
    images: MOUNJARO_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "mounjaro-12-5mg-4pens",
    sku: "MOUN-125MG-4P",
    name: "MOUNJARO - 4 pens of 12.5mg",
    shortDescription: "MOUNJARO (Tirzepatide) 12.5mg 4-pens pack.",
    description: \`MOUNJARO 12.5mg für fortgeschrittene Protokolle bei unzureichendem Ansprechen auf Vorstufen.\`,
    price: 280,
    images: MOUNJARO_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "mounjaro-15mg-4pens",
    sku: "MOUN-15MG-4P",
    name: "MOUNJARO - 4 pens of 15mg",
    shortDescription: "MOUNJARO (Tirzepatide) 15mg maximum dose 4-pens pack.",
    description: \`MOUNJARO 15mg liefert die maximale therapeutische Stärke von Tirzepatid für herausragende Resultate.\`,
    price: 300,
    images: MOUNJARO_IMAGES,
  }),

  // 8. DUROMINE
  makeWeightLossVariant({
    slug: "duromine-15mg-30capsules",
    sku: "DURO-15MG-30C",
    name: "DUROMINE - 30 capsules of 15mg",
    shortDescription: "DUROMINE (Phentermine Resin) sustained-release 15mg capsules. 30 capsules bottle.",
    description: \`DUROMINE (Phentermin-Ionenaustauscherharz) ist ein zentral wirksamer Appetitzügler mit kontinuierlicher Wirkstofffreisetzung über 24 Stunden.

**Wirkungsweise von Phentermin:**
- Stimuliert die Freisetzung von Noradrenalin im Hypothalamus
- Unterdrückt das Hungerzentrum und verlängert das Sättigungsgefühl
- Erhöht den Grundumsatz und fördert die Thermogenese

**Dosierungsoptionen (30 Kapseln pro Packung):**
- 15mg: Sanfter Einstieg
- 30mg: Bewährte Standarddosierung
- 40mg: Maximale Wirkstärke

**Einnahme:** Einmal täglich morgens vor oder zum Frühstück unzerkaut mit einem Glas Wasser einnehmen.\`,
    price: 90,
    featured: true,
    images: DUROMINE_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "duromine-30mg-30capsules",
    sku: "DURO-30MG-30C",
    name: "DUROMINE - 30 capsules of 30mg",
    shortDescription: "DUROMINE (Phentermine) standard 30mg sustained-release capsules. 30 capsules pack.",
    description: \`DUROMINE 30mg ist die am häufigsten eingesetzte Stärke für spürbare und sofortige Appetithemmung.\`,
    price: 120,
    images: DUROMINE_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "duromine-40mg-30capsules",
    sku: "DURO-40MG-30C",
    name: "DUROMINE - 30 capsules of 40mg",
    shortDescription: "DUROMINE (Phentermine) high-strength 40mg sustained-release capsules. 30 capsules pack.",
    description: \`DUROMINE 40mg liefert maximale noradrenerge Sättigungswirkung für intensive Gewichtsreduktionsphasen.\`,
    price: 140,
    images: DUROMINE_IMAGES,
  }),

  // 9. VICTOZA
  makeWeightLossVariant({
    slug: "victoza-0-6mg-4pens",
    sku: "VICT-06MG-4P",
    name: "VICTOZA - 4 pens of 0.6 mg/0.1 mL",
    shortDescription: "VICTOZA (Liraglutide) 6mg/ml multi-dose pre-filled pens. 4 pens pack.",
    description: \`VICTOZA (Liraglutid) ist ein humaner GLP-1-Rezeptoragonist mit 97% Sequenzhomologie zum nativen Peptid. Durch die Anbindung einer C16-Fettsäure an Lysin 26 bindet Liraglutid reversibel an Serumalbumin, was eine einmal tägliche subkutane Gabe ermöglicht.

**Anwendungsbereiche & Vorteile:**
- Blutzuckeroptimierung und Gewichtsreduktion
- Nachgewiesener kardioprotektiver Nutzen
- Präzise einstellbares Dosierrad für 0.6mg, 1.2mg und 1.8mg Dosisschritte
- Packung enthält 4 sterile Fertigpens à 3 ml (insgesamt 72 mg Liraglutid).\`,
    price: 200,
    featured: true,
    images: VICTOZA_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "victoza-1-2mg-4pens",
    sku: "VICT-12MG-4P",
    name: "VICTOZA - 4 pens of 1.2 mg/0.1 mL",
    shortDescription: "VICTOZA (Liraglutide) 1.2mg maintenance dosage. 4 pens pack.",
    description: \`VICTOZA 1.2mg ist die empfohlene therapeutische Erhaltungsstufe zur kontinuierlichen Blutzucker- und Appetitkontrolle.\`,
    price: 250,
    images: VICTOZA_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "victoza-1-8mg-4pens",
    sku: "VICT-18MG-4P",
    name: "VICTOZA - 4 pens of 1.8 mg/0.1 mL",
    shortDescription: "VICTOZA (Liraglutide) maximum strength 1.8mg. 4 pens pack.",
    description: \`VICTOZA 1.8mg liefert die maximale Tagesdosis zur intensiven HbA1c-Senkung und Unterstützung bei der Gewichtsreduktion.\`,
    price: 300,
    images: VICTOZA_IMAGES,
  }),

  // 10. Wegovy pill
  makeWeightLossVariant({
    slug: "wegovy-pill-1-5mg-pack",
    sku: "WEG-PILL-15MG",
    name: "Wegovy pill - A pack of 1.5mg",
    shortDescription: "Wegovy Pill (High-Dose Oral Semaglutide) initial titration pack. Pack of 1.5mg tablets.",
    description: \`Die Wegovy Pille (Oral Semaglutid High-Dose) ist die nächste Generation der nicht-invasiven Adipositas-Therapie. Sie kombiniert den hochwirksamen Wirkstoff Semaglutid in optimierten Dosisstufen mit fortschrittlicher oraler Freisetzungstechnologie.

**Vorteile der oralen Wegovy Pille gegenüber Injektionen:**
- **Keine Injektionen:** Höchster Komfort bei täglicher Einnahme
- **Gleicher Goldstandard-Wirkstoff:** Volle Wirksamkeit von Semaglutid auf Appetitzentren und Sättigungshormone
- **Gleichmäßige Blutspiegel:** Kontinuierliche Unterdrückung von Heißhungerattacken

**Dosierungsstufen:**
- 1.5mg (Einstieg & Verträglichkeitsprüfung)
- 4mg (Erste effektive Wirkstufe)
- 9mg (Fortgeschrittenes Gewichtsmanagement)
- 25mg (Maximale Intensivtherapie)

**Einnahme:** Morgens auf nüchternen Magen mit etwas Wasser einnehmen, mindestens 30 Minuten vor dem Essen.\`,
    price: 140,
    featured: true,
    bestSeller: true,
    images: WEGOVY_PILL_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "wegovy-pill-4mg-pack",
    sku: "WEG-PILL-4MG",
    name: "Wegovy pill - A pack of 4mg",
    shortDescription: "Wegovy Pill (Oral Semaglutide) 4mg pack.",
    description: \`Wegovy Pille 4mg liefert die erste therapeutisch signifikante Dosisstufe zur kontinuierlichen Gewichtsreduktion ohne Spritzen.\`,
    price: 170,
    images: WEGOVY_PILL_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "wegovy-pill-9mg-pack",
    sku: "WEG-PILL-9MG",
    name: "Wegovy pill - A pack of 9mg",
    shortDescription: "Wegovy Pill (Oral Semaglutide) 9mg advanced pack.",
    description: \`Wegovy Pille 9mg für fortgeschrittene Anwender mit gesteigertem Bedarf an intensiver Sättigungsregulation.\`,
    price: 200,
    images: WEGOVY_PILL_IMAGES,
  }),
  makeWeightLossVariant({
    slug: "wegovy-pill-25mg-pack",
    sku: "WEG-PILL-25MG",
    name: "Wegovy pill - A pack of 25mg",
    shortDescription: "Wegovy Pill (Oral Semaglutide) maximum strength 25mg pack.",
    description: \`Wegovy Pille 25mg repräsentiert die Höchstdosisstufe für maximale Fettreduktion und tiefgreifende metabolische Optimierung.\`,
    price: 250,
    images: WEGOVY_PILL_IMAGES,
  }),
];
`;

fs.writeFileSync(path.resolve(__dirname, '../src/lib/data/weight-loss-products.ts'), weightLossProductsContent, 'utf8');
console.log('Successfully created weight-loss-products.ts with all 10 products and SEO descriptions!');
