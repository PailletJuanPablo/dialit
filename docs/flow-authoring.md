# Flow Authoring Guide

This guide explains how to create Dialit flows from structured TypeScript definitions.

The authoritative public contracts live in `src/types.ts` and are exported from `src/index.ts`. The root-level `types.ts` is a historical reference snapshot, not the runtime-facing source of truth.

## Mental Model

A Dialit flow is a versioned state machine for a conversation.

- A `FlowVersion` wraps a `ConversationFlowDefinition`.
- A flow starts at `startStepId`.
- Steps produce outcomes.
- Routes map outcomes to branches.
- Branches run operations and then move to a target.
- Variables hold conversation data and keep history.
- Events and traces record every turn decision.

The runtime executes one turn at a time. It loads the current state, processes automatic steps or user input, waits for async work, applies patches, appends events, stores a trace, and returns a `ProcessTurnResult`.

## Authoring Process

Use this order when creating a new flow:

1. Define the conversation goal.
2. List the variables the flow will read and write.
3. Define reusable actions and custom operations.
4. Create the steps.
5. Connect step outcomes with routes.
6. Add validation and LLM contracts only where explicitly needed.
7. Run `validateFlowDefinition`.
8. Execute reference scenarios with `createConversationEngine`.
9. Inspect events, variables, and traces.

## Minimal Flow Version

```ts
import type { FlowVersion } from "dialit";

const supportFlowVersion: FlowVersion = {
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
          messages: [{ mode: "static", text: "Welcome." }],
        },
        routes: [
          {
            routeId: "welcome-next",
            match: { type: "outcome", outcome: "next" },
            branch: { target: { type: "end", status: "completed" } },
          },
        ],
      },
    ],
  },
};
```

## Flow Definition Fields

`ConversationFlowDefinition` contains:

- `flowId`: stable logical id.
- `startStepId`: first step to enter.
- `variables`: declared variable schema.
- `steps`: step definitions.
- `actions`: reusable action contracts.
- `customOperations`: contracts for custom operation implementations.
- `responses`: reusable response plans.
- `settings`: optional runtime limits and defaults.

`FlowVersion` adds deployable metadata:

- `flowVersionId`
- `version`
- `status`
- `schemaVersion`
- `createdAt`
- optional publication metadata

## Variables

Variables must be declared before steps or operations reference them.

```ts
variables: [
  { variableId: "customerEmail", type: "email", scope: "conversation" },
  { variableId: "ticketId", type: "string", scope: "conversation" },
  { variableId: "scratchValue", type: "string", scope: "flow" },
]
```

Supported scopes:

- `conversation`: shared across the conversation.
- `flow`: local to the current flow frame.
- `operation`: short-lived operation data.
- `system`: runtime/system data.

Variable changes are represented as patches and recorded in `variableHistory`.

## Value Expressions

Operations use `ValueExpression` to read or produce values.

```ts
const literal = { type: "literal", value: "support" };
const variable = { type: "variable", variableId: "customerEmail" };
const template = {
  type: "template",
  template: "Ticket for {{customerEmail}}",
  variableIds: ["customerEmail"],
};
```

Use variable expressions for runtime data. Use literal expressions for fixed values.

## Response Plans

Steps and operations can render response plans.

### Static

```ts
{ mode: "static", text: "Choose an option." }
```

### Template

```ts
{
  mode: "template",
  template: "Ticket {{ticketId}} was created.",
  variableIds: ["ticketId"],
}
```

### Generated

Generated responses require an explicit contract.

```ts
{
  mode: "generated",
  goal: "Confirm the support ticket in one concise sentence.",
  allowedVariableIds: ["ticketId", "customerEmail"],
  fallbackText: "Your ticket was created.",
}
```

The LLM provider may only use variables listed in `allowedVariableIds`. If generated output violates the contract, the runtime fails or falls back according to the response handling rules.

### Reference

```ts
{
  mode: "reference",
  responseId: "support-confirmation",
}
```

References require a matching entry in `definition.responses`.

## Step Lifecycle

Each step can define:

- `onEnter`: operations before the step body.
- `config`: step-specific behavior.
- `routes`: outcome routing.
- `onExit`: operations before leaving the step.

The common pattern is:

```ts
{
  stepId: "ask_email",
  type: "input",
  onEnter: [],
  config: {},
  routes: [],
  onExit: [],
}
```

## Routes, Branches, and Targets

Steps produce outcomes. Routes map outcomes to branches.

