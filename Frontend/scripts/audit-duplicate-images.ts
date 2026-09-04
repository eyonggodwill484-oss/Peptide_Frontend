import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { ALL_VARIABLE_PRODUCTS } from "../src/lib/data/variable-products";
import { ALL_SARMS_PRODUCTS } from "../src/lib/data/sarms-products";
import { ALL_WEIGHT_LOSS_PRODUCTS } from "../src/lib/data/weight-loss-products";
import { ALL_TABLET_PRODUCTS } from "../src/lib/data/tablet-products";
import { ALL_STEROID_OILS_PRODUCTS } from "../src/lib/data/steroid-oils-products";
import { extractBaseName } from "../src/lib/variant-parser";
import { supabase } from "../src/lib/supabase/client";

async function main() {
  const all = [
    ...ALL_VARIABLE_PRODUCTS,
    ...ALL_SARMS_PRODUCTS,
    ...ALL_WEIGHT_LOSS_PRODUCTS,
    ...ALL_TABLET_PRODUCTS,
    ...ALL_STEROID_OILS_PRODUCTS,
  ];

  // Also query DB products!
  const { data: dbProducts } = await supabase
    .from("products")
    .select("id, name, slug, category_id, category:categories(name, slug), product_images(image_url)")
    .eq("status", "published");

  console.log(`DB products count: ${dbProducts?.length || 0}`);
  if (dbProducts) {
    for (const dbp of dbProducts as any[]) {
      if (dbp.name.toLowerCase().includes("trenbolone") || dbp.name.toLowerCase().includes("survodutide")) {
        console.log(`DB product: ${dbp.name} | slug: ${dbp.slug} | images: ${dbp.product_images?.map((i: any) => i.image_url).join(', ')}`);
      }
    }
  }

  // Look for Trenbolone in local products
  console.log("\n--- LOCAL TRENBOLONE PRODUCTS ---");
  for (const p of all) {
    if (p.name.toLowerCase().includes("trenbolone")) {
      console.log(`Local: ${p.name} | slug: ${p.slug} | image: ${p.images?.[0]?.src}`);
    }
  }

  // Let's find all duplicate images between DIFFERENT product lines
  const imageToProducts = new Map<string, typeof all>();
  for (const p of all) {
    const src = p.images?.[0]?.src || "NONE";
    if (!imageToProducts.has(src)) imageToProducts.set(src, []);
    imageToProducts.get(src)!.push(p);
  }

  console.log("\n=== CROSS-PRODUCT CONFLICTS (Different Base Names using Same Image) ===");
  for (const [src, prods] of imageToProducts.entries()) {
    const baseNames = Array.from(new Set(prods.map(p => extractBaseName(p.name))));
    if (baseNames.length > 1) {
      console.log(`\n[Conflict] Image: ${src}`);
      console.log(`  Base names (${baseNames.length}):`, baseNames);
    }
  }

  // Also check if any DB products share image_url with other DB products
  if (dbProducts) {
    const dbImageToProducts = new Map<string, any[]>();
    for (const p of dbProducts) {
      for (const img of p.product_images || []) {
        const url = img.image_url;
        if (!dbImageToProducts.has(url)) dbImageToProducts.set(url, []);
        dbImageToProducts.get(url)!.push(p);
      }
    }
    console.log("\n=== DB CROSS-PRODUCT CONFLICTS ===");
    for (const [url, prods] of dbImageToProducts.entries()) {
      const distinctNames = Array.from(new Set(prods.map((p: any) => extractBaseName(p.name))));
      if (distinctNames.length > 1) {
        console.log(`\n[DB Conflict] URL: ${url}`);
        console.log(`  Products:`, distinctNames);
      }
    }
  }
}

main().catch(console.error);
