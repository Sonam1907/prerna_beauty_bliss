# Prerna Beauty Bliss — Full Website Build Plan

Handoff document for Claude Code. Covers scope, architecture, stack, schema, and build order for a service-catalog website for a beauty parlour business — no online booking or payments, direct contact via Instagram/WhatsApp instead.

---

## 1. What we're building

A production website with two sides:

**Customer side (public):**
- Browse service categories: bridal/party makeup, mehendi, hairstyle, draping, and any others she adds
- Each package shows: photos, description, products/brands used, price, duration, add-ons
- Browse the team of stylists (photos, specialties, socials) and a before/after portfolio of real transformations
- **"Book Now" on any package (and globally in the header) opens two options: message on Instagram or message on WhatsApp — both pre-filled with the package name/price so Prerna has context immediately**
- All scheduling, availability, and payment happen off-platform, in DM — the website's job is to inform and hand off the conversation, not to process the booking

**Admin side (Prerna only, password-protected):**
- Add/edit/delete packages, prices, product lists, categories, photos
- Add/edit/delete stylist profiles
- Add/edit/delete before/after portfolio images
- Add/edit the list of areas she serves (informational only — no availability/fee logic)

**Key design decision — no booking or payment system:**
Because the business is small and Prerna prefers to handle scheduling and payment herself, directly with each customer, the site does not collect bookings or money at all. Every "Book Now" button is just a deep link into a conversation — `https://ig.me/m/<handle>` for Instagram DM, `https://wa.me/<number>?text=...` for WhatsApp click-to-chat — with the message pre-filled with which package the customer was looking at. This keeps the site simple, avoids payment/refund complexity entirely, and matches how small Indian service businesses actually operate — customers already expect to finalize details over WhatsApp/Instagram.

---

## 2. Site structure & pages

**Homepage (`/`)**
- Header: logo, nav (Home / About / Services / Stylists / Gallery / Reviews / Contact), sticky "Book Now" CTA (opens Instagram/WhatsApp choice)
- Hero: headline, subtext, dual CTA (Book Now / Explore Services), hero image, trust-badge strip (Expert Stylists, Premium Products, Hygienic & Safe, Customer Satisfaction)
- Services preview: category cards (icon, name, short description, starting price, "Book Now") — each card links to `/services#{category-slug}`
- Before & After: portfolio gallery of real transformations
- Meet the Team: stylist grid (photo, name, specialty, social links), "View All Stylists" → `/stylists`
- Book Now banner (secondary CTA strip)
- Trust-badge strip (Real Client Results, Top Rated, Transparent Pricing, Hygiene Guaranteed)
- Photo gallery strip (real parlour/work photos)
- Footer: Instagram + WhatsApp links, contact info, business hours

**Services page (`/services`)**
- All categories rendered as sections on one page, each with `id={category.slug}` for anchor-linking
- Each section lists that category's packages as cards (name, short description, starting price, duration, "View Details")
- Clicking a category card on the homepage jumps straight to its section (`/services#bridal-makeup`)
- Clicking an individual package card goes to its full detail page

**Package detail page (`/services/[category]/[package-slug]`)**
- Photo gallery, full description, products/brands used, add-ons, price, duration
- "Book Now" → Instagram/WhatsApp choice, message pre-filled with this specific package's name and price

**Stylists page (`/stylists`)** — full team roster with bios

**"Book Now" component** — used everywhere (header, package cards, package detail, CTA banners). Opens a small modal or dropdown with two buttons:
- "Message on Instagram" → `https://ig.me/m/<handle>`
- "Message on WhatsApp" → `https://wa.me/<number>?text=<url-encoded prefilled message>`
- When triggered from a specific package, the pre-filled text includes that package's name/price (e.g. "Hi! I'm interested in the Bridal Glow Package (₹15,000). Please let me know availability."). When triggered generically (header CTA), a generic greeting is used instead.

---

## 3. Tech stack (free-tier first, low-latency, scales later)

| Layer | Choice | Why |
|---|---|---|
| Frontend + backend | **Next.js (latest stable, App Router)**, TypeScript | One codebase, server-side rendering for SEO ("bridal makeup artist near me"), image optimization built in |
| Styling | Tailwind CSS | Fast to build, small bundle |
| Database | **Postgres via Supabase** (free tier) | Free managed Postgres + built-in Auth + file Storage, all in one free project — lets Prerna update prices/photos/stylists herself without a developer |
| Auth (admin) | Supabase Auth, email OTP (magic code, no password) | One login for Prerna — nothing to forget or leak, just a code sent to her email each time |
| File/image storage | Supabase Storage | Package photos, portfolio images, stylist photos |
| Hosting | **Vercel** (free/hobby tier) | Native Next.js hosting, global CDN, auto HTTPS, near-zero config |
| Monitoring | Vercel Analytics (free) + Sentry (free tier) | Catch errors/slow pages early |

This entire stack runs at **$0/month**, indefinitely at small-business traffic levels. There's no payment gateway, no WhatsApp Business API integration, no SMS/email service, and no caching layer to manage — because there's no live availability lookup or booking write path, just a content catalog. If she later wants online booking/payments, that's a distinct future project (see Phase 2 note below), not something this build needs.

