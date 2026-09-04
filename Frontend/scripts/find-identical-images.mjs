import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(full));
    } else if (/\.(jpg|jpeg|png|webp|avif)$/i.test(file)) {
      results.push(full);
    }
  }
  return results;
}

function getHash(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(buf).digest("hex");
}

const baseDir = path.join(__dirname, "../public/images/products");
const allFiles = getFiles(baseDir);
console.log(`Scanning ${allFiles.length} image files in ${baseDir}...`);

const hashMap = new Map();
for (const file of allFiles) {
  const hash = getHash(file);
  if (!hashMap.has(hash)) hashMap.set(hash, []);
  hashMap.get(hash).push(file);
}

console.log("\n=== IDENTICAL IMAGE FILES FOUND IN DIFFERENT FOLDERS ===");
let duplicateGroups = 0;
for (const [hash, files] of hashMap.entries()) {
  const folders = Array.from(new Set(files.map(f => path.basename(path.dirname(f)))));
  if (folders.length > 1) {
    duplicateGroups++;
    console.log(`\n[Duplicate Group #${duplicateGroups}] MD5: ${hash}`);
    console.log(`  Found in ${folders.length} different folders:`, folders);
    for (const f of files) {
      console.log(`   - ${path.relative(path.join(__dirname, '..'), f)}`);
    }
  }
}

console.log(`\nTotal duplicate image groups across different product folders: ${duplicateGroups}`);
