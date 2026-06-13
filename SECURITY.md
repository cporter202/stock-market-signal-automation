# Security

This public repo should never contain production secrets, private keys, paid signal data, Firebase config, webhook signing secrets, or proprietary scan logic.

## If You Find a Secret

If you believe a secret was accidentally committed, immediately rotate the secret in the owning platform and remove it from git history before relying on the new value.

## Webhook Security Basics

- Use HTTPS endpoints only.
- Keep signing secrets private.
- Verify signatures before trusting payloads.
- Reject old timestamps to reduce replay risk.
- Never expose broker API keys in frontend code.
- Use paper trading before any live execution workflow.
- Add manual confirmation for broker-connected automations.
- Log delivery IDs so duplicate events can be ignored.

## Public Repo Boundary

This repo is intentionally limited to consumer-side examples:

- webhook receiver examples
- signature verification examples
- payload formatting examples
- dashboard examples
- automation checklists

It does not include internal signal generation rules or private platform code.
