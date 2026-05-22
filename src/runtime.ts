import type {
  ActionDefinition,
  AttachmentInput,
  Conversation,
  ConversationEngine,
  ConversationEngineModule,
  ConversationEngineRepositories,
  ConversationEvent,
  ConversationEngineConfig,
  CreateConversationEngineOptions,
  ConversationState,
  DecisionTrace,
  FlowVersion,
  OutboundMessage,
  ProcessTurnResult,
  RuntimeContext,
  RuntimeError,
  RuntimeServices,
  StepBranch,
  StepDefinition,
  StepOperation,
  StepTarget,
  Turn,
  UserInput,
  VariablePatch,
  VariableScope,
  VariableValueSource,
} from "./types.js";

type EngineOptions = CreateConversationEngineOptions & {
  flowVersions?: FlowVersion[];
  clock?: { now(): string };
  idGenerator?: Partial<Record<string, () => string>>;
  maxStepExecutionsPerTurn?: number;
  actionHandlers?: Record<string, ((action: ActionDefinition, input: Record<string, unknown>, context: unknown) => Promise<unknown>) | { execute(action: ActionDefinition, input: Record<string, unknown>, context: unknown): Promise<unknown> }>;
  customOperations?: Record<string, { outcomes?: string[]; outputVariables?: string[]; execute(operation: StepOperation, input: Record<string, unknown>, context: unknown): Promise<unknown> }>;
  stepHandlers?: Record<string, { stepType: string; enter(context: unknown): Promise<unknown>; handleInput?(context: unknown, input: UserInput): Promise<unknown>; validate?: unknown }>;
  semanticInputResolver?: ((input: UserInput, task: unknown, context: unknown) => Promise<unknown>) | { resolve(input: UserInput, task: unknown, context: unknown): Promise<unknown> };
  llmResponseGenerator?: ((plan: unknown, context: unknown) => Promise<unknown>) | { generate(plan: unknown, context: unknown): Promise<unknown> };
};

type InternalState = Omit<ConversationState, "variables" | "variableHistory"> & {
  variables: Record<string, { variableId: string; scope?: VariableScope; value?: unknown; source?: string; updatedAt?: string; metadata?: Record<string, unknown> }>;
  scopedVariables: Record<string, { variableId: string; scope: VariableScope; value?: unknown; source?: string; updatedAt?: string; metadata?: Record<string, unknown> }>;
  variableHistory: Record<string, Array<Record<string, unknown>>>;
  __flowScopes?: Record<string, VariableScope>;
};

