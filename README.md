# Evolve Events — Next.js site

Next.js (App Router) · TypeScript · Tailwind CSS 4 · GSAP + Lenis · English / Arabic (RTL)

## Run

    npm install
    npm run dev        # http://localhost:3000 (redirects to /en or /ar)
    npm run build && npm start

## Where things live

- All page copy (EN): `src/i18n/en.ts`
- All page copy (AR, same shape as EN): `src/i18n/ar.ts`
- Locale redirect (`/` to `/en` or `/ar`): `src/proxy.ts`
- Pages: `src/app/[lang]/*`
- Brand colours, fonts, motion CSS: `src/app/globals.css`
- Scroll/entrance animations: `src/components/Motion.tsx`, driven by `data-*` attributes
  (`data-hero`, `data-reveal`, `data-stagger`, `data-split`, `data-clip`, `data-parallax`, `data-count`).
  All are skipped for visitors who prefer reduced motion.
- Contact form email: `src/app/api/contact/route.ts`

## Contact form

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` plus a verified sender.
Without it the API returns 503 and the form shows an error. It never pretends to send.

## Before launch

- Have a native Arabic speaker review `src/i18n/ar.ts`.
- Confirm the stats, testimonial and "award-winning" claims (copied from the old site) are true.
- Have the client's legal adviser replace the starter Privacy / Terms text.
- Hero video is already compressed (MP4 + WebM, about 1.2 MB each, 14 s loop).
- Set `NEXT_PUBLIC_SITE_URL`.
