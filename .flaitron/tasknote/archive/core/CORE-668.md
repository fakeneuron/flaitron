---
title: plan-high-none-placeholder
status: completed
tags: []
created: 2026-09-22
due:
related-tasks: [CORE-669]
touches:
  - .flowtron/PLAN.md
---

# CORE-668 | plan-high-none-placeholder

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Reconcile the live PLAN.md's empty `## High` section with the `(none)` placeholder convention `templates/PLAN.md` demonstrates.

## ✅ Acceptance

- [x] `.flowtron/PLAN.md`'s empty `## High` section carries the `(none)` placeholder, matching `templates/PLAN.md`'s convention — `grep -A2 '^## High$' .flowtron/PLAN.md` → `## High` / blank / `(none)`
- [x] No other PLAN.md content changed — `git diff --stat .flowtron/PLAN.md` shows a 2-line insertion only (blank line + `(none)`, matching the template's padding)

## 🧩 Subtasks

- [x] Add `(none)` under the empty `## High` heading in `.flowtron/PLAN.md`, blank-line-padded to match `templates/PLAN.md`'s shape

## 🔗 Related

- [[CORE-669]] — follow-up (parked): document the `(none)` empty-section placeholder convention in `SPEC/plan-filing.md`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The task description's claim checks out exactly against current state — confirmed by direct evidence, not just recollection.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — N/A. This is a one-line markdown content fix (restoring a placeholder string), not a code or module-boundary change; no responsibilities, dependency direction, or abstractions are in play.

- [x] **Archive skim** — `grep -l "(none)"` / `grep -l "templates/PLAN.md"` across `archive/core/` returned dozens of hits, almost all generic false positives (`(none)` used elsewhere as an "N/A" answer; `templates/PLAN.md` cited incidentally). Given the trivial one-line scope and that direct evidence (the template, the parser tests, and `git show b39eb024`) already settles the question conclusively, reading a probe's worth of archive notes would add no signal. No dedicated tasknote covers b39eb024 itself — it was a bulk PLAN-filing chore commit, not run through `/ft-task`, which is consistent with why the `(none)` line got dropped and never restored: no task "owned" that edit.

- [x] **Drift check** — Confirmed via `git show b39eb024 -- .flowtron/PLAN.md`: that commit added three rows under `## High` and deleted the `(none)` placeholder line in the same diff. `## High` has since emptied back out (all three rows completed and archived) but nothing re-added `(none)`. No SPEC contract governs this placeholder explicitly (grepped `SPEC/`, `SPEC.md`, `docs/` — no hits), but `templates/PLAN.md` ships `(none)` under every empty section as the canonical illustrative shape, and `viz/src/parser.test.ts` has two dedicated tests (`ignores empty-section placeholder lines`, `does not collect valid task lines or non-checkbox prose bullets`) confirming the parser treats `(none)` as a recognized, safe, non-task line — not just decorative. This is strong convergent evidence `(none)` is the intended convention and its absence in the live High section is an unintentional side effect of the b39eb024 diff, not a deliberate departure. Decision: restore it; do not drop it from the template.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumption: "restore" means adding the placeholder back to the live `.flowtron/PLAN.md` (the file that actually diverged), not editing `templates/PLAN.md` (which already has it correctly).

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

`(none)` is the established convention: `templates/PLAN.md` ships it under every empty priority section, and `viz/src/parser.test.ts` has dedicated coverage confirming the parser recognizes and safely ignores it. The live `.flowtron/PLAN.md`'s `## High` section lost its `(none)` line as a side effect of `b39eb024` (filing CORE-655/656/657 there) and nothing restored it once those rows were later completed and archived, leaving `## High` empty with no placeholder — exactly the drift the PLAN.md line describes. No SPEC module documents this convention explicitly; it lives only in the template + parser-test pairing. Fix: add `(none)` back under `## High` in the live PLAN.md, matching the template's blank-line-padded shape. No template change needed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing pattern exactly: `templates/PLAN.md` already shows the target shape (`## <Heading>` / blank line / `(none)` / blank line) for every empty section; no new shape introduced.

- [x] **Minimal refactor gate** — N/A. One-line content restoration, no refactor.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A. Content-only change to a data file; `(none)`'s parser handling is already covered by existing `viz/src/parser.test.ts` fixtures, which don't reference the live PLAN.md.

**Implementation Notes:**

Added `(none)` under `.flowtron/PLAN.md`'s `## High` heading, blank-line-padded to match `templates/PLAN.md`'s shape (2-line insertion: blank line + `(none)`). No other content touched.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no test suite targets `.flowtron/PLAN.md` content (a data file, not code under `viz/`)

- [x] Ran lint/type-check on changed code — N/A, no linter targets `.flowtron/PLAN.md` content

- [x] **Verification receipt** — recorded below; no avoidable duplication/dead code/complexity concerns apply to a one-line markdown restoration

- [x] **External review** — `/code-review medium` on the `.flowtron/PLAN.md` diff. Zero findings: "minimal, purely additive one-line change that exactly mirrors the existing convention already used in `templates/PLAN.md`... plain prose outside any checkbox syntax, so it cannot be misparsed by the plan parser." No blockers, no notes.

- [x] (frontend) Asked the user for visual confirmation — N/A, not a frontend/UI change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
grep -A2 '^## High$' .flowtron/PLAN.md                      → 0
  ## High
  (none)
git diff --stat .flowtron/PLAN.md                            → 0
  .flowtron/PLAN.md | 2 ++
  1 file changed, 2 insertions(+)
```

Both Acceptance criteria verified directly.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Doc-drift sweep (19 entries).** All 19 — **no change**. This task touches only `.flowtron/PLAN.md`, which is not itself a member of the AI-referenced docs sweep set; the change restores a content placeholder and asserts nothing about any swept doc's claims.

**Evidence-based recap.** Changed: `.flowtron/PLAN.md` (+2 lines: blank line + `(none)` under the empty `## High` heading). No LOC elsewhere. Verification: `grep -A2 '^## High$' .flowtron/PLAN.md` → `## High` / blank / `(none)` (exit 0); `git diff --stat .flowtron/PLAN.md` → 1 file changed, 2 insertions(+) (exit 0). No refactor made or deferred — one-line content restoration. Documentation verdict: no change (see sweep above); note this task itself surfaced that the `(none)` convention is undocumented in any SPEC module — see Learnings. `touches:` reconciliation: declared `.flowtron/PLAN.md`; `git diff --name-only` confirms exactly `.flowtron/PLAN.md` — no undeclared paths. Maintainability effect: the live plan now matches its own template's illustrative convention, closing the drift `/code-review` surfaced during CORE-661; negligible but concrete (removes a visible plan/template inconsistency an operator or future audit could otherwise flag again).

**Learnings.** The `(none)` empty-section placeholder convention is real (shipped in `templates/PLAN.md`, explicitly covered by two `viz/src/parser.test.ts` tests) but lives nowhere in `SPEC/plan-filing.md` or `SPEC/plan-parser.md` — it's implicit in the template + parser-test pairing only. That's exactly how it silently dropped out of the live plan once (`b39eb024`) with nothing to catch the regression. Filed as [[CORE-669]] rather than expanded here, since documenting the convention is itself unscoped doc work beyond this task's one-line fix.

**Final Summary:**

Restored the `(none)` placeholder under `.flowtron/PLAN.md`'s empty `## High` section, matching `templates/PLAN.md`'s convention for every empty priority section. Confirmed via `git show b39eb024` that the placeholder was dropped as an incidental side effect of filing three now-completed rows there, and never restored once `## High` emptied back out. `/code-review` found zero issues — plain prose outside checkbox syntax, cannot be misparsed by the plan parser.

**Archived:** 2026-09-22
