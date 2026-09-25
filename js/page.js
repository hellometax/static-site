/* =====================================================================
   MetaX.Academy — Universal page dispatcher
   ---------------------------------------------------------------------
   Lets every route use ONE identical minimal shell. The shell carries an
   empty <main id="mx-page"></main>; page.js reads location.pathname,
   looks it up in window.MX_ROUTES, and decides:

     - pillar hub  (/{pillar}/)                -> hub renderer (pillar)
     - group hub   (/{pillar}/{group}/)        -> hub renderer (group)
     - leaf page   (/{pillar}/{group}/{leaf}/) -> md-page renderer

   The Markdown source path is derived from the route:
     leaf  /a/b/c/  -> /content/a/b/c.md
     group /a/b/    -> /content/a/b/_hub.md
     pillar /a/     -> /content/a/_hub.md

   This keeps 300+ shells identical and DRY. Dedicated shells that set
   #mx-hub or #mx-doc explicitly still work (hub.js / md-page.js self-boot);
   page.js only acts on #mx-page.

   Load order:  routes.js -> skeleton.js -> chrome.js -> md-page.js -> hub.js -> page.js
   ===================================================================== */
(function () {
  "use strict";

  var host = document.getElementById("mx-page");
  if (!host) return;
  var R = window.MX_ROUTES;

  function cleanPath() {
    var p = location.pathname.replace(/^\/ar(\/|$)/, "/"); // fold Arabic mirror
    if (!/\/$/.test(p)) p += "/";
    return p;
  }
  var path = cleanPath();

  // Depth: /a/ = 1, /a/b/ = 2, /a/b/c/ = 3
  var segs = path.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  var depth = segs.length;

  // Derive the content markdown path.
  function mdFor() {
    if (depth <= 1) return "/content/" + segs[0] + "/_hub.md";
    if (isGroupHub()) return "/content/" + segs.join("/") + "/_hub.md";
    return "/content/" + segs.join("/") + ".md";
  }

  function isPillarHub() {
    if (depth !== 1 || !R) return false;
    return R.MENU.some(function (m) { return m.href === path; });
  }
  function isGroupHub() {
    if (depth < 2 || !R) return false;
    // A group hub is any path registered as a group's `hub` in MX_ROUTES,
    // regardless of depth (e.g. /metax/bcia/status/ is a depth-3 group hub).
    return R.MENU.some(function (m) {
      return (m.groups || []).some(function (g) { return g.hub === path; });
    });
  }

  var md = mdFor();

  if (isPillarHub() || isGroupHub()) {
    // Render as a hub: reuse hub.js by planting the attributes it reads.
    host.id = "mx-hub";
    host.setAttribute("data-hub", path);
    host.setAttribute("data-md", md);
    if (window.__hub && window.__hub.boot) window.__hub.boot();
  } else {
    // Render as a detail page via the shared MD parser.
    host.id = "mx-doc";
    host.setAttribute("data-md", md);
    host.setAttribute("data-mx-booted", "page");
    if (window.__mdPage) {
      fetch(md).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
        .then(function (t) { window.__mdPage.render(host, t); })
        .catch(function () {
          /* Honest empty state (SPEC §D.2): name the route, its group and status,
             link upward. Never invent prose. */
          var t = R && R.activeTrail ? R.activeTrail(path) : {};
          var pil = null, grp = null, leaf = null;
          if (R) R.MENU.forEach(function (m) { if (m.key === t.pillar) { pil = m; (m.groups || []).forEach(function (g) {
            if (g.hub === t.group) { grp = g; g.links.forEach(function (l) { if (l.u === path) leaf = l; }); } }); } });
          function e(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
          var title = leaf ? leaf.t : "This page";
          var st = grp && grp.badge ? ' <span class="mm-badge mmb-' + grp.badge + '">' + grp.badge.replace(/-/g, " ") + "</span>" : "";
          host.innerHTML = '<section class="hero wrap mx-doc-hero"><span class="eyebrow">\u2726 ' + e(pil ? pil.label : "MetaX") +
            (grp ? " \u00b7 " + e(grp.heading) : "") + "</span>" +
            "<h1>" + e(title) + " is being written.</h1>" +
            '<p class="lead">This route is declared in the estate map but its page has not been published yet. Nothing on this page is a placeholder value.</p>' +
            '<div class="mx-pagestamp">' + st + " \u00b7 not yet written \u00b7 " + e(path) + "</div>" +
            '<div class="hero-actions">' +
            (grp ? '<a class="btn btn-primary" href="' + grp.hub + '">' + e(grp.heading) + " hub \u2192</a>" : "") +
            (pil ? '<a class="btn btn-ghost" href="' + pil.href + '">' + e(pil.label) + "</a>" : "") +
            '<a class="btn btn-ghost" href="/about/status/defects/">Defect log</a></div></section>';
          document.title = title + " (being written) \u2014 MetaX.Academy";
          if (window.MX && MX.observeReveal) MX.observeReveal(host);
        });
    }
  }
})();
