import type { Product } from "@/types";

export interface ParsedVariantOption {
  product: Product;
  strength: string;
  format: string;
  displayLabel: string;
}

export interface MultiAttributeGroup {
  hasMultipleFormats: boolean;
  formats: string[];
  optionsByFormat: Record<string, ParsedVariantOption[]>;
  allOptions: ParsedVariantOption[];
}

/**
 * Normalizes and extracts the base product name without variant modifiers.
 */
export function extractBaseName(name: string): string {
  const parts = name.split(" - ");
  let base = parts[0]?.trim() || name;
  // Clean prefixes like "Order ", "Buy ", "Online "
  base = base.replace(/^(Order|Buy)\s+/i, "").replace(/\s+Online$/i, "").trim();
  return base;
}

/**
 * Extracts structured attributes (strength, package format, clean display label) from product name.
 */
export function parseVariantOption(product: Product): ParsedVariantOption {
  const rawName = product.name;
  const parts = rawName.split(" - ");
  const variantPart = parts.length > 1 ? parts.slice(1).join(" - ").trim() : rawName;

  // 1. Check for WEGOVY / OZEMPIC / SAXENDA / TRULICITY pen pattern
  // e.g. "A pack with 4 pens of 0.25mg." or "4 pens of 0.75 mg/0.5 mL." or "4 pens of 0.6mg"
  const penMatch = variantPart.match(/(?:A pack with\s+)?(\d+\s*pens?)\s+(?:of\s+)?([0-9.,]+\s*(?:mg|mg\/[0-9.,]+\s*ml|mcg))/i);
  if (penMatch) {
    const penCount = penMatch[1].trim();
    const dosage = penMatch[2].trim();
    return {
      product,
      strength: `${dosage} (${penCount})`,
      format: penCount,
      displayLabel: `${dosage} (${penCount})`,
    };
  }

  // 2. Check for tablets/capsules: e.g. "30 tablets of 3MG", "25mg * 100pcs", "500mcg * 60 capsules"
  const tabletMatch = variantPart.match(/(\d+\s*(?:tablets|tabs|capsules|caps|pcs|oral tablets))\s+of\s+([0-9.,]+\s*(?:mg|mcg|g))/i);
  if (tabletMatch) {
    const count = tabletMatch[1].trim();
    const dosage = tabletMatch[2].trim();
    return {
      product,
      strength: `${dosage} (${count})`,
      format: count,
      displayLabel: `${dosage} (${count})`,
    };
  }

  const tabletMatch2 = variantPart.match(/([0-9.,]+\s*(?:mg|mcg|g))\s*[*xX]\s*(\d+\s*(?:tablets|tabs|capsules|caps|pcs|oral tablets|doses))/i);
  if (tabletMatch2) {
    const dosage = tabletMatch2[1].trim();
    const count = tabletMatch2[2].trim();
    return {
      product,
      strength: `${dosage} (${count})`,
      format: count,
      displayLabel: `${dosage} (${count})`,
    };
  }

  // 3. Check for 10-vials pack: e.g. "4mg x 10 Vials", "10mg * 10 Vials", "5mg * 10 vials"
  const tenVialsMatch = variantPart.match(/([0-9.,]+\s*(?:mg|mcg|g|iu))\s*[*xX]\s*(10\s*vials?)/i);
  if (tenVialsMatch) {
    const dosage = tenVialsMatch[1].trim();
    return {
      product,
      strength: `${dosage} (10 Vials)`,
      format: "10 Vials",
      displayLabel: `${dosage} (10 Vials)`,
    };
  }

  // 4. Check for single vial or unit: e.g. "5mg vials", "10mg vial", "5000IU vial"
  const singleVialMatch = variantPart.match(/([0-9.,]+\s*(?:mg|mcg|g|iu|ml))\s*vials?/i);
  if (singleVialMatch) {
    const dosage = singleVialMatch[1].trim();
    return {
      product,
      strength: `${dosage}`,
      format: "1 Vial",
      displayLabel: `${dosage} (1 Vial)`,
    };
  }

  // 5. Check for Oil concentrations: e.g. "250mg/ml - 10ml" or "300mg/ml - 10ml"
  const oilMatch = variantPart.match(/([0-9.,]+\s*mg\/ml)\s*(?:-\s*([0-9.,]+\s*ml))?/i);
  if (oilMatch) {
    const conc = oilMatch[1].trim();
    const vol = oilMatch[2] ? ` (${oilMatch[2].trim()})` : "";
    return {
      product,
      strength: `${conc}${vol}`,
      format: "Vial (10ml)",
      displayLabel: `${conc}${vol}`,
    };
  }

  // 6. Standalone dosage: e.g. "10mg", "2.5mg", "50mg", "10g powder", "20g"
  const clean = variantPart.replace(/\.$/, "").trim();
  return {
    product,
    strength: clean,
    format: "Standard",
    displayLabel: clean,
  };
}

/**
 * Organizes sibling products into multi-attribute grouping (by format/delivery method and strength).
 */
export function buildMultiAttributeGroup(variants: Product[]): MultiAttributeGroup {
  const allOptions = variants.map(parseVariantOption);
  const optionsByFormat: Record<string, ParsedVariantOption[]> = {};

  for (const opt of allOptions) {
    const fmt = opt.format || "Standard";
    if (!optionsByFormat[fmt]) {
      optionsByFormat[fmt] = [];
    }
    optionsByFormat[fmt].push(opt);
  }

  const formats = Object.keys(optionsByFormat);
  const hasMultipleFormats = formats.length > 1;

  return {
    hasMultipleFormats,
    formats,
    optionsByFormat,
    allOptions,
  };
}
