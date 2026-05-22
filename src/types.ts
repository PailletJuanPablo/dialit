/**
 * conversation-engine.v0.1.types.ts
 *
 * Public TypeScript contracts for a lightweight conversational engine.
 *
 * Design goals:
 * - Keep the runtime simple and traceable.
 * - Model conversational states as typed steps.
 * - Keep actions as reusable operations, not mandatory step types.
 * - Keep variables scoped and traceable for v0.1.
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
export type ExecutionFrameId = EntityId;
export type CustomOperationId = EntityId;
export type HandoffId = EntityId;

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
    customOperations?: CustomOperationDefinition[];
    responses?: ResponseDefinition[];
    settings?: FlowSettings;
}

export interface FlowSettings {
    defaultLocale?: string;
    defaultChannel?: string;
    maxTurns?: number;
    maxStepExecutionsPerTurn?: number;
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
 * 3. Scoped variables
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
    scope?: VariableScope;
    required?: boolean;
    sensitive?: boolean;
    defaultValue?: unknown;
    enumValues?: string[];
    validators?: ValidatorDefinition[];
}

export type VariableScope =
    | "conversation"
    | "flow"
    | "operation"
    | "system";

export type VariableValueSource =
    | "user_input"
    | "menu_selection"
    | "attachment"
    | "action_result"
    | "operation"
    | "semantic_input_task"
    | "llm_response_generation"
    | "system"
    | "flow_call";

export interface VariableValue<TVariableId extends VariableId = VariableId> {
    variableId: TVariableId;
    scope: VariableScope;
    value: unknown;
    source?: VariableValueSource;
    updatedAt?: ISODateString;
    valid?: boolean;
    invalidatedAt?: ISODateString;
    invalidationReason?: string;
    metadata?: Metadata;
}

export type VariablePatchType = "set" | "unset" | "invalidate";

export type VariablePatch<TVariableId extends VariableId = VariableId> =
    | SetVariablePatch<TVariableId>
    | UnsetVariablePatch<TVariableId>
    | InvalidateVariablePatch<TVariableId>;

export interface BaseVariablePatch<TType extends VariablePatchType, TVariableId extends VariableId = VariableId> {
    type: TType;
    variableId: TVariableId;
    scope?: VariableScope;
    source: VariableValueSource;
    metadata?: Metadata;
}

export interface SetVariablePatch<TVariableId extends VariableId = VariableId>
    extends BaseVariablePatch<"set", TVariableId> {
    value: unknown;
}

export interface UnsetVariablePatch<TVariableId extends VariableId = VariableId>
    extends BaseVariablePatch<"unset", TVariableId> { }

export interface InvalidateVariablePatch<TVariableId extends VariableId = VariableId>
    extends BaseVariablePatch<"invalidate", TVariableId> {
    reason?: string;
}

export interface VariableStoreSnapshot {
    values: ScopedVariableValues;
    history?: VariableHistoryEntry[];
}

export type ScopedVariableValues = Record<VariableScope, Record<VariableId, VariableValue>>;

export interface VariableHistoryEntry<TVariableId extends VariableId = VariableId> {
    variableId: TVariableId;
    scope: VariableScope;
    previousValue?: unknown;
    nextValue?: unknown;
    patchType: VariablePatchType;
    source: VariableValueSource;
    conversationId: ConversationId;
    flowVersionId: FlowVersionId;
    frameId?: ExecutionFrameId;
    stepId?: StepId;
    turnId?: TurnId;
    operationId?: OperationId;
    changedAt: ISODateString;
    metadata?: Metadata;
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

export interface GeneratedResponsePlan<TVariableId extends VariableId = VariableId> {
    mode: "generated";
    goal: string;
    allowedVariableIds: readonly TVariableId[];
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

export interface CustomOperationDefinition extends LabelledEntity {
    customOperationId: CustomOperationId;
    customType: string;
    inputSchema?: JsonObject;
    outputSchema?: JsonObject;
    allowedOutcomes: StepOutcome[];
    errorCodes?: string[];
    configSchema?: JsonObject;
    traceContract?: CustomOperationTraceContract;
}

export interface CustomOperationTraceContract {
    expectedSources?: string[];
    requiredDataKeys?: string[];
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
    | InvalidateVariableOperation
    | RunActionOperation
    | CallFlowOperation
    | EmitEventOperation
    | HandoffOperation
    | CustomOperation;

export interface BaseOperation<TType extends string> extends LabelledEntity {
    operationId?: OperationId;
    type: TType;
}

export interface SendMessageOperation extends BaseOperation<"send_message"> {
    message: ResponsePlan;
}

export interface SetVariableOperation extends BaseOperation<"set_variable"> {
    variableId: VariableId;
    scope?: VariableScope;
    value: ValueExpression;
    source?: VariableValueSource;
}

export interface UnsetVariableOperation extends BaseOperation<"unset_variable"> {
    variableId: VariableId;
    scope?: VariableScope;
}

export interface InvalidateVariableOperation extends BaseOperation<"invalidate_variable"> {
    variableId: VariableId;
    scope?: VariableScope;
    reason?: string;
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

export interface CallFlowOperation extends BaseOperation<"call_flow"> {
    flowVersionId: FlowVersionId;
    inputMapping?: Record<VariableId, ValueExpression>;
    outputMapping?: Record<VariableId, VariableId>;
    variableSharing?: FlowCallVariableSharing;
    resultVariableId?: VariableId;
    onResult?: FlowCallResultBranch[];
}

export interface FlowCallVariableSharing {
    scopes?: VariableScope[];
    includeVariableIds?: VariableId[];
    excludeVariableIds?: VariableId[];
}

export type FlowCallStatus =
    | "completed"
    | "cancelled"
    | "failed"
    | "handoff";

export interface FlowCallResult {
    status: FlowCallStatus;
    outcome?: StepOutcome;
    frameId: ExecutionFrameId;
    flowVersionId: FlowVersionId;
    variablePatches?: VariablePatch[];
    error?: RuntimeError;
    metadata?: Metadata;
}

export interface FlowCallResultBranch extends LabelledEntity {
    match: FlowCallResultMatch;
    branch: StepBranch;
}

export type FlowCallResultMatch =
    | FlowCallStatusMatch
    | FlowCallOutcomeMatch;

export interface FlowCallStatusMatch {
    type: "status";
    status: FlowCallStatus;
}

export interface FlowCallOutcomeMatch {
    type: "outcome";
    outcome: StepOutcome;
}

export interface HandoffOperation extends BaseOperation<"handoff"> {
    channel?: string;
    queue?: string;
    reason?: ValueExpression;
    metadataMapping?: Record<string, ValueExpression>;
    handoffIdVariableId?: VariableId;
    message?: ResponsePlan;
    onResult?: HandoffResultBranch[];
}

export type HandoffResultStatus =
    | "success"
    | "unavailable"
    | "error";

export interface HandoffResult {
    status: HandoffResultStatus;
    handoffId?: HandoffId;
    outcome?: StepOutcome;
    errorCode?: string;
    errorMessage?: string;
    metadata?: Metadata;
}

export interface HandoffResultBranch extends LabelledEntity {
    match: HandoffResultMatch;
    branch: StepBranch;
}

export type HandoffResultMatch =
    | HandoffStatusMatch
    | HandoffOutcomeMatch
    | HandoffErrorCodeMatch;

export interface HandoffStatusMatch {
    type: "status";
    status: HandoffResultStatus;
}

export interface HandoffOutcomeMatch {
    type: "outcome";
    outcome: StepOutcome;
}

export interface HandoffErrorCodeMatch {
    type: "error_code";
    errorCode: string;
}

export interface CustomOperation extends BaseOperation<"custom"> {
    customOperationId: CustomOperationId;
    customType: string;
    inputMapping?: Record<string, ValueExpression>;
    config?: JsonObject;
    resultVariableId?: VariableId;
    onResult?: CustomOperationResultBranch[];
}

export type CustomOperationResultStatus =
    | "completed"
    | "failed"
    | "skipped";

export interface CustomOperationResult {
    status: CustomOperationResultStatus;
    outcome?: StepOutcome;
    outputs?: Record<string, unknown>;
    errorCode?: string;
    errorMessage?: string;
    metadata?: Metadata;
}

export interface CustomOperationResultBranch extends LabelledEntity {
    match: CustomOperationResultMatch;
    branch: StepBranch;
}

export type CustomOperationResultMatch =
    | CustomOperationStatusMatch
    | CustomOperationOutcomeMatch
    | CustomOperationErrorCodeMatch;

export interface CustomOperationStatusMatch {
    type: "status";
    status: CustomOperationResultStatus;
}

export interface CustomOperationOutcomeMatch {
    type: "outcome";
    outcome: StepOutcome;
}

export interface CustomOperationErrorCodeMatch {
    type: "error_code";
    errorCode: string;
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

export interface InputContract<TOutcome extends StepOutcome = StepOutcome, TVariableId extends VariableId = VariableId> {
    acceptedInputTypes: InputType[];
    bindings?: InputBinding[];
    globalCommands?: GlobalCommandPolicy;
    semanticTasks?: SemanticInputTask<TOutcome, TVariableId>[];
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
    | "after_valid_capture"
    | "menu_selection";

export interface SemanticInputTask<TOutcome extends StepOutcome = StepOutcome, TVariableId extends VariableId = VariableId>
    extends LabelledEntity {
    taskId?: TaskId;
    mode: SemanticInputTaskMode;
    allowedOutcomes: readonly TOutcome[];
    threshold: number;
    saveOutcomeToVariableId?: TVariableId;
    allowedVariableIds?: readonly TVariableId[];
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

export interface CommandCandidate<TOutcome extends StepOutcome = StepOutcome, TVariableId extends VariableId = VariableId> {
    candidateId: CandidateId;
    type: CandidateType;
    outcome?: TOutcome;
    optionId?: OptionId;
    variablePatches?: VariablePatch<TVariableId>[];
    source: string;
    confidence?: number;
    explanation?: string;
    metadata?: Metadata;
}

export interface InputResolutionResult<TOutcome extends StepOutcome = StepOutcome, TVariableId extends VariableId = VariableId> {
    status: "resolved" | "invalid" | "unknown" | "ambiguous";
    candidates: CommandCandidate<TOutcome, TVariableId>[];
    selectedCandidate?: CommandCandidate<TOutcome, TVariableId>;
    variablePatches?: VariablePatch<TVariableId>[];
    validationResults?: ValidationResult[];
    outcome?: TOutcome;
    trace: TraceFragment;
}

export interface SemanticInputResolution<TOutcome extends StepOutcome = StepOutcome, TVariableId extends VariableId = VariableId>
    extends InputResolutionResult<TOutcome, TVariableId> {
    taskId?: TaskId;
    allowedOutcomes: readonly TOutcome[];
    allowedVariableIds?: readonly TVariableId[];
    confidence?: number;
    variables?: Partial<Record<TVariableId, unknown>>;
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
    variables: ConversationVariableValues;
    scopedVariables?: ScopedVariableValuesByKey;
    variableHistory?: ConversationVariableHistory;
    executionStack: FlowExecutionFrame[];
    pendingInput?: PendingInputState;
    lastUserInput?: UserInput;
    lastOutboundMessages?: OutboundMessage[];
    version: number;
    updatedAt: ISODateString;
}

export type ConversationVariableValues = Record<VariableId, VariableValue>;

export type ScopedVariableValuesByKey = Record<string, VariableValue>;

export type ConversationVariableHistory = Record<VariableId, VariableHistoryEntry[]>;

export interface FlowExecutionFrame {
    frameId: ExecutionFrameId;
    flowVersionId: FlowVersionId;
    flowId: FlowId;
    currentStepId: StepId;
    parentFrameId?: ExecutionFrameId;
    callOperationId?: OperationId;
    calledFromStepId?: StepId;
    returnTarget?: StepTarget;
    startedAt: ISODateString;
    completedAt?: ISODateString;
    metadata?: Metadata;
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
    | "variable_invalidated"
    | "operation_started"
    | "operation_completed"
    | "operation_failed"
    | "action_started"
    | "action_completed"
    | "action_failed"
    | "message_created"
    | "transition_taken"
    | "condition_evaluated"
    | "flow_call_started"
    | "flow_call_completed"
    | "handoff_started"
    | "handoff_completed"
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
    payload?: Metadata;
    createdAt: ISODateString;
    metadata?: Metadata;
}

/* ============================================================
 * 20. Tracing
 * ============================================================ */

