import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, "../public/images/products");

function scanDirs(dir, prefix = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullPath = path.join(dir, entry.name);
      const subEntries = fs.readdirSync(fullPath);
      const imgFiles = subEntries.filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));
      console.log(`${prefix}${entry.name} (${imgFiles.length} images): ${imgFiles.slice(0, 3).join(", ")}${imgFiles.length > 3 ? '...' : ''}`);
      if (entry.name === "oils" || entry.name === "sarms" || entry.name === "tablets") {
        scanDirs(fullPath, "  -> ");
      }
    }
  }
}

scanDirs(baseDir);
