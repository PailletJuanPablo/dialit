import type {
  ActionDefinition,
  ActionExecutionContext,
  AttachmentInput,
  AttachmentStepDefinition,
  CallFlowOperation,
  ConditionExpression,
  ConditionStepDefinition,
  Conversation,
  ConversationEngine,
  ConversationEngineModule,
  ConversationEngineRepositories,
  ConversationEvent,
  ConversationEventType,
  ConversationEngineConfig,
  CreateConversationEngineOptions,
  ConversationState,
  CustomOperation,
  CustomOperationResult,
  DecisionTrace,
  FlowCallStatus,
  FlowExecutionFrame,
  FlowVersion,
  HandoffOperation,
  IdGenerator,
  InputProcessingContext,
  InputStepDefinition,
  InvalidInputBehavior,
  LlmGeneratedResponse,
  LlmUsageRecord,
  MenuOption,
  MenuStepDefinition,
  MessageStepDefinition,
  Metadata,
  OperationExecutionContext,
  OperationResult,
  OutboundMessage,
  PendingInputState,
  ProcessTurnResult,
  ResponsePlan,
  ResponseRenderingContext,
  RuntimeContext,
  RuntimeError,
  RuntimeClock,
  RuntimeServices,
  SemanticInputResolution,
  SemanticInputTask,
  StepBranch,
  StepDefinition,
  StepExecutionContext,
  StepHandler,
  StepOperation,
  StepOutcome,
  StepResult,
  StepTarget,
  TraceBuildInput,
  TraceFragment,
  Turn,
  UserInput,
  ValidatorDefinition,
  VariableHistoryEntry,
  VariableId,
  VariablePatch,
  VariableScope,
  VariableValue,
  VariableValueSource,
  ValueExpression,
} from "./types.js";

type EngineOptions = CreateConversationEngineOptions;

type IdFactoryName = keyof IdGenerator;

type RuntimeVariableValue = VariableValue & {
  metadata?: Metadata;
};

type InternalState = Omit<ConversationState, "variables" | "variableHistory"> & {
  variables: Record<VariableId, RuntimeVariableValue>;
  scopedVariables: Record<string, RuntimeVariableValue>;
  variableHistory: Record<VariableId, VariableHistoryEntry[]>;
  __flowScopes?: Record<string, VariableScope>;
};

type FlowCallFrameMetadata = Metadata & {
  kind: "flow_call";
  operation: RuntimeCallFlowOperation;
  parentFrame: Pick<InternalState, "currentStepId" | "status" | "pendingInput">;
  parentScopedVariables: InternalState["scopedVariables"];
  parentVariableHistory: InternalState["variableHistory"];
  childScopedVariables: InternalState["scopedVariables"];
  childVariableHistory: InternalState["variableHistory"];
  continuation?: OperationContinuation;
};

type FlowCallExecutionFrame = FlowExecutionFrame & {
  metadata: FlowCallFrameMetadata;
};

type RuntimeHandoffOperation = HandoffOperation & {
  queueId?: string;
  saveHandoffIdToVariableId?: VariableId;
};

type RuntimeCallFlowOperation = CallFlowOperation & {
  sharedVariableIds?: VariableId[];
};

type RuntimeCustomOperationResult = (CustomOperationResult | OperationResult) & {
  variablePatches?: VariablePatch[];
  trace?: TraceFragment;
};

type ResultBranch = {
  match: {
    type: "outcome" | "status" | "error_code";
    outcome?: StepOutcome;
    status?: string;
    errorCode?: string;
  };
  branch: StepBranch;
};

type BranchMatchResult = {
  outcome?: StepOutcome | string;
  status?: string;
  errorCode?: string;
  handoffId?: string;
};

type RenderedOutput = {
  messages: OutboundMessage[];
  events: ConversationEvent[];
  fragments: TraceFragment[];
};

type StepWaitState = Partial<PendingInputState> & {
  stepId?: string;
};

type TurnContext = {
  flow: FlowVersion;
  conversation: Conversation;
  state: InternalState;
  turn: Turn;
  messages: OutboundMessage[];
  events: ConversationEvent[];
  fragments: TraceFragment[];
  patches: VariablePatch[];
  llmUsage: LlmUsageRecord[];
  initialStepId?: string;
  error?: RuntimeError;
  nested?: boolean;
};

type StepRunResult = {
  status: "completed" | "waiting_input" | "failed";
  outcome?: string;
  branch?: StepBranch;
  target?: StepTarget;
  messages?: OutboundMessage[];
  events?: ConversationEvent[];
  patches?: VariablePatch[];
  fragments?: TraceFragment[];
  waitState?: StepWaitState;
  error?: RuntimeError;
};

type OperationContinuation = {
  phase: "on_enter" | "branch" | "on_exit" | "operation_result_branch";
  operations: StepOperation[];
  nextOperationIndex: number;
  aggregateTarget?: StepTarget;
  branchTarget?: StepTarget;
  pendingTarget?: StepTarget;
  parentOutcome?: string;
  hadBranch?: boolean;
  parentOperation?: StepOperation;
  parentOperationOutcome?: string;
  parentOperationTarget?: StepTarget;
  parentContinuation?: OperationContinuation;
};

type OperationContinuationBase = Omit<OperationContinuation, "operations" | "nextOperationIndex" | "aggregateTarget">;

const builtInStepTypes = new Set(["message", "menu", "input", "attachment", "condition", "end", "custom"]);
const builtInOperationTypes = new Set([
  "send_message",
  "set_variable",
  "unset_variable",
  "invalidate_variable",
  "run_action",
  "call_flow",
  "emit_event",
  "handoff",
  "custom",
]);

export function createConversationEngine(options: EngineOptions = {}): ConversationEngine & ConversationEngineModule {
  const runtime = new Runtime(options);
  return runtime.engine();
}

class Runtime {
  private readonly flowVersions = new Map<string, FlowVersion>();
  private readonly conversations = new Map<string, Conversation>();
  private readonly states = new Map<string, InternalState>();
  private readonly events = new Map<string, ConversationEvent[]>();
  private readonly traces = new Map<string, DecisionTrace[]>();
  private readonly internalRepositories: ConversationEngineRepositories;
  private readonly repositories: ConversationEngineRepositories;
  private readonly runtimeContext: RuntimeContext;
  private readonly clock: RuntimeClock;
  private readonly idGenerator: IdGenerator;
  private readonly maxStepExecutionsPerTurn: number;
  private serviceModule?: RuntimeServices;

  constructor(private readonly options: EngineOptions) {
    for (const flowVersion of options.flowVersions ?? []) this.flowVersions.set(flowVersion.flowVersionId, flowVersion);
    this.clock = options.runtime?.clock ?? options.clock ?? { now: () => new Date().toISOString() };
    let counter = 0;
    const next = (prefix: string) => `${prefix}-${++counter}`;
    this.idGenerator = {
      newFlowVersionId: () => next("flow-version"),
      newConversationId: () => next("conversation"),
      newTurnId: () => next("turn"),
      newMessageId: () => next("message"),
      newEventId: () => next("event"),
      newTraceId: () => next("trace"),
      newCandidateId: () => next("candidate"),
      newExecutionFrameId: () => next("frame"),
      newHandoffId: () => next("handoff"),
      ...(options.runtime?.idGenerator ?? {}),
      ...(options.idGenerator ?? {}),
    };
    const config: ConversationEngineConfig = {
      ...(options.runtime?.config ?? {}),
      ...(options.config ?? {}),
    };
    this.maxStepExecutionsPerTurn = config.maxStepExecutionsPerTurn ?? options.maxStepExecutionsPerTurn ?? 20;
    this.internalRepositories = this.createInternalRepositories();
    this.repositories = {
      flowVersions: options.repositories?.flowVersions ?? this.internalRepositories.flowVersions,
      conversations: options.repositories?.conversations ?? this.internalRepositories.conversations,
      states: options.repositories?.states ?? this.internalRepositories.states,
      events: options.repositories?.events ?? this.internalRepositories.events,
      traces: options.repositories?.traces ?? this.internalRepositories.traces,
    };
    this.runtimeContext = {
      config: {
        ...config,
        maxStepExecutionsPerTurn: this.maxStepExecutionsPerTurn,
      },
      clock: this.clock,
      idGenerator: this.idGenerator,
    };
  }

  engine(): ConversationEngine & ConversationEngineModule {
    return {
      startConversation: (request) => this.startConversation(request),
      processUserInput: (request) => this.processUserInput(request),
      repositories: this.repositories,
      services: this.services(),
      runtime: this.runtimeContext,
    };
  }

  private createInternalRepositories(): ConversationEngineRepositories {
    return {
      flowVersions: {
        getById: async (flowVersionId) => clone(this.flowVersions.get(flowVersionId)),
        save: async (flowVersion) => {
          this.flowVersions.set(flowVersion.flowVersionId, clone(flowVersion));
        },
      },
      conversations: {
        getById: async (conversationId) => clone(this.conversations.get(conversationId)),
        save: async (conversation) => {
          this.conversations.set(conversation.conversationId, clone(conversation));
        },
      },
      states: {
        getByConversationId: async (conversationId) => clone(this.states.get(conversationId)),
        save: async (state) => {
          this.states.set(state.conversationId, this.toInternalState(clone(state)));
        },
      },
      events: {
        append: async (events) => {
          for (const event of events) {
            const list = this.events.get(event.conversationId) ?? [];
            list.push(clone(event));
            this.events.set(event.conversationId, list);
          }
        },
        listByConversationId: async (conversationId) => clone(this.events.get(conversationId) ?? []),
      },
      traces: {
        save: async (trace) => {
          const list = this.traces.get(trace.conversationId) ?? [];
          list.push(clone(trace));
          this.traces.set(trace.conversationId, list);
        },
        listByConversationId: async (conversationId) => clone(this.traces.get(conversationId) ?? []),
      },
    };
  }

  private services(): RuntimeServices {
    if (this.serviceModule) return this.serviceModule;
    const internalServices: RuntimeServices = {
      stepRegistry: {
        register: (handler: StepHandler) => {
          this.options.stepHandlers = { ...(this.options.stepHandlers ?? {}), [handler.stepType]: handler };
        },
        getHandler: (stepType: string) => {
          const handler = this.options.stepHandlers?.[stepType];
          if (!handler) throw this.runtimeError("STEP_HANDLER_NOT_REGISTERED", `Step handler for ${stepType} is not registered.`, false);
          return handler;
        },
        hasHandler: (stepType: string) => builtInStepTypes.has(stepType) || Boolean(this.options.stepHandlers?.[stepType]),
      },
      operationExecutor: {
        executeMany: async () => {
          throw this.runtimeError("OPERATION_EXECUTION_CONTEXT_REQUIRED", "Use ConversationEngine to execute operations with a full turn context.", false);
        },
      },
      inputProcessor: {
        process: async () => {
          throw this.runtimeError("INPUT_PROCESSING_CONTEXT_REQUIRED", "Use ConversationEngine to process input with a full turn context.", false);
        },
      },
      responseRenderer: {
        render: async () => {
          throw this.runtimeError("RESPONSE_RENDERING_CONTEXT_REQUIRED", "Use ConversationEngine to render responses with a full turn context.", false);
        },
      },
      actionExecutor: {
        execute: async (action: ActionDefinition, input: Record<string, unknown>, context: ActionExecutionContext) => {
          const handler = this.options.actionHandlers?.[action.kind];
          if (!handler) throw this.runtimeError("ACTION_HANDLER_NOT_REGISTERED", `Action handler ${action.kind} is not registered.`, false);
          return typeof handler === "function" ? handler(action, input, context) : handler.execute(action, input, context);
        },
      },
      conditionEvaluator: {
        evaluate: async (condition, context) => ({
          matched: this.evaluateCondition(this.conditionEvaluationContext(context), condition),
        }),
      },
      transitionResolver: {
        resolveFromStepResult: async (step: StepDefinition, result: StepResult) => result.branch ?? (result.outcome ? this.resolveRoute(step, result.outcome) : undefined),
        resolveFromOutcome: async (step: StepDefinition, outcome: string) => this.resolveRoute(step, outcome),
      },
      stateReducer: {
        apply: (state: ConversationState) => state,
      },
      traceBuilder: {
        build: (input: TraceBuildInput) => ({
          traceId: this.newId("newTraceId", "trace"),
          createdAt: this.clock.now(),
          ...input,
        }),
      },
      semanticInputResolver: typeof this.options.semanticInputResolver === "function"
        ? { resolve: this.options.semanticInputResolver }
        : this.options.semanticInputResolver,
      llmResponseGenerator: typeof this.options.llmResponseGenerator === "function"
        ? { generate: this.options.llmResponseGenerator }
        : this.options.llmResponseGenerator,
    };
    this.serviceModule = { ...internalServices, ...(this.options.services ?? {}) };
    return this.serviceModule;
  }

