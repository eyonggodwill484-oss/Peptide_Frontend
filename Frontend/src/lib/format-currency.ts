import { SITE_CURRENCY } from "@/constants/site";

const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: SITE_CURRENCY });

export function formatPrice(value: number): string {
  return formatter.format(value);
}
