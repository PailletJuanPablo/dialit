# API Integration

Nexembot exposes two small integration surfaces for backend APIs:

- `engine.subscribeToEvents(...)` for minimal event subscriptions.
- `createConversationApi(...)` for framework-agnostic endpoint helpers.

These helpers do not depend on Express, Fastify, Next.js, or any HTTP runtime.

## Event Subscription

```ts
import { createConversationEngine } from "nexembot";

const engine = createConversationEngine({ flowVersions });

const subscription = engine.subscribeToEvents(async ({ event, result }) => {
  console.log(event.type, result.state.status);
});
```

Subscribers receive committed turn events after the engine has persisted conversation state, state snapshots, events, and traces. If a subscriber throws, the engine call rejects instead of hiding the delivery failure.

To stop receiving events:

```ts
subscription.unsubscribe();
```

Initial subscribers can also be provided at construction time:

```ts
const engine = createConversationEngine({
  flowVersions,
  eventSubscribers: [
    ({ event }) => console.log(event.type),
  ],
});
```

## API Adapter

`createConversationApi` wraps the engine with endpoint-friendly methods and returns plain DTOs.

```ts
import { createConversationApi } from "nexembot";

const api = createConversationApi({ flowVersions });

export async function startConversation(body: {
  conversationId: string;
  flowVersionId: string;
}) {
  return api.start(body);
}

export async function sendMessage(body: {
  conversationId: string;
  text: string;
}) {
  return api.sendMessage(body);
}
```

The returned shape is stable:

```ts
{
  statusCode: 200,
  body: {
    ok: true,
    conversationId: "conversation-1",
    turnId: "turn-1",
    status: "waiting_input",
    currentStepId: "main_menu",
    messages: [],
    choices: [],
    variables: {},
    events: [],
    trace: {}
  }
}
```

## Supported Requests

- `start(request)` starts a conversation.
- `sendMessage(request)` sends text input.
- `selectOption(request)` sends a menu/button choice.
- `sendAttachments(request)` sends already-uploaded attachment references.
- `sendEvent(request)` sends webhook/external event input.
- `toHttpResponse(result)` converts a raw `ProcessTurnResult` when you call the engine directly.

Status codes are intentionally simple:

- `200` when the runtime result has no error.
- `400` for recoverable runtime errors.
- `500` for non-recoverable runtime errors.

## Example Express-Style Handler

```ts
app.post("/conversations/:id/messages", async (req, res) => {
  const response = await api.sendMessage({
    conversationId: req.params.id,
    text: req.body.text,
    channel: "web",
  });

  res.status(response.statusCode).json(response.body);
});
```

This example is illustrative only; the library does not import or require Express.
