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
  "time-scene.js",
  "app.js",
  "manifest.webmanifest",
  "service-worker.js",
  "assets/app-icon.svg",
  "assets/asset-manifest.json",
  "assets/stadium-day.png",
  "assets/stadium-night.png",
  "legal/privacy.html",
  "legal/terms.html",
  "404.html",
  "robots.txt",
  "_headers",
  "netlify.toml",
  ".netlifyignore",
  ".github/workflows/netlify-deploy.yml",
  ".github/workflows/github-pages-deploy.yml",
  ".github/ISSUE_TEMPLATE/rights-removal.yml",
  ".github/ISSUE_TEMPLATE/config.yml",
  "tools/build-public.mjs",
  "tools/verify-content-safety.mjs",
  "tools/verify-phrase-deck.mjs",
  "tools/verify-time-scene.mjs",
  "tools/verify-asset-provenance.mjs",
  "tools/verify-public-build.mjs",
  "docs/free-web-launch.md",
  "docs/deploy-runbook.md",
];

requiredFiles.forEach(assertFile);

const index = readText("index.html");
const serviceWorker = readText("service-worker.js");
const privacy = readText("legal/privacy.html");
const terms = readText("legal/terms.html");
const notFound = readText("404.html");
const headers = readText("_headers");
const netlifyConfig = readText("netlify.toml");
const netlifyIgnore = readText(".netlifyignore");
const netlifyWorkflow = readText(".github/workflows/netlify-deploy.yml");
const pagesWorkflow = readText(".github/workflows/github-pages-deploy.yml");
const publicBuild = readText("tools/build-public.mjs");
const publicBuildVerify = readText("tools/verify-public-build.mjs");
const launchGuide = readText("docs/free-web-launch.md");
const deployRunbook = readText("docs/deploy-runbook.md");
const app = readText("app.js");
const styles = readText("styles.css");
const timeScene = readText("time-scene.js");

const cssVersion = index.match(/styles\.css\?v=(\d+)/)?.[1];
const timeSceneVersion = index.match(/time-scene\.js\?v=(\d+)/)?.[1];
const appVersion = index.match(/app\.js\?v=(\d+)/)?.[1];
const cacheVersion = serviceWorker.match(/CACHE_NAME\s*=\s*"ninth-lab-v(\d+)"/)?.[1];

assert(cssVersion, "index.html must version styles.css with ?v=");
assert(timeSceneVersion, "index.html must version time-scene.js with ?v=");
assert(appVersion, "index.html must version app.js with ?v=");
assert(cacheVersion, "service-worker.js must use nth-lab/ninth-lab versioned cache name");
assert(cssVersion === appVersion, `CSS and JS query versions differ: css=${cssVersion}, app=${appVersion}`);
assert(cssVersion === timeSceneVersion, `CSS and time scene query versions differ: css=${cssVersion}, scene=${timeSceneVersion}`);
assert(cssVersion === cacheVersion, `Asset query version and service-worker cache differ: asset=${cssVersion}, cache=${cacheVersion}`);

for (const file of [privacy, terms, notFound]) {
  assert(file.includes(`styles.css?v=${cssVersion}`), "All static HTML support pages must use the current CSS version");
  assert(file.includes(`time-scene.js?v=${timeSceneVersion}`), "All static HTML support pages must use the current time scene version");
}

const cachedFiles = [
  "./",
  "./index.html",
  `./styles.css?v=${cssVersion}`,
  "./time-scene.js",
  `./time-scene.js?v=${timeSceneVersion}`,
  `./app.js?v=${appVersion}`,
  "./manifest.webmanifest",
  "./404.html",
  "./robots.txt",
  "./assets/app-icon.svg",
  "./assets/stadium-day.png",
  "./assets/stadium-night.png",
  "./legal/privacy.html",
  "./legal/terms.html",
];

for (const path of cachedFiles) {
  assert(serviceWorker.includes(`"${path}"`), `service-worker.js APP_SHELL missing ${path}`);
}

