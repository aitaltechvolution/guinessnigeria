# Guinness Nigeria — "Dark Matter" Redesign

> **Stack:** React 18 + Tailwind CSS 3 + Framer Motion + GSAP
> **Status:** ✅ COMPLETE — All 7 parts built and integrated

---

## Quick Start

```bash
npm install
npm run dev       # → http://localhost:5173
npm run build     # production build → /dist
npm run preview   # preview the production build
```

---

## Project Structure

```
guinness-nigeria/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── UI.jsx               ← Reusable atoms (Pill, GoldLine, Buttons, Cards, SplitText)
│   │   ├── Cursor.jsx            ← Custom gold magnetic cursor
│   │   ├── AmbientBackground.jsx ← Canvas gold particle field
│   │   ├── AgeGate.jsx            ← Legal age verification
│   │   └── PageLoader.jsx         ← Cinematic intro loader
│   ├── sections/
│   │   ├── Navbar.jsx             ← Part 7 — sticky nav + mobile menu
│   │   ├── Hero.jsx               ← Part 2 — 3D can + cinematic intro
│   │   ├── Products.jsx           ← Part 3 — animated product showcase
│   │   ├── BrandStory.jsx         ← Part 4 — "Made of More" scroll story
│   │   ├── News.jsx                ← Part 5 — news/content hub
│   │   ├── Sustainability.jsx     ← Part 6 — sustainability + careers
│   │   └── Footer.jsx              ← Part 7 — mega footer
│   ├── hooks/
│   │   └── index.js               ← useScrollPosition, useMousePosition, useTilt, useCountUp, useReducedMotion
│   ├── utils/
│   │   ├── animations.js          ← Framer Motion variants + GSAP helpers
│   │   └── constants.js           ← Brand data, nav, products, stats, jobs
│   ├── App.jsx                    ← Root shell — assembles everything
│   ├── main.jsx
│   └── index.css                  ← Global styles, Tailwind layers, a11y
├── tailwind.config.js             ← Full "Dark Matter" brand token system
├── vite.config.js
├── postcss.config.js
└── package.json
```

---

## Design System: "Dark Matter"

| Token        | Value     | Use                        |
|--------------|-----------|----------------------------|
| `g-void`     | `#050505` | Page background            |
| `g-black`    | `#0A0A0A` | Primary surface            |
| `g-gold`     | `#C9963A` | Primary accent             |
| `g-goldHi`   | `#E8B84B` | Highlight / hover          |
| `g-goldFoam` | `#F5D98A` | Cream-gold accents         |
| `g-cream`    | `#F2EDD7` | Body text                  |
| `g-red`      | `#C0392B` | Label red                  |

**Fonts:** Playfair Display (headings) · Inter (body/UI)

---

## Page Flow

1. **PageLoader** — 1.4s cinematic "G" pulse + gold line draw
2. **AgeGate** — legal drinking age verification (sessionStorage)
3. **Navbar** — transparent → solid on scroll, animated mobile menu
4. **Hero** — CSS 3D animated can with mouse-tracking tilt, liquid pour particle canvas, headline pour-in animation
5. **Products** — draggable horizontal carousel of 5 brands, 3D card tilt, animated SVG cans with liquid fill, active product feature strip
6. **BrandStory** — chapter cards, animated stat counters, parallax quote, 60-year timeline
7. **News** — featured story, category filter (shared layout animation), animated card grid
8. **Sustainability + Careers** — SVG progress rings, pillar cards, magnetic CTA, glassmorphism job cards, culture grid
9. **Footer** — mega footer with newsletter, social icons, responsible drinking notice

---

## Key Interaction Patterns

- **Custom cursor** — gold ring + dot, expands on hoverable elements (desktop only)
- **Magnetic buttons** — physically attracted to cursor (Careers CTA)
- **3D tilt** — Hero can + Product cards respond to mouse position
- **Scroll-linked parallax** — Hero fade-out, BrandStory layered quote
- **Shared layout animations** — category filter pill, nav underline
- **Reduced-motion support** — all custom animations respect `prefers-reduced-motion`

---

## Notes

- All visuals (cans, icons, patterns, gradients) are built with pure CSS/SVG — **zero external image assets** required.
- Replace placeholder copy in `src/utils/constants.js` with real Guinness Nigeria content as needed.
- Social links, job listings, and news items are sample data — connect to a CMS/API as needed.
"# guinessnigeria" 
