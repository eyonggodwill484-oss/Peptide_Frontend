import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

process.env.NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

import { ALL_VARIABLE_PRODUCTS } from "../src/lib/data/variable-products";
import { ALL_SARMS_PRODUCTS } from "../src/lib/data/sarms-products";
import { ALL_WEIGHT_LOSS_PRODUCTS } from "../src/lib/data/weight-loss-products";
import { ALL_TABLET_PRODUCTS } from "../src/lib/data/tablet-products";
import { ALL_STEROID_OILS_PRODUCTS } from "../src/lib/data/steroid-oils-products";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "../public");

const allProducts = [
  ...ALL_VARIABLE_PRODUCTS,
  ...ALL_SARMS_PRODUCTS,
  ...ALL_WEIGHT_LOSS_PRODUCTS,
  ...ALL_TABLET_PRODUCTS,
  ...ALL_STEROID_OILS_PRODUCTS,
];

console.log(`Auditing ${allProducts.length} total products for file integrity...`);

let missingCount = 0;
let zeroByteCount = 0;
let totalImagesChecked = 0;
const checkedPaths = new Set();

for (const p of allProducts) {
  for (const img of p.images || []) {
    totalImagesChecked++;
    const src = img.src;
    if (checkedPaths.has(src)) continue;
    checkedPaths.add(src);

    const fullPath = path.join(publicDir, src);
    if (!fs.existsSync(fullPath)) {
      missingCount++;
      console.error(`❌ MISSING: Product "${p.name}" (${p.slug}) references non-existent file: ${src}`);
    } else {
      const sz = fs.statSync(fullPath).size;
      if (sz === 0) {
        zeroByteCount++;
        console.error(`⚠️ ZERO BYTE: Product "${p.name}" (${p.slug}) has 0-byte file: ${src}`);
      }
    }
  }
}

console.log(`\n================================`);
console.log(`Total image instances checked: ${totalImagesChecked}`);
console.log(`Unique image paths checked: ${checkedPaths.size}`);
console.log(`Missing files: ${missingCount}`);
console.log(`Zero-byte files: ${zeroByteCount}`);
console.log(`================================`);
