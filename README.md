# ImpACT Consulting website

Plain HTML/CSS/JS. No build step, no framework, no npm install required to
run it. One background automation (a GitHub Action) keeps the Substack
section current.

## File map

```
index.html                      Home
about.html                      About / meet the founder
organizational-strategy.html    Service page
career-leadership-coaching.html Service page
pageant-coaching.html           Service page (has FAQ schema + testimonials)
free-resources.html             Free downloads / lead magnets
contact.html                    Contact form (Formspree)
articles/index.html             Articles hub: on-site posts + live Substack feed
articles/_template.html         Copy this to start a new on-site article
css/style.css                   All styles, one file, CSS variables at the top
js/main.js                      Mobile nav toggle
js/substack-feed.js             Renders data/substack-posts.json on the Articles page
data/substack-posts.json        Cached Substack feed data (auto-refreshed)
scripts/fetch-substack.mjs      Node script that refreshes the JSON above
.github/workflows/update-substack.yml   Runs the script daily via GitHub Actions
sitemap.xml, robots.txt, CNAME  SEO / hosting plumbing
```

## Before you launch

1. **Brand kit — done.** Real colors, fonts, wordmark, and logo from
   `Impact Brand Guidelines.pdf` (v1.0) are all applied. Gilroy is
   self-hosted as `.woff2` in `assets/fonts/`, and the real logo lives at
   `assets/images/logo-black.png` (with `logo-white.png` on standby for a
   future dark section). See `BRAND-KIT.md` for full detail.
2. **Images**: photo `<img>` slots inside page content (not the logo/nav)
   and the OG image reference are still placeholders. Add real photos to
   `assets/images/` and wire them in (each has an `alt=""` attribute ready
   to fill in). See the Photography & image direction section of the brand
   guidelines for shot style.
3. **Contact form**: create a free account at formspree.io, create a form,
   and replace `YOUR_FORM_ID` in `contact.html` with your real form ID.
4. **Favicon**: drop a real `favicon.png` into `assets/images/`.

## Adding a new on-site article

1. Copy `articles/_template.html` to `articles/your-slug.html`.
2. Replace the title, meta description, canonical URL, schema, and body copy.
3. Add a card for it in the "On the site" grid in `articles/index.html`.
4. Add its URL to `sitemap.xml`.

## How the Substack section stays current

`scripts/fetch-substack.mjs` fetches `https://sierramariebonn.substack.com/feed`
(Substack's built-in RSS feed) and converts it into `data/substack-posts.json`.
`js/substack-feed.js` reads that JSON file on the Articles page and renders
cards from it. Because the browser only ever fetches a file on your own
domain, there's no CORS issue and no third-party script running on the site.

`.github/workflows/update-substack.yml` runs that script automatically once a
day (and any time you push to `main`) and commits the updated JSON. You never
have to touch it. To trigger it manually: GitHub repo &rarr; Actions tab &rarr;
"Update Substack feed" &rarr; Run workflow.

If you ever change your Substack address, update `FEED_URL` in
`scripts/fetch-substack.mjs`.

## Deployment

See the deployment walkthrough provided alongside this project for GitHub
Pages setup, DNS, and hosting alternatives.
