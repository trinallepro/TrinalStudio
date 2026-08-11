# Trinal Studio

Landing page for Trinal Studio, a creative studio specializing in AI, games, simulations, cycling, fiction, collaborative music, 3D, PWA, SEO, and more.

Portfolio showcasing 11 projects with an interactive 3D hero (Three.js), animated skills orbit, dark/light theme toggle, and a mini-game.

## Tech Stack

- **Three.js** (0.167.1) — 3D hero scene with TorusKnot geometry and OrbitControls
- **GSAP** (3.12.5) — Scroll-triggered animations for project cards
- **Vanilla HTML/CSS/JS** — No build step, no dependencies
- **PWA** — Manifest and favicon embedded as data URIs

## Structure

```
index.html          — Single-page landing (all HTML, CSS, and JS inline)
logo.svg            — Logo asset
logocoach.png       — Coach logo
logocyle.png        — Cycling logo
Designer.jpeg       — Designer photo
googlee9876e42faa84e76.html — Google Search Console verification
```

## Development

No build step required. Open `index.html` in a browser or serve locally:

```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

## Known Issues

- The theme toggle button (`#theme-toggle`) and skills orbit container (`#orbit`) are referenced in JS but missing from the HTML, causing runtime errors.
- The nav link `#accueil` has no matching anchor element.
- The footer link has a typo: `#accueuil` instead of `#accueil`.
- The contact form CSS exists but no contact form is rendered in the HTML.

## License

© 2025 Trinal Studio. All rights reserved.