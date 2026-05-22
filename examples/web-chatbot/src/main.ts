import type {
  AttachmentInput,
  ConversationEvent,
  OutboundMessage,
  ProcessTurnResult,
  TraceFragment,
} from "../../../src/index";
import { createDemoChatbotSession, type DemoChatbotSession } from "./demo-flow";
import "./styles.css";

const appRootId = "app";
const emptyStateText = "No variables yet.";
const noEventsText = "No events recorded.";
const noTraceText = "No trace for this turn.";
const textInputPlaceholder = "Type a message...";
const simulatedAttachment: AttachmentInput = {
  attachmentId: "demo-file-1",
  filename: "demo-evidence.pdf",
  mimeType: "application/pdf",
  sizeBytes: 42_000,
};

type TranscriptEntry = AssistantEntry | UserEntry | SystemEntry;

interface AssistantEntry {
  readonly kind: "assistant";
  readonly message: OutboundMessage;
}

interface UserEntry {
  readonly kind: "user";
  readonly text: string;
}

interface SystemEntry {
  readonly kind: "system";
  readonly text: string;
}

interface DemoUiState {
  session: DemoChatbotSession;
  lastResult?: ProcessTurnResult;
  transcript: TranscriptEntry[];
  events: ConversationEvent[];
  busy: boolean;
}

const root = getRequiredElement(appRootId);
const state: DemoUiState = {
  session: createDemoChatbotSession(),
  transcript: [],
  events: [],
  busy: false,
};

void restartConversation();

async function restartConversation(): Promise<void> {
  state.session = createDemoChatbotSession({ conversationId: `web-chatbot-demo-${Date.now()}` });
  state.transcript = [];
  state.events = [];
  state.busy = true;
  render();
  await applyResult(await state.session.start());
}

async function sendText(text: string): Promise<void> {
  const trimmed = text.trim();
  if (trimmed.length === 0 || state.busy) return;
  state.transcript.push({ kind: "user", text: trimmed });
  state.busy = true;
  render();
  await applyResult(await state.session.sendText(trimmed));
}

async function sendChoice(optionId: string, label: string): Promise<void> {
  if (state.busy) return;
  state.transcript.push({ kind: "user", text: label });
  state.busy = true;
  render();
  await applyResult(await state.session.sendChoice(optionId, label));
}

async function sendSimulatedAttachment(): Promise<void> {
  if (state.busy) return;
  state.transcript.push({ kind: "user", text: `Attached ${simulatedAttachment.filename}` });
  state.busy = true;
  render();
  await applyResult(await state.session.sendAttachments([simulatedAttachment]));
}

async function skipAttachment(): Promise<void> {
  if (state.busy) return;
  state.transcript.push({ kind: "user", text: "Skipped attachment" });
  state.busy = true;
  render();
  await applyResult(await state.session.skipAttachment());
}

async function applyResult(result: ProcessTurnResult): Promise<void> {
  state.lastResult = result;
  state.events.push(...result.events);
  state.transcript.push(...result.messages.map((message): AssistantEntry => ({ kind: "assistant", message })));
  if (result.error) {
    state.transcript.push({ kind: "system", text: `${result.error.code}: ${result.error.message}` });
  }
  state.busy = false;
  render();
}

function render(): void {
  root.innerHTML = `
    <main class="demo-shell">
      <section class="conversation-region" aria-label="Conversation">
        <header class="topbar">
          <div>
            <p class="eyebrow">Local example</p>
            <h1>Nexembot Web Chatbot</h1>
          </div>
          <button class="secondary-action" data-action="restart" type="button">Restart</button>
        </header>
        <div class="flow-strip" aria-label="Demo flow map">
          <span>Menu</span>
          <span>Input</span>
          <span>Action</span>
          <span>Trace</span>
        </div>
        <div class="messages" aria-live="polite">
          ${state.transcript.map(renderTranscriptEntry).join("")}
        </div>
        ${renderComposer()}
      </section>
      <aside class="inspector" aria-label="Runtime inspector">
        ${renderStatePanel()}
        ${renderVariablesPanel()}
        ${renderEventsPanel()}
        ${renderTracePanel()}
      </aside>
    </main>
  `;

  root.querySelector<HTMLButtonElement>("[data-action='restart']")?.addEventListener("click", () => {
    void restartConversation();
  });
  root.querySelector<HTMLFormElement>("[data-form='composer']")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = root.querySelector<HTMLInputElement>("[data-input='message']");
    if (!input) return;
    const value = input.value;
    input.value = "";
    void sendText(value);
  });
  for (const button of root.querySelectorAll<HTMLButtonElement>("[data-choice-id]")) {
    button.addEventListener("click", () => {
      void sendChoice(button.dataset.choiceId ?? "", button.textContent?.trim() ?? "Selection");
    });
  }
  root.querySelector<HTMLButtonElement>("[data-action='attach']")?.addEventListener("click", () => {
    void sendSimulatedAttachment();
  });
  root.querySelector<HTMLButtonElement>("[data-action='skip-attachment']")?.addEventListener("click", () => {
    void skipAttachment();
  });
}

