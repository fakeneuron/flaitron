---
title: release-gate-line-cite-drift
status: completed
tags: []
created: 2026-09-09
due:
related-tasks: []
touches:
  - claude/skills/ft-release/step-7.1-standing-checks.md
---

# CORE-544 | release-gate-line-cite-drift

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Replace the four drifted `path:NN` citations in `step-7.1-standing-checks.md` with stable, content-based locators so they stop drifting on every doc edit.

## ✅ Acceptance

- [x] `README.md:32-33` / `docs/MIGRATION.md:202-203` / `codex/AGENTS-snippet.md:57` citation in the "Machine-global wiring — advisory" note replaced with stable locators (heading/anchor text, not line numbers); the dead `codex/AGENTS-snippet.md:57` reference dropped or replaced with a note that the pattern no longer exists there
- [x] `README.md:22-23` citation in the "Standing README task-counter check" (both occurrences) replaced with a stable locator
- [x] No remaining `path:NN`-style line citations introduced by this fix (the four cited by the task are gone; other unrelated citations in the file are out of scope)

## 🧩 Subtasks

- [x] Verify current drift (confirmed in Discovery)
- [x] Rewrite the "Machine-global wiring — advisory" citation sentence
- [x] Rewrite the two "Standing README task-counter check" citations
- [x] Re-read the file to confirm no stray `.md:NN` citations remain in the touched passages
- [ ] Closure

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Confirmed all four citations are drifted/dead exactly as described; this is a self-contained doc-prose fix in one file.

- [x] Read relevant source files — read `step-7.1-standing-checks.md` in full, plus `README.md`, `docs/MIGRATION.md`, and `codex/AGENTS-snippet.md` at the cited locations.

- [x] **Best Practices Review** — N/A, prose-only doc fix, no code touched.

- [x] **Archive skim** — `git log --oneline -- .flowtron/PLAN-ARCHIVE.md | grep CORE-481` located the precedent: CORE-481 dropped brittle SECURITY.md line-number citations in favor of stable (function-name) locators. Applying the same approach here (heading/anchor-text locators instead of line numbers).

- [x] **Drift check** — confirmed by direct read:
  - `README.md:32-33` (the `~/code/flowtron` Quickstart clone/ln-s example) is now at lines 35-37 — task's claim matches.
  - `docs/MIGRATION.md:202-203` (the global-only `ln -s ~/code/flowtron/...` example) is now at lines 243-244 — task's claim matches.
  - `codex/AGENTS-snippet.md:57` — the file no longer contains any `~/code/flowtron` / `~/Code` text at all; its symlink wiring now uses relative `../../.flowtron/core/...` targets. Citation is dead — task's claim matches.
  - `README.md:22-23` (task-counter check) — the "Flowtron is built with flowtron: **N tasks** closed..." sentence now starts at line 23 (line 22 is blank), spanning 23-25. Task's claim matches.
  No divergence from the PLAN.md line or any SPEC contract.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumption: "stable locators" means content-addressable references (quoted heading/anchor text or a distinctive phrase), not re-pinned line numbers, per the CORE-481 precedent the task explicitly invokes.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Two citation sites in `step-7.1-standing-checks.md`:
1. "Machine-global wiring — advisory" section's closing note — cites all three of `README.md:32-33`, `docs/MIGRATION.md:202-203`, `codex/AGENTS-snippet.md:57`.
2. "Standing README task-counter check" section — cites `README.md:22-23` twice (opening sentence + the "Update ...'s count" sentence near the end of that paragraph).

CORE-481 precedent: replaced ten brittle `SECURITY.md` line citations with function names (stable locators), leaving behavioral claims unchanged. This task follows the same pattern but for doc prose: replace `file.md:NN` with a quoted heading or distinctive anchor phrase from the target file, and drop the codex citation entirely since the underlying pattern no longer exists there.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extending the existing CORE-481 precedent (stable, non-line-number locators); no new pattern needed.

- [x] **Minimal refactor gate** — touching only the two citation sentences; no unrelated cleanup.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, doc-prose only.

**Implementation Notes:**

Replaced the "Machine-global wiring — advisory" citation sentence: `README.md:32-33` → "README.md's Quickstart `git clone`/`ln -s` example"; `docs/MIGRATION.md:202-203` → docs/MIGRATION.md §"Machine-global installs: utilities only"'s `ln -s` example; dropped `codex/AGENTS-snippet.md:57` from the "leave alone" list and added a one-line note that the file no longer carries an absolute `~/code/flowtron` path (its wiring is now relative `../../.flowtron/core/...`), so it needs no exclusion.

Replaced both `README.md:22-23` occurrences in the "Standing README task-counter check" section with the quoted anchor phrase "Flowtron is built with flowtron" sentence.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, doc-prose fragment with no test surface.

- [x] Ran lint/type-check on changed code — N/A, markdown only; no linter configured for this file class.

- [x] **Quality assertions** — `grep -n '\.md:[0-9]' claude/skills/ft-release/step-7.1-standing-checks.md` returns no matches: all four drifted citations are gone and no new line-number citation was introduced. Re-read the two edited passages in full via `git diff` — both read cleanly, no duplication or stale cross-reference left behind.

- [x] (frontend) Asked the user for visual confirmation — N/A, not a frontend change.

**Testing Notes:**

Verified by direct grep (see Quality assertions) and a full re-read of the diff (`git diff -- claude/skills/ft-release/step-7.1-standing-checks.md`). No test suite applies to prose-only skill-fragment edits.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — checked `.flowtron/tasknote/README.md` §"AI-referenced docs": no entry references `claude/skills/ft-release/step-7.1-standing-checks.md` directly; no change needed there. `docs/CONTEXT-BUDGET.md` measures `ft-release`'s whole-directory total, not this fragment individually — this edit's byte delta is negligible and the ledger refresh is a release-time §7.1 motion, not a per-task one; no change needed here.

- [x] Closed — every `## ✅ Acceptance` criterion ticked. YAML `status:` flipped to `completed`. PLAN.md line flipped to stub form and placed at top of `## Completed`. Tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted below.

**Final Summary:**

Replaced all four drifted `path:NN` citations in `claude/skills/ft-release/step-7.1-standing-checks.md` with stable, content-based locators (quoted headings/anchor phrases), per the CORE-481 precedent. Two edit sites, both confirmed against current file state before editing:

1. "Machine-global wiring — advisory" note: `README.md:32-33` → "README.md's Quickstart `git clone`/`ln -s` example"; `docs/MIGRATION.md:202-203` → docs/MIGRATION.md §"Machine-global installs: utilities only"'s `ln -s` example; `codex/AGENTS-snippet.md:57` (dead — cited text no longer exists in that file) → replaced with a one-line note that the file's wiring is now relative `../../.flowtron/core/...` paths, needing no exclusion.
2. "Standing README task-counter check" (2 occurrences): `README.md:22-23` → quoted anchor phrase "Flowtron is built with flowtron" sentence.

Verification: `grep -n '\.md:[0-9]' claude/skills/ft-release/step-7.1-standing-checks.md` returns no matches. No tests/lint apply (doc-prose fragment). No refactor beyond the cited sentences; no documentation left stale.

**Archived:** 2026-09-09
