# Veera Vaishnavi K — Personal Portfolio

A clean, quiet, high-performance personal portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4. Designed like an Awwwards "Site of the Day" with a strict monochromatic palette (paper, ink, and grays) and brand accents preserved only on official tech logos.

All text, metrics, links, and credentials are derived exclusively and verbatim from `resume.pdf`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm or pnpm or yarn
- Python 3.9+ with `ffmpeg` (only required if rebuilding video assets)

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build
```bash
npm run build
npm run start
```

---

## 📑 Sections Architecture

| Index | Section | Component | Description |
|---|---|---|---|
| 00 | **Navigation & Lamp** | `Navigation.tsx` / `InteractiveLamp.tsx` | Frosted pill header, animated solid ink indicator pill tracking active section (`rootMargin: -45% 0px -50% 0px`), spinning initials badge, 2px top scroll progress bar, full-screen clip-path mobile menu. Includes the **Interactive Lamp** physical switch for smooth light/dark theme switching with ambient light cone, pull-cord animation, and `localStorage` persistence. |
| 01 | **Hero** | `hero/Hero.tsx` | Centered 768×960 video with native transparency & `mix-blend-mode: multiply`, giant outlined ghost name (`VEERA`), autoplay audio unlock on gesture, IntersectionObserver auto-pause (<35% visible), and 46px round sound control. |
| 02 | **About** | `sections/About.tsx` | 3-column layout: overview verbatim from résumé, realistic hanging lanyard ID card with spring pendulum sway and 3D hover/keyboard flip, quick facts, and philosophical quote. |
| 03 | **Skills** | `sections/Skills.tsx` | "The Periodic Table of My Stack" with 32 element tiles (atomic number, 2-letter symbol, name, family), diagonal wave reveal, family filter chips, and sticky 320px element inspector with 150px brand logos. |
| 04 | **Work** | `sections/Work.tsx` | Expanding horizontal accordion gallery (`flex: 8` on focus/hover, slim spines with rotating `+` button when collapsed), feature breakdowns, tech badges, and illustrative grayscale mini-UIs in CSS/JSX. |
| 05 | **Experience / Timeline** | `sections/Experience.tsx` | Interactive "Time Machine" reverse-chronological timeline matching the video reference. Sticky left chronometer panel with pulsing `• My story` indicator, rotating radar dial, giant typography year (2026 → 2024), live period label, step counter (`01 / 05`), and progress bar; center divider with traveling bead node; right scrollable milestones with active card lighting and "Next Chapter — Your team?" card. Full Light/Dark theme support. |
| 06 | **Achievements** | `sections/Achievements.tsx` | Pinned horizontal sticky gallery (`100svh`) with continuous scroll translation, dynamic progress indicator, center-card elevation, and `easeOutQuart` count-up metrics for all résumé stats. |
| 07 | **Contact & Footer** | `sections/Contact.tsx` | Giant heading with interactive letter-hop physics, one-click copy chip with `aria-live` confirmation, spinning "SAY HELLO" SVG badge, phone/social links, and back-to-top trigger. |

---

## 💡 Interactive Pull Cord & Live Clock — Light/Dark Theme Switch

The portfolio features a physical interactive hanging rope switch and live clock badge matching the realistic industrial design:
- **Physical Design**: Ceiling mount bracket, braided helical fiber cord with alternating fiber weave texture, machined brass ferrule collar, and a polished walnut acorn/teardrop pull handle.
- **Drag-to-Switch Interaction**:
  - Drag the handle downward using touch or mouse pointer.
  - The rope dynamically elongates with realistic elastic tension and lateral sway (`requestAnimationFrame` spring physics).
  - Pulling past the threshold ($\approx 48\text{px}$) activates theme change on release with tactile vibration and spring rebound.
  - Also supports single-tap / click pull animation and keyboard controls (<kbd>Enter</kbd> / <kbd>Space</kbd>).
- **Reload Pop-up Entrance**:
  - On page load / reload, the cord drops down from above the viewport with an elastic overshoot and gentle pendulum settle (`@keyframes ropeDropIn`).
- **Live Local Time & Date Capsule**:
  - Sits to the left of the rope: `Local time  2:47pm  ·  3 November, 2026`.
  - Continuously updating real-time clock formatted with 12-hour am/pm and current full date.
- **Persistence & Accessibility**:
  - Persists preference in `localStorage` (`portfolio-theme`).
  - Respects visitor's OS system theme (`prefers-color-scheme`) on initial visit without hydration flashes via a blocking `<head>` script.
  - Full keyboard accessibility (`role="switch"`, `aria-checked`, `aria-label`, visible focus ring).

