---
title: frontier-grok-wording
status: completed
tags: []
created: 2026-10-15
due:
related-tasks: []
touches:
  - SPEC/model.md
---

# CORE-791 | frontier-grok-wording

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Reword `SPEC/model.md` §"Category-vs-concrete matching" `frontier` calibration bullet so a flagship with nothing above it earns `frontier` at `xhigh` only where `docs/PLATFORMS.md` bands it so (Astra does, Grok 4.7 does not).

## ✅ Acceptance

- [x] The `frontier` bullet defers the flagship-at-`xhigh` verdict to `docs/PLATFORMS.md` §"Platform×model×effort calibration table" and names Grok 4.7 as the counter-example — `grep -n "Grok 4.7" SPEC/model.md` hits inside the `frontier` bullet
- [x] `docs/PLATFORMS.md` is unchanged — `git diff --quiet -- docs/PLATFORMS.md`
- [x] Context budgets and drift checks still pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Edit the `frontier` bullet in `SPEC/model.md` (lines ~86-93)
- [x] Run `bash tools/drift-checks.sh` (context budget on `SPEC/model.md`)

## 🔗 Related

- Surfaced by audit-docs 2026-10-15 (Finding #4, Low).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The `frontier` bullet in `SPEC/model.md` still reads as if any no-model-above flagship at `xhigh` earns `frontier`, while `docs/PLATFORMS.md` (tier×platform map, family roster) bands Astra frontier at `xhigh` and Grok `xhigh` only heavy-band ("no frontier model"). A one-clause wording fix; the stale claim is still live.

- [x] Read relevant source files — `SPEC/model.md` L50-160, `docs/PLATFORMS.md` §"Platform×model×effort calibration table" (map + roster). Small read set; no probe.

- [x] **Best Practices Review** — N/A: prose edit to a contract file, no code or module boundaries.

- [x] **Archive skim** — `archive/core/` resolved via README table; `grep -l "SPEC/model.md"` hits (CORE-767/770.x/773/774/778.x/780) are earlier model-ladder/calibration work; none touches the frontier-flagship clause beyond the wording being tightened here.

- [x] **Drift check** — PLAN line matches SPEC: the clause is at `SPEC/model.md` L86-93 as described; PLATFORMS Grok note (map footnote "⚠️ Grok has no frontier-band model") unchanged and consistent. Only one occurrence of the wording repo-wide (`grep` for "above its flagship" / "dialed up to `xhigh`" hits model.md only).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumption: wording-only change, no behavior/gate change; `docs/PLATFORMS.md` is the authority and stays untouched.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose edit, `tools/drift-checks.sh` already covers budgets/citations

**Implementation Notes:** Pattern: extended the existing `frontier` bullet in place; no new shape. Rewrote the "flagship dialed up to `xhigh`" clause to defer to `docs/PLATFORMS.md` §"Platform×model×effort calibration table" and name Grok 4.7 as the non-frontier case (`SPEC/model.md` L86-93, 4 insertions / 3 deletions). No refactor; no tests apply (prose contract).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code; `bash tools/drift-checks.sh` is the covering check

- [x] Ran lint/type-check on changed code — N/A: markdown only; drift-checks (final newline, context budget) cover it

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason) — see Testing Notes

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason — N/A: 4-line prose rewording of one bullet, too small to grade

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -n "Grok 4.7" SPEC/model.md` → 0 (L90, inside the `frontier` bullet)
- `git diff --quiet -- docs/PLATFORMS.md` → 0
- `bash tools/drift-checks.sh` → 0 (all checks ok, incl. context_budget)
- Duplication/stale-docs: the wording appeared only in `SPEC/model.md` (repo-wide grep); no stale echo.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? N/A

**Final Summary:** Reworded the `frontier` bullet in `SPEC/model.md` §"Category-vs-concrete matching" so a no-model-above flagship earns `frontier` at `xhigh` only where `docs/PLATFORMS.md` bands it so (Astra yes, Grok 4.7 no). `touches:` reconciliation: `git diff --name-only` = `SPEC/model.md` (plus PLAN/tasknote closure writes) — matches declared. `docs/PLATFORMS.md` untouched.

**Archived:** 2026-10-15