```ts
routes: [
  {
    routeId: "captured-to-next",
    match: { type: "outcome", outcome: "captured" },
    branch: {
      operations: [],
      target: { type: "step", stepId: "next_step" },
    },
  },
]
```

Branch targets:

- `{ type: "step", stepId: "..." }`
- `{ type: "stay" }`
- `{ type: "end", status: "completed" }`
- `{ type: "none" }`

Conditional routing belongs in `ConditionStep`. Do not put arbitrary conditional logic in routes.

## Message Step

Use `message` for outbound messages. By default it auto-advances with outcome `next`.

```ts
{
  stepId: "welcome",
  type: "message",
  config: {
    messages: [
      { mode: "static", text: "Welcome to support." },
      { mode: "static", text: "Choose what you need." },
    ],
  },
  routes: [
    {
      routeId: "welcome-next",
      match: { type: "outcome", outcome: "next" },
      branch: { target: { type: "step", stepId: "main_menu" } },
    },
  ],
}
```

Use `autoAdvance: false` only when the message step should wait for input itself.

## Menu Step

Use `menu` for deterministic option selection.

```ts
{
  stepId: "main_menu",
  type: "menu",
  config: {
    prompt: { mode: "static", text: "Choose an option." },
    selection: {
      allowButtons: true,
      allowNumbers: true,
      allowExactText: true,
      allowAliases: true,
    },
    options: [
      {
        optionId: "billing",
        label: "Billing",
        aliases: ["invoice", "balance"],
        branch: {
          operations: [
            {
              type: "set_variable",
              variableId: "contactReason",
              value: { type: "literal", value: "billing" },
              source: "menu_selection",
            },
          ],
          target: { type: "step", stepId: "billing_question" },
        },
      },
    ],
  },
}
```

Menu selection can resolve by option id, number, exact text, alias, or semantic selection when configured.

## Input Step

Use `input` for text, choice, payload, event, or attachment-like input contracts. Attachment-specific file validation is usually better handled by `attachment`.

```ts
{
  stepId: "ask_email",
  type: "input",
  config: {
    prompt: { mode: "static", text: "What email should we use?" },
    input: {
      acceptedInputTypes: ["text"],
      bindings: [
        {
          targetVariableId: "customerEmail",
          source: "text",
          normalizers: [{ type: "trim" }, { type: "lowercase" }],
          validators: [{ type: "email" }],
          saveRawInput: true,
        },
      ],
      invalidBehavior: {
        message: { mode: "static", text: "Enter a valid email address." },
      },
    },
  },
  routes: [
    {
      routeId: "email-captured",
      match: { type: "outcome", outcome: "captured" },
      branch: { target: { type: "step", stepId: "next_step" } },
    },
  ],
}
```

Input bindings are processed in order:

1. Source match.
2. Normalizers.
3. Extractors.
4. Validators.
5. Variable patch creation.

Built-in normalizers:

- `trim`
- `lowercase`
- `uppercase`
- `collapse_spaces`

Built-in extractors:

- `raw_text`
- `regex`
- `number`
- `integer`
- `email`
- `phone`
- `date`
- `event_type`
- `payload_path`

Built-in validators:

- `required`
- `regex`
- `integer`
- `number`
- `email`
- `min_length`
- `max_length`
- `enum`

Custom normalizers, extractors, and validators can be registered through runtime options or services.

## Global Commands

Input steps can expose global command outcomes.

```ts
input: {
  acceptedInputTypes: ["text"],
  bindings: [{ targetVariableId: "answer", source: "text" }],
  globalCommands: {
    allowCancel: true,
    allowHelp: true,
    allowBack: true,
    allowHandoff: true,
  },
}
```

Supported outcomes:

- `global_cancel`
- `global_help`
- `global_back`
- `global_handoff`

Route these outcomes like any other step outcome.

## Semantic Input Tasks

Use semantic tasks only when deterministic parsing is not enough.

```ts
semanticTasks: [
  {
    taskId: "classify_billing_question",
    mode: "after_valid_capture",
    allowedOutcomes: [
      "billing_debt",
      "billing_charge_error",
      "billing_other",
    ],
    allowedVariableIds: ["billingCategory"],
    threshold: 0.75,
  },
]
```

The semantic resolver must return only declared outcomes and variables. This keeps LLM input interpretation controlled and traceable.

## Attachment Step

Use `attachment` for file capture and file-specific validation.

