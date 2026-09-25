#!/usr/bin/env node
/* Regenerates the machine-derived sections of SITE_MAP.md from js/routes.js
   and the files actually on disk. Hand-written sections live between
   <!-- KEEP:name --> ... <!-- /KEEP:name --> markers in the existing file and
   are preserved verbatim; everything between <!-- GEN:name --> markers is
   rebuilt. Usage: node tools/gen-site-map.js                               */
"use strict";
const fs = require("fs"), path = require("path");
const { inventory } = require("./route-inventory.js");
const ROOT = path.resolve(__dirname, ".."), OUT = path.join(ROOT, "SITE_MAP.md");
const { R, rows } = inventory();
const ICON = { live: "live", "hub-only": "hub-only", none: "no file" };
const count = (f) => rows.filter(f).length;

function genSummary() {
  const L = (s) => count((r) => r.kind === "leaf" && r.status === s);
  const shellsGenerated = (() => { let n = 0; rows.forEach((r) => { if (r.hasShell && !r.ext && fs.readFileSync(path.join(ROOT, r.shell), "utf8").includes('data-mx-shell="generated"')) n++; }); return n; })();
  return [
    "| Measure | Count |", "|---|---|",
    `| Pillars | ${count((r) => r.kind === "pillar")} |`,
    `| Group hubs | ${count((r) => r.kind === "group")} |`,
    `| Leaf routes in \`MX_ROUTES\` | ${count((r) => r.kind === "leaf")} |`,
    `| **Total routes** | **${rows.length}** |`,
    `| Leaves with authored Markdown (\`live\`) | ${L("live")} |`,
    `| Leaves whose group has a \`_hub.md\` but the leaf has no \`.md\` (\`hub-only\`) | ${L("hub-only")} |`,
    `| Leaves with no file at all (\`no file\`) | ${L("none")} |`,
    `| Hubs (pillar + group) with \`_hub.md\` | ${count((r) => r.kind !== "leaf" && r.hasMd)} / ${count((r) => r.kind !== "leaf")} |`,
    `| Routes with an \`index.html\` shell | ${count((r) => r.hasShell)} / ${rows.length} (of which ${shellsGenerated} generated, \`noindex\`) |`,
    `| Routes where the \`badge\` says \`live\` but the leaf has no Markdown | ${count((r) => r.kind === "leaf" && r.badge === "live" && r.status !== "live")} |`,
  ].join("\n");
}

function genTree() {
  const out = [];
  R.MENU.forEach((m, mi) => {
    const pr = rows.find((r) => r.url === m.href);
    const leaves = rows.filter((r) => r.kind === "leaf" && r.pillar === m.label);
    out.push(`### ${mi + 1}. ${m.label} — \`${m.href}\`${m.badge ? " · badge `" + m.badge + "`" : ""}`);
    out.push("");
    out.push(`Hub prose: ${pr.hasMd ? "`" + pr.md + "`" : "**missing**"} · ${m.groups.length} groups · ${leaves.length} leaves · ` +
      `${leaves.filter((r) => r.status === "live").length} live / ${leaves.filter((r) => r.status === "hub-only").length} hub-only / ${leaves.filter((r) => r.status === "none").length} no file`);
    out.push("");
    out.push("| Route | Title | Badge | Status on disk |");
    out.push("|---|---|---|---|");
    m.groups.forEach((g) => {
      const gr = rows.find((r) => r.kind === "group" && r.url === g.hub);
      out.push(`| **\`${g.hub}\`** | **${g.heading}** (group hub) | ${g.badge || ""} | ${gr.hasMd ? "`_hub.md`" : "**no `_hub.md`**"} |`);
      g.links.forEach((l) => {
        const r = rows.find((x) => x.kind === "leaf" && x.url === l.u);
        const flag = r.badge === "live" && r.status !== "live" ? " ⚠ badge≠disk" : "";
        out.push(`| \`${l.u}\` | ${l.t.replace(/\|/g, "\\|")} | ${r.badge} | ${ICON[r.status]}${r.ext ? " (external file)" : ""}${flag} |`);
      });
    });
    out.push("");
  });
  return out.join("\n");
}

function splice(src, name, body) {
  const a = `<!-- GEN:${name} -->`, b = `<!-- /GEN:${name} -->`;
  const i = src.indexOf(a), j = src.indexOf(b);
  if (i < 0 || j < 0) throw new Error("SITE_MAP.md is missing markers for GEN:" + name);
  return src.slice(0, i + a.length) + "\n" + body + "\n" + src.slice(j);
}
if (!fs.existsSync(OUT)) { console.error("SITE_MAP.md not found — restore it from git; this tool only refreshes GEN blocks."); process.exit(1); }
let src = fs.readFileSync(OUT, "utf8");
src = splice(src, "stamp", `_Generated ${new Date().toISOString().slice(0, 10)} by \`node tools/gen-site-map.js\` from \`js/routes.js\` + \`content/**\` on disk. Do not hand-edit GEN blocks._`);
src = splice(src, "summary", genSummary());
src = splice(src, "tree", genTree());
fs.writeFileSync(OUT, src);
console.log("SITE_MAP.md refreshed:", rows.length, "routes");
