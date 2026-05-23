<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch, type ComponentPublicInstance } from "vue";

type MessageSource = "user" | "bot" | "runtime";
type RuntimeTone = "neutral" | "success" | "warning";

interface FlowPathNode {
  readonly id: string;
  readonly label: string;
  readonly type: string;
  readonly options?: readonly string[];
}

interface FlowPathBranch {
  readonly from: string;
  readonly to: string;
  readonly label: string;
}

interface ShowcaseMessage {
  readonly id: string;
  readonly from: MessageSource;
  readonly text: string;
  readonly badge: string;
  readonly optionId?: string;
  readonly attachment?: string;
}

interface RuntimeEventRow {
  readonly id: string;
  readonly type: string;
  readonly label: string;
  readonly detail: string;
  readonly tone?: RuntimeTone;
}

interface ShowcaseVariable {
  readonly variableId: string;
  readonly value: string;
  readonly scope: string;
  readonly source: string;
}

interface TraceItem {
  readonly id: string;
  readonly source: string;
  readonly text: string;
}

interface ShowcaseTurn {
  readonly id: string;
  readonly title: string;
  readonly activeStepId: string;
  readonly activeInterface: string;
  readonly activeJsonPath: string;
  readonly branchLabel?: string;
  readonly pendingInput: string;
  readonly status: string;
  readonly conversationMessages: readonly ShowcaseMessage[];
  readonly runtimeEvents: readonly RuntimeEventRow[];
  readonly variableChanges: readonly ShowcaseVariable[];
  readonly traceItems: readonly TraceItem[];
  readonly interfaceTags: readonly string[];
  readonly jsonFragment: string;
  readonly highlightLines: readonly number[];
}

interface ShowcaseScenario {
  readonly id: string;
  readonly label: string;
  readonly branchLabel: string;
  readonly scenarioJson: string;
  readonly flowPath: readonly FlowPathNode[];
  readonly branches: readonly FlowPathBranch[];
  readonly turns: readonly ShowcaseTurn[];
}

const commonFlowPath: readonly FlowPathNode[] = [
  { id: "flow_version", label: "Published version", type: "FlowVersion" },
  {
    id: "main_menu",
    label: "Main menu",
    type: "MenuStepDefinition",
    options: ["track_order", "start_return", "damaged_item", "talk_to_human"],
  },
  { id: "capture_order_number", label: "Capture order", type: "InputStepDefinition" },
  { id: "lookup_order", label: "Lookup order", type: "RunActionOperation" },
  { id: "return_reason", label: "Return reason", type: "SemanticInputTask" },
  { id: "return_router", label: "Return route", type: "ConditionStepDefinition" },
  { id: "upload_return_photo", label: "Photo evidence", type: "AttachmentStepDefinition" },
  { id: "create_return_authorization", label: "Return plugin", type: "CustomOperation" },
  { id: "check_replacement_eligibility", label: "Eligibility", type: "RunActionOperation" },
  { id: "collect_contact_flow", label: "Contact subflow", type: "CallFlowOperation" },
  { id: "request_handoff", label: "Human handoff", type: "HandoffOperation" },
  { id: "done", label: "Final status", type: "EndStepDefinition" },
] as const;

const fullFlowVersionJson = `{
  "flowVersionId": "order-support-v1",
  "flowId": "order-support",
  "version": "1.0.0",
  "status": "published",
  "schemaVersion": "0.1.0",
  "createdAt": "2026-05-22T00:00:00.000Z",
  "definition": {
    "flowId": "order-support",
    "startStepId": "welcome",
    "variables": [
      { "variableId": "supportIntent", "type": "string", "scope": "conversation" },
      { "variableId": "orderNumber", "type": "string", "scope": "conversation" },
      { "variableId": "orderStatus", "type": "object", "scope": "conversation" },
      { "variableId": "returnReason", "type": "string", "scope": "conversation" },
      { "variableId": "returnCategory", "type": "enum", "scope": "conversation" },
      { "variableId": "returnPhoto", "type": "file", "scope": "conversation" },
      { "variableId": "damageDescription", "type": "string", "scope": "conversation" },
      { "variableId": "replacementEligibility", "type": "string", "scope": "conversation" },
      { "variableId": "handoffReason", "type": "string", "scope": "conversation" },
      { "variableId": "contactEmail", "type": "email", "scope": "conversation" },
      { "variableId": "handoffId", "type": "string", "scope": "conversation" }
    ],
    "responses": [
      { "responseId": "welcome_prompt", "plan": { "mode": "static", "text": "Hi. I can help with orders, returns, damaged items, or human support." } },
      { "responseId": "main_menu_prompt", "plan": { "mode": "static", "text": "Choose one option." } },
      {
        "responseId": "order_status_summary",
        "plan": {
          "mode": "generated",
          "goal": "Summarize the shipment status in one concise support message.",
          "allowedVariableIds": ["orderNumber", "orderStatus"],
          "constraints": ["Use only runtime variables.", "Do not invent delivery dates."],
          "fallbackText": "I found your order status and will continue from here."
        }
      },
      { "responseId": "return_confirmation", "plan": { "mode": "template", "template": "Return authorization {{returnAuthorizationId}} is ready.", "variableIds": ["returnAuthorizationId"] } }
    ],
    "actions": [
      {
        "actionId": "lookup_order",
        "kind": "tool",
        "resultOutcomes": ["found", "not_found"],
        "sideEffect": false,
        "timeoutMs": 2500
      },
      {
        "actionId": "check_replacement_eligibility",
        "kind": "tool",
        "resultOutcomes": ["eligible", "not_eligible"],
        "sideEffect": false
      }
    ],
    "customOperations": [
      {
        "customOperationId": "returns_authorization_plugin",
        "customType": "returns.createAuthorization",
        "allowedOutcomes": ["created", "needs_review"],
        "inputSchema": { "type": "object" },
        "outputSchema": { "type": "object" }
      }
    ],
    "steps": [
      {
        "stepId": "welcome",
        "type": "message",
        "config": {
          "messages": [
            { "mode": "reference", "responseId": "welcome_prompt" },
            { "mode": "reference", "responseId": "main_menu_prompt" }
          ],
          "autoAdvance": true
        },
        "routes": [
          {
            "routeId": "welcome_to_menu",
            "match": { "type": "always" },
            "branch": { "target": { "type": "step", "stepId": "main_menu" } }
          }
        ]
      },
      {
        "stepId": "main_menu",
        "type": "menu",
        "config": {
          "prompt": { "mode": "reference", "responseId": "main_menu_prompt" },
          "selection": { "allowButtons": true, "allowNumbers": true, "allowExactText": true, "allowAliases": true },
          "options": [
            {
              "optionId": "track_order",
              "label": "Track an order",
              "aliases": ["where is my package", "shipment status"],
              "branch": {
                "operations": [
                  { "type": "set_variable", "operationId": "set_support_intent_track", "variableId": "supportIntent", "value": { "type": "literal", "value": "track_order" } },
                  { "type": "send_message", "message": { "mode": "static", "text": "Sure. Send the order number and I will check the latest status." } }
                ],
                "target": { "type": "step", "stepId": "capture_order_number" }
              }
            },
            {
              "optionId": "start_return",
              "label": "Start a return",
              "aliases": ["return item", "send it back"],
              "branch": {
                "operations": [
                  { "type": "set_variable", "operationId": "set_support_intent_return", "variableId": "supportIntent", "value": { "type": "literal", "value": "start_return" } }
                ],
                "target": { "type": "step", "stepId": "return_reason" }
              }
            },
            {
              "optionId": "damaged_item",
              "label": "Damaged item",
              "branch": {
                "operations": [
                  { "type": "set_variable", "operationId": "set_support_intent_damage", "variableId": "supportIntent", "value": { "type": "literal", "value": "damaged_item" } }
                ],
                "target": { "type": "step", "stepId": "capture_damage_description" }
              }
            },
            {
              "optionId": "talk_to_human",
              "label": "Talk to a human",
              "branch": {
                "operations": [
                  { "type": "set_variable", "operationId": "set_support_intent_handoff", "variableId": "supportIntent", "value": { "type": "literal", "value": "talk_to_human" } }
                ],
                "target": { "type": "step", "stepId": "handoff_reason" }
              }
            }
          ]
        }
      },
      {
        "stepId": "capture_order_number",
        "type": "input",
        "config": {
          "prompt": { "mode": "static", "text": "Send your order number." },
          "input": {
            "acceptedInputTypes": ["text"],
            "bindings": [
              {
                "targetVariableId": "orderNumber",
                "source": "text",
                "required": true,
                "normalizers": [{ "type": "trim" }, { "type": "uppercase" }],
                "extractors": [{ "type": "regex", "options": { "pattern": "ORD-[0-9]{4}" } }],
                "validators": [
                  { "type": "regex", "options": { "pattern": "^ORD-[0-9]{4}$" }, "message": { "mode": "static", "text": "Use an order number like ORD-2048." } }
                ],
                "saveRawInput": true
              }
            ],
            "invalidBehavior": {
              "message": { "mode": "static", "text": "Use an order number like ORD-2048." },
              "target": { "type": "stay" },
              "maxRetries": 2
            }
          }
        },
        "routes": [
          {
            "routeId": "order_number_captured",
            "match": { "type": "outcome", "outcome": "captured" },
            "branch": {
              "operations": [
                {
                  "type": "run_action",
                  "operationId": "run_lookup_order",
                  "actionId": "lookup_order",
                  "inputMapping": { "orderNumber": { "type": "variable", "variableId": "orderNumber" } },
                  "outputMapping": { "order": "orderStatus" },
                  "onResult": [
                    { "match": { "type": "outcome", "outcome": "found" }, "branch": { "target": { "type": "step", "stepId": "done" } } }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "stepId": "return_reason",
        "type": "input",
        "config": {
          "prompt": { "mode": "static", "text": "Tell me why you want to return the item." },
          "input": {
            "acceptedInputTypes": ["text"],
            "bindings": [{ "targetVariableId": "returnReason", "source": "text", "required": true, "extractors": [{ "type": "raw_text" }] }],
            "semanticTasks": [
              {
                "taskId": "classify_return_reason",
                "mode": "after_valid_capture",
                "allowedOutcomes": ["damaged_item", "size_issue", "changed_mind", "other"],
                "threshold": 0.74,
                "saveOutcomeToVariableId": "returnCategory",
                "allowedVariableIds": ["returnReason"]
              }
            ]
          }
        },
        "routes": [{ "routeId": "return_reason_captured", "match": { "type": "outcome", "outcome": "captured" }, "branch": { "target": { "type": "step", "stepId": "return_router" } } }]
      },
      {
        "stepId": "return_router",
        "type": "condition",
        "config": {
          "branches": [
            {
              "branchId": "return_damaged",
              "outcome": "damaged_item",
              "when": { "type": "equals", "left": { "type": "variable", "variableId": "returnCategory" }, "right": { "type": "literal", "value": "damaged_item" } },
              "branch": { "target": { "type": "step", "stepId": "upload_return_photo" } }
            }
          ],
          "defaultBranch": { "target": { "type": "step", "stepId": "create_return_authorization" } }
        }
      },
      {
        "stepId": "upload_return_photo",
        "type": "attachment",
        "config": {
          "prompt": { "mode": "static", "text": "Attach a product photo if you have one." },
          "targetVariableId": "returnPhoto",
          "rules": {
            "required": false,
            "allowedMimeTypes": ["image/jpeg", "image/png", "application/pdf"],
            "allowedExtensions": [".jpg", ".jpeg", ".png", ".pdf"],
            "maxFiles": 3,
            "maxSizeMb": 8
          }
        },
        "routes": [
          {
            "routeId": "return_photo_ready",
            "match": { "type": "outcome", "outcome": "captured" },
            "branch": {
              "operations": [
                {
                  "type": "custom",
                  "operationId": "create_return_authorization",
                  "customOperationId": "returns_authorization_plugin",
                  "customType": "returns.createAuthorization",
                  "inputMapping": {
                    "reason": { "type": "variable", "variableId": "returnReason" },
                    "category": { "type": "variable", "variableId": "returnCategory" },
                    "photo": { "type": "variable", "variableId": "returnPhoto" }
                  },
                  "onResult": [
                    { "match": { "type": "outcome", "outcome": "created" }, "branch": { "target": { "type": "step", "stepId": "done" } } }
                  ]
                },
                { "type": "emit_event", "eventType": "return_requested" }
              ]
            }
          }
        ]
      },
      {
        "stepId": "capture_damage_description",
        "type": "input",
        "config": {
          "input": {
            "acceptedInputTypes": ["text"],
            "bindings": [{ "targetVariableId": "damageDescription", "source": "text", "required": true, "extractors": [{ "type": "raw_text" }] }]
          }
        },
        "routes": [
          {
            "routeId": "damage_description_captured",
            "match": { "type": "outcome", "outcome": "captured" },
            "branch": {
              "operations": [
                { "type": "invalidate_variable", "variableId": "returnPhoto", "reason": "Issue description changed" },
                { "type": "send_message", "message": { "mode": "static", "text": "Attach a photo of the item or packaging." } }
              ],
              "target": { "type": "step", "stepId": "upload_return_photo" }
            }
          }
        ]
      },
      {
        "stepId": "check_replacement_eligibility",
        "type": "message",
        "routes": [
          {
            "routeId": "check_replacement",
            "match": { "type": "always" },
            "branch": {
              "operations": [
                {
                  "type": "run_action",
                  "operationId": "check_replacement_eligibility",
                  "actionId": "check_replacement_eligibility",
                  "inputMapping": {
                    "description": { "type": "variable", "variableId": "damageDescription" },
                    "photo": { "type": "variable", "variableId": "returnPhoto" }
                  },
                  "onResult": [
                    { "match": { "type": "outcome", "outcome": "eligible" }, "branch": { "target": { "type": "step", "stepId": "done" } } },
                    { "match": { "type": "outcome", "outcome": "not_eligible" }, "branch": { "target": { "type": "step", "stepId": "request_handoff" } } }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "stepId": "handoff_reason",
        "type": "input",
        "config": { "input": { "acceptedInputTypes": ["text"], "bindings": [{ "targetVariableId": "handoffReason", "source": "text", "required": true }] } },
        "routes": [
          {
            "routeId": "handoff_reason_captured",
            "match": { "type": "outcome", "outcome": "captured" },
            "branch": {
              "operations": [
                {
                  "type": "call_flow",
                  "operationId": "collect_contact_info",
                  "flowVersionId": "contact-info-v1",
                  "inputMapping": { "reason": { "type": "variable", "variableId": "handoffReason" } },
                  "outputMapping": { "contactEmail": "contactEmail" },
                  "onResult": [
                    { "match": { "type": "status", "status": "completed" }, "branch": { "target": { "type": "step", "stepId": "request_handoff" } } }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "stepId": "request_handoff",
        "type": "message",
        "routes": [
          {
            "routeId": "create_handoff",
            "match": { "type": "always" },
            "branch": {
              "operations": [
                {
                  "type": "handoff",
                  "operationId": "create_human_handoff",
                  "channel": "live_chat",
                  "queue": "priority",
                  "reason": { "type": "variable", "variableId": "handoffReason" },
                  "metadataMapping": {
                    "contactEmail": { "type": "variable", "variableId": "contactEmail" },
                    "intent": { "type": "variable", "variableId": "supportIntent" }
                  },
                  "handoffIdVariableId": "handoffId",
                  "message": { "mode": "static", "text": "A human support specialist will continue from here." },
                  "onResult": [
                    { "match": { "type": "status", "status": "success" }, "branch": { "target": { "type": "end", "status": "handoff" } } }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "stepId": "done",
        "type": "end",
        "config": {
          "status": "completed",
          "finalMessage": { "mode": "reference", "responseId": "order_status_summary" }
        }
      }
    ],
    "settings": {
      "defaultChannel": "web",
      "maxStepExecutionsPerTurn": 12
    }
  }
}`;

