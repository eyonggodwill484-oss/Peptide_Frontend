import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/*",
        "/en/admin",
        "/en/admin/*",
        "/api",
        "/api/*",
        "/cart",
        "/cart/*",
        "/en/cart",
        "/en/cart/*",
        "/checkout",
        "/checkout/*",
        "/en/checkout",
        "/en/checkout/*",
        "/account",
        "/account/*",
        "/en/account",
        "/en/account/*",
        "/order-success",
        "/order-success/*",
        "/en/order-success",
        "/en/order-success/*",
        "/search",
        "/search/*",
        "/en/search",
        "/en/search/*",
        "/login",
        "/login/*",
        "/en/login",
        "/en/login/*",
        "/signup",
        "/signup/*",
        "/en/signup",
        "/en/signup/*",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
