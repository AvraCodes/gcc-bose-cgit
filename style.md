# 💎 Bose GCC Briefing Platform — Brand & Design System Guide

This document defines the premium editorial and corporate co-branded design system established for the **Bose GCC Interactive Proposal Companion**. It details the styling specifications, color tokens, typography principles, and interactive guidelines to maintain pixel-perfect alignment across all front-end assets.

---

## 🎨 1. Color Palette Tokens (CSS Variables)

Our color system bridges the technical expertise of a boutique consultancy with the premium lifestyle aesthetic of the Bose brand. We utilize a tailored light-theme editorial canvas contrasted against deep corporate navy and co-branded red/blue accents.

### A. Surface & Canvas (Backgrounds)
* **`--bg` (`#ffffff`)**: The primary pristine canvas for structural blocks, interactive cards, and zoom slides.
* **`--bg2` (`#f6f4f0`)**: A warm sand/cream tint used for alternate sections (`.sec.alt`) to prevent screen fatigue and establish editorial warmth.
* **`--bg3` (`#eeece8`)**: An intermediate dark-sand tint used for disabled states, borders, and depth offsets.
* **`--s1` (`#e4e1da`)** & **`--s2` (`#d4d0c8`)**: High-contrast scrollbar and track elements for custom scrolling regions.

### B. Typography & Ink
* **`--ink` (`#0d1017`)**: Deep slate-charcoal for standard body text, providing high contrast without the harshness of pure black.
* **`--ink2` (`#252219`)**: A warmer ink variant for subtitles, captions, and secondary copy.
* **`--ink3` (`#6a635a`)**: Medium gray for technical subtitles, uppercase labels, and secondary tags.
* **`--ink4` (`#9c9590`)**: Soft gray for metadata annotations, disabled text, and index counters.

### C. Accents & Corporate Co-Branding
* **`--navy` (`#0d1f3c`)**: Deep Corporate Navy — used exclusively for high-stakes headings (`h2`, `h3`, `h4`) and primary header markers.
* **`--blue` (`#1a4f96`)**: Core Co-branded Blue — represents technology depth, cloud capabilities, and structural parameters.
  * *Tints*: `--blue2` (`#2a6fc8`), `--blue3` (`#6ab0f0`), `--bs` (`rgba(26, 79, 150, 0.08)` surface shadow), `--bl` (`rgba(26, 79, 150, 0.22)` outline line).
* **`--red` (`#c01c1c`)**: Core Co-branded Red — represents innovation, audio R&D engineering, and high-velocity milestones.
  * *Tints*: `--red2` (`#e83030`), `--rs` (`rgba(192, 28, 28, 0.07)` surface shadow), `--rl` (`rgba(192, 28, 28, 0.22)` outline line).
* **`--gold` (`#c01c1c`)**: Tailored gold-red accent for GBS (Global Business Services) splits.
  * *Tints*: `--gs` (`rgba(192, 28, 28, 0.15)` shadow tint).

---

## ✍️ 2. Typography System

The typography is selected to replicate a premium print editorial magazine (such as Harvard Business Review or Monocle), contrasting classic serif headings with clean, modern monospaced highlights.

### A. Editorial Headings (`--F`)
* **Font-Family**: `'Fraunces', 'Georgia', serif`
* **Characteristics**: Light weights (`200` to `350`), tight line heights (`line-height: 0.98` to `1.1`), and negative letter spacing (`-0.025em` to `-0.04em`).
* **Italic Embellishments (`em`)**: Used strategically inside headlines to highlight pivotal strategic verbs (e.g. *evidence*, *handover*, *transfer*). Mapped with:
  ```css
  font-style: italic;
  font-variation-settings: "opsz" 144, "SOFT" 100;
  color: var(--blue);
  ```

### B. Body & Structural UI (`--B`)
* **Font-Family**: `'Inter Tight', system-ui, sans-serif`
* **Characteristics**: Extremely legible at small scales, styled with clean regular (`400`) and medium (`500` / `600`) weights. Used for cards, timelines, standard copy, and control components.

### C. Technical Metrics & Indexes (`--M`)
* **Font-Family**: `'JetBrains Mono', 'Courier New', monospace`
* **Characteristics**: Scaled down (`9px` to `10.5px`) with high letter spacing (`0.1em` to `0.2em`) and forced uppercase. Used for card indexes, statistics labels, active tab counts, and technical parameter notes.

---

## 💎 3. Depth, Borders & Shadows

