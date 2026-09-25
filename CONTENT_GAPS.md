# CONTENT_GAPS: intake list for leaf content

_Status is checked against `content/**` on disk (`node tools/route-inventory.js`),
never against the `badge` field. Tables regenerate with `node tools/gen-content-gaps.js`;
tiers and seed sources are curated in `tools/content-gaps-map.js`._

**This file writes no content.** Each row is a route that still needs real prose,
together with the `_refs/` material to adapt into the page contract (see
`SITE_MAP.md` §3). A missing page shows an honest "being written" state; it
never shows invented copy. Where a seed row says a value is unresolved (fees,
counts, holder names), the page must say it is unresolved (launch-blocker B-07).

Categories:
- **(a) authored**: `content/<route>.md` exists.
- **(b) hub-only**: the group `_hub.md` exists and lists the leaf, but the
  leaf has no `.md`. Visitors get the "being written" state.
- **(c) no file**: nothing exists for the route.

## 0. Before any content ships: structural blockers

1. **Production is not `main`.** `metax.academy` serves the older 7-pillar flat
   build (`js/site.js`, `toptech.html` …). `/js/routes.js`, `/css/estate.css`,
   `/content/**` and all directory routes return 404 there. Content written
   against `content/**` stays invisible until `main` is deployed. Also, the
   Cloudflare project should be checked for a stale build source or branch.
2. **Before this pass, 249 of 265 leaves had no `index.html`**, so a visitor
   got the site 404 rather than the "being written" state that `md-page.js`
   promises. `tools/gen-shells.js` now generates those shells (marked
   `noindex` until real content lands).
3. **Legacy prose lives outside `content/`.** `about-mission.html`,
   `about-dna.html`, `about-curator.html`, `about-static.html`,
   `about-governance.html`, `about-funding.html`, `about-universe.html`,
   `about-what-metax-is-not.html`, `charter.html`, `privacy.html`,
   `terms.html` and `contact.html` (≈130–950 words each) are all `_redirects`
   sources. They 301 to leaf routes that have no Markdown, so once `main` is
   deployed their existing text becomes unreachable. Migrate first.
4. `/license/ml-2-3/ml-2-3.txt` (the plain-text mirror) is linked but not present.

<!-- GEN:tables -->
| Tier | Meaning | Gaps |
|---|---|---|
| T1 | first-visit essential: placement, "what is this / what it is not", verify | 14 |
| T2 | core concept of the pillar | 54 |
| T3 | operational / how-to | 113 |
| T4 | deep reference | 69 |
| — | gaps with **no** seed source in `_refs/` (need the wider corpus) | 5 |

### TopTech — 28 gaps / 28 leaves

| # | Tier | Route | Title | Cat. | Seed material in `_refs/` (adapt, don't invent) |
|---|---|---|---|---|---|
| 1 | T1 | `/toptech/start/diagnostic/` | Placement Diagnostic | (b) hub-only | page-content-spec §1 `/start/` (6-question diagnostic, terminal-state copy); SPEC_v2026.08.12 §C.0 Start Here; mx-nav-spec-v2026.10.1 §3 |
| 2 | T1 | `/toptech/start/how-to-study/` | How to Study Here | (b) hub-only | page-content-spec §2 TopTech home + §2 `/arc/` (the six beats); SPEC §C.1.6 |
| 3 | T1 | `/toptech/start/what-this-is-not/` | What TopTech Is Not | (b) hub-only | page-content-spec §2 TopTech home ("what it is not" block); mx-001-about §1.5 What MetaX refuses |
| 4 | T2 | `/toptech/start/prerequisites/` | Prerequisites Map | (b) hub-only | page-content-spec §2 `/b/gate/` (prerequisite axes); course-registry (series prerequisites) |
| 5 | T2 | `/toptech/start/time-budget/` | Time Budget & Load | (b) hub-only | page-content-spec (hour estimates in the diagnostic terminal state); course-registry |
| 6 | T2 | `/toptech/catalog/series/` | All Series (S01–S47) | (b) hub-only | course-registry (full series list S01–S50); toptech-index; SPEC §C.1.8 |
| 7 | T2 | `/toptech/branch-a/flagship-search/` | F1 · SEO Mastery Rebuilt | (b) hub-only | page-content-spec §2 `/a/` (F1/F2 before-after); SPEC §C.1.1.1; course-registry |
| 8 | T2 | `/toptech/branch-a/flagship-attention/` | F2 · Social & Attention Rebuilt | (b) hub-only | page-content-spec §2 `/a/`; SPEC §C.1.1.1; course-registry |
| 9 | T2 | `/toptech/branch-a/surfaces/` | The Nine Operator Surfaces | (b) hub-only | page-content-spec §2 `/a/` (nine surfaces); SPEC §C.1.1.2 |
| 10 | T2 | `/toptech/branch-b/gate/` | The Placement Gate | (b) hub-only | page-content-spec §2 `/b/gate/` (12 items, 3 axes, 4 verdicts); SPEC §C.1.2.1 |
| 11 | T3 | `/toptech/catalog/courses/` | All Courses | (b) hub-only | course-registry; toptech-index |
| 12 | T3 | `/toptech/catalog/map/` | Curriculum Map | (b) hub-only | course-registry §Current branch map; toptech-index |
| 13 | T3 | `/toptech/branch-a/stack/` | The Next-Level Stack (S01–S21) | (b) hub-only | course-registry (S01–S21); toptech-index |
| 14 | T3 | `/toptech/branch-a/archetypes/` | Operator Archetypes | (b) hub-only | page-content-spec §2 `/paths/` (5 archetypes); mx-nav-spec (archetype cards) |
| 15 | T3 | `/toptech/branch-b/design/` | Design & Interface (S22) | (b) hub-only | page-content-spec §2 `/b/`; course-registry (S22–S34, target quarters) |
| 16 | T3 | `/toptech/branch-b/development/` | Development (S23) | (b) hub-only | page-content-spec §2 `/b/`; course-registry (S22–S34, target quarters) |
| 17 | T3 | `/toptech/branch-b/data-ai/` | Data & AI (S24) | (b) hub-only | page-content-spec §2 `/b/`; course-registry (S22–S34, target quarters) |
| 18 | T3 | `/toptech/branch-b/infrastructure/` | Infrastructure | (b) hub-only | page-content-spec §2 `/b/`; course-registry (S22–S34, target quarters) |
| 19 | T3 | `/toptech/branch-b/security/` | Security | (b) hub-only | page-content-spec §2 `/b/`; course-registry (S22–S34, target quarters) |
| 20 | T3 | `/toptech/branch-b/networks/` | Networks | (b) hub-only | page-content-spec §2 `/b/`; course-registry (S22–S34, target quarters) |
| 21 | T3 | `/toptech/branch-c/academy-builder/` | Academy Builder (S35) | (b) hub-only | page-content-spec §2 `/c/`; course-registry S35–S37; SPEC §C.1.3 (four governance primitives) |
| 22 | T3 | `/toptech/branch-c/curriculum-design/` | Curriculum & Assessment (S36) | (b) hub-only | page-content-spec §2 `/c/`; course-registry S35–S37; SPEC §C.1.3 (four governance primitives) |
| 23 | T3 | `/toptech/branch-c/governance/` | Governance & Stewardship (S37) | (b) hub-only | page-content-spec §2 `/c/`; course-registry S35–S37; SPEC §C.1.3 (four governance primitives) |
| 24 | T3 | `/toptech/gateways/ascent/` | Branch D → Ascent | (b) hub-only | bcia-public-status (seven remediation gates); bcia-status-patch; page-content-spec §4 `/gateway/` |
| 25 | T3 | `/toptech/gateways/metax/` | Branch E → Meta-X | (b) hub-only | bcia-public-status (seven remediation gates); bcia-status-patch; page-content-spec §4 `/gateway/` |
| 26 | T3 | `/toptech/gateways/conditions/` | Gate Conditions | (b) hub-only | bcia-public-status (seven remediation gates); bcia-status-patch; page-content-spec §4 `/gateway/` |
| 27 | T4 | `/toptech/catalog/decay/` | Decay State by Series | (b) hub-only | page-content-spec (decay-class per series); mx-nav-spec-v2026.10.1 §6 page contract (evidence/decay) |
| 28 | T4 | `/toptech/catalog/changelog/` | Catalog Changelog | (b) hub-only | changelog (GM-06); SPEC §C.1.9 |