assert(index.includes("legal/privacy.html"), "index.html must link to privacy page");
assert(index.includes("legal/terms.html"), "index.html must link to terms page");
assert(index.includes("rights-removal.yml"), "index.html must link to the rights and removal request channel");
assert(index.includes("비공식 팬메이드"), "index.html must keep unofficial fan-made disclosure visible");
assert(index.includes("공식 기록 아님"), "index.html must keep official-record disclaimer visible");
assert(index.includes("무료 공개 배포"), "launch center must show current public deploy status");
assert(index.includes("id=\"previewRelayBtn\""), "preview relay entrypoint is missing");
assert(index.includes("id=\"makePollCardBtn\""), "relay poll card entrypoint is missing");
assert(index.includes("id=\"previewCaptionBtn\""), "preview caption copy entrypoint is missing");
assert(index.includes("id=\"quickStartCardBtn\""), "quick start card entrypoint is missing");
assert(index.includes("id=\"quickStartCaptionBtn\""), "quick start caption entrypoint is missing");
assert(index.includes("id=\"mobileQuickCardBtn\""), "mobile first-screen card entrypoint is missing");
assert(index.includes("id=\"mobileQuickJjalBtn\""), "mobile first-screen jjal entrypoint is missing");
assert(!index.includes("처음 왔다면"), "first-screen controls must not rely on instructional copy");
assert(index.includes("data-builder-pane=\"preview\""), "mobile preview workspace tab is missing");
assert(index.includes("data-builder-pane=\"controls\""), "mobile controls workspace tab is missing");
assert(index.includes("class=\"content-band daily-band app-view\""), "daily content must be an app view");
assert(index.includes("id=\"today\"") && index.includes("id=\"rules\""), "app view targets are missing");
assert(app.includes('document.body.classList.add("app-shell-ready")'), "single-screen app shell is not initialized");
assert(app.includes("activateAppView"), "app view navigation is missing");
assert((index.match(/data-view-target=/g) || []).length >= 14, "desktop and mobile app view navigation is incomplete");
assert(styles.includes("body.app-shell-ready"), "single-screen body lock styles are missing");
assert(styles.includes("height: 100dvh"), "app shell must stay within the viewport");
assert(styles.includes("[data-builder-pane-panel].is-mobile-active"), "mobile builder pane switching styles are missing");
assert(index.includes("data-time-stadium-image"), "time-aware stadium card image is missing");
assert(timeScene.includes("DAY_START_HOUR = 6"), "day scene must begin at 06:00 local time");
assert(timeScene.includes("NIGHT_START_HOUR = 18"), "night scene must begin at 18:00 local time");
assert(timeScene.includes("stadium-day.png") && timeScene.includes("stadium-night.png"), "time scene image sources are incomplete");
assert(styles.includes(':root[data-time-scene="day"]'), "day scene CSS is missing");
assert(app.includes("loadImage(currentStadiumImageSource())"), "card export must use the current time scene");
assert(index.includes("id=\"cardFormat\""), "meme grammar selector is missing");
assert(index.includes("id=\"rerollBtn\""), "phrase reroll entrypoint is missing");
assert(index.includes("id=\"surpriseMeBtn\""), "random content mix entrypoint is missing");
assert(index.includes("id=\"quickJjalToggleBtn\""), "quick reaction disclosure toggle is missing");
assert(index.includes("id=\"more\""), "collapsed utility section is missing");
assert(index.includes("id=\"copyFeedbackBtn\""), "beta feedback copy entrypoint is missing");
assert(index.includes("id=\"copyInviteBtn\""), "beta invite copy entrypoint is missing");
assert(index.includes("id=\"copyLaunchChecklistBtn\""), "launch checklist copy entrypoint is missing");
assert(index.includes("id=\"copyBetaReportBtn\""), "local beta report entrypoint is missing");
assert(index.includes("id=\"challengeRecapBtn\""), "daily challenge recap button is missing");
assert(index.includes("id=\"timelineBtn\""), "timeline card entrypoint is missing");
assert(index.includes('name="background"'), "card background selector is missing");
assert(index.includes("card-stage"), "sticky card stage wrapper is missing");
assert(index.includes("card-backdrop"), "card backdrop layer is missing");
assert(app.includes("오늘 마음이 제일 크게 움직인 순간"), "expanded daily prompt pool is missing");
assert(app.includes("박수부터 나가고 이유는 나중"), "expanded live reaction pool is missing");
assert(app.includes("시작 전 마음 예열"), "pregame scenario content pack is missing");
assert(app.includes("끝난 뒤 복기 모드"), "aftergame scenario content pack is missing");
assert(app.includes("cardFormats"), "meme grammar state map is missing");
assert(app.includes("renderContentInventory"), "content source inventory is missing");
assert(app.includes("nextDeckPhrase"), "no-repeat phrase deck is missing");
assert(app.includes("PHRASE_DECK_KEY"), "phrase deck session key is missing");
assert(app.includes("PUBLIC_BETA_URL"), "invite copy must use the public beta URL outside production");
assert(
  app.includes("https://kim-jongik.github.io/ninth-lab/"),
  "invite copy must use the GitHub Pages beta URL",
);
assert(app.includes("GitHub Pages 자동 배포"), "launch checklist must reflect automatic GitHub Pages deploy");
assert(app.includes("단톡방 4지선다"), "relay poll card flow is missing");
assert(app.includes("3컷 감정 타임라인"), "emotion timeline card flow is missing");
assert(app.includes("drawTimelineDownload"), "timeline PNG renderer is missing");
assert(app.includes("cardBackgrounds"), "card background state map is missing");
assert(app.includes("drawCardBase"), "card background PNG renderer is missing");
assert(app.includes("backgroundInputs"), "card background control events are missing");
assert(app.includes("scrollShareCardIntoView"), "shared card scroll helper is missing");
assert(app.includes("imageLoadCache"), "PNG image load cache is missing");
assert(app.includes("compactSafetyText"), "spaced-text safety normalization is missing");
assert(app.includes("playerNumberPattern"), "player-number identification guard is missing");

