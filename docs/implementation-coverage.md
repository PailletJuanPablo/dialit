# Nexembot v0.1 implementation coverage

This document maps the requirements described in `nexembot.md` to the current TypeScript implementation. It also records detected gaps so future work can target concrete missing capabilities instead of relying on broad assumptions.

## Status legend

- **Implemented**: Runtime behavior, public contracts, and tests exist.
- **Partial**: The contract exists or the common path works, but part of the documented behavior is not fully implemented.
- **Missing**: The documented point is not implemented in runtime behavior or public API.

## Source of truth checked

- Documentation: `nexembot.md`
- Original high-level type reference: root `types.ts`
- Package implementation contracts: `src/types.ts`
- Runtime: `src/runtime.ts`
- Runtime services and repositories: `src/runtime-support.ts`, `src/runtime/services.ts`, `src/runtime/constants.ts`
- Model validation: `src/validation.ts`
- Public exports: `src/index.ts`
- Regression coverage: `test/reference-scenarios.test.ts`, `test/integration-scenarios.test.ts`, `test/type-quality.test.ts`

Important note: the package exports `src/types.ts` through `src/index.ts`. The root-level `types.ts` is a reference artifact and is not currently the exported source used by the library. Some concepts in root `types.ts` are older or less complete than `src/types.ts`.

## Consolidated architecture decisions

| Documentation point | Status | Implemented in | Evidence / notes |
|---|---:|---|---|
| Specialized and extensible steps | Partial | `src/types.ts` step union and `StepHandler`; `src/runtime.ts` built-in step methods; `src/runtime/services.ts` step registry | Built-in behavior exists for message, menu, input, attachment, condition, end, and custom. Built-ins are implemented as runtime methods rather than standalone `StepHandler` classes. Custom step handlers are registered through `stepRegistry`. |
| Actions are operations, not required step types | Implemented | `ActionDefinition`, `RunActionOperation`, `executeAction` | Actions execute only through `run_action` operations. No action step is required. |
| Branches execute operations and then navigate | Implemented | `StepBranch`, `executeBranch`, `executeOperations`, `applyTarget` | Branches support operation chains, operation-result branches, and targets. |
| Menu options have their own branches | Implemented | `MenuOption.branch`, `handleMenuInput` | Menu resolution returns the selected option branch. Covered by reference menu tests. |
| `ConditionStep` is the official conditional-routing mechanism | Implemented | `ConditionStepDefinition`, `ConditionExpression`, `enterConditionStep`, `validateFlowDefinition` | Route-level `condition` is rejected by validation. Condition evaluation is traced. |
| Flows can call other flows and share variables | Implemented | `CallFlowOperation`, `FlowExecutionFrame`, `executeFlowCall`, flow-call continuation methods | Supports execution stack, waiting child flows, return routing, scope sharing, include/exclude lists, and output mapping. |
| Async operations/actions complete before state changes | Implemented | `executeOperations`, `executeAction`, `executeCustomOperation`, `executeFlowCall`, `commit` | Runtime awaits operation/action/custom/LLM results before applying patches and committing repositories. |
| Variables have scopes and internal history | Implemented | `VariableScope`, `VariableHistoryEntry`, `applyPatch`, `scopedVariables`, `variableHistory` | Default scope is conversation. Set/unset/invalidate events and history are recorded. |
| Custom operations have explicit contracts | Implemented | `CustomOperationDefinition`, `CustomOperation`, `executeCustomOperation` | Runtime validates registered contract, allowed outcomes, output variable declarations, and supports trace fragments. |
| Advanced human handoff is modelable | Implemented | `HandoffOperation`, `HandoffResultBranch`, `executeHandoff` | Supports channel/queue/reason/metadata mapping, handoff id variable, message, result branches, and handoff status. |
| LLM roles are separated | Implemented | `SemanticInputResolver`, `LlmResponseGenerator`, `handleMenuInput`, `handleInputStepInput`, `renderOne` | Input interpretation and response generation use separate contracts and trace/usage records. |

## Section-by-section mapping

