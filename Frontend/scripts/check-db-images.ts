import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { supabase } from "../src/lib/supabase/client";

async function main() {
  const { data: dbProducts } = await supabase
    .from("products")
    .select("id, name, slug, category_id, category:categories(name, slug), product_images(image_url)")
    .eq("status", "published");

  if (!dbProducts) return;

  console.log("DB Products check for images:");
  for (const p of dbProducts) {
    const images = (p.product_images || []).map((i: any) => i.image_url);
    if (p.name.includes("Trenbolone") || p.name.includes("Survodutide") || p.name.includes("Testosterone") || p.name.includes("GLP-1")) {
      console.log(`- ${p.name} (${p.slug}): ${images.join(", ")}`);
    }
  }
}

main().catch(console.error);
