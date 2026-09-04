import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, "../public/images/products");

function analyzeDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (["oils", "sarms", "tablets"].includes(e.name)) {
        analyzeDir(full);
      } else {
        const subFiles = fs.readdirSync(full, { withFileTypes: true })
          .filter(f => !f.isDirectory());
        const validFiles = subFiles.filter(f => fs.statSync(path.join(full, f.name)).size > 0);
        const zeroFiles = subFiles.filter(f => fs.statSync(path.join(full, f.name)).size === 0);
        const rel = path.relative(baseDir, full);
        if (validFiles.length === 0) {
          console.log(`❌ [EMPTY/0-BYTE ONLY] ${rel} (${zeroFiles.length} zero-byte files)`);
        } else if (zeroFiles.length > 0) {
          console.log(`⚠️ [PARTIAL ZERO-BYTE] ${rel}: ${validFiles.length} valid, ${zeroFiles.length} zero-byte`);
        } else {
          // all valid
          // console.log(`✅ [OK] ${rel}: ${validFiles.length} valid`);
        }
      }
    }
  }
}

console.log("Analyzing product directories for 0-byte/missing images:\n");
analyzeDir(baseDir);