const showcaseTurns: readonly ShowcaseScenario[] = [
  {
    id: "track_order",
    label: "Track an order",
    branchLabel: "MenuOption: track_order",
    scenarioJson: fullFlowVersionJson,
    flowPath: commonFlowPath,
    branches: [
      { from: "flow_version", to: "main_menu", label: "startStepId" },
      { from: "main_menu", to: "capture_order_number", label: "track_order" },
      { from: "capture_order_number", to: "lookup_order", label: "valid input" },
      { from: "lookup_order", to: "done", label: "found" },
    ],
    turns: [
      {
        id: "track_intro",
        title: "FlowVersion",
        activeStepId: "flow_version",
        activeInterface: "FlowVersion",
        activeJsonPath: "flowVersion.definition",
        pendingInput: "waiting for menu choice",
        status: "active",
        conversationMessages: [
          {
            id: "track_intro_bot_1",
            from: "bot",
            badge: "OutboundMessage",
            text: "Hi. I can help with orders, returns, damaged items, or human support.",
          },
          {
            id: "track_intro_bot_2",
            from: "bot",
            badge: "OutboundButton",
            text: "Choose one option: track_order, start_return, damaged_item, talk_to_human.",
          },
        ],
        runtimeEvents: [
          {
            id: "track_started",
            type: "conversation_started",
            label: "ConversationEvent",
            detail: "ConversationState.currentStepId = main_menu",
            tone: "success",
          },
          {
            id: "track_message_created",
            type: "message_created",
            label: "ProcessTurnResult.messages",
            detail: "Two ResponseDefinition plans were rendered as outbound messages.",
          },
        ],
        variableChanges: [],
        traceItems: [
          {
            id: "track_trace_root",
            source: "DecisionTrace",
            text: "The engine loaded the published FlowVersion and entered startStepId.",
          },
          {
            id: "track_trace_response",
            source: "ResponseReferencePlan",
            text: "welcome_prompt and main_menu_prompt resolve from definition.responses.",
          },
        ],
        interfaceTags: [
          "FlowVersion",
          "ConversationFlowDefinition",
          "VariableDefinition",
          "ResponseDefinition",
          "MessageStepDefinition",
          "StaticResponsePlan",
          "ResponseReferencePlan",
          "ConversationState",
          "ProcessTurnResult",
          "ConversationEvent",
          "DecisionTrace",
        ],
        jsonFragment: `{
  "flowVersionId": "order-support-v1",
  "flowId": "order-support",
  "version": "1.0.0",
  "status": "published",
  "schemaVersion": "0.1.0",
  "createdAt": "2026-05-22T00:00:00.000Z",
  "definition": {
    "flowId": "order-support",
    "startStepId": "welcome",
    "variables": [
      { "variableId": "orderNumber", "type": "string", "scope": "conversation" },
      { "variableId": "orderStatus", "type": "object", "scope": "conversation" },
      { "variableId": "returnReason", "type": "string", "scope": "conversation" },
      { "variableId": "returnCategory", "type": "enum", "scope": "conversation" },
      { "variableId": "handoffId", "type": "string", "scope": "conversation" }
    ],
    "responses": [
      { "responseId": "welcome_prompt", "plan": { "mode": "static", "text": "Hi. I can help with orders, returns, damaged items, or human support." } },
      { "responseId": "main_menu_prompt", "plan": { "mode": "static", "text": "Choose one option." } }
    ],
    "settings": {
      "defaultChannel": "web",
      "maxStepExecutionsPerTurn": 12
    }
  }
}`,
        highlightLines: [2, 5, 6, 8, 10, 11, 12, 18, 22, 23],
      },
      {
        id: "track_menu",
        title: "Menu branch",
        activeStepId: "main_menu",
        activeInterface: "MenuOption",
        activeJsonPath: "definition.steps.main_menu.config.options[0].branch",
        branchLabel: "track_order",
        pendingInput: "waiting for order number",
        status: "active",
        conversationMessages: [
          {
            id: "track_choice",
            from: "user",
            badge: "ChoiceUserInput",
            text: "Track an order",
            optionId: "track_order",
          },
          {
            id: "track_checking",
            from: "bot",
            badge: "SendMessageOperation",
            text: "Sure. Send the order number and I will check the latest status.",
          },
        ],
        runtimeEvents: [
          {
            id: "track_input_received",
            type: "input_received",
            label: "ChoiceUserInput",
            detail: "optionId track_order matched a declared MenuOption.",
            tone: "success",
          },
          {
            id: "track_variable_set",
            type: "variable_set",
            label: "SetVariableOperation",
            detail: "supportIntent = track_order",
            tone: "success",
          },
          {
            id: "track_transition",
            type: "transition_taken",
            label: "StepTarget",
            detail: "target.type = step, stepId = capture_order_number",
          },
        ],
        variableChanges: [
          { variableId: "supportIntent", value: "track_order", scope: "conversation", source: "MenuOption.branch" },
        ],
        traceItems: [
          {
            id: "track_menu_trace",
            source: "StepBranch",
            text: "The selected branch runs a variable write before moving to the input step.",
          },
        ],
        interfaceTags: [
          "MenuStepDefinition",
          "MenuOption",
          "MenuSelectionPolicy",
          "StepBranch",
          "StepTarget",
          "SendMessageOperation",
          "SetVariableOperation",
        ],
        jsonFragment: `{
  "stepId": "main_menu",
  "type": "menu",
  "config": {
    "prompt": { "mode": "reference", "responseId": "main_menu_prompt" },
    "selection": {
      "allowButtons": true,
      "allowNumbers": true,
      "allowExactText": true,
      "allowAliases": true
    },
    "options": [
      {
        "optionId": "track_order",
        "label": "Track an order",
        "aliases": ["where is my package", "shipment status"],
        "branch": {
          "operations": [
            { "type": "set_variable", "variableId": "supportIntent", "value": { "type": "literal", "value": "track_order" } },
            { "type": "send_message", "message": { "mode": "static", "text": "Sure. Send the order number and I will check the latest status." } }
          ],
          "target": { "type": "step", "stepId": "capture_order_number" }
        }
      }
    ]
  }
}`,
        highlightLines: [2, 3, 5, 6, 12, 14, 17, 18, 19, 20, 22],
      },
      {
        id: "track_order_number",
        title: "Input contract",
        activeStepId: "capture_order_number",
        activeInterface: "InputContract",
        activeJsonPath: "definition.steps.capture_order_number.config.input.bindings",
        pendingInput: "runtime can continue",
        status: "active",
        conversationMessages: [
          {
            id: "track_order_text",
            from: "user",
            badge: "TextUserInput",
            text: "ORD-2048",
          },
        ],
        runtimeEvents: [
          {
            id: "track_text_received",
            type: "input_received",
            label: "TextUserInput",
            detail: "Raw text arrived on the web channel.",
          },
          {
            id: "track_input_resolved",
            type: "input_resolved",
            label: "InputBinding",
            detail: "trim + uppercase + regex extractor resolved orderNumber.",
            tone: "success",
          },
          {
            id: "track_order_variable",
            type: "variable_set",
            label: "VariablePatch",
            detail: "orderNumber = ORD-2048",
            tone: "success",
          },
        ],
        variableChanges: [
          { variableId: "orderNumber", value: "ORD-2048", scope: "conversation", source: "InputBinding" },
        ],
        traceItems: [
          {
            id: "track_input_trace",
            source: "ValidatorDefinition",
            text: "The valid branch is taken because the order number matches the declared pattern.",
          },
          {
            id: "track_invalid_trace",
            source: "InvalidInputBehavior",
            text: "Invalid text would stay on the same step with a static retry message.",
          },
        ],
        interfaceTags: [
          "InputStepDefinition",
          "InputContract",
          "InputBinding",
          "NormalizerDefinition",
          "ExtractorDefinition",
          "ValidatorDefinition",
          "InvalidInputBehavior",
          "TextUserInput",
          "VariablePatch",
        ],
        jsonFragment: `{
  "stepId": "capture_order_number",
  "type": "input",
  "config": {
    "prompt": { "mode": "static", "text": "Send your order number." },
    "input": {
      "acceptedInputTypes": ["text"],
      "bindings": [
        {
          "targetVariableId": "orderNumber",
          "source": "text",
          "required": true,
          "normalizers": [{ "type": "trim" }, { "type": "uppercase" }],
          "extractors": [{ "type": "regex", "options": { "pattern": "ORD-[0-9]{4}" } }],
          "validators": [
            {
              "type": "regex",
              "options": { "pattern": "^ORD-[0-9]{4}$" },
              "message": { "mode": "static", "text": "Use an order number like ORD-2048." }
            }
          ],
          "saveRawInput": true
        }
      ],
      "invalidBehavior": {
        "message": { "mode": "static", "text": "Use an order number like ORD-2048." },
        "target": { "type": "stay" },
        "maxRetries": 2
      }
    }
  }
}`,
        highlightLines: [2, 3, 6, 7, 8, 10, 13, 14, 15, 17, 18, 25, 27],
      },
      {
        id: "track_lookup",
        title: "Action route",
        activeStepId: "lookup_order",
        activeInterface: "RunActionOperation",
        activeJsonPath: "definition.steps.capture_order_number.routes[0].branch.operations[0]",
        pendingInput: "runtime executing action",
        status: "active",
        conversationMessages: [
          {
            id: "track_runtime_lookup",
            from: "runtime",
            badge: "ActionHandler",
            text: "lookup_order returned outcome found with carrier and ETA outputs.",
          },
        ],
        runtimeEvents: [
          {
            id: "track_operation_started",
            type: "operation_started",
            label: "RunActionOperation",
            detail: "inputMapping.orderNumber reads the captured variable.",
          },
          {
            id: "track_action_completed",
            type: "action_completed",
            label: "ActionResult",
            detail: "status success, outcome found, outputs mapped to orderStatus.",
            tone: "success",
          },
          {
            id: "track_action_branch",
            type: "transition_taken",
            label: "ActionResultBranch",
            detail: "found -> summarize_order_status",
          },
        ],
        variableChanges: [
          {
            variableId: "orderStatus",
            value: "{ carrier: FastShip, eta: 2026-05-25 }",
            scope: "conversation",
            source: "ActionResult.outputs",
          },
        ],
        traceItems: [
          {
            id: "track_action_trace",
            source: "ActionTraceRecord",
            text: "The app-provided action handler is called; the flow only declares the contract.",
          },
        ],
        interfaceTags: ["RunActionOperation", "ActionDefinition", "ActionResult", "ActionResultBranch", "ValueExpression"],
        jsonFragment: `{
  "actions": [
    {
      "actionId": "lookup_order",
      "kind": "tool",
      "resultOutcomes": ["found", "not_found"],
      "sideEffect": false,
      "timeoutMs": 2500
    }
  ],
  "routes": [
    {
      "routeId": "order_number_captured",
      "match": { "type": "outcome", "outcome": "captured" },
      "branch": {
        "operations": [
          {
            "type": "run_action",
            "operationId": "run_lookup_order",
            "actionId": "lookup_order",
            "inputMapping": {
              "orderNumber": { "type": "variable", "variableId": "orderNumber" }
            },
            "outputMapping": { "order": "orderStatus" },
            "onResult": [
              {
                "match": { "type": "outcome", "outcome": "found" },
                "branch": { "target": { "type": "step", "stepId": "summarize_order_status" } }
              }
            ]
          }
        ]
      }
    }
  ]
}`,
        highlightLines: [2, 4, 5, 6, 18, 20, 21, 22, 24, 25, 28, 29],
      },
      {
        id: "track_summary",
        title: "Generated response",
        activeStepId: "done",
        activeInterface: "GeneratedResponsePlan",
        activeJsonPath: "definition.responses.order_status_summary.plan",
        pendingInput: "completed",
        status: "completed",
        conversationMessages: [
          {
            id: "track_summary_bot",
            from: "bot",
            badge: "GeneratedResponsePlan",
            text: "Order ORD-2048 is in transit with FastShip. The latest ETA is 2026-05-25.",
          },
        ],
        runtimeEvents: [
          {
            id: "track_llm_started",
            type: "llm_response_generation_started",
            label: "LlmResponseGenerator",
            detail: "Provider hook receives only orderNumber and orderStatus.",
          },
          {
            id: "track_llm_done",
            type: "message_created",
            label: "OutboundMessage",
            detail: "Generated text returned in ProcessTurnResult.messages.",
            tone: "success",
          },
          {
            id: "track_completed",
            type: "conversation_completed",
            label: "ConversationState",
            detail: "status = completed",
            tone: "success",
          },
        ],
        variableChanges: [],
        traceItems: [
          {
            id: "track_llm_trace",
            source: "LlmUsageRecord",
            text: "The trace can record provider, model, latency, and success metadata.",
          },
        ],
        interfaceTags: ["GeneratedResponsePlan", "LlmResponseGenerator", "LlmUsageRecord", "OutboundMessage", "EndStepDefinition"],
        jsonFragment: `{
  "responseId": "order_status_summary",
  "plan": {
    "mode": "generated",
    "goal": "Summarize the shipment status in one concise support message.",
    "allowedVariableIds": ["orderNumber", "orderStatus"],
    "constraints": [
      "Use only variables supplied by the runtime.",
      "Do not invent delivery dates.",
      "Mention the order number if present."
    ],
    "fallbackText": "I found your order status and will continue from here."
  },
  "endStep": {
    "stepId": "done",
    "type": "end",
    "config": {
      "status": "completed",
      "finalMessage": { "mode": "reference", "responseId": "order_status_summary" }
    }
  }
}`,
        highlightLines: [2, 4, 5, 6, 7, 12, 15, 16, 18, 19],
      },
    ],
  },
  {
    id: "start_return",
    label: "Start a return",
    branchLabel: "MenuOption: start_return",
    scenarioJson: fullFlowVersionJson,
    flowPath: commonFlowPath,
    branches: [
      { from: "flow_version", to: "main_menu", label: "startStepId" },
      { from: "main_menu", to: "return_reason", label: "start_return" },
      { from: "return_reason", to: "return_router", label: "damaged_item" },
      { from: "return_router", to: "upload_return_photo", label: "return_damaged" },
      { from: "upload_return_photo", to: "create_return_authorization", label: "attachment_valid" },
      { from: "create_return_authorization", to: "done", label: "created" },
    ],
    turns: [
      {
        id: "return_menu",
        title: "Return branch",
        activeStepId: "main_menu",
        activeInterface: "MenuOption",
        activeJsonPath: "definition.steps.main_menu.config.options[1]",
        branchLabel: "start_return",
        pendingInput: "waiting for return reason",
        status: "active",
        conversationMessages: [
          { id: "return_choice", from: "user", badge: "ChoiceUserInput", text: "Start a return", optionId: "start_return" },
          {
            id: "return_prompt",
            from: "bot",
            badge: "TemplateResponsePlan",
            text: "Tell me why you want to return the item.",
          },
        ],
        runtimeEvents: [
          {
            id: "return_choice_event",
            type: "menu_option_selected",
            label: "MenuOption",
            detail: "start_return branch selected.",
            tone: "success",
          },
          {
            id: "return_intent_set",
            type: "variable_set",
            label: "SetVariableOperation",
            detail: "supportIntent = start_return",
            tone: "success",
          },
        ],
        variableChanges: [
          { variableId: "supportIntent", value: "start_return", scope: "conversation", source: "MenuOption.branch" },
        ],
        traceItems: [
          {
            id: "return_menu_trace",
            source: "TransitionResolver",
            text: "The same main menu routes to a different branch without changing runtime code.",
          },
        ],
        interfaceTags: ["MenuStepDefinition", "MenuOption", "StepBranch", "StepTarget", "TemplateResponsePlan"],
        jsonFragment: `{
  "optionId": "start_return",
  "label": "Start a return",
  "aliases": ["return item", "send it back"],
  "branch": {
    "operations": [
      { "type": "set_variable", "variableId": "supportIntent", "value": { "type": "literal", "value": "start_return" } }
    ],
    "target": { "type": "step", "stepId": "return_reason" }
  }
}`,
        highlightLines: [2, 4, 5, 7, 9],
      },
      {
        id: "return_reason",
        title: "Semantic input",
        activeStepId: "return_reason",
        activeInterface: "SemanticInputTask",
        activeJsonPath: "definition.steps.return_reason.config.input.semanticTasks[0]",
        pendingInput: "runtime can evaluate category",
        status: "active",
        conversationMessages: [
          {
            id: "return_reason_text",
            from: "user",
            badge: "TextUserInput",
            text: "The item arrived damaged.",
          },
          {
            id: "return_classifier",
            from: "runtime",
            badge: "SemanticInputResolution",
            text: "classified outcome damaged_item with confidence 0.91",
          },
        ],
        runtimeEvents: [
          {
            id: "return_text_received",
            type: "input_received",
            label: "TextUserInput",
            detail: "returnReason captured from raw text.",
          },
          {
            id: "return_semantic",
            type: "input_resolved",
            label: "SemanticInputTask",
            detail: "allowed outcome damaged_item selected.",
            tone: "success",
          },
        ],
        variableChanges: [
          { variableId: "returnReason", value: "The item arrived damaged.", scope: "conversation", source: "InputBinding" },
          { variableId: "returnCategory", value: "damaged_item", scope: "conversation", source: "SemanticInputResolution" },
        ],
        traceItems: [
          {
            id: "return_semantic_trace",
            source: "SemanticInputResolver",
            text: "The provider can only choose one declared allowedOutcome.",
          },
        ],
        interfaceTags: ["InputStepDefinition", "InputContract", "InputBinding", "SemanticInputTask", "SemanticInputResolution"],
        jsonFragment: `{
  "stepId": "return_reason",
  "type": "input",
  "config": {
    "prompt": { "mode": "static", "text": "Tell me why you want to return the item." },
    "input": {
      "acceptedInputTypes": ["text"],
      "bindings": [
        {
          "targetVariableId": "returnReason",
          "source": "text",
          "required": true,
          "extractors": [{ "type": "raw_text" }]
        }
      ],
      "semanticTasks": [
        {
          "taskId": "classify_return_reason",
          "mode": "after_valid_capture",
          "allowedOutcomes": ["damaged_item", "size_issue", "changed_mind", "other"],
          "threshold": 0.74,
          "saveOutcomeToVariableId": "returnCategory",
          "allowedVariableIds": ["returnReason"]
        }
      ]
    }
  }
}`,
        highlightLines: [2, 3, 6, 7, 8, 10, 16, 18, 19, 20, 21, 22],
      },
      {
        id: "return_condition",
        title: "Condition branch",
        activeStepId: "return_router",
        activeInterface: "ConditionBranch",
        activeJsonPath: "definition.steps.return_router.config.branches[0]",
        branchLabel: "return_damaged",
        pendingInput: "waiting for attachment",
        status: "active",
        conversationMessages: [
          {
            id: "return_photo_prompt",
            from: "bot",
            badge: "MessageStepDefinition",
            text: "Please attach a product photo so the return can be authorized.",
          },
        ],
        runtimeEvents: [
          {
            id: "return_condition_event",
            type: "condition_evaluated",
            label: "ConditionTraceRecord",
            detail: "returnCategory equals damaged_item.",
            tone: "success",
          },
          {
            id: "return_condition_transition",
            type: "transition_taken",
            label: "ConditionBranch",
            detail: "return_damaged -> upload_return_photo",
          },
        ],
        variableChanges: [],
        traceItems: [
          {
            id: "return_condition_trace",
            source: "ConditionStepDefinition",
            text: "The branch is data-driven by returnCategory, not by imperative code.",
          },
        ],
        interfaceTags: ["ConditionStepDefinition", "ConditionBranch", "ConditionTraceRecord", "ValueExpression"],
        jsonFragment: `{
  "stepId": "return_router",
  "type": "condition",
  "config": {
    "branches": [
      {
        "branchId": "return_damaged",
        "outcome": "damaged_item",
        "when": {
          "type": "equals",
          "left": { "type": "variable", "variableId": "returnCategory" },
          "right": { "type": "literal", "value": "damaged_item" }
        },
        "branch": {
          "target": { "type": "step", "stepId": "upload_return_photo" }
        }
      }
    ],
    "defaultBranch": { "target": { "type": "step", "stepId": "create_return_authorization" } }
  }
}`,
        highlightLines: [2, 3, 5, 7, 8, 10, 11, 12, 14, 15],
      },
      {
        id: "return_photo",
        title: "Attachment rules",
        activeStepId: "upload_return_photo",
        activeInterface: "AttachmentRules",
        activeJsonPath: "definition.steps.upload_return_photo.config.rules",
        pendingInput: "runtime can run plugin",
        status: "active",
        conversationMessages: [
          {
            id: "return_photo_user",
            from: "user",
            badge: "AttachmentUserInput",
            text: "Uploaded product damage photo",
            attachment: "damage-photo.jpg - image/jpeg - 1.6 MB",
          },
        ],
        runtimeEvents: [
          {
            id: "return_attachment_received",
            type: "input_received",
            label: "AttachmentUserInput",
            detail: "One file accepted by MIME type and size rules.",
            tone: "success",
          },
          {
            id: "return_attachment_set",
            type: "variable_set",
            label: "VariablePatch",
            detail: "returnPhoto stored as file metadata.",
            tone: "success",
          },
        ],
        variableChanges: [
          { variableId: "returnPhoto", value: "damage-photo.jpg", scope: "conversation", source: "AttachmentRules" },
        ],
        traceItems: [
          {
            id: "return_attachment_trace",
            source: "AttachmentStepDefinition",
            text: "The runtime waits for an attachment input and validates the declared rules.",
          },
        ],
        interfaceTags: ["AttachmentStepDefinition", "AttachmentRules", "AttachmentUserInput", "VariablePatch"],
        jsonFragment: `{
  "stepId": "upload_return_photo",
  "type": "attachment",
  "config": {
    "prompt": { "mode": "static", "text": "Attach a product photo if you have one." },
    "targetVariableId": "returnPhoto",
    "rules": {
      "required": false,
      "allowedMimeTypes": ["image/jpeg", "image/png", "application/pdf"],
      "allowedExtensions": [".jpg", ".jpeg", ".png", ".pdf"],
      "maxFiles": 3,
      "maxSizeMb": 8
    },
    "invalidAttachment": {
      "message": { "mode": "static", "text": "Use JPG, PNG, or PDF up to 8 MB." },
      "target": { "type": "stay" }
    }
  }
}`,
        highlightLines: [2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16],
      },
      {
        id: "return_plugin",
        title: "Custom plugin",
        activeStepId: "create_return_authorization",
        activeInterface: "CustomOperation",
        activeJsonPath: "definition.customOperations[0]",
        pendingInput: "completed",
        status: "completed",
        conversationMessages: [
          {
            id: "return_plugin_runtime",
            from: "runtime",
            badge: "CustomOperationHandler",
            text: "returns.createAuthorization returned outcome created.",
          },
          {
            id: "return_done_bot",
            from: "bot",
            badge: "TemplateResponsePlan",
            text: "Return authorization RA-9012 is ready. Use the label link in your account.",
          },
        ],
        runtimeEvents: [
          {
            id: "return_operation_started",
            type: "operation_started",
            label: "CustomOperation",
            detail: "inputMapping reads returnReason, returnCategory, and returnPhoto.",
          },
          {
            id: "return_operation_done",
            type: "operation_completed",
            label: "CustomOperationResult",
            detail: "authorizationId mapped into state.",
            tone: "success",
          },
          {
            id: "return_business_event",
            type: "return_requested",
            label: "EmitEventOperation",
            detail: "Business event emitted after plugin success.",
          },
        ],
        variableChanges: [
          { variableId: "returnAuthorizationId", value: "RA-9012", scope: "conversation", source: "CustomOperationResult" },
        ],
        traceItems: [
          {
            id: "return_custom_trace",
            source: "OperationTraceRecord",
            text: "The custom operation is declared in the flow and implemented by the host app.",
          },
        ],
        interfaceTags: [
          "CustomOperationDefinition",
          "CustomOperation",
          "CustomOperationResult",
          "CustomOperationHandler",
          "EmitEventOperation",
        ],
        jsonFragment: `{
  "customOperations": [
    {
      "customOperationId": "returns_authorization_plugin",
      "customType": "returns.createAuthorization",
      "allowedOutcomes": ["created", "needs_review"],
      "inputSchema": { "type": "object" },
      "outputSchema": { "type": "object" }
    }
  ],
  "operation": {
    "type": "custom",
    "operationId": "create_return_authorization",
    "customOperationId": "returns_authorization_plugin",
    "customType": "returns.createAuthorization",
    "inputMapping": {
      "reason": { "type": "variable", "variableId": "returnReason" },
      "category": { "type": "variable", "variableId": "returnCategory" },
      "photo": { "type": "variable", "variableId": "returnPhoto" }
    },
    "onResult": [
      {
        "match": { "type": "outcome", "outcome": "created" },
        "branch": { "target": { "type": "step", "stepId": "done" } }
      }
    ]
  }
}`,
        highlightLines: [2, 4, 5, 6, 12, 14, 15, 16, 17, 18, 19, 23, 24],
      },
    ],
  },
  {
    id: "damaged_item",
    label: "Damaged item",
    branchLabel: "MenuOption: damaged_item",
    scenarioJson: fullFlowVersionJson,
    flowPath: commonFlowPath,
    branches: [
      { from: "flow_version", to: "main_menu", label: "startStepId" },
      { from: "main_menu", to: "upload_return_photo", label: "damaged_item" },
      { from: "upload_return_photo", to: "check_replacement_eligibility", label: "attachment_valid" },
      { from: "check_replacement_eligibility", to: "request_handoff", label: "not_eligible" },
    ],
    turns: [
      {
        id: "damage_menu",
        title: "Damage branch",
        activeStepId: "main_menu",
        activeInterface: "MenuOption",
        activeJsonPath: "definition.steps.main_menu.config.options[2]",
        branchLabel: "damaged_item",
        pendingInput: "waiting for issue description",
        status: "active",
        conversationMessages: [
          { id: "damage_choice", from: "user", badge: "ChoiceUserInput", text: "Damaged item", optionId: "damaged_item" },
          { id: "damage_prompt", from: "bot", badge: "StaticResponsePlan", text: "Describe what arrived damaged." },
        ],
        runtimeEvents: [
          {
            id: "damage_choice_event",
            type: "menu_option_selected",
            label: "MenuOption",
            detail: "damaged_item branch selected.",
            tone: "success",
          },
        ],
        variableChanges: [
          { variableId: "supportIntent", value: "damaged_item", scope: "conversation", source: "MenuOption.branch" },
        ],
        traceItems: [
          {
            id: "damage_trace",
            source: "DecisionTrace",
            text: "The branch can reuse the same attachment and eligibility APIs as returns.",
          },
        ],
        interfaceTags: ["MenuOption", "StepBranch", "StaticResponsePlan"],
        jsonFragment: `{
  "optionId": "damaged_item",
  "label": "Damaged item",
  "branch": {
    "operations": [
      { "type": "set_variable", "variableId": "supportIntent", "value": { "type": "literal", "value": "damaged_item" } }
    ],
    "target": { "type": "step", "stepId": "capture_damage_description" }
  }
}`,
        highlightLines: [2, 4, 6, 8],
      },
      {
        id: "damage_description",
        title: "Issue input",
        activeStepId: "upload_return_photo",
        activeInterface: "InputStepDefinition",
        activeJsonPath: "definition.steps.capture_damage_description.config.input",
        pendingInput: "waiting for photo",
        status: "active",
        conversationMessages: [
          { id: "damage_text", from: "user", badge: "TextUserInput", text: "The screen is cracked and the box was wet." },
          { id: "damage_upload_prompt", from: "bot", badge: "SendMessageOperation", text: "Attach a photo of the item or packaging." },
        ],
        runtimeEvents: [
          {
            id: "damage_text_received",
            type: "input_received",
            label: "InputBinding",
            detail: "damageDescription stored.",
          },
          {
            id: "damage_invalidate",
            type: "variable_invalidated",
            label: "InvalidateVariableOperation",
            detail: "Previous photo evidence would be invalidated if the issue changes.",
            tone: "warning",
          },
        ],
        variableChanges: [
          { variableId: "damageDescription", value: "The screen is cracked and the box was wet.", scope: "conversation", source: "InputBinding" },
        ],
        traceItems: [
          {
            id: "damage_description_trace",
            source: "InputProcessor",
            text: "The turn captures text and can clear obsolete values before asking for evidence.",
          },
        ],
        interfaceTags: ["InputStepDefinition", "InputContract", "InvalidateVariableOperation", "SendMessageOperation"],
        jsonFragment: `{
  "stepId": "capture_damage_description",
  "type": "input",
  "config": {
    "input": {
      "acceptedInputTypes": ["text"],
      "bindings": [
        { "targetVariableId": "damageDescription", "source": "text", "required": true, "extractors": [{ "type": "raw_text" }] }
      ]
    }
  },
  "routes": [
    {
      "match": { "type": "outcome", "outcome": "captured" },
      "branch": {
        "operations": [
          { "type": "invalidate_variable", "variableId": "returnPhoto", "reason": "Issue description changed" },
          { "type": "send_message", "message": { "mode": "static", "text": "Attach a photo of the item or packaging." } }
        ],
        "target": { "type": "step", "stepId": "upload_return_photo" }
      }
    }
  ]
}`,
        highlightLines: [2, 3, 5, 6, 7, 8, 15, 17, 18, 20],
      },
      {
        id: "damage_eligibility",
        title: "Action result",
        activeStepId: "check_replacement_eligibility",
        activeInterface: "ActionResultBranch",
        activeJsonPath: "definition.steps.upload_return_photo.routes[0].branch.operations[0]",
        branchLabel: "not_eligible",
        pendingInput: "handoff needed",
        status: "active",
        conversationMessages: [
          { id: "damage_photo", from: "user", badge: "AttachmentUserInput", text: "Uploaded cracked-screen.jpg", attachment: "cracked-screen.jpg - image/jpeg - 2.1 MB" },
          {
            id: "damage_runtime",
            from: "runtime",
            badge: "ActionResultBranch",
            text: "check_replacement_eligibility returned outcome not_eligible.",
          },
        ],
        runtimeEvents: [
          {
            id: "damage_action_started",
            type: "action_started",
            label: "RunActionOperation",
            detail: "Evidence and order status are sent to the handler.",
          },
          {
            id: "damage_action_completed",
            type: "action_completed",
            label: "ActionResult",
            detail: "outcome not_eligible selected the handoff branch.",
            tone: "warning",
          },
        ],
        variableChanges: [
          { variableId: "replacementEligibility", value: "not_eligible", scope: "conversation", source: "ActionResult.outputs" },
        ],
        traceItems: [
          {
            id: "damage_action_trace",
            source: "ActionTraceRecord",
            text: "The configured ActionResultBranch makes the alternate route visible.",
          },
        ],
        interfaceTags: ["RunActionOperation", "ActionDefinition", "ActionResultBranch", "ActionTraceRecord"],
        jsonFragment: `{
  "actionId": "check_replacement_eligibility",
  "kind": "tool",
  "resultOutcomes": ["eligible", "not_eligible"],
  "operation": {
    "type": "run_action",
    "operationId": "check_replacement_eligibility",
    "actionId": "check_replacement_eligibility",
    "inputMapping": {
      "description": { "type": "variable", "variableId": "damageDescription" },
      "photo": { "type": "variable", "variableId": "returnPhoto" }
    },
    "onResult": [
      {
        "match": { "type": "outcome", "outcome": "eligible" },
        "branch": { "target": { "type": "step", "stepId": "replacement_confirmation" } }
      },
      {
        "match": { "type": "outcome", "outcome": "not_eligible" },
        "branch": { "target": { "type": "step", "stepId": "request_handoff" } }
      }
    ]
  }
}`,
        highlightLines: [2, 4, 6, 8, 9, 10, 11, 14, 16, 17, 20, 21],
      },
    ],
  },
  {
    id: "talk_to_human",
    label: "Talk to a human",
    branchLabel: "MenuOption: talk_to_human",
    scenarioJson: fullFlowVersionJson,
    flowPath: commonFlowPath,
    branches: [
      { from: "flow_version", to: "main_menu", label: "startStepId" },
      { from: "main_menu", to: "collect_contact_flow", label: "talk_to_human" },
      { from: "collect_contact_flow", to: "request_handoff", label: "contact_ready" },
    ],
    turns: [
      {
        id: "human_menu",
        title: "Handoff branch",
        activeStepId: "main_menu",
        activeInterface: "MenuOption",
        activeJsonPath: "definition.steps.main_menu.config.options[3]",
        branchLabel: "talk_to_human",
        pendingInput: "waiting for reason",
        status: "active",
        conversationMessages: [
          { id: "human_choice", from: "user", badge: "ChoiceUserInput", text: "Talk to a human", optionId: "talk_to_human" },
          { id: "human_reason_prompt", from: "bot", badge: "StaticResponsePlan", text: "Add a short reason so I can route the handoff." },
        ],
        runtimeEvents: [
          {
            id: "human_choice_event",
            type: "menu_option_selected",
            label: "MenuOption",
            detail: "talk_to_human branch selected.",
            tone: "success",
          },
        ],
        variableChanges: [
          { variableId: "supportIntent", value: "talk_to_human", scope: "conversation", source: "MenuOption.branch" },
        ],
        traceItems: [
          {
            id: "human_menu_trace",
            source: "StepBranch",
            text: "The target is an input step before the handoff operation executes.",
          },
        ],
        interfaceTags: ["MenuOption", "StepBranch", "StepTarget", "ChoiceUserInput"],
        jsonFragment: `{
  "optionId": "talk_to_human",
  "label": "Talk to a human",
  "branch": {
    "operations": [
      { "type": "set_variable", "variableId": "supportIntent", "value": { "type": "literal", "value": "talk_to_human" } }
    ],
    "target": { "type": "step", "stepId": "handoff_reason" }
  }
}`,
        highlightLines: [2, 4, 6, 8],
      },
      {
        id: "human_reason",
        title: "Call flow",
        activeStepId: "collect_contact_flow",
        activeInterface: "CallFlowOperation",
        activeJsonPath: "definition.steps.handoff_reason.routes[0].branch.operations[0]",
        pendingInput: "runtime executing child flow",
        status: "active",
        conversationMessages: [
          { id: "human_reason_text", from: "user", badge: "TextUserInput", text: "I need help with a delivery exception." },
          {
            id: "human_subflow",
            from: "runtime",
            badge: "FlowCallTraceRecord",
            text: "contact-info-v1 completed and returned contactEmail.",
          },
        ],
        runtimeEvents: [
          {
            id: "human_flow_started",
            type: "flow_call_started",
            label: "CallFlowOperation",
            detail: "Child flow contact-info-v1 started.",
          },
          {
            id: "human_flow_done",
            type: "flow_call_completed",
            label: "FlowCallTraceRecord",
            detail: "contactEmail mapped back into ConversationState.",
            tone: "success",
          },
        ],
        variableChanges: [
          { variableId: "handoffReason", value: "delivery exception", scope: "conversation", source: "InputBinding" },
          { variableId: "contactEmail", value: "customer@example.com", scope: "conversation", source: "CallFlowOperation" },
        ],
        traceItems: [
          {
            id: "human_flow_trace",
            source: "FlowCallTraceRecord",
            text: "The parent flow records the child flow frame and returned variables.",
          },
        ],
        interfaceTags: ["CallFlowOperation", "FlowCallTraceRecord", "ConversationState", "InputBinding"],
        jsonFragment: `{
  "routes": [
    {
      "routeId": "handoff_reason_captured",
      "match": { "type": "outcome", "outcome": "captured" },
      "branch": {
        "operations": [
          {
            "type": "call_flow",
            "operationId": "collect_contact_info",
            "flowVersionId": "contact-info-v1",
            "inputMapping": {
              "reason": { "type": "variable", "variableId": "handoffReason" }
            },
            "outputMapping": {
              "contactEmail": "contactEmail"
            },
            "onResult": [
              {
                "match": { "type": "status", "status": "completed" },
                "branch": { "target": { "type": "step", "stepId": "request_handoff" } }
              }
            ]
          }
        ]
      }
    }
  ]
}`,
        highlightLines: [2, 4, 5, 7, 9, 10, 11, 12, 15, 16, 19, 21],
      },
      {
        id: "human_handoff",
        title: "Handoff",
        activeStepId: "request_handoff",
        activeInterface: "HandoffOperation",
        activeJsonPath: "definition.steps.request_handoff.routes[0].branch.operations[0]",
        branchLabel: "handoff",
        pendingInput: "handoff",
        status: "handoff",
        conversationMessages: [
          {
            id: "human_handoff_runtime",
            from: "runtime",
            badge: "HandoffTraceRecord",
            text: "handoffId HND-4821 created in support queue priority.",
          },
          {
            id: "human_handoff_bot",
            from: "bot",
            badge: "OutboundMessage",
            text: "I connected you with a human support queue. A specialist will continue from here.",
          },
        ],
        runtimeEvents: [
          {
            id: "human_handoff_started",
            type: "handoff_started",
            label: "HandoffOperation",
            detail: "queue = priority, channel = live_chat.",
          },
          {
            id: "human_handoff_done",
            type: "handoff_completed",
            label: "HandoffResult",
            detail: "status success, handoffId HND-4821.",
            tone: "success",
          },
          {
            id: "human_final_state",
            type: "conversation_completed",
            label: "ConversationState",
            detail: "status = handoff",
            tone: "success",
          },
        ],
        variableChanges: [
          { variableId: "handoffId", value: "HND-4821", scope: "conversation", source: "HandoffOperation" },
        ],
        traceItems: [
          {
            id: "human_handoff_trace",
            source: "HandoffTraceRecord",
            text: "The handoff result and final state are included in DecisionTrace.",
          },
        ],
        interfaceTags: ["HandoffOperation", "HandoffResult", "HandoffTraceRecord", "ConversationState"],
        jsonFragment: `{
  "stepId": "request_handoff",
  "type": "message",
  "routes": [
    {
      "routeId": "create_handoff",
      "match": { "type": "always" },
      "branch": {
        "operations": [
          {
            "type": "handoff",
            "operationId": "create_human_handoff",
            "channel": "live_chat",
            "queue": "priority",
            "reason": { "type": "variable", "variableId": "handoffReason" },
            "metadataMapping": {
              "contactEmail": { "type": "variable", "variableId": "contactEmail" },
              "intent": { "type": "variable", "variableId": "supportIntent" }
            },
            "handoffIdVariableId": "handoffId",
            "message": { "mode": "static", "text": "A human support specialist will continue from here." },
            "onResult": [
              {
                "match": { "type": "status", "status": "success" },
                "branch": { "target": { "type": "end", "status": "handoff" } }
              }
            ]
          }
        ]
      }
    }
  ]
}`,
        highlightLines: [2, 4, 6, 8, 9, 11, 12, 13, 14, 15, 16, 20, 21, 24, 25],
      },
    ],
  },
] as const;

