import fs from "fs";

const content = fs.readFileSync("src/lib/data/variable-products.ts", "utf8");

// Split by makeVariant
const parts = content.split("makeVariant({");

const productToImg = [];

for (let i = 1; i < parts.length; i++) {
  const block = parts[i].split("}),")[0];
  const nameMatch = block.match(/name:\s*["'`]([^"'`]+)["'`]/);
  const slugMatch = block.match(/slug:\s*["'`]([^"'`]+)["'`]/);
  const imgMatch = block.match(/images:\s*([a-zA-Z0-9_]+)/);
  if (nameMatch && imgMatch) {
    productToImg.push({
      name: nameMatch[1],
      slug: slugMatch ? slugMatch[1] : "",
      imgVar: imgMatch[1]
    });
  }
}

// Group by imgVar
const imgToProducts = new Map();
for (const item of productToImg) {
  if (!imgToProducts.has(item.imgVar)) imgToProducts.set(item.imgVar, []);
  imgToProducts.get(item.imgVar).push(item);
}

console.log(`Total variants in variable-products.ts: ${productToImg.length}`);
console.log(`Total unique image variables used: ${imgToProducts.size}\n`);

for (const [imgVar, list] of imgToProducts.entries()) {
  const baseNames = Array.from(new Set(list.map(x => x.name.split(" - ")[0].trim())));
  if (baseNames.length > 1) {
    console.log(`🔴 [${imgVar}] (${list.length} variants across ${baseNames.length} distinct products):`);
    for (const b of baseNames) {
      const sample = list.find(x => x.name.startsWith(b));
      console.log(`   - "${b}" (sample slug: ${sample.slug})`);
    }
  }
}
