import { describe, expect, it, vi } from "vitest";
import {
  createConversationEngine,
  type AttachmentInput,
  type AttachmentRules,
  type AttachmentStepDefinition,
  type Conversation,
  type ConversationEngine,
  type ConversationEngineModule,
  type ConversationEngineRepositories,
  type ConversationEvent,
  type ConversationFlowDefinition,
  type ConversationStatus,
  type ConversationState,
  type DecisionTrace,
  type FlowCallStatus,
  type FlowVersion,
  type InputStepDefinition,
  type MenuOption,
  type MenuStepDefinition,
  type MessageStepDefinition,
  type ProcessTurnResult,
  type ResponsePlan,
  type StepBranch,
  type StepOperation,
  type StepRoute,
  type StepTarget,
  type UserInput,
  type ValidatorDefinition,
  type ValueExpression,
  type VariableDefinition,
  type VariableScope,
  type VariableType,
  type VariableValueSource,
} from "../src/index";

const NOW = "2026-05-22T12:00:00.000Z";
const SUPPORT_FLOW_VERSION_ID = "integrated-support-v1";
const IDENTITY_FLOW_VERSION_ID = "integrated-identity-v1";
const HANDOFF_CHILD_FLOW_VERSION_ID = "integrated-handoff-child-v1";

type FlowDefinitionFixture =
  & Pick<ConversationFlowDefinition, "flowId" | "startStepId" | "steps">
  & Partial<Omit<ConversationFlowDefinition, "flowId" | "startStepId" | "steps">>;

type MessageStepOptions = Omit<Partial<MessageStepDefinition>, "stepId" | "type" | "config"> & {
  autoAdvance?: boolean;
};

interface InputStepOptions {
  validators?: ValidatorDefinition[];
  invalidMessage?: string;
  routes?: StepRoute[];
}

interface AttachmentStepOptions extends Pick<AttachmentRules, "allowedMimeTypes" | "allowedExtensions" | "maxSizeMb"> {
  invalidMessage: string;
  routes?: StepRoute[];
}

