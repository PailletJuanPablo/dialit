/**
 * conversation-engine.v0.1.types.ts
 *
 * Public TypeScript contracts for a lightweight conversational engine.
 *
 * Design goals:
 * - Keep the runtime simple and traceable.
 * - Model conversational states as typed steps.
 * - Keep actions as reusable operations, not mandatory step types.
 * - Keep variables global and simple for v0.1.
 * - Keep conditional routing explicit through ConditionStep only.
 * - Allow menu options, step routes and action results to execute branches.
 * - Allow LLM usage in two isolated roles:
 *   1. Semantic input interpretation.
 *   2. Dynamic response generation.
 *
 * This file is intentionally implementation-free.
 */

/* ============================================================
 * 1. Primitive IDs and shared base types
 * ============================================================ */

export type EntityId = string;

export type FlowId = EntityId;
export type FlowVersionId = EntityId;
export type StepId = EntityId;
export type RouteId = EntityId;
export type BranchId = EntityId;
export type OptionId = EntityId;
export type VariableId = EntityId;
export type ActionId = EntityId;
export type ResponseId = EntityId;
export type OperationId = EntityId;
export type EventId = EntityId;
export type ConversationId = EntityId;
export type TurnId = EntityId;
export type MessageId = EntityId;
export type TraceId = EntityId;
export type ValidationIssueId = EntityId;
export type CandidateId = EntityId;
export type TaskId = EntityId;
export type AttachmentId = EntityId;

export type ISODateString = string;

export type JsonPrimitive = string | number | boolean | null;

export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];

export interface JsonObject {
    [key: string]: JsonValue;
}

export interface Metadata {
    [key: string]: unknown;
}

export interface LabelledEntity {
    label?: string;
    description?: string;
    metadata?: Metadata;
}

export type ConversationStatus =
    | "active"
    | "waiting_input"
    | "completed"
    | "cancelled"
    | "failed"
    | "handoff";

export type FlowVersionStatus =
    | "draft"
    | "published"
    | "deprecated"
    | "archived";

export type StepOutcome = string;

/* ============================================================
 * 2. Flow definition and versioning
 * ============================================================ */

export interface ConversationFlowDefinition extends LabelledEntity {
    flowId: FlowId;
    startStepId: StepId;
    variables: VariableDefinition[];
    steps: StepDefinition[];
    actions?: ActionDefinition[];
    responses?: ResponseDefinition[];
    settings?: FlowSettings;
}

export interface FlowSettings {
    defaultLocale?: string;
    defaultChannel?: string;
    maxTurns?: number;
    maxStepExecutionsPerTurn?: number;
    fallbackStepId?: StepId;
    errorStepId?: StepId;
}

export interface FlowVersion extends LabelledEntity {
    flowVersionId: FlowVersionId;
    flowId: FlowId;
    version: string;
    status: FlowVersionStatus;
    definition: ConversationFlowDefinition;
    schemaVersion: string;
    checksum?: string;
    createdAt: ISODateString;
    createdBy?: string;
    publishedAt?: ISODateString;
    publishedBy?: string;
}

/* ============================================================
 * 3. Global variables
 * ============================================================ */

export type VariableType =
    | "string"
    | "number"
    | "integer"
    | "boolean"
    | "date"
    | "datetime"
    | "email"
    | "phone"
    | "enum"
    | "object"
    | "array"
    | "file"
    | "json";

export interface VariableDefinition extends LabelledEntity {
    variableId: VariableId;
    type: VariableType;
    required?: boolean;
    sensitive?: boolean;
    defaultValue?: unknown;
    enumValues?: string[];
    validators?: ValidatorDefinition[];
}

export type VariableValueSource =
    | "user_input"
    | "menu_selection"
    | "attachment"
    | "action_result"
    | "operation"
    | "semantic_input_task"
    | "llm_response_generation"
    | "system";

export interface VariableValue {
    variableId: VariableId;
    value: unknown;
    source?: VariableValueSource;
    updatedAt?: ISODateString;
    metadata?: Metadata;
}

export type VariablePatchType = "set" | "unset";

export interface VariablePatch {
    type: VariablePatchType;
    variableId: VariableId;
    value?: unknown;
    source: VariableValueSource;
    metadata?: Metadata;
}

export interface VariableStoreSnapshot {
    values: Record<VariableId, VariableValue>;
}

/* ============================================================
 * 4. Value expressions
 * ============================================================ */

export type ValueExpression =
    | LiteralValueExpression
    | VariableValueExpression
    | TemplateValueExpression
    | ContextValueExpression;

export interface LiteralValueExpression {
    type: "literal";
    value: unknown;
}

export interface VariableValueExpression {
    type: "variable";
    variableId: VariableId;
}

export interface TemplateValueExpression {
    type: "template";
    template: string;
    variableIds?: VariableId[];
}

export interface ContextValueExpression {
    type: "context";
    path: string;
}

/* ============================================================
 * 5. Response plans and response definitions
 * ============================================================ */

export interface ResponseDefinition extends LabelledEntity {
    responseId: ResponseId;
    plan: ResponsePlan;
}

export type ResponsePlan =
    | StaticResponsePlan
    | TemplateResponsePlan
    | GeneratedResponsePlan
    | ResponseReferencePlan;

export interface StaticResponsePlan {
    mode: "static";
    text: string;
    channelPayload?: JsonObject;
}

export interface TemplateResponsePlan {
    mode: "template";
    template: string;
    variableIds?: VariableId[];
    channelPayload?: JsonObject;
}

