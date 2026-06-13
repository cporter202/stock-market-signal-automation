# Webhook Consumer Checklist

Use this checklist before putting a webhook consumer into production.

## Endpoint

- [ ] Public HTTPS URL
- [ ] Responds within 5 seconds
- [ ] Returns 2xx on success
- [ ] Logs errors clearly

## Security

- [ ] Signing secret stored outside git
- [ ] Signature verification enabled
- [ ] Timestamp replay protection enabled
- [ ] Delivery ID dedupe enabled

## Data Handling

- [ ] Handles `data.count = 0`
- [ ] Handles missing optional fields
- [ ] Handles retries
- [ ] Stores raw event if needed
- [ ] Normalizes signal rows

## Trading Safety

- [ ] No automatic live orders without testing
- [ ] Paper trading tested
- [ ] Manual approval step considered
- [ ] Broker API keys stored securely
- [ ] Risk rules handled outside the public repo
