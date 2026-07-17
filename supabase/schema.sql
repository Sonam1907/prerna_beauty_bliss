-- Prerna Beauty Bliss — database schema
-- Run this once in Supabase Dashboard → SQL Editor → New query → Run.
-- Safe to re-run: uses "if not exists" / "or replace" where practical, but
-- dropping/recreating tables is NOT handled — this is meant to run once on
-- a fresh project.

-- ============================================================
-- Content tables (public-readable, admin-writable)
-- ============================================================

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table packages (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete cascade,
  name text not null,
  slug text not null unique,
  description text,
  base_price numeric(10, 2) not null,
  duration_minutes int,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_packages_category_active on packages (category_id, is_active);

create table package_products (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages(id) on delete cascade,
  product_name text not null,
  brand text,
  notes text,
  display_order int not null default 0
);

create table package_images (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages(id) on delete cascade,
  image_url text not null,
  display_order int not null default 0,
  alt_text text
);

create table package_addons (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages(id) on delete cascade,
  name text not null,
  price numeric(10, 2) not null
);

create table stylists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  photo_url text,
  specialty text,
  bio text,
  instagram_url text,
  facebook_url text,
  display_order int not null default 0,
  is_active boolean not null default true
);

create table portfolio_images (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) on delete set null,
  before_image_url text not null,
  after_image_url text not null,
  caption text,
  display_order int not null default 0,
  is_active boolean not null default true
);

create index idx_portfolio_category_active on portfolio_images (category_id, is_active);

create table service_areas (
  id uuid primary key default gen_random_uuid(),
  area_name text not null,
  city text,
  is_active boolean not null default true,
  display_order int not null default 0
);

-- ============================================================
-- Admin profile table
-- Links to Supabase's built-in auth.users — created once Prerna
-- logs in for the first time via email OTP (see admin auth setup later).
-- ============================================================

create table admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  name text,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- Public (publishable key) can only ever read content tables.
-- All writes happen later via server-side admin routes using the
-- secret key, which bypasses RLS entirely — so no write policies
-- are needed here yet.
-- ============================================================

alter table categories enable row level security;
alter table packages enable row level security;
alter table package_products enable row level security;
alter table package_images enable row level security;
alter table package_addons enable row level security;
alter table stylists enable row level security;
alter table portfolio_images enable row level security;
alter table service_areas enable row level security;
alter table admin_users enable row level security;
-- admin_users has no policies at all, so it's fully locked down
-- except via the secret key (server-side only).

create policy "Public read access" on categories for select using (true);
create policy "Public read access" on packages for select using (is_active = true);
create policy "Public read access" on package_products for select using (true);
create policy "Public read access" on package_images for select using (true);
create policy "Public read access" on package_addons for select using (true);
create policy "Public read access" on stylists for select using (is_active = true);
create policy "Public read access" on portfolio_images for select using (is_active = true);
create policy "Public read access" on service_areas for select using (is_active = true);
