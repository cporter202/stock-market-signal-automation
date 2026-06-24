# Historical Account Examples

This page shows a public-safe structure for reviewing the current KamdenAI signal framework against your own received webhook data.

These numbers are not financial advice, not a promise of future results, and not a guarantee that the same outcome will happen again. They are included to show how signal data, risk sizing, and result tracking can be studied in a structured way.

## Test Window

| Item | Value |
| --- | --- |
| Test period | May 13, 2026 to June 12, 2026 |
| Trading days checked | 22 |
| Stock universe | 75 tickers |
| Signal type | 9:30 AM ET official top-two confirmed buys |
| Official exit | 10:05 AM ET quick exit |
| Base account model | $5,000 account |
| Risk model | Account-based sizing, commonly shown as 2% of available cash |

## Current Model

The live system is focused on the morning window:

- 9:28 AM ET: the plan scan builds entry, stop, target, and sizing context.
- 9:30 AM ET: valid names are ranked by opening strength, and only the top two become official buys.
- 10:05 AM ET: the quick-exit result locks the official morning outcome.

## Account Size Examples

These examples show how the sizing basis can be represented in your own logs.

| Account size | Risk setting | Max risk dollars |
| --- | --- | ---: |
| $5,000 | 2% of available cash | $100 |
| $10,000 | 2% of available cash | $200 |

Real fills, liquidity, slippage, broker rules, order timing, and user decisions can change actual results.

## Why This Matters

The point is not just "signals were green." The useful part is the process:

- signals were generated from a repeatable framework
- entries, stops, targets, and R-multiple context were defined
- every signal could be logged automatically
- no-pick days could still be recorded
- users could route the same signal data into dashboards, sheets, alerts, AI agents, or broker workflows
- 10:05 quick-exit results could be reviewed instead of guessed from memory

That is the value of combining signal webhooks with a disciplined tracking layer.

## Important Notes

- Past performance does not guarantee future performance.
- A signal can move in favor and still become a losing trade depending on execution and exit decisions.
- The 10:05 quick-exit result is a study/result field, not a command to trade.
- Brokerage fees, spread, slippage, taxes, and partial fills are not modeled here.
- These examples are educational and should be validated with your own testing.
