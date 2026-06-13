import hashlib
import hmac
import json
import os
import time

from dotenv import load_dotenv
from flask import Flask, jsonify, request

load_dotenv()

app = Flask(__name__)
SIGNING_SECRET = os.getenv("KAMDENA_SIGNING_SECRET", "")
PORT = int(os.getenv("PORT", "3000"))


def is_recent_timestamp(timestamp: str) -> bool:
    try:
        delivered_at = int(timestamp)
    except (TypeError, ValueError):
        return False

    age_ms = abs(int(time.time() * 1000) - delivered_at)
    return age_ms <= 5 * 60 * 1000


def verify_signature(raw_body: bytes, timestamp: str, signature: str) -> bool:
    if not SIGNING_SECRET or not timestamp or not signature:
        return False

    signed_payload = timestamp.encode("utf-8") + b"." + raw_body
    expected = hmac.new(
        SIGNING_SECRET.encode("utf-8"),
        signed_payload,
        hashlib.sha256,
    ).hexdigest()

    return hmac.compare_digest(signature, expected)


@app.post("/webhook")
def webhook():
    raw_body = request.get_data()
    event = request.headers.get("X-KamdenAI-Event")
    delivery_id = request.headers.get("X-KamdenAI-Delivery")
    timestamp = request.headers.get("X-KamdenAI-Timestamp")
    signature = request.headers.get("X-KamdenAI-Signature")

    if SIGNING_SECRET:
        if not is_recent_timestamp(timestamp):
            return jsonify({"error": "stale_timestamp"}), 401
        if not verify_signature(raw_body, timestamp, signature):
            return jsonify({"error": "invalid_signature"}), 401

    payload = json.loads(raw_body.decode("utf-8"))
    data = payload.get("data", {})
    count = data.get("count", len(data.get("signals", [])))

    print({
        "event": event,
        "deliveryId": delivery_id,
        "dateKey": payload.get("dateKey"),
        "count": count,
    })

    return jsonify({"ok": True})


@app.get("/health")
def health():
    return jsonify({"ok": True})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)