```ts
{
  stepId: "support_attachment",
  type: "attachment",
  config: {
    prompt: { mode: "static", text: "Attach a PDF or image." },
    targetVariableId: "attachmentRef",
    rules: {
      required: false,
      maxFiles: 2,
      allowedMimeTypes: ["application/pdf", "image/png", "image/jpeg"],
      allowedExtensions: [".pdf", ".png", ".jpg", ".jpeg"],
      maxSizeMb: 5,
    },
    invalidAttachment: {
      message: { mode: "static", text: "Use PDF, PNG, or JPG files under 5 MB." },
    },
  },
  routes: [
    {
      routeId: "attachment-captured",
      match: { type: "outcome", outcome: "captured" },
      branch: { target: { type: "step", stepId: "create_ticket" } },
    },
    {
      routeId: "attachment-skipped",
      match: { type: "outcome", outcome: "skipped" },
      branch: { target: { type: "step", stepId: "create_ticket" } },
    },
  ],
}
```

If one file is accepted, the variable stores that attachment. If multiple files are accepted, it stores the accepted attachment list.

## Condition Step

Use `condition` as the official conditional routing mechanism.

```ts
{
  stepId: "billing_condition",
  type: "condition",
  config: {
    branches: [
      {
        branchId: "debt_branch",
        outcome: "billing_debt",
        when: {
          type: "equals",
          left: { type: "variable", variableId: "billingCategory" },
          right: { type: "literal", value: "debt" },
        },
        branch: { target: { type: "step", stepId: "debt_message" } },
      },
    ],
    defaultBranch: {
      branchId: "default_billing_branch",
      target: { type: "step", stepId: "billing_other" },
    },
  },
}
```

Supported condition expression types include:

- `equals`
- `not_equals`
- `exists`
- `not_exists`
- `greater_than`
- `less_than`
- `includes`
- `matches_regex`
- `and`
- `or`
- `not`

## End Step

Use `end` for explicit final states.

```ts
{
  stepId: "done",
  type: "end",
  config: {
    status: "completed",
    finalMessage: { mode: "static", text: "Done." },
  },
}
```

You can also end a flow by targeting `{ type: "end", status: "completed" }` from a branch.

## Custom Step

Use `custom` when a step owns interaction that built-in steps should not model.

```ts
{
  stepId: "custom_scheduler",
  type: "custom",
  config: {
    customType: "appointment_scheduler",
    payload: { durationMinutes: 30 },
  },
}
```

Register a matching step handler through `stepHandlers` or `stepRegistry`.

## Operations

Operations are reusable units of work that can run in `onEnter`, `onExit`, or branches.

### Send Message

```ts
{
  type: "send_message",
  message: { mode: "static", text: "We are processing your request." },
}
```

### Set Variable

```ts
{
  type: "set_variable",
  variableId: "contactReason",
  value: { type: "literal", value: "support" },
  source: "operation",
}
```

### Unset or Invalidate Variable

```ts
{ type: "unset_variable", variableId: "temporaryValue" }

{
  type: "invalidate_variable",
  variableId: "customerEmail",
  reason: "User requested correction",
}
```

### Run Action

```ts
{
  type: "run_action",
  operationId: "create_ticket_operation",
  actionId: "create_support_ticket",
  inputMapping: {
    email: { type: "variable", variableId: "customerEmail" },
  },
  outputMapping: {
    ticketId: "ticketId",
  },
  onResult: [
    {
      match: { type: "outcome", outcome: "created" },
      branch: { target: { type: "step", stepId: "ticket_response" } },
    },
  ],
}
```

Actions are reusable external work contracts. They are not required step types.

### Emit Event

```ts
{
  type: "emit_event",
  eventType: "support_ticket_requested",
  payload: {
    email: { type: "variable", variableId: "customerEmail" },
  },
}
```

### Call Flow

```ts
{
  type: "call_flow",
  flowVersionId: "identity-v1",
  inputMapping: {
    email: { type: "variable", variableId: "customerEmail" },
  },
  outputMapping: {
    verifiedEmail: "customerEmail",
  },
  variableSharing: {
    scopes: ["conversation"],
  },
}
```

Use flow calls to compose flows while controlling variable sharing.

### Handoff

```ts
{
  type: "handoff",
  channel: "web",
  queue: "support",
  reason: { type: "literal", value: "User requested a human." },
  handoffIdVariableId: "handoffId",
  message: { mode: "static", text: "A human specialist will continue." },
}
```

### Custom Operation

