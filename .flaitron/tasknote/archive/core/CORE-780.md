---
title: sop-recheck-ft-task
status: completed
tags: []
created: 2026-10-11
due:
related-tasks: [CORE-778.4, CORE-776.5, CORE-769.2]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - SPEC/procedures/ft-task.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-780 | sop-recheck-ft-task

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-778.4]] · [[CORE-776.5]] · [[CORE-769.2]]

## 🎯 Goal

Re-verify `SPEC/procedures/ft-task.md` against its watched surfaces since its 2026-10-01 stamp, mirror any real drift, and bump `last-verified:`.

## ✅ Acceptance

- [x] Each of the 3 new tier-1 candidates (CORE-778.4, CORE-776.5, CORE-769.2) adjudicated in Discovery Notes as drift (mirrored) or no-drift (with reason) — `judgment` — adjudication is a reading of diffs against SOP prose
- [x] Tier-2 `restates: SPEC.md` count skimmed and recorded — `judgment` — advisory count by README contract
- [x] `last-verified:` bumped to `v7.0.0 · 2026-10-11` — `grep -q '^last-verified: v7.0.0 · 2026-10-11$' SPEC/procedures/ft-task.md`
- [x] Re-running the tier-1 query against the new stamp date lists no candidates — `git log --since=2026-10-11 --format=%h -- claude/skills/ft-task/ templates/tasknote-template.md` (expect empty)
- [x] Drift checks pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] List tier-1 candidates since 2026-10-01 (source commits not touching the SOP)
- [x] Adjudicate the 3 new candidates against the SOP
- [x] Skim tier-2 SPEC.md commits for SOP-restated contract changes
- [x] Bump `last-verified:`
- [x] Run drift checks + verification receipt

## 🔗 Related

- [[CORE-778.4]] — tier-1 candidate (contract-reconcile)
- [[CORE-776.5]] — tier-1 candidate (micro-unattended-review)
- [[CORE-769.2]] — tier-1 candidate (retire-command-wrappers)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The SOP's stamp (2026-10-01) predates 10 source commits that skipped it; the release-time currency check (`SPEC/procedures/README.md` §"Frontmatter schema") routes exactly this re-check to a follow-up task.

- [x] Read relevant source files — the three candidate diffs restricted to `claude/skills/ft-task/` + `templates/tasknote-template.md`, the SOP's matching sections, and the current `SKILL.md`/`preamble.md`.

