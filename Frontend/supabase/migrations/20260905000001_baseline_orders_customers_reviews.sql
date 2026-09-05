-- Baseline reconstruction of the orders/customers/order_items/reviews schema.
--
-- This schema previously existed only in the live Supabase project (created via
-- dashboard/SQL editor) and was documented by hand in src/types/database.types.ts,
-- referencing migration files that were never committed to this repo. This migration
-- recreates that schema idempotently (IF NOT EXISTS) so it's finally reproducible from
-- git, and adds it if the live project doesn't already have it.
--
-- Safe to run against a project that already has these tables: every statement is
-- guarded so it only creates what's missing.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- customers
-- ---------------------------------------------------------------------------
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  postal_code text,
  country text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists customers_email_key on public.customers (lower(email));

-- ---------------------------------------------------------------------------
-- orders
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'order_status') then
    create type public.order_status as enum ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');
  end if;
  if not exists (select 1 from pg_type where typname = 'payment_status') then
    create type public.payment_status as enum ('pending', 'paid', 'failed', 'refunded');
  end if;
end $$;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null,
  customer_id uuid not null references public.customers (id) on delete restrict,
  status public.order_status not null default 'pending',
  payment_status public.payment_status not null default 'pending',
  payment_method text,
  subtotal numeric(12, 2) not null default 0,
  shipping_fee numeric(12, 2) not null default 0,
  discount_code text,
  discount_amount numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  shipping_address jsonb,
  notes text,
  crypto_tx_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- In case an older/narrower version of this table already exists live (created by
-- hand before this migration existed), make sure the columns this email system needs
-- are present without touching existing data.
alter table public.orders add column if not exists payment_method text;
alter table public.orders add column if not exists discount_code text;
alter table public.orders add column if not exists discount_amount numeric(12, 2) not null default 0;
alter table public.orders add column if not exists crypto_tx_hash text;

create unique index if not exists orders_order_number_key on public.orders (order_number);
create index if not exists orders_customer_id_idx on public.orders (customer_id);

-- ---------------------------------------------------------------------------
-- order_items
-- ---------------------------------------------------------------------------
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  product_name text not null,
  unit_price numeric(12, 2) not null,
  quantity integer not null,
  line_total numeric(12, 2) not null,
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_id_idx on public.order_items (order_id);

-- ---------------------------------------------------------------------------
-- reviews (already in active use for reads; ensuring it exists for completeness)
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'review_status') then
    create type public.review_status as enum ('pending', 'approved', 'rejected');
  end if;
end $$;

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  customer_id uuid references public.customers (id) on delete set null,
  author_name text not null,
  author_email text,
  rating integer not null check (rating between 1 and 5),
  title text,
  body text not null,
  status public.review_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reviews_product_id_idx on public.reviews (product_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
--
-- The storefront never authenticates as a customer for checkout (guest-only), and all
-- order/customer writes and reads happen server-side via the service_role key. Anon/
-- authenticated roles get no access to these tables; reviews stays readable (approved
-- only) since the storefront already reads it with the anon key.
-- ---------------------------------------------------------------------------
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.reviews enable row level security;

drop policy if exists "reviews are publicly readable when approved" on public.reviews;
create policy "reviews are publicly readable when approved"
  on public.reviews for select
  to anon, authenticated
  using (status = 'approved');
