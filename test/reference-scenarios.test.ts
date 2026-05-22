import { describe, expect, it, vi } from "vitest";
import {
  createConversationEngine,
  validateFlowDefinition,
  type ConversationEngine,
  type ConversationEngineModule,
  type FlowVersion,
  type ProcessTurnResult,
  type UserInput,
} from "../src/index";

const NOW = "2026-05-22T12:00:00.000Z";
const FLOW_VERSION_ID = "support-v1";
const CHILD_FLOW_VERSION_ID = "identity-v1";
let branchIdCounter = 0;

describe("Nexembot v0.1 reference scenarios", () => {
  it("starts with multiple message steps and auto-advances to the main menu", async () => {
    const runtime = engineWith(referenceFlowVersion());

    const result = await runtime.startConversation({
      conversationId: "conversation-start",
      flowVersionId: FLOW_VERSION_ID,
      channel: "whatsapp",
    });

    expect(texts(result)).toEqual([
      "Hello.",
      "Thanks for contacting us.",
      "Choose an option.",
    ]);
    expect(buttonLabels(result)).toEqual([
      "Technical support",
      "Billing question",
      "Talk to an agent",
    ]);
    expect(result.state.status).toBe("waiting_input");
    expect(result.state.currentStepId).toBe("main_menu");
    expect(result.state.pendingInput).toMatchObject({ stepId: "main_menu" });
    expect(traceSources(result)).toEqual(
      expect.arrayContaining([
        "step:message",
        "response:static",
        "transition",
        "step:menu",
      ]),
    );
    expect(eventTypes(result)).toEqual(
      expect.arrayContaining([
        "conversation_started",
        "step_entered",
        "message_created",
        "transition_taken",
      ]),
    );
  });

  it.each([
    ["number", textInput("menu-number", "2")],
    ["exact text", textInput("menu-text", "Billing question")],
    ["alias", textInput("menu-alias", "billing")],
    ["option id", choiceInput("menu-option-id", "billing")],
  ])("routes menu branches by %s", async (_caseName, selection) => {
    const runtime = engineWith(referenceFlowVersion());
    await runtime.startConversation({
      conversationId: selection.conversationId,
      flowVersionId: FLOW_VERSION_ID,
    });

    const result = await runtime.processUserInput({
      conversationId: selection.conversationId,
      input: selection,
    });

    expect(variableValue(result, "contactReason")).toBe("billing");
    expect(result.state.currentStepId).toBe("billing_question");
    expect(texts(result)).toContain("What is your billing question?");
    expect(eventTypes(result)).toContain("menu_option_selected");
    expect(result.trace.variablePatches).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: "set",
          variableId: "contactReason",
          source: "menu_selection",
        }),
      ]),
    );
  });

  it("validates input, emits invalid messages, tracks retry count, and captures a valid value", async () => {
    const runtime = engineWith(referenceFlowVersion());
    await startAndSelect(runtime, "conversation-dni", "technical");

    const invalid = await runtime.processUserInput({
      conversationId: "conversation-dni",
      input: textInput("conversation-dni", "abc"),
    });

    expect(texts(invalid)).toEqual([
      "DNI must contain only numbers.",
      "Please enter your DNI.",
    ]);
    expect(invalid.state.currentStepId).toBe("ask_dni");
    expect(invalid.state.pendingInput).toMatchObject({
      stepId: "ask_dni",
      retryCount: 1,
    });
    expect(eventTypes(invalid)).toEqual(expect.arrayContaining(["input_invalid"]));

    const valid = await runtime.processUserInput({
      conversationId: "conversation-dni",
      input: textInput("conversation-dni", "12345678"),
    });

    expect(variableValue(valid, "dni")).toBe("12345678");
    expect(valid.state.currentStepId).toBe("technical_attachment");
    expect(texts(valid)).toContain("Attach a PDF or image if you have one.");
    expect(eventTypes(valid)).toEqual(
      expect.arrayContaining(["input_resolved", "variable_set"]),
    );
    expect(variableHistory(valid, "dni")).toEqual([
      expect.objectContaining({
        previousValue: undefined,
        nextValue: "12345678",
        source: "user_input",
        stepId: "ask_dni",
      }),
    ]);
  });

  it("validates attachments and stores accepted attachment references in variables", async () => {
    const runtime = engineWith(referenceFlowVersion());
    await startAndSelect(runtime, "conversation-attachment", "technical");
    await runtime.processUserInput({
      conversationId: "conversation-attachment",
      input: textInput("conversation-attachment", "12345678"),
    });

    const invalid = await runtime.processUserInput({
      conversationId: "conversation-attachment",
      input: attachmentInput("conversation-attachment", [
        { filename: "script.exe", mimeType: "application/x-msdownload", sizeBytes: 500 },
      ]),
    });

    expect(texts(invalid)).toEqual([
      "Please attach a PDF, PNG, or JPG file smaller than 5 MB.",
      "Attach a PDF or image if you have one.",
    ]);
    expect(invalid.state.currentStepId).toBe("technical_attachment");
    expect(eventTypes(invalid)).toContain("input_invalid");

    const accepted = await runtime.processUserInput({
      conversationId: "conversation-attachment",
      input: attachmentInput("conversation-attachment", [
        {
          attachmentId: "file-1",
          filename: "invoice.pdf",
          mimeType: "application/pdf",
          sizeBytes: 12_000,
          url: "https://files.example/invoice.pdf",
        },
      ]),
    });

    expect(variableValue(accepted, "attachmentRef")).toEqual(
      expect.objectContaining({
        attachmentId: "file-1",
        filename: "invoice.pdf",
        mimeType: "application/pdf",
      }),
    );
    expect(accepted.state.currentStepId).toBe("technical_done");
    expect(texts(accepted)).toContain("We saved your technical request.");
  });

  it("uses constrained semantic billing classification and traces ConditionStep routing", async () => {
    const semanticInputResolver = vi.fn(async () => ({
      outcome: "billing_debt",
      confidence: 0.94,
      variables: { billingArea: "debt" },
    }));
    const runtime = engineWith(referenceFlowVersion(), { semanticInputResolver });
    await startAndSelect(runtime, "conversation-billing", "billing");

    const result = await runtime.processUserInput({
      conversationId: "conversation-billing",
      input: textInput("conversation-billing", "I need to know what I owe."),
    });

    expect(semanticInputResolver).toHaveBeenCalledWith(
      expect.objectContaining({ text: "I need to know what I owe." }),
      expect.objectContaining({
        allowedOutcomes: ["billing_debt", "billing_charge_error", "billing_other"],
        allowedVariableIds: ["billingArea"],
      }),
      expect.any(Object),
    );
    expect(variableValue(result, "billingQuestion")).toBe("I need to know what I owe.");
    expect(variableValue(result, "billingArea")).toBe("debt");
    expect(result.state.currentStepId).toBe("billing_debt_message");
    expect(texts(result)).toContain("You can review outstanding debt in your account.");
    expect(traceSources(result)).toEqual(
      expect.arrayContaining(["semantic_input", "condition:evaluate"]),
    );
    expect(result.trace.fragments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "condition:evaluate",
          data: expect.objectContaining({
            evaluated: expect.arrayContaining([
              expect.objectContaining({
                branchId: "debt_branch",
                matched: true,
              }),
            ]),
            selectedBranchId: "debt_branch",
          }),
        }),
      ]),
    );
  });

  it("fails loudly when semantic resolver returns undeclared outcomes or variables", async () => {
    const runtime = engineWith(referenceFlowVersion(), {
      semanticInputResolver: async () => ({
        outcome: "refund",
        confidence: 0.99,
        variables: { undeclaredVariable: true },
      }),
    });
    await startAndSelect(runtime, "conversation-bad-semantic", "billing");

    const result = await runtime.processUserInput({
      conversationId: "conversation-bad-semantic",
      input: textInput("conversation-bad-semantic", "refund me"),
    });

    expectStructuredFailure(result, "SEMANTIC_RESULT_OUT_OF_CONTRACT");
    expect(result.state.currentStepId).toBe("billing_question");
  });

  it("renders generated responses through the constrained generator and requires declared fallbacks", async () => {
    const llmResponseGenerator = vi.fn(async () => ({
      text: "Your ticket 123 is still being reviewed.",
      usedVariableIds: ["ticketId"],
    }));
    const runtime = engineWith(generatedResponseFlow(), { llmResponseGenerator });

    const result = await runtime.startConversation({
      conversationId: "conversation-generated",
      flowVersionId: "generated-v1",
      initialVariables: { ticketId: "123", privateNote: "do not expose" },
    });

    expect(llmResponseGenerator).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "generated",
        allowedVariableIds: ["ticketId"],
        fallbackText: "We are reviewing your ticket.",
      }),
      expect.objectContaining({
        state: expect.any(Object),
      }),
    );
    expect(texts(result)).toEqual(["Your ticket 123 is still being reviewed."]);
    expect(traceSources(result)).toContain("llm:response_generation");

    const missingGenerator = await engineWith(generatedResponseFlow()).startConversation({
      conversationId: "conversation-no-generator",
      flowVersionId: "generated-v1",
      initialVariables: { ticketId: "123" },
    });

    expectStructuredFailure(missingGenerator, "LLM_RESPONSE_GENERATOR_NOT_REGISTERED");

    const generatorFailureWithFallback = await engineWith(generatedResponseFlow(), {
      llmResponseGenerator: async () => {
        throw new Error("provider unavailable");
      },
    }).startConversation({
      conversationId: "conversation-generator-fallback",
      flowVersionId: "generated-v1",
      initialVariables: { ticketId: "123" },
    });

    expect(texts(generatorFailureWithFallback)).toEqual(["We are reviewing your ticket."]);
    expect(eventTypes(generatorFailureWithFallback)).toContain("llm_response_generation_failed");
  });

  it.each([
    ["success", "found", "customer_found", "Customer was found."],
    ["failure", "not_found", "customer_not_found", "We could not find that customer."],
  ])("routes RunActionOperation %s results through declared branches", async (_name, outcome, stepId, message) => {
    const actionHandler = vi.fn(async () => ({
      status: outcome === "found" ? "success" : "error",
      outcome,
      outputs: { customerStatus: outcome },
    }));
    const runtime = engineWith(actionFlow(), {
      actionHandlers: {
        local: actionHandler,
      },
    });

    const result = await runtime.startConversation({
      conversationId: `conversation-action-${outcome}`,
      flowVersionId: "action-v1",
      initialVariables: { dni: "12345678" },
    });

    expect(actionHandler).toHaveBeenCalledWith(
      expect.objectContaining({ actionId: "lookup_customer" }),
      { dni: "12345678" },
      expect.any(Object),
    );
    expect(variableValue(result, "customerStatus")).toBe(outcome);
    expect(result.state.currentStepId).toBe(stepId);
    expect(texts(result)).toContain(message);
    expect(traceSources(result)).toEqual(
      expect.arrayContaining(["operation:run_action", "action:local", "operation_result_branch"]),
    );
  });

  it("applies set, unset, invalidate, reads, scopes, and history without direct handler mutation", async () => {
    const runtime = engineWith(variableFlow());

    const result = await runtime.startConversation({
      conversationId: "conversation-variables",
      flowVersionId: "variables-v1",
      initialVariables: { contactReason: "billing", staleValue: "old" },
    });

    expect(variableValue(result, "contactReason")).toBe("billing-reviewed");
    expect(variableValue(result, "staleValue")).toBeUndefined();
    expect(variableMeta(result, "staleValue")).toMatchObject({ invalidated: true });
    expect(variableValue(result, "flowScratch")).toBe("local-only");
    expect(variableHistory(result, "contactReason")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ nextValue: "billing", source: "system" }),
        expect.objectContaining({ previousValue: "billing", nextValue: "billing-reviewed" }),
      ]),
    );
    expect(result.trace.fragments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "variable:read",
          data: expect.objectContaining({ variableId: "contactReason", scope: "conversation" }),
        }),
        expect.objectContaining({
          source: "variable:write",
          data: expect.objectContaining({ variableId: "flowScratch", scope: "flow" }),
        }),
      ]),
    );
  });

  it("executes custom operations only through explicit contracts and routes their results", async () => {
    const customOperation = vi.fn(async (_operation: unknown, _input: unknown, context: unknown) => ({
      status: "completed",
      outcome: "accepted",
      variablePatches: [
        {
          type: "set",
          variableId: "auditStatus",
          value: (context as { services?: { stepRegistry?: { hasHandler(stepType: string): boolean } } }).services?.stepRegistry?.hasHandler("message")
            ? "accepted"
            : "missing-services",
          source: "operation",
        },
      ],
      trace: { source: "custom_operation:audit_decision", data: { outcome: "accepted" } },
    }));
    const runtime = engineWith(customOperationFlow(), {
      customOperations: {
        audit_decision: {
          inputSchema: { type: "object", required: ["dni"] },
          outputVariables: ["auditStatus"],
          outcomes: ["accepted", "rejected"],
          execute: customOperation,
        },
      },
    });

    const result = await runtime.startConversation({
      conversationId: "conversation-custom-operation",
      flowVersionId: "custom-operation-v1",
      initialVariables: { dni: "12345678" },
    });

    expect(customOperation).toHaveBeenCalled();
    expect(variableValue(result, "auditStatus")).toBe("accepted");
    expect(result.state.currentStepId).toBe("audit_accepted");
    expect(texts(result)).toContain("Audit accepted.");
  });

  it("calls another flow sharing conversation variables while isolating flow-scoped variables", async () => {
    const runtime = engineWith(parentFlowVersion(), {
      flowVersions: [childFlowVersion()],
    });

    const result = await runtime.startConversation({
      conversationId: "conversation-flow-call",
      flowVersionId: "parent-v1",
    });

    expect(variableValue(result, "dni")).toBe("12345678");
    expect(variableValue(result, "childFlowScratch")).toBeUndefined();
    expect(result.state.currentStepId).toBe("parent_done");
    expect(texts(result)).toContain("Parent received DNI 12345678.");
    expect(result.trace.fragments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "operation:call_flow",
          data: expect.objectContaining({
            flowVersionId: CHILD_FLOW_VERSION_ID,
            sharedVariables: ["dni"],
            isolatedVariables: ["childFlowScratch"],
          }),
        }),
      ]),
    );
  });

  it("ends advanced human handoff with status, trace, and variables", async () => {
    const runtime = engineWith(referenceFlowVersion());
    await startAndSelect(runtime, "conversation-handoff", "agent");

    const result = await runtime.processUserInput({
      conversationId: "conversation-handoff",
      input: textInput("conversation-handoff", "human"),
    });

    expect(result.state.status).toBe("handoff");
    expect(variableValue(result, "advisorChannel")).toBe("human");
    expect(variableValue(result, "handoffId")).toMatch(/^handoff-/);
    expect(texts(result)).toContain("A human agent will continue this conversation.");
    expect(eventTypes(result)).toEqual(
      expect.arrayContaining(["handoff_started", "handoff_completed", "conversation_completed"]),
    );
    expect(traceSources(result)).toEqual(expect.arrayContaining(["operation:handoff"]));
  });

  it("runs onEnter/onExit operations, operation-result branch chaining, and append-only persistence", async () => {
    const runtime = engineWith(lifecycleFlow(), {
      actionHandlers: {
        local: async () => ({
          status: "success",
          outcome: "queued",
          outputs: { queueId: "queue-1" },
        }),
      },
    });

    const first = await runtime.startConversation({
      conversationId: "conversation-lifecycle",
      flowVersionId: "lifecycle-v1",
    });

    expect(variableValue(first, "enteredStep")).toBe("start");
    expect(variableValue(first, "exitedStep")).toBe("start");
    expect(variableValue(first, "queueId")).toBe("queue-1");
    expect(first.state.currentStepId).toBe("queued");

    const eventsAfterFirst = await runtime.repositories.events.listByConversationId("conversation-lifecycle");
    const tracesAfterFirst = await runtime.repositories.traces.listByConversationId("conversation-lifecycle");

    const second = await runtime.processUserInput({
      conversationId: "conversation-lifecycle",
      input: textInput("conversation-lifecycle", "ignored because completed"),
    });

    const eventsAfterSecond = await runtime.repositories.events.listByConversationId("conversation-lifecycle");
    const tracesAfterSecond = await runtime.repositories.traces.listByConversationId("conversation-lifecycle");

    expect(second.error?.code).toBe("CONVERSATION_NOT_WAITING_FOR_INPUT");
    expect(eventsAfterSecond.length).toBeGreaterThan(eventsAfterFirst.length);
    expect(tracesAfterSecond.length).toBe(tracesAfterFirst.length + 1);
    expect(eventsAfterSecond.slice(0, eventsAfterFirst.length)).toEqual(eventsAfterFirst);
    expect(tracesAfterSecond.slice(0, tracesAfterFirst.length)).toEqual(tracesAfterFirst);
  });

  it("does not commit async operation patches until the operation result resolves", async () => {
    const deferredAction = deferred<unknown>();
    const runtime = engineWith(asyncActionFlow(), {
      actionHandlers: {
        local: async () => {
          await deferredAction.promise;
          return {
            status: "success",
            outcome: "completed",
            outputs: { asyncResult: "committed" },
          };
        },
      },
    });

    const pending = runtime.startConversation({
      conversationId: "conversation-async",
      flowVersionId: "async-action-v1",
    });

    await Promise.resolve();
    const stateBeforeResolution = await runtime.repositories.states.getByConversationId("conversation-async");
    expect(variableValueFromState(stateBeforeResolution, "asyncResult")).toBeUndefined();

    deferredAction.resolve(undefined);
    const result = await pending;

    expect(variableValue(result, "asyncResult")).toBe("committed");
    expect(result.state.currentStepId).toBe("async_done");
    expect(eventTypes(result)).toEqual(
      expect.arrayContaining(["operation_started", "operation_completed", "variable_set"]),
    );
  });

  it("registers custom steps without modifying the runtime core", async () => {
    const runtime = engineWith(customStepFlow(), {
      stepHandlers: {
        survey_rating: {
          stepType: "survey_rating",
          enter: async () => ({
            status: "waiting_input",
            messages: [textMessage("How would you rate the support?")],
            waitState: { stepId: "rating_step" },
            trace: { source: "custom_step:survey_rating", data: { phase: "enter" } },
          }),
          handleInput: async (_context: unknown, input: UserInput) => ({
            status: "completed",
            outcome: "rated",
            variablePatches: [
              {
                type: "set",
                variableId: "rating",
                value: Number((input as { text: string }).text),
                source: "user_input",
              },
            ],
            trace: { source: "custom_step:survey_rating", data: { phase: "handle_input" } },
          }),
          validate: () => [],
        },
      },
    });

    const start = await runtime.startConversation({
      conversationId: "conversation-custom-step",
      flowVersionId: "custom-step-v1",
    });

    expect(texts(start)).toEqual(["How would you rate the support?"]);
    expect(start.state.status).toBe("waiting_input");

    const result = await runtime.processUserInput({
      conversationId: "conversation-custom-step",
      input: textInput("conversation-custom-step", "5"),
    });

    expect(variableValue(result, "rating")).toBe(5);
    expect(result.state.currentStepId).toBe("rating_done");
    expect(texts(result)).toContain("Thanks for the rating.");
  });
});

