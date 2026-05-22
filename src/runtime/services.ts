import type {
  ActionDefinition,
  ActionExecutionContext,
  ConditionEvaluationContext,
  ConditionExpression,
  ConversationState,
  OperationalRuntimeErrorCode,
  RuntimeError,
  RuntimeServices,
  StepBranch,
  StepDefinition,
  StepHandler,
  StepResult,
  TraceBuildInput,
} from "../types.js";
import { builtInStepTypes } from "./constants.js";
import type { EngineOptions } from "./internal-types.js";

export type RuntimeServicesDependencies = {
  options: EngineOptions;
  runtimeError(code: OperationalRuntimeErrorCode, message: string, recoverable: boolean): RuntimeError;
  evaluateCondition(condition: ConditionExpression, context: ConditionEvaluationContext): boolean;
  resolveRoute(step: StepDefinition, outcome: string): StepBranch | undefined;
  newTraceId(): string;
  now(): string;
};

export function createRuntimeServices(dependencies: RuntimeServicesDependencies): RuntimeServices {
  const { options } = dependencies;

  return {
    stepRegistry: {
      register: (handler: StepHandler) => {
        options.stepHandlers = { ...(options.stepHandlers ?? {}), [handler.stepType]: handler };
      },
      getHandler: (stepType: string) => {
        const handler = options.stepHandlers?.[stepType];
        if (!handler) throw dependencies.runtimeError("STEP_HANDLER_NOT_REGISTERED", `Step handler for ${stepType} is not registered.`, false);
        return handler;
      },
      hasHandler: (stepType: string) => builtInStepTypes.has(stepType) || Boolean(options.stepHandlers?.[stepType]),
    },
    operationExecutor: {
      executeMany: async () => {
        throw dependencies.runtimeError("OPERATION_EXECUTION_CONTEXT_REQUIRED", "Use ConversationEngine to execute operations with a full turn context.", false);
      },
    },
    inputProcessor: {
      process: async () => {
        throw dependencies.runtimeError("INPUT_PROCESSING_CONTEXT_REQUIRED", "Use ConversationEngine to process input with a full turn context.", false);
      },
    },
    responseRenderer: {
      render: async () => {
        throw dependencies.runtimeError("RESPONSE_RENDERING_CONTEXT_REQUIRED", "Use ConversationEngine to render responses with a full turn context.", false);
      },
    },
    actionExecutor: {
      execute: async (action: ActionDefinition, input: Record<string, unknown>, context: ActionExecutionContext) => {
        const handler = options.actionHandlers?.[action.kind];
        if (!handler) throw dependencies.runtimeError("ACTION_HANDLER_NOT_REGISTERED", `Action handler ${action.kind} is not registered.`, false);
        return typeof handler === "function" ? handler(action, input, context) : handler.execute(action, input, context);
      },
    },
    conditionEvaluator: {
      evaluate: async (condition, context) => ({
        matched: dependencies.evaluateCondition(condition, context),
      }),
    },
    transitionResolver: {
      resolveFromStepResult: async (step: StepDefinition, result: StepResult) => result.branch ?? (result.outcome ? dependencies.resolveRoute(step, result.outcome) : undefined),
      resolveFromOutcome: async (step: StepDefinition, outcome: string) => dependencies.resolveRoute(step, outcome),
    },
    stateReducer: {
      apply: (state: ConversationState) => state,
    },
    traceBuilder: {
      build: (input: TraceBuildInput) => ({
        traceId: dependencies.newTraceId(),
        createdAt: dependencies.now(),
        ...input,
      }),
    },
    semanticInputResolver: typeof options.semanticInputResolver === "function"
      ? { resolve: options.semanticInputResolver }
      : options.semanticInputResolver,
    llmResponseGenerator: typeof options.llmResponseGenerator === "function"
      ? { generate: options.llmResponseGenerator }
      : options.llmResponseGenerator,
  };
}