- [x] **Best Practices Review** — `N/A`: doc-currency stamp, no code or module boundary.

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Archive skim** (`archive/core/`, confirmed against the README table): prior SOP edits since the stamp came from CORE-778.2 / 778.N (micro mode row), 769.3 / 769.4 (renames), 768.3 / 768.4, 741.4, 738, 732, 731, 724.3 / 724.4 / 724.7, 711.4, 691, 678.2 — 17 commits edited the SOP after 2026-10-01 without bumping the stamp, so most of the window is already mirrored.
- **Drift check:** PLAN line matches the query: tier-1 since 2026-10-01 lists exactly 10 commits — the 3 named new ones plus 7 dismissed at v6.1.0 (CORE-746, 730, 733, 725, 729, 724.5, 724.2). Their dismissal stands; not re-litigated. No path drift.
- **CORE-778.4 (contract-reconcile) → no drift.** Its ft-task hunks strip `/ft-micro-task` from `SKILL.md` Step 0/1, `preamble.md`, `step-1.5-model-edge.md`, `step-5-loop-mode.md`, and `unattended-mode.md` (column dropped; `--micro takes the /ft-task column`), and fix the row-marker emission to `same suppressions as --fast`. The SOP never named `/ft-micro-task` (`grep -n micro` → only the `--micro` primitives row, already added by CORE-778.2) and states the row-marker implication neutrally ("treat it as an autonomous-mode run and say so inline") — nothing to mirror.
- **CORE-776.5 (micro-unattended-review) → no drift.** Its hunks concern `/ft-micro-task --unattended` only (External review + `visual-confirm` park), since superseded by CORE-778.4's retirement of that runner. The `/ft-task` sentence it added ("a blocker the run cannot fix parks `input-needed`") is already in the SOP's Phase 3 External review paragraph.
- **CORE-769.2 (retire-command-wrappers) → no drift.** Its only ft-task hunk adds `argument-hint:` to `SKILL.md` frontmatter — Claude Code wiring. The SOP names no `claude/commands/` path. (Current `argument-hint:` already carries `--micro`.)
- **Tier 2 (`restates: SPEC.md`):** 20 commits since 2026-10-01 (the PLAN line's "12" was counted at filing; the window now also takes in later commits and the v7.0.0 cut); 7 of them also edited the SOP. Skimmed the rest: two release cuts, the [frontier] rung (CORE-741.2 — the SOP routes tiers to `SPEC/model.md` and enumerates none), ID allocation (CORE-776.6 — filer-side, not a runner step), the flowtron→flaitron rename (SOP carries no `flowtron`), the micro-runner commits above, and gate-catalog / budget trims. Nothing the SOP restates.
- Spot-checked newest `SKILL.md` features against the SOP: skill/pin guard aside (Claude install concern), sidequest-stub retirement, epic-child YAML echo, Step 3c park-reason naming, interrupted-run routing, and the `**Archived:**` pre-move stamp check are all present.
- No clarifications needed (--fast). Assumptions: the 7 v6.1.0 dismissals stand; a clean verdict means a stamp-only diff; stamp version = current tag `v7.0.0`, date = today.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — same stamp-bump shape as prior SOP rechecks (`<version> · <YYYY-MM-DD>`).

- [x] **Minimal refactor gate** — none.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: one-line frontmatter stamp.

**Implementation Notes:**

- `SPEC/procedures/ft-task.md:5` — `last-verified: v5.33.0 · 2026-10-01` → `v7.0.0 · 2026-10-11`. No body edits: no candidate surfaced drift.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no code; drift checks are the relevant suite

- [x] Ran lint/type-check on changed code — `N/A`: markdown frontmatter only

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -q '^last-verified: v7.0.0 · 2026-10-11$' SPEC/procedures/ft-task.md` → 0
- `git log --since=2026-10-11 --format=%h -- claude/skills/ft-task/ templates/tasknote-template.md` → 0, empty output (no candidates under the new stamp)
- `bash tools/drift-checks.sh` → 0 (all pairs ok)
- Structural: one-line stamp change; no duplication, dead code, or stale docs introduced.
- External review → `N/A`: the diff is a single frontmatter value, too small to grade; the substantive work is the adjudication recorded in Discovery Notes.
- Frontend 👁️ → `N/A`: no rendered surface.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

- **Changed:** `SPEC/procedures/ft-task.md` (stamp `v5.33.0 · 2026-10-01` → `v7.0.0 · 2026-10-11`); PLAN.md stub; this tasknote.
- **Verdict:** all 3 new tier-1 candidates are no-drift — CORE-778.4 and CORE-776.5 touch only the retired `/ft-micro-task` runner (the SOP never named it), CORE-769.2 is Claude-only `argument-hint:` wiring. 7 v6.1.0 dismissals stand. Tier 2: 20 `SPEC.md` commits, none touching contract the SOP restates.
- **Verification:** stamp grep → 0; re-run tier-1 query → empty; drift checks → 0.
- **Doc-drift sweep:** no change to any AI-referenced doc — the SOP is the only surface and its stamp is the deliverable.
- **`touches:` reconciliation:** declared `SPEC/procedures/ft-task.md`; actual diff = that plus PLAN.md + the tasknote archive (workflow files). Matches.
- **Maintainability:** the next `/ft-release` Step 5 flag-don't-bump check starts from a clean window.
- **Learnings:** N/A.

**Archived:** 2026-10-11
