import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, "../public/images/products");

const list = [
  {
    name: "dermorphin",
    dest: "dermorphin/dermorphin-1.webp",
    url: "https://5.imimg.com/data5/SELLER/Default/2024/12/470170145/KH/FI/DK/233901185/20221218-041111-copy-2-500x500.jpg"
  },
  {
    name: "foxo4-dri",
    dest: "foxo4-dri/foxo4-dri-1.webp",
    url: "https://5.imimg.com/data5/SELLER/Default/2025/6/521392837/CW/IN/AJ/100951759/fox04-dri-10-mg-peptide-science-500x500.png"
  },
  {
    name: "glutathione",
    dest: "glutathione/glutathione-1.webp",
    url: "https://5.imimg.com/data5/FP/OE/MY-6548604/gluthialiv-glutathione-for-injection-600-mg-500x500.jpeg"
  },
  {
    name: "pt-141",
    dest: "pt-141/pt-141-1.webp",
    url: "https://chiltonlabs.co.uk/wp-content/uploads/2024/07/PT141.png"
  },
  {
    name: "mots-c",
    dest: "mots-c/mots-c-1.webp",
    url: "https://nurapeptide.com/wp-content/uploads/2026/08/MOTS-C-new-product.webp"
  },
  {
    name: "triptorelin",
    dest: "triptorelin/triptorelin-1.webp",
    url: "https://5.imimg.com/data5/SELLER/Default/2024/7/434221050/MX/UO/TT/155134260/triptorelin1-500x500.jpg"
  },
  {
    name: "oxytocin",
    dest: "oxytocin/oxytocin-1.webp",
    url: "https://peptagon.com/cdn/shop/files/Oxytocin10mg.png?v=1783607092&width=1400"
  }
];

async function run() {
  for (const item of list) {
    const fullDest = path.join(baseDir, item.dest);
    const destDir = path.dirname(fullDest);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    try {
      console.log(`[${item.name}] Downloading ${item.url}...`);
      const res = await fetch(item.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
        },
        signal: AbortSignal.timeout(12000)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await sharp(buf)
        .resize(1000, 1000, {
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .webp({ quality: 90 })
        .toFile(fullDest);
      console.log(`  ✅ Successfully saved ${item.dest} (${fs.statSync(fullDest).size} bytes)`);
    } catch (e) {
      console.error(`  ❌ Failed for ${item.name}: ${e.message}`);
    }
  }

  // Handle local high-res conversions:
  // 1. bpc-157-tb-500-blend from recovery-complex-blend-10mg.png
  const bpcTbSrc = path.join(baseDir, "recovery-complex-blend-10mg.png");
  const bpcTbDest = path.join(baseDir, "bpc-157-tb-500-blend/bpc-157-tb-500-blend-1.webp");
  if (fs.existsSync(bpcTbSrc)) {
    await sharp(bpcTbSrc)
      .resize(1000, 1000, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .webp({ quality: 90 })
      .toFile(bpcTbDest);
    console.log(`  ✅ Successfully converted local asset to bpc-157-tb-500-blend-1.webp`);
  }

  // 2. bpc157-ghk-cu-blend from tb-bpc-ghk-1.avif
  const bpcGhkSrc = path.join(baseDir, "tb-bpc-ghk/tb-bpc-ghk-1.avif");
  const bpcGhkDest = path.join(baseDir, "bpc157-ghk-cu-blend/bpc157-ghk-cu-blend-1.webp");
  if (fs.existsSync(bpcGhkSrc)) {
    await sharp(bpcGhkSrc)
      .resize(1000, 1000, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .webp({ quality: 90 })
      .toFile(bpcGhkDest);
    console.log(`  ✅ Successfully converted local asset to bpc157-ghk-cu-blend-1.webp`);
  }

  // 3. tesamorelin from tesamorelin-research-blend-10mg.png
  const tesaSrc = path.join(baseDir, "tesamorelin-research-blend-10mg.png");
  const tesaDir = path.join(baseDir, "tesamorelin");
  if (!fs.existsSync(tesaDir)) fs.mkdirSync(tesaDir, { recursive: true });
  const tesaDest = path.join(tesaDir, "tesamorelin-1.webp");
  if (fs.existsSync(tesaSrc)) {
    await sharp(tesaSrc)
      .resize(1000, 1000, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .webp({ quality: 90 })
      .toFile(tesaDest);
    console.log(`  ✅ Successfully converted local asset to tesamorelin-1.webp`);
  }
}

run().catch(console.error);
