<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import {
  isHomeDemoChoiceId,
  runHomeDemoScenario,
  type HomeDemoChoiceId,
  type HomeDemoEntry,
  type HomeDemoRun,
} from "../lib/homeDemoFlow";

const demoChoices = [
  { optionId: "technical_support", label: "Technical support" },
  { optionId: "billing", label: "Billing question" },
  { optionId: "contact_agent", label: "Contact an agent" },
] as const;

type VariableRow = [string, string];

const initialConversation = [
  { speaker: "dialit" as const, text: "Hello. How can I help you?" },
];
const initialVariables: VariableRow[] = [["state", "waiting_for_menu_choice"]];
const initialTrace = ["Waiting for a menu choice"];
const initialCode = [
  "const api = createConversationApi({ flowVersions, actionHandlers });",
  "await api.start({ flowVersionId: \"support_assistant_v1\" });",
  "await api.selectOption({ optionId });",
];

const selectedChoiceId = ref<HomeDemoChoiceId>();
const demo = ref<HomeDemoRun>();
const isLoading = ref(false);
const conversationWindow = ref<HTMLElement>();
const visibleConversation = ref<HomeDemoEntry[]>([...initialConversation]);
const visibleVariables = ref<VariableRow[]>([...initialVariables]);
const visibleTrace = ref([...initialTrace]);
const visibleCode = ref([...initialCode]);
const visibleStepId = ref("main_menu");
const typingLabel = ref("");
let playbackId = 0;

const menuChoices = computed(() => demo.value?.menuChoices ?? demoChoices);
const statusLabel = computed(() => (isLoading.value ? "running" : demo.value ? "synced" : "waiting"));
const currentStepId = computed(() => visibleStepId.value);
const conversation = computed(() => visibleConversation.value);
const variables = computed(() => visibleVariables.value);
const trace = computed(() => visibleTrace.value);
const code = computed(() => visibleCode.value);

async function runChoice(optionId: string) {
  if (!isHomeDemoChoiceId(optionId)) return;
  const currentPlaybackId = ++playbackId;
  selectedChoiceId.value = optionId;
  isLoading.value = true;
  typingLabel.value = "";

  const nextDemo = await runHomeDemoScenario(optionId);
  if (currentPlaybackId !== playbackId) return;

  demo.value = nextDemo;
  await playDemo(nextDemo, currentPlaybackId);

  if (currentPlaybackId === playbackId) {
    isLoading.value = false;
  }
}

async function playDemo(nextDemo: HomeDemoRun, currentPlaybackId: number) {
  const stepSequence = stepsForChoice(nextDemo.selectedChoiceId, nextDemo.currentStepId);
  visibleConversation.value = [];
  visibleVariables.value = [["state", "starting_conversation"]];
  visibleTrace.value = ["Starting conversation"];
  visibleCode.value = nextDemo.code.slice(0, 2);
  visibleStepId.value = stepSequence[0] ?? "main_menu";
  await scrollConversation();

  for (const [index, entry] of nextDemo.conversation.entries()) {
    const progress = (index + 1) / nextDemo.conversation.length;
    const stepProgress = index / Math.max(nextDemo.conversation.length - 1, 1);
    const stepIndex = Math.min(Math.floor(stepProgress * (stepSequence.length - 1)), stepSequence.length - 1);
    visibleStepId.value = stepSequence[stepIndex] ?? nextDemo.currentStepId;

    if (entry.speaker === "dialit") {
      typingLabel.value = typingLabelForStep(visibleStepId.value);
      if (!(await pause(currentPlaybackId, index === 0 ? 260 : 460))) return;
      typingLabel.value = "";
    } else if (!(await pause(currentPlaybackId, 180))) {
      return;
    }

    visibleConversation.value = [...visibleConversation.value, entry];
    revealInspector(nextDemo, progress);
    await scrollConversation();

    if (!(await pause(currentPlaybackId, entry.speaker === "user" ? 260 : 160))) return;
  }

  typingLabel.value = "";
  visibleStepId.value = nextDemo.currentStepId;
  visibleVariables.value = [...nextDemo.variables];
  visibleTrace.value = [...nextDemo.trace];
  visibleCode.value = [...nextDemo.code];
  await scrollConversation();
}

