"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Particle = {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.round(Math.random() * 100)}%`,
    top: `${Math.round(Math.random() * 100)}%`,
    size: 3 + Math.round(Math.random() * 5),
    duration: 10 + Math.random() * 10,
    delay: Math.random() * 6,
    drift: 14 + Math.random() * 18,
  }));
}

/** Softly floating molecular particles — decorative, disabled under reduced-motion. */
export function HeroParticles({ count = 18, className }: { count?: number; className?: string }) {
  const particles = useMemo(() => makeParticles(count), [count]);
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white/50 blur-[1px]"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          animate={{
            y: [0, -particle.drift, 0],
            x: [0, particle.drift * 0.4, 0],
            opacity: [0.25, 0.7, 0.25],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
