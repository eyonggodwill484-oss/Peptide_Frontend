import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, "../public/images/products");

const files = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(f => !f.isDirectory())
  .map(f => f.name);

console.log(`Files directly in public/images/products (${files.length}):`);
console.log(files.join("\n"));
