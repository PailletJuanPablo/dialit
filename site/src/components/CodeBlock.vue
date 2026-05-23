<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  readonly code: string;
  readonly language?: string;
}>();

const keywords = new Set([
  "as",
  "async",
  "await",
  "boolean",
  "class",
  "const",
  "export",
  "extends",
  "false",
  "from",
  "function",
  "if",
  "implements",
  "import",
  "interface",
  "new",
  "null",
  "readonly",
  "return",
  "string",
  "true",
  "type",
  "undefined",
]);

const builtIns = new Set([
  "ActionDefinition",
  "ActionResult",
  "ConditionExpression",
  "ConversationApi",
  "ConversationEngine",
  "ConversationFlowDefinition",
  "DecisionTrace",
  "FlowVersion",
  "GeneratedResponsePlan",
  "InputContract",
  "MenuStepDefinition",
  "ProcessTurnResult",
  "RunActionOperation",
  "SemanticInputTask",
  "StepBranch",
  "StepRoute",
  "StepTarget",
  "VariableDefinition",
]);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function wrap(className: string, value: string) {
  return `<span class="${className}">${escapeHtml(value)}</span>`;
}

function highlightTypeScript(code: string) {
  const tokenPattern = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b\d[\d_]*\b|\b[A-Za-z_$][\w$]*\b|[{}[\]().,:;])/g;
  let output = "";
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(code)) !== null) {
    const token = match[0];
    output += escapeHtml(code.slice(cursor, match.index));

    if (token.startsWith("//") || token.startsWith("/*")) {
      output += wrap("tok-comment", token);
    } else if (token.startsWith("\"") || token.startsWith("'") || token.startsWith("`")) {
      output += wrap("tok-string", token);
    } else if (/^\d/.test(token)) {
      output += wrap("tok-number", token);
    } else if (keywords.has(token)) {
      output += wrap("tok-keyword", token);
    } else if (builtIns.has(token) || /^[A-Z]/.test(token)) {
      output += wrap("tok-type", token);
    } else if (code[tokenPattern.lastIndex] === "(") {
      output += wrap("tok-function", token);
    } else if (/^[{}[\]().,:;]$/.test(token)) {
      output += wrap("tok-punctuation", token);
    } else {
      output += escapeHtml(token);
    }

    cursor = tokenPattern.lastIndex;
  }

  return output + escapeHtml(code.slice(cursor));
}

function highlightShell(code: string) {
  return code
    .split("\n")
    .map((line) => {
      if (line.trimStart().startsWith("#")) {
        return wrap("tok-comment", line);
      }

      return escapeHtml(line).replace(
        /\b(npm|node|npx|pnpm|yarn)\b/g,
        '<span class="tok-function">$1</span>',
      );
    })
    .join("\n");
}

const highlightedCode = computed(() => {
  if (props.language === "sh" || props.language === "shell") {
    return highlightShell(props.code);
  }

  if (props.language === "text") {
    return escapeHtml(props.code);
  }

  return highlightTypeScript(props.code);
});
</script>

<template>
  <pre class="highlighted-code"><code v-html="highlightedCode"></code></pre>
</template>