---

## ⏳ "Time Machine" Experience Timeline (Light & Dark Themes)

The Experience section (`src/components/sections/Experience.tsx`) models the interactive "Time Machine" interface from the reference video, adapted seamlessly to both the quiet paper light theme and the sleek dark theme:

- **Split Two-Column Sticky Architecture**:
  - **Left Column (Sticky Chronometer)**:
    - **Header & Indicator**: Monospaced `05 — Experience & Education` tag, glowing/pulsing green live badge `• My story`, and editorial heading `"Let's go back in time."`.
    - **Radial Radar Compass Dial**: SVG dial with 36 ticks, a rotating scanner needle (`rotate-timeline-dial`), a central crosshair reticle, and concentric altitude rings.
    - **Dynamic Giant Year Typography**: Rendered in ultra-large condensed font (`text-[7rem]` to `text-[11.5rem]`). As you scroll through milestones, the year dynamically shifts backwards from `2026` → `2025` → `2024`.
    - **Live Milestone Telemetry**: Shows the active role's exact dates (e.g. `March 2026 – Present`), milestone fraction counter (e.g. `01 / 05` through `05 / 05`), and a calibrated horizontal progress track.
  - **Center Divider with Traveling Bead**:
    - A subtle vertical hairline track running between the two columns.
    - An animated traveling indicator bead (with radial halo and ping ring) smoothly glides vertically, locking onto the exact height of whichever milestone card is currently in focus.
  - **Right Column (Scrollable Milestones)**:
    - Reverse-chronological milestones sourced 100% from `resume.pdf`:
      1. **2026**: Innovative Student Ambassador — Institution's Innovation Council (IIC)
      2. **2025**: Vice President — Google Developer Group SIMATS (workshops on Cloud, Flutter, TensorFlow)
      3. **2025**: Research and Innovation Lead — Hackathon Club SIMATS
      4. **2024**: Founding Software Engineer — Lin's InfoTech (AI Solutions Startup)
      5. **2024**: B.E. Computer Science (Artificial Intelligence) — Saveetha School of Engineering (CGPA: 9.22 / 10)
    - **Focus State Feedback**: The active milestone stands out at full opacity (`opacity-100 scale-100`) with an elevated card border and soft glow, while inactive cards smoothly dim (`opacity-45 scale-[0.98]`).
    - **Future Invitation**: Concludes with a forward-looking `"Next Chapter — Your team?"` card with a quick CTA to start a conversation.
- **Theme Adaptation**:
  - **Light Theme**: Warm `#f4f2ee` paper canvas, deep `#0d0d0d` ink typography, crisp hairline borders, and subtle gray dials.
  - **Dark Theme**: Deep `#0e0e10` canvas, `#f4f2ee` headings, `#171719` milestone cards with luminous borders, and a high-contrast glowing neon bead.
- **Zero Horizontal Overflow**: Guaranteed responsive layout from 360px mobile to 1920px ultra-wide screens.

---

## 🎥 Hero Video Asset Pipeline

The hero video is generated from the original introduction footage using `scripts/build-hero-assets.py`:

```bash
python scripts/build-hero-assets.py
```

### Pipeline Steps:
1. **Centering & Tight Crop**: Centers the person head-to-toe (`crop=800:1000:568:76` scaled to `768:960`).
2. **Backdrop Whitening**: Whitens off-white background with `colorlevels=rimax=0.90:gimax=0.90:bimax=0.90` to blend into `#f4f2ee` via `mix-blend-mode: multiply`.
3. **Seamless Video Loop**: 0.5-second `xfade` transition between the tail and head.
4. **Seamless Audio Loop**: Sample-accurate float32 linear crossfade processed in NumPy to avoid audio clicks or drops.
5. **Multi-Format Export**:
   - `public/hero/hero.mp4` (H.264 yuv420p, CRF 24, AAC 96 kbps, `+faststart`)
   - `public/hero/hero.webm` (VP9, CRF 36, Opus 80 kbps)
6. **Portrait & OG Export**:
   - `public/portrait-bust.webp` (480×600)
   - `public/og.jpg` (1200×630)

---

## 🛡️ Brand Logos, Credits & Licences

All brand SVGs are located in `public/logos/` and documented in `public/logos/LICENSE.md`.

- **Simple Icons**: Released under CC0 1.0 Universal Public Domain.
- **Devicon**: Released under MIT License.
- **Trademarks**: All brand logos (Python, React, Next.js, TypeScript, Node.js, FastAPI, MongoDB, Google Cloud, Vercel, IEEE, etc.) remain property of their respective owners and are used strictly nominatively to identify verified technical competencies.
