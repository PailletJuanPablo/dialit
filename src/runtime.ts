import type {
  ActionExecutionContext,
  ActionResult,
  AttachmentStepDefinition,
  ConditionExpression,
  ConditionStepDefinition,
  Conversation,
  ConversationEngine,
  ConversationEngineModule,
  ConversationEngineRepositories,
  ConversationEvent,
  ConversationEventType,
  ConversationEventEnvelope,
  ConversationEventSubscriber,
  ConversationEventSubscription,
  ConversationEngineConfig,
  ConversationState,
  CustomOperation,
  DecisionTrace,
  FlowCallStatus,
  FlowExecutionFrame,
  FlowVersion,
  IdGenerator,
  InvalidGeneratedResponseVariableRuntimeError,
  InputBinding,
  InputContract,
  InputProcessingContext,
  InputStepDefinition,
  InvalidInputBehavior,
  NormalizationContext,
  NormalizerDefinition,
  ExtractionContext,
  ExtractionResult,
  ExtractorDefinition,
  MenuOption,
  MenuStepDefinition,
  MessageStepDefinition,
  MissingVariableReferenceRuntimeError,
  OperationExecutionContext,
  OperationResult,
  OperationalRuntimeError,
  OperationalRuntimeErrorCode,
  OutboundMessage,
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
  StepOperation,
  StepOutcome,
  StepResult,
  StepTarget,
  TraceFragment,
  Turn,
  UserInput,
  ValidationContext,
  ValidatorDefinition,
  ValidationResult,
  VariablePatch,
  VariableScope,
  VariableValueSource,
  ValueExpression,
} from "./types.js";
import { clone } from "./runtime-support.js";
import {
  builtInExtractorTypes,
  builtInNormalizerTypes,
  builtInOperationTypes,
  builtInValidatorTypes,
  bytesPerMegabyte,
  defaultFlowCallSharingScopes,
  globalCommandAliases,
  globalCommandOutcomes,
} from "./runtime/constants.js";
import {
  emptyRendered,
  isLlmGeneratedResponse,
  isScopedInitialVariables,
  isVariableScope,
  runtimeTypeOf,
} from "./runtime/helpers.js";
import { createInternalRepositories } from "./runtime/repositories.js";
import { createRuntimeServices } from "./runtime/services.js";
import type {
  BranchMatchResult,
  EngineOptions,
  FlowCallExecutionFrame,
  IdFactoryName,
  InternalState,
  OperationContinuation,
  OperationContinuationBase,
  RenderedOutput,
  ResultBranch,
  RuntimeCallFlowOperation,
  RuntimeCustomOperationResult,
  RuntimeHandoffOperation,
  RuntimeVariableValue,
  StepRunResult,
  TurnContext,
} from "./runtime/internal-types.js";