```ts
{
  type: "custom",
  customOperationId: "create_ticket_contract",
  customType: "create_ticket",
  inputMapping: {
    email: { type: "variable", variableId: "customerEmail" },
  },
  resultVariableId: "ticketResult",
}
```

Declare the custom operation in `definition.customOperations` and register a matching runtime handler.

## Actions

Declare action contracts at the flow level.

```ts
actions: [
  {
    actionId: "create_support_ticket",
    kind: "ticketing",
    resultOutcomes: ["created"],
    errorCodes: ["TICKETING_UNAVAILABLE"],
    sideEffect: true,
    timeoutMs: 5000,
  },
]
```

Register handlers when creating the engine:

```ts
const engine = createConversationEngine({
  flowVersions: [supportFlowVersion],
  actionHandlers: {
    ticketing: async (_action, input) => ({
      status: "success",
      outcome: "created",
      outputs: {
        ticketId: "TCK-1001",
        email: input.email,
      },
    }),
  },
});
```

## LLM Contracts

LLMs can only participate through explicit contracts:

- `SemanticInputTask` for input interpretation.
- `GeneratedResponsePlan` for response generation.

Both contracts restrict outcomes, variable access, and traceable runtime behavior.

Register providers explicitly:

```ts
const engine = createConversationEngine({
  flowVersions: [supportFlowVersion],
  semanticInputResolver: async (input, task) => ({
    status: "resolved",
    candidates: [],
    allowedOutcomes: task.allowedOutcomes,
    allowedVariableIds: task.allowedVariableIds,
    outcome: "billing_other",
    confidence: 0.8,
    variables: {},
    trace: { source: "semantic:example" },
  }),
  llmResponseGenerator: async (plan, context) => ({
    text: "Your ticket was created.",
    usedVariableIds: plan.allowedVariableIds.filter((id) => id === "ticketId"),
  }),
});
```

## Events and Traces

Every turn returns:

- `messages`
- `events`
- `trace`
- `state`
- `conversation`
- optional `error`

Events are append-only and can also be subscribed to:

```ts
const subscription = engine.subscribeToEvents(({ event, result }) => {
  console.log(event.type, result.state.status);
});

subscription.unsubscribe();
```

Common event types:

- `conversation_started`
- `turn_started`
- `input_received`
- `step_entered`
- `step_completed`
- `input_resolved`
- `input_invalid`
- `variable_set`
- `operation_started`
- `operation_completed`
- `action_completed`
- `transition_taken`
- `conversation_completed`
- `handoff_started`
- `error_raised`

Use traces for debugging decisions. Use events for integrations, analytics, and audits.

## Validation

Validate definitions before publishing or running them.

```ts
import { validateFlowDefinition } from "dialit";

const report = validateFlowDefinition(supportFlowVersion.definition, {
  registeredStepTypes: ["appointment_scheduler"],
  registeredOperationTypes: ["audit_operation"],
  registeredCustomOperationTypes: ["create_ticket"],
  registeredNormalizerTypes: [],
  registeredExtractorTypes: [],
  registeredValidatorTypes: [],
});

if (!report.valid) {
  console.error(report.issues);
}
```

Validation checks references, targets, variables, actions, generated response contracts, semantic task contracts, registered extensions, attachment rules, and action branch contracts.

## Runtime Smoke Test

```ts
const engine = createConversationEngine({
  flowVersions: [supportFlowVersion],
});

const started = await engine.startConversation({
  conversationId: "conversation-1",
  flowVersionId: "support-v1",
  channel: "web",
});

console.log(started.messages);

const next = await engine.processUserInput({
  conversationId: "conversation-1",
  input: {
    inputId: "input-1",
    conversationId: "conversation-1",
    type: "text",
    text: "billing",
    receivedAt: new Date().toISOString(),
  },
});

console.log(next.state.status, next.trace.fragments);
```

For HTTP-style integration, use `createConversationApi`. See `docs/api-integration.md`.

## Complete Example

This example shows a small support flow with a menu, email capture, action, generated response, and handoff.

