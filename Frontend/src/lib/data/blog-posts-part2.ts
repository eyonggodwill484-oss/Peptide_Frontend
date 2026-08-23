import type { BlogPost } from "./blog-posts";

export const BLOG_POSTS_PART2: BlogPost[] = [
  // 6. welche zuckerwerte sind normal
  {
    id: "kw-welche-zuckerwerte-sind-normal",
    slug: "welche-zuckerwerte-sind-normal",
    title: "Welche Zuckerwerte sind normal? Die vollständige Blutzuckertabelle",
    excerpt: "Welche Zuckerwerte sind normal? Detaillierte Übersicht für Nüchternwerte, postprandiale Werte nach 1 und 2 Stunden sowie HbA1c.",
    category: "Gewichtsverlust & Stoffwechsel",
    tags: ["welche zuckerwerte sind normal", "Blutzuckertabelle", "Normwerte", "Glukose"],
    author: { name: "Dr. Klaus Weber", role: "Stoffwechselbiochemiker", avatar: "/images/avatars/reviewer-5.png" },
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    readingTimeMinutes: 8,
    coverImage: { src: "/images/hero/hero-lab-vials.png", alt: "Welche Zuckerwerte sind normal - Labormessung", width: 1200, height: 675 },
    keyTakeaways: [
      "Nüchternglukose von 70 bis 99 mg/dl gilt als optimal.",
      "Werte zwischen 100 und 125 mg/dl deuten auf eine gestörte Nüchternglukose (Prädiabetes) hin.",
      "Für Diabetiker gilt meist ein postprandialer Zielwert von unter 160–180 mg/dl."
    ],
    content: `
## Welche Zuckerwerte sind normal? Orientierung für den Alltag

Die Frage **welche Zuckerwerte sind normal** bildet das Fundament jeder Stoffwechselvorsorge. Ein gesunder Körper hält die Glukosekonzentration im Blut in einem engen Korridor, um Gehirn und rote Blutkörperchen konstant mit Energie zu versorgen, ohne die Gefäßwände zu schädigen.

---

## Referenztabelle: Zuckerwerte bei Erwachsenen

| Messzeitpunkt | Gesunder Mensch | Prädiabetes | Diabetes mellitus |
| :--- | :--- | :--- | :--- |
| **Nüchtern (Morgens)** | **70 – 99 mg/dl** (3,9 – 5,5 mmol/l) | **100 – 125 mg/dl** (5,6 – 6,9 mmol/l) | **≥ 126 mg/dl** (≥ 7,0 mmol/l) |
| **1h nach Mahlzeit** | **< 160 mg/dl** (< 8,9 mmol/l) | **160 – 199 mg/dl** | **≥ 200 mg/dl** |
| **2h nach Mahlzeit** | **< 140 mg/dl** (< 7,8 mmol/l) | **140 – 199 mg/dl** | **≥ 200 mg/dl** |
| **Vor dem Schlafen** | **100 – 120 mg/dl** | 120 – 140 mg/dl | > 140 mg/dl |

Für eine detaillierte Erklärung, warum Sie gerade 120 Minuten nach dem Essen prüfen sollten, lesen Sie [warum 2 Stunden nach dem Essen Blutzucker messen](/blog/warum-2-stunden-nach-essen-blutzucker-messen). Zur richtigen Ernährungsauswahl hilft unsere [Was essen bei Diabetes 2 Tabelle](/blog/was-essen-bei-diabetes-2-tabelle).
    `,
    relatedProducts: [
      { name: "Foundational Research Kit", slug: "foundational-research-kit", price: "€129.00", image: "/images/products/foundational-research-kit.png" }
    ]
  },

  // 7. welches gemüse bei diabetes
  {
    id: "kw-welches-gemuese-bei-diabetes",
    slug: "welches-gemuese-bei-diabetes",
    title: "Welches Gemüse bei Diabetes? Die 10 besten Sorten für niedrigen Blutzucker",
    excerpt: "Welches Gemüse bei Diabetes schützt vor Blutzuckerspitzen? Erfahren Sie, warum Brokkoli, Spinat und Zucchini ideal zum Abnehmen sind.",
    category: "Gewichtsverlust & Stoffwechsel",
    tags: ["welches gemüse bei diabetes", "Brokkoli", "Spinat", "Ballaststoffe", "Ernährung"],
    author: { name: "Dr. Elena Vance", role: "Biochemikerin", avatar: "/images/avatars/reviewer-1.png" },
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    readingTimeMinutes: 8,
    coverImage: { src: "/images/laboratory-supplies-medical-work.jpg", alt: "Welches Gemüse bei Diabetes", width: 1200, height: 675 },
    keyTakeaways: [
      "Stärkearmes Gemüse hat praktisch keinen Einfluss auf den Blutzucker.",
      "Sulforaphan in Brokkoli wirkt antientzündlich auf Gefäßinnenwände.",
      "Gekochte Knollen wie Pastinaken und Mais sollten dosiert werden."
    ],
    content: `
## Welches Gemüse bei Diabetes am besten geeignet ist

Gemüse ist die wichtigste Nährstoffquelle für Diabetiker. Doch **welches Gemüse bei Diabetes** liefert die meisten bioaktiven Schutzstoffe, ohne den Blutzuckerspiegel anzuheben?

### Die Top 5 Gemüsesorten:
1. **Brokkoli & Blumenkohl**: Extrem ballaststoffreich, reich an Sulforaphan.
2. **Blattspinat**: Höchste Dichte an organischem Magnesium (siehe auch [welches Magnesium bei Diabetes Typ 2](/blog/welches-magnesium-bei-diabetes-typ-2)).
3. **Zucchini**: Unter 3g Kohlenhydrate auf 100g, ideal als Nudelersatz (Zoodles).
4. **Spargel**: Entwässernd und darmreinigend.
5. **Gurken**: Kalorienarm und feuchtigkeitsspendend.

Kombinieren Sie diese Gemüsesorten mit Low-Carb Backwaren wie in unserem Guide [welches Mehl für Diabetiker](/blog/welches-mehl-fuer-diabetiker) beschrieben.
    `,
    relatedProducts: [
      { name: "Recovery Complex Blend 10mg", slug: "recovery-complex-blend-10mg", price: "€69.90", image: "/images/products/recovery-complex-blend-10mg.png" }
    ]
  },

  // 8. wie lange dauern sehstörungen bei diabetes
  {
    id: "kw-wie-lange-dauern-sehstoerungen-bei-diabetes",
    slug: "wie-lange-dauern-sehstoerungen-bei-diabetes",
    title: "Wie lange dauern Sehstörungen bei Diabetes? Ursachen & Augenregeneration",
    excerpt: "Wie lange dauern Sehstörungen bei Diabetes nach einer Blutzuckerentgleisung? Warum osmotische Linsenveränderungen reversibel sind und wann diabetische Retinopathie droht.",
    category: "Gewichtsverlust & Stoffwechsel",
    tags: ["wie lange dauern sehstörungen bei diabetes", "Sehstörungen", "Diabetische Retinopathie", "Augen"],
    author: { name: "Dr. Marc Dubois", role: "Senior Chemist", avatar: "/images/avatars/reviewer-2.png" },
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    readingTimeMinutes: 8,
    coverImage: { src: "/images/covid19-vaccine-vials-syringe.jpg", alt: "Wie lange dauern Sehstörungen bei Diabetes", width: 1200, height: 675 },
    keyTakeaways: [
      "Akute Unschärfe durch osmotische Wassereinlagerung in die Augenlinse bildet sich innerhalb von 2 bis 6 Wochen nach Blutzuckernormalisierung zurück.",
      "Neue Brillen sollten erst angepasst werden, wenn der Blutzucker über 4 Wochen stabil eingestellt ist.",
      "Dauerhafte Gefäßschäden (diabetische Retinopathie) erfordern eine augenärztliche Laser- oder Anti-VEGF-Therapie."
    ],
    content: `
## Wie lange dauern Sehstörungen bei Diabetes?

Plötzlich verschwommenes Sehen gehört zu den häufigsten Erstsymptomen bei entgleistem Blutzucker. Betroffene fragen sich besorgt: **Wie lange dauern Sehstörungen bei Diabetes** und bleibt das Sehvermögen dauerhaft beeinträchtigt?

---

## Warum hoher Blutzucker die Sehkraft trübt

Bei Glukosewerten über 200 mg/dl diffundiert Glukose in die Augenlinse und wird dort über den Polyol-Stoffwechselweg enzymatisch zu **Sorbit** umgewandelt. Sorbit kann die Linse nicht schnell verlassen und zieht osmotisch Wasser an. Die Linse quillt auf und verändert ihre Brechkraft (häufig vorübergehende Kurzsichtigkeit).

Sobald der Blutzuckerspiegel durch Ernährungsumstellung und Bewegung dauerhaft stabilisiert wird, normalisiert sich der Flüssigkeitshaushalt der Linse schrittweise **innerhalb von 2 bis 6 Wochen**.

Um den Blutzucker schnell zu stabilisieren, meiden Sie gefährliche Lebensmittel laut unserem Leitfaden [was sollte man als Diabetiker nicht essen](/blog/was-sollte-man-als-diabetiker-nicht-essen).
    `,
    relatedProducts: [
      { name: "BPC-157 Research Peptide (5mg)", slug: "bpc-157-research-peptide-5mg", price: "€44.90", image: "/images/products/bpc-157-research-peptide-5mg.png" },
      { name: "Foundational Research Kit", slug: "foundational-research-kit", price: "€129.00", image: "/images/products/foundational-research-kit.png" }
    ]
  },

  // 9. welches bier bei diabetes 2
  {
    id: "kw-welches-bier-bei-diabetes-2",
    slug: "welches-bier-bei-diabetes-2",
    title: "Welches Bier bei Diabetes 2? Diätbier, alkoholfrei & Kohlenhydrat-Check",
    excerpt: "Welches Bier bei Diabetes 2 ist unbedenklich? Pils, Weizen, alkoholfreies Bier und kohlenhydratreduziertes Diät-Bier im Nährwert-Vergleich.",
    category: "Gewichtsverlust & Stoffwechsel",
    tags: ["welches bier bei diabetes 2", "Bier", "Alkohol", "Maltose", "Blutzucker"],
    author: { name: "Prof. Anthony Reed", role: "Pharmakologe", avatar: "/images/avatars/reviewer-3.png" },
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    readingTimeMinutes: 8,
    coverImage: { src: "/images/black-lab-scientist-monitoring-chemical-reaction-compound-molecules-working-rd-strategy.jpg", alt: "Welches Bier bei Diabetes 2", width: 1200, height: 675 },
    keyTakeaways: [
      "Klassisches Weizenbier und Helles enthalten bis zu 15g schnell verwertbare Maltose pro Glas.",
      "Speziell vergorene Diät-Biere / kohlenhydratarme Biere enthalten unter 1g Kohlenhydrate pro 100ml.",
      "Alkoholfreies Bier enthält oft deutlich mehr unverzuckerte Restkohlenhydrate als normales Bier."
    ],
    content: `
## Welches Bier bei Diabetes 2 darf man trinken?

Für viele gehört ein kühles Feierabendbier zur Lebensqualität. Doch **welches Bier bei Diabetes 2** lässt den Glukosespiegel nicht eskalieren? 

Bier wird nicht umsonst als 'flüssiges Brot' bezeichnet: Beim Brauprozess entsteht durch die Verzuckerung von Getreidestärke **Maltose (Malzzucker)**, die einen höheren glykämischen Index als normaler Haushaltszucker hat (GI > 100).

---

## Biersorten im Kohlenhydrat-Vergleich (pro 500ml Flasche)

| Biersorte | Kohlenhydrate | Kalorien | Bewertung bei Diabetes Typ 2 |
| :--- | :--- | :--- | :--- |
| **Hefeweizen** | **ca. 16 – 18g** | ca. 220 kcal | 🔴 Extrem hoher Blutzuckeranstieg |
| **Pilsener (herb)** | **ca. 12 – 14g** | ca. 210 kcal | 🟡 In kleinen Mengen |
| **Alkoholfreies Bier** | **ca. 20 – 26g** | ca. 130 kcal | 🔴 Hohe Kohlenhydratlast! |
| **Kohlenhydratarmes Spezialbier / Diätbier** | **< 3,5g** | ca. 140 kcal | 🟢 Beste Wahl für Diabetiker |

Für weitere Tipps zu Getränken am Abend lesen Sie auch [welche alkoholischen Getränke bei Diabetes Typ 2](/blog/welche-alkoholischen-getraenke-bei-diabetes-typ-2) und [was essen Diabetiker abends](/blog/was-essen-diabetiker-abends).
    `,
    relatedProducts: [
      { name: "Foundational Research Kit", slug: "foundational-research-kit", price: "€129.00", image: "/images/products/foundational-research-kit.png" }
    ]
  },

  // 10. wie ist der normale blutzuckerwert
  {
    id: "kw-wie-ist-der-normale-blutzuckerwert",
    slug: "wie-ist-der-normale-blutzuckerwert",
    title: "Wie ist der normale Blutzuckerwert? Alle Tabellen von morgens bis abends",
    excerpt: "Wie ist der normale Blutzuckerwert im Tagesprofil? Medizinische Grenzwerte vor dem Essen, nach den Mahlzeiten und vor dem Schlafen.",
    category: "Gewichtsverlust & Stoffwechsel",
    tags: ["wie ist der normale blutzuckerwert", "Blutzucker", "Tagesprofil", "Gesundheit"],
    author: { name: "Dr. Klaus Weber", role: "Stoffwechselforscher", avatar: "/images/avatars/reviewer-5.png" },
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    readingTimeMinutes: 7,
    coverImage: { src: "/images/hero/hero-lab-vials.png", alt: "Wie ist der normale Blutzuckerwert", width: 1200, height: 675 },
    keyTakeaways: [
      "Morgens nüchtern: 70–99 mg/dl.",
      "Vor den Hauptmahlzeiten: 80–110 mg/dl.",
      "Vor dem Schlafengehen: 100–120 mg/dl zur Vermeidung nächtlicher Hypoglykämien."
    ],
    content: `
## Wie ist der normale Blutzuckerwert im Tagesverlauf?

Wer seine Stoffwechselgesundheit überprüfen möchte, fragt sich: **Wie ist der normale Blutzuckerwert** über den gesamten 24-Stunden-Zyklus? 

Bei gesunden Menschen sorgt die feinfühlige Abstimmung von Insulin und Glukagon dafür, dass der Blutzuckerspiegel selten unter 60 mg/dl fällt und auch nach schweren Mahlzeiten 140 mg/dl kaum überschreitet.

Prüfen Sie auch [welche Zuckerwerte sind normal](/blog/welche-zuckerwerte-sind-normal) sowie [wie hoch darf der Blutzuckerspiegel sein](/blog/wie-hoch-darf-der-blutzuckerspiegel-sein).
    `,
    relatedProducts: [
      { name: "Advanced Reconstitution Kit", slug: "advanced-reconstitution-kit", price: "€29.90", image: "/images/products/advanced-reconstitution-kit.png" }
    ]
  },

  // 11. wie viele diabetes typen gibt es
  {
    id: "kw-wie-viele-diabetes-typen-gibt-es",
    slug: "wie-viele-diabetes-typen-gibt-es",
    title: "Wie viele Diabetes Typen gibt es? Von Typ 1 bis Typ 5 im Detail",
    excerpt: "Wie viele Diabetes Typen gibt es wirklich? Erfahren Sie alles über die 5 Subtypen des Erwachsenendiabetes (ANDIS-Studie) und seltene Formen.",
    category: "Gewichtsverlust & Stoffwechsel",
    tags: ["wie viele diabetes typen gibt es", "Diabetes Subtypen", "ANDIS", "Endokrinologie"],
    author: { name: "Prof. Anthony Reed", role: "Endokrinologe", avatar: "/images/avatars/reviewer-3.png" },
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    readingTimeMinutes: 8,
    coverImage: { src: "/images/microscope-dna.jpg", alt: "Wie viele Diabetes Typen gibt es", width: 1200, height: 675 },
    keyTakeaways: [
      "Klassisch unterscheidet man 4 Hauptgruppen: Typ 1, Typ 2, Schwangerschaftsdiabetes und spezifische Typen.",
      "Die moderne Cluster-Forschung unterteilt Typ 2 in 5 distinkte Subtypen (SAID, SIDD, SIRD, MOD, MARD).",
      "SIRD (schwer insulinresistenter Diabetes) hat das höchste Risiko für Nierenschäden und profitiert besonders von GLP-1-Rezeptor-Peptiden."
    ],
    content: `
## Wie viele Diabetes Typen gibt es nach neuesten wissenschaftlichen Erkenntnissen?

Die traditionelle Einteilung in Typ 1 und Typ 2 greift zu kurz. Wenn Forscher fragen, **wie viele Diabetes Typen gibt es**, verweisen moderne Diabetologen auf die wegweisende schwedische **ANDIS-Studie**, die den Diabetes in 5 präzise molekulare Subtypen unterteilt.

Lesen Sie hierzu auch unseren Überblicksartikel [welche Diabetes Typen gibt es](/blog/welche-diabetes-typen-gibt-es).
    `,
    relatedProducts: [
      { name: "Foundational Research Kit", slug: "foundational-research-kit", price: "€129.00", image: "/images/products/foundational-research-kit.png" }
    ]
  },

  // 12. was darf man als diabetiker essen
  {
    id: "kw-was-darf-man-als-diabetiker-essen",
    slug: "was-darf-man-als-diabetiker-essen",
    title: "Was darf man als Diabetiker essen? Gesunder Genuss ohne Einschränkung",
    excerpt: "Was darf man als Diabetiker essen? Köstliche Rezepte, ballaststoffreiche Lebensmittel und wie Sie Mahlzeiten perfekt zusammenstellen.",
    category: "Gewichtsverlust & Stoffwechsel",
    tags: ["was darf man als diabetiker essen", "Ernährung", "Rezepte", "Genuss"],
    author: { name: "Dr. Elena Vance", role: "Biochemikerin", avatar: "/images/avatars/reviewer-1.png" },
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    readingTimeMinutes: 8,
    coverImage: { src: "/images/female-researcher-laboratory-with-safety-glasses-test-tubes.jpg", alt: "Was darf man als Diabetiker essen", width: 1200, height: 675 },
    keyTakeaways: [
      "Diabetikerkost bedeutet heute gesunde mediterrane Vollwertkost statt fader Verbote.",
      "Proteine und gesunde Fette mit buntem Gemüse als Basis jeder Hauptmahlzeit.",
      "Backen und Kochen mit Mandelmehl und Erythrit erlaubt uneingeschränkten Genuss."
    ],
    content: `
## Was darf man als Diabetiker essen: Vielfalt statt Verzicht

Die Diagnose Diabetes bedeutet keineswegs das Ende kulinarischer Freuden. Wer sich fragt, **was darf man als Diabetiker essen**, wird überrascht sein, wie reichhaltig und geschmackvoll eine blutzuckersenkende Ernährung ist.

Nutzen Sie unsere [Was essen bei Diabetes 2 Tabelle](/blog/was-essen-bei-diabetes-2-tabelle) und entdecken Sie [welcher Kuchen bei Diabetes Typ 2](/blog/welcher-kuchen-bei-diabetes-typ-2) für süße Momente sorgt.
    `,
    relatedProducts: [
      { name: "Foundational Research Kit", slug: "foundational-research-kit", price: "€129.00", image: "/images/products/foundational-research-kit.png" }
    ]
  },

  // 13. welches gemüse für diabetiker
  {
    id: "kw-welches-gemuese-fuer-diabetiker",
    slug: "welches-gemuese-fuer-diabetiker",
    title: "Welches Gemüse für Diabetiker? Die besten Vitalstoff-Booster",
    excerpt: "Welches Gemüse für Diabetiker die Fettverbrennung maximiert und Heißhunger stoppt: Alles über Zucchini, Brokkoli und Artischocken.",
    category: "Gewichtsverlust & Stoffwechsel",
    tags: ["welches gemüse für diabetiker", "Gemüse", "Vitalstoffe", "Abnehmen"],
    author: { name: "Dr. Marc Dubois", role: "Senior Chemist", avatar: "/images/avatars/reviewer-2.png" },
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    readingTimeMinutes: 7,
    coverImage: { src: "/images/laboratory-supplies-medical-work.jpg", alt: "Welches Gemüse für Diabetiker", width: 1200, height: 675 },
    keyTakeaways: [
      "Artischocken enthalten Inulin, das die Bifidobakterien im Darm nährt.",
      "Zucchini und Gurken können als kalorienfreie Füllstoffe genutzt werden.",
      "Bitterstoffe in Chicorée und Rucola aktivieren die körpereigene Fettverdauung."
    ],
    content: `
## Welches Gemüse für Diabetiker besonders wertvoll ist

Gemüse ist die Grundlage jeder metabolischen Therapie. Bei der Auswahl, **welches Gemüse für Diabetiker** am wirksamsten ist, stehen Bitterstoffpflanzen und lösliche Ballaststoffe ganz oben.

Ergänzen Sie Ihr Wissen mit unserem Guide über [welches Gemüse bei Diabetes Typ 2 essen](/blog/welches-gemuese-bei-diabetes-typ-2-essen).
    `,
    relatedProducts: [
      { name: "Recovery Complex Blend 10mg", slug: "recovery-complex-blend-10mg", price: "€69.90", image: "/images/products/recovery-complex-blend-10mg.png" }
    ]
  },

  // 14. wie hoch darf blutzucker nach dem essen sein
  {
    id: "kw-wie-hoch-darf-blutzucker-nach-dem-essen-sein",
    slug: "wie-hoch-darf-blutzucker-nach-dem-essen-sein",
    title: "Wie hoch darf der Blutzucker nach dem Essen sein? Spitzenwerte kontrollieren",
    excerpt: "Wie hoch darf Blutzucker nach dem Essen sein? Der Unterschied zwischen 1-Stunden- und 2-Stunden-Werten und wann Gefahr droht.",
    category: "Gewichtsverlust & Stoffwechsel",
    tags: ["wie hoch darf blutzucker nach dem essen sein", "Blutzuckerspitzen", "Mahlzeit", "Insulin"],
    author: { name: "Dr. Klaus Weber", role: "Stoffwechselforscher", avatar: "/images/avatars/reviewer-5.png" },
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    readingTimeMinutes: 8,
    coverImage: { src: "/images/hero/hero-lab-vials.png", alt: "Wie hoch darf Blutzucker nach dem Essen sein", width: 1200, height: 675 },
    keyTakeaways: [
      "1 Stunde nach dem Essen: Idealerweise unter 160 mg/dl.",
      "2 Stunden nach dem Essen: Unter 140 mg/dl bei Gesunden, unter 180 mg/dl bei Diabetikern.",
      "Dauerhafte Werte über 200 mg/dl schädigen die Gefäßinnenwand."
    ],
    content: `
## Wie hoch darf Blutzucker nach dem Essen sein?

Nach einer Mahlzeit steigt der Glukosewert physiologisch an. Doch **wie hoch darf Blutzucker nach dem Essen sein**, ohne dass Gefäße und Organe geschädigt werden?

Lesen Sie ausführliche Details in [warum 2 Stunden nach dem Essen Blutzucker messen](/blog/warum-2-stunden-nach-essen-blutzucker-messen) und [wie hoch darf der Blutzuckerspiegel sein](/blog/wie-hoch-darf-der-blutzuckerspiegel-sein).
    `,
    relatedProducts: [
      { name: "Foundational Research Kit", slug: "foundational-research-kit", price: "€129.00", image: "/images/products/foundational-research-kit.png" }
    ]
  },

  // 15. wie hoch ist der zuckerwert normal
  {
    id: "kw-wie-hoch-ist-der-zuckerwert-normal",
    slug: "wie-hoch-ist-der-zuckerwert-normal",
    title: "Wie hoch ist der Zuckerwert normal? Der schnelle Check",
    excerpt: "Wie hoch ist der Zuckerwert normal? Alles Wichtige zu Glukosewerten, HbA1c und wie Sie Fehlmessungen vermeiden.",
    category: "Gewichtsverlust & Stoffwechsel",
    tags: ["wie hoch ist der zuckerwert normal", "Normalwerte", "Blutzuckertest", "Gesundheit"],
    author: { name: "Dr. Elena Vance", role: "Biochemikerin", avatar: "/images/avatars/reviewer-1.png" },
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    readingTimeMinutes: 7,
    coverImage: { src: "/images/covid19-vaccine-vials-syringe.jpg", alt: "Wie hoch ist der Zuckerwert normal", width: 1200, height: 675 },
    keyTakeaways: [
      "Nüchternwerte: 70–99 mg/dl (3,9–5,5 mmol/l).",
      "Postprandial (2h): < 140 mg/dl (7,8 mmol/l).",
      "HbA1c: < 5,7% (39 mmol/mol)."
    ],
    content: `
## Wie hoch ist der Zuckerwert normal bei Erwachsenen?

Die Frage **wie hoch ist der Zuckerwert normal** lässt sich in drei klare Kategorien unterteilen: Nüchternwert, 2-Stunden-Wert und HbA1c-Langzeitwert.

Vergleichen Sie Ihre Werte mit unserer [Was essen bei Diabetes 2 Tabelle](/blog/was-essen-bei-diabetes-2-tabelle) für einen gesunden Alltag.
    `,
    relatedProducts: [
      { name: "Advanced Reconstitution Kit", slug: "advanced-reconstitution-kit", price: "€29.90", image: "/images/products/advanced-reconstitution-kit.png" }
    ]
  }
];
