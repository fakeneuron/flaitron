---
title: viz-link-allowlist
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: []
---

# CORE-232 | viz-link-allowlist

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add a URL-protocol allowlist to the `WikilinkMarkdown` non-wikilink anchor renderer so it passes through only `http`/`https` links and returns `null` for dangerous protocols (`data:`, `blob:`, `javascript:`).

## ✅ Acceptance

- [ ] Non-wikilink anchors with `http://` or `https://` render as normal links
- [ ] Non-wikilink anchors with `data:`, `blob:`, or `javascript:` protocol return `null` (React-Markdown suppresses the element)
- [ ] Existing wikilink rendering is unaffected
- [ ] Unit tests cover: http pass, https pass, data: block, blob: block, javascript: block, wikilink untouched

## 🧩 Subtasks

- [x] Implement allowlist guard in `WikilinkMarkdown.tsx` non-wikilink `else` branch
- [x] Create `viz/src/ui/WikilinkMarkdown.test.tsx` with: http pass, https pass, data: block, blob: block, javascript: block, wikilink untouched
- [ ] Run `npm --prefix viz run test -- WikilinkMarkdown` and `npm --prefix viz run lint`

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Non-wikilink `else` branch at `WikilinkMarkdown.tsx:46-49` passes any href through, including dangerous protocols. Minimal, targeted fix — no scope expansion needed.

- [x] Read relevant source files

- [x] **Archive skim** — CORE-223.3 referenced `WikilinkMarkdown` (lazy-module split context); no prior decisions on the anchor handler itself. CORE-231 (viz-csp) unrelated to anchor protocol. No conflicting prior work.

- [x] **Drift check** — `WikilinkMarkdown.tsx` current as read; non-wikilink `else` branch at lines 46-49 matches description exactly. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: allowlist = `http://`/`https://` prefix only; any other href (including undefined, relative, data:, blob:, javascript:) → return `null`. Wikilink branch is unaffected (short-circuits before the allowlist check). New test file: `viz/src/ui/WikilinkMarkdown.test.tsx`.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** Target: `viz/src/ui/WikilinkMarkdown.tsx:46-49` else branch. Change: add `isAllowed` check; return `null` for non-http(s) hrefs. No existing WikilinkMarkdown unit test file — creating new one.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — existing `if`/`else` in the `a` handler already branches on wikilink prefix; adding `isAllowed` check before the `return <a>` extends the same local pattern cleanly.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** Added 3-line `isAllowed` guard before the `return <a>` in `WikilinkMarkdown.tsx:46-52`. Created `WikilinkMarkdown.test.tsx` (7 tests: http pass, https pass, data:/blob:/javascript: block, wikilink button render, wikilink navigateToTask callback).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:** 7 new WikilinkMarkdown tests pass; 28 existing App tests pass (including wikilink navigation). Lint clean.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 11 AI-referenced docs: no change (task only touched viz/src/ui/* files)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-30.` and tasknote moved to `_project/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:** Added `http`/`https` allowlist guard to `WikilinkMarkdown` non-wikilink anchor renderer; `data:`, `blob:`, `javascript:` hrefs now return `null`. Created `WikilinkMarkdown.test.tsx` (7 tests). All 35 tests pass, lint clean.

**Archived:** 2026-05-30
