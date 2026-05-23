import {
  createConversationApi,
  type ConditionBranch,
  type ConditionExpression,
  type ConversationApiChoice,
  type ConversationApiHttpResponse,
  type ConversationApiMessage,
  type ConversationApiVariable,
  type ConversationStatus,
  type FlowVersion,
  type GeneratedResponsePlan,
  type InputProcessingContext,
  type LlmGeneratedResponse,
  type MenuOption,
  type ResponsePlan,
  type ResponseRenderingContext,
  type SemanticInputResolution,
  type SemanticInputTask,
  type StepBranch,
  type StepOperation,
  type StepRoute,
  type StepOutcome,
  type StepTarget,
  type UserInput,
  type ValueExpression,
  type ValidatorDefinition,
  type VariableId,
  type VariableScope,
  type VariableType,
  type VariableValueSource,
} from "../../../src/index";

const now = "2026-05-22T12:00:00.000Z";
const flowVersionId = "support_assistant_v1";

export type HomeDemoChoiceId = "technical_support" | "billing" | "contact_agent";

export interface HomeDemoEntry {
  readonly speaker: "user" | "dialit";
  readonly text: string;
}

export interface HomeDemoRun {
  readonly selectedChoiceId: HomeDemoChoiceId;
  readonly selectedChoiceLabel: string;
  readonly menuChoices: readonly ConversationApiChoice[];
  readonly conversation: readonly HomeDemoEntry[];
  readonly variables: readonly [string, string][];
  readonly trace: readonly string[];
  readonly code: readonly string[];
  readonly status: string;
  readonly currentStepId: string;
  readonly source: string;
  readonly response: ConversationApiHttpResponse;
}

export async function runHomeDemoScenario(selectedChoiceId: HomeDemoChoiceId): Promise<HomeDemoRun> {
  const api = createConversationApi({
    clock: { now: () => now },
    idGenerator: deterministicIds(),
    flowVersions: [supportAssistantVersion()],
    maxStepExecutionsPerTurn: 40,
    actionHandlers: {
      local: async (action) => {
        if (action.actionId === "createTechnicalTicket") {
          return {
            status: "success",
            outcome: "created",
            outputs: {
              ticketId: "TECH-4821",
            },
          };
        }
        if (action.actionId === "createHandoff") {
          return {
            status: "success",
            outcome: "handoff_started",
            outputs: {
              handoffId: "HND-2048",
            },
          };
        }
        return { status: "error", outcome: "error" };
      },
    },
    semanticInputResolver: async <TOutcome extends StepOutcome = StepOutcome, TVariableId extends VariableId = VariableId>(
      _input: UserInput,
      task: SemanticInputTask<TOutcome, TVariableId>,
      _context: InputProcessingContext,
    ): Promise<SemanticInputResolution<TOutcome, TVariableId>> => {
      const outcome = (task.allowedOutcomes.find((candidate: TOutcome) => candidate === "billing_wrong_charge")
        ?? task.allowedOutcomes[0]) as TOutcome;

      return {
        taskId: task.taskId,
        status: "resolved",
        allowedOutcomes: task.allowedOutcomes,
        allowedVariableIds: task.allowedVariableIds,
        candidates: [],
        outcome,
        confidence: 0.94,
        trace: {
          source: "site:home_demo_semantic",
          data: { outcome },
        },
      };
    },
    llmResponseGenerator: async <TVariableId extends VariableId = VariableId>(
      _plan: GeneratedResponsePlan<TVariableId>,
      context: ResponseRenderingContext,
    ): Promise<LlmGeneratedResponse<TVariableId>> => ({
      text: `Ticket ${context.state.variables.ticketId?.value} is ready. We captured the technical issue and kept the full route traceable.`,
      usedVariableIds: ["ticketId", "technicalIssueDescription"] as TVariableId[],
    }),
  });

  const conversationId = `home-demo-${selectedChoiceId}`;
  const start = await api.start({
    conversationId,
    flowVersionId,
    channel: "web",
  });
  const selectedChoice = start.body.choices.find((choice) => choice.optionId === selectedChoiceId)
    ?? start.body.choices[0];

  if (!selectedChoice || !isHomeDemoChoiceId(selectedChoice.optionId)) {
    throw new Error("Home demo flow did not expose a supported main menu option.");
  }

  const turns: HomeDemoEntry[] = messagesToEntries(start.body.messages);
  turns.push({ speaker: "user", text: selectedChoice.label });

  let latest = await api.selectOption({
    conversationId,
    optionId: selectedChoice.optionId,
    label: selectedChoice.label,
    inputId: `${conversationId}-select-main`,
    receivedAt: now,
  });
  turns.push(...messagesToEntries(latest.body.messages));

  if (selectedChoice.optionId === "technical_support") {
    latest = await sendText(api, conversationId, "The internet connection drops every few minutes.", "issue");
    turns.push({
      speaker: "user",
      text: "The internet connection drops every few minutes.",
    }, ...messagesToEntries(latest.body.messages));
  }

  if (selectedChoice.optionId === "billing") {
    latest = await sendText(api, conversationId, "I was charged twice for the same invoice.", "billing");
    turns.push({
      speaker: "user",
      text: "I was charged twice for the same invoice.",
    }, ...messagesToEntries(latest.body.messages));
  }

  if (selectedChoice.optionId === "contact_agent") {
    const humanChoice = latest.body.choices.find((choice) => choice.optionId === "human_agent")
      ?? latest.body.choices[0];
    if (humanChoice) {
      latest = await api.selectOption({
        conversationId,
        optionId: humanChoice.optionId,
        label: humanChoice.label,
        inputId: `${conversationId}-select-agent`,
        receivedAt: now,
      });
      turns.push({ speaker: "user", text: humanChoice.label }, ...messagesToEntries(latest.body.messages));
    }
  }

  return {
    selectedChoiceId: selectedChoice.optionId,
    selectedChoiceLabel: selectedChoice.label,
    menuChoices: start.body.choices,
    conversation: turns,
    variables: formatVariables(latest.body.variables),
    trace: formatTrace(latest),
    code: formatCode(selectedChoice.optionId),
    status: latest.body.status,
    currentStepId: latest.body.currentStepId,
    source: "createConversationApi -> support_assistant_v1",
    response: latest,
  };
}

