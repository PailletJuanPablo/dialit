import {
  createConversationEngine,
  validateFlowDefinition,
  type ActionResult,
  type ActionHandler,
  type AttachmentInput,
  type CommandCandidate,
  type ConversationEngine,
  type ConversationEngineModule,
  type ConversationFlowDefinition,
  type FlowVersion,
  type IdGenerator,
  type LlmResponseGenerator,
  type ProcessTurnResult,
  type SemanticInputResolution,
  type SemanticInputResolver,
  type SemanticInputTask,
  type StepOutcome,
  type StepBranch,
  type StepTarget,
  type UserInput,
  type ValidationIssue,
  type VariableId,
} from "../../../src/index";

export const demoFlowVersionId = "web-chatbot-demo-v1";
export const defaultDemoConversationId = "web-chatbot-demo";
export const demoNow = "2026-05-22T12:00:00.000Z";

export interface DemoChatbotSession {
  readonly conversationId: string;
  readonly engine: ConversationEngine & ConversationEngineModule;
  readonly validationIssues: readonly ValidationIssue[];
  start(): Promise<ProcessTurnResult>;
  sendText(text: string): Promise<ProcessTurnResult>;
  sendChoice(optionId: string, label?: string): Promise<ProcessTurnResult>;
  sendAttachments(attachments: AttachmentInput[]): Promise<ProcessTurnResult>;
  skipAttachment(): Promise<ProcessTurnResult>;
}

export interface DemoChatbotSessionOptions {
  readonly conversationId?: string;
}

export function createDemoChatbotSession(options: DemoChatbotSessionOptions = {}): DemoChatbotSession {
  const conversationId = options.conversationId ?? defaultDemoConversationId;
  const flowVersion = createDemoFlowVersion();
  const validation = validateFlowDefinition(flowVersion.definition, {
    registeredValidatorTypes: [],
    registeredNormalizerTypes: [],
    registeredExtractorTypes: [],
    registeredCustomOperationTypes: [],
    registeredOperationTypes: [],
    registeredStepTypes: [],
  });
  if (!validation.valid) {
    throw new Error(`Demo flow is invalid: ${validation.issues.map((issue) => issue.code).join(", ")}`);
  }

  const engine = createConversationEngine({
    clock: { now: () => demoNow },
    idGenerator: createDemoIdGenerator(),
    flowVersions: [flowVersion],
    maxStepExecutionsPerTurn: 20,
    actionHandlers: {
      demo_ticket: createTicketActionHandler(),
    },
    semanticInputResolver: createDemoSemanticResolver(),
    llmResponseGenerator: createDemoResponseGenerator(),
  });

  let inputIndex = 0;
  const nextInputId = () => `demo-input-${++inputIndex}`;

  return {
    conversationId,
    engine,
    validationIssues: validation.issues,
    start: () => engine.startConversation({ conversationId, flowVersionId: demoFlowVersionId, channel: "web" }),
    sendText: (text) => engine.processUserInput({
      conversationId,
      input: {
        inputId: nextInputId(),
        conversationId,
        type: "text",
        text,
        channel: "web",
        receivedAt: demoNow,
      },
    }),
    sendChoice: (optionId, label) => engine.processUserInput({
      conversationId,
      input: {
        inputId: nextInputId(),
        conversationId,
        type: "choice",
        optionId,
        label,
        channel: "web",
        receivedAt: demoNow,
      },
    }),
    sendAttachments: (attachments) => engine.processUserInput({
      conversationId,
      input: {
        inputId: nextInputId(),
        conversationId,
        type: "attachment",
        attachments,
        channel: "web",
        receivedAt: demoNow,
      },
    }),
    skipAttachment: () => engine.processUserInput({
      conversationId,
      input: {
        inputId: nextInputId(),
        conversationId,
        type: "attachment",
        attachments: [],
        channel: "web",
        receivedAt: demoNow,
      },
    }),
  };
}

