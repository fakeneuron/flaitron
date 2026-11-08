---
title: cursor-grok-wiring-wording
status: completed
tags: []
created: 2026-11-08
due:
related-tasks: [CORE-878]
touches:
  - docs/PLATFORMS.md
  - grok/AGENTS-snippet.md
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-889 | cursor-grok-wiring-wording

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-878]]

## 🎯 Goal

Make the Cursor Skill invocation row in `docs/PLATFORMS.md` and the Grok snippet's wiring section say what a session in a Codex-wired repo actually runs (the `codex/skills/` wrappers via `.agents/skills/`), not the canonical `claude/skills/` bodies.

## ✅ Acceptance

- [x] The PLATFORMS Cursor Skill invocation row names the `codex/skills/` wrappers for the `.agents/skills/` case — `grep 'Cursor auto-exposes skills as slash commands' docs/PLATFORMS.md | grep -q 'codex/skills/'`
- [x] The Cursor row no longer claims the canonical bodies unconditionally — `! grep -q 'from the same canonical `claude/skills/` bodies Claude Code uses — no Cursor-specific' docs/PLATFORMS.md`
- [x] The Grok snippet's "One-time symlink wiring" section says a Codex-wired repo serves the `codex/skills/` wrappers — `sed -n '/^## One-time symlink wiring/,/^\*\*Derived surface/p' grok/AGENTS-snippet.md | grep -q 'codex/skills/'`
- [x] Repo drift checks (incl. context budgets) stay green — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Reword the PLATFORMS Cursor Skill invocation row to mirror the Grok row's conditional wording
- [x] Add the wrapper clause to the Grok snippet's "already wired" paragraph
- [x] Run the verify commands

## 🔗 Related

- [[CORE-878]] — reworded the Grok rows in PLATFORMS and AGENT-COMPAT; its external review surfaced this residue

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both cited sites still make the unconditional canonical-bodies claim (verified below); docs-only, no contract change.

- [x] Read relevant source files — `docs/PLATFORMS.md` :37/:38/:76/:77/:298/:554/:610, `grok/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md` :1-45, `codex/AGENTS-snippet.md` link block, `docs/AGENT-COMPAT.md` :37-39 and "Reading the cells".

- [x] **Best Practices Review** — N/A: markdown only, no code or module boundary in scope.

- [x] **Archive skim** — `<area>` is `core` per the README table. [[CORE-878]] is the source: its Discovery confirmed `.agents/skills/<n>` links to `codex/skills/<n>` (`codex/AGENTS-snippet.md`, `install.sh`), and its external review filed this task for the two sites it left out of `touches:`. No archived decision says otherwise.

- [x] **Drift check** — PLAN cites PLATFORMS :610 and `grok/AGENTS-snippet.md` :20-30. Both hold unchanged: :610 reads "from the same canonical `claude/skills/` bodies Claude Code uses — no Cursor-specific wrappers", and the snippet's :24-31 paragraph says Codex wiring already serves Grok without saying which bodies run. The Grok rows in PLATFORMS (:38/:77/:298/:554) already carry the corrected wording from CORE-878 and are the model for the Cursor row. Left alone as still correct: `cursor/AGENTS-snippet.md` :8-13 and :23-28 (describe what adopters wire and the `.claude/` reuse case), PLATFORMS :37/:76/:298 Cursor wiring statements and AGENT-COMPAT :39 (all say what adopters symlink, which is the canonical bodies). No SPEC contract is touched.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: scope is exactly the two cited sites; the snippet's intro (:7-14) and Grok-only `.grok/skills/` block stay (they correctly describe canonical bodies for Grok-only wiring); the Cursor row's third cell ("if Claude `.claude/` is already present, stop") stays.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** Size estimate: ~2 table-cell/paragraph edits, under 10 lines. Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the Grok rows' conditional wording (PLATFORMS :554) onto the Cursor row; no new shape.

- [x] **Minimal refactor gate** — no refactor.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: docs only.

**Implementation Notes:** `docs/PLATFORMS.md` Cursor Skill invocation row (:610) now reads "from the canonical `claude/skills/` bodies Claude Code uses, or, where only `.agents/skills/` is wired, from the `codex/skills/` wrappers", mirroring the Grok row at :554. `grok/AGENTS-snippet.md` "already wired" paragraph gains one sentence: the bodies Grok runs follow the wiring (canonical under `.claude/skills/` / `.cursor/skills/`, `codex/skills/` wrappers under `.agents/skills/` in a Codex-wired repo).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: docs only; the Acceptance commands and drift checks below ran instead.

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` (markdown, context budgets) → 0.

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — N/A: 5 added / 2 removed lines of docs wording, the skip-tier shape (`SPEC/tasknote-selection.md`).

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface; docs only.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
A1 grep 'Cursor auto-exposes skills as slash commands' docs/PLATFORMS.md | grep -q 'codex/skills/'  → 0
A2 ! grep -q 'from the same canonical `claude/skills/` bodies Claude Code uses — no Cursor-specific' docs/PLATFORMS.md → 0
A3 sed -n '/^## One-time symlink wiring/,/^\*\*Derived surface/p' grok/AGENTS-snippet.md | grep -q 'codex/skills/' → 0
A4 bash tools/drift-checks.sh → 0
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/PLATFORMS.md` and `grok/AGENTS-snippet.md` are this task's edits. `cursor/AGENTS-snippet.md`, `docs/AGENT-COMPAT.md` (Cursor row, "Skill / command primitive" cell) and PLATFORMS :37/:76/:298 describe what adopters wire, which stays correct: no change. Every other listed doc: no change.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-11-08.` stub at the top of `## Completed`, then tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary.

- [x] **Learnings** — N/A.

**Final Summary:** The Cursor Skill invocation row and the Grok snippet no longer say a Codex-wired repo serves the canonical `claude/skills/` bodies: both now say the `codex/skills/` wrappers run where only `.agents/skills/` is wired. Changed: `docs/PLATFORMS.md` (1 line), `grok/AGENTS-snippet.md` (+4/-1). Verification: three Acceptance greps and `bash tools/drift-checks.sh` all exit 0. Refactors: none. Doc verdict: see sweep. Scope reconciliation: Declared 2 files, changed 2. Undeclared: none. Maintainability: Cursor and Grok rows now carry one wording of the wrapper case.

**Archived:** 2026-11-08
