# Google Sheets Logging

Google Sheets is useful for keeping a clean signal history.

## Suggested Columns

- Date
- Event
- Ticker
- Company
- Entry
- Stop
- Target
- Risk per share
- Reward per share
- Target R
- Status
- Notes
- Delivery ID
- Received at

## Make.com Flow

```text
Webhook trigger -> pick rows by event -> Google Sheets Add Row
```

Use `data.scan.buySignals[]` and `data.scan.watchSignals[]` for the 9:28 plan scan, `data.confirmedBuys[]` for the official opening signals, and `data.quickExitResults[]` for the 10:05 result.

For no-pick days, add a single row with:

- Event
- Date
- Count: 0 or noConfirmedBuys: true
- Message

## Why Log No-Pick Days?

Completed no-confirmation records document an outcome; empty rows alone do not prove review completion. That makes your logs cleaner because you can distinguish "nothing qualified" from "the webhook broke."

## Template

See [examples/google-sheets-logger](../examples/google-sheets-logger).
