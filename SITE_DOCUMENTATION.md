# Yorgos Evia Walking Tours | Site Blueprint & Architecture

This document serves as a comprehensive system prompt or site blueprint for the "Yorgos Evia" hiking expedition website. You can provide this to any AI or engineering team to quickly give them the foundational context of the application's design language, architecture, and interaction models.

## 1. Architectural Philosophy
* **Format:** Single-page application (SPA) implemented entirely in vanilla HTML, CSS, and JS. 
* **Vibe/Aesthetic:** "Premium Editorial Brutalism" / "Earthy & Untamed". It eschews generic corporate travel UI for a raw, high-contrast, editorial layout that feels genuine and rugged, mirroring the environment of Evia.
* **Component-Free Constraints:** Built without front-end frameworks (No React/Vue). It uses standard Semantic HTML5 tags and CSS Variables for token management. 
* **Visual Density:** Uses thick borders (`4px solid var(--text-primary)`), sharp solid drop-shadows (e.g., `12px 12px 0 var(--text-primary)`), and generous negative space to simulate an old-school print editorial layout.

## 2. Design Tokens & Typography

We rely heavily on CSS Custom Properties (`:root`) for color and structural theming:
* **Backgrounds:** `--bg-main: #f2efe9` (Warm Sand), `--bg-secondary: #e6e2d8` (Deeper Sand/Beige)
* **Text/Ink:** `--text-primary: #262624` (Deep Charcoal/Black)
* **Accents:** `--accent: #dc6e55` (Terracotta / Earthy Orange)
* **Inverse:** `--text-inverse: #f2efe9` (For dark sections)

**Typography (Google Fonts):**
* **Headers (Editorial):** `DM Serif Display` (`--font-serif`) — Used for deep, expressive statements.
* **Body/Standard UI:** `DM Sans` (`--font-sans`) — Crisp, utilitarian readability.
* **Data/Micro-copy:** `Courier Prime` (`--font-mono`) — Used for labels, buttons, image captions, and metadata to give a structural, field-notes aesthetic.

## 3. Structural Composition

### 3.1 Hero Section (`.hero-editorial`)
* **Layout:** A CSS Grid layout balancing a strong editorial headline on the left with a stylized image container on the right.
* **Badging:** Features an absolutely positioned rotating circular SVG badge ("LOCAL GUIDE • SMALL GROUPS").

### 3.2 Tour Itineraries (`.tours-section` & `.tour-row`)
* **Zig-zag layout:** Alternating `.tour-row` and `.reverse` flex configurations to create a rhythmic scrolling experience.
* **Card Overlay:** The text cards (`.tour-text`) physically overlap their adjacent images (`margin-right: -5rem; z-index: 2`) utilizing thick borders to pop out structurally.

### 3.3 Testimonials (`.testimonials-grid`)
* **Styling:** Rendered on a grid with rotated, scattered cards (`transform: rotate(-3deg)`).
* **Details:** Includes frosted-glass/tape overlays using pseudo-elements `::after` with `backdrop-filter: blur(4px)`.

### 3.4 Gallery Collage (`.collage-wrapper`)
* **Layout:** A 750px tall relative container holding absolute-positioned photos (`.c-img`). The photos are scattered, slightly rotated, and overlap each other with solid color drop-shadows.

### 3.5 FAQ & Information (`.info-container`)
* Contains a two-column layout using standard HTML5 `<details>` and `<summary>` tags for a zero-dependency Accordion FAQ.
* The right column previously featured a map, now replaced with an **"About Evia"** profile card that acts as a sticky scroll element (`position: sticky`).

## 4. Interaction & Motion Design

All interactions are bound logically inside `/src/script.js` and `/src/styles.css`.

* **Custom Cursor:** We hijack the default cursor on desktop machines (`window.innerWidth > 768`). It features a strict tracking orange dot (`.cursor-dot`) and a smoothed, easing magnetic outline (`.cursor-outline`) utilizing `requestAnimationFrame`.
* **Magnetic Buttons:** Interactive elements (`a, button`) map the cursor`s x/y coordinates to lightly "pull" the UI element toward the mouse using `translate(x, y)`.
* **Scroll-Triggered Reveals:** An `IntersectionObserver` watches DOM nodes tagged with `.reveal`. Upon entering the viewport, they receive an `.active` class. 
  * Features modifier classes (`.left`, `.right`, `.delay-1`) for varied entrance vectors and staggering. Entrances use a subtle blur fade-in `filter: blur(4px) -> blur(0px)`.
* **Image Parallax:** An event listener on scroll applies a slight `scale()` and `translateY()` offset to `.tour-image img` and `.about-image img` nodes during scroll.
* **Scroll Trail Tracker:** A vertically filling border on the left side of the screen (`.scroll-trail`) tracks the global window scroll progress using standard percentage math.

## 5. Optimized Copy / Brand Voice

The copy establishes Yorgos as a knowledgeable, authentic, unfussy local guide running expeditions off the beaten path.

* **Core Narrative:** "I guide small groups and private expeditions through landscapes that demand to be felt. No crowds, no rushed itineraries—just good trails and the rhythm of the island."
* **About Statement:** "I’ve grown up mapping the wild contours of Evia under my boots. This island hides ancient gorges, cedar-scented forests, and dramatic coastlines that most guidebooks miss."
* **Evia Description:** "Despite being Greece's second-largest island, Evia remains fiercely independent and untamed by mass tourism. It is a land of dramatic dualities..."
