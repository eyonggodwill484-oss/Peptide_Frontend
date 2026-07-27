import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import {
  vialSVG,
  categoryTileSVG,
  articleCoverSVG,
  certificateSealSVG,
  avatarSVG,
} from "./lib/svg-templates.mjs";

const PUBLIC_DIR = path.resolve("public", "images");

const CATEGORY_THEMES = {
  "growth-factor-peptides": { from: "#eef2ff", to: "#e0e7ff", accent: "#4f46e5", cap: "#4f46e5", capDark: "#3730a3" },
  "metabolic-research": { from: "#ecfdf5", to: "#d1fae5", accent: "#0d9488", cap: "#0d9488", capDark: "#115e59" },
  "cognitive-research": { from: "#f5f3ff", to: "#ede9fe", accent: "#7c3aed", cap: "#7c3aed", capDark: "#5b21b6" },
  "recovery-repair": { from: "#fffbeb", to: "#fef3c7", accent: "#d97706", cap: "#d97706", capDark: "#92400e" },
  "bundles-kits": { from: "#fff1f2", to: "#ffe4e6", accent: "#e11d48", cap: "#e11d48", capDark: "#9f1239" },
  "lab-accessories": { from: "#ecfeff", to: "#cffafe", accent: "#0891b2", cap: "#0891b2", capDark: "#155e75" },
};

const PRODUCTS = [
  { slug: "ghk-cu-complex-50mg", code: "GHK-Cu", category: "growth-factor-peptides" },
  { slug: "igf-1-lr3-research-vial-1mg", code: "IGF-1 LR3", category: "growth-factor-peptides" },
  { slug: "sermorelin-acetate-5mg", code: "Sermorelin", category: "growth-factor-peptides" },
  { slug: "tesamorelin-research-blend-10mg", code: "Tesamorelin", category: "metabolic-research" },
  { slug: "aod-9604-fragment-5mg", code: "AOD-9604", category: "metabolic-research" },
  { slug: "mk-677-research-blend-10mg", code: "MK-677", category: "metabolic-research" },
  { slug: "semax-research-solution-10mg", code: "Semax", category: "cognitive-research" },
  { slug: "selank-research-vial-10mg", code: "Selank", category: "cognitive-research" },
  { slug: "cerebrolysin-analog-research-5mg", code: "Cerebrolysin", category: "cognitive-research" },
  { slug: "bpc-157-research-peptide-5mg", code: "BPC-157", category: "recovery-repair" },
  { slug: "tb-500-thymosin-beta4-research-5mg", code: "TB-500", category: "recovery-repair" },
  { slug: "recovery-complex-blend-10mg", code: "Recovery+", category: "recovery-repair" },
  { slug: "foundational-research-kit", code: "Kit · 3v", category: "bundles-kits" },
  { slug: "advanced-reconstitution-kit", code: "Recon Kit", category: "bundles-kits" },
  { slug: "cold-chain-starter-bundle", code: "Starter", category: "bundles-kits" },
  { slug: "bacteriostatic-water-30ml", code: "BAC Water", category: "lab-accessories" },
  { slug: "precision-micro-syringe-kit", code: "Syringes", category: "lab-accessories" },
  { slug: "digital-micro-milligram-scale", code: "Scale", category: "lab-accessories" },
];

const CATEGORIES = Object.keys(CATEGORY_THEMES);

const ARTICLES = [
  { slug: "understanding-peptide-purity-testing", theme: "growth-factor-peptides" },
  { slug: "cold-chain-storage-best-practices", theme: "metabolic-research" },
  { slug: "reading-a-certificate-of-analysis", theme: "cognitive-research" },
  { slug: "reconstitution-fundamentals-for-researchers", theme: "recovery-repair" },
  { slug: "hplc-vs-mass-spec-verification-methods", theme: "lab-accessories" },
];

const CERTIFICATES = [
  { id: "iso-9001-facility", label: "ISO 9001", theme: "growth-factor-peptides" },
  { id: "third-party-hplc", label: "HPLC ≥98%", theme: "metabolic-research" },
  { id: "gmp-aligned-process", label: "GMP Aligned", theme: "cognitive-research" },
  { id: "cold-chain-certified", label: "Cold-Chain", theme: "recovery-repair" },
];