describe("Dialit integrated production-like scenarios", () => {
  it("runs a technical support journey across persisted turns with child identity, action, attachment, custom operation, generated response, events, and traces", async () => {
    const repositories = trackingRepositories([
      integratedSupportFlow(),
      integratedIdentityFlow(),
    ]);
    const actionHandler = vi.fn(async () => ({
      status: "success",
      outcome: "active_customer",
      outputs: {
        accountStatus: "active",
        customerTier: "gold",
      },
    }));
    const customOperation = vi.fn(async () => ({
      status: "completed",
      outcome: "created",
      variablePatches: [
        {
          type: "set",
          variableId: "ticketId",
          value: "TCK-9001",
          source: "operation",
        },
      ],
      trace: { source: "custom_operation:create_support_ticket", data: { ticketId: "TCK-9001" } },
    }));
    const llmResponseGenerator = vi.fn(async () => ({
      text: "Ticket TCK-9001 was created for a gold customer.",
      usedVariableIds: ["ticketId", "customerTier"],
    }));
    const runtime = engineWithRepositories(repositories, {
      actionHandlers: { crm: actionHandler },
      customOperations: {
        create_support_ticket: {
          outcomes: ["created"],
          outputVariables: ["ticketId"],
          execute: customOperation,
        },
      },
      llmResponseGenerator,
    });

    const start = await runtime.startConversation({
      conversationId: "conversation-integrated-technical",
      flowVersionId: SUPPORT_FLOW_VERSION_ID,
      channel: "whatsapp",
      userId: "user-1",
    });
    expect(texts(start)).toEqual(["Welcome to support.", "Choose what you need."]);
    expect(start.state.status).toBe("waiting_input");

    const selected = await runtime.processUserInput({
      conversationId: "conversation-integrated-technical",
      input: textInput("conversation-integrated-technical", "tech"),
    });
    expect(selected.error).toBeUndefined();
    expect(selected.state.status).toBe("waiting_input");
    expect(selected.state.currentStepId).toBe("identity_dni");
    expect(selected.state.executionStack).toHaveLength(1);
    expect(texts(selected)).toContain("Please enter the customer's DNI.");
    expect(variableValue(selected, "identityScratch")).toBeUndefined();

    const invalidDni = await runtime.processUserInput({
      conversationId: "conversation-integrated-technical",
      input: textInput("conversation-integrated-technical", "abc"),
    });
    expect(invalidDni.state.status).toBe("waiting_input");
    expect(invalidDni.state.pendingInput).toMatchObject({ stepId: "identity_dni", retryCount: 1 });
    expect(texts(invalidDni)).toEqual([
      "DNI must contain only numbers.",
      "Please enter the customer's DNI.",
    ]);

    const validDni = await runtime.processUserInput({
      conversationId: "conversation-integrated-technical",
      input: textInput("conversation-integrated-technical", "12345678"),
    });
    expect(validDni.error).toBeUndefined();
    expect(validDni.state.executionStack).toEqual([]);
    expect(validDni.state.currentStepId).toBe("request_attachment");
    expect(variableValue(validDni, "verifiedDni")).toBe("12345678");
    expect(variableValue(validDni, "identityScratch")).toBeUndefined();
    expect(actionHandler).toHaveBeenCalledWith(
      expect.objectContaining({ actionId: "lookup_customer" }),
      { dni: "12345678" },
      expect.any(Object),
    );
    expect(variableValue(validDni, "accountStatus")).toBe("active");
    expect(variableValue(validDni, "customerTier")).toBe("gold");

    const invalidAttachment = await runtime.processUserInput({
      conversationId: "conversation-integrated-technical",
      input: attachmentInput("conversation-integrated-technical", [
        { attachmentId: "bad-file", filename: "malware.exe", mimeType: "application/x-msdownload", sizeBytes: 50_000 },
      ]),
    });
    expect(invalidAttachment.state.status).toBe("waiting_input");
    expect(texts(invalidAttachment)).toEqual([
      "Attach a PDF or image under 5 MB.",
      "Attach evidence for the technical request.",
    ]);

    const completed = await runtime.processUserInput({
      conversationId: "conversation-integrated-technical",
      input: attachmentInput("conversation-integrated-technical", [
        { attachmentId: "evidence-1", filename: "invoice.pdf", mimeType: "application/pdf", sizeBytes: 25_000 },
      ]),
    });
    expect(completed.error).toBeUndefined();
    expect(completed.state.status).toBe("completed");
    expect(completed.state.currentStepId).toBe("ticket_response");
    expect(texts(completed)).toEqual(["Ticket TCK-9001 was created for a gold customer."]);
    expect(variableValue(completed, "attachmentRef")).toMatchObject({ attachmentId: "evidence-1" });
    expect(variableValue(completed, "ticketId")).toBe("TCK-9001");
    expect(customOperation).toHaveBeenCalledWith(
      expect.objectContaining({ customType: "create_support_ticket" }),
      expect.objectContaining({
        dni: "12345678",
        accountStatus: "active",
        attachment: expect.objectContaining({ attachmentId: "evidence-1" }),
      }),
      expect.any(Object),
    );
    expect(llmResponseGenerator).toHaveBeenCalledWith(
      expect.objectContaining({ allowedVariableIds: ["ticketId", "customerTier"] }),
      expect.any(Object),
    );

    const persistedState = await repositories.states.getByConversationId("conversation-integrated-technical");
    const persistedEvents = await repositories.events.listByConversationId("conversation-integrated-technical");
    const persistedTraces = await repositories.traces.listByConversationId("conversation-integrated-technical");
    expect(persistedState?.status).toBe("completed");
    expect(persistedTraces).toHaveLength(6);
    expect(persistedEvents.map((event) => event.type)).toEqual(
      expect.arrayContaining([
        "flow_call_started",
        "flow_call_waiting_input",
        "flow_call_completed",
        "input_invalid",
        "action_completed",
        "variable_set",
        "llm_response_generation_completed",
        "conversation_completed",
      ]),
    );
    expect(completed.trace.fragments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ source: "operation:custom" }),
        expect.objectContaining({ source: "custom_operation:create_support_ticket" }),
        expect.objectContaining({ source: "llm:response_generation" }),
      ]),
    );
    expect(variableHistory(completed, "verifiedDni")).toEqual([
      expect.objectContaining({ source: "flow_call", nextValue: "12345678" }),
    ]);
    expect(variableHistory(completed, "identityScratch")).toEqual([]);
  });

  it("routes a called flow handoff result through the parent flow without treating it as completed", async () => {
    const repositories = trackingRepositories([
      parentWithHandoffChildFlow(),
      handoffChildFlow(),
    ]);
    const runtime = engineWithRepositories(repositories);

    const result = await runtime.startConversation({
      conversationId: "conversation-called-handoff",
      flowVersionId: "parent-handoff-v1",
    });

    expect(result.error).toBeUndefined();
    expect(result.state.status).toBe("handoff");
    expect(result.state.currentStepId).toBe("call_handoff");
    expect(variableValue(result, "handoffId")).toBeDefined();
    expect(texts(result)).toContain("A specialist will continue this conversation.");
    expect(result.trace.fragments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "operation:call_flow",
          data: expect.objectContaining({ status: "handoff" }),
        }),
      ]),
    );
    expect((await repositories.events.listByConversationId("conversation-called-handoff")).map((event) => event.type)).toEqual(
      expect.arrayContaining(["flow_call_completed", "handoff_started", "conversation_completed"]),
    );
  });

  it.each<[FlowCallStatus, string]>([
    ["cancelled", "The child flow was cancelled."],
    ["failed", "The child flow failed in a controlled way."],
  ])("routes a called flow %s result through parent status branches", async (terminalStatus, expectedMessage) => {
    const repositories = trackingRepositories([
      parentWithTerminalChildFlow(terminalStatus),
      terminalChildFlow(terminalStatus),
    ]);
    const runtime = engineWithRepositories(repositories);

    const result = await runtime.startConversation({
      conversationId: `conversation-called-${terminalStatus}`,
      flowVersionId: `parent-${terminalStatus}-v1`,
    });

    expect(result.error).toBeUndefined();
    expect(result.state.status).toBe("completed");
    expect(texts(result)).toContain(expectedMessage);
    expect(result.trace.fragments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "operation:call_flow",
          data: expect.objectContaining({ status: terminalStatus }),
        }),
      ]),
    );
  });
});

