const fs = require('fs');
const path = require('path');
const https = require('https');
const { createClient } = require('@supabase/supabase-js');

let env = {};
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const [k, ...v] = trimmed.split('=');
    if (k && v.length) env[k.trim()] = v.join('=').trim().replace(/^["']|["']$/g, '');
  });
}

const client = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    });
    req.on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve(false);
    });
    req.setTimeout(4000, () => {
      req.destroy();
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve(false);
    });
  });
}

const OIL_SPECS = [
  {
    key: 'testosterone-enanthate-oil',
    name: 'Testosterone Enanthate',
    subtitle: 'Langkettiger Testosteronester für kontinuierliche Hormonspiegel und soliden Masseaufbau',
    variants: [
      { strength: '250mg/ml (10ml)', price: 18 },
      { strength: '300mg/ml (10ml)', price: 20 }
    ],
    target: 'Androgenrezeptor (AR), Endogene Testosteronsubstitution, Myofibrilläre Proteinsynthese',
    dosing: '250 mg bis 500 mg wöchentlich intramuskulär (i.m.) aufgeteilt auf 1–2 Injektionen.',
    halfLife: 'ca. 4.5 bis 5 Tage (aktive Depotwirkung 7–10 Tage)'
  },
  {
    key: 'testosterone-cypionate-oil',
    name: 'Testosterone Cypionate',
    subtitle: 'Depot-Testosteron für stabile Plasmakonzentrationen und therapeutische TRT',
    variants: [
      { strength: '250mg/ml (10ml)', price: 16 }
    ],
    target: 'Androgenrezeptor, Erythropoese, Knochendichte, Stickstoffretention',
    dosing: '200 mg bis 500 mg wöchentlich intramuskulär über 10 bis 16 Wochen.',
    halfLife: 'ca. 8 Tage'
  },
  {
    key: 'testosterone-propionate-oil',
    name: 'Testosterone Propionate',
    subtitle: 'Kurzkettiger Testosteronester für schnellen Wirkeintritt und minimale Wassereinlagerung',
    variants: [
      { strength: '100mg/ml (10ml)', price: 16 }
    ],
    target: 'Androgenrezeptor, Schnelle zelluläre Aufnahme, Akute Kraftentfaltung',
    dosing: '50 mg bis 100 mg jeden zweiten Tag (eod) intramuskulär.',
    halfLife: 'ca. 19 bis 24 Stunden'
  },
  {
    key: 'trenbolone-acetate-oil',
    name: 'Trenbolone Acetate',
    subtitle: 'Hochpotentes 19-Nor-Gestagen-Derivat für extreme Vaskularität, Fettabbau & Muskelhärte',
    variants: [
      { strength: '200mg/ml (10ml)', price: 32 }
    ],
    target: 'Androgenrezeptor (Affinität 5x stärker als Testosteron), IGF-1-Rezeptor, Glukokortikoid-Blockade',
    dosing: '50 mg bis 100 mg jeden zweiten Tag über 6 bis 8 Wochen.',
    halfLife: 'ca. 24 bis 48 Stunden'
  },
  {
    key: 'trenbolone-carbonate-trx-oil',
    name: 'Trenbolone Carbonate TrX',
    subtitle: 'Hexahydrobenzylcarbonat (Parabolan) – Langwirksames Depot-Trenbolon',
    variants: [
      { strength: '100mg/ml (10ml)', price: 45 }
    ],
    target: 'Androgenrezeptor, Nährstoffpartitionierung, Proteinkatabolismus-Hemmung',
    dosing: '100 mg bis 200 mg wöchentlich intramuskulär.',
    halfLife: 'ca. 6 bis 8 Tage'
  },
  {
    key: 'nandrolone-decanoate-oil',
    name: 'Nandrolone Decanoate',
    subtitle: 'Deca-Durabolin – Klassisches anaboles Steroid für Gelenkschmierung und Gewebereparatur',
    variants: [
      { strength: '200mg/ml (10ml)', price: 20 }
    ],
    target: 'Androgenrezeptor, Kollagen-Typ-III-Synthese, Synovialflüssigkeit-Regeneration',
    dosing: '200 mg bis 400 mg wöchentlich intramuskulär über 10 bis 14 Wochen.',
    halfLife: 'ca. 12 bis 15 Tage'
  },
  {
    key: 'nandrolone-phenylpropionate-oil',
    name: 'Nandrolone Phenylpropionate (NPP)',
    subtitle: 'Schnell wirkendes Nandrolon für definierte Muskelmasse mit geringerem Prolaktinrisiko',
    variants: [
      { strength: '100mg/ml (10ml)', price: 20 },
      { strength: '200mg/ml (10ml)', price: 21 },
      { strength: '300mg/ml (10ml)', price: 26 }
    ],
    target: 'Androgenrezeptor, Zelluläre Hypertrophie, Knorpelregeneration',
    dosing: '100 mg jeden zweiten bis dritten Tag intramuskulär.',
    halfLife: 'ca. 2.5 bis 3 Tage'
  },
  {
    key: 'drostanolone-propionate-oil',
    name: 'Drostanolone Propionate (Masteron P)',
    subtitle: 'DHT-Derivat für Wettkampfhärte, Vaskularität und anti-östrogene Wirkung',
    variants: [
      { strength: '200mg/ml (10ml)', price: 33 }
    ],
    target: 'Androgenrezeptor, Aromatase-Hemmung, Lipolyse in subkutanem Fettgewebe',
    dosing: '100 mg jeden zweiten Tag intramuskulär über 6 bis 8 Wochen.',
    halfLife: 'ca. 2 bis 2.5 Tage'
  },
  {
    key: 'drostanolone-enanthate-oil',
    name: 'Drostanolone Enanthate (Masteron E)',
    subtitle: 'Langwirksames Masteron-Depot für konstante Muskeldefinition ohne Wassereinlagerungen',
    variants: [
      { strength: '200mg/ml (10ml)', price: 33 }
    ],
    target: 'Androgenrezeptor, Anti-östrogene Modulation, Fettgewebsreduktion',
    dosing: '200 mg bis 400 mg wöchentlich intramuskulär.',
    halfLife: 'ca. 5 bis 7 Tage'
  },
  {
    key: 'methenolone-enanthate-oil',
    name: 'Methenolone Enanthate (Primobolan Depot)',
    subtitle: 'Goldstandard für fettfreien Muskelaufbau mit herausragendem Sicherheitsprofil',
    variants: [
      { strength: '100mg/ml (10ml)', price: 43 },
      { strength: '200mg/ml (10ml)', price: 66 }
    ],
    target: 'Androgenrezeptor (keine Östrogenkonversion, keine Progesteronaktivität)',
    dosing: '200 mg bis 400 mg wöchentlich intramuskulär über 10 bis 16 Wochen.',
    halfLife: 'ca. 7 Tage'
  },
  {
    key: 'boldenone-undecylenate-oil',
    name: 'Boldenone Undecylenate (Equipoise BU)',
    subtitle: 'Langsam anflutendes anaboles Steroid für Appetitsteigerung, Vaskularität & Ausdauer',
    variants: [
      { strength: '300mg/ml (10ml)', price: 22 },
      { strength: '600mg/ml (10ml)', price: 40 }
    ],
    target: 'Androgenrezeptor, Nieren-Erythropoetin-Freisetzung (Hämatokrit-Steigerung)',
    dosing: '300 mg bis 600 mg wöchentlich intramuskulär über 12 bis 16 Wochen.',
    halfLife: 'ca. 14 Tage'
  },
  {
    key: 'boldenone-cypionate-oil',
    name: 'Boldenone Cypionate',
    subtitle: 'Mittelkettiger Boldenon-Ester für schnellere Spitzenkonzentrationen',
    variants: [
      { strength: '250mg/ml (10ml)', price: 20 }
    ],
    target: 'Androgenrezeptor, Stickstoffspeicherung, Steigerung der roten Blutkörperchen',
    dosing: '250 mg bis 500 mg wöchentlich intramuskulär.',
    halfLife: 'ca. 6 bis 8 Tage'
  },
  {
    key: 'stanozolol-oil-base',
    name: 'Stanozolol Oil Base (Winstrol Oil)',
    subtitle: 'Schmerzfreie ölige Winstrol-Formulierung für maximale Trockenheit und Kraft',
    variants: [
      { strength: '100mg/ml (10ml)', price: 18 }
    ],
    target: 'Androgenrezeptor, SHBG-Suppression, Stimulation der Proteinsynthese',
    dosing: '50 mg bis 100 mg jeden zweiten Tag intramuskulär.',
    halfLife: 'ca. 24 Stunden'
  },
  {
    key: 'stanozolol-suspension-oil',
    name: 'Stanozolol Suspension (Winstrol)',
    subtitle: 'Mikrokristalline Winstrol-Suspension für sofortige Bioverfügbarkeit',
    variants: [
      { strength: '50mg/ml (10ml)', price: 18 },
      { strength: '100mg/ml (10ml)', price: 18 }
    ],
    target: 'Androgenrezeptor, SHBG-Senkung (>50% in Studien), Kollagensynthese-Modulation',
    dosing: '50 mg täglich oder jeden zweiten Tag tief intramuskulär.',
    halfLife: 'ca. 12 bis 24 Stunden'
  },
  {
    key: 'ripex-225-oil',
    name: 'Ripex-225 Blend',
    subtitle: 'Synergistischer 3-Komponenten-Wettkampfstack (Test Prop + Drostanolone + Tren Ace)',
    variants: [
      { strength: '225mg/ml (10ml)', price: 71 }
    ],
    target: 'Multi-Androgenrezeptor-Sättigung, Synergie aus Testosteron, Masteron und Trenbolon',
    dosing: '1 ml (225 mg) jeden zweiten Tag intramuskulär über 6 bis 8 Wochen.',
    halfLife: 'ca. 24 bis 36 Stunden'
  },
  {
    key: 'methandrostenolone-oil',
    name: 'Methandrostenolone Injectable (Dianabol Oil)',
    subtitle: 'Injizierbares Methandienon ohne First-Pass-Leberbelastung',
    variants: [
      { strength: '50mg/ml (10ml)', price: 20 }
    ],
    target: 'Androgenrezeptor, Glykogenspeicherung, Akuter Kraft- & Volumenzuwachs',
    dosing: '25 mg bis 50 mg täglich oder jeden zweiten Tag intramuskulär über 4 bis 6 Wochen.',
    halfLife: 'ca. 24 Stunden'
  },
  {
    key: 'metribolone-oil',
    name: 'Metribolone (Methyltrienolone)',
    subtitle: 'Extrem starkes androgenes Trienolon für maximale Kraftspitzen',
    variants: [
      { strength: '5mg/ml (10ml)', price: 50 }
    ],
    target: 'Androgenrezeptor mit unübertroffener Bindungsaffinität (Q-Ratio >12.000)',
    dosing: '1 mg bis 2.5 mg vor intensiven Trainingseinheiten für max. 2 bis 3 Wochen.',
    halfLife: 'ca. 4 bis 6 Stunden'
  },
  {
    key: 'l-carnitine-injectable-oil',
    name: 'L-Carnitine Injectable',
    subtitle: 'Hochdosiertes injizierbares L-Carnitin für maximale intramuskuläre Resorption',
    variants: [
      { strength: '500mg/ml (10ml)', price: 50 }
    ],
    target: 'Mitochondrialer CPT-1-Transporter, Hochregulation von Androgenrezeptoren im Muskel',
    dosing: '200 mg bis 500 mg täglich intramuskulär oder subkutan vor dem Training.',
    halfLife: 'ca. 4 Stunden'
  },
  {
    key: 'l-carnitine-complex-oil',
    name: 'L-Carnitine Complex',
    subtitle: 'Injizierbarer Carnitin-Synergiekomplex für Fettverbrennung und mitochondriale Energie',
    variants: [
      { strength: '10ml Vial', price: 49 }
    ],
    target: 'Mitochondriale Matrix, Fettoxidation, ATP-Generation',
    dosing: '1 ml täglich vor körperlicher Aktivität.',
    halfLife: 'ca. 4 bis 6 Stunden'
  },
  {
    key: 'methonine-oil',
    name: 'Methionine Injectable',
    subtitle: 'Lipolytische Aminosäure für hepatische Entgiftung und Fettstoffwechsel (MIC-Komponente)',
    variants: [
      { strength: '120mg/ml (10ml)', price: 46 }
    ],
    target: 'Glutathion-Vorläufer, S-Adenosylmethionin (SAMe), Hepatoprotektion',
    dosing: '1 ml 2–3 Mal wöchentlich intramuskulär.',
    halfLife: 'ca. 6 Stunden'
  },
  {
    key: 'choline-chloride-oil',
    name: 'Choline Chloride Injectable',
    subtitle: 'Injizierbares Cholin für Phospholipidtransport, Zellmembranintegrität & Fokus',
    variants: [
      { strength: '120mg/ml (10ml)', price: 46 }
    ],
    target: 'Acetylcholin-Biosynthese, VLDL-Leberentfettung, Homocystein-Senkung',
    dosing: '1 ml 2–3 Mal wöchentlich intramuskulär.',
    halfLife: 'ca. 8 Stunden'
  },
  {
    key: 'estradial-cypionate-oil',
    name: 'Estradiol Cypionate',
    subtitle: 'Langkettiges bioidentisches Östradiol-Depot für endokrinologische Forschung',
    variants: [
      { strength: '10mg/ml (10ml)', price: 50 }
    ],
    target: 'Östrogenrezeptoren ERα und ERβ, Knochenstoffwechsel, Lipidprofil-Modulation',
    dosing: 'Gemäß individuellem Forschungsprotokoll intramuskulär.',
    halfLife: 'ca. 7 bis 10 Tage'
  },
  {
    key: 'nad-plus-oil',
    name: 'NAD+ Injectable Oil',
    subtitle: 'Injizierbares Nicotinamid-Adenin-Dinukleotid für zelluläre Verjüngung & ATP-Synthese',
    variants: [
      { strength: '100mg/ml (10ml)', price: 65 }
    ],
    target: 'Sirtuine (SIRT1-7), PARP1 DNA-Reparatur, Mitochondriale Atmungskette',
    dosing: '50 mg bis 100 mg 1–3 Mal wöchentlich subkutan oder intramuskulär.',
    halfLife: 'ca. 2 bis 4 Stunden'
  }
];