describe("Nexembot v0.1 no-silent-fallback guarantees", () => {
  it.each([
    ["missing step handler", unknownStepFlow(), "STEP_HANDLER_NOT_REGISTERED"],
    ["missing operation handler", unknownOperationFlow(), "OPERATION_HANDLER_NOT_REGISTERED"],
    ["missing action handler", actionFlow(), "ACTION_HANDLER_NOT_REGISTERED"],
    ["missing response", missingResponseFlow(), "RESPONSE_NOT_FOUND"],
    ["missing variable", missingVariableFlow(), "missing_variable_reference"],
    ["missing action", missingActionFlow(), "ACTION_NOT_FOUND"],
    ["missing flow version", missingFlowCallFlow(), "FLOW_VERSION_NOT_FOUND"],
    ["missing LLM generator", generatedResponseFlow(), "LLM_RESPONSE_GENERATOR_NOT_REGISTERED"],
    ["missing semantic resolver", semanticOnlyFlow(), "SEMANTIC_INPUT_RESOLVER_NOT_REGISTERED"],
    ["invalid target", invalidTargetFlow(), "INVALID_TARGET"],
  ])("%s produces a structured error, event, and trace", async (_name, flowVersion, code) => {
    const runtime = engineWith(flowVersion, {
      actionHandlers: code === "ACTION_HANDLER_NOT_REGISTERED" ? {} : { local: async () => ({ status: "success" }) },
    });

    let result = await runtime.startConversation({
      conversationId: `conversation-${code.toLowerCase()}`,
      flowVersionId: flowVersion.flowVersionId,
      initialVariables: code === "ACTION_HANDLER_NOT_REGISTERED" ? { dni: "12345678" } : undefined,
    });

    if (code === "SEMANTIC_INPUT_RESOLVER_NOT_REGISTERED") {
      result = await runtime.processUserInput({
        conversationId: `conversation-${code.toLowerCase()}`,
        input: textInput(`conversation-${code.toLowerCase()}`, "billing issue"),
      });
    }

    expectStructuredFailure(result, code);
  });
});