function engineWithRepositories(
  repositories: ConversationEngineRepositories,
  options: Record<string, unknown> = {},
) {
  return createConversationEngine({
    clock: { now: () => NOW },
    idGenerator: deterministicIds(),
    maxStepExecutionsPerTurn: 30,
    ...options,
    repositories,
  }) as ConversationEngine & ConversationEngineModule;
}

function trackingRepositories(flowVersions: FlowVersion[]): ConversationEngineRepositories {
  const flows = new Map(flowVersions.map((flowVersion) => [flowVersion.flowVersionId, clone(flowVersion)]));
  const conversations = new Map<string, Conversation>();
  const states = new Map<string, ConversationState>();
  const events: ConversationEvent[] = [];
  const traces: DecisionTrace[] = [];

  return {
    flowVersions: {
      getById: async (flowVersionId) => clone(flows.get(flowVersionId)),
      save: async (flowVersion) => {
        flows.set(flowVersion.flowVersionId, clone(flowVersion));
      },
    },
    conversations: {
      getById: async (conversationId) => clone(conversations.get(conversationId)),
      save: async (conversation) => {
        conversations.set(conversation.conversationId, clone(conversation));
      },
    },
    states: {
      getByConversationId: async (conversationId) => clone(states.get(conversationId)),
      save: async (state) => {
        states.set(state.conversationId, clone(state));
      },
    },
    events: {
      append: async (newEvents) => {
        events.push(...newEvents.map((event) => clone(event)));
      },
      listByConversationId: async (conversationId) => events
        .filter((event) => event.conversationId === conversationId)
        .map((event) => clone(event)),
    },
    traces: {
      save: async (trace) => {
        traces.push(clone(trace));
      },
      listByConversationId: async (conversationId) => traces
        .filter((trace) => trace.conversationId === conversationId)
        .map((trace) => clone(trace)),
    },
  };
}

