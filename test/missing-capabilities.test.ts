import { describe, expect, it } from "vitest";
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

describe("documented missing capabilities", () => {
  it("processes multiple input bindings through normalizers, extractors, validators, and raw metadata", async () => {
    const runtime = engineWith(inputPipelineFlow());
    await runtime.startConversation({
      conversationId: "conversation-input-pipeline",
      flowVersionId: "input-pipeline-v1",
    });

    const result = await runtime.processUserInput({
      conversationId: "conversation-input-pipeline",
      input: textInput("conversation-input-pipeline", "  order: ab-12 / email USER@EXAMPLE.COM  "),
    });

    expect(result.error).toBeUndefined();
    expect(variableValue(result, "orderCode")).toBe("AB-12");
    expect(variableValue(result, "customerEmail")).toBe("user@example.com");
    expect(variableMetadata(result, "orderCode")).toMatchObject({
      rawInput: "  order: ab-12 / email USER@EXAMPLE.COM  ",
    });
    expect(result.trace.fragments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "input:binding",
          data: expect.objectContaining({ variableId: "orderCode" }),
        }),
        expect.objectContaining({
          source: "input:binding",
          data: expect.objectContaining({ variableId: "customerEmail" }),
        }),
      ]),
    );
  });

  it("executes registered normalizers and validators from runtime registries", async () => {
    const runtime = engineWith(customRegistryInputFlow());
    runtime.services.normalizerRegistry.register({
      normalizerType: "prefix_custom",
      normalize: async (value) => `CUSTOM-${String(value)}`,
    });
    runtime.services.validatorRegistry.register({
      validatorType: "ends_with_123",
      validate: async (value) => ({ valid: String(value).endsWith("123") }),
    });

    await runtime.startConversation({
      conversationId: "conversation-custom-registry",
      flowVersionId: "custom-registry-input-v1",
    });
    const result = await runtime.processUserInput({
      conversationId: "conversation-custom-registry",
      input: textInput("conversation-custom-registry", "123"),
    });

    expect(result.error).toBeUndefined();
    expect(variableValue(result, "registryValue")).toBe("CUSTOM-123");
    expect(runtime.services.normalizerRegistry.hasNormalizer("prefix_custom")).toBe(true);
    expect(runtime.services.validatorRegistry.hasValidator("ends_with_123")).toBe(true);
  });

  it("routes enabled global commands through declared outcomes", async () => {
    const runtime = engineWith(globalCommandFlow());
    await runtime.startConversation({
      conversationId: "conversation-global-command",
      flowVersionId: "global-command-v1",
    });

    const result = await runtime.processUserInput({
      conversationId: "conversation-global-command",
      input: textInput("conversation-global-command", "human"),
    });

    expect(result.error).toBeUndefined();
    expect(result.state.status).toBe("handoff");
    expect(result.state.currentStepId).toBe("handoff_done");
    expect(texts(result)).toContain("A human will continue.");
    expect(result.trace.fragments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "input:global_command",
          data: expect.objectContaining({ command: "handoff" }),
        }),
      ]),
    );
  });

  it("executes registered operation handlers without modifying the runtime switch", async () => {
    const runtime = engineWith(registeredOperationFlow());
    runtime.services.operationRegistry.register({
      operationType: "registered_audit",
      execute: async () => ({
        status: "completed",
        variablePatches: [{ type: "set", variableId: "auditStatus", value: "registered", source: "operation" }],
        trace: { source: "operation:registered_audit" },
      }),
    });

    const result = await runtime.startConversation({
      conversationId: "conversation-registered-operation",
      flowVersionId: "registered-operation-v1",
    });

    expect(result.error).toBeUndefined();
    expect(variableValue(result, "auditStatus")).toBe("registered");
    expect(result.trace.fragments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ source: "operation:registered_audit" }),
      ]),
    );
  });

  it("processes external event input through the public facade", async () => {
    const runtime = engineWith(externalEventFlow());
    await runtime.startConversation({
      conversationId: "conversation-event",
      flowVersionId: "external-event-v1",
    });

    const result = await runtime.processExternalEvent({
      conversationId: "conversation-event",
      event: eventInput("conversation-event", "payment_confirmed", { reference: "PAY-1" }),
    });

    expect(result.error).toBeUndefined();
    expect(variableValue(result, "eventName")).toBe("payment_confirmed");
    expect(result.state.status).toBe("completed");
    expect(texts(result)).toContain("Event received.");
  });

  it("enforces attachment maxFiles and registered attachment validators", async () => {
    const runtime = engineWith(attachmentValidationFlow());
    runtime.services.validatorRegistry.register({
      validatorType: "signed_filename",
      validate: async (value) => ({
        valid: Array.isArray(value) && value.every((item) => (
          typeof item === "object"
          && item !== null
          && "filename" in item
          && typeof item.filename === "string"
          && item.filename.startsWith("signed-")
        )),
      }),
    });
    await runtime.startConversation({
      conversationId: "conversation-attachment-rules",
      flowVersionId: "attachment-validation-v1",
    });

    const tooMany = await runtime.processUserInput({
      conversationId: "conversation-attachment-rules",
      input: attachmentInput("conversation-attachment-rules", [
        { attachmentId: "a", filename: "signed-a.pdf", mimeType: "application/pdf", sizeBytes: 100 },
        { attachmentId: "b", filename: "signed-b.pdf", mimeType: "application/pdf", sizeBytes: 100 },
        { attachmentId: "c", filename: "signed-c.pdf", mimeType: "application/pdf", sizeBytes: 100 },
      ]),
    });
    expect(tooMany.state.status).toBe("waiting_input");
    expect(variableValue(tooMany, "signedFile")).toBeUndefined();

    const invalidSecondFile = await runtime.processUserInput({
      conversationId: "conversation-attachment-rules",
      input: attachmentInput("conversation-attachment-rules", [
        { attachmentId: "a", filename: "signed-a.pdf", mimeType: "application/pdf", sizeBytes: 100 },
        { attachmentId: "b", filename: "signed-b.exe", mimeType: "application/x-msdownload", sizeBytes: 100 },
      ]),
    });
    expect(invalidSecondFile.state.status).toBe("waiting_input");
    expect(variableValue(invalidSecondFile, "signedFile")).toBeUndefined();

    const unsigned = await runtime.processUserInput({
      conversationId: "conversation-attachment-rules",
      input: attachmentInput("conversation-attachment-rules", [
        { attachmentId: "a", filename: "invoice.pdf", mimeType: "application/pdf", sizeBytes: 100 },
      ]),
    });
    expect(unsigned.state.status).toBe("waiting_input");
    expect(variableValue(unsigned, "signedFile")).toBeUndefined();

    const accepted = await runtime.processUserInput({
      conversationId: "conversation-attachment-rules",
      input: attachmentInput("conversation-attachment-rules", [
        { attachmentId: "a", filename: "signed-invoice.pdf", mimeType: "application/pdf", sizeBytes: 100 },
      ]),
    });
    expect(accepted.error).toBeUndefined();
    expect(variableValue(accepted, "signedFile")).toMatchObject({ filename: "signed-invoice.pdf" });
    expect(accepted.state.status).toBe("completed");
  });

  it("validates registered runtime extension contracts and action branch contracts", () => {
    const report = validateFlowDefinition(validationContractFlow().definition, {
      registeredStepTypes: [],
      registeredOperationTypes: [],
      registeredCustomOperationTypes: [],
      registeredNormalizerTypes: [],
      registeredExtractorTypes: [],
      registeredValidatorTypes: [],
    });

    expect(report.valid).toBe(false);
    expect(report.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "STEP_HANDLER_NOT_REGISTERED" }),
        expect.objectContaining({ code: "OPERATION_HANDLER_NOT_REGISTERED" }),
        expect.objectContaining({ code: "CUSTOM_OPERATION_NOT_FOUND" }),
        expect.objectContaining({ code: "CUSTOM_OPERATION_HANDLER_NOT_REGISTERED" }),
        expect.objectContaining({ code: "NORMALIZER_NOT_REGISTERED" }),
        expect.objectContaining({ code: "EXTRACTOR_NOT_REGISTERED" }),
        expect.objectContaining({ code: "VALIDATOR_NOT_REGISTERED" }),
        expect.objectContaining({ code: "ACTION_RESULT_OUTCOME_NOT_DECLARED" }),
      ]),
    );
  });
});

