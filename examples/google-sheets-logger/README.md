# Google Sheets Logger

This example is a no-code pattern for logging signal events into Google Sheets.

## Sheet Columns

Create a sheet with these columns:

```text
Received At
Date Key
Event
Ticker
Company
Entry
Stop
Target
Risk Per Share
Reward Per Share
Target R
Status
Delivery ID
Message
```

## Make.com Scenario

1. Webhooks: Custom webhook
2. Router:
   - Route A: rows exist for the selected event
   - Route B: no official picks or `data.noConfirmedBuys = true`
3. Route A:
   - Iterator over `data.scan.buySignals[]`, `data.scan.watchSignals[]`, `data.confirmedBuys[]`, or `data.quickExitResults[]`
   - Google Sheets: Add a row
4. Route B:
   - Google Sheets: Add a no-pick row

## Why This Works

You get a full event history, including days where no signals qualified.
