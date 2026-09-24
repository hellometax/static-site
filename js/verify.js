/* =====================================================================
   MetaX.Academy — Credential verifier (client-side demo)
   Looks up an ID in VERIFY_RECORDS and renders a verified card.
   This is a static demonstration of the public verification UX.
   ===================================================================== */
(function () {
  "use strict";
  var form = document.getElementById("verifyForm");
  var input = document.getElementById("vf-id");
  var status = document.getElementById("vfStatus");
  var result = document.getElementById("vfResult");
  if (!form || !input) return;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }

  function lookup(id) {
    id = (id || "").trim().toUpperCase();
    if (!id) { status.textContent = "Enter a credential ID."; status.className = "form-status err"; result.innerHTML = ""; return; }
    var rec = (typeof VERIFY_RECORDS !== "undefined") ? VERIFY_RECORDS[id] : null;
    if (!rec) {
      status.textContent = "No credential found for " + id + ".";
      status.className = "form-status err";
      result.innerHTML = '<div class="feature" style="border-color:rgba(255,77,205,0.4)"><span class="f-glyph">\u2717</span><h3>Not found</h3><p>We could not verify <code>' + esc(id) + '</code>. Check the ID, or try a sample ID from the sidebar.</p></div>';
      return;
    }
    status.textContent = "Verified \u2713";
    status.className = "form-status ok";
    result.innerHTML =
      '<div class="cred" style="padding:28px 26px">' +
        '<span class="mm-badge mmb-live">valid</span>' +
        '<h2 style="font-size:1.5rem;margin:12px 0 4px">' + esc(rec.name) + '</h2>' +
        '<p style="color:var(--cyan);font-family:var(--font);font-weight:600;margin-bottom:16px">' + esc(rec.rung) + '</p>' +
        '<div class="cred-ladder" style="grid-template-columns:1fr 1fr">' +
          '<div class="cred-rung"><span class="cr-i">\u{1F3DB}</span><div><b>Academy</b><span>' + esc(rec.academy) + '</span></div></div>' +
          '<div class="cred-rung"><span class="cr-i">\u{1F4C5}</span><div><b>Issued</b><span>' + esc(rec.date) + '</span></div></div>' +
          '<div class="cred-rung"><span class="cr-i">\u{1F464}</span><div><b>ID</b><span>' + esc(id) + '</span></div></div>' +
          '<div class="cred-rung"><span class="cr-i">\u2696</span><div><b>Reviewers</b><span>' + esc(rec.reviewers) + '</span></div></div>' +
        '</div>' +
      '</div>';
  }

  form.addEventListener("submit", function (e) { e.preventDefault(); lookup(input.value); });
  document.querySelectorAll(".vf-sample").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); input.value = a.dataset.id; lookup(a.dataset.id); });
  });

  // mobile toggle wired centrally in js/site.js wireMobileToggle().
  var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();

  // reveal (verify page doesn't load main.js/pages.js)
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach(function (n) { io.observe(n); });
})();
