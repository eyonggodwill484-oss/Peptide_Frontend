import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, "../public/images/products");

function deleteZeroByteFiles(dir) {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      count += deleteZeroByteFiles(full);
    } else {
      const sz = fs.statSync(full).size;
      if (sz === 0) {
        fs.unlinkSync(full);
        count++;
      }
    }
  }
  return count;
}

const deleted = deleteZeroByteFiles(baseDir);
console.log(`Successfully removed ${deleted} zero-byte empty placeholder files.`);
