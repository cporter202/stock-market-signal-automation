# Make Scenario Checklist

Use this checklist when building a Make.com scenario for signal webhooks.

## Webhook Trigger

- [ ] Create Custom webhook.
- [ ] Copy the HTTPS webhook URL.
- [ ] Paste it into the Developer API page.
- [ ] Select desired events.
- [ ] Send a test webhook.
- [ ] Confirm Make receives `webhook.test`.

## Routing

- [ ] Add route for `confirmed_buys.created`.
- [ ] Add route for `fast_movers.created`.
- [ ] Add route for `morning_scan.created`.
- [ ] Add route for `afternoon_report.created`.
- [ ] Add route for `data.count = 0`.

## Actions

- [ ] Send Discord message.
- [ ] Add Google Sheets row.
- [ ] Send email/SMS alert.
- [ ] Store raw payload.
- [ ] Log delivery ID.

## Safety

- [ ] Do not expose signing secret.
- [ ] Do not expose broker keys.
- [ ] Use manual review for broker-connected workflows.
- [ ] Test no-pick events.
