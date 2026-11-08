---
title: handoff-row-drift-check
status: completed
tags: []
created: 2026-11-08
due:
related-tasks: [CORE-529]
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - claude/skills/ft-close-epic/SKILL.md
  - docs/CONVENTIONS.md
---

# CORE-866 | handoff-row-drift-check

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-529]]

## 🎯 Goal

Make SPEC.md §"Deferred hand-off filing" mechanically enforced (port natabula's check-handoff-rows.sh) and have `/ft-close-epic`'s `.N` audit file a row per open hand-off it lists.

## ✅ Acceptance

- [x] `tools/drift-checks.sh` carries a `handoff_rows` check: an archived note (dated on/after its cutoff) whose hand-off block cites no PLAN row and is not marked "none deferred" fails `UNFILED HANDOFF` — `bash tools/drift-checks.sh handoff_rows` (live: ok)
- [x] The check has a seeded-drift case that also proves a filed cite, a "none deferred" marker, a code-span heading, a fenced heading, a self-cite and a grandfathered note do not report — `node --test tools/drift-checks.test.mjs`
- [x] `/ft-close-epic`'s Phase 2 files each open hand-off a cohort note lists as its own row and records it in Implementation Notes — `grep -q 'Open hand-offs' claude/skills/ft-close-epic/SKILL.md`
- [x] Every drift check still passes — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Port natabula's awk extractor + row match into a `handoff_rows()` function in the drift-checks shape (bad= accumulator, read-set floor, bash 3.2)
- [x] Add a seeded-drift case to `tools/drift-checks.test.mjs`
- [x] Add the open-hand-off filing bullet + Implementation Notes line to `claude/skills/ft-close-epic/SKILL.md` Step 5
- [x] Run the self-test, the full drift run, and the External review

## 🔗 Related

- [[CORE-529]] — predecessor: wrote the §"Deferred hand-off filing" prose rule this check enforces
- [[CORE-533]] — adopter task IDs stay out of contract prose, so the skill text cites no NAT ID

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** SPEC.md:527 still states the rule as prose only; no drift check or skill step enforces it, and `/ft-close-epic` Step 5 has no hand-off filing bullet.

- [x] Read relevant source files — natabula `scripts/check-handoff-rows.sh` (sibling repo, `~/Code` exception), `tools/drift-checks.sh` (header shape rules, `sidequest_orphan`, `pair_r`, dispatcher), `tools/drift-checks.test.mjs` (CASES), `claude/skills/ft-close-epic/SKILL.md` Step 5

- [x] **Best Practices Review** — one new top-level check function, same shape as its siblings; no shared helper extracted (each check is self-contained by the file's own rule: "Every function IS the shell for its check")

- [x] **Archive skim** — `archive/core/` (README row `CORE-*` → `archive/core/`): CORE-529 (added the prose rule beneath CORE-528's "Handoff persistence"), CORE-533 (superseded CORE-529's adopter citation — keep NAT IDs out of contract prose). No prior mechanical check.

- [x] **Drift check** — PLAN line matches; SPEC.md §"Deferred hand-off filing" at SPEC.md:527 as cited; natabula script path exists as named.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Clarification (operator, AskUserQuestion):** the check's home is `tools/drift-checks.sh` only (self-host). No `/ft-task` Phase 4 step: adopters never run drift-checks, natabula keeps its own script, and the Phase 4 route would cost budget in `ft-task/SKILL.md`, `SPEC/procedures/ft-task.md` (1,104 left) and `SPEC.md`.
- **Assumptions:** cutoff = today (2026-11-08), so the check starts green like natabula's. An open hand-off the `.N` audit finds is filed as a **standalone** row (SPEC: "its own unchecked PLAN.md row"), not an epic child, so an operator step does not hold the parent epic open indefinitely.
- History run (cutoff moved to 2026-01-01, throwaway copy): 4 findings — CORE-769.N:105 and :170 (real prose-only `**Operator hand-offs` lists), CORE-098.15:225 (`### Visual smoke (pre-handoff…)`) and CORE-598.3:96 (`### … \`[handoff]\` declares`), both false positives. The second is flaitron's own `[handoff]` row-token vocabulary, so code spans are stripped before the marker match (a delta from the natabula port).

Discovery surfaced no significant deviation → skip 🛠️ (the one design fork was settled by the operator's answer).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `sidequest_orphan`'s shape (title comment with source rule, design notes as `#` comments, `MISSING FILE` guard, row-ID read as the floor instead of an `n` counter)

- [x] **Minimal refactor gate** — no refactor; header comment lists (no-catalogue checks, read-set floors) widened to name the new check

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `tools/drift-checks.sh`: new `handoff_rows()` after `sidequest_orphan`. Port deltas from natabula: no cd/arg (the dispatcher sets the root); a missing `PLAN-ARCHIVE.md` is a finding (as in `sidequest_orphan`); one finding line `UNFILED HANDOFF  <note>:<line> :: <marker>` plus one closing remedy line; code spans are stripped before marker detection.
- `tools/drift-checks.test.mjs`: `handoff_rows` case. The regex has no `m` flag, so it matches the whole output and a decoy that reports fails the case.
- `claude/skills/ft-close-epic/SKILL.md` Step 5: an **Open hand-offs** bullet plus an Implementation Notes capture line.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `bash tools/drift-checks.sh handoff_rows` → 0 (`handoff_rows ok`)
- `node --test tools/drift-checks.test.mjs` → 0 (43 pass, 0 fail)
- `grep -q 'Open hand-offs' claude/skills/ft-close-epic/SKILL.md` → 0
- `bash tools/drift-checks.sh` → 0 (pre-existing NEAR CAP notices only)
- `shellcheck tools/drift-checks.sh` → no finding on the new lines (the file's pre-existing info-level notes are unchanged)
- History run (cutoff 2026-01-01, throwaway copy): only the two genuine CORE-769.N prose-only lists report; the CORE-098.15 / CORE-598.3 false positives are gone. 1.3 s, down from ~3.6 s for the per-note-fork version.
- Only BSD awk exists locally; mawk/gawk (CI's Ubuntu runner) are untested here. The awk sticks to POSIX constructs with no `{n}` intervals, and an awk failure now fails the check (`AWK FAILED`) instead of passing.
- **External review** (`/code-review medium` over this task's diff only), 10 findings:
  1. A nested sub-item ended an item block before its cite was read → **fixed** (an item ends the block only at an indent no deeper than the marker's; covered by the fixture).
  2. A bold-ID cite paragraph (`**ZZ-9** …`) ended a label block → **fixed** (a line opening with a bold row ID does not end it; covered).
  3. Bare `completed` / `resolved` anywhere silenced the block ("to be completed by the operator") → **fixed** (escape is `none/no/nothing deferred` or `(resolved)` / `(completed)`; covered).
  4. `pre-handoff` and a plain `handoff_rows` opened heading blocks → **fixed** (word-bounded match; covered).
  5. Aliased wikilinks `[[ID|alias]]` were not read → **fixed** (covered). Plain bare IDs stay unread by design: only the two marked forms are citations.
  6. The skill bullet did not name the cite forms → **fixed** (names `[[ID]]` / `**ID**`).
  7. An awk failure read as zero blocks → **fixed** (output captured; non-zero exit reports `AWK FAILED`).
  8. The self-cite test was vacuous and the parent-epic exclusion was untested → **fixed** (ZZ-5 and ZZ-EPIC-7 seeded as real rows; a ZZ-7.2 note citing only its parent reports).
  9. Any row, closed or unrelated, discharges a block → **won't fix**: a filed hand-off row closes when the step is done, and its archived note must keep passing. Recorded in the check's design comment.
  10. A fork per note, ~3.6 s → **fixed** (one awk pass, 1.3 s).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/CONVENTIONS.md` §"GitHub Actions CI" listed the checks that have no catalogue entry ("Four checks…") → updated to five, with a `handoff_rows` description. `SPEC.md` unchanged: the check is self-host-only, and the contract rule it enforces is already stated there. Other AI-referenced docs: no change.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A (the check enforces an existing contract rule; nothing new for the always-loaded layer)

**Final Summary:**

The rule that a deferred operator step must be its own PLAN row is now enforced, not just written down. A new `handoff_rows` drift check fails any tasknote archived from 2026-11-08 on whose hand-off block cites no PLAN row and is not marked "none deferred". `/ft-close-epic`'s audit must now file each open hand-off it finds as a standalone row.

- Changed: `tools/drift-checks.sh` (new `handoff_rows`, plus the header lists), `tools/drift-checks.test.mjs` (seeded case: 3 reports and 8 silent decoys), `claude/skills/ft-close-epic/SKILL.md` (Step 5 bullet plus an Implementation Notes line), `docs/CONVENTIONS.md` (check roster).
- `touches:` reconciliation: `git diff --name-only` = the four declared paths, plus this tasknote and PLAN.md (workflow files).
- Refactors: none. Port deltas from natabula are listed in Implementation Notes and the External review list.
- Maintainability: CI now catches prose-only hand-offs at the next drift run instead of days later. Two pre-cutoff prose-only hand-offs (CORE-769.N:105, :170) are grandfathered, not re-audited.

**Archived:** 2026-11-08
