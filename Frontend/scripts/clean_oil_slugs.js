const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../src/lib/data/steroid-oils-products.ts');
let content = fs.readFileSync(targetFile, 'utf8');

// Replace slug: "...-" with slug: "..."
content = content.replace(/slug:\s*"([^"]+)-"/g, 'slug: "$1"');
content = content.replace(/id:\s*"([^"]+)-"/g, 'id: "$1"');
content = content.replace(/rev-([^"]+)-1/g, (match, p1) => `rev-${p1.replace(/-$/, '')}-1`);

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Cleaned trailing hyphens in steroid-oils-products.ts!');
