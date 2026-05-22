# Web Chatbot Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone local web chatbot example that validates Nexembot through the public TypeScript API.

**Architecture:** Create `examples/web-chatbot` as a Vite TypeScript app with its own package metadata, flow helpers, UI, styles, tests, and documentation. Root scripts delegate to the example without moving UI code into `src`.

**Tech Stack:** TypeScript, Vite, Vitest, plain DOM APIs, Nexembot public exports.

---

## File Structure

- Create `examples/web-chatbot/package.json` for local demo scripts and dev dependencies.
- Create `examples/web-chatbot/tsconfig.json` and `examples/web-chatbot/vite.config.ts` for browser compilation.
- Create `examples/web-chatbot/index.html`, `src/main.ts`, `src/demo-flow.ts`, `src/styles.css`, and `src/demo-flow.test.ts`.
- Modify root `package.json` with `demo:web`, `demo:web:build`, and `demo:web:test` scripts.
- Create `docs/web-chatbot-demo.md` with usage and scenario guide.

## Task 1: Flow Helper Contract

- [ ] Write failing tests in `examples/web-chatbot/src/demo-flow.test.ts` for start, billing, support retry, optional attachment, generated response, and handoff.
- [ ] Implement `examples/web-chatbot/src/demo-flow.ts` using only `../../src/index` public exports.
- [ ] Run `npm --prefix examples/web-chatbot test -- --run` and confirm the tests pass.

## Task 2: Web App Shell

- [ ] Create the Vite TypeScript app files under `examples/web-chatbot`.
- [ ] Render conversation messages, menu choices, composer, attachment simulation, and debug inspector from engine results.
- [ ] Run `npm --prefix examples/web-chatbot run build` and fix browser build issues.

## Task 3: Root Scripts And Documentation

- [ ] Add root scripts for running, building, and testing the demo.
- [ ] Write `docs/web-chatbot-demo.md` with install, run, flow scenarios, and architecture notes.
- [ ] Run root and demo verification commands.
- [ ] Commit the complete demo implementation.
