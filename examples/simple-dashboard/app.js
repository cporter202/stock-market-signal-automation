const input = document.querySelector("#payloadInput");
const button = document.querySelector("#renderButton");
const errorText = document.querySelector("#errorText");
const preview = document.querySelector("#preview");

input.value = JSON.stringify({
  "event": "confirmed_buys.created",
  "dateKey": "2026-10-08",
  "sentAt": "2026-10-08T13:34:10.000Z",
  "data": {
    "confirmedBuys": [
      {
        "ticker": "DEMOA",
        "name": "Illustrative candidate A",
        "entry": 20,
        "stop": 19.5,
        "target": 20.5,
        "openingConfirmation": {
          "officialRank": 2,
          "status": "confirmed_buy",
          "statusLabel": "Confirmed buy"
        }
      },
      {
        "ticker": "DEMOB",
        "name": "Illustrative candidate B",
        "entry": 40,
        "stop": 39,
        "target": 41,
        "openingConfirmation": {
          "officialRank": 5,
          "status": "confirmed_buy",
          "statusLabel": "Confirmed buy"
        }
      }
    ]
  }
}, null, 2);

function money(value) {
  return typeof value === "number" ? `$${value.toFixed(2)}` : "n/a";
}

function render() {
  errorText.textContent = "";
  preview.innerHTML = "";

  let payload;
  try {
    payload = JSON.parse(input.value);
  } catch (error) {
    errorText.textContent = "Invalid JSON payload.";
    return;
  }

  const header = document.createElement("div");
  header.className = "card";
  header.innerHTML = `
    <strong>${payload.event || "Unknown event"}</strong>
    <div class="meta">Date: ${payload.dateKey || "n/a"} | Sent: ${payload.sentAt || "n/a"}</div>
  `;
  preview.appendChild(header);

  const data = payload.data || {};
  const note = document.createElement("div");
  note.className = "meta";
  note.textContent = payload.event === "morning_scan.created" || payload.event === "research_watchlist.created"
    ? "Preparation only. Not official signals."
    : "Illustrative data. Modeled outcomes are not broker fills; studies stay separate.";
  preview.appendChild(note);
  const rows = rowsForPayload(payload);

  if (rows.length === 0) {
    const empty = document.createElement("div");
    empty.className = "card";
    empty.innerHTML = `<strong>No rows supplied</strong><div class="meta">${data.message || "No rows supplied. Check event type and review completion."}</div>`;
    preview.appendChild(empty);
    return;
  }

  for (const row of rows) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <strong>${row.ticker || "Unknown"} ${row.company || row.name ? `- ${row.company || row.name}` : ""}</strong>
      <div class="meta">Entry: ${money(row.entry)} | Stop: ${money(row.stop)} | Target: ${money(row.target)}</div>
      <div class="meta">${row.openingConfirmation?.statusLabel || row.status || "n/a"}</div>
      <div class="meta">${row.result?.quickExit?.statusLabel || ""}</div>
    `;
    preview.appendChild(card);
  }
}

function rowsForPayload(payload) {
  const data = payload.data || {};
  if (Array.isArray(data.researchWatchlist)) return data.researchWatchlist;
  if (Array.isArray(data.confirmedBuys)) return data.confirmedBuys;
  if (Array.isArray(data.quickExitResults)) return data.quickExitResults;
  if (data.scan) return [...(data.scan.buySignals || []), ...(data.scan.watchSignals || [])];
  return [];
}

button.addEventListener("click", render);
render();
