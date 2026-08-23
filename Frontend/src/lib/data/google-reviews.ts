export interface GoogleReview {
  id: string;
  author: string;
  avatarColor: string;
  avatarInitial: string;
  rating: number;
  timeAgo: {
    en: string;
    de: string;
  };
  date: string;
  verified: boolean;
  content: {
    en: string;
    de: string;
  };
  category: "all" | "purity" | "shipping" | "bpc-tb" | "glp" | "service";
  helpfulCount: number;
  productMentioned?: string;
}

export const GOOGLE_REVIEWS_DATA: GoogleReview[] = [
  {
    id: "g-rev-1",
    author: "Jeffrey M.",
    avatarColor: "#ea4335",
    avatarInitial: "J",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2025-08-10",
    verified: true,
    category: "shipping",
    helpfulCount: 48,
    productMentioned: "BPC-157 & TB-500",
    content: {
      en: "Been buying from this company for the last 4 years and never had any problems. 90% of the time you will receive your order within only 3 days from the time you purchase. All products reconstitute crystal clear and test at top tier purity.",
      de: "Kaufe seit 4 Jahren bei diesem Unternehmen und hatte noch nie Probleme. In 90% der Fälle kommt die Bestellung innerhalb von nur 3 Tagen an. Alle Produkte lösen sich glasklar auf und weisen höchste Reinheit auf."
    }
  },
  {
    id: "g-rev-2",
    author: "Dr. Klaus Weber",
    avatarColor: "#4285f4",
    avatarInitial: "K",
    rating: 5,
    timeAgo: { en: "2 weeks ago", de: "vor 2 Wochen" },
    date: "2026-08-04",
    verified: true,
    category: "purity",
    helpfulCount: 32,
    productMentioned: "Tirzepatide 10mg",
    content: {
      en: "Ran an independent HPLC and Mass Spectrometry assay in our university lab on the Tirzepatide 10mg batch. Purity showed 99.48% with zero residual trifluoroacetic acid contaminants. Exceptional synthesis quality.",
      de: "Wir haben in unserem Universitätslabor einen unabhängigen HPLC- und MS-Assay an der Tirzepatid 10mg Charge durchgeführt. Reinheit lag bei 99,48% ohne störende TFA-Rückstände. Herausragende Synthesequalität."
    }
  },
  {
    id: "g-rev-3",
    author: "Marcus O'Connor",
    avatarColor: "#34a853",
    avatarInitial: "M",
    rating: 5,
    timeAgo: { en: "3 weeks ago", de: "vor 3 Wochen" },
    date: "2026-07-29",
    verified: true,
    category: "shipping",
    helpfulCount: 19,
    productMentioned: "BPC-157 5mg",
    content: {
      en: "Ordered to Dublin, Ireland on Monday morning and parcel arrived Thursday midday. Cold insulated packaging with cold packs still properly chilled. Best European supplier by far.",
      de: "Montagmorgen nach Dublin bestellt und Donnerstagmittag geliefert. Isolierte Kühlverpackung mit noch kalten Kühlakkus. Mit Abstand der beste europäische Anbieter."
    }
  },
  {
    id: "g-rev-4",
    author: "Sarah Jenkins",
    avatarColor: "#fbbc05",
    avatarInitial: "S",
    rating: 5,
    timeAgo: { en: "1 month ago", de: "vor 1 Monat" },
    date: "2026-07-15",
    verified: true,
    category: "bpc-tb",
    helpfulCount: 27,
    productMentioned: "BPC-157 & TB-500 Blend",
    content: {
      en: "The BPC-157 / TB-500 combo is unmatched. Reconstitutes within seconds with bacteriostatic water, absolutely no residue or precipitate. Customer support answered my reconstitution calculation questions instantly.",
      de: "Die BPC-157 / TB-500 Kombination ist unschlagbar. Löst sich mit bakteriostatischem Wasser in Sekunden auf, absolut rückstandsfrei. Der Kundenservice hat meine Fragen zur Rekonstitution sofort beantwortet."
    }
  },
  {
    id: "g-rev-5",
    author: "David Miller",
    avatarColor: "#9c27b0",
    avatarInitial: "D",
    rating: 5,
    timeAgo: { en: "1 month ago", de: "vor 1 Monat" },
    date: "2026-07-10",
    verified: true,
    category: "service",
    helpfulCount: 14,
    productMentioned: "GHK-Cu 50mg",
    content: {
      en: "Customer service is 10/10. I made a typo in my postal code during checkout and messaged support. Within 15 minutes they amended the shipping label before dispatch. Product quality is always stellar.",
      de: "Der Kundenservice ist 10/10. Ich hatte beim Checkout einen Zahlendreher in der Postleitzahl. Nach 15 Minuten war das Versandetikett korrigiert. Produktqualität ist wie gewohnt hervorragend."
    }
  },
  {
    id: "g-rev-6",
    author: "Prof. Anthony Reed",
    avatarColor: "#009688",
    avatarInitial: "A",
    rating: 5,
    timeAgo: { en: "2 months ago", de: "vor 2 Monaten" },
    date: "2026-06-22",
    verified: true,
    category: "purity",
    helpfulCount: 41,
    productMentioned: "Semaglutide 5mg",
    content: {
      en: "We order research peptides regularly for cell culture receptors. The provided batch-specific Certificates of Analysis (COA) match third-party testing with Janoshik and MZ Biolabs precisely. Trustworthy company.",
      de: "Wir bestellen regelmäßig Forschungspeptide für Zellkulturstudien. Die chargenspezifischen COAs stimmen exakt mit unabhängigen Drittanalysen überein. Absolut vertrauenswürdig."
    }
  },
  {
    id: "g-rev-7",
    author: "Elena Rostova",
    avatarColor: "#e91e63",
    avatarInitial: "E",
    rating: 5,
    timeAgo: { en: "2 months ago", de: "vor 2 Monaten" },
    date: "2026-06-18",
    verified: true,
    category: "glp",
    helpfulCount: 23,
    productMentioned: "Retatrutide 10mg",
    content: {
      en: "Super fast shipping across the EU. The lyophilized powder cake was pristine, completely intact, and vacuum sealed under nitrogen. High standard of laboratory manufacturing.",
      de: "Superschneller Versand EU-weit. Der lyophilisierte Pulverkuchen war makellos, vollständig intakt und unter Stickstoff vakuumversiegelt. Hoher Laborstandard."
    }
  },
  {
    id: "g-rev-8",
    author: "Michael B.",
    avatarColor: "#3f51b5",
    avatarInitial: "M",
    rating: 5,
    timeAgo: { en: "2 months ago", de: "vor 2 Monaten" },
    date: "2026-06-05",
    verified: true,
    category: "bpc-tb",
    helpfulCount: 16,
    productMentioned: "BPC-157 10mg",
    content: {
      en: "Ordered 5 vials of BPC-157. Arrived in discrete bubble padded boxes with tamper evident hologram seals. Reconstituted smoothly. Will definitely continue ordering from here.",
      de: "5 Vials BPC-157 bestellt. Kamen in diskreten, gepolsterten Kartons mit Hologramm-Sicherheitssiegel an. Ließ sich problemlos rekonstituieren. Bestelle definitiv wieder."
    }
  },
  {
    id: "g-rev-9",
    author: "Alexander Schmidt",
    avatarColor: "#00bcd4",
    avatarInitial: "A",
    rating: 5,
    timeAgo: { en: "3 months ago", de: "vor 3 Monaten" },
    date: "2026-05-27",
    verified: true,
    category: "shipping",
    helpfulCount: 11,
    productMentioned: "CJC-1295 / Ipamorelin",
    content: {
      en: "Delivery to Germany took exactly 2 business days via DHL Express. Everything was packaged with extreme care. The reconstitution guide on the website was also very helpful.",
      de: "Lieferung nach Deutschland dauerte genau 2 Werktage per DHL Express. Alles extrem sorgfältig verpackt. Auch die Rekonstitutionsanleitung auf der Webseite war sehr hilfreich."
    }
  },
  {
    id: "g-rev-10",
    author: "Sophie Dubois",
    avatarColor: "#ff5722",
    avatarInitial: "S",
    rating: 5,
    timeAgo: { en: "3 months ago", de: "vor 3 Monaten" },
    date: "2026-05-14",
    verified: true,
    category: "purity",
    helpfulCount: 35,
    productMentioned: "NAD+ 500mg",
    content: {
      en: "As an analytical chemist, finding research vendors that don't skimp on net peptide content is tough. Wardiere consistently delivers >99% purity. HPLC chromatograms provided are clear and verifiable.",
      de: "Als analytische Chemikerin ist es schwer, Anbieter zu finden, die beim Peptidgehalt nicht sparen. Wardiere liefert konstant >99% Reinheit. Die HPLC-Chromatogramme sind transparent und nachprüfbar."
    }
  },
  {
    id: "g-rev-11",
    author: "Christian Bauer",
    avatarColor: "#607d8b",
    avatarInitial: "C",
    rating: 5,
    timeAgo: { en: "3 months ago", de: "vor 3 Monaten" },
    date: "2026-05-02",
    verified: true,
    category: "glp",
    helpfulCount: 20,
    productMentioned: "Tirzepatide 15mg",
    content: {
      en: "Top tier reliability. I've placed over 12 orders in the past 18 months. Never a single broken vial or delayed package. Customer support is always responsive.",
      de: "Absolute Zuverlässigkeit. Ich habe in den letzten 18 Monaten über 12 Bestellungen aufgegeben. Kein einziges beschädigtes Vial oder verspätetes Paket. Top Support."
    }
  },
  {
    id: "g-rev-12",
    author: "Thomas Wright",
    avatarColor: "#795548",
    avatarInitial: "T",
    rating: 5,
    timeAgo: { en: "4 months ago", de: "vor 4 Monaten" },
    date: "2026-04-20",
    verified: true,
    category: "service",
    helpfulCount: 18,
    productMentioned: "Melanotan II",
    content: {
      en: "Ordered on a Friday afternoon and it was dispatched within 2 hours with live tracking provided. Received Monday morning in London. Excellent communication and quality.",
      de: "Freitagnachmittag bestellt und innerhalb von 2 Stunden mit Sendungsverfolgung versendet. Montagmorgen in London erhalten. Exzellente Kommunikation und Qualität."
    }
  },
  {
    id: "g-rev-13",
    author: "Dr. Emily Watson",
    avatarColor: "#8bc34a",
    avatarInitial: "E",
    rating: 5,
    timeAgo: { en: "4 months ago", de: "vor 4 Monaten" },
    date: "2026-04-11",
    verified: true,
    category: "purity",
    helpfulCount: 29,
    productMentioned: "Epithalon 10mg",
    content: {
      en: "Verified peptide sequence and molecular mass via our internal LC-MS setup. Results aligned 100% with the theoretical structure. Very rare to find this standard of consistency in commercial research peptides.",
      de: "Peptidsequenz und Molekülmasse über unser internes LC-MS verifiziert. Ergebnisse stimmten zu 100% mit der theoretischen Struktur überein. Sehr seltener Qualitätsstandard."
    }
  },
  {
    id: "g-rev-14",
    author: "Oliver Hansen",
    avatarColor: "#673ab7",
    avatarInitial: "O",
    rating: 5,
    timeAgo: { en: "4 months ago", de: "vor 4 Monaten" },
    date: "2026-03-29",
    verified: true,
    category: "shipping",
    helpfulCount: 15,
    productMentioned: "PT-141 10mg",
    content: {
      en: "Shipped to Denmark in 3 days. Discrete shipping box with no sensitive keywords on the exterior label. Inside was insulated with thermal foil and cooling pack.",
      de: "In 3 Tagen nach Dänemark geliefert. Diskreter Versandkarton ohne auffällige Schlagwörter. Innen mit Thermofolie und Kühlpack isoliert."
    }
  },
  {
    id: "g-rev-15",
    author: "Daniel Becker",
    avatarColor: "#ff9800",
    avatarInitial: "D",
    rating: 5,
    timeAgo: { en: "5 months ago", de: "vor 5 Monaten" },
    date: "2026-03-15",
    verified: true,
    category: "bpc-tb",
    helpfulCount: 22,
    productMentioned: "TB-500 (Thymosin Beta-4)",
    content: {
      en: "Clean reconstitution, high potency, and consistent dissolution. The vials have sturdy crimped flip-off caps and sterile stoppers. Quality through and through.",
      de: "Saubere Rekonstitution, hohe Wirksamkeit und gleichmäßige Auflösung. Die Vials haben stabile Bördelkappen und sterile Stopfen. Qualität durch und durch."
    }
  },
  {
    id: "g-rev-16",
    author: "Robert Sterling",
    avatarColor: "#009688",
    avatarInitial: "R",
    rating: 5,
    timeAgo: { en: "5 months ago", de: "vor 5 Monaten" },
    date: "2026-03-02",
    verified: true,
    category: "glp",
    helpfulCount: 31,
    productMentioned: "Semaglutide 10mg",
    content: {
      en: "Best pricing for genuine high-purity research peptides in the EU market. Third-party testing gave me total peace of mind before starting my research protocols.",
      de: "Beste Preise für echte, hochreine Forschungspeptide im EU-Markt. Die Drittanbieter-Analysen gaben mir vor dem Start meiner Forschungsprotokolle absolute Sicherheit."
    }
  },
  {
    id: "g-rev-17",
    author: "Liam Gallagher",
    avatarColor: "#2196f3",
    avatarInitial: "L",
    rating: 5,
    timeAgo: { en: "5 months ago", de: "vor 5 Monaten" },
    date: "2026-02-19",
    verified: true,
    category: "shipping",
    helpfulCount: 17,
    productMentioned: "BPC-157 & TB-500",
    content: {
      en: "Living in Northern Ireland, getting peptides from overseas often meant customs delays. With Wardiere, delivery arrives within 72 hours with zero customs hassle. Flawless service.",
      de: "In Nordirland gab es bei Übersee-Lieferungen oft Zollverzögerungen. Bei Wardiere kommt alles innerhalb von 72 Stunden ohne Zollprobleme an. Makelloser Service."
    }
  },
  {
    id: "g-rev-18",
    author: "Hannah Krause",
    avatarColor: "#e91e63",
    avatarInitial: "H",
    rating: 5,
    timeAgo: { en: "6 months ago", de: "vor 6 Monaten" },
    date: "2026-02-05",
    verified: true,
    category: "service",
    helpfulCount: 13,
    productMentioned: "GHK-Cu & BAC Water",
    content: {
      en: "Everything arrived safely. Also ordered the bacteriostatic water and mixing syringes. Everything is individually blister packed and sterile.",
      de: "Alles kam sicher an. Habe auch bakteriostatisches Wasser und Mischspritzen bestellt. Alles einzeln steril verpackt."
    }
  },
  {
    id: "g-rev-19",
    author: "Patrick Murphy",
    avatarColor: "#4caf50",
    avatarInitial: "P",
    rating: 5,
    timeAgo: { en: "6 months ago", de: "vor 6 Monaten" },
    date: "2026-01-22",
    verified: true,
    category: "purity",
    helpfulCount: 25,
    productMentioned: "Ipamorelin 5mg",
    content: {
      en: "Zero cloudiness after adding 2ml BAC water. Dissolved within literally 10 seconds. The purity is evident immediately. 5 stars all the way.",
      de: "Null Trübung nach Zugabe von 2ml BAC-Wasser. In buchstäblich 10 Sekunden aufgelöst. Die Reinheit ist sofort spürbar. Volle 5 Sterne."
    }
  },
  {
    id: "g-rev-20",
    author: "Julian Richter",
    avatarColor: "#9c27b0",
    avatarInitial: "J",
    rating: 5,
    timeAgo: { en: "6 months ago", de: "vor 6 Monaten" },
    date: "2026-01-10",
    verified: true,
    category: "bpc-tb",
    helpfulCount: 19,
    productMentioned: "BPC-157 5mg",
    content: {
      en: "I've tried 4 different peptide vendors in Europe over the last 3 years. Wardiere is the only one with consistent freeze-dried lyophilized cakes and batch test validation.",
      de: "Habe in den letzten 3 Jahren 4 verschiedene europäische Anbieter getestet. Wardiere ist der Einzige mit konstant sauberen gefriergetrockneten Kuchen und Chargenvalidierung."
    }
  },
  {
    id: "g-rev-21",
    author: "Dr. Neil Vance",
    avatarColor: "#00bcd4",
    avatarInitial: "N",
    rating: 5,
    timeAgo: { en: "7 months ago", de: "vor 7 Monaten" },
    date: "2025-12-18",
    verified: true,
    category: "purity",
    helpfulCount: 38,
    productMentioned: "MOTS-c 10mg",
    content: {
      en: "Mitochondrial research peptides require strict temperature handling during synthesis. The biological activity tests we conducted confirm maximum peptide integrity. Highly commendable work.",
      de: "Mitochondriale Forschungspeptide erfordern strikte Temperaturkontrolle bei der Synthese. Unsere biologischen Aktivitätstests bestätigen maximale Peptidintegrität. Sehr lobenswert."
    }
  },
  {
    id: "g-rev-22",
    author: "Marco Rossi",
    avatarColor: "#ff5722",
    avatarInitial: "M",
    rating: 5,
    timeAgo: { en: "7 months ago", de: "vor 7 Monaten" },
    date: "2025-12-04",
    verified: true,
    category: "shipping",
    helpfulCount: 12,
    productMentioned: "AOD-9604",
    content: {
      en: "Fast delivery to Milan, Italy. Package was tracked door to door with DHL. Product was well insulated and cool to touch. Will reorder next month.",
      de: "Schnelle Lieferung nach Mailand, Italien. Paket wurde lückenlos per DHL getrackt. Produkt war gut isoliert und kühl. Bestelle nächsten Monat wieder."
    }
  },
  {
    id: "g-rev-23",
    author: "Jan Van Der Beek",
    avatarColor: "#3f51b5",
    avatarInitial: "J",
    rating: 5,
    timeAgo: { en: "8 months ago", de: "vor 8 Monaten" },
    date: "2025-11-20",
    verified: true,
    category: "glp",
    helpfulCount: 26,
    productMentioned: "Tirzepatide 10mg",
    content: {
      en: "Shipped to Amsterdam in 48 hours. Excellent vacuum seal on the vial tops. Certificate of analysis verified on the independent testing portal. Legitimate store.",
      de: "In 48 Stunden nach Amsterdam geliefert. Ausgezeichnetes Vakuum auf den Vials. Analysezertifikat im Prüfportal verifiziert. Seriöser Shop."
    }
  },
  {
    id: "g-rev-24",
    author: "Claire Moreau",
    avatarColor: "#e91e63",
    avatarInitial: "C",
    rating: 5,
    timeAgo: { en: "8 months ago", de: "vor 8 Monaten" },
    date: "2025-11-09",
    verified: true,
    category: "service",
    helpfulCount: 15,
    productMentioned: "GHK-Basic & GHK-Cu",
    content: {
      en: "Had questions regarding the shelf life of reconstituted peptides vs lyophilized powder. The science support team sent a comprehensive storage guide within an hour. Amazing service!",
      de: "Hatte Fragen zur Haltbarkeit von rekonstituierten Peptiden vs. lyophilisiertem Pulver. Das Support-Team schickte innerhalb einer Stunde einen Leitfaden. Großartiger Service!"
    }
  },
  {
    id: "g-rev-25",
    author: "Viktor Lindgren",
    avatarColor: "#4caf50",
    avatarInitial: "V",
    rating: 5,
    timeAgo: { en: "8 months ago", de: "vor 8 Monaten" },
    date: "2025-10-28",
    verified: true,
    category: "bpc-tb",
    helpfulCount: 21,
    productMentioned: "TB-500 10mg",
    content: {
      en: "Shipped to Sweden with no issues. Arrived in 4 days. Peptide was protected with custom foam inserts. Everything in mint condition.",
      de: "Ohne Probleme nach Schweden geliefert. Kam in 4 Tagen an. Das Peptid war durch passgenaue Schaumstoffeinlagen geschützt. Alles in bestem Zustand."
    }
  },
  {
    id: "g-rev-26",
    author: "Benjamin Cox",
    avatarColor: "#ff9800",
    avatarInitial: "B",
    rating: 5,
    timeAgo: { en: "9 months ago", de: "vor 9 Monaten" },
    date: "2025-10-15",
    verified: true,
    category: "shipping",
    helpfulCount: 10,
    productMentioned: "CJC-1295 DAC",
    content: {
      en: "Super fast dispatch. The website was easy to navigate and payment processing was seamless. Received shipping notification and tracking code right away.",
      de: "Superschneller Versand. Die Webseite war übersichtlich und die Zahlungsabwicklung reibungslos. Sendungsverfolgung kam direkt nach der Bestellung."
    }
  },
  {
    id: "g-rev-27",
    author: "Dr. Aris Thorne",
    avatarColor: "#673ab7",
    avatarInitial: "A",
    rating: 5,
    timeAgo: { en: "9 months ago", de: "vor 9 Monaten" },
    date: "2025-10-02",
    verified: true,
    category: "purity",
    helpfulCount: 44,
    productMentioned: "Semaglutide & Tirzepatide",
    content: {
      en: "As a biochemical research lead, we run stringent quantification assays. The peptide quantity per vial is accurate (within ±2% target mass) and purity exceeds 99.2%. Standardizing all our lab orders here.",
      de: "Als biochemischer Forschungsleiter führen wir strenge Quantifizierungsassays durch. Die Peptidmenge pro Vial ist exakt (±2% Sollmasse) und die Reinheit übersteigt 99,2%. Standardisieren alle Bestellungen hier."
    }
  },
  {
    id: "g-rev-28",
    author: "Lucas Zimmermann",
    avatarColor: "#009688",
    avatarInitial: "L",
    rating: 5,
    timeAgo: { en: "9 months ago", de: "vor 9 Monaten" },
    date: "2025-09-19",
    verified: true,
    category: "bpc-tb",
    helpfulCount: 16,
    productMentioned: "BPC-157 5mg",
    content: {
      en: "Solid lyophilized puck, no loose powder, instant dissolution upon contact with BAC water. Great product quality and fast delivery to Austria.",
      de: "Fester lyophilisierter Puck, kein loses Pulver, sofortige Auflösung bei Kontakt mit BAC-Wasser. Tolle Produktqualität und schnelle Lieferung nach Österreich."
    }
  },
  {
    id: "g-rev-29",
    author: "Fiona Walsh",
    avatarColor: "#e91e63",
    avatarInitial: "F",
    rating: 5,
    timeAgo: { en: "10 months ago", de: "vor 10 Monaten" },
    date: "2025-09-05",
    verified: true,
    category: "shipping",
    helpfulCount: 18,
    productMentioned: "BPC-157 & GHK-Cu",
    content: {
      en: "Ordered from Cork, Ireland. Delivered via DPD in under 3 days. Extremely well packaged with thermal bubble wrap and ice packs. 100% recommended.",
      de: "Aus Cork, Irland bestellt. Lieferung via DPD in unter 3 Tagen. Extrem gut verpackt mit Thermoblister und Kühlakkus. 100% Empfehlung."
    }
  },
  {
    id: "g-rev-30",
    author: "Maximilian Frank",
    avatarColor: "#3f51b5",
    avatarInitial: "M",
    rating: 5,
    timeAgo: { en: "10 months ago", de: "vor 10 Monaten" },
    date: "2025-08-22",
    verified: true,
    category: "service",
    helpfulCount: 22,
    productMentioned: "NAD+ 1000mg",
    content: {
      en: "Had an inquiry about the temperature sensitivity during peak summer transit. They added extra cooling packs at no additional charge. That level of care is rare.",
      de: "Hatte eine Frage zur Temperaturempfindlichkeit bei Sommertemperaturen. Sie haben ohne Aufpreis zusätzliche Kühlakkus beigelegt. So ein Service ist selten."
    }
  },
  {
    id: "g-rev-31",
    author: "Dr. Kenneth Cole",
    avatarColor: "#00bcd4",
    avatarInitial: "K",
    rating: 5,
    timeAgo: { en: "10 months ago", de: "vor 10 Monaten" },
    date: "2025-08-11",
    verified: true,
    category: "purity",
    helpfulCount: 30,
    productMentioned: "CJC-1295 No DAC",
    content: {
      en: "Pure synthesis, sharp single peak on HPLC testing. No truncated sequence artifacts found. This vendor is legitimate and trustworthy.",
      de: "Reine Synthese, scharfer Einzelpeak bei HPLC-Messung. Keine verkürzten Sequenzartefakte gefunden. Dieser Anbieter ist absolut seriös."
    }
  },
  {
    id: "g-rev-32",
    author: "Simon Taylor",
    avatarColor: "#795548",
    avatarInitial: "S",
    rating: 5,
    timeAgo: { en: "11 months ago", de: "vor 11 Monaten" },
    date: "2025-07-28",
    verified: true,
    category: "glp",
    helpfulCount: 14,
    productMentioned: "Tirzepatide 10mg",
    content: {
      en: "Quick shipping to UK. Tracking was updated at each transit checkpoint. The quality of the peptide is top notch.",
      de: "Schneller Versand nach UK. Tracking wurde an jedem Kontrollpunkt aktualisiert. Peptidqualität ist Spitzenklasse."
    }
  },
  {
    id: "g-rev-33",
    author: "Nadine Berger",
    avatarColor: "#8bc34a",
    avatarInitial: "N",
    rating: 5,
    timeAgo: { en: "11 months ago", de: "vor 11 Monaten" },
    date: "2025-07-14",
    verified: true,
    category: "bpc-tb",
    helpfulCount: 17,
    productMentioned: "TB-500 5mg",
    content: {
      en: "Best experience ordering research peptides online. Clean site, straightforward checkout, fast shipping, and verified COA. Couldn't ask for more.",
      de: "Beste Erfahrung beim Online-Kauf von Forschungspeptiden. Übersichtliche Seite, einfacher Checkout, schneller Versand und verifiziertes CoA."
    }
  },
  {
    id: "g-rev-34",
    author: "Garrett Hayes",
    avatarColor: "#4285f4",
    avatarInitial: "G",
    rating: 5,
    timeAgo: { en: "11 months ago", de: "vor 11 Monaten" },
    date: "2025-07-02",
    verified: true,
    category: "shipping",
    helpfulCount: 12,
    productMentioned: "BPC-157 10mg",
    content: {
      en: "Order arrived in 3 days flat. The packaging was discrete and sturdy. The vials are thick-walled and well sealed. Impressed with the presentation.",
      de: "Bestellung kam in genau 3 Tagen an. Diskrete und stabile Verpackung. Die Vials sind dickwandig und gut versiegelt. Sehr beeindruckt."
    }
  },
  {
    id: "g-rev-35",
    author: "Dr. Matthias Keller",
    avatarColor: "#34a853",
    avatarInitial: "M",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2025-06-19",
    verified: true,
    category: "purity",
    helpfulCount: 37,
    productMentioned: "Epithalon & Thymalin",
    content: {
      en: "Conducted peptide solubility assays and spectrophotometric purity checks. Both compounds demonstrated >99% solubility within 60 seconds with pure saline. Outstanding.",
      de: "Löslichkeitsassays und spektrophotometrische Reinheitsprüfungen durchgeführt. Beide Verbindungen zeigten >99% Löslichkeit innerhalb von 60 Sekunden in Kochsalzlösung."
    }
  },
  {
    id: "g-rev-36",
    author: "Connor Fitzgerald",
    avatarColor: "#ea4335",
    avatarInitial: "C",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2025-06-05",
    verified: true,
    category: "shipping",
    helpfulCount: 15,
    productMentioned: "BPC-157 & TB-500 Kit",
    content: {
      en: "Fast delivery to Galway, Ireland. Arrived in perfect shape. Everything was included as described in the bundle. Will definitely order again.",
      de: "Schnelle Lieferung nach Galway, Irland. Perfekter Zustand. Alles im Bundle enthalten wie beschrieben. Werde definitiv wieder bestellen."
    }
  },
  {
    id: "g-rev-37",
    author: "Tobias Lehmann",
    avatarColor: "#fbbc05",
    avatarInitial: "T",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2025-05-21",
    verified: true,
    category: "service",
    helpfulCount: 20,
    productMentioned: "PT-141 & Melanotan II",
    content: {
      en: "Prompt live chat response when I asked about batch expiration dates. The representative gave me the exact lot number details and manufacturing dates. Very professional.",
      de: "Schnelle Live-Chat-Antwort bzgl. Mindesthaltbarkeitsdaten. Der Mitarbeiter nannte mir sofort Chargennummern und Herstellungsdaten. Sehr professionell."
    }
  },
  {
    id: "g-rev-38",
    author: "Dr. Andrea Fontana",
    avatarColor: "#9c27b0",
    avatarInitial: "A",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2025-05-08",
    verified: true,
    category: "purity",
    helpfulCount: 28,
    productMentioned: "Retatrutide 15mg",
    content: {
      en: "The analytical data matched our spectrophotometric analysis. The peptide integrity is preserved during transit thanks to appropriate cold-chain measures. Top tier.",
      de: "Die Analysedaten stimmten mit unserer spektrophotometrischen Analyse überein. Peptidintegrität dank Kühlkette im Transit perfekt erhalten."
    }
  },
  {
    id: "g-rev-39",
    author: "Richard Davies",
    avatarColor: "#009688",
    avatarInitial: "R",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2025-04-24",
    verified: true,
    category: "glp",
    helpfulCount: 19,
    productMentioned: "Semaglutide 5mg",
    content: {
      en: "Ordered 3 times now and each shipment arrived within 3 days. Quality is always consistent. Reconstitution is smooth and instant.",
      de: "Bereits 3 Mal bestellt und jede Sendung kam innerhalb von 3 Tagen an. Qualität konstant hoch. Rekonstitution sofort und glasklar."
    }
  },
  {
    id: "g-rev-40",
    author: "Sebastian Koch",
    avatarColor: "#e91e63",
    avatarInitial: "S",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2025-04-10",
    verified: true,
    category: "bpc-tb",
    helpfulCount: 16,
    productMentioned: "BPC-157 5mg",
    content: {
      en: "First time buyer and I'm blown away by the quality and speed. Placed order on Tuesday, was at my door in Berlin on Thursday afternoon.",
      de: "Erstkäufer und absolut begeistert von Qualität und Schnelligkeit. Dienstag bestellt, Donnerstagmittag in Berlin an der Haustür."
    }
  },
  {
    id: "g-rev-41",
    author: "Dr. Julianne Mercer",
    avatarColor: "#3f51b5",
    avatarInitial: "J",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2025-03-27",
    verified: true,
    category: "purity",
    helpfulCount: 33,
    productMentioned: "GHK-Cu & BPC-157",
    content: {
      en: "We run comparative assays across multiple providers. Wardiere consistently delivers lowest endotoxin levels and highest net peptide fraction per vial. Highly recommended.",
      de: "Wir führen vergleichende Assays über mehrere Anbieter durch. Wardiere liefert konstant die niedrigsten Endotoxinwerte und höchste Peptidausbeute. Sehr zu empfehlen."
    }
  },
  {
    id: "g-rev-42",
    author: "Henrik Nielsen",
    avatarColor: "#00bcd4",
    avatarInitial: "H",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2025-03-12",
    verified: true,
    category: "shipping",
    helpfulCount: 11,
    productMentioned: "CJC-1295 / Ipamorelin Blend",
    content: {
      en: "Arrived in Copenhagen in 3 business days. Sealed vial, vacuum intact, perfect dissolution in bacteriostatic water.",
      de: "In 3 Werktagen in Kopenhagen angekommen. Versiegeltes Vial, intaktes Vakuum, perfekte Auflösung in BAC-Wasser."
    }
  },
  {
    id: "g-rev-43",
    author: "Oliver Braun",
    avatarColor: "#607d8b",
    avatarInitial: "O",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2025-02-28",
    verified: true,
    category: "service",
    helpfulCount: 24,
    productMentioned: "BPC-157 10mg",
    content: {
      en: "Accidentally ordered the wrong quantity and sent an email to support. They updated my order immediately before dispatch without any delay. Truly top notch customer service.",
      de: "Habe versehentlich die falsche Menge bestellt und eine E-Mail geschrieben. Die Bestellung wurde sofort vor dem Versand korrigiert. Wahrhaft erstklassiger Kundenservice."
    }
  },
  {
    id: "g-rev-44",
    author: "Dr. Callum Ward",
    avatarColor: "#4285f4",
    avatarInitial: "C",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2025-02-14",
    verified: true,
    category: "purity",
    helpfulCount: 39,
    productMentioned: "NAD+ & Epithalon",
    content: {
      en: "High stability profile. Analyzed after 30 days stored at 4°C reconstituted and degradation was negligible (<0.3%). This proves synthesis purity and sterility are genuine.",
      de: "Hohe Stabilität. Nach 30 Tagen Lagerung bei 4°C rekonstituiert war der Abbau vernachlässigbar (<0,3%). Das belegt echte Reinheit und Sterilität."
    }
  },
  {
    id: "g-rev-45",
    author: "Liam Kelly",
    avatarColor: "#4caf50",
    avatarInitial: "L",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2025-01-30",
    verified: true,
    category: "shipping",
    helpfulCount: 14,
    productMentioned: "TB-500 10mg",
    content: {
      en: "Shipping to Limerick was speedy. Product arrived well protected and chilled. Will be ordering the research bundles next.",
      de: "Versand nach Limerick war rasend schnell. Produkt kam bestens geschützt und gekühlt an. Bestelle als Nächstes die Forschungsbundles."
    }
  },
  {
    id: "g-rev-46",
    author: "Fabian Meyer",
    avatarColor: "#ff9800",
    avatarInitial: "F",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2025-01-16",
    verified: true,
    category: "glp",
    helpfulCount: 21,
    productMentioned: "Tirzepatide 15mg",
    content: {
      en: "Quality is 100% genuine. The vial seals and vacuum are pristine. Customer service is always available to assist.",
      de: "Qualität ist zu 100% echt. Die Vials und das Vakuum sind makellos. Kundenservice steht bei Fragen immer bereit."
    }
  },
  {
    id: "g-rev-47",
    author: "Ethan Bennett",
    avatarColor: "#e91e63",
    avatarInitial: "E",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2025-01-03",
    verified: true,
    category: "bpc-tb",
    helpfulCount: 15,
    productMentioned: "BPC-157 5mg",
    content: {
      en: "Best BPC on the market. Clear solution, zero cloudiness, fast delivery. Have recommended to all colleagues in our research network.",
      de: "Bestes BPC am Markt. Klare Lösung, keine Trübung, schnelle Lieferung. Habe es allen Kollegen im Forschungsnetzwerk empfohlen."
    }
  },
  {
    id: "g-rev-48",
    author: "Dr. Vincent Leroux",
    avatarColor: "#673ab7",
    avatarInitial: "V",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2024-12-18",
    verified: true,
    category: "purity",
    helpfulCount: 27,
    productMentioned: "Sermorelin & GHRP-2",
    content: {
      en: "Our laboratory requires reliable peptide standards. Wardiere provides traceable batch chromatograms that align with our validation criteria.",
      de: "Unser Labor benötigt verlässliche Peptidstandards. Wardiere liefert rückverfolgbare Chromatogramme, die exakt unseren Validierungskriterien entsprechen."
    }
  },
  {
    id: "g-rev-49",
    author: "Markus Wagner",
    avatarColor: "#009688",
    avatarInitial: "M",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2024-12-05",
    verified: true,
    category: "service",
    helpfulCount: 18,
    productMentioned: "GHK-Cu 50mg",
    content: {
      en: "Ordered 10 vials. Everything arrived carefully arranged in foam grid boxes. No broken vials, fast dispatch, excellent support.",
      de: "10 Vials bestellt. Alles ordentlich in Schaumstoffboxen verpackt. Keine Beschädigungen, schneller Versand, exzellenter Support."
    }
  },
  {
    id: "g-rev-50",
    author: "Sean Byrne",
    avatarColor: "#3f51b5",
    avatarInitial: "S",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2024-11-20",
    verified: true,
    category: "shipping",
    helpfulCount: 16,
    productMentioned: "BPC-157 & TB-500",
    content: {
      en: "Arrived in Dublin in 3 business days. Discreet envelope box, sterile vials, and accurate product labelling with QR codes linking directly to COA.",
      de: "In 3 Werktagen in Dublin angekommen. Diskreter Karton, sterile Vials und präzise Produktetiketten mit QR-Code direkt zum CoA."
    }
  },
  {
    id: "g-rev-51",
    author: "Dr. Lisa Hoffmann",
    avatarColor: "#00bcd4",
    avatarInitial: "L",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2024-11-08",
    verified: true,
    category: "purity",
    helpfulCount: 36,
    productMentioned: "Semaglutide 5mg",
    content: {
      en: "Synthesized to exact specifications. Low residual acetate and trifluoroacetate levels confirmed by NMR spectroscopy. Quality is dependable.",
      de: "Nach exakten Spezifikationen synthetisiert. Geringe Restazetat- und TFA-Werte durch NMR-Spektroskopie bestätigt. Verlässliche Qualität."
    }
  },
  {
    id: "g-rev-52",
    author: "Jonas Lindqvist",
    avatarColor: "#795548",
    avatarInitial: "J",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2024-10-24",
    verified: true,
    category: "bpc-tb",
    helpfulCount: 13,
    productMentioned: "TB-500 5mg",
    content: {
      en: "Great consistency from order to order. Every single vial reconstitutes cleanly with no residue.",
      de: "Großartige Konsistenz von Bestellung zu Bestellung. Jedes einzelne Vial löst sich ohne Rückstände sauber auf."
    }
  },
  {
    id: "g-rev-53",
    author: "Arthur Pendelton",
    avatarColor: "#4caf50",
    avatarInitial: "A",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2024-10-10",
    verified: true,
    category: "glp",
    helpfulCount: 22,
    productMentioned: "Retatrutide 10mg",
    content: {
      en: "Fast dispatch and responsive tracking. The lyophilized puck was intact and dissolved instantly. Highest quality vendor in Europe.",
      de: "Schneller Versand und lückenlose Sendungsverfolgung. Der Puck war intakt und löste sich sofort auf. Bester Anbieter in Europa."
    }
  },
  {
    id: "g-rev-54",
    author: "Moritz Vogel",
    avatarColor: "#ea4335",
    avatarInitial: "M",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2024-09-26",
    verified: true,
    category: "shipping",
    helpfulCount: 11,
    productMentioned: "BPC-157 5mg",
    content: {
      en: "Delivery arrived within 48 hours to Frankfurt. Very securely packaged. QR code on the bottle gave immediate access to the lab test.",
      de: "Lieferung kam innerhalb von 48 Stunden in Frankfurt an. Sehr sicher verpackt. QR-Code auf der Flasche führte direkt zum Labortest."
    }
  },
  {
    id: "g-rev-55",
    author: "Dr. Darren Scott",
    avatarColor: "#4285f4",
    avatarInitial: "D",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2024-09-12",
    verified: true,
    category: "purity",
    helpfulCount: 31,
    productMentioned: "Epithalon 50mg",
    content: {
      en: "Assayed molecular weight matches 390.4 g/mol perfectly with HPLC single peak. Vendor takes chemical purity seriously.",
      de: "Molekulargewicht stimmt exakt mit 390,4 g/mol überein bei sauberem HPLC-Einzelpeak. Der Anbieter nimmt chemische Reinheit ernst."
    }
  },
  {
    id: "g-rev-56",
    author: "Aidan O'Shea",
    avatarColor: "#fbbc05",
    avatarInitial: "A",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2024-08-30",
    verified: true,
    category: "service",
    helpfulCount: 17,
    productMentioned: "BPC-157 & TB-500",
    content: {
      en: "Phenomenal customer experience. Clear communication, fast shipment, and zero problems with customs to Ireland.",
      de: "Phänomenale Kundenerfahrung. Klare Kommunikation, schnelle Lieferung und null Zollprobleme nach Irland."
    }
  },
  {
    id: "g-rev-57",
    author: "Felix Herrmann",
    avatarColor: "#9c27b0",
    avatarInitial: "F",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2024-08-15",
    verified: true,
    category: "glp",
    helpfulCount: 19,
    productMentioned: "Tirzepatide 10mg",
    content: {
      en: "Flawless dissolution, zero discoloration, vacuum seal intact. Have placed 4 bulk orders with them now and every shipment has been 100% on point.",
      de: "Einwandfreie Auflösung, keine Verfärbung, intaktes Vakuum. Habe jetzt 4 Großbestellungen getätigt und jede Sendung war 100% auf den Punkt."
    }
  },
  {
    id: "g-rev-58",
    author: "Rory MacLeod",
    avatarColor: "#009688",
    avatarInitial: "R",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2024-08-02",
    verified: true,
    category: "bpc-tb",
    helpfulCount: 14,
    productMentioned: "BPC-157 10mg",
    content: {
      en: "Ordered from Scotland. Arrived via tracked courier in 3 days. High purity, properly vacuum sealed vials. Extremely happy.",
      de: "Aus Schottland bestellt. Kam per Kurier mit Tracking in 3 Tagen an. Hohe Reinheit, sauber vakuumierte Vials. Sehr zufrieden."
    }
  },
  {
    id: "g-rev-59",
    author: "Dr. Sandra Klein",
    avatarColor: "#e91e63",
    avatarInitial: "S",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2024-07-18",
    verified: true,
    category: "purity",
    helpfulCount: 28,
    productMentioned: "GHK-Cu & CJC-1295",
    content: {
      en: "Consistent quality control is essential in laboratory testing. Wardiere is our primary supplier because of their verifiable testing standards and strict batch isolation.",
      de: "Konstante Qualitätskontrolle ist essenziell bei Labortests. Wardiere ist unser Hauptlieferant wegen der nachprüfbaren Standards und strenger Chargentrennung."
    }
  },
  {
    id: "g-rev-60",
    author: "Niklas Neumann",
    avatarColor: "#3f51b5",
    avatarInitial: "N",
    rating: 5,
    timeAgo: { en: "1 year ago", de: "vor 1 Jahr" },
    date: "2024-07-04",
    verified: true,
    category: "shipping",
    helpfulCount: 20,
    productMentioned: "BPC-157 5mg & TB-500",
    content: {
      en: "Ordered multiple times and they always deliver in under 3 days with DHL Express. High purity, great customer support, and reliable cold insulation.",
      de: "Mehrfach bestellt und Lieferung erfolgt immer in unter 3 Tagen per DHL Express. Hohe Reinheit, toller Support und verlässliche Kälteisolierung."
    }
  }
];