export function isHomeDemoChoiceId(value: string): value is HomeDemoChoiceId {
  return value === "technical_support" || value === "billing" || value === "contact_agent";
}

function supportAssistantVersion(): FlowVersion {
  return {
    flowVersionId,
    flowId: "support_assistant",
    version: "1.0.0",
    schemaVersion: "0.1",
    status: "published",
    createdAt: now,
    definition: {
      flowId: "support_assistant",
      startStepId: "welcome",
      variables: [
        variable("contactReason", "string", "conversation"),
        variable("technicalIssueDescription", "string", "conversation"),
        variable("ticketId", "string", "conversation"),
        variable("billingQuestion", "string", "conversation"),
        variable("billingArea", "string", "conversation"),
        variable("agentContactChannel", "string", "conversation"),
        variable("handoffId", "string", "conversation"),
      ],
      actions: [
        { actionId: "createTechnicalTicket", kind: "local", resultOutcomes: ["created", "error"] },
        { actionId: "createHandoff", kind: "local", resultOutcomes: ["handoff_started", "error"] },
      ],
      steps: [
        messageStep("welcome", ["Hello!", "Thanks for contacting us."], {
          routes: [route("next", branch({ target: stepTarget("main_menu") }))],
        }),
        menuStep("main_menu", "How can I help you?", [
          option("technical_support", "Technical support", ["tech"], branch({
            operations: [
              setVariable("contactReason", "technical_support", "menu_selection"),
              sendMessage("Perfect, I need a few details to get started."),
            ],
            target: stepTarget("ask_technical_issue"),
          })),
          option("billing", "Billing question", ["billing", "invoice"], branch({
            operations: [setVariable("contactReason", "billing", "menu_selection")],
            target: stepTarget("ask_billing_question"),
          })),
          option("contact_agent", "Contact an agent", ["agent", "human"], branch({
            operations: [setVariable("contactReason", "contact_agent", "menu_selection")],
            target: stepTarget("agent_contact_menu"),
          })),
        ]),
        inputStep("ask_technical_issue", "Please describe the technical issue.", "technicalIssueDescription", {
          validators: [{ type: "required" }, { type: "min_length", options: { min: 10 } }],
          routes: [route("captured", branch({ target: stepTarget("create_ticket") }))],
        }),
        messageStep("create_ticket", [], {
          onEnter: [
            {
              type: "run_action",
              operationId: "create_technical_ticket",
              actionId: "createTechnicalTicket",
              inputMapping: {
                issue: variableRef("technicalIssueDescription"),
              },
              outputMapping: { ticketId: "ticketId" },
              onResult: [
                {
                  match: { type: "outcome", outcome: "created" },
                  branch: branch({ target: stepTarget("ticket_created") }),
                },
              ],
            },
          ],
        }),
        messageStep("ticket_created", [
          {
            mode: "generated",
            goal: "Confirm that the technical support ticket was created.",
            allowedVariableIds: ["ticketId", "technicalIssueDescription"],
            constraints: ["Do not invent service-level agreements.", "Keep the message under 30 words."],
            fallbackText: "Your support ticket has been created.",
          },
        ], {
          routes: [route("next", branch({ target: endTarget("completed") }))],
        }),
        inputStep("ask_billing_question", "Tell me what your billing question is.", "billingQuestion", {
          semanticTasks: [
            {
              taskId: "classify_billing_area",
              mode: "after_valid_capture",
              allowedOutcomes: ["billing_payment", "billing_invoice", "billing_wrong_charge", "billing_other"],
              threshold: 0.75,
              saveOutcomeToVariableId: "billingArea",
              promptHint: "Classify the billing question into the declared outcomes only.",
            },
          ],
          routes: [route("captured", branch({ target: stepTarget("billing_condition") }))],
        }),
        conditionStep("billing_condition", [
          {
            branchId: "billing_wrong_charge",
            outcome: "billing_wrong_charge",
            when: equals(variableRef("billingArea"), literal("billing_wrong_charge")),
            branch: branch({ target: stepTarget("billing_wrong_charge_response") }),
          },
        ], branch({ target: stepTarget("billing_other_response") })),
        messageStep("billing_wrong_charge_response", [
          "I classified this as a disputed charge and routed it through the billing review path.",
        ], {
          routes: [route("next", branch({ target: endTarget("completed") }))],
        }),
        messageStep("billing_other_response", ["I saved your billing question for review."], {
          routes: [route("next", branch({ target: endTarget("completed") }))],
        }),
        menuStep("agent_contact_menu", "How would you like to contact an agent?", [
          option("human_agent", "Contact a human agent", ["human"], branch({
            operations: [
              setVariable("agentContactChannel", "human", "menu_selection"),
              {
                type: "run_action",
                operationId: "create_handoff",
                actionId: "createHandoff",
                inputMapping: { contactReason: variableRef("contactReason") },
                outputMapping: { handoffId: "handoffId" },
                onResult: [
                  {
                    match: { type: "outcome", outcome: "handoff_started" },
                    branch: branch({ target: stepTarget("handoff_ready") }),
                  },
                ],
              },
            ],
          })),
          option("email_contact", "Contact me by email", ["email"], branch({
            operations: [setVariable("agentContactChannel", "email", "menu_selection")],
            target: stepTarget("email_contact_ready"),
          })),
        ]),
        messageStep("handoff_ready", ["A human agent will continue this conversation with the captured context."], {
          routes: [route("next", branch({ target: endTarget("handoff") }))],
        }),
        messageStep("email_contact_ready", ["We will contact you by email."], {
          routes: [route("next", branch({ target: endTarget("completed") }))],
        }),
      ],
    },
  };
}

