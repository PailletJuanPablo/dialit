import type { VariableScope } from "../types.js";

export const builtInStepTypes = new Set(["message", "menu", "input", "attachment", "condition", "end", "custom"]);

export const builtInOperationTypes = new Set([
  "send_message",
  "set_variable",
  "unset_variable",
  "invalidate_variable",
  "run_action",
  "call_flow",
  "emit_event",
  "handoff",
  "custom",
]);

export const defaultFlowCallSharingScopes = ["conversation"] satisfies readonly VariableScope[];

export const builtInNormalizerTypes = new Set(["trim", "lowercase", "uppercase", "collapse_spaces"]);

export const builtInExtractorTypes = new Set(["raw_text", "regex", "number", "integer", "email", "phone", "date", "event_type", "payload_path"]);

export const builtInValidatorTypes = new Set(["required", "regex", "integer", "number", "email", "min_length", "max_length", "enum"]);

export const bytesPerMegabyte = 1024 * 1024;

export const globalCommandOutcomes = {
  cancel: "global_cancel",
  help: "global_help",
  back: "global_back",
  handoff: "global_handoff",
} as const;

export const globalCommandAliases = {
  cancel: ["cancel", "cancelar"],
  help: ["help", "ayuda"],
  back: ["back", "volver"],
  handoff: ["handoff", "human", "agent", "asesor", "humano"],
} as const;
