# AGENTS.md — Club-GIT-Website

Vite 8 + React 19 + TypeScript + Tailwind CSS v4 (via `@tailwindcss/vite`). Single-page French vitrine, no router, no tests, no eslint/prettier, no CI.

## Commands

- `npm install` — no lockfile committed; generates one locally.
- `npm run dev` — Vite on port 3000, `--host=0.0.0.0`.
- `npm run build` — `vite build` only (no `tsc`). Type errors won't fail build.
- `npm run lint` — actually `tsc --noEmit` typecheck, not a linter. Run after any TS change.
- `npm run preview` — serve `dist/` locally.
- `npm run clean` is Unix-only (`rm -rf`); breaks on PowerShell. Use `Remove-Item -Recurse -Force dist` instead.

## Entrypoints & routing

- `index.html` → `src/main.tsx` → `src/App.tsx` (renders `<RouterProvider>`).
- `react-router-dom` v7 with `createBrowserRouter` in `src/app/router.tsx` — 8 routes: `/`, `/club`, `/filieres`, `/projets`, `/bureau`, `/services`, `/galerie`, `/rejoindre` (+ `*` → `/`). Standalone `/rejoindre` route sits outside the site shell (own header).
- Shared shell in `src/app/Layout.tsx` (Navbar + `<Outlet/>` + Footer + `MobileBottomNav` + scroll-top); global modals live in `src/app/ModalContext.tsx` (`useModal()` → `openServiceModal/openJoinModal/openPrivacyModal/openImage`). `ProjectsPage`/`BureauPage` keep their detail-modal state locally.
- Scroll-to-top on route change + legacy `#rejoindre`/`#join` hash → `/rejoindre` redirect in `Layout`.
- SPA fallback for static hosts: `vercel.json` rewrites `/(.*)` → `/`.
- Path alias `@/*` maps to repo root (`./`), not `src/` (see `vite.config.ts` + `tsconfig.json`).

## Where content lives

- `src/data/clubData.ts` is the source of truth for all site content (tracks, projects, bureau, services, gallery). Edit data there, not in components.
- Shapes in `src/types/index.ts`. `src/components/` (~19 section/modal components), single page `src/pages/JoinPage.tsx`.
- Images: `public/images/` referenced as `/images/...`. Google Drive/Photo links go through `resolveGoogleImageUrl()` in `src/utils/googleStorageHelper.ts` — reuse it for new image URLs.

## Styling

- Tailwind v4: `@import "tailwindcss"` + `@theme` tokens in `src/index.css`. Brand: `--color-club-blue: #261c72`, `--color-club-orange: #ff7f00`; fonts Roboto / JetBrains Mono.
- Default `bg-slate-50 text-slate-900`, French copy (`lang="fr"`).

## Gotchas

- `.gitignore` only covers `.vscode/*` — never commit `node_modules/`, `dist/`, `.env.local`.
- `README.md` mentions `GEMINI_API_KEY` in `.env.local` and `metadata.json` has an AI Studio capability — leftovers, unused in code. No key needed for local dev.
- `express` / `dotenv` / `tsx` are in `package.json` but there is no server file — frontend only, don't add a backend unless asked.
- Don't touch the `DISABLE_HMR` / `watch` block in `vite.config.ts` (AI Studio workaround).
- Branch: `main`.
