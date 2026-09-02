const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

let env = {};
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const [k, ...v] = trimmed.split('=');
    if (k && v.length) env[k.trim()] = v.join('=').trim().replace(/^["']|["']$/g, '');
  });
}

const client = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

function extractBaseName(name) {
  return name
    .replace(/^(Buy|Order)\s+/i, '')
    .replace(/\s+Online\b/i, '')
    .replace(/\s*-\s*.*$/, '')
    .replace(/\s*\([^)]*\)/g, '')
    .trim();
}

async function checkCounts() {
  const [{ data: categories }, { data: products }] = await Promise.all([
    client.from('categories').select('*').eq('status', 'active'),
    client.from('products').select('id, name, slug, category_id, status').eq('status', 'published')
  ]);

  const catGroups = {};
  categories.forEach(c => catGroups[c.id] = { name: c.name, slug: c.slug, distinctLines: new Set(), rawCount: 0 });

  products.forEach(p => {
    if (catGroups[p.category_id]) {
      catGroups[p.category_id].rawCount++;
      const baseName = extractBaseName(p.name);
      catGroups[p.category_id].distinctLines.add(baseName.toLowerCase());
    }
  });

  console.log('Category Counts Comparison:');
  Object.values(catGroups).forEach(c => {
    console.log(`- ${c.name} (${c.slug}): raw rows = ${c.rawCount}, distinct product lines = ${c.distinctLines.size}`);
  });
}

checkCounts();
