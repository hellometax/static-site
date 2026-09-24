/* =====================================================================
   MetaX.Academy — Component Skeletons + Lazy-Load-on-Scroll
   ---------------------------------------------------------------------
   Provides a single, reusable hydration API so EVERY dynamic component can:
     1) paint a shimmering skeleton immediately (no layout jump), and
     2) render its real content only when it scrolls into the viewport
        (IntersectionObserver), then fade the real content in.

   PUBLIC API (window.MX):
     MX.skeletonHTML(kind, count)        -> skeleton markup string
     MX.lazy(target, render, opts)       -> defer-hydrate a container
     MX.hydrateNow(target)               -> force-hydrate immediately
     MX.observeReveal(root)              -> add .reveal->.in observer to a subtree

   `render` may return an HTML string, a DOM node, or nothing (if it fills
   the target itself). After hydration we run img-slot hydration + reveal.

   LOAD ORDER: load AFTER components.js, BEFORE the page renderer (main.js /
   pages.js / …) so those renderers can call MX.lazy().
   ===================================================================== */
(function () {
  "use strict";

  var MX = window.MX || (window.MX = {});

  /* ---------- Skeleton markup builders ---------- */
  function line(w) { return '<div class="mx-sk-line ' + (w || "w-100") + '"></div>'; }

  function cardSkel() {
    return (
      '<div class="mx-sk mx-sk-card">' +
        '<div class="mx-sk-media"></div>' +
        line("w-40") + line("tall w-80") + line("w-100") + line("w-60") +
      '</div>'
    );
  }
  function textSkel() {
    return (
      '<div class="mx-sk mx-sk-card">' +
        line("tall w-60") + line("w-100") + line("w-100") + line("w-80") + line("w-40") +
      '</div>'
    );
  }
  function mediaSkel() { return '<div class="mx-sk mx-sk-media" style="aspect-ratio:16/8"></div>'; }
  function chipSkel() { return '<div class="mx-sk mx-sk-chip"></div>'; }

  var BUILDERS = { card: cardSkel, text: textSkel, media: mediaSkel, chip: chipSkel };

  /* kind: card|text|media|chip ; count: how many placeholders ; cols: grid columns */
  MX.skeletonHTML = function (kind, count, cols) {
    var build = BUILDERS[kind] || cardSkel;
    var n = Math.max(1, count || 3);
    var items = "";
    for (var i = 0; i < n; i++) items += build();
    return '<div class="mx-skel" data-cols="' + (cols || Math.min(n, 4)) + '">' + items + '</div>';
  };

  /* ---------- Reveal observer (shared) ---------- */
  var revealIO = ("IntersectionObserver" in window)
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" })
    : null;

  MX.observeReveal = function (root) {
    var scope = root || document;
    scope.querySelectorAll(".reveal:not(.in)").forEach(function (n) {
      if (revealIO) revealIO.observe(n); else n.classList.add("in");
    });
  };

  /* ---------- Hydration core ---------- */
  function fill(target, out) {
    if (out == null) return;                 // renderer filled target itself
    if (typeof out === "string") { target.innerHTML = out; return; }
    target.innerHTML = "";
    if (out.nodeType) target.appendChild(out);
  }

  function runHydration(target, render) {
    var out;
    try { out = render(target); } catch (e) { if (window.console) console.error("MX.lazy render failed:", e); return; }
    fill(target, out);
    target.setAttribute("data-mx-state", "hydrated");
    target.classList.add("mx-hydrated-in");
    // Wire images + reveals inside the freshly-rendered subtree.
    if (typeof window.__hydrateImgSlots === "function") window.__hydrateImgSlots(target);
    MX.observeReveal(target);
    // Let any page hook post-process (e.g. countdowns).
    if (typeof MX.onHydrate === "function") { try { MX.onHydrate(target); } catch (e2) {} }
  }

  MX.hydrateNow = function (target) {
    if (!target || target.__mxRender == null) return;
    var r = target.__mxRender; target.__mxRender = null;
    if (target.__mxObserver) { target.__mxObserver.unobserve(target); }
    runHydration(target, r);
  };

  /* target: element or id string. render: fn -> html/node/void. opts:{kind,count,cols,rootMargin} */
  MX.lazy = function (target, render, opts) {
    if (typeof target === "string") target = document.getElementById(target);
    if (!target || typeof render !== "function") return;
    opts = opts || {};

    target.classList.add("mx-lazy");
    // Paint the skeleton straight away so there is never a blank gap.
    target.innerHTML = MX.skeletonHTML(opts.kind || "card", opts.count || 3, opts.cols);
    target.setAttribute("data-mx-state", "pending");
    target.__mxRender = render;

    // No IntersectionObserver support -> hydrate immediately.
    if (!("IntersectionObserver" in window)) { MX.hydrateNow(target); return; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) MX.hydrateNow(en.target);
      });
    }, { rootMargin: opts.rootMargin || "200px 0px", threshold: 0.01 });
    target.__mxObserver = io;
    io.observe(target);
  };

  /* ---------- Auto-upgrade: declarative skeletons in markup ----------
     Any element with data-mx-skeleton="card|text|media|chip" and optional
     data-mx-count / data-mx-cols gets a skeleton painted immediately if it
     is still empty, so hand-authored sections shimmer too. When a renderer
     later sets real innerHTML, the skeleton is naturally replaced. */
  function autoSkeleton() {
    document.querySelectorAll("[data-mx-skeleton]").forEach(function (el) {
      if (el.getAttribute("data-mx-state") === "hydrated") return;
      if (el.children.length && !el.querySelector(".mx-skel")) return; // already has content
      var kind = el.getAttribute("data-mx-skeleton") || "card";
      var count = parseInt(el.getAttribute("data-mx-count"), 10) || 3;
      var cols = el.getAttribute("data-mx-cols") || undefined;
      el.classList.add("mx-lazy");
      el.innerHTML = MX.skeletonHTML(kind, count, cols);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", autoSkeleton);
  else autoSkeleton();
})();
