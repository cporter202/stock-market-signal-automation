# Node Webhook Receiver

Minimal Express receiver for KamdenAI-style signal webhooks.

## Setup

```bash
npm install
cp .env.example .env
npm start
```

Then expose the local server with an HTTPS tunnel:

```bash
ngrok http 3000
```

Paste the HTTPS forwarding URL plus `/webhook` into your Developer API page.

## Environment

```text
KAMDENAI_SIGNING_SECRET=whsec_example_do_not_commit
PORT=3000
```

## Endpoint

```text
POST /webhook
```

The example logs the event, delivery ID, and signal count.
