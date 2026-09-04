import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, "../public/images/products/oils");

function getHash(p) {
  return crypto.createHash("md5").update(fs.readFileSync(p)).digest("hex");
}

const allHashes = new Map();

for (const d of fs.readdirSync(baseDir)) {
  const p = path.join(baseDir, d);
  if (!fs.statSync(p).isDirectory()) continue;
  for (const f of fs.readdirSync(p)) {
    if (/\.(webp|jpg)$/i.test(f)) {
      const h = getHash(path.join(p, f));
      if (!allHashes.has(h)) allHashes.set(h, []);
      allHashes.get(h).push({ dir: d, file: f });
    }
  }
}

// For the 5 conflicts, see if there is an image in the directory that is completely unique
const conflicts = [
  "boldenone-undecylenate-oil",
  "drostanolone-enanthate-oil",
  "drostanolone-propionate-oil",
  "l-carnitine-injectable-oil",
  "nad-plus-oil",
  "stanozolol-suspension-oil",
  "methenolone-enanthate-oil"
];

console.log("=== UNIQUE IMAGES AVAILABLE IN CONFLICT DIRS ===");
for (const c of conflicts) {
  const p = path.join(baseDir, c);
  const files = fs.readdirSync(p).filter(f => /\.(webp|jpg)$/i.test(f));
  const uniqueFiles = files.filter(f => {
    const h = getHash(path.join(p, f));
    return allHashes.get(h).length === 1;
  });
  console.log(`\nDirectory ${c} (${files.length} total files):`);
  if (uniqueFiles.length > 0) {
    console.log(`  ✅ ${uniqueFiles.length} UNIQUE images found:`, uniqueFiles);
  } else {
    console.log(`  ❌ NO completely unique image found!`);
  }
}
