import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, "../public/images/products");

const checkDirs = [
  "ace-031",
  "alprostadil",
  "dermorphin",
  "epithalon",
  "erythropoietin",
  "follistatin-344",
  "foxo4-dri",
  "gdf-8",
  "glutathione",
  "bpc-157-tb-500-blend",
  "bpc157-ghk-cu-blend",
  "survodutide"
];

for (const d of checkDirs) {
  const p = path.join(baseDir, d);
  if (fs.existsSync(p)) {
    console.log(`${d}:`, fs.readdirSync(p));
  } else {
    console.log(`${d}: DOES NOT EXIST`);
  }
}
