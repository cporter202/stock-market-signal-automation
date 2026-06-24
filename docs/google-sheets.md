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

Use `data.scan.buySignals[]` and `data.scan.watchSignals[]` for the 9:28 plan scan, `data.confirmedBuys[]` for the 9:30 official buys, and `data.quickExitResults[]` for the 10:05 result.

For no-pick days, add a single row with:

- Event
- Date
- Count: 0 or noConfirmedBuys: true
- Message

## Why Log No-Pick Days?

No-pick rows prove the scan ran. That makes your logs cleaner because you can distinguish "nothing qualified" from "the webhook broke."

## Template

See [examples/google-sheets-logger](../examples/google-sheets-logger).
