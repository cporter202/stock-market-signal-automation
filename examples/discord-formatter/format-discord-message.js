const fs = require("node:fs");
const path = require("node:path");

const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: node format-discord-message.js ../payloads/confirmed-buys.json");
  process.exit(1);
}

const payload = JSON.parse(fs.readFileSync(path.resolve(inputPath), "utf8"));
const data = payload.data || {};
const signals = rowsForPayload(payload);

function money(value) {
  return typeof value === "number" ? `$${value.toFixed(2)}` : "n/a";
}

function titleForEvent(event) {
  return {
    "morning_scan.created": "9:28 Plan Scan",
    "confirmed_buys.created": "9:30 Top-Two Buys",
    "quick_exit_results.created": "10:05 Quick Exit Results",
    "webhook.test": "Webhook Test"
  }[event] || "Signal Event";
}

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

const lines = [`${titleForEvent(payload.event)} - ${payload.dateKey}`];

if (signals.length === 0) {
  lines.push("");
  lines.push(data.message || "No qualifying signals for this event.");
} else {
  for (const signal of signals) {
    lines.push("");
    const companyName = signal.company || signal.name;
    lines.push(`${signal.ticker}${companyName ? ` - ${companyName}` : ""}`);
    if (typeof signal.entry === "number") lines.push(`Entry: ${money(signal.entry)}`);
    if (typeof signal.stop === "number") lines.push(`Stop: ${money(signal.stop)}`);
    if (typeof signal.target === "number") lines.push(`Target: ${money(signal.target)}`);
    if (typeof signal.rMultipleTarget === "number") lines.push(`Target R: ${signal.rMultipleTarget.toFixed(2)}R`);
    if (typeof signal.shares === "number") lines.push(`Shares: ${signal.shares}`);
    if (signal.openingConfirmation?.statusLabel) lines.push(`9:30: ${signal.openingConfirmation.statusLabel}`);
    if (signal.result?.quickExit) {
      const exit = signal.result.quickExit;
      lines.push(`10:05: ${money(exit.price)}${typeof exit.r === "number" ? ` (${exit.r.toFixed(2)}R)` : ""}`);
      if (exit.statusLabel) lines.push(`Result: ${exit.statusLabel}`);
    }
    if (typeof signal.maxR === "number") lines.push(`Max R: ${signal.maxR.toFixed(2)}R`);
    if (signal.status) lines.push(`Status: ${signal.status}`);
  }
}

lines.push("");
lines.push("Educational signal only. Trade at your own risk.");

console.log(lines.join("\n"));