describe("Nexembot v0.1 model validation", () => {
  it.each([
    ["invalid target", invalidTargetFlow().definition, "INVALID_TARGET"],
    ["missing response", missingResponseFlow().definition, "RESPONSE_NOT_FOUND"],
    ["missing action", missingActionFlow().definition, "ACTION_NOT_FOUND"],
    ["missing variable", missingVariableFlow().definition, "VARIABLE_NOT_FOUND"],
    ["bad condition expression", badConditionExpressionFlow().definition, "INVALID_CONDITION_EXPRESSION"],
    ["generated response without fallback", generatedResponseWithoutFallbackFlow().definition, "GENERATED_RESPONSE_REQUIRES_FALLBACK"],
    ["generated response without allowed variables", generatedResponseWithoutAllowedVariablesFlow().definition, "GENERATED_RESPONSE_REQUIRES_ALLOWED_VARIABLES"],
    ["semantic task without allowed outcomes", semanticWithoutOutcomesFlow().definition, "SEMANTIC_TASK_REQUIRES_ALLOWED_OUTCOMES"],
    ["condition outside ConditionStep", routeConditionFlow().definition, "CONDITION_OUTSIDE_CONDITION_STEP"],
  ])("rejects %s", (_name, flow, code) => {
    const report = validateFlowDefinition(flow);

    expect(report.valid).toBe(false);
    expect(report.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          severity: "error",
          code,
        }),
      ]),
    );
  });
});

