#!/usr/bin/env node
/* Generate the universal <main id="mx-page"> shell for every MX_ROUTES route
   that has no index.html. Without a shell, Cloudflare Pages serves /404.html
   and md-page.js never runs, so the page cannot show its "being written" state.
   Never overwrites an existing shell. Writes NO content — prose comes only
   from /content/**.md.
   Usage: node tools/gen-shells.js [--dry]                                     */
"use strict";
const fs = require("fs"), path = require("path");
const { inventory } = require("./route-inventory.js");
const ROOT = path.resolve(__dirname, "..");
const dry = process.argv.includes("--dry");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const { rows } = inventory();
let n = 0;
rows.filter((r) => !r.ext && !r.hasShell).forEach((r) => {
  const pillar = r.pillar.toUpperCase();
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#05060f" />
  <title>${esc(r.title)} — ${esc(r.pillar)} · MetaX.Academy</title>
  <meta name="description" content="${esc(r.title)} — ${esc(r.group || r.pillar)}, ${esc(r.pillar)} pillar of the MetaX.Academy estate." />
  <meta name="robots" content="noindex" data-mx-shell="generated" />
  <link rel="canonical" href="https://metax.academy${r.url}" />
  <link rel="alternate" hreflang="en" href="https://metax.academy${r.url}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/style.css" />
  <link rel="stylesheet" href="/css/estate.css" />
</head>
<body class="page-fade">
  <div class="cosmos" aria-hidden="true"></div>
  <div class="grid-veil" aria-hidden="true"></div>
  <div id="site-header"></div>
  <main id="mx-page"></main>
  <noscript><p class="wrap">This page is being written. <a href="/search/">Browse the route index</a>.</p></noscript>
  <div id="site-footer"></div>
  <script>window.SITE_PAGE = { ver: "${esc(pillar)} · v2026.10.1" };</script>
  <script src="/js/routes.js"></script>
  <script src="/js/skeleton.js"></script>
  <script src="/js/chrome.js"></script>
  <script src="/js/md-page.js"></script>
  <script src="/js/hub.js"></script>
  <script src="/js/page.js"></script>
</body>
</html>
`;
  const out = path.join(ROOT, r.shell);
  n++;
  if (dry) { console.log("would write", r.shell); return; }
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
});
console.log((dry ? "would generate " : "generated ") + n + " shells");
