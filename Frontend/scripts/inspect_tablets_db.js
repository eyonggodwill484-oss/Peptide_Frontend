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

async function inspectTablets() {
  const { data: rows, error } = await client
    .from('products')
    .select(`
      id, name, slug, price, discount_price, category_id,
      category:categories(id, name, slug),
      product_images(id, image_url, created_at)
    `)
    .eq('category_id', 'a989ef7d-2cf1-45df-9226-e17f7fc706ff');

  console.log('Total Tablet rows in DB:', rows.length);
  rows.forEach(r => {
    const images = r.product_images?.map(i => i.image_url) || [];
    console.log(`[${r.name}] -> slug: "${r.slug}", price: €${r.price}, images: ${images.length} (${images[0] || 'no img'})`);
  });
}

inspectTablets();
