import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync("time-scene.js", "utf8");
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function runScene(hour, search = "") {
  class FakeDate {
    getHours() {
      return hour;
    }
  }

  const documentElement = { dataset: {} };
  const links = [];
  const document = {
    currentScript: { src: "https://example.test/ninth-lab/time-scene.js" },
    readyState: "complete",
    documentElement,
    head: { append: (link) => links.push(link) },
    createElement: () => ({ dataset: {} }),
    querySelector: () => null,
    querySelectorAll: () => [],
  };
  const window = {
    location: { search },
    dispatchEvent: () => {},
    setInterval: () => 0,
  };
  const context = vm.createContext({
    CustomEvent: class CustomEvent {},
    Date: FakeDate,
    URL,
    URLSearchParams,
    document,
    window,
  });
  vm.runInContext(source, context);
  return {
    scene: documentElement.dataset.timeScene,
    source: window.NINTH_LAB_TIME_SCENE.assetForScene(documentElement.dataset.timeScene),
  };
}

assert(runScene(5).scene === "night", "05:59 must use the night scene");
assert(runScene(6).scene === "day", "06:00 must use the day scene");
assert(runScene(17).scene === "day", "17:59 must use the day scene");
assert(runScene(18).scene === "night", "18:00 must use the night scene");
assert(runScene(23, "?scene=day").scene === "day", "day verification override must be deterministic");
assert(runScene(12, "?scene=night").scene === "night", "night verification override must be deterministic");
assert(runScene(12).source.endsWith("/assets/stadium-day.png"), "day scene must use stadium-day.png");
assert(runScene(23).source.endsWith("/assets/stadium-night.png"), "night scene must use stadium-night.png");

if (errors.length) {
  console.error("Time scene verification failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Time scene verification passed. day=06:00-17:59, night=18:00-05:59");
