const fs = require('fs');
const path = require('path');

const varFile = path.resolve(__dirname, '../src/lib/data/variable-products.ts');
const code = fs.readFileSync(varFile, 'utf8');

// Match all makeVariant calls
const matches = [...code.matchAll(/makeVariant\(\{[\s\S]*?slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?categorySlug:\s*"([^"]+)"/g)];

const peptides = new Map();
matches.forEach(m => {
  const [_, slug, name, cat] = m;
  if (cat === 'peptides' || cat === 'healing-recovery' || cat === 'cognitive-health' || cat === 'anti-aging-longevity') {
    // Extract base name
    const base = name.split(' - ')[0].trim();
    if (!peptides.has(base)) {
      peptides.set(base, []);
    }
    peptides.get(base).push({ slug, name, cat });
  }
});

console.log('Total distinct Peptide product lines in variable-products.ts:', peptides.size);
let idx = 1;
for (const [base, variants] of peptides.entries()) {
  console.log(`${idx++}. ${base} (${variants.length} variants, e.g. ${variants[0].slug})`);
}
