import {
  createConversationEngine,
} from "./runtime.js";
import type {
  ConversationApi,
  ConversationApiAttachmentRequest,
  ConversationApiChoice,
  ConversationApiChoiceRequest,
  ConversationApiEventRequest,
  ConversationApiHttpResponse,
  ConversationApiMessage,
  ConversationApiResponseBody,
  ConversationApiTextRequest,
  ConversationApiVariable,
  ConversationEngine,
  CreateConversationEngineOptions,
  OutboundMessage,
  ProcessTurnResult,
  UserInput,
  VariableId,
} from "./types.js";

const apiInputTypes = {
  text: "text",
  choice: "choice",
  attachment: "attachment",
  event: "event",
} as const;

const outboundContentTypes = {
  text: "text",
  rich: "rich",
} as const;

const httpStatusCodes = {
  ok: 200,
  recoverableError: 400,
  runtimeError: 500,
} as const;

const defaultInputIdPrefix = "api-input";

export function createConversationApi(source: ConversationEngine | CreateConversationEngineOptions = {}): ConversationApi {
  const engine = isConversationEngine(source) ? source : createConversationEngine(source);
  return {
    engine,
    start: async (request) => toHttpResponse(await engine.startConversation(request)),
    sendMessage: async (request) => toHttpResponse(await engine.processUserInput({
      conversationId: request.conversationId,
      input: textInput(request),
    })),
    selectOption: async (request) => toHttpResponse(await engine.processUserInput({
      conversationId: request.conversationId,
      input: choiceInput(request),
    })),
    sendAttachments: async (request) => toHttpResponse(await engine.processUserInput({
      conversationId: request.conversationId,
      input: attachmentInput(request),
    })),
    sendEvent: async (request) => toHttpResponse(await engine.processExternalEvent({
      conversationId: request.conversationId,
      event: eventInput(request),
    })),
    toHttpResponse,
    subscribeToEvents: (subscriber) => engine.subscribeToEvents(subscriber),
  };
}

function toHttpResponse(result: ProcessTurnResult): ConversationApiHttpResponse {
  return {
    statusCode: httpStatusCode(result),
    body: responseBody(result),
  };
}

function httpStatusCode(result: ProcessTurnResult): number {
  if (!result.error) return httpStatusCodes.ok;
  return result.error.recoverable ? httpStatusCodes.recoverableError : httpStatusCodes.runtimeError;
}

function responseBody(result: ProcessTurnResult): ConversationApiResponseBody {
  return {
    ok: result.error === undefined,
    conversationId: result.conversation.conversationId,
    turnId: result.turn.turnId,
    status: result.state.status,
    currentStepId: result.state.currentStepId,
    messages: result.messages.map(apiMessage),
    choices: result.messages.flatMap(apiChoices),
    variables: apiVariables(result),
    events: result.events,
    trace: result.trace,
    ...(result.error === undefined ? {} : { error: result.error }),
  };
}

function apiMessage(message: OutboundMessage): ConversationApiMessage {
  const content = message.content;
  if (content.type === outboundContentTypes.text) {
    return {
      messageId: message.messageId,
      type: content.type,
      text: content.text,
    };
  }
  if (content.type === outboundContentTypes.rich) {
    return {
      messageId: message.messageId,
      type: content.type,
      ...(content.text === undefined ? {} : { text: content.text }),
    };
  }
  return {
    messageId: message.messageId,
    type: content.type,
    payload: content.payload,
  };
}

function apiChoices(message: OutboundMessage): ConversationApiChoice[] {
  if (message.content.type !== outboundContentTypes.rich) return [];
  return (message.content.buttons ?? []).map((button) => ({
    optionId: button.optionId,
    label: button.label,
    ...(button.payload === undefined ? {} : { payload: button.payload }),
  }));
}

function apiVariables(result: ProcessTurnResult): Record<VariableId, ConversationApiVariable> {
  const variables: Record<VariableId, ConversationApiVariable> = {};
  for (const [variableId, variable] of Object.entries(result.state.variables)) {
    variables[variableId] = {
      value: variable.value,
      scope: variable.scope,
      source: variable.source,
      updatedAt: variable.updatedAt,
      ...(variable.metadata === undefined ? {} : { metadata: variable.metadata }),
    };
  }
  return variables;
}

function textInput(request: ConversationApiTextRequest): Extract<UserInput, { type: "text" }> {
  return {
    inputId: request.inputId ?? defaultInputId(request.conversationId),
    conversationId: request.conversationId,
    type: apiInputTypes.text,
    text: request.text,
    ...(request.turnId === undefined ? {} : { turnId: request.turnId }),
    ...(request.channel === undefined ? {} : { channel: request.channel }),
    receivedAt: request.receivedAt ?? receivedAtNow(),
    ...(request.metadata === undefined ? {} : { metadata: request.metadata }),
  };
}

function choiceInput(request: ConversationApiChoiceRequest): Extract<UserInput, { type: "choice" }> {
  return {
    inputId: request.inputId ?? defaultInputId(request.conversationId),
    conversationId: request.conversationId,
    type: apiInputTypes.choice,
    ...(request.optionId === undefined ? {} : { optionId: request.optionId }),
    ...(request.label === undefined ? {} : { label: request.label }),
    ...(request.payload === undefined ? {} : { payload: request.payload }),
    ...(request.turnId === undefined ? {} : { turnId: request.turnId }),
    ...(request.channel === undefined ? {} : { channel: request.channel }),
    receivedAt: request.receivedAt ?? receivedAtNow(),
    ...(request.metadata === undefined ? {} : { metadata: request.metadata }),
  };
}

function attachmentInput(request: ConversationApiAttachmentRequest): Extract<UserInput, { type: "attachment" }> {
  return {
    inputId: request.inputId ?? defaultInputId(request.conversationId),
    conversationId: request.conversationId,
    type: apiInputTypes.attachment,
    attachments: request.attachments,
    ...(request.turnId === undefined ? {} : { turnId: request.turnId }),
    ...(request.channel === undefined ? {} : { channel: request.channel }),
    receivedAt: request.receivedAt ?? receivedAtNow(),
    ...(request.metadata === undefined ? {} : { metadata: request.metadata }),
  };
}

function eventInput(request: ConversationApiEventRequest): Extract<UserInput, { type: "event" }> {
  return {
    inputId: request.inputId ?? defaultInputId(request.conversationId),
    conversationId: request.conversationId,
    type: apiInputTypes.event,
    eventType: request.eventType,
    ...(request.payload === undefined ? {} : { payload: request.payload }),
    ...(request.turnId === undefined ? {} : { turnId: request.turnId }),
    ...(request.channel === undefined ? {} : { channel: request.channel }),
    receivedAt: request.receivedAt ?? receivedAtNow(),
    ...(request.metadata === undefined ? {} : { metadata: request.metadata }),
  };
}

function receivedAtNow(): string {
  return new Date().toISOString();
}

function defaultInputId(conversationId: string): string {
  return `${defaultInputIdPrefix}-${conversationId}-${Date.now()}`;
}

function isConversationEngine(value: ConversationEngine | CreateConversationEngineOptions): value is ConversationEngine {
  return isObjectRecord(value)
    && typeof value.startConversation === "function"
    && typeof value.processUserInput === "function"
    && typeof value.processExternalEvent === "function"
    && typeof value.subscribeToEvents === "function";
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
