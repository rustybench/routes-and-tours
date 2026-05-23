# Gallery Mobile Layout — Asymmetric Grid

**Date:** 2026-05-23
**Status:** Approved

## Goal

Replace the broken mobile fallback for the gallery collage with an asymmetric 2-column CSS grid that preserves the site's visual character.

## Scope

**CSS only** — no HTML changes. One block to replace inside `@media (max-width: 1024px)` in `src/styles.css`.

Desktop collage (absolute positioning, rotations, 750px fixed height) is untouched.

## Layout

Inside `@media (max-width: 1024px)`, replace the existing `.collage-wrapper` and `.c-img` overrides with:

- `.collage-wrapper`: `display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; height: auto; margin-top: 2rem;`
- `.c-img`: `position: static; width: 100%; height: auto; aspect-ratio: 4/3; transform: none; box-shadow: 6px 6px 0 var(--accent);`
- `.c-img-1`: `grid-column: span 2;` — first image spans full width
- `.c-img:hover`: `transform: scale(1.02); box-shadow: 8px 8px 0 var(--text-primary);` — softer hover than desktop

Remove the `!important` overrides — they are no longer needed with grid layout.

## Visual Result

- Image 1 (Coast): full-width banner at top
- Images 2–5: 2×2 grid below, equal-sized cells with `aspect-ratio: 4/3`
- All images retain `border: 4px solid var(--text-primary)` and terracotta `box-shadow`
- No rotations on mobile (clean grid alignment)

## What Changes

**src/styles.css** — inside `@media (max-width: 1024px)`, replace:
```css
.collage-wrapper { height: auto; display: flex; flex-direction: column; gap: 1.5rem; margin-top: 2rem; }
.c-img { position: static; width: 100% !important; height: auto !important; transform: none !important; margin-bottom: 1rem; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
.c-img:hover { transform: none !important; }
```

With:
```css
.collage-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; height: auto; margin-top: 2rem; }
.c-img { position: static; width: 100%; height: auto; aspect-ratio: 4/3; transform: none; box-shadow: 6px 6px 0 var(--accent); }
.c-img-1 { grid-column: span 2; }
.c-img:hover { transform: scale(1.02) !important; box-shadow: 8px 8px 0 var(--text-primary) !important; }
```

## What Stays the Same

- All desktop collage CSS (absolute positioning, rotations, z-indexes, 750px height)
- All HTML markup
- All other sections
- Global `border: 4px solid var(--text-primary)` on `.c-img` (set in base rules, not overridden)
