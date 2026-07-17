-- Prerna Beauty Bliss — incremental seed: Bridal Makeup category
-- Run in Supabase Dashboard → SQL Editor, AFTER schema.sql and seed.sql
-- have already run. Only needs to run once.
--
-- Only prices are known so far — no "suitable for" descriptions or
-- product lists yet (see docs/CONTENT.md). Those can be added later
-- with simple UPDATE / INSERT statements once Prerna sends them.

insert into categories (name, slug, display_order)
values ('Bridal Makeup', 'bridal-makeup', 0);

with cat as (select id from categories where slug = 'bridal-makeup')
insert into packages (category_id, name, slug, base_price)
select cat.id, 'Basic Bridal Makeup', 'basic-bridal-makeup', 5999.00
from cat;

with cat as (select id from categories where slug = 'bridal-makeup')
insert into packages (category_id, name, slug, base_price)
select cat.id, 'Engagement/Reception Makeup', 'engagement-reception-makeup', 4000.00
from cat;

with cat as (select id from categories where slug = 'bridal-makeup')
insert into packages (category_id, name, slug, base_price)
select cat.id, 'Bridal HD Makeup', 'bridal-hd-makeup', 8000.00
from cat;