function integratedSupportFlow(): FlowVersion {
  return flowVersion(SUPPORT_FLOW_VERSION_ID, {
    flowId: "integrated-support",
    startStepId: "welcome",
    variables: [
      variable("contactReason", "string", "conversation"),
      variable("verifiedDni", "string", "conversation"),
      variable("accountStatus", "string", "conversation"),
      variable("customerTier", "string", "conversation"),
      variable("attachmentRef", "object", "conversation"),
      variable("ticketId", "string", "conversation"),
    ],
    actions: [
      {
        actionId: "lookup_customer",
        kind: "crm",
        resultOutcomes: ["active_customer", "not_found"],
      },
    ],
    steps: [
      messageStep("welcome", ["Welcome to support."], {
        routes: [route("next", branch({ target: stepTarget("main_menu") }))],
      }),
      menuStep("main_menu", "Choose what you need.", [
        option("technical", "Technical support", ["tech"], branch({
          operations: [
            setVariable("contactReason", "technical", "menu_selection"),
            {
              type: "call_flow",
              operationId: "collect_identity",
              flowVersionId: IDENTITY_FLOW_VERSION_ID,
              outputMapping: { dni: "verifiedDni" },
              variableSharing: { scopes: [] },
              onResult: [
                {
                  match: { type: "status", status: "completed" },
                  branch: branch({ target: stepTarget("lookup_customer") }),
                },
              ],
            },
          ],
        })),
      ]),
      messageStep("lookup_customer", [], {
        onEnter: [
          {
            type: "run_action",
            operationId: "lookup_customer",
            actionId: "lookup_customer",
            inputMapping: { dni: variableRef("verifiedDni") },
            outputMapping: {
              accountStatus: "accountStatus",
              customerTier: "customerTier",
            },
            onResult: [
              {
                match: { type: "outcome", outcome: "active_customer" },
                branch: branch({ target: stepTarget("request_attachment") }),
              },
              {
                match: { type: "outcome", outcome: "not_found" },
                branch: branch({ target: endTarget("failed") }),
              },
            ],
          },
        ],
      }),
      attachmentStep("request_attachment", "Attach evidence for the technical request.", "attachmentRef", {
        allowedMimeTypes: ["application/pdf", "image/png", "image/jpeg"],
        allowedExtensions: [".pdf", ".png", ".jpg", ".jpeg"],
        maxSizeMb: 5,
        invalidMessage: "Attach a PDF or image under 5 MB.",
        routes: [route("captured", branch({ target: stepTarget("create_ticket") }))],
      }),
      messageStep("create_ticket", [], {
        onEnter: [
          {
            type: "custom",
            operationId: "create_ticket",
            customOperationId: "create_ticket",
            customType: "create_support_ticket",
            inputMapping: {
              dni: variableRef("verifiedDni"),
              accountStatus: variableRef("accountStatus"),
              attachment: variableRef("attachmentRef"),
            },
            onResult: [
              {
                match: { type: "outcome", outcome: "created" },
                branch: branch({ target: stepTarget("ticket_response") }),
              },
            ],
          },
        ],
      }),
      messageStep("ticket_response", [
        {
          mode: "generated",
          goal: "Write a concise ticket confirmation.",
          allowedVariableIds: ["ticketId", "customerTier"],
          fallbackText: "Your ticket was created.",
        },
      ], {
        routes: [route("next", branch({ target: endTarget("completed") }))],
      }),
    ],
  });
}

function integratedIdentityFlow(): FlowVersion {
  return flowVersion(IDENTITY_FLOW_VERSION_ID, {
    flowId: "integrated-identity",
    startStepId: "identity_prepare",
    variables: [
      variable("dni", "string", "conversation"),
      variable("identityScratch", "string", "flow"),
    ],
    steps: [
      messageStep("identity_prepare", [], {
        onEnter: [setVariable("identityScratch", "child-only", "operation")],
        routes: [route("next", branch({ target: stepTarget("identity_dni") }))],
      }),
      inputStep("identity_dni", "Please enter the customer's DNI.", "dni", {
        validators: [{ type: "regex", options: { pattern: "^\\d+$" } }],
        invalidMessage: "DNI must contain only numbers.",
        routes: [route("captured", branch({ target: endTarget("completed") }))],
      }),
    ],
  });
}

