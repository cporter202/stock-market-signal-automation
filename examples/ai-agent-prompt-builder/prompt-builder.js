const fs = require("node:fs");
const path = require("node:path");

const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: node prompt-builder.js ../payloads/confirmed-buys.json");
  process.exit(1);
}

const payload = JSON.parse(fs.readFileSync(path.resolve(inputPath), "utf8"));
const data = payload.data || {};
const rows = data.signals || data.results || [];

const prompt = [
  "You are reviewing a stock signal webhook payload.",
  "Summarize the event in plain English for a trader.",
  "Do not provide financial advice.",
  "Do not invent missing fields.",
  "If there are no signals, say that the scan ran with no qualifying picks.",
  "",
  `Event: ${payload.event || "unknown"}`,
  `Date: ${payload.dateKey || "unknown"}`,
  `Count: ${data.count ?? rows.length}`,
  "",
  "Payload:",
  JSON.stringify(payload, null, 2)
].join("\n");

console.log(prompt);
