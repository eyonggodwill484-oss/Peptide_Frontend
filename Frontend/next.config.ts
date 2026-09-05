import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Vercel's Image Optimization quota (counts every unique source image, local and
    // remote) is far smaller than this catalog's image count — once exceeded, image
    // requests return 402 and even the onError fallback image fails the same way.
    // Serving images unoptimized removes that dependency entirely; the local product
    // photos are already reasonably sized and the Cloudinary ones are pre-optimized.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.qrserver.com",
        pathname: "/**",
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only upload source maps in CI / Vercel to keep local builds blazing fast
  silent: true,
  sourcemaps: {
    disable: !process.env.CI && !process.env.VERCEL,
  },

  tunnelRoute: "/monitoring",
  disableLogger: true,
});