export interface GeneratedResponsePlan {
    mode: "generated";
    goal: string;
    allowedVariableIds: VariableId[];
    constraints?: string[];
    style?: ResponseStyle;
    maxLength?: number;
    fallbackText: string;
}

export interface ResponseReferencePlan {
    mode: "reference";
    responseId: ResponseId;
}

export interface ResponseStyle {
    tone?: "neutral" | "friendly" | "formal" | "concise";
    language?: string;
    persona?: string;
}

/* ============================================================
 * 6. Action definitions and action results
 * ============================================================ */

export type ActionKind =
    | "local"
    | "http"
    | "queue"
    | "tool"
    | "webhook"
    | string;

export interface ActionDefinition extends LabelledEntity {
    actionId: ActionId;
    kind: ActionKind;
    inputSchema?: JsonObject;
    outputSchema?: JsonObject;
    resultOutcomes?: StepOutcome[];
    errorCodes?: string[];
    sideEffect?: boolean;
    timeoutMs?: number;
    config?: JsonObject;
}

export type ActionResultStatus =
    | "success"
    | "error"
    | "timeout"
    | "cancelled";

export interface ActionResult {
    status: ActionResultStatus;
    outcome?: StepOutcome;
    outputs?: Record<string, unknown>;
    errorCode?: string;
    errorMessage?: string;
    raw?: unknown;
    metadata?: Metadata;
}

/* ============================================================
 * 7. Condition expressions
 *
 * Conditions are intentionally centralized in ConditionStep.
 * Routes do not accept arbitrary conditions in v0.1.
 * ============================================================ */

export type ConditionExpression =
    | EqualsCondition
    | NotEqualsCondition
    | ExistsCondition
    | NotExistsCondition
    | GreaterThanCondition
    | LessThanCondition
    | IncludesCondition
    | MatchesRegexCondition
    | AndCondition
    | OrCondition
    | NotCondition;

export interface EqualsCondition {
    type: "equals";
    left: ValueExpression;
    right: ValueExpression;
}

export interface NotEqualsCondition {
    type: "not_equals";
    left: ValueExpression;
    right: ValueExpression;
}

export interface ExistsCondition {
    type: "exists";
    variableId: VariableId;
}

export interface NotExistsCondition {
    type: "not_exists";
    variableId: VariableId;
}

export interface GreaterThanCondition {
    type: "greater_than";
    left: ValueExpression;
    right: ValueExpression;
}

export interface LessThanCondition {
    type: "less_than";
    left: ValueExpression;
    right: ValueExpression;
}

export interface IncludesCondition {
    type: "includes";
    collection: ValueExpression;
    value: ValueExpression;
}

export interface MatchesRegexCondition {
    type: "matches_regex";
    value: ValueExpression;
    pattern: string;
    flags?: string;
}

export interface AndCondition {
    type: "and";
    conditions: ConditionExpression[];
}

export interface OrCondition {
    type: "or";
    conditions: ConditionExpression[];
}

export interface NotCondition {
    type: "not";
    condition: ConditionExpression;
}

export interface ConditionEvaluationResult {
    matched: boolean;
    reason?: string;
    metadata?: Metadata;
}

/* ============================================================
 * 8. Step definitions
 * ============================================================ */

export type BuiltInStepType =
    | "message"
    | "menu"
    | "input"
    | "attachment"
    | "condition"
    | "end"
    | "custom";

export type StepType = BuiltInStepType | string;

export interface StepConfig {
    [key: string]: unknown;
}

export interface BaseStepDefinition<TType extends StepType, TConfig extends StepConfig>
    extends LabelledEntity {
    stepId: StepId;
    type: TType;
    config: TConfig;
    onEnter?: StepOperation[];
    onExit?: StepOperation[];
    routes?: StepRoute[];
}

export type StepDefinition =
    | MessageStepDefinition
    | MenuStepDefinition
    | InputStepDefinition
    | AttachmentStepDefinition
    | ConditionStepDefinition
    | EndStepDefinition
    | CustomStepDefinition;

export interface MessageStepDefinition
    extends BaseStepDefinition<"message", MessageStepConfig> { }

export interface MessageStepConfig extends StepConfig {
    messages: ResponsePlan[];
    autoAdvance?: boolean;
}

export interface MenuStepDefinition
    extends BaseStepDefinition<"menu", MenuStepConfig> { }

export interface MenuStepConfig extends StepConfig {
    prompt: ResponsePlan;
    options: MenuOption[];
    selection: MenuSelectionPolicy;
    invalidSelection?: InvalidInputBehavior;
    unknownSelection?: UnknownInputBehavior;
}

export interface MenuOption extends LabelledEntity {
    optionId: OptionId;
    aliases?: string[];
    value?: unknown;
    branch: StepBranch;
}

export interface MenuSelectionPolicy {
    allowButtons?: boolean;
    allowNumbers?: boolean;
    allowExactText?: boolean;
    allowAliases?: boolean;
    allowFreeText?: boolean;
    semanticSelection?: MenuSemanticSelection;
}

export interface MenuSemanticSelection {
    enabled: boolean;
    threshold: number;
    unknownOutcome?: StepOutcome;
}

export interface InputStepDefinition
    extends BaseStepDefinition<"input", InputStepConfig> { }

export interface InputStepConfig extends StepConfig {
    prompt?: ResponsePlan;
    input: InputContract;
}

export interface AttachmentStepDefinition
    extends BaseStepDefinition<"attachment", AttachmentStepConfig> { }

export interface AttachmentStepConfig extends StepConfig {
    prompt?: ResponsePlan;
    targetVariableId: VariableId;
    rules: AttachmentRules;
    invalidAttachment?: InvalidInputBehavior;
}

