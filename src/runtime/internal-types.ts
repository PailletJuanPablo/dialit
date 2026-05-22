import type {
  CallFlowOperation,
  Conversation,
  ConversationEvent,
  ConversationState,
  CreateConversationEngineOptions,
  CustomOperationResult,
  FlowExecutionFrame,
  FlowVersion,
  HandoffOperation,
  IdGenerator,
  LlmUsageRecord,
  Metadata,
  OperationResult,
  OutboundMessage,
  PendingInputState,
  RuntimeError,
  StepBranch,
  StepOperation,
  StepOutcome,
  StepTarget,
  TraceFragment,
  Turn,
  VariableHistoryEntry,
  VariableId,
  VariablePatch,
  VariableScope,
  VariableValue,
} from "../types.js";

export type EngineOptions = CreateConversationEngineOptions;

export type IdFactoryName = keyof IdGenerator;

export type RuntimeVariableValue = VariableValue & {
  metadata?: Metadata;
};

export type InternalState = Omit<ConversationState, "variables" | "variableHistory"> & {
  variables: Record<VariableId, RuntimeVariableValue>;
  scopedVariables: Record<string, RuntimeVariableValue>;
  variableHistory: Record<VariableId, VariableHistoryEntry[]>;
  __flowScopes?: Record<string, VariableScope>;
};

export type RuntimeCallFlowOperation = CallFlowOperation & {
  sharedVariableIds?: VariableId[];
};

export type FlowCallFrameMetadata = Metadata & {
  kind: "flow_call";
  operation: RuntimeCallFlowOperation;
  parentFrame: Pick<InternalState, "currentStepId" | "status" | "pendingInput">;
  parentScopedVariables: InternalState["scopedVariables"];
  parentVariableHistory: InternalState["variableHistory"];
  childScopedVariables: InternalState["scopedVariables"];
  childVariableHistory: InternalState["variableHistory"];
  continuation?: OperationContinuation;
};

export type FlowCallExecutionFrame = FlowExecutionFrame & {
  metadata: FlowCallFrameMetadata;
};

export type RuntimeHandoffOperation = HandoffOperation & {
  queueId?: string;
  saveHandoffIdToVariableId?: VariableId;
};

export type RuntimeCustomOperationResult = (CustomOperationResult | OperationResult) & {
  variablePatches?: VariablePatch[];
  trace?: TraceFragment;
};

export type ResultBranch = {
  match: {
    type: "outcome" | "status" | "error_code";
    outcome?: StepOutcome;
    status?: string;
    errorCode?: string;
  };
  branch: StepBranch;
};

export type BranchMatchResult = {
  outcome?: StepOutcome | string;
  status?: string;
  errorCode?: string;
  handoffId?: string;
};

export type RenderedOutput = {
  messages: OutboundMessage[];
  events: ConversationEvent[];
  fragments: TraceFragment[];
};

export type StepWaitState = Partial<PendingInputState> & {
  stepId?: string;
};

export type TurnContext = {
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

export type StepRunResult = {
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

export type OperationContinuation = {
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

export type OperationContinuationBase = Omit<OperationContinuation, "operations" | "nextOperationIndex" | "aggregateTarget">;
