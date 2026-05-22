# Nexembot

Nexembot is a framework-agnostic TypeScript library for running versioned chatbot flows from structured definitions.

It is designed for code agents and humans who need transparent behavior:

- flows are plain typed objects;
- steps, variables, routes, actions, operations, events, and traces are explicit;
- LLM usage is allowed only through declared input or response contracts;
- asynchronous operations finish before state is updated;
- state changes are persisted as events and decision traces.

## Install

```sh
npm install nexembot
```

Nexembot is published as an ESM package and requires Node.js 20 or newer.

## Public Entry Points

```ts
import {
  createConversationApi,
  createConversationEngine,
  validateFlowDefinition,
  type FlowVersion,
} from "nexembot";

import {
  InMemoryConversationRepository,
  InMemoryConversationStateRepository,
  InMemoryConversationEventRepository,
  InMemoryDecisionTraceRepository,
  InMemoryFlowVersionRepository,
} from "nexembot/runtime-support";
```

Use the root entry point for runtime APIs and public contracts. Use `nexembot/runtime-support` for simple in-memory repositories and runtime helpers used by tests, examples, and local prototypes.

## Minimal Flow

```ts
import {
  createConversationEngine,
  validateFlowDefinition,
  type FlowVersion,
} from "nexembot";

const flowVersion: FlowVersion = {
  flowVersionId: "hello-flow-v1",
  flowId: "hello-flow",
  version: "1.0.0",
  status: "draft",
  schemaVersion: "0.1",
  createdAt: "2026-05-22T12:00:00.000Z",
  definition: {
    flowId: "hello-flow",
    startStepId: "welcome",
    variables: [],
    steps: [
      {
        stepId: "welcome",
        type: "message",
        config: {
          messages: [{ mode: "static", text: "Welcome to Nexembot." }],
        },
        routes: [
          {
            routeId: "welcome-end",
            match: { type: "outcome", outcome: "next" },
            branch: { target: { type: "end", status: "completed" } },
          },
        ],
      },
    ],
  },
};

const report = validateFlowDefinition(flowVersion.definition);
if (!report.valid) {
  throw new Error(report.issues.map((issue) => issue.message).join("\n"));
}

const engine = createConversationEngine({
  flowVersions: [flowVersion],
});

const result = await engine.startConversation({
  conversationId: "conversation-1",
  flowVersionId: "hello-flow-v1",
});

console.log(result.messages.map((message) => message.content));
```

## API-Friendly Usage

`createConversationApi` wraps the engine with transport-agnostic request and response objects. This is intended for Express, Fastify, serverless functions, queues, or any other API layer.

```ts
import { createConversationApi } from "nexembot";

const api = createConversationApi({
  flowVersions: [flowVersion],
});

const startResponse = await api.start({
  conversationId: "conversation-1",
  flowVersionId: "hello-flow-v1",
  channel: "web",
});

const messageResponse = await api.sendMessage({
  conversationId: "conversation-1",
  text: "hello",
});
```

The adapter does not own HTTP routing. It returns stable DTOs that an application can map to endpoints.

## Events

The engine exposes committed conversation events through a minimal subscription API.

```ts
const engine = createConversationEngine({
  flowVersions: [flowVersion],
});

const subscription = engine.subscribeToEvents((envelope) => {
  console.log(envelope.event.type, envelope.result.state.status);
});

await engine.startConversation({
  conversationId: "conversation-events",
  flowVersionId: "hello-flow-v1",
});

subscription.unsubscribe();
```

Subscribers run after events are persisted. Subscriber failures are not swallowed.

## Repository Integration

Production applications should provide repository implementations for persistence.

```ts
const engine = createConversationEngine({
  repositories: {
    flowVersions,
    conversations,
    states,
    events,
    traces,
  },
});
```

The in-memory repositories in `nexembot/runtime-support` are useful for local tests and examples, but they are not durable storage.

## Documentation Map

- `docs/flow-authoring.md`: how to create flows, steps, routes, variables, actions, operations, LLM contracts, and handoff.
- `docs/api-integration.md`: how to integrate the engine behind API endpoints and event subscribers.
- `docs/web-chatbot-demo.md`: how to run the local web demo that consumes the library.
- `src/types.ts`: authoritative public TypeScript contracts.

## Package Verification

```sh
npm run build
npm test -- --run
npm run test:package
npm run pack:dry-run
```

`npm run test:package` builds a tarball, installs it into a temporary external project, compiles TypeScript imports, and runs a runtime import check.