function revealInspector(nextDemo: HomeDemoRun, progress: number) {
  const variableCount = Math.max(1, Math.ceil(nextDemo.variables.length * progress));
  const traceCount = Math.max(1, Math.ceil(nextDemo.trace.length * progress));
  const codeCount = Math.max(2, Math.ceil(nextDemo.code.length * progress));
  visibleVariables.value = nextDemo.variables.slice(0, variableCount);
  visibleTrace.value = nextDemo.trace.slice(0, traceCount);
  visibleCode.value = nextDemo.code.slice(0, codeCount);
}

function stepsForChoice(choiceId: HomeDemoChoiceId, finalStepId: string): string[] {
  if (choiceId === "technical_support") {
    return ["welcome", "main_menu", "ask_technical_issue", "create_ticket", "ticket_created", finalStepId];
  }
  if (choiceId === "billing") {
    return ["welcome", "main_menu", "ask_billing_question", "billing_condition", "billing_wrong_charge_response", finalStepId];
  }
  return ["welcome", "main_menu", "agent_contact_menu", "create_handoff", "handoff_ready", finalStepId];
}

function typingLabelForStep(stepId: string): string {
  if (stepId.includes("billing")) return "classifying";
  if (stepId.includes("ticket")) return "creating ticket";
  if (stepId.includes("handoff")) return "routing";
  return "typing";
}

async function scrollConversation() {
  await nextTick();
  const element = conversationWindow.value;
  if (!element) return;
  element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
}

async function pause(currentPlaybackId: number, ms: number): Promise<boolean> {
  await new Promise((resolve) => window.setTimeout(resolve, ms));
  return currentPlaybackId === playbackId;
}
</script>

<template>
  <section class="flow-console" aria-label="Interactive Dialit workflow simulation">
    <div class="console-header">
      <div>
        <span class="status-dot" :class="{ active: isLoading }"></span>
        <strong>Live Dialit runtime</strong>
      </div>
      <span>{{ statusLabel }} / {{ currentStepId }}</span>
    </div>

    <div class="console-body">
      <div ref="conversationWindow" class="conversation-window" :key="demo?.selectedChoiceId ?? 'waiting'">
        <p
          v-for="(entry, index) in conversation"
          :key="`${entry.speaker}-${index}-${entry.text}`"
          :class="entry.speaker === 'user' ? 'user-bubble' : 'bot-bubble'"
          :style="{ animationDelay: `${Math.min(index, 8) * 90}ms` }"
        >
          <span>{{ entry.speaker === "user" ? "User" : "Dialit" }}</span>
          {{ entry.text }}
        </p>

        <div v-if="typingLabel" class="typing-bubble bot-bubble" aria-live="polite">
          <span>Dialit</span>
          <div>
            <i></i>
            <i></i>
            <i></i>
            <em>{{ typingLabel }}</em>
          </div>
        </div>

        <div
          v-if="!isLoading || !demo"
          class="chat-choice-list bot-bubble"
          :style="{ animationDelay: `${Math.min(conversation.length, 8) * 90}ms` }"
        >
          <span>Dialit</span>
          <strong>{{ demo ? "Try another path" : "How can I help you?" }}</strong>
          <div>
            <button
              v-for="(choice, index) in menuChoices"
              :key="choice.optionId"
              type="button"
              :class="{ active: selectedChoiceId === choice.optionId }"
              :aria-pressed="selectedChoiceId === choice.optionId"
              :disabled="isLoading"
              @click="runChoice(choice.optionId)"
            >
              <span>{{ String(index + 1).padStart(2, "0") }}</span>
              {{ choice.label }}
            </button>
          </div>
        </div>
      </div>

      <aside class="console-inspector" aria-label="Runtime output">
        <div class="runtime-panel variables-runtime">
          <h3>Variables</h3>
          <dl class="variable-list">
            <div v-for="[name, value] in variables" :key="name">
              <dt>{{ name }}</dt>
              <dd>{{ value }}</dd>
            </div>
          </dl>
        </div>

        <div class="runtime-panel trace-runtime">
          <h3>Trace</h3>
          <ol>
            <li v-for="item in trace" :key="item">{{ item }}</li>
          </ol>
        </div>

        <div class="runtime-panel code-runtime">
          <h3>Runtime call</h3>
          <pre class="console-code"><code><span v-for="line in code" :key="line">{{ line }}
</span></code></pre>
        </div>
      </aside>
    </div>
  </section>
</template>
