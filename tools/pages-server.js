#!/usr/bin/env node
/* Minimal Cloudflare-Pages-faithful static server for local verification.
   - /a/b/        -> a/b/index.html
   - /a/b         -> 308 /a/b/  (when a/b/index.html exists)
   - /x.html      -> honours _redirects first (301 rules), else serves file
   - anything else missing -> /404.html with HTTP 404 (Pages behaviour when a
     404.html exists at the root — there is NO SPA fallback)
   Usage: node tools/pages-server.js [port]                                    */
"use strict";
const http = require("http"), fs = require("fs"), path = require("path"), url = require("url");
const ROOT = path.resolve(__dirname, ".."), PORT = +process.argv[2] || 8788;
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".md": "text/markdown; charset=utf-8", ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp" };
const redirects = fs.existsSync(path.join(ROOT, "_redirects"))
  ? fs.readFileSync(path.join(ROOT, "_redirects"), "utf8").split("\n").map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#")).map((l) => l.split(/\s+/)).filter((p) => p.length >= 2 && !p[0].includes("?"))
  : [];
function send(res, code, file, extra) {
  res.writeHead(code, Object.assign({ "Content-Type": TYPES[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" }, extra || {}));
  fs.createReadStream(file).pipe(res);
}
const isFile = (p) => { try { return fs.statSync(p).isFile(); } catch (e) { return false; } };
http.createServer((req, res) => {
  let p = decodeURIComponent(url.parse(req.url).pathname);
  if (p.includes("..") || /^\/(\.git|node_modules)(\/|$)/.test(p)) { res.writeHead(403); return res.end(); }
  const rd = redirects.find((r) => r[0] === p);
  if (rd) { res.writeHead(+(rd[2] || 302), { Location: rd[1] }); return res.end(); }
  const fsPath = path.join(ROOT, p);
  if (p.endsWith("/") && isFile(path.join(fsPath, "index.html"))) return send(res, 200, path.join(fsPath, "index.html"));
  if (!p.endsWith("/") && isFile(path.join(fsPath, "index.html"))) { res.writeHead(308, { Location: p + "/" }); return res.end(); }
  if (!p.endsWith("/") && isFile(fsPath)) return send(res, 200, fsPath);
  if (!p.endsWith("/") && isFile(fsPath + ".html")) return send(res, 200, fsPath + ".html");
  return send(res, 404, path.join(ROOT, "404.html"));
}).listen(PORT, () => console.log("pages-server on http://localhost:" + PORT));