assert(
  privacy.includes("github-general-privacy-statement"),
  "privacy page must disclose the GitHub Pages hosting privacy layer",
);
assert(privacy.includes("rights-removal.yml"), "privacy page must link to the rights request channel");
assert(terms.includes("rights-removal.yml"), "terms page must link to the rights request channel");

assert(headers.includes("X-Content-Type-Options: nosniff"), "_headers missing X-Content-Type-Options");
assert(headers.includes("Permissions-Policy:"), "_headers missing Permissions-Policy");
assert(headers.includes("/service-worker.js") && headers.includes("Cache-Control: no-cache"), "_headers must no-cache service worker");
assert(netlifyConfig.includes('publish = "dist"'), "netlify.toml must publish the generated public dist directory");
assert(netlifyConfig.includes("node tools/build-public.mjs"), "netlify.toml must build the public dist directory");
assert(netlifyConfig.includes("/service-worker.js"), "netlify.toml must include service-worker cache headers");
assert(netlifyIgnore.includes(".github/"), ".netlifyignore must exclude GitHub workflow files from public upload");
assert(netlifyIgnore.includes(".netlify/"), ".netlifyignore must exclude local Netlify state from public upload");
assert(netlifyIgnore.includes("tools/"), ".netlifyignore must exclude local tooling from public upload");
assert(publicBuild.includes('"index.html"'), "public build script must copy index.html");
assert(publicBuild.includes('"time-scene.js"'), "public build script must copy time-scene.js");
assert(publicBuild.includes('"legal"'), "public build script must copy legal pages");
assert(publicBuild.includes('".nojekyll"'), "public build script must create the GitHub Pages marker");
assert(publicBuildVerify.includes("forbidden"), "public build verification must check forbidden internal files");

assert(launchGuide.includes("무료 정적 호스팅"), "launch guide must explain free static hosting");
assert(launchGuide.includes("_headers"), "launch guide must mention _headers deployment file");
assert(launchGuide.includes("dist/"), "launch guide must mention public dist deploy output");
assert(launchGuide.includes("외부 배포 토큰이 필요 없습니다"), "launch guide must explain token-free Pages deploys");
assert(launchGuide.includes("kim-jongik.github.io/ninth-lab"), "launch guide must include the GitHub Pages URL");
assert(launchGuide.includes("비공식 팬메이드"), "launch guide must keep unofficial disclosure in checklist");
assert(deployRunbook.includes("GitHub Actions"), "deploy runbook must describe GitHub Actions deploys");
assert(deployRunbook.includes("dist/"), "deploy runbook must describe public dist deploy output");
assert(deployRunbook.includes("GITHUB_TOKEN"), "deploy runbook must describe built-in GitHub authorization");
assert(deployRunbook.includes("build_type=workflow"), "deploy runbook must explain one-time Pages setup");
assert(deployRunbook.includes("kim-jongik.github.io/ninth-lab"), "deploy runbook must include the Pages URL");
assert(deployRunbook.includes("KIM-JONGIK/ninth-lab"), "deploy runbook must point at the current GitHub repo");
assert(pagesWorkflow.includes("push:") && pagesWorkflow.includes("- main"), "Pages workflow must run from main pushes");
assert(pagesWorkflow.includes("workflow_dispatch:"), "Pages workflow must allow manual dispatch");
assert(pagesWorkflow.includes("pages: write"), "Pages workflow must request pages write permission");
assert(pagesWorkflow.includes("id-token: write"), "Pages workflow must request id-token permission");
assert(pagesWorkflow.includes("tools/verify-static-launch.mjs"), "Pages workflow must verify static files");
assert(pagesWorkflow.includes("tools/verify-content-safety.mjs"), "Pages workflow must verify content safety");
assert(pagesWorkflow.includes("tools/verify-phrase-deck.mjs"), "Pages workflow must verify phrase decks");
assert(pagesWorkflow.includes("tools/verify-time-scene.mjs"), "Pages workflow must verify time scene boundaries");
assert(pagesWorkflow.includes("tools/verify-asset-provenance.mjs"), "Pages workflow must verify asset provenance");
assert(pagesWorkflow.includes("tools/build-public.mjs"), "Pages workflow must build dist");
assert(pagesWorkflow.includes("tools/verify-public-build.mjs"), "Pages workflow must verify dist");
assert(pagesWorkflow.includes("actions/configure-pages@v6.0.0"), "Pages workflow must configure Pages");
assert(pagesWorkflow.includes("actions/upload-pages-artifact@v5.0.0"), "Pages workflow must upload an artifact");
assert(pagesWorkflow.includes("path: dist"), "Pages workflow must upload only dist");
assert(pagesWorkflow.includes("actions/deploy-pages@v5"), "Pages workflow must deploy the Pages artifact");
assert(netlifyWorkflow.includes("workflow_dispatch:"), "Netlify fallback must remain manually runnable");
assert(!netlifyWorkflow.includes("push:"), "Netlify workflow must not deploy automatically");
assert(netlifyWorkflow.includes("netlify-cli deploy"), "Netlify fallback must keep its explicit deploy command");

if (errors.length) {
  console.error("Static launch verification failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Static launch verification passed. version=v${cacheVersion}, files=${requiredFiles.length}`);
