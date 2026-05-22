import { describe, expect, it } from "vitest";
import type { ProcessTurnResult } from "../../../src/index";
import { createDemoChatbotSession } from "./demo-flow";

describe("web chatbot demo flow", () => {
  it("starts with a friendly menu and exposes trace data", async () => {
    const session = createDemoChatbotSession({ conversationId: "demo-start" });

    const result = await session.start();

    expect(texts(result)).toEqual(["Welcome to the Nexembot demo.", "Choose a path to validate the engine."]);
    expect(buttonLabels(result)).toEqual(["Billing question", "Support ticket", "Talk to a human"]);
    expect(result.state.status).toBe("waiting_input");
    expect(result.trace.fragments.map((fragment) => fragment.source)).toEqual(expect.arrayContaining(["step:message", "step:menu"]));
  });

  it("classifies billing text through a controlled semantic contract", async () => {
    const session = createDemoChatbotSession({ conversationId: "demo-billing" });
    await session.start();
    await session.sendChoice("billing");

    const result = await session.sendText("I need to know what I owe this month.");

    expect(result.error).toBeUndefined();
    expect(variableValue(result, "billingCategory")).toBe("debt");
    expect(texts(result)).toContain("Your balance question was classified as debt.");
    expect(result.trace.fragments.map((fragment) => fragment.source)).toEqual(expect.arrayContaining(["semantic_input", "condition:evaluate"]));
  });

  it("validates support email, skips optional attachment, and generates a ticket response", async () => {
    const session = createDemoChatbotSession({ conversationId: "demo-support" });
    await session.start();
    await session.sendChoice("support");

    const invalid = await session.sendText("not-an-email");
    expect(invalid.state.status).toBe("waiting_input");
    expect(texts(invalid)).toEqual(["Enter a valid email address.", "What email should we use for updates?"]);

    const valid = await session.sendText("user@example.com");
    expect(valid.state.currentStepId).toBe("support_attachment");
    expect(variableValue(valid, "customerEmail")).toBe("user@example.com");

    const completed = await session.skipAttachment();
    expect(completed.error).toBeUndefined();
    expect(completed.state.status).toBe("completed");
    expect(variableValue(completed, "supportTicketId")).toBe("DEMO-1001");
    expect(texts(completed)).toEqual(["Ticket DEMO-1001 is ready for user@example.com."]);
    expect(completed.trace.fragments.map((fragment) => fragment.source)).toEqual(expect.arrayContaining(["operation:run_action", "llm:response_generation"]));
  });

  it("routes human handoff through the normal engine branch", async () => {
    const session = createDemoChatbotSession({ conversationId: "demo-handoff" });
    await session.start();

    const result = await session.sendChoice("human");

    expect(result.error).toBeUndefined();
    expect(result.state.status).toBe("handoff");
    expect(variableValue(result, "handoffId")).toBe("handoff-1");
    expect(texts(result)).toContain("A human specialist will continue this conversation.");
  });
});

function texts(result: ProcessTurnResult): string[] {
  return result.messages.flatMap((message) => (
    message.content.type === "text" || message.content.type === "rich" ? [message.content.text ?? ""] : []
  ));
}

function buttonLabels(result: ProcessTurnResult): string[] {
  return result.messages.flatMap((message) => (
    message.content.type === "rich" ? message.content.buttons?.map((button) => button.label) ?? [] : []
  ));
}

function variableValue(result: ProcessTurnResult, variableId: string): unknown {
  return result.state.variables[variableId]?.value;
}
