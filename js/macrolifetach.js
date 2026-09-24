/* =====================================================================
   MetaX Academy — MacroLifeTach / Meta-X landing (English)
   ===================================================================== */
(function () {
  "use strict";

  function imgSlot(src, index, mark) {
    return (
      '<span class="img-slot" data-index="' + index + '">' +
        '<span class="img-tag">' + index + '</span>' +
        '<span class="img-mark">' + (mark || "\u25c9") + '</span>' +
        '<img alt="" loading="lazy" data-src="' + src + '" />' +
      '</span>'
    );
  }
  function hydrate(root) {
    (root || document).querySelectorAll(".img-slot img[data-src]").forEach(function (img) {
      if (img.dataset.bound) return;
      img.dataset.bound = "1";
      var slot = img.closest(".img-slot");
      img.addEventListener("load", function () {
        if (img.naturalWidth > 1) { img.classList.add("loaded"); slot.classList.add("has-img"); }
      });
      img.src = img.dataset.src;
    });
  }

  /* ---------- Mobile menu wired centrally in js/site.js wireMobileToggle() ---------- */

  /* ---------- Eight crises ---------- */
  var cw = document.getElementById("mltCrises");
  if (cw && typeof MLT_CRISES !== "undefined") {
    cw.innerHTML = MLT_CRISES.map(function (c) {
      return (
        '<article class="crisis">' +
          '<span class="c-glyph">' + c.glyph + '</span>' +
          '<h4>' + c.title + '</h4>' +
          '<p>' + c.body + '</p>' +
        '</article>'
      );
    }).join("");
  }

  /* ---------- Nine programs ---------- */
  var pw = document.getElementById("mltPrograms");
  if (pw && typeof MLT_PROGRAMS !== "undefined") {
    pw.innerHTML = MLT_PROGRAMS.map(function (p) {
      return (
        '<article class="program' + (p.flagship ? ' flagship' : '') + '">' +
          '<div class="pr-art">' + imgSlot(p.img, p.imgIndex, "\u25c9") + '</div>' +
          '<div class="pr-body">' +
            '<div class="pr-code">' + p.code + (p.flagship ? '<span class="pr-flag">FLAGSHIP</span>' : '') + '</div>' +
            '<h3>' + p.ar + '</h3>' +
            '<div class="pr-en">' + p.en + '</div>' +
            '<p>' + p.desc + '</p>' +
            '<a class="card-link" href="detail.html?type=program&id=' + p.code + '">View program details <span class="arw">\u2192</span></a>' +
          '</div>' +
        '</article>'
      );
    }).join("");
    hydrate(pw);
  }

  /* ---------- Governance (the Cloister) ---------- */
  var gw = document.getElementById("mltGovernance");
  if (gw && typeof MLT_GOVERNANCE !== "undefined") {
    gw.innerHTML = MLT_GOVERNANCE.map(function (g) {
      return (
        '<article class="feature">' +
          '<span class="f-glyph">' + g.glyph + '</span>' +
          '<h3>' + g.title + '</h3>' +
          '<p>' + g.body + '</p>' +
        '</article>'
      );
    }).join("");
  }

  /* ---------- Reveal ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  try {
    (adsbygoogle = window.adsbygoogle || []).push({});
    (adsbygoogle = window.adsbygoogle || []).push({});
    (adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {}
})();