const jsonAnchorMap: Record<string, readonly string[]> = {
  track_intro: ['"flowVersionId"', '"definition"', '"variables"', '"responses"'],
  track_menu: ['"optionId": "track_order"', '"set_support_intent_track"', '"capture_order_number"'],
  track_order_number: ['"stepId": "capture_order_number"', '"targetVariableId": "orderNumber"', '"invalidBehavior"'],
  track_lookup: ['"operationId": "run_lookup_order"', '"actionId": "lookup_order"', '"onResult"'],
  track_summary: ['"responseId": "order_status_summary"', '"mode": "generated"', '"stepId": "done"'],
  return_menu: ['"optionId": "start_return"', '"set_support_intent_return"', '"return_reason"'],
  return_reason: ['"stepId": "return_reason"', '"taskId": "classify_return_reason"', '"saveOutcomeToVariableId": "returnCategory"'],
  return_condition: ['"stepId": "return_router"', '"branchId": "return_damaged"', '"upload_return_photo"'],
  return_photo: ['"stepId": "upload_return_photo"', '"targetVariableId": "returnPhoto"', '"rules"'],
  return_plugin: ['"customOperationId": "returns_authorization_plugin"', '"operationId": "create_return_authorization"', '"eventType": "return_requested"'],
  damage_menu: ['"optionId": "damaged_item"', '"set_support_intent_damage"', '"capture_damage_description"'],
  damage_description: ['"stepId": "capture_damage_description"', '"invalidate_variable"', '"upload_return_photo"'],
  damage_eligibility: ['"operationId": "check_replacement_eligibility"', '"outcome": "not_eligible"', '"request_handoff"'],
  human_menu: ['"optionId": "talk_to_human"', '"set_support_intent_handoff"', '"handoff_reason"'],
  human_reason: ['"stepId": "handoff_reason"', '"operationId": "collect_contact_info"', '"flowVersionId": "contact-info-v1"'],
  human_handoff: ['"stepId": "request_handoff"', '"operationId": "create_human_handoff"', '"handoffIdVariableId": "handoffId"'],
};