export interface TraceFragment {
    source: string;
    message?: string;
    data?: Metadata;
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
    variableReads?: VariableReadTrace[];
    operationResults?: OperationTraceRecord[];
    actionResults?: ActionTraceRecord[];
    conditionResults?: ConditionTraceRecord[];
    flowCalls?: FlowCallTraceRecord[];
    handoffs?: HandoffTraceRecord[];
    llmUsage?: LlmUsageRecord[];
    createdAt: ISODateString;
}

export interface VariableReadTrace {
    variableId: VariableId;
    scope?: VariableScope;
    stepId?: StepId;
    operationId?: OperationId;
    found: boolean;
    readAt: ISODateString;
    metadata?: Metadata;
}

export interface OperationTraceRecord {
    operationId?: OperationId;
    operationType: StepOperation["type"];
    status: OperationResult["status"];
    outcome?: StepOutcome;
    error?: RuntimeError;
}

export interface ActionTraceRecord {
    actionId: ActionId;
    status: ActionResultStatus;
    outcome?: StepOutcome;
    errorCode?: string;
}

export interface ConditionTraceRecord {
    branchId?: BranchId;
    outcome?: StepOutcome;
    matched: boolean;
    variablesRead?: VariableReadTrace[];
}

export interface FlowCallTraceRecord {
    operationId?: OperationId;
    frameId: ExecutionFrameId;
    flowVersionId: FlowVersionId;
    status: FlowCallStatus;
    outcome?: StepOutcome;
}