| `nexembot.md` section | Status | Implemented in | Evidence / gaps |
|---|---:|---|---|
| 01. Vision general | Implemented | `createConversationEngine`, `startConversation`, `processUserInput`, built-in steps, operations, events, trace | The runtime executes versioned flows, deterministic and LLM-assisted paths, and returns state/messages/events/trace. Reference and integration tests cover the core user journeys. |
| 02. Architectural principles | Partial | `src/types.ts`, `src/runtime.ts`, `src/runtime/services.ts` | All main principles are represented. Partial only because built-in handlers/operation handlers are runtime methods, not standalone handler classes or a full operation registry. |
| 03. Conceptual model | Implemented | `ConversationFlowDefinition`, `StepDefinition`, `StepBranch`, `StepOperation`, `Runtime` class | The conceptual flow loop is implemented: load state, execute active step, execute branches/operations, apply patches, commit, trace. |
| 04. Domain entities | Implemented | `src/types.ts` sections for flow, versioning, steps, branches, targets, responses, actions, variables | All core entities exist in exported contracts. `customOperations` is included in `ConversationFlowDefinition`. |
| 05. Variables, scopes, and history | Implemented | `VariableStore`, `VariableScope`, `VariableValue`, `VariablePatch`, `VariableHistoryEntry`, `applyPatch`, runtime-support variable helpers | Supports `conversation`, `flow`, `operation`, and `system` scopes; set/unset/invalidate; history with previous/next values; flow-call sharing. |
| 06. Steps and handlers | Partial | `StepHandler`, built-in runtime methods `enterMessageStep`, `enterMenuStep`, `enterInputStep`, `enterAttachmentStep`, `enterConditionStep`, `enterEndStep`, `enterCustomStep` | Step behavior exists. Gap: built-in step handlers are not exported as individual `MessageStepHandler`, `MenuStepHandler`, etc. implementations, only as contracts and runtime methods. |
| 07. Branches, routes, and targets | Implemented | `StepBranch`, `StepRoute`, `StepTarget`, `executeBranch`, `resolveRoute`, `applyTarget` | Supports operations, stay, step, end, none, menu option branches, action result branches, custom operation branches, handoff branches, and flow-call result branches. |
| 08. Operations | Partial | `StepOperation` union, `executeOperation`, operation contracts | Built-ins are implemented: send message, set/unset/invalidate variable, run action, call flow, emit event, handoff, custom. Gap: `OperationRegistry` exists as a contract but runtime extension is via `customOperations`, not arbitrary registered operation handlers. |
| 09. Actions | Implemented | `ActionDefinition`, `ActionResult`, `ActionHandler`, `ActionExecutor`, `executeAction` | Supports reusable action definitions, input/output mapping, async execution, result branches by status/outcome/error code, success/failure events, and trace records. |
| 10. Menus and options | Implemented | `MenuStepConfig`, `MenuOption`, `MenuSelectionPolicy`, `handleMenuInput` | Supports buttons, option id, number, exact text, aliases, optional semantic selection, free text outcome, invalid behavior, and option branches. Dynamic menus are intentionally handled by caller-resolved options or custom steps, matching the documentation. |
| 11. Input processing and `SemanticInputTask` | Partial | `InputContract`, `InputBinding`, `SemanticInputTask`, `handleInputStepInput`, `resolveSemanticAfterInvalidInput`, `validateValue` | Supports text capture, first binding, deterministic built-in validators, invalid retry, `after_valid_capture`, and `after_invalid_input`. Gaps: no generic normalizer/extractor pipeline, no multiple-binding processing, no `globalCommands` behavior, no `saveRawInput`, no non-text input binding path beyond attachment step. |
| 12. `ConditionStep` | Implemented | `ConditionStepDefinition`, `ConditionBranch`, `ConditionExpression`, `enterConditionStep`, `evaluateCondition` | Supports equals, not equals, exists, not exists, greater/less than, includes, regex, and/or/not, default branch, condition events, fragments, and trace records. |
| 13. Flow calls | Implemented | `CallFlowOperation`, `FlowExecutionFrame`, `executeFlowCall`, flow-call continuation and restore methods | Supports target flow version, input/output mapping, variable sharing by scope/include/exclude, execution stack, waiting child flow continuation, and result branches for completed/failed/handoff statuses. |
| 14. Responses and LLM generation | Implemented | `ResponsePlan`, `renderOne`, `renderTemplate`, `LlmResponseGenerator` | Supports static, template, generated, and reference responses. Generated responses require `fallbackText`, allowed variables, constrained `usedVariableIds`, failure fallback, events, LLM usage, and trace. |
| 15. Human handoff | Implemented | `HandoffOperation`, `HandoffResult`, `executeHandoff` | Supports queue/channel/reason/metadata mapping, handoff id generation/storage, user message, success branch, handoff state, handoff events, and trace records. Handoff through `RunActionOperation` is also possible through normal action handling. |
| 16. Runtime and execution cycle | Partial | `ConversationEngine`, `Runtime`, `commit`, repositories | Start and user input turn processing are implemented. Gap: there is no explicit `processExternalEvent` facade method; event input is typed as `UserInput` but no dedicated runtime entry point exists. |
| 17. Async execution and state commit | Implemented | `await` usage in step/operation/action/custom/flow/LLM execution, `applyStepResult`, `commit` | State changes are collected as patches/events/messages and applied before repository commit only after async results return. Tests cover async action commit behavior. |
| 18. Events and tracing | Implemented | `ConversationEventType`, `DecisionTrace`, `createTrace`, `commit`, trace collection helpers | Runtime records step, input, menu, semantic, LLM, variable, operation, action, transition, condition, flow-call, handoff, completion, and error events. Trace includes fragments plus structured reads/results/calls/handoffs/LLM usage. |
| 19. Persistence and repositories | Implemented | Repository interfaces in `src/types.ts`; in-memory implementations in `src/runtime-support.ts`; `createInternalRepositories` | Supports flow versions, conversations, states, append-only events, and traces. Repositories are injectable. |
| 20. Extensibility | Partial | `StepHandlerRegistry`, `ActionHandler`, `customOperations`, `SemanticInputResolver`, `LlmResponseGenerator`, validator/normalizer/extractor contracts | Extensible custom steps, actions, custom operations, LLM providers, and service overrides exist. Gaps: full `OperationRegistry`, `ResolverRegistry`, `ValidatorRegistry`, `NormalizerRegistry`, and `ExtractorRegistry` are contracts only, not active runtime registries. |
| 21. Model validation | Partial | `validateFlowDefinition` | Validates start step, targets, variables, actions, responses, generated response requirements, semantic task outcomes, route conditions, condition expressions, and operation references. Gaps: does not validate registered handlers, registered custom operation types, trace sufficiency, attachment `maxFiles`, action outcome/error-code sufficiency, or runtime plugin registry availability. |
| 22. Reference scenario | Implemented | `test/reference-scenarios.test.ts`, `test/integration-scenarios.test.ts` | Covers message steps, menus, input validation/retry, attachments, ConditionStep, actions success/failure, variables/history, custom operations, flow calls/scopes, semantic billing classification, generated responses, handoff, persistence, and traces. |
| 23. Guide for code agents | Partial | Overall project structure and tests | Most implementation order and rules are respected. Partial because some conceptual service registries remain contracts instead of complete runtime modules, and root `types.ts` is not synchronized with exported `src/types.ts`. |

