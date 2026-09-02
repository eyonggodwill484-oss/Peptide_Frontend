const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../../New Products');

// Product target mapping
const PRODUCT_INFO = {
  'MOUNJARO': {
    name: 'Mounjaro (Tirzepatid)',
    slug: 'mounjaro-2-5mg-4pens',
    price: '€100',
    image: '/images/products/mounjaro/mounjaro-1.webp',
    category: 'Gewichtsverlust & Stoffwechsel',
    activeSubstance: 'Tirzepatid (Dualer GIP / GLP-1 Rezeptoragonist)'
  },
  'Ozempic': {
    name: 'Ozempic (Semaglutid)',
    slug: 'ozempic-0-25mg-4pens',
    price: '€100',
    image: '/images/products/ozempic/ozempic-1.webp',
    category: 'Gewichtsverlust & Stoffwechsel',
    activeSubstance: 'Semaglutid (GLP-1 Rezeptoragonist)'
  },
  'SAXENDA': {
    name: 'Saxenda (Liraglutid)',
    slug: 'saxenda-0-6mg-4pens',
    price: '€180',
    image: '/images/products/saxenda/saxenda-1.webp',
    category: 'Gewichtsverlust & Stoffwechsel',
    activeSubstance: 'Liraglutid (Täglicher GLP-1 Rezeptoragonist)'
  },
  'TRULICITY': {
    name: 'Trulicity (Dulaglutid)',
    slug: 'trulicity-0-75mg-4pens',
    price: '€180',
    image: '/images/products/trulicity/trulicity-1.webp',
    category: 'Gewichtsverlust & Stoffwechsel',
    activeSubstance: 'Dulaglutid (Wöchentliches GLP-1 Fusionsprotein)'
  },
  'VICTOZA': {
    name: 'Victoza (Liraglutid 6mg/ml)',
    slug: 'victoza-0-6mg-4pens',
    price: '€200',
    image: '/images/products/victoza/victoza-1.webp',
    category: 'Gewichtsverlust & Stoffwechsel',
    activeSubstance: 'Liraglutid (Diabetes & GLP-1 Therapie)'
  },
  'ZEPBOUND': {
    name: 'Zepbound (Tirzepatid zur Adipositastherapie)',
    slug: 'zepbound-2-5mg-4pens',
    price: '€160',
    image: '/images/products/zepbound/zepbound-1.webp',
    category: 'Gewichtsverlust & Stoffwechsel',
    activeSubstance: 'Tirzepatid (FDA/EMA-Zulassung für chronisches Gewichtsmanagement)'
  },
  'RYBELSUS': {
    name: 'Rybelsus (Orales Semaglutid)',
    slug: 'rybelsus-3mg-30tablets',
    price: '€180',
    image: '/images/products/rybelsus/rybelsus-1.webp',
    category: 'Gewichtsverlust & Stoffwechsel',
    activeSubstance: 'Orales Semaglutid mit SNAC-Resorptionsverstärker'
  },
  'RETATRUTIDE (Polaris peptides)': {
    name: 'Retatrutide (Polaris Peptides)',
    slug: 'retatrutide-polaris-4mg-10vials',
    price: '€100',
    image: '/images/products/retatrutide/retatrutide-1.webp',
    category: 'Gewichtsverlust & Stoffwechsel',
    activeSubstance: 'Retatrutide (Triple G Tri-Agonist: GLP-1 / GIP / Glucagon)'
  },
  'DUROMINE': {
    name: 'Duromine (Phentermin Kapseln)',
    slug: 'duromine-15mg-30capsules',
    price: '€90',
    image: '/images/products/duromine/duromine-1.webp',
    category: 'Gewichtsverlust & Stoffwechsel',
    activeSubstance: 'Phentermin Ionenaustauscherharz für 24h Appetitunterdrückung'
  },
  'Wegovy pill': {
    name: 'Wegovy Pill (Orales Semaglutid)',
    slug: 'wegovy-pill-1-5mg-pack',
    price: '€140',
    image: '/images/products/wegovy-pill/wegovy-pill-1.webp',
    category: 'Gewichtsverlust & Stoffwechsel',
    activeSubstance: 'Orales hochdosiertes Semaglutid für maximale Gewichtsreduktion'
  }
};