function engineWith(primaryFlowVersion: FlowVersion, options: Record<string, unknown> = {}) {
  return createConversationEngine({
    clock: { now: () => NOW },
    idGenerator: deterministicIds(),
    maxStepExecutionsPerTurn: 20,
    ...options,
    flowVersions: [primaryFlowVersion],
  }) as ConversationEngine & ConversationEngineModule;
}

function inputPipelineFlow(): FlowVersion {
  return flowVersion("input-pipeline-v1", {
    flowId: "input-pipeline",
    startStepId: "capture",
    variables: [
      variable("orderCode", "string"),
      variable("customerEmail", "email"),
    ],
    steps: [
      inputStep("capture", "Send order and email.", {
        bindings: [
          {
            targetVariableId: "orderCode",
            source: "text",
            normalizers: [{ type: "trim" }, { type: "uppercase" }],
            extractors: [{ type: "regex", options: { pattern: "ORDER:\\s*([A-Z0-9-]+)", group: 1 } }],
            validators: [{ type: "regex", options: { pattern: "^[A-Z]{2}-\\d{2}$" } }],
            saveRawInput: true,
          },
          {
            targetVariableId: "customerEmail",
            source: "text",
            normalizers: [{ type: "lowercase" }],
            extractors: [{ type: "email" }],
            validators: [{ type: "email" }],
          },
        ],
        routes: [route("captured", branch({ target: stepTarget("done") }))],
      }),
      messageStep("done", ["Captured."]),
    ],
  });
}

