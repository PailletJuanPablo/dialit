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
        "purpose": "Creates the Dialit runtime engine, wires repositories and services, registers supplied flow versions, and exposes direct turn-processing APIs.",
        "usage": "Use createConversationEngine when application code wants direct ProcessTurnResult objects, repository access, event subscribers, and explicit runtime services.",
        "signatures": [
          "export function createConversationEngine(options?: CreateConversationEngineOptions): ConversationEngine & ConversationEngineModule;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "options",
            "type": "CreateConversationEngineOptions",
            "description": "Optional engine assembly object with repositories, services, providers, handlers, clocks, ids, and preloaded flows.",
            "required": false
          }
        ],
        "returns": {
          "type": "ConversationEngine & ConversationEngineModule",
          "description": "createConversationEngine returns a ConversationEngine & ConversationEngineModule."
        },
        "example": "const engine = createConversationEngine({\n  flowVersions: [supportAssistantVersion],\n});",
        "related": []
      },
      {
        "name": "createConversationApi",
        "kind": "function",
        "purpose": "Builds the transport-neutral API adapter that converts engine turn results into HTTP-style response DTOs.",
        "usage": "Use createConversationApi behind HTTP, serverless, worker, or queue handlers that need statusCode/body responses without a framework adapter.",
        "signatures": [
          "export function createConversationApi(source?: ConversationEngine | CreateConversationEngineOptions): ConversationApi;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "source",
            "type": "ConversationEngine | CreateConversationEngineOptions",
            "description": "Existing ConversationEngine or engine options used to create the adapter-backed engine.",
            "required": false
          }
        ],
        "returns": {
          "type": "ConversationApi",
          "description": "createConversationApi returns a ConversationApi."
        },
        "methods": [
          {
            "name": "start",
            "signature": "start(request: ConversationApiStartRequest): Promise<ConversationApiHttpResponse>",
            "description": "Starts a conversation through the adapter for createConversationApi.",
            "parameters": [
              {
                "name": "request",
                "type": "ConversationApiStartRequest",
                "description": "Request payload for createConversationApi.start: ConversationApiStartRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationApiHttpResponse>",
              "description": "createConversationApi.start resolves with ConversationApiHttpResponse."
            }
          },
          {
            "name": "sendMessage",
            "signature": "sendMessage(request: ConversationApiTextRequest): Promise<ConversationApiHttpResponse>",
            "description": "Submits text input through the adapter for createConversationApi.",
            "parameters": [
              {
                "name": "request",
                "type": "ConversationApiTextRequest",
                "description": "Request payload for createConversationApi.sendMessage: ConversationApiTextRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationApiHttpResponse>",
              "description": "createConversationApi.sendMessage resolves with ConversationApiHttpResponse."
            }
          },
          {
            "name": "selectOption",
            "signature": "selectOption(request: ConversationApiChoiceRequest): Promise<ConversationApiHttpResponse>",
            "description": "Submits a menu choice through the adapter for createConversationApi.",
            "parameters": [
              {
                "name": "request",
                "type": "ConversationApiChoiceRequest",
                "description": "Request payload for createConversationApi.selectOption: ConversationApiChoiceRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationApiHttpResponse>",
              "description": "createConversationApi.selectOption resolves with ConversationApiHttpResponse."
            }
          },
          {
            "name": "sendAttachments",
            "signature": "sendAttachments(request: ConversationApiAttachmentRequest): Promise<ConversationApiHttpResponse>",
            "description": "Submits attachment input through the adapter for createConversationApi.",
            "parameters": [
              {
                "name": "request",
                "type": "ConversationApiAttachmentRequest",
                "description": "Request payload for createConversationApi.sendAttachments: ConversationApiAttachmentRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationApiHttpResponse>",
              "description": "createConversationApi.sendAttachments resolves with ConversationApiHttpResponse."
            }
          },
          {
            "name": "sendEvent",
            "signature": "sendEvent(request: ConversationApiEventRequest): Promise<ConversationApiHttpResponse>",
            "description": "Submits an external event through the adapter for createConversationApi.",
            "parameters": [
              {
                "name": "request",
                "type": "ConversationApiEventRequest",
                "description": "Request payload for createConversationApi.sendEvent: ConversationApiEventRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationApiHttpResponse>",
              "description": "createConversationApi.sendEvent resolves with ConversationApiHttpResponse."
            }
          },
          {
            "name": "toHttpResponse",
            "signature": "toHttpResponse(result: ProcessTurnResult): ConversationApiHttpResponse",
            "description": "Converts an engine turn result into adapter DTOs for createConversationApi.",
            "parameters": [
              {
                "name": "result",
                "type": "ProcessTurnResult",
                "description": "Result payload consumed by createConversationApi.toHttpResponse: ProcessTurnResult.",
                "required": true
              }
            ],
            "returns": {
              "type": "ConversationApiHttpResponse",
              "description": "Adapter response from createConversationApi.toHttpResponse with statusCode, ok flag, messages, choices, variables, events, trace, and optional error."
            }
          },
          {
            "name": "subscribeToEvents",
            "signature": "subscribeToEvents(subscriber: ConversationEventSubscriber): ConversationEventSubscription",
            "description": "Registers a committed-event subscriber for createConversationApi.",
            "parameters": [
              {
                "name": "subscriber",
                "type": "ConversationEventSubscriber",
                "description": "Subscriber parameter for createConversationApi.subscribeToEvents: ConversationEventSubscriber.",
                "required": true
              }
            ],
            "returns": {
              "type": "ConversationEventSubscription",
              "description": "createConversationApi.subscribeToEvents returns a ConversationEventSubscription."
            }
          }
        ],
        "example": "const api = createConversationApi({\n  flowVersions: [supportAssistantVersion],\n});\n\nconst startResponse = await api.start({\n  conversationId: \"conversation-1\",\n  flowVersionId: \"support_assistant_v1\",\n});\n\nconst choiceResponse = await api.selectOption({\n  conversationId: startResponse.body.conversationId,\n  optionId: \"billing\",\n});",
        "related": [
          "ConversationEngine",
          "CreateConversationEngineOptions",
          "ConversationApi"
        ]
      },
      {
        "name": "validateFlowDefinition",
        "kind": "function",
        "purpose": "Runs model validation against a flow definition before it is published, tested, or loaded by the runtime.",
        "usage": "Use validateFlowDefinition in authoring tools and CI to catch broken targets, missing references, and unregistered extension types before runtime.",
        "signatures": [
          "export function validateFlowDefinition(flow: ConversationFlowDefinition, options?: FlowValidationOptions): FlowValidationReport;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "flow",
            "type": "ConversationFlowDefinition",
            "description": "Flow definition checked for broken targets, invalid references, and unsupported capabilities.",
            "required": true
          },
          {
            "name": "options",
            "type": "FlowValidationOptions",
            "description": "Validation capability list for custom step, operation, action, normalizer, extractor, and validator types.",
            "required": false
          }
        ],
        "returns": {
          "type": "FlowValidationReport",
          "description": "validateFlowDefinition returns a FlowValidationReport."
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
        "purpose": "Root package export surface for engine creation, API adaptation, validation, flow models, runtime DTOs, and extension contracts.",
        "usage": "Import from dialit for production engine APIs and public contracts; reserve dialit/runtime-support for in-memory helpers and test utilities.",
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
            "description": "Factory export that builds the runtime engine used for direct turn processing.",
            "required": true
          },
          {
            "name": "createConversationApi",
            "type": "function",
            "description": "Adapter factory export that wraps engine results in HTTP-style response DTOs.",
            "required": true
          },
          {
            "name": "validateFlowDefinition",
            "type": "function",
            "description": "Validation export used by authoring tools and CI before a flow is loaded.",
            "required": true
          },
          {
            "name": "FlowVersion",
            "type": "interface",
            "description": "Type export for the versioned flow snapshot accepted by repositories and engine startup.",
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
        "purpose": "Authoring document that declares the start step, variables, executable steps, reusable responses, actions, custom operations, and settings for one flow.",
        "usage": "Use ConversationFlowDefinition as source-controlled flow data that validation, tests, and runtime startup can all read.",
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
            "description": "Logical flow id shared across versions of the same conversation design for conversation flow definition.",
            "required": true
          },
          {
            "name": "startStepId",
            "type": "string",
            "description": "First step entered when a conversation starts for conversation flow definition.",
            "required": true
          },
          {
            "name": "variables",
            "type": "VariableDefinition[]",
            "description": "Declared variable catalog and current runtime values for conversation flow definition.",
            "required": true
          },
          {
            "name": "steps",
            "type": "StepDefinition[]",
            "description": "Set of executable step definitions in the flow for conversation flow definition.",
            "required": true
          },
          {
            "name": "actions",
            "type": "ActionDefinition[]",
            "description": "External action declarations available to run_action operations for conversation flow definition.",
            "required": false
          },
          {
            "name": "customOperations",
            "type": "CustomOperationDefinition[]",
            "description": "Custom operation declarations available to custom operation steps for conversation flow definition.",
            "required": false
          },
          {
            "name": "responses",
            "type": "ResponseDefinition[]",
            "description": "Reusable response plans addressable by reference for conversation flow definition.",
            "required": false
          },
          {
            "name": "settings",
            "type": "FlowSettings",
            "description": "Flow-level defaults and execution limits for conversation flow definition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for conversation flow definition in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of conversation flow definition for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on conversation flow definition for adapters, analytics, audits, or tests.",
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
        "purpose": "Optional defaults and execution limits applied while conversations run through a flow definition.",
        "usage": "Use FlowSettings to set locale/channel defaults and bounds that should travel with the flow instead of adapter code.",
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
            "description": "Locale fallback applied when a request or conversation does not provide one for flow settings.",
            "required": false
          },
          {
            "name": "defaultChannel",
            "type": "string",
            "description": "Channel fallback applied when an input or conversation has no channel for flow settings.",
            "required": false
          },
          {
            "name": "maxTurns",
            "type": "number",
            "description": "Maximum number of turns allowed before the runtime can stop the conversation for flow settings.",
            "required": false
          },
          {
            "name": "maxStepExecutionsPerTurn",
            "type": "number",
            "description": "Guardrail that prevents automatic step loops during one turn for flow settings.",
            "required": false
          },
          {
            "name": "errorStepId",
            "type": "string",
            "description": "Step entered by tooling or handlers when a flow chooses to route controlled errors for flow settings.",
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
        "purpose": "Deployable flow snapshot that pairs a ConversationFlowDefinition with version, status, schema, integrity, and publication metadata.",
        "usage": "Use FlowVersion as the unit loaded into repositories, passed to createConversationEngine, and selected when starting a conversation.",
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
            "description": "Stable id used by repositories and start requests to load this exact flow version.",
            "required": true
          },
          {
            "name": "flowId",
            "type": "string",
            "description": "Logical flow id shared across versions of the same conversation design for flow version.",
            "required": true
          },
          {
            "name": "version",
            "type": "string",
            "description": "Human version label for this flow snapshot, independent from the internal flowVersionId.",
            "required": true
          },
          {
            "name": "status",
            "type": "FlowVersionStatus",
            "description": "State value that drives routing, result handling, or lifecycle decisions for flow version.",
            "required": true
          },
          {
            "name": "definition",
            "type": "ConversationFlowDefinition",
            "description": "Flow definition executed when a conversation starts with this version.",
            "required": true
          },
          {
            "name": "schemaVersion",
            "type": "string",
            "description": "Schema revision understood by validators and authoring tools for this version payload.",
            "required": true
          },
          {
            "name": "checksum",
            "type": "string",
            "description": "Optional integrity hash for the exact flow definition payload.",
            "required": false
          },
          {
            "name": "createdAt",
            "type": "string",
            "description": "Creation timestamp assigned by the runtime clock for flow version.",
            "required": true
          },
          {
            "name": "createdBy",
            "type": "string",
            "description": "Identifier of the actor or process that created this version.",
            "required": false
          },
          {
            "name": "publishedAt",
            "type": "string",
            "description": "ISO timestamp recorded when this version was published.",
            "required": false
          },
          {
            "name": "publishedBy",
            "type": "string",
            "description": "Identifier of the actor or process that published this version.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Human display name for this published or draft flow version.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Author-facing notes explaining the intent or release scope of this flow version.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Application metadata retained with this version for catalogs, deployment tools, or audit views.",
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
        "purpose": "VariableType enumerates the allowed variable values accepted by variables and value expressions.",
        "usage": "Use VariableType where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "VariableType accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "VariableDefinition",
        "kind": "interface",
        "purpose": "VariableDefinition describes author-authored variable data consumed by validation and runtime execution.",
        "usage": "Use VariableDefinition where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "Variable key read, written, validated, traced, or exposed in API responses for variable definition.",
            "required": true
          },
          {
            "name": "type",
            "type": "VariableType",
            "description": "Type discriminator that directs validation and runtime handling for variable definition.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "Variable namespace used to separate conversation, flow, operation, and system values for variable definition.",
            "required": false
          },
          {
            "name": "required",
            "type": "boolean",
            "description": "Flag that marks the value or attachment as mandatory for validation for variable definition.",
            "required": false
          },
          {
            "name": "sensitive",
            "type": "boolean",
            "description": "Flag for values that adapters or logs should treat as confidential for variable definition.",
            "required": false
          },
          {
            "name": "defaultValue",
            "type": "unknown",
            "description": "Initial value available before user input or operations write the variable for variable definition.",
            "required": false
          },
          {
            "name": "enumValues",
            "type": "string[]",
            "description": "Allowed string values for enum variables and enum validators for variable definition.",
            "required": false
          },
          {
            "name": "validators",
            "type": "ValidatorDefinition[]",
            "description": "Validator definitions run before accepting an input binding for variable definition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for variable definition in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of variable definition for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on variable definition for adapters, analytics, audits, or tests.",
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
        "purpose": "VariableScope enumerates the allowed variable scope values accepted by variables and value expressions.",
        "usage": "Use VariableScope where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "VariableScope accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "VariableValueSource",
        "kind": "union type",
        "purpose": "VariableValueSource enumerates the allowed variable value source values accepted by variables and value expressions.",
        "usage": "Use VariableValueSource where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "VariableValueSource accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "VariableValue",
        "kind": "interface",
        "purpose": "VariableValue carries variable id, scope, source, updated at, valid, and invalidated at for variables and value expressions.",
        "usage": "Use VariableValue where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "Variable key read, written, validated, traced, or exposed in API responses for variable value.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "Variable namespace used to separate conversation, flow, operation, and system values for variable value.",
            "required": true
          },
          {
            "name": "value",
            "type": "unknown",
            "description": "Underlying payload stored, compared, normalized, or returned for variable value.",
            "required": true
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Origin recorded for a variable write, trace fragment, event, or candidate for variable value.",
            "required": false
          },
          {
            "name": "updatedAt",
            "type": "string",
            "description": "Timestamp for the last accepted write to the runtime value for variable value.",
            "required": false
          },
          {
            "name": "valid",
            "type": "boolean",
            "description": "Overall validation result for variable value.",
            "required": false
          },
          {
            "name": "invalidatedAt",
            "type": "string",
            "description": "Timestamp captured when a variable value is explicitly invalidated for variable value.",
            "required": false
          },
          {
            "name": "invalidationReason",
            "type": "string",
            "description": "Reason stored with an invalidated variable value for variable value.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on variable value for adapters, analytics, audits, or tests.",
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
        "purpose": "VariablePatchType enumerates the allowed variable patch values accepted by variables and value expressions.",
        "usage": "Use VariablePatchType where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "VariablePatchType accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "VariablePatch",
        "kind": "union type",
        "purpose": "VariablePatch enumerates the allowed variable patch values accepted by variables and value expressions.",
        "usage": "Use VariablePatch where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for variable patch.",
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
        "purpose": "BaseVariablePatch carries type, variable id, scope, source, and metadata for variables and value expressions.",
        "usage": "Use BaseVariablePatch where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "Type discriminator that directs validation and runtime handling for base variable patch.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "TVariableId",
            "description": "Variable key read, written, validated, traced, or exposed in API responses for base variable patch.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "Variable namespace used to separate conversation, flow, operation, and system values for base variable patch.",
            "required": false
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Origin recorded for a variable write, trace fragment, event, or candidate for base variable patch.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on base variable patch for adapters, analytics, audits, or tests.",
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
        "purpose": "SetVariablePatch carries type, variable id, scope, source, and metadata for variables and value expressions.",
        "usage": "Use SetVariablePatch where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for set variable patch.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"set\"",
            "description": "Literal \"set\" marker that selects the set variable patch variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "TVariableId",
            "description": "Variable key read, written, validated, traced, or exposed in API responses for set variable patch.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "Variable namespace used to separate conversation, flow, operation, and system values for set variable patch.",
            "required": false
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Origin recorded for a variable write, trace fragment, event, or candidate for set variable patch.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on set variable patch for adapters, analytics, audits, or tests.",
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
        "purpose": "UnsetVariablePatch carries type, variable id, scope, source, and metadata for variables and value expressions.",
        "usage": "Use UnsetVariablePatch where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "Literal \"unset\" marker that selects the unset variable patch variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "TVariableId",
            "description": "Variable key read, written, validated, traced, or exposed in API responses for unset variable patch.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "Variable namespace used to separate conversation, flow, operation, and system values for unset variable patch.",
            "required": false
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Origin recorded for a variable write, trace fragment, event, or candidate for unset variable patch.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on unset variable patch for adapters, analytics, audits, or tests.",
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
        "purpose": "InvalidateVariablePatch carries reason, type, variable id, scope, source, and metadata for variables and value expressions.",
        "usage": "Use InvalidateVariablePatch where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "Reason text stored for invalidation, handoff, or controlled termination for invalidate variable patch.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"invalidate\"",
            "description": "Literal \"invalidate\" marker that selects the invalidate variable patch variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "TVariableId",
            "description": "Variable key read, written, validated, traced, or exposed in API responses for invalidate variable patch.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "Variable namespace used to separate conversation, flow, operation, and system values for invalidate variable patch.",
            "required": false
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Origin recorded for a variable write, trace fragment, event, or candidate for invalidate variable patch.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on invalidate variable patch for adapters, analytics, audits, or tests.",
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
        "purpose": "VariableStoreSnapshot carries values, and history for variables and value expressions.",
        "usage": "Use VariableStoreSnapshot where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "Values value on variable store snapshot; TypeScript expects a ScopedVariableValues.",
            "required": true
          },
          {
            "name": "history",
            "type": "VariableHistoryEntry<string>[]",
            "description": "Collection of VariableHistoryEntry<string> values carried by variable store snapshot.",
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
        "purpose": "ScopedVariableValues aliases the scoped variable values value shape used by variables and value expressions integrations.",
        "usage": "Use ScopedVariableValues where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for scoped variable values.",
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
        "purpose": "VariableHistoryEntry carries variable id, scope, previous value, next value, patch type, and source for variables and value expressions.",
        "usage": "Use VariableHistoryEntry where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "Variable key read, written, validated, traced, or exposed in API responses for variable history entry.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "Variable namespace used to separate conversation, flow, operation, and system values for variable history entry.",
            "required": true
          },
          {
            "name": "previousValue",
            "type": "unknown",
            "description": "Value held before a variable patch was applied for variable history entry.",
            "required": false
          },
          {
            "name": "nextValue",
            "type": "unknown",
            "description": "Value held after a variable patch was applied for variable history entry.",
            "required": false
          },
          {
            "name": "patchType",
            "type": "VariablePatchType",
            "description": "Kind of variable mutation recorded in history for variable history entry.",
            "required": true
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Origin recorded for a variable write, trace fragment, event, or candidate for variable history entry.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for variable history entry.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "Specific flow version selected for loading, state, traces, and start requests for variable history entry.",
            "required": true
          },
          {
            "name": "frameId",
            "type": "string",
            "description": "Identifier that links variable history entry to the frame record it references.",
            "required": false
          },
          {
            "name": "stepId",
            "type": "string",
            "description": "Step identifier targeted by state, routes, traces, and execution context for variable history entry.",
            "required": false
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for variable history entry.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "Operation identifier recorded in traces and variable history for variable history entry.",
            "required": false
          },
          {
            "name": "changedAt",
            "type": "string",
            "description": "Timestamp for the recorded variable history change for variable history entry.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on variable history entry for adapters, analytics, audits, or tests.",
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
        "purpose": "ValueExpression enumerates the allowed value expression values accepted by variables and value expressions.",
        "usage": "Use ValueExpression where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for value expression.",
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
        "purpose": "LiteralValueExpression carries type for variables and value expressions.",
        "usage": "Use LiteralValueExpression where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "Literal \"literal\" marker that selects the literal value expression variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "value",
            "type": "unknown",
            "description": "Underlying payload stored, compared, normalized, or returned for literal value expression.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "VariableValueExpression",
        "kind": "interface",
        "purpose": "VariableValueExpression carries type, and variable id for variables and value expressions.",
        "usage": "Use VariableValueExpression where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "Literal \"variable\" marker that selects the variable value expression variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "string",
            "description": "Variable key read, written, validated, traced, or exposed in API responses for variable value expression.",
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
        "purpose": "TemplateValueExpression carries type, template, and variable ids for variables and value expressions.",
        "usage": "Use TemplateValueExpression where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "Literal \"template\" marker that selects the template value expression variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "template",
            "type": "string",
            "description": "Template string resolved against variables or rendering context for template value expression.",
            "required": true
          },
          {
            "name": "variableIds",
            "type": "string[]",
            "description": "Variables referenced by a template, generated response, or trace record for template value expression.",
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
        "purpose": "ContextValueExpression carries type, and path for variables and value expressions.",
        "usage": "Use ContextValueExpression where flows need typed state, scoped writes, expression evaluation, or variable history.",
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
            "description": "Literal \"context\" marker that selects the context value expression variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "path",
            "type": "string",
            "description": "Lookup path used to read from context objects or validation reports for context value expression.",
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
        "purpose": "ResponseDefinition describes author-authored response data consumed by validation and runtime execution.",
        "usage": "Use ResponseDefinition when steps or reusable responses need static text, templates, generated text, or referenced response definitions.",
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
            "description": "Identifier that links response definition to the response record it references.",
            "required": true
          },
          {
            "name": "plan",
            "type": "ResponsePlan",
            "description": "Response plan selected for rendering for response definition.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for response definition in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of response definition for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on response definition for adapters, analytics, audits, or tests.",
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
        "purpose": "ResponsePlan enumerates the allowed response plan values accepted by responses.",
        "usage": "Use ResponsePlan when steps or reusable responses need static text, templates, generated text, or referenced response definitions.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for response plan.",
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
        "purpose": "StaticResponsePlan carries mode, text, and channel payload for responses.",
        "usage": "Use StaticResponsePlan when steps or reusable responses need static text, templates, generated text, or referenced response definitions.",
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
            "description": "Literal \"static\" marker that selects the static response plan variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "text",
            "type": "string",
            "description": "Plain text sent by the user, rendered by a response, or emitted in a message for static response plan.",
            "required": true
          },
          {
            "name": "channelPayload",
            "type": "JsonObject",
            "description": "Channel-specific payload kept beside portable response content for static response plan.",
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
        "purpose": "TemplateResponsePlan carries mode, template, variable ids, and channel payload for responses.",
        "usage": "Use TemplateResponsePlan when steps or reusable responses need static text, templates, generated text, or referenced response definitions.",
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
            "description": "Literal \"template\" marker that selects the template response plan variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "template",
            "type": "string",
            "description": "Template string resolved against variables or rendering context for template response plan.",
            "required": true
          },
          {
            "name": "variableIds",
            "type": "string[]",
            "description": "Variables referenced by a template, generated response, or trace record for template response plan.",
            "required": false
          },
          {
            "name": "channelPayload",
            "type": "JsonObject",
            "description": "Channel-specific payload kept beside portable response content for template response plan.",
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
        "purpose": "GeneratedResponsePlan carries mode, goal, allowed variable ids, constraints, style, and max length for responses.",
        "usage": "Use GeneratedResponsePlan when steps or reusable responses need static text, templates, generated text, or referenced response definitions.",
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
            "description": "Literal \"generated\" marker that selects the generated response plan variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "goal",
            "type": "string",
            "description": "Instruction for generated response providers describing what the text must accomplish for generated response plan.",
            "required": true
          },
          {
            "name": "allowedVariableIds",
            "type": "readonly TVariableId[]",
            "description": "Allow-list of variables a semantic or generated-response provider may use for generated response plan.",
            "required": true
          },
          {
            "name": "constraints",
            "type": "string[]",
            "description": "Hard requirements supplied to semantic or generated-response providers for generated response plan.",
            "required": false
          },
          {
            "name": "style",
            "type": "ResponseStyle",
            "description": "Tone, language, and persona guidance for generated wording for generated response plan.",
            "required": false
          },
          {
            "name": "maxLength",
            "type": "number",
            "description": "Maximum generated text length expected from the provider for generated response plan.",
            "required": false
          },
          {
            "name": "fallbackText",
            "type": "string",
            "description": "Safe text used when generated response output cannot be accepted for generated response plan.",
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
        "purpose": "ResponseReferencePlan carries mode, and response id for responses.",
        "usage": "Use ResponseReferencePlan when steps or reusable responses need static text, templates, generated text, or referenced response definitions.",
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
            "description": "Literal \"reference\" marker that selects the response reference plan variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "responseId",
            "type": "string",
            "description": "Identifier that links response reference plan to the response record it references.",
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
        "purpose": "ResponseStyle carries tone, language, and persona for responses.",
        "usage": "Use ResponseStyle when steps or reusable responses need static text, templates, generated text, or referenced response definitions.",
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
            "description": "Tone target requested for generated response wording for response style.",
            "required": false
          },
          {
            "name": "language",
            "type": "string",
            "description": "Language tag or name requested for generated response wording for response style.",
            "required": false
          },
          {
            "name": "persona",
            "type": "string",
            "description": "Persona guidance passed to the response generator for response style.",
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
        "purpose": "ActionKind enumerates the allowed action kind values accepted by actions and custom operations.",
        "usage": "Use ActionKind to declare external work, custom executable operations, and result routing boundaries.",
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
            "description": "ActionKind accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "ActionDefinition",
        "kind": "interface",
        "purpose": "ActionDefinition describes author-authored action data consumed by validation and runtime execution.",
        "usage": "Use ActionDefinition to declare external work, custom executable operations, and result routing boundaries.",
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
            "description": "Action contract identifier referenced by run_action operations for action definition.",
            "required": true
          },
          {
            "name": "kind",
            "type": "string",
            "description": "Action kind used to select the registered action handler for action definition.",
            "required": true
          },
          {
            "name": "inputSchema",
            "type": "JsonObject",
            "description": "Schema-like input shape expected by an action or custom operation for action definition.",
            "required": false
          },
          {
            "name": "outputSchema",
            "type": "JsonObject",
            "description": "Schema-like output shape declared by an action or custom operation for action definition.",
            "required": false
          },
          {
            "name": "resultOutcomes",
            "type": "string[]",
            "description": "Outcome strings that an action result can route on for action definition.",
            "required": false
          },
          {
            "name": "errorCodes",
            "type": "string[]",
            "description": "Error code values that result branches can match for action definition.",
            "required": false
          },
          {
            "name": "sideEffect",
            "type": "boolean",
            "description": "Marker that the action can modify external systems for action definition.",
            "required": false
          },
          {
            "name": "timeoutMs",
            "type": "number",
            "description": "Timeout budget expected by the host application for external work for action definition.",
            "required": false
          },
          {
            "name": "config",
            "type": "JsonObject",
            "description": "Configuration payload read by handlers for this step, action, operation, or runtime service for action definition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for action definition in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of action definition for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on action definition for adapters, analytics, audits, or tests.",
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
        "purpose": "ActionResultStatus enumerates the allowed action result status values accepted by actions and custom operations.",
        "usage": "Use ActionResultStatus to declare external work, custom executable operations, and result routing boundaries.",
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
            "description": "ActionResultStatus accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "ActionResult",
        "kind": "interface",
        "purpose": "ActionResult captures the outcome, variables, trace data, and errors from action.",
        "usage": "Use ActionResult to declare external work, custom executable operations, and result routing boundaries.",
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
            "description": "State value that drives routing, result handling, or lifecycle decisions for action result.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Outcome value used to choose branches or report handler results for action result.",
            "required": false
          },
          {
            "name": "outputs",
            "type": "Record<string, unknown>",
            "description": "Structured values returned by an action or operation for action result.",
            "required": false
          },
          {
            "name": "errorCode",
            "type": "string",
            "description": "Error code value on action result; TypeScript expects a string.",
            "required": false
          },
          {
            "name": "errorMessage",
            "type": "string",
            "description": "Human-readable failure message returned by a handler or runtime error for action result.",
            "required": false
          },
          {
            "name": "raw",
            "type": "unknown",
            "description": "Unmodified provider or integration payload retained for diagnostics for action result.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on action result for adapters, analytics, audits, or tests.",
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
        "purpose": "CustomOperationDefinition describes author-authored custom operation data consumed by validation and runtime execution.",
        "usage": "Use CustomOperationDefinition to declare external work, custom executable operations, and result routing boundaries.",
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
            "description": "Identifier for a custom operation declaration for custom operation definition.",
            "required": true
          },
          {
            "name": "customType",
            "type": "string",
            "description": "Custom operation type used to find the configured executor for custom operation definition.",
            "required": true
          },
          {
            "name": "inputSchema",
            "type": "JsonObject",
            "description": "Schema-like input shape expected by an action or custom operation for custom operation definition.",
            "required": false
          },
          {
            "name": "outputSchema",
            "type": "JsonObject",
            "description": "Schema-like output shape declared by an action or custom operation for custom operation definition.",
            "required": false
          },
          {
            "name": "allowedOutcomes",
            "type": "string[]",
            "description": "Outcome strings accepted from semantic tasks or custom operations for custom operation definition.",
            "required": true
          },
          {
            "name": "errorCodes",
            "type": "string[]",
            "description": "Error code values that result branches can match for custom operation definition.",
            "required": false
          },
          {
            "name": "configSchema",
            "type": "JsonObject",
            "description": "Schema-like configuration description for authoring tools for custom operation definition.",
            "required": false
          },
          {
            "name": "traceContract",
            "type": "CustomOperationTraceContract",
            "description": "Trace requirements declared for custom operation evidence for custom operation definition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for custom operation definition in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of custom operation definition for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on custom operation definition for adapters, analytics, audits, or tests.",
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
        "purpose": "CustomOperationTraceContract carries expected sources, and required data keys for actions and custom operations.",
        "usage": "Use CustomOperationTraceContract to declare external work, custom executable operations, and result routing boundaries.",
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
            "description": "Trace sources the operation is expected to emit for debugging for custom operation trace contract.",
            "required": false
          },
          {
            "name": "requiredDataKeys",
            "type": "string[]",
            "description": "Trace data keys expected from custom operation evidence for custom operation trace contract.",
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
        "purpose": "ConditionExpression enumerates the allowed condition expression values accepted by conditions.",
        "usage": "Use ConditionExpression for explicit routing predicates that remain visible in flow data and traces.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for condition expression.",
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
        "purpose": "EqualsCondition carries type, left, and right for conditions.",
        "usage": "Use EqualsCondition for explicit routing predicates that remain visible in flow data and traces.",
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
            "description": "Literal \"equals\" marker that selects the equals condition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "left",
            "type": "ValueExpression",
            "description": "Left operand evaluated by the condition expression for equals condition.",
            "required": true
          },
          {
            "name": "right",
            "type": "ValueExpression",
            "description": "Right operand evaluated by the condition expression for equals condition.",
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
        "purpose": "NotEqualsCondition carries type, left, and right for conditions.",
        "usage": "Use NotEqualsCondition for explicit routing predicates that remain visible in flow data and traces.",
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
            "description": "Literal \"not_equals\" marker that selects the not equals condition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "left",
            "type": "ValueExpression",
            "description": "Left operand evaluated by the condition expression for not equals condition.",
            "required": true
          },
          {
            "name": "right",
            "type": "ValueExpression",
            "description": "Right operand evaluated by the condition expression for not equals condition.",
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
        "purpose": "ExistsCondition carries type, and variable id for conditions.",
        "usage": "Use ExistsCondition for explicit routing predicates that remain visible in flow data and traces.",
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
            "description": "Literal \"exists\" marker that selects the exists condition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "string",
            "description": "Variable key read, written, validated, traced, or exposed in API responses for exists condition.",
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
        "purpose": "NotExistsCondition carries type, and variable id for conditions.",
        "usage": "Use NotExistsCondition for explicit routing predicates that remain visible in flow data and traces.",
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
            "description": "Literal \"not_exists\" marker that selects the not exists condition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "string",
            "description": "Variable key read, written, validated, traced, or exposed in API responses for not exists condition.",
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
        "purpose": "GreaterThanCondition carries type, left, and right for conditions.",
        "usage": "Use GreaterThanCondition for explicit routing predicates that remain visible in flow data and traces.",
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
            "description": "Literal \"greater_than\" marker that selects the greater than condition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "left",
            "type": "ValueExpression",
            "description": "Left operand evaluated by the condition expression for greater than condition.",
            "required": true
          },
          {
            "name": "right",
            "type": "ValueExpression",
            "description": "Right operand evaluated by the condition expression for greater than condition.",
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
        "purpose": "LessThanCondition carries type, left, and right for conditions.",
        "usage": "Use LessThanCondition for explicit routing predicates that remain visible in flow data and traces.",
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
            "description": "Literal \"less_than\" marker that selects the less than condition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "left",
            "type": "ValueExpression",
            "description": "Left operand evaluated by the condition expression for less than condition.",
            "required": true
          },
          {
            "name": "right",
            "type": "ValueExpression",
            "description": "Right operand evaluated by the condition expression for less than condition.",
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
        "purpose": "IncludesCondition carries type, and collection for conditions.",
        "usage": "Use IncludesCondition for explicit routing predicates that remain visible in flow data and traces.",
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
            "description": "Literal \"includes\" marker that selects the includes condition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "collection",
            "type": "ValueExpression",
            "description": "Collection operand inspected by an includes condition for includes condition.",
            "required": true
          },
          {
            "name": "value",
            "type": "ValueExpression",
            "description": "Underlying payload stored, compared, normalized, or returned for includes condition.",
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
        "purpose": "MatchesRegexCondition carries type, pattern, and flags for conditions.",
        "usage": "Use MatchesRegexCondition for explicit routing predicates that remain visible in flow data and traces.",
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
            "description": "Literal \"matches_regex\" marker that selects the matches regex condition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "value",
            "type": "ValueExpression",
            "description": "Underlying payload stored, compared, normalized, or returned for matches regex condition.",
            "required": true
          },
          {
            "name": "pattern",
            "type": "string",
            "description": "Regular expression pattern used by matching or validation for matches regex condition.",
            "required": true
          },
          {
            "name": "flags",
            "type": "string",
            "description": "Regular expression flags applied to the pattern for matches regex condition.",
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
        "purpose": "AndCondition carries type, and conditions for conditions.",
        "usage": "Use AndCondition for explicit routing predicates that remain visible in flow data and traces.",
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
            "description": "Literal \"and\" marker that selects the and condition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "conditions",
            "type": "ConditionExpression[]",
            "description": "Child condition expressions combined by a boolean operator for and condition.",
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
        "purpose": "OrCondition carries type, and conditions for conditions.",
        "usage": "Use OrCondition for explicit routing predicates that remain visible in flow data and traces.",
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
            "description": "Literal \"or\" marker that selects the or condition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "conditions",
            "type": "ConditionExpression[]",
            "description": "Child condition expressions combined by a boolean operator for or condition.",
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
        "purpose": "NotCondition carries type, and condition for conditions.",
        "usage": "Use NotCondition for explicit routing predicates that remain visible in flow data and traces.",
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
            "description": "Literal \"not\" marker that selects the not condition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "condition",
            "type": "ConditionExpression",
            "description": "Single condition expression negated or evaluated by this contract for not condition.",
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
        "purpose": "ConditionEvaluationResult captures the outcome, variables, trace data, and errors from condition evaluation.",
        "usage": "Use ConditionEvaluationResult for explicit routing predicates that remain visible in flow data and traces.",
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
            "description": "Boolean result of evaluating a condition expression for condition evaluation result.",
            "required": true
          },
          {
            "name": "reason",
            "type": "string",
            "description": "Reason text stored for invalidation, handoff, or controlled termination for condition evaluation result.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on condition evaluation result for adapters, analytics, audits, or tests.",
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
        "purpose": "BuiltInStepType enumerates the allowed built in step values accepted by steps.",
        "usage": "Use BuiltInStepType to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "BuiltInStepType accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "StepType",
        "kind": "union type",
        "purpose": "StepType enumerates the allowed step values accepted by steps.",
        "usage": "Use StepType to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for step type.",
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
        "purpose": "StepConfig provides configuration read by the step runtime path.",
        "usage": "Use StepConfig to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for step config.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "BaseStepDefinition",
        "kind": "interface",
        "purpose": "BaseStepDefinition describes author-authored base step data consumed by validation and runtime execution.",
        "usage": "Use BaseStepDefinition to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Step identifier targeted by state, routes, traces, and execution context for base step definition.",
            "required": true
          },
          {
            "name": "type",
            "type": "TType",
            "description": "Type discriminator that directs validation and runtime handling for base step definition.",
            "required": true
          },
          {
            "name": "config",
            "type": "TConfig",
            "description": "Configuration payload read by handlers for this step, action, operation, or runtime service for base step definition.",
            "required": true
          },
          {
            "name": "onEnter",
            "type": "StepOperation[]",
            "description": "Operations executed before a step handles input for base step definition.",
            "required": false
          },
          {
            "name": "onExit",
            "type": "StepOperation[]",
            "description": "Operations executed after a step finishes for base step definition.",
            "required": false
          },
          {
            "name": "routes",
            "type": "StepRoute[]",
            "description": "Route list inspected after a step or operation produces an outcome for base step definition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for base step definition in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of base step definition for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on base step definition for adapters, analytics, audits, or tests.",
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
        "purpose": "StepDefinition enumerates the allowed step definition values accepted by steps.",
        "usage": "Use StepDefinition to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for step definition.",
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
        "purpose": "MessageStepDefinition describes author-authored message step data consumed by validation and runtime execution.",
        "usage": "Use MessageStepDefinition to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Step identifier targeted by state, routes, traces, and execution context for message step definition.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"message\"",
            "description": "Literal \"message\" marker that selects the message step definition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "config",
            "type": "MessageStepConfig",
            "description": "Configuration payload read by handlers for this step, action, operation, or runtime service for message step definition.",
            "required": true
          },
          {
            "name": "onEnter",
            "type": "StepOperation[]",
            "description": "Operations executed before a step handles input for message step definition.",
            "required": false
          },
          {
            "name": "onExit",
            "type": "StepOperation[]",
            "description": "Operations executed after a step finishes for message step definition.",
            "required": false
          },
          {
            "name": "routes",
            "type": "StepRoute[]",
            "description": "Route list inspected after a step or operation produces an outcome for message step definition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for message step definition in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of message step definition for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on message step definition for adapters, analytics, audits, or tests.",
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
        "purpose": "MessageStepConfig provides configuration read by the message step runtime path.",
        "usage": "Use MessageStepConfig to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Outbound response plans or message DTOs produced during a turn for message step config.",
            "required": true
          },
          {
            "name": "autoAdvance",
            "type": "boolean",
            "description": "Flag that lets a message step continue without waiting for input for message step config.",
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
        "purpose": "MenuStepDefinition describes author-authored menu step data consumed by validation and runtime execution.",
        "usage": "Use MenuStepDefinition to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Step identifier targeted by state, routes, traces, and execution context for menu step definition.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"menu\"",
            "description": "Literal \"menu\" marker that selects the menu step definition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "config",
            "type": "MenuStepConfig",
            "description": "Configuration payload read by handlers for this step, action, operation, or runtime service for menu step definition.",
            "required": true
          },
          {
            "name": "onEnter",
            "type": "StepOperation[]",
            "description": "Operations executed before a step handles input for menu step definition.",
            "required": false
          },
          {
            "name": "onExit",
            "type": "StepOperation[]",
            "description": "Operations executed after a step finishes for menu step definition.",
            "required": false
          },
          {
            "name": "routes",
            "type": "StepRoute[]",
            "description": "Route list inspected after a step or operation produces an outcome for menu step definition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for menu step definition in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of menu step definition for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on menu step definition for adapters, analytics, audits, or tests.",
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
        "purpose": "MenuStepConfig provides configuration read by the menu step runtime path.",
        "usage": "Use MenuStepConfig to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Response plan rendered before the runtime waits for input for menu step config.",
            "required": true
          },
          {
            "name": "options",
            "type": "MenuOption[]",
            "description": "Collection of MenuOption values carried by menu step config.",
            "required": true
          },
          {
            "name": "selection",
            "type": "MenuSelectionPolicy",
            "description": "Rules controlling how a menu option can be selected for menu step config.",
            "required": true
          },
          {
            "name": "invalidSelection",
            "type": "InvalidInputBehavior",
            "description": "Behavior used after menu input fails validation for menu step config.",
            "required": false
          },
          {
            "name": "unknownSelection",
            "type": "UnknownInputBehavior",
            "description": "Behavior used when no menu option matches for menu step config.",
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
        "purpose": "MenuOption carries option id, aliases, branch, label, description, and metadata for steps.",
        "usage": "Use MenuOption to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Menu option identifier used for choices and branch matches for menu option.",
            "required": true
          },
          {
            "name": "aliases",
            "type": "string[]",
            "description": "Alternate user text values accepted for a menu option for menu option.",
            "required": false
          },
          {
            "name": "value",
            "type": "unknown",
            "description": "Underlying payload stored, compared, normalized, or returned for menu option.",
            "required": false
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch executed when a match or option succeeds for menu option.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for menu option in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of menu option for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on menu option for adapters, analytics, audits, or tests.",
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
        "purpose": "MenuSelectionPolicy carries allow buttons, allow numbers, allow exact text, allow aliases, allow free text, and semantic selection for steps.",
        "usage": "Use MenuSelectionPolicy to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Whether channel buttons may select menu options for menu selection policy.",
            "required": false
          },
          {
            "name": "allowNumbers",
            "type": "boolean",
            "description": "Whether numeric user text may select menu options by position for menu selection policy.",
            "required": false
          },
          {
            "name": "allowExactText",
            "type": "boolean",
            "description": "Whether visible option labels can select menu options for menu selection policy.",
            "required": false
          },
          {
            "name": "allowAliases",
            "type": "boolean",
            "description": "Whether aliases can select menu options for menu selection policy.",
            "required": false
          },
          {
            "name": "allowFreeText",
            "type": "boolean",
            "description": "Whether unmatched text is accepted instead of rejected for menu selection policy.",
            "required": false
          },
          {
            "name": "semanticSelection",
            "type": "MenuSemanticSelection",
            "description": "Semantic resolver settings for menu selection for menu selection policy.",
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
        "purpose": "MenuSemanticSelection carries enabled, threshold, and unknown outcome for steps.",
        "usage": "Use MenuSemanticSelection to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Flag that enables optional runtime behavior for menu semantic selection.",
            "required": true
          },
          {
            "name": "threshold",
            "type": "number",
            "description": "Minimum confidence required before semantic input is accepted for menu semantic selection.",
            "required": true
          },
          {
            "name": "unknownOutcome",
            "type": "string",
            "description": "Outcome used when semantic input cannot classify the message for menu semantic selection.",
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
        "purpose": "InputStepDefinition describes author-authored input step data consumed by validation and runtime execution.",
        "usage": "Use InputStepDefinition to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Step identifier targeted by state, routes, traces, and execution context for input step definition.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"input\"",
            "description": "Literal \"input\" marker that selects the input step definition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "config",
            "type": "InputStepConfig",
            "description": "Configuration payload read by handlers for this step, action, operation, or runtime service for input step definition.",
            "required": true
          },
          {
            "name": "onEnter",
            "type": "StepOperation[]",
            "description": "Operations executed before a step handles input for input step definition.",
            "required": false
          },
          {
            "name": "onExit",
            "type": "StepOperation[]",
            "description": "Operations executed after a step finishes for input step definition.",
            "required": false
          },
          {
            "name": "routes",
            "type": "StepRoute[]",
            "description": "Route list inspected after a step or operation produces an outcome for input step definition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for input step definition in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of input step definition for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on input step definition for adapters, analytics, audits, or tests.",
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
        "purpose": "InputStepConfig provides configuration read by the input step runtime path.",
        "usage": "Use InputStepConfig to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Response plan rendered before the runtime waits for input for input step config.",
            "required": false
          },
          {
            "name": "input",
            "type": "InputContract<string, string>",
            "description": "User input, binding source, or operation payload handled by this contract for input step config.",
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
        "purpose": "AttachmentStepDefinition describes author-authored attachment step data consumed by validation and runtime execution.",
        "usage": "Use AttachmentStepDefinition to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Step identifier targeted by state, routes, traces, and execution context for attachment step definition.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"attachment\"",
            "description": "Literal \"attachment\" marker that selects the attachment step definition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "config",
            "type": "AttachmentStepConfig",
            "description": "Configuration payload read by handlers for this step, action, operation, or runtime service for attachment step definition.",
            "required": true
          },
          {
            "name": "onEnter",
            "type": "StepOperation[]",
            "description": "Operations executed before a step handles input for attachment step definition.",
            "required": false
          },
          {
            "name": "onExit",
            "type": "StepOperation[]",
            "description": "Operations executed after a step finishes for attachment step definition.",
            "required": false
          },
          {
            "name": "routes",
            "type": "StepRoute[]",
            "description": "Route list inspected after a step or operation produces an outcome for attachment step definition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for attachment step definition in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of attachment step definition for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on attachment step definition for adapters, analytics, audits, or tests.",
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
        "purpose": "AttachmentStepConfig provides configuration read by the attachment step runtime path.",
        "usage": "Use AttachmentStepConfig to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Response plan rendered before the runtime waits for input for attachment step config.",
            "required": false
          },
          {
            "name": "targetVariableId",
            "type": "string",
            "description": "Variable that receives captured input, attachments, or mapped output for attachment step config.",
            "required": true
          },
          {
            "name": "rules",
            "type": "AttachmentRules",
            "description": "Attachment rules applied before accepted files are stored for attachment step config.",
            "required": true
          },
          {
            "name": "invalidAttachment",
            "type": "InvalidInputBehavior",
            "description": "Behavior used after attachment validation fails for attachment step config.",
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
        "purpose": "ConditionStepDefinition describes author-authored condition step data consumed by validation and runtime execution.",
        "usage": "Use ConditionStepDefinition to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Step identifier targeted by state, routes, traces, and execution context for condition step definition.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"condition\"",
            "description": "Literal \"condition\" marker that selects the condition step definition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "config",
            "type": "ConditionStepConfig",
            "description": "Configuration payload read by handlers for this step, action, operation, or runtime service for condition step definition.",
            "required": true
          },
          {
            "name": "onEnter",
            "type": "StepOperation[]",
            "description": "Operations executed before a step handles input for condition step definition.",
            "required": false
          },
          {
            "name": "onExit",
            "type": "StepOperation[]",
            "description": "Operations executed after a step finishes for condition step definition.",
            "required": false
          },
          {
            "name": "routes",
            "type": "StepRoute[]",
            "description": "Route list inspected after a step or operation produces an outcome for condition step definition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for condition step definition in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of condition step definition for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on condition step definition for adapters, analytics, audits, or tests.",
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
        "purpose": "ConditionStepConfig provides configuration read by the condition step runtime path.",
        "usage": "Use ConditionStepConfig to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Ordered branch list evaluated for routing for condition step config.",
            "required": true
          },
          {
            "name": "defaultBranch",
            "type": "StepBranch",
            "description": "Fallback branch used when no explicit branch matches for condition step config.",
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
        "purpose": "ConditionBranch describes branch work and targets selected after an outcome match.",
        "usage": "Use ConditionBranch to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Branch identifier recorded in traces and authoring tools for condition branch.",
            "required": true
          },
          {
            "name": "when",
            "type": "ConditionExpression",
            "description": "Condition expression that must match before the branch runs for condition branch.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Outcome value used to choose branches or report handler results for condition branch.",
            "required": true
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch executed when a match or option succeeds for condition branch.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for condition branch in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of condition branch for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on condition branch for adapters, analytics, audits, or tests.",
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
        "purpose": "EndStepDefinition describes author-authored end step data consumed by validation and runtime execution.",
        "usage": "Use EndStepDefinition to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Step identifier targeted by state, routes, traces, and execution context for end step definition.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"end\"",
            "description": "Literal \"end\" marker that selects the end step definition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "config",
            "type": "EndStepConfig",
            "description": "Configuration payload read by handlers for this step, action, operation, or runtime service for end step definition.",
            "required": true
          },
          {
            "name": "onEnter",
            "type": "StepOperation[]",
            "description": "Operations executed before a step handles input for end step definition.",
            "required": false
          },
          {
            "name": "onExit",
            "type": "StepOperation[]",
            "description": "Operations executed after a step finishes for end step definition.",
            "required": false
          },
          {
            "name": "routes",
            "type": "StepRoute[]",
            "description": "Route list inspected after a step or operation produces an outcome for end step definition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for end step definition in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of end step definition for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on end step definition for adapters, analytics, audits, or tests.",
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
        "purpose": "EndStepConfig provides configuration read by the end step runtime path.",
        "usage": "Use EndStepConfig to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "State value that drives routing, result handling, or lifecycle decisions for end step config.",
            "required": true
          },
          {
            "name": "finalMessage",
            "type": "ResponsePlan",
            "description": "Response plan rendered when an end step completes the conversation for end step config.",
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
        "purpose": "CustomStepDefinition describes author-authored custom step data consumed by validation and runtime execution.",
        "usage": "Use CustomStepDefinition to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Step identifier targeted by state, routes, traces, and execution context for custom step definition.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"custom\"",
            "description": "Literal \"custom\" marker that selects the custom step definition variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "config",
            "type": "CustomStepConfig",
            "description": "Configuration payload read by handlers for this step, action, operation, or runtime service for custom step definition.",
            "required": true
          },
          {
            "name": "onEnter",
            "type": "StepOperation[]",
            "description": "Operations executed before a step handles input for custom step definition.",
            "required": false
          },
          {
            "name": "onExit",
            "type": "StepOperation[]",
            "description": "Operations executed after a step finishes for custom step definition.",
            "required": false
          },
          {
            "name": "routes",
            "type": "StepRoute[]",
            "description": "Route list inspected after a step or operation produces an outcome for custom step definition.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for custom step definition in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of custom step definition for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on custom step definition for adapters, analytics, audits, or tests.",
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
        "purpose": "CustomStepConfig provides configuration read by the custom step runtime path.",
        "usage": "Use CustomStepConfig to model executable conversation states and the configuration each built-in step handler reads.",
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
            "description": "Custom operation type used to find the configured executor for custom step config.",
            "required": true
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Structured payload carried by events, choices, messages, or custom content for custom step config.",
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
        "purpose": "StepBranch describes branch work and targets selected after an outcome match.",
        "usage": "Use StepBranch to connect outcomes to step targets, terminal states, or branch operations.",
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
            "description": "Branch identifier recorded in traces and authoring tools for step branch.",
            "required": false
          },
          {
            "name": "operations",
            "type": "StepOperation[]",
            "description": "Collection of StepOperation values carried by step branch.",
            "required": false
          },
          {
            "name": "target",
            "type": "StepTarget",
            "description": "Step or terminal target reached by a branch for step branch.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for step branch in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of step branch for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on step branch for adapters, analytics, audits, or tests.",
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
        "purpose": "StepRoute carries route id, match, branch, priority, label, and description for branches, routes, and targets.",
        "usage": "Use StepRoute to connect outcomes to step targets, terminal states, or branch operations.",
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
            "description": "Route identifier used in traces and authoring tools for step route.",
            "required": true
          },
          {
            "name": "match",
            "type": "RouteMatch",
            "description": "Route match rule compared with a step or operation outcome for step route.",
            "required": true
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch executed when a match or option succeeds for step route.",
            "required": true
          },
          {
            "name": "priority",
            "type": "number",
            "description": "Priority value on step route; TypeScript expects a number.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for step route in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of step route for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on step route for adapters, analytics, audits, or tests.",
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
        "purpose": "RouteMatch enumerates the allowed route match values accepted by branches, routes, and targets.",
        "usage": "Use RouteMatch to connect outcomes to step targets, terminal states, or branch operations.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for route match.",
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
        "purpose": "OutcomeRouteMatch describes the matching rule used to select result branches.",
        "usage": "Use OutcomeRouteMatch to connect outcomes to step targets, terminal states, or branch operations.",
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
            "description": "Literal \"outcome\" marker that selects the outcome route match variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Outcome value used to choose branches or report handler results for outcome route match.",
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
        "purpose": "AlwaysRouteMatch describes the matching rule used to select result branches.",
        "usage": "Use AlwaysRouteMatch to connect outcomes to step targets, terminal states, or branch operations.",
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
            "description": "Literal \"always\" marker that selects the always route match variant during validation and runtime dispatch.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "StepTarget",
        "kind": "union type",
        "purpose": "StepTarget enumerates the allowed step target values accepted by branches, routes, and targets.",
        "usage": "Use StepTarget to connect outcomes to step targets, terminal states, or branch operations.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for step target.",
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
        "purpose": "GoToStepTarget identifies the transition target reached after routing completes.",
        "usage": "Use GoToStepTarget to connect outcomes to step targets, terminal states, or branch operations.",
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
            "description": "Literal \"step\" marker that selects the go to step target variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "stepId",
            "type": "string",
            "description": "Step identifier targeted by state, routes, traces, and execution context for go to step target.",
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
        "purpose": "StayOnStepTarget identifies the transition target reached after routing completes.",
        "usage": "Use StayOnStepTarget to connect outcomes to step targets, terminal states, or branch operations.",
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
            "description": "Literal \"stay\" marker that selects the stay on step target variant during validation and runtime dispatch.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "EndConversationTarget",
        "kind": "interface",
        "purpose": "EndConversationTarget identifies the transition target reached after routing completes.",
        "usage": "Use EndConversationTarget to connect outcomes to step targets, terminal states, or branch operations.",
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
            "description": "Literal \"end\" marker that selects the end conversation target variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "status",
            "type": "ConversationStatus",
            "description": "State value that drives routing, result handling, or lifecycle decisions for end conversation target.",
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
        "purpose": "NoStepTarget identifies the transition target reached after routing completes.",
        "usage": "Use NoStepTarget to connect outcomes to step targets, terminal states, or branch operations.",
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
            "description": "Literal \"none\" marker that selects the no step target variant during validation and runtime dispatch.",
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
        "purpose": "StepOperation enumerates the allowed step operation values accepted by operations.",
        "usage": "Use StepOperation inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for step operation.",
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
        "purpose": "BaseOperation declares the base operation that can run from step hooks or branches.",
        "usage": "Use BaseOperation inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Operation identifier recorded in traces and variable history for base operation.",
            "required": false
          },
          {
            "name": "type",
            "type": "TType",
            "description": "Type discriminator that directs validation and runtime handling for base operation.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for base operation in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of base operation for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on base operation for adapters, analytics, audits, or tests.",
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
        "purpose": "SendMessageOperation declares the send message operation that can run from step hooks or branches.",
        "usage": "Use SendMessageOperation inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Validation message or outbound text shown to users for send message operation.",
            "required": true
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "Operation identifier recorded in traces and variable history for send message operation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"send_message\"",
            "description": "Literal \"send_message\" marker that selects the send message operation variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for send message operation in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of send message operation for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on send message operation for adapters, analytics, audits, or tests.",
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
        "purpose": "SetVariableOperation declares the set variable operation that can run from step hooks or branches.",
        "usage": "Use SetVariableOperation inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Variable key read, written, validated, traced, or exposed in API responses for set variable operation.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "Variable namespace used to separate conversation, flow, operation, and system values for set variable operation.",
            "required": false
          },
          {
            "name": "value",
            "type": "ValueExpression",
            "description": "Underlying payload stored, compared, normalized, or returned for set variable operation.",
            "required": true
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Origin recorded for a variable write, trace fragment, event, or candidate for set variable operation.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "Operation identifier recorded in traces and variable history for set variable operation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"set_variable\"",
            "description": "Literal \"set_variable\" marker that selects the set variable operation variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for set variable operation in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of set variable operation for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on set variable operation for adapters, analytics, audits, or tests.",
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
        "purpose": "UnsetVariableOperation declares the unset variable operation that can run from step hooks or branches.",
        "usage": "Use UnsetVariableOperation inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Variable key read, written, validated, traced, or exposed in API responses for unset variable operation.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "Variable namespace used to separate conversation, flow, operation, and system values for unset variable operation.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "Operation identifier recorded in traces and variable history for unset variable operation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"unset_variable\"",
            "description": "Literal \"unset_variable\" marker that selects the unset variable operation variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for unset variable operation in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of unset variable operation for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on unset variable operation for adapters, analytics, audits, or tests.",
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
        "purpose": "InvalidateVariableOperation declares the invalidate variable operation that can run from step hooks or branches.",
        "usage": "Use InvalidateVariableOperation inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Variable key read, written, validated, traced, or exposed in API responses for invalidate variable operation.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "Variable namespace used to separate conversation, flow, operation, and system values for invalidate variable operation.",
            "required": false
          },
          {
            "name": "reason",
            "type": "string",
            "description": "Reason text stored for invalidation, handoff, or controlled termination for invalidate variable operation.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "Operation identifier recorded in traces and variable history for invalidate variable operation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"invalidate_variable\"",
            "description": "Literal \"invalidate_variable\" marker that selects the invalidate variable operation variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for invalidate variable operation in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of invalidate variable operation for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on invalidate variable operation for adapters, analytics, audits, or tests.",
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
        "purpose": "RunActionOperation declares the run action operation that can run from step hooks or branches.",
        "usage": "Use RunActionOperation inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Action contract identifier referenced by run_action operations for run action operation.",
            "required": true
          },
          {
            "name": "inputMapping",
            "type": "Record<string, ValueExpression>",
            "description": "Mapping from variables and context into an action input payload for run action operation.",
            "required": false
          },
          {
            "name": "outputMapping",
            "type": "Record<string, string>",
            "description": "Mapping from child flow or action output back to parent variables for run action operation.",
            "required": false
          },
          {
            "name": "resultVariableId",
            "type": "string",
            "description": "Identifier that links run action operation to the result variable record it references.",
            "required": false
          },
          {
            "name": "onResult",
            "type": "ActionResultBranch[]",
            "description": "Collection of ActionResultBranch values carried by run action operation.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "Operation identifier recorded in traces and variable history for run action operation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"run_action\"",
            "description": "Literal \"run_action\" marker that selects the run action operation variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for run action operation in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of run action operation for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on run action operation for adapters, analytics, audits, or tests.",
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
        "purpose": "ActionResultBranch describes branch work and targets selected after an outcome match.",
        "usage": "Use ActionResultBranch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Route match rule compared with a step or operation outcome for action result branch.",
            "required": true
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch executed when a match or option succeeds for action result branch.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for action result branch in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of action result branch for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on action result branch for adapters, analytics, audits, or tests.",
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
        "purpose": "ActionResultMatch enumerates the allowed action result match values accepted by operations.",
        "usage": "Use ActionResultMatch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for action result match.",
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
        "purpose": "ActionStatusMatch describes the matching rule used to select result branches.",
        "usage": "Use ActionStatusMatch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Literal \"status\" marker that selects the action status match variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "status",
            "type": "ActionResultStatus",
            "description": "State value that drives routing, result handling, or lifecycle decisions for action status match.",
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
        "purpose": "ActionErrorCodeMatch describes the matching rule used to select result branches.",
        "usage": "Use ActionErrorCodeMatch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Literal \"error_code\" marker that selects the action error code match variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "errorCode",
            "type": "string",
            "description": "Error code value on action error code match; TypeScript expects a string.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "ActionOutcomeMatch",
        "kind": "interface",
        "purpose": "ActionOutcomeMatch describes the matching rule used to select result branches.",
        "usage": "Use ActionOutcomeMatch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Literal \"outcome\" marker that selects the action outcome match variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Outcome value used to choose branches or report handler results for action outcome match.",
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
        "purpose": "EmitEventOperation declares the emit event operation that can run from step hooks or branches.",
        "usage": "Use EmitEventOperation inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Event name emitted by an input or operation for emit event operation.",
            "required": true
          },
          {
            "name": "payload",
            "type": "Record<string, ValueExpression>",
            "description": "Structured payload carried by events, choices, messages, or custom content for emit event operation.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "Operation identifier recorded in traces and variable history for emit event operation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"emit_event\"",
            "description": "Literal \"emit_event\" marker that selects the emit event operation variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for emit event operation in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of emit event operation for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on emit event operation for adapters, analytics, audits, or tests.",
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
        "purpose": "CallFlowOperation declares the call flow operation that can run from step hooks or branches.",
        "usage": "Use CallFlowOperation inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Specific flow version selected for loading, state, traces, and start requests for call flow operation.",
            "required": true
          },
          {
            "name": "inputMapping",
            "type": "Record<string, ValueExpression>",
            "description": "Mapping from variables and context into an action input payload for call flow operation.",
            "required": false
          },
          {
            "name": "outputMapping",
            "type": "Record<string, string>",
            "description": "Mapping from child flow or action output back to parent variables for call flow operation.",
            "required": false
          },
          {
            "name": "variableSharing",
            "type": "FlowCallVariableSharing",
            "description": "Variable sharing value on call flow operation; TypeScript expects a FlowCallVariableSharing.",
            "required": false
          },
          {
            "name": "resultVariableId",
            "type": "string",
            "description": "Identifier that links call flow operation to the result variable record it references.",
            "required": false
          },
          {
            "name": "onResult",
            "type": "FlowCallResultBranch[]",
            "description": "Collection of FlowCallResultBranch values carried by call flow operation.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "Operation identifier recorded in traces and variable history for call flow operation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"call_flow\"",
            "description": "Literal \"call_flow\" marker that selects the call flow operation variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for call flow operation in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of call flow operation for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on call flow operation for adapters, analytics, audits, or tests.",
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
        "purpose": "FlowCallVariableSharing carries scopes, include variable ids, and exclude variable ids for operations.",
        "usage": "Use FlowCallVariableSharing inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Collection of VariableScope values carried by flow call variable sharing.",
            "required": false
          },
          {
            "name": "includeVariableIds",
            "type": "string[]",
            "description": "Identifier list that links flow call variable sharing to the referenced include variable records.",
            "required": false
          },
          {
            "name": "excludeVariableIds",
            "type": "string[]",
            "description": "Variables deliberately omitted from a child flow call for flow call variable sharing.",
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
        "purpose": "FlowCallStatus enumerates the allowed flow call status values accepted by operations.",
        "usage": "Use FlowCallStatus inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "FlowCallStatus accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "FlowCallResult",
        "kind": "interface",
        "purpose": "FlowCallResult captures the outcome, variables, trace data, and errors from flow call.",
        "usage": "Use FlowCallResult inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "State value that drives routing, result handling, or lifecycle decisions for flow call result.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Outcome value used to choose branches or report handler results for flow call result.",
            "required": false
          },
          {
            "name": "frameId",
            "type": "string",
            "description": "Identifier that links flow call result to the frame record it references.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "Specific flow version selected for loading, state, traces, and start requests for flow call result.",
            "required": true
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<string>[]",
            "description": "Variable patches applied during the turn for flow call result.",
            "required": false
          },
          {
            "name": "error",
            "type": "RuntimeError",
            "description": "Error value on flow call result; TypeScript expects a RuntimeError.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on flow call result for adapters, analytics, audits, or tests.",
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
        "purpose": "FlowCallResultBranch describes branch work and targets selected after an outcome match.",
        "usage": "Use FlowCallResultBranch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Route match rule compared with a step or operation outcome for flow call result branch.",
            "required": true
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch executed when a match or option succeeds for flow call result branch.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for flow call result branch in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of flow call result branch for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on flow call result branch for adapters, analytics, audits, or tests.",
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
        "purpose": "FlowCallResultMatch enumerates the allowed flow call result match values accepted by operations.",
        "usage": "Use FlowCallResultMatch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for flow call result match.",
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
        "purpose": "FlowCallStatusMatch describes the matching rule used to select result branches.",
        "usage": "Use FlowCallStatusMatch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Literal \"status\" marker that selects the flow call status match variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "status",
            "type": "FlowCallStatus",
            "description": "State value that drives routing, result handling, or lifecycle decisions for flow call status match.",
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
        "purpose": "FlowCallOutcomeMatch describes the matching rule used to select result branches.",
        "usage": "Use FlowCallOutcomeMatch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Literal \"outcome\" marker that selects the flow call outcome match variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Outcome value used to choose branches or report handler results for flow call outcome match.",
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
        "purpose": "HandoffOperation declares the handoff operation that can run from step hooks or branches.",
        "usage": "Use HandoffOperation inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Channel name associated with the conversation, input, message, or render pass for handoff operation.",
            "required": false
          },
          {
            "name": "queue",
            "type": "string",
            "description": "Target queue for an external handoff for handoff operation.",
            "required": false
          },
          {
            "name": "reason",
            "type": "ValueExpression",
            "description": "Reason text stored for invalidation, handoff, or controlled termination for handoff operation.",
            "required": false
          },
          {
            "name": "metadataMapping",
            "type": "Record<string, ValueExpression>",
            "description": "Lookup table stored on handoff operation with keys and values matching Record<string, ValueExpression>.",
            "required": false
          },
          {
            "name": "handoffIdVariableId",
            "type": "string",
            "description": "Identifier that links handoff operation to the handoff id variable record it references.",
            "required": false
          },
          {
            "name": "message",
            "type": "ResponsePlan",
            "description": "Validation message or outbound text shown to users for handoff operation.",
            "required": false
          },
          {
            "name": "onResult",
            "type": "HandoffResultBranch[]",
            "description": "Collection of HandoffResultBranch values carried by handoff operation.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "Operation identifier recorded in traces and variable history for handoff operation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"handoff\"",
            "description": "Literal \"handoff\" marker that selects the handoff operation variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for handoff operation in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of handoff operation for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on handoff operation for adapters, analytics, audits, or tests.",
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
        "purpose": "HandoffResultStatus enumerates the allowed handoff result status values accepted by operations.",
        "usage": "Use HandoffResultStatus inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "HandoffResultStatus accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "HandoffResult",
        "kind": "interface",
        "purpose": "HandoffResult captures the outcome, variables, trace data, and errors from handoff.",
        "usage": "Use HandoffResult inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "State value that drives routing, result handling, or lifecycle decisions for handoff result.",
            "required": true
          },
          {
            "name": "handoffId",
            "type": "string",
            "description": "Handoff identifier returned by a handoff operation for handoff result.",
            "required": false
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Outcome value used to choose branches or report handler results for handoff result.",
            "required": false
          },
          {
            "name": "errorCode",
            "type": "string",
            "description": "Error code value on handoff result; TypeScript expects a string.",
            "required": false
          },
          {
            "name": "errorMessage",
            "type": "string",
            "description": "Human-readable failure message returned by a handler or runtime error for handoff result.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on handoff result for adapters, analytics, audits, or tests.",
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
        "purpose": "HandoffResultBranch describes branch work and targets selected after an outcome match.",
        "usage": "Use HandoffResultBranch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Route match rule compared with a step or operation outcome for handoff result branch.",
            "required": true
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch executed when a match or option succeeds for handoff result branch.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for handoff result branch in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of handoff result branch for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on handoff result branch for adapters, analytics, audits, or tests.",
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
        "purpose": "HandoffResultMatch enumerates the allowed handoff result match values accepted by operations.",
        "usage": "Use HandoffResultMatch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for handoff result match.",
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
        "purpose": "HandoffStatusMatch describes the matching rule used to select result branches.",
        "usage": "Use HandoffStatusMatch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Literal \"status\" marker that selects the handoff status match variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "status",
            "type": "HandoffResultStatus",
            "description": "State value that drives routing, result handling, or lifecycle decisions for handoff status match.",
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
        "purpose": "HandoffOutcomeMatch describes the matching rule used to select result branches.",
        "usage": "Use HandoffOutcomeMatch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Literal \"outcome\" marker that selects the handoff outcome match variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Outcome value used to choose branches or report handler results for handoff outcome match.",
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
        "purpose": "HandoffErrorCodeMatch describes the matching rule used to select result branches.",
        "usage": "Use HandoffErrorCodeMatch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Literal \"error_code\" marker that selects the handoff error code match variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "errorCode",
            "type": "string",
            "description": "Error code value on handoff error code match; TypeScript expects a string.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "CustomOperation",
        "kind": "interface",
        "purpose": "CustomOperation declares the custom operation that can run from step hooks or branches.",
        "usage": "Use CustomOperation inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Identifier for a custom operation declaration for custom operation.",
            "required": true
          },
          {
            "name": "customType",
            "type": "string",
            "description": "Custom operation type used to find the configured executor for custom operation.",
            "required": true
          },
          {
            "name": "inputMapping",
            "type": "Record<string, ValueExpression>",
            "description": "Mapping from variables and context into an action input payload for custom operation.",
            "required": false
          },
          {
            "name": "config",
            "type": "JsonObject",
            "description": "Configuration payload read by handlers for this step, action, operation, or runtime service for custom operation.",
            "required": false
          },
          {
            "name": "resultVariableId",
            "type": "string",
            "description": "Identifier that links custom operation to the result variable record it references.",
            "required": false
          },
          {
            "name": "onResult",
            "type": "CustomOperationResultBranch[]",
            "description": "Collection of CustomOperationResultBranch values carried by custom operation.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "Operation identifier recorded in traces and variable history for custom operation.",
            "required": false
          },
          {
            "name": "type",
            "type": "\"custom\"",
            "description": "Literal \"custom\" marker that selects the custom operation variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for custom operation in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of custom operation for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on custom operation for adapters, analytics, audits, or tests.",
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
        "purpose": "CustomOperationResultStatus enumerates the allowed custom operation result status values accepted by operations.",
        "usage": "Use CustomOperationResultStatus inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "CustomOperationResultStatus accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "CustomOperationResult",
        "kind": "interface",
        "purpose": "CustomOperationResult captures the outcome, variables, trace data, and errors from custom operation.",
        "usage": "Use CustomOperationResult inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "State value that drives routing, result handling, or lifecycle decisions for custom operation result.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Outcome value used to choose branches or report handler results for custom operation result.",
            "required": false
          },
          {
            "name": "outputs",
            "type": "Record<string, unknown>",
            "description": "Structured values returned by an action or operation for custom operation result.",
            "required": false
          },
          {
            "name": "errorCode",
            "type": "string",
            "description": "Error code value on custom operation result; TypeScript expects a string.",
            "required": false
          },
          {
            "name": "errorMessage",
            "type": "string",
            "description": "Human-readable failure message returned by a handler or runtime error for custom operation result.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on custom operation result for adapters, analytics, audits, or tests.",
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
        "purpose": "CustomOperationResultBranch describes branch work and targets selected after an outcome match.",
        "usage": "Use CustomOperationResultBranch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Route match rule compared with a step or operation outcome for custom operation result branch.",
            "required": true
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch executed when a match or option succeeds for custom operation result branch.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for custom operation result branch in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of custom operation result branch for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on custom operation result branch for adapters, analytics, audits, or tests.",
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
        "purpose": "CustomOperationResultMatch enumerates the allowed custom operation result match values accepted by operations.",
        "usage": "Use CustomOperationResultMatch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for custom operation result match.",
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
        "purpose": "CustomOperationStatusMatch describes the matching rule used to select result branches.",
        "usage": "Use CustomOperationStatusMatch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Literal \"status\" marker that selects the custom operation status match variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "status",
            "type": "CustomOperationResultStatus",
            "description": "State value that drives routing, result handling, or lifecycle decisions for custom operation status match.",
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
        "purpose": "CustomOperationOutcomeMatch describes the matching rule used to select result branches.",
        "usage": "Use CustomOperationOutcomeMatch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Literal \"outcome\" marker that selects the custom operation outcome match variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Outcome value used to choose branches or report handler results for custom operation outcome match.",
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
        "purpose": "CustomOperationErrorCodeMatch describes the matching rule used to select result branches.",
        "usage": "Use CustomOperationErrorCodeMatch inside onEnter, onExit, and branch sequences to mutate variables, send messages, call flows, or hand off.",
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
            "description": "Literal \"error_code\" marker that selects the custom operation error code match variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "errorCode",
            "type": "string",
            "description": "Error code value on custom operation error code match; TypeScript expects a string.",
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
        "purpose": "InputType enumerates the allowed input values accepted by input processing.",
        "usage": "Use InputType to describe accepted input, value bindings, semantic tasks, and invalid-input behavior.",
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
            "description": "InputType accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "InputContract",
        "kind": "interface",
        "purpose": "InputContract carries accepted input types, bindings, global commands, semantic tasks, invalid behavior, and unknown behavior for input processing.",
        "usage": "Use InputContract to describe accepted input, value bindings, semantic tasks, and invalid-input behavior.",
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
            "description": "Input types this contract can accept while the step is waiting for input contract.",
            "required": true
          },
          {
            "name": "bindings",
            "type": "InputBinding[]",
            "description": "Input binding rules that write accepted values into variables for input contract.",
            "required": false
          },
          {
            "name": "globalCommands",
            "type": "GlobalCommandPolicy",
            "description": "Global command rules available while waiting for input for input contract.",
            "required": false
          },
          {
            "name": "semanticTasks",
            "type": "SemanticInputTask<TOutcome, TVariableId>[]",
            "description": "Semantic classification tasks allowed for the input step for input contract.",
            "required": false
          },
          {
            "name": "invalidBehavior",
            "type": "InvalidInputBehavior",
            "description": "Invalid behavior value on input contract; TypeScript expects an InvalidInputBehavior.",
            "required": false
          },
          {
            "name": "unknownBehavior",
            "type": "UnknownInputBehavior",
            "description": "Unknown behavior value on input contract; TypeScript expects an UnknownInputBehavior.",
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
        "purpose": "InputBinding carries target variable id, source, required, normalizers, extractors, and validators for input processing.",
        "usage": "Use InputBinding to describe accepted input, value bindings, semantic tasks, and invalid-input behavior.",
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
            "description": "Variable that receives captured input, attachments, or mapped output for input binding.",
            "required": true
          },
          {
            "name": "source",
            "type": "InputType",
            "description": "Origin recorded for a variable write, trace fragment, event, or candidate for input binding.",
            "required": true
          },
          {
            "name": "required",
            "type": "boolean",
            "description": "Flag that marks the value or attachment as mandatory for validation for input binding.",
            "required": false
          },
          {
            "name": "normalizers",
            "type": "NormalizerDefinition[]",
            "description": "Normalizers run before validators accept a captured value for input binding.",
            "required": false
          },
          {
            "name": "extractors",
            "type": "ExtractorDefinition[]",
            "description": "Extractors that derive candidate values from raw input for input binding.",
            "required": false
          },
          {
            "name": "validators",
            "type": "ValidatorDefinition[]",
            "description": "Validator definitions run before accepting an input binding for input binding.",
            "required": false
          },
          {
            "name": "saveRawInput",
            "type": "boolean",
            "description": "Save raw input value on input binding; TypeScript expects a boolean.",
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
        "purpose": "GlobalCommandPolicy carries allow cancel, allow help, allow back, and allow handoff for input processing.",
        "usage": "Use GlobalCommandPolicy to describe accepted input, value bindings, semantic tasks, and invalid-input behavior.",
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
            "description": "Allow cancel value on global command policy; TypeScript expects a boolean.",
            "required": false
          },
          {
            "name": "allowHelp",
            "type": "boolean",
            "description": "Allow help value on global command policy; TypeScript expects a boolean.",
            "required": false
          },
          {
            "name": "allowBack",
            "type": "boolean",
            "description": "Allow back value on global command policy; TypeScript expects a boolean.",
            "required": false
          },
          {
            "name": "allowHandoff",
            "type": "boolean",
            "description": "Allow handoff value on global command policy; TypeScript expects a boolean.",
            "required": false
          }
        ],
        "related": []
      },
      {
        "name": "SemanticInputTaskMode",
        "kind": "union type",
        "purpose": "SemanticInputTaskMode enumerates the allowed semantic input task mode values accepted by input processing.",
        "usage": "Use SemanticInputTaskMode to describe accepted input, value bindings, semantic tasks, and invalid-input behavior.",
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
            "description": "SemanticInputTaskMode accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "SemanticInputTask",
        "kind": "interface",
        "purpose": "SemanticInputTask carries task id, mode, allowed outcomes, threshold, save outcome to variable id, and allowed variable ids for input processing.",
        "usage": "Use SemanticInputTask to describe accepted input, value bindings, semantic tasks, and invalid-input behavior.",
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
            "description": "Identifier that links semantic input task to the task record it references.",
            "required": false
          },
          {
            "name": "mode",
            "type": "SemanticInputTaskMode",
            "description": "Response rendering mode chosen by the plan for semantic input task.",
            "required": true
          },
          {
            "name": "allowedOutcomes",
            "type": "readonly TOutcome[]",
            "description": "Outcome strings accepted from semantic tasks or custom operations for semantic input task.",
            "required": true
          },
          {
            "name": "threshold",
            "type": "number",
            "description": "Minimum confidence required before semantic input is accepted for semantic input task.",
            "required": true
          },
          {
            "name": "saveOutcomeToVariableId",
            "type": "TVariableId",
            "description": "Identifier that links semantic input task to the save outcome to variable record it references.",
            "required": false
          },
          {
            "name": "allowedVariableIds",
            "type": "readonly TVariableId[]",
            "description": "Allow-list of variables a semantic or generated-response provider may use for semantic input task.",
            "required": false
          },
          {
            "name": "promptHint",
            "type": "string",
            "description": "Prompt hint value on semantic input task; TypeScript expects a string.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for semantic input task in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of semantic input task for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on semantic input task for adapters, analytics, audits, or tests.",
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
        "purpose": "InvalidInputBehavior carries message, target, and max retries for input processing.",
        "usage": "Use InvalidInputBehavior to describe accepted input, value bindings, semantic tasks, and invalid-input behavior.",
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
            "description": "Validation message or outbound text shown to users for invalid input behavior.",
            "required": false
          },
          {
            "name": "target",
            "type": "StepTarget",
            "description": "Step or terminal target reached by a branch for invalid input behavior.",
            "required": false
          },
          {
            "name": "maxRetries",
            "type": "number",
            "description": "Max retries value on invalid input behavior; TypeScript expects a number.",
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
        "purpose": "UnknownInputBehavior carries message, and target for input processing.",
        "usage": "Use UnknownInputBehavior to describe accepted input, value bindings, semantic tasks, and invalid-input behavior.",
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
            "description": "Validation message or outbound text shown to users for unknown input behavior.",
            "required": false
          },
          {
            "name": "target",
            "type": "StepTarget",
            "description": "Step or terminal target reached by a branch for unknown input behavior.",
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
        "purpose": "AttachmentRules carries required, allowed mime types, allowed extensions, max files, max size mb, and validators for input processing.",
        "usage": "Use AttachmentRules to describe accepted input, value bindings, semantic tasks, and invalid-input behavior.",
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
            "description": "Flag that marks the value or attachment as mandatory for validation for attachment rules.",
            "required": false
          },
          {
            "name": "allowedMimeTypes",
            "type": "string[]",
            "description": "MIME types accepted by attachment validation for attachment rules.",
            "required": false
          },
          {
            "name": "allowedExtensions",
            "type": "string[]",
            "description": "File extensions accepted by attachment validation for attachment rules.",
            "required": false
          },
          {
            "name": "maxFiles",
            "type": "number",
            "description": "Maximum number of attachments accepted for attachment rules.",
            "required": false
          },
          {
            "name": "maxSizeMb",
            "type": "number",
            "description": "Maximum accepted attachment size in megabytes for attachment rules.",
            "required": false
          },
          {
            "name": "validators",
            "type": "ValidatorDefinition[]",
            "description": "Validator definitions run before accepting an input binding for attachment rules.",
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
        "purpose": "NormalizerDefinition describes author-authored normalizer data consumed by validation and runtime execution.",
        "usage": "Use NormalizerDefinition to describe accepted input, value bindings, semantic tasks, and invalid-input behavior.",
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
            "description": "Type discriminator that directs validation and runtime handling for normalizer definition.",
            "required": true
          },
          {
            "name": "options",
            "type": "JsonObject",
            "description": "Options value on normalizer definition; TypeScript expects a JsonObject.",
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
        "purpose": "ExtractorDefinition describes author-authored extractor data consumed by validation and runtime execution.",
        "usage": "Use ExtractorDefinition to describe accepted input, value bindings, semantic tasks, and invalid-input behavior.",
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
            "description": "Type discriminator that directs validation and runtime handling for extractor definition.",
            "required": true
          },
          {
            "name": "options",
            "type": "JsonObject",
            "description": "Options value on extractor definition; TypeScript expects a JsonObject.",
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
        "purpose": "ValidatorDefinition describes author-authored validator data consumed by validation and runtime execution.",
        "usage": "Use ValidatorDefinition to describe accepted input, value bindings, semantic tasks, and invalid-input behavior.",
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
            "description": "Type discriminator that directs validation and runtime handling for validator definition.",
            "required": true
          },
          {
            "name": "options",
            "type": "JsonObject",
            "description": "Options value on validator definition; TypeScript expects a JsonObject.",
            "required": false
          },
          {
            "name": "message",
            "type": "ResponsePlan",
            "description": "Validation message or outbound text shown to users for validator definition.",
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
        "purpose": "ValidationResult captures the outcome, variables, trace data, and errors from validation.",
        "usage": "Use ValidationResult to describe accepted input, value bindings, semantic tasks, and invalid-input behavior.",
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
            "description": "Overall validation result for validation result.",
            "required": true
          },
          {
            "name": "reason",
            "type": "string",
            "description": "Reason text stored for invalidation, handoff, or controlled termination for validation result.",
            "required": false
          },
          {
            "name": "normalizedValue",
            "type": "unknown",
            "description": "Normalized value value on validation result; TypeScript expects an unknown.",
            "required": false
          },
          {
            "name": "errorCode",
            "type": "string",
            "description": "Error code value on validation result; TypeScript expects a string.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on validation result for adapters, analytics, audits, or tests.",
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
        "purpose": "UserInput enumerates the allowed user input values accepted by user input.",
        "usage": "Use UserInput for channel input DTOs that enter the runtime through the engine or API adapter.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for user input.",
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
        "purpose": "BaseUserInput is an input DTO accepted by the runtime or adapter.",
        "usage": "Use BaseUserInput for channel input DTOs that enter the runtime through the engine or API adapter.",
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
            "description": "Input identifier used to trace a user message, choice, attachment, or event for base user input.",
            "required": true
          },
          {
            "name": "type",
            "type": "TType",
            "description": "Type discriminator that directs validation and runtime handling for base user input.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for base user input.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for base user input.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Channel name associated with the conversation, input, message, or render pass for base user input.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "Timestamp when the adapter or channel received input for base user input.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on base user input for adapters, analytics, audits, or tests.",
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
        "purpose": "TextUserInput is an input DTO accepted by the runtime or adapter.",
        "usage": "Use TextUserInput for channel input DTOs that enter the runtime through the engine or API adapter.",
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
            "description": "Plain text sent by the user, rendered by a response, or emitted in a message for text user input.",
            "required": true
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "Input identifier used to trace a user message, choice, attachment, or event for text user input.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"text\"",
            "description": "Literal \"text\" marker that selects the text user input variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for text user input.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for text user input.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Channel name associated with the conversation, input, message, or render pass for text user input.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "Timestamp when the adapter or channel received input for text user input.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on text user input for adapters, analytics, audits, or tests.",
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
        "purpose": "ChoiceUserInput is an input DTO accepted by the runtime or adapter.",
        "usage": "Use ChoiceUserInput for channel input DTOs that enter the runtime through the engine or API adapter.",
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
            "description": "Menu option identifier used for choices and branch matches for choice user input.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for choice user input in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Structured payload carried by events, choices, messages, or custom content for choice user input.",
            "required": false
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "Input identifier used to trace a user message, choice, attachment, or event for choice user input.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"choice\"",
            "description": "Literal \"choice\" marker that selects the choice user input variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for choice user input.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for choice user input.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Channel name associated with the conversation, input, message, or render pass for choice user input.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "Timestamp when the adapter or channel received input for choice user input.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on choice user input for adapters, analytics, audits, or tests.",
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
        "purpose": "AttachmentUserInput is an input DTO accepted by the runtime or adapter.",
        "usage": "Use AttachmentUserInput for channel input DTOs that enter the runtime through the engine or API adapter.",
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
            "description": "Attachment list supplied by input or message content for attachment user input.",
            "required": true
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "Input identifier used to trace a user message, choice, attachment, or event for attachment user input.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"attachment\"",
            "description": "Literal \"attachment\" marker that selects the attachment user input variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for attachment user input.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for attachment user input.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Channel name associated with the conversation, input, message, or render pass for attachment user input.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "Timestamp when the adapter or channel received input for attachment user input.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on attachment user input for adapters, analytics, audits, or tests.",
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
        "purpose": "AttachmentInput is an input DTO accepted by the runtime or adapter.",
        "usage": "Use AttachmentInput for channel input DTOs that enter the runtime through the engine or API adapter.",
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
            "description": "Identifier that links attachment input to the attachment record it references.",
            "required": false
          },
          {
            "name": "filename",
            "type": "string",
            "description": "Original file name supplied with an attachment for attachment input.",
            "required": true
          },
          {
            "name": "mimeType",
            "type": "string",
            "description": "MIME type supplied with an attachment for attachment input.",
            "required": true
          },
          {
            "name": "sizeBytes",
            "type": "number",
            "description": "Attachment size in bytes for attachment input.",
            "required": true
          },
          {
            "name": "url",
            "type": "string",
            "description": "Download URL or storage URL for an attachment for attachment input.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on attachment input for adapters, analytics, audits, or tests.",
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
        "purpose": "PayloadUserInput is an input DTO accepted by the runtime or adapter.",
        "usage": "Use PayloadUserInput for channel input DTOs that enter the runtime through the engine or API adapter.",
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
            "description": "Structured payload carried by events, choices, messages, or custom content for payload user input.",
            "required": true
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "Input identifier used to trace a user message, choice, attachment, or event for payload user input.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"payload\"",
            "description": "Literal \"payload\" marker that selects the payload user input variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for payload user input.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for payload user input.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Channel name associated with the conversation, input, message, or render pass for payload user input.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "Timestamp when the adapter or channel received input for payload user input.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on payload user input for adapters, analytics, audits, or tests.",
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
        "purpose": "EventUserInput is an input DTO accepted by the runtime or adapter.",
        "usage": "Use EventUserInput for channel input DTOs that enter the runtime through the engine or API adapter.",
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
            "description": "Event name emitted by an input or operation for event user input.",
            "required": true
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Structured payload carried by events, choices, messages, or custom content for event user input.",
            "required": false
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "Input identifier used to trace a user message, choice, attachment, or event for event user input.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"event\"",
            "description": "Literal \"event\" marker that selects the event user input variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for event user input.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for event user input.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Channel name associated with the conversation, input, message, or render pass for event user input.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "Timestamp when the adapter or channel received input for event user input.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on event user input for adapters, analytics, audits, or tests.",
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
        "purpose": "CandidateType enumerates the allowed candidate values accepted by input resolution.",
        "usage": "Use CandidateType to report how raw input became candidates, selected outcomes, variables, or semantic results.",
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
            "description": "CandidateType accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "CommandCandidate",
        "kind": "interface",
        "purpose": "CommandCandidate carries candidate id, type, outcome, option id, variable patches, and source for input resolution.",
        "usage": "Use CommandCandidate to report how raw input became candidates, selected outcomes, variables, or semantic results.",
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
            "description": "Candidate identifier recorded during input resolution for command candidate.",
            "required": true
          },
          {
            "name": "type",
            "type": "CandidateType",
            "description": "Type discriminator that directs validation and runtime handling for command candidate.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "TOutcome",
            "description": "Outcome value used to choose branches or report handler results for command candidate.",
            "required": false
          },
          {
            "name": "optionId",
            "type": "string",
            "description": "Menu option identifier used for choices and branch matches for command candidate.",
            "required": false
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<TVariableId>[]",
            "description": "Variable patches applied during the turn for command candidate.",
            "required": false
          },
          {
            "name": "source",
            "type": "string",
            "description": "Origin recorded for a variable write, trace fragment, event, or candidate for command candidate.",
            "required": true
          },
          {
            "name": "confidence",
            "type": "number",
            "description": "Confidence score assigned by semantic input or matching logic for command candidate.",
            "required": false
          },
          {
            "name": "explanation",
            "type": "string",
            "description": "Explanation value on command candidate; TypeScript expects a string.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on command candidate for adapters, analytics, audits, or tests.",
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
        "purpose": "InputResolutionResult captures the outcome, variables, trace data, and errors from input resolution.",
        "usage": "Use InputResolutionResult to report how raw input became candidates, selected outcomes, variables, or semantic results.",
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
            "description": "State value that drives routing, result handling, or lifecycle decisions for input resolution result.",
            "required": true
          },
          {
            "name": "candidates",
            "type": "CommandCandidate<TOutcome, TVariableId>[]",
            "description": "Candidate matches considered while resolving input for input resolution result.",
            "required": true
          },
          {
            "name": "selectedCandidate",
            "type": "CommandCandidate<TOutcome, TVariableId>",
            "description": "Selected candidate value on input resolution result; TypeScript expects a CommandCandidate<TOutcome, TVariableId>.",
            "required": false
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<TVariableId>[]",
            "description": "Variable patches applied during the turn for input resolution result.",
            "required": false
          },
          {
            "name": "validationResults",
            "type": "ValidationResult[]",
            "description": "Collection of ValidationResult values carried by input resolution result.",
            "required": false
          },
          {
            "name": "outcome",
            "type": "TOutcome",
            "description": "Outcome value used to choose branches or report handler results for input resolution result.",
            "required": false
          },
          {
            "name": "trace",
            "type": "TraceFragment",
            "description": "Trace value on input resolution result; TypeScript expects a TraceFragment.",
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
        "purpose": "SemanticInputResolution carries task id, allowed outcomes, allowed variable ids, confidence, variables, and status for input resolution.",
        "usage": "Use SemanticInputResolution to report how raw input became candidates, selected outcomes, variables, or semantic results.",
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
            "description": "Identifier that links semantic input resolution to the task record it references.",
            "required": false
          },
          {
            "name": "allowedOutcomes",
            "type": "readonly TOutcome[]",
            "description": "Outcome strings accepted from semantic tasks or custom operations for semantic input resolution.",
            "required": true
          },
          {
            "name": "allowedVariableIds",
            "type": "readonly TVariableId[]",
            "description": "Allow-list of variables a semantic or generated-response provider may use for semantic input resolution.",
            "required": false
          },
          {
            "name": "confidence",
            "type": "number",
            "description": "Confidence score assigned by semantic input or matching logic for semantic input resolution.",
            "required": false
          },
          {
            "name": "variables",
            "type": "Partial<Record<TVariableId, unknown>>",
            "description": "Declared variable catalog and current runtime values for semantic input resolution.",
            "required": false
          },
          {
            "name": "status",
            "type": "\"unknown\" | \"resolved\" | \"invalid\" | \"ambiguous\"",
            "description": "State value that drives routing, result handling, or lifecycle decisions for semantic input resolution.",
            "required": true
          },
          {
            "name": "candidates",
            "type": "CommandCandidate<TOutcome, TVariableId>[]",
            "description": "Candidate matches considered while resolving input for semantic input resolution.",
            "required": true
          },
          {
            "name": "selectedCandidate",
            "type": "CommandCandidate<TOutcome, TVariableId>",
            "description": "Selected candidate value on semantic input resolution; TypeScript expects a CommandCandidate<TOutcome, TVariableId>.",
            "required": false
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<TVariableId>[]",
            "description": "Variable patches applied during the turn for semantic input resolution.",
            "required": false
          },
          {
            "name": "validationResults",
            "type": "ValidationResult[]",
            "description": "Collection of ValidationResult values carried by semantic input resolution.",
            "required": false
          },
          {
            "name": "outcome",
            "type": "TOutcome",
            "description": "Outcome value used to choose branches or report handler results for semantic input resolution.",
            "required": false
          },
          {
            "name": "trace",
            "type": "TraceFragment",
            "description": "Trace value on semantic input resolution; TypeScript expects a TraceFragment.",
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
        "purpose": "Conversation carries conversation id, flow version id, status, channel, user id, and created at for runtime state.",
        "usage": "Use Conversation when persisting or inspecting conversations, state snapshots, turns, pending input, and flow-call frames.",
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
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for conversation.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "Specific flow version selected for loading, state, traces, and start requests for conversation.",
            "required": true
          },
          {
            "name": "status",
            "type": "ConversationStatus",
            "description": "State value that drives routing, result handling, or lifecycle decisions for conversation.",
            "required": true
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Channel name associated with the conversation, input, message, or render pass for conversation.",
            "required": false
          },
          {
            "name": "userId",
            "type": "string",
            "description": "Application user identifier associated with a conversation for conversation.",
            "required": false
          },
          {
            "name": "createdAt",
            "type": "string",
            "description": "Creation timestamp assigned by the runtime clock for conversation.",
            "required": true
          },
          {
            "name": "updatedAt",
            "type": "string",
            "description": "Timestamp for the last accepted write to the runtime value for conversation.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on conversation for adapters, analytics, audits, or tests.",
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
        "purpose": "ConversationState carries conversation id, flow version id, status, current step id, variables, and scoped variables for runtime state.",
        "usage": "Use ConversationState when persisting or inspecting conversations, state snapshots, turns, pending input, and flow-call frames.",
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
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for conversation state.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "Specific flow version selected for loading, state, traces, and start requests for conversation state.",
            "required": true
          },
          {
            "name": "status",
            "type": "ConversationStatus",
            "description": "State value that drives routing, result handling, or lifecycle decisions for conversation state.",
            "required": true
          },
          {
            "name": "currentStepId",
            "type": "string",
            "description": "Step currently active after the latest transition for conversation state.",
            "required": true
          },
          {
            "name": "variables",
            "type": "ConversationVariableValues",
            "description": "Declared variable catalog and current runtime values for conversation state.",
            "required": true
          },
          {
            "name": "scopedVariables",
            "type": "ScopedVariableValuesByKey",
            "description": "Scoped variables value on conversation state; TypeScript expects a ScopedVariableValuesByKey.",
            "required": false
          },
          {
            "name": "variableHistory",
            "type": "ConversationVariableHistory",
            "description": "Variable history value on conversation state; TypeScript expects a ConversationVariableHistory.",
            "required": false
          },
          {
            "name": "executionStack",
            "type": "FlowExecutionFrame[]",
            "description": "Flow-call stack frames currently active in the state for conversation state.",
            "required": true
          },
          {
            "name": "pendingInput",
            "type": "PendingInputState",
            "description": "Step waiting for the next user input for conversation state.",
            "required": false
          },
          {
            "name": "lastUserInput",
            "type": "UserInput",
            "description": "Last user input value on conversation state; TypeScript expects an UserInput.",
            "required": false
          },
          {
            "name": "lastOutboundMessages",
            "type": "OutboundMessage[]",
            "description": "Collection of OutboundMessage values carried by conversation state.",
            "required": false
          },
          {
            "name": "version",
            "type": "number",
            "description": "Author-facing version label for release and migration tracking for conversation state.",
            "required": true
          },
          {
            "name": "updatedAt",
            "type": "string",
            "description": "Timestamp for the last accepted write to the runtime value for conversation state.",
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
        "purpose": "ConversationVariableValues aliases the conversation variable values value shape used by runtime state integrations.",
        "usage": "Use ConversationVariableValues when persisting or inspecting conversations, state snapshots, turns, pending input, and flow-call frames.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for conversation variable values.",
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
        "purpose": "ScopedVariableValuesByKey aliases the scoped variable values by key value shape used by runtime state integrations.",
        "usage": "Use ScopedVariableValuesByKey when persisting or inspecting conversations, state snapshots, turns, pending input, and flow-call frames.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for scoped variable values by key.",
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
        "purpose": "ConversationVariableHistory aliases the conversation variable history value shape used by runtime state integrations.",
        "usage": "Use ConversationVariableHistory when persisting or inspecting conversations, state snapshots, turns, pending input, and flow-call frames.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for conversation variable history.",
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
        "purpose": "FlowExecutionFrame carries frame id, flow version id, flow id, current step id, parent frame id, and call operation id for runtime state.",
        "usage": "Use FlowExecutionFrame when persisting or inspecting conversations, state snapshots, turns, pending input, and flow-call frames.",
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
            "description": "Identifier that links flow execution frame to the frame record it references.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "Specific flow version selected for loading, state, traces, and start requests for flow execution frame.",
            "required": true
          },
          {
            "name": "flowId",
            "type": "string",
            "description": "Logical flow id shared across versions of the same conversation design for flow execution frame.",
            "required": true
          },
          {
            "name": "currentStepId",
            "type": "string",
            "description": "Step currently active after the latest transition for flow execution frame.",
            "required": true
          },
          {
            "name": "parentFrameId",
            "type": "string",
            "description": "Execution frame id of the parent flow call for flow execution frame.",
            "required": false
          },
          {
            "name": "callOperationId",
            "type": "string",
            "description": "Identifier that links flow execution frame to the call operation record it references.",
            "required": false
          },
          {
            "name": "calledFromStepId",
            "type": "string",
            "description": "Identifier that links flow execution frame to the called from step record it references.",
            "required": false
          },
          {
            "name": "returnTarget",
            "type": "StepTarget",
            "description": "Return target value on flow execution frame; TypeScript expects a StepTarget.",
            "required": false
          },
          {
            "name": "startedAt",
            "type": "string",
            "description": "Timestamp recorded when a conversation, turn, or frame starts for flow execution frame.",
            "required": true
          },
          {
            "name": "completedAt",
            "type": "string",
            "description": "Timestamp recorded when a flow call, handoff, or conversation completes for flow execution frame.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on flow execution frame for adapters, analytics, audits, or tests.",
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
        "purpose": "PendingInputState carries step id, input contract, created at, and retry count for runtime state.",
        "usage": "Use PendingInputState when persisting or inspecting conversations, state snapshots, turns, pending input, and flow-call frames.",
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
            "description": "Step identifier targeted by state, routes, traces, and execution context for pending input state.",
            "required": true
          },
          {
            "name": "inputContract",
            "type": "InputContract<string, string>",
            "description": "Input rules retained while the conversation is waiting so the next turn can resolve, validate, and bind user input.",
            "required": false
          },
          {
            "name": "createdAt",
            "type": "string",
            "description": "Creation timestamp assigned by the runtime clock for pending input state.",
            "required": true
          },
          {
            "name": "retryCount",
            "type": "number",
            "description": "Number of failed input attempts recorded for the pending step for pending input state.",
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
        "purpose": "Turn carries turn id, conversation id, user input, status, started at, and completed at for runtime state.",
        "usage": "Use Turn when persisting or inspecting conversations, state snapshots, turns, pending input, and flow-call frames.",
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
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for turn.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for turn.",
            "required": true
          },
          {
            "name": "userInput",
            "type": "UserInput",
            "description": "User input attached to a context, trace, or turn result for turn.",
            "required": false
          },
          {
            "name": "status",
            "type": "\"completed\" | \"failed\" | \"started\"",
            "description": "State value that drives routing, result handling, or lifecycle decisions for turn.",
            "required": true
          },
          {
            "name": "startedAt",
            "type": "string",
            "description": "Timestamp recorded when a conversation, turn, or frame starts for turn.",
            "required": true
          },
          {
            "name": "completedAt",
            "type": "string",
            "description": "Timestamp recorded when a flow call, handoff, or conversation completes for turn.",
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
        "purpose": "StepExecutionContext packages the runtime objects passed into step execution implementations.",
        "usage": "Use StepExecutionContext when implementing custom step handlers or testing lower-level step execution.",
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
            "description": "Flow value on step execution context; TypeScript expects a FlowVersion.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "Step value on step execution context; TypeScript expects a StepDefinition.",
            "required": true
          },
          {
            "name": "config",
            "type": "TConfig",
            "description": "Configuration payload read by handlers for this step, action, operation, or runtime service for step execution context.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Conversation state active in the current context for step execution context.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Turn active in the current context for step execution context.",
            "required": true
          },
          {
            "name": "userInput",
            "type": "UserInput",
            "description": "User input attached to a context, trace, or turn result for step execution context.",
            "required": false
          },
          {
            "name": "services",
            "type": "RuntimeServices",
            "description": "Runtime services used to resolve input, render responses, execute operations, and build traces for step execution context.",
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
        "purpose": "StepResult captures the outcome, variables, trace data, and errors from step.",
        "usage": "Use StepResult when implementing custom step handlers or testing lower-level step execution.",
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
            "description": "State value that drives routing, result handling, or lifecycle decisions for step result.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Outcome value used to choose branches or report handler results for step result.",
            "required": false
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch executed when a match or option succeeds for step result.",
            "required": false
          },
          {
            "name": "messages",
            "type": "OutboundMessage[]",
            "description": "Outbound response plans or message DTOs produced during a turn for step result.",
            "required": false
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<string>[]",
            "description": "Variable patches applied during the turn for step result.",
            "required": false
          },
          {
            "name": "events",
            "type": "ConversationEvent[]",
            "description": "Events emitted and committed during the turn for step result.",
            "required": false
          },
          {
            "name": "waitState",
            "type": "PendingInputState",
            "description": "Wait state value on step result; TypeScript expects a PendingInputState.",
            "required": false
          },
          {
            "name": "error",
            "type": "RuntimeError",
            "description": "Error value on step result; TypeScript expects a RuntimeError.",
            "required": false
          },
          {
            "name": "trace",
            "type": "TraceFragment",
            "description": "Trace value on step result; TypeScript expects a TraceFragment.",
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
        "purpose": "StepHandler is the extension contract for handling step behavior.",
        "usage": "Use StepHandler when implementing custom step handlers or testing lower-level step execution.",
        "signatures": [
          "export interface StepHandler<TConfig extends StepConfig = StepConfig> {\n    readonly stepType: StepType;\n    validate(step: StepDefinition, context: StepValidationContext): ValidationIssue[];\n    enter(context: StepExecutionContext<TConfig>): Promise<StepResult>;\n    handleInput?(context: StepExecutionContext<TConfig>, input: UserInput): Promise<StepResult>;\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(step: StepDefinition, context: StepValidationContext): ValidationIssue[]",
            "description": "Validates a flow, step, operation, value, or model object for StepHandler.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Step parameter for StepHandler.validate: StepDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "StepValidationContext",
                "description": "Runtime context for StepHandler.validate, using StepValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "ValidationIssue[]",
              "description": "StepHandler.validate returns a ValidationIssue[]."
            }
          },
          {
            "name": "enter",
            "signature": "enter(context: StepExecutionContext<TConfig>): Promise<StepResult>",
            "description": "StepHandler.enter runs the enter path defined for StepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "Runtime context for StepHandler.enter, using StepExecutionContext<TConfig> data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "StepHandler.enter resolves with StepResult."
            }
          },
          {
            "name": "handleInput",
            "signature": "handleInput?(context: StepExecutionContext<TConfig>, input: UserInput): Promise<StepResult>",
            "description": "StepHandler.handleInput runs the handle input path defined for StepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "Runtime context for StepHandler.handleInput, using StepExecutionContext<TConfig> data from the active turn.",
                "required": true
              },
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by StepHandler.handleInput: UserInput.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "StepHandler.handleInput resolves with StepResult."
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
            "description": "Step type value on step handler; TypeScript expects a string.",
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
        "purpose": "StepValidationContext packages the runtime objects passed into step validation implementations.",
        "usage": "Use StepValidationContext when implementing custom step handlers or testing lower-level step execution.",
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
            "description": "Flow value on step validation context; TypeScript expects a ConversationFlowDefinition.",
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
        "purpose": "ValidationSeverity enumerates the allowed validation severity values accepted by step execution contracts.",
        "usage": "Use ValidationSeverity when implementing custom step handlers or testing lower-level step execution.",
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
            "description": "ValidationSeverity accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "ValidationIssue",
        "kind": "interface",
        "purpose": "ValidationIssue carries issue id, severity, code, message, entity id, and metadata for step execution contracts.",
        "usage": "Use ValidationIssue when implementing custom step handlers or testing lower-level step execution.",
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
            "description": "Identifier that links validation issue to the issue record it references.",
            "required": false
          },
          {
            "name": "severity",
            "type": "ValidationSeverity",
            "description": "Severity value on validation issue; TypeScript expects a ValidationSeverity.",
            "required": true
          },
          {
            "name": "code",
            "type": "string",
            "description": "Machine-readable error code or status code emitted here for validation issue.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for validation issue.",
            "required": true
          },
          {
            "name": "entityId",
            "type": "string",
            "description": "Identifier that links validation issue to the entity record it references.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on validation issue for adapters, analytics, audits, or tests.",
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
        "purpose": "StepHandlerRegistry stores and retrieves runtime extensions for step handler.",
        "usage": "Use StepHandlerRegistry when implementing custom step handlers or testing lower-level step execution.",
        "signatures": [
          "export interface StepHandlerRegistry {\n    register(handler: StepHandler): void;\n    getHandler(stepType: StepType): StepHandler;\n    hasHandler(stepType: StepType): boolean;\n}"
        ],
        "methods": [
          {
            "name": "register",
            "signature": "register(handler: StepHandler): void",
            "description": "Registers an implementation by type for StepHandlerRegistry.",
            "parameters": [
              {
                "name": "handler",
                "type": "StepHandler",
                "description": "Handler parameter for StepHandlerRegistry.register: StepHandler.",
                "required": true
              }
            ],
            "returns": {
              "type": "void",
              "description": "StepHandlerRegistry.register completes after applying its side effect and returns no payload."
            }
          },
          {
            "name": "getHandler",
            "signature": "getHandler(stepType: StepType): StepHandler",
            "description": "Returns the handler registered for a type for StepHandlerRegistry.",
            "parameters": [
              {
                "name": "stepType",
                "type": "StepType",
                "description": "Step type parameter for StepHandlerRegistry.getHandler: StepType.",
                "required": true
              }
            ],
            "returns": {
              "type": "StepHandler",
              "description": "StepHandlerRegistry.getHandler returns a StepHandler."
            }
          },
          {
            "name": "hasHandler",
            "signature": "hasHandler(stepType: StepType): boolean",
            "description": "Checks whether a handler exists for a type for StepHandlerRegistry.",
            "parameters": [
              {
                "name": "stepType",
                "type": "StepType",
                "description": "Step type parameter for StepHandlerRegistry.hasHandler: StepType.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "StepHandlerRegistry.hasHandler returns a boolean."
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
        "purpose": "OperationExecutionContext packages the runtime objects passed into operation execution implementations.",
        "usage": "Use OperationExecutionContext when implementing operation handlers and operation execution services.",
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
            "description": "Flow value on operation execution context; TypeScript expects a FlowVersion.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Conversation state active in the current context for operation execution context.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Turn active in the current context for operation execution context.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "Step value on operation execution context; TypeScript expects a StepDefinition.",
            "required": true
          },
          {
            "name": "services",
            "type": "RuntimeServices",
            "description": "Runtime services used to resolve input, render responses, execute operations, and build traces for operation execution context.",
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
        "purpose": "OperationResult captures the outcome, variables, trace data, and errors from operation.",
        "usage": "Use OperationResult when implementing operation handlers and operation execution services.",
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
            "description": "State value that drives routing, result handling, or lifecycle decisions for operation result.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Outcome value used to choose branches or report handler results for operation result.",
            "required": false
          },
          {
            "name": "branch",
            "type": "StepBranch",
            "description": "Branch executed when a match or option succeeds for operation result.",
            "required": false
          },
          {
            "name": "messages",
            "type": "OutboundMessage[]",
            "description": "Outbound response plans or message DTOs produced during a turn for operation result.",
            "required": false
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<string>[]",
            "description": "Variable patches applied during the turn for operation result.",
            "required": false
          },
          {
            "name": "events",
            "type": "ConversationEvent[]",
            "description": "Events emitted and committed during the turn for operation result.",
            "required": false
          },
          {
            "name": "error",
            "type": "RuntimeError",
            "description": "Error value on operation result; TypeScript expects a RuntimeError.",
            "required": false
          },
          {
            "name": "trace",
            "type": "TraceFragment",
            "description": "Trace value on operation result; TypeScript expects a TraceFragment.",
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
        "purpose": "OperationHandler is the extension contract for handling operation behavior.",
        "usage": "Use OperationHandler when implementing operation handlers and operation execution services.",
        "signatures": [
          "export interface OperationHandler<TOperation extends StepOperation = StepOperation> {\n    readonly operationType: string;\n    execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>;\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "Executes the handler or service behavior for OperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "Operation object consumed by OperationHandler.execute: TOperation.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "Runtime context for OperationHandler.execute, using OperationExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "OperationHandler.execute resolves with OperationResult."
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
            "description": "Operation type value on operation handler; TypeScript expects a string.",
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
        "purpose": "OperationRegistry stores and retrieves runtime extensions for operation.",
        "usage": "Use OperationRegistry when implementing operation handlers and operation execution services.",
        "signatures": [
          "export interface OperationRegistry {\n    register(handler: OperationHandler): void;\n    getHandler(operationType: string): OperationHandler;\n    hasHandler(operationType: string): boolean;\n}"
        ],
        "methods": [
          {
            "name": "register",
            "signature": "register(handler: OperationHandler): void",
            "description": "Registers an implementation by type for OperationRegistry.",
            "parameters": [
              {
                "name": "handler",
                "type": "OperationHandler",
                "description": "Handler parameter for OperationRegistry.register: OperationHandler.",
                "required": true
              }
            ],
            "returns": {
              "type": "void",
              "description": "OperationRegistry.register completes after applying its side effect and returns no payload."
            }
          },
          {
            "name": "getHandler",
            "signature": "getHandler(operationType: string): OperationHandler",
            "description": "Returns the handler registered for a type for OperationRegistry.",
            "parameters": [
              {
                "name": "operationType",
                "type": "string",
                "description": "Operation type parameter for OperationRegistry.getHandler: string.",
                "required": true
              }
            ],
            "returns": {
              "type": "OperationHandler",
              "description": "OperationRegistry.getHandler returns an OperationHandler."
            }
          },
          {
            "name": "hasHandler",
            "signature": "hasHandler(operationType: string): boolean",
            "description": "Checks whether a handler exists for a type for OperationRegistry.",
            "parameters": [
              {
                "name": "operationType",
                "type": "string",
                "description": "Operation type parameter for OperationRegistry.hasHandler: string.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "OperationRegistry.hasHandler returns a boolean."
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
        "purpose": "OperationExecutor executes operation work inside the runtime pipeline.",
        "usage": "Use OperationExecutor when implementing operation handlers and operation execution services.",
        "signatures": [
          "export interface OperationExecutor {\n    executeMany(operations: StepOperation[], context: OperationExecutionContext): Promise<OperationResult[]>;\n}"
        ],
        "methods": [
          {
            "name": "executeMany",
            "signature": "executeMany(operations: StepOperation[], context: OperationExecutionContext): Promise<OperationResult[]>",
            "description": "Runs a sequence of operations for OperationExecutor.",
            "parameters": [
              {
                "name": "operations",
                "type": "StepOperation[]",
                "description": "Operations parameter for OperationExecutor.executeMany: StepOperation[].",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "Runtime context for OperationExecutor.executeMany, using OperationExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult[]>",
              "description": "OperationExecutor.executeMany resolves with OperationResult[]."
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
        "purpose": "OutboundMessage carries message id, conversation id, turn id, channel, content, and response id for outbound messages.",
        "usage": "Use OutboundMessage to pass portable message content from the runtime to a channel adapter.",
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
            "description": "Identifier that links outbound message to the message record it references.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for outbound message.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for outbound message.",
            "required": true
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Channel name associated with the conversation, input, message, or render pass for outbound message.",
            "required": false
          },
          {
            "name": "content",
            "type": "OutboundMessageContent",
            "description": "Content value on outbound message; TypeScript expects an OutboundMessageContent.",
            "required": true
          },
          {
            "name": "responseId",
            "type": "string",
            "description": "Identifier that links outbound message to the response record it references.",
            "required": false
          },
          {
            "name": "createdAt",
            "type": "string",
            "description": "Creation timestamp assigned by the runtime clock for outbound message.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on outbound message for adapters, analytics, audits, or tests.",
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
        "purpose": "OutboundMessageContent enumerates the allowed outbound message content values accepted by outbound messages.",
        "usage": "Use OutboundMessageContent to pass portable message content from the runtime to a channel adapter.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for outbound message content.",
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
        "purpose": "TextOutboundContent carries type, and text for outbound messages.",
        "usage": "Use TextOutboundContent to pass portable message content from the runtime to a channel adapter.",
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
            "description": "Literal \"text\" marker that selects the text outbound content variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "text",
            "type": "string",
            "description": "Plain text sent by the user, rendered by a response, or emitted in a message for text outbound content.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "RichOutboundContent",
        "kind": "interface",
        "purpose": "RichOutboundContent carries type, text, buttons, attachments, and cards for outbound messages.",
        "usage": "Use RichOutboundContent to pass portable message content from the runtime to a channel adapter.",
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
            "description": "Literal \"rich\" marker that selects the rich outbound content variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "text",
            "type": "string",
            "description": "Plain text sent by the user, rendered by a response, or emitted in a message for rich outbound content.",
            "required": false
          },
          {
            "name": "buttons",
            "type": "OutboundButton[]",
            "description": "Collection of OutboundButton values carried by rich outbound content.",
            "required": false
          },
          {
            "name": "attachments",
            "type": "AttachmentInput[]",
            "description": "Attachment list supplied by input or message content for rich outbound content.",
            "required": false
          },
          {
            "name": "cards",
            "type": "JsonObject[]",
            "description": "Collection of JsonObject values carried by rich outbound content.",
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
        "purpose": "CustomPayloadOutboundContent carries type, and payload for outbound messages.",
        "usage": "Use CustomPayloadOutboundContent to pass portable message content from the runtime to a channel adapter.",
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
            "description": "Literal \"custom_payload\" marker that selects the custom payload outbound content variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Structured payload carried by events, choices, messages, or custom content for custom payload outbound content.",
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
        "purpose": "OutboundButton carries option id, label, and payload for outbound messages.",
        "usage": "Use OutboundButton to pass portable message content from the runtime to a channel adapter.",
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
            "description": "Menu option identifier used for choices and branch matches for outbound button.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for outbound button in authoring tools, menus, reports, or API displays.",
            "required": true
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Structured payload carried by events, choices, messages, or custom content for outbound button.",
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
        "purpose": "ConversationEventType enumerates the allowed conversation event values accepted by events and traces.",
        "usage": "Use ConversationEventType to build audit logs, observability records, tests, and support tooling from committed turns.",
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
            "description": "ConversationEventType accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "ConversationEvent",
        "kind": "interface",
        "purpose": "ConversationEvent carries event id, conversation id, turn id, flow version id, step id, and type for events and traces.",
        "usage": "Use ConversationEvent to build audit logs, observability records, tests, and support tooling from committed turns.",
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
            "description": "Identifier that links conversation event to the event record it references.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for conversation event.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for conversation event.",
            "required": false
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "Specific flow version selected for loading, state, traces, and start requests for conversation event.",
            "required": true
          },
          {
            "name": "stepId",
            "type": "string",
            "description": "Step identifier targeted by state, routes, traces, and execution context for conversation event.",
            "required": false
          },
          {
            "name": "type",
            "type": "string",
            "description": "Type discriminator that directs validation and runtime handling for conversation event.",
            "required": true
          },
          {
            "name": "payload",
            "type": "Metadata",
            "description": "Structured payload carried by events, choices, messages, or custom content for conversation event.",
            "required": false
          },
          {
            "name": "createdAt",
            "type": "string",
            "description": "Creation timestamp assigned by the runtime clock for conversation event.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on conversation event for adapters, analytics, audits, or tests.",
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
        "purpose": "TraceFragment carries source, message, data, started at, and completed at for events and traces.",
        "usage": "Use TraceFragment to build audit logs, observability records, tests, and support tooling from committed turns.",
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
            "description": "Origin recorded for a variable write, trace fragment, event, or candidate for trace fragment.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for trace fragment.",
            "required": false
          },
          {
            "name": "data",
            "type": "Metadata",
            "description": "Data value on trace fragment; TypeScript expects a Metadata.",
            "required": false
          },
          {
            "name": "startedAt",
            "type": "string",
            "description": "Timestamp recorded when a conversation, turn, or frame starts for trace fragment.",
            "required": false
          },
          {
            "name": "completedAt",
            "type": "string",
            "description": "Timestamp recorded when a flow call, handoff, or conversation completes for trace fragment.",
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
        "purpose": "DecisionTrace carries trace id, conversation id, turn id, flow version id, initial step id, and final step id for events and traces.",
        "usage": "Use DecisionTrace to build audit logs, observability records, tests, and support tooling from committed turns.",
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
            "description": "Identifier that links decision trace to the trace record it references.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for decision trace.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for decision trace.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "Specific flow version selected for loading, state, traces, and start requests for decision trace.",
            "required": true
          },
          {
            "name": "initialStepId",
            "type": "string",
            "description": "Step where the traced turn began for decision trace.",
            "required": false
          },
          {
            "name": "finalStepId",
            "type": "string",
            "description": "Step where the traced turn ended for decision trace.",
            "required": false
          },
          {
            "name": "userInput",
            "type": "UserInput",
            "description": "User input attached to a context, trace, or turn result for decision trace.",
            "required": false
          },
          {
            "name": "fragments",
            "type": "TraceFragment[]",
            "description": "Trace fragments collected during the turn for decision trace.",
            "required": true
          },
          {
            "name": "events",
            "type": "ConversationEvent[]",
            "description": "Events emitted and committed during the turn for decision trace.",
            "required": true
          },
          {
            "name": "messages",
            "type": "OutboundMessage[]",
            "description": "Outbound response plans or message DTOs produced during a turn for decision trace.",
            "required": true
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<string>[]",
            "description": "Variable patches applied during the turn for decision trace.",
            "required": true
          },
          {
            "name": "variableReads",
            "type": "VariableReadTrace[]",
            "description": "Variable reads recorded for traceability for decision trace.",
            "required": false
          },
          {
            "name": "operationResults",
            "type": "OperationTraceRecord[]",
            "description": "Operation results recorded during the turn for decision trace.",
            "required": false
          },
          {
            "name": "actionResults",
            "type": "ActionTraceRecord[]",
            "description": "Action results recorded during the turn for decision trace.",
            "required": false
          },
          {
            "name": "conditionResults",
            "type": "ConditionTraceRecord[]",
            "description": "Condition evaluation records collected during routing for decision trace.",
            "required": false
          },
          {
            "name": "flowCalls",
            "type": "FlowCallTraceRecord[]",
            "description": "Child flow call records collected during the turn for decision trace.",
            "required": false
          },
          {
            "name": "handoffs",
            "type": "HandoffTraceRecord[]",
            "description": "Handoff records collected during the turn for decision trace.",
            "required": false
          },
          {
            "name": "llmUsage",
            "type": "LlmUsageRecord[]",
            "description": "LLM usage records collected during semantic or generated response work for decision trace.",
            "required": false
          },
          {
            "name": "createdAt",
            "type": "string",
            "description": "Creation timestamp assigned by the runtime clock for decision trace.",
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
        "purpose": "VariableReadTrace carries variable id, scope, step id, operation id, found, and read at for events and traces.",
        "usage": "Use VariableReadTrace to build audit logs, observability records, tests, and support tooling from committed turns.",
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
            "description": "Variable key read, written, validated, traced, or exposed in API responses for variable read trace.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "Variable namespace used to separate conversation, flow, operation, and system values for variable read trace.",
            "required": false
          },
          {
            "name": "stepId",
            "type": "string",
            "description": "Step identifier targeted by state, routes, traces, and execution context for variable read trace.",
            "required": false
          },
          {
            "name": "operationId",
            "type": "string",
            "description": "Operation identifier recorded in traces and variable history for variable read trace.",
            "required": false
          },
          {
            "name": "found",
            "type": "boolean",
            "description": "Found value on variable read trace; TypeScript expects a boolean.",
            "required": true
          },
          {
            "name": "readAt",
            "type": "string",
            "description": "ISO timestamp recorded for the read moment on variable read trace.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on variable read trace for adapters, analytics, audits, or tests.",
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
        "purpose": "OperationTraceRecord carries operation id, operation type, status, outcome, and error for events and traces.",
        "usage": "Use OperationTraceRecord to build audit logs, observability records, tests, and support tooling from committed turns.",
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
            "description": "Operation identifier recorded in traces and variable history for operation trace record.",
            "required": false
          },
          {
            "name": "operationType",
            "type": "\"custom\" | \"handoff\" | \"send_message\" | \"set_variable\" | \"unset_variable\" | \"invalidate_variable\" | \"run_action\" | \"emit_event\" | \"call_flow\"",
            "description": "Operation type value on operation trace record; TypeScript expects a \"custom\" | \"handoff\" | \"send_message\" | \"set_variable\" | \"unset_variable\" | \"invalidate_variable\" | \"run_action\" | \"emit_event\" | \"call_flow\".",
            "required": true
          },
          {
            "name": "status",
            "type": "\"completed\" | \"failed\" | \"skipped\"",
            "description": "State value that drives routing, result handling, or lifecycle decisions for operation trace record.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Outcome value used to choose branches or report handler results for operation trace record.",
            "required": false
          },
          {
            "name": "error",
            "type": "RuntimeError",
            "description": "Error value on operation trace record; TypeScript expects a RuntimeError.",
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
        "purpose": "ActionTraceRecord carries action id, status, outcome, and error code for events and traces.",
        "usage": "Use ActionTraceRecord to build audit logs, observability records, tests, and support tooling from committed turns.",
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
            "description": "Action contract identifier referenced by run_action operations for action trace record.",
            "required": true
          },
          {
            "name": "status",
            "type": "ActionResultStatus",
            "description": "State value that drives routing, result handling, or lifecycle decisions for action trace record.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Outcome value used to choose branches or report handler results for action trace record.",
            "required": false
          },
          {
            "name": "errorCode",
            "type": "string",
            "description": "Error code value on action trace record; TypeScript expects a string.",
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
        "purpose": "ConditionTraceRecord carries branch id, outcome, matched, and variables read for events and traces.",
        "usage": "Use ConditionTraceRecord to build audit logs, observability records, tests, and support tooling from committed turns.",
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
            "description": "Branch identifier recorded in traces and authoring tools for condition trace record.",
            "required": false
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Outcome value used to choose branches or report handler results for condition trace record.",
            "required": false
          },
          {
            "name": "matched",
            "type": "boolean",
            "description": "Boolean result of evaluating a condition expression for condition trace record.",
            "required": true
          },
          {
            "name": "variablesRead",
            "type": "VariableReadTrace[]",
            "description": "Collection of VariableReadTrace values carried by condition trace record.",
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
        "purpose": "FlowCallTraceRecord carries operation id, frame id, flow version id, status, and outcome for events and traces.",
        "usage": "Use FlowCallTraceRecord to build audit logs, observability records, tests, and support tooling from committed turns.",
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
            "description": "Operation identifier recorded in traces and variable history for flow call trace record.",
            "required": false
          },
          {
            "name": "frameId",
            "type": "string",
            "description": "Identifier that links flow call trace record to the frame record it references.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "Specific flow version selected for loading, state, traces, and start requests for flow call trace record.",
            "required": true
          },
          {
            "name": "status",
            "type": "FlowCallStatus",
            "description": "State value that drives routing, result handling, or lifecycle decisions for flow call trace record.",
            "required": true
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Outcome value used to choose branches or report handler results for flow call trace record.",
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
        "purpose": "HandoffTraceRecord carries operation id, status, handoff id, and outcome for events and traces.",
        "usage": "Use HandoffTraceRecord to build audit logs, observability records, tests, and support tooling from committed turns.",
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
            "description": "Operation identifier recorded in traces and variable history for handoff trace record.",
            "required": false
          },
          {
            "name": "status",
            "type": "HandoffResultStatus",
            "description": "State value that drives routing, result handling, or lifecycle decisions for handoff trace record.",
            "required": true
          },
          {
            "name": "handoffId",
            "type": "string",
            "description": "Handoff identifier returned by a handoff operation for handoff trace record.",
            "required": false
          },
          {
            "name": "outcome",
            "type": "string",
            "description": "Outcome value used to choose branches or report handler results for handoff trace record.",
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
        "purpose": "LlmUsageRecord carries purpose, provider, model, prompt summary, input tokens, and output tokens for events and traces.",
        "usage": "Use LlmUsageRecord to build audit logs, observability records, tests, and support tooling from committed turns.",
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
            "description": "Purpose value on llm usage record; TypeScript expects a \"input_resolution\" | \"response_generation\".",
            "required": true
          },
          {
            "name": "provider",
            "type": "string",
            "description": "External provider name used for handoff or model generation for llm usage record.",
            "required": false
          },
          {
            "name": "model",
            "type": "string",
            "description": "Model value on llm usage record; TypeScript expects a string.",
            "required": false
          },
          {
            "name": "promptSummary",
            "type": "string",
            "description": "Prompt summary value on llm usage record; TypeScript expects a string.",
            "required": false
          },
          {
            "name": "inputTokens",
            "type": "number",
            "description": "Input tokens value on llm usage record; TypeScript expects a number.",
            "required": false
          },
          {
            "name": "outputTokens",
            "type": "number",
            "description": "Output tokens value on llm usage record; TypeScript expects a number.",
            "required": false
          },
          {
            "name": "latencyMs",
            "type": "number",
            "description": "Latency ms value on llm usage record; TypeScript expects a number.",
            "required": false
          },
          {
            "name": "success",
            "type": "boolean",
            "description": "Success value on llm usage record; TypeScript expects a boolean.",
            "required": true
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on llm usage record for adapters, analytics, audits, or tests.",
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
        "purpose": "RuntimeError enumerates the allowed runtime error values accepted by runtime errors.",
        "usage": "Use RuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for runtime error.",
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
        "purpose": "RuntimeErrorCode enumerates the allowed runtime error code values accepted by runtime errors.",
        "usage": "Use RuntimeErrorCode to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for runtime error code.",
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
        "purpose": "PublicRuntimeErrorCode enumerates the allowed public runtime error code values accepted by runtime errors.",
        "usage": "Use PublicRuntimeErrorCode to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "PublicRuntimeErrorCode accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "OperationalRuntimeErrorCode",
        "kind": "union type",
        "purpose": "OperationalRuntimeErrorCode enumerates the allowed operational runtime error code values accepted by runtime errors.",
        "usage": "Use OperationalRuntimeErrorCode to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "OperationalRuntimeErrorCode accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "BaseRuntimeError",
        "kind": "interface",
        "purpose": "BaseRuntimeError carries code, message, recoverable, and details for runtime errors.",
        "usage": "Use BaseRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Machine-readable error code or status code emitted here for base runtime error.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for base runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for base runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on base runtime error; TypeScript expects a Metadata.",
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
        "purpose": "MissingStepHandlerRuntimeError carries step type, code, message, recoverable, and details for runtime errors.",
        "usage": "Use MissingStepHandlerRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Step type value on missing step handler runtime error; TypeScript expects a string.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_step_handler\"",
            "description": "Literal \"missing_step_handler\" marker that selects the missing step handler runtime error variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for missing step handler runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for missing step handler runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on missing step handler runtime error; TypeScript expects a Metadata.",
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
        "purpose": "MissingOperationHandlerRuntimeError carries operation type, code, message, recoverable, and details for runtime errors.",
        "usage": "Use MissingOperationHandlerRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Operation type value on missing operation handler runtime error; TypeScript expects a \"custom\" | \"handoff\" | \"send_message\" | \"set_variable\" | \"unset_variable\" | \"invalidate_variable\" | \"run_action\" | \"emit_event\" | \"call_flow\".",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_operation_handler\"",
            "description": "Literal \"missing_operation_handler\" marker that selects the missing operation handler runtime error variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for missing operation handler runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for missing operation handler runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on missing operation handler runtime error; TypeScript expects a Metadata.",
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
        "purpose": "MissingActionHandlerRuntimeError carries action kind, code, message, recoverable, and details for runtime errors.",
        "usage": "Use MissingActionHandlerRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Action kind value on missing action handler runtime error; TypeScript expects a string.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_action_handler\"",
            "description": "Literal \"missing_action_handler\" marker that selects the missing action handler runtime error variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for missing action handler runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for missing action handler runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on missing action handler runtime error; TypeScript expects a Metadata.",
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
        "purpose": "MissingResponseReferenceRuntimeError carries response id, code, message, recoverable, and details for runtime errors.",
        "usage": "Use MissingResponseReferenceRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Identifier that links missing response reference runtime error to the response record it references.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_response_reference\"",
            "description": "Literal \"missing_response_reference\" marker that selects the missing response reference runtime error variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for missing response reference runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for missing response reference runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on missing response reference runtime error; TypeScript expects a Metadata.",
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
        "purpose": "MissingActionReferenceRuntimeError carries action id, code, message, recoverable, and details for runtime errors.",
        "usage": "Use MissingActionReferenceRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Action contract identifier referenced by run_action operations for missing action reference runtime error.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_action_reference\"",
            "description": "Literal \"missing_action_reference\" marker that selects the missing action reference runtime error variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for missing action reference runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for missing action reference runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on missing action reference runtime error; TypeScript expects a Metadata.",
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
        "purpose": "MissingVariableReferenceRuntimeError carries variable id, scope, code, message, recoverable, and details for runtime errors.",
        "usage": "Use MissingVariableReferenceRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Variable key read, written, validated, traced, or exposed in API responses for missing variable reference runtime error.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "Variable namespace used to separate conversation, flow, operation, and system values for missing variable reference runtime error.",
            "required": false
          },
          {
            "name": "code",
            "type": "\"missing_variable_reference\"",
            "description": "Literal \"missing_variable_reference\" marker that selects the missing variable reference runtime error variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for missing variable reference runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for missing variable reference runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on missing variable reference runtime error; TypeScript expects a Metadata.",
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
        "purpose": "MissingFlowVersionRuntimeError carries flow version id, code, message, recoverable, and details for runtime errors.",
        "usage": "Use MissingFlowVersionRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Specific flow version selected for loading, state, traces, and start requests for missing flow version runtime error.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_flow_version\"",
            "description": "Literal \"missing_flow_version\" marker that selects the missing flow version runtime error variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for missing flow version runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for missing flow version runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on missing flow version runtime error; TypeScript expects a Metadata.",
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
        "purpose": "MissingStepTargetRuntimeError carries step id, code, message, recoverable, and details for runtime errors.",
        "usage": "Use MissingStepTargetRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Step identifier targeted by state, routes, traces, and execution context for missing step target runtime error.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_step_target\"",
            "description": "Literal \"missing_step_target\" marker that selects the missing step target runtime error variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for missing step target runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for missing step target runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on missing step target runtime error; TypeScript expects a Metadata.",
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
        "purpose": "MissingSemanticInputResolverRuntimeError carries task id, code, message, recoverable, and details for runtime errors.",
        "usage": "Use MissingSemanticInputResolverRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Identifier that links missing semantic input resolver runtime error to the task record it references.",
            "required": false
          },
          {
            "name": "code",
            "type": "\"missing_semantic_input_resolver\"",
            "description": "Literal \"missing_semantic_input_resolver\" marker that selects the missing semantic input resolver runtime error variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for missing semantic input resolver runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for missing semantic input resolver runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on missing semantic input resolver runtime error; TypeScript expects a Metadata.",
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
        "purpose": "MissingLlmResponseGeneratorRuntimeError carries response id, code, message, recoverable, and details for runtime errors.",
        "usage": "Use MissingLlmResponseGeneratorRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Identifier that links missing llm response generator runtime error to the response record it references.",
            "required": false
          },
          {
            "name": "code",
            "type": "\"missing_llm_response_generator\"",
            "description": "Literal \"missing_llm_response_generator\" marker that selects the missing llm response generator runtime error variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for missing llm response generator runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for missing llm response generator runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on missing llm response generator runtime error; TypeScript expects a Metadata.",
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
        "purpose": "MissingCustomOperationContractRuntimeError carries custom operation id, code, message, recoverable, and details for runtime errors.",
        "usage": "Use MissingCustomOperationContractRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Identifier for a custom operation declaration for missing custom operation contract runtime error.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_custom_operation_contract\"",
            "description": "Literal \"missing_custom_operation_contract\" marker that selects the missing custom operation contract runtime error variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for missing custom operation contract runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for missing custom operation contract runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on missing custom operation contract runtime error; TypeScript expects a Metadata.",
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
        "purpose": "MissingCustomOperationHandlerRuntimeError carries custom type, code, message, recoverable, and details for runtime errors.",
        "usage": "Use MissingCustomOperationHandlerRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Custom operation type used to find the configured executor for missing custom operation handler runtime error.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"missing_custom_operation_handler\"",
            "description": "Literal \"missing_custom_operation_handler\" marker that selects the missing custom operation handler runtime error variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for missing custom operation handler runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for missing custom operation handler runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on missing custom operation handler runtime error; TypeScript expects a Metadata.",
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
        "purpose": "InvalidSemanticOutcomeRuntimeError carries outcome, allowed outcomes, code, message, recoverable, and details for runtime errors.",
        "usage": "Use InvalidSemanticOutcomeRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Outcome value used to choose branches or report handler results for invalid semantic outcome runtime error.",
            "required": true
          },
          {
            "name": "allowedOutcomes",
            "type": "string[]",
            "description": "Outcome strings accepted from semantic tasks or custom operations for invalid semantic outcome runtime error.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"invalid_semantic_outcome\"",
            "description": "Literal \"invalid_semantic_outcome\" marker that selects the invalid semantic outcome runtime error variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for invalid semantic outcome runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for invalid semantic outcome runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on invalid semantic outcome runtime error; TypeScript expects a Metadata.",
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
        "purpose": "InvalidSemanticVariableRuntimeError carries variable id, allowed variable ids, code, message, recoverable, and details for runtime errors.",
        "usage": "Use InvalidSemanticVariableRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Variable key read, written, validated, traced, or exposed in API responses for invalid semantic variable runtime error.",
            "required": true
          },
          {
            "name": "allowedVariableIds",
            "type": "string[]",
            "description": "Allow-list of variables a semantic or generated-response provider may use for invalid semantic variable runtime error.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"invalid_semantic_variable\"",
            "description": "Literal \"invalid_semantic_variable\" marker that selects the invalid semantic variable runtime error variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for invalid semantic variable runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for invalid semantic variable runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on invalid semantic variable runtime error; TypeScript expects a Metadata.",
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
        "purpose": "InvalidGeneratedResponseVariableRuntimeError carries variable id, allowed variable ids, code, message, recoverable, and details for runtime errors.",
        "usage": "Use InvalidGeneratedResponseVariableRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Variable key read, written, validated, traced, or exposed in API responses for invalid generated response variable runtime error.",
            "required": true
          },
          {
            "name": "allowedVariableIds",
            "type": "string[]",
            "description": "Allow-list of variables a semantic or generated-response provider may use for invalid generated response variable runtime error.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"invalid_generated_response_variable\"",
            "description": "Literal \"invalid_generated_response_variable\" marker that selects the invalid generated response variable runtime error variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for invalid generated response variable runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for invalid generated response variable runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on invalid generated response variable runtime error; TypeScript expects a Metadata.",
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
        "purpose": "ModelValidationRuntimeError carries issues, code, message, recoverable, and details for runtime errors.",
        "usage": "Use ModelValidationRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Collection of ValidationIssue values carried by model validation runtime error.",
            "required": true
          },
          {
            "name": "code",
            "type": "\"model_validation_failed\"",
            "description": "Literal \"model_validation_failed\" marker that selects the model validation runtime error variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for model validation runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for model validation runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on model validation runtime error; TypeScript expects a Metadata.",
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
        "purpose": "OperationalRuntimeError carries code, message, recoverable, and details for runtime errors.",
        "usage": "Use OperationalRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Machine-readable error code or status code emitted here for operational runtime error.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for operational runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for operational runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on operational runtime error; TypeScript expects a Metadata.",
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
        "purpose": "UnhandledRuntimeError carries code, message, recoverable, and details for runtime errors.",
        "usage": "Use UnhandledRuntimeError to handle structured failures without hiding missing handlers, invalid model output, or broken references.",
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
            "description": "Literal \"unhandled_runtime_error\" marker that selects the unhandled runtime error variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "message",
            "type": "string",
            "description": "Validation message or outbound text shown to users for unhandled runtime error.",
            "required": true
          },
          {
            "name": "recoverable",
            "type": "boolean",
            "description": "Whether the caller may retry after this runtime error for unhandled runtime error.",
            "required": true
          },
          {
            "name": "details",
            "type": "Metadata",
            "description": "Details value on unhandled runtime error; TypeScript expects a Metadata.",
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
        "purpose": "RuntimeServices carries step registry, operation registry, resolver registry, validator registry, normalizer registry, and extractor registry for extension contracts.",
        "usage": "Use RuntimeServices when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
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
            "description": "Step registry value on runtime services; TypeScript expects a StepHandlerRegistry.",
            "required": true
          },
          {
            "name": "operationRegistry",
            "type": "OperationRegistry",
            "description": "Operation registry value on runtime services; TypeScript expects an OperationRegistry.",
            "required": true
          },
          {
            "name": "resolverRegistry",
            "type": "ResolverRegistry",
            "description": "Resolver registry value on runtime services; TypeScript expects a ResolverRegistry.",
            "required": true
          },
          {
            "name": "validatorRegistry",
            "type": "ValidatorRegistry",
            "description": "Validator registry value on runtime services; TypeScript expects a ValidatorRegistry.",
            "required": true
          },
          {
            "name": "normalizerRegistry",
            "type": "NormalizerRegistry",
            "description": "Normalizer registry value on runtime services; TypeScript expects a NormalizerRegistry.",
            "required": true
          },
          {
            "name": "extractorRegistry",
            "type": "ExtractorRegistry",
            "description": "Extractor registry value on runtime services; TypeScript expects an ExtractorRegistry.",
            "required": true
          },
          {
            "name": "operationExecutor",
            "type": "OperationExecutor",
            "description": "Operation executor value on runtime services; TypeScript expects an OperationExecutor.",
            "required": true
          },
          {
            "name": "inputProcessor",
            "type": "InputProcessor",
            "description": "Input processor value on runtime services; TypeScript expects an InputProcessor.",
            "required": true
          },
          {
            "name": "responseRenderer",
            "type": "ResponseRenderer",
            "description": "Response renderer value on runtime services; TypeScript expects a ResponseRenderer.",
            "required": true
          },
          {
            "name": "actionExecutor",
            "type": "ActionExecutor",
            "description": "Action executor value on runtime services; TypeScript expects an ActionExecutor.",
            "required": true
          },
          {
            "name": "conditionEvaluator",
            "type": "ConditionEvaluator",
            "description": "Condition evaluator value on runtime services; TypeScript expects a ConditionEvaluator.",
            "required": true
          },
          {
            "name": "transitionResolver",
            "type": "TransitionResolver",
            "description": "Transition resolver value on runtime services; TypeScript expects a TransitionResolver.",
            "required": true
          },
          {
            "name": "stateReducer",
            "type": "StateReducer",
            "description": "State reducer value on runtime services; TypeScript expects a StateReducer.",
            "required": true
          },
          {
            "name": "traceBuilder",
            "type": "TraceBuilder",
            "description": "Trace builder value on runtime services; TypeScript expects a TraceBuilder.",
            "required": true
          },
          {
            "name": "semanticInputResolver",
            "type": "SemanticInputResolver",
            "description": "Semantic input provider used by semantic input tasks for runtime services.",
            "required": false
          },
          {
            "name": "llmResponseGenerator",
            "type": "LlmResponseGenerator",
            "description": "Generated response provider used by generated response plans for runtime services.",
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
        "purpose": "InputProcessor coordinates input work for one runtime turn.",
        "usage": "Use InputProcessor when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface InputProcessor {\n    process(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<InputResolutionResult>;\n}"
        ],
        "methods": [
          {
            "name": "process",
            "signature": "process(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<InputResolutionResult>",
            "description": "Resolves user input against an input contract for InputProcessor.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by InputProcessor.process: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for InputProcessor.process: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for InputProcessor.process, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<InputResolutionResult>",
              "description": "InputProcessor.process resolves with InputResolutionResult."
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
        "purpose": "InputProcessingContext packages the runtime objects passed into input processing implementations.",
        "usage": "Use InputProcessingContext when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
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
            "description": "Flow value on input processing context; TypeScript expects a FlowVersion.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "Step value on input processing context; TypeScript expects a StepDefinition.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Conversation state active in the current context for input processing context.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Turn active in the current context for input processing context.",
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
        "purpose": "Resolver resolves resolver decisions without coupling callers to an implementation.",
        "usage": "Use Resolver when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface Resolver {\n    readonly resolverType: string;\n    canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean;\n    resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>;\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "Checks whether the resolver can handle the input contract for Resolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by Resolver.canResolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for Resolver.canResolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for Resolver.canResolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "Resolver.canResolve returns a boolean."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "Resolves input, response references, variables, routes, or definitions for Resolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by Resolver.resolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for Resolver.resolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for Resolver.resolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "Resolver.resolve resolves with CommandCandidate[]."
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
            "description": "Resolver type value on resolver; TypeScript expects a string.",
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
        "purpose": "ResolverRegistry stores and retrieves runtime extensions for resolver.",
        "usage": "Use ResolverRegistry when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface ResolverRegistry {\n    register(resolver: Resolver): void;\n    list(): Resolver[];\n}"
        ],
        "methods": [
          {
            "name": "register",
            "signature": "register(resolver: Resolver): void",
            "description": "Registers an implementation by type for ResolverRegistry.",
            "parameters": [
              {
                "name": "resolver",
                "type": "Resolver",
                "description": "Resolver parameter for ResolverRegistry.register: Resolver.",
                "required": true
              }
            ],
            "returns": {
              "type": "void",
              "description": "ResolverRegistry.register completes after applying its side effect and returns no payload."
            }
          },
          {
            "name": "list",
            "signature": "list(): Resolver[]",
            "description": "Lists registered implementations or stored values for ResolverRegistry.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "No arguments are accepted by ResolverRegistry.list; call it with an empty parameter list.",
                "required": false
              }
            ],
            "returns": {
              "type": "Resolver[]",
              "description": "ResolverRegistry.list returns a Resolver[]."
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
        "purpose": "Validator validates validator values or model objects and returns structured findings.",
        "usage": "Use Validator when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface Validator {\n    readonly validatorType: string;\n    validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>;\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "Validates a flow, step, operation, value, or model object for Validator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "Candidate or stored value consumed by Validator.validate: unknown.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "Definition object consumed by Validator.validate: ValidatorDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "Runtime context for Validator.validate, using ValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "Validator.validate resolves with ValidationResult."
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
            "description": "Validator type value on validator; TypeScript expects a string.",
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
        "purpose": "ValidatorRegistry stores and retrieves runtime extensions for validator.",
        "usage": "Use ValidatorRegistry when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface ValidatorRegistry {\n    register(validator: Validator): void;\n    getValidator(validatorType: string): Validator;\n    hasValidator(validatorType: string): boolean;\n}"
        ],
        "methods": [
          {
            "name": "register",
            "signature": "register(validator: Validator): void",
            "description": "Registers an implementation by type for ValidatorRegistry.",
            "parameters": [
              {
                "name": "validator",
                "type": "Validator",
                "description": "Validator parameter for ValidatorRegistry.register: Validator.",
                "required": true
              }
            ],
            "returns": {
              "type": "void",
              "description": "ValidatorRegistry.register completes after applying its side effect and returns no payload."
            }
          },
          {
            "name": "getValidator",
            "signature": "getValidator(validatorType: string): Validator",
            "description": "Returns the validator registered for a type for ValidatorRegistry.",
            "parameters": [
              {
                "name": "validatorType",
                "type": "string",
                "description": "Validator type parameter for ValidatorRegistry.getValidator: string.",
                "required": true
              }
            ],
            "returns": {
              "type": "Validator",
              "description": "ValidatorRegistry.getValidator returns a Validator."
            }
          },
          {
            "name": "hasValidator",
            "signature": "hasValidator(validatorType: string): boolean",
            "description": "Checks whether a validator exists for a type for ValidatorRegistry.",
            "parameters": [
              {
                "name": "validatorType",
                "type": "string",
                "description": "Validator type parameter for ValidatorRegistry.hasValidator: string.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "ValidatorRegistry.hasValidator returns a boolean."
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
        "purpose": "ValidationContext packages the runtime objects passed into validation implementations.",
        "usage": "Use ValidationContext when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
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
            "description": "Flow value on validation context; TypeScript expects a FlowVersion.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "Step value on validation context; TypeScript expects a StepDefinition.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Conversation state active in the current context for validation context.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Turn active in the current context for validation context.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "string",
            "description": "Variable key read, written, validated, traced, or exposed in API responses for validation context.",
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
        "purpose": "SemanticInputResolver resolves semantic input decisions without coupling callers to an implementation.",
        "usage": "Use SemanticInputResolver when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface SemanticInputResolver {\n    resolve<TOutcome extends StepOutcome = StepOutcome, TVariableId extends VariableId = VariableId>(input: UserInput, task: SemanticInputTask<TOutcome, TVariableId>, context: InputProcessingContext): Promise<SemanticInputResolution<TOutcome, TVariableId>>;\n}"
        ],
        "methods": [
          {
            "name": "resolve",
            "signature": "resolve<TOutcome extends StepOutcome = StepOutcome, TVariableId extends VariableId = VariableId>(\n        input: UserInput,\n        task: SemanticInputTask<TOutcome, TVariableId>,\n        context: InputProcessingContext\n    ): Promise<SemanticInputResolution<TOutcome, TVariableId>>",
            "description": "Resolves input, response references, variables, routes, or definitions for SemanticInputResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by SemanticInputResolver.resolve: UserInput.",
                "required": true
              },
              {
                "name": "task",
                "type": "SemanticInputTask<TOutcome, TVariableId>",
                "description": "Task parameter for SemanticInputResolver.resolve: SemanticInputTask<TOutcome, TVariableId>.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for SemanticInputResolver.resolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<SemanticInputResolution<TOutcome, TVariableId>>",
              "description": "SemanticInputResolver.resolve resolves with SemanticInputResolution<TOutcome, TVariableId>."
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
        "purpose": "ResponseRenderer renders response response plans into outbound content.",
        "usage": "Use ResponseRenderer when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface ResponseRenderer {\n    render(plan: ResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>;\n}"
        ],
        "methods": [
          {
            "name": "render",
            "signature": "render(plan: ResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>",
            "description": "Renders a ResponsePlan into outbound content using the current response rendering context.",
            "parameters": [
              {
                "name": "plan",
                "type": "ResponsePlan",
                "description": "Response plan consumed by ResponseRenderer.render: ResponsePlan.",
                "required": true
              },
              {
                "name": "context",
                "type": "ResponseRenderingContext",
                "description": "Rendering context with the active flow version, step, state, turn, and channel for the response being rendered.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OutboundMessage[]>",
              "description": "Rendered output that the runtime turns into outbound messages for the current turn."
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
        "purpose": "Runtime context available while rendering a response plan, including the active flow version, step, state, turn, and channel.",
        "usage": "Use ResponseRenderingContext inside renderers to read the current step, scoped state variables, turn metadata, and channel without private runtime access.",
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
            "description": "FlowVersion currently being executed while the response plan is rendered.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "StepDefinition whose response plan is being rendered for the current turn.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Current conversation state used by renderers to read variables, step position, status, and execution stack.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Turn record that will receive any outbound messages produced by the renderer.",
            "required": true
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Channel selected for this render pass, usually from the input, conversation, or flow defaults.",
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
        "purpose": "Provider boundary called only for generated response plans, keeping model calls outside the core runtime.",
        "usage": "Use LlmResponseGenerator to connect OpenAI, Anthropic, an internal model gateway, or a deterministic test double for generated messages.",
        "signatures": [
          "export interface LlmResponseGenerator {\n    generate<TVariableId extends VariableId = VariableId>(plan: GeneratedResponsePlan<TVariableId>, context: ResponseRenderingContext): Promise<LlmGeneratedResponse<TVariableId>>;\n}"
        ],
        "methods": [
          {
            "name": "generate",
            "signature": "generate<TVariableId extends VariableId = VariableId>(\n        plan: GeneratedResponsePlan<TVariableId>,\n        context: ResponseRenderingContext\n    ): Promise<LlmGeneratedResponse<TVariableId>>",
            "description": "Generates text for a GeneratedResponsePlan using only the allowed variables and style constraints supplied by the runtime.",
            "parameters": [
              {
                "name": "plan",
                "type": "GeneratedResponsePlan<TVariableId>",
                "description": "GeneratedResponsePlan containing the goal, allowed variables, constraints, style, max length, and fallback text the provider must honor.",
                "required": true
              },
              {
                "name": "context",
                "type": "ResponseRenderingContext",
                "description": "Rendering context supplied to the provider so generated text can use the active flow, step, state variables, turn, and channel safely.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<LlmGeneratedResponse<TVariableId>>",
              "description": "Generated text plus optional model, usage, raw payload, and the variable ids actually consumed."
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
        "purpose": "LlmGeneratedResponse describes the response payload for llm generated.",
        "usage": "Use LlmGeneratedResponse when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
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
            "description": "Plain text sent by the user, rendered by a response, or emitted in a message for llm generated response.",
            "required": true
          },
          {
            "name": "usedVariableIds",
            "type": "readonly TVariableId[]",
            "description": "Identifier list that links llm generated response to the referenced used variable records.",
            "required": true
          },
          {
            "name": "fallbackUsed",
            "type": "boolean",
            "description": "Fallback used value on llm generated response; TypeScript expects a boolean.",
            "required": false
          },
          {
            "name": "usage",
            "type": "LlmUsageRecord",
            "description": "Usage value on llm generated response; TypeScript expects a LlmUsageRecord.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on llm generated response for adapters, analytics, audits, or tests.",
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
        "purpose": "ActionExecutor executes action work inside the runtime pipeline.",
        "usage": "Use ActionExecutor when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface ActionExecutor {\n    execute(action: ActionDefinition, input: Record<string, unknown>, context: ActionExecutionContext): Promise<ActionResult>;\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(action: ActionDefinition, input: Record<string, unknown>, context: ActionExecutionContext): Promise<ActionResult>",
            "description": "Executes the handler or service behavior for ActionExecutor.",
            "parameters": [
              {
                "name": "action",
                "type": "ActionDefinition",
                "description": "Action definition consumed by ActionExecutor.execute: ActionDefinition.",
                "required": true
              },
              {
                "name": "input",
                "type": "Record<string, unknown>",
                "description": "Input value consumed by ActionExecutor.execute: Record<string, unknown>.",
                "required": true
              },
              {
                "name": "context",
                "type": "ActionExecutionContext",
                "description": "Runtime context for ActionExecutor.execute, using ActionExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ActionResult>",
              "description": "ActionExecutor.execute resolves with ActionResult."
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
        "purpose": "ActionExecutionContext packages the runtime objects passed into action execution implementations.",
        "usage": "Use ActionExecutionContext when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
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
            "description": "Flow value on action execution context; TypeScript expects a FlowVersion.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "Step value on action execution context; TypeScript expects a StepDefinition.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Conversation state active in the current context for action execution context.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Turn active in the current context for action execution context.",
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
        "purpose": "ActionHandler is the extension contract for handling action behavior.",
        "usage": "Use ActionHandler when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface ActionHandler {\n    readonly actionKind: ActionKind;\n    execute(action: ActionDefinition, input: Record<string, unknown>, context: ActionExecutionContext): Promise<ActionResult>;\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(action: ActionDefinition, input: Record<string, unknown>, context: ActionExecutionContext): Promise<ActionResult>",
            "description": "Executes the handler or service behavior for ActionHandler.",
            "parameters": [
              {
                "name": "action",
                "type": "ActionDefinition",
                "description": "Action definition consumed by ActionHandler.execute: ActionDefinition.",
                "required": true
              },
              {
                "name": "input",
                "type": "Record<string, unknown>",
                "description": "Input value consumed by ActionHandler.execute: Record<string, unknown>.",
                "required": true
              },
              {
                "name": "context",
                "type": "ActionExecutionContext",
                "description": "Runtime context for ActionHandler.execute, using ActionExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ActionResult>",
              "description": "ActionHandler.execute resolves with ActionResult."
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
            "description": "Action kind value on action handler; TypeScript expects a string.",
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
        "purpose": "ActionHandlerRegistry stores and retrieves runtime extensions for action handler.",
        "usage": "Use ActionHandlerRegistry when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface ActionHandlerRegistry {\n    register(handler: ActionHandler): void;\n    getHandler(actionKind: ActionKind): ActionHandler;\n    hasHandler(actionKind: ActionKind): boolean;\n}"
        ],
        "methods": [
          {
            "name": "register",
            "signature": "register(handler: ActionHandler): void",
            "description": "Registers an implementation by type for ActionHandlerRegistry.",
            "parameters": [
              {
                "name": "handler",
                "type": "ActionHandler",
                "description": "Handler parameter for ActionHandlerRegistry.register: ActionHandler.",
                "required": true
              }
            ],
            "returns": {
              "type": "void",
              "description": "ActionHandlerRegistry.register completes after applying its side effect and returns no payload."
            }
          },
          {
            "name": "getHandler",
            "signature": "getHandler(actionKind: ActionKind): ActionHandler",
            "description": "Returns the handler registered for a type for ActionHandlerRegistry.",
            "parameters": [
              {
                "name": "actionKind",
                "type": "ActionKind",
                "description": "Action kind parameter for ActionHandlerRegistry.getHandler: ActionKind.",
                "required": true
              }
            ],
            "returns": {
              "type": "ActionHandler",
              "description": "ActionHandlerRegistry.getHandler returns an ActionHandler."
            }
          },
          {
            "name": "hasHandler",
            "signature": "hasHandler(actionKind: ActionKind): boolean",
            "description": "Checks whether a handler exists for a type for ActionHandlerRegistry.",
            "parameters": [
              {
                "name": "actionKind",
                "type": "ActionKind",
                "description": "Action kind parameter for ActionHandlerRegistry.hasHandler: ActionKind.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "ActionHandlerRegistry.hasHandler returns a boolean."
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
        "purpose": "ConditionEvaluator carries evaluate for extension contracts.",
        "usage": "Use ConditionEvaluator when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface ConditionEvaluator {\n    evaluate(condition: ConditionExpression, context: ConditionEvaluationContext): Promise<ConditionEvaluationResult>;\n}"
        ],
        "methods": [
          {
            "name": "evaluate",
            "signature": "evaluate(condition: ConditionExpression, context: ConditionEvaluationContext): Promise<ConditionEvaluationResult>",
            "description": "ConditionEvaluator.evaluate runs the evaluate path defined for ConditionEvaluator.",
            "parameters": [
              {
                "name": "condition",
                "type": "ConditionExpression",
                "description": "Single condition expression negated or evaluated by this contract passed to ConditionEvaluator.evaluate.",
                "required": true
              },
              {
                "name": "context",
                "type": "ConditionEvaluationContext",
                "description": "Runtime context for ConditionEvaluator.evaluate, using ConditionEvaluationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConditionEvaluationResult>",
              "description": "ConditionEvaluator.evaluate resolves with ConditionEvaluationResult."
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
        "purpose": "ConditionEvaluationContext packages the runtime objects passed into condition evaluation implementations.",
        "usage": "Use ConditionEvaluationContext when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
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
            "description": "Flow value on condition evaluation context; TypeScript expects a FlowVersion.",
            "required": true
          },
          {
            "name": "step",
            "type": "ConditionStepDefinition",
            "description": "Step value on condition evaluation context; TypeScript expects a ConditionStepDefinition.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Conversation state active in the current context for condition evaluation context.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Turn active in the current context for condition evaluation context.",
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
        "purpose": "TransitionResolver resolves transition decisions without coupling callers to an implementation.",
        "usage": "Use TransitionResolver when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface TransitionResolver {\n    resolveFromStepResult(step: StepDefinition, result: StepResult, context: TransitionResolutionContext): Promise<StepBranch | undefined>;\n    resolveFromOutcome(step: StepDefinition, outcome: StepOutcome, context: TransitionResolutionContext): Promise<StepBranch | undefined>;\n}"
        ],
        "methods": [
          {
            "name": "resolveFromStepResult",
            "signature": "resolveFromStepResult(step: StepDefinition, result: StepResult, context: TransitionResolutionContext): Promise<StepBranch | undefined>",
            "description": "TransitionResolver.resolveFromStepResult runs the resolve from step result path defined for TransitionResolver.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Step parameter for TransitionResolver.resolveFromStepResult: StepDefinition.",
                "required": true
              },
              {
                "name": "result",
                "type": "StepResult",
                "description": "Result payload consumed by TransitionResolver.resolveFromStepResult: StepResult.",
                "required": true
              },
              {
                "name": "context",
                "type": "TransitionResolutionContext",
                "description": "Runtime context for TransitionResolver.resolveFromStepResult, using TransitionResolutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepBranch | undefined>",
              "description": "TransitionResolver.resolveFromStepResult resolves with StepBranch | undefined."
            }
          },
          {
            "name": "resolveFromOutcome",
            "signature": "resolveFromOutcome(step: StepDefinition, outcome: StepOutcome, context: TransitionResolutionContext): Promise<StepBranch | undefined>",
            "description": "TransitionResolver.resolveFromOutcome runs the resolve from outcome path defined for TransitionResolver.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Step parameter for TransitionResolver.resolveFromOutcome: StepDefinition.",
                "required": true
              },
              {
                "name": "outcome",
                "type": "StepOutcome",
                "description": "Outcome value used to choose branches or report handler results passed to TransitionResolver.resolveFromOutcome.",
                "required": true
              },
              {
                "name": "context",
                "type": "TransitionResolutionContext",
                "description": "Runtime context for TransitionResolver.resolveFromOutcome, using TransitionResolutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepBranch | undefined>",
              "description": "TransitionResolver.resolveFromOutcome resolves with StepBranch | undefined."
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
        "purpose": "TransitionResolutionContext packages the runtime objects passed into transition resolution implementations.",
        "usage": "Use TransitionResolutionContext when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
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
            "description": "Flow value on transition resolution context; TypeScript expects a FlowVersion.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Conversation state active in the current context for transition resolution context.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Turn active in the current context for transition resolution context.",
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
        "purpose": "StateReducer carries apply for extension contracts.",
        "usage": "Use StateReducer when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface StateReducer {\n    apply(state: ConversationState, changes: StateChangeSet): ConversationState;\n}"
        ],
        "methods": [
          {
            "name": "apply",
            "signature": "apply(state: ConversationState, changes: StateChangeSet): ConversationState",
            "description": "StateReducer.apply runs the apply path defined for StateReducer.",
            "parameters": [
              {
                "name": "state",
                "type": "ConversationState",
                "description": "Conversation state active in the current context passed to StateReducer.apply.",
                "required": true
              },
              {
                "name": "changes",
                "type": "StateChangeSet",
                "description": "Changes parameter for StateReducer.apply: StateChangeSet.",
                "required": true
              }
            ],
            "returns": {
              "type": "ConversationState",
              "description": "StateReducer.apply returns a ConversationState."
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
        "purpose": "StateChangeSet carries events, variable patches, next step id, status, pending input, and clear pending input for extension contracts.",
        "usage": "Use StateChangeSet when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
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
            "description": "Events emitted and committed during the turn for state change set.",
            "required": false
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<string>[]",
            "description": "Variable patches applied during the turn for state change set.",
            "required": false
          },
          {
            "name": "nextStepId",
            "type": "string",
            "description": "Identifier that links state change set to the next step record it references.",
            "required": false
          },
          {
            "name": "status",
            "type": "ConversationStatus",
            "description": "State value that drives routing, result handling, or lifecycle decisions for state change set.",
            "required": false
          },
          {
            "name": "pendingInput",
            "type": "PendingInputState",
            "description": "Step waiting for the next user input for state change set.",
            "required": false
          },
          {
            "name": "clearPendingInput",
            "type": "boolean",
            "description": "Clear pending input value on state change set; TypeScript expects a boolean.",
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
        "purpose": "TraceBuilder carries build for extension contracts.",
        "usage": "Use TraceBuilder when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface TraceBuilder {\n    build(input: TraceBuildInput): DecisionTrace;\n}"
        ],
        "methods": [
          {
            "name": "build",
            "signature": "build(input: TraceBuildInput): DecisionTrace",
            "description": "TraceBuilder.build runs the build path defined for TraceBuilder.",
            "parameters": [
              {
                "name": "input",
                "type": "TraceBuildInput",
                "description": "Input value consumed by TraceBuilder.build: TraceBuildInput.",
                "required": true
              }
            ],
            "returns": {
              "type": "DecisionTrace",
              "description": "TraceBuilder.build returns a DecisionTrace."
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
        "purpose": "TraceBuildInput is an input DTO accepted by the runtime or adapter.",
        "usage": "Use TraceBuildInput when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
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
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for trace build input.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for trace build input.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "Specific flow version selected for loading, state, traces, and start requests for trace build input.",
            "required": true
          },
          {
            "name": "initialStepId",
            "type": "string",
            "description": "Step where the traced turn began for trace build input.",
            "required": false
          },
          {
            "name": "finalStepId",
            "type": "string",
            "description": "Step where the traced turn ended for trace build input.",
            "required": false
          },
          {
            "name": "userInput",
            "type": "UserInput",
            "description": "User input attached to a context, trace, or turn result for trace build input.",
            "required": false
          },
          {
            "name": "fragments",
            "type": "TraceFragment[]",
            "description": "Trace fragments collected during the turn for trace build input.",
            "required": true
          },
          {
            "name": "events",
            "type": "ConversationEvent[]",
            "description": "Events emitted and committed during the turn for trace build input.",
            "required": true
          },
          {
            "name": "messages",
            "type": "OutboundMessage[]",
            "description": "Outbound response plans or message DTOs produced during a turn for trace build input.",
            "required": true
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<string>[]",
            "description": "Variable patches applied during the turn for trace build input.",
            "required": true
          },
          {
            "name": "variableReads",
            "type": "VariableReadTrace[]",
            "description": "Variable reads recorded for traceability for trace build input.",
            "required": false
          },
          {
            "name": "operationResults",
            "type": "OperationTraceRecord[]",
            "description": "Operation results recorded during the turn for trace build input.",
            "required": false
          },
          {
            "name": "actionResults",
            "type": "ActionTraceRecord[]",
            "description": "Action results recorded during the turn for trace build input.",
            "required": false
          },
          {
            "name": "conditionResults",
            "type": "ConditionTraceRecord[]",
            "description": "Condition evaluation records collected during routing for trace build input.",
            "required": false
          },
          {
            "name": "flowCalls",
            "type": "FlowCallTraceRecord[]",
            "description": "Child flow call records collected during the turn for trace build input.",
            "required": false
          },
          {
            "name": "handoffs",
            "type": "HandoffTraceRecord[]",
            "description": "Handoff records collected during the turn for trace build input.",
            "required": false
          },
          {
            "name": "llmUsage",
            "type": "LlmUsageRecord[]",
            "description": "LLM usage records collected during semantic or generated response work for trace build input.",
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
        "purpose": "MessageStepHandler is the extension contract for handling message step behavior.",
        "usage": "Use MessageStepHandler when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface MessageStepHandler extends StepHandler<MessageStepConfig> {\n    readonly stepType: \"message\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(step: StepDefinition, context: StepValidationContext): ValidationIssue[]",
            "description": "Validates a flow, step, operation, value, or model object for MessageStepHandler.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Step parameter for MessageStepHandler.validate: StepDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "StepValidationContext",
                "description": "Runtime context for MessageStepHandler.validate, using StepValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "ValidationIssue[]",
              "description": "MessageStepHandler.validate returns a ValidationIssue[]."
            }
          },
          {
            "name": "enter",
            "signature": "enter(context: StepExecutionContext<TConfig>): Promise<StepResult>",
            "description": "MessageStepHandler.enter runs the enter path defined for MessageStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "Runtime context for MessageStepHandler.enter, using StepExecutionContext<TConfig> data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "MessageStepHandler.enter resolves with StepResult."
            }
          },
          {
            "name": "handleInput",
            "signature": "handleInput?(context: StepExecutionContext<TConfig>, input: UserInput): Promise<StepResult>",
            "description": "MessageStepHandler.handleInput runs the handle input path defined for MessageStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "Runtime context for MessageStepHandler.handleInput, using StepExecutionContext<TConfig> data from the active turn.",
                "required": true
              },
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by MessageStepHandler.handleInput: UserInput.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "MessageStepHandler.handleInput resolves with StepResult."
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
            "description": "Literal \"message\" marker that selects the message step handler variant during validation and runtime dispatch.",
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
        "purpose": "MenuStepHandler is the extension contract for handling menu step behavior.",
        "usage": "Use MenuStepHandler when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface MenuStepHandler extends StepHandler<MenuStepConfig> {\n    readonly stepType: \"menu\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(step: StepDefinition, context: StepValidationContext): ValidationIssue[]",
            "description": "Validates a flow, step, operation, value, or model object for MenuStepHandler.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Step parameter for MenuStepHandler.validate: StepDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "StepValidationContext",
                "description": "Runtime context for MenuStepHandler.validate, using StepValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "ValidationIssue[]",
              "description": "MenuStepHandler.validate returns a ValidationIssue[]."
            }
          },
          {
            "name": "enter",
            "signature": "enter(context: StepExecutionContext<TConfig>): Promise<StepResult>",
            "description": "MenuStepHandler.enter runs the enter path defined for MenuStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "Runtime context for MenuStepHandler.enter, using StepExecutionContext<TConfig> data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "MenuStepHandler.enter resolves with StepResult."
            }
          },
          {
            "name": "handleInput",
            "signature": "handleInput?(context: StepExecutionContext<TConfig>, input: UserInput): Promise<StepResult>",
            "description": "MenuStepHandler.handleInput runs the handle input path defined for MenuStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "Runtime context for MenuStepHandler.handleInput, using StepExecutionContext<TConfig> data from the active turn.",
                "required": true
              },
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by MenuStepHandler.handleInput: UserInput.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "MenuStepHandler.handleInput resolves with StepResult."
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
            "description": "Literal \"menu\" marker that selects the menu step handler variant during validation and runtime dispatch.",
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
        "purpose": "InputStepHandler is the extension contract for handling input step behavior.",
        "usage": "Use InputStepHandler when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface InputStepHandler extends StepHandler<InputStepConfig> {\n    readonly stepType: \"input\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(step: StepDefinition, context: StepValidationContext): ValidationIssue[]",
            "description": "Validates a flow, step, operation, value, or model object for InputStepHandler.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Step parameter for InputStepHandler.validate: StepDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "StepValidationContext",
                "description": "Runtime context for InputStepHandler.validate, using StepValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "ValidationIssue[]",
              "description": "InputStepHandler.validate returns a ValidationIssue[]."
            }
          },
          {
            "name": "enter",
            "signature": "enter(context: StepExecutionContext<TConfig>): Promise<StepResult>",
            "description": "InputStepHandler.enter runs the enter path defined for InputStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "Runtime context for InputStepHandler.enter, using StepExecutionContext<TConfig> data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "InputStepHandler.enter resolves with StepResult."
            }
          },
          {
            "name": "handleInput",
            "signature": "handleInput?(context: StepExecutionContext<TConfig>, input: UserInput): Promise<StepResult>",
            "description": "InputStepHandler.handleInput runs the handle input path defined for InputStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "Runtime context for InputStepHandler.handleInput, using StepExecutionContext<TConfig> data from the active turn.",
                "required": true
              },
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by InputStepHandler.handleInput: UserInput.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "InputStepHandler.handleInput resolves with StepResult."
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
            "description": "Literal \"input\" marker that selects the input step handler variant during validation and runtime dispatch.",
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
        "purpose": "AttachmentStepHandler is the extension contract for handling attachment step behavior.",
        "usage": "Use AttachmentStepHandler when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface AttachmentStepHandler extends StepHandler<AttachmentStepConfig> {\n    readonly stepType: \"attachment\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(step: StepDefinition, context: StepValidationContext): ValidationIssue[]",
            "description": "Validates a flow, step, operation, value, or model object for AttachmentStepHandler.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Step parameter for AttachmentStepHandler.validate: StepDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "StepValidationContext",
                "description": "Runtime context for AttachmentStepHandler.validate, using StepValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "ValidationIssue[]",
              "description": "AttachmentStepHandler.validate returns a ValidationIssue[]."
            }
          },
          {
            "name": "enter",
            "signature": "enter(context: StepExecutionContext<TConfig>): Promise<StepResult>",
            "description": "AttachmentStepHandler.enter runs the enter path defined for AttachmentStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "Runtime context for AttachmentStepHandler.enter, using StepExecutionContext<TConfig> data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "AttachmentStepHandler.enter resolves with StepResult."
            }
          },
          {
            "name": "handleInput",
            "signature": "handleInput?(context: StepExecutionContext<TConfig>, input: UserInput): Promise<StepResult>",
            "description": "AttachmentStepHandler.handleInput runs the handle input path defined for AttachmentStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "Runtime context for AttachmentStepHandler.handleInput, using StepExecutionContext<TConfig> data from the active turn.",
                "required": true
              },
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by AttachmentStepHandler.handleInput: UserInput.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "AttachmentStepHandler.handleInput resolves with StepResult."
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
            "description": "Literal \"attachment\" marker that selects the attachment step handler variant during validation and runtime dispatch.",
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
        "purpose": "ConditionStepHandler is the extension contract for handling condition step behavior.",
        "usage": "Use ConditionStepHandler when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface ConditionStepHandler extends StepHandler<ConditionStepConfig> {\n    readonly stepType: \"condition\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(step: StepDefinition, context: StepValidationContext): ValidationIssue[]",
            "description": "Validates a flow, step, operation, value, or model object for ConditionStepHandler.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Step parameter for ConditionStepHandler.validate: StepDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "StepValidationContext",
                "description": "Runtime context for ConditionStepHandler.validate, using StepValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "ValidationIssue[]",
              "description": "ConditionStepHandler.validate returns a ValidationIssue[]."
            }
          },
          {
            "name": "enter",
            "signature": "enter(context: StepExecutionContext<TConfig>): Promise<StepResult>",
            "description": "ConditionStepHandler.enter runs the enter path defined for ConditionStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "Runtime context for ConditionStepHandler.enter, using StepExecutionContext<TConfig> data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "ConditionStepHandler.enter resolves with StepResult."
            }
          },
          {
            "name": "handleInput",
            "signature": "handleInput?(context: StepExecutionContext<TConfig>, input: UserInput): Promise<StepResult>",
            "description": "ConditionStepHandler.handleInput runs the handle input path defined for ConditionStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "Runtime context for ConditionStepHandler.handleInput, using StepExecutionContext<TConfig> data from the active turn.",
                "required": true
              },
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by ConditionStepHandler.handleInput: UserInput.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "ConditionStepHandler.handleInput resolves with StepResult."
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
            "description": "Literal \"condition\" marker that selects the condition step handler variant during validation and runtime dispatch.",
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
        "purpose": "EndStepHandler is the extension contract for handling end step behavior.",
        "usage": "Use EndStepHandler when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface EndStepHandler extends StepHandler<EndStepConfig> {\n    readonly stepType: \"end\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(step: StepDefinition, context: StepValidationContext): ValidationIssue[]",
            "description": "Validates a flow, step, operation, value, or model object for EndStepHandler.",
            "parameters": [
              {
                "name": "step",
                "type": "StepDefinition",
                "description": "Step parameter for EndStepHandler.validate: StepDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "StepValidationContext",
                "description": "Runtime context for EndStepHandler.validate, using StepValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "ValidationIssue[]",
              "description": "EndStepHandler.validate returns a ValidationIssue[]."
            }
          },
          {
            "name": "enter",
            "signature": "enter(context: StepExecutionContext<TConfig>): Promise<StepResult>",
            "description": "EndStepHandler.enter runs the enter path defined for EndStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "Runtime context for EndStepHandler.enter, using StepExecutionContext<TConfig> data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "EndStepHandler.enter resolves with StepResult."
            }
          },
          {
            "name": "handleInput",
            "signature": "handleInput?(context: StepExecutionContext<TConfig>, input: UserInput): Promise<StepResult>",
            "description": "EndStepHandler.handleInput runs the handle input path defined for EndStepHandler.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext<TConfig>",
                "description": "Runtime context for EndStepHandler.handleInput, using StepExecutionContext<TConfig> data from the active turn.",
                "required": true
              },
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by EndStepHandler.handleInput: UserInput.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "EndStepHandler.handleInput resolves with StepResult."
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
            "description": "Literal \"end\" marker that selects the end step handler variant during validation and runtime dispatch.",
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
        "purpose": "SendMessageOperationHandler is the extension contract for handling send message operation behavior.",
        "usage": "Use SendMessageOperationHandler when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface SendMessageOperationHandler extends OperationHandler<SendMessageOperation> {\n    readonly operationType: \"send_message\";\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "Executes the handler or service behavior for SendMessageOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "Operation object consumed by SendMessageOperationHandler.execute: TOperation.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "Runtime context for SendMessageOperationHandler.execute, using OperationExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "SendMessageOperationHandler.execute resolves with OperationResult."
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
            "description": "Literal \"send_message\" marker that selects the send message operation handler variant during validation and runtime dispatch.",
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
        "purpose": "SetVariableOperationHandler is the extension contract for handling set variable operation behavior.",
        "usage": "Use SetVariableOperationHandler when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface SetVariableOperationHandler extends OperationHandler<SetVariableOperation> {\n    readonly operationType: \"set_variable\";\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "Executes the handler or service behavior for SetVariableOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "Operation object consumed by SetVariableOperationHandler.execute: TOperation.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "Runtime context for SetVariableOperationHandler.execute, using OperationExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "SetVariableOperationHandler.execute resolves with OperationResult."
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
            "description": "Literal \"set_variable\" marker that selects the set variable operation handler variant during validation and runtime dispatch.",
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
        "purpose": "UnsetVariableOperationHandler is the extension contract for handling unset variable operation behavior.",
        "usage": "Use UnsetVariableOperationHandler when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface UnsetVariableOperationHandler extends OperationHandler<UnsetVariableOperation> {\n    readonly operationType: \"unset_variable\";\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "Executes the handler or service behavior for UnsetVariableOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "Operation object consumed by UnsetVariableOperationHandler.execute: TOperation.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "Runtime context for UnsetVariableOperationHandler.execute, using OperationExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "UnsetVariableOperationHandler.execute resolves with OperationResult."
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
            "description": "Literal \"unset_variable\" marker that selects the unset variable operation handler variant during validation and runtime dispatch.",
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
        "purpose": "InvalidateVariableOperationHandler is the extension contract for handling invalidate variable operation behavior.",
        "usage": "Use InvalidateVariableOperationHandler when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface InvalidateVariableOperationHandler extends OperationHandler<InvalidateVariableOperation> {\n    readonly operationType: \"invalidate_variable\";\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "Executes the handler or service behavior for InvalidateVariableOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "Operation object consumed by InvalidateVariableOperationHandler.execute: TOperation.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "Runtime context for InvalidateVariableOperationHandler.execute, using OperationExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "InvalidateVariableOperationHandler.execute resolves with OperationResult."
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
            "description": "Literal \"invalidate_variable\" marker that selects the invalidate variable operation handler variant during validation and runtime dispatch.",
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
        "purpose": "RunActionOperationHandler is the extension contract for handling run action operation behavior.",
        "usage": "Use RunActionOperationHandler when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface RunActionOperationHandler extends OperationHandler<RunActionOperation> {\n    readonly operationType: \"run_action\";\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "Executes the handler or service behavior for RunActionOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "Operation object consumed by RunActionOperationHandler.execute: TOperation.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "Runtime context for RunActionOperationHandler.execute, using OperationExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "RunActionOperationHandler.execute resolves with OperationResult."
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
            "description": "Literal \"run_action\" marker that selects the run action operation handler variant during validation and runtime dispatch.",
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
        "purpose": "CallFlowOperationHandler is the extension contract for handling call flow operation behavior.",
        "usage": "Use CallFlowOperationHandler when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface CallFlowOperationHandler extends OperationHandler<CallFlowOperation> {\n    readonly operationType: \"call_flow\";\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "Executes the handler or service behavior for CallFlowOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "Operation object consumed by CallFlowOperationHandler.execute: TOperation.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "Runtime context for CallFlowOperationHandler.execute, using OperationExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "CallFlowOperationHandler.execute resolves with OperationResult."
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
            "description": "Literal \"call_flow\" marker that selects the call flow operation handler variant during validation and runtime dispatch.",
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
        "purpose": "EmitEventOperationHandler is the extension contract for handling emit event operation behavior.",
        "usage": "Use EmitEventOperationHandler when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface EmitEventOperationHandler extends OperationHandler<EmitEventOperation> {\n    readonly operationType: \"emit_event\";\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "Executes the handler or service behavior for EmitEventOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "Operation object consumed by EmitEventOperationHandler.execute: TOperation.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "Runtime context for EmitEventOperationHandler.execute, using OperationExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "EmitEventOperationHandler.execute resolves with OperationResult."
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
            "description": "Literal \"emit_event\" marker that selects the emit event operation handler variant during validation and runtime dispatch.",
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
        "purpose": "HandoffOperationHandler is the extension contract for handling handoff operation behavior.",
        "usage": "Use HandoffOperationHandler when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface HandoffOperationHandler extends OperationHandler<HandoffOperation> {\n    readonly operationType: \"handoff\";\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "Executes the handler or service behavior for HandoffOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "Operation object consumed by HandoffOperationHandler.execute: TOperation.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "Runtime context for HandoffOperationHandler.execute, using OperationExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "HandoffOperationHandler.execute resolves with OperationResult."
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
            "description": "Literal \"handoff\" marker that selects the handoff operation handler variant during validation and runtime dispatch.",
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
        "purpose": "CustomOperationHandler is the extension contract for handling custom operation behavior.",
        "usage": "Use CustomOperationHandler when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface CustomOperationHandler extends OperationHandler<CustomOperation> {\n    readonly operationType: \"custom\";\n    readonly customType: string;\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(operation: TOperation, context: OperationExecutionContext): Promise<OperationResult>",
            "description": "Executes the handler or service behavior for CustomOperationHandler.",
            "parameters": [
              {
                "name": "operation",
                "type": "TOperation",
                "description": "Operation object consumed by CustomOperationHandler.execute: TOperation.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "Runtime context for CustomOperationHandler.execute, using OperationExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OperationResult>",
              "description": "CustomOperationHandler.execute resolves with OperationResult."
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
            "description": "Literal \"custom\" marker that selects the custom operation handler variant during validation and runtime dispatch.",
            "required": true
          },
          {
            "name": "customType",
            "type": "string",
            "description": "Custom operation type used to find the configured executor for custom operation handler.",
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
        "purpose": "Normalizer carries normalizer type, and normalize for extension contracts.",
        "usage": "Use Normalizer when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface Normalizer {\n    readonly normalizerType: string;\n    normalize(value: unknown, definition: NormalizerDefinition, context: NormalizationContext): Promise<unknown>;\n}"
        ],
        "methods": [
          {
            "name": "normalize",
            "signature": "normalize(value: unknown, definition: NormalizerDefinition, context: NormalizationContext): Promise<unknown>",
            "description": "Normalizer.normalize runs the normalize path defined for Normalizer.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "Candidate or stored value consumed by Normalizer.normalize: unknown.",
                "required": true
              },
              {
                "name": "definition",
                "type": "NormalizerDefinition",
                "description": "Definition object consumed by Normalizer.normalize: NormalizerDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "NormalizationContext",
                "description": "Runtime context for Normalizer.normalize, using NormalizationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<unknown>",
              "description": "Normalizer.normalize resolves with unknown."
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
            "description": "Normalizer type value on normalizer; TypeScript expects a string.",
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
        "purpose": "NormalizationContext packages the runtime objects passed into normalization implementations.",
        "usage": "Use NormalizationContext when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
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
            "description": "Flow value on normalization context; TypeScript expects a FlowVersion.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "Step value on normalization context; TypeScript expects a StepDefinition.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Conversation state active in the current context for normalization context.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Turn active in the current context for normalization context.",
            "required": true
          },
          {
            "name": "input",
            "type": "UserInput",
            "description": "User input, binding source, or operation payload handled by this contract for normalization context.",
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
        "purpose": "NormalizerRegistry stores and retrieves runtime extensions for normalizer.",
        "usage": "Use NormalizerRegistry when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface NormalizerRegistry {\n    register(normalizer: Normalizer): void;\n    getNormalizer(normalizerType: string): Normalizer;\n    hasNormalizer(normalizerType: string): boolean;\n}"
        ],
        "methods": [
          {
            "name": "register",
            "signature": "register(normalizer: Normalizer): void",
            "description": "Registers an implementation by type for NormalizerRegistry.",
            "parameters": [
              {
                "name": "normalizer",
                "type": "Normalizer",
                "description": "Normalizer parameter for NormalizerRegistry.register: Normalizer.",
                "required": true
              }
            ],
            "returns": {
              "type": "void",
              "description": "NormalizerRegistry.register completes after applying its side effect and returns no payload."
            }
          },
          {
            "name": "getNormalizer",
            "signature": "getNormalizer(normalizerType: string): Normalizer",
            "description": "Returns the normalizer registered for a type for NormalizerRegistry.",
            "parameters": [
              {
                "name": "normalizerType",
                "type": "string",
                "description": "Normalizer type parameter for NormalizerRegistry.getNormalizer: string.",
                "required": true
              }
            ],
            "returns": {
              "type": "Normalizer",
              "description": "NormalizerRegistry.getNormalizer returns a Normalizer."
            }
          },
          {
            "name": "hasNormalizer",
            "signature": "hasNormalizer(normalizerType: string): boolean",
            "description": "Checks whether a normalizer exists for a type for NormalizerRegistry.",
            "parameters": [
              {
                "name": "normalizerType",
                "type": "string",
                "description": "Normalizer type parameter for NormalizerRegistry.hasNormalizer: string.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "NormalizerRegistry.hasNormalizer returns a boolean."
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
        "purpose": "Extractor carries extractor type, and extract for extension contracts.",
        "usage": "Use Extractor when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface Extractor {\n    readonly extractorType: string;\n    extract(input: UserInput, definition: ExtractorDefinition, context: ExtractionContext): Promise<ExtractionResult>;\n}"
        ],
        "methods": [
          {
            "name": "extract",
            "signature": "extract(input: UserInput, definition: ExtractorDefinition, context: ExtractionContext): Promise<ExtractionResult>",
            "description": "Extractor.extract runs the extract path defined for Extractor.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by Extractor.extract: UserInput.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ExtractorDefinition",
                "description": "Definition object consumed by Extractor.extract: ExtractorDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "ExtractionContext",
                "description": "Runtime context for Extractor.extract, using ExtractionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ExtractionResult>",
              "description": "Extractor.extract resolves with ExtractionResult."
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
            "description": "Extractor type value on extractor; TypeScript expects a string.",
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
        "purpose": "ExtractionContext packages the runtime objects passed into extraction implementations.",
        "usage": "Use ExtractionContext when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
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
            "description": "Flow value on extraction context; TypeScript expects a FlowVersion.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "Step value on extraction context; TypeScript expects a StepDefinition.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Conversation state active in the current context for extraction context.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Turn active in the current context for extraction context.",
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
        "purpose": "ExtractionResult captures the outcome, variables, trace data, and errors from extraction.",
        "usage": "Use ExtractionResult when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
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
            "description": "Boolean result of evaluating a condition expression for extraction result.",
            "required": true
          },
          {
            "name": "value",
            "type": "unknown",
            "description": "Underlying payload stored, compared, normalized, or returned for extraction result.",
            "required": false
          },
          {
            "name": "values",
            "type": "unknown[]",
            "description": "Collection of unknown values carried by extraction result.",
            "required": false
          },
          {
            "name": "confidence",
            "type": "number",
            "description": "Confidence score assigned by semantic input or matching logic for extraction result.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on extraction result for adapters, analytics, audits, or tests.",
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
        "purpose": "ExtractorRegistry stores and retrieves runtime extensions for extractor.",
        "usage": "Use ExtractorRegistry when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface ExtractorRegistry {\n    register(extractor: Extractor): void;\n    getExtractor(extractorType: string): Extractor;\n    hasExtractor(extractorType: string): boolean;\n}"
        ],
        "methods": [
          {
            "name": "register",
            "signature": "register(extractor: Extractor): void",
            "description": "Registers an implementation by type for ExtractorRegistry.",
            "parameters": [
              {
                "name": "extractor",
                "type": "Extractor",
                "description": "Extractor parameter for ExtractorRegistry.register: Extractor.",
                "required": true
              }
            ],
            "returns": {
              "type": "void",
              "description": "ExtractorRegistry.register completes after applying its side effect and returns no payload."
            }
          },
          {
            "name": "getExtractor",
            "signature": "getExtractor(extractorType: string): Extractor",
            "description": "Returns the extractor registered for a type for ExtractorRegistry.",
            "parameters": [
              {
                "name": "extractorType",
                "type": "string",
                "description": "Extractor type parameter for ExtractorRegistry.getExtractor: string.",
                "required": true
              }
            ],
            "returns": {
              "type": "Extractor",
              "description": "ExtractorRegistry.getExtractor returns an Extractor."
            }
          },
          {
            "name": "hasExtractor",
            "signature": "hasExtractor(extractorType: string): boolean",
            "description": "Checks whether an extractor exists for a type for ExtractorRegistry.",
            "parameters": [
              {
                "name": "extractorType",
                "type": "string",
                "description": "Extractor type parameter for ExtractorRegistry.hasExtractor: string.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "ExtractorRegistry.hasExtractor returns a boolean."
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
        "purpose": "TemplateRenderer renders template response plans into outbound content.",
        "usage": "Use TemplateRenderer when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface TemplateRenderer {\n    render(template: string, context: ResponseRenderingContext): Promise<string>;\n}"
        ],
        "methods": [
          {
            "name": "render",
            "signature": "render(template: string, context: ResponseRenderingContext): Promise<string>",
            "description": "Renders a response plan into outbound content for TemplateRenderer.",
            "parameters": [
              {
                "name": "template",
                "type": "string",
                "description": "Template string resolved against variables or rendering context passed to TemplateRenderer.render.",
                "required": true
              },
              {
                "name": "context",
                "type": "ResponseRenderingContext",
                "description": "Runtime context for TemplateRenderer.render, using ResponseRenderingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<string>",
              "description": "TemplateRenderer.render resolves with string."
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
        "purpose": "StaticResponseRenderer renders static response response plans into outbound content.",
        "usage": "Use StaticResponseRenderer when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface StaticResponseRenderer {\n    render(plan: StaticResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>;\n}"
        ],
        "methods": [
          {
            "name": "render",
            "signature": "render(plan: StaticResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>",
            "description": "Renders a response plan into outbound content for StaticResponseRenderer.",
            "parameters": [
              {
                "name": "plan",
                "type": "StaticResponsePlan",
                "description": "Response plan consumed by StaticResponseRenderer.render: StaticResponsePlan.",
                "required": true
              },
              {
                "name": "context",
                "type": "ResponseRenderingContext",
                "description": "Runtime context for StaticResponseRenderer.render, using ResponseRenderingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OutboundMessage[]>",
              "description": "StaticResponseRenderer.render resolves with OutboundMessage[]."
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
        "purpose": "TemplateResponseRenderer renders template response response plans into outbound content.",
        "usage": "Use TemplateResponseRenderer when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface TemplateResponseRenderer {\n    render(plan: TemplateResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>;\n}"
        ],
        "methods": [
          {
            "name": "render",
            "signature": "render(plan: TemplateResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>",
            "description": "Renders a response plan into outbound content for TemplateResponseRenderer.",
            "parameters": [
              {
                "name": "plan",
                "type": "TemplateResponsePlan",
                "description": "Response plan consumed by TemplateResponseRenderer.render: TemplateResponsePlan.",
                "required": true
              },
              {
                "name": "context",
                "type": "ResponseRenderingContext",
                "description": "Runtime context for TemplateResponseRenderer.render, using ResponseRenderingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OutboundMessage[]>",
              "description": "TemplateResponseRenderer.render resolves with OutboundMessage[]."
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
        "purpose": "Renderer that delegates generated response plans to the configured LLM response generator and validates the returned variable usage.",
        "usage": "Use GeneratedResponseRenderer when generated response plans should fail loudly without a configured provider or invalid returned variables.",
        "signatures": [
          "export interface GeneratedResponseRenderer {\n    render(plan: GeneratedResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>;\n}"
        ],
        "methods": [
          {
            "name": "render",
            "signature": "render(plan: GeneratedResponsePlan, context: ResponseRenderingContext): Promise<OutboundMessage[]>",
            "description": "Renders generated plans by invoking the configured LLM provider and validating the generated output.",
            "parameters": [
              {
                "name": "plan",
                "type": "GeneratedResponsePlan",
                "description": "Generated response plan whose goal, constraints, style, and allowedVariableIds determine the provider prompt contract.",
                "required": true
              },
              {
                "name": "context",
                "type": "ResponseRenderingContext",
                "description": "Rendering context passed through to the LLM provider while enforcing allowedVariableIds against the current state variables.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<OutboundMessage[]>",
              "description": "Rendered output containing generated text or fallback handling together with traceable provider metadata."
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
        "purpose": "ResponseReferenceResolver resolves response reference decisions without coupling callers to an implementation.",
        "usage": "Use ResponseReferenceResolver when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface ResponseReferenceResolver {\n    resolve(responseId: ResponseId, context: ResponseRenderingContext): Promise<ResponseDefinition | undefined>;\n}"
        ],
        "methods": [
          {
            "name": "resolve",
            "signature": "resolve(responseId: ResponseId, context: ResponseRenderingContext): Promise<ResponseDefinition | undefined>",
            "description": "Resolves input, response references, variables, routes, or definitions for ResponseReferenceResolver.",
            "parameters": [
              {
                "name": "responseId",
                "type": "ResponseId",
                "description": "Identifier used by ResponseReferenceResolver.resolve to locate the response record.",
                "required": true
              },
              {
                "name": "context",
                "type": "ResponseRenderingContext",
                "description": "Runtime context for ResponseReferenceResolver.resolve, using ResponseRenderingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ResponseDefinition | undefined>",
              "description": "ResponseReferenceResolver.resolve resolves with ResponseDefinition | undefined."
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
        "purpose": "ActionInputMapper carries map input for extension contracts.",
        "usage": "Use ActionInputMapper when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface ActionInputMapper {\n    mapInput(operation: RunActionOperation, context: OperationExecutionContext): Promise<Record<string, unknown>>;\n}"
        ],
        "methods": [
          {
            "name": "mapInput",
            "signature": "mapInput(operation: RunActionOperation, context: OperationExecutionContext): Promise<Record<string, unknown>>",
            "description": "Maps variables and context into an action input payload for ActionInputMapper.",
            "parameters": [
              {
                "name": "operation",
                "type": "RunActionOperation",
                "description": "Operation object consumed by ActionInputMapper.mapInput: RunActionOperation.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "Runtime context for ActionInputMapper.mapInput, using OperationExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<Record<string, unknown>>",
              "description": "ActionInputMapper.mapInput resolves with Record<string, unknown>."
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
        "purpose": "ActionOutputMapper carries map output for extension contracts.",
        "usage": "Use ActionOutputMapper when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface ActionOutputMapper {\n    mapOutput(operation: RunActionOperation, result: ActionResult, context: OperationExecutionContext): Promise<VariablePatch[]>;\n}"
        ],
        "methods": [
          {
            "name": "mapOutput",
            "signature": "mapOutput(operation: RunActionOperation, result: ActionResult, context: OperationExecutionContext): Promise<VariablePatch[]>",
            "description": "Maps action output into variable patches for ActionOutputMapper.",
            "parameters": [
              {
                "name": "operation",
                "type": "RunActionOperation",
                "description": "Operation object consumed by ActionOutputMapper.mapOutput: RunActionOperation.",
                "required": true
              },
              {
                "name": "result",
                "type": "ActionResult",
                "description": "Result payload consumed by ActionOutputMapper.mapOutput: ActionResult.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "Runtime context for ActionOutputMapper.mapOutput, using OperationExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<VariablePatch[]>",
              "description": "ActionOutputMapper.mapOutput resolves with VariablePatch[]."
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
        "purpose": "ActionResultRouter carries resolve branch for extension contracts.",
        "usage": "Use ActionResultRouter when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface ActionResultRouter {\n    resolveBranch(operation: RunActionOperation, result: ActionResult, context: OperationExecutionContext): Promise<StepBranch | undefined>;\n}"
        ],
        "methods": [
          {
            "name": "resolveBranch",
            "signature": "resolveBranch(operation: RunActionOperation, result: ActionResult, context: OperationExecutionContext): Promise<StepBranch | undefined>",
            "description": "Selects a branch from an action, custom operation, flow call, or handoff result for ActionResultRouter.",
            "parameters": [
              {
                "name": "operation",
                "type": "RunActionOperation",
                "description": "Operation object consumed by ActionResultRouter.resolveBranch: RunActionOperation.",
                "required": true
              },
              {
                "name": "result",
                "type": "ActionResult",
                "description": "Result payload consumed by ActionResultRouter.resolveBranch: ActionResult.",
                "required": true
              },
              {
                "name": "context",
                "type": "OperationExecutionContext",
                "description": "Runtime context for ActionResultRouter.resolveBranch, using OperationExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepBranch | undefined>",
              "description": "ActionResultRouter.resolveBranch resolves with StepBranch | undefined."
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
        "purpose": "EventFactory creates event objects with runtime ids and timestamps.",
        "usage": "Use EventFactory when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface EventFactory {\n    createEvent(request: CreateEventRequest): ConversationEvent;\n}"
        ],
        "methods": [
          {
            "name": "createEvent",
            "signature": "createEvent(request: CreateEventRequest): ConversationEvent",
            "description": "Creates a conversation event with ids and timestamps for EventFactory.",
            "parameters": [
              {
                "name": "request",
                "type": "CreateEventRequest",
                "description": "Request payload for EventFactory.createEvent: CreateEventRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "ConversationEvent",
              "description": "EventFactory.createEvent returns a ConversationEvent."
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
        "purpose": "CreateEventRequest carries the request payload for create event calls.",
        "usage": "Use CreateEventRequest when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
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
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for create event request.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for create event request.",
            "required": false
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "Specific flow version selected for loading, state, traces, and start requests for create event request.",
            "required": true
          },
          {
            "name": "stepId",
            "type": "string",
            "description": "Step identifier targeted by state, routes, traces, and execution context for create event request.",
            "required": false
          },
          {
            "name": "type",
            "type": "string",
            "description": "Type discriminator that directs validation and runtime handling for create event request.",
            "required": true
          },
          {
            "name": "payload",
            "type": "Metadata",
            "description": "Structured payload carried by events, choices, messages, or custom content for create event request.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on create event request for adapters, analytics, audits, or tests.",
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
        "purpose": "MessageFactory creates message objects with runtime ids and timestamps.",
        "usage": "Use MessageFactory when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
        "signatures": [
          "export interface MessageFactory {\n    createTextMessage(request: CreateTextMessageRequest): OutboundMessage;\n    createRichMessage(request: CreateRichMessageRequest): OutboundMessage;\n    createCustomPayloadMessage(request: CreateCustomPayloadMessageRequest): OutboundMessage;\n}"
        ],
        "methods": [
          {
            "name": "createTextMessage",
            "signature": "createTextMessage(request: CreateTextMessageRequest): OutboundMessage",
            "description": "Creates a text outbound message with ids and timestamps for MessageFactory.",
            "parameters": [
              {
                "name": "request",
                "type": "CreateTextMessageRequest",
                "description": "Request payload for MessageFactory.createTextMessage: CreateTextMessageRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "OutboundMessage",
              "description": "MessageFactory.createTextMessage returns an OutboundMessage."
            }
          },
          {
            "name": "createRichMessage",
            "signature": "createRichMessage(request: CreateRichMessageRequest): OutboundMessage",
            "description": "MessageFactory.createRichMessage runs the create rich message path defined for MessageFactory.",
            "parameters": [
              {
                "name": "request",
                "type": "CreateRichMessageRequest",
                "description": "Request payload for MessageFactory.createRichMessage: CreateRichMessageRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "OutboundMessage",
              "description": "MessageFactory.createRichMessage returns an OutboundMessage."
            }
          },
          {
            "name": "createCustomPayloadMessage",
            "signature": "createCustomPayloadMessage(request: CreateCustomPayloadMessageRequest): OutboundMessage",
            "description": "MessageFactory.createCustomPayloadMessage runs the create custom payload message path defined for MessageFactory.",
            "parameters": [
              {
                "name": "request",
                "type": "CreateCustomPayloadMessageRequest",
                "description": "Request payload for MessageFactory.createCustomPayloadMessage: CreateCustomPayloadMessageRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "OutboundMessage",
              "description": "MessageFactory.createCustomPayloadMessage returns an OutboundMessage."
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
        "purpose": "CreateTextMessageRequest carries the request payload for create text message calls.",
        "usage": "Use CreateTextMessageRequest when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
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
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for create text message request.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for create text message request.",
            "required": true
          },
          {
            "name": "text",
            "type": "string",
            "description": "Plain text sent by the user, rendered by a response, or emitted in a message for create text message request.",
            "required": true
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Channel name associated with the conversation, input, message, or render pass for create text message request.",
            "required": false
          },
          {
            "name": "responseId",
            "type": "string",
            "description": "Identifier that links create text message request to the response record it references.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on create text message request for adapters, analytics, audits, or tests.",
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
        "purpose": "CreateRichMessageRequest carries the request payload for create rich message calls.",
        "usage": "Use CreateRichMessageRequest when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
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
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for create rich message request.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for create rich message request.",
            "required": true
          },
          {
            "name": "content",
            "type": "Omit<RichOutboundContent, \"type\">",
            "description": "Content value on create rich message request; TypeScript expects an Omit<RichOutboundContent, \"type\">.",
            "required": true
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Channel name associated with the conversation, input, message, or render pass for create rich message request.",
            "required": false
          },
          {
            "name": "responseId",
            "type": "string",
            "description": "Identifier that links create rich message request to the response record it references.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on create rich message request for adapters, analytics, audits, or tests.",
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
        "purpose": "CreateCustomPayloadMessageRequest carries the request payload for create custom payload message calls.",
        "usage": "Use CreateCustomPayloadMessageRequest when plugging custom resolvers, validators, renderers, handlers, mappers, factories, or registries into the runtime.",
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
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for create custom payload message request.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for create custom payload message request.",
            "required": true
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Structured payload carried by events, choices, messages, or custom content for create custom payload message request.",
            "required": true
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Channel name associated with the conversation, input, message, or render pass for create custom payload message request.",
            "required": false
          },
          {
            "name": "responseId",
            "type": "string",
            "description": "Identifier that links create custom payload message request to the response record it references.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on create custom payload message request for adapters, analytics, audits, or tests.",
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
        "purpose": "FlowValidator validates flow values or model objects and returns structured findings.",
        "usage": "Use FlowValidator in authoring tools, CI, and publish workflows that need explicit validation evidence.",
        "signatures": [
          "export interface FlowValidator {\n    validate(flow: ConversationFlowDefinition, options?: FlowValidationOptions): ValidationIssue[];\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(flow: ConversationFlowDefinition, options?: FlowValidationOptions): ValidationIssue[]",
            "description": "Validates a flow, step, operation, value, or model object for FlowValidator.",
            "parameters": [
              {
                "name": "flow",
                "type": "ConversationFlowDefinition",
                "description": "Flow parameter for FlowValidator.validate: ConversationFlowDefinition.",
                "required": true
              },
              {
                "name": "options",
                "type": "FlowValidationOptions",
                "description": "Options parameter for FlowValidator.validate: FlowValidationOptions.",
                "required": false
              }
            ],
            "returns": {
              "type": "ValidationIssue[]",
              "description": "FlowValidator.validate returns a ValidationIssue[]."
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
        "purpose": "FlowValidationOptions carries registered step types, registered operation types, registered custom operation types, registered normalizer types, registered extractor types, and registered validator types for validation and inspection.",
        "usage": "Use FlowValidationOptions in authoring tools, CI, and publish workflows that need explicit validation evidence.",
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
            "description": "Custom step types known to validation for flow validation options.",
            "required": false
          },
          {
            "name": "registeredOperationTypes",
            "type": "readonly string[]",
            "description": "Custom operation types known to validation for flow validation options; applies within FlowValidationOptions registeredOperationTypes.",
            "required": false
          },
          {
            "name": "registeredCustomOperationTypes",
            "type": "readonly string[]",
            "description": "Custom operation types known to validation for flow validation options; applies within FlowValidationOptions registeredCustomOperationTypes.",
            "required": false
          },
          {
            "name": "registeredNormalizerTypes",
            "type": "readonly string[]",
            "description": "Normalizer types known to validation for flow validation options.",
            "required": false
          },
          {
            "name": "registeredExtractorTypes",
            "type": "readonly string[]",
            "description": "Extractor types known to validation for flow validation options.",
            "required": false
          },
          {
            "name": "registeredValidatorTypes",
            "type": "readonly string[]",
            "description": "Validator types known to validation for flow validation options.",
            "required": false
          }
        ],
        "related": []
      },
      {
        "name": "ModelValidator",
        "kind": "interface",
        "purpose": "ModelValidator validates model values or model objects and returns structured findings.",
        "usage": "Use ModelValidator in authoring tools, CI, and publish workflows that need explicit validation evidence.",
        "signatures": [
          "export interface ModelValidator {\n    validateFlowVersion(flowVersion: FlowVersion, context: ModelValidationContext): ModelValidationReport;\n}"
        ],
        "methods": [
          {
            "name": "validateFlowVersion",
            "signature": "validateFlowVersion(flowVersion: FlowVersion, context: ModelValidationContext): ModelValidationReport",
            "description": "Validates one flow version object and its definition for ModelValidator.",
            "parameters": [
              {
                "name": "flowVersion",
                "type": "FlowVersion",
                "description": "Flow version active in the current context passed to ModelValidator.validateFlowVersion.",
                "required": true
              },
              {
                "name": "context",
                "type": "ModelValidationContext",
                "description": "Runtime context for ModelValidator.validateFlowVersion, using ModelValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "ModelValidationReport",
              "description": "ModelValidator.validateFlowVersion returns a ModelValidationReport."
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
        "purpose": "ModelValidationContext packages the runtime objects passed into model validation implementations.",
        "usage": "Use ModelValidationContext in authoring tools, CI, and publish workflows that need explicit validation evidence.",
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
            "description": "Custom step types known to validation for model validation context.",
            "required": true
          },
          {
            "name": "registeredOperationTypes",
            "type": "readonly string[]",
            "description": "Custom operation types known to validation for model validation context; applies within ModelValidationContext registeredOperationTypes.",
            "required": true
          },
          {
            "name": "registeredActionKinds",
            "type": "readonly string[]",
            "description": "Action kinds known to validation for model validation context.",
            "required": false
          },
          {
            "name": "registeredCustomOperationTypes",
            "type": "readonly string[]",
            "description": "Custom operation types known to validation for model validation context; applies within ModelValidationContext registeredCustomOperationTypes.",
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
        "purpose": "ModelValidationReport collects validation findings and status for model validation.",
        "usage": "Use ModelValidationReport in authoring tools, CI, and publish workflows that need explicit validation evidence.",
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
            "description": "Overall validation result for model validation report.",
            "required": true
          },
          {
            "name": "errors",
            "type": "ValidationIssue[]",
            "description": "Validation or model errors captured by this contract for model validation report.",
            "required": true
          },
          {
            "name": "warnings",
            "type": "ValidationIssue[]",
            "description": "Non-blocking validation findings for model validation report.",
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
        "purpose": "FlowInspector carries get step, get variable, get action, get response, and list reachable steps for validation and inspection.",
        "usage": "Use FlowInspector in authoring tools, CI, and publish workflows that need explicit validation evidence.",
        "signatures": [
          "export interface FlowInspector {\n    getStep(flow: ConversationFlowDefinition, stepId: StepId): StepDefinition | undefined;\n    getVariable(flow: ConversationFlowDefinition, variableId: VariableId): VariableDefinition | undefined;\n    getAction(flow: ConversationFlowDefinition, actionId: ActionId): ActionDefinition | undefined;\n    getResponse(flow: ConversationFlowDefinition, responseId: ResponseId): ResponseDefinition | undefined;\n    listReachableSteps(flow: ConversationFlowDefinition): StepId[];\n}"
        ],
        "methods": [
          {
            "name": "getStep",
            "signature": "getStep(flow: ConversationFlowDefinition, stepId: StepId): StepDefinition | undefined",
            "description": "Retrieves a step definition by id for FlowInspector.",
            "parameters": [
              {
                "name": "flow",
                "type": "ConversationFlowDefinition",
                "description": "Flow parameter for FlowInspector.getStep: ConversationFlowDefinition.",
                "required": true
              },
              {
                "name": "stepId",
                "type": "StepId",
                "description": "Identifier used by FlowInspector.getStep to locate the step record.",
                "required": true
              }
            ],
            "returns": {
              "type": "StepDefinition | undefined",
              "description": "FlowInspector.getStep returns a StepDefinition | undefined."
            }
          },
          {
            "name": "getVariable",
            "signature": "getVariable(flow: ConversationFlowDefinition, variableId: VariableId): VariableDefinition | undefined",
            "description": "FlowInspector.getVariable runs the get variable path defined for FlowInspector.",
            "parameters": [
              {
                "name": "flow",
                "type": "ConversationFlowDefinition",
                "description": "Flow parameter for FlowInspector.getVariable: ConversationFlowDefinition.",
                "required": true
              },
              {
                "name": "variableId",
                "type": "VariableId",
                "description": "Identifier used by FlowInspector.getVariable to locate the variable record.",
                "required": true
              }
            ],
            "returns": {
              "type": "VariableDefinition | undefined",
              "description": "FlowInspector.getVariable returns a VariableDefinition | undefined."
            }
          },
          {
            "name": "getAction",
            "signature": "getAction(flow: ConversationFlowDefinition, actionId: ActionId): ActionDefinition | undefined",
            "description": "Retrieves an action definition by id for FlowInspector.",
            "parameters": [
              {
                "name": "flow",
                "type": "ConversationFlowDefinition",
                "description": "Flow parameter for FlowInspector.getAction: ConversationFlowDefinition.",
                "required": true
              },
              {
                "name": "actionId",
                "type": "ActionId",
                "description": "Identifier used by FlowInspector.getAction to locate the action record.",
                "required": true
              }
            ],
            "returns": {
              "type": "ActionDefinition | undefined",
              "description": "FlowInspector.getAction returns an ActionDefinition | undefined."
            }
          },
          {
            "name": "getResponse",
            "signature": "getResponse(flow: ConversationFlowDefinition, responseId: ResponseId): ResponseDefinition | undefined",
            "description": "Retrieves a reusable response definition by id for FlowInspector.",
            "parameters": [
              {
                "name": "flow",
                "type": "ConversationFlowDefinition",
                "description": "Flow parameter for FlowInspector.getResponse: ConversationFlowDefinition.",
                "required": true
              },
              {
                "name": "responseId",
                "type": "ResponseId",
                "description": "Identifier used by FlowInspector.getResponse to locate the response record.",
                "required": true
              }
            ],
            "returns": {
              "type": "ResponseDefinition | undefined",
              "description": "FlowInspector.getResponse returns a ResponseDefinition | undefined."
            }
          },
          {
            "name": "listReachableSteps",
            "signature": "listReachableSteps(flow: ConversationFlowDefinition): StepId[]",
            "description": "FlowInspector.listReachableSteps runs the list reachable steps path defined for FlowInspector.",
            "parameters": [
              {
                "name": "flow",
                "type": "ConversationFlowDefinition",
                "description": "Flow parameter for FlowInspector.listReachableSteps: ConversationFlowDefinition.",
                "required": true
              }
            ],
            "returns": {
              "type": "StepId[]",
              "description": "FlowInspector.listReachableSteps returns a StepId[]."
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
        "purpose": "FlowVersionFactory creates flow version objects with runtime ids and timestamps.",
        "usage": "Use FlowVersionFactory in authoring tools, CI, and publish workflows that need explicit validation evidence.",
        "signatures": [
          "export interface FlowVersionFactory {\n    createVersion(request: CreateFlowVersionRequest): Promise<FlowVersion>;\n}"
        ],
        "methods": [
          {
            "name": "createVersion",
            "signature": "createVersion(request: CreateFlowVersionRequest): Promise<FlowVersion>",
            "description": "Creates a FlowVersion object from a request for FlowVersionFactory.",
            "parameters": [
              {
                "name": "request",
                "type": "CreateFlowVersionRequest",
                "description": "Request payload for FlowVersionFactory.createVersion: CreateFlowVersionRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<FlowVersion>",
              "description": "FlowVersionFactory.createVersion resolves with FlowVersion."
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
        "purpose": "CreateFlowVersionRequest carries the request payload for create flow version calls.",
        "usage": "Use CreateFlowVersionRequest in authoring tools, CI, and publish workflows that need explicit validation evidence.",
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
            "description": "Flow value on create flow version request; TypeScript expects a ConversationFlowDefinition.",
            "required": true
          },
          {
            "name": "version",
            "type": "string",
            "description": "Author-facing version label for release and migration tracking for create flow version request.",
            "required": true
          },
          {
            "name": "schemaVersion",
            "type": "string",
            "description": "Model schema revision expected by validators and authoring tools for create flow version request.",
            "required": true
          },
          {
            "name": "createdBy",
            "type": "string",
            "description": "Created by value on create flow version request; TypeScript expects a string.",
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
        "purpose": "FlowValidationReport collects validation findings and status for flow validation.",
        "usage": "Use FlowValidationReport in authoring tools, CI, and publish workflows that need explicit validation evidence.",
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
            "description": "Overall validation result for flow validation report.",
            "required": true
          },
          {
            "name": "issues",
            "type": "ValidationIssue[]",
            "description": "Collection of ValidationIssue values carried by flow validation report.",
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
        "purpose": "StepValidationReport collects validation findings and status for step validation.",
        "usage": "Use StepValidationReport in authoring tools, CI, and publish workflows that need explicit validation evidence.",
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
            "description": "Step identifier targeted by state, routes, traces, and execution context for step validation report.",
            "required": true
          },
          {
            "name": "valid",
            "type": "boolean",
            "description": "Overall validation result for step validation report.",
            "required": true
          },
          {
            "name": "issues",
            "type": "ValidationIssue[]",
            "description": "Collection of ValidationIssue values carried by step validation report.",
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
        "purpose": "OperationValidationReport collects validation findings and status for operation validation.",
        "usage": "Use OperationValidationReport in authoring tools, CI, and publish workflows that need explicit validation evidence.",
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
            "description": "Operation identifier recorded in traces and variable history for operation validation report.",
            "required": false
          },
          {
            "name": "valid",
            "type": "boolean",
            "description": "Overall validation result for operation validation report.",
            "required": true
          },
          {
            "name": "issues",
            "type": "ValidationIssue[]",
            "description": "Collection of ValidationIssue values carried by operation validation report.",
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
        "purpose": "FlowVersionRepository is the persistence port for flow version records.",
        "usage": "Use FlowVersionRepository to implement durable storage for flow versions, conversations, states, events, and traces.",
        "signatures": [
          "export interface FlowVersionRepository {\n    getById(flowVersionId: FlowVersionId): Promise<FlowVersion | undefined>;\n    save(version: FlowVersion): Promise<void>;\n}"
        ],
        "methods": [
          {
            "name": "getById",
            "signature": "getById(flowVersionId: FlowVersionId): Promise<FlowVersion | undefined>",
            "description": "Loads one persisted record by id for FlowVersionRepository.",
            "parameters": [
              {
                "name": "flowVersionId",
                "type": "FlowVersionId",
                "description": "Identifier used by FlowVersionRepository.getById to locate the flow version record.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<FlowVersion | undefined>",
              "description": "FlowVersionRepository.getById resolves with FlowVersion | undefined."
            }
          },
          {
            "name": "save",
            "signature": "save(version: FlowVersion): Promise<void>",
            "description": "Persists a runtime record for FlowVersionRepository.",
            "parameters": [
              {
                "name": "version",
                "type": "FlowVersion",
                "description": "Author-facing version label for release and migration tracking passed to FlowVersionRepository.save.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "FlowVersionRepository.save resolves with void."
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
        "purpose": "ConversationRepository is the persistence port for conversation records.",
        "usage": "Use ConversationRepository to implement durable storage for flow versions, conversations, states, events, and traces.",
        "signatures": [
          "export interface ConversationRepository {\n    getById(conversationId: ConversationId): Promise<Conversation | undefined>;\n    save(conversation: Conversation): Promise<void>;\n}"
        ],
        "methods": [
          {
            "name": "getById",
            "signature": "getById(conversationId: ConversationId): Promise<Conversation | undefined>",
            "description": "Loads one persisted record by id for ConversationRepository.",
            "parameters": [
              {
                "name": "conversationId",
                "type": "ConversationId",
                "description": "Identifier used by ConversationRepository.getById to locate the conversation record.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<Conversation | undefined>",
              "description": "ConversationRepository.getById resolves with Conversation | undefined."
            }
          },
          {
            "name": "save",
            "signature": "save(conversation: Conversation): Promise<void>",
            "description": "Persists a runtime record for ConversationRepository.",
            "parameters": [
              {
                "name": "conversation",
                "type": "Conversation",
                "description": "Conversation record active in the current context passed to ConversationRepository.save.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "ConversationRepository.save resolves with void."
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
        "purpose": "ConversationStateRepository is the persistence port for conversation state records.",
        "usage": "Use ConversationStateRepository to implement durable storage for flow versions, conversations, states, events, and traces.",
        "signatures": [
          "export interface ConversationStateRepository {\n    getByConversationId(conversationId: ConversationId): Promise<ConversationState | undefined>;\n    save(state: ConversationState): Promise<void>;\n}"
        ],
        "methods": [
          {
            "name": "getByConversationId",
            "signature": "getByConversationId(conversationId: ConversationId): Promise<ConversationState | undefined>",
            "description": "Loads state for one conversation for ConversationStateRepository.",
            "parameters": [
              {
                "name": "conversationId",
                "type": "ConversationId",
                "description": "Identifier used by ConversationStateRepository.getByConversationId to locate the conversation record.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationState | undefined>",
              "description": "ConversationStateRepository.getByConversationId resolves with ConversationState | undefined."
            }
          },
          {
            "name": "save",
            "signature": "save(state: ConversationState): Promise<void>",
            "description": "Persists a runtime record for ConversationStateRepository.",
            "parameters": [
              {
                "name": "state",
                "type": "ConversationState",
                "description": "Conversation state active in the current context passed to ConversationStateRepository.save.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "ConversationStateRepository.save resolves with void."
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
        "purpose": "ConversationEventRepository is the persistence port for conversation event records.",
        "usage": "Use ConversationEventRepository to implement durable storage for flow versions, conversations, states, events, and traces.",
        "signatures": [
          "export interface ConversationEventRepository {\n    append(events: ConversationEvent[]): Promise<void>;\n    listByConversationId(conversationId: ConversationId): Promise<ConversationEvent[]>;\n}"
        ],
        "methods": [
          {
            "name": "append",
            "signature": "append(events: ConversationEvent[]): Promise<void>",
            "description": "Appends event records without replacing existing events for ConversationEventRepository.",
            "parameters": [
              {
                "name": "events",
                "type": "ConversationEvent[]",
                "description": "Events emitted and committed during the turn passed to ConversationEventRepository.append.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "ConversationEventRepository.append resolves with void."
            }
          },
          {
            "name": "listByConversationId",
            "signature": "listByConversationId(conversationId: ConversationId): Promise<ConversationEvent[]>",
            "description": "Lists persisted records for one conversation for ConversationEventRepository.",
            "parameters": [
              {
                "name": "conversationId",
                "type": "ConversationId",
                "description": "Identifier used by ConversationEventRepository.listByConversationId to locate the conversation record.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationEvent[]>",
              "description": "ConversationEventRepository.listByConversationId resolves with ConversationEvent[]."
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
        "purpose": "DecisionTraceRepository is the persistence port for decision trace records.",
        "usage": "Use DecisionTraceRepository to implement durable storage for flow versions, conversations, states, events, and traces.",
        "signatures": [
          "export interface DecisionTraceRepository {\n    save(trace: DecisionTrace): Promise<void>;\n    listByConversationId(conversationId: ConversationId): Promise<DecisionTrace[]>;\n}"
        ],
        "methods": [
          {
            "name": "save",
            "signature": "save(trace: DecisionTrace): Promise<void>",
            "description": "Persists a runtime record for DecisionTraceRepository.",
            "parameters": [
              {
                "name": "trace",
                "type": "DecisionTrace",
                "description": "Trace parameter for DecisionTraceRepository.save: DecisionTrace.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "DecisionTraceRepository.save resolves with void."
            }
          },
          {
            "name": "listByConversationId",
            "signature": "listByConversationId(conversationId: ConversationId): Promise<DecisionTrace[]>",
            "description": "Lists persisted records for one conversation for DecisionTraceRepository.",
            "parameters": [
              {
                "name": "conversationId",
                "type": "ConversationId",
                "description": "Identifier used by DecisionTraceRepository.listByConversationId to locate the conversation record.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<DecisionTrace[]>",
              "description": "DecisionTraceRepository.listByConversationId resolves with DecisionTrace[]."
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
        "purpose": "ConversationEngine carries start conversation, process user input, process external event, and subscribe to events for engine and api adapter.",
        "usage": "Use ConversationEngine at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
        "signatures": [
          "export interface ConversationEngine {\n    startConversation(request: StartConversationRequest): Promise<ProcessTurnResult>;\n    processUserInput(request: ProcessUserInputRequest): Promise<ProcessTurnResult>;\n    processExternalEvent(request: ProcessExternalEventRequest): Promise<ProcessTurnResult>;\n    subscribeToEvents(subscriber: ConversationEventSubscriber): ConversationEventSubscription;\n}"
        ],
        "methods": [
          {
            "name": "startConversation",
            "signature": "startConversation(request: StartConversationRequest): Promise<ProcessTurnResult>",
            "description": "Creates the conversation and initial state, applies initial variables, runs automatic steps, and returns the first committed turn.",
            "parameters": [
              {
                "name": "request",
                "type": "StartConversationRequest",
                "description": "Request payload for ConversationEngine.startConversation: StartConversationRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ProcessTurnResult>",
              "description": "ConversationEngine.startConversation resolves with ProcessTurnResult."
            }
          },
          {
            "name": "processUserInput",
            "signature": "processUserInput(request: ProcessUserInputRequest): Promise<ProcessTurnResult>",
            "description": "Processes one user input against the pending step, updates variables and state, emits events, and returns the committed turn.",
            "parameters": [
              {
                "name": "request",
                "type": "ProcessUserInputRequest",
                "description": "Request payload for ConversationEngine.processUserInput: ProcessUserInputRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ProcessTurnResult>",
              "description": "ConversationEngine.processUserInput resolves with ProcessTurnResult."
            }
          },
          {
            "name": "processExternalEvent",
            "signature": "processExternalEvent(request: ProcessExternalEventRequest): Promise<ProcessTurnResult>",
            "description": "Converts an external event into runtime input and processes it through the same turn pipeline as user messages.",
            "parameters": [
              {
                "name": "request",
                "type": "ProcessExternalEventRequest",
                "description": "Request payload for ConversationEngine.processExternalEvent: ProcessExternalEventRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ProcessTurnResult>",
              "description": "ConversationEngine.processExternalEvent resolves with ProcessTurnResult."
            }
          },
          {
            "name": "subscribeToEvents",
            "signature": "subscribeToEvents(subscriber: ConversationEventSubscriber): ConversationEventSubscription",
            "description": "Registers a callback that receives persisted event envelopes after each committed turn.",
            "parameters": [
              {
                "name": "subscriber",
                "type": "ConversationEventSubscriber",
                "description": "Subscriber parameter for ConversationEngine.subscribeToEvents: ConversationEventSubscriber.",
                "required": true
              }
            ],
            "returns": {
              "type": "ConversationEventSubscription",
              "description": "ConversationEngine.subscribeToEvents returns a ConversationEventSubscription."
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
        "purpose": "StartConversationRequest carries the request payload for start conversation calls.",
        "usage": "Use StartConversationRequest at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
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
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for start conversation request.",
            "required": true
          },
          {
            "name": "flowVersionId",
            "type": "string",
            "description": "Specific flow version selected for loading, state, traces, and start requests for start conversation request.",
            "required": true
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Channel name associated with the conversation, input, message, or render pass for start conversation request.",
            "required": false
          },
          {
            "name": "userId",
            "type": "string",
            "description": "Application user identifier associated with a conversation for start conversation request.",
            "required": false
          },
          {
            "name": "initialVariables",
            "type": "Record<string, unknown> | Partial<Record<VariableScope, Record<string, unknown>>>",
            "description": "Variables supplied before a conversation or child flow starts for start conversation request.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on start conversation request for adapters, analytics, audits, or tests.",
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
        "purpose": "ProcessUserInputRequest carries the request payload for process user input calls.",
        "usage": "Use ProcessUserInputRequest at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
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
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for process user input request.",
            "required": true
          },
          {
            "name": "input",
            "type": "UserInput",
            "description": "User input, binding source, or operation payload handled by this contract for process user input request.",
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
        "purpose": "ProcessExternalEventRequest carries the request payload for process external event calls.",
        "usage": "Use ProcessExternalEventRequest at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
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
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for process external event request.",
            "required": true
          },
          {
            "name": "event",
            "type": "EventUserInput",
            "description": "Event value on process external event request; TypeScript expects an EventUserInput.",
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
        "purpose": "ProcessTurnResult captures the outcome, variables, trace data, and errors from process turn.",
        "usage": "Use ProcessTurnResult at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
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
            "description": "Conversation record active in the current context for process turn result.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Conversation state active in the current context for process turn result.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Turn active in the current context for process turn result.",
            "required": true
          },
          {
            "name": "events",
            "type": "ConversationEvent[]",
            "description": "Events emitted and committed during the turn for process turn result.",
            "required": true
          },
          {
            "name": "messages",
            "type": "OutboundMessage[]",
            "description": "Outbound response plans or message DTOs produced during a turn for process turn result.",
            "required": true
          },
          {
            "name": "trace",
            "type": "DecisionTrace",
            "description": "Trace value on process turn result; TypeScript expects a DecisionTrace.",
            "required": true
          },
          {
            "name": "error",
            "type": "RuntimeError",
            "description": "Error value on process turn result; TypeScript expects a RuntimeError.",
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
        "purpose": "ConversationEventEnvelope carries event, and result for engine and api adapter.",
        "usage": "Use ConversationEventEnvelope at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
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
            "description": "Event value on conversation event envelope; TypeScript expects a ConversationEvent.",
            "required": true
          },
          {
            "name": "result",
            "type": "ProcessTurnResult",
            "description": "Result value on conversation event envelope; TypeScript expects a ProcessTurnResult.",
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
        "purpose": "ConversationEventSubscriber carries the value shape shown in its signature for engine and api adapter.",
        "usage": "Use ConversationEventSubscriber at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for conversation event subscriber.",
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
        "purpose": "ConversationEventSubscription carries unsubscribe for engine and api adapter.",
        "usage": "Use ConversationEventSubscription at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
        "signatures": [
          "export interface ConversationEventSubscription {\n    unsubscribe(): void;\n}"
        ],
        "methods": [
          {
            "name": "unsubscribe",
            "signature": "unsubscribe(): void",
            "description": "ConversationEventSubscription.unsubscribe runs the unsubscribe path defined for ConversationEventSubscription.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "No arguments are accepted by ConversationEventSubscription.unsubscribe; call it with an empty parameter list.",
                "required": false
              }
            ],
            "returns": {
              "type": "void",
              "description": "ConversationEventSubscription.unsubscribe completes after applying its side effect and returns no payload."
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
        "purpose": "ConversationApi carries engine, start, send message, select option, send attachments, and send event for engine and api adapter.",
        "usage": "Use ConversationApi at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
        "signatures": [
          "export interface ConversationApi {\n    readonly engine: ConversationEngine;\n    start(request: ConversationApiStartRequest): Promise<ConversationApiHttpResponse>;\n    sendMessage(request: ConversationApiTextRequest): Promise<ConversationApiHttpResponse>;\n    selectOption(request: ConversationApiChoiceRequest): Promise<ConversationApiHttpResponse>;\n    sendAttachments(request: ConversationApiAttachmentRequest): Promise<ConversationApiHttpResponse>;\n    sendEvent(request: ConversationApiEventRequest): Promise<ConversationApiHttpResponse>;\n    toHttpResponse(result: ProcessTurnResult): ConversationApiHttpResponse;\n    subscribeToEvents(subscriber: ConversationEventSubscriber): ConversationEventSubscription;\n}"
        ],
        "methods": [
          {
            "name": "start",
            "signature": "start(request: ConversationApiStartRequest): Promise<ConversationApiHttpResponse>",
            "description": "Starts a conversation and returns a statusCode/body DTO suitable for an HTTP response.",
            "parameters": [
              {
                "name": "request",
                "type": "ConversationApiStartRequest",
                "description": "Request payload for ConversationApi.start: ConversationApiStartRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationApiHttpResponse>",
              "description": "ConversationApi.start resolves with ConversationApiHttpResponse."
            }
          },
          {
            "name": "sendMessage",
            "signature": "sendMessage(request: ConversationApiTextRequest): Promise<ConversationApiHttpResponse>",
            "description": "Submits text input to a waiting conversation and converts the engine result into the API response body.",
            "parameters": [
              {
                "name": "request",
                "type": "ConversationApiTextRequest",
                "description": "Request payload for ConversationApi.sendMessage: ConversationApiTextRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationApiHttpResponse>",
              "description": "ConversationApi.sendMessage resolves with ConversationApiHttpResponse."
            }
          },
          {
            "name": "selectOption",
            "signature": "selectOption(request: ConversationApiChoiceRequest): Promise<ConversationApiHttpResponse>",
            "description": "Submits a menu selection or choice payload and returns the normalized API response.",
            "parameters": [
              {
                "name": "request",
                "type": "ConversationApiChoiceRequest",
                "description": "Request payload for ConversationApi.selectOption: ConversationApiChoiceRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationApiHttpResponse>",
              "description": "ConversationApi.selectOption resolves with ConversationApiHttpResponse."
            }
          },
          {
            "name": "sendAttachments",
            "signature": "sendAttachments(request: ConversationApiAttachmentRequest): Promise<ConversationApiHttpResponse>",
            "description": "Submits one attachment turn and returns messages, variables, events, and trace in the adapter body.",
            "parameters": [
              {
                "name": "request",
                "type": "ConversationApiAttachmentRequest",
                "description": "Request payload for ConversationApi.sendAttachments: ConversationApiAttachmentRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationApiHttpResponse>",
              "description": "ConversationApi.sendAttachments resolves with ConversationApiHttpResponse."
            }
          },
          {
            "name": "sendEvent",
            "signature": "sendEvent(request: ConversationApiEventRequest): Promise<ConversationApiHttpResponse>",
            "description": "Submits an external event as input and returns the adapter response for the resulting turn.",
            "parameters": [
              {
                "name": "request",
                "type": "ConversationApiEventRequest",
                "description": "Request payload for ConversationApi.sendEvent: ConversationApiEventRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationApiHttpResponse>",
              "description": "ConversationApi.sendEvent resolves with ConversationApiHttpResponse."
            }
          },
          {
            "name": "toHttpResponse",
            "signature": "toHttpResponse(result: ProcessTurnResult): ConversationApiHttpResponse",
            "description": "Maps a raw ProcessTurnResult to the adapter statusCode/body format without processing another turn.",
            "parameters": [
              {
                "name": "result",
                "type": "ProcessTurnResult",
                "description": "Result payload consumed by ConversationApi.toHttpResponse: ProcessTurnResult.",
                "required": true
              }
            ],
            "returns": {
              "type": "ConversationApiHttpResponse",
              "description": "Adapter response from ConversationApi.toHttpResponse with statusCode, ok flag, messages, choices, variables, events, trace, and optional error."
            }
          },
          {
            "name": "subscribeToEvents",
            "signature": "subscribeToEvents(subscriber: ConversationEventSubscriber): ConversationEventSubscription",
            "description": "Forwards event subscription registration to the engine used by this API adapter.",
            "parameters": [
              {
                "name": "subscriber",
                "type": "ConversationEventSubscriber",
                "description": "Subscriber parameter for ConversationApi.subscribeToEvents: ConversationEventSubscriber.",
                "required": true
              }
            ],
            "returns": {
              "type": "ConversationEventSubscription",
              "description": "ConversationApi.subscribeToEvents returns a ConversationEventSubscription."
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
            "description": "Engine value on conversation api; TypeScript expects a ConversationEngine.",
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
        "purpose": "ConversationApiStartRequest aliases the conversation api start request value shape used by engine and api adapter integrations.",
        "usage": "Use ConversationApiStartRequest at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for conversation api start request.",
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
        "purpose": "ConversationApiTextRequest carries the request payload for conversation api text calls.",
        "usage": "Use ConversationApiTextRequest at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
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
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for conversation api text request.",
            "required": true
          },
          {
            "name": "text",
            "type": "string",
            "description": "Plain text sent by the user, rendered by a response, or emitted in a message for conversation api text request.",
            "required": true
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "Input identifier used to trace a user message, choice, attachment, or event for conversation api text request.",
            "required": false
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for conversation api text request.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Channel name associated with the conversation, input, message, or render pass for conversation api text request.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "Timestamp when the adapter or channel received input for conversation api text request.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on conversation api text request for adapters, analytics, audits, or tests.",
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
        "purpose": "ConversationApiChoiceRequest carries the request payload for conversation api choice calls.",
        "usage": "Use ConversationApiChoiceRequest at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
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
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for conversation api choice request.",
            "required": true
          },
          {
            "name": "optionId",
            "type": "string",
            "description": "Menu option identifier used for choices and branch matches for conversation api choice request.",
            "required": false
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for conversation api choice request in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Structured payload carried by events, choices, messages, or custom content for conversation api choice request.",
            "required": false
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "Input identifier used to trace a user message, choice, attachment, or event for conversation api choice request.",
            "required": false
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for conversation api choice request.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Channel name associated with the conversation, input, message, or render pass for conversation api choice request.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "Timestamp when the adapter or channel received input for conversation api choice request.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on conversation api choice request for adapters, analytics, audits, or tests.",
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
        "purpose": "ConversationApiAttachmentRequest carries the request payload for conversation api attachment calls.",
        "usage": "Use ConversationApiAttachmentRequest at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
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
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for conversation api attachment request.",
            "required": true
          },
          {
            "name": "attachments",
            "type": "AttachmentInput[]",
            "description": "Attachment list supplied by input or message content for conversation api attachment request.",
            "required": true
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "Input identifier used to trace a user message, choice, attachment, or event for conversation api attachment request.",
            "required": false
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for conversation api attachment request.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Channel name associated with the conversation, input, message, or render pass for conversation api attachment request.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "Timestamp when the adapter or channel received input for conversation api attachment request.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on conversation api attachment request for adapters, analytics, audits, or tests.",
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
        "purpose": "ConversationApiEventRequest carries the request payload for conversation api event calls.",
        "usage": "Use ConversationApiEventRequest at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
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
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for conversation api event request.",
            "required": true
          },
          {
            "name": "eventType",
            "type": "string",
            "description": "Event name emitted by an input or operation for conversation api event request.",
            "required": true
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Structured payload carried by events, choices, messages, or custom content for conversation api event request.",
            "required": false
          },
          {
            "name": "inputId",
            "type": "string",
            "description": "Input identifier used to trace a user message, choice, attachment, or event for conversation api event request.",
            "required": false
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for conversation api event request.",
            "required": false
          },
          {
            "name": "channel",
            "type": "string",
            "description": "Channel name associated with the conversation, input, message, or render pass for conversation api event request.",
            "required": false
          },
          {
            "name": "receivedAt",
            "type": "string",
            "description": "Timestamp when the adapter or channel received input for conversation api event request.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on conversation api event request for adapters, analytics, audits, or tests.",
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
        "purpose": "ConversationApiHttpResponse wraps adapter body data with the HTTP status selected from the engine result.",
        "usage": "Use ConversationApiHttpResponse at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
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
            "description": "Status code value on conversation api http response; TypeScript expects a number.",
            "required": true
          },
          {
            "name": "body",
            "type": "ConversationApiResponseBody",
            "description": "Body value on conversation api http response; TypeScript expects a ConversationApiResponseBody.",
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
        "purpose": "ConversationApiResponseBody is the response body returned by the API adapter for conversation api.",
        "usage": "Use ConversationApiResponseBody at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
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
            "description": "Ok value on conversation api response body; TypeScript expects a boolean.",
            "required": true
          },
          {
            "name": "conversationId",
            "type": "string",
            "description": "Conversation identifier linking state, events, traces, turns, inputs, and messages for conversation api response body.",
            "required": true
          },
          {
            "name": "turnId",
            "type": "string",
            "description": "Turn identifier linking input, messages, events, state changes, and trace fragments for conversation api response body.",
            "required": true
          },
          {
            "name": "status",
            "type": "ConversationStatus",
            "description": "State value that drives routing, result handling, or lifecycle decisions for conversation api response body.",
            "required": true
          },
          {
            "name": "currentStepId",
            "type": "string",
            "description": "Step currently active after the latest transition for conversation api response body.",
            "required": true
          },
          {
            "name": "messages",
            "type": "ConversationApiMessage[]",
            "description": "Outbound response plans or message DTOs produced during a turn for conversation api response body.",
            "required": true
          },
          {
            "name": "choices",
            "type": "ConversationApiChoice[]",
            "description": "Collection of ConversationApiChoice values carried by conversation api response body.",
            "required": true
          },
          {
            "name": "variables",
            "type": "Record<string, ConversationApiVariable>",
            "description": "Declared variable catalog and current runtime values for conversation api response body.",
            "required": true
          },
          {
            "name": "events",
            "type": "ConversationEvent[]",
            "description": "Events emitted and committed during the turn for conversation api response body.",
            "required": true
          },
          {
            "name": "trace",
            "type": "DecisionTrace",
            "description": "Trace value on conversation api response body; TypeScript expects a DecisionTrace.",
            "required": true
          },
          {
            "name": "error",
            "type": "RuntimeError",
            "description": "Error value on conversation api response body; TypeScript expects a RuntimeError.",
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
        "purpose": "ConversationApiMessage carries message id, type, text, and payload for engine and api adapter.",
        "usage": "Use ConversationApiMessage at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
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
            "description": "Identifier that links conversation api message to the message record it references.",
            "required": true
          },
          {
            "name": "type",
            "type": "\"text\" | \"rich\" | \"custom_payload\"",
            "description": "Type discriminator that directs validation and runtime handling for conversation api message.",
            "required": true
          },
          {
            "name": "text",
            "type": "string",
            "description": "Plain text sent by the user, rendered by a response, or emitted in a message for conversation api message.",
            "required": false
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Structured payload carried by events, choices, messages, or custom content for conversation api message.",
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
        "purpose": "ConversationApiChoice carries option id, label, and payload for engine and api adapter.",
        "usage": "Use ConversationApiChoice at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
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
            "description": "Menu option identifier used for choices and branch matches for conversation api choice.",
            "required": true
          },
          {
            "name": "label",
            "type": "string",
            "description": "Short human label for conversation api choice in authoring tools, menus, reports, or API displays.",
            "required": true
          },
          {
            "name": "payload",
            "type": "JsonObject",
            "description": "Structured payload carried by events, choices, messages, or custom content for conversation api choice.",
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
        "purpose": "ConversationApiVariable carries scope, source, updated at, and metadata for engine and api adapter.",
        "usage": "Use ConversationApiVariable at integration boundaries that start conversations, submit input, expose responses, or subscribe to events.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for conversation api variable.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "Variable namespace used to separate conversation, flow, operation, and system values for conversation api variable.",
            "required": false
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Origin recorded for a variable write, trace fragment, event, or candidate for conversation api variable.",
            "required": false
          },
          {
            "name": "updatedAt",
            "type": "string",
            "description": "Timestamp for the last accepted write to the runtime value for conversation api variable.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on conversation api variable for adapters, analytics, audits, or tests.",
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
        "purpose": "TurnProcessor coordinates turn work for one runtime turn.",
        "usage": "Use TurnProcessor around the internal turn pipeline when testing or replacing lower-level execution services.",
        "signatures": [
          "export interface TurnProcessor {\n    startConversation(request: StartConversationRequest): Promise<ProcessTurnResult>;\n    processUserInput(request: ProcessUserInputRequest): Promise<ProcessTurnResult>;\n}"
        ],
        "methods": [
          {
            "name": "startConversation",
            "signature": "startConversation(request: StartConversationRequest): Promise<ProcessTurnResult>",
            "description": "Starts a conversation and runs automatic steps for TurnProcessor.",
            "parameters": [
              {
                "name": "request",
                "type": "StartConversationRequest",
                "description": "Request payload for TurnProcessor.startConversation: StartConversationRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ProcessTurnResult>",
              "description": "TurnProcessor.startConversation resolves with ProcessTurnResult."
            }
          },
          {
            "name": "processUserInput",
            "signature": "processUserInput(request: ProcessUserInputRequest): Promise<ProcessTurnResult>",
            "description": "Processes the next waiting-input turn for TurnProcessor.",
            "parameters": [
              {
                "name": "request",
                "type": "ProcessUserInputRequest",
                "description": "Request payload for TurnProcessor.processUserInput: ProcessUserInputRequest.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ProcessTurnResult>",
              "description": "TurnProcessor.processUserInput resolves with ProcessTurnResult."
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
        "purpose": "StepExecutor executes step work inside the runtime pipeline.",
        "usage": "Use StepExecutor around the internal turn pipeline when testing or replacing lower-level execution services.",
        "signatures": [
          "export interface StepExecutor {\n    enterStep(context: StepExecutionContext): Promise<StepResult>;\n    handleStepInput(context: StepExecutionContext, input: UserInput): Promise<StepResult>;\n}"
        ],
        "methods": [
          {
            "name": "enterStep",
            "signature": "enterStep(context: StepExecutionContext): Promise<StepResult>",
            "description": "Enters a step and runs its enter behavior for StepExecutor.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext",
                "description": "Runtime context for StepExecutor.enterStep, using StepExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "StepExecutor.enterStep resolves with StepResult."
            }
          },
          {
            "name": "handleStepInput",
            "signature": "handleStepInput(context: StepExecutionContext, input: UserInput): Promise<StepResult>",
            "description": "Handles input for the pending step for StepExecutor.",
            "parameters": [
              {
                "name": "context",
                "type": "StepExecutionContext",
                "description": "Runtime context for StepExecutor.handleStepInput, using StepExecutionContext data from the active turn.",
                "required": true
              },
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by StepExecutor.handleStepInput: UserInput.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<StepResult>",
              "description": "StepExecutor.handleStepInput resolves with StepResult."
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
        "purpose": "BranchExecutor executes branch work inside the runtime pipeline.",
        "usage": "Use BranchExecutor around the internal turn pipeline when testing or replacing lower-level execution services.",
        "signatures": [
          "export interface BranchExecutor {\n    execute(branch: StepBranch, context: BranchExecutionContext): Promise<BranchExecutionResult>;\n}"
        ],
        "methods": [
          {
            "name": "execute",
            "signature": "execute(branch: StepBranch, context: BranchExecutionContext): Promise<BranchExecutionResult>",
            "description": "Executes the handler or service behavior for BranchExecutor.",
            "parameters": [
              {
                "name": "branch",
                "type": "StepBranch",
                "description": "Branch executed when a match or option succeeds passed to BranchExecutor.execute.",
                "required": true
              },
              {
                "name": "context",
                "type": "BranchExecutionContext",
                "description": "Runtime context for BranchExecutor.execute, using BranchExecutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<BranchExecutionResult>",
              "description": "BranchExecutor.execute resolves with BranchExecutionResult."
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
        "purpose": "BranchExecutionContext packages the runtime objects passed into branch execution implementations.",
        "usage": "Use BranchExecutionContext around the internal turn pipeline when testing or replacing lower-level execution services.",
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
            "description": "Flow value on branch execution context; TypeScript expects a FlowVersion.",
            "required": true
          },
          {
            "name": "state",
            "type": "ConversationState",
            "description": "Conversation state active in the current context for branch execution context.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Turn active in the current context for branch execution context.",
            "required": true
          },
          {
            "name": "step",
            "type": "StepDefinition",
            "description": "Step value on branch execution context; TypeScript expects a StepDefinition.",
            "required": true
          },
          {
            "name": "services",
            "type": "RuntimeServices",
            "description": "Runtime services used to resolve input, render responses, execute operations, and build traces for branch execution context.",
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
        "purpose": "BranchExecutionResult captures the outcome, variables, trace data, and errors from branch execution.",
        "usage": "Use BranchExecutionResult around the internal turn pipeline when testing or replacing lower-level execution services.",
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
            "description": "Outbound response plans or message DTOs produced during a turn for branch execution result.",
            "required": true
          },
          {
            "name": "variablePatches",
            "type": "VariablePatch<string>[]",
            "description": "Variable patches applied during the turn for branch execution result.",
            "required": true
          },
          {
            "name": "events",
            "type": "ConversationEvent[]",
            "description": "Events emitted and committed during the turn for branch execution result.",
            "required": true
          },
          {
            "name": "target",
            "type": "StepTarget",
            "description": "Step or terminal target reached by a branch for branch execution result.",
            "required": false
          },
          {
            "name": "trace",
            "type": "TraceFragment[]",
            "description": "Collection of TraceFragment values carried by branch execution result.",
            "required": true
          },
          {
            "name": "error",
            "type": "RuntimeError",
            "description": "Error value on branch execution result; TypeScript expects a RuntimeError.",
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
        "purpose": "ConversationEngineConfig provides configuration read by the conversation engine runtime path.",
        "usage": "Use ConversationEngineConfig at engine construction time to supply limits, dependencies, clocks, ids, repositories, and capabilities.",
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
            "description": "Channel fallback applied when an input or conversation has no channel for conversation engine config.",
            "required": false
          },
          {
            "name": "defaultLocale",
            "type": "string",
            "description": "Locale fallback applied when a request or conversation does not provide one for conversation engine config.",
            "required": false
          },
          {
            "name": "maxTurnsPerConversation",
            "type": "number",
            "description": "Max turns per conversation value on conversation engine config; TypeScript expects a number.",
            "required": false
          },
          {
            "name": "maxStepExecutionsPerTurn",
            "type": "number",
            "description": "Guardrail that prevents automatic step loops during one turn for conversation engine config.",
            "required": false
          },
          {
            "name": "enableDecisionTrace",
            "type": "boolean",
            "description": "Enable decision trace value on conversation engine config; TypeScript expects a boolean.",
            "required": false
          }
        ],
        "related": []
      },
      {
        "name": "CreateConversationEngineOptions",
        "kind": "interface",
        "purpose": "Configuration object used to assemble an engine with custom repositories, services, handlers, providers, clocks, ids, and preloaded flows.",
        "usage": "Use CreateConversationEngineOptions at application boot to replace defaults with durable repositories, custom capabilities, and deterministic test infrastructure.",
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
            "description": "Engine configuration overrides, including turn execution limits merged into RuntimeContext.config.",
            "required": false
          },
          {
            "name": "repositories",
            "type": "Partial<ConversationEngineRepositories>",
            "description": "Durable repository replacements for flow versions, conversations, states, events, and traces.",
            "required": false
          },
          {
            "name": "services",
            "type": "Partial<RuntimeServices>",
            "description": "Runtime service overrides merged over the default service module created by the engine.",
            "required": false
          },
          {
            "name": "runtime",
            "type": "Partial<RuntimeContext>",
            "description": "Partial RuntimeContext used to override config, clock, or idGenerator before the engine starts.",
            "required": false
          },
          {
            "name": "flowVersions",
            "type": "FlowVersion[]",
            "description": "Flow versions inserted into the engine's default in-memory flow version map at construction time.",
            "required": false
          },
          {
            "name": "clock",
            "type": "RuntimeClock",
            "description": "Clock override used by the engine for generated timestamps when runtime.clock is not supplied.",
            "required": false
          },
          {
            "name": "idGenerator",
            "type": "Partial<IdGenerator>",
            "description": "Partial id generator override merged with the engine's default prefixed id factory.",
            "required": false
          },
          {
            "name": "maxStepExecutionsPerTurn",
            "type": "number",
            "description": "Per-engine cap for automatic step executions in one turn, defaulting to 20 when omitted.",
            "required": false
          },
          {
            "name": "stepHandlers",
            "type": "Record<string, StepHandler<StepConfig>>",
            "description": "Custom step handlers registered by step type before RuntimeServices are exposed.",
            "required": false
          },
          {
            "name": "operationHandlers",
            "type": "Record<string, OperationHandler<StepOperation> | ((operation: StepOperation, context: OperationExecutionContext) => Promise<...>)>",
            "description": "Operation handlers or execute functions registered by operation type.",
            "required": false
          },
          {
            "name": "validators",
            "type": "Record<string, Validator | ((value: unknown, definition: ValidatorDefinition, context: ValidationContext) => Promise<ValidationResult>)>",
            "description": "Validator implementations registered by validator type for input binding validation.",
            "required": false
          },
          {
            "name": "normalizers",
            "type": "Record<string, Normalizer | ((value: unknown, definition: NormalizerDefinition, context: NormalizationContext) => Promise<unknown>)>",
            "description": "Normalizer implementations registered by normalizer type before input validation.",
            "required": false
          },
          {
            "name": "extractors",
            "type": "Record<string, Extractor | ((input: UserInput, definition: ExtractorDefinition, context: ExtractionContext) => Promise<...>)>",
            "description": "Extractor implementations registered by extractor type for deriving values from UserInput.",
            "required": false
          },
          {
            "name": "resolvers",
            "type": "Resolver[]",
            "description": "Resolver instances added to the input resolver registry in the order supplied.",
            "required": false
          },
          {
            "name": "eventSubscribers",
            "type": "readonly ConversationEventSubscriber[]",
            "description": "Initial event subscribers registered before the first conversation starts.",
            "required": false
          },
          {
            "name": "actionHandlers",
            "type": "Record<string, ((action: ActionDefinition, input: Record<string, unknown>, context: ActionExecutionContext) => Promise<ActionResult>) | ActionHandler>",
            "description": "Action handlers or executor functions registered by ActionKind for run_action operations.",
            "required": false
          },
          {
            "name": "customOperations",
            "type": "Record<string, { inputSchema?: JsonObject; outputVariables?: string[]; outcomes: string[]; execute(operation: CustomOperation, input: Record<...>, context: OperationExecutionContext): Promise<...>; }>",
            "description": "Inline custom operation contracts and executors keyed by custom operation type.",
            "required": false
          },
          {
            "name": "semanticInputResolver",
            "type": "SemanticInputResolver | (<TOutcome extends StepOutcome = string, TVariableId extends VariableId = string>(input: UserInput, task: SemanticInputTask<TOutcome, TVariableId>, context: InputProcessingContext) => Promise<...>)",
            "description": "Semantic input resolver object or function used when an InputContract declares semanticTasks.",
            "required": false
          },
          {
            "name": "llmResponseGenerator",
            "type": "LlmResponseGenerator | (<TVariableId extends VariableId = string>(plan: GeneratedResponsePlan<TVariableId>, context: ResponseRenderingContext) => Promise<...>)",
            "description": "LLM response generator object or function used when a response plan has mode \"generated\".",
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
        "purpose": "CreateConversationEngine carries the value shape shown in its signature for runtime configuration.",
        "usage": "Use CreateConversationEngine at engine construction time to supply limits, dependencies, clocks, ids, repositories, and capabilities.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for create conversation engine.",
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
        "purpose": "RuntimeContext packages the runtime objects passed into runtime implementations.",
        "usage": "Use RuntimeContext at engine construction time to supply limits, dependencies, clocks, ids, repositories, and capabilities.",
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
            "description": "Configuration payload read by handlers for this step, action, operation, or runtime service for runtime context.",
            "required": true
          },
          {
            "name": "clock",
            "type": "RuntimeClock",
            "description": "Clock implementation used for all runtime timestamps for runtime context.",
            "required": true
          },
          {
            "name": "idGenerator",
            "type": "IdGenerator",
            "description": "Id generator used for runtime-created ids for runtime context.",
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
        "purpose": "RuntimeClock carries now for runtime configuration.",
        "usage": "Use RuntimeClock at engine construction time to supply limits, dependencies, clocks, ids, repositories, and capabilities.",
        "signatures": [
          "export interface RuntimeClock {\n    now(): ISODateString;\n}"
        ],
        "methods": [
          {
            "name": "now",
            "signature": "now(): ISODateString",
            "description": "Returns the current ISO timestamp used for conversations, turns, events, messages, traces, and history records.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "No arguments are accepted by RuntimeClock.now; call it with an empty parameter list.",
                "required": false
              }
            ],
            "returns": {
              "type": "ISODateString",
              "description": "RuntimeClock.now returns an ISODateString."
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
        "purpose": "IdGenerator carries new flow version id, new conversation id, new turn id, new message id, new event id, and new trace id for runtime configuration.",
        "usage": "Use IdGenerator at engine construction time to supply limits, dependencies, clocks, ids, repositories, and capabilities.",
        "signatures": [
          "export interface IdGenerator {\n    newFlowVersionId(): FlowVersionId;\n    newConversationId(): ConversationId;\n    newTurnId(): TurnId;\n    newMessageId(): MessageId;\n    newEventId(): EventId;\n    newTraceId(): TraceId;\n    newCandidateId(): CandidateId;\n    newExecutionFrameId(): ExecutionFrameId;\n    newHandoffId(): HandoffId;\n}"
        ],
        "methods": [
          {
            "name": "newFlowVersionId",
            "signature": "newFlowVersionId(): FlowVersionId",
            "description": "Creates a flow-version id for IdGenerator.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "No arguments are accepted by IdGenerator.newFlowVersionId; call it with an empty parameter list.",
                "required": false
              }
            ],
            "returns": {
              "type": "FlowVersionId",
              "description": "IdGenerator.newFlowVersionId returns a FlowVersionId."
            }
          },
          {
            "name": "newConversationId",
            "signature": "newConversationId(): ConversationId",
            "description": "Creates a conversation id for IdGenerator.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "No arguments are accepted by IdGenerator.newConversationId; call it with an empty parameter list.",
                "required": false
              }
            ],
            "returns": {
              "type": "ConversationId",
              "description": "IdGenerator.newConversationId returns a ConversationId."
            }
          },
          {
            "name": "newTurnId",
            "signature": "newTurnId(): TurnId",
            "description": "Creates a turn id for IdGenerator.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "No arguments are accepted by IdGenerator.newTurnId; call it with an empty parameter list.",
                "required": false
              }
            ],
            "returns": {
              "type": "TurnId",
              "description": "IdGenerator.newTurnId returns a TurnId."
            }
          },
          {
            "name": "newMessageId",
            "signature": "newMessageId(): MessageId",
            "description": "Creates a message id for IdGenerator.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "No arguments are accepted by IdGenerator.newMessageId; call it with an empty parameter list.",
                "required": false
              }
            ],
            "returns": {
              "type": "MessageId",
              "description": "IdGenerator.newMessageId returns a MessageId."
            }
          },
          {
            "name": "newEventId",
            "signature": "newEventId(): EventId",
            "description": "Creates an event id for IdGenerator.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "No arguments are accepted by IdGenerator.newEventId; call it with an empty parameter list.",
                "required": false
              }
            ],
            "returns": {
              "type": "EventId",
              "description": "IdGenerator.newEventId returns an EventId."
            }
          },
          {
            "name": "newTraceId",
            "signature": "newTraceId(): TraceId",
            "description": "Creates a trace id for IdGenerator.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "No arguments are accepted by IdGenerator.newTraceId; call it with an empty parameter list.",
                "required": false
              }
            ],
            "returns": {
              "type": "TraceId",
              "description": "IdGenerator.newTraceId returns a TraceId."
            }
          },
          {
            "name": "newCandidateId",
            "signature": "newCandidateId(): CandidateId",
            "description": "Creates an input-resolution candidate id for IdGenerator.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "No arguments are accepted by IdGenerator.newCandidateId; call it with an empty parameter list.",
                "required": false
              }
            ],
            "returns": {
              "type": "CandidateId",
              "description": "IdGenerator.newCandidateId returns a CandidateId."
            }
          },
          {
            "name": "newExecutionFrameId",
            "signature": "newExecutionFrameId(): ExecutionFrameId",
            "description": "Creates a flow-call execution-frame id for IdGenerator.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "No arguments are accepted by IdGenerator.newExecutionFrameId; call it with an empty parameter list.",
                "required": false
              }
            ],
            "returns": {
              "type": "ExecutionFrameId",
              "description": "IdGenerator.newExecutionFrameId returns an ExecutionFrameId."
            }
          },
          {
            "name": "newHandoffId",
            "signature": "newHandoffId(): HandoffId",
            "description": "Creates a handoff id for IdGenerator.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "No arguments are accepted by IdGenerator.newHandoffId; call it with an empty parameter list.",
                "required": false
              }
            ],
            "returns": {
              "type": "HandoffId",
              "description": "IdGenerator.newHandoffId returns a HandoffId."
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
        "purpose": "ConversationEngineModule carries services, repositories, and runtime for runtime configuration.",
        "usage": "Use ConversationEngineModule at engine construction time to supply limits, dependencies, clocks, ids, repositories, and capabilities.",
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
            "description": "Runtime services used to resolve input, render responses, execute operations, and build traces for conversation engine module.",
            "required": true
          },
          {
            "name": "repositories",
            "type": "ConversationEngineRepositories",
            "description": "Repository implementations used by the runtime engine for conversation engine module.",
            "required": true
          },
          {
            "name": "runtime",
            "type": "RuntimeContext",
            "description": "Runtime context containing configuration, clock, and id generator for conversation engine module.",
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
        "purpose": "ConversationEngineRepositories carries flow versions, conversations, states, events, and traces for runtime configuration.",
        "usage": "Use ConversationEngineRepositories at engine construction time to supply limits, dependencies, clocks, ids, repositories, and capabilities.",
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
            "description": "Preloaded flow versions or flow-version repository slot, depending on the contract for conversation engine repositories.",
            "required": true
          },
          {
            "name": "conversations",
            "type": "ConversationRepository",
            "description": "Conversation repository used by the engine module for conversation engine repositories.",
            "required": true
          },
          {
            "name": "states",
            "type": "ConversationStateRepository",
            "description": "Conversation state repository used by the engine module for conversation engine repositories.",
            "required": true
          },
          {
            "name": "events",
            "type": "ConversationEventRepository",
            "description": "Events emitted and committed during the turn for conversation engine repositories.",
            "required": true
          },
          {
            "name": "traces",
            "type": "DecisionTraceRepository",
            "description": "Decision trace repository used by the engine module for conversation engine repositories.",
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
        "purpose": "VariableStore carries get, set, unset, invalidate, has, and snapshot for variable and definition lookup.",
        "usage": "Use VariableStore inside runtime services, handlers, and tests that need variable or definition lookup behavior.",
        "signatures": [
          "export interface VariableStore {\n    get(variableId: VariableId, scope?: VariableScope): VariableValue | undefined;\n    set(variableId: VariableId, value: unknown, source: VariableValueSource, metadata?: Metadata, scope?: VariableScope): SetVariablePatch;\n    unset(variableId: VariableId, source: VariableValueSource, metadata?: Metadata, scope?: VariableScope): UnsetVariablePatch;\n    invalidate(variableId: VariableId, source: VariableValueSource, reason?: string, metadata?: Metadata, scope?: VariableScope): InvalidateVariablePatch;\n    has(variableId: VariableId, scope?: VariableScope): boolean;\n    snapshot(): VariableStoreSnapshot;\n    history(variableId?: VariableId, scope?: VariableScope): VariableHistoryEntry[];\n}"
        ],
        "methods": [
          {
            "name": "get",
            "signature": "get(variableId: VariableId, scope?: VariableScope): VariableValue | undefined",
            "description": "Reads a variable value for VariableStore.",
            "parameters": [
              {
                "name": "variableId",
                "type": "VariableId",
                "description": "Identifier used by VariableStore.get to locate the variable record.",
                "required": true
              },
              {
                "name": "scope",
                "type": "VariableScope",
                "description": "Variable namespace used to separate conversation, flow, operation, and system values passed to VariableStore.get.",
                "required": false
              }
            ],
            "returns": {
              "type": "VariableValue | undefined",
              "description": "VariableStore.get returns a VariableValue | undefined."
            }
          },
          {
            "name": "set",
            "signature": "set(variableId: VariableId, value: unknown, source: VariableValueSource, metadata?: Metadata, scope?: VariableScope): SetVariablePatch",
            "description": "Writes a variable value for VariableStore.",
            "parameters": [
              {
                "name": "variableId",
                "type": "VariableId",
                "description": "Identifier used by VariableStore.set to locate the variable record.",
                "required": true
              },
              {
                "name": "value",
                "type": "unknown",
                "description": "Candidate or stored value consumed by VariableStore.set: unknown.",
                "required": true
              },
              {
                "name": "source",
                "type": "VariableValueSource",
                "description": "Origin recorded for a variable write, trace fragment, event, or candidate passed to VariableStore.set.",
                "required": true
              },
              {
                "name": "metadata",
                "type": "Metadata",
                "description": "Metadata parameter for VariableStore.set: Metadata.",
                "required": false
              },
              {
                "name": "scope",
                "type": "VariableScope",
                "description": "Variable namespace used to separate conversation, flow, operation, and system values passed to VariableStore.set.",
                "required": false
              }
            ],
            "returns": {
              "type": "SetVariablePatch",
              "description": "VariableStore.set returns a SetVariablePatch."
            }
          },
          {
            "name": "unset",
            "signature": "unset(variableId: VariableId, source: VariableValueSource, metadata?: Metadata, scope?: VariableScope): UnsetVariablePatch",
            "description": "Removes a variable value for VariableStore.",
            "parameters": [
              {
                "name": "variableId",
                "type": "VariableId",
                "description": "Identifier used by VariableStore.unset to locate the variable record.",
                "required": true
              },
              {
                "name": "source",
                "type": "VariableValueSource",
                "description": "Origin recorded for a variable write, trace fragment, event, or candidate passed to VariableStore.unset.",
                "required": true
              },
              {
                "name": "metadata",
                "type": "Metadata",
                "description": "Metadata parameter for VariableStore.unset: Metadata.",
                "required": false
              },
              {
                "name": "scope",
                "type": "VariableScope",
                "description": "Variable namespace used to separate conversation, flow, operation, and system values passed to VariableStore.unset.",
                "required": false
              }
            ],
            "returns": {
              "type": "UnsetVariablePatch",
              "description": "VariableStore.unset returns an UnsetVariablePatch."
            }
          },
          {
            "name": "invalidate",
            "signature": "invalidate(variableId: VariableId, source: VariableValueSource, reason?: string, metadata?: Metadata, scope?: VariableScope): InvalidateVariablePatch",
            "description": "Marks a variable value invalid for VariableStore.",
            "parameters": [
              {
                "name": "variableId",
                "type": "VariableId",
                "description": "Identifier used by VariableStore.invalidate to locate the variable record.",
                "required": true
              },
              {
                "name": "source",
                "type": "VariableValueSource",
                "description": "Origin recorded for a variable write, trace fragment, event, or candidate passed to VariableStore.invalidate.",
                "required": true
              },
              {
                "name": "reason",
                "type": "string",
                "description": "Reason text stored for invalidation, handoff, or controlled termination passed to VariableStore.invalidate.",
                "required": false
              },
              {
                "name": "metadata",
                "type": "Metadata",
                "description": "Metadata parameter for VariableStore.invalidate: Metadata.",
                "required": false
              },
              {
                "name": "scope",
                "type": "VariableScope",
                "description": "Variable namespace used to separate conversation, flow, operation, and system values passed to VariableStore.invalidate.",
                "required": false
              }
            ],
            "returns": {
              "type": "InvalidateVariablePatch",
              "description": "VariableStore.invalidate returns an InvalidateVariablePatch."
            }
          },
          {
            "name": "has",
            "signature": "has(variableId: VariableId, scope?: VariableScope): boolean",
            "description": "Checks whether a variable value exists for VariableStore.",
            "parameters": [
              {
                "name": "variableId",
                "type": "VariableId",
                "description": "Identifier used by VariableStore.has to locate the variable record.",
                "required": true
              },
              {
                "name": "scope",
                "type": "VariableScope",
                "description": "Variable namespace used to separate conversation, flow, operation, and system values passed to VariableStore.has.",
                "required": false
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "VariableStore.has returns a boolean."
            }
          },
          {
            "name": "snapshot",
            "signature": "snapshot(): VariableStoreSnapshot",
            "description": "Returns a variable store snapshot for VariableStore.",
            "parameters": [
              {
                "name": "none",
                "type": "void",
                "description": "No arguments are accepted by VariableStore.snapshot; call it with an empty parameter list.",
                "required": false
              }
            ],
            "returns": {
              "type": "VariableStoreSnapshot",
              "description": "VariableStore.snapshot returns a VariableStoreSnapshot."
            }
          },
          {
            "name": "history",
            "signature": "history(variableId?: VariableId, scope?: VariableScope): VariableHistoryEntry[]",
            "description": "Returns variable history entries for VariableStore.",
            "parameters": [
              {
                "name": "variableId",
                "type": "VariableId",
                "description": "Identifier used by VariableStore.history to locate the variable record.",
                "required": false
              },
              {
                "name": "scope",
                "type": "VariableScope",
                "description": "Variable namespace used to separate conversation, flow, operation, and system values passed to VariableStore.history.",
                "required": false
              }
            ],
            "returns": {
              "type": "VariableHistoryEntry[]",
              "description": "VariableStore.history returns a VariableHistoryEntry[]."
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
        "purpose": "VariableResolver resolves variable decisions without coupling callers to an implementation.",
        "usage": "Use VariableResolver inside runtime services, handlers, and tests that need variable or definition lookup behavior.",
        "signatures": [
          "export interface VariableResolver {\n    resolve(expression: ValueExpression, context: VariableResolutionContext): unknown;\n}"
        ],
        "methods": [
          {
            "name": "resolve",
            "signature": "resolve(expression: ValueExpression, context: VariableResolutionContext): unknown",
            "description": "Resolves input, response references, variables, routes, or definitions for VariableResolver.",
            "parameters": [
              {
                "name": "expression",
                "type": "ValueExpression",
                "description": "Expression parameter for VariableResolver.resolve: ValueExpression.",
                "required": true
              },
              {
                "name": "context",
                "type": "VariableResolutionContext",
                "description": "Runtime context for VariableResolver.resolve, using VariableResolutionContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "unknown",
              "description": "VariableResolver.resolve returns an unknown."
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
        "purpose": "VariableResolutionContext packages the runtime objects passed into variable resolution implementations.",
        "usage": "Use VariableResolutionContext inside runtime services, handlers, and tests that need variable or definition lookup behavior.",
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
            "description": "Conversation state active in the current context for variable resolution context.",
            "required": true
          },
          {
            "name": "turn",
            "type": "Turn",
            "description": "Turn active in the current context for variable resolution context.",
            "required": false
          },
          {
            "name": "userInput",
            "type": "UserInput",
            "description": "User input attached to a context, trace, or turn result for variable resolution context.",
            "required": false
          },
          {
            "name": "actionResult",
            "type": "ActionResult",
            "description": "Action result value on variable resolution context; TypeScript expects an ActionResult.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on variable resolution context for adapters, analytics, audits, or tests.",
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
        "purpose": "FlowRegistry stores and retrieves runtime extensions for flow.",
        "usage": "Use FlowRegistry inside runtime services, handlers, and tests that need variable or definition lookup behavior.",
        "signatures": [
          "export interface FlowRegistry {\n    getFlowVersion(flowVersionId: FlowVersionId): Promise<FlowVersion | undefined>;\n    registerFlowVersion(flowVersion: FlowVersion): Promise<void>;\n}"
        ],
        "methods": [
          {
            "name": "getFlowVersion",
            "signature": "getFlowVersion(flowVersionId: FlowVersionId): Promise<FlowVersion | undefined>",
            "description": "Loads a registered flow version by id for FlowRegistry.",
            "parameters": [
              {
                "name": "flowVersionId",
                "type": "FlowVersionId",
                "description": "Identifier used by FlowRegistry.getFlowVersion to locate the flow version record.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<FlowVersion | undefined>",
              "description": "FlowRegistry.getFlowVersion resolves with FlowVersion | undefined."
            }
          },
          {
            "name": "registerFlowVersion",
            "signature": "registerFlowVersion(flowVersion: FlowVersion): Promise<void>",
            "description": "Registers a flow version in the lookup registry for FlowRegistry.",
            "parameters": [
              {
                "name": "flowVersion",
                "type": "FlowVersion",
                "description": "Flow version active in the current context passed to FlowRegistry.registerFlowVersion.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "FlowRegistry.registerFlowVersion resolves with void."
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
        "purpose": "DefinitionLookup carries get step, get variable, get action, and get response for variable and definition lookup.",
        "usage": "Use DefinitionLookup inside runtime services, handlers, and tests that need variable or definition lookup behavior.",
        "signatures": [
          "export interface DefinitionLookup {\n    getStep(flow: FlowVersion, stepId: StepId): StepDefinition | undefined;\n    getVariable(flow: FlowVersion, variableId: VariableId): VariableDefinition | undefined;\n    getAction(flow: FlowVersion, actionId: ActionId): ActionDefinition | undefined;\n    getResponse(flow: FlowVersion, responseId: ResponseId): ResponseDefinition | undefined;\n}"
        ],
        "methods": [
          {
            "name": "getStep",
            "signature": "getStep(flow: FlowVersion, stepId: StepId): StepDefinition | undefined",
            "description": "Retrieves a step definition by id for DefinitionLookup.",
            "parameters": [
              {
                "name": "flow",
                "type": "FlowVersion",
                "description": "Flow parameter for DefinitionLookup.getStep: FlowVersion.",
                "required": true
              },
              {
                "name": "stepId",
                "type": "StepId",
                "description": "Identifier used by DefinitionLookup.getStep to locate the step record.",
                "required": true
              }
            ],
            "returns": {
              "type": "StepDefinition | undefined",
              "description": "DefinitionLookup.getStep returns a StepDefinition | undefined."
            }
          },
          {
            "name": "getVariable",
            "signature": "getVariable(flow: FlowVersion, variableId: VariableId): VariableDefinition | undefined",
            "description": "DefinitionLookup.getVariable runs the get variable path defined for DefinitionLookup.",
            "parameters": [
              {
                "name": "flow",
                "type": "FlowVersion",
                "description": "Flow parameter for DefinitionLookup.getVariable: FlowVersion.",
                "required": true
              },
              {
                "name": "variableId",
                "type": "VariableId",
                "description": "Identifier used by DefinitionLookup.getVariable to locate the variable record.",
                "required": true
              }
            ],
            "returns": {
              "type": "VariableDefinition | undefined",
              "description": "DefinitionLookup.getVariable returns a VariableDefinition | undefined."
            }
          },
          {
            "name": "getAction",
            "signature": "getAction(flow: FlowVersion, actionId: ActionId): ActionDefinition | undefined",
            "description": "Retrieves an action definition by id for DefinitionLookup.",
            "parameters": [
              {
                "name": "flow",
                "type": "FlowVersion",
                "description": "Flow parameter for DefinitionLookup.getAction: FlowVersion.",
                "required": true
              },
              {
                "name": "actionId",
                "type": "ActionId",
                "description": "Identifier used by DefinitionLookup.getAction to locate the action record.",
                "required": true
              }
            ],
            "returns": {
              "type": "ActionDefinition | undefined",
              "description": "DefinitionLookup.getAction returns an ActionDefinition | undefined."
            }
          },
          {
            "name": "getResponse",
            "signature": "getResponse(flow: FlowVersion, responseId: ResponseId): ResponseDefinition | undefined",
            "description": "Retrieves a reusable response definition by id for DefinitionLookup.",
            "parameters": [
              {
                "name": "flow",
                "type": "FlowVersion",
                "description": "Flow parameter for DefinitionLookup.getResponse: FlowVersion.",
                "required": true
              },
              {
                "name": "responseId",
                "type": "ResponseId",
                "description": "Identifier used by DefinitionLookup.getResponse to locate the response record.",
                "required": true
              }
            ],
            "returns": {
              "type": "ResponseDefinition | undefined",
              "description": "DefinitionLookup.getResponse returns a ResponseDefinition | undefined."
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
        "purpose": "TextResolver resolves text decisions without coupling callers to an implementation.",
        "usage": "Use TextResolver to refer to the built-in resolver identified by its resolverType literal.",
        "signatures": [
          "export interface TextResolver extends Resolver {\n    readonly resolverType: \"text\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "Checks whether the resolver can handle the input contract for TextResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by TextResolver.canResolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for TextResolver.canResolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for TextResolver.canResolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "TextResolver.canResolve returns a boolean."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "Resolves input, response references, variables, routes, or definitions for TextResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by TextResolver.resolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for TextResolver.resolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for TextResolver.resolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "TextResolver.resolve resolves with CommandCandidate[]."
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
            "description": "Literal \"text\" marker that selects the text resolver variant during validation and runtime dispatch.",
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
        "purpose": "ExactTextResolver resolves exact text decisions without coupling callers to an implementation.",
        "usage": "Use ExactTextResolver to refer to the built-in resolver identified by its resolverType literal.",
        "signatures": [
          "export interface ExactTextResolver extends Resolver {\n    readonly resolverType: \"exact_text\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "Checks whether the resolver can handle the input contract for ExactTextResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by ExactTextResolver.canResolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for ExactTextResolver.canResolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for ExactTextResolver.canResolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "ExactTextResolver.canResolve returns a boolean."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "Resolves input, response references, variables, routes, or definitions for ExactTextResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by ExactTextResolver.resolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for ExactTextResolver.resolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for ExactTextResolver.resolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "ExactTextResolver.resolve resolves with CommandCandidate[]."
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
            "description": "Literal \"exact_text\" marker that selects the exact text resolver variant during validation and runtime dispatch.",
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
        "purpose": "NumberResolver resolves number decisions without coupling callers to an implementation.",
        "usage": "Use NumberResolver to refer to the built-in resolver identified by its resolverType literal.",
        "signatures": [
          "export interface NumberResolver extends Resolver {\n    readonly resolverType: \"number\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "Checks whether the resolver can handle the input contract for NumberResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by NumberResolver.canResolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for NumberResolver.canResolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for NumberResolver.canResolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "NumberResolver.canResolve returns a boolean."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "Resolves input, response references, variables, routes, or definitions for NumberResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by NumberResolver.resolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for NumberResolver.resolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for NumberResolver.resolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "NumberResolver.resolve resolves with CommandCandidate[]."
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
            "description": "Literal \"number\" marker that selects the number resolver variant during validation and runtime dispatch.",
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
        "purpose": "IntegerResolver resolves integer decisions without coupling callers to an implementation.",
        "usage": "Use IntegerResolver to refer to the built-in resolver identified by its resolverType literal.",
        "signatures": [
          "export interface IntegerResolver extends Resolver {\n    readonly resolverType: \"integer\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "Checks whether the resolver can handle the input contract for IntegerResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by IntegerResolver.canResolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for IntegerResolver.canResolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for IntegerResolver.canResolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "IntegerResolver.canResolve returns a boolean."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "Resolves input, response references, variables, routes, or definitions for IntegerResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by IntegerResolver.resolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for IntegerResolver.resolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for IntegerResolver.resolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "IntegerResolver.resolve resolves with CommandCandidate[]."
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
            "description": "Literal \"integer\" marker that selects the integer resolver variant during validation and runtime dispatch.",
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
        "purpose": "EmailResolver resolves email decisions without coupling callers to an implementation.",
        "usage": "Use EmailResolver to refer to the built-in resolver identified by its resolverType literal.",
        "signatures": [
          "export interface EmailResolver extends Resolver {\n    readonly resolverType: \"email\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "Checks whether the resolver can handle the input contract for EmailResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by EmailResolver.canResolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for EmailResolver.canResolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for EmailResolver.canResolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "EmailResolver.canResolve returns a boolean."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "Resolves input, response references, variables, routes, or definitions for EmailResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by EmailResolver.resolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for EmailResolver.resolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for EmailResolver.resolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "EmailResolver.resolve resolves with CommandCandidate[]."
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
            "description": "Literal \"email\" marker that selects the email resolver variant during validation and runtime dispatch.",
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
        "purpose": "PhoneResolver resolves phone decisions without coupling callers to an implementation.",
        "usage": "Use PhoneResolver to refer to the built-in resolver identified by its resolverType literal.",
        "signatures": [
          "export interface PhoneResolver extends Resolver {\n    readonly resolverType: \"phone\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "Checks whether the resolver can handle the input contract for PhoneResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by PhoneResolver.canResolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for PhoneResolver.canResolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for PhoneResolver.canResolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "PhoneResolver.canResolve returns a boolean."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "Resolves input, response references, variables, routes, or definitions for PhoneResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by PhoneResolver.resolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for PhoneResolver.resolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for PhoneResolver.resolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "PhoneResolver.resolve resolves with CommandCandidate[]."
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
            "description": "Literal \"phone\" marker that selects the phone resolver variant during validation and runtime dispatch.",
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
        "purpose": "DateResolver resolves date decisions without coupling callers to an implementation.",
        "usage": "Use DateResolver to refer to the built-in resolver identified by its resolverType literal.",
        "signatures": [
          "export interface DateResolver extends Resolver {\n    readonly resolverType: \"date\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "Checks whether the resolver can handle the input contract for DateResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by DateResolver.canResolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for DateResolver.canResolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for DateResolver.canResolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "DateResolver.canResolve returns a boolean."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "Resolves input, response references, variables, routes, or definitions for DateResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by DateResolver.resolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for DateResolver.resolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for DateResolver.resolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "DateResolver.resolve resolves with CommandCandidate[]."
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
            "description": "Literal \"date\" marker that selects the date resolver variant during validation and runtime dispatch.",
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
        "purpose": "RegexResolver resolves regex decisions without coupling callers to an implementation.",
        "usage": "Use RegexResolver to refer to the built-in resolver identified by its resolverType literal.",
        "signatures": [
          "export interface RegexResolver extends Resolver {\n    readonly resolverType: \"regex\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "Checks whether the resolver can handle the input contract for RegexResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by RegexResolver.canResolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for RegexResolver.canResolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for RegexResolver.canResolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "RegexResolver.canResolve returns a boolean."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "Resolves input, response references, variables, routes, or definitions for RegexResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by RegexResolver.resolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for RegexResolver.resolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for RegexResolver.resolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "RegexResolver.resolve resolves with CommandCandidate[]."
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
            "description": "Literal \"regex\" marker that selects the regex resolver variant during validation and runtime dispatch.",
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
        "purpose": "MenuOptionResolver resolves menu option decisions without coupling callers to an implementation.",
        "usage": "Use MenuOptionResolver to refer to the built-in resolver identified by its resolverType literal.",
        "signatures": [
          "export interface MenuOptionResolver extends Resolver {\n    readonly resolverType: \"menu_option\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "Checks whether the resolver can handle the input contract for MenuOptionResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by MenuOptionResolver.canResolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for MenuOptionResolver.canResolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for MenuOptionResolver.canResolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "MenuOptionResolver.canResolve returns a boolean."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "Resolves input, response references, variables, routes, or definitions for MenuOptionResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by MenuOptionResolver.resolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for MenuOptionResolver.resolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for MenuOptionResolver.resolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "MenuOptionResolver.resolve resolves with CommandCandidate[]."
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
            "description": "Literal \"menu_option\" marker that selects the menu option resolver variant during validation and runtime dispatch.",
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
        "purpose": "AttachmentResolver resolves attachment decisions without coupling callers to an implementation.",
        "usage": "Use AttachmentResolver to refer to the built-in resolver identified by its resolverType literal.",
        "signatures": [
          "export interface AttachmentResolver extends Resolver {\n    readonly resolverType: \"attachment\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "Checks whether the resolver can handle the input contract for AttachmentResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by AttachmentResolver.canResolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for AttachmentResolver.canResolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for AttachmentResolver.canResolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "AttachmentResolver.canResolve returns a boolean."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "Resolves input, response references, variables, routes, or definitions for AttachmentResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by AttachmentResolver.resolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for AttachmentResolver.resolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for AttachmentResolver.resolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "AttachmentResolver.resolve resolves with CommandCandidate[]."
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
            "description": "Literal \"attachment\" marker that selects the attachment resolver variant during validation and runtime dispatch.",
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
        "purpose": "GlobalCommandResolver resolves global command decisions without coupling callers to an implementation.",
        "usage": "Use GlobalCommandResolver to refer to the built-in resolver identified by its resolverType literal.",
        "signatures": [
          "export interface GlobalCommandResolver extends Resolver {\n    readonly resolverType: \"global_command\";\n}"
        ],
        "methods": [
          {
            "name": "canResolve",
            "signature": "canResolve(input: UserInput, contract: InputContract, context: InputProcessingContext): boolean",
            "description": "Checks whether the resolver can handle the input contract for GlobalCommandResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by GlobalCommandResolver.canResolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for GlobalCommandResolver.canResolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for GlobalCommandResolver.canResolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "boolean",
              "description": "GlobalCommandResolver.canResolve returns a boolean."
            }
          },
          {
            "name": "resolve",
            "signature": "resolve(input: UserInput, contract: InputContract, context: InputProcessingContext): Promise<CommandCandidate[]>",
            "description": "Resolves input, response references, variables, routes, or definitions for GlobalCommandResolver.",
            "parameters": [
              {
                "name": "input",
                "type": "UserInput",
                "description": "Input value consumed by GlobalCommandResolver.resolve: UserInput.",
                "required": true
              },
              {
                "name": "contract",
                "type": "InputContract",
                "description": "Contract parameter for GlobalCommandResolver.resolve: InputContract.",
                "required": true
              },
              {
                "name": "context",
                "type": "InputProcessingContext",
                "description": "Runtime context for GlobalCommandResolver.resolve, using InputProcessingContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<CommandCandidate[]>",
              "description": "GlobalCommandResolver.resolve resolves with CommandCandidate[]."
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
            "description": "Literal \"global_command\" marker that selects the global command resolver variant during validation and runtime dispatch.",
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
        "purpose": "RequiredValidator validates required values or model objects and returns structured findings.",
        "usage": "Use RequiredValidator to refer to the built-in validator identified by its validatorType literal.",
        "signatures": [
          "export interface RequiredValidator extends Validator {\n    readonly validatorType: \"required\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "Validates a flow, step, operation, value, or model object for RequiredValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "Candidate or stored value consumed by RequiredValidator.validate: unknown.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "Definition object consumed by RequiredValidator.validate: ValidatorDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "Runtime context for RequiredValidator.validate, using ValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "RequiredValidator.validate resolves with ValidationResult."
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
            "description": "Literal \"required\" marker that selects the required validator variant during validation and runtime dispatch.",
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
        "purpose": "RegexValidator validates regex values or model objects and returns structured findings.",
        "usage": "Use RegexValidator to refer to the built-in validator identified by its validatorType literal.",
        "signatures": [
          "export interface RegexValidator extends Validator {\n    readonly validatorType: \"regex\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "Validates a flow, step, operation, value, or model object for RegexValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "Candidate or stored value consumed by RegexValidator.validate: unknown.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "Definition object consumed by RegexValidator.validate: ValidatorDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "Runtime context for RegexValidator.validate, using ValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "RegexValidator.validate resolves with ValidationResult."
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
            "description": "Literal \"regex\" marker that selects the regex validator variant during validation and runtime dispatch.",
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
        "purpose": "EmailValidator validates email values or model objects and returns structured findings.",
        "usage": "Use EmailValidator to refer to the built-in validator identified by its validatorType literal.",
        "signatures": [
          "export interface EmailValidator extends Validator {\n    readonly validatorType: \"email\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "Validates a flow, step, operation, value, or model object for EmailValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "Candidate or stored value consumed by EmailValidator.validate: unknown.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "Definition object consumed by EmailValidator.validate: ValidatorDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "Runtime context for EmailValidator.validate, using ValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "EmailValidator.validate resolves with ValidationResult."
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
            "description": "Literal \"email\" marker that selects the email validator variant during validation and runtime dispatch.",
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
        "purpose": "PhoneValidator validates phone values or model objects and returns structured findings.",
        "usage": "Use PhoneValidator to refer to the built-in validator identified by its validatorType literal.",
        "signatures": [
          "export interface PhoneValidator extends Validator {\n    readonly validatorType: \"phone\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "Validates a flow, step, operation, value, or model object for PhoneValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "Candidate or stored value consumed by PhoneValidator.validate: unknown.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "Definition object consumed by PhoneValidator.validate: ValidatorDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "Runtime context for PhoneValidator.validate, using ValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "PhoneValidator.validate resolves with ValidationResult."
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
            "description": "Literal \"phone\" marker that selects the phone validator variant during validation and runtime dispatch.",
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
        "purpose": "IntegerValidator validates integer values or model objects and returns structured findings.",
        "usage": "Use IntegerValidator to refer to the built-in validator identified by its validatorType literal.",
        "signatures": [
          "export interface IntegerValidator extends Validator {\n    readonly validatorType: \"integer\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "Validates a flow, step, operation, value, or model object for IntegerValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "Candidate or stored value consumed by IntegerValidator.validate: unknown.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "Definition object consumed by IntegerValidator.validate: ValidatorDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "Runtime context for IntegerValidator.validate, using ValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "IntegerValidator.validate resolves with ValidationResult."
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
            "description": "Literal \"integer\" marker that selects the integer validator variant during validation and runtime dispatch.",
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
        "purpose": "NumberValidator validates number values or model objects and returns structured findings.",
        "usage": "Use NumberValidator to refer to the built-in validator identified by its validatorType literal.",
        "signatures": [
          "export interface NumberValidator extends Validator {\n    readonly validatorType: \"number\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "Validates a flow, step, operation, value, or model object for NumberValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "Candidate or stored value consumed by NumberValidator.validate: unknown.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "Definition object consumed by NumberValidator.validate: ValidatorDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "Runtime context for NumberValidator.validate, using ValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "NumberValidator.validate resolves with ValidationResult."
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
            "description": "Literal \"number\" marker that selects the number validator variant during validation and runtime dispatch.",
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
        "purpose": "MinLengthValidator validates min length values or model objects and returns structured findings.",
        "usage": "Use MinLengthValidator to refer to the built-in validator identified by its validatorType literal.",
        "signatures": [
          "export interface MinLengthValidator extends Validator {\n    readonly validatorType: \"min_length\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "Validates a flow, step, operation, value, or model object for MinLengthValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "Candidate or stored value consumed by MinLengthValidator.validate: unknown.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "Definition object consumed by MinLengthValidator.validate: ValidatorDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "Runtime context for MinLengthValidator.validate, using ValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "MinLengthValidator.validate resolves with ValidationResult."
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
            "description": "Literal \"min_length\" marker that selects the min length validator variant during validation and runtime dispatch.",
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
        "purpose": "MaxLengthValidator validates max length values or model objects and returns structured findings.",
        "usage": "Use MaxLengthValidator to refer to the built-in validator identified by its validatorType literal.",
        "signatures": [
          "export interface MaxLengthValidator extends Validator {\n    readonly validatorType: \"max_length\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "Validates a flow, step, operation, value, or model object for MaxLengthValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "Candidate or stored value consumed by MaxLengthValidator.validate: unknown.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "Definition object consumed by MaxLengthValidator.validate: ValidatorDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "Runtime context for MaxLengthValidator.validate, using ValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "MaxLengthValidator.validate resolves with ValidationResult."
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
            "description": "Literal \"max_length\" marker that selects the max length validator variant during validation and runtime dispatch.",
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
        "purpose": "EnumValidator validates enum values or model objects and returns structured findings.",
        "usage": "Use EnumValidator to refer to the built-in validator identified by its validatorType literal.",
        "signatures": [
          "export interface EnumValidator extends Validator {\n    readonly validatorType: \"enum\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "Validates a flow, step, operation, value, or model object for EnumValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "Candidate or stored value consumed by EnumValidator.validate: unknown.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "Definition object consumed by EnumValidator.validate: ValidatorDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "Runtime context for EnumValidator.validate, using ValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "EnumValidator.validate resolves with ValidationResult."
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
            "description": "Literal \"enum\" marker that selects the enum validator variant during validation and runtime dispatch.",
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
        "purpose": "AttachmentValidator validates attachment values or model objects and returns structured findings.",
        "usage": "Use AttachmentValidator to refer to the built-in validator identified by its validatorType literal.",
        "signatures": [
          "export interface AttachmentValidator extends Validator {\n    readonly validatorType: \"attachment\";\n}"
        ],
        "methods": [
          {
            "name": "validate",
            "signature": "validate(value: unknown, definition: ValidatorDefinition, context: ValidationContext): Promise<ValidationResult>",
            "description": "Validates a flow, step, operation, value, or model object for AttachmentValidator.",
            "parameters": [
              {
                "name": "value",
                "type": "unknown",
                "description": "Candidate or stored value consumed by AttachmentValidator.validate: unknown.",
                "required": true
              },
              {
                "name": "definition",
                "type": "ValidatorDefinition",
                "description": "Definition object consumed by AttachmentValidator.validate: ValidatorDefinition.",
                "required": true
              },
              {
                "name": "context",
                "type": "ValidationContext",
                "description": "Runtime context for AttachmentValidator.validate, using ValidationContext data from the active turn.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ValidationResult>",
              "description": "AttachmentValidator.validate resolves with ValidationResult."
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
            "description": "Literal \"attachment\" marker that selects the attachment validator variant during validation and runtime dispatch.",
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
        "purpose": "Secondary module that exports in-memory repositories, deterministic factories, trace builders, and variable helpers for local runtimes.",
        "usage": "Use runtime-support from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
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
            "description": "In-memory repository class for cloning and storing FlowVersion records by flowVersionId.",
            "required": true
          },
          {
            "name": "InMemoryConversationRepository",
            "type": "class",
            "description": "In-memory repository class for cloning and storing Conversation records by conversationId.",
            "required": true
          },
          {
            "name": "InMemoryConversationStateRepository",
            "type": "class",
            "description": "In-memory repository class for cloning and storing ConversationState records by conversationId.",
            "required": true
          },
          {
            "name": "InMemoryConversationEventRepository",
            "type": "class",
            "description": "In-memory event repository class that appends and lists ConversationEvent records.",
            "required": true
          },
          {
            "name": "InMemoryDecisionTraceRepository",
            "type": "class",
            "description": "In-memory trace repository class that stores DecisionTrace records for later inspection.",
            "required": true
          },
          {
            "name": "createTextMessage",
            "type": "function",
            "description": "Factory export that creates text outbound messages with ids, timestamps, and optional channel metadata.",
            "required": true
          },
          {
            "name": "setVariable",
            "type": "function",
            "description": "Helper export that writes scoped variables and returns the corresponding VariablePatch.",
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
        "purpose": "VariableLookupResult enumerates the allowed variable lookup result values accepted by runtime support.",
        "usage": "Use VariableLookupResult from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for variable lookup result.",
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
        "purpose": "Deep-clones JSON-compatible runtime values with structuredClone so helpers do not share mutable objects.",
        "usage": "Use clone from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export function clone<T>(value: T): T;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "value",
            "type": "T",
            "description": "Candidate or stored value consumed by clone: T.",
            "required": true
          }
        ],
        "returns": {
          "type": "T",
          "description": "clone returns a T."
        },
        "example": "const cloned = clone(flowVersion);",
        "related": []
      },
      {
        "name": "InMemoryFlowVersionRepository",
        "kind": "class",
        "purpose": "InMemoryFlowVersionRepository is the persistence port for in memory flow version records.",
        "usage": "Use InMemoryFlowVersionRepository from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export class InMemoryFlowVersionRepository implements FlowVersionRepository {\n  async getById(flowVersionId: FlowVersionId): Promise<FlowVersion | undefined> {\n        const version = this.versions.get(flowVersionId);\n        return version === undefined ? undefined : clone(version);\n    };\n  async save(version: FlowVersion): Promise<void> {\n        this.versions.set(version.flowVersionId, clone(version));\n    };\n}"
        ],
        "methods": [
          {
            "name": "getById",
            "signature": "async getById(flowVersionId: FlowVersionId): Promise<FlowVersion | undefined> {\n        const version = this.versions.get(flowVersionId);\n        return version === undefined ? undefined : clone(version);\n    }",
            "description": "Loads one persisted record by id for InMemoryFlowVersionRepository.",
            "parameters": [
              {
                "name": "flowVersionId",
                "type": "FlowVersionId",
                "description": "Identifier used by InMemoryFlowVersionRepository.getById to locate the flow version record.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<FlowVersion | undefined>",
              "description": "InMemoryFlowVersionRepository.getById resolves with FlowVersion | undefined."
            }
          },
          {
            "name": "save",
            "signature": "async save(version: FlowVersion): Promise<void> {\n        this.versions.set(version.flowVersionId, clone(version));\n    }",
            "description": "Persists a runtime record for InMemoryFlowVersionRepository.",
            "parameters": [
              {
                "name": "version",
                "type": "FlowVersion",
                "description": "Author-facing version label for release and migration tracking passed to InMemoryFlowVersionRepository.save.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "InMemoryFlowVersionRepository.save resolves with void."
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
        "purpose": "InMemoryConversationRepository is the persistence port for in memory conversation records.",
        "usage": "Use InMemoryConversationRepository from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export class InMemoryConversationRepository implements ConversationRepository {\n  async getById(conversationId: ConversationId): Promise<Conversation | undefined> {\n        const conversation = this.conversations.get(conversationId);\n        return conversation === undefined ? undefined : clone(conversation);\n    };\n  async save(conversation: Conversation): Promise<void> {\n        this.conversations.set(conversation.conversationId, clone(conversation));\n    };\n}"
        ],
        "methods": [
          {
            "name": "getById",
            "signature": "async getById(conversationId: ConversationId): Promise<Conversation | undefined> {\n        const conversation = this.conversations.get(conversationId);\n        return conversation === undefined ? undefined : clone(conversation);\n    }",
            "description": "Loads one persisted record by id for InMemoryConversationRepository.",
            "parameters": [
              {
                "name": "conversationId",
                "type": "ConversationId",
                "description": "Identifier used by InMemoryConversationRepository.getById to locate the conversation record.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<Conversation | undefined>",
              "description": "InMemoryConversationRepository.getById resolves with Conversation | undefined."
            }
          },
          {
            "name": "save",
            "signature": "async save(conversation: Conversation): Promise<void> {\n        this.conversations.set(conversation.conversationId, clone(conversation));\n    }",
            "description": "Persists a runtime record for InMemoryConversationRepository.",
            "parameters": [
              {
                "name": "conversation",
                "type": "Conversation",
                "description": "Conversation record active in the current context passed to InMemoryConversationRepository.save.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "InMemoryConversationRepository.save resolves with void."
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
        "purpose": "InMemoryConversationStateRepository is the persistence port for in memory conversation state records.",
        "usage": "Use InMemoryConversationStateRepository from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export class InMemoryConversationStateRepository implements ConversationStateRepository {\n  async getByConversationId(conversationId: ConversationId): Promise<ConversationState | undefined> {\n        const state = this.states.get(conversationId);\n        return state === undefined ? undefined : clone(state);\n    };\n  async save(state: ConversationState): Promise<void> {\n        this.states.set(state.conversationId, clone(state));\n    };\n}"
        ],
        "methods": [
          {
            "name": "getByConversationId",
            "signature": "async getByConversationId(conversationId: ConversationId): Promise<ConversationState | undefined> {\n        const state = this.states.get(conversationId);\n        return state === undefined ? undefined : clone(state);\n    }",
            "description": "Loads state for one conversation for InMemoryConversationStateRepository.",
            "parameters": [
              {
                "name": "conversationId",
                "type": "ConversationId",
                "description": "Identifier used by InMemoryConversationStateRepository.getByConversationId to locate the conversation record.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationState | undefined>",
              "description": "InMemoryConversationStateRepository.getByConversationId resolves with ConversationState | undefined."
            }
          },
          {
            "name": "save",
            "signature": "async save(state: ConversationState): Promise<void> {\n        this.states.set(state.conversationId, clone(state));\n    }",
            "description": "Persists a runtime record for InMemoryConversationStateRepository.",
            "parameters": [
              {
                "name": "state",
                "type": "ConversationState",
                "description": "Conversation state active in the current context passed to InMemoryConversationStateRepository.save.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "InMemoryConversationStateRepository.save resolves with void."
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
        "purpose": "InMemoryConversationEventRepository is the persistence port for in memory conversation event records.",
        "usage": "Use InMemoryConversationEventRepository from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export class InMemoryConversationEventRepository implements ConversationEventRepository {\n  async append(events: ConversationEvent[]): Promise<void> {\n        this.events.push(...events.map((event) => clone(event)));\n    };\n  async listByConversationId(conversationId: ConversationId): Promise<ConversationEvent[]> {\n        return this.events\n            .filter((event) => event.conversationId === conversationId)\n            .map((event) => clone(event));\n    };\n}"
        ],
        "methods": [
          {
            "name": "append",
            "signature": "async append(events: ConversationEvent[]): Promise<void> {\n        this.events.push(...events.map((event) => clone(event)));\n    }",
            "description": "Appends event records without replacing existing events for InMemoryConversationEventRepository.",
            "parameters": [
              {
                "name": "events",
                "type": "ConversationEvent[]",
                "description": "Events emitted and committed during the turn passed to InMemoryConversationEventRepository.append.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "InMemoryConversationEventRepository.append resolves with void."
            }
          },
          {
            "name": "listByConversationId",
            "signature": "async listByConversationId(conversationId: ConversationId): Promise<ConversationEvent[]> {\n        return this.events\n            .filter((event) => event.conversationId === conversationId)\n            .map((event) => clone(event));\n    }",
            "description": "Lists persisted records for one conversation for InMemoryConversationEventRepository.",
            "parameters": [
              {
                "name": "conversationId",
                "type": "ConversationId",
                "description": "Identifier used by InMemoryConversationEventRepository.listByConversationId to locate the conversation record.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<ConversationEvent[]>",
              "description": "InMemoryConversationEventRepository.listByConversationId resolves with ConversationEvent[]."
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
        "purpose": "InMemoryDecisionTraceRepository is the persistence port for in memory decision trace records.",
        "usage": "Use InMemoryDecisionTraceRepository from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export class InMemoryDecisionTraceRepository implements DecisionTraceRepository {\n  async save(trace: DecisionTrace): Promise<void> {\n        this.traces.push(clone(trace));\n    };\n  async listByConversationId(conversationId: ConversationId): Promise<DecisionTrace[]> {\n        return this.traces\n            .filter((trace) => trace.conversationId === conversationId)\n            .map((trace) => clone(trace));\n    };\n}"
        ],
        "methods": [
          {
            "name": "save",
            "signature": "async save(trace: DecisionTrace): Promise<void> {\n        this.traces.push(clone(trace));\n    }",
            "description": "Persists a runtime record for InMemoryDecisionTraceRepository.",
            "parameters": [
              {
                "name": "trace",
                "type": "DecisionTrace",
                "description": "Trace parameter for InMemoryDecisionTraceRepository.save: DecisionTrace.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<void>",
              "description": "InMemoryDecisionTraceRepository.save resolves with void."
            }
          },
          {
            "name": "listByConversationId",
            "signature": "async listByConversationId(conversationId: ConversationId): Promise<DecisionTrace[]> {\n        return this.traces\n            .filter((trace) => trace.conversationId === conversationId)\n            .map((trace) => clone(trace));\n    }",
            "description": "Lists persisted records for one conversation for InMemoryDecisionTraceRepository.",
            "parameters": [
              {
                "name": "conversationId",
                "type": "ConversationId",
                "description": "Identifier used by InMemoryDecisionTraceRepository.listByConversationId to locate the conversation record.",
                "required": true
              }
            ],
            "returns": {
              "type": "Promise<DecisionTrace[]>",
              "description": "InMemoryDecisionTraceRepository.listByConversationId resolves with DecisionTrace[]."
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
        "purpose": "Creates the default RuntimeClock implementation that returns Date.toISOString() timestamps.",
        "usage": "Use createDefaultClock from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export function createDefaultClock(): RuntimeClock;"
        ],
        "fields": [],
        "parameters": [],
        "returns": {
          "type": "RuntimeClock",
          "description": "createDefaultClock returns a RuntimeClock."
        },
        "example": "const clock = createDefaultClock();\nconst timestamp = clock.now();",
        "related": [
          "RuntimeClock"
        ]
      },
      {
        "name": "createDefaultIdGenerator",
        "kind": "function",
        "purpose": "Creates the default incremental IdGenerator that emits stable prefixes for runtime-created ids.",
        "usage": "Use createDefaultIdGenerator from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export function createDefaultIdGenerator(): IdGenerator;"
        ],
        "fields": [],
        "parameters": [],
        "returns": {
          "type": "IdGenerator",
          "description": "createDefaultIdGenerator returns an IdGenerator."
        },
        "example": "const ids = createDefaultIdGenerator();\nconst conversationId = ids.newConversationId();",
        "related": [
          "IdGenerator"
        ]
      },
      {
        "name": "createEventFactory",
        "kind": "function",
        "purpose": "Binds a clock and id generator to an EventFactory so repeated event creation stays deterministic in tests.",
        "usage": "Use createEventFactory from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export function createEventFactory(\n    clock: RuntimeClock = createDefaultClock(),\n    idGenerator: IdGenerator = createDefaultIdGenerator()\n): EventFactory;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "clock",
            "type": "RuntimeClock",
            "description": "Clock implementation used for all runtime timestamps passed to createEventFactory.",
            "required": false
          },
          {
            "name": "idGenerator",
            "type": "IdGenerator",
            "description": "Id generator used for runtime-created ids passed to createEventFactory.",
            "required": false
          }
        ],
        "returns": {
          "type": "EventFactory",
          "description": "createEventFactory returns an EventFactory."
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
        "purpose": "Creates a ConversationEvent with a generated eventId, current timestamp, and optional turn, step, payload, and metadata.",
        "usage": "Use createEvent from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export function createEvent(\n    request: CreateEventRequest,\n    clock: RuntimeClock = createDefaultClock(),\n    idGenerator: IdGenerator = createDefaultIdGenerator()\n): ConversationEvent;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "request",
            "type": "CreateEventRequest",
            "description": "Request payload for createEvent: CreateEventRequest.",
            "required": true
          },
          {
            "name": "clock",
            "type": "RuntimeClock",
            "description": "Clock implementation used for all runtime timestamps passed to createEvent.",
            "required": false
          },
          {
            "name": "idGenerator",
            "type": "IdGenerator",
            "description": "Id generator used for runtime-created ids passed to createEvent.",
            "required": false
          }
        ],
        "returns": {
          "type": "ConversationEvent",
          "description": "createEvent returns a ConversationEvent."
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
        "purpose": "Creates a text OutboundMessage with a generated messageId, current timestamp, channel, response id, and metadata.",
        "usage": "Use createTextMessage from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export function createTextMessage(\n    request: CreateTextMessageRequest,\n    clock: RuntimeClock = createDefaultClock(),\n    idGenerator: IdGenerator = createDefaultIdGenerator()\n): OutboundMessage;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "request",
            "type": "CreateTextMessageRequest",
            "description": "Request payload for createTextMessage: CreateTextMessageRequest.",
            "required": true
          },
          {
            "name": "clock",
            "type": "RuntimeClock",
            "description": "Clock implementation used for all runtime timestamps passed to createTextMessage.",
            "required": false
          },
          {
            "name": "idGenerator",
            "type": "IdGenerator",
            "description": "Id generator used for runtime-created ids passed to createTextMessage.",
            "required": false
          }
        ],
        "returns": {
          "type": "OutboundMessage",
          "description": "createTextMessage returns an OutboundMessage."
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
        "purpose": "Builds a DecisionTrace from collected turn fragments, events, messages, variable changes, and optional diagnostic records.",
        "usage": "Use createTrace from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export function createTrace(\n    input: TraceBuildInput,\n    clock: RuntimeClock = createDefaultClock(),\n    idGenerator: IdGenerator = createDefaultIdGenerator()\n): DecisionTrace;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "input",
            "type": "TraceBuildInput",
            "description": "Input value consumed by createTrace: TraceBuildInput.",
            "required": true
          },
          {
            "name": "clock",
            "type": "RuntimeClock",
            "description": "Clock implementation used for all runtime timestamps passed to createTrace.",
            "required": false
          },
          {
            "name": "idGenerator",
            "type": "IdGenerator",
            "description": "Id generator used for runtime-created ids passed to createTrace.",
            "required": false
          }
        ],
        "returns": {
          "type": "DecisionTrace",
          "description": "createTrace returns a DecisionTrace."
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
        "purpose": "Creates a structured MissingVariableReferenceRuntimeError for helper calls that require an absent variable.",
        "usage": "Use createMissingVariableError from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export function createMissingVariableError(\n    variableId: VariableId,\n    scope: VariableScope = defaultVariableScope\n): MissingVariableReferenceRuntimeError;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "variableId",
            "type": "VariableId",
            "description": "Identifier used by createMissingVariableError to locate the variable record.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "Variable namespace used to separate conversation, flow, operation, and system values passed to createMissingVariableError.",
            "required": false
          }
        ],
        "returns": {
          "type": "MissingVariableReferenceRuntimeError",
          "description": "createMissingVariableError returns a MissingVariableReferenceRuntimeError."
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
        "purpose": "Looks up a variable value from conversation state using the requested scope and returns an ok/error result.",
        "usage": "Use getVariable from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export function getVariable(\n    state: RuntimeVariableState,\n    variableId: VariableId,\n    scope: VariableScope = defaultVariableScope\n): VariableLookupResult;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "state",
            "type": "RuntimeVariableState",
            "description": "Conversation state active in the current context passed to getVariable.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "VariableId",
            "description": "Identifier used by getVariable to locate the variable record.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "Variable namespace used to separate conversation, flow, operation, and system values passed to getVariable.",
            "required": false
          }
        ],
        "returns": {
          "type": "VariableLookupResult",
          "description": "getVariable returns a VariableLookupResult."
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
        "purpose": "Reads a variable value from conversation state and throws a missing-variable runtime error when it is absent.",
        "usage": "Use requireVariable from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export function requireVariable(\n    state: RuntimeVariableState,\n    variableId: VariableId,\n    scope: VariableScope = defaultVariableScope\n): VariableValue;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "state",
            "type": "RuntimeVariableState",
            "description": "Conversation state active in the current context passed to requireVariable.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "VariableId",
            "description": "Identifier used by requireVariable to locate the variable record.",
            "required": true
          },
          {
            "name": "scope",
            "type": "VariableScope",
            "description": "Variable namespace used to separate conversation, flow, operation, and system values passed to requireVariable.",
            "required": false
          }
        ],
        "returns": {
          "type": "VariableValue",
          "description": "requireVariable returns a VariableValue."
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
        "purpose": "Writes a variable value into conversation state and returns the VariablePatch that records the mutation.",
        "usage": "Use setVariable from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export function setVariable(\n    state: RuntimeVariableState,\n    variableId: VariableId,\n    value: unknown,\n    source: VariableValueSource,\n    options?: {\n        scope?: VariableScope;\n        metadata?: Record<string, unknown>;\n        clock?: RuntimeClock;\n        turnId?: TurnId;\n    }\n): VariablePatch;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "state",
            "type": "RuntimeVariableState",
            "description": "Conversation state active in the current context passed to setVariable.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "VariableId",
            "description": "Identifier used by setVariable to locate the variable record.",
            "required": true
          },
          {
            "name": "value",
            "type": "unknown",
            "description": "Candidate or stored value consumed by setVariable: unknown.",
            "required": true
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Origin recorded for a variable write, trace fragment, event, or candidate passed to setVariable.",
            "required": true
          },
          {
            "name": "options",
            "type": "{\n        scope?: VariableScope;\n        metadata?: Record<string, unknown>;\n        clock?: RuntimeClock;\n        turnId?: TurnId;\n    }",
            "description": "Options parameter for setVariable: { scope?: VariableScope; metadata?: Record<string, unknown>; clock?: RuntimeClock; turnId?: TurnId; }.",
            "required": false
          }
        ],
        "returns": {
          "type": "VariablePatch",
          "description": "setVariable returns a VariablePatch."
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
        "purpose": "Removes a variable value from conversation state and returns the VariablePatch that records the removal.",
        "usage": "Use unsetVariable from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export function unsetVariable(\n    state: RuntimeVariableState,\n    variableId: VariableId,\n    source: VariableValueSource,\n    options?: {\n        scope?: VariableScope;\n        metadata?: Record<string, unknown>;\n        clock?: RuntimeClock;\n        turnId?: TurnId;\n    }\n): VariablePatch;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "state",
            "type": "RuntimeVariableState",
            "description": "Conversation state active in the current context passed to unsetVariable.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "VariableId",
            "description": "Identifier used by unsetVariable to locate the variable record.",
            "required": true
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Origin recorded for a variable write, trace fragment, event, or candidate passed to unsetVariable.",
            "required": true
          },
          {
            "name": "options",
            "type": "{\n        scope?: VariableScope;\n        metadata?: Record<string, unknown>;\n        clock?: RuntimeClock;\n        turnId?: TurnId;\n    }",
            "description": "Options parameter for unsetVariable: { scope?: VariableScope; metadata?: Record<string, unknown>; clock?: RuntimeClock; turnId?: TurnId; }.",
            "required": false
          }
        ],
        "returns": {
          "type": "VariablePatch",
          "description": "unsetVariable returns a VariablePatch."
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
        "purpose": "Marks a variable value invalid in conversation state and returns the VariablePatch that records the reason.",
        "usage": "Use invalidateVariable from dialit/runtime-support for local tests, examples, prototypes, and small in-memory demos.",
        "signatures": [
          "export function invalidateVariable(\n    state: RuntimeVariableState,\n    variableId: VariableId,\n    source: VariableValueSource,\n    reason?: string,\n    options?: {\n        scope?: VariableScope;\n        metadata?: Record<string, unknown>;\n        clock?: RuntimeClock;\n        turnId?: TurnId;\n    }\n): VariablePatch;"
        ],
        "fields": [],
        "parameters": [
          {
            "name": "state",
            "type": "RuntimeVariableState",
            "description": "Conversation state active in the current context passed to invalidateVariable.",
            "required": true
          },
          {
            "name": "variableId",
            "type": "VariableId",
            "description": "Identifier used by invalidateVariable to locate the variable record.",
            "required": true
          },
          {
            "name": "source",
            "type": "VariableValueSource",
            "description": "Origin recorded for a variable write, trace fragment, event, or candidate passed to invalidateVariable.",
            "required": true
          },
          {
            "name": "reason",
            "type": "string",
            "description": "Reason text stored for invalidation, handoff, or controlled termination passed to invalidateVariable.",
            "required": false
          },
          {
            "name": "options",
            "type": "{\n        scope?: VariableScope;\n        metadata?: Record<string, unknown>;\n        clock?: RuntimeClock;\n        turnId?: TurnId;\n    }",
            "description": "Options parameter for invalidateVariable: { scope?: VariableScope; metadata?: Record<string, unknown>; clock?: RuntimeClock; turnId?: TurnId; }.",
            "required": false
          }
        ],
        "returns": {
          "type": "VariablePatch",
          "description": "invalidateVariable returns a VariablePatch."
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
        "purpose": "EntityId aliases the entity id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use EntityId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for entity id.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "FlowId",
        "kind": "type",
        "purpose": "FlowId aliases the flow id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use FlowId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for flow id.",
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
        "purpose": "FlowVersionId aliases the flow version id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use FlowVersionId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for flow version id.",
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
        "purpose": "StepId aliases the step id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use StepId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for step id.",
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
        "purpose": "RouteId aliases the route id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use RouteId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for route id.",
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
        "purpose": "BranchId aliases the branch id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use BranchId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for branch id.",
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
        "purpose": "OptionId aliases the option id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use OptionId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for option id.",
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
        "purpose": "VariableId aliases the variable id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use VariableId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for variable id.",
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
        "purpose": "ActionId aliases the action id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use ActionId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for action id.",
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
        "purpose": "ResponseId aliases the response id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use ResponseId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for response id.",
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
        "purpose": "OperationId aliases the operation id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use OperationId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for operation id.",
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
        "purpose": "EventId aliases the event id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use EventId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for event id.",
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
        "purpose": "ConversationId aliases the conversation id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use ConversationId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for conversation id.",
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
        "purpose": "TurnId aliases the turn id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use TurnId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for turn id.",
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
        "purpose": "MessageId aliases the message id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use MessageId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for message id.",
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
        "purpose": "TraceId aliases the trace id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use TraceId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for trace id.",
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
        "purpose": "ValidationIssueId aliases the validation issue id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use ValidationIssueId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for validation issue id.",
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
        "purpose": "CandidateId aliases the candidate id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use CandidateId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for candidate id.",
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
        "purpose": "TaskId aliases the task id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use TaskId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for task id.",
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
        "purpose": "AttachmentId aliases the attachment id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use AttachmentId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for attachment id.",
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
        "purpose": "ExecutionFrameId aliases the execution frame id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use ExecutionFrameId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for execution frame id.",
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
        "purpose": "CustomOperationId aliases the custom operation id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use CustomOperationId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for custom operation id.",
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
        "purpose": "HandoffId aliases the handoff id value shape used by primitive ids and shared base types integrations.",
        "usage": "Use HandoffId to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for handoff id.",
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
        "purpose": "ISODateString aliases the isodate string value shape used by primitive ids and shared base types integrations.",
        "usage": "Use ISODateString to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for isodate string.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "JsonPrimitive",
        "kind": "union type",
        "purpose": "JsonPrimitive enumerates the allowed json primitive values accepted by primitive ids and shared base types.",
        "usage": "Use JsonPrimitive to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for json primitive.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "JsonValue",
        "kind": "union type",
        "purpose": "JsonValue enumerates the allowed json value values accepted by primitive ids and shared base types.",
        "usage": "Use JsonValue to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for json value.",
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
        "purpose": "JsonObject carries the value shape shown in its signature for primitive ids and shared base types.",
        "usage": "Use JsonObject to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for json object.",
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
        "purpose": "Metadata carries the value shape shown in its signature for primitive ids and shared base types.",
        "usage": "Use Metadata to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for metadata.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "LabelledEntity",
        "kind": "interface",
        "purpose": "LabelledEntity carries label, description, and metadata for primitive ids and shared base types.",
        "usage": "Use LabelledEntity to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Short human label for labelled entity in authoring tools, menus, reports, or API displays.",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "description": "Longer author notes explaining the intent of labelled entity for maintainers and tooling.",
            "required": false
          },
          {
            "name": "metadata",
            "type": "Metadata",
            "description": "Opaque application metadata preserved on labelled entity for adapters, analytics, audits, or tests.",
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
        "purpose": "ConversationStatus enumerates the allowed conversation status values accepted by primitive ids and shared base types.",
        "usage": "Use ConversationStatus to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "ConversationStatus accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "FlowVersionStatus",
        "kind": "union type",
        "purpose": "FlowVersionStatus enumerates the allowed flow version status values accepted by primitive ids and shared base types.",
        "usage": "Use FlowVersionStatus to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "FlowVersionStatus accepts the literal values listed in its signature and rejects values outside that set at type-check time.",
            "required": true
          }
        ],
        "related": []
      },
      {
        "name": "StepOutcome",
        "kind": "type",
        "purpose": "StepOutcome aliases the step outcome value shape used by primitive ids and shared base types integrations.",
        "usage": "Use StepOutcome to keep ids, JSON values, metadata, status values, and labels explicit in integration code.",
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
            "description": "Underlying payload stored, compared, normalized, or returned for step outcome.",
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
