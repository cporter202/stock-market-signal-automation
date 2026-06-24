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
Confirmed Buy Signals - 2026-06-22

SOFI
Entry: $24.50
Stop: $23.95
Target: $25.60
9:30: Top 1 confirmed buy

Educational signal only. Trade at your own risk.
```

## No-Pick Message

```text
No official top-two confirmed buys at 9:30.
Plan scan ran successfully for 2026-06-22.
```

## Example Formatter

See [examples/discord-formatter](../examples/discord-formatter).