function renderTranscriptEntry(entry: TranscriptEntry): string {
  if (entry.kind === "user") return `<article class="bubble user-bubble">${escapeHtml(entry.text)}</article>`;
  if (entry.kind === "system") return `<article class="system-line">${escapeHtml(entry.text)}</article>`;
  return `
    <article class="bubble assistant-bubble">
      ${renderMessageContent(entry.message)}
    </article>
  `;
}

function renderMessageContent(message: OutboundMessage): string {
  const content = message.content;
  if (content.type === "text") return `<p>${escapeHtml(content.text)}</p>`;
  if (content.type === "rich") {
    return `
      ${content.text ? `<p>${escapeHtml(content.text)}</p>` : ""}
      ${content.buttons?.length ? `<div class="choice-row">${content.buttons.map((button) => `
        <button class="choice-button" data-choice-id="${escapeHtml(button.optionId)}" type="button">
          ${escapeHtml(button.label)}
        </button>
      `).join("")}</div>` : ""}
    `;
  }
  return `<pre>${escapeHtml(JSON.stringify(content.payload, null, 2))}</pre>`;
}

function renderComposer(): string {
  const acceptedTypes = state.lastResult?.state.pendingInput?.inputContract?.acceptedInputTypes ?? [];
  const acceptsAttachment = acceptedTypes.includes("attachment");
  const isCompleted = state.lastResult?.state.status === "completed" || state.lastResult?.state.status === "handoff";
  const disabled = state.busy || acceptsAttachment || isCompleted;
  return `
    <footer class="composer-region">
      ${acceptsAttachment ? `
        <div class="attachment-actions">
          <button class="primary-action" data-action="attach" type="button">Send demo PDF</button>
          <button class="secondary-action" data-action="skip-attachment" type="button">Skip</button>
        </div>
      ` : ""}
      <form class="composer" data-form="composer">
        <input data-input="message" type="text" placeholder="${textInputPlaceholder}" ${disabled ? "disabled" : ""} />
        <button class="primary-action" type="submit" ${disabled ? "disabled" : ""}>Send</button>
      </form>
    </footer>
  `;
}

function renderStatePanel(): string {
  const runtimeState = state.lastResult?.state;
  return `
    <section class="inspector-section">
      <h2>State</h2>
      <dl class="key-values">
        <div><dt>Status</dt><dd>${escapeHtml(runtimeState?.status ?? "starting")}</dd></div>
        <div><dt>Step</dt><dd>${escapeHtml(runtimeState?.currentStepId ?? "none")}</dd></div>
        <div><dt>Pending</dt><dd>${escapeHtml(runtimeState?.pendingInput?.stepId ?? "none")}</dd></div>
      </dl>
    </section>
  `;
}

function renderVariablesPanel(): string {
  const variables = Object.entries(state.lastResult?.state.variables ?? {});
  return `
    <section class="inspector-section">
      <h2>Variables</h2>
      ${variables.length === 0 ? `<p class="muted">${emptyStateText}</p>` : `<ul class="debug-list">${variables.map(([variableId, value]) => `
        <li><strong>${escapeHtml(variableId)}</strong><code>${escapeHtml(JSON.stringify(value.value))}</code></li>
      `).join("")}</ul>`}
    </section>
  `;
}

function renderEventsPanel(): string {
  const events = state.events.slice(-8).reverse();
  return `
    <section class="inspector-section">
      <h2>Events</h2>
      ${events.length === 0 ? `<p class="muted">${noEventsText}</p>` : `<ol class="debug-list">${events.map((event) => `
        <li><strong>${escapeHtml(event.type)}</strong><span>${escapeHtml(event.stepId ?? event.eventId)}</span></li>
      `).join("")}</ol>`}
    </section>
  `;
}

function renderTracePanel(): string {
  const fragments = state.lastResult?.trace.fragments ?? [];
  return `
    <section class="inspector-section">
      <h2>Trace</h2>
      ${fragments.length === 0 ? `<p class="muted">${noTraceText}</p>` : `<ol class="debug-list">${fragments.map(renderTraceFragment).join("")}</ol>`}
    </section>
  `;
}

function renderTraceFragment(fragment: TraceFragment): string {
  return `
    <li>
      <strong>${escapeHtml(fragment.source)}</strong>
      <code>${escapeHtml(JSON.stringify(fragment.data ?? {}))}</code>
    </li>
  `;
}

function getRequiredElement(id: string): HTMLElement {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Element #${id} was not found.`);
  return element;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