export function createDemoFlowVersion(): FlowVersion {
  return {
    flowVersionId: demoFlowVersionId,
    flowId: "web-chatbot-demo",
    version: "1.0.0",
    schemaVersion: "0.1",
    status: "draft",
    createdAt: demoNow,
    definition: demoFlowDefinition,
  };
}

const demoFlowDefinition: ConversationFlowDefinition = {
  flowId: "web-chatbot-demo",
  startStepId: "welcome",
  variables: [
    { variableId: "contactReason", type: "string", scope: "conversation" },
    { variableId: "billingQuestion", type: "string", scope: "conversation" },
    { variableId: "billingCategory", type: "string", scope: "conversation" },
    { variableId: "customerEmail", type: "email", scope: "conversation" },
    { variableId: "attachmentRef", type: "file", scope: "conversation" },
    { variableId: "supportTicketId", type: "string", scope: "conversation" },
    { variableId: "handoffId", type: "string", scope: "conversation" },
  ],
  actions: [
    {
      actionId: "create_support_ticket",
      kind: "demo_ticket",
      resultOutcomes: ["created"],
      sideEffect: true,
    },
  ],
  steps: [
    {
      stepId: "welcome",
      type: "message",
      config: {
        messages: [
          staticText("Welcome to the Nexembot demo."),
        ],
      },
      routes: [
        route("next", branch({ target: stepTarget("main_menu") })),
      ],
    },
    {
      stepId: "main_menu",
      type: "menu",
      config: {
        prompt: staticText("Choose a path to validate the engine."),
        selection: {
          allowButtons: true,
          allowNumbers: true,
          allowExactText: true,
          allowAliases: true,
        },
        options: [
          {
            optionId: "billing",
            label: "Billing question",
            aliases: ["billing", "balance", "debt"],
            branch: branch({
              operations: [setVariable("contactReason", "billing", "menu_selection")],
              target: stepTarget("billing_question"),
            }),
          },
          {
            optionId: "support",
            label: "Support ticket",
            aliases: ["support", "ticket", "technical"],
            branch: branch({
              operations: [setVariable("contactReason", "support", "menu_selection")],
              target: stepTarget("support_email"),
            }),
          },
          {
            optionId: "human",
            label: "Talk to a human",
            aliases: ["human", "agent", "person"],
            branch: branch({
              operations: [setVariable("contactReason", "handoff", "menu_selection")],
              target: stepTarget("handoff"),
            }),
          },
        ],
      },
    },
    {
      stepId: "billing_question",
      type: "input",
      config: {
        prompt: staticText("Describe your billing question."),
        input: {
          acceptedInputTypes: ["text"],
          bindings: [
            {
              targetVariableId: "billingQuestion",
              source: "text",
              normalizers: [{ type: "trim" }],
              validators: [{ type: "required" }],
            },
          ],
          semanticTasks: [
            {
              taskId: "classify_billing_question",
              mode: "after_valid_capture",
              allowedOutcomes: ["billing_debt", "billing_charge_error", "billing_other"],
              allowedVariableIds: ["billingCategory"],
              threshold: 0.75,
            },
          ],
          invalidBehavior: {
            message: staticText("Write a short billing question."),
          },
        },
      },
      routes: [
        route("captured", branch({ target: stepTarget("billing_condition") })),
      ],
    },
    {
      stepId: "billing_condition",
      type: "condition",
      config: {
        branches: [
          {
            branchId: "billing_debt_branch",
            outcome: "billing_debt",
            when: {
              type: "equals",
              left: variableValue("billingCategory"),
              right: literalValue("debt"),
            },
            branch: branch({ target: stepTarget("billing_debt_message") }),
          },
          {
            branchId: "billing_error_branch",
            outcome: "billing_charge_error",
            when: {
              type: "equals",
              left: variableValue("billingCategory"),
              right: literalValue("charge_error"),
            },
            branch: branch({ target: stepTarget("billing_error_message") }),
          },
        ],
        defaultBranch: branch({ branchId: "billing_other_branch", target: stepTarget("billing_other_message") }),
      },
    },
    messageStep("billing_debt_message", "Your balance question was classified as debt."),
    messageStep("billing_error_message", "Your billing question looks like a charge error."),
    messageStep("billing_other_message", "Your billing question was saved as a general inquiry."),
    {
      stepId: "support_email",
      type: "input",
      config: {
        prompt: staticText("What email should we use for updates?"),
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
            message: staticText("Enter a valid email address."),
          },
        },
      },
      routes: [
        route("captured", branch({ target: stepTarget("support_attachment") })),
      ],
    },
    {
      stepId: "support_attachment",
      type: "attachment",
      config: {
        prompt: staticText("Attach a PDF or image, or skip this step."),
        targetVariableId: "attachmentRef",
        rules: {
          required: false,
          maxFiles: 2,
          allowedMimeTypes: ["application/pdf", "image/png", "image/jpeg"],
          allowedExtensions: [".pdf", ".png", ".jpg", ".jpeg"],
          maxSizeMb: 5,
        },
        invalidAttachment: {
          message: staticText("Use PDF, PNG, or JPG files under 5 MB."),
        },
      },
      routes: [
        route("captured", branch({ target: stepTarget("create_ticket") })),
        route("skipped", branch({ target: stepTarget("create_ticket") })),
      ],
    },
    {
      stepId: "create_ticket",
      type: "message",
      onEnter: [
        {
          type: "run_action",
          operationId: "create_support_ticket_operation",
          actionId: "create_support_ticket",
          inputMapping: {
            email: variableValue("customerEmail"),
          },
          outputMapping: {
            ticketId: "supportTicketId",
          },
          onResult: [
            {
              match: { type: "outcome", outcome: "created" },
              branch: branch({ branchId: "ticket_created_branch", target: stepTarget("ticket_response") }),
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
            goal: "Confirm the demo support ticket in one concise sentence.",
            allowedVariableIds: ["supportTicketId", "customerEmail"],
            fallbackText: "Your support ticket was created.",
          },
        ],
      },
      routes: [
        route("next", branch({ target: endTarget("completed") })),
      ],
    },
    {
      stepId: "handoff",
      type: "message",
      onEnter: [
        {
          type: "handoff",
          operationId: "demo_handoff_operation",
          channel: "web",
          queue: "demo-support",
          reason: literalValue("User requested a human from the demo."),
          handoffIdVariableId: "handoffId",
          message: staticText("A human specialist will continue this conversation."),
          onResult: [
            {
              match: { type: "status", status: "success" },
              branch: branch({ branchId: "handoff_success_branch", target: endTarget("handoff") }),
            },
          ],
        },
      ],
      config: { messages: [] },
    },
  ],
};

