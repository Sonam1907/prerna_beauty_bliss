# Build Plan & Progress Tracker

Tracks implementation against [prerna-beauty-bliss-website-plan.md](prerna-beauty-bliss-website-plan.md). Check items off as they're done. Add notes/dates inline as needed.

No online booking or payments in this build — every "Book Now" hands off to Instagram DM / WhatsApp chat.

---

## Phase 1 — MVP (launch this first)

### 1. Project setup
- [x] Initialize Next.js (latest stable, App Router) + TypeScript
- [x] Install & configure Tailwind CSS
- [x] Create Supabase project (Postgres + Auth + Storage)
- [x] Connect Vercel project, confirm auto-deploy from main branch
- [x] Set up env vars (local `.env.local` + Vercel project settings)

### 2. Database schema + seed data
- [x] Create tables: `admin_users`, `categories`, `packages`, `package_products`, `package_images`, `package_addons`, `stylists`, `portfolio_images`, `service_areas`
- [x] Add indexes: `packages(category_id, is_active)`, `portfolio_images(category_id, is_active)`
- [x] Get real categories/packages/prices/products list from Prerna — Party Makeup (Basic/HD/Glam) fully detailed; Bridal Makeup (Basic/Engagement-Reception/HD) prices only so far; see [CONTENT.md](CONTENT.md)
- [ ] Get stylist roster (names, photos, specialties, bios, socials) from Prerna
- [ ] Get before/after photos for portfolio gallery
- [ ] Get list of service areas from Prerna
- [x] Seed DB with real data — Party Makeup seeded ([seed.sql](../supabase/seed.sql)); Bridal Makeup seed ready to run ([seed_bridal_makeup.sql](../supabase/seed_bridal_makeup.sql))

### 3. Public pages
- [x] Homepage: header/nav + sticky "Book Now" CTA
- [x] Homepage: hero section (headline, dual CTA)
- [x] Homepage: services preview (category cards linking to `/services#slug`)
- [x] Homepage: before/after transformations gallery — built, auto-hides until portfolio photos are seeded
- [x] Homepage: "Meet the Team" stylist grid — built, auto-hides until stylists are seeded (no separate `/stylists` page yet)
- [x] Homepage: Book Now CTA banner + footer; hygiene-promise section used in place of generic trust badges (real Prerna copy)
- [x] Services page (`/services`) — all categories as anchor-linked sections, package cards per section
- [x] Package detail page (`/services/[category]/[package-slug]`) — photos, description, products/brands, price, duration, add-ons
- [ ] Stylists page (`/stylists`) — full team roster (not needed until stylist content exists)
- [x] Data layer reads Supabase directly from Server Components — no separate public REST API routes (`/api/categories` etc.) built, since App Router doesn't need that indirection for server-rendered reads

### 4. "Book Now" contact handoff
- [x] Reusable Book Now component (dropdown with Instagram + WhatsApp buttons)
- [x] Instagram DM link: `https://ig.me/m/<handle>` — live with real handle @prerna_beauty_bliss_
- [x] WhatsApp click-to-chat link: `https://wa.me/<number>?text=...` — live with real number
- [x] Pre-fill message with package name + price when triggered from a package detail page (WhatsApp only — Instagram's deep link doesn't support pre-filled text)
- [x] Generic pre-fill message when triggered from header/global CTA
- [ ] Test both links on mobile (app deep-link) and desktop (web fallback) — verified links resolve correctly server-side; still needs an actual on-phone tap-through by Prerna/Sonam

### 5. Admin auth + content management
- [ ] Supabase Auth login for admin
- [ ] Package CRUD UI + `/api/admin/packages`
- [ ] Product/brand CRUD per package + `/api/admin/packages/[id]/products`
- [ ] Image upload (Supabase Storage) + `/api/admin/packages/[id]/images`
- [ ] Add-on CRUD per package + `/api/admin/packages/[id]/addons`
- [ ] Stylist CRUD UI + `/api/admin/stylists`
- [ ] Portfolio (before/after) CRUD UI + `/api/admin/portfolio`
- [ ] Service area CRUD UI + `/api/admin/service-areas`

### 6. SEO + polish
- [ ] Meta tags, sitemap
- [ ] Mobile-responsive pass on all pages
- [ ] ISR/static rendering for all content pages

### 7. Launch
- [ ] End-to-end test: browse → package detail → Book Now → confirm Instagram/WhatsApp opens correctly on mobile + desktop
- [ ] Deploy to production domain

---

## Parallel prerequisites (don't block dev, but block launch)
- [ ] Domain name purchased
- [ ] Logo/branding photos gathered
- [ ] Final categories/packages/prices/products list from Prerna
- [ ] Stylist roster (photos, names, specialties, bios, social handles) from Prerna
- [ ] Before/after photos for portfolio gallery from Prerna
- [x] Instagram handle confirmed (business/creator account, DMs open) — @prerna_beauty_bliss_
- [x] WhatsApp business number confirmed — +91 88279 87837
- [ ] List of service areas from Prerna

---

## Phase 2 (only if the business grows into needing it)
- [ ] Reviews/testimonials section
- [ ] Simple visitor stats via Vercel Analytics
- [ ] Revisit online booking + payments as a separate future project

## Phase 3 (later)
- [ ] Marketing pages/blog for SEO
- [ ] Multi-location support