### Method — 40 gaps / 40 leaves

| # | Tier | Route | Title | Cat. | Seed material in `_refs/` (adapt, don't invent) |
|---|---|---|---|---|---|
| 1 | T2 | `/method/architecture/arc/` | The Cognitive Arc (six beats) | (b) hub-only | page-content-spec §2 `/arc/` (12×6, What is·Why·How·Lab·Artifact·Scenario); SPEC §C.1.6 |
| 2 | T2 | `/method/architecture/limits/` | The Limits Module | (b) hub-only | page-content-spec §2 `/standard/limits-bridge/` (4 limit classes); SPEC §C.1.7; corpus (Limits module) |
| 3 | T2 | `/method/architecture/bridge/` | The Bridge Lesson | (b) hub-only | page-content-spec §2 `/standard/limits-bridge/` (Bridge contract); SPEC §C.1.7 |
| 4 | T2 | `/method/epistemics/evidence-classes/` | Evidence Classes (E0–E4) | (b) hub-only | mx-nav-spec-v2026.10.1 §6 (E0–E4); corpus MX-006 Editorial & Evidence Policy |
| 5 | T2 | `/method/epistemics/decay-standard/` | The Decay Standard | (b) hub-only | corpus MX-006; page-content-spec (decay classes durable/semi-durable/perishable); SPEC §B Prompt Kernel EVIDENCE |
| 6 | T2 | `/method/assessment/rubric/` | The Frozen Rubric (D1–D5) | (b) hub-only | corpus MX-005 Credentialing & Assessment; SPEC §C.5.5 (frozen D1–D5) |
| 7 | T2 | `/method/notation/research-ethics/` | Research Ethics & Red Lines | (b) hub-only | corpus MX-014 Research Ethics & Hard Exclusions; mx-000-charter §0.4 |
| 8 | T2 | `/method/notation/human-subject-exclusion/` | Human-Subject Exclusion | (b) hub-only | corpus MX-014; SPEC §C.2.1 (hard exclusions verbatim); page-content-spec §4 `/charter/` |
| 9 | T3 | `/method/architecture/cadence/` | The 12 × 6 Cadence | (b) hub-only | page-content-spec §2 `/arc/`; SPEC §C.1.6 |
| 10 | T3 | `/method/architecture/capstone/` | The 90-Day Capstone Contract | (b) hub-only | page-content-spec (90-day capstone); content/news/operator-postmortem-90-day-capstone.md (existing article) |
| 11 | T3 | `/method/rails/compliance/` | Compliance Rail | (b) hub-only | page-content-spec §2 `/rails/` (six rails); meta-review-full |
| 12 | T3 | `/method/rails/accessibility/` | Accessibility Rail | (b) hub-only | page-content-spec §2 `/rails/` (six rails); meta-review-full |
| 13 | T3 | `/method/rails/decay/` | Decay-Awareness Rail | (b) hub-only | page-content-spec §2 `/rails/` (six rails); meta-review-full |
| 14 | T3 | `/method/rails/falsifiability/` | Falsifiability Rail | (b) hub-only | page-content-spec §2 `/rails/` (six rails); meta-review-full |
| 15 | T3 | `/method/rails/kill-criteria/` | Kill-Criteria Rail | (b) hub-only | page-content-spec §2 `/rails/` (six rails); meta-review-full |
| 16 | T3 | `/method/rails/unit-economics/` | Unit-Economics Rail | (b) hub-only | page-content-spec §2 `/rails/` (six rails); meta-review-full |
| 17 | T3 | `/method/epistemics/falsifier-grammar/` | Falsifier Grammar | (b) hub-only | hx-000-structural-harms §2 (Falsifier sections); ml-2-3-part-h §A.3 (falsifier vs safe harbour) |
| 18 | T3 | `/method/epistemics/banned-claims/` | Banned Claim Register | (b) hub-only | corpus (banned claims); SPEC §C.2.1 (DishBrain benchmark ban) |
| 19 | T3 | `/method/assessment/scenario/` | Scenario Assessment (deterministic) | (b) hub-only | corpus MX-005; open-questions RAT-11 (scenario vs plane boundary); platform-architecture (viva) |
| 20 | T3 | `/method/assessment/viva/` | Mastery Viva | (b) hub-only | corpus MX-005; open-questions RAT-11 (scenario vs plane boundary); platform-architecture (viva) |
| 21 | T3 | `/method/assessment/review/` | Adversarial Review Exchange | (b) hub-only | corpus MX-005; open-questions RAT-11 (scenario vs plane boundary); platform-architecture (viva) |
| 22 | T3 | `/method/assessment/artefacts/` | Artefact Register | (b) hub-only | corpus MX-005; open-questions RAT-11 (scenario vs plane boundary); platform-architecture (viva) |
| 23 | T3 | `/method/assessment/ai-disclosure/` | AI Disclosure Standard | (b) hub-only | corpus MX-007 AI Use & Disclosure |
| 24 | T3 | `/method/notation/versioning/` | Versioning Policy | (b) hub-only | corpus MX-013 Records, Versioning & Corrections; meta-review-full PART C (identifier grammar) |
| 25 | T4 | `/method/epistemics/counterproductivity/` | Counterproductivity Test | (b) hub-only | hx-000-structural-harms §0.3; ml-2-3-part-h |
| 26 | T4 | `/method/epistemics/open-problems/` | Open Problems Register | (b) hub-only | open-questions (GM-04); page-content-spec §4 `/open-problems/` |
| 27 | T4 | `/method/instruments/prereg/` | 1 · Pre-Registration Desk | (b) hub-only | mx-nav-spec §4.8 Practice (the twelve instruments); mx-nav-spec-v2026.10.1 §3 |
| 28 | T4 | `/method/instruments/review/` | 2 · Adversarial Review | (b) hub-only | mx-nav-spec §4.8 Practice (the twelve instruments); mx-nav-spec-v2026.10.1 §3 |
| 29 | T4 | `/method/instruments/decay-watch/` | 3 · Decay Watch | (b) hub-only | mx-nav-spec §4.8 Practice (the twelve instruments); mx-nav-spec-v2026.10.1 §3 |
| 30 | T4 | `/method/instruments/cohorts/` | 4 · Time-Boxed Cohorts | (b) hub-only | mx-nav-spec §4.8 Practice (the twelve instruments); mx-nav-spec-v2026.10.1 §3 |
| 31 | T4 | `/method/instruments/artefacts/` | 5 · Artefact Register | (b) hub-only | mx-nav-spec §4.8 Practice (the twelve instruments); mx-nav-spec-v2026.10.1 §3 |
| 32 | T4 | `/method/instruments/scenario-engine/` | 6 · Scenario Engine | (b) hub-only | mx-nav-spec §4.8 Practice (the twelve instruments); mx-nav-spec-v2026.10.1 §3 |
| 33 | T4 | `/method/instruments/viva/` | 7 · Mastery Viva | (b) hub-only | mx-nav-spec §4.8 Practice (the twelve instruments); mx-nav-spec-v2026.10.1 §3 |
| 34 | T4 | `/method/instruments/exchange/` | 8 · Academy Exchange | (b) hub-only | mx-nav-spec §4.8 Practice (the twelve instruments); mx-nav-spec-v2026.10.1 §3 |
| 35 | T4 | `/method/instruments/passport/` | 9 · Bridge Passport | (b) hub-only | mx-nav-spec §4.8 Practice (the twelve instruments); mx-nav-spec-v2026.10.1 §3 |
| 36 | T4 | `/method/instruments/bounty/` | 10 · Correction Bounty | (b) hub-only | mx-nav-spec §4.8 Practice (the twelve instruments); mx-nav-spec-v2026.10.1 §3 |
| 37 | T4 | `/method/instruments/citations/` | 11 · Citation Ledger | (b) hub-only | mx-nav-spec §4.8 Practice (the twelve instruments); mx-nav-spec-v2026.10.1 §3 |
| 38 | T4 | `/method/instruments/determinations/` | 12 · Determination Queue | (b) hub-only | mx-nav-spec §4.8 Practice (the twelve instruments); mx-nav-spec-v2026.10.1 §3 |
| 39 | T4 | `/method/notation/symbols/` | Symbol Grammar | (b) hub-only | SPEC §I mx-glyph (closed set of 10 marks) |
| 40 | T4 | `/method/notation/identifiers/` | Identifier Grammar | (b) hub-only | meta-review-full PART C Identifier & URL grammar |

