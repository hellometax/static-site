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
    if (window.__mdPage) {
      fetch(md).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
        .then(function (t) { window.__mdPage.render(host, t); })
        .catch(function (e) {
          host.innerHTML = '<section class="hero wrap"><span class="eyebrow">\u2726 MetaX</span>' +
            "<h1>This page is being written.</h1>" +
            '<p class="lead">The content source for this route could not be loaded. The estate is a demo build; ' +
            'see the <a href="/about/status/defects/">defect log</a> and the <a href="/search/">route index</a>.</p></section>';
          if (window.MX && MX.observeReveal) MX.observeReveal(host);
        });
    }
  }
})();
