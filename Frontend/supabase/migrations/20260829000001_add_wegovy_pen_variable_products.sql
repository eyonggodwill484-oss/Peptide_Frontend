-- Migration: 20260829000001_add_wegovy_pen_variable_products.sql
-- Description: Add WEGOVY PEN variable product and all 6 dosage variations

DO $$
DECLARE
  v_category_id UUID := '65622465-616a-4f25-8141-ac9370a47f7c'; -- Diabetes and Weight Loss
  v_prod_025 UUID := '4c8e7011-0025-4a11-8f25-000000000025';
  v_prod_050 UUID := '4c8e7011-0050-4a11-8f50-000000000050';
  v_prod_100 UUID := '4c8e7011-0100-4a11-8f10-000000000100';
  v_prod_170 UUID := '4c8e7011-0170-4a11-8f17-000000000170';
  v_prod_225 UUID := '4c8e7011-0225-4a11-8f22-000000000225';
  v_prod_240 UUID := '4c8e7011-0240-4a11-8f24-000000000240';
  v_desc TEXT := 'WEGOVY® (Semaglutide) is a glucagon-like peptide-1 (GLP-1) receptor agonist engineered for advanced metabolic and weight management research. Each pack contains 4 pre-filled multidose injection pens designed for precise administration and maximum stability.

### Key Characteristics & Mechanism
- **Active Ingredient**: Semaglutide (GLP-1 Receptor Agonist)
- **Format**: Pack of 4 pre-filled subcutaneous injection pens
- **Dosage Availability**: 0.25mg, 0.5mg, 1.0mg, 1.7mg, 2.25mg, and 2.4mg per pen
- **Purity**: >99% (HPLC Verified)
- **Storage**: Store refrigerated at 2°C – 8°C (36°F – 46°F). Protect from light. Do not freeze.

### Research & Clinical Context
Semaglutide selectively binds to and activates GLP-1 receptors, enhancing glucose-dependent insulin secretion, suppressing glucagon release, and regulating central appetite pathways in the hypothalamus. Clinical and research investigations demonstrate substantial efficacy in promoting sustained weight management and metabolic equilibrium.';