const activeScenarioId = ref(showcaseTurns[0].id);
const activeTurnIndex = ref(0);
const isPlaying = ref(false);
const jsonLineRefs = ref<Array<HTMLElement | null>>([]);
let playTimer: number | undefined;

const activeScenario = computed<ShowcaseScenario>(() => (
  showcaseTurns.find((scenario) => scenario.id === activeScenarioId.value) ?? showcaseTurns[0]
));

const activeTurn = computed<ShowcaseTurn>(() => activeScenario.value.turns[activeTurnIndex.value] ?? activeScenario.value.turns[0]);

const visibleFlowPath = computed(() => (
  activeScenario.value.flowPath.filter((node) => (
    activeScenario.value.turns.some((turn) => turn.activeStepId === node.id)
  ))
));

const activePathNodeIndex = computed(() => {
  const index = visibleFlowPath.value.findIndex((node) => node.id === activeTurn.value.activeStepId);
  return index >= 0 ? index : 0;
});

const visibleConversationMessages = computed(() => (
  activeScenario.value.turns.slice(0, activeTurnIndex.value + 1).flatMap((turn, turnIndex) => (
    turn.conversationMessages.map((message) => ({
      ...message,
      turnId: turn.id,
      turnIndex,
    }))
  ))
));

const stateVariables = computed(() => {
  const variables = new Map<string, ShowcaseVariable>();

  for (const turn of activeScenario.value.turns.slice(0, activeTurnIndex.value + 1)) {
    for (const variable of turn.variableChanges) {
      variables.set(variable.variableId, variable);
    }
  }

  return Array.from(variables.values());
});

