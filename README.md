# Applied Leverage Website

Multi-page Next.js marketing site for Applied Leverage.

## Routes

- `/` - Home
- `/why` - The Problem
- `/diagnostic` - Diagnostic offer + application form
- `/sprint` - Sprint offer + waitlist form
- `/about` - Lucas + AI council story
- `/apply` - Combined intake page
- `/workbook` - Self-guided workbook offer page

## Content source

Page copy lives in `copy/*.md`. The React layer reads those markdown files directly, so copy changes do not require editing route components.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality gates

```bash
npm test
npm run lint
npm run build
```

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import the repo into Vercel as a Next.js project.
3. Keep the default build settings.
4. Add the custom domain when ready.
5. Set runtime variables from `.env.example` in Vercel before flipping offer state or lifecycle providers.

## Notes

- Intake forms currently submit through FormSubmit to `lucas@appliedleverage.io`, but the route-layer delivery metadata now resolves through `lib/lifecycle-providers.ts` first so the ledger can tell the difference between a true FormSubmit path and a FormSubmit fallback during a future Kit cutover.
- Static funnel pages at `/public/assess` and `/public/diagnostic` now load shared runtime config from `/public/funnel-config.js`.
  - Default same-origin endpoints are `/api/intake/assessment` and `/api/intake/diagnostic`.
  - Override `window.ASSESSMENT_ROADMAP_ENDPOINT` or `window.DIAGNOSTIC_APPLICATION_ENDPOINT` only if submissions need to bypass the built-in Next.js handlers.
  - If an endpoint is unavailable or fails, the pages still fall back to the safe `mailto:` path.
- Workbook checkout state still has two config inputs:
  - `NEXT_PUBLIC_WORKBOOK_CHECKOUT_URL` is only the build-time fallback for components that hydrate with an initial value.
  - `window.WORKBOOK_CHECKOUT_URL` in `/public/funnel-config.js` is the runtime source of truth for the public funnel and should be updated whenever checkout status changes.
  - Server-rendered copy on Next routes should stay state-neutral unless it is reading the runtime value directly in the browser.
  - When promoting checkout, update both values, then smoke-check `/`, `/workbook`, `/assess`, and `/diagnostic` so the funnel tells one story.
- Legacy static files (`index.html`, `prospectus.html`, PDFs) remain in the repo for reference but are not part of the Next.js runtime.
