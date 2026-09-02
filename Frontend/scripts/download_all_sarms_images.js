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
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { timeout: 15000 }, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
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

const SARMS_SPECS = [
  {
    key: 'ac-262',
    name: 'AC-262',
    categorySlug: 'sarms-powders',
    categoryName: 'Sarms-powders',
    description: 'AC-262 is a selective androgen receptor modulator developed for research into tissue-selective androgenic signaling with minimal prostate stimulation.',
    shortDescription: 'Selective androgen receptor modulator for research use.',
    variants: [
      { strength: '5mg', price: 20 },
      { strength: '10mg', price: 30 },
      { strength: '15mg', price: 45 },
      { strength: '20mg', price: 60 },
      { strength: '30mg', price: 75 },
    ]
  },
  {
    key: 'aicar',
    name: 'AICAR',
    categorySlug: 'sarms-powders',
    categoryName: 'Sarms-powders',
    description: 'AICAR (5-Aminoimidazole-4-carboxamide ribonucleotide) is an AMPK activator widely studied in metabolic signaling and cellular energy regulation models.',
    shortDescription: 'Potent AMPK activator for metabolic research.',
    variants: [
      { strength: '10mg', price: 35 },
      { strength: '25mg', price: 60 },
      { strength: '50mg', price: 95 },
      { strength: '100mg', price: 150 },
      { strength: '500mg', price: 210 },
    ]
  },
  {
    key: 'andarine-s4',
    name: 'Andarine (S4)',
    categorySlug: 'sarms-powders',
    categoryName: 'Sarms-powders',
    description: 'Andarine (S-4) is a first-generation nonsteroidal selective androgen receptor modulator investigated for lean mass preservation and receptor affinity kinetics.',
    shortDescription: 'High-affinity SARM for androgenic receptor research.',
    variants: [
      { strength: '5mg', price: 25 },
      { strength: '10mg', price: 35 },
      { strength: '25mg', price: 45 },
      { strength: '100mg', price: 70 },
    ]
  },
  {
    key: 'gw0742',
    name: 'GW0742',
    categorySlug: 'sarms-powders',
    categoryName: 'Sarms-powders',
    description: 'GW0742 is a potent and highly selective PPARδ (peroxisome proliferator-activated receptor delta) agonist investigated in lipid metabolism and endurance pathways.',
    shortDescription: 'Selective PPARδ agonist for metabolic research.',
    variants: [
      { strength: '5mg', price: 30 },
      { strength: '10mg', price: 45 },
      { strength: '20mg', price: 65 },
    ]
  },
  {
    key: 'gw501516',
    name: 'GW501516',
    categorySlug: 'sarms-powders',
    categoryName: 'Sarms-powders',
    description: 'GW501516 (Cardarine) is a selective PPARδ agonist extensively studied for its roles in fatty acid oxidation, mitochondrial biogenesis, and exercise mimetics.',
    shortDescription: 'Research-grade PPARδ agonist for lipid oxidation studies.',
    variants: [
      { strength: '10mg', price: 45 },
      { strength: '20mg', price: 70 },
    ]
  },
  {
    key: 'lgd-3303',
    name: 'LGD 3303',
    categorySlug: 'sarms-powders',
    categoryName: 'Sarms-powders',
    description: 'LGD-3303 is an orally active nonsteroidal SARM known for high anabolic potency and selective binding in musculoskeletal research.',
    shortDescription: 'High-potency selective androgen receptor agonist.',
    variants: [
      { strength: '1mg', price: 15 },
      { strength: '2mg', price: 20 },
      { strength: '5mg', price: 30 },
      { strength: '10mg', price: 45 },
      { strength: '15mg', price: 60 },
      { strength: '50mg', price: 85 },
    ]
  },
  {
    key: 'lgd-4033',
    name: 'LGD 4033',
    categorySlug: 'sarms-powders',
    categoryName: 'Sarms-powders',
    description: 'LGD-4033 (Ligandrol) is a high-affinity SARM widely utilized in scientific studies exploring androgen receptor selectivity and protein synthesis pathways.',
    shortDescription: 'Ligandrol research powder with verified purity.',
    variants: [
      { strength: '2mg', price: 15 },
      { strength: '3mg', price: 20 },
      { strength: '5mg', price: 25 },
      { strength: '10mg', price: 30 },
      { strength: '25mg', price: 45 },
      { strength: '30mg', price: 60 },
    ]
  },
  {
    key: 'mk-2866',
    name: 'MK-2866',
    categorySlug: 'sarms-powders',
    categoryName: 'Sarms-powders',
    description: 'MK-2866 (Ostarine / Enobosarm) is one of the most thoroughly researched selective androgen receptor modulators for skeletal muscle integrity.',
    shortDescription: 'Ostarine reference standard for musculoskeletal assays.',
    variants: [
      { strength: '5mg', price: 15 },
      { strength: '10mg', price: 20 },
      { strength: '15mg', price: 25 },
      { strength: '20mg', price: 35 },
      { strength: '25mg', price: 45 },
    ]
  },
  {
    key: 'mk-677',
    name: 'MK-677',
    categorySlug: 'sarms-powders',
    categoryName: 'Sarms-powders',
    description: 'MK-677 (Ibutamoren) is a non-peptide, orally active ghrelin receptor agonist that stimulates pulsatile growth hormone and IGF-1 secretion.',
    shortDescription: 'Potent ghrelin receptor agonist and GH secretagogue.',
    variants: [
      { strength: '5mg', price: 10 },
      { strength: '10mg', price: 15 },
      { strength: '12.5mg', price: 25 },
      { strength: '25mg', price: 40 },
      { strength: '50mg', price: 55 },
      { strength: '100mg', price: 65 },
    ]
  },
  {
    key: 'otr-ac',
    name: 'OTR-AC',
    categorySlug: 'sarms-powders',
    categoryName: 'Sarms-powders',
    description: 'OTR-AC (Ostarine Acetate) is an esterified derivative of MK-2866 engineered for enhanced half-life and tissue bioavailability investigations.',
    shortDescription: 'Esterified Ostarine derivative for pharmacological kinetics.',
    variants: [
      { strength: '10mg', price: 20 },
      { strength: '15mg', price: 30 },
      { strength: '20mg', price: 40 },
      { strength: '25mg', price: 50 },
      { strength: '1000mg', price: 70 },
      { strength: '1500mg', price: 95 },
    ]
  },
  {
    key: 'rad-140',
    name: 'RAD-140',
    categorySlug: 'sarms-powders',
    categoryName: 'Sarms-powders',
    description: 'RAD-140 (Testolone) is a potent nonsteroidal SARM demonstrating high anabolic-to-androgenic ratio and neuroprotective properties in in-vitro models.',
    shortDescription: 'Testolone research powder with high receptor affinity.',
    variants: [
      { strength: '2.5mg', price: 20 },
      { strength: '5mg', price: 30 },
      { strength: '8mg', price: 40 },
      { strength: '10mg', price: 50 },
      { strength: '12.5mg', price: 60 },
      { strength: '20mg', price: 70 },
    ]
  },
  {
    key: 'rad-150',
    name: 'RAD-150',
    categorySlug: 'sarms-powders',
    categoryName: 'Sarms-powders',
    description: 'RAD-150 (TLB-150 Benzoate) is an esterified analogue of Testolone designed for prolonged duration of action in receptor-binding protocols.',
    shortDescription: 'TLB-150 Benzoate esterified SARM for extended half-life studies.',
    variants: [
      { strength: '5mg', price: 20 },
      { strength: '10mg', price: 30 },
      { strength: '20mg', price: 45 },
      { strength: '30mg', price: 60 },
    ]
  },
  {
    key: 's-23',
    name: 'S-23 SARM',
    categorySlug: 'sarms-powders',
    categoryName: 'Sarms-powders',
    description: 'S-23 is an investigational nonsteroidal selective androgen receptor modulator with exceptional binding affinity for androgen receptors.',
    shortDescription: 'High-affinity SARM investigated for spermatogenesis and anabolic signaling.',
    variants: [
      { strength: '5mg', price: 15 },
      { strength: '10mg', price: 20 },
      { strength: '20mg', price: 25 },
      { strength: '25mg', price: 35 },
      { strength: '100mg', price: 45 },
      { strength: '500mg', price: 55 },
      { strength: '1000mg', price: 70 },
    ]
  },
  {
    key: 'sr-9009',
    name: 'SR 9009',
    categorySlug: 'sarms-powders',
    categoryName: 'Sarms-powders',
    description: 'SR9009 (Stenabolic) is a synthetic Rev-ErbA agonist that regulates circadian rhythm, mitochondrial count, and basal metabolic rate in laboratory models.',
    shortDescription: 'Rev-ErbA agonist for circadian and metabolic research.',
    variants: [
      { strength: '5mg', price: 15 },
      { strength: '10mg', price: 20 },
      { strength: '15mg', price: 25 },
      { strength: '20mg', price: 35 },
      { strength: '30mg', price: 45 },
    ]
  },
  {
    key: 'sr9011',
    name: 'SR9011',
    categorySlug: 'sarms-powders',
    categoryName: 'Sarms-powders',
    description: 'SR9011 is a second-generation dual Rev-ErbA-α/β agonist studied for its modulation of cellular metabolism, energy expenditure, and inflammatory cytokines.',
    shortDescription: 'Dual Rev-ErbA agonist for cellular energy research.',
    variants: [
      { strength: '2mg', price: 20 },
      { strength: '5mg', price: 25 },
      { strength: '10mg', price: 30 },
      { strength: '20mg', price: 40 },
      { strength: '50mg', price: 50 },
      { strength: '100mg', price: 60 },
    ]
  },
  {
    key: 'yk11',
    name: 'YK11',
    categorySlug: 'sarms-powders',
    categoryName: 'Sarms-powders',
    description: 'YK11 is a steroidal SARM and myostatin inhibitor that acts through androgen receptor binding to induce follistatin expression.',
    shortDescription: 'Myostatin-inhibiting selective androgen receptor modulator.',
    variants: [
      { strength: '5mg', price: 15 },
      { strength: '10mg', price: 20 },
      { strength: '30mg', price: 25 },
      { strength: '50mg', price: 30 },
      { strength: '100mg', price: 40 },
    ]
  },
];

