# API Integration Helpers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a minimal event subscription API and framework-agnostic endpoint helpers for Nexembot consumers.

**Architecture:** Keep the core runtime dependency-free. `ConversationEngine` exposes `subscribeToEvents`, and a new `api-adapter` module wraps engine calls into endpoint-friendly request methods and response DTOs.

**Tech Stack:** TypeScript strict mode, Vitest, existing Nexembot runtime.

---

## Task 1: Event Subscription

**Files:**
- Modify: `src/types.ts`
- Modify: `src/runtime.ts`
- Test: `test/api-adapter.test.ts`

- [ ] Write failing tests for subscribing, receiving committed events, and unsubscribing.
- [ ] Add public event subscription types.
- [ ] Publish turn events to subscribers after repository commit.
- [ ] Verify targeted tests pass.

## Task 2: API Adapter

**Files:**
- Create: `src/api-adapter.ts`
- Modify: `src/index.ts`
- Modify: `src/types.ts`
- Test: `test/api-adapter.test.ts`

- [ ] Write failing tests for start, text input, option selection, attachments, external events, and HTTP-shaped response conversion.
- [ ] Implement framework-agnostic request builders.
- [ ] Implement stable response DTO conversion.
- [ ] Export `createConversationApi`.

## Task 3: Docs And Verification

**Files:**
- Create: `docs/api-integration.md`

- [ ] Document event subscription and endpoint helper usage.
- [ ] Run build, strict typecheck, tests, and diff checks.
- [ ] Commit implementation.
