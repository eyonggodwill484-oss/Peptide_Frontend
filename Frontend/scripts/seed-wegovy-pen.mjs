// scripts/seed-wegovy-pen.mjs
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xdannklctxudwrpwqlki.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const CATEGORY_ID = "65622465-616a-4f25-8141-ac9370a47f7c"; // Diabetes and Weight Loss

const WEGOVY_VARIANTS = [
  {
    id: "4c8e7011-0025-4a11-8f25-000000000025",
    name: "WEGOVY PEN - A pack with 4 pens of 0.25mg.",
    slug: "wegovy-pen-4-pens-0-25mg",
    sku: "WEG-PEN-025",
    price: 140,
    short_description: "WEGOVY (semaglutide) injection pen pack containing 4 pre-filled pens of 0.25mg for research and metabolic study.",
    rating: 5.0,
    best_seller: true,
  },
  {
    id: "4c8e7011-0050-4a11-8f50-000000000050",
    name: "WEGOVY PEN - A pack with 4 pens of 0.5mg.",
    slug: "wegovy-pen-4-pens-0-5mg",
    sku: "WEG-PEN-050",
    price: 180,
    short_description: "WEGOVY (semaglutide) injection pen pack containing 4 pre-filled pens of 0.5mg for research and metabolic study.",
    rating: 4.9,
    best_seller: false,
  },
  {
    id: "4c8e7011-0100-4a11-8f10-000000000100",
    name: "WEGOVY PEN - A pack with 4 pens of 1.0mg.",
    slug: "wegovy-pen-4-pens-1-0mg",
    sku: "WEG-PEN-100",
    price: 200,
    short_description: "WEGOVY (semaglutide) injection pen pack containing 4 pre-filled pens of 1.0mg for research and metabolic study.",
    rating: 4.9,
    best_seller: false,
  },
  {
    id: "4c8e7011-0170-4a11-8f17-000000000170",
    name: "WEGOVY PEN - A pack with 4 pens of 1.7mg.",
    slug: "wegovy-pen-4-pens-1-7mg",
    sku: "WEG-PEN-170",
    price: 240,
    short_description: "WEGOVY (semaglutide) injection pen pack containing 4 pre-filled pens of 1.7mg for research and metabolic study.",
    rating: 4.9,
    best_seller: false,
  },
  {
    id: "4c8e7011-0225-4a11-8f22-000000000225",
    name: "WEGOVY PEN - A pack with 4 pens of 2.25mg.",
    slug: "wegovy-pen-4-pens-2-25mg",
    sku: "WEG-PEN-225",
    price: 260,
    short_description: "WEGOVY (semaglutide) injection pen pack containing 4 pre-filled pens of 2.25mg for research and metabolic study.",
    rating: 4.8,
    best_seller: false,
  },
  {
    id: "4c8e7011-0240-4a11-8f24-000000000240",
    name: "WEGOVY PEN - A pack with 4 pens of 2.4mg.",
    slug: "wegovy-pen-4-pens-2-4mg",
    sku: "WEG-PEN-240",
    price: 280,
    short_description: "WEGOVY (semaglutide) injection pen pack containing 4 pre-filled pens of 2.4mg for research and metabolic study.",
    rating: 5.0,
    best_seller: true,
  },
];

const DESCRIPTION = `WEGOVY® (Semaglutide) is a glucagon-like peptide-1 (GLP-1) receptor agonist engineered for advanced metabolic and weight management research. Each pack contains 4 pre-filled multidose injection pens designed for precise administration and maximum stability.

### Key Characteristics & Mechanism
- **Active Ingredient**: Semaglutide (GLP-1 Receptor Agonist)
- **Format**: Pack of 4 pre-filled subcutaneous injection pens
- **Dosage Availability**: 0.25mg, 0.5mg, 1.0mg, 1.7mg, 2.25mg, and 2.4mg per pen
- **Purity**: >99% (HPLC Verified)
- **Storage**: Store refrigerated at 2°C – 8°C (36°F – 46°F). Protect from light. Do not freeze.

### Research & Clinical Context
Semaglutide selectively binds to and activates GLP-1 receptors, enhancing glucose-dependent insulin secretion, suppressing glucagon release, and regulating central appetite pathways in the hypothalamus. Clinical and research investigations demonstrate substantial efficacy in promoting sustained weight management and metabolic equilibrium.`;

const IMAGES = [
  "/images/products/wegovy-pen/wegovy-pen-1.webp",
  "/images/products/wegovy-pen/wegovy-pen-2.webp",
  "/images/products/wegovy-pen/wegovy-pen-3.webp",
];

async function seed() {
  console.log("Starting WEGOVY PEN variable products sync...");

  for (const variant of WEGOVY_VARIANTS) {
    const productPayload = {
      id: variant.id,
      name: variant.name,
      slug: variant.slug,
      short_description: variant.short_description,
      description: DESCRIPTION,
      price: variant.price,
      sku: variant.sku,
      brand: "WEGOVY PEN",
      stock: 100,
      featured: true,
      best_seller: variant.best_seller,
      status: "published",
      rating: variant.rating,
      category_id: CATEGORY_ID,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error: prodError } = await supabase.from("products").upsert(productPayload, { onConflict: "id" });
    if (prodError) {
      console.warn(`Could not direct upsert product ${variant.slug} (RLS may require service_role key):`, prodError.message);
    } else {
      console.log(`✓ Product upserted: ${variant.name} ($${variant.price})`);

      for (let i = 0; i < IMAGES.length; i++) {
        await supabase.from("product_images").insert({
          product_id: variant.id,
          image_url: IMAGES[i],
          public_id: `wegovy-pen-${i + 1}`,
          created_at: new Date(Date.now() + i * 1000).toISOString(),
        });
      }
    }
  }

  console.log("Seed script execution completed.");
}

seed().catch(console.error);
