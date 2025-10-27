# Coversheet Generator

## Overview
This repository contains the SvelteKit-powered Coversheet Generator used by USMA cadets to quickly produce assignment coversheets that conform to the latest DAAW guidance. The app runs entirely in the browser, supports offline-friendly workflows, and can be deployed as a static site (e.g. GitHub Pages or CorpsTools static hosting).

## Features
- Guided form that auto-capitalizes fields, parses cadet rosters, and keeps course metadata in sync with `src/courses.js`.
- Signature workflow with draw, upload, clipboard, and saved signature options backed by `localStorage`.
- Instant download, print, and clipboard export (text or image) for the generated coversheet.
- Optional PDF prepending so the generated coversheet can be merged with an assignment document via `pdf-merger-js`.
- Built-in changelog & help content (`/info`) that persists “new update” indicators per user.
- Static build via `@sveltejs/adapter-static` with a configurable `base` path for GitHub Pages-style hosting.

## Getting Started
Prerequisites:
- Node.js 20+ (or the version used by your toolchain)
- Yarn Classic (v1)

Install dependencies:
```bash
yarn install
```

Start a local dev server (defaults to http://localhost:5173):
```bash
yarn dev -- --open
```
SvelteKit will reload automatically as you edit files in `src/`.

## Available Scripts
- `yarn dev` – run the Vite-powered dev server.
- `yarn build` – produce a static build in `build/`.
- `yarn preview` – serve the production build locally.
- `yarn ci` – install dependencies with the lockfile (used in CI).
- `yarn preci` – clean the workspace by removing `node_modules/`.
- `yarn prepare` – run `svelte-kit sync` (automatic via package managers that call `prepare`).

## Project Structure
- `src/routes/+page.svelte` – main Coversheet Generator UI and logic.
- `src/routes/info/+page.svelte` – help, FAQ, and changelog view.
- `src/routes/Coversheet.svelte` – rendered coversheet that receives form updates.
- `src/stores/persistentStore.js` – lightweight helper that mirrors Svelte stores to `localStorage`.
- `src/courses.js` – deduplicated list of course codes/names used by the autocomplete.
- `static/` – static assets (manifest, icons, printable HTML template, advertisements).
- `build/` – output directory created by `yarn build`.

## Updating Course Data
The `src/courses.js` file contains instructions (in comments at the top) for scraping the official course catalog. Follow those steps, replace the `RAW_COURSES` constant with the updated array, and commit the changes so the autocomplete reflects the latest offerings.

## Deployment Notes
- `yarn build` outputs a static site suitable for any static host. For GitHub Pages, the SvelteKit config automatically sets `paths.base = '/csg'` in non-dev builds—adjust this if you deploy under a different sub-path.
- `yarn preview` serves the contents of `build/` so you can verify production output before publishing.
- To host behind a CDN or reverse proxy, ensure requests for missing routes fall back to `index.html` so SvelteKit can handle client-side routing.

## Persistence & Privacy
User-specific data (saved signatures, changelog state, form settings) is stored locally in the browser via `localStorage`. The application does not send that data to a backend service; clearing browser storage resets the saved state.

## Support
Questions, feedback, or bug reports can be directed to `korbin.deary@westpoint.edu`, or by opening an issue in the repository where this code is hosted.