export interface ConditionStepDefinition
    extends BaseStepDefinition<"condition", ConditionStepConfig> { }

export interface ConditionStepConfig extends StepConfig {
    branches: ConditionBranch[];
    defaultBranch?: StepBranch;
}

export interface ConditionBranch extends LabelledEntity {
    branchId: BranchId;
    when: ConditionExpression;
    outcome: StepOutcome;
    branch: StepBranch;
}

export interface EndStepDefinition
    extends BaseStepDefinition<"end", EndStepConfig> { }

export interface EndStepConfig extends StepConfig {
    status: ConversationStatus;
    finalMessage?: ResponsePlan;
}

export interface CustomStepDefinition
    extends BaseStepDefinition<"custom", CustomStepConfig> { }

export interface CustomStepConfig extends StepConfig {
    customType: string;
    payload: JsonObject;
}

/* ============================================================
 * 9. Branches, routes, and targets
 * ============================================================ */

export interface StepBranch extends LabelledEntity {
    branchId?: BranchId;
    operations?: StepOperation[];
    target?: StepTarget;
}

export interface StepRoute extends LabelledEntity {
    routeId: RouteId;
    match: RouteMatch;
    branch: StepBranch;
    priority?: number;
}

export type RouteMatch = OutcomeRouteMatch | AlwaysRouteMatch;

export interface OutcomeRouteMatch {
    type: "outcome";
    outcome: StepOutcome;
}

export interface AlwaysRouteMatch {
    type: "always";
}

export type StepTarget =
    | GoToStepTarget
    | StayOnStepTarget
    | EndConversationTarget
    | NoStepTarget;

export interface GoToStepTarget {
    type: "step";
    stepId: StepId;
}

export interface StayOnStepTarget {
    type: "stay";
}

export interface EndConversationTarget {
    type: "end";
    status: ConversationStatus;
}

export interface NoStepTarget {
    type: "none";
}

/* ============================================================
 * 10. Operations
 * ============================================================ */

export type StepOperation =
    | SendMessageOperation
    | SetVariableOperation
    | UnsetVariableOperation
    | RunActionOperation
    | EmitEventOperation;

export interface BaseOperation<TType extends string> extends LabelledEntity {
    operationId?: OperationId;
    type: TType;
}

export interface SendMessageOperation extends BaseOperation<"send_message"> {
    message: ResponsePlan;
}

export interface SetVariableOperation extends BaseOperation<"set_variable"> {
    variableId: VariableId;
    value: ValueExpression;
}

export interface UnsetVariableOperation extends BaseOperation<"unset_variable"> {
    variableId: VariableId;
}

export interface RunActionOperation extends BaseOperation<"run_action"> {
    actionId: ActionId;
    inputMapping?: Record<string, ValueExpression>;
    outputMapping?: Record<string, VariableId>;
    resultVariableId?: VariableId;
    onResult?: ActionResultBranch[];
}

export interface ActionResultBranch extends LabelledEntity {
    match: ActionResultMatch;
    branch: StepBranch;
}

export type ActionResultMatch =
    | ActionStatusMatch
    | ActionErrorCodeMatch
    | ActionOutcomeMatch;

export interface ActionStatusMatch {
    type: "status";
    status: ActionResultStatus;
}

export interface ActionErrorCodeMatch {
    type: "error_code";
    errorCode: string;
}

export interface ActionOutcomeMatch {
    type: "outcome";
    outcome: StepOutcome;
}

export interface EmitEventOperation extends BaseOperation<"emit_event"> {
    eventType: string;
    payload?: Record<string, ValueExpression>;
}

/* ============================================================
 * 11. Input contracts
 * ============================================================ */

export type InputType =
    | "text"
    | "choice"
    | "attachment"
    | "payload"
    | "event";

export interface InputContract {
    acceptedInputTypes: InputType[];
    bindings?: InputBinding[];
    globalCommands?: GlobalCommandPolicy;
    semanticTasks?: SemanticInputTask[];
    invalidBehavior?: InvalidInputBehavior;
    unknownBehavior?: UnknownInputBehavior;
}

export interface InputBinding {
    targetVariableId: VariableId;
    source: InputType;
    required?: boolean;
    normalizers?: NormalizerDefinition[];
    extractors?: ExtractorDefinition[];
    validators?: ValidatorDefinition[];
    saveRawInput?: boolean;
}

export interface GlobalCommandPolicy {
    allowCancel?: boolean;
    allowHelp?: boolean;
    allowBack?: boolean;
    allowHandoff?: boolean;
}

export type SemanticInputTaskMode =
    | "after_invalid_input"
    | "after_valid_capture";

export interface SemanticInputTask extends LabelledEntity {
    taskId?: TaskId;
    mode: SemanticInputTaskMode;
    allowedOutcomes: StepOutcome[];
    threshold: number;
    saveOutcomeToVariableId?: VariableId;
    allowedVariableIds?: VariableId[];
    promptHint?: string;
}

export interface InvalidInputBehavior {
    message?: ResponsePlan;
    target?: StepTarget;
    maxRetries?: number;
}

export interface UnknownInputBehavior {
    message?: ResponsePlan;
    target?: StepTarget;
}

export interface AttachmentRules {
    required?: boolean;
    allowedMimeTypes?: string[];
    allowedExtensions?: string[];
    maxFiles?: number;
    maxSizeMb?: number;
    validators?: ValidatorDefinition[];
}

/* ============================================================
 * 12. Normalizers, extractors, and validators
 * ============================================================ */

export interface NormalizerDefinition {
    type: string;
    options?: JsonObject;
}

