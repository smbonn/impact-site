# Brand kit application notes

Applied from `Impact Brand Guidelines.pdf` (Version 1.0, July 2026) to the
site in this repo. This file documents exactly what was applied, what was
inferred, and what's still open.

## Colors — applied exactly as specified

All hex values in `css/style.css` are copied verbatim from the guidelines,
using the same variable names (`--cream`, `--navy`, `--teal`, `--sage`,
etc.) so any future designer/developer can cross-reference the two documents
directly. Rose and gold are intentionally **not defined** anywhere in this
stylesheet — those are Stage Ready-only per the guidelines, and keeping them
out of the CSS entirely (rather than defining-but-not-using them) makes it
structurally impossible to accidentally reach for them on this site.

## Fonts — resolved, Gilroy is live

Read directly from the PDF's embedded font table (`pdffonts`), not just the
visual specimen, so these are exact:

- **Display**: Playfair Display (SemiBold / Regular / Italic) — free, on
  Google Fonts, already wired up in every page's `<head>`.
- **Body/UI**: **Gilroy** (Light / Regular / Medium / Bold / Heavy) —
  licensed files supplied from `~/assets/fonts/`, converted from `.ttf`/`.otf`
  to `.woff2` (via fontTools) and self-hosted at `assets/fonts/`. Poppins
  stays in the font stack only as a fallback for the brief window before
  the woff2 files finish loading.

The `@font-face` block at the top of `css/style.css` points at all five
self-hosted weights. No further action needed.

## Logo — resolved, real logo file is live

The guidelines describe the wordmark rule (lowercase "imp" + uppercase
"ACT" + tracked "CONSULTING"). The real exported logo (`impact logo
black.png`, from `~/Desktop/ImpACT Consulting/`) is now used everywhere —
`assets/images/logo-black.png`, referenced via `<img>` in the header and
footer `.logo` markup on all 9 pages. `logo-white.png` is also copied into
`assets/images/` and ready to use if a dark-background section is added
later (none currently exists on the site). Favicon and Apple touch icon
were generated from the same logo file (`assets/images/favicon.png`,
`favicon-512.png`, `apple-touch-icon.png`).

## Accessibility — three contrast fixes made to match the guidelines' own floor

The guidelines set a WCAG 2.2 AA floor and specifically flag `--teal-ink` as
the "accessible text/hover" variant of teal. I ran the actual contrast math
(WCAG relative-luminance formula) on every color pairing this site uses, and
three combinations that would read as "on-brand" visually actually fail
AA:

| Pairing | Ratio | Passes AA? |
|---|---|---|
| Raw teal `#2A9D8F` text on cream | 2.44:1 | **No** (needs 4.5:1) |
| White text on raw teal button | 3.32:1 | **No** at this text size |
| Sage `#81B29A` text on sage-pale badge background | 1.58:1 | **No**, badly |
| Teal-ink `#276468` text on cream | 4.96:1 | Yes |
| White on teal-ink button | 6.75:1 | Yes |
| Navy text on sage-pale badge background | 6.65:1 | Yes |

So: body links, button backgrounds, and badge/tag text all use `teal-ink`
or `navy` rather than raw `teal`/`sage`, exactly matching what the
guidelines' own naming ("teal-ink: accessible text/hover") already implied.
Raw `--teal` is preserved for large decorative surfaces and icon fills where
contrast rules don't apply the same way (e.g. the wordmark's "ACT," which
falls under WCAG's logo exception).

## Icons

Lucide, loaded via the CDN URL the guidelines specify, initialized once in
`js/main.js`. Currently used in the three homepage pillar cards (in
brand-spec "icon well": 26px icon in a 64px pale-sage circle) and the
footer/contact social links. Add more with
`<i data-lucide="icon-name"></i>` anywhere — `lucide.createIcons()` already
runs on every page load.

## Voice, tone, and content rules

Scanned all existing site copy against the guidelines' off-limits word list
(revolutionary, game-changer, disruptive, unlock your potential,
cutting-edge, innovative) and emoji usage — the site was already clean on
both before this pass. No changes needed here, just verified.

## Not yet built

The guidelines also cover slide decks, social post templates, YouTube
thumbnails, and Instagram Reels covers — those are content-production
systems (for Canva/Figma/wherever decks and social graphics get made), not
website components, so they're out of scope for this HTML/CSS site and
intentionally not addressed here.
