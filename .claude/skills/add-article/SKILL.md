---
name: add-article
description: Publish a new on-site article to the ImpACT Consulting website (impactconsultingagency.org). Use when Sierra pastes article text and asks to add/publish/post it to the site, or says "add this article", "publish this to the site", "new blog post". Creates the article page, adds its card to the Articles index, updates the sitemap, and pushes live.
---

# Add Article (ImpACT Consulting site)

Turns pasted article text into a live page at `impactconsultingagency.org/articles/`. The repo is at `/Users/sierrabonn/assets/impact-consulting-site` (GitHub: `smbonn/impact-site`, deployed via GitHub Pages, live in ~1 minute after push).

## Inputs

From Sierra's message, extract:
- **Article text** — title + body. If she only pastes body text with no clear title, ask for one (don't invent it).
- **Category** — one of the site's existing tags (e.g. "Career & Leadership", "Organizational Strategy", "Pageant Strategy") or a new short one if it clearly doesn't fit. If ambiguous, ask.
- **Publish date** — default to today unless she says otherwise.

Everything else (meta description, excerpt, slug) — derive it yourself per the steps below. Don't ask for things you can reasonably infer.

## Steps

1. **Slugify the title** — lowercase, spaces to hyphens, strip punctuation. E.g. "What Nationals Ready Actually Means" → `what-nationals-ready-actually-means`. Check `articles/` for a collision; append `-2` if needed.

2. **Copy the template**: `cp articles/_template.html articles/<slug>.html`, then fill in every placeholder (grep the new file for these to make sure none are left before moving on):
   - `ARTICLE TITLE HERE` → real title (appears 3x: `<title>`, `og:title`, JSON-LD `headline`)
   - `One or two sentence summary of the article...` → a one-sentence summary you write from the article's actual content (2x: meta description, `og:description`)
   - `YOUR-SLUG` → the slug from step 1 (3x, in canonical/og/JSON-LD URLs)
   - `2026-01-01` → publish date, `YYYY-MM-DD`
   - `CATEGORY HERE` → the category
   - `Article Title Here` (the `<h1>`) → real title
   - `Month Day, Year` in the byline → formatted publish date (e.g. "July 9, 2026")
   - The placeholder `<h2>`/`<p>` body block → the actual article, converted to HTML:
     - Paragraph breaks (blank line in the pasted text) → separate `<p>` tags
     - Any line that reads like a subheading → `<h2>`
     - Preserve the article's own voice and wording exactly — this is a copy/formatting pass, not a rewrite. Don't paraphrase, condense, or "improve" her sentences.
     - Escape any raw `&` as `&amp;` if it isn't already part of an entity.

3. **Add a card** in `articles/index.html`: find the `<!-- ARTICLE CARD TEMPLATE -->` comment in the "On the site" grid, copy the `<div class="card article-card">...</div>` block right below it, and paste your new card **above** the existing top card (newest-first order). Fill in:
   - `<span class="tag">` → category
   - `<h3>` → title
   - `<p class="meta">` → formatted publish date
   - the teaser `<p>` → your one-sentence summary from step 2
   - `<a class="card-link" href="...">` → `/articles/<slug>.html`

   If the placeholder "Starting Your First On-Site Article" card is still sitting there from the initial build, remove it now that a real article exists.

4. **Add to `sitemap.xml`**: copy an existing `<url>` block, set `<loc>` to `https://impactconsultingagency.org/articles/<slug>.html`.

5. **Sanity check before committing**:
   - `grep -rn "TITLE HERE\|YOUR-SLUG\|CATEGORY HERE\|Month Day, Year" articles/<slug>.html` → must return nothing
   - Confirm the new file has no leftover `_template.html`-style HTML comments (the "ARTICLE TEMPLATE" instructions block at the top) — delete that comment block, it's authoring notes only.

6. **Commit and push**:
   ```
   cd /Users/sierrabonn/assets/impact-consulting-site
   git add articles/<slug>.html articles/index.html sitemap.xml
   git commit -m "Add article: <title>"
   git push
   ```

7. **Report back**: give Sierra the live URL (`https://impactconsultingagency.org/articles/<slug>.html`) once pushed. GitHub Pages rebuilds in under a minute — mention that if she checks immediately and it looks stale, a hard refresh usually fixes it.

## Notes

- Never touch the `<header>`, `<nav>`, `<footer>`, or `<script>` blocks copied from the template — only the placeholders listed above.
- This is copy Sierra already wrote — preserve her voice. Fix only obvious typos; don't restructure sentences or change her tone.
- If she pastes an article that's clearly a Substack cross-post (i.e. it already lives on her Substack), ask whether she wants it duplicated on-site or just left to the automatic Substack feed sync — don't assume.
