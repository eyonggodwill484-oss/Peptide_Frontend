"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { EASE } from "@/lib/motion/variants";

const CYCLE_MS = 3200;

/** Cycles the hero headline through a set of phrases with a bold slide/blur transition. */
export function AnimatedHeroHeadline({ phrases, className }: { phrases: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || phrases.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % phrases.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [phrases.length, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <span className={className}>{phrases[0]}</span>;
  }

  return (
    <span className={`relative block min-h-[2.3em] sm:min-h-[2.2em] ${className ?? ""}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -36, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="absolute inset-0"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
