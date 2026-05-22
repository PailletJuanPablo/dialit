import { describe, expect, it } from "vitest";
import {
  createConversationApi,
  createConversationEngine,
  type AttachmentInput,
  type ConversationEventEnvelope,
  type FlowVersion,
} from "../src/index";

const NOW = "2026-05-22T12:00:00.000Z";
const FLOW_VERSION_ID = "api-helper-flow-v1";

describe("API integration helpers", () => {
  it("publishes committed events to subscribers and supports unsubscribe", async () => {
    const received: ConversationEventEnvelope[] = [];
    const engine = createConversationEngine({
      clock: { now: () => NOW },
      idGenerator: deterministicIds(),
      flowVersions: [apiFlow()],
    });
    const subscription = engine.subscribeToEvents((envelope) => {
      received.push(envelope);
    });

    await engine.startConversation({
      conversationId: "conversation-events",
      flowVersionId: FLOW_VERSION_ID,
    });

    expect(received.map((envelope) => envelope.event.type)).toEqual(
      expect.arrayContaining(["turn_started", "conversation_started", "step_entered"]),
    );
    expect(received.every((envelope) => envelope.result.state.status === "waiting_input")).toBe(true);

    const countAfterStart = received.length;
    subscription.unsubscribe();
    await engine.processUserInput({
      conversationId: "conversation-events",
      input: textInput("conversation-events", "hello@example.com"),
    });

    expect(received).toHaveLength(countAfterStart);
  });

  it("accepts initial subscribers through engine options", async () => {
    const receivedTypes: string[] = [];
    const engine = createConversationEngine({
      clock: { now: () => NOW },
      idGenerator: deterministicIds(),
      flowVersions: [apiFlow()],
      eventSubscribers: [
        (envelope) => {
          receivedTypes.push(envelope.event.type);
        },
      ],
    });

    await engine.startConversation({
      conversationId: "conversation-option-subscriber",
      flowVersionId: FLOW_VERSION_ID,
    });

    expect(receivedTypes).toContain("conversation_started");
  });

  it("does not hide subscriber failures after events are committed", async () => {
    const engine = createConversationEngine({
      clock: { now: () => NOW },
      idGenerator: deterministicIds(),
      flowVersions: [apiFlow()],
    });
    engine.subscribeToEvents(() => {
      throw new Error("event delivery failed");
    });

    await expect(engine.startConversation({
      conversationId: "conversation-subscriber-error",
      flowVersionId: FLOW_VERSION_ID,
    })).rejects.toThrow("event delivery failed");

    const persistedEvents = await engine.repositories.events.listByConversationId("conversation-subscriber-error");
    expect(persistedEvents.map((event) => event.type)).toContain("conversation_started");
  });

  it("wraps start, option, text, attachment, and event turns into HTTP-friendly responses", async () => {
    const api = createConversationApi({
      clock: { now: () => NOW },
      idGenerator: deterministicIds(),
      flowVersions: [apiFlow()],
    });

    const start = await api.start({
      conversationId: "conversation-api",
      flowVersionId: FLOW_VERSION_ID,
      channel: "web",
    });
    expect(start.statusCode).toBe(200);
    expect(start.body.ok).toBe(true);
    expect(start.body.status).toBe("waiting_input");
    expect(start.body.messages.map((message) => message.text)).toEqual(["Choose a demo path."]);
    expect(start.body.choices.map((choice) => choice.optionId)).toEqual(["email", "attachment", "event"]);

    const selectedEmail = await api.selectOption({
      conversationId: "conversation-api",
      optionId: "email",
      label: "Email",
    });
    expect(selectedEmail.body.currentStepId).toBe("ask_email");

    const email = await api.sendMessage({
      conversationId: "conversation-api",
      text: "agent@example.com",
      inputId: "api-text-1",
      receivedAt: NOW,
    });
    expect(email.statusCode).toBe(200);
    expect(email.body.status).toBe("completed");
    expect(email.body.variables.email.value).toBe("agent@example.com");
    expect(email.body.events.map((event) => event.type)).toEqual(expect.arrayContaining(["input_resolved", "variable_set"]));

    await api.start({ conversationId: "conversation-attachment-api", flowVersionId: FLOW_VERSION_ID });
    await api.selectOption({ conversationId: "conversation-attachment-api", optionId: "attachment" });
    const attachment = await api.sendAttachments({
      conversationId: "conversation-attachment-api",
      attachments: [attachmentInput()],
      inputId: "api-attachment-1",
      receivedAt: NOW,
    });
    expect(attachment.body.status).toBe("completed");
    expect(attachment.body.variables.file.value).toMatchObject({ filename: "signed.pdf" });

    await api.start({ conversationId: "conversation-event-api", flowVersionId: FLOW_VERSION_ID });
    await api.selectOption({ conversationId: "conversation-event-api", optionId: "event" });
    const event = await api.sendEvent({
      conversationId: "conversation-event-api",
      eventType: "payment_confirmed",
      payload: { reference: "PAY-1" },
      inputId: "api-event-1",
      receivedAt: NOW,
    });
    expect(event.body.status).toBe("completed");
    expect(event.body.variables.eventName.value).toBe("payment_confirmed");
  });

  it("converts runtime errors into non-OK endpoint DTOs", async () => {
    const api = createConversationApi({
      clock: { now: () => NOW },
      idGenerator: deterministicIds(),
      flowVersions: [],
    });

    const response = await api.start({
      conversationId: "conversation-error",
      flowVersionId: "missing-flow",
    });

    expect(response.statusCode).toBe(500);
    expect(response.body.ok).toBe(false);
    expect(response.body.error?.code).toBe("FLOW_VERSION_NOT_FOUND");
  });
});

