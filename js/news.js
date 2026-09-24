/* =====================================================================
   MetaX.Academy — Academy News hub
   Renders the category filter, the news-card grid (with image-slot
   placeholders), and an animated aside from NEWS_CATEGORIES / NEWS_POSTS.
   Supports ?cat=<slug> to pre-filter.
   ===================================================================== */
(function () {
  "use strict";

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function q(name) { return new URLSearchParams(location.search).get(name); }

  function catName(slug) {
    var c = (NEWS_CATEGORIES || []).filter(function (x) { return x.slug === slug; })[0];
    return c ? c.name : slug;
  }
  function catGlyph(slug) {
    var c = (NEWS_CATEGORIES || []).filter(function (x) { return x.slug === slug; })[0];
    return c ? c.glyph : "\u2726";
  }
  function fmtDate(d) {
    try { return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); }
    catch (e) { return d; }
  }

  /* Image-slot placeholder (fades to the real image once it exists). */
  function imgSlot(src, index, mark) {
    return (
      '<span class="img-slot" data-index="' + esc(index) + '">' +
        '<span class="img-tag">' + esc(index) + '</span>' +
        '<span class="img-mark">' + (mark || "\u2726") + '</span>' +
        '<img alt="" loading="lazy" data-src="' + esc(src) + '" />' +
      '</span>'
    );
  }
  function hydrate(root) {
    (root || document).querySelectorAll(".img-slot img[data-src]").forEach(function (img) {
      if (img.dataset.bound) return; img.dataset.bound = "1";
      var slot = img.closest(".img-slot");
      img.addEventListener("load", function () { if (img.naturalWidth > 1) { img.classList.add("loaded"); slot.classList.add("has-img"); } });
      img.src = img.dataset.src;
    });
  }

  function cardHTML(p) {
    return (
      '<article class="news-card" data-cat="' + esc(p.category) + '">' +
        '<a class="nc-art" href="article.html?id=' + esc(p.slug) + '" aria-label="' + esc(p.title) + '">' +
          imgSlot(p.img, p.imgIndex, catGlyph(p.category)) +
        '</a>' +
        '<div class="nc-body">' +
          '<span class="nc-cat">' + catGlyph(p.category) + ' ' + esc(catName(p.category)) + '</span>' +
          '<h3><a href="article.html?id=' + esc(p.slug) + '" style="color:inherit;text-decoration:none">' + esc(p.title) + '</a></h3>' +
          '<p>' + esc(p.excerpt) + '</p>' +
          '<div class="nc-meta"><span>' + fmtDate(p.date) + '</span><span>\u00b7</span><span>' + esc(p.readMins) + ' min read</span></div>' +
          '<a class="nc-more" href="article.html?id=' + esc(p.slug) + '">Read article <span aria-hidden="true">\u2192</span></a>' +
        '</div>' +
      '</article>'
    );
  }

  var posts = (typeof NEWS_POSTS !== "undefined") ? NEWS_POSTS.slice() : [];
  posts.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

  var gridEl = document.getElementById("newsGrid");
  var filtersEl = document.getElementById("newsFilters");
  var asideEl = document.getElementById("newsAside");
  var current = (q("cat") || "all");

  function renderFilters() {
    if (!filtersEl) return;
    var html = '<button class="cat-pill' + (current === "all" ? " active" : "") + '" data-cat="all">All</button>';
    (NEWS_CATEGORIES || []).forEach(function (c) {
      html += '<button class="cat-pill' + (current === c.slug ? " active" : "") + '" data-cat="' + esc(c.slug) + '">' + c.glyph + " " + esc(c.name) + '</button>';
    });
    filtersEl.innerHTML = html;
    filtersEl.querySelectorAll(".cat-pill").forEach(function (b) {
      b.addEventListener("click", function () {
        current = b.getAttribute("data-cat");
        filtersEl.querySelectorAll(".cat-pill").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        renderGrid();
      });
    });
  }

  function renderGrid() {
    if (!gridEl) return;
    var list = current === "all" ? posts : posts.filter(function (p) { return p.category === current; });
    gridEl.innerHTML = list.map(cardHTML).join("") || '<p style="color:var(--muted)">No articles in this category yet.</p>';
    hydrate(gridEl);
    // staggered reveal
    var cards = gridEl.querySelectorAll(".news-card");
    cards.forEach(function (c, i) { setTimeout(function () { c.classList.add("in"); }, 60 * i); });
  }

  function renderAside() {
    if (!asideEl) return;
    var latest = posts.slice(0, 4);
    var cats = (NEWS_CATEGORIES || []).map(function (c) {
      var n = posts.filter(function (p) { return p.category === c.slug; }).length;
      return '<a class="cat-pill" href="news.html?cat=' + esc(c.slug) + '">' + c.glyph + " " + esc(c.name) + ' (' + n + ')</a>';
    }).join("");
    asideEl.innerHTML =
      '<div class="aside-block"><h5>Categories</h5>' + cats + '</div>' +
      '<div class="aside-block"><h5>Latest</h5>' +
        latest.map(function (p) { return '<a href="article.html?id=' + esc(p.slug) + '">' + esc(p.title) + '</a>'; }).join("") +
      '</div>' +
      '<div class="aside-block"><h5>Explore</h5>' +
        '<a href="toptech.html">TopTech Academy</a>' +
        '<a href="curriculum.html">Full Curriculum</a>' +
        '<a href="community.html">Academies Community</a>' +
        '<a href="macrolifetach.html">MacroLifeTach</a>' +
      '</div>';
  }

  renderFilters();
  renderGrid();
  renderAside();

  try {
    (adsbygoogle = window.adsbygoogle || []).push({});
    (adsbygoogle = window.adsbygoogle || []).push({});
    (adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {}
})();
