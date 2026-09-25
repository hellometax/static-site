# ✦ MetaX.Academy — Static Estate (MX-NAV-SPEC v2026.10.1)

An ultra-premium, mobile-first, futuristic static estate for the **MetaX Universe**,
curated by **Maher**, front route for `metax.academy`. This build implements
**MX-NAV-SPEC v2026.10.1** — 321 directory routes across nine pillars, a
Markdown-driven detail-page architecture, and the Maher License 2.3 with its
register of twenty-five structural harms as the governing "soul" of the estate.

> *"Every substantive claim carries the information a stranger needs in order to find out that it is wrong."*

---

## 1. Architecture (the smart part)

The estate uses a **data-driven, Markdown-fed** architecture so that hundreds of
routes share a tiny number of files. There are only **three page kinds**, and all
paths are **root-absolute** (`/css/…`, `/js/…`) as the spec requires.

| Kind | Shell markup | Rendered by | Content source |
|---|---|---|---|
| **Root** | `index.html` with `#pillars` | `js/home.js` | `MX_ROUTES.MENU` (live) |
| **Hub** (pillar or group) | `<main id="mx-hub" data-hub data-md>` **or** universal `<main id="mx-page">` | `js/hub.js` | card grid from `MX_ROUTES` + prose from `/content/…/_hub.md` |
| **Detail** (leaf) | `<main id="mx-doc" data-md>` **or** universal `<main id="mx-page">` | `js/md-page.js` | `/content/…/<leaf>.md` |

### The universal shell
Most routes ship an **identical minimal shell** carrying only `<main id="mx-page">`.
`js/page.js` reads `location.pathname`, looks it up in `MX_ROUTES`, decides
hub-vs-leaf, derives the Markdown path (`/a/b/` → `/content/a/b/_hub.md`;
`/a/b/c/` → `/content/a/b/c.md`), and dispatches to the right renderer. This keeps
300+ shells DRY.

### The one Markdown parser
`js/md-page.js` is the single MD→HTML renderer: YAML-lite front matter
(`title, eyebrow, deck, status, evidence, version, reviewed, up/beside/depends/governs,
deeper/sideways, thin, jsonld`) + a safe block/inline parser (escapes first, then
`code`/`**bold**`/`*em*`/links, headings, lists, blockquotes, GFM tables). It builds
the full **page contract**: hero + `.mx-pagestamp` + marquee, `.reveal` sections,
the `.mx-related` four-group lattice (Up / Beside / Depends on / Governs), and the
two-action `.mx-exitpair`.

---

## 2. JavaScript layer (`/js/`)

| File | Role |
|---|---|
| `routes.js` | **Single source of truth.** `MX_ROUTES = { MENU (9 pillars), UTILITY, navKeyFor(), allRoutes() }`. |
| `chrome.js` | Header mega-menu, mobile accordion (1180px), utility bar, **demo strip (§6.4)**, 4-col footer (§8.1), search modal (lazy `/data/search-index.json`, falls back to `allRoutes()`). |
| `md-page.js` | The one Markdown parser + detail renderer. `window.__mdPage`. |
| `hub.js` | Hub landing renderer (auto card grid + appended MD prose). `window.__hub`. |
| `page.js` | Universal dispatcher for `#mx-page` shells. |
| `home.js` | Root `#pillars` grid from `MX_ROUTES` (live counts, `data-count-src`). |
| `search-page.js` | `/search/` route index + live filter (also the sitemap). |
| `skeleton.js` | Reused as-is: `window.MX` (`skeletonHTML`, `lazy`, `observeReveal`, `hydrateNow`). |

`css/style.css` (token layer + components, reused) → `css/estate.css`
(v2026.10.1 additions: 1180px fluid nav, `.mm-hub`, `.mx-pagestamp`, `.mx-exitpair`,
`.mx-related`, `.mx-demo`, MD prose, search modal, `prefers-reduced-motion`).

---

## 3. Completed content (this pass)

**All 9 pillar hubs + all 45 group hubs are built** (shell + 1200–1800-word MD each),
plus deep leaf pages for the License "soul" and key About pages.

- **Root**: `index.html` (9-pillar landing).
- **Infra**: `_redirects`, `robots.txt`, `sitemap.xml`, `/search/`, `/404.html`, `/data/search-index.json`.
- **9 pillar hubs**: `/toptech/ /method/ /ascent/ /metax/ /academies/ /credentials/ /library/ /license/ /about/`.
- **45 group hubs** — every group in `MX_ROUTES` (TopTech 6, Method 6, Ascent 3, Meta-X 4, Academies 5, Credentials 5, Library 6, License 5, About 5).
- **License deep leaves (the soul)**: Part H; all six harm strata (HX-01…HX-25); the Seven Absolutes; Roles (§H.1-bis); the Scale Gate (§H.2-bis); the Statement Form; and **MetaX's own Part H Statement** (marks **HX-01 & HX-04 unremedied** due to the ad slots, per §10).
- **About key leaves**: Demo Notice, Defect Log, Advertising Policy.

