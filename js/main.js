/* =====================================================================
   MetaX Academy — Interactions & Rendering
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Image placeholder helper ----------
     Renders an indexed art slot. If the image exists it fades in;
     otherwise the labelled shimmer placeholder stays visible. */
  function imgSlot(src, index, mark) {
    return (
      '<span class="img-slot" data-index="' + index + '">' +
        '<span class="img-tag">' + index + '</span>' +
        '<span class="img-mark">' + (mark || "✦") + '</span>' +
        '<img alt="" loading="lazy" data-src="' + src + '" />' +
      '</span>'
    );
  }
  window.__hydrateImgSlots = function (root) {
    (root || document).querySelectorAll(".img-slot img[data-src]").forEach(function (img) {
      if (img.dataset.bound) return;
      img.dataset.bound = "1";
      var slot = img.closest(".img-slot");
      img.addEventListener("load", function () {
        if (img.naturalWidth > 1) { img.classList.add("loaded"); slot.classList.add("has-img"); }
      });
      img.addEventListener("error", function () { /* keep placeholder */ });
      img.src = img.dataset.src;
    });
  };

  /* ---------- Mobile menu ----------
     Wiring lives in js/site.js wireMobileToggle(), which runs on boot() AFTER
     components.js has built the header and site.js has populated #mobileMenu.
     Binding here (at IIFE parse time) would find #navToggle = null. */

  /* ---------- ROOT: Entry-point pillars ---------- */
  const pillarWrap = document.getElementById("pillars");
  if (pillarWrap && typeof ENTRY_POINTS !== "undefined") {
    pillarWrap.innerHTML = ENTRY_POINTS.map(function (p) {
      var stats = p.stats.map(function (s) {
        return '<span class="ps"><b class="gradient-text">' + s.v + '</b><span>' + s.l + '</span></span>';
      }).join("");
      return (
        '<article class="pillar ' + p.accent + '" data-id="' + p.id + '">' +
          '<span class="p-orbit" aria-hidden="true"></span>' +
          '<div class="p-art">' + imgSlot(p.img, p.imgIndex, p.glyph) + '</div>' +
          '<div class="p-body">' +
            '<div class="p-glyph">' + p.glyph + '</div>' +
            '<div class="p-code">' + p.code + '</div>' +
            '<h2>' + p.title + '</h2>' +
            '<div class="p-tag">' + p.tagline + '</div>' +
            '<p class="p-desc">' + p.desc + '</p>' +
            '<div class="p-stats">' + stats + '</div>' +
            '<a class="p-cta" href="' + p.href + '">' + p.cta + ' <span class="arw">\u2192</span></a>' +
          '</div>' +
        '</article>'
      );
    }).join("");
    window.__hydrateImgSlots(pillarWrap);
    // staggered pillar reveal
    var pcards = pillarWrap.querySelectorAll(".pillar");
    var pio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var idx = Array.prototype.indexOf.call(pcards, en.target);
          setTimeout(function () { en.target.classList.add("in"); }, 130 * Math.max(0, idx));
          pio.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    pcards.forEach(function (c) { pio.observe(c); });
  }

  /* ---------- Flagships (lazy) ---------- */
  const fgWrap = document.getElementById("flagships");
  if (fgWrap && typeof FLAGSHIPS !== "undefined" && window.MX) {
    MX.lazy(fgWrap, function () {
      return FLAGSHIPS.map(function (f) {
      return (
        '<article class="flagship ' + f.accent + '">' +
          imgSlot(f.img, f.imgIndex, f.icon) +
          '<div class="fg-top">' +
            '<div class="fg-icon">' + f.icon + '</div>' +
            '<div>' +
              '<div class="fg-code">FLAGSHIP ' + f.code + '</div>' +
              '<h3>' + f.title + '</h3>' +
              '<div class="fg-tag">' + f.tagline + '</div>' +
            '</div>' +
          '</div>' +
          '<p class="fg-quote">' + f.quote + '</p>' +
          '<p class="fg-thesis">' + f.thesis + '</p>' +
          '<div class="fg-meta">' +
            '<span class="pill">' + f.courses + '</span>' +
            '<span class="pill">\u23F1 ' + f.hours + '</span>' +
            '<span class="pill">Rebuilt v2026.08.2</span>' +
          '</div>' +
          '<a class="card-link" href="detail.html?type=flagship&id=' + f.id + '">View flagship details <span class="arw">\u2192</span></a>' +
        '</article>'
      );
      }).join("");
    }, { kind: "card", count: 2, cols: 2 });
  }

  /* ---------- Series grid + filters ---------- */
  const grid = document.getElementById("seriesGrid");
  const filterWrap = document.getElementById("seriesFilters");
  if (grid && typeof SERIES !== "undefined") {
    const tiers = ["All"].concat(
      SERIES.reduce(function (acc, s) {
        if (acc.indexOf(s.tier) === -1) acc.push(s.tier);
        return acc;
      }, [])
    );

    if (filterWrap) {
      filterWrap.innerHTML = tiers.map(function (t, i) {
        return '<button class="filter-btn' + (i === 0 ? " active" : "") +
          '" data-tier="' + t + '">' + t + "</button>";
      }).join("");
    }

    function renderSeries(tier) {
      const list = tier === "All" ? SERIES : SERIES.filter(function (s) { return s.tier === tier; });
      grid.innerHTML = list.map(function (s) {
        return (
          '<article class="series-card" tabindex="0">' +
            (s.isNew ? '<span class="sc-new">NEW</span>' : "") +
            imgSlot(s.img, s.imgIndex, s.icon) +
            '<div class="sc-top">' +
              '<span class="sc-icon">' + s.icon + '</span>' +
              '<span class="sc-num">' + s.n + '</span>' +
            '</div>' +
            '<h3>' + s.title + '</h3>' +
            '<div class="sc-sub">' + s.sub + '</div>' +
            '<p class="sc-territory">' + s.territory + '</p>' +
            '<div class="sc-foot">' +
              '<span class="sc-tier">' + s.tier + '</span>' +
              '<span>\u2192 pairs ' + s.pairs + '</span>' +
            '</div>' +
            '<a class="card-link stretch" href="detail.html?type=series&id=' + s.n + '">View series details <span class="arw">\u2192</span></a>' +
          '</article>'
        );
      }).join("");
      window.__hydrateImgSlots(grid);
      // staggered reveal
      const cards = grid.querySelectorAll(".series-card");
      cards.forEach(function (c, i) {
        setTimeout(function () { c.classList.add("in"); }, 40 * i);
      });
    }

    renderSeries("All");

    if (filterWrap) {
      filterWrap.addEventListener("click", function (e) {
        const btn = e.target.closest(".filter-btn");
        if (!btn) return;
        filterWrap.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        renderSeries(btn.dataset.tier);
      });
    }
  }

  /* ---------- Axioms ---------- */
  const axWrap = document.getElementById("axioms");
  if (axWrap && typeof AXIOMS !== "undefined") {
    axWrap.innerHTML = AXIOMS.map(function (a, i) {
      return (
        '<article class="axiom">' +
          '<span class="rank">0' + (i + 1) + '</span>' +
          '<div class="glyph">' + a.glyph + '</div>' +
          '<h3>' + a.title + '</h3>' +
          '<p>' + a.body + '</p>' +
        '</article>'
      );
    }).join("");
  }

  /* ---------- Cognitive arc ---------- */
  const arcWrap = document.getElementById("arc");
  if (arcWrap && typeof ARC !== "undefined") {
    arcWrap.innerHTML = ARC.map(function (a) {
      return (
        '<div class="arc-step">' +
          '<h3>' + a.step + '</h3>' +
          '<div class="verb">' + a.verb + '</div>' +
          '<p>' + a.desc + '</p>' +
        '</div>'
      );
    }).join("");
  }

  /* ---------- Rails ---------- */
  const railWrap = document.getElementById("rails");
  if (railWrap && typeof RAILS !== "undefined") {
    railWrap.innerHTML = RAILS.map(function (r) {
      return (
        '<div class="rail">' +
          '<span class="r-glyph">' + r.glyph + '</span>' +
          '<div><h4>' + r.name + '</h4><p>' + r.note + '</p></div>' +
        '</div>'
      );
    }).join("");
  }

  /* ---------- Archetypes ---------- */
  const archWrap = document.getElementById("archetypes");
  if (archWrap && typeof ARCHETYPES !== "undefined") {
    archWrap.innerHTML = ARCHETYPES.map(function (a) {
      return (
        '<div class="arch">' +
          '<h4>' + a.name + '</h4>' +
          '<div class="a-path">' + a.path + '</div>' +
        '</div>'
      );
    }).join("");
  }

  /* ---------- Status badge helper ---------- */
  function statusBadge(status) {
    if (!status) return "";
    return ' <span class="mm-badge mmb-' + status + '">' + status.replace(/-/g, " ") + '</span>';
  }

  /* ---------- Five-branch architecture (lazy) ---------- */
  const branchWrap = document.getElementById("branches");
  if (branchWrap && typeof BRANCHES !== "undefined" && window.MX) {
    MX.lazy(branchWrap, function () {
      return BRANCHES.map(function (b) {
        return (
          '<a class="branch-card reveal" href="' + b.href + '">' +
            '<div class="br-head">' +
              '<span class="br-code">' + b.code + '</span>' +
              '<span class="br-glyph">' + b.glyph + '</span>' +
            '</div>' +
            '<h3 class="br-title">' + b.title + statusBadge(b.status) + '</h3>' +
            '<div class="br-range">' + b.range + '</div>' +
            '<p class="br-desc">' + b.desc + '</p>' +
            '<span class="br-go">Explore <span class="arw">\u2192</span></span>' +
          '</a>'
        );
      }).join("");
    }, { kind: "card", count: 5, cols: 3 });
  }

  /* ---------- Branch B roster (lazy) ---------- */
  const branchBWrap = document.getElementById("branchB");
  if (branchBWrap && typeof BRANCH_B_UNITS !== "undefined" && window.MX) {
    MX.lazy(branchBWrap, function () {
      return BRANCH_B_UNITS.map(function (u) {
        return (
          '<div class="unit-chip">' +
            '<span class="uc-n">' + u.n + '</span>' +
            '<span class="uc-t">' + u.title + '</span>' +
            statusBadge(u.status) +
          '</div>'
        );
      }).join("");
    }, { kind: "chip", count: 6, cols: 3 });
  }

  /* ---------- Stat counters ---------- */
  const statWrap = document.getElementById("stats");
  if (statWrap && typeof STATS !== "undefined") {
    statWrap.innerHTML = STATS.map(function (s) {
      return (
        '<div class="stat">' +
          '<div class="num gradient-text" data-target="' + s.value + '" data-suffix="' + s.suffix + '">' + s.suffix + '0</div>' +
          '<div class="lbl">' + s.label + '</div>' +
        '</div>'
      );
    }).join("");
  }

  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || "";
    const dur = 1400;
    const start = performance.now();
    function frame(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = suffix + Math.floor(eased * target).toLocaleString();
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = suffix + target.toLocaleString();
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Scroll reveal + counters ---------- */
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        if (entry.target.classList.contains("num") && !entry.target.dataset.done) {
          entry.target.dataset.done = "1";
          animateCount(entry.target);
        }
        if (!entry.target.classList.contains("num")) io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal, .stat .num").forEach(function (el) { io.observe(el); });

  /* ---------- Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
