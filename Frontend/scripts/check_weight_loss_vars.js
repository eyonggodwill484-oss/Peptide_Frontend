const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.resolve(__dirname, '../src/lib/data/variable-products.ts'), 'utf8');

const matches = [...content.matchAll(/makeVariant\(\{[\s\S]*?slug:\s*"([^"]+)"[\s\S]*?categorySlug:\s*"([^"]+)"[\s\S]*?\}\)/g)];

console.log('Total variable products:', matches.length);
matches.forEach(m => {
  if (m[2] === 'diabetes-and-weight-loss' || m[2] === 'weight-management') {
    console.log(`- Slug: ${m[1]} (Category: ${m[2]})`);
  }
});
