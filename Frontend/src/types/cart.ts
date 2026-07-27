export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: {
    src: string;
    alt: string;
  };
  quantity: number;
  sku: string;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}
