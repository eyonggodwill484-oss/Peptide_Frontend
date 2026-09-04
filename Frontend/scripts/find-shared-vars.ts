import fs from "fs";
import path from "path";

const files = [
  "src/lib/data/variable-products.ts",
  "src/lib/data/sarms-products.ts",
  "src/lib/data/weight-loss-products.ts",
  "src/lib/data/tablet-products.ts",
  "src/lib/data/steroid-oils-products.ts"
];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  console.log(`\n=== Analyzing ${file} ===`);
  // Match blocks with name and images
  const regex = /name:\s*["'`]([^"'`]+)["'`][\s\S]*?images:\s*([a-zA-Z0-9_]+)/g;
  let match;
  const imageToNames = new Map<string, string[]>();
  while ((match = regex.exec(content)) !== null) {
    const name = match[1];
    const imgVar = match[2];
    if (!imageToNames.has(imgVar)) imageToNames.set(imgVar, []);
    imageToNames.get(imgVar)!.push(name);
  }

  for (const [imgVar, names] of imageToNames.entries()) {
    // Distinct base names (split by - )
    const baseNames = Array.from(new Set(names.map(n => n.split(" - ")[0].trim())));
    if (baseNames.length > 1) {
      console.log(`[Variable: ${imgVar}] shared between different products:`);
      console.log(`  Base names:`, baseNames);
    }
  }
}
