# Webhook Events

KamdenAI signal webhooks are event-based. Your endpoint receives a JSON payload whenever a selected event is published.

## Event List

| Event | Typical Time | Description |
| --- | --- | --- |
| `webhook.test` | On demand | Test event from the Developer API page |
| `morning_scan.created` | 9:28 AM ET | Morning plan scan |
| `confirmed_buys.created` | 9:30 AM ET | Official top-two confirmed buys |
| `quick_exit_results.created` | 10:05 AM ET | Official morning quick-exit result |

Market holidays, weekends, data provider issues, or system maintenance can affect event timing and availability.

## Shared Payload Shape

```json
{
  "event": "confirmed_buys.created",
  "dateKey": "2026-06-22",
  "sentAt": "2026-06-22T13:30:15.000Z",
  "data": {
    "confirmedBuys": []
  }
}
```

## Current Event Payloads

| Event | Primary data field | Notes |
| --- | --- | --- |
| `morning_scan.created` | `data.scan` | Includes the morning scan object with `buySignals` and `watchSignals` plan rows. |
| `confirmed_buys.created` | `data.confirmedBuys` | Contains only the official top-two 9:30 confirmations. Empty array means no official buys. |
| `quick_exit_results.created` | `data.quickExitResults` | Contains 10:05 result rows for confirmed buys. `noConfirmedBuys` can be true. |

## Signal Fields

Fields can vary by event, but signal-style payloads may include:

| Field | Meaning |
| --- | --- |
| `ticker` | Stock symbol |
| `company` | Company name when available |
| `entry` | Planned entry area |
| `stop` | Planned invalidation/stop area |
| `target` | Planned target area |
| `riskPerShare` | Entry minus stop |
| `rewardPerShare` | Target minus entry |
| `rMultipleTarget` | Target reward divided by risk |
| `setup` | Public setup label |
| `status` | Event-specific status |
| `notes` | Public notes when available |
| `shares` | Account-based share count when available |
| `riskDollars` | Estimated dollar risk when available |
| `openingConfirmation` | 9:30 confirmation details for confirmed-buy rows |
| `result.quickExit` | 10:05 quick-exit outcome for result rows |

## No-Pick Events

No-pick days are normal. Your automation should handle:

```json
{
  "event": "confirmed_buys.created",
  "dateKey": "2026-06-22",
  "sentAt": "2026-06-22T13:30:15.000Z",
  "data": {
    "confirmedBuys": [],
    "message": "No official top-two confirmed buys at 9:30."
  }
}
```

This is useful because it confirms the scan ran, even when nothing qualified.

## Idempotency

Webhook providers may retry deliveries. Store the delivery ID from the request headers and ignore duplicates.

Expected headers:

```text
X-KamdenAI-Event
X-KamdenAI-Delivery
X-KamdenAI-Timestamp
X-KamdenAI-Signature
```
