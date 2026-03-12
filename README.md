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

## Notes

- Intake forms submit through FormSubmit to `lucas@appliedleverage.io`. Update `lib/intake-submissions.ts` if the intake destination changes.
- Static funnel pages at `/public/assess` and `/public/diagnostic` now load shared runtime config from `/public/funnel-config.js`.
  - Default same-origin endpoints are `/api/intake/assessment` and `/api/intake/diagnostic`.
  - Override `window.ASSESSMENT_ROADMAP_ENDPOINT` or `window.DIAGNOSTIC_APPLICATION_ENDPOINT` only if submissions need to bypass the built-in Next.js handlers.
  - If an endpoint is unavailable or fails, the pages still fall back to the safe `mailto:` path.
- Legacy static files (`index.html`, `prospectus.html`, PDFs) remain in the repo for reference but are not part of the Next.js runtime.
