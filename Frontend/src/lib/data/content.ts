import type { Testimonial, FaqItem, Article, CompanyStat, Certificate, Benefit } from "@/types";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "reviewer-1",
    author: "Dr. Amara Reyes",
    role: "Postdoctoral Researcher",
    organization: "Coastal Biomedical Institute",
    content:
      "The consistency between batches has been remarkable. Every certificate of analysis we've cross-checked against our own HPLC runs has matched within a fraction of a percent.",
    rating: 5,
    avatar: { src: "/images/avatars/reviewer-1.png", alt: "Portrait illustration for Dr. Amara Reyes", width: 400, height: 400 },
  },
  {
    id: "reviewer-2",
    author: "Julian Marsh",
    role: "Laboratory Manager",
    organization: "Northbridge Life Sciences",
    content:
      "Cold-chain packaging has never failed us across two years of biweekly orders. Documentation is thorough and support responds within hours.",
    rating: 5,
    avatar: { src: "/images/avatars/reviewer-2.png", alt: "Portrait illustration for Julian Marsh", width: 400, height: 400 },
  },
  {
    id: "reviewer-3",
    author: "Dr. Soo-ah Kim",
    role: "Principal Investigator",
    organization: "Ridgeview Neuroscience Lab",
    content:
      "We standardized our entire neuropeptide research pipeline around Wardiere after a single comparative purity audit against three other suppliers.",
    rating: 5,
    avatar: { src: "/images/avatars/reviewer-3.png", alt: "Portrait illustration for Dr. Soo-ah Kim", width: 400, height: 400 },
  },
  {
    id: "reviewer-4",
    author: "Tobias Nguyen",
    role: "Graduate Researcher",
    organization: "Delmar University",
    content:
      "As a grad student on a tight budget, the bundle kits made it possible to run a full comparative study without compromising on verified purity.",
    rating: 5,
    avatar: { src: "/images/avatars/reviewer-4.png", alt: "Portrait illustration for Tobias Nguyen", width: 400, height: 400 },
  },
  {
    id: "reviewer-5",
    author: "Petra Lindqvist",
    role: "Research Scientist",
    organization: "Alden Metabolic Research Group",
    content:
      "Their reconstitution kit alone eliminated most of our contamination variance. Small detail, but it mattered enormously for our data quality.",
    rating: 4,
    avatar: { src: "/images/avatars/reviewer-5.png", alt: "Portrait illustration for Petra Lindqvist", width: 400, height: 400 },
  },
  {
    id: "reviewer-6",
    author: "Derek Chow",
    role: "Lab Operations Director",
    organization: "Summit Peptide Research Group",
    content:
      "Order tracking and support communication are the best we've experienced from any research supplier we've worked with.",
    rating: 5,
    avatar: { src: "/images/avatars/reviewer-6.png", alt: "Portrait illustration for Derek Chow", width: 400, height: 400 },
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-research-use",
    question: "Are these products intended for human consumption?",
    answer:
      "No. All products sold by Wardiere Peptide Sciences are strictly intended for in-vitro laboratory research use only and are not approved for human or animal consumption, diagnostic, or therapeutic use.",
    category: "Compliance",
  },
  {
    id: "faq-coa",
    question: "How do I access a certificate of analysis for my order?",
    answer:
      "Every batch ships with a downloadable certificate of analysis (CoA) linked from the product page and included in your order confirmation email. You can also request a CoA at any time from our support team.",
    category: "Quality",
  },
  {
    id: "faq-shipping",
    question: "How are orders shipped to maintain cold-chain integrity?",
    answer:
      "Temperature-sensitive orders ship with dry ice or gel packs inside insulated packaging, with tracked overnight or two-day delivery depending on your region and order contents.",
    category: "Shipping",
  },
  {
    id: "faq-storage",
    question: "How should research peptides be stored upon arrival?",
    answer:
      "Lyophilized peptides should be stored at -20°C until reconstitution. Once reconstituted, most compounds should be kept at 2-8°C and used within the timeframe noted on the product specification sheet.",
    category: "Storage",
  },
  {
    id: "faq-purity",
    question: "What purity verification methods do you use?",
    answer:
      "Each batch undergoes third-party HPLC and mass spectrometry analysis to verify purity and molecular identity prior to release. Results are published in the accompanying certificate of analysis.",
    category: "Quality",
  },
  {
    id: "faq-returns",
    question: "What is your returns policy for research compounds?",
    answer:
      "Due to the nature of temperature-sensitive research compounds, we accept returns only for verified shipping damage or fulfillment errors reported within 48 hours of delivery. See our Returns Policy for full details.",
    category: "Orders",
  },
  {
    id: "faq-bulk",
    question: "Do you offer bulk or institutional pricing?",
    answer:
      "Yes. Research institutions and laboratories ordering in bulk can contact our team for volume-based pricing and dedicated account support.",
    category: "Orders",
  },
];

