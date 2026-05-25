# Dialit Engine Design

## Goal

Implement a TypeScript conversational flow engine for the v0.1 architecture in `dialit.md`. The engine executes published flow versions from structured definitions and returns messages, state, events, and decision traces for every turn.

## Source Of Truth

`dialit.md` is authoritative. The existing `types.ts` contracts are useful starting points, but the implementation must extend them when they do not cover v0.1 requirements such as variable scopes, variable history, invalidation, flow calls, handoff, and custom operations.

All implementation code, public API names, tests, and examples must be in English.

## Architecture

The package is a plain TypeScript library with no runtime framework dependency.

Public consumers use a `ConversationEngine` facade. Internally, a `TurnProcessor` loads a flow version and conversation state, delegates step behavior to registered `StepHandler`s, executes branch operations through registered `OperationHandler`s, reduces state changes through a `StateReducer`, persists append-only events and traces, and returns a complete `ProcessTurnResult`.

The runtime does not let low-level handlers mutate state directly. Step and operation handlers return messages, events, variable patches, branch targets, and trace fragments. The reducer applies those changes after asynchronous handlers complete.

## Core Modules

- `types`: public contracts for flow definitions, runtime state, repositories, handlers, input, actions, LLM contracts, events, and traces.
- `engine`: `DefaultConversationEngine`, `DefaultTurnProcessor`, branch execution, automatic step advancement, and transition resolution.
- `state`: scoped variable store, variable history, expression resolution, and state reducer.
- `steps`: built-in handlers for message, menu, input, attachment, condition, and end steps.
- `operations`: built-in handlers for send message, set/unset/invalidate variable, run action, call flow, handoff, emit event, and custom operation.
- `input`: deterministic menu/input/attachment resolution, validators, and controlled semantic input classification.
- `responses`: static, template, reference, and generated response rendering.
- `persistence`: in-memory repositories behind replaceable persistence interfaces.
- `testing`: reference flow builders and scenarios proving the v0.1 contract.

## Runtime Rules

- Actions are reusable operations, executed only through `RunActionOperation`.
- `ConditionStep` is the only official mechanism for conditional routing.
- LLM input interpretation can only produce declared outcomes and allowed variables.
- LLM response generation can only use explicitly allowed variables and cannot mutate state or choose routes.
- Asynchronous operations are awaited before state is reduced and persisted.
- Every state change must be represented by events and trace data.
- Flow calls share `conversation` scoped variables by default and isolate `flow` scoped variables by execution frame.
- Variable history is internal to state and records previous value, next value, source, step, turn, and operation metadata.

## Public API

The package exports:

- v0.1 domain and runtime types from `src/types.ts`.
- `createConversationEngine` for a ready-to-use engine with built-in handlers and in-memory repositories.
- registries and interfaces for custom steps, operations, actions, validators, semantic resolvers, LLM response generators, and persistence implementations.

## Verification Scenarios

The test suite must include runnable scenarios for:

- message steps with multiple messages and automatic advancement.
- menu branches by number, exact text, alias, and option id.
- input validation, retry, invalid messages, and successful capture.
- attachment validation and variable storage.
- `ConditionStep` routing with trace of evaluated conditions.
- action success and failure branches through `RunActionOperation`.
- variable reads, writes, invalidation, scopes, and history.
- custom operations with explicit contracts and result routing.
- flow-to-flow calls sharing scoped variables correctly.
- semantic billing classification through a constrained input resolver.
- generated responses through a constrained response generator.
- advanced handoff ending in `handoff` status with trace and variables.

## Non-Goals

- No external database adapter beyond in-memory repositories.
- No vendor-specific LLM implementation.
- No background workflow engine.
- No UI, CLI, or server.

## Definition Of Done

- The package builds with TypeScript strict mode.
- The public API is modular and understandable for code agents.
- The reference scenarios pass in a fresh test run.
- Commits separate baseline, design, plan, scaffold, implementation, and verification-relevant fixes.