function customRegistryInputFlow(): FlowVersion {
  return flowVersion("custom-registry-input-v1", {
    flowId: "custom-registry-input",
    startStepId: "capture",
    variables: [variable("registryValue", "string")],
    steps: [
      inputStep("capture", "Send a registry value.", {
        bindings: [
          {
            targetVariableId: "registryValue",
            source: "text",
            normalizers: [{ type: "prefix_custom" }],
            validators: [{ type: "ends_with_123" }],
          },
        ],
        routes: [route("captured", branch({ target: stepTarget("done") }))],
      }),
      messageStep("done", ["Registry captured."]),
    ],
  });
}

function globalCommandFlow(): FlowVersion {
  return flowVersion("global-command-v1", {
    flowId: "global-command",
    startStepId: "question",
    variables: [variable("answer", "string")],
    steps: [
      inputStep("question", "How can we help?", {
        bindings: [{ targetVariableId: "answer", source: "text" }],
        globalCommands: { allowHandoff: true },
        routes: [route("global_handoff", branch({ target: stepTarget("handoff_done") }))],
      }),
      messageStep("handoff_done", ["A human will continue."], { routes: [route("next", branch({ target: endTarget("handoff") }))] }),
    ],
  });
}

function registeredOperationFlow(): FlowVersion {
  return flowVersion("registered-operation-v1", {
    flowId: "registered-operation",
    startStepId: "start",
    variables: [variable("auditStatus", "string")],
    steps: [
      messageStep("start", [], {
        onEnter: [{ type: "registered_audit", operationId: "registered_audit_1" }],
        routes: [route("next", branch({ target: stepTarget("done") }))],
      }),
      messageStep("done", ["Registered operation complete."]),
    ],
  });
}

function externalEventFlow(): FlowVersion {
  return flowVersion("external-event-v1", {
    flowId: "external-event",
    startStepId: "wait_event",
    variables: [variable("eventName", "string")],
    steps: [
      inputStep("wait_event", "Waiting for event.", {
        acceptedInputTypes: ["event"],
        bindings: [{ targetVariableId: "eventName", source: "event" }],
        routes: [route("captured", branch({ target: stepTarget("done") }))],
      }),
      messageStep("done", ["Event received."]),
    ],
  });
}

function attachmentValidationFlow(): FlowVersion {
  return flowVersion("attachment-validation-v1", {
    flowId: "attachment-validation",
    startStepId: "attach",
    variables: [variable("signedFile", "object")],
    steps: [
      attachmentStep("attach", "Attach signed file.", "signedFile", {
        rules: {
          maxFiles: 2,
          allowedMimeTypes: ["application/pdf"],
          validators: [{ type: "signed_filename" }],
        },
        invalidAttachment: { message: staticText("Attach signed PDFs.") },
        routes: [route("captured", branch({ target: stepTarget("done") }))],
      }),
      messageStep("done", ["Attachment accepted."]),
    ],
  });
}