### Ascent — 20 gaps / 20 leaves

| # | Tier | Route | Title | Cat. | Seed material in `_refs/` (adapt, don't invent) |
|---|---|---|---|---|---|
| 1 | T1 | `/ascent/boundaries/exclusions/` | What Ascent Is Not | (b) hub-only | page-content-spec §3 `/ascent/exclusions/`; SPEC §C.2.3 + §C.2.1 HARD EXCLUSIONS |
| 2 | T2 | `/ascent/boundaries/limits-of-silicon/` | The Limits of Silicon | (b) hub-only | page-content-spec §3 `/ascent/limits/`; SPEC §C.2.2 |
| 3 | T2 | `/ascent/boundaries/status/` | Rung Status Table | (b) hub-only | page-content-spec §3 `/ascent/status/`; course-registry (S38–S47 status) |
| 4 | T3 | `/ascent/rungs/s38-substrate/` | S38 · Computing Substrate Literacy | (b) hub-only | course-registry (S38–S47); toptech-index; SPEC §C.2.1 (rung list + dated sources); page-content-spec §3 |
| 5 | T3 | `/ascent/rungs/s39-paradigms/` | S39 · Paradigms & Their Limits | (b) hub-only | course-registry (S38–S47); toptech-index; SPEC §C.2.1 (rung list + dated sources); page-content-spec §3 |
| 6 | T3 | `/ascent/rungs/s40-mathematics/` | S40 · Mathematical Foundations | (b) hub-only | course-registry (S38–S47); toptech-index; SPEC §C.2.1 (rung list + dated sources); page-content-spec §3 |
| 7 | T3 | `/ascent/rungs/s41-end-of-binary/` | S41 · The End of Binary | (b) hub-only | course-registry (S38–S47); toptech-index; SPEC §C.2.1 (rung list + dated sources); page-content-spec §3 |
| 8 | T3 | `/ascent/rungs/s42-multivalued/` | S42 · Multi-Valued & Fuzzy | (b) hub-only | course-registry (S38–S47); toptech-index; SPEC §C.2.1 (rung list + dated sources); page-content-spec §3 |
| 9 | T3 | `/ascent/rungs/s43-electron-to-cell/` | S43 · From Electron to Cell | (b) hub-only | course-registry (S38–S47); toptech-index; SPEC §C.2.1 (rung list + dated sources); page-content-spec §3 |
| 10 | T3 | `/ascent/rungs/s44-biological/` | S44 · Biological Computation | (b) hub-only | course-registry (S38–S47); toptech-index; SPEC §C.2.1 (rung list + dated sources); page-content-spec §3 |
| 11 | T3 | `/ascent/rungs/s45-embodied/` | S45 · Embodied Computation | (b) hub-only | course-registry (S38–S47); toptech-index; SPEC §C.2.1 (rung list + dated sources); page-content-spec §3 |
| 12 | T3 | `/ascent/rungs/s46-networks/` | S46 · Network Science | (b) hub-only | course-registry (S38–S47); toptech-index; SPEC §C.2.1 (rung list + dated sources); page-content-spec §3 |
| 13 | T3 | `/ascent/rungs/s47-collective/` | S47 · Collective Dynamics | (b) hub-only | course-registry (S38–S47); toptech-index; SPEC §C.2.1 (rung list + dated sources); page-content-spec §3 |
| 14 | T3 | `/ascent/reading/blue/` | Blue Path — Foundations | (b) hub-only | page-content-spec §3 `/ascent/paths/` (Blue 6mo / Green 12mo / Gold 36mo); SPEC §C.2.4 |
| 15 | T3 | `/ascent/reading/green/` | Green Path — Bridge to Life | (b) hub-only | page-content-spec §3 `/ascent/paths/` (Blue 6mo / Green 12mo / Gold 36mo); SPEC §C.2.4 |
| 16 | T3 | `/ascent/reading/gold/` | Gold Path — Full Ascent | (b) hub-only | page-content-spec §3 `/ascent/paths/` (Blue 6mo / Green 12mo / Gold 36mo); SPEC §C.2.4 |
| 17 | T3 | `/ascent/reading/sources/` | Source Books (Arabic) | (b) hub-only | page-content-spec §3 `/ascent/paths/` (Blue 6mo / Green 12mo / Gold 36mo); SPEC §C.2.4 |
| 18 | T3 | `/ascent/reading/citation-rule/` | Citation-Only Rule | (b) hub-only | page-content-spec §3 `/ascent/paths/` (Blue 6mo / Green 12mo / Gold 36mo); SPEC §C.2.4 |
| 19 | T3 | `/ascent/boundaries/banned-claims/` | Banned Claims | (b) hub-only | SPEC §C.2.1 BANNED benchmark; corpus |
| 20 | T4 | `/ascent/boundaries/passport/` | Bridge Passport & Gating | (b) hub-only | mx-nav-spec (Bridge Passport instrument) |

### Meta-X — 29 gaps / 29 leaves