  private async startConversation(request: { conversationId: string; flowVersionId: string; channel?: string; userId?: string; initialVariables?: Record<string, unknown>; metadata?: Record<string, unknown> }): Promise<ProcessTurnResult> {
    const flow = await this.getFlowVersion(request.flowVersionId);
    const conversation = this.createConversation(request, flow);
    const state = this.createInitialState(conversation, flow);
    const turn = this.createTurn(request.conversationId);
    const context = this.createContext(flow, conversation, state, turn);

    if (!flow) {
      return this.fail(context, "FLOW_VERSION_NOT_FOUND", `Flow version ${request.flowVersionId} was not found.`, false);
    }

    context.events.push(this.event(context, "conversation_started", { flowVersionId: flow.flowVersionId }));
    this.applyInitialVariables(context, request.initialVariables ?? {});
    await this.runAutomaticSteps(context);
    return this.commit(context);
  }

  private async processUserInput(request: { conversationId: string; input: UserInput }): Promise<ProcessTurnResult> {
    const conversation = await this.getConversation(request.conversationId);
    const existingState = await this.getState(request.conversationId);
    const activeFlowCallFrame = existingState ? this.activeFlowCallFrame(existingState) : undefined;
    const flow = activeFlowCallFrame
      ? await this.getFlowVersion(activeFlowCallFrame.flowVersionId)
      : existingState ? await this.getFlowVersion(existingState.flowVersionId) : undefined;
    const safeConversation = conversation ?? this.createConversation({ conversationId: request.conversationId, flowVersionId: flow?.flowVersionId ?? "unknown" }, flow);
    const safeState = existingState ?? this.createInitialState(safeConversation, flow);
    const turn = this.createTurn(request.conversationId, request.input);
    const context = this.createContext(flow, safeConversation, clone(safeState), turn, request.input);
    if (activeFlowCallFrame) this.loadFlowCallChildState(context.state, activeFlowCallFrame);

    if (!conversation || !existingState) {
      return this.fail(context, "CONVERSATION_NOT_FOUND", `Conversation ${request.conversationId} was not found.`, false);
    }
    if (!flow) {
      return this.fail(context, "FLOW_VERSION_NOT_FOUND", `Flow version ${existingState.flowVersionId} was not found.`, false);
    }
    if (existingState.status !== "waiting_input") {
      return this.fail(context, "CONVERSATION_NOT_WAITING_FOR_INPUT", "Conversation is not waiting for input.", true);
    }

    context.events.push(this.event(context, "input_received", { inputType: request.input.type }));
    const step = this.getStep(flow, existingState.pendingInput?.stepId ?? existingState.currentStepId);
    if (!step) return this.fail(context, "STEP_NOT_FOUND", "Pending step was not found.", false);

    context.initialStepId = step.stepId;
    context.state.status = "active";
    context.state.currentStepId = step.stepId;
    context.state.lastUserInput = request.input;
    const result = await this.handleStepInput(context, step, request.input);
    if (result.error) {
      if (activeFlowCallFrame) return this.finishFlowCallInputTurn(context, activeFlowCallFrame, result.error);
      return this.failWithError(context, result.error);
    }
    await this.applyStepResult(context, step, result);
    await this.runAutomaticSteps(context);
    if (activeFlowCallFrame) return this.finishFlowCallInputTurn(context, activeFlowCallFrame);
    return this.commit(context);
  }

  private async getFlowVersion(flowVersionId: string): Promise<FlowVersion | undefined> {
    if (this.repositories.flowVersions !== this.internalRepositories.flowVersions) {
      return this.repositories.flowVersions.getById(flowVersionId);
    }
    return this.flowVersions.get(flowVersionId);
  }

  private async getConversation(conversationId: string): Promise<Conversation | undefined> {
    if (this.repositories.conversations !== this.internalRepositories.conversations) {
      return this.repositories.conversations.getById(conversationId);
    }
    return this.conversations.get(conversationId);
  }

  private async getState(conversationId: string): Promise<InternalState | undefined> {
    if (this.repositories.states !== this.internalRepositories.states) {
      const state = await this.repositories.states.getByConversationId(conversationId);
      return state ? this.toInternalState(state) : undefined;
    }
    return this.states.get(conversationId);
  }

  private async runAutomaticSteps(context: TurnContext): Promise<void> {
    for (let executions = 0; executions < this.maxStepExecutionsPerTurn; executions++) {
      if (context.error || ["waiting_input", "completed", "cancelled", "failed", "handoff"].includes(context.state.status)) return;
      const step = this.getStep(context.flow, context.state.currentStepId);
      if (!step) {
        this.attachError(context, "STEP_NOT_FOUND", `Step ${context.state.currentStepId} was not found.`, false);
        return;
      }
      context.initialStepId ??= step.stepId;
      const result = await this.enterStep(context, step);
      if (result.error) {
        this.attachRuntimeError(context, result.error);
        return;
      }
      await this.applyStepResult(context, step, result);
    }
    this.attachError(context, "MAX_STEP_EXECUTIONS_EXCEEDED", "Maximum step executions per turn exceeded.", false);
  }

  private async enterStep(context: TurnContext, step: StepDefinition): Promise<StepRunResult> {
    const stepType = step.type;
    context.events.push(this.event(context, "step_entered", { stepId: step.stepId, stepType }));
    context.fragments.push({ source: `step:${stepType}`, data: { stepId: step.stepId, phase: "enter" } });

    const onEnter = await this.executeOperations(context, step, step.onEnter ?? [], { phase: "on_enter" });
    if (onEnter.error || onEnter.target || onEnter.status === "waiting_input") return onEnter;

    return this.enterStepBody(context, step);
  }

  private enterStepBody(context: TurnContext, step: StepDefinition): Promise<StepRunResult> | StepRunResult {
    switch (step.type) {
      case "message":
        return this.enterMessageStep(context, step);
      case "menu":
        return this.enterMenuStep(context, step);
      case "input":
        return this.enterInputStep(context, step);
      case "attachment":
        return this.enterAttachmentStep(context, step);
      case "condition":
        return this.enterConditionStep(context, step);
      case "end":
        return this.enterEndStep(context, step);
      case "custom":
        return this.enterCustomStep(context, step);
      default:
        return { status: "failed", error: this.runtimeError("STEP_HANDLER_NOT_REGISTERED", `Step handler for ${String((step as { type: string }).type)} is not registered.`, false) };
    }
  }

  private async handleStepInput(context: TurnContext, step: StepDefinition, input: UserInput): Promise<StepRunResult> {
    if (step.type === "menu") return this.handleMenuInput(context, step, input);
    if (step.type === "input") return this.handleInputStepInput(context, step, input);
    if (step.type === "attachment") return this.handleAttachmentInput(context, step, input);
    if (step.type === "custom") return this.handleCustomStepInput(context, step, input);
    return { status: "failed", error: this.runtimeError("STEP_DOES_NOT_ACCEPT_INPUT", `Step ${step.stepId} does not accept input.`, true) };
  }

  private async applyStepResult(context: TurnContext, step: StepDefinition, result: StepRunResult): Promise<void> {
    this.collect(context, result);
    if (context.error) return;
    if (result.status === "waiting_input") {
      this.markWaitingInput(context, step, result);
      return;
    }

    let target = result.target;
    let branch = result.branch;
    if (!branch && result.outcome) branch = this.resolveRoute(step, result.outcome);
    if (branch) {
      const branchResult = await this.executeBranch(context, step, branch, {
        phase: "branch",
        branchTarget: branch.target,
        pendingTarget: target,
        parentOutcome: result.outcome,
        hadBranch: true,
      });
      if (branchResult.error) {
        this.attachRuntimeError(context, branchResult.error);
        return;
      }
      if (branchResult.status === "waiting_input") {
        this.markWaitingInput(context, step, branchResult);
        return;
      }
      target = branchResult.target ?? target;
    }

    const exitResult = await this.executeOperations(context, step, step.onExit ?? [], {
      phase: "on_exit",
      pendingTarget: target,
      parentOutcome: result.outcome,
      hadBranch: Boolean(branch),
    });
    if (exitResult.error) {
      this.attachRuntimeError(context, exitResult.error);
      return;
    }
    if (exitResult.status === "waiting_input") {
      this.markWaitingInput(context, step, exitResult);
      return;
    }
    target = exitResult.target ?? target;

    if (!target && !branch && step.type === "message") {
      target = { type: "end", status: "completed" };
    }

    this.applyTarget(context, target);
    context.events.push(this.event(context, "step_completed", { stepId: step.stepId, outcome: result.outcome }));
  }

  private markWaitingInput(context: TurnContext, step: StepDefinition, result: StepRunResult): void {
    const pendingStepId = String(result.waitState?.stepId ?? step.stepId);
    context.state.status = "waiting_input";
    context.state.pendingInput = { stepId: pendingStepId, createdAt: this.clock.now(), ...(result.waitState ?? {}) };
    context.state.currentStepId = pendingStepId;
  }

  private enterMessageStep(context: TurnContext, step: MessageStepDefinition): StepRunResult | Promise<StepRunResult> {
    return this.renderMany(context, step, step.config.messages).then((rendered) => ({
      status: step.config.autoAdvance === false ? "waiting_input" : "completed",
      outcome: "next",
      messages: rendered.messages,
      fragments: rendered.fragments,
      events: rendered.events,
      waitState: { stepId: step.stepId },
    }));
  }

  private async enterMenuStep(context: TurnContext, step: MenuStepDefinition): Promise<StepRunResult> {
    const rendered = await this.renderOne(context, step, step.config.prompt);
    const options = step.config.options ?? [];
    const prompt = rendered.messages[0];
    if (prompt) {
      prompt.content = {
        type: "rich",
        text: prompt.content.type === "text" || prompt.content.type === "rich" ? prompt.content.text : undefined,
        buttons: options.map((option) => ({ optionId: option.optionId, label: option.label ?? option.optionId })),
      };
    }
    return {
      status: "waiting_input",
      messages: rendered.messages,
      events: rendered.events,
      fragments: rendered.fragments,
      waitState: { stepId: step.stepId, inputContract: { acceptedInputTypes: ["text", "choice"] } },
    };
  }

  private async enterInputStep(context: TurnContext, step: InputStepDefinition): Promise<StepRunResult> {
    const rendered = step.config.prompt ? await this.renderOne(context, step, step.config.prompt) : emptyRendered();
    return {
      status: "waiting_input",
      messages: rendered.messages,
      events: rendered.events,
      fragments: rendered.fragments,
      waitState: { stepId: step.stepId, inputContract: step.config.input, createdAt: this.clock.now() },
    };
  }

  private async enterAttachmentStep(context: TurnContext, step: AttachmentStepDefinition): Promise<StepRunResult> {
    const rendered = step.config.prompt ? await this.renderOne(context, step, step.config.prompt) : emptyRendered();
    return {
      status: "waiting_input",
      messages: rendered.messages,
      events: rendered.events,
      fragments: rendered.fragments,
      waitState: { stepId: step.stepId, inputContract: { acceptedInputTypes: ["attachment"] } },
    };
  }