export const ARTICLES: Article[] = [
  {
    id: "art-purity-testing",
    slug: "understanding-peptide-purity-testing",
    title: "Understanding Peptide Purity Testing: HPLC, Mass Spec, and What the Numbers Mean",
    excerpt:
      "A breakdown of how third-party verification methods work, and how to read a certificate of analysis with confidence.",
    content:
      "Purity verification is the backbone of trustworthy research supply. This article walks through how HPLC and mass spectrometry results are generated, what a certificate of analysis should contain, and the red flags to watch for when evaluating any supplier's documentation.",
    author: "Wardiere Research Team",
    publishedAt: "2026-05-01",
    readingTimeMinutes: 7,
    tags: ["Quality", "Purity", "Documentation"],
    coverImage: {
      src: "/images/articles/understanding-peptide-purity-testing.png",
      alt: "Abstract indigo gradient cover illustration for an article about peptide purity testing",
      title: "Understanding Peptide Purity Testing article cover",
      width: 1600,
      height: 900,
    },
  },
  {
    id: "art-cold-chain",
    slug: "cold-chain-storage-best-practices",
    title: "Cold-Chain Storage Best Practices for Lyophilized Research Compounds",
    excerpt:
      "Practical guidelines for maintaining compound integrity from delivery through long-term freezer storage.",
    content:
      "Temperature excursions are one of the most common causes of degraded research results. Here's how to build a reliable cold-chain workflow, from the moment a shipment arrives to long-term storage protocols in your lab freezer.",
    author: "Wardiere Research Team",
    publishedAt: "2026-04-08",
    readingTimeMinutes: 6,
    tags: ["Storage", "Best Practices"],
    coverImage: {
      src: "/images/articles/cold-chain-storage-best-practices.png",
      alt: "Abstract teal gradient cover illustration for an article about cold-chain storage",
      title: "Cold-Chain Storage Best Practices article cover",
      width: 1600,
      height: 900,
    },
  },
  {
    id: "art-coa",
    slug: "reading-a-certificate-of-analysis",
    title: "How to Read a Certificate of Analysis Like a Quality Control Scientist",
    excerpt: "Every section of a CoA explained, from batch identifiers to chromatography traces.",
    content:
      "A certificate of analysis contains far more useful information than most researchers actually use. This guide walks section by section through a typical CoA so you can extract every relevant data point.",
    author: "Wardiere Research Team",
    publishedAt: "2026-03-14",
    readingTimeMinutes: 5,
    tags: ["Quality", "Documentation"],
    coverImage: {
      src: "/images/articles/reading-a-certificate-of-analysis.png",
      alt: "Abstract violet gradient cover illustration for an article about reading a certificate of analysis",
      title: "Reading a Certificate of Analysis article cover",
      width: 1600,
      height: 900,
    },
  },
  {
    id: "art-reconstitution",
    slug: "reconstitution-fundamentals-for-researchers",
    title: "Reconstitution Fundamentals: Avoiding the Most Common Lab Errors",
    excerpt: "A step-by-step overview of sterile reconstitution technique for lyophilized peptides.",
    content:
      "Improper reconstitution technique is responsible for a surprising share of inconsistent research results. This walkthrough covers sterile technique, appropriate diluents, and common contamination sources to avoid.",
    author: "Wardiere Research Team",
    publishedAt: "2026-02-20",
    readingTimeMinutes: 6,
    tags: ["Technique", "Best Practices"],
    coverImage: {
      src: "/images/articles/reconstitution-fundamentals-for-researchers.png",
      alt: "Abstract amber gradient cover illustration for an article about reconstitution fundamentals",
      title: "Reconstitution Fundamentals article cover",
      width: 1600,
      height: 900,
    },
  },
  {
    id: "art-hplc-vs-massspec",
    slug: "hplc-vs-mass-spec-verification-methods",
    title: "HPLC vs. Mass Spectrometry: Choosing the Right Verification Method",
    excerpt: "Comparing the strengths of each analytical method for research compound verification.",
    content:
      "Both HPLC and mass spectrometry play a role in verifying research compound identity and purity, but they answer different questions. Here's how each method works and when independent labs typically rely on one over the other.",
    author: "Wardiere Research Team",
    publishedAt: "2026-01-15",
    readingTimeMinutes: 8,
    tags: ["Quality", "Verification"],
    coverImage: {
      src: "/images/articles/hplc-vs-mass-spec-verification-methods.png",
      alt: "Abstract cyan gradient cover illustration for an article comparing HPLC and mass spectrometry",
      title: "HPLC vs Mass Spectrometry article cover",
      width: 1600,
      height: 900,
    },
  },
];

