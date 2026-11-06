---
title: stale-size-figures
status: completed
tags: []
created: 2026-11-06
due:
related-tasks: [CORE-EPIC-869, CORE-869.3, CORE-869.5]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - .flaitron/audit-overlay/SKILL.md
  - tools/update-adopters.mjs
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-869.4 | stale-size-figures

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-869]]

## 🎯 Goal

Re-measure the stale structure pass-4 size figures in `.flaitron/audit-overlay/SKILL.md` and reword `tools/update-adopters.mjs` line 4 so it matches the two CLI carve-outs in `SPEC/scope-boundaries.md`.

## ✅ Acceptance

- [x] Overlay pass 4 states the re-measured figures (median 41, p90 272 over 71 files; `tools/update-adopters.mjs` 1,653; `tools/drift-checks.sh` 973) — `grep -q 'median 41 lines, p90 272' .flaitron/audit-overlay/SKILL.md`
- [x] Old figures gone from the overlay — `! grep -qE 'at 872|at 811|median 39' .flaitron/audit-overlay/SKILL.md`
- [x] `update-adopters.mjs` header no longer claims a "singular script exception" and names the installer as the other carve-out — `! grep -q 'singular script exception' tools/update-adopters.mjs && sed -n 1,8p tools/update-adopters.mjs | grep -q 'install.sh'`
- [x] Updater suite and syntax check pass — `node --test tools/update-adopters.test.mjs`; `node --check tools/update-adopters.mjs`
- [x] Wording matches the carve-outs — `judgment`: a prose match against `SPEC/scope-boundaries.md`, no command decides it

## 🧩 Subtasks

- [x] Re-measure non-test source line counts under `viz/src` + `tools/`
- [x] Update overlay pass 4 figures
- [x] Reword `tools/update-adopters.mjs` line 4
- [x] Run the Acceptance verify commands

## 🔗 Related

- [[CORE-EPIC-869]] — parent epic (carrying-cost)
- [[CORE-869.5]] — sibling child (near-cap-trims), already closed

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both stale spots exist as the row describes (overlay pass 4 at `SKILL.md:85`; header at `update-adopters.mjs:4`); small two-file doc/comment edit, no code behavior change.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Re-measure (non-test `.ts/.tsx/.mjs/.sh/.js/.css` under `viz/src` + `tools/`, `*.test.*` and `.d.ts` excluded): 71 files, median 41, p90 272 (old: 70 files, median 39, p90 271). Method inferred from the old file count (70); the row's `drift-checks.sh` 811 → 884 is itself stale — it is 973 now (CORE-869.2/.3 grew it), so the live `wc -l` figure is used, not the row's.
- Drift: `update-adopters.mjs` is 1,653 lines (matches the row). The phrase "singular script exception" lives only at `update-adopters.mjs:4` (CORE-852.1 note). SPEC/scope-boundaries.md names two CLI carve-outs: the updater and `install.sh`.
- Best practices: N/A — comment and doc figure edit, no code boundaries.
- Archive skim: CORE-852.1 and CORE-855 touched the phrase; nothing load-bearing beyond the above.
- No clarifications needed: assume the header reword is a comment-only change naming both carve-outs.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: plain text edits to an existing audit-overlay sentence and an existing header comment; no new shape.
- Overlay `SKILL.md:85`: median 39 → 41 lines, p90 271 → 272, 70 → 71 files, v8.0.0 → v8.3.0; `update-adopters.mjs` 872 → 1,653; `drift-checks.sh` 811 → 973 (live `wc -l`; the row's 884 was itself stale).
- `update-adopters.mjs` lines 4–8: "The singular script exception … (see the carve-out there)" → "One of the two CLI carve-outs (with install.sh) to SPEC.md §\"What flaitron does NOT provide\" (SPEC/scope-boundaries.md)", rewrapped to keep the file at 1,653 lines so the new figure stays true.
- Tests: none added — comment and prose-figure edit, no behavior change.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A, no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
grep -q 'median 41 lines, p90 272' .flaitron/audit-overlay/SKILL.md          → 0
! grep -qE 'at 872|at 811|median 39' .flaitron/audit-overlay/SKILL.md        → 0
! grep -q 'singular script exception' tools/update-adopters.mjs && sed -n 1,8p tools/update-adopters.mjs | grep -q 'install.sh' → 0
node --check tools/update-adopters.mjs                                       → 0
node --test tools/update-adopters.test.mjs                                   → 0 (122 pass, 0 fail)
bash tools/drift-checks.sh                                                   → 0
wc -l tools/update-adopters.mjs                                              → 1653
```

- Lint/type-check: N/A, no viz source changed; `node --check` and `drift-checks.sh` cover the touched `.mjs` and markdown.
- Duplication / dead code / stale docs: none; no AI-referenced doc cites the old figures or the "singular script exception" phrase (grep over `docs`, `SPEC`, README, CONTRIBUTING).
- **External review** (`/code-review medium`): the reviewer returned five notes, **none on this task's diff** (this diff is `.flaitron/audit-overlay/SKILL.md` + `tools/update-adopters.mjs`). Four are in `tools/drift-checks.sh` and one in `SPEC.md`, from earlier tasks' commits — the review ran over a wider range than the task diff. No blocker for this task's Acceptance. Dispositions: all five out of scope here, not edited. Worth the operator's eye: the `tools/drift-checks.sh:126` NEAR CAP branch (CORE-869.3) divides by `budget`, so a Budgets row with budget 0 and an empty file would abort with division by zero — not reachable from a real budget table today. Not filed from this run; left for the operator to file or dismiss.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:** Re-measured the structure pass-4 figures in the audit overlay (median 41, p90 272, 71 files; `update-adopters.mjs` 1,653; `drift-checks.sh` 973) and reworded the `update-adopters.mjs` header to name both CLI carve-outs. Doc-drift sweep: no change across the AI-referenced docs. `touches:` reconciled — diff matches the two declared paths. Learnings: N/A.

**Archived:** 2026-11-06