type TurnContext = {
  flow: FlowVersion;
  conversation: Conversation;
  state: InternalState;
  turn: Turn;
  messages: OutboundMessage[];
  events: ConversationEvent[];
  fragments: Array<Record<string, unknown>>;
  patches: VariablePatch[];
  llmUsage: Array<Record<string, unknown>>;
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
  fragments?: Array<Record<string, unknown>>;
  waitState?: Record<string, unknown>;
  error?: RuntimeError;
};

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
  private readonly clock: { now(): string };
  private readonly idGenerator: Record<string, () => string>;
  private readonly maxStepExecutionsPerTurn: number;
  private serviceModule?: RuntimeServices;

  constructor(private readonly options: EngineOptions) {
    for (const flowVersion of options.flowVersions ?? []) this.flowVersions.set(flowVersion.flowVersionId, flowVersion);
    this.clock = options.runtime?.clock ?? options.clock ?? { now: () => new Date().toISOString() };
    let counter = 0;
    const next = (prefix: string) => `${prefix}-${++counter}`;
    this.idGenerator = {
      newConversationId: () => next("conversation"),
      newTurnId: () => next("turn"),
      newMessageId: () => next("message"),
      newEventId: () => next("event"),
      newTraceId: () => next("trace"),
      newCandidateId: () => next("candidate"),
      newExecutionFrameId: () => next("frame"),
      newHandoffId: () => next("handoff"),
      ...(options.runtime?.idGenerator as Record<string, () => string> | undefined),
      ...(options.idGenerator as Record<string, () => string> | undefined),
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
      idGenerator: this.idGenerator as any,
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
        getByConversationId: async (conversationId) => clone(this.states.get(conversationId)) as any,
        save: async (state) => {
          this.states.set(state.conversationId, clone(state as unknown as InternalState));
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
        register: (handler: any) => {
          this.options.stepHandlers = { ...(this.options.stepHandlers ?? {}), [handler.stepType]: handler };
        },
        getHandler: (stepType: string) => {
          const handler = this.options.stepHandlers?.[stepType];
          if (!handler) throw this.runtimeError("STEP_HANDLER_NOT_REGISTERED", `Step handler for ${stepType} is not registered.`, false);
          return handler as any;
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
        execute: async (action: ActionDefinition, input: Record<string, unknown>, context: unknown) => {
          const handler = this.options.actionHandlers?.[action.kind];
          if (!handler) throw this.runtimeError("ACTION_HANDLER_NOT_REGISTERED", `Action handler ${action.kind} is not registered.`, false);
          return typeof handler === "function" ? handler(action, input, context as any) as any : handler.execute(action, input, context as any) as any;
        },
      },
      conditionEvaluator: {
        evaluate: async (condition: any, context: any) => ({ matched: this.evaluateCondition({ ...context, fragments: [] } as TurnContext, condition) }),
      },
      transitionResolver: {
        resolveFromStepResult: async (step: StepDefinition, result: any) => result.branch ?? (result.outcome ? this.resolveRoute(step, result.outcome) : undefined),
        resolveFromOutcome: async (step: StepDefinition, outcome: string) => this.resolveRoute(step, outcome),
      },
      stateReducer: {
        apply: (state: ConversationState) => state,
      },
      traceBuilder: {
        build: (input: any) => ({
          traceId: this.newId("newTraceId", "trace"),
          createdAt: this.clock.now(),
          ...input,
        }),
      },
      semanticInputResolver: typeof this.options.semanticInputResolver === "function"
        ? { resolve: this.options.semanticInputResolver as any }
        : this.options.semanticInputResolver,
      llmResponseGenerator: typeof this.options.llmResponseGenerator === "function"
        ? { generate: this.options.llmResponseGenerator as any }
        : this.options.llmResponseGenerator,
    };
    this.serviceModule = { ...internalServices, ...(this.options.services ?? {}) };
    return this.serviceModule;
  }

  private async startConversation(request: { conversationId: string; flowVersionId: string; channel?: string; userId?: string; initialVariables?: Record<string, unknown>; metadata?: Record<string, unknown> }): Promise<ProcessTurnResult> {
    const flow = await this.getFlowVersion(request.flowVersionId);
    const conversation = this.createConversation(request, flow);
    const state = this.createInitialState(conversation, flow, request.initialVariables ?? {});
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
    const flow = existingState ? await this.getFlowVersion(existingState.flowVersionId) : undefined;
    const safeConversation = conversation ?? this.createConversation({ conversationId: request.conversationId, flowVersionId: flow?.flowVersionId ?? "unknown" }, flow);
    const safeState = existingState ?? this.createInitialState(safeConversation, flow, {});
    const turn = this.createTurn(request.conversationId, request.input);
    const context = this.createContext(flow, safeConversation, clone(safeState), turn, request.input);

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
    if (result.error) return this.failWithError(context, result.error);
    await this.applyStepResult(context, step, result);
    await this.runAutomaticSteps(context);
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
      return await this.repositories.states.getByConversationId(conversationId) as InternalState | undefined;
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
    const stepType = (step as any).type as string;
    context.events.push(this.event(context, "step_entered", { stepId: step.stepId, stepType }));
    context.fragments.push({ source: `step:${stepType}`, data: { stepId: step.stepId, phase: "enter" } });

    const onEnter = await this.executeOperations(context, step, (step as any).onEnter ?? []);
    if (onEnter.error || onEnter.target) return onEnter;

    if (stepType === "message") return this.enterMessageStep(context, step);
    if (stepType === "menu") return this.enterMenuStep(context, step);
    if (stepType === "input") return this.enterInputStep(context, step);
    if (stepType === "attachment") return this.enterAttachmentStep(context, step);
    if (stepType === "condition") return this.enterConditionStep(context, step);
    if (stepType === "end") return this.enterEndStep(context, step);
    if (stepType === "custom") return this.enterCustomStep(context, step);
    return { status: "failed", error: this.runtimeError("STEP_HANDLER_NOT_REGISTERED", `Step handler for ${stepType} is not registered.`, false) };
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
      context.state.status = "waiting_input";
      context.state.pendingInput = { stepId: step.stepId, createdAt: this.clock.now(), ...(result.waitState ?? {}) } as any;
      context.state.currentStepId = step.stepId;
      return;
    }

    let target = result.target;
    let branch = result.branch;
    if (!branch && result.outcome) branch = this.resolveRoute(step, result.outcome);
    if (branch) {
      const branchResult = await this.executeBranch(context, step, branch);
      if (branchResult.error) {
        this.attachRuntimeError(context, branchResult.error);
        return;
      }
      target = branchResult.target ?? target;
    }

    const exitResult = await this.executeOperations(context, step, (step as any).onExit ?? []);
    if (exitResult.error) {
      this.attachRuntimeError(context, exitResult.error);
      return;
    }
    target = exitResult.target ?? target;

    if (!target && !branch && step.type === "message") {
      target = { type: "end", status: "completed" };
    }

    this.applyTarget(context, target);
    context.events.push(this.event(context, "step_completed", { stepId: step.stepId, outcome: result.outcome }));
  }

  private enterMessageStep(context: TurnContext, step: StepDefinition): StepRunResult | Promise<StepRunResult> {
    return this.renderMany(context, step, ((step as any).config?.messages ?? []) as any[]).then((rendered) => ({
      status: (step as any).config?.autoAdvance === false ? "waiting_input" : "completed",
      outcome: "next",
      messages: rendered.messages,
      fragments: rendered.fragments,
      events: rendered.events,
      waitState: { stepId: step.stepId },
    }));
  }

  private async enterMenuStep(context: TurnContext, step: StepDefinition): Promise<StepRunResult> {
    const rendered = await this.renderOne(context, step, (step as any).config.prompt);
    const options = ((step as any).config.options ?? []) as Array<Record<string, any>>;
    const prompt = rendered.messages[0];
    if (prompt) {
      prompt.content = {
        type: "rich",
        text: (prompt.content as any).text,
        buttons: options.map((option) => ({ optionId: option.optionId, label: option.label ?? option.optionId })),
      } as any;
    }
    return {
      status: "waiting_input",
      messages: rendered.messages,
      events: rendered.events,
      fragments: rendered.fragments,
      waitState: { stepId: step.stepId, inputContract: { acceptedInputTypes: ["text", "choice"] } },
    };
  }

  private async enterInputStep(context: TurnContext, step: StepDefinition): Promise<StepRunResult> {
    const rendered = (step as any).config.prompt ? await this.renderOne(context, step, (step as any).config.prompt) : emptyRendered();
    return {
      status: "waiting_input",
      messages: rendered.messages,
      events: rendered.events,
      fragments: rendered.fragments,
      waitState: { stepId: step.stepId, inputContract: (step as any).config.input },
    };
  }

  private async enterAttachmentStep(context: TurnContext, step: StepDefinition): Promise<StepRunResult> {
    const rendered = (step as any).config.prompt ? await this.renderOne(context, step, (step as any).config.prompt) : emptyRendered();
    return {
      status: "waiting_input",
      messages: rendered.messages,
      events: rendered.events,
      fragments: rendered.fragments,
      waitState: { stepId: step.stepId, inputContract: { acceptedInputTypes: ["attachment"] } },
    };
  }

  private async enterConditionStep(context: TurnContext, step: StepDefinition): Promise<StepRunResult> {
    const evaluated: Array<Record<string, unknown>> = [];
    for (const conditionBranch of ((step as any).config.branches ?? []) as Array<Record<string, any>>) {
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
    const defaultBranch = (step as any).config.defaultBranch;
    context.events.push(this.event(context, "condition_evaluated", { stepId: step.stepId, matched: false }));
    return {
      status: "completed",
      outcome: "default",
      branch: defaultBranch,
      fragments: [{ source: "condition:evaluate", data: { evaluated, selectedBranchId: defaultBranch?.branchId } }],
    };
  }

  private async enterEndStep(context: TurnContext, step: StepDefinition): Promise<StepRunResult> {
    const rendered = (step as any).config.finalMessage ? await this.renderOne(context, step, (step as any).config.finalMessage) : emptyRendered();
    return { status: "completed", target: { type: "end", status: (step as any).config.status }, messages: rendered.messages, events: rendered.events, fragments: rendered.fragments };
  }

  private async enterCustomStep(context: TurnContext, step: StepDefinition): Promise<StepRunResult> {
    const customType = (step as any).config?.customType;
    const registry = this.services().stepRegistry;
    const handler = customType && registry.hasHandler(customType) ? registry.getHandler(customType) : undefined;
    if (!handler) return { status: "failed", error: this.runtimeError("STEP_HANDLER_NOT_REGISTERED", `Custom step handler ${customType} is not registered.`, false) };
    const result = await handler.enter(this.stepContext(context, step) as any);
    return this.normalizeExternalStepResult(result);
  }

  private async handleMenuInput(context: TurnContext, step: StepDefinition, input: UserInput): Promise<StepRunResult> {
    const options = ((step as any).config.options ?? []) as Array<Record<string, any>>;
    const selection = (step as any).config.selection ?? {};
    let selected: Record<string, any> | undefined;
    let resolver = "unknown";
    let text: string | undefined;
    if (selection.allowButtons !== false && (input as any).type === "choice" && (input as any).optionId) {
      selected = options.find((option) => option.optionId === (input as any).optionId);
      resolver = "option_id";
    }
    if (!selected && (input as any).type === "text") {
      const inputText = String((input as any).text ?? "").trim();
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
      const task = {
        taskId: `${step.stepId}:menu_selection`,
        mode: "menu_selection",
        allowedOutcomes,
        allowedVariableIds: [],
        threshold: selection.semanticSelection.threshold,
      };
      context.events.push(this.event(context, "semantic_input_task_started", { taskId: task.taskId }));
      const semantic = await this.callSemanticResolver(semanticResolver, input, task, this.inputContext(context, step));
      const outcome = String((semantic as any).outcome ?? "");
      const confidence = Number((semantic as any).confidence ?? 0);
      const variables = (semantic as any).variables ?? {};
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
      const rendered = await this.renderInvalid(context, step, (step as any).config.invalidSelection);
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

  private async handleInputStepInput(context: TurnContext, step: StepDefinition, input: UserInput): Promise<StepRunResult> {
    if ((input as any).type !== "text") return this.invalidInput(context, step, "Input must be text.");
    const contract = (step as any).config.input;
    const binding = contract.bindings?.[0];
    const raw = String((input as any).text ?? "");
    const value = raw.trim();
    for (const validator of binding?.validators ?? []) {
      const validation = this.validateValue(value, validator);
      if (validation.error) return { status: "failed", error: validation.error };
      if (!validation.valid) return this.invalidInput(context, step, validator.message ?? "Input is invalid.");
    }
    const patches: VariablePatch[] = [{ type: "set", variableId: binding.targetVariableId, value, source: "user_input" } as any];
    const fragments: Array<Record<string, unknown>> = [{ source: "input:resolve", data: { status: "resolved", variableId: binding.targetVariableId } }];

    for (const task of contract.semanticTasks ?? []) {
      if (task.mode !== "after_valid_capture") continue;
      const resolver = this.services().semanticInputResolver;
      if (!resolver) return { status: "failed", error: this.runtimeError("SEMANTIC_INPUT_RESOLVER_NOT_REGISTERED", "Semantic input resolver is not registered.", false) };
      context.events.push(this.event(context, "semantic_input_task_started", { taskId: task.taskId }));
      const semantic = await this.callSemanticResolver(resolver, input, task, this.inputContext(context, step));
      const outcome = (semantic as any).outcome;
      const variables = (semantic as any).variables ?? {};
      if (!task.allowedOutcomes.includes(outcome)) {
        return { status: "failed", error: this.runtimeError("SEMANTIC_RESULT_OUT_OF_CONTRACT", `Semantic outcome ${outcome} is not declared.`, false) };
      }
      for (const variableId of Object.keys(variables)) {
        if (task.allowedVariableIds && !task.allowedVariableIds.includes(variableId)) {
          return { status: "failed", error: this.runtimeError("SEMANTIC_RESULT_OUT_OF_CONTRACT", `Semantic variable ${variableId} is not declared.`, false) };
        }
        patches.push({ type: "set", variableId, value: variables[variableId], source: "semantic_input_task" } as any);
      }
      if (task.saveOutcomeToVariableId && !(task.saveOutcomeToVariableId in variables)) {
        patches.push({ type: "set", variableId: task.saveOutcomeToVariableId, value: outcome, source: "semantic_input_task" } as any);
      }
      context.events.push(this.event(context, "semantic_input_task_completed", { taskId: task.taskId, outcome }));
      context.llmUsage.push({ purpose: "input_resolution", success: true });
      fragments.push({ source: "semantic_input", data: { taskId: task.taskId, outcome, variables } });
    }

    return { status: "completed", outcome: "captured", patches, events: [this.event(context, "input_resolved", { stepId: step.stepId })], fragments };
  }

  private async handleAttachmentInput(context: TurnContext, step: StepDefinition, input: UserInput): Promise<StepRunResult> {
    if ((input as any).type !== "attachment") return this.invalidInput(context, step, "Input must be an attachment.");
    const attachment = ((input as any).attachments ?? [])[0] as AttachmentInput | undefined;
    const rules = (step as any).config.rules ?? {};
    const extension = attachment?.filename?.slice(attachment.filename.lastIndexOf(".")).toLowerCase();
    const valid = attachment !== undefined
      && (!rules.allowedMimeTypes || rules.allowedMimeTypes.includes(attachment.mimeType))
      && (!rules.allowedExtensions || rules.allowedExtensions.includes(extension))
      && (!rules.maxSizeMb || attachment.sizeBytes <= rules.maxSizeMb * 1024 * 1024);
    if (!valid) {
      const rendered = await this.renderInvalid(context, step, (step as any).config.invalidAttachment);
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
      patches: [{ type: "set", variableId: (step as any).config.targetVariableId, value: attachment, source: "attachment" } as any],
      events: [this.event(context, "input_resolved", { stepId: step.stepId })],
      fragments: [{ source: "attachment:validate", data: { valid: true, filename: attachment?.filename, mimeType: attachment?.mimeType } }],
    };
  }

  private async handleCustomStepInput(context: TurnContext, step: StepDefinition, input: UserInput): Promise<StepRunResult> {
    const customType = (step as any).config?.customType;
    const registry = this.services().stepRegistry;
    const handler = customType && registry.hasHandler(customType) ? registry.getHandler(customType) : undefined;
    if (!handler?.handleInput) return { status: "failed", error: this.runtimeError("STEP_HANDLER_NOT_REGISTERED", `Custom step handler ${customType} is not registered.`, false) };
    const result = await handler.handleInput(this.stepContext(context, step) as any, input);
    return this.normalizeExternalStepResult(result);
  }

  private async invalidInput(context: TurnContext, step: StepDefinition, reason: unknown): Promise<StepRunResult> {
    const semantic = await this.resolveSemanticAfterInvalidInput(context, step);
    if (semantic) return semantic;
    const rendered = await this.renderInvalid(context, step, (step as any).config.input?.invalidBehavior);
    return {
      status: "waiting_input",
      messages: rendered.messages,
      events: [this.event(context, "input_invalid", { stepId: step.stepId, reason: String(reason) })],
      fragments: [{ source: "input:validate", data: { valid: false, reason: String(reason) } }],
      waitState: { stepId: step.stepId, retryCount: ((context.state.pendingInput?.retryCount ?? 0) + 1) },
    };
  }

  private async renderInvalid(context: TurnContext, step: StepDefinition, behavior: any) {
    const messages: OutboundMessage[] = [];
    const events: ConversationEvent[] = [];
    const fragments: Array<Record<string, unknown>> = [];
    if (behavior?.message) {
      const rendered = await this.renderOne(context, step, behavior.message);
      messages.push(...rendered.messages);
      events.push(...rendered.events);
      fragments.push(...rendered.fragments);
    }
    const prompt = (step as any).config.prompt;
    if (prompt) {
      const rendered = await this.renderOne(context, step, prompt);
      messages.push(...rendered.messages);
      events.push(...rendered.events);
      fragments.push(...rendered.fragments);
    }
    return { messages, events, fragments };
  }

  private async resolveSemanticAfterInvalidInput(context: TurnContext, step: StepDefinition): Promise<StepRunResult | undefined> {
    const tasks = ((step as any).config.input?.semanticTasks ?? []).filter((task: any) => task.mode === "after_invalid_input");
    if (tasks.length === 0) return undefined;
    const resolver = this.services().semanticInputResolver;
    if (!resolver) return { status: "failed", error: this.runtimeError("SEMANTIC_INPUT_RESOLVER_NOT_REGISTERED", "Semantic input resolver is not registered.", false) };
    const task = tasks[0];
    context.events.push(this.event(context, "semantic_input_task_started", { taskId: task.taskId }));
    const semantic = await this.callSemanticResolver(resolver, context.turn.userInput as UserInput, task, this.inputContext(context, step));
    const outcome = (semantic as any).outcome;
    const variables = (semantic as any).variables ?? {};
    if (!task.allowedOutcomes.includes(outcome)) {
      return { status: "failed", error: this.runtimeError("SEMANTIC_RESULT_OUT_OF_CONTRACT", `Semantic outcome ${outcome} is not declared.`, false) };
    }
    const patches: VariablePatch[] = [];
    for (const variableId of Object.keys(variables)) {
      if (task.allowedVariableIds && !task.allowedVariableIds.includes(variableId)) {
        return { status: "failed", error: this.runtimeError("SEMANTIC_RESULT_OUT_OF_CONTRACT", `Semantic variable ${variableId} is not declared.`, false) };
      }
      patches.push({ type: "set", variableId, value: variables[variableId], source: "semantic_input_task" } as any);
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

  private validateValue(value: string, validator: any): { valid: boolean; error?: RuntimeError } {
    if (validator.type === "regex") return { valid: new RegExp(String(validator.options?.pattern ?? "")).test(value) };
    if (validator.type === "integer") return { valid: /^-?\d+$/.test(value) };
    if (validator.type === "number") return { valid: !Number.isNaN(Number(value)) };
    if (validator.type === "required") return { valid: value.length > 0 };
    if (validator.type === "email") return { valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) };
    if (validator.type === "min_length") return { valid: value.length >= Number(validator.options?.min ?? validator.options?.value ?? 0) };
    if (validator.type === "max_length") return { valid: value.length <= Number(validator.options?.max ?? validator.options?.value ?? Number.MAX_SAFE_INTEGER) };
    if (validator.type === "enum") return { valid: (validator.options?.values ?? []).includes(value) };
    return { valid: false, error: this.runtimeError("VALIDATOR_NOT_REGISTERED", `Validator ${validator.type} is not registered.`, false) };
  }

  private async executeBranch(context: TurnContext, step: StepDefinition, branch: StepBranch): Promise<StepRunResult> {
    const operationResult = await this.executeOperations(context, step, (branch as any).operations ?? []);
    if (operationResult.error) return operationResult;
    return { status: "completed", target: operationResult.target ?? branch.target, messages: operationResult.messages, events: operationResult.events, patches: operationResult.patches, fragments: operationResult.fragments };
  }

  private async executeOperations(context: TurnContext, step: StepDefinition, operations: StepOperation[]): Promise<StepRunResult> {
    const aggregate: StepRunResult = { status: "completed", messages: [], events: [], patches: [], fragments: [] };
    for (const operation of operations as any[]) {
      if (!builtInOperationTypes.has(operation.type)) {
        return { status: "failed", error: this.runtimeError("OPERATION_HANDLER_NOT_REGISTERED", `Operation handler for ${operation.type} is not registered.`, false) };
      }
      context.events.push(this.event(context, "operation_started", { operationType: operation.type, operationId: operation.operationId }));
      const result = await this.executeOperation(context, step, operation);
      this.collect(context, result);
      if (result.error) {
        context.events.push(this.event(context, "operation_failed", { operationType: operation.type, operationId: operation.operationId, code: result.error.code }));
        return result;
      }
      if (result.branch) {
        const branchResult = await this.executeBranch(context, step, result.branch);
        this.collect(context, branchResult);
        if (branchResult.error) return branchResult;
        if (branchResult.target) aggregate.target = branchResult.target;
      }
      context.events.push(this.event(context, "operation_completed", { operationType: operation.type, operationId: operation.operationId, outcome: result.outcome }));
      if (result.target) aggregate.target = result.target;
    }
    return aggregate;
  }

  private async executeOperation(context: TurnContext, step: StepDefinition, operation: any): Promise<StepRunResult> {
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
        patches: [{ type: "set", variableId: operation.variableId, value, source: operation.source ?? "operation", metadata: { operationId: operation.operationId }, scope: operation.scope } as any],
        fragments: [{ source: "variable:write", data: { variableId: operation.variableId, scope: this.variableScope(context.flow, operation.variableId, operation.scope), operationId: operation.operationId } }],
      };
    }
    if (operation.type === "unset_variable") {
      const error = this.ensureVariable(context.flow, operation.variableId);
      if (error) return { status: "failed", error };
      return { status: "completed", patches: [{ type: "unset", variableId: operation.variableId, source: "operation", metadata: { operationId: operation.operationId }, scope: operation.scope } as any] };
    }
    if (operation.type === "invalidate_variable") {
      const error = this.ensureVariable(context.flow, operation.variableId);
      if (error) return { status: "failed", error };
      return { status: "completed", patches: [{ type: "invalidate", variableId: operation.variableId, source: "operation", metadata: { operationId: operation.operationId, invalidated: true }, scope: operation.scope } as any] };
    }
    if (operation.type === "run_action") return this.executeAction(context, step, operation);
    if (operation.type === "call_flow") return this.executeFlowCall(context, step, operation);
    if (operation.type === "handoff") return this.executeHandoff(context, step, operation);
    if (operation.type === "custom") return this.executeCustomOperation(context, step, operation);
    if (operation.type === "emit_event") {
      const payload = this.resolveMapping(context, operation.payload ?? {});
      if (context.error) return { status: "failed", error: context.error };
      return { status: "completed", events: [this.event(context, operation.eventType, payload)], fragments: [{ source: "operation:emit_event", data: { eventType: operation.eventType } }] };
    }
    return { status: "failed", error: this.runtimeError("OPERATION_HANDLER_NOT_REGISTERED", `Operation handler for ${operation.type} is not registered.`, false) };
  }

  private async executeAction(context: TurnContext, step: StepDefinition, operation: any): Promise<StepRunResult> {
    const action = (context.flow.definition.actions ?? []).find((candidate: any) => candidate.actionId === operation.actionId) as any;
    if (!action) return { status: "failed", error: this.runtimeError("ACTION_NOT_FOUND", `Action ${operation.actionId} was not found.`, false) };
    const input = this.resolveMapping(context, operation.inputMapping ?? {});
    if (context.error) return { status: "failed", error: context.error };
    context.events.push(this.event(context, "action_started", { actionId: action.actionId, actionKind: action.kind }));
    const handler = this.options.actionHandlers?.[action.kind];
    if (!handler && !this.options.services?.actionExecutor) return { status: "failed", error: this.runtimeError("ACTION_HANDLER_NOT_REGISTERED", `Action handler ${action.kind} is not registered.`, false) };
    const result = this.options.services?.actionExecutor
      ? await this.options.services.actionExecutor.execute(action, input, this.actionContext(context, step) as any) as any
      : await (typeof handler === "function" ? handler(action, input, this.actionContext(context, step) as any) : handler!.execute(action, input, this.actionContext(context, step) as any)) as any;
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

  private async executeCustomOperation(context: TurnContext, step: StepDefinition, operation: any): Promise<StepRunResult> {
    const contract = this.options.customOperations?.[operation.customType];
    if (!contract) return { status: "failed", error: this.runtimeError("CUSTOM_OPERATION_CONTRACT_NOT_REGISTERED", `Custom operation ${operation.customType} is not registered.`, false) };
    const input = this.resolveMapping(context, operation.inputMapping ?? {});
    if (context.error) return { status: "failed", error: context.error };
    const result = await contract.execute(operation, input, this.operationContext(context, step)) as any;
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

  private async executeFlowCall(context: TurnContext, step: StepDefinition, operation: any): Promise<StepRunResult> {
    const childFlow = await this.getFlowVersion(operation.flowVersionId);
    if (!childFlow) return { status: "failed", error: this.runtimeError("FLOW_VERSION_NOT_FOUND", `Flow version ${operation.flowVersionId} was not found.`, false) };
    const beforeScopedVariables = clone(context.state.scopedVariables);
    const sharing = this.flowCallSharingPolicy(operation);
    const childContext: TurnContext = { ...context, flow: childFlow, nested: true, initialStepId: childFlow.definition.startStepId };
    childContext.state.currentStepId = childFlow.definition.startStepId;
    childContext.state.status = "active";
    context.events.push(this.event(context, "flow_call_started", { flowVersionId: childFlow.flowVersionId, operationId: operation.operationId }));
    await this.runAutomaticSteps(childContext);
    const afterScopedVariables = clone(context.state.scopedVariables);
    const sharingResult = this.restoreFlowCallVariables(context.state, beforeScopedVariables, afterScopedVariables, sharing);
    if (childContext.error) return { status: "failed", error: childContext.error };
    context.state.status = "active";
    context.events.push(this.event(context, "flow_call_completed", { flowVersionId: childFlow.flowVersionId, operationId: operation.operationId, status: "completed" }));
    const result = { status: "completed", outcome: "completed" };
    const branch = this.matchResultBranch(operation.onResult ?? [], result);
    return {
      status: "completed",
      outcome: "completed",
      branch,
      fragments: [{
        source: "operation:call_flow",
        data: {
          operationId: operation.operationId,
          flowVersionId: childFlow.flowVersionId,
          sharedVariables: sharingResult.sharedVariables,
          isolatedVariables: sharingResult.isolatedVariables,
        },
      }],
    };
  }

  private flowCallSharingPolicy(operation: any): { scopes: Set<VariableScope>; include?: Set<string>; exclude: Set<string> } {
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

  private async executeHandoff(context: TurnContext, step: StepDefinition, operation: any): Promise<StepRunResult> {
    const handoffId = this.newId("newHandoffId", "handoff");
    const patches: VariablePatch[] = [];
    const saveId = operation.saveHandoffIdToVariableId ?? operation.handoffIdVariableId;
    if (saveId) patches.push({ type: "set", variableId: saveId, value: handoffId, source: "operation", metadata: { operationId: operation.operationId } } as any);
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

  private matchResultBranch(branches: any[], result: any): StepBranch | undefined {
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
      patches.push({ type: "set", variableId, value: outputs[outputKey], source, metadata: { operationId } } as any);
    }
    return { patches };
  }

  private resolveRoute(step: StepDefinition, outcome: string): StepBranch | undefined {
    const routes = ((step as any).routes ?? []) as Array<Record<string, any>>;
    return routes
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
    for (const patch of result.patches ?? []) this.applyPatch(context, patch as any);
  }

  private applyPatch(context: TurnContext, patch: VariablePatch): void {
    const variableId = (patch as any).variableId;
    const scope = this.variableScope(context.flow, variableId, (patch as any).scope);
    const previousVariable = this.readScopedVariable(context.state, variableId, scope);
    const previous = previousVariable?.value;
    const operationId = (patch as any).metadata?.operationId;
    if ((patch as any).type === "set") {
      const nextVariable = {
        variableId,
        scope,
        value: (patch as any).value,
        source: (patch as any).source,
        updatedAt: this.clock.now(),
        metadata: (patch as any).metadata,
      };
      this.writeScopedVariable(context.state, variableId, scope, nextVariable);
      context.events.push(this.event(context, "variable_set", { variableId, scope }));
    }
    if ((patch as any).type === "unset") {
      this.deleteScopedVariable(context.state, variableId, scope);
      context.events.push(this.event(context, "variable_unset", { variableId, scope }));
    }
    if ((patch as any).type === "invalidate") {
      const nextVariable = {
        variableId,
        scope,
        value: previousVariable?.value,
        source: (patch as any).source,
        updatedAt: this.clock.now(),
        metadata: { ...((patch as any).metadata ?? {}), invalidated: true },
      };
      this.writeScopedVariable(context.state, variableId, scope, nextVariable);
      context.events.push(this.event(context, "variable_invalidated", { variableId, scope }));
    }
    context.patches.push(patch);
    const entry = {
      variableId,
      scope,
      previousValue: previous,
      nextValue: (patch as any).type === "set" ? (patch as any).value : undefined,
      patchType: (patch as any).type,
      source: (patch as any).source,
      conversationId: context.conversation.conversationId,
      flowVersionId: context.flow.flowVersionId,
      stepId: context.state.currentStepId,
      turnId: context.turn.turnId,
      operationId,
      changedAt: this.clock.now(),
      metadata: (patch as any).metadata,
    };
    context.state.variableHistory[variableId] = [...(context.state.variableHistory[variableId] ?? []), entry];
    context.fragments.push({ source: "variable:write", data: { variableId, scope, patchType: (patch as any).type, operationId } });
  }

  private async renderMany(context: TurnContext, step: StepDefinition, plans: any[]) {
    const aggregate = emptyRendered();
    for (const plan of plans) {
      const rendered = await this.renderOne(context, step, plan);
      aggregate.messages.push(...rendered.messages);
      aggregate.events.push(...rendered.events);
      aggregate.fragments.push(...rendered.fragments);
    }
    return aggregate;
  }

  private async renderOne(context: TurnContext, step: StepDefinition, plan: any): Promise<{ messages: OutboundMessage[]; events: ConversationEvent[]; fragments: Array<Record<string, unknown>> }> {
    if (plan?.mode === "reference") {
      const response = (context.flow.definition.responses ?? []).find((candidate: any) => candidate.responseId === plan.responseId) as any;
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
        const generated = await generator.generate(plan, filteredContext as any);
        const allowedVariableIds = new Set<string>((plan.allowedVariableIds ?? []).map(String));
        const usedVariableIds = typeof generated === "string" ? [] : ((generated as any).usedVariableIds ?? []).map(String);
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
        const text = typeof generated === "string" ? generated : (generated as any).text;
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

  private filterStateForGeneratedResponse(state: InternalState, allowedVariableIds: string[]): InternalState {
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

  private evaluateCondition(context: TurnContext, condition: any): boolean {
    if (!condition || typeof condition !== "object") return false;
    if (condition.type === "equals") return this.resolveValue(context, condition.left) === this.resolveValue(context, condition.right);
    if (condition.type === "not_equals") return this.resolveValue(context, condition.left) !== this.resolveValue(context, condition.right);
    if (condition.type === "exists") return condition.variableId in context.state.variables;
    if (condition.type === "not_exists") return !(condition.variableId in context.state.variables);
    if (condition.type === "greater_than") return Number(this.resolveValue(context, condition.left)) > Number(this.resolveValue(context, condition.right));
    if (condition.type === "less_than") return Number(this.resolveValue(context, condition.left)) < Number(this.resolveValue(context, condition.right));
    if (condition.type === "matches_regex") return new RegExp(condition.pattern, condition.flags).test(String(this.resolveValue(context, condition.value)));
    if (condition.type === "and") return (condition.conditions ?? []).every((item: any) => this.evaluateCondition(context, item));
    if (condition.type === "or") return (condition.conditions ?? []).some((item: any) => this.evaluateCondition(context, item));
    if (condition.type === "not") return !this.evaluateCondition(context, condition.condition);
    return false;
  }

  private resolveValue(context: TurnContext, expression: any): unknown {
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

  private resolveMapping(context: TurnContext, mapping: Record<string, any>): Record<string, unknown> {
    return Object.fromEntries(Object.entries(mapping).map(([key, expression]) => [key, this.resolveValue(context, expression)]));
  }

  private ensureVariable(flow: FlowVersion, variableId: string): RuntimeError | undefined {
    return (flow.definition.variables ?? []).some((variable: any) => variable.variableId === variableId)
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
    return explicit ?? ((flow.definition.variables ?? []).find((variable: any) => variable.variableId === variableId)?.scope ?? "conversation");
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
    value: { variableId: string; scope?: VariableScope; value?: unknown; source?: string; updatedAt?: string; metadata?: Record<string, unknown> },
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
    return (flow.definition.steps ?? []).find((step: any) => step.stepId === stepId) as StepDefinition | undefined;
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
    } as Conversation;
  }

  private createInitialState(conversation: Conversation, flow?: FlowVersion, initialVariables: Record<string, unknown> = {}): InternalState {
    const state: InternalState = {
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
    } as InternalState;
    return state;
  }

  private applyInitialVariables(context: TurnContext, initialVariables: Record<string, unknown>): void {
    for (const variable of context.flow.definition.variables ?? []) {
      const typed = variable as any;
      if ("defaultValue" in typed) this.applyPatch(context, { type: "set", variableId: typed.variableId, value: typed.defaultValue, source: "system", scope: typed.scope } as any);
    }
    for (const [variableId, value] of Object.entries(initialVariables)) {
      if (value && typeof value === "object" && !Array.isArray(value) && ["conversation", "flow", "operation", "system"].some((scope) => scope in (value as any))) {
        for (const [scope, scopedValues] of Object.entries(value as Record<string, Record<string, unknown>>)) {
          for (const [scopedVariableId, scopedValue] of Object.entries(scopedValues)) {
            this.applyPatch(context, { type: "set", variableId: scopedVariableId, value: scopedValue, source: "system", scope } as any);
          }
        }
      } else {
        this.applyPatch(context, { type: "set", variableId, value, source: "system" } as any);
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
      flow: flow ?? ({ flowVersionId: conversation.flowVersionId, flowId: "unknown", definition: { startStepId: state.currentStepId, steps: [], variables: [] } } as any),
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
    await this.repositories.states.save(clone(context.state) as any);
    await this.repositories.events.append(clone(context.events));
    await this.repositories.traces.save(clone(trace));
    return {
      conversation: clone(context.conversation),
      state: clone(context.state) as any,
      turn: clone(context.turn),
      events: clone(context.events),
      messages: clone(context.messages),
      trace: clone(trace),
      ...(context.error ? { error: context.error } : {}),
    } as ProcessTurnResult;
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

  private event(context: TurnContext, type: string, payload: Record<string, unknown> = {}): ConversationEvent {
    return this.eventBase(context.conversation, context.turn, type, payload, context.state.currentStepId);
  }

  private eventBase(conversation: Conversation, turn: Turn, type: string, payload: Record<string, unknown>, stepId?: string): ConversationEvent {
    return {
      eventId: this.newId("newEventId", "event"),
      conversationId: conversation.conversationId,
      turnId: turn.turnId,
      flowVersionId: conversation.flowVersionId,
      stepId,
      type,
      payload: payload as any,
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
      fragments: context.fragments as any,
      events: context.events,
      messages: context.messages,
      variablePatches: context.patches,
      llmUsage: context.llmUsage as any,
      createdAt: this.clock.now(),
    };
  }

  private appendEvents(events: ConversationEvent[]): void {
    for (const event of events) {
      const list = this.events.get(event.conversationId) ?? [];
      list.push(clone(event));
      this.events.set(event.conversationId, list);
    }
  }

  private appendTrace(trace: DecisionTrace): void {
    const list = this.traces.get(trace.conversationId) ?? [];
    list.push(clone(trace));
    this.traces.set(trace.conversationId, list);
  }

  private newId(method: string, prefix: string): string {
    return this.idGenerator[method]?.() ?? `${prefix}-${Math.random().toString(36).slice(2)}`;
  }

  private stepContext(context: TurnContext, step: StepDefinition) {
    return { flow: context.flow, step, config: (step as any).config, state: context.state, turn: context.turn, services: this.services() };
  }

  private inputContext(context: TurnContext, step: StepDefinition) {
    return { flow: context.flow, step, state: context.state, turn: context.turn };
  }

  private responseContext(context: TurnContext, step: StepDefinition) {
    return { flow: context.flow, step, state: context.state, turn: context.turn, channel: context.conversation.channel };
  }

  private operationContext(context: TurnContext, step: StepDefinition) {
    return { flow: context.flow, step, state: context.state, turn: context.turn, services: this.services() };
  }

  private actionContext(context: TurnContext, step: StepDefinition) {
    return { flow: context.flow, step, state: context.state, turn: context.turn };
  }

  private async callSemanticResolver(resolver: NonNullable<EngineOptions["semanticInputResolver"]>, input: UserInput, task: unknown, context: unknown): Promise<unknown> {
    return typeof resolver === "function" ? resolver(input, task as any, context as any) : resolver.resolve(input, task as any, context as any);
  }

  private normalizeExternalStepResult(result: any): StepRunResult {
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

function emptyRendered(): { messages: OutboundMessage[]; events: ConversationEvent[]; fragments: Array<Record<string, unknown>> } {
  return { messages: [], events: [], fragments: [] };
}

function clone<T>(value: T): T {
  if (value === undefined) return value;
  return structuredClone(value) as T;
}