// Supplementary keyword banks for products without CSV or with few keywords
const SUPPLEMENTARY_KEYWORDS = {
  'DUROMINE': [
    'duromine kaufen', 'duromine erfahrungen', 'duromine 30mg erfahrungsberichte', 'duromine bestellen ohne rezept',
    'duromine 40mg wirkung', 'duromine gewichtsverlust', 'duromine nebenwirkungen', 'duromine vorher nachher',
    'duromine kapseln einnahme', 'duromine phentermin rezeptfrei', 'duromine 15mg dosierung', 'duromine forum deutsch',
    'duromine appetitzügler kaufen', 'duromine abnehmen erfahrungen', 'duromine wirkungsdauer', 'duromine online apotheke',
    'duromine diät erfahrungen', 'duromine schlafstörungen vermeiden', 'duromine preisvergleich', 'duromine wirkstoff phentermin',
    'wie schnell wirkt duromine', 'duromine dosierung morgens', 'duromine herzrasen', 'duromine bmi voraussetzung',
    'duromine fettverbrennung', 'duromine metabolismus', 'duromine stillstand gewicht', 'duromine langanhaltende wirkung'
  ],
  'RETATRUTIDE (Polaris peptides)': [
    'retatrutide kaufen', 'retatrutide erfahrungen', 'retatrutide dosierung tabelle', 'retatrutide polaris peptides',
    'retatrutide triple agonist', 'retatrutide abnehmen studienergebnisse', 'retatrutide vs tirzepatid', 'retatrutide rekonstitution',
    'retatrutide 4mg vial', 'retatrutide 10mg preis', 'retatrutide lyophilisat anwendung', 'retatrutide nebenwirkungen',
    'retatrutide fettabbau leber', 'retatrutide phase 3 ergebnisse', 'retatrutide glucagon wirkung', 'retatrutide thermogenese',
    'retatrutide subkutan injizieren', 'retatrutide zyklusdauer', 'retatrutide halbwertszeit', 'retatrutide peptid forschung',
    'retatrutide gewichtsverlust prozent', 'retatrutide blutzucker senken', 'retatrutide kauf online', 'retatrutide hplc zertifikat'
  ],
  'Wegovy pill': [
    'wegovy pille kaufen', 'wegovy tabletten erfahrungen', 'wann kommt die abnehmspritze als tablette', 'orales wegovy dosierung',
    'wegovy pillen preis', 'wegovy tablette vs spritze', 'wegovy 25mg tablette', 'orales semaglutid gewichtsverlust',
    'wegovy tablette nüchtern einnehmen', 'oasis 1 studie wegovy tablette', 'wegovy pille zulassung deutschland', 'wegovy tabletten nebenwirkungen',
    'wegovy tablette bestellen rezeptfrei', 'abnehmtablette wegovy erfahrungsberichte', 'wegovy pille wirkungsweise', 'orales semaglutid snac träger'
  ],
  'RYBELSUS': [
    'rybelsus 3mg erfahrungen', 'rybelsus 7mg dosierung', 'rybelsus 14mg gewichtsverlust', 'rybelsus einnahme morgens nüchtern',
    'rybelsus tabletten kaufen rezeptfrei', 'rybelsus preis deutschland', 'rybelsus vs ozempic unterschiede', 'rybelsus snac technologie',
    'rybelsus übelkeit vermeiden', 'rybelsus abnehmen dosierung tabelle', 'rybelsus langzeittherapie', 'rybelsus blutzucker senkung'
  ]
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cleanKeyword(kw) {
  let cleaned = kw.trim().replace(/^["']|["']$/g, '').trim();
  // Remove non-latin or non-german character strings
  if (/[\u0600-\u06FF\u0400-\u04FF\u4E00-\u9FFF]/.test(cleaned)) {
    return null;
  }
  if (cleaned.length < 3 || cleaned.length > 80) return null;
  if (/^\d+$/.test(cleaned)) return null;
  return cleaned;
}

function generateArticle(keyword, productKey) {
  const prod = PRODUCT_INFO[productKey];
  const capitalizedKw = keyword.charAt(0).toUpperCase() + keyword.slice(1);
  const slug = slugify(keyword);

  const title = `${capitalizedKw}: Ausführlicher Ratgeber, Anwendung & Erfahrungen`;
  const excerpt = `Alles Wissenswerte zu ${keyword}: Wirkungsweise, Dosierung, wissenschaftliche Hintergründe und wie Sie mit ${prod.name} optimale Ergebnisse erzielen.`;

  const content = `## ${capitalizedKw} – Wissenschaftliche Einordnung & Praxisleitfaden

Wenn Sie sich mit **${keyword}** beschäftigen, stehen verlässliche medizinische Informationen, klare Anwendungsprotokolle und wissenschaftlich fundierte Erkenntnisse an erster Stelle. Dieser ausführliche Leitfaden beleuchtet alle Aspekte rund um **${keyword}** im Kontext moderner Stoffwechseltherapien und Gewichtsmanagement-Peptide wie **[${prod.name}](/product/${prod.slug})**.

---

### Was bedeutet ${keyword} und wie funktioniert der Wirkmechanismus?

Das Themenfeld rund um **${keyword}** basiert primär auf der gezielten Aktivierung von Signalwegen im menschlichen Stoffwechsel. Bei modernen Präparaten wie **${prod.name}** (${prod.activeSubstance}) greifen folgende molekulare Mechanismen:

1. **Rezeptorspezifische Signaltransduktion:** Bindung an gastrointestinale und zerebrale Zielrezeptoren zur Dämpfung von Hunger- und Heißhungersignalen im Hypothalamus.
2. **Optimierung der Glukosehomöostase:** Glukoseabhängige Insulinsekretion zur Vermeidung postprandialer Blutzuckerspitzen und Unterdrückung überschüssiger Glukagonfreisetzung.
3. **Kinetische Magenregulation:** Sanfte Verzögerung der Magenentleerung, was ein langanhaltendes physiologisches Sättigungsgefühl erzeugt.
4. **Viszeraler Fettabbau:** Gezielte Mobilisierung von tiefem Speicherfett unter partiellem Schutz der fettfreien Muskelmasse.

---

### Dosierung, Titration & Klicktabellen für ${keyword}

Eine der wichtigsten Fragen bei **${keyword}** betrifft die korrekte Dosierung und das stufenweise Einschleichen (Titration). Um Nebenwirkungen wie leichte gastrointestinale Irritationen zu minimieren, gilt das folgende strukturierte Phasenmodell:

| Phase & Behandlungsabschnitt | Dosis & Einnahmeintervall | Therapieziel & klinischer Fokus |
|---|---|---|
| **Einstiegsphase (Woche 1–4)** | Niedrigste Initialdosis | Gewöhnung des Gastrointestinaltrakts & Rezeptor-Sensibilisierung |
| **Aufbauphase (Woche 5–8)** | Mittlere Dosissteigerung | Erste spürbare Appetitreduktion & Blutzuckernormalisierung |
| **Fortgeschrittene Phase (Woche 9–12)** | Höhere Dosisstufe | Kontinuierliche Fettverbrennung & Gewichtsabnahme |
| **Erhaltungsphase (Woche 13+)** | Therapeutische Zieldosis | Langfristige Gewichtsstabilisierung & metabolischer Schutz |

> [!TIP]
> **Praxis-Tipp zu ${keyword}:** Achten Sie während der gesamten Einnahme auf eine ausreichende Flüssigkeitszufuhr von mindestens 2.5 bis 3 Litern Wasser täglich und eine proteinreiche Ernährung zur Unterstützung der Muskelerhaltung.

---

### Klinische Studien & Evidenz zu ${keyword}

Umfangreiche internationale Studienprogramme (u. a. SURMOUNT, STEP, SCALE und PIONEER) belegen die außerordentliche Wirksamkeit moderner Inkretin-Mimetika:

- **Signifikanter Gewichtsverlust:** Probanden erreichten in klinischen Phase-3-Studien eine durchschnittliche Körpergewichtsreduktion von **15% bis über 22%** über einen Behandlungszeitraum von 52 bis 72 Wochen.
- **Kardiometabolische Verbesserungen:** Deutliche Senkung des HbA1c-Wertes, Normalisierung von Triglyceriden und LDL-Cholesterin sowie Reduktion des systolischen Blutdrucks.
- **Verringerung von Heißhungerattacken:** Probanden berichteten von einer signifikanten Abnahme des sogenannten "Food Noise" (permanente mentale Beschäftigung mit Nahrung).

---

### Häufige Fehler & Tipps für maximale Sicherheit bei ${keyword}

Bei der Recherche zu **${keyword}** sollten Anwender typische Anwendungsfehler vermeiden:
- **Zu schnelle Dosissteigerung:** Halten Sie sich stets an die empfohlenen 4-Wochen-Intervalle vor jeder Dosiserhöhung.
- **Fehlende Kühlketten-Einhaltung:** Ungeöffnete Injektionspens und lyophilisierte Vials müssen im Kühlschrank bei **2°C bis 8°C** gelagert werden.
- **Einseitige Ernährung:** Kombinieren Sie die Behandlung stets mit moderatem Krafttraining und ballaststoffreicher Kost.

---

### Fazit & Empfehlung zu ${keyword}

Zusammenfassend bietet **${keyword}** eine evidenzbasierte Grundlage für nachhaltigen Gewichtsverlust und verbesserte Stoffwechselgesundheit. Wenn Sie nach zertifizierter pharmazeutischer Qualität mit HPLC-Prüfzertifikat suchen, finden Sie mit **[${prod.name}](/product/${prod.slug})** eine bewährte und zuverlässige Lösung (ab **${prod.price}** im sicheren Expressversand verfügbar).

---

### Häufig gestellte Fragen (FAQ) zu ${keyword}

**Wie schnell sind erste Resultate bei ${keyword} spürbar?**
Die meisten Anwender bemerken eine spürbare Dämpfung des Appetits bereits innerhalb der ersten 24 bis 48 Stunden nach der ersten Gabe. Sichtbare Gewichtsveränderungen stellen sich typischerweise ab der zweiten bis dritten Behandlungswoche ein.

**Wo kann man qualitativ hochwertige Produkte zu ${keyword} erwerben?**
Im offiziellen Fachhandel erhalten Sie geprüfte Produkte wie **[${prod.name}](/product/${prod.slug})** mit garantierter Reinheit von über 99% und lückenloser Kühlketten-Logistik.`;

  return {
    id: `blog-kw-${slug}`,
    slug: slug,
    title: title,
    excerpt: excerpt,
    content: content,
    keyTakeaways: [
      `Umfassende wissenschaftliche Einordnung von ${keyword} im modernen Gewichtsmanagement.`,
      `Stufenweises 4-Phasen-Dosierungsschema für optimale Verträglichkeit und maximale Fettverbrennung.`,
      `Direkte Verfügbarkeit zertifizierter Präparate wie ${prod.name} mit HPLC-geprüfter Reinheit.`
    ],
    category: prod.category,
    tags: [keyword, prod.name.split(' (')[0], 'Gewichtsverlust', 'Dosierung', 'Erfahrungen'],
    author: {
      name: 'Dr. Klaus Weber',
      role: 'Fachberater für Stoffwechsel- & Peptidbiochemie',
      avatar: '/images/avatars/reviewer-5.png'
    },
    publishedAt: '2026-08-30',
    updatedAt: '2026-08-31',
    readingTimeMinutes: 6,
    coverImage: {
      src: prod.image,
      alt: `${title} - Leitfaden & Ratgeber`,
      width: 1200,
      height: 675
    },
    relatedProducts: [
      {
        name: prod.name,
        slug: prod.slug,
        price: prod.price,
        image: prod.image
      }
    ],
    faqs: [
      {
        question: `Wie schnell wirkt ${keyword}?`,
        answer: `Erste Appetitdämpfungen treten innerhalb der ersten 24 bis 48 Stunden ein; messbare Gewichtsverluste nach 2 bis 3 Wochen.`
      },
      {
        question: `Ist ${keyword} für langfristige Kuren geeignet?`,
        answer: `Ja, moderne GLP-1 und Tri-Agonisten sind für chronisches Gewichtsmanagement und langfristige metabolische Stabilität konzipiert.`
      }
    ]
  };
}

async function main() {
  console.log('Collecting all keywords from CSVs and supplementary lists...');
  const allKeywordsByProduct = {};

  const entries = fs.readdirSync(baseDir);
  entries.forEach(folder => {
    const folderPath = path.join(baseDir, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      if (!allKeywordsByProduct[folder]) allKeywordsByProduct[folder] = new Set();
      const files = fs.readdirSync(folderPath);
      const csvFiles = files.filter(f => f.endsWith('.csv'));
      csvFiles.forEach(csv => {
        const csvPath = path.join(folderPath, csv);
        const content = fs.readFileSync(csvPath, 'utf8');
        const lines = content.split('\n');
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          const parts = line.split(/[;\t,]/);
          if (parts.length > 0) {
            const cleaned = cleanKeyword(parts[0]);
            if (cleaned) {
              allKeywordsByProduct[folder].add(cleaned);
            }
          }
        }
      });
    }
  });

  // Add supplementary keywords
  for (const [prodKey, suppList] of Object.entries(SUPPLEMENTARY_KEYWORDS)) {
    if (!allKeywordsByProduct[prodKey]) allKeywordsByProduct[prodKey] = new Set();
    suppList.forEach(k => {
      const cleaned = cleanKeyword(k);
      if (cleaned) allKeywordsByProduct[prodKey].add(cleaned);
    });
  }

  // Create unique global articles
  const globalSlugs = new Set();
  const allBlogPosts = [];

  for (const [prodKey, kwSet] of Object.entries(allKeywordsByProduct)) {
    const kwList = [...kwSet];
    console.log(`Product "${prodKey}": ${kwList.length} keywords found`);

    for (const kw of kwList) {
      const slug = slugify(kw);
      if (!slug || globalSlugs.has(slug)) continue;
      globalSlugs.add(slug);

      const article = generateArticle(kw, prodKey);
      allBlogPosts.push(article);
    }
  }

  console.log(`\nTOTAL HIGH-QUALITY BLOG POSTS GENERATED: ${allBlogPosts.length}`);

  // Split into 5 modular batch files (around 100-110 posts each)
  const BATCH_SIZE = 110;
  const batches = [];
  for (let i = 0; i < allBlogPosts.length; i += BATCH_SIZE) {
    batches.push(allBlogPosts.slice(i, i + BATCH_SIZE));
  }

  console.log(`Splitting into ${batches.length} batch files...`);

  const batchImportNames = [];
  for (let b = 0; b < batches.length; b++) {
    const batchNum = b + 1;
    const batchVarName = `BLOG_POSTS_SEMRUSH_BATCH_${batchNum}`;
    batchImportNames.push(batchVarName);
    const batchFilename = path.resolve(__dirname, `../src/lib/data/blog-posts-semrush-batch${batchNum}.ts`);

    const fileContent = `import type { BlogPost } from "./blog-posts";\n\nexport const ${batchVarName}: BlogPost[] = ${JSON.stringify(batches[b], null, 2)};\n`;
    fs.writeFileSync(batchFilename, fileContent, 'utf8');
    console.log(`Saved ${batchFilename} with ${batches[b].length} articles`);
  }

  // Update blog-posts.ts to import and export all batches
  const mainBlogFile = path.resolve(__dirname, '../src/lib/data/blog-posts.ts');
  let mainBlogCode = fs.readFileSync(mainBlogFile, 'utf8');

  // Insert imports
  batchImportNames.forEach((varName, idx) => {
    const batchNum = idx + 1;
    const importStatement = `import { ${varName} } from "./blog-posts-semrush-batch${batchNum}";`;
    if (!mainBlogCode.includes(importStatement)) {
      mainBlogCode = importStatement + '\n' + mainBlogCode;
    }
  });

  // Insert into BLOG_POSTS array
  batchImportNames.forEach(varName => {
    if (!mainBlogCode.includes(`...${varName},`)) {
      mainBlogCode = mainBlogCode.replace(
        'export const BLOG_POSTS: BlogPost[] = [',
        `export const BLOG_POSTS: BlogPost[] = [\n  ...${varName},`
      );
    }
  });

  fs.writeFileSync(mainBlogFile, mainBlogCode, 'utf8');
  console.log('Successfully updated src/lib/data/blog-posts.ts with all Semrush SEO blog batches!');
}

main();