## Detailed capability matrix

| Capability | Status | Where |
|---|---:|---|
| Versioned flow execution | Implemented | `FlowVersion`, `FlowVersionRepository`, `startConversation`, `processUserInput` |
| Public engine facade | Implemented | `ConversationEngine`, `createConversationEngine`, `src/index.ts` |
| Start conversation | Implemented | `Runtime.startConversation` |
| Process user input | Implemented | `Runtime.processUserInput` |
| Process external event facade | Missing | `EventUserInput` exists, but `ConversationEngine` has no `processExternalEvent` method |
| Message step | Implemented | `MessageStepDefinition`, `enterMessageStep` |
| Menu step | Implemented | `MenuStepDefinition`, `enterMenuStep`, `handleMenuInput` |
| Input step | Partial | `InputStepDefinition`, `enterInputStep`, `handleInputStepInput`; gaps listed in section 11 |
| Attachment step | Partial | `AttachmentStepDefinition`, `handleAttachmentInput`; supports first file MIME/ext/size, but not `maxFiles`, optional attachment behavior, or custom attachment validators |
| Condition step | Implemented | `ConditionStepDefinition`, `enterConditionStep`, `evaluateCondition` |
| End step | Implemented | `EndStepDefinition`, `enterEndStep` |
| Custom step | Implemented | `CustomStepDefinition`, `enterCustomStep`, `handleCustomStepInput`, `stepRegistry` |
| Send message operation | Implemented | `SendMessageOperation`, `executeOperation` |
| Set variable operation | Implemented | `SetVariableOperation`, `applyPatch` |
| Unset variable operation | Implemented | `UnsetVariableOperation`, `applyPatch` |
| Invalidate variable operation | Implemented | `InvalidateVariableOperation`, `applyPatch` |
| Run action operation | Implemented | `RunActionOperation`, `executeAction` |
| Call flow operation | Implemented | `CallFlowOperation`, `executeFlowCall` |
| Emit event operation | Implemented | `EmitEventOperation`, `executeOperation` |
| Handoff operation | Implemented | `HandoffOperation`, `executeHandoff` |
| Custom operation | Implemented | `CustomOperationDefinition`, `CustomOperation`, `executeCustomOperation` |
| Operation handler registry | Partial | `OperationRegistry` contract exists; runtime uses built-in switch plus `customOperations` |
| Action handlers | Implemented | `ActionHandler`, `actionHandlers` option, `RuntimeServices.actionExecutor` |
| Variable scopes | Implemented | `VariableScope`, scoped keys, `defaultFlowCallSharingScopes` |
| Variable history | Implemented | `VariableHistoryEntry`, `applyPatch`, `variableHistory` |
| Response references | Implemented | `ResponseReferencePlan`, `renderOne` |
| Static responses | Implemented | `StaticResponsePlan`, `renderOne` |
| Template responses | Implemented | `TemplateResponsePlan`, `renderTemplate` |
| Generated LLM responses | Implemented | `GeneratedResponsePlan`, `LlmResponseGenerator`, `isLlmGeneratedResponse` |
| Semantic input after valid capture | Implemented | `SemanticInputTask`, `handleInputStepInput` |
| Semantic input after invalid input | Implemented | `resolveSemanticAfterInvalidInput` |
| Semantic menu selection | Implemented | `MenuSemanticSelection`, `handleMenuInput` |
| Deterministic validators | Partial | Built-ins in `validateValue`; no runtime validator registry |
| Normalizers | Partial | Contracts exist; runtime currently trims input directly instead of executing configured normalizers |
| Extractors | Partial | Contracts exist; runtime currently uses raw text only |
| Global commands | Missing | `GlobalCommandPolicy` contract exists; runtime does not process cancel/help/back/handoff commands |
| Events | Implemented | `ConversationEventType`, `event`, `eventBase`, repository append in `commit` |
| Decision trace | Implemented | `DecisionTrace`, `createTrace`, `commit`, trace record extraction |
| Persistence abstraction | Implemented | Repository interfaces and injectable in-memory repositories |
| Flow validation | Partial | `validateFlowDefinition`; gaps listed below |
| Type-quality guardrails | Implemented | `test/type-quality.test.ts` |