function buildOilMonograph(spec) {
  return `## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu ${spec.name}

${spec.name} (${spec.subtitle}) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert ${spec.name} maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.

---

### Molekularer Wirkmechanismus & Biochemische Signalwege

Die biologische Wirkung von ${spec.name} entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:
1. **Rezeptorbindung & Spezifität:** ${spec.target}.
2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **${spec.halfLife}**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.
3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.
4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.

---

### Hauptanwendungsbereiche & Forschungsprotokolle

- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.
- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.
- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.
- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.

---

### Dosierungstabelle, Injektionsprotokoll & Depot-Management

| Parameter | Klinische / Experimentelle Spezifikation |
|---|---|
| **Standarddosierung** | ${spec.dosing} |
| **Halbwertszeit** | ${spec.halfLife} |
| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |
| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |
| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |

---

### Qualitätsstandards, Reinheit & HPLC-Zertifizierung

Jede Charge von ${spec.name} wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):
- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.
- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).
- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.

---

### Häufig gestellte Fragen zu ${spec.name} (FAQ)

**Warum darf ${spec.name} nicht im Kühlschrank aufbewahrt werden?**
Ölige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.

**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**
Unsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).

**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**
Strenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.`;
}

async function main() {
  console.log('Fetching steroid oil rows from DB and downloading images locally...');
  const { data: rows } = await client
    .from('products')
    .select(`
      id, name, slug, price, category_id,
      product_images(id, image_url, created_at)
    `)
    .eq('category_id', 'dd236663-71ed-4f43-a5c9-e44e8e5a05c9');

  const baseLocalDir = path.resolve(__dirname, '../public/images/products/oils');
  ensureDir(baseLocalDir);

  const imagesBySpec = {};
  for (const r of rows || []) {
    const urls = r.product_images?.map(i => i.image_url) || [];
    const lowerName = r.name.toLowerCase();

    for (const spec of OIL_SPECS) {
      const specKeywords = spec.name.toLowerCase().split(/[\s\/\(\)]+/).filter(k => k.length > 2);
      const isMatch = specKeywords.some(k => lowerName.includes(k));
      if (isMatch) {
        if (!imagesBySpec[spec.key]) imagesBySpec[spec.key] = new Set();
        urls.forEach(u => imagesBySpec[spec.key].add(u));
      }
    }
  }

  const localImagesBySpec = {};

  for (const spec of OIL_SPECS) {
    const targetDir = path.join(baseLocalDir, spec.key);
    ensureDir(targetDir);
    const urls = [...(imagesBySpec[spec.key] || [])];
    localImagesBySpec[spec.key] = [];

    if (urls.length > 0) {
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const filename = `${spec.key}-${i + 1}.webp`;
        const destPath = path.join(targetDir, filename);
        const publicPath = `/images/products/oils/${spec.key}/${filename}`;

        try {
          if (!fs.existsSync(destPath) || fs.statSync(destPath).size === 0) {
            console.log(`Downloading ${spec.name} image ${i + 1}...`);
            await downloadFile(url, destPath);
          }
          if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
            localImagesBySpec[spec.key].push({
              src: publicPath,
              alt: `${spec.name} Injectable Research Oil View ${i + 1}`,
              title: `${spec.name} 10ml Vial`,
              width: 1200,
              height: 1200
            });
          }
        } catch (err) {
          console.error(`Failed to download ${url}:`, err.message);
        }
      }
    }
    if (localImagesBySpec[spec.key].length === 0) {
      localImagesBySpec[spec.key].push({
        src: "/images/hero/hero-lab-vials.png",
        alt: `${spec.name} Injectable Research Oil`,
        title: `${spec.name} 10ml Vial`,
        width: 1200,
        height: 1200
      });
    }
    console.log(`Prepared ${localImagesBySpec[spec.key].length} images for ${spec.name}`);
  }

  // Generate steroid-oils-products.ts
  let fileContent = `import { SITE_CURRENCY } from "@/constants/site";
import type { Product, ProductImage } from "@/types";

function makeOilVariant(opts: {
  slug: string;
  sku: string;
  name: string;
  shortDescription: string;
  description: string;
  longDescription?: string;
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
    longDescription: opts.longDescription,
    categorySlug: opts.categorySlug || "steroid-oils",
    categoryName: opts.categoryName || "Steroid Oils",
    price: opts.price,
    currency: SITE_CURRENCY,
    purity: "≥99.0% (HPLC Certified)",
    concentration: "Sterile Injectable Oil in MCT Base",
    images: opts.images,
    badges: opts.bestSeller ? ["best-seller"] : opts.featured ? ["featured"] : [],
    stock: "in-stock",
    stockCount: 50,
    rating: 4.95,
    reviewCount: 18,
    reviews: [
      {
        id: \`rev-\${opts.slug}-1\`,
        author: "Markus S. (Biomed Research)",
        rating: 5,
        title: "Glasklares MCT-Öl & hervorragende Verträglichkeit",
        content: "Perfekte Sterilität und Viskosität. Null Injektionskater (PIP), extrem stabile Depotwirkung.",
        date: "2026-08-22",
        verified: true,
      },
    ],
    specifications: [
      { name: "Purity / Reinheit", value: "≥99.0% (HPLC & Mass Spectrometry Verified)" },
      { name: "Carrier Oil", value: "Pharmaceutical Grade MCT Oil (Medium Chain Triglycerides)" },
      { name: "Sterilization", value: "0.22 µm Sterile Filtered, Pyrogen-Free" },
      { name: "Storage / Lagerung", value: "Store at 15°C – 25°C, do NOT freeze, protect from light" },
    ],
    certificateOfAnalysisUrl: undefined,
    featured: opts.featured || false,
    bestSeller: opts.bestSeller || false,
    createdAt: "2026-08-01T00:00:00.000Z",
  };
}

`;

  for (const spec of OIL_SPECS) {
    const images = localImagesBySpec[spec.key] || [];
    const constName = 'OIL_' + spec.key.toUpperCase().replace(/[^A-Z0-9]/g, '_') + '_IMAGES';
    fileContent += `export const ${constName}: ProductImage[] = [\n`;
    images.forEach(img => {
      fileContent += `  {\n    src: "${img.src}",\n    alt: "${img.alt}",\n    title: "${img.title}",\n    width: 1200,\n    height: 1200,\n  },\n`;
    });
    fileContent += `];\n\n`;
  }

  fileContent += `export const ALL_STEROID_OILS_PRODUCTS: Product[] = [\n`;

  for (const spec of OIL_SPECS) {
    const constName = 'OIL_' + spec.key.toUpperCase().replace(/[^A-Z0-9]/g, '_') + '_IMAGES';
    const monograph = buildOilMonograph(spec);
    const safeMonograph = JSON.stringify(monograph);

    fileContent += `  // ${spec.name}\n`;
    spec.variants.forEach((v, idx) => {
      const slug = `${spec.key}-${v.strength.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      const sku = `OIL-${spec.key.toUpperCase().replace(/[^A-Z0-9]/g, '')}-${v.strength.toUpperCase().replace(/[^A-Z0-9]/g, '')}`;
      const name = `${spec.name} - ${v.strength}`;
      const isCheapest = idx === 0;

      fileContent += `  makeOilVariant({\n`;
      fileContent += `    slug: "${slug}",\n`;
      fileContent += `    sku: "${sku}",\n`;
      fileContent += `    name: "${name}",\n`;
      fileContent += `    shortDescription: "${spec.name} (${spec.subtitle}). ${v.strength}.",\n`;
      fileContent += `    description: "${spec.name} liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",\n`;
      fileContent += `    longDescription: ${safeMonograph},\n`;
      fileContent += `    price: ${v.price},\n`;
      if (isCheapest) {
        fileContent += `    featured: true,\n`;
      }
      fileContent += `    images: ${constName},\n`;
      fileContent += `  }),\n`;
    });
    fileContent += `\n`;
  }

  fileContent += `];\n`;

  fs.writeFileSync(path.resolve(__dirname, '../src/lib/data/steroid-oils-products.ts'), fileContent, 'utf8');
  console.log('Successfully saved src/lib/data/steroid-oils-products.ts with all Steroid Oils products!');
}

main();