describe("Nexembot v0.1 spec regression coverage", () => {
  it("isolates flow scoped variables with the same name as parent conversation variables", async () => {
    const runtime = engineWith(scopeCollisionParentFlow(), {
      flowVersions: [scopeCollisionChildFlow()],
    });

    const result = await runtime.startConversation({
      conversationId: "conversation-scope-collision",
      flowVersionId: "scope-collision-parent-v1",
      initialVariables: { sharedName: "parent-value" },
    });

    expect(result.error).toBeUndefined();
    expect(variableValue(result, "sharedName")).toBe("parent-value");
    expect(texts(result)).toContain("Parent still has parent-value.");
  });

  it("records initial variables as events, trace patches, and variable history", async () => {
    const runtime = engineWith(initialVariableTraceFlow());

    const result = await runtime.startConversation({
      conversationId: "conversation-initial-trace",
      flowVersionId: "initial-trace-v1",
      initialVariables: { contactReason: "billing" },
    });

    expect(eventTypes(result)).toContain("variable_set");
    expect(result.trace.variablePatches).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "set", variableId: "contactReason", source: "system" }),
      ]),
    );
    expect(variableHistory(result, "contactReason")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ nextValue: "billing", source: "system" }),
      ]),
    );
  });

  it("runs after_invalid_input semantic tasks before retrying", async () => {
    const semanticInputResolver = vi.fn(async () => ({
      outcome: "request_handoff",
      confidence: 0.95,
      variables: { contactReason: "agent" },
    }));
    const runtime = engineWith(afterInvalidSemanticFlow(), { semanticInputResolver });
    await runtime.startConversation({
      conversationId: "conversation-after-invalid",
      flowVersionId: "after-invalid-semantic-v1",
    });

    const result = await runtime.processUserInput({
      conversationId: "conversation-after-invalid",
      input: textInput("conversation-after-invalid", "I want a human"),
    });

    expect(semanticInputResolver).toHaveBeenCalled();
    expect(result.error).toBeUndefined();
    expect(variableValue(result, "contactReason")).toBe("agent");
    expect(result.state.currentStepId).toBe("handoff_message");
    expect(texts(result)).toContain("Routing to a human.");
  });

  it("honors menu selection policies and rejects disabled number selection", async () => {
    const runtime = engineWith(menuPolicyFlow());
    await runtime.startConversation({
      conversationId: "conversation-menu-policy",
      flowVersionId: "menu-policy-v1",
    });

    const result = await runtime.processUserInput({
      conversationId: "conversation-menu-policy",
      input: textInput("conversation-menu-policy", "1"),
    });

    expect(result.state.currentStepId).toBe("policy_menu");
    expect(texts(result)).toEqual([
      "Please choose by label.",
      "Policy menu.",
    ]);
    expect(variableValue(result, "contactReason")).toBeUndefined();
  });

  it("fails loudly when a template references a missing variable", async () => {
    const result = await engineWith(missingTemplateVariableFlow()).startConversation({
      conversationId: "conversation-missing-template-variable",
      flowVersionId: "missing-template-variable-v1",
    });

    expectStructuredFailure(result, "missing_variable_reference");
    expect(result.error).toMatchObject({
      variableId: "missingName",
      scope: "conversation",
    });
  });

  it("fails loudly when an operation value references a missing variable", async () => {
    const result = await engineWith(missingExpressionVariableFlow()).startConversation({
      conversationId: "conversation-missing-expression-variable",
      flowVersionId: "missing-expression-variable-v1",
    });

    expectStructuredFailure(result, "missing_variable_reference");
    expect(result.error).toMatchObject({
      variableId: "missingSource",
      scope: "conversation",
    });
  });

  it("fails loudly for unknown validators instead of accepting invalid input", async () => {
    const runtime = engineWith(unknownValidatorFlow());
    await runtime.startConversation({
      conversationId: "conversation-unknown-validator",
      flowVersionId: "unknown-validator-v1",
    });

    const result = await runtime.processUserInput({
      conversationId: "conversation-unknown-validator",
      input: textInput("conversation-unknown-validator", "anything"),
    });

    expectStructuredFailure(result, "VALIDATOR_NOT_REGISTERED");
  });

  it("fails structurally when action output mapping targets an unknown variable", async () => {
    const runtime = engineWith(actionOutputMissingVariableFlow(), {
      actionHandlers: {
        local: async () => ({
          status: "success",
          outcome: "success",
          outputs: { customerStatus: "active" },
        }),
      },
    });

    const result = await runtime.startConversation({
      conversationId: "conversation-action-output-missing-variable",
      flowVersionId: "action-output-missing-variable-v1",
      initialVariables: { dni: "12345678" },
    });

    expectStructuredFailure(result, "missing_variable_reference");
    expect(result.error).toMatchObject({
      variableId: "unknownOutput",
      scope: "conversation",
    });
  });

  it("does not fall back to private state when persistence repositories are injected", async () => {
    const runtime = engineWith(menuPolicyFlow(), {
      repositories: {
        conversations: {
          getById: async () => undefined,
          save: async () => undefined,
        },
        states: {
          getByConversationId: async () => undefined,
          save: async () => undefined,
        },
      },
    });

    await runtime.startConversation({
      conversationId: "conversation-broken-persistence",
      flowVersionId: "menu-policy-v1",
    });

    const result = await runtime.processUserInput({
      conversationId: "conversation-broken-persistence",
      input: textInput("conversation-broken-persistence", "Billing"),
    });

    expectStructuredFailure(result, "CONVERSATION_NOT_FOUND");
  });

  it("does not execute actions when input mapping references a missing variable", async () => {
    const actionHandler = vi.fn(async () => ({
      status: "success",
      outcome: "found",
      outputs: { customerStatus: "found" },
    }));
    const runtime = engineWith(actionFlow(), {
      actionHandlers: { local: actionHandler },
    });

    const result = await runtime.startConversation({
      conversationId: "conversation-action-missing-input",
      flowVersionId: "action-v1",
    });

    expect(actionHandler).not.toHaveBeenCalled();
    expectStructuredFailure(result, "missing_variable_reference");
    expect(result.error).toMatchObject({
      variableId: "dni",
      scope: "conversation",
    });
    expect(result.state.status).toBe("failed");
  });

  it("keeps excluded variables isolated during flow calls", async () => {
    const runtime = engineWith(variableSharingParentFlow(), {
      flowVersions: [variableSharingChildFlow()],
    });

    const result = await runtime.startConversation({
      conversationId: "conversation-variable-sharing",
      flowVersionId: "variable-sharing-parent-v1",
      initialVariables: { secret: "parent-secret" },
    });

    expect(result.error).toBeUndefined();
    expect(variableValue(result, "secret")).toBe("parent-secret");
    expect(texts(result)).toContain("Secret is parent-secret.");
    expect(result.trace.fragments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "operation:call_flow",
          data: expect.objectContaining({
            sharedVariables: [],
            isolatedVariables: expect.arrayContaining(["secret"]),
          }),
        }),
      ]),
    );
  });

  it("rejects generated responses that report disallowed variable usage", async () => {
    const runtime = engineWith(generatedResponseFlow(), {
      llmResponseGenerator: async () => ({
        text: "Leaked private note.",
        usedVariableIds: ["privateNote"],
      }),
    });

    const result = await runtime.startConversation({
      conversationId: "conversation-generated-contract-violation",
      flowVersionId: "generated-v1",
      initialVariables: { ticketId: "123", privateNote: "secret" },
    });

    expect(texts(result)).toEqual([]);
    expectStructuredFailure(result, "invalid_generated_response_variable");
    expect(result.error).toMatchObject({
      variableId: "privateNote",
      allowedVariableIds: ["ticketId"],
    });
  });

  it("rejects generated responses that omit used variable declarations", async () => {
    const runtime = engineWith(generatedResponseFlow(), {
      llmResponseGenerator: async () => ({
        text: "Leaked private note: secret.",
      }),
    });

    const result = await runtime.startConversation({
      conversationId: "conversation-generated-missing-usage",
      flowVersionId: "generated-v1",
      initialVariables: { ticketId: "123", privateNote: "secret" },
    });

    expect(texts(result)).toEqual([]);
    expectStructuredFailure(result, "LLM_RESPONSE_USAGE_NOT_DECLARED");
  });

  it("maps variables into and out of called flows without leaking child state", async () => {
    const runtime = engineWith(mappedFlowParent(), {
      flowVersions: [mappedFlowChild()],
    });

    const result = await runtime.startConversation({
      conversationId: "conversation-mapped-flow-call",
      flowVersionId: "mapped-flow-parent-v1",
      initialVariables: { parentInput: "mapped-value" },
    });

    expect(result.error).toBeUndefined();
    expect(variableValue(result, "parentOutput")).toBe("mapped-value");
    expect(result.state.currentStepId).toBe("done");
    expect(texts(result)).toContain("Output mapped-value.");
    expect(variableValue(result, "childInput")).toBeUndefined();
    expect(variableValue(result, "childOutput")).toBeUndefined();
    expect(result.trace.fragments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "operation:call_flow",
          data: expect.objectContaining({
            sharedVariables: [],
            outputVariables: ["parentOutput"],
          }),
        }),
      ]),
    );
  });

  it("resumes a called flow that is waiting for input and returns to the parent flow", async () => {
    const runtime = engineWith(waitingFlowParent(), {
      flowVersions: [waitingFlowChild()],
    });

    const start = await runtime.startConversation({
      conversationId: "conversation-waiting-flow-call",
      flowVersionId: "waiting-flow-parent-v1",
    });

    expect(start.error).toBeUndefined();
    expect(start.state.status).toBe("waiting_input");
    expect(start.state.currentStepId).toBe("child_question");
    expect(texts(start)).toContain("Child question?");
    expect(variableValue(start, "childAnswer")).toBeUndefined();

    const result = await runtime.processUserInput({
      conversationId: "conversation-waiting-flow-call",
      input: textInput("conversation-waiting-flow-call", "hello child"),
    });

    expect(result.error).toBeUndefined();
    expect(variableValue(result, "parentAnswer")).toBe("hello child");
    expect(variableValue(result, "childAnswer")).toBeUndefined();
    expect(result.state.executionStack).toEqual([]);
    expect(result.state.status).toBe("completed");
    expect(result.state.currentStepId).toBe("parent_done");
    expect(texts(result)).toContain("Parent received hello child.");
    expect(traceSources(result)).toEqual(expect.arrayContaining(["operation:call_flow"]));
  });

  it("keeps child flow variable history out of the parent conversation history", async () => {
    const runtime = engineWith(waitingFlowParent(), {
      flowVersions: [waitingFlowChild()],
    });

    await runtime.startConversation({
      conversationId: "conversation-child-history",
      flowVersionId: "waiting-flow-parent-v1",
    });

    const result = await runtime.processUserInput({
      conversationId: "conversation-child-history",
      input: textInput("conversation-child-history", "history value"),
    });

    expect(variableHistory(result, "childAnswer")).toEqual([]);
    expect(variableHistory(result, "parentAnswer")).toEqual([
      expect.objectContaining({
        nextValue: "history value",
        source: "flow_call",
      }),
    ]);
  });

  it("honors injected repositories, config, runtime, and exposes services in custom contexts", async () => {
    const savedConversations: unknown[] = [];
    const appendedEvents: unknown[] = [];
    const runtimeNow = "2026-05-22T13:00:00.000Z";
    const runtime = engineWith(compositionFlow(), {
      config: { defaultLocale: "en", maxStepExecutionsPerTurn: 7 },
      runtime: {
        config: { defaultChannel: "telegram" },
        clock: { now: () => runtimeNow },
      },
      repositories: {
        conversations: {
          getById: async (conversationId: string) => savedConversations.find((conversation) => (
            conversation as { conversationId?: string }
          ).conversationId === conversationId) as never,
          save: async (conversation: unknown) => {
            savedConversations.push(conversation);
          },
        },
        events: {
          append: async (events: unknown[]) => {
            appendedEvents.push(...events);
          },
          listByConversationId: async (conversationId: string) => appendedEvents.filter((event) => (
            event as { conversationId?: string }
          ).conversationId === conversationId) as never,
        },
      },
    });

    expect(runtime.runtime.config).toMatchObject({
      defaultChannel: "telegram",
      defaultLocale: "en",
      maxStepExecutionsPerTurn: 7,
    });
    expect(runtime.runtime.clock.now()).toBe(runtimeNow);
    expect(runtime.services.stepRegistry.hasHandler("message")).toBe(true);
    expect(runtime.services.stepRegistry.hasHandler("composition_step")).toBe(false);

    runtime.services.stepRegistry.register({
      stepType: "composition_step",
      validate: () => [],
      enter: async (context: unknown) => ({
        status: "completed",
        outcome: "done",
        variablePatches: [
          {
            type: "set",
            variableId: "serviceSeen",
            value: Boolean((context as { services?: unknown }).services),
            source: "operation",
          },
        ],
        trace: { source: "custom_step:composition_step" },
      }),
    });

    const result = await runtime.startConversation({
      conversationId: "conversation-composition",
      flowVersionId: "composition-v1",
    });

    expect(result.error).toBeUndefined();
    expect(variableValue(result, "serviceSeen")).toBe(true);
    expect(savedConversations).toEqual([
      expect.objectContaining({ conversationId: "conversation-composition" }),
    ]);
    expect(await runtime.repositories.events.listByConversationId("conversation-composition")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "conversation_started" }),
      ]),
    );
    expect(await runtime.repositories.conversations.getById("conversation-composition")).toMatchObject({
      conversationId: "conversation-composition",
    });
  });

  it("executes custom steps from an injected service registry", async () => {
    const injectedHandler = {
      stepType: "composition_step",
      validate: () => [],
      enter: async (context: unknown) => ({
        status: "completed",
        outcome: "done",
        variablePatches: [
          {
            type: "set",
            variableId: "serviceSeen",
            value: Boolean((context as { services?: unknown }).services),
            source: "operation",
          },
        ],
        trace: { source: "custom_step:composition_step" },
      }),
    };
    const runtime = engineWith(compositionFlow(), {
      services: {
        stepRegistry: {
          register: () => undefined,
          getHandler: (stepType: string) => {
            if (stepType !== "composition_step") throw new Error(`Unexpected step type ${stepType}`);
            return injectedHandler;
          },
          hasHandler: (stepType: string) => stepType === "composition_step",
        },
      },
    });

    const result = await runtime.startConversation({
      conversationId: "conversation-injected-service",
      flowVersionId: "composition-v1",
    });

    expect(result.error).toBeUndefined();
    expect(variableValue(result, "serviceSeen")).toBe(true);
  });

  it("returns public structured missing_variable_reference errors with details", async () => {
    const result = await engineWith(missingTemplateVariableFlow()).startConversation({
      conversationId: "conversation-public-error",
      flowVersionId: "missing-template-variable-v1",
    });

    expect(result.error).toMatchObject({
      code: "missing_variable_reference",
      variableId: "missingName",
      scope: "conversation",
      recoverable: false,
    });
  });

  it("supports semantic menu selection through declared policy", async () => {
    const semanticInputResolver = vi.fn(async () => ({
      outcome: "billing",
      confidence: 0.91,
      variables: {},
    }));
    const runtime = engineWith(semanticMenuFlow(), { semanticInputResolver });
    await runtime.startConversation({
      conversationId: "conversation-semantic-menu",
      flowVersionId: "semantic-menu-v1",
    });

    const result = await runtime.processUserInput({
      conversationId: "conversation-semantic-menu",
      input: textInput("conversation-semantic-menu", "I need help with an invoice"),
    });

    expect(semanticInputResolver).toHaveBeenCalledWith(
      expect.objectContaining({ text: "I need help with an invoice" }),
      expect.objectContaining({
        mode: "menu_selection",
        allowedOutcomes: ["billing", "technical"],
        allowedVariableIds: [],
        threshold: 0.75,
      }),
      expect.any(Object),
    );
    expect(result.error).toBeUndefined();
    expect(variableValue(result, "contactReason")).toBe("billing");
    expect(result.state.status).toBe("completed");
    expect(traceSources(result)).toEqual(expect.arrayContaining(["menu:resolve"]));
  });

  it("fails loudly when semantic menu selection is enabled without a resolver", async () => {
    const runtime = engineWith(semanticMenuFlow());
    await runtime.startConversation({
      conversationId: "conversation-semantic-menu-missing-resolver",
      flowVersionId: "semantic-menu-v1",
    });

    const result = await runtime.processUserInput({
      conversationId: "conversation-semantic-menu-missing-resolver",
      input: textInput("conversation-semantic-menu-missing-resolver", "I need help with an invoice"),
    });

    expectStructuredFailure(result, "SEMANTIC_INPUT_RESOLVER_NOT_REGISTERED");
    expect(variableValue(result, "contactReason")).toBeUndefined();
  });

  it("routes free-text menu input only when the policy explicitly allows it", async () => {
    const runtime = engineWith(freeTextMenuFlow());
    await runtime.startConversation({
      conversationId: "conversation-free-text-menu",
      flowVersionId: "free-text-menu-v1",
    });

    const result = await runtime.processUserInput({
      conversationId: "conversation-free-text-menu",
      input: textInput("conversation-free-text-menu", "Something else"),
    });

    expect(result.error).toBeUndefined();
    expect(variableValue(result, "contactReason")).toBe("free_text");
    expect(result.state.status).toBe("completed");
    expect(result.trace.fragments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "menu:resolve",
          data: expect.objectContaining({ resolver: "free_text" }),
        }),
      ]),
    );
  });
});

