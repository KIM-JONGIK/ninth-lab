import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const index = readFileSync(join(root, "index.html"), "utf8");
const app = readFileSync(join(root, "app.js"), "utf8");
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function attr(attrs, name) {
  const match = attrs.match(new RegExp(`\\b${name}="([^"]+)"`, "i"));
  return match?.[1] || "";
}

const interactiveTags = [...index.matchAll(/<(button|a|summary|select|input|textarea)\b([^>]*)>/gi)];
const buttons = interactiveTags
  .filter((match) => match[1].toLowerCase() === "button")
  .map((match) => match[2]);

const selectorBindings = new Map(
  [...app.matchAll(/const\s+(\w+)\s*=\s*document\.querySelector\("#([^"]+)"\);/g)].map(
    (match) => [match[2], match[1]],
  ),
);

const delegatedButtons = [
  {
    attribute: "data-builder-pane",
    wiring: ["builderPaneTabs.forEach", 'tab.addEventListener("click"'],
  },
  {
    attribute: "data-fan-type",
    wiring: ["fanTypeGrid.addEventListener", "applyFanType(button.dataset.fanType)"],
  },
  {
    attribute: "data-mission",
    wiring: ["missionChoice.addEventListener", "selectMission(button.dataset.mission)"],
  },
  {
    attribute: "data-daily-card",
    wiring: ["dailyList.addEventListener", "applyDailyContentCard(button.dataset.dailyCard)"],
  },
  {
    attribute: "data-mood",
    wiring: ['document.querySelectorAll(".pulse-vote")', 'button.addEventListener("click"'],
  },
];

for (const attrs of buttons) {
  const delegated = delegatedButtons.find(({ attribute }) => attr(attrs, attribute));
  if (delegated) {
    delegated.wiring.forEach((needle) =>
      assert(app.includes(needle), `${delegated.attribute} button wiring is missing: ${needle}`),
    );
    continue;
  }

  const id = attr(attrs, "id");
  assert(id, `Static button has neither id nor supported data action: ${attrs.trim()}`);
  if (!id) continue;

  const binding = selectorBindings.get(id);
  assert(binding, `Button #${id} has no querySelector binding`);
  if (binding) {
    assert(app.includes(`${binding}.addEventListener("click"`), `Button #${id} has no click listener`);
  }
}

const formControls = interactiveTags.filter((match) =>
  ["select", "input", "textarea"].includes(match[1].toLowerCase()),
);
for (const match of formControls) {
  const id = attr(match[2], "id");
  if (!id) continue;
  assert(selectorBindings.has(id), `${match[1].toLowerCase()} #${id} has no querySelector binding`);
}

const viewLinks = interactiveTags.filter(
  (match) => match[1].toLowerCase() === "a" && attr(match[2], "data-view-target"),
);
assert(viewLinks.length >= 14, `Expected desktop and mobile app navigation, found ${viewLinks.length} links`);
assert(app.includes("appTabs.forEach"), "App navigation links are not wired");
assert(
  app.includes('activateAppView("generator", { updateHash: true })'),
  "Card-producing actions must keep the active view and URL hash in sync",
);

const detailsCount = (index.match(/<details\b/gi) || []).length;
const summaryCount = interactiveTags.filter((match) => match[1].toLowerCase() === "summary").length;
assert(detailsCount === summaryCount, `details/summary mismatch: details=${detailsCount}, summary=${summaryCount}`);

assert((index.match(/name="ratio"/g) || []).length === 3, "Share ratio controls must include three radios");
assert((index.match(/name="background"/g) || []).length === 5, "Card background controls must include five radios");
assert(app.includes("backgroundInputs.forEach"), "Background radio group is not wired");
assert(
  app.includes("document.querySelectorAll('input[name=\"ratio\"]').forEach"),
  "Share ratio radio group is not wired",
);

const quickJjalBlock = app.match(/const quickJjals = \[([\s\S]*?)\n\];\n\nconst dailyPrompts/)?.[1] || "";
const quickJjalCount = (quickJjalBlock.match(/^\s*\["/gm) || []).length;
assert(quickJjalCount >= 21, `Expected at least 21 runtime quick-jjal buttons, found ${quickJjalCount}`);
assert(app.includes("renderQuickJjals"), "Runtime quick-jjal button renderer is missing");
assert(app.includes("quickJjalGrid.addEventListener"), "Runtime quick-jjal buttons are not wired");

for (const action of ["restore", "remix", "copy", "delete"]) {
  assert(app.includes(`historyButton("`) && app.includes(`"${action}"`), `History action is missing: ${action}`);
}
assert(app.includes("cardHistoryList.addEventListener"), "History action delegation is missing");
assert(app.includes('button.addEventListener("click"'), "Runtime toast action button is not wired");

if (errors.length) {
  console.error("Interaction wiring verification failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Interaction wiring verification passed. staticButtons=${buttons.length}, runtimeQuickJjals=${quickJjalCount}, controls=${interactiveTags.length}`,
);
