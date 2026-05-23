export interface NavigationGroup {
  readonly title: string;
  readonly items: readonly string[];
}

export interface TutorialImplementation {
  readonly label: string;
  readonly code: string;
  readonly language?: string;
}

export interface ApiReferenceMethod {
  readonly name: string;
  readonly signature: string;
  readonly description: string;
  readonly required?: boolean;
  readonly parameters?: readonly ApiReferenceParameter[];
  readonly returns?: ApiReferenceReturn;
}

export interface ApiReferenceParameter {
  readonly name: string;
  readonly type: string;
  readonly description: string;
  readonly required?: boolean;
}

export interface ApiReferenceReturn {
  readonly type: string;
  readonly description: string;
}

export interface ApiReferenceField {
  readonly name: string;
  readonly type: string;
  readonly description: string;
  readonly required?: boolean;
}

export interface ApiReferenceEntry {
  readonly name: string;
  readonly kind: string;
  readonly purpose: string;
  readonly usage?: string;
  readonly signatures?: readonly string[];
  readonly methods?: readonly ApiReferenceMethod[];
  readonly fields: readonly string[];
  readonly properties?: readonly ApiReferenceField[];
  readonly parameters?: readonly ApiReferenceParameter[];
  readonly returns?: ApiReferenceReturn;
  readonly example?: string;
  readonly examples?: readonly TutorialImplementation[];
  readonly related?: readonly string[];
}

export interface ApiReferenceGroup {
  readonly title: string;
  readonly summary: string;
  readonly entries: readonly ApiReferenceEntry[];
  readonly exports: readonly string[];
}

export const apiNavigation: readonly NavigationGroup[] = [
  {
    "title": "Runtime Entry Points",
    "items": [
      "createConversationEngine",
      "createConversationApi",
      "validateFlowDefinition",
      "Root package"
    ]
  },
  {
    "title": "Flow Model",
    "items": [
      "ConversationFlowDefinition",
      "FlowSettings",
      "FlowVersion"
    ]
  },
  {
    "title": "Variables and Value Expressions",
    "items": [
      "VariableType",
      "VariableDefinition",
      "VariableScope",
      "VariableValueSource",
      "VariableValue",
      "VariablePatchType",
      "VariablePatch",
      "BaseVariablePatch",
      "SetVariablePatch",
      "UnsetVariablePatch",
      "InvalidateVariablePatch",
      "VariableStoreSnapshot",
      "ScopedVariableValues",
      "VariableHistoryEntry",
      "ValueExpression",
      "LiteralValueExpression",
      "VariableValueExpression",
      "TemplateValueExpression",
      "ContextValueExpression"
    ]
  },
  {
    "title": "Responses",
    "items": [
      "ResponseDefinition",
      "ResponsePlan",
      "StaticResponsePlan",
      "TemplateResponsePlan",
      "GeneratedResponsePlan",
      "ResponseReferencePlan",
      "ResponseStyle"
    ]
  },
  {
    "title": "Actions and Custom Operations",
    "items": [
      "ActionKind",
      "ActionDefinition",
      "ActionResultStatus",
      "ActionResult",
      "CustomOperationDefinition",
      "CustomOperationTraceContract"
    ]
  },
  {
    "title": "Conditions",
    "items": [
      "ConditionExpression",
      "EqualsCondition",
      "NotEqualsCondition",
      "ExistsCondition",
      "NotExistsCondition",
      "GreaterThanCondition",
      "LessThanCondition",
      "IncludesCondition",
      "MatchesRegexCondition",
      "AndCondition",
      "OrCondition",
      "NotCondition",
      "ConditionEvaluationResult"
    ]
  },
  {
    "title": "Steps",
    "items": [
      "BuiltInStepType",
      "StepType",
      "StepConfig",
      "BaseStepDefinition",
      "StepDefinition",
      "MessageStepDefinition",
      "MessageStepConfig",
      "MenuStepDefinition",
      "MenuStepConfig",
      "MenuOption",
      "MenuSelectionPolicy",
      "MenuSemanticSelection",
      "InputStepDefinition",
      "InputStepConfig",
      "AttachmentStepDefinition",
      "AttachmentStepConfig",
      "ConditionStepDefinition",
      "ConditionStepConfig",
      "ConditionBranch",
      "EndStepDefinition",
      "EndStepConfig",
      "CustomStepDefinition",
      "CustomStepConfig"
    ]
  },
  {
    "title": "Branches, Routes, and Targets",
    "items": [
      "StepBranch",
      "StepRoute",
      "RouteMatch",
      "OutcomeRouteMatch",
      "AlwaysRouteMatch",
      "StepTarget",
      "GoToStepTarget",
      "StayOnStepTarget",
      "EndConversationTarget",
      "NoStepTarget"
    ]
  },
  {
    "title": "Operations",
    "items": [
      "StepOperation",
      "BaseOperation",
      "SendMessageOperation",
      "SetVariableOperation",
      "UnsetVariableOperation",
      "InvalidateVariableOperation",
      "RunActionOperation",
      "ActionResultBranch",
      "ActionResultMatch",
      "ActionStatusMatch",
      "ActionErrorCodeMatch",
      "ActionOutcomeMatch",
      "EmitEventOperation",
      "CallFlowOperation",
      "FlowCallVariableSharing",
      "FlowCallStatus",
      "FlowCallResult",
      "FlowCallResultBranch",
      "FlowCallResultMatch",
      "FlowCallStatusMatch",
      "FlowCallOutcomeMatch",
      "HandoffOperation",
      "HandoffResultStatus",
      "HandoffResult",
      "HandoffResultBranch",
      "HandoffResultMatch",
      "HandoffStatusMatch",
      "HandoffOutcomeMatch",
      "HandoffErrorCodeMatch",
      "CustomOperation",
      "CustomOperationResultStatus",
      "CustomOperationResult",
      "CustomOperationResultBranch",
      "CustomOperationResultMatch",
      "CustomOperationStatusMatch",
      "CustomOperationOutcomeMatch",
      "CustomOperationErrorCodeMatch"
    ]
  },
  {
    "title": "Input Processing",
    "items": [
      "InputType",
      "InputContract",
      "InputBinding",
      "GlobalCommandPolicy",
      "SemanticInputTaskMode",
      "SemanticInputTask",
      "InvalidInputBehavior",
      "UnknownInputBehavior",
      "AttachmentRules",
      "NormalizerDefinition",
      "ExtractorDefinition",
      "ValidatorDefinition",
      "ValidationResult"
    ]
  },
  {
    "title": "User Input",
    "items": [
      "UserInput",
      "BaseUserInput",
      "TextUserInput",
      "ChoiceUserInput",
      "AttachmentUserInput",
      "AttachmentInput",
      "PayloadUserInput",
      "EventUserInput"
    ]
  },
  {
    "title": "Input Resolution",
    "items": [
      "CandidateType",
      "CommandCandidate",
      "InputResolutionResult",
      "SemanticInputResolution"
    ]
  },
  {
    "title": "Runtime State",
    "items": [
      "Conversation",
      "ConversationState",
      "ConversationVariableValues",
      "ScopedVariableValuesByKey",
      "ConversationVariableHistory",
      "FlowExecutionFrame",
      "PendingInputState",
      "Turn"
    ]
  },
  {
    "title": "Step Execution Contracts",
    "items": [
      "StepExecutionContext",
      "StepResult",
      "StepHandler",
      "StepValidationContext",
      "ValidationSeverity",
      "ValidationIssue",
      "StepHandlerRegistry"
    ]
  },
  {
    "title": "Operation Execution Contracts",
    "items": [
      "OperationExecutionContext",
      "OperationResult",
      "OperationHandler",
      "OperationRegistry",
      "OperationExecutor"
    ]
  },
  {
    "title": "Outbound Messages",
    "items": [
      "OutboundMessage",
      "OutboundMessageContent",
      "TextOutboundContent",
      "RichOutboundContent",
      "CustomPayloadOutboundContent",
      "OutboundButton"
    ]
  },
  {
    "title": "Events and Traces",
    "items": [
      "ConversationEventType",
      "ConversationEvent",
      "TraceFragment",
      "DecisionTrace",
      "VariableReadTrace",
      "OperationTraceRecord",
      "ActionTraceRecord",
      "ConditionTraceRecord",
      "FlowCallTraceRecord",
      "HandoffTraceRecord",
      "LlmUsageRecord"
    ]
  },
  {
    "title": "Runtime Errors",
    "items": [
      "RuntimeError",
      "RuntimeErrorCode",
      "PublicRuntimeErrorCode",
      "OperationalRuntimeErrorCode",
      "BaseRuntimeError",
      "MissingStepHandlerRuntimeError",
      "MissingOperationHandlerRuntimeError",
      "MissingActionHandlerRuntimeError",
      "MissingResponseReferenceRuntimeError",
      "MissingActionReferenceRuntimeError",
      "MissingVariableReferenceRuntimeError",
      "MissingFlowVersionRuntimeError",
      "MissingStepTargetRuntimeError",
      "MissingSemanticInputResolverRuntimeError",
      "MissingLlmResponseGeneratorRuntimeError",
      "MissingCustomOperationContractRuntimeError",
      "MissingCustomOperationHandlerRuntimeError",
      "InvalidSemanticOutcomeRuntimeError",
      "InvalidSemanticVariableRuntimeError",
      "InvalidGeneratedResponseVariableRuntimeError",
      "ModelValidationRuntimeError",
      "OperationalRuntimeError",
      "UnhandledRuntimeError"
    ]
  },
  {
    "title": "Extension Contracts",
    "items": [
      "RuntimeServices",
      "InputProcessor",
      "InputProcessingContext",
      "Resolver",
      "ResolverRegistry",
      "Validator",
      "ValidatorRegistry",
      "ValidationContext",
      "SemanticInputResolver",
      "ResponseRenderer",
      "ResponseRenderingContext",
      "LlmResponseGenerator",
      "LlmGeneratedResponse",
      "ActionExecutor",
      "ActionExecutionContext",
      "ActionHandler",
      "ActionHandlerRegistry",
      "ConditionEvaluator",
      "ConditionEvaluationContext",
      "TransitionResolver",
      "TransitionResolutionContext",
      "StateReducer",
      "StateChangeSet",
      "TraceBuilder",
      "TraceBuildInput",
      "MessageStepHandler",
      "MenuStepHandler",
      "InputStepHandler",
      "AttachmentStepHandler",
      "ConditionStepHandler",
      "EndStepHandler",
      "SendMessageOperationHandler",
      "SetVariableOperationHandler",
      "UnsetVariableOperationHandler",
      "InvalidateVariableOperationHandler",
      "RunActionOperationHandler",
      "CallFlowOperationHandler",
      "EmitEventOperationHandler",
      "HandoffOperationHandler",
      "CustomOperationHandler",
      "Normalizer",
      "NormalizationContext",
      "NormalizerRegistry",
      "Extractor",
      "ExtractionContext",
      "ExtractionResult",
      "ExtractorRegistry",
      "TemplateRenderer",
      "StaticResponseRenderer",
      "TemplateResponseRenderer",
      "GeneratedResponseRenderer",
      "ResponseReferenceResolver",
      "ActionInputMapper",
      "ActionOutputMapper",
      "ActionResultRouter",
      "EventFactory",
      "CreateEventRequest",
      "MessageFactory",
      "CreateTextMessageRequest",
      "CreateRichMessageRequest",
      "CreateCustomPayloadMessageRequest"
    ]
  },
  {
    "title": "Validation and Inspection",
    "items": [
      "FlowValidator",
      "FlowValidationOptions",
      "ModelValidator",
      "ModelValidationContext",
      "ModelValidationReport",
      "FlowInspector",
      "FlowVersionFactory",
      "CreateFlowVersionRequest",
      "FlowValidationReport",
      "StepValidationReport",
      "OperationValidationReport"
    ]
  },
  {
    "title": "Persistence",
    "items": [
      "FlowVersionRepository",
      "ConversationRepository",
      "ConversationStateRepository",
      "ConversationEventRepository",
      "DecisionTraceRepository"
    ]
  },
  {
    "title": "Engine and API Adapter",
    "items": [
      "ConversationEngine",
      "StartConversationRequest",
      "ProcessUserInputRequest",
      "ProcessExternalEventRequest",
      "ProcessTurnResult",
      "ConversationEventEnvelope",
      "ConversationEventSubscriber",
      "ConversationEventSubscription",
      "ConversationApi",
      "ConversationApiStartRequest",
      "ConversationApiTextRequest",
      "ConversationApiChoiceRequest",
      "ConversationApiAttachmentRequest",
      "ConversationApiEventRequest",
      "ConversationApiHttpResponse",
      "ConversationApiResponseBody",
      "ConversationApiMessage",
      "ConversationApiChoice",
      "ConversationApiVariable"
    ]
  },
  {
    "title": "Turn Processing",
    "items": [
      "TurnProcessor",
      "StepExecutor",
      "BranchExecutor",
      "BranchExecutionContext",
      "BranchExecutionResult"
    ]
  },
  {
    "title": "Runtime Configuration",
    "items": [
      "ConversationEngineConfig",
      "CreateConversationEngineOptions",
      "CreateConversationEngine",
      "RuntimeContext",
      "RuntimeClock",
      "IdGenerator",
      "ConversationEngineModule",
      "ConversationEngineRepositories"
    ]
  },
  {
    "title": "Variable and Definition Lookup",
    "items": [
      "VariableStore",
      "VariableResolver",
      "VariableResolutionContext",
      "FlowRegistry",
      "DefinitionLookup"
    ]
  },
  {
    "title": "Built-in Resolver Marker Contracts",
    "items": [
      "TextResolver",
      "ExactTextResolver",
      "NumberResolver",
      "IntegerResolver",
      "EmailResolver",
      "PhoneResolver",
      "DateResolver",
      "RegexResolver",
      "MenuOptionResolver",
      "AttachmentResolver",
      "GlobalCommandResolver"
    ]
  },
  {
    "title": "Built-in Validator Marker Contracts",
    "items": [
      "RequiredValidator",
      "RegexValidator",
      "EmailValidator",
      "PhoneValidator",
      "IntegerValidator",
      "NumberValidator",
      "MinLengthValidator",
      "MaxLengthValidator",
      "EnumValidator",
      "AttachmentValidator"
    ]
  },
  {
    "title": "Runtime Support",
    "items": [
      "runtime-support",
      "VariableLookupResult",
      "clone",
      "InMemoryFlowVersionRepository",
      "InMemoryConversationRepository",
      "InMemoryConversationStateRepository",
      "InMemoryConversationEventRepository",
      "InMemoryDecisionTraceRepository",
      "createDefaultClock",
      "createDefaultIdGenerator",
      "createEventFactory",
      "createEvent",
      "createTextMessage",
      "createTrace",
      "createMissingVariableError",
      "getVariable",
      "requireVariable",
      "setVariable",
      "unsetVariable",
      "invalidateVariable"
    ]
  },
  {
    "title": "Primitive IDs and Shared Base Types",
    "items": [
      "EntityId",
      "FlowId",
      "FlowVersionId",
      "StepId",
      "RouteId",
      "BranchId",
      "OptionId",
      "VariableId",
      "ActionId",
      "ResponseId",
      "OperationId",
      "EventId",
      "ConversationId",
      "TurnId",
      "MessageId",
      "TraceId",
      "ValidationIssueId",
      "CandidateId",
      "TaskId",
      "AttachmentId",
      "ExecutionFrameId",
      "CustomOperationId",
      "HandoffId",
      "ISODateString",
      "JsonPrimitive",
      "JsonValue",
      "JsonObject",
      "Metadata",
      "LabelledEntity",
      "ConversationStatus",
      "FlowVersionStatus",
      "StepOutcome"
    ]
  },
  {
    "title": "Complete Symbol Index",
    "items": [
      "All root exports",
      "All runtime-support exports"
    ]
  }
] as const;

export const apiReferenceGroups: readonly ApiReferenceGroup[] = [
  {
    "title": "Runtime Entry Points",
    "summary": "Executable package functions and root import module developers call first.",
    "exports": [
      "createConversationEngine",
      "createConversationApi",
      "validateFlowDefinition"
    ],
    "entries": [
      {
        "name": "createConversationEngine",
        "kind": "function",
        "purpose": "Creates the Dialit runtime engine that starts conversations, processes user input, processes external events, persists state, emits events, and returns DecisionTrace data.",
        "usage": "Use it when your application owns repositories, handlers, semantic input providers, generated response providers, and direct turn processing.",
        "signatures": [
          "export function createConversationEngine(options?: CreateConversationEngineOptions): ConversationEngine & ConversationEngineModule;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "options",
            "type": "CreateConversationEngineOptions",
            "description": "Optional engine configuration, repositories, services, handlers, providers, clock, id generator, and initial flow versions.",
            "required": false
          }
        ],
        "returns": {
          "type": "ConversationEngine & ConversationEngineModule",
          "description": "Runtime facade plus access to repositories, services, and runtime context."
        },
        "example": "const engine = createConversationEngine({\n  flowVersions: [supportAssistantVersion],\n});",
        "related": []
      },
      {
        "name": "createConversationApi",
        "kind": "function",
        "purpose": "Wraps a ConversationEngine with transport-neutral methods that return HTTP-friendly response DTOs.",
        "usage": "Use it inside Express, Fastify, serverless, worker, or custom route handlers without coupling Dialit to a web framework.",
        "signatures": [
          "export function createConversationApi(source?: ConversationEngine | CreateConversationEngineOptions): ConversationApi;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "source",
            "type": "ConversationEngine | CreateConversationEngineOptions",
            "description": "Existing engine or options used to create one.",
            "required": false
          }
        ],
        "returns": {
          "type": "ConversationApi",
          "description": "API adapter with transport-friendly start, input, event, and response conversion methods."
        },
        "example": "const api = createConversationApi({\n  flowVersions: [supportAssistantVersion],\n});\n\nconst response = await api.start({\n  conversationId: \"conversation-1\",\n  flowVersionId: \"support_assistant_v1\",\n});",
        "related": [
          "ConversationEngine",
          "CreateConversationEngineOptions"
        ]
      },
      {
        "name": "validateFlowDefinition",
        "kind": "function",
        "purpose": "Validates a ConversationFlowDefinition before it is published, tested, or executed by the runtime.",
        "usage": "Run it in authoring tools and CI to catch broken step targets, missing variables, invalid response plans, missing extension registrations, and invalid custom operation references.",
        "signatures": [
          "export function validateFlowDefinition(flow: ConversationFlowDefinition, options?: FlowValidationOptions): FlowValidationReport;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "flow",
            "type": "ConversationFlowDefinition",
            "description": "Flow definition to validate.",
            "required": true
          },
          {
            "name": "options",
            "type": "FlowValidationOptions",
            "description": "Registered custom step, operation, normalizer, extractor, validator, and custom operation types.",
            "required": false
          }
        ],
        "returns": {
          "type": "FlowValidationReport",
          "description": "Validation report with valid and issues."
        },
        "example": "const report = validateFlowDefinition(flowVersion.definition, {\n  registeredStepTypes: [\"survey_rating\"],\n  registeredCustomOperationTypes: [\"create_support_ticket\"],\n});\n\nif (!report.valid) {\n  throw new Error(report.issues.map((issue) => issue.message).join(\"\\n\"));\n}",
        "related": [
          "ConversationFlowDefinition",
          "FlowValidationOptions"
        ]
      },
      {
        "name": "Root package",
        "kind": "module",
        "purpose": "Main import for runtime factories, validation, flow model types, runtime result types, and extension contracts.",
        "usage": "Import production runtime APIs and public type contracts from dialit. Keep runtime-support imports limited to helpers, local demos, and tests.",
        "fields": [
          "createConversationEngine",
          "createConversationApi",
          "validateFlowDefinition",
          "FlowVersion"
        ],
        "properties": [
          {
            "name": "createConversationEngine",
            "type": "function",
            "description": "Creates conversation engine from Root package.",
            "required": true
          },
          {
            "name": "createConversationApi",
            "type": "function",
            "description": "Creates conversation api from Root package.",
            "required": true
          },
          {
            "name": "validateFlowDefinition",
            "type": "function",
            "description": "validateFlowDefinition is the export member exposed by Root package.",
            "required": true
          },
          {
            "name": "FlowVersion",
            "type": "interface",
            "description": "FlowVersion is the export member exposed by Root package.",
            "required": true
          }
        ],
        "related": [
          "createConversationEngine",
          "createConversationApi",
          "validateFlowDefinition",
          "FlowVersion"
        ]
      }
    ]
  },
  {
    "title": "Flow Model",
    "summary": "Versioned flow contracts and deployable metadata.",
    "exports": [
      "ConversationFlowDefinition",
      "FlowSettings",
      "FlowVersion"
    ],
    "entries": [
      {
        "name": "ConversationFlowDefinition",
        "kind": "interface",
        "purpose": "ConversationFlowDefinition defines the flow model contract with flowId, startStepId, variables, steps, actions, customOperations.",
        "usage": "Use this contract when authoring, versioning, validating, or loading a conversation flow.",
        "signatures": [
          "export interface ConversationFlowDefinition extends LabelledEntity {\n    flowId: FlowId;\n    startStepId: StepId;\n    variables: VariableDefinition[];\n    steps: StepDefinition[];\n    actions?: ActionDefinition[];\n    customOperations?: CustomOperationDefinition[];\n    responses?: ResponseDefinition[];\n    settings?: FlowSettings;\n}"
        ],
        "fields": [
          "flowId",
          "startStepId",
          "variables",
          "steps",
          "actions",
          "customOperations",
          "responses",
          "settings",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "flowId",
            "type": "string",
            "description": "Stable flow identifier shared by a flow and its versions.",
            "required": true
          },
          {
            "name": "startStepId",
            "type": "string",
            "description": "Step id where a new conversation starts.",
            "required": true
          },
          {
            "name": "variables",
            "type": "VariableDefinition[]",
            "description": "Variable declarations available to the flow.",
            "required": true
          },
          {
            "name": "steps",
            "type": "StepDefinition[]",
            "description": "Executable step definitions in the flow.",
            "required": true
          },
          {
            "name": "actions",
            "type": "ActionDefinition[]",
            "description": "External action contracts available to run_action operations.",
            "required": false
          },
          {
            "name": "customOperations",
            "type": "CustomOperationDefinition[]",
            "description": "Custom operation contracts available to custom operations.",
            "required": false
          },
          {
            "name": "responses",
            "type": "ResponseDefinition[]",
            "description": "Reusable response definitions referenced by steps or operations.",
            "required": false
          },
          {
            "name": "settings",
            "type": "FlowSettings",
            "description": "Optional defaults and runtime limits for the flow.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by ConversationFlowDefinition.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by ConversationFlowDefinition.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "FlowId",
          "StepId",
          "Metadata",
          "LabelledEntity",
          "FlowSettings",
          "VariableDefinition",
          "ResponseDefinition",
          "ActionDefinition",
          "CustomOperationDefinition",
          "StepDefinition"
        ]
      },
      {
        "name": "FlowSettings",
        "kind": "interface",
        "purpose": "FlowSettings defines the flow model contract with defaultLocale, defaultChannel, maxTurns, maxStepExecutionsPerTurn, errorStepId.",
        "usage": "Use this contract when authoring, versioning, validating, or loading a conversation flow.",
        "signatures": [
          "export interface FlowSettings {\n    defaultLocale?: string;\n    defaultChannel?: string;\n    maxTurns?: number;\n    maxStepExecutionsPerTurn?: number;\n    errorStepId?: StepId;\n}"
        ],
        "fields": [
          "defaultLocale",
          "defaultChannel",
          "maxTurns",
          "maxStepExecutionsPerTurn",
          "errorStepId"
        ],
        "properties": [
          {
            "name": "defaultLocale",
            "type": "string",
            "description": "defaultLocale is the optional string member exposed by FlowSettings.",
            "required": false
          },
          {
            "name": "defaultChannel",
            "type": "string",
            "description": "defaultChannel is the optional string member exposed by FlowSettings.",
            "required": false
          },
          {
            "name": "maxTurns",
            "type": "number",
            "description": "maxTurns is the optional number member exposed by FlowSettings.",
            "required": false
          },
          {
            "name": "maxStepExecutionsPerTurn",
            "type": "number",
            "description": "maxStepExecutionsPerTurn is the optional number member exposed by FlowSettings.",
            "required": false
          },
          {
            "name": "errorStepId",
            "type": "string",
            "description": "errorStepId is the optional string member exposed by FlowSettings.",
            "required": false
          }
        ],
        "related": [
          "StepId"
        ]
      },
      {
        "name": "FlowVersion",
        "kind": "interface",
        "purpose": "FlowVersion defines the flow model contract with flowVersionId, flowId, version, status, definition, schemaVersion.",
        "usage": "Use this contract when authoring, versioning, validating, or loading a conversation flow.",
        "signatures": [
          "export interface FlowVersion extends LabelledEntity {\n    flowVersionId: FlowVersionId;\n    flowId: FlowId;\n    version: string;\n    status: FlowVersionStatus;\n    definition: ConversationFlowDefinition;\n    schemaVersion: string;\n    checksum?: string;\n    createdAt: ISODateString;\n    createdBy?: string;\n    publishedAt?: ISODateString;\n    publishedBy?: string;\n}"
        ],
        "fields": [
          "flowVersionId",
          "flowId",
          "version",
          "status",
          "definition",
          "schemaVersion",
          "checksum",
          "createdAt",
          "createdBy",
          "publishedAt",
          "publishedBy",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "flowVersionId is the string member exposed by FlowVersion.",
            "required": true
          },
          {
            "name": "flowId",
            "type": "string",
            "description": "Stable flow identifier shared by a flow and its versions.",
            "required": true
          },
          {
            "name": "version",
            "type": "string",
            "description": "version is the string member exposed by FlowVersion.",
            "required": true
          },
          {
            "name": "status",
            "type": "FlowVersionStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "definition",
            "type": "ConversationFlowDefinition",
            "description": "definition is the ConversationFlowDefinition member exposed by FlowVersion.",
            "required": true
          },
          {
            "name": "schemaVersion",
            "type": "string",
            "description": "schemaVersion is the string member exposed by FlowVersion.",
            "required": true
          },
          {
            "name": "checksum",
            "type": "string",
            "description": "checksum is the optional string member exposed by FlowVersion.",
            "required": false
          },
          {
            "name": "createdAt",
            "type": "string",
            "description": "ISO timestamp when the object was created.",
            "required": true
          },
          {
            "name": "createdBy",
            "type": "string",
            "description": "Creates d by from FlowVersion.",
            "required": false
          },
          {
            "name": "publishedAt",
            "type": "string",
            "description": "publishedAt is the optional string member exposed by FlowVersion.",
            "required": false
          },
          {
            "name": "publishedBy",
            "type": "string",
            "description": "publishedBy is the optional string member exposed by FlowVersion.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by FlowVersion.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by FlowVersion.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "FlowId",
          "FlowVersionId",
          "ISODateString",
          "Metadata",
          "LabelledEntity",
          "FlowVersionStatus",
          "ConversationFlowDefinition"
        ]
      }
    ]
  },
  {
    "title": "Variables and Value Expressions",
    "summary": "Conversation state values, patches, history, scopes, and declarative value inputs.",
    "exports": [
      "VariableType",
      "VariableDefinition",
      "VariableScope",
      "VariableValueSource",
      "VariableValue",
      "VariablePatchType",
      "VariablePatch",
      "BaseVariablePatch",
      "SetVariablePatch",
      "UnsetVariablePatch",
      "InvalidateVariablePatch",
      "VariableStoreSnapshot",
      "ScopedVariableValues",
      "VariableHistoryEntry",
      "ValueExpression",
      "LiteralValueExpression",
      "VariableValueExpression",
      "TemplateValueExpression",
      "ContextValueExpression"
    ],
    "entries": [
      {
        "name": "VariableType",
        "kind": "union type",
        "purpose": "Declares the intended value category for a VariableDefinition.",
        "usage": "Use it to describe expected values such as string, number, boolean, date, enum, object, array, file, or json before runtime writes occur.",
        "signatures": [
          "export type VariableType = \"string\" | \"number\" | \"integer\" | \"boolean\" | \"date\" | \"datetime\" | \"email\" | \"phone\" | \"enum\" | \"object\" | \"array\" | \"file\" | \"json\";"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "| \"string\"\n    | \"number\"\n    | \"integer\"\n    | \"boolean\"\n    | \"date\"\n    | \"datetime\"\n    | \"email\"\n    | \"phone\"\n    | \"enum\"\n    | \"object\"\n    | \"array\"\n    | \"file\"\n    | \"json\"",
            "description": "VariableType accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "VariableDefinition",
        "kind": "interface",
        "purpose": "VariableDefinition defines the variables and value expressions contract with variableId, type, scope, required, sensitive, defaultValue.",
        "usage": "Use this contract when declaring state, reading state, writing patches, or expressing values without hidden runtime code.",
        "signatures": [
          "export interface VariableDefinition extends LabelledEntity {\n    variableId: VariableId;\n    type: VariableType;\n    scope?: VariableScope;\n    required?: boolean;\n    sensitive?: boolean;\n    defaultValue?: unknown;\n    enumValues?: string[];\n    validators?: ValidatorDefinition[];\n}"
        ],
        "fields": [
          "variableId",
          "type",
          "scope",
          "required",
          "sensitive",
          "defaultValue",
          "enumValues",
          "validators",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "variableId",
            "type": "string",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "type",
            "type": "VariableType",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "scope is the optional VariableScope member exposed by VariableDefinition.",
            "required": false
          },
          {
            "name": "required",
            "type": "boolean",
            "description": "required is the optional boolean member exposed by VariableDefinition.",
            "required": false
          },
          {
            "name": "sensitive",
            "type": "boolean",
            "description": "sensitive is the optional boolean member exposed by VariableDefinition.",
            "required": false
          },
          {
            "name": "defaultValue",
            "type": "unknown",
            "description": "defaultValue is the optional unknown member exposed by VariableDefinition.",
            "required": false
          },
          {
            "name": "enumValues",
            "type": "string[]",
            "description": "enumValues is the optional string[] member exposed by VariableDefinition.",
            "required": false
          },
          {
            "name": "validators",
            "type": "ValidatorDefinition[]",
            "description": "validators is the optional ValidatorDefinition[] member exposed by VariableDefinition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by VariableDefinition.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by VariableDefinition.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "Metadata",
          "LabelledEntity",
          "VariableType",
          "VariableScope",
          "ValidatorDefinition"
        ]
      },
      {
        "name": "VariableScope",
        "kind": "union type",
        "purpose": "Defines where a VariableValue lives: conversation, flow, operation, or system scope.",
        "usage": "Use it on variable declarations, initial variables, reads, writes, patches, and flow-call sharing rules to prevent accidental state bleed.",
        "signatures": [
          "export type VariableScope = \"conversation\" | \"flow\" | \"operation\" | \"system\";"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "| \"conversation\"\n    | \"flow\"\n    | \"operation\"\n    | \"system\"",
            "description": "VariableScope accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "VariableValueSource",
        "kind": "union type",
        "purpose": "VariableValueSource is the public union in Variables and Value Expressions that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when declaring state, reading state, writing patches, or expressing values without hidden runtime code.",
        "signatures": [
          "export type VariableValueSource = \"user_input\" | \"menu_selection\" | \"attachment\" | \"action_result\" | \"operation\" | \"semantic_input_task\" | \"llm_response_generation\" | \"system\" | \"flow_call\";"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "| \"user_input\"\n    | \"menu_selection\"\n    | \"attachment\"\n    | \"action_result\"\n    | \"operation\"\n    | \"semantic_input_task\"\n    | \"llm_response_generation\"\n    | \"system\"\n    | \"flow_call\"",
            "description": "VariableValueSource accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "VariableValue",
        "kind": "interface",
        "purpose": "VariableValue defines the variables and value expressions contract with variableId, scope, value, source, updatedAt, valid.",
        "usage": "Use this contract when declaring state, reading state, writing patches, or expressing values without hidden runtime code.",
        "signatures": [
          "export interface VariableValue<TVariableId extends VariableId = VariableId> {\n    variableId: TVariableId;\n    scope: VariableScope;\n    value: unknown;\n    source?: VariableValueSource;\n    updatedAt?: ISODateString;\n    valid?: boolean;\n    invalidatedAt?: ISODateString;\n    invalidationReason?: string;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "variableId",
          "scope",
          "value",
          "source",
          "updatedAt",
          "valid",
          "invalidatedAt",
          "invalidationReason",
          "metadata"
        ],
        "properties": [
          {
            "name": "variableId",
            "type": "TVariableId",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "scope is the VariableScope member exposed by VariableValue.",
            "required": true
          },
          {
            "name": "value",
            "type": "unknown",
            "description": "value is the unknown member exposed by VariableValue.",
            "required": true
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Runtime source that produced a value, patch, or trace fragment.",
            "required": false
          },
          {
            "name": "updatedAt",
            "type": "string",
            "description": "ISO timestamp for the last update.",
            "required": false
          },
          {
            "name": "valid",
            "type": "boolean",
            "description": "Whether validation or model checking succeeded.",
            "required": false
          },
          {
            "name": "invalidatedAt",
            "type": "string",
            "description": "invalidatedAt is the optional string member exposed by VariableValue.",
            "required": false
          },
          {
            "name": "invalidationReason",
            "type": "string",
            "description": "invalidationReason is the optional string member exposed by VariableValue.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "ISODateString",
          "Metadata",
          "VariableScope",
          "VariableValueSource"
        ]
      },
      {
        "name": "VariablePatchType",
        "kind": "union type",
        "purpose": "VariablePatchType is the public union in Variables and Value Expressions that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when declaring state, reading state, writing patches, or expressing values without hidden runtime code.",
        "signatures": [
          "export type VariablePatchType = \"set\" | \"unset\" | \"invalidate\";"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "\"set\" | \"unset\" | \"invalidate\"",
            "description": "VariablePatchType accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "VariablePatch",
        "kind": "union type",
        "purpose": "VariablePatch is the public union in Variables and Value Expressions that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when declaring state, reading state, writing patches, or expressing values without hidden runtime code.",
        "signatures": [
          "export type VariablePatch<TVariableId extends VariableId = VariableId> = SetVariablePatch<TVariableId> | UnsetVariablePatch<TVariableId> | InvalidateVariablePatch<TVariableId>;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "| SetVariablePatch<TVariableId>\n    | UnsetVariablePatch<TVariableId>\n    | InvalidateVariablePatch<TVariableId>",
            "description": "VariablePatch resolves to | SetVariablePatch<TVariableId>\n    | UnsetVariablePatch<TVariableId>\n    | InvalidateVariablePatch<TVariableId>.",
            "required": true
          }
        ],
        "related": [
          "VariableId",
          "SetVariablePatch",
          "UnsetVariablePatch",
          "InvalidateVariablePatch"
        ]
      },
      {
        "name": "BaseVariablePatch",
        "kind": "interface",
        "purpose": "BaseVariablePatch defines the variables and value expressions contract with type, variableId, scope, source, metadata.",
        "usage": "Use this contract when declaring state, reading state, writing patches, or expressing values without hidden runtime code.",
        "signatures": [
          "export interface BaseVariablePatch<TType extends VariablePatchType, TVariableId extends VariableId = VariableId> {\n    type: TType;\n    variableId: TVariableId;\n    scope?: VariableScope;\n    source: VariableValueSource;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "type",
          "variableId",
          "scope",
          "source",
          "metadata"
        ],
        "properties": [
          {
            "name": "type",
            "type": "TType",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "TVariableId",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "scope is the optional VariableScope member exposed by BaseVariablePatch.",
            "required": false
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Runtime source that produced a value, patch, or trace fragment.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "Metadata",
          "VariableScope",
          "VariableValueSource",
          "VariablePatchType"
        ]
      },
      {
        "name": "SetVariablePatch",
        "kind": "interface",
        "purpose": "SetVariablePatch defines the variables and value expressions contract with value, type, variableId, scope, source, metadata.",
        "usage": "Use this contract when declaring state, reading state, writing patches, or expressing values without hidden runtime code.",
        "signatures": [
          "export interface SetVariablePatch<TVariableId extends VariableId = VariableId> extends BaseVariablePatch<\"set\", TVariableId> {\n    value: unknown;\n}"
        ],
        "fields": [
          "value",
          "type",
          "variableId",
          "scope",
          "source",
          "metadata"
        ],
        "properties": [
          {
            "name": "value",
            "type": "unknown",
            "description": "value is the unknown member exposed by SetVariablePatch.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"set\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "TVariableId",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "scope is the optional VariableScope member exposed by SetVariablePatch.",
            "required": false
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Runtime source that produced a value, patch, or trace fragment.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "Metadata",
          "VariableScope",
          "VariableValueSource",
          "BaseVariablePatch"
        ]
      },
      {
        "name": "UnsetVariablePatch",
        "kind": "interface",
        "purpose": "UnsetVariablePatch defines the variables and value expressions contract with type, variableId, scope, source, metadata.",
        "usage": "Use this contract when declaring state, reading state, writing patches, or expressing values without hidden runtime code.",
        "signatures": [
          "export interface UnsetVariablePatch<TVariableId extends VariableId = VariableId> extends BaseVariablePatch<\"unset\", TVariableId> {\n}"
        ],
        "fields": [
          "type",
          "variableId",
          "scope",
          "source",
          "metadata"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"unset\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "TVariableId",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "scope is the optional VariableScope member exposed by UnsetVariablePatch.",
            "required": false
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Runtime source that produced a value, patch, or trace fragment.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "Metadata",
          "VariableScope",
          "VariableValueSource",
          "BaseVariablePatch"
        ]
      },
      {
        "name": "InvalidateVariablePatch",
        "kind": "interface",
        "purpose": "InvalidateVariablePatch defines the variables and value expressions contract with reason, type, variableId, scope, source, metadata.",
        "usage": "Use this contract when declaring state, reading state, writing patches, or expressing values without hidden runtime code.",
        "signatures": [
          "export interface InvalidateVariablePatch<TVariableId extends VariableId = VariableId> extends BaseVariablePatch<\"invalidate\", TVariableId> {\n    reason?: string;\n}"
        ],
        "fields": [
          "reason",
          "type",
          "variableId",
          "scope",
          "source",
          "metadata"
        ],
        "properties": [
          {
            "name": "reason",
            "type": "string",
            "description": "Human-readable reason for rejection, invalidation, handoff, or trace output.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"invalidate\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "TVariableId",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "scope is the optional VariableScope member exposed by InvalidateVariablePatch.",
            "required": false
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Runtime source that produced a value, patch, or trace fragment.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "Metadata",
          "VariableScope",
          "VariableValueSource",
          "BaseVariablePatch"
        ]
      },
      {
        "name": "VariableStoreSnapshot",
        "kind": "interface",
        "purpose": "VariableStoreSnapshot defines the variables and value expressions contract with values, history.",
        "usage": "Use this contract when declaring state, reading state, writing patches, or expressing values without hidden runtime code.",
        "signatures": [
          "export interface VariableStoreSnapshot {\n    values: ScopedVariableValues;\n    history?: VariableHistoryEntry[];\n}"
        ],
        "fields": [
          "values",
          "history"
        ],
        "properties": [
          {
            "name": "values",
            "type": "ScopedVariableValues",
            "description": "values is the ScopedVariableValues member exposed by VariableStoreSnapshot.",
            "required": true
          },
          {
            "name": "history",
            "type": "VariableHistoryEntry<string>[]",
            "description": "history is the optional VariableHistoryEntry<string>[] member exposed by VariableStoreSnapshot.",
            "required": false
          }
        ],
        "related": [
          "ScopedVariableValues",
          "VariableHistoryEntry"
        ]
      },
      {
        "name": "ScopedVariableValues",
        "kind": "type",
        "purpose": "ScopedVariableValues is a public type in Variables and Value Expressions.",
        "usage": "Use this contract when declaring state, reading state, writing patches, or expressing values without hidden runtime code.",
        "signatures": [
          "export type ScopedVariableValues = Record<VariableScope, Record<VariableId, VariableValue>>;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "Record<VariableScope, Record<VariableId, VariableValue>>",
            "description": "ScopedVariableValues resolves to Record<VariableScope, Record<VariableId, VariableValue>>.",
            "required": true
          }
        ],
        "related": [
          "VariableId",
          "VariableScope",
          "VariableValue"
        ]
      },
      {
        "name": "VariableHistoryEntry",
        "kind": "interface",
        "purpose": "VariableHistoryEntry defines the variables and value expressions contract with variableId, scope, previousValue, nextValue, patchType, source.",
        "usage": "Use this contract when declaring state, reading state, writing patches, or expressing values without hidden runtime code.",
        "signatures": [
          "export interface VariableHistoryEntry<TVariableId extends VariableId = VariableId> {\n    variableId: TVariableId;\n    scope: VariableScope;\n    previousValue?: unknown;\n    nextValue?: unknown;\n    patchType: VariablePatchType;\n    source: VariableValueSource;\n    conversationId: ConversationId;\n    flowVersionId: FlowVersionId;\n    frameId?: ExecutionFrameId;\n    stepId?: StepId;\n    turnId?: TurnId;\n    operationId?: OperationId;\n    changedAt: ISODateString;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "variableId",
          "scope",
          "previousValue",
          "nextValue",
          "patchType",
          "source",
          "conversationId",
          "flowVersionId",
          "frameId",
          "stepId",
          "turnId",
          "operationId",
          "changedAt",
          "metadata"
        ],
        "properties": [
          {
            "name": "variableId",
            "type": "TVariableId",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "scope is the VariableScope member exposed by VariableHistoryEntry.",
            "required": true
          },
          {
            "name": "previousValue",
            "type": "unknown",
            "description": "previousValue is the optional unknown member exposed by VariableHistoryEntry.",
            "required": false
          },
          {
            "name": "nextValue",
            "type": "unknown",
            "description": "nextValue is the optional unknown member exposed by VariableHistoryEntry.",
            "required": false
          },
          {
            "name": "patchType",
            "type": "VariablePatchType",
            "description": "patchType is the VariablePatchType member exposed by VariableHistoryEntry.",
            "required": true
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Runtime source that produced a value, patch, or trace fragment.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "flowVersionId is the string member exposed by VariableHistoryEntry.",
            "required": true
          },
          {
            "name": "frameId",
            "type": "string",
            "description": "frameId is the optional string member exposed by VariableHistoryEntry.",
            "required": false
          },
          {
            "name": "stepId",
            "type": "string",
            "description": "stepId is the optional string member exposed by VariableHistoryEntry.",
            "required": false
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "operationId is the optional string member exposed by VariableHistoryEntry.",
            "required": false
          },
          {
            "name": "changedAt",
            "type": "string",
            "description": "changedAt is the string member exposed by VariableHistoryEntry.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "FlowVersionId",
          "StepId",
          "VariableId",
          "OperationId",
          "ConversationId",
          "TurnId",
          "ExecutionFrameId",
          "ISODateString",
          "Metadata",
          "VariableScope"
        ]
      },
      {
        "name": "ValueExpression",
        "kind": "union type",
        "purpose": "ValueExpression is the public union in Variables and Value Expressions that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when declaring state, reading state, writing patches, or expressing values without hidden runtime code.",
        "signatures": [
          "export type ValueExpression = LiteralValueExpression | VariableValueExpression | TemplateValueExpression | ContextValueExpression;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "| LiteralValueExpression\n    | VariableValueExpression\n    | TemplateValueExpression\n    | ContextValueExpression",
            "description": "ValueExpression resolves to | LiteralValueExpression\n    | VariableValueExpression\n    | TemplateValueExpression\n    | ContextValueExpression.",
            "required": true
          }
        ],
        "related": [
          "LiteralValueExpression",
          "VariableValueExpression",
          "TemplateValueExpression",
          "ContextValueExpression"
        ]
      },
      {
        "name": "LiteralValueExpression",
        "kind": "interface",
        "purpose": "LiteralValueExpression defines the variables and value expressions contract with type, value.",
        "usage": "Use this contract when declaring state, reading state, writing patches, or expressing values without hidden runtime code.",
        "signatures": [
          "export interface LiteralValueExpression {\n    type: \"literal\";\n    value: unknown;\n}"
        ],
        "fields": [
          "type",
          "value"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"literal\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "value",
            "type": "unknown",
            "description": "value is the unknown member exposed by LiteralValueExpression.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "VariableValueExpression",
        "kind": "interface",
        "purpose": "VariableValueExpression defines the variables and value expressions contract with type, variableId.",
        "usage": "Use this contract when declaring state, reading state, writing patches, or expressing values without hidden runtime code.",
        "signatures": [
          "export interface VariableValueExpression {\n    type: \"variable\";\n    variableId: VariableId;\n}"
        ],
        "fields": [
          "type",
          "variableId"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"variable\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "string",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          }
        ],
        "related": [
          "VariableId"
        ]
      },
      {
        "name": "TemplateValueExpression",
        "kind": "interface",
        "purpose": "TemplateValueExpression defines the variables and value expressions contract with type, template, variableIds.",
        "usage": "Use this contract when declaring state, reading state, writing patches, or expressing values without hidden runtime code.",
        "signatures": [
          "export interface TemplateValueExpression {\n    type: \"template\";\n    template: string;\n    variableIds?: VariableId[];\n}"
        ],
        "fields": [
          "type",
          "template",
          "variableIds"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"template\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "template",
            "type": "string",
            "description": "template is the string member exposed by TemplateValueExpression.",
            "required": true
          },
          {
            "name": "variableIds",
            "type": "string[]",
            "description": "variableIds is the optional string[] member exposed by TemplateValueExpression.",
            "required": false
          }
        ],
        "related": [
          "VariableId"
        ]
      },
      {
        "name": "ContextValueExpression",
        "kind": "interface",
        "purpose": "ContextValueExpression defines the variables and value expressions contract with type, path.",
        "usage": "Use this contract when declaring state, reading state, writing patches, or expressing values without hidden runtime code.",
        "signatures": [
          "export interface ContextValueExpression {\n    type: \"context\";\n    path: string;\n}"
        ],
        "fields": [
          "type",
          "path"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"context\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "path",
            "type": "string",
            "description": "path is the string member exposed by ContextValueExpression.",
            "required": true
          }
        ],
        "related": []
      }
    ]
  },
  {
    "title": "Responses",
    "summary": "Outbound response plans and generated text contracts.",
    "exports": [
      "ResponseDefinition",
      "ResponsePlan",
      "StaticResponsePlan",
      "TemplateResponsePlan",
      "GeneratedResponsePlan",
      "ResponseReferencePlan",
      "ResponseStyle"
    ],
    "entries": [
      {
        "name": "ResponseDefinition",
        "kind": "interface",
        "purpose": "ResponseDefinition defines the responses contract with responseId, plan, label, description, metadata.",
        "usage": "Use this contract when rendering outbound text or delegating controlled response generation to a provider.",
        "signatures": [
          "export interface ResponseDefinition extends LabelledEntity {\n    responseId: ResponseId;\n    plan: ResponsePlan;\n}"
        ],
        "fields": [
          "responseId",
          "plan",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "responseId",
            "type": "string",
            "description": "Reusable response identifier associated with the message.",
            "required": true
          },
          {
            "name": "plan",
            "type": "ResponsePlan",
            "description": "plan is the ResponsePlan member exposed by ResponseDefinition.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by ResponseDefinition.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by ResponseDefinition.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "ResponseId",
          "Metadata",
          "LabelledEntity",
          "ResponsePlan"
        ]
      },
      {
        "name": "ResponsePlan",
        "kind": "union type",
        "purpose": "ResponsePlan is the public union in Responses that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when rendering outbound text or delegating controlled response generation to a provider.",
        "signatures": [
          "export type ResponsePlan = StaticResponsePlan | TemplateResponsePlan | GeneratedResponsePlan | ResponseReferencePlan;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "| StaticResponsePlan\n    | TemplateResponsePlan\n    | GeneratedResponsePlan\n    | ResponseReferencePlan",
            "description": "ResponsePlan resolves to | StaticResponsePlan\n    | TemplateResponsePlan\n    | GeneratedResponsePlan\n    | ResponseReferencePlan.",
            "required": true
          }
        ],
        "related": [
          "StaticResponsePlan",
          "TemplateResponsePlan",
          "GeneratedResponsePlan",
          "ResponseReferencePlan"
        ]
      },
      {
        "name": "StaticResponsePlan",
        "kind": "interface",
        "purpose": "StaticResponsePlan defines the responses contract with mode, text, channelPayload.",
        "usage": "Use this contract when rendering outbound text or delegating controlled response generation to a provider.",
        "signatures": [
          "export interface StaticResponsePlan {\n    mode: \"static\";\n    text: string;\n    channelPayload?: JsonObject;\n}"
        ],
        "fields": [
          "mode",
          "text",
          "channelPayload"
        ],
        "properties": [
          {
            "name": "mode",
            "type": "\"static\"",
            "description": "mode is the \"static\" member exposed by StaticResponsePlan.",
            "required": true
          },
          {
            "name": "text",
            "type": "string",
            "description": "Text content sent by a user or returned to a user.",
            "required": true
          },
          {
            "name": "channelPayload",
            "type": "JsonObject",
            "description": "channelPayload is the optional JsonObject member exposed by StaticResponsePlan.",
            "required": false
          }
        ],
        "related": [
          "JsonObject"
        ]
      },
      {
        "name": "TemplateResponsePlan",
        "kind": "interface",
        "purpose": "TemplateResponsePlan defines the responses contract with mode, template, variableIds, channelPayload.",
        "usage": "Use this contract when rendering outbound text or delegating controlled response generation to a provider.",
        "signatures": [
          "export interface TemplateResponsePlan {\n    mode: \"template\";\n    template: string;\n    variableIds?: VariableId[];\n    channelPayload?: JsonObject;\n}"
        ],
        "fields": [
          "mode",
          "template",
          "variableIds",
          "channelPayload"
        ],
        "properties": [
          {
            "name": "mode",
            "type": "\"template\"",
            "description": "mode is the \"template\" member exposed by TemplateResponsePlan.",
            "required": true
          },
          {
            "name": "template",
            "type": "string",
            "description": "template is the string member exposed by TemplateResponsePlan.",
            "required": true
          },
          {
            "name": "variableIds",
            "type": "string[]",
            "description": "variableIds is the optional string[] member exposed by TemplateResponsePlan.",
            "required": false
          },
          {
            "name": "channelPayload",
            "type": "JsonObject",
            "description": "channelPayload is the optional JsonObject member exposed by TemplateResponsePlan.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "JsonObject"
        ]
      },
      {
        "name": "GeneratedResponsePlan",
        "kind": "interface",
        "purpose": "GeneratedResponsePlan defines the responses contract with mode, goal, allowedVariableIds, constraints, style, maxLength.",
        "usage": "Use this contract when rendering outbound text or delegating controlled response generation to a provider.",
        "signatures": [
          "export interface GeneratedResponsePlan<TVariableId extends VariableId = VariableId> {\n    mode: \"generated\";\n    goal: string;\n    allowedVariableIds: readonly TVariableId[];\n    constraints?: string[];\n    style?: ResponseStyle;\n    maxLength?: number;\n    fallbackText: string;\n}"
        ],
        "fields": [
          "mode",
          "goal",
          "allowedVariableIds",
          "constraints",
          "style",
          "maxLength",
          "fallbackText"
        ],
        "properties": [
          {
            "name": "mode",
            "type": "\"generated\"",
            "description": "mode is the \"generated\" member exposed by GeneratedResponsePlan.",
            "required": true
          },
          {
            "name": "goal",
            "type": "string",
            "description": "goal is the string member exposed by GeneratedResponsePlan.",
            "required": true
          },
          {
            "name": "allowedVariableIds",
            "type": "readonly TVariableId[]",
            "description": "allowedVariableIds is the readonly TVariableId[] member exposed by GeneratedResponsePlan.",
            "required": true
          },
          {
            "name": "constraints",
            "type": "string[]",
            "description": "constraints is the optional string[] member exposed by GeneratedResponsePlan.",
            "required": false
          },
          {
            "name": "style",
            "type": "ResponseStyle",
            "description": "style is the optional ResponseStyle member exposed by GeneratedResponsePlan.",
            "required": false
          },
          {
            "name": "maxLength",
            "type": "number",
            "description": "maxLength is the optional number member exposed by GeneratedResponsePlan.",
            "required": false
          },
          {
            "name": "fallbackText",
            "type": "string",
            "description": "fallbackText is the string member exposed by GeneratedResponsePlan.",
            "required": true
          }
        ],
        "related": [
          "VariableId",
          "ResponseStyle"
        ]
      },
      {
        "name": "ResponseReferencePlan",
        "kind": "interface",
        "purpose": "ResponseReferencePlan defines the responses contract with mode, responseId.",
        "usage": "Use this contract when rendering outbound text or delegating controlled response generation to a provider.",
        "signatures": [
          "export interface ResponseReferencePlan {\n    mode: \"reference\";\n    responseId: ResponseId;\n}"
        ],
        "fields": [
          "mode",
          "responseId"
        ],
        "properties": [
          {
            "name": "mode",
            "type": "\"reference\"",
            "description": "mode is the \"reference\" member exposed by ResponseReferencePlan.",
            "required": true
          },
          {
            "name": "responseId",
            "type": "string",
            "description": "Reusable response identifier associated with the message.",
            "required": true
          }
        ],
        "related": [
          "ResponseId"
        ]
      },
      {
        "name": "ResponseStyle",
        "kind": "interface",
        "purpose": "ResponseStyle defines the responses contract with tone, language, persona.",
        "usage": "Use this contract when rendering outbound text or delegating controlled response generation to a provider.",
        "signatures": [
          "export interface ResponseStyle {\n    tone?: \"neutral\" | \"friendly\" | \"formal\" | \"concise\";\n    language?: string;\n    persona?: string;\n}"
        ],
        "fields": [
          "tone",
          "language",
          "persona"
        ],
        "properties": [
          {
            "name": "tone",
            "type": "\"neutral\" | \"friendly\" | \"formal\" | \"concise\"",
            "description": "tone is the optional \"neutral\" | \"friendly\" | \"formal\" | \"concise\" member exposed by ResponseStyle.",
            "required": false
          },
          {
            "name": "language",
            "type": "string",
            "description": "language is the optional string member exposed by ResponseStyle.",
            "required": false
          },
          {
            "name": "persona",
            "type": "string",
            "description": "persona is the optional string member exposed by ResponseStyle.",
            "required": false
          }
        ],
        "related": []
      }
    ]
  },
  {
    "title": "Actions and Custom Operations",
    "summary": "Declared external work and application-specific operation contracts.",
    "exports": [
      "ActionKind",
      "ActionDefinition",
      "ActionResultStatus",
      "ActionResult",
      "CustomOperationDefinition",
      "CustomOperationTraceContract"
    ],
    "entries": [
      {
        "name": "ActionKind",
        "kind": "union type",
        "purpose": "ActionKind is the public union in Actions and Custom Operations that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when external application work must be declared, executed, mapped, and routed explicitly.",
        "signatures": [
          "export type ActionKind = \"local\" | \"http\" | \"queue\" | \"tool\" | \"webhook\" | string;"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "| \"local\"\n    | \"http\"\n    | \"queue\"\n    | \"tool\"\n    | \"webhook\"\n    | string",
            "description": "ActionKind accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "ActionDefinition",
        "kind": "interface",
        "purpose": "ActionDefinition defines the actions and custom operations contract with actionId, kind, inputSchema, outputSchema, resultOutcomes, errorCodes.",
        "usage": "Use this contract when external application work must be declared, executed, mapped, and routed explicitly.",
        "signatures": [
          "export interface ActionDefinition extends LabelledEntity {\n    actionId: ActionId;\n    kind: ActionKind;\n    inputSchema?: JsonObject;\n    outputSchema?: JsonObject;\n    resultOutcomes?: StepOutcome[];\n    errorCodes?: string[];\n    sideEffect?: boolean;\n    timeoutMs?: number;\n    config?: JsonObject;\n}"
        ],
        "fields": [
          "actionId",
          "kind",
          "inputSchema",
          "outputSchema",
          "resultOutcomes",
          "errorCodes",
          "sideEffect",
          "timeoutMs",
          "config",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "actionId",
            "type": "string",
            "description": "actionId is the string member exposed by ActionDefinition.",
            "required": true
          },
          {
            "name": "kind",
            "type": "string",
            "description": "kind is the string member exposed by ActionDefinition.",
            "required": true
          },
          {
            "name": "inputSchema",
            "type": "JsonObject",
            "description": "inputSchema is the optional JsonObject member exposed by ActionDefinition.",
            "required": false
          },
          {
            "name": "outputSchema",
            "type": "JsonObject",
            "description": "outputSchema is the optional JsonObject member exposed by ActionDefinition.",
            "required": false
          },
          {
            "name": "resultOutcomes",
            "type": "string[]",
            "description": "resultOutcomes is the optional string[] member exposed by ActionDefinition.",
            "required": false
          },
          {
            "name": "errorCodes",
            "type": "string[]",
            "description": "errorCodes is the optional string[] member exposed by ActionDefinition.",
            "required": false
          },
          {
            "name": "sideEffect",
            "type": "boolean",
            "description": "sideEffect is the optional boolean member exposed by ActionDefinition.",
            "required": false
          },
          {
            "name": "timeoutMs",
            "type": "number",
            "description": "timeoutMs is the optional number member exposed by ActionDefinition.",
            "required": false
          },
          {
            "name": "config",
            "type": "JsonObject",
            "description": "config is the optional JsonObject member exposed by ActionDefinition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by ActionDefinition.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by ActionDefinition.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "ActionId",
          "JsonObject",
          "Metadata",
          "LabelledEntity",
          "StepOutcome",
          "ActionKind"
        ]
      },
      {
        "name": "ActionResultStatus",
        "kind": "union type",
        "purpose": "ActionResultStatus is the public union in Actions and Custom Operations that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when external application work must be declared, executed, mapped, and routed explicitly.",
        "signatures": [
          "export type ActionResultStatus = \"success\" | \"error\" | \"timeout\" | \"cancelled\";"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "| \"success\"\n    | \"error\"\n    | \"timeout\"\n    | \"cancelled\"",
            "description": "ActionResultStatus accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "ActionResult",
        "kind": "interface",
        "purpose": "ActionResult defines the actions and custom operations contract with status, outcome, outputs, errorCode, errorMessage, raw.",
        "usage": "Use ActionResult to inspect the structured outcome returned by the corresponding runtime, validation, or provider operation.",
        "signatures": [
          "export interface ActionResult {\n    status: ActionResultStatus;\n    outcome?: StepOutcome;\n    outputs?: Record<string, unknown>;\n    errorCode?: string;\n    errorMessage?: string;\n    raw?: unknown;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "status",
          "outcome",
          "outputs",
          "errorCode",
          "errorMessage",
          "raw",
          "metadata"
        ],
        "properties": [
          {
            "name": "status",
            "type": "ActionResultStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": false
          },
          {
            "name": "outputs",
            "type": "Record<string, unknown>",
            "description": "outputs is the optional Record<string, unknown> member exposed by ActionResult.",
            "required": false
          },
          {
            "name": "errorCode",
            "type": "string",
            "description": "Application or runtime error code.",
            "required": false
          },
          {
            "name": "errorMessage",
            "type": "string",
            "description": "errorMessage is the optional string member exposed by ActionResult.",
            "required": false
          },
          {
            "name": "raw",
            "type": "unknown",
            "description": "raw is the optional unknown member exposed by ActionResult.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "StepOutcome",
          "ActionResultStatus"
        ]
      },
      {
        "name": "CustomOperationDefinition",
        "kind": "interface",
        "purpose": "CustomOperationDefinition defines the actions and custom operations contract with customOperationId, customType, inputSchema, outputSchema, allowedOutcomes, errorCodes.",
        "usage": "Use this contract when external application work must be declared, executed, mapped, and routed explicitly.",
        "signatures": [
          "export interface CustomOperationDefinition extends LabelledEntity {\n    customOperationId: CustomOperationId;\n    customType: string;\n    inputSchema?: JsonObject;\n    outputSchema?: JsonObject;\n    allowedOutcomes: StepOutcome[];\n    errorCodes?: string[];\n    configSchema?: JsonObject;\n    traceContract?: CustomOperationTraceContract;\n}"
        ],
        "fields": [
          "customOperationId",
          "customType",
          "inputSchema",
          "outputSchema",
          "allowedOutcomes",
          "errorCodes",
          "configSchema",
          "traceContract",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "customOperationId",
            "type": "string",
            "description": "customOperationId is the string member exposed by CustomOperationDefinition.",
            "required": true
          },
          {
            "name": "customType",
            "type": "string",
            "description": "customType is the string member exposed by CustomOperationDefinition.",
            "required": true
          },
          {
            "name": "inputSchema",
            "type": "JsonObject",
            "description": "inputSchema is the optional JsonObject member exposed by CustomOperationDefinition.",
            "required": false
          },
          {
            "name": "outputSchema",
            "type": "JsonObject",
            "description": "outputSchema is the optional JsonObject member exposed by CustomOperationDefinition.",
            "required": false
          },
          {
            "name": "allowedOutcomes",
            "type": "string[]",
            "description": "allowedOutcomes is the string[] member exposed by CustomOperationDefinition.",
            "required": true
          },
          {
            "name": "errorCodes",
            "type": "string[]",
            "description": "errorCodes is the optional string[] member exposed by CustomOperationDefinition.",
            "required": false
          },
          {
            "name": "configSchema",
            "type": "JsonObject",
            "description": "configSchema is the optional JsonObject member exposed by CustomOperationDefinition.",
            "required": false
          },
          {
            "name": "traceContract",
            "type": "CustomOperationTraceContract",
            "description": "traceContract is the optional CustomOperationTraceContract member exposed by CustomOperationDefinition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by CustomOperationDefinition.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by CustomOperationDefinition.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "CustomOperationId",
          "JsonObject",
          "Metadata",
          "LabelledEntity",
          "StepOutcome",
          "CustomOperationTraceContract"
        ]
      },
      {
        "name": "CustomOperationTraceContract",
        "kind": "interface",
        "purpose": "CustomOperationTraceContract defines the actions and custom operations contract with expectedSources, requiredDataKeys.",
        "usage": "Use this contract when external application work must be declared, executed, mapped, and routed explicitly.",
        "signatures": [
          "export interface CustomOperationTraceContract {\n    expectedSources?: string[];\n    requiredDataKeys?: string[];\n}"
        ],
        "fields": [
          "expectedSources",
          "requiredDataKeys"
        ],
        "properties": [
          {
            "name": "expectedSources",
            "type": "string[]",
            "description": "expectedSources is the optional string[] member exposed by CustomOperationTraceContract.",
            "required": false
          },
          {
            "name": "requiredDataKeys",
            "type": "string[]",
            "description": "requiredDataKeys is the optional string[] member exposed by CustomOperationTraceContract.",
            "required": false
          }
        ],
        "related": []
      }
    ]
  },
  {
    "title": "Conditions",
    "summary": "Traceable condition expressions and condition step routing.",
    "exports": [
      "ConditionExpression",
      "EqualsCondition",
      "NotEqualsCondition",
      "ExistsCondition",
      "NotExistsCondition",
      "GreaterThanCondition",
      "LessThanCondition",
      "IncludesCondition",
      "MatchesRegexCondition",
      "AndCondition",
      "OrCondition",
      "NotCondition",
      "ConditionEvaluationResult"
    ],
    "entries": [
      {
        "name": "ConditionExpression",
        "kind": "union type",
        "purpose": "ConditionExpression is the public union in Conditions that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when business routing should remain visible in flow data and decision traces.",
        "signatures": [
          "export type ConditionExpression = EqualsCondition | NotEqualsCondition | ExistsCondition | NotExistsCondition | GreaterThanCondition | LessThanCondition | IncludesCondition | MatchesRegexCondition | AndCondition | OrCondition | NotCondition;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "| EqualsCondition\n    | NotEqualsCondition\n    | ExistsCondition\n    | NotExistsCondition\n    | GreaterThanCondition\n    | LessThanCondition\n    | IncludesCondition\n    | MatchesRegexCondition\n    | AndCondition\n    | OrCondition\n    | NotCondition",
            "description": "ConditionExpression resolves to | EqualsCondition\n    | NotEqualsCondition\n    | ExistsCondition\n    | NotExistsCondition\n    | GreaterThanCondition\n    | LessThanCondition\n    | IncludesCondition\n    | MatchesRegexCondition\n    | AndCondition\n    | OrCondition\n    | NotCondition.",
            "required": true
          }
        ],
        "related": [
          "EqualsCondition",
          "NotEqualsCondition",
          "ExistsCondition",
          "NotExistsCondition",
          "GreaterThanCondition",
          "LessThanCondition",
          "IncludesCondition",
          "MatchesRegexCondition",
          "AndCondition",
          "OrCondition"
        ]
      },
      {
        "name": "EqualsCondition",
        "kind": "interface",
        "purpose": "EqualsCondition defines the conditions contract with type, left, right.",
        "usage": "Use this contract when business routing should remain visible in flow data and decision traces.",
        "signatures": [
          "export interface EqualsCondition {\n    type: \"equals\";\n    left: ValueExpression;\n    right: ValueExpression;\n}"
        ],
        "fields": [
          "type",
          "left",
          "right"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"equals\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "left",
            "type": "ValueExpression",
            "description": "left is the ValueExpression member exposed by EqualsCondition.",
            "required": true
          },
          {
            "name": "right",
            "type": "ValueExpression",
            "description": "right is the ValueExpression member exposed by EqualsCondition.",
            "required": true
          }
        ],
        "related": [
          "ValueExpression"
        ]
      },
      {
        "name": "NotEqualsCondition",
        "kind": "interface",
        "purpose": "NotEqualsCondition defines the conditions contract with type, left, right.",
        "usage": "Use this contract when business routing should remain visible in flow data and decision traces.",
        "signatures": [
          "export interface NotEqualsCondition {\n    type: \"not_equals\";\n    left: ValueExpression;\n    right: ValueExpression;\n}"
        ],
        "fields": [
          "type",
          "left",
          "right"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"not_equals\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "left",
            "type": "ValueExpression",
            "description": "left is the ValueExpression member exposed by NotEqualsCondition.",
            "required": true
          },
          {
            "name": "right",
            "type": "ValueExpression",
            "description": "right is the ValueExpression member exposed by NotEqualsCondition.",
            "required": true
          }
        ],
        "related": [
          "ValueExpression"
        ]
      },
      {
        "name": "ExistsCondition",
        "kind": "interface",
        "purpose": "ExistsCondition defines the conditions contract with type, variableId.",
        "usage": "Use this contract when business routing should remain visible in flow data and decision traces.",
        "signatures": [
          "export interface ExistsCondition {\n    type: \"exists\";\n    variableId: VariableId;\n}"
        ],
        "fields": [
          "type",
          "variableId"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"exists\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "string",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          }
        ],
        "related": [
          "VariableId"
        ]
      },
      {
        "name": "NotExistsCondition",
        "kind": "interface",
        "purpose": "NotExistsCondition defines the conditions contract with type, variableId.",
        "usage": "Use this contract when business routing should remain visible in flow data and decision traces.",
        "signatures": [
          "export interface NotExistsCondition {\n    type: \"not_exists\";\n    variableId: VariableId;\n}"
        ],
        "fields": [
          "type",
          "variableId"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"not_exists\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "string",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          }
        ],
        "related": [
          "VariableId"
        ]
      },
      {
        "name": "GreaterThanCondition",
        "kind": "interface",
        "purpose": "GreaterThanCondition defines the conditions contract with type, left, right.",
        "usage": "Use this contract when business routing should remain visible in flow data and decision traces.",
        "signatures": [
          "export interface GreaterThanCondition {\n    type: \"greater_than\";\n    left: ValueExpression;\n    right: ValueExpression;\n}"
        ],
        "fields": [
          "type",
          "left",
          "right"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"greater_than\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "left",
            "type": "ValueExpression",
            "description": "left is the ValueExpression member exposed by GreaterThanCondition.",
            "required": true
          },
          {
            "name": "right",
            "type": "ValueExpression",
            "description": "right is the ValueExpression member exposed by GreaterThanCondition.",
            "required": true
          }
        ],
        "related": [
          "ValueExpression"
        ]
      },
      {
        "name": "LessThanCondition",
        "kind": "interface",
        "purpose": "LessThanCondition defines the conditions contract with type, left, right.",
        "usage": "Use this contract when business routing should remain visible in flow data and decision traces.",
        "signatures": [
          "export interface LessThanCondition {\n    type: \"less_than\";\n    left: ValueExpression;\n    right: ValueExpression;\n}"
        ],
        "fields": [
          "type",
          "left",
          "right"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"less_than\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "left",
            "type": "ValueExpression",
            "description": "left is the ValueExpression member exposed by LessThanCondition.",
            "required": true
          },
          {
            "name": "right",
            "type": "ValueExpression",
            "description": "right is the ValueExpression member exposed by LessThanCondition.",
            "required": true
          }
        ],
        "related": [
          "ValueExpression"
        ]
      },
      {
        "name": "IncludesCondition",
        "kind": "interface",
        "purpose": "IncludesCondition defines the conditions contract with type, collection, value.",
        "usage": "Use this contract when business routing should remain visible in flow data and decision traces.",
        "signatures": [
          "export interface IncludesCondition {\n    type: \"includes\";\n    collection: ValueExpression;\n    value: ValueExpression;\n}"
        ],
        "fields": [
          "type",
          "collection",
          "value"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"includes\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "collection",
            "type": "ValueExpression",
            "description": "collection is the ValueExpression member exposed by IncludesCondition.",
            "required": true
          },
          {
            "name": "value",
            "type": "ValueExpression",
            "description": "value is the ValueExpression member exposed by IncludesCondition.",
            "required": true
          }
        ],
        "related": [
          "ValueExpression"
        ]
      },
      {
        "name": "MatchesRegexCondition",
        "kind": "interface",
        "purpose": "MatchesRegexCondition defines the conditions contract with type, value, pattern, flags.",
        "usage": "Use this contract when business routing should remain visible in flow data and decision traces.",
        "signatures": [
          "export interface MatchesRegexCondition {\n    type: \"matches_regex\";\n    value: ValueExpression;\n    pattern: string;\n    flags?: string;\n}"
        ],
        "fields": [
          "type",
          "value",
          "pattern",
          "flags"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"matches_regex\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "value",
            "type": "ValueExpression",
            "description": "value is the ValueExpression member exposed by MatchesRegexCondition.",
            "required": true
          },
          {
            "name": "pattern",
            "type": "string",
            "description": "pattern is the string member exposed by MatchesRegexCondition.",
            "required": true
          },
          {
            "name": "flags",
            "type": "string",
            "description": "flags is the optional string member exposed by MatchesRegexCondition.",
            "required": false
          }
        ],
        "related": [
          "ValueExpression"
        ]
      },
      {
        "name": "AndCondition",
        "kind": "interface",
        "purpose": "AndCondition defines the conditions contract with type, conditions.",
        "usage": "Use this contract when business routing should remain visible in flow data and decision traces.",
        "signatures": [
          "export interface AndCondition {\n    type: \"and\";\n    conditions: ConditionExpression[];\n}"
        ],
        "fields": [
          "type",
          "conditions"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"and\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "conditions",
            "type": "ConditionExpression[]",
            "description": "conditions is the ConditionExpression[] member exposed by AndCondition.",
            "required": true
          }
        ],
        "related": [
          "ConditionExpression"
        ]
      },
      {
        "name": "OrCondition",
        "kind": "interface",
        "purpose": "OrCondition defines the conditions contract with type, conditions.",
        "usage": "Use this contract when business routing should remain visible in flow data and decision traces.",
        "signatures": [
          "export interface OrCondition {\n    type: \"or\";\n    conditions: ConditionExpression[];\n}"
        ],
        "fields": [
          "type",
          "conditions"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"or\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "conditions",
            "type": "ConditionExpression[]",
            "description": "conditions is the ConditionExpression[] member exposed by OrCondition.",
            "required": true
          }
        ],
        "related": [
          "ConditionExpression"
        ]
      },
      {
        "name": "NotCondition",
        "kind": "interface",
        "purpose": "NotCondition defines the conditions contract with type, condition.",
        "usage": "Use this contract when business routing should remain visible in flow data and decision traces.",
        "signatures": [
          "export interface NotCondition {\n    type: \"not\";\n    condition: ConditionExpression;\n}"
        ],
        "fields": [
          "type",
          "condition"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"not\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "condition",
            "type": "ConditionExpression",
            "description": "condition is the ConditionExpression member exposed by NotCondition.",
            "required": true
          }
        ],
        "related": [
          "ConditionExpression"
        ]
      },
      {
        "name": "ConditionEvaluationResult",
        "kind": "interface",
        "purpose": "ConditionEvaluationResult defines the conditions contract with matched, reason, metadata.",
        "usage": "Use ConditionEvaluationResult to inspect the structured outcome returned by the corresponding runtime, validation, or provider operation.",
        "signatures": [
          "export interface ConditionEvaluationResult {\n    matched: boolean;\n    reason?: string;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "matched",
          "reason",
          "metadata"
        ],
        "properties": [
          {
            "name": "matched",
            "type": "boolean",
            "description": "matched is the boolean member exposed by ConditionEvaluationResult.",
            "required": true
          },
          {
            "name": "reason",
            "type": "string",
            "description": "Human-readable reason for rejection, invalidation, handoff, or trace output.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata"
        ]
      }
    ]
  },
  {
    "title": "Steps",
    "summary": "Built-in and custom conversational states.",
    "exports": [
      "BuiltInStepType",
      "StepType",
      "StepConfig",
      "BaseStepDefinition",
      "StepDefinition",
      "MessageStepDefinition",
      "MessageStepConfig",
      "MenuStepDefinition",
      "MenuStepConfig",
      "MenuOption",
      "MenuSelectionPolicy",
      "MenuSemanticSelection",
      "InputStepDefinition",
      "InputStepConfig",
      "AttachmentStepDefinition",
      "AttachmentStepConfig",
      "ConditionStepDefinition",
      "ConditionStepConfig",
      "ConditionBranch",
      "EndStepDefinition",
      "EndStepConfig",
      "CustomStepDefinition",
      "CustomStepConfig"
    ],
    "entries": [
      {
        "name": "BuiltInStepType",
        "kind": "union type",
        "purpose": "BuiltInStepType is the public union in Steps that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export type BuiltInStepType = \"message\" | \"menu\" | \"input\" | \"attachment\" | \"condition\" | \"end\" | \"custom\";"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "| \"message\"\n    | \"menu\"\n    | \"input\"\n    | \"attachment\"\n    | \"condition\"\n    | \"end\"\n    | \"custom\"",
            "description": "BuiltInStepType accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "StepType",
        "kind": "union type",
        "purpose": "StepType is the public union in Steps that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export type StepType = BuiltInStepType | string;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "BuiltInStepType | string",
            "description": "StepType resolves to BuiltInStepType | string.",
            "required": true
          }
        ],
        "related": [
          "BuiltInStepType"
        ]
      },
      {
        "name": "StepConfig",
        "kind": "interface",
        "purpose": "StepConfig defines the steps contract.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface StepConfig {\n    [key: string]: unknown;\n}"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "unknown",
            "description": "StepConfig resolves to unknown.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "BaseStepDefinition",
        "kind": "interface",
        "purpose": "BaseStepDefinition defines the steps contract with stepId, type, config, onEnter, onExit, routes.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface BaseStepDefinition<TType extends StepType, TConfig extends StepConfig> extends LabelledEntity {\n    stepId: StepId;\n    type: TType;\n    config: TConfig;\n    onEnter?: StepOperation[];\n    onExit?: StepOperation[];\n    routes?: StepRoute[];\n}"
        ],
        "fields": [
          "stepId",
          "type",
          "config",
          "onEnter",
          "onExit",
          "routes",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "stepId",
            "type": "string",
            "description": "stepId is the string member exposed by BaseStepDefinition.",
            "required": true
          },
          {
            "name": "type",
            "type": "TType",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "config",
            "type": "TConfig",
            "description": "config is the TConfig member exposed by BaseStepDefinition.",
            "required": true
          },
          {
            "name": "onEnter",
            "type": "StepOperation[]",
            "description": "onEnter is the optional StepOperation[] member exposed by BaseStepDefinition.",
            "required": false
          },
          {
            "name": "onExit",
            "type": "StepOperation[]",
            "description": "onExit is the optional StepOperation[] member exposed by BaseStepDefinition.",
            "required": false
          },
          {
            "name": "routes",
            "type": "StepRoute[]",
            "description": "routes is the optional StepRoute[] member exposed by BaseStepDefinition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by BaseStepDefinition.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by BaseStepDefinition.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "StepId",
          "Metadata",
          "LabelledEntity",
          "StepType",
          "StepConfig",
          "StepRoute",
          "StepOperation"
        ]
      },
      {
        "name": "StepDefinition",
        "kind": "union type",
        "purpose": "StepDefinition is the public union in Steps that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export type StepDefinition = MessageStepDefinition | MenuStepDefinition | InputStepDefinition | AttachmentStepDefinition | ConditionStepDefinition | EndStepDefinition | CustomStepDefinition;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "| MessageStepDefinition\n    | MenuStepDefinition\n    | InputStepDefinition\n    | AttachmentStepDefinition\n    | ConditionStepDefinition\n    | EndStepDefinition\n    | CustomStepDefinition",
            "description": "StepDefinition resolves to | MessageStepDefinition\n    | MenuStepDefinition\n    | InputStepDefinition\n    | AttachmentStepDefinition\n    | ConditionStepDefinition\n    | EndStepDefinition\n    | CustomStepDefinition.",
            "required": true
          }
        ],
        "related": [
          "MessageStepDefinition",
          "MenuStepDefinition",
          "InputStepDefinition",
          "AttachmentStepDefinition",
          "ConditionStepDefinition",
          "EndStepDefinition",
          "CustomStepDefinition"
        ]
      },
      {
        "name": "MessageStepDefinition",
        "kind": "interface",
        "purpose": "MessageStepDefinition defines the steps contract with stepId, type, config, onEnter, onExit, routes.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface MessageStepDefinition extends BaseStepDefinition<\"message\", MessageStepConfig> {\n}"
        ],
        "fields": [
          "stepId",
          "type",
          "config",
          "onEnter",
          "onExit",
          "routes",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "stepId",
            "type": "string",
            "description": "stepId is the string member exposed by MessageStepDefinition.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"message\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "config",
            "type": "MessageStepConfig",
            "description": "config is the MessageStepConfig member exposed by MessageStepDefinition.",
            "required": true
          },
          {
            "name": "onEnter",
            "type": "StepOperation[]",
            "description": "onEnter is the optional StepOperation[] member exposed by MessageStepDefinition.",
            "required": false
          },
          {
            "name": "onExit",
            "type": "StepOperation[]",
            "description": "onExit is the optional StepOperation[] member exposed by MessageStepDefinition.",
            "required": false
          },
          {
            "name": "routes",
            "type": "StepRoute[]",
            "description": "routes is the optional StepRoute[] member exposed by MessageStepDefinition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by MessageStepDefinition.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by MessageStepDefinition.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "BaseStepDefinition",
          "MessageStepConfig",
          "StepRoute",
          "StepOperation"
        ]
      },
      {
        "name": "MessageStepConfig",
        "kind": "interface",
        "purpose": "MessageStepConfig defines the steps contract with messages, autoAdvance.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface MessageStepConfig extends StepConfig {\n    messages: ResponsePlan[];\n    autoAdvance?: boolean;\n}"
        ],
        "fields": [
          "messages",
          "autoAdvance"
        ],
        "properties": [
          {
            "name": "messages",
            "type": "ResponsePlan[]",
            "description": "Outbound messages produced by the turn, step, branch, or operation.",
            "required": true
          },
          {
            "name": "autoAdvance",
            "type": "boolean",
            "description": "autoAdvance is the optional boolean member exposed by MessageStepConfig.",
            "required": false
          }
        ],
        "related": [
          "ResponsePlan",
          "StepConfig"
        ]
      },
      {
        "name": "MenuStepDefinition",
        "kind": "interface",
        "purpose": "MenuStepDefinition defines the steps contract with stepId, type, config, onEnter, onExit, routes.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface MenuStepDefinition extends BaseStepDefinition<\"menu\", MenuStepConfig> {\n}"
        ],
        "fields": [
          "stepId",
          "type",
          "config",
          "onEnter",
          "onExit",
          "routes",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "stepId",
            "type": "string",
            "description": "stepId is the string member exposed by MenuStepDefinition.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"menu\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "config",
            "type": "MenuStepConfig",
            "description": "config is the MenuStepConfig member exposed by MenuStepDefinition.",
            "required": true
          },
          {
            "name": "onEnter",
            "type": "StepOperation[]",
            "description": "onEnter is the optional StepOperation[] member exposed by MenuStepDefinition.",
            "required": false
          },
          {
            "name": "onExit",
            "type": "StepOperation[]",
            "description": "onExit is the optional StepOperation[] member exposed by MenuStepDefinition.",
            "required": false
          },
          {
            "name": "routes",
            "type": "StepRoute[]",
            "description": "routes is the optional StepRoute[] member exposed by MenuStepDefinition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by MenuStepDefinition.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by MenuStepDefinition.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "BaseStepDefinition",
          "MenuStepConfig",
          "StepRoute",
          "StepOperation"
        ]
      },
      {
        "name": "MenuStepConfig",
        "kind": "interface",
        "purpose": "MenuStepConfig defines the steps contract with prompt, options, selection, invalidSelection, unknownSelection.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface MenuStepConfig extends StepConfig {\n    prompt: ResponsePlan;\n    options: MenuOption[];\n    selection: MenuSelectionPolicy;\n    invalidSelection?: InvalidInputBehavior;\n    unknownSelection?: UnknownInputBehavior;\n}"
        ],
        "fields": [
          "prompt",
          "options",
          "selection",
          "invalidSelection",
          "unknownSelection"
        ],
        "properties": [
          {
            "name": "prompt",
            "type": "ResponsePlan",
            "description": "prompt is the ResponsePlan member exposed by MenuStepConfig.",
            "required": true
          },
          {
            "name": "options",
            "type": "MenuOption[]",
            "description": "Configuration object interpreted by the registered normalizer, extractor, or validator.",
            "required": true
          },
          {
            "name": "selection",
            "type": "MenuSelectionPolicy",
            "description": "selection is the MenuSelectionPolicy member exposed by MenuStepConfig.",
            "required": true
          },
          {
            "name": "invalidSelection",
            "type": "InvalidInputBehavior",
            "description": "invalidSelection is the optional InvalidInputBehavior member exposed by MenuStepConfig.",
            "required": false
          },
          {
            "name": "unknownSelection",
            "type": "UnknownInputBehavior",
            "description": "unknownSelection is the optional UnknownInputBehavior member exposed by MenuStepConfig.",
            "required": false
          }
        ],
        "related": [
          "ResponsePlan",
          "StepConfig",
          "MenuOption",
          "MenuSelectionPolicy",
          "InvalidInputBehavior",
          "UnknownInputBehavior"
        ]
      },
      {
        "name": "MenuOption",
        "kind": "interface",
        "purpose": "MenuOption defines the steps contract with optionId, aliases, value, branch, label, description.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface MenuOption extends LabelledEntity {\n    optionId: OptionId;\n    aliases?: string[];\n    value?: unknown;\n    branch: StepBranch;\n}"
        ],
        "fields": [
          "optionId",
          "aliases",
          "value",
          "branch",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "optionId",
            "type": "string",
            "description": "optionId is the string member exposed by MenuOption.",
            "required": true
          },
          {
            "name": "aliases",
            "type": "string[]",
            "description": "aliases is the optional string[] member exposed by MenuOption.",
            "required": false
          },
          {
            "name": "value",
            "type": "unknown",
            "description": "value is the optional unknown member exposed by MenuOption.",
            "required": false
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch selected or returned by the contract.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by MenuOption.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by MenuOption.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "OptionId",
          "Metadata",
          "LabelledEntity",
          "StepBranch"
        ]
      },
      {
        "name": "MenuSelectionPolicy",
        "kind": "interface",
        "purpose": "MenuSelectionPolicy defines the steps contract with allowButtons, allowNumbers, allowExactText, allowAliases, allowFreeText, semanticSelection.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface MenuSelectionPolicy {\n    allowButtons?: boolean;\n    allowNumbers?: boolean;\n    allowExactText?: boolean;\n    allowAliases?: boolean;\n    allowFreeText?: boolean;\n    semanticSelection?: MenuSemanticSelection;\n}"
        ],
        "fields": [
          "allowButtons",
          "allowNumbers",
          "allowExactText",
          "allowAliases",
          "allowFreeText",
          "semanticSelection"
        ],
        "properties": [
          {
            "name": "allowButtons",
            "type": "boolean",
            "description": "allowButtons is the optional boolean member exposed by MenuSelectionPolicy.",
            "required": false
          },
          {
            "name": "allowNumbers",
            "type": "boolean",
            "description": "allowNumbers is the optional boolean member exposed by MenuSelectionPolicy.",
            "required": false
          },
          {
            "name": "allowExactText",
            "type": "boolean",
            "description": "allowExactText is the optional boolean member exposed by MenuSelectionPolicy.",
            "required": false
          },
          {
            "name": "allowAliases",
            "type": "boolean",
            "description": "allowAliases is the optional boolean member exposed by MenuSelectionPolicy.",
            "required": false
          },
          {
            "name": "allowFreeText",
            "type": "boolean",
            "description": "allowFreeText is the optional boolean member exposed by MenuSelectionPolicy.",
            "required": false
          },
          {
            "name": "semanticSelection",
            "type": "MenuSemanticSelection",
            "description": "semanticSelection is the optional MenuSemanticSelection member exposed by MenuSelectionPolicy.",
            "required": false
          }
        ],
        "related": [
          "MenuSemanticSelection"
        ]
      },
      {
        "name": "MenuSemanticSelection",
        "kind": "interface",
        "purpose": "MenuSemanticSelection defines the steps contract with enabled, threshold, unknownOutcome.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface MenuSemanticSelection {\n    enabled: boolean;\n    threshold: number;\n    unknownOutcome?: StepOutcome;\n}"
        ],
        "fields": [
          "enabled",
          "threshold",
          "unknownOutcome"
        ],
        "properties": [
          {
            "name": "enabled",
            "type": "boolean",
            "description": "enabled is the boolean member exposed by MenuSemanticSelection.",
            "required": true
          },
          {
            "name": "threshold",
            "type": "number",
            "description": "threshold is the number member exposed by MenuSemanticSelection.",
            "required": true
          },
          {
            "name": "unknownOutcome",
            "type": "string",
            "description": "unknownOutcome is the optional string member exposed by MenuSemanticSelection.",
            "required": false
          }
        ],
        "related": [
          "StepOutcome"
        ]
      },
      {
        "name": "InputStepDefinition",
        "kind": "interface",
        "purpose": "InputStepDefinition defines the steps contract with stepId, type, config, onEnter, onExit, routes.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface InputStepDefinition extends BaseStepDefinition<\"input\", InputStepConfig> {\n}"
        ],
        "fields": [
          "stepId",
          "type",
          "config",
          "onEnter",
          "onExit",
          "routes",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "stepId",
            "type": "string",
            "description": "stepId is the string member exposed by InputStepDefinition.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"input\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "config",
            "type": "InputStepConfig",
            "description": "config is the InputStepConfig member exposed by InputStepDefinition.",
            "required": true
          },
          {
            "name": "onEnter",
            "type": "StepOperation[]",
            "description": "onEnter is the optional StepOperation[] member exposed by InputStepDefinition.",
            "required": false
          },
          {
            "name": "onExit",
            "type": "StepOperation[]",
            "description": "onExit is the optional StepOperation[] member exposed by InputStepDefinition.",
            "required": false
          },
          {
            "name": "routes",
            "type": "StepRoute[]",
            "description": "routes is the optional StepRoute[] member exposed by InputStepDefinition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by InputStepDefinition.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by InputStepDefinition.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "BaseStepDefinition",
          "InputStepConfig",
          "StepRoute",
          "StepOperation"
        ]
      },
      {
        "name": "InputStepConfig",
        "kind": "interface",
        "purpose": "InputStepConfig defines the steps contract with prompt, input.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface InputStepConfig extends StepConfig {\n    prompt?: ResponsePlan;\n    input: InputContract;\n}"
        ],
        "fields": [
          "prompt",
          "input"
        ],
        "properties": [
          {
            "name": "prompt",
            "type": "ResponsePlan",
            "description": "prompt is the optional ResponsePlan member exposed by InputStepConfig.",
            "required": false
          },
          {
            "name": "input",
            "type": "InputContract<string, string>",
            "description": "input is the InputContract<string, string> member exposed by InputStepConfig.",
            "required": true
          }
        ],
        "related": [
          "ResponsePlan",
          "StepConfig",
          "InputContract"
        ]
      },
      {
        "name": "AttachmentStepDefinition",
        "kind": "interface",
        "purpose": "AttachmentStepDefinition defines the steps contract with stepId, type, config, onEnter, onExit, routes.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface AttachmentStepDefinition extends BaseStepDefinition<\"attachment\", AttachmentStepConfig> {\n}"
        ],
        "fields": [
          "stepId",
          "type",
          "config",
          "onEnter",
          "onExit",
          "routes",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "stepId",
            "type": "string",
            "description": "stepId is the string member exposed by AttachmentStepDefinition.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"attachment\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "config",
            "type": "AttachmentStepConfig",
            "description": "config is the AttachmentStepConfig member exposed by AttachmentStepDefinition.",
            "required": true
          },
          {
            "name": "onEnter",
            "type": "StepOperation[]",
            "description": "onEnter is the optional StepOperation[] member exposed by AttachmentStepDefinition.",
            "required": false
          },
          {
            "name": "onExit",
            "type": "StepOperation[]",
            "description": "onExit is the optional StepOperation[] member exposed by AttachmentStepDefinition.",
            "required": false
          },
          {
            "name": "routes",
            "type": "StepRoute[]",
            "description": "routes is the optional StepRoute[] member exposed by AttachmentStepDefinition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by AttachmentStepDefinition.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by AttachmentStepDefinition.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "BaseStepDefinition",
          "AttachmentStepConfig",
          "StepRoute",
          "StepOperation"
        ]
      },
      {
        "name": "AttachmentStepConfig",
        "kind": "interface",
        "purpose": "AttachmentStepConfig defines the steps contract with prompt, targetVariableId, rules, invalidAttachment.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface AttachmentStepConfig extends StepConfig {\n    prompt?: ResponsePlan;\n    targetVariableId: VariableId;\n    rules: AttachmentRules;\n    invalidAttachment?: InvalidInputBehavior;\n}"
        ],
        "fields": [
          "prompt",
          "targetVariableId",
          "rules",
          "invalidAttachment"
        ],
        "properties": [
          {
            "name": "prompt",
            "type": "ResponsePlan",
            "description": "prompt is the optional ResponsePlan member exposed by AttachmentStepConfig.",
            "required": false
          },
          {
            "name": "targetVariableId",
            "type": "string",
            "description": "targetVariableId is the string member exposed by AttachmentStepConfig.",
            "required": true
          },
          {
            "name": "rules",
            "type": "AttachmentRules",
            "description": "rules is the AttachmentRules member exposed by AttachmentStepConfig.",
            "required": true
          },
          {
            "name": "invalidAttachment",
            "type": "InvalidInputBehavior",
            "description": "invalidAttachment is the optional InvalidInputBehavior member exposed by AttachmentStepConfig.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "ResponsePlan",
          "StepConfig",
          "InvalidInputBehavior",
          "AttachmentRules"
        ]
      },
      {
        "name": "ConditionStepDefinition",
        "kind": "interface",
        "purpose": "ConditionStepDefinition defines the steps contract with stepId, type, config, onEnter, onExit, routes.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface ConditionStepDefinition extends BaseStepDefinition<\"condition\", ConditionStepConfig> {\n}"
        ],
        "fields": [
          "stepId",
          "type",
          "config",
          "onEnter",
          "onExit",
          "routes",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "stepId",
            "type": "string",
            "description": "stepId is the string member exposed by ConditionStepDefinition.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"condition\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "config",
            "type": "ConditionStepConfig",
            "description": "config is the ConditionStepConfig member exposed by ConditionStepDefinition.",
            "required": true
          },
          {
            "name": "onEnter",
            "type": "StepOperation[]",
            "description": "onEnter is the optional StepOperation[] member exposed by ConditionStepDefinition.",
            "required": false
          },
          {
            "name": "onExit",
            "type": "StepOperation[]",
            "description": "onExit is the optional StepOperation[] member exposed by ConditionStepDefinition.",
            "required": false
          },
          {
            "name": "routes",
            "type": "StepRoute[]",
            "description": "routes is the optional StepRoute[] member exposed by ConditionStepDefinition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by ConditionStepDefinition.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by ConditionStepDefinition.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "BaseStepDefinition",
          "ConditionStepConfig",
          "StepRoute",
          "StepOperation"
        ]
      },
      {
        "name": "ConditionStepConfig",
        "kind": "interface",
        "purpose": "ConditionStepConfig defines the steps contract with branches, defaultBranch.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface ConditionStepConfig extends StepConfig {\n    branches: ConditionBranch[];\n    defaultBranch?: StepBranch;\n}"
        ],
        "fields": [
          "branches",
          "defaultBranch"
        ],
        "properties": [
          {
            "name": "branches",
            "type": "ConditionBranch[]",
            "description": "branches is the ConditionBranch[] member exposed by ConditionStepConfig.",
            "required": true
          },
          {
            "name": "defaultBranch",
            "type": "StepBranch",
            "description": "defaultBranch is the optional StepBranch member exposed by ConditionStepConfig.",
            "required": false
          }
        ],
        "related": [
          "StepConfig",
          "ConditionBranch",
          "StepBranch"
        ]
      },
      {
        "name": "ConditionBranch",
        "kind": "interface",
        "purpose": "ConditionBranch defines the steps contract with branchId, when, outcome, branch, label, description.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface ConditionBranch extends LabelledEntity {\n    branchId: BranchId;\n    when: ConditionExpression;\n    outcome: StepOutcome;\n    branch: StepBranch;\n}"
        ],
        "fields": [
          "branchId",
          "when",
          "outcome",
          "branch",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "branchId",
            "type": "string",
            "description": "branchId is the string member exposed by ConditionBranch.",
            "required": true
          },
          {
            "name": "when",
            "type": "ConditionExpression",
            "description": "when is the ConditionExpression member exposed by ConditionBranch.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": true
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch selected or returned by the contract.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by ConditionBranch.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by ConditionBranch.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "BranchId",
          "Metadata",
          "LabelledEntity",
          "StepOutcome",
          "ConditionExpression",
          "StepBranch"
        ]
      },
      {
        "name": "EndStepDefinition",
        "kind": "interface",
        "purpose": "EndStepDefinition defines the steps contract with stepId, type, config, onEnter, onExit, routes.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface EndStepDefinition extends BaseStepDefinition<\"end\", EndStepConfig> {\n}"
        ],
        "fields": [
          "stepId",
          "type",
          "config",
          "onEnter",
          "onExit",
          "routes",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "stepId",
            "type": "string",
            "description": "stepId is the string member exposed by EndStepDefinition.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"end\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "config",
            "type": "EndStepConfig",
            "description": "config is the EndStepConfig member exposed by EndStepDefinition.",
            "required": true
          },
          {
            "name": "onEnter",
            "type": "StepOperation[]",
            "description": "onEnter is the optional StepOperation[] member exposed by EndStepDefinition.",
            "required": false
          },
          {
            "name": "onExit",
            "type": "StepOperation[]",
            "description": "onExit is the optional StepOperation[] member exposed by EndStepDefinition.",
            "required": false
          },
          {
            "name": "routes",
            "type": "StepRoute[]",
            "description": "routes is the optional StepRoute[] member exposed by EndStepDefinition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by EndStepDefinition.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by EndStepDefinition.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "BaseStepDefinition",
          "EndStepConfig",
          "StepRoute",
          "StepOperation"
        ]
      },
      {
        "name": "EndStepConfig",
        "kind": "interface",
        "purpose": "EndStepConfig defines the steps contract with status, finalMessage.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface EndStepConfig extends StepConfig {\n    status: ConversationStatus;\n    finalMessage?: ResponsePlan;\n}"
        ],
        "fields": [
          "status",
          "finalMessage"
        ],
        "properties": [
          {
            "name": "status",
            "type": "ConversationStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "finalMessage",
            "type": "ResponsePlan",
            "description": "finalMessage is the optional ResponsePlan member exposed by EndStepConfig.",
            "required": false
          }
        ],
        "related": [
          "ConversationStatus",
          "ResponsePlan",
          "StepConfig"
        ]
      },
      {
        "name": "CustomStepDefinition",
        "kind": "interface",
        "purpose": "CustomStepDefinition defines the steps contract with stepId, type, config, onEnter, onExit, routes.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface CustomStepDefinition extends BaseStepDefinition<\"custom\", CustomStepConfig> {\n}"
        ],
        "fields": [
          "stepId",
          "type",
          "config",
          "onEnter",
          "onExit",
          "routes",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "stepId",
            "type": "string",
            "description": "stepId is the string member exposed by CustomStepDefinition.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"custom\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "config",
            "type": "CustomStepConfig",
            "description": "config is the CustomStepConfig member exposed by CustomStepDefinition.",
            "required": true
          },
          {
            "name": "onEnter",
            "type": "StepOperation[]",
            "description": "onEnter is the optional StepOperation[] member exposed by CustomStepDefinition.",
            "required": false
          },
          {
            "name": "onExit",
            "type": "StepOperation[]",
            "description": "onExit is the optional StepOperation[] member exposed by CustomStepDefinition.",
            "required": false
          },
          {
            "name": "routes",
            "type": "StepRoute[]",
            "description": "routes is the optional StepRoute[] member exposed by CustomStepDefinition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by CustomStepDefinition.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by CustomStepDefinition.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "BaseStepDefinition",
          "CustomStepConfig",
          "StepRoute",
          "StepOperation"
        ]
      },
      {
        "name": "CustomStepConfig",
        "kind": "interface",
        "purpose": "CustomStepConfig defines the steps contract with customType, payload.",
        "usage": "Use this contract when adding a conversational state to a flow definition.",
        "signatures": [
          "export interface CustomStepConfig extends StepConfig {\n    customType: string;\n    payload: JsonObject;\n}"
        ],
        "fields": [
          "customType",
          "payload"
        ],
        "properties": [
          {
            "name": "customType",
            "type": "string",
            "description": "customType is the string member exposed by CustomStepConfig.",
            "required": true
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Application payload attached to an event, input, or custom message.",
            "required": true
          }
        ],
        "related": [
          "JsonObject",
          "StepConfig"
        ]
      }
    ]
  },
  {
    "title": "Branches, Routes, and Targets",
    "summary": "Outcome routing, branch operations, and transition targets.",
    "exports": [
      "StepBranch",
      "StepRoute",
      "RouteMatch",
      "OutcomeRouteMatch",
      "AlwaysRouteMatch",
      "StepTarget",
      "GoToStepTarget",
      "StayOnStepTarget",
      "EndConversationTarget",
      "NoStepTarget"
    ],
    "entries": [
      {
        "name": "StepBranch",
        "kind": "interface",
        "purpose": "StepBranch defines the branches, routes, and targets contract with branchId, operations, target, label, description, metadata.",
        "usage": "Use this contract when an outcome must run operations and move the conversation to its next target.",
        "signatures": [
          "export interface StepBranch extends LabelledEntity {\n    branchId?: BranchId;\n    operations?: StepOperation[];\n    target?: StepTarget;\n}"
        ],
        "fields": [
          "branchId",
          "operations",
          "target",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "branchId",
            "type": "string",
            "description": "branchId is the optional string member exposed by StepBranch.",
            "required": false
          },
          {
            "name": "operations",
            "type": "StepOperation[]",
            "description": "operations is the optional StepOperation[] member exposed by StepBranch.",
            "required": false
          },
          {
            "name": "target",
            "type": "StepTarget",
            "description": "target is the optional StepTarget member exposed by StepBranch.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by StepBranch.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by StepBranch.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "BranchId",
          "Metadata",
          "LabelledEntity",
          "StepTarget",
          "StepOperation"
        ]
      },
      {
        "name": "StepRoute",
        "kind": "interface",
        "purpose": "StepRoute defines the branches, routes, and targets contract with routeId, match, branch, priority, label, description.",
        "usage": "Use this contract when an outcome must run operations and move the conversation to its next target.",
        "signatures": [
          "export interface StepRoute extends LabelledEntity {\n    routeId: RouteId;\n    match: RouteMatch;\n    branch: StepBranch;\n    priority?: number;\n}"
        ],
        "fields": [
          "routeId",
          "match",
          "branch",
          "priority",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "routeId",
            "type": "string",
            "description": "routeId is the string member exposed by StepRoute.",
            "required": true
          },
          {
            "name": "match",
            "type": "RouteMatch",
            "description": "match is the RouteMatch member exposed by StepRoute.",
            "required": true
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch selected or returned by the contract.",
            "required": true
          },
          {
            "name": "priority",
            "type": "number",
            "description": "priority is the optional number member exposed by StepRoute.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by StepRoute.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by StepRoute.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "RouteId",
          "Metadata",
          "LabelledEntity",
          "StepBranch",
          "RouteMatch"
        ]
      },
      {
        "name": "RouteMatch",
        "kind": "union type",
        "purpose": "RouteMatch is the public union in Branches, Routes, and Targets that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when an outcome must run operations and move the conversation to its next target.",
        "signatures": [
          "export type RouteMatch = OutcomeRouteMatch | AlwaysRouteMatch;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "OutcomeRouteMatch | AlwaysRouteMatch",
            "description": "RouteMatch resolves to OutcomeRouteMatch | AlwaysRouteMatch.",
            "required": true
          }
        ],
        "related": [
          "OutcomeRouteMatch",
          "AlwaysRouteMatch"
        ]
      },
      {
        "name": "OutcomeRouteMatch",
        "kind": "interface",
        "purpose": "OutcomeRouteMatch defines the branches, routes, and targets contract with type, outcome.",
        "usage": "Use this contract when an outcome must run operations and move the conversation to its next target.",
        "signatures": [
          "export interface OutcomeRouteMatch {\n    type: \"outcome\";\n    outcome: StepOutcome;\n}"
        ],
        "fields": [
          "type",
          "outcome"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"outcome\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": true
          }
        ],
        "related": [
          "StepOutcome"
        ]
      },
      {
        "name": "AlwaysRouteMatch",
        "kind": "interface",
        "purpose": "AlwaysRouteMatch defines the branches, routes, and targets contract with type.",
        "usage": "Use this contract when an outcome must run operations and move the conversation to its next target.",
        "signatures": [
          "export interface AlwaysRouteMatch {\n    type: \"always\";\n}"
        ],
        "fields": [
          "type"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"always\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "StepTarget",
        "kind": "union type",
        "purpose": "StepTarget is the public union in Branches, Routes, and Targets that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when an outcome must run operations and move the conversation to its next target.",
        "signatures": [
          "export type StepTarget = GoToStepTarget | StayOnStepTarget | EndConversationTarget | NoStepTarget;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "| GoToStepTarget\n    | StayOnStepTarget\n    | EndConversationTarget\n    | NoStepTarget",
            "description": "StepTarget resolves to | GoToStepTarget\n    | StayOnStepTarget\n    | EndConversationTarget\n    | NoStepTarget.",
            "required": true
          }
        ],
        "related": [
          "GoToStepTarget",
          "StayOnStepTarget",
          "EndConversationTarget",
          "NoStepTarget"
        ]
      },
      {
        "name": "GoToStepTarget",
        "kind": "interface",
        "purpose": "GoToStepTarget defines the branches, routes, and targets contract with type, stepId.",
        "usage": "Use this contract when an outcome must run operations and move the conversation to its next target.",
        "signatures": [
          "export interface GoToStepTarget {\n    type: \"step\";\n    stepId: StepId;\n}"
        ],
        "fields": [
          "type",
          "stepId"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"step\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "stepId",
            "type": "string",
            "description": "stepId is the string member exposed by GoToStepTarget.",
            "required": true
          }
        ],
        "related": [
          "StepId"
        ]
      },
      {
        "name": "StayOnStepTarget",
        "kind": "interface",
        "purpose": "StayOnStepTarget defines the branches, routes, and targets contract with type.",
        "usage": "Use this contract when an outcome must run operations and move the conversation to its next target.",
        "signatures": [
          "export interface StayOnStepTarget {\n    type: \"stay\";\n}"
        ],
        "fields": [
          "type"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"stay\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "EndConversationTarget",
        "kind": "interface",
        "purpose": "EndConversationTarget defines the branches, routes, and targets contract with type, status.",
        "usage": "Use this contract when an outcome must run operations and move the conversation to its next target.",
        "signatures": [
          "export interface EndConversationTarget {\n    type: \"end\";\n    status: ConversationStatus;\n}"
        ],
        "fields": [
          "type",
          "status"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"end\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "status",
            "type": "ConversationStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          }
        ],
        "related": [
          "ConversationStatus"
        ]
      },
      {
        "name": "NoStepTarget",
        "kind": "interface",
        "purpose": "NoStepTarget defines the branches, routes, and targets contract with type.",
        "usage": "Use this contract when an outcome must run operations and move the conversation to its next target.",
        "signatures": [
          "export interface NoStepTarget {\n    type: \"none\";\n}"
        ],
        "fields": [
          "type"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"none\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          }
        ],
        "related": []
      }
    ]
  },
  {
    "title": "Operations",
    "summary": "Reusable runtime effects from branches and lifecycle hooks.",
    "exports": [
      "StepOperation",
      "BaseOperation",
      "SendMessageOperation",
      "SetVariableOperation",
      "UnsetVariableOperation",
      "InvalidateVariableOperation",
      "RunActionOperation",
      "ActionResultBranch",
      "ActionResultMatch",
      "ActionStatusMatch",
      "ActionErrorCodeMatch",
      "ActionOutcomeMatch",
      "EmitEventOperation",
      "CallFlowOperation",
      "FlowCallVariableSharing",
      "FlowCallStatus",
      "FlowCallResult",
      "FlowCallResultBranch",
      "FlowCallResultMatch",
      "FlowCallStatusMatch",
      "FlowCallOutcomeMatch",
      "HandoffOperation",
      "HandoffResultStatus",
      "HandoffResult",
      "HandoffResultBranch",
      "HandoffResultMatch",
      "HandoffStatusMatch",
      "HandoffOutcomeMatch",
      "HandoffErrorCodeMatch",
      "CustomOperation",
      "CustomOperationResultStatus",
      "CustomOperationResult",
      "CustomOperationResultBranch",
      "CustomOperationResultMatch",
      "CustomOperationStatusMatch",
      "CustomOperationOutcomeMatch",
      "CustomOperationErrorCodeMatch"
    ],
    "entries": [
      {
        "name": "StepOperation",
        "kind": "union type",
        "purpose": "StepOperation is the public union in Operations that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export type StepOperation = SendMessageOperation | SetVariableOperation | UnsetVariableOperation | InvalidateVariableOperation | RunActionOperation | CallFlowOperation | EmitEventOperation | HandoffOperation | CustomOperation;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "| SendMessageOperation\n    | SetVariableOperation\n    | UnsetVariableOperation\n    | InvalidateVariableOperation\n    | RunActionOperation\n    | CallFlowOperation\n    | EmitEventOperation\n    | HandoffOperation\n    | CustomOperation",
            "description": "StepOperation resolves to | SendMessageOperation\n    | SetVariableOperation\n    | UnsetVariableOperation\n    | InvalidateVariableOperation\n    | RunActionOperation\n    | CallFlowOperation\n    | EmitEventOperation\n    | HandoffOperation\n    | CustomOperation.",
            "required": true
          }
        ],
        "related": [
          "SendMessageOperation",
          "SetVariableOperation",
          "UnsetVariableOperation",
          "InvalidateVariableOperation",
          "RunActionOperation",
          "EmitEventOperation",
          "CallFlowOperation",
          "HandoffOperation",
          "CustomOperation"
        ]
      },
      {
        "name": "BaseOperation",
        "kind": "interface",
        "purpose": "BaseOperation defines the operations contract with operationId, type, label, description, metadata.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface BaseOperation<TType extends string> extends LabelledEntity {\n    operationId?: OperationId;\n    type: TType;\n}"
        ],
        "fields": [
          "operationId",
          "type",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "operationId",
            "type": "string",
            "description": "operationId is the optional string member exposed by BaseOperation.",
            "required": false
          },
          {
            "name": "type",
            "type": "TType",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by BaseOperation.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by BaseOperation.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "OperationId",
          "Metadata",
          "LabelledEntity"
        ]
      },
      {
        "name": "SendMessageOperation",
        "kind": "interface",
        "purpose": "SendMessageOperation defines the operations contract with message, operationId, type, label, description, metadata.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface SendMessageOperation extends BaseOperation<\"send_message\"> {\n    message: ResponsePlan;\n}"
        ],
        "fields": [
          "message",
          "operationId",
          "type",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "message",
            "type": "ResponsePlan",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "operationId is the optional string member exposed by SendMessageOperation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"send_message\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by SendMessageOperation.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by SendMessageOperation.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "ResponsePlan",
          "BaseOperation"
        ]
      },
      {
        "name": "SetVariableOperation",
        "kind": "interface",
        "purpose": "SetVariableOperation defines the operations contract with variableId, scope, value, source, operationId, type.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface SetVariableOperation extends BaseOperation<\"set_variable\"> {\n    variableId: VariableId;\n    scope?: VariableScope;\n    value: ValueExpression;\n    source?: VariableValueSource;\n}"
        ],
        "fields": [
          "variableId",
          "scope",
          "value",
          "source",
          "operationId",
          "type",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "variableId",
            "type": "string",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "scope is the optional VariableScope member exposed by SetVariableOperation.",
            "required": false
          },
          {
            "name": "value",
            "type": "ValueExpression",
            "description": "value is the ValueExpression member exposed by SetVariableOperation.",
            "required": true
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Runtime source that produced a value, patch, or trace fragment.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "operationId is the optional string member exposed by SetVariableOperation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"set_variable\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by SetVariableOperation.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by SetVariableOperation.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "Metadata",
          "VariableScope",
          "VariableValueSource",
          "ValueExpression",
          "BaseOperation"
        ]
      },
      {
        "name": "UnsetVariableOperation",
        "kind": "interface",
        "purpose": "UnsetVariableOperation defines the operations contract with variableId, scope, operationId, type, label, description.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface UnsetVariableOperation extends BaseOperation<\"unset_variable\"> {\n    variableId: VariableId;\n    scope?: VariableScope;\n}"
        ],
        "fields": [
          "variableId",
          "scope",
          "operationId",
          "type",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "variableId",
            "type": "string",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "scope is the optional VariableScope member exposed by UnsetVariableOperation.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "operationId is the optional string member exposed by UnsetVariableOperation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"unset_variable\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by UnsetVariableOperation.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by UnsetVariableOperation.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "Metadata",
          "VariableScope",
          "BaseOperation"
        ]
      },
      {
        "name": "InvalidateVariableOperation",
        "kind": "interface",
        "purpose": "InvalidateVariableOperation defines the operations contract with variableId, scope, reason, operationId, type, label.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface InvalidateVariableOperation extends BaseOperation<\"invalidate_variable\"> {\n    variableId: VariableId;\n    scope?: VariableScope;\n    reason?: string;\n}"
        ],
        "fields": [
          "variableId",
          "scope",
          "reason",
          "operationId",
          "type",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "variableId",
            "type": "string",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "scope is the optional VariableScope member exposed by InvalidateVariableOperation.",
            "required": false
          },
          {
            "name": "reason",
            "type": "string",
            "description": "Human-readable reason for rejection, invalidation, handoff, or trace output.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "operationId is the optional string member exposed by InvalidateVariableOperation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"invalidate_variable\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by InvalidateVariableOperation.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by InvalidateVariableOperation.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "Metadata",
          "VariableScope",
          "BaseOperation"
        ]
      },
      {
        "name": "RunActionOperation",
        "kind": "interface",
        "purpose": "RunActionOperation defines the operations contract with actionId, inputMapping, outputMapping, resultVariableId, onResult, operationId.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface RunActionOperation extends BaseOperation<\"run_action\"> {\n    actionId: ActionId;\n    inputMapping?: Record<string, ValueExpression>;\n    outputMapping?: Record<string, VariableId>;\n    resultVariableId?: VariableId;\n    onResult?: ActionResultBranch[];\n}"
        ],
        "fields": [
          "actionId",
          "inputMapping",
          "outputMapping",
          "resultVariableId",
          "onResult",
          "operationId",
          "type",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "actionId",
            "type": "string",
            "description": "actionId is the string member exposed by RunActionOperation.",
            "required": true
          },
          {
            "name": "inputMapping",
            "type": "Record<string, ValueExpression>",
            "description": "inputMapping is the optional Record<string, ValueExpression> member exposed by RunActionOperation.",
            "required": false
          },
          {
            "name": "outputMapping",
            "type": "Record<string, string>",
            "description": "outputMapping is the optional Record<string, string> member exposed by RunActionOperation.",
            "required": false
          },
          {
            "name": "resultVariableId",
            "type": "string",
            "description": "resultVariableId is the optional string member exposed by RunActionOperation.",
            "required": false
          },
          {
            "name": "onResult",
            "type": "ActionResultBranch[]",
            "description": "onResult is the optional ActionResultBranch[] member exposed by RunActionOperation.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "operationId is the optional string member exposed by RunActionOperation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"run_action\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by RunActionOperation.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by RunActionOperation.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "ActionId",
          "Metadata",
          "ValueExpression",
          "BaseOperation",
          "ActionResultBranch"
        ]
      },
      {
        "name": "ActionResultBranch",
        "kind": "interface",
        "purpose": "ActionResultBranch defines the operations contract with match, branch, label, description, metadata.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface ActionResultBranch extends LabelledEntity {\n    match: ActionResultMatch;\n    branch: StepBranch;\n}"
        ],
        "fields": [
          "match",
          "branch",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "match",
            "type": "ActionResultMatch",
            "description": "match is the ActionResultMatch member exposed by ActionResultBranch.",
            "required": true
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch selected or returned by the contract.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by ActionResultBranch.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by ActionResultBranch.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "LabelledEntity",
          "StepBranch",
          "ActionResultMatch"
        ]
      },
      {
        "name": "ActionResultMatch",
        "kind": "union type",
        "purpose": "ActionResultMatch is the public union in Operations that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export type ActionResultMatch = ActionStatusMatch | ActionErrorCodeMatch | ActionOutcomeMatch;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "| ActionStatusMatch\n    | ActionErrorCodeMatch\n    | ActionOutcomeMatch",
            "description": "ActionResultMatch resolves to | ActionStatusMatch\n    | ActionErrorCodeMatch\n    | ActionOutcomeMatch.",
            "required": true
          }
        ],
        "related": [
          "ActionStatusMatch",
          "ActionErrorCodeMatch",
          "ActionOutcomeMatch"
        ]
      },
      {
        "name": "ActionStatusMatch",
        "kind": "interface",
        "purpose": "ActionStatusMatch defines the operations contract with type, status.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface ActionStatusMatch {\n    type: \"status\";\n    status: ActionResultStatus;\n}"
        ],
        "fields": [
          "type",
          "status"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"status\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "status",
            "type": "ActionResultStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          }
        ],
        "related": [
          "ActionResultStatus"
        ]
      },
      {
        "name": "ActionErrorCodeMatch",
        "kind": "interface",
        "purpose": "ActionErrorCodeMatch defines the operations contract with type, errorCode.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface ActionErrorCodeMatch {\n    type: \"error_code\";\n    errorCode: string;\n}"
        ],
        "fields": [
          "type",
          "errorCode"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"error_code\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "errorCode",
            "type": "string",
            "description": "Application or runtime error code.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "ActionOutcomeMatch",
        "kind": "interface",
        "purpose": "ActionOutcomeMatch defines the operations contract with type, outcome.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface ActionOutcomeMatch {\n    type: \"outcome\";\n    outcome: StepOutcome;\n}"
        ],
        "fields": [
          "type",
          "outcome"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"outcome\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": true
          }
        ],
        "related": [
          "StepOutcome"
        ]
      },
      {
        "name": "EmitEventOperation",
        "kind": "interface",
        "purpose": "EmitEventOperation defines the operations contract with eventType, payload, operationId, type, label, description.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface EmitEventOperation extends BaseOperation<\"emit_event\"> {\n    eventType: string;\n    payload?: Record<string, ValueExpression>;\n}"
        ],
        "fields": [
          "eventType",
          "payload",
          "operationId",
          "type",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "eventType",
            "type": "string",
            "description": "eventType is the string member exposed by EmitEventOperation.",
            "required": true
          },
          {
            "name": "payload",
            "type": "Record<string, ValueExpression>",
            "description": "Application payload attached to an event, input, or custom message.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "operationId is the optional string member exposed by EmitEventOperation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"emit_event\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by EmitEventOperation.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by EmitEventOperation.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "ValueExpression",
          "BaseOperation"
        ]
      },
      {
        "name": "CallFlowOperation",
        "kind": "interface",
        "purpose": "CallFlowOperation defines the operations contract with flowVersionId, inputMapping, outputMapping, variableSharing, resultVariableId, onResult.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface CallFlowOperation extends BaseOperation<\"call_flow\"> {\n    flowVersionId: FlowVersionId;\n    inputMapping?: Record<VariableId, ValueExpression>;\n    outputMapping?: Record<VariableId, VariableId>;\n    variableSharing?: FlowCallVariableSharing;\n    resultVariableId?: VariableId;\n    onResult?: FlowCallResultBranch[];\n}"
        ],
        "fields": [
          "flowVersionId",
          "inputMapping",
          "outputMapping",
          "variableSharing",
          "resultVariableId",
          "onResult",
          "operationId",
          "type",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "flowVersionId is the string member exposed by CallFlowOperation.",
            "required": true
          },
          {
            "name": "inputMapping",
            "type": "Record<string, ValueExpression>",
            "description": "inputMapping is the optional Record<string, ValueExpression> member exposed by CallFlowOperation.",
            "required": false
          },
          {
            "name": "outputMapping",
            "type": "Record<string, string>",
            "description": "outputMapping is the optional Record<string, string> member exposed by CallFlowOperation.",
            "required": false
          },
          {
            "name": "variableSharing",
            "type": "FlowCallVariableSharing",
            "description": "variableSharing is the optional FlowCallVariableSharing member exposed by CallFlowOperation.",
            "required": false
          },
          {
            "name": "resultVariableId",
            "type": "string",
            "description": "resultVariableId is the optional string member exposed by CallFlowOperation.",
            "required": false
          },
          {
            "name": "onResult",
            "type": "FlowCallResultBranch[]",
            "description": "onResult is the optional FlowCallResultBranch[] member exposed by CallFlowOperation.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "operationId is the optional string member exposed by CallFlowOperation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"call_flow\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by CallFlowOperation.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by CallFlowOperation.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "FlowVersionId",
          "VariableId",
          "Metadata",
          "ValueExpression",
          "BaseOperation",
          "FlowCallVariableSharing",
          "FlowCallResultBranch"
        ]
      },
      {
        "name": "FlowCallVariableSharing",
        "kind": "interface",
        "purpose": "FlowCallVariableSharing defines the operations contract with scopes, includeVariableIds, excludeVariableIds.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface FlowCallVariableSharing {\n    scopes?: VariableScope[];\n    includeVariableIds?: VariableId[];\n    excludeVariableIds?: VariableId[];\n}"
        ],
        "fields": [
          "scopes",
          "includeVariableIds",
          "excludeVariableIds"
        ],
        "properties": [
          {
            "name": "scopes",
            "type": "VariableScope[]",
            "description": "scopes is the optional VariableScope[] member exposed by FlowCallVariableSharing.",
            "required": false
          },
          {
            "name": "includeVariableIds",
            "type": "string[]",
            "description": "includeVariableIds is the optional string[] member exposed by FlowCallVariableSharing.",
            "required": false
          },
          {
            "name": "excludeVariableIds",
            "type": "string[]",
            "description": "excludeVariableIds is the optional string[] member exposed by FlowCallVariableSharing.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "VariableScope"
        ]
      },
      {
        "name": "FlowCallStatus",
        "kind": "union type",
        "purpose": "FlowCallStatus is the public union in Operations that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export type FlowCallStatus = \"completed\" | \"cancelled\" | \"failed\" | \"handoff\";"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "| \"completed\"\n    | \"cancelled\"\n    | \"failed\"\n    | \"handoff\"",
            "description": "FlowCallStatus accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "FlowCallResult",
        "kind": "interface",
        "purpose": "FlowCallResult defines the operations contract with status, outcome, frameId, flowVersionId, variablePatches, error.",
        "usage": "Use FlowCallResult to inspect the structured outcome returned by the corresponding runtime, validation, or provider operation.",
        "signatures": [
          "export interface FlowCallResult {\n    status: FlowCallStatus;\n    outcome?: StepOutcome;\n    frameId: ExecutionFrameId;\n    flowVersionId: FlowVersionId;\n    variablePatches?: VariablePatch[];\n    error?: RuntimeError;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "status",
          "outcome",
          "frameId",
          "flowVersionId",
          "variablePatches",
          "error",
          "metadata"
        ],
        "properties": [
          {
            "name": "status",
            "type": "FlowCallStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": false
          },
          {
            "name": "frameId",
            "type": "string",
            "description": "frameId is the string member exposed by FlowCallResult.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "flowVersionId is the string member exposed by FlowCallResult.",
            "required": true
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<string>[]",
            "description": "Variable writes, unsets, or invalidations produced by execution.",
            "required": false
          },
          {
            "name": "error",
            "type": "RuntimeError",
            "description": "Runtime error produced by execution.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "FlowVersionId",
          "ExecutionFrameId",
          "Metadata",
          "StepOutcome",
          "VariablePatch",
          "FlowCallStatus",
          "RuntimeError"
        ]
      },
      {
        "name": "FlowCallResultBranch",
        "kind": "interface",
        "purpose": "FlowCallResultBranch defines the operations contract with match, branch, label, description, metadata.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface FlowCallResultBranch extends LabelledEntity {\n    match: FlowCallResultMatch;\n    branch: StepBranch;\n}"
        ],
        "fields": [
          "match",
          "branch",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "match",
            "type": "FlowCallResultMatch",
            "description": "match is the FlowCallResultMatch member exposed by FlowCallResultBranch.",
            "required": true
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch selected or returned by the contract.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by FlowCallResultBranch.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by FlowCallResultBranch.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "LabelledEntity",
          "StepBranch",
          "FlowCallResultMatch"
        ]
      },
      {
        "name": "FlowCallResultMatch",
        "kind": "union type",
        "purpose": "FlowCallResultMatch is the public union in Operations that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export type FlowCallResultMatch = FlowCallStatusMatch | FlowCallOutcomeMatch;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "| FlowCallStatusMatch\n    | FlowCallOutcomeMatch",
            "description": "FlowCallResultMatch resolves to | FlowCallStatusMatch\n    | FlowCallOutcomeMatch.",
            "required": true
          }
        ],
        "related": [
          "FlowCallStatusMatch",
          "FlowCallOutcomeMatch"
        ]
      },
      {
        "name": "FlowCallStatusMatch",
        "kind": "interface",
        "purpose": "FlowCallStatusMatch defines the operations contract with type, status.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface FlowCallStatusMatch {\n    type: \"status\";\n    status: FlowCallStatus;\n}"
        ],
        "fields": [
          "type",
          "status"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"status\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "status",
            "type": "FlowCallStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          }
        ],
        "related": [
          "FlowCallStatus"
        ]
      },
      {
        "name": "FlowCallOutcomeMatch",
        "kind": "interface",
        "purpose": "FlowCallOutcomeMatch defines the operations contract with type, outcome.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface FlowCallOutcomeMatch {\n    type: \"outcome\";\n    outcome: StepOutcome;\n}"
        ],
        "fields": [
          "type",
          "outcome"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"outcome\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": true
          }
        ],
        "related": [
          "StepOutcome"
        ]
      },
      {
        "name": "HandoffOperation",
        "kind": "interface",
        "purpose": "HandoffOperation defines the operations contract with channel, queue, reason, metadataMapping, handoffIdVariableId, message.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface HandoffOperation extends BaseOperation<\"handoff\"> {\n    channel?: string;\n    queue?: string;\n    reason?: ValueExpression;\n    metadataMapping?: Record<string, ValueExpression>;\n    handoffIdVariableId?: VariableId;\n    message?: ResponsePlan;\n    onResult?: HandoffResultBranch[];\n}"
        ],
        "fields": [
          "channel",
          "queue",
          "reason",
          "metadataMapping",
          "handoffIdVariableId",
          "message",
          "onResult",
          "operationId",
          "type",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          },
          {
            "name": "queue",
            "type": "string",
            "description": "queue is the optional string member exposed by HandoffOperation.",
            "required": false
          },
          {
            "name": "reason",
            "type": "ValueExpression",
            "description": "Human-readable reason for rejection, invalidation, handoff, or trace output.",
            "required": false
          },
          {
            "name": "metadataMapping",
            "type": "Record<string, ValueExpression>",
            "description": "metadataMapping is the optional Record<string, ValueExpression> member exposed by HandoffOperation.",
            "required": false
          },
          {
            "name": "handoffIdVariableId",
            "type": "string",
            "description": "handoffIdVariableId is the optional string member exposed by HandoffOperation.",
            "required": false
          },
          {
            "name": "message",
            "type": "ResponsePlan",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": false
          },
          {
            "name": "onResult",
            "type": "HandoffResultBranch[]",
            "description": "onResult is the optional HandoffResultBranch[] member exposed by HandoffOperation.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "operationId is the optional string member exposed by HandoffOperation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"handoff\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by HandoffOperation.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by HandoffOperation.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "Metadata",
          "ValueExpression",
          "ResponsePlan",
          "BaseOperation",
          "HandoffResultBranch"
        ]
      },
      {
        "name": "HandoffResultStatus",
        "kind": "union type",
        "purpose": "HandoffResultStatus is the public union in Operations that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export type HandoffResultStatus = \"success\" | \"unavailable\" | \"error\";"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "| \"success\"\n    | \"unavailable\"\n    | \"error\"",
            "description": "HandoffResultStatus accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "HandoffResult",
        "kind": "interface",
        "purpose": "HandoffResult defines the operations contract with status, handoffId, outcome, errorCode, errorMessage, metadata.",
        "usage": "Use HandoffResult to inspect the structured outcome returned by the corresponding runtime, validation, or provider operation.",
        "signatures": [
          "export interface HandoffResult {\n    status: HandoffResultStatus;\n    handoffId?: HandoffId;\n    outcome?: StepOutcome;\n    errorCode?: string;\n    errorMessage?: string;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "status",
          "handoffId",
          "outcome",
          "errorCode",
          "errorMessage",
          "metadata"
        ],
        "properties": [
          {
            "name": "status",
            "type": "HandoffResultStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "handoffId",
            "type": "string",
            "description": "handoffId is the optional string member exposed by HandoffResult.",
            "required": false
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": false
          },
          {
            "name": "errorCode",
            "type": "string",
            "description": "Application or runtime error code.",
            "required": false
          },
          {
            "name": "errorMessage",
            "type": "string",
            "description": "errorMessage is the optional string member exposed by HandoffResult.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "HandoffId",
          "Metadata",
          "StepOutcome",
          "HandoffResultStatus"
        ]
      },
      {
        "name": "HandoffResultBranch",
        "kind": "interface",
        "purpose": "HandoffResultBranch defines the operations contract with match, branch, label, description, metadata.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface HandoffResultBranch extends LabelledEntity {\n    match: HandoffResultMatch;\n    branch: StepBranch;\n}"
        ],
        "fields": [
          "match",
          "branch",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "match",
            "type": "HandoffResultMatch",
            "description": "match is the HandoffResultMatch member exposed by HandoffResultBranch.",
            "required": true
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch selected or returned by the contract.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by HandoffResultBranch.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by HandoffResultBranch.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "LabelledEntity",
          "StepBranch",
          "HandoffResultMatch"
        ]
      },
      {
        "name": "HandoffResultMatch",
        "kind": "union type",
        "purpose": "HandoffResultMatch is the public union in Operations that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export type HandoffResultMatch = HandoffStatusMatch | HandoffOutcomeMatch | HandoffErrorCodeMatch;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "| HandoffStatusMatch\n    | HandoffOutcomeMatch\n    | HandoffErrorCodeMatch",
            "description": "HandoffResultMatch resolves to | HandoffStatusMatch\n    | HandoffOutcomeMatch\n    | HandoffErrorCodeMatch.",
            "required": true
          }
        ],
        "related": [
          "HandoffStatusMatch",
          "HandoffOutcomeMatch",
          "HandoffErrorCodeMatch"
        ]
      },
      {
        "name": "HandoffStatusMatch",
        "kind": "interface",
        "purpose": "HandoffStatusMatch defines the operations contract with type, status.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface HandoffStatusMatch {\n    type: \"status\";\n    status: HandoffResultStatus;\n}"
        ],
        "fields": [
          "type",
          "status"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"status\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "status",
            "type": "HandoffResultStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          }
        ],
        "related": [
          "HandoffResultStatus"
        ]
      },
      {
        "name": "HandoffOutcomeMatch",
        "kind": "interface",
        "purpose": "HandoffOutcomeMatch defines the operations contract with type, outcome.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface HandoffOutcomeMatch {\n    type: \"outcome\";\n    outcome: StepOutcome;\n}"
        ],
        "fields": [
          "type",
          "outcome"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"outcome\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": true
          }
        ],
        "related": [
          "StepOutcome"
        ]
      },
      {
        "name": "HandoffErrorCodeMatch",
        "kind": "interface",
        "purpose": "HandoffErrorCodeMatch defines the operations contract with type, errorCode.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface HandoffErrorCodeMatch {\n    type: \"error_code\";\n    errorCode: string;\n}"
        ],
        "fields": [
          "type",
          "errorCode"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"error_code\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "errorCode",
            "type": "string",
            "description": "Application or runtime error code.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "CustomOperation",
        "kind": "interface",
        "purpose": "CustomOperation defines the operations contract with customOperationId, customType, inputMapping, config, resultVariableId, onResult.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface CustomOperation extends BaseOperation<\"custom\"> {\n    customOperationId: CustomOperationId;\n    customType: string;\n    inputMapping?: Record<string, ValueExpression>;\n    config?: JsonObject;\n    resultVariableId?: VariableId;\n    onResult?: CustomOperationResultBranch[];\n}"
        ],
        "fields": [
          "customOperationId",
          "customType",
          "inputMapping",
          "config",
          "resultVariableId",
          "onResult",
          "operationId",
          "type",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "customOperationId",
            "type": "string",
            "description": "customOperationId is the string member exposed by CustomOperation.",
            "required": true
          },
          {
            "name": "customType",
            "type": "string",
            "description": "customType is the string member exposed by CustomOperation.",
            "required": true
          },
          {
            "name": "inputMapping",
            "type": "Record<string, ValueExpression>",
            "description": "inputMapping is the optional Record<string, ValueExpression> member exposed by CustomOperation.",
            "required": false
          },
          {
            "name": "config",
            "type": "JsonObject",
            "description": "config is the optional JsonObject member exposed by CustomOperation.",
            "required": false
          },
          {
            "name": "resultVariableId",
            "type": "string",
            "description": "resultVariableId is the optional string member exposed by CustomOperation.",
            "required": false
          },
          {
            "name": "onResult",
            "type": "CustomOperationResultBranch[]",
            "description": "onResult is the optional CustomOperationResultBranch[] member exposed by CustomOperation.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "operationId is the optional string member exposed by CustomOperation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"custom\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by CustomOperation.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by CustomOperation.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "CustomOperationId",
          "JsonObject",
          "Metadata",
          "ValueExpression",
          "BaseOperation",
          "CustomOperationResultBranch"
        ]
      },
      {
        "name": "CustomOperationResultStatus",
        "kind": "union type",
        "purpose": "CustomOperationResultStatus is the public union in Operations that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export type CustomOperationResultStatus = \"completed\" | \"failed\" | \"skipped\";"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "| \"completed\"\n    | \"failed\"\n    | \"skipped\"",
            "description": "CustomOperationResultStatus accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "CustomOperationResult",
        "kind": "interface",
        "purpose": "CustomOperationResult defines the operations contract with status, outcome, outputs, errorCode, errorMessage, metadata.",
        "usage": "Use CustomOperationResult to inspect the structured outcome returned by the corresponding runtime, validation, or provider operation.",
        "signatures": [
          "export interface CustomOperationResult {\n    status: CustomOperationResultStatus;\n    outcome?: StepOutcome;\n    outputs?: Record<string, unknown>;\n    errorCode?: string;\n    errorMessage?: string;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "status",
          "outcome",
          "outputs",
          "errorCode",
          "errorMessage",
          "metadata"
        ],
        "properties": [
          {
            "name": "status",
            "type": "CustomOperationResultStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": false
          },
          {
            "name": "outputs",
            "type": "Record<string, unknown>",
            "description": "outputs is the optional Record<string, unknown> member exposed by CustomOperationResult.",
            "required": false
          },
          {
            "name": "errorCode",
            "type": "string",
            "description": "Application or runtime error code.",
            "required": false
          },
          {
            "name": "errorMessage",
            "type": "string",
            "description": "errorMessage is the optional string member exposed by CustomOperationResult.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "StepOutcome",
          "CustomOperationResultStatus"
        ]
      },
      {
        "name": "CustomOperationResultBranch",
        "kind": "interface",
        "purpose": "CustomOperationResultBranch defines the operations contract with match, branch, label, description, metadata.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface CustomOperationResultBranch extends LabelledEntity {\n    match: CustomOperationResultMatch;\n    branch: StepBranch;\n}"
        ],
        "fields": [
          "match",
          "branch",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "match",
            "type": "CustomOperationResultMatch",
            "description": "match is the CustomOperationResultMatch member exposed by CustomOperationResultBranch.",
            "required": true
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch selected or returned by the contract.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by CustomOperationResultBranch.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by CustomOperationResultBranch.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "LabelledEntity",
          "StepBranch",
          "CustomOperationResultMatch"
        ]
      },
      {
        "name": "CustomOperationResultMatch",
        "kind": "union type",
        "purpose": "CustomOperationResultMatch is the public union in Operations that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export type CustomOperationResultMatch = CustomOperationStatusMatch | CustomOperationOutcomeMatch | CustomOperationErrorCodeMatch;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "| CustomOperationStatusMatch\n    | CustomOperationOutcomeMatch\n    | CustomOperationErrorCodeMatch",
            "description": "CustomOperationResultMatch resolves to | CustomOperationStatusMatch\n    | CustomOperationOutcomeMatch\n    | CustomOperationErrorCodeMatch.",
            "required": true
          }
        ],
        "related": [
          "CustomOperationStatusMatch",
          "CustomOperationOutcomeMatch",
          "CustomOperationErrorCodeMatch"
        ]
      },
      {
        "name": "CustomOperationStatusMatch",
        "kind": "interface",
        "purpose": "CustomOperationStatusMatch defines the operations contract with type, status.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface CustomOperationStatusMatch {\n    type: \"status\";\n    status: CustomOperationResultStatus;\n}"
        ],
        "fields": [
          "type",
          "status"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"status\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "status",
            "type": "CustomOperationResultStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          }
        ],
        "related": [
          "CustomOperationResultStatus"
        ]
      },
      {
        "name": "CustomOperationOutcomeMatch",
        "kind": "interface",
        "purpose": "CustomOperationOutcomeMatch defines the operations contract with type, outcome.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface CustomOperationOutcomeMatch {\n    type: \"outcome\";\n    outcome: StepOutcome;\n}"
        ],
        "fields": [
          "type",
          "outcome"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"outcome\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": true
          }
        ],
        "related": [
          "StepOutcome"
        ]
      },
      {
        "name": "CustomOperationErrorCodeMatch",
        "kind": "interface",
        "purpose": "CustomOperationErrorCodeMatch defines the operations contract with type, errorCode.",
        "usage": "Use this contract when a branch or lifecycle hook needs an explicit effect.",
        "signatures": [
          "export interface CustomOperationErrorCodeMatch {\n    type: \"error_code\";\n    errorCode: string;\n}"
        ],
        "fields": [
          "type",
          "errorCode"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"error_code\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "errorCode",
            "type": "string",
            "description": "Application or runtime error code.",
            "required": true
          }
        ],
        "related": []
      }
    ]
  },
  {
    "title": "Input Processing",
    "summary": "Deterministic input contracts, normalizers, extractors, validators, and constrained semantic tasks.",
    "exports": [
      "InputType",
      "InputContract",
      "InputBinding",
      "GlobalCommandPolicy",
      "SemanticInputTaskMode",
      "SemanticInputTask",
      "InvalidInputBehavior",
      "UnknownInputBehavior",
      "AttachmentRules",
      "NormalizerDefinition",
      "ExtractorDefinition",
      "ValidatorDefinition",
      "ValidationResult"
    ],
    "entries": [
      {
        "name": "InputType",
        "kind": "union type",
        "purpose": "InputType is the public union in Input Processing that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when user input must be normalized, extracted, validated, rejected, saved, or semantically classified.",
        "signatures": [
          "export type InputType = \"text\" | \"choice\" | \"attachment\" | \"payload\" | \"event\";"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "| \"text\"\n    | \"choice\"\n    | \"attachment\"\n    | \"payload\"\n    | \"event\"",
            "description": "InputType accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "InputContract",
        "kind": "interface",
        "purpose": "InputContract defines the input processing contract with acceptedInputTypes, bindings, globalCommands, semanticTasks, invalidBehavior, unknownBehavior.",
        "usage": "Use this contract when user input must be normalized, extracted, validated, rejected, saved, or semantically classified.",
        "signatures": [
          "export interface InputContract<TOutcome extends StepOutcome = StepOutcome, TVariableId extends VariableId = VariableId> {\n    acceptedInputTypes: InputType[];\n    bindings?: InputBinding[];\n    globalCommands?: GlobalCommandPolicy;\n    semanticTasks?: SemanticInputTask<TOutcome, TVariableId>[];\n    invalidBehavior?: InvalidInputBehavior;\n    unknownBehavior?: UnknownInputBehavior;\n}"
        ],
        "fields": [
          "acceptedInputTypes",
          "bindings",
          "globalCommands",
          "semanticTasks",
          "invalidBehavior",
          "unknownBehavior"
        ],
        "properties": [
          {
            "name": "acceptedInputTypes",
            "type": "InputType[]",
            "description": "acceptedInputTypes is the InputType[] member exposed by InputContract.",
            "required": true
          },
          {
            "name": "bindings",
            "type": "InputBinding[]",
            "description": "bindings is the optional InputBinding[] member exposed by InputContract.",
            "required": false
          },
          {
            "name": "globalCommands",
            "type": "GlobalCommandPolicy",
            "description": "globalCommands is the optional GlobalCommandPolicy member exposed by InputContract.",
            "required": false
          },
          {
            "name": "semanticTasks",
            "type": "SemanticInputTask<TOutcome, TVariableId>[]",
            "description": "semanticTasks is the optional SemanticInputTask<TOutcome, TVariableId>[] member exposed by InputContract.",
            "required": false
          },
          {
            "name": "invalidBehavior",
            "type": "InvalidInputBehavior",
            "description": "invalidBehavior is the optional InvalidInputBehavior member exposed by InputContract.",
            "required": false
          },
          {
            "name": "unknownBehavior",
            "type": "UnknownInputBehavior",
            "description": "unknownBehavior is the optional UnknownInputBehavior member exposed by InputContract.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "StepOutcome",
          "InputType",
          "InputBinding",
          "GlobalCommandPolicy",
          "SemanticInputTask",
          "InvalidInputBehavior",
          "UnknownInputBehavior"
        ]
      },
      {
        "name": "InputBinding",
        "kind": "interface",
        "purpose": "InputBinding defines the input processing contract with targetVariableId, source, required, normalizers, extractors, validators.",
        "usage": "Use this contract when user input must be normalized, extracted, validated, rejected, saved, or semantically classified.",
        "signatures": [
          "export interface InputBinding {\n    targetVariableId: VariableId;\n    source: InputType;\n    required?: boolean;\n    normalizers?: NormalizerDefinition[];\n    extractors?: ExtractorDefinition[];\n    validators?: ValidatorDefinition[];\n    saveRawInput?: boolean;\n}"
        ],
        "fields": [
          "targetVariableId",
          "source",
          "required",
          "normalizers",
          "extractors",
          "validators",
          "saveRawInput"
        ],
        "properties": [
          {
            "name": "targetVariableId",
            "type": "string",
            "description": "targetVariableId is the string member exposed by InputBinding.",
            "required": true
          },
          {
            "name": "source",
            "type": "InputType",
            "description": "Runtime source that produced a value, patch, or trace fragment.",
            "required": true
          },
          {
            "name": "required",
            "type": "boolean",
            "description": "required is the optional boolean member exposed by InputBinding.",
            "required": false
          },
          {
            "name": "normalizers",
            "type": "NormalizerDefinition[]",
            "description": "normalizers is the optional NormalizerDefinition[] member exposed by InputBinding.",
            "required": false
          },
          {
            "name": "extractors",
            "type": "ExtractorDefinition[]",
            "description": "extractors is the optional ExtractorDefinition[] member exposed by InputBinding.",
            "required": false
          },
          {
            "name": "validators",
            "type": "ValidatorDefinition[]",
            "description": "validators is the optional ValidatorDefinition[] member exposed by InputBinding.",
            "required": false
          },
          {
            "name": "saveRawInput",
            "type": "boolean",
            "description": "saveRawInput is the optional boolean member exposed by InputBinding.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "InputType",
          "NormalizerDefinition",
          "ExtractorDefinition",
          "ValidatorDefinition"
        ]
      },
      {
        "name": "GlobalCommandPolicy",
        "kind": "interface",
        "purpose": "GlobalCommandPolicy defines the input processing contract with allowCancel, allowHelp, allowBack, allowHandoff.",
        "usage": "Use this contract when user input must be normalized, extracted, validated, rejected, saved, or semantically classified.",
        "signatures": [
          "export interface GlobalCommandPolicy {\n    allowCancel?: boolean;\n    allowHelp?: boolean;\n    allowBack?: boolean;\n    allowHandoff?: boolean;\n}"
        ],
        "fields": [
          "allowCancel",
          "allowHelp",
          "allowBack",
          "allowHandoff"
        ],
        "properties": [
          {
            "name": "allowCancel",
            "type": "boolean",
            "description": "allowCancel is the optional boolean member exposed by GlobalCommandPolicy.",
            "required": false
          },
          {
            "name": "allowHelp",
            "type": "boolean",
            "description": "allowHelp is the optional boolean member exposed by GlobalCommandPolicy.",
            "required": false
          },
          {
            "name": "allowBack",
            "type": "boolean",
            "description": "allowBack is the optional boolean member exposed by GlobalCommandPolicy.",
            "required": false
          },
          {
            "name": "allowHandoff",
            "type": "boolean",
            "description": "allowHandoff is the optional boolean member exposed by GlobalCommandPolicy.",
            "required": false
          }
        ],
        "related": []
      },
      {
        "name": "SemanticInputTaskMode",
        "kind": "union type",
        "purpose": "SemanticInputTaskMode is the public union in Input Processing that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when user input must be normalized, extracted, validated, rejected, saved, or semantically classified.",
        "signatures": [
          "export type SemanticInputTaskMode = \"after_invalid_input\" | \"after_valid_capture\" | \"menu_selection\";"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "| \"after_invalid_input\"\n    | \"after_valid_capture\"\n    | \"menu_selection\"",
            "description": "SemanticInputTaskMode accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "SemanticInputTask",
        "kind": "interface",
        "purpose": "SemanticInputTask defines the input processing contract with taskId, mode, allowedOutcomes, threshold, saveOutcomeToVariableId, allowedVariableIds.",
        "usage": "Use this contract when user input must be normalized, extracted, validated, rejected, saved, or semantically classified.",
        "signatures": [
          "export interface SemanticInputTask<TOutcome extends StepOutcome = StepOutcome, TVariableId extends VariableId = VariableId> extends LabelledEntity {\n    taskId?: TaskId;\n    mode: SemanticInputTaskMode;\n    allowedOutcomes: readonly TOutcome[];\n    threshold: number;\n    saveOutcomeToVariableId?: TVariableId;\n    allowedVariableIds?: readonly TVariableId[];\n    promptHint?: string;\n}"
        ],
        "fields": [
          "taskId",
          "mode",
          "allowedOutcomes",
          "threshold",
          "saveOutcomeToVariableId",
          "allowedVariableIds",
          "promptHint",
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "taskId",
            "type": "string",
            "description": "taskId is the optional string member exposed by SemanticInputTask.",
            "required": false
          },
          {
            "name": "mode",
            "type": "SemanticInputTaskMode",
            "description": "mode is the SemanticInputTaskMode member exposed by SemanticInputTask.",
            "required": true
          },
          {
            "name": "allowedOutcomes",
            "type": "readonly TOutcome[]",
            "description": "allowedOutcomes is the readonly TOutcome[] member exposed by SemanticInputTask.",
            "required": true
          },
          {
            "name": "threshold",
            "type": "number",
            "description": "threshold is the number member exposed by SemanticInputTask.",
            "required": true
          },
          {
            "name": "saveOutcomeToVariableId",
            "type": "TVariableId",
            "description": "saveOutcomeToVariableId is the optional TVariableId member exposed by SemanticInputTask.",
            "required": false
          },
          {
            "name": "allowedVariableIds",
            "type": "readonly TVariableId[]",
            "description": "allowedVariableIds is the optional readonly TVariableId[] member exposed by SemanticInputTask.",
            "required": false
          },
          {
            "name": "promptHint",
            "type": "string",
            "description": "promptHint is the optional string member exposed by SemanticInputTask.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by SemanticInputTask.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by SemanticInputTask.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "TaskId",
          "Metadata",
          "LabelledEntity",
          "StepOutcome",
          "SemanticInputTaskMode"
        ]
      },
      {
        "name": "InvalidInputBehavior",
        "kind": "interface",
        "purpose": "InvalidInputBehavior defines the input processing contract with message, target, maxRetries.",
        "usage": "Use this contract when user input must be normalized, extracted, validated, rejected, saved, or semantically classified.",
        "signatures": [
          "export interface InvalidInputBehavior {\n    message?: ResponsePlan;\n    target?: StepTarget;\n    maxRetries?: number;\n}"
        ],
        "fields": [
          "message",
          "target",
          "maxRetries"
        ],
        "properties": [
          {
            "name": "message",
            "type": "ResponsePlan",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": false
          },
          {
            "name": "target",
            "type": "StepTarget",
            "description": "target is the optional StepTarget member exposed by InvalidInputBehavior.",
            "required": false
          },
          {
            "name": "maxRetries",
            "type": "number",
            "description": "maxRetries is the optional number member exposed by InvalidInputBehavior.",
            "required": false
          }
        ],
        "related": [
          "ResponsePlan",
          "StepTarget"
        ]
      },
      {
        "name": "UnknownInputBehavior",
        "kind": "interface",
        "purpose": "UnknownInputBehavior defines the input processing contract with message, target.",
        "usage": "Use this contract when user input must be normalized, extracted, validated, rejected, saved, or semantically classified.",
        "signatures": [
          "export interface UnknownInputBehavior {\n    message?: ResponsePlan;\n    target?: StepTarget;\n}"
        ],
        "fields": [
          "message",
          "target"
        ],
        "properties": [
          {
            "name": "message",
            "type": "ResponsePlan",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": false
          },
          {
            "name": "target",
            "type": "StepTarget",
            "description": "target is the optional StepTarget member exposed by UnknownInputBehavior.",
            "required": false
          }
        ],
        "related": [
          "ResponsePlan",
          "StepTarget"
        ]
      },
      {
        "name": "AttachmentRules",
        "kind": "interface",
        "purpose": "AttachmentRules defines the input processing contract with required, allowedMimeTypes, allowedExtensions, maxFiles, maxSizeMb, validators.",
        "usage": "Use this contract when user input must be normalized, extracted, validated, rejected, saved, or semantically classified.",
        "signatures": [
          "export interface AttachmentRules {\n    required?: boolean;\n    allowedMimeTypes?: string[];\n    allowedExtensions?: string[];\n    maxFiles?: number;\n    maxSizeMb?: number;\n    validators?: ValidatorDefinition[];\n}"
        ],
        "fields": [
          "required",
          "allowedMimeTypes",
          "allowedExtensions",
          "maxFiles",
          "maxSizeMb",
          "validators"
        ],
        "properties": [
          {
            "name": "required",
            "type": "boolean",
            "description": "required is the optional boolean member exposed by AttachmentRules.",
            "required": false
          },
          {
            "name": "allowedMimeTypes",
            "type": "string[]",
            "description": "allowedMimeTypes is the optional string[] member exposed by AttachmentRules.",
            "required": false
          },
          {
            "name": "allowedExtensions",
            "type": "string[]",
            "description": "allowedExtensions is the optional string[] member exposed by AttachmentRules.",
            "required": false
          },
          {
            "name": "maxFiles",
            "type": "number",
            "description": "maxFiles is the optional number member exposed by AttachmentRules.",
            "required": false
          },
          {
            "name": "maxSizeMb",
            "type": "number",
            "description": "maxSizeMb is the optional number member exposed by AttachmentRules.",
            "required": false
          },
          {
            "name": "validators",
            "type": "ValidatorDefinition[]",
            "description": "validators is the optional ValidatorDefinition[] member exposed by AttachmentRules.",
            "required": false
          }
        ],
        "related": [
          "ValidatorDefinition"
        ]
      },
      {
        "name": "NormalizerDefinition",
        "kind": "interface",
        "purpose": "Declares one normalizer in an InputBinding before extraction and validation run.",
        "usage": "Use it to trim, lowercase, uppercase, collapse spaces, or invoke a registered custom normalizer while keeping the pipeline explicit in flow data.",
        "signatures": [
          "export interface NormalizerDefinition {\n    type: string;\n    options?: JsonObject;\n}"
        ],
        "fields": [
          "type",
          "options"
        ],
        "properties": [
          {
            "name": "type",
            "type": "string",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "options",
            "type": "JsonObject",
            "description": "Configuration object interpreted by the registered normalizer, extractor, or validator.",
            "required": false
          }
        ],
        "related": [
          "JsonObject"
        ]
      },
      {
        "name": "ExtractorDefinition",
        "kind": "interface",
        "purpose": "Declares one extractor in an InputBinding for pulling values from UserInput before validation.",
        "usage": "Use it to extract raw text, regex matches, attachment references, payload fields, or custom values through a registered extractor.",
        "signatures": [
          "export interface ExtractorDefinition {\n    type: string;\n    options?: JsonObject;\n}"
        ],
        "fields": [
          "type",
          "options"
        ],
        "properties": [
          {
            "name": "type",
            "type": "string",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "options",
            "type": "JsonObject",
            "description": "Configuration object interpreted by the registered normalizer, extractor, or validator.",
            "required": false
          }
        ],
        "related": [
          "JsonObject"
        ]
      },
      {
        "name": "ValidatorDefinition",
        "kind": "interface",
        "purpose": "Declares one validator in an InputBinding or VariableDefinition, including the validator type, validator options, and optional user-facing failure message.",
        "usage": "Use it to keep validation rules in flow data while the behavior comes from built-in validators or validators registered on the engine.",
        "signatures": [
          "export interface ValidatorDefinition {\n    type: string;\n    options?: JsonObject;\n    message?: ResponsePlan;\n}"
        ],
        "fields": [
          "type",
          "options",
          "message"
        ],
        "properties": [
          {
            "name": "type",
            "type": "string",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "options",
            "type": "JsonObject",
            "description": "Configuration object interpreted by the registered normalizer, extractor, or validator.",
            "required": false
          },
          {
            "name": "message",
            "type": "ResponsePlan",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": false
          }
        ],
        "related": [
          "JsonObject",
          "ResponsePlan"
        ]
      },
      {
        "name": "ValidationResult",
        "kind": "interface",
        "purpose": "Result returned by a Validator after checking an extracted or normalized input value.",
        "usage": "Return it from custom validators to accept the value, reject it with a reason or error code, or pass back a normalizedValue.",
        "signatures": [
          "export interface ValidationResult {\n    valid: boolean;\n    reason?: string;\n    normalizedValue?: unknown;\n    errorCode?: string;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "valid",
          "reason",
          "normalizedValue",
          "errorCode",
          "metadata"
        ],
        "properties": [
          {
            "name": "valid",
            "type": "boolean",
            "description": "Whether validation or model checking succeeded.",
            "required": true
          },
          {
            "name": "reason",
            "type": "string",
            "description": "Human-readable reason for rejection, invalidation, handoff, or trace output.",
            "required": false
          },
          {
            "name": "normalizedValue",
            "type": "unknown",
            "description": "Replacement value produced by a validator after successful validation.",
            "required": false
          },
          {
            "name": "errorCode",
            "type": "string",
            "description": "Application or runtime error code.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata"
        ]
      }
    ]
  },
  {
    "title": "User Input",
    "summary": "Inbound text, choice, attachment, payload, and event objects accepted by the runtime.",
    "exports": [
      "UserInput",
      "BaseUserInput",
      "TextUserInput",
      "ChoiceUserInput",
      "AttachmentUserInput",
      "AttachmentInput",
      "PayloadUserInput",
      "EventUserInput"
    ],
    "entries": [
      {
        "name": "UserInput",
        "kind": "union type",
        "purpose": "UserInput is the public union in User Input that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when constructing inbound values for ConversationEngine or ConversationApi calls.",
        "signatures": [
          "export type UserInput = TextUserInput | ChoiceUserInput | AttachmentUserInput | PayloadUserInput | EventUserInput;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "| TextUserInput\n    | ChoiceUserInput\n    | AttachmentUserInput\n    | PayloadUserInput\n    | EventUserInput",
            "description": "UserInput resolves to | TextUserInput\n    | ChoiceUserInput\n    | AttachmentUserInput\n    | PayloadUserInput\n    | EventUserInput.",
            "required": true
          }
        ],
        "related": [
          "TextUserInput",
          "ChoiceUserInput",
          "AttachmentUserInput",
          "PayloadUserInput",
          "EventUserInput"
        ]
      },
      {
        "name": "BaseUserInput",
        "kind": "interface",
        "purpose": "BaseUserInput defines the user input contract with inputId, type, conversationId, turnId, channel, receivedAt.",
        "usage": "Use this contract when constructing inbound values for ConversationEngine or ConversationApi calls.",
        "signatures": [
          "export interface BaseUserInput<TType extends InputType> {\n    inputId: MessageId;\n    type: TType;\n    conversationId: ConversationId;\n    turnId?: TurnId;\n    channel?: string;\n    receivedAt: ISODateString;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "inputId",
          "type",
          "conversationId",
          "turnId",
          "channel",
          "receivedAt",
          "metadata"
        ],
        "properties": [
          {
            "name": "inputId",
            "type": "string",
            "description": "inputId is the string member exposed by BaseUserInput.",
            "required": true
          },
          {
            "name": "type",
            "type": "TType",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "receivedAt is the string member exposed by BaseUserInput.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "ConversationId",
          "TurnId",
          "MessageId",
          "ISODateString",
          "Metadata",
          "InputType"
        ]
      },
      {
        "name": "TextUserInput",
        "kind": "interface",
        "purpose": "TextUserInput defines the user input contract with text, inputId, type, conversationId, turnId, channel.",
        "usage": "Use this contract when constructing inbound values for ConversationEngine or ConversationApi calls.",
        "signatures": [
          "export interface TextUserInput extends BaseUserInput<\"text\"> {\n    text: string;\n}"
        ],
        "fields": [
          "text",
          "inputId",
          "type",
          "conversationId",
          "turnId",
          "channel",
          "receivedAt",
          "metadata"
        ],
        "properties": [
          {
            "name": "text",
            "type": "string",
            "description": "Text content sent by a user or returned to a user.",
            "required": true
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "inputId is the string member exposed by TextUserInput.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"text\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "receivedAt is the string member exposed by TextUserInput.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "BaseUserInput"
        ]
      },
      {
        "name": "ChoiceUserInput",
        "kind": "interface",
        "purpose": "ChoiceUserInput defines the user input contract with optionId, label, payload, inputId, type, conversationId.",
        "usage": "Use this contract when constructing inbound values for ConversationEngine or ConversationApi calls.",
        "signatures": [
          "export interface ChoiceUserInput extends BaseUserInput<\"choice\"> {\n    optionId?: OptionId;\n    label?: string;\n    payload?: JsonObject;\n}"
        ],
        "fields": [
          "optionId",
          "label",
          "payload",
          "inputId",
          "type",
          "conversationId",
          "turnId",
          "channel",
          "receivedAt",
          "metadata"
        ],
        "properties": [
          {
            "name": "optionId",
            "type": "string",
            "description": "optionId is the optional string member exposed by ChoiceUserInput.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by ChoiceUserInput.",
            "required": false
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Application payload attached to an event, input, or custom message.",
            "required": false
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "inputId is the string member exposed by ChoiceUserInput.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"choice\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "receivedAt is the string member exposed by ChoiceUserInput.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "OptionId",
          "JsonObject",
          "Metadata",
          "BaseUserInput"
        ]
      },
      {
        "name": "AttachmentUserInput",
        "kind": "interface",
        "purpose": "AttachmentUserInput defines the user input contract with attachments, inputId, type, conversationId, turnId, channel.",
        "usage": "Use this contract when constructing inbound values for ConversationEngine or ConversationApi calls.",
        "signatures": [
          "export interface AttachmentUserInput extends BaseUserInput<\"attachment\"> {\n    attachments: AttachmentInput[];\n}"
        ],
        "fields": [
          "attachments",
          "inputId",
          "type",
          "conversationId",
          "turnId",
          "channel",
          "receivedAt",
          "metadata"
        ],
        "properties": [
          {
            "name": "attachments",
            "type": "AttachmentInput[]",
            "description": "attachments is the AttachmentInput[] member exposed by AttachmentUserInput.",
            "required": true
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "inputId is the string member exposed by AttachmentUserInput.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"attachment\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "receivedAt is the string member exposed by AttachmentUserInput.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "BaseUserInput",
          "AttachmentInput"
        ]
      },
      {
        "name": "AttachmentInput",
        "kind": "interface",
        "purpose": "AttachmentInput defines the user input contract with attachmentId, filename, mimeType, sizeBytes, url, metadata.",
        "usage": "Use this contract when constructing inbound values for ConversationEngine or ConversationApi calls.",
        "signatures": [
          "export interface AttachmentInput {\n    attachmentId?: AttachmentId;\n    filename: string;\n    mimeType: string;\n    sizeBytes: number;\n    url?: string;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "attachmentId",
          "filename",
          "mimeType",
          "sizeBytes",
          "url",
          "metadata"
        ],
        "properties": [
          {
            "name": "attachmentId",
            "type": "string",
            "description": "attachmentId is the optional string member exposed by AttachmentInput.",
            "required": false
          },
          {
            "name": "filename",
            "type": "string",
            "description": "filename is the string member exposed by AttachmentInput.",
            "required": true
          },
          {
            "name": "mimeType",
            "type": "string",
            "description": "mimeType is the string member exposed by AttachmentInput.",
            "required": true
          },
          {
            "name": "sizeBytes",
            "type": "number",
            "description": "sizeBytes is the number member exposed by AttachmentInput.",
            "required": true
          },
          {
            "name": "url",
            "type": "string",
            "description": "url is the optional string member exposed by AttachmentInput.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "AttachmentId",
          "Metadata"
        ]
      },
      {
        "name": "PayloadUserInput",
        "kind": "interface",
        "purpose": "PayloadUserInput defines the user input contract with payload, inputId, type, conversationId, turnId, channel.",
        "usage": "Use this contract when constructing inbound values for ConversationEngine or ConversationApi calls.",
        "signatures": [
          "export interface PayloadUserInput extends BaseUserInput<\"payload\"> {\n    payload: JsonObject;\n}"
        ],
        "fields": [
          "payload",
          "inputId",
          "type",
          "conversationId",
          "turnId",
          "channel",
          "receivedAt",
          "metadata"
        ],
        "properties": [
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Application payload attached to an event, input, or custom message.",
            "required": true
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "inputId is the string member exposed by PayloadUserInput.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"payload\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "receivedAt is the string member exposed by PayloadUserInput.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "JsonObject",
          "Metadata",
          "BaseUserInput"
        ]
      },
      {
        "name": "EventUserInput",
        "kind": "interface",
        "purpose": "EventUserInput defines the user input contract with eventType, payload, inputId, type, conversationId, turnId.",
        "usage": "Use this contract when constructing inbound values for ConversationEngine or ConversationApi calls.",
        "signatures": [
          "export interface EventUserInput extends BaseUserInput<\"event\"> {\n    eventType: string;\n    payload?: JsonObject;\n}"
        ],
        "fields": [
          "eventType",
          "payload",
          "inputId",
          "type",
          "conversationId",
          "turnId",
          "channel",
          "receivedAt",
          "metadata"
        ],
        "properties": [
          {
            "name": "eventType",
            "type": "string",
            "description": "eventType is the string member exposed by EventUserInput.",
            "required": true
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Application payload attached to an event, input, or custom message.",
            "required": false
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "inputId is the string member exposed by EventUserInput.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"event\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "receivedAt is the string member exposed by EventUserInput.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "JsonObject",
          "Metadata",
          "BaseUserInput"
        ]
      }
    ]
  },
  {
    "title": "Input Resolution",
    "summary": "Candidate and semantic resolution contracts produced while interpreting user input.",
    "exports": [
      "CandidateType",
      "CommandCandidate",
      "InputResolutionResult",
      "SemanticInputResolution"
    ],
    "entries": [
      {
        "name": "CandidateType",
        "kind": "union type",
        "purpose": "CandidateType is the public union in Input Resolution that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when writing input resolvers or inspecting semantic classification results.",
        "signatures": [
          "export type CandidateType = \"provide_value\" | \"provide_many_values\" | \"select_option\" | \"semantic_outcome\" | \"global_command\" | \"unknown\";"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "| \"provide_value\"\n    | \"provide_many_values\"\n    | \"select_option\"\n    | \"semantic_outcome\"\n    | \"global_command\"\n    | \"unknown\"",
            "description": "CandidateType accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "CommandCandidate",
        "kind": "interface",
        "purpose": "CommandCandidate defines the input resolution contract with candidateId, type, outcome, optionId, variablePatches, source.",
        "usage": "Use this contract when writing input resolvers or inspecting semantic classification results.",
        "signatures": [
          "export interface CommandCandidate<TOutcome extends StepOutcome = StepOutcome, TVariableId extends VariableId = VariableId> {\n    candidateId: CandidateId;\n    type: CandidateType;\n    outcome?: TOutcome;\n    optionId?: OptionId;\n    variablePatches?: VariablePatch<TVariableId>[];\n    source: string;\n    confidence?: number;\n    explanation?: string;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "candidateId",
          "type",
          "outcome",
          "optionId",
          "variablePatches",
          "source",
          "confidence",
          "explanation",
          "metadata"
        ],
        "properties": [
          {
            "name": "candidateId",
            "type": "string",
            "description": "candidateId is the string member exposed by CommandCandidate.",
            "required": true
          },
          {
            "name": "type",
            "type": "CandidateType",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "TOutcome",
            "description": "Named outcome used for route or result branch selection.",
            "required": false
          },
          {
            "name": "optionId",
            "type": "string",
            "description": "optionId is the optional string member exposed by CommandCandidate.",
            "required": false
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<TVariableId>[]",
            "description": "Variable writes, unsets, or invalidations produced by execution.",
            "required": false
          },
          {
            "name": "source",
            "type": "string",
            "description": "Runtime source that produced a value, patch, or trace fragment.",
            "required": true
          },
          {
            "name": "confidence",
            "type": "number",
            "description": "confidence is the optional number member exposed by CommandCandidate.",
            "required": false
          },
          {
            "name": "explanation",
            "type": "string",
            "description": "explanation is the optional string member exposed by CommandCandidate.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "OptionId",
          "VariableId",
          "CandidateId",
          "Metadata",
          "StepOutcome",
          "VariablePatch",
          "CandidateType"
        ]
      },
      {
        "name": "InputResolutionResult",
        "kind": "interface",
        "purpose": "InputResolutionResult defines the input resolution contract with status, candidates, selectedCandidate, variablePatches, validationResults, outcome.",
        "usage": "Use InputResolutionResult to inspect the structured outcome returned by the corresponding runtime, validation, or provider operation.",
        "signatures": [
          "export interface InputResolutionResult<TOutcome extends StepOutcome = StepOutcome, TVariableId extends VariableId = VariableId> {\n    status: \"resolved\" | \"invalid\" | \"unknown\" | \"ambiguous\";\n    candidates: CommandCandidate<TOutcome, TVariableId>[];\n    selectedCandidate?: CommandCandidate<TOutcome, TVariableId>;\n    variablePatches?: VariablePatch<TVariableId>[];\n    validationResults?: ValidationResult[];\n    outcome?: TOutcome;\n    trace: TraceFragment;\n}"
        ],
        "fields": [
          "status",
          "candidates",
          "selectedCandidate",
          "variablePatches",
          "validationResults",
          "outcome",
          "trace"
        ],
        "properties": [
          {
            "name": "status",
            "type": "\"unknown\" | \"resolved\" | \"invalid\" | \"ambiguous\"",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "candidates",
            "type": "CommandCandidate<TOutcome, TVariableId>[]",
            "description": "candidates is the CommandCandidate<TOutcome, TVariableId>[] member exposed by InputResolutionResult.",
            "required": true
          },
          {
            "name": "selectedCandidate",
            "type": "CommandCandidate<TOutcome, TVariableId>",
            "description": "selectedCandidate is the optional CommandCandidate<TOutcome, TVariableId> member exposed by InputResolutionResult.",
            "required": false
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<TVariableId>[]",
            "description": "Variable writes, unsets, or invalidations produced by execution.",
            "required": false
          },
          {
            "name": "validationResults",
            "type": "ValidationResult[]",
            "description": "validationResults is the optional ValidationResult[] member exposed by InputResolutionResult.",
            "required": false
          },
          {
            "name": "outcome",
            "type": "TOutcome",
            "description": "Named outcome used for route or result branch selection.",
            "required": false
          },
          {
            "name": "trace",
            "type": "TraceFragment",
            "description": "Trace fragment or decision trace evidence for this contract.",
            "required": true
          }
        ],
        "related": [
          "VariableId",
          "StepOutcome",
          "VariablePatch",
          "ValidationResult",
          "CommandCandidate",
          "TraceFragment"
        ]
      },
      {
        "name": "SemanticInputResolution",
        "kind": "interface",
        "purpose": "SemanticInputResolution defines the input resolution contract with taskId, allowedOutcomes, allowedVariableIds, confidence, variables, status.",
        "usage": "Use this contract when writing input resolvers or inspecting semantic classification results.",
        "signatures": [
          "export interface SemanticInputResolution<TOutcome extends StepOutcome = StepOutcome, TVariableId extends VariableId = VariableId> extends InputResolutionResult<TOutcome, TVariableId> {\n    taskId?: TaskId;\n    allowedOutcomes: readonly TOutcome[];\n    allowedVariableIds?: readonly TVariableId[];\n    confidence?: number;\n    variables?: Partial<Record<TVariableId, unknown>>;\n}"
        ],
        "fields": [
          "taskId",
          "allowedOutcomes",
          "allowedVariableIds",
          "confidence",
          "variables",
          "status",
          "candidates",
          "selectedCandidate",
          "variablePatches",
          "validationResults",
          "outcome",
          "trace"
        ],
        "properties": [
          {
            "name": "taskId",
            "type": "string",
            "description": "taskId is the optional string member exposed by SemanticInputResolution.",
            "required": false
          },
          {
            "name": "allowedOutcomes",
            "type": "readonly TOutcome[]",
            "description": "allowedOutcomes is the readonly TOutcome[] member exposed by SemanticInputResolution.",
            "required": true
          },
          {
            "name": "allowedVariableIds",
            "type": "readonly TVariableId[]",
            "description": "allowedVariableIds is the optional readonly TVariableId[] member exposed by SemanticInputResolution.",
            "required": false
          },
          {
            "name": "confidence",
            "type": "number",
            "description": "confidence is the optional number member exposed by SemanticInputResolution.",
            "required": false
          },
          {
            "name": "variables",
            "type": "Partial<Record<TVariableId, unknown>>",
            "description": "Variable declarations available to the flow.",
            "required": false
          },
          {
            "name": "status",
            "type": "\"unknown\" | \"resolved\" | \"invalid\" | \"ambiguous\"",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "candidates",
            "type": "CommandCandidate<TOutcome, TVariableId>[]",
            "description": "candidates is the CommandCandidate<TOutcome, TVariableId>[] member exposed by SemanticInputResolution.",
            "required": true
          },
          {
            "name": "selectedCandidate",
            "type": "CommandCandidate<TOutcome, TVariableId>",
            "description": "selectedCandidate is the optional CommandCandidate<TOutcome, TVariableId> member exposed by SemanticInputResolution.",
            "required": false
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<TVariableId>[]",
            "description": "Variable writes, unsets, or invalidations produced by execution.",
            "required": false
          },
          {
            "name": "validationResults",
            "type": "ValidationResult[]",
            "description": "validationResults is the optional ValidationResult[] member exposed by SemanticInputResolution.",
            "required": false
          },
          {
            "name": "outcome",
            "type": "TOutcome",
            "description": "Named outcome used for route or result branch selection.",
            "required": false
          },
          {
            "name": "trace",
            "type": "TraceFragment",
            "description": "Trace fragment or decision trace evidence for this contract.",
            "required": true
          }
        ],
        "related": [
          "VariableId",
          "TaskId",
          "StepOutcome",
          "VariablePatch",
          "ValidationResult",
          "CommandCandidate",
          "InputResolutionResult",
          "TraceFragment"
        ]
      }
    ]
  },
  {
    "title": "Runtime State",
    "summary": "Conversation records, turn state, pending input, scoped variables, and flow execution frames.",
    "exports": [
      "Conversation",
      "ConversationState",
      "ConversationVariableValues",
      "ScopedVariableValuesByKey",
      "ConversationVariableHistory",
      "FlowExecutionFrame",
      "PendingInputState",
      "Turn"
    ],
    "entries": [
      {
        "name": "Conversation",
        "kind": "interface",
        "purpose": "Conversation defines the runtime state contract with conversationId, flowVersionId, status, channel, userId, createdAt.",
        "usage": "Use this contract when persisting or inspecting conversation execution state.",
        "signatures": [
          "export interface Conversation {\n    conversationId: ConversationId;\n    flowVersionId: FlowVersionId;\n    status: ConversationStatus;\n    channel?: string;\n    userId?: string;\n    createdAt: ISODateString;\n    updatedAt: ISODateString;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "conversationId",
          "flowVersionId",
          "status",
          "channel",
          "userId",
          "createdAt",
          "updatedAt",
          "metadata"
        ],
        "properties": [
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "flowVersionId is the string member exposed by Conversation.",
            "required": true
          },
          {
            "name": "status",
            "type": "ConversationStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          },
          {
            "name": "userId",
            "type": "string",
            "description": "userId is the optional string member exposed by Conversation.",
            "required": false
          },
          {
            "name": "createdAt",
            "type": "string",
            "description": "ISO timestamp when the object was created.",
            "required": true
          },
          {
            "name": "updatedAt",
            "type": "string",
            "description": "ISO timestamp for the last update.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "FlowVersionId",
          "ConversationId",
          "ISODateString",
          "Metadata",
          "ConversationStatus"
        ]
      },
      {
        "name": "ConversationState",
        "kind": "interface",
        "purpose": "ConversationState defines the runtime state contract with conversationId, flowVersionId, status, currentStepId, variables, scopedVariables.",
        "usage": "Use this contract when persisting or inspecting conversation execution state.",
        "signatures": [
          "export interface ConversationState {\n    conversationId: ConversationId;\n    flowVersionId: FlowVersionId;\n    status: ConversationStatus;\n    currentStepId: StepId;\n    variables: ConversationVariableValues;\n    scopedVariables?: ScopedVariableValuesByKey;\n    variableHistory?: ConversationVariableHistory;\n    executionStack: FlowExecutionFrame[];\n    pendingInput?: PendingInputState;\n    lastUserInput?: UserInput;\n    lastOutboundMessages?: OutboundMessage[];\n    version: number;\n    updatedAt: ISODateString;\n}"
        ],
        "fields": [
          "conversationId",
          "flowVersionId",
          "status",
          "currentStepId",
          "variables",
          "scopedVariables",
          "variableHistory",
          "executionStack",
          "pendingInput",
          "lastUserInput",
          "lastOutboundMessages",
          "version",
          "updatedAt"
        ],
        "properties": [
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "flowVersionId is the string member exposed by ConversationState.",
            "required": true
          },
          {
            "name": "status",
            "type": "ConversationStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "currentStepId",
            "type": "string",
            "description": "currentStepId is the string member exposed by ConversationState.",
            "required": true
          },
          {
            "name": "variables",
            "type": "ConversationVariableValues",
            "description": "Variable declarations available to the flow.",
            "required": true
          },
          {
            "name": "scopedVariables",
            "type": "ScopedVariableValuesByKey",
            "description": "scopedVariables is the optional ScopedVariableValuesByKey member exposed by ConversationState.",
            "required": false
          },
          {
            "name": "variableHistory",
            "type": "ConversationVariableHistory",
            "description": "variableHistory is the optional ConversationVariableHistory member exposed by ConversationState.",
            "required": false
          },
          {
            "name": "executionStack",
            "type": "FlowExecutionFrame[]",
            "description": "executionStack is the FlowExecutionFrame[] member exposed by ConversationState.",
            "required": true
          },
          {
            "name": "pendingInput",
            "type": "PendingInputState",
            "description": "pendingInput is the optional PendingInputState member exposed by ConversationState.",
            "required": false
          },
          {
            "name": "lastUserInput",
            "type": "UserInput",
            "description": "lastUserInput is the optional UserInput member exposed by ConversationState.",
            "required": false
          },
          {
            "name": "lastOutboundMessages",
            "type": "OutboundMessage[]",
            "description": "lastOutboundMessages is the optional OutboundMessage[] member exposed by ConversationState.",
            "required": false
          },
          {
            "name": "version",
            "type": "number",
            "description": "version is the number member exposed by ConversationState.",
            "required": true
          },
          {
            "name": "updatedAt",
            "type": "string",
            "description": "ISO timestamp for the last update.",
            "required": true
          }
        ],
        "related": [
          "FlowVersionId",
          "StepId",
          "ConversationId",
          "ISODateString",
          "ConversationStatus",
          "UserInput",
          "ConversationVariableValues",
          "ScopedVariableValuesByKey",
          "ConversationVariableHistory",
          "FlowExecutionFrame"
        ]
      },
      {
        "name": "ConversationVariableValues",
        "kind": "type",
        "purpose": "ConversationVariableValues is a public type in Runtime State.",
        "usage": "Use this contract when persisting or inspecting conversation execution state.",
        "signatures": [
          "export type ConversationVariableValues = Record<VariableId, VariableValue>;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "Record<VariableId, VariableValue>",
            "description": "ConversationVariableValues resolves to Record<VariableId, VariableValue>.",
            "required": true
          }
        ],
        "related": [
          "VariableId",
          "VariableValue"
        ]
      },
      {
        "name": "ScopedVariableValuesByKey",
        "kind": "type",
        "purpose": "ScopedVariableValuesByKey is a public type in Runtime State.",
        "usage": "Use this contract when persisting or inspecting conversation execution state.",
        "signatures": [
          "export type ScopedVariableValuesByKey = Record<string, VariableValue>;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "Record<string, VariableValue>",
            "description": "ScopedVariableValuesByKey resolves to Record<string, VariableValue>.",
            "required": true
          }
        ],
        "related": [
          "VariableValue"
        ]
      },
      {
        "name": "ConversationVariableHistory",
        "kind": "type",
        "purpose": "ConversationVariableHistory is a public type in Runtime State.",
        "usage": "Use this contract when persisting or inspecting conversation execution state.",
        "signatures": [
          "export type ConversationVariableHistory = Record<VariableId, VariableHistoryEntry[]>;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "Record<VariableId, VariableHistoryEntry[]>",
            "description": "ConversationVariableHistory resolves to Record<VariableId, VariableHistoryEntry[]>.",
            "required": true
          }
        ],
        "related": [
          "VariableId",
          "VariableHistoryEntry"
        ]
      },
      {
        "name": "FlowExecutionFrame",
        "kind": "interface",
        "purpose": "FlowExecutionFrame defines the runtime state contract with frameId, flowVersionId, flowId, currentStepId, parentFrameId, callOperationId.",
        "usage": "Use this contract when persisting or inspecting conversation execution state.",
        "signatures": [
          "export interface FlowExecutionFrame {\n    frameId: ExecutionFrameId;\n    flowVersionId: FlowVersionId;\n    flowId: FlowId;\n    currentStepId: StepId;\n    parentFrameId?: ExecutionFrameId;\n    callOperationId?: OperationId;\n    calledFromStepId?: StepId;\n    returnTarget?: StepTarget;\n    startedAt: ISODateString;\n    completedAt?: ISODateString;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "frameId",
          "flowVersionId",
          "flowId",
          "currentStepId",
          "parentFrameId",
          "callOperationId",
          "calledFromStepId",
          "returnTarget",
          "startedAt",
          "completedAt",
          "metadata"
        ],
        "properties": [
          {
            "name": "frameId",
            "type": "string",
            "description": "frameId is the string member exposed by FlowExecutionFrame.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "flowVersionId is the string member exposed by FlowExecutionFrame.",
            "required": true
          },
          {
            "name": "flowId",
            "type": "string",
            "description": "Stable flow identifier shared by a flow and its versions.",
            "required": true
          },
          {
            "name": "currentStepId",
            "type": "string",
            "description": "currentStepId is the string member exposed by FlowExecutionFrame.",
            "required": true
          },
          {
            "name": "parentFrameId",
            "type": "string",
            "description": "parentFrameId is the optional string member exposed by FlowExecutionFrame.",
            "required": false
          },
          {
            "name": "callOperationId",
            "type": "string",
            "description": "callOperationId is the optional string member exposed by FlowExecutionFrame.",
            "required": false
          },
          {
            "name": "calledFromStepId",
            "type": "string",
            "description": "calledFromStepId is the optional string member exposed by FlowExecutionFrame.",
            "required": false
          },
          {
            "name": "returnTarget",
            "type": "StepTarget",
            "description": "returnTarget is the optional StepTarget member exposed by FlowExecutionFrame.",
            "required": false
          },
          {
            "name": "startedAt",
            "type": "string",
            "description": "startedAt is the string member exposed by FlowExecutionFrame.",
            "required": true
          },
          {
            "name": "completedAt",
            "type": "string",
            "description": "completedAt is the optional string member exposed by FlowExecutionFrame.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "FlowId",
          "FlowVersionId",
          "StepId",
          "OperationId",
          "ExecutionFrameId",
          "ISODateString",
          "Metadata",
          "StepTarget"
        ]
      },
      {
        "name": "PendingInputState",
        "kind": "interface",
        "purpose": "PendingInputState defines the runtime state contract with stepId, inputContract, createdAt, retryCount.",
        "usage": "Use this contract when persisting or inspecting conversation execution state.",
        "signatures": [
          "export interface PendingInputState {\n    stepId: StepId;\n    inputContract?: InputContract;\n    createdAt: ISODateString;\n    retryCount?: number;\n}"
        ],
        "fields": [
          "stepId",
          "inputContract",
          "createdAt",
          "retryCount"
        ],
        "properties": [
          {
            "name": "stepId",
            "type": "string",
            "description": "stepId is the string member exposed by PendingInputState.",
            "required": true
          },
          {
            "name": "inputContract",
            "type": "InputContract<string, string>",
            "description": "inputContract is the optional InputContract<string, string> member exposed by PendingInputState.",
            "required": false
          },
          {
            "name": "createdAt",
            "type": "string",
            "description": "ISO timestamp when the object was created.",
            "required": true
          },
          {
            "name": "retryCount",
            "type": "number",
            "description": "retryCount is the optional number member exposed by PendingInputState.",
            "required": false
          }
        ],
        "related": [
          "StepId",
          "ISODateString",
          "InputContract"
        ]
      },
      {
        "name": "Turn",
        "kind": "interface",
        "purpose": "Turn defines the runtime state contract with turnId, conversationId, userInput, status, startedAt, completedAt.",
        "usage": "Use this contract when persisting or inspecting conversation execution state.",
        "signatures": [
          "export interface Turn {\n    turnId: TurnId;\n    conversationId: ConversationId;\n    userInput?: UserInput;\n    status: \"started\" | \"completed\" | \"failed\";\n    startedAt: ISODateString;\n    completedAt?: ISODateString;\n}"
        ],
        "fields": [
          "turnId",
          "conversationId",
          "userInput",
          "status",
          "startedAt",
          "completedAt"
        ],
        "properties": [
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "userInput",
            "type": "UserInput",
            "description": "userInput is the optional UserInput member exposed by Turn.",
            "required": false
          },
          {
            "name": "status",
            "type": "\"completed\" | \"failed\" | \"started\"",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "startedAt",
            "type": "string",
            "description": "startedAt is the string member exposed by Turn.",
            "required": true
          },
          {
            "name": "completedAt",
            "type": "string",
            "description": "completedAt is the optional string member exposed by Turn.",
            "required": false
          }
        ],
        "related": [
          "ConversationId",
          "TurnId",
          "ISODateString",
          "UserInput"
        ]
      }
    ]
  },
  {
    "title": "Step Execution Contracts",
    "summary": "Step handler, validation, and step result contracts used by built-in and custom steps.",
    "exports": [
      "StepExecutionContext",
      "StepResult",
      "StepHandler",
      "StepValidationContext",
      "ValidationSeverity",
      "ValidationIssue",
      "StepHandlerRegistry"
    ],
    "entries": [
      {
        "name": "StepExecutionContext",
        "kind": "interface",
        "purpose": "StepExecutionContext defines the step execution contracts contract with flow, step, config, state, turn, userInput.",
        "usage": "Use this contract when registering custom step behavior or validating step configuration.",
        "signatures": [
          "export interface StepExecutionContext<TConfig extends StepConfig = StepConfig> {\n    flow: FlowVersion;\n    step: StepDefinition;\n    config: TConfig;\n    state: ConversationState;\n    turn: Turn;\n    userInput?: UserInput;\n    services: RuntimeServices;\n}"
        ],
        "fields": [
          "flow",
          "step",
          "config",
          "state",
          "turn",
          "userInput",
          "services"
        ],
        "properties": [
          {
            "name": "flow",
            "type": "FlowVersion",
            "description": "Flow or flow version being validated or executed.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "Active step definition.",
            "required": true
          },
          {
            "name": "config",
            "type": "TConfig",
            "description": "config is the TConfig member exposed by StepExecutionContext.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Current turn metadata.",
            "required": true
          },
          {
            "name": "userInput",
            "type": "UserInput",
            "description": "userInput is the optional UserInput member exposed by StepExecutionContext.",
            "required": false
          },
          {
            "name": "services",
            "type": "RuntimeServices",
            "description": "Runtime services available to handlers and providers.",
            "required": true
          }
        ],
        "related": [
          "FlowVersion",
          "StepConfig",
          "StepDefinition",
          "UserInput",
          "ConversationState",
          "Turn",
          "RuntimeServices"
        ]
      },
      {
        "name": "StepResult",
        "kind": "interface",
        "purpose": "StepResult defines the step execution contracts contract with status, outcome, branch, messages, variablePatches, events.",
        "usage": "Use StepResult to inspect the structured outcome returned by the corresponding runtime, validation, or provider operation.",
        "signatures": [
          "export interface StepResult {\n    status: \"completed\" | \"waiting_input\" | \"failed\";\n    outcome?: StepOutcome;\n    branch?: StepBranch;\n    messages?: OutboundMessage[];\n    variablePatches?: VariablePatch[];\n    events?: ConversationEvent[];\n    waitState?: PendingInputState;\n    error?: RuntimeError;\n    trace: TraceFragment;\n}"
        ],
        "fields": [
          "status",
          "outcome",
          "branch",
          "messages",
          "variablePatches",
          "events",
          "waitState",
          "error",
          "trace"
        ],
        "properties": [
          {
            "name": "status",
            "type": "\"waiting_input\" | \"completed\" | \"failed\"",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": false
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch selected or returned by the contract.",
            "required": false
          },
          {
            "name": "messages",
            "type": "OutboundMessage[]",
            "description": "Outbound messages produced by the turn, step, branch, or operation.",
            "required": false
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<string>[]",
            "description": "Variable writes, unsets, or invalidations produced by execution.",
            "required": false
          },
          {
            "name": "events",
            "type": "ConversationEvent[]",
            "description": "Runtime events emitted during execution.",
            "required": false
          },
          {
            "name": "waitState",
            "type": "PendingInputState",
            "description": "waitState is the optional PendingInputState member exposed by StepResult.",
            "required": false
          },
          {
            "name": "error",
            "type": "RuntimeError",
            "description": "Runtime error produced by execution.",
            "required": false
          },
          {
            "name": "trace",
            "type": "TraceFragment",
            "description": "Trace fragment or decision trace evidence for this contract.",
            "required": true
          }
        ],
        "related": [
          "StepOutcome",
          "VariablePatch",
          "StepBranch",
          "PendingInputState",
          "OutboundMessage",
          "ConversationEvent",
          "TraceFragment",
          "RuntimeError"
        ]
      },
      {
        "name": "StepHandler",
        "kind": "interface",
        "purpose": "StepHandler defines the step execution contracts contract with stepType, validate, enter, handleInput.",
        "usage": "Use StepHandler when registering or describing handler behavior for step execution contracts.",
        "signatures": [
          "export interface StepHandler<TConfig extends StepConfig = StepConfig> {\n    readonly stepType: StepType;\n    validate(step: StepDefinition, context: StepValidationContext): ValidationIssue[];\n    enter(context: StepExecutionContext<TConfig>): Promise<StepResult>;\n    handleInput?(context: StepExecutionContext<TConfig>, input: UserInput): Promise<StepResult>;\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(step: StepDefinition, context: StepValidationContext): ValidationIssue[]",
            "description": "validate is the method exposed by StepHandler.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Active step definition.",
                "required": true
              },
              {
                "name": "context",
                "type": "StepValidationContext",
                "description": "context is the StepValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "ValidationIssue[]",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "enter",
            "signature": "enter(context: StepExecutionContext<TConfig>): Promise<StepResult>",
            "description": "enter is the method exposed by StepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "context is the StepExecutionContext<TConfig> member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "handleInput",
            "signature": "handleInput?(context: StepExecutionContext<TConfig>, input: UserInput): Promise<StepResult>",
            "description": "handleInput is the optional method exposed by StepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "context is the StepExecutionContext<TConfig> member exposed by method.",
                "required": true
              },
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "Return value produced by this method."
            },
            "required": false
          }
        ],
        "fields": [
          "stepType",
          "validate",
          "enter",
          "handleInput"
        ],
        "properties": [
          {
            "name": "stepType",
            "type": "string",
            "description": "stepType is the string member exposed by StepHandler.",
            "required": true
          }
        ],
        "related": [
          "StepType",
          "StepConfig",
          "StepDefinition",
          "UserInput",
          "StepExecutionContext",
          "StepResult",
          "StepValidationContext",
          "ValidationIssue"
        ]
      },
      {
        "name": "StepValidationContext",
        "kind": "interface",
        "purpose": "Validation context passed to StepHandler.validate while a step definition is checked before execution.",
        "usage": "Use it inside custom step validators when the step must be checked against the surrounding ConversationFlowDefinition.",
        "signatures": [
          "export interface StepValidationContext {\n    flow: ConversationFlowDefinition;\n}"
        ],
        "fields": [
          "flow"
        ],
        "properties": [
          {
            "name": "flow",
            "type": "ConversationFlowDefinition",
            "description": "Flow or flow version being validated or executed.",
            "required": true
          }
        ],
        "related": [
          "ConversationFlowDefinition"
        ]
      },
      {
        "name": "ValidationSeverity",
        "kind": "union type",
        "purpose": "ValidationSeverity is the public union in Step Execution Contracts that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when registering custom step behavior or validating step configuration.",
        "signatures": [
          "export type ValidationSeverity = \"error\" | \"warning\";"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "\"error\" | \"warning\"",
            "description": "ValidationSeverity accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "ValidationIssue",
        "kind": "interface",
        "purpose": "ValidationIssue defines the step execution contracts contract with issueId, severity, code, message, entityId, metadata.",
        "usage": "Use this contract when registering custom step behavior or validating step configuration.",
        "signatures": [
          "export interface ValidationIssue {\n    issueId?: ValidationIssueId;\n    severity: ValidationSeverity;\n    code: string;\n    message: string;\n    entityId?: EntityId;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "issueId",
          "severity",
          "code",
          "message",
          "entityId",
          "metadata"
        ],
        "properties": [
          {
            "name": "issueId",
            "type": "string",
            "description": "issueId is the optional string member exposed by ValidationIssue.",
            "required": false
          },
          {
            "name": "severity",
            "type": "ValidationSeverity",
            "description": "severity is the ValidationSeverity member exposed by ValidationIssue.",
            "required": true
          },
          {
            "name": "code",
            "type": "string",
            "description": "code is the string member exposed by ValidationIssue.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "entityId",
            "type": "string",
            "description": "entityId is the optional string member exposed by ValidationIssue.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "EntityId",
          "ValidationIssueId",
          "Metadata",
          "ValidationSeverity"
        ]
      },
      {
        "name": "StepHandlerRegistry",
        "kind": "interface",
        "purpose": "StepHandlerRegistry defines the step execution contracts contract with register, getHandler, hasHandler.",
        "usage": "Use StepHandlerRegistry when runtime services need to register, look up, or test support for extension implementations.",
        "signatures": [
          "export interface StepHandlerRegistry {\n    register(handler: StepHandler): void;\n    getHandler(stepType: StepType): StepHandler;\n    hasHandler(stepType: StepType): boolean;\n}"
        ],
        "methods": [
          {
            "name": "register",
            "signature": "register(handler: StepHandler): void",
            "description": "Registers a provider, handler, resolver, validator, normalizer, or extractor.",
            "parameters": [
              {
                "name": "handler",
                "type": "StepHandler",
                "description": "handler is the StepHandler member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "void",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "getHandler",
            "signature": "getHandler(stepType: StepType): StepHandler",
            "description": "Returns the registered handler for the requested type.",
            "parameters": [
              {
                "name": "stepType",
                "type": "StepType",
                "description": "stepType is the StepType member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "StepHandler",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "hasHandler",
            "signature": "hasHandler(stepType: StepType): boolean",
            "description": "Checks whether a handler is registered for the requested type.",
            "parameters": [
              {
                "name": "stepType",
                "type": "StepType",
                "description": "stepType is the StepType member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "register",
          "getHandler",
          "hasHandler"
        ],
        "related": [
          "StepType",
          "StepHandler"
        ]
      }
    ]
  },
  {
    "title": "Operation Execution Contracts",
    "summary": "Operation handler and executor contracts used when branch effects run.",
    "exports": [
      "OperationExecutionContext",
      "OperationResult",
      "OperationHandler",
      "OperationRegistry",
      "OperationExecutor"
    ],
    "entries": [
      {
        "name": "OperationExecutionContext",
        "kind": "interface",
        "purpose": "Runtime context passed to OperationHandler and custom operation execution code.",
        "usage": "Use it when operation behavior needs the FlowVersion, current ConversationState, current Turn, active StepDefinition, or RuntimeServices.",
        "signatures": [
          "export interface OperationExecutionContext {\n    flow: FlowVersion;\n    state: ConversationState;\n    turn: Turn;\n    step: StepDefinition;\n    services: RuntimeServices;\n}"
        ],
        "fields": [
          "flow",
          "state",
          "turn",
          "step",
          "services"
        ],
        "properties": [
          {
            "name": "flow",
            "type": "FlowVersion",
            "description": "Flow or flow version being validated or executed.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Current turn metadata.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "Active step definition.",
            "required": true
          },
          {
            "name": "services",
            "type": "RuntimeServices",
            "description": "Runtime services available to handlers and providers.",
            "required": true
          }
        ],
        "related": [
          "FlowVersion",
          "StepDefinition",
          "ConversationState",
          "Turn",
          "RuntimeServices"
        ]
      },
      {
        "name": "OperationResult",
        "kind": "interface",
        "purpose": "Structured result returned by an OperationHandler after an operation completes, fails, or is skipped.",
        "usage": "Return it from custom operation handlers to emit messages, variable patches, events, a selected branch, an error, and a trace fragment.",
        "signatures": [
          "export interface OperationResult {\n    status: \"completed\" | \"failed\" | \"skipped\";\n    outcome?: StepOutcome;\n    branch?: StepBranch;\n    messages?: OutboundMessage[];\n    variablePatches?: VariablePatch[];\n    events?: ConversationEvent[];\n    error?: RuntimeError;\n    trace: TraceFragment;\n}"
        ],
        "fields": [
          "status",
          "outcome",
          "branch",
          "messages",
          "variablePatches",
          "events",
          "error",
          "trace"
        ],
        "properties": [
          {
            "name": "status",
            "type": "\"completed\" | \"failed\" | \"skipped\"",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": false
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch selected or returned by the contract.",
            "required": false
          },
          {
            "name": "messages",
            "type": "OutboundMessage[]",
            "description": "Outbound messages produced by the turn, step, branch, or operation.",
            "required": false
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<string>[]",
            "description": "Variable writes, unsets, or invalidations produced by execution.",
            "required": false
          },
          {
            "name": "events",
            "type": "ConversationEvent[]",
            "description": "Runtime events emitted during execution.",
            "required": false
          },
          {
            "name": "error",
            "type": "RuntimeError",
            "description": "Runtime error produced by execution.",
            "required": false
          },
          {
            "name": "trace",
            "type": "TraceFragment",
            "description": "Trace fragment or decision trace evidence for this contract.",
            "required": true
          }
        ],
        "related": [
          "StepOutcome",
          "VariablePatch",
          "StepBranch",
          "OutboundMessage",
          "ConversationEvent",
          "TraceFragment",
          "RuntimeError"
        ]
      },
      {
        "name": "OperationHandler",
        "kind": "interface",
        "purpose": "OperationHandler defines the operation execution contracts contract with operationType, execute.",
        "usage": "Use OperationHandler when registering or describing handler behavior for operation execution contracts.",
        "signatures": [
          "export interface OperationHandler<TOperation extends StepOperation = StepOperation> {\n    readonly operationType: string;\n    execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>;\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "execute is the method exposed by OperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "operation is the TOperation member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "context is the OperationExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "operationType",
          "execute"
        ],
        "properties": [
          {
            "name": "operationType",
            "type": "string",
            "description": "operationType is the string member exposed by OperationHandler.",
            "required": true
          }
        ],
        "related": [
          "StepOperation",
          "OperationExecutionContext",
          "OperationResult"
        ]
      },
      {
        "name": "OperationRegistry",
        "kind": "interface",
        "purpose": "OperationRegistry defines the operation execution contracts contract with register, getHandler, hasHandler.",
        "usage": "Use OperationRegistry when runtime services need to register, look up, or test support for extension implementations.",
        "signatures": [
          "export interface OperationRegistry {\n    register(handler: OperationHandler): void;\n    getHandler(operationType: string): OperationHandler;\n    hasHandler(operationType: string): boolean;\n}"
        ],
        "methods": [
          {
            "name": "register",
            "signature": "register(handler: OperationHandler): void",
            "description": "Registers a provider, handler, resolver, validator, normalizer, or extractor.",
            "parameters": [
              {
                "name": "handler",
                "type": "OperationHandler",
                "description": "handler is the OperationHandler member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "void",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "getHandler",
            "signature": "getHandler(operationType: string): OperationHandler",
            "description": "Returns the registered handler for the requested type.",
            "parameters": [
              {
                "name": "operationType",
                "type": "string",
                "description": "operationType is the string member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "OperationHandler",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "hasHandler",
            "signature": "hasHandler(operationType: string): boolean",
            "description": "Checks whether a handler is registered for the requested type.",
            "parameters": [
              {
                "name": "operationType",
                "type": "string",
                "description": "operationType is the string member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "register",
          "getHandler",
          "hasHandler"
        ],
        "related": [
          "OperationHandler"
        ]
      },
      {
        "name": "OperationExecutor",
        "kind": "interface",
        "purpose": "OperationExecutor defines the operation execution contracts contract with executeMany.",
        "usage": "Use this contract when registering custom operation handlers or inspecting operation results.",
        "signatures": [
          "export interface OperationExecutor {\n    executeMany(operations: StepOperation[], context: OperationExecutionContext): Promise<OperationResult[]>;\n}"
        ],
        "methods": [
          {
            "name": "executeMany",
            "signature": "executeMany(operations: StepOperation[], context: OperationExecutionContext): Promise<OperationResult[]>",
            "description": "executeMany is the method exposed by OperationExecutor.",
            "parameters": [
              {
                "name": "operations",
                "type": "StepOperation[]",
                "description": "operations is the StepOperation[] member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "context is the OperationExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "executeMany"
        ],
        "related": [
          "StepOperation",
          "OperationExecutionContext",
          "OperationResult"
        ]
      }
    ]
  },
  {
    "title": "Outbound Messages",
    "summary": "Messages returned by the runtime and rendered by the application UI.",
    "exports": [
      "OutboundMessage",
      "OutboundMessageContent",
      "TextOutboundContent",
      "RichOutboundContent",
      "CustomPayloadOutboundContent",
      "OutboundButton"
    ],
    "entries": [
      {
        "name": "OutboundMessage",
        "kind": "interface",
        "purpose": "OutboundMessage defines the outbound messages contract with messageId, conversationId, turnId, channel, content, responseId.",
        "usage": "Use this contract when rendering messages returned by a turn result.",
        "signatures": [
          "export interface OutboundMessage {\n    messageId: MessageId;\n    conversationId: ConversationId;\n    turnId: TurnId;\n    channel?: string;\n    content: OutboundMessageContent;\n    responseId?: ResponseId;\n    createdAt: ISODateString;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "messageId",
          "conversationId",
          "turnId",
          "channel",
          "content",
          "responseId",
          "createdAt",
          "metadata"
        ],
        "properties": [
          {
            "name": "messageId",
            "type": "string",
            "description": "messageId is the string member exposed by OutboundMessage.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": true
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          },
          {
            "name": "content",
            "type": "OutboundMessageContent",
            "description": "content is the OutboundMessageContent member exposed by OutboundMessage.",
            "required": true
          },
          {
            "name": "responseId",
            "type": "string",
            "description": "Reusable response identifier associated with the message.",
            "required": false
          },
          {
            "name": "createdAt",
            "type": "string",
            "description": "ISO timestamp when the object was created.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "ResponseId",
          "ConversationId",
          "TurnId",
          "MessageId",
          "ISODateString",
          "Metadata",
          "OutboundMessageContent"
        ]
      },
      {
        "name": "OutboundMessageContent",
        "kind": "union type",
        "purpose": "OutboundMessageContent is the public union in Outbound Messages that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when rendering messages returned by a turn result.",
        "signatures": [
          "export type OutboundMessageContent = TextOutboundContent | RichOutboundContent | CustomPayloadOutboundContent;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "| TextOutboundContent\n    | RichOutboundContent\n    | CustomPayloadOutboundContent",
            "description": "OutboundMessageContent resolves to | TextOutboundContent\n    | RichOutboundContent\n    | CustomPayloadOutboundContent.",
            "required": true
          }
        ],
        "related": [
          "TextOutboundContent",
          "RichOutboundContent",
          "CustomPayloadOutboundContent"
        ]
      },
      {
        "name": "TextOutboundContent",
        "kind": "interface",
        "purpose": "TextOutboundContent defines the outbound messages contract with type, text.",
        "usage": "Use this contract when rendering messages returned by a turn result.",
        "signatures": [
          "export interface TextOutboundContent {\n    type: \"text\";\n    text: string;\n}"
        ],
        "fields": [
          "type",
          "text"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"text\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "text",
            "type": "string",
            "description": "Text content sent by a user or returned to a user.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "RichOutboundContent",
        "kind": "interface",
        "purpose": "RichOutboundContent defines the outbound messages contract with type, text, buttons, attachments, cards.",
        "usage": "Use this contract when rendering messages returned by a turn result.",
        "signatures": [
          "export interface RichOutboundContent {\n    type: \"rich\";\n    text?: string;\n    buttons?: OutboundButton[];\n    attachments?: AttachmentInput[];\n    cards?: JsonObject[];\n}"
        ],
        "fields": [
          "type",
          "text",
          "buttons",
          "attachments",
          "cards"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"rich\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "text",
            "type": "string",
            "description": "Text content sent by a user or returned to a user.",
            "required": false
          },
          {
            "name": "buttons",
            "type": "OutboundButton[]",
            "description": "buttons is the optional OutboundButton[] member exposed by RichOutboundContent.",
            "required": false
          },
          {
            "name": "attachments",
            "type": "AttachmentInput[]",
            "description": "attachments is the optional AttachmentInput[] member exposed by RichOutboundContent.",
            "required": false
          },
          {
            "name": "cards",
            "type": "JsonObject[]",
            "description": "cards is the optional JsonObject[] member exposed by RichOutboundContent.",
            "required": false
          }
        ],
        "related": [
          "JsonObject",
          "AttachmentInput",
          "OutboundButton"
        ]
      },
      {
        "name": "CustomPayloadOutboundContent",
        "kind": "interface",
        "purpose": "CustomPayloadOutboundContent defines the outbound messages contract with type, payload.",
        "usage": "Use this contract when rendering messages returned by a turn result.",
        "signatures": [
          "export interface CustomPayloadOutboundContent {\n    type: \"custom_payload\";\n    payload: JsonObject;\n}"
        ],
        "fields": [
          "type",
          "payload"
        ],
        "properties": [
          {
            "name": "type",
            "type": "\"custom_payload\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Application payload attached to an event, input, or custom message.",
            "required": true
          }
        ],
        "related": [
          "JsonObject"
        ]
      },
      {
        "name": "OutboundButton",
        "kind": "interface",
        "purpose": "OutboundButton defines the outbound messages contract with optionId, label, payload.",
        "usage": "Use this contract when rendering messages returned by a turn result.",
        "signatures": [
          "export interface OutboundButton {\n    optionId: OptionId;\n    label: string;\n    payload?: JsonObject;\n}"
        ],
        "fields": [
          "optionId",
          "label",
          "payload"
        ],
        "properties": [
          {
            "name": "optionId",
            "type": "string",
            "description": "optionId is the string member exposed by OutboundButton.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the string member exposed by OutboundButton.",
            "required": true
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Application payload attached to an event, input, or custom message.",
            "required": false
          }
        ],
        "related": [
          "OptionId",
          "JsonObject"
        ]
      }
    ]
  },
  {
    "title": "Events and Traces",
    "summary": "Runtime events, trace fragments, and structured trace records emitted by each turn.",
    "exports": [
      "ConversationEventType",
      "ConversationEvent",
      "TraceFragment",
      "DecisionTrace",
      "VariableReadTrace",
      "OperationTraceRecord",
      "ActionTraceRecord",
      "ConditionTraceRecord",
      "FlowCallTraceRecord",
      "HandoffTraceRecord",
      "LlmUsageRecord"
    ],
    "entries": [
      {
        "name": "ConversationEventType",
        "kind": "union type",
        "purpose": "Union of runtime event names emitted for conversation lifecycle, input, steps, operations, variables, actions, messages, transitions, flow calls, handoff, completion, and errors.",
        "usage": "Use it when filtering event streams, building analytics, or asserting exact runtime behavior in tests.",
        "signatures": [
          "export type ConversationEventType = \"conversation_started\" | \"turn_started\" | \"input_received\" | \"step_entered\" | \"step_completed\" | \"step_failed\" | \"menu_option_selected\" | \"input_resolved\" | \"input_invalid\" | \"semantic_input_task_started\" | \"semantic_input_task_completed\" | \"llm_response_generation_started\" | \"llm_response_generation_completed\" | \"variable_set\" | \"variable_unset\" | \"variable_invalidated\" | \"operation_started\" | \"operation_completed\" | \"operation_failed\" | \"action_started\" | \"action_completed\" | \"action_failed\" | \"message_created\" | \"transition_taken\" | \"condition_evaluated\" | \"flow_call_started\" | \"flow_call_completed\" | \"handoff_started\" | \"handoff_completed\" | \"conversation_completed\" | \"conversation_cancelled\" | \"error_raised\" | string;"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "| \"conversation_started\"\n    | \"turn_started\"\n    | \"input_received\"\n    | \"step_entered\"\n    | \"step_completed\"\n    | \"step_failed\"\n    | \"menu_option_selected\"\n    | \"input_resolved\"\n    | \"input_invalid\"\n    | \"semantic_input_task_started\"\n    | \"semantic_input_task_completed\"\n    | \"llm_response_generation_started\"\n    | \"llm_response_generation_completed\"\n    | \"variable_set\"\n    | \"variable_unset\"\n    | \"variable_invalidated\"\n    | \"operation_started\"\n    | \"operation_completed\"\n    | \"operation_failed\"\n    | \"action_started\"\n    | \"action_completed\"\n    | \"action_failed\"\n    | \"message_created\"\n    | \"transition_taken\"\n    | \"condition_evaluated\"\n    | \"flow_call_started\"\n    | \"flow_call_completed\"\n    | \"handoff_started\"\n    | \"handoff_completed\"\n    | \"conversation_completed\"\n    | \"conversation_cancelled\"\n    | \"error_raised\"\n    | string",
            "description": "ConversationEventType accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "ConversationEvent",
        "kind": "interface",
        "purpose": "ConversationEvent defines the events and traces contract with eventId, conversationId, turnId, flowVersionId, stepId, type.",
        "usage": "Use this contract when building analytics, audit logs, tests, or debugging tools around runtime evidence.",
        "signatures": [
          "export interface ConversationEvent {\n    eventId: EventId;\n    conversationId: ConversationId;\n    turnId?: TurnId;\n    flowVersionId: FlowVersionId;\n    stepId?: StepId;\n    type: ConversationEventType;\n    payload?: Metadata;\n    createdAt: ISODateString;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "eventId",
          "conversationId",
          "turnId",
          "flowVersionId",
          "stepId",
          "type",
          "payload",
          "createdAt",
          "metadata"
        ],
        "properties": [
          {
            "name": "eventId",
            "type": "string",
            "description": "eventId is the string member exposed by ConversationEvent.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": false
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "flowVersionId is the string member exposed by ConversationEvent.",
            "required": true
          },
          {
            "name": "stepId",
            "type": "string",
            "description": "stepId is the optional string member exposed by ConversationEvent.",
            "required": false
          },
          {
            "name": "type",
            "type": "string",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "payload",
            "type": "Metadata",
            "description": "Application payload attached to an event, input, or custom message.",
            "required": false
          },
          {
            "name": "createdAt",
            "type": "string",
            "description": "ISO timestamp when the object was created.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "FlowVersionId",
          "StepId",
          "EventId",
          "ConversationId",
          "TurnId",
          "ISODateString",
          "Metadata",
          "ConversationEventType"
        ]
      },
      {
        "name": "TraceFragment",
        "kind": "interface",
        "purpose": "TraceFragment defines the events and traces contract with source, message, data, startedAt, completedAt.",
        "usage": "Use this contract when building analytics, audit logs, tests, or debugging tools around runtime evidence.",
        "signatures": [
          "export interface TraceFragment {\n    source: string;\n    message?: string;\n    data?: Metadata;\n    startedAt?: ISODateString;\n    completedAt?: ISODateString;\n}"
        ],
        "fields": [
          "source",
          "message",
          "data",
          "startedAt",
          "completedAt"
        ],
        "properties": [
          {
            "name": "source",
            "type": "string",
            "description": "Runtime source that produced a value, patch, or trace fragment.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": false
          },
          {
            "name": "data",
            "type": "Metadata",
            "description": "data is the optional Metadata member exposed by TraceFragment.",
            "required": false
          },
          {
            "name": "startedAt",
            "type": "string",
            "description": "startedAt is the optional string member exposed by TraceFragment.",
            "required": false
          },
          {
            "name": "completedAt",
            "type": "string",
            "description": "completedAt is the optional string member exposed by TraceFragment.",
            "required": false
          }
        ],
        "related": [
          "ISODateString",
          "Metadata"
        ]
      },
      {
        "name": "DecisionTrace",
        "kind": "interface",
        "purpose": "DecisionTrace defines the events and traces contract with traceId, conversationId, turnId, flowVersionId, initialStepId, finalStepId.",
        "usage": "Use this contract when building analytics, audit logs, tests, or debugging tools around runtime evidence.",
        "signatures": [
          "export interface DecisionTrace {\n    traceId: TraceId;\n    conversationId: ConversationId;\n    turnId: TurnId;\n    flowVersionId: FlowVersionId;\n    initialStepId?: StepId;\n    finalStepId?: StepId;\n    userInput?: UserInput;\n    fragments: TraceFragment[];\n    events: ConversationEvent[];\n    messages: OutboundMessage[];\n    variablePatches: VariablePatch[];\n    variableReads?: VariableReadTrace[];\n    operationResults?: OperationTraceRecord[];\n    actionResults?: ActionTraceRecord[];\n    conditionResults?: ConditionTraceRecord[];\n    flowCalls?: FlowCallTraceRecord[];\n    handoffs?: HandoffTraceRecord[];\n    llmUsage?: LlmUsageRecord[];\n    createdAt: ISODateString;\n}"
        ],
        "fields": [
          "traceId",
          "conversationId",
          "turnId",
          "flowVersionId",
          "initialStepId",
          "finalStepId",
          "userInput",
          "fragments",
          "events",
          "messages",
          "variablePatches",
          "variableReads",
          "operationResults",
          "actionResults",
          "conditionResults",
          "flowCalls",
          "handoffs",
          "llmUsage",
          "createdAt"
        ],
        "properties": [
          {
            "name": "traceId",
            "type": "string",
            "description": "traceId is the string member exposed by DecisionTrace.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "flowVersionId is the string member exposed by DecisionTrace.",
            "required": true
          },
          {
            "name": "initialStepId",
            "type": "string",
            "description": "initialStepId is the optional string member exposed by DecisionTrace.",
            "required": false
          },
          {
            "name": "finalStepId",
            "type": "string",
            "description": "finalStepId is the optional string member exposed by DecisionTrace.",
            "required": false
          },
          {
            "name": "userInput",
            "type": "UserInput",
            "description": "userInput is the optional UserInput member exposed by DecisionTrace.",
            "required": false
          },
          {
            "name": "fragments",
            "type": "TraceFragment[]",
            "description": "fragments is the TraceFragment[] member exposed by DecisionTrace.",
            "required": true
          },
          {
            "name": "events",
            "type": "ConversationEvent[]",
            "description": "Runtime events emitted during execution.",
            "required": true
          },
          {
            "name": "messages",
            "type": "OutboundMessage[]",
            "description": "Outbound messages produced by the turn, step, branch, or operation.",
            "required": true
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<string>[]",
            "description": "Variable writes, unsets, or invalidations produced by execution.",
            "required": true
          },
          {
            "name": "variableReads",
            "type": "VariableReadTrace[]",
            "description": "variableReads is the optional VariableReadTrace[] member exposed by DecisionTrace.",
            "required": false
          },
          {
            "name": "operationResults",
            "type": "OperationTraceRecord[]",
            "description": "operationResults is the optional OperationTraceRecord[] member exposed by DecisionTrace.",
            "required": false
          },
          {
            "name": "actionResults",
            "type": "ActionTraceRecord[]",
            "description": "actionResults is the optional ActionTraceRecord[] member exposed by DecisionTrace.",
            "required": false
          },
          {
            "name": "conditionResults",
            "type": "ConditionTraceRecord[]",
            "description": "conditionResults is the optional ConditionTraceRecord[] member exposed by DecisionTrace.",
            "required": false
          },
          {
            "name": "flowCalls",
            "type": "FlowCallTraceRecord[]",
            "description": "flowCalls is the optional FlowCallTraceRecord[] member exposed by DecisionTrace.",
            "required": false
          },
          {
            "name": "handoffs",
            "type": "HandoffTraceRecord[]",
            "description": "handoffs is the optional HandoffTraceRecord[] member exposed by DecisionTrace.",
            "required": false
          },
          {
            "name": "llmUsage",
            "type": "LlmUsageRecord[]",
            "description": "llmUsage is the optional LlmUsageRecord[] member exposed by DecisionTrace.",
            "required": false
          },
          {
            "name": "createdAt",
            "type": "string",
            "description": "ISO timestamp when the object was created.",
            "required": true
          }
        ],
        "related": [
          "FlowVersionId",
          "StepId",
          "ConversationId",
          "TurnId",
          "TraceId",
          "ISODateString",
          "VariablePatch",
          "UserInput",
          "OutboundMessage",
          "ConversationEvent"
        ]
      },
      {
        "name": "VariableReadTrace",
        "kind": "interface",
        "purpose": "VariableReadTrace defines the events and traces contract with variableId, scope, stepId, operationId, found, readAt.",
        "usage": "Use this contract when building analytics, audit logs, tests, or debugging tools around runtime evidence.",
        "signatures": [
          "export interface VariableReadTrace {\n    variableId: VariableId;\n    scope?: VariableScope;\n    stepId?: StepId;\n    operationId?: OperationId;\n    found: boolean;\n    readAt: ISODateString;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "variableId",
          "scope",
          "stepId",
          "operationId",
          "found",
          "readAt",
          "metadata"
        ],
        "properties": [
          {
            "name": "variableId",
            "type": "string",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "scope is the optional VariableScope member exposed by VariableReadTrace.",
            "required": false
          },
          {
            "name": "stepId",
            "type": "string",
            "description": "stepId is the optional string member exposed by VariableReadTrace.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "operationId is the optional string member exposed by VariableReadTrace.",
            "required": false
          },
          {
            "name": "found",
            "type": "boolean",
            "description": "found is the boolean member exposed by VariableReadTrace.",
            "required": true
          },
          {
            "name": "readAt",
            "type": "string",
            "description": "readAt is the string member exposed by VariableReadTrace.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "StepId",
          "VariableId",
          "OperationId",
          "ISODateString",
          "Metadata",
          "VariableScope"
        ]
      },
      {
        "name": "OperationTraceRecord",
        "kind": "interface",
        "purpose": "OperationTraceRecord defines the events and traces contract with operationId, operationType, status, outcome, error.",
        "usage": "Use this contract when building analytics, audit logs, tests, or debugging tools around runtime evidence.",
        "signatures": [
          "export interface OperationTraceRecord {\n    operationId?: OperationId;\n    operationType: StepOperation[\"type\"];\n    status: OperationResult[\"status\"];\n    outcome?: StepOutcome;\n    error?: RuntimeError;\n}"
        ],
        "fields": [
          "operationId",
          "operationType",
          "status",
          "outcome",
          "error"
        ],
        "properties": [
          {
            "name": "operationId",
            "type": "string",
            "description": "operationId is the optional string member exposed by OperationTraceRecord.",
            "required": false
          },
          {
            "name": "operationType",
            "type": "\"custom\" | \"handoff\" | \"send_message\" | \"set_variable\" | \"unset_variable\" | \"invalidate_variable\" | \"run_action\" | \"emit_event\" | \"call_flow\"",
            "description": "operationType is the \"custom\" | \"handoff\" | \"send_message\" | \"set_variable\" | \"unset_variable\" | \"invalidate_variable\" | \"run_action\" | \"emit_event\" | \"call_flow\" member exposed by OperationTraceRecord.",
            "required": true
          },
          {
            "name": "status",
            "type": "\"completed\" | \"failed\" | \"skipped\"",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": false
          },
          {
            "name": "error",
            "type": "RuntimeError",
            "description": "Runtime error produced by execution.",
            "required": false
          }
        ],
        "related": [
          "OperationId",
          "StepOutcome",
          "StepOperation",
          "OperationResult",
          "RuntimeError"
        ]
      },
      {
        "name": "ActionTraceRecord",
        "kind": "interface",
        "purpose": "ActionTraceRecord defines the events and traces contract with actionId, status, outcome, errorCode.",
        "usage": "Use this contract when building analytics, audit logs, tests, or debugging tools around runtime evidence.",
        "signatures": [
          "export interface ActionTraceRecord {\n    actionId: ActionId;\n    status: ActionResultStatus;\n    outcome?: StepOutcome;\n    errorCode?: string;\n}"
        ],
        "fields": [
          "actionId",
          "status",
          "outcome",
          "errorCode"
        ],
        "properties": [
          {
            "name": "actionId",
            "type": "string",
            "description": "actionId is the string member exposed by ActionTraceRecord.",
            "required": true
          },
          {
            "name": "status",
            "type": "ActionResultStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": false
          },
          {
            "name": "errorCode",
            "type": "string",
            "description": "Application or runtime error code.",
            "required": false
          }
        ],
        "related": [
          "ActionId",
          "StepOutcome",
          "ActionResultStatus"
        ]
      },
      {
        "name": "ConditionTraceRecord",
        "kind": "interface",
        "purpose": "ConditionTraceRecord defines the events and traces contract with branchId, outcome, matched, variablesRead.",
        "usage": "Use this contract when building analytics, audit logs, tests, or debugging tools around runtime evidence.",
        "signatures": [
          "export interface ConditionTraceRecord {\n    branchId?: BranchId;\n    outcome?: StepOutcome;\n    matched: boolean;\n    variablesRead?: VariableReadTrace[];\n}"
        ],
        "fields": [
          "branchId",
          "outcome",
          "matched",
          "variablesRead"
        ],
        "properties": [
          {
            "name": "branchId",
            "type": "string",
            "description": "branchId is the optional string member exposed by ConditionTraceRecord.",
            "required": false
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": false
          },
          {
            "name": "matched",
            "type": "boolean",
            "description": "matched is the boolean member exposed by ConditionTraceRecord.",
            "required": true
          },
          {
            "name": "variablesRead",
            "type": "VariableReadTrace[]",
            "description": "variablesRead is the optional VariableReadTrace[] member exposed by ConditionTraceRecord.",
            "required": false
          }
        ],
        "related": [
          "BranchId",
          "StepOutcome",
          "VariableReadTrace"
        ]
      },
      {
        "name": "FlowCallTraceRecord",
        "kind": "interface",
        "purpose": "FlowCallTraceRecord defines the events and traces contract with operationId, frameId, flowVersionId, status, outcome.",
        "usage": "Use this contract when building analytics, audit logs, tests, or debugging tools around runtime evidence.",
        "signatures": [
          "export interface FlowCallTraceRecord {\n    operationId?: OperationId;\n    frameId: ExecutionFrameId;\n    flowVersionId: FlowVersionId;\n    status: FlowCallStatus;\n    outcome?: StepOutcome;\n}"
        ],
        "fields": [
          "operationId",
          "frameId",
          "flowVersionId",
          "status",
          "outcome"
        ],
        "properties": [
          {
            "name": "operationId",
            "type": "string",
            "description": "operationId is the optional string member exposed by FlowCallTraceRecord.",
            "required": false
          },
          {
            "name": "frameId",
            "type": "string",
            "description": "frameId is the string member exposed by FlowCallTraceRecord.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "flowVersionId is the string member exposed by FlowCallTraceRecord.",
            "required": true
          },
          {
            "name": "status",
            "type": "FlowCallStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": false
          }
        ],
        "related": [
          "FlowVersionId",
          "OperationId",
          "ExecutionFrameId",
          "StepOutcome",
          "FlowCallStatus"
        ]
      },
      {
        "name": "HandoffTraceRecord",
        "kind": "interface",
        "purpose": "HandoffTraceRecord defines the events and traces contract with operationId, status, handoffId, outcome.",
        "usage": "Use this contract when building analytics, audit logs, tests, or debugging tools around runtime evidence.",
        "signatures": [
          "export interface HandoffTraceRecord {\n    operationId?: OperationId;\n    status: HandoffResultStatus;\n    handoffId?: HandoffId;\n    outcome?: StepOutcome;\n}"
        ],
        "fields": [
          "operationId",
          "status",
          "handoffId",
          "outcome"
        ],
        "properties": [
          {
            "name": "operationId",
            "type": "string",
            "description": "operationId is the optional string member exposed by HandoffTraceRecord.",
            "required": false
          },
          {
            "name": "status",
            "type": "HandoffResultStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "handoffId",
            "type": "string",
            "description": "handoffId is the optional string member exposed by HandoffTraceRecord.",
            "required": false
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": false
          }
        ],
        "related": [
          "OperationId",
          "HandoffId",
          "StepOutcome",
          "HandoffResultStatus"
        ]
      },
      {
        "name": "LlmUsageRecord",
        "kind": "interface",
        "purpose": "LlmUsageRecord defines the events and traces contract with purpose, provider, model, promptSummary, inputTokens, outputTokens.",
        "usage": "Use this contract when building analytics, audit logs, tests, or debugging tools around runtime evidence.",
        "signatures": [
          "export interface LlmUsageRecord {\n    purpose: \"input_resolution\" | \"response_generation\";\n    provider?: string;\n    model?: string;\n    promptSummary?: string;\n    inputTokens?: number;\n    outputTokens?: number;\n    latencyMs?: number;\n    success: boolean;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "purpose",
          "provider",
          "model",
          "promptSummary",
          "inputTokens",
          "outputTokens",
          "latencyMs",
          "success",
          "metadata"
        ],
        "properties": [
          {
            "name": "purpose",
            "type": "\"input_resolution\" | \"response_generation\"",
            "description": "purpose is the \"input_resolution\" | \"response_generation\" member exposed by LlmUsageRecord.",
            "required": true
          },
          {
            "name": "provider",
            "type": "string",
            "description": "provider is the optional string member exposed by LlmUsageRecord.",
            "required": false
          },
          {
            "name": "model",
            "type": "string",
            "description": "model is the optional string member exposed by LlmUsageRecord.",
            "required": false
          },
          {
            "name": "promptSummary",
            "type": "string",
            "description": "promptSummary is the optional string member exposed by LlmUsageRecord.",
            "required": false
          },
          {
            "name": "inputTokens",
            "type": "number",
            "description": "inputTokens is the optional number member exposed by LlmUsageRecord.",
            "required": false
          },
          {
            "name": "outputTokens",
            "type": "number",
            "description": "outputTokens is the optional number member exposed by LlmUsageRecord.",
            "required": false
          },
          {
            "name": "latencyMs",
            "type": "number",
            "description": "latencyMs is the optional number member exposed by LlmUsageRecord.",
            "required": false
          },
          {
            "name": "success",
            "type": "boolean",
            "description": "success is the boolean member exposed by LlmUsageRecord.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata"
        ]
      }
    ]
  },
  {
    "title": "Runtime Errors",
    "summary": "Typed runtime errors used when a required capability, reference, or model output is invalid.",
    "exports": [
      "RuntimeError",
      "RuntimeErrorCode",
      "PublicRuntimeErrorCode",
      "OperationalRuntimeErrorCode",
      "BaseRuntimeError",
      "MissingStepHandlerRuntimeError",
      "MissingOperationHandlerRuntimeError",
      "MissingActionHandlerRuntimeError",
      "MissingResponseReferenceRuntimeError",
      "MissingActionReferenceRuntimeError",
      "MissingVariableReferenceRuntimeError",
      "MissingFlowVersionRuntimeError",
      "MissingStepTargetRuntimeError",
      "MissingSemanticInputResolverRuntimeError",
      "MissingLlmResponseGeneratorRuntimeError",
      "MissingCustomOperationContractRuntimeError",
      "MissingCustomOperationHandlerRuntimeError",
      "InvalidSemanticOutcomeRuntimeError",
      "InvalidSemanticVariableRuntimeError",
      "InvalidGeneratedResponseVariableRuntimeError",
      "ModelValidationRuntimeError",
      "OperationalRuntimeError",
      "UnhandledRuntimeError"
    ],
    "entries": [
      {
        "name": "RuntimeError",
        "kind": "union type",
        "purpose": "RuntimeError is the public union in Runtime Errors that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export type RuntimeError = MissingStepHandlerRuntimeError | MissingOperationHandlerRuntimeError | MissingActionHandlerRuntimeError | MissingResponseReferenceRuntimeError | MissingActionReferenceRuntimeError | MissingVariableReferenceRuntimeError | MissingFlowVersionRuntimeError | MissingStepTargetRuntimeError | MissingSemanticInputResolverRuntimeError | MissingLlmResponseGeneratorRuntimeError | MissingCustomOperationContractRuntimeError | MissingCustomOperationHandlerRuntimeError | InvalidSemanticOutcomeRuntimeError | InvalidSemanticVariableRuntimeError | InvalidGeneratedResponseVariableRuntimeError | ModelValidationRuntimeError | OperationalRuntimeError | UnhandledRuntimeError;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "| MissingStepHandlerRuntimeError\n    | MissingOperationHandlerRuntimeError\n    | MissingActionHandlerRuntimeError\n    | MissingResponseReferenceRuntimeError\n    | MissingActionReferenceRuntimeError\n    | MissingVariableReferenceRuntimeError\n    | MissingFlowVersionRuntimeError\n    | MissingStepTargetRuntimeError\n    | MissingSemanticInputResolverRuntimeError\n    | MissingLlmResponseGeneratorRuntimeError\n    | MissingCustomOperationContractRuntimeError\n    | MissingCustomOperationHandlerRuntimeError\n    | InvalidSemanticOutcomeRuntimeError\n    | InvalidSemanticVariableRuntimeError\n    | InvalidGeneratedResponseVariableRuntimeError\n    | ModelValidationRuntimeError\n    | OperationalRuntimeError\n    | UnhandledRuntimeError",
            "description": "RuntimeError resolves to | MissingStepHandlerRuntimeError\n    | MissingOperationHandlerRuntimeError\n    | MissingActionHandlerRuntimeError\n    | MissingResponseReferenceRuntimeError\n    | MissingActionReferenceRuntimeError\n    | MissingVariableReferenceRuntimeError\n    | MissingFlowVersionRuntimeError\n    | MissingStepTargetRuntimeError\n    | MissingSemanticInputResolverRuntimeError\n    | MissingLlmResponseGeneratorRuntimeError\n    | MissingCustomOperationContractRuntimeError\n    | MissingCustomOperationHandlerRuntimeError\n    | InvalidSemanticOutcomeRuntimeError\n    | InvalidSemanticVariableRuntimeError\n    | InvalidGeneratedResponseVariableRuntimeError\n    | ModelValidationRuntimeError\n    | OperationalRuntimeError\n    | UnhandledRuntimeError.",
            "required": true
          }
        ],
        "related": [
          "MissingStepHandlerRuntimeError",
          "MissingOperationHandlerRuntimeError",
          "MissingActionHandlerRuntimeError",
          "MissingResponseReferenceRuntimeError",
          "MissingActionReferenceRuntimeError",
          "MissingVariableReferenceRuntimeError",
          "MissingFlowVersionRuntimeError",
          "MissingStepTargetRuntimeError",
          "MissingSemanticInputResolverRuntimeError",
          "MissingLlmResponseGeneratorRuntimeError"
        ]
      },
      {
        "name": "RuntimeErrorCode",
        "kind": "union type",
        "purpose": "RuntimeErrorCode is the public union in Runtime Errors that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export type RuntimeErrorCode = PublicRuntimeErrorCode | OperationalRuntimeErrorCode;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "| PublicRuntimeErrorCode\n    | OperationalRuntimeErrorCode",
            "description": "RuntimeErrorCode resolves to | PublicRuntimeErrorCode\n    | OperationalRuntimeErrorCode.",
            "required": true
          }
        ],
        "related": [
          "PublicRuntimeErrorCode",
          "OperationalRuntimeErrorCode"
        ]
      },
      {
        "name": "PublicRuntimeErrorCode",
        "kind": "union type",
        "purpose": "PublicRuntimeErrorCode is the public union in Runtime Errors that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export type PublicRuntimeErrorCode = \"missing_step_handler\" | \"missing_operation_handler\" | \"missing_action_handler\" | \"missing_response_reference\" | \"missing_action_reference\" | \"missing_variable_reference\" | \"missing_flow_version\" | \"missing_step_target\" | \"missing_semantic_input_resolver\" | \"missing_llm_response_generator\" | \"missing_custom_operation_contract\" | \"missing_custom_operation_handler\" | \"invalid_semantic_outcome\" | \"invalid_semantic_variable\" | \"invalid_generated_response_variable\" | \"model_validation_failed\" | \"unhandled_runtime_error\";"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "| \"missing_step_handler\"\n    | \"missing_operation_handler\"\n    | \"missing_action_handler\"\n    | \"missing_response_reference\"\n    | \"missing_action_reference\"\n    | \"missing_variable_reference\"\n    | \"missing_flow_version\"\n    | \"missing_step_target\"\n    | \"missing_semantic_input_resolver\"\n    | \"missing_llm_response_generator\"\n    | \"missing_custom_operation_contract\"\n    | \"missing_custom_operation_handler\"\n    | \"invalid_semantic_outcome\"\n    | \"invalid_semantic_variable\"\n    | \"invalid_generated_response_variable\"\n    | \"model_validation_failed\"\n    | \"unhandled_runtime_error\"",
            "description": "PublicRuntimeErrorCode accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "OperationalRuntimeErrorCode",
        "kind": "union type",
        "purpose": "OperationalRuntimeErrorCode is the public union in Runtime Errors that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export type OperationalRuntimeErrorCode = \"ACTION_HANDLER_NOT_REGISTERED\" | \"ACTION_NOT_FOUND\" | \"ACTION_RESULT_OUT_OF_CONTRACT\" | \"CONVERSATION_NOT_FOUND\" | \"CONVERSATION_NOT_WAITING_FOR_INPUT\" | \"CUSTOM_OPERATION_CONTRACT_NOT_REGISTERED\" | \"CUSTOM_OPERATION_RESULT_OUT_OF_CONTRACT\" | \"EXTRACTOR_NOT_REGISTERED\" | \"FLOW_VERSION_NOT_FOUND\" | \"FLOW_CALL_CONTINUATION_INVALID\" | \"INPUT_BINDING_NOT_FOUND\" | \"INPUT_PROCESSING_CONTEXT_REQUIRED\" | \"INVALID_TARGET\" | \"LLM_RESPONSE_GENERATOR_NOT_REGISTERED\" | \"LLM_RESPONSE_USAGE_NOT_DECLARED\" | \"MAX_STEP_EXECUTIONS_EXCEEDED\" | \"NORMALIZER_NOT_REGISTERED\" | \"OPERATION_EXECUTION_CONTEXT_REQUIRED\" | \"OPERATION_HANDLER_NOT_REGISTERED\" | \"RESPONSE_NOT_FOUND\" | \"RESPONSE_RENDERING_CONTEXT_REQUIRED\" | \"SEMANTIC_INPUT_RESOLVER_NOT_REGISTERED\" | \"SEMANTIC_INPUT_NOT_FOUND\" | \"SEMANTIC_RESULT_OUT_OF_CONTRACT\" | \"STEP_DOES_NOT_ACCEPT_INPUT\" | \"STEP_HANDLER_NOT_REGISTERED\" | \"STEP_NOT_FOUND\" | \"VALIDATOR_NOT_REGISTERED\";"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "| \"ACTION_HANDLER_NOT_REGISTERED\"\n    | \"ACTION_NOT_FOUND\"\n    | \"ACTION_RESULT_OUT_OF_CONTRACT\"\n    | \"CONVERSATION_NOT_FOUND\"\n    | \"CONVERSATION_NOT_WAITING_FOR_INPUT\"\n    | \"CUSTOM_OPERATION_CONTRACT_NOT_REGISTERED\"\n    | \"CUSTOM_OPERATION_RESULT_OUT_OF_CONTRACT\"\n    | \"EXTRACTOR_NOT_REGISTERED\"\n    | \"FLOW_VERSION_NOT_FOUND\"\n    | \"FLOW_CALL_CONTINUATION_INVALID\"\n    | \"INPUT_BINDING_NOT_FOUND\"\n    | \"INPUT_PROCESSING_CONTEXT_REQUIRED\"\n    | \"INVALID_TARGET\"\n    | \"LLM_RESPONSE_GENERATOR_NOT_REGISTERED\"\n    | \"LLM_RESPONSE_USAGE_NOT_DECLARED\"\n    | \"MAX_STEP_EXECUTIONS_EXCEEDED\"\n    | \"NORMALIZER_NOT_REGISTERED\"\n    | \"OPERATION_EXECUTION_CONTEXT_REQUIRED\"\n    | \"OPERATION_HANDLER_NOT_REGISTERED\"\n    | \"RESPONSE_NOT_FOUND\"\n    | \"RESPONSE_RENDERING_CONTEXT_REQUIRED\"\n    | \"SEMANTIC_INPUT_RESOLVER_NOT_REGISTERED\"\n    | \"SEMANTIC_INPUT_NOT_FOUND\"\n    | \"SEMANTIC_RESULT_OUT_OF_CONTRACT\"\n    | \"STEP_DOES_NOT_ACCEPT_INPUT\"\n    | \"STEP_HANDLER_NOT_REGISTERED\"\n    | \"STEP_NOT_FOUND\"\n    | \"VALIDATOR_NOT_REGISTERED\"",
            "description": "OperationalRuntimeErrorCode accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "BaseRuntimeError",
        "kind": "interface",
        "purpose": "BaseRuntimeError defines the runtime errors contract with code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface BaseRuntimeError<TCode extends RuntimeErrorCode> {\n    code: TCode;\n    message: string;\n    recoverable: boolean;\n    details?: Metadata;\n}"
        ],
        "fields": [
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "code",
            "type": "TCode",
            "description": "code is the TCode member exposed by BaseRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by BaseRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by BaseRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "RuntimeErrorCode"
        ]
      },
      {
        "name": "MissingStepHandlerRuntimeError",
        "kind": "interface",
        "purpose": "MissingStepHandlerRuntimeError defines the runtime errors contract with stepType, code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface MissingStepHandlerRuntimeError extends BaseRuntimeError<\"missing_step_handler\"> {\n    stepType: StepType;\n}"
        ],
        "fields": [
          "stepType",
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "stepType",
            "type": "string",
            "description": "stepType is the string member exposed by MissingStepHandlerRuntimeError.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_step_handler\"",
            "description": "code is the \"missing_step_handler\" member exposed by MissingStepHandlerRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by MissingStepHandlerRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by MissingStepHandlerRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "StepType",
          "BaseRuntimeError"
        ]
      },
      {
        "name": "MissingOperationHandlerRuntimeError",
        "kind": "interface",
        "purpose": "MissingOperationHandlerRuntimeError defines the runtime errors contract with operationType, code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface MissingOperationHandlerRuntimeError extends BaseRuntimeError<\"missing_operation_handler\"> {\n    operationType: StepOperation[\"type\"];\n}"
        ],
        "fields": [
          "operationType",
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "operationType",
            "type": "\"custom\" | \"handoff\" | \"send_message\" | \"set_variable\" | \"unset_variable\" | \"invalidate_variable\" | \"run_action\" | \"emit_event\" | \"call_flow\"",
            "description": "operationType is the \"custom\" | \"handoff\" | \"send_message\" | \"set_variable\" | \"unset_variable\" | \"invalidate_variable\" | \"run_action\" | \"emit_event\" | \"call_flow\" member exposed by MissingOperationHandlerRuntimeError.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_operation_handler\"",
            "description": "code is the \"missing_operation_handler\" member exposed by MissingOperationHandlerRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by MissingOperationHandlerRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by MissingOperationHandlerRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "StepOperation",
          "BaseRuntimeError"
        ]
      },
      {
        "name": "MissingActionHandlerRuntimeError",
        "kind": "interface",
        "purpose": "MissingActionHandlerRuntimeError defines the runtime errors contract with actionKind, code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface MissingActionHandlerRuntimeError extends BaseRuntimeError<\"missing_action_handler\"> {\n    actionKind: ActionKind;\n}"
        ],
        "fields": [
          "actionKind",
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "actionKind",
            "type": "string",
            "description": "actionKind is the string member exposed by MissingActionHandlerRuntimeError.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_action_handler\"",
            "description": "code is the \"missing_action_handler\" member exposed by MissingActionHandlerRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by MissingActionHandlerRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by MissingActionHandlerRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "ActionKind",
          "BaseRuntimeError"
        ]
      },
      {
        "name": "MissingResponseReferenceRuntimeError",
        "kind": "interface",
        "purpose": "MissingResponseReferenceRuntimeError defines the runtime errors contract with responseId, code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface MissingResponseReferenceRuntimeError extends BaseRuntimeError<\"missing_response_reference\"> {\n    responseId: ResponseId;\n}"
        ],
        "fields": [
          "responseId",
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "responseId",
            "type": "string",
            "description": "Reusable response identifier associated with the message.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_response_reference\"",
            "description": "code is the \"missing_response_reference\" member exposed by MissingResponseReferenceRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by MissingResponseReferenceRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by MissingResponseReferenceRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "ResponseId",
          "Metadata",
          "BaseRuntimeError"
        ]
      },
      {
        "name": "MissingActionReferenceRuntimeError",
        "kind": "interface",
        "purpose": "MissingActionReferenceRuntimeError defines the runtime errors contract with actionId, code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface MissingActionReferenceRuntimeError extends BaseRuntimeError<\"missing_action_reference\"> {\n    actionId: ActionId;\n}"
        ],
        "fields": [
          "actionId",
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "actionId",
            "type": "string",
            "description": "actionId is the string member exposed by MissingActionReferenceRuntimeError.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_action_reference\"",
            "description": "code is the \"missing_action_reference\" member exposed by MissingActionReferenceRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by MissingActionReferenceRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by MissingActionReferenceRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "ActionId",
          "Metadata",
          "BaseRuntimeError"
        ]
      },
      {
        "name": "MissingVariableReferenceRuntimeError",
        "kind": "interface",
        "purpose": "MissingVariableReferenceRuntimeError defines the runtime errors contract with variableId, scope, code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface MissingVariableReferenceRuntimeError extends BaseRuntimeError<\"missing_variable_reference\"> {\n    variableId: VariableId;\n    scope?: VariableScope;\n}"
        ],
        "fields": [
          "variableId",
          "scope",
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "variableId",
            "type": "string",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "scope is the optional VariableScope member exposed by MissingVariableReferenceRuntimeError.",
            "required": false
          },
          {
            "name": "code",
            "type": "\"missing_variable_reference\"",
            "description": "code is the \"missing_variable_reference\" member exposed by MissingVariableReferenceRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by MissingVariableReferenceRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by MissingVariableReferenceRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "Metadata",
          "VariableScope",
          "BaseRuntimeError"
        ]
      },
      {
        "name": "MissingFlowVersionRuntimeError",
        "kind": "interface",
        "purpose": "MissingFlowVersionRuntimeError defines the runtime errors contract with flowVersionId, code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface MissingFlowVersionRuntimeError extends BaseRuntimeError<\"missing_flow_version\"> {\n    flowVersionId: FlowVersionId;\n}"
        ],
        "fields": [
          "flowVersionId",
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "flowVersionId is the string member exposed by MissingFlowVersionRuntimeError.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_flow_version\"",
            "description": "code is the \"missing_flow_version\" member exposed by MissingFlowVersionRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by MissingFlowVersionRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by MissingFlowVersionRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "FlowVersionId",
          "Metadata",
          "BaseRuntimeError"
        ]
      },
      {
        "name": "MissingStepTargetRuntimeError",
        "kind": "interface",
        "purpose": "MissingStepTargetRuntimeError defines the runtime errors contract with stepId, code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface MissingStepTargetRuntimeError extends BaseRuntimeError<\"missing_step_target\"> {\n    stepId: StepId;\n}"
        ],
        "fields": [
          "stepId",
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "stepId",
            "type": "string",
            "description": "stepId is the string member exposed by MissingStepTargetRuntimeError.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_step_target\"",
            "description": "code is the \"missing_step_target\" member exposed by MissingStepTargetRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by MissingStepTargetRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by MissingStepTargetRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "StepId",
          "Metadata",
          "BaseRuntimeError"
        ]
      },
      {
        "name": "MissingSemanticInputResolverRuntimeError",
        "kind": "interface",
        "purpose": "MissingSemanticInputResolverRuntimeError defines the runtime errors contract with taskId, code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface MissingSemanticInputResolverRuntimeError extends BaseRuntimeError<\"missing_semantic_input_resolver\"> {\n    taskId?: TaskId;\n}"
        ],
        "fields": [
          "taskId",
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "taskId",
            "type": "string",
            "description": "taskId is the optional string member exposed by MissingSemanticInputResolverRuntimeError.",
            "required": false
          },
          {
            "name": "code",
            "type": "\"missing_semantic_input_resolver\"",
            "description": "code is the \"missing_semantic_input_resolver\" member exposed by MissingSemanticInputResolverRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by MissingSemanticInputResolverRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by MissingSemanticInputResolverRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "TaskId",
          "Metadata",
          "BaseRuntimeError"
        ]
      },
      {
        "name": "MissingLlmResponseGeneratorRuntimeError",
        "kind": "interface",
        "purpose": "MissingLlmResponseGeneratorRuntimeError defines the runtime errors contract with responseId, code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface MissingLlmResponseGeneratorRuntimeError extends BaseRuntimeError<\"missing_llm_response_generator\"> {\n    responseId?: ResponseId;\n}"
        ],
        "fields": [
          "responseId",
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "responseId",
            "type": "string",
            "description": "Reusable response identifier associated with the message.",
            "required": false
          },
          {
            "name": "code",
            "type": "\"missing_llm_response_generator\"",
            "description": "code is the \"missing_llm_response_generator\" member exposed by MissingLlmResponseGeneratorRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by MissingLlmResponseGeneratorRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by MissingLlmResponseGeneratorRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "ResponseId",
          "Metadata",
          "BaseRuntimeError"
        ]
      },
      {
        "name": "MissingCustomOperationContractRuntimeError",
        "kind": "interface",
        "purpose": "MissingCustomOperationContractRuntimeError defines the runtime errors contract with customOperationId, code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface MissingCustomOperationContractRuntimeError extends BaseRuntimeError<\"missing_custom_operation_contract\"> {\n    customOperationId: CustomOperationId;\n}"
        ],
        "fields": [
          "customOperationId",
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "customOperationId",
            "type": "string",
            "description": "customOperationId is the string member exposed by MissingCustomOperationContractRuntimeError.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_custom_operation_contract\"",
            "description": "code is the \"missing_custom_operation_contract\" member exposed by MissingCustomOperationContractRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by MissingCustomOperationContractRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by MissingCustomOperationContractRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "CustomOperationId",
          "Metadata",
          "BaseRuntimeError"
        ]
      },
      {
        "name": "MissingCustomOperationHandlerRuntimeError",
        "kind": "interface",
        "purpose": "MissingCustomOperationHandlerRuntimeError defines the runtime errors contract with customType, code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface MissingCustomOperationHandlerRuntimeError extends BaseRuntimeError<\"missing_custom_operation_handler\"> {\n    customType: string;\n}"
        ],
        "fields": [
          "customType",
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "customType",
            "type": "string",
            "description": "customType is the string member exposed by MissingCustomOperationHandlerRuntimeError.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_custom_operation_handler\"",
            "description": "code is the \"missing_custom_operation_handler\" member exposed by MissingCustomOperationHandlerRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by MissingCustomOperationHandlerRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by MissingCustomOperationHandlerRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "BaseRuntimeError"
        ]
      },
      {
        "name": "InvalidSemanticOutcomeRuntimeError",
        "kind": "interface",
        "purpose": "InvalidSemanticOutcomeRuntimeError defines the runtime errors contract with outcome, allowedOutcomes, code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface InvalidSemanticOutcomeRuntimeError extends BaseRuntimeError<\"invalid_semantic_outcome\"> {\n    outcome: StepOutcome;\n    allowedOutcomes: StepOutcome[];\n}"
        ],
        "fields": [
          "outcome",
          "allowedOutcomes",
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "outcome",
            "type": "string",
            "description": "Named outcome used for route or result branch selection.",
            "required": true
          },
          {
            "name": "allowedOutcomes",
            "type": "string[]",
            "description": "allowedOutcomes is the string[] member exposed by InvalidSemanticOutcomeRuntimeError.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"invalid_semantic_outcome\"",
            "description": "code is the \"invalid_semantic_outcome\" member exposed by InvalidSemanticOutcomeRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by InvalidSemanticOutcomeRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by InvalidSemanticOutcomeRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "StepOutcome",
          "BaseRuntimeError"
        ]
      },
      {
        "name": "InvalidSemanticVariableRuntimeError",
        "kind": "interface",
        "purpose": "InvalidSemanticVariableRuntimeError defines the runtime errors contract with variableId, allowedVariableIds, code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface InvalidSemanticVariableRuntimeError extends BaseRuntimeError<\"invalid_semantic_variable\"> {\n    variableId: VariableId;\n    allowedVariableIds: VariableId[];\n}"
        ],
        "fields": [
          "variableId",
          "allowedVariableIds",
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "variableId",
            "type": "string",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "allowedVariableIds",
            "type": "string[]",
            "description": "allowedVariableIds is the string[] member exposed by InvalidSemanticVariableRuntimeError.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"invalid_semantic_variable\"",
            "description": "code is the \"invalid_semantic_variable\" member exposed by InvalidSemanticVariableRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by InvalidSemanticVariableRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by InvalidSemanticVariableRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "Metadata",
          "BaseRuntimeError"
        ]
      },
      {
        "name": "InvalidGeneratedResponseVariableRuntimeError",
        "kind": "interface",
        "purpose": "InvalidGeneratedResponseVariableRuntimeError defines the runtime errors contract with variableId, allowedVariableIds, code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface InvalidGeneratedResponseVariableRuntimeError extends BaseRuntimeError<\"invalid_generated_response_variable\"> {\n    variableId: VariableId;\n    allowedVariableIds: VariableId[];\n}"
        ],
        "fields": [
          "variableId",
          "allowedVariableIds",
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "variableId",
            "type": "string",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "allowedVariableIds",
            "type": "string[]",
            "description": "allowedVariableIds is the string[] member exposed by InvalidGeneratedResponseVariableRuntimeError.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"invalid_generated_response_variable\"",
            "description": "code is the \"invalid_generated_response_variable\" member exposed by InvalidGeneratedResponseVariableRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by InvalidGeneratedResponseVariableRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by InvalidGeneratedResponseVariableRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "Metadata",
          "BaseRuntimeError"
        ]
      },
      {
        "name": "ModelValidationRuntimeError",
        "kind": "interface",
        "purpose": "ModelValidationRuntimeError defines the runtime errors contract with issues, code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface ModelValidationRuntimeError extends BaseRuntimeError<\"model_validation_failed\"> {\n    issues: ValidationIssue[];\n}"
        ],
        "fields": [
          "issues",
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "issues",
            "type": "ValidationIssue[]",
            "description": "issues is the ValidationIssue[] member exposed by ModelValidationRuntimeError.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"model_validation_failed\"",
            "description": "code is the \"model_validation_failed\" member exposed by ModelValidationRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by ModelValidationRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by ModelValidationRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "ValidationIssue",
          "BaseRuntimeError"
        ]
      },
      {
        "name": "OperationalRuntimeError",
        "kind": "interface",
        "purpose": "OperationalRuntimeError defines the runtime errors contract with code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface OperationalRuntimeError extends BaseRuntimeError<OperationalRuntimeErrorCode> {\n    [key: string]: unknown;\n}"
        ],
        "fields": [
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "code",
            "type": "OperationalRuntimeErrorCode",
            "description": "code is the OperationalRuntimeErrorCode member exposed by OperationalRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by OperationalRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by OperationalRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "OperationalRuntimeErrorCode",
          "BaseRuntimeError"
        ]
      },
      {
        "name": "UnhandledRuntimeError",
        "kind": "interface",
        "purpose": "UnhandledRuntimeError defines the runtime errors contract with code, message, recoverable, details.",
        "usage": "Use this contract when handling missing capabilities, invalid references, invalid model output, or operational failures.",
        "signatures": [
          "export interface UnhandledRuntimeError extends BaseRuntimeError<\"unhandled_runtime_error\"> {\n}"
        ],
        "fields": [
          "code",
          "message",
          "recoverable",
          "details"
        ],
        "properties": [
          {
            "name": "code",
            "type": "\"unhandled_runtime_error\"",
            "description": "code is the \"unhandled_runtime_error\" member exposed by UnhandledRuntimeError.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Response plan, human-readable message, or outbound message attached to this contract.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "recoverable is the boolean member exposed by UnhandledRuntimeError.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "details is the optional Metadata member exposed by UnhandledRuntimeError.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "BaseRuntimeError"
        ]
      }
    ]
  },
  {
    "title": "Extension Contracts",
    "summary": "Runtime service interfaces, providers, registries, handlers, and lower-level plugin contracts.",
    "exports": [
      "RuntimeServices",
      "InputProcessor",
      "InputProcessingContext",
      "Resolver",
      "ResolverRegistry",
      "Validator",
      "ValidatorRegistry",
      "ValidationContext",
      "SemanticInputResolver",
      "ResponseRenderer",
      "ResponseRenderingContext",
      "LlmResponseGenerator",
      "LlmGeneratedResponse",
      "ActionExecutor",
      "ActionExecutionContext",
      "ActionHandler",
      "ActionHandlerRegistry",
      "ConditionEvaluator",
      "ConditionEvaluationContext",
      "TransitionResolver",
      "TransitionResolutionContext",
      "StateReducer",
      "StateChangeSet",
      "TraceBuilder",
      "TraceBuildInput",
      "MessageStepHandler",
      "MenuStepHandler",
      "InputStepHandler",
      "AttachmentStepHandler",
      "ConditionStepHandler",
      "EndStepHandler",
      "SendMessageOperationHandler",
      "SetVariableOperationHandler",
      "UnsetVariableOperationHandler",
      "InvalidateVariableOperationHandler",
      "RunActionOperationHandler",
      "CallFlowOperationHandler",
      "EmitEventOperationHandler",
      "HandoffOperationHandler",
      "CustomOperationHandler",
      "Normalizer",
      "NormalizationContext",
      "NormalizerRegistry",
      "Extractor",
      "ExtractionContext",
      "ExtractionResult",
      "ExtractorRegistry",
      "TemplateRenderer",
      "StaticResponseRenderer",
      "TemplateResponseRenderer",
      "GeneratedResponseRenderer",
      "ResponseReferenceResolver",
      "ActionInputMapper",
      "ActionOutputMapper",
      "ActionResultRouter",
      "EventFactory",
      "CreateEventRequest",
      "MessageFactory",
      "CreateTextMessageRequest",
      "CreateRichMessageRequest",
      "CreateCustomPayloadMessageRequest"
    ],
    "entries": [
      {
        "name": "RuntimeServices",
        "kind": "interface",
        "purpose": "RuntimeServices defines the extension contracts contract with stepRegistry, operationRegistry, resolverRegistry, validatorRegistry, normalizerRegistry, extractorRegistry.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface RuntimeServices {\n    stepRegistry: StepHandlerRegistry;\n    operationRegistry: OperationRegistry;\n    resolverRegistry: ResolverRegistry;\n    validatorRegistry: ValidatorRegistry;\n    normalizerRegistry: NormalizerRegistry;\n    extractorRegistry: ExtractorRegistry;\n    operationExecutor: OperationExecutor;\n    inputProcessor: InputProcessor;\n    responseRenderer: ResponseRenderer;\n    actionExecutor: ActionExecutor;\n    conditionEvaluator: ConditionEvaluator;\n    transitionResolver: TransitionResolver;\n    stateReducer: StateReducer;\n    traceBuilder: TraceBuilder;\n    semanticInputResolver?: SemanticInputResolver;\n    llmResponseGenerator?: LlmResponseGenerator;\n}"
        ],
        "fields": [
          "stepRegistry",
          "operationRegistry",
          "resolverRegistry",
          "validatorRegistry",
          "normalizerRegistry",
          "extractorRegistry",
          "operationExecutor",
          "inputProcessor",
          "responseRenderer",
          "actionExecutor",
          "conditionEvaluator",
          "transitionResolver",
          "stateReducer",
          "traceBuilder",
          "semanticInputResolver",
          "llmResponseGenerator"
        ],
        "properties": [
          {
            "name": "stepRegistry",
            "type": "StepHandlerRegistry",
            "description": "stepRegistry is the StepHandlerRegistry member exposed by RuntimeServices.",
            "required": true
          },
          {
            "name": "operationRegistry",
            "type": "OperationRegistry",
            "description": "operationRegistry is the OperationRegistry member exposed by RuntimeServices.",
            "required": true
          },
          {
            "name": "resolverRegistry",
            "type": "ResolverRegistry",
            "description": "resolverRegistry is the ResolverRegistry member exposed by RuntimeServices.",
            "required": true
          },
          {
            "name": "validatorRegistry",
            "type": "ValidatorRegistry",
            "description": "validatorRegistry is the ValidatorRegistry member exposed by RuntimeServices.",
            "required": true
          },
          {
            "name": "normalizerRegistry",
            "type": "NormalizerRegistry",
            "description": "normalizerRegistry is the NormalizerRegistry member exposed by RuntimeServices.",
            "required": true
          },
          {
            "name": "extractorRegistry",
            "type": "ExtractorRegistry",
            "description": "extractorRegistry is the ExtractorRegistry member exposed by RuntimeServices.",
            "required": true
          },
          {
            "name": "operationExecutor",
            "type": "OperationExecutor",
            "description": "operationExecutor is the OperationExecutor member exposed by RuntimeServices.",
            "required": true
          },
          {
            "name": "inputProcessor",
            "type": "InputProcessor",
            "description": "inputProcessor is the InputProcessor member exposed by RuntimeServices.",
            "required": true
          },
          {
            "name": "responseRenderer",
            "type": "ResponseRenderer",
            "description": "responseRenderer is the ResponseRenderer member exposed by RuntimeServices.",
            "required": true
          },
          {
            "name": "actionExecutor",
            "type": "ActionExecutor",
            "description": "actionExecutor is the ActionExecutor member exposed by RuntimeServices.",
            "required": true
          },
          {
            "name": "conditionEvaluator",
            "type": "ConditionEvaluator",
            "description": "conditionEvaluator is the ConditionEvaluator member exposed by RuntimeServices.",
            "required": true
          },
          {
            "name": "transitionResolver",
            "type": "TransitionResolver",
            "description": "transitionResolver is the TransitionResolver member exposed by RuntimeServices.",
            "required": true
          },
          {
            "name": "stateReducer",
            "type": "StateReducer",
            "description": "stateReducer is the StateReducer member exposed by RuntimeServices.",
            "required": true
          },
          {
            "name": "traceBuilder",
            "type": "TraceBuilder",
            "description": "traceBuilder is the TraceBuilder member exposed by RuntimeServices.",
            "required": true
          },
          {
            "name": "semanticInputResolver",
            "type": "SemanticInputResolver",
            "description": "semanticInputResolver is the optional SemanticInputResolver member exposed by RuntimeServices.",
            "required": false
          },
          {
            "name": "llmResponseGenerator",
            "type": "LlmResponseGenerator",
            "description": "llmResponseGenerator is the optional LlmResponseGenerator member exposed by RuntimeServices.",
            "required": false
          }
        ],
        "related": [
          "StepHandlerRegistry",
          "OperationRegistry",
          "OperationExecutor",
          "InputProcessor",
          "ResolverRegistry",
          "ValidatorRegistry",
          "SemanticInputResolver",
          "ResponseRenderer",
          "LlmResponseGenerator",
          "ActionExecutor"
        ]
      },
      {
        "name": "InputProcessor",
        "kind": "interface",
        "purpose": "InputProcessor defines the extension contracts contract with process.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface InputProcessor {\n    process(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<InputResolutionResult>;\n}"
        ],
        "methods": [
          {
            "name": "process",
            "signature": "process(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<InputResolutionResult>",
            "description": "Processes  through InputProcessor.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<InputResolutionResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "process"
        ],
        "related": [
          "InputContract",
          "UserInput",
          "InputResolutionResult",
          "InputProcessingContext"
        ]
      },
      {
        "name": "InputProcessingContext",
        "kind": "interface",
        "purpose": "InputProcessingContext defines the extension contracts contract with flow, step, state, turn.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface InputProcessingContext {\n    flow: FlowVersion;\n    step: StepDefinition;\n    state: ConversationState;\n    turn: Turn;\n}"
        ],
        "fields": [
          "flow",
          "step",
          "state",
          "turn"
        ],
        "properties": [
          {
            "name": "flow",
            "type": "FlowVersion",
            "description": "Flow or flow version being validated or executed.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "Active step definition.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Current turn metadata.",
            "required": true
          }
        ],
        "related": [
          "FlowVersion",
          "StepDefinition",
          "ConversationState",
          "Turn"
        ]
      },
      {
        "name": "Resolver",
        "kind": "interface",
        "purpose": "Resolver defines the extension contracts contract with resolverType, canResolve, resolve.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface Resolver {\n    readonly resolverType: string;\n    canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean;\n    resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>;\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "canResolve is the method exposed by Resolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "resolve is the method exposed by Resolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "resolverType",
          "canResolve",
          "resolve"
        ],
        "properties": [
          {
            "name": "resolverType",
            "type": "string",
            "description": "resolverType is the string member exposed by Resolver.",
            "required": true
          }
        ],
        "related": [
          "InputContract",
          "UserInput",
          "CommandCandidate",
          "InputProcessingContext"
        ]
      },
      {
        "name": "ResolverRegistry",
        "kind": "interface",
        "purpose": "ResolverRegistry defines the extension contracts contract with register, list.",
        "usage": "Use ResolverRegistry when runtime services need to register, look up, or test support for extension implementations.",
        "signatures": [
          "export interface ResolverRegistry {\n    register(resolver: Resolver): void;\n    list(): Resolver[];\n}"
        ],
        "methods": [
          {
            "name": "register",
            "signature": "register(resolver: Resolver): void",
            "description": "Registers a provider, handler, resolver, validator, normalizer, or extractor.",
            "parameters": [
              {
                "name": "resolver",
                "type": "Resolver",
                "description": "resolver is the Resolver member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "void",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "list",
            "signature": "list(): Resolver[]",
            "description": "list is the method exposed by ResolverRegistry.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "This method does not require arguments.",
                "required": false
              }
            ],
            "returns": {
              "type": "Resolver[]",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "register",
          "list"
        ],
        "related": [
          "Resolver"
        ]
      },
      {
        "name": "Validator",
        "kind": "interface",
        "purpose": "Validator defines the extension contracts contract with validatorType, validate.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface Validator {\n    readonly validatorType: string;\n    validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>;\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "validate is the method exposed by Validator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "value is the unknown member exposed by method.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "definition is the ValidatorDefinition member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "context is the ValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "validatorType",
          "validate"
        ],
        "properties": [
          {
            "name": "validatorType",
            "type": "string",
            "description": "validatorType is the string member exposed by Validator.",
            "required": true
          }
        ],
        "related": [
          "ValidatorDefinition",
          "ValidationResult",
          "ValidationContext"
        ]
      },
      {
        "name": "ValidatorRegistry",
        "kind": "interface",
        "purpose": "ValidatorRegistry defines the extension contracts contract with register, getValidator, hasValidator.",
        "usage": "Use ValidatorRegistry when runtime services need to register, look up, or test support for extension implementations.",
        "signatures": [
          "export interface ValidatorRegistry {\n    register(validator: Validator): void;\n    getValidator(validatorType: string): Validator;\n    hasValidator(validatorType: string): boolean;\n}"
        ],
        "methods": [
          {
            "name": "register",
            "signature": "register(validator: Validator): void",
            "description": "Registers a provider, handler, resolver, validator, normalizer, or extractor.",
            "parameters": [
              {
                "name": "validator",
                "type": "Validator",
                "description": "validator is the Validator member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "void",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "getValidator",
            "signature": "getValidator(validatorType: string): Validator",
            "description": "Reads validator from ValidatorRegistry.",
            "parameters": [
              {
                "name": "validatorType",
                "type": "string",
                "description": "validatorType is the string member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Validator",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "hasValidator",
            "signature": "hasValidator(validatorType: string): boolean",
            "description": "Checks whether ValidatorRegistry has validator.",
            "parameters": [
              {
                "name": "validatorType",
                "type": "string",
                "description": "validatorType is the string member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "register",
          "getValidator",
          "hasValidator"
        ],
        "related": [
          "Validator"
        ]
      },
      {
        "name": "ValidationContext",
        "kind": "interface",
        "purpose": "Runtime context passed to a Validator while it validates a captured value.",
        "usage": "Use it inside custom validators when validation needs the active FlowVersion, StepDefinition, ConversationState, Turn, or target variable id.",
        "signatures": [
          "export interface ValidationContext {\n    flow: FlowVersion;\n    step: StepDefinition;\n    state: ConversationState;\n    turn: Turn;\n    variableId?: VariableId;\n}"
        ],
        "fields": [
          "flow",
          "step",
          "state",
          "turn",
          "variableId"
        ],
        "properties": [
          {
            "name": "flow",
            "type": "FlowVersion",
            "description": "Flow or flow version being validated or executed.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "Active step definition.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Current turn metadata.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "string",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "FlowVersion",
          "StepDefinition",
          "ConversationState",
          "Turn"
        ]
      },
      {
        "name": "SemanticInputResolver",
        "kind": "interface",
        "purpose": "SemanticInputResolver defines the extension contracts contract with resolve.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface SemanticInputResolver {\n    resolve<TOutcome extends StepOutcome = StepOutcome, TVariableId extends VariableId = VariableId>(input: UserInput, task: SemanticInputTask<TOutcome, TVariableId>, context: InputProcessingContext): Promise<SemanticInputResolution<TOutcome, TVariableId>>;\n}"
        ],
        "methods": [
          {
            "name": "resolve",
            "signature": "resolve<TOutcome extends StepOutcome = StepOutcome, TVariableId extends VariableId = VariableId>(\n        input: UserInput,\n        task: SemanticInputTask<TOutcome, TVariableId>,\n        context: InputProcessingContext\n    ): Promise<SemanticInputResolution<TOutcome, TVariableId>>",
            "description": "resolve is the method exposed by SemanticInputResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "task",
                "type": "SemanticInputTask<TOutcome, TVariableId>",
                "description": "task is the SemanticInputTask<TOutcome, TVariableId> member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<SemanticInputResolution<TOutcome, TVariableId>>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "resolve"
        ],
        "related": [
          "VariableId",
          "StepOutcome",
          "SemanticInputTask",
          "UserInput",
          "SemanticInputResolution",
          "InputProcessingContext"
        ]
      },
      {
        "name": "ResponseRenderer",
        "kind": "interface",
        "purpose": "ResponseRenderer defines the extension contracts contract with render.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface ResponseRenderer {\n    render(plan: ResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>;\n}"
        ],
        "methods": [
          {
            "name": "render",
            "signature": "render(plan: ResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>",
            "description": "render is the method exposed by ResponseRenderer.",
            "parameters": [
              {
                "name": "plan",
                "type": "ResponsePlan",
                "description": "plan is the ResponsePlan member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ResponseRenderingContext",
                "description": "context is the ResponseRenderingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OutboundMessage[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "render"
        ],
        "related": [
          "ResponsePlan",
          "OutboundMessage",
          "ResponseRenderingContext"
        ]
      },
      {
        "name": "ResponseRenderingContext",
        "kind": "interface",
        "purpose": "ResponseRenderingContext defines the extension contracts contract with flow, step, state, turn, channel.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface ResponseRenderingContext {\n    flow: FlowVersion;\n    step: StepDefinition;\n    state: ConversationState;\n    turn: Turn;\n    channel?: string;\n}"
        ],
        "fields": [
          "flow",
          "step",
          "state",
          "turn",
          "channel"
        ],
        "properties": [
          {
            "name": "flow",
            "type": "FlowVersion",
            "description": "Flow or flow version being validated or executed.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "Active step definition.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Current turn metadata.",
            "required": true
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          }
        ],
        "related": [
          "FlowVersion",
          "StepDefinition",
          "ConversationState",
          "Turn"
        ]
      },
      {
        "name": "LlmResponseGenerator",
        "kind": "interface",
        "purpose": "LlmResponseGenerator defines the extension contracts contract with generate.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface LlmResponseGenerator {\n    generate<TVariableId extends VariableId = VariableId>(plan: GeneratedResponsePlan<TVariableId>, context: ResponseRenderingContext): Promise<LlmGeneratedResponse<TVariableId>>;\n}"
        ],
        "methods": [
          {
            "name": "generate",
            "signature": "generate<TVariableId extends VariableId = VariableId>(\n        plan: GeneratedResponsePlan<TVariableId>,\n        context: ResponseRenderingContext\n    ): Promise<LlmGeneratedResponse<TVariableId>>",
            "description": "generate is the method exposed by LlmResponseGenerator.",
            "parameters": [
              {
                "name": "plan",
                "type": "GeneratedResponsePlan<TVariableId>",
                "description": "plan is the GeneratedResponsePlan<TVariableId> member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ResponseRenderingContext",
                "description": "context is the ResponseRenderingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<LlmGeneratedResponse<TVariableId>>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "generate"
        ],
        "related": [
          "VariableId",
          "GeneratedResponsePlan",
          "ResponseRenderingContext",
          "LlmGeneratedResponse"
        ]
      },
      {
        "name": "LlmGeneratedResponse",
        "kind": "interface",
        "purpose": "LlmGeneratedResponse defines the extension contracts contract with text, usedVariableIds, fallbackUsed, usage, metadata.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface LlmGeneratedResponse<TVariableId extends VariableId = VariableId> {\n    text: string;\n    usedVariableIds: readonly TVariableId[];\n    fallbackUsed?: boolean;\n    usage?: LlmUsageRecord;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "text",
          "usedVariableIds",
          "fallbackUsed",
          "usage",
          "metadata"
        ],
        "properties": [
          {
            "name": "text",
            "type": "string",
            "description": "Text content sent by a user or returned to a user.",
            "required": true
          },
          {
            "name": "usedVariableIds",
            "type": "readonly TVariableId[]",
            "description": "usedVariableIds is the readonly TVariableId[] member exposed by LlmGeneratedResponse.",
            "required": true
          },
          {
            "name": "fallbackUsed",
            "type": "boolean",
            "description": "fallbackUsed is the optional boolean member exposed by LlmGeneratedResponse.",
            "required": false
          },
          {
            "name": "usage",
            "type": "LlmUsageRecord",
            "description": "usage is the optional LlmUsageRecord member exposed by LlmGeneratedResponse.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "Metadata",
          "LlmUsageRecord"
        ]
      },
      {
        "name": "ActionExecutor",
        "kind": "interface",
        "purpose": "ActionExecutor defines the extension contracts contract with execute.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface ActionExecutor {\n    execute(action: ActionDefinition, input: Record<string, unknown>, context: ActionExecutionContext): Promise<ActionResult>;\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(action: ActionDefinition, input: Record<string, unknown>, context: ActionExecutionContext): Promise<ActionResult>",
            "description": "execute is the method exposed by ActionExecutor.",
            "parameters": [
              {
                "name": "action",
                "type": "ActionDefinition",
                "description": "action is the ActionDefinition member exposed by method.",
                "required": true
              },
              {
                "name": "input",
                "type": "Record<string, unknown>",
                "description": "input is the Record<string, unknown> member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ActionExecutionContext",
                "description": "context is the ActionExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ActionResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "execute"
        ],
        "related": [
          "ActionDefinition",
          "ActionResult",
          "ActionExecutionContext"
        ]
      },
      {
        "name": "ActionExecutionContext",
        "kind": "interface",
        "purpose": "ActionExecutionContext defines the extension contracts contract with flow, step, state, turn.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface ActionExecutionContext {\n    flow: FlowVersion;\n    step: StepDefinition;\n    state: ConversationState;\n    turn: Turn;\n}"
        ],
        "fields": [
          "flow",
          "step",
          "state",
          "turn"
        ],
        "properties": [
          {
            "name": "flow",
            "type": "FlowVersion",
            "description": "Flow or flow version being validated or executed.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "Active step definition.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Current turn metadata.",
            "required": true
          }
        ],
        "related": [
          "FlowVersion",
          "StepDefinition",
          "ConversationState",
          "Turn"
        ]
      },
      {
        "name": "ActionHandler",
        "kind": "interface",
        "purpose": "ActionHandler defines the extension contracts contract with actionKind, execute.",
        "usage": "Use ActionHandler when registering or describing handler behavior for extension contracts.",
        "signatures": [
          "export interface ActionHandler {\n    readonly actionKind: ActionKind;\n    execute(action: ActionDefinition, input: Record<string, unknown>, context: ActionExecutionContext): Promise<ActionResult>;\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(action: ActionDefinition, input: Record<string, unknown>, context: ActionExecutionContext): Promise<ActionResult>",
            "description": "execute is the method exposed by ActionHandler.",
            "parameters": [
              {
                "name": "action",
                "type": "ActionDefinition",
                "description": "action is the ActionDefinition member exposed by method.",
                "required": true
              },
              {
                "name": "input",
                "type": "Record<string, unknown>",
                "description": "input is the Record<string, unknown> member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ActionExecutionContext",
                "description": "context is the ActionExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ActionResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "actionKind",
          "execute"
        ],
        "properties": [
          {
            "name": "actionKind",
            "type": "string",
            "description": "actionKind is the string member exposed by ActionHandler.",
            "required": true
          }
        ],
        "related": [
          "ActionKind",
          "ActionDefinition",
          "ActionResult",
          "ActionExecutionContext"
        ]
      },
      {
        "name": "ActionHandlerRegistry",
        "kind": "interface",
        "purpose": "ActionHandlerRegistry defines the extension contracts contract with register, getHandler, hasHandler.",
        "usage": "Use ActionHandlerRegistry when runtime services need to register, look up, or test support for extension implementations.",
        "signatures": [
          "export interface ActionHandlerRegistry {\n    register(handler: ActionHandler): void;\n    getHandler(actionKind: ActionKind): ActionHandler;\n    hasHandler(actionKind: ActionKind): boolean;\n}"
        ],
        "methods": [
          {
            "name": "register",
            "signature": "register(handler: ActionHandler): void",
            "description": "Registers a provider, handler, resolver, validator, normalizer, or extractor.",
            "parameters": [
              {
                "name": "handler",
                "type": "ActionHandler",
                "description": "handler is the ActionHandler member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "void",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "getHandler",
            "signature": "getHandler(actionKind: ActionKind): ActionHandler",
            "description": "Returns the registered handler for the requested type.",
            "parameters": [
              {
                "name": "actionKind",
                "type": "ActionKind",
                "description": "actionKind is the ActionKind member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "ActionHandler",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "hasHandler",
            "signature": "hasHandler(actionKind: ActionKind): boolean",
            "description": "Checks whether a handler is registered for the requested type.",
            "parameters": [
              {
                "name": "actionKind",
                "type": "ActionKind",
                "description": "actionKind is the ActionKind member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "register",
          "getHandler",
          "hasHandler"
        ],
        "related": [
          "ActionKind",
          "ActionHandler"
        ]
      },
      {
        "name": "ConditionEvaluator",
        "kind": "interface",
        "purpose": "ConditionEvaluator defines the extension contracts contract with evaluate.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface ConditionEvaluator {\n    evaluate(condition: ConditionExpression, context: ConditionEvaluationContext): Promise<ConditionEvaluationResult>;\n}"
        ],
        "methods": [
          {
            "name": "evaluate",
            "signature": "evaluate(condition: ConditionExpression, context: ConditionEvaluationContext): Promise<ConditionEvaluationResult>",
            "description": "evaluate is the method exposed by ConditionEvaluator.",
            "parameters": [
              {
                "name": "condition",
                "type": "ConditionExpression",
                "description": "condition is the ConditionExpression member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ConditionEvaluationContext",
                "description": "context is the ConditionEvaluationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConditionEvaluationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "evaluate"
        ],
        "related": [
          "ConditionExpression",
          "ConditionEvaluationResult",
          "ConditionEvaluationContext"
        ]
      },
      {
        "name": "ConditionEvaluationContext",
        "kind": "interface",
        "purpose": "ConditionEvaluationContext defines the extension contracts contract with flow, step, state, turn.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface ConditionEvaluationContext {\n    flow: FlowVersion;\n    step: ConditionStepDefinition;\n    state: ConversationState;\n    turn?: Turn;\n}"
        ],
        "fields": [
          "flow",
          "step",
          "state",
          "turn"
        ],
        "properties": [
          {
            "name": "flow",
            "type": "FlowVersion",
            "description": "Flow or flow version being validated or executed.",
            "required": true
          },
          {
            "name": "step",
            "type": "ConditionStepDefinition",
            "description": "Active step definition.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Current turn metadata.",
            "required": false
          }
        ],
        "related": [
          "FlowVersion",
          "ConditionStepDefinition",
          "ConversationState",
          "Turn"
        ]
      },
      {
        "name": "TransitionResolver",
        "kind": "interface",
        "purpose": "TransitionResolver defines the extension contracts contract with resolveFromStepResult, resolveFromOutcome.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface TransitionResolver {\n    resolveFromStepResult(step: StepDefinition, result: StepResult, context: TransitionResolutionContext): Promise<StepBranch | undefined>;\n    resolveFromOutcome(step: StepDefinition, outcome: StepOutcome, context: TransitionResolutionContext): Promise<StepBranch | undefined>;\n}"
        ],
        "methods": [
          {
            "name": "resolveFromStepResult",
            "signature": "resolveFromStepResult(step: StepDefinition, result: StepResult, context: TransitionResolutionContext): Promise<StepBranch | undefined>",
            "description": "resolveFromStepResult is the method exposed by TransitionResolver.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Active step definition.",
                "required": true
              },
              {
                "name": "result",
                "type": "StepResult",
                "description": "result is the StepResult member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "TransitionResolutionContext",
                "description": "context is the TransitionResolutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepBranch | undefined>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "resolveFromOutcome",
            "signature": "resolveFromOutcome(step: StepDefinition, outcome: StepOutcome, context: TransitionResolutionContext): Promise<StepBranch | undefined>",
            "description": "resolveFromOutcome is the method exposed by TransitionResolver.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Active step definition.",
                "required": true
              },
              {
                "name": "outcome",
                "type": "StepOutcome",
                "description": "Named outcome used for route or result branch selection.",
                "required": true
              },
              {
                "name": "context",
                "type": "TransitionResolutionContext",
                "description": "context is the TransitionResolutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepBranch | undefined>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "resolveFromStepResult",
          "resolveFromOutcome"
        ],
        "related": [
          "StepOutcome",
          "StepDefinition",
          "StepBranch",
          "StepResult",
          "TransitionResolutionContext"
        ]
      },
      {
        "name": "TransitionResolutionContext",
        "kind": "interface",
        "purpose": "TransitionResolutionContext defines the extension contracts contract with flow, state, turn.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface TransitionResolutionContext {\n    flow: FlowVersion;\n    state: ConversationState;\n    turn: Turn;\n}"
        ],
        "fields": [
          "flow",
          "state",
          "turn"
        ],
        "properties": [
          {
            "name": "flow",
            "type": "FlowVersion",
            "description": "Flow or flow version being validated or executed.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Current turn metadata.",
            "required": true
          }
        ],
        "related": [
          "FlowVersion",
          "ConversationState",
          "Turn"
        ]
      },
      {
        "name": "StateReducer",
        "kind": "interface",
        "purpose": "StateReducer defines the extension contracts contract with apply.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface StateReducer {\n    apply(state: ConversationState, changes: StateChangeSet): ConversationState;\n}"
        ],
        "methods": [
          {
            "name": "apply",
            "signature": "apply(state: ConversationState, changes: StateChangeSet): ConversationState",
            "description": "apply is the method exposed by StateReducer.",
            "parameters": [
              {
                "name": "state",
                "type": "ConversationState",
                "description": "Current conversation state.",
                "required": true
              },
              {
                "name": "changes",
                "type": "StateChangeSet",
                "description": "changes is the StateChangeSet member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "ConversationState",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "apply"
        ],
        "related": [
          "ConversationState",
          "StateChangeSet"
        ]
      },
      {
        "name": "StateChangeSet",
        "kind": "interface",
        "purpose": "StateChangeSet defines the extension contracts contract with events, variablePatches, nextStepId, status, pendingInput, clearPendingInput.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface StateChangeSet {\n    events?: ConversationEvent[];\n    variablePatches?: VariablePatch[];\n    nextStepId?: StepId;\n    status?: ConversationStatus;\n    pendingInput?: PendingInputState;\n    clearPendingInput?: boolean;\n}"
        ],
        "fields": [
          "events",
          "variablePatches",
          "nextStepId",
          "status",
          "pendingInput",
          "clearPendingInput"
        ],
        "properties": [
          {
            "name": "events",
            "type": "ConversationEvent[]",
            "description": "Runtime events emitted during execution.",
            "required": false
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<string>[]",
            "description": "Variable writes, unsets, or invalidations produced by execution.",
            "required": false
          },
          {
            "name": "nextStepId",
            "type": "string",
            "description": "nextStepId is the optional string member exposed by StateChangeSet.",
            "required": false
          },
          {
            "name": "status",
            "type": "ConversationStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": false
          },
          {
            "name": "pendingInput",
            "type": "PendingInputState",
            "description": "pendingInput is the optional PendingInputState member exposed by StateChangeSet.",
            "required": false
          },
          {
            "name": "clearPendingInput",
            "type": "boolean",
            "description": "clearPendingInput is the optional boolean member exposed by StateChangeSet.",
            "required": false
          }
        ],
        "related": [
          "StepId",
          "ConversationStatus",
          "VariablePatch",
          "PendingInputState",
          "ConversationEvent"
        ]
      },
      {
        "name": "TraceBuilder",
        "kind": "interface",
        "purpose": "TraceBuilder defines the extension contracts contract with build.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface TraceBuilder {\n    build(input: TraceBuildInput): DecisionTrace;\n}"
        ],
        "methods": [
          {
            "name": "build",
            "signature": "build(input: TraceBuildInput): DecisionTrace",
            "description": "build is the method exposed by TraceBuilder.",
            "parameters": [
              {
                "name": "input",
                "type": "TraceBuildInput",
                "description": "input is the TraceBuildInput member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "DecisionTrace",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "build"
        ],
        "related": [
          "DecisionTrace",
          "TraceBuildInput"
        ]
      },
      {
        "name": "TraceBuildInput",
        "kind": "interface",
        "purpose": "TraceBuildInput defines the extension contracts contract with conversationId, turnId, flowVersionId, initialStepId, finalStepId, userInput.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface TraceBuildInput {\n    conversationId: ConversationId;\n    turnId: TurnId;\n    flowVersionId: FlowVersionId;\n    initialStepId?: StepId;\n    finalStepId?: StepId;\n    userInput?: UserInput;\n    fragments: TraceFragment[];\n    events: ConversationEvent[];\n    messages: OutboundMessage[];\n    variablePatches: VariablePatch[];\n    variableReads?: VariableReadTrace[];\n    operationResults?: OperationTraceRecord[];\n    actionResults?: ActionTraceRecord[];\n    conditionResults?: ConditionTraceRecord[];\n    flowCalls?: FlowCallTraceRecord[];\n    handoffs?: HandoffTraceRecord[];\n    llmUsage?: LlmUsageRecord[];\n}"
        ],
        "fields": [
          "conversationId",
          "turnId",
          "flowVersionId",
          "initialStepId",
          "finalStepId",
          "userInput",
          "fragments",
          "events",
          "messages",
          "variablePatches",
          "variableReads",
          "operationResults",
          "actionResults",
          "conditionResults",
          "flowCalls",
          "handoffs",
          "llmUsage"
        ],
        "properties": [
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "flowVersionId is the string member exposed by TraceBuildInput.",
            "required": true
          },
          {
            "name": "initialStepId",
            "type": "string",
            "description": "initialStepId is the optional string member exposed by TraceBuildInput.",
            "required": false
          },
          {
            "name": "finalStepId",
            "type": "string",
            "description": "finalStepId is the optional string member exposed by TraceBuildInput.",
            "required": false
          },
          {
            "name": "userInput",
            "type": "UserInput",
            "description": "userInput is the optional UserInput member exposed by TraceBuildInput.",
            "required": false
          },
          {
            "name": "fragments",
            "type": "TraceFragment[]",
            "description": "fragments is the TraceFragment[] member exposed by TraceBuildInput.",
            "required": true
          },
          {
            "name": "events",
            "type": "ConversationEvent[]",
            "description": "Runtime events emitted during execution.",
            "required": true
          },
          {
            "name": "messages",
            "type": "OutboundMessage[]",
            "description": "Outbound messages produced by the turn, step, branch, or operation.",
            "required": true
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<string>[]",
            "description": "Variable writes, unsets, or invalidations produced by execution.",
            "required": true
          },
          {
            "name": "variableReads",
            "type": "VariableReadTrace[]",
            "description": "variableReads is the optional VariableReadTrace[] member exposed by TraceBuildInput.",
            "required": false
          },
          {
            "name": "operationResults",
            "type": "OperationTraceRecord[]",
            "description": "operationResults is the optional OperationTraceRecord[] member exposed by TraceBuildInput.",
            "required": false
          },
          {
            "name": "actionResults",
            "type": "ActionTraceRecord[]",
            "description": "actionResults is the optional ActionTraceRecord[] member exposed by TraceBuildInput.",
            "required": false
          },
          {
            "name": "conditionResults",
            "type": "ConditionTraceRecord[]",
            "description": "conditionResults is the optional ConditionTraceRecord[] member exposed by TraceBuildInput.",
            "required": false
          },
          {
            "name": "flowCalls",
            "type": "FlowCallTraceRecord[]",
            "description": "flowCalls is the optional FlowCallTraceRecord[] member exposed by TraceBuildInput.",
            "required": false
          },
          {
            "name": "handoffs",
            "type": "HandoffTraceRecord[]",
            "description": "handoffs is the optional HandoffTraceRecord[] member exposed by TraceBuildInput.",
            "required": false
          },
          {
            "name": "llmUsage",
            "type": "LlmUsageRecord[]",
            "description": "llmUsage is the optional LlmUsageRecord[] member exposed by TraceBuildInput.",
            "required": false
          }
        ],
        "related": [
          "FlowVersionId",
          "StepId",
          "ConversationId",
          "TurnId",
          "VariablePatch",
          "UserInput",
          "OutboundMessage",
          "ConversationEvent",
          "TraceFragment",
          "VariableReadTrace"
        ]
      },
      {
        "name": "MessageStepHandler",
        "kind": "interface",
        "purpose": "MessageStepHandler defines the extension contracts contract with stepType, validate, enter, handleInput.",
        "usage": "Use MessageStepHandler when registering or describing handler behavior for extension contracts.",
        "signatures": [
          "export interface MessageStepHandler extends StepHandler<MessageStepConfig> {\n    readonly stepType: \"message\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(step: StepDefinition, context: StepValidationContext): ValidationIssue[]",
            "description": "validate is the method exposed by MessageStepHandler.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Active step definition.",
                "required": true
              },
              {
                "name": "context",
                "type": "StepValidationContext",
                "description": "context is the StepValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "ValidationIssue[]",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "enter",
            "signature": "enter(context: StepExecutionContext<TConfig>): Promise<StepResult>",
            "description": "enter is the method exposed by MessageStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "context is the StepExecutionContext<TConfig> member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "handleInput",
            "signature": "handleInput?(context: StepExecutionContext<TConfig>, input: UserInput): Promise<StepResult>",
            "description": "handleInput is the optional method exposed by MessageStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "context is the StepExecutionContext<TConfig> member exposed by method.",
                "required": true
              },
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "Return value produced by this method."
            },
            "required": false
          }
        ],
        "fields": [
          "stepType",
          "validate",
          "enter",
          "handleInput"
        ],
        "properties": [
          {
            "name": "stepType",
            "type": "\"message\"",
            "description": "stepType is the \"message\" member exposed by MessageStepHandler.",
            "required": true
          }
        ],
        "related": [
          "StepDefinition",
          "MessageStepConfig",
          "UserInput",
          "StepExecutionContext",
          "StepResult",
          "StepHandler",
          "StepValidationContext",
          "ValidationIssue"
        ]
      },
      {
        "name": "MenuStepHandler",
        "kind": "interface",
        "purpose": "MenuStepHandler defines the extension contracts contract with stepType, validate, enter, handleInput.",
        "usage": "Use MenuStepHandler when registering or describing handler behavior for extension contracts.",
        "signatures": [
          "export interface MenuStepHandler extends StepHandler<MenuStepConfig> {\n    readonly stepType: \"menu\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(step: StepDefinition, context: StepValidationContext): ValidationIssue[]",
            "description": "validate is the method exposed by MenuStepHandler.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Active step definition.",
                "required": true
              },
              {
                "name": "context",
                "type": "StepValidationContext",
                "description": "context is the StepValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "ValidationIssue[]",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "enter",
            "signature": "enter(context: StepExecutionContext<TConfig>): Promise<StepResult>",
            "description": "enter is the method exposed by MenuStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "context is the StepExecutionContext<TConfig> member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "handleInput",
            "signature": "handleInput?(context: StepExecutionContext<TConfig>, input: UserInput): Promise<StepResult>",
            "description": "handleInput is the optional method exposed by MenuStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "context is the StepExecutionContext<TConfig> member exposed by method.",
                "required": true
              },
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "Return value produced by this method."
            },
            "required": false
          }
        ],
        "fields": [
          "stepType",
          "validate",
          "enter",
          "handleInput"
        ],
        "properties": [
          {
            "name": "stepType",
            "type": "\"menu\"",
            "description": "stepType is the \"menu\" member exposed by MenuStepHandler.",
            "required": true
          }
        ],
        "related": [
          "StepDefinition",
          "MenuStepConfig",
          "UserInput",
          "StepExecutionContext",
          "StepResult",
          "StepHandler",
          "StepValidationContext",
          "ValidationIssue"
        ]
      },
      {
        "name": "InputStepHandler",
        "kind": "interface",
        "purpose": "InputStepHandler defines the extension contracts contract with stepType, validate, enter, handleInput.",
        "usage": "Use InputStepHandler when registering or describing handler behavior for extension contracts.",
        "signatures": [
          "export interface InputStepHandler extends StepHandler<InputStepConfig> {\n    readonly stepType: \"input\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(step: StepDefinition, context: StepValidationContext): ValidationIssue[]",
            "description": "validate is the method exposed by InputStepHandler.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Active step definition.",
                "required": true
              },
              {
                "name": "context",
                "type": "StepValidationContext",
                "description": "context is the StepValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "ValidationIssue[]",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "enter",
            "signature": "enter(context: StepExecutionContext<TConfig>): Promise<StepResult>",
            "description": "enter is the method exposed by InputStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "context is the StepExecutionContext<TConfig> member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "handleInput",
            "signature": "handleInput?(context: StepExecutionContext<TConfig>, input: UserInput): Promise<StepResult>",
            "description": "handleInput is the optional method exposed by InputStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "context is the StepExecutionContext<TConfig> member exposed by method.",
                "required": true
              },
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "Return value produced by this method."
            },
            "required": false
          }
        ],
        "fields": [
          "stepType",
          "validate",
          "enter",
          "handleInput"
        ],
        "properties": [
          {
            "name": "stepType",
            "type": "\"input\"",
            "description": "stepType is the \"input\" member exposed by InputStepHandler.",
            "required": true
          }
        ],
        "related": [
          "StepDefinition",
          "InputStepConfig",
          "UserInput",
          "StepExecutionContext",
          "StepResult",
          "StepHandler",
          "StepValidationContext",
          "ValidationIssue"
        ]
      },
      {
        "name": "AttachmentStepHandler",
        "kind": "interface",
        "purpose": "AttachmentStepHandler defines the extension contracts contract with stepType, validate, enter, handleInput.",
        "usage": "Use AttachmentStepHandler when registering or describing handler behavior for extension contracts.",
        "signatures": [
          "export interface AttachmentStepHandler extends StepHandler<AttachmentStepConfig> {\n    readonly stepType: \"attachment\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(step: StepDefinition, context: StepValidationContext): ValidationIssue[]",
            "description": "validate is the method exposed by AttachmentStepHandler.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Active step definition.",
                "required": true
              },
              {
                "name": "context",
                "type": "StepValidationContext",
                "description": "context is the StepValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "ValidationIssue[]",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "enter",
            "signature": "enter(context: StepExecutionContext<TConfig>): Promise<StepResult>",
            "description": "enter is the method exposed by AttachmentStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "context is the StepExecutionContext<TConfig> member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "handleInput",
            "signature": "handleInput?(context: StepExecutionContext<TConfig>, input: UserInput): Promise<StepResult>",
            "description": "handleInput is the optional method exposed by AttachmentStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "context is the StepExecutionContext<TConfig> member exposed by method.",
                "required": true
              },
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "Return value produced by this method."
            },
            "required": false
          }
        ],
        "fields": [
          "stepType",
          "validate",
          "enter",
          "handleInput"
        ],
        "properties": [
          {
            "name": "stepType",
            "type": "\"attachment\"",
            "description": "stepType is the \"attachment\" member exposed by AttachmentStepHandler.",
            "required": true
          }
        ],
        "related": [
          "StepDefinition",
          "AttachmentStepConfig",
          "UserInput",
          "StepExecutionContext",
          "StepResult",
          "StepHandler",
          "StepValidationContext",
          "ValidationIssue"
        ]
      },
      {
        "name": "ConditionStepHandler",
        "kind": "interface",
        "purpose": "ConditionStepHandler defines the extension contracts contract with stepType, validate, enter, handleInput.",
        "usage": "Use ConditionStepHandler when registering or describing handler behavior for extension contracts.",
        "signatures": [
          "export interface ConditionStepHandler extends StepHandler<ConditionStepConfig> {\n    readonly stepType: \"condition\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(step: StepDefinition, context: StepValidationContext): ValidationIssue[]",
            "description": "validate is the method exposed by ConditionStepHandler.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Active step definition.",
                "required": true
              },
              {
                "name": "context",
                "type": "StepValidationContext",
                "description": "context is the StepValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "ValidationIssue[]",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "enter",
            "signature": "enter(context: StepExecutionContext<TConfig>): Promise<StepResult>",
            "description": "enter is the method exposed by ConditionStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "context is the StepExecutionContext<TConfig> member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "handleInput",
            "signature": "handleInput?(context: StepExecutionContext<TConfig>, input: UserInput): Promise<StepResult>",
            "description": "handleInput is the optional method exposed by ConditionStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "context is the StepExecutionContext<TConfig> member exposed by method.",
                "required": true
              },
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "Return value produced by this method."
            },
            "required": false
          }
        ],
        "fields": [
          "stepType",
          "validate",
          "enter",
          "handleInput"
        ],
        "properties": [
          {
            "name": "stepType",
            "type": "\"condition\"",
            "description": "stepType is the \"condition\" member exposed by ConditionStepHandler.",
            "required": true
          }
        ],
        "related": [
          "StepDefinition",
          "ConditionStepConfig",
          "UserInput",
          "StepExecutionContext",
          "StepResult",
          "StepHandler",
          "StepValidationContext",
          "ValidationIssue"
        ]
      },
      {
        "name": "EndStepHandler",
        "kind": "interface",
        "purpose": "EndStepHandler defines the extension contracts contract with stepType, validate, enter, handleInput.",
        "usage": "Use EndStepHandler when registering or describing handler behavior for extension contracts.",
        "signatures": [
          "export interface EndStepHandler extends StepHandler<EndStepConfig> {\n    readonly stepType: \"end\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(step: StepDefinition, context: StepValidationContext): ValidationIssue[]",
            "description": "validate is the method exposed by EndStepHandler.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Active step definition.",
                "required": true
              },
              {
                "name": "context",
                "type": "StepValidationContext",
                "description": "context is the StepValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "ValidationIssue[]",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "enter",
            "signature": "enter(context: StepExecutionContext<TConfig>): Promise<StepResult>",
            "description": "enter is the method exposed by EndStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "context is the StepExecutionContext<TConfig> member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "handleInput",
            "signature": "handleInput?(context: StepExecutionContext<TConfig>, input: UserInput): Promise<StepResult>",
            "description": "handleInput is the optional method exposed by EndStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "context is the StepExecutionContext<TConfig> member exposed by method.",
                "required": true
              },
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "Return value produced by this method."
            },
            "required": false
          }
        ],
        "fields": [
          "stepType",
          "validate",
          "enter",
          "handleInput"
        ],
        "properties": [
          {
            "name": "stepType",
            "type": "\"end\"",
            "description": "stepType is the \"end\" member exposed by EndStepHandler.",
            "required": true
          }
        ],
        "related": [
          "StepDefinition",
          "EndStepConfig",
          "UserInput",
          "StepExecutionContext",
          "StepResult",
          "StepHandler",
          "StepValidationContext",
          "ValidationIssue"
        ]
      },
      {
        "name": "SendMessageOperationHandler",
        "kind": "interface",
        "purpose": "SendMessageOperationHandler defines the extension contracts contract with operationType, execute.",
        "usage": "Use SendMessageOperationHandler when registering or describing handler behavior for extension contracts.",
        "signatures": [
          "export interface SendMessageOperationHandler extends OperationHandler<SendMessageOperation> {\n    readonly operationType: \"send_message\";\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "execute is the method exposed by SendMessageOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "operation is the TOperation member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "context is the OperationExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "operationType",
          "execute"
        ],
        "properties": [
          {
            "name": "operationType",
            "type": "\"send_message\"",
            "description": "operationType is the \"send_message\" member exposed by SendMessageOperationHandler.",
            "required": true
          }
        ],
        "related": [
          "SendMessageOperation",
          "OperationExecutionContext",
          "OperationResult",
          "OperationHandler"
        ]
      },
      {
        "name": "SetVariableOperationHandler",
        "kind": "interface",
        "purpose": "SetVariableOperationHandler defines the extension contracts contract with operationType, execute.",
        "usage": "Use SetVariableOperationHandler when registering or describing handler behavior for extension contracts.",
        "signatures": [
          "export interface SetVariableOperationHandler extends OperationHandler<SetVariableOperation> {\n    readonly operationType: \"set_variable\";\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "execute is the method exposed by SetVariableOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "operation is the TOperation member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "context is the OperationExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "operationType",
          "execute"
        ],
        "properties": [
          {
            "name": "operationType",
            "type": "\"set_variable\"",
            "description": "operationType is the \"set_variable\" member exposed by SetVariableOperationHandler.",
            "required": true
          }
        ],
        "related": [
          "SetVariableOperation",
          "OperationExecutionContext",
          "OperationResult",
          "OperationHandler"
        ]
      },
      {
        "name": "UnsetVariableOperationHandler",
        "kind": "interface",
        "purpose": "UnsetVariableOperationHandler defines the extension contracts contract with operationType, execute.",
        "usage": "Use UnsetVariableOperationHandler when registering or describing handler behavior for extension contracts.",
        "signatures": [
          "export interface UnsetVariableOperationHandler extends OperationHandler<UnsetVariableOperation> {\n    readonly operationType: \"unset_variable\";\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "execute is the method exposed by UnsetVariableOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "operation is the TOperation member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "context is the OperationExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "operationType",
          "execute"
        ],
        "properties": [
          {
            "name": "operationType",
            "type": "\"unset_variable\"",
            "description": "operationType is the \"unset_variable\" member exposed by UnsetVariableOperationHandler.",
            "required": true
          }
        ],
        "related": [
          "UnsetVariableOperation",
          "OperationExecutionContext",
          "OperationResult",
          "OperationHandler"
        ]
      },
      {
        "name": "InvalidateVariableOperationHandler",
        "kind": "interface",
        "purpose": "InvalidateVariableOperationHandler defines the extension contracts contract with operationType, execute.",
        "usage": "Use InvalidateVariableOperationHandler when registering or describing handler behavior for extension contracts.",
        "signatures": [
          "export interface InvalidateVariableOperationHandler extends OperationHandler<InvalidateVariableOperation> {\n    readonly operationType: \"invalidate_variable\";\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "execute is the method exposed by InvalidateVariableOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "operation is the TOperation member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "context is the OperationExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "operationType",
          "execute"
        ],
        "properties": [
          {
            "name": "operationType",
            "type": "\"invalidate_variable\"",
            "description": "operationType is the \"invalidate_variable\" member exposed by InvalidateVariableOperationHandler.",
            "required": true
          }
        ],
        "related": [
          "InvalidateVariableOperation",
          "OperationExecutionContext",
          "OperationResult",
          "OperationHandler"
        ]
      },
      {
        "name": "RunActionOperationHandler",
        "kind": "interface",
        "purpose": "RunActionOperationHandler defines the extension contracts contract with operationType, execute.",
        "usage": "Use RunActionOperationHandler when registering or describing handler behavior for extension contracts.",
        "signatures": [
          "export interface RunActionOperationHandler extends OperationHandler<RunActionOperation> {\n    readonly operationType: \"run_action\";\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "execute is the method exposed by RunActionOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "operation is the TOperation member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "context is the OperationExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "operationType",
          "execute"
        ],
        "properties": [
          {
            "name": "operationType",
            "type": "\"run_action\"",
            "description": "operationType is the \"run_action\" member exposed by RunActionOperationHandler.",
            "required": true
          }
        ],
        "related": [
          "RunActionOperation",
          "OperationExecutionContext",
          "OperationResult",
          "OperationHandler"
        ]
      },
      {
        "name": "CallFlowOperationHandler",
        "kind": "interface",
        "purpose": "CallFlowOperationHandler defines the extension contracts contract with operationType, execute.",
        "usage": "Use CallFlowOperationHandler when registering or describing handler behavior for extension contracts.",
        "signatures": [
          "export interface CallFlowOperationHandler extends OperationHandler<CallFlowOperation> {\n    readonly operationType: \"call_flow\";\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "execute is the method exposed by CallFlowOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "operation is the TOperation member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "context is the OperationExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "operationType",
          "execute"
        ],
        "properties": [
          {
            "name": "operationType",
            "type": "\"call_flow\"",
            "description": "operationType is the \"call_flow\" member exposed by CallFlowOperationHandler.",
            "required": true
          }
        ],
        "related": [
          "CallFlowOperation",
          "OperationExecutionContext",
          "OperationResult",
          "OperationHandler"
        ]
      },
      {
        "name": "EmitEventOperationHandler",
        "kind": "interface",
        "purpose": "EmitEventOperationHandler defines the extension contracts contract with operationType, execute.",
        "usage": "Use EmitEventOperationHandler when registering or describing handler behavior for extension contracts.",
        "signatures": [
          "export interface EmitEventOperationHandler extends OperationHandler<EmitEventOperation> {\n    readonly operationType: \"emit_event\";\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "execute is the method exposed by EmitEventOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "operation is the TOperation member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "context is the OperationExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "operationType",
          "execute"
        ],
        "properties": [
          {
            "name": "operationType",
            "type": "\"emit_event\"",
            "description": "operationType is the \"emit_event\" member exposed by EmitEventOperationHandler.",
            "required": true
          }
        ],
        "related": [
          "EmitEventOperation",
          "OperationExecutionContext",
          "OperationResult",
          "OperationHandler"
        ]
      },
      {
        "name": "HandoffOperationHandler",
        "kind": "interface",
        "purpose": "HandoffOperationHandler defines the extension contracts contract with operationType, execute.",
        "usage": "Use HandoffOperationHandler when registering or describing handler behavior for extension contracts.",
        "signatures": [
          "export interface HandoffOperationHandler extends OperationHandler<HandoffOperation> {\n    readonly operationType: \"handoff\";\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "execute is the method exposed by HandoffOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "operation is the TOperation member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "context is the OperationExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "operationType",
          "execute"
        ],
        "properties": [
          {
            "name": "operationType",
            "type": "\"handoff\"",
            "description": "operationType is the \"handoff\" member exposed by HandoffOperationHandler.",
            "required": true
          }
        ],
        "related": [
          "HandoffOperation",
          "OperationExecutionContext",
          "OperationResult",
          "OperationHandler"
        ]
      },
      {
        "name": "CustomOperationHandler",
        "kind": "interface",
        "purpose": "CustomOperationHandler defines the extension contracts contract with operationType, customType, execute.",
        "usage": "Use CustomOperationHandler when registering or describing handler behavior for extension contracts.",
        "signatures": [
          "export interface CustomOperationHandler extends OperationHandler<CustomOperation> {\n    readonly operationType: \"custom\";\n    readonly customType: string;\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "execute is the method exposed by CustomOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "operation is the TOperation member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "context is the OperationExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "operationType",
          "customType",
          "execute"
        ],
        "properties": [
          {
            "name": "operationType",
            "type": "\"custom\"",
            "description": "operationType is the \"custom\" member exposed by CustomOperationHandler.",
            "required": true
          },
          {
            "name": "customType",
            "type": "string",
            "description": "customType is the string member exposed by CustomOperationHandler.",
            "required": true
          }
        ],
        "related": [
          "CustomOperation",
          "OperationExecutionContext",
          "OperationResult",
          "OperationHandler"
        ]
      },
      {
        "name": "Normalizer",
        "kind": "interface",
        "purpose": "Normalizer defines the extension contracts contract with normalizerType, normalize.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface Normalizer {\n    readonly normalizerType: string;\n    normalize(value: unknown, definition: NormalizerDefinition, context: NormalizationContext): Promise<unknown>;\n}"
        ],
        "methods": [
          {
            "name": "normalize",
            "signature": "normalize(value: unknown, definition: NormalizerDefinition, context: NormalizationContext): Promise<unknown>",
            "description": "normalize is the method exposed by Normalizer.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "value is the unknown member exposed by method.",
                "required": true
              },
              {
                "name": "definition",
                "type": "NormalizerDefinition",
                "description": "definition is the NormalizerDefinition member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "NormalizationContext",
                "description": "context is the NormalizationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<unknown>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "normalizerType",
          "normalize"
        ],
        "properties": [
          {
            "name": "normalizerType",
            "type": "string",
            "description": "normalizerType is the string member exposed by Normalizer.",
            "required": true
          }
        ],
        "related": [
          "NormalizerDefinition",
          "NormalizationContext"
        ]
      },
      {
        "name": "NormalizationContext",
        "kind": "interface",
        "purpose": "NormalizationContext defines the extension contracts contract with flow, step, state, turn, input.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface NormalizationContext {\n    flow: FlowVersion;\n    step: StepDefinition;\n    state: ConversationState;\n    turn: Turn;\n    input: UserInput;\n}"
        ],
        "fields": [
          "flow",
          "step",
          "state",
          "turn",
          "input"
        ],
        "properties": [
          {
            "name": "flow",
            "type": "FlowVersion",
            "description": "Flow or flow version being validated or executed.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "Active step definition.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Current turn metadata.",
            "required": true
          },
          {
            "name": "input",
            "type": "UserInput",
            "description": "input is the UserInput member exposed by NormalizationContext.",
            "required": true
          }
        ],
        "related": [
          "FlowVersion",
          "StepDefinition",
          "UserInput",
          "ConversationState",
          "Turn"
        ]
      },
      {
        "name": "NormalizerRegistry",
        "kind": "interface",
        "purpose": "NormalizerRegistry defines the extension contracts contract with register, getNormalizer, hasNormalizer.",
        "usage": "Use NormalizerRegistry when runtime services need to register, look up, or test support for extension implementations.",
        "signatures": [
          "export interface NormalizerRegistry {\n    register(normalizer: Normalizer): void;\n    getNormalizer(normalizerType: string): Normalizer;\n    hasNormalizer(normalizerType: string): boolean;\n}"
        ],
        "methods": [
          {
            "name": "register",
            "signature": "register(normalizer: Normalizer): void",
            "description": "Registers a provider, handler, resolver, validator, normalizer, or extractor.",
            "parameters": [
              {
                "name": "normalizer",
                "type": "Normalizer",
                "description": "normalizer is the Normalizer member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "void",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "getNormalizer",
            "signature": "getNormalizer(normalizerType: string): Normalizer",
            "description": "Reads normalizer from NormalizerRegistry.",
            "parameters": [
              {
                "name": "normalizerType",
                "type": "string",
                "description": "normalizerType is the string member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Normalizer",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "hasNormalizer",
            "signature": "hasNormalizer(normalizerType: string): boolean",
            "description": "Checks whether NormalizerRegistry has normalizer.",
            "parameters": [
              {
                "name": "normalizerType",
                "type": "string",
                "description": "normalizerType is the string member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "register",
          "getNormalizer",
          "hasNormalizer"
        ],
        "related": [
          "Normalizer"
        ]
      },
      {
        "name": "Extractor",
        "kind": "interface",
        "purpose": "Extractor defines the extension contracts contract with extractorType, extract.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface Extractor {\n    readonly extractorType: string;\n    extract(input: UserInput, definition: ExtractorDefinition, context: ExtractionContext): Promise<ExtractionResult>;\n}"
        ],
        "methods": [
          {
            "name": "extract",
            "signature": "extract(input: UserInput, definition: ExtractorDefinition, context: ExtractionContext): Promise<ExtractionResult>",
            "description": "extract is the method exposed by Extractor.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ExtractorDefinition",
                "description": "definition is the ExtractorDefinition member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ExtractionContext",
                "description": "context is the ExtractionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ExtractionResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "extractorType",
          "extract"
        ],
        "properties": [
          {
            "name": "extractorType",
            "type": "string",
            "description": "extractorType is the string member exposed by Extractor.",
            "required": true
          }
        ],
        "related": [
          "ExtractorDefinition",
          "UserInput",
          "ExtractionContext",
          "ExtractionResult"
        ]
      },
      {
        "name": "ExtractionContext",
        "kind": "interface",
        "purpose": "ExtractionContext defines the extension contracts contract with flow, step, state, turn.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface ExtractionContext {\n    flow: FlowVersion;\n    step: StepDefinition;\n    state: ConversationState;\n    turn: Turn;\n}"
        ],
        "fields": [
          "flow",
          "step",
          "state",
          "turn"
        ],
        "properties": [
          {
            "name": "flow",
            "type": "FlowVersion",
            "description": "Flow or flow version being validated or executed.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "Active step definition.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Current turn metadata.",
            "required": true
          }
        ],
        "related": [
          "FlowVersion",
          "StepDefinition",
          "ConversationState",
          "Turn"
        ]
      },
      {
        "name": "ExtractionResult",
        "kind": "interface",
        "purpose": "ExtractionResult defines the extension contracts contract with matched, value, values, confidence, metadata.",
        "usage": "Use ExtractionResult to inspect the structured outcome returned by the corresponding runtime, validation, or provider operation.",
        "signatures": [
          "export interface ExtractionResult {\n    matched: boolean;\n    value?: unknown;\n    values?: unknown[];\n    confidence?: number;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "matched",
          "value",
          "values",
          "confidence",
          "metadata"
        ],
        "properties": [
          {
            "name": "matched",
            "type": "boolean",
            "description": "matched is the boolean member exposed by ExtractionResult.",
            "required": true
          },
          {
            "name": "value",
            "type": "unknown",
            "description": "value is the optional unknown member exposed by ExtractionResult.",
            "required": false
          },
          {
            "name": "values",
            "type": "unknown[]",
            "description": "values is the optional unknown[] member exposed by ExtractionResult.",
            "required": false
          },
          {
            "name": "confidence",
            "type": "number",
            "description": "confidence is the optional number member exposed by ExtractionResult.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata"
        ]
      },
      {
        "name": "ExtractorRegistry",
        "kind": "interface",
        "purpose": "ExtractorRegistry defines the extension contracts contract with register, getExtractor, hasExtractor.",
        "usage": "Use ExtractorRegistry when runtime services need to register, look up, or test support for extension implementations.",
        "signatures": [
          "export interface ExtractorRegistry {\n    register(extractor: Extractor): void;\n    getExtractor(extractorType: string): Extractor;\n    hasExtractor(extractorType: string): boolean;\n}"
        ],
        "methods": [
          {
            "name": "register",
            "signature": "register(extractor: Extractor): void",
            "description": "Registers a provider, handler, resolver, validator, normalizer, or extractor.",
            "parameters": [
              {
                "name": "extractor",
                "type": "Extractor",
                "description": "extractor is the Extractor member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "void",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "getExtractor",
            "signature": "getExtractor(extractorType: string): Extractor",
            "description": "Reads extractor from ExtractorRegistry.",
            "parameters": [
              {
                "name": "extractorType",
                "type": "string",
                "description": "extractorType is the string member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Extractor",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "hasExtractor",
            "signature": "hasExtractor(extractorType: string): boolean",
            "description": "Checks whether ExtractorRegistry has extractor.",
            "parameters": [
              {
                "name": "extractorType",
                "type": "string",
                "description": "extractorType is the string member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "register",
          "getExtractor",
          "hasExtractor"
        ],
        "related": [
          "Extractor"
        ]
      },
      {
        "name": "TemplateRenderer",
        "kind": "interface",
        "purpose": "TemplateRenderer defines the extension contracts contract with render.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface TemplateRenderer {\n    render(template: string, context: ResponseRenderingContext): Promise<string>;\n}"
        ],
        "methods": [
          {
            "name": "render",
            "signature": "render(template: string, context: ResponseRenderingContext): Promise<string>",
            "description": "render is the method exposed by TemplateRenderer.",
            "parameters": [
              {
                "name": "template",
                "type": "string",
                "description": "template is the string member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ResponseRenderingContext",
                "description": "context is the ResponseRenderingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<string>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "render"
        ],
        "related": [
          "ResponseRenderingContext"
        ]
      },
      {
        "name": "StaticResponseRenderer",
        "kind": "interface",
        "purpose": "StaticResponseRenderer defines the extension contracts contract with render.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface StaticResponseRenderer {\n    render(plan: StaticResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>;\n}"
        ],
        "methods": [
          {
            "name": "render",
            "signature": "render(plan: StaticResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>",
            "description": "render is the method exposed by StaticResponseRenderer.",
            "parameters": [
              {
                "name": "plan",
                "type": "StaticResponsePlan",
                "description": "plan is the StaticResponsePlan member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ResponseRenderingContext",
                "description": "context is the ResponseRenderingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OutboundMessage[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "render"
        ],
        "related": [
          "StaticResponsePlan",
          "OutboundMessage",
          "ResponseRenderingContext"
        ]
      },
      {
        "name": "TemplateResponseRenderer",
        "kind": "interface",
        "purpose": "TemplateResponseRenderer defines the extension contracts contract with render.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface TemplateResponseRenderer {\n    render(plan: TemplateResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>;\n}"
        ],
        "methods": [
          {
            "name": "render",
            "signature": "render(plan: TemplateResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>",
            "description": "render is the method exposed by TemplateResponseRenderer.",
            "parameters": [
              {
                "name": "plan",
                "type": "TemplateResponsePlan",
                "description": "plan is the TemplateResponsePlan member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ResponseRenderingContext",
                "description": "context is the ResponseRenderingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OutboundMessage[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "render"
        ],
        "related": [
          "TemplateResponsePlan",
          "OutboundMessage",
          "ResponseRenderingContext"
        ]
      },
      {
        "name": "GeneratedResponseRenderer",
        "kind": "interface",
        "purpose": "GeneratedResponseRenderer defines the extension contracts contract with render.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface GeneratedResponseRenderer {\n    render(plan: GeneratedResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>;\n}"
        ],
        "methods": [
          {
            "name": "render",
            "signature": "render(plan: GeneratedResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>",
            "description": "render is the method exposed by GeneratedResponseRenderer.",
            "parameters": [
              {
                "name": "plan",
                "type": "GeneratedResponsePlan",
                "description": "plan is the GeneratedResponsePlan member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ResponseRenderingContext",
                "description": "context is the ResponseRenderingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OutboundMessage[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "render"
        ],
        "related": [
          "GeneratedResponsePlan",
          "OutboundMessage",
          "ResponseRenderingContext"
        ]
      },
      {
        "name": "ResponseReferenceResolver",
        "kind": "interface",
        "purpose": "ResponseReferenceResolver defines the extension contracts contract with resolve.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface ResponseReferenceResolver {\n    resolve(responseId: ResponseId, context: ResponseRenderingContext): Promise<ResponseDefinition | undefined>;\n}"
        ],
        "methods": [
          {
            "name": "resolve",
            "signature": "resolve(responseId: ResponseId, context: ResponseRenderingContext): Promise<ResponseDefinition | undefined>",
            "description": "resolve is the method exposed by ResponseReferenceResolver.",
            "parameters": [
              {
                "name": "responseId",
                "type": "ResponseId",
                "description": "Reusable response identifier associated with the message.",
                "required": true
              },
              {
                "name": "context",
                "type": "ResponseRenderingContext",
                "description": "context is the ResponseRenderingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ResponseDefinition | undefined>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "resolve"
        ],
        "related": [
          "ResponseId",
          "ResponseDefinition",
          "ResponseRenderingContext"
        ]
      },
      {
        "name": "ActionInputMapper",
        "kind": "interface",
        "purpose": "ActionInputMapper defines the extension contracts contract with mapInput.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface ActionInputMapper {\n    mapInput(operation: RunActionOperation, context: OperationExecutionContext): Promise<Record<string, unknown>>;\n}"
        ],
        "methods": [
          {
            "name": "mapInput",
            "signature": "mapInput(operation: RunActionOperation, context: OperationExecutionContext): Promise<Record<string, unknown>>",
            "description": "mapInput is the method exposed by ActionInputMapper.",
            "parameters": [
              {
                "name": "operation",
                "type": "RunActionOperation",
                "description": "operation is the RunActionOperation member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "context is the OperationExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<Record<string, unknown>>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "mapInput"
        ],
        "related": [
          "RunActionOperation",
          "OperationExecutionContext"
        ]
      },
      {
        "name": "ActionOutputMapper",
        "kind": "interface",
        "purpose": "ActionOutputMapper defines the extension contracts contract with mapOutput.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface ActionOutputMapper {\n    mapOutput(operation: RunActionOperation, result: ActionResult, context: OperationExecutionContext): Promise<VariablePatch[]>;\n}"
        ],
        "methods": [
          {
            "name": "mapOutput",
            "signature": "mapOutput(operation: RunActionOperation, result: ActionResult, context: OperationExecutionContext): Promise<VariablePatch[]>",
            "description": "mapOutput is the method exposed by ActionOutputMapper.",
            "parameters": [
              {
                "name": "operation",
                "type": "RunActionOperation",
                "description": "operation is the RunActionOperation member exposed by method.",
                "required": true
              },
              {
                "name": "result",
                "type": "ActionResult",
                "description": "result is the ActionResult member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "context is the OperationExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<VariablePatch[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "mapOutput"
        ],
        "related": [
          "VariablePatch",
          "ActionResult",
          "RunActionOperation",
          "OperationExecutionContext"
        ]
      },
      {
        "name": "ActionResultRouter",
        "kind": "interface",
        "purpose": "ActionResultRouter defines the extension contracts contract with resolveBranch.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface ActionResultRouter {\n    resolveBranch(operation: RunActionOperation, result: ActionResult, context: OperationExecutionContext): Promise<StepBranch | undefined>;\n}"
        ],
        "methods": [
          {
            "name": "resolveBranch",
            "signature": "resolveBranch(operation: RunActionOperation, result: ActionResult, context: OperationExecutionContext): Promise<StepBranch | undefined>",
            "description": "resolveBranch is the method exposed by ActionResultRouter.",
            "parameters": [
              {
                "name": "operation",
                "type": "RunActionOperation",
                "description": "operation is the RunActionOperation member exposed by method.",
                "required": true
              },
              {
                "name": "result",
                "type": "ActionResult",
                "description": "result is the ActionResult member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "context is the OperationExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepBranch | undefined>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "resolveBranch"
        ],
        "related": [
          "ActionResult",
          "StepBranch",
          "RunActionOperation",
          "OperationExecutionContext"
        ]
      },
      {
        "name": "EventFactory",
        "kind": "interface",
        "purpose": "EventFactory defines the extension contracts contract with createEvent.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface EventFactory {\n    createEvent(request: CreateEventRequest): ConversationEvent;\n}"
        ],
        "methods": [
          {
            "name": "createEvent",
            "signature": "createEvent(request: CreateEventRequest): ConversationEvent",
            "description": "Creates event from EventFactory.",
            "parameters": [
              {
                "name": "request",
                "type": "CreateEventRequest",
                "description": "request is the CreateEventRequest member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "ConversationEvent",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "createEvent"
        ],
        "related": [
          "ConversationEvent",
          "CreateEventRequest",
          "createEvent"
        ]
      },
      {
        "name": "CreateEventRequest",
        "kind": "interface",
        "purpose": "CreateEventRequest defines the extension contracts contract with conversationId, turnId, flowVersionId, stepId, type, payload.",
        "usage": "Use CreateEventRequest as the request object accepted by the corresponding engine, API, factory, or helper call.",
        "signatures": [
          "export interface CreateEventRequest {\n    conversationId: ConversationId;\n    turnId?: TurnId;\n    flowVersionId: FlowVersionId;\n    stepId?: StepId;\n    type: ConversationEventType;\n    payload?: Metadata;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "conversationId",
          "turnId",
          "flowVersionId",
          "stepId",
          "type",
          "payload",
          "metadata"
        ],
        "properties": [
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": false
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "flowVersionId is the string member exposed by CreateEventRequest.",
            "required": true
          },
          {
            "name": "stepId",
            "type": "string",
            "description": "stepId is the optional string member exposed by CreateEventRequest.",
            "required": false
          },
          {
            "name": "type",
            "type": "string",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "payload",
            "type": "Metadata",
            "description": "Application payload attached to an event, input, or custom message.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "FlowVersionId",
          "StepId",
          "ConversationId",
          "TurnId",
          "Metadata",
          "ConversationEventType"
        ]
      },
      {
        "name": "MessageFactory",
        "kind": "interface",
        "purpose": "MessageFactory defines the extension contracts contract with createTextMessage, createRichMessage, createCustomPayloadMessage.",
        "usage": "Use this contract when plugging custom behavior into runtime services without changing the engine core.",
        "signatures": [
          "export interface MessageFactory {\n    createTextMessage(request: CreateTextMessageRequest): OutboundMessage;\n    createRichMessage(request: CreateRichMessageRequest): OutboundMessage;\n    createCustomPayloadMessage(request: CreateCustomPayloadMessageRequest): OutboundMessage;\n}"
        ],
        "methods": [
          {
            "name": "createTextMessage",
            "signature": "createTextMessage(request: CreateTextMessageRequest): OutboundMessage",
            "description": "Creates text message from MessageFactory.",
            "parameters": [
              {
                "name": "request",
                "type": "CreateTextMessageRequest",
                "description": "request is the CreateTextMessageRequest member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "OutboundMessage",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "createRichMessage",
            "signature": "createRichMessage(request: CreateRichMessageRequest): OutboundMessage",
            "description": "Creates rich message from MessageFactory.",
            "parameters": [
              {
                "name": "request",
                "type": "CreateRichMessageRequest",
                "description": "request is the CreateRichMessageRequest member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "OutboundMessage",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "createCustomPayloadMessage",
            "signature": "createCustomPayloadMessage(request: CreateCustomPayloadMessageRequest): OutboundMessage",
            "description": "Creates custom payload message from MessageFactory.",
            "parameters": [
              {
                "name": "request",
                "type": "CreateCustomPayloadMessageRequest",
                "description": "request is the CreateCustomPayloadMessageRequest member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "OutboundMessage",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "createTextMessage",
          "createRichMessage",
          "createCustomPayloadMessage"
        ],
        "related": [
          "OutboundMessage",
          "CreateTextMessageRequest",
          "CreateRichMessageRequest",
          "CreateCustomPayloadMessageRequest",
          "createTextMessage"
        ]
      },
      {
        "name": "CreateTextMessageRequest",
        "kind": "interface",
        "purpose": "Request passed to createTextMessage or MessageFactory.createTextMessage when constructing an OutboundMessage with text content.",
        "usage": "Use it in custom step handlers and tests when you need Dialit-compatible message ids, turn ids, response ids, channels, and metadata.",
        "signatures": [
          "export interface CreateTextMessageRequest {\n    conversationId: ConversationId;\n    turnId: TurnId;\n    text: string;\n    channel?: string;\n    responseId?: ResponseId;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "conversationId",
          "turnId",
          "text",
          "channel",
          "responseId",
          "metadata"
        ],
        "properties": [
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": true
          },
          {
            "name": "text",
            "type": "string",
            "description": "Text content sent by a user or returned to a user.",
            "required": true
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          },
          {
            "name": "responseId",
            "type": "string",
            "description": "Reusable response identifier associated with the message.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "ResponseId",
          "ConversationId",
          "TurnId",
          "Metadata"
        ]
      },
      {
        "name": "CreateRichMessageRequest",
        "kind": "interface",
        "purpose": "CreateRichMessageRequest defines the extension contracts contract with conversationId, turnId, content, channel, responseId, metadata.",
        "usage": "Use CreateRichMessageRequest as the request object accepted by the corresponding engine, API, factory, or helper call.",
        "signatures": [
          "export interface CreateRichMessageRequest {\n    conversationId: ConversationId;\n    turnId: TurnId;\n    content: Omit<RichOutboundContent, \"type\">;\n    channel?: string;\n    responseId?: ResponseId;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "conversationId",
          "turnId",
          "content",
          "channel",
          "responseId",
          "metadata"
        ],
        "properties": [
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": true
          },
          {
            "name": "content",
            "type": "Omit<RichOutboundContent, \"type\">",
            "description": "content is the Omit<RichOutboundContent, \"type\"> member exposed by CreateRichMessageRequest.",
            "required": true
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          },
          {
            "name": "responseId",
            "type": "string",
            "description": "Reusable response identifier associated with the message.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "ResponseId",
          "ConversationId",
          "TurnId",
          "Metadata",
          "RichOutboundContent"
        ]
      },
      {
        "name": "CreateCustomPayloadMessageRequest",
        "kind": "interface",
        "purpose": "CreateCustomPayloadMessageRequest defines the extension contracts contract with conversationId, turnId, payload, channel, responseId, metadata.",
        "usage": "Use CreateCustomPayloadMessageRequest as the request object accepted by the corresponding engine, API, factory, or helper call.",
        "signatures": [
          "export interface CreateCustomPayloadMessageRequest {\n    conversationId: ConversationId;\n    turnId: TurnId;\n    payload: JsonObject;\n    channel?: string;\n    responseId?: ResponseId;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "conversationId",
          "turnId",
          "payload",
          "channel",
          "responseId",
          "metadata"
        ],
        "properties": [
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": true
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Application payload attached to an event, input, or custom message.",
            "required": true
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          },
          {
            "name": "responseId",
            "type": "string",
            "description": "Reusable response identifier associated with the message.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "ResponseId",
          "ConversationId",
          "TurnId",
          "JsonObject",
          "Metadata"
        ]
      }
    ]
  },
  {
    "title": "Validation and Inspection",
    "summary": "Flow validation, model validation, flow inspection, and validation report contracts.",
    "exports": [
      "FlowValidator",
      "FlowValidationOptions",
      "ModelValidator",
      "ModelValidationContext",
      "ModelValidationReport",
      "FlowInspector",
      "FlowVersionFactory",
      "CreateFlowVersionRequest",
      "FlowValidationReport",
      "StepValidationReport",
      "OperationValidationReport"
    ],
    "entries": [
      {
        "name": "FlowValidator",
        "kind": "interface",
        "purpose": "FlowValidator defines the validation and inspection contract with validate.",
        "usage": "Use this contract when validating flows before publish or building authoring tools around flow definitions.",
        "signatures": [
          "export interface FlowValidator {\n    validate(flow: ConversationFlowDefinition, options?: FlowValidationOptions): ValidationIssue[];\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(flow: ConversationFlowDefinition, options?: FlowValidationOptions): ValidationIssue[]",
            "description": "validate is the method exposed by FlowValidator.",
            "parameters": [
              {
                "name": "flow",
                "type": "ConversationFlowDefinition",
                "description": "Flow or flow version being validated or executed.",
                "required": true
              },
              {
                "name": "options",
                "type": "FlowValidationOptions",
                "description": "Configuration object interpreted by the registered normalizer, extractor, or validator.",
                "required": false
              }
            ],
            "returns": {
              "type": "ValidationIssue[]",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "validate"
        ],
        "related": [
          "ConversationFlowDefinition",
          "ValidationIssue",
          "FlowValidationOptions"
        ]
      },
      {
        "name": "FlowValidationOptions",
        "kind": "interface",
        "purpose": "Validation-time registry hints for custom step, operation, normalizer, extractor, validator, and custom operation types.",
        "usage": "Pass it to validateFlowDefinition when a flow references extension types that are valid in your application but not built into Dialit.",
        "signatures": [
          "export interface FlowValidationOptions {\n    registeredStepTypes?: readonly string[];\n    registeredOperationTypes?: readonly string[];\n    registeredCustomOperationTypes?: readonly string[];\n    registeredNormalizerTypes?: readonly string[];\n    registeredExtractorTypes?: readonly string[];\n    registeredValidatorTypes?: readonly string[];\n}"
        ],
        "fields": [
          "registeredStepTypes",
          "registeredOperationTypes",
          "registeredCustomOperationTypes",
          "registeredNormalizerTypes",
          "registeredExtractorTypes",
          "registeredValidatorTypes"
        ],
        "properties": [
          {
            "name": "registeredStepTypes",
            "type": "readonly string[]",
            "description": "registeredStepTypes is the optional readonly string[] member exposed by FlowValidationOptions.",
            "required": false
          },
          {
            "name": "registeredOperationTypes",
            "type": "readonly string[]",
            "description": "registeredOperationTypes is the optional readonly string[] member exposed by FlowValidationOptions.",
            "required": false
          },
          {
            "name": "registeredCustomOperationTypes",
            "type": "readonly string[]",
            "description": "registeredCustomOperationTypes is the optional readonly string[] member exposed by FlowValidationOptions.",
            "required": false
          },
          {
            "name": "registeredNormalizerTypes",
            "type": "readonly string[]",
            "description": "registeredNormalizerTypes is the optional readonly string[] member exposed by FlowValidationOptions.",
            "required": false
          },
          {
            "name": "registeredExtractorTypes",
            "type": "readonly string[]",
            "description": "registeredExtractorTypes is the optional readonly string[] member exposed by FlowValidationOptions.",
            "required": false
          },
          {
            "name": "registeredValidatorTypes",
            "type": "readonly string[]",
            "description": "registeredValidatorTypes is the optional readonly string[] member exposed by FlowValidationOptions.",
            "required": false
          }
        ],
        "related": []
      },
      {
        "name": "ModelValidator",
        "kind": "interface",
        "purpose": "ModelValidator defines the validation and inspection contract with validateFlowVersion.",
        "usage": "Use this contract when validating flows before publish or building authoring tools around flow definitions.",
        "signatures": [
          "export interface ModelValidator {\n    validateFlowVersion(flowVersion: FlowVersion, context: ModelValidationContext): ModelValidationReport;\n}"
        ],
        "methods": [
          {
            "name": "validateFlowVersion",
            "signature": "validateFlowVersion(flowVersion: FlowVersion, context: ModelValidationContext): ModelValidationReport",
            "description": "validateFlowVersion is the method exposed by ModelValidator.",
            "parameters": [
              {
                "name": "flowVersion",
                "type": "FlowVersion",
                "description": "flowVersion is the FlowVersion member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ModelValidationContext",
                "description": "context is the ModelValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "ModelValidationReport",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "validateFlowVersion"
        ],
        "related": [
          "FlowVersion",
          "ModelValidationContext",
          "ModelValidationReport"
        ]
      },
      {
        "name": "ModelValidationContext",
        "kind": "interface",
        "purpose": "ModelValidationContext defines the validation and inspection contract with registeredStepTypes, registeredOperationTypes, registeredActionKinds, registeredCustomOperationTypes.",
        "usage": "Use this contract when validating flows before publish or building authoring tools around flow definitions.",
        "signatures": [
          "export interface ModelValidationContext {\n    registeredStepTypes: readonly StepType[];\n    registeredOperationTypes: readonly string[];\n    registeredActionKinds?: readonly ActionKind[];\n    registeredCustomOperationTypes?: readonly string[];\n}"
        ],
        "fields": [
          "registeredStepTypes",
          "registeredOperationTypes",
          "registeredActionKinds",
          "registeredCustomOperationTypes"
        ],
        "properties": [
          {
            "name": "registeredStepTypes",
            "type": "readonly string[]",
            "description": "registeredStepTypes is the readonly string[] member exposed by ModelValidationContext.",
            "required": true
          },
          {
            "name": "registeredOperationTypes",
            "type": "readonly string[]",
            "description": "registeredOperationTypes is the readonly string[] member exposed by ModelValidationContext.",
            "required": true
          },
          {
            "name": "registeredActionKinds",
            "type": "readonly string[]",
            "description": "registeredActionKinds is the optional readonly string[] member exposed by ModelValidationContext.",
            "required": false
          },
          {
            "name": "registeredCustomOperationTypes",
            "type": "readonly string[]",
            "description": "registeredCustomOperationTypes is the optional readonly string[] member exposed by ModelValidationContext.",
            "required": false
          }
        ],
        "related": [
          "ActionKind",
          "StepType"
        ]
      },
      {
        "name": "ModelValidationReport",
        "kind": "interface",
        "purpose": "ModelValidationReport defines the validation and inspection contract with valid, errors, warnings.",
        "usage": "Use ModelValidationReport to inspect the structured outcome returned by the corresponding runtime, validation, or provider operation.",
        "signatures": [
          "export interface ModelValidationReport {\n    valid: boolean;\n    errors: ValidationIssue[];\n    warnings: ValidationIssue[];\n}"
        ],
        "fields": [
          "valid",
          "errors",
          "warnings"
        ],
        "properties": [
          {
            "name": "valid",
            "type": "boolean",
            "description": "Whether validation or model checking succeeded.",
            "required": true
          },
          {
            "name": "errors",
            "type": "ValidationIssue[]",
            "description": "errors is the ValidationIssue[] member exposed by ModelValidationReport.",
            "required": true
          },
          {
            "name": "warnings",
            "type": "ValidationIssue[]",
            "description": "warnings is the ValidationIssue[] member exposed by ModelValidationReport.",
            "required": true
          }
        ],
        "related": [
          "ValidationIssue"
        ]
      },
      {
        "name": "FlowInspector",
        "kind": "interface",
        "purpose": "FlowInspector defines the validation and inspection contract with getStep, getVariable, getAction, getResponse, listReachableSteps.",
        "usage": "Use this contract when validating flows before publish or building authoring tools around flow definitions.",
        "signatures": [
          "export interface FlowInspector {\n    getStep(flow: ConversationFlowDefinition, stepId: StepId): StepDefinition | undefined;\n    getVariable(flow: ConversationFlowDefinition, variableId: VariableId): VariableDefinition | undefined;\n    getAction(flow: ConversationFlowDefinition, actionId: ActionId): ActionDefinition | undefined;\n    getResponse(flow: ConversationFlowDefinition, responseId: ResponseId): ResponseDefinition | undefined;\n    listReachableSteps(flow: ConversationFlowDefinition): StepId[];\n}"
        ],
        "methods": [
          {
            "name": "getStep",
            "signature": "getStep(flow: ConversationFlowDefinition, stepId: StepId): StepDefinition | undefined",
            "description": "Reads step from FlowInspector.",
            "parameters": [
              {
                "name": "flow",
                "type": "ConversationFlowDefinition",
                "description": "Flow or flow version being validated or executed.",
                "required": true
              },
              {
                "name": "stepId",
                "type": "StepId",
                "description": "stepId is the StepId member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "StepDefinition | undefined",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "getVariable",
            "signature": "getVariable(flow: ConversationFlowDefinition, variableId: VariableId): VariableDefinition | undefined",
            "description": "Reads variable from FlowInspector.",
            "parameters": [
              {
                "name": "flow",
                "type": "ConversationFlowDefinition",
                "description": "Flow or flow version being validated or executed.",
                "required": true
              },
              {
                "name": "variableId",
                "type": "VariableId",
                "description": "Variable identifier read, written, validated, or traced.",
                "required": true
              }
            ],
            "returns": {
              "type": "VariableDefinition | undefined",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "getAction",
            "signature": "getAction(flow: ConversationFlowDefinition, actionId: ActionId): ActionDefinition | undefined",
            "description": "Reads action from FlowInspector.",
            "parameters": [
              {
                "name": "flow",
                "type": "ConversationFlowDefinition",
                "description": "Flow or flow version being validated or executed.",
                "required": true
              },
              {
                "name": "actionId",
                "type": "ActionId",
                "description": "actionId is the ActionId member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "ActionDefinition | undefined",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "getResponse",
            "signature": "getResponse(flow: ConversationFlowDefinition, responseId: ResponseId): ResponseDefinition | undefined",
            "description": "Reads response from FlowInspector.",
            "parameters": [
              {
                "name": "flow",
                "type": "ConversationFlowDefinition",
                "description": "Flow or flow version being validated or executed.",
                "required": true
              },
              {
                "name": "responseId",
                "type": "ResponseId",
                "description": "Reusable response identifier associated with the message.",
                "required": true
              }
            ],
            "returns": {
              "type": "ResponseDefinition | undefined",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "listReachableSteps",
            "signature": "listReachableSteps(flow: ConversationFlowDefinition): StepId[]",
            "description": "listReachableSteps is the method exposed by FlowInspector.",
            "parameters": [
              {
                "name": "flow",
                "type": "ConversationFlowDefinition",
                "description": "Flow or flow version being validated or executed.",
                "required": true
              }
            ],
            "returns": {
              "type": "StepId[]",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "getStep",
          "getVariable",
          "getAction",
          "getResponse",
          "listReachableSteps"
        ],
        "related": [
          "StepId",
          "VariableId",
          "ActionId",
          "ResponseId",
          "ConversationFlowDefinition",
          "VariableDefinition",
          "ResponseDefinition",
          "ActionDefinition",
          "StepDefinition",
          "getVariable"
        ]
      },
      {
        "name": "FlowVersionFactory",
        "kind": "interface",
        "purpose": "FlowVersionFactory defines the validation and inspection contract with createVersion.",
        "usage": "Use this contract when validating flows before publish or building authoring tools around flow definitions.",
        "signatures": [
          "export interface FlowVersionFactory {\n    createVersion(request: CreateFlowVersionRequest): Promise<FlowVersion>;\n}"
        ],
        "methods": [
          {
            "name": "createVersion",
            "signature": "createVersion(request: CreateFlowVersionRequest): Promise<FlowVersion>",
            "description": "Creates version from FlowVersionFactory.",
            "parameters": [
              {
                "name": "request",
                "type": "CreateFlowVersionRequest",
                "description": "request is the CreateFlowVersionRequest member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<FlowVersion>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "createVersion"
        ],
        "related": [
          "FlowVersion",
          "CreateFlowVersionRequest"
        ]
      },
      {
        "name": "CreateFlowVersionRequest",
        "kind": "interface",
        "purpose": "CreateFlowVersionRequest defines the validation and inspection contract with flow, version, schemaVersion, createdBy.",
        "usage": "Use CreateFlowVersionRequest as the request object accepted by the corresponding engine, API, factory, or helper call.",
        "signatures": [
          "export interface CreateFlowVersionRequest {\n    flow: ConversationFlowDefinition;\n    version: string;\n    schemaVersion: string;\n    createdBy?: string;\n}"
        ],
        "fields": [
          "flow",
          "version",
          "schemaVersion",
          "createdBy"
        ],
        "properties": [
          {
            "name": "flow",
            "type": "ConversationFlowDefinition",
            "description": "Flow or flow version being validated or executed.",
            "required": true
          },
          {
            "name": "version",
            "type": "string",
            "description": "version is the string member exposed by CreateFlowVersionRequest.",
            "required": true
          },
          {
            "name": "schemaVersion",
            "type": "string",
            "description": "schemaVersion is the string member exposed by CreateFlowVersionRequest.",
            "required": true
          },
          {
            "name": "createdBy",
            "type": "string",
            "description": "Creates d by from CreateFlowVersionRequest.",
            "required": false
          }
        ],
        "related": [
          "ConversationFlowDefinition"
        ]
      },
      {
        "name": "FlowValidationReport",
        "kind": "interface",
        "purpose": "FlowValidationReport defines the validation and inspection contract with valid, issues.",
        "usage": "Use FlowValidationReport to inspect the structured outcome returned by the corresponding runtime, validation, or provider operation.",
        "signatures": [
          "export interface FlowValidationReport {\n    valid: boolean;\n    issues: ValidationIssue[];\n}"
        ],
        "fields": [
          "valid",
          "issues"
        ],
        "properties": [
          {
            "name": "valid",
            "type": "boolean",
            "description": "Whether validation or model checking succeeded.",
            "required": true
          },
          {
            "name": "issues",
            "type": "ValidationIssue[]",
            "description": "issues is the ValidationIssue[] member exposed by FlowValidationReport.",
            "required": true
          }
        ],
        "related": [
          "ValidationIssue"
        ]
      },
      {
        "name": "StepValidationReport",
        "kind": "interface",
        "purpose": "StepValidationReport defines the validation and inspection contract with stepId, valid, issues.",
        "usage": "Use StepValidationReport to inspect the structured outcome returned by the corresponding runtime, validation, or provider operation.",
        "signatures": [
          "export interface StepValidationReport {\n    stepId: StepId;\n    valid: boolean;\n    issues: ValidationIssue[];\n}"
        ],
        "fields": [
          "stepId",
          "valid",
          "issues"
        ],
        "properties": [
          {
            "name": "stepId",
            "type": "string",
            "description": "stepId is the string member exposed by StepValidationReport.",
            "required": true
          },
          {
            "name": "valid",
            "type": "boolean",
            "description": "Whether validation or model checking succeeded.",
            "required": true
          },
          {
            "name": "issues",
            "type": "ValidationIssue[]",
            "description": "issues is the ValidationIssue[] member exposed by StepValidationReport.",
            "required": true
          }
        ],
        "related": [
          "StepId",
          "ValidationIssue"
        ]
      },
      {
        "name": "OperationValidationReport",
        "kind": "interface",
        "purpose": "OperationValidationReport defines the validation and inspection contract with operationId, valid, issues.",
        "usage": "Use OperationValidationReport to inspect the structured outcome returned by the corresponding runtime, validation, or provider operation.",
        "signatures": [
          "export interface OperationValidationReport {\n    operationId?: OperationId;\n    valid: boolean;\n    issues: ValidationIssue[];\n}"
        ],
        "fields": [
          "operationId",
          "valid",
          "issues"
        ],
        "properties": [
          {
            "name": "operationId",
            "type": "string",
            "description": "operationId is the optional string member exposed by OperationValidationReport.",
            "required": false
          },
          {
            "name": "valid",
            "type": "boolean",
            "description": "Whether validation or model checking succeeded.",
            "required": true
          },
          {
            "name": "issues",
            "type": "ValidationIssue[]",
            "description": "issues is the ValidationIssue[] member exposed by OperationValidationReport.",
            "required": true
          }
        ],
        "related": [
          "OperationId",
          "ValidationIssue"
        ]
      }
    ]
  },
  {
    "title": "Persistence",
    "summary": "Repository interfaces for durable application storage.",
    "exports": [
      "FlowVersionRepository",
      "ConversationRepository",
      "ConversationStateRepository",
      "ConversationEventRepository",
      "DecisionTraceRepository"
    ],
    "entries": [
      {
        "name": "FlowVersionRepository",
        "kind": "interface",
        "purpose": "FlowVersionRepository defines the persistence contract with getById, save.",
        "usage": "Use FlowVersionRepository when your application persists the related runtime record outside the engine.",
        "signatures": [
          "export interface FlowVersionRepository {\n    getById(flowVersionId: FlowVersionId): Promise<FlowVersion | undefined>;\n    save(version: FlowVersion): Promise<void>;\n}"
        ],
        "methods": [
          {
            "name": "getById",
            "signature": "getById(flowVersionId: FlowVersionId): Promise<FlowVersion | undefined>",
            "description": "Loads a record by id.",
            "parameters": [
              {
                "name": "flowVersionId",
                "type": "FlowVersionId",
                "description": "flowVersionId is the FlowVersionId member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<FlowVersion | undefined>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "save",
            "signature": "save(version: FlowVersion): Promise<void>",
            "description": "Persists a record.",
            "parameters": [
              {
                "name": "version",
                "type": "FlowVersion",
                "description": "version is the FlowVersion member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "getById",
          "save"
        ],
        "related": [
          "FlowVersionId",
          "FlowVersion"
        ]
      },
      {
        "name": "ConversationRepository",
        "kind": "interface",
        "purpose": "ConversationRepository defines the persistence contract with getById, save.",
        "usage": "Use ConversationRepository when your application persists the related runtime record outside the engine.",
        "signatures": [
          "export interface ConversationRepository {\n    getById(conversationId: ConversationId): Promise<Conversation | undefined>;\n    save(conversation: Conversation): Promise<void>;\n}"
        ],
        "methods": [
          {
            "name": "getById",
            "signature": "getById(conversationId: ConversationId): Promise<Conversation | undefined>",
            "description": "Loads a record by id.",
            "parameters": [
              {
                "name": "conversationId",
                "type": "ConversationId",
                "description": "Conversation identifier.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<Conversation | undefined>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "save",
            "signature": "save(conversation: Conversation): Promise<void>",
            "description": "Persists a record.",
            "parameters": [
              {
                "name": "conversation",
                "type": "Conversation",
                "description": "conversation is the Conversation member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "getById",
          "save"
        ],
        "related": [
          "ConversationId",
          "Conversation"
        ]
      },
      {
        "name": "ConversationStateRepository",
        "kind": "interface",
        "purpose": "ConversationStateRepository defines the persistence contract with getByConversationId, save.",
        "usage": "Use ConversationStateRepository when your application persists the related runtime record outside the engine.",
        "signatures": [
          "export interface ConversationStateRepository {\n    getByConversationId(conversationId: ConversationId): Promise<ConversationState | undefined>;\n    save(state: ConversationState): Promise<void>;\n}"
        ],
        "methods": [
          {
            "name": "getByConversationId",
            "signature": "getByConversationId(conversationId: ConversationId): Promise<ConversationState | undefined>",
            "description": "Reads by conversation id from ConversationStateRepository.",
            "parameters": [
              {
                "name": "conversationId",
                "type": "ConversationId",
                "description": "Conversation identifier.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationState | undefined>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "save",
            "signature": "save(state: ConversationState): Promise<void>",
            "description": "Persists a record.",
            "parameters": [
              {
                "name": "state",
                "type": "ConversationState",
                "description": "Current conversation state.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "getByConversationId",
          "save"
        ],
        "related": [
          "ConversationId",
          "ConversationState"
        ]
      },
      {
        "name": "ConversationEventRepository",
        "kind": "interface",
        "purpose": "ConversationEventRepository defines the persistence contract with append, listByConversationId.",
        "usage": "Use ConversationEventRepository when your application persists the related runtime record outside the engine.",
        "signatures": [
          "export interface ConversationEventRepository {\n    append(events: ConversationEvent[]): Promise<void>;\n    listByConversationId(conversationId: ConversationId): Promise<ConversationEvent[]>;\n}"
        ],
        "methods": [
          {
            "name": "append",
            "signature": "append(events: ConversationEvent[]): Promise<void>",
            "description": "append is the method exposed by ConversationEventRepository.",
            "parameters": [
              {
                "name": "events",
                "type": "ConversationEvent[]",
                "description": "Runtime events emitted during execution.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "listByConversationId",
            "signature": "listByConversationId(conversationId: ConversationId): Promise<ConversationEvent[]>",
            "description": "Lists stored records for one conversation id.",
            "parameters": [
              {
                "name": "conversationId",
                "type": "ConversationId",
                "description": "Conversation identifier.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationEvent[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "append",
          "listByConversationId"
        ],
        "related": [
          "ConversationId",
          "ConversationEvent"
        ]
      },
      {
        "name": "DecisionTraceRepository",
        "kind": "interface",
        "purpose": "DecisionTraceRepository defines the persistence contract with save, listByConversationId.",
        "usage": "Use DecisionTraceRepository when your application persists the related runtime record outside the engine.",
        "signatures": [
          "export interface DecisionTraceRepository {\n    save(trace: DecisionTrace): Promise<void>;\n    listByConversationId(conversationId: ConversationId): Promise<DecisionTrace[]>;\n}"
        ],
        "methods": [
          {
            "name": "save",
            "signature": "save(trace: DecisionTrace): Promise<void>",
            "description": "Persists a record.",
            "parameters": [
              {
                "name": "trace",
                "type": "DecisionTrace",
                "description": "Trace fragment or decision trace evidence for this contract.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "listByConversationId",
            "signature": "listByConversationId(conversationId: ConversationId): Promise<DecisionTrace[]>",
            "description": "Lists stored records for one conversation id.",
            "parameters": [
              {
                "name": "conversationId",
                "type": "ConversationId",
                "description": "Conversation identifier.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<DecisionTrace[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "save",
          "listByConversationId"
        ],
        "related": [
          "ConversationId",
          "DecisionTrace"
        ]
      }
    ]
  },
  {
    "title": "Engine and API Adapter",
    "summary": "Engine facade, turn requests, event subscriptions, and transport-neutral API DTOs.",
    "exports": [
      "ConversationEngine",
      "StartConversationRequest",
      "ProcessUserInputRequest",
      "ProcessExternalEventRequest",
      "ProcessTurnResult",
      "ConversationEventEnvelope",
      "ConversationEventSubscriber",
      "ConversationEventSubscription",
      "ConversationApi",
      "ConversationApiStartRequest",
      "ConversationApiTextRequest",
      "ConversationApiChoiceRequest",
      "ConversationApiAttachmentRequest",
      "ConversationApiEventRequest",
      "ConversationApiHttpResponse",
      "ConversationApiResponseBody",
      "ConversationApiMessage",
      "ConversationApiChoice",
      "ConversationApiVariable"
    ],
    "entries": [
      {
        "name": "ConversationEngine",
        "kind": "interface",
        "purpose": "ConversationEngine defines the engine and api adapter contract with startConversation, processUserInput, processExternalEvent, subscribeToEvents.",
        "usage": "Use this contract when integrating Dialit directly or through transport-friendly request and response DTOs.",
        "signatures": [
          "export interface ConversationEngine {\n    startConversation(request: StartConversationRequest): Promise<ProcessTurnResult>;\n    processUserInput(request: ProcessUserInputRequest): Promise<ProcessTurnResult>;\n    processExternalEvent(request: ProcessExternalEventRequest): Promise<ProcessTurnResult>;\n    subscribeToEvents(subscriber: ConversationEventSubscriber): ConversationEventSubscription;\n}"
        ],
        "methods": [
          {
            "name": "startConversation",
            "signature": "startConversation(request: StartConversationRequest): Promise<ProcessTurnResult>",
            "description": "startConversation is the method exposed by ConversationEngine.",
            "parameters": [
              {
                "name": "request",
                "type": "StartConversationRequest",
                "description": "request is the StartConversationRequest member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ProcessTurnResult>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "processUserInput",
            "signature": "processUserInput(request: ProcessUserInputRequest): Promise<ProcessTurnResult>",
            "description": "Processes user input through ConversationEngine.",
            "parameters": [
              {
                "name": "request",
                "type": "ProcessUserInputRequest",
                "description": "request is the ProcessUserInputRequest member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ProcessTurnResult>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "processExternalEvent",
            "signature": "processExternalEvent(request: ProcessExternalEventRequest): Promise<ProcessTurnResult>",
            "description": "Processes external event through ConversationEngine.",
            "parameters": [
              {
                "name": "request",
                "type": "ProcessExternalEventRequest",
                "description": "request is the ProcessExternalEventRequest member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ProcessTurnResult>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "subscribeToEvents",
            "signature": "subscribeToEvents(subscriber: ConversationEventSubscriber): ConversationEventSubscription",
            "description": "subscribeToEvents is the method exposed by ConversationEngine.",
            "parameters": [
              {
                "name": "subscriber",
                "type": "ConversationEventSubscriber",
                "description": "subscriber is the ConversationEventSubscriber member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "ConversationEventSubscription",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "startConversation",
          "processUserInput",
          "processExternalEvent",
          "subscribeToEvents"
        ],
        "related": [
          "StartConversationRequest",
          "ProcessUserInputRequest",
          "ProcessExternalEventRequest",
          "ProcessTurnResult",
          "ConversationEventSubscriber",
          "ConversationEventSubscription"
        ]
      },
      {
        "name": "StartConversationRequest",
        "kind": "interface",
        "purpose": "StartConversationRequest defines the engine and api adapter contract with conversationId, flowVersionId, channel, userId, initialVariables, metadata.",
        "usage": "Use StartConversationRequest as the request object accepted by the corresponding engine, API, factory, or helper call.",
        "signatures": [
          "export interface StartConversationRequest {\n    conversationId: ConversationId;\n    flowVersionId: FlowVersionId;\n    channel?: string;\n    userId?: string;\n    initialVariables?: Record<VariableId, unknown> | Partial<Record<VariableScope, Record<VariableId, unknown>>>;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "conversationId",
          "flowVersionId",
          "channel",
          "userId",
          "initialVariables",
          "metadata"
        ],
        "properties": [
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "flowVersionId is the string member exposed by StartConversationRequest.",
            "required": true
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          },
          {
            "name": "userId",
            "type": "string",
            "description": "userId is the optional string member exposed by StartConversationRequest.",
            "required": false
          },
          {
            "name": "initialVariables",
            "type": "Record<string, unknown> | Partial<Record<VariableScope, Record<string, unknown>>>",
            "description": "initialVariables is the optional Record<string, unknown> | Partial<Record<VariableScope, Record<string, unknown>>> member exposed by StartConversationRequest.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "FlowVersionId",
          "VariableId",
          "ConversationId",
          "Metadata",
          "VariableScope"
        ]
      },
      {
        "name": "ProcessUserInputRequest",
        "kind": "interface",
        "purpose": "ProcessUserInputRequest defines the engine and api adapter contract with conversationId, input.",
        "usage": "Use ProcessUserInputRequest as the request object accepted by the corresponding engine, API, factory, or helper call.",
        "signatures": [
          "export interface ProcessUserInputRequest {\n    conversationId: ConversationId;\n    input: UserInput;\n}"
        ],
        "fields": [
          "conversationId",
          "input"
        ],
        "properties": [
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "input",
            "type": "UserInput",
            "description": "input is the UserInput member exposed by ProcessUserInputRequest.",
            "required": true
          }
        ],
        "related": [
          "ConversationId",
          "UserInput"
        ]
      },
      {
        "name": "ProcessExternalEventRequest",
        "kind": "interface",
        "purpose": "ProcessExternalEventRequest defines the engine and api adapter contract with conversationId, event.",
        "usage": "Use ProcessExternalEventRequest as the request object accepted by the corresponding engine, API, factory, or helper call.",
        "signatures": [
          "export interface ProcessExternalEventRequest {\n    conversationId: ConversationId;\n    event: EventUserInput;\n}"
        ],
        "fields": [
          "conversationId",
          "event"
        ],
        "properties": [
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "event",
            "type": "EventUserInput",
            "description": "event is the EventUserInput member exposed by ProcessExternalEventRequest.",
            "required": true
          }
        ],
        "related": [
          "ConversationId",
          "EventUserInput"
        ]
      },
      {
        "name": "ProcessTurnResult",
        "kind": "interface",
        "purpose": "ProcessTurnResult defines the engine and api adapter contract with conversation, state, turn, events, messages, trace.",
        "usage": "Use ProcessTurnResult to inspect the structured outcome returned by the corresponding runtime, validation, or provider operation.",
        "signatures": [
          "export interface ProcessTurnResult {\n    conversation: Conversation;\n    state: ConversationState;\n    turn: Turn;\n    events: ConversationEvent[];\n    messages: OutboundMessage[];\n    trace: DecisionTrace;\n    error?: RuntimeError;\n}"
        ],
        "fields": [
          "conversation",
          "state",
          "turn",
          "events",
          "messages",
          "trace",
          "error"
        ],
        "properties": [
          {
            "name": "conversation",
            "type": "Conversation",
            "description": "conversation is the Conversation member exposed by ProcessTurnResult.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Current turn metadata.",
            "required": true
          },
          {
            "name": "events",
            "type": "ConversationEvent[]",
            "description": "Runtime events emitted during execution.",
            "required": true
          },
          {
            "name": "messages",
            "type": "OutboundMessage[]",
            "description": "Outbound messages produced by the turn, step, branch, or operation.",
            "required": true
          },
          {
            "name": "trace",
            "type": "DecisionTrace",
            "description": "Trace fragment or decision trace evidence for this contract.",
            "required": true
          },
          {
            "name": "error",
            "type": "RuntimeError",
            "description": "Runtime error produced by execution.",
            "required": false
          }
        ],
        "related": [
          "Conversation",
          "ConversationState",
          "Turn",
          "OutboundMessage",
          "ConversationEvent",
          "DecisionTrace",
          "RuntimeError"
        ]
      },
      {
        "name": "ConversationEventEnvelope",
        "kind": "interface",
        "purpose": "ConversationEventEnvelope defines the engine and api adapter contract with event, result.",
        "usage": "Use this contract when integrating Dialit directly or through transport-friendly request and response DTOs.",
        "signatures": [
          "export interface ConversationEventEnvelope {\n    event: ConversationEvent;\n    result: ProcessTurnResult;\n}"
        ],
        "fields": [
          "event",
          "result"
        ],
        "properties": [
          {
            "name": "event",
            "type": "ConversationEvent",
            "description": "event is the ConversationEvent member exposed by ConversationEventEnvelope.",
            "required": true
          },
          {
            "name": "result",
            "type": "ProcessTurnResult",
            "description": "result is the ProcessTurnResult member exposed by ConversationEventEnvelope.",
            "required": true
          }
        ],
        "related": [
          "ConversationEvent",
          "ProcessTurnResult"
        ]
      },
      {
        "name": "ConversationEventSubscriber",
        "kind": "function type",
        "purpose": "ConversationEventSubscriber is a callback or factory type in Engine and API Adapter with the call signature shown below.",
        "usage": "Use this contract when integrating Dialit directly or through transport-friendly request and response DTOs.",
        "signatures": [
          "export type ConversationEventSubscriber = (envelope: ConversationEventEnvelope) => void | Promise<void>;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "(envelope: ConversationEventEnvelope) => void | Promise<void>",
            "description": "ConversationEventSubscriber resolves to (envelope: ConversationEventEnvelope) => void | Promise<void>.",
            "required": true
          }
        ],
        "related": [
          "ConversationEventEnvelope"
        ]
      },
      {
        "name": "ConversationEventSubscription",
        "kind": "interface",
        "purpose": "ConversationEventSubscription defines the engine and api adapter contract with unsubscribe.",
        "usage": "Use this contract when integrating Dialit directly or through transport-friendly request and response DTOs.",
        "signatures": [
          "export interface ConversationEventSubscription {\n    unsubscribe(): void;\n}"
        ],
        "methods": [
          {
            "name": "unsubscribe",
            "signature": "unsubscribe(): void",
            "description": "unsubscribe is the method exposed by ConversationEventSubscription.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "This method does not require arguments.",
                "required": false
              }
            ],
            "returns": {
              "type": "void",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "unsubscribe"
        ],
        "related": []
      },
      {
        "name": "ConversationApi",
        "kind": "interface",
        "purpose": "ConversationApi defines the engine and api adapter contract with engine, start, sendMessage, selectOption, sendAttachments, sendEvent.",
        "usage": "Use this contract when integrating Dialit directly or through transport-friendly request and response DTOs.",
        "signatures": [
          "export interface ConversationApi {\n    readonly engine: ConversationEngine;\n    start(request: ConversationApiStartRequest): Promise<ConversationApiHttpResponse>;\n    sendMessage(request: ConversationApiTextRequest): Promise<ConversationApiHttpResponse>;\n    selectOption(request: ConversationApiChoiceRequest): Promise<ConversationApiHttpResponse>;\n    sendAttachments(request: ConversationApiAttachmentRequest): Promise<ConversationApiHttpResponse>;\n    sendEvent(request: ConversationApiEventRequest): Promise<ConversationApiHttpResponse>;\n    toHttpResponse(result: ProcessTurnResult): ConversationApiHttpResponse;\n    subscribeToEvents(subscriber: ConversationEventSubscriber): ConversationEventSubscription;\n}"
        ],
        "methods": [
          {
            "name": "start",
            "signature": "start(request: ConversationApiStartRequest): Promise<ConversationApiHttpResponse>",
            "description": "start is the method exposed by ConversationApi.",
            "parameters": [
              {
                "name": "request",
                "type": "ConversationApiStartRequest",
                "description": "request is the ConversationApiStartRequest member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationApiHttpResponse>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "sendMessage",
            "signature": "sendMessage(request: ConversationApiTextRequest): Promise<ConversationApiHttpResponse>",
            "description": "Sends message through ConversationApi.",
            "parameters": [
              {
                "name": "request",
                "type": "ConversationApiTextRequest",
                "description": "request is the ConversationApiTextRequest member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationApiHttpResponse>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "selectOption",
            "signature": "selectOption(request: ConversationApiChoiceRequest): Promise<ConversationApiHttpResponse>",
            "description": "selectOption is the method exposed by ConversationApi.",
            "parameters": [
              {
                "name": "request",
                "type": "ConversationApiChoiceRequest",
                "description": "request is the ConversationApiChoiceRequest member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationApiHttpResponse>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "sendAttachments",
            "signature": "sendAttachments(request: ConversationApiAttachmentRequest): Promise<ConversationApiHttpResponse>",
            "description": "Sends attachments through ConversationApi.",
            "parameters": [
              {
                "name": "request",
                "type": "ConversationApiAttachmentRequest",
                "description": "request is the ConversationApiAttachmentRequest member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationApiHttpResponse>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "sendEvent",
            "signature": "sendEvent(request: ConversationApiEventRequest): Promise<ConversationApiHttpResponse>",
            "description": "Sends event through ConversationApi.",
            "parameters": [
              {
                "name": "request",
                "type": "ConversationApiEventRequest",
                "description": "request is the ConversationApiEventRequest member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationApiHttpResponse>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "toHttpResponse",
            "signature": "toHttpResponse(result: ProcessTurnResult): ConversationApiHttpResponse",
            "description": "toHttpResponse is the method exposed by ConversationApi.",
            "parameters": [
              {
                "name": "result",
                "type": "ProcessTurnResult",
                "description": "result is the ProcessTurnResult member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "ConversationApiHttpResponse",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "subscribeToEvents",
            "signature": "subscribeToEvents(subscriber: ConversationEventSubscriber): ConversationEventSubscription",
            "description": "subscribeToEvents is the method exposed by ConversationApi.",
            "parameters": [
              {
                "name": "subscriber",
                "type": "ConversationEventSubscriber",
                "description": "subscriber is the ConversationEventSubscriber member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "ConversationEventSubscription",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "engine",
          "start",
          "sendMessage",
          "selectOption",
          "sendAttachments",
          "sendEvent",
          "toHttpResponse",
          "subscribeToEvents"
        ],
        "properties": [
          {
            "name": "engine",
            "type": "ConversationEngine",
            "description": "engine is the ConversationEngine member exposed by ConversationApi.",
            "required": true
          }
        ],
        "related": [
          "ConversationEngine",
          "ProcessTurnResult",
          "ConversationEventSubscriber",
          "ConversationEventSubscription",
          "ConversationApiStartRequest",
          "ConversationApiTextRequest",
          "ConversationApiChoiceRequest",
          "ConversationApiAttachmentRequest",
          "ConversationApiEventRequest",
          "ConversationApiHttpResponse"
        ]
      },
      {
        "name": "ConversationApiStartRequest",
        "kind": "type",
        "purpose": "ConversationApiStartRequest is a public type in Engine and API Adapter.",
        "usage": "Use ConversationApiStartRequest as the request object accepted by the corresponding engine, API, factory, or helper call.",
        "signatures": [
          "export type ConversationApiStartRequest = StartConversationRequest;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "StartConversationRequest",
            "description": "ConversationApiStartRequest resolves to StartConversationRequest.",
            "required": true
          }
        ],
        "related": [
          "StartConversationRequest"
        ]
      },
      {
        "name": "ConversationApiTextRequest",
        "kind": "interface",
        "purpose": "ConversationApiTextRequest defines the engine and api adapter contract with conversationId, text, inputId, turnId, channel, receivedAt.",
        "usage": "Use ConversationApiTextRequest as the request object accepted by the corresponding engine, API, factory, or helper call.",
        "signatures": [
          "export interface ConversationApiTextRequest {\n    conversationId: ConversationId;\n    text: string;\n    inputId?: MessageId;\n    turnId?: TurnId;\n    channel?: string;\n    receivedAt?: ISODateString;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "conversationId",
          "text",
          "inputId",
          "turnId",
          "channel",
          "receivedAt",
          "metadata"
        ],
        "properties": [
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "text",
            "type": "string",
            "description": "Text content sent by a user or returned to a user.",
            "required": true
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "inputId is the optional string member exposed by ConversationApiTextRequest.",
            "required": false
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "receivedAt is the optional string member exposed by ConversationApiTextRequest.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "ConversationId",
          "TurnId",
          "MessageId",
          "ISODateString",
          "Metadata"
        ]
      },
      {
        "name": "ConversationApiChoiceRequest",
        "kind": "interface",
        "purpose": "ConversationApiChoiceRequest defines the engine and api adapter contract with conversationId, optionId, label, payload, inputId, turnId.",
        "usage": "Use ConversationApiChoiceRequest as the request object accepted by the corresponding engine, API, factory, or helper call.",
        "signatures": [
          "export interface ConversationApiChoiceRequest {\n    conversationId: ConversationId;\n    optionId?: OptionId;\n    label?: string;\n    payload?: JsonObject;\n    inputId?: MessageId;\n    turnId?: TurnId;\n    channel?: string;\n    receivedAt?: ISODateString;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "conversationId",
          "optionId",
          "label",
          "payload",
          "inputId",
          "turnId",
          "channel",
          "receivedAt",
          "metadata"
        ],
        "properties": [
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "optionId",
            "type": "string",
            "description": "optionId is the optional string member exposed by ConversationApiChoiceRequest.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by ConversationApiChoiceRequest.",
            "required": false
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Application payload attached to an event, input, or custom message.",
            "required": false
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "inputId is the optional string member exposed by ConversationApiChoiceRequest.",
            "required": false
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "receivedAt is the optional string member exposed by ConversationApiChoiceRequest.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "OptionId",
          "ConversationId",
          "TurnId",
          "MessageId",
          "ISODateString",
          "JsonObject",
          "Metadata"
        ]
      },
      {
        "name": "ConversationApiAttachmentRequest",
        "kind": "interface",
        "purpose": "ConversationApiAttachmentRequest defines the engine and api adapter contract with conversationId, attachments, inputId, turnId, channel, receivedAt.",
        "usage": "Use ConversationApiAttachmentRequest as the request object accepted by the corresponding engine, API, factory, or helper call.",
        "signatures": [
          "export interface ConversationApiAttachmentRequest {\n    conversationId: ConversationId;\n    attachments: AttachmentInput[];\n    inputId?: MessageId;\n    turnId?: TurnId;\n    channel?: string;\n    receivedAt?: ISODateString;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "conversationId",
          "attachments",
          "inputId",
          "turnId",
          "channel",
          "receivedAt",
          "metadata"
        ],
        "properties": [
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "attachments",
            "type": "AttachmentInput[]",
            "description": "attachments is the AttachmentInput[] member exposed by ConversationApiAttachmentRequest.",
            "required": true
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "inputId is the optional string member exposed by ConversationApiAttachmentRequest.",
            "required": false
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "receivedAt is the optional string member exposed by ConversationApiAttachmentRequest.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "ConversationId",
          "TurnId",
          "MessageId",
          "ISODateString",
          "Metadata",
          "AttachmentInput"
        ]
      },
      {
        "name": "ConversationApiEventRequest",
        "kind": "interface",
        "purpose": "ConversationApiEventRequest defines the engine and api adapter contract with conversationId, eventType, payload, inputId, turnId, channel.",
        "usage": "Use ConversationApiEventRequest as the request object accepted by the corresponding engine, API, factory, or helper call.",
        "signatures": [
          "export interface ConversationApiEventRequest {\n    conversationId: ConversationId;\n    eventType: string;\n    payload?: JsonObject;\n    inputId?: MessageId;\n    turnId?: TurnId;\n    channel?: string;\n    receivedAt?: ISODateString;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "conversationId",
          "eventType",
          "payload",
          "inputId",
          "turnId",
          "channel",
          "receivedAt",
          "metadata"
        ],
        "properties": [
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "eventType",
            "type": "string",
            "description": "eventType is the string member exposed by ConversationApiEventRequest.",
            "required": true
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Application payload attached to an event, input, or custom message.",
            "required": false
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "inputId is the optional string member exposed by ConversationApiEventRequest.",
            "required": false
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Conversation channel such as web, sms, or internal.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "receivedAt is the optional string member exposed by ConversationApiEventRequest.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "ConversationId",
          "TurnId",
          "MessageId",
          "ISODateString",
          "JsonObject",
          "Metadata"
        ]
      },
      {
        "name": "ConversationApiHttpResponse",
        "kind": "interface",
        "purpose": "ConversationApiHttpResponse defines the engine and api adapter contract with statusCode, body.",
        "usage": "Use this contract when integrating Dialit directly or through transport-friendly request and response DTOs.",
        "signatures": [
          "export interface ConversationApiHttpResponse {\n    statusCode: number;\n    body: ConversationApiResponseBody;\n}"
        ],
        "fields": [
          "statusCode",
          "body"
        ],
        "properties": [
          {
            "name": "statusCode",
            "type": "number",
            "description": "statusCode is the number member exposed by ConversationApiHttpResponse.",
            "required": true
          },
          {
            "name": "body",
            "type": "ConversationApiResponseBody",
            "description": "body is the ConversationApiResponseBody member exposed by ConversationApiHttpResponse.",
            "required": true
          }
        ],
        "related": [
          "ConversationApiResponseBody"
        ]
      },
      {
        "name": "ConversationApiResponseBody",
        "kind": "interface",
        "purpose": "ConversationApiResponseBody defines the engine and api adapter contract with ok, conversationId, turnId, status, currentStepId, messages.",
        "usage": "Use this contract when integrating Dialit directly or through transport-friendly request and response DTOs.",
        "signatures": [
          "export interface ConversationApiResponseBody {\n    ok: boolean;\n    conversationId: ConversationId;\n    turnId: TurnId;\n    status: ConversationStatus;\n    currentStepId: StepId;\n    messages: ConversationApiMessage[];\n    choices: ConversationApiChoice[];\n    variables: Record<VariableId, ConversationApiVariable>;\n    events: ConversationEvent[];\n    trace: DecisionTrace;\n    error?: RuntimeError;\n}"
        ],
        "fields": [
          "ok",
          "conversationId",
          "turnId",
          "status",
          "currentStepId",
          "messages",
          "choices",
          "variables",
          "events",
          "trace",
          "error"
        ],
        "properties": [
          {
            "name": "ok",
            "type": "boolean",
            "description": "ok is the boolean member exposed by ConversationApiResponseBody.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier.",
            "required": true
          },
          {
            "name": "status",
            "type": "ConversationStatus",
            "description": "Lifecycle, operation, action, handoff, or processing status.",
            "required": true
          },
          {
            "name": "currentStepId",
            "type": "string",
            "description": "currentStepId is the string member exposed by ConversationApiResponseBody.",
            "required": true
          },
          {
            "name": "messages",
            "type": "ConversationApiMessage[]",
            "description": "Outbound messages produced by the turn, step, branch, or operation.",
            "required": true
          },
          {
            "name": "choices",
            "type": "ConversationApiChoice[]",
            "description": "choices is the ConversationApiChoice[] member exposed by ConversationApiResponseBody.",
            "required": true
          },
          {
            "name": "variables",
            "type": "Record<string, ConversationApiVariable>",
            "description": "Variable declarations available to the flow.",
            "required": true
          },
          {
            "name": "events",
            "type": "ConversationEvent[]",
            "description": "Runtime events emitted during execution.",
            "required": true
          },
          {
            "name": "trace",
            "type": "DecisionTrace",
            "description": "Trace fragment or decision trace evidence for this contract.",
            "required": true
          },
          {
            "name": "error",
            "type": "RuntimeError",
            "description": "Runtime error produced by execution.",
            "required": false
          }
        ],
        "related": [
          "StepId",
          "VariableId",
          "ConversationId",
          "TurnId",
          "ConversationStatus",
          "ConversationEvent",
          "DecisionTrace",
          "RuntimeError",
          "ConversationApiMessage",
          "ConversationApiChoice"
        ]
      },
      {
        "name": "ConversationApiMessage",
        "kind": "interface",
        "purpose": "ConversationApiMessage defines the engine and api adapter contract with messageId, type, text, payload.",
        "usage": "Use this contract when integrating Dialit directly or through transport-friendly request and response DTOs.",
        "signatures": [
          "export interface ConversationApiMessage {\n    messageId: MessageId;\n    type: OutboundMessageContent[\"type\"];\n    text?: string;\n    payload?: JsonObject;\n}"
        ],
        "fields": [
          "messageId",
          "type",
          "text",
          "payload"
        ],
        "properties": [
          {
            "name": "messageId",
            "type": "string",
            "description": "messageId is the string member exposed by ConversationApiMessage.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"text\" | \"rich\" | \"custom_payload\"",
            "description": "Discriminator or value category for this contract.",
            "required": true
          },
          {
            "name": "text",
            "type": "string",
            "description": "Text content sent by a user or returned to a user.",
            "required": false
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Application payload attached to an event, input, or custom message.",
            "required": false
          }
        ],
        "related": [
          "MessageId",
          "JsonObject",
          "OutboundMessageContent"
        ]
      },
      {
        "name": "ConversationApiChoice",
        "kind": "interface",
        "purpose": "ConversationApiChoice defines the engine and api adapter contract with optionId, label, payload.",
        "usage": "Use this contract when integrating Dialit directly or through transport-friendly request and response DTOs.",
        "signatures": [
          "export interface ConversationApiChoice {\n    optionId: OptionId;\n    label: string;\n    payload?: JsonObject;\n}"
        ],
        "fields": [
          "optionId",
          "label",
          "payload"
        ],
        "properties": [
          {
            "name": "optionId",
            "type": "string",
            "description": "optionId is the string member exposed by ConversationApiChoice.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "label is the string member exposed by ConversationApiChoice.",
            "required": true
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Application payload attached to an event, input, or custom message.",
            "required": false
          }
        ],
        "related": [
          "OptionId",
          "JsonObject"
        ]
      },
      {
        "name": "ConversationApiVariable",
        "kind": "interface",
        "purpose": "ConversationApiVariable defines the engine and api adapter contract with value, scope, source, updatedAt, metadata.",
        "usage": "Use this contract when integrating Dialit directly or through transport-friendly request and response DTOs.",
        "signatures": [
          "export interface ConversationApiVariable {\n    value: unknown;\n    scope?: VariableScope;\n    source?: VariableValueSource;\n    updatedAt?: ISODateString;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "value",
          "scope",
          "source",
          "updatedAt",
          "metadata"
        ],
        "properties": [
          {
            "name": "value",
            "type": "unknown",
            "description": "value is the unknown member exposed by ConversationApiVariable.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "scope is the optional VariableScope member exposed by ConversationApiVariable.",
            "required": false
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Runtime source that produced a value, patch, or trace fragment.",
            "required": false
          },
          {
            "name": "updatedAt",
            "type": "string",
            "description": "ISO timestamp for the last update.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "ISODateString",
          "Metadata",
          "VariableScope",
          "VariableValueSource"
        ]
      }
    ]
  },
  {
    "title": "Turn Processing",
    "summary": "Lower-level executor contracts for turn, step, and branch execution boundaries.",
    "exports": [
      "TurnProcessor",
      "StepExecutor",
      "BranchExecutor",
      "BranchExecutionContext",
      "BranchExecutionResult"
    ],
    "entries": [
      {
        "name": "TurnProcessor",
        "kind": "interface",
        "purpose": "TurnProcessor defines the turn processing contract with startConversation, processUserInput.",
        "usage": "Use this contract when implementing or testing lower-level execution boundaries.",
        "signatures": [
          "export interface TurnProcessor {\n    startConversation(request: StartConversationRequest): Promise<ProcessTurnResult>;\n    processUserInput(request: ProcessUserInputRequest): Promise<ProcessTurnResult>;\n}"
        ],
        "methods": [
          {
            "name": "startConversation",
            "signature": "startConversation(request: StartConversationRequest): Promise<ProcessTurnResult>",
            "description": "startConversation is the method exposed by TurnProcessor.",
            "parameters": [
              {
                "name": "request",
                "type": "StartConversationRequest",
                "description": "request is the StartConversationRequest member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ProcessTurnResult>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "processUserInput",
            "signature": "processUserInput(request: ProcessUserInputRequest): Promise<ProcessTurnResult>",
            "description": "Processes user input through TurnProcessor.",
            "parameters": [
              {
                "name": "request",
                "type": "ProcessUserInputRequest",
                "description": "request is the ProcessUserInputRequest member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ProcessTurnResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "startConversation",
          "processUserInput"
        ],
        "related": [
          "Turn",
          "StartConversationRequest",
          "ProcessUserInputRequest",
          "ProcessTurnResult"
        ]
      },
      {
        "name": "StepExecutor",
        "kind": "interface",
        "purpose": "StepExecutor defines the turn processing contract with enterStep, handleStepInput.",
        "usage": "Use this contract when implementing or testing lower-level execution boundaries.",
        "signatures": [
          "export interface StepExecutor {\n    enterStep(context: StepExecutionContext): Promise<StepResult>;\n    handleStepInput(context: StepExecutionContext, input: UserInput): Promise<StepResult>;\n}"
        ],
        "methods": [
          {
            "name": "enterStep",
            "signature": "enterStep(context: StepExecutionContext): Promise<StepResult>",
            "description": "enterStep is the method exposed by StepExecutor.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext",
                "description": "context is the StepExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "handleStepInput",
            "signature": "handleStepInput(context: StepExecutionContext, input: UserInput): Promise<StepResult>",
            "description": "handleStepInput is the method exposed by StepExecutor.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext",
                "description": "context is the StepExecutionContext member exposed by method.",
                "required": true
              },
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "enterStep",
          "handleStepInput"
        ],
        "related": [
          "UserInput",
          "StepExecutionContext",
          "StepResult"
        ]
      },
      {
        "name": "BranchExecutor",
        "kind": "interface",
        "purpose": "BranchExecutor defines the turn processing contract with execute.",
        "usage": "Use this contract when implementing or testing lower-level execution boundaries.",
        "signatures": [
          "export interface BranchExecutor {\n    execute(branch: StepBranch, context: BranchExecutionContext): Promise<BranchExecutionResult>;\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(branch: StepBranch, context: BranchExecutionContext): Promise<BranchExecutionResult>",
            "description": "execute is the method exposed by BranchExecutor.",
            "parameters": [
              {
                "name": "branch",
                "type": "StepBranch",
                "description": "Branch selected or returned by the contract.",
                "required": true
              },
              {
                "name": "context",
                "type": "BranchExecutionContext",
                "description": "context is the BranchExecutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<BranchExecutionResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "execute"
        ],
        "related": [
          "StepBranch",
          "BranchExecutionContext",
          "BranchExecutionResult"
        ]
      },
      {
        "name": "BranchExecutionContext",
        "kind": "interface",
        "purpose": "BranchExecutionContext defines the turn processing contract with flow, state, turn, step, services.",
        "usage": "Use this contract when implementing or testing lower-level execution boundaries.",
        "signatures": [
          "export interface BranchExecutionContext {\n    flow: FlowVersion;\n    state: ConversationState;\n    turn: Turn;\n    step: StepDefinition;\n    services: RuntimeServices;\n}"
        ],
        "fields": [
          "flow",
          "state",
          "turn",
          "step",
          "services"
        ],
        "properties": [
          {
            "name": "flow",
            "type": "FlowVersion",
            "description": "Flow or flow version being validated or executed.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Current turn metadata.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "Active step definition.",
            "required": true
          },
          {
            "name": "services",
            "type": "RuntimeServices",
            "description": "Runtime services available to handlers and providers.",
            "required": true
          }
        ],
        "related": [
          "FlowVersion",
          "StepDefinition",
          "ConversationState",
          "Turn",
          "RuntimeServices"
        ]
      },
      {
        "name": "BranchExecutionResult",
        "kind": "interface",
        "purpose": "BranchExecutionResult defines the turn processing contract with messages, variablePatches, events, target, trace, error.",
        "usage": "Use BranchExecutionResult to inspect the structured outcome returned by the corresponding runtime, validation, or provider operation.",
        "signatures": [
          "export interface BranchExecutionResult {\n    messages: OutboundMessage[];\n    variablePatches: VariablePatch[];\n    events: ConversationEvent[];\n    target?: StepTarget;\n    trace: TraceFragment[];\n    error?: RuntimeError;\n}"
        ],
        "fields": [
          "messages",
          "variablePatches",
          "events",
          "target",
          "trace",
          "error"
        ],
        "properties": [
          {
            "name": "messages",
            "type": "OutboundMessage[]",
            "description": "Outbound messages produced by the turn, step, branch, or operation.",
            "required": true
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<string>[]",
            "description": "Variable writes, unsets, or invalidations produced by execution.",
            "required": true
          },
          {
            "name": "events",
            "type": "ConversationEvent[]",
            "description": "Runtime events emitted during execution.",
            "required": true
          },
          {
            "name": "target",
            "type": "StepTarget",
            "description": "target is the optional StepTarget member exposed by BranchExecutionResult.",
            "required": false
          },
          {
            "name": "trace",
            "type": "TraceFragment[]",
            "description": "Trace fragment or decision trace evidence for this contract.",
            "required": true
          },
          {
            "name": "error",
            "type": "RuntimeError",
            "description": "Runtime error produced by execution.",
            "required": false
          }
        ],
        "related": [
          "VariablePatch",
          "StepTarget",
          "OutboundMessage",
          "ConversationEvent",
          "TraceFragment",
          "RuntimeError"
        ]
      }
    ]
  },
  {
    "title": "Runtime Configuration",
    "summary": "Engine configuration, dependency injection options, runtime context, clocks, and id generation.",
    "exports": [
      "ConversationEngineConfig",
      "CreateConversationEngineOptions",
      "CreateConversationEngine",
      "RuntimeContext",
      "RuntimeClock",
      "IdGenerator",
      "ConversationEngineModule",
      "ConversationEngineRepositories"
    ],
    "entries": [
      {
        "name": "ConversationEngineConfig",
        "kind": "interface",
        "purpose": "ConversationEngineConfig defines the runtime configuration contract with defaultChannel, defaultLocale, maxTurnsPerConversation, maxStepExecutionsPerTurn, enableDecisionTrace.",
        "usage": "Use this contract when configuring runtime limits, providers, handlers, repositories, clocks, and ids.",
        "signatures": [
          "export interface ConversationEngineConfig {\n    defaultChannel?: string;\n    defaultLocale?: string;\n    maxTurnsPerConversation?: number;\n    maxStepExecutionsPerTurn?: number;\n    enableDecisionTrace?: boolean;\n}"
        ],
        "fields": [
          "defaultChannel",
          "defaultLocale",
          "maxTurnsPerConversation",
          "maxStepExecutionsPerTurn",
          "enableDecisionTrace"
        ],
        "properties": [
          {
            "name": "defaultChannel",
            "type": "string",
            "description": "defaultChannel is the optional string member exposed by ConversationEngineConfig.",
            "required": false
          },
          {
            "name": "defaultLocale",
            "type": "string",
            "description": "defaultLocale is the optional string member exposed by ConversationEngineConfig.",
            "required": false
          },
          {
            "name": "maxTurnsPerConversation",
            "type": "number",
            "description": "maxTurnsPerConversation is the optional number member exposed by ConversationEngineConfig.",
            "required": false
          },
          {
            "name": "maxStepExecutionsPerTurn",
            "type": "number",
            "description": "maxStepExecutionsPerTurn is the optional number member exposed by ConversationEngineConfig.",
            "required": false
          },
          {
            "name": "enableDecisionTrace",
            "type": "boolean",
            "description": "enableDecisionTrace is the optional boolean member exposed by ConversationEngineConfig.",
            "required": false
          }
        ],
        "related": []
      },
      {
        "name": "CreateConversationEngineOptions",
        "kind": "interface",
        "purpose": "CreateConversationEngineOptions defines the runtime configuration contract with config, repositories, services, runtime, flowVersions, clock.",
        "usage": "Use this contract when configuring runtime limits, providers, handlers, repositories, clocks, and ids.",
        "signatures": [
          "export interface CreateConversationEngineOptions {\n    config?: ConversationEngineConfig;\n    repositories?: Partial<ConversationEngineRepositories>;\n    services?: Partial<RuntimeServices>;\n    runtime?: Partial<RuntimeContext>;\n    flowVersions?: FlowVersion[];\n    clock?: RuntimeClock;\n    idGenerator?: Partial<IdGenerator>;\n    maxStepExecutionsPerTurn?: number;\n    stepHandlers?: Record<string, StepHandler>;\n    operationHandlers?: Record<string, OperationHandler | OperationHandler[\"execute\"]>;\n    validators?: Record<string, Validator | Validator[\"validate\"]>;\n    normalizers?: Record<string, Normalizer | Normalizer[\"normalize\"]>;\n    extractors?: Record<string, Extractor | Extractor[\"extract\"]>;\n    resolvers?: Resolver[];\n    eventSubscribers?: readonly ConversationEventSubscriber[];\n    actionHandlers?: Record<ActionKind, ActionHandler | ActionExecutor[\"execute\"]>;\n    customOperations?: Record<string, {\n        inputSchema?: JsonObject;\n        outputVariables?: VariableId[];\n        outcomes: StepOutcome[];\n        execute(operation: CustomOperation, input: Record<string, unknown>, context: OperationExecutionContext): Promise<CustomOperationResult | OperationResult>;\n    }>;\n    semanticInputResolver?: SemanticInputResolver | SemanticInputResolver[\"resolve\"];\n    llmResponseGenerator?: LlmResponseGenerator | LlmResponseGenerator[\"generate\"];\n}"
        ],
        "fields": [
          "config",
          "repositories",
          "services",
          "runtime",
          "flowVersions",
          "clock",
          "idGenerator",
          "maxStepExecutionsPerTurn",
          "stepHandlers",
          "operationHandlers",
          "validators",
          "normalizers",
          "extractors",
          "resolvers",
          "eventSubscribers",
          "actionHandlers",
          "customOperations",
          "semanticInputResolver",
          "llmResponseGenerator"
        ],
        "properties": [
          {
            "name": "config",
            "type": "ConversationEngineConfig",
            "description": "config is the optional ConversationEngineConfig member exposed by CreateConversationEngineOptions.",
            "required": false
          },
          {
            "name": "repositories",
            "type": "Partial<ConversationEngineRepositories>",
            "description": "repositories is the optional Partial<ConversationEngineRepositories> member exposed by CreateConversationEngineOptions.",
            "required": false
          },
          {
            "name": "services",
            "type": "Partial<RuntimeServices>",
            "description": "Runtime services available to handlers and providers.",
            "required": false
          },
          {
            "name": "runtime",
            "type": "Partial<RuntimeContext>",
            "description": "runtime is the optional Partial<RuntimeContext> member exposed by CreateConversationEngineOptions.",
            "required": false
          },
          {
            "name": "flowVersions",
            "type": "FlowVersion[]",
            "description": "flowVersions is the optional FlowVersion[] member exposed by CreateConversationEngineOptions.",
            "required": false
          },
          {
            "name": "clock",
            "type": "RuntimeClock",
            "description": "clock is the optional RuntimeClock member exposed by CreateConversationEngineOptions.",
            "required": false
          },
          {
            "name": "idGenerator",
            "type": "Partial<IdGenerator>",
            "description": "idGenerator is the optional Partial<IdGenerator> member exposed by CreateConversationEngineOptions.",
            "required": false
          },
          {
            "name": "maxStepExecutionsPerTurn",
            "type": "number",
            "description": "maxStepExecutionsPerTurn is the optional number member exposed by CreateConversationEngineOptions.",
            "required": false
          },
          {
            "name": "stepHandlers",
            "type": "Record<string, StepHandler<StepConfig>>",
            "description": "stepHandlers is the optional Record<string, StepHandler<StepConfig>> member exposed by CreateConversationEngineOptions.",
            "required": false
          },
          {
            "name": "operationHandlers",
            "type": "Record<string, OperationHandler<StepOperation> | ((operation: StepOperation, context: OperationExecutionContext) => Promise<...>)>",
            "description": "operationHandlers is the optional Record<string, OperationHandler<StepOperation> | ((operation: StepOperation, context: OperationExecutionContext) => Promise<...>)> member exposed by CreateConversationEngineOptions.",
            "required": false
          },
          {
            "name": "validators",
            "type": "Record<string, Validator | ((value: unknown, definition: ValidatorDefinition, context: ValidationContext) => Promise<ValidationResult>)>",
            "description": "validators is the optional Record<string, Validator | ((value: unknown, definition: ValidatorDefinition, context: ValidationContext) => Promise<ValidationResult>)> member exposed by CreateConversationEngineOptions.",
            "required": false
          },
          {
            "name": "normalizers",
            "type": "Record<string, Normalizer | ((value: unknown, definition: NormalizerDefinition, context: NormalizationContext) => Promise<unknown>)>",
            "description": "normalizers is the optional Record<string, Normalizer | ((value: unknown, definition: NormalizerDefinition, context: NormalizationContext) => Promise<unknown>)> member exposed by CreateConversationEngineOptions.",
            "required": false
          },
          {
            "name": "extractors",
            "type": "Record<string, Extractor | ((input: UserInput, definition: ExtractorDefinition, context: ExtractionContext) => Promise<...>)>",
            "description": "extractors is the optional Record<string, Extractor | ((input: UserInput, definition: ExtractorDefinition, context: ExtractionContext) => Promise<...>)> member exposed by CreateConversationEngineOptions.",
            "required": false
          },
          {
            "name": "resolvers",
            "type": "Resolver[]",
            "description": "resolvers is the optional Resolver[] member exposed by CreateConversationEngineOptions.",
            "required": false
          },
          {
            "name": "eventSubscribers",
            "type": "readonly ConversationEventSubscriber[]",
            "description": "eventSubscribers is the optional readonly ConversationEventSubscriber[] member exposed by CreateConversationEngineOptions.",
            "required": false
          },
          {
            "name": "actionHandlers",
            "type": "Record<string, ((action: ActionDefinition, input: Record<string, unknown>, context: ActionExecutionContext) => Promise<ActionResult>) | ActionHandler>",
            "description": "actionHandlers is the optional Record<string, ((action: ActionDefinition, input: Record<string, unknown>, context: ActionExecutionContext) => Promise<ActionResult>) | ActionHandler> member exposed by CreateConversationEngineOptions.",
            "required": false
          },
          {
            "name": "customOperations",
            "type": "Record<string, { inputSchema?: JsonObject; outputVariables?: string[]; outcomes: string[]; execute(operation: CustomOperation, input: Record<...>, context: OperationExecutionContext): Promise<...>; }>",
            "description": "Custom operation contracts available to custom operations.",
            "required": false
          },
          {
            "name": "semanticInputResolver",
            "type": "SemanticInputResolver | (<TOutcome extends StepOutcome = string, TVariableId extends VariableId = string>(input: UserInput, task: SemanticInputTask<TOutcome, TVariableId>, context: InputProcessingContext) => Promise<...>)",
            "description": "semanticInputResolver is the optional SemanticInputResolver | (<TOutcome extends StepOutcome = string, TVariableId extends VariableId = string>(input: UserInput, task: SemanticInputTask<TOutcome, TVariableId>, context: InputProcessingContext) => Promise<...>) member exposed by CreateConversationEngineOptions.",
            "required": false
          },
          {
            "name": "llmResponseGenerator",
            "type": "LlmResponseGenerator | (<TVariableId extends VariableId = string>(plan: GeneratedResponsePlan<TVariableId>, context: ResponseRenderingContext) => Promise<...>)",
            "description": "llmResponseGenerator is the optional LlmResponseGenerator | (<TVariableId extends VariableId = string>(plan: GeneratedResponsePlan<TVariableId>, context: ResponseRenderingContext) => Promise<...>) member exposed by CreateConversationEngineOptions.",
            "required": false
          }
        ],
        "related": [
          "VariableId",
          "JsonObject",
          "StepOutcome",
          "FlowVersion",
          "GeneratedResponsePlan",
          "ActionKind",
          "ActionDefinition",
          "ActionResult",
          "StepConfig",
          "StepOperation"
        ]
      },
      {
        "name": "CreateConversationEngine",
        "kind": "function type",
        "purpose": "CreateConversationEngine is a callback or factory type in Runtime Configuration with the call signature shown below.",
        "usage": "Use this contract when configuring runtime limits, providers, handlers, repositories, clocks, and ids.",
        "signatures": [
          "export type CreateConversationEngine = (options?: CreateConversationEngineOptions) => ConversationEngine & ConversationEngineModule;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "(options?: CreateConversationEngineOptions) => ConversationEngine & ConversationEngineModule",
            "description": "CreateConversationEngine resolves to (options?: CreateConversationEngineOptions) => ConversationEngine & ConversationEngineModule.",
            "required": true
          }
        ],
        "related": [
          "ConversationEngine",
          "CreateConversationEngineOptions",
          "ConversationEngineModule"
        ]
      },
      {
        "name": "RuntimeContext",
        "kind": "interface",
        "purpose": "RuntimeContext defines the runtime configuration contract with config, clock, idGenerator.",
        "usage": "Use this contract when configuring runtime limits, providers, handlers, repositories, clocks, and ids.",
        "signatures": [
          "export interface RuntimeContext {\n    config: ConversationEngineConfig;\n    clock: RuntimeClock;\n    idGenerator: IdGenerator;\n}"
        ],
        "fields": [
          "config",
          "clock",
          "idGenerator"
        ],
        "properties": [
          {
            "name": "config",
            "type": "ConversationEngineConfig",
            "description": "config is the ConversationEngineConfig member exposed by RuntimeContext.",
            "required": true
          },
          {
            "name": "clock",
            "type": "RuntimeClock",
            "description": "clock is the RuntimeClock member exposed by RuntimeContext.",
            "required": true
          },
          {
            "name": "idGenerator",
            "type": "IdGenerator",
            "description": "idGenerator is the IdGenerator member exposed by RuntimeContext.",
            "required": true
          }
        ],
        "related": [
          "ConversationEngineConfig",
          "RuntimeClock",
          "IdGenerator"
        ]
      },
      {
        "name": "RuntimeClock",
        "kind": "interface",
        "purpose": "RuntimeClock defines the runtime configuration contract with now.",
        "usage": "Use this contract when configuring runtime limits, providers, handlers, repositories, clocks, and ids.",
        "signatures": [
          "export interface RuntimeClock {\n    now(): ISODateString;\n}"
        ],
        "methods": [
          {
            "name": "now",
            "signature": "now(): ISODateString",
            "description": "now is the method exposed by RuntimeClock.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "This method does not require arguments.",
                "required": false
              }
            ],
            "returns": {
              "type": "ISODateString",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "now"
        ],
        "related": [
          "ISODateString"
        ]
      },
      {
        "name": "IdGenerator",
        "kind": "interface",
        "purpose": "IdGenerator defines the runtime configuration contract with newFlowVersionId, newConversationId, newTurnId, newMessageId, newEventId, newTraceId.",
        "usage": "Use this contract when configuring runtime limits, providers, handlers, repositories, clocks, and ids.",
        "signatures": [
          "export interface IdGenerator {\n    newFlowVersionId(): FlowVersionId;\n    newConversationId(): ConversationId;\n    newTurnId(): TurnId;\n    newMessageId(): MessageId;\n    newEventId(): EventId;\n    newTraceId(): TraceId;\n    newCandidateId(): CandidateId;\n    newExecutionFrameId(): ExecutionFrameId;\n    newHandoffId(): HandoffId;\n}"
        ],
        "methods": [
          {
            "name": "newFlowVersionId",
            "signature": "newFlowVersionId(): FlowVersionId",
            "description": "Creates a new flow version id value.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "This method does not require arguments.",
                "required": false
              }
            ],
            "returns": {
              "type": "FlowVersionId",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "newConversationId",
            "signature": "newConversationId(): ConversationId",
            "description": "Creates a new conversation id value.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "This method does not require arguments.",
                "required": false
              }
            ],
            "returns": {
              "type": "ConversationId",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "newTurnId",
            "signature": "newTurnId(): TurnId",
            "description": "Creates a new turn id value.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "This method does not require arguments.",
                "required": false
              }
            ],
            "returns": {
              "type": "TurnId",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "newMessageId",
            "signature": "newMessageId(): MessageId",
            "description": "Creates a new message id value.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "This method does not require arguments.",
                "required": false
              }
            ],
            "returns": {
              "type": "MessageId",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "newEventId",
            "signature": "newEventId(): EventId",
            "description": "Creates a new event id value.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "This method does not require arguments.",
                "required": false
              }
            ],
            "returns": {
              "type": "EventId",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "newTraceId",
            "signature": "newTraceId(): TraceId",
            "description": "Creates a new trace id value.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "This method does not require arguments.",
                "required": false
              }
            ],
            "returns": {
              "type": "TraceId",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "newCandidateId",
            "signature": "newCandidateId(): CandidateId",
            "description": "Creates a new candidate id value.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "This method does not require arguments.",
                "required": false
              }
            ],
            "returns": {
              "type": "CandidateId",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "newExecutionFrameId",
            "signature": "newExecutionFrameId(): ExecutionFrameId",
            "description": "Creates a new execution frame id value.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "This method does not require arguments.",
                "required": false
              }
            ],
            "returns": {
              "type": "ExecutionFrameId",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "newHandoffId",
            "signature": "newHandoffId(): HandoffId",
            "description": "Creates a new handoff id value.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "This method does not require arguments.",
                "required": false
              }
            ],
            "returns": {
              "type": "HandoffId",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "newFlowVersionId",
          "newConversationId",
          "newTurnId",
          "newMessageId",
          "newEventId",
          "newTraceId",
          "newCandidateId",
          "newExecutionFrameId",
          "newHandoffId"
        ],
        "related": [
          "FlowVersionId",
          "EventId",
          "ConversationId",
          "TurnId",
          "MessageId",
          "TraceId",
          "CandidateId",
          "ExecutionFrameId",
          "HandoffId"
        ]
      },
      {
        "name": "ConversationEngineModule",
        "kind": "interface",
        "purpose": "ConversationEngineModule defines the runtime configuration contract with services, repositories, runtime.",
        "usage": "Use this contract when configuring runtime limits, providers, handlers, repositories, clocks, and ids.",
        "signatures": [
          "export interface ConversationEngineModule {\n    services: RuntimeServices;\n    repositories: ConversationEngineRepositories;\n    runtime: RuntimeContext;\n}"
        ],
        "fields": [
          "services",
          "repositories",
          "runtime"
        ],
        "properties": [
          {
            "name": "services",
            "type": "RuntimeServices",
            "description": "Runtime services available to handlers and providers.",
            "required": true
          },
          {
            "name": "repositories",
            "type": "ConversationEngineRepositories",
            "description": "repositories is the ConversationEngineRepositories member exposed by ConversationEngineModule.",
            "required": true
          },
          {
            "name": "runtime",
            "type": "RuntimeContext",
            "description": "runtime is the RuntimeContext member exposed by ConversationEngineModule.",
            "required": true
          }
        ],
        "related": [
          "RuntimeServices",
          "RuntimeContext",
          "ConversationEngineRepositories"
        ]
      },
      {
        "name": "ConversationEngineRepositories",
        "kind": "interface",
        "purpose": "ConversationEngineRepositories defines the runtime configuration contract with flowVersions, conversations, states, events, traces.",
        "usage": "Use this contract when configuring runtime limits, providers, handlers, repositories, clocks, and ids.",
        "signatures": [
          "export interface ConversationEngineRepositories {\n    flowVersions: FlowVersionRepository;\n    conversations: ConversationRepository;\n    states: ConversationStateRepository;\n    events: ConversationEventRepository;\n    traces: DecisionTraceRepository;\n}"
        ],
        "fields": [
          "flowVersions",
          "conversations",
          "states",
          "events",
          "traces"
        ],
        "properties": [
          {
            "name": "flowVersions",
            "type": "FlowVersionRepository",
            "description": "flowVersions is the FlowVersionRepository member exposed by ConversationEngineRepositories.",
            "required": true
          },
          {
            "name": "conversations",
            "type": "ConversationRepository",
            "description": "conversations is the ConversationRepository member exposed by ConversationEngineRepositories.",
            "required": true
          },
          {
            "name": "states",
            "type": "ConversationStateRepository",
            "description": "states is the ConversationStateRepository member exposed by ConversationEngineRepositories.",
            "required": true
          },
          {
            "name": "events",
            "type": "ConversationEventRepository",
            "description": "Runtime events emitted during execution.",
            "required": true
          },
          {
            "name": "traces",
            "type": "DecisionTraceRepository",
            "description": "traces is the DecisionTraceRepository member exposed by ConversationEngineRepositories.",
            "required": true
          }
        ],
        "related": [
          "FlowVersionRepository",
          "ConversationRepository",
          "ConversationStateRepository",
          "ConversationEventRepository",
          "DecisionTraceRepository"
        ]
      }
    ]
  },
  {
    "title": "Variable and Definition Lookup",
    "summary": "Variable store, value resolution, flow registry, and definition lookup contracts.",
    "exports": [
      "VariableStore",
      "VariableResolver",
      "VariableResolutionContext",
      "FlowRegistry",
      "DefinitionLookup"
    ],
    "entries": [
      {
        "name": "VariableStore",
        "kind": "interface",
        "purpose": "VariableStore defines the variable and definition lookup contract with get, set, unset, invalidate, has, snapshot.",
        "usage": "Use this contract when resolving variables or locating flow definitions from supporting tools.",
        "signatures": [
          "export interface VariableStore {\n    get(variableId: VariableId, scope?: VariableScope): VariableValue | undefined;\n    set(variableId: VariableId, value: unknown, source: VariableValueSource, metadata?: Metadata, scope?: VariableScope): SetVariablePatch;\n    unset(variableId: VariableId, source: VariableValueSource, metadata?: Metadata, scope?: VariableScope): UnsetVariablePatch;\n    invalidate(variableId: VariableId, source: VariableValueSource, reason?: string, metadata?: Metadata, scope?: VariableScope): InvalidateVariablePatch;\n    has(variableId: VariableId, scope?: VariableScope): boolean;\n    snapshot(): VariableStoreSnapshot;\n    history(variableId?: VariableId, scope?: VariableScope): VariableHistoryEntry[];\n}"
        ],
        "methods": [
          {
            "name": "get",
            "signature": "get(variableId: VariableId, scope?: VariableScope): VariableValue | undefined",
            "description": "Reads  from VariableStore.",
            "parameters": [
              {
                "name": "variableId",
                "type": "VariableId",
                "description": "Variable identifier read, written, validated, or traced.",
                "required": true
              },
              {
                "name": "scope",
                "type": "VariableScope",
                "description": "scope is the optional VariableScope member exposed by method.",
                "required": false
              }
            ],
            "returns": {
              "type": "VariableValue | undefined",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "set",
            "signature": "set(variableId: VariableId, value: unknown, source: VariableValueSource, metadata?: Metadata, scope?: VariableScope): SetVariablePatch",
            "description": "set is the method exposed by VariableStore.",
            "parameters": [
              {
                "name": "variableId",
                "type": "VariableId",
                "description": "Variable identifier read, written, validated, or traced.",
                "required": true
              },
              {
                "name": "value",
                "type": "unknown",
                "description": "value is the unknown member exposed by method.",
                "required": true
              },
              {
                "name": "source",
                "type": "VariableValueSource",
                "description": "Runtime source that produced a value, patch, or trace fragment.",
                "required": true
              },
              {
                "name": "metadata",
                "type": "Metadata",
                "description": "Application metadata carried with runtime objects.",
                "required": false
              },
              {
                "name": "scope",
                "type": "VariableScope",
                "description": "scope is the optional VariableScope member exposed by method.",
                "required": false
              }
            ],
            "returns": {
              "type": "SetVariablePatch",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "unset",
            "signature": "unset(variableId: VariableId, source: VariableValueSource, metadata?: Metadata, scope?: VariableScope): UnsetVariablePatch",
            "description": "unset is the method exposed by VariableStore.",
            "parameters": [
              {
                "name": "variableId",
                "type": "VariableId",
                "description": "Variable identifier read, written, validated, or traced.",
                "required": true
              },
              {
                "name": "source",
                "type": "VariableValueSource",
                "description": "Runtime source that produced a value, patch, or trace fragment.",
                "required": true
              },
              {
                "name": "metadata",
                "type": "Metadata",
                "description": "Application metadata carried with runtime objects.",
                "required": false
              },
              {
                "name": "scope",
                "type": "VariableScope",
                "description": "scope is the optional VariableScope member exposed by method.",
                "required": false
              }
            ],
            "returns": {
              "type": "UnsetVariablePatch",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "invalidate",
            "signature": "invalidate(variableId: VariableId, source: VariableValueSource, reason?: string, metadata?: Metadata, scope?: VariableScope): InvalidateVariablePatch",
            "description": "invalidate is the method exposed by VariableStore.",
            "parameters": [
              {
                "name": "variableId",
                "type": "VariableId",
                "description": "Variable identifier read, written, validated, or traced.",
                "required": true
              },
              {
                "name": "source",
                "type": "VariableValueSource",
                "description": "Runtime source that produced a value, patch, or trace fragment.",
                "required": true
              },
              {
                "name": "reason",
                "type": "string",
                "description": "Human-readable reason for rejection, invalidation, handoff, or trace output.",
                "required": false
              },
              {
                "name": "metadata",
                "type": "Metadata",
                "description": "Application metadata carried with runtime objects.",
                "required": false
              },
              {
                "name": "scope",
                "type": "VariableScope",
                "description": "scope is the optional VariableScope member exposed by method.",
                "required": false
              }
            ],
            "returns": {
              "type": "InvalidateVariablePatch",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "has",
            "signature": "has(variableId: VariableId, scope?: VariableScope): boolean",
            "description": "Checks whether VariableStore has .",
            "parameters": [
              {
                "name": "variableId",
                "type": "VariableId",
                "description": "Variable identifier read, written, validated, or traced.",
                "required": true
              },
              {
                "name": "scope",
                "type": "VariableScope",
                "description": "scope is the optional VariableScope member exposed by method.",
                "required": false
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "snapshot",
            "signature": "snapshot(): VariableStoreSnapshot",
            "description": "snapshot is the method exposed by VariableStore.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "This method does not require arguments.",
                "required": false
              }
            ],
            "returns": {
              "type": "VariableStoreSnapshot",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "history",
            "signature": "history(variableId?: VariableId, scope?: VariableScope): VariableHistoryEntry[]",
            "description": "history is the method exposed by VariableStore.",
            "parameters": [
              {
                "name": "variableId",
                "type": "VariableId",
                "description": "Variable identifier read, written, validated, or traced.",
                "required": false
              },
              {
                "name": "scope",
                "type": "VariableScope",
                "description": "scope is the optional VariableScope member exposed by method.",
                "required": false
              }
            ],
            "returns": {
              "type": "VariableHistoryEntry[]",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "get",
          "set",
          "unset",
          "invalidate",
          "has",
          "snapshot",
          "history"
        ],
        "related": [
          "VariableId",
          "Metadata",
          "VariableScope",
          "VariableValueSource",
          "VariableValue",
          "SetVariablePatch",
          "UnsetVariablePatch",
          "InvalidateVariablePatch",
          "VariableStoreSnapshot",
          "VariableHistoryEntry"
        ]
      },
      {
        "name": "VariableResolver",
        "kind": "interface",
        "purpose": "VariableResolver defines the variable and definition lookup contract with resolve.",
        "usage": "Use this contract when resolving variables or locating flow definitions from supporting tools.",
        "signatures": [
          "export interface VariableResolver {\n    resolve(expression: ValueExpression, context: VariableResolutionContext): unknown;\n}"
        ],
        "methods": [
          {
            "name": "resolve",
            "signature": "resolve(expression: ValueExpression, context: VariableResolutionContext): unknown",
            "description": "resolve is the method exposed by VariableResolver.",
            "parameters": [
              {
                "name": "expression",
                "type": "ValueExpression",
                "description": "expression is the ValueExpression member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "VariableResolutionContext",
                "description": "context is the VariableResolutionContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "unknown",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "resolve"
        ],
        "related": [
          "ValueExpression",
          "VariableResolutionContext"
        ]
      },
      {
        "name": "VariableResolutionContext",
        "kind": "interface",
        "purpose": "VariableResolutionContext defines the variable and definition lookup contract with state, turn, userInput, actionResult, metadata.",
        "usage": "Use this contract when resolving variables or locating flow definitions from supporting tools.",
        "signatures": [
          "export interface VariableResolutionContext {\n    state: ConversationState;\n    turn?: Turn;\n    userInput?: UserInput;\n    actionResult?: ActionResult;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "state",
          "turn",
          "userInput",
          "actionResult",
          "metadata"
        ],
        "properties": [
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Current turn metadata.",
            "required": false
          },
          {
            "name": "userInput",
            "type": "UserInput",
            "description": "userInput is the optional UserInput member exposed by VariableResolutionContext.",
            "required": false
          },
          {
            "name": "actionResult",
            "type": "ActionResult",
            "description": "actionResult is the optional ActionResult member exposed by VariableResolutionContext.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata",
          "ActionResult",
          "UserInput",
          "ConversationState",
          "Turn"
        ]
      },
      {
        "name": "FlowRegistry",
        "kind": "interface",
        "purpose": "FlowRegistry defines the variable and definition lookup contract with getFlowVersion, registerFlowVersion.",
        "usage": "Use FlowRegistry when runtime services need to register, look up, or test support for extension implementations.",
        "signatures": [
          "export interface FlowRegistry {\n    getFlowVersion(flowVersionId: FlowVersionId): Promise<FlowVersion | undefined>;\n    registerFlowVersion(flowVersion: FlowVersion): Promise<void>;\n}"
        ],
        "methods": [
          {
            "name": "getFlowVersion",
            "signature": "getFlowVersion(flowVersionId: FlowVersionId): Promise<FlowVersion | undefined>",
            "description": "Reads flow version from FlowRegistry.",
            "parameters": [
              {
                "name": "flowVersionId",
                "type": "FlowVersionId",
                "description": "flowVersionId is the FlowVersionId member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<FlowVersion | undefined>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "registerFlowVersion",
            "signature": "registerFlowVersion(flowVersion: FlowVersion): Promise<void>",
            "description": "registerFlowVersion is the method exposed by FlowRegistry.",
            "parameters": [
              {
                "name": "flowVersion",
                "type": "FlowVersion",
                "description": "flowVersion is the FlowVersion member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "getFlowVersion",
          "registerFlowVersion"
        ],
        "related": [
          "FlowVersionId",
          "FlowVersion"
        ]
      },
      {
        "name": "DefinitionLookup",
        "kind": "interface",
        "purpose": "DefinitionLookup defines the variable and definition lookup contract with getStep, getVariable, getAction, getResponse.",
        "usage": "Use this contract when resolving variables or locating flow definitions from supporting tools.",
        "signatures": [
          "export interface DefinitionLookup {\n    getStep(flow: FlowVersion, stepId: StepId): StepDefinition | undefined;\n    getVariable(flow: FlowVersion, variableId: VariableId): VariableDefinition | undefined;\n    getAction(flow: FlowVersion, actionId: ActionId): ActionDefinition | undefined;\n    getResponse(flow: FlowVersion, responseId: ResponseId): ResponseDefinition | undefined;\n}"
        ],
        "methods": [
          {
            "name": "getStep",
            "signature": "getStep(flow: FlowVersion, stepId: StepId): StepDefinition | undefined",
            "description": "Reads step from DefinitionLookup.",
            "parameters": [
              {
                "name": "flow",
                "type": "FlowVersion",
                "description": "Flow or flow version being validated or executed.",
                "required": true
              },
              {
                "name": "stepId",
                "type": "StepId",
                "description": "stepId is the StepId member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "StepDefinition | undefined",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "getVariable",
            "signature": "getVariable(flow: FlowVersion, variableId: VariableId): VariableDefinition | undefined",
            "description": "Reads variable from DefinitionLookup.",
            "parameters": [
              {
                "name": "flow",
                "type": "FlowVersion",
                "description": "Flow or flow version being validated or executed.",
                "required": true
              },
              {
                "name": "variableId",
                "type": "VariableId",
                "description": "Variable identifier read, written, validated, or traced.",
                "required": true
              }
            ],
            "returns": {
              "type": "VariableDefinition | undefined",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "getAction",
            "signature": "getAction(flow: FlowVersion, actionId: ActionId): ActionDefinition | undefined",
            "description": "Reads action from DefinitionLookup.",
            "parameters": [
              {
                "name": "flow",
                "type": "FlowVersion",
                "description": "Flow or flow version being validated or executed.",
                "required": true
              },
              {
                "name": "actionId",
                "type": "ActionId",
                "description": "actionId is the ActionId member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "ActionDefinition | undefined",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "getResponse",
            "signature": "getResponse(flow: FlowVersion, responseId: ResponseId): ResponseDefinition | undefined",
            "description": "Reads response from DefinitionLookup.",
            "parameters": [
              {
                "name": "flow",
                "type": "FlowVersion",
                "description": "Flow or flow version being validated or executed.",
                "required": true
              },
              {
                "name": "responseId",
                "type": "ResponseId",
                "description": "Reusable response identifier associated with the message.",
                "required": true
              }
            ],
            "returns": {
              "type": "ResponseDefinition | undefined",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "getStep",
          "getVariable",
          "getAction",
          "getResponse"
        ],
        "related": [
          "StepId",
          "VariableId",
          "ActionId",
          "ResponseId",
          "FlowVersion",
          "VariableDefinition",
          "ResponseDefinition",
          "ActionDefinition",
          "StepDefinition",
          "getVariable"
        ]
      }
    ]
  },
  {
    "title": "Built-in Resolver Marker Contracts",
    "summary": "Marker interfaces for built-in resolver types, not concrete exported classes.",
    "exports": [
      "TextResolver",
      "ExactTextResolver",
      "NumberResolver",
      "IntegerResolver",
      "EmailResolver",
      "PhoneResolver",
      "DateResolver",
      "RegexResolver",
      "MenuOptionResolver",
      "AttachmentResolver",
      "GlobalCommandResolver"
    ],
    "entries": [
      {
        "name": "TextResolver",
        "kind": "interface",
        "purpose": "TextResolver defines the built-in resolver marker contracts contract with resolverType, canResolve, resolve.",
        "usage": "Use this marker type to refer to a built-in resolver contract by its resolverType literal.",
        "signatures": [
          "export interface TextResolver extends Resolver {\n    readonly resolverType: \"text\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "canResolve is the method exposed by TextResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "resolve is the method exposed by TextResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "resolverType",
          "canResolve",
          "resolve"
        ],
        "properties": [
          {
            "name": "resolverType",
            "type": "\"text\"",
            "description": "resolverType is the \"text\" member exposed by TextResolver.",
            "required": true
          }
        ],
        "related": [
          "InputContract",
          "UserInput",
          "CommandCandidate",
          "InputProcessingContext",
          "Resolver"
        ]
      },
      {
        "name": "ExactTextResolver",
        "kind": "interface",
        "purpose": "ExactTextResolver defines the built-in resolver marker contracts contract with resolverType, canResolve, resolve.",
        "usage": "Use this marker type to refer to a built-in resolver contract by its resolverType literal.",
        "signatures": [
          "export interface ExactTextResolver extends Resolver {\n    readonly resolverType: \"exact_text\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "canResolve is the method exposed by ExactTextResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "resolve is the method exposed by ExactTextResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "resolverType",
          "canResolve",
          "resolve"
        ],
        "properties": [
          {
            "name": "resolverType",
            "type": "\"exact_text\"",
            "description": "resolverType is the \"exact_text\" member exposed by ExactTextResolver.",
            "required": true
          }
        ],
        "related": [
          "InputContract",
          "UserInput",
          "CommandCandidate",
          "InputProcessingContext",
          "Resolver"
        ]
      },
      {
        "name": "NumberResolver",
        "kind": "interface",
        "purpose": "NumberResolver defines the built-in resolver marker contracts contract with resolverType, canResolve, resolve.",
        "usage": "Use this marker type to refer to a built-in resolver contract by its resolverType literal.",
        "signatures": [
          "export interface NumberResolver extends Resolver {\n    readonly resolverType: \"number\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "canResolve is the method exposed by NumberResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "resolve is the method exposed by NumberResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "resolverType",
          "canResolve",
          "resolve"
        ],
        "properties": [
          {
            "name": "resolverType",
            "type": "\"number\"",
            "description": "resolverType is the \"number\" member exposed by NumberResolver.",
            "required": true
          }
        ],
        "related": [
          "InputContract",
          "UserInput",
          "CommandCandidate",
          "InputProcessingContext",
          "Resolver"
        ]
      },
      {
        "name": "IntegerResolver",
        "kind": "interface",
        "purpose": "IntegerResolver defines the built-in resolver marker contracts contract with resolverType, canResolve, resolve.",
        "usage": "Use this marker type to refer to a built-in resolver contract by its resolverType literal.",
        "signatures": [
          "export interface IntegerResolver extends Resolver {\n    readonly resolverType: \"integer\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "canResolve is the method exposed by IntegerResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "resolve is the method exposed by IntegerResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "resolverType",
          "canResolve",
          "resolve"
        ],
        "properties": [
          {
            "name": "resolverType",
            "type": "\"integer\"",
            "description": "resolverType is the \"integer\" member exposed by IntegerResolver.",
            "required": true
          }
        ],
        "related": [
          "InputContract",
          "UserInput",
          "CommandCandidate",
          "InputProcessingContext",
          "Resolver"
        ]
      },
      {
        "name": "EmailResolver",
        "kind": "interface",
        "purpose": "EmailResolver defines the built-in resolver marker contracts contract with resolverType, canResolve, resolve.",
        "usage": "Use this marker type to refer to a built-in resolver contract by its resolverType literal.",
        "signatures": [
          "export interface EmailResolver extends Resolver {\n    readonly resolverType: \"email\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "canResolve is the method exposed by EmailResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "resolve is the method exposed by EmailResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "resolverType",
          "canResolve",
          "resolve"
        ],
        "properties": [
          {
            "name": "resolverType",
            "type": "\"email\"",
            "description": "resolverType is the \"email\" member exposed by EmailResolver.",
            "required": true
          }
        ],
        "related": [
          "InputContract",
          "UserInput",
          "CommandCandidate",
          "InputProcessingContext",
          "Resolver"
        ]
      },
      {
        "name": "PhoneResolver",
        "kind": "interface",
        "purpose": "PhoneResolver defines the built-in resolver marker contracts contract with resolverType, canResolve, resolve.",
        "usage": "Use this marker type to refer to a built-in resolver contract by its resolverType literal.",
        "signatures": [
          "export interface PhoneResolver extends Resolver {\n    readonly resolverType: \"phone\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "canResolve is the method exposed by PhoneResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "resolve is the method exposed by PhoneResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "resolverType",
          "canResolve",
          "resolve"
        ],
        "properties": [
          {
            "name": "resolverType",
            "type": "\"phone\"",
            "description": "resolverType is the \"phone\" member exposed by PhoneResolver.",
            "required": true
          }
        ],
        "related": [
          "InputContract",
          "UserInput",
          "CommandCandidate",
          "InputProcessingContext",
          "Resolver"
        ]
      },
      {
        "name": "DateResolver",
        "kind": "interface",
        "purpose": "DateResolver defines the built-in resolver marker contracts contract with resolverType, canResolve, resolve.",
        "usage": "Use this marker type to refer to a built-in resolver contract by its resolverType literal.",
        "signatures": [
          "export interface DateResolver extends Resolver {\n    readonly resolverType: \"date\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "canResolve is the method exposed by DateResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "resolve is the method exposed by DateResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "resolverType",
          "canResolve",
          "resolve"
        ],
        "properties": [
          {
            "name": "resolverType",
            "type": "\"date\"",
            "description": "resolverType is the \"date\" member exposed by DateResolver.",
            "required": true
          }
        ],
        "related": [
          "InputContract",
          "UserInput",
          "CommandCandidate",
          "InputProcessingContext",
          "Resolver"
        ]
      },
      {
        "name": "RegexResolver",
        "kind": "interface",
        "purpose": "RegexResolver defines the built-in resolver marker contracts contract with resolverType, canResolve, resolve.",
        "usage": "Use this marker type to refer to a built-in resolver contract by its resolverType literal.",
        "signatures": [
          "export interface RegexResolver extends Resolver {\n    readonly resolverType: \"regex\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "canResolve is the method exposed by RegexResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "resolve is the method exposed by RegexResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "resolverType",
          "canResolve",
          "resolve"
        ],
        "properties": [
          {
            "name": "resolverType",
            "type": "\"regex\"",
            "description": "resolverType is the \"regex\" member exposed by RegexResolver.",
            "required": true
          }
        ],
        "related": [
          "InputContract",
          "UserInput",
          "CommandCandidate",
          "InputProcessingContext",
          "Resolver"
        ]
      },
      {
        "name": "MenuOptionResolver",
        "kind": "interface",
        "purpose": "MenuOptionResolver defines the built-in resolver marker contracts contract with resolverType, canResolve, resolve.",
        "usage": "Use this marker type to refer to a built-in resolver contract by its resolverType literal.",
        "signatures": [
          "export interface MenuOptionResolver extends Resolver {\n    readonly resolverType: \"menu_option\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "canResolve is the method exposed by MenuOptionResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "resolve is the method exposed by MenuOptionResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "resolverType",
          "canResolve",
          "resolve"
        ],
        "properties": [
          {
            "name": "resolverType",
            "type": "\"menu_option\"",
            "description": "resolverType is the \"menu_option\" member exposed by MenuOptionResolver.",
            "required": true
          }
        ],
        "related": [
          "InputContract",
          "UserInput",
          "CommandCandidate",
          "InputProcessingContext",
          "Resolver"
        ]
      },
      {
        "name": "AttachmentResolver",
        "kind": "interface",
        "purpose": "AttachmentResolver defines the built-in resolver marker contracts contract with resolverType, canResolve, resolve.",
        "usage": "Use this marker type to refer to a built-in resolver contract by its resolverType literal.",
        "signatures": [
          "export interface AttachmentResolver extends Resolver {\n    readonly resolverType: \"attachment\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "canResolve is the method exposed by AttachmentResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "resolve is the method exposed by AttachmentResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "resolverType",
          "canResolve",
          "resolve"
        ],
        "properties": [
          {
            "name": "resolverType",
            "type": "\"attachment\"",
            "description": "resolverType is the \"attachment\" member exposed by AttachmentResolver.",
            "required": true
          }
        ],
        "related": [
          "InputContract",
          "UserInput",
          "CommandCandidate",
          "InputProcessingContext",
          "Resolver"
        ]
      },
      {
        "name": "GlobalCommandResolver",
        "kind": "interface",
        "purpose": "GlobalCommandResolver defines the built-in resolver marker contracts contract with resolverType, canResolve, resolve.",
        "usage": "Use this marker type to refer to a built-in resolver contract by its resolverType literal.",
        "signatures": [
          "export interface GlobalCommandResolver extends Resolver {\n    readonly resolverType: \"global_command\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "canResolve is the method exposed by GlobalCommandResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "resolve is the method exposed by GlobalCommandResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "input is the UserInput member exposed by method.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "contract is the InputContract member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "context is the InputProcessingContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "resolverType",
          "canResolve",
          "resolve"
        ],
        "properties": [
          {
            "name": "resolverType",
            "type": "\"global_command\"",
            "description": "resolverType is the \"global_command\" member exposed by GlobalCommandResolver.",
            "required": true
          }
        ],
        "related": [
          "InputContract",
          "UserInput",
          "CommandCandidate",
          "InputProcessingContext",
          "Resolver"
        ]
      }
    ]
  },
  {
    "title": "Built-in Validator Marker Contracts",
    "summary": "Marker interfaces for built-in validator types, not concrete exported classes.",
    "exports": [
      "RequiredValidator",
      "RegexValidator",
      "EmailValidator",
      "PhoneValidator",
      "IntegerValidator",
      "NumberValidator",
      "MinLengthValidator",
      "MaxLengthValidator",
      "EnumValidator",
      "AttachmentValidator"
    ],
    "entries": [
      {
        "name": "RequiredValidator",
        "kind": "interface",
        "purpose": "RequiredValidator defines the built-in validator marker contracts contract with validatorType, validate.",
        "usage": "Use this marker type to refer to a built-in validator contract by its validatorType literal.",
        "signatures": [
          "export interface RequiredValidator extends Validator {\n    readonly validatorType: \"required\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "validate is the method exposed by RequiredValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "value is the unknown member exposed by method.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "definition is the ValidatorDefinition member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "context is the ValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "validatorType",
          "validate"
        ],
        "properties": [
          {
            "name": "validatorType",
            "type": "\"required\"",
            "description": "validatorType is the \"required\" member exposed by RequiredValidator.",
            "required": true
          }
        ],
        "related": [
          "ValidatorDefinition",
          "ValidationResult",
          "Validator",
          "ValidationContext"
        ]
      },
      {
        "name": "RegexValidator",
        "kind": "interface",
        "purpose": "RegexValidator defines the built-in validator marker contracts contract with validatorType, validate.",
        "usage": "Use this marker type to refer to a built-in validator contract by its validatorType literal.",
        "signatures": [
          "export interface RegexValidator extends Validator {\n    readonly validatorType: \"regex\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "validate is the method exposed by RegexValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "value is the unknown member exposed by method.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "definition is the ValidatorDefinition member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "context is the ValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "validatorType",
          "validate"
        ],
        "properties": [
          {
            "name": "validatorType",
            "type": "\"regex\"",
            "description": "validatorType is the \"regex\" member exposed by RegexValidator.",
            "required": true
          }
        ],
        "related": [
          "ValidatorDefinition",
          "ValidationResult",
          "Validator",
          "ValidationContext"
        ]
      },
      {
        "name": "EmailValidator",
        "kind": "interface",
        "purpose": "EmailValidator defines the built-in validator marker contracts contract with validatorType, validate.",
        "usage": "Use this marker type to refer to a built-in validator contract by its validatorType literal.",
        "signatures": [
          "export interface EmailValidator extends Validator {\n    readonly validatorType: \"email\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "validate is the method exposed by EmailValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "value is the unknown member exposed by method.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "definition is the ValidatorDefinition member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "context is the ValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "validatorType",
          "validate"
        ],
        "properties": [
          {
            "name": "validatorType",
            "type": "\"email\"",
            "description": "validatorType is the \"email\" member exposed by EmailValidator.",
            "required": true
          }
        ],
        "related": [
          "ValidatorDefinition",
          "ValidationResult",
          "Validator",
          "ValidationContext"
        ]
      },
      {
        "name": "PhoneValidator",
        "kind": "interface",
        "purpose": "PhoneValidator defines the built-in validator marker contracts contract with validatorType, validate.",
        "usage": "Use this marker type to refer to a built-in validator contract by its validatorType literal.",
        "signatures": [
          "export interface PhoneValidator extends Validator {\n    readonly validatorType: \"phone\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "validate is the method exposed by PhoneValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "value is the unknown member exposed by method.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "definition is the ValidatorDefinition member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "context is the ValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "validatorType",
          "validate"
        ],
        "properties": [
          {
            "name": "validatorType",
            "type": "\"phone\"",
            "description": "validatorType is the \"phone\" member exposed by PhoneValidator.",
            "required": true
          }
        ],
        "related": [
          "ValidatorDefinition",
          "ValidationResult",
          "Validator",
          "ValidationContext"
        ]
      },
      {
        "name": "IntegerValidator",
        "kind": "interface",
        "purpose": "IntegerValidator defines the built-in validator marker contracts contract with validatorType, validate.",
        "usage": "Use this marker type to refer to a built-in validator contract by its validatorType literal.",
        "signatures": [
          "export interface IntegerValidator extends Validator {\n    readonly validatorType: \"integer\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "validate is the method exposed by IntegerValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "value is the unknown member exposed by method.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "definition is the ValidatorDefinition member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "context is the ValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "validatorType",
          "validate"
        ],
        "properties": [
          {
            "name": "validatorType",
            "type": "\"integer\"",
            "description": "validatorType is the \"integer\" member exposed by IntegerValidator.",
            "required": true
          }
        ],
        "related": [
          "ValidatorDefinition",
          "ValidationResult",
          "Validator",
          "ValidationContext"
        ]
      },
      {
        "name": "NumberValidator",
        "kind": "interface",
        "purpose": "NumberValidator defines the built-in validator marker contracts contract with validatorType, validate.",
        "usage": "Use this marker type to refer to a built-in validator contract by its validatorType literal.",
        "signatures": [
          "export interface NumberValidator extends Validator {\n    readonly validatorType: \"number\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "validate is the method exposed by NumberValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "value is the unknown member exposed by method.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "definition is the ValidatorDefinition member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "context is the ValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "validatorType",
          "validate"
        ],
        "properties": [
          {
            "name": "validatorType",
            "type": "\"number\"",
            "description": "validatorType is the \"number\" member exposed by NumberValidator.",
            "required": true
          }
        ],
        "related": [
          "ValidatorDefinition",
          "ValidationResult",
          "Validator",
          "ValidationContext"
        ]
      },
      {
        "name": "MinLengthValidator",
        "kind": "interface",
        "purpose": "MinLengthValidator defines the built-in validator marker contracts contract with validatorType, validate.",
        "usage": "Use this marker type to refer to a built-in validator contract by its validatorType literal.",
        "signatures": [
          "export interface MinLengthValidator extends Validator {\n    readonly validatorType: \"min_length\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "validate is the method exposed by MinLengthValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "value is the unknown member exposed by method.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "definition is the ValidatorDefinition member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "context is the ValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "validatorType",
          "validate"
        ],
        "properties": [
          {
            "name": "validatorType",
            "type": "\"min_length\"",
            "description": "validatorType is the \"min_length\" member exposed by MinLengthValidator.",
            "required": true
          }
        ],
        "related": [
          "ValidatorDefinition",
          "ValidationResult",
          "Validator",
          "ValidationContext"
        ]
      },
      {
        "name": "MaxLengthValidator",
        "kind": "interface",
        "purpose": "MaxLengthValidator defines the built-in validator marker contracts contract with validatorType, validate.",
        "usage": "Use this marker type to refer to a built-in validator contract by its validatorType literal.",
        "signatures": [
          "export interface MaxLengthValidator extends Validator {\n    readonly validatorType: \"max_length\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "validate is the method exposed by MaxLengthValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "value is the unknown member exposed by method.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "definition is the ValidatorDefinition member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "context is the ValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "validatorType",
          "validate"
        ],
        "properties": [
          {
            "name": "validatorType",
            "type": "\"max_length\"",
            "description": "validatorType is the \"max_length\" member exposed by MaxLengthValidator.",
            "required": true
          }
        ],
        "related": [
          "ValidatorDefinition",
          "ValidationResult",
          "Validator",
          "ValidationContext"
        ]
      },
      {
        "name": "EnumValidator",
        "kind": "interface",
        "purpose": "EnumValidator defines the built-in validator marker contracts contract with validatorType, validate.",
        "usage": "Use this marker type to refer to a built-in validator contract by its validatorType literal.",
        "signatures": [
          "export interface EnumValidator extends Validator {\n    readonly validatorType: \"enum\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "validate is the method exposed by EnumValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "value is the unknown member exposed by method.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "definition is the ValidatorDefinition member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "context is the ValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "validatorType",
          "validate"
        ],
        "properties": [
          {
            "name": "validatorType",
            "type": "\"enum\"",
            "description": "validatorType is the \"enum\" member exposed by EnumValidator.",
            "required": true
          }
        ],
        "related": [
          "ValidatorDefinition",
          "ValidationResult",
          "Validator",
          "ValidationContext"
        ]
      },
      {
        "name": "AttachmentValidator",
        "kind": "interface",
        "purpose": "AttachmentValidator defines the built-in validator marker contracts contract with validatorType, validate.",
        "usage": "Use this marker type to refer to a built-in validator contract by its validatorType literal.",
        "signatures": [
          "export interface AttachmentValidator extends Validator {\n    readonly validatorType: \"attachment\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "validate is the method exposed by AttachmentValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "value is the unknown member exposed by method.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "definition is the ValidatorDefinition member exposed by method.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "context is the ValidationContext member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "validatorType",
          "validate"
        ],
        "properties": [
          {
            "name": "validatorType",
            "type": "\"attachment\"",
            "description": "validatorType is the \"attachment\" member exposed by AttachmentValidator.",
            "required": true
          }
        ],
        "related": [
          "ValidatorDefinition",
          "ValidationResult",
          "Validator",
          "ValidationContext"
        ]
      }
    ]
  },
  {
    "title": "Runtime Support",
    "summary": "In-memory repositories and deterministic helpers from dialit/runtime-support.",
    "exports": [
      "VariableLookupResult",
      "clone",
      "InMemoryFlowVersionRepository",
      "InMemoryConversationRepository",
      "InMemoryConversationStateRepository",
      "InMemoryConversationEventRepository",
      "InMemoryDecisionTraceRepository",
      "createDefaultClock",
      "createDefaultIdGenerator",
      "createEventFactory",
      "createEvent",
      "createTextMessage",
      "createTrace",
      "createMissingVariableError",
      "getVariable",
      "requireVariable",
      "setVariable",
      "unsetVariable",
      "invalidateVariable"
    ],
    "entries": [
      {
        "name": "runtime-support",
        "kind": "module",
        "purpose": "Helper entry point for in-memory repositories, deterministic clocks and ids, event and message factories, trace creation, and variable utilities.",
        "usage": "Use this entry point for examples, tests, prototypes, local storage, and custom handler helpers while keeping production persistence in your application.",
        "fields": [
          "InMemoryFlowVersionRepository",
          "InMemoryConversationRepository",
          "InMemoryConversationStateRepository",
          "InMemoryConversationEventRepository",
          "InMemoryDecisionTraceRepository",
          "createTextMessage",
          "setVariable"
        ],
        "properties": [
          {
            "name": "InMemoryFlowVersionRepository",
            "type": "class",
            "description": "InMemoryFlowVersionRepository is the export member exposed by runtime-support.",
            "required": true
          },
          {
            "name": "InMemoryConversationRepository",
            "type": "class",
            "description": "InMemoryConversationRepository is the export member exposed by runtime-support.",
            "required": true
          },
          {
            "name": "InMemoryConversationStateRepository",
            "type": "class",
            "description": "InMemoryConversationStateRepository is the export member exposed by runtime-support.",
            "required": true
          },
          {
            "name": "InMemoryConversationEventRepository",
            "type": "class",
            "description": "InMemoryConversationEventRepository is the export member exposed by runtime-support.",
            "required": true
          },
          {
            "name": "InMemoryDecisionTraceRepository",
            "type": "class",
            "description": "InMemoryDecisionTraceRepository is the export member exposed by runtime-support.",
            "required": true
          },
          {
            "name": "createTextMessage",
            "type": "function",
            "description": "Creates text message from runtime-support.",
            "required": true
          },
          {
            "name": "setVariable",
            "type": "function",
            "description": "setVariable is the export member exposed by runtime-support.",
            "required": true
          }
        ],
        "related": [
          "InMemoryFlowVersionRepository",
          "InMemoryConversationRepository",
          "InMemoryConversationStateRepository",
          "InMemoryConversationEventRepository",
          "InMemoryDecisionTraceRepository",
          "createTextMessage",
          "setVariable"
        ]
      },
      {
        "name": "VariableLookupResult",
        "kind": "union type",
        "purpose": "VariableLookupResult is the public union in Runtime Support that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use VariableLookupResult to inspect the structured outcome returned by the corresponding runtime, validation, or provider operation.",
        "signatures": [
          "export type VariableLookupResult = {\n    ok: true;\n    value: VariableValue;\n} | {\n    ok: false;\n    error: MissingVariableReferenceRuntimeError;\n};"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "| { ok: true; value: VariableValue }\n    | { ok: false; error: MissingVariableReferenceRuntimeError }",
            "description": "VariableLookupResult resolves to | { ok: true; value: VariableValue }\n    | { ok: false; error: MissingVariableReferenceRuntimeError }.",
            "required": true
          }
        ],
        "related": [
          "VariableValue",
          "MissingVariableReferenceRuntimeError"
        ]
      },
      {
        "name": "clone",
        "kind": "function",
        "purpose": "clone is a public function exported from src/runtime-support.ts.",
        "usage": "Use this helper from dialit/runtime-support for tests, examples, prototypes, and custom handlers.",
        "signatures": [
          "export function clone<T>(value: T): T;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "value",
            "type": "T",
            "description": "value is the T member exposed by clone.",
            "required": true
          }
        ],
        "returns": {
          "type": "T",
          "description": "Return value produced by clone."
        },
        "example": "const cloned = clone(flowVersion);",
        "related": []
      },
      {
        "name": "InMemoryFlowVersionRepository",
        "kind": "class",
        "purpose": "InMemoryFlowVersionRepository is the runtime-support implementation of the public repository or helper contract shown in its class signature.",
        "usage": "Use InMemoryFlowVersionRepository when your application persists the related runtime record outside the engine.",
        "signatures": [
          "export class InMemoryFlowVersionRepository implements FlowVersionRepository {\n  async getById(flowVersionId: FlowVersionId): Promise<FlowVersion | undefined> {\n        const version = this.versions.get(flowVersionId);\n        return version === undefined ? undefined : clone(version);\n    };\n  async save(version: FlowVersion): Promise<void> {\n        this.versions.set(version.flowVersionId, clone(version));\n    };\n}"
        ],
        "methods": [
          {
            "name": "getById",
            "signature": "async getById(flowVersionId: FlowVersionId): Promise<FlowVersion | undefined> {\n        const version = this.versions.get(flowVersionId);\n        return version === undefined ? undefined : clone(version);\n    }",
            "description": "Loads a record by id.",
            "parameters": [
              {
                "name": "flowVersionId",
                "type": "FlowVersionId",
                "description": "flowVersionId is the FlowVersionId member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<FlowVersion | undefined>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "save",
            "signature": "async save(version: FlowVersion): Promise<void> {\n        this.versions.set(version.flowVersionId, clone(version));\n    }",
            "description": "Persists a record.",
            "parameters": [
              {
                "name": "version",
                "type": "FlowVersion",
                "description": "version is the FlowVersion member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "getById",
          "save"
        ],
        "example": "const repository = new InMemoryFlowVersionRepository();",
        "related": [
          "FlowVersionId",
          "FlowVersion",
          "FlowVersionRepository",
          "clone"
        ]
      },
      {
        "name": "InMemoryConversationRepository",
        "kind": "class",
        "purpose": "InMemoryConversationRepository is the runtime-support implementation of the public repository or helper contract shown in its class signature.",
        "usage": "Use InMemoryConversationRepository when your application persists the related runtime record outside the engine.",
        "signatures": [
          "export class InMemoryConversationRepository implements ConversationRepository {\n  async getById(conversationId: ConversationId): Promise<Conversation | undefined> {\n        const conversation = this.conversations.get(conversationId);\n        return conversation === undefined ? undefined : clone(conversation);\n    };\n  async save(conversation: Conversation): Promise<void> {\n        this.conversations.set(conversation.conversationId, clone(conversation));\n    };\n}"
        ],
        "methods": [
          {
            "name": "getById",
            "signature": "async getById(conversationId: ConversationId): Promise<Conversation | undefined> {\n        const conversation = this.conversations.get(conversationId);\n        return conversation === undefined ? undefined : clone(conversation);\n    }",
            "description": "Loads a record by id.",
            "parameters": [
              {
                "name": "conversationId",
                "type": "ConversationId",
                "description": "Conversation identifier.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<Conversation | undefined>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "save",
            "signature": "async save(conversation: Conversation): Promise<void> {\n        this.conversations.set(conversation.conversationId, clone(conversation));\n    }",
            "description": "Persists a record.",
            "parameters": [
              {
                "name": "conversation",
                "type": "Conversation",
                "description": "conversation is the Conversation member exposed by method.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "getById",
          "save"
        ],
        "example": "const repository = new InMemoryConversationRepository();",
        "related": [
          "ConversationId",
          "Conversation",
          "ConversationRepository",
          "clone"
        ]
      },
      {
        "name": "InMemoryConversationStateRepository",
        "kind": "class",
        "purpose": "InMemoryConversationStateRepository is the runtime-support implementation of the public repository or helper contract shown in its class signature.",
        "usage": "Use InMemoryConversationStateRepository when your application persists the related runtime record outside the engine.",
        "signatures": [
          "export class InMemoryConversationStateRepository implements ConversationStateRepository {\n  async getByConversationId(conversationId: ConversationId): Promise<ConversationState | undefined> {\n        const state = this.states.get(conversationId);\n        return state === undefined ? undefined : clone(state);\n    };\n  async save(state: ConversationState): Promise<void> {\n        this.states.set(state.conversationId, clone(state));\n    };\n}"
        ],
        "methods": [
          {
            "name": "getByConversationId",
            "signature": "async getByConversationId(conversationId: ConversationId): Promise<ConversationState | undefined> {\n        const state = this.states.get(conversationId);\n        return state === undefined ? undefined : clone(state);\n    }",
            "description": "Reads by conversation id from InMemoryConversationStateRepository.",
            "parameters": [
              {
                "name": "conversationId",
                "type": "ConversationId",
                "description": "Conversation identifier.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationState | undefined>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "save",
            "signature": "async save(state: ConversationState): Promise<void> {\n        this.states.set(state.conversationId, clone(state));\n    }",
            "description": "Persists a record.",
            "parameters": [
              {
                "name": "state",
                "type": "ConversationState",
                "description": "Current conversation state.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "getByConversationId",
          "save"
        ],
        "example": "const repository = new InMemoryConversationStateRepository();",
        "related": [
          "ConversationId",
          "ConversationState",
          "ConversationStateRepository",
          "clone"
        ]
      },
      {
        "name": "InMemoryConversationEventRepository",
        "kind": "class",
        "purpose": "InMemoryConversationEventRepository is the runtime-support implementation of the public repository or helper contract shown in its class signature.",
        "usage": "Use InMemoryConversationEventRepository when your application persists the related runtime record outside the engine.",
        "signatures": [
          "export class InMemoryConversationEventRepository implements ConversationEventRepository {\n  async append(events: ConversationEvent[]): Promise<void> {\n        this.events.push(...events.map((event) => clone(event)));\n    };\n  async listByConversationId(conversationId: ConversationId): Promise<ConversationEvent[]> {\n        return this.events\n            .filter((event) => event.conversationId === conversationId)\n            .map((event) => clone(event));\n    };\n}"
        ],
        "methods": [
          {
            "name": "append",
            "signature": "async append(events: ConversationEvent[]): Promise<void> {\n        this.events.push(...events.map((event) => clone(event)));\n    }",
            "description": "append is the method exposed by InMemoryConversationEventRepository.",
            "parameters": [
              {
                "name": "events",
                "type": "ConversationEvent[]",
                "description": "Runtime events emitted during execution.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "listByConversationId",
            "signature": "async listByConversationId(conversationId: ConversationId): Promise<ConversationEvent[]> {\n        return this.events\n            .filter((event) => event.conversationId === conversationId)\n            .map((event) => clone(event));\n    }",
            "description": "Lists stored records for one conversation id.",
            "parameters": [
              {
                "name": "conversationId",
                "type": "ConversationId",
                "description": "Conversation identifier.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationEvent[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "append",
          "listByConversationId"
        ],
        "example": "const repository = new InMemoryConversationEventRepository();",
        "related": [
          "ConversationId",
          "ConversationEvent",
          "ConversationEventRepository",
          "clone"
        ]
      },
      {
        "name": "InMemoryDecisionTraceRepository",
        "kind": "class",
        "purpose": "InMemoryDecisionTraceRepository is the runtime-support implementation of the public repository or helper contract shown in its class signature.",
        "usage": "Use InMemoryDecisionTraceRepository when your application persists the related runtime record outside the engine.",
        "signatures": [
          "export class InMemoryDecisionTraceRepository implements DecisionTraceRepository {\n  async save(trace: DecisionTrace): Promise<void> {\n        this.traces.push(clone(trace));\n    };\n  async listByConversationId(conversationId: ConversationId): Promise<DecisionTrace[]> {\n        return this.traces\n            .filter((trace) => trace.conversationId === conversationId)\n            .map((trace) => clone(trace));\n    };\n}"
        ],
        "methods": [
          {
            "name": "save",
            "signature": "async save(trace: DecisionTrace): Promise<void> {\n        this.traces.push(clone(trace));\n    }",
            "description": "Persists a record.",
            "parameters": [
              {
                "name": "trace",
                "type": "DecisionTrace",
                "description": "Trace fragment or decision trace evidence for this contract.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "Return value produced by this method."
            }
          },
          {
            "name": "listByConversationId",
            "signature": "async listByConversationId(conversationId: ConversationId): Promise<DecisionTrace[]> {\n        return this.traces\n            .filter((trace) => trace.conversationId === conversationId)\n            .map((trace) => clone(trace));\n    }",
            "description": "Lists stored records for one conversation id.",
            "parameters": [
              {
                "name": "conversationId",
                "type": "ConversationId",
                "description": "Conversation identifier.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<DecisionTrace[]>",
              "description": "Return value produced by this method."
            }
          }
        ],
        "fields": [
          "save",
          "listByConversationId"
        ],
        "example": "const repository = new InMemoryDecisionTraceRepository();",
        "related": [
          "ConversationId",
          "DecisionTrace",
          "DecisionTraceRepository",
          "clone"
        ]
      },
      {
        "name": "createDefaultClock",
        "kind": "function",
        "purpose": "createDefaultClock is a public function exported from src/runtime-support.ts.",
        "usage": "Use this helper from dialit/runtime-support for tests, examples, prototypes, and custom handlers.",
        "signatures": [
          "export function createDefaultClock(): RuntimeClock;"
        ],
        "fields": [],
        "parameters": [],
        "returns": {
          "type": "RuntimeClock",
          "description": "Return value produced by createDefaultClock."
        },
        "example": "const clock = createDefaultClock();\nconst timestamp = clock.now();",
        "related": [
          "RuntimeClock"
        ]
      },
      {
        "name": "createDefaultIdGenerator",
        "kind": "function",
        "purpose": "createDefaultIdGenerator is a public function exported from src/runtime-support.ts.",
        "usage": "Use this helper from dialit/runtime-support for tests, examples, prototypes, and custom handlers.",
        "signatures": [
          "export function createDefaultIdGenerator(): IdGenerator;"
        ],
        "fields": [],
        "parameters": [],
        "returns": {
          "type": "IdGenerator",
          "description": "Return value produced by createDefaultIdGenerator."
        },
        "example": "const ids = createDefaultIdGenerator();\nconst conversationId = ids.newConversationId();",
        "related": [
          "IdGenerator"
        ]
      },
      {
        "name": "createEventFactory",
        "kind": "function",
        "purpose": "createEventFactory is a public function exported from src/runtime-support.ts.",
        "usage": "Use this helper from dialit/runtime-support for tests, examples, prototypes, and custom handlers.",
        "signatures": [
          "export function createEventFactory(\n    clock: RuntimeClock = createDefaultClock(),\n    idGenerator: IdGenerator = createDefaultIdGenerator()\n): EventFactory;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "clock",
            "type": "RuntimeClock",
            "description": "clock is the optional RuntimeClock member exposed by createEventFactory.",
            "required": false
          },
          {
            "name": "idGenerator",
            "type": "IdGenerator",
            "description": "idGenerator is the optional IdGenerator member exposed by createEventFactory.",
            "required": false
          }
        ],
        "returns": {
          "type": "EventFactory",
          "description": "Return value produced by createEventFactory."
        },
        "example": "const factory = createEventFactory();\nconst event = factory.createEvent({\n  conversationId: \"conversation-1\",\n  flowVersionId: \"support_assistant_v1\",\n  type: \"conversation_started\",\n});",
        "related": [
          "RuntimeClock",
          "IdGenerator",
          "EventFactory",
          "createDefaultClock",
          "createDefaultIdGenerator"
        ]
      },
      {
        "name": "createEvent",
        "kind": "function",
        "purpose": "createEvent is a public function exported from src/runtime-support.ts.",
        "usage": "Use this helper from dialit/runtime-support for tests, examples, prototypes, and custom handlers.",
        "signatures": [
          "export function createEvent(\n    request: CreateEventRequest,\n    clock: RuntimeClock = createDefaultClock(),\n    idGenerator: IdGenerator = createDefaultIdGenerator()\n): ConversationEvent;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "request",
            "type": "CreateEventRequest",
            "description": "request is the CreateEventRequest member exposed by createEvent.",
            "required": true
          },
          {
            "name": "clock",
            "type": "RuntimeClock",
            "description": "clock is the optional RuntimeClock member exposed by createEvent.",
            "required": false
          },
          {
            "name": "idGenerator",
            "type": "IdGenerator",
            "description": "idGenerator is the optional IdGenerator member exposed by createEvent.",
            "required": false
          }
        ],
        "returns": {
          "type": "ConversationEvent",
          "description": "Return value produced by createEvent."
        },
        "example": "const event = createEvent({\n  conversationId: \"conversation-1\",\n  flowVersionId: \"support_assistant_v1\",\n  type: \"conversation_started\",\n});",
        "related": [
          "ConversationEvent",
          "RuntimeClock",
          "IdGenerator",
          "CreateEventRequest",
          "createDefaultClock",
          "createDefaultIdGenerator"
        ]
      },
      {
        "name": "createTextMessage",
        "kind": "function",
        "purpose": "createTextMessage is a public function exported from src/runtime-support.ts.",
        "usage": "Use this helper from dialit/runtime-support for tests, examples, prototypes, and custom handlers.",
        "signatures": [
          "export function createTextMessage(\n    request: CreateTextMessageRequest,\n    clock: RuntimeClock = createDefaultClock(),\n    idGenerator: IdGenerator = createDefaultIdGenerator()\n): OutboundMessage;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "request",
            "type": "CreateTextMessageRequest",
            "description": "request is the CreateTextMessageRequest member exposed by createTextMessage.",
            "required": true
          },
          {
            "name": "clock",
            "type": "RuntimeClock",
            "description": "clock is the optional RuntimeClock member exposed by createTextMessage.",
            "required": false
          },
          {
            "name": "idGenerator",
            "type": "IdGenerator",
            "description": "idGenerator is the optional IdGenerator member exposed by createTextMessage.",
            "required": false
          }
        ],
        "returns": {
          "type": "OutboundMessage",
          "description": "Return value produced by createTextMessage."
        },
        "example": "const message = createTextMessage({\n  conversationId: \"conversation-1\",\n  turnId: \"turn-1\",\n  text: \"Welcome to support.\",\n});",
        "related": [
          "OutboundMessage",
          "RuntimeClock",
          "IdGenerator",
          "CreateTextMessageRequest",
          "createDefaultClock",
          "createDefaultIdGenerator"
        ]
      },
      {
        "name": "createTrace",
        "kind": "function",
        "purpose": "createTrace is a public function exported from src/runtime-support.ts.",
        "usage": "Use this helper from dialit/runtime-support for tests, examples, prototypes, and custom handlers.",
        "signatures": [
          "export function createTrace(\n    input: TraceBuildInput,\n    clock: RuntimeClock = createDefaultClock(),\n    idGenerator: IdGenerator = createDefaultIdGenerator()\n): DecisionTrace;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "input",
            "type": "TraceBuildInput",
            "description": "input is the TraceBuildInput member exposed by createTrace.",
            "required": true
          },
          {
            "name": "clock",
            "type": "RuntimeClock",
            "description": "clock is the optional RuntimeClock member exposed by createTrace.",
            "required": false
          },
          {
            "name": "idGenerator",
            "type": "IdGenerator",
            "description": "idGenerator is the optional IdGenerator member exposed by createTrace.",
            "required": false
          }
        ],
        "returns": {
          "type": "DecisionTrace",
          "description": "Return value produced by createTrace."
        },
        "example": "const trace = createTrace({\n  conversationId: \"conversation-1\",\n  turnId: \"turn-1\",\n  flowVersionId: \"support_assistant_v1\",\n  fragments: [],\n  events: [],\n  messages: [],\n  variablePatches: [],\n});",
        "related": [
          "DecisionTrace",
          "TraceBuildInput",
          "RuntimeClock",
          "IdGenerator",
          "createDefaultClock",
          "createDefaultIdGenerator"
        ]
      },
      {
        "name": "createMissingVariableError",
        "kind": "function",
        "purpose": "createMissingVariableError is a public function exported from src/runtime-support.ts.",
        "usage": "Use this helper from dialit/runtime-support for tests, examples, prototypes, and custom handlers.",
        "signatures": [
          "export function createMissingVariableError(\n    variableId: VariableId,\n    scope: VariableScope = defaultVariableScope\n): MissingVariableReferenceRuntimeError;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "variableId",
            "type": "VariableId",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "scope is the optional VariableScope member exposed by createMissingVariableError.",
            "required": false
          }
        ],
        "returns": {
          "type": "MissingVariableReferenceRuntimeError",
          "description": "Return value produced by createMissingVariableError."
        },
        "example": "const error = createMissingVariableError(\"contactReason\", \"conversation\");",
        "related": [
          "VariableId",
          "VariableScope",
          "MissingVariableReferenceRuntimeError"
        ]
      },
      {
        "name": "getVariable",
        "kind": "function",
        "purpose": "getVariable is a public function exported from src/runtime-support.ts.",
        "usage": "Use this helper from dialit/runtime-support for tests, examples, prototypes, and custom handlers.",
        "signatures": [
          "export function getVariable(\n    state: RuntimeVariableState,\n    variableId: VariableId,\n    scope: VariableScope = defaultVariableScope\n): VariableLookupResult;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "state",
            "type": "RuntimeVariableState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "VariableId",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "scope is the optional VariableScope member exposed by getVariable.",
            "required": false
          }
        ],
        "returns": {
          "type": "VariableLookupResult",
          "description": "Return value produced by getVariable."
        },
        "example": "const lookup = getVariable(state, \"contactReason\");\nif (lookup.ok) {\n  lookup.value.value;\n}",
        "related": [
          "VariableId",
          "VariableScope",
          "VariableLookupResult"
        ]
      },
      {
        "name": "requireVariable",
        "kind": "function",
        "purpose": "requireVariable is a public function exported from src/runtime-support.ts.",
        "usage": "Use this helper from dialit/runtime-support for tests, examples, prototypes, and custom handlers.",
        "signatures": [
          "export function requireVariable(\n    state: RuntimeVariableState,\n    variableId: VariableId,\n    scope: VariableScope = defaultVariableScope\n): VariableValue;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "state",
            "type": "RuntimeVariableState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "VariableId",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "scope is the optional VariableScope member exposed by requireVariable.",
            "required": false
          }
        ],
        "returns": {
          "type": "VariableValue",
          "description": "Return value produced by requireVariable."
        },
        "example": "const contactReason = requireVariable(state, \"contactReason\");",
        "related": [
          "VariableId",
          "VariableScope",
          "VariableValue"
        ]
      },
      {
        "name": "setVariable",
        "kind": "function",
        "purpose": "setVariable is a public function exported from src/runtime-support.ts.",
        "usage": "Use this helper from dialit/runtime-support for tests, examples, prototypes, and custom handlers.",
        "signatures": [
          "export function setVariable(\n    state: RuntimeVariableState,\n    variableId: VariableId,\n    value: unknown,\n    source: VariableValueSource,\n    options?: {\n        scope?: VariableScope;\n        metadata?: Record<string, unknown>;\n        clock?: RuntimeClock;\n        turnId?: TurnId;\n    }\n): VariablePatch;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "state",
            "type": "RuntimeVariableState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "VariableId",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "value",
            "type": "unknown",
            "description": "value is the unknown member exposed by setVariable.",
            "required": true
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Runtime source that produced a value, patch, or trace fragment.",
            "required": true
          },
          {
            "name": "options",
            "type": "{\n        scope?: VariableScope;\n        metadata?: Record<string, unknown>;\n        clock?: RuntimeClock;\n        turnId?: TurnId;\n    }",
            "description": "Configuration object interpreted by the registered normalizer, extractor, or validator.",
            "required": false
          }
        ],
        "returns": {
          "type": "VariablePatch",
          "description": "Return value produced by setVariable."
        },
        "example": "const patch = setVariable(state, \"contactReason\", \"technical_support\", \"operation\");",
        "related": [
          "VariableId",
          "VariableValueSource"
        ]
      },
      {
        "name": "unsetVariable",
        "kind": "function",
        "purpose": "unsetVariable is a public function exported from src/runtime-support.ts.",
        "usage": "Use this helper from dialit/runtime-support for tests, examples, prototypes, and custom handlers.",
        "signatures": [
          "export function unsetVariable(\n    state: RuntimeVariableState,\n    variableId: VariableId,\n    source: VariableValueSource,\n    options?: {\n        scope?: VariableScope;\n        metadata?: Record<string, unknown>;\n        clock?: RuntimeClock;\n        turnId?: TurnId;\n    }\n): VariablePatch;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "state",
            "type": "RuntimeVariableState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "VariableId",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Runtime source that produced a value, patch, or trace fragment.",
            "required": true
          },
          {
            "name": "options",
            "type": "{\n        scope?: VariableScope;\n        metadata?: Record<string, unknown>;\n        clock?: RuntimeClock;\n        turnId?: TurnId;\n    }",
            "description": "Configuration object interpreted by the registered normalizer, extractor, or validator.",
            "required": false
          }
        ],
        "returns": {
          "type": "VariablePatch",
          "description": "Return value produced by unsetVariable."
        },
        "example": "const patch = unsetVariable(state, \"contactReason\", \"operation\");",
        "related": [
          "VariableId",
          "VariableValueSource"
        ]
      },
      {
        "name": "invalidateVariable",
        "kind": "function",
        "purpose": "invalidateVariable is a public function exported from src/runtime-support.ts.",
        "usage": "Use this helper from dialit/runtime-support for tests, examples, prototypes, and custom handlers.",
        "signatures": [
          "export function invalidateVariable(\n    state: RuntimeVariableState,\n    variableId: VariableId,\n    source: VariableValueSource,\n    reason?: string,\n    options?: {\n        scope?: VariableScope;\n        metadata?: Record<string, unknown>;\n        clock?: RuntimeClock;\n        turnId?: TurnId;\n    }\n): VariablePatch;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "state",
            "type": "RuntimeVariableState",
            "description": "Current conversation state.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "VariableId",
            "description": "Variable identifier read, written, validated, or traced.",
            "required": true
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Runtime source that produced a value, patch, or trace fragment.",
            "required": true
          },
          {
            "name": "reason",
            "type": "string",
            "description": "Human-readable reason for rejection, invalidation, handoff, or trace output.",
            "required": false
          },
          {
            "name": "options",
            "type": "{\n        scope?: VariableScope;\n        metadata?: Record<string, unknown>;\n        clock?: RuntimeClock;\n        turnId?: TurnId;\n    }",
            "description": "Configuration object interpreted by the registered normalizer, extractor, or validator.",
            "required": false
          }
        ],
        "returns": {
          "type": "VariablePatch",
          "description": "Return value produced by invalidateVariable."
        },
        "example": "const patch = invalidateVariable(state, \"contactReason\", \"operation\", \"Outdated value\");",
        "related": [
          "VariableId",
          "VariableValueSource"
        ]
      }
    ]
  },
  {
    "title": "Primitive IDs and Shared Base Types",
    "summary": "String id aliases, JSON values, metadata, lifecycle statuses, and shared labels used throughout the public API.",
    "exports": [
      "EntityId",
      "FlowId",
      "FlowVersionId",
      "StepId",
      "RouteId",
      "BranchId",
      "OptionId",
      "VariableId",
      "ActionId",
      "ResponseId",
      "OperationId",
      "EventId",
      "ConversationId",
      "TurnId",
      "MessageId",
      "TraceId",
      "ValidationIssueId",
      "CandidateId",
      "TaskId",
      "AttachmentId",
      "ExecutionFrameId",
      "CustomOperationId",
      "HandoffId",
      "ISODateString",
      "JsonPrimitive",
      "JsonValue",
      "JsonObject",
      "Metadata",
      "LabelledEntity",
      "ConversationStatus",
      "FlowVersionStatus",
      "StepOutcome"
    ],
    "entries": [
      {
        "name": "EntityId",
        "kind": "type",
        "purpose": "EntityId is a string identifier type used where Dialit refers to entity.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type EntityId = string;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "string",
            "description": "EntityId resolves to string.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "FlowId",
        "kind": "type",
        "purpose": "FlowId is a string identifier type used where Dialit refers to flow.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type FlowId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "FlowId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "FlowVersionId",
        "kind": "type",
        "purpose": "FlowVersionId is a string identifier type used where Dialit refers to flow version.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type FlowVersionId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "FlowVersionId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "StepId",
        "kind": "type",
        "purpose": "StepId is a string identifier type used where Dialit refers to step.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type StepId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "StepId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "RouteId",
        "kind": "type",
        "purpose": "RouteId is a string identifier type used where Dialit refers to route.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type RouteId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "RouteId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "BranchId",
        "kind": "type",
        "purpose": "BranchId is a string identifier type used where Dialit refers to branch.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type BranchId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "BranchId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "OptionId",
        "kind": "type",
        "purpose": "OptionId is a string identifier type used where Dialit refers to option.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type OptionId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "OptionId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "VariableId",
        "kind": "type",
        "purpose": "VariableId is a string identifier type used where Dialit refers to variable.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type VariableId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "VariableId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "ActionId",
        "kind": "type",
        "purpose": "ActionId is a string identifier type used where Dialit refers to action.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type ActionId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "ActionId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "ResponseId",
        "kind": "type",
        "purpose": "ResponseId is a string identifier type used where Dialit refers to response.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type ResponseId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "ResponseId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "OperationId",
        "kind": "type",
        "purpose": "OperationId is a string identifier type used where Dialit refers to operation.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type OperationId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "OperationId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "EventId",
        "kind": "type",
        "purpose": "EventId is a string identifier type used where Dialit refers to event.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type EventId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "EventId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "ConversationId",
        "kind": "type",
        "purpose": "ConversationId is a string identifier type used where Dialit refers to conversation.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type ConversationId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "ConversationId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "TurnId",
        "kind": "type",
        "purpose": "TurnId is a string identifier type used where Dialit refers to turn.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type TurnId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "TurnId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "MessageId",
        "kind": "type",
        "purpose": "MessageId is a string identifier type used where Dialit refers to message.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type MessageId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "MessageId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "TraceId",
        "kind": "type",
        "purpose": "TraceId is a string identifier type used where Dialit refers to trace.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type TraceId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "TraceId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "ValidationIssueId",
        "kind": "type",
        "purpose": "ValidationIssueId is a string identifier type used where Dialit refers to validation issue.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type ValidationIssueId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "ValidationIssueId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "CandidateId",
        "kind": "type",
        "purpose": "CandidateId is a string identifier type used where Dialit refers to candidate.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type CandidateId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "CandidateId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "TaskId",
        "kind": "type",
        "purpose": "TaskId is a string identifier type used where Dialit refers to task.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type TaskId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "TaskId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "AttachmentId",
        "kind": "type",
        "purpose": "AttachmentId is a string identifier type used where Dialit refers to attachment.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type AttachmentId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "AttachmentId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "ExecutionFrameId",
        "kind": "type",
        "purpose": "ExecutionFrameId is a string identifier type used where Dialit refers to execution frame.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type ExecutionFrameId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "ExecutionFrameId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "CustomOperationId",
        "kind": "type",
        "purpose": "CustomOperationId is a string identifier type used where Dialit refers to custom operation.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type CustomOperationId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "CustomOperationId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "HandoffId",
        "kind": "type",
        "purpose": "HandoffId is a string identifier type used where Dialit refers to handoff.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type HandoffId = EntityId;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "EntityId",
            "description": "HandoffId resolves to EntityId.",
            "required": true
          }
        ],
        "related": [
          "EntityId"
        ]
      },
      {
        "name": "ISODateString",
        "kind": "type",
        "purpose": "ISODateString is a public type in Primitive IDs and Shared Base Types.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type ISODateString = string;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "string",
            "description": "ISODateString resolves to string.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "JsonPrimitive",
        "kind": "union type",
        "purpose": "JsonPrimitive is the public union in Primitive IDs and Shared Base Types that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type JsonPrimitive = string | number | boolean | null;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "string | number | boolean | null",
            "description": "JsonPrimitive resolves to string | number | boolean | null.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "JsonValue",
        "kind": "union type",
        "purpose": "JsonValue is the public union in Primitive IDs and Shared Base Types that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "JsonPrimitive | JsonObject | JsonValue[]",
            "description": "JsonValue resolves to JsonPrimitive | JsonObject | JsonValue[].",
            "required": true
          }
        ],
        "related": [
          "JsonPrimitive",
          "JsonObject"
        ]
      },
      {
        "name": "JsonObject",
        "kind": "interface",
        "purpose": "JsonObject defines the primitive ids and shared base types contract.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export interface JsonObject {\n    [key: string]: JsonValue;\n}"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "unknown",
            "description": "JsonObject resolves to unknown.",
            "required": true
          }
        ],
        "related": [
          "JsonValue"
        ]
      },
      {
        "name": "Metadata",
        "kind": "interface",
        "purpose": "Metadata defines the primitive ids and shared base types contract.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export interface Metadata {\n    [key: string]: unknown;\n}"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "unknown",
            "description": "Metadata resolves to unknown.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "LabelledEntity",
        "kind": "interface",
        "purpose": "LabelledEntity defines the primitive ids and shared base types contract with label, description, metadata.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export interface LabelledEntity {\n    label?: string;\n    description?: string;\n    metadata?: Metadata;\n}"
        ],
        "fields": [
          "label",
          "description",
          "metadata"
        ],
        "properties": [
          {
            "name": "label",
            "type": "string",
            "description": "label is the optional string member exposed by LabelledEntity.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "description is the optional string member exposed by LabelledEntity.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata carried with runtime objects.",
            "required": false
          }
        ],
        "related": [
          "Metadata"
        ]
      },
      {
        "name": "ConversationStatus",
        "kind": "union type",
        "purpose": "ConversationStatus is the public union in Primitive IDs and Shared Base Types that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type ConversationStatus = \"active\" | \"waiting_input\" | \"completed\" | \"cancelled\" | \"failed\" | \"handoff\";"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "| \"active\"\n    | \"waiting_input\"\n    | \"completed\"\n    | \"cancelled\"\n    | \"failed\"\n    | \"handoff\"",
            "description": "ConversationStatus accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "FlowVersionStatus",
        "kind": "union type",
        "purpose": "FlowVersionStatus is the public union in Primitive IDs and Shared Base Types that restricts valid variants to the shapes shown in its signature.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type FlowVersionStatus = \"draft\" | \"published\" | \"deprecated\" | \"archived\";"
        ],
        "fields": [
          "allowed values"
        ],
        "properties": [
          {
            "name": "allowed values",
            "type": "| \"draft\"\n    | \"published\"\n    | \"deprecated\"\n    | \"archived\"",
            "description": "FlowVersionStatus accepts the string literal values shown in the signature.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "StepOutcome",
        "kind": "type",
        "purpose": "StepOutcome is a public type in Primitive IDs and Shared Base Types.",
        "usage": "Use this type to keep ids, metadata, status values, and common labels explicit in your own flow definitions and integration code.",
        "signatures": [
          "export type StepOutcome = string;"
        ],
        "fields": [
          "value"
        ],
        "properties": [
          {
            "name": "value",
            "type": "string",
            "description": "StepOutcome resolves to string.",
            "required": true
          }
        ],
        "related": []
      }
    ]
  }
] as const;

export const allPublicApiExports = [
  "EntityId",
  "FlowId",
  "FlowVersionId",
  "StepId",
  "RouteId",
  "BranchId",
  "OptionId",
  "VariableId",
  "ActionId",
  "ResponseId",
  "OperationId",
  "EventId",
  "ConversationId",
  "TurnId",
  "MessageId",
  "TraceId",
  "ValidationIssueId",
  "CandidateId",
  "TaskId",
  "AttachmentId",
  "ExecutionFrameId",
  "CustomOperationId",
  "HandoffId",
  "ISODateString",
  "JsonPrimitive",
  "JsonValue",
  "JsonObject",
  "Metadata",
  "LabelledEntity",
  "ConversationStatus",
  "FlowVersionStatus",
  "StepOutcome",
  "ConversationFlowDefinition",
  "FlowSettings",
  "FlowVersion",
  "VariableType",
  "VariableDefinition",
  "VariableScope",
  "VariableValueSource",
  "VariableValue",
  "VariablePatchType",
  "VariablePatch",
  "BaseVariablePatch",
  "SetVariablePatch",
  "UnsetVariablePatch",
  "InvalidateVariablePatch",
  "VariableStoreSnapshot",
  "ScopedVariableValues",
  "VariableHistoryEntry",
  "ValueExpression",
  "LiteralValueExpression",
  "VariableValueExpression",
  "TemplateValueExpression",
  "ContextValueExpression",
  "ResponseDefinition",
  "ResponsePlan",
  "StaticResponsePlan",
  "TemplateResponsePlan",
  "GeneratedResponsePlan",
  "ResponseReferencePlan",
  "ResponseStyle",
  "ActionKind",
  "ActionDefinition",
  "ActionResultStatus",
  "ActionResult",
  "CustomOperationDefinition",
  "CustomOperationTraceContract",
  "ConditionExpression",
  "EqualsCondition",
  "NotEqualsCondition",
  "ExistsCondition",
  "NotExistsCondition",
  "GreaterThanCondition",
  "LessThanCondition",
  "IncludesCondition",
  "MatchesRegexCondition",
  "AndCondition",
  "OrCondition",
  "NotCondition",
  "ConditionEvaluationResult",
  "BuiltInStepType",
  "StepType",
  "StepConfig",
  "BaseStepDefinition",
  "StepDefinition",
  "MessageStepDefinition",
  "MessageStepConfig",
  "MenuStepDefinition",
  "MenuStepConfig",
  "MenuOption",
  "MenuSelectionPolicy",
  "MenuSemanticSelection",
  "InputStepDefinition",
  "InputStepConfig",
  "AttachmentStepDefinition",
  "AttachmentStepConfig",
  "ConditionStepDefinition",
  "ConditionStepConfig",
  "ConditionBranch",
  "EndStepDefinition",
  "EndStepConfig",
  "CustomStepDefinition",
  "CustomStepConfig",
  "StepBranch",
  "StepRoute",
  "RouteMatch",
  "OutcomeRouteMatch",
  "AlwaysRouteMatch",
  "StepTarget",
  "GoToStepTarget",
  "StayOnStepTarget",
  "EndConversationTarget",
  "NoStepTarget",
  "StepOperation",
  "BaseOperation",
  "SendMessageOperation",
  "SetVariableOperation",
  "UnsetVariableOperation",
  "InvalidateVariableOperation",
  "RunActionOperation",
  "ActionResultBranch",
  "ActionResultMatch",
  "ActionStatusMatch",
  "ActionErrorCodeMatch",
  "ActionOutcomeMatch",
  "EmitEventOperation",
  "CallFlowOperation",
  "FlowCallVariableSharing",
  "FlowCallStatus",
  "FlowCallResult",
  "FlowCallResultBranch",
  "FlowCallResultMatch",
  "FlowCallStatusMatch",
  "FlowCallOutcomeMatch",
  "HandoffOperation",
  "HandoffResultStatus",
  "HandoffResult",
  "HandoffResultBranch",
  "HandoffResultMatch",
  "HandoffStatusMatch",
  "HandoffOutcomeMatch",
  "HandoffErrorCodeMatch",
  "CustomOperation",
  "CustomOperationResultStatus",
  "CustomOperationResult",
  "CustomOperationResultBranch",
  "CustomOperationResultMatch",
  "CustomOperationStatusMatch",
  "CustomOperationOutcomeMatch",
  "CustomOperationErrorCodeMatch",
  "InputType",
  "InputContract",
  "InputBinding",
  "GlobalCommandPolicy",
  "SemanticInputTaskMode",
  "SemanticInputTask",
  "InvalidInputBehavior",
  "UnknownInputBehavior",
  "AttachmentRules",
  "NormalizerDefinition",
  "ExtractorDefinition",
  "ValidatorDefinition",
  "ValidationResult",
  "UserInput",
  "BaseUserInput",
  "TextUserInput",
  "ChoiceUserInput",
  "AttachmentUserInput",
  "AttachmentInput",
  "PayloadUserInput",
  "EventUserInput",
  "CandidateType",
  "CommandCandidate",
  "InputResolutionResult",
  "SemanticInputResolution",
  "Conversation",
  "ConversationState",
  "ConversationVariableValues",
  "ScopedVariableValuesByKey",
  "ConversationVariableHistory",
  "FlowExecutionFrame",
  "PendingInputState",
  "Turn",
  "StepExecutionContext",
  "StepResult",
  "StepHandler",
  "StepValidationContext",
  "ValidationSeverity",
  "ValidationIssue",
  "StepHandlerRegistry",
  "OperationExecutionContext",
  "OperationResult",
  "OperationHandler",
  "OperationRegistry",
  "OperationExecutor",
  "OutboundMessage",
  "OutboundMessageContent",
  "TextOutboundContent",
  "RichOutboundContent",
  "CustomPayloadOutboundContent",
  "OutboundButton",
  "ConversationEventType",
  "ConversationEvent",
  "TraceFragment",
  "DecisionTrace",
  "VariableReadTrace",
  "OperationTraceRecord",
  "ActionTraceRecord",
  "ConditionTraceRecord",
  "FlowCallTraceRecord",
  "HandoffTraceRecord",
  "LlmUsageRecord",
  "RuntimeError",
  "RuntimeErrorCode",
  "PublicRuntimeErrorCode",
  "OperationalRuntimeErrorCode",
  "BaseRuntimeError",
  "MissingStepHandlerRuntimeError",
  "MissingOperationHandlerRuntimeError",
  "MissingActionHandlerRuntimeError",
  "MissingResponseReferenceRuntimeError",
  "MissingActionReferenceRuntimeError",
  "MissingVariableReferenceRuntimeError",
  "MissingFlowVersionRuntimeError",
  "MissingStepTargetRuntimeError",
  "MissingSemanticInputResolverRuntimeError",
  "MissingLlmResponseGeneratorRuntimeError",
  "MissingCustomOperationContractRuntimeError",
  "MissingCustomOperationHandlerRuntimeError",
  "InvalidSemanticOutcomeRuntimeError",
  "InvalidSemanticVariableRuntimeError",
  "InvalidGeneratedResponseVariableRuntimeError",
  "ModelValidationRuntimeError",
  "OperationalRuntimeError",
  "UnhandledRuntimeError",
  "RuntimeServices",
  "InputProcessor",
  "InputProcessingContext",
  "Resolver",
  "ResolverRegistry",
  "Validator",
  "ValidatorRegistry",
  "ValidationContext",
  "SemanticInputResolver",
  "ResponseRenderer",
  "ResponseRenderingContext",
  "LlmResponseGenerator",
  "LlmGeneratedResponse",
  "ActionExecutor",
  "ActionExecutionContext",
  "ActionHandler",
  "ActionHandlerRegistry",
  "ConditionEvaluator",
  "ConditionEvaluationContext",
  "TransitionResolver",
  "TransitionResolutionContext",
  "StateReducer",
  "StateChangeSet",
  "TraceBuilder",
  "TraceBuildInput",
  "MessageStepHandler",
  "MenuStepHandler",
  "InputStepHandler",
  "AttachmentStepHandler",
  "ConditionStepHandler",
  "EndStepHandler",
  "SendMessageOperationHandler",
  "SetVariableOperationHandler",
  "UnsetVariableOperationHandler",
  "InvalidateVariableOperationHandler",
  "RunActionOperationHandler",
  "CallFlowOperationHandler",
  "EmitEventOperationHandler",
  "HandoffOperationHandler",
  "CustomOperationHandler",
  "FlowValidator",
  "FlowValidationOptions",
  "ModelValidator",
  "ModelValidationContext",
  "ModelValidationReport",
  "FlowInspector",
  "FlowVersionFactory",
  "CreateFlowVersionRequest",
  "FlowVersionRepository",
  "ConversationRepository",
  "ConversationStateRepository",
  "ConversationEventRepository",
  "DecisionTraceRepository",
  "ConversationEngine",
  "StartConversationRequest",
  "ProcessUserInputRequest",
  "ProcessExternalEventRequest",
  "ProcessTurnResult",
  "ConversationEventEnvelope",
  "ConversationEventSubscriber",
  "ConversationEventSubscription",
  "ConversationApi",
  "ConversationApiStartRequest",
  "ConversationApiTextRequest",
  "ConversationApiChoiceRequest",
  "ConversationApiAttachmentRequest",
  "ConversationApiEventRequest",
  "ConversationApiHttpResponse",
  "ConversationApiResponseBody",
  "ConversationApiMessage",
  "ConversationApiChoice",
  "ConversationApiVariable",
  "TurnProcessor",
  "StepExecutor",
  "BranchExecutor",
  "BranchExecutionContext",
  "BranchExecutionResult",
  "ConversationEngineConfig",
  "CreateConversationEngineOptions",
  "CreateConversationEngine",
  "RuntimeContext",
  "RuntimeClock",
  "IdGenerator",
  "VariableStore",
  "VariableResolver",
  "VariableResolutionContext",
  "FlowRegistry",
  "DefinitionLookup",
  "FlowValidationReport",
  "StepValidationReport",
  "OperationValidationReport",
  "TextResolver",
  "ExactTextResolver",
  "NumberResolver",
  "IntegerResolver",
  "EmailResolver",
  "PhoneResolver",
  "DateResolver",
  "RegexResolver",
  "MenuOptionResolver",
  "AttachmentResolver",
  "GlobalCommandResolver",
  "RequiredValidator",
  "RegexValidator",
  "EmailValidator",
  "PhoneValidator",
  "IntegerValidator",
  "NumberValidator",
  "MinLengthValidator",
  "MaxLengthValidator",
  "EnumValidator",
  "AttachmentValidator",
  "Normalizer",
  "NormalizationContext",
  "NormalizerRegistry",
  "Extractor",
  "ExtractionContext",
  "ExtractionResult",
  "ExtractorRegistry",
  "TemplateRenderer",
  "StaticResponseRenderer",
  "TemplateResponseRenderer",
  "GeneratedResponseRenderer",
  "ResponseReferenceResolver",
  "ActionInputMapper",
  "ActionOutputMapper",
  "ActionResultRouter",
  "EventFactory",
  "CreateEventRequest",
  "MessageFactory",
  "CreateTextMessageRequest",
  "CreateRichMessageRequest",
  "CreateCustomPayloadMessageRequest",
  "ConversationEngineModule",
  "ConversationEngineRepositories",
  "createConversationEngine",
  "createConversationApi",
  "validateFlowDefinition",
  "VariableLookupResult",
  "clone",
  "InMemoryFlowVersionRepository",
  "InMemoryConversationRepository",
  "InMemoryConversationStateRepository",
  "InMemoryConversationEventRepository",
  "InMemoryDecisionTraceRepository",
  "createDefaultClock",
  "createDefaultIdGenerator",
  "createEventFactory",
  "createEvent",
  "createTextMessage",
  "createTrace",
  "createMissingVariableError",
  "getVariable",
  "requireVariable",
  "setVariable",
  "unsetVariable",
  "invalidateVariable"
] as const;