export interface ExtractorDefinition {
    type: string;
    options?: JsonObject;
}

export interface ValidatorDefinition {
    type: string;
    options?: JsonObject;
    message?: ResponsePlan;
}

export interface ValidationResult {
    valid: boolean;
    reason?: string;
    normalizedValue?: unknown;
    errorCode?: string;
    metadata?: Metadata;
}

/* ============================================================
 * 13. User inputs
 * ============================================================ */

export type UserInput =
    | TextUserInput
    | ChoiceUserInput
    | AttachmentUserInput
    | PayloadUserInput
    | EventUserInput;

export interface BaseUserInput<TType extends InputType> {
    inputId: MessageId;
    type: TType;
    conversationId: ConversationId;
    turnId?: TurnId;
    channel?: string;
    receivedAt: ISODateString;
    metadata?: Metadata;
}

export interface TextUserInput extends BaseUserInput<"text"> {
    text: string;
}

export interface ChoiceUserInput extends BaseUserInput<"choice"> {
    optionId?: OptionId;
    label?: string;
    payload?: JsonObject;
}

export interface AttachmentUserInput extends BaseUserInput<"attachment"> {
    attachments: AttachmentInput[];
}

export interface AttachmentInput {
    attachmentId?: AttachmentId;
    filename: string;
    mimeType: string;
    sizeBytes: number;
    url?: string;
    metadata?: Metadata;
}

export interface PayloadUserInput extends BaseUserInput<"payload"> {
    payload: JsonObject;
}

export interface EventUserInput extends BaseUserInput<"event"> {
    eventType: string;
    payload?: JsonObject;
}

/* ============================================================
 * 14. Input resolution
 * ============================================================ */

export type CandidateType =
    | "provide_value"
    | "provide_many_values"
    | "select_option"
    | "semantic_outcome"
    | "global_command"
    | "unknown";

export interface CommandCandidate {
    candidateId: CandidateId;
    type: CandidateType;
    outcome?: StepOutcome;
    optionId?: OptionId;
    variablePatches?: VariablePatch[];
    source: string;
    confidence?: number;
    explanation?: string;
    metadata?: Metadata;
}

export interface InputResolutionResult {
    status: "resolved" | "invalid" | "unknown" | "ambiguous";
    candidates: CommandCandidate[];
    selectedCandidate?: CommandCandidate;
    variablePatches?: VariablePatch[];
    validationResults?: ValidationResult[];
    outcome?: StepOutcome;
    trace: TraceFragment;
}

/* ============================================================
 * 15. Runtime state
 * ============================================================ */

export interface Conversation {
    conversationId: ConversationId;
    flowVersionId: FlowVersionId;
    status: ConversationStatus;
    channel?: string;
    userId?: string;
    createdAt: ISODateString;
    updatedAt: ISODateString;
    metadata?: Metadata;
}

export interface ConversationState {
    conversationId: ConversationId;
    flowVersionId: FlowVersionId;
    status: ConversationStatus;
    currentStepId: StepId;
    variables: Record<VariableId, VariableValue>;
    pendingInput?: PendingInputState;
    lastUserInput?: UserInput;
    lastOutboundMessages?: OutboundMessage[];
    version: number;
    updatedAt: ISODateString;
}

export interface PendingInputState {
    stepId: StepId;
    inputContract?: InputContract;
    createdAt: ISODateString;
    retryCount?: number;
}

export interface Turn {
    turnId: TurnId;
    conversationId: ConversationId;
    userInput?: UserInput;
    status: "started" | "completed" | "failed";
    startedAt: ISODateString;
    completedAt?: ISODateString;
}

/* ============================================================
 * 16. Step execution contracts
 * ============================================================ */

export interface StepExecutionContext<TConfig extends StepConfig = StepConfig> {
    flow: FlowVersion;
    step: StepDefinition;
    config: TConfig;
    state: ConversationState;
    turn: Turn;
    userInput?: UserInput;
    services: RuntimeServices;
}

export interface StepResult {
    status: "completed" | "waiting_input" | "failed";
    outcome?: StepOutcome;
    branch?: StepBranch;
    messages?: OutboundMessage[];
    variablePatches?: VariablePatch[];
    events?: ConversationEvent[];
    waitState?: PendingInputState;
    error?: RuntimeError;
    trace: TraceFragment;
}

export interface StepHandler<TConfig extends StepConfig = StepConfig> {
    readonly stepType: StepType;
    validate(step: StepDefinition, context: StepValidationContext): ValidationIssue[];
    enter(context: StepExecutionContext<TConfig>): Promise<StepResult>;
    handleInput?(context: StepExecutionContext<TConfig>, input: UserInput): Promise<StepResult>;
}

export interface StepValidationContext {
    flow: ConversationFlowDefinition;
}

export type ValidationSeverity = "error" | "warning";

export interface ValidationIssue {
    issueId?: ValidationIssueId;
    severity: ValidationSeverity;
    code: string;
    message: string;
    entityId?: EntityId;
    metadata?: Metadata;
}

export interface StepHandlerRegistry {
    register(handler: StepHandler): void;
    getHandler(stepType: StepType): StepHandler;
    hasHandler(stepType: StepType): boolean;
}

/* ============================================================
 * 17. Operation execution contracts
 * ============================================================ */

export interface OperationExecutionContext {
    flow: FlowVersion;
    state: ConversationState;
    turn: Turn;
    step: StepDefinition;
    services: RuntimeServices;
}

export interface OperationResult {
    status: "completed" | "failed" | "skipped";
    outcome?: StepOutcome;
    branch?: StepBranch;
    messages?: OutboundMessage[];
    variablePatches?: VariablePatch[];
    events?: ConversationEvent[];
    error?: RuntimeError;
    trace: TraceFragment;
}

