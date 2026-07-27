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

/** Deterministic PRNG (mulberry32) so server and client render identical particles. */
function createRandom(seed: number) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeParticles(count: number): Particle[] {
  const random = createRandom(count * 9301 + 49297);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.round(random() * 100)}%`,
    top: `${Math.round(random() * 100)}%`,
    size: 3 + Math.round(random() * 5),
    duration: 10 + random() * 10,
    delay: random() * 6,
    drift: 14 + random() * 18,
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
