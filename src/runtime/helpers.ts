import type {
  LlmGeneratedResponse,
  VariableId,
  VariableScope,
} from "../types.js";
import type { RenderedOutput } from "./internal-types.js";

export function emptyRendered(): RenderedOutput {
  return { messages: [], events: [], fragments: [] };
}

export function isLlmGeneratedResponse(value: LlmGeneratedResponse | unknown): value is LlmGeneratedResponse {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { text?: unknown; usedVariableIds?: unknown };
  return typeof candidate.text === "string" && Array.isArray(candidate.usedVariableIds);
}

export function isScopedInitialVariables(value: unknown): value is Partial<Record<VariableScope, Record<VariableId, unknown>>> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const candidate = value as Partial<Record<VariableScope, unknown>>;
  return ["conversation", "flow", "operation", "system"].some((scope) => scope in candidate);
}

export function isVariableScope(value: string): value is VariableScope {
  return value === "conversation" || value === "flow" || value === "operation" || value === "system";
}