  private async enterConditionStep(context: TurnContext, step: ConditionStepDefinition): Promise<StepRunResult> {
    const evaluated: Array<{ branchId: string; outcome: StepOutcome; matched: boolean }> = [];
    for (const conditionBranch of step.config.branches ?? []) {
      const matched = this.evaluateCondition(context, conditionBranch.when);
      evaluated.push({ branchId: conditionBranch.branchId, outcome: conditionBranch.outcome, matched });
      if (matched) {
        context.events.push(this.event(context, "condition_evaluated", { stepId: step.stepId, branchId: conditionBranch.branchId, matched: true }));
        return {
          status: "completed",
          outcome: conditionBranch.outcome,
          branch: conditionBranch.branch,
          fragments: [{ source: "condition:evaluate", data: { evaluated, selectedBranchId: conditionBranch.branchId } }],
        };
      }
    }
    const defaultBranch = step.config.defaultBranch;
    context.events.push(this.event(context, "condition_evaluated", { stepId: step.stepId, matched: false }));
    return {
      status: "completed",
      outcome: "default",
      branch: defaultBranch,
      fragments: [{ source: "condition:evaluate", data: { evaluated, selectedBranchId: defaultBranch?.branchId } }],
    };
  }

  private async enterEndStep(context: TurnContext, step: Extract<StepDefinition, { type: "end" }>): Promise<StepRunResult> {
    const rendered = step.config.finalMessage ? await this.renderOne(context, step, step.config.finalMessage) : emptyRendered();
    return { status: "completed", target: { type: "end", status: step.config.status }, messages: rendered.messages, events: rendered.events, fragments: rendered.fragments };
  }

  private async enterCustomStep(context: TurnContext, step: Extract<StepDefinition, { type: "custom" }>): Promise<StepRunResult> {
    const customType = step.config.customType;
    const registry = this.services().stepRegistry;
    const handler = customType && registry.hasHandler(customType) ? registry.getHandler(customType) : undefined;
    if (!handler) return { status: "failed", error: this.runtimeError("STEP_HANDLER_NOT_REGISTERED", `Custom step handler ${customType} is not registered.`, false) };
    const result = await handler.enter(this.stepContext(context, step));
    return this.normalizeExternalStepResult(result);
  }

  private async handleMenuInput(context: TurnContext, step: MenuStepDefinition, input: UserInput): Promise<StepRunResult> {
    const options = step.config.options ?? [];
    const selection = step.config.selection;
    let selected: MenuOption | undefined;
    let resolver = "unknown";
    let text: string | undefined;
    if (selection.allowButtons !== false && input.type === "choice" && input.optionId) {
      selected = options.find((option) => option.optionId === input.optionId);
      resolver = "option_id";
    }
    if (!selected && input.type === "text") {
      const inputText = input.text.trim();
      text = inputText;
      const number = Number(inputText);
      if (selection.allowNumbers !== false && Number.isInteger(number) && number >= 1 && number <= options.length) {
        selected = options[number - 1];
        resolver = "number";
      }
      if (!selected && selection.allowExactText !== false) {
        selected = options.find((option) => String(option.label ?? "").toLowerCase() === inputText.toLowerCase());
        resolver = "exact_text";
      }
      if (!selected && selection.allowAliases !== false) {
        selected = options.find((option) => (option.aliases ?? []).some((alias: string) => alias.toLowerCase() === inputText.toLowerCase()));
        resolver = "alias";
      }
    }
    if (!selected && text && selection.semanticSelection?.enabled) {
      const semanticResolver = this.services().semanticInputResolver;
      if (!semanticResolver) return { status: "failed", error: this.runtimeError("SEMANTIC_INPUT_RESOLVER_NOT_REGISTERED", "Semantic input resolver is not registered.", false) };
      const allowedOutcomes = options.map((option) => String(option.optionId));
      if (selection.semanticSelection.unknownOutcome) allowedOutcomes.push(String(selection.semanticSelection.unknownOutcome));
      const task: SemanticInputTask = {
        taskId: `${step.stepId}:menu_selection`,
        mode: "menu_selection",
        allowedOutcomes,
        allowedVariableIds: [],
        threshold: selection.semanticSelection.threshold,
      };
      context.events.push(this.event(context, "semantic_input_task_started", { taskId: task.taskId }));
      const semantic = await this.callSemanticResolver(semanticResolver, input, task, this.inputContext(context, step));
      const outcome = String(semantic.outcome ?? "");
      const confidence = Number(semantic.confidence ?? 0);
      const variables = semantic.variables ?? {};
      if (!allowedOutcomes.includes(outcome)) {
        return { status: "failed", error: this.runtimeError("SEMANTIC_RESULT_OUT_OF_CONTRACT", `Semantic outcome ${outcome} is not declared.`, false) };
      }
      if (Object.keys(variables).length > 0) {
        return { status: "failed", error: this.runtimeError("SEMANTIC_RESULT_OUT_OF_CONTRACT", "Menu semantic selection cannot write variables.", false) };
      }
      context.events.push(this.event(context, "semantic_input_task_completed", { taskId: task.taskId, outcome, confidence }));
      context.llmUsage.push({ purpose: "input_resolution", success: true });
      if (confidence >= selection.semanticSelection.threshold && outcome !== selection.semanticSelection.unknownOutcome) {
        selected = options.find((option) => String(option.optionId) === outcome);
        resolver = "semantic_selection";
      }
      if (!selected && outcome === selection.semanticSelection.unknownOutcome) {
        return {
          status: "completed",
          outcome,
          fragments: [{ source: "menu:resolve", data: { resolver: "semantic_selection", outcome, confidence } }],
        };
      }
    }
    if (!selected && text && selection.allowFreeText) {
      return {
        status: "completed",
        outcome: "free_text",
        fragments: [{ source: "menu:resolve", data: { resolver: "free_text", text } }],
      };
    }
    if (!selected) {
      const rendered = await this.renderInvalid(context, step, step.config.invalidSelection);
      return { status: "waiting_input", messages: rendered.messages, events: [this.event(context, "input_invalid", { stepId: step.stepId })], fragments: [{ source: "menu:resolve", data: { status: "unknown" } }] };
    }
    context.events.push(this.event(context, "menu_option_selected", { stepId: step.stepId, optionId: selected.optionId }));
    return {
      status: "completed",
      outcome: "selected",
      branch: selected.branch,
      fragments: [{ source: "menu:resolve", data: { resolver, optionId: selected.optionId } }],
    };
  }

  private async handleInputStepInput(context: TurnContext, step: InputStepDefinition, input: UserInput): Promise<StepRunResult> {
    if (input.type !== "text") return this.invalidInput(context, step, "Input must be text.");
    const contract = step.config.input;
    const binding = contract.bindings?.[0];
    if (!binding) return { status: "failed", error: this.runtimeError("INPUT_BINDING_NOT_FOUND", `Input step ${step.stepId} has no binding.`, false) };
    const raw = input.text;
    const value = raw.trim();
    for (const validator of binding?.validators ?? []) {
      const validation = this.validateValue(value, validator);
      if (validation.error) return { status: "failed", error: validation.error };
      if (!validation.valid) return this.invalidInput(context, step, validator.message ?? "Input is invalid.");
    }
    const patches: VariablePatch[] = [{ type: "set", variableId: binding.targetVariableId, value, source: "user_input" }];
    const fragments: TraceFragment[] = [{ source: "input:resolve", data: { status: "resolved", variableId: binding.targetVariableId } }];

    for (const task of contract.semanticTasks ?? []) {
      if (task.mode !== "after_valid_capture") continue;
      const resolver = this.services().semanticInputResolver;
      if (!resolver) return { status: "failed", error: this.runtimeError("SEMANTIC_INPUT_RESOLVER_NOT_REGISTERED", "Semantic input resolver is not registered.", false) };
      context.events.push(this.event(context, "semantic_input_task_started", { taskId: task.taskId }));
      const semantic = await this.callSemanticResolver(resolver, input, task, this.inputContext(context, step));
      const outcome = semantic.outcome;
      const variables = semantic.variables ?? {};
      if (outcome === undefined || !task.allowedOutcomes.includes(outcome)) {
        return { status: "failed", error: this.runtimeError("SEMANTIC_RESULT_OUT_OF_CONTRACT", `Semantic outcome ${outcome} is not declared.`, false) };
      }
      for (const variableId of Object.keys(variables)) {
        if (task.allowedVariableIds && !task.allowedVariableIds.includes(variableId)) {
          return { status: "failed", error: this.runtimeError("SEMANTIC_RESULT_OUT_OF_CONTRACT", `Semantic variable ${variableId} is not declared.`, false) };
        }
        patches.push({ type: "set", variableId, value: variables[variableId], source: "semantic_input_task" });
      }
      if (task.saveOutcomeToVariableId && !(task.saveOutcomeToVariableId in variables)) {
        patches.push({ type: "set", variableId: task.saveOutcomeToVariableId, value: outcome, source: "semantic_input_task" });
      }
      context.events.push(this.event(context, "semantic_input_task_completed", { taskId: task.taskId, outcome }));
      context.llmUsage.push({ purpose: "input_resolution", success: true });
      fragments.push({ source: "semantic_input", data: { taskId: task.taskId, outcome, variables } });
    }

    return { status: "completed", outcome: "captured", patches, events: [this.event(context, "input_resolved", { stepId: step.stepId })], fragments };
  }

  private async handleAttachmentInput(context: TurnContext, step: AttachmentStepDefinition, input: UserInput): Promise<StepRunResult> {
    if (input.type !== "attachment") return this.invalidInput(context, step, "Input must be an attachment.");
    const attachment = input.attachments[0] as AttachmentInput | undefined;
    const rules = step.config.rules;
    const extension = attachment?.filename?.slice(attachment.filename.lastIndexOf(".")).toLowerCase();
    const valid = attachment !== undefined
      && (!rules.allowedMimeTypes || rules.allowedMimeTypes.includes(attachment.mimeType))
      && (!rules.allowedExtensions || (extension !== undefined && rules.allowedExtensions.includes(extension)))
      && (!rules.maxSizeMb || attachment.sizeBytes <= rules.maxSizeMb * 1024 * 1024);
    if (!valid) {
      const rendered = await this.renderInvalid(context, step, step.config.invalidAttachment);
      return {
        status: "waiting_input",
        messages: rendered.messages,
        events: [this.event(context, "input_invalid", { stepId: step.stepId, reason: "invalid_attachment" })],
        fragments: [{ source: "attachment:validate", data: { valid: false } }],
        waitState: { stepId: step.stepId, retryCount: ((context.state.pendingInput?.retryCount ?? 0) + 1) },
      };
    }
    if (!attachment) return this.invalidInput(context, step, "Attachment is required.");
    return {
      status: "completed",
      outcome: "captured",
      patches: [{ type: "set", variableId: step.config.targetVariableId, value: attachment, source: "attachment" }],
      events: [this.event(context, "input_resolved", { stepId: step.stepId })],
      fragments: [{ source: "attachment:validate", data: { valid: true, filename: attachment?.filename, mimeType: attachment?.mimeType } }],
    };
  }

  private async handleCustomStepInput(context: TurnContext, step: Extract<StepDefinition, { type: "custom" }>, input: UserInput): Promise<StepRunResult> {
    const customType = step.config.customType;
    const registry = this.services().stepRegistry;
    const handler = customType && registry.hasHandler(customType) ? registry.getHandler(customType) : undefined;
    if (!handler?.handleInput) return { status: "failed", error: this.runtimeError("STEP_HANDLER_NOT_REGISTERED", `Custom step handler ${customType} is not registered.`, false) };
    const result = await handler.handleInput(this.stepContext(context, step), input);
    return this.normalizeExternalStepResult(result);
  }

  private async invalidInput(context: TurnContext, step: StepDefinition, reason: unknown): Promise<StepRunResult> {
    const semantic = step.type === "input" ? await this.resolveSemanticAfterInvalidInput(context, step) : undefined;
    if (semantic) return semantic;
    const rendered = await this.renderInvalid(context, step, step.type === "input" ? step.config.input.invalidBehavior : undefined);
    return {
      status: "waiting_input",
      messages: rendered.messages,
      events: [this.event(context, "input_invalid", { stepId: step.stepId, reason: String(reason) })],
      fragments: [{ source: "input:validate", data: { valid: false, reason: String(reason) } }],
      waitState: { stepId: step.stepId, retryCount: ((context.state.pendingInput?.retryCount ?? 0) + 1) },
    };
  }

