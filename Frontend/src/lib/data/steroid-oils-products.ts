import { SITE_CURRENCY } from "@/constants/site";
import type { Product, ProductImage } from "@/types";

function makeOilVariant(opts: {
  slug: string;
  sku: string;
  name: string;
  shortDescription: string;
  description: string;
  longDescription?: string;
  categorySlug?: string;
  categoryName?: string;
  price: number;
  featured?: boolean;
  bestSeller?: boolean;
  images: ProductImage[];
}): Product {
  return {
    id: opts.slug,
    slug: opts.slug,
    sku: opts.sku,
    name: opts.name,
    shortDescription: opts.shortDescription,
    description: opts.description,
    longDescription: opts.longDescription,
    categorySlug: opts.categorySlug || "steroid-oils",
    categoryName: opts.categoryName || "Steroid Oils",
    price: opts.price,
    currency: SITE_CURRENCY,
    purity: "≥99.0% (HPLC Certified)",
    concentration: "Sterile Injectable Oil in MCT Base",
    images: opts.images,
    badges: opts.bestSeller ? ["best-seller"] : opts.featured ? ["featured"] : [],
    stock: "in-stock",
    stockCount: 50,
    rating: 4.95,
    reviewCount: 18,
    reviews: [
      {
        id: `rev-${opts.slug}-1`,
        author: "Markus S. (Biomed Research)",
        rating: 5,
        title: "Glasklares MCT-Öl & hervorragende Verträglichkeit",
        content: "Perfekte Sterilität und Viskosität. Null Injektionskater (PIP), extrem stabile Depotwirkung.",
        date: "2026-08-22",
        verified: true,
      },
    ],
    specifications: [
      { name: "Purity / Reinheit", value: "≥99.0% (HPLC & Mass Spectrometry Verified)" },
      { name: "Carrier Oil", value: "Pharmaceutical Grade MCT Oil (Medium Chain Triglycerides)" },
      { name: "Sterilization", value: "0.22 µm Sterile Filtered, Pyrogen-Free" },
      { name: "Storage / Lagerung", value: "Store at 15°C – 25°C, do NOT freeze, protect from light" },
    ],
    certificateOfAnalysisUrl: undefined,
    featured: opts.featured || false,
    bestSeller: opts.bestSeller || false,
    createdAt: "2026-08-01T00:00:00.000Z",
  };
}

