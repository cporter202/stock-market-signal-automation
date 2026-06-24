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
  "If there are no rows, say that the event ran with no official picks.",
  "",
  `Event: ${payload.event || "unknown"}`,
  `Date: ${payload.dateKey || "unknown"}`,
  `Count: ${data.confirmedBuyCount ?? rows.length}`,
  "",
  "Payload:",
  JSON.stringify(payload, null, 2)
].join("\n");

console.log(prompt);
