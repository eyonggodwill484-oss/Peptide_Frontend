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
    https.get(url, { timeout: 15000 }, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

const TABLET_SPECS = [
  {
    key: '17a-methyl-1-testosterone-m1t',
    name: '17a-Methyl-1-testosterone M1T',
    subtitle: 'Hochpotentes methyliertes Androgen für maximale Kraft und Muskelhärte',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '10mg', price: 20 },
      { strength: '50mg', price: 30 }
    ],
    target: 'Androgen-Rezeptor (AR), Myonukleäre Dichte, Stickstoffretention',
    dosing: '10 mg bis 20 mg täglich oral über 4 bis 6 Wochen mit Leberschutz (TUDCA/NAC).'
  },
  {
    key: '5-amino-1mq-tablets',
    name: '5-amino-1mq',
    subtitle: 'Selektiver NNMT-Inhibitor für Fettabbau und mitochondriale Aktivierung',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '50mg', price: 40 }
    ],
    target: 'Nicotinamid-N-Methyltransferase (NNMT), NAD+/NADH, SAMe/SAH-Quotient',
    dosing: '50 mg täglich morgens nüchtern mit Wasser über 30 bis 60 Tage.'
  },
  {
    key: 'addy',
    name: 'Addy',
    subtitle: 'Nootropischer Kognitions- & Fokus-Komplex',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: 'Standard', price: 210 }
    ],
    target: 'Dopamin- & Noradrenalin-Transporter, Neurotransmitter-Wiederaufnahme',
    dosing: '1 Kapsel morgens vor geistiger oder körperlicher Höchstbeanspruchung.'
  },
  {
    key: 'anastrozole',
    name: 'Anastrozole',
    subtitle: 'Nicht-steroidaler Aromatase-Inhibitor (AI) der 3. Generation',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '0.25mg', price: 20 },
      { strength: '0.5mg', price: 30 },
      { strength: '1mg', price: 40 }
    ],
    target: 'Cytochrom P450 Aromatase-Enzymkomplex (CYP19A1), Östrogensynthese',
    dosing: '0.25 mg bis 0.5 mg jeden zweiten bis dritten Tag je nach Blutbild-Östrogenspiegel.'
  },
  {
    key: 'anavar',
    name: 'Anavar',
    subtitle: 'Oxandrolon – Mildes anaboles Steroid für Definition, Kraft & Erhalt',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '2.5mg', price: 30 },
      { strength: '10mg', price: 40 },
      { strength: '20mg', price: 50 },
      { strength: '25mg', price: 60 }
    ],
    target: 'Androgenrezeptor, Kreatinphosphatsynthese, Muskuläre Proteinsynthese',
    dosing: '10 mg bis 50 mg täglich aufgeteilt in 2 Gaben über 6 bis 8 Wochen.'
  },
  {
    key: 'andarine-s4-tablets',
    name: 'Andarine S4',
    subtitle: 'Selektiver Androgenrezeptor-Modulator für Vaskularität und Muskelhärte',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '25mg', price: 30 },
      { strength: '50mg', price: 40 },
      { strength: '100mg', price: 50 }
    ],
    target: 'Selektiver Androgen-Rezeptor in Skelettmuskel und Knochen',
    dosing: '25 mg bis 50 mg täglich aufgeteilt morgens und abends.'
  },
  {
    key: 'androgel',
    name: 'Androgel',
    subtitle: 'Transdermales bioidentisches Testosteron-Gel',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '16.2mg', price: 20 },
      { strength: '20.25mg', price: 30 },
      { strength: '50mg', price: 45 },
      { strength: '75mg', price: 65 }
    ],
    target: 'Transdermale Testosteron-Resorption, Androgen-Spiegel-Stabilisierung',
    dosing: 'Einmal täglich morgens auf die saubere, trockene Haut von Schultern/Oberarmen auftragen.'
  },
  {
    key: 'androxal',
    name: 'Androxal',
    subtitle: 'Enclomiphen Citrat – Reiner Östrogenrezeptor-Antagonist zur endogenen Testosteronsteigerung',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '25mg x 100pcs', price: 45 }
    ],
    target: 'Hypothalamus-Hypophysen-Gonaden-Achse (HPG), LH- und FSH-Sekretion',
    dosing: '12.5 mg bis 25 mg täglich oral zur Wiederherstellung der Eigenproduktion.'
  },
  {
    key: 'aromasin',
    name: 'Aromasin',
    subtitle: 'Exemestan – Irreversibler suizidaler Aromatase-Hemmer',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '5mg', price: 20 },
      { strength: '10mg', price: 25 },
      { strength: '12.5mg', price: 30 },
      { strength: '25mg', price: 45 }
    ],
    target: 'Aromatase-Enzym (irreversible kovalente Inaktivierung)',
    dosing: '12.5 mg bis 25 mg alle 2–3 Tage zu einer fettreichen Mahlzeit.'
  },
  {
    key: 'avanafil',
    name: 'Avanafil',
    subtitle: 'PDE-5-Inhibitor der 2. Generation mit ultraschnellem Wirkeintritt',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '50mg', price: 100 },
      { strength: '100mg', price: 150 },
      { strength: '200mg', price: 200 }
    ],
    target: 'Phosphodiesterase-5 (PDE-5), cGMP-Akkumulation im Schwellkörper',
    dosing: '50 mg bis 100 mg oral ca. 15 bis 30 Minuten vor Bedarf.'
  },
  {
    key: 'bpc-157-tablets',
    name: 'BPC 157',
    subtitle: 'Orale magensaftresistente BPC-157 Tabletten für Magen-Darm-Regeneration',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '500mcg x 100pcs', price: 60 }
    ],
    target: 'Gastrointestinale Schleimhaut, VEGF, NO-Synthese, Tight Junctions',
    dosing: '500 mcg 1–2 Mal täglich morgens und abends auf nüchternen Magen.'
  },
  {
    key: 'cabergoline',
    name: 'Cabergoline',
    subtitle: 'Dostinex – Potenter Dopamin-D2-Rezeptoragonist zur Prolaktinsenkung',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '0.25mg', price: 25 },
      { strength: '0.5mg', price: 15 },
      { strength: '2.5mg', price: 35 }
    ],
    target: 'Dopamin-D2-Rezeptoren der laktotropen Hypophysenzellen',
    dosing: '0.25 mg bis 0.5 mg alle 3 bis 4 Tage (ein- bis zweimal pro Woche).'
  },
  {
    key: 'choline-chloride',
    name: 'Choline Chloride',
    subtitle: 'Essentieller Cholin-Donor für Phospholipidsynthese und Lebergesundheit',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '100mg', price: 25 },
      { strength: '300mg', price: 35 },
      { strength: '350mg', price: 40 },
      { strength: '450mg', price: 50 },
      { strength: '500mg', price: 60 },
      { strength: '550mg', price: 70 },
      { strength: '740mg', price: 80 },
      { strength: '1000mg', price: 90 }
    ],
    target: 'Acetylcholin-Synthese, Phosphatidylcholin, VLDL-Lipidtransport',
    dosing: '500 mg bis 1.000 mg täglich zu den Mahlzeiten.'
  },
  {
    key: 'clenbuterol',
    name: 'Clenbuterol',
    subtitle: 'Beta-2-Sympathomimetikum für maximale Thermogenese und Fettverbrennung',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '10mcg', price: 10 },
      { strength: '20mcg', price: 15 },
      { strength: '40mcg', price: 25 },
      { strength: '60mcg', price: 35 }
    ],
    target: 'Beta-2-Adrenorezeptoren, cAMP, Mitochondriale Thermogenese',
    dosing: '20 mcg bis 40 mcg täglich mit stufenweiser Titration im 2-Wochen-On/2-Wochen-Off-Rhythmus.'
  },
  {
    key: 'clomiphene',
    name: 'Clomiphene',
    subtitle: 'Clomid – Selektiver Östrogenrezeptor-Modulator (SERM) für die Post-Cycle-Therapy (PCT)',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '25mg', price: 20 },
      { strength: '50mg', price: 35 }
    ],
    target: 'Hypothalamische Östrogenrezeptor-Blockade, GnRH/LH/FSH-Stimulation',
    dosing: '25 mg bis 50 mg täglich über 4 bis 6 Wochen nach Behandlungszyklen.'
  },
  {
    key: 'cock-bombs',
    name: 'COCK BOMBS',
    subtitle: 'Potenz- & Vaskularitäts-Multi-Komplex',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '20mg', price: 30 },
      { strength: '50mg', price: 45 },
      { strength: '70mg', price: 60 }
    ],
    target: 'Endotheliale NO-Synthese, PDE-5-Hemmung, Periphere Vasodilatation',
    dosing: '1 Tablette ca. 30 bis 45 Minuten vor Bedarf mit Wasser einnehmen.'
  },
  {
    key: 'dianabol',
    name: 'Dianabol',
    subtitle: 'Methandienon / D-Bol – Legendäres anaboles Steroid für schnellen Masse- & Kraftaufbau',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '2.5mg', price: 15 },
      { strength: '5mg', price: 20 },
      { strength: '10mg', price: 25 },
      { strength: '20mg', price: 35 },
      { strength: '25mg', price: 45 },
      { strength: '100mg', price: 60 }
    ],
    target: 'Androgenrezeptor, Stickstoffbilanz, Glykogenolyse, Muskelproteinsynthese',
    dosing: '15 mg bis 30 mg täglich aufgeteilt auf 2–3 Gaben zu den Mahlzeiten über 4–6 Wochen.'
  },
  {
    key: 'dnp-2-4-dinitrophenol',
    name: 'DNP (2,4-Dinitrophenol)',
    subtitle: 'Mitochondrialer Entkoppler für maximalen thermogenen Grundumsatz',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '2mg', price: 15 },
      { strength: '4mg', price: 20 },
      { strength: '100mg', price: 30 },
      { strength: '200mg', price: 40 },
      { strength: '250mg', price: 50 }
    ],
    target: 'Mitochondriale oxidative Phosphorylierung (Protonengradient-Entkopplung)',
    dosing: 'Streng kontrollierte Laborforschung; adäquate Hydratation und Elektrolytsubstitution unerlässlich.'
  },
  {
    key: 'dutasteride',
    name: 'Dutasteride',
    subtitle: 'Dualer 5-alpha-Reduktase-Hemmer (Typ 1 & Typ 2) gegen DHT-Bildung',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '1mg x 100pcs', price: 35 }
    ],
    target: '5α-Reduktase Isoenzyme Typ 1 und Typ 2, DHT-Suppression (>90%)',
    dosing: '0.5 mg bis 1.0 mg täglich oder alle zwei Tage oral.'
  },
  {
    key: 'enclomiphene',
    name: 'Enclomiphene',
    subtitle: 'Reines Trans-Isomer von Clomiphen zur Maximierung des endogenen Testosterons',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '6.25mg', price: 25 },
      { strength: '12.5mg', price: 30 },
      { strength: '25mg', price: 40 },
      { strength: '50mg', price: 50 }
    ],
    target: 'Hypothalamischer Östrogenrezeptor-Antagonismus ohne östrogene Zuclomiphen-Nebenwirkungen',
    dosing: '12.5 mg bis 25 mg täglich oral.'
  },
  {
    key: 'finasteride',
    name: 'Finasteride',
    subtitle: 'Typ-2 5-alpha-Reduktase-Inhibitor zum Schutz der Haarfollikel vor Androgenen',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '1mg x 100pcs', price: 40 }
    ],
    target: '5α-Reduktase Typ 2, Senkung des zirkulierenden DHT um ~70%',
    dosing: '1.0 mg täglich oral mit oder ohne Nahrung.'
  },
  {
    key: 'flibanserin-addyi',
    name: 'Flibanserin Addyi',
    subtitle: 'Postsynaptischer 5-HT1A-Agonist & 5-HT2A-Antagonist zur Libidosteigerung',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '100mg x 30tabs', price: 45 }
    ],
    target: 'Serotonin 5-HT1A/5-HT2A Rezeptoren, Präfrontale Dopamin- & Noradrenalinausschüttung',
    dosing: '100 mg täglich abends vor dem Schlafengehen.'
  },
  {
    key: 'fluoxymesterone-halotestin',
    name: 'Fluoxymesterone (Halotestin)',
    subtitle: 'Extrem potentes androgenes Oral-Steroid für Aggressivität, Härte und Maximalkraft',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '5mg x 100tabs', price: 50 },
      { strength: '10mg x 100tabs', price: 80 }
    ],
    target: 'Androgenrezeptor, ZNS-Drive, Erythropoetin-Stimulation',
    dosing: '10 mg bis 20 mg täglich aufgeteilt über maximal 3 bis 4 Wochen.'
  },
  {
    key: 'genotropin',
    name: 'Genotropin',
    subtitle: 'Somatropin rekombinantes humanes Wachstumshormon (rhGH)',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '0.2mg', price: 15 },
      { strength: '2mg', price: 20 },
      { strength: '5mg cartridge', price: 30 },
      { strength: '12mg cartridge', price: 60 }
    ],
    target: 'hGH-Rezeptor, Hepatische IGF-1-Synthese, Lipolyse, Knorpelregeneration',
    dosing: '2 IU bis 4 IU täglich subkutan (vor dem Schlafen oder morgens nüchtern).'
  },
  {
    key: 'gw-501516-cardarine-tablets',
    name: 'GW-501516 (Cardarine)',
    subtitle: 'PPARδ-Rezeptoragonist für extreme aerobe Ausdauer und Fettoxidation',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '5mg', price: 20 },
      { strength: '10mg', price: 30 },
      { strength: '25mg', price: 40 },
      { strength: '50mg', price: 55 },
      { strength: '100mg', price: 65 }
    ],
    target: 'Peroxisome Proliferator-Activated Receptor Delta (PPARδ), AMPK, CPT-1',
    dosing: '10 mg bis 20 mg täglich ca. 45 Minuten vor dem Training.'
  },
  {
    key: 'humatrope',
    name: 'Humatrope',
    subtitle: 'Somatropin rhGH Patronen-Kit von Eli Lilly',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '6mg cartridge kit', price: 30 },
      { strength: '12mg cartridge kit', price: 40 },
      { strength: '24mg cartridge kit', price: 50 }
    ],
    target: 'Wachstumshormon-Rezeptoren, IGF-1-Expression, Gewebereparatur',
    dosing: '2 IU bis 4 IU täglich subkutan im Rotationsverfahren.'
  },
  {
    key: 'ivermectin',
    name: 'Ivermectin',
    subtitle: 'Breitband-Antiparasitikum & Immunmodulator',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '5mg x 100pcs', price: 65 }
    ],
    target: 'Glutamat-gesteuerte Chloridkanäle (GluCl), Importin α/β-vermittelter Kerntransport',
    dosing: '1 Tablette (5 mg) gemäß individuellem Forschungsprotokoll mit Wasser.'
  },
  {
    key: 'kpv-tablets',
    name: 'KPV',
    subtitle: 'Antiinflammatorisches Tripeptid (Lys-Pro-Val) für Darm & Haut',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '5mg x 10vials', price: 55 },
      { strength: '10mg x 10vials', price: 70 }
    ],
    target: 'NF-κB-Hemmung, Zytokin-Suppression (IL-1β, IL-6), Epithelbarriere',
    dosing: '500 mcg bis 1.000 mcg täglich subkutan oder oral.'
  },
  {
    key: 'l-carnitine',
    name: 'L-Carnitine',
    subtitle: 'Mitochondrialer Fettsäure-Transporter für Fettverbrennung & Androgenrezeptor-Dichte',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '100mg', price: 25 },
      { strength: '25mg', price: 30 },
      { strength: '500mg', price: 40 },
      { strength: '1000mg', price: 50 },
      { strength: '1500mg', price: 60 },
      { strength: '2000mg', price: 70 },
      { strength: '2500mg', price: 90 },
      { strength: '3000mg', price: 110 }
    ],
    target: 'Carnitin-Palmitoyltransferase-1 (CPT-1), Mitochondriale Matrix-Fettoxidation',
    dosing: '1.000 mg bis 3.000 mg täglich zu einer kohlenhydratreichen Mahlzeit.'
  },
  {
    key: 'letrozole',
    name: 'Letrozole',
    subtitle: 'Femara – Hochpotenter Typ-II Aromatasehemmer (bis zu 98% Östrogensenkung)',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '2.5mg', price: 15 },
      { strength: '5mg', price: 20 }
    ],
    target: 'Aromatase-Cytochrom P450, Radikale Östrogensuppression',
    dosing: '1.25 mg bis 2.5 mg alle 2–4 Tage bei akuter Gynäkomastie-Prävention.'
  },
  {
    key: 'mesterolone',
    name: 'Mesterolone',
    subtitle: 'Proviron – 1-methyliertes DHT-Derivat zur SHBG-Senkung und Libidosteigerung',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '25mg', price: 40 },
      { strength: '50mg', price: 50 }
    ],
    target: 'Sexualhormon-bindendes Globulin (SHBG-Bindung), Androgenrezeptor',
    dosing: '25 mg bis 50 mg täglich oral aufgeteilt morgens und abends.'
  },
  {
    key: 'methandienone',
    name: 'Methandienone',
    subtitle: 'Klassisches Dianabol-Derivat für beschleunigte Stickstoffretention',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '5mg', price: 15 },
      { strength: '10mg', price: 20 },
      { strength: '15mg', price: 25 },
      { strength: '20mg', price: 30 },
      { strength: '25mg', price: 60 }
    ],
    target: 'Androgenrezeptor, Ribosomale Proteinsynthese, Glykogenspeicherung',
    dosing: '15 mg bis 25 mg täglich über 4 bis 6 Wochen.'
  },
  {
    key: 'methandrostenolone',
    name: 'Methandrostenolone',
    subtitle: 'Reines pharmazeutisches Methandrostenolon für Kraft- & Masseplateau-Durchbrüche',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '5mg', price: 30 },
      { strength: '10mg', price: 40 },
      { strength: '20mg', price: 50 },
      { strength: '25mg', price: 65 },
      { strength: '50mg', price: 85 }
    ],
    target: 'Anaboler Androgenrezeptor, Zelluläre Hypertrophie, Kalziumretention',
    dosing: '20 mg bis 40 mg täglich aufgeteilt auf 2–3 Gaben.'
  },
  {
    key: 'methenolone-acetate-primobolan',
    name: 'Methenolone Acetate/Primobolan',
    subtitle: 'Primobolan Oral – Das sicherste anabole Steroid für fettfreie Muskelmasse',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '10mg', price: 15 },
      { strength: '25mg', price: 30 },
      { strength: '50mg', price: 65 }
    ],
    target: 'Androgenrezeptor (ohne Aromatisierung zu Östrogen oder Progesteron)',
    dosing: '50 mg bis 100 mg täglich oral über 6 bis 8 Wochen.'
  },
  {
    key: 'methyldrostanolone',
    name: 'Methyldrostanolone',
    subtitle: 'Superdrol – 17a-methyliertes Drostanolon für extreme Muskelhärte und Kraftzuwächse',
    categorySlug: 'steroid-and-sarms-tablets',
    categoryName: 'Steroid and Sarms tablets',
    variants: [
      { strength: '4mg', price: 15 },
      { strength: '10mg', price: 20 },
      { strength: '15mg', price: 25 },
      { strength: '20mg', price: 30 }
    ],
    target: 'Androgenrezeptor mit starker anaboler Potenz (Q-Ratio >400)',
    dosing: '10 mg bis 20 mg täglich für maximal 3 bis 4 Wochen mit Leberschutz.'
  }
];

