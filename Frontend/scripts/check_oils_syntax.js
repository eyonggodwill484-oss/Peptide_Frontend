const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.resolve(__dirname, '../src/lib/data/steroid-oils-products.ts'), 'utf8');

// Check for variable names starting with number or illegal chars
const varMatches = [...content.matchAll(/export const ([A-Za-z0-9_]+):/g)].map(m => m[1]);
console.log('Exported constants:', varMatches);

// Check for unclosed brackets or syntax issues
console.log('File length:', content.length);
const openBraces = (content.match(/\{/g) || []).length;
const closeBraces = (content.match(/\}/g) || []).length;
console.log(`Braces: { = ${openBraces}, } = ${closeBraces}`);
