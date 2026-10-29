<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderlust-client

Wanderlust travel UI (Next.js App Router). Home page composes section components; `/add-destination` is a form that POSTs to a Mongoose-backed route. No tests, no CI, README is stock create-next-app — local checks are the only verification.

## Commands (npm)

- `npm run dev` — dev server on localhost:3000 (Turbopack).
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs` = eslint-config-next core-web-vitals + typescript, ignores `.next`/`out`/`build`). Baseline is currently **failing**: exactly 2 pre-existing `react-hooks/set-state-in-effect` errors in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`. Don't fix those; just add no new problems.
- `npx tsc --noEmit` — typecheck; baseline is clean. `next build` also type-checks. Route-type helpers (`LayoutProps`, `PageProps`) are generated into `.next/types` by `next dev`/`next build`/`npx next typegen` — on a fresh clone run one of those first or `tsc` fails on types like `LayoutProps<"/">`.
- Before finishing, run `npm run lint` and `npx tsc --noEmit` (there is no test runner).

## Data layer (MongoDB + Mongoose)

- Flow: `src/app/add-destination/page.tsx` (`"use client"`, controlled inputs with `onChange`, `onSubmit` POSTs JSON) → `src/app/api/destinations/route.ts` → `src/lib/models/destination.ts`.
- The route's `POST` validates the JSON **before** connecting (so 400 responses work with no database), then `Destination.create()`; `GET` lists newest-first. With no reachable MongoDB, `POST` returns 500 — that's expected, not a bug.
- `src/lib/db.ts` caches the connection on `globalThis` (survives Turbopack hot reload) and falls back to `mongodb://127.0.0.1:27017/wanderlust` when `MONGODB_URI` is unset. `.env.local` is git-ignored (`.gitignore` ignores `.env*`).
- `mongoose` (v9) is in Next's default `serverExternalPackages` list — no `next.config.ts` change needed.
- **PowerShell gotcha when curling the API**: `curl.exe -d '{...json...}'` gets its quotes mangled by native argument passing and arrives as invalid JSON (your test returns `Invalid JSON body` even though the payload looks right). Write the payload to a temp file and pass `-d "@C:\path\payload.json"` instead.

## Stack quirks (differ from defaults/training data)

- **React Compiler is on** (`reactCompiler: true` in `next.config.ts`, babel plugin in deps). Do not add `useMemo`/`useCallback`/`React.memo` for performance — the compiler handles it. Lint runs `eslint-plugin-react-hooks` v7, which enforces compiler-era rules (e.g. no `setState` calls directly in effect bodies).
- **shadcn/ui `base-nova` style = Base UI, not Radix.** Generated components import `@base-ui/react/*` primitives. Never introduce `@radix-ui/*` imports or Radix-style APIs; add components with `npx shadcn add <name>` (config in `components.json`), don't hand-write Base UI wiring, and don't refactor the generated files.
- Props are typed as `XxxPrimitive.Root.Props` etc. from the Base UI package; no `forwardRef` anywhere (plain function components, React 19 style).
- Base UI `Select` is not Radix-shaped: `<Select value={string | null} onValueChange={(value) => ...}>`, placeholder via `<SelectValue placeholder="..." />`, and the trigger shows it greyed through `data-placeholder:text-muted-...`.
- `cn` is imported from the `cn` npm package (this is what all `src/components/ui/**` do); `src/lib/utils.ts` just re-exports it. It's a compiled clsx + tailwind-merge drop-in, so classes later in a `className` prop override the component's defaults — restyle shadcn components that way instead of editing them.
- **Tailwind v4, CSS-first**: no `tailwind.config`; theme tokens live in `@theme inline` in `src/app/globals.css`. Dark mode is a `.dark` class on `<html>` via `@custom-variant dark`.

## Conventions

- Home (`src/app/page.tsx`) renders Navbar → Banner → WhyChoose → Testimonials → Cta inside `<main>`, `Footer` outside it. Sections are kebab-case files with PascalCase named exports in `src/components/` (e.g. `why-choose.tsx` → `WhyChoose`).
- Shared container is `mx-auto max-w-7xl px-4` — Navbar, WhyChoose, Testimonials, and Footer all align to it; Banner and Cta are full-bleed on purpose. Keep new sections on the container.
- Design language: `cyan-600` accent (nav, links, buttons), serif headings via `font-serif` (Playfair Display through `--font-serif` set in `src/app/layout.tsx`), Josefin Sans body.

## Structure

- `src/app` — App Router routes (`/`, `/add-destination`, `/api/destinations`); `src/components` — home sections; `src/components/ui` — generated shadcn components (leave alone); `src/lib` — `db.ts`, `models/`, `utils.ts`; `src/hooks`. Path alias `@/*` → `./src/*`.
