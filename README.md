# Stock Market Signal Automation

Build your own data-driven market edge with swing-trade signal webhooks, dashboards, alerts, AI agents, and automation examples.

This repo is a public starter kit for traders, builders, and developers who want to route stock market signal data into their own tools. It shows how to receive signal webhooks, verify webhook signatures, format alerts, log payloads, and build simple automations around signal events.

Live signal access is available through KamdenAI memberships at https://kamdenai.com. This repo uses sample data only.

## What You Can Build

- Discord signal alert channels
- Slack, email, or SMS alerts
- Google Sheets signal logs
- Make or Zapier automation flows
- Private signal dashboards
- AI agent workflows
- Broker workflow helpers using supported broker APIs
- Custom back-office tools for tracking signal history
- Your own execution layer, if you understand the risks and your broker supports it

## How It Works

KamdenAI publishes signal events during the trading day. A member can add an HTTPS webhook endpoint inside their account. When selected events are released, KamdenAI sends a JSON payload to that endpoint.

Typical event schedule:

| Time | Event | Purpose |
| --- | --- | --- |
| 9:00 AM ET | `morning_scan.created` | Setup scan candidates |
| 9:33 AM ET | `fast_movers.created` | Fast mover watch |
| 9:45 AM ET | `confirmed_buys.created` | Confirmed buy signals |
| 3:15 PM ET | `afternoon_report.created` | Results and next-day prep |

If no picks qualify, the webhook can still send an event with `count: 0` and an empty signal list. That lets your automation know the scan ran successfully.

## Start Here

1. Read [Getting Started](docs/getting-started.md).
2. Review the [Webhook Events](docs/webhook-events.md).
3. Review the [Historical Account Examples](docs/historical-results.md).
4. Learn [Security and Signing](docs/security-and-signing.md).
5. Pick an integration:
   - [Make.com guide](docs/make-com.md)
   - [Discord guide](docs/discord.md)
   - [Google Sheets guide](docs/google-sheets.md)
   - [AI agents guide](docs/ai-agents.md)
6. Run a local receiver:
   - [Node webhook receiver](examples/node-webhook-receiver/README.md)
   - [Python webhook receiver](examples/python-webhook-receiver/README.md)

## Example Payload

```json
{
  "event": "confirmed_buys.created",
  "dateKey": "2026-06-12",
  "sentAt": "2026-06-12T13:45:00.000Z",
  "data": {
    "count": 2,
    "signals": [
      {
        "ticker": "ABCD",
        "company": "Example Holdings",
        "entry": 24.5,
        "stop": 23.95,
        "target": 25.6,
        "riskPerShare": 0.55,
        "rewardPerShare": 1.1,
        "rMultipleTarget": 2,
        "setup": "20 EMA pullback",
        "status": "confirmed_buy"
      }
    ]
  }
}
```

See more examples in [examples/payloads](examples/payloads).

## Important Boundaries

This repo does not include:

- KamdenAI proprietary scan logic
- Internal scoring formulas
- Private infrastructure code
- Firebase configuration
- API keys
- Signing secrets
- Live paid signal data
- Guaranteed trading outcomes

This is a consumer-side starter kit. It teaches people how to receive, verify, route, and build around webhook data.

## Safety Notes

Trading involves risk. Signals, alerts, dashboards, and automation examples are educational tools. They are not financial advice and are not instructions to buy, sell, hold, short, or trade any security.

If you build broker-connected workflows, test in paper trading first, understand your broker API, add manual approval where appropriate, and never risk money you cannot afford to lose.

Read [DISCLAIMER.md](DISCLAIMER.md) before using or modifying these examples.

## Repo Structure

```text
docs/
  ai-agents.md
  broker-automation.md
  discord.md
  getting-started.md
  google-sheets.md
  historical-results.md
  make-com.md
  security-and-signing.md
  troubleshooting.md
  webhook-events.md
examples/
  discord-formatter/
  google-sheets-logger/
  node-webhook-receiver/
  payloads/
  python-webhook-receiver/
  simple-dashboard/
templates/
  make-scenario-checklist.md
  webhook-consumer-checklist.md
```

## License

MIT. See [LICENSE](LICENSE).
