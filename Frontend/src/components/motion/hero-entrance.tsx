"use client";

import { type ReactNode, useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import { staggerContainer, EASE } from "@/lib/motion/variants";
import { HeroParticles } from "@/components/motion/hero-particles";
import { DnaHelix } from "@/components/motion/dna-helix";

/** Staggers its HeroEntranceItem children in on mount (not scroll-triggered — hero content should animate on load). */
export function HeroEntrance({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} initial="hidden" animate="show" variants={staggerContainer(0.15, 0.1)}>
      {children}
    </motion.div>
  );
}

export function HeroEntranceItem({ children, className, y = 24 }: { children: ReactNode; className?: string; y?: number }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
    >
      {children}
    </motion.div>
  );
}

function useMouseParallax(strength = 18) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    function handlePointerMove(event: PointerEvent) {
      const relX = (event.clientX / window.innerWidth - 0.5) * 2;
      const relY = (event.clientY / window.innerHeight - 0.5) * 2;
      x.set(relX * strength);
      y.set(relY * strength);
    }
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [strength, shouldReduceMotion, x, y]);

  return { x: springX, y: springY };
}

/** Composes the floating particles + DNA helix behind the hero copy, with a subtle mouse-parallax drift. */
export function HeroBackground() {
  const { x, y } = useMouseParallax(14);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden opacity-70 mix-blend-screen">
      <HeroParticles />
      <motion.div style={{ x, y }} className="absolute inset-y-0 right-0 hidden w-[26rem] lg:block">
        <DnaHelix className="size-full" />
      </motion.div>
    </div>
  );
}