function engineWith(primaryFlowVersion: FlowVersion, options: Record<string, unknown> = {}) {
  const extraFlowVersions = Array.isArray(options.flowVersions) ? options.flowVersions : [];

  return createConversationEngine({
    clock: { now: () => NOW },
    idGenerator: deterministicIds(),
    maxStepExecutionsPerTurn: 20,
    ...options,
    flowVersions: [primaryFlowVersion, ...extraFlowVersions],
  }) as ConversationEngine &
    ConversationEngineModule & {
      repositories: {
        states: { getByConversationId(conversationId: string): Promise<unknown> };
        events: { listByConversationId(conversationId: string): Promise<unknown[]> };
        traces: { listByConversationId(conversationId: string): Promise<unknown[]> };
      };
    };
}

async function startAndSelect(runtime: ConversationEngine, conversationId: string, option: string) {
  await runtime.startConversation({ conversationId, flowVersionId: FLOW_VERSION_ID });
  return runtime.processUserInput({
    conversationId,
    input: textInput(conversationId, option),
  });
}

function referenceFlowVersion(): FlowVersion {
  return flowVersion(FLOW_VERSION_ID, {
    flowId: "support",
    startStepId: "welcome",
    variables: [
      variable("contactReason", "string", "conversation"),
      variable("dni", "string", "conversation"),
      variable("billingQuestion", "string", "conversation"),
      variable("billingArea", "string", "conversation"),
      variable("advisorChannel", "string", "conversation"),
      variable("handoffId", "string", "conversation"),
      variable("attachmentRef", "object", "conversation"),
    ],
    steps: [
      messageStep("welcome", ["Hello.", "Thanks for contacting us."], {
        autoAdvance: true,
        routes: [route("next", branch({ target: stepTarget("main_menu") }))],
      }),
      menuStep("main_menu", "Choose an option.", [
        option("technical", "Technical support", ["tech", "technical"], branch({
          operations: [
            setVariable("contactReason", "technical", "menu_selection"),
            sendMessage("I can help with a technical request."),
          ],
          target: stepTarget("ask_dni"),
        })),
        option("billing", "Billing question", ["billing", "invoice"], branch({
          operations: [setVariable("contactReason", "billing", "menu_selection")],
          target: stepTarget("billing_question"),
        })),
        option("agent", "Talk to an agent", ["agent", "human"], branch({
          operations: [setVariable("contactReason", "agent", "menu_selection")],
          target: stepTarget("contact_menu"),
        })),
      ]),
      inputStep("ask_dni", "Please enter your DNI.", "dni", {
        validators: [{ type: "regex", options: { pattern: "^\\d+$" } }],
        invalidMessage: "DNI must contain only numbers.",
        routes: [route("captured", branch({ target: stepTarget("technical_attachment") }))],
      }),
      attachmentStep("technical_attachment", "Attach a PDF or image if you have one.", "attachmentRef", {
        allowedMimeTypes: ["application/pdf", "image/png", "image/jpeg"],
        allowedExtensions: [".pdf", ".png", ".jpg", ".jpeg"],
        maxSizeMb: 5,
        invalidMessage: "Please attach a PDF, PNG, or JPG file smaller than 5 MB.",
        routes: [route("captured", branch({ target: stepTarget("technical_done") }))],
      }),
      messageStep("technical_done", ["We saved your technical request."], {
        autoAdvance: true,
        routes: [route("next", branch({ target: endTarget("completed") }))],
      }),
      inputStep("billing_question", "What is your billing question?", "billingQuestion", {
        semanticTasks: [
          {
            taskId: "classify_billing",
            mode: "after_valid_capture",
            allowedOutcomes: ["billing_debt", "billing_charge_error", "billing_other"],
            threshold: 0.75,
            saveOutcomeToVariableId: "billingArea",
            allowedVariableIds: ["billingArea"],
            promptHint: "Classify the billing question into the declared outcomes only.",
          },
        ],
        routes: [route("captured", branch({ target: stepTarget("billing_condition") }))],
      }),
      conditionStep("billing_condition", [
        {
          branchId: "debt_branch",
          outcome: "billing_debt",
          when: equals(variableRef("billingArea"), literal("debt")),
          branch: branch({ target: stepTarget("billing_debt_message") }),
        },
        {
          branchId: "charge_error_branch",
          outcome: "billing_charge_error",
          when: equals(variableRef("billingArea"), literal("charge_error")),
          branch: branch({ target: stepTarget("billing_charge_error_message") }),
        },
      ], branch({ target: stepTarget("billing_other_message") })),
      messageStep("billing_debt_message", ["You can review outstanding debt in your account."], {
        autoAdvance: true,
        routes: [route("next", branch({ target: endTarget("completed") }))],
      }),
      messageStep("billing_charge_error_message", ["We will review the disputed charge."], {
        autoAdvance: true,
        routes: [route("next", branch({ target: endTarget("completed") }))],
      }),
      messageStep("billing_other_message", ["We saved your billing question."], {
        autoAdvance: true,
        routes: [route("next", branch({ target: endTarget("completed") }))],
      }),
      menuStep("contact_menu", "Choose a contact channel.", [
        option("human", "Human advisor", ["human", "advisor"], branch({
          operations: [
            setVariable("advisorChannel", "human", "menu_selection"),
            {
              type: "handoff",
              operationId: "start_handoff",
              queueId: "support",
              reasonVariableId: "contactReason",
              saveHandoffIdToVariableId: "handoffId",
              message: staticText("A human agent will continue this conversation."),
              onResult: [
                {
                  match: { type: "outcome", outcome: "handoff_started" },
                  branch: branch({ target: endTarget("handoff") }),
                },
              ],
            },
          ],
        })),
        option("mail", "Email", ["mail", "email"], branch({
          operations: [setVariable("advisorChannel", "mail", "menu_selection")],
          target: stepTarget("mail_done"),
        })),
      ]),
      messageStep("mail_done", ["We will contact you by email."], {
        autoAdvance: true,
        routes: [route("next", branch({ target: endTarget("completed") }))],
      }),
    ],
  });
}

function actionFlow(): FlowVersion {
  return flowVersion("action-v1", {
    flowId: "action",
    startStepId: "lookup",
    variables: [
      variable("dni", "string", "conversation"),
      variable("customerStatus", "string", "conversation"),
    ],
    actions: [
      {
        actionId: "lookup_customer",
        kind: "local",
        resultOutcomes: ["found", "not_found"],
      },
    ],
    steps: [
      messageStep("lookup", [], {
        autoAdvance: true,
        onEnter: [
          {
            type: "run_action",
            operationId: "lookup_customer_operation",
            actionId: "lookup_customer",
            inputMapping: { dni: variableRef("dni") },
            outputMapping: { customerStatus: "customerStatus" },
            onResult: [
              {
                match: { type: "outcome", outcome: "found" },
                branch: branch({ target: stepTarget("customer_found") }),
              },
              {
                match: { type: "outcome", outcome: "not_found" },
                branch: branch({ target: stepTarget("customer_not_found") }),
              },
            ],
          },
        ],
      }),
      messageStep("customer_found", ["Customer was found."]),
      messageStep("customer_not_found", ["We could not find that customer."]),
    ],
  });
}

function variableFlow(): FlowVersion {
  return flowVersion("variables-v1", {
    flowId: "variables",
    startStepId: "review",
    variables: [
      variable("contactReason", "string", "conversation"),
      variable("staleValue", "string", "conversation"),
      variable("flowScratch", "string", "flow"),
    ],
    steps: [
      conditionStep("review", [
        {
          branchId: "billing_review",
          outcome: "billing",
          when: equals(variableRef("contactReason"), literal("billing")),
          branch: branch({
            operations: [
              unsetVariable("staleValue"),
              invalidateVariable("staleValue"),
              setVariable("contactReason", "billing-reviewed", "operation"),
              setVariable("flowScratch", "local-only", "operation"),
            ],
            target: endTarget("completed"),
          }),
        },
      ]),
    ],
  });
}

function generatedResponseFlow(): FlowVersion {
  return flowVersion("generated-v1", {
    flowId: "generated",
    startStepId: "generated_message",
    variables: [
      variable("ticketId", "string", "conversation"),
      variable("privateNote", "string", "conversation"),
    ],
    steps: [
      messageStep("generated_message", [
        {
          mode: "generated",
          goal: "Explain current ticket status.",
          allowedVariableIds: ["ticketId"],
          constraints: ["Do not include variables outside allowedVariableIds."],
          maxLength: 120,
          fallbackText: "We are reviewing your ticket.",
        },
      ]),
    ],
  });
}

