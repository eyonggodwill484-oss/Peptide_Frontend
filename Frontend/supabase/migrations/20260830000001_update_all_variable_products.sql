-- Migration: 20260830000001_update_all_variable_products.sql
-- Description: Standardize all 55+ peptide products into multi-attribute variable products with exact prices, SKUs, and categories.

DO $$
DECLARE
  v_cat_peptides UUID := 'b767c969-e9e0-494e-93e1-1b594efde3b2';
  v_cat_weight UUID := '65622465-616a-4f25-8141-ac9370a47f7c';
  v_now TIMESTAMPTZ := NOW();

  -- Helper function inside block to upsert
  -- We use standard INSERT ... ON CONFLICT (slug) DO UPDATE
BEGIN

  -- 1. 5-amino 1mq
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('5-amino 1mq - 5mg * 10 vials', '5-amino-1mq-5mg-10-vials', 'Research peptide 5-amino 1MQ in 5mg x 10 vials format.', '5-amino-1MQ is a small molecule NNMT inhibitor synthesized for cellular energy and metabolic research protocols.', 35, '5AM-5MG-10V', '5-amino 1mq', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('5-amino 1mq - 10mg * 10 vials', '5-amino-1mq-10mg-10-vials', 'Research peptide 5-amino 1MQ in 10mg x 10 vials format.', '5-amino-1MQ is a small molecule NNMT inhibitor synthesized for cellular energy and metabolic research protocols.', 45, '5AM-10MG-10V', '5-amino 1mq', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('5-amino 1mq - 50mg * 10 vials', '5-amino-1mq-50mg-10-vials', 'Research peptide 5-amino 1MQ in 50mg x 10 vials format.', '5-amino-1MQ is a small molecule NNMT inhibitor synthesized for cellular energy and metabolic research protocols.', 60, '5AM-50MG-10V', '5-amino 1mq', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 2. ACE-031
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('ACE-031 - 1mg vial', 'ace-031-1mg-vial', 'ACE-031 research peptide 1mg single vial.', 'ACE-031 is an investigational decoy receptor for ActRIIB binding pathway studies in muscle biology research.', 35, 'ACE-1MG-V', 'ACE-031', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('ACE-031 - 5mg vial', 'ace-031-5mg-vial', 'ACE-031 research peptide 5mg single vial.', 'ACE-031 is an investigational decoy receptor for ActRIIB binding pathway studies in muscle biology research.', 45, 'ACE-5MG-V', 'ACE-031', 100, true, true, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('ACE-031 - 10mg vial', 'ace-031-10mg-vial', 'ACE-031 research peptide 10mg single vial.', 'ACE-031 is an investigational decoy receptor for ActRIIB binding pathway studies in muscle biology research.', 55, 'ACE-10MG-V', 'ACE-031', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 3. Acetic acid solution
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Acetic acid solution - 3ml vials', 'acetic-acid-solution-3ml-vials', 'Laboratory grade sterile acetic acid reconstitution solution 3ml.', 'Sterile acetic acid solution for reconstitution and peptide solubility stabilization protocols.', 35, 'ACE-SOL-3ML', 'Acetic acid solution', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Acetic acid solution - 10ml vials', 'acetic-acid-solution-10ml-vials', 'Laboratory grade sterile acetic acid reconstitution solution 10ml.', 'Sterile acetic acid solution for reconstitution and peptide solubility stabilization protocols.', 40, 'ACE-SOL-10ML', 'Acetic acid solution', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 4. Adamax
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Adamax - 5mg vials', 'adamax-5mg-vials', 'Adamax (Semax analog) 5mg research vial.', 'Adamax is an enhanced N-terminal and C-terminal modified Semax analog designed for neuro-cognitive research models.', 25, 'ADM-5MG-V', 'Adamax', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Adamax - 10mg vials', 'adamax-10mg-vials', 'Adamax (Semax analog) 10mg research vial.', 'Adamax is an enhanced N-terminal and C-terminal modified Semax analog designed for neuro-cognitive research models.', 35, 'ADM-10MG-V', 'Adamax', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 5. Adipotide
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Adipotide - 2mg vials', 'adipotide-2mg-vials', 'Adipotide peptidomimetic 2mg research vial.', 'Adipotide (Prohibitin-targeting peptide) engineered for adipose tissue vascular targeting and apoptotic pathway research.', 30, 'ADP-2MG-V', 'Adipotide', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Adipotide - 5mg vials', 'adipotide-5mg-vials', 'Adipotide peptidomimetic 5mg research vial.', 'Adipotide (Prohibitin-targeting peptide) engineered for adipose tissue vascular targeting and apoptotic pathway research.', 40, 'ADP-5MG-V', 'Adipotide', 100, true, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Adipotide - 10mg vials', 'adipotide-10mg-vials', 'Adipotide peptidomimetic 10mg research vial.', 'Adipotide (Prohibitin-targeting peptide) engineered for adipose tissue vascular targeting and apoptotic pathway research.', 50, 'ADP-10MG-V', 'Adipotide', 100, false, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 6. AHK-CU
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('AHK-CU - 50mg vials', 'ahk-cu-50mg-vials', 'AHK-Cu copper tripeptide complex 50mg research vial.', 'AHK-Cu is a specialized copper peptide complex studied in cellular regeneration and follicular remodeling protocols.', 45, 'AHK-50MG-V', 'AHK-CU', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('AHK-CU - 100mg vials', 'ahk-cu-100mg-vials', 'AHK-Cu copper tripeptide complex 100mg research vial.', 'AHK-Cu is a specialized copper peptide complex studied in cellular regeneration and follicular remodeling protocols.', 65, 'AHK-100MG-V', 'AHK-CU', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 7. Alprostadil
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Alprostadil - 5mcg', 'alprostadil-5mcg', 'Alprostadil (PGE1) 5mcg research preparation.', 'Prostaglandin E1 analogue synthesized for vascular tone, vasodilation, and microcirculation investigations.', 30, 'ALP-5MCG', 'Alprostadil', 100, false, false, 'published', 4.7, v_cat_peptides, v_now, v_now),
    ('Alprostadil - 10mcg', 'alprostadil-10mcg', 'Alprostadil (PGE1) 10mcg research preparation.', 'Prostaglandin E1 analogue synthesized for vascular tone, vasodilation, and microcirculation investigations.', 40, 'ALP-10MCG', 'Alprostadil', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Alprostadil - 20mcg', 'alprostadil-20mcg', 'Alprostadil (PGE1) 20mcg research preparation.', 'Prostaglandin E1 analogue synthesized for vascular tone, vasodilation, and microcirculation investigations.', 55, 'ALP-20MCG', 'Alprostadil', 100, true, true, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Alprostadil - 40mcg', 'alprostadil-40mcg', 'Alprostadil (PGE1) 40mcg research preparation.', 'Prostaglandin E1 analogue synthesized for vascular tone, vasodilation, and microcirculation investigations.', 70, 'ALP-40MCG', 'Alprostadil', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 8. AOD-9604
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('AOD-9604 - 2mg * 10 vials', 'aod-9604-2mg-10-vials', 'AOD-9604 lipolytic peptide 2mg * 10 vials.', 'AOD-9604 is a modified C-terminal fragment of human growth hormone (HGH 177-191) investigated for lipid metabolism without glycemic interference.', 30, 'AOD-2MG-10V', 'AOD-9604', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('AOD-9604 - 5mg * 10 vials', 'aod-9604-5mg-10-vials', 'AOD-9604 lipolytic peptide 5mg * 10 vials.', 'AOD-9604 is a modified C-terminal fragment of human growth hormone (HGH 177-191) investigated for lipid metabolism without glycemic interference.', 40, 'AOD-5MG-10V', 'AOD-9604', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('AOD-9604 - 10mg * 10 vials', 'aod-9604-10mg-10-vials', 'AOD-9604 lipolytic peptide 10mg * 10 vials.', 'AOD-9604 is a modified C-terminal fragment of human growth hormone (HGH 177-191) investigated for lipid metabolism without glycemic interference.', 55, 'AOD-10MG-10V', 'AOD-9604', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 9. ARA-290
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('ARA-290 - 4mg vials', 'ara-290-4mg-vials', 'ARA-290 non-erythropoietic peptide 4mg vial.', 'ARA-290 (Cibinetide) is an innate repair receptor (IRR) ligand synthesized for tissue protection and neuropathic repair research.', 35, 'ARA-4MG-V', 'ARA-290', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('ARA-290 - 10mg vials', 'ara-290-10mg-vials', 'ARA-290 non-erythropoietic peptide 10mg vial.', 'ARA-290 (Cibinetide) is an innate repair receptor (IRR) ligand synthesized for tissue protection and neuropathic repair research.', 45, 'ARA-10MG-V', 'ARA-290', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('ARA-290 - 12mg vials', 'ara-290-12mg-vials', 'ARA-290 non-erythropoietic peptide 12mg vial.', 'ARA-290 (Cibinetide) is an innate repair receptor (IRR) ligand synthesized for tissue protection and neuropathic repair research.', 55, 'ARA-12MG-V', 'ARA-290', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('ARA-290 - 15mg vials', 'ara-290-15mg-vials', 'ARA-290 non-erythropoietic peptide 15mg vial.', 'ARA-290 (Cibinetide) is an innate repair receptor (IRR) ligand synthesized for tissue protection and neuropathic repair research.', 60, 'ARA-15MG-V', 'ARA-290', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('ARA-290 - 16mg vials', 'ara-290-16mg-vials', 'ARA-290 non-erythropoietic peptide 16mg vial.', 'ARA-290 (Cibinetide) is an innate repair receptor (IRR) ligand synthesized for tissue protection and neuropathic repair research.', 75, 'ARA-16MG-V', 'ARA-290', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 10. Bacteriostatic water
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Bacteriostatic water - 10ml vials', 'bacteriostatic-water-10ml-vials', 'Sterile Bacteriostatic Water containing 0.9% Benzyl Alcohol 10ml.', 'Multi-dose sterile reconstitution water preserving peptide integrity and preventing bacterial proliferation.', 20, 'BAC-10ML-V', 'Bacteriostatic water', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Bacteriostatic water - 30ml vials', 'bacteriostatic-water-30ml-vials', 'Sterile Bacteriostatic Water containing 0.9% Benzyl Alcohol 30ml.', 'Multi-dose sterile reconstitution water preserving peptide integrity and preventing bacterial proliferation.', 30, 'BAC-30ML-V', 'Bacteriostatic water', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 11. BPC-157
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('BPC-157 - 5mg vials', 'bpc-157-5mg-vials', 'Body Protection Compound-157 5mg research vial.', 'BPC-157 is a 15-amino acid pentadecapeptide derived from human gastric juice, widely studied for tendon, ligament, and gut mucosal healing.', 25, 'BPC-5MG-V', 'BPC-157', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('BPC-157 - 10mg vials', 'bpc-157-10mg-vials', 'Body Protection Compound-157 10mg research vial.', 'BPC-157 is a 15-amino acid pentadecapeptide derived from human gastric juice, widely studied for tendon, ligament, and gut mucosal healing.', 35, 'BPC-10MG-V', 'BPC-157', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('BPC-157 - 15mg vials', 'bpc-157-15mg-vials', 'Body Protection Compound-157 15mg research vial.', 'BPC-157 is a 15-amino acid pentadecapeptide derived from human gastric juice, widely studied for tendon, ligament, and gut mucosal healing.', 40, 'BPC-15MG-V', 'BPC-157', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('BPC-157 - 20mg vials', 'bpc-157-20mg-vials', 'Body Protection Compound-157 20mg research vial.', 'BPC-157 is a 15-amino acid pentadecapeptide derived from human gastric juice, widely studied for tendon, ligament, and gut mucosal healing.', 60, 'BPC-20MG-V', 'BPC-157', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 12. BPC-157 5mg + TB-500 5mg
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('BPC-157 5mg + TB-500 5mg - 10mg * 10vials', 'bpc-157-tb-500-blend-10mg-10vials', 'Synergistic Wolverine Blend: BPC-157 (5mg) + TB-500 (5mg) per vial * 10 vials.', 'Combined formulation of Body Protection Compound and Thymosin Beta-4 engineered for accelerated systemic and localized tissue repair investigation.', 45, 'WLV-10MG-10V', 'BPC-157 5mg + TB-500 5mg', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('BPC-157 5mg + TB-500 5mg - 20mg * 10vials', 'bpc-157-tb-500-blend-20mg-10vials', 'High-concentration Wolverine Blend: BPC-157 (10mg) + TB-500 (10mg) per vial * 10 vials.', 'Combined formulation of Body Protection Compound and Thymosin Beta-4 engineered for accelerated systemic and localized tissue repair investigation.', 70, 'WLV-20MG-10V', 'BPC-157 5mg + TB-500 5mg', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 13. BPC157 10mg+GHK-CU 50mg
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('BPC157 10mg+GHK-CU 50mg - 80mg * 10 vials', 'bpc157-ghk-cu-blend-80mg-10-vials', 'Regenerative Dual-Action Blend: BPC-157 with GHK-Cu 80mg total * 10 vials.', 'Dual peptide matrix combining angiogenic BPC-157 with matrix-remodeling copper tripeptide GHK-Cu.', 50, 'BGK-80MG-10V', 'BPC157 10mg+GHK-CU 50mg', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('BPC157 10mg+GHK-CU 50mg - 100mg * 10vials', 'bpc157-ghk-cu-blend-100mg-10vials', 'Regenerative Dual-Action Blend: BPC-157 with GHK-Cu 100mg total * 10 vials.', 'Dual peptide matrix combining angiogenic BPC-157 with matrix-remodeling copper tripeptide GHK-Cu.', 75, 'BGK-100MG-10V', 'BPC157 10mg+GHK-CU 50mg', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 14. Cagrilintide
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Cagrilintide - 5mg vials', 'cagrilintide-5mg-vials', 'Cagrilintide long-acting amylin analogue 5mg research vial.', 'Cagrilintide is an investigational dual amylin and calcitonin receptor agonist studied for satiety and metabolic regulation.', 35, 'CAG-5MG-V', 'Cagrilintide', 100, true, false, 'published', 4.9, v_cat_weight, v_now, v_now),
    ('Cagrilintide - 10mg vials', 'cagrilintide-10mg-vials', 'Cagrilintide long-acting amylin analogue 10mg research vial.', 'Cagrilintide is an investigational dual amylin and calcitonin receptor agonist studied for satiety and metabolic regulation.', 55, 'CAG-10MG-V', 'Cagrilintide', 100, true, true, 'published', 5.0, v_cat_weight, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 15. Cerebrolysin
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Cerebrolysin - 1mg vial', 'cerebrolysin-1mg-vial', 'Cerebrolysin neurotrophic neuropeptide 1mg vial.', 'Porcine brain-derived neurotrophic peptide preparation containing BDNF, GDNF, and NGF mimetic factors.', 25, 'CBL-1MG-V', 'Cerebrolysin', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Cerebrolysin - 2.2mg vials', 'cerebrolysin-2-2mg-vials', 'Cerebrolysin neurotrophic neuropeptide 2.2mg vial.', 'Porcine brain-derived neurotrophic peptide preparation containing BDNF, GDNF, and NGF mimetic factors.', 35, 'CBL-2-2MG-V', 'Cerebrolysin', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Cerebrolysin - 5mg vials', 'cerebrolysin-5mg-vials', 'Cerebrolysin neurotrophic neuropeptide 5mg vial.', 'Porcine brain-derived neurotrophic peptide preparation containing BDNF, GDNF, and NGF mimetic factors.', 45, 'CBL-5MG-V', 'Cerebrolysin', 100, true, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Cerebrolysin - 10mg vials', 'cerebrolysin-10mg-vials', 'Cerebrolysin neurotrophic neuropeptide 10mg vial.', 'Porcine brain-derived neurotrophic peptide preparation containing BDNF, GDNF, and NGF mimetic factors.', 50, 'CBL-10MG-V', 'Cerebrolysin', 100, false, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Cerebrolysin - 30mg vials', 'cerebrolysin-30mg-vials', 'Cerebrolysin neurotrophic neuropeptide 30mg vial.', 'Porcine brain-derived neurotrophic peptide preparation containing BDNF, GDNF, and NGF mimetic factors.', 60, 'CBL-30MG-V', 'Cerebrolysin', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Cerebrolysin - 60mg vials', 'cerebrolysin-60mg-vials', 'Cerebrolysin neurotrophic neuropeptide 60mg vial.', 'Porcine brain-derived neurotrophic peptide preparation containing BDNF, GDNF, and NGF mimetic factors.', 70, 'CBL-60MG-V', 'Cerebrolysin', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Cerebrolysin - 1200mg vials', 'cerebrolysin-1200mg-vials', 'Cerebrolysin high-concentration 1200mg preparation.', 'Porcine brain-derived neurotrophic peptide preparation containing BDNF, GDNF, and NGF mimetic factors.', 80, 'CBL-1200MG-V', 'Cerebrolysin', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Cerebrolysin - 2000mg vials', 'cerebrolysin-2000mg-vials', 'Cerebrolysin high-concentration 2000mg preparation.', 'Porcine brain-derived neurotrophic peptide preparation containing BDNF, GDNF, and NGF mimetic factors.', 100, 'CBL-2000MG-V', 'Cerebrolysin', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 16. CJC-1295 Whitout DAC
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('CJC-1295 Whitout DAC - 2mg vials', 'cjc-1295-whitout-dac-2mg-vials', 'CJC-1295 No DAC (Modified GRF 1-29) 2mg vial.', 'Tetrasubstituted 29-amino acid GHRH analog without Drug Affinity Complex for pulsatile GH stimulation studies.', 30, 'CJC-ND-2MG-V', 'CJC-1295 Whitout DAC', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('CJC-1295 Whitout DAC - 5mg vials', 'cjc-1295-whitout-dac-5mg-vials', 'CJC-1295 No DAC (Modified GRF 1-29) 5mg vial.', 'Tetrasubstituted 29-amino acid GHRH analog without Drug Affinity Complex for pulsatile GH stimulation studies.', 40, 'CJC-ND-5MG-V', 'CJC-1295 Whitout DAC', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('CJC-1295 Whitout DAC - 10mg vials', 'cjc-1295-whitout-dac-10mg-vials', 'CJC-1295 No DAC (Modified GRF 1-29) 10mg vial.', 'Tetrasubstituted 29-amino acid GHRH analog without Drug Affinity Complex for pulsatile GH stimulation studies.', 55, 'CJC-ND-10MG-V', 'CJC-1295 Whitout DAC', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 17. CJC-1295 With DAC/Ipamorelin
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('CJC-1295 With DAC/Ipamorelin - 2mg * 10vials', 'cjc-1295-dac-ipamorelin-2mg-10vials', 'CJC-1295 DAC + Ipamorelin combination 2mg * 10 vials.', 'Dual GH secretagogue protocol combining sustained GHRH agonism with selective ghrelin receptor stimulation.', 40, 'CJC-IP-2MG-10V', 'CJC-1295 With DAC/Ipamorelin', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('CJC-1295 With DAC/Ipamorelin - 5mg * 10vials', 'cjc-1295-dac-ipamorelin-5mg-10vials', 'CJC-1295 DAC + Ipamorelin combination 5mg * 10 vials.', 'Dual GH secretagogue protocol combining sustained GHRH agonism with selective ghrelin receptor stimulation.', 55, 'CJC-IP-5MG-10V', 'CJC-1295 With DAC/Ipamorelin', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 18. Dermorphin
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Dermorphin - 1mg vials', 'dermorphin-1mg-vials', 'Dermorphin natural heptapeptide 1mg research vial.', 'D-amino acid-containing opioid receptor selective peptide investigated in mu-opioid neuropharmacology.', 25, 'DER-1MG-V', 'Dermorphin', 100, false, false, 'published', 4.7, v_cat_peptides, v_now, v_now),
    ('Dermorphin - 5mg vials', 'dermorphin-5mg-vials', 'Dermorphin natural heptapeptide 5mg research vial.', 'D-amino acid-containing opioid receptor selective peptide investigated in mu-opioid neuropharmacology.', 35, 'DER-5MG-V', 'Dermorphin', 100, true, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Dermorphin - 10mg vials', 'dermorphin-10mg-vials', 'Dermorphin natural heptapeptide 10mg research vial.', 'D-amino acid-containing opioid receptor selective peptide investigated in mu-opioid neuropharmacology.', 45, 'DER-10MG-V', 'Dermorphin', 100, false, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 19. DSIP (Delta Sleep-Inducing Peptide)
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('DSIP (Delta Sleep-Inducing Peptide) - 2mg * 10vials', 'dsip-2mg-10vials', 'DSIP nonapeptide 2mg * 10 vials.', 'Delta Sleep-Inducing Peptide is an endogenous neuromodulatory peptide studied in circadian rhythm and endocrine regulation.', 30, 'DSP-2MG-10V', 'DSIP (Delta Sleep-Inducing Peptide)', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('DSIP (Delta Sleep-Inducing Peptide) - 5mg * 10vials', 'dsip-5mg-10vials', 'DSIP nonapeptide 5mg * 10 vials.', 'Delta Sleep-Inducing Peptide is an endogenous neuromodulatory peptide studied in circadian rhythm and endocrine regulation.', 45, 'DSP-5MG-10V', 'DSIP (Delta Sleep-Inducing Peptide)', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('DSIP (Delta Sleep-Inducing Peptide) - 10mg * 10vials', 'dsip-10mg-10vials', 'DSIP nonapeptide 10mg * 10 vials.', 'Delta Sleep-Inducing Peptide is an endogenous neuromodulatory peptide studied in circadian rhythm and endocrine regulation.', 55, 'DSP-10MG-10V', 'DSIP (Delta Sleep-Inducing Peptide)', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('DSIP (Delta Sleep-Inducing Peptide) - 15mg * 10vials', 'dsip-15mg-10vials', 'DSIP nonapeptide 15mg * 10 vials.', 'Delta Sleep-Inducing Peptide is an endogenous neuromodulatory peptide studied in circadian rhythm and endocrine regulation.', 70, 'DSP-15MG-10V', 'DSIP (Delta Sleep-Inducing Peptide)', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 20. Epithalon( Epitalon)
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Epithalon( Epitalon) - 10mg vials', 'epithalon-10mg-vials', 'Epitalon synthetic pineal tetrapeptide 10mg vial.', 'Epitalon (Ala-Glu-Asp-Gly) is a synthetic pineal gland peptide investigated in telomerase induction and longevity pathways.', 35, 'EPI-10MG-V', 'Epithalon( Epitalon)', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Epithalon( Epitalon) - 20mg vials', 'epithalon-20mg-vials', 'Epitalon synthetic pineal tetrapeptide 20mg vial.', 'Epitalon (Ala-Glu-Asp-Gly) is a synthetic pineal gland peptide investigated in telomerase induction and longevity pathways.', 45, 'EPI-20MG-V', 'Epithalon( Epitalon)', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Epithalon( Epitalon) - 25mg vials', 'epithalon-25mg-vials', 'Epitalon synthetic pineal tetrapeptide 25mg vial.', 'Epitalon (Ala-Glu-Asp-Gly) is a synthetic pineal gland peptide investigated in telomerase induction and longevity pathways.', 55, 'EPI-25MG-V', 'Epithalon( Epitalon)', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Epithalon( Epitalon) - 40mg vials', 'epithalon-40mg-vials', 'Epitalon synthetic pineal tetrapeptide 40mg vial.', 'Epitalon (Ala-Glu-Asp-Gly) is a synthetic pineal gland peptide investigated in telomerase induction and longevity pathways.', 65, 'EPI-40MG-V', 'Epithalon( Epitalon)', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Epithalon( Epitalon) - 50mg vials', 'epithalon-50mg-vials', 'Epitalon synthetic pineal tetrapeptide 50mg vial.', 'Epitalon (Ala-Glu-Asp-Gly) is a synthetic pineal gland peptide investigated in telomerase induction and longevity pathways.', 75, 'EPI-50MG-V', 'Epithalon( Epitalon)', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 21. Erythropoietin (Epo)
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Erythropoietin (Epo) - 2000units/ml vials', 'erythropoietin-2000units-ml-vials', 'Recombinant Erythropoietin (EPO) 2,000 IU/ml vial.', 'Glycoprotein cytokine hormone synthesized for erythropoiesis, oxygen transport, and tissue neuroprotection studies.', 75, 'EPO-2KU-V', 'Erythropoietin (Epo)', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Erythropoietin (Epo) - 3000units/ml', 'erythropoietin-3000units-ml', 'Recombinant Erythropoietin (EPO) 3,000 IU/ml preparation.', 'Glycoprotein cytokine hormone synthesized for erythropoiesis, oxygen transport, and tissue neuroprotection studies.', 110, 'EPO-3KU-V', 'Erythropoietin (Epo)', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Erythropoietin (Epo) - 4000units/ml', 'erythropoietin-4000units-ml', 'Recombinant Erythropoietin (EPO) 4,000 IU/ml preparation.', 'Glycoprotein cytokine hormone synthesized for erythropoiesis, oxygen transport, and tissue neuroprotection studies.', 170, 'EPO-4KU-V', 'Erythropoietin (Epo)', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Erythropoietin (Epo) - 10,000units/ml', 'erythropoietin-10000units-ml', 'Recombinant Erythropoietin (EPO) 10,000 IU/ml preparation.', 'Glycoprotein cytokine hormone synthesized for erythropoiesis, oxygen transport, and tissue neuroprotection studies.', 220, 'EPO-10KU-V', 'Erythropoietin (Epo)', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 22. Follistatin 344
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Follistatin 344 - 1mg * 10vials', 'follistatin-344-1mg-10vials', 'Follistatin-344 recombinant protein 1mg * 10 vials.', 'Potent autocrine glycoprotein investigated for myostatin inhibition and muscle hypertrophy signaling pathways.', 80, 'FOL-1MG-10V', 'Follistatin 344', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Follistatin 344 - 5mg * 10vials', 'follistatin-344-5mg-10vials', 'Follistatin-344 recombinant protein 5mg * 10 vials.', 'Potent autocrine glycoprotein investigated for myostatin inhibition and muscle hypertrophy signaling pathways.', 160, 'FOL-5MG-10V', 'Follistatin 344', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 23. FOXO4-DRI
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('FOXO4-DRI - 1mg', 'foxo4-dri-1mg', 'FOXO4-DRI senolytic D-retro-inverso peptide 1mg.', 'Engineered peptide targeting p53-FOXO4 interaction to trigger selective apoptosis in senescent cells.', 80, 'FOX-1MG', 'FOXO4-DRI', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('FOXO4-DRI - 5mg', 'foxo4-dri-5mg', 'FOXO4-DRI senolytic D-retro-inverso peptide 5mg.', 'Engineered peptide targeting p53-FOXO4 interaction to trigger selective apoptosis in senescent cells.', 95, 'FOX-5MG', 'FOXO4-DRI', 100, true, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('FOXO4-DRI - 10mg', 'foxo4-dri-10mg', 'FOXO4-DRI senolytic D-retro-inverso peptide 10mg.', 'Engineered peptide targeting p53-FOXO4 interaction to trigger selective apoptosis in senescent cells.', 120, 'FOX-10MG', 'FOXO4-DRI', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('FOXO4-DRI - 15mg', 'foxo4-dri-15mg', 'FOXO4-DRI senolytic D-retro-inverso peptide 15mg.', 'Engineered peptide targeting p53-FOXO4 interaction to trigger selective apoptosis in senescent cells.', 180, 'FOX-15MG', 'FOXO4-DRI', 100, false, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 24. GDF-8
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('GDF-8 - 1mg * 10vials', 'gdf-8-1mg-10vials', 'GDF-8 (Myostatin propeptide) 1mg * 10 vials.', 'Growth differentiation factor 8 investigated for skeletal muscle mass regulation and TGF-beta superfamily signaling.', 45, 'GDF-1MG-10V', 'GDF-8', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('GDF-8 - 5mg * 10vials', 'gdf-8-5mg-10vials', 'GDF-8 (Myostatin propeptide) 5mg * 10 vials.', 'Growth differentiation factor 8 investigated for skeletal muscle mass regulation and TGF-beta superfamily signaling.', 60, 'GDF-5MG-10V', 'GDF-8', 100, true, true, 'published', 4.9, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 25. GHK-CU/Copper
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('GHK-CU/Copper - 50mg * 10vials', 'ghk-cu-copper-50mg-10vials', 'GHK-Cu Copper Tripeptide-1 complex 50mg * 10 vials.', 'Naturally occurring tripeptide-copper complex extensively researched for extracellular matrix remodeling, collagen synthesis, and anti-inflammatory properties.', 45, 'GHK-50MG-10V', 'GHK-CU/Copper', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('GHK-CU/Copper - 100mg * 10vials', 'ghk-cu-copper-100mg-10vials', 'GHK-Cu Copper Tripeptide-1 complex 100mg * 10 vials.', 'Naturally occurring tripeptide-copper complex extensively researched for extracellular matrix remodeling, collagen synthesis, and anti-inflammatory properties.', 80, 'GHK-100MG-10V', 'GHK-CU/Copper', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 26. GHRP-2 (Growth Hormone-Releasing Peptide-2) Pralmorelin
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('GHRP-2 (Growth Hormone-Releasing Peptide-2) Pralmorelin - 2mg vials', 'ghrp-2-pralmorelin-2mg-vials', 'GHRP-2 (Pralmorelin) hexapeptide 2mg vial.', 'Potent synthetic growth hormone secretagogue acting on ghrelin receptor to stimulate pituitary somatotrophs.', 35, 'GH2-PR-2MG-V', 'GHRP-2 (Growth Hormone-Releasing Peptide-2) Pralmorelin', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('GHRP-2 (Growth Hormone-Releasing Peptide-2) Pralmorelin - 5mg vials', 'ghrp-2-pralmorelin-5mg-vials', 'GHRP-2 (Pralmorelin) hexapeptide 5mg vial.', 'Potent synthetic growth hormone secretagogue acting on ghrelin receptor to stimulate pituitary somatotrophs.', 45, 'GH2-PR-5MG-V', 'GHRP-2 (Growth Hormone-Releasing Peptide-2) Pralmorelin', 100, true, true, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('GHRP-2 (Growth Hormone-Releasing Peptide-2) Pralmorelin - 10mg vials', 'ghrp-2-pralmorelin-10mg-vials', 'GHRP-2 (Pralmorelin) hexapeptide 10mg vial.', 'Potent synthetic growth hormone secretagogue acting on ghrelin receptor to stimulate pituitary somatotrophs.', 65, 'GH2-PR-10MG-V', 'GHRP-2 (Growth Hormone-Releasing Peptide-2) Pralmorelin', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 27. GHRP-2 Acetate (Growth Hormone Releasing Peptide-2)
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('GHRP-2 Acetate (Growth Hormone Releasing Peptide-2) - 5mg * 10vials', 'ghrp-2-acetate-5mg-10vials', 'GHRP-2 Acetate 5mg * 10 vials package.', 'High-purity lyophilized GHRP-2 acetate formulated for high-repetition pituitary activation assay series.', 30, 'GH2-AC-5MG-10V', 'GHRP-2 Acetate (Growth Hormone Releasing Peptide-2)', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('GHRP-2 Acetate (Growth Hormone Releasing Peptide-2) - 10mg * 10vials', 'ghrp-2-acetate-10mg-10vials', 'GHRP-2 Acetate 10mg * 10 vials package.', 'High-purity lyophilized GHRP-2 acetate formulated for high-repetition pituitary activation assay series.', 45, 'GH2-AC-10MG-10V', 'GHRP-2 Acetate (Growth Hormone Releasing Peptide-2)', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('GHRP-2 Acetate (Growth Hormone Releasing Peptide-2) - 15mg * 10vials', 'ghrp-2-acetate-15mg-10vials', 'GHRP-2 Acetate 15mg * 10 vials package.', 'High-purity lyophilized GHRP-2 acetate formulated for high-repetition pituitary activation assay series.', 60, 'GH2-AC-15MG-10V', 'GHRP-2 Acetate (Growth Hormone Releasing Peptide-2)', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 28. GHRP-6 Acetate (Growth Hormone Releasing Peptide-6)
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('GHRP-6 Acetate (Growth Hormone Releasing Peptide-6) - 5mg * 10vials', 'ghrp-6-acetate-5mg-10vials', 'GHRP-6 Acetate hexapeptide 5mg * 10 vials.', 'First-generation synthetic hexapeptide secretagogue studied for growth hormone release and appetite stimulation pathways.', 30, 'GH6-AC-5MG-10V', 'GHRP-6 Acetate (Growth Hormone Releasing Peptide-6)', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('GHRP-6 Acetate (Growth Hormone Releasing Peptide-6) - 10mg * 10vials', 'ghrp-6-acetate-10mg-10vials', 'GHRP-6 Acetate hexapeptide 10mg * 10 vials.', 'First-generation synthetic hexapeptide secretagogue studied for growth hormone release and appetite stimulation pathways.', 40, 'GH6-AC-10MG-10V', 'GHRP-6 Acetate (Growth Hormone Releasing Peptide-6)', 100, true, true, 'published', 4.9, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 29. GLP-1 (Glucagon-Like Peptide-1)
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('GLP-1 (Glucagon-Like Peptide-1) - 5mg * 10vials', 'glp-1-5mg-10vials', 'Endogenous GLP-1 (7-36) amide 5mg * 10 vials.', 'Native incretin hormone peptide investigated in glucose homeostasis, incretin axis, and islet beta cell dynamics.', 110, 'GLP-5MG-10V', 'GLP-1 (Glucagon-Like Peptide-1)', 100, false, false, 'published', 4.9, v_cat_weight, v_now, v_now),
    ('GLP-1 (Glucagon-Like Peptide-1) - 15mg * 10vials', 'glp-1-15mg-10vials', 'Endogenous GLP-1 (7-36) amide 15mg * 10 vials.', 'Native incretin hormone peptide investigated in glucose homeostasis, incretin axis, and islet beta cell dynamics.', 150, 'GLP-15MG-10V', 'GLP-1 (Glucagon-Like Peptide-1)', 100, true, true, 'published', 5.0, v_cat_weight, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 30. Glutathione
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Glutathione - 250-500mg', 'glutathione-250-500mg', 'Reduced Glutathione (GSH) 250-500mg research vial.', 'Master endogenous intracellular antioxidant peptide critical for redox balance and detoxification assays.', 35, 'GSH-250-500MG', 'Glutathione', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Glutathione - 500-1000mg', 'glutathione-500-1000mg', 'Reduced Glutathione (GSH) 500-1000mg research vial.', 'Master endogenous intracellular antioxidant peptide critical for redox balance and detoxification assays.', 50, 'GSH-500-1000MG', 'Glutathione', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 31. Gonadorelin Acetate (GnRH)
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Gonadorelin Acetate (GnRH) - 2mg vials', 'gonadorelin-acetate-2mg-vials', 'Gonadorelin (GnRH decapeptide) 2mg vial.', 'Gonadotropin-releasing hormone agonist synthesized for hypothalamic-pituitary-gonadal axis investigations.', 30, 'GNR-2MG-V', 'Gonadorelin Acetate (GnRH)', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Gonadorelin Acetate (GnRH) - 5mg vials', 'gonadorelin-acetate-5mg-vials', 'Gonadorelin (GnRH decapeptide) 5mg vial.', 'Gonadotropin-releasing hormone agonist synthesized for hypothalamic-pituitary-gonadal axis investigations.', 40, 'GNR-5MG-V', 'Gonadorelin Acetate (GnRH)', 100, true, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Gonadorelin Acetate (GnRH) - 25mg vials', 'gonadorelin-acetate-25mg-vials', 'Gonadorelin (GnRH decapeptide) 25mg vial.', 'Gonadotropin-releasing hormone agonist synthesized for hypothalamic-pituitary-gonadal axis investigations.', 55, 'GNR-25MG-V', 'Gonadorelin Acetate (GnRH)', 100, false, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Gonadorelin Acetate (GnRH) - 100mg vials', 'gonadorelin-acetate-100mg-vials', 'Gonadorelin (GnRH decapeptide) 100mg vial.', 'Gonadotropin-releasing hormone agonist synthesized for hypothalamic-pituitary-gonadal axis investigations.', 70, 'GNR-100MG-V', 'Gonadorelin Acetate (GnRH)', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 32. HCG (Human Chorionic Gonadotropin)
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('HCG (Human Chorionic Gonadotropin) - 5000IU * 10vials', 'hcg-5000iu-10vials', 'Human Chorionic Gonadotropin 5,000 IU * 10 vials.', 'Heterodimeric glycoprotein hormone mimicking LH action on Leydig cells in endocrinology models.', 40, 'HCG-5KIU-10V', 'HCG (Human Chorionic Gonadotropin)', 100, true, true, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('HCG (Human Chorionic Gonadotropin) - 10000IU * 10vials', 'hcg-10000iu-10vials', 'Human Chorionic Gonadotropin 10,000 IU * 10 vials.', 'Heterodimeric glycoprotein hormone mimicking LH action on Leydig cells in endocrinology models.', 50, 'HCG-10KIU-10V', 'HCG (Human Chorionic Gonadotropin)', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 33. Hexarelin Acetate
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Hexarelin Acetate - 2mg * 10vials', 'hexarelin-acetate-2mg-10vials', 'Hexarelin Acetate hexapeptide 2mg * 10 vials.', 'Synthetic hexapeptide secretagogue studied for potent growth hormone elevation and cardioprotective receptor signaling.', 35, 'HEX-2MG-10V', 'Hexarelin Acetate', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Hexarelin Acetate - 5mg * 10vials', 'hexarelin-acetate-5mg-10vials', 'Hexarelin Acetate hexapeptide 5mg * 10 vials.', 'Synthetic hexapeptide secretagogue studied for potent growth hormone elevation and cardioprotective receptor signaling.', 55, 'HEX-5MG-10V', 'Hexarelin Acetate', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 34. HGH 191AA (Human Growth Hormone 191 Amino Acid) Somatropin
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('HGH 191AA (Human Growth Hormone 191 Amino Acid) Somatropin - 10IU', 'hgh-191aa-somatropin-10iu', 'Authentic 191-amino acid recombinant Somatropin 10 IU.', 'Recombinant human growth hormone synthesized with exact native 191-amino acid sequence for endocrine signaling research.', 25, 'HGH-10IU', 'HGH 191AA (Human Growth Hormone 191 Amino Acid) Somatropin', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('HGH 191AA (Human Growth Hormone 191 Amino Acid) Somatropin - 15IU', 'hgh-191aa-somatropin-15iu', 'Authentic 191-amino acid recombinant Somatropin 15 IU.', 'Recombinant human growth hormone synthesized with exact native 191-amino acid sequence for endocrine signaling research.', 30, 'HGH-15IU', 'HGH 191AA (Human Growth Hormone 191 Amino Acid) Somatropin', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('HGH 191AA (Human Growth Hormone 191 Amino Acid) Somatropin - 36IU', 'hgh-191aa-somatropin-36iu', 'Authentic 191-amino acid recombinant Somatropin 36 IU.', 'Recombinant human growth hormone synthesized with exact native 191-amino acid sequence for endocrine signaling research.', 40, 'HGH-36IU', 'HGH 191AA (Human Growth Hormone 191 Amino Acid) Somatropin', 100, true, false, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('HGH 191AA (Human Growth Hormone 191 Amino Acid) Somatropin - 60IU', 'hgh-191aa-somatropin-60iu', 'Authentic 191-amino acid recombinant Somatropin 60 IU.', 'Recombinant human growth hormone synthesized with exact native 191-amino acid sequence for endocrine signaling research.', 50, 'HGH-60IU', 'HGH 191AA (Human Growth Hormone 191 Amino Acid) Somatropin', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('HGH 191AA (Human Growth Hormone 191 Amino Acid) Somatropin - 100IU', 'hgh-191aa-somatropin-100iu', 'Authentic 191-amino acid recombinant Somatropin 100 IU kit.', 'Recombinant human growth hormone synthesized with exact native 191-amino acid sequence for endocrine signaling research.', 60, 'HGH-100IU', 'HGH 191AA (Human Growth Hormone 191 Amino Acid) Somatropin', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('HGH 191AA (Human Growth Hormone 191 Amino Acid) Somatropin - 150IU', 'hgh-191aa-somatropin-150iu', 'Authentic 191-amino acid recombinant Somatropin 150 IU kit.', 'Recombinant human growth hormone synthesized with exact native 191-amino acid sequence for endocrine signaling research.', 85, 'HGH-150IU', 'HGH 191AA (Human Growth Hormone 191 Amino Acid) Somatropin', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 35. HGH Fragments 176-191
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('HGH Fragments 176-191 - 2mg vials', 'hgh-fragments-176-191-2mg-vials', 'HGH Fragment 176-191 peptide 2mg vial.', 'C-terminal region of human growth hormone investigated for targeted adipocyte lipolysis without IGF-1 stimulation.', 35, 'HGF-2MG-V', 'HGH Fragments 176-191', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('HGH Fragments 176-191 - 5mg vials', 'hgh-fragments-176-191-5mg-vials', 'HGH Fragment 176-191 peptide 5mg vial.', 'C-terminal region of human growth hormone investigated for targeted adipocyte lipolysis without IGF-1 stimulation.', 45, 'HGF-5MG-V', 'HGH Fragments 176-191', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('HGH Fragments 176-191 - 10mg vials', 'hgh-fragments-176-191-10mg-vials', 'HGH Fragment 176-191 peptide 10mg vial.', 'C-terminal region of human growth hormone investigated for targeted adipocyte lipolysis without IGF-1 stimulation.', 60, 'HGF-10MG-V', 'HGH Fragments 176-191', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 36. HMG (Human Menopausal Gonadotropin)
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('HMG (Human Menopausal Gonadotropin) - 75IU', 'hmg-75iu', 'Human Menopausal Gonadotropin (FSH + LH active) 75 IU.', 'Purified gonadotropin containing both FSH and LH biological activity for reproductive physiology protocols.', 80, 'HMG-75IU', 'HMG (Human Menopausal Gonadotropin)', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('HMG (Human Menopausal Gonadotropin) - 150IU', 'hmg-150iu', 'Human Menopausal Gonadotropin (FSH + LH active) 150 IU.', 'Purified gonadotropin containing both FSH and LH biological activity for reproductive physiology protocols.', 120, 'HMG-150IU', 'HMG (Human Menopausal Gonadotropin)', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 37. Hyaluronic Acid
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Hyaluronic Acid - 50mg', 'hyaluronic-acid-50mg', 'High molecular weight Hyaluronic Acid 50mg.', 'Glycosaminoglycan biomaterial studied for extracellular matrix viscoelasticity and synovial fluid lubrication research.', 20, 'HYA-50MG', 'Hyaluronic Acid', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Hyaluronic Acid - 80mg', 'hyaluronic-acid-80mg', 'High molecular weight Hyaluronic Acid 80mg.', 'Glycosaminoglycan biomaterial studied for extracellular matrix viscoelasticity and synovial fluid lubrication research.', 25, 'HYA-80MG', 'Hyaluronic Acid', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Hyaluronic Acid - 120mg', 'hyaluronic-acid-120mg', 'High molecular weight Hyaluronic Acid 120mg.', 'Glycosaminoglycan biomaterial studied for extracellular matrix viscoelasticity and synovial fluid lubrication research.', 35, 'HYA-120MG', 'Hyaluronic Acid', 100, true, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Hyaluronic Acid - 200mg', 'hyaluronic-acid-200mg', 'High molecular weight Hyaluronic Acid 200mg.', 'Glycosaminoglycan biomaterial studied for extracellular matrix viscoelasticity and synovial fluid lubrication research.', 45, 'HYA-200MG', 'Hyaluronic Acid', 100, false, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Hyaluronic Acid - 240mg', 'hyaluronic-acid-240mg', 'High molecular weight Hyaluronic Acid 240mg.', 'Glycosaminoglycan biomaterial studied for extracellular matrix viscoelasticity and synovial fluid lubrication research.', 55, 'HYA-240MG', 'Hyaluronic Acid', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 38. IGF-1 LR3 (Insulin-Like Growth Factor-1 Long Arg3)
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('IGF-1 LR3 (Insulin-Like Growth Factor-1 Long Arg3) - 1mg vials', 'igf-1-lr3-1mg-vials', 'IGF-1 LR3 recombinant peptide 1mg vial.', '83-amino acid analogue of IGF-1 with an Arg substitution and 13-amino acid N-terminal extension conferring prolonged half-life and enhanced receptor activation.', 35, 'IGF-LR3-1MG-V', 'IGF-1 LR3 (Insulin-Like Growth Factor-1 Long Arg3)', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('IGF-1 LR3 (Insulin-Like Growth Factor-1 Long Arg3) - 5mg vial', 'igf-1-lr3-5mg-vial', 'IGF-1 LR3 recombinant peptide 5mg vial.', '83-amino acid analogue of IGF-1 with an Arg substitution and 13-amino acid N-terminal extension conferring prolonged half-life and enhanced receptor activation.', 45, 'IGF-LR3-5MG-V', 'IGF-1 LR3 (Insulin-Like Growth Factor-1 Long Arg3)', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 39. IGF-DES (IGF-1 DES 1-3)
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('IGF-DES (IGF-1 DES 1-3) - 1mg vials', 'igf-des-1mg-vials', 'IGF-1 DES (1-3) truncated peptide 1mg vial.', 'Truncated IGF-1 variant lacking first 3 N-terminal amino acids for extremely high local potency and low IGFBP binding affinity.', 30, 'IGF-DES-1MG-V', 'IGF-DES (IGF-1 DES 1-3)', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('IGF-DES (IGF-1 DES 1-3) - 2mg vials', 'igf-des-2mg-vials', 'IGF-1 DES (1-3) truncated peptide 2mg vial.', 'Truncated IGF-1 variant lacking first 3 N-terminal amino acids for extremely high local potency and low IGFBP binding affinity.', 45, 'IGF-DES-2MG-V', 'IGF-DES (IGF-1 DES 1-3)', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 40. Insulin
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Insulin - 3mg * 10vials', 'insulin-3mg-10vials', 'Recombinant Human Insulin 3mg * 10 vials.', 'Two-chain peptide hormone synthesized for glucose uptake signaling and transmembrane receptor tyrosine kinase assays.', 35, 'INS-3MG-10V', 'Insulin', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Insulin - 5mg * 10vials', 'insulin-5mg-10vials', 'Recombinant Human Insulin 5mg * 10 vials.', 'Two-chain peptide hormone synthesized for glucose uptake signaling and transmembrane receptor tyrosine kinase assays.', 45, 'INS-5MG-10V', 'Insulin', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 41. Ipamorelin
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Ipamorelin - 2mg*10vials', 'ipamorelin-2mg-10vials', 'Ipamorelin selective GH secretagogue pentapeptide 2mg * 10 vials.', 'Highly selective pentapeptide ghrelin receptor agonist stimulating GH release without cortisol, prolactin, or ACTH elevation.', 25, 'IPA-2MG-10V', 'Ipamorelin', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Ipamorelin - 5mg*10vials', 'ipamorelin-5mg-10vials', 'Ipamorelin selective GH secretagogue pentapeptide 5mg * 10 vials.', 'Highly selective pentapeptide ghrelin receptor agonist stimulating GH release without cortisol, prolactin, or ACTH elevation.', 35, 'IPA-5MG-10V', 'Ipamorelin', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Ipamorelin - 10mg*10vials', 'ipamorelin-10mg-10vials', 'Ipamorelin selective GH secretagogue pentapeptide 10mg * 10 vials.', 'Highly selective pentapeptide ghrelin receptor agonist stimulating GH release without cortisol, prolactin, or ACTH elevation.', 45, 'IPA-10MG-10V', 'Ipamorelin', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 42. Kisspeptin-10
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Kisspeptin-10 - 5mg*10vials', 'kisspeptin-10-5mg-10vials', 'Kisspeptin-10 decapeptide 5mg * 10 vials.', 'Endogenous GPR54 (KISS1R) receptor agonist investigated for GnRH secretion and reproductive neuroendocrinology.', 45, 'KIS-5MG-10V', 'Kisspeptin-10', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Kisspeptin-10 - 10mg*10vials', 'kisspeptin-10-10mg-10vials', 'Kisspeptin-10 decapeptide 10mg * 10 vials.', 'Endogenous GPR54 (KISS1R) receptor agonist investigated for GnRH secretion and reproductive neuroendocrinology.', 55, 'KIS-10MG-10V', 'Kisspeptin-10', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 43. KPV (Multi-attribute format: Vials vs Capsules)
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('KPV - 5mg * 10vials', 'kpv-5mg-10vials', 'KPV anti-inflammatory tripeptide 5mg * 10 vials.', 'Lysine-Proline-Valine C-terminal tripeptide derived from alpha-MSH investigated for gut mucosal inflammation suppression and antimicrobial pathways.', 30, 'KPV-5MG-10V', 'KPV', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('KPV - 10mg*10vials', 'kpv-10mg-10vials', 'KPV anti-inflammatory tripeptide 10mg * 10 vials.', 'Lysine-Proline-Valine C-terminal tripeptide derived from alpha-MSH investigated for gut mucosal inflammation suppression and antimicrobial pathways.', 40, 'KPV-10MG-10V', 'KPV', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('KPV - 250mcg * 60 capsules', 'kpv-250mcg-60-capsules', 'KPV Oral Capsules 250mcg * 60 capsules bottle.', 'Enteric-coated oral research formulation of KPV tripeptide designed for targeted gastrointestinal tract bioavailability studies.', 70, 'KPV-250MCG-60CAP', 'KPV', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('KPV - 500mcg * 60capsules', 'kpv-500mcg-60capsules', 'KPV Oral Capsules 500mcg * 60 capsules bottle.', 'Enteric-coated oral research formulation of KPV tripeptide designed for targeted gastrointestinal tract bioavailability studies.', 90, 'KPV-500MCG-60CAP', 'KPV', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 44. LL37
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('LL37 - 1mg', 'll37-1mg', 'LL-37 human cathelicidin antimicrobial peptide 1mg.', 'Naturally occurring 37-residue amphipathic alpha-helical peptide investigated in innate immunity, membrane permeabilization, and wound repair.', 25, 'LL37-1MG', 'LL37', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('LL37 - 5mg', 'll37-5mg', 'LL-37 human cathelicidin antimicrobial peptide 5mg.', 'Naturally occurring 37-residue amphipathic alpha-helical peptide investigated in innate immunity, membrane permeabilization, and wound repair.', 35, 'LL37-5MG', 'LL37', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('LL37 - 10mg', 'll37-10mg', 'LL-37 human cathelicidin antimicrobial peptide 10mg.', 'Naturally occurring 37-residue amphipathic alpha-helical peptide investigated in innate immunity, membrane permeabilization, and wound repair.', 45, 'LL37-10MG', 'LL37', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('LL37 - 25mg', 'll37-25mg', 'LL-37 human cathelicidin antimicrobial peptide 25mg.', 'Naturally occurring 37-residue amphipathic alpha-helical peptide investigated in innate immunity, membrane permeabilization, and wound repair.', 60, 'LL37-25MG', 'LL37', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 45. Lyophilisate
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Lyophilisate - Spasfon Lyoc (80 mg oral tablets)', 'lyophilisate-spasfon-lyoc-80mg', 'Spasfon Lyoc (Phloroglucinol) 80mg oral lyophilized formulation.', 'Specialized lyophilized formulation for bio-availability and smooth muscle pathway study.', 20, 'LYO-SPO-80MG', 'Lyophilisate', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Lyophilisate - Loperamide (2 mg lyophilized doses)', 'lyophilisate-loperamide-2mg', 'Loperamide 2mg fast-dissolving lyophilized formulation.', 'Fast-dispersing lyophilized opioid receptor agonist for gastrointestinal research.', 30, 'LYO-LOP-2MG', 'Lyophilisate', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Lyophilisate - Trypsin Inhibitor Lyophilized Powder (250 mg)', 'lyophilisate-trypsin-inhibitor-250mg', 'Trypsin Inhibitor high-purity lyophilized powder 250mg.', 'Enzyme kinetic inhibitor for cell culture and proteolytic stability assays.', 45, 'LYO-TRY-250MG', 'Lyophilisate', 100, true, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Lyophilisate - Proteinase K Lyophilisate (100 mg)', 'lyophilisate-proteinase-k-100mg', 'Proteinase K molecular biology grade lyophilized enzyme 100mg.', 'Broad-spectrum serine protease for nucleic acid purification and digest protocols.', 60, 'LYO-PRO-100MG', 'Lyophilisate', 100, false, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 46. Mazdutide
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('mazdutide - 1mg vials', 'mazdutide-1mg-vials', 'Mazdutide (OXM analog) dual GLP-1/glucagon agonist 1mg vial.', 'Oxyntomodulin-based dual agonist activating both GLP-1 and glucagon receptors for metabolic rate and energy expenditure studies.', 20, 'MAZ-1MG-V', 'mazdutide', 100, false, false, 'published', 4.8, v_cat_weight, v_now, v_now),
    ('mazdutide - 5mg vials', 'mazdutide-5mg-vials', 'Mazdutide (OXM analog) dual GLP-1/glucagon agonist 5mg vial.', 'Oxyntomodulin-based dual agonist activating both GLP-1 and glucagon receptors for metabolic rate and energy expenditure studies.', 35, 'MAZ-5MG-V', 'mazdutide', 100, true, false, 'published', 4.9, v_cat_weight, v_now, v_now),
    ('mazdutide - 10mg vials', 'mazdutide-10mg-vials', 'Mazdutide (OXM analog) dual GLP-1/glucagon agonist 10mg vial.', 'Oxyntomodulin-based dual agonist activating both GLP-1 and glucagon receptors for metabolic rate and energy expenditure studies.', 45, 'MAZ-10MG-V', 'mazdutide', 100, true, true, 'published', 5.0, v_cat_weight, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 47. Melanotan
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Melanotan - 5mg vials', 'melanotan-5mg-vials', 'Melanotan-II cyclic heptapeptide 5mg vial.', 'Synthetic melanocortin receptor agonist studied for melanogenesis, MC1R/MC4R binding, and lipid metabolism pathways.', 35, 'MT2-5MG-V', 'Melanotan', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Melanotan - 10mg vials', 'melanotan-10mg-vials', 'Melanotan-II cyclic heptapeptide 10mg vial.', 'Synthetic melanocortin receptor agonist studied for melanogenesis, MC1R/MC4R binding, and lipid metabolism pathways.', 45, 'MT2-10MG-V', 'Melanotan', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 48. Melanotan 1
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Melanotan 1 - 5mg vials', 'melanotan-1-5mg-vials', 'Melanotan-1 (Afamelanotide) linear peptide 5mg vial.', 'Linear synthetic analogue of alpha-melanocyte stimulating hormone (alpha-MSH) investigated for selective MC1R activation.', 25, 'MT1-5MG-V', 'Melanotan 1', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Melanotan 1 - 10mg vials', 'melanotan-1-10mg-vials', 'Melanotan-1 (Afamelanotide) linear peptide 10mg vial.', 'Linear synthetic analogue of alpha-melanocyte stimulating hormone (alpha-MSH) investigated for selective MC1R activation.', 35, 'MT1-10MG-V', 'Melanotan 1', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 49. Melatonin
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Melatonin - 1mg-3mg * 60-90 tabs', 'melatonin-1mg-3mg-60-90-tabs', 'Melatonin pure indoleamine 1-3mg * 60-90 tablets.', 'Pineal neurohormone investigated in MT1/MT2 receptor dynamics and mitochondrial antioxidant protection.', 15, 'MLT-1-3MG-TAB', 'Melatonin', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Melatonin - 5mg * 90-100 tabs', 'melatonin-5mg-90-100-tabs', 'Melatonin pure indoleamine 5mg * 90-100 tablets.', 'Pineal neurohormone investigated in MT1/MT2 receptor dynamics and mitochondrial antioxidant protection.', 25, 'MLT-5MG-TAB', 'Melatonin', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Melatonin - 10-12mg * 60-100 tabs', 'melatonin-10-12mg-60-100-tabs', 'Melatonin pure indoleamine 10-12mg * 60-100 tablets.', 'Pineal neurohormone investigated in MT1/MT2 receptor dynamics and mitochondrial antioxidant protection.', 35, 'MLT-10-12MG-TAB', 'Melatonin', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 50. MGF ( Mechano Growth Factor)
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('MGF ( Mechano Growth Factor) - 2mg vial', 'mgf-mechano-growth-factor-2mg-vial', 'MGF (IGF-1Ec splice variant) 2mg research vial.', 'Splice variant of IGF-1 produced in response to mechanical muscle stretch, investigated for local satellite cell activation.', 25, 'MGF-2MG-V', 'MGF ( Mechano Growth Factor)', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('MGF ( Mechano Growth Factor) - 5mg vial', 'mgf-mechano-growth-factor-5mg-vial', 'MGF (IGF-1Ec splice variant) 5mg research vial.', 'Splice variant of IGF-1 produced in response to mechanical muscle stretch, investigated for local satellite cell activation.', 40, 'MGF-5MG-V', 'MGF ( Mechano Growth Factor)', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 51. MOTS-c
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('MOTS-c - 10mg * 10vials', 'mots-c-10mg-10vials', 'MOTS-c mitochondrial-derived peptide 10mg * 10 vials.', '16-amino acid mitochondrial-encoded peptide researched for AMPK activation, glucose uptake, and metabolic adaptation.', 35, 'MOT-10MG-10V', 'MOTS-c', 100, true, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('MOTS-c - 40mg * 10vials', 'mots-c-40mg-10vials', 'MOTS-c mitochondrial-derived peptide 40mg * 10 vials.', '16-amino acid mitochondrial-encoded peptide researched for AMPK activation, glucose uptake, and metabolic adaptation.', 45, 'MOT-40MG-10V', 'MOTS-c', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 52. NAD+
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('NAD+ - 100mg', 'nad-plus-100mg', 'Nicotinamide Adenine Dinucleotide (NAD+) 100mg vial.', 'Essential cellular coenzyme investigated in sirtuin activation, DNA repair, and mitochondrial bioenergetics.', 65, 'NAD-100MG', 'NAD+', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('NAD+ - 250mg', 'nad-plus-250mg', 'Nicotinamide Adenine Dinucleotide (NAD+) 250mg vial.', 'Essential cellular coenzyme investigated in sirtuin activation, DNA repair, and mitochondrial bioenergetics.', 80, 'NAD-250MG', 'NAD+', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('NAD+ - 300mg', 'nad-plus-300mg', 'Nicotinamide Adenine Dinucleotide (NAD+) 300mg vial.', 'Essential cellular coenzyme investigated in sirtuin activation, DNA repair, and mitochondrial bioenergetics.', 95, 'NAD-300MG', 'NAD+', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('NAD+ - 500mg', 'nad-plus-500mg', 'Nicotinamide Adenine Dinucleotide (NAD+) 500mg vial.', 'Essential cellular coenzyme investigated in sirtuin activation, DNA repair, and mitochondrial bioenergetics.', 120, 'NAD-500MG', 'NAD+', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('NAD+ - 750mg', 'nad-plus-750mg', 'Nicotinamide Adenine Dinucleotide (NAD+) 750mg vial.', 'Essential cellular coenzyme investigated in sirtuin activation, DNA repair, and mitochondrial bioenergetics.', 145, 'NAD-750MG', 'NAD+', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('NAD+ - 1000mg', 'nad-plus-1000mg', 'Nicotinamide Adenine Dinucleotide (NAD+) 1000mg vial.', 'Essential cellular coenzyme investigated in sirtuin activation, DNA repair, and mitochondrial bioenergetics.', 175, 'NAD-1000MG', 'NAD+', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('NAD+ - 1500mg', 'nad-plus-1500mg', 'Nicotinamide Adenine Dinucleotide (NAD+) 1500mg vial.', 'Essential cellular coenzyme investigated in sirtuin activation, DNA repair, and mitochondrial bioenergetics.', 190, 'NAD-1500MG', 'NAD+', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 53. Oxytocin Acetate
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Oxytocin Acetate - 1mg * 10vials', 'oxytocin-acetate-1mg-10vials', 'Oxytocin Acetate cyclic nonapeptide 1mg * 10 vials.', 'Endogenous neurohypophysial hormone peptide studied in prosocial behavior, maternal bonding, and neuroendocrine signaling.', 25, 'OXT-1MG-10V', 'Oxytocin Acetate', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Oxytocin Acetate - 2mg * 10vials', 'oxytocin-acetate-2mg-10vials', 'Oxytocin Acetate cyclic nonapeptide 2mg * 10 vials.', 'Endogenous neurohypophysial hormone peptide studied in prosocial behavior, maternal bonding, and neuroendocrine signaling.', 35, 'OXT-2MG-10V', 'Oxytocin Acetate', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Oxytocin Acetate - 5mg * 10vials', 'oxytocin-acetate-5mg-10vials', 'Oxytocin Acetate cyclic nonapeptide 5mg * 10 vials.', 'Endogenous neurohypophysial hormone peptide studied in prosocial behavior, maternal bonding, and neuroendocrine signaling.', 45, 'OXT-5MG-10V', 'Oxytocin Acetate', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Oxytocin Acetate - 10mg * 10vials', 'oxytocin-acetate-10mg-10vials', 'Oxytocin Acetate cyclic nonapeptide 10mg * 10 vials.', 'Endogenous neurohypophysial hormone peptide studied in prosocial behavior, maternal bonding, and neuroendocrine signaling.', 60, 'OXT-10MG-10V', 'Oxytocin Acetate', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 54. P21
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('P21 - 5mg vials', 'p21-5mg-vials', 'P21 CNTF-derived neurogenic peptide 5mg vial.', 'Synthetic peptide derived from Ciliary Neurotrophic Factor studied for neurogenesis, synaptogenesis, and memory consolidation.', 25, 'P21-5MG-V', 'P21', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('P21 - 10mg vials', 'p21-10mg-vials', 'P21 CNTF-derived neurogenic peptide 10mg vial.', 'Synthetic peptide derived from Ciliary Neurotrophic Factor studied for neurogenesis, synaptogenesis, and memory consolidation.', 40, 'P21-10MG-V', 'P21', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 55. PE22-28
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('PE22-28 - 5mg vials', 'pe22-28-5mg-vials', 'PE22-28 TREK-1 potassium channel antagonist peptide 5mg vial.', 'Spadin-derived peptide antagonist for TREK-1 channels investigated in neuroprotection and antidepressant response pathways.', 20, 'PE22-5MG-V', 'PE22-28', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('PE22-28 - 8mg vials', 'pe22-28-8mg-vials', 'PE22-28 TREK-1 potassium channel antagonist peptide 8mg vial.', 'Spadin-derived peptide antagonist for TREK-1 channels investigated in neuroprotection and antidepressant response pathways.', 30, 'PE22-8MG-V', 'PE22-28', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('PE22-28 - 10mg vials', 'pe22-28-10mg-vials', 'PE22-28 TREK-1 potassium channel antagonist peptide 10mg vial.', 'Spadin-derived peptide antagonist for TREK-1 channels investigated in neuroprotection and antidepressant response pathways.', 40, 'PE22-10MG-V', 'PE22-28', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 56. PEG MGF (Pegylated Mechano Growth Factor)
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('PEG MGF (Pegylated Mechano Growth Factor) - 2mg vials', 'peg-mgf-2mg-vials', 'PEGylated MGF 2mg research vial.', 'Pegylated splice variant of IGF-1 providing extended systemic bio-availability for muscle satellite cell proliferation research.', 25, 'PMG-2MG-V', 'PEG MGF', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('PEG MGF (Pegylated Mechano Growth Factor) - 5mg vials', 'peg-mgf-5mg-vials', 'PEGylated MGF 5mg research vial.', 'Pegylated splice variant of IGF-1 providing extended systemic bio-availability for muscle satellite cell proliferation research.', 35, 'PMG-5MG-V', 'PEG MGF', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 57. PNC-27
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('PNC-27 - 5mg vial', 'pnc-27-5mg-vial', 'PNC-27 membrane-active anti-tumor peptide 5mg vial.', 'Synthetic peptide engineered from p53 HDM-2 binding domain coupled to transmembrane penetratin domain for selective membranous pore formation research.', 25, 'PNC-5MG-V', 'PNC-27', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('PNC-27 - 10mg vial', 'pnc-27-10mg-vial', 'PNC-27 membrane-active anti-tumor peptide 10mg vial.', 'Synthetic peptide engineered from p53 HDM-2 binding domain coupled to transmembrane penetratin domain for selective membranous pore formation research.', 35, 'PNC-10MG-V', 'PNC-27', 100, true, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('PNC-27 - 25mg vial', 'pnc-27-25mg-vial', 'PNC-27 membrane-active anti-tumor peptide 25mg vial.', 'Synthetic peptide engineered from p53 HDM-2 binding domain coupled to transmembrane penetratin domain for selective membranous pore formation research.', 50, 'PNC-25MG-V', 'PNC-27', 100, false, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 58. PT-141
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('PT-141 - 5mg vials', 'pt-141-5mg-vials', 'Bremelanotide (PT-141) cyclic heptapeptide 5mg vial.', 'Synthetic melanocortin receptor agonist activating MC3R and MC4R in central nervous system pathways.', 25, 'PT141-5MG-V', 'PT-141', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('PT-141 - 10mg vial', 'pt-141-10mg-vial', 'Bremelanotide (PT-141) cyclic heptapeptide 10mg vial.', 'Synthetic melanocortin receptor agonist activating MC3R and MC4R in central nervous system pathways.', 35, 'PT141-10MG-V', 'PT-141', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('PT-141 - 12mg vial', 'pt-141-12mg-vial', 'Bremelanotide (PT-141) cyclic heptapeptide 12mg vial.', 'Synthetic melanocortin receptor agonist activating MC3R and MC4R in central nervous system pathways.', 50, 'PT141-12MG-V', 'PT-141', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 59. Selank
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Selank - 5mg * 10vials', 'selank-5mg-10vials', 'Selank synthetic tuftsin analogue heptapeptide 5mg * 10 vials.', 'Regulatory peptide modulating enkephalinase activity and GABAergic neurotransmission in anxiety/cognition models.', 25, 'SEL-5MG-10V', 'Selank', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Selank - 10mg * 10vials', 'selank-10mg-10vials', 'Selank synthetic tuftsin analogue heptapeptide 10mg * 10 vials.', 'Regulatory peptide modulating enkephalinase activity and GABAergic neurotransmission in anxiety/cognition models.', 35, 'SEL-10MG-10V', 'Selank', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 60. Semax
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Semax - 5mg vials', 'semax-5mg-vials', 'Semax ACTH (4-10) heptapeptide analogue 5mg vial.', 'Synthetic peptide fragment of ACTH studied for BDNF expression, neuroprotection, and attention/cognitive research.', 30, 'SMX-5MG-V', 'Semax', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Semax - 10mg vials', 'semax-10mg-vials', 'Semax ACTH (4-10) heptapeptide analogue 10mg vial.', 'Synthetic peptide fragment of ACTH studied for BDNF expression, neuroprotection, and attention/cognitive research.', 45, 'SMX-10MG-V', 'Semax', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Semax - 20mg vials', 'semax-20mg-vials', 'Semax ACTH (4-10) heptapeptide analogue 20mg vial.', 'Synthetic peptide fragment of ACTH studied for BDNF expression, neuroprotection, and attention/cognitive research.', 55, 'SMX-20MG-V', 'Semax', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Semax - 30mg vials', 'semax-30mg-vials', 'Semax ACTH (4-10) heptapeptide analogue 30mg vial.', 'Synthetic peptide fragment of ACTH studied for BDNF expression, neuroprotection, and attention/cognitive research.', 70, 'SMX-30MG-V', 'Semax', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 61. Sermorelin Acetate
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Sermorelin Acetate - 2mg * 10vials', 'sermorelin-acetate-2mg-10vials', 'Sermorelin (GHRH 1-29) 2mg * 10 vials.', 'Bioactive N-terminal 29-amino acid fragment of growth hormone-releasing hormone for endogenous pituitary stimulation studies.', 20, 'SRM-2MG-10V', 'Sermorelin Acetate', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Sermorelin Acetate - 5mg * 10vials', 'sermorelin-acetate-5mg-10vials', 'Sermorelin (GHRH 1-29) 5mg * 10 vials.', 'Bioactive N-terminal 29-amino acid fragment of growth hormone-releasing hormone for endogenous pituitary stimulation studies.', 30, 'SRM-5MG-10V', 'Sermorelin Acetate', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Sermorelin Acetate - 10mg * 10vials', 'sermorelin-acetate-10mg-10vials', 'Sermorelin (GHRH 1-29) 10mg * 10 vials.', 'Bioactive N-terminal 29-amino acid fragment of growth hormone-releasing hormone for endogenous pituitary stimulation studies.', 40, 'SRM-10MG-10V', 'Sermorelin Acetate', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 62. SNAP-8
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('SNAP-8 - 10mg vials', 'snap-8-10mg-vials', 'SNAP-8 (Acetyl Octapeptide-3) 10mg vial.', 'Octapeptide mimicking SNAP-25 N-terminal domain to inhibit SNARE complex assembly and catecholamine exocytosis.', 25, 'SNP-10MG-V', 'SNAP-8', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('SNAP-8 - 100mg vials', 'snap-8-100mg-vials', 'SNAP-8 (Acetyl Octapeptide-3) 100mg vial.', 'Octapeptide mimicking SNAP-25 N-terminal domain to inhibit SNARE complex assembly and catecholamine exocytosis.', 40, 'SNP-100MG-V', 'SNAP-8', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('SNAP-8 - 200mg vials', 'snap-8-200mg-vials', 'SNAP-8 (Acetyl Octapeptide-3) 200mg vial.', 'Octapeptide mimicking SNAP-25 N-terminal domain to inhibit SNARE complex assembly and catecholamine exocytosis.', 55, 'SNP-200MG-V', 'SNAP-8', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 63. Somatropin
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Somatropin - 10IU vial', 'somatropin-10iu-vial', 'Somatropin recombinant human growth hormone 10 IU vial.', 'Recombinant somatotropic polypeptide for cell division, protein synthesis, and nitrogen retention investigations.', 20, 'SOM-10IU-V', 'Somatropin', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Somatropin - 100IU vial', 'somatropin-100iu-vial', 'Somatropin recombinant human growth hormone 100 IU vial.', 'Recombinant somatotropic polypeptide for cell division, protein synthesis, and nitrogen retention investigations.', 30, 'SOM-100IU-V', 'Somatropin', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 64. SS-31 ( elamipretide or Bendavia)
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('SS-31 ( elamipretide or Bendavia) - 10mg vials', 'ss-31-10mg-vials', 'SS-31 (Elamipretide / Bendavia) 10mg vial.', 'Mitochondria-targeting tetrapeptide selectively binding cardiolipin on inner mitochondrial membrane to optimize electron transport and reduce ROS.', 25, 'SS31-10MG-V', 'SS-31 ( elamipretide or Bendavia)', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('SS-31 ( elamipretide or Bendavia) - 30mg vials', 'ss-31-30mg-vials', 'SS-31 (Elamipretide / Bendavia) 30mg vial.', 'Mitochondria-targeting tetrapeptide selectively binding cardiolipin on inner mitochondrial membrane to optimize electron transport and reduce ROS.', 40, 'SS31-30MG-V', 'SS-31 ( elamipretide or Bendavia)', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('SS-31 ( elamipretide or Bendavia) - 50mg vials', 'ss-31-50mg-vials', 'SS-31 (Elamipretide / Bendavia) 50mg vial.', 'Mitochondria-targeting tetrapeptide selectively binding cardiolipin on inner mitochondrial membrane to optimize electron transport and reduce ROS.', 55, 'SS31-50MG-V', 'SS-31 ( elamipretide or Bendavia)', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 65. Survodutide
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Survodutide - 2mg vials', 'survodutide-2mg-vials', 'Survodutide dual GLP-1/Glucagon receptor agonist 2mg vial.', 'Next-generation glucagon / GLP-1 receptor dual agonist engineered for advanced hepatic and whole-body metabolic profiling.', 20, 'SRV-2MG-V', 'Survodutide', 100, false, false, 'published', 4.8, v_cat_weight, v_now, v_now),
    ('Survodutide - 6mg vials', 'survodutide-6mg-vials', 'Survodutide dual GLP-1/Glucagon receptor agonist 6mg vial.', 'Next-generation glucagon / GLP-1 receptor dual agonist engineered for advanced hepatic and whole-body metabolic profiling.', 35, 'SRV-6MG-V', 'Survodutide', 100, false, false, 'published', 4.9, v_cat_weight, v_now, v_now),
    ('Survodutide - 10mg vials', 'survodutide-10mg-vials', 'Survodutide dual GLP-1/Glucagon receptor agonist 10mg vial.', 'Next-generation glucagon / GLP-1 receptor dual agonist engineered for advanced hepatic and whole-body metabolic profiling.', 45, 'SRV-10MG-V', 'Survodutide', 100, true, true, 'published', 5.0, v_cat_weight, v_now, v_now),
    ('Survodutide - 12mg vials', 'survodutide-12mg-vials', 'Survodutide dual GLP-1/Glucagon receptor agonist 12mg vial.', 'Next-generation glucagon / GLP-1 receptor dual agonist engineered for advanced hepatic and whole-body metabolic profiling.', 60, 'SRV-12MG-V', 'Survodutide', 100, false, false, 'published', 4.9, v_cat_weight, v_now, v_now),
    ('Survodutide - 20mg vials', 'survodutide-20mg-vials', 'Survodutide dual GLP-1/Glucagon receptor agonist 20mg vial.', 'Next-generation glucagon / GLP-1 receptor dual agonist engineered for advanced hepatic and whole-body metabolic profiling.', 80, 'SRV-20MG-V', 'Survodutide', 100, true, true, 'published', 5.0, v_cat_weight, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 66. TB 500 ( Thymosin Beta-4 Acetate)
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('TB 500 ( Thymosin Beta-4 Acetate) - 2mg * 10vials', 'tb-500-thymosin-beta-4-2mg-10vials', 'TB-500 (Thymosin Beta-4 Acetate) 2mg * 10 vials.', 'Synthetic derivative of actin-sequestering protein Thymosin Beta-4, studied for cell migration, angiogenesis, and tissue regeneration.', 25, 'TB5-2MG-10V', 'TB 500 ( Thymosin Beta-4 Acetate)', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('TB 500 ( Thymosin Beta-4 Acetate) - 5mg * 10vials', 'tb-500-thymosin-beta-4-5mg-10vials', 'TB-500 (Thymosin Beta-4 Acetate) 5mg * 10 vials.', 'Synthetic derivative of actin-sequestering protein Thymosin Beta-4, studied for cell migration, angiogenesis, and tissue regeneration.', 35, 'TB5-5MG-10V', 'TB 500 ( Thymosin Beta-4 Acetate)', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('TB 500 ( Thymosin Beta-4 Acetate) - 10mg * 10vials', 'tb-500-thymosin-beta-4-10mg-10vials', 'TB-500 (Thymosin Beta-4 Acetate) 10mg * 10 vials.', 'Synthetic derivative of actin-sequestering protein Thymosin Beta-4, studied for cell migration, angiogenesis, and tissue regeneration.', 55, 'TB5-10MG-10V', 'TB 500 ( Thymosin Beta-4 Acetate)', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 67. TB10mg+BPC5mg+GHK35mg
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('TB10mg+BPC5mg+GHK35mg - 50mg * 10vials', 'tb-bpc-ghk-triple-blend-50mg-10vials', 'Triple Synergy Blend: TB-500 (10mg) + BPC-157 (5mg) + GHK-Cu (35mg) * 10 vials.', 'High-synergy multi-peptide blend combining actin remodeling, gastric healing pentadecapeptide, and copper tripeptide matrix modulation.', 25, 'TRP-50MG-10V', 'TB10mg+BPC5mg+GHK35mg', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('TB10mg+BPC5mg+GHK35mg - 70mg * 10vials', 'tb-bpc-ghk-triple-blend-70mg-10vials', 'Triple Synergy Blend: TB-500 + BPC-157 + GHK-Cu 70mg total * 10 vials.', 'High-synergy multi-peptide blend combining actin remodeling, gastric healing pentadecapeptide, and copper tripeptide matrix modulation.', 35, 'TRP-70MG-10V', 'TB10mg+BPC5mg+GHK35mg', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 68. Tesamorelin
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Tesamorelin - 2mg*10vials', 'tesamorelin-2mg-10vials', 'Tesamorelin (GHRH analogue with trans-3-hexenoic acid) 2mg * 10 vials.', 'Stabilized GHRH analogue researched for visceral adipose tissue reduction and IGF-1 stimulation.', 20, 'TES-2MG-10V', 'Tesamorelin', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Tesamorelin - 5mg*10vials', 'tesamorelin-5mg-10vials', 'Tesamorelin (GHRH analogue with trans-3-hexenoic acid) 5mg * 10 vials.', 'Stabilized GHRH analogue researched for visceral adipose tissue reduction and IGF-1 stimulation.', 30, 'TES-5MG-10V', 'Tesamorelin', 100, false, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Tesamorelin - 10mg*10vials', 'tesamorelin-10mg-10vials', 'Tesamorelin (GHRH analogue with trans-3-hexenoic acid) 10mg * 10 vials.', 'Stabilized GHRH analogue researched for visceral adipose tissue reduction and IGF-1 stimulation.', 45, 'TES-10MG-10V', 'Tesamorelin', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Tesamorelin - 20mg*10vials', 'tesamorelin-20mg-10vials', 'Tesamorelin (GHRH analogue with trans-3-hexenoic acid) 20mg * 10 vials.', 'Stabilized GHRH analogue researched for visceral adipose tissue reduction and IGF-1 stimulation.', 55, 'TES-20MG-10V', 'Tesamorelin', 100, false, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 69. Thymalin
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Thymalin - 10mg', 'thymalin-10mg', 'Thymalin synthetic thymic peptide 10mg.', 'Polypeptide extract / synthetic complex of thymic peptides studied for T-cell differentiation and immunomodulation.', 25, 'THY-10MG', 'Thymalin', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Thymalin - 20mg', 'thymalin-20mg', 'Thymalin synthetic thymic peptide 20mg.', 'Polypeptide extract / synthetic complex of thymic peptides studied for T-cell differentiation and immunomodulation.', 35, 'THY-20MG', 'Thymalin', 100, true, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Thymalin - 25mg', 'thymalin-25mg', 'Thymalin synthetic thymic peptide 25mg.', 'Polypeptide extract / synthetic complex of thymic peptides studied for T-cell differentiation and immunomodulation.', 50, 'THY-25MG', 'Thymalin', 100, false, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 70. Thymosin
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Thymosin - 1mg vial', 'thymosin-1mg-vial', 'Thymosin alpha-1 peptide 1mg vial.', '28-amino acid immune adjuvant peptide modulating toll-like receptor and helper T-cell response.', 25, 'THA-1MG-V', 'Thymosin', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Thymosin - 5mg vial', 'thymosin-5mg-vial', 'Thymosin alpha-1 peptide 5mg vial.', '28-amino acid immune adjuvant peptide modulating toll-like receptor and helper T-cell response.', 40, 'THA-5MG-V', 'Thymosin', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Thymosin - 10mg vial', 'thymosin-10mg-vial', 'Thymosin alpha-1 peptide 10mg vial.', '28-amino acid immune adjuvant peptide modulating toll-like receptor and helper T-cell response.', 65, 'THA-10MG-V', 'Thymosin', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 71. Triptorelin Acetate/GnRH Triptorelin
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Triptorelin Acetate/GnRH Triptorelin - 5mg', 'triptorelin-acetate-5mg', 'Triptorelin Acetate (GnRH agonist) 5mg.', 'Synthetic decapeptide GnRH agonist investigated in gonadotropin suppression and steroidogenesis pathways.', 20, 'TRP-5MG', 'Triptorelin Acetate/GnRH Triptorelin', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Triptorelin Acetate/GnRH Triptorelin - 25mg', 'triptorelin-acetate-25mg', 'Triptorelin Acetate (GnRH agonist) 25mg.', 'Synthetic decapeptide GnRH agonist investigated in gonadotropin suppression and steroidogenesis pathways.', 35, 'TRP-25MG', 'Triptorelin Acetate/GnRH Triptorelin', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Triptorelin Acetate/GnRH Triptorelin - 100mg', 'triptorelin-acetate-100mg', 'Triptorelin Acetate (GnRH agonist) 100mg.', 'Synthetic decapeptide GnRH agonist investigated in gonadotropin suppression and steroidogenesis pathways.', 60, 'TRP-100MG', 'Triptorelin Acetate/GnRH Triptorelin', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 72. Vasoactive Intestinal
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Vasoactive Intestinal - 0.5mg vials', 'vasoactive-intestinal-0-5mg-vials', 'VIP (Vasoactive Intestinal Peptide) 0.5mg vial.', '28-amino acid regulatory neuropeptide acting on VPAC1 and VPAC2 receptors for smooth muscle relaxation and immune regulation research.', 15, 'VIP-0-5MG-V', 'Vasoactive Intestinal', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Vasoactive Intestinal - 1mg vials', 'vasoactive-intestinal-1mg-vials', 'VIP (Vasoactive Intestinal Peptide) 1mg vial.', '28-amino acid regulatory neuropeptide acting on VPAC1 and VPAC2 receptors for smooth muscle relaxation and immune regulation research.', 20, 'VIP-1MG-V', 'Vasoactive Intestinal', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Vasoactive Intestinal - 5mg vials', 'vasoactive-intestinal-5mg-vials', 'VIP (Vasoactive Intestinal Peptide) 5mg vial.', '28-amino acid regulatory neuropeptide acting on VPAC1 and VPAC2 receptors for smooth muscle relaxation and immune regulation research.', 30, 'VIP-5MG-V', 'Vasoactive Intestinal', 100, true, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Vasoactive Intestinal - 6mg vials', 'vasoactive-intestinal-6mg-vials', 'VIP (Vasoactive Intestinal Peptide) 6mg vial.', '28-amino acid regulatory neuropeptide acting on VPAC1 and VPAC2 receptors for smooth muscle relaxation and immune regulation research.', 45, 'VIP-6MG-V', 'Vasoactive Intestinal', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Vasoactive Intestinal - 10mg vials', 'vasoactive-intestinal-10mg-vials', 'VIP (Vasoactive Intestinal Peptide) 10mg vial.', '28-amino acid regulatory neuropeptide acting on VPAC1 and VPAC2 receptors for smooth muscle relaxation and immune regulation research.', 65, 'VIP-10MG-V', 'Vasoactive Intestinal', 100, false, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 73. Argireline
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Argireline - 5mg', 'argireline-5mg', 'Argireline (Acetyl Hexapeptide-8) 5mg research preparation.', 'Synthetic peptide mimicking SNAP-25 N-terminus investigated for inhibition of vesicle docking and neurotransmitter release.', 20, 'ARG-5MG', 'Argireline', 100, false, false, 'published', 4.8, v_cat_peptides, v_now, v_now),
    ('Argireline - 10mg', 'argireline-10mg', 'Argireline (Acetyl Hexapeptide-8) 10mg research preparation.', 'Synthetic peptide mimicking SNAP-25 N-terminus investigated for inhibition of vesicle docking and neurotransmitter release.', 30, 'ARG-10MG', 'Argireline', 100, true, false, 'published', 4.9, v_cat_peptides, v_now, v_now),
    ('Argireline - 50mg', 'argireline-50mg', 'Argireline (Acetyl Hexapeptide-8) 50mg research preparation.', 'Synthetic peptide mimicking SNAP-25 N-terminus investigated for inhibition of vesicle docking and neurotransmitter release.', 40, 'ARG-50MG', 'Argireline', 100, false, true, 'published', 5.0, v_cat_peptides, v_now, v_now),
    ('Argireline - 100mg', 'argireline-100mg', 'Argireline (Acetyl Hexapeptide-8) 100mg research preparation.', 'Synthetic peptide mimicking SNAP-25 N-terminus investigated for inhibition of vesicle docking and neurotransmitter release.', 55, 'ARG-100MG', 'Argireline', 100, false, false, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

  -- 74. Botulinum Toxin
  INSERT INTO products (name, slug, short_description, description, price, sku, brand, stock, featured, best_seller, status, rating, category_id, created_at, updated_at)
  VALUES
    ('Botulinum Toxin - 100iu/10vials', 'botulinum-toxin-100iu-10vials', 'Research Botulinum Toxin Type A complex 100 IU/vial * 10 vials.', 'Neurotoxic protein complex studied for presynaptic cholinergic blockade and neuromuscular junction biology.', 180, 'BOT-100IU-10V', 'Botulinum Toxin', 100, true, true, 'published', 5.0, v_cat_peptides, v_now, v_now)
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, sku = EXCLUDED.sku, category_id = EXCLUDED.category_id, updated_at = v_now;

END $$;
