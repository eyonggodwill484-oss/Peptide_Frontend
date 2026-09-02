const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../../New Products');
const entries = fs.readdirSync(baseDir);

const productCsvs = {};

entries.forEach(folder => {
  const folderPath = path.join(baseDir, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    const files = fs.readdirSync(folderPath);
    const csvFiles = files.filter(f => f.endsWith('.csv'));
    productCsvs[folder] = [];
    
    csvFiles.forEach(csv => {
      const csvPath = path.join(folderPath, csv);
      const content = fs.readFileSync(csvPath, 'utf8');
      const lines = content.split('\n').filter(l => l.trim().length > 0);
      const header = lines[0];
      
      // Parse keywords
      const keywords = [];
      for (let i = 1; i < lines.length; i++) {
        // Handle CSV quoting
        const line = lines[i];
        let kw = '';
        let volume = 0;
        let kd = 0;
        
        // Simple comma or semicolon or tab parse
        const parts = line.split(/[;\t,]/);
        if (parts.length > 0) {
          kw = parts[0].replace(/^["']|["']$/g, '').trim();
          volume = parseInt(parts[1]) || 0;
          kd = parseInt(parts[2]) || 0;
        }
        if (kw && kw.length > 2 && !kw.toLowerCase().includes('keyword')) {
          keywords.push({ keyword: kw, volume, kd, raw: line });
        }
      }
      productCsvs[folder].push({ file: csv, count: keywords.length, keywords });
    });
  }
});

let totalKeywords = 0;
for (const [prod, list] of Object.entries(productCsvs)) {
  const totalForProd = list.reduce((acc, c) => acc + c.count, 0);
  totalKeywords += totalForProd;
  console.log(`Product: ${prod} -> ${list.length} CSVs, Total Keywords: ${totalForProd}`);
  list.forEach(c => {
    console.log(`  - File: ${c.file} (${c.count} kws) | Top 3: ${c.keywords.slice(0, 3).map(k => `"${k.keyword}"`).join(', ')}`);
  });
}
console.log(`\nTOTAL UNIQUE KEYWORDS ACROSS ALL CSVS: ${totalKeywords}`);