function customOperationFlow(): FlowVersion {
  return flowVersion("custom-operation-v1", {
    flowId: "custom-operation",
    startStepId: "audit",
    variables: [
      variable("dni", "string", "conversation"),
      variable("auditStatus", "string", "conversation"),
    ],
    steps: [
      messageStep("audit", [], {
        autoAdvance: true,
        onEnter: [
          {
            type: "custom",
            operationId: "audit_decision_operation",
            customType: "audit_decision",
            inputMapping: { dni: variableRef("dni") },
            onResult: [
              {
                match: { type: "outcome", outcome: "accepted" },
                branch: branch({ target: stepTarget("audit_accepted") }),
              },
              {
                match: { type: "outcome", outcome: "rejected" },
                branch: branch({ target: stepTarget("audit_rejected") }),
              },
            ],
          },
        ],
      }),
      messageStep("audit_accepted", ["Audit accepted."]),
      messageStep("audit_rejected", ["Audit rejected."]),
    ],
  });
}

function parentFlowVersion(): FlowVersion {
  return flowVersion("parent-v1", {
    flowId: "parent",
    startStepId: "call_identity",
    variables: [variable("dni", "string", "conversation")],
    steps: [
      messageStep("call_identity", [], {
        autoAdvance: true,
        onEnter: [
          {
            type: "call_flow",
            operationId: "call_identity_flow",
            flowVersionId: CHILD_FLOW_VERSION_ID,
            sharedVariableIds: ["dni"],
            onResult: [
              {
                match: { type: "outcome", outcome: "completed" },
                branch: branch({ target: stepTarget("parent_done") }),
              },
            ],
          },
        ],
      }),
      messageStep("parent_done", [{ mode: "template", template: "Parent received DNI {{dni}}.", variableIds: ["dni"] }]),
    ],
  });
}

function childFlowVersion(): FlowVersion {
  return flowVersion(CHILD_FLOW_VERSION_ID, {
    flowId: "identity",
    startStepId: "set_identity",
    variables: [
      variable("dni", "string", "conversation"),
      variable("childFlowScratch", "string", "flow"),
    ],
    steps: [
      messageStep("set_identity", [], {
        autoAdvance: true,
        onEnter: [
          setVariable("dni", "12345678", "flow_call"),
          setVariable("childFlowScratch", "child-local", "operation"),
        ],
        routes: [route("next", branch({ target: endTarget("completed") }))],
      }),
    ],
  });
}

function lifecycleFlow(): FlowVersion {
  return flowVersion("lifecycle-v1", {
    flowId: "lifecycle",
    startStepId: "start",
    variables: [
      variable("enteredStep", "string", "conversation"),
      variable("exitedStep", "string", "conversation"),
      variable("queueId", "string", "conversation"),
    ],
    actions: [{ actionId: "enqueue", kind: "local", resultOutcomes: ["queued"] }],
    steps: [
      messageStep("start", ["Starting lifecycle."], {
        autoAdvance: true,
        onEnter: [setVariable("enteredStep", "start", "operation")],
        onExit: [
          setVariable("exitedStep", "start", "operation"),
          {
            type: "run_action",
            actionId: "enqueue",
            outputMapping: { queueId: "queueId" },
            onResult: [
              {
                match: { type: "outcome", outcome: "queued" },
                branch: branch({ target: stepTarget("queued") }),
              },
            ],
          },
        ],
        routes: [route("next", branch({ target: stepTarget("after_start") }))],
      }),
      messageStep("after_start", ["This step should be skipped by operation branch chaining."]),
      messageStep("queued", ["Queued."]),
    ],
  });
}

function asyncActionFlow(): FlowVersion {
  return flowVersion("async-action-v1", {
    flowId: "async-action",
    startStepId: "async_action",
    variables: [variable("asyncResult", "string", "conversation")],
    actions: [{ actionId: "async_action", kind: "local", resultOutcomes: ["completed"] }],
    steps: [
      messageStep("async_action", [], {
        autoAdvance: true,
        onEnter: [
          {
            type: "run_action",
            actionId: "async_action",
            outputMapping: { asyncResult: "asyncResult" },
            onResult: [
              {
                match: { type: "outcome", outcome: "completed" },
                branch: branch({ target: stepTarget("async_done") }),
              },
            ],
          },
        ],
      }),
      messageStep("async_done", ["Async operation committed."]),
    ],
  });
}

function customStepFlow(): FlowVersion {
  return flowVersion("custom-step-v1", {
    flowId: "custom-step",
    startStepId: "rating_step",
    variables: [variable("rating", "integer", "conversation")],
    steps: [
      {
        stepId: "rating_step",
        type: "custom",
        config: { customType: "survey_rating", payload: {} },
        routes: [route("rated", branch({ target: stepTarget("rating_done") }))],
      },
      messageStep("rating_done", ["Thanks for the rating."]),
    ],
  });
}

function semanticOnlyFlow(): FlowVersion {
  return flowVersion("semantic-only-v1", {
    flowId: "semantic-only",
    startStepId: "question",
    variables: [variable("billingQuestion", "string", "conversation"), variable("billingArea", "string", "conversation")],
    steps: [
      inputStep("question", "Describe the issue.", "billingQuestion", {
        semanticTasks: [
          {
            mode: "after_valid_capture",
            allowedOutcomes: ["billing_debt"],
            allowedVariableIds: ["billingArea"],
            threshold: 0.8,
          },
        ],
      }),
    ],
  });
}

function unknownStepFlow(): FlowVersion {
  return flowVersion("unknown-step-v1", {
    flowId: "unknown-step",
    startStepId: "unknown",
    steps: [{ stepId: "unknown", type: "payment", config: {} }],
  });
}

function unknownOperationFlow(): FlowVersion {
  return flowVersion("unknown-operation-v1", {
    flowId: "unknown-operation",
    startStepId: "start",
    steps: [
      messageStep("start", [], {
        onEnter: [{ type: "not_registered", operationId: "missing" }],
      }),
    ],
  });
}

function missingResponseFlow(): FlowVersion {
  return flowVersion("missing-response-v1", {
    flowId: "missing-response",
    startStepId: "start",
    responses: [],
    steps: [messageStep("start", [{ mode: "reference", responseId: "unknown_response" }])],
  });
}

function missingVariableFlow(): FlowVersion {
  return flowVersion("missing-variable-v1", {
    flowId: "missing-variable",
    startStepId: "start",
    variables: [],
    steps: [
      messageStep("start", [], {
        onEnter: [setVariable("unknown_variable", "value", "operation")],
      }),
    ],
  });
}

function missingActionFlow(): FlowVersion {
  return flowVersion("missing-action-v1", {
    flowId: "missing-action",
    startStepId: "start",
    actions: [],
    steps: [
      messageStep("start", [], {
        onEnter: [{ type: "run_action", actionId: "unknown_action" }],
      }),
    ],
  });
}

function missingFlowCallFlow(): FlowVersion {
  return flowVersion("missing-flow-call-v1", {
    flowId: "missing-flow-call",
    startStepId: "start",
    steps: [
      messageStep("start", [], {
        onEnter: [{ type: "call_flow", flowVersionId: "unknown-flow-version" }],
      }),
    ],
  });
}

function invalidTargetFlow(): FlowVersion {
  return flowVersion("invalid-target-v1", {
    flowId: "invalid-target",
    startStepId: "start",
    steps: [
      messageStep("start", ["Go missing."], {
        autoAdvance: true,
        routes: [route("next", branch({ target: stepTarget("missing_step") }))],
      }),
    ],
  });
}

function badConditionExpressionFlow(): FlowVersion {
  return flowVersion("bad-condition-v1", {
    flowId: "bad-condition",
    startStepId: "condition",
    variables: [variable("contactReason", "string", "conversation")],
    steps: [
      conditionStep("condition", [
        {
          branchId: "bad",
          outcome: "bad",
          when: { type: "script", code: "return true" },
          branch: branch({ target: endTarget("completed") }),
        },
      ]),
    ],
  });
}

function generatedResponseWithoutFallbackFlow(): FlowVersion {
  const flow = generatedResponseFlow();
  const step = flow.definition.steps[0] as { config: { messages: Array<Record<string, unknown>> } };
  delete step.config.messages[0].fallbackText;
  return flowVersion("generated-no-fallback-v1", {
    ...flow.definition,
    flowId: "generated-no-fallback",
    startStepId: "generated_message",
    steps: flow.definition.steps,
  });
}

function generatedResponseWithoutAllowedVariablesFlow(): FlowVersion {
  const flow = generatedResponseFlow();
  const step = flow.definition.steps[0] as { config: { messages: Array<Record<string, unknown>> } };
  delete step.config.messages[0].allowedVariableIds;
  return flowVersion("generated-no-allowed-variables-v1", {
    ...flow.definition,
    flowId: "generated-no-allowed-variables",
    startStepId: "generated_message",
    steps: flow.definition.steps,
  });
}

function semanticWithoutOutcomesFlow(): FlowVersion {
  const flow = semanticOnlyFlow();
  const step = flow.definition.steps[0] as { config: { input: { semanticTasks: Array<Record<string, unknown>> } } };
  step.config.input.semanticTasks[0].allowedOutcomes = [];
  return flowVersion("semantic-no-outcomes-v1", {
    ...flow.definition,
    flowId: "semantic-no-outcomes",
    steps: flow.definition.steps,
  });
}

function routeConditionFlow(): FlowVersion {
  return flowVersion("route-condition-v1", {
    flowId: "route-condition",
    startStepId: "start",
    variables: [variable("contactReason", "string", "conversation")],
    steps: [
      messageStep("start", ["Bad route."], {
        routes: [
          {
            ...route("next", branch({ target: endTarget("completed") })),
            condition: equals(variableRef("contactReason"), literal("billing")),
          },
        ],
      }),
    ],
  });
}

