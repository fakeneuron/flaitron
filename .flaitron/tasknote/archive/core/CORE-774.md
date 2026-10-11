---
title: single-model-restore-read
status: completed
tags: []
created: 2026-10-11
due:
related-tasks: [CORE-773]
---

# CORE-774 | single-model-restore-read

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-773]]

## 🎯 Goal

Close [[CORE-773]]'s decay window: read the next 10 tasknotes archived after it, and restore the "no swapping mid-task" paragraph in `SPEC/model.md` only if one shows a cross-model resume degrading the work.

## ✅ Acceptance

- [x] The 10 tasknotes archived after CORE-773 are enumerated — `git log --reverse --diff-filter=A --name-only --pretty=format: c0f4df9e..HEAD -- .flaitron/tasknote/archive | grep -c '\.md$'` ≥ 10
- [x] Each of the 10 was read for a cross-model resume and the verdict is recorded in Discovery Notes — `judgment`: whether a resume "degraded the work" is a reading call, not a command
- [x] Paragraph stays removed (the read is clean, so no restore) — `! grep -q "no swapping mid-task" SPEC/model.md`
- [x] Drift checks pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Enumerate the archived tasknotes after `c0f4df9e` (CORE-773's closure commit)
- [x] Grep and read the first 10 for model-swap / resume signals
- [x] Record the verdict; restore only on a degrading cross-model resume
- [x] Run the drift checks

## 🔗 Related

- [[CORE-773]] — opened the window (start SHA `b7106192`); this is its restore-read
- [[CORE-659]] — precedent decay-window shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Row is open and unarchived, tree clean at start. CORE-773 archived 2026-10-10 and more than 10 tasknotes have archived since, so the window has elapsed.

- [x] Read relevant source files — `.flaitron/tasknote/archive/core/CORE-773.md` (window definition), `git show b7106192:SPEC/model.md` lines 42-45 (the removed paragraph).

- [x] **Best Practices Review** — `N/A`: read-and-record task, no code or boundary touched.

- [x] **Archive skim** — `archive/core/` and `archive/fe/` confirmed against the README §"Archive layout" table (`CORE-*` → `core/`, `FE-*` → `fe/`); the 10 window notes are the subject of the task itself.

- [x] **Drift check** — the PLAN row cites `SPEC/model.md` lines 42-45 at `b7106192`; confirmed the paragraph there reads "A task runs end-to-end on a single model — no swapping mid-task …". The row says "the next 10" archived after the start SHA `b7106192`; the window effectively opens at CORE-773's own closure (`c0f4df9e`), so CORE-773 itself is excluded. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumption: "next 10 archived" means the first 10 by archive-commit order after `c0f4df9e`; the later notes are corroboration only.

- [x] Subtasks above populated with ordered steps; `touches:` omitted — no file deliverable beyond the PLAN row and this note (a read-and-record task).

**Discovery Notes:**

Discovery surfaced no significant deviation → skip 🛠️.

**The window (first 10 archived after `c0f4df9e`, in archive-commit order):** CORE-775.2, CORE-775.3, CORE-775.N, CORE-777, CORE-776.4, CORE-776.3, CORE-776.2, CORE-776.6, CORE-776.5, CORE-778.1. Ten later notes (CORE-776.N, CORE-778.2-.5, CORE-778.N, FE-127.2-.4, FE-127.N, FE-128) were grepped as corroboration.

**Read.** Grepped each note for `swap`, `model-mismatch`, `retag`, `resum*`, `handoff`, `park-reason`, `under-tier`, `degrad*`, `regress*`, `mid-task`, and model names, then read every hit in context. No hit is a cross-model resume:

- CORE-775.2 `swap`, CORE-777 `swap` — the `ft-old → ft-update` skill-link rename, not a model swap.
- CORE-777 `Resume anchor` — carried verbatim from a sidequest stub (CORE-775.2 was in Phase 3 when the idea was parked); CORE-777 itself ran start-to-finish in one tasknote with no mid-task model change.
- CORE-775.N `regressions` — the epic audit's "no regressions in earlier children" check; unrelated to models.
- CORE-776.5 `model-mismatch` — a prose mention of a resume path the micro skill carries, discussed as a design option; no run hit it.
- CORE-776.6 `Model [heavy] on Opus → satisfied` — the Step 1.5 gate passed cleanly.
- CORE-778.1 — a file inventory that names `SPEC/model.md` line 3 and the shared-fragment `<SKILL>` substitutions; no model swap.
- CORE-776.2, 776.3, 776.4, 775.3 — no signal at all.

Corroboration set: the only other hits are CORE-778.2's blocked-resume shape rule for `--micro`, CORE-778.3/778.4 contract text, and FE-128's sidequest `Resume anchor`; none describes a model change mid-task, and none records degraded work.

**Verdict:** clean read. No tasknote in the window shows a cross-model resume degrading the work, so the "no swapping mid-task" paragraph is **not** restored.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the CORE-659 decay-window shape: opening note records the start SHA, this restore-read row records the verdict and closes.

- [x] **Minimal refactor gate** — `N/A`: no code or contract edit.

- [x] Implemented the minimal solution — the verdict is recorded above; no `SPEC/model.md` edit.

- [x] Updated/added tests for non-trivial behavior — `N/A`: no behavior changed.

**Implementation Notes:** None — the clean-read outcome writes nothing outside this note and the PLAN stub flip.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no code changed.

- [x] Ran lint/type-check on changed code — `N/A`: no code changed.

- [x] **Verification receipt** — see Testing Notes; no code changed so the structural-assertion half is `N/A`.

- [x] **External review** — `N/A`: no diff to grade beyond a recorded verdict, PLAN stub flip, and archive move.

- [x] (frontend) Asked the user for visual confirmation — `N/A`: not a frontend change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `git log --reverse --diff-filter=A --name-only --pretty=format: c0f4df9e..HEAD -- .flaitron/tasknote/archive | grep -c '\.md$'` → 21 (≥ 10)
- `! grep -q "no swapping mid-task" SPEC/model.md` → 0
- `bash tools/drift-checks.sh` → 0
- Read verdict: `judgment` — see Discovery Notes.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change: no AI-referenced doc depends on the paragraph staying or returning (the "end-to-end" mirrors in `AGENTS.md` and `claude/AGENTS-snippet.md` were kept by CORE-773 and are untouched).

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-10-11.` stub at the top of `## Completed`, then tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary.

- [x] **Learnings** — `N/A`

**Final Summary:**

Read the ten tasknotes archived after [[CORE-773]] (CORE-775.2 through CORE-778.1) and found no cross-model resume that degraded the work, so the "no swapping mid-task" paragraph stays removed from `SPEC/model.md` and the decay window closes. `touches:` reconciliation: `N/A — no file deliverable`; the diff is this note's archive move and the PLAN.md row flip. Doc verdict: no change. Learnings: N/A.

**Archived:** 2026-10-11
