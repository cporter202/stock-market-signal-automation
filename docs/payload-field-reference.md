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
| `scanId` | string | Firestore-style scan ID when included |
| `scan` | object | Morning plan scan for `morning_scan.created` |
| `confirmedBuys` | array | Official top-two rows for `confirmed_buys.created` |
| `quickExitResults` | array | 10:05 result rows for `quick_exit_results.created` |
| `confirmedBuyCount` | number | Number of 9:30 confirmed buys for quick-exit events |
| `noConfirmedBuys` | boolean | True when there were no official 9:30 buys |
| `message` | string | Human-readable message, often used for no-pick days |
| `sizingBasis` | object | Account-sizing context when personalized sizing is enabled |

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
| `shares` | number | Account-sized share count when available |
| `riskDollars` | number | Estimated dollar risk for the plan when available |
| `openingConfirmation` | object | 9:30 confirmation details when available |

## Quick Exit Fields

Quick-exit rows usually include `result.quickExit`:

| Field | Type | Description |
| --- | --- | --- |
| `result.quickExit.label` | string | Usually `10:05 AM quick exit` |
| `result.quickExit.price` | number | Price captured for the 10:05 result |
| `result.quickExit.profitDollars` | number | Estimated P/L using the personalized share count |
| `result.quickExit.r` | number | Result in R units |
| `result.quickExit.status` | string | Event-specific status such as `profit` or `loss` |
| `result.quickExit.statusLabel` | string | Human-readable result label |

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
- handle empty `confirmedBuys` and `quickExitResults` arrays
- handle empty arrays
- ignore unknown fields
- avoid inventing data that was not sent
