import type { Product, ProductReview, ProductSpecification } from "@/types";

interface ReviewTemplate {
  author: string;
  rating: number;
  title: string;
  content: string;
  daysAgo: number;
  verified: boolean;
}

const REVIEW_POOLS: Record<string, ReviewTemplate[]> = {
  "diabetes-and-weight-loss": [
    {
      author: "Dr. med. Christian M.",
      rating: 5,
      title: "Ausgezeichnete pharmazeutische Qualität & zuverlässige Kühlkette",
      content: "Sehr schnelle Lieferung mit lückenloser Kühlkettenverpackung. Der Pen und die Skalierung sind original und einwandfrei verarbeitet. Die Appetitkontrolle setzte wie erwartet ab Woche 1 ein.",
      daysAgo: 4,
      verified: true
    },
    {
      author: "Sabine W. (Verifizierte Käuferin)",
      rating: 5,
      title: "Perfekte Unterstützung bei der Gewichtsreduktion",
      content: "Bereits 6.8 kg in 6 Wochen verloren ohne quälenden Heißhunger. Die Titration von der Einstiegsdosis verlief ohne nennenswerte Magenbeschwerden. Sehr empfehlenswert!",
      daysAgo: 9,
      verified: true
    },
    {
      author: "Dr. Stefan K. (Stoffwechselforschung)",
      rating: 5,
      title: "HPLC-Bestätigung über 99% Reinheit",
      content: "Wir haben eine Stichprobe im Labor per HPLC analysiert. Die Reinheit und Peptidstabilität entsprechen exakt den höchsten europäischen Arzneibuchstandards.",
      daysAgo: 14,
      verified: true
    },
    {
      author: "Michael R.",
      rating: 5,
      title: "Originale Mehrdosis-Pens & diskreter Expressversand",
      content: "Kam nach nur 2 Tagen gut gekühlt im Thermobeutel an. Die Klicktabelle ist super einfach anzuwenden. Deutlich stabilerer Blutzuckerspiegel und spürbar mehr Energie im Alltag.",
      daysAgo: 21,
      verified: true
    },
    {
      author: "Sandra H. (Verifizierter Kauf)",
      rating: 4,
      title: "Sehr wirksam, langsame Titration ratsam",
      content: "Sehr starker Sättigungseffekt. In den ersten 3 Tagen hatte ich leichte Übelkeit, die sich aber schnell gelegt hat, sobald ich mehr Wasser getrunken habe. 5 kg weniger in einem Monat.",
      daysAgo: 28,
      verified: true
    },
    {
      author: "Dr. rer. nat. Tobias B.",
      rating: 5,
      title: "Hervorragende Bioverfügbarkeit und Rezeptoraffinität",
      content: "Als Biochemiker schätze ich die transparente Chargendokumentation und die konsistente Kinetik dieses Produkts. Hohe Rezeptorselektivität ohne Blutzuckerabfälle.",
      daysAgo: 35,
      verified: true
    },
    {
      author: "Laura M. (Verifizierte Käuferin)",
      rating: 5,
      title: "Der Heißhunger auf Süßes ist komplett verschwunden",
      content: "Für mich ein echter Gamechanger. Ich habe keine ständigen Gedanken mehr ans Essen ('Food Noise' ist weg). Die Handhabung des Injektors ist absolut schmerzfrei.",
      daysAgo: 42,
      verified: true
    },
    {
      author: "Florian G.",
      rating: 5,
      title: "Top Kundenservice & authentisches Produkt",
      content: "Fragen zur Lagerung wurden innerhalb von 10 Minuten vom Support kompetent beantwortet. Die Pens sind versiegelt und mit langer Resthaltbarkeit geliefert worden.",
      daysAgo: 53,
      verified: true
    },
    {
      author: "Monika E. (Verifizierter Kauf)",
      rating: 5,
      title: "Bereits die 3. Nachbestellung – immer konstant gut",
      content: "Konstante Gewichtsabnahme über 3 Monate hinweg. Ich fühle mich vitaler und mein Langzeit-Blutzuckerwert hat sich signifikant verbessert.",
      daysAgo: 64,
      verified: true
    },
    {
      author: "Andreas P. (Health Coach)",
      rating: 5,
      title: "Zuverlässigste Quelle für GLP-1 & GIP Peptide",
      content: "Ich empfehle diesen Shop seit Monaten für wissenschaftliche Referenzsubstanzen. Die Qualität, Liefergeschwindigkeit und Verpackung sind unübertroffen.",
      daysAgo: 78,
      verified: true
    }
  ],
  "peptides": [
    {
      author: "Dr. Alexander V. (Orthomolekulare Forschung)",
      rating: 5,
      title: "Exzellente Lyophilisat-Qualität & sofortige Löslichkeit",
      content: "Das Peptidpulver löst sich in bakteriostatischem Wasser innerhalb von Sekunden vollkommen klar auf, ohne Aggregation oder Schwebstoffe. HPLC-zertifizierte Reinheit ist spürbar.",
      daysAgo: 3,
      verified: true
    },
    {
      author: "Maximilian S. (Verifizierter Kauf)",
      rating: 5,
      title: "Hervorragende Geweberegeneration nach Sehnenreizung",
      content: "Meine chronische Patellasehnen-Tendinopathie hat sich nach einem 4-wöchigen Protokoll um über 80% gebessert. Deutlich schnellere Erholung nach harten Belastungen.",
      daysAgo: 8,
      verified: true
    },
    {
      author: "Dr. rer. nat. Sophie B.",
      rating: 5,
      title: "Analytisch einwandfreie Peptidsequenz",
      content: "Massenspektrometrische Überprüfung (MALDI-TOF) bestätigte das exakte Molekulargewicht und eine Reinheit von über 99.2%. Höchster Laborstandard.",
      daysAgo: 15,
      verified: true
    },
    {
      author: "Patrick H. (Sportwissenschaftler)",
      rating: 5,
      title: "Kombination mit BAC-Wasser klappt reibungslos",
      content: "Vials sind unter Schutzgas steril versiegelt. Die Vakuumbildung beim Einstechen der Nadel ist perfekt. Schneller, unkomplizierter Versand nach Deutschland.",
      daysAgo: 22,
      verified: true
    },
    {
      author: "Johannes K. (Verifizierter Käufer)",
      rating: 4,
      title: "Sehr gute Wirkung auf Entzündungswerte",
      content: "Entzündungsbedingte Gelenkbeschwerden sind spürbar zurückgegangen. 1 Stern Abzug nur, weil die Sendung wegen Feiertagen einen Tag später ankam, Produkt selbst ist 1A.",
      daysAgo: 31,
      verified: true
    },
    {
      author: "Dr. med. Tobias H.",
      rating: 5,
      title: "Sehr potente antiinflammatorische Signalwirkung",
      content: "In unseren zellulären Modellen zeigte die Charge eine signifikante Dämpfung von TNF-alpha und IL-6. Äußerst konsistente Chargen-Reproduzierbarkeit.",
      daysAgo: 40,
      verified: true
    },
    {
      author: "Felix W. (Verifizierter Kauf)",
      rating: 5,
      title: "Beste Peptidqualität im deutschsprachigen Raum",
      content: "Habe schon viele Anbieter ausprobiert, aber hier stimmen Reinheit, Stabilität und Kundenservice vollkommen. Sicher verpackt und lichtgeschützt geliefert.",
      daysAgo: 49,
      verified: true
    },
    {
      author: "Jan-Niklas B.",
      rating: 5,
      title: "Spürbare Steigerung von Regeneration und Schlafqualität",
      content: "Bereits nach der ersten Woche deutlich tieferer Schlaf und schnellere Erholung zwischen Trainingseinheiten. Werde definitiv nachbestellen.",
      daysAgo: 60,
      verified: true
    },
    {
      author: "Elena R. (Verifizierte Käuferin)",
      rating: 5,
      title: "Hervorragende Verträglichkeit",
      content: "Keinerlei Rötung oder Brennen an der Injektionsstelle. Saubere Lösung und spürbare regenerative Effekte.",
      daysAgo: 71,
      verified: true
    },
    {
      author: "Dr. Markus L.",
      rating: 5,
      title: "Perfekte Peptidstabilität & versiegelte Verpackung",
      content: "Auch nach mehrwöchiger Rekonstitution im Kühlschrank keine Ausfällungen oder Wirkungsverluste feststellbar.",
      daysAgo: 82,
      verified: true
    },
    {
      author: "Sarah K. (Verifizierter Kauf)",
      rating: 5,
      title: "Sehr empfehlenswert für regenerative Kuren",
      content: "Hervorragendes Produkt. Deutlich beschleunigte Wund- und Sehnenheilung nach Sportverletzung.",
      daysAgo: 94,
      verified: true
    }
  ],
  "sarms-powders": [
    {
      author: "Thorsten M. (Verifizierter Käufer)",
      rating: 5,
      title: "Reines mikronisiertes Pulver & hohe Potenz",
      content: "Lässt sich hervorragend in DMSO oder PEG-400 suspendieren. Die Trockenheit und Kraftsteigerung im Training waren innerhalb von 10 Tagen spürbar.",
      daysAgo: 5,
      verified: true
    },
    {
      author: "Dr. Lukas F.",
      rating: 5,
      title: "NMR- und HPLC-geprüft: Reinstes Rohmaterial",
      content: "Spektroskopische Analyse bestätigt die korrekte Isomerenstruktur ohne Schwermetall- oder Lösemittelrückstände. Sehr saubere Charge.",
      daysAgo: 12,
      verified: true
    },
    {
      author: "Dennis B. (Verifizierter Kauf)",
      rating: 5,
      title: "Sehr gute Vaskularität und Muskelhärte",
      content: "Top Preis-Leistungs-Verhältnis. Dosierung lässt sich mit Feinwaage auf das Milligramm genau abmessen. Keine Wassereinlagerungen.",
      daysAgo: 18,
      verified: true
    },
    {
      author: "Klaus T.",
      rating: 4,
      title: "Starke Wirkung, exaktes Abwiegen wichtig",
      content: "Wirkung setzt schnell ein. Man benötigt definitiv eine präzise 0.001g Waage für die Dosierung. Schnelle Lieferung.",
      daysAgo: 26,
      verified: true
    },
    {
      author: "Manuel E. (Verifizierter Kauf)",
      rating: 5,
      title: "Bestes Preis-Leistungs-Verhältnis für Forschungspulver",
      content: "Versiegelter Beutel mit Lichtschutz. Das Pulver ist trocken, feinkörnig und klumpt nicht. Kraftwerte im Gym sind deutlich gestiegen.",
      daysAgo: 37,
      verified: true
    },
    {
      author: "Simon W.",
      rating: 5,
      title: "Hervorragende Rezeptorbindung",
      content: "Erhebliche Steigerung der Muskelproteinsynthese bei gleichzeitigem Schutz vor Muskelabbau im Kaloriendefizit.",
      daysAgo: 48,
      verified: true
    },
    {
      author: "Pascal K. (Verifizierter Kauf)",
      rating: 5,
      title: "Schnelle Lieferung & diskrete Verpackung",
      content: "Nach 2 Tagen im Briefkasten, neutral verpackt. Wirkung ist absolut authentisch und rein.",
      daysAgo: 59,
      verified: true
    },
    {
      author: "Oliver H.",
      rating: 5,
      title: "Sehr zufrieden mit dem Ergebnis",
      content: "Kraftsteigerung in Grundübungen und definiertere Muskelkonturen nach 6 Wochen Forschungszyklus.",
      daysAgo: 73,
      verified: true
    },
    {
      author: "Dr. Timon S. (Bioanalytik)",
      rating: 5,
      title: "Verlässliche Referenzsubstanz für Laboruntersuchungen",
      content: "Exzellente Chargenhomogenität und vollständige Löslichkeit bei definierten Lösungsmittelkonzentrationen.",
      daysAgo: 85,
      verified: true
    },
    {
      author: "Alexander G. (Verifizierter Kauf)",
      rating: 5,
      title: "Absoluter Qualitätsunterschied zu anderen Anbietern",
      content: "Keinerlei Magenreizung, extrem sauberes Rohprodukt. Werde dauerhaft hier bestellen.",
      daysAgo: 96,
      verified: true
    }
  ],
  "steroid-and-sarms-tablets": [
    {
      author: "Dr. Alexander K. (Pharmakologie)",
      rating: 5,
      title: "Hervorragende Tablettierungsqualität & Dosierungshomogenität",
      content: "Präzise Verteilung des Wirkstoffs pro Tablette ohne Bruch oder Bröseln. Schnelle Magenpassage und verlässliche Bioverfügbarkeit.",
      daysAgo: 4,
      verified: true
    },
    {
      author: "Markus V. (Verifizierter Kauf)",
      rating: 5,
      title: "Ausgezeichnete Härte und Kraftsteigerung",
      content: "Nehme das Produkt seit 3 Wochen. Kraftzuwachs ist enorm und die Muskelhärte bei niedrigem Körperfettanteil ist erstklassig.",
      daysAgo: 10,
      verified: true
    },
    {
      author: "Sven R.",
      rating: 5,
      title: "Saubere Rezeptur ohne unnötige Füllstoffe",
      content: "Kleine, leicht zu schluckende Tabletten. Blutwerte (Leber/Lipide) blieben bei adäquater Begleitunterstützung stabil.",
      daysAgo: 17,
      verified: true
    },
    {
      author: "Christian P. (Verifizierter Kauf)",
      rating: 4,
      title: "Gute Verträglichkeit, spürbare Wirkung",
      content: "Sehr potente Wirkung. Empfehle die Einnahme stets zu einer Mahlzeit für optimale Magenverträglichkeit.",
      daysAgo: 25,
      verified: true
    },
    {
      author: "Fabian B.",
      rating: 5,
      title: "Top Qualität – diskreter und schneller Versand",
      content: "Die Blister/Dosen sind original versiegelt mit Chargennummer. Verlässliche Ergebnisse wie beschrieben.",
      daysAgo: 36,
      verified: true
    },
    {
      author: "Tim L. (Verifizierter Kauf)",
      rating: 5,
      title: "Enorme Pump-Wirkung und Glykogenspeicherung",
      content: "Muskeln wirken prall und dauerhaft gefüllt. Deutliche Steigerung der Arbeitskapazität im Training.",
      daysAgo: 46,
      verified: true
    },
    {
      author: "Rene M.",
      rating: 5,
      title: "Sehr zufrieden – klare Kaufempfehlung",
      content: "Nutze das Produkt zur Wettkampfvorbereitung. Vaskularität und Muskelhärte sind auf absolutem Top-Niveau.",
      daysAgo: 58,
      verified: true
    },
    {
      author: "Daniel S. (Verifizierter Kauf)",
      rating: 5,
      title: "Hervorragende Stabilität und Resorption",
      content: "Schneller Wirkeintritt nach der Einnahme. Keine Magenbeschwerden und solide Ergebnisse.",
      daysAgo: 70,
      verified: true
    },
    {
      author: "Dr. Jan W.",
      rating: 5,
      title: "Strenge Qualitätskontrolle spürbar",
      content: "Gleichmäßige Freisetzungskinetik und hohe Reinheit durch quantitative HPLC bestätigt.",
      daysAgo: 83,
      verified: true
    },
    {
      author: "Patrick O. (Verifizierter Kauf)",
      rating: 5,
      title: "Schnelle Regeneration & hervorragender Kundensupport",
      content: "Versand ging blitzschnell und die Wirkung ist genau wie in der wissenschaftlichen Literatur beschrieben.",
      daysAgo: 95,
      verified: true
    }
  ],
  "steroid-oils": [
    {
      author: "Markus S. (Biomed Research)",
      rating: 5,
      title: "Glasklares MCT-Trägeröl & null Injektionsschmerz (PIP)",
      content: "Sehr dünnflüssiges pharmazeutisches MCT-Öl, lässt sich problemlos mit einer 25G Nadel aufziehen und injizieren. Keinerlei Nachinjektionsschmerzen oder Verhärtungen.",
      daysAgo: 6,
      verified: true
    },
    {
      author: "Dr. Frank N.",
      rating: 5,
      title: "Sterilfiltriert (0.22 µm) & perfekt dosiert",
      content: "Mikrobiologische und pyrogene Tests blieben vollkommen negativ. Die Depotwirkung ist stabil und gleichmäßig.",
      daysAgo: 13,
      verified: true
    },
    {
      author: "Kevin W. (Verifizierter Kauf)",
      rating: 5,
      title: "Sehr geschmeidiger Ölfluss & konstante Hormonspiegel",
      content: "Gleichmäßige Energie und Kraft über die gesamte Woche hinweg ohne Leistungsabfälle. Sehr angenehme Applikation.",
      daysAgo: 19,
      verified: true
    },
    {
      author: "Sascha D.",
      rating: 4,
      title: "Hohe Reinheit, absolut schmerzfrei",
      content: "Hervorragendes Produkt. Vials sind sauber gebördelt mit Flip-Off-Verschluss. Lieferung dauerte 3 Werktage.",
      daysAgo: 29,
      verified: true
    },
    {
      author: "Bastian M. (Verifizierter Kauf)",
      rating: 5,
      title: "Beste Öl-Qualität auf dem Markt",
      content: "Das Öl ist vollkommen klar ohne Trübungen oder Kristalle. Die Wirkung auf Regeneration und Muskelaufbau ist überzeugend.",
      daysAgo: 39,
      verified: true
    },
    {
      author: "Michael E.",
      rating: 5,
      title: "Keine Akne, keine Wassereinlagerung",
      content: "Saubere anabole Wirkung bei minimaler Aromatisation. Für mich der verlässlichste Standard im Labor.",
      daysAgo: 50,
      verified: true
    },
    {
      author: "Andre L. (Verifizierter Kauf)",
      rating: 5,
      title: "Ausgezeichnete Depotstabilität",
      content: "Serum-Tests zeigen konstante Wirkstoffkonzentrationen ohne extreme Spitzen. Werde definitiv wieder bestellen.",
      daysAgo: 62,
      verified: true
    },
    {
      author: "Carsten R.",
      rating: 5,
      title: "Top Verpackung & sterile Lieferung",
      content: "Sicher gepolstert angekommen. Vials sind absolut dicht und steril verarbeitet.",
      daysAgo: 75,
      verified: true
    },
    {
      author: "Dr. Steffen H.",
      rating: 5,
      title: "Hervorragendes Lösungsmittelverhältnis",
      content: "Minimaler Benzylalkohol-Anteil bei maximaler Wirkstofflöslichkeit. Perfekte Gewebeverträglichkeit.",
      daysAgo: 86,
      verified: true
    },
    {
      author: "Nico T. (Verifizierter Kauf)",
      rating: 5,
      title: "Konstanter Kraftaufbau und Wohlbefinden",
      content: "Keine Hormonschwankungen, extrem sauberes Produkt. Absolute Empfehlung.",
      daysAgo: 98,
      verified: true
    }
  ]
};