function parentWithHandoffChildFlow(): FlowVersion {
  return flowVersion("parent-handoff-v1", {
    flowId: "parent-handoff",
    startStepId: "call_handoff",
    variables: [variable("handoffId", "string", "conversation")],
    steps: [
      messageStep("call_handoff", [], {
        onEnter: [
          {
            type: "call_flow",
            operationId: "call_specialist_handoff",
            flowVersionId: HANDOFF_CHILD_FLOW_VERSION_ID,
            variableSharing: { scopes: ["conversation"] },
            onResult: [
              {
                match: { type: "status", status: "handoff" },
                branch: branch({ target: endTarget("handoff") }),
              },
              {
                match: { type: "status", status: "completed" },
                branch: branch({ target: endTarget("completed") }),
              },
            ],
          },
        ],
      }),
    ],
  });
}

function handoffChildFlow(): FlowVersion {
  return flowVersion(HANDOFF_CHILD_FLOW_VERSION_ID, {
    flowId: "handoff-child",
    startStepId: "handoff",
    variables: [variable("handoffId", "string", "conversation")],
    steps: [
      messageStep("handoff", [], {
        onEnter: [
          {
            type: "handoff",
            operationId: "child_handoff",
            queue: "specialists",
            handoffIdVariableId: "handoffId",
            message: staticText("A specialist will continue this conversation."),
            onResult: [
              {
                match: { type: "outcome", outcome: "handoff_started" },
                branch: branch({ target: endTarget("handoff") }),
              },
            ],
          },
        ],
      }),
    ],
  });
}

function parentWithTerminalChildFlow(status: FlowCallStatus): FlowVersion {
  return flowVersion(`parent-${status}-v1`, {
    flowId: `parent-${status}`,
    startStepId: "call_child",
    variables: [],
    steps: [
      messageStep("call_child", [], {
        onEnter: [
          {
            type: "call_flow",
            operationId: `call_${status}_child`,
            flowVersionId: `child-${status}-v1`,
            onResult: [
              {
                match: { type: "status", status },
                branch: branch({ target: stepTarget(`${status}_handled`) }),
              },
            ],
          },
        ],
      }),
      messageStep(`${status}_handled`, [
        status === "cancelled"
          ? "The child flow was cancelled."
          : "The child flow failed in a controlled way.",
      ], {
        routes: [route("next", branch({ target: endTarget("completed") }))],
      }),
    ],
  });
}

function terminalChildFlow(status: FlowCallStatus): FlowVersion {
  return flowVersion(`child-${status}-v1`, {
    flowId: `child-${status}`,
    startStepId: "terminal",
    variables: [],
    steps: [
      messageStep("terminal", [], {
        routes: [route("next", branch({ target: endTarget(status) }))],
      }),
    ],
  });
}

function flowVersion(flowVersionId: string, definition: FlowDefinitionFixture): FlowVersion {
  const completeDefinition: ConversationFlowDefinition = {
    variables: [],
    actions: [],
    responses: [],
    settings: { maxStepExecutionsPerTurn: 30 },
    ...definition,
  };

  return {
    flowVersionId,
    flowId: definition.flowId,
    version: "1.0.0",
    status: "published",
    schemaVersion: "0.1",
    createdAt: NOW,
    definition: completeDefinition,
  };
}

function variable(variableId: string, type: VariableType, scope: VariableScope): VariableDefinition {
  return { variableId, type, scope };
}

function messageStep(
  stepId: string,
  messages: Array<string | ResponsePlan>,
  options: MessageStepOptions = {},
): MessageStepDefinition {
  const { autoAdvance = true, ...stepOptions } = options;
  return {
    stepId,
    type: "message",
    config: {
      messages: messages.map((message) => (typeof message === "string" ? staticText(message) : message)),
      autoAdvance,
    },
    ...stepOptions,
  };
}

function menuStep(stepId: string, prompt: string, options: MenuOption[]): MenuStepDefinition {
  return {
    stepId,
    type: "menu",
    config: {
      prompt: staticText(prompt),
      options,
      selection: {
        allowButtons: true,
        allowNumbers: true,
        allowExactText: true,
        allowAliases: true,
      },
      invalidSelection: {
        message: staticText("Please choose one of the listed options."),
        target: { type: "stay" },
        maxRetries: 2,
      },
    },
  };
}

