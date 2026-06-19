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
      output: `${error.stdout || ""}${error.stderr || ""}${error.message || ""}`,
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
  return `${match.groups.owner}/${match.groups.repo}`;
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
  gitStatus.ok && gitStatus.output.trim() === "" ? "working tree clean" : gitStatus.output.trim() || "git status failed",
  "Commit or intentionally stash local changes before deploying.",
);

const remote = run("git", ["remote", "get-url", "origin"]);
const repoFullName = remote.ok ? parseGithubRepo(remote.output) : "";
addCheck(
  "GitHub remote origin",
  remote.ok && repoFullName.length > 0,
  remote.ok ? `${remote.output.trim()} (${repoFullName || "not a GitHub remote"})` : "origin remote missing",
  "Set the current repo remote: git remote add origin https://github.com/KIM-JONGIK/ninth-lab.git",
);

const ghAuth = run("gh", ["auth", "status"]);
addCheck(
  "GitHub CLI auth",
  ghAuth.ok && !/not logged|not authenticated/i.test(ghAuth.output),
  ghAuth.ok ? ghAuth.output.trim().split("\n")[0] : "gh auth status failed",
  "Run: gh auth login",
);

const netlifyConfig = existsSync(join(root, "netlify.toml"));
addCheck(
  "Netlify config",
  netlifyConfig,
  netlifyConfig ? "netlify.toml present" : "netlify.toml missing",
  "Restore netlify.toml before deploying.",
);

const publicBuildScripts = existsSync(join(root, "tools/build-public.mjs")) && existsSync(join(root, "tools/verify-public-build.mjs"));
addCheck(
  "public deploy build",
  publicBuildScripts,
  publicBuildScripts ? "public build and verification scripts present" : "public build scripts missing",
  "Restore tools/build-public.mjs and tools/verify-public-build.mjs.",
);

const workflowPath = ".github/workflows/netlify-deploy.yml";
const workflowExists = existsSync(join(root, workflowPath));
const workflow = workflowExists ? read(workflowPath) : "";
addCheck(
  "GitHub Actions Netlify workflow",
  workflowExists
    && workflow.includes("push:")
    && workflow.includes("- main")
    && workflow.includes("workflow_dispatch:")
    && workflow.includes("tools/verify-static-launch.mjs")
    && workflow.includes("tools/build-public.mjs")
    && workflow.includes("tools/verify-public-build.mjs")
    && workflow.includes("netlify-cli deploy")
    && workflow.includes("--dir dist")
    && workflow.includes("secrets.NETLIFY_AUTH_TOKEN")
    && workflow.includes("secrets.NETLIFY_SITE_ID"),
  workflowExists ? `${workflowPath} present` : `${workflowPath} missing`,
  "Add .github/workflows/netlify-deploy.yml with main push, source verification, public build, public build verification, and Netlify CLI deploy.",
);

if (repoFullName) {
  const secrets = run("gh", ["secret", "list", "--repo", repoFullName]);
  const hasAuthToken = /\bNETLIFY_AUTH_TOKEN\b/.test(secrets.output);
  const hasSiteId = /\bNETLIFY_SITE_ID\b/.test(secrets.output);
  addCheck(
    "GitHub Actions secrets",
    secrets.ok && hasAuthToken && hasSiteId,
    secrets.ok ? `NETLIFY_AUTH_TOKEN=${hasAuthToken ? "present" : "missing"}, NETLIFY_SITE_ID=${hasSiteId ? "present" : "missing"}` : "could not list GitHub Actions secrets",
    "Set secrets: gh secret set NETLIFY_AUTH_TOKEN --repo KIM-JONGIK/ninth-lab and gh secret set NETLIFY_SITE_ID --repo KIM-JONGIK/ninth-lab",
  );
} else {
  addCheck(
    "GitHub Actions secrets",
    false,
    "GitHub repo remote could not be inferred",
    "Set origin to the GitHub repo before checking Actions secrets.",
  );
}

console.log("Deploy readiness checks");
for (const check of checks) {
  console.log(`${check.ok ? "[pass]" : "[todo]"} ${check.name}: ${check.detail}`);
  if (!check.ok && check.fix) console.log(`       fix: ${check.fix}`);
}

const failed = checks.filter((check) => !check.ok);
if (failed.length) {
  console.log(`\n${failed.length} item(s) must be resolved before GitHub Actions Netlify deploy.`);
  process.exit(1);
}

console.log("\nReady for GitHub Actions Netlify deploy.");
