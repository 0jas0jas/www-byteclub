# Byte Club website

Single-page bilingual (FR/EN) marketing site for Byte Club, a cohort-based program that connects high school students with nonprofits. There are also two Supabase-backed forms (`/partner` for nonprofits, `/apply` for students) and a privacy policy. The README covers setup, Supabase and deploy steps. This file covers what isn't obvious from the code.

## Commands

- `npm run dev` / `npm run build` / `npm run lint` / `npm run typecheck`
- Run typecheck, lint and build after every change. All three should be clean (no warnings).
- Use npm. There's also a `bun.lock`, but npm is what's been used.
- Git repo on GitHub (`0jas0jas/www-byteclub`, branch `main`). `.gitignore` excludes `node_modules`, `.next/`, `.env*` and other generated files, so never commit those. Ask before deleting untracked files.

## Stack

Next.js 16 (App Router, `proxy.ts` instead of middleware) · TypeScript · Tailwind CSS 4 (configured in CSS, no `tailwind.config.js`) · next-intl · Supabase · Vercel. Every page is static; the only server code is the form Server Actions.

## Copy and i18n

- All user-facing text lives in `messages/en.json` and `messages/fr.json`. **Both files must have identical keys.** TypeScript checks keys against `en.json` only, so a key missing from `fr.json` won't be caught. Check parity yourself after edits.
- French is the default locale. Any copy change needs a French version too. French has been machine-written so far and needs a native-speaker review.
- Section components render lists from `const ITEMS = [...] as const` arrays that must match the message keys. If you add or remove a key, update that array.
- Edit JSON with a script (`json.load` → modify → `json.dump(..., ensure_ascii=False, indent=2)` + trailing newline). That keeps the formatting stable.

## Voice and content direction (from the team)

- **Nonprofits come first.** The site is aimed mainly at nonprofit orgs. The student side is a lighter draft the team will fill out later.
- The copy follows the team's own Q&A outline: *what is it? / is this real? / why should I care? / can I trust them? / logistics.* The student cards use their student questions as titles ("Am I good enough?", "Will it fit your schedule?").
- Tone is **sincere, plain and honest**, not jokey. Be upfront about limits:
  - It's free, but it costs nonprofits real time.
  - It's only worth it if they're okay with things being slow, a few mistakes, and working with students.
  - The 2025 first cohort was unsuccessful, and the system has been rebuilt since.
- Key facts: the team is college + high school students. Form-to-decision takes about 3–4 weeks (form → call → decide → build). A cohort runs about 3 months.
- Don't invent new promises or facts. The FAQ answers to "what if something goes wrong?" and "what if you disappear?" were written by Claude, and the team still needs to confirm them.

## Page structure

`app/[locale]/page.tsx`: Hero → HowItWorks → ForNonprofits → ForStudents → Status ("Who we are") → Team → GetInvolved → Faq.

- The "Our work" section was **removed on purpose**. `data/projects.json` and `public/images/projects/` are leftovers that nothing uses.
- ForStudents mirrors the ForNonprofits layout on purpose: 4 cards in a 2-column grid, then one dashed list card. Keep them symmetric.
- The FAQ is two independent columns (the item array is split in half), so opening an item doesn't shift the other column.
- Team cards show names only (no photos). `role` and `link` in `data/team.json` are optional (`null`).
- Nav anchors are listed in `lib/sections.ts`.

## Design rules

- **No pure white (`#fff` / `#ffffff`) anywhere.** The team asked for this explicitly. Use the cream tokens.
- **WCAG AA is required:** 4.5:1 for text, 3:1 for UI and focus, in both themes. Check the ratio whenever you change a color.
- All colors are CSS variables at the top of `app/globals.css`, mapped to Tailwind via `@theme inline`.
  - Brand colors from the logo: red `#ff0026`, purple `#9989ff`, yellow `#ffb632`, green `#9ee345`, pink `#f196e5`, ink `#0f0f0e`, cream `#f5f1e9`. They're available as `bg-brand-*` / `text-brand-*`, always paired with `text-brand-ink`.
  - `--accent` is purple. In light mode it's deepened to `#5440e0`, because raw `#9989ff` fails contrast as text on light backgrounds.
- **Theming:** there are three modes (system, light, dark), and system is the default.
  - `components/ThemeToggle.tsx` sets `<html data-theme="light|dark">` and stores the choice in localStorage. Choosing "system" removes both.
  - A pre-paint script (`lib/theme.ts` → `<head>` in `app/[locale]/layout.tsx`) applies the saved choice before first paint, so there's no flash.
  - The dark tokens are **duplicated** in `globals.css`: once under `prefers-color-scheme` and once under `[data-theme="dark"]`. Keep both in sync.
  - Tailwind's `dark:` variant is redefined with `@custom-variant` to follow the same rules.
- Logos are in `public/logos/`. `components/Logo.tsx` swaps the black and light wordmarks by theme (nav), and the footer uses `wordmark-color.svg`. `app/icon.svg` is a copy of `logos/logo.svg`. `public/images/og-image.jpg` was generated from the color wordmark on `#0f0f0e`.
- Sections alternate backgrounds with the `alt` prop on `<Section>`.

## Gotchas

- **Image caching:** after replacing an image in `public/` under the same filename, the dev server or browser can keep showing the old version. Rename the file, or clear `.next/cache/images` and hard-refresh. (This is why the hero is now `hero.jpg`.)
- The hero image is 3:2 (2048×1365). `Hero.tsx` uses `aspect-3/2` to match.

## Still placeholder / before launch

- Contact email and social links in `config/site.ts`
- Privacy policy (`privacy.*` keys) needs a Quebec Law 25 review. Remove the DRAFT banner and `robots: noindex` once that's done.
- "Who we are" still lists the Lucknow shelter project under "Done so far." Confirm with the team.
- Consent from everyone shown in the hero photo (some may be minors)
- Unused placeholder files: `public/images/team/*.jpg`, `public/images/projects/`, `data/projects.json`
