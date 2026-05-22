import type {
    ConditionExpression,
    ConversationFlowDefinition,
    FlowValidationReport,
    ResponsePlan,
    StepBranch,
    StepDefinition,
    StepOperation,
    StepRoute,
    StepTarget,
    ValidationIssue,
    ValueExpression,
} from "./types.js";

export function validateFlowDefinition(flow: ConversationFlowDefinition): FlowValidationReport {
    const issues: ValidationIssue[] = [];
    const stepIds = new Set(flow.steps.map((step) => step.stepId));
    const variableIds = new Set(flow.variables.map((variable) => variable.variableId));
    const actionIds = new Set((flow.actions ?? []).map((action) => action.actionId));
    const responseIds = new Set((flow.responses ?? []).map((response) => response.responseId));

    const addIssue = (code: string, message: string, entityId?: string, metadata?: Record<string, unknown>) => {
        issues.push({
            severity: "error",
            code,
            message,
            ...(entityId === undefined ? {} : { entityId }),
            ...(metadata === undefined ? {} : { metadata }),
        });
    };

    const checkTarget = (target: StepTarget | undefined, entityId: string) => {
        if (target?.type === "step" && !stepIds.has(target.stepId)) {
            addIssue("INVALID_TARGET", `Target step '${target.stepId}' was not found.`, entityId, { stepId: target.stepId });
        }
    };

    const checkVariable = (variableId: string | undefined, entityId: string) => {
        if (variableId !== undefined && !variableIds.has(variableId)) {
            addIssue("VARIABLE_NOT_FOUND", `Variable '${variableId}' was not found.`, entityId, { variableId });
        }
    };

    const checkValueExpression = (expression: ValueExpression | undefined, entityId: string) => {
        if (expression === undefined) {
            return;
        }

        if (expression.type === "variable") {
            checkVariable(expression.variableId, entityId);
            return;
        }

        if (expression.type === "template") {
            for (const variableId of expression.variableIds ?? []) {
                checkVariable(variableId, entityId);
            }
        }
    };

    const checkResponsePlan = (plan: ResponsePlan | undefined, entityId: string) => {
        if (plan === undefined) {
            return;
        }

        if (plan.mode === "reference" && !responseIds.has(plan.responseId)) {
            addIssue("RESPONSE_NOT_FOUND", `Response '${plan.responseId}' was not found.`, entityId, { responseId: plan.responseId });
            return;
        }

        if (plan.mode === "template") {
            for (const variableId of plan.variableIds ?? []) {
                checkVariable(variableId, entityId);
            }
            return;
        }

        if (plan.mode === "generated") {
            if (typeof plan.fallbackText !== "string" || plan.fallbackText.length === 0) {
                addIssue("GENERATED_RESPONSE_REQUIRES_FALLBACK", "Generated response plans require fallbackText.", entityId);
            }

            for (const variableId of plan.allowedVariableIds ?? []) {
                checkVariable(variableId, entityId);
            }
        }
    };

    const checkCondition = (condition: ConditionExpression | undefined, entityId: string) => {
        if (condition === undefined) {
            return;
        }

        switch (condition.type) {
            case "equals":
            case "not_equals":
            case "greater_than":
            case "less_than":
                checkValueExpression(condition.left, entityId);
                checkValueExpression(condition.right, entityId);
                return;
            case "exists":
            case "not_exists":
                checkVariable(condition.variableId, entityId);
                return;
            case "includes":
                checkValueExpression(condition.collection, entityId);
                checkValueExpression(condition.value, entityId);
                return;
            case "matches_regex":
                checkValueExpression(condition.value, entityId);
                try {
                    new RegExp(condition.pattern, condition.flags);
                } catch {
                    addIssue("INVALID_CONDITION_EXPRESSION", "Condition regex pattern is invalid.", entityId);
                }
                return;
            case "and":
            case "or":
                if (!Array.isArray(condition.conditions)) {
                    addIssue("INVALID_CONDITION_EXPRESSION", "Compound condition requires conditions.", entityId);
                    return;
                }
                for (const childCondition of condition.conditions) {
                    checkCondition(childCondition, entityId);
                }
                return;
            case "not":
                checkCondition(condition.condition, entityId);
                return;
            default:
                addIssue("INVALID_CONDITION_EXPRESSION", "Condition expression type is invalid.", entityId, {
                    type: (condition as { type?: unknown }).type,
                });
        }
    };

    const checkBranch = (branch: StepBranch | undefined, entityId: string) => {
        if (branch === undefined) {
            return;
        }

        for (const operation of branch.operations ?? []) {
            checkOperation(operation, entityId);
        }

        checkTarget(branch.target, entityId);
    };

    const checkRoute = (route: StepRoute, entityId: string) => {
        if ("condition" in route) {
            addIssue("CONDITION_OUTSIDE_CONDITION_STEP", "Route conditions are not allowed in v0.1.", route.routeId);
        }

        checkBranch(route.branch, entityId);
    };

    const checkOperation = (operation: StepOperation, entityId: string) => {
        switch (operation.type) {
            case "send_message":
                checkResponsePlan(operation.message, entityId);
                return;
            case "set_variable":
                checkVariable(operation.variableId, entityId);
                checkValueExpression(operation.value, entityId);
                return;
            case "unset_variable":
            case "invalidate_variable":
                checkVariable(operation.variableId, entityId);
                return;
            case "run_action":
                if (!actionIds.has(operation.actionId)) {
                    addIssue("ACTION_NOT_FOUND", `Action '${operation.actionId}' was not found.`, entityId, { actionId: operation.actionId });
                }
                for (const expression of Object.values(operation.inputMapping ?? {})) {
                    checkValueExpression(expression, entityId);
                }
                for (const variableId of Object.values(operation.outputMapping ?? {})) {
                    checkVariable(variableId, entityId);
                }
                checkVariable(operation.resultVariableId, entityId);
                for (const resultBranch of operation.onResult ?? []) {
                    checkBranch(resultBranch.branch, entityId);
                }
                return;
            case "call_flow":
                for (const [variableId, expression] of Object.entries(operation.inputMapping ?? {})) {
                    checkVariable(variableId, entityId);
                    checkValueExpression(expression, entityId);
                }
                for (const [sourceVariableId, targetVariableId] of Object.entries(operation.outputMapping ?? {})) {
                    checkVariable(sourceVariableId, entityId);
                    checkVariable(targetVariableId, entityId);
                }
                for (const variableId of operation.variableSharing?.includeVariableIds ?? []) {
                    checkVariable(variableId, entityId);
                }
                for (const variableId of operation.variableSharing?.excludeVariableIds ?? []) {
                    checkVariable(variableId, entityId);
                }
                checkVariable(operation.resultVariableId, entityId);
                for (const resultBranch of operation.onResult ?? []) {
                    checkBranch(resultBranch.branch, entityId);
                }
                return;
            case "emit_event":
                for (const expression of Object.values(operation.payload ?? {})) {
                    checkValueExpression(expression, entityId);
                }
                return;
            case "handoff":
                checkValueExpression(operation.reason, entityId);
                for (const expression of Object.values(operation.metadataMapping ?? {})) {
                    checkValueExpression(expression, entityId);
                }
                checkVariable(operation.handoffIdVariableId, entityId);
                checkResponsePlan(operation.message, entityId);
                for (const resultBranch of operation.onResult ?? []) {
                    checkBranch(resultBranch.branch, entityId);
                }
                return;
            case "custom":
                for (const expression of Object.values(operation.inputMapping ?? {})) {
                    checkValueExpression(expression, entityId);
                }
                checkVariable(operation.resultVariableId, entityId);
                for (const resultBranch of operation.onResult ?? []) {
                    checkBranch(resultBranch.branch, entityId);
                }
        }
    };

    const checkStep = (step: StepDefinition) => {
        const entityId = step.stepId;

        for (const operation of step.onEnter ?? []) {
            checkOperation(operation, entityId);
        }

        for (const operation of step.onExit ?? []) {
            checkOperation(operation, entityId);
        }

        for (const route of step.routes ?? []) {
            checkRoute(route, entityId);
        }

        switch (step.type) {
            case "message":
                for (const message of step.config.messages) {
                    checkResponsePlan(message, entityId);
                }
                return;
            case "menu":
                checkResponsePlan(step.config.prompt, entityId);
                checkResponsePlan(step.config.invalidSelection?.message, entityId);
                checkTarget(step.config.invalidSelection?.target, entityId);
                checkResponsePlan(step.config.unknownSelection?.message, entityId);
                checkTarget(step.config.unknownSelection?.target, entityId);
                for (const option of step.config.options) {
                    checkBranch(option.branch, entityId);
                }
                return;
            case "input":
                checkResponsePlan(step.config.prompt, entityId);
                for (const binding of step.config.input.bindings ?? []) {
                    checkVariable(binding.targetVariableId, entityId);
                    for (const validator of binding.validators ?? []) {
                        checkResponsePlan(validator.message, entityId);
                    }
                }
                for (const semanticTask of step.config.input.semanticTasks ?? []) {
                    if (!Array.isArray(semanticTask.allowedOutcomes) || semanticTask.allowedOutcomes.length === 0) {
                        addIssue("SEMANTIC_TASK_REQUIRES_ALLOWED_OUTCOMES", "Semantic input tasks require allowedOutcomes.", entityId);
                    }
                    checkVariable(semanticTask.saveOutcomeToVariableId, entityId);
                    for (const variableId of semanticTask.allowedVariableIds ?? []) {
                        checkVariable(variableId, entityId);
                    }
                }
                checkResponsePlan(step.config.input.invalidBehavior?.message, entityId);
                checkTarget(step.config.input.invalidBehavior?.target, entityId);
                checkResponsePlan(step.config.input.unknownBehavior?.message, entityId);
                checkTarget(step.config.input.unknownBehavior?.target, entityId);
                return;
            case "attachment":
                checkResponsePlan(step.config.prompt, entityId);
                checkVariable(step.config.targetVariableId, entityId);
                for (const validator of step.config.rules.validators ?? []) {
                    checkResponsePlan(validator.message, entityId);
                }
                checkResponsePlan(step.config.invalidAttachment?.message, entityId);
                checkTarget(step.config.invalidAttachment?.target, entityId);
                return;
            case "condition":
                for (const branch of step.config.branches) {
                    checkCondition(branch.when, entityId);
                    checkBranch(branch.branch, entityId);
                }
                checkBranch(step.config.defaultBranch, entityId);
                return;
            case "end":
                checkResponsePlan(step.config.finalMessage, entityId);
        }
    };

    if (!stepIds.has(flow.startStepId)) {
        addIssue("INVALID_TARGET", `Start step '${flow.startStepId}' was not found.`, flow.flowId, { stepId: flow.startStepId });
    }

    checkTarget(flow.settings?.errorStepId === undefined ? undefined : { type: "step", stepId: flow.settings.errorStepId }, flow.flowId);

    for (const response of flow.responses ?? []) {
        checkResponsePlan(response.plan, response.responseId);
    }

    for (const step of flow.steps) {
        checkStep(step);
    }

    return {
        valid: issues.length === 0,
        issues,
    };
}
