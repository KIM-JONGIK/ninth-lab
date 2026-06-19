import { copyFileSync, cpSync, mkdirSync, rmSync } from "node:fs";
import { isAbsolute, join, relative, resolve } from "node:path";

const root = process.cwd();
const outDir = resolve(root, "dist");

function assertInsideRoot(path) {
  const rel = relative(root, path);
  if (rel.startsWith("..") || isAbsolute(rel)) {
    throw new Error(`Refusing to write outside the project root: ${path}`);
  }
}

assertInsideRoot(outDir);
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const files = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "service-worker.js",
  "robots.txt",
  "404.html",
  "_headers",
];

const directories = [
  "assets",
  "legal",
];

for (const file of files) {
  copyFileSync(join(root, file), join(outDir, file));
}

for (const directory of directories) {
  cpSync(join(root, directory), join(outDir, directory), { recursive: true });
}

console.log(`Public deploy directory prepared: ${relative(root, outDir)}`);
