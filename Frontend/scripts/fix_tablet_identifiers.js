const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../src/lib/data/tablet-products.ts');
let content = fs.readFileSync(targetFile, 'utf8');

// Replace identifiers that start with a number
content = content.replace(/export const (\d[A-Z0-9_]*_IMAGES)/g, 'export const TAB_$1');
content = content.replace(/images: (\d[A-Z0-9_]*_IMAGES)/g, 'images: TAB_$1');

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Fixed numeric variable names in tablet-products.ts!');
