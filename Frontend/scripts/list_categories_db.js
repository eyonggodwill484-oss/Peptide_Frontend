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

async function listCats() {
  const { data: cats } = await client.from('categories').select('*');
  console.log('Categories:', cats);
  const { data: prods } = await client.from('products').select('id, name, slug, category_id, product_images(image_url)');
  console.log('Total products in DB:', prods.length);
  
  // Count by category
  const counts = {};
  prods.forEach(p => {
    counts[p.category_id] = (counts[p.category_id] || 0) + 1;
  });
  console.log('Counts by category_id:', counts);
  
  // Look for tablet products
  const tabletProds = prods.filter(p => {
    const n = p.name.toLowerCase();
    return n.includes('anavar') || n.includes('dianabol') || n.includes('clenbuterol') || n.includes('anastrozole') || n.includes('enclomiphene') || n.includes('ivermectin') || n.includes('cholin');
  });
  console.log('Sample tablet prods in DB:', tabletProds.length);
  tabletProds.slice(0, 10).forEach(p => {
    const img = p.product_images?.[0]?.image_url || 'no-img';
    console.log(`- [${p.name}] -> cat: ${p.category_id}, img: ${img}`);
  });
}

listCats();
