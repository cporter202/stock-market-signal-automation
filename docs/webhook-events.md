# Webhook Events

KamdenAI signal webhooks are event-based. Your endpoint receives a JSON payload whenever a selected event is published.

## Event List

| Event | Typical Time | Description |
| --- | --- | --- |
| `webhook.test` | On demand | Test event from the Developer API page |
| `morning_scan.created` | 9:00 AM ET | Morning setup scan |
| `fast_movers.created` | 9:33 AM ET | Fast mover watch |
| `confirmed_buys.created` | 9:45 AM ET | Confirmed buy signals |
| `afternoon_report.created` | 3:15 PM ET | Results and next-day prep |

Market holidays, weekends, data provider issues, or system maintenance can affect event timing and availability.

## Shared Payload Shape

```json
{
  "event": "confirmed_buys.created",
  "dateKey": "2026-06-12",
  "sentAt": "2026-06-12T13:45:00.000Z",
  "data": {
    "count": 1,
    "signals": []
  }
}
```

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

## No-Pick Events

No-pick days are normal. Your automation should handle:

```json
{
  "event": "confirmed_buys.created",
  "dateKey": "2026-06-12",
  "sentAt": "2026-06-12T13:45:00.000Z",
  "data": {
    "count": 0,
    "signals": [],
    "message": "No confirmed buy signals today."
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
