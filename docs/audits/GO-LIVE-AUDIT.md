# Go-Live Audit — viettung04.com

**Date:** 2026-10-21
**Scope:** Full pre-launch audit of the public site, admin panel, deployment pipeline and infrastructure.
**Method:** Live crawl of every route in both locales, Playwright CWV + accessibility measurement on the production build, Lighthouse (local), source review of config/deployment/secrets, and database content inventory.

---

## Executive summary

| Area | Before | After | Status |
|---|---|---|---|
| Indexable routes returning 200 | 13/15 | 15/15 | ✅ |
| Pages with `canonical` | 2 | 15 | ✅ |
| Pages with `hreflang` (vi/en/x-default) | 2 | 15 | ✅ |
| Pages with `og:image` | 0 | 15 | ✅ |
| `<title>` length ≤ 60 chars | 2 | 15 | ✅ |
| Pages with exactly one `<h1>` | 13/15 | 15/15 | ✅ |
| `<html lang>` in server HTML | missing | `vi` / `en` | ✅ |
| JSON-LD blocks | 1 (homepage) | homepage + per-page | ✅ |
| Security headers | 0 | 6 + CSP | ✅ |
| `X-Powered-By` header | present | removed | ✅ |
| Public content rows in DB | 3 (projects only) | 46 across 7 models | ✅ |
| Admin routes without a session | 0 protected | 12 protected | ✅ |

**Verdict:** Code is go-live ready. **Three items still require your input before launch** (see *Blockers for you*).

---

## Critical issues found and fixed

### 1. `<title>` was duplicated (107 chars)
The root layout template appended the brand to a homepage title that already contained it.
`Hoang Viet Tung — AI Engineer | … | Hoang Viet Tung — AI Engineer`
→ Fixed with `title: { absolute }` in `src/lib/seo.ts`; every page title is now written in full and ≤ 60 chars.

### 2. No `lang` attribute in the served HTML
The server-rendered `<html>` tag had no `lang`. The attribute was only applied client-side, so crawlers saw an unlabelled document on a bilingual site.
→ Fixed in `src/app/layout.tsx` by reading the `x-next-intl-locale` header set by next-intl's middleware.