type GlobalCommandName = keyof typeof globalCommandOutcomes;

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
  private readonly eventSubscribers = new Set<ConversationEventSubscriber>();
  private serviceModule?: RuntimeServices;

  constructor(private readonly options: EngineOptions) {
    for (const flowVersion of options.flowVersions ?? []) this.flowVersions.set(flowVersion.flowVersionId, flowVersion);
    for (const subscriber of options.eventSubscribers ?? []) this.eventSubscribers.add(subscriber);
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
    this.internalRepositories = createInternalRepositories({
      flowVersions: this.flowVersions,
      conversations: this.conversations,
      states: this.states,
      events: this.events,
      traces: this.traces,
      toInternalState: (state) => this.toInternalState(state),
    });
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
      processExternalEvent: (request) => this.processUserInput({ conversationId: request.conversationId, input: request.event }),
      subscribeToEvents: (subscriber) => this.subscribeToEvents(subscriber),
      repositories: this.repositories,
      services: this.services(),
      runtime: this.runtimeContext,
    };
  }

  private subscribeToEvents(subscriber: ConversationEventSubscriber): ConversationEventSubscription {
    this.eventSubscribers.add(subscriber);
    return {
      unsubscribe: () => {
        this.eventSubscribers.delete(subscriber);
      },
    };
  }

  private services(): RuntimeServices {
    if (this.serviceModule) return this.serviceModule;
    const internalServices = createRuntimeServices({
      options: this.options,
      runtimeError: (code, message, recoverable) => this.runtimeError(code, message, recoverable),
      evaluateCondition: (condition, context) => this.evaluateCondition(this.conditionEvaluationContext(context), condition),
      resolveRoute: (step, outcome) => this.resolveRoute(step, outcome),
      newTraceId: () => this.newId("newTraceId", "trace"),
      now: () => this.clock.now(),
    });
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
        return { status: "failed", error: this.runtimeError("STEP_HANDLER_NOT_REGISTERED", `Step handler for ${runtimeTypeOf(step)} is not registered.`, false) };
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
    const contract = step.config.input;
    if (!contract.acceptedInputTypes.includes(input.type)) return this.invalidInput(context, step, `Input type ${input.type} is not accepted.`);

    const globalCommand = this.resolveGlobalCommand(contract, input);
    if (globalCommand) {
      return {
        status: "completed",
        outcome: globalCommandOutcomes[globalCommand],
        events: [this.event(context, "input_resolved", { stepId: step.stepId, command: globalCommand })],
        fragments: [{ source: "input:global_command", data: { command: globalCommand, outcome: globalCommandOutcomes[globalCommand] } }],
      };
    }

    const bindingResult = await this.resolveInputBindings(context, step, input, contract.bindings ?? []);
    if (bindingResult.error) return { status: "failed", error: bindingResult.error };
    if (!bindingResult.valid) return this.invalidInput(context, step, bindingResult.message ?? "Input is invalid.");

    const patches = bindingResult.patches;
    const fragments = bindingResult.fragments;

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

  private resolveGlobalCommand(contract: InputContract, input: UserInput): GlobalCommandName | undefined {
    if (input.type !== "text") return undefined;
    const text = input.text.trim().toLowerCase();
    if (contract.globalCommands?.allowCancel && matchesAlias(globalCommandAliases.cancel, text)) return "cancel";
    if (contract.globalCommands?.allowHelp && matchesAlias(globalCommandAliases.help, text)) return "help";
    if (contract.globalCommands?.allowBack && matchesAlias(globalCommandAliases.back, text)) return "back";
    if (contract.globalCommands?.allowHandoff && matchesAlias(globalCommandAliases.handoff, text)) return "handoff";
    return undefined;
  }

  private async resolveInputBindings(
    context: TurnContext,
    step: InputStepDefinition,
    input: UserInput,
    bindings: InputBinding[],
  ): Promise<{ valid: boolean; patches: VariablePatch[]; fragments: TraceFragment[]; message?: string; error?: RuntimeError }> {
    if (bindings.length === 0) {
      return {
        valid: false,
        patches: [],
        fragments: [],
        error: this.runtimeError("INPUT_BINDING_NOT_FOUND", `Input step ${step.stepId} has no bindings.`, false),
      };
    }

    const patches: VariablePatch[] = [];
    const fragments: TraceFragment[] = [];
    for (const binding of bindings) {
      const bindingResult = await this.resolveInputBinding(context, step, input, binding);
      if (bindingResult.error) return { valid: false, patches, fragments, error: bindingResult.error };
      if (!bindingResult.valid) return { valid: false, patches, fragments, message: bindingResult.message };
      if (bindingResult.patch) patches.push(bindingResult.patch);
      fragments.push(...bindingResult.fragments);
    }

    return { valid: true, patches, fragments };
  }

  private async resolveInputBinding(
    context: TurnContext,
    step: InputStepDefinition,
    input: UserInput,
    binding: InputBinding,
  ): Promise<{ valid: boolean; fragments: TraceFragment[]; patch?: VariablePatch; message?: string; error?: RuntimeError }> {
    if (binding.source !== input.type) {
      return binding.required
        ? { valid: false, fragments: [], message: `Input source ${binding.source} is required.` }
        : { valid: true, fragments: [] };
    }

    const rawInput = this.inputValue(input);
    if (rawInput === undefined) {
      return binding.required
        ? { valid: false, fragments: [], message: `Input source ${binding.source} is required.` }
        : { valid: true, fragments: [] };
    }

    let value: unknown = rawInput;
    for (const normalizer of binding.normalizers ?? []) {
      const normalized = await this.normalizeInputValue(context, step, input, value, normalizer);
      if (normalized.error) return { valid: false, fragments: [], error: normalized.error };
      value = normalized.value;
    }

    for (const extractor of binding.extractors ?? []) {
      const extracted = await this.extractInputValue(context, step, input, value, extractor);
      if (extracted.error) return { valid: false, fragments: [], error: extracted.error };
      if (!extracted.result.matched) return { valid: false, fragments: [], message: `Extractor ${extractor.type} did not match.` };
      value = "value" in extracted.result ? extracted.result.value : extracted.result.values;
    }

    for (const validator of binding.validators ?? []) {
      const validation = await this.validateValue(context, step, value, validator, binding.targetVariableId);
      if (validation.error) return { valid: false, fragments: [], error: validation.error };
      if (!validation.result.valid) return { valid: false, fragments: [], message: validation.result.reason ?? "Input is invalid." };
      if ("normalizedValue" in validation.result) value = validation.result.normalizedValue;
    }

    const metadata = binding.saveRawInput ? { rawInput } : undefined;
    return {
      valid: true,
      patch: { type: "set", variableId: binding.targetVariableId, value, source: "user_input", ...(metadata === undefined ? {} : { metadata }) },
      fragments: [{ source: "input:binding", data: { status: "resolved", variableId: binding.targetVariableId, source: binding.source } }],
    };
  }

  private inputValue(input: UserInput): unknown {
    switch (input.type) {
      case "text":
        return input.text;
      case "choice":
        return input.optionId ?? input.label ?? input.payload;
      case "attachment":
        return input.attachments;
      case "payload":
        return input.payload;
      case "event":
        return input.eventType;
    }
  }

  private async normalizeInputValue(
    context: TurnContext,
    step: StepDefinition,
    input: UserInput,
    value: unknown,
    normalizer: NormalizerDefinition,
  ): Promise<{ value: unknown; error?: RuntimeError }> {
    if (builtInNormalizerTypes.has(normalizer.type)) {
      return { value: this.applyBuiltInNormalizer(value, normalizer) };
    }

    const registry = this.services().normalizerRegistry;
    if (!registry.hasNormalizer(normalizer.type)) {
      return { value, error: this.runtimeError("NORMALIZER_NOT_REGISTERED", `Normalizer ${normalizer.type} is not registered.`, false) };
    }
    const normalizationContext: NormalizationContext = { ...this.baseExecutionContext(context, step), input };
    return { value: await registry.getNormalizer(normalizer.type).normalize(value, normalizer, normalizationContext) };
  }

  private applyBuiltInNormalizer(value: unknown, normalizer: NormalizerDefinition): unknown {
    if (typeof value !== "string") return value;
    if (normalizer.type === "trim") return value.trim();
    if (normalizer.type === "lowercase") return value.toLowerCase();
    if (normalizer.type === "uppercase") return value.toUpperCase();
    if (normalizer.type === "collapse_spaces") return value.replace(/\s+/g, " ");
    return value;
  }

  private async extractInputValue(
    context: TurnContext,
    step: StepDefinition,
    input: UserInput,
    value: unknown,
    extractor: ExtractorDefinition,
  ): Promise<{ result: ExtractionResult; error?: RuntimeError }> {
    if (builtInExtractorTypes.has(extractor.type)) {
      return { result: this.applyBuiltInExtractor(input, value, extractor) };
    }

    const registry = this.services().extractorRegistry;
    if (!registry.hasExtractor(extractor.type)) {
      return { result: { matched: false }, error: this.runtimeError("EXTRACTOR_NOT_REGISTERED", `Extractor ${extractor.type} is not registered.`, false) };
    }
    const extractionContext: ExtractionContext = this.baseExecutionContext(context, step);
    return { result: await registry.getExtractor(extractor.type).extract(input, extractor, extractionContext) };
  }

  private applyBuiltInExtractor(input: UserInput, value: unknown, extractor: ExtractorDefinition): ExtractionResult {
    const text = String(value);
    if (extractor.type === "raw_text") return { matched: true, value };
    if (extractor.type === "regex") {
      const pattern = String(extractor.options?.pattern ?? "");
      const flags = typeof extractor.options?.flags === "string" ? extractor.options.flags : undefined;
      const group = Number(extractor.options?.group ?? 0);
      const match = new RegExp(pattern, flags).exec(text);
      return match && match[group] !== undefined ? { matched: true, value: match[group] } : { matched: false };
    }
    if (extractor.type === "number") return Number.isNaN(Number(text)) ? { matched: false } : { matched: true, value: Number(text) };
    if (extractor.type === "integer") return /^-?\d+$/.test(text) ? { matched: true, value: Number(text) } : { matched: false };
    if (extractor.type === "email") {
      const match = /[^\s@]+@[^\s@]+\.[^\s@]+/.exec(text);
      return match ? { matched: true, value: match[0] } : { matched: false };
    }
    if (extractor.type === "phone") {
      const match = /[+() \d-]{6,}/.exec(text);
      return match ? { matched: true, value: match[0].trim() } : { matched: false };
    }
    if (extractor.type === "date") {
      const timestamp = Date.parse(text);
      return Number.isNaN(timestamp) ? { matched: false } : { matched: true, value: new Date(timestamp).toISOString().slice(0, 10) };
    }
    if (extractor.type === "event_type" && input.type === "event") return { matched: true, value: input.eventType };
    if (extractor.type === "payload_path" && input.type === "payload") {
      const valueAtPath = this.valueAtPath(input.payload, String(extractor.options?.path ?? ""));
      return valueAtPath === undefined ? { matched: false } : { matched: true, value: valueAtPath };
    }
    return { matched: false };
  }

  private async handleAttachmentInput(context: TurnContext, step: AttachmentStepDefinition, input: UserInput): Promise<StepRunResult> {
    if (input.type !== "attachment") return this.invalidInput(context, step, "Input must be an attachment.");
    if (step.config.rules.required === false && input.attachments.length === 0) {
      return {
        status: "completed",
        outcome: "skipped",
        fragments: [{ source: "attachment:validate", data: { valid: true, skipped: true } }],
      };
    }
    const rules = step.config.rules;
    const attachment = input.attachments[0];
    const valid = attachment !== undefined
      && (rules.maxFiles === undefined || input.attachments.length <= rules.maxFiles)
      && input.attachments.every((candidate) => {
        const extensionIndex = candidate.filename?.lastIndexOf(".") ?? -1;
        const extension = extensionIndex >= 0 ? candidate.filename?.slice(extensionIndex).toLowerCase() : undefined;
        return (!rules.allowedMimeTypes || rules.allowedMimeTypes.includes(candidate.mimeType))
          && (!rules.allowedExtensions || (extension !== undefined && rules.allowedExtensions.includes(extension)))
          && (!rules.maxSizeMb || candidate.sizeBytes <= rules.maxSizeMb * bytesPerMegabyte);
      });
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
    for (const validator of rules.validators ?? []) {
      const validation = await this.validateValue(context, step, input.attachments, validator, step.config.targetVariableId);
      if (validation.error) return { status: "failed", error: validation.error };
      if (!validation.result.valid) {
        const rendered = await this.renderInvalid(context, step, step.config.invalidAttachment);
        return {
          status: "waiting_input",
          messages: rendered.messages,
          events: [this.event(context, "input_invalid", { stepId: step.stepId, reason: validation.result.reason ?? "invalid_attachment" })],
          fragments: [{ source: "attachment:validate", data: { valid: false, validator: validator.type } }],
          waitState: { stepId: step.stepId, retryCount: ((context.state.pendingInput?.retryCount ?? 0) + 1) },
        };
      }
    }
    const attachmentValue = input.attachments.length === 1 ? attachment : input.attachments;
    return {
      status: "completed",
      outcome: "captured",
      patches: [{ type: "set", variableId: step.config.targetVariableId, value: attachmentValue, source: "attachment" }],
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

  private async validateValue(
    context: TurnContext,
    step: StepDefinition,
    value: unknown,
    validator: ValidatorDefinition,
    variableId?: string,
  ): Promise<{ result: ValidationResult; error?: RuntimeError }> {
    if (builtInValidatorTypes.has(validator.type)) {
      return { result: this.applyBuiltInValidator(value, validator) };
    }

    const registry = this.services().validatorRegistry;
    if (!registry.hasValidator(validator.type)) {
      return { result: { valid: false }, error: this.runtimeError("VALIDATOR_NOT_REGISTERED", `Validator ${validator.type} is not registered.`, false) };
    }
    const validationContext: ValidationContext = { ...this.baseExecutionContext(context, step), ...(variableId === undefined ? {} : { variableId }) };
    return { result: await registry.getValidator(validator.type).validate(value, validator, validationContext) };
  }

  private applyBuiltInValidator(value: unknown, validator: ValidatorDefinition): ValidationResult {
    const text = String(value ?? "");
    if (validator.type === "regex") return { valid: new RegExp(String(validator.options?.pattern ?? "")).test(text) };
    if (validator.type === "integer") return { valid: /^-?\d+$/.test(text) };
    if (validator.type === "number") return { valid: !Number.isNaN(Number(text)) };
    if (validator.type === "required") return { valid: text.length > 0 };
    if (validator.type === "email") return { valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) };
    if (validator.type === "min_length") return { valid: text.length >= Number(validator.options?.min ?? validator.options?.value ?? 0) };
    if (validator.type === "max_length") return { valid: text.length <= Number(validator.options?.max ?? validator.options?.value ?? Number.MAX_SAFE_INTEGER) };
    if (validator.type === "enum") {
      const values = validator.options?.values;
      return { valid: Array.isArray(values) && values.some((candidate) => Object.is(candidate, value)) };
    }
    return { valid: false };
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
      if (!builtInOperationTypes.has(operation.type) && !this.services().operationRegistry.hasHandler(operation.type)) {
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
    const operationType = runtimeTypeOf(operation);
    const registry = this.services().operationRegistry;
    if (registry.hasHandler(operationType)) {
      return this.normalizeExternalOperationResult(await registry.getHandler(operationType).execute(operation, this.operationContext(context, step)));
    }
    return { status: "failed", error: this.runtimeError("OPERATION_HANDLER_NOT_REGISTERED", `Operation handler for ${operationType} is not registered.`, false) };
  }

  private async executeAction(context: TurnContext, step: StepDefinition, operation: Extract<StepOperation, { type: "run_action" }>): Promise<StepRunResult> {
    const action = (context.flow.definition.actions ?? []).find((candidate) => candidate.actionId === operation.actionId);
    if (!action) return { status: "failed", error: this.runtimeError("ACTION_NOT_FOUND", `Action ${operation.actionId} was not found.`, false) };
    const input = this.resolveMapping(context, operation.inputMapping ?? {});
    if (context.error) return { status: "failed", error: context.error };
    context.events.push(this.event(context, "action_started", { actionId: action.actionId, actionKind: action.kind }));
    const handler = this.options.actionHandlers?.[action.kind];
    const actionContext = this.actionContext(context, step);
    let result: ActionResult;
    if (this.options.services?.actionExecutor) {
      result = await this.options.services.actionExecutor.execute(action, input, actionContext);
    } else {
      if (!handler) return { status: "failed", error: this.runtimeError("ACTION_HANDLER_NOT_REGISTERED", `Action handler ${action.kind} is not registered.`, false) };
      result = typeof handler === "function" ? await handler(action, input, actionContext) : await handler.execute(action, input, actionContext);
    }
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
      scopes: new Set(sharing?.scopes ?? defaultFlowCallSharingScopes),
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
          this.attachRuntimeError(context, this.invalidGeneratedResponseVariableError(disallowedVariableId, [...allowedVariableIds]));
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

  private valueAtPath(value: unknown, path: string): unknown {
    if (path.length === 0) return value;
    return path.split(".").reduce<unknown>((current, segment) => (
      isObjectRecord(current) ? current[segment] : undefined
    ), value);
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

  private missingVariableError(flow: FlowVersion, variableId: string, explicitScope?: VariableScope): MissingVariableReferenceRuntimeError {
    const scope = this.variableScope(flow, variableId, explicitScope);
    return {
      code: "missing_variable_reference",
      message: `Variable ${variableId} was not found.`,
      recoverable: false,
      variableId,
      scope,
    };
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
    const result = {
      conversation: clone(context.conversation),
      state: clone(context.state),
      turn: clone(context.turn),
      events: clone(context.events),
      messages: clone(context.messages),
      trace: clone(trace),
      ...(context.error ? { error: context.error } : {}),
    };
    await this.publishEvents(result);
    return result;
  }

  private async publishEvents(result: ProcessTurnResult): Promise<void> {
    if (this.eventSubscribers.size === 0 || result.events.length === 0) return;
    const subscribers = [...this.eventSubscribers];
    for (const event of result.events) {
      const envelope: ConversationEventEnvelope = {
        event: clone(event),
        result: clone(result),
      };
      for (const subscriber of subscribers) {
        await subscriber(envelope);
      }
    }
  }

  private fail(context: TurnContext, code: OperationalRuntimeErrorCode, message: string, recoverable: boolean): Promise<ProcessTurnResult> {
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

  private attachError(context: TurnContext, code: OperationalRuntimeErrorCode, message: string, recoverable: boolean, details: Record<string, unknown> = {}): void {
    this.attachRuntimeError(context, this.runtimeError(code, message, recoverable, details));
  }

  private attachRuntimeError(context: TurnContext, error: RuntimeError): void {
    const { code, message, recoverable } = error;
    const details = runtimeErrorMetadata(error);
    context.error = error;
    if (!recoverable) {
      context.state.status = "failed";
      context.conversation.status = "failed";
    }
    context.events.push(this.event(context, "error_raised", { code, message, ...details }));
    context.fragments.push({ source: "error", data: { code, message, recoverable, ...details } });
  }

  private runtimeError(code: OperationalRuntimeErrorCode, message: string, recoverable: boolean, details: Record<string, unknown> = {}): OperationalRuntimeError {
    return { ...details, code, message, recoverable };
  }

  private invalidGeneratedResponseVariableError(variableId: string, allowedVariableIds: string[]): InvalidGeneratedResponseVariableRuntimeError {
    return {
      code: "invalid_generated_response_variable",
      message: `Generated response used undeclared variable ${variableId}.`,
      recoverable: false,
      variableId,
      allowedVariableIds,
    };
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

  private baseExecutionContext(context: TurnContext, step: StepDefinition): ActionExecutionContext {
    return { flow: context.flow, step, state: context.state, turn: context.turn };
  }

  private stepContext(context: TurnContext, step: StepDefinition): StepExecutionContext {
    return { ...this.baseExecutionContext(context, step), config: step.config, services: this.services() };
  }

  private inputContext(context: TurnContext, step: StepDefinition): InputProcessingContext {
    return this.baseExecutionContext(context, step);
  }

  private responseContext(context: TurnContext, step: StepDefinition): ResponseRenderingContext {
    return { ...this.baseExecutionContext(context, step), channel: context.conversation.channel };
  }

  private operationContext(context: TurnContext, step: StepDefinition): OperationExecutionContext {
    return { ...this.baseExecutionContext(context, step), services: this.services() };
  }

  private actionContext(context: TurnContext, step: StepDefinition): ActionExecutionContext {
    return this.baseExecutionContext(context, step);
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

  private normalizeExternalOperationResult(result: OperationResult): StepRunResult {
    return {
      status: result.status === "failed" ? "failed" : "completed",
      outcome: result.outcome,
      branch: result.branch,
      messages: result.messages,
      patches: result.variablePatches,
      events: result.events,
      fragments: [result.trace],
      error: result.error,
    };
  }
}

function runtimeErrorMetadata(error: RuntimeError): Record<string, unknown> {
  let metadata: Record<string, unknown>;
  switch (error.code) {
    case "missing_step_handler":
      metadata = { stepType: error.stepType };
      break;
    case "missing_operation_handler":
      metadata = { operationType: error.operationType };
      break;
    case "missing_action_handler":
      metadata = { actionKind: error.actionKind };
      break;
    case "missing_response_reference":
      metadata = { responseId: error.responseId };
      break;
    case "missing_action_reference":
      metadata = { actionId: error.actionId };
      break;
    case "missing_variable_reference":
      metadata = {
        variableId: error.variableId,
        ...(error.scope === undefined ? {} : { scope: error.scope }),
      };
      break;
    case "missing_flow_version":
      metadata = { flowVersionId: error.flowVersionId };
      break;
    case "missing_step_target":
      metadata = { stepId: error.stepId };
      break;
    case "missing_semantic_input_resolver":
      metadata = error.taskId === undefined ? {} : { taskId: error.taskId };
      break;
    case "missing_llm_response_generator":
      metadata = error.responseId === undefined ? {} : { responseId: error.responseId };
      break;
    case "missing_custom_operation_contract":
      metadata = { customOperationId: error.customOperationId };
      break;
    case "missing_custom_operation_handler":
      metadata = { customType: error.customType };
      break;
    case "invalid_semantic_outcome":
      metadata = { outcome: error.outcome, allowedOutcomes: error.allowedOutcomes };
      break;
    case "invalid_semantic_variable":
    case "invalid_generated_response_variable":
      metadata = { variableId: error.variableId, allowedVariableIds: error.allowedVariableIds };
      break;
    case "model_validation_failed":
      metadata = { issues: error.issues };
      break;
    case "unhandled_runtime_error":
      metadata = {};
      break;
    default:
      return operationalRuntimeErrorMetadata(error);
  }
  return error.details === undefined ? metadata : { ...metadata, details: error.details };
}

function operationalRuntimeErrorMetadata(error: OperationalRuntimeError): Record<string, unknown> {
  const metadata: Record<string, unknown> = { ...error };
  delete metadata.code;
  delete metadata.message;
  delete metadata.recoverable;
  return metadata;
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function matchesAlias(aliases: readonly string[], text: string): boolean {
  return aliases.includes(text);
}
