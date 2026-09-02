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

async function inspectAll() {
  const { data: rows } = await client
    .from('products')
    .select(`
      id, name, slug, short_description, description, price, discount_price, sku, brand,
      stock, featured, best_seller, status, rating, category_id, created_at,
      category:categories(id, name, slug),
      product_images(id, image_url, created_at)
    `)
    .eq('status', 'published');

  console.log('Total published DB products:', rows.length);

  const byCat = {};
  rows.forEach(r => {
    const catSlug = r.category?.slug || 'no-cat';
    if (!byCat[catSlug]) byCat[catSlug] = [];
    byCat[catSlug].push(r);
  });

  for (const [cat, prods] of Object.entries(byCat)) {
    console.log(`\nCategory: "${cat}" - Total DB rows: ${prods.length}`);
    // Check base names
    const names = prods.map(p => p.name);
    console.log(`Sample 5 products in ${cat}:`, names.slice(0, 5));
  }
}

inspectAll();