export interface HandoffTraceRecord {
    operationId?: OperationId;
    status: HandoffResultStatus;
    handoffId?: HandoffId;
    outcome?: StepOutcome;
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

export type RuntimeError =
    | MissingStepHandlerRuntimeError
    | MissingOperationHandlerRuntimeError
    | MissingActionHandlerRuntimeError
    | MissingResponseReferenceRuntimeError
    | MissingActionReferenceRuntimeError
    | MissingVariableReferenceRuntimeError
    | MissingFlowVersionRuntimeError
    | MissingStepTargetRuntimeError
    | MissingSemanticInputResolverRuntimeError
    | MissingLlmResponseGeneratorRuntimeError
    | MissingCustomOperationContractRuntimeError
    | MissingCustomOperationHandlerRuntimeError
    | InvalidSemanticOutcomeRuntimeError
    | InvalidSemanticVariableRuntimeError
    | InvalidGeneratedResponseVariableRuntimeError
    | ModelValidationRuntimeError
    | OperationalRuntimeError
    | UnhandledRuntimeError;

export type RuntimeErrorCode =
    | PublicRuntimeErrorCode
    | OperationalRuntimeErrorCode;

export type PublicRuntimeErrorCode =
    | "missing_step_handler"
    | "missing_operation_handler"
    | "missing_action_handler"
    | "missing_response_reference"
    | "missing_action_reference"
    | "missing_variable_reference"
    | "missing_flow_version"
    | "missing_step_target"
    | "missing_semantic_input_resolver"
    | "missing_llm_response_generator"
    | "missing_custom_operation_contract"
    | "missing_custom_operation_handler"
    | "invalid_semantic_outcome"
    | "invalid_semantic_variable"
    | "invalid_generated_response_variable"
    | "model_validation_failed"
    | "unhandled_runtime_error";

export type OperationalRuntimeErrorCode =
    | "ACTION_HANDLER_NOT_REGISTERED"
    | "ACTION_NOT_FOUND"
    | "ACTION_RESULT_OUT_OF_CONTRACT"
    | "CONVERSATION_NOT_FOUND"
    | "CONVERSATION_NOT_WAITING_FOR_INPUT"
    | "CUSTOM_OPERATION_CONTRACT_NOT_REGISTERED"
    | "CUSTOM_OPERATION_RESULT_OUT_OF_CONTRACT"
    | "FLOW_VERSION_NOT_FOUND"
    | "FLOW_CALL_CONTINUATION_INVALID"
    | "INPUT_BINDING_NOT_FOUND"
    | "INPUT_PROCESSING_CONTEXT_REQUIRED"
    | "INVALID_TARGET"
    | "LLM_RESPONSE_GENERATOR_NOT_REGISTERED"
    | "LLM_RESPONSE_USAGE_NOT_DECLARED"
    | "MAX_STEP_EXECUTIONS_EXCEEDED"
    | "OPERATION_EXECUTION_CONTEXT_REQUIRED"
    | "OPERATION_HANDLER_NOT_REGISTERED"
    | "RESPONSE_NOT_FOUND"
    | "RESPONSE_RENDERING_CONTEXT_REQUIRED"
    | "SEMANTIC_INPUT_RESOLVER_NOT_REGISTERED"
    | "SEMANTIC_INPUT_NOT_FOUND"
    | "SEMANTIC_RESULT_OUT_OF_CONTRACT"
    | "STEP_DOES_NOT_ACCEPT_INPUT"
    | "STEP_HANDLER_NOT_REGISTERED"
    | "STEP_NOT_FOUND"
    | "VALIDATOR_NOT_REGISTERED";

export interface BaseRuntimeError<TCode extends RuntimeErrorCode> {
    code: TCode;
    message: string;
    recoverable: boolean;
    details?: Metadata;
}

export interface MissingStepHandlerRuntimeError extends BaseRuntimeError<"missing_step_handler"> {
    stepType: StepType;
}

export interface MissingOperationHandlerRuntimeError extends BaseRuntimeError<"missing_operation_handler"> {
    operationType: StepOperation["type"];
}

export interface MissingActionHandlerRuntimeError extends BaseRuntimeError<"missing_action_handler"> {
    actionKind: ActionKind;
}

export interface MissingResponseReferenceRuntimeError extends BaseRuntimeError<"missing_response_reference"> {
    responseId: ResponseId;
}

export interface MissingActionReferenceRuntimeError extends BaseRuntimeError<"missing_action_reference"> {
    actionId: ActionId;
}

export interface MissingVariableReferenceRuntimeError extends BaseRuntimeError<"missing_variable_reference"> {
    variableId: VariableId;
    scope?: VariableScope;
}

export interface MissingFlowVersionRuntimeError extends BaseRuntimeError<"missing_flow_version"> {
    flowVersionId: FlowVersionId;
}

export interface MissingStepTargetRuntimeError extends BaseRuntimeError<"missing_step_target"> {
    stepId: StepId;
}

export interface MissingSemanticInputResolverRuntimeError extends BaseRuntimeError<"missing_semantic_input_resolver"> {
    taskId?: TaskId;
}

export interface MissingLlmResponseGeneratorRuntimeError extends BaseRuntimeError<"missing_llm_response_generator"> {
    responseId?: ResponseId;
}

export interface MissingCustomOperationContractRuntimeError extends BaseRuntimeError<"missing_custom_operation_contract"> {
    customOperationId: CustomOperationId;
}

export interface MissingCustomOperationHandlerRuntimeError extends BaseRuntimeError<"missing_custom_operation_handler"> {
    customType: string;
}

export interface InvalidSemanticOutcomeRuntimeError extends BaseRuntimeError<"invalid_semantic_outcome"> {
    outcome: StepOutcome;
    allowedOutcomes: StepOutcome[];
}

export interface InvalidSemanticVariableRuntimeError extends BaseRuntimeError<"invalid_semantic_variable"> {
    variableId: VariableId;
    allowedVariableIds: VariableId[];
}

export interface InvalidGeneratedResponseVariableRuntimeError extends BaseRuntimeError<"invalid_generated_response_variable"> {
    variableId: VariableId;
    allowedVariableIds: VariableId[];
}

export interface ModelValidationRuntimeError extends BaseRuntimeError<"model_validation_failed"> {
    issues: ValidationIssue[];
}

export interface OperationalRuntimeError extends BaseRuntimeError<OperationalRuntimeErrorCode> {
    [key: string]: unknown;
}

export interface UnhandledRuntimeError extends BaseRuntimeError<"unhandled_runtime_error"> { }

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
    semanticInputResolver?: SemanticInputResolver;
    llmResponseGenerator?: LlmResponseGenerator;
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
    resolve<TOutcome extends StepOutcome = StepOutcome, TVariableId extends VariableId = VariableId>(
        input: UserInput,
        task: SemanticInputTask<TOutcome, TVariableId>,
        context: InputProcessingContext
    ): Promise<SemanticInputResolution<TOutcome, TVariableId>>;
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
    generate<TVariableId extends VariableId = VariableId>(
        plan: GeneratedResponsePlan<TVariableId>,
        context: ResponseRenderingContext
    ): Promise<LlmGeneratedResponse<TVariableId>>;
}

