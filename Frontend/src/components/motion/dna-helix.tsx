"use client";

import { Component, type ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { prefersReducedMotion } from "@/lib/motion/use-reduced-motion";

const DnaHelixScene = dynamic(() => import("./dna-helix-scene").then((mod) => mod.DnaHelixScene), {
  ssr: false,
  loading: () => null,
});

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

function StaticHelixFallback({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`bg-[radial-gradient(ellipse_at_center,_rgba(94,234,212,0.35),_transparent_70%)] ${className ?? ""}`}
    >
      <svg viewBox="0 0 120 240" className="size-full opacity-60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 0 C 90 40, 90 80, 20 120 C -50 160, -50 200, 20 240"
          stroke="#5eead4"
          strokeWidth="2"
          transform="translate(40 0)"
        />
        <path
          d="M100 0 C 30 40, 30 80, 100 120 C 170 160, 170 200, 100 240"
          stroke="#a78bfa"
          strokeWidth="2"
          transform="translate(-40 0)"
        />
      </svg>
    </div>
  );
}

class HelixErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/**
 * Public entry point for the hero DNA helix. Renders a static gradient/SVG
 * fallback under reduced-motion, missing WebGL support, or any render error —
 * consumers should only ever import this, never dna-helix-scene directly.
 */
export function DnaHelix({ className }: { className?: string }) {
  const [canRender3d, setCanRender3d] = useState(false);

  useEffect(() => {
    setCanRender3d(!prefersReducedMotion() && supportsWebGL());
  }, []);

  if (!canRender3d) return <StaticHelixFallback className={className} />;

  return (
    <HelixErrorBoundary fallback={<StaticHelixFallback className={className} />}>
      <div className={className}>
        <DnaHelixScene />
      </div>
    </HelixErrorBoundary>
  );
}
