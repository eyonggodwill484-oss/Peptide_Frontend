import posthog from "posthog-js";

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

export function initPostHog() {
  if (typeof window !== "undefined" && POSTHOG_KEY) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: "identified_only",
      capture_pageview: false, // We handle pageviews manually in Next.js App Router
      capture_pageleave: true,
      autocapture: true,
    });
  }
}

export function captureEvent(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && POSTHOG_KEY) {
    posthog.capture(eventName, properties);
  }
}

export function identifyUser(userId: string, userProperties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && POSTHOG_KEY) {
    posthog.identify(userId, userProperties);
  }
}

export function resetUser() {
  if (typeof window !== "undefined" && POSTHOG_KEY) {
    posthog.reset();
  }
}

// E-commerce tracking helpers
export const trackAnalytics = {
  viewProduct: (product: { id: string; name: string; price: number; categorySlug?: string }) => {
    captureEvent("product_viewed", {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      category: product.categorySlug,
    });
  },
  addToCart: (product: { id: string; name: string; price: number }, quantity: number) => {
    captureEvent("cart_item_added", {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      quantity,
      value: product.price * quantity,
    });
  },
  removeFromCart: (productId: string) => {
    captureEvent("cart_item_removed", { product_id: productId });
  },
  initiateCheckout: (total: number, itemCount: number) => {
    captureEvent("checkout_initiated", {
      cart_total: total,
      item_count: itemCount,
    });
  },
  orderPlaced: (order: { orderNumber: string; total: number; paymentMethod: string; shippingMethod: string }) => {
    captureEvent("order_completed", {
      order_number: order.orderNumber,
      total_amount: order.total,
      payment_method: order.paymentMethod,
      shipping_method: order.shippingMethod,
    });
  },
};
