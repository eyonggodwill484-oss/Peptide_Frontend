import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, "../public/images/products");

function findZeroByteFiles(dir) {
  let zeroFiles = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      zeroFiles = zeroFiles.concat(findZeroByteFiles(full));
    } else {
      const sz = fs.statSync(full).size;
      if (sz === 0) {
        zeroFiles.push(path.relative(baseDir, full));
      }
    }
  }
  return zeroFiles;
}

const zeros = findZeroByteFiles(baseDir);
console.log(`Found ${zeros.length} zero-byte files:`);
console.log(zeros.slice(0, 50).join("\n"));
