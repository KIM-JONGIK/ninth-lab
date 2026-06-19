import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const errors = [];

function readText(path) {
  return readFileSync(join(root, path), "utf8");
}

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function assertFile(path) {
  assert(existsSync(join(root, path)), `Missing required file: ${path}`);
}

const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "service-worker.js",
  "assets/app-icon.svg",
  "assets/stadium-night.png",
  "legal/privacy.html",
  "legal/terms.html",
  "404.html",
  "robots.txt",
  "_headers",
  "netlify.toml",
  "docs/free-web-launch.md",
];

requiredFiles.forEach(assertFile);

const index = readText("index.html");
const serviceWorker = readText("service-worker.js");
const privacy = readText("legal/privacy.html");
const terms = readText("legal/terms.html");
const notFound = readText("404.html");
const headers = readText("_headers");
const netlifyConfig = readText("netlify.toml");
const launchGuide = readText("docs/free-web-launch.md");
const app = readText("app.js");

const cssVersion = index.match(/styles\.css\?v=(\d+)/)?.[1];
const appVersion = index.match(/app\.js\?v=(\d+)/)?.[1];
const cacheVersion = serviceWorker.match(/CACHE_NAME\s*=\s*"ninth-lab-v(\d+)"/)?.[1];

assert(cssVersion, "index.html must version styles.css with ?v=");
assert(appVersion, "index.html must version app.js with ?v=");
assert(cacheVersion, "service-worker.js must use nth-lab/ninth-lab versioned cache name");
assert(cssVersion === appVersion, `CSS and JS query versions differ: css=${cssVersion}, app=${appVersion}`);
assert(cssVersion === cacheVersion, `Asset query version and service-worker cache differ: asset=${cssVersion}, cache=${cacheVersion}`);

for (const file of [privacy, terms, notFound]) {
  assert(file.includes(`styles.css?v=${cssVersion}`), "All static HTML support pages must use the current CSS version");
}

const cachedFiles = [
  "./",
  "./index.html",
  `./styles.css?v=${cssVersion}`,
  `./app.js?v=${appVersion}`,
  "./manifest.webmanifest",
  "./404.html",
  "./robots.txt",
  "./assets/app-icon.svg",
  "./assets/stadium-night.png",
  "./legal/privacy.html",
  "./legal/terms.html",
];

for (const path of cachedFiles) {
  assert(serviceWorker.includes(`"${path}"`), `service-worker.js APP_SHELL missing ${path}`);
}

assert(index.includes("legal/privacy.html"), "index.html must link to privacy page");
assert(index.includes("legal/terms.html"), "index.html must link to terms page");
assert(index.includes("비공식 팬메이드"), "index.html must keep unofficial fan-made disclosure visible");
assert(index.includes("공식 기록 아님"), "index.html must keep official-record disclaimer visible");
assert(index.includes("id=\"previewRelayBtn\""), "preview relay entrypoint is missing");
assert(index.includes("id=\"previewCaptionBtn\""), "preview caption copy entrypoint is missing");
assert(index.includes("id=\"quickStartCardBtn\""), "quick start card entrypoint is missing");
assert(index.includes("id=\"quickStartCaptionBtn\""), "quick start caption entrypoint is missing");
assert(index.includes("id=\"copyFeedbackBtn\""), "beta feedback copy entrypoint is missing");
assert(index.includes("id=\"copyInviteBtn\""), "beta invite copy entrypoint is missing");
assert(index.includes("id=\"copyLaunchChecklistBtn\""), "launch checklist copy entrypoint is missing");
assert(index.includes("id=\"challengeRecapBtn\""), "daily challenge recap button is missing");
assert(app.includes("오늘 마음이 제일 크게 움직인 순간"), "expanded daily prompt pool is missing");
assert(app.includes("박수부터 나가고 이유는 나중"), "expanded live reaction pool is missing");

assert(headers.includes("X-Content-Type-Options: nosniff"), "_headers missing X-Content-Type-Options");
assert(headers.includes("Permissions-Policy:"), "_headers missing Permissions-Policy");
assert(headers.includes("/service-worker.js") && headers.includes("Cache-Control: no-cache"), "_headers must no-cache service worker");
assert(netlifyConfig.includes('publish = "."'), "netlify.toml must publish the static root directory");
assert(netlifyConfig.includes("/service-worker.js"), "netlify.toml must include service-worker cache headers");

assert(launchGuide.includes("무료 정적 호스팅"), "launch guide must explain free static hosting");
assert(launchGuide.includes("_headers"), "launch guide must mention _headers deployment file");
assert(launchGuide.includes("netlify.toml"), "launch guide must mention netlify.toml deployment file");
assert(launchGuide.includes("비공식 팬메이드"), "launch guide must keep unofficial disclosure in checklist");

if (errors.length) {
  console.error("Static launch verification failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Static launch verification passed. version=v${cacheVersion}, files=${requiredFiles.length}`);
