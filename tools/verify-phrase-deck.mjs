import { readFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

const app = readFileSync(join(process.cwd(), "app.js"), "utf8");
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

const start = app.indexOf("function normalizePhrase");
const end = app.indexOf("function scrollShareCardIntoView", start);
assert(start >= 0, "Could not find phrase normalization helpers");
assert(end > start, "Could not isolate phrase deck helpers");

if (errors.length) {
  errors.forEach((error) => console.error(error));
  process.exit(1);
}

const deckSource = app.slice(start, end);
const storage = new Map();
const context = vm.createContext({
  sessionStorage: {
    getItem(key) {
      return storage.has(key) ? storage.get(key) : null;
    },
    setItem(key, value) {
      storage.set(key, String(value));
    },
    removeItem(key) {
      storage.delete(key);
    },
  },
});

vm.runInContext(
  [
    'const PHRASE_DECK_KEY = "ninthLabPhraseDeck.test";',
    "let phraseDeckState = {};",
    "function shuffle(items) { return [...items]; }",
    deckSource,
  ].join("\n"),
  context,
);

const result = vm.runInContext(
  [
    'const pool = ["하나", "둘", "셋", "넷", "다섯"];',
    "const firstCycle = [];",
    "for (let index = 0; index < pool.length; index += 1) {",
    '  firstCycle.push(nextDeckPhrase("scenario:pregame:hype", pool, firstCycle.at(-1) || ""));',
    "  phraseDeckState = readPhraseDecks();",
    "}",
    'const sixth = nextDeckPhrase("scenario:pregame:hype", pool, firstCycle.at(-1));',
    "phraseDeckState = readPhraseDecks();",
    'const otherFirst = nextDeckPhrase("scenario:chance:hype", pool, "");',
    "({ firstCycle, sixth, otherFirst, stored: JSON.parse(sessionStorage.getItem(PHRASE_DECK_KEY)) })",
  ].join("\n"),
  context,
);

assert(
  new Set(result.firstCycle).size === result.firstCycle.length,
  "A phrase repeated before the first deck cycle completed",
);
assert(
  result.firstCycle.length === 5,
  "The phrase deck did not return the full source pool",
);
assert(
  result.sixth !== result.firstCycle.at(-1),
  "The first phrase in a refilled deck repeated the immediately previous phrase",
);
assert(
  result.stored["scenario:pregame:hype"]?.length === 4,
  "The refilled deck was not persisted with four phrases remaining",
);
assert(
  result.stored["scenario:chance:hype"]?.length === 4,
  "Separate scenario and tone decks did not remain independent",
);

if (errors.length) {
  console.error("Phrase deck verification failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log(
  "Phrase deck verification passed. first-cycle=" +
    result.firstCycle.length +
    ", unique=" +
    new Set(result.firstCycle).size,
);