const scenarioJsonLines = computed(() => activeScenario.value.scenarioJson.split("\n"));

const highlightedJsonLines = computed(() => {
  const anchors = jsonAnchorMap[activeTurn.value.id] ?? [activeTurn.value.activeJsonPath, activeTurn.value.activeStepId];
  const lines = new Set<number>();

  scenarioJsonLines.value.forEach((line, index) => {
    if (!anchors.some((anchor) => line.includes(anchor))) {
      return;
    }

    for (let offset = 0; offset < 3; offset += 1) {
      if (index + offset < scenarioJsonLines.value.length) {
        lines.add(index + offset + 1);
      }
    }
  });

  return lines;
});

function stopPlayback() {
  if (playTimer !== undefined) {
    window.clearInterval(playTimer);
    playTimer = undefined;
  }

  isPlaying.value = false;
}

function setTurnIndex(index: number, shouldStop = true) {
  if (shouldStop) {
    stopPlayback();
  }

  activeTurnIndex.value = Math.max(0, Math.min(index, activeScenario.value.turns.length - 1));
}

function selectScenario(scenarioId: string) {
  stopPlayback();
  activeScenarioId.value = scenarioId;
  activeTurnIndex.value = 0;
}

function selectTurn(turnId: string) {
  const index = activeScenario.value.turns.findIndex((turn) => turn.id === turnId);
  if (index >= 0) {
    setTurnIndex(index);
  }
}

