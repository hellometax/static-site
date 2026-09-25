# SITE_MAP — MetaX.Academy static estate

<!-- GEN:stamp -->
_Generated 2026-09-25 by `node tools/gen-site-map.js` from `js/routes.js` + `content/**` on disk. Do not hand-edit GEN blocks._
<!-- /GEN:stamp -->

> **Read this first — production is not running this repository.**
> On 2026-09-24 `https://metax.academy/` served the *pre-v2026.10.1 flat build*
> (`js/site.js` + `js/components.js`, 7 pillars: TopTech · Ascent · BCIA ·
> Academies · Credentials · Library · About). `/js/routes.js`, `/js/chrome.js`,
> `/css/estate.css`, `/content/**` and every directory route below (e.g.
> `/toptech/start/`) return **404** in production, and no file in production
> matched any commit on `main` byte for byte except `js/main.js`. Everything in this file
> describes `main`. See `CONTENT_GAPS.md` §0 and the PR description for details.

## 1. Numbers

<!-- GEN:summary -->
| Measure | Count |
|---|---|
| Pillars | 9 |
| Group hubs | 45 |
| Leaf routes in `MX_ROUTES` | 265 |
| **Total routes** | **319** |
| Leaves with authored Markdown (`live`) | 15 |
| Leaves whose group has a `_hub.md` but the leaf has no `.md` (`hub-only`) | 249 |
| Leaves with no file at all (`no file`) | 1 |
| Hubs (pillar + group) with `_hub.md` | 54 / 54 |
| Routes with an `index.html` shell | 318 / 319 (of which 249 generated, `noindex`) |
| Routes where the `badge` says `live` but the leaf has no Markdown | 170 |
<!-- /GEN:summary -->

**Status definitions**, checked against the files on disk, not the `badge` field:

- **live**: `content/<pillar>/<group>/<leaf>.md` exists (hubs: `content/…/_hub.md`).
- **hub-only**: the leaf has no `.md`, but its group has a `_hub.md`, so the
  group landing page works and lists the leaf. The leaf page itself shows the
  "being written" state.
- **no file**: the leaf has no `.md` and nothing upstream covers it. The one
  case today is the external plain-text mirror `/license/ml-2-3/ml-2-3.txt`,
  which is linked from the menu but not present.

A `badge` of `live` means the **group** is live. It does not mean the leaf
has content. Rows marked **⚠ badge≠disk** below are where the two disagree.

<!-- KEEP:architecture -->
## 2. How the estate renders: three shells, one source of truth

Every route is a directory with an `index.html`. That `index.html` is almost
always the same ~30-line **universal shell**: an empty `<main id="mx-page">`
plus six scripts loaded in fixed order: `routes.js → skeleton.js → chrome.js
→ md-page.js → hub.js → page.js`.

- **`js/routes.js` is the single source of truth.** `MX_ROUTES.MENU` lists 9
  pillars → groups (each with a `hub` URL and `badge`) → leaf links. The
  header, mobile menu, "More" drawer, hub card grids, the `/search/` sitemap
  and the search modal are all generated from it. Nothing else lists routes.
  (`sitemap.xml` and `data/search-index.json` are older hand-maintained
  subsets. See the defects in §5.)
- **`js/chrome.js`** replaces `#site-header` and `#site-footer` with the mega-menu,
  utility bar, mobile accordion, demo strip, footer and search modal.
- **`js/page.js`** looks at `location.pathname` and picks one of three kinds:
  1. **Root** (`/`): a dedicated `index.html` with `#pillars`, rendered by
     `js/home.js` from `MX_ROUTES`.
  2. **Hub**: a pillar (`/toptech/`) or any URL registered as a group `hub`
     (`/toptech/start/`, and also the depth-3 `/metax/bcia/status/`). `page.js`
     renames `#mx-page` to `#mx-hub`, and `js/hub.js` draws the hero plus a card
     grid *from `MX_ROUTES`* (so the cards can never list a page that isn't
     in the menu). It then appends the prose from `content/<path>/_hub.md`.
  3. **Leaf**: anything else. `page.js` renames the host to `#mx-doc` and
     fetches `content/<path-without-trailing-slash>.md`. `js/md-page.js`
     parses the front matter and body into the page contract (hero, page
     stamp, sections, the Up/Beside/Depends/Governs lattice, and the two-way
     exit pair). If the `.md` is missing, `page.js` shows an honest "X is
     being written" state that names the group and links back up. It never
     invents prose.
- A few older shells skip `page.js` and hard-code `<main id="mx-doc"
  data-md="…">` or `<main id="mx-hub" data-hub data-md>`. They still work,
  because `md-page.js` and `hub.js` boot themselves.
