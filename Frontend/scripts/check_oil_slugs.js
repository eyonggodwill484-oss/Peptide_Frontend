const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.resolve(__dirname, '../src/lib/data/steroid-oils-products.ts'), 'utf8');
const slugs = [...content.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
console.log('Sample Oil Slugs:', slugs.slice(0, 10));
