# Troubleshooting

## My Test Webhook Works, But My Automation Does Nothing

Check whether your filter requires `data.count > 0`. Test events use `event: webhook.test` and may not include real signal arrays.

## I Got A No-Pick Payload

That is normal. It means the scan ran but no signals qualified.

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
