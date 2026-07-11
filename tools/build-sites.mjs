import { copyFileSync, cpSync, mkdirSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, relative, resolve } from "node:path";

const root = process.cwd();
const outDir = resolve(root, "dist");
const clientDir = join(outDir, "client");
const serverDir = join(outDir, "server");

execFileSync(process.execPath, [join(root, "tools", "build-public.mjs")], {
  cwd: root,
  stdio: "inherit",
});

mkdirSync(clientDir, { recursive: true });
mkdirSync(serverDir, { recursive: true });

const files = [
  "index.html",
  "styles.css",
  "time-scene.js",
  "app.js",
  "manifest.webmanifest",
  "service-worker.js",
  "robots.txt",
  "404.html",
  "_headers",
];

for (const file of files) {
  copyFileSync(join(root, file), join(clientDir, file));
}

for (const directory of ["assets", "legal"]) {
  cpSync(join(root, directory), join(clientDir, directory), { recursive: true });
}

copyFileSync(join(root, "sites-worker.js"), join(serverDir, "index.js"));
writeFileSync(join(serverDir, "package.json"), '{"type":"module"}\n');

console.log(`Sites deploy directory prepared: ${relative(root, outDir)}`);
