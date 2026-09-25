#!/usr/bin/env node
/* Route inventory — loads js/routes.js in a sandbox (no hand transcription)
   and checks, for every route in MX_ROUTES, what actually exists on disk:
     shell : <route>/index.html   (Cloudflare Pages serves this; without it the
             request falls to /404.html and md-page.js never runs)
     md    : /content/<route>.md (leaf) or /content/<route>/_hub.md (hub)
   Usage: node tools/route-inventory.js [--json]                               */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.resolve(__dirname, "..");

function loadRoutes() {
  const src = fs.readFileSync(path.join(ROOT, "js/routes.js"), "utf8");
  const ctx = { window: {}, location: { pathname: "/" } };
  vm.createContext(ctx); vm.runInContext(src, ctx);
  return ctx.window.MX_ROUTES;
}
const exists = (p) => fs.existsSync(path.join(ROOT, p));
const segs = (u) => u.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);

function inventory() {
  const R = loadRoutes(), hubSet = new Set();
  R.MENU.forEach((m) => { hubSet.add(m.href); m.groups.forEach((g) => g.hub && hubSet.add(g.hub)); });
  const rows = [];
  function rec(kind, url, title, pillar, group, badge, ext) {
    const s = segs(url);
    const isHub = hubSet.has(url);
    const md = isHub ? "content/" + s.join("/") + "/_hub.md" : "content/" + s.join("/") + ".md";
    const shell = ext ? s.join("/") : s.join("/") + "/index.html";
    const r = { kind, url, title, pillar, group, badge: badge || "", ext: !!ext,
      md, hasMd: exists(md), shell, hasShell: exists(shell), leafIsAlsoHub: kind === "leaf" && isHub };
    // Status: live = authored MD for this exact route; hub-only = group has _hub.md
    // but this leaf has no MD; none = nothing at all.
    if (ext) r.status = r.hasShell ? "live" : "none";
    else if (r.hasMd) r.status = "live";
    else if (kind === "leaf" && group && exists("content/" + segs(group.hub).join("/") + "/_hub.md")) r.status = "hub-only";
    else r.status = "none";
    // What a visitor actually gets on Cloudflare Pages today:
    r.served = ext ? (r.hasShell ? "file" : "404")
      : !r.hasShell ? "404 page" : r.hasMd ? "content" : "being-written placeholder";
    delete r.group; r.group = group ? group.heading : "";
    rows.push(r);
  }
  R.MENU.forEach((m) => {
    rec("pillar", m.href, m.label, m.label, null, m.badge);
    m.groups.forEach((g) => {
      rec("group", g.hub, g.heading, m.label, null, g.badge);
      g.links.forEach((l) => rec("leaf", l.u, l.t, m.label, g, g.badge, l.ext));
    });
  });
  return { R, rows };
}
module.exports = { inventory, loadRoutes };
if (require.main === module) {
  const { rows } = inventory();
  if (process.argv.includes("--json")) { console.log(JSON.stringify(rows, null, 1)); return; }
  const c = (f) => rows.filter(f).length;
  console.log("pillars", c((r) => r.kind === "pillar"), "groups", c((r) => r.kind === "group"),
    "leaves", c((r) => r.kind === "leaf"), "total", rows.length);
  ["live", "hub-only", "none"].forEach((s) => console.log("leaf", s, c((r) => r.kind === "leaf" && r.status === s)));
  ["content", "being-written placeholder", "404 page"].forEach((s) => console.log("served", s, c((r) => r.served === s)));
  const dup = {}; rows.forEach((r) => (dup[r.url] = (dup[r.url] || 0) + 1));
  Object.keys(dup).filter((k) => dup[k] > 1).forEach((k) => console.log("DUPLICATE URL", k, dup[k]));
  rows.filter((r) => r.leafIsAlsoHub).forEach((r) => console.log("LEAF==HUB", r.url));
}
