// Hand-written to match supabase/migrations/20260717000001_init_schema.sql,
// 20260717000002_orders_customers_reviews.sql, 20260905000001_baseline_orders_customers_reviews.sql
// and 20260905000002_email_system_tables.sql.
// Regenerate once the Supabase CLI is available:
//   npx supabase gen types typescript --project-id xdannklctxudwrpwqlki > src/types/database.types.ts

export type CategoryStatus = "active" | "inactive";
export type ProductStatus = "draft" | "published";
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type ReviewStatus = "pending" | "approved" | "rejected";

export type ShippingAddress = {
  name: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state?: string | null;
  postalCode: string;
  country: string;
  phone?: string | null;
};

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image: string | null;
          status: CategoryStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image?: string | null;
          status?: CategoryStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image?: string | null;
          status?: CategoryStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          short_description: string | null;
          description: string | null;
          price: number;
          discount_price: number | null;
          sku: string | null;
          brand: string | null;
          stock: number;
          featured: boolean;
          best_seller: boolean;
          status: ProductStatus;
          rating: number;
          category_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          short_description?: string | null;
          description?: string | null;
          price: number;
          discount_price?: number | null;
          sku?: string | null;
          brand?: string | null;
          stock?: number;
          featured?: boolean;
          best_seller?: boolean;
          status?: ProductStatus;
          rating?: number;
          category_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          short_description?: string | null;
          description?: string | null;
          price?: number;
          discount_price?: number | null;
          sku?: string | null;
          brand?: string | null;
          stock?: number;
          featured?: boolean;
          best_seller?: boolean;
          status?: ProductStatus;
          rating?: number;
          category_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          image_url: string;
          public_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          image_url: string;
          public_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          image_url?: string;
          public_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      customers: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          address_line1: string | null;
          address_line2: string | null;
          city: string | null;
          state: string | null;
          postal_code: string | null;
          country: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          city?: string | null;
          state?: string | null;
          postal_code?: string | null;
          country?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          city?: string | null;
          state?: string | null;
          postal_code?: string | null;
          country?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          customer_id: string;
          status: OrderStatus;
          payment_status: PaymentStatus;
          payment_method: string | null;
          subtotal: number;
          shipping_fee: number;
          discount_code: string | null;
          discount_amount: number;
          total: number;
          shipping_address: ShippingAddress | null;
          notes: string | null;
          crypto_tx_hash: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number?: string;
          customer_id: string;
          status?: OrderStatus;
          payment_status?: PaymentStatus;
          payment_method?: string | null;
          subtotal?: number;
          shipping_fee?: number;
          discount_code?: string | null;
          discount_amount?: number;
          total?: number;
          shipping_address?: ShippingAddress | null;
          notes?: string | null;
          crypto_tx_hash?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          customer_id?: string;
          status?: OrderStatus;
          payment_status?: PaymentStatus;
          payment_method?: string | null;
          subtotal?: number;
          shipping_fee?: number;
          discount_code?: string | null;
          discount_amount?: number;
          total?: number;
          shipping_address?: ShippingAddress | null;
          notes?: string | null;
          crypto_tx_hash?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
        ];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          product_name: string;
          unit_price: number;
          quantity: number;
          line_total: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          product_name: string;
          unit_price: number;
          quantity: number;
          line_total: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          product_name?: string;
          unit_price?: number;
          quantity?: number;
          line_total?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          customer_id: string | null;
          author_name: string;
          author_email: string | null;
          rating: number;
          title: string | null;
          body: string;
          status: ReviewStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          customer_id?: string | null;
          author_name: string;
          author_email?: string | null;
          rating: number;
          title?: string | null;
          body: string;
          status?: ReviewStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          customer_id?: string | null;
          author_name?: string;
          author_email?: string | null;
          rating?: number;
          title?: string | null;
          body?: string;
          status?: ReviewStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reviews_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
        ];
      };
      cart_sessions: {
        Row: {
          id: string;
          email: string;
          items: CartSnapshotItem[];
          subtotal: number;
          currency: string;
          last_active_at: string;
          recovery_stage: number;
          last_recovery_sent_at: string | null;
          recovered_at: string | null;
          unsubscribed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          items?: CartSnapshotItem[];
          subtotal?: number;
          currency?: string;
          last_active_at?: string;
          recovery_stage?: number;
          last_recovery_sent_at?: string | null;
          recovered_at?: string | null;
          unsubscribed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          items?: CartSnapshotItem[];
          subtotal?: number;
          currency?: string;
          last_active_at?: string;
          recovery_stage?: number;
          last_recovery_sent_at?: string | null;
          recovered_at?: string | null;
          unsubscribed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      discount_codes: {
        Row: {
          id: string;
          code: string;
          type: DiscountType;
          value: number;
          scope: DiscountScope;
          max_uses: number | null;
          used_count: number;
          active: boolean;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          type: DiscountType;
          value: number;
          scope?: DiscountScope;
          max_uses?: number | null;
          used_count?: number;
          active?: boolean;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          type?: DiscountType;
          value?: number;
          scope?: DiscountScope;
          max_uses?: number | null;
          used_count?: number;
          active?: boolean;
          expires_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      email_events: {
        Row: {
          id: string;
          type: string;
          recipient: string;
          related_type: string | null;
          related_id: string | null;
          resend_message_id: string | null;
          status: "sent" | "failed";
          error: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          type: string;
          recipient: string;
          related_type?: string | null;
          related_id?: string | null;
          resend_message_id?: string | null;
          status?: "sent" | "failed";
          error?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          type?: string;
          recipient?: string;
          related_type?: string | null;
          related_id?: string | null;
          resend_message_id?: string | null;
          status?: "sent" | "failed";
          error?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      redeem_discount_code: {
        Args: { p_code: string };
        Returns: Database["public"]["Tables"]["discount_codes"]["Row"] | null;
      };
      peek_discount_code: {
        Args: { p_code: string };
        Returns: Database["public"]["Tables"]["discount_codes"]["Row"] | null;
      };
    };
    Enums: Record<string, never>;
  };
};

export type DiscountType = "percent" | "fixed";
export type DiscountScope = "general" | "abandoned_cart";

export type CartSnapshotItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
};
