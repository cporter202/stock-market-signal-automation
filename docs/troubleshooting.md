# Troubleshooting

## My Test Webhook Works, But My Automation Does Nothing

Check whether your filter is looking at the current event field. The current rows live in `data.scan.buySignals`, `data.scan.watchSignals`, `data.confirmedBuys`, or `data.quickExitResults` depending on the event.

## I Got A No-Pick Payload

That is normal. It means the scan ran but no official top-two buys qualified, or the 10:05 result event had no confirmed buys to report.

## I See Duplicate Events

Store `X-KamdenAI-Delivery` and ignore delivery IDs you already processed.

## Signature Verification Fails

Common causes:

- you parsed JSON before capturing the raw body
- wrong signing secret
- wrong signing string
- timestamp included incorrectly
- uppercase/lowercase header mismatch

## Make.com Says Internal Error

Check:

- the webhook URL starts with `https://`
- the webhook URL is copied completely
- the Make scenario is turned on or listening
- the endpoint returns a 2xx response

## Nothing Shows In My Delivery Log

Check that the webhook is saved, active, and tied to the correct signed-in account. Also confirm your membership is active.
