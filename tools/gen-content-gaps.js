#!/usr/bin/env node
/* Rebuild the GEN:tables block of CONTENT_GAPS.md from the live inventory +
   tools/content-gaps-map.js. Usage: node tools/gen-content-gaps.js          */
"use strict";
const fs = require("fs"), path = require("path");
const { inventory } = require("./route-inventory.js");
const MAP = require("./content-gaps-map.js");
const ROOT = path.resolve(__dirname, ".."), OUT = path.join(ROOT, "CONTENT_GAPS.md");
const { R, rows } = inventory();
const keys = Object.keys(MAP).sort((a, b) => b.length - a.length);
const meta = (u) => { const k = keys.find((k) => u.indexOf(k) === 0); return k ? MAP[k] : [4, "— no source identified in _refs; needs the wider corpus"]; };
const CAT = { live: "(a) authored", "hub-only": "(b) hub-only", none: "(c) no file" };
const out = [];
let totals = { 1: 0, 2: 0, 3: 0, 4: 0 }, noSeed = 0;
R.MENU.forEach((m) => {
  const leaves = rows.filter((r) => r.kind === "leaf" && r.pillar === m.label);
  const gaps = leaves.filter((r) => r.status !== "live");
  const done = leaves.filter((r) => r.status === "live");
  out.push(`### ${m.label} — ${gaps.length} gaps / ${leaves.length} leaves`, "");
  if (done.length) out.push("Already authored (a): " + done.map((r) => "`" + r.url + "`").join(", "), "");
  out.push("| # | Tier | Route | Title | Cat. | Seed material in `_refs/` (adapt, don't invent) |", "|---|---|---|---|---|---|");
  gaps.map((r) => ({ r, m: meta(r.url) }))
    .sort((a, b) => a.m[0] - b.m[0] || leaves.indexOf(a.r) - leaves.indexOf(b.r))
    .forEach((x, i) => {
      totals[x.m[0]]++; if (/no source|none |no dedicated/.test(x.m[1])) noSeed++;
      out.push(`| ${i + 1} | T${x.m[0]} | \`${x.r.url}\` | ${x.r.title.replace(/\|/g, "\\|")} | ${CAT[x.r.status]} | ${x.m[1]} |`);
    });
  out.push("");
});
const head = [
  `| Tier | Meaning | Gaps |`, `|---|---|---|`,
  `| T1 | first-visit essential: placement, "what is this / what it is not", verify | ${totals[1]} |`,
  `| T2 | core concept of the pillar | ${totals[2]} |`,
  `| T3 | operational / how-to | ${totals[3]} |`,
  `| T4 | deep reference | ${totals[4]} |`,
  `| — | gaps with **no** seed source in \`_refs/\` (need the wider corpus) | ${noSeed} |`, "",
].join("\n");
let src = fs.readFileSync(OUT, "utf8");
const a = "<!-- GEN:tables -->", b = "<!-- /GEN:tables -->";
src = src.slice(0, src.indexOf(a) + a.length) + "\n" + head + "\n" + out.join("\n") + "\n" + src.slice(src.indexOf(b));
fs.writeFileSync(OUT, src);
console.log("CONTENT_GAPS.md refreshed", totals, "noSeed", noSeed);
