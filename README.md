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
npm run stage   # copy the newest installer into public/downloads/
npm run dev     # http://localhost:3000
npm run build   # static prerender
npm start
```

## Downloading the installer

The download button serves the setup from this site, so a visitor never lands on
a GitHub release page. `scripts/stage-installer.mjs` copies the newest
`PriceTracker-Setup-<ver>.exe` out of the app repo's `dist-installer/` to
`public/downloads/latest.exe` and writes `info.json` beside it.

The served name is fixed (`latest.exe`) on purpose: publishing a new build is a
file copy and nothing else, so no link in an old email or a cached page can go
dead. The button sets `download` with the real versioned filename, so the file
lands on disk as `PriceTracker-Setup-1.2.11.exe`, and shows the version and size
read from that same file.

**The binary is committed.** It looks wrong for a 12 MB file, but deployment
builds from a git clone: if `latest.exe` were ignored, the deployed site would
carry the button and not the file, and the download would 404. Publishing a new
build is therefore:

```bash
npm run stage
git add public/downloads && git commit -m "Stage installer 1.2.12"
git push
```

`info.json` is regenerated on every stage, so the size and version shown on the
page always describe the file that is actually being served.

Point `PRICE_TRACKER_REPO` at the app checkout if it is not at
`C:/price-tracker`. The script warns when the newest setup and
`price_tracker.py`'s `APP_VERSION` disagree, because that mismatch is what makes
an app offer itself as an update forever.

## Deploying

## Adding a screenshot

Screenshots of the real app window go in `public/shots/`. Drop the file in and
add a `<figure class="shot">` in `app/page.jsx` — the frame and its caption are
already styled in `globals.css`.

## Deploying

Static output. Any of these work:

```bash
npx vercel --prod                  # Vercel
npm run build && npx serve out     # any static host
```

On GitHub Pages, set the output directory to `.next` via a Pages action, or add
`output: "export"` to `next.config.mjs` and publish `out/`. Either way, run
`npm run stage` first so the installer is in the bundle.