```ts
import {
  createConversationEngine,
  validateFlowDefinition,
  type ConversationFlowDefinition,
  type FlowVersion,
} from "dialit";

const definition: ConversationFlowDefinition = {
  flowId: "support",
  startStepId: "menu",
  variables: [
    { variableId: "customerEmail", type: "email", scope: "conversation" },
    { variableId: "ticketId", type: "string", scope: "conversation" },
    { variableId: "handoffId", type: "string", scope: "conversation" },
  ],
  actions: [
    {
      actionId: "create_ticket",
      kind: "ticketing",
      resultOutcomes: ["created"],
      errorCodes: ["TICKETING_UNAVAILABLE"],
    },
  ],
  steps: [
    {
      stepId: "menu",
      type: "menu",
      config: {
        prompt: { mode: "static", text: "How can we help?" },
        selection: {
          allowButtons: true,
          allowExactText: true,
          allowAliases: true,
        },
        options: [
          {
            optionId: "ticket",
            label: "Create ticket",
            aliases: ["support"],
            branch: { target: { type: "step", stepId: "ask_email" } },
          },
          {
            optionId: "human",
            label: "Talk to a human",
            aliases: ["agent"],
            branch: { target: { type: "step", stepId: "handoff" } },
          },
        ],
      },
    },
    {
      stepId: "ask_email",
      type: "input",
      config: {
        prompt: { mode: "static", text: "What email should we use?" },
        input: {
          acceptedInputTypes: ["text"],
          bindings: [
            {
              targetVariableId: "customerEmail",
              source: "text",
              normalizers: [{ type: "trim" }, { type: "lowercase" }],
              validators: [{ type: "email" }],
            },
          ],
          invalidBehavior: {
            message: { mode: "static", text: "Enter a valid email." },
          },
        },
      },
      routes: [
        {
          routeId: "email-captured",
          match: { type: "outcome", outcome: "captured" },
          branch: { target: { type: "step", stepId: "create_ticket" } },
        },
      ],
    },
    {
      stepId: "create_ticket",
      type: "message",
      onEnter: [
        {
          type: "run_action",
          actionId: "create_ticket",
          inputMapping: {
            email: { type: "variable", variableId: "customerEmail" },
          },
          outputMapping: {
            ticketId: "ticketId",
          },
          onResult: [
            {
              match: { type: "outcome", outcome: "created" },
              branch: { target: { type: "step", stepId: "ticket_response" } },
            },
          ],
        },
      ],
      config: { messages: [] },
    },
    {
      stepId: "ticket_response",
      type: "message",
      config: {
        messages: [
          {
            mode: "generated",
            goal: "Confirm the ticket in one sentence.",
            allowedVariableIds: ["ticketId", "customerEmail"],
            fallbackText: "Your ticket was created.",
          },
        ],
      },
      routes: [
        {
          routeId: "ticket-response-next",
          match: { type: "outcome", outcome: "next" },
          branch: { target: { type: "end", status: "completed" } },
        },
      ],
    },
    {
      stepId: "handoff",
      type: "message",
      onEnter: [
        {
          type: "handoff",
          channel: "web",
          queue: "support",
          reason: { type: "literal", value: "User requested a human." },
          handoffIdVariableId: "handoffId",
          message: { mode: "static", text: "A human will continue." },
        },
      ],
      config: { messages: [] },
    },
  ],
};

const flowVersion: FlowVersion = {
  flowVersionId: "support-v1",
  flowId: "support",
  version: "1.0.0",
  status: "draft",
  schemaVersion: "0.1",
  createdAt: new Date().toISOString(),
  definition,
};

const validation = validateFlowDefinition(definition);
if (!validation.valid) {
  throw new Error(JSON.stringify(validation.issues, null, 2));
}

const engine = createConversationEngine({
  flowVersions: [flowVersion],
  actionHandlers: {
    ticketing: async () => ({
      status: "success",
      outcome: "created",
      outputs: { ticketId: "TCK-1001" },
    }),
  },
  llmResponseGenerator: async (plan) => ({
    text: "Ticket TCK-1001 was created.",
    usedVariableIds: plan.allowedVariableIds,
  }),
});
```

## Authoring Checklist

Before publishing a flow:

- Every `stepId` is unique.
- `startStepId` exists.
- Every route target exists or ends the conversation.
- Every referenced variable is declared.
- Every action has a registered handler in the runtime.
- Custom steps and custom operations have registered handlers.
- LLM contracts declare allowed outcomes and variables.
- `ConditionStep` owns conditional routing.
- `validateFlowDefinition` passes.
- Reference scenarios cover the main happy path, invalid input, action failure, handoff, and trace expectations.

## Common Mistakes

- Referencing variables that are not declared.
- Using routes as hidden conditional logic instead of `ConditionStep`.
- Letting LLM providers return undeclared outcomes or variables.
- Expecting actions to be step types. Actions are reusable operations.
- Forgetting to branch on action failures or custom operation failures.
- Skipping validation before registering a flow version.
- Treating events and traces as optional for production debugging.