export const OIL_TESTOSTERONE_ENANTHATE_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/testosterone-enanthate-oil/testosterone-enanthate-oil-1.webp",
    alt: "Testosterone Enanthate Injectable Research Oil View 1",
    title: "Testosterone Enanthate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/testosterone-enanthate-oil/testosterone-enanthate-oil-2.webp",
    alt: "Testosterone Enanthate Injectable Research Oil View 2",
    title: "Testosterone Enanthate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/testosterone-enanthate-oil/testosterone-enanthate-oil-3.webp",
    alt: "Testosterone Enanthate Injectable Research Oil View 3",
    title: "Testosterone Enanthate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/testosterone-enanthate-oil/testosterone-enanthate-oil-4.webp",
    alt: "Testosterone Enanthate Injectable Research Oil View 4",
    title: "Testosterone Enanthate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/testosterone-enanthate-oil/testosterone-enanthate-oil-5.webp",
    alt: "Testosterone Enanthate Injectable Research Oil View 5",
    title: "Testosterone Enanthate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/testosterone-enanthate-oil/testosterone-enanthate-oil-8.webp",
    alt: "Testosterone Enanthate Injectable Research Oil View 8",
    title: "Testosterone Enanthate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/testosterone-enanthate-oil/testosterone-enanthate-oil-9.webp",
    alt: "Testosterone Enanthate Injectable Research Oil View 9",
    title: "Testosterone Enanthate 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_TESTOSTERONE_CYPIONATE_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/testosterone-cypionate-oil/testosterone-cypionate-oil-1.webp",
    alt: "Testosterone Cypionate Injectable Research Oil View 1",
    title: "Testosterone Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/testosterone-cypionate-oil/testosterone-cypionate-oil-2.webp",
    alt: "Testosterone Cypionate Injectable Research Oil View 2",
    title: "Testosterone Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/testosterone-cypionate-oil/testosterone-cypionate-oil-3.webp",
    alt: "Testosterone Cypionate Injectable Research Oil View 3",
    title: "Testosterone Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/testosterone-cypionate-oil/testosterone-cypionate-oil-4.webp",
    alt: "Testosterone Cypionate Injectable Research Oil View 4",
    title: "Testosterone Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/testosterone-cypionate-oil/testosterone-cypionate-oil-5.webp",
    alt: "Testosterone Cypionate Injectable Research Oil View 5",
    title: "Testosterone Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/testosterone-cypionate-oil/testosterone-cypionate-oil-6.webp",
    alt: "Testosterone Cypionate Injectable Research Oil View 6",
    title: "Testosterone Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/testosterone-cypionate-oil/testosterone-cypionate-oil-7.webp",
    alt: "Testosterone Cypionate Injectable Research Oil View 7",
    title: "Testosterone Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_TESTOSTERONE_PROPIONATE_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/testosterone-propionate-oil/testosterone-propionate-oil-1.webp",
    alt: "Testosterone Propionate Injectable Research Oil View 1",
    title: "Testosterone Propionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/testosterone-propionate-oil/testosterone-propionate-oil-3.webp",
    alt: "Testosterone Propionate Injectable Research Oil View 3",
    title: "Testosterone Propionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/testosterone-propionate-oil/testosterone-propionate-oil-6.webp",
    alt: "Testosterone Propionate Injectable Research Oil View 6",
    title: "Testosterone Propionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/testosterone-propionate-oil/testosterone-propionate-oil-8.webp",
    alt: "Testosterone Propionate Injectable Research Oil View 8",
    title: "Testosterone Propionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/testosterone-propionate-oil/testosterone-propionate-oil-9.webp",
    alt: "Testosterone Propionate Injectable Research Oil View 9",
    title: "Testosterone Propionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_TRENBOLONE_ACETATE_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/trenbolone-acetate-oil/trenbolone-acetate-oil-1.webp",
    alt: "Trenbolone Acetate Injectable Research Oil View 1",
    title: "Trenbolone Acetate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/trenbolone-acetate-oil/trenbolone-acetate-oil-2.webp",
    alt: "Trenbolone Acetate Injectable Research Oil View 2",
    title: "Trenbolone Acetate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/trenbolone-acetate-oil/trenbolone-acetate-oil-3.webp",
    alt: "Trenbolone Acetate Injectable Research Oil View 3",
    title: "Trenbolone Acetate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/trenbolone-acetate-oil/trenbolone-acetate-oil-4.webp",
    alt: "Trenbolone Acetate Injectable Research Oil View 4",
    title: "Trenbolone Acetate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/trenbolone-acetate-oil/trenbolone-acetate-oil-5.webp",
    alt: "Trenbolone Acetate Injectable Research Oil View 5",
    title: "Trenbolone Acetate 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_TRENBOLONE_CARBONATE_TRX_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/trenbolone-carbonate-trx-oil/trenbolone-carbonate-trx-oil-1.webp",
    alt: "Trenbolone Carbonate TrX Injectable Research Oil View 1",
    title: "Trenbolone Carbonate TrX 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/trenbolone-carbonate-trx-oil/trenbolone-carbonate-trx-oil-2.webp",
    alt: "Trenbolone Carbonate TrX Injectable Research Oil View 2",
    title: "Trenbolone Carbonate TrX 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/trenbolone-carbonate-trx-oil/trenbolone-carbonate-trx-oil-3.webp",
    alt: "Trenbolone Carbonate TrX Injectable Research Oil View 3",
    title: "Trenbolone Carbonate TrX 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/trenbolone-carbonate-trx-oil/trenbolone-carbonate-trx-oil-4.webp",
    alt: "Trenbolone Carbonate TrX Injectable Research Oil View 4",
    title: "Trenbolone Carbonate TrX 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/trenbolone-carbonate-trx-oil/trenbolone-carbonate-trx-oil-5.webp",
    alt: "Trenbolone Carbonate TrX Injectable Research Oil View 5",
    title: "Trenbolone Carbonate TrX 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_NANDROLONE_DECANOATE_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/nandrolone-decanoate-oil/nandrolone-decanoate-oil-1.webp",
    alt: "Nandrolone Decanoate Injectable Research Oil View 1",
    title: "Nandrolone Decanoate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/nandrolone-decanoate-oil/nandrolone-decanoate-oil-2.webp",
    alt: "Nandrolone Decanoate Injectable Research Oil View 2",
    title: "Nandrolone Decanoate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/nandrolone-decanoate-oil/nandrolone-decanoate-oil-3.webp",
    alt: "Nandrolone Decanoate Injectable Research Oil View 3",
    title: "Nandrolone Decanoate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/nandrolone-decanoate-oil/nandrolone-decanoate-oil-4.webp",
    alt: "Nandrolone Decanoate Injectable Research Oil View 4",
    title: "Nandrolone Decanoate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/nandrolone-decanoate-oil/nandrolone-decanoate-oil-5.webp",
    alt: "Nandrolone Decanoate Injectable Research Oil View 5",
    title: "Nandrolone Decanoate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/nandrolone-decanoate-oil/nandrolone-decanoate-oil-6.webp",
    alt: "Nandrolone Decanoate Injectable Research Oil View 6",
    title: "Nandrolone Decanoate 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_NANDROLONE_PHENYLPROPIONATE_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/nandrolone-phenylpropionate-oil/nandrolone-phenylpropionate-oil-1.webp",
    alt: "Nandrolone Phenylpropionate (NPP) Injectable Research Oil View 1",
    title: "Nandrolone Phenylpropionate (NPP) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/nandrolone-phenylpropionate-oil/nandrolone-phenylpropionate-oil-2.webp",
    alt: "Nandrolone Phenylpropionate (NPP) Injectable Research Oil View 2",
    title: "Nandrolone Phenylpropionate (NPP) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/nandrolone-phenylpropionate-oil/nandrolone-phenylpropionate-oil-3.webp",
    alt: "Nandrolone Phenylpropionate (NPP) Injectable Research Oil View 3",
    title: "Nandrolone Phenylpropionate (NPP) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/nandrolone-phenylpropionate-oil/nandrolone-phenylpropionate-oil-4.webp",
    alt: "Nandrolone Phenylpropionate (NPP) Injectable Research Oil View 4",
    title: "Nandrolone Phenylpropionate (NPP) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/nandrolone-phenylpropionate-oil/nandrolone-phenylpropionate-oil-5.webp",
    alt: "Nandrolone Phenylpropionate (NPP) Injectable Research Oil View 5",
    title: "Nandrolone Phenylpropionate (NPP) 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_DROSTANOLONE_PROPIONATE_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/drostanolone-propionate-oil/drostanolone-propionate-oil-1.webp",
    alt: "Drostanolone Propionate (Masteron P) Injectable Research Oil View 1",
    title: "Drostanolone Propionate (Masteron P) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/drostanolone-propionate-oil/drostanolone-propionate-oil-2.webp",
    alt: "Drostanolone Propionate (Masteron P) Injectable Research Oil View 2",
    title: "Drostanolone Propionate (Masteron P) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/drostanolone-propionate-oil/drostanolone-propionate-oil-3.webp",
    alt: "Drostanolone Propionate (Masteron P) Injectable Research Oil View 3",
    title: "Drostanolone Propionate (Masteron P) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/drostanolone-propionate-oil/drostanolone-propionate-oil-4.webp",
    alt: "Drostanolone Propionate (Masteron P) Injectable Research Oil View 4",
    title: "Drostanolone Propionate (Masteron P) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/drostanolone-propionate-oil/drostanolone-propionate-oil-5.webp",
    alt: "Drostanolone Propionate (Masteron P) Injectable Research Oil View 5",
    title: "Drostanolone Propionate (Masteron P) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/drostanolone-propionate-oil/drostanolone-propionate-oil-6.webp",
    alt: "Drostanolone Propionate (Masteron P) Injectable Research Oil View 6",
    title: "Drostanolone Propionate (Masteron P) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/drostanolone-propionate-oil/drostanolone-propionate-oil-7.webp",
    alt: "Drostanolone Propionate (Masteron P) Injectable Research Oil View 7",
    title: "Drostanolone Propionate (Masteron P) 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_DROSTANOLONE_ENANTHATE_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/drostanolone-enanthate-oil/drostanolone-enanthate-oil-1.webp",
    alt: "Drostanolone Enanthate (Masteron E) Injectable Research Oil View 1",
    title: "Drostanolone Enanthate (Masteron E) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/drostanolone-enanthate-oil/drostanolone-enanthate-oil-2.webp",
    alt: "Drostanolone Enanthate (Masteron E) Injectable Research Oil View 2",
    title: "Drostanolone Enanthate (Masteron E) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/drostanolone-enanthate-oil/drostanolone-enanthate-oil-3.webp",
    alt: "Drostanolone Enanthate (Masteron E) Injectable Research Oil View 3",
    title: "Drostanolone Enanthate (Masteron E) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/drostanolone-enanthate-oil/drostanolone-enanthate-oil-4.webp",
    alt: "Drostanolone Enanthate (Masteron E) Injectable Research Oil View 4",
    title: "Drostanolone Enanthate (Masteron E) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/drostanolone-enanthate-oil/drostanolone-enanthate-oil-5.webp",
    alt: "Drostanolone Enanthate (Masteron E) Injectable Research Oil View 5",
    title: "Drostanolone Enanthate (Masteron E) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/drostanolone-enanthate-oil/drostanolone-enanthate-oil-6.webp",
    alt: "Drostanolone Enanthate (Masteron E) Injectable Research Oil View 6",
    title: "Drostanolone Enanthate (Masteron E) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/drostanolone-enanthate-oil/drostanolone-enanthate-oil-7.webp",
    alt: "Drostanolone Enanthate (Masteron E) Injectable Research Oil View 7",
    title: "Drostanolone Enanthate (Masteron E) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/drostanolone-enanthate-oil/drostanolone-enanthate-oil-8.webp",
    alt: "Drostanolone Enanthate (Masteron E) Injectable Research Oil View 8",
    title: "Drostanolone Enanthate (Masteron E) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/drostanolone-enanthate-oil/drostanolone-enanthate-oil-9.webp",
    alt: "Drostanolone Enanthate (Masteron E) Injectable Research Oil View 9",
    title: "Drostanolone Enanthate (Masteron E) 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_METHENOLONE_ENANTHATE_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/methenolone-enanthate-oil/methenolone-enanthate-oil-1.webp",
    alt: "Methenolone Enanthate (Primobolan Depot) Injectable Research Oil View 1",
    title: "Methenolone Enanthate (Primobolan Depot) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/methenolone-enanthate-oil/methenolone-enanthate-oil-3.webp",
    alt: "Methenolone Enanthate (Primobolan Depot) Injectable Research Oil View 3",
    title: "Methenolone Enanthate (Primobolan Depot) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/methenolone-enanthate-oil/methenolone-enanthate-oil-4.webp",
    alt: "Methenolone Enanthate (Primobolan Depot) Injectable Research Oil View 4",
    title: "Methenolone Enanthate (Primobolan Depot) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/methenolone-enanthate-oil/methenolone-enanthate-oil-5.webp",
    alt: "Methenolone Enanthate (Primobolan Depot) Injectable Research Oil View 5",
    title: "Methenolone Enanthate (Primobolan Depot) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/methenolone-enanthate-oil/methenolone-enanthate-oil-6.webp",
    alt: "Methenolone Enanthate (Primobolan Depot) Injectable Research Oil View 6",
    title: "Methenolone Enanthate (Primobolan Depot) 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_BOLDENONE_UNDECYLENATE_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/boldenone-undecylenate-oil/boldenone-undecylenate-oil-1.webp",
    alt: "Boldenone Undecylenate (Equipoise BU) Injectable Research Oil View 1",
    title: "Boldenone Undecylenate (Equipoise BU) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/boldenone-undecylenate-oil/boldenone-undecylenate-oil-2.webp",
    alt: "Boldenone Undecylenate (Equipoise BU) Injectable Research Oil View 2",
    title: "Boldenone Undecylenate (Equipoise BU) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/boldenone-undecylenate-oil/boldenone-undecylenate-oil-3.webp",
    alt: "Boldenone Undecylenate (Equipoise BU) Injectable Research Oil View 3",
    title: "Boldenone Undecylenate (Equipoise BU) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/boldenone-undecylenate-oil/boldenone-undecylenate-oil-4.webp",
    alt: "Boldenone Undecylenate (Equipoise BU) Injectable Research Oil View 4",
    title: "Boldenone Undecylenate (Equipoise BU) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/boldenone-undecylenate-oil/boldenone-undecylenate-oil-5.webp",
    alt: "Boldenone Undecylenate (Equipoise BU) Injectable Research Oil View 5",
    title: "Boldenone Undecylenate (Equipoise BU) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/boldenone-undecylenate-oil/boldenone-undecylenate-oil-6.webp",
    alt: "Boldenone Undecylenate (Equipoise BU) Injectable Research Oil View 6",
    title: "Boldenone Undecylenate (Equipoise BU) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/boldenone-undecylenate-oil/boldenone-undecylenate-oil-7.webp",
    alt: "Boldenone Undecylenate (Equipoise BU) Injectable Research Oil View 7",
    title: "Boldenone Undecylenate (Equipoise BU) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/boldenone-undecylenate-oil/boldenone-undecylenate-oil-8.webp",
    alt: "Boldenone Undecylenate (Equipoise BU) Injectable Research Oil View 8",
    title: "Boldenone Undecylenate (Equipoise BU) 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_BOLDENONE_CYPIONATE_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/boldenone-cypionate-oil/boldenone-cypionate-oil-1.webp",
    alt: "Boldenone Cypionate Injectable Research Oil View 1",
    title: "Boldenone Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/boldenone-cypionate-oil/boldenone-cypionate-oil-2.webp",
    alt: "Boldenone Cypionate Injectable Research Oil View 2",
    title: "Boldenone Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/boldenone-cypionate-oil/boldenone-cypionate-oil-3.webp",
    alt: "Boldenone Cypionate Injectable Research Oil View 3",
    title: "Boldenone Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/boldenone-cypionate-oil/boldenone-cypionate-oil-4.webp",
    alt: "Boldenone Cypionate Injectable Research Oil View 4",
    title: "Boldenone Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/boldenone-cypionate-oil/boldenone-cypionate-oil-5.webp",
    alt: "Boldenone Cypionate Injectable Research Oil View 5",
    title: "Boldenone Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/boldenone-cypionate-oil/boldenone-cypionate-oil-6.webp",
    alt: "Boldenone Cypionate Injectable Research Oil View 6",
    title: "Boldenone Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/boldenone-cypionate-oil/boldenone-cypionate-oil-7.webp",
    alt: "Boldenone Cypionate Injectable Research Oil View 7",
    title: "Boldenone Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/boldenone-cypionate-oil/boldenone-cypionate-oil-8.webp",
    alt: "Boldenone Cypionate Injectable Research Oil View 8",
    title: "Boldenone Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/boldenone-cypionate-oil/boldenone-cypionate-oil-9.webp",
    alt: "Boldenone Cypionate Injectable Research Oil View 9",
    title: "Boldenone Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_STANOZOLOL_OIL_BASE_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/stanozolol-oil-base/stanozolol-oil-base-1.webp",
    alt: "Stanozolol Oil Base (Winstrol Oil) Injectable Research Oil View 1",
    title: "Stanozolol Oil Base (Winstrol Oil) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/stanozolol-oil-base/stanozolol-oil-base-2.webp",
    alt: "Stanozolol Oil Base (Winstrol Oil) Injectable Research Oil View 2",
    title: "Stanozolol Oil Base (Winstrol Oil) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/stanozolol-oil-base/stanozolol-oil-base-3.webp",
    alt: "Stanozolol Oil Base (Winstrol Oil) Injectable Research Oil View 3",
    title: "Stanozolol Oil Base (Winstrol Oil) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/stanozolol-oil-base/stanozolol-oil-base-4.webp",
    alt: "Stanozolol Oil Base (Winstrol Oil) Injectable Research Oil View 4",
    title: "Stanozolol Oil Base (Winstrol Oil) 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_STANOZOLOL_SUSPENSION_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/stanozolol-suspension-oil/stanozolol-suspension-oil-1.webp",
    alt: "Stanozolol Suspension (Winstrol) Injectable Research Oil View 1",
    title: "Stanozolol Suspension (Winstrol) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/stanozolol-suspension-oil/stanozolol-suspension-oil-2.webp",
    alt: "Stanozolol Suspension (Winstrol) Injectable Research Oil View 2",
    title: "Stanozolol Suspension (Winstrol) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/stanozolol-suspension-oil/stanozolol-suspension-oil-3.webp",
    alt: "Stanozolol Suspension (Winstrol) Injectable Research Oil View 3",
    title: "Stanozolol Suspension (Winstrol) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/stanozolol-suspension-oil/stanozolol-suspension-oil-4.webp",
    alt: "Stanozolol Suspension (Winstrol) Injectable Research Oil View 4",
    title: "Stanozolol Suspension (Winstrol) 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_RIPEX_225_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/ripex-225-oil/ripex-225-oil-1.webp",
    alt: "Ripex-225 Blend Injectable Research Oil View 1",
    title: "Ripex-225 Blend 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_METHANDROSTENOLONE_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/methandrostenolone-oil/methandrostenolone-oil-1.webp",
    alt: "Methandrostenolone Injectable (Dianabol Oil) Injectable Research Oil View 1",
    title: "Methandrostenolone Injectable (Dianabol Oil) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/methandrostenolone-oil/methandrostenolone-oil-2.webp",
    alt: "Methandrostenolone Injectable (Dianabol Oil) Injectable Research Oil View 2",
    title: "Methandrostenolone Injectable (Dianabol Oil) 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/methandrostenolone-oil/methandrostenolone-oil-3.webp",
    alt: "Methandrostenolone Injectable (Dianabol Oil) Injectable Research Oil View 3",
    title: "Methandrostenolone Injectable (Dianabol Oil) 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_METRIBOLONE_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/metribolone-oil/metribolone-oil-1.webp",
    alt: "Metribolone (Methyltrienolone) Injectable Research Oil View 1",
    title: "Metribolone (Methyltrienolone) 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_L_CARNITINE_INJECTABLE_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/l-carnitine-injectable-oil/l-carnitine-injectable-oil-1.webp",
    alt: "L-Carnitine Injectable Injectable Research Oil View 1",
    title: "L-Carnitine Injectable 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/l-carnitine-injectable-oil/l-carnitine-injectable-oil-2.webp",
    alt: "L-Carnitine Injectable Injectable Research Oil View 2",
    title: "L-Carnitine Injectable 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_L_CARNITINE_COMPLEX_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/l-carnitine-complex-oil/l-carnitine-complex-oil-1.webp",
    alt: "L-Carnitine Complex Injectable Research Oil View 1",
    title: "L-Carnitine Complex 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/l-carnitine-complex-oil/l-carnitine-complex-oil-2.webp",
    alt: "L-Carnitine Complex Injectable Research Oil View 2",
    title: "L-Carnitine Complex 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_METHONINE_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/methonine-oil/methonine-oil-1.webp",
    alt: "Methionine Injectable Injectable Research Oil",
    title: "Methionine Injectable 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_CHOLINE_CHLORIDE_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/choline-chloride-oil/choline-chloride-oil-1.webp",
    alt: "Choline Chloride Injectable Injectable Research Oil View 1",
    title: "Choline Chloride Injectable 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_ESTRADIAL_CYPIONATE_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/estradial-cypionate-oil/estradial-cypionate-oil-1.webp",
    alt: "Estradiol Cypionate Injectable Research Oil View 1",
    title: "Estradiol Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/estradial-cypionate-oil/estradial-cypionate-oil-2.webp",
    alt: "Estradiol Cypionate Injectable Research Oil View 2",
    title: "Estradiol Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/estradial-cypionate-oil/estradial-cypionate-oil-3.webp",
    alt: "Estradiol Cypionate Injectable Research Oil View 3",
    title: "Estradiol Cypionate 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const OIL_NAD_PLUS_OIL_IMAGES: ProductImage[] = [
  {
    src: "/images/products/oils/nad-plus-oil/nad-plus-oil-1.webp",
    alt: "NAD+ Injectable Oil Injectable Research Oil View 1",
    title: "NAD+ Injectable Oil 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/nad-plus-oil/nad-plus-oil-2.webp",
    alt: "NAD+ Injectable Oil Injectable Research Oil View 2",
    title: "NAD+ Injectable Oil 10ml Vial",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/oils/nad-plus-oil/nad-plus-oil-3.webp",
    alt: "NAD+ Injectable Oil Injectable Research Oil View 3",
    title: "NAD+ Injectable Oil 10ml Vial",
    width: 1200,
    height: 1200,
  },
];

