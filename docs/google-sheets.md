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
Webhook trigger -> Iterator over data.signals[] -> Google Sheets Add Row
```

For no-pick days, add a single row with:

- Event
- Date
- Count: 0
- Message

## Why Log No-Pick Days?

No-pick rows prove the scan ran. That makes your logs cleaner because you can distinguish "nothing qualified" from "the webhook broke."

## Template

See [examples/google-sheets-logger](../examples/google-sheets-logger).
