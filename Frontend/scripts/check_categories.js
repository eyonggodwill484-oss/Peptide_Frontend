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

async function run() {
  const { data: categories, error: cErr } = await client.from('categories').select('*');
  console.log('Categories:', categories);

  const { data: products, error: pErr } = await client.from('products').select('id, name, slug, category_id, status');
  console.log('Total products in DB:', products ? products.length : pErr);

  const catMap = {};
  if (categories) {
    categories.forEach(c => catMap[c.id] = { name: c.name, slug: c.slug, count: 0, products: [] });
  }
  if (products) {
    products.forEach(p => {
      if (catMap[p.category_id]) {
        catMap[p.category_id].count++;
        catMap[p.category_id].products.push(p.name);
      }
    });
  }

  console.log('\nDB Category counts:');
  Object.values(catMap).forEach(c => {
    console.log(`\n- Name: "${c.name}", Slug: "${c.slug}", Count: ${c.count}`);
    console.log(`  Samples:`, c.products.slice(0, 3));
  });
}

run();