export interface OperationHandler<TOperation extends StepOperation = StepOperation> {
    readonly operationType: string;
    execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>;
}

export interface OperationRegistry {
    register(handler: OperationHandler): void;
    getHandler(operationType: string): OperationHandler;
    hasHandler(operationType: string): boolean;
}

export interface OperationExecutor {
    executeMany(operations: StepOperation[], context: OperationExecutionContext): Promise<OperationResult[]>;
}

/* ============================================================
 * 18. Outbound messages
 * ============================================================ */

export interface OutboundMessage {
    messageId: MessageId;
    conversationId: ConversationId;
    turnId: TurnId;
    channel?: string;
    content: OutboundMessageContent;
    responseId?: ResponseId;
    createdAt: ISODateString;
    metadata?: Metadata;
}

export type OutboundMessageContent =
    | TextOutboundContent
    | RichOutboundContent
    | CustomPayloadOutboundContent;

export interface TextOutboundContent {
    type: "text";
    text: string;
}

export interface RichOutboundContent {
    type: "rich";
    text?: string;
    buttons?: OutboundButton[];
    attachments?: AttachmentInput[];
    cards?: JsonObject[];
}

export interface CustomPayloadOutboundContent {
    type: "custom_payload";
    payload: JsonObject;
}

export interface OutboundButton {
    optionId: OptionId;
    label: string;
    payload?: JsonObject;
}

/* ============================================================
 * 19. Events
 * ============================================================ */

export type ConversationEventType =
    | "conversation_started"
    | "turn_started"
    | "input_received"
    | "step_entered"
    | "step_completed"
    | "step_failed"
    | "menu_option_selected"
    | "input_resolved"
    | "input_invalid"
    | "semantic_input_task_started"
    | "semantic_input_task_completed"
    | "llm_response_generation_started"
    | "llm_response_generation_completed"
    | "variable_set"
    | "variable_unset"
    | "operation_started"
    | "operation_completed"
    | "operation_failed"
    | "action_started"
    | "action_completed"
    | "action_failed"
    | "message_created"
    | "transition_taken"
    | "condition_evaluated"
    | "conversation_completed"
    | "conversation_cancelled"
    | "error_raised"
    | string;

export interface ConversationEvent {
    eventId: EventId;
    conversationId: ConversationId;
    turnId?: TurnId;
    flowVersionId: FlowVersionId;
    stepId?: StepId;
    type: ConversationEventType;
    payload?: JsonObject;
    createdAt: ISODateString;
    metadata?: Metadata;
}

/* ============================================================
 * 20. Tracing
 * ============================================================ */

export interface TraceFragment {
    source: string;
    message?: string;
    data?: JsonObject;
    startedAt?: ISODateString;
    completedAt?: ISODateString;
}

export interface DecisionTrace {
    traceId: TraceId;
    conversationId: ConversationId;
    turnId: TurnId;
    flowVersionId: FlowVersionId;
    initialStepId?: StepId;
    finalStepId?: StepId;
    userInput?: UserInput;
    fragments: TraceFragment[];
    events: ConversationEvent[];
    messages: OutboundMessage[];
    variablePatches: VariablePatch[];
    llmUsage?: LlmUsageRecord[];
    createdAt: ISODateString;
}

export interface LlmUsageRecord {
    purpose: "input_resolution" | "response_generation";
    provider?: string;
    model?: string;
    promptSummary?: string;
    inputTokens?: number;
    outputTokens?: number;
    latencyMs?: number;
    success: boolean;
    metadata?: Metadata;
}

/* ============================================================
 * 21. Runtime errors
 * ============================================================ */

export interface RuntimeError {
    code: string;
    message: string;
    recoverable: boolean;
    details?: JsonObject;
}

/* ============================================================
 * 22. Runtime services and plugin contracts
 * ============================================================ */

export interface RuntimeServices {
    stepRegistry: StepHandlerRegistry;
    operationExecutor: OperationExecutor;
    inputProcessor: InputProcessor;
    responseRenderer: ResponseRenderer;
    actionExecutor: ActionExecutor;
    conditionEvaluator: ConditionEvaluator;
    transitionResolver: TransitionResolver;
    stateReducer: StateReducer;
    traceBuilder: TraceBuilder;
}

