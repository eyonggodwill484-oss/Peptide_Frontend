export interface Address {
  fullName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: {
    name: string;
    slug: string;
    sku: string;
    quantity: number;
    price: number;
    image: { src: string; alt: string };
  }[];
  shippingAddress: Address;
  billingAddress: Address;
  email: string;
  summary: {
    subtotal: number;
    shipping: number;
    tax: number;
    discount: number;
    total: number;
  };
  paymentMethodLabel: string;
  status: "processing" | "confirmed" | "shipped" | "delivered";
  placedAt: string;
}
