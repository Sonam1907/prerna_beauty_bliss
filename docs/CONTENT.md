# Real Content from Prerna

Source of truth for seeding the database and writing site copy. Update this file as more content arrives from Prerna — it's structured to map directly onto the schema in [prerna-beauty-bliss-website-plan.md](prerna-beauty-bliss-website-plan.md), so it can be turned into a seed script once Supabase is set up.

**Images:** drop photos in the `Images/` folder at the project root (that's the convention already in use). It's git-ignored — images don't get committed directly to git, they'll be uploaded to Supabase Storage via a one-time seed script once the project is set up, and only the resulting URLs get stored in the database. Current files received:
- `Basic_party_makeup.jpeg` → Basic Party Makeup package
- `HD_party_makeup.jpeg` → HD Party Makeup package
- `glam_makeup.jpeg` → Glam Makeup package
- `HD_Bridal_makeup.jpeg` → doesn't match any package received so far (no Bridal Makeup content yet) — holding as pending until the Bridal Makeup category details arrive

---

## Category: Party Makeup (slug: `party-makeup`)

### Package: Basic Party Makeup (slug: `basic-party-makeup`)
- Suitable for: Birthday, Office Party, Small Functions
- Price: ₹1,500
- Products used: Moisturizer, Primer, Foundation, Compact Powder, Concealer, Neutral Eyeshadow, Kajal & Eyeliner, Mascara, Blush, Highlighter, Lipstick, Makeup Setting Spray
- Images: pending

### Package: HD Party Makeup (slug: `hd-party-makeup`)
- Suitable for: Engagement, Reception, Anniversary
- Price: ₹3,000
- Products used: Skin Prep (Cleanser + Moisturizer), HD Primer, HD Foundation, HD Concealer, Cream Contour, Loose Powder, HD Compact, Eye Primer, HD Eyeshadow Palette, Gel Eyeliner, Waterproof Mascara, False Lashes, Blush, Highlighter, Lip Liner, HD Lipstick, Setting Spray
- Images: pending

### Package: Glam Makeup (slug: `glam-makeup`)
- Suitable for: Fashion Shoot, Cocktail, Wedding Guest
- Price: ₹2,000
- Products used: Hydrating Skin Prep, Illuminating Primer, Full Coverage Foundation, Corrector & Concealer, Cream Contour, Loose Powder, Bronzer, Glitter Eyeshadow, Pigments, Eyeliner, Dramatic Eyelashes, Blush, Highlighter, Long-lasting Lipstick, Makeup Fixer
- Images: pending

> Note: Glam Makeup (₹2,000) is priced lower than HD Party Makeup (₹3,000) despite being positioned for more premium occasions (wedding guest, cocktail, fashion shoot). Worth a quick double-check with Prerna that this is intentional and not a typo — easy to fix now, awkward once it's live.

---

## Site-wide content (not tied to a single package)

### Premium Product Brands Used
Forever52, Huda Beauty, Kryolan, MAC Cosmetics, PAC Cosmetics, Maybelline, L'Oréal Paris, LA Girl, Swiss Beauty, Lakmé, Kay Beauty, Colorbar, Nykaa Cosmetics, Makeup Revolution

Treated as static homepage/services-page content (e.g. a logo/text strip), not a database table — rarely changes, not worth a CRUD screen. Can be promoted to an admin-editable `brands` table later if that changes.

### Hygiene & Quality Promise
- Sanitized Brushes After Every Client
- Disposable Mascara Wands & Lip Applicators
- Premium Quality Products
- Long-lasting Waterproof Makeup
- Customized Makeup According to Skin Type

This replaces the generic trust-badge placeholder copy ("Expert Stylists", "Hygienic & Safe", etc.) from the original homepage layout reference — use her real wording on the actual site.

---

## Contact details (confirmed)
- Instagram: [@prerna_beauty_bliss_](https://www.instagram.com/prerna_beauty_bliss_/) — verified live account ("Prerna | Vidisha based | Makeup artist")
- WhatsApp: +91 88279 87837

## Still needed from Prerna
- Categories beyond Party Makeup (Bridal Makeup, Mehendi, Hairstyle, Draping, etc.) with the same level of detail
- Package add-ons, if any (e.g. extra hairstyle change, saree draping add-on)
- Stylist roster (names, photos, specialties, bios, socials)
- Before/after portfolio photos
- Service areas list
