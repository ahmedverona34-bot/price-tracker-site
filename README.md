# Price Tracker — site

Marketing site for the Price Tracker Windows app.

- **Stack:** Next.js 16 (App Router) + React 19. No CSS framework — the tokens in
  `app/tokens.css` are taken verbatim from the app's own `ui/tokens.css`, so the
  site and the app are the same design system rather than two lookalikes.
- **Typeface:** Thmanyah Sans, self-hosted from the app's OTF files. Weights
  300/400/500/700/900, never 600. It covers both scripts, so no second family.
- **Languages:** Arabic (default, RTL) and English (LTR), switched from the
  header and remembered in `localStorage`. All copy lives in `lib/content.js`,
  one object per language with identical keys.
- **Font license:** `public/fonts/LICENSE.pdf` came with the typeface.

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static prerender
npm start
```

## Adding a screenshot

Screenshots of the real app window go in `public/shots/`. Drop the file in and
add a `<figure class="shot">` in `app/page.jsx` — the frame and its caption are
already styled in `globals.css`.

## Deploying

Static output. Any of these work:

```bash
npx vercel --prod              # Vercel
npx @11ty/eleventy             # not needed, Next handles it
npm run build && npx serve out # any static host
```

On GitHub Pages, set the output directory to `.next` via a Pages action, or add
`output: "export"` to `next.config.mjs` and publish `out/`.
