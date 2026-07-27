export { useReducedMotion } from "framer-motion";

/**
 * Sync reduced-motion check for non-React contexts (e.g. deciding whether to
 * even construct a Lenis instance or mount the R3F canvas before first paint).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
