-- Tables backing the transactional + cart-recovery email system.
-- All access happens server-side via the service_role key (API routes, server actions,
-- the cron job) — no anon/authenticated policies are needed since customers never query
-- these directly.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- cart_sessions
--
-- One row per (email) with their most recent cart snapshot. Upserted whenever we learn
-- a visitor's email against a non-empty cart (checkout email field blur, cart page
-- "email my cart"). The abandoned-cart cron scans this table for rows with no matching
-- order and walks them through a reminder sequence via recovery_stage.
-- ---------------------------------------------------------------------------
create table if not exists public.cart_sessions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  items jsonb not null default '[]'::jsonb,
  subtotal numeric(12, 2) not null default 0,
  currency text not null default 'EUR',
  last_active_at timestamptz not null default now(),
  recovery_stage integer not null default 0,
  last_recovery_sent_at timestamptz,
  recovered_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists cart_sessions_email_key on public.cart_sessions (lower(email));
create index if not exists cart_sessions_recovery_lookup_idx
  on public.cart_sessions (recovery_stage, last_active_at)
  where recovered_at is null and unsubscribed_at is null;

alter table public.cart_sessions enable row level security;

-- ---------------------------------------------------------------------------
-- discount_codes
--
-- Minimal coupon system. Seeded with the abandoned-cart recovery codes; also usable for
-- general promo codes later. Redemption increments used_count (see redeem function
-- below) so codes with a max_uses cap can't be over-applied under concurrent checkouts.
-- ---------------------------------------------------------------------------
create table if not exists public.discount_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  type text not null check (type in ('percent', 'fixed')),
  value numeric(12, 2) not null,
  scope text not null default 'general' check (scope in ('general', 'abandoned_cart')),
  max_uses integer,
  used_count integer not null default 0,
  active boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists discount_codes_code_key on public.discount_codes (upper(code));

alter table public.discount_codes enable row level security;

create or replace function public.redeem_discount_code(p_code text)
returns public.discount_codes
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.discount_codes;
begin
  select * into v_row
  from public.discount_codes
  where upper(code) = upper(p_code)
    and active
    and (expires_at is null or expires_at > now())
    and (max_uses is null or used_count < max_uses)
  for update;

  if not found then
    return null;
  end if;

  update public.discount_codes
  set used_count = used_count + 1
  where id = v_row.id
  returning * into v_row;

  return v_row;
end;
$$;

create or replace function public.peek_discount_code(p_code text)
returns public.discount_codes
language sql
security definer
set search_path = public
stable
as $$
  select *
  from public.discount_codes
  where upper(code) = upper(p_code)
    and active
    and (expires_at is null or expires_at > now())
    and (max_uses is null or used_count < max_uses)
  limit 1;
$$;

insert into public.discount_codes (code, type, value, scope, max_uses)
values
  ('COMEBACK10', 'percent', 10, 'abandoned_cart', null),
  ('COMEBACK15', 'percent', 15, 'abandoned_cart', null)
on conflict (upper(code)) do nothing;

-- ---------------------------------------------------------------------------
-- email_events
--
-- Append-only log of every email we send. Used both for the idempotency check
-- ("has this cart_session already gotten its 24hr recovery email?") and for debugging
-- delivery issues via the Resend message id.
-- ---------------------------------------------------------------------------
create table if not exists public.email_events (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  recipient text not null,
  related_type text,
  related_id uuid,
  resend_message_id text,
  status text not null default 'sent' check (status in ('sent', 'failed')),
  error text,
  created_at timestamptz not null default now()
);

create index if not exists email_events_related_idx on public.email_events (related_type, related_id);
create index if not exists email_events_recipient_type_idx on public.email_events (recipient, type);

alter table public.email_events enable row level security;
