import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

process.env.NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

import { ALL_VARIABLE_PRODUCTS } from "../src/lib/data/variable-products";
import { ALL_SARMS_PRODUCTS } from "../src/lib/data/sarms-products";
import { ALL_WEIGHT_LOSS_PRODUCTS } from "../src/lib/data/weight-loss-products";
import { ALL_TABLET_PRODUCTS } from "../src/lib/data/tablet-products";
import { ALL_STEROID_OILS_PRODUCTS } from "../src/lib/data/steroid-oils-products";
import { groupProductsByLine } from "../src/lib/product-grouping";

async function main() {
  const products = [
    ...ALL_VARIABLE_PRODUCTS,
    ...ALL_SARMS_PRODUCTS,
    ...ALL_WEIGHT_LOSS_PRODUCTS,
    ...ALL_TABLET_PRODUCTS,
    ...ALL_STEROID_OILS_PRODUCTS,
  ];
  console.log(`Loaded ${products.length} local catalog products.`);

  const groups = groupProductsByLine(products);
  console.log(`Created ${groups.length} total product groups (store cards).`);

  // Check repeating images among groups
  const imageToGroups = new Map<string, typeof groups>();
  for (const g of groups) {
    const src = g.image?.src || "NO_IMAGE";
    if (!imageToGroups.has(src)) imageToGroups.set(src, []);
    imageToGroups.get(src)!.push(g);
  }

  console.log("\n=== PRODUCT GROUPS (STORE CARDS) SHARING THE SAME IMAGE ===");
  let conflictCount = 0;
  for (const [src, grps] of imageToGroups.entries()) {
    if (grps.length > 1) {
      conflictCount++;
      console.log(`\n[Group Conflict #${conflictCount}] Image: ${src}`);
      console.log(`  Used by ${grps.length} distinct groups:`);
      for (const g of grps) {
        console.log(`   - "${g.name}" (category: ${g.categorySlug}, slug: ${g.slug}, priceFrom: €${g.priceFrom})`);
      }
    }
  }

  console.log(`\n------------------------------------------------`);
  console.log(`Total group card image conflicts: ${conflictCount}`);
}

main().catch(console.error);
