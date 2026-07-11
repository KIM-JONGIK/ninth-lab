import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const checks = [];

function run(command, args) {
  try {
    const output = execFileSync(command, args, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { ok: true, output };
  } catch (error) {
    return {
      ok: false,
      output:
        String(error.stdout || "") +
        String(error.stderr || "") +
        String(error.message || ""),
    };
  }
}

function addCheck(name, ok, detail, fix = "") {
  checks.push({ name, ok, detail, fix });
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function parseGithubRepo(remoteUrl) {
  const trimmed = remoteUrl.trim();
  const match = trimmed.match(/github\.com[:/](?<owner>[^/]+)\/(?<repo>[^/.]+)(?:\.git)?$/i);
  if (!match?.groups) return "";
  return match.groups.owner + "/" + match.groups.repo;
}

function parseJson(output) {
  try {
    return JSON.parse(output);
  } catch {
    return {};
  }
}

const staticVerify = run(process.execPath, ["tools/verify-static-launch.mjs"]);
addCheck(
  "static launch verification",
  staticVerify.ok,
  staticVerify.ok ? staticVerify.output.trim() : "static verification failed",
  "Run: node tools/verify-static-launch.mjs",
);

const gitStatus = run("git", ["status", "--porcelain"]);
addCheck(
  "clean git worktree",
  gitStatus.ok && gitStatus.output.trim() === "",
  gitStatus.ok && gitStatus.output.trim() === ""
    ? "working tree clean"
    : gitStatus.output.trim() || "git status failed",
  "Commit the intended hosting changes before deploying.",
);

const remote = run("git", ["remote", "get-url", "origin"]);
const repoFullName = remote.ok ? parseGithubRepo(remote.output) : "";
addCheck(
  "GitHub remote origin",
  remote.ok && repoFullName.length > 0,
  remote.ok
    ? remote.output.trim() + " (" + (repoFullName || "not a GitHub remote") + ")"
    : "origin remote missing",
  "Set origin to https://github.com/KIM-JONGIK/ninth-lab.git",
);

const ghAuth = run("gh", ["auth", "status"]);
addCheck(
  "GitHub CLI auth",
  ghAuth.ok && !/not logged|not authenticated/i.test(ghAuth.output),
  ghAuth.ok ? ghAuth.output.trim().split("\n")[0] : "gh auth status failed",
  "Run: gh auth login",
);

const publicBuildScripts =
  existsSync(join(root, "tools/build-public.mjs")) &&
  existsSync(join(root, "tools/verify-public-build.mjs"));
addCheck(
  "public deploy build",
  publicBuildScripts,
  publicBuildScripts
    ? "public build and verification scripts present"
    : "public build scripts missing",
  "Restore tools/build-public.mjs and tools/verify-public-build.mjs.",
);

const pagesWorkflowPath = ".github/workflows/github-pages-deploy.yml";
const pagesWorkflowExists = existsSync(join(root, pagesWorkflowPath));
const pagesWorkflow = pagesWorkflowExists ? read(pagesWorkflowPath) : "";
addCheck(
  "GitHub Pages workflow",
  pagesWorkflowExists &&
    pagesWorkflow.includes("push:") &&
    pagesWorkflow.includes("- main") &&
    pagesWorkflow.includes("workflow_dispatch:") &&
    pagesWorkflow.includes("pages: write") &&
    pagesWorkflow.includes("id-token: write") &&
    pagesWorkflow.includes("tools/verify-static-launch.mjs") &&
    pagesWorkflow.includes("tools/verify-content-safety.mjs") &&
    pagesWorkflow.includes("tools/verify-phrase-deck.mjs") &&
    pagesWorkflow.includes("tools/verify-time-scene.mjs") &&
    pagesWorkflow.includes("tools/verify-asset-provenance.mjs") &&
    pagesWorkflow.includes("tools/build-public.mjs") &&
    pagesWorkflow.includes("tools/verify-public-build.mjs") &&
    pagesWorkflow.includes("actions/configure-pages@v6.0.0") &&
    pagesWorkflow.includes("actions/upload-pages-artifact@v5.0.0") &&
    pagesWorkflow.includes("path: dist") &&
    pagesWorkflow.includes("actions/deploy-pages@v5"),
  pagesWorkflowExists ? pagesWorkflowPath + " present" : pagesWorkflowPath + " missing",
  "Add a GitHub Pages workflow that verifies, builds, uploads dist, and deploys with built-in permissions.",
);

const netlifyWorkflowPath = ".github/workflows/netlify-deploy.yml";
const netlifyWorkflowExists = existsSync(join(root, netlifyWorkflowPath));
const netlifyWorkflow = netlifyWorkflowExists ? read(netlifyWorkflowPath) : "";
addCheck(
  "Netlify automatic deploy disabled",
  netlifyWorkflowExists &&
    netlifyWorkflow.includes("workflow_dispatch:") &&
    !netlifyWorkflow.includes("push:"),
  netlifyWorkflowExists
    ? "Netlify is manual fallback only"
    : netlifyWorkflowPath + " missing",
  "Remove the push trigger from the Netlify workflow before pushing main.",
);

if (repoFullName) {
  const repoInfo = run("gh", ["repo", "view", repoFullName, "--json", "visibility"]);
  const visibility = parseJson(repoInfo.output).visibility || "";
  addCheck(
    "public GitHub repository",
    repoInfo.ok && visibility === "PUBLIC",
    repoInfo.ok ? "visibility=" + visibility : "could not read repository visibility",
    "GitHub Pages on GitHub Free requires a public repository.",
  );

  const pagesInfo = run("gh", ["api", "repos/" + repoFullName + "/pages"]);
  const pages = parseJson(pagesInfo.output);
  addCheck(
    "GitHub Pages site configuration",
    pagesInfo.ok && pages.build_type === "workflow",
    pagesInfo.ok
      ? "build_type=" + (pages.build_type || "unknown") + ", url=" + (pages.html_url || "pending")
      : "Pages site is not configured yet",
    "Create the Pages site with build_type=workflow in repository settings or the GitHub API.",
  );
} else {
  addCheck(
    "public GitHub repository",
    false,
    "GitHub repo remote could not be inferred",
    "Set the current GitHub origin before checking Pages.",
  );
  addCheck(
    "GitHub Pages site configuration",
    false,
    "GitHub repo remote could not be inferred",
    "Set the current GitHub origin before configuring Pages.",
  );
}

console.log("GitHub Pages readiness checks");
for (const check of checks) {
  console.log((check.ok ? "[pass] " : "[todo] ") + check.name + ": " + check.detail);
  if (!check.ok && check.fix) console.log("       fix: " + check.fix);
}

const failed = checks.filter((check) => !check.ok);
if (failed.length) {
  console.log(
    "\n" + failed.length + " item(s) must be resolved before GitHub Pages deploy.",
  );
  process.exit(1);
}

console.log("\nReady for GitHub Pages deploy without external deploy tokens.");
