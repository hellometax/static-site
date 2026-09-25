/* =====================================================================
   MetaX.Academy — Shared chrome (header · mega-menu · mobile menu ·
   utility bar · search modal · footer · demo strip)
   MX-NAV-SPEC v2026.10.1 · root-absolute paths · reads window.MX_ROUTES.

   Load order on every page:
     routes.js  ->  chrome.js  ->  (hub.js | md-page.js)
   ===================================================================== */
(function () {
  "use strict";

  var R = window.MX_ROUTES;
  if (!R) { if (window.console) console.error("chrome.js: MX_ROUTES missing"); return; }
  var MENU = R.MENU, UTILITY = R.UTILITY;
  var CFG = window.SITE_PAGE || {};
  var VER = CFG.ver || "MetaX · v2026.10";

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function badge(b) {
    if (!b) return "";
    return ' <span class="mm-badge mmb-' + b + '">' + b.replace(/-/g, " ") + "</span>";
  }

  /* ---------------- HEADER ---------------- */
  /* Active-state cascade (three levels) comes from R.activeTrail():
       level 1  pillar tab            .mm-top.active            aria-current="true"|"page"
       level 2  group heading (hub)   .mm-hub.is-current        aria-current="true"|"page"
       level 3  exact leaf link       a.is-current              aria-current="page"
     Exactly one element per menu instance carries aria-current="page" (the
     link whose URL IS this page); the ancestors carry aria-current="true".
     Visual treatment is never colour alone: weight + a left rule / underline. */
  var TRAIL = R.activeTrail ? R.activeTrail() : { pillar: R.navKeyFor(), group: null, leaf: null, current: null };
  var _uid = 0;
  function uid(p) { _uid += 1; return p + "-" + _uid; }

  function curAttr(url, onTrail) {
    if (TRAIL.current && url === TRAIL.current) return ' aria-current="page"';
    return onTrail ? ' aria-current="true"' : "";
  }
  function leafHTML(l, cls) {
    var on = TRAIL.leaf && l.u === TRAIL.leaf;
    return '<a class="' + cls + (on ? " is-current" : "") + '" href="' + l.u + '"' + curAttr(l.u, on) +
      (l.ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(l.t) +
      (l.ext ? '<span class="sr-only"> (opens in a new tab)</span>' : "") + "</a>";
  }
  function groupHTML(g) {
    var on = !!(g.hub && TRAIL.group === g.hub);
    var head = g.hub
      ? '<h6><a class="mm-hub' + (on ? " is-current" : "") + '" href="' + g.hub + '"' + curAttr(g.hub, on) + ">" + esc(g.heading) + "</a>" + badge(g.badge) + "</h6>"
      : "<h6>" + esc(g.heading) + badge(g.badge) + "</h6>";
    return '<div class="mm-group' + (on ? " is-current" : "") + '">' + head + g.links.map(function (l) { return leafHTML(l, "mm-leaf"); }).join("") + "</div>";
  }
  /* The panel body (intro + group columns) — shared by the primary bar and the
     "More" drawer so both get identical structure and active-state logic. */
  function panelBody(m) {
    var on = TRAIL.pillar === m.key;
    var intro = '<div class="mm-intro"><span class="mm-intro-label">' + esc(m.label) + badge(m.badge) +
      "</span><p>" + esc(m.blurb || "") + '</p><a class="mm-intro-cta' + (on && TRAIL.current === m.href ? " is-current" : "") +
      '" href="' + m.href + '"' + curAttr(m.href, false) + ">Open " + esc(m.label) + " hub \u2192</a></div>";
    return intro + '<div class="mm-cols">' + (m.groups || []).map(groupHTML).join("") + "</div>";
  }

  function headerHTML() {
    var mega = MENU.map(function (m) {
      var on = TRAIL.pillar === m.key;
      var pid = "mm-panel-" + m.key;
      var prio = (R.NAV_PRIORITY || []).indexOf(m.key);
      /* The trigger is a <button> (opens the panel); the pillar hub itself is
         the first link inside the panel ("Open X hub"). A link that both
         navigates and opens a panel is unreachable for keyboard users — Enter
         navigates away before the panel can be used (verified in the audit). */
      return '<div class="mm-item has-panel" data-key="' + m.key + '" data-prio="' + (prio < 0 ? 99 : prio) + '">' +
        '<button type="button" class="mm-top' + (on ? " active" : "") + '" aria-expanded="false" aria-controls="' + pid + '"' +
        (on ? ' aria-current="true"' : "") + ">" + esc(m.label) + badge(m.badge) +
        ' <span class="mm-caret" aria-hidden="true">\u25be</span></button>' +
        '<div class="mm-panel" id="' + pid + '" role="region" aria-label="' + esc(m.label) + '"><div class="mm-panel-wrap"><div class="mm-panel-inner">' +
        panelBody(m) + "</div></div></div></div>";
    }).join("");

    /* "More" — holds every pillar folded out of the bar. All nine pillars are
       rendered into the drawer; CSS/JS shows only the folded ones, so the
       drawer never needs re-rendering on resize. */
    var drawer = MENU.map(function (m) {
      var on = TRAIL.pillar === m.key;
      return '<section class="mm-more-pillar" data-key="' + m.key + '" hidden>' +
        '<h5 class="mm-more-label' + (on ? " is-current" : "") + '">' + esc(m.label) + badge(m.badge) + "</h5>" +
        '<div class="mm-panel-inner mm-more-inner">' + panelBody(m) + "</div></section>";
    }).join("");
    var more = '<div class="mm-more" hidden>' +
      '<button type="button" class="mm-top mm-more-top" aria-expanded="false" aria-controls="mmMoreDrawer" aria-haspopup="dialog">More ' +
      '<span class="mm-caret" aria-hidden="true">\u25be</span></button></div>';

    var util = UTILITY.map(function (u) {
      return '<a class="util-link ' + (u.cls || "") + '" href="' + u.u + '"' + (u.ext ? ' target="_blank" rel="noopener"' : "") +
        ' aria-label="' + esc(u.t) + (u.ext ? " (opens in a new tab)" : "") + '"' + (TRAIL.path === u.u ? ' aria-current="page"' : "") +
        '><span aria-hidden="true">' + (u.glyph || "") + '</span> <span class="ul-word">' + esc(u.t) + "</span></a>";
    }).join("");
    util += '<button type="button" class="nav-search-btn" id="searchOpen" aria-label="Search MetaX.Academy" aria-haspopup="dialog" aria-controls="searchModal">' +
      '<span aria-hidden="true">\u2315</span><span class="ul-word nsb-label">Search</span><kbd aria-hidden="true">/</kbd></button>';

    var mobile = '<div class="mm-mobile-util">' +
      UTILITY.map(function (u) { return '<a href="' + u.u + '"' + (u.ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(u.t) + "</a>"; }).join("") +
      '<button id="searchOpenM" type="button" aria-haspopup="dialog" aria-controls="searchModal">\u2315 Search</button></div>';
    mobile += MENU.map(function (m) {
      var on = TRAIL.pillar === m.key;
      var pid = uid("mm-m-panel");
      var sub = '<a class="mm-m-hub mm-m-pillar' + (TRAIL.current === m.href ? " is-current" : "") + '" href="' + m.href + '"' + curAttr(m.href, false) +
        ">" + esc(m.label) + " hub \u203a</a>";
      sub += (m.groups || []).map(function (g) {
        var gon = !!(g.hub && TRAIL.group === g.hub);
        var h = g.hub ? '<a class="mm-m-hub' + (gon ? " is-current" : "") + '" href="' + g.hub + '"' + curAttr(g.hub, gon) + ">" + esc(g.heading) + " \u203a</a>" : "";
        return '<div class="mm-m-sec' + (gon ? " is-current" : "") + '">' + h + g.links.map(function (l) { return leafHTML(l, "mm-m-sub"); }).join("") + "</div>";
      }).join("");
      /* The pillar you are in starts expanded so the current page is visible. */
      return '<div class="mm-m-group' + (on ? " open" : "") + '"><button class="mm-m-toggle' + (on ? " active" : "") + '" type="button" aria-expanded="' + (on ? "true" : "false") +
        '" aria-controls="' + pid + '"' + (on ? ' aria-current="true"' : "") + ">" + esc(m.label) + badge(m.badge) + '<span class="mm-m-caret" aria-hidden="true">\u25be</span></button>' +
        '<div class="mm-m-panel" id="' + pid + '"' + (on ? "" : " hidden") + ">" + sub + "</div></div>";
    }).join("");

    return '<a class="skip-link" href="#main-content">Skip to content</a>' +
      '<header class="nav">' +
      '<div class="wrap nav-inner">' +
        '<a href="/" class="brand" aria-label="MetaX Academy home"' + (TRAIL.path === "/" ? ' aria-current="page"' : "") + ">" +
          '<span class="mark" aria-hidden="true">\u2726</span>' +
          '<span class="name"><span class="brand-title"><b>MetaX</b>.Academy</span>' +
          '<span class="ver">' + esc(VER) + "</span></span></a>" +
        '<nav class="nav-links mega" aria-label="Primary">' + mega + more + "</nav>" +
        '<div class="nav-utility">' + util + "</div>" +
        '<button class="nav-toggle" id="navToggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">\u2261</button>' +
      "</div>" +
      '<nav class="mobile-menu" id="mobileMenu" aria-label="Primary (mobile)" hidden>' + mobile + "</nav>" +
      '<div class="mm-more-drawer" id="mmMoreDrawer" role="dialog" aria-modal="false" aria-label="More pillars" hidden>' +
        '<div class="mm-more-head"><span>More pillars</span><button type="button" class="mm-more-close" aria-label="Close more pillars">\u2715</button></div>' +
        drawer + "</div>" +
    "</header>";
  }

  /* ---------------- DEMO STRIP (§6.4) ---------------- */
  function demoHTML() {
    var path = location.pathname;
    var forced = /^\/(license|about\/status|metax\/bcia)/.test(path.replace(/^\/ar/, ""));
    if (!forced && sessionStorage.getItem("mx-demo-dismiss") === "1") return "";
    return '<div class="mx-demo" role="note">' +
      "<strong>Demo build.</strong> This estate is under construction. Counts, catalogues and statuses render " +
      "from dated data files; prose marked <em>scaffold</em> has not been reviewed. " +
      '<a href="/about/universe/demo-notice/">What is real and what is not \u2192</a>' +
      (forced ? "" : '<button class="mx-demo-x" type="button" aria-label="Dismiss for this session">\u2715</button>') +
      "</div>";
  }

  /* ---------------- FOOTER (§8.1) ---------------- */
  function footerHTML() {
    var y = new Date().getFullYear();
    function col(title, links) {
      return '<div class="foot-col"><h5>' + title + "</h5>" +
        links.map(function (l) { return '<a href="' + l[1] + '">' + esc(l[0]) + "</a>"; }).join("") + "</div>";
    }
    return '<footer class="footer"><div class="wrap footer-grid">' +
      '<div class="foot-col foot-brand"><a href="/" class="brand"><span class="mark">\u2726</span>' +
        '<span class="name"><b>MetaX</b>.Academy</span></a>' +
        "<p>One estate, nine pillars, one standard of mastery: every substantive claim carries what a stranger " +
        "needs to find out it is wrong. Curated by Maher.</p></div>" +
      col("Pillars", [["TopTech","/toptech/"],["Method","/method/"],["Ascent","/ascent/"],["Meta-X","/metax/"],["Academies","/academies/"],["Credentials","/credentials/"]]) +
      col("Explore", [["Placement Diagnostic","/toptech/start/diagnostic/"],["Full Catalog","/toptech/catalog/"],["Verify a Credential","/credentials/verify/lookup/"],["Lexicon","/library/lexicon/"],["News","/library/news/"],["Search","/search/"]]) +
      col("Governance", [["ML-2.3","/license/ml-2-3/"],["The 25 Harms","/license/harms/"],["Part H Statement","/license/statement/ours/"],["Estate Status","/about/status/"],["Defect Log","/about/status/defects/"],["Accessibility","/about/policy/accessibility/"]]) +
      col("Estate", [["About","/about/"],["Demo Notice","/about/universe/demo-notice/"],["Pricing","/about/access/pricing/"],["Contact","/about/legal/contact/"],["Privacy","/about/legal/privacy/"],["Terms","/about/legal/terms/"],["Sitemap","/search/"]]) +
      "</div>" +
      '<div class="wrap foot-bottom">' +
        "<span>\u00a9 " + y + " MetaX.Academy \u00b7 Curated by Maher</span>" +
        "<span>" + esc(VER) + "</span>" +
        '<span class="glyphs" aria-hidden="true">\u2726 \u2b21 \u25c9 \u22a2 \u2192</span>' +
      "</div></footer>";
  }

  /* ---------------- SEARCH MODAL ---------------- */
  var _index = null, _loading = false;
  function loadIndex(cb) {
    if (_index) { cb(_index); return; }
    if (_loading) { setTimeout(function () { loadIndex(cb); }, 120); return; }
    _loading = true;
    // Prefer a generated JSON; fall back to routes.js flatten so search never breaks.
    fetch("/data/search-index.json").then(function (r) {
      if (!r.ok) throw new Error("no index");
      return r.json();
    }).then(function (j) {
      /* The JSON index lists hubs + a few leaves; merge every MX_ROUTES entry
         so no menu route is unsearchable (JSON entries win on duplicates). */
      var seen = {}; j.forEach(function (r) { seen[r.url] = 1; });
      _index = j.concat(R.allRoutes().filter(function (r) { return !seen[r.url]; }));
      cb(_index);
    })
      .catch(function () { _index = R.allRoutes(); cb(_index); });
  }
  function searchModalHTML() {
    return '<div class="search-modal" id="searchModal" aria-hidden="true">' +
      '<div class="search-backdrop" data-close="1"></div>' +
      '<div class="search-box" role="dialog" aria-modal="true" aria-label="Search">' +
        '<div class="search-top"><span aria-hidden="true">\u2315</span>' +
        '<input type="search" id="searchInput" placeholder="Search 321 routes\u2026 (title, pillar, section)" autocomplete="off">' +
        '<button id="searchClose" aria-label="Close search">\u2715</button></div>' +
        '<div class="search-results" id="searchResults"></div>' +
        '<div class="search-foot">Type to filter \u00b7 <a href="/search/">Browse all routes \u2192</a></div>' +
      "</div></div>";
  }
  function wireSearch() {
    var modal = document.getElementById("searchModal");
    var opener = null;
    var input = document.getElementById("searchInput");
    var res = document.getElementById("searchResults");
    if (!modal) return;
    function open() {
      opener = document.activeElement;
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      loadIndex(function () { render(""); });
      setTimeout(function () { input && input.focus(); }, 30);
    }
    function close() {
      modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = "";
      if (opener && opener.focus) opener.focus();          // focus returns to the trigger
      opener = null;
    }
    function render(q) {
      if (!_index) { res.innerHTML = '<p class="search-empty">Loading index\u2026</p>'; return; }
      q = (q || "").trim().toLowerCase();
      var rows = _index;
      if (q) {
        rows = _index.filter(function (r) {
          return (r.title + " " + (r.cat || "") + " " + (r.group || "") + " " + (r.blurb || "")).toLowerCase().indexOf(q) > -1;
        });
      }
      rows = rows.slice(0, 40);
      if (!rows.length) { res.innerHTML = '<p class="search-empty">No routes match \u201c' + esc(q) + "\u201d.</p>"; return; }
      res.innerHTML = rows.map(function (r) {
        return '<a class="search-hit" href="' + r.url + '"><span class="sh-cat">' + esc(r.cat || "") + "</span>" +
          '<span class="sh-title">' + esc(r.title) + '</span><span class="sh-url">' + esc(r.url) + "</span></a>";
      }).join("");
    }
    ["searchOpen", "searchOpenM"].forEach(function (id) {
      var b = document.getElementById(id); if (b) b.addEventListener("click", open);
    });
    var c = document.getElementById("searchClose"); if (c) c.addEventListener("click", close);
    modal.addEventListener("click", function (e) { if (e.target.dataset.close) close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && modal.getAttribute("aria-hidden") === "true" &&
          !/input|textarea|select/i.test((e.target.tagName || ""))) { e.preventDefault(); open(); }
      if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") close();
    });
    if (input) input.addEventListener("input", function () { render(input.value); });
  }

  /* ---------------- Interactions ---------------- */
  var DESKTOP_MQ = "(min-width: 1180px)";
  function isDesktop() { return !window.matchMedia || window.matchMedia(DESKTOP_MQ).matches; }
  function setHidden(el, hide) { if (!el) return; if (hide) el.setAttribute("hidden", ""); else el.removeAttribute("hidden"); }

  function wireMobileToggle() {
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("mobileMenu");
    if (!toggle || !menu || toggle.dataset.wired) return;
    toggle.dataset.wired = "1";
    function setOpen(open, restoreFocus) {
      menu.classList.toggle("open", open);
      setHidden(menu, !open);
      toggle.classList.toggle("is-open", open);
      toggle.textContent = open ? "\u2715" : "\u2261";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
      if (open) {
        var cur = menu.querySelector('.mm-m-panel:not([hidden]) [aria-current="page"]');
        if (cur) menu.scrollTop = Math.max(0, cur.offsetTop - menu.clientHeight / 2);
      }
      if (!open && restoreFocus) toggle.focus();
    }
    toggle.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); setOpen(!menu.classList.contains("open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    /* Single-open accordion: opening a pillar closes the others, so the user
       never has to close one by hand and the list stays short on small phones. */
    var groups = menu.querySelectorAll(".mm-m-group");
    function setGroup(g, open) {
      g.classList.toggle("open", open);
      g.querySelector(".mm-m-toggle").setAttribute("aria-expanded", open ? "true" : "false");
      setHidden(g.querySelector(".mm-m-panel"), !open);
    }
    groups.forEach(function (g) {
      var btn = g.querySelector(".mm-m-toggle");
      btn.addEventListener("click", function () {
        var open = !g.classList.contains("open");
        groups.forEach(function (o) { if (o !== g) setGroup(o, false); });
        setGroup(g, open);
        if (open) menu.scrollTop = Math.max(0, g.offsetTop - 8);
      });
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("open")) setOpen(false, true); });
    document.addEventListener("click", function (e) {
      if (!menu.classList.contains("open")) return;
      if (e.target.closest("#mobileMenu") || e.target.closest("#navToggle")) return;
      setOpen(false);
    });
    if (window.matchMedia) window.matchMedia(DESKTOP_MQ).addEventListener("change", function (ev) { if (ev.matches) setOpen(false); });
  }

  /* Desktop mega-menu.
     Pointer (hover+fine): hover opens, 160ms grace on leave.
     Touch/pen: tap toggles.
     Keyboard:
       Tab onto a pillar button          -> panel opens on focus
       Enter / Space / ArrowDown         -> open + focus first link in panel
       Tab past the last link            -> panel closes (focusout)
       ArrowLeft / ArrowRight on a tab   -> previous / next tab
       Escape inside an open item        -> close, focus returns to trigger
     aria-expanded is written only in setItem(), and CSS opens panels only via
     .open (never :hover), so ARIA state and visual state cannot drift.        */
  function wireMega() {
    var nav = document.querySelector(".nav-links.mega");
    if (!nav) return;
    var items = Array.prototype.slice.call(nav.querySelectorAll(".mm-item.has-panel"));
    var hoverCapable = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var timer = null, suppressFocusOpen = null;
    var moreWrap = nav.querySelector(".mm-more");
    var moreBtn = moreWrap && moreWrap.querySelector(".mm-more-top");
    var drawer = document.getElementById("mmMoreDrawer");

    function setItem(item, open) {
      item.classList.toggle("open", open);
      var t = item.querySelector(".mm-top"); if (t) t.setAttribute("aria-expanded", open ? "true" : "false");
    }
    function closeAll(except) { items.forEach(function (o) { if (o !== except) setItem(o, false); }); }
    function openOnly(item) { if (timer) { clearTimeout(timer); timer = null; } closeAll(item); setItem(item, true); }
    function visibleTops() {
      var t = items.filter(function (i) { return !i.hidden; }).map(function (i) { return i.querySelector(".mm-top"); });
      if (moreWrap && !moreWrap.hidden) t.push(moreBtn);
      return t;
    }
    function arrowNav(e, from) {
      var tops = visibleTops(), i = tops.indexOf(from);
      if (i < 0) return false;
      if (e.key === "ArrowRight") { e.preventDefault(); tops[(i + 1) % tops.length].focus(); return true; }
      if (e.key === "ArrowLeft") { e.preventDefault(); tops[(i - 1 + tops.length) % tops.length].focus(); return true; }
      return false;
    }

    items.forEach(function (item) {
      var top = item.querySelector(".mm-top");
      var panel = item.querySelector(".mm-panel");
      if (hoverCapable) {
        item.addEventListener("mouseenter", function () { openOnly(item); closeMore(); });
        item.addEventListener("mouseleave", function () {
          if (item.contains(document.activeElement)) return;   // keyboard focus keeps it open
          timer = setTimeout(function () { setItem(item, false); }, 160);
        });
      }
      top.addEventListener("click", function (e) {
        e.preventDefault();
        if (item.classList.contains("open")) setItem(item, false); else { openOnly(item); closeMore(); }
      });
      top.addEventListener("focus", function () {
        if (suppressFocusOpen === top) { suppressFocusOpen = null; return; }
        openOnly(item); closeMore();
      });
      top.addEventListener("keydown", function (e) {
        if (arrowNav(e, top)) return;
        /* Tab on a trigger moves to the NEXT trigger (the panel opened on focus
           is a preview). Enter / Space / ArrowDown enter the panel. Without this,
           reaching the 2nd pillar took 36 Tab presses through TopTech's links. */
        if (e.key === "Tab" && !e.shiftKey) {
          var tops = visibleTops(), i = tops.indexOf(top);
          var next = tops[i + 1] || document.querySelector(".nav-utility a, .nav-utility button");
          if (next) { e.preventDefault(); setItem(item, false); next.focus(); }
          return;
        }
        if (e.key === "ArrowDown" || ((e.key === "Enter" || e.key === " ") && item.classList.contains("open"))) {
          e.preventDefault(); openOnly(item);
          var first = panel.querySelector("a[href]"); if (first) first.focus();
        }
      });
      item.addEventListener("keydown", function (e) {
        if (e.key !== "Escape" || !item.classList.contains("open")) return;
        e.preventDefault(); e.stopPropagation();
        setItem(item, false);
        if (document.activeElement !== top) { suppressFocusOpen = top; top.focus({ preventScroll: true }); }
      });
      item.addEventListener("focusout", function (e) {
        if (!e.relatedTarget || !item.contains(e.relatedTarget)) setItem(item, false);
      });
    });
    document.addEventListener("click", function (e) { if (!e.target.closest(".nav-links.mega")) closeAll(null); });

    /* ---------- "More" overflow drawer ---------- */
    function closeMore(restore) {
      if (!drawer || drawer.hidden) return;
      setHidden(drawer, true); moreBtn.setAttribute("aria-expanded", "false"); moreWrap.classList.remove("open");
      if (restore) moreBtn.focus({ preventScroll: true });
    }
    function openMore(focusFirst) {
      closeAll(null);
      setHidden(drawer, false); moreBtn.setAttribute("aria-expanded", "true"); moreWrap.classList.add("open");
      if (focusFirst) {
        var f = drawer.querySelector('.mm-more-pillar:not([hidden]) [aria-current="page"]') || drawer.querySelector(".mm-more-pillar:not([hidden]) a[href]");
        if (f) f.focus();
      }
    }
    if (moreBtn && drawer) {
      moreBtn.addEventListener("click", function (e) { e.preventDefault(); if (drawer.hidden) openMore(false); else closeMore(); });
      moreBtn.addEventListener("focus", function () { closeAll(null); });
      moreBtn.addEventListener("keydown", function (e) {
        if (arrowNav(e, moreBtn)) return;
        if (e.key === "ArrowDown" || ((e.key === "Enter" || e.key === " ") && !drawer.hidden)) { e.preventDefault(); openMore(true); }
      });
      drawer.querySelector(".mm-more-close").addEventListener("click", function () { closeMore(true); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !drawer.hidden) { e.preventDefault(); closeMore(true); } });
      document.addEventListener("click", function (e) { if (!drawer.hidden && !e.target.closest("#mmMoreDrawer") && !e.target.closest(".mm-more")) closeMore(); });
      drawer.addEventListener("focusout", function (e) { if (e.relatedTarget && !drawer.contains(e.relatedTarget) && e.relatedTarget !== moreBtn) closeMore(); });
    }

    /* Fold pillars into "More" until the header fits. Measured, not guessed:
       lay out with every tab visible, then fold the lowest-priority tab
       (MX_ROUTES.NAV_PRIORITY, from the end) one at a time while the header
       row is wider than its box. The current pillar folds last, so the level-1
       active state stays visible in the bar whenever possible.               */
    var inner = document.querySelector(".nav-inner");
    function fit() {
      if (!moreWrap || !inner) return;
      items.forEach(function (i) { i.hidden = false; });
      setHidden(moreWrap, true);
      if (drawer) drawer.querySelectorAll(".mm-more-pillar").forEach(function (s) { s.hidden = true; });
      nav.removeAttribute("data-folded");
      moreBtn.classList.remove("active"); moreBtn.removeAttribute("aria-current");
      if (!isDesktop()) { closeMore(); return; }
      /* Overflow anywhere in the row: the row itself, or the flexible mega
         box (min-width:0 lets it shrink below its content and clip tabs). */
      function overflows() { return inner.scrollWidth > inner.clientWidth + 1 || nav.scrollWidth > nav.clientWidth + 1; }
      if (!overflows()) { closeMore(); return; }
      setHidden(moreWrap, false);
      var order = items.slice().sort(function (a, b) {
        var ca = a.dataset.key === TRAIL.pillar ? 1 : 0, cb = b.dataset.key === TRAIL.pillar ? 1 : 0;
        if (ca !== cb) return ca - cb;
        return (+b.dataset.prio) - (+a.dataset.prio);
      });
      var folded = [];
      for (var k = 0; k < order.length && overflows(); k++) { setItem(order[k], false); order[k].hidden = true; folded.push(order[k].dataset.key); }
      var foldedActive = false;
      drawer.querySelectorAll(".mm-more-pillar").forEach(function (s) {
        var f = folded.indexOf(s.dataset.key) > -1; s.hidden = !f;
        if (f && s.dataset.key === TRAIL.pillar) foldedActive = true;
      });
      moreBtn.classList.toggle("active", foldedActive);
      if (foldedActive) moreBtn.setAttribute("aria-current", "true");
      nav.setAttribute("data-folded", folded.join(","));
    }
    fit();
    var rq = null;
    window.addEventListener("resize", function () { if (rq) cancelAnimationFrame(rq); rq = requestAnimationFrame(fit); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);   // web-font swap changes tab widths
    window.__navFit = fit;
  }

  function wireDemo() {
    var x = document.querySelector(".mx-demo-x");
    if (x) x.addEventListener("click", function () {
      sessionStorage.setItem("mx-demo-dismiss", "1");
      var strip = x.closest(".mx-demo"); if (strip) strip.remove();
    });
  }

  /* Skip-link target: the first <main> on the page. */
  function wireSkip() {
    var main = document.querySelector("main");
    if (main && !document.getElementById("main-content")) {
      var a = document.createElement("span"); a.id = "main-content"; a.tabIndex = -1;
      main.parentNode.insertBefore(a, main);
    }
  }

  function render() {
    var h = document.getElementById("site-header");
    if (h) h.outerHTML = headerHTML();
    var hdr = document.querySelector("header.nav");
    if (hdr) { var d = document.createElement("div"); d.innerHTML = demoHTML(); if (d.firstChild) hdr.insertAdjacentElement("afterend", d.firstChild); }
    var f = document.getElementById("site-footer");
    if (f) f.outerHTML = footerHTML();
    if (!document.getElementById("searchModal")) {
      var s = document.createElement("div"); s.innerHTML = searchModalHTML(); document.body.appendChild(s.firstChild);
    }
    wireSkip(); wireMobileToggle(); wireMega(); wireSearch(); wireDemo();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();

  window.__chrome = { render: render };
})();
