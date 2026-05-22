# Nexembot Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the v0.1 TypeScript conversational flow engine described by `nexembot.md`.

**Architecture:** A plain TypeScript library with a small public facade, immutable turn processing, registries for extensibility, in-memory persistence, scoped variables with history, built-in step handlers, built-in operation handlers, and trace-first results. Handlers return patches and events; the reducer commits state only after async work completes.

**Tech Stack:** TypeScript strict mode, Node.js ESM, Vitest, npm scripts, in-memory repositories.

---

## File Structure

- Create `package.json`, `tsconfig.json`, and `vitest.config.ts` for build and test commands.
- Create `src/types.ts` as the authoritative public contract, extending root `types.ts` with the v0.1 gaps.
- Create `src/index.ts` to export the public API.
- Create `src/runtime.ts` for engine composition, registries, factories, repositories, reducer, tracing, rendering, input, operations, step handlers, and engine facade.
- Create `test/reference-scenarios.test.ts` for end-to-end scenarios that exercise the requested contract.
- Keep root `types.ts` as the source artifact from the original design notes.

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `src/index.ts`

- [ ] **Step 1: Add package scripts**

Create npm scripts:

```json
{
  "type": "module",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "vitest run"
  }
}
```

- [ ] **Step 2: Install dev dependencies**

Run: `npm install`

Expected: npm installs TypeScript and Vitest from `package.json`.

- [ ] **Step 3: Run baseline build**

Run: `npm run build`

Expected: FAIL before source files exist or PASS after empty source export. Record the actual evidence before moving on.

- [ ] **Step 4: Commit scaffold**

Run:

```bash
git add package.json package-lock.json tsconfig.json vitest.config.ts src/index.ts
git commit -m "chore: add typescript project scaffold"
```

## Task 2: Public Types

**Files:**
- Create: `src/types.ts`
- Modify: `src/index.ts`
- Test: `test/reference-scenarios.test.ts`

- [ ] **Step 1: Write compile-facing usage test**

Add imports in the scenario test for flow versions, steps, operations, and engine factory. The test should fail until the public API exists.

- [ ] **Step 2: Define public contracts**

Implement `src/types.ts` with:

- IDs, JSON, metadata, statuses.
- flow/version/step/branch/operation definitions.
- scoped variable definitions, values, patches, invalidation, and history.
- user input, outbound messages, events, traces.
- handler, registry, repository, action, semantic resolver, LLM generator, and engine interfaces.

- [ ] **Step 3: Export types and factory placeholders**

Export all types and `createConversationEngine` from `src/index.ts`.

- [ ] **Step 4: Build**

Run: `npm run build`

Expected: PASS with type declarations emitted.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/types.ts src/index.ts test/reference-scenarios.test.ts
git commit -m "feat: define v0.1 public contracts"
```

## Task 3: Runtime Core And Built-Ins

**Files:**
- Create: `src/runtime.ts`
- Modify: `src/index.ts`
- Test: `test/reference-scenarios.test.ts`

- [ ] **Step 1: Write failing scenario tests**

Add tests for:

- message auto-advance to menu.
- menu branch selection.
- input validation retry.
- condition routing.
- action success and failure routing.
- onEnter and onExit operations.
- operation-result branch chaining.
- append-only event and trace persistence.
- explicit errors for missing step handlers, operation handlers, action handlers, responses, actions, variables, flow versions, and invalid targets.

Run: `npm test`

Expected: FAIL because runtime behavior is not implemented.

- [ ] **Step 2: Implement minimal runtime core**

Implement:

- in-memory repositories.
- deterministic id/clock helpers.
- registries.
- response renderer.
- variable resolver and reducer.
- transition resolver.
- branch executor.
- turn processor.
- conversation engine facade.

- [ ] **Step 3: Implement built-in steps and operations**

Implement:

- message, menu, input, condition, end handlers.
- send message, set/unset/invalidate variable, run action, emit event handlers.

- [ ] **Step 4: Verify**

Run:

```bash
npm test
npm run build
```

Expected: both PASS.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/runtime.ts src/index.ts test/reference-scenarios.test.ts
git commit -m "feat: implement core conversational runtime"
```

## Task 4: Advanced v0.1 Capabilities

**Files:**
- Modify: `src/types.ts`
- Modify: `src/runtime.ts`
- Test: `test/reference-scenarios.test.ts`

- [ ] **Step 1: Write failing advanced tests**

Add tests for:

- attachment handling.
- variable scopes and history.
- custom operation contracts.
- flow-to-flow calls sharing conversation variables.
- semantic billing classification.
- generated responses.
- handoff ending in handoff status.
- custom step registration.
- async commit semantics proving state is not reduced until async work resolves.
- LLM contract failures for undeclared outcomes, undeclared variables, missing semantic resolver, and missing response generator.
- routing purity validation that rejects conditional expressions outside `ConditionStep`.

Run: `npm test`

Expected: FAIL until advanced handlers are implemented.

- [ ] **Step 2: Implement advanced operations and handlers**

Implement:

- attachment step handler.
- call flow operation.
- handoff operation.
- custom operation execution through registry.
- semantic input resolver integration.
- generated response renderer integration.
- variable scope and history trace details.

- [ ] **Step 3: Verify**

Run:

```bash
npm test
npm run build
```

Expected: both PASS.

- [ ] **Step 4: Commit**

Run:

```bash
git add src/types.ts src/runtime.ts test/reference-scenarios.test.ts
git commit -m "feat: add advanced v0.1 flow capabilities"
```

## Task 5: Final Verification

**Files:**
- Modify only if verification exposes a concrete defect.

- [ ] **Step 1: Run full verification**

Before running commands, inspect the scenario tests against the design and confirm they cover:

- no silent fallbacks.
- model validation errors.
- response references.
- onEnter and onExit operations.
- operation branch chaining.
- async commit semantics.
- append-only persistence.
- custom step and custom operation extension points.
- scoped variable sharing and isolation.
- trace assertions for variables, operations, actions, conditions, flow calls, LLM usage, messages, and handoff.

Run:

```bash
npm test
npm run build
git status --short
```

Expected:

- All scenario tests pass.
- TypeScript build exits 0.
- Git status only shows intentional uncommitted files or is clean.

- [ ] **Step 2: Commit verification fixes if needed**

If a defect is fixed, commit with a narrow message describing the verified behavior.

- [ ] **Step 3: Report evidence**

Final response must include the verification commands and outcomes.
