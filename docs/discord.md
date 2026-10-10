# Discord Integration

Discord is a strong first use case for signal webhooks. You can create a private channel that receives formatted signal alerts automatically.

## Simple Flow

```text
KamdenAI -> Make/Zapier/custom receiver -> Discord channel
```

## Recommended Channels

- `#plan-scan`
- `#confirmed-buys`
- `#quick-exit-results`
- `#no-picks-log`

## Message Format

Example confirmed buy message:

```text
Confirmed Buy Signals - 2026-10-08

DEMOA (fictional)
Entry: $20.00
Stop: $19.50
Target: $20.50
Opening decision: Confirmed buy (rank 2)

Educational signal only. Trade at your own risk.
```

## No-Pick Message

```text
No official confirmations supplied; check review completion.
Session: 2026-10-08. No rows alone does not establish completed review.
```

## Example Formatter

See [examples/discord-formatter](../examples/discord-formatter).
