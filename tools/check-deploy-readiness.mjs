import { execFileSync, execSync } from "node:child_process";
import { existsSync } from "node:fs";
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

function runShell(command) {
  try {
    const output = execSync(command, {
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
addCheck(
  "git remote origin",
  remote.ok && remote.output.trim().length > 0,
  remote.ok ? remote.output.trim() : "origin remote missing",
  "After GitHub login: gh repo create ninth-lab --public --source=. --remote=origin --push",
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

const netlifyStatus = runShell("npx netlify-cli status");
addCheck(
  "Netlify CLI auth",
  netlifyStatus.ok && !/not logged|please log in/i.test(netlifyStatus.output),
  netlifyStatus.ok ? netlifyStatus.output.trim().split("\n")[0] : "netlify status failed",
  "Run: npx netlify-cli login",
);

console.log("Deploy readiness checks");
for (const check of checks) {
  console.log(`${check.ok ? "[pass]" : "[todo]"} ${check.name}: ${check.detail}`);
  if (!check.ok && check.fix) console.log(`       fix: ${check.fix}`);
}

const failed = checks.filter((check) => !check.ok);
if (failed.length) {
  console.log(`\n${failed.length} item(s) must be resolved before GitHub-connected Netlify deploy.`);
  process.exit(1);
}

console.log("\nReady for GitHub-connected Netlify deploy.");
