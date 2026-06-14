# Launch Checklist

Use this before sharing a webhook integration with other people.

## Public Repo Safety

- [ ] No API keys
- [ ] No signing secrets
- [ ] No broker credentials
- [ ] No Firebase config
- [ ] No paid signal data
- [ ] No private scoring or scan rules

## Webhook Receiver

- [ ] HTTPS endpoint
- [ ] Signature verification
- [ ] Timestamp replay protection
- [ ] Delivery ID duplicate protection
- [ ] 2xx response on success
- [ ] Error logging

## Automation Behavior

- [ ] Handles no-pick days
- [ ] Handles empty arrays
- [ ] Handles missing optional fields
- [ ] Handles retries
- [ ] Stores raw payload when needed

## Trading Safety

- [ ] No promise of profit
- [ ] Clear educational disclaimer
- [ ] Paper trading first for broker workflows
- [ ] Manual approval before live orders
- [ ] User controls risk and execution

## Funnel Setup

- [ ] README explains what can be built
- [ ] README links to live KamdenAI access
- [ ] Examples are easy to run
- [ ] Historical examples include assumptions
- [ ] Disclaimers are visible
