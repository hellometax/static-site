#!/usr/bin/env node
/* Navigation audit (Playwright). Run against a local pages-server:
     node tools/pages-server.js 8788 &
     NODE_PATH=<dir containing playwright> node tools/nav-audit.js [baseURL]
   Prints a JSON report: per-width visibility/overflow, keyboard behaviour,
   active-state cascade, mobile accordion geometry.                         */
"use strict";
const { chromium } = require("playwright");
const BASE = process.argv[2] || "http://localhost:8788";
const WIDTHS = [320, 360, 390, 414, 768, 1024, 1179, 1180, 1280, 1366, 1440, 1600, 1920, 2560];

(async () => {
  const browser = await chromium.launch();
  const report = { widths: {}, keyboard: {}, active: {}, mobile: {}, errors: [] };

  // ---------- 1+3: visibility & overflow per width ----------
  for (const w of WIDTHS) {
    const page = await browser.newPage({ viewport: { width: w, height: 800 } });
    page.on("pageerror", (e) => report.errors.push(w + ": " + e.message));
    await page.goto(BASE + "/license/", { waitUntil: "networkidle" });
    report.widths[w] = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const vis = (el) => { if (!el) return false; const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
        return cs.display !== "none" && cs.visibility !== "hidden" && r.width > 0 && r.height > 0; };
      const hiddenDisplayNone = [];
      document.querySelectorAll(".nav-utility > *, .nav-links.mega .mm-top, .mm-more-top").forEach((el) => {
        let n = el, dn = false; while (n && n !== document.body) { if (getComputedStyle(n).display === "none") { dn = true; break; } n = n.parentElement; }
        const reach = el.closest(".mm-item") && (el.closest(".mm-item").hidden || window.innerWidth < 1180) ? "reachable-via-" + (window.innerWidth < 1180 ? "hamburger" : "More") : (el.classList.contains("mm-more-top") ? "More-not-needed" : (window.innerWidth <= 420 && /verify|auth/.test(el.className) ? "reachable-via-hamburger" : "LOST"));
        if (dn) hiddenDisplayNone.push(reach + " ← " + (el.className || el.tagName) + ":" + el.textContent.trim().slice(0, 18));
      });
      const tops = [...document.querySelectorAll(".nav-links.mega .mm-top")].filter(vis);
      const util = [...document.querySelectorAll(".nav-utility > *")].filter(vis);
      const all = [...document.querySelectorAll(".nav-inner > *")].filter(vis);
      const maxRight = Math.max(0, ...[...document.querySelectorAll(".nav-inner *")].filter(vis).map((e) => e.getBoundingClientRect().right));
      const toggle = vis(document.getElementById("navToggle"));
      return { vw, docScrollW: document.documentElement.scrollWidth, navOverflowPx: Math.max(0, Math.round(maxRight - vw)),
        visibleTopTabs: tops.map((t) => t.textContent.replace(/\s+/g, " ").trim().split(" ")[0]),
        visibleUtility: util.map((u) => (u.getAttribute("aria-label") || u.textContent).trim().slice(0, 20)),
        hamburger: toggle, hiddenByDisplayNone: hiddenDisplayNone };
    });
    // panel clipping: open each visible top-tab panel and measure
    if (w >= 1180) {
      const clip = await page.evaluate(() => {
        const out = []; const vw = document.documentElement.clientWidth;
        document.querySelectorAll(".nav-links.mega .mm-item.has-panel").forEach((it) => {
          if (getComputedStyle(it).display === "none") return;
          it.classList.add("open");
          const p = it.querySelector(".mm-panel-inner"); const r = p.getBoundingClientRect(); const wr = it.querySelector(".mm-panel-wrap").getBoundingClientRect();
          const wrap = it.querySelector(".mm-panel");
          out.push({ tab: it.querySelector(".mm-top").textContent.trim().split(/\s/)[0], left: Math.round(r.left), right: Math.round(r.right),
            clipped: r.left < -1 || r.right > vw + 1, panelScrollX: wrap.scrollWidth > wrap.clientWidth + 1,
            bottom: Math.round(wr.bottom), taller: wr.bottom > innerHeight + 1, scrollsInside: it.querySelector(".mm-panel-wrap").scrollHeight > it.querySelector(".mm-panel-wrap").clientHeight });
          it.classList.remove("open");
        });
        return out;
      });
      report.widths[w].panels = clip;
      report.widths[w].anyPanelClipped = clip.some((c) => c.clipped || c.panelScrollX);
      report.widths[w].panelsTallerThanViewport = clip.filter((c) => c.taller).map((c) => c.tab);
    }
    await page.close();
  }

  // ---------- 5: keyboard-only ----------
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE + "/license/", { waitUntil: "networkidle" });
    const k = [];
    const snap = async (label) => k.push(Object.assign({ step: label }, await page.evaluate(() => {
      const a = document.activeElement; const item = a && a.closest(".mm-item, .mm-more");
      const openPanels = [...document.querySelectorAll(".mm-item, .mm-more")].filter((i) => {
        const p = i.querySelector(".mm-panel, .mm-more-panel"); return p && getComputedStyle(p).visibility === "visible"; })
        .map((i) => (i.querySelector(".mm-top, .mm-more-top") || {}).textContent.trim().split(/\s/)[0]);
      const t = item && item.querySelector(".mm-top, .mm-more-top");
      return { focused: a ? (a.className + "|" + a.textContent.trim().slice(0, 24)) : null,
        ariaExpanded: t ? t.getAttribute("aria-expanded") : null, ariaHaspopup: t ? t.getAttribute("aria-haspopup") : null, openPanels };
    })));
    await page.focus(".nav-links.mega .mm-top"); await snap("focus first tab");
    await page.keyboard.press("Enter").catch(() => {});
    await page.waitForTimeout(250); await snap("Enter on first tab");
    if (page.url() !== BASE + "/license/") { k.push({ step: "Enter NAVIGATED to " + page.url() }); await page.goto(BASE + "/license/", { waitUntil: "networkidle" }); await page.focus(".nav-links.mega .mm-top"); }
    await page.keyboard.press("ArrowDown"); await page.waitForTimeout(150); await snap("ArrowDown");
    await page.keyboard.press("Tab"); await page.waitForTimeout(150); await snap("Tab");
    await page.keyboard.press("Escape"); await page.waitForTimeout(400); await snap("Escape");
    // tab through to the 2nd top tab: how many tab stops?
    await page.focus(".nav-links.mega .mm-top");
    let stops = 0; for (; stops < 80; stops++) { await page.keyboard.press("Tab");
      const onTop = await page.evaluate(() => { const a = document.activeElement; return a.classList.contains("mm-top") && a !== document.querySelector(".nav-links.mega .mm-top"); });
      if (onTop) break; }
    k.push({ step: "Tab presses from tab#1 to tab#2", stops: stops + 1 });
    const hoverThenAria = await (async () => { await page.evaluate(() => document.activeElement && document.activeElement.blur()); await page.hover(".nav-links.mega .mm-item:nth-child(2) .mm-top"); await page.waitForTimeout(200);
      const a = await page.getAttribute(".nav-links.mega .mm-item:nth-child(2) .mm-top", "aria-expanded");
      await page.mouse.move(60, 30); await page.mouse.move(5, 5); await page.waitForTimeout(500);
      const b = await page.getAttribute(".nav-links.mega .mm-item:nth-child(2) .mm-top", "aria-expanded");
      return { afterHover: a, afterLeave: b }; })();
    k.push(Object.assign({ step: "hover/leave aria" }, hoverThenAria));
    report.keyboard = k; await page.close();
  }

  // ---------- 2: active cascade ----------
  for (const p of ["/license/harms/", "/license/harms/stratum-i-cognitive/", "/metax/bcia/status/", "/license/statement/ours/"]) {
    for (const w of [1440, 390]) {
      const page = await browser.newPage({ viewport: { width: w, height: 800 } });
      await page.goto(BASE + p, { waitUntil: "networkidle" });
      report.active[p + " @" + w] = await page.evaluate(() => {
        const q = (s) => [...document.querySelectorAll(s)].map((e) => e.textContent.replace(/\s+/g, " ").trim().slice(0, 40));
        return { activeTop: q(".mm-top.active, .mm-top[aria-current]"), currentGroup: q(".mm-hub.is-current, .mm-hub[aria-current], h6.is-current, .mm-group.is-current h6"),
          currentLeaf: q(".mm-group a.is-current, .mm-group a[aria-current='page']"),
          ariaCurrentAll: q("header [aria-current]").slice(0, 8), mobileActive: q(".mm-m-toggle.active"),
          mobileCurrent: q("#mobileMenu [aria-current]"), mobileAutoOpen: q(".mm-m-group.open > .mm-m-toggle") };
      });
      await page.close();
    }
  }

  // ---------- 6: mobile accordion ----------
  for (const [w, h] of [[320, 568], [375, 667], [390, 844]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, hasTouch: true, isMobile: true });
    await page.goto(BASE + "/license/", { waitUntil: "networkidle" });
    await page.click("#navToggle");
    const toggles = await page.$$(".mm-m-toggle");
    await toggles[0].click(); await toggles[1].click();
    report.mobile[w + "x" + h] = await page.evaluate(() => {
      const m = document.getElementById("mobileMenu"); const r = m.getBoundingClientRect();
      const cs = getComputedStyle(m);
      return { menuBottom: Math.round(r.bottom), viewportH: innerHeight, tallerThanViewport: r.bottom > innerHeight + 1,
        overflowY: cs.overflowY, scrollable: m.scrollHeight > m.clientHeight, openGroupsAfterTwoClicks: document.querySelectorAll(".mm-m-group.open").length,
        groupPanelsClipped: [...document.querySelectorAll(".mm-m-group.open .mm-m-panel")].map((p) => p.scrollHeight > p.clientHeight + 1),
        pillars: document.querySelectorAll(".mm-m-toggle").length };
    });
    await page.close();
  }
  await browser.close();
  console.log(JSON.stringify(report, null, 1));
})();