async function sendText(
  api: ReturnType<typeof createConversationApi>,
  conversationId: string,
  text: string,
  suffix: string,
): Promise<ConversationApiHttpResponse> {
  return api.sendMessage({
    conversationId,
    text,
    inputId: `${conversationId}-${suffix}`,
    receivedAt: now,
  });
}

function messagesToEntries(messages: readonly ConversationApiMessage[]): HomeDemoEntry[] {
  return messages
    .map((message) => message.text)
    .filter((text): text is string => typeof text === "string" && text.length > 0)
    .map((text) => ({ speaker: "dialit", text }));
}

function formatVariables(variables: Record<string, ConversationApiVariable>): [string, string][] {
  return Object.entries(variables)
    .filter(([, variableValue]) => variableValue.value !== undefined)
    .map(([name, variableValue]) => [name, formatValue(variableValue.value)]);
}

function formatTrace(response: ConversationApiHttpResponse): string[] {
  const trace = response.body.trace;
  const lines = [
    trace.initialStepId ? `Started on ${trace.initialStepId}` : undefined,
    ...response.body.events.map((event) => eventLabel(event.type)),
    ...trace.variablePatches.map((patch) => `Wrote ${patch.variableId} from ${patch.source}`),
    ...(trace.llmUsage ?? []).map((usage) => `LLM used for ${usage.purpose}`),
    trace.finalStepId ? `Finished on ${trace.finalStepId}` : undefined,
  ].filter((line): line is string => Boolean(line));

  return [...new Set(lines)].slice(0, 6);
}