const TESTIMONIALS = [
  { id: "reviewer-1", initials: "AR", theme: "growth-factor-peptides" },
  { id: "reviewer-2", initials: "JM", theme: "metabolic-research" },
  { id: "reviewer-3", initials: "SK", theme: "cognitive-research" },
  { id: "reviewer-4", initials: "TN", theme: "recovery-repair" },
  { id: "reviewer-5", initials: "PL", theme: "bundles-kits" },
  { id: "reviewer-6", initials: "DC", theme: "lab-accessories" },
];

const HERO_BOTTLES = [
  { id: "bottle-1", theme: "growth-factor-peptides", code: "GHK-Cu" },
  { id: "bottle-2", theme: "cognitive-research", code: "Semax" },
  { id: "bottle-3", theme: "recovery-repair", code: "BPC-157" },
  { id: "bottle-4", theme: "metabolic-research", code: "AOD-9604" },
  { id: "bottle-5", theme: "lab-accessories", code: "Recon" },
];

async function renderPng(svg, outPath, { width, height } = {}) {
  await mkdir(path.dirname(outPath), { recursive: true });
  let pipeline = sharp(Buffer.from(svg));
  if (width && height) pipeline = pipeline.resize(width, height);
  await pipeline.png({ quality: 90 }).toFile(outPath);
}

async function generateProducts() {
  for (const p of PRODUCTS) {
    const t = CATEGORY_THEMES[p.category];
    const primary = vialSVG({
      liquidFrom: t.from,
      liquidTo: t.to,
      capColor: t.cap,
      capColorDark: t.capDark,
      code: p.code,
    });
    await renderPng(primary, path.join(PUBLIC_DIR, "products", `${p.slug}.png`));

    const alt = vialSVG({
      liquidFrom: t.to,
      liquidTo: t.from,
      capColor: t.capDark,
      capColorDark: t.cap,
      code: p.code,
      glow: false,
    });
    await renderPng(alt, path.join(PUBLIC_DIR, "products", `${p.slug}-alt.png`));
  }
  console.log(`Generated ${PRODUCTS.length * 2} product images`);
}

async function generateCategories() {
  for (const slug of CATEGORIES) {
    const t = CATEGORY_THEMES[slug];
    const svg = categoryTileSVG({ colorFrom: t.accent, colorTo: t.capDark, accent: t.accent });
    await renderPng(svg, path.join(PUBLIC_DIR, "categories", `${slug}.png`));
  }
  console.log(`Generated ${CATEGORIES.length} category images`);
}

async function generateArticles() {
  for (const a of ARTICLES) {
    const t = CATEGORY_THEMES[a.theme];
    const svg = articleCoverSVG({ colorFrom: t.accent, colorTo: t.capDark, accent: "#ffffff" });
    await renderPng(svg, path.join(PUBLIC_DIR, "articles", `${a.slug}.png`));
  }
  console.log(`Generated ${ARTICLES.length} article cover images`);
}

async function generateCertificates() {
  for (const c of CERTIFICATES) {
    const t = CATEGORY_THEMES[c.theme];
    const svg = certificateSealSVG({ colorFrom: t.accent, colorTo: t.capDark, accent: "#fbbf24", label: c.label });
    await renderPng(svg, path.join(PUBLIC_DIR, "certificates", `${c.id}.png`));
  }
  console.log(`Generated ${CERTIFICATES.length} certificate images`);
}

async function generateAvatars() {
  for (const t of TESTIMONIALS) {
    const theme = CATEGORY_THEMES[t.theme];
    const svg = avatarSVG({ colorFrom: theme.accent, colorTo: theme.capDark, initials: t.initials });
    await renderPng(svg, path.join(PUBLIC_DIR, "avatars", `${t.id}.png`));
  }
  console.log(`Generated ${TESTIMONIALS.length} avatar images`);
}

async function generateHeroBottles() {
  for (const b of HERO_BOTTLES) {
    const t = CATEGORY_THEMES[b.theme];
    const svg = vialSVG({
      width: 900,
      height: 1400,
      liquidFrom: t.from,
      liquidTo: t.to,
      capColor: t.cap,
      capColorDark: t.capDark,
      code: b.code,
      transparent: true,
    });
    await renderPng(svg, path.join(PUBLIC_DIR, "hero", `${b.id}.png`));
  }
  console.log(`Generated ${HERO_BOTTLES.length} hero bottle images`);
}

async function main() {
  await generateProducts();
  await generateCategories();
  await generateArticles();
  await generateCertificates();
  await generateAvatars();
  await generateHeroBottles();
  console.log("All images generated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