export interface InputProcessor {
    process(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<InputResolutionResult>;
}

export interface InputProcessingContext {
    flow: FlowVersion;
    step: StepDefinition;
    state: ConversationState;
    turn: Turn;
}

export interface Resolver {
    readonly resolverType: string;
    canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean;
    resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>;
}

export interface ResolverRegistry {
    register(resolver: Resolver): void;
    list(): Resolver[];
}

export interface Validator {
    readonly validatorType: string;
    validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>;
}

export interface ValidatorRegistry {
    register(validator: Validator): void;
    getValidator(validatorType: string): Validator;
    hasValidator(validatorType: string): boolean;
}

export interface ValidationContext {
    flow: FlowVersion;
    step: StepDefinition;
    state: ConversationState;
    turn: Turn;
    variableId?: VariableId;
}

export interface SemanticInputResolver {
    resolve(input: UserInput, task: SemanticInputTask, context: InputProcessingContext): Promise<CommandCandidate[]>;
}

export interface ResponseRenderer {
    render(plan: ResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>;
}

export interface ResponseRenderingContext {
    flow: FlowVersion;
    step: StepDefinition;
    state: ConversationState;
    turn: Turn;
    channel?: string;
}

export interface LlmResponseGenerator {
    generate(plan: GeneratedResponsePlan, context: ResponseRenderingContext): Promise<string>;
}

export interface ActionExecutor {
    execute(action: ActionDefinition, input: Record<string, unknown>, context: ActionExecutionContext): Promise<ActionResult>;
}

export interface ActionExecutionContext {
    flow: FlowVersion;
    step: StepDefinition;
    state: ConversationState;
    turn: Turn;
}

export interface ActionHandler {
    readonly actionKind: ActionKind;
    execute(action: ActionDefinition, input: Record<string, unknown>, context: ActionExecutionContext): Promise<ActionResult>;
}

export interface ActionHandlerRegistry {
    register(handler: ActionHandler): void;
    getHandler(actionKind: ActionKind): ActionHandler;
    hasHandler(actionKind: ActionKind): boolean;
}

export interface ConditionEvaluator {
    evaluate(condition: ConditionExpression, context: ConditionEvaluationContext): Promise<ConditionEvaluationResult>;
}

export interface ConditionEvaluationContext {
    flow: FlowVersion;
    step: ConditionStepDefinition;
    state: ConversationState;
    turn?: Turn;
}

export interface TransitionResolver {
    resolveFromStepResult(step: StepDefinition, result: StepResult, context: TransitionResolutionContext): Promise<StepBranch | undefined>;
    resolveFromOutcome(step: StepDefinition, outcome: StepOutcome, context: TransitionResolutionContext): Promise<StepBranch | undefined>;
}

export interface TransitionResolutionContext {
    flow: FlowVersion;
    state: ConversationState;
    turn: Turn;
}

export interface StateReducer {
    apply(state: ConversationState, changes: StateChangeSet): ConversationState;
}

export interface StateChangeSet {
    events?: ConversationEvent[];
    variablePatches?: VariablePatch[];
    nextStepId?: StepId;
    status?: ConversationStatus;
    pendingInput?: PendingInputState;
    clearPendingInput?: boolean;
}

export interface TraceBuilder {
    build(input: TraceBuildInput): DecisionTrace;
}

export interface TraceBuildInput {
    conversationId: ConversationId;
    turnId: TurnId;
    flowVersionId: FlowVersionId;
    initialStepId?: StepId;
    finalStepId?: StepId;
    userInput?: UserInput;
    fragments: TraceFragment[];
    events: ConversationEvent[];
    messages: OutboundMessage[];
    variablePatches: VariablePatch[];
    llmUsage?: LlmUsageRecord[];
}

/* ============================================================
 * 23. Built-in step handler contracts
 * ============================================================ */

export interface MessageStepHandler extends StepHandler<MessageStepConfig> {
    readonly stepType: "message";
}

export interface MenuStepHandler extends StepHandler<MenuStepConfig> {
    readonly stepType: "menu";
}

export interface InputStepHandler extends StepHandler<InputStepConfig> {
    readonly stepType: "input";
}

export interface AttachmentStepHandler extends StepHandler<AttachmentStepConfig> {
    readonly stepType: "attachment";
}

export interface ConditionStepHandler extends StepHandler<ConditionStepConfig> {
    readonly stepType: "condition";
}

export interface EndStepHandler extends StepHandler<EndStepConfig> {
    readonly stepType: "end";
}

/* ============================================================
 * 24. Built-in operation handler contracts
 * ============================================================ */

export interface SendMessageOperationHandler extends OperationHandler<SendMessageOperation> {
    readonly operationType: "send_message";
}

export interface SetVariableOperationHandler extends OperationHandler<SetVariableOperation> {
    readonly operationType: "set_variable";
}

export interface UnsetVariableOperationHandler extends OperationHandler<UnsetVariableOperation> {
    readonly operationType: "unset_variable";
}

export interface RunActionOperationHandler extends OperationHandler<RunActionOperation> {
    readonly operationType: "run_action";
}

export interface EmitEventOperationHandler extends OperationHandler<EmitEventOperation> {
    readonly operationType: "emit_event";
}

/* ============================================================
 * 25. Validation and flow inspection
 * ============================================================ */

export interface FlowValidator {
    validate(flow: ConversationFlowDefinition): ValidationIssue[];
}

export interface FlowInspector {
    getStep(flow: ConversationFlowDefinition, stepId: StepId): StepDefinition | undefined;
    getVariable(flow: ConversationFlowDefinition, variableId: VariableId): VariableDefinition | undefined;
    getAction(flow: ConversationFlowDefinition, actionId: ActionId): ActionDefinition | undefined;
    getResponse(flow: ConversationFlowDefinition, responseId: ResponseId): ResponseDefinition | undefined;
    listReachableSteps(flow: ConversationFlowDefinition): StepId[];
}

export interface FlowVersionFactory {
    createVersion(request: CreateFlowVersionRequest): Promise<FlowVersion>;
}

export interface CreateFlowVersionRequest {
    flow: ConversationFlowDefinition;
    version: string;
    schemaVersion: string;
    createdBy?: string;
}

/* ============================================================
 * 26. Persistence contracts
 * ============================================================ */

export interface FlowVersionRepository {
    getById(flowVersionId: FlowVersionId): Promise<FlowVersion | undefined>;
    save(version: FlowVersion): Promise<void>;
}

export interface ConversationRepository {
    getById(conversationId: ConversationId): Promise<Conversation | undefined>;
    save(conversation: Conversation): Promise<void>;
}

export interface ConversationStateRepository {
    getByConversationId(conversationId: ConversationId): Promise<ConversationState | undefined>;
    save(state: ConversationState): Promise<void>;
}

export interface ConversationEventRepository {
    append(events: ConversationEvent[]): Promise<void>;
    listByConversationId(conversationId: ConversationId): Promise<ConversationEvent[]>;
}

export interface DecisionTraceRepository {
    save(trace: DecisionTrace): Promise<void>;
    listByConversationId(conversationId: ConversationId): Promise<DecisionTrace[]>;
}

/* ============================================================
 * 27. Engine facade
 * ============================================================ */

export interface ConversationEngine {
    startConversation(request: StartConversationRequest): Promise<ProcessTurnResult>;
    processUserInput(request: ProcessUserInputRequest): Promise<ProcessTurnResult>;
}

export interface StartConversationRequest {
    conversationId: ConversationId;
    flowVersionId: FlowVersionId;
    channel?: string;
    userId?: string;
    initialVariables?: Record<VariableId, unknown>;
    metadata?: Metadata;
}

export interface ProcessUserInputRequest {
    conversationId: ConversationId;
    input: UserInput;
}

export interface ProcessTurnResult {
    conversation: Conversation;
    state: ConversationState;
    turn: Turn;
    events: ConversationEvent[];
    messages: OutboundMessage[];
    trace: DecisionTrace;
    error?: RuntimeError;
}

/* ============================================================
 * 28. Turn processing contract
 * ============================================================ */

export interface TurnProcessor {
    startConversation(request: StartConversationRequest): Promise<ProcessTurnResult>;
    processUserInput(request: ProcessUserInputRequest): Promise<ProcessTurnResult>;
}

export interface StepExecutor {
    enterStep(context: StepExecutionContext): Promise<StepResult>;
    handleStepInput(context: StepExecutionContext, input: UserInput): Promise<StepResult>;
}

export interface BranchExecutor {
    execute(branch: StepBranch, context: BranchExecutionContext): Promise<BranchExecutionResult>;
}

export interface BranchExecutionContext {
    flow: FlowVersion;
    state: ConversationState;
    turn: Turn;
    step: StepDefinition;
    services: RuntimeServices;
}

export interface BranchExecutionResult {
    messages: OutboundMessage[];
    variablePatches: VariablePatch[];
    events: ConversationEvent[];
    target?: StepTarget;
    trace: TraceFragment[];
    error?: RuntimeError;
}

/* ============================================================
 * 29. Runtime configuration
 * ============================================================ */

export interface ConversationEngineConfig {
    defaultChannel?: string;
    defaultLocale?: string;
    maxTurnsPerConversation?: number;
    maxStepExecutionsPerTurn?: number;
    enableDecisionTrace?: boolean;
}

export interface RuntimeContext {
    config: ConversationEngineConfig;
    clock: RuntimeClock;
    idGenerator: IdGenerator;
}

export interface RuntimeClock {
    now(): ISODateString;
}

export interface IdGenerator {
    newFlowVersionId(): FlowVersionId;
    newConversationId(): ConversationId;
    newTurnId(): TurnId;
    newMessageId(): MessageId;
    newEventId(): EventId;
    newTraceId(): TraceId;
    newCandidateId(): CandidateId;
}

/* ============================================================
 * 30. Variable store contract
 * ============================================================ */

export interface VariableStore {
    get(variableId: VariableId): VariableValue | undefined;
    set(variableId: VariableId, value: unknown, source: VariableValueSource, metadata?: Metadata): VariablePatch;
    unset(variableId: VariableId, source: VariableValueSource, metadata?: Metadata): VariablePatch;
    has(variableId: VariableId): boolean;
    snapshot(): VariableStoreSnapshot;
}

export interface VariableResolver {
    resolve(expression: ValueExpression, context: VariableResolutionContext): unknown;
}

export interface VariableResolutionContext {
    state: ConversationState;
    turn?: Turn;
    userInput?: UserInput;
    actionResult?: ActionResult;
    metadata?: Metadata;
}

/* ============================================================
 * 31. Flow lookup and definition registries
 * ============================================================ */

export interface FlowRegistry {
    getFlowVersion(flowVersionId: FlowVersionId): Promise<FlowVersion | undefined>;
    registerFlowVersion(flowVersion: FlowVersion): Promise<void>;
}

export interface DefinitionLookup {
    getStep(flow: FlowVersion, stepId: StepId): StepDefinition | undefined;
    getVariable(flow: FlowVersion, variableId: VariableId): VariableDefinition | undefined;
    getAction(flow: FlowVersion, actionId: ActionId): ActionDefinition | undefined;
    getResponse(flow: FlowVersion, responseId: ResponseId): ResponseDefinition | undefined;
}

/* ============================================================
 * 32. Flow validation reports
 * ============================================================ */

export interface FlowValidationReport {
    valid: boolean;
    issues: ValidationIssue[];
}

export interface StepValidationReport {
    stepId: StepId;
    valid: boolean;
    issues: ValidationIssue[];
}

export interface OperationValidationReport {
    operationId?: OperationId;
    valid: boolean;
    issues: ValidationIssue[];
}

/* ============================================================
 * 33. Built-in resolver marker contracts
 * ============================================================ */

export interface TextResolver extends Resolver {
    readonly resolverType: "text";
}

export interface ExactTextResolver extends Resolver {
    readonly resolverType: "exact_text";
}

export interface NumberResolver extends Resolver {
    readonly resolverType: "number";
}

export interface IntegerResolver extends Resolver {
    readonly resolverType: "integer";
}

export interface EmailResolver extends Resolver {
    readonly resolverType: "email";
}

export interface PhoneResolver extends Resolver {
    readonly resolverType: "phone";
}

export interface DateResolver extends Resolver {
    readonly resolverType: "date";
}

export interface RegexResolver extends Resolver {
    readonly resolverType: "regex";
}

export interface MenuOptionResolver extends Resolver {
    readonly resolverType: "menu_option";
}

export interface AttachmentResolver extends Resolver {
    readonly resolverType: "attachment";
}

export interface GlobalCommandResolver extends Resolver {
    readonly resolverType: "global_command";
}

/* ============================================================
 * 34. Built-in validator marker contracts
 * ============================================================ */

export interface RequiredValidator extends Validator {
    readonly validatorType: "required";
}

export interface RegexValidator extends Validator {
    readonly validatorType: "regex";
}

export interface EmailValidator extends Validator {
    readonly validatorType: "email";
}

export interface PhoneValidator extends Validator {
    readonly validatorType: "phone";
}

export interface IntegerValidator extends Validator {
    readonly validatorType: "integer";
}

export interface NumberValidator extends Validator {
    readonly validatorType: "number";
}

export interface MinLengthValidator extends Validator {
    readonly validatorType: "min_length";
}

export interface MaxLengthValidator extends Validator {
    readonly validatorType: "max_length";
}

export interface EnumValidator extends Validator {
    readonly validatorType: "enum";
}

export interface AttachmentValidator extends Validator {
    readonly validatorType: "attachment";
}

/* ============================================================
 * 35. Normalizer and extractor plugin contracts
 * ============================================================ */

export interface Normalizer {
    readonly normalizerType: string;
    normalize(value: unknown, definition: NormalizerDefinition, context: NormalizationContext): Promise<unknown>;
}

export interface NormalizationContext {
    flow: FlowVersion;
    step: StepDefinition;
    state: ConversationState;
    turn: Turn;
    input: UserInput;
}

export interface NormalizerRegistry {
    register(normalizer: Normalizer): void;
    getNormalizer(normalizerType: string): Normalizer;
    hasNormalizer(normalizerType: string): boolean;
}

export interface Extractor {
    readonly extractorType: string;
    extract(input: UserInput, definition: ExtractorDefinition, context: ExtractionContext): Promise<ExtractionResult>;
}

export interface ExtractionContext {
    flow: FlowVersion;
    step: StepDefinition;
    state: ConversationState;
    turn: Turn;
}

export interface ExtractionResult {
    matched: boolean;
    value?: unknown;
    values?: unknown[];
    confidence?: number;
    metadata?: Metadata;
}

export interface ExtractorRegistry {
    register(extractor: Extractor): void;
    getExtractor(extractorType: string): Extractor;
    hasExtractor(extractorType: string): boolean;
}

/* ============================================================
 * 36. Response rendering support contracts
 * ============================================================ */

export interface TemplateRenderer {
    render(template: string, context: ResponseRenderingContext): Promise<string>;
}

export interface StaticResponseRenderer {
    render(plan: StaticResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>;
}

export interface TemplateResponseRenderer {
    render(plan: TemplateResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>;
}

export interface GeneratedResponseRenderer {
    render(plan: GeneratedResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>;
}

export interface ResponseReferenceResolver {
    resolve(responseId: ResponseId, context: ResponseRenderingContext): Promise<ResponseDefinition | undefined>;
}

/* ============================================================
 * 37. Action mapping support contracts
 * ============================================================ */

export interface ActionInputMapper {
    mapInput(operation: RunActionOperation, context: OperationExecutionContext): Promise<Record<string, unknown>>;
}

export interface ActionOutputMapper {
    mapOutput(operation: RunActionOperation, result: ActionResult, context: OperationExecutionContext): Promise<VariablePatch[]>;
}

export interface ActionResultRouter {
    resolveBranch(operation: RunActionOperation, result: ActionResult, context: OperationExecutionContext): Promise<StepBranch | undefined>;
}

/* ============================================================
 * 38. Event factory contracts
 * ============================================================ */

export interface EventFactory {
    createEvent(request: CreateEventRequest): ConversationEvent;
}

export interface CreateEventRequest {
    conversationId: ConversationId;
    turnId?: TurnId;
    flowVersionId: FlowVersionId;
    stepId?: StepId;
    type: ConversationEventType;
    payload?: JsonObject;
    metadata?: Metadata;
}

export interface MessageFactory {
    createTextMessage(request: CreateTextMessageRequest): OutboundMessage;
    createRichMessage(request: CreateRichMessageRequest): OutboundMessage;
    createCustomPayloadMessage(request: CreateCustomPayloadMessageRequest): OutboundMessage;
}

export interface CreateTextMessageRequest {
    conversationId: ConversationId;
    turnId: TurnId;
    text: string;
    channel?: string;
    responseId?: ResponseId;
    metadata?: Metadata;
}

export interface CreateRichMessageRequest {
    conversationId: ConversationId;
    turnId: TurnId;
    content: Omit<RichOutboundContent, "type">;
    channel?: string;
    responseId?: ResponseId;
    metadata?: Metadata;
}

export interface CreateCustomPayloadMessageRequest {
    conversationId: ConversationId;
    turnId: TurnId;
    payload: JsonObject;
    channel?: string;
    responseId?: ResponseId;
    metadata?: Metadata;
}

/* ============================================================
 * 39. Engine module composition
 * ============================================================ */

export interface ConversationEngineModule {
    services: RuntimeServices;
    repositories: ConversationEngineRepositories;
    runtime: RuntimeContext;
}

export interface ConversationEngineRepositories {
    flowVersions: FlowVersionRepository;
    conversations: ConversationRepository;
    states: ConversationStateRepository;
    events: ConversationEventRepository;
    traces: DecisionTraceRepository;
}