function scopeCollisionParentFlow(): FlowVersion {
  return flowVersion("scope-collision-parent-v1", {
    flowId: "scope-collision-parent",
    startStepId: "call_child",
    variables: [variable("sharedName", "string", "conversation")],
    steps: [
      messageStep("call_child", [], {
        autoAdvance: true,
        onEnter: [
          {
            type: "call_flow",
            operationId: "call_scope_child",
            flowVersionId: "scope-collision-child-v1",
            sharedVariableIds: ["sharedName"],
            onResult: [
              {
                match: { type: "outcome", outcome: "completed" },
                branch: branch({ target: stepTarget("done") }),
              },
            ],
          },
        ],
      }),
      messageStep("done", [{ mode: "template", template: "Parent still has {{sharedName}}.", variableIds: ["sharedName"] }]),
    ],
  });
}

function scopeCollisionChildFlow(): FlowVersion {
  return flowVersion("scope-collision-child-v1", {
    flowId: "scope-collision-child",
    startStepId: "set_local",
    variables: [variable("sharedName", "string", "flow")],
    steps: [
      messageStep("set_local", [], {
        autoAdvance: true,
        onEnter: [setVariable("sharedName", "child-local", "operation")],
        routes: [route("next", branch({ target: endTarget("completed") }))],
      }),
    ],
  });
}

function initialVariableTraceFlow(): FlowVersion {
  return flowVersion("initial-trace-v1", {
    flowId: "initial-trace",
    startStepId: "done",
    variables: [variable("contactReason", "string", "conversation")],
    steps: [messageStep("done", ["Done."])],
  });
}

function afterInvalidSemanticFlow(): FlowVersion {
  return flowVersion("after-invalid-semantic-v1", {
    flowId: "after-invalid-semantic",
    startStepId: "ask_dni",
    variables: [
      variable("dni", "string", "conversation"),
      variable("contactReason", "string", "conversation"),
    ],
    steps: [
      inputStep("ask_dni", "Please enter DNI.", "dni", {
        validators: [{ type: "regex", options: { pattern: "^\\d+$" } }],
        invalidMessage: "DNI must contain only numbers.",
        semanticTasks: [
          {
            taskId: "invalid_to_handoff",
            mode: "after_invalid_input",
            allowedOutcomes: ["request_handoff"],
            allowedVariableIds: ["contactReason"],
            threshold: 0.8,
          },
        ],
        routes: [
          route("captured", branch({ target: endTarget("completed") })),
          route("request_handoff", branch({ target: stepTarget("handoff_message") })),
        ],
      }),
      messageStep("handoff_message", ["Routing to a human."]),
    ],
  });
}

function menuPolicyFlow(): FlowVersion {
  return flowVersion("menu-policy-v1", {
    flowId: "menu-policy",
    startStepId: "policy_menu",
    variables: [variable("contactReason", "string", "conversation")],
    steps: [
      {
        stepId: "policy_menu",
        type: "menu",
        config: {
          prompt: staticText("Policy menu."),
          options: [
            option("billing", "Billing", ["billing"], branch({
              operations: [setVariable("contactReason", "billing", "menu_selection")],
              target: endTarget("completed"),
            })),
          ],
          selection: {
            allowNumbers: false,
            allowExactText: true,
            allowAliases: true,
            allowButtons: true,
          },
          invalidSelection: {
            message: staticText("Please choose by label."),
            target: { type: "stay" },
          },
        },
      },
    ],
  });
}

function missingTemplateVariableFlow(): FlowVersion {
  return flowVersion("missing-template-variable-v1", {
    flowId: "missing-template-variable",
    startStepId: "message",
    variables: [],
    steps: [messageStep("message", [{ mode: "template", template: "Hello {{missingName}}.", variableIds: ["missingName"] }])],
  });
}

function missingExpressionVariableFlow(): FlowVersion {
  return flowVersion("missing-expression-variable-v1", {
    flowId: "missing-expression-variable",
    startStepId: "start",
    variables: [variable("target", "string", "conversation")],
    steps: [
      messageStep("start", [], {
        autoAdvance: true,
        onEnter: [
          {
            type: "set_variable",
            variableId: "target",
            value: variableRef("missingSource"),
          },
        ],
      }),
    ],
  });
}

function unknownValidatorFlow(): FlowVersion {
  return flowVersion("unknown-validator-v1", {
    flowId: "unknown-validator",
    startStepId: "ask",
    variables: [variable("dni", "string", "conversation")],
    steps: [
      inputStep("ask", "Value?", "dni", {
        validators: [{ type: "not_registered_validator" }],
        routes: [route("captured", branch({ target: endTarget("completed") }))],
      }),
    ],
  });
}

function actionOutputMissingVariableFlow(): FlowVersion {
  return flowVersion("action-output-missing-variable-v1", {
    flowId: "action-output-missing-variable",
    startStepId: "lookup",
    variables: [variable("dni", "string", "conversation")],
    actions: [
      {
        actionId: "lookup_customer",
        kind: "local",
        resultOutcomes: ["success"],
      },
    ],
    steps: [
      messageStep("lookup", [], {
        autoAdvance: true,
        onEnter: [
          {
            type: "run_action",
            operationId: "lookup_customer",
            actionId: "lookup_customer",
            inputMapping: { dni: variableRef("dni") },
            outputMapping: { customerStatus: "unknownOutput" },
          },
        ],
      }),
    ],
  });
}

function variableSharingParentFlow(): FlowVersion {
  return flowVersion("variable-sharing-parent-v1", {
    flowId: "variable-sharing-parent",
    startStepId: "call_child",
    variables: [variable("secret", "string", "conversation")],
    steps: [
      messageStep("call_child", [], {
        autoAdvance: true,
        onEnter: [
          {
            type: "call_flow",
            operationId: "call_variable_sharing_child",
            flowVersionId: "variable-sharing-child-v1",
            variableSharing: {
              scopes: ["conversation"],
              excludeVariableIds: ["secret"],
            },
            onResult: [
              {
                match: { type: "outcome", outcome: "completed" },
                branch: branch({ target: stepTarget("done") }),
              },
            ],
          },
        ],
      }),
      messageStep("done", [{ mode: "template", template: "Secret is {{secret}}.", variableIds: ["secret"] }]),
    ],
  });
}

function variableSharingChildFlow(): FlowVersion {
  return flowVersion("variable-sharing-child-v1", {
    flowId: "variable-sharing-child",
    startStepId: "write_secret",
    variables: [variable("secret", "string", "conversation")],
    steps: [
      messageStep("write_secret", [], {
        autoAdvance: true,
        onEnter: [setVariable("secret", "child-secret", "flow_call")],
        routes: [route("next", branch({ target: endTarget("completed") }))],
      }),
    ],
  });
}

function mappedFlowParent(): FlowVersion {
  return flowVersion("mapped-flow-parent-v1", {
    flowId: "mapped-flow-parent",
    startStepId: "call_child",
    variables: [
      variable("parentInput", "string", "conversation"),
      variable("parentOutput", "string", "conversation"),
    ],
    steps: [
      messageStep("call_child", [], {
        autoAdvance: true,
        onEnter: [
          {
            type: "call_flow",
            operationId: "call_mapped_child",
            flowVersionId: "mapped-flow-child-v1",
            inputMapping: {
              childInput: variableRef("parentInput"),
            },
            outputMapping: {
              childOutput: "parentOutput",
            },
            variableSharing: {
              scopes: [],
            },
            onResult: [
              {
                match: { type: "outcome", outcome: "completed" },
                branch: branch({ target: stepTarget("done") }),
              },
            ],
          },
        ],
      }),
      messageStep("done", [{ mode: "template", template: "Output {{parentOutput}}.", variableIds: ["parentOutput"] }]),
    ],
  });
}

function mappedFlowChild(): FlowVersion {
  return flowVersion("mapped-flow-child-v1", {
    flowId: "mapped-flow-child",
    startStepId: "copy",
    variables: [
      variable("childInput", "string", "conversation"),
      variable("childOutput", "string", "conversation"),
    ],
    steps: [
      messageStep("copy", [], {
        autoAdvance: true,
        onEnter: [
          {
            type: "set_variable",
            variableId: "childOutput",
            value: variableRef("childInput"),
          },
        ],
        routes: [route("next", branch({ target: endTarget("completed") }))],
      }),
    ],
  });
}

function waitingFlowParent(): FlowVersion {
  return flowVersion("waiting-flow-parent-v1", {
    flowId: "waiting-flow-parent",
    startStepId: "call_child",
    variables: [variable("parentAnswer", "string", "conversation")],
    steps: [
      messageStep("call_child", [], {
        autoAdvance: true,
        onEnter: [
          {
            type: "call_flow",
            operationId: "call_waiting_child",
            flowVersionId: "waiting-flow-child-v1",
            outputMapping: {
              childAnswer: "parentAnswer",
            },
            variableSharing: {
              scopes: [],
            },
            onResult: [
              {
                match: { type: "outcome", outcome: "completed" },
                branch: branch({ target: stepTarget("parent_done") }),
              },
            ],
          },
        ],
      }),
      messageStep("parent_done", [{ mode: "template", template: "Parent received {{parentAnswer}}.", variableIds: ["parentAnswer"] }]),
    ],
  });
}

function waitingFlowChild(): FlowVersion {
  return flowVersion("waiting-flow-child-v1", {
    flowId: "waiting-flow-child",
    startStepId: "child_question",
    variables: [variable("childAnswer", "string", "conversation")],
    steps: [
      inputStep("child_question", "Child question?", "childAnswer", {
        routes: [route("captured", branch({ target: endTarget("completed") }))],
      }),
    ],
  });
}