- CSS comes in two layers. `css/style.css` holds the tokens and components
  (user-locked: line 69 `inset:0%` and the AdSense IDs, so don't edit it).
  `css/estate.css` holds everything added from v2026.10.1 onward, including
  the nav repair layer at the end, which overrides older nav rules in
  `style.css`.
<!-- /KEEP:architecture -->

<!-- KEEP:recipe -->
## 3. How to add a new page

Suppose you want `/credentials/ladder/practitioner/`. First, **write
`content/credentials/ladder/practitioner.md`** (a leaf is `<last-segment>.md`;
a hub is `<dir>/_hub.md`). It must begin with front matter carrying at least
`title`, `deck`, `status` (one of `live | planned | research-preview | gated`),
`evidence` (E0–E4), `version`, `reviewed` (YYYY-MM-DD), and `up` / `beside` /
`depends` / `governs` as JSON arrays of `["Label","/url/"]` pairs. Add
`deeper` and `sideways` as single `["Label","/url/"]` pairs for the exit pair.
Optional keys are `eyebrow`, `group`, `jsonld` and `thin`. In the body, `#`
is a section title (a new reveal section) and `##`/`###` are sub-headings.
Second, **if the route is new rather than already listed**, add
`{ t: "Title", u: "/credentials/ladder/practitioner/" }` to the right group's
`links` in `js/routes.js`, respecting the spec's cap of 7 links per group.
That one edit puts the page in the mega-menu, the "More" drawer, the mobile
accordion, the group hub's card grid, `/search/` and the search modal, with
the active-state cascade handled automatically. Third, **run `node
tools/gen-shells.js`**, which writes the universal `index.html` shell for any
route that lacks one and never overwrites an existing shell. Then delete the
generated `<meta name="robots" content="noindex">` line from that shell once
the page has real content. Finally, run `node tools/gen-site-map.js` and
update `CONTENT_GAPS.md`.
<!-- /KEEP:recipe -->

<!-- KEEP:nav -->
## 4. Navigation behaviour (as repaired 2026-09-25)

**Breakpoints** (verified with `tools/nav-audit.js`, Chromium, 320–2560px):

| Width | Header shows | Nothing is `display:none`d without an alternative |
|---|---|---|
| 320–420px | brand · Start ⊢ · Search ⌕ (44px icons) · ☰ | Verify and Sign in move to row 1 of the ☰ menu |
| 421–1179px | brand · Start · Verify · Sign in · Search (icons) · ☰ | pillars live in the ☰ accordion |
| 1180–~1250px | 7–8 pillar tabs + **More ▾** · 4 utility icons | folded pillars are in the More drawer with full group/leaf trees |
| ~1250px+ | all 9 tabs · utility icons (words from 1680px) | — |

**The "More" threshold.** A tab is "comfortable" at **0.9rem text and 10px side
padding**, and it is never shrunk below that. After layout, `fit()` in
`chrome.js` measures the header row. If the row overflows, it folds pillars
into More one at a time, lowest priority first, until the row fits. Because it
measures rather than using a fixed pixel breakpoint, it also behaves correctly
at 200% zoom, with larger system fonts, and in the future Arabic mirror. At the
default font it folds 2 pillars at 1180px and none from about 1250px. The
**current pillar is never folded while any other pillar can be.** If it has to
fold, the More trigger itself takes the active state (`aria-current="true"`).

**"More" priority order** (`MX_ROUTES.NAV_PRIORITY`; tabs are always shown in
MENU order, and this list only decides who folds first):

1. **TopTech**: the curriculum and the Start Here / placement path. It is
   the learner's front door, so it never folds.
2. **About**: what MetaX is, the demo notice and the honest state of the build.
   It answers the first-time visitor's first question.
3. **Credentials**: Verify lives here, and SPEC §D.1 requires verification in
   the permanent nav.
4. **Academies**: the builder intent, whose standards are published before
   the application form.
5. **Meta-X**: holds BCIA and the Honesty Layer (status and remediation). The
   skeptic intent needs it visible (SPEC §D.1).
6. **License**: ML-2.3 is the estate's governing "soul", but it is reference
   material and is reachable from every page's footer.
7. **Method**: academic apparatus. It is deep reference, and each series links
   into it where needed.
8. **Ascent**: research-preview with no live rungs, so folding it costs a
   first-time visitor the least.
9. **Library**: lexicon, record and news. It is reference material and is
   duplicated in the footer ("Lexicon", "News"), so it folds first.

**Active state cascade** (`MX_ROUTES.activeTrail(path)`):

| Level | Element | Visual (never colour-only) | ARIA |
|---|---|---|---|
| 1 pillar | tab `.mm-top.active` / ☰ toggle | bold + gradient underline / ▸ marker | `aria-current="true"` |
| 2 group | `.mm-hub.is-current` in panel, drawer and ☰ | ▸ marker + 2px underline + side rule on the group | `aria-current="true"`, or `"page"` on the hub page itself |
| 3 leaf | `a.is-current` | bold + filled background + 3px cyan inset rule | `aria-current="page"` |

Group resolution: exact membership in a group's links wins. Otherwise the
**longest** group `hub` that is a prefix of the path is used, so
`/metax/bcia/status/defects/` resolves to *The Honesty Layer*, not its parent
*BCIA*. Deeper parametric pages (e.g. `/toptech/branch-a/stack/s05-x/`) light
the nearest leaf ancestor.

**Keyboard.** Tab moves between pillar triggers, and each panel opens as a
preview on focus. **Enter / Space / ↓** move into the panel. ← / → move
between triggers. **Esc** closes and returns focus to the trigger. Tabbing
past the last link closes the panel. The More drawer, the ☰ menu and the
search modal all close on Esc and return focus to their trigger. A skip link
is the first tab stop. `aria-expanded` is written in exactly one function per
widget, and CSS opens panels only through the `.open` class (never `:hover`),
so ARIA state and on-screen state cannot disagree.

**Mobile accordion.** The accordion is single-open: opening one pillar
closes the others. The pillar you are in starts expanded, scrolled to the
current link. The menu is capped at `100dvh − 66px` and scrolls internally.
The per-panel `max-height:900px` cap, which cut off the second half of the
License and Method trees, is removed. Each open pillar now starts with a link
to its own pillar hub; previously the mobile menu had no link to any of the
nine pillar hubs.
<!-- /KEEP:nav -->

<!-- KEEP:defects -->
## 5. Known structural defects (not fixed in this pass, see CONTENT_GAPS.md §0)

- `sitemap.xml` and `data/search-index.json` list only the 71 routes that had
  shells before this pass. They should be generated from `MX_ROUTES` (only
  real-content routes belong in `sitemap.xml`).
- 13 of 31 `_redirects` targets point at leaf routes with no content. They now
  land on "being written" pages instead of a 404, but the legacy flat pages
  (`about-mission.html` etc., 500–950 words each) hold the only prose for them.
  That prose should be migrated into `content/**` before production cuts over.
- `/license/ml-2-3/ml-2-3.txt` is linked from the menu but not present.
- `auth.metax.academy` (Sign in) returned HTTP 522 on 2026-09-24.
- `hreflang="ar"` alternates point at `/ar/…`, which does not exist (404).
- `_refs/meta-review-full.md` and `_refs/meta-review-sitemap.md` are byte-identical.
- README says "321 directory routes"; `MX_ROUTES` declares 319 (9 + 45 + 265).
<!-- /KEEP:defects -->

## 6. Full route tree (from `MX_ROUTES`)

<!-- GEN:tree -->
### 1. TopTech — `/toptech/`

Hub prose: `content/toptech/_hub.md` · 6 groups · 28 leaves · 0 live / 28 hub-only / 0 no file

| Route | Title | Badge | Status on disk |
|---|---|---|---|
| **`/toptech/start/`** | **Start & Placement** (group hub) | live | `_hub.md` |
| `/toptech/start/diagnostic/` | Placement Diagnostic | live | hub-only ⚠ badge≠disk |
| `/toptech/start/how-to-study/` | How to Study Here | live | hub-only ⚠ badge≠disk |
| `/toptech/start/prerequisites/` | Prerequisites Map | live | hub-only ⚠ badge≠disk |
| `/toptech/start/time-budget/` | Time Budget & Load | live | hub-only ⚠ badge≠disk |
| `/toptech/start/what-this-is-not/` | What TopTech Is Not | live | hub-only ⚠ badge≠disk |
| **`/toptech/catalog/`** | **The Catalog** (group hub) | live | `_hub.md` |
| `/toptech/catalog/series/` | All Series (S01–S47) | live | hub-only ⚠ badge≠disk |
| `/toptech/catalog/courses/` | All Courses | live | hub-only ⚠ badge≠disk |
| `/toptech/catalog/map/` | Curriculum Map | live | hub-only ⚠ badge≠disk |
| `/toptech/catalog/decay/` | Decay State by Series | live | hub-only ⚠ badge≠disk |
| `/toptech/catalog/changelog/` | Catalog Changelog | live | hub-only ⚠ badge≠disk |
| **`/toptech/branch-a/`** | **A · Operator Craft** (group hub) | live | `_hub.md` |
| `/toptech/branch-a/flagship-search/` | F1 · SEO Mastery Rebuilt | live | hub-only ⚠ badge≠disk |
| `/toptech/branch-a/flagship-attention/` | F2 · Social & Attention Rebuilt | live | hub-only ⚠ badge≠disk |
| `/toptech/branch-a/stack/` | The Next-Level Stack (S01–S21) | live | hub-only ⚠ badge≠disk |
| `/toptech/branch-a/surfaces/` | The Nine Operator Surfaces | live | hub-only ⚠ badge≠disk |
| `/toptech/branch-a/archetypes/` | Operator Archetypes | live | hub-only ⚠ badge≠disk |
| **`/toptech/branch-b/`** | **B · Engineering & IT** (group hub) | planned | `_hub.md` |
| `/toptech/branch-b/design/` | Design & Interface (S22) | planned | hub-only |
| `/toptech/branch-b/development/` | Development (S23) | planned | hub-only |
| `/toptech/branch-b/data-ai/` | Data & AI (S24) | planned | hub-only |
| `/toptech/branch-b/infrastructure/` | Infrastructure | planned | hub-only |
| `/toptech/branch-b/security/` | Security | planned | hub-only |
| `/toptech/branch-b/networks/` | Networks | planned | hub-only |
| `/toptech/branch-b/gate/` | The Placement Gate | planned | hub-only |
| **`/toptech/branch-c/`** | **C · Institution Building** (group hub) | planned | `_hub.md` |
| `/toptech/branch-c/academy-builder/` | Academy Builder (S35) | planned | hub-only |
| `/toptech/branch-c/curriculum-design/` | Curriculum & Assessment (S36) | planned | hub-only |
| `/toptech/branch-c/governance/` | Governance & Stewardship (S37) | planned | hub-only |
| **`/toptech/gateways/`** | **D · E · Gateways** (group hub) | gated | `_hub.md` |
| `/toptech/gateways/ascent/` | Branch D → Ascent | gated | hub-only |
| `/toptech/gateways/metax/` | Branch E → Meta-X | gated | hub-only |
| `/toptech/gateways/conditions/` | Gate Conditions | gated | hub-only |

### 2. Method — `/method/`

Hub prose: `content/method/_hub.md` · 6 groups · 40 leaves · 0 live / 40 hub-only / 0 no file

| Route | Title | Badge | Status on disk |
|---|---|---|---|
| **`/method/architecture/`** | **Lesson Architecture** (group hub) | live | `_hub.md` |
| `/method/architecture/arc/` | The Cognitive Arc (six beats) | live | hub-only ⚠ badge≠disk |
| `/method/architecture/cadence/` | The 12 × 6 Cadence | live | hub-only ⚠ badge≠disk |
| `/method/architecture/limits/` | The Limits Module | live | hub-only ⚠ badge≠disk |
| `/method/architecture/bridge/` | The Bridge Lesson | live | hub-only ⚠ badge≠disk |
| `/method/architecture/capstone/` | The 90-Day Capstone Contract | live | hub-only ⚠ badge≠disk |
| **`/method/rails/`** | **The Six Rails** (group hub) | live | `_hub.md` |
| `/method/rails/compliance/` | Compliance Rail | live | hub-only ⚠ badge≠disk |
| `/method/rails/accessibility/` | Accessibility Rail | live | hub-only ⚠ badge≠disk |
| `/method/rails/decay/` | Decay-Awareness Rail | live | hub-only ⚠ badge≠disk |
| `/method/rails/falsifiability/` | Falsifiability Rail | live | hub-only ⚠ badge≠disk |
| `/method/rails/kill-criteria/` | Kill-Criteria Rail | live | hub-only ⚠ badge≠disk |
| `/method/rails/unit-economics/` | Unit-Economics Rail | live | hub-only ⚠ badge≠disk |
| **`/method/epistemics/`** | **Epistemics** (group hub) | live | `_hub.md` |
| `/method/epistemics/evidence-classes/` | Evidence Classes (E0–E4) | live | hub-only ⚠ badge≠disk |
| `/method/epistemics/decay-standard/` | The Decay Standard | live | hub-only ⚠ badge≠disk |
| `/method/epistemics/falsifier-grammar/` | Falsifier Grammar | live | hub-only ⚠ badge≠disk |
| `/method/epistemics/counterproductivity/` | Counterproductivity Test | live | hub-only ⚠ badge≠disk |
| `/method/epistemics/banned-claims/` | Banned Claim Register | live | hub-only ⚠ badge≠disk |
| `/method/epistemics/open-problems/` | Open Problems Register | live | hub-only ⚠ badge≠disk |
| **`/method/assessment/`** | **Assessment** (group hub) | planned | `_hub.md` |
| `/method/assessment/scenario/` | Scenario Assessment (deterministic) | planned | hub-only |
| `/method/assessment/rubric/` | The Frozen Rubric (D1–D5) | planned | hub-only |
| `/method/assessment/viva/` | Mastery Viva | planned | hub-only |
| `/method/assessment/review/` | Adversarial Review Exchange | planned | hub-only |
| `/method/assessment/artefacts/` | Artefact Register | planned | hub-only |
| `/method/assessment/ai-disclosure/` | AI Disclosure Standard | planned | hub-only |
| **`/method/instruments/`** | **The Twelve Instruments** (group hub) | planned | `_hub.md` |
| `/method/instruments/prereg/` | 1 · Pre-Registration Desk | planned | hub-only |
| `/method/instruments/review/` | 2 · Adversarial Review | planned | hub-only |
| `/method/instruments/decay-watch/` | 3 · Decay Watch | planned | hub-only |
| `/method/instruments/cohorts/` | 4 · Time-Boxed Cohorts | planned | hub-only |
| `/method/instruments/artefacts/` | 5 · Artefact Register | planned | hub-only |
| `/method/instruments/scenario-engine/` | 6 · Scenario Engine | planned | hub-only |
| `/method/instruments/viva/` | 7 · Mastery Viva | planned | hub-only |
| `/method/instruments/exchange/` | 8 · Academy Exchange | planned | hub-only |
| `/method/instruments/passport/` | 9 · Bridge Passport | planned | hub-only |
| `/method/instruments/bounty/` | 10 · Correction Bounty | planned | hub-only |
| `/method/instruments/citations/` | 11 · Citation Ledger | planned | hub-only |
| `/method/instruments/determinations/` | 12 · Determination Queue | planned | hub-only |
| **`/method/notation/`** | **Notation & Research Ethics** (group hub) | live | `_hub.md` |
| `/method/notation/symbols/` | Symbol Grammar | live | hub-only ⚠ badge≠disk |
| `/method/notation/identifiers/` | Identifier Grammar | live | hub-only ⚠ badge≠disk |
| `/method/notation/versioning/` | Versioning Policy | live | hub-only ⚠ badge≠disk |
| `/method/notation/research-ethics/` | Research Ethics & Red Lines | live | hub-only ⚠ badge≠disk |
| `/method/notation/human-subject-exclusion/` | Human-Subject Exclusion | live | hub-only ⚠ badge≠disk |

### 3. Ascent — `/ascent/` · badge `research-preview`

Hub prose: `content/ascent/_hub.md` · 3 groups · 20 leaves · 0 live / 20 hub-only / 0 no file

| Route | Title | Badge | Status on disk |
|---|---|---|---|
| **`/ascent/rungs/`** | **The Ten Rungs** (group hub) | research-preview | `_hub.md` |
| `/ascent/rungs/s38-substrate/` | S38 · Computing Substrate Literacy | research-preview | hub-only |
| `/ascent/rungs/s39-paradigms/` | S39 · Paradigms & Their Limits | research-preview | hub-only |
| `/ascent/rungs/s40-mathematics/` | S40 · Mathematical Foundations | research-preview | hub-only |
| `/ascent/rungs/s41-end-of-binary/` | S41 · The End of Binary | research-preview | hub-only |
| `/ascent/rungs/s42-multivalued/` | S42 · Multi-Valued & Fuzzy | research-preview | hub-only |
| `/ascent/rungs/s43-electron-to-cell/` | S43 · From Electron to Cell | research-preview | hub-only |
| `/ascent/rungs/s44-biological/` | S44 · Biological Computation | research-preview | hub-only |
| `/ascent/rungs/s45-embodied/` | S45 · Embodied Computation | research-preview | hub-only |
| `/ascent/rungs/s46-networks/` | S46 · Network Science | research-preview | hub-only |
| `/ascent/rungs/s47-collective/` | S47 · Collective Dynamics | research-preview | hub-only |
| **`/ascent/reading/`** | **Reading the Ladder** (group hub) | research-preview | `_hub.md` |
| `/ascent/reading/blue/` | Blue Path — Foundations | research-preview | hub-only |
| `/ascent/reading/green/` | Green Path — Bridge to Life | research-preview | hub-only |
| `/ascent/reading/gold/` | Gold Path — Full Ascent | research-preview | hub-only |
| `/ascent/reading/sources/` | Source Books (Arabic) | research-preview | hub-only |
| `/ascent/reading/citation-rule/` | Citation-Only Rule | research-preview | hub-only |
| **`/ascent/boundaries/`** | **Boundaries** (group hub) | research-preview | `_hub.md` |
| `/ascent/boundaries/limits-of-silicon/` | The Limits of Silicon | research-preview | hub-only |
| `/ascent/boundaries/exclusions/` | What Ascent Is Not | research-preview | hub-only |
| `/ascent/boundaries/banned-claims/` | Banned Claims | research-preview | hub-only |
| `/ascent/boundaries/passport/` | Bridge Passport & Gating | research-preview | hub-only |
| `/ascent/boundaries/status/` | Rung Status Table | research-preview | hub-only |

### 4. Meta-X — `/metax/` · badge `research-preview`

Hub prose: `content/metax/_hub.md` · 4 groups · 29 leaves · 0 live / 29 hub-only / 0 no file

| Route | Title | Badge | Status on disk |
|---|---|---|---|
| **`/metax/umbrella/`** | **The Umbrella** (group hub) | research-preview | `_hub.md` |
| `/metax/umbrella/what-it-is/` | What MacroLifeTech Is | research-preview | hub-only |
| `/metax/umbrella/charter/` | The Research Charter | research-preview | hub-only |
| `/metax/umbrella/exclusions/` | What This Is Not | research-preview | hub-only |
| `/metax/umbrella/method/` | Method & Evidence Policy | research-preview | hub-only |
| `/metax/umbrella/publication/` | Publication & Preprint Policy | research-preview | hub-only |
| **`/metax/programs/`** | **The Nine Programs** (group hub) | research-preview | `_hub.md` |
| `/metax/programs/agora/` | Agora — Collective Decision | research-preview | hub-only |
| `/metax/programs/mana/` | Ma'nā — Meaning & Semantics | research-preview | hub-only |
| `/metax/programs/metabolism/` | Metabolism — Energy & Flow | research-preview | hub-only |
| `/metax/programs/soma/` | Soma — Embodiment | research-preview | hub-only |
| `/metax/programs/paideia/` | Paideia — Formation | research-preview | hub-only |
| `/metax/programs/athar/` | Athar — Trace & Record | research-preview | hub-only |
| `/metax/programs/afaq/` | Āfāq — Horizons | research-preview | hub-only |
| `/metax/programs/mizan/` | Mīzān — Measure & Balance | research-preview | hub-only |
| `/metax/programs/bcia/` | BCIA — Bio-Computational | research-preview | hub-only |
| **`/metax/bcia/`** | **BCIA** (group hub) | gated | `_hub.md` |
| `/metax/bcia/what-it-is/` | What BCIA Is & Is Not | gated | hub-only |
| `/metax/bcia/series/` | The Eight Series | gated | hub-only |
| `/metax/bcia/roadmap/` | Volume Roadmap | gated | hub-only |
| `/metax/bcia/document-zero/` | Document Zero — Seven Bases | gated | hub-only |
| `/metax/bcia/charter/` | The Charter & Human-Cell Exclusion | gated | hub-only |
| `/metax/bcia/governance/` | Governance — Cloister / Atrium | gated | hub-only |
| `/metax/bcia/notation/` | Notation & Versioning | gated | hub-only |
| `/metax/bcia/bibliography/` | Bibliography | gated | hub-only |
| `/metax/bcia/contribution/` | Contribution Guidelines | gated | hub-only |
| `/metax/bcia/gateway/` | The Gateway (locked) | gated | hub-only |
| **`/metax/bcia/status/`** | **The Honesty Layer** (group hub) | gated | `_hub.md` |
| `/metax/bcia/status/remediation/` | Status & Remediation | gated | hub-only |
| `/metax/bcia/status/audit/` | The Critical Audit | gated | hub-only |
| `/metax/bcia/status/protocol/` | Publication Readiness Protocol | gated | hub-only |
| `/metax/bcia/status/defects/` | Defect Register | gated | hub-only |
| `/metax/bcia/status/open-problems/` | Scope Limits & Open Problems | gated | hub-only |

### 5. Academies — `/academies/`

Hub prose: `content/academies/_hub.md` · 5 groups · 32 leaves · 0 live / 32 hub-only / 0 no file

| Route | Title | Badge | Status on disk |
|---|---|---|---|
| **`/academies/how-it-works/`** | **How It Works** (group hub) | live | `_hub.md` |
| `/academies/how-it-works/principles/` | The Four Principles | live | hub-only ⚠ badge≠disk |
| `/academies/how-it-works/path/` | The Founding Path | live | hub-only ⚠ badge≠disk |
| `/academies/how-it-works/eligibility/` | Curator Eligibility | live | hub-only ⚠ badge≠disk |
| `/academies/how-it-works/sandbox/` | The Sandbox | live | hub-only ⚠ badge≠disk |
| `/academies/how-it-works/apply/` | Apply | live | hub-only ⚠ badge≠disk |
| `/academies/how-it-works/cost/` | The Honest Cost | live | hub-only ⚠ badge≠disk |
| **`/academies/levels/`** | **The Five Levels** (group hub) | live | `_hub.md` |
| `/academies/levels/l1-applicant/` | L1 · Applicant | live | hub-only ⚠ badge≠disk |
| `/academies/levels/l2-sandbox/` | L2 · Sandbox | live | hub-only ⚠ badge≠disk |
| `/academies/levels/l3-provisional/` | L3 · Provisional | live | hub-only ⚠ badge≠disk |
| `/academies/levels/l4-chartered/` | L4 · Chartered | live | hub-only ⚠ badge≠disk |
| `/academies/levels/l5-institution/` | L5 · Institution | live | hub-only ⚠ badge≠disk |
| **`/academies/requirements/`** | **The Eleven Requirements** (group hub) | live | `_hub.md` |
| `/academies/requirements/r1-curator/` | R1 · Curator Eligibility | live | hub-only ⚠ badge≠disk |
| `/academies/requirements/r2-thesis/` | R2 · Thesis Scope | live | hub-only ⚠ badge≠disk |
| `/academies/requirements/r3-curriculum/` | R3 · Curriculum Minimum | live | hub-only ⚠ badge≠disk |
| `/academies/requirements/r4-rubric/` | R4 · Frozen Rubric | live | hub-only ⚠ badge≠disk |
| `/academies/requirements/r5-charter/` | R5 · Governance Charter | live | hub-only ⚠ badge≠disk |
| `/academies/requirements/r6-technical/` | R6 · Technical Spec | live | hub-only ⚠ badge≠disk |
| `/academies/requirements/r7-bilingual/` | R7 · Bilingual Policy | live | hub-only ⚠ badge≠disk |
| `/academies/requirements/r8-legal/` | R8 · Legal Terms | live | hub-only ⚠ badge≠disk |
| `/academies/requirements/r9-red-lines/` | R9 · Red-Line Content Bans | live | hub-only ⚠ badge≠disk |
| `/academies/requirements/r10-audit/` | R10 · Annual Audit | live | hub-only ⚠ badge≠disk |
| `/academies/requirements/r11-part-h/` | R11 · Part H Statement | live | hub-only ⚠ badge≠disk |
| **`/academies/operating/`** | **Operating an Academy** (group hub) | live | `_hub.md` |
| `/academies/operating/technical/` | Technical Guide & academy.json | live | hub-only ⚠ badge≠disk |
| `/academies/operating/subdomain/` | Your Subdomain | live | hub-only ⚠ badge≠disk |
| `/academies/operating/design/` | Design Constraints | live | hub-only ⚠ badge≠disk |
| `/academies/operating/moderation/` | Moderation & Enforcement | live | hub-only ⚠ badge≠disk |
| `/academies/operating/exchange/` | Academy Exchange | live | hub-only ⚠ badge≠disk |
| `/academies/operating/revocation/` | Revocation & Wind-Down | live | hub-only ⚠ badge≠disk |
| **`/academies/record/`** | **The Public Record** (group hub) | live | `_hub.md` |
| `/academies/record/directory/` | Directory of Academies | live | hub-only ⚠ badge≠disk |
| `/academies/record/audits/` | Audit Reports | live | hub-only ⚠ badge≠disk |
| `/academies/record/charters/` | Charter Register | live | hub-only ⚠ badge≠disk |
| `/academies/record/bounty/` | Correction Bounty Log | live | hub-only ⚠ badge≠disk |

### 6. Credentials — `/credentials/`

Hub prose: `content/credentials/_hub.md` · 5 groups · 23 leaves · 0 live / 23 hub-only / 0 no file

| Route | Title | Badge | Status on disk |
|---|---|---|---|
| **`/credentials/ladder/`** | **The Ladder** (group hub) | live | `_hub.md` |
| `/credentials/ladder/completion-marker/` | Completion Marker (not a credential) | live | hub-only ⚠ badge≠disk |
| `/credentials/ladder/practitioner/` | Series Practitioner | live | hub-only ⚠ badge≠disk |
| `/credentials/ladder/professional/` | Professional Operator | live | hub-only ⚠ badge≠disk |
| `/credentials/ladder/master-fellow/` | Master-Fellow | live | hub-only ⚠ badge≠disk |
| `/credentials/ladder/contributor/` | MetaX Contributor | live | hub-only ⚠ badge≠disk |
| **`/credentials/evidence/`** | **Evidence & Proof** (group hub) | live | `_hub.md` |
| `/credentials/evidence/proof-ladder/` | The Proof Ladder (P0–P3) | live | hub-only ⚠ badge≠disk |
| `/credentials/evidence/submission/` | Submission Pack | live | hub-only ⚠ badge≠disk |
| `/credentials/evidence/templates/` | Dossier & Templates | live | hub-only ⚠ badge≠disk |
| `/credentials/evidence/artefacts/` | Artefact Requirements | live | hub-only ⚠ badge≠disk |
| `/credentials/evidence/ai-disclosure/` | AI Disclosure | live | hub-only ⚠ badge≠disk |
| **`/credentials/review/`** | **Review** (group hub) | live | `_hub.md` |
| `/credentials/review/handbook/` | Reviewer Handbook | live | hub-only ⚠ badge≠disk |
| `/credentials/review/rubric/` | The Frozen Rubric (D1–D5) | live | hub-only ⚠ badge≠disk |
| `/credentials/review/conflicts/` | Conflicts of Interest | live | hub-only ⚠ badge≠disk |
| `/credentials/review/statistics/` | Reviewer Statistics | live | hub-only ⚠ badge≠disk |
| `/credentials/review/appeals/` | Appeals (MX-016) | live | hub-only ⚠ badge≠disk |
| **`/credentials/lifecycle/`** | **Lifecycle** (group hub) | live | `_hub.md` |
| `/credentials/lifecycle/renewal/` | Decay & Renewal | live | hub-only ⚠ badge≠disk |
| `/credentials/lifecycle/revocation/` | Revocation Grounds | live | hub-only ⚠ badge≠disk |
| `/credentials/lifecycle/integrity/` | Integrity Report | live | hub-only ⚠ badge≠disk |
| `/credentials/lifecycle/registry-spec/` | Registry Spec (credentials.json) | live | hub-only ⚠ badge≠disk |
| **`/credentials/verify/`** | **Verification** (group hub) | live | `_hub.md` |
| `/credentials/verify/lookup/` | Verify a Credential | live | hub-only ⚠ badge≠disk |
| `/credentials/verify/how-it-works/` | How Verification Works | live | hub-only ⚠ badge≠disk |
| `/credentials/verify/limits/` | What It Does Not Prove | live | hub-only ⚠ badge≠disk |
| `/credentials/verify/revocations/` | Revocation List | live | hub-only ⚠ badge≠disk |

### 7. Library — `/library/`

Hub prose: `content/library/_hub.md` · 6 groups · 29 leaves · 0 live / 29 hub-only / 0 no file

| Route | Title | Badge | Status on disk |
|---|---|---|---|
| **`/library/stack/`** | **The Stack** (group hub) | live | `_hub.md` |
| `/library/stack/layers/` | Layer Model of the Estate | live | hub-only ⚠ badge≠disk |
| `/library/stack/two-plane/` | The Two-Plane Model | live | hub-only ⚠ badge≠disk |
| `/library/stack/data-tiers/` | Data Tiers (T1–T4) | live | hub-only ⚠ badge≠disk |
| `/library/stack/topology/` | Hosting & Topology | live | hub-only ⚠ badge≠disk |
| **`/library/standards/`** | **Standards** (group hub) | live | `_hub.md` |
| `/library/standards/style-guide/` | Publishing Style Guide | live | hub-only ⚠ badge≠disk |
| `/library/standards/symbols/` | Symbol Standard | live | hub-only ⚠ badge≠disk |
| `/library/standards/decay/` | Decay Standard | live | hub-only ⚠ badge≠disk |
| `/library/standards/falsifiability/` | Falsifiability Standard | live | hub-only ⚠ badge≠disk |
| `/library/standards/accessibility/` | Accessibility Standard | live | hub-only ⚠ badge≠disk |
| `/library/standards/bilingual/` | Bilingual Standard | live | hub-only ⚠ badge≠disk |
| `/library/standards/generation-prompt/` | Master Generation Prompt | live | hub-only ⚠ badge≠disk |
| **`/library/lexicon/`** | **Lexicon** (group hub) | live | `_hub.md` |
| `/library/lexicon/entries/` | All Entries | live | hub-only ⚠ badge≠disk |
| `/library/lexicon/roots/` | Root Index (Arabic) | live | hub-only ⚠ badge≠disk |
| `/library/lexicon/contested/` | Contested Terms | live | hub-only ⚠ badge≠disk |
| `/library/lexicon/method/` | Lexicon Method | live | hub-only ⚠ badge≠disk |
| **`/library/record/`** | **The Record** (group hub) | live | `_hub.md` |
| `/library/record/mx-instruments/` | MX Instruments (MX-000–MX-023) | live | hub-only ⚠ badge≠disk |
| `/library/record/ag-instruments/` | AG Instruments (AG-000–AG-011) | live | hub-only ⚠ badge≠disk |
| `/library/record/corrections-log/` | Corrections Log | live | hub-only ⚠ badge≠disk |
| `/library/record/verification-log/` | Verification Log | live | hub-only ⚠ badge≠disk |
| `/library/record/errata/` | Errata | live | hub-only ⚠ badge≠disk |
| **`/library/sources/`** | **Sources & Data** (group hub) | live | `_hub.md` |
| `/library/sources/bibliography/` | Estate Bibliography | live | hub-only ⚠ badge≠disk |
| `/library/sources/citations/` | Citation Ledger | live | hub-only ⚠ badge≠disk |
| `/library/sources/downloads/` | Open Data (JSON) | live | hub-only ⚠ badge≠disk |
| `/library/sources/schemas/` | Schemas | live | hub-only ⚠ badge≠disk |
| **`/library/news/`** | **News** (group hub) | live | `_hub.md` |
| `/library/news/announcements/` | Announcements | live | hub-only ⚠ badge≠disk |
| `/library/news/curriculum/` | Curriculum Releases | live | hub-only ⚠ badge≠disk |
| `/library/news/research/` | Research Briefs | live | hub-only ⚠ badge≠disk |
| `/library/news/field-notes/` | Operator Field Notes | live | hub-only ⚠ badge≠disk |
| `/library/news/archive/` | Archive | live | hub-only ⚠ badge≠disk |

### 8. License — `/license/` · badge `live`

Hub prose: `content/license/_hub.md` · 5 groups · 35 leaves · 12 live / 22 hub-only / 1 no file

| Route | Title | Badge | Status on disk |
|---|---|---|---|
| **`/license/ml-2-3/`** | **The Instrument** (group hub) | live | `_hub.md` |
| `/license/ml-2-3/part-0-preamble/` | Part 0 · Preamble & Standing | live | hub-only ⚠ badge≠disk |
| `/license/ml-2-3/part-a-definitions/` | Part A · Definitions | live | hub-only ⚠ badge≠disk |
| `/license/ml-2-3/part-b-grant/` | Part B · Grant | live | hub-only ⚠ badge≠disk |
| `/license/ml-2-3/part-c-conditions/` | Part C · Ethical Conditions | live | hub-only ⚠ badge≠disk |
| `/license/ml-2-3/part-d-notices/` | Part D · Notices & Disclosure | live | hub-only ⚠ badge≠disk |
| `/license/ml-2-3/part-e-governance/` | Part E · Governance | live | hub-only ⚠ badge≠disk |
| `/license/ml-2-3/part-f-breach/` | Part F · Breach & Termination | live | hub-only ⚠ badge≠disk |
| `/license/ml-2-3/part-g-interpretation/` | Part G · Interpretation | live | hub-only ⚠ badge≠disk |
| `/license/ml-2-3/part-h-harms/` | Part H · Structural Harms | live | live |
| `/license/ml-2-3/schedules/` | Schedules 1–5 | live | hub-only ⚠ badge≠disk |
| `/license/ml-2-3/ml-2-3.txt` | Plain-Text Mirror | live | no file (external file) ⚠ badge≠disk |
| **`/license/harms/`** | **The Register** (group hub) | live | `_hub.md` |
| `/license/harms/stratum-i-cognitive/` | I · Cognitive (HX-01–03) | live | live |
| `/license/harms/stratum-ii-relational/` | II · Relational (HX-04–06) | live | live |
| `/license/harms/stratum-iii-economic/` | III · Economic (HX-07–09, 13) | live | live |
| `/license/harms/stratum-iv-material/` | IV · Material (HX-10–12, 14) | live | live |
| `/license/harms/stratum-v-reflexive/` | V · Reflexive (HX-15–19) | live | live |
| `/license/harms/stratum-vi-successor/` | VI · Successor (HX-20–25) | live | live |
| `/license/harms/falsifiers/` | All Falsifiers | live | hub-only ⚠ badge≠disk |
| **`/license/machinery/`** | **Operative Machinery** (group hub) | live | `_hub.md` |
| `/license/machinery/absolutes/` | The Eight Absolutes (§H.3) | live | live |
| `/license/machinery/roles/` | Roles (§H.1-bis) | live | live |
| `/license/machinery/scale-gate/` | The Scale Gate (§H.2-bis) | live | live |
| `/license/machinery/breach/` | Conditions vs Covenants (§F.4) | live | hub-only ⚠ badge≠disk |
| `/license/machinery/cure/` | Cure & Reinstatement | live | hub-only ⚠ badge≠disk |
| `/license/machinery/riba/` | Riba — the Four Elements (§C.9) | live | hub-only ⚠ badge≠disk |
| **`/license/statement/`** | **Compliance** (group hub) | live | `_hub.md` |
| `/license/statement/form/` | Statement Form (Schedule 1) | live | live |
| `/license/statement/generator/` | Statement Generator | live | hub-only ⚠ badge≠disk |
| `/license/statement/ours/` | MetaX's Own Statement | live | live |
| `/license/statement/examples/` | Worked Examples by Tier | live | hub-only ⚠ badge≠disk |
| `/license/statement/compatibility/` | Compatibility & SPDX | live | hub-only ⚠ badge≠disk |
| **`/license/falsification/`** | **Falsification & History** (group hub) | live | `_hub.md` |
| `/license/falsification/objections/` | Objections & Responses | live | hub-only ⚠ badge≠disk |
| `/license/falsification/withdrawals/` | Withdrawals & Narrowings | live | hub-only ⚠ badge≠disk |
| `/license/falsification/defects/` | Defect Log (ML-D-nnn) | live | hub-only ⚠ badge≠disk |
| `/license/falsification/changelog/` | Changelog 2.2 → 2.3 | live | hub-only ⚠ badge≠disk |
| `/license/falsification/ml-2-2/` | ML-2.2 (superseded) | live | hub-only ⚠ badge≠disk |
| `/license/falsification/open-questions/` | Open Questions (RAT-nn) | live | hub-only ⚠ badge≠disk |

### 9. About — `/about/`

Hub prose: `content/about/_hub.md` · 5 groups · 29 leaves · 3 live / 26 hub-only / 0 no file

| Route | Title | Badge | Status on disk |
|---|---|---|---|
| **`/about/universe/`** | **The Universe** (group hub) | live | `_hub.md` |
| `/about/universe/what-it-is/` | About MetaX | live | hub-only ⚠ badge≠disk |
| `/about/universe/pillars/` | The Three Pillars | live | hub-only ⚠ badge≠disk |
| `/about/universe/dna/` | The Shared DNA | live | hub-only ⚠ badge≠disk |
| `/about/universe/curator/` | The Curator — Maher | live | hub-only ⚠ badge≠disk |
| `/about/universe/demo-notice/` | Demo Notice | live | live |
| **`/about/policy/`** | **Principles & Policy** (group hub) | live | `_hub.md` |
| `/about/policy/static-principle/` | The Static Principle | live | hub-only ⚠ badge≠disk |
| `/about/policy/ai-policy/` | AI Use Policy | live | hub-only ⚠ badge≠disk |
| `/about/policy/governance/` | Governance & Roles | live | hub-only ⚠ badge≠disk |
| `/about/policy/accessibility/` | Accessibility Statement | live | hub-only ⚠ badge≠disk |
| `/about/policy/security/` | Security Policy | live | hub-only ⚠ badge≠disk |
| `/about/policy/no-images/` | No-Image Regime | live | hub-only ⚠ badge≠disk |
| **`/about/status/`** | **State of the Build** (group hub) | live | `_hub.md` |
| `/about/status/capacity/` | Capacity Meter | live | hub-only ⚠ badge≠disk |
| `/about/status/defects/` | Defect Log | live | live |
| `/about/status/determinations/` | Determination Queue | live | hub-only ⚠ badge≠disk |
| `/about/status/migration/` | Migration Plan (VPS) | live | hub-only ⚠ badge≠disk |
| `/about/status/roadmap/` | Roadmap & Gate Conditions | live | hub-only ⚠ badge≠disk |
| **`/about/access/`** | **Access & Money** (group hub) | live | `_hub.md` |
| `/about/access/pricing/` | Pricing & Payment | live | hub-only ⚠ badge≠disk |
| `/about/access/free/` | What Is Free | live | hub-only ⚠ badge≠disk |
| `/about/access/identity/` | Sign-In & Identity | live | hub-only ⚠ badge≠disk |
| `/about/access/entitlements/` | Entitlements | live | hub-only ⚠ badge≠disk |
| `/about/access/refunds/` | Refunds & Disputes | live | hub-only ⚠ badge≠disk |
| **`/about/legal/`** | **Legal & Contact** (group hub) | live | `_hub.md` |
| `/about/legal/contact/` | Contact | live | hub-only ⚠ badge≠disk |
| `/about/legal/press/` | Press & Media | live | hub-only ⚠ badge≠disk |
| `/about/legal/privacy/` | Privacy | live | hub-only ⚠ badge≠disk |
| `/about/legal/terms/` | Terms | live | hub-only ⚠ badge≠disk |
| `/about/legal/advertising/` | Advertising Policy | live | live |
| `/about/legal/cookies/` | Cookies & Local Storage | live | hub-only ⚠ badge≠disk |
| `/about/legal/ip/` | Intellectual Property | live | hub-only ⚠ badge≠disk |
| `/about/legal/sitemap/` | Sitemap | live | hub-only ⚠ badge≠disk |

<!-- /GEN:tree -->

## Re-generation prompt

```text
Re-generation prompt — SITE_MAP.md (MetaX.Academy static estate)

You are updating SITE_MAP.md in the hellometax/static-site repo. Do not hand-
transcribe routes. Steps:

1. Read js/routes.js (MX_ROUTES is the only source of truth for routes) and
   skim README.md's changelog for anything that changed the render pipeline.
2. Run:  node tools/gen-shells.js --dry   (any route listed has no index.html;
   if so run it without --dry and commit the shells)
3. Run:  node tools/gen-site-map.js
   This rewrites ONLY the <!-- GEN:… --> blocks (stamp, summary, tree) from
   js/routes.js + the files actually present under content/**. It never
   trusts the `badge` field for status; it checks disk. Rows flagged
   "⚠ badge≠disk" are where a group badge says live but the leaf has no .md.
4. Re-read the <!-- KEEP:… --> sections (architecture, recipe, nav, defects)
   and edit them by hand ONLY if the code they describe changed:
     - architecture/recipe: js/page.js, js/hub.js, js/md-page.js front-matter keys
     - nav: js/chrome.js (fit(), activeTrail cascade, keyboard map),
       MX_ROUTES.NAV_PRIORITY, css/estate.css "NAV REPAIR LAYER".
       If you touch nav, re-run the audit and update the breakpoint table:
         node tools/pages-server.js 8788 &
         NODE_PATH=<dir with playwright> node tools/nav-audit.js > audit.json
       Required: navOverflowPx 0 and zero "LOST" items at every width
       320–2560; keyboard: Esc returns focus to the trigger; Tab from tab#1
       reaches tab#2 in 1 press.
     - defects: strike items that are fixed, add new ones; re-probe production
       (curl https://metax.academy/js/routes.js — 200 means production now runs
       this build; then delete the "production is not running this repository"
       banner at the top).
5. Update CONTENT_GAPS.md: move any route whose status became "live" out of
   the gap tables (the same inventory: node tools/route-inventory.js --json).
6. Commit SITE_MAP.md, CONTENT_GAPS.md and any generated shells together with
   the content change that caused them.
Never write placeholder prose into content/** to make a route look "live".
```
