"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { prefersReducedMotion } from "@/lib/motion/use-reduced-motion";

/** Wires up smooth scrolling site-wide. No-ops under prefers-reduced-motion (native scroll). */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoResize: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Keep Lenis scroll calculations in sync when dynamic images or content load
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });

    if (typeof document !== "undefined" && document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
