import { existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const distDir = resolve(root, "dist");
const clientDir = join(distDir, "client");
const workerPath = join(distDir, "server", "index.js");
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

for (const path of [
  "server/index.js",
  "client/index.html",
  "client/styles.css",
  "client/app.js",
  "client/service-worker.js",
  "client/assets/stadium-day.png",
  "client/assets/stadium-night.png",
  "client/legal/privacy.html",
  "client/legal/terms.html",
]) {
  assert(existsSync(join(distDir, path)), `Sites build missing ${path}`);
}

if (errors.length) {
  console.error("Sites build verification failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const assets = {
  async fetch(request) {
    const pathname = decodeURIComponent(new URL(request.url).pathname).replace(/^\/+/, "");
    const path = resolve(clientDir, pathname || "index.html");
    const rel = relative(clientDir, path);
    if (rel.startsWith("..") || !existsSync(path) || !(await stat(path)).isFile()) {
      return new Response("Not found", { status: 404 });
    }
    const body = await readFile(path);
    return new Response(body, {
      headers: { "Content-Type": contentTypes[extname(path)] || "application/octet-stream" },
    });
  },
};

const workerUrl = pathToFileURL(workerPath);
workerUrl.searchParams.set("verify", String(Date.now()));
const { default: worker } = await import(workerUrl.href);

const home = await worker.fetch(new Request("https://example.test/", { headers: { accept: "text/html" } }), {
  ASSETS: assets,
});
assert(home.status === 200, `Sites worker home returned ${home.status}`);
assert((await home.text()).includes("경기 보다가, 지금 기분 한 장."), "Sites worker home content is incomplete");

const css = await worker.fetch(new Request("https://example.test/styles.css?verify=sites"), { ASSETS: assets });
assert(css.status === 200, `Sites worker CSS returned ${css.status}`);
assert((await css.text()).includes("56.25cqh"), "Sites worker CSS is missing height-aware story sizing");

const fallback = await worker.fetch(
  new Request("https://example.test/card-preview", { headers: { accept: "text/html" } }),
  { ASSETS: assets },
);
assert(fallback.status === 200, `Sites worker navigation fallback returned ${fallback.status}`);

const blocked = await worker.fetch(new Request("https://example.test/", { method: "POST" }), { ASSETS: assets });
assert(blocked.status === 405, `Sites worker POST returned ${blocked.status}`);

if (errors.length) {
  console.error("Sites build verification failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Sites build verification passed. routes=4");