export const COMPANY_STATS: CompanyStat[] = [
  { id: "stat-batches", label: "Batches independently verified", value: 4200, suffix: "+" },
  { id: "stat-labs", label: "Research labs served", value: 1850, suffix: "+" },
  { id: "stat-countries", label: "Countries shipped to", value: 42 },
  { id: "stat-purity", label: "Average verified purity", value: 98.6, suffix: "%" },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "iso-9001-facility",
    name: "ISO 9001 Aligned Facility",
    issuer: "Independent Quality Auditor",
    description: "Our fulfillment facility operates under ISO 9001-aligned quality management processes.",
    image: {
      src: "/images/certificates/iso-9001-facility.png",
      alt: "Seal illustration representing ISO 9001 aligned facility certification",
      title: "ISO 9001 Aligned Facility seal",
      width: 600,
      height: 600,
    },
  },
  {
    id: "third-party-hplc",
    name: "Third-Party HPLC Verification",
    issuer: "Independent Analytical Laboratory",
    description: "Every batch is verified via third-party high-performance liquid chromatography.",
    image: {
      src: "/images/certificates/third-party-hplc.png",
      alt: "Seal illustration representing third-party HPLC verification",
      title: "Third-Party HPLC Verification seal",
      width: 600,
      height: 600,
    },
  },
  {
    id: "gmp-aligned-process",
    name: "GMP-Aligned Process Controls",
    issuer: "Internal Quality Assurance",
    description: "Manufacturing partners follow Good Manufacturing Practice aligned process controls.",
    image: {
      src: "/images/certificates/gmp-aligned-process.png",
      alt: "Seal illustration representing GMP aligned process controls",
      title: "GMP Aligned Process seal",
      width: 600,
      height: 600,
    },
  },
  {
    id: "cold-chain-certified",
    name: "Cold-Chain Fulfillment Certified",
    issuer: "Logistics Compliance Partner",
    description: "Our fulfillment and shipping partners are certified for cold-chain logistics compliance.",
    image: {
      src: "/images/certificates/cold-chain-certified.png",
      alt: "Seal illustration representing cold-chain fulfillment certification",
      title: "Cold-Chain Fulfillment Certified seal",
      width: 600,
      height: 600,
    },
  },
];

export const BENEFITS: Benefit[] = [
  {
    id: "benefit-verified",
    title: "Third-Party Verified",
    description: "Every batch is independently verified via HPLC and mass spectrometry before release.",
    icon: "ShieldCheck",
  },
  {
    id: "benefit-cold-chain",
    title: "Cold-Chain Fulfillment",
    description: "Temperature-sensitive orders ship with tracked, insulated cold-chain packaging.",
    icon: "Snowflake",
  },
  {
    id: "benefit-documentation",
    title: "Full Documentation",
    description: "Certificates of analysis and batch records are available for every product we ship.",
    icon: "FileCheck2",
  },
  {
    id: "benefit-support",
    title: "Responsive Research Support",
    description: "Our science-trained support team responds to inquiries within hours, not days.",
    icon: "MessagesSquare",
  },
];
