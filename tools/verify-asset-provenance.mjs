import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";

const root = process.cwd();
const manifestPath = join(root, "assets", "asset-manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

const entries = Array.isArray(manifest.assets) ? manifest.assets : [];
assert(entries.length > 0, "Asset manifest must contain at least one asset");

for (const entry of entries) {
  const bytes = readFileSync(join(root, entry.path));
  const actualHash = createHash("sha256").update(bytes).digest("hex");
  assert(actualHash === entry.sha256, `${entry.path} hash differs from the provenance manifest`);
  assert(entry.source_type, `${entry.path} is missing source_type`);
  assert(Array.isArray(entry.constraints) && entry.constraints.length > 0, `${entry.path} is missing rights constraints`);
  if (entry.source_type === "ai-generated") {
    assert(entry.generator, `${entry.path} is missing its generator`);
    assert(entry.generation_id, `${entry.path} is missing its generation ID`);
    assert(entry.generated_at, `${entry.path} is missing its generation timestamp`);
  }
}

const trackedNames = new Set(entries.map((entry) => basename(entry.path)));
const publicAssets = readdirSync(join(root, "assets")).filter((name) => /\.(png|jpe?g|webp|svg)$/i.test(name));
publicAssets.forEach((name) => {
  assert(trackedNames.has(name), `Public visual asset is missing from the provenance manifest: assets/${name}`);
});

if (errors.length) {
  console.error("Asset provenance verification failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Asset provenance verification passed. assets=${entries.length}`);
