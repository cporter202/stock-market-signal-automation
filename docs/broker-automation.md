# Broker Automation

You can use signal webhooks as inputs for broker-connected workflows, but this should be handled with extreme care.

## Safer First Steps

Start with:

- alerts
- dashboards
- paper trading
- manual approval buttons
- order ticket prefill
- position sizing calculators

Avoid jumping directly to live automatic execution.

## Suggested Flow

```text
Webhook received
  -> verify signature
  -> validate signal fields
  -> calculate user-specific sizing
  -> show human approval
  -> send order to broker API
  -> log broker response
```

## Broker API Notes

Every broker is different. You need to understand:

- supported order types
- market hours
- extended-hours behavior
- buying power rules
- margin restrictions
- stop order behavior
- rate limits
- API permission scopes
- paper trading availability

## Hard Rule

Never store broker API keys in frontend code or public GitHub repos.

Use backend secrets, least-privilege keys, and paper trading first.
