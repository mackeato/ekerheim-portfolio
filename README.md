# ekerheim-portfolio

My personal portfolio: brand identity, editorial, web, motion and photo work, plus what I'm doing now at Luftix.

Hand-built with HTML, CSS and vanilla JavaScript. No frameworks, no build step. Hosted on GitHub Pages.

## Structure

```
index.html        Page markup (the hero landscape is an inline SVG)
main.css          All styles
script.js         Interactions + project data for the case-study viewer (PROJECTS)
assets/img/       Web-optimised WebP images used by the site
assets/video/     Compressed product film
assets/fonts/     WOFF2 versions of Built Titling, Playfair Display and Bahnschrift
images/, videos/, fonts/   Original full-resolution source files
```

### Adding a project

1. Export images to `assets/img/` as WebP (about 2000px wide is plenty).
2. Add a card in the `#work` grid in `index.html` with `data-project="your-id"`.
3. Add an entry with the same `id` to `PROJECTS` in `script.js`. Blocks can be `image`, `pair`, `video`,
   `palette`, `compare` (before/after slider) or `note`.

Projects are deep-linkable, e.g. `/#work/rummel`.

## Contact

- Email: markus.ekerheim@gmail.com
- Phone: +46 70-854 41 55

// Markus Ekerheim
