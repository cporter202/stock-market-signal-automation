# Getting Started

This guide explains the basic flow for building around stock market signal webhooks.

## The Big Idea

Signal events are posted inside the KamdenAI member community. Members can also send those same signal events to their own HTTPS webhook endpoint.

That means your endpoint can receive events and then route them wherever you want:

- Discord
- Slack
- email
- SMS
- Google Sheets
- dashboards
- AI agents
- internal apps
- broker workflow tools

## Basic Flow

1. Create an HTTPS endpoint.
2. Paste the endpoint URL into the Developer API page.
3. Select the event types you want.
4. Generate and save your signing secret.
5. Send a test webhook.
6. Verify the payload in your app or automation tool.
7. Build your workflow around the event data.

## Recommended First Integration

Start with Make.com or Zapier if you do not want to write code.

Start with the Node or Python receiver if you want full control.

## Local Testing

Most webhook providers require a public HTTPS URL. If you are testing locally, use a tunnel such as ngrok or Cloudflare Tunnel.

Example flow:

```text
KamdenAI -> HTTPS tunnel -> local webhook receiver -> logs/dashboard/Discord
```

## Production Checklist

- Verify webhook signatures.
- Store the signing secret in an environment variable.
- Log each delivery ID.
- Ignore duplicate delivery IDs.
- Add alerts for failed webhook processing.
- Keep broker keys separate from signal ingestion.
- Use manual confirmation before any live broker order.

## What Not To Do

- Do not put secrets in frontend JavaScript.
- Do not hard-code signing secrets into GitHub.
- Do not auto-trade real money without extensive testing.
- Do not assume every signal has picks.
- Do not assume a webhook delivery means you should enter a trade.
