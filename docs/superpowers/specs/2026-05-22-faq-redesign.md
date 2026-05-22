# FAQ & Info Section Redesign — Elevated Two-Column

**Date:** 2026-05-22
**Status:** Approved

## Goal

Replace the current awkward two-column FAQ+Info layout with a cohesive editorial design: FAQ accordion left (60%), dark About Evia card right (40%), with the card pulled up to overlap the section header.

## Layout

Single `<section id="faq">` with a shared section header followed by a two-column grid.

- **Section header:** One `h2` — "Before You *Walk*" — replaces the two competing `<h2>` elements currently in the markup. Eyebrow label "Info" above in Courier mono sage green.
- **Left column (60%):** FAQ accordion — `<details>` elements retained, questions in Courier mono caps, `+`/`−` icon in terracotta (`--accent`), border separators top and bottom per item, first item open by default.
- **Right column (40%):** About Evia card — dark ink background (`--bg-dark: #1a1a18`), `border: 4px solid var(--text-primary)`, `box-shadow: 8px 8px 0 var(--accent)`. Pulls up `3.5rem` via `margin-top: -3.5rem` to overlap the section header.

## About Evia Card Content

1. Eyebrow: `ABOUT EVIA` — Courier mono, terracotta
2. Pull quote (blockquote): *"An island of dramatic dualities — alpine peaks meet wild Aegean coast."* — italic serif, left border in terracotta
3. Short paragraph: "Greece's second-largest island, just an hour from Athens — yet a world away from mass tourism."
4. Stats block (border-top separator):
   - **Terrain** — Alpine mountains, gorges, wild coastline
   - **Highlights** — Mt. Dirfys, Dimosari Gorge, hidden beaches
   - **Vibe** — Untamed, authentic, traditional

## CSS

- `.info-section`: `padding: 8rem 5%`
- `.info-header` (section-level): `margin-bottom: 3rem`
- `.info-container`: `display: grid; grid-template-columns: 1.3fr 1fr; gap: 3rem; align-items: start`
- `.faq-accordion`: full width of left column
- `.faq-item`: `border-bottom: 2px solid var(--text-primary)`; first child adds `border-top`
- `.faq-item summary`: flex row, question left, icon right; `padding: 1.2rem 0`
- `.faq-item[open] .faq-icon`: shows `−`; closed shows `+`
- `.evia-card`: `background: var(--bg-dark); color: var(--bg-main); padding: 2.5rem; border: 4px solid var(--text-primary); box-shadow: 8px 8px 0 var(--accent); margin-top: -3.5rem`
- `.evia-card blockquote`: `border-left: 3px solid var(--accent); padding-left: 1rem; font-style: italic`

## Mobile (≤900px)

- Grid collapses to single column (`grid-template-columns: 1fr`)
- `.evia-card`: `margin-top: 0`
- About Evia card renders below FAQ

## What Changes

**index.html:**
- Remove the two separate `<h2>` headers inside `.info-faq-column` and `.info-evia-column`
- Add a single `.info-header` block above `.info-container` with eyebrow + `h2`
- Rewrite `.info-evia-column` content: remove inline styles, add `.evia-card` wrapper with blockquote + paragraph + stats using proper class-based markup
- Remove all inline `style=""` attributes from the Evia column

**src/styles.css:**
- Replace existing `.info-section`, `.info-container`, `.info-faq-column`, `.info-evia-column`, `.faq-*` rules
- Add `.evia-card`, `.evia-card blockquote`, `.evia-stats`, `.stat-row`, `.stat-label`, `.stat-value` rules
- Update `@media (max-width: 900px)` block for new class names

## What Stays the Same

- All `<details>`/`<summary>` FAQ markup structure
- All FAQ question text and answer text
- All CSS custom properties
- All other sections
