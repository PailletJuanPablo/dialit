import type {
  Conversation,
  ConversationEngineRepositories,
  ConversationEvent,
  ConversationState,
  DecisionTrace,
  FlowVersion,
} from "../types.js";
import { clone } from "../runtime-support.js";
import type { InternalState } from "./internal-types.js";

export type InternalRepositoryStores = {
  flowVersions: Map<string, FlowVersion>;
  conversations: Map<string, Conversation>;
  states: Map<string, InternalState>;
  events: Map<string, ConversationEvent[]>;
  traces: Map<string, DecisionTrace[]>;
  toInternalState(state: ConversationState): InternalState;
};

export function createInternalRepositories(stores: InternalRepositoryStores): ConversationEngineRepositories {
  return {
    flowVersions: {
      getById: async (flowVersionId) => clone(stores.flowVersions.get(flowVersionId)),
      save: async (flowVersion) => {
        stores.flowVersions.set(flowVersion.flowVersionId, clone(flowVersion));
      },
    },
    conversations: {
      getById: async (conversationId) => clone(stores.conversations.get(conversationId)),
      save: async (conversation) => {
        stores.conversations.set(conversation.conversationId, clone(conversation));
      },
    },
    states: {
      getByConversationId: async (conversationId) => clone(stores.states.get(conversationId)),
      save: async (state) => {
        stores.states.set(state.conversationId, stores.toInternalState(clone(state)));
      },
    },
    events: {
      append: async (events) => {
        for (const event of events) {
          const list = stores.events.get(event.conversationId) ?? [];
          list.push(clone(event));
          stores.events.set(event.conversationId, list);
        }
      },
      listByConversationId: async (conversationId) => clone(stores.events.get(conversationId) ?? []),
    },
    traces: {
      save: async (trace) => {
        const list = stores.traces.get(trace.conversationId) ?? [];
        list.push(clone(trace));
        stores.traces.set(trace.conversationId, list);
      },
      listByConversationId: async (conversationId) => clone(stores.traces.get(conversationId) ?? []),
    },
  };
}
