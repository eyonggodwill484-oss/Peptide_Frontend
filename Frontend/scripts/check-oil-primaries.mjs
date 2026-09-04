import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, "../public/images/products/oils");

const oilDirs = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

const primaries = new Map();

for (const d of oilDirs) {
  const p = path.join(baseDir, d);
  const files = fs.readdirSync(p).filter(f => /\.(webp|jpg|png)$/i.test(f));
  if (files.length > 0) {
    const f1 = files[0];
    const hash = crypto.createHash("md5").update(fs.readFileSync(path.join(p, f1))).digest("hex");
    primaries.set(d, { file: f1, hash, total: files.length });
  }
}

// Find hash duplicates among primaries
const hashToDirs = new Map();
for (const [d, info] of primaries.entries()) {
  if (!hashToDirs.has(info.hash)) hashToDirs.set(info.hash, []);
  hashToDirs.get(info.hash).push({ dir: d, file: info.file });
}

console.log("=== PRIMARY IMAGE DUPLICATES IN STEROID OILS ===");
let dups = 0;
for (const [h, dirs] of hashToDirs.entries()) {
  if (dirs.length > 1) {
    dups++;
    console.log(`\nConflict #${dups}:`);
    for (const item of dirs) {
      console.log(`  - ${item.dir} -> ${item.file}`);
    }
  }
}
if (dups === 0) console.log("All oil primaries are UNIQUE!");
