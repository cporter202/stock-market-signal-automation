# Security and Signing

Webhook signing lets your receiver confirm that a payload came from KamdenAI and was not modified in transit.

## Headers

KamdenAI sends these headers with signed deliveries:

```text
X-KamdenAI-Event
X-KamdenAI-Delivery
X-KamdenAI-Timestamp
X-KamdenAI-Signature
```

## Verification Concept

The exact signing string should match the Developer API documentation inside the product. A common pattern is:

```text
timestamp.rawBody
```

Then compute an HMAC SHA-256 signature using the signing secret.

## Node Example

```js
import crypto from "node:crypto";

function verifySignature({ rawBody, timestamp, signature, secret }) {
  const payload = `${timestamp}.${rawBody}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(expected, "hex")
  );
}
```

## Python Example

```python
import hmac
import hashlib

def verify_signature(raw_body: bytes, timestamp: str, signature: str, secret: str) -> bool:
    payload = timestamp.encode("utf-8") + b"." + raw_body
    expected = hmac.new(secret.encode("utf-8"), payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(signature, expected)
```

## Replay Protection

Reject old timestamps. A common tolerance is 5 minutes.

## Secret Storage

Store secrets in environment variables:

```text
KAMDENAI_SIGNING_SECRET=whsec_example_do_not_commit
```

Never commit real secrets to GitHub.
