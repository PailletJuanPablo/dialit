export interface NavigationItem {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

export interface TextBlock {
  readonly title: string;
  readonly copy: string;
}

export interface FeatureSection {
  readonly title: string;
  readonly copy: string;
  readonly items: readonly string[];
  readonly contracts: readonly string[];
  readonly evidence: string;
  readonly apiHref: string;
}

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

export interface TutorialBuildChapter {
  readonly id: string;
  readonly title: string;
  readonly goal: string;
  readonly adds: readonly string[];
  readonly implementations: readonly TutorialImplementation[];
  readonly trace: readonly string[];
}

export interface TutorialDocPage {
  readonly slug: string;
  readonly group: string;
  readonly title: string;
  readonly summary: string;
  readonly objective: string;
  readonly adds: readonly string[];
  readonly codeSections: readonly TutorialImplementation[];
  readonly checks: readonly string[];
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

export const repositoryHref = "https://github.com/PailletJuanPablo/dialit";

export { allPublicApiExports, apiNavigation, apiReferenceGroups } from "./api-reference-content";

export const siteNavigation: readonly NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Tutorial", href: "/tutorial" },
  { label: "API", href: "/api" },
  { label: "GitHub", href: repositoryHref, external: true },
];

export const homePage = {
  hero: {
    title: "Dialit",
    headline: "Explicit conversational workflows for TypeScript.",
    subtitle:
      "Build deterministic and LLM-assisted chatbot flows with typed steps, branches, operations, variables, actions, and full decision traces.",
  },
  proofPoints: ["ESM package", "Node.js 20+", "TypeScript contracts", "Runtime traces"],
  productSections: [
    {
      title: "Your flow is structured data, not prompt folklore.",
      copy:
        "Dialit keeps the executable conversation in FlowVersion objects. Steps, routes, branches, operations, variables, responses, actions, events, and traces stay inspectable.",
    },
    {
      title: "LLMs are useful, but bounded.",
      copy:
        "SemanticInputTask can classify user input inside declared outcomes. GeneratedResponsePlan can write text from approved variables. Neither can silently mutate state.",
    },
    {
      title: "Every turn leaves evidence.",
      copy:
        "Runtime results expose messages, state, events, variable patches, action results, LLM usage, and DecisionTrace fragments for tests and debugging.",
    },
  ] satisfies readonly TextBlock[],
  concepts: [
    { title: "FlowVersion", copy: "The deployable workflow definition executed by the runtime." },
    { title: "StepDefinition", copy: "A meaningful conversational state: message, menu, input, attachment, condition, end, or custom." },
    { title: "StepBranch", copy: "The explicit path selected by an outcome, option, action result, flow call, or handoff." },
    { title: "StepOperation", copy: "A reusable effect such as send message, set variable, run action, call flow, handoff, or custom logic." },
    { title: "ConversationState", copy: "The persisted cursor, variables, pending input, history, and flow stack." },
    { title: "DecisionTrace", copy: "The explanation of what happened in a turn and why." },
  ] satisfies readonly TextBlock[],
  useCases: [
    "Customer support",
    "Billing classification",
    "Technical troubleshooting",
    "Attachment collection",
    "Human handoff",
    "Lead qualification",
    "Internal assistants",
    "LLM-assisted intake",
  ],
};

export const featuresPage = {
  intro: {
    title: "Features that keep conversations understandable.",
    copy: "Dialit gives you a clear workflow runtime: declare the path, run it, and inspect what happened.",
  },
  highlights: [
    {
      title: "Design the flow",
      copy: "Model messages, menus, inputs, branches, actions, and endings as versioned workflow data.",
    },
    {
      title: "Run each turn",
      copy: "Start a conversation, receive user input, choose the next path, and return messages for your UI.",
    },
    {
      title: "Use AI with limits",
      copy: "Let AI classify intent or draft text only inside the outcomes and variables you approve.",
    },
    {
      title: "Debug without guessing",
      copy: "Every turn returns the selected path, variable changes, events, and trace details.",
    },
  ],
  bullets: [
    "Versioned assistant flows",
    "Typed menus and inputs",
    "Explicit routing and branching",
    "Action handlers for external work",
    "Optional AI classification and replies",
    "Conversation state and trace output",
  ],
  workflow: [
    "Declare the assistant flow.",
    "Validate it before publishing.",
    "Run it through the engine or API adapter.",
    "Render messages and choices in your app.",
  ],
};

export const featureSections: readonly FeatureSection[] = [
  feature("Versioned Flow Definitions", "Dialit executes versioned flow definitions as typed data that can be validated, executed, inspected, tested, and published.", ["Deployable workflow definitions", "Reviewable changes", "Runtime-ready data"], ["FlowVersion", "ConversationFlowDefinition", "FlowSettings"], "README minimal flow and reference scenarios.", "/api/flow-model/conversation-flow-definition"),
  feature("Typed Steps", "Each step represents a meaningful conversational state with a known runtime contract.", ["Message", "Menu", "Input", "Attachment", "Condition", "End", "Custom"], ["StepDefinition", "MessageStepDefinition", "MenuStepDefinition", "InputStepDefinition", "AttachmentStepDefinition", "ConditionStepDefinition", "EndStepDefinition", "CustomStepDefinition"], "Reference scenarios cover built-in and custom step behavior.", "/api/steps/step-definition"),
  feature("Routes, Branches, and Targets", "Outcomes map to branches. Branches run operations and choose the next target.", ["Outcome routes", "Always routes", "Stay targets", "End targets"], ["StepRoute", "RouteMatch", "StepBranch", "StepTarget"], "Route and branch behavior is asserted across integration scenarios.", "/api/branches-routes-and-targets/step-branch"),
  feature("Operations", "Operations are reusable effects inside branches and lifecycle hooks.", ["send_message", "set_variable", "run_action", "emit_event", "call_flow", "handoff", "custom"], ["StepOperation", "SendMessageOperation", "SetVariableOperation", "RunActionOperation", "CallFlowOperation", "HandoffOperation", "CustomOperation"], "Operation behavior is covered by integration and reference tests.", "/api/operations/step-operation"),
  feature("Actions as Operations", "External work runs through action contracts and RunActionOperation output mapping.", ["Input mapping", "Output mapping", "Result branches"], ["ActionDefinition", "ActionResult", "ActionHandler", "RunActionOperation"], "Action result branching and output mapping are covered by runtime tests.", "/api/actions-and-custom-operations/action-definition"),
  feature("Input Processing", "InputStep starts deterministic: normalize, extract, validate, save, reject, or classify.", ["Normalizers", "Extractors", "Validators", "Invalid behavior", "Unknown input"], ["InputContract", "InputBinding", "NormalizerDefinition", "ExtractorDefinition", "ValidatorDefinition", "InvalidInputBehavior"], "Missing-capabilities and reference tests cover input validation and retries.", "/api/input-processing/input-contract"),
  feature("Semantic Input", "SemanticInputTask lets an LLM classify or interpret text only within declared outcomes and variables.", ["Allowed outcomes", "Allowed variables", "Thresholds", "Trace records"], ["SemanticInputTask", "SemanticInputResolver", "SemanticInputResolution"], "Semantic classification tests assert disallowed outputs are rejected.", "/api/input-processing/semantic-input-task"),
  feature("Responses and Generation", "Responses can be static, templated, referenced, or generated with constrained variables.", ["Static text", "Templates", "Generated replies", "Fallback text"], ["ResponsePlan", "StaticResponsePlan", "TemplateResponsePlan", "GeneratedResponsePlan", "LlmResponseGenerator"], "Generated response tests cover allowed-variable restrictions.", "/api/responses/generated-response-plan"),
  feature("Conditions", "Business routing belongs in ConditionStep so decisions stay visible and traceable.", ["Equality", "Existence", "Comparison", "Regex", "Boolean composition"], ["ConditionExpression", "ConditionStepDefinition", "ConditionBranch", "ConditionEvaluationResult"], "Condition routing is covered by reference scenarios.", "/api/conditions/condition-expression"),
  feature("Variables and State", "Variables are declared state. Runtime writes are patches visible in events, traces, and history.", ["Scopes", "Sensitive values", "History", "Snapshots"], ["VariableDefinition", "VariableValue", "VariablePatch", "VariableStoreSnapshot", "ConversationState"], "Variable scope and history behavior is covered by tests.", "/api/variables-and-value-expressions/variable-definition"),
  feature("Flow Calls", "CallFlowOperation composes reusable conversational modules while controlling variable sharing.", ["Identity verification", "Contact details", "Survey flows"], ["CallFlowOperation", "FlowCallVariableSharing", "FlowCallResult", "FlowExecutionFrame"], "Flow-call tests cover scoped isolation and child-flow resume behavior.", "/api/operations/call-flow-operation"),
  feature("Human Handoff", "Handoff is an explicit workflow effect with outcomes, metadata, and trace records.", ["Agent queue", "Handoff id", "Final handoff status"], ["HandoffOperation", "HandoffResult", "HandoffResultBranch", "HandoffOutcomeMatch"], "Handoff behavior is covered by reference and integration tests.", "/api/operations/handoff-operation"),
  feature("Events and Decision Traces", "Every turn can explain input, active step, selected branch, patches, action results, LLM usage, and messages.", ["ConversationEvent", "TraceFragment", "Variable patches", "LLM usage"], ["ConversationEvent", "DecisionTrace", "TraceFragment", "LlmUsageRecord"], "Trace assertions appear throughout runtime tests.", "/api/events-and-traces/decision-trace"),
  feature("Runtime API and API Adapter", "Use the engine directly or wrap it with transport-neutral request and response DTOs.", ["startConversation", "processUserInput", "api.start", "api.sendMessage"], ["createConversationEngine", "ConversationEngine", "ProcessTurnResult", "createConversationApi", "ConversationApi"], "API adapter tests cover endpoint-friendly DTOs.", "/api/engine-and-api-adapter/create-conversation-api"),
  feature("Persistence and Runtime Support", "Production apps provide repositories; runtime-support provides in-memory helpers for tests and prototypes.", ["Repository interfaces", "In-memory repositories", "Clock", "IDs", "Message helpers"], ["ConversationEngineRepositories", "FlowVersionRepository", "InMemoryFlowVersionRepository", "createDefaultClock", "createTextMessage"], "Repository injection is covered by persistence tests.", "/api/persistence/conversation-engine-repositories"),
  feature("Extensibility", "Extend through handlers and providers instead of forking the runtime.", ["Custom steps", "Custom operations", "Validators", "Resolvers", "Action handlers", "LLM providers"], ["StepHandler", "OperationHandler", "Validator", "Resolver", "ActionHandler", "SemanticInputResolver", "LlmResponseGenerator"], "Custom operation and custom step examples use public extension contracts.", "/api/extension-contracts/step-handler"),
  feature("Validation and Errors", "Validate before publishing and handle typed runtime failures when dependencies are missing.", ["Validation reports", "Runtime errors", "No silent fallback"], ["validateFlowDefinition", "FlowValidationReport", "RuntimeError", "MissingStepHandlerRuntimeError"], "Model validation and no-silent-fallback tests cover failures.", "/api/validation-and-inspection/validate-flow-definition"),
];

export const featureMatrix = featureSections.map((section) => [section.title, "Supported"] as const);

export const tutorialChapters = [
  "Mental Model",
  "First Flow",
  "Add a Menu",
  "Store Variables",
  "Validate Input",
  "Handle Invalid Input",
  "Run Actions",
  "Route with ConditionStep",
  "Classify Input with SemanticInputTask",
  "Generate Responses",
  "Handle Attachments",
  "Call Another Flow",
  "Add Human Handoff",
  "Add a Custom Operation",
  "Add a Custom Step",
  "Persist Conversations",
  "Inspect Traces",
  "Final Assistant",
] as const;

const tutorialAdditions: Record<(typeof tutorialChapters)[number], readonly string[]> = {
  "Mental Model": ["Flow", "Step", "Outcome", "Branch", "Operation", "DecisionTrace"],
  "First Flow": ["ConversationFlowDefinition", "FlowVersion", "MessageStep", "validateFlowDefinition"],
  "Add a Menu": ["MenuStep", "MenuOption", "StepBranch"],
  "Store Variables": ["VariableDefinition", "SetVariableOperation", "VariablePatch"],
  "Validate Input": ["InputStepDefinition", "InputContract", "ValidatorDefinition"],
  "Handle Invalid Input": ["InvalidInputBehavior", "Stay target", "Retry message"],
  "Run Actions": ["ActionDefinition", "RunActionOperation", "ActionHandler"],
  "Route with ConditionStep": ["ConditionStep", "ConditionExpression", "ConditionBranch"],
  "Classify Input with SemanticInputTask": ["SemanticInputTask", "SemanticInputResolver", "Allowed outcomes"],
  "Generate Responses": ["GeneratedResponsePlan", "LlmResponseGenerator", "Fallback text"],
  "Handle Attachments": ["AttachmentStepDefinition", "AttachmentRules", "AttachmentInput"],
  "Call Another Flow": ["CallFlowOperation", "FlowCallVariableSharing", "FlowExecutionFrame"],
  "Add Human Handoff": ["HandoffOperation", "HandoffResult", "Handoff status"],
  "Add a Custom Operation": ["CustomOperationDefinition", "CustomOperation", "Custom operation handler"],
  "Add a Custom Step": ["CustomStepDefinition", "StepHandler", "createTextMessage"],
  "Persist Conversations": ["ConversationEngineRepositories", "In-memory repositories", "Repository interfaces"],
  "Inspect Traces": ["ConversationEvent", "DecisionTrace", "TraceFragment"],
  "Final Assistant": ["FlowVersion", "ConversationEngine", "DecisionTrace", "GeneratedResponsePlan"],
};

export const tutorialPages: readonly TutorialDocPage[] = [
  tutorialPage("getting-started", "Start", "Getting started with Dialit", "Get oriented before building the tutorial assistant.", ["Workflow model", "Tutorial path", "Runtime evidence"]),
  tutorialPage("install-and-imports", "Start", "Install and import Dialit", "Install the package and import only public entry points.", ["dialit", "dialit/runtime-support", "Node.js 20+"]),
  tutorialPage("minimal-flow-version", "Start", "Create your first flow", "Define the smallest executable support assistant flow.", ["Flow version metadata", "Welcome message", "Start step"]),
  tutorialPage("run-the-engine", "Runtime", "Run the first conversation", "Validate the flow and start a conversation.", ["Runtime engine", "Validation report", "First messages"]),
  tutorialPage("api-adapter", "Runtime", "Expose the flow through an API", "Use the API adapter for endpoint-friendly request and response objects.", ["API adapter", "HTTP response shape", "Menu choices"]),
  tutorialPage("add-a-menu", "Flow", "Add a main menu", "Route the user into technical support, billing, or agent contact.", ["MenuStepDefinition", "MenuOption", "StepBranch"]),
  tutorialPage("store-variables", "Flow", "Store conversation variables", "Declare variables and update them through explicit operations.", ["VariableDefinition", "SetVariableOperation", "VariablePatch"]),
  tutorialPage("validate-input", "Input", "Validate user input", "Capture an account email through deterministic input contracts.", ["InputStepDefinition", "InputContract", "ValidatorDefinition"]),
  tutorialPage("handle-invalid-input", "Input", "Handle invalid input", "Keep invalid input as explicit conversational control flow.", ["InvalidInputBehavior", "Stay target", "Retry message"]),
  tutorialPage("run-actions", "Operations", "Run actions from branches", "Execute external work through RunActionOperation and action handlers.", ["ActionDefinition", "RunActionOperation", "ActionHandler"]),
  tutorialPage("route-with-condition-step", "Operations", "Route with ConditionStep", "Keep business routing in visible condition branches.", ["ConditionStepDefinition", "ConditionExpression", "ConditionBranch"]),
  tutorialPage("classify-input-with-semantic-task", "LLM", "Classify input with SemanticInputTask", "Use constrained semantic interpretation for billing text.", ["SemanticInputTask", "SemanticInputResolver", "LlmUsageRecord"]),
  tutorialPage("generate-responses", "LLM", "Generate constrained responses", "Use GeneratedResponsePlan and an LLM response generator.", ["GeneratedResponsePlan", "LlmResponseGenerator", "Fallback text"]),
  tutorialPage("handle-attachments", "Input", "Handle attachments", "Validate uploaded file references against attachment rules.", ["AttachmentStepDefinition", "AttachmentRules", "AttachmentInput"]),
  tutorialPage("call-another-flow", "Composition", "Call another flow", "Compose reusable conversational modules with CallFlowOperation.", ["CallFlowOperation", "FlowCallVariableSharing", "FlowExecutionFrame"]),
  tutorialPage("add-human-handoff", "Composition", "Add human handoff", "Model human escalation as an explicit workflow path.", ["HandoffOperation", "HandoffResult", "handoff status"]),
  tutorialPage("add-a-custom-operation", "Extension", "Add a custom operation", "Declare a custom operation contract and register a handler.", ["CustomOperationDefinition", "CustomOperation", "OperationHandler"]),
  tutorialPage("add-a-custom-step", "Extension", "Add a custom step", "Register a StepHandler for a custom interaction.", ["CustomStepDefinition", "StepHandler", "createTextMessage"]),
  tutorialPage("persist-conversations", "Runtime", "Persist conversations", "Replace in-memory repositories with repository implementations.", ["ConversationEngineRepositories", "FlowVersionRepository", "DecisionTraceRepository"]),
  tutorialPage("inspect-events-and-traces", "Runtime", "Inspect events and traces", "Read ConversationEvent and DecisionTrace after a turn.", ["ConversationEvent", "DecisionTrace", "TraceFragment"]),
  tutorialPage("final-support-assistant", "Finish", "Final support assistant", "Review the complete assistant structure and runtime setup.", ["FlowVersion", "ConversationEngine", "GeneratedResponsePlan", "DecisionTrace"]),
];

function feature(title: string, copy: string, items: readonly string[], contracts: readonly string[], evidence: string, apiHref: string): FeatureSection {
  return { title, copy, items, contracts, evidence, apiHref };
}

function tutorialImplementations(title: string): readonly TutorialImplementation[] {
  const implementations = tutorialImplementationFor(title);

  if (!implementations) {
    throw new Error(`Missing tutorial implementation content for ${title}`);
  }

  return implementations;
}

function tutorialBuildGoalFor(title: (typeof tutorialChapters)[number]): string {
  return {
    "Mental Model": "Understand the assistant as versioned workflow data: steps produce outcomes, outcomes select branches, and branches run operations.",
    "First Flow": "Create the first executable FlowVersion for support_assistant with a welcome message and a stable start step.",
    "Add a Menu": "Add the main menu that sends users to technical support, billing, or agent contact paths.",
    "Store Variables": "Declare conversation variables and write menu choices through explicit set_variable operations.",
    "Validate Input": "Capture an account email as text, normalize it, validate the format, and save it only when valid.",
    "Handle Invalid Input": "Keep invalid email input on the same step and return a useful retry message.",
    "Run Actions": "Call application code through RunActionOperation and map the action result into variables.",
    "Route with ConditionStep": "Move customer business rules into a condition step that can be inspected and traced.",
    "Classify Input with SemanticInputTask": "Use a semantic task to classify billing text inside declared outcomes.",
    "Generate Responses": "Let an LLM draft a final message only from approved variables and with a required fallback.",
    "Handle Attachments": "Collect optional file references with size and MIME rules before ticket creation.",
    "Call Another Flow": "Compose identity verification as a child flow and return to the support flow when it completes.",
    "Add Human Handoff": "Escalate through a visible handoff operation with queue, reason, and final conversation status.",
    "Add a Custom Operation": "Register application-specific work as a custom operation contract and handler.",
    "Add a Custom Step": "Add a custom survey interaction through a StepHandler instead of changing the runtime.",
    "Persist Conversations": "Replace local in-memory storage with repository implementations owned by the application.",
    "Inspect Traces": "Read events and DecisionTrace records to explain selected paths and state changes.",
    "Final Assistant": "Wire the complete support assistant with providers, handlers, repositories, and traceable paths.",
  }[title];
}

function tutorialTraceFor(title: (typeof tutorialChapters)[number]): readonly string[] {
  return {
    "Mental Model": ["A turn starts at the active step.", "The selected outcome chooses one branch.", "The returned DecisionTrace explains the branch and messages."],
    "First Flow": ["The first turn enters welcome.", "The runtime emits a message_created event.", "The state waits on the welcome step until routing is added."],
    "Add a Menu": ["The welcome outcome moves to main_menu.", "A choice input selects one optionId.", "The trace records the selected menu branch."],
    "Store Variables": ["The selected menu path writes contactReason.", "The variable patch source is menu_selection.", "The next step can read the stored variable."],
    "Validate Input": ["A valid email creates a variable patch.", "The captured outcome leaves ask_email.", "The next step receives the normalized value."],
    "Handle Invalid Input": ["Invalid text returns input_invalid.", "The target stays on ask_email.", "The retry counter increments before the next attempt."],
    "Run Actions": ["The action operation starts after email capture.", "Handler outputs write customer variables.", "The action outcome selects the next branch."],
    "Route with ConditionStep": ["The condition reads customerIsValid.", "The matching branch chooses the support path.", "The default branch handles missing or false values."],
    "Classify Input with SemanticInputTask": ["The semantic resolver receives only allowed outcomes.", "The chosen billing outcome is saved to billingArea.", "LLM usage is attached to the trace."],
    "Generate Responses": ["The generator receives only allowed variables.", "The rendered message records usedVariableIds.", "fallbackText is available if generation fails."],
    "Handle Attachments": ["Attachment metadata is validated before state changes.", "Accepted files are stored as attachmentRef.", "Rejected files stay on the attachment step."],
    "Call Another Flow": ["The parent flow pushes a child execution frame.", "Only configured variables are shared.", "The completion branch returns to evaluate_customer."],
    "Add Human Handoff": ["The handoff operation records queue and reason.", "A handoffId can be saved to state.", "The final status is handoff."],
    "Add a Custom Operation": ["The custom operation type must be declared.", "The registered handler returns an allowed outcome.", "Returned patches write declared output variables."],
    "Add a Custom Step": ["The custom step type is registered before validation.", "The StepHandler returns messages and waitState.", "The rated outcome routes back into the flow."],
    "Persist Conversations": ["The flow version is loaded from a repository.", "Conversation state is saved after each turn.", "Events and traces can be listed by conversationId."],
    "Inspect Traces": ["Events show the runtime timeline.", "Trace fragments show why the path was selected.", "Variable patches show what changed in state."],
    "Final Assistant": ["All flow versions are registered together.", "Providers own actions, semantic input, generated responses, and extensions.", "The UI renders messages and choices from the API response."],
  }[title];
}

function slugify(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const tutorialBuildChapters: readonly TutorialBuildChapter[] = tutorialChapters.map((title, index) => ({
  id: slugify(title),
  title,
  goal: tutorialBuildGoalFor(title),
  adds: tutorialAdditions[title],
  implementations: tutorialImplementations(title),
  trace: tutorialTraceFor(title),
}));

function tutorialImplementationFor(title: string): readonly TutorialImplementation[] | undefined {
  return ({
  "Mental Model": [
    { label: "Runtime model", language: "text", code: "FlowVersion -> StepDefinition -> StepOutcome -> StepBranch -> StepOperation -> ProcessTurnResult" },
    { label: "Turn result", code: "const result = await engine.processUserInput({ conversationId, input });\n\nresult.messages;\nresult.state.currentStepId;\nresult.events;\nresult.trace.fragments;" },
  ],
  "First Flow": [
    { label: "Version wrapper", code: "import type { FlowVersion } from \"dialit\";\n\nconst supportAssistantVersion: FlowVersion = {\n  flowVersionId: \"support_assistant_v1\",\n  flowId: \"support_assistant\",\n  version: \"1.0.0\",\n  status: \"draft\",\n  schemaVersion: \"0.1\",\n  createdAt: \"2026-05-22T12:00:00.000Z\",\n  definition: {\n    flowId: \"support_assistant\",\n    startStepId: \"welcome\",\n    variables: [],\n    steps: []\n  }\n};" },
    { label: "Welcome message", code: "supportAssistantVersion.definition.steps.push({\n  stepId: \"welcome\",\n  type: \"message\",\n  config: {\n    messages: [{ mode: \"static\", text: \"Welcome to support.\" }],\n    autoAdvance: false\n  }\n});" },
  ],
  "Add a Menu": [
    { label: "Main menu step", code: "const mainMenuStep = {\n  stepId: \"main_menu\",\n  type: \"menu\",\n  config: {\n    prompt: { mode: \"static\", text: \"How can I help you?\" },\n    selection: { allowButtons: true, allowNumbers: true, allowAliases: true },\n    options: [\n      { optionId: \"technical_support\", label: \"Technical support\", branch: { target: { type: \"step\", stepId: \"ask_email\" } } },\n      { optionId: \"billing_question\", label: \"Billing question\", branch: { target: { type: \"step\", stepId: \"ask_billing_question\" } } },\n      { optionId: \"contact_agent\", label: \"Contact an agent\", branch: { target: { type: \"step\", stepId: \"agent_contact_menu\" } } }\n    ]\n  }\n};" },
    { label: "Route into menu", code: "welcomeStep.routes = [\n  {\n    routeId: \"welcome-menu\",\n    match: { type: \"outcome\", outcome: \"next\" },\n    branch: { target: { type: \"step\", stepId: \"main_menu\" } }\n  }\n];" },
  ],
  "Store Variables": [
    { label: "Declare variables", code: "supportAssistantVersion.definition.variables = [\n  { variableId: \"contactReason\", type: \"string\", scope: \"conversation\" },\n  { variableId: \"email\", type: \"string\", scope: \"conversation\", sensitive: true },\n  { variableId: \"ticketId\", type: \"string\", scope: \"conversation\" }\n];" },
    { label: "Write selected path", code: "{\n  type: \"set_variable\",\n  operationId: \"set_contact_reason\",\n  variableId: \"contactReason\",\n  value: { type: \"literal\", value: \"technical_support\" },\n  source: \"menu_selection\"\n}" },
  ],
  "Validate Input": [
    { label: "Email input contract", code: "const emailInput = {\n  acceptedInputTypes: [\"text\"],\n  bindings: [\n    {\n      targetVariableId: \"email\",\n      source: \"text\",\n      required: true,\n      normalizers: [{ type: \"trim\" }],\n      validators: [{ type: \"regex\", options: { pattern: \"^[^@]+@[^@]+[.][^@]+$\" } }]\n    }\n  ]\n};" },
    { label: "Input step", code: "const askEmailStep = {\n  stepId: \"ask_email\",\n  type: \"input\",\n  config: {\n    prompt: { mode: \"static\", text: \"What email is on the account?\" },\n    input: emailInput\n  }\n};" },
  ],
  "Handle Invalid Input": [
    { label: "Invalid behavior", code: "const emailInput = {\n  acceptedInputTypes: [\"text\"],\n  bindings: [emailBinding],\n  invalidBehavior: {\n    message: { mode: \"static\", text: \"Enter a valid email address.\" },\n    target: { type: \"stay\" },\n    maxRetries: 3\n  }\n};" },
    { label: "Invalid attempt", code: "const retry = await api.sendMessage({\n  conversationId: \"conversation-1\",\n  text: \"not-an-email\",\n  inputId: \"bad-email-1\"\n});\n\nretry.body.currentStepId; // ask_email" },
  ],
  "Run Actions": [
    { label: "Action contract", code: "const validateCustomerAction = {\n  actionId: \"validateCustomerByEmail\",\n  kind: \"local\",\n  resultOutcomes: [\"valid\", \"not_found\", \"error\"],\n  timeoutMs: 3000\n};" },
    { label: "Action operation", code: "const validateCustomerOperation = {\n  type: \"run_action\",\n  operationId: \"validate_customer_by_email\",\n  actionId: \"validateCustomerByEmail\",\n  inputMapping: { email: { type: \"variable\", variableId: \"email\" } },\n  outputMapping: { customerId: \"customerId\", customerIsValid: \"customerIsValid\" },\n  onResult: [\n    { match: { type: \"outcome\", outcome: \"valid\" }, branch: { target: { type: \"step\", stepId: \"evaluate_customer\" } } }\n  ]\n};" },
  ],
  "Classify Input with SemanticInputTask": [
    { label: "Semantic task", code: "const classifyBillingArea = {\n  taskId: \"classify_billing_area\",\n  mode: \"after_valid_capture\",\n  allowedOutcomes: [\"billing_payment\", \"billing_invoice\", \"billing_wrong_charge\"],\n  saveOutcomeToVariableId: \"billingArea\",\n  threshold: 0.75\n};" },
    { label: "Resolver boundary", code: "const engine = createConversationEngine({\n  flowVersions: [supportAssistantVersion],\n  semanticInputResolver: async (_input, task) => ({\n    taskId: task.taskId,\n    status: \"resolved\",\n    candidates: [],\n    allowedOutcomes: task.allowedOutcomes,\n    outcome: \"billing_wrong_charge\",\n    confidence: 0.94,\n    trace: { source: \"semantic_input\", message: \"classified billing text\" }\n  })\n});" },
  ],
  "Generate Responses": [
    { label: "Constrained plan", code: "const ticketCreatedResponse = {\n  mode: \"generated\",\n  goal: \"Confirm that a support ticket was created and mention the ticket id.\",\n  allowedVariableIds: [\"ticketId\", \"technicalIssueDescription\"],\n  constraints: [\"Do not invent resolution times.\"],\n  fallbackText: \"Your support ticket has been created.\"\n};" },
    { label: "Generator boundary", code: "const engine = createConversationEngine({\n  flowVersions: [supportAssistantVersion],\n  llmResponseGenerator: async (_plan, context) => ({\n    text: `Ticket ${context.state.variables.ticketId?.value} was created.`,\n    usedVariableIds: [\"ticketId\"]\n  })\n});" },
  ],
  "Handle Attachments": [
    { label: "Attachment rules", code: "const technicalAttachmentStep = {\n  stepId: \"technical_attachment\",\n  type: \"attachment\",\n  config: {\n    prompt: { mode: \"static\", text: \"Attach a screenshot if you have one.\" },\n    targetVariableId: \"attachmentRef\",\n    rules: {\n      required: false,\n      maxFiles: 2,\n      allowedMimeTypes: [\"application/pdf\", \"image/png\", \"image/jpeg\"],\n      maxSizeMb: 5\n    }\n  }\n};" },
    { label: "Submitted file", code: "await api.sendAttachments({\n  conversationId: \"conversation-1\",\n  attachments: [\n    { filename: \"screenshot.png\", mimeType: \"image/png\", sizeBytes: 120000 }\n  ]\n});" },
  ],
  "Call Another Flow": [
    { label: "Call operation", code: "const callIdentityVerification = {\n  type: \"call_flow\",\n  operationId: \"call_identity_verification\",\n  flowVersionId: \"identity_verification_v1\",\n  variableSharing: { includeVariableIds: [\"email\", \"customerId\"] },\n  onResult: [\n    { match: { type: \"status\", status: \"completed\" }, branch: { target: { type: \"step\", stepId: \"evaluate_customer\" } } }\n  ]\n};" },
    { label: "Register flows", code: "const engine = createConversationEngine({\n  flowVersions: [supportAssistantVersion, identityVerificationVersion]\n});" },
  ],
  "Add Human Handoff": [
    { label: "Handoff operation", code: "const startHandoff = {\n  type: \"handoff\",\n  operationId: \"start_handoff\",\n  channel: \"web\",\n  queue: \"support\",\n  reason: { type: \"variable\", variableId: \"contactReason\" },\n  handoffIdVariableId: \"handoffId\",\n  onResult: [\n    { match: { type: \"status\", status: \"success\" }, branch: { target: { type: \"end\", status: \"handoff\" } } }\n  ]\n};" },
    { label: "Agent option", code: "{\n  optionId: \"human_agent\",\n  label: \"Contact a human agent\",\n  branch: { target: { type: \"step\", stepId: \"human_handoff\" } }\n}" },
  ],
  "Add a Custom Operation": [
    { label: "Operation contract", code: "supportAssistantVersion.definition.customOperations = [\n  {\n    customOperationId: \"create_support_ticket_contract\",\n    customType: \"create_support_ticket\",\n    allowedOutcomes: [\"created\", \"failed\"],\n    outputSchema: { ticketId: \"string\" }\n  }\n];" },
    { label: "Handler registration", code: "const engine = createConversationEngine({\n  flowVersions: [supportAssistantVersion],\n  customOperations: {\n    create_support_ticket: {\n      outcomes: [\"created\", \"failed\"],\n      outputVariables: [\"ticketId\"],\n      execute: async () => ({ status: \"completed\", outcome: \"created\", outputs: { ticketId: \"TCK-1001\" } })\n    }\n  }\n});" },
  ],
  "Add a Custom Step": [
    { label: "Survey step", code: "const surveyRatingStep = {\n  stepId: \"survey_rating\",\n  type: \"custom\",\n  config: {\n    customType: \"survey_rating\",\n    payload: { min: 1, max: 5 }\n  }\n};" },
    { label: "Step handler", code: "const surveyRatingHandler = {\n  stepType: \"survey_rating\",\n  validate: () => [],\n  enter: async (context) => ({\n    status: \"waiting_input\",\n    messages: [createTextMessage({ conversationId: context.state.conversationId, turnId: context.turn.turnId, text: \"Rate this support from 1 to 5.\" })],\n    waitState: { stepId: \"survey_rating\", createdAt: context.turn.startedAt },\n    trace: { source: \"survey_rating\", message: \"waiting for rating\" }\n  })\n};" },
  ],
  "Persist Conversations": [
    { label: "Repository set", code: "const repositories = {\n  flowVersions: new InMemoryFlowVersionRepository(),\n  conversations: new InMemoryConversationRepository(),\n  states: new InMemoryConversationStateRepository(),\n  events: new InMemoryConversationEventRepository(),\n  traces: new InMemoryDecisionTraceRepository()\n};" },
    { label: "Engine setup", code: "await repositories.flowVersions.save(supportAssistantVersion);\n\nconst engine = createConversationEngine({ repositories });" },
  ],
  "Inspect Traces": [
    { label: "Events", code: "const result = await engine.processUserInput({ conversationId, input });\n\nconst eventTypes = result.events.map((event) => event.type);" },
    { label: "Decision trace", code: "const path = result.trace.fragments.map((fragment) => fragment.source);\nconst patches = result.trace.variablePatches.map((patch) => patch.variableId);" },
  ],
  "Final Assistant": [
    { label: "Step map", language: "text", code: "welcome -> main_menu -> ask_email -> validate_customer -> evaluate_customer -> ask_technical_issue -> technical_attachment -> create_ticket -> end_completed" },
    { label: "Runtime boundary", code: "const engine = createConversationEngine({\n  flowVersions: [supportAssistantVersion, identityVerificationVersion],\n  repositories,\n  actionHandlers,\n  customOperations,\n  stepHandlers,\n  semanticInputResolver,\n  llmResponseGenerator\n});" },
  ],
  "Getting started with Dialit": [
    { label: "Workflow shape", language: "text", code: "FlowVersion -> StepDefinition -> StepBranch -> StepOperation -> ProcessTurnResult" },
    { label: "Build path", language: "text", code: "Install Dialit\nCreate a FlowVersion\nValidate the definition\nRun it through the engine or API adapter\nInspect events and traces" },
  ],
  "Install and import Dialit": [
    { label: "Install", language: "sh", code: "npm install dialit\nnode --version" },
    { label: "Imports used in the guide", code: "import {\n  createConversationApi,\n  createConversationEngine,\n  validateFlowDefinition,\n  type FlowVersion,\n  type GeneratedResponsePlan,\n} from \"dialit\";\n\nimport {\n  InMemoryConversationRepository,\n  InMemoryFlowVersionRepository,\n} from \"dialit/runtime-support\";" },
  ],
  "Create your first flow": [
    { label: "Flow shell", code: "import type { FlowVersion } from \"dialit\";\n\nexport const supportAssistantVersion: FlowVersion = {\n  flowVersionId: \"support_assistant_v1\",\n  flowId: \"support_assistant\",\n  version: \"1.0.0\",\n  status: \"draft\",\n  schemaVersion: \"0.1\",\n  createdAt: \"2026-05-22T12:00:00.000Z\",\n  definition: {\n    flowId: \"support_assistant\",\n    startStepId: \"welcome\",\n    variables: [],\n    steps: []\n  }\n};" },
    { label: "Welcome step", code: "supportAssistantVersion.definition.steps = [\n  {\n    stepId: \"welcome\",\n    type: \"message\",\n    config: {\n      messages: [{ mode: \"static\", text: \"Welcome to support.\" }],\n      autoAdvance: false\n    }\n  }\n];" },
  ],
  "Run the first conversation": [
    { label: "Validate the flow", code: "import { validateFlowDefinition } from \"dialit\";\n\nconst report = validateFlowDefinition(supportAssistantVersion.definition);\n\nif (!report.valid) {\n  throw new Error(report.issues.map((issue) => issue.message).join(\"\\n\"));\n}" },
    { label: "Start from the engine", code: "import { createConversationEngine } from \"dialit\";\n\nconst engine = createConversationEngine({\n  flowVersions: [supportAssistantVersion]\n});\n\nconst result = await engine.startConversation({\n  conversationId: \"conversation-1\",\n  flowVersionId: \"support_assistant_v1\",\n  channel: \"web\"\n});\n\nconsole.log(result.messages.map((message) => message.content));" },
  ],
  "Expose the flow through an API": [
    { label: "Create the adapter", code: "import { createConversationApi } from \"dialit\";\n\nconst api = createConversationApi({\n  flowVersions: [supportAssistantVersion]\n});" },
    { label: "Return endpoint-friendly data", code: "const startResponse = await api.start({\n  conversationId: \"conversation-1\",\n  flowVersionId: \"support_assistant_v1\",\n  channel: \"web\"\n});\n\nreturn Response.json(startResponse.body, {\n  status: startResponse.statusCode\n});" },
  ],
  "Add a main menu": [
    { label: "Menu step", code: "const mainMenuStep = {\n  stepId: \"main_menu\",\n  type: \"menu\",\n  config: {\n    prompt: { mode: \"static\", text: \"How can I help you?\" },\n    selection: { allowButtons: true, allowNumbers: true, allowAliases: true },\n    options: [\n      {\n        optionId: \"technical_support\",\n        label: \"Technical support\",\n        aliases: [\"technical\", \"tech\"],\n        branch: { target: { type: \"step\", stepId: \"ask_email\" } }\n      },\n      {\n        optionId: \"billing_question\",\n        label: \"Billing question\",\n        aliases: [\"billing\", \"invoice\"],\n        branch: { target: { type: \"step\", stepId: \"ask_billing_question\" } }\n      },\n      {\n        optionId: \"contact_agent\",\n        label: \"Contact an agent\",\n        aliases: [\"agent\", \"human\"],\n        branch: { target: { type: \"step\", stepId: \"agent_contact_menu\" } }\n      }\n    ]\n  }\n};" },
    { label: "Route welcome to the menu", code: "welcomeStep.routes = [\n  {\n    routeId: \"welcome-menu\",\n    match: { type: \"outcome\", outcome: \"next\" },\n    branch: { target: { type: \"step\", stepId: \"main_menu\" } }\n  }\n];\n\nsupportAssistantVersion.definition.steps.push(mainMenuStep);" },
  ],
  "Store conversation variables": [
    { label: "Declare state", code: "supportAssistantVersion.definition.variables = [\n  { variableId: \"contactReason\", type: \"string\", scope: \"conversation\" },\n  { variableId: \"email\", type: \"string\", scope: \"conversation\", sensitive: true },\n  { variableId: \"customerId\", type: \"string\", scope: \"conversation\" },\n  { variableId: \"ticketId\", type: \"string\", scope: \"conversation\" }\n];" },
    { label: "Write a menu choice", code: "branch: {\n  operations: [\n    {\n      type: \"set_variable\",\n      variableId: \"contactReason\",\n      value: { type: \"literal\", value: \"technical_support\" },\n      source: \"menu_selection\"\n    }\n  ],\n  target: { type: \"step\", stepId: \"ask_email\" }\n}" },
  ],
  "Validate user input": [
    { label: "Ask for an email", code: "const askEmailStep = {\n  stepId: \"ask_email\",\n  type: \"input\",\n  config: {\n    prompt: { mode: \"static\", text: \"What email is on the account?\" },\n    input: {\n      acceptedInputTypes: [\"text\"],\n      bindings: [\n        {\n          targetVariableId: \"email\",\n          source: \"text\",\n          required: true,\n          normalizers: [{ type: \"trim\" }],\n          validators: [{ type: \"regex\", options: { pattern: \"^[^@]+@[^@]+[.][^@]+$\" } }]\n        }\n      ]\n    }\n  },\n  routes: [\n    {\n      routeId: \"email-captured\",\n      match: { type: \"outcome\", outcome: \"captured\" },\n      branch: { target: { type: \"step\", stepId: \"validate_customer\" } }\n    }\n  ]\n};" },
    { label: "Send valid text", code: "await api.sendMessage({\n  conversationId: \"conversation-1\",\n  text: \"alex@example.com\",\n  inputId: \"email-1\",\n  receivedAt: new Date().toISOString()\n});" },
  ],
  "Handle invalid input": [
    { label: "Stay on the same step", code: "input: {\n  acceptedInputTypes: [\"text\"],\n  bindings: [emailBinding],\n  invalidBehavior: {\n    message: {\n      mode: \"static\",\n      text: \"Enter a valid email address.\"\n    },\n    target: { type: \"stay\" },\n    maxRetries: 3\n  }\n}" },
    { label: "Try an invalid value", code: "const retry = await api.sendMessage({\n  conversationId: \"conversation-1\",\n  text: \"not-an-email\",\n  inputId: \"bad-email-1\",\n  receivedAt: new Date().toISOString()\n});\n\nconsole.log(retry.body.currentStepId); // ask_email" },
  ],
  "Run actions from branches": [
    { label: "Declare an action", code: "supportAssistantVersion.definition.actions = [\n  {\n    actionId: \"validateCustomerByEmail\",\n    kind: \"local\",\n    resultOutcomes: [\"valid\", \"not_found\", \"error\"]\n  }\n];" },
    { label: "Run it from a step", code: "onEnter: [\n  {\n    type: \"run_action\",\n    operationId: \"validate_customer_by_email\",\n    actionId: \"validateCustomerByEmail\",\n    inputMapping: { email: { type: \"variable\", variableId: \"email\" } },\n    outputMapping: {\n      customerId: \"customerId\",\n      customerIsValid: \"customerIsValid\"\n    },\n    onResult: [\n      {\n        match: { type: \"outcome\", outcome: \"valid\" },\n        branch: { target: { type: \"step\", stepId: \"ask_technical_issue\" } }\n      }\n    ]\n  }\n]" },
    { label: "Register the handler", code: "const engine = createConversationEngine({\n  flowVersions: [supportAssistantVersion],\n  actionHandlers: {\n    local: async () => ({\n      status: \"success\",\n      outcome: \"valid\",\n      outputs: { customerId: \"cus_1042\", customerIsValid: true }\n    })\n  }\n});" },
  ],
  "Route with ConditionStep": [
    { label: "Condition step", code: "const evaluateCustomerStep = {\n  stepId: \"evaluate_customer\",\n  type: \"condition\",\n  config: {\n    branches: [\n      {\n        branchId: \"valid_customer\",\n        outcome: \"valid_customer\",\n        when: {\n          type: \"equals\",\n          left: { type: \"variable\", variableId: \"customerIsValid\" },\n          right: { type: \"literal\", value: true }\n        },\n        branch: { target: { type: \"step\", stepId: \"ask_technical_issue\" } }\n      }\n    ],\n    defaultBranch: { target: { type: \"step\", stepId: \"customer_not_found\" } }\n  }\n};" },
    { label: "Why use a condition", language: "text", code: "The action writes customerIsValid. The condition step makes the business route visible instead of hiding it inside application code." },
  ],
  "Classify input with SemanticInputTask": [
    { label: "Billing input", code: "const askBillingQuestionStep = {\n  stepId: \"ask_billing_question\",\n  type: \"input\",\n  config: {\n    prompt: { mode: \"static\", text: \"Tell me what your billing question is.\" },\n    input: {\n      acceptedInputTypes: [\"text\"],\n      bindings: [{ targetVariableId: \"billingQuestion\", source: \"text\", required: true }],\n      semanticTasks: [\n        {\n          taskId: \"classify_billing_area\",\n          mode: \"after_valid_capture\",\n          allowedOutcomes: [\"billing_payment\", \"billing_invoice\", \"billing_wrong_charge\"],\n          saveOutcomeToVariableId: \"billingArea\",\n          threshold: 0.75\n        }\n      ]\n    }\n  }\n};" },
    { label: "Resolver", code: "const engine = createConversationEngine({\n  flowVersions: [supportAssistantVersion],\n  semanticInputResolver: async (_input, task) => ({\n    taskId: task.taskId,\n    status: \"resolved\",\n    allowedOutcomes: task.allowedOutcomes,\n    allowedVariableIds: task.allowedVariableIds,\n    candidates: [],\n    outcome: \"billing_wrong_charge\",\n    confidence: 0.94\n  })\n});" },
  ],
  "Generate constrained responses": [
    { label: "Generated response", code: "import type { GeneratedResponsePlan } from \"dialit\";\n\nconst ticketCreatedResponse: GeneratedResponsePlan = {\n  mode: \"generated\",\n  goal: \"Confirm that a support ticket was created and mention the ticket id.\",\n  allowedVariableIds: [\"ticketId\", \"technicalIssueDescription\"],\n  constraints: [\"Do not invent resolution times.\", \"Keep the answer under 80 words.\"],\n  fallbackText: \"Your support ticket has been created.\"\n};" },
    { label: "Response generator", code: "const engine = createConversationEngine({\n  flowVersions: [supportAssistantVersion],\n  llmResponseGenerator: async (_plan, context) => ({\n    text: `Ticket ${context.state.variables.ticketId?.value} was created.`,\n    usedVariableIds: [\"ticketId\"]\n  })\n});" },
  ],
  "Handle attachments": [
    { label: "Attachment step", code: "const technicalAttachmentStep = {\n  stepId: \"technical_attachment\",\n  type: \"attachment\",\n  config: {\n    prompt: { mode: \"static\", text: \"Attach a screenshot if you have one.\" },\n    targetVariableId: \"attachmentRef\",\n    rules: {\n      required: false,\n      maxFiles: 2,\n      allowedMimeTypes: [\"application/pdf\", \"image/png\", \"image/jpeg\"],\n      maxSizeMb: 5\n    }\n  },\n  routes: [\n    {\n      routeId: \"attachment-done\",\n      match: { type: \"outcome\", outcome: \"captured\" },\n      branch: { target: { type: \"step\", stepId: \"create_ticket\" } }\n    }\n  ]\n};" },
    { label: "Send a file reference", code: "await api.sendAttachments({\n  conversationId: \"conversation-1\",\n  attachments: [\n    {\n      attachmentId: \"file-1\",\n      filename: \"screenshot.png\",\n      mimeType: \"image/png\",\n      sizeBytes: 120000,\n      url: \"https://example.com/uploads/screenshot.png\"\n    }\n  ]\n});" },
  ],
  "Call another flow": [
    { label: "Call operation", code: "{\n  type: \"call_flow\",\n  operationId: \"call_identity_verification\",\n  flowVersionId: \"identity_verification_v1\",\n  variableSharing: {\n    includeVariableIds: [\"email\", \"customerId\", \"customerIsValid\"]\n  },\n  onResult: [\n    {\n      match: { type: \"status\", status: \"completed\" },\n      branch: { target: { type: \"step\", stepId: \"evaluate_customer\" } }\n    }\n  ]\n}" },
    { label: "Register both flows", code: "const engine = createConversationEngine({\n  flowVersions: [\n    supportAssistantVersion,\n    identityVerificationVersion\n  ]\n});" },
  ],
  "Add human handoff": [
    { label: "Agent menu branch", code: "{\n  optionId: \"human_agent\",\n  label: \"Contact a human agent\",\n  branch: {\n    target: { type: \"step\", stepId: \"human_handoff\" }\n  }\n}" },
    { label: "Handoff operation", code: "onEnter: [\n  {\n    type: \"handoff\",\n    operationId: \"start_handoff\",\n    channel: \"web\",\n    queue: \"support\",\n    reason: { type: \"variable\", variableId: \"contactReason\" },\n    handoffIdVariableId: \"handoffId\",\n    onResult: [\n      {\n        match: { type: \"outcome\", outcome: \"handoff_started\" },\n        branch: { target: { type: \"end\", status: \"handoff\" } }\n      }\n    ]\n  }\n]" },
  ],
  "Add a custom operation": [
    { label: "Flow-level declaration", code: "customOperations: [\n  {\n    customOperationId: \"create_support_ticket_contract\",\n    customType: \"create_support_ticket\",\n    allowedOutcomes: [\"created\", \"failed\"],\n    outputSchema: { ticketId: \"string\" }\n  }\n]" },
    { label: "Handler", code: "const engine = createConversationEngine({\n  flowVersions: [supportAssistantVersion],\n  customOperations: {\n    create_support_ticket: {\n      outcomes: [\"created\", \"failed\"],\n      outputVariables: [\"ticketId\"],\n      execute: async () => ({\n        status: \"completed\",\n        outcome: \"created\",\n        variablePatches: [\n          { type: \"set\", variableId: \"ticketId\", value: \"TCK-1001\", source: \"operation\" }\n        ]\n      })\n    }\n  }\n});" },
  ],
  "Add a custom step": [
    { label: "Survey step", code: "const surveyRatingStep = {\n  stepId: \"survey_rating\",\n  type: \"custom\",\n  config: {\n    customType: \"survey_rating\",\n    payload: { min: 1, max: 5 }\n  },\n  routes: [\n    {\n      routeId: \"rating-collected\",\n      match: { type: \"outcome\", outcome: \"rated\" },\n      branch: { target: { type: \"step\", stepId: \"end_completed\" } }\n    }\n  ]\n};" },
    { label: "Step handler", code: "import { createTextMessage } from \"dialit/runtime-support\";\n\nconst surveyRatingHandler = {\n  stepType: \"survey_rating\",\n  validate: () => [],\n  enter: async (context) => ({\n    status: \"waiting_input\",\n    messages: [createTextMessage({\n      conversationId: context.state.conversationId,\n      turnId: context.turn.turnId,\n      text: \"How would you rate the support from 1 to 5?\"\n    })],\n    waitState: { stepId: \"survey_rating\" }\n  })\n};" },
  ],
  "Persist conversations": [
    { label: "In-memory setup", code: "import {\n  InMemoryConversationRepository,\n  InMemoryFlowVersionRepository,\n} from \"dialit/runtime-support\";\n\nconst repositories = {\n  flowVersions: new InMemoryFlowVersionRepository(),\n  conversations: new InMemoryConversationRepository()\n};\n\nawait repositories.flowVersions.save(supportAssistantVersion);" },
    { label: "Pass repositories", code: "const engine = createConversationEngine({\n  repositories\n});" },
  ],
  "Inspect events and traces": [
    { label: "Read the result", code: "const result = await engine.processUserInput({\n  conversationId: \"conversation-1\",\n  input: {\n    inputId: \"input-1\",\n    conversationId: \"conversation-1\",\n    type: \"text\",\n    text: \"Technical support\",\n    receivedAt: new Date().toISOString()\n  }\n});\n\nconsole.log(result.events.map((event) => event.type));\nconsole.log(result.trace.variablePatches.map((patch) => patch.variableId));" },
    { label: "Subscribe to events", code: "const subscription = engine.subscribeToEvents(({ event, result }) => {\n  console.log(event.type, result.state.status);\n});\n\nsubscription.unsubscribe();" },
  ],
  "Final support assistant": [
    { label: "Final shape", language: "text", code: "support_assistant\n  welcome\n  main_menu\n  ask_email\n  validate_customer\n  ask_technical_issue\n  technical_attachment\n  ask_billing_question\n  billing_condition\n  human_handoff\n  end_completed" },
    { label: "Final setup", code: "const engine = createConversationEngine({\n  flowVersions: [supportAssistantVersion, identityVerificationVersion],\n  repositories,\n  actionHandlers,\n  customOperations,\n  stepHandlers,\n  semanticInputResolver,\n  llmResponseGenerator\n});" },
  ],
  } as Record<string, readonly TutorialImplementation[]>)[title];
}

function tutorialPage(slug: string, group: string, title: string, summary: string, adds: readonly string[]): TutorialDocPage {
  return {
    slug,
    group,
    title,
    summary,
    objective: tutorialObjective(title, summary),
    adds,
    codeSections: tutorialImplementations(title),
    checks: tutorialChecks(title),
  };
}

function tutorialObjective(title: string, summary: string): string {
  if (title === "Getting started with Dialit") {
    return "Understand the workflow model and the path this tutorial follows before starting the implementation steps.";
  }

  return summary;
}

function tutorialChecks(title: string): readonly string[] {
  const specificChecks: Record<string, readonly string[]> = {
    "Getting started with Dialit": [
      "Understand the basic step, outcome, branch, and operation model.",
      "See how the tutorial builds one support assistant incrementally.",
      "Know that later pages add setup, code, runtime execution, and traces.",
    ],
    "Install and import Dialit": [
      "Keep application runtime imports in one place.",
      "Use runtime-support only for local examples or test storage.",
    ],
    "Create your first flow": [
      "Give the assistant a stable flowVersionId.",
      "Add the welcome step before adding menu routes.",
    ],
    "Run the first conversation": [
      "Validate before starting the conversation.",
      "Confirm the first result includes a visible message.",
    ],
    "Expose the flow through an API": [
      "Return the adapter body from your HTTP route.",
      "Keep auth, uploads, and framework code outside the flow.",
    ],
    "Add a main menu": [
      "The welcome step now routes to main_menu.",
      "Each option points to a real next step.",
    ],
    "Store conversation variables": [
      "Declare variables before writing them.",
      "Use operations for state changes.",
    ],
    "Validate user input": [
      "Valid email text moves the user to validation.",
      "The captured value is saved in email.",
    ],
    "Handle invalid input": [
      "Invalid input stays on ask_email.",
      "The retry message tells the user what to fix.",
    ],
    "Run actions from branches": [
      "Declare the action outcome names first.",
      "Map handler output into variables.",
    ],
    "Route with ConditionStep": [
      "Business routing is visible in the flow.",
      "The default branch handles the failed condition.",
    ],
    "Classify input with SemanticInputTask": [
      "The resolver can only return allowed outcomes.",
      "The selected outcome is saved for later routing.",
    ],
    "Generate constrained responses": [
      "The generator can only read approved variables.",
      "Fallback text exists when generation is unavailable.",
    ],
    "Handle attachments": [
      "Your app uploads the file.",
      "Dialit validates and stores the file reference.",
    ],
    "Call another flow": [
      "Register both flow versions.",
      "Choose which variables are shared with the called flow.",
    ],
    "Add human handoff": [
      "Handoff is a clear branch, not a hidden exception.",
      "The final status communicates that an agent owns the next step.",
    ],
    "Add a custom operation": [
      "Declare the custom operation in the flow.",
      "Register a handler by customType.",
    ],
    "Add a custom step": [
      "Use a custom step only for a new interaction shape.",
      "Register the step handler before running the flow.",
    ],
    "Persist conversations": [
      "Save the flow version before starting conversations.",
      "Swap in durable repositories for production.",
    ],
    "Inspect events and traces": [
      "Use events for product analytics.",
      "Use trace records to explain a selected path.",
    ],
    "Final support assistant": [
      "Review the full step map.",
      "Keep providers and handlers wired at the runtime boundary.",
    ],
  };

  return specificChecks[title] ?? [tutorialObjective(title, "")];
}
