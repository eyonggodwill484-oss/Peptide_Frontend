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

async function collectSarmsImages() {
  const { data: rows } = await client
    .from('products')
    .select(`
      id, name, slug, price,
      product_images(id, image_url, created_at)
    `)
    .eq('category_id', 'b2140806-b698-496a-a357-2bdb93347ea6');

  const sarmsKeys = [
    'AC-262',
    'AICAR',
    'Andarine',
    'S4',
    'GW0742',
    'GW501516',
    'LGD 3303',
    'LGD3303',
    'LGD 4033',
    'LGD4033',
    'MK-2866',
    'MK-677',
    'MK677',
    'OTR-AC',
    'RAD-140',
    'RAD140',
    'RAD-150',
    'S-23',
    'S23',
    'SR 9009',
    'SR9009',
    'SR9011',
    'YK11',
    'YK-11'
  ];

  const imagesBySarm = {};
  rows.forEach(r => {
    const imgUrls = r.product_images?.map(i => i.image_url) || [];
    imgUrls.forEach(url => {
      // Find matching SARM
      const upper = r.name.toUpperCase();
      let matched = null;
      if (upper.includes('AC-262') || upper.includes('AC262')) matched = 'AC-262';
      else if (upper.includes('AICAR')) matched = 'AICAR';
      else if (upper.includes('S4') || upper.includes('ANDARINE')) matched = 'Andarine (S4)';
      else if (upper.includes('GW0742') || upper.includes('GW-0742')) matched = 'GW0742';
      else if (upper.includes('GW501516') || upper.includes('GW-501516') || upper.includes('CARDARINE')) matched = 'GW501516';
      else if (upper.includes('3303')) matched = 'LGD 3303';
      else if (upper.includes('4033') || upper.includes('LIGANDROL')) matched = 'LGD 4033';
      else if (upper.includes('2866') || upper.includes('OSTARINE')) matched = 'MK-2866';
      else if (upper.includes('677') || upper.includes('IBUTAMOREN')) matched = 'MK-677';
      else if (upper.includes('OTR-AC') || upper.includes('OTR AC')) matched = 'OTR-AC';
      else if (upper.includes('RAD-150') || upper.includes('RAD150')) matched = 'RAD-150';
      else if (upper.includes('RAD-140') || upper.includes('RAD140') || upper.includes('TESTOLONE')) matched = 'RAD-140';
      else if (upper.includes('S-23') || upper.includes('S23')) matched = 'S-23 SARM';
      else if (upper.includes('9011')) matched = 'SR9011';
      else if (upper.includes('9009') || upper.includes('STENABOLIC')) matched = 'SR 9009';
      else if (upper.includes('YK11') || upper.includes('YK-11')) matched = 'YK11';

      if (matched) {
        if (!imagesBySarm[matched]) imagesBySarm[matched] = new Set();
        imagesBySarm[matched].add(url);
      }
    });
  });

  console.log('Images collected per SARM from existing variants:');
  for (const [sarm, set] of Object.entries(imagesBySarm)) {
    console.log(`\n[${sarm}] (${set.size} images):`);
    [...set].forEach(u => console.log(`  - ${u}`));
  }
}

collectSarmsImages();
