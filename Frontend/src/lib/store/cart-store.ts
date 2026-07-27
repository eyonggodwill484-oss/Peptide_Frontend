import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

import type { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.productId === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item
              ),
            };
          }
          const image = product.images[0];
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: { src: image?.src ?? "", alt: image?.alt ?? product.name },
                quantity,
                sku: product.sku,
              },
            ],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((item) => item.productId !== productId) })),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.productId !== productId)
              : state.items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "wardiere-cart" }
  )
);

export function useCartCount() {
  return useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
}

export function useCartSummary() {
  return useCartStore(
    useShallow((state) => {
      const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const shipping = subtotal === 0 ? 0 : subtotal >= 150 ? 0 : 12;
      const tax = Math.round(subtotal * 0.0625 * 100) / 100;
      const discount = 0;
      return { subtotal, shipping, tax, discount, total: subtotal + shipping + tax - discount };
    })
  );
}
