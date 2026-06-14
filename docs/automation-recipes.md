# Automation Recipes

These are public-safe ways to build around signal webhooks without exposing private strategy logic.

## Discord Alert Channel

```text
Webhook received
  -> if data.count > 0
  -> format message
  -> post to #confirmed-buys
```

Best for: community alerts, private groups, personal signal rooms.

## Google Sheets Signal Log

```text
Webhook received
  -> iterate data.signals[]
  -> append row to sheet
  -> include delivery ID
```

Best for: tracking, audits, trade review, no-code history.

## AI Agent Brief

```text
Webhook received
  -> build prompt from payload
  -> ask agent to summarize without financial advice
  -> send summary to email or Discord
```

Best for: plain-English daily summaries, personal prep notes, searchable context.

## Private Dashboard

```text
Webhook received
  -> save raw payload in database
  -> normalize latest signals
  -> frontend reads normalized rows
```

Best for: custom UI, advanced filtering, result review.

## Broker Workflow Helper

```text
Webhook received
  -> verify signature
  -> calculate user sizing
  -> create draft order ticket
  -> require manual approval
```

Best for: experienced builders. Start with paper trading.

## No-Pick Day Logger

```text
Webhook received
  -> if data.count = 0
  -> log scan ran successfully
  -> send optional "no picks today" note
```

Best for: proving your automation is working even when the market gives no setups.