function selectTurnByStep(stepId: string) {
  const index = activeScenario.value.turns.findIndex((turn) => turn.activeStepId === stepId);
  if (index >= 0) {
    setTurnIndex(index);
  }
}

function goToTurn(offset: number) {
  setTurnIndex(activeTurnIndex.value + offset);
}

function advancePlayback() {
  if (activeTurnIndex.value >= activeScenario.value.turns.length - 1) {
    stopPlayback();
    return;
  }

  setTurnIndex(activeTurnIndex.value + 1, false);
}

function togglePlayback() {
  if (isPlaying.value) {
    stopPlayback();
    return;
  }

  isPlaying.value = true;
  playTimer = window.setInterval(advancePlayback, 1400);
}

function isHighlighted(lineNumber: number) {
  return highlightedJsonLines.value.has(lineNumber);
}

function setJsonLineRef(element: Element | ComponentPublicInstance | null, index: number) {
  jsonLineRefs.value[index] = element instanceof HTMLElement ? element : null;
}

function scrollToActiveJson() {
  void nextTick(() => {
    const firstHighlightedLine = Math.min(...Array.from(highlightedJsonLines.value));

    if (Number.isFinite(firstHighlightedLine)) {
      jsonLineRefs.value[firstHighlightedLine - 1]?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  });
}

function isActiveVariable(variableId: string) {
  return activeTurn.value.variableChanges.some((variable) => variable.variableId === variableId);
}

function incomingBranch(nodeId: string) {
  return activeScenario.value.branches.find((branch) => branch.to === nodeId);
}

function isSelectedOption(optionId: string) {
  return activeTurn.value.branchLabel === optionId || activeScenario.value.branchLabel.endsWith(optionId);
}

watch(
  () => [activeScenarioId.value, activeTurn.value.id],
  () => {
    jsonLineRefs.value = [];
    scrollToActiveJson();
  },
  { immediate: true },
);

onBeforeUnmount(stopPlayback);
</script>

<template>
  <main class="flow-showcase-page">
    <section class="flow-workbench">
      <header class="flow-showcase-toolbar" aria-label="Flow scenario controls">
        <div class="toolbar-title">
          <span>Order Support Assistant</span>
          <h1>Flow scenarios</h1>
        </div>

        <div class="scenario-tabs" role="tablist" aria-label="Scenarios">
          <button
            v-for="scenario in showcaseTurns"
            :key="scenario.id"
            type="button"
            :class="{ active: scenario.id === activeScenario.id }"
            @click="selectScenario(scenario.id)"
          >
            <strong>{{ scenario.label }}</strong>
            <small>{{ scenario.id }}</small>
          </button>
        </div>

        <div class="transport-controls" aria-label="Turn controls">
          <button type="button" :disabled="activeTurnIndex === 0" @click="goToTurn(-1)">Previous</button>
          <button type="button" class="play-control" @click="togglePlayback">
            {{ isPlaying ? "Pause" : "Play" }}
          </button>
          <button
            type="button"
            :disabled="activeTurnIndex === activeScenario.turns.length - 1"
            @click="goToTurn(1)"
          >
            Next
          </button>
        </div>
      </header>

      <div class="turn-strip" aria-label="Active turn">
        <strong>{{ activeTurn.title }}</strong>
        <span>{{ activeTurn.activeInterface }}</span>
        <code>{{ activeTurn.activeJsonPath }}</code>
        <em>{{ activeTurnIndex + 1 }}/{{ activeScenario.turns.length }}</em>
      </div>

      <section class="flow-showcase-workspace">
        <aside class="flow-path-panel" aria-label="Flow path">
          <header>
            <span>Path</span>
            <strong>{{ activeScenario.label }}</strong>
          </header>

          <ol>
            <li
              v-for="(node, index) in visibleFlowPath"
              :key="node.id"
              :class="{
                active: node.id === activeTurn.activeStepId,
                passed: index < activePathNodeIndex,
              }"
            >
              <button type="button" @click="selectTurnByStep(node.id)">
                <span>{{ String(index + 1).padStart(2, "0") }}</span>
                <div>
                  <strong>{{ node.label }}</strong>
                  <small>{{ node.type }}</small>
                </div>
              </button>
              <div v-if="node.options" class="branch-options" aria-label="Menu branches">
                <small
                  v-for="option in node.options"
                  :key="option"
                  :class="{ selected: isSelectedOption(option) }"
                >
                  {{ option }}
                </small>
              </div>
              <em v-if="incomingBranch(node.id)">{{ incomingBranch(node.id)?.label }}</em>
            </li>
          </ol>
        </aside>

        <section class="transcript-panel" aria-label="Conversation transcript">
          <header>
            <span>Transcript</span>
            <strong>{{ activeTurn.pendingInput }}</strong>
          </header>

        <div class="message-list">
          <button
            v-for="message in visibleConversationMessages"
            :key="message.id"
            type="button"
              class="message-bubble"
              :class="[message.from, { active: message.turnId === activeTurn.id }]"
              @click="selectTurn(message.turnId)"
            >
              <span>{{ message.badge }}</span>
              <p>{{ message.text }}</p>
            <small v-if="message.optionId">{{ message.optionId }}</small>
            <small v-if="message.attachment">{{ message.attachment }}</small>
          </button>

          <button
            type="button"
            class="chat-next-button"
            :disabled="activeTurnIndex === activeScenario.turns.length - 1"
            @click="goToTurn(1)"
          >
            Next
          </button>
        </div>
      </section>

        <aside class="json-panel" aria-label="Highlighted JSON configuration">
          <header>
            <span>{{ activeTurn.activeInterface }}</span>
            <strong>FlowVersion JSON</strong>
          </header>

          <pre class="json-code"><code><span
            v-for="(line, index) in scenarioJsonLines"
            :key="`${activeScenario.id}-${index}`"
            :ref="(element) => setJsonLineRef(element, index)"
            class="json-line"
            :class="{ marked: isHighlighted(index + 1) }"
            :data-json-line="index + 1"
          ><b>{{ String(index + 1).padStart(2, "0") }}</b>{{ line }}</span></code></pre>
        </aside>
      </section>

      <section class="flow-runtime-grid" aria-label="Runtime evidence">
        <div class="flow-runtime-panel event-panel">
          <header>
            <span>Events</span>
            <strong>ConversationEvent</strong>
          </header>
          <button
            v-for="event in activeTurn.runtimeEvents"
            :key="event.id"
            type="button"
            class="event-row"
            :class="event.tone ?? 'neutral'"
            @click="selectTurn(activeTurn.id)"
          >
            <span>{{ event.type }}</span>
            <strong>{{ event.label }}</strong>
            <p>{{ event.detail }}</p>
          </button>
        </div>

        <div class="flow-runtime-panel variable-panel">
          <header>
            <span>State</span>
            <strong>ConversationState</strong>
          </header>
          <div v-if="stateVariables.length" class="flow-variable-list">
            <div
              v-for="variable in stateVariables"
              :key="variable.variableId"
              class="variable-row"
              :class="{ active: isActiveVariable(variable.variableId) }"
            >
              <span>{{ variable.variableId }}</span>
              <strong>{{ variable.value }}</strong>
              <small>{{ variable.scope }} / {{ variable.source }}</small>
            </div>
          </div>
          <code v-else class="empty-state">variables: []</code>
        </div>

        <div class="flow-runtime-panel trace-panel">
          <header>
            <span>Trace</span>
            <strong>DecisionTrace</strong>
          </header>
          <button
            v-for="trace in activeTurn.traceItems"
            :key="trace.id"
            type="button"
            class="trace-row"
            @click="selectTurn(activeTurn.id)"
          >
            <span>{{ trace.source }}</span>
            <p>{{ trace.text }}</p>
          </button>
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>
.flow-showcase-page {
  min-height: calc(100svh - 68px);
  padding: 18px max(18px, calc((100% - 1460px) / 2)) 32px;
  color: #101827;
  background:
    linear-gradient(90deg, rgba(20, 184, 166, 0.08), transparent 28%),
    linear-gradient(180deg, #f7f9fc 0%, #eef3f8 100%);
}

.flow-showcase-toolbar {
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
}

.toolbar-title span,
.active-turn-bar span,
.flow-path-panel header span,
.transcript-panel header span,
.json-panel header span,
.flow-runtime-panel header span {
  display: block;
  overflow: hidden;
  color: #0f766e;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.toolbar-title h1 {
  margin: 3px 0 0;
  color: #101827;
  font-size: 24px;
  line-height: 1;
}

.scenario-tabs,
.transport-controls {
  display: flex;
  min-width: 0;
  flex-wrap: wrap;
  gap: 7px;
}

.scenario-tabs button,
.transport-controls button {
  min-height: 38px;
  border: 1px solid rgba(16, 24, 39, 0.12);
  border-radius: 8px;
  color: #101827;
  background: rgba(255, 255, 255, 0.88);
  font-weight: 900;
  transition:
    transform 140ms ease,
    border-color 140ms ease,
    background-color 140ms ease,
    box-shadow 140ms ease;
}

.scenario-tabs button {
  display: grid;
  min-width: 128px;
  padding: 7px 10px;
  text-align: left;
}

.scenario-tabs button strong,
.scenario-tabs button small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.scenario-tabs button strong {
  font-size: 12px;
}

.scenario-tabs button small {
  color: #64748b;
  font-size: 10px;
  font-weight: 800;
}

.scenario-tabs button:hover,
.scenario-tabs button.active,
.transport-controls button:hover:not(:disabled) {
  border-color: rgba(15, 118, 110, 0.45);
  background: #ffffff;
  box-shadow: 0 12px 26px rgba(15, 118, 110, 0.12);
  transform: translateY(-1px);
}

.transport-controls {
  justify-content: flex-end;
}

.transport-controls button {
  padding: 0 13px;
  font-size: 12px;
}

.transport-controls button:disabled {
  cursor: not-allowed;
  opacity: 0.42;
}

.transport-controls .play-control {
  color: #ffffff;
  border-color: #0f766e;
  background: #0f766e;
}

.active-turn-bar {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(260px, 1fr) auto;
  gap: 12px;
  align-items: center;
  min-height: 54px;
  margin: 12px 0;
  padding: 10px 12px;
  border: 1px solid rgba(16, 24, 39, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.82);
}

.active-turn-bar strong {
  display: block;
  margin-top: 2px;
  overflow: hidden;
  color: #101827;
  font-size: 17px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.active-turn-bar code {
  overflow: hidden;
  color: #334155;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.active-turn-bar em {
  justify-self: end;
  padding: 5px 8px;
  border-radius: 999px;
  color: #7c2d12;
  background: #ffedd5;
  font-size: 11px;
  font-style: normal;
  font-weight: 900;
}

.flow-showcase-workspace {
  display: grid;
  grid-template-columns: minmax(220px, 0.72fr) minmax(285px, 0.88fr) minmax(430px, 1.16fr);
  gap: 12px;
  height: clamp(360px, 46svh, 430px);
  min-height: 0;
}

.flow-path-panel,
.transcript-panel,
.json-panel,
.flow-runtime-panel {
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgba(16, 24, 39, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 16px 38px rgba(16, 24, 39, 0.07);
}

.flow-path-panel,
.transcript-panel,
.json-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

.flow-path-panel header,
.transcript-panel header,
.json-panel header,
.flow-runtime-panel header {
  min-width: 0;
  padding: 12px 13px;
  border-bottom: 1px solid rgba(16, 24, 39, 0.1);
}

.flow-path-panel header strong,
.transcript-panel header strong,
.json-panel header strong,
.flow-runtime-panel header strong {
  display: block;
  margin-top: 3px;
  overflow: hidden;
  color: #101827;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.flow-path-panel ol {
  min-height: 0;
  margin: 0;
  overflow: auto;
  padding: 12px;
  list-style: none;
}

.flow-path-panel li {
  position: relative;
  padding: 0 0 10px 0;
}

.flow-path-panel li:not(:last-child)::before {
  position: absolute;
  top: 39px;
  bottom: -2px;
  left: 17px;
  width: 2px;
  border-radius: 999px;
  background: rgba(100, 116, 139, 0.25);
  content: "";
}

.flow-path-panel li.passed:not(:last-child)::before,
.flow-path-panel li.active:not(:last-child)::before {
  background: #0f766e;
}

.flow-path-panel li > button {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  gap: 8px;
  align-items: center;
  width: 100%;
  min-height: 50px;
  padding: 8px;
  border: 1px solid rgba(16, 24, 39, 0.1);
  border-radius: 8px;
  background: #f8fafc;
  text-align: left;
}

.flow-path-panel li.active > button {
  border-color: rgba(15, 118, 110, 0.45);
  background: #ffffff;
  animation: active-step-pulse 1200ms ease-in-out infinite;
}

.flow-path-panel li > button > span {
  display: grid;
  place-items: center;
  width: 29px;
  height: 29px;
  border-radius: 999px;
  color: #64748b;
  background: #e2e8f0;
  font-size: 11px;
  font-weight: 900;
}

.flow-path-panel li.passed > button > span,
.flow-path-panel li.active > button > span {
  color: #ffffff;
  background: #0f766e;
}

.flow-path-panel button strong,
.flow-path-panel button small {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.flow-path-panel button strong {
  color: #101827;
  font-size: 13px;
}

.flow-path-panel button small {
  margin-top: 2px;
  color: #64748b;
  font-size: 10px;
  font-weight: 900;
}

.branch-options {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 7px 0 2px 44px;
}

.branch-options small,
.flow-path-panel li > em {
  border: 1px solid rgba(15, 118, 110, 0.2);
  border-radius: 999px;
  color: #0f766e;
  background: rgba(15, 118, 110, 0.07);
  font-size: 10px;
  font-weight: 900;
}

.branch-options small {
  padding: 3px 7px;
}

.branch-options small.selected {
  color: #ffffff;
  background: #0f766e;
}

.flow-path-panel li > em {
  display: inline-block;
  max-width: calc(100% - 44px);
  margin: 6px 0 0 44px;
  overflow: hidden;
  padding: 4px 7px;
  font-style: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message-list {
  display: flex;
  min-height: 0;
  flex-direction: column;
  gap: 9px;
  overflow: auto;
  padding: 13px;
}

.message-bubble {
  display: grid;
  max-width: 91%;
  padding: 10px 11px;
  border: 1px solid rgba(16, 24, 39, 0.08);
  border-radius: 8px;
  color: #101827;
  background: #ffffff;
  text-align: left;
  animation: message-enter 220ms ease both;
}

.message-bubble.user {
  align-self: end;
  border-color: rgba(37, 99, 235, 0.16);
  background: #eff6ff;
}

.message-bubble.bot {
  align-self: start;
  border-color: rgba(15, 118, 110, 0.16);
  background: #f0fdfa;
}

.message-bubble.runtime {
  align-self: center;
  border-color: rgba(124, 45, 18, 0.16);
  background: #fff7ed;
}

.message-bubble.active {
  box-shadow: 0 0 0 2px rgba(20, 184, 166, 0.24);
}

.message-bubble span,
.message-bubble small {
  color: #475569;
  font-size: 10px;
  font-weight: 900;
}

.message-bubble p {
  margin: 3px 0;
  color: #101827;
  font-size: 13px;
  line-height: 1.35;
}

.json-panel {
  background: #101827;
}

.json-panel header {
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.json-panel header span {
  color: #5eead4;
}

.json-panel header strong {
  color: #f8fafc;
}

.json-code {
  min-height: 0;
  margin: 0;
  overflow: auto;
  padding: 12px 0;
  color: #cbd5e1;
  background: #101827;
  font-size: 12px;
  line-height: 1.5;
}

.json-code code {
  display: grid;
}

.json-line {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr);
  min-width: max-content;
  padding-right: 14px;
  white-space: pre;
}

.json-line b {
  padding-right: 10px;
  color: #64748b;
  font-weight: 800;
  text-align: right;
  user-select: none;
}

.json-line.marked {
  color: #ffffff;
  background: rgba(20, 184, 166, 0.2);
  box-shadow: inset 3px 0 0 #2dd4bf;
  animation: json-mark 900ms ease;
}

.json-line.marked b {
  color: #5eead4;
}

.flow-runtime-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr) minmax(0, 1fr);
  gap: 12px;
  margin-top: 12px;
}

.flow-runtime-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-height: 158px;
}

.event-panel,
.trace-panel,
.flow-variable-list {
  min-height: 0;
  overflow: auto;
}

.event-row,
.trace-row,
.variable-row,
.empty-state {
  margin: 9px 10px 0;
}

.event-row,
.trace-row {
  display: grid;
  width: calc(100% - 20px);
  gap: 2px;
  padding: 8px 9px;
  border: 1px solid rgba(16, 24, 39, 0.1);
  border-radius: 8px;
  background: #ffffff;
  text-align: left;
  animation: event-enter 220ms ease both;
}

.event-row.success {
  border-color: rgba(15, 118, 110, 0.22);
  background: #f0fdfa;
}

.event-row.warning {
  border-color: rgba(202, 138, 4, 0.24);
  background: #fefce8;
}

.event-row span,
.trace-row span,
.variable-row span,
.variable-row small {
  color: #64748b;
  font-size: 10px;
  font-weight: 900;
}

.event-row strong {
  color: #101827;
  font-size: 12px;
}

.event-row p,
.trace-row p,
.empty-state {
  margin: 0;
  color: #334155;
  font-size: 12px;
  line-height: 1.35;
}

.flow-variable-list {
  padding-bottom: 9px;
}

.variable-row {
  display: grid;
  gap: 2px;
  padding: 8px 9px;
  border: 1px solid rgba(16, 24, 39, 0.1);
  border-radius: 8px;
  background: #ffffff;
}

.variable-row.active {
  border-color: rgba(20, 184, 166, 0.42);
  background: #f0fdfa;
  animation: variable-flash 900ms ease;
}

.variable-row strong {
  overflow-wrap: anywhere;
  color: #101827;
  font-size: 12px;
}

.trace-row {
  min-height: 58px;
}

.empty-state {
  color: #64748b;
}

@keyframes active-step-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.24);
  }

  50% {
    box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.18);
  }
}

