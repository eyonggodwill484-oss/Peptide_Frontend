const fs = require('fs');
const path = require('path');

const WEGOVY_PEN_LONG_DESC = `## Wissenschaftliche Monographie zu Wegovy (Semaglutid 2.4 mg) – Der klinische Standard für Adipositastherapie

Wegovy (Wirkstoff: Semaglutid in der therapeutischen Höchstdosierung von 2.4 mg wöchentlich) ist die von der FDA, EMA und Swissmedic offiziell zugelassene subkutane Injektionstherapie für chronisches Gewichtsmanagement bei Erwachsenen und Jugendlichen mit Adipositas (BMI ≥30 kg/m²) oder Übergewicht (BMI ≥27 kg/m²) mit mindestens einer gewichtsbedingten Begleiterkrankung.

---

### Pharmakologischer Wirkungsquerschnitt & GLP-1-Rezeptoraktivierung

Semaglutid ist ein biotechnologisch hergestelltes Peptid, das zu 94% mit der Aminosäuresequenz des nativen humanen Glucagon-Like Peptide-1 übereinstimmt:
1. **Verlängerte Halbwertszeit (168 Stunden):** Die Anbindung einer C18-Fettsäuredisäure an Lysin 26 ermöglicht eine starke, reversible Bindung an Serumalbumin, was den renalen Abbau hemmt und eine einmal wöchentliche Gabe erlaubt.
2. **Elimination von Heißhunger:** Im Hypothalamus moduliert Wegovy neuronale Schaltkreise, senkt das Verlangen nach zucker- und fettreichen Lebensmitteln und steigert die postprandiale Sättigung.
3. **Magenkinetik:** Verzögert die Magenentleerung in den ersten postprandialen Stunden und dämpft Blutzucker- und Insulinspitzen.

---

### Das 5-Phasen-Titrationsschema (Klicktabelle & Dosisstufen)

| Phase | Wöchentliche Dosis | Packungsformat | Dauer & Funktion |
|---|---|---|---|
| **Phase 1 (Woche 1–4)** | **0.25 mg** | 4 Einweg-Pens | Initiierungsphase zum Schutz vor Magen-Darm-Irritationen |
| **Phase 2 (Woche 5–8)** | **0.50 mg** | 4 Einweg-Pens | Erste spürbare Appetitregulation |
| **Phase 3 (Woche 9–12)** | **1.00 mg** | 4 Einweg-Pens | Mittlere Dosissteigerung |
| **Phase 4 (Woche 13–16)** | **1.70 mg** | 4 Einweg-Pens | Vorbereitung auf die finale therapeutische Höchstdosis |
| **Phase 5 (Woche 17+)** | **2.40 mg** | 4 Einweg-Pens | Klinische Erhaltungs-Zieldosis für maximalen Fettverlust |

---

### Das bahnbrechende STEP-Studienprogramm

In den globalen Phase-3-Studien **STEP 1 bis STEP 8** mit über 4.500 Teilnehmern zeigte Wegovy:
- **14.9% bis 17.4% durchschnittlicher Gewichtsverlust:** Probanden verloren im Schnitt ca. 15 bis 18 kg Körpergewicht über 68 Wochen.
- **Kardiovaskuläre SELECT-Studie:** Erste Adipositas-Studie, die eine **20%-ige Reduktion schwerer kardiovaskulärer Ereignisse (MACE)** bei Patienten ohne Diabetes nachwies.
- **Körperzusammensetzung:** Primärer Verlust von schädlichem Viszeral- und Bauchfett bei weitgehendem Erhalt der fettfreien Skelettmuskelmasse.`;

const CAGRILINTIDE_LONG_DESC = `## Wissenschaftliche Monographie zu Cagrilintide – Das langwirksame Amylin-Analogon

Cagrilintide (Entwicklungscode: AM833) ist ein neuartiges, langwirksames synthetisches Analogon des pankreatischen Hormons Amylin. Während GLP-1 primär im Darm freigesetzt wird, wird Amylin physiologisch zusammen mit Insulin von den Betazellen des Pankreas sezerniert. Cagrilintide wirkt über einen völlig eigenständigen neuronalen Signalweg (Calcitonin/Amylin-Rezeptorkomplex) und bietet in Kombination mit GLP-1-Agonisten (wie in CagriSema) einen noch nie dagewesenen synergistischen Gewichtsverlust.

---

### Wirkungsmechanismus über Amylin-Rezeptoren

1. **Zentrale Aktivierung der Area postrema:** Cagrilintide bindet selektiv an Amylin-Rezeptoren im Hirnstamm und vermittelt ein intensives, langanhaltendes Sättigungsgefühl.
2. **Glukagon-Hemmung:** Unterdrückt die postprandiale Glukagonfreisetzung, ohne Hypoglykämien zu verursachen.
3. **Synergie mit GLP-1 (CagriSema-Effekt):** In Kombination mit Semaglutid erzielt Cagrilintide in Phase-2-Studien einen Gewichtsverlust von über **15.6% nach nur 32 Wochen** – deutlich schneller als jede Einzeltherapie.

---

### Spezifikationen & Rekonstitution

- **Purity:** ≥99.0% (HPLC-geprüft)
- **Form:** Lyophilisiertes Peptidpulver in sterilen 5mg / 10mg Vials
- **Lagerung:** Unrekonstituiert bei -20°C bis zu 24 Monate stabil; nach Rekonstitution mit BAC-Wasser bei 2°C–8°C für 30 Tage haltbar.`;