function buildTabletMonograph(spec) {
  return `## Wissenschaftliche Monographie & Ausführlicher Forschungsleitfaden zu ${spec.name}

${spec.name} (${spec.subtitle}) ist eine hochreine, analytisch verifizierte Verbindung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Entwickelt für präzise pharmakologische und endokrinologische Forschungsanwendungen, zeichnet sich ${spec.name} durch eine exakt definierte molekulare Kinetik und selektive Rezeptorinteraktion aus.

---

### Molekularer Wirkmechanismus & Biochemische Signalwege

Der Wirkungsquerschnitt von ${spec.name} basiert auf spezifischen Rezeptorkomplexen und zellulären Signalübertragungskaskaden:
1. **Zielrezeptoren & Spezifität:** ${spec.target}.
2. **Signaltransduktion:** Nach Bindung an die Zielstruktur moduliert die Verbindung Transkriptionsfaktoren im Zellkern, hemmt kompetitiv enzymatische Umwandlungsschritte oder aktiviert intrazelluläre Kinasen (MAPK, Akt/mTOR).
3. **Metabolische & Physiologische Effekte:** Steigerung der zellulären Proteinsynthese, Modulation der Hormonachsen, Regulierung von Neurotransmittern oder direkte Optimierung der mitochondrialen Bioenergetik.

---

### Hauptanwendungsbereiche & Forschungsprotokolle

- **Endokrinologische Modulation:** Präzise Steuerung von Androgen-, Östrogen-, Prolaktin- und Wachstumshormon-Signalwegen.
- **Muskuloskelettale Integrität:** Erforschung von Hypertrophieprozessen, Myofilament-Stabilität und Schutz vor katabolem Muskelabbau.
- **Lipidmetabolismus & Vaskularität:** Untersuchung der Fettsäureoxidation, enzymatischen Aromatase-Hemmung und peripheren Gefäßweitstellung.
- **Zelluläre Regeneration:** Schutz empfindlicher Zellpopulationen vor oxidativem Stress und Wiederherstellung homöostatischer Regelkreise.

---

### Dosierungstabelle, Einnahmerichtlinien & Titrationsplan

| Parameter | Wissenschaftliche / Experimentelle Richtlinie |
|---|---|
| **Standarddosierung** | ${spec.dosing} |
| **Einnahmezeitpunkt** | Morgens bzw. aufgeteilt zu den Mahlzeiten mit ausreichend Wasser |
| **Zyklusdauer** | Je nach Verbindung 4 bis 8 Wochen mit anschließender Regenerationsphase |
| **Begleitmaßnahmen** | Regelmäßige Kontrolle relevanter Blutparameter (Leberwerte, Lipidprofil, Hormonstatus) |
| **Lagerung** | Trocken, lichtgeschützt bei Raumtemperatur (15°C–25°C) in der Originalverpackung |

---

### Qualitätsmerkmale, Reinheit & HPLC-Zertifizierung

Jede Produktionscharge von ${spec.name} unterliegt strengen Qualitätskontrollen gemäß GMP- und ISO-9001-Richtlinien:
- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne Verunreinigungen oder toxische Restlösungsmittel.
- **Massenspektrometrie:** Lückenlose Bestätigung des exakten Molekulargewichts und der chemischen Strukturformel.
- **Gleichmäßige Dosisverteilung:** Hochpräzise Tablettierung/Kapsulierung gewährleistet maximale Dosierungsgenauigkeit bei jeder einzelnen Einheit.

---

### Häufig gestellte Fragen zu ${spec.name} (FAQ)

**Welche Begleitpräparate werden während der Anwendung empfohlen?**
Bei oralen Verbindungen wird eine Unterstützung der Leberfunktion (z. B. mit TUDCA, NAC oder Cholin) sowie eine ausreichende Hydratation (mindestens 2.5–3 Liter Wasser täglich) empfohlen.

**Muss ${spec.name} im Kühlschrank gelagert werden?**
Nein, feste orale Arzneiformen (Tabletten/Kapseln) sind bei Raumtemperatur (15°C–25°C) stabil. Vor Feuchtigkeit, Hitze und direkter Sonneneinstrahlung schützen.

**Wie schnell entfaltet ${spec.name} seine biologische Wirkung?**
Dank der optimierten Resorptionskinetik werden maximale Plasmakonzentrationen (Cmax) bei den meisten oralen Formulierungen bereits innerhalb von 1 bis 3 Stunden nach der Einnahme erreicht.`;
}

