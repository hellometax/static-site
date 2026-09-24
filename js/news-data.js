/* =====================================================================
   MetaX.Academy — Academy News: categories + post index
   Each post's BODY lives in a Markdown file under content/news/<slug>.md
   (fetched and rendered client-side by js/article.js). This file holds
   only the lightweight index/metadata used by the hub + aside + search.
   ===================================================================== */

const NEWS_CATEGORIES = [
  { slug: "announcements", name: "Announcements", glyph: "📣" },
  { slug: "curriculum",    name: "Curriculum",    glyph: "⟡" },
  { slug: "research",      name: "Research",      glyph: "🔬" },
  { slug: "field-notes",   name: "Field Notes",   glyph: "🧭" }
];

const NEWS_POSTS = [
  {
    slug: "course-rollout-roadmap",
    title: "Course rollout roadmap: why we publish over time, not all at once",
    category: "announcements",
    date: "2026-08-18",
    author: "Maher",
    readMins: 6,
    excerpt: "We won't dump 200+ lessons in a single day. Here is the phased schedule for how TopTech's 23 series ship — flagship-first, wave by wave, with public patch notes.",
    tags: ["Roadmap", "Courses", "Publishing", "TopTech"],
    img: "img/news/news-07.jpg",
    imgIndex: "N-07",
    md: "content/news/course-rollout-roadmap.md"
  },
  {
    slug: "wave-1-flagships-in-production",
    title: "Wave 1 in production: the two flagships are being written first",
    category: "curriculum",
    date: "2026-08-17",
    author: "MetaX Faculty",
    readMins: 5,
    excerpt: "The SEO and Social flagships are being authored and reviewed now. Here's what 'in production' means, our quality gate, and when the first lessons go live.",
    tags: ["Courses", "Flagships", "Production", "Timeline"],
    img: "img/news/news-08.jpg",
    imgIndex: "N-08",
    md: "content/news/wave-1-flagships-in-production.md"
  },
  {
    slug: "how-we-build-a-course",
    title: "How we build one course — and why that takes real time",
    category: "field-notes",
    date: "2026-08-16",
    author: "MetaX Faculty",
    readMins: 7,
    excerpt: "Each course is 12×6 lessons with labs, artifacts, a pre-registered hypothesis and a decay ledger. This is the pipeline every lesson passes through before you see it.",
    tags: ["Method", "Courses", "Quality", "Behind the Scenes"],
    img: "img/news/news-09.jpg",
    imgIndex: "N-09",
    md: "content/news/how-we-build-a-course.md"
  },
  {
    slug: "metax-universe-v2026-08",
    title: "MetaX.Academy becomes a universe: three pillars go live",
    category: "announcements",
    date: "2026-08-15",
    author: "Maher",
    readMins: 5,
    excerpt: "TopTech is now one of three pillars. Academies Community and MacroLifeTach join the universe — one standard of mastery across all of them.",
    tags: ["MetaX", "TopTech", "Community", "MacroLifeTach"],
    img: "img/news/news-01.jpg",
    imgIndex: "N-01",
    md: "content/news/metax-universe-v2026-08.md"
  },
  {
    slug: "three-new-series-paid-cro-l10n",
    title: "Three new series: Paid Media, CRO & Localization join the stack",
    category: "curriculum",
    date: "2026-08-10",
    author: "Maher",
    readMins: 6,
    excerpt: "Series 19, 20 and 21 close the last gaps in the operator stack — buying attention in margin, learning faster than competitors, and shipping into every market.",
    tags: ["Curriculum", "Paid Media", "CRO", "Localization"],
    img: "img/news/news-02.jpg",
    imgIndex: "N-02",
    md: "content/news/three-new-series-paid-cro-l10n.md"
  },
  {
    slug: "answer-engine-citation-study",
    title: "Field study: what answer engines actually cite in 2026",
    category: "research",
    date: "2026-08-04",
    author: "MetaX Research",
    readMins: 8,
    excerpt: "We pre-registered a hypothesis, measured citation share across AI answer surfaces, and published the null. Here is what retrieval-and-citation really rewards.",
    tags: ["GEO", "AEO", "Research", "Falsifiability"],
    img: "img/news/news-03.jpg",
    imgIndex: "N-03",
    md: "content/news/answer-engine-citation-study.md"
  },
  {
    slug: "bcia-living-substrate-brief",
    title: "Meta-X brief: why a living substrate answers eight crises at once",
    category: "research",
    date: "2026-07-28",
    author: "MacroLifeTach",
    readMins: 9,
    excerpt: "A reader's guide to BCIA — how replacing silent silicon with living, self-healing substrate responds line-by-line to the age's interlocking crises.",
    tags: ["MacroLifeTach", "Meta-X", "BCIA", "Governance"],
    img: "img/news/news-04.jpg",
    imgIndex: "N-04",
    md: "content/news/bcia-living-substrate-brief.md"
  },
  {
    slug: "found-your-academy-open-call",
    title: "Open call: found your own academy in the community",
    category: "announcements",
    date: "2026-07-20",
    author: "Maher",
    readMins: 4,
    excerpt: "The Academies Community is open for charters. Bring a thesis and a curator; the Terms of Top Levels bring the standard and the road to institution.",
    tags: ["Community", "Terms of Top Levels", "Founders"],
    img: "img/news/news-05.jpg",
    imgIndex: "N-05",
    md: "content/news/found-your-academy-open-call.md"
  },
  {
    slug: "operator-postmortem-90-day-capstone",
    title: "Field notes: a public post-mortem from a 90-day capstone",
    category: "field-notes",
    date: "2026-07-12",
    author: "Operator Cohort",
    readMins: 7,
    excerpt: "An operator ran the pre-registered playbook, hit their kill criteria on one bet, and shipped the honest post-mortem. Decay-awareness in practice.",
    tags: ["Field Notes", "Kill Criteria", "Unit Economics", "Capstone"],
    img: "img/news/news-06.jpg",
    imgIndex: "N-06",
    md: "content/news/operator-postmortem-90-day-capstone.md"
  }
];
