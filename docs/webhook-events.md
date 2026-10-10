# Webhook Events

Use your account's Developer API documentation and test delivery as the source of truth for available fields. These public examples are abbreviated illustrations.

| Event | Reference stage | Data to read |
| --- | --- | --- |
| `webhook.test` | On demand | Connection test only |
| `research_watchlist.created` | Around 9:15 AM Eastern | `data.researchWatchlist`; research only |
| `morning_scan.created` | Around 9:28 AM Eastern | `data.scan.buySignals` and `watchSignals`; preparation only |
| `confirmed_buys.created` | After opening review | `data.confirmedBuys`; zero to eight official confirmations |
| `quick_exit_results.created` | Morning outcome processing | `data.quickExitResults`; target, stop, or 10:05 reference outcomes |

Pre-open lists do not restrict the later official opening field. Do not cap confirmations at two, assume rank one is official, or infer confirmation from a preparation field named `buySignals`.

## Read the full decision context

When present, `data.confirmationResults` contains candidate decisions, including observation and incomplete-review records. Only `confirmedBuys` represents the official confirmed list. `openingConfirmation.officialRank` preserves a candidate's board rank; `status` and `statusLabel` describe its decision.

Use `dateKey` for the session, `data.publishedAt` for actual publication when provided, and `sentAt` for delivery creation. Neither reference schedule nor receipt time proves fresh publication. Preserve completion indicators such as `confirmationComplete` when included.

## Empty, incomplete, and test events

An empty confirmed list means that this payload supplies no official confirmations. Check completion and candidate statuses before calling it a completed no-signal session. Missing evidence is not a failed qualification. No event arriving is a separate delivery/availability issue.

A result event can have no confirmed buys to report. A confirmed signal can also have No fill or unavailable results. Do not convert these to profitable trades, losses, or zero-return fills. Test events do not prove a scan ran.

See [no-picks.json](../examples/payloads/no-picks.json) and [confirmed-buys.json](../examples/payloads/confirmed-buys.json).

## Results and studies

`result.quickExit` contains modeled morning outcome information when available. Read finalization, status, execution basis, and result basis before calculating returns. Separate `studyResults`, when present, must not be added to official morning results. See [Result Tracking](historical-results.md).

## Delivery handling

Verify signatures against the raw request body, reject stale timestamps, and store `X-KamdenAI-Delivery` for duplicate protection. Deliveries may be retried. Markets, data availability, and processing affect timing; reference times are not guarantees.

See [Security and Signing](security-and-signing.md).
