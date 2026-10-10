# Troubleshooting

## No rows or no delivery

An empty array supplies no rows for that event. Inspect event type, review completion, and candidate decisions before calling it a completed no-signal session. A test event checks delivery only. No delivery is a separate issue: check the selected events, endpoint, and delivery history.

## Missing or delayed decisions

Check session date, actual publication time, and connection status. Ungraded candidates have incomplete evidence; do not infer confirmation or failure. Valid confirmed candidates can coexist with incomplete candidates.

## Results differ from a broker account

System outcomes use a stated model and evidence. Broker timing, prices, shares, costs, and exits can differ. Record personal execution in Journal. No fill and unavailable results are not completed return observations.

## Duplicate events or signature errors

Store delivery IDs to ignore retries. Verify the original raw body with the signing format documented in your account. Check the timestamp, server clock, and secret without printing credentials in logs. See [Security and Signing](security-and-signing.md).
