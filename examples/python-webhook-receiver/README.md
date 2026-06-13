# Python Webhook Receiver

Minimal Flask receiver for KamdenAI-style signal webhooks.

## Setup

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python app.py
```

Use an HTTPS tunnel for local testing, then paste the public URL plus `/webhook` into your Developer API page.
