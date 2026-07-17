-- Prerna Beauty Bliss — seed data
-- Run AFTER schema.sql, in Supabase Dashboard → SQL Editor.
-- Seeds the Party Makeup category from docs/CONTENT.md. Re-running this
-- will error on duplicate slugs (by design, so you don't accidentally
-- double-insert) — safe to run once per fresh project.

-- ============================================================
-- Category: Party Makeup
-- ============================================================

insert into categories (name, slug, display_order)
values ('Party Makeup', 'party-makeup', 1);

-- ============================================================
-- Package: Basic Party Makeup
-- ============================================================

with cat as (select id from categories where slug = 'party-makeup')
insert into packages (category_id, name, slug, description, base_price)
select cat.id, 'Basic Party Makeup', 'basic-party-makeup',
  'Suitable for: Birthday, Office Party, Small Functions', 1500.00
from cat;

with pkg as (select id from packages where slug = 'basic-party-makeup')
insert into package_products (package_id, product_name, display_order)
select pkg.id, product_name, ordinality
from pkg, unnest(array[
  'Moisturizer', 'Primer', 'Foundation', 'Compact Powder', 'Concealer',
  'Neutral Eyeshadow', 'Kajal & Eyeliner', 'Mascara', 'Blush',
  'Highlighter', 'Lipstick', 'Makeup Setting Spray'
]) with ordinality as product_name;

-- ============================================================
-- Package: HD Party Makeup
-- ============================================================

with cat as (select id from categories where slug = 'party-makeup')
insert into packages (category_id, name, slug, description, base_price)
select cat.id, 'HD Party Makeup', 'hd-party-makeup',
  'Suitable for: Engagement, Reception, Anniversary', 3000.00
from cat;

with pkg as (select id from packages where slug = 'hd-party-makeup')
insert into package_products (package_id, product_name, display_order)
select pkg.id, product_name, ordinality
from pkg, unnest(array[
  'Skin Prep (Cleanser + Moisturizer)', 'HD Primer', 'HD Foundation',
  'HD Concealer', 'Cream Contour', 'Loose Powder', 'HD Compact',
  'Eye Primer', 'HD Eyeshadow Palette', 'Gel Eyeliner',
  'Waterproof Mascara', 'False Lashes', 'Blush', 'Highlighter',
  'Lip Liner', 'HD Lipstick', 'Setting Spray'
]) with ordinality as product_name;

-- ============================================================
-- Package: Glam Makeup
-- ============================================================

with cat as (select id from categories where slug = 'party-makeup')
insert into packages (category_id, name, slug, description, base_price)
select cat.id, 'Glam Makeup', 'glam-makeup',
  'Suitable for: Fashion Shoot, Cocktail, Wedding Guest', 2000.00
from cat;

with pkg as (select id from packages where slug = 'glam-makeup')
insert into package_products (package_id, product_name, display_order)
select pkg.id, product_name, ordinality
from pkg, unnest(array[
  'Hydrating Skin Prep', 'Illuminating Primer', 'Full Coverage Foundation',
  'Corrector & Concealer', 'Cream Contour', 'Loose Powder', 'Bronzer',
  'Glitter Eyeshadow', 'Pigments', 'Eyeliner', 'Dramatic Eyelashes',
  'Blush', 'Highlighter', 'Long-lasting Lipstick', 'Makeup Fixer'
]) with ordinality as product_name;

-- Note: package_images are NOT seeded here — the photos (Basic_party_makeup.jpeg,
-- HD_party_makeup.jpeg, glam_makeup.jpeg) still need to be uploaded to Supabase
-- Storage first, then their resulting URLs inserted into package_images.
-- That happens once Storage is set up (next step after this).