const MAZDUTIDE_LONG_DESC = `## Wissenschaftliche Monographie zu Mazdutide (IBI362) – Dualer GLP-1 / Glucagon Rezeptoragonist

Mazdutide (IBI362 / LY3305677) ist ein synthetisches Peptidmolekül, das auf der Sequenz des humanen Oxyntomodulins basiert. Es aktiviert als dualer Agonist gleichzeitig den **GLP-1-Rezeptor** und den **Glukagon-Rezeptor**.

---

### Das Oxyntomodulin-Wirkprinzip

- **GLP-1-Komponente:** Unterdrückt den Appetit und reguliert den Blutzuckerspiegel.
- **Glukagon-Komponente:** Steigert die Energieabgabe im Ruhezustand (Thermogenese) und fördert den Abbau von Leberfett.
- **Phase-3-Ergebnisse (GLORY-1):** Erzielte bis zu **14.4% Gewichtsabnahme** nach 48 Wochen und reduzierte den Leberfettgehalt um über **73%**.`;

const SURVODUTIDE_LONG_DESC = `## Wissenschaftliche Monographie zu Survodutide (BI 456906) – Dualer Agonist für Adipositas & MASH

Survodutide ist ein dualer Glukagon/GLP-1-Rezeptoragonist, der speziell für die simultane Behandlung von Adipositas und metabolischer Fettleberhepatitis (MASH / NASH) entwickelt wurde.

---

### Klinische Highlights & Wirkprofil

- **Leberregeneration:** In Phase-2-Studien erreichten bis zu **83% der Probanden mit MASH eine signifikante histologische Verbesserung der Leberfibrose** ohne Verschlechterung des Narbengewebes.
- **Gewichtsverlust:** Bis zu **19.0% Gewichtsreduktion** nach 46 Behandlungswochen.
- **Hochreine Formulierung:** Verfügbar in 2mg, 6mg, 10mg, 12mg und 20mg Vials für präzise Forschungsanwendungen.`;

const GLP_1_LONG_DESC = `## Wissenschaftliche Monographie zu GLP-1 (Glucagon-Like Peptide-1)

Natives und synthetisches GLP-1 (7-36 Amid) ist das zentrale gastrointestinale Inkretinhormon, das nach Nahrungsaufnahme von den enteroendokrinen L-Zellen des Dünndarms freigesetzt wird. Es steuert die postprandiale Glukosehomöostase, stimuliert die Insulinfreisetzung, hemmt Glukagon und reguliert das Hungerzentrum im Zentralnervensystem.

---

### Molekulare Spezifikationen & Forschungsstandards

- **Sequenz:** H-His-Ala-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Val-Ser-Ser-Tyr-Leu-Glu-Gly-Gln-Ala-Ala-Lys-Glu-Phe-Ile-Ala-Trp-Leu-Val-Lys-Gly-Arg-NH2
- **Reinheit:** ≥99.0% (HPLC-geprüft)
- **Lieferform:** Sterile Vials à 5mg / 15mg lyophilisiertes Pulver.`;

const varFile = path.resolve(__dirname, '../src/lib/data/variable-products.ts');
let varCode = fs.readFileSync(varFile, 'utf8');

// Update makeVariant signature if needed
if (!varCode.includes('longDescription?: string;')) {
  varCode = varCode.replace(
    'description: string;',
    'description: string;\n  longDescription?: string;'
  );
  varCode = varCode.replace(
    'description: opts.description,',
    'description: opts.description,\n    longDescription: opts.longDescription,'
  );
}

// Add long descriptions to wegovy-pen, cagrilintide, mazdutide, survodutide, glp-1
const injections = [
  { match: 'slug: "wegovy-pen-', desc: WEGOVY_PEN_LONG_DESC },
  { match: 'slug: "cagrilintide-', desc: CAGRILINTIDE_LONG_DESC },
  { match: 'slug: "mazdutide-', desc: MAZDUTIDE_LONG_DESC },
  { match: 'slug: "survodutide-', desc: SURVODUTIDE_LONG_DESC },
  { match: 'slug: "glp-1-', desc: GLP_1_LONG_DESC },
];

for (const inj of injections) {
  const safeDesc = JSON.stringify(inj.desc);
  const regex = new RegExp(`(${inj.match}[\\s\\S]*?description:\\s*"[^"]*",)`, 'g');
  varCode = varCode.replace(regex, `$1\n    longDescription: ${safeDesc},`);
}

fs.writeFileSync(varFile, varCode, 'utf8');
console.log('Successfully updated variable-products.ts with rich longDescription monographs!');
