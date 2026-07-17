# Build Plan & Progress Tracker

Tracks implementation against [prerna-beauty-bliss-website-plan.md](prerna-beauty-bliss-website-plan.md). Check items off as they're done. Add notes/dates inline as needed.

No online booking or payments in this build — every "Book Now" hands off to Instagram DM / WhatsApp chat.

---

## Phase 1 — MVP (launch this first)

### 1. Project setup
- [ ] Initialize Next.js 14 (App Router) + TypeScript
- [ ] Install & configure Tailwind CSS
- [ ] Create Supabase project (Postgres + Auth + Storage)
- [ ] Connect Vercel project, confirm auto-deploy from main branch
- [ ] Set up env vars (local `.env.local` + Vercel project settings)

### 2. Database schema + seed data
- [ ] Create tables: `admin_users`, `categories`, `packages`, `package_products`, `package_images`, `package_addons`, `stylists`, `portfolio_images`, `service_areas`
- [ ] Add indexes: `packages(category_id, is_active)`, `portfolio_images(category_id, is_active)`
- [x] Get real categories/packages/prices/products list from Prerna — Party Makeup category received (Basic/HD/Glam), see [CONTENT.md](CONTENT.md); more categories still pending
- [ ] Get stylist roster (names, photos, specialties, bios, socials) from Prerna
- [ ] Get before/after photos for portfolio gallery
- [ ] Get list of service areas from Prerna
- [ ] Seed DB with real data

### 3. Public pages
- [ ] Homepage: header/nav + sticky "Book Now" CTA
- [ ] Homepage: hero section (headline, dual CTA, trust badges)
- [ ] Homepage: services preview (category cards linking to `/services#slug`)
- [ ] Homepage: before/after transformations gallery
- [ ] Homepage: "Meet the Team" stylist grid → `/stylists`
- [ ] Homepage: Book Now banner + trust badges strip + photo gallery strip + footer
- [ ] Services page (`/services`) — all categories as anchor-linked sections, package cards per section
- [ ] Package detail page (`/services/[category]/[package-slug]`) — photos, description, products/brands, price, duration, add-ons
- [ ] Stylists page (`/stylists`) — full team roster
- [ ] `GET /api/categories`
- [ ] `GET /api/packages` (filter by category)
- [ ] `GET /api/packages/[slug]`
- [ ] `GET /api/stylists`
- [ ] `GET /api/portfolio` (filter by category)
- [ ] `GET /api/service-areas`

### 4. "Book Now" contact handoff
- [ ] Reusable Book Now component (modal/dropdown with Instagram + WhatsApp buttons)
- [ ] Instagram DM link: `https://ig.me/m/<handle>`
- [ ] WhatsApp click-to-chat link: `https://wa.me/<number>?text=...`
- [ ] Pre-fill message with package name + price when triggered from a package card/detail page
- [ ] Generic pre-fill message when triggered from header/global CTA
- [ ] Test both links on mobile (app deep-link) and desktop (web fallback)

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