function eventLabel(type: string): string {
  const labels: Record<string, string> = {
    menu_option_selected: "MenuStep selected an option",
    input_resolved: "InputStep resolved user input",
    action_completed: "RunActionOperation completed",
    condition_evaluated: "ConditionStep evaluated routing",
    semantic_input_task_completed: "SemanticInputTask selected an allowed outcome",
    llm_response_generation_completed: "GeneratedResponsePlan rendered a reply",
    transition_taken: "TransitionResolver moved to the next step",
  };

  return labels[type] ?? "";
}

function formatCode(choiceId: HomeDemoChoiceId): string[] {
  const lines = [
    "const api = createConversationApi({ flowVersions, actionHandlers });",
    "await api.start({ flowVersionId: \"support_assistant_v1\" });",
    `await api.selectOption({ optionId: "${choiceId}" });`,
  ];

  if (choiceId === "technical_support") {
    lines.push('await api.sendMessage({ text: "The internet connection drops every few minutes." });');
  }
  if (choiceId === "billing") {
    lines.push('await api.sendMessage({ text: "I was charged twice for the same invoice." });');
  }
  if (choiceId === "contact_agent") {
    lines.push('await api.selectOption({ optionId: "human_agent" });');
  }

  return lines;
}

function variable(variableId: string, type: VariableType, scope: VariableScope) {
  return { variableId, type, scope };
}

function messageStep(
  stepId: string,
  messages: readonly (string | ResponsePlan)[],
  options: Record<string, unknown> = {},
) {
  return {
    stepId,
    type: "message" as const,
    config: {
      messages: messages.map((message) => (typeof message === "string" ? staticText(message) : message)),
      autoAdvance: true,
    },
    ...options,
  };
}

function menuStep(stepId: string, prompt: string, options: MenuOption[]) {
  return {
    stepId,
    type: "menu" as const,
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
        target: { type: "stay" as const },
        maxRetries: 2,
      },
    },
  };
}

function inputStep(
  stepId: string,
  prompt: string,
  targetVariableId: string,
  options: {
    readonly validators?: readonly ValidatorDefinition[];
    readonly invalidMessage?: string;
    readonly routes?: readonly StepRoute[];
    readonly semanticTasks?: readonly {
      readonly taskId: string;
      readonly mode: "after_valid_capture";
      readonly allowedOutcomes: readonly string[];
      readonly threshold: number;
      readonly saveOutcomeToVariableId?: string;
      readonly promptHint?: string;
    }[];
  } = {},
) {
  return {
    stepId,
    type: "input" as const,
    config: {
      prompt: staticText(prompt),
      input: {
        acceptedInputTypes: ["text" as const],
        bindings: [
          {
            targetVariableId,
            source: "text" as const,
            required: true,
            normalizers: [{ type: "trim" }],
            extractors: [{ type: "raw_text" }],
            validators: [...(options.validators ?? [])],
          },
        ],
        semanticTasks: [...(options.semanticTasks ?? [])],
        invalidBehavior: {
          message: staticText(options.invalidMessage ?? "Please send a valid value."),
          target: { type: "stay" as const },
          maxRetries: 2,
        },
      },
    },
    routes: [...(options.routes ?? [])],
  };
}

function conditionStep(stepId: string, branches: ConditionBranch[], defaultBranch?: StepBranch) {
  return {
    stepId,
    type: "condition" as const,
    config: {
      branches,
      defaultBranch,
    },
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

let branchId = 0;
function branch(value: Omit<StepBranch, "branchId">): StepBranch {
  branchId += 1;
  return { branchId: `home_branch_${branchId}`, ...value };
}

function route(outcome: string, branchValue: StepBranch): StepRoute {
  return {
    routeId: `route_${outcome}`,
    match: { type: "outcome", outcome },
    branch: branchValue,
  };
}

function sendMessage(text: string): StepOperation {
  return { type: "send_message", message: staticText(text) };
}

function setVariable(variableId: string, value: unknown, source: VariableValueSource): StepOperation {
  return {
    type: "set_variable",
    variableId,
    value: literal(value),
    source,
  };
}

function staticText(text: string): ResponsePlan {
  return { mode: "static", text };
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

function equals(left: ValueExpression, right: ValueExpression): ConditionExpression {
  return { type: "equals", left, right };
}

function formatValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  return JSON.stringify(value);
}

function deterministicIds() {
  let id = 0;
  const next = (prefix: string) => `${prefix}-${++id}`;
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
