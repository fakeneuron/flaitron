---
title: doc-updates
status: completed
tags: []
created: 2026-06-02
due:
related-tasks: [CORE-EPIC-271, CORE-271.4]
---

# CORE-271.5 | doc-updates

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-271]]

## 🎯 Goal

Update PLATFORMS.md, AGENT-COMPAT.md, and AGENT-NEUTRALITY.md to register the new `SPEC/procedures/` layer and `grok/` + `codex/` dirs; update AGENTS-snippet.md if contract-only agents need a new load directive.

## ✅ Acceptance

- [ ] PLATFORMS.md documents `SPEC/procedures/` as part of the two-layer model and notes that `grok/` + `codex/` now ship pointer wrappers
- [ ] AGENT-COMPAT.md updated with current state of grok and codex (procedures-based triggering)
- [ ] AGENT-NEUTRALITY.md ledger updated to reflect any new intentional Claude-specific surfaces (or confirms none added)
- [ ] AGENTS-snippet.md reviewed — updated if contract-only agents need a load directive for `SPEC/procedures/`; marked "no change" if not

## 🧩 Subtasks

- [ ] Read all four target docs to understand current state
- [ ] Read prior CORE-271 tasknotes + SPEC/procedures/README.md for context on what was built
- [ ] Update PLATFORMS.md to register `SPEC/procedures/` layer and `grok/`/`codex/` wrappers
- [ ] Update AGENT-COMPAT.md with grok/codex rows or last-verified currency
- [ ] Review AGENT-NEUTRALITY.md; update ledger if new Claude-specific surfaces were added
- [ ] Review AGENTS-snippet.md; update load directive if contract-only agents need it
- [ ] Doc-drift sweep + closure

## 🔗 Related

- [[CORE-EPIC-271]] — parent epic: cross-agent-skill-projection
- [[CORE-271.4]] — per-agent-wrappers (immediately preceding child; the wrappers this task documents)
- [[CORE-271.6]] — audit (next child, consuming these doc updates)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-271.4 created `grok/procedures/ft-task.md` and `codex/procedures/ft-task.md`. Three of the four target docs are stale (PLATFORMS.md, AGENT-COMPAT.md, AGENTS-snippet.md); AGENT-NEUTRALITY.md has one new intentional Claude-specific surface to document.

- [x] Read relevant source files — `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`, `docs/AGENT-NEUTRALITY.md`, `claude/AGENTS-snippet.md`, `SPEC/procedures/README.md`, `grok/procedures/ft-task.md`, `codex/procedures/ft-task.md`; CORE-271.1–271.4 archive for scope context.

- [x] **Archive skim** — CORE-271.4: explicitly deferred PLATFORMS.md + AGENT-COMPAT.md doc updates to .5; confirmed both pointer stubs created. CORE-271.1 Discovery notes: flagged AGENTS-snippet.md as "update only if contract-only agents need a new load directive" — judgment: yes, pointer wrappers are undiscoverable without a mention in the paste block.

- [x] **Drift check** — `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`, `docs/AGENT-NEUTRALITY.md`, `claude/AGENTS-snippet.md`: all four exist ✓; `grok/procedures/ft-task.md`, `codex/procedures/ft-task.md`: both exist ✓; `SPEC/procedures/README.md` + `SPEC/procedures/ft-task.md`: both present ✓. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions: (1) grok/codex consume-mode stays "Contract only" — pointer wrappers ≠ full wiring bundle; (2) AGENT-NEUTRALITY.md gets one new row for `SPEC.md §"Procedure SOPs"` SKILL dispatch contrast reference; (3) AGENTS-snippet.md paste block gets one conditional note for contract-only agents about procedure wrappers; (4) No SPEC.md changes — it already mentions `SPEC/procedures/` from CORE-271.2.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Scope boundary from CORE-271.4: doc updates deferred here. Pointer wrapper shape: one-line routing instruction + relative link to `../../SPEC/procedures/ft-task.md`. For adopters, path is `.flowtron/core/<platform>/procedures/ft-task.md`. SPEC.md §"Procedure SOPs" section (added CORE-271.2) mentions `/ft-task` SKILL dispatch as a contrast reference — new intentional Claude-specific surface worth adding to AGENT-NEUTRALITY.md ledger.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — all four docs follow existing pattern: factual additions to tables and prose sections. No new structural shapes introduced; extended existing table rows and prose paragraphs.

- [x] Implemented the minimal solution — PLATFORMS.md: (1) Contract layer "Where it lives" cell now includes `SPEC/procedures/`; (2) "Today's surface" "What ships" cell notes pointer wrappers for grok/codex; (3) Grok Build quirks table gets a "Procedure pointer" row; (4) Codex CLI section notes `codex/procedures/ft-task.md`. AGENT-COMPAT.md: Grok Build and Codex CLI "Skill / command primitive" cells updated with pointer wrapper info. AGENT-NEUTRALITY.md: one new row for `SPEC.md §"Procedure SOPs"` SKILL dispatch contrast reference. AGENTS-snippet.md: paste block `/ft-task` bullet gets a contract-only fallback note.

- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only changes)

**Implementation Notes:**

4 files touched, all markdown. Each change is additive/factual with no structural surgery. AGENT-NEUTRALITY.md row inserted in table before `SPEC/epic.md` row (keeps SPEC.md entries grouped).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only)

- [x] Ran lint/type-check on changed code — N/A (markdown only)

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend changes)

**Testing Notes:**

All changes are markdown prose/table edits. No viz code touched; no npm commands applicable.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · SPEC.md: no change · MIGRATION.md: no change · AGENTS-snippet.md: updated (contract-only fallback note) · CONVENTIONS.md: no change · CONTRIBUTING.md: no change · SECURITY.md: no change · AGENT-NEUTRALITY.md: updated (new SKILL dispatch row) · PLATFORMS.md: updated (SPEC/procedures/ in contract layer; pointer wrapper entries) · CAPABILITIES.md: no change · AGENT-COMPAT.md: updated (pointer wrapper info in Grok/Codex cells)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-02.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted

**Final Summary:**

Updated four docs to register the `SPEC/procedures/` layer and `grok/`/`codex/` pointer wrappers shipped in CORE-271.4. PLATFORMS.md: contract layer now cites `SPEC/procedures/`, "Today's surface" table notes pointer wrappers for grok/codex, Grok Build quirks table gets a "Procedure pointer" row, Codex CLI section notes its wrapper. AGENT-COMPAT.md: Grok Build and Codex CLI primitive cells updated. AGENT-NEUTRALITY.md: one new row for the SPEC.md §"Procedure SOPs" SKILL dispatch contrast reference. AGENTS-snippet.md: paste block `/ft-task` bullet gets a one-line contract-only agent fallback note.

**Archived:** 2026-06-02
