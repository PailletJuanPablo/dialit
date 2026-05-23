# Dialit

Dialit is a framework-agnostic TypeScript engine for building conversational products from versioned flow definitions.

It keeps the runtime explicit: every step, route, variable write, operation, emitted event, and decision trace is represented as typed data. Applications bring their own HTTP layer, persistence, UI, and LLM provider; Dialit runs the conversation contract and returns stable results that are easy to inspect, test, and persist.

## Public Links

- Site: <https://pailletjuanpablo.github.io/dialit/>
- npm: <https://www.npmjs.com/package/dialit>
- Repository: <https://github.com/PailletJuanPablo/dialit>

## Why Dialit

- Versioned flows are plain TypeScript objects.
- Runtime behavior is traceable through committed events and decision traces.
- Async operations finish before state is advanced.
- LLM usage is declared through explicit contracts instead of hidden fallbacks.
- The same engine can run behind Express, Fastify, serverless handlers, queues, or local tests.

## Installation

```sh
npm install dialit
```

Dialit is ESM-only and requires Node.js 20 or newer.

## Package Entry Points

```ts
import {
  createConversationApi,
  createConversationEngine,
  validateFlowDefinition,
  type FlowVersion,
} from "dialit";

import {
  InMemoryConversationRepository,
  InMemoryConversationStateRepository,
  InMemoryConversationEventRepository,
  InMemoryDecisionTraceRepository,
  InMemoryFlowVersionRepository,
} from "dialit/runtime-support";
```

Use `dialit` for the engine, API adapter, validation, and public contracts. Use `dialit/runtime-support` for simple in-memory repositories and default runtime helpers in tests or prototypes.

## Quick Start

```ts
import {
  createConversationApi,
  validateFlowDefinition,
  type FlowVersion,
} from "dialit";

const flowVersion: FlowVersion = {
  flowVersionId: "support-v1",
  flowId: "support",
  version: "1.0.0",
  status: "draft",
  schemaVersion: "0.1",
  createdAt: "2026-05-22T12:00:00.000Z",
  definition: {
    flowId: "support",
    startStepId: "welcome",
    variables: [],
    steps: [
      {
        stepId: "welcome",
        type: "message",
        config: {
          messages: [{ mode: "static", text: "How can we help?" }],
        },
        routes: [
          {
            routeId: "finish",
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

const api = createConversationApi({
  flowVersions: [flowVersion],
});

const response = await api.start({
  conversationId: "conversation-1",
  flowVersionId: "support-v1",
  channel: "web",
});

console.log(response.statusCode);
console.log(response.body.messages[0]?.text);
```

`createConversationApi` returns transport-neutral HTTP-style responses. Your application decides how those responses map to routes, controllers, workers, or UI state.

## Engine Usage

Use the lower-level engine when you want direct access to runtime results.

```ts
import { createConversationEngine } from "dialit";

const engine = createConversationEngine({
  flowVersions: [flowVersion],
});

const result = await engine.startConversation({
  conversationId: "conversation-2",
  flowVersionId: "support-v1",
});

for (const event of result.events) {
  console.log(event.type);
}

console.log(result.trace.decisions);
```

The engine exposes event subscriptions after events are persisted:

```ts
const subscription = engine.subscribeToEvents((envelope) => {
  console.log(envelope.event.type, envelope.result.state.status);
});

subscription.unsubscribe();
```

Subscriber failures are not swallowed, so integration errors remain visible.

## Persistence

Prototype code can use the in-memory repositories from `dialit/runtime-support`. Production applications should provide durable repository implementations.

```ts
import { createConversationEngine } from "dialit";

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

Dialit does not prescribe a database. Repository implementations can target SQL, document stores, event stores, or application-specific persistence.

## Package Contents

The npm package intentionally publishes only:

- `dist`
- `README.md`
- `package.json`

Source files, tests, local scripts, generated site files, and internal planning material are kept out of the npm tarball.

## Development

```sh
npm run build
npm test -- --run
npm run typecheck:tests
npm run test:package
npm run pack:dry-run
```

`npm run test:package` builds a tarball, installs it into a temporary external project, compiles TypeScript imports, and runs a runtime import check.