export const ALL_STEROID_OILS_PRODUCTS: Product[] = [
  // Testosterone Enanthate
  makeOilVariant({
    slug: "testosterone-enanthate-oil-250mg-ml-10ml",
    sku: "OIL-TESTOSTERONEENANTHATEOIL-250MGML10ML",
    name: "Testosterone Enanthate - 250mg/ml (10ml)",
    shortDescription: "Testosterone Enanthate (Langkettiger Testosteronester für kontinuierliche Hormonspiegel und soliden Masseaufbau). 250mg/ml (10ml).",
    description: "Testosterone Enanthate liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Testosterone Enanthate\n\nTestosterone Enanthate (Langkettiger Testosteronester für kontinuierliche Hormonspiegel und soliden Masseaufbau) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Testosterone Enanthate maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Testosterone Enanthate entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor (AR), Endogene Testosteronsubstitution, Myofibrilläre Proteinsynthese.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 4.5 bis 5 Tage (aktive Depotwirkung 7–10 Tage)**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 250 mg bis 500 mg wöchentlich intramuskulär (i.m.) aufgeteilt auf 1–2 Injektionen. |\n| **Halbwertszeit** | ca. 4.5 bis 5 Tage (aktive Depotwirkung 7–10 Tage) |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Testosterone Enanthate wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Testosterone Enanthate (FAQ)\n\n**Warum darf Testosterone Enanthate nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 18,
    featured: true,
    images: OIL_TESTOSTERONE_ENANTHATE_OIL_IMAGES,
  }),
  makeOilVariant({
    slug: "testosterone-enanthate-oil-300mg-ml-10ml",
    sku: "OIL-TESTOSTERONEENANTHATEOIL-300MGML10ML",
    name: "Testosterone Enanthate - 300mg/ml (10ml)",
    shortDescription: "Testosterone Enanthate (Langkettiger Testosteronester für kontinuierliche Hormonspiegel und soliden Masseaufbau). 300mg/ml (10ml).",
    description: "Testosterone Enanthate liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Testosterone Enanthate\n\nTestosterone Enanthate (Langkettiger Testosteronester für kontinuierliche Hormonspiegel und soliden Masseaufbau) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Testosterone Enanthate maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Testosterone Enanthate entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor (AR), Endogene Testosteronsubstitution, Myofibrilläre Proteinsynthese.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 4.5 bis 5 Tage (aktive Depotwirkung 7–10 Tage)**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 250 mg bis 500 mg wöchentlich intramuskulär (i.m.) aufgeteilt auf 1–2 Injektionen. |\n| **Halbwertszeit** | ca. 4.5 bis 5 Tage (aktive Depotwirkung 7–10 Tage) |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Testosterone Enanthate wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Testosterone Enanthate (FAQ)\n\n**Warum darf Testosterone Enanthate nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 20,
    images: OIL_TESTOSTERONE_ENANTHATE_OIL_IMAGES,
  }),

  // Testosterone Cypionate
  makeOilVariant({
    slug: "testosterone-cypionate-oil-250mg-ml-10ml",
    sku: "OIL-TESTOSTERONECYPIONATEOIL-250MGML10ML",
    name: "Testosterone Cypionate - 250mg/ml (10ml)",
    shortDescription: "Testosterone Cypionate (Depot-Testosteron für stabile Plasmakonzentrationen und therapeutische TRT). 250mg/ml (10ml).",
    description: "Testosterone Cypionate liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Testosterone Cypionate\n\nTestosterone Cypionate (Depot-Testosteron für stabile Plasmakonzentrationen und therapeutische TRT) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Testosterone Cypionate maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Testosterone Cypionate entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor, Erythropoese, Knochendichte, Stickstoffretention.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 8 Tage**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 200 mg bis 500 mg wöchentlich intramuskulär über 10 bis 16 Wochen. |\n| **Halbwertszeit** | ca. 8 Tage |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Testosterone Cypionate wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Testosterone Cypionate (FAQ)\n\n**Warum darf Testosterone Cypionate nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 16,
    featured: true,
    images: OIL_TESTOSTERONE_CYPIONATE_OIL_IMAGES,
  }),

  // Testosterone Propionate
  makeOilVariant({
    slug: "testosterone-propionate-oil-100mg-ml-10ml",
    sku: "OIL-TESTOSTERONEPROPIONATEOIL-100MGML10ML",
    name: "Testosterone Propionate - 100mg/ml (10ml)",
    shortDescription: "Testosterone Propionate (Kurzkettiger Testosteronester für schnellen Wirkeintritt und minimale Wassereinlagerung). 100mg/ml (10ml).",
    description: "Testosterone Propionate liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Testosterone Propionate\n\nTestosterone Propionate (Kurzkettiger Testosteronester für schnellen Wirkeintritt und minimale Wassereinlagerung) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Testosterone Propionate maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Testosterone Propionate entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor, Schnelle zelluläre Aufnahme, Akute Kraftentfaltung.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 19 bis 24 Stunden**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 50 mg bis 100 mg jeden zweiten Tag (eod) intramuskulär. |\n| **Halbwertszeit** | ca. 19 bis 24 Stunden |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Testosterone Propionate wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Testosterone Propionate (FAQ)\n\n**Warum darf Testosterone Propionate nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 16,
    featured: true,
    images: OIL_TESTOSTERONE_PROPIONATE_OIL_IMAGES,
  }),

  // Trenbolone Acetate
  makeOilVariant({
    slug: "trenbolone-acetate-oil-200mg-ml-10ml",
    sku: "OIL-TRENBOLONEACETATEOIL-200MGML10ML",
    name: "Trenbolone Acetate - 200mg/ml (10ml)",
    shortDescription: "Trenbolone Acetate (Hochpotentes 19-Nor-Gestagen-Derivat für extreme Vaskularität, Fettabbau & Muskelhärte). 200mg/ml (10ml).",
    description: "Trenbolone Acetate liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Trenbolone Acetate\n\nTrenbolone Acetate (Hochpotentes 19-Nor-Gestagen-Derivat für extreme Vaskularität, Fettabbau & Muskelhärte) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Trenbolone Acetate maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Trenbolone Acetate entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor (Affinität 5x stärker als Testosteron), IGF-1-Rezeptor, Glukokortikoid-Blockade.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 24 bis 48 Stunden**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 50 mg bis 100 mg jeden zweiten Tag über 6 bis 8 Wochen. |\n| **Halbwertszeit** | ca. 24 bis 48 Stunden |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Trenbolone Acetate wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Trenbolone Acetate (FAQ)\n\n**Warum darf Trenbolone Acetate nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 32,
    featured: true,
    images: OIL_TRENBOLONE_ACETATE_OIL_IMAGES,
  }),

  // Trenbolone Carbonate TrX
  makeOilVariant({
    slug: "trenbolone-carbonate-trx-oil-100mg-ml-10ml",
    sku: "OIL-TRENBOLONECARBONATETRXOIL-100MGML10ML",
    name: "Trenbolone Carbonate TrX - 100mg/ml (10ml)",
    shortDescription: "Trenbolone Carbonate TrX (Hexahydrobenzylcarbonat (Parabolan) – Langwirksames Depot-Trenbolon). 100mg/ml (10ml).",
    description: "Trenbolone Carbonate TrX liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Trenbolone Carbonate TrX\n\nTrenbolone Carbonate TrX (Hexahydrobenzylcarbonat (Parabolan) – Langwirksames Depot-Trenbolon) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Trenbolone Carbonate TrX maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Trenbolone Carbonate TrX entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor, Nährstoffpartitionierung, Proteinkatabolismus-Hemmung.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 6 bis 8 Tage**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 100 mg bis 200 mg wöchentlich intramuskulär. |\n| **Halbwertszeit** | ca. 6 bis 8 Tage |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Trenbolone Carbonate TrX wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Trenbolone Carbonate TrX (FAQ)\n\n**Warum darf Trenbolone Carbonate TrX nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 45,
    featured: true,
    images: OIL_TRENBOLONE_CARBONATE_TRX_OIL_IMAGES,
  }),

  // Nandrolone Decanoate
  makeOilVariant({
    slug: "nandrolone-decanoate-oil-200mg-ml-10ml",
    sku: "OIL-NANDROLONEDECANOATEOIL-200MGML10ML",
    name: "Nandrolone Decanoate - 200mg/ml (10ml)",
    shortDescription: "Nandrolone Decanoate (Deca-Durabolin – Klassisches anaboles Steroid für Gelenkschmierung und Gewebereparatur). 200mg/ml (10ml).",
    description: "Nandrolone Decanoate liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Nandrolone Decanoate\n\nNandrolone Decanoate (Deca-Durabolin – Klassisches anaboles Steroid für Gelenkschmierung und Gewebereparatur) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Nandrolone Decanoate maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Nandrolone Decanoate entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor, Kollagen-Typ-III-Synthese, Synovialflüssigkeit-Regeneration.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 12 bis 15 Tage**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 200 mg bis 400 mg wöchentlich intramuskulär über 10 bis 14 Wochen. |\n| **Halbwertszeit** | ca. 12 bis 15 Tage |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Nandrolone Decanoate wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Nandrolone Decanoate (FAQ)\n\n**Warum darf Nandrolone Decanoate nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 20,
    featured: true,
    images: OIL_NANDROLONE_DECANOATE_OIL_IMAGES,
  }),

  // Nandrolone Phenylpropionate (NPP)
  makeOilVariant({
    slug: "nandrolone-phenylpropionate-oil-100mg-ml-10ml",
    sku: "OIL-NANDROLONEPHENYLPROPIONATEOIL-100MGML10ML",
    name: "Nandrolone Phenylpropionate (NPP) - 100mg/ml (10ml)",
    shortDescription: "Nandrolone Phenylpropionate (NPP) (Schnell wirkendes Nandrolon für definierte Muskelmasse mit geringerem Prolaktinrisiko). 100mg/ml (10ml).",
    description: "Nandrolone Phenylpropionate (NPP) liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Nandrolone Phenylpropionate (NPP)\n\nNandrolone Phenylpropionate (NPP) (Schnell wirkendes Nandrolon für definierte Muskelmasse mit geringerem Prolaktinrisiko) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Nandrolone Phenylpropionate (NPP) maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Nandrolone Phenylpropionate (NPP) entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor, Zelluläre Hypertrophie, Knorpelregeneration.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 2.5 bis 3 Tage**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 100 mg jeden zweiten bis dritten Tag intramuskulär. |\n| **Halbwertszeit** | ca. 2.5 bis 3 Tage |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Nandrolone Phenylpropionate (NPP) wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Nandrolone Phenylpropionate (NPP) (FAQ)\n\n**Warum darf Nandrolone Phenylpropionate (NPP) nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 20,
    featured: true,
    images: OIL_NANDROLONE_PHENYLPROPIONATE_OIL_IMAGES,
  }),
  makeOilVariant({
    slug: "nandrolone-phenylpropionate-oil-200mg-ml-10ml",
    sku: "OIL-NANDROLONEPHENYLPROPIONATEOIL-200MGML10ML",
    name: "Nandrolone Phenylpropionate (NPP) - 200mg/ml (10ml)",
    shortDescription: "Nandrolone Phenylpropionate (NPP) (Schnell wirkendes Nandrolon für definierte Muskelmasse mit geringerem Prolaktinrisiko). 200mg/ml (10ml).",
    description: "Nandrolone Phenylpropionate (NPP) liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Nandrolone Phenylpropionate (NPP)\n\nNandrolone Phenylpropionate (NPP) (Schnell wirkendes Nandrolon für definierte Muskelmasse mit geringerem Prolaktinrisiko) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Nandrolone Phenylpropionate (NPP) maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Nandrolone Phenylpropionate (NPP) entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor, Zelluläre Hypertrophie, Knorpelregeneration.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 2.5 bis 3 Tage**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 100 mg jeden zweiten bis dritten Tag intramuskulär. |\n| **Halbwertszeit** | ca. 2.5 bis 3 Tage |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Nandrolone Phenylpropionate (NPP) wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Nandrolone Phenylpropionate (NPP) (FAQ)\n\n**Warum darf Nandrolone Phenylpropionate (NPP) nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 21,
    images: OIL_NANDROLONE_PHENYLPROPIONATE_OIL_IMAGES,
  }),
  makeOilVariant({
    slug: "nandrolone-phenylpropionate-oil-300mg-ml-10ml",
    sku: "OIL-NANDROLONEPHENYLPROPIONATEOIL-300MGML10ML",
    name: "Nandrolone Phenylpropionate (NPP) - 300mg/ml (10ml)",
    shortDescription: "Nandrolone Phenylpropionate (NPP) (Schnell wirkendes Nandrolon für definierte Muskelmasse mit geringerem Prolaktinrisiko). 300mg/ml (10ml).",
    description: "Nandrolone Phenylpropionate (NPP) liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Nandrolone Phenylpropionate (NPP)\n\nNandrolone Phenylpropionate (NPP) (Schnell wirkendes Nandrolon für definierte Muskelmasse mit geringerem Prolaktinrisiko) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Nandrolone Phenylpropionate (NPP) maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Nandrolone Phenylpropionate (NPP) entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor, Zelluläre Hypertrophie, Knorpelregeneration.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 2.5 bis 3 Tage**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 100 mg jeden zweiten bis dritten Tag intramuskulär. |\n| **Halbwertszeit** | ca. 2.5 bis 3 Tage |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Nandrolone Phenylpropionate (NPP) wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Nandrolone Phenylpropionate (NPP) (FAQ)\n\n**Warum darf Nandrolone Phenylpropionate (NPP) nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 26,
    images: OIL_NANDROLONE_PHENYLPROPIONATE_OIL_IMAGES,
  }),

  // Drostanolone Propionate (Masteron P)
  makeOilVariant({
    slug: "drostanolone-propionate-oil-200mg-ml-10ml",
    sku: "OIL-DROSTANOLONEPROPIONATEOIL-200MGML10ML",
    name: "Drostanolone Propionate (Masteron P) - 200mg/ml (10ml)",
    shortDescription: "Drostanolone Propionate (Masteron P) (DHT-Derivat für Wettkampfhärte, Vaskularität und anti-östrogene Wirkung). 200mg/ml (10ml).",
    description: "Drostanolone Propionate (Masteron P) liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Drostanolone Propionate (Masteron P)\n\nDrostanolone Propionate (Masteron P) (DHT-Derivat für Wettkampfhärte, Vaskularität und anti-östrogene Wirkung) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Drostanolone Propionate (Masteron P) maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Drostanolone Propionate (Masteron P) entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor, Aromatase-Hemmung, Lipolyse in subkutanem Fettgewebe.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 2 bis 2.5 Tage**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 100 mg jeden zweiten Tag intramuskulär über 6 bis 8 Wochen. |\n| **Halbwertszeit** | ca. 2 bis 2.5 Tage |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Drostanolone Propionate (Masteron P) wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Drostanolone Propionate (Masteron P) (FAQ)\n\n**Warum darf Drostanolone Propionate (Masteron P) nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 33,
    featured: true,
    images: OIL_DROSTANOLONE_PROPIONATE_OIL_IMAGES,
  }),

  // Drostanolone Enanthate (Masteron E)
  makeOilVariant({
    slug: "drostanolone-enanthate-oil-200mg-ml-10ml",
    sku: "OIL-DROSTANOLONEENANTHATEOIL-200MGML10ML",
    name: "Drostanolone Enanthate (Masteron E) - 200mg/ml (10ml)",
    shortDescription: "Drostanolone Enanthate (Masteron E) (Langwirksames Masteron-Depot für konstante Muskeldefinition ohne Wassereinlagerungen). 200mg/ml (10ml).",
    description: "Drostanolone Enanthate (Masteron E) liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Drostanolone Enanthate (Masteron E)\n\nDrostanolone Enanthate (Masteron E) (Langwirksames Masteron-Depot für konstante Muskeldefinition ohne Wassereinlagerungen) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Drostanolone Enanthate (Masteron E) maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Drostanolone Enanthate (Masteron E) entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor, Anti-östrogene Modulation, Fettgewebsreduktion.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 5 bis 7 Tage**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 200 mg bis 400 mg wöchentlich intramuskulär. |\n| **Halbwertszeit** | ca. 5 bis 7 Tage |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Drostanolone Enanthate (Masteron E) wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Drostanolone Enanthate (Masteron E) (FAQ)\n\n**Warum darf Drostanolone Enanthate (Masteron E) nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 33,
    featured: true,
    images: OIL_DROSTANOLONE_ENANTHATE_OIL_IMAGES,
  }),

  // Methenolone Enanthate (Primobolan Depot)
  makeOilVariant({
    slug: "methenolone-enanthate-oil-100mg-ml-10ml",
    sku: "OIL-METHENOLONEENANTHATEOIL-100MGML10ML",
    name: "Methenolone Enanthate (Primobolan Depot) - 100mg/ml (10ml)",
    shortDescription: "Methenolone Enanthate (Primobolan Depot) (Goldstandard für fettfreien Muskelaufbau mit herausragendem Sicherheitsprofil). 100mg/ml (10ml).",
    description: "Methenolone Enanthate (Primobolan Depot) liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Methenolone Enanthate (Primobolan Depot)\n\nMethenolone Enanthate (Primobolan Depot) (Goldstandard für fettfreien Muskelaufbau mit herausragendem Sicherheitsprofil) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Methenolone Enanthate (Primobolan Depot) maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Methenolone Enanthate (Primobolan Depot) entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor (keine Östrogenkonversion, keine Progesteronaktivität).\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 7 Tage**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 200 mg bis 400 mg wöchentlich intramuskulär über 10 bis 16 Wochen. |\n| **Halbwertszeit** | ca. 7 Tage |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Methenolone Enanthate (Primobolan Depot) wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Methenolone Enanthate (Primobolan Depot) (FAQ)\n\n**Warum darf Methenolone Enanthate (Primobolan Depot) nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 43,
    featured: true,
    images: OIL_METHENOLONE_ENANTHATE_OIL_IMAGES,
  }),
  makeOilVariant({
    slug: "methenolone-enanthate-oil-200mg-ml-10ml",
    sku: "OIL-METHENOLONEENANTHATEOIL-200MGML10ML",
    name: "Methenolone Enanthate (Primobolan Depot) - 200mg/ml (10ml)",
    shortDescription: "Methenolone Enanthate (Primobolan Depot) (Goldstandard für fettfreien Muskelaufbau mit herausragendem Sicherheitsprofil). 200mg/ml (10ml).",
    description: "Methenolone Enanthate (Primobolan Depot) liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Methenolone Enanthate (Primobolan Depot)\n\nMethenolone Enanthate (Primobolan Depot) (Goldstandard für fettfreien Muskelaufbau mit herausragendem Sicherheitsprofil) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Methenolone Enanthate (Primobolan Depot) maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Methenolone Enanthate (Primobolan Depot) entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor (keine Östrogenkonversion, keine Progesteronaktivität).\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 7 Tage**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 200 mg bis 400 mg wöchentlich intramuskulär über 10 bis 16 Wochen. |\n| **Halbwertszeit** | ca. 7 Tage |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Methenolone Enanthate (Primobolan Depot) wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Methenolone Enanthate (Primobolan Depot) (FAQ)\n\n**Warum darf Methenolone Enanthate (Primobolan Depot) nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 66,
    images: OIL_METHENOLONE_ENANTHATE_OIL_IMAGES,
  }),

  // Boldenone Undecylenate (Equipoise BU)
  makeOilVariant({
    slug: "boldenone-undecylenate-oil-300mg-ml-10ml",
    sku: "OIL-BOLDENONEUNDECYLENATEOIL-300MGML10ML",
    name: "Boldenone Undecylenate (Equipoise BU) - 300mg/ml (10ml)",
    shortDescription: "Boldenone Undecylenate (Equipoise BU) (Langsam anflutendes anaboles Steroid für Appetitsteigerung, Vaskularität & Ausdauer). 300mg/ml (10ml).",
    description: "Boldenone Undecylenate (Equipoise BU) liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Boldenone Undecylenate (Equipoise BU)\n\nBoldenone Undecylenate (Equipoise BU) (Langsam anflutendes anaboles Steroid für Appetitsteigerung, Vaskularität & Ausdauer) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Boldenone Undecylenate (Equipoise BU) maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Boldenone Undecylenate (Equipoise BU) entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor, Nieren-Erythropoetin-Freisetzung (Hämatokrit-Steigerung).\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 14 Tage**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 300 mg bis 600 mg wöchentlich intramuskulär über 12 bis 16 Wochen. |\n| **Halbwertszeit** | ca. 14 Tage |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Boldenone Undecylenate (Equipoise BU) wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Boldenone Undecylenate (Equipoise BU) (FAQ)\n\n**Warum darf Boldenone Undecylenate (Equipoise BU) nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 22,
    featured: true,
    images: OIL_BOLDENONE_UNDECYLENATE_OIL_IMAGES,
  }),
  makeOilVariant({
    slug: "boldenone-undecylenate-oil-600mg-ml-10ml",
    sku: "OIL-BOLDENONEUNDECYLENATEOIL-600MGML10ML",
    name: "Boldenone Undecylenate (Equipoise BU) - 600mg/ml (10ml)",
    shortDescription: "Boldenone Undecylenate (Equipoise BU) (Langsam anflutendes anaboles Steroid für Appetitsteigerung, Vaskularität & Ausdauer). 600mg/ml (10ml).",
    description: "Boldenone Undecylenate (Equipoise BU) liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Boldenone Undecylenate (Equipoise BU)\n\nBoldenone Undecylenate (Equipoise BU) (Langsam anflutendes anaboles Steroid für Appetitsteigerung, Vaskularität & Ausdauer) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Boldenone Undecylenate (Equipoise BU) maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Boldenone Undecylenate (Equipoise BU) entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor, Nieren-Erythropoetin-Freisetzung (Hämatokrit-Steigerung).\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 14 Tage**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 300 mg bis 600 mg wöchentlich intramuskulär über 12 bis 16 Wochen. |\n| **Halbwertszeit** | ca. 14 Tage |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Boldenone Undecylenate (Equipoise BU) wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Boldenone Undecylenate (Equipoise BU) (FAQ)\n\n**Warum darf Boldenone Undecylenate (Equipoise BU) nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 40,
    images: OIL_BOLDENONE_UNDECYLENATE_OIL_IMAGES,
  }),

  // Boldenone Cypionate
  makeOilVariant({
    slug: "boldenone-cypionate-oil-250mg-ml-10ml",
    sku: "OIL-BOLDENONECYPIONATEOIL-250MGML10ML",
    name: "Boldenone Cypionate - 250mg/ml (10ml)",
    shortDescription: "Boldenone Cypionate (Mittelkettiger Boldenon-Ester für schnellere Spitzenkonzentrationen). 250mg/ml (10ml).",
    description: "Boldenone Cypionate liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Boldenone Cypionate\n\nBoldenone Cypionate (Mittelkettiger Boldenon-Ester für schnellere Spitzenkonzentrationen) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Boldenone Cypionate maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Boldenone Cypionate entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor, Stickstoffspeicherung, Steigerung der roten Blutkörperchen.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 6 bis 8 Tage**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 250 mg bis 500 mg wöchentlich intramuskulär. |\n| **Halbwertszeit** | ca. 6 bis 8 Tage |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Boldenone Cypionate wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Boldenone Cypionate (FAQ)\n\n**Warum darf Boldenone Cypionate nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 20,
    featured: true,
    images: OIL_BOLDENONE_CYPIONATE_OIL_IMAGES,
  }),

  // Stanozolol Oil Base (Winstrol Oil)
  makeOilVariant({
    slug: "stanozolol-oil-base-100mg-ml-10ml",
    sku: "OIL-STANOZOLOLOILBASE-100MGML10ML",
    name: "Stanozolol Oil Base (Winstrol Oil) - 100mg/ml (10ml)",
    shortDescription: "Stanozolol Oil Base (Winstrol Oil) (Schmerzfreie ölige Winstrol-Formulierung für maximale Trockenheit und Kraft). 100mg/ml (10ml).",
    description: "Stanozolol Oil Base (Winstrol Oil) liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Stanozolol Oil Base (Winstrol Oil)\n\nStanozolol Oil Base (Winstrol Oil) (Schmerzfreie ölige Winstrol-Formulierung für maximale Trockenheit und Kraft) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Stanozolol Oil Base (Winstrol Oil) maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Stanozolol Oil Base (Winstrol Oil) entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor, SHBG-Suppression, Stimulation der Proteinsynthese.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 24 Stunden**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 50 mg bis 100 mg jeden zweiten Tag intramuskulär. |\n| **Halbwertszeit** | ca. 24 Stunden |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Stanozolol Oil Base (Winstrol Oil) wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Stanozolol Oil Base (Winstrol Oil) (FAQ)\n\n**Warum darf Stanozolol Oil Base (Winstrol Oil) nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 18,
    featured: true,
    images: OIL_STANOZOLOL_OIL_BASE_IMAGES,
  }),

  // Stanozolol Suspension (Winstrol)
  makeOilVariant({
    slug: "stanozolol-suspension-oil-50mg-ml-10ml",
    sku: "OIL-STANOZOLOLSUSPENSIONOIL-50MGML10ML",
    name: "Stanozolol Suspension (Winstrol) - 50mg/ml (10ml)",
    shortDescription: "Stanozolol Suspension (Winstrol) (Mikrokristalline Winstrol-Suspension für sofortige Bioverfügbarkeit). 50mg/ml (10ml).",
    description: "Stanozolol Suspension (Winstrol) liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Stanozolol Suspension (Winstrol)\n\nStanozolol Suspension (Winstrol) (Mikrokristalline Winstrol-Suspension für sofortige Bioverfügbarkeit) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Stanozolol Suspension (Winstrol) maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Stanozolol Suspension (Winstrol) entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor, SHBG-Senkung (>50% in Studien), Kollagensynthese-Modulation.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 12 bis 24 Stunden**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 50 mg täglich oder jeden zweiten Tag tief intramuskulär. |\n| **Halbwertszeit** | ca. 12 bis 24 Stunden |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Stanozolol Suspension (Winstrol) wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Stanozolol Suspension (Winstrol) (FAQ)\n\n**Warum darf Stanozolol Suspension (Winstrol) nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 18,
    featured: true,
    images: OIL_STANOZOLOL_SUSPENSION_OIL_IMAGES,
  }),
  makeOilVariant({
    slug: "stanozolol-suspension-oil-100mg-ml-10ml",
    sku: "OIL-STANOZOLOLSUSPENSIONOIL-100MGML10ML",
    name: "Stanozolol Suspension (Winstrol) - 100mg/ml (10ml)",
    shortDescription: "Stanozolol Suspension (Winstrol) (Mikrokristalline Winstrol-Suspension für sofortige Bioverfügbarkeit). 100mg/ml (10ml).",
    description: "Stanozolol Suspension (Winstrol) liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Stanozolol Suspension (Winstrol)\n\nStanozolol Suspension (Winstrol) (Mikrokristalline Winstrol-Suspension für sofortige Bioverfügbarkeit) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Stanozolol Suspension (Winstrol) maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Stanozolol Suspension (Winstrol) entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor, SHBG-Senkung (>50% in Studien), Kollagensynthese-Modulation.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 12 bis 24 Stunden**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 50 mg täglich oder jeden zweiten Tag tief intramuskulär. |\n| **Halbwertszeit** | ca. 12 bis 24 Stunden |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Stanozolol Suspension (Winstrol) wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Stanozolol Suspension (Winstrol) (FAQ)\n\n**Warum darf Stanozolol Suspension (Winstrol) nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 18,
    images: OIL_STANOZOLOL_SUSPENSION_OIL_IMAGES,
  }),

  // Ripex-225 Blend
  makeOilVariant({
    slug: "ripex-225-oil-225mg-ml-10ml",
    sku: "OIL-RIPEX225OIL-225MGML10ML",
    name: "Ripex-225 Blend - 225mg/ml (10ml)",
    shortDescription: "Ripex-225 Blend (Synergistischer 3-Komponenten-Wettkampfstack (Test Prop + Drostanolone + Tren Ace)). 225mg/ml (10ml).",
    description: "Ripex-225 Blend liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Ripex-225 Blend\n\nRipex-225 Blend (Synergistischer 3-Komponenten-Wettkampfstack (Test Prop + Drostanolone + Tren Ace)) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Ripex-225 Blend maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Ripex-225 Blend entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Multi-Androgenrezeptor-Sättigung, Synergie aus Testosteron, Masteron und Trenbolon.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 24 bis 36 Stunden**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 1 ml (225 mg) jeden zweiten Tag intramuskulär über 6 bis 8 Wochen. |\n| **Halbwertszeit** | ca. 24 bis 36 Stunden |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Ripex-225 Blend wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Ripex-225 Blend (FAQ)\n\n**Warum darf Ripex-225 Blend nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 71,
    featured: true,
    images: OIL_RIPEX_225_OIL_IMAGES,
  }),

  // Methandrostenolone Injectable (Dianabol Oil)
  makeOilVariant({
    slug: "methandrostenolone-oil-50mg-ml-10ml",
    sku: "OIL-METHANDROSTENOLONEOIL-50MGML10ML",
    name: "Methandrostenolone Injectable (Dianabol Oil) - 50mg/ml (10ml)",
    shortDescription: "Methandrostenolone Injectable (Dianabol Oil) (Injizierbares Methandienon ohne First-Pass-Leberbelastung). 50mg/ml (10ml).",
    description: "Methandrostenolone Injectable (Dianabol Oil) liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Methandrostenolone Injectable (Dianabol Oil)\n\nMethandrostenolone Injectable (Dianabol Oil) (Injizierbares Methandienon ohne First-Pass-Leberbelastung) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Methandrostenolone Injectable (Dianabol Oil) maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Methandrostenolone Injectable (Dianabol Oil) entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor, Glykogenspeicherung, Akuter Kraft- & Volumenzuwachs.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 24 Stunden**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 25 mg bis 50 mg täglich oder jeden zweiten Tag intramuskulär über 4 bis 6 Wochen. |\n| **Halbwertszeit** | ca. 24 Stunden |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Methandrostenolone Injectable (Dianabol Oil) wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Methandrostenolone Injectable (Dianabol Oil) (FAQ)\n\n**Warum darf Methandrostenolone Injectable (Dianabol Oil) nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 20,
    featured: true,
    images: OIL_METHANDROSTENOLONE_OIL_IMAGES,
  }),

  // Metribolone (Methyltrienolone)
  makeOilVariant({
    slug: "metribolone-oil-5mg-ml-10ml",
    sku: "OIL-METRIBOLONEOIL-5MGML10ML",
    name: "Metribolone (Methyltrienolone) - 5mg/ml (10ml)",
    shortDescription: "Metribolone (Methyltrienolone) (Extrem starkes androgenes Trienolon für maximale Kraftspitzen). 5mg/ml (10ml).",
    description: "Metribolone (Methyltrienolone) liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Metribolone (Methyltrienolone)\n\nMetribolone (Methyltrienolone) (Extrem starkes androgenes Trienolon für maximale Kraftspitzen) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Metribolone (Methyltrienolone) maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Metribolone (Methyltrienolone) entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Androgenrezeptor mit unübertroffener Bindungsaffinität (Q-Ratio >12.000).\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 4 bis 6 Stunden**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 1 mg bis 2.5 mg vor intensiven Trainingseinheiten für max. 2 bis 3 Wochen. |\n| **Halbwertszeit** | ca. 4 bis 6 Stunden |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Metribolone (Methyltrienolone) wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Metribolone (Methyltrienolone) (FAQ)\n\n**Warum darf Metribolone (Methyltrienolone) nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 50,
    featured: true,
    images: OIL_METRIBOLONE_OIL_IMAGES,
  }),

  // L-Carnitine Injectable
  makeOilVariant({
    slug: "l-carnitine-injectable-oil-500mg-ml-10ml",
    sku: "OIL-LCARNITINEINJECTABLEOIL-500MGML10ML",
    name: "L-Carnitine Injectable - 500mg/ml (10ml)",
    shortDescription: "L-Carnitine Injectable (Hochdosiertes injizierbares L-Carnitin für maximale intramuskuläre Resorption). 500mg/ml (10ml).",
    description: "L-Carnitine Injectable liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu L-Carnitine Injectable\n\nL-Carnitine Injectable (Hochdosiertes injizierbares L-Carnitin für maximale intramuskuläre Resorption) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert L-Carnitine Injectable maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von L-Carnitine Injectable entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Mitochondrialer CPT-1-Transporter, Hochregulation von Androgenrezeptoren im Muskel.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 4 Stunden**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 200 mg bis 500 mg täglich intramuskulär oder subkutan vor dem Training. |\n| **Halbwertszeit** | ca. 4 Stunden |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von L-Carnitine Injectable wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu L-Carnitine Injectable (FAQ)\n\n**Warum darf L-Carnitine Injectable nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 50,
    featured: true,
    images: OIL_L_CARNITINE_INJECTABLE_OIL_IMAGES,
  }),

  // L-Carnitine Complex
  makeOilVariant({
    slug: "l-carnitine-complex-oil-10ml-vial",
    sku: "OIL-LCARNITINECOMPLEXOIL-10MLVIAL",
    name: "L-Carnitine Complex - 10ml Vial",
    shortDescription: "L-Carnitine Complex (Injizierbarer Carnitin-Synergiekomplex für Fettverbrennung und mitochondriale Energie). 10ml Vial.",
    description: "L-Carnitine Complex liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu L-Carnitine Complex\n\nL-Carnitine Complex (Injizierbarer Carnitin-Synergiekomplex für Fettverbrennung und mitochondriale Energie) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert L-Carnitine Complex maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von L-Carnitine Complex entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Mitochondriale Matrix, Fettoxidation, ATP-Generation.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 4 bis 6 Stunden**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 1 ml täglich vor körperlicher Aktivität. |\n| **Halbwertszeit** | ca. 4 bis 6 Stunden |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von L-Carnitine Complex wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu L-Carnitine Complex (FAQ)\n\n**Warum darf L-Carnitine Complex nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 49,
    featured: true,
    images: OIL_L_CARNITINE_COMPLEX_OIL_IMAGES,
  }),

  // Methionine Injectable
  makeOilVariant({
    slug: "methonine-oil-120mg-ml-10ml",
    sku: "OIL-METHONINEOIL-120MGML10ML",
    name: "Methionine Injectable - 120mg/ml (10ml)",
    shortDescription: "Methionine Injectable (Lipolytische Aminosäure für hepatische Entgiftung und Fettstoffwechsel (MIC-Komponente)). 120mg/ml (10ml).",
    description: "Methionine Injectable liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Methionine Injectable\n\nMethionine Injectable (Lipolytische Aminosäure für hepatische Entgiftung und Fettstoffwechsel (MIC-Komponente)) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Methionine Injectable maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Methionine Injectable entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Glutathion-Vorläufer, S-Adenosylmethionin (SAMe), Hepatoprotektion.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 6 Stunden**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 1 ml 2–3 Mal wöchentlich intramuskulär. |\n| **Halbwertszeit** | ca. 6 Stunden |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Methionine Injectable wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Methionine Injectable (FAQ)\n\n**Warum darf Methionine Injectable nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 46,
    featured: true,
    images: OIL_METHONINE_OIL_IMAGES,
  }),

  // Choline Chloride Injectable
  makeOilVariant({
    slug: "choline-chloride-oil-120mg-ml-10ml",
    sku: "OIL-CHOLINECHLORIDEOIL-120MGML10ML",
    name: "Choline Chloride Injectable - 120mg/ml (10ml)",
    shortDescription: "Choline Chloride Injectable (Injizierbares Cholin für Phospholipidtransport, Zellmembranintegrität & Fokus). 120mg/ml (10ml).",
    description: "Choline Chloride Injectable liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Choline Chloride Injectable\n\nCholine Chloride Injectable (Injizierbares Cholin für Phospholipidtransport, Zellmembranintegrität & Fokus) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Choline Chloride Injectable maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Choline Chloride Injectable entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Acetylcholin-Biosynthese, VLDL-Leberentfettung, Homocystein-Senkung.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 8 Stunden**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 1 ml 2–3 Mal wöchentlich intramuskulär. |\n| **Halbwertszeit** | ca. 8 Stunden |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Choline Chloride Injectable wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Choline Chloride Injectable (FAQ)\n\n**Warum darf Choline Chloride Injectable nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 46,
    featured: true,
    images: OIL_CHOLINE_CHLORIDE_OIL_IMAGES,
  }),

  // Estradiol Cypionate
  makeOilVariant({
    slug: "estradial-cypionate-oil-10mg-ml-10ml",
    sku: "OIL-ESTRADIALCYPIONATEOIL-10MGML10ML",
    name: "Estradiol Cypionate - 10mg/ml (10ml)",
    shortDescription: "Estradiol Cypionate (Langkettiges bioidentisches Östradiol-Depot für endokrinologische Forschung). 10mg/ml (10ml).",
    description: "Estradiol Cypionate liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu Estradiol Cypionate\n\nEstradiol Cypionate (Langkettiges bioidentisches Östradiol-Depot für endokrinologische Forschung) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert Estradiol Cypionate maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von Estradiol Cypionate entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Östrogenrezeptoren ERα und ERβ, Knochenstoffwechsel, Lipidprofil-Modulation.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 7 bis 10 Tage**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | Gemäß individuellem Forschungsprotokoll intramuskulär. |\n| **Halbwertszeit** | ca. 7 bis 10 Tage |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von Estradiol Cypionate wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu Estradiol Cypionate (FAQ)\n\n**Warum darf Estradiol Cypionate nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 50,
    featured: true,
    images: OIL_ESTRADIAL_CYPIONATE_OIL_IMAGES,
  }),

  // NAD+ Injectable Oil
  makeOilVariant({
    slug: "nad-plus-oil-100mg-ml-10ml",
    sku: "OIL-NADPLUSOIL-100MGML10ML",
    name: "NAD+ Injectable Oil - 100mg/ml (10ml)",
    shortDescription: "NAD+ Injectable Oil (Injizierbares Nicotinamid-Adenin-Dinukleotid für zelluläre Verjüngung & ATP-Synthese). 100mg/ml (10ml).",
    description: "NAD+ Injectable Oil liefert pharmazeutische Reinheit (≥99.0% HPLC) in sterilem MCT-Öl für anspruchsvolle Forschungsanwendungen.",
    longDescription: "## Wissenschaftliche Monographie & Ausführlicher Leitfaden zu NAD+ Injectable Oil\n\nNAD+ Injectable Oil (Injizierbares Nicotinamid-Adenin-Dinukleotid für zelluläre Verjüngung & ATP-Synthese) ist eine hochreine, analytisch geprüfte ölige Injektionslösung in pharmazeutischer Forschungsqualität (HPLC-Reinheit ≥99.0%). Formuliert in medizinischem Trägeröl (MCT-Öl oder raffiniertes Sesamöl) mit optimaler Viskosität und physiologischem Benzyllösungsmittel-Verhältnis, garantiert NAD+ Injectable Oil maximale Resorptionskinetik, Depotstabilität und schmerzarme intramuskuläre Applikation.\n\n---\n\n### Molekularer Wirkmechanismus & Biochemische Signalwege\n\nDie biologische Wirkung von NAD+ Injectable Oil entfaltet sich über selektive Rezeptorinteraktionen und zelluläre Signalübertragungskaskaden:\n1. **Rezeptorbindung & Spezifität:** Sirtuine (SIRT1-7), PARP1 DNA-Reparatur, Mitochondriale Atmungskette.\n2. **Depot- und Freisetzungskinetik:** Nach intramuskulärer Injektion bildet das ölige Trägermedium ein stabiles Gewebedepot. Die biologische Halbwertszeit beträgt **ca. 2 bis 4 Stunden**, wodurch konstante Serumkonzentrationen ohne extreme Tagesschwankungen gewährleistet werden.\n3. **Anabole & Regenerative Kaskaden:** Durch Aktivierung des androgenen Transkriptionsfaktors wird die ribosomale Translation stimuliert, der myozelluläre Proteinkatabolismus inhibiert und die Stickstoffbilanz signifikant in den positiven Bereich verschoben.\n4. **Gewebespezifische Effekte:** Unterstützung der Erythropoese, Steigerung der muskulären Glykogenspeicherung und Optimierung der myonukleären Stammzellreifung.\n\n---\n\n### Hauptanwendungsbereiche & Forschungsprotokolle\n\n- **Hypertrophie- & Kraftforschung:** Erforschung der Myofibrillen-Dichte, Satellitenzell-Aktivierung und Überwindung physiologischer Aufbauplateaus.\n- **Gelenk- & Geweberegeneration:** Untersuchung der Kollagensynthese, Knorpelelastizität und Gelenkschmierung durch optimierte Hormonspiegel.\n- **Körperkomposition & Lipolyse:** Analyse der hormonellen Nährstoffverteilung (Nutrient Partitioning) und des beschleunigten Abbaus viszeraler und subkutaner Fettdepots.\n- **Hormonale Homöostase:** Wiederherstellung physiologischer Androgen- und Stoffwechselachsen in experimentellen Hypogonadismus-Modellen.\n\n---\n\n### Dosierungstabelle, Injektionsprotokoll & Depot-Management\n\n| Parameter | Klinische / Experimentelle Spezifikation |\n|---|---|\n| **Standarddosierung** | 50 mg bis 100 mg 1–3 Mal wöchentlich subkutan oder intramuskulär. |\n| **Halbwertszeit** | ca. 2 bis 4 Stunden |\n| **Injektionsmethode** | Tief intramuskulär (i.m.) in Gluteus, Ventrogluteal oder Vastus lateralis |\n| **Nadeldimension** | 22G–25G (Länge: 25 mm bis 38 mm) für gleichmäßigen Ölfluss |\n| **Lagerung** | Bei Raumtemperatur (15°C–25°C) trocken und lichtgeschützt lagern (nicht kühlen) |\n\n---\n\n### Qualitätsstandards, Reinheit & HPLC-Zertifizierung\n\nJede Charge von NAD+ Injectable Oil wird unter strengsten Reinraumbedingungen gemäß GMP-Standards steril filtriert (0.22 µm PTFE-Membran):\n- **HPLC-Reinheitsnachweis:** Garantierte Wirkstoffreinheit von **≥99.0%** ohne schädliche Nebenprodukte.\n- **Keimfreiheit & Endotoxintests:** Lückenlose Prüfung auf Sterilität und Pyrogenfreiheit (<0.05 EU/mg).\n- **Trägeröl-Qualität:** Hochgereinigtes, pharmazeutisches MCT-Öl für minimale Gewebeirritation und reibungslose Resorption.\n\n---\n\n### Häufig gestellte Fragen zu NAD+ Injectable Oil (FAQ)\n\n**Warum darf NAD+ Injectable Oil nicht im Kühlschrank aufbewahrt werden?**\nÖlige Steroidlösungen können bei niedrigen Temperaturen kristallisieren (Ausfallen des Wirkstoffs). Sollte dies versehentlich geschehen, kann das Vial im warmen Wasserbad bei ca. 40°C sanft erwärmt werden, bis die Lösung wieder vollkommen klar ist.\n\n**Welches Trägeröl wird verwendet und wie wird Schmerzfreiheit gewährleistet?**\nUnsere Formulierungen nutzen pharmazeutisches MCT-Öl mit optimiertem Benzylalkohol- (BA 1-2%) und Benzylbenzoat- (BB 15-20%) Anteil für maximale Verträglichkeit und minimale Nachinjektionsbeschwerden (PIP).\n\n**Welche Vorsichtsmaßnahmen sind bei der Verabreichung zu beachten?**\nStrenge aseptische Arbeitsweise mit Desinfektion des Vial-Gummistopfens und der Injektionsstelle ist Pflicht. Nach dem Einstechen sollte kurz aspiriert werden, um eine intravasale Injektion auszuschließen.",
    price: 65,
    featured: true,
    images: OIL_NAD_PLUS_OIL_IMAGES,
  }),

];