BEGIN
  -- 1. Variant 0.25mg
  INSERT INTO products (
    id, name, slug, short_description, description, price, discount_price, sku, brand,
    stock, featured, best_seller, status, rating, category_id, created_at, updated_at
  ) VALUES (
    v_prod_025,
    'WEGOVY PEN - A pack with 4 pens of 0.25mg.',
    'wegovy-pen-4-pens-0-25mg',
    'WEGOVY (semaglutide) injection pen pack containing 4 pre-filled pens of 0.25mg for research and metabolic study.',
    v_desc,
    140,
    NULL,
    'WEG-PEN-025',
    'WEGOVY PEN',
    100,
    true,
    true,
    'published',
    5.0,
    v_category_id,
    NOW(),
    NOW()
  ) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    sku = EXCLUDED.sku,
    brand = EXCLUDED.brand,
    description = EXCLUDED.description,
    status = EXCLUDED.status;

  -- 2. Variant 0.5mg
  INSERT INTO products (
    id, name, slug, short_description, description, price, discount_price, sku, brand,
    stock, featured, best_seller, status, rating, category_id, created_at, updated_at
  ) VALUES (
    v_prod_050,
    'WEGOVY PEN - A pack with 4 pens of 0.5mg.',
    'wegovy-pen-4-pens-0-5mg',
    'WEGOVY (semaglutide) injection pen pack containing 4 pre-filled pens of 0.5mg for research and metabolic study.',
    v_desc,
    180,
    NULL,
    'WEG-PEN-050',
    'WEGOVY PEN',
    100,
    true,
    false,
    'published',
    4.9,
    v_category_id,
    NOW(),
    NOW()
  ) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    sku = EXCLUDED.sku,
    brand = EXCLUDED.brand,
    description = EXCLUDED.description,
    status = EXCLUDED.status;

  -- 3. Variant 1.0mg
  INSERT INTO products (
    id, name, slug, short_description, description, price, discount_price, sku, brand,
    stock, featured, best_seller, status, rating, category_id, created_at, updated_at
  ) VALUES (
    v_prod_100,
    'WEGOVY PEN - A pack with 4 pens of 1.0mg.',
    'wegovy-pen-4-pens-1-0mg',
    'WEGOVY (semaglutide) injection pen pack containing 4 pre-filled pens of 1.0mg for research and metabolic study.',
    v_desc,
    200,
    NULL,
    'WEG-PEN-100',
    'WEGOVY PEN',
    100,
    true,
    false,
    'published',
    4.9,
    v_category_id,
    NOW(),
    NOW()
  ) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    sku = EXCLUDED.sku,
    brand = EXCLUDED.brand,
    description = EXCLUDED.description,
    status = EXCLUDED.status;

  -- 4. Variant 1.7mg
  INSERT INTO products (
    id, name, slug, short_description, description, price, discount_price, sku, brand,
    stock, featured, best_seller, status, rating, category_id, created_at, updated_at
  ) VALUES (
    v_prod_170,
    'WEGOVY PEN - A pack with 4 pens of 1.7mg.',
    'wegovy-pen-4-pens-1-7mg',
    'WEGOVY (semaglutide) injection pen pack containing 4 pre-filled pens of 1.7mg for research and metabolic study.',
    v_desc,
    240,
    NULL,
    'WEG-PEN-170',
    'WEGOVY PEN',
    100,
    true,
    false,
    'published',
    4.9,
    v_category_id,
    NOW(),
    NOW()
  ) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    sku = EXCLUDED.sku,
    brand = EXCLUDED.brand,
    description = EXCLUDED.description,
    status = EXCLUDED.status;

  -- 5. Variant 2.25mg
  INSERT INTO products (
    id, name, slug, short_description, description, price, discount_price, sku, brand,
    stock, featured, best_seller, status, rating, category_id, created_at, updated_at
  ) VALUES (
    v_prod_225,
    'WEGOVY PEN - A pack with 4 pens of 2.25mg.',
    'wegovy-pen-4-pens-2-25mg',
    'WEGOVY (semaglutide) injection pen pack containing 4 pre-filled pens of 2.25mg for research and metabolic study.',
    v_desc,
    260,
    NULL,
    'WEG-PEN-225',
    'WEGOVY PEN',
    100,
    true,
    false,
    'published',
    4.8,
    v_category_id,
    NOW(),
    NOW()
  ) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    sku = EXCLUDED.sku,
    brand = EXCLUDED.brand,
    description = EXCLUDED.description,
    status = EXCLUDED.status;

  -- 6. Variant 2.4mg
  INSERT INTO products (
    id, name, slug, short_description, description, price, discount_price, sku, brand,
    stock, featured, best_seller, status, rating, category_id, created_at, updated_at
  ) VALUES (
    v_prod_240,
    'WEGOVY PEN - A pack with 4 pens of 2.4mg.',
    'wegovy-pen-4-pens-2-4mg',
    'WEGOVY (semaglutide) injection pen pack containing 4 pre-filled pens of 2.4mg for research and metabolic study.',
    v_desc,
    280,
    NULL,
    'WEG-PEN-240',
    'WEGOVY PEN',
    100,
    true,
    true,
    'published',
    5.0,
    v_category_id,
    NOW(),
    NOW()
  ) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    sku = EXCLUDED.sku,
    brand = EXCLUDED.brand,
    description = EXCLUDED.description,
    status = EXCLUDED.status;

  -- Delete existing images for these products before re-inserting
  DELETE FROM product_images WHERE product_id IN (
    v_prod_025, v_prod_050, v_prod_100, v_prod_170, v_prod_225, v_prod_240
  );

  -- Insert 3 Images for each variant
  FOR v_category_id IN (SELECT unnest(ARRAY[v_prod_025, v_prod_050, v_prod_100, v_prod_170, v_prod_225, v_prod_240])) LOOP
    INSERT INTO product_images (id, product_id, image_url, public_id, created_at)
    VALUES
      (gen_random_uuid(), v_category_id, '/images/products/wegovy-pen/wegovy-pen-1.webp', 'wegovy-pen-1', NOW() + INTERVAL '1 second'),
      (gen_random_uuid(), v_category_id, '/images/products/wegovy-pen/wegovy-pen-2.webp', 'wegovy-pen-2', NOW() + INTERVAL '2 second'),
      (gen_random_uuid(), v_category_id, '/images/products/wegovy-pen/wegovy-pen-3.webp', 'wegovy-pen-3', NOW() + INTERVAL '3 second');
  END LOOP;

END $$;
