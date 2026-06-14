# Risk Sizing Calculator

Generic risk sizing example for builders.

This does not include KamdenAI private signal logic. It simply shows how a user could size a position from public fields like entry and stop.

## Run

```bash
node risk-sizing.js --cash=5000 --risk=1 --entry=24.50 --stop=23.95
node risk-sizing.js --cash=10000 --risk=1 --entry=24.50 --stop=23.95
```

## Output

The script prints:

- planned risk dollars
- risk per share
- shares
- estimated position cost

Always verify sizing with your broker and your own risk rules.