  private async renderInvalid(context: TurnContext, step: StepDefinition, behavior: InvalidInputBehavior | undefined): Promise<RenderedOutput> {
    const messages: OutboundMessage[] = [];
    const events: ConversationEvent[] = [];
    const fragments: TraceFragment[] = [];
    if (behavior?.message) {
      const rendered = await this.renderOne(context, step, behavior.message);
      messages.push(...rendered.messages);
      events.push(...rendered.events);
      fragments.push(...rendered.fragments);
    }
    const prompt = this.stepPrompt(step);
    if (prompt) {
      const rendered = await this.renderOne(context, step, prompt);
      messages.push(...rendered.messages);
      events.push(...rendered.events);
      fragments.push(...rendered.fragments);
    }
    return { messages, events, fragments };
  }

  private async resolveSemanticAfterInvalidInput(context: TurnContext, step: InputStepDefinition): Promise<StepRunResult | undefined> {
    const tasks = (step.config.input.semanticTasks ?? []).filter((task) => task.mode === "after_invalid_input");
    if (tasks.length === 0) return undefined;
    const resolver = this.services().semanticInputResolver;
    if (!resolver) return { status: "failed", error: this.runtimeError("SEMANTIC_INPUT_RESOLVER_NOT_REGISTERED", "Semantic input resolver is not registered.", false) };
    const task = tasks[0];
    if (!task) return undefined;
    if (!context.turn.userInput) return { status: "failed", error: this.runtimeError("SEMANTIC_INPUT_NOT_FOUND", "Semantic input resolution requires the current user input.", false) };
    context.events.push(this.event(context, "semantic_input_task_started", { taskId: task.taskId }));
    const semantic = await this.callSemanticResolver(resolver, context.turn.userInput, task, this.inputContext(context, step));
    const outcome = semantic.outcome;
    const variables = semantic.variables ?? {};
    if (outcome === undefined || !task.allowedOutcomes.includes(outcome)) {
      return { status: "failed", error: this.runtimeError("SEMANTIC_RESULT_OUT_OF_CONTRACT", `Semantic outcome ${outcome} is not declared.`, false) };
    }
    const patches: VariablePatch[] = [];
    for (const variableId of Object.keys(variables)) {
      if (task.allowedVariableIds && !task.allowedVariableIds.includes(variableId)) {
        return { status: "failed", error: this.runtimeError("SEMANTIC_RESULT_OUT_OF_CONTRACT", `Semantic variable ${variableId} is not declared.`, false) };
      }
      patches.push({ type: "set", variableId, value: variables[variableId], source: "semantic_input_task" });
    }
    context.events.push(this.event(context, "semantic_input_task_completed", { taskId: task.taskId, outcome }));
    context.llmUsage.push({ purpose: "input_resolution", success: true });
    return {
      status: "completed",
      outcome,
      patches,
      fragments: [{ source: "semantic_input", data: { taskId: task.taskId, outcome, variables } }],
    };
  }

