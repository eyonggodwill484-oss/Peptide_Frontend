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

async function testGrouping() {
  const { data: rows } = await client
    .from('products')
    .select(`
      id, name, slug, price, discount_price, category_id,
      category:categories(id, name, slug)
    `)
    .eq('status', 'published');

  const byCat = {};
  rows.forEach(r => {
    const catSlug = r.category?.slug || 'no-cat';
    if (!byCat[catSlug]) byCat[catSlug] = [];
    byCat[catSlug].push(r);
  });

  console.log('Grouped Lines Count per Category:');
  for (const [cat, prods] of Object.entries(byCat)) {
    const groups = {};
    prods.forEach(p => {
      const base = extractBaseName(p.name);
      if (!groups[base]) groups[base] = [];
      groups[base].push(p);
    });
    console.log(`- ${cat}: ${prods.length} variants -> ${Object.keys(groups).length} distinct product groups`);
    if (cat === 'sarms-powders') {
      console.log('  SARMs distinct lines:', Object.keys(groups));
    }
  }
}

testGrouping();
