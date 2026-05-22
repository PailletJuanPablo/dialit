import type {
  LlmGeneratedResponse,
  VariableId,
  VariableScope,
} from "../types.js";
import type { RenderedOutput } from "./internal-types.js";

export function emptyRendered(): RenderedOutput {
  return { messages: [], events: [], fragments: [] };
}

export function isLlmGeneratedResponse(value: unknown): value is LlmGeneratedResponse {
  if (!isObjectRecord(value)) return false;
  return typeof value.text === "string" && Array.isArray(value.usedVariableIds);
}

export function isScopedInitialVariables(value: unknown): value is Partial<Record<VariableScope, Record<VariableId, unknown>>> {
  if (!isObjectRecord(value)) return false;
  return ["conversation", "flow", "operation", "system"].some((scope) => scope in value);
}

export function isVariableScope(value: string): value is VariableScope {
  return value === "conversation" || value === "flow" || value === "operation" || value === "system";
}

export function runtimeTypeOf(entity: { readonly type: string }): string {
  return entity.type;
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
