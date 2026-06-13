const fs = require("node:fs");
const path = require("node:path");

const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: node format-discord-message.js ../payloads/confirmed-buys.json");
  process.exit(1);
}

const payload = JSON.parse(fs.readFileSync(path.resolve(inputPath), "utf8"));
const data = payload.data || {};
const signals = data.signals || data.results || [];

function money(value) {
  return typeof value === "number" ? `$${value.toFixed(2)}` : "n/a";
}

function titleForEvent(event) {
  return {
    "morning_scan.created": "Morning Setup Scan",
    "fast_movers.created": "Fast Mover Watch",
    "confirmed_buys.created": "Confirmed Buy Signals",
    "afternoon_report.created": "Afternoon Results + Prep",
    "webhook.test": "Webhook Test"
  }[event] || "Signal Event";
}

const lines = [`${titleForEvent(payload.event)} - ${payload.dateKey}`];

if (signals.length === 0) {
  lines.push("");
  lines.push(data.message || "No qualifying signals for this event.");
} else {
  for (const signal of signals) {
    lines.push("");
    lines.push(`${signal.ticker}${signal.company ? ` - ${signal.company}` : ""}`);
    if (typeof signal.entry === "number") lines.push(`Entry: ${money(signal.entry)}`);
    if (typeof signal.stop === "number") lines.push(`Stop: ${money(signal.stop)}`);
    if (typeof signal.target === "number") lines.push(`Target: ${money(signal.target)}`);
    if (typeof signal.rMultipleTarget === "number") lines.push(`Target R: ${signal.rMultipleTarget.toFixed(2)}R`);
    if (typeof signal.maxR === "number") lines.push(`Max R: ${signal.maxR.toFixed(2)}R`);
    if (signal.status) lines.push(`Status: ${signal.status}`);
  }
}

lines.push("");
lines.push("Educational signal only. Trade at your own risk.");

console.log(lines.join("\n"));
