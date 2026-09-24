/* =====================================================================
   MetaX.Academy — /search/ route index + live filter (also the sitemap)
   Renders every route from window.MX_ROUTES grouped by pillar, with a
   live text filter. No JS -> the <noscript> block + footer links serve.
   ===================================================================== */
(function () {
  "use strict";
  var R = window.MX_ROUTES;
  var host = document.getElementById("routes-host");
  if (!R || !host) return;

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function badge(b) { return b ? ' <span class="mm-badge mmb-' + b + '">' + b.replace(/-/g, " ") + "</span>" : ""; }

  var blocks = R.MENU.map(function (m) {
    var items = ['<a class="is-hub" href="' + m.href + '" data-k="' + esc((m.label + " " + m.href).toLowerCase()) + '">' + esc(m.label) + " (pillar hub)</a>"];
    (m.groups || []).forEach(function (g) {
      if (g.hub) items.push('<a class="is-hub" href="' + g.hub + '" data-k="' + esc((g.heading + " " + g.hub).toLowerCase()) + '">' + esc(g.heading) + badge(g.badge) + "</a>");
      (g.links || []).forEach(function (l) {
        if (l.ext) return;
        items.push('<a href="' + l.u + '" data-k="' + esc((l.t + " " + l.u).toLowerCase()) + '">' + esc(l.t) + "</a>");
      });
    });
    return '<div class="route-pillar" data-pillar="' + esc(m.label.toLowerCase()) + '">' +
      "<h2>" + esc(m.label) + badge(m.badge) + "</h2>" +
      '<div class="route-list">' + items.join("") + "</div></div>";
  }).join("");

  var extras = '<div class="route-pillar" data-pillar="utility"><h2>Utility</h2><div class="route-list">' +
    '<a class="is-hub" href="/search/" data-k="search sitemap">Search &amp; Sitemap</a>' +
    '<a href="/404.html" data-k="404 not found">404 — Not Found</a>' +
    "</div></div>";

  host.insertAdjacentHTML("beforeend", blocks + extras);
  // #routes-host itself carries .reveal; reveal it directly so the list is
  // always visible (observeReveal only wires descendant .reveal nodes).
  host.classList.add("in");
  if (window.MX && MX.observeReveal) MX.observeReveal(host);

  var input = document.getElementById("routeFilter");
  if (input) {
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      host.querySelectorAll(".route-pillar").forEach(function (pil) {
        var any = false;
        pil.querySelectorAll("a").forEach(function (a) {
          var hit = !q || (a.getAttribute("data-k") || "").indexOf(q) > -1;
          a.style.display = hit ? "" : "none";
          if (hit) any = true;
        });
        pil.style.display = any ? "" : "none";
      });
    });
  }
})();
