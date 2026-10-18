# Byte Club website

Bilingual (FR/EN) single-page site for Byte Club, plus two forms that write to Supabase and a privacy policy.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · next-intl · Supabase · Vercel

## Running locally

Needs Node 20+.

```bash
npm install
cp .env.example .env.local   # then fill it in (see Supabase below)
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

The site works without Supabase configured. The forms will show their translated error message until you add the env vars.

## Setting up Supabase

1. Create a project at [supabase.com](https://supabase.com). Under **Region**, pick **Canada (Central)**. You can't change this later, and the privacy policy says Canada.
2. Run the migration. Either:
   - **Dashboard:** open **SQL Editor**, paste the contents of `supabase/migrations/20261002000000_create_form_tables.sql`, then run it, **or**
   - **CLI:** `npx supabase link --project-ref <ref>` then `npx supabase db push`.
3. Go to **Project Settings → API** and copy the **Project URL** and the **anon public** key into `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
4. Submit a form, then check **Table Editor → partner_inquiries / student_applications**.

What the migration sets up:

- Two tables, `partner_inquiries` and `student_applications`. Each one stores a `locale` (`fr`/`en`) so you know which language to reply in.
- Row Level Security: the `anon` role can **only INSERT**. It has no SELECT, UPDATE or DELETE. You read submissions in the dashboard, which bypasses RLS. The anon key is safe to expose.
- `CHECK` constraints that mirror the form validation, so bad data can't get in even if someone skips the website.
- A trigger that rejects more than 3 submissions per email per hour per table. It's the spam backstop behind the honeypot field and the in-memory per-IP limit in `lib/rate-limit.ts`.

## Editing copy

All text lives in `messages/fr.json` and `messages/en.json`, and both files have the same keys. Change the text, save, done. TypeScript checks keys against `en.json`, so if you add a key to one file, add it to the other too.

A few things are **not** in the message files:

- Project case studies → `data/projects.json`
- Team members → `data/team.json`
- Email, Discord and social links → `config/site.ts`
- Colors and fonts → `app/globals.css` (CSS variables at the top) and `app/[locale]/layout.tsx` (fonts)

French is the default locale. Visiting `/` redirects to `/fr` or `/en` based on the browser language. No cookie is set.

## Changing the look

Every color is a CSS variable at the top of `app/globals.css`, with a light set and a dark set (`prefers-color-scheme`). Tailwind maps them in the `@theme inline` block (Tailwind 4 uses CSS for config, so there is no `tailwind.config.js`). Change `--accent` and the whole site follows. Keep text on background at 4.5:1 contrast or better.

## Replacing placeholder images

Everything in `public/images/` labeled "REPLACE ME" is a placeholder. Overwrite it with a real file that has the same name, or point the JSON at a new file.

| File | Used for | Suggested size |
| --- | --- | --- |
| `hero.jpg` | Hero | 2048×1365 (3:2) |
| `projects/lucknow-shelter-screenshot.jpg` | Case study | 1200×800 |
| `projects/lucknow-shelter-photo.jpg` | Case study | 1200×800 |
| `og-image.jpg` | Social share preview | 1200×630 |

`next/image` resizes and compresses them automatically.

## Adding a team member

Add an entry to `data/team.json`:

```json
{
  "name": "Firstname",
  "role": { "fr": "Mentor", "en": "Mentor" },
  "link": "https://github.com/username"
}
```

`role` and `link` can both be `null`.

## Adding a project

1. Put 1–2 images in `public/images/projects/` (3:2 ratio works best).
2. Add an object to `data/projects.json` with the same shape as the Lucknow entry. Every user-facing field has `fr` and `en`. `quote` is optional, so delete it or set it to `null`. `orgUrl` can be `null`.

Projects show up in array order.

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel, click **Add New → Project**, import the repo, and keep the defaults (it detects Next.js).
3. Under **Environment Variables**, add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `NEXT_PUBLIC_SITE_URL` (your real domain, no trailing slash. Canonical URLs, hreflang and the sitemap depend on it).
4. Deploy. Add your custom domain under **Settings → Domains**.

Every page is prerendered as static HTML. The form submissions are the only server code, and they run as Server Actions.

## Analytics

None by default: no cookies, no tracking. There's a commented-out Plausible slot in `app/[locale]/layout.tsx`. If you turn it on, update the privacy policy.

## Before launch checklist

- [ ] Review the privacy policy (`privacy.*` in both message files): privacy officer name and contact, retention periods. Then remove the DRAFT banner in `app/[locale]/privacy/page.tsx` and the `robots: { index: false }` in that page's metadata.
- [ ] Real email, Discord and social links in `config/site.ts`
- [ ] Replace placeholder copy, people and images
- [ ] Set `NEXT_PUBLIC_SITE_URL` on Vercel
- [ ] Decide whether the minimum age stays at 14. It's set in `lib/forms.ts`, the migration's `CHECK`, and the copy. Under Quebec law, collecting info from under-14s needs parental consent.

## Project layout

```
app/
  [locale]/            pages: home, partner, apply, privacy (/fr/confidentialite), 404
  actions.ts           server actions: validate (Zod) → rate limit → insert
  globals.css          theme tokens + base styles
components/            Nav, Footer, LocaleSwitcher, sections/, forms/
config/site.ts         external links
data/                  projects.json, team.json
i18n/                  next-intl routing, navigation, request config
lib/                   schemas, rate limit, Supabase client, metadata helpers
messages/              fr.json, en.json
proxy.ts               locale detection + redirects (Next 16's "middleware")
supabase/migrations/   tables, RLS, rate-limit trigger
```
