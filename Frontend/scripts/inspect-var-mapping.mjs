import fs from "fs";

const content = fs.readFileSync("src/lib/data/variable-products.ts", "utf8");
const blocks = content.split("makeVariant({");

const list = [];
for (let i = 1; i < blocks.length; i++) {
  const b = blocks[i].split("}),")[0];
  const nameMatch = b.match(/name:\s*["'`]([^"'`]+)["'`]/);
  const imgMatch = b.match(/images:\s*([A-Za-z0-9_]+)/);
  if (nameMatch) {
    const baseName = nameMatch[1].split(" - ")[0].trim();
    list.push({
      index: i,
      name: nameMatch[1],
      baseName,
      imgVar: imgMatch ? imgMatch[1] : "(uses default getProductImagesForProduct)"
    });
  }
}

// Group by baseName
const grouped = new Map();
for (const item of list) {
  if (!grouped.has(item.baseName)) grouped.set(item.baseName, []);
  grouped.get(item.baseName).push(item);
}

for (const [base, items] of grouped.entries()) {
  const vars = Array.from(new Set(items.map(x => x.imgVar)));
  console.log(`- "${base}" (${items.length} variants) => ${vars.join(", ")}`);
}
