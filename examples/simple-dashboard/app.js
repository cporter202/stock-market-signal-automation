const input = document.querySelector("#payloadInput");
const button = document.querySelector("#renderButton");
const errorText = document.querySelector("#errorText");
const preview = document.querySelector("#preview");

input.value = JSON.stringify({
  event: "confirmed_buys.created",
  dateKey: "2026-06-12",
  sentAt: "2026-06-12T13:45:00.000Z",
  data: {
    count: 1,
    signals: [
      {
        ticker: "ABCD",
        company: "Example Holdings",
        entry: 24.5,
        stop: 23.95,
        target: 25.6,
        rMultipleTarget: 2,
        status: "confirmed_buy"
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
  const rows = data.signals || data.results || [];

  if (rows.length === 0) {
    const empty = document.createElement("div");
    empty.className = "card";
    empty.innerHTML = `<strong>No picks</strong><div class="meta">${data.message || "No qualifying signals for this event."}</div>`;
    preview.appendChild(empty);
    return;
  }

  for (const row of rows) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <strong>${row.ticker || "Unknown"} ${row.company ? `- ${row.company}` : ""}</strong>
      <div class="meta">Entry: ${money(row.entry)} | Stop: ${money(row.stop)} | Target: ${money(row.target)}</div>
      <div class="meta">Status: ${row.status || "n/a"} | Target R: ${row.rMultipleTarget || row.maxR || "n/a"}</div>
    `;
    preview.appendChild(card);
  }
}

button.addEventListener("click", render);
render();
