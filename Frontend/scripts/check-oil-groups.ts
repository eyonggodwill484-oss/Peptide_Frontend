import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { getProducts } from "../src/lib/data/products";
import { groupProductsByLine } from "../src/lib/product-grouping";

async function main() {
  const products = await getProducts();
  const oils = products.filter(p => p.categorySlug === "steroid-oils");
  const oilGroups = groupProductsByLine(oils);

  console.log(`Steroid Oil Groups (${oilGroups.length}):`);
  for (const g of oilGroups) {
    console.log(`- "${g.name}" | slug: ${g.slug} | image: ${g.image?.src}`);
  }
}

main().catch(console.error);
