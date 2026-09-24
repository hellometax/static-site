/* =====================================================================
   MetaX.Academy — Canonical navigation truth (MX-NAV-SPEC v2026.10.1)
   9 pillars · 45 group hubs · leaf pages listed per group.
   Badges: live | planned | research-preview | gated  (no fifth value)

   This is the SINGLE source of truth consumed by:
     - chrome.js   (header mega-menu, mobile menu, footer)
     - hub.js      (hub landing "Map" section + card grids)
     - search page (/search/) and search modal
     - the human-readable sitemap
   Loaded on every page before chrome.js.
   ===================================================================== */
(function () {
  "use strict";

  var MENU = [
    {
      key: "toptech", label: "TopTech", ar: "توب‑تِك", href: "/toptech/",
      blurb: "Master the machine-mediated internet, learn where it fails, and prepare for what replaces it.",
      groups: [
        { heading: "Start & Placement", hub: "/toptech/start/", badge: "live", links: [
          { t: "Placement Diagnostic", u: "/toptech/start/diagnostic/" },
          { t: "How to Study Here", u: "/toptech/start/how-to-study/" },
          { t: "Prerequisites Map", u: "/toptech/start/prerequisites/" },
          { t: "Time Budget & Load", u: "/toptech/start/time-budget/" },
          { t: "What TopTech Is Not", u: "/toptech/start/what-this-is-not/" }
        ]},
        { heading: "The Catalog", hub: "/toptech/catalog/", badge: "live", links: [
          { t: "All Series (S01–S47)", u: "/toptech/catalog/series/" },
          { t: "All Courses", u: "/toptech/catalog/courses/" },
          { t: "Curriculum Map", u: "/toptech/catalog/map/" },
          { t: "Decay State by Series", u: "/toptech/catalog/decay/" },
          { t: "Catalog Changelog", u: "/toptech/catalog/changelog/" }
        ]},
        { heading: "A · Operator Craft", hub: "/toptech/branch-a/", badge: "live", links: [
          { t: "F1 · SEO Mastery Rebuilt", u: "/toptech/branch-a/flagship-search/" },
          { t: "F2 · Social & Attention Rebuilt", u: "/toptech/branch-a/flagship-attention/" },
          { t: "The Next-Level Stack (S01–S21)", u: "/toptech/branch-a/stack/" },
          { t: "The Nine Operator Surfaces", u: "/toptech/branch-a/surfaces/" },
          { t: "Operator Archetypes", u: "/toptech/branch-a/archetypes/" }
        ]},
        { heading: "B · Engineering & IT", hub: "/toptech/branch-b/", badge: "planned", links: [
          { t: "Design & Interface (S22)", u: "/toptech/branch-b/design/" },
          { t: "Development (S23)", u: "/toptech/branch-b/development/" },
          { t: "Data & AI (S24)", u: "/toptech/branch-b/data-ai/" },
          { t: "Infrastructure", u: "/toptech/branch-b/infrastructure/" },
          { t: "Security", u: "/toptech/branch-b/security/" },
          { t: "Networks", u: "/toptech/branch-b/networks/" },
          { t: "The Placement Gate", u: "/toptech/branch-b/gate/" }
        ]},
        { heading: "C · Institution Building", hub: "/toptech/branch-c/", badge: "planned", links: [
          { t: "Academy Builder (S35)", u: "/toptech/branch-c/academy-builder/" },
          { t: "Curriculum & Assessment (S36)", u: "/toptech/branch-c/curriculum-design/" },
          { t: "Governance & Stewardship (S37)", u: "/toptech/branch-c/governance/" }
        ]},
        { heading: "D · E · Gateways", hub: "/toptech/gateways/", badge: "gated", links: [
          { t: "Branch D → Ascent", u: "/toptech/gateways/ascent/" },
          { t: "Branch E → Meta-X", u: "/toptech/gateways/metax/" },
          { t: "Gate Conditions", u: "/toptech/gateways/conditions/" }
        ]}
      ]
    },
    {
      key: "method", label: "Method", ar: "المنهج", href: "/method/",
      blurb: "The academic apparatus: how a lesson is shaped, how a claim is tested, how a claim expires.",
      groups: [
        { heading: "Lesson Architecture", hub: "/method/architecture/", badge: "live", links: [
          { t: "The Cognitive Arc (six beats)", u: "/method/architecture/arc/" },
          { t: "The 12 × 6 Cadence", u: "/method/architecture/cadence/" },
          { t: "The Limits Module", u: "/method/architecture/limits/" },
          { t: "The Bridge Lesson", u: "/method/architecture/bridge/" },
          { t: "The 90-Day Capstone Contract", u: "/method/architecture/capstone/" }
        ]},
        { heading: "The Six Rails", hub: "/method/rails/", badge: "live", links: [
          { t: "Compliance Rail", u: "/method/rails/compliance/" },
          { t: "Accessibility Rail", u: "/method/rails/accessibility/" },
          { t: "Decay-Awareness Rail", u: "/method/rails/decay/" },
          { t: "Falsifiability Rail", u: "/method/rails/falsifiability/" },
          { t: "Kill-Criteria Rail", u: "/method/rails/kill-criteria/" },
          { t: "Unit-Economics Rail", u: "/method/rails/unit-economics/" }
        ]},
        { heading: "Epistemics", hub: "/method/epistemics/", badge: "live", links: [
          { t: "Evidence Classes (E0–E4)", u: "/method/epistemics/evidence-classes/" },
          { t: "The Decay Standard", u: "/method/epistemics/decay-standard/" },
          { t: "Falsifier Grammar", u: "/method/epistemics/falsifier-grammar/" },
          { t: "Counterproductivity Test", u: "/method/epistemics/counterproductivity/" },
          { t: "Banned Claim Register", u: "/method/epistemics/banned-claims/" },
          { t: "Open Problems Register", u: "/method/epistemics/open-problems/" }
        ]},
        { heading: "Assessment", hub: "/method/assessment/", badge: "planned", links: [
          { t: "Scenario Assessment (deterministic)", u: "/method/assessment/scenario/" },
          { t: "The Frozen Rubric (D1–D5)", u: "/method/assessment/rubric/" },
          { t: "Mastery Viva", u: "/method/assessment/viva/" },
          { t: "Adversarial Review Exchange", u: "/method/assessment/review/" },
          { t: "Artefact Register", u: "/method/assessment/artefacts/" },
          { t: "AI Disclosure Standard", u: "/method/assessment/ai-disclosure/" }
        ]},
        { heading: "The Twelve Instruments", hub: "/method/instruments/", badge: "planned", links: [
          { t: "1 · Pre-Registration Desk", u: "/method/instruments/prereg/" },
          { t: "2 · Adversarial Review", u: "/method/instruments/review/" },
          { t: "3 · Decay Watch", u: "/method/instruments/decay-watch/" },
          { t: "4 · Time-Boxed Cohorts", u: "/method/instruments/cohorts/" },
          { t: "5 · Artefact Register", u: "/method/instruments/artefacts/" },
          { t: "6 · Scenario Engine", u: "/method/instruments/scenario-engine/" },
          { t: "7 · Mastery Viva", u: "/method/instruments/viva/" },
          { t: "8 · Academy Exchange", u: "/method/instruments/exchange/" },
          { t: "9 · Bridge Passport", u: "/method/instruments/passport/" },
          { t: "10 · Correction Bounty", u: "/method/instruments/bounty/" },
          { t: "11 · Citation Ledger", u: "/method/instruments/citations/" },
          { t: "12 · Determination Queue", u: "/method/instruments/determinations/" }
        ]},
        { heading: "Notation & Research Ethics", hub: "/method/notation/", badge: "live", links: [
          { t: "Symbol Grammar", u: "/method/notation/symbols/" },
          { t: "Identifier Grammar", u: "/method/notation/identifiers/" },
          { t: "Versioning Policy", u: "/method/notation/versioning/" },
          { t: "Research Ethics & Red Lines", u: "/method/notation/research-ethics/" },
          { t: "Human-Subject Exclusion", u: "/method/notation/human-subject-exclusion/" }
        ]}
      ]
    },
    {
      key: "ascent", label: "Ascent", ar: "الصعود", href: "/ascent/", badge: "research-preview",
      blurb: "The ten-rung ladder — from the computing substrate to the edge of what silicon can do.",
      groups: [
        { heading: "The Ten Rungs", hub: "/ascent/rungs/", badge: "research-preview", links: [
          { t: "S38 · Computing Substrate Literacy", u: "/ascent/rungs/s38-substrate/" },
          { t: "S39 · Paradigms & Their Limits", u: "/ascent/rungs/s39-paradigms/" },
          { t: "S40 · Mathematical Foundations", u: "/ascent/rungs/s40-mathematics/" },
          { t: "S41 · The End of Binary", u: "/ascent/rungs/s41-end-of-binary/" },
          { t: "S42 · Multi-Valued & Fuzzy", u: "/ascent/rungs/s42-multivalued/" },
          { t: "S43 · From Electron to Cell", u: "/ascent/rungs/s43-electron-to-cell/" },
          { t: "S44 · Biological Computation", u: "/ascent/rungs/s44-biological/" },
          { t: "S45 · Embodied Computation", u: "/ascent/rungs/s45-embodied/" },
          { t: "S46 · Network Science", u: "/ascent/rungs/s46-networks/" },
          { t: "S47 · Collective Dynamics", u: "/ascent/rungs/s47-collective/" }
        ]},
        { heading: "Reading the Ladder", hub: "/ascent/reading/", badge: "research-preview", links: [
          { t: "Blue Path — Foundations", u: "/ascent/reading/blue/" },
          { t: "Green Path — Bridge to Life", u: "/ascent/reading/green/" },
          { t: "Gold Path — Full Ascent", u: "/ascent/reading/gold/" },
          { t: "Source Books (Arabic)", u: "/ascent/reading/sources/" },
          { t: "Citation-Only Rule", u: "/ascent/reading/citation-rule/" }
        ]},
        { heading: "Boundaries", hub: "/ascent/boundaries/", badge: "research-preview", links: [
          { t: "The Limits of Silicon", u: "/ascent/boundaries/limits-of-silicon/" },
          { t: "What Ascent Is Not", u: "/ascent/boundaries/exclusions/" },
          { t: "Banned Claims", u: "/ascent/boundaries/banned-claims/" },
          { t: "Bridge Passport & Gating", u: "/ascent/boundaries/passport/" },
          { t: "Rung Status Table", u: "/ascent/boundaries/status/" }
        ]}
      ]
    },
    {
      key: "metax", label: "Meta-X", ar: "ميتا‑إكس", href: "/metax/", badge: "research-preview",
      blurb: "MacroLifeTech — the civilizational research umbrella. Nine programs, one of them BCIA.",
      groups: [
        { heading: "The Umbrella", hub: "/metax/umbrella/", badge: "research-preview", links: [
          { t: "What MacroLifeTech Is", u: "/metax/umbrella/what-it-is/" },
          { t: "The Research Charter", u: "/metax/umbrella/charter/" },
          { t: "What This Is Not", u: "/metax/umbrella/exclusions/" },
          { t: "Method & Evidence Policy", u: "/metax/umbrella/method/" },
          { t: "Publication & Preprint Policy", u: "/metax/umbrella/publication/" }
        ]},
        { heading: "The Nine Programs", hub: "/metax/programs/", badge: "research-preview", links: [
          { t: "Agora — Collective Decision", u: "/metax/programs/agora/" },
          { t: "Ma'nā — Meaning & Semantics", u: "/metax/programs/mana/" },
          { t: "Metabolism — Energy & Flow", u: "/metax/programs/metabolism/" },
          { t: "Soma — Embodiment", u: "/metax/programs/soma/" },
          { t: "Paideia — Formation", u: "/metax/programs/paideia/" },
          { t: "Athar — Trace & Record", u: "/metax/programs/athar/" },
          { t: "Āfāq — Horizons", u: "/metax/programs/afaq/" },
          { t: "Mīzān — Measure & Balance", u: "/metax/programs/mizan/" },
          { t: "BCIA — Bio-Computational", u: "/metax/programs/bcia/" }
        ]},
        { heading: "BCIA", hub: "/metax/bcia/", badge: "gated", links: [
          { t: "What BCIA Is & Is Not", u: "/metax/bcia/what-it-is/" },
          { t: "The Eight Series", u: "/metax/bcia/series/" },
          { t: "Volume Roadmap", u: "/metax/bcia/roadmap/" },
          { t: "Document Zero — Seven Bases", u: "/metax/bcia/document-zero/" },
          { t: "The Charter & Human-Cell Exclusion", u: "/metax/bcia/charter/" },
          { t: "Governance — Cloister / Atrium", u: "/metax/bcia/governance/" },
          { t: "Notation & Versioning", u: "/metax/bcia/notation/" },
          { t: "Bibliography", u: "/metax/bcia/bibliography/" },
          { t: "Contribution Guidelines", u: "/metax/bcia/contribution/" },
          { t: "The Gateway (locked)", u: "/metax/bcia/gateway/" }
        ]},
        { heading: "The Honesty Layer", hub: "/metax/bcia/status/", badge: "gated", links: [
          { t: "Status & Remediation", u: "/metax/bcia/status/remediation/" },
          { t: "The Critical Audit", u: "/metax/bcia/status/audit/" },
          { t: "Publication Readiness Protocol", u: "/metax/bcia/status/protocol/" },
          { t: "Defect Register", u: "/metax/bcia/status/defects/" },
          { t: "Scope Limits & Open Problems", u: "/metax/bcia/status/open-problems/" }
        ]}
      ]
    },
    {
      key: "academies", label: "Academies", ar: "الأكاديميات", href: "/academies/",
      blurb: "Found and teach your own academy — from Applicant to Institution, on a public record.",
      groups: [
        { heading: "How It Works", hub: "/academies/how-it-works/", badge: "live", links: [
          { t: "The Four Principles", u: "/academies/how-it-works/principles/" },
          { t: "The Founding Path", u: "/academies/how-it-works/path/" },
          { t: "Curator Eligibility", u: "/academies/how-it-works/eligibility/" },
          { t: "The Sandbox", u: "/academies/how-it-works/sandbox/" },
          { t: "Apply", u: "/academies/how-it-works/apply/" },
          { t: "The Honest Cost", u: "/academies/how-it-works/cost/" }
        ]},
        { heading: "The Five Levels", hub: "/academies/levels/", badge: "live", links: [
          { t: "L1 · Applicant", u: "/academies/levels/l1-applicant/" },
          { t: "L2 · Sandbox", u: "/academies/levels/l2-sandbox/" },
          { t: "L3 · Provisional", u: "/academies/levels/l3-provisional/" },
          { t: "L4 · Chartered", u: "/academies/levels/l4-chartered/" },
          { t: "L5 · Institution", u: "/academies/levels/l5-institution/" }
        ]},
        { heading: "The Eleven Requirements", hub: "/academies/requirements/", badge: "live", links: [
          { t: "R1 · Curator Eligibility", u: "/academies/requirements/r1-curator/" },
          { t: "R2 · Thesis Scope", u: "/academies/requirements/r2-thesis/" },
          { t: "R3 · Curriculum Minimum", u: "/academies/requirements/r3-curriculum/" },
          { t: "R4 · Frozen Rubric", u: "/academies/requirements/r4-rubric/" },
          { t: "R5 · Governance Charter", u: "/academies/requirements/r5-charter/" },
          { t: "R6 · Technical Spec", u: "/academies/requirements/r6-technical/" },
          { t: "R7 · Bilingual Policy", u: "/academies/requirements/r7-bilingual/" },
          { t: "R8 · Legal Terms", u: "/academies/requirements/r8-legal/" },
          { t: "R9 · Red-Line Content Bans", u: "/academies/requirements/r9-red-lines/" },
          { t: "R10 · Annual Audit", u: "/academies/requirements/r10-audit/" },
          { t: "R11 · Part H Statement", u: "/academies/requirements/r11-part-h/" }
        ]},
        { heading: "Operating an Academy", hub: "/academies/operating/", badge: "live", links: [
          { t: "Technical Guide & academy.json", u: "/academies/operating/technical/" },
          { t: "Your Subdomain", u: "/academies/operating/subdomain/" },
          { t: "Design Constraints", u: "/academies/operating/design/" },
          { t: "Moderation & Enforcement", u: "/academies/operating/moderation/" },
          { t: "Academy Exchange", u: "/academies/operating/exchange/" },
          { t: "Revocation & Wind-Down", u: "/academies/operating/revocation/" }
        ]},
        { heading: "The Public Record", hub: "/academies/record/", badge: "live", links: [
          { t: "Directory of Academies", u: "/academies/record/directory/" },
          { t: "Audit Reports", u: "/academies/record/audits/" },
          { t: "Charter Register", u: "/academies/record/charters/" },
          { t: "Correction Bounty Log", u: "/academies/record/bounty/" }
        ]}
      ]
    },
    {
      key: "credentials", label: "Credentials", ar: "الشهادات", href: "/credentials/",
      blurb: "The mastery ladder, the evidence it demands, and the public verification that makes it checkable.",
      groups: [
        { heading: "The Ladder", hub: "/credentials/ladder/", badge: "live", links: [
          { t: "Completion Marker (not a credential)", u: "/credentials/ladder/completion-marker/" },
          { t: "Series Practitioner", u: "/credentials/ladder/practitioner/" },
          { t: "Professional Operator", u: "/credentials/ladder/professional/" },
          { t: "Master-Fellow", u: "/credentials/ladder/master-fellow/" },
          { t: "MetaX Contributor", u: "/credentials/ladder/contributor/" }
        ]},
        { heading: "Evidence & Proof", hub: "/credentials/evidence/", badge: "live", links: [
          { t: "The Proof Ladder (P0–P3)", u: "/credentials/evidence/proof-ladder/" },
          { t: "Submission Pack", u: "/credentials/evidence/submission/" },
          { t: "Dossier & Templates", u: "/credentials/evidence/templates/" },
          { t: "Artefact Requirements", u: "/credentials/evidence/artefacts/" },
          { t: "AI Disclosure", u: "/credentials/evidence/ai-disclosure/" }
        ]},
        { heading: "Review", hub: "/credentials/review/", badge: "live", links: [
          { t: "Reviewer Handbook", u: "/credentials/review/handbook/" },
          { t: "The Frozen Rubric (D1–D5)", u: "/credentials/review/rubric/" },
          { t: "Conflicts of Interest", u: "/credentials/review/conflicts/" },
          { t: "Reviewer Statistics", u: "/credentials/review/statistics/" },
          { t: "Appeals (MX-016)", u: "/credentials/review/appeals/" }
        ]},
        { heading: "Lifecycle", hub: "/credentials/lifecycle/", badge: "live", links: [
          { t: "Decay & Renewal", u: "/credentials/lifecycle/renewal/" },
          { t: "Revocation Grounds", u: "/credentials/lifecycle/revocation/" },
          { t: "Integrity Report", u: "/credentials/lifecycle/integrity/" },
          { t: "Registry Spec (credentials.json)", u: "/credentials/lifecycle/registry-spec/" }
        ]},
        { heading: "Verification", hub: "/credentials/verify/", badge: "live", links: [
          { t: "Verify a Credential", u: "/credentials/verify/lookup/" },
          { t: "How Verification Works", u: "/credentials/verify/how-it-works/" },
          { t: "What It Does Not Prove", u: "/credentials/verify/limits/" },
          { t: "Revocation List", u: "/credentials/verify/revocations/" }
        ]}
      ]
    },
    {
      key: "library", label: "Library", ar: "المكتبة", href: "/library/",
      blurb: "The stack, the standards, the bilingual lexicon, the open data, and the corrections record.",
      groups: [
        { heading: "The Stack", hub: "/library/stack/", badge: "live", links: [
          { t: "Layer Model of the Estate", u: "/library/stack/layers/" },
          { t: "The Two-Plane Model", u: "/library/stack/two-plane/" },
          { t: "Data Tiers (T1–T4)", u: "/library/stack/data-tiers/" },
          { t: "Hosting & Topology", u: "/library/stack/topology/" }
        ]},
        { heading: "Standards", hub: "/library/standards/", badge: "live", links: [
          { t: "Publishing Style Guide", u: "/library/standards/style-guide/" },
          { t: "Symbol Standard", u: "/library/standards/symbols/" },
          { t: "Decay Standard", u: "/library/standards/decay/" },
          { t: "Falsifiability Standard", u: "/library/standards/falsifiability/" },
          { t: "Accessibility Standard", u: "/library/standards/accessibility/" },
          { t: "Bilingual Standard", u: "/library/standards/bilingual/" },
          { t: "Master Generation Prompt", u: "/library/standards/generation-prompt/" }
        ]},
        { heading: "Lexicon", hub: "/library/lexicon/", badge: "live", links: [
          { t: "All Entries", u: "/library/lexicon/entries/" },
          { t: "Root Index (Arabic)", u: "/library/lexicon/roots/" },
          { t: "Contested Terms", u: "/library/lexicon/contested/" },
          { t: "Lexicon Method", u: "/library/lexicon/method/" }
        ]},
        { heading: "The Record", hub: "/library/record/", badge: "live", links: [
          { t: "MX Instruments (MX-000–MX-023)", u: "/library/record/mx-instruments/" },
          { t: "AG Instruments (AG-000–AG-011)", u: "/library/record/ag-instruments/" },
          { t: "Corrections Log", u: "/library/record/corrections-log/" },
          { t: "Verification Log", u: "/library/record/verification-log/" },
          { t: "Errata", u: "/library/record/errata/" }
        ]},
        { heading: "Sources & Data", hub: "/library/sources/", badge: "live", links: [
          { t: "Estate Bibliography", u: "/library/sources/bibliography/" },
          { t: "Citation Ledger", u: "/library/sources/citations/" },
          { t: "Open Data (JSON)", u: "/library/sources/downloads/" },
          { t: "Schemas", u: "/library/sources/schemas/" }
        ]},
        { heading: "News", hub: "/library/news/", badge: "live", links: [
          { t: "Announcements", u: "/library/news/announcements/" },
          { t: "Curriculum Releases", u: "/library/news/curriculum/" },
          { t: "Research Briefs", u: "/library/news/research/" },
          { t: "Operator Field Notes", u: "/library/news/field-notes/" },
          { t: "Archive", u: "/library/news/archive/" }
        ]}
      ]
    },
    {
      key: "license", label: "License", ar: "الرخصة", href: "/license/", badge: "live",
      blurb: "The Maher License 2.3 and the register of twenty-five structural harms it makes operative.",
      groups: [
        { heading: "The Instrument", hub: "/license/ml-2-3/", badge: "live", links: [
          { t: "Part 0 · Preamble & Standing", u: "/license/ml-2-3/part-0-preamble/" },
          { t: "Part A · Definitions", u: "/license/ml-2-3/part-a-definitions/" },
          { t: "Part B · Grant", u: "/license/ml-2-3/part-b-grant/" },
          { t: "Part C · Ethical Conditions", u: "/license/ml-2-3/part-c-conditions/" },
          { t: "Part D · Notices & Disclosure", u: "/license/ml-2-3/part-d-notices/" },
          { t: "Part E · Governance", u: "/license/ml-2-3/part-e-governance/" },
          { t: "Part F · Breach & Termination", u: "/license/ml-2-3/part-f-breach/" },
          { t: "Part G · Interpretation", u: "/license/ml-2-3/part-g-interpretation/" },
          { t: "Part H · Structural Harms", u: "/license/ml-2-3/part-h-harms/" },
          { t: "Schedules 1–5", u: "/license/ml-2-3/schedules/" },
          { t: "Plain-Text Mirror", u: "/license/ml-2-3/ml-2-3.txt", ext: true }
        ]},
        { heading: "The Register", hub: "/license/harms/", badge: "live", links: [
          { t: "I · Cognitive (HX-01–03)", u: "/license/harms/stratum-i-cognitive/" },
          { t: "II · Relational (HX-04–06)", u: "/license/harms/stratum-ii-relational/" },
          { t: "III · Economic (HX-07–09, 13)", u: "/license/harms/stratum-iii-economic/" },
          { t: "IV · Material (HX-10–12, 14)", u: "/license/harms/stratum-iv-material/" },
          { t: "V · Reflexive (HX-15–19)", u: "/license/harms/stratum-v-reflexive/" },
          { t: "VI · Successor (HX-20–25)", u: "/license/harms/stratum-vi-successor/" },
          { t: "All Falsifiers", u: "/license/harms/falsifiers/" }
        ]},
        { heading: "Operative Machinery", hub: "/license/machinery/", badge: "live", links: [
          { t: "The Eight Absolutes (§H.3)", u: "/license/machinery/absolutes/" },
          { t: "Roles (§H.1-bis)", u: "/license/machinery/roles/" },
          { t: "The Scale Gate (§H.2-bis)", u: "/license/machinery/scale-gate/" },
          { t: "Conditions vs Covenants (§F.4)", u: "/license/machinery/breach/" },
          { t: "Cure & Reinstatement", u: "/license/machinery/cure/" },
          { t: "Riba — the Four Elements (§C.9)", u: "/license/machinery/riba/" }
        ]},
        { heading: "Compliance", hub: "/license/statement/", badge: "live", links: [
          { t: "Statement Form (Schedule 1)", u: "/license/statement/form/" },
          { t: "Statement Generator", u: "/license/statement/generator/" },
          { t: "MetaX's Own Statement", u: "/license/statement/ours/" },
          { t: "Worked Examples by Tier", u: "/license/statement/examples/" },
          { t: "Compatibility & SPDX", u: "/license/statement/compatibility/" }
        ]},
        { heading: "Falsification & History", hub: "/license/falsification/", badge: "live", links: [
          { t: "Objections & Responses", u: "/license/falsification/objections/" },
          { t: "Withdrawals & Narrowings", u: "/license/falsification/withdrawals/" },
          { t: "Defect Log (ML-D-nnn)", u: "/license/falsification/defects/" },
          { t: "Changelog 2.2 → 2.3", u: "/license/falsification/changelog/" },
          { t: "ML-2.2 (superseded)", u: "/license/falsification/ml-2-2/" },
          { t: "Open Questions (RAT-nn)", u: "/license/falsification/open-questions/" }
        ]}
      ]
    },
    {
      key: "about", label: "About", ar: "عن ميتا‑إكس", href: "/about/",
      blurb: "The universe, its shared DNA, the curator, the policies, and the honest state of the build.",
      groups: [
        { heading: "The Universe", hub: "/about/universe/", badge: "live", links: [
          { t: "About MetaX", u: "/about/universe/what-it-is/" },
          { t: "The Three Pillars", u: "/about/universe/pillars/" },
          { t: "The Shared DNA", u: "/about/universe/dna/" },
          { t: "The Curator — Maher", u: "/about/universe/curator/" },
          { t: "Demo Notice", u: "/about/universe/demo-notice/" }
        ]},
        { heading: "Principles & Policy", hub: "/about/policy/", badge: "live", links: [
          { t: "The Static Principle", u: "/about/policy/static-principle/" },
          { t: "AI Use Policy", u: "/about/policy/ai-policy/" },
          { t: "Governance & Roles", u: "/about/policy/governance/" },
          { t: "Accessibility Statement", u: "/about/policy/accessibility/" },
          { t: "Security Policy", u: "/about/policy/security/" },
          { t: "No-Image Regime", u: "/about/policy/no-images/" }
        ]},
        { heading: "State of the Build", hub: "/about/status/", badge: "live", links: [
          { t: "Capacity Meter", u: "/about/status/capacity/" },
          { t: "Defect Log", u: "/about/status/defects/" },
          { t: "Determination Queue", u: "/about/status/determinations/" },
          { t: "Migration Plan (VPS)", u: "/about/status/migration/" },
          { t: "Roadmap & Gate Conditions", u: "/about/status/roadmap/" }
        ]},
        { heading: "Access & Money", hub: "/about/access/", badge: "live", links: [
          { t: "Pricing & Payment", u: "/about/access/pricing/" },
          { t: "What Is Free", u: "/about/access/free/" },
          { t: "Sign-In & Identity", u: "/about/access/identity/" },
          { t: "Entitlements", u: "/about/access/entitlements/" },
          { t: "Refunds & Disputes", u: "/about/access/refunds/" }
        ]},
        { heading: "Legal & Contact", hub: "/about/legal/", badge: "live", links: [
          { t: "Contact", u: "/about/legal/contact/" },
          { t: "Press & Media", u: "/about/legal/press/" },
          { t: "Privacy", u: "/about/legal/privacy/" },
          { t: "Terms", u: "/about/legal/terms/" },
          { t: "Advertising Policy", u: "/about/legal/advertising/" },
          { t: "Cookies & Local Storage", u: "/about/legal/cookies/" },
          { t: "Intellectual Property", u: "/about/legal/ip/" },
          { t: "Sitemap", u: "/about/legal/sitemap/" }
        ]}
      ]
    }
  ];

  var UTILITY = [
    { t: "Start Here", u: "/toptech/start/diagnostic/", cls: "util-start",  glyph: "\u22a2" },
    { t: "Verify",     u: "/credentials/verify/lookup/", cls: "util-verify", glyph: "\u25c9" },
    { t: "Sign in",    u: "https://auth.metax.academy/authorize?client=web&redirect_uri=https%3A%2F%2Fmetax.academy%2F",
                       cls: "util-auth", glyph: "\u2192", ext: true }
  ];

  /* navKeyFor — reads first path segment (v2026.10.1 §1.4). */
  function navKeyFor() {
    var seg = location.pathname.replace(/^\/+/, "").split("/");
    if (seg[0] === "ar") seg.shift();
    var k = seg[0] || "home";
    var KEYS = ["toptech","method","ascent","metax","academies","credentials","library","license","about"];
    return KEYS.indexOf(k) > -1 ? k : "home";
  }

  /* Flatten every route (pillar hubs, group hubs, leaves) for search + sitemap. */
  function allRoutes() {
    var out = [];
    MENU.forEach(function (m) {
      out.push({ url: m.href, title: m.label, cat: m.label, kind: "pillar", blurb: m.blurb });
      (m.groups || []).forEach(function (g) {
        if (g.hub) out.push({ url: g.hub, title: g.heading, cat: m.label, kind: "hub", badge: g.badge });
        (g.links || []).forEach(function (l) {
          if (l.ext) return;
          out.push({ url: l.u, title: l.t, cat: m.label, kind: "leaf", group: g.heading });
        });
      });
    });
    return out;
  }

  window.MX_ROUTES = { MENU: MENU, UTILITY: UTILITY, navKeyFor: navKeyFor, allRoutes: allRoutes };
})();