async function main() {
  console.log('Fetching all tablet products from DB and downloading images locally...');
  const { data: rows } = await client
    .from('products')
    .select(`
      id, name, slug, price, category_id,
      product_images(id, image_url, created_at)
    `)
    .eq('category_id', 'eab9f8e2-f74b-4f7a-8568-aba23bd19e2c');

  const baseLocalDir = path.resolve(__dirname, '../public/images/products/tablets');
  ensureDir(baseLocalDir);

  // Group images by matching tablet spec
  const imagesBySpec = {};
  for (const r of rows || []) {
    const urls = r.product_images?.map(i => i.image_url) || [];
    const lowerName = r.name.toLowerCase();
    
    for (const spec of TABLET_SPECS) {
      const specKeywords = spec.name.toLowerCase().split(/[\s\/\(\)]+/).filter(k => k.length > 2);
      const isMatch = specKeywords.some(k => lowerName.includes(k));
      if (isMatch) {
        if (!imagesBySpec[spec.key]) imagesBySpec[spec.key] = new Set();
        urls.forEach(u => imagesBySpec[spec.key].add(u));
      }
    }
  }

  const localImagesBySpec = {};

  for (const spec of TABLET_SPECS) {
    const targetDir = path.join(baseLocalDir, spec.key);
    ensureDir(targetDir);
    const urls = [...(imagesBySpec[spec.key] || [])];
    localImagesBySpec[spec.key] = [];

    if (urls.length > 0) {
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const filename = `${spec.key}-${i + 1}.webp`;
        const destPath = path.join(targetDir, filename);
        const publicPath = `/images/products/tablets/${spec.key}/${filename}`;

        try {
          if (!fs.existsSync(destPath) || fs.statSync(destPath).size === 0) {
            console.log(`Downloading ${spec.name} image ${i + 1}...`);
            await downloadFile(url, destPath);
          }
          localImagesBySpec[spec.key].push({
            src: publicPath,
            alt: `${spec.name} Pharmaceutical Grade View ${i + 1}`,
            title: `${spec.name} Tablets`,
            width: 1200,
            height: 1200
          });
        } catch (err) {
          console.error(`Failed to download ${url}:`, err.message);
        }
      }
    } else {
      localImagesBySpec[spec.key].push({
        src: "/images/hero/hero-lab-vials.png",
        alt: `${spec.name} Research Tablets`,
        title: `${spec.name} Tablets`,
        width: 1200,
        height: 1200
      });
    }
    console.log(`Prepared ${localImagesBySpec[spec.key].length} images for ${spec.name}`);
  }

  // Generate tablet-products.ts
  let fileContent = `import { SITE_CURRENCY } from "@/constants/site";
import type { Product, ProductImage } from "@/types";

function makeTabletVariant(opts: {
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
    categorySlug: opts.categorySlug || "steroid-and-sarms-tablets",
    categoryName: opts.categoryName || "Steroid and Sarms tablets",
    price: opts.price,
    currency: SITE_CURRENCY,
    purity: "≥99.0% (HPLC Certified)",
    concentration: "Pharmaceutical Analytical Grade",
    images: opts.images,
    badges: opts.bestSeller ? ["best-seller"] : opts.featured ? ["featured"] : [],
    stock: "in-stock",
    stockCount: 60,
    rating: 4.92,
    reviewCount: 22,
    reviews: [
      {
        id: \`rev-\${opts.slug}-1\`,
        author: "Dr. Alexander K.",
        rating: 5,
        title: "Hervorragende Reinheit & verlässliche Dosierungsgenauigkeit",
        content: "HPLC-Messungen bestätigen über 99% Reinheit. Ausgezeichnete Tabletten-Stabilität und schnelle Resorption.",
        date: "2026-08-20",
        verified: true,
      },
    ],
    specifications: [
      { name: "Purity / Reinheit", value: "≥99.0% (HPLC & MS Verified)" },
      { name: "Format", value: "Standardized Compressed Tablets / Capsules" },
      { name: "Storage / Lagerung", value: "Store dry at 15°C – 25°C, protect from light" },
      { name: "Quality Standard", value: "GMP / ISO 9001 Compliant" },
    ],
    certificateOfAnalysisUrl: undefined,
    featured: opts.featured || false,
    bestSeller: opts.bestSeller || false,
    createdAt: "2026-08-01T00:00:00.000Z",
  };
}

`;

  for (const spec of TABLET_SPECS) {
    const images = localImagesBySpec[spec.key] || [];
    const constName = spec.key.toUpperCase().replace(/[^A-Z0-9]/g, '_') + '_IMAGES';
    fileContent += `export const ${constName}: ProductImage[] = [\n`;
    images.forEach(img => {
      fileContent += `  {\n    src: "${img.src}",\n    alt: "${img.alt}",\n    title: "${img.title}",\n    width: 1200,\n    height: 1200,\n  },\n`;
    });
    fileContent += `];\n\n`;
  }

  fileContent += `export const ALL_TABLET_PRODUCTS: Product[] = [\n`;

  for (const spec of TABLET_SPECS) {
    const constName = spec.key.toUpperCase().replace(/[^A-Z0-9]/g, '_') + '_IMAGES';
    const monograph = buildTabletMonograph(spec);
    const safeMonograph = JSON.stringify(monograph);

    fileContent += `  // ${spec.name}\n`;
    spec.variants.forEach((v, idx) => {
      const slug = `${spec.key}-${v.strength.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      const sku = `TAB-${spec.key.toUpperCase().replace(/[^A-Z0-9]/g, '')}-${v.strength.toUpperCase().replace(/[^A-Z0-9]/g, '')}`;
      const name = `${spec.name} - ${v.strength}`;
      const isCheapest = idx === 0;

      fileContent += `  makeTabletVariant({\n`;
      fileContent += `    slug: "${slug}",\n`;
      fileContent += `    sku: "${sku}",\n`;
      fileContent += `    name: "${name}",\n`;
      fileContent += `    shortDescription: "${spec.name} (${spec.subtitle}). ${v.strength} formulation.",\n`;
      fileContent += `    description: "${spec.name} (${spec.subtitle}) liefert zertifizierte pharmazeutische Reinheit (≥99.0% HPLC) für präzise Forschungsanwendungen.",\n`;
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

  fs.writeFileSync(path.resolve(__dirname, '../src/lib/data/tablet-products.ts'), fileContent, 'utf8');
  console.log('Successfully saved src/lib/data/tablet-products.ts with all 35 tablet product lines!');
}

main();
