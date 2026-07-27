"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

type CountUpStatProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
};

function formatValue(value: number, decimals: number) {
  return value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/** Counts up from 0 to `value` once it scrolls into view. */
export function CountUpStat({ value, prefix = "", suffix = "", className, duration = 1.6 }: CountUpStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const decimals = Number.isInteger(value) ? 0 : (value.toString().split(".")[1]?.length ?? 0);

  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${prefix}${formatValue(v, decimals)}${suffix}`);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration, ease: [0.21, 0.47, 0.32, 0.98] });
    return () => controls.stop();
  }, [isInView, shouldReduceMotion, value, duration, count]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
