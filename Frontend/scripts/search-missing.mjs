import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, "../public/images/products");

const queries = [
  "ss-31", "elamipretide", "bendavia",
  "hmg", "gonadotropin",
  "insulin",
  "kisspeptin",
  "pnc-27", "pnc27",
  "pt-141", "pt141", "bremelanotide",
  "melatonin",
  "mgf",
  "mots", "mots-c",
  "tesamorelin",
  "kpv",
  "addy", "adderall",
  "avanafil", "stendra",
  "choline-chloride",
  "genotropin", "humatrope",
  "l-carnitine"
];

function searchDir(dir) {
  let found = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const lower = entry.name.toLowerCase();
    for (const q of queries) {
      if (lower.includes(q)) {
        found.push({ query: q, path: fullPath, isDir: entry.isDirectory() });
      }
    }
    if (entry.isDirectory()) {
      found = found.concat(searchDir(fullPath));
    }
  }
  return found;
}

const res = searchDir(baseDir);
console.log("Search matches in public/images/products:");
for (const r of res) {
  console.log(`- [${r.query}] ${r.isDir ? 'DIR' : 'FILE'}: ${path.relative(baseDir, r.path)}`);
}