function apiFlow(): FlowVersion {
  return {
    flowVersionId: FLOW_VERSION_ID,
    flowId: "api-helper-flow",
    version: "1.0.0",
    schemaVersion: "0.1",
    status: "draft",
    createdAt: NOW,
    definition: {
      flowId: "api-helper-flow",
      startStepId: "menu",
      variables: [
        { variableId: "email", type: "email", scope: "conversation" },
        { variableId: "file", type: "file", scope: "conversation" },
        { variableId: "eventName", type: "string", scope: "conversation" },
      ],
      steps: [
        {
          stepId: "menu",
          type: "menu",
          config: {
            prompt: staticText("Choose a demo path."),
            selection: { allowButtons: true, allowExactText: true },
            options: [
              { optionId: "email", label: "Email", branch: branch({ target: stepTarget("ask_email") }) },
              { optionId: "attachment", label: "Attachment", branch: branch({ target: stepTarget("ask_attachment") }) },
              { optionId: "event", label: "Event", branch: branch({ target: stepTarget("wait_event") }) },
            ],
          },
        },
        {
          stepId: "ask_email",
          type: "input",
          config: {
            prompt: staticText("Email?"),
            input: {
              acceptedInputTypes: ["text"],
              bindings: [
                {
                  targetVariableId: "email",
                  source: "text",
                  normalizers: [{ type: "trim" }, { type: "lowercase" }],
                  validators: [{ type: "email" }],
                },
              ],
            },
          },
          routes: [route("captured", branch({ target: endTarget("completed") }))],
        },
        {
          stepId: "ask_attachment",
          type: "attachment",
          config: {
            prompt: staticText("Attachment?"),
            targetVariableId: "file",
            rules: {
              required: true,
              maxFiles: 1,
              allowedMimeTypes: ["application/pdf"],
              allowedExtensions: [".pdf"],
            },
          },
          routes: [route("captured", branch({ target: endTarget("completed") }))],
        },
        {
          stepId: "wait_event",
          type: "input",
          config: {
            prompt: staticText("Waiting for event."),
            input: {
              acceptedInputTypes: ["event"],
              bindings: [{ targetVariableId: "eventName", source: "event" }],
            },
          },
          routes: [route("captured", branch({ target: endTarget("completed") }))],
        },
      ],
    },
  };
}

function staticText(text: string) {
  return { mode: "static" as const, text };
}

function branch(value: Record<string, unknown>) {
  return value;
}

function route(outcome: string, branchValue: Record<string, unknown>) {
  return {
    routeId: `route-${outcome}`,
    match: { type: "outcome" as const, outcome },
    branch: branchValue,
  };
}

function stepTarget(stepId: string) {
  return { type: "step" as const, stepId };
}

function endTarget(status: string) {
  return { type: "end" as const, status };
}

function textInput(conversationId: string, text: string) {
  return {
    inputId: `input-${conversationId}`,
    conversationId,
    type: "text" as const,
    text,
    receivedAt: NOW,
  };
}

function attachmentInput(): AttachmentInput {
  return {
    attachmentId: "file-1",
    filename: "signed.pdf",
    mimeType: "application/pdf",
    sizeBytes: 1200,
  };
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
