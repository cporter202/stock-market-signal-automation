# Make.com Guide

Make.com is one of the easiest ways to turn signal webhooks into automations without writing code.

## Basic Setup

1. Create a new scenario.
2. Add the Webhooks app.
3. Choose Custom webhook.
4. Create a webhook.
5. Copy the Make webhook URL.
6. Paste it into the KamdenAI Developer API page.
7. Select the events you want.
8. Click Send Test.

If Make shows the test payload, the connection works.

## Common Automations

- Send the 9:28 plan scan, 9:30 confirmed buys, and 10:05 quick-exit results to Discord.
- Add rows to Google Sheets.
- Send yourself an SMS when `confirmed_buys.created` has picks.
- Create a daily Notion page.
- Feed payloads into an AI summarizer.
- Store all events in Airtable.

## Filter Example

Only continue if a confirmed-buy event has official picks:

```text
length(data.confirmedBuys) > 0
```

Route no-pick days separately:

```text
length(data.confirmedBuys) = 0
```

## Useful Fields

In Make, you can map:

- `event`
- `dateKey`
- `sentAt`
- `data.scan.buySignals[]`
- `data.scan.watchSignals[]`
- `data.confirmedBuys[]`
- `data.quickExitResults[]`
- `data.message`

## Signing Secret

Make can receive the webhook without signature verification, but production workflows should verify signatures if possible.

If you cannot verify signatures inside Make directly, keep the webhook URL private and consider routing through your own small receiver first.
