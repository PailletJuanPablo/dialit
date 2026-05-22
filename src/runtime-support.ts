import type {
    Conversation,
    ConversationEvent,
    ConversationEventRepository,
    ConversationId,
    ConversationRepository,
    ConversationState,
    ConversationStateRepository,
    CreateEventRequest,
    CreateTextMessageRequest,
    DecisionTrace,
    DecisionTraceRepository,
    EventFactory,
    FlowVersion,
    FlowVersionId,
    FlowVersionRepository,
    IdGenerator,
    ISODateString,
    MissingVariableReferenceRuntimeError,
    OutboundMessage,
    RuntimeClock,
    TraceBuildInput,
    TurnId,
    VariableHistoryEntry,
    VariableId,
    VariablePatch,
    VariableScope,
    VariableValue,
    VariableValueSource,
} from "./types.js";

const defaultVariableScope: VariableScope = "conversation";

type FlatVariables = Record<VariableId, VariableValue> & {
    history?: Record<VariableId, VariableHistoryEntry[]>;
};

type RuntimeVariableState = Omit<ConversationState, "variables" | "variableHistory"> & {
    variables: ConversationState["variables"] | FlatVariables;
    variableHistory?: ConversationState["variableHistory"] | Record<VariableId, VariableHistoryEntry[]>;
};

export type VariableLookupResult =
    | { ok: true; value: VariableValue }
    | { ok: false; error: MissingVariableReferenceRuntimeError };

export function clone<T>(value: T): T {
    return structuredClone(value);
}

export class InMemoryFlowVersionRepository implements FlowVersionRepository {
    private readonly versions = new Map<FlowVersionId, FlowVersion>();

    async getById(flowVersionId: FlowVersionId): Promise<FlowVersion | undefined> {
        const version = this.versions.get(flowVersionId);
        return version === undefined ? undefined : clone(version);
    }

    async save(version: FlowVersion): Promise<void> {
        this.versions.set(version.flowVersionId, clone(version));
    }
}

export class InMemoryConversationRepository implements ConversationRepository {
    private readonly conversations = new Map<ConversationId, Conversation>();

    async getById(conversationId: ConversationId): Promise<Conversation | undefined> {
        const conversation = this.conversations.get(conversationId);
        return conversation === undefined ? undefined : clone(conversation);
    }

    async save(conversation: Conversation): Promise<void> {
        this.conversations.set(conversation.conversationId, clone(conversation));
    }
}

export class InMemoryConversationStateRepository implements ConversationStateRepository {
    private readonly states = new Map<ConversationId, ConversationState>();

    async getByConversationId(conversationId: ConversationId): Promise<ConversationState | undefined> {
        const state = this.states.get(conversationId);
        return state === undefined ? undefined : clone(state);
    }

    async save(state: ConversationState): Promise<void> {
        this.states.set(state.conversationId, clone(state));
    }
}

export class InMemoryConversationEventRepository implements ConversationEventRepository {
    private readonly events: ConversationEvent[] = [];

    async append(events: ConversationEvent[]): Promise<void> {
        this.events.push(...events.map((event) => clone(event)));
    }

    async listByConversationId(conversationId: ConversationId): Promise<ConversationEvent[]> {
        return this.events
            .filter((event) => event.conversationId === conversationId)
            .map((event) => clone(event));
    }
}

export class InMemoryDecisionTraceRepository implements DecisionTraceRepository {
    private readonly traces: DecisionTrace[] = [];

    async save(trace: DecisionTrace): Promise<void> {
        this.traces.push(clone(trace));
    }

    async listByConversationId(conversationId: ConversationId): Promise<DecisionTrace[]> {
        return this.traces
            .filter((trace) => trace.conversationId === conversationId)
            .map((trace) => clone(trace));
    }
}

export function createDefaultClock(): RuntimeClock {
    return {
        now(): ISODateString {
            return new Date().toISOString();
        },
    };
}

export function createDefaultIdGenerator(): IdGenerator {
    let nextId = 1;
    const generate = (prefix: string): string => `${prefix}-${nextId++}`;

    return {
        newFlowVersionId: () => generate("flow-version"),
        newConversationId: () => generate("conversation"),
        newTurnId: () => generate("turn"),
        newMessageId: () => generate("message"),
        newEventId: () => generate("event"),
        newTraceId: () => generate("trace"),
        newCandidateId: () => generate("candidate"),
        newExecutionFrameId: () => generate("frame"),
        newHandoffId: () => generate("handoff"),
    };
}

export function createEventFactory(
    clock: RuntimeClock = createDefaultClock(),
    idGenerator: IdGenerator = createDefaultIdGenerator()
): EventFactory {
    return {
        createEvent(request: CreateEventRequest): ConversationEvent {
            return createEvent(request, clock, idGenerator);
        },
    };
}