const createTicketActionHandler = (): ActionHandler => ({
  actionKind: "demo_ticket",
  execute: async (): Promise<ActionResult> => ({
    status: "success",
    outcome: "created",
    outputs: {
      ticketId: "DEMO-1001",
    },
  }),
});

const createDemoSemanticResolver = (): SemanticInputResolver => ({
  resolve: async <TOutcome extends StepOutcome = StepOutcome, TVariableId extends VariableId = VariableId>(
    input: UserInput,
    task: SemanticInputTask<TOutcome, TVariableId>,
  ): Promise<SemanticInputResolution<TOutcome, TVariableId>> => {
    const variables: Partial<Record<TVariableId, unknown>> = {};
    const billingCategoryId = task.allowedVariableIds?.find((variableId) => variableId === "billingCategory");
    if (input.type !== "text") {
      const fallbackOutcome = task.allowedOutcomes.find((outcome) => outcome === "billing_other") ?? task.allowedOutcomes[0];
      if (billingCategoryId) variables[billingCategoryId] = "other";
      return semanticResolution(task.allowedOutcomes, task.allowedVariableIds, fallbackOutcome, 0.1, variables);
    }
    const normalized = input.text.toLowerCase();
    const isDebt = ["owe", "debt", "balance", "pay"].some((word) => normalized.includes(word));
    const isChargeError = ["wrong", "error", "charged", "duplicate"].some((word) => normalized.includes(word));
    const debtOutcome = task.allowedOutcomes.find((outcome) => outcome === "billing_debt");
    const chargeErrorOutcome = task.allowedOutcomes.find((outcome) => outcome === "billing_charge_error");
    const otherOutcome = task.allowedOutcomes.find((outcome) => outcome === "billing_other") ?? task.allowedOutcomes[0];
    if (isDebt && debtOutcome) {
      if (billingCategoryId) variables[billingCategoryId] = "debt";
      return semanticResolution(task.allowedOutcomes, task.allowedVariableIds, debtOutcome, 0.94, variables);
    }
    if (isChargeError && chargeErrorOutcome) {
      if (billingCategoryId) variables[billingCategoryId] = "charge_error";
      return semanticResolution(task.allowedOutcomes, task.allowedVariableIds, chargeErrorOutcome, 0.91, variables);
    }
    if (billingCategoryId) variables[billingCategoryId] = "other";
    return semanticResolution(task.allowedOutcomes, task.allowedVariableIds, otherOutcome, 0.82, variables);
  },
});