| # | Tier | Route | Title | Cat. | Seed material in `_refs/` (adapt, don't invent) |
|---|---|---|---|---|---|
| 1 | T1 | `/metax/umbrella/what-it-is/` | What MacroLifeTech Is | (b) hub-only | mx-001-about §1.1/§1.3 (three pillars & authority boundaries); mx-000-charter §0.2; content/MacroLifeTach.txt; legacy macrolifetach.html |
| 2 | T1 | `/metax/umbrella/exclusions/` | What This Is Not | (b) hub-only | mx-000-charter §0.4 What MetaX refuses; corpus MX-014 |
| 3 | T1 | `/metax/bcia/what-it-is/` | What BCIA Is & Is Not | (b) hub-only | bcia-public-status (§What Branch D may / may not say); page-content-spec §4 `bcia/`; SPEC §C.3.0 |
| 4 | T2 | `/metax/umbrella/charter/` | The Research Charter | (b) hub-only | mx-000-charter (whole); legacy charter.html (946 words — _redirects target) |
| 5 | T2 | `/metax/programs/bcia/` | BCIA — Bio-Computational | (b) hub-only | bcia-public-status; canonical-index §9 BCIA |
| 6 | T2 | `/metax/bcia/charter/` | The Charter & Human-Cell Exclusion | (b) hub-only | page-content-spec §4 `/charter/` (human-cell exclusion own H2); corpus MX-014; SPEC §C.3.4 |
| 7 | T2 | `/metax/bcia/status/remediation/` | Status & Remediation | (b) hub-only | bcia-public-status; bcia-status-patch; defect-register (BCIA items); SPEC §C.3.6 (defect cards) |
| 8 | T2 | `/metax/bcia/status/defects/` | Defect Register | (b) hub-only | defect-register (GM-09); bcia-taxonomy-observed (Findings A–C) |
| 9 | T3 | `/metax/umbrella/method/` | Method & Evidence Policy | (b) hub-only | corpus MX-006 Editorial & Evidence Policy |
| 10 | T3 | `/metax/umbrella/publication/` | Publication & Preprint Policy | (b) hub-only | corpus MX-013; meta-review-full (preprint policy) |
| 11 | T3 | `/metax/bcia/series/` | The Eight Series | (b) hub-only | page-content-spec §4 `/series/`; SPEC §C.3.1 |
| 12 | T3 | `/metax/bcia/roadmap/` | Volume Roadmap | (b) hub-only | page-content-spec §4 `/roadmap/` (duplicated Volume I flagged); bcia-status-patch §Corpus integrity note |
| 13 | T3 | `/metax/bcia/document-zero/` | Document Zero — Seven Bases | (b) hub-only | page-content-spec §4 `/document-zero/`; mx-nav-spec (seven binding bases) |
| 14 | T3 | `/metax/bcia/gateway/` | The Gateway (locked) | (b) hub-only | bcia-public-status §Seven remediation gates; bcia-status-patch §Gate updates; SPEC §C.3.14 |
| 15 | T3 | `/metax/bcia/status/audit/` | The Critical Audit | (b) hub-only | deep-review; meta-review-full PART A; SPEC §C.3.7 |
| 16 | T3 | `/metax/bcia/status/protocol/` | Publication Readiness Protocol | (b) hub-only | SPEC §C.3.8 (3-pass language → science → ethics); mx-nav-spec |
| 17 | T4 | `/metax/programs/agora/` | Agora — Collective Decision | (b) hub-only | mx-nav-spec-v2026.10.1 §3 (nine programmes named); content/MacroLifeTach.txt — no per-programme source in _refs |
| 18 | T4 | `/metax/programs/mana/` | Ma'nā — Meaning & Semantics | (b) hub-only | mx-nav-spec-v2026.10.1 §3 (nine programmes named); content/MacroLifeTach.txt — no per-programme source in _refs |
| 19 | T4 | `/metax/programs/metabolism/` | Metabolism — Energy & Flow | (b) hub-only | mx-nav-spec-v2026.10.1 §3 (nine programmes named); content/MacroLifeTach.txt — no per-programme source in _refs |
| 20 | T4 | `/metax/programs/soma/` | Soma — Embodiment | (b) hub-only | mx-nav-spec-v2026.10.1 §3 (nine programmes named); content/MacroLifeTach.txt — no per-programme source in _refs |
| 21 | T4 | `/metax/programs/paideia/` | Paideia — Formation | (b) hub-only | mx-nav-spec-v2026.10.1 §3 (nine programmes named); content/MacroLifeTach.txt — no per-programme source in _refs |
| 22 | T4 | `/metax/programs/athar/` | Athar — Trace & Record | (b) hub-only | mx-nav-spec-v2026.10.1 §3 (nine programmes named); content/MacroLifeTach.txt — no per-programme source in _refs |
| 23 | T4 | `/metax/programs/afaq/` | Āfāq — Horizons | (b) hub-only | mx-nav-spec-v2026.10.1 §3 (nine programmes named); content/MacroLifeTach.txt — no per-programme source in _refs |
| 24 | T4 | `/metax/programs/mizan/` | Mīzān — Measure & Balance | (b) hub-only | mx-nav-spec-v2026.10.1 §3 (nine programmes named); content/MacroLifeTach.txt — no per-programme source in _refs |
| 25 | T4 | `/metax/bcia/governance/` | Governance — Cloister / Atrium | (b) hub-only | SPEC §C.3.5 (Cloister & Atrium) — thin; no dedicated _refs source found |
| 26 | T4 | `/metax/bcia/notation/` | Notation & Versioning | (b) hub-only | bcia-taxonomy-observed; bcia-front-matter-migration; SPEC §C.3.9 FROZEN banner |
| 27 | T4 | `/metax/bcia/bibliography/` | Bibliography | (b) hub-only | none in _refs (no bibliography document found) — needs the wider corpus |
| 28 | T4 | `/metax/bcia/contribution/` | Contribution Guidelines | (b) hub-only | SPEC §C.3.10–3.11; credentialing-map (Contributor) |
| 29 | T4 | `/metax/bcia/status/open-problems/` | Scope Limits & Open Problems | (b) hub-only | open-questions (RAT-02, RAT-03 AMN/LPN/BSN, RAT-05); bcia-taxonomy-observed |

### Academies — 32 gaps / 32 leaves

