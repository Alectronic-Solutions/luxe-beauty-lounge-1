# Luxe Beauty Lounge — Claude Code Reference

Portfolio demo site for Alectronic Solutions showcasing a premium web presence for a luxury day spa & salon.

## Project Overview

**Client archetype:** Affluent women 25–55, upscale suburban market  
**Purpose:** Alectronic Solutions portfolio demo — show prospective clients what a premium web presence looks like  
**Tone:** Luxurious but approachable. Confident, editorial, specific. Think Vogue meets your neighborhood. No clichés like "pamper yourself."

## Tech Stack

- **Framework:** Next.js 14, App Router, TypeScript
- **Styling:** Tailwind CSS with custom design tokens
- **Animation:** Framer Motion
- **Deployment:** Static export (`output: 'export'`) → Cloudflare Pages
- **Forms:** FormSubmit (no backend required)

## Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `plum` | `#1C0B2E` | Primary brand, hero backgrounds, footer |
| `champagne` | `#F5E6C8` | Accents, card highlights, warm tones |
| `rose-gold` | `#C8956C` | CTAs, hover states, star ratings |
| `ivory` | `#FAF7F2` | Page background, light sections |
| `charcoal` | `#1A1A1A` | Body text |

### Typography

- **Display/Headings:** Cormorant Garamond (300–600 weight) — loaded from Google Fonts
- **Body:** DM Sans (400–500 weight) — loaded from Google Fonts
- Editorial scale: hero headlines 72–96px, section heads 48–64px

### Spacing & Shape

- Border radius: cards 12–24px, buttons pill-shaped (9999px)
- Spacing: generous whitespace, editorial feel — prefer 80–120px section padding

## Animation Principles

- **Page entry:** staggered fade-up (`y: 40 → 0`, `opacity: 0 → 1`)
- **Scroll reveals:** Framer Motion `whileInView` with `once: true`, `viewport: { amount: 0.2 }`
- **Hover:** subtle scale (`1.02–1.04`), smooth 300ms transitions
- **Parallax:** hero image subtle parallax on scroll via `useScroll` + `useTransform`
- **Stagger children:** 0.1s delay increments via `staggerChildren`
- **Reduced motion:** always wrap animation variants with `@media (prefers-reduced-motion)` — use `shouldReduceMotion` from Framer Motion

```ts
// Pattern for reduced-motion-safe animations
const shouldReduceMotion = useReducedMotion();
const variants = {
  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
  visible: { opacity: 1, y: 0 },
};
```

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — 8 sections (see below) |
| `/services` | Full service menu with pricing |
| `/about` | Founder story, team, values |
| `/gallery` | Photo portfolio, masonry grid |
| `/booking` | Contact/booking form via FormSubmit |

## Home Sections (in order)

1. **Navbar** — glass morphism, sticky, logo + nav links + "Book Now" pill CTA
2. **Hero** — full-viewport, parallax background, editorial headline
3. **Brand Statement** — 2–3 sentences, large centered type
4. **Services Bento Grid** — 6 services, dominant card for Signature Facial
5. **About/Story** — split layout, founder photo placeholder + text
6. **Gallery Preview** — masonry/asymmetric grid, hover zoom + overlay
7. **Testimonials** — horizontal scroll or staggered cards with star ratings
8. **Booking CTA + Footer** — dark bg (#1C0B2E), form + contact info + socials

## Services

- **Signature Facial** ← hero/featured service
- Balayage & Color
- Bridal Packages
- Brow & Lash Artistry
- Body Treatments
- Nail Artistry

## Quality Gates (check before each commit)

- [ ] Mobile-first: test at 375px, 768px, 1280px
- [ ] All animations have `prefers-reduced-motion` fallback
- [ ] No layout shift on load (reserve image dimensions)
- [ ] Images use `next/image` with proper aspect ratios
- [ ] All interactive elements have visible focus states
- [ ] Color contrast AA minimum (plum bg + champagne text passes)
- [ ] No TypeScript errors (`npx tsc --noEmit`)

## File Structure

```
src/
  app/
    layout.tsx          # Root layout, fonts, metadata
    page.tsx            # Home page
    globals.css         # CSS variables, base styles
    services/page.tsx
    about/page.tsx
    gallery/page.tsx
    booking/page.tsx
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    home/
      Hero.tsx
      BrandStatement.tsx
      ServicesGrid.tsx
      AboutPreview.tsx
      GalleryPreview.tsx
      Testimonials.tsx
      BookingCTA.tsx
    ui/
      Button.tsx
      SectionHeading.tsx
      AnimatedSection.tsx
  lib/
    animations.ts       # Shared Framer Motion variants
    constants.ts        # Services, nav links, social links
```

## Key Commands

```bash
npm run dev       # Development server
npm run build     # Static export build
npm run lint      # ESLint
npx tsc --noEmit  # Type check only
```

## FormSubmit Setup

Forms POST to `https://formsubmit.co/{email}`. No backend needed. Configure:
- `_subject` hidden field for email subject
- `_captcha` set to `false` for demo
- `_next` redirect URL after submission

## Notes

- Static export means no server-side features (no API routes, no server actions with side effects)
- All images should be in `public/images/` and use `next/image`
- Placeholder images: use a consistent placeholder service or local SVG placeholders
- No `<Image>` `unoptimized` prop — configure `remotePatterns` in `next.config.ts` if using external image URLs