async function main() {
  const { data: rows } = await client
    .from('products')
    .select(`
      id, name, slug,
      product_images(id, image_url, created_at)
    `)
    .eq('category_id', 'b2140806-b698-496a-a357-2bdb93347ea6');

  const imagesBySarm = {};
  rows.forEach(r => {
    const urls = r.product_images?.map(i => i.image_url) || [];
    const upper = r.name.toUpperCase();
    let matched = null;
    if (upper.includes('AC-262') || upper.includes('AC262')) matched = 'ac-262';
    else if (upper.includes('AICAR')) matched = 'aicar';
    else if (upper.includes('S4') || upper.includes('ANDARINE')) matched = 'andarine-s4';
    else if (upper.includes('GW0742') || upper.includes('GW-0742')) matched = 'gw0742';
    else if (upper.includes('GW501516') || upper.includes('GW-501516') || upper.includes('CARDARINE')) matched = 'gw501516';
    else if (upper.includes('3303')) matched = 'lgd-3303';
    else if (upper.includes('4033') || upper.includes('LIGANDROL')) matched = 'lgd-4033';
    else if (upper.includes('2866') || upper.includes('OSTARINE')) matched = 'mk-2866';
    else if (upper.includes('677') || upper.includes('IBUTAMOREN')) matched = 'mk-677';
    else if (upper.includes('OTR-AC') || upper.includes('OTR AC')) matched = 'otr-ac';
    else if (upper.includes('RAD-150') || upper.includes('RAD150')) matched = 'rad-150';
    else if (upper.includes('RAD-140') || upper.includes('RAD140') || upper.includes('TESTOLONE')) matched = 'rad-140';
    else if (upper.includes('S-23') || upper.includes('S23')) matched = 's-23';
    else if (upper.includes('9011')) matched = 'sr9011';
    else if (upper.includes('9009') || upper.includes('STENABOLIC')) matched = 'sr-9009';
    else if (upper.includes('YK11') || upper.includes('YK-11')) matched = 'yk11';

    if (matched) {
      if (!imagesBySarm[matched]) imagesBySarm[matched] = new Set();
      urls.forEach(u => imagesBySarm[matched].add(u));
    }
  });

  const baseLocalDir = path.resolve(__dirname, '../public/images/products/sarms');
  ensureDir(baseLocalDir);

  const localImagesBySarm = {};

  console.log('Downloading all SARMs images locally to prevent upstream timeouts...');
  for (const sarm of SARMS_SPECS) {
    const targetDir = path.join(baseLocalDir, sarm.key);
    ensureDir(targetDir);

    const urls = [...(imagesBySarm[sarm.key] || [])];
    localImagesBySarm[sarm.key] = [];

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const filename = `${sarm.key}-${i + 1}.webp`;
      const destPath = path.join(targetDir, filename);
      const publicPath = `/images/products/sarms/${sarm.key}/${filename}`;

      try {
        if (!fs.existsSync(destPath) || fs.statSync(destPath).size === 0) {
          console.log(`Downloading ${sarm.key} image ${i + 1}...`);
          await downloadFile(url, destPath);
        }
        localImagesBySarm[sarm.key].push({
          src: publicPath,
          alt: `${sarm.name} - Pure Research Powder View ${i + 1}`,
          title: `${sarm.name} Research Powder`,
          width: 1200,
          height: 1200
        });
      } catch (err) {
        console.error(`Failed to download ${url}:`, err.message);
      }
    }
    console.log(`Saved ${localImagesBySarm[sarm.key].length} images for ${sarm.name}`);
  }

  // Generate updated sarms-products.ts
  let fileContent = `import { SITE_CURRENCY } from "@/constants/site";
import type { Product, ProductImage } from "@/types";

function makeSarmVariant(opts: {
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
    categorySlug: opts.categorySlug || "sarms-powders",
    categoryName: opts.categoryName || "Sarms-powders",
    price: opts.price,
    currency: SITE_CURRENCY,
    purity: "99%+",
    concentration: "Analytical Grade",
    images: opts.images,
    badges: opts.bestSeller ? ["best-seller"] : opts.featured ? ["featured"] : [],
    stock: "in-stock",
    stockCount: 50,
    rating: 4.9,
    reviewCount: 18,
    reviews: [
      {
        id: \`rev-\${opts.slug}-1\`,
        author: "Dr. Marcus V.",
        rating: 5,
        title: "Exceptional purity and assay consistency",
        content: "HPLC verification confirmed >99% purity. Highly recommended for precise research protocols.",
        date: "2026-08-15",
        verified: true,
      },
    ],
    specifications: [
      { name: "Purity", value: "≥99.0% (HPLC)" },
      { name: "Form", value: "Pure Lyophilized Powder" },
      { name: "Storage", value: "Store at -20°C in dry conditions" },
    ],
    certificateOfAnalysisUrl: undefined,
    featured: opts.featured || false,
    bestSeller: opts.bestSeller || false,
    createdAt: "2026-08-01T00:00:00.000Z",
  };
}

`;

  for (const sarm of SARMS_SPECS) {
    const images = localImagesBySarm[sarm.key] || [];
    const constName = sarm.key.toUpperCase().replace(/[^A-Z0-9]/g, '_') + '_IMAGES';
    fileContent += `export const ${constName}: ProductImage[] = [\n`;
    if (images.length > 0) {
      images.forEach((img) => {
        fileContent += `  {\n    src: "${img.src}",\n    alt: "${img.alt}",\n    title: "${img.title}",\n    width: 1200,\n    height: 1200,\n  },\n`;
      });
    } else {
      fileContent += `  {\n    src: "/images/hero/hero-lab-vials.png",\n    alt: "${sarm.name} Research Powder",\n    title: "${sarm.name} Powder",\n    width: 1200,\n    height: 1200,\n  },\n`;
    }
    fileContent += `];\n\n`;
  }

  fileContent += `export const ALL_SARMS_PRODUCTS: Product[] = [\n`;

  for (const sarm of SARMS_SPECS) {
    const constName = sarm.key.toUpperCase().replace(/[^A-Z0-9]/g, '_') + '_IMAGES';
    fileContent += `  // ${sarm.name}\n`;
    sarm.variants.forEach((v, idx) => {
      const slug = `${sarm.key}-${v.strength.toLowerCase()}`;
      const sku = `SARM-${sarm.key.toUpperCase()}-${v.strength.toUpperCase()}`;
      const name = `${sarm.name} - ${v.strength}`;
      const isCheapest = idx === 0;
      fileContent += `  makeSarmVariant({\n`;
      fileContent += `    slug: "${slug}",\n`;
      fileContent += `    sku: "${sku}",\n`;
      fileContent += `    name: "${name}",\n`;
      fileContent += `    shortDescription: "${sarm.shortDescription}",\n`;
      fileContent += `    description: "${sarm.description}",\n`;
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

  fs.writeFileSync(path.resolve(__dirname, '../src/lib/data/sarms-products.ts'), fileContent, 'utf8');
  console.log('Successfully saved local sarms-products.ts!');
}

main();