function validationContractFlow(): FlowVersion {
  return flowVersion("validation-contract-v1", {
    flowId: "validation-contract",
    startStepId: "custom_step",
    variables: [variable("value", "string")],
    actions: [{ actionId: "audit", kind: "local", resultOutcomes: ["accepted"] }],
    steps: [
      {
        stepId: "custom_step",
        type: "custom",
        config: { customType: "unregistered_step", payload: {} },
        routes: [route("done", branch({ target: stepTarget("capture") }))],
      },
      inputStep("capture", "Capture.", {
        bindings: [
          {
            targetVariableId: "value",
            source: "text",
            normalizers: [{ type: "missing_normalizer" }],
            extractors: [{ type: "missing_extractor" }],
            validators: [{ type: "missing_validator" }],
          },
        ],
        routes: [route("captured", branch({ target: stepTarget("custom_operation") }))],
      }),
      messageStep("custom_operation", [], {
        onEnter: [
          {
            type: "custom",
            customOperationId: "missing_contract",
            customType: "missing_custom_type",
            onResult: [
              {
                match: { type: "outcome", outcome: "ok" },
                branch: branch({ target: stepTarget("action_branch") }),
              },
            ],
          },
          { type: "missing_registered_operation", operationId: "missing_registered_1" },
        ],
      }),
      messageStep("action_branch", [], {
        onEnter: [
          {
            type: "run_action",
            actionId: "audit",
            onResult: [
              {
                match: { type: "outcome", outcome: "rejected" },
                branch: branch({ target: stepTarget("done") }),
              },
            ],
          },
        ],
      }),
      messageStep("done", ["Done."]),
    ],
  });
}

function flowVersion(flowVersionId: string, definition: Record<string, unknown>): FlowVersion {
  return {
    flowVersionId,
    flowId: String(definition.flowId),
    version: "1.0.0",
    status: "draft",
    schemaVersion: "0.1",
    createdAt: NOW,
    definition: definition as FlowVersion["definition"],
  };
}

function variable(variableId: string, type: string) {
  return { variableId, type, scope: "conversation" };
}

function inputStep(stepId: string, prompt: string, options: Record<string, unknown>) {
  return {
    stepId,
    type: "input",
    config: {
      prompt: staticText(prompt),
      input: {
        acceptedInputTypes: options.acceptedInputTypes ?? ["text"],
        bindings: options.bindings,
        globalCommands: options.globalCommands,
        invalidBehavior: { message: staticText("Invalid input.") },
      },
    },
    routes: options.routes,
  };
}

function attachmentStep(stepId: string, prompt: string, targetVariableId: string, options: Record<string, unknown>) {
  return {
    stepId,
    type: "attachment",
    config: {
      prompt: staticText(prompt),
      targetVariableId,
      rules: options.rules,
      invalidAttachment: options.invalidAttachment,
    },
    routes: options.routes,
  };
}

function messageStep(stepId: string, messages: string[], options: Record<string, unknown> = {}) {
  return {
    stepId,
    type: "message",
    config: {
      messages: messages.map(staticText),
    },
    ...options,
  };
}

function branch(value: Record<string, unknown>) {
  return value;
}

function route(outcome: string, branchValue: unknown) {
  return {
    routeId: `route-${outcome}`,
    match: { type: "outcome", outcome },
    branch: branchValue,
  };
}

function stepTarget(stepId: string) {
  return { type: "step", stepId };
}

function endTarget(status: string) {
  return { type: "end", status };
}

function staticText(text: string) {
  return { mode: "static", text };
}

function textInput(conversationId: string, text: string): UserInput {
  return {
    inputId: `input-${conversationId}-${text}`,
    conversationId,
    type: "text",
    text,
    receivedAt: NOW,
  };
}

function eventInput(conversationId: string, eventType: string, payload: Record<string, unknown>): Extract<UserInput, { type: "event" }> {
  return {
    inputId: `input-${conversationId}-${eventType}`,
    conversationId,
    type: "event",
    eventType,
    payload,
    receivedAt: NOW,
  };
}

function attachmentInput(conversationId: string, attachments: Array<Record<string, unknown>>): UserInput {
  return {
    inputId: `input-${conversationId}-attachment`,
    conversationId,
    type: "attachment",
    attachments,
    receivedAt: NOW,
  } as Extract<UserInput, { type: "attachment" }>;
}

function texts(result: ProcessTurnResult): string[] {
  return result.messages.flatMap((message) => (
    message.content.type === "text" || message.content.type === "rich" ? [message.content.text ?? ""] : []
  ));
}

function variableValue(result: ProcessTurnResult, variableId: string): unknown {
  return result.state.variables[variableId]?.value;
}

function variableMetadata(result: ProcessTurnResult, variableId: string): unknown {
  return result.state.variables[variableId]?.metadata;
}

function deterministicIds() {
  let id = 0;
  const next = (prefix: string) => `${prefix}-${++id}`;
  return {
    newFlowVersionId: () => next("flow-version"),
    newConversationId: () => next("conversation"),
    newTurnId: () => next("turn"),
    newMessageId: () => next("message"),
    newEventId: () => next("event"),
    newTraceId: () => next("trace"),
    newCandidateId: () => next("candidate"),
    newExecutionFrameId: () => next("frame"),
    newHandoffId: () => next("handoff"),
  };
}
