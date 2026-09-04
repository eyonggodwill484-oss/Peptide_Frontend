import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, "../public/images/products");

const items = [
  {
    name: "ace-031",
    dest: "ace-031/ace-031-1.webp",
    url: "https://biotechpeptides.com/wp-content/uploads/2021/11/ACE-031-1.webp"
  },
  {
    name: "alprostadil",
    dest: "alprostadil/alprostadil-1.webp",
    url: "https://res.cloudinary.com/oxford-online-pharmacy/image/upload/f_auto,w_800/alprostadil-10mcg-injection-1-pfizer.png"
  },
  {
    name: "bpc-157-tb-500-blend",
    dest: "bpc-157-tb-500-blend/bpc-157-tb-500-blend-1.webp",
    url: "https://biolongevitylabs.com/wp-content/uploads/2024/11/BPC-157_tb-500.jpg"
  },
  {
    name: "bpc157-ghk-cu-blend",
    dest: "bpc157-ghk-cu-blend/bpc157-ghk-cu-blend-1.webp",
    url: "https://www.proformapeptides.co.uk/wp-content/uploads/2026/02/GLOWBlend70mgV2.webp"
  },
  {
    name: "dermorphin",
    dest: "dermorphin/dermorphin-1.webp",
    url: "https://umbrellalabs.is/wp-content/uploads/2024/10/New-Umbrella-Labs-Dermorphin-10mg-Peptide-w-box-1024x1024.jpg"
  },
  {
    name: "epithalon",
    dest: "epithalon/epithalon-1.webp",
    url: "https://biolongevitylabs.com/wp-content/uploads/2025/01/Epithalon-20mg-1.jpg"
  },
  {
    name: "erythropoietin",
    dest: "erythropoietin/erythropoietin-1.webp",
    url: "https://5.imimg.com/data5/SELLER/Default/2024/7/434470373/HN/CZ/DX/224190403/dsc-0014-500x500.jpg"
  },
  {
    name: "follistatin-344",
    dest: "follistatin-344/follistatin-344-1.webp",
    url: "https://peptigrid.com/images/follistatin/follistatin-enhanced-pharma.webp"
  },
  {
    name: "foxo4-dri",
    dest: "foxo4-dri/foxo4-dri-1.webp",
    url: "https://biolongevitylabs.com/wp-content/uploads/2025/01/Fox04-dri-10mg.jpg"
  },
  {
    name: "gdf-8",
    dest: "gdf-8/gdf-8-1.webp",
    url: "https://uk.pharmalabglobal.com/wp-content/uploads/2023/06/GDF-8-Peptide.webp"
  },
  {
    name: "glutathione",
    dest: "glutathione/glutathione-1.webp",
    url: "https://umbrellalabs.is/wp-content/uploads/2024/03/New-Design-Umbrella-Labs-Glutathione-Peptide-1500mg-10mL-vial-w-box-1024x1024.jpg"
  },
  {
    name: "addy",
    dest: "tablets/addy/addy-1.webp",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adderall_bottle_and_capsules.jpg"
  },
  {
    name: "avanafil",
    dest: "tablets/avanafil/avanafil-1.webp",
    url: "https://5.imimg.com/data5/SELLER/Default/2025/8/540241519/HQ/TO/SN/243692231/avana-stendra-avanafil-tablet-500x500.jpg"
  },
  {
    name: "choline-chloride",
    dest: "tablets/choline-chloride/choline-chloride-1.webp",
    url: "https://www.solgar.com/sites/g/files/lpfasj931/files/2025-05/SO_008502_F.png"
  },
  {
    name: "genotropin",
    dest: "tablets/genotropin/genotropin-1.webp",
    url: "https://5.imimg.com/data5/SELLER/Default/2025/8/533696395/JY/FX/DL/37138216/genotropin-12mg-goquick-pen-36-iu-pfizer-fast-delivery-500x500.jpg"
  },
  {
    name: "humatrope",
    dest: "tablets/humatrope/humatrope-1.webp",
    url: "https://ecombe.nahdionline.com/media/catalog/product/1/0/101872676-0_1__1.jpg"
  },
  {
    name: "l-carnitine",
    dest: "tablets/l-carnitine/l-carnitine-1.webp",
    url: "https://www.solgar.com/sites/g/files/lpfasj931/files/2025-05/SO_005716_F.png"
  },
  {
    name: "methonine-oil",
    dest: "oils/methonine-oil/methonine-oil-1.webp",
    url: "https://www.lihuapharma.com/uploads/METHIONINE.jpg"
  },
  {
    name: "ss-31",
    dest: "ss-31/ss-31-1.webp",
    url: "https://www.royalpeptides.eu/wp-content/uploads/2026/02/SS31-10mg.png"
  },
  {
    name: "mots-c",
    dest: "mots-c/mots-c-1.webp",
    url: "https://umbrellalabs.is/wp-content/uploads/2021/11/New-Design-Umbrella-Labs-MOTS-C-Peptide-10mg-w-box-a-1080x1080.jpg"
  },
  {
    name: "kisspeptin-10",
    dest: "kisspeptin-10/kisspeptin-10-1.webp",
    url: "https://pub-82f90d490a8048aa9629f0ae3ea6f567.r2.dev/Product%20Images/KISSPEPTIN%20%2010mg.webp"
  },
  {
    name: "pt-141",
    dest: "pt-141/pt-141-1.webp",
    url: "https://bioedgeresearchlabs.com/wp-content/uploads/2025/04/pt-141.jpg"
  },
  {
    name: "hmg",
    dest: "hmg/hmg-1.webp",
    url: "https://purelabpeptides.com/wp-content/uploads/2025/08/HMG-75iu.png"
  },
  {
    name: "kpv",
    dest: "kpv/kpv-1.webp",
    url: "https://gridlinepeptides.com/cdn/shop/files/KP10_5f621385-1e98-4ec1-b306-40c20818a541.png?v=1785368822&width=1200"
  },
  {
    name: "pnc-27",
    dest: "pnc-27/pnc-27-1.webp",
    url: "https://www.uk-peptides.com/image/cache/catalog/PNC-27-600x600.jpg.webp"
  },
  {
    name: "gonadorelin",
    dest: "gonadorelin/gonadorelin-1.webp",
    url: "https://peptagon.com/cdn/shop/files/Gonadorelin-5mg.png?v=1768510871&width=1400"
  },
  {
    name: "triptorelin",
    dest: "triptorelin/triptorelin-1.webp",
    url: "https://umbrellalabs.is/wp-content/uploads/2021/10/New-Umbrella-Labs-Triptorelin-2mg-Peptide-w-box-1024x1024.jpg"
  },
  {
    name: "oxytocin",
    dest: "oxytocin/oxytocin-1.webp",
    url: "https://umbrellalabs.is/wp-content/uploads/2025/04/New-Umbrella-Labs-Oxytocin-2mg-Peptide-w-box-1024x1024.jpg"
  },
  {
    name: "hcg",
    dest: "hcg/hcg-1.webp",
    url: "https://swisschems.is/wp-content/uploads/2026/06/SC-HCG-5000IU-1-scaled-1-600x600.webp"
  },
  {
    name: "botox",
    dest: "botox/botox-1.webp",
    url: "https://www.drugs.com/images/pills/custom/pill32954-1/botox-100-units-powder-for-injection-medicine-114663.jpeg"
  },
  {
    name: "hyaluronic-acid",
    dest: "hyaluronic-acid/hyaluronic-acid-1.webp",
    url: "https://5.imimg.com/data5/SELLER/Default/2023/6/320014902/BC/UK/KV/2664145/hyaluronic-acid-injection-1-5-w-v-500x500.jpeg"
  },
  {
    name: "ll-37",
    dest: "ll-37/ll-37-1.webp",
    url: "https://bioedgeresearchlabs.com/wp-content/uploads/2025/05/3D-LL-37-10mg-Size-2.25-x-0.75-1-scaled.jpg"
  },
  {
    name: "insulin",
    dest: "insulin/insulin-1.webp",
    url: "https://www.mountainside-medical.com/cdn/shop/files/Novolin-R-Regular-Human-Insulin-_rDNA-Origin_-100-U--Injection-Multiple-Dose-Vial-10-mL_600x.jpg?v=1690821459"
  }
];

async function run() {
  console.log(`Starting download and processing of ${items.length} unique authentic assets...\n`);
  let success = 0;
  let failed = 0;

  for (const item of items) {
    const fullDest = path.join(baseDir, item.dest);
    const destDir = path.dirname(fullDest);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    try {
      console.log(`[${item.name}] Fetching ${item.url}...`);
      const res = await fetch(item.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
        },
        signal: AbortSignal.timeout(12000)
      });

      if (!res.ok) {
        throw new Error(`HTTP status ${res.status} ${res.statusText}`);
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      if (buffer.length === 0) {
        throw new Error("Received empty buffer");
      }

      await sharp(buffer)
        .resize(1000, 1000, {
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .webp({ quality: 90 })
        .toFile(fullDest);

      const sz = fs.statSync(fullDest).size;
      console.log(`  ✅ Successfully saved ${item.dest} (${sz} bytes)\n`);
      success++;
    } catch (err) {
      console.error(`  ❌ Failed for ${item.name}: ${err.message}\n`);
      failed++;
    }
  }

  console.log(`Summary: ${success} succeeded, ${failed} failed.`);
}

run().catch(console.error);