function semanticResolution<TOutcome extends StepOutcome, TVariableId extends VariableId>(
  allowedOutcomes: readonly TOutcome[],
  allowedVariableIds: readonly TVariableId[] | undefined,
  outcome: TOutcome | undefined,
  confidence: number,
  variables: Partial<Record<TVariableId, unknown>>,
): SemanticInputResolution<TOutcome, TVariableId> {
  const candidate: CommandCandidate<TOutcome, TVariableId> = {
    candidateId: "demo-semantic-candidate",
    type: "semantic_outcome",
    source: "demo_semantic_resolver",
    confidence,
    ...(outcome === undefined ? {} : { outcome }),
  };
  return {
    status: "resolved",
    candidates: [candidate],
    selectedCandidate: candidate,
    allowedOutcomes,
    ...(allowedVariableIds === undefined ? {} : { allowedVariableIds }),
    confidence,
    variables,
    ...(outcome === undefined ? {} : { outcome }),
    trace: { source: "demo:semantic", data: { outcome, confidence } },
  };
}

const createDemoResponseGenerator = (): LlmResponseGenerator => ({
  generate: async (plan, context) => {
    const ticketId = context.state.variables.supportTicketId?.value;
    const email = context.state.variables.customerEmail?.value;
    return {
      text: `Ticket ${String(ticketId)} is ready for ${String(email)}.`,
      usedVariableIds: plan.allowedVariableIds.filter((variableId) => variableId === "supportTicketId" || variableId === "customerEmail"),
    };
  },
});

function messageStep(stepId: string, text: string) {
  return {
    stepId,
    type: "message" as const,
    config: {
      messages: [staticText(text)],
    },
    routes: [
      route("next", branch({ target: endTarget("completed") })),
    ],
  };
}

function staticText(text: string) {
  return { mode: "static" as const, text };
}

function setVariable(variableId: string, value: string, source: "menu_selection") {
  return {
    type: "set_variable" as const,
    variableId,
    value: literalValue(value),
    source,
  };
}

function variableValue(variableId: string) {
  return { type: "variable" as const, variableId };
}

function literalValue(value: string) {
  return { type: "literal" as const, value };
}

function branch(value: StepBranch): StepBranch {
  return value;
}

function route(outcome: string, branchValue: StepBranch) {
  return {
    routeId: `route_${outcome}`,
    match: { type: "outcome" as const, outcome },
    branch: branchValue,
  };
}

function stepTarget(stepId: string): StepTarget {
  return { type: "step" as const, stepId };
}

function endTarget(status: "completed" | "handoff"): StepTarget {
  return { type: "end" as const, status };
}

function createDemoIdGenerator(): Partial<IdGenerator> {
  const counters = new Map<string, number>();
  const next = (prefix: string) => {
    const value = (counters.get(prefix) ?? 0) + 1;
    counters.set(prefix, value);
    return `${prefix}-${value}`;
  };
  return {
    newFlowVersionId: () => next("flow-version"),
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
