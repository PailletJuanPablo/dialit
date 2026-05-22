# Web Chatbot Demo Design

## Goal

Add a local web chatbot example that validates Nexembot from a consumer application without adding UI concerns to the core library.

## Architecture

The demo lives in `examples/web-chatbot` as a standalone Vite TypeScript app. It imports Nexembot from `../../src/index` during development and uses the public API only.

The example owns its flow definitions, deterministic action handlers, semantic resolver, generated response provider, and UI state. The core package remains focused on the TypeScript library.

## User Experience

The first screen is the working chatbot. It has a conversation pane, a compact composer, menu buttons when the engine emits choices, a simulated attachment control, and a debug inspector.

The debug inspector shows the current state, variables, recent events, and the latest trace fragments so developers can understand exactly how each turn was resolved.

## Demo Flow

The flow covers:

- Welcome and menu routing.
- Billing classification through an explicit semantic input contract.
- Support email capture with deterministic validation and retry.
- Optional attachment handling.
- A simulated ticket creation action.
- A generated response provider with allowed variables.
- Human handoff through a normal flow branch.
- Events, variable history, and decision traces visible in the UI.

## Constraints

- No frontend framework.
- No runtime dependencies in the core library.
- No hidden fallback behavior for missing handlers.
- The demo should be buildable, testable, and runnable from root npm scripts.

## Verification

The demo must include automated tests for the flow helper and a production build check. Manual verification uses the local Vite app in a browser.