| # | Tier | Route | Title | Cat. | Seed material in `_refs/` (adapt, don't invent) |
|---|---|---|---|---|---|
| 1 | T2 | `/academies/how-it-works/principles/` | The Four Principles | (b) hub-only | page-content-spec §5 academies home (4 inherited principles); SPEC §C.4.0; mx-nav-spec |
| 2 | T2 | `/academies/how-it-works/path/` | The Founding Path | (b) hub-only | page-content-spec §5; SPEC §C.4.3; legacy community.html |
| 3 | T2 | `/academies/how-it-works/eligibility/` | Curator Eligibility | (b) hub-only | page-content-spec §5 `/requirements/` (curator eligibility); corpus MX-004 Terms of Top Levels |
| 4 | T2 | `/academies/how-it-works/apply/` | Apply | (b) hub-only | SPEC §C.4.4 (R2 presigned upload, degrades to email); platform-architecture §1.3 |
| 5 | T2 | `/academies/how-it-works/cost/` | The Honest Cost | (b) hub-only | mx-021-payments §21.7 Academy commerce; open-questions RAT-08 (fee schedule — UNRESOLVED, do not render values, launch-blockers B-07) |
| 6 | T2 | `/academies/levels/l1-applicant/` | L1 · Applicant | (b) hub-only | corpus MX-004 (levels); page-content-spec §5 `/levels/`; open-questions (level ratifications) |
| 7 | T2 | `/academies/levels/l2-sandbox/` | L2 · Sandbox | (b) hub-only | corpus MX-004 (levels); page-content-spec §5 `/levels/`; open-questions (level ratifications) |
| 8 | T2 | `/academies/levels/l3-provisional/` | L3 · Provisional | (b) hub-only | corpus MX-004 (levels); page-content-spec §5 `/levels/`; open-questions (level ratifications) |
| 9 | T2 | `/academies/levels/l4-chartered/` | L4 · Chartered | (b) hub-only | corpus MX-004 (levels); page-content-spec §5 `/levels/`; open-questions (level ratifications) |
| 10 | T2 | `/academies/levels/l5-institution/` | L5 · Institution | (b) hub-only | corpus MX-004 (levels); page-content-spec §5 `/levels/`; open-questions (level ratifications) |
| 11 | T3 | `/academies/how-it-works/sandbox/` | The Sandbox | (b) hub-only | SPEC §C.4.5; platform-architecture §1.2 |
| 12 | T3 | `/academies/requirements/r1-curator/` | R1 · Curator Eligibility | (b) hub-only | page-content-spec §5 `/requirements/` + 11 children; corpus MX-004; SPEC §C.4.2 |
| 13 | T3 | `/academies/requirements/r2-thesis/` | R2 · Thesis Scope | (b) hub-only | page-content-spec §5 `/requirements/` + 11 children; corpus MX-004; SPEC §C.4.2 |
| 14 | T3 | `/academies/requirements/r3-curriculum/` | R3 · Curriculum Minimum | (b) hub-only | page-content-spec §5 `/requirements/` + 11 children; corpus MX-004; SPEC §C.4.2 |
| 15 | T3 | `/academies/requirements/r4-rubric/` | R4 · Frozen Rubric | (b) hub-only | page-content-spec §5 `/requirements/` + 11 children; corpus MX-004; SPEC §C.4.2 |
| 16 | T3 | `/academies/requirements/r5-charter/` | R5 · Governance Charter | (b) hub-only | page-content-spec §5 `/requirements/` + 11 children; corpus MX-004; SPEC §C.4.2 |
| 17 | T3 | `/academies/requirements/r6-technical/` | R6 · Technical Spec | (b) hub-only | platform-architecture §1.2 + §6.5 mx_academies (academy.json) |
| 18 | T3 | `/academies/requirements/r7-bilingual/` | R7 · Bilingual Policy | (b) hub-only | page-content-spec §5 `/requirements/` + 11 children; corpus MX-004; SPEC §C.4.2 |
| 19 | T3 | `/academies/requirements/r8-legal/` | R8 · Legal Terms | (b) hub-only | page-content-spec §5 `/requirements/` + 11 children; corpus MX-004; SPEC §C.4.2 |
| 20 | T3 | `/academies/requirements/r9-red-lines/` | R9 · Red-Line Content Bans | (b) hub-only | corpus MX-014; mx-000-charter §0.4 |
| 21 | T3 | `/academies/requirements/r10-audit/` | R10 · Annual Audit | (b) hub-only | page-content-spec §5 `/requirements/` + 11 children; corpus MX-004; SPEC §C.4.2 |
| 22 | T3 | `/academies/requirements/r11-part-h/` | R11 · Part H Statement | (b) hub-only | ml-2-3-part-h §D.2 Part H Statement; content/license/statement/form.md (live, reuse) |
| 23 | T3 | `/academies/operating/technical/` | Technical Guide & academy.json | (b) hub-only | platform-architecture §1.2, §6.5; SPEC §C.4.8 |
| 24 | T3 | `/academies/operating/moderation/` | Moderation & Enforcement | (b) hub-only | corpus MX-008 Content Governance, Moderation & Enforcement |
| 25 | T3 | `/academies/operating/revocation/` | Revocation & Wind-Down | (b) hub-only | corpus MX-008; SPEC §I mx-tombstone |
| 26 | T4 | `/academies/operating/subdomain/` | Your Subdomain | (b) hub-only | platform-architecture §1.2 (subdomain routing); mx-nav-spec |
| 27 | T4 | `/academies/operating/design/` | Design Constraints | (b) hub-only | platform-architecture §1.2 (subdomain routing); mx-nav-spec |
| 28 | T4 | `/academies/operating/exchange/` | Academy Exchange | (b) hub-only | platform-architecture §1.2 (subdomain routing); mx-nav-spec |
| 29 | T4 | `/academies/record/directory/` | Directory of Academies | (b) hub-only | SPEC §C.4.6–4.7 (directory from academy.json; suspended stay listed) — no records exist yet (honest-empty) |
| 30 | T4 | `/academies/record/audits/` | Audit Reports | (b) hub-only | SPEC §C.4.6–4.7 (directory from academy.json; suspended stay listed) — no records exist yet (honest-empty) |
| 31 | T4 | `/academies/record/charters/` | Charter Register | (b) hub-only | SPEC §C.4.6–4.7 (directory from academy.json; suspended stay listed) — no records exist yet (honest-empty) |
| 32 | T4 | `/academies/record/bounty/` | Correction Bounty Log | (b) hub-only | SPEC §C.4.6–4.7 (directory from academy.json; suspended stay listed) — no records exist yet (honest-empty) |

### Credentials — 23 gaps / 23 leaves