@keyframes message-enter {
  from {
    opacity: 0;
    transform: translateY(5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes event-enter {
  from {
    opacity: 0;
    transform: translateX(-4px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes json-mark {
  from {
    background: rgba(250, 204, 21, 0.28);
  }

  to {
    background: rgba(20, 184, 166, 0.2);
  }
}

@keyframes variable-flash {
  from {
    background: #fef9c3;
  }

  to {
    background: #f0fdfa;
  }
}

@media (max-width: 1180px) {
  .flow-showcase-toolbar,
  .active-turn-bar,
  .flow-showcase-workspace,
  .flow-runtime-grid {
    grid-template-columns: 1fr;
  }

  .transport-controls {
    justify-content: start;
  }

  .flow-showcase-workspace {
    height: auto;
    min-height: 0;
  }

  .transcript-panel {
    order: -1;
    min-height: 320px;
  }

  .json-panel {
    min-height: 360px;
  }
}

@media (max-width: 760px) {
  .flow-showcase-page {
    padding: 14px 12px 26px;
  }

  .toolbar-title h1 {
    font-size: 22px;
  }

  .scenario-tabs button {
    min-width: 100%;
  }

  .active-turn-bar {
    align-items: start;
  }

  .active-turn-bar code,
  .active-turn-bar strong {
    white-space: normal;
  }

  .active-turn-bar em {
    justify-self: start;
  }

  .json-code {
    font-size: 11px;
  }
}

/* Refined public-site workbench */
.flow-showcase-page {
  min-height: calc(100svh - 68px);
  padding: 24px max(24px, calc((100% - 1220px) / 2)) 34px;
  color: var(--ink, #0f172a);
  background: var(--site-bg, #f6f8fc);
}

.flow-workbench {
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.08);
}

.flow-showcase-toolbar {
  display: grid;
  grid-template-columns: 164px minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  min-height: 78px;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.09);
  background: #ffffff;
}

.toolbar-title span,
.turn-strip span,
.flow-path-panel header span,
.transcript-panel header span,
.json-panel header span,
.flow-runtime-panel header span {
  color: var(--accent, #0f766e);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0;
}

.toolbar-title h1 {
  margin: 2px 0 0;
  color: var(--ink, #0f172a);
  font-size: 24px;
  line-height: 1;
  letter-spacing: 0;
}

.scenario-tabs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.scenario-tabs button,
.transport-controls button {
  min-height: 40px;
  border: 1px solid rgba(15, 23, 42, 0.11);
  border-radius: 10px;
  color: var(--ink, #0f172a);
  background: #ffffff;
  box-shadow: none;
}

.scenario-tabs button {
  padding: 8px 10px;
}

.scenario-tabs button strong {
  color: var(--ink, #0f172a);
  font-size: 12px;
  line-height: 1.15;
}

.scenario-tabs button small {
  color: var(--ink-soft, #64748b);
  font-size: 10px;
  line-height: 1.15;
}

.scenario-tabs button:hover,
.scenario-tabs button.active,
.transport-controls button:hover:not(:disabled) {
  border-color: rgba(15, 118, 110, 0.32);
  background: rgba(15, 118, 110, 0.06);
  box-shadow: none;
  transform: translateY(-1px);
}

.transport-controls {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.transport-controls button {
  min-width: 74px;
  padding: 0 12px;
  font-size: 12px;
}

.transport-controls .play-control {
  color: #ffffff;
  border-color: var(--accent, #0f766e);
  background: var(--accent, #0f766e);
}

.turn-strip {
  display: grid;
  grid-template-columns: 150px 152px minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  min-height: 46px;
  padding: 0 18px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.09);
  background: #f8fafc;
}

.turn-strip strong {
  overflow: hidden;
  color: var(--ink, #0f172a);
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.turn-strip code {
  overflow: hidden;
  color: var(--ink-muted, #475569);
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.turn-strip em {
  justify-self: end;
  color: var(--ink-soft, #64748b);
  font-size: 11px;
  font-style: normal;
  font-weight: 900;
}

.flow-showcase-workspace {
  grid-template-columns: minmax(210px, 0.7fr) minmax(300px, 0.92fr) minmax(440px, 1.18fr);
  gap: 0;
  height: clamp(300px, 38svh, 350px);
  border-bottom: 1px solid rgba(15, 23, 42, 0.09);
}

.flow-path-panel,
.transcript-panel,
.json-panel,
.flow-runtime-panel {
  border: 0;
  border-radius: 0;
  background: #ffffff;
  box-shadow: none;
}

.flow-path-panel,
.transcript-panel {
  border-right: 1px solid rgba(15, 23, 42, 0.09);
}

.flow-path-panel header,
.transcript-panel header,
.json-panel header,
.flow-runtime-panel header {
  min-height: 50px;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(15, 23, 42, 0.09);
  background: #ffffff;
}

.flow-path-panel header strong,
.transcript-panel header strong,
.json-panel header strong,
.flow-runtime-panel header strong {
  margin-top: 1px;
  color: var(--ink, #0f172a);
  font-size: 13px;
  line-height: 1.15;
}

.flow-path-panel ol {
  padding: 12px 14px;
}

.flow-path-panel li {
  padding-bottom: 8px;
}

.flow-path-panel li:not(:last-child)::before {
  top: 34px;
  left: 14px;
  background: rgba(15, 23, 42, 0.12);
}

.flow-path-panel li.passed:not(:last-child)::before,
.flow-path-panel li.active:not(:last-child)::before {
  background: var(--accent, #0f766e);
}

.flow-path-panel li > button {
  grid-template-columns: 30px minmax(0, 1fr);
  min-height: 44px;
  padding: 6px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
}

.flow-path-panel li > button:hover,
.flow-path-panel li.active > button {
  border-color: rgba(15, 118, 110, 0.24);
  background: rgba(15, 118, 110, 0.055);
  animation: none;
}

.flow-path-panel li > button > span {
  width: 28px;
  height: 28px;
  color: var(--ink-soft, #64748b);
  background: #eef2f7;
  font-size: 10px;
}

.flow-path-panel li.passed > button > span,
.flow-path-panel li.active > button > span {
  color: #ffffff;
  background: var(--accent, #0f766e);
}

.flow-path-panel button strong {
  color: var(--ink, #0f172a);
  font-size: 12px;
}

.flow-path-panel button small {
  color: var(--ink-soft, #64748b);
  font-size: 10px;
}

.branch-options {
  gap: 4px;
  margin: 5px 0 0 38px;
}

.branch-options small,
.flow-path-panel li > em {
  border: 1px solid rgba(15, 118, 110, 0.18);
  color: var(--accent, #0f766e);
  background: rgba(15, 118, 110, 0.06);
  font-size: 9px;
}

.branch-options small {
  padding: 2px 6px;
}

.flow-path-panel li > em {
  margin-left: 38px;
  padding: 3px 6px;
}

.message-list {
  gap: 8px;
  padding: 14px;
  background:
    linear-gradient(135deg, rgba(15, 118, 110, 0.045), transparent 42%),
    #ffffff;
}

.message-bubble {
  max-width: 88%;
  padding: 10px 12px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 8px;
  background: #ffffff;
  box-shadow: none;
}

.message-bubble.user {
  border-color: rgba(37, 99, 235, 0.2);
  background: rgba(37, 99, 235, 0.06);
}

.message-bubble.bot {
  border-color: rgba(15, 118, 110, 0.2);
  background: rgba(15, 118, 110, 0.06);
}

.message-bubble.runtime {
  border-color: rgba(217, 119, 6, 0.2);
  background: rgba(217, 119, 6, 0.06);
}

.message-bubble.active {
  box-shadow: 0 0 0 2px rgba(15, 118, 110, 0.12);
}

.message-bubble p {
  color: var(--ink, #0f172a);
  font-size: 13px;
  line-height: 1.4;
}

.message-bubble span,
.message-bubble small {
  color: var(--ink-soft, #64748b);
  font-size: 10px;
}

.chat-next-button {
  justify-self: end;
  min-height: 34px;
  padding: 0 14px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 999px;
  color: #ffffff;
  background: var(--ink, #0f172a);
  font-size: 12px;
  font-weight: 900;
}

.chat-next-button:hover:not(:disabled) {
  background: #1e293b;
  transform: translateY(-1px);
}

.chat-next-button:disabled {
  cursor: not-allowed;
  opacity: 0.38;
}

.json-panel {
  color: var(--ink, #0f172a);
  background: #ffffff;
}

.json-panel header {
  border-bottom-color: rgba(15, 23, 42, 0.09);
  background: #ffffff;
}

.json-panel header span {
  color: var(--accent, #0f766e);
}

.json-panel header strong {
  color: var(--ink, #0f172a);
}

.json-code {
  color: var(--ink, #0f172a);
  background: #f8fafc;
  font-size: 11px;
  line-height: 1.55;
}

.json-line {
  grid-template-columns: 36px minmax(0, 1fr);
  color: #334155;
}

.json-line b {
  color: #94a3b8;
}

.json-line.marked {
  color: #0f172a;
  background: rgba(15, 118, 110, 0.11);
  box-shadow: inset 3px 0 0 var(--accent, #0f766e);
}

.json-line.marked b {
  color: var(--accent, #0f766e);
}

.flow-runtime-grid {
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.86fr) minmax(0, 1fr);
  gap: 0;
  margin-top: 0;
  background: #ffffff;
}

.flow-runtime-panel {
  min-height: 126px;
  max-height: none;
  overflow: visible;
  border-right: 1px solid rgba(15, 23, 42, 0.09);
}

.flow-runtime-panel:last-child {
  border-right: 0;
}

.event-row,
.trace-row,
.variable-row,
.empty-state {
  margin: 6px 10px 0;
}

.event-row,
.trace-row,
.variable-row {
  width: calc(100% - 20px);
  padding: 6px 8px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 8px;
  background: #ffffff;
}

.event-row.success,
.variable-row.active {
  border-color: rgba(15, 118, 110, 0.22);
  background: rgba(15, 118, 110, 0.055);
}

.event-row.warning {
  border-color: rgba(217, 119, 6, 0.22);
  background: rgba(217, 119, 6, 0.055);
}

.event-row span,
.trace-row span,
.variable-row span,
.variable-row small {
  color: var(--ink-soft, #64748b);
  font-size: 9px;
}

.event-row strong,
.variable-row strong {
  color: var(--ink, #0f172a);
  font-size: 11px;
}

.event-row p,
.trace-row p {
  margin: 0;
  color: var(--ink-muted, #475569);
  font-size: 11px;
  line-height: 1.3;
}

.empty-state {
  display: block;
  color: var(--ink-soft, #64748b);
  font-size: 11px;
}

@media (max-width: 1180px) {
  .flow-showcase-page {
    padding: 18px;
  }

  .flow-showcase-toolbar,
  .turn-strip,
  .flow-showcase-workspace,
  .flow-runtime-grid {
    grid-template-columns: 1fr;
  }

  .scenario-tabs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .flow-showcase-workspace {
    height: auto;
  }

  .flow-path-panel,
  .transcript-panel,
  .flow-runtime-panel {
    border-right: 0;
    border-bottom: 1px solid rgba(15, 23, 42, 0.09);
  }

  .transcript-panel {
    min-height: 280px;
    order: -1;
  }

  .json-panel {
    min-height: 340px;
  }
}

@media (max-width: 760px) {
  .flow-showcase-page {
    padding: 12px;
  }

  .flow-showcase-toolbar {
    padding: 14px;
  }

  .scenario-tabs {
    grid-template-columns: 1fr;
  }

  .turn-strip {
    padding: 10px 14px;
  }
}
</style>
