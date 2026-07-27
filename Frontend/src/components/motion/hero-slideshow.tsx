"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type HeroSlideshowProps = {
  images: { src: string; alt: string }[];
  interval?: number;
};

/** Cross-fades between hero images with a slow Ken Burns zoom. */
export function HeroSlideshow({ images, interval = 6000 }: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (images.length < 2 || shouldReduceMotion) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval, shouldReduceMotion]);

  const active = images[index];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-black">
      <AnimatePresence mode="sync">
        <motion.div
          key={active.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.div
            className="size-full"
            initial={{ scale: 1 }}
            animate={shouldReduceMotion ? { scale: 1 } : { scale: 1.08 }}
            transition={{ duration: interval / 1000 + 1.2, ease: "linear" }}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((image, i) => (
            <span
              key={image.src}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      )}
    </div>
  );
}