---

## 4. Database schema (Postgres / Supabase)

```
admin_users
  id, email (auth handled by Supabase Auth via email OTP, no password stored), name, role, created_at

categories
  id, name (Bridal Makeup, Party Makeup, Mehendi, Hairstyle, Draping, ...), slug, display_order

packages
  id, category_id (fk), name, slug, description, base_price, duration_minutes,
  is_active, created_at, updated_at

package_products   -- products/brands used in a package
  id, package_id (fk), product_name, brand, notes, display_order

package_images
  id, package_id (fk), image_url, display_order, alt_text

package_addons     -- optional extras (e.g. extra hairstyle change, saree draping add-on)
  id, package_id (fk), name, price

stylists            -- team roster, display only
  id, name, photo_url, specialty, bio, instagram_url, facebook_url, display_order, is_active

portfolio_images    -- before/after transformation gallery
  id, category_id (fk), before_image_url, after_image_url, caption, display_order, is_active

service_areas        -- informational list of areas she serves, no booking logic attached
  id, area_name, city, is_active, display_order
```

No `bookings`, `payments`, `availability_days/slots`, or `notification_log` tables — there's nothing to book or pay for on the site itself.

Indexes to add from day one: `packages(category_id, is_active)`, `portfolio_images(category_id, is_active)` — the lookups that run on every page load.

---

## 5. Core flow

### 5.1 Browsing → contact handoff
1. Customer browses categories/packages/stylists/portfolio — all served as static/ISR-rendered pages (fast, cached at Vercel's edge, no live DB hit per page view).
2. Customer taps "Book Now" on a package (or the header CTA).
3. A small choice appears: Message on Instagram / Message on WhatsApp.
4. Tapping either opens that app (or web fallback) with a pre-filled message referencing the specific package, ready to send.
5. Prerna receives the DM, confirms availability, price, and payment directly with the customer — entirely outside the website.

### 5.2 Admin content management
Standard authenticated CRUD screens: package editor (with image upload to Supabase Storage), stylist editor, portfolio editor, service-area list editor. No calendar, no bookings table, no payment status to track.

---

## 6. API endpoints (Next.js route handlers)

```
Public
  GET  /api/categories
  GET  /api/packages                 (filter by category)
  GET  /api/packages/[slug]
  GET  /api/stylists
  GET  /api/portfolio                (filter by category)
  GET  /api/service-areas

Admin (auth required)
  GET/POST/PATCH/DELETE /api/admin/packages
  GET/POST/PATCH/DELETE /api/admin/packages/[id]/products
  GET/POST/PATCH/DELETE /api/admin/packages/[id]/images
  GET/POST/PATCH/DELETE /api/admin/packages/[id]/addons
  GET/POST/PATCH/DELETE /api/admin/stylists
  GET/POST/PATCH/DELETE /api/admin/portfolio
  GET/POST/PATCH/DELETE /api/admin/service-areas
```

No webhook, payment, or booking routes — there's nothing external to integrate with.

---

## 7. Non-functional requirements

- **Low latency:** static/ISR rendering for all pages (content changes rarely — regenerate every few minutes, not on every request), served from Vercel's edge CDN globally.
- **Security:** admin routes behind Supabase Auth session check; sanitize all admin-entered input; HTTPS everywhere (default on Vercel).
- **Backups:** Supabase free tier includes daily backups.
- **Mobile-first design:** most customers will browse on a phone and tap straight into the Instagram/WhatsApp apps — the Book Now flow must work smoothly on mobile web.

---

## 8. Build order (phased)

**Phase 1 — MVP (launch this first)**
1. Project setup: Next.js + Tailwind + Supabase project + Vercel deploy pipeline
2. DB schema + seed with her real categories/packages/prices/stylists/portfolio photos
3. Public pages: homepage (hero, services preview, before/after, team, CTA banner, gallery strip), anchor-linked services page, package detail page, stylists page
4. "Book Now" component: Instagram DM + WhatsApp click-to-chat, pre-filled message per package
5. Admin auth + content CRUD: packages, products, images, add-ons, stylists, portfolio, service areas
6. Basic SEO (meta tags, sitemap) + mobile responsive polish
7. Deploy, test end-to-end on mobile and desktop, launch

**Phase 2 (only if the business grows into needing it)**
- Reviews/testimonials section
- Simple visitor stats via Vercel Analytics (popular packages, traffic sources)
- Revisit online booking + payments as its own project, if manual DM coordination stops scaling

**Phase 3**
- Marketing pages/blog for SEO
- Multi-location support if she expands

---

## 9. What you'll need before Claude Code starts building

- Final list of categories, packages, prices, and products/brands used per package (from Prerna)
- Stylist roster: names, photos, specialties, bios, social handles
- Before/after photos for the transformations gallery
- Instagram handle (confirm it's a business/creator account with DMs open) and WhatsApp business number for click-to-chat
- Domain name for the site
- Logo/branding photos for the homepage and package galleries
- List of areas she serves (for the informational service-area section)

Nothing here has a multi-day lead time like Razorpay KYC did in the old payment-based plan — the longest lead item is just gathering photos/content from Prerna, which can happen in parallel with development.
