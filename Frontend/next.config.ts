import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets an agent-managed dev server run in its own build dir (NEXT_DIST_DIR=.next-agent)
  // alongside a manually-started one, so two concurrent `next dev` instances never
  // fight over the same .next files and corrupt each other's build cache.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
