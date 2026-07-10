import { readFileSync } from "node:fs";
import { join } from "node:path";

const app = readFileSync(join(process.cwd(), "app.js"), "utf8");
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function sourceBetween(start, end) {
  const startIndex = app.indexOf(start);
  const endIndex = app.indexOf(end, startIndex + start.length);
  assert(startIndex >= 0, `Missing content block start: ${start}`);
  assert(endIndex > startIndex, `Missing content block end: ${end}`);
  return startIndex >= 0 && endIndex > startIndex ? app.slice(startIndex, endIndex) : "";
}

function parseStrings(source) {
  return [...source.matchAll(/"((?:\\.|[^"\\])*)"/g)].map((match) => JSON.parse(match[0]));
}

function parseIndentedStrings(source, spaces) {
  const pattern = new RegExp(`^ {${spaces}}("(?:\\\\.|[^"\\\\])*")`, "gm");
  return [...source.matchAll(pattern)].map((match) => JSON.parse(match[1]));
}

const unsafeSource = app.match(/const unsafePattern\s*=\s*\n?\s*\/(.+)\/i;/)?.[1];
const scoreSource = app.match(/const officialScorePattern\s*=\s*\/(.+)\/i;/)?.[1];
const playerNumberSource = app.match(/const playerNumberPattern\s*=\s*\/(.+)\/i;/)?.[1];
assert(unsafeSource, "Could not read unsafePattern from app.js");
assert(scoreSource, "Could not read officialScorePattern from app.js");
assert(playerNumberSource, "Could not read playerNumberPattern from app.js");

const unsafePattern = unsafeSource ? new RegExp(unsafeSource, "i") : /$a/;
const officialScorePattern = scoreSource ? new RegExp(scoreSource, "i") : /$a/;
const playerNumberPattern = playerNumberSource ? new RegExp(playerNumberSource, "i") : /$a/;
const safeDisclosureTerms = [
  "선수/구단/리그와 무관",
  "공식 기록 아님",
  "공식기록아님",
  "중계 캡처 아님",
  "중계캡처아님",
  "캡처 없이 만든 짤",
  "캡처없이응원",
  "중계자료 없음",
  "로고 없음",
  "로고없음",
  "실명 없음",
  "실명없이",
  "비공식",
  "FAN-MADE",
  "fan-made",
];

function stripDisclosures(value) {
  return safeDisclosureTerms.reduce(
    (text, term) => text.split(term).join(""),
    String(value || ""),
  );
}

function verifyStrings(label, values) {
  const conflicts = [...new Set(values)].filter((value) => {
    const checked = stripDisclosures(value).normalize("NFKC");
    const compact = checked.replace(/[\s._-]+/g, "");
    return (
      unsafePattern.test(checked) ||
      unsafePattern.test(compact) ||
      officialScorePattern.test(checked) ||
      officialScorePattern.test(compact) ||
      playerNumberPattern.test(checked) ||
      playerNumberPattern.test(compact)
    );
  });
  conflicts.forEach((value) => errors.push(`${label} conflicts with the share filter: ${value}`));
}

const scenarioBlock = sourceBetween("const scenarios =", "const scenarioKeys");
const jjalBlock = sourceBetween("const jjalMoods =", "const jjalMoodKeys");
const quickBlock = sourceBetween("const quickJjals =", "const dailyPrompts");
const promptBlock = sourceBetween("const dailyPrompts =", "const dailyQuestions");
const questionBlock = sourceBetween("const dailyQuestions =", "const dailyHashes");
const hashBlock = sourceBetween("const dailyHashes =", "const fanTypes");
const fanTypeBlock = sourceBetween("const fanTypes =", "const fanTypeKeys");
const missionBlock = sourceBetween("const missionPhrases =", "function pick(");

const scenarioPhrases = parseIndentedStrings(scenarioBlock, 8);
const jjalPhrases = parseIndentedStrings(jjalBlock, 6);
const quickPhrases = [...quickBlock.matchAll(/\[\s*"[^"]+"\s*,\s*("(?:\\.|[^"\\])*")\s*\]/g)].map(
  (match) => JSON.parse(match[1]),
);
const dailyPrompts = parseStrings(promptBlock);
const dailyQuestions = parseStrings(questionBlock);
const dailyHashes = parseStrings(hashBlock);

verifyStrings("scenario", parseStrings(scenarioBlock));
verifyStrings("live reaction", parseStrings(jjalBlock));
verifyStrings("quick reaction", quickPhrases);
verifyStrings("daily prompt", dailyPrompts);
verifyStrings("daily question", dailyQuestions);
verifyStrings("daily hashtag", dailyHashes);
verifyStrings("fan type", parseStrings(fanTypeBlock));
verifyStrings("mission", parseStrings(missionBlock));

assert(scenarioPhrases.length >= 144, `Expected at least 144 scenario phrases, found ${scenarioPhrases.length}`);
assert(jjalPhrases.length >= 55, `Expected at least 55 live reaction phrases, found ${jjalPhrases.length}`);
assert(quickPhrases.length >= 21, `Expected at least 21 quick reactions, found ${quickPhrases.length}`);
assert(dailyPrompts.length >= 14, `Expected at least 14 daily prompts, found ${dailyPrompts.length}`);
assert(dailyQuestions.length >= 14, `Expected at least 14 daily questions, found ${dailyQuestions.length}`);
assert(dailyHashes.length >= 9, `Expected at least 9 daily hashtag sets, found ${dailyHashes.length}`);

const totalSources =
  scenarioPhrases.length +
  jjalPhrases.length +
  quickPhrases.length +
  dailyPrompts.length +
  dailyQuestions.length +
  dailyHashes.length;
assert(totalSources >= 257, `Expected at least 257 content sources, found ${totalSources}`);
assert(new Set(scenarioPhrases).size === scenarioPhrases.length, "Scenario phrase pool contains duplicates");
assert(new Set(jjalPhrases).size === jjalPhrases.length, "Live reaction phrase pool contains duplicates");

const evasionCases = ["류 현 진", "두 산", "K B O", "중 계 캡처", "17번 에이스"];
evasionCases.forEach((value) => {
  const compact = value.normalize("NFKC").replace(/[\s._-]+/g, "");
  const blocked =
    unsafePattern.test(value) ||
    unsafePattern.test(compact) ||
    playerNumberPattern.test(value) ||
    playerNumberPattern.test(compact);
  assert(blocked, `Safety filter evasion was not blocked: ${value}`);
});

if (errors.length) {
  console.error("Content safety verification failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Content safety verification passed. sources=${totalSources}, scenario=${scenarioPhrases.length}, live=${jjalPhrases.length}`,
);