| # | Tier | Route | Title | Cat. | Seed material in `_refs/` (adapt, don't invent) |
|---|---|---|---|---|---|
| 1 | T1 | `/credentials/ladder/completion-marker/` | Completion Marker (not a credential) | (b) hub-only | meta-review-full §B.7 (badge tier resolved); page-content-spec §6 |
| 2 | T1 | `/credentials/verify/lookup/` | Verify a Credential | (b) hub-only | SPEC §C.5.6 (valid/expired/revoked, no soft not-found); legacy verify.html + js/verify.js; platform-architecture §1.3 |
| 3 | T1 | `/credentials/verify/limits/` | What It Does Not Prove | (b) hub-only | SPEC §C.5.0 (non-worth); corpus MX-005 |
| 4 | T2 | `/credentials/ladder/practitioner/` | Series Practitioner | (b) hub-only | credentialing-map (naming precedence + mapping table); corpus MX-005; SPEC §C.5.0 (worth AND non-worth) |
| 5 | T2 | `/credentials/ladder/professional/` | Professional Operator | (b) hub-only | credentialing-map (naming precedence + mapping table); corpus MX-005; SPEC §C.5.0 (worth AND non-worth) |
| 6 | T2 | `/credentials/ladder/master-fellow/` | Master-Fellow | (b) hub-only | credentialing-map (naming precedence + mapping table); corpus MX-005; SPEC §C.5.0 (worth AND non-worth) |
| 7 | T2 | `/credentials/ladder/contributor/` | MetaX Contributor | (b) hub-only | credentialing-map (naming precedence + mapping table); corpus MX-005; SPEC §C.5.0 (worth AND non-worth) |
| 8 | T2 | `/credentials/evidence/proof-ladder/` | The Proof Ladder (P0–P3) | (b) hub-only | meta-review-full §B.8 (proof ladder resolved); reconciliation-ledger |
| 9 | T2 | `/credentials/review/rubric/` | The Frozen Rubric (D1–D5) | (b) hub-only | corpus MX-005; SPEC §C.5.5 (single frozen D1–D5; earlier scheme void) |
| 10 | T2 | `/credentials/verify/how-it-works/` | How Verification Works | (b) hub-only | SPEC §C.5.6 (StatusList2021, signed revocation via Worker); platform-architecture §1.3 |
| 11 | T3 | `/credentials/evidence/submission/` | Submission Pack | (b) hub-only | corpus MX-005; SPEC §C.5.2–5.3 (Blank/Filled/Failing specimen) |
| 12 | T3 | `/credentials/evidence/templates/` | Dossier & Templates | (b) hub-only | corpus MX-005; SPEC §C.5.2–5.3 (Blank/Filled/Failing specimen) |
| 13 | T3 | `/credentials/evidence/artefacts/` | Artefact Requirements | (b) hub-only | corpus MX-005; SPEC §C.5.2–5.3 (Blank/Filled/Failing specimen) |
| 14 | T3 | `/credentials/evidence/ai-disclosure/` | AI Disclosure | (b) hub-only | corpus MX-007 |
| 15 | T3 | `/credentials/review/conflicts/` | Conflicts of Interest | (b) hub-only | corpus MX-019 Conflicts of Interest |
| 16 | T3 | `/credentials/review/appeals/` | Appeals (MX-016) | (b) hub-only | corpus MX-016 Complaints, Appeals & Due Process |
| 17 | T3 | `/credentials/lifecycle/renewal/` | Decay & Renewal | (b) hub-only | corpus MX-005 (renewal, revocation grounds); credentialing-map §Renewal reminder |
| 18 | T3 | `/credentials/lifecycle/revocation/` | Revocation Grounds | (b) hub-only | corpus MX-005 (renewal, revocation grounds); credentialing-map §Renewal reminder |
| 19 | T3 | `/credentials/lifecycle/integrity/` | Integrity Report | (b) hub-only | corpus (Integrity Report — issuance/rejection/revocation counts; no counts exist yet → honest-empty) |
| 20 | T4 | `/credentials/review/handbook/` | Reviewer Handbook | (b) hub-only | corpus MX-005; mx-nav-spec (reviewer handbook) |
| 21 | T4 | `/credentials/review/statistics/` | Reviewer Statistics | (b) hub-only | corpus MX-005; mx-nav-spec (reviewer handbook) |
| 22 | T4 | `/credentials/lifecycle/registry-spec/` | Registry Spec (credentials.json) | (b) hub-only | platform-architecture §6.3 mx_credentials; mx-nav-spec (credentials.json) |
| 23 | T4 | `/credentials/verify/revocations/` | Revocation List | (b) hub-only | platform-architecture §6.3; SPEC §C.5.6 |

### Library — 29 gaps / 29 leaves

