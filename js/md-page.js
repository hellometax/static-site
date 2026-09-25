/* =====================================================================
   MetaX.Academy — Markdown detail-page renderer (ONE parser for all leaves)
   ---------------------------------------------------------------------
   A detail page is a thin shell:

     <main id="mx-doc" data-md="/content/<pillar>/<...>/<leaf>.md"></main>

   md-page.js fetches that Markdown file, parses YAML front matter + body,
   and renders the eight-part page contract (MX-NAV-SPEC v2026.10.1 §6–§7):
   hero (eyebrow · H1 claim · lead · pagestamp), reveal sections, an
   .mx-related lattice block (Up / Beside / Depends on / Governs), and the
   two-action .mx-exitpair. Progressive-enhancement: the shell also carries
   a <noscript> prose mirror so the page is legible with JS disabled.

   Front matter keys used:
     title, eyebrow, deck, status, evidence, version, reviewed,
     jsonld (Article|Course|WebPage), thin (true -> mx-thin, no word floor),
     up:   [ [label,url], ... ]      (group hub + pillar hub)
     beside:[ [label,url], ... ]     (sibling leaves)
     depends:[ [label,url], ... ]    (prerequisites / upstream standards)
     governs:[ [label,url], ... ]    (ML-2.3 / Method standard)
     deeper:[label,url]  sideways:[label,url]   (the exit pair)

   Loaded on every detail-page shell as the last script.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- tiny, safe Markdown -> HTML ---------- */
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function inline(s) {
    // escape first, then apply inline tokens on the escaped text
    s = esc(s);
    s = s.replace(/`([^`]+)`/g, function (_, c) { return "<code>" + c + "</code>"; });
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    // links [text](url)
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, t, u) {
      var ext = /^https?:/.test(u);
      return '<a href="' + u + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + t + "</a>";
    });
    return s;
  }

  function parseBody(md) {
    var lines = md.replace(/\r\n/g, "\n").split("\n");
    var html = [], i = 0;
    function flushList(type, items) {
      html.push("<" + type + ">" + items.map(function (it) { return "<li>" + inline(it) + "</li>"; }).join("") + "</" + type + ">");
    }
    while (i < lines.length) {
      var ln = lines[i];
      if (/^\s*$/.test(ln)) { i++; continue; }
      // headings
      var h = /^(#{1,4})\s+(.*)$/.exec(ln);
      if (h) {
        var lvl = h[1].length;
        if (lvl === 1) { html.push('<h2 class="section-title"><span class="gradient-text">' + inline(h[2]) + "</span></h2>"); }
        else if (lvl === 2) { html.push("<h3>" + inline(h[2]) + "</h3>"); }
        else { html.push("<h4>" + inline(h[2]) + "</h4>"); }
        i++; continue;
      }
      // blockquote
      if (/^>\s?/.test(ln)) {
        var q = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) { q.push(lines[i].replace(/^>\s?/, "")); i++; }
        html.push('<blockquote class="mx-quote">' + inline(q.join(" ")) + "</blockquote>");
        continue;
      }
      // unordered list
      if (/^\s*[-*]\s+/.test(ln)) {
        var ul = [];
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { ul.push(lines[i].replace(/^\s*[-*]\s+/, "")); i++; }
        flushList("ul", ul); continue;
      }
      // ordered list
      if (/^\s*\d+\.\s+/.test(ln)) {
        var ol = [];
        while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) { ol.push(lines[i].replace(/^\s*\d+\.\s+/, "")); i++; }
        flushList("ol", ol); continue;
      }
      // table (simple GFM): header | --- | rows
      if (/\|/.test(ln) && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[i + 1])) {
        var head = ln.split("|").map(function (c) { return c.trim(); }).filter(function (c, idx, a) { return !(c === "" && (idx === 0 || idx === a.length - 1)); });
        i += 2;
        var rows = [];
        while (i < lines.length && /\|/.test(lines[i]) && !/^\s*$/.test(lines[i])) {
          rows.push(lines[i].split("|").map(function (c) { return c.trim(); }).filter(function (c, idx, a) { return !(c === "" && (idx === 0 || idx === a.length - 1)); }));
          i++;
        }
        var t = '<div class="mx-table-wrap"><table class="mx-table"><thead><tr>' +
          head.map(function (c) { return "<th>" + inline(c) + "</th>"; }).join("") + "</tr></thead><tbody>" +
          rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + inline(c) + "</td>"; }).join("") + "</tr>"; }).join("") +
          "</tbody></table></div>";
        html.push(t); continue;
      }
      // paragraph (gather until blank / block start)
      var p = [];
      while (i < lines.length && !/^\s*$/.test(lines[i]) &&
             !/^(#{1,4})\s/.test(lines[i]) && !/^>\s?/.test(lines[i]) &&
             !/^\s*[-*]\s+/.test(lines[i]) && !/^\s*\d+\.\s+/.test(lines[i])) {
        p.push(lines[i]); i++;
      }
      html.push("<p>" + inline(p.join(" ")) + "</p>");
    }
    return html.join("\n");
  }

  /* ---------- YAML-lite front matter ---------- */
  function parseFront(text) {
    var fm = {}, body = text;
    var m = /^---\n([\s\S]*?)\n---\n?/.exec(text);
    if (m) {
      body = text.slice(m[0].length);
      m[1].split("\n").forEach(function (line) {
        var mm = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
        if (!mm) return;
        var k = mm[1], v = mm[2].trim();
        if (/^\[/.test(v)) { try { fm[k] = JSON.parse(v.replace(/'/g, '"')); } catch (e) { fm[k] = []; } }
        else { fm[k] = v.replace(/^["']|["']$/g, ""); }
      });
    }
    return { fm: fm, body: body };
  }

  /* ---------- Split body into .reveal sections at H2 (single #) ---------- */
  function sectionize(bodyHtml) {
    var parts = bodyHtml.split(/(?=<h2 class="section-title">)/);
    return parts.filter(function (p) { return p.trim(); }).map(function (p) {
      return '<section class="wrap reveal mx-sec">' + p + "</section>";
    }).join("\n");
  }

  function relatedBlock(fm) {
    function group(label, arr) {
      if (!arr || !arr.length) return "";
      return '<div class="mx-rel-col"><h4>' + label + "</h4><ul>" +
        arr.map(function (x) { return '<li><a href="' + x[1] + '">' + esc(x[0]) + "</a></li>"; }).join("") + "</ul></div>";
    }
    var cols = group("Up", fm.up) + group("Beside", fm.beside) + group("Depends on", fm.depends) + group("Governs / governed by", fm.governs);
    if (!cols) return "";
    return '<section class="wrap reveal"><nav class="mx-related" aria-label="Related pages">' +
      '<h3 class="mx-rel-title">Where this sits</h3><div class="mx-rel-grid">' + cols + "</div></nav></section>";
  }

  function exitPair(fm) {
    var deeper = fm.deeper || ["Explore the pillar", "/"];
    var side = fm.sideways || ["Back to the estate", "/"];
    return '<section class="wrap reveal"><div class="cta-band mx-exitpair">' +
      "<h2>Two ways onward.</h2><div class=\"hero-actions\" style=\"justify-content:center\">" +
      '<a class="btn btn-primary" href="' + deeper[1] + '">' + esc(deeper[0]) + " \u2192</a>" +
      '<a class="btn btn-ghost" href="' + side[1] + '">' + esc(side[0]) + "</a></div></div></section>";
  }

  function jsonld(fm) {
    var type = fm.jsonld || "WebPage";
    var o = { "@context": "https://schema.org", "@type": type, name: fm.title || document.title,
      description: fm.deck || "", url: "https://metax.academy" + location.pathname };
    var s = document.createElement("script"); s.type = "application/ld+json";
    s.textContent = JSON.stringify(o); document.head.appendChild(s);
  }

  function pillarLabel() {
    var seg = location.pathname.replace(/^\/(ar\/)?/, "").split("/")[0] || "";
    var map = { toptech: "TOPTECH", method: "METHOD", ascent: "ASCENT", metax: "META-X",
      academies: "ACADEMIES", credentials: "CREDENTIALS", library: "LIBRARY", license: "LICENSE", about: "ABOUT" };
    return map[seg] || "METAX";
  }

  function render(host, text) {
    var parsed = parseFront(text), fm = parsed.fm;
    var bodyHtml = parseBody(parsed.body);
    var sections = sectionize(bodyHtml);

    if (fm.title) document.title = fm.title + " \u2014 " + pillarLabel().charAt(0) + pillarLabel().slice(1).toLowerCase() + " \u00b7 MetaX.Academy";
    if (fm.deck) {
      var md = document.querySelector('meta[name="description"]');
      if (!md) { md = document.createElement("meta"); md.name = "description"; document.head.appendChild(md); }
      md.setAttribute("content", fm.deck);
    }
    if (fm.thin === "true") {
      var mt = document.createElement("meta"); mt.name = "mx-thin"; mt.content = "true"; document.head.appendChild(mt);
    }
    jsonld(fm);

    var eyebrow = fm.eyebrow || (pillarLabel() + " \u00b7 " + (fm.group || "MetaX"));
    var stamp = [fm.status && '<span class="mm-badge mmb-' + fm.status + '">' + fm.status.replace(/-/g, " ") + "</span>",
      fm.evidence && "evidence " + esc(fm.evidence), fm.version && esc(fm.version),
      fm.reviewed && "reviewed " + esc(fm.reviewed)].filter(Boolean).join(" \u00b7 ");

    var hero = '<section class="hero wrap mx-doc-hero">' +
      '<span class="eyebrow">\u2726 ' + esc(eyebrow) + "</span>" +
      "<h1>" + inline(fm.title || "Untitled") + "</h1>" +
      (fm.deck ? '<p class="lead">' + inline(fm.deck) + "</p>" : "") +
      (stamp ? '<div class="mx-pagestamp">' + stamp + "</div>" : "") +
      "</section>" +
      '<div class="marquee" aria-hidden="true"><div class="marquee-track">' +
        '<span>Sidq</span><span>Falsifiability</span><span>Declared limits</span><span>Correctability</span>' +
        '<span>Sidq</span><span>Falsifiability</span><span>Declared limits</span><span>Correctability</span>' +
      "</div></div>";

    host.innerHTML = hero + sections + relatedBlock(fm) + exitPair(fm);
    if (window.MX && MX.observeReveal) MX.observeReveal(host);
    else host.querySelectorAll(".reveal").forEach(function (n) { n.classList.add("in"); });
  }

  function boot() {
    var host = document.getElementById("mx-doc");
    if (!host) return;
    /* page.js already dispatched this host (universal shell) — do not fetch
       the same Markdown a second time or overwrite page.js's empty state. */
    if (host.hasAttribute("data-mx-booted")) return;
    host.setAttribute("data-mx-booted", "md");
    var src = host.getAttribute("data-md");
    if (!src) { host.innerHTML = '<section class="wrap"><p>No content source.</p></section>'; return; }
    fetch(src).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text();
    }).then(function (t) { render(host, t); })
      .catch(function (e) {
        host.innerHTML = '<section class="hero wrap"><span class="eyebrow">\u2726 MetaX</span>' +
          "<h1>This page is being written.</h1>" +
          '<p class="lead">The content source for this route could not be loaded (' + esc(e.message) +
          '). The estate is a demo build; see the <a href="/about/status/defects/">defect log</a> and the ' +
          '<a href="/search/">route index</a>.</p></section>';
        if (window.MX && MX.observeReveal) MX.observeReveal(host);
      });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.__mdPage = { render: render, parseBody: parseBody };
})();