function inputStep(
  stepId: string,
  prompt: string,
  targetVariableId: string,
  options: InputStepOptions = {},
): InputStepDefinition {
  const {
    validators = [],
    invalidMessage = "Please send a valid value.",
    routes = [],
  } = options;

  return {
    stepId,
    type: "input",
    config: {
      prompt: staticText(prompt),
      input: {
        acceptedInputTypes: ["text"],
        bindings: [
          {
            targetVariableId,
            source: "text",
            required: true,
            normalizers: [{ type: "trim" }],
            extractors: [{ type: "raw_text" }],
            validators,
            saveRawInput: false,
          },
        ],
        invalidBehavior: {
          message: staticText(invalidMessage),
          target: { type: "stay" },
          maxRetries: 2,
        },
      },
    },
    routes,
  };
}

function attachmentStep(
  stepId: string,
  prompt: string,
  targetVariableId: string,
  options: AttachmentStepOptions,
): AttachmentStepDefinition {
  return {
    stepId,
    type: "attachment",
    config: {
      prompt: staticText(prompt),
      targetVariableId,
      rules: {
        required: true,
        allowedMimeTypes: options.allowedMimeTypes,
        allowedExtensions: options.allowedExtensions,
        maxSizeMb: options.maxSizeMb,
      },
      invalidAttachment: {
        message: staticText(options.invalidMessage as string),
        target: { type: "stay" },
      },
    },
    routes: options.routes,
  };
}

function option(optionId: string, label: string, aliases: string[], branchValue: StepBranch): MenuOption {
  return {
    optionId,
    label,
    aliases,
    value: optionId,
    branch: branchValue,
  };
}

let branchCounter = 0;

function branch(value: Omit<StepBranch, "branchId">): StepBranch {
  return { branchId: `integration-branch-${++branchCounter}`, ...value };
}

function route(outcome: string, branchValue: StepBranch): StepRoute {
  return {
    routeId: `route-${outcome}`,
    match: { type: "outcome", outcome },
    branch: branchValue,
  };
}

function staticText(text: string): ResponsePlan {
  return { mode: "static", text };
}

function setVariable(variableId: string, value: unknown, source: VariableValueSource): StepOperation {
  return {
    type: "set_variable",
    variableId,
    value: literal(value),
    source,
  };
}

function stepTarget(stepId: string): StepTarget {
  return { type: "step", stepId };
}

function endTarget(status: ConversationStatus): StepTarget {
  return { type: "end", status };
}

function literal(value: unknown): ValueExpression {
  return { type: "literal", value };
}

function variableRef(variableId: string): ValueExpression {
  return { type: "variable", variableId };
}

function textInput(conversationId: string, text: string): UserInput {
  return {
    inputId: `input-${conversationId}-${text}`,
    conversationId,
    type: "text",
    text,
    receivedAt: NOW,
  } as UserInput;
}

function attachmentInput(conversationId: string, attachments: AttachmentInput[]): UserInput {
  return {
    inputId: `input-${conversationId}-attachment-${attachments.length}`,
    conversationId,
    type: "attachment",
    attachments,
    receivedAt: NOW,
  };
}

function texts(result: ProcessTurnResult) {
  return result.messages.map((message) => {
    const content = message.content as { text?: string; payload?: { text?: string } };
    return content.text ?? content.payload?.text;
  });
}

function variableValue(result: ProcessTurnResult, variableId: string) {
  const values = result.state.variables as Record<string, { value?: unknown }>;
  return values[variableId]?.value;
}

function variableHistory(result: ProcessTurnResult, variableId: string) {
  const state = result.state as unknown as {
    variableHistory?: Record<string, unknown[]>;
    variables?: { history?: Record<string, unknown[]> };
  };

  return state.variableHistory?.[variableId] ?? state.variables?.history?.[variableId] ?? [];
}

function deterministicIds() {
  let nextId = 0;
  const next = (prefix: string) => `${prefix}-${++nextId}`;

  return {
    newConversationId: () => next("conversation"),
    newTurnId: () => next("turn"),
    newMessageId: () => next("message"),
    newEventId: () => next("event"),
    newTraceId: () => next("trace"),
    newCandidateId: () => next("candidate"),
    newExecutionFrameId: () => next("frame"),
    newHandoffId: () => next("handoff"),
  };
}

function clone<T>(value: T): T {
  return value === undefined ? value : structuredClone(value);
}
