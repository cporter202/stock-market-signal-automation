# Illustrative Payloads

All symbols, prices, decisions, and results here are fictional. These shortened examples show consumer handling, not a full schema or private engine logic. Check your account's Developer API documentation and test delivery.

- `research-watchlist.json` and `morning-scan.json`: preparation only.
- `confirmed-buys.json`: eight candidate decisions, ranks two and five confirmed, rank seven incomplete. `confirmationComplete: false` does not invalidate the supplied confirmed decisions or qualify the incomplete candidate.
- `no-picks.json`: completed review with no official confirmations.
- `quick-exit-results.json`: modeled target win and stop loss for the same two confirmations; no broker fills and no embedded cost adjustment.
- `historical-results-example.json`: tracking assumptions, not historical performance.
- `webhook-test.json`: delivery test only.

No fills and unavailable results are separate states. Do not invent result values when evidence is missing. Afternoon studies stay separate from morning returns.