export interface LlmGeneratedResponse<TVariableId extends VariableId = VariableId> {
    text: string;
    usedVariableIds: readonly TVariableId[];
    fallbackUsed?: boolean;
    usage?: LlmUsageRecord;
    metadata?: Metadata;
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
    variableReads?: VariableReadTrace[];
    operationResults?: OperationTraceRecord[];
    actionResults?: ActionTraceRecord[];
    conditionResults?: ConditionTraceRecord[];
    flowCalls?: FlowCallTraceRecord[];
    handoffs?: HandoffTraceRecord[];
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

export interface InvalidateVariableOperationHandler extends OperationHandler<InvalidateVariableOperation> {
    readonly operationType: "invalidate_variable";
}

export interface RunActionOperationHandler extends OperationHandler<RunActionOperation> {
    readonly operationType: "run_action";
}

export interface CallFlowOperationHandler extends OperationHandler<CallFlowOperation> {
    readonly operationType: "call_flow";
}

export interface EmitEventOperationHandler extends OperationHandler<EmitEventOperation> {
    readonly operationType: "emit_event";
}

export interface HandoffOperationHandler extends OperationHandler<HandoffOperation> {
    readonly operationType: "handoff";
}

export interface CustomOperationHandler extends OperationHandler<CustomOperation> {
    readonly operationType: "custom";
    readonly customType: string;
}

/* ============================================================
 * 25. Validation and flow inspection
 * ============================================================ */

export interface FlowValidator {
    validate(flow: ConversationFlowDefinition): ValidationIssue[];
}

export interface ModelValidator {
    validateFlowVersion(flowVersion: FlowVersion, context: ModelValidationContext): ModelValidationReport;
}

export interface ModelValidationContext {
    registeredStepTypes: readonly StepType[];
    registeredOperationTypes: readonly StepOperation["type"][];
    registeredActionKinds?: readonly ActionKind[];
    registeredCustomOperationTypes?: readonly string[];
}

export interface ModelValidationReport {
    valid: boolean;
    errors: ValidationIssue[];
    warnings: ValidationIssue[];
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
    initialVariables?: Record<VariableId, unknown> | Partial<Record<VariableScope, Record<VariableId, unknown>>>;
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

export interface CreateConversationEngineOptions {
    config?: ConversationEngineConfig;
    repositories?: Partial<ConversationEngineRepositories>;
    services?: Partial<RuntimeServices>;
    runtime?: Partial<RuntimeContext>;
    flowVersions?: FlowVersion[];
    clock?: RuntimeClock;
    idGenerator?: Partial<IdGenerator>;
    maxStepExecutionsPerTurn?: number;
    stepHandlers?: Record<string, StepHandler>;
    actionHandlers?: Record<ActionKind, ActionHandler | ActionExecutor["execute"]>;
    customOperations?: Record<string, {
        inputSchema?: JsonObject;
        outputVariables?: VariableId[];
        outcomes: StepOutcome[];
        execute(operation: CustomOperation, input: Record<string, unknown>, context: OperationExecutionContext): Promise<CustomOperationResult | OperationResult>;
    }>;
    semanticInputResolver?: SemanticInputResolver | SemanticInputResolver["resolve"];
    llmResponseGenerator?: LlmResponseGenerator | LlmResponseGenerator["generate"];
}

export type CreateConversationEngine = (options?: CreateConversationEngineOptions) => ConversationEngine & ConversationEngineModule;

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
    newExecutionFrameId(): ExecutionFrameId;
    newHandoffId(): HandoffId;
}

/* ============================================================
 * 30. Variable store contract
 * ============================================================ */

export interface VariableStore {
    get(variableId: VariableId, scope?: VariableScope): VariableValue | undefined;
    set(variableId: VariableId, value: unknown, source: VariableValueSource, metadata?: Metadata, scope?: VariableScope): SetVariablePatch;
    unset(variableId: VariableId, source: VariableValueSource, metadata?: Metadata, scope?: VariableScope): UnsetVariablePatch;
    invalidate(variableId: VariableId, source: VariableValueSource, reason?: string, metadata?: Metadata, scope?: VariableScope): InvalidateVariablePatch;
    has(variableId: VariableId, scope?: VariableScope): boolean;
    snapshot(): VariableStoreSnapshot;
    history(variableId?: VariableId, scope?: VariableScope): VariableHistoryEntry[];
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
    payload?: Metadata;
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