function getDateString(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

export function generateProductReviews(productName: string, categorySlug: string, slug: string): ProductReview[] {
  let poolKey = "peptides";
  if (categorySlug.includes("weight") || categorySlug.includes("diabetes")) {
    poolKey = "diabetes-and-weight-loss";
  } else if (categorySlug.includes("sarms-powders") || categorySlug.includes("sarms")) {
    poolKey = "sarms-powders";
  } else if (categorySlug.includes("tablets")) {
    poolKey = "steroid-and-sarms-tablets";
  } else if (categorySlug.includes("oils")) {
    poolKey = "steroid-oils";
  }

  const templates = REVIEW_POOLS[poolKey] || REVIEW_POOLS["peptides"];

  return templates.map((t, idx) => {
    // Generate unique review ID based on slug and index
    const id = `rev-${slug}-${idx + 1}`;
    // Format date based on daysAgo
    const date = getDateString(t.daysAgo + (idx * 2));

    return {
      id,
      author: t.author,
      rating: t.rating,
      title: t.title,
      content: t.content,
      date,
      verified: t.verified
    };
  });
}

export function generateProductSpecifications(product: {
  name: string;
  categorySlug: string;
  purity?: string;
  concentration?: string;
}): ProductSpecification[] {
  const cat = product.categorySlug || "";

  if (cat.includes("diabetes") || cat.includes("weight")) {
    return [
      { label: "Wirkstoff / Active Compound", value: product.name.split(" - ")[0] },
      { label: "Reinheit / Purity", value: "≥99.0% (HPLC & Mass Spectrometry Verified)" },
      { label: "Darreichungsform / Format", value: "Steriler Fertigpen / Lyophilisiertes Peptid / Tabletten" },
      { label: "Lagerung / Storage", value: "2°C – 8°C (lichtgeschützt), vor Frost schützen" },
      { label: "Kühlkette / Cold-Chain", value: "Geprüfter Thermoversand mit Kühlelementen" },
      { label: "Qualitätsstandard", value: "GMP / ISO 9001 zertifiziert" },
      { label: "Haltbarkeit / Shelf Life", value: "24 Monate ungeöffnet ab Produktionsdatum" },
      { label: "Analysezertifikat (CoA)", value: "Chargenspezifisch geprüft & digital hinterlegt" }
    ];
  }

  if (cat.includes("tablets")) {
    return [
      { label: "Wirkstoff / Active Compound", value: product.name.split(" - ")[0] },
      { label: "Reinheit / Purity", value: "≥99.0% (HPLC & GC-MS Verified)" },
      { label: "Darreichungsform / Format", value: "Gleichmäßig komprimierte pharmazeutische Tabletten" },
      { label: "Lagerung / Storage", value: "Trocken & lichtgeschützt bei 15°C – 25°C lagern" },
      { label: "Dosierungsgenauigkeit", value: "±0.5% pro Einzeldosis homogen verteilt" },
      { label: "Qualitätsstandard", value: "GMP / ISO 9001 zertifiziert" },
      { label: "Haltbarkeit / Shelf Life", value: "36 Monate bei Raumtemperatur" },
      { label: "Analysezertifikat (CoA)", value: "Jede Produktionscharge lückenlos geprüft" }
    ];
  }

  if (cat.includes("oils")) {
    return [
      { label: "Wirkstoff / Active Compound", value: product.name.split(" - ")[0] },
      { label: "Reinheit / Purity", value: "≥99.0% (HPLC & Mass Spectrometry Verified)" },
      { label: "Trägeröl / Carrier Oil", value: "Pharmazeutisches MCT-Öl (Medium-Chain Triglycerides)" },
      { label: "Sterilisation / Filter", value: "0.22 µm PTFE-Membranfilter, pyrogenfrei" },
      { label: "Lösungsmittel-Verhältnis", value: "Benzylalkohol 1-2%, Benzylbenzoat 15-20% (Zero-PIP)" },
      { label: "Lagerung / Storage", value: "Bei 15°C – 25°C lichtgeschützt lagern (nicht kühlen)" },
      { label: "Haltbarkeit / Shelf Life", value: "36 Monate in versiegelter Borosilikatglas-Vial" }
    ];
  }

  if (cat.includes("sarms")) {
    return [
      { label: "Wirkstoff / Active Compound", value: product.name.split(" - ")[0] },
      { label: "Reinheit / Purity", value: "≥99.0% (HPLC & NMR zertifiziert)" },
      { label: "Partikelgröße / Form", value: "Mikronisiertes Reinstpulver (Kristallin)" },
      { label: "Löslichkeit / Solubility", value: "Löslich in DMSO, PEG-400, Ethanol oder Ölbasis" },
      { label: "Lagerung / Storage", value: "Trocken und lichtgeschützt bei -20°C bis 20°C" },
      { label: "Qualitätsstandard", value: "ISO 9001 / Drittlabor-analysiert" },
      { label: "Haltbarkeit / Shelf Life", value: "24 Monate bei sachgemäßer Aufbewahrung" }
    ];
  }

  // Default Peptides specifications
  return [
    { label: "Peptidsequenz / Sequence", value: "Biotechnologisch synthetisierte Peptidkette" },
    { label: "Reinheit / Purity", value: "≥99.0% (HPLC & MALDI-TOF MS Verified)" },
    { label: "Darreichungsform / Format", value: "Steriles lyophilisiertes Peptidpulver" },
    { label: "Lösungsmittel / Solvent", value: "Bakteriostatisches Wasser (0.9% Benzylalkohol)" },
    { label: "Lagerung (Lyophilisat)", value: "Bei -20°C bis zu 24 Monate stabil" },
    { label: "Lagerung (Gelöst)", value: "Im Kühlschrank bei 2°C – 8°C für 30 Tage" },
    { label: "Qualitätsstandard", value: "GMP / ISO 9001 / CoA zertifiziert" }
  ];
}
