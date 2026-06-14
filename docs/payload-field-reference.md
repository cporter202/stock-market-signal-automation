# Payload Field Reference

Webhook payloads are JSON. Fields can vary by event, but these are the common public fields used by the examples in this repo.

## Root Fields

| Field | Type | Description |
| --- | --- | --- |
| `event` | string | Event type, such as `confirmed_buys.created` |
| `dateKey` | string | Trading date in `YYYY-MM-DD` format |
| `sentAt` | string | ISO timestamp for when the webhook was sent |
| `data` | object | Event-specific payload |

## Common Data Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | number | Number of signals or rows in the event |
| `signals` | array | Signal rows for setup, fast mover, or confirmed buy events |
| `results` | array | Result rows for afternoon report events |
| `message` | string | Human-readable message, often used for no-pick days |
| `nextDayPrep` | array | Watch notes for the next trading session when available |

## Signal Fields

| Field | Type | Description |
| --- | --- | --- |
| `ticker` | string | Public ticker symbol |
| `company` | string | Company name when available |
| `entry` | number | Planned entry area |
| `stop` | number | Planned invalidation area |
| `target` | number | Planned target area |
| `riskPerShare` | number | Entry minus stop |
| `rewardPerShare` | number | Target minus entry |
| `rMultipleTarget` | number | Reward divided by risk |
| `setup` | string | Public setup label |
| `status` | string | Event-specific status |
| `notes` | string | Public notes when available |

## Headers

Signed deliveries can include:

```text
X-KamdenAI-Event
X-KamdenAI-Delivery
X-KamdenAI-Timestamp
X-KamdenAI-Signature
```

Store `X-KamdenAI-Delivery` if you need duplicate protection.

## Handling Missing Fields

Your integration should be defensive:

- treat optional fields as optional
- handle `count: 0`
- handle empty arrays
- ignore unknown fields
- avoid inventing data that was not sent