export function createEvent(
    request: CreateEventRequest,
    clock: RuntimeClock = createDefaultClock(),
    idGenerator: IdGenerator = createDefaultIdGenerator()
): ConversationEvent {
    const event: ConversationEvent = {
        eventId: idGenerator.newEventId(),
        conversationId: request.conversationId,
        flowVersionId: request.flowVersionId,
        type: request.type,
        createdAt: clock.now(),
    };

    if (request.turnId !== undefined) {
        event.turnId = request.turnId;
    }
    if (request.stepId !== undefined) {
        event.stepId = request.stepId;
    }
    if (request.payload !== undefined) {
        event.payload = clone(request.payload);
    }
    if (request.metadata !== undefined) {
        event.metadata = clone(request.metadata);
    }

    return event;
}

export function createTextMessage(
    request: CreateTextMessageRequest,
    clock: RuntimeClock = createDefaultClock(),
    idGenerator: IdGenerator = createDefaultIdGenerator()
): OutboundMessage {
    const message: OutboundMessage = {
        messageId: idGenerator.newMessageId(),
        conversationId: request.conversationId,
        turnId: request.turnId,
        content: {
            type: "text",
            text: request.text,
        },
        createdAt: clock.now(),
    };

    if (request.channel !== undefined) {
        message.channel = request.channel;
    }
    if (request.responseId !== undefined) {
        message.responseId = request.responseId;
    }
    if (request.metadata !== undefined) {
        message.metadata = clone(request.metadata);
    }

    return message;
}

export function createTrace(
    input: TraceBuildInput,
    clock: RuntimeClock = createDefaultClock(),
    idGenerator: IdGenerator = createDefaultIdGenerator()
): DecisionTrace {
    const trace: DecisionTrace = {
        traceId: idGenerator.newTraceId(),
        conversationId: input.conversationId,
        turnId: input.turnId,
        flowVersionId: input.flowVersionId,
        fragments: clone(input.fragments),
        events: clone(input.events),
        messages: clone(input.messages),
        variablePatches: clone(input.variablePatches),
        createdAt: clock.now(),
    };

    if (input.initialStepId !== undefined) {
        trace.initialStepId = input.initialStepId;
    }
    if (input.finalStepId !== undefined) {
        trace.finalStepId = input.finalStepId;
    }
    if (input.userInput !== undefined) {
        trace.userInput = clone(input.userInput);
    }
    if (input.variableReads !== undefined) {
        trace.variableReads = clone(input.variableReads);
    }
    if (input.operationResults !== undefined) {
        trace.operationResults = clone(input.operationResults);
    }
    if (input.actionResults !== undefined) {
        trace.actionResults = clone(input.actionResults);
    }
    if (input.conditionResults !== undefined) {
        trace.conditionResults = clone(input.conditionResults);
    }
    if (input.flowCalls !== undefined) {
        trace.flowCalls = clone(input.flowCalls);
    }
    if (input.handoffs !== undefined) {
        trace.handoffs = clone(input.handoffs);
    }
    if (input.llmUsage !== undefined) {
        trace.llmUsage = clone(input.llmUsage);
    }

    return trace;
}

export function createMissingVariableError(
    variableId: VariableId,
    scope: VariableScope = defaultVariableScope
): MissingVariableReferenceRuntimeError {
    return {
        code: "missing_variable_reference",
        message: `Missing variable: ${variableId}`,
        recoverable: false,
        variableId,
        scope,
    };
}

export function getVariable(
    state: RuntimeVariableState,
    variableId: VariableId,
    scope: VariableScope = defaultVariableScope
): VariableLookupResult {
    const value = readVariable(state, variableId, scope);
    if (value === undefined) {
        return { ok: false, error: createMissingVariableError(variableId, scope) };
    }

    return { ok: true, value: clone(value) };
}

export function requireVariable(
    state: RuntimeVariableState,
    variableId: VariableId,
    scope: VariableScope = defaultVariableScope
): VariableValue {
    const result = getVariable(state, variableId, scope);
    if (!result.ok) {
        throw result.error;
    }

    return result.value;
}

export function setVariable(
    state: RuntimeVariableState,
    variableId: VariableId,
    value: unknown,
    source: VariableValueSource,
    options: {
        scope?: VariableScope;
        metadata?: Record<string, unknown>;
        clock?: RuntimeClock;
        turnId?: TurnId;
    } = {}
): VariablePatch {
    const scope = options.scope ?? defaultVariableScope;
    const clock = options.clock ?? createDefaultClock();
    const changedAt = clock.now();
    const previous = readVariable(state, variableId, scope);
    const nextValue: VariableValue = {
        variableId,
        scope,
        value,
        source,
        updatedAt: changedAt,
        valid: true,
    };

    if (options.metadata !== undefined) {
        nextValue.metadata = clone(options.metadata);
    }

    writeVariable(state, nextValue);
    appendVariableHistory(state, {
        variableId,
        scope,
        previousValue: previous?.value,
        nextValue: value,
        patchType: "set",
        source,
        conversationId: state.conversationId,
        flowVersionId: state.flowVersionId,
        changedAt,
        ...(options.turnId === undefined ? {} : { turnId: options.turnId }),
        ...(options.metadata === undefined ? {} : { metadata: clone(options.metadata) }),
    });

    return {
        type: "set",
        variableId,
        scope,
        source,
        value,
        ...(options.metadata === undefined ? {} : { metadata: clone(options.metadata) }),
    };
}

