# Discord Integration

Discord is a strong first use case for signal webhooks. You can create a private channel that receives formatted signal alerts automatically.

## Simple Flow

```text
KamdenAI -> Make/Zapier/custom receiver -> Discord channel
```

## Recommended Channels

- `#confirmed-buys`
- `#fast-movers`
- `#daily-scan`
- `#results-report`
- `#no-picks-log`

## Message Format

Example confirmed buy message:

```text
Confirmed Buy Signals - 2026-06-12

ABCD
Entry: $24.50
Stop: $23.95
Target: $25.60
Target R: 2.00R

Educational signal only. Trade at your own risk.
```

## No-Pick Message

```text
No confirmed buy signals today.
Scan ran successfully for 2026-06-12.
```

## Example Formatter

See [examples/discord-formatter](../examples/discord-formatter).
