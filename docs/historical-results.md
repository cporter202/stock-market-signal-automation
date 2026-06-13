# Historical Account Examples

This page shows a recent historical candle-data example of how the signal framework performed when applied to a small account model.

These numbers are not financial advice, not a promise of future results, and not a guarantee that the same outcome will happen again. They are included to show how signal data, risk sizing, and result tracking can be studied in a structured way.

## Test Window

| Item | Value |
| --- | --- |
| Test period | May 13, 2026 to June 12, 2026 |
| Trading days checked | 22 |
| Stock universe | 75 tickers |
| Signal type | 9:45 AM ET confirmed buys |
| Market filter shown | CAUTION market: 4-star setups only |
| Base account model | $5,000 account |
| Risk model | About 1% planned risk per setup, reduced in CAUTION conditions |

## 30-Day Summary

For the 9:45 AM confirmed-buy model with the CAUTION 4-star filter:

| Metric | Result |
| --- | ---: |
| Confirmed buys | 94 |
| Trades with positive movement after confirmation | 94 / 94 |
| Trades that moved at least +1R | 30 / 94 |
| Target hits | 9 / 94 |
| Stop touches after confirmation | 8 / 94 |
| Average max move | 0.95R |
| Simulated P/L if held to 3 PM | +$1,479.43 |
| Intraday-high study value | +$3,676.10 |

The intraday-high number is included as a ceiling-style study metric. It does not mean a trader would capture the exact high of every move.

## Account Size Examples

These examples assume the same signal set and proportional position sizing.

| Account size | Planned risk model | Held to 3 PM simulation | Intraday-high study value |
| --- | --- | ---: | ---: |
| $5,000 | About $50 max planned risk per setup | +$1,479.43 | +$3,676.10 |
| $10,000 | About $100 max planned risk per setup | +$2,958.86 | +$7,352.20 |

The $10,000 example is a proportional scaling example. Real fills, liquidity, slippage, broker rules, order timing, and user decisions can change actual results.

## Why This Matters

The point is not just "signals were green." The useful part is the process:

- signals were generated from a repeatable framework
- entries, stops, targets, and R-multiple context were defined
- every signal could be logged automatically
- no-pick days could still be recorded
- users could route the same signal data into dashboards, sheets, alerts, AI agents, or broker workflows
- results could be reviewed after the session instead of guessed from memory

That is the value of combining signal webhooks with a disciplined tracking layer.

## Important Notes

- Past performance does not guarantee future performance.
- A signal can move in favor and still become a losing trade depending on execution and exit decisions.
- The intraday-high study value is not the same as a realistic exit system.
- Brokerage fees, spread, slippage, taxes, and partial fills are not modeled here.
- These examples are educational and should be validated with your own testing.
