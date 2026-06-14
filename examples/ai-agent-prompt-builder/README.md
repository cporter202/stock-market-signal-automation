# AI Agent Prompt Builder

This example converts a webhook payload into a safe AI-agent prompt.

It is designed for summaries, dashboards, and workflow routing. It does not tell the agent to make trading decisions or invent missing data.

## Run

```bash
node prompt-builder.js ../payloads/confirmed-buys.json
node prompt-builder.js ../payloads/no-picks.json
```

## Use Cases

- daily signal summary
- Discord explanation
- personal watch note
- trade journal draft
- AI agent routing input

Keep broker execution behind separate risk controls and human approval.
