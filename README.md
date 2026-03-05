# Applied Leverage Landing Page

Static single-page landing site for the Applied Leverage Implementation Sprint.

## Files

- `index.html` - page structure and content
- `styles.css` - visual system, layout, motion, and responsive styles
- `script.js` - scroll reveal interactions
- `favicon.svg` - site icon
- `.nojekyll` - disables Jekyll processing for GitHub Pages

## Local preview

From the project root:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy to Vercel

1. Push this folder to a Git repository.
2. In Vercel, create a new project and import the repository.
3. Keep the default static-site settings.
4. Deploy. No build command is required.

## Deploy to GitHub Pages

1. Push this folder to GitHub.
2. In the repository settings, open `Pages`.
3. Set the source to `Deploy from a branch`.
4. Choose the default branch and the `/ (root)` folder.
5. Save. GitHub Pages will publish the site directly from these static files.

## Customize before launch

- Update the `mailto:` CTA in `index.html` if the booking email should change.
- Adjust copy blocks in `index.html` for pricing, qualification, or offer details.
- If you want custom social previews, add an image asset and wire the relevant Open Graph tags.