## Detected gaps

### 1. Root `types.ts` is not synchronized with exported `src/types.ts`

The package exports `src/types.ts`, while the root `types.ts` remains a reference file. The exported source includes newer scope/history/custom-operation contracts that are not fully mirrored in the root artifact. If the root file is intended to remain canonical documentation, it should be regenerated or explicitly marked as historical/reference-only.

Smallest next step: add a short note to root `types.ts` or replace it with a re-export/reference pointer to `src/types.ts`.

### 2. Input processing is intentionally narrow

The runtime handles the common text-input path but does not fully implement the documented generic pipeline:

- Multiple bindings.
- Configured normalizers.
- Configured extractors.
- `saveRawInput`.
- `acceptedInputTypes` enforcement beyond the hardcoded text path.
- `globalCommands`.

Smallest next step: implement a minimal `processInputBindings` function that applies configured normalizers/extractors/validators to each binding and returns variable patches plus trace fragments.

### 3. Runtime registries are not complete for every contract

The contracts define `OperationRegistry`, `ValidatorRegistry`, `NormalizerRegistry`, `ExtractorRegistry`, and resolver marker interfaces. The runtime currently exposes service contracts and uses:

- Built-in operation switch for official operations.
- `customOperations` for custom operation extension.
- Built-in validator logic in `validateValue`.
- Direct semantic resolver injection for LLM input interpretation.

Smallest next step: decide whether v0.1 wants active registries or whether these contracts should be documented as future extension points. If active registries are required, start with `ValidatorRegistry` because it affects real input behavior.

### 4. Attachment handling is partial

The runtime validates the first attachment by MIME type, extension, and size, then stores it. It does not currently enforce `maxFiles`, optional attachment semantics, or `AttachmentRules.validators`.

Smallest next step: add attachment tests for `maxFiles` and custom validators, then implement them in `handleAttachmentInput`.

### 5. Model validation does not cover every documented validation

`validateFlowDefinition` covers many structural checks, but these documented validations are missing or partial:

- Registered step handler availability for custom step types.
- Registered operation handler availability beyond known operation union.
- Custom operation definition/type availability.
- Trace fragment sufficiency.
- Action result outcome/error-code sufficiency for routing.
- Attachment `maxFiles` and custom validators.
- Active runtime registry availability for validators/normalizers/extractors.

Smallest next step: extend `validateFlowDefinition` options with optional registered handler/custom operation metadata and add focused validation tests.

### 6. No explicit external event processing API

`EventUserInput` exists as a type, and `processUserInput` accepts `UserInput`, but `ConversationEngine` does not expose a dedicated external event method. This is acceptable only because the documentation says external event processing is conditional: "si la implementacion lo soporta".

Smallest next step: either document that v0.1 does not expose `processExternalEvent`, or add a facade method that routes event input through the same turn processor.

### 7. Built-in handlers are not standalone modules

The documentation describes `MessageStepHandler`, `MenuStepHandler`, `InputStepHandler`, etc. The contracts exist, but the built-in behavior is implemented inside `Runtime` methods. This is behaviorally correct but less modular than the conceptual handler architecture.

Smallest next step: only extract built-in handlers if external reuse or independent handler testing becomes necessary. Current tests validate behavior through the public engine.

## Verification evidence

The current implementation was verified with:

- `npm run build`
- `npx tsc -p tsconfig.json --noUnusedLocals --noUnusedParameters --noEmit`
- `npm test -- --run`
- `git diff --check`

