# Dialit

![Dialit explicit conversational workflows for TypeScript](https://raw.githubusercontent.com/PailletJuanPablo/dialit/master/assets/readme/hero.png)

[![npm version](https://img.shields.io/npm/v/dialit?style=flat-square)](https://www.npmjs.com/package/dialit)
[![npm downloads](https://img.shields.io/npm/dm/dialit?style=flat-square)](https://www.npmjs.com/package/dialit)
[![license](https://img.shields.io/badge/license-MIT-10b981?style=flat-square)](./LICENSE)
[![Node.js](https://img.shields.io/node/v/dialit?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ESM](https://img.shields.io/badge/ESM-only-4b5563?style=flat-square)](https://nodejs.org/api/esm.html)
[![runtime dependencies](https://img.shields.io/badge/runtime_dependencies-0-10b981?style=flat-square)](./package.json)

Dialit is a framework-agnostic TypeScript runtime for explicit conversational workflows.

It gives product teams a small, typed engine for the part of chatbot systems that usually becomes hard to reason about: steps, routes, variables, operations, emitted events, LLM boundaries, and decision traces. Your application keeps control of HTTP, persistence, UI, queues, observability, authentication, and model providers.

## Quick Links

- Documentation: <https://dialit.netlify.app/>
- npm: <https://www.npmjs.com/package/dialit>
- Repository: <https://github.com/PailletJuanPablo/dialit>
- Issues: <https://github.com/PailletJuanPablo/dialit/issues>

## Why Dialit

| Need | Dialit provides |
| --- | --- |
| Model conversations as source-controlled data | Versioned TypeScript flow definitions for steps, routes, variables, operations, and endings. |
| Debug real runtime behavior | Every turn returns messages, choices, variables, events, status, and trace data. |
| Keep AI usage explicit | Generated responses and semantic input depend on declared services instead of hidden fallbacks. |
| Integrate with existing systems | Action, handoff, custom-operation, and repository interfaces stay owned by your app. |
| Avoid framework lock-in | The runtime can sit behind Express, Fastify, Next.js, serverless handlers, workers, queues, or local tests. |
| Ship a lean dependency tree | The package has zero runtime dependencies and no peer dependency requirements. |

## Install

```sh
npm install dialit
```

Dialit is ESM-only, includes TypeScript declarations, and requires Node.js 20 or newer.

## Package Surface

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

| Entry point | Use it for |
| --- | --- |
| `dialit` | Engine creation, API adapter, flow validation, and public TypeScript contracts. |
| `dialit/runtime-support` | In-memory repositories, default clocks, IDs, event/message factories, traces, and variable helpers. |

## Design the Flow

![Dialit flow design](https://raw.githubusercontent.com/PailletJuanPablo/dialit/master/assets/readme/flow-design.png)

Dialit flows are plain data. A flow version declares how a conversation starts, which steps can run, how user input is resolved, which variables can change, and where each route can go.

- Built-in steps: `message`, `menu`, `input`, `attachment`, `condition`, `end`, and `custom`.
- Built-in operations: `send_message`, `set_variable`, `unset_variable`, `invalidate_variable`, `run_action`, `call_flow`, `emit_event`, `handoff`, and `custom`.
- Input tools: normalizers, extractors, validators, semantic resolvers, global commands, and attachment rules.
- Integration boundaries: actions, handoffs, custom operations, semantic input, and generated responses are explicit capabilities.

## First Flow

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
console.log(response.body.trace.finalStepId);
```

`createConversationApi` returns transport-neutral HTTP-style responses. Map those responses to your controller, worker, queue consumer, or UI boundary.

## Runtime API

Use the API adapter for common channel interactions:

```ts
await api.start({
  conversationId: "conversation-1",
  flowVersionId: "support-v1",
});

await api.sendMessage({
  conversationId: "conversation-1",
  text: "I need billing help",
});

await api.selectOption({
  conversationId: "conversation-1",
  optionId: "billing",
});
```

Use the lower-level engine when you want direct access to turn results:

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

console.log(result.trace.fragments);
```

Event subscribers run after events are persisted:

```ts
const subscription = engine.subscribeToEvents((envelope) => {
  console.log(envelope.event.type, envelope.result.state.status);
});

subscription.unsubscribe();
```

Subscriber failures are not swallowed, so integration errors remain visible.

## Debug Without Guessing

![Dialit runtime trace and debugging surface](https://raw.githubusercontent.com/PailletJuanPablo/dialit/master/assets/readme/runtime-debugging.png)

Every turn produces inspectable runtime data:

| Field | Purpose |
| --- | --- |
| `messages` | Outbound content ready for your channel adapter. |
| `choices` | Menu options normalized for UI or transport responses. |
| `variables` | Current variable values with scope, source, metadata, and timestamps. |
| `events` | Committed conversation events for auditing and integrations. |
| `trace` | Turn fragments, variable reads, variable patches, operation results, action results, handoff results, flow calls, and LLM usage. |
| `error` | Structured runtime failures when a flow references missing capabilities or invalid contracts. |

The same artifacts support automated tests, audit trails, support tooling, and production diagnostics.

## Zero Runtime Dependencies

![Dialit zero dependencies package surface](https://raw.githubusercontent.com/PailletJuanPablo/dialit/master/assets/readme/zero-dependencies.png)

Dialit is intentionally small:

- no runtime dependencies
- no peer dependencies
- no hosted service requirement
- no framework adapter requirement
- no bundled UI layer

The engine is designed to be embedded in existing TypeScript systems without dragging a platform into the application.

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

Repository implementations can target SQL, document stores, event stores, or application-specific persistence.

## Validation

Validate flow definitions before they are published or executed:

```ts
const report = validateFlowDefinition(flowVersion.definition, {
  registeredStepTypes: ["message", "menu", "input", "end"],
  registeredOperationTypes: ["send_message", "set_variable", "run_action"],
});

if (!report.valid) {
  for (const issue of report.issues) {
    console.error(issue.path, issue.message);
  }
}
```

Validation is explicit by design. If a flow depends on custom steps, custom operations, semantic input, generated responses, actions, or handoffs, register the capabilities your runtime actually supports.

## Documentation

The full documentation site includes the public API reference, authoring guide, integration patterns, and runnable examples:

<https://dialit.netlify.app/>

## License

MIT. See [LICENSE](./LICENSE).