function compositionFlow(): FlowVersion {
  return flowVersion("composition-v1", {
    flowId: "composition",
    startStepId: "custom",
    variables: [variable("serviceSeen", "boolean", "conversation")],
    steps: [
      {
        stepId: "custom",
        type: "custom",
        config: { customType: "composition_step", payload: {} },
        routes: [route("done", branch({ target: endTarget("completed") }))],
      },
    ],
  });
}

function semanticMenuFlow(): FlowVersion {
  return flowVersion("semantic-menu-v1", {
    flowId: "semantic-menu",
    startStepId: "semantic_menu",
    variables: [variable("contactReason", "string", "conversation")],
    steps: [
      {
        stepId: "semantic_menu",
        type: "menu",
        config: {
          prompt: staticText("How can we help?"),
          options: [
            option("billing", "Billing", ["invoice"], branch({
              operations: [setVariable("contactReason", "billing", "menu_selection")],
              target: endTarget("completed"),
            })),
            option("technical", "Technical", ["tech"], branch({
              operations: [setVariable("contactReason", "technical", "menu_selection")],
              target: endTarget("completed"),
            })),
          ],
          selection: {
            allowNumbers: false,
            allowExactText: false,
            allowAliases: false,
            allowButtons: true,
            allowFreeText: true,
            semanticSelection: {
              enabled: true,
              threshold: 0.75,
            },
          },
          invalidSelection: {
            message: staticText("Please choose a listed option."),
            target: { type: "stay" },
          },
        },
      },
    ],
  });
}

function freeTextMenuFlow(): FlowVersion {
  return flowVersion("free-text-menu-v1", {
    flowId: "free-text-menu",
    startStepId: "free_text_menu",
    variables: [variable("contactReason", "string", "conversation")],
    steps: [
      {
        stepId: "free_text_menu",
        type: "menu",
        config: {
          prompt: staticText("Choose or type."),
          options: [
            option("billing", "Billing", [], branch({
              operations: [setVariable("contactReason", "billing", "menu_selection")],
              target: endTarget("completed"),
            })),
          ],
          selection: {
            allowButtons: false,
            allowNumbers: false,
            allowExactText: false,
            allowAliases: false,
            allowFreeText: true,
          },
        },
        routes: [
          route("free_text", branch({
            operations: [setVariable("contactReason", "free_text", "menu_selection")],
            target: endTarget("completed"),
          })),
        ],
      },
    ],
  });
}

function flowVersion(flowVersionId: string, definition: Record<string, unknown>): FlowVersion {
  return {
    flowVersionId,
    flowId: definition.flowId as string,
    version: "1.0.0",
    status: "published",
    schemaVersion: "0.1",
    createdAt: NOW,
    definition: {
      variables: [],
      actions: [],
      responses: [],
      settings: { maxStepExecutionsPerTurn: 20 },
      ...definition,
    },
  } as FlowVersion;
}

function variable(variableId: string, type: string, scope: string) {
  return { variableId, type, scope };
}

function messageStep(stepId: string, messages: Array<string | Record<string, unknown>>, options: Record<string, unknown> = {}) {
  return {
    stepId,
    type: "message",
    config: {
      messages: messages.map((message) => (typeof message === "string" ? staticText(message) : message)),
      autoAdvance: true,
    },
    ...options,
  };
}

function menuStep(stepId: string, prompt: string, options: Array<Record<string, unknown>>) {
  return {
    stepId,
    type: "menu",
    config: {
      prompt: staticText(prompt),
      options,
      selection: {
        allowButtons: true,
        allowNumbers: true,
        allowExactText: true,
        allowAliases: true,
      },
      invalidSelection: {
        message: staticText("Please choose one of the listed options."),
        target: { type: "stay" },
        maxRetries: 2,
      },
    },
  };
}

function inputStep(stepId: string, prompt: string, targetVariableId: string, options: Record<string, unknown> = {}) {
  const { validators = [], invalidMessage = "Please send a valid value.", routes = [], semanticTasks = [] } = options as {
    validators?: unknown[];
    invalidMessage?: string;
    routes?: unknown[];
    semanticTasks?: unknown[];
  };

  return {
    stepId,
    type: "input",
    config: {
      prompt: staticText(prompt),
      input: {
        acceptedInputTypes: ["text"],
        bindings: [
          {
            targetVariableId,
            source: "text",
            required: true,
            normalizers: [{ type: "trim" }],
            extractors: [{ type: "raw_text" }],
            validators,
            saveRawInput: false,
          },
        ],
        semanticTasks,
        invalidBehavior: {
          message: staticText(invalidMessage),
          target: { type: "stay" },
          maxRetries: 2,
        },
      },
    },
    routes,
  };
}

function attachmentStep(stepId: string, prompt: string, targetVariableId: string, options: Record<string, unknown>) {
  return {
    stepId,
    type: "attachment",
    config: {
      prompt: staticText(prompt),
      targetVariableId,
      rules: {
        required: true,
        allowedMimeTypes: options.allowedMimeTypes,
        allowedExtensions: options.allowedExtensions,
        maxSizeMb: options.maxSizeMb,
      },
      invalidAttachment: {
        message: staticText(options.invalidMessage as string),
        target: { type: "stay" },
      },
    },
    routes: options.routes,
  };
}

function conditionStep(stepId: string, branches: unknown[], defaultBranch?: unknown) {
  return {
    stepId,
    type: "condition",
    config: {
      branches,
      defaultBranch,
    },
  };
}

function option(optionId: string, label: string, aliases: string[], branchValue: unknown) {
  return {
    optionId,
    label,
    aliases,
    value: optionId,
    branch: branchValue,
  };
}

function branch(value: Record<string, unknown>) {
  return { branchId: `branch-${++branchIdCounter}`, ...value };
}

function route(outcome: string, branchValue: unknown) {
  return {
    routeId: `route-${outcome}`,
    match: { type: "outcome", outcome },
    branch: branchValue,
  };
}

function staticText(text: string) {
  return { mode: "static", text };
}

function sendMessage(text: string) {
  return { type: "send_message", message: staticText(text) };
}

function setVariable(variableId: string, value: unknown, source: string) {
  return {
    type: "set_variable",
    variableId,
    value: literal(value),
    source,
  };
}

function unsetVariable(variableId: string) {
  return { type: "unset_variable", variableId };
}

function invalidateVariable(variableId: string) {
  return { type: "invalidate_variable", variableId };
}

function stepTarget(stepId: string) {
  return { type: "step", stepId };
}

function endTarget(status: string) {
  return { type: "end", status };
}

function literal(value: unknown) {
  return { type: "literal", value };
}

function variableRef(variableId: string) {
  return { type: "variable", variableId };
}

function equals(left: unknown, right: unknown) {
  return { type: "equals", left, right };
}

function textInput(conversationId: string, text: string): UserInput {
  return {
    inputId: `input-${conversationId}-${text}`,
    conversationId,
    type: "text",
    text,
    receivedAt: NOW,
  } as UserInput;
}

function choiceInput(conversationId: string, optionId: string): UserInput {
  return {
    inputId: `input-${conversationId}-${optionId}`,
    conversationId,
    type: "choice",
    optionId,
    receivedAt: NOW,
  } as UserInput;
}

function attachmentInput(conversationId: string, attachments: Array<Record<string, unknown>>): UserInput {
  return {
    inputId: `input-${conversationId}-attachment`,
    conversationId,
    type: "attachment",
    attachments,
    receivedAt: NOW,
  } as UserInput;
}

function textMessage(text: string) {
  return {
    messageId: `message-${text}`,
    conversationId: "custom",
    turnId: "turn-custom",
    content: { type: "text", text },
    createdAt: NOW,
  };
}

function texts(result: ProcessTurnResult) {
  return result.messages.map((message) => {
    const content = message.content as { text?: string; payload?: { text?: string } };
    return content.text ?? content.payload?.text;
  });
}

function buttonLabels(result: ProcessTurnResult) {
  return result.messages.flatMap((message) => {
    const content = message.content as { buttons?: Array<{ label: string }> };
    return content.buttons?.map((button) => button.label) ?? [];
  });
}

function eventTypes(result: ProcessTurnResult) {
  return result.events.map((event) => event.type);
}

function traceSources(result: ProcessTurnResult) {
  return result.trace.fragments.map((fragment) => fragment.source);
}

function variableValue(result: ProcessTurnResult, variableId: string) {
  return variableValueFromState(result.state, variableId);
}

function variableValueFromState(state: unknown, variableId: string) {
  const values = (state as { variables?: Record<string, { value?: unknown }> } | undefined)?.variables ?? {};
  return values[variableId]?.value;
}

function variableMeta(result: ProcessTurnResult, variableId: string) {
  const values = result.state.variables as Record<string, { metadata?: unknown }>;
  return values[variableId]?.metadata;
}

function variableHistory(result: ProcessTurnResult, variableId: string) {
  const state = result.state as unknown as {
    variableHistory?: Record<string, unknown[]>;
    variables?: {
      history?: Record<string, unknown[]>;
    };
  };

  return state.variableHistory?.[variableId] ?? state.variables?.history?.[variableId] ?? [];
}

function expectStructuredFailure(result: ProcessTurnResult, code: string) {
  expect(result.error).toMatchObject({
    code,
    recoverable: expect.any(Boolean),
  });
  expect(eventTypes(result)).toContain("error_raised");
  expect(result.trace.fragments).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        source: "error",
        data: expect.objectContaining({ code }),
      }),
    ]),
  );
}

function deterministicIds() {
  let counter = 0;
  const next = (prefix: string) => `${prefix}-${++counter}`;

  return {
    newFlowVersionId: () => next("flow-version"),
    newConversationId: () => next("conversation"),
    newTurnId: () => next("turn"),
    newMessageId: () => next("message"),
    newEventId: () => next("event"),
    newTraceId: () => next("trace"),
    newCandidateId: () => next("candidate"),
  };
}

function deferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });

  return { promise, resolve, reject };
}