  private validateValue(value: string, validator: ValidatorDefinition): { valid: boolean; error?: RuntimeError } {
    if (validator.type === "regex") return { valid: new RegExp(String(validator.options?.pattern ?? "")).test(value) };
    if (validator.type === "integer") return { valid: /^-?\d+$/.test(value) };
    if (validator.type === "number") return { valid: !Number.isNaN(Number(value)) };
    if (validator.type === "required") return { valid: value.length > 0 };
    if (validator.type === "email") return { valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) };
    if (validator.type === "min_length") return { valid: value.length >= Number(validator.options?.min ?? validator.options?.value ?? 0) };
    if (validator.type === "max_length") return { valid: value.length <= Number(validator.options?.max ?? validator.options?.value ?? Number.MAX_SAFE_INTEGER) };
    if (validator.type === "enum") {
      const values = validator.options?.values;
      return { valid: Array.isArray(values) && values.includes(value) };
    }
    return { valid: false, error: this.runtimeError("VALIDATOR_NOT_REGISTERED", `Validator ${validator.type} is not registered.`, false) };
  }

  private async executeBranch(context: TurnContext, step: StepDefinition, branch: StepBranch, continuation?: OperationContinuationBase): Promise<StepRunResult> {
    const operationResult = await this.executeOperations(context, step, branch.operations ?? [], continuation ?? {
      phase: "branch",
      branchTarget: branch.target,
      hadBranch: true,
    });
    if (operationResult.error || operationResult.status === "waiting_input") return operationResult;
    return { status: "completed", target: operationResult.target ?? branch.target, messages: operationResult.messages, events: operationResult.events, patches: operationResult.patches, fragments: operationResult.fragments };
  }

  private async executeOperations(
    context: TurnContext,
    step: StepDefinition,
    operations: StepOperation[],
    continuation?: OperationContinuationBase,
    startIndex = 0,
    initialTarget?: StepTarget,
  ): Promise<StepRunResult> {
    const aggregate: StepRunResult = { status: "completed", target: initialTarget, messages: [], events: [], patches: [], fragments: [] };
    for (let index = startIndex; index < operations.length; index++) {
      const operation = operations[index];
      if (!operation) continue;
      if (!builtInOperationTypes.has(operation.type)) {
        return { status: "failed", error: this.runtimeError("OPERATION_HANDLER_NOT_REGISTERED", `Operation handler for ${operation.type} is not registered.`, false) };
      }
      context.events.push(this.event(context, "operation_started", { operationType: operation.type, operationId: operation.operationId }));
      const operationContinuation = continuation ? {
        ...continuation,
        operations: clone(operations),
        nextOperationIndex: index + 1,
        aggregateTarget: aggregate.target,
      } : undefined;
      const result = await this.executeOperation(context, step, operation, operationContinuation);
      const terminal = await this.consumeOperationResult(context, step, operation, result, aggregate, operationContinuation);
      if (terminal) return terminal;
    }
    return aggregate;
  }

  private async consumeOperationResult(
    context: TurnContext,
    step: StepDefinition,
    operation: StepOperation,
    result: StepRunResult,
    aggregate: StepRunResult,
    continuation?: OperationContinuation,
  ): Promise<StepRunResult | undefined> {
    this.collect(context, result);
    if (result.status === "waiting_input") return result;
    if (result.error) {
      context.events.push(this.event(context, "operation_failed", { operationType: operation.type, operationId: operation.operationId, code: result.error.code }));
      return result;
    }
    if (result.branch) {
      const branchResult = await this.executeBranch(context, step, result.branch, continuation ? {
        phase: "operation_result_branch",
        branchTarget: result.branch.target,
        parentOperation: clone(operation),
        parentOperationOutcome: result.outcome,
        parentOperationTarget: result.target,
        parentContinuation: clone(continuation),
      } : undefined);
      this.collect(context, branchResult);
      if (branchResult.status === "waiting_input") return branchResult;
      if (branchResult.error) return branchResult;
      if (branchResult.target) aggregate.target = branchResult.target;
    }
    context.events.push(this.event(context, "operation_completed", { operationType: operation.type, operationId: operation.operationId, outcome: result.outcome }));
    if (result.target) aggregate.target = result.target;
    return undefined;
  }

  private async executeOperation(context: TurnContext, step: StepDefinition, operation: StepOperation, continuation?: OperationContinuation): Promise<StepRunResult> {
    if (operation.type === "send_message") {
      const rendered = await this.renderOne(context, step, operation.message);
      return { status: "completed", messages: rendered.messages, events: rendered.events, fragments: [{ source: "operation:send_message", data: { operationId: operation.operationId } }, ...rendered.fragments] };
    }
    if (operation.type === "set_variable") {
      const error = this.ensureVariable(context.flow, operation.variableId);
      if (error) return { status: "failed", error };
      const value = this.resolveValue(context, operation.value);
      if (context.error) return { status: "failed", error: context.error };
      return {
        status: "completed",
        patches: [{ type: "set", variableId: operation.variableId, value, source: operation.source ?? "operation", metadata: { operationId: operation.operationId }, scope: operation.scope }],
        fragments: [{ source: "variable:write", data: { variableId: operation.variableId, scope: this.variableScope(context.flow, operation.variableId, operation.scope), operationId: operation.operationId } }],
      };
    }
    if (operation.type === "unset_variable") {
      const error = this.ensureVariable(context.flow, operation.variableId);
      if (error) return { status: "failed", error };
      return { status: "completed", patches: [{ type: "unset", variableId: operation.variableId, source: "operation", metadata: { operationId: operation.operationId }, scope: operation.scope }] };
    }
    if (operation.type === "invalidate_variable") {
      const error = this.ensureVariable(context.flow, operation.variableId);
      if (error) return { status: "failed", error };
      return { status: "completed", patches: [{ type: "invalidate", variableId: operation.variableId, source: "operation", metadata: { operationId: operation.operationId, invalidated: true }, scope: operation.scope }] };
    }
    if (operation.type === "run_action") return this.executeAction(context, step, operation);
    if (operation.type === "call_flow") return this.executeFlowCall(context, step, operation, continuation);
    if (operation.type === "handoff") return this.executeHandoff(context, step, operation);
    if (operation.type === "custom") return this.executeCustomOperation(context, step, operation);
    if (operation.type === "emit_event") {
      const payload = this.resolveMapping(context, operation.payload ?? {});
      if (context.error) return { status: "failed", error: context.error };
      return { status: "completed", events: [this.event(context, operation.eventType, payload)], fragments: [{ source: "operation:emit_event", data: { eventType: operation.eventType } }] };
    }
    return { status: "failed", error: this.runtimeError("OPERATION_HANDLER_NOT_REGISTERED", `Operation handler for ${(operation as { type: string }).type} is not registered.`, false) };
  }

  private async executeAction(context: TurnContext, step: StepDefinition, operation: Extract<StepOperation, { type: "run_action" }>): Promise<StepRunResult> {
    const action = (context.flow.definition.actions ?? []).find((candidate) => candidate.actionId === operation.actionId);
    if (!action) return { status: "failed", error: this.runtimeError("ACTION_NOT_FOUND", `Action ${operation.actionId} was not found.`, false) };
    const input = this.resolveMapping(context, operation.inputMapping ?? {});
    if (context.error) return { status: "failed", error: context.error };
    context.events.push(this.event(context, "action_started", { actionId: action.actionId, actionKind: action.kind }));
    const handler = this.options.actionHandlers?.[action.kind];
    if (!handler && !this.options.services?.actionExecutor) return { status: "failed", error: this.runtimeError("ACTION_HANDLER_NOT_REGISTERED", `Action handler ${action.kind} is not registered.`, false) };
    const result = this.options.services?.actionExecutor
      ? await this.options.services.actionExecutor.execute(action, input, this.actionContext(context, step))
      : await (typeof handler === "function" ? handler(action, input, this.actionContext(context, step)) : handler!.execute(action, input, this.actionContext(context, step)));
    const outcome = result.outcome ?? result.status;
    if (action.resultOutcomes && outcome && !action.resultOutcomes.includes(outcome)) {
      return { status: "failed", error: this.runtimeError("ACTION_RESULT_OUT_OF_CONTRACT", `Action outcome ${outcome} is not declared.`, false) };
    }
    context.events.push(this.event(context, result.status === "success" ? "action_completed" : "action_failed", { actionId: action.actionId, outcome }));
    const output = this.outputPatches(context, operation.outputMapping ?? {}, result.outputs ?? {}, "action_result", operation.operationId);
    if (output.error) return { status: "failed", error: output.error };
    const patches = output.patches;
    const branch = this.matchResultBranch(operation.onResult ?? [], result);
    return {
      status: result.status === "success" || result.outcome ? "completed" : "failed",
      outcome,
      patches,
      target: branch?.target,
      branch,
      fragments: [
        { source: "operation:run_action", data: { operationId: operation.operationId, actionId: action.actionId, outcome } },
        { source: `action:${action.kind}`, data: { actionId: action.actionId, outcome, status: result.status } },
        ...(branch ? [{ source: "operation_result_branch", data: { outcome, branchId: branch.branchId } }] : []),
      ],
    };
  }

  private async executeCustomOperation(context: TurnContext, step: StepDefinition, operation: CustomOperation): Promise<StepRunResult> {
    const contract = this.options.customOperations?.[operation.customType];
    if (!contract) return { status: "failed", error: this.runtimeError("CUSTOM_OPERATION_CONTRACT_NOT_REGISTERED", `Custom operation ${operation.customType} is not registered.`, false) };
    const input = this.resolveMapping(context, operation.inputMapping ?? {});
    if (context.error) return { status: "failed", error: context.error };
    const result: RuntimeCustomOperationResult = await contract.execute(operation, input, this.operationContext(context, step));
    const outcome = result.outcome ?? result.status;
    if (contract.outcomes && outcome && !contract.outcomes.includes(outcome)) {
      return { status: "failed", error: this.runtimeError("CUSTOM_OPERATION_RESULT_OUT_OF_CONTRACT", `Custom operation outcome ${outcome} is not declared.`, false) };
    }
    for (const patch of result.variablePatches ?? []) {
      if (contract.outputVariables && !contract.outputVariables.includes(patch.variableId)) {
        return { status: "failed", error: this.runtimeError("CUSTOM_OPERATION_RESULT_OUT_OF_CONTRACT", `Custom operation output ${patch.variableId} is not declared.`, false) };
      }
    }
    const branch = this.matchResultBranch(operation.onResult ?? [], result);
    return {
      status: "completed",
      outcome,
      patches: result.variablePatches ?? [],
      branch,
      fragments: [
        { source: "operation:custom", data: { customType: operation.customType, outcome } },
        result.trace ?? { source: `custom_operation:${operation.customType}`, data: { outcome } },
        ...(branch ? [{ source: "operation_result_branch", data: { outcome, branchId: branch.branchId } }] : []),
      ],
    };
  }

  private async executeFlowCall(context: TurnContext, step: StepDefinition, operation: RuntimeCallFlowOperation, continuation?: OperationContinuation): Promise<StepRunResult> {
    const childFlow = await this.getFlowVersion(operation.flowVersionId);
    if (!childFlow) return { status: "failed", error: this.runtimeError("FLOW_VERSION_NOT_FOUND", `Flow version ${operation.flowVersionId} was not found.`, false) };
    const input = this.resolveMapping(context, operation.inputMapping ?? {});
    if (context.error) return { status: "failed", error: context.error };
    const parentFrame = this.captureFlowCallFrame(context.state);
    const beforeScopedVariables = clone(context.state.scopedVariables);
    const beforeVariableHistory = clone(context.state.variableHistory);
    const sharing = this.flowCallSharingPolicy(operation);
    const childContext: TurnContext = { ...context, flow: childFlow, nested: true, initialStepId: childFlow.definition.startStepId };
    childContext.state.currentStepId = childFlow.definition.startStepId;
    childContext.state.status = "active";
    for (const [variableId, value] of Object.entries(input)) {
      this.applyPatch(childContext, { type: "set", variableId, value, source: "flow_call" });
    }
    context.events.push(this.event(context, "flow_call_started", { flowVersionId: childFlow.flowVersionId, operationId: operation.operationId }));
    await this.runAutomaticSteps(childContext);
    const afterScopedVariables = clone(context.state.scopedVariables);
    const afterVariableHistory = clone(context.state.variableHistory);
    if (String(childContext.state.status) === "waiting_input") {
      const childCurrentStepId = childContext.state.currentStepId;
      const childPendingInput = clone(childContext.state.pendingInput ?? { stepId: childCurrentStepId });
      const frame = this.createFlowCallFrame(childFlow, step, operation, parentFrame, beforeScopedVariables, beforeVariableHistory, afterScopedVariables, afterVariableHistory, continuation);
      frame.currentStepId = childCurrentStepId;
      this.restoreFlowCallParentState(context.state, beforeScopedVariables, beforeVariableHistory, parentFrame);
      context.state.executionStack = [...context.state.executionStack, frame];
      context.events.push(this.event(context, "flow_call_waiting_input", { flowVersionId: childFlow.flowVersionId, operationId: operation.operationId, stepId: childCurrentStepId }));
      return {
        status: "waiting_input",
        waitState: childPendingInput,
        fragments: [{ source: "operation:call_flow", data: { operationId: operation.operationId, flowVersionId: childFlow.flowVersionId, status: "waiting_input" } }],
      };
    }
    if (childContext.error) {
      this.restoreFlowCallParentState(context.state, beforeScopedVariables, beforeVariableHistory, parentFrame);
      return { status: "failed", error: childContext.error };
    }
    const childStatus = this.flowCallStatus(childContext.state.status);
    const output = this.flowCallOutputPatches(context, childFlow, operation.outputMapping ?? {}, afterScopedVariables, operation.operationId);
    const sharingResult = this.restoreFlowCallVariables(context.state, beforeScopedVariables, afterScopedVariables, sharing);
    context.state.variableHistory = beforeVariableHistory;
    this.restoreFlowCallFrame(context.state, parentFrame);
    if (output.error) return { status: "failed", error: output.error };
    context.state.status = "active";
    context.events.push(this.event(context, "flow_call_completed", { flowVersionId: childFlow.flowVersionId, operationId: operation.operationId, status: childStatus }));
    const result: BranchMatchResult = { status: childStatus, outcome: childStatus };
    const branch = this.matchResultBranch(operation.onResult ?? [], result);
    return {
      status: "completed",
      outcome: childStatus,
      branch,
      patches: output.patches,
      fragments: [{
        source: "operation:call_flow",
        data: {
          operationId: operation.operationId,
          flowVersionId: childFlow.flowVersionId,
          status: childStatus,
          sharedVariables: sharingResult.sharedVariables,
          isolatedVariables: sharingResult.isolatedVariables,
          outputVariables: output.outputVariables,
        },
      }],
    };
  }

  private captureFlowCallFrame(state: InternalState): Pick<InternalState, "currentStepId" | "status" | "pendingInput"> {
    return {
      currentStepId: state.currentStepId,
      status: state.status,
      pendingInput: clone(state.pendingInput),
    };
  }

  private restoreFlowCallFrame(state: InternalState, frame: Pick<InternalState, "currentStepId" | "status" | "pendingInput">): void {
    state.currentStepId = frame.currentStepId;
    state.status = frame.status;
    state.pendingInput = clone(frame.pendingInput);
  }

  private createFlowCallFrame(
    childFlow: FlowVersion,
    step: StepDefinition,
    operation: RuntimeCallFlowOperation,
    parentFrame: Pick<InternalState, "currentStepId" | "status" | "pendingInput">,
    parentScopedVariables: InternalState["scopedVariables"],
    parentVariableHistory: InternalState["variableHistory"],
    childScopedVariables: InternalState["scopedVariables"],
    childVariableHistory: InternalState["variableHistory"],
    continuation?: OperationContinuation,
  ): FlowCallExecutionFrame {
    return {
      frameId: this.newId("newExecutionFrameId", "frame"),
      flowVersionId: childFlow.flowVersionId,
      flowId: childFlow.flowId,
      currentStepId: childFlow.definition.startStepId,
      callOperationId: operation.operationId,
      calledFromStepId: step.stepId,
      startedAt: this.clock.now(),
      metadata: {
        kind: "flow_call",
        operation: clone(operation),
        parentFrame: clone(parentFrame),
        parentScopedVariables: clone(parentScopedVariables),
        parentVariableHistory: clone(parentVariableHistory),
        childScopedVariables: clone(childScopedVariables),
        childVariableHistory: clone(childVariableHistory),
        continuation: clone(continuation),
      },
    };
  }

  private flowCallStatus(status: ConversationState["status"]): FlowCallStatus {
    if (status === "completed" || status === "cancelled" || status === "failed" || status === "handoff") {
      return status;
    }
    throw new Error(`Flow call finished with non-terminal status ${status}.`);
  }

  private activeFlowCallFrame(state: InternalState): FlowCallExecutionFrame | undefined {
    const frame = state.executionStack.at(-1);
    return this.isFlowCallFrame(frame) ? frame : undefined;
  }

  private loadFlowCallChildState(state: InternalState, frame: FlowCallExecutionFrame): void {
    const metadata = frame.metadata;
    state.scopedVariables = clone(metadata.childScopedVariables ?? {});
    state.variableHistory = clone(metadata.childVariableHistory ?? {});
    this.rebuildVariablesFromScoped(state);
  }

  private restoreFlowCallParentState(
    state: InternalState,
    scopedVariables: InternalState["scopedVariables"],
    variableHistory: InternalState["variableHistory"],
    frame: Pick<InternalState, "currentStepId" | "status" | "pendingInput">,
  ): void {
    state.scopedVariables = clone(scopedVariables);
    state.variableHistory = clone(variableHistory);
    this.rebuildVariablesFromScoped(state);
    this.restoreFlowCallFrame(state, frame);
  }

  private rebuildVariablesFromScoped(state: InternalState): void {
    state.variables = {};
    for (const variable of Object.values(state.scopedVariables)) {
      const scope = variable.scope ?? "conversation";
      if (scope === "conversation" || !(variable.variableId in state.variables)) {
        state.variables[variable.variableId] = variable;
      }
    }
  }

  private flowCallSharingPolicy(operation: RuntimeCallFlowOperation): { scopes: Set<VariableScope>; include?: Set<string>; exclude: Set<string> } {
    const sharing = operation.variableSharing;
    const includeValues = sharing?.includeVariableIds ?? operation.sharedVariableIds;
    return {
      scopes: new Set((sharing?.scopes ?? ["conversation"]) as VariableScope[]),
      include: includeValues ? new Set(includeValues.map(String)) : undefined,
      exclude: new Set((sharing?.excludeVariableIds ?? []).map(String)),
    };
  }

  private restoreFlowCallVariables(
    state: InternalState,
    beforeScopedVariables: InternalState["scopedVariables"],
    afterScopedVariables: InternalState["scopedVariables"],
    sharing: { scopes: Set<VariableScope>; include?: Set<string>; exclude: Set<string> },
  ): { sharedVariables: string[]; isolatedVariables: string[] } {
    const sharedVariables = new Set<string>();
    const isolatedVariables = new Set<string>();
    state.scopedVariables = {};
    state.variables = {};

    for (const variable of Object.values(beforeScopedVariables)) {
      const scope = variable.scope ?? "conversation";
      if (!this.canShareFlowCallVariable(variable.variableId, scope, sharing)) {
        this.writeScopedVariable(state, variable.variableId, scope, clone(variable));
      }
    }

    for (const variable of Object.values(afterScopedVariables)) {
      const scope = variable.scope ?? "conversation";
      if (this.canShareFlowCallVariable(variable.variableId, scope, sharing)) {
        this.writeScopedVariable(state, variable.variableId, scope, clone(variable));
        sharedVariables.add(variable.variableId);
      } else {
        isolatedVariables.add(variable.variableId);
      }
    }

    return {
      sharedVariables: [...sharedVariables].sort(),
      isolatedVariables: [...isolatedVariables].sort(),
    };
  }

  private canShareFlowCallVariable(
    variableId: string,
    scope: VariableScope,
    sharing: { scopes: Set<VariableScope>; include?: Set<string>; exclude: Set<string> },
  ): boolean {
    if (!sharing.scopes.has(scope)) return false;
    if (sharing.exclude.has(variableId)) return false;
    if (sharing.include && !sharing.include.has(variableId)) return false;
    return true;
  }

  private flowCallOutputPatches(
    parentContext: TurnContext,
    childFlow: FlowVersion,
    outputMapping: Record<string, string>,
    childScopedVariables: InternalState["scopedVariables"],
    operationId?: string,
  ): { patches: VariablePatch[]; outputVariables: string[]; error?: RuntimeError } {
    const patches: VariablePatch[] = [];
    const outputVariables: string[] = [];
    for (const [sourceVariableId, targetVariableId] of Object.entries(outputMapping)) {
      const targetError = this.ensureVariable(parentContext.flow, targetVariableId);
      if (targetError) return { patches, outputVariables, error: targetError };
      const sourceScope = this.variableScope(childFlow, sourceVariableId);
      const sourceValue = childScopedVariables[this.scopedKey(sourceScope, sourceVariableId)];
      if (!sourceValue) {
        return {
          patches,
          outputVariables,
          error: this.missingVariableError(childFlow, sourceVariableId, sourceScope),
        };
      }
      patches.push({
        type: "set",
        variableId: targetVariableId,
        value: sourceValue.value,
        source: "flow_call",
        metadata: { operationId, sourceVariableId },
      });
      outputVariables.push(targetVariableId);
    }
    return { patches, outputVariables: outputVariables.sort() };
  }

  private async finishFlowCallInputTurn(context: TurnContext, frame: FlowCallExecutionFrame, childError?: RuntimeError): Promise<ProcessTurnResult> {
    const metadata = frame.metadata;
    const parentFlow = await this.getFlowVersion(context.state.flowVersionId);
    if (!parentFlow) return this.fail(context, "FLOW_VERSION_NOT_FOUND", `Flow version ${context.state.flowVersionId} was not found.`, false);

    const childScopedVariables = clone(context.state.scopedVariables);
    const childVariableHistory = clone(context.state.variableHistory);
    const error = childError ?? context.error;
    if (error) {
      this.restoreFlowCallParentState(context.state, metadata.parentScopedVariables, metadata.parentVariableHistory, metadata.parentFrame);
      context.state.executionStack = context.state.executionStack.slice(0, -1);
      return this.failWithError(context, error);
    }
    if (context.state.status === "waiting_input") {
      const childPendingInput = clone(context.state.pendingInput);
      metadata.childScopedVariables = childScopedVariables;
      metadata.childVariableHistory = childVariableHistory;
      frame.currentStepId = context.state.currentStepId;
      this.restoreFlowCallParentState(context.state, metadata.parentScopedVariables, metadata.parentVariableHistory, metadata.parentFrame);
      context.state.executionStack = [...context.state.executionStack.slice(0, -1), frame];
      context.state.status = "waiting_input";
      context.state.pendingInput = childPendingInput;
      context.state.currentStepId = String(context.state.pendingInput?.stepId ?? frame.currentStepId);
      return this.commit(context);
    }
    const childStatus = this.flowCallStatus(context.state.status);

    this.restoreFlowCallParentState(context.state, metadata.parentScopedVariables, metadata.parentVariableHistory, metadata.parentFrame);
    context.state.executionStack = context.state.executionStack.slice(0, -1);

    context.flow = parentFlow;
    const parentStep = this.getStep(parentFlow, frame.calledFromStepId ?? context.state.currentStepId);
    if (!parentStep) return this.fail(context, "STEP_NOT_FOUND", "Flow call parent step was not found.", false);
    const operation = metadata.operation;
    const childFlow = await this.getFlowVersion(frame.flowVersionId);
    if (!childFlow) return this.fail(context, "FLOW_VERSION_NOT_FOUND", `Flow version ${frame.flowVersionId} was not found.`, false);
    const mappedOutput = this.flowCallOutputPatches(context, childFlow, operation.outputMapping ?? {}, childScopedVariables, operation.operationId);
    if (mappedOutput.error) return this.failWithError(context, mappedOutput.error);
    const sharing = this.flowCallSharingPolicy(operation);
    const sharingResult = this.restoreFlowCallVariables(context.state, metadata.parentScopedVariables, childScopedVariables, sharing);
    context.state.variableHistory = metadata.parentVariableHistory;
    context.events.push(this.event(context, "flow_call_completed", { flowVersionId: frame.flowVersionId, operationId: operation.operationId, status: childStatus }));
    const result: BranchMatchResult = { status: childStatus, outcome: childStatus };
    const flowCallResult: StepRunResult = {
      status: "completed",
      outcome: childStatus,
      branch: this.matchResultBranch(operation.onResult ?? [], result),
      patches: mappedOutput.patches,
      fragments: [{
        source: "operation:call_flow",
        data: {
          operationId: operation.operationId,
          flowVersionId: frame.flowVersionId,
          status: childStatus,
          sharedVariables: sharingResult.sharedVariables,
          isolatedVariables: sharingResult.isolatedVariables,
          outputVariables: mappedOutput.outputVariables,
        },
      }],
    };
    const continuation = metadata.continuation;
    if (continuation) {
      const operationResult = await this.resumeOperationListAfterFlowCall(context, parentStep, operation, flowCallResult, continuation);
      if (operationResult.error) return this.failWithError(context, operationResult.error);
      if (operationResult.status === "waiting_input") {
        this.markWaitingInput(context, parentStep, operationResult);
        return this.commit(context);
      }
      await this.completeResumedOperationContinuation(context, parentStep, continuation, operationResult);
    } else {
      context.events.push(this.event(context, "operation_completed", { operationType: "call_flow", operationId: operation.operationId, outcome: "completed" }));
      await this.applyStepResult(context, parentStep, flowCallResult);
    }
    if (context.error) return this.failWithError(context, context.error);
    await this.runAutomaticSteps(context);
    return this.commit(context);
  }

  private async resumeOperationListAfterFlowCall(
    context: TurnContext,
    step: StepDefinition,
    operation: StepOperation,
    result: StepRunResult,
    continuation: OperationContinuation,
  ): Promise<StepRunResult> {
    const aggregate: StepRunResult = {
      status: "completed",
      target: continuation.aggregateTarget,
      messages: [],
      events: [],
      patches: [],
      fragments: [],
    };
    const terminal = await this.consumeOperationResult(context, step, operation, result, aggregate, continuation);
    if (terminal) return terminal;
    return this.executeOperations(
      context,
      step,
      continuation.operations,
      this.operationContinuationBase(continuation),
      continuation.nextOperationIndex,
      aggregate.target,
    );
  }

  private async completeResumedOperationContinuation(
    context: TurnContext,
    step: StepDefinition,
    continuation: OperationContinuation,
    result: StepRunResult,
  ): Promise<void> {
    if (continuation.phase === "on_enter") {
      if (result.target) {
        await this.applyStepResult(context, step, { status: "completed", target: result.target });
        return;
      }
      const stepResult = await this.enterStepBody(context, step);
      if (stepResult.error) {
        this.attachRuntimeError(context, stepResult.error);
        return;
      }
      await this.applyStepResult(context, step, stepResult);
      return;
    }

    if (continuation.phase === "branch") {
      const target = result.target ?? continuation.branchTarget ?? continuation.pendingTarget;
      await this.completeAfterBranchOperations(context, step, target, continuation.parentOutcome);
      return;
    }

    if (continuation.phase === "operation_result_branch") {
      await this.completeAfterOperationResultBranch(context, step, continuation, result);
      return;
    }

    this.completeStepWithTarget(
      context,
      step,
      result.target ?? continuation.pendingTarget,
      continuation.parentOutcome,
      Boolean(continuation.hadBranch),
    );
  }

  private async completeAfterOperationResultBranch(
    context: TurnContext,
    step: StepDefinition,
    continuation: OperationContinuation,
    result: StepRunResult,
  ): Promise<void> {
    if (!continuation.parentContinuation || !continuation.parentOperation) {
      this.attachError(context, "FLOW_CALL_CONTINUATION_INVALID", "Flow call continuation is incomplete.", false);
      return;
    }

    const parentContinuation = continuation.parentContinuation;
    const aggregate: StepRunResult = {
      status: "completed",
      target: parentContinuation.aggregateTarget,
      messages: [],
      events: [],
      patches: [],
      fragments: [],
    };
    const branchTarget = result.target ?? continuation.branchTarget;
    if (branchTarget) aggregate.target = branchTarget;
    context.events.push(this.event(context, "operation_completed", {
      operationType: continuation.parentOperation.type,
      operationId: continuation.parentOperation.operationId,
      outcome: continuation.parentOperationOutcome,
    }));
    if (continuation.parentOperationTarget) aggregate.target = continuation.parentOperationTarget;

    const parentResult = await this.executeOperations(
      context,
      step,
      parentContinuation.operations,
      this.operationContinuationBase(parentContinuation),
      parentContinuation.nextOperationIndex,
      aggregate.target,
    );
    if (parentResult.error) {
      this.attachRuntimeError(context, parentResult.error);
      return;
    }
    if (parentResult.status === "waiting_input") {
      this.markWaitingInput(context, step, parentResult);
      return;
    }
    await this.completeResumedOperationContinuation(context, step, parentContinuation, parentResult);
  }

  private async completeAfterBranchOperations(
    context: TurnContext,
    step: StepDefinition,
    target: StepTarget | undefined,
    outcome: string | undefined,
  ): Promise<void> {
    const exitResult = await this.executeOperations(context, step, step.onExit ?? [], {
      phase: "on_exit",
      pendingTarget: target,
      parentOutcome: outcome,
      hadBranch: true,
    });
    if (exitResult.error) {
      this.attachRuntimeError(context, exitResult.error);
      return;
    }
    if (exitResult.status === "waiting_input") {
      this.markWaitingInput(context, step, exitResult);
      return;
    }
    this.completeStepWithTarget(context, step, exitResult.target ?? target, outcome, true);
  }

  private completeStepWithTarget(
    context: TurnContext,
    step: StepDefinition,
    target: StepTarget | undefined,
    outcome: string | undefined,
    hadBranch: boolean,
  ): void {
    let resolvedTarget = target;
    if (!resolvedTarget && !hadBranch && step.type === "message") {
      resolvedTarget = { type: "end", status: "completed" };
    }
    this.applyTarget(context, resolvedTarget);
    context.events.push(this.event(context, "step_completed", { stepId: step.stepId, outcome }));
  }

  private operationContinuationBase(continuation: OperationContinuation): OperationContinuationBase {
    return {
      phase: continuation.phase,
      branchTarget: continuation.branchTarget,
      pendingTarget: continuation.pendingTarget,
      parentOutcome: continuation.parentOutcome,
      hadBranch: continuation.hadBranch,
      parentOperation: continuation.parentOperation,
      parentOperationOutcome: continuation.parentOperationOutcome,
      parentOperationTarget: continuation.parentOperationTarget,
      parentContinuation: continuation.parentContinuation,
    };
  }

  private async executeHandoff(context: TurnContext, step: StepDefinition, operation: RuntimeHandoffOperation): Promise<StepRunResult> {
    const handoffId = this.newId("newHandoffId", "handoff");
    const patches: VariablePatch[] = [];
    const saveId = operation.saveHandoffIdToVariableId ?? operation.handoffIdVariableId;
    if (saveId) patches.push({ type: "set", variableId: saveId, value: handoffId, source: "operation", metadata: { operationId: operation.operationId } });
    context.events.push(this.event(context, "handoff_started", { operationId: operation.operationId, queueId: operation.queueId ?? operation.queue }));
    context.events.push(this.event(context, "handoff_completed", { operationId: operation.operationId, handoffId, outcome: "handoff_started" }));
    const rendered = operation.message ? await this.renderOne(context, step, operation.message) : emptyRendered();
    const branch = this.matchResultBranch(operation.onResult ?? [], { status: "success", outcome: "handoff_started", handoffId });
    return {
      status: "completed",
      outcome: "handoff_started",
      patches,
      messages: rendered.messages,
      events: rendered.events,
      branch,
      fragments: [{ source: "operation:handoff", data: { operationId: operation.operationId, handoffId, stepId: step.stepId } }],
    };
  }

  private matchResultBranch(branches: ResultBranch[], result: BranchMatchResult): StepBranch | undefined {
    return branches.find((candidate) => {
      const match = candidate.match;
      return (match.type === "outcome" && match.outcome === result.outcome)
        || (match.type === "status" && match.status === result.status)
        || (match.type === "error_code" && match.errorCode === result.errorCode);
    })?.branch;
  }

  private outputPatches(context: TurnContext, outputMapping: Record<string, string>, outputs: Record<string, unknown>, source: VariableValueSource, operationId?: string): { patches: VariablePatch[]; error?: RuntimeError } {
    const patches: VariablePatch[] = [];
    for (const [outputKey, variableId] of Object.entries(outputMapping)) {
      const error = this.ensureVariable(context.flow, variableId);
      if (error) return { patches, error };
      patches.push({ type: "set", variableId, value: outputs[outputKey], source, metadata: { operationId } });
    }
    return { patches };
  }

  private resolveRoute(step: StepDefinition, outcome: string): StepBranch | undefined {
    return (step.routes ?? [])
      .sort((left, right) => (left.priority ?? 0) - (right.priority ?? 0))
      .find((route) => route.match?.type === "outcome" ? route.match.outcome === outcome : route.match?.type === "always")
      ?.branch;
  }

  private applyTarget(context: TurnContext, target?: StepTarget): void {
    if (!target || target.type === "none") return;
    if (target.type === "stay") {
      context.state.status = "waiting_input";
      return;
    }
    if (target.type === "step") {
      if (!this.getStep(context.flow, target.stepId)) {
        this.attachError(context, "INVALID_TARGET", `Step target ${target.stepId} was not found.`, false);
        return;
      }
      context.state.currentStepId = target.stepId;
      context.state.status = "active";
      context.state.pendingInput = undefined;
      context.events.push(this.event(context, "transition_taken", { target }));
      context.fragments.push({ source: "transition", data: { target } });
      return;
    }
    if (target.type === "end") {
      context.state.status = target.status;
      context.conversation.status = target.status;
      context.events.push(this.event(context, "transition_taken", { target }));
      context.events.push(this.event(context, target.status === "cancelled" ? "conversation_cancelled" : "conversation_completed", { status: target.status }));
      context.fragments.push({ source: "transition", data: { target } });
    }
  }

  private collect(context: TurnContext, result: StepRunResult): void {
    for (const message of result.messages ?? []) context.messages.push(message);
    for (const event of result.events ?? []) context.events.push(event);
    for (const fragment of result.fragments ?? []) context.fragments.push(fragment);
    for (const patch of result.patches ?? []) this.applyPatch(context, patch);
  }

  private applyPatch(context: TurnContext, patch: VariablePatch): void {
    const variableId = patch.variableId;
    const scope = this.variableScope(context.flow, variableId, patch.scope);
    const previousVariable = this.readScopedVariable(context.state, variableId, scope);
    const previous = previousVariable?.value;
    const operationId = typeof patch.metadata?.operationId === "string" ? patch.metadata.operationId : undefined;
    if (patch.type === "set") {
      const nextVariable = {
        variableId,
        scope,
        value: patch.value,
        source: patch.source,
        updatedAt: this.clock.now(),
        metadata: patch.metadata,
      };
      this.writeScopedVariable(context.state, variableId, scope, nextVariable);
      context.events.push(this.event(context, "variable_set", { variableId, scope }));
    }
    if (patch.type === "unset") {
      this.deleteScopedVariable(context.state, variableId, scope);
      context.events.push(this.event(context, "variable_unset", { variableId, scope }));
    }
    if (patch.type === "invalidate") {
      const nextVariable = {
        variableId,
        scope,
        value: previousVariable?.value,
        source: patch.source,
        updatedAt: this.clock.now(),
        metadata: { ...(patch.metadata ?? {}), invalidated: true },
      };
      this.writeScopedVariable(context.state, variableId, scope, nextVariable);
      context.events.push(this.event(context, "variable_invalidated", { variableId, scope }));
    }
    context.patches.push(patch);
    const entry = {
      variableId,
      scope,
      previousValue: previous,
      nextValue: patch.type === "set" ? patch.value : undefined,
      patchType: patch.type,
      source: patch.source,
      conversationId: context.conversation.conversationId,
      flowVersionId: context.flow.flowVersionId,
      stepId: context.state.currentStepId,
      turnId: context.turn.turnId,
      operationId,
      changedAt: this.clock.now(),
      metadata: patch.metadata,
    };
    context.state.variableHistory[variableId] = [...(context.state.variableHistory[variableId] ?? []), entry];
    context.fragments.push({ source: "variable:write", data: { variableId, scope, patchType: patch.type, operationId } });
  }

  private async renderMany(context: TurnContext, step: StepDefinition, plans: ResponsePlan[]): Promise<RenderedOutput> {
    const aggregate = emptyRendered();
    for (const plan of plans) {
      const rendered = await this.renderOne(context, step, plan);
      aggregate.messages.push(...rendered.messages);
      aggregate.events.push(...rendered.events);
      aggregate.fragments.push(...rendered.fragments);
    }
    return aggregate;
  }

  private async renderOne(context: TurnContext, step: StepDefinition, plan: ResponsePlan): Promise<RenderedOutput> {
    if (plan?.mode === "reference") {
      const response = (context.flow.definition.responses ?? []).find((candidate) => candidate.responseId === plan.responseId);
      if (!response) {
        this.attachError(context, "RESPONSE_NOT_FOUND", `Response ${plan.responseId} was not found.`, false);
        return emptyRendered();
      }
      return this.renderOne(context, step, response.plan);
    }
    if (plan?.mode === "generated") {
      const generator = this.services().llmResponseGenerator;
      if (!generator) {
        this.attachError(context, "LLM_RESPONSE_GENERATOR_NOT_REGISTERED", "LLM response generator is not registered.", false);
        return emptyRendered();
      }
      context.events.push(this.event(context, "llm_response_generation_started", { stepId: step.stepId }));
      try {
        const filteredContext = { ...this.responseContext(context, step), state: this.filterStateForGeneratedResponse(context.state, plan.allowedVariableIds ?? []) };
        const generated = await generator.generate(plan, filteredContext);
        const allowedVariableIds = new Set<string>((plan.allowedVariableIds ?? []).map(String));
        if (!isLlmGeneratedResponse(generated)) {
          context.events.push(this.event(context, "llm_response_generation_failed", { stepId: step.stepId, code: "LLM_RESPONSE_USAGE_NOT_DECLARED" }));
          context.llmUsage.push({ purpose: "response_generation", success: false });
          this.attachError(context, "LLM_RESPONSE_USAGE_NOT_DECLARED", "Generated response must declare usedVariableIds.", false);
          return emptyRendered();
        }
        const usedVariableIds = generated.usedVariableIds.map(String);
        const disallowedVariableId = usedVariableIds.find((variableId: string) => !allowedVariableIds.has(variableId));
        if (disallowedVariableId) {
          context.events.push(this.event(context, "llm_response_generation_failed", { stepId: step.stepId, code: "invalid_generated_response_variable", variableId: disallowedVariableId }));
          context.llmUsage.push({ purpose: "response_generation", success: false });
          this.attachError(context, "invalid_generated_response_variable", `Generated response used undeclared variable ${disallowedVariableId}.`, false, {
            variableId: disallowedVariableId,
            allowedVariableIds: [...allowedVariableIds],
          });
          return emptyRendered();
        }
        const text = generated.text;
        context.events.push(this.event(context, "llm_response_generation_completed", { stepId: step.stepId }));
        context.llmUsage.push({ purpose: "response_generation", success: true });
        const message = this.textMessage(context, text);
        return { messages: [message], events: [this.event(context, "message_created", { messageId: message.messageId })], fragments: [{ source: "llm:response_generation", data: { stepId: step.stepId } }] };
      } catch (error) {
        context.events.push(this.event(context, "llm_response_generation_failed", { stepId: step.stepId, message: error instanceof Error ? error.message : String(error) }));
        context.llmUsage.push({ purpose: "response_generation", success: false });
        const message = this.textMessage(context, plan.fallbackText);
        return { messages: [message], events: [this.event(context, "message_created", { messageId: message.messageId })], fragments: [{ source: "llm:response_generation", data: { fallbackUsed: true } }] };
      }
    }
    let text = "";
    if (plan?.mode === "template") {
      text = String(plan.template ?? "").replace(/\{\{([^}]+)\}\}/g, (_match, name) => {
        const variableId = String(name).trim();
        const variable = this.readVariable(context, variableId);
        if (!variable) {
          this.attachMissingVariableError(context, variableId);
          return "";
        }
        return String(variable.value ?? "");
      });
      if (context.error) return emptyRendered();
    } else {
      text = String(plan?.text ?? "");
    }
    const message = this.textMessage(context, text);
    return {
      messages: [message],
      events: [this.event(context, "message_created", { messageId: message.messageId })],
      fragments: [{ source: plan?.mode === "template" ? "response:template" : "response:static", data: { stepId: step.stepId } }],
    };
  }

  private filterStateForGeneratedResponse(state: InternalState, allowedVariableIds: readonly string[]): InternalState {
    const filtered = clone(state);
    filtered.variables = Object.fromEntries(Object.entries(state.variables).filter(([variableId]) => allowedVariableIds.includes(variableId)));
    filtered.scopedVariables = Object.fromEntries(Object.entries(state.scopedVariables).filter(([, variable]) => allowedVariableIds.includes(variable.variableId)));
    return filtered;
  }

  private textMessage(context: TurnContext, text: string): OutboundMessage {
    return {
      messageId: this.newId("newMessageId", "message"),
      conversationId: context.conversation.conversationId,
      turnId: context.turn.turnId,
      channel: context.conversation.channel,
      content: { type: "text", text },
      createdAt: this.clock.now(),
    };
  }

  private evaluateCondition(context: TurnContext, condition: ConditionExpression): boolean {
    if (!condition || typeof condition !== "object") return false;
    switch (condition.type) {
      case "equals":
        return this.resolveValue(context, condition.left) === this.resolveValue(context, condition.right);
      case "not_equals":
        return this.resolveValue(context, condition.left) !== this.resolveValue(context, condition.right);
      case "exists":
        return condition.variableId in context.state.variables;
      case "not_exists":
        return !(condition.variableId in context.state.variables);
      case "greater_than":
        return Number(this.resolveValue(context, condition.left)) > Number(this.resolveValue(context, condition.right));
      case "less_than":
        return Number(this.resolveValue(context, condition.left)) < Number(this.resolveValue(context, condition.right));
      case "includes": {
        const collection = this.resolveValue(context, condition.collection);
        return Array.isArray(collection) && collection.includes(this.resolveValue(context, condition.value));
      }
      case "matches_regex":
        return new RegExp(condition.pattern, condition.flags).test(String(this.resolveValue(context, condition.value)));
      case "and":
        return condition.conditions.every((item) => this.evaluateCondition(context, item));
      case "or":
        return condition.conditions.some((item) => this.evaluateCondition(context, item));
      case "not":
        return !this.evaluateCondition(context, condition.condition);
    }
  }

  private resolveValue(context: TurnContext, expression: ValueExpression): unknown {
    if (!expression || typeof expression !== "object") return expression;
    if (expression.type === "literal") return expression.value;
    if (expression.type === "variable") {
      const variable = this.readVariable(context, expression.variableId);
      if (!variable) {
        this.attachMissingVariableError(context, expression.variableId);
        return undefined;
      }
      return variable.value;
    }
    if (expression.type === "template") {
      return String(expression.template ?? "").replace(/\{\{([^}]+)\}\}/g, (_match, name) => {
        const variableId = String(name).trim();
        const variable = this.readVariable(context, variableId);
        if (!variable) {
          this.attachMissingVariableError(context, variableId);
          return "";
        }
        return String(variable.value ?? "");
      });
    }
    return undefined;
  }

  private resolveMapping(context: TurnContext, mapping: Record<string, ValueExpression>): Record<string, unknown> {
    return Object.fromEntries(Object.entries(mapping).map(([key, expression]) => [key, this.resolveValue(context, expression)]));
  }

  private ensureVariable(flow: FlowVersion, variableId: string): RuntimeError | undefined {
    return (flow.definition.variables ?? []).some((variable) => variable.variableId === variableId)
      ? undefined
      : this.missingVariableError(flow, variableId);
  }

  private attachMissingVariableError(context: TurnContext, variableId: string, explicitScope?: VariableScope): void {
    this.attachRuntimeError(context, this.missingVariableError(context.flow, variableId, explicitScope));
  }

  private missingVariableError(flow: FlowVersion, variableId: string, explicitScope?: VariableScope): RuntimeError {
    const scope = this.variableScope(flow, variableId, explicitScope);
    return this.runtimeError("missing_variable_reference", `Variable ${variableId} was not found.`, false, { variableId, scope });
  }

  private variableScope(flow: FlowVersion, variableId: string, explicit?: VariableScope): VariableScope {
    return explicit ?? ((flow.definition.variables ?? []).find((variable) => variable.variableId === variableId)?.scope ?? "conversation");
  }

  private scopedKey(scope: VariableScope, variableId: string): string {
    return `${scope}:${variableId}`;
  }

  private readScopedVariable(state: InternalState, variableId: string, scope: VariableScope) {
    return state.scopedVariables[this.scopedKey(scope, variableId)];
  }

  private writeScopedVariable(
    state: InternalState,
    variableId: string,
    scope: VariableScope,
    value: RuntimeVariableValue,
  ): void {
    const scopedValue = { ...value, scope };
    state.scopedVariables[this.scopedKey(scope, variableId)] = scopedValue;
    if (scope === "conversation" || !(variableId in state.variables)) {
      state.variables[variableId] = scopedValue;
    }
  }

  private deleteScopedVariable(state: InternalState, variableId: string, scope: VariableScope): void {
    delete state.scopedVariables[this.scopedKey(scope, variableId)];
    if (state.variables[variableId]?.scope === scope) {
      const conversationValue = state.scopedVariables[this.scopedKey("conversation", variableId)];
      if (conversationValue) state.variables[variableId] = conversationValue;
      else delete state.variables[variableId];
    }
  }

  private readVariable(context: TurnContext, variableId: string, explicitScope?: VariableScope) {
    const scope = this.variableScope(context.flow, variableId, explicitScope);
    const variable = this.readScopedVariable(context.state, variableId, scope);
    context.fragments.push({ source: "variable:read", data: { variableId, scope, found: Boolean(variable) } });
    return variable;
  }

  private getStep(flow: FlowVersion, stepId: string): StepDefinition | undefined {
    return (flow.definition.steps ?? []).find((step) => step.stepId === stepId);
  }

  private createConversation(request: { conversationId: string; flowVersionId: string; channel?: string; userId?: string; metadata?: Record<string, unknown> }, flow?: FlowVersion): Conversation {
    return {
      conversationId: request.conversationId,
      flowVersionId: request.flowVersionId,
      status: flow ? "active" : "failed",
      channel: request.channel,
      userId: request.userId,
      createdAt: this.clock.now(),
      updatedAt: this.clock.now(),
      metadata: request.metadata,
    };
  }

  private createInitialState(conversation: Conversation, flow?: FlowVersion): InternalState {
    return {
      conversationId: conversation.conversationId,
      flowVersionId: conversation.flowVersionId,
      status: flow ? "active" : "failed",
      currentStepId: flow?.definition.startStepId ?? "unknown",
      variables: {},
      scopedVariables: {},
      variableHistory: {},
      executionStack: [],
      version: 0,
      updatedAt: this.clock.now(),
    };
  }

  private applyInitialVariables(context: TurnContext, initialVariables: Record<string, unknown>): void {
    for (const variable of context.flow.definition.variables ?? []) {
      if ("defaultValue" in variable) this.applyPatch(context, { type: "set", variableId: variable.variableId, value: variable.defaultValue, source: "system", scope: variable.scope });
    }
    for (const [variableId, value] of Object.entries(initialVariables)) {
      if (isScopedInitialVariables(value)) {
        for (const [scope, scopedValues] of Object.entries(value)) {
          if (!isVariableScope(scope)) continue;
          for (const [scopedVariableId, scopedValue] of Object.entries(scopedValues)) {
            this.applyPatch(context, { type: "set", variableId: scopedVariableId, value: scopedValue, source: "system", scope });
          }
        }
      } else {
        this.applyPatch(context, { type: "set", variableId, value, source: "system" });
      }
    }
  }

  private createTurn(conversationId: string, userInput?: UserInput): Turn {
    return {
      turnId: userInput?.turnId ?? this.newId("newTurnId", "turn"),
      conversationId,
      userInput,
      status: "started",
      startedAt: this.clock.now(),
    };
  }

  private createContext(flow: FlowVersion | undefined, conversation: Conversation, state: InternalState, turn: Turn, userInput?: UserInput): TurnContext {
    return {
      flow: flow ?? this.createFallbackFlow(conversation.flowVersionId, state.currentStepId),
      conversation,
      state,
      turn: { ...turn, userInput },
      messages: [],
      events: [this.eventBase(conversation, turn, "turn_started", {})],
      fragments: [],
      patches: [],
      llmUsage: [],
      initialStepId: state.currentStepId,
    };
  }

  private async commit(context: TurnContext): Promise<ProcessTurnResult> {
    context.turn.status = context.error ? "failed" : "completed";
    context.turn.completedAt = this.clock.now();
    context.conversation.status = context.state.status;
    context.conversation.updatedAt = this.clock.now();
    context.state.updatedAt = this.clock.now();
    context.state.version += 1;
    context.state.lastOutboundMessages = context.messages;
    const trace = this.trace(context);
    await this.repositories.conversations.save(clone(context.conversation));
    await this.repositories.states.save(clone(context.state));
    await this.repositories.events.append(clone(context.events));
    await this.repositories.traces.save(clone(trace));
    return {
      conversation: clone(context.conversation),
      state: clone(context.state),
      turn: clone(context.turn),
      events: clone(context.events),
      messages: clone(context.messages),
      trace: clone(trace),
      ...(context.error ? { error: context.error } : {}),
    };
  }

  private fail(context: TurnContext, code: string, message: string, recoverable: boolean): Promise<ProcessTurnResult> {
    this.attachError(context, code, message, recoverable);
    context.state.status = recoverable ? context.state.status : "failed";
    if (!recoverable) context.conversation.status = "failed";
    return this.commit(context);
  }

  private failWithError(context: TurnContext, error: RuntimeError): Promise<ProcessTurnResult> {
    this.attachRuntimeError(context, error);
    context.state.status = error.recoverable ? context.state.status : "failed";
    if (!error.recoverable) context.conversation.status = "failed";
    return this.commit(context);
  }

  private attachError(context: TurnContext, code: string, message: string, recoverable: boolean, details: Record<string, unknown> = {}): void {
    this.attachRuntimeError(context, this.runtimeError(code, message, recoverable, details));
  }

  private attachRuntimeError(context: TurnContext, error: RuntimeError): void {
    const { code, message, recoverable, ...details } = error as RuntimeError & Record<string, unknown>;
    context.error = error;
    if (!recoverable) {
      context.state.status = "failed";
      context.conversation.status = "failed";
    }
    context.events.push(this.event(context, "error_raised", { code, message, ...details }));
    context.fragments.push({ source: "error", data: { code, message, recoverable, ...details } });
  }

  private runtimeError(code: string, message: string, recoverable: boolean, details: Record<string, unknown> = {}): RuntimeError {
    return { code, message, recoverable, ...details } as RuntimeError;
  }

  private event(context: TurnContext, type: ConversationEventType, payload: Record<string, unknown> = {}): ConversationEvent {
    return this.eventBase(context.conversation, context.turn, type, payload, context.state.currentStepId);
  }

  private eventBase(conversation: Conversation, turn: Turn, type: ConversationEventType, payload: Record<string, unknown>, stepId?: string): ConversationEvent {
    return {
      eventId: this.newId("newEventId", "event"),
      conversationId: conversation.conversationId,
      turnId: turn.turnId,
      flowVersionId: conversation.flowVersionId,
      stepId,
      type,
      payload,
      createdAt: this.clock.now(),
    };
  }

  private trace(context: TurnContext): DecisionTrace {
    return {
      traceId: this.newId("newTraceId", "trace"),
      conversationId: context.conversation.conversationId,
      turnId: context.turn.turnId,
      flowVersionId: context.conversation.flowVersionId,
      initialStepId: context.initialStepId,
      finalStepId: context.state.currentStepId,
      userInput: context.turn.userInput,
      fragments: context.fragments,
      events: context.events,
      messages: context.messages,
      variablePatches: context.patches,
      llmUsage: context.llmUsage,
      createdAt: this.clock.now(),
    };
  }

  private newId(method: IdFactoryName, prefix: string): string {
    return this.idGenerator[method]?.() ?? `${prefix}-${Math.random().toString(36).slice(2)}`;
  }

  private stepContext(context: TurnContext, step: StepDefinition): StepExecutionContext {
    return { flow: context.flow, step, config: step.config, state: context.state, turn: context.turn, services: this.services() };
  }

  private inputContext(context: TurnContext, step: StepDefinition): InputProcessingContext {
    return { flow: context.flow, step, state: context.state, turn: context.turn };
  }

  private responseContext(context: TurnContext, step: StepDefinition): ResponseRenderingContext {
    return { flow: context.flow, step, state: context.state, turn: context.turn, channel: context.conversation.channel };
  }

  private operationContext(context: TurnContext, step: StepDefinition): OperationExecutionContext {
    return { flow: context.flow, step, state: context.state, turn: context.turn, services: this.services() };
  }

  private actionContext(context: TurnContext, step: StepDefinition): ActionExecutionContext {
    return { flow: context.flow, step, state: context.state, turn: context.turn };
  }

  private conditionEvaluationContext(context: Parameters<RuntimeServices["conditionEvaluator"]["evaluate"]>[1]): TurnContext {
    const conversation: Conversation = {
      conversationId: context.state.conversationId,
      flowVersionId: context.state.flowVersionId,
      status: context.state.status,
      createdAt: context.state.updatedAt,
      updatedAt: context.state.updatedAt,
    };
    return {
      flow: context.flow,
      conversation,
      state: this.toInternalState(context.state),
      turn: context.turn ?? this.createTurn(context.state.conversationId),
      messages: [],
      events: [],
      fragments: [],
      patches: [],
      llmUsage: [],
      initialStepId: context.step.stepId,
    };
  }

  private stepPrompt(step: StepDefinition): ResponsePlan | undefined {
    if (step.type === "menu" || step.type === "input" || step.type === "attachment") {
      return step.config.prompt;
    }
    return undefined;
  }

  private isFlowCallFrame(frame: FlowExecutionFrame | undefined): frame is FlowCallExecutionFrame {
    return frame?.metadata?.kind === "flow_call";
  }

  private createFallbackFlow(flowVersionId: string, currentStepId: string): FlowVersion {
    return {
      flowVersionId,
      flowId: "unknown",
      version: "unknown",
      status: "draft",
      schemaVersion: "unknown",
      createdAt: this.clock.now(),
      definition: {
        flowId: "unknown",
        startStepId: currentStepId,
        variables: [],
        steps: [],
      },
    };
  }

  private toInternalState(state: ConversationState): InternalState {
    return {
      ...state,
      variables: clone(state.variables),
      scopedVariables: clone(state.scopedVariables ?? this.scopedVariablesFromFlatValues(state.variables)),
      variableHistory: clone(state.variableHistory ?? {}),
    };
  }

  private scopedVariablesFromFlatValues(variables: ConversationState["variables"]): InternalState["scopedVariables"] {
    const scopedVariables: InternalState["scopedVariables"] = {};
    for (const variable of Object.values(variables)) {
      scopedVariables[this.scopedKey(variable.scope, variable.variableId)] = clone(variable);
    }
    return scopedVariables;
  }

  private async callSemanticResolver(
    resolver: NonNullable<EngineOptions["semanticInputResolver"]>,
    input: UserInput,
    task: SemanticInputTask,
    context: InputProcessingContext,
  ): Promise<SemanticInputResolution> {
    return typeof resolver === "function" ? resolver(input, task, context) : resolver.resolve(input, task, context);
  }

  private normalizeExternalStepResult(result: StepResult): StepRunResult {
    return {
      status: result.status,
      outcome: result.outcome,
      branch: result.branch,
      messages: result.messages,
      patches: result.variablePatches,
      events: result.events,
      waitState: result.waitState,
      fragments: result.trace ? [result.trace] : [],
      error: result.error,
    };
  }
}

function emptyRendered(): RenderedOutput {
  return { messages: [], events: [], fragments: [] };
}

function clone<T>(value: T): T {
  if (value === undefined) return value;
  return structuredClone(value) as T;
}

function isLlmGeneratedResponse(value: LlmGeneratedResponse | unknown): value is LlmGeneratedResponse {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { text?: unknown; usedVariableIds?: unknown };
  return typeof candidate.text === "string" && Array.isArray(candidate.usedVariableIds);
}

function isScopedInitialVariables(value: unknown): value is Partial<Record<VariableScope, Record<VariableId, unknown>>> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const candidate = value as Partial<Record<VariableScope, unknown>>;
  return ["conversation", "flow", "operation", "system"].some((scope) => scope in candidate);
}

function isVariableScope(value: string): value is VariableScope {
  return value === "conversation" || value === "flow" || value === "operation" || value === "system";
}