export function unsetVariable(
    state: RuntimeVariableState,
    variableId: VariableId,
    source: VariableValueSource,
    options: {
        scope?: VariableScope;
        metadata?: Record<string, unknown>;
        clock?: RuntimeClock;
        turnId?: TurnId;
    } = {}
): VariablePatch {
    const scope = options.scope ?? defaultVariableScope;
    const clock = options.clock ?? createDefaultClock();
    const previous = readVariable(state, variableId, scope);

    if (previous === undefined) {
        throw createMissingVariableError(variableId, scope);
    }

    deleteVariable(state, variableId, scope);
    appendVariableHistory(state, {
        variableId,
        scope,
        previousValue: previous.value,
        patchType: "unset",
        source,
        conversationId: state.conversationId,
        flowVersionId: state.flowVersionId,
        changedAt: clock.now(),
        ...(options.turnId === undefined ? {} : { turnId: options.turnId }),
        ...(options.metadata === undefined ? {} : { metadata: clone(options.metadata) }),
    });

    return {
        type: "unset",
        variableId,
        scope,
        source,
        ...(options.metadata === undefined ? {} : { metadata: clone(options.metadata) }),
    };
}

export function invalidateVariable(
    state: RuntimeVariableState,
    variableId: VariableId,
    source: VariableValueSource,
    reason?: string,
    options: {
        scope?: VariableScope;
        metadata?: Record<string, unknown>;
        clock?: RuntimeClock;
        turnId?: TurnId;
    } = {}
): VariablePatch {
    const scope = options.scope ?? defaultVariableScope;
    const clock = options.clock ?? createDefaultClock();
    const changedAt = clock.now();
    const previous = readVariable(state, variableId, scope);

    if (previous === undefined) {
        throw createMissingVariableError(variableId, scope);
    }

    const nextValue: VariableValue = {
        ...clone(previous),
        valid: false,
        invalidatedAt: changedAt,
    };

    if (reason !== undefined) {
        nextValue.invalidationReason = reason;
    }

    writeVariable(state, nextValue);
    appendVariableHistory(state, {
        variableId,
        scope,
        previousValue: previous.value,
        nextValue: previous.value,
        patchType: "invalidate",
        source,
        conversationId: state.conversationId,
        flowVersionId: state.flowVersionId,
        changedAt,
        ...(options.turnId === undefined ? {} : { turnId: options.turnId }),
        ...(options.metadata === undefined ? {} : { metadata: clone(options.metadata) }),
    });

    return {
        type: "invalidate",
        variableId,
        scope,
        source,
        ...(reason === undefined ? {} : { reason }),
        ...(options.metadata === undefined ? {} : { metadata: clone(options.metadata) }),
    };
}

function readVariable(
    state: RuntimeVariableState,
    variableId: VariableId,
    scope: VariableScope
): VariableValue | undefined {
    if (isFlatVariables(state.variables)) {
        return state.variables[variableId];
    }

    return state.variables[scope]?.[variableId];
}

function writeVariable(state: RuntimeVariableState, value: VariableValue): void {
    if (isFlatVariables(state.variables)) {
        state.variables[value.variableId] = clone(value);
        return;
    }

    state.variables[value.scope][value.variableId] = clone(value);
}

function deleteVariable(
    state: RuntimeVariableState,
    variableId: VariableId,
    scope: VariableScope
): void {
    if (isFlatVariables(state.variables)) {
        delete state.variables[variableId];
        return;
    }

    delete state.variables[scope][variableId];
}

function appendVariableHistory(state: RuntimeVariableState, entry: VariableHistoryEntry): void {
    const clonedEntry = clone(entry);

    if (state.variableHistory === undefined) {
        state.variableHistory = {};
    }

    const variableHistory = state.variableHistory;

    if (Array.isArray(variableHistory)) {
        variableHistory.push(clonedEntry);
    } else {
        const entries = variableHistory[entry.variableId] ?? [];
        entries.push(clonedEntry);
        variableHistory[entry.variableId] = entries;
    }

    if (isFlatVariables(state.variables)) {
        const history = state.variables.history ?? {};
        const entries = history[entry.variableId] ?? [];
        entries.push(clone(entry));
        history[entry.variableId] = entries;
        state.variables.history = history;
    }
}

function isFlatVariables(variables: RuntimeVariableState["variables"]): variables is FlatVariables {
    return !("conversation" in variables);
}
