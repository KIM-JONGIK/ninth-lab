import { existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "dist");
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function exists(path) {
  return existsSync(join(outDir, path));
}

const required = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "service-worker.js",
  "robots.txt",
  "404.html",
  ".nojekyll",
  "_headers",
  "assets/app-icon.svg",
  "assets/asset-manifest.json",
  "assets/stadium-night.png",
  "legal/privacy.html",
  "legal/terms.html",
];

const forbidden = [
  ".github/workflows/netlify-deploy.yml",
  ".github/workflows/github-pages-deploy.yml",
  ".netlify",
  "docs/deploy-runbook.md",
  "tools/verify-static-launch.mjs",
  "README.md",
  "netlify.toml",
];

for (const path of required) {
  assert(exists(path), `Public build missing ${path}`);
}

for (const path of forbidden) {
  assert(!exists(path), `Public build must not include ${path}`);
}

if (errors.length) {
  console.error("Public build verification failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Public build verification passed. files=${required.length}`);
