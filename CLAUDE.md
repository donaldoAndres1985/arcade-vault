# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Arcade Vault ("Es una plataforma para jugar online y competir por la mayor cantidad de puntos") is a
Spanish-language retro-arcade portal: browse a game library, view game detail pages, play games, and compete
on a leaderboard ("Salón de la Fama" / Hall of Fame). The UI targets a neon/CRT retro-arcade aesthetic.

**Current state**: the `app/` directory is still the unmodified `create-next-app` scaffold (`layout.tsx`,
`page.tsx`). The actual product has not been built yet.

### `references/resources/templates/` — design reference, not app code

This is a standalone, buildless HTML/React prototype (React 18 + Babel Standalone loaded via `<script>` tags
from `Arcade Vault.html`, no bundler, no TypeScript) that defines the intended screens and behavior. Treat it
as a spec/mockup to reimplement idiomatically with the Next.js App Router — do not copy it in as-is (it uses
hash-based client routing, `localStorage` for session/scores, and globals like `window.GAMES` instead of
framework conventions).

- `data.jsx` — mock data: `GAMES` catalog, `PLAYERS`, `seededScores()` leaderboard generator
- `app.jsx` — shell/router: screens are `biblioteca` (library), `detalle` (game detail), `player`
  (`reproductor.jsx`, the game player), `auth`, `salon` (hall of fame)
- `nav.jsx`, `biblioteca.jsx`, `detalle.jsx`, `reproductor.jsx`, `auth.jsx`, `salon.jsx` — one file per screen
- `styles.css` — the design system as CSS custom properties (`--bg`, `--cyan`, `--magenta`, `--yellow`,
  `--green`, `--gold`/`--silver`/`--bronze` for leaderboard ranks, pixel font for headings, mono font for body)

When implementing a screen for real, port the corresponding template's structure/behavior and pull colors from
`styles.css`, but express state/data/session through Next.js patterns (Server Components, Server Actions, route
segments) rather than the prototype's `useState`/`localStorage`/hash-router.

### Intended workflow: Spec Driven Design

Per the README, this project follows spec-driven development via the `/spec` and `/spec-impl` commands from
the `Klerith/fernando-skills` skill pack (`npx skills@latest add Klerith/fernando-skills`). If those skills are
installed, prefer writing a spec first and implementing from it rather than freehanding features.

## This is not the Next.js you know

Per `AGENTS.md`, this repo runs **Next.js 16.2.12** — read the relevant doc under
`node_modules/next/dist/docs/01-app/` before writing framework code; a lot has changed since most training
data. Notable breaking changes vs. Next.js 15 (full detail in
`node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`):

- **Turbopack is the default** for `next dev`/`next build` (no `--turbopack` flag needed).
- **`middleware.ts` → `proxy.ts`**: the `middleware` file/export convention is deprecated in favor of `proxy`;
  the proxy runtime is always `nodejs` (no `edge` runtime).
- **Async Request APIs are fully async, no sync fallback**: `cookies()`, `headers()`, `draftMode()`, and
  `params`/`searchParams` in pages/layouts/routes must always be `await`ed.
- **`revalidateTag(tag)` now requires a second `cacheLife` profile argument**, e.g.
  `revalidateTag('posts', 'max')`; use the new `updateTag()` for read-your-writes semantics.
- **`cacheComponents` config** replaces the old experimental `dynamicIO`/`useCache`/PPR flags.
- **`next lint` is removed** — this repo already uses the ESLint CLI directly (`npm run lint`), with
  `eslint-config-next` in flat-config form (`eslint.config.mjs`).
- Parallel route slots require an explicit `default.js`.

## Commands

```bash
npm run dev     # start dev server (Turbopack, outputs to .next/dev)
npm run build   # production build (Turbopack by default)
npm run start   # run the production build
npm run lint    # eslint . via eslint.config.mjs (flat config)
```

There is no test runner configured in this project yet.

## Stack notes

- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` — no `tailwind.config.*` file; theme tokens are
  defined CSS-first in `app/globals.css` with `@theme inline`.
- **Fonts**: Geist Sans/Mono loaded through `next/font/google` in `app/layout.tsx`.
- **TypeScript**: strict mode; `@/*` path alias resolves to the project root.