We avoid heavy solid borders in favor of high-fidelity translucent bounding boxes combined with subtle, multi-layered shadows that create a clean 3D physical depth structure.

### Translucent Borders
* **`--l1` (`rgba(13, 16, 26, 0.07)`)**: Lightweight line separator for static borders, divider margins, and table grids.
* **`--l2` (`rgba(13, 16, 26, 0.13)`)**: Mid-weight line separator for borders in active elements.
* **`--l3` (`rgba(13, 16, 26, 0.22)`)**: Bounding border for dark modals and popover containers.

### Multi-Layered CSS Shadows
* **`--sh1` (Micro Shadow)**:
  `0 1px 3px rgba(13,16,26,.05), 0 1px 2px rgba(13,16,26,.03)`
* **`--sh2` (Standard Card Shadow)**:
  `0 4px 16px rgba(13,16,26,.07), 0 2px 6px rgba(13,16,26,.04)`
* **`--sh3` (Dynamic Float Shadow)**:
  `0 12px 40px rgba(13,16,26,.09), 0 4px 12px rgba(13,16,26,.05)`
* **`--sh4` (Presentation Modal Overlay Shadow)**:
  `0 24px 64px rgba(13,16,26,.11), 0 8px 20px rgba(13,16,26,.07)`

---

## ⚡ 4. Interactive Micro-Animations & Affordances

All interactive blocks must communicate clickability immediately. Static pointers are strict design violations.

### A. The Hover Translation Rule
Every hoverable briefing block (e.g. `.brief-card`, `.tephase`, `.pillar`, `.ccard`, `.mpanel`) must implement physical lifting and deep shadowing:
```css
.card-class {
  transition: transform .5s cubic-bezier(.16, 1, .3, 1), 
              box-shadow .5s cubic-bezier(.16, 1, .3, 1), 
              border-color .4s ease;
  cursor: pointer;
}
.card-class:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 30px 80px rgba(0, 0, 0, .14), 
              0 0 80px rgba(26, 79, 150, .10);
  border-color: var(--bl);
}
```

### B. Custom Transition Easings
* **`--ease` (`cubic-bezier(.22,.61,.36,1)`)**: Standard speed transition.
* **`--eout` (`cubic-bezier(.16,1,.3,1)`)**: Editorial decelerating expansion — used for sliding curtains, map pulses, and overlays.
* **`--eb` (`cubic-bezier(.34,1.56,.64,1)`)**: Elastic bouncing curve — used for popups and badge entries.

---

## 🖥️ 5. Widescreen Presentation Slides (Zoom Overlays)

To facilitate high-stakes executive review, cards can expand on click into full-viewport widescreen presentation slides.

### Glassmorphic Backdrop
The modal overlay occupies a fixed position covering the entire screen, utilizing standard blurred glassmorphic masking:
```css
.client-zoom-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: radial-gradient(circle at center, rgba(26, 79, 150, 0.12) 0%, rgba(13, 16, 23, 0.88) 100%);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--px);
  animation: zoomFadeIn 0.3s ease;
}
```

### Slide Content Bounding Box
* **Max-Width**: `880px`
* **Max-Height**: `85vh` (vertically scrollable inside using custom scrollbars).
* **Border Radius**: `24px` for soft editorial boundaries.
* **Top Accent Bar**: A linear gradient co-branding strip (`5px` tall) rendered at the absolute top edge:
  `background: linear-gradient(90deg, var(--blue), var(--red));`
* **Content Padding**: Standardized at `48px` to guarantee breathing room for large-scale typography.

---

## 🛠️ 6. Front-End Best Practices for the Team

1. **Maintain Font Scaling**: Avoid hardcoded pixel headers for text above 24px. Use `clamp()` for fluid responsive scaling, e.g.:
   `font-size: clamp(24px, 3.2vw, 38px);`
2. **Prevent Italic Clipping**: Serif fonts in italics (especially `Fraunces`) have sweeping visual letters. Always give inline-block `span` structures wrapping them positive right padding and negative right margin to avoid clipping inside `overflow: hidden` sliding reveal headers:
   `padding-right: 0.15em; margin-right: -0.05em;`
3. **Propagate Safely**: When embedding actionable icons or zoom buttons (`⛶`) inside clickable parent wrappers, always bind `e.stopPropagation()` in React to ensure child actions do not trigger unintended parent click loops.
4. **Isolate Local Styles**: Keep section-specific style overrides contained within scoped selectors or dedicated CSS constants to prevent global stylesheet bleeding.
