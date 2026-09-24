/* =====================================================================
   MetaX.Academy — Shared site chrome
   Mega-menu · active item · smart search (popup + highlights)
   Loaded on every page BEFORE the page-specific script.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------
     1. SEARCH INDEX — a lightweight index of every page & section.
        Used by the smart search to jump + highlight matches.
  --------------------------------------------------------------- */
  var SEARCH_INDEX = [
    // Root
    { title: "MetaX.Academy — The Universe", url: "index.html", cat: "Home", text: "three pillars TopTech Academies Community MacroLifeTach Meta-X shared DNA falsifiable decay governed version-controlled" },
    { title: "The Three Pillars", url: "index.html#pillars-sec", cat: "Home", text: "pick your entry point TopTech community macrolifetach mastery standard" },
    { title: "The Shared DNA", url: "index.html#dna-sec", cat: "Home", text: "decay-aware falsifiable governed version-controlled principles" },
    // TopTech
    { title: "TopTech Academy", url: "toptech.html", cat: "TopTech", text: "operator curriculum post-search post-attention machine-mediated internet flagships series" },
    { title: "The Flagships (Rebuilt)", url: "toptech.html#flagships-sec", cat: "TopTech", text: "SEO mastery social media marketing rebuilt discoverability attention" },
    { title: "The Next-Level Stack", url: "toptech.html#stack", cat: "TopTech", text: "21 series answer engine owned audience agentic commerce data first-party AI operations" },
    { title: "The Cognitive Arc", url: "toptech.html#arc-sec", cat: "TopTech", text: "foundations execution scale mastery meta cadence 12 courses 6 lessons" },
    { title: "Companion Rails", url: "toptech.html#rails-sec", cat: "TopTech", text: "compliance accessibility decay falsifiability kill criteria unit economics" },
    { title: "Credentialing Layer", url: "toptech.html#credential", cat: "TopTech", text: "portfolio verified outcomes peer review mastery defensible" },
    { title: "Operator Archetypes", url: "toptech.html#archetypes-sec", cat: "TopTech", text: "publisher creator builder saas commercial strategist consultant paths" },
    { title: "Full Curriculum — 23 Series", url: "curriculum.html", cat: "TopTech", text: "all series courses lessons flagships accordion GEO AEO CRO localization paid media" },
    // Community
    { title: "Academies Community", url: "community.html", cat: "Community", text: "found create an academy terms of top levels future academies mastery ladder charter institution" },
    { title: "How the Community Works", url: "community.html#how", cat: "Community", text: "propose academy shared standard interlinked future academies principles" },
    { title: "Terms of Top Levels", url: "community.html#levels", cat: "Community", text: "applicant provisional chartered standard-bearer institution five levels" },
    { title: "Found an Academy — The Path", url: "community.html#apply", cat: "Community", text: "apply charter connect compound process steps" },
    // MacroLifeTach
    { title: "MacroLifeTach — Meta-X", url: "macrolifetach.html", cat: "MacroLifeTach", text: "beyond the field living substrate silicon BCIA biological conscious information architecture" },
    { title: "The Eight Crises", url: "macrolifetach.html#crises", cat: "MacroLifeTach", text: "substrate ceiling moore law intelligence understand earth exhausting fractured knowledge one tongue governance existential" },
    { title: "The Nine Programs", url: "macrolifetach.html#programs", cat: "MacroLifeTach", text: "BCIA Agora Ma'na Metabolism Soma Paideia Athar Afaq Mizan living meaning energy body learning memory space economy" },
    { title: "Governance — The Cloister", url: "macrolifetach.html#governance", cat: "MacroLifeTach", text: "decay clause provenance care compiler human cell exclusion ethics الرواق" },
    // News (populated dynamically too, but index the hub)
    { title: "Academy News", url: "news.html", cat: "News", text: "news articles posts categories announcements curriculum releases research field notes" }
  ];

  // Series & flagship detail pages are indexed from data.js if present.
  function extendIndexFromData() {
    try {
      if (typeof SERIES !== "undefined") {
        SERIES.forEach(function (s) {
          SEARCH_INDEX.push({
            title: "Series " + s.n + " — " + s.title,
            url: "detail.html?type=series&id=" + s.n,
            cat: "TopTech",
            text: s.sub + " " + s.territory + " " + s.tier + " " + (s.pairs || "")
          });
        });
      }
      if (typeof FLAGSHIPS !== "undefined") {
        FLAGSHIPS.forEach(function (f) {
          SEARCH_INDEX.push({
            title: "Flagship " + f.code + " — " + f.title,
            url: "detail.html?type=flagship&id=" + f.id,
            cat: "TopTech",
            text: f.tagline + " " + f.territory + " " + f.thesis
          });
        });
      }
      if (typeof MLT_PROGRAMS !== "undefined") {
        MLT_PROGRAMS.forEach(function (p) {
          SEARCH_INDEX.push({
            title: p.code + " — " + p.en,
            url: "detail.html?type=program&id=" + p.code,
            cat: "MacroLifeTach",
            text: p.ar + " " + p.en + " " + p.desc
          });
        });
      }
      if (typeof NEWS_POSTS !== "undefined") {
        NEWS_POSTS.forEach(function (n) {
          SEARCH_INDEX.push({
            title: n.title,
            url: "article.html?id=" + n.slug,
            cat: "News",
            text: (n.category || "") + " " + (n.excerpt || "") + " " + (n.tags || []).join(" ")
          });
        });
      }
    } catch (e) {}
  }

  /* ---------------------------------------------------------------
     2. Determine current page for active-menu highlighting.
  --------------------------------------------------------------- */
  function currentPage() {
    var path = location.pathname.split("/").pop() || "index.html";
    if (path === "") path = "index.html";
    return path;
  }
  // Map a page to its top-level nav key.
  function navKeyFor(page) {
    if (page === "index.html") return "home";
    if (page === "toptech.html" || page === "curriculum.html" || page === "detail.html" || page === "start-here.html") return "toptech";
    if (page === "ascent.html") return "ascent";
    if (page === "bcia.html" || page === "bcia-status.html" || page === "macrolifetach.html") return "bcia";
    if (page === "community.html" || page === "academies.html") return "academies";
    if (page === "credentials.html" || page === "verify.html") return "credentials";
    if (page === "library.html" || page === "lexicon.html" || page === "news.html" || page === "article.html") return "library";
    if (page === "about.html" || page === "contact.html" || page === "privacy.html" || page === "terms.html" || page === "charter.html" || page === "about-universe.html" || page === "about-dna.html" || page === "about-curator.html" || page === "about-governance.html" || page === "about-mission.html" || page === "about-what-metax-is-not.html" || page === "about-static.html" || page === "about-funding.html") return "about";
    return "home";
  }

  /* ---------------------------------------------------------------
     3. Build the mega-menu + search trigger and inject into header.
        We REPLACE the simple nav with a robust one, but keep the
        brand and mobile-menu button that pages already provide.
  --------------------------------------------------------------- */
  // Status badges: live | planned | research-preview | gated
  var MENU = [
    {
      key: "toptech", label: "TopTech", href: "toptech.html",
      blurb: "Master the machine-mediated internet, learn its limits, and prepare for what lies beyond IT.",
      groups: [
        { heading: "Start", links: [
          { t: "Start Here — Diagnostic", u: "start-here.html" },
          { t: "TopTech Home", u: "toptech.html" },
          { t: "Full Catalog (23)", u: "curriculum.html" },
          { t: "Changelog", u: "toptech.html#arc-sec" }
        ]},
        { heading: "A · Operator Craft", badge: "live", links: [
          { t: "The Flagships (F1, F2)", u: "toptech.html#flagships-sec" },
          { t: "The Next-Level Stack (S01–S21)", u: "toptech.html#stack" },
          { t: "Operator Archetypes", u: "toptech.html#archetypes-sec" }
        ]},
        { heading: "B · Engineering & IT", badge: "planned", links: [
          { t: "Design · Dev · Data/AI (S22–S24)", u: "toptech.html#branches-sec" },
          { t: "Infra · Security · Networks", u: "toptech.html#branches-sec" },
          { t: "10 more — planned", u: "toptech.html#branches-sec" }
        ]},
        { heading: "C · Institution Building", badge: "planned", links: [
          { t: "Academy Builder (S35)", u: "academies.html" },
          { t: "Curriculum & Assessment (S36)", u: "toptech.html#branches-sec" },
          { t: "Governance & Stewardship (S37)", u: "toptech.html#branches-sec" }
        ]},
        { heading: "Method", links: [
          { t: "The Cognitive Arc", u: "toptech.html#arc-sec" },
          { t: "Companion Rails", u: "toptech.html#rails-sec" },
          { t: "Limits & Bridge pedagogy", u: "toptech.html#arc-sec" }
        ]}
      ]
    },
    {
      key: "ascent", label: "Ascent", href: "ascent.html", badge: "research-preview",
      blurb: "The ten-rung ladder — from the computing substrate to the limits of silicon and beyond.",
      groups: [
        { heading: "The Ten Rungs (S38–S47)", badge: "research-preview", links: [
          { t: "S38 · Computing Substrate Literacy", u: "ascent.html#rungs" },
          { t: "S39 · Programming Paradigms & Limits", u: "ascent.html#rungs" },
          { t: "S40 · Mathematical Foundations", u: "ascent.html#rungs" },
          { t: "S41 · The End of Binary", u: "ascent.html#rungs" },
          { t: "S42 · Multi-Valued & Fuzzy Computation", u: "ascent.html#rungs" }
        ]},
        { heading: "The Bridge to Life", badge: "research-preview", links: [
          { t: "S43 · From Electron to Cell", u: "ascent.html#rungs" },
          { t: "S44 · Biological Computation", u: "ascent.html#rungs" },
          { t: "S45 · Embodied Computation", u: "ascent.html#rungs" },
          { t: "S46 · Network Science", u: "ascent.html#rungs" },
          { t: "S47 · Higher Systems & Collective Dynamics", u: "ascent.html#rungs" }
        ]},
        { heading: "Readers & Paths", links: [
          { t: "The Limits of Silicon", u: "ascent.html#limits" },
          { t: "What Ascent Is Not", u: "ascent.html#exclusions" },
          { t: "Reading Paths (Blue/Green/Gold)", u: "ascent.html#paths" },
          { t: "Ascent Status", u: "ascent.html#status" }
        ]}
      ]
    },
    {
      key: "bcia", label: "BCIA", href: "bcia.html", badge: "gated",
      blurb: "The living-substrate research pillar. Under remediation — taught toward, never as settled doctrine.",
      groups: [
        { heading: "Orientation", links: [
          { t: "What BCIA Is & Is Not", u: "bcia.html#what" },
          { t: "The Eight Series", u: "bcia.html#series" },
          { t: "Volume Roadmap", u: "bcia.html#roadmap" },
          { t: "Document Zero — Seven Bases", u: "bcia.html#doc-zero" }
        ]},
        { heading: "Charter & Governance", links: [
          { t: "The Charter & Human-Cell Exclusion", u: "bcia.html#charter" },
          { t: "Governance — Cloister / Atrium", u: "bcia.html#governance" },
          { t: "MacroLifeTach (Meta-X) context", u: "macrolifetach.html" }
        ]},
        { heading: "Honesty Layer", badge: "gated", links: [
          { t: "Status & Remediation", u: "bcia-status.html" },
          { t: "The Critical Audit", u: "bcia-status.html#audit" },
          { t: "Publication Readiness Protocol", u: "bcia-status.html#protocol" },
          { t: "Scope Limits & Open Problems", u: "bcia-status.html#open" }
        ]}
      ]
    },
    {
      key: "academies", label: "Academies", href: "academies.html",
      blurb: "Found and teach your own academy — from Applicant to Institution.",
      groups: [
        { heading: "How It Works", links: [
          { t: "Community Overview", u: "academies.html" },
          { t: "The Four Principles", u: "academies.html#principles" },
          { t: "The Founding Path", u: "academies.html#path" },
          { t: "Apply", u: "academies.html#apply" }
        ]},
        { heading: "The Five Levels", links: [
          { t: "L1 Applicant → L5 Institution", u: "academies.html#levels" },
          { t: "Sandbox Preview", u: "academies.html#levels" },
          { t: "Directory of Academies", u: "academies.html#directory" },
          { t: "Audit Reports", u: "academies.html#directory" }
        ]},
        { heading: "Requirements", links: [
          { t: "The Eleven Requirement Groups", u: "academies.html#requirements" },
          { t: "Terms of Top Levels", u: "academies.html#requirements" },
          { t: "Technical Guide (academy.json)", u: "academies.html#requirements" },
          { t: "Moderation & Enforcement", u: "academies.html#requirements" }
        ]}
      ]
    },
    {
      key: "credentials", label: "Credentials", href: "credentials.html",
      blurb: "The mastery ladder — Practitioner, Professional, Master-Fellow — with public verification.",
      groups: [
        { heading: "The Ladder", links: [
          { t: "Series Practitioner", u: "credentials.html#ladder" },
          { t: "Professional Operator", u: "credentials.html#ladder" },
          { t: "Master-Fellow", u: "credentials.html#ladder" },
          { t: "MetaX Contributor track", u: "credentials.html#ladder" }
        ]},
        { heading: "Learner Guide", links: [
          { t: "Submission Pack", u: "credentials.html#learner" },
          { t: "Dossier & Evidence templates", u: "credentials.html#learner" },
          { t: "The Proof Ladder", u: "credentials.html#learner" },
          { t: "AI Disclosure standard", u: "credentials.html#learner" }
        ]},
        { heading: "Verify", badge: "live", links: [
          { t: "Verify a Credential", u: "verify.html" },
          { t: "Reviewer Handbook", u: "credentials.html#reviewers" },
          { t: "Appeals", u: "credentials.html#reviewers" },
          { t: "Integrity Report", u: "credentials.html#reviewers" }
        ]}
      ]
    },
    {
      key: "library", label: "Library", href: "library.html",
      blurb: "The stack, the standards, the bilingual lexicon, and the academy news.",
      groups: [
        { heading: "Specs & Standards", links: [
          { t: "The Stack Explainer", u: "library.html#stack" },
          { t: "Symbol / Decay / Falsifiability", u: "library.html#standards" },
          { t: "Publishing Style Guide", u: "library.html#standards" },
          { t: "Master Course Generation Prompt", u: "library.html#standards" }
        ]},
        { heading: "Lexicon", links: [
          { t: "Bilingual Lexicon", u: "lexicon.html" },
          { t: "Root-indexed entries", u: "lexicon.html#entries" },
          { t: "Corrections Log", u: "library.html#logs" },
          { t: "Verification Log", u: "library.html#logs" }
        ]},
        { heading: "News", links: [
          { t: "All News", u: "news.html" },
          { t: "Announcements", u: "news.html?cat=announcements" },
          { t: "Curriculum", u: "news.html?cat=curriculum" },
          { t: "Research", u: "news.html?cat=research" },
          { t: "Field Notes", u: "news.html?cat=field-notes" }
        ]}
      ]
    },
    {
      key: "about", label: "About", href: "about.html",
      blurb: "The MetaX universe, its shared DNA, the curator, and the policies that govern it.",
      groups: [
        { heading: "The Universe", links: [
          { t: "What MetaX Is", u: "about-universe.html" },
          { t: "The Three Pillars", u: "about-universe.html#pillars" },
          { t: "The Shared DNA", u: "about-dna.html" },
          { t: "The Standard of Mastery", u: "about-mission.html" },
          { t: "What MetaX Is Not", u: "about-what-metax-is-not.html" }
        ]},
        { heading: "Charter & Principles", links: [
          { t: "The Charter (MX-000)", u: "charter.html" },
          { t: "Governance & Roles", u: "about-governance.html" },
          { t: "The Curator — Maher", u: "about-curator.html" },
          { t: "The Static Principle", u: "about-static.html" },
          { t: "How It Is Funded", u: "about-funding.html" }
        ]},
        { heading: "Legal & Contact", links: [
          { t: "Contact & Press", u: "contact.html" },
          { t: "Privacy", u: "privacy.html" },
          { t: "Terms", u: "terms.html" },
          { t: "Advertising Policy", u: "privacy.html#ads" }
        ]}
      ]
    }
  ];

  // Persistent utility bar (always visible): Start Here · Verify · Search · EN / ع
  var UTILITY = [
    { t: "Start Here", u: "start-here.html", cls: "util-start" },
    { t: "Verify", u: "verify.html", cls: "util-verify" }
  ];

  function badgeHtml(b) {
    if (!b) return "";
    var label = b.replace(/-/g, " ");
    return ' <span class="mm-badge mmb-' + b + '">' + label + '</span>';
  }

  function buildMega() {
    var active = navKeyFor(currentPage());
    var linksHtml = MENU.map(function (m) {
      var isActive = m.key === active ? " active" : "";
      if (!m.groups) {
        return '<div class="mm-item"><a class="mm-top' + isActive + '" href="' + m.href + '">' + m.label + '</a></div>';
      }
      var cols = m.groups.map(function (g) {
        return '<div class="mm-group"><h6>' + g.heading + badgeHtml(g.badge) + '</h6>' +
          g.links.map(function (l) { return '<a href="' + l.u + '">' + l.t + '</a>'; }).join("") +
          '</div>';
      }).join("");
      var intro = '<div class="mm-intro"><span class="mm-intro-label">' + m.label + badgeHtml(m.badge) +
        '</span><p>' + (m.blurb || "") + '</p><a class="mm-intro-cta" href="' + m.href + '">Open ' + m.label + ' →</a></div>';
      // Full-width panel: mm-panel-wrap constrains content to --maxw and centers it.
      var panel = '<div class="mm-panel"><div class="mm-panel-wrap"><div class="mm-panel-inner">' +
        intro + '<div class="mm-cols">' + cols + '</div>' +
        '</div></div></div>';
      return '<div class="mm-item has-panel">' +
        '<a class="mm-top' + isActive + '" href="' + m.href + '" aria-haspopup="true" aria-expanded="false">' + m.label +
        badgeHtml(m.badge) +
        ' <span class="mm-caret" aria-hidden="true">▾</span></a>' + panel +
        '</div>';
    }).join("");
    return linksHtml;
  }

  function injectChrome() {
    var nav = document.querySelector(".nav .nav-inner");
    if (!nav) return;

    // Replace .nav-links content with the mega-menu.
    var navLinks = nav.querySelector(".nav-links");
    if (navLinks) {
      navLinks.classList.add("mega");
      navLinks.innerHTML = buildMega();
    }

    // Build the persistent utility bar: Start Here · Verify · Search · EN / ع
    var cta = nav.querySelector(".nav-cta");
    var util = document.createElement("div");
    util.className = "nav-utility";
    var utilHtml = UTILITY.map(function (u) {
      return '<a class="util-link ' + (u.cls || "") + '" href="' + u.u + '">' + u.t + '</a>';
    }).join("");
    utilHtml += '<button class="nav-search-btn" id="searchOpen" aria-label="Search MetaX.Academy"><span aria-hidden="true">⌕</span><span class="nsb-label">Search</span><kbd>/</kbd></button>';
    utilHtml += '<button class="util-lang" id="langToggle" aria-label="Language" title="Language (bilingual EN / عربي)"><span class="ll-en">EN</span><span class="ll-sep">/</span><span class="ll-ar">ع</span></button>';
    util.innerHTML = utilHtml;
    if (cta) nav.insertBefore(util, cta);
    else nav.appendChild(util);

    // Rebuild mobile menu: grouped accordion from MENU + utility links.
    var mm = document.getElementById("mobileMenu");
    if (mm) {
      var active = navKeyFor(currentPage());
      var mmHtml = '<div class="mm-mobile-util">' +
        UTILITY.map(function (u) { return '<a href="' + u.u + '">' + u.t + '</a>'; }).join("") +
        '<button id="searchOpenM" type="button">⌕ Search</button>' +
        '<button id="langToggleM" type="button">EN / ع</button>' +
        '</div>';
      mmHtml += MENU.map(function (m) {
        var isActive = m.key === active ? " active" : "";
        if (!m.groups) return '<a class="mm-m-top' + isActive + '" href="' + m.href + '">' + m.label + '</a>';
        var sub = m.groups.map(function (g) {
          return g.links.map(function (l) { return '<a class="mm-m-sub" href="' + l.u + '">' + l.t + '</a>'; }).join("");
        }).join("");
        return '<div class="mm-m-group">' +
          '<button class="mm-m-toggle' + isActive + '" type="button" aria-expanded="false">' + m.label + badgeHtml(m.badge) + '<span class="mm-m-caret">▾</span></button>' +
          '<div class="mm-m-panel">' + sub + '</div></div>';
      }).join("");
      mm.innerHTML = mmHtml;
    }

    buildSearchModal();
    wireMega();
    wireMobileToggle();
    wireSearch();
  }

  /* ---------- Mobile menu open/close ----------
     The #navToggle button and #mobileMenu are created by components.js and
     REBUILT above in injectChrome(). Page-specific IIFEs (main.js, pages.js,
     verify.js, …) run at parse time — before components.js has created the
     header — so any getElementById("navToggle") they run finds null and never
     binds. This is the single correct place to wire it: it runs on boot(),
     after the header exists and after #mobileMenu has been populated. */
  function wireMobileToggle() {
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("mobileMenu");
    if (!toggle || !menu) return;
    if (toggle.dataset.wired) return;     // idempotent — never double-bind
    toggle.dataset.wired = "1";

    function setOpen(open) {
      menu.classList.toggle("open", open);
      toggle.classList.toggle("is-open", open);
      toggle.textContent = open ? "\u2715" : "\u2261";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      // Lock body scroll while the full-height panel is open (mobile UX).
      document.body.style.overflow = open ? "hidden" : "";
    }

    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      setOpen(!menu.classList.contains("open"));
    });

    // Close when any link inside the menu is tapped.
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    // Close on Escape and when tapping outside the menu.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) setOpen(false);
    });
    document.addEventListener("click", function (e) {
      if (!menu.classList.contains("open")) return;
      if (e.target.closest("#mobileMenu") || e.target.closest("#navToggle")) return;
      setOpen(false);
    });

    // If the viewport grows past the mobile breakpoint, force-close.
    window.matchMedia("(min-width: 1000px)").addEventListener("change", function (ev) {
      if (ev.matches) setOpen(false);
    });
  }

  /* ---------- Mega-menu interactions (hover on desktop, tap on touch) ----------
     Hover-intent with a close delay eliminates the "dead-zone" bug: moving the
     cursor from the top item toward the panel no longer instantly hides it. The
     full-width panel + CSS bridge keep :hover continuous; JS adds a grace timer
     as belt-and-braces and drives aria-expanded / the .open state. */
  function wireMega() {
    var items = document.querySelectorAll(".nav-links.mega .mm-item.has-panel");
    var closeTimer = null;
    function closeAll(except) {
      items.forEach(function (o) {
        if (o === except) return;
        o.classList.remove("open");
        var t = o.querySelector(".mm-top"); if (t) t.setAttribute("aria-expanded", "false");
      });
    }
    items.forEach(function (item) {
      var top = item.querySelector(".mm-top");
      top.addEventListener("click", function (e) {
        if (window.matchMedia("(hover: none)").matches) {
          e.preventDefault();
          var open = item.classList.toggle("open");
          top.setAttribute("aria-expanded", open ? "true" : "false");
          closeAll(item);
        }
      });
      // Desktop hover-intent: open immediately, close on a short grace delay.
      item.addEventListener("mouseenter", function () {
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
        item.classList.add("open");
        top.setAttribute("aria-expanded", "true");
        closeAll(item);
      });
      item.addEventListener("mouseleave", function () {
        if (closeTimer) clearTimeout(closeTimer);
        closeTimer = setTimeout(function () {
          item.classList.remove("open");
          top.setAttribute("aria-expanded", "false");
        }, 220);
      });
      // Keyboard: focus opens, blur-out closes.
      item.addEventListener("focusin", function () {
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
        item.classList.add("open"); top.setAttribute("aria-expanded", "true");
      });
      item.addEventListener("focusout", function (e) {
        if (!item.contains(e.relatedTarget)) {
          item.classList.remove("open"); top.setAttribute("aria-expanded", "false");
        }
      });
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".mm-item.has-panel")) closeAll(null);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll(null);
    });

    // Mobile accordion toggles + bilingual language note.
    document.querySelectorAll(".mm-m-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var grp = btn.closest(".mm-m-group");
        var open = grp.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
    var langNote = "Bilingual EN / عربي is on the roadmap — Branch D (Ascent), BCIA and the Lexicon ship Arabic-first with an hreflang pair. The shared lexicon collects the term sheet from every academy.";
    function wireLang(id) { var b = document.getElementById(id); if (b) b.addEventListener("click", function () { alert(langNote); }); }
    wireLang("langToggle"); wireLang("langToggleM");
  }

  /* ---------------------------------------------------------------
     4. Smart search — popup modal, live results, jump + highlight.
  --------------------------------------------------------------- */
  function buildSearchModal() {
    if (document.getElementById("searchModal")) return;
    var el = document.createElement("div");
    el.id = "searchModal";
    el.className = "search-modal";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Site search");
    el.innerHTML =
      '<div class="search-backdrop" data-close="1"></div>' +
      '<div class="search-box">' +
        '<div class="search-head">' +
          '<span class="search-ic" aria-hidden="true">⌕</span>' +
          '<input id="searchInput" type="search" autocomplete="off" placeholder="Search pages, series, programs, news…" aria-label="Search query" />' +
          '<button class="search-close" data-close="1" aria-label="Close search">✕</button>' +
        '</div>' +
        '<div class="search-results" id="searchResults"></div>' +
        '<div class="search-foot"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span></div>' +
      '</div>';
    document.body.appendChild(el);
  }

  var activeIdx = -1;
  var currentResults = [];

  function escapeHtml(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }

  function highlight(text, q) {
    if (!q) return escapeHtml(text);
    var safe = escapeHtml(text);
    var terms = q.split(/\s+/).filter(Boolean).map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); });
    if (!terms.length) return safe;
    var re = new RegExp("(" + terms.join("|") + ")", "ig");
    return safe.replace(re, '<mark>$1</mark>');
  }

  function runSearch(q) {
    var results = document.getElementById("searchResults");
    var query = q.trim().toLowerCase();
    if (!query) {
      results.innerHTML = '<div class="search-empty">Type to search across every page — pages, sections, series, programs and news.</div>';
      currentResults = []; activeIdx = -1; return;
    }
    var terms = query.split(/\s+/).filter(Boolean);
    var scored = SEARCH_INDEX.map(function (it) {
      var hay = (it.title + " " + it.cat + " " + it.text).toLowerCase();
      var score = 0;
      terms.forEach(function (t) {
        if (it.title.toLowerCase().indexOf(t) !== -1) score += 5;
        if (it.cat.toLowerCase().indexOf(t) !== -1) score += 2;
        if (hay.indexOf(t) !== -1) score += 1;
      });
      return { it: it, score: score };
    }).filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 12);

    currentResults = scored.map(function (r) { return r.it; });
    activeIdx = scored.length ? 0 : -1;

    if (!scored.length) {
      results.innerHTML = '<div class="search-empty">No matches for “' + escapeHtml(q) + '”.</div>';
      return;
    }
    results.innerHTML = scored.map(function (r, i) {
      var it = r.it;
      var url = it.url + (it.url.indexOf("?") === -1 && it.url.indexOf("#") === -1 ? "" : "") ;
      var sep = it.url.indexOf("#") === -1 && it.url.indexOf("?") === -1 ? "?q=" : (it.url.indexOf("?") === -1 ? "?q=" : "&q=");
      // add highlight query param so the target page can highlight the term
      var href = it.url + (it.url.indexOf("?") === -1 ? "?" : "&") + "hl=" + encodeURIComponent(q);
      return '<a class="search-result' + (i === activeIdx ? " active" : "") + '" href="' + href + '" data-i="' + i + '">' +
        '<span class="sr-cat">' + escapeHtml(it.cat) + '</span>' +
        '<span class="sr-title">' + highlight(it.title, q) + '</span>' +
        '<span class="sr-snippet">' + highlight(it.text.slice(0, 90), q) + '…</span>' +
      '</a>';
    }).join("");
  }

  function openSearch() {
    var modal = document.getElementById("searchModal");
    if (!modal) return;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    var input = document.getElementById("searchInput");
    input.value = "";
    runSearch("");
    setTimeout(function () { input.focus(); }, 30);
  }
  function closeSearch() {
    var modal = document.getElementById("searchModal");
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function wireSearch() {
    var openBtn = document.getElementById("searchOpen");
    var openBtnM = document.getElementById("searchOpenM");
    if (openBtn) openBtn.addEventListener("click", openSearch);
    if (openBtnM) openBtnM.addEventListener("click", function () {
      var mm = document.getElementById("mobileMenu"); if (mm) mm.classList.remove("open");
      openSearch();
    });

    var modal = document.getElementById("searchModal");
    var input = document.getElementById("searchInput");
    var results = document.getElementById("searchResults");

    input.addEventListener("input", function () { runSearch(input.value); });
    modal.addEventListener("click", function (e) { if (e.target.dataset.close) closeSearch(); });

    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); moveActive(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); moveActive(-1); }
      else if (e.key === "Enter") {
        var node = results.querySelector('.search-result[data-i="' + activeIdx + '"]');
        if (node) window.location.href = node.getAttribute("href");
      } else if (e.key === "Escape") { closeSearch(); }
    });

    results.addEventListener("mousemove", function (e) {
      var r = e.target.closest(".search-result"); if (!r) return;
      activeIdx = parseInt(r.dataset.i, 10); paintActive();
    });

    // Global shortcuts: "/" opens search, Esc closes.
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && !/^(input|textarea|select)$/i.test((e.target.tagName || "")) && !modal.classList.contains("open")) {
        e.preventDefault(); openSearch();
      } else if (e.key === "Escape" && modal.classList.contains("open")) {
        closeSearch();
      }
    });
  }

  function moveActive(dir) {
    if (!currentResults.length) return;
    activeIdx = (activeIdx + dir + currentResults.length) % currentResults.length;
    paintActive(true);
  }
  function paintActive(scroll) {
    var nodes = document.querySelectorAll(".search-result");
    nodes.forEach(function (n) {
      var on = parseInt(n.dataset.i, 10) === activeIdx;
      n.classList.toggle("active", on);
      if (on && scroll) n.scrollIntoView({ block: "nearest" });
    });
  }

  /* ---------------------------------------------------------------
     5. On-page highlight: if arriving with ?hl=term, highlight + scroll.
  --------------------------------------------------------------- */
  function applyIncomingHighlight() {
    var params = new URLSearchParams(location.search);
    var hl = params.get("hl");
    if (!hl) return;
    var terms = hl.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return;
    var re = new RegExp("(" + terms.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")", "ig");
    var root = document.querySelector("main") || document.body;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = node.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.nodeName.toLowerCase();
        if (tag === "script" || tag === "style" || tag === "mark" || p.closest(".search-modal")) return NodeFilter.FILTER_REJECT;
        return re.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var targets = [], n;
    while ((n = walker.nextNode())) targets.push(n);
    var first = null;
    targets.forEach(function (node) {
      var span = document.createElement("span");
      span.innerHTML = escapeHtml(node.nodeValue).replace(re, '<mark class="hl-live">$1</mark>');
      node.parentNode.replaceChild(span, node);
      if (!first) first = span.querySelector("mark");
    });
    if (first) setTimeout(function () { first.scrollIntoView({ behavior: "smooth", block: "center" }); }, 300);
  }

  /* ---------- Ad slot hygiene now lives in js/ads.js (single source). ---------- */

  /* ---------- Boot ---------- */
  function boot() {
    extendIndexFromData();
    injectChrome();
    applyIncomingHighlight();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
