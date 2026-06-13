import crypto from "node:crypto";
import express from "express";

const app = express();
const port = Number(process.env.PORT || 3000);
const signingSecret = process.env.KAMDENA_SIGNING_SECRET || "";

app.use(express.raw({ type: "application/json" }));

function verifySignature(rawBody, timestamp, signature) {
  if (!signingSecret || !timestamp || !signature) return false;

  const payload = `${timestamp}.${rawBody.toString("utf8")}`;
  const expected = crypto
    .createHmac("sha256", signingSecret)
    .update(payload)
    .digest("hex");

  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  if (signatureBuffer.length !== expectedBuffer.length) return false;
  return crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
}

function isRecentTimestamp(timestamp) {
  const deliveredAt = Number(timestamp);
  if (!Number.isFinite(deliveredAt)) return false;

  const ageMs = Math.abs(Date.now() - deliveredAt);
  return ageMs <= 5 * 60 * 1000;
}

app.post("/webhook", (req, res) => {
  const event = req.header("X-KamdenAI-Event");
  const deliveryId = req.header("X-KamdenAI-Delivery");
  const timestamp = req.header("X-KamdenAI-Timestamp");
  const signature = req.header("X-KamdenAI-Signature");

  if (signingSecret) {
    if (!isRecentTimestamp(timestamp || "")) {
      return res.status(401).json({ error: "stale_timestamp" });
    }

    if (!verifySignature(req.body, timestamp, signature)) {
      return res.status(401).json({ error: "invalid_signature" });
    }
  }

  const payload = JSON.parse(req.body.toString("utf8"));
  const count = payload.data?.count ?? payload.data?.signals?.length ?? 0;

  console.log({
    event,
    deliveryId,
    dateKey: payload.dateKey,
    count
  });

  res.json({ ok: true });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Webhook receiver listening on http://localhost:${port}`);
});
