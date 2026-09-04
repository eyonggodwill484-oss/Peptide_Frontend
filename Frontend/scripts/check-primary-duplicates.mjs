import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, "../public/images/products");

function getHash(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(buf).digest("hex");
}

function findPrimaryImages(dir) {
  let list = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      list = list.concat(findPrimaryImages(full));
    } else if (/-1\.(webp|jpg|jpeg|png|jfif|avif)$/i.test(e.name)) {
      list.push(full);
    }
  }
  return list;
}

const primaries = findPrimaryImages(baseDir);
console.log(`Found ${primaries.length} primary (-1.*) images across all product folders.`);

const hashToFiles = new Map();
for (const p of primaries) {
  const h = getHash(p);
  if (!hashToFiles.has(h)) hashToFiles.set(h, []);
  hashToFiles.get(h).push(p);
}

let dups = 0;
for (const [h, files] of hashToFiles.entries()) {
  const folders = Array.from(new Set(files.map(f => path.basename(path.dirname(f)))));
  if (folders.length > 1) {
    dups++;
    console.log(`\n🔴 Primary Image Duplicate #${dups}:`);
    console.log(`   Folders:`, folders);
    for (const f of files) {
      console.log(`   - ${path.relative(baseDir, f)}`);
    }
  }
}

if (dups === 0) {
  console.log("🎉 ALL primary images across all product folders have UNIQUE binaries!");
} else {
  console.log(`\nTotal primary duplicate binary images: ${dups}`);
}
