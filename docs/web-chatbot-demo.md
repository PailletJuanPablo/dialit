# Web Chatbot Demo

`examples/web-chatbot` is a standalone local app that consumes Nexembot through the public TypeScript API. It is intentionally outside `src` so UI code does not become part of the library.

## Run It

Install the example dependencies once:

```powershell
npm --prefix examples/web-chatbot install
```

Start the local app:

```powershell
npm run demo:web
```

Then open the Vite URL shown in the terminal, usually `http://127.0.0.1:5173`.

## Validate It

```powershell
npm run demo:web:test
npm run demo:web:build
```

The root library checks remain separate:

```powershell
npm test -- --run
npm run build
```

## Scenarios

- Start: validates message auto-advance into a menu.
- Billing question: uses an explicit semantic input contract and routes through `ConditionStep`.
- Support ticket: validates email input, retries invalid input, supports optional attachment, runs a simulated action, and renders a generated response.
- Human handoff: routes through a handoff operation and stores the generated handoff id.

## Debug Inspector

The right panel shows:

- Runtime status and current step.
- Current variable values.
- Recent events.
- Latest decision trace fragments.

This makes the app useful as a friendly manual validation surface for developers and code agents.