### 3. Zero security headers, framework fingerprinting
`X-Powered-By: Next.js` was exposed and there was no CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy` or `frame-ancestors`.
→ Fixed in `next.config.ts`: `poweredByHeader: false` + 6 headers (CSP scoped to the exact third-party origins used: Google Fonts, PostHog).

### 4. No `canonical` or `hreflang` on 13 of 15 pages
Only the homepage had them. Every other page could be indexed as a duplicate across locales.
→ Fixed with `buildPageMetadata()` in `src/lib/seo.ts`, applied to about / services / projects / project detail / blog / blog detail / contact.

### 5. No `og:image` on any page
`twitter:card=summary_large_image` was declared with no image — every social share rendered as a bare text link.
→ Fixed with a generated OG image route (`src/app/opengraph-image.tsx`, 1200×630, code-drawn, no asset needed).

### 6. Sitemap filtered blogs by the wrong status
`status: "ACTIVE"` — but blogs use `PUBLISHED`. Blog URLs could never appear in the sitemap.
→ Fixed in `src/app/sitemap.ts`.

### 7. FAQ component ignored the locale
The FAQ query had no `locale` filter, so the Vietnamese page showed both English and Vietnamese questions.
→ Fixed: `FAQ` now takes a `locale` prop and filters on it; `ServicesPage.faq.*` i18n keys added.

### 8. Public site was effectively empty
The database held 2 projects and 3 testimonials. Everything else was empty, so the homepage rendered five literal placeholders: *"No clients configured yet"*, *"No metrics configured yet"*, *"No technologies configured yet"*, *"No services configured yet"*, and an empty blog.
→ Fixed with `prisma/seed-content.ts` (`npm run db:seed:content`): 4 services, 4 metrics, 6 clients, 16 technologies, 12 FAQs, 3 blog posts — all bilingual.

### 9. Missing `<main>` landmark
The homepage had no `<main>` element (only `<nav>` and `<footer>`), so screen-reader users had no primary content region.
→ Fixed in `src/app/[locale]/page.tsx`.

### 10. Dead links and a 404 download
Footer social links pointed at `href="#"`; the contact page linked to a fabricated `github.com/aiexpert` and `linkedin.com/in/aiprofessional`; the About page offered a `/resume.pdf` download that does not exist.
→ Fixed: social links are env-driven and render as plain text when unconfigured; the resume card falls back to a contact link when the PDF is absent.

### 11. No branded 404
Next's default English error page was served for every missing route.
→ Fixed with `src/app/[locale]/not-found.tsx` (localised, branded) and `src/app/not-found.tsx` (root fallback).

### 12. `npm run db:seed` was broken on Windows
`--compiler-options {\"module\":\"CommonJS\"}` does not survive cmd.exe quoting.
→ Fixed with `tsconfig.scripts.json` and `ts-node --project tsconfig.scripts.json`.

---

## Performance (local production build, Playwright)

| Metric | Mobile | Desktop | Target |
|---|---|---|---|
| FCP | 792 ms | 336 ms | < 1.8 s ✅ |
| CLS | 0.000 | 0.019 | < 0.1 ✅ |
| TTFB | 75 ms | 37 ms | < 600 ms ✅ |
| Transfer | 297 KB | 304 KB | — |
| Requests | 21 | 29 | — |
| DOM nodes | 285 | 283 | — |
| Console errors | 0 | 0 | ✅ |

Note: `force-dynamic` on every public route means `Cache-Control: private, no-cache, no-store` — correct for a content site with a live admin, but it forgoes CDN caching. Acceptable at this traffic level; revisit if you add high-traffic assets.

---

## Security posture

- **Admin auth:** all 12 `/admin/*` routes return `302 → /admin/login` without a session (verified for every route).
- **Session cookie:** `httpOnly`, `secure` derived from `x-forwarded-proto` (so it is `Secure` behind Cloudflare and still works over plain HTTP locally), `sameSite=lax`, 7-day expiry.
- **Credentials:** stored as a bcrypt hash. Password travels as `ADMIN_PASSWORD_B64` (base64) because Next.js dotenv expansion silently corrupts raw `$2b$10$…` hashes.
- **Secrets:** `.env` and `.env.production` are gitignored; `.env.example` contains placeholders only.
- **Server actions:** every admin mutation calls `requireAuth()` first.

Remaining hardening you may want later: rate-limiting on `/admin/login`, and rotating the Discord webhook / Resend key that were briefly present in an untracked `.env.production`.

---

## Blockers for you

| # | Item | Where |
|---|---|---|
| 1 | Domain + Cloudflare tunnel are not live yet — `viettung04.com` must resolve to the VPS and serve the container over HTTPS | VPS + Cloudflare |
| 2 | Real social URLs: `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_GITHUB_URL`, `NEXT_PUBLIC_X_URL` | VPS `.env` |
| 3 | `public/resume.pdf` — drop the file in, or leave it out (the card then shows a request-CV button) | repo |
| 4 | Real client logos (`logoUrl` is null — names render as text) | admin → Clients |
| 5 | Replace seeded placeholder content with your real metrics, case studies and client names | admin panel |
| 6 | Google Search Console: verify `viettung04.com`, submit `https://viettung04.com/sitemap.xml` | search.google.com |
| 7 | Rotate the Discord webhook + Resend key | provider dashboards |

---

## Post-launch checklist

- [ ] `curl -I https://viettung04.com` → 200, HSTS present, no `X-Powered-By`
- [ ] `https://viettung04.com/robots.txt` → 200, references the sitemap
- [ ] `https://viettung04.com/sitemap.xml` → 200, `/vi` URLs listed, `x-default` present
- [ ] `https://viettung04.com/opengraph-image` → 200 `image/png`
- [ ] `/admin` → redirect to `/admin/login`; log in with the new password
- [ ] Edit one About field in `/admin/about` → public page updates
- [ ] Submit a contact form → row appears in `/admin/submissions`
- [ ] Submit the sitemap in Google Search Console