Every page carries: root-absolute paths · canonical + `hreflang` en/ar · status
badge from the four permitted values (`live/planned/research-preview/gated`) ·
evidence class · review date · `.mx-related` (≥8 internal links) · `.mx-exitpair`
(exactly 2) · demo strip · **MacroLifeTech** spelled correctly everywhere.

---

## 4. Functional entry URIs

- `/` — root estate landing.
- `/{pillar}/` — nine pillar hubs.
- `/{pillar}/{group}/` — 45 group hubs.
- `/{pillar}/{group}/{leaf}/` — detail pages (License + About leaves live; others resolve to a graceful "being written" state until their MD ships).
- `/search/` — full route index, live filter, human-readable sitemap, no-JS fallback.
- `/404.html` — route-not-found with pillar jump links.
- `/data/search-index.json` — generated search index (54 hubs + key leaves).

---

## 5. Data models

- **`MX_ROUTES`** (`js/routes.js`) — canonical nav: MENU (pillars→groups→links), UTILITY, `navKeyFor()`, `allRoutes()`.
- **Markdown front matter** — per-page metadata + related-link lattice (see §1).
- **`/data/search-index.json`** — `[{url,title,cat,kind,blurb}]`.
- No backend, no table API used; all state is static files + client JS.

---

## 6. Not yet implemented (next session, when the rest of the corpus lands)

- Individual **leaf MD** for the six non-License/About pillars (shells + graceful fallback are in place; group card grids already list them).
- Parametric families: series `/toptech/s/{S##}-{slug}/`, courses, individual harm pages `/license/harms/hx-{nn}/`, rung pages, program pages, lexicon entries, news articles.
- The **`/ar/`** Arabic mirror (routing + `navKeyFor` already strip `/ar/`).
- Client tools: the Statement Generator, the Verify lookup, the Placement Diagnostic.

---

## 7. Verification

Rendered and confirmed with Playwright (desktop + mobile): root pillar grid, a
group hub (Credentials · The Ladder), a detail page (MetaX's Own Statement), the
search/sitemap page, and the mobile hamburger collapse at 1180px — all render with
zero JS errors and no raw Markdown/code leakage. A critical `chrome.js`
unescaped-quote bug (which broke every page) was found and fixed this pass.

> Note: the in-editor Playwright preview cannot resolve root-absolute `/css/ /js/`
> paths (it 404s them against the preview domain); those resolve correctly on
> Cloudflare Pages. Verification used relative-path harnesses to exercise the same
> renderers.

---

## 8. Deployment

Publish via the **Publish tab** (or a Hosted Deploy). The build is pure static
HTML/CSS/JS with `_redirects` for the legacy flat URLs.

---

## 9. Changelog — 2026-09-25 · navigation audit & repair

See `SITE_MAP.md` (§4 navigation, full route tree) and `CONTENT_GAPS.md`.

- **Deployed ≠ main.** `metax.academy` serves the older flat 7-pillar build;
  none of this build's `/js/routes.js`, `/css/estate.css`, `/content/**` or
  directory routes exist in production.
- **249 missing shells generated** (`tools/gen-shells.js`). Leaf routes had no
  `index.html`, so they served the site 404 instead of the "being written" state.
- **Header overflow fixed.** At 1280–1920px the header row was 138–365px wider
  than the viewport, which pushed Search and Sign in off-screen. Tabs now keep a
  comfortable size, and a measured `fit()` folds pillars into a new **More ▾**
  drawer (full group/leaf trees, priority in `MX_ROUTES.NAV_PRIORITY`).
- **Panels** are pinned to the viewport and scroll internally. Method, Academies
  and License panels ran below the fold before.
- **Three-level active state** (`MX_ROUTES.activeTrail`): pillar, group and leaf,
  with `aria-current` plus a non-colour visual marker in the mega panel, More
  drawer and mobile menu.
- **Keyboard**: pillar triggers are `<button>`s (Enter used to navigate away
  before the panel could be used). A panel opens on focus. Enter/↓ go into it,
  ←/→ move between tabs, Esc closes it and returns focus, and Tab moves tab to
  tab (it used to take 36 presses to reach the second tab). Hover and
  `aria-expanded` no longer diverge. There is a skip link, and the search modal
  returns focus on close.
- **Mobile**: the utility bar is icon-only instead of `display:none`. The
  accordion is single-open, and the current pillar starts expanded and scrolled
  to the current page. The 900px panel cap that cut off half of License/Method is
  removed. Each pillar has a link to its hub.
- Double Markdown fetch on hubs/leaves removed. Search now covers every
  `MX_ROUTES` entry.
- Verified the Turn-5 fixes still hold: the mobile toggle binds after the header
  is built, the `/img/` hero paths are root-relative, and the menu is capped
  at `100dvh − 66px`.
- Tools: `tools/route-inventory.js`, `pages-server.js` (a Pages-faithful local
  server), `nav-audit.js` (Playwright), `gen-shells.js`, `gen-site-map.js` and
  `gen-content-gaps.js`.
