const fs = require("node:fs");
const path = require("node:path");

const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: node prompt-builder.js ../payloads/confirmed-buys.json");
  process.exit(1);
}

const payload = JSON.parse(fs.readFileSync(path.resolve(inputPath), "utf8"));
const data = payload.data || {};
const rows = rowsForPayload(payload);

function rowsForPayload(payload) {
  const eventData = payload.data || {};
  if (Array.isArray(eventData.researchWatchlist)) return eventData.researchWatchlist;
  if (Array.isArray(eventData.confirmedBuys)) return eventData.confirmedBuys;
  if (Array.isArray(eventData.quickExitResults)) return eventData.quickExitResults;
  if (eventData.scan) {
    return [
      ...(eventData.scan.buySignals || []),
      ...(eventData.scan.watchSignals || [])
    ];
  }
  return [];
}

const prompt = [
  "You are reviewing a stock signal webhook payload.",
  "Summarize the event in plain English for a trader.",
  "Do not provide financial advice.",
  "Do not invent missing fields.",
  "Preparation and research are not confirmations. Rank alone is not an official status.",
  "Keep morning outcomes, afternoon studies, and broker fills separate.",
  "No fill and unavailable evidence are not completed trade returns.",
  "If there are no rows, report no rows supplied; do not infer scan completion.",
  "",
  `Event: ${payload.event || "unknown"}`,
  `Date: ${payload.dateKey || "unknown"}`,
  `Count: ${data.confirmedBuyCount ?? rows.length}`,
  "",
  "Payload:",
  JSON.stringify(payload, null, 2)
].join("\n");

console.log(prompt);
