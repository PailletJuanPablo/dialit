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
