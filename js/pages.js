/* =====================================================================
   MetaX.Academy — Shared renderer for the mega-menu pages
   Renders data-driven sections on: start-here, ascent, bcia, bcia-status,
   academies, credentials, library, lexicon. Also wires the mobile toggle,
   scroll-reveal, and image-slot hydration (these pages do NOT load main.js).
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- helpers ---------- */
  function imgSlot(src, index, mark) {
    return (
      '<span class="img-slot" data-index="' + index + '">' +
        '<span class="img-tag">' + index + '</span>' +
        '<span class="img-mark">' + (mark || "\u2726") + '</span>' +
        '<img alt="" loading="lazy" data-src="' + src + '" />' +
      '</span>'
    );
  }
  function hydrate(root) {
    (root || document).querySelectorAll(".img-slot img[data-src]").forEach(function (img) {
      if (img.dataset.bound) return;
      img.dataset.bound = "1";
      var slot = img.closest(".img-slot");
      img.addEventListener("load", function () {
        if (img.naturalWidth > 1) { img.classList.add("loaded"); slot.classList.add("has-img"); }
      });
      img.src = img.dataset.src;
    });
  }
  function badge(status) {
    if (!status) return "";
    return ' <span class="mm-badge mmb-' + status + '">' + status.replace(/-/g, " ") + '</span>';
  }
  function el(id) { return document.getElementById(id); }

  /* ---------- generic card renderers reused across pages ---------- */
  function seriesCards(list, hrefBase) {
    return list.map(function (s) {
      var href = hrefBase ? (hrefBase + s.n) : null;
      var link = href ? '<a class="card-link stretch" href="' + href + '">Read more <span class="arw">\u2192</span></a>' : "";
      var num = s.n;
      return (
        '<article class="series-card" tabindex="0">' +
          imgSlot("img/cards/" + (s.imgIndex || num).toLowerCase() + ".jpg", s.imgIndex || num, s.icon) +
          '<div class="sc-top">' +
            '<span class="sc-icon">' + (s.icon || "\u2726") + '</span>' +
            '<span class="sc-num">' + num + '</span>' +
          '</div>' +
          '<h3>' + s.title + badge(s.status) + '</h3>' +
          '<div class="sc-sub">' + (s.sub || "") + '</div>' +
          '<p class="sc-territory">' + (s.territory || "") + '</p>' +
          '<div class="sc-foot"><span class="sc-tier">' + (s.tier || "") + '</span></div>' +
          link +
        '</article>'
      );
    }).join("");
  }
  function levelList(list) {
    return list.map(function (l) {
      return (
        '<div class="level">' +
          '<span class="lv-badge">' + l.lvl + '</span>' +
          '<div><h4>' + l.name + '</h4><p>' + l.desc + '</p></div>' +
        '</div>'
      );
    }).join("");
  }
  function stepCards(list) {
    return list.map(function (s) {
      return '<article class="step-card"><h4>' + s.step + '</h4><p>' + s.desc + '</p></article>';
    }).join("");
  }

  /* ================= START HERE ================= */
  if (el("diagGrid") && typeof DIAGNOSTIC !== "undefined") {
    el("diagGrid").innerHTML = DIAGNOSTIC.map(function (d) {
      return (
        '<a class="feature" href="' + d.to + '" style="text-decoration:none;color:inherit;display:block">' +
          '<span class="f-glyph">' + d.glyph + '</span>' +
          '<h3>' + d.q + '</h3>' +
          '<p style="margin-bottom:12px">' + d.note + '</p>' +
          '<span class="sc-tier" style="display:inline-block;padding:4px 10px;border:1px solid var(--line);border-radius:100px;font-family:var(--font);font-size:0.72rem;color:var(--muted)">' + d.label + '</span>' +
          badge(d.badge) +
        '</a>'
      );
    }).join("");
  }

  /* ================= ASCENT ================= */
  if (el("rungGrid") && typeof ASCENT_RUNGS !== "undefined") {
    el("rungGrid").innerHTML = seriesCards(ASCENT_RUNGS, null);
    hydrate(el("rungGrid"));
  }
  if (el("pathList") && typeof ASCENT_PATHS !== "undefined") {
    el("pathList").innerHTML = levelList(ASCENT_PATHS);
  }

  /* ================= BCIA ================= */
  if (el("bciaSeries") && typeof BCIA_SERIES !== "undefined") {
    el("bciaSeries").innerHTML = seriesCards(BCIA_SERIES, null);
    hydrate(el("bciaSeries"));
  }
  if (el("bciaRoadmap") && typeof BCIA_ROADMAP !== "undefined") {
    el("bciaRoadmap").innerHTML = stepCards(BCIA_ROADMAP);
  }

  /* ================= BCIA STATUS ================= */
  if (el("auditList") && typeof BCIA_AUDIT !== "undefined") {
    el("auditList").innerHTML = levelList(BCIA_AUDIT);
  }
  if (el("protocolSteps") && typeof BCIA_PROTOCOL !== "undefined") {
    el("protocolSteps").innerHTML = stepCards(BCIA_PROTOCOL);
  }

  /* ================= ACADEMIES ================= */
  if (el("levelList") && typeof ACADEMY_LEVELS !== "undefined") {
    el("levelList").innerHTML = levelList(ACADEMY_LEVELS);
  }
  if (el("pathSteps") && typeof ACADEMY_PATH_STEPS !== "undefined") {
    el("pathSteps").innerHTML = stepCards(ACADEMY_PATH_STEPS);
  }
  if (el("reqGrid") && typeof ACADEMY_REQUIREMENTS !== "undefined") {
    el("reqGrid").innerHTML = seriesCards(ACADEMY_REQUIREMENTS, null);
    hydrate(el("reqGrid"));
  }

  /* ================= CREDENTIALS ================= */
  if (el("credLadder") && typeof CRED_LADDER !== "undefined") {
    el("credLadder").innerHTML = levelList(CRED_LADDER);
  }
  if (el("learnerSteps") && typeof CRED_LEARNER !== "undefined") {
    el("learnerSteps").innerHTML = stepCards(CRED_LEARNER);
  }

  /* ================= LIBRARY ================= */
  if (el("standardGrid") && typeof LIBRARY_STANDARDS !== "undefined") {
    el("standardGrid").innerHTML = seriesCards(LIBRARY_STANDARDS, null);
    hydrate(el("standardGrid"));
  }

  /* ================= LEXICON ================= */
  if (el("lexGrid") && typeof LEXICON !== "undefined") {
    function renderLex(q) {
      var query = (q || "").trim().toLowerCase();
      var list = !query ? LEXICON : LEXICON.filter(function (t) {
        return (t.en + " " + t.gloss + " " + (t.root || "")).toLowerCase().indexOf(query) !== -1;
      });
      el("lexGrid").innerHTML = list.map(function (t) {
        return (
          '<article class="series-card in" style="opacity:1;transform:none">' +
            '<div class="sc-top"><span class="sc-icon">\u{1F524}</span><span class="sc-sub" dir="rtl" style="font-size:1.3rem;color:var(--cyan)">' + t.ar + '</span></div>' +
            '<h3>' + t.en + '</h3>' +
            '<div class="sc-sub">root: ' + (t.root || "\u2014") + '</div>' +
            '<p class="sc-territory">' + t.gloss + '</p>' +
          '</article>'
        );
      }).join("");
      if (el("lexEmpty")) el("lexEmpty").style.display = list.length ? "none" : "block";
    }
    renderLex("");
    var ls = el("lexSearch");
    if (ls) ls.addEventListener("input", function () { renderLex(ls.value); });
  }

  /* ---------- mobile toggle ----------
     Wired centrally in js/site.js wireMobileToggle() after the header exists. */

  /* ---------- scroll reveal ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach(function (n) { io.observe(n); });

  /* ---------- stagger series/level reveals ---------- */
  document.querySelectorAll(".series-grid").forEach(function (g) {
    g.querySelectorAll(".series-card").forEach(function (c, i) {
      setTimeout(function () { c.classList.add("in"); }, 35 * i);
    });
  });

  var y = el("year"); if (y) y.textContent = new Date().getFullYear();
})();
