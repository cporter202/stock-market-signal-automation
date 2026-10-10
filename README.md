# KamdenAI Signal System & Automation Guide

**Eight ranked candidates. Clear decisions. A plan for every confirmation.**

[Explore KamdenAI membership](https://kamdenai.com) · [Understand the signal system](docs/signal-system.md) · [Build an integration](docs/getting-started.md)

KamdenAI brings opening stock rankings, published signal plans, recorded morning outcomes, and a member workspace into one focused routine. The opening board can confirm several candidates independently. Read each card's status before its rank: eight candidates does not mean eight trades.

This public guide explains the member experience and provides consumer-side webhook examples. All examples use fictional symbols and illustrative prices. The signal engine, selection formulas, weights, qualification thresholds, data-provider configuration, and production infrastructure remain private.

## The current signal workflow

| Stage | What it means |
| --- | --- |
| Before the open | Research and preparation provide context. They are not official signals and do not restrict the later opening field. |
| After opening review | Up to eight ranked candidates receive individual decisions. Zero to eight may be Confirmed, each with a published entry, stop, and target. Check the session date and actual publication time. |
| Morning results | The current modeled policy follows target or stop after eligible entry, then a 10:05 AM Eastern reference exit for remaining positions. Processing may finish later. |
| Separate 3 PM study | Hypothetical later holding comparisons and watchlist movement support review. They are excluded from official morning returns. |

Confirmed is an official signal, not a broker fill. Watch only, No buy, and Ungraded candidates are observation or incomplete-review records. Rank one can be Watch only while ranks two and five are Confirmed. No confirmed signals is a valid session outcome.

## Your member workspace

- **Feed → Signals:** opening rankings, individual decisions, published plans, and daily results.
- **Signal Results:** review recorded outcomes, including losses, no fills, and unavailable evidence.
- **Journal:** record your own broker fills, shares, exits, and notes separately from modeled results.
- **Stock News and community:** add context and discussion; member posts do not create official confirmations.
- **Developer webhooks:** route selected events into your own tools where available in your account.

KamdenAI does not place broker orders. Members choose whether to trade and control their own execution, position size, and combined exposure. A signal can lose money, and several confirmed names can lose together.

## Build around the published record

```text
KamdenAI published event
  -> signed webhook
  -> your verified HTTPS receiver
  -> private alerts / Sheets / dashboard / journal / AI summary
```

| Event | Purpose |
| --- | --- |
| `research_watchlist.created` | Research context, typically around 9:15 AM Eastern; preparation only |
| `morning_scan.created` | Pre-open preparation, typically around 9:28 AM Eastern; not confirmation |
| `confirmed_buys.created` | Official confirmed signals after opening review; iterate every confirmed row |
| `quick_exit_results.created` | Recorded morning outcomes using the 10:05 reference policy |

These are reference stages, not delivery guarantees. Use the actual publication timestamp when present, session date, and completion indicators. An empty array alone does not prove that every candidate was reviewed. Test events verify delivery, not the trading system.

## Start here

1. Read the [Signal System Guide](docs/signal-system.md).
2. Follow [Getting Started](docs/getting-started.md) and [Webhook Events](docs/webhook-events.md).
3. Review [Payload Fields](docs/payload-field-reference.md), [Security and Signing](docs/security-and-signing.md), and [Architecture](docs/architecture.md).
4. Choose an [Automation Recipe](docs/automation-recipes.md).
5. Read [Result Tracking](docs/historical-results.md) and [DISCLAIMER.md](DISCLAIMER.md).

## Illustrative confirmation payload

Abbreviated sample, not a live signal or a complete schema. Fictional symbol DEMOA is rank two; rank does not determine official status.

```json
{
  "event": "confirmed_buys.created",
  "dateKey": "2026-10-08",
  "sentAt": "2026-10-08T13:34:10.000Z",
  "data": {
    "publishedAt": "2026-10-08T13:34:05.000Z",
    "confirmedBuys": [{
      "ticker": "DEMOA",
      "entry": 20,
      "stop": 19.5,
      "target": 20.5,
      "openingConfirmation": {
        "officialRank": 2,
        "status": "confirmed_buy",
        "statusLabel": "Confirmed buy"
      }
    }]
  }
}
```

[More illustrative payloads](examples/payloads) include multiple confirmations, incomplete decisions, no-confirmation events, and modeled wins and losses. They are shortened teaching examples; check the Developer API documentation and test delivery in your account for available fields.

## Consumer examples

| Example | Purpose |
| --- | --- |
| [Node receiver](examples/node-webhook-receiver/README.md) | Receive and verify signed deliveries |
| [Python receiver](examples/python-webhook-receiver/README.md) | Flask receiver example |
| [Discord formatter](examples/discord-formatter/README.md) | Format event rows as alerts |
| [AI prompt builder](examples/ai-agent-prompt-builder/README.md) | Summarize without inventing confirmations or fills |
| [Risk sizing calculator](examples/risk-sizing-calculator/README.md) | Generic sizing arithmetic, not an account recommendation |
| [Simple dashboard](examples/simple-dashboard/README.md) | Preview fictional payloads locally |
| [Sheets logger](examples/google-sheets-logger/README.md) | Plan your event journal |

Alerts and integrations do not establish broker execution. Any broker workflow is your own separate integration; start with paper trading and human review. Historical and modeled returns do not guarantee future performance.

## Public information boundary

Contribute member-facing explanations and consumer tooling only. Never include private source code, strategy research, selection rules, thresholds, credentials, signing secrets, infrastructure configuration, or paid member records. See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md).

MIT applies to this repository's public materials; see [LICENSE](LICENSE). It does not grant access to KamdenAI's private engine or member data.
