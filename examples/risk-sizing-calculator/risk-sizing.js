function readArg(name, fallback) {
  const arg = process.argv.find((value) => value.startsWith(`--${name}=`));
  if (!arg) return fallback;
  const parsed = Number(arg.split("=")[1]);
  return Number.isFinite(parsed) ? parsed : fallback;
}

const cash = readArg("cash", 5000);
const riskPercent = readArg("risk", 1);
const entry = readArg("entry", 24.5);
const stop = readArg("stop", 23.95);

const plannedRiskDollars = cash * (riskPercent / 100);
const riskPerShare = Math.max(entry - stop, 0);
const shares = riskPerShare > 0 ? Math.floor(plannedRiskDollars / riskPerShare) : 0;
const positionCost = shares * entry;

console.log(JSON.stringify({
  cash,
  riskPercent,
  plannedRiskDollars: Number(plannedRiskDollars.toFixed(2)),
  entry,
  stop,
  riskPerShare: Number(riskPerShare.toFixed(2)),
  shares,
  positionCost: Number(positionCost.toFixed(2))
}, null, 2));