| # | Tier | Route | Title | Cat. | Seed material in `_refs/` (adapt, don't invent) |
|---|---|---|---|---|---|
| 1 | T2 | `/library/stack/two-plane/` | The Two-Plane Model | (b) hub-only | st-19-two-plane (whole); changelog v2026.09.2 (plane partition) |
| 2 | T2 | `/library/lexicon/contested/` | Contested Terms | (b) hub-only | bcia-taxonomy-observed Finding B (AMN/LPN referenced not defined); open-questions RAT-03 |
| 3 | T2 | `/library/record/mx-instruments/` | MX Instruments (MX-000–MX-023) | (b) hub-only | canonical-index §4 (MX instruments); corpus PART II MX-000–MX-019; mx-021-payments; mx-022-identity |
| 4 | T3 | `/library/stack/layers/` | Layer Model of the Estate | (b) hub-only | canonical-index §1–2; SPEC §C.6.1–6.2 |
| 5 | T3 | `/library/stack/data-tiers/` | Data Tiers (T1–T4) | (b) hub-only | platform-architecture Part 5 (four tiers + placement rule) |
| 6 | T3 | `/library/stack/topology/` | Hosting & Topology | (b) hub-only | platform-architecture Part 1 (Cloudflare topology) |
| 7 | T3 | `/library/standards/style-guide/` | Publishing Style Guide | (b) hub-only | SPEC §C.6.3 (authoring standards, Arabic style guide); corpus MX-006; page-content-spec §0 global contract |
| 8 | T3 | `/library/standards/symbols/` | Symbol Standard | (b) hub-only | SPEC §C.6.3 (authoring standards, Arabic style guide); corpus MX-006; page-content-spec §0 global contract |
| 9 | T3 | `/library/standards/decay/` | Decay Standard | (b) hub-only | SPEC §C.6.3 (authoring standards, Arabic style guide); corpus MX-006; page-content-spec §0 global contract |
| 10 | T3 | `/library/standards/falsifiability/` | Falsifiability Standard | (b) hub-only | SPEC §C.6.3 (authoring standards, Arabic style guide); corpus MX-006; page-content-spec §0 global contract |
| 11 | T3 | `/library/standards/accessibility/` | Accessibility Standard | (b) hub-only | corpus MX-010 Accessibility Statement; launch-blockers B-08 |
| 12 | T3 | `/library/standards/bilingual/` | Bilingual Standard | (b) hub-only | SPEC §C.6.3 (authoring standards, Arabic style guide); corpus MX-006; page-content-spec §0 global contract |
| 13 | T3 | `/library/record/ag-instruments/` | AG Instruments (AG-000–AG-011) | (b) hub-only | canonical-index §5; corpus PART III AG-000–AG-010 |
| 14 | T3 | `/library/record/corrections-log/` | Corrections Log | (b) hub-only | corpus MX-013; changelog (GM-06) §What was corrected against a source |
| 15 | T4 | `/library/standards/generation-prompt/` | Master Generation Prompt | (b) hub-only | SPEC §B The Prompt Kernel; source-index-for-ai |
| 16 | T4 | `/library/lexicon/entries/` | All Entries | (b) hub-only | SPEC §C.6.4 (6 fields/entry, root-indexed); legacy lexicon.html — no entry corpus in _refs |
| 17 | T4 | `/library/lexicon/roots/` | Root Index (Arabic) | (b) hub-only | SPEC §C.6.4 (6 fields/entry, root-indexed); legacy lexicon.html — no entry corpus in _refs |
| 18 | T4 | `/library/lexicon/method/` | Lexicon Method | (b) hub-only | SPEC §C.6.4 (6 fields/entry, root-indexed); legacy lexicon.html — no entry corpus in _refs |
| 19 | T4 | `/library/record/verification-log/` | Verification Log | (b) hub-only | corpus MX-013 Records, Versioning & Corrections |
| 20 | T4 | `/library/record/errata/` | Errata | (b) hub-only | corpus MX-013 Records, Versioning & Corrections |
| 21 | T4 | `/library/sources/bibliography/` | Estate Bibliography | (b) hub-only | none dedicated in _refs (no bibliography doc) — needs the wider corpus |
| 22 | T4 | `/library/sources/citations/` | Citation Ledger | (b) hub-only | none dedicated in _refs (no bibliography doc) — needs the wider corpus |
| 23 | T4 | `/library/sources/downloads/` | Open Data (JSON) | (b) hub-only | SPEC §C.6.6 (catalog.json, credentials.json, lexicon.json stable endpoints) |
| 24 | T4 | `/library/sources/schemas/` | Schemas | (b) hub-only | none dedicated in _refs (no bibliography doc) — needs the wider corpus |
| 25 | T4 | `/library/news/announcements/` | Announcements | (b) hub-only | content/news/*.md (9 articles, 800+ words each) already exist but are not wired to these routes |
| 26 | T4 | `/library/news/curriculum/` | Curriculum Releases | (b) hub-only | content/news/*.md (9 articles, 800+ words each) already exist but are not wired to these routes |
| 27 | T4 | `/library/news/research/` | Research Briefs | (b) hub-only | content/news/*.md (9 articles, 800+ words each) already exist but are not wired to these routes |
| 28 | T4 | `/library/news/field-notes/` | Operator Field Notes | (b) hub-only | content/news/*.md (9 articles, 800+ words each) already exist but are not wired to these routes |
| 29 | T4 | `/library/news/archive/` | Archive | (b) hub-only | content/news/*.md (9 articles, 800+ words each) already exist but are not wired to these routes |

### License — 23 gaps / 35 leaves

Already authored (a): `/license/ml-2-3/part-h-harms/`, `/license/harms/stratum-i-cognitive/`, `/license/harms/stratum-ii-relational/`, `/license/harms/stratum-iii-economic/`, `/license/harms/stratum-iv-material/`, `/license/harms/stratum-v-reflexive/`, `/license/harms/stratum-vi-successor/`, `/license/machinery/absolutes/`, `/license/machinery/roles/`, `/license/machinery/scale-gate/`, `/license/statement/form/`, `/license/statement/ours/`

| # | Tier | Route | Title | Cat. | Seed material in `_refs/` (adapt, don't invent) |
|---|---|---|---|---|---|
| 1 | T2 | `/license/ml-2-3/part-0-preamble/` | Part 0 · Preamble & Standing | (b) hub-only | ml-2-1 PART 0 + PART 1; maher-license PART 0/1 (ML-2.0); ml-2-3-part-h §D.3 consequential amendments |
| 2 | T2 | `/license/machinery/riba/` | Riba — the Four Elements (§C.9) | (b) hub-only | maher-license §C.9; ml-2-1 §C.9; mx-021-payments §21.2; open-questions RAT-12 |
| 3 | T3 | `/license/ml-2-3/part-a-definitions/` | Part A · Definitions | (b) hub-only | ml-2-1 (Parts A–G, full text); maher-license (ML-2.0 baseline); ml-2-3-part-h §D.3 (what 2.3 changes outside Part H) |
| 4 | T3 | `/license/ml-2-3/part-b-grant/` | Part B · Grant | (b) hub-only | ml-2-1 (Parts A–G, full text); maher-license (ML-2.0 baseline); ml-2-3-part-h §D.3 (what 2.3 changes outside Part H) |
| 5 | T3 | `/license/ml-2-3/part-c-conditions/` | Part C · Ethical Conditions | (b) hub-only | ml-2-1 (Parts A–G, full text); maher-license (ML-2.0 baseline); ml-2-3-part-h §D.3 (what 2.3 changes outside Part H) |
| 6 | T3 | `/license/ml-2-3/part-d-notices/` | Part D · Notices & Disclosure | (b) hub-only | ml-2-1 (Parts A–G, full text); maher-license (ML-2.0 baseline); ml-2-3-part-h §D.3 (what 2.3 changes outside Part H) |
| 7 | T3 | `/license/ml-2-3/part-e-governance/` | Part E · Governance | (b) hub-only | ml-2-1 (Parts A–G, full text); maher-license (ML-2.0 baseline); ml-2-3-part-h §D.3 (what 2.3 changes outside Part H) |
| 8 | T3 | `/license/ml-2-3/part-f-breach/` | Part F · Breach & Termination | (b) hub-only | ml-2-1 (Parts A–G, full text); maher-license (ML-2.0 baseline); ml-2-3-part-h §D.3 (what 2.3 changes outside Part H) |
| 9 | T3 | `/license/ml-2-3/part-g-interpretation/` | Part G · Interpretation | (b) hub-only | ml-2-1 (Parts A–G, full text); maher-license (ML-2.0 baseline); ml-2-3-part-h §D.3 (what 2.3 changes outside Part H) |
| 10 | T3 | `/license/ml-2-3/ml-2-3.txt` | Plain-Text Mirror | (c) no file | ml-2-1 (Parts A–G, full text); maher-license (ML-2.0 baseline); ml-2-3-part-h §D.3 (what 2.3 changes outside Part H) |
| 11 | T3 | `/license/harms/falsifiers/` | All Falsifiers | (b) hub-only | hx-000-structural-harms (Falsifier per harm); ml-2-3-part-h Part C (HX-15–25 falsifiers) |
| 12 | T3 | `/license/machinery/breach/` | Conditions vs Covenants (§F.4) | (b) hub-only | ml-2-3-part-h §A.6 (condition or covenant) |
| 13 | T3 | `/license/machinery/cure/` | Cure & Reinstatement | (b) hub-only | ml-2-1 §G.6 Prospectivity & Cure; corpus I.4 |
| 14 | T3 | `/license/statement/examples/` | Worked Examples by Tier | (b) hub-only | ml-2-3-part-h §A.5 scale gate + §D.2; content/license/statement/ours.md (live worked example) |
| 15 | T3 | `/license/falsification/objections/` | Objections & Responses | (b) hub-only | hx-000-structural-harms (Strongest counter-argument / Reply per harm); ml-2-3-part-h Part A |
| 16 | T3 | `/license/falsification/defects/` | Defect Log (ML-D-nnn) | (b) hub-only | ml-2-3-part-h §A.1–A.7 (blocking defect, identifier collision…); defect-register |
| 17 | T3 | `/license/falsification/changelog/` | Changelog 2.2 → 2.3 | (b) hub-only | ml-2-3-part-h (ML-2.2 → 2.3); changelog |
| 18 | T3 | `/license/falsification/open-questions/` | Open Questions (RAT-nn) | (b) hub-only | open-questions (RAT-01–RAT-13) |
| 19 | T4 | `/license/ml-2-3/schedules/` | Schedules 1–5 | (b) hub-only | ml-2-1 Exhibits; ml-2-3-part-h §D.2 |
| 20 | T4 | `/license/statement/generator/` | Statement Generator | (b) hub-only | ml-2-3-part-h §D.2 (Statement form) — a client tool, not prose (README §6) |
| 21 | T4 | `/license/statement/compatibility/` | Compatibility & SPDX | (b) hub-only | maher-license Exhibit 2 (SPDX-style identifier); ml-2-1 PART D Meta-license |
| 22 | T4 | `/license/falsification/withdrawals/` | Withdrawals & Narrowings | (b) hub-only | ml-2-3-part-h §C.1 (candidates not admitted); hx-000 §0.2 |
| 23 | T4 | `/license/falsification/ml-2-2/` | ML-2.2 (superseded) | (b) hub-only | hx-000-structural-harms (ML-2.2-era register) — mark SUPERSEDED |

### About — 26 gaps / 29 leaves

Already authored (a): `/about/universe/demo-notice/`, `/about/status/defects/`, `/about/legal/advertising/`

| # | Tier | Route | Title | Cat. | Seed material in `_refs/` (adapt, don't invent) |
|---|---|---|---|---|---|
| 1 | T1 | `/about/universe/what-it-is/` | About MetaX | (b) hub-only | mx-001-about (whole, canonical public account); corpus MX-001; legacy about-mission.html + about-what-metax-is-not.html (_redirects targets) |
| 2 | T1 | `/about/universe/pillars/` | The Three Pillars | (b) hub-only | mx-000-charter §0.2; mx-001-about §1.3 (authority boundaries); legacy about-universe.html |
| 3 | T1 | `/about/universe/dna/` | The Shared DNA | (b) hub-only | mx-000-charter §0.3 Shared DNA (properties + failure conditions); legacy about-dna.html |
| 4 | T1 | `/about/universe/curator/` | The Curator — Maher | (b) hub-only | mx-001-about §1.2; corpus MX-001 §1.2; legacy about-curator.html |
| 5 | T2 | `/about/policy/static-principle/` | The Static Principle | (b) hub-only | mx-000-charter §0.6; mx-001-about §1.6; st-19-two-plane; legacy about-static.html |
| 6 | T2 | `/about/policy/ai-policy/` | AI Use Policy | (b) hub-only | corpus MX-007 AI Use & Disclosure |
| 7 | T2 | `/about/policy/governance/` | Governance & Roles | (b) hub-only | mx-000-charter §0.5 Powers placed beyond the Curator; corpus MX-008; legacy about-governance.html |
| 8 | T2 | `/about/policy/accessibility/` | Accessibility Statement | (b) hub-only | corpus MX-010; launch-blockers B-08 (conformance unverified — say so) |
| 9 | T2 | `/about/status/roadmap/` | Roadmap & Gate Conditions | (b) hub-only | launch-blockers (B-01–B-15 + publication order); mx-001-about §1.8 What is not built yet |
| 10 | T2 | `/about/access/pricing/` | Pricing & Payment | (b) hub-only | mx-021-payments (§21.1–21.5); legacy about-funding.html; open-questions RAT-08 (no prices until ratified, B-07) |
| 11 | T2 | `/about/access/free/` | What Is Free | (b) hub-only | mx-021-payments §21.1; mx-001-about |
| 12 | T2 | `/about/legal/contact/` | Contact | (b) hub-only | legacy contact.html + js/contact.js (_redirects target) |
| 13 | T2 | `/about/legal/privacy/` | Privacy | (b) hub-only | corpus MX-003 Privacy Notice; mx-022-identity §22.6; legacy privacy.html (690 words, _redirects target) |
| 14 | T2 | `/about/legal/terms/` | Terms | (b) hub-only | corpus MX-002 Terms of Service; legacy terms.html (_redirects target); open-questions RAT-07 (jurisdiction) |
| 15 | T3 | `/about/policy/security/` | Security Policy | (b) hub-only | corpus MX-011 Security & Responsible Disclosure |
| 16 | T3 | `/about/status/capacity/` | Capacity Meter | (b) hub-only | platform-architecture §2.1–2.2 (budget board, 80% tripwire) |
| 17 | T3 | `/about/access/identity/` | Sign-In & Identity | (b) hub-only | mx-022-identity (whole); platform-architecture Part 3 |
| 18 | T3 | `/about/access/refunds/` | Refunds & Disputes | (b) hub-only | mx-021-payments; corpus MX-016; open-questions RAT-08 |
| 19 | T3 | `/about/legal/cookies/` | Cookies & Local Storage | (b) hub-only | mx-022-identity §22.3.2 (no wildcard cookie); platform-architecture §1.4 |
| 20 | T3 | `/about/legal/ip/` | Intellectual Property | (b) hub-only | corpus MX-012 Licensing & Reuse; corpus MX-017 Trademark & Brand Use |
| 21 | T4 | `/about/policy/no-images/` | No-Image Regime | (b) hub-only | platform-architecture Part 4 The no-image regime |
| 22 | T4 | `/about/status/determinations/` | Determination Queue | (b) hub-only | open-questions (ratification queue); mx-nav-spec (Determination Queue instrument) |
| 23 | T4 | `/about/status/migration/` | Migration Plan (VPS) | (b) hub-only | platform-architecture §2.3 (20,000-file ceiling) + Part 0 |
| 24 | T4 | `/about/access/entitlements/` | Entitlements | (b) hub-only | mx-021-payments §21.4; platform-architecture §6.4 |
| 25 | T4 | `/about/legal/press/` | Press & Media | (b) hub-only | none dedicated in _refs |
| 26 | T4 | `/about/legal/sitemap/` | Sitemap | (b) hub-only | generated — should be the /search/ route index, not prose (duplicate of /search/) |

<!-- /GEN:tables -->

## Notes on the seed sources

- `_refs/meta-review-full.md` and `_refs/meta-review-sitemap.md` are identical;
  cite either one.
- `_refs/corpus.md` is the MX-000…MX-019 and AG-000…AG-010 bundle (release
  v2026.09.0). Where a standalone file exists (`mx-000-charter.md`,
  `mx-001-about.md`), prefer it, because the standalone versions are later. Apply
  `_refs/precedence-and-conflict-rules.md` whenever two sources disagree.
- `SPEC_v2026.08.12.md` describes an older 8-subdomain tree (`/start/`,
  `/a/`, `/b/gate/`). Its route names differ from `MX_ROUTES`, but its page
  intents carry over directly.
- Routes marked "no source identified" need material from the wider corpus
  you have not shared yet. They should not be drafted from `_refs/` alone.

## Punch-list (Phase 4)

**Structural risks to fix before anything else ships**
1. Deploy `main`. Production is a different, older build; see §0.1.
2. Migrate the legacy `about-*.html`, `charter.html`, `privacy.html`,
   `terms.html` and `contact.html` prose into `content/**` *before* the cut-over,
   because the `_redirects` rules will otherwise 301 working pages to empty ones
   (§0.3). Privacy, Terms and Contact are also AdSense-policy pages
   (`ADSENSE_ADJUSTMENTS.md`).
3. Generate `sitemap.xml` and `data/search-index.json` from `MX_ROUTES`.
   Today they are hand-kept 71-entry lists, and `sitemap.xml` should list only
   routes with real content.
4. `auth.metax.academy` (the permanent "Sign in" utility link) returned HTTP
   522. `hreflang="ar"` points at a `/ar/` mirror that 404s.

**Five content gaps that most affect a first-time visitor**
1. `/about/universe/what-it-is/` (About MetaX). Seed: `mx-001-about` plus legacy `about-mission.html`.
2. `/toptech/start/diagnostic/` (the Start Here utility target on every page). Seed: `page-content-spec` §1 `/start/`.
3. `/credentials/verify/lookup/` (the Verify utility target on every page). Seed: SPEC §C.5.6, `verify.html`.
4. `/about/universe/pillars/` + `/about/universe/dna/` (the three pillars and the shared DNA). Seed: `mx-000-charter` §0.2–0.3.
5. `/metax/bcia/what-it-is/` + `/ascent/boundaries/exclusions/` (claims and exclusions before enrolment; SPEC §A skeptic/researcher intents). Seed: `bcia-public-status`, SPEC §C.2.3.
