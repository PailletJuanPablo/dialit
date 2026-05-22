import type {
  ActionDefinition,
  ActionExecutionContext,
  ConditionEvaluationContext,
  ConditionExpression,
  ConversationState,
  Extractor,
  Normalizer,
  OperationHandler,
  OperationalRuntimeErrorCode,
  Resolver,
  RuntimeError,
  RuntimeServices,
  StepBranch,
  StepDefinition,
  StepHandler,
  StepResult,
  TraceBuildInput,
  Validator,
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
  const operationHandlers = new Map<string, OperationHandler>();
  const resolvers = [...(options.resolvers ?? [])];
  const validators = new Map<string, Validator>();
  const normalizers = new Map<string, Normalizer>();
  const extractors = new Map<string, Extractor>();

  for (const [operationType, handler] of Object.entries(options.operationHandlers ?? {})) {
    operationHandlers.set(operationType, typeof handler === "function" ? { operationType, execute: handler } : handler);
  }
  for (const [validatorType, validator] of Object.entries(options.validators ?? {})) {
    validators.set(validatorType, typeof validator === "function" ? { validatorType, validate: validator } : validator);
  }
  for (const [normalizerType, normalizer] of Object.entries(options.normalizers ?? {})) {
    normalizers.set(normalizerType, typeof normalizer === "function" ? { normalizerType, normalize: normalizer } : normalizer);
  }
  for (const [extractorType, extractor] of Object.entries(options.extractors ?? {})) {
    extractors.set(extractorType, typeof extractor === "function" ? { extractorType, extract: extractor } : extractor);
  }

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
    operationRegistry: {
      register: (handler: OperationHandler) => {
        operationHandlers.set(handler.operationType, handler);
      },
      getHandler: (operationType: string) => {
        const handler = operationHandlers.get(operationType);
        if (!handler) throw dependencies.runtimeError("OPERATION_HANDLER_NOT_REGISTERED", `Operation handler for ${operationType} is not registered.`, false);
        return handler;
      },
      hasHandler: (operationType: string) => operationHandlers.has(operationType),
    },
    resolverRegistry: {
      register: (resolver: Resolver) => {
        resolvers.push(resolver);
      },
      list: () => [...resolvers],
    },
    validatorRegistry: {
      register: (validator: Validator) => {
        validators.set(validator.validatorType, validator);
      },
      getValidator: (validatorType: string) => {
        const validator = validators.get(validatorType);
        if (!validator) throw dependencies.runtimeError("VALIDATOR_NOT_REGISTERED", `Validator ${validatorType} is not registered.`, false);
        return validator;
      },
      hasValidator: (validatorType: string) => validators.has(validatorType),
    },
    normalizerRegistry: {
      register: (normalizer: Normalizer) => {
        normalizers.set(normalizer.normalizerType, normalizer);
      },
      getNormalizer: (normalizerType: string) => {
        const normalizer = normalizers.get(normalizerType);
        if (!normalizer) throw dependencies.runtimeError("NORMALIZER_NOT_REGISTERED", `Normalizer ${normalizerType} is not registered.`, false);
        return normalizer;
      },
      hasNormalizer: (normalizerType: string) => normalizers.has(normalizerType),
    },
    extractorRegistry: {
      register: (extractor: Extractor) => {
        extractors.set(extractor.extractorType, extractor);
      },
      getExtractor: (extractorType: string) => {
        const extractor = extractors.get(extractorType);
        if (!extractor) throw dependencies.runtimeError("EXTRACTOR_NOT_REGISTERED", `Extractor ${extractorType} is not registered.`, false);
        return extractor;
      },
      hasExtractor: (extractorType: string) => extractors.has(extractorType),
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
