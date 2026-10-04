---
title: rotate-completed-rows
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-EPIC-638]
touches:
  - .flowtron/PLAN.md
  - .flowtron/PLAN-ARCHIVE.md
---

# CORE-638.2 | rotate-completed-rows

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-638]]

## 🎯 Goal

Rotate `.flowtron/PLAN.md` `## Completed`'s oldest rows into `.flowtron/PLAN-ARCHIVE.md`'s existing `## Completed 2026-09` heading until the section is at or below the 60-row bound, with epic cohorts kept intact.

## ✅ Acceptance

- [x] `## Completed` in PLAN.md holds at most 60 checked rows (nested epic children counted) — `awk '/^## Completed$/{f=1;next}/^## /{f=0} f' .flowtron/PLAN.md | grep -c '^\s*- \[x\]'` → 60
- [x] Rotated rows moved verbatim (same stub form, nesting, text) — `diff` of the extracted block against the archived block → identical, 28/28 lines
- [x] No epic cohort split across the two files — manual check of the cut boundary (FE-121/CORE-601, both standalone rows) → clean
- [x] Pair R stays green on both files — inline shell loop mirroring CI's Pair R step → green

## 🧩 Subtasks

- [x] Count current `## Completed` rows (88) and determine the cut point (oldest 28 rows, lines 92–119) that keeps cohorts intact
- [ ] Cut the oldest rows from PLAN.md `## Completed`
- [ ] Append them verbatim to PLAN-ARCHIVE.md's existing `## Completed 2026-09` heading (at its current append position, before `## Completed 2026-08`)
- [ ] Verify row counts and cohort integrity
- [ ] Run validation

## 🔗 Related

- [[CORE-EPIC-638]] — parent epic (completed-rotation-debt)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task line matches current PLAN.md state exactly (88 checked rows vs. 60 bound, as the epic description states). Mechanical operator-motion task, no design decisions.

- [x] Read relevant source files — read `.flowtron/PLAN.md` `## Completed` section in full, `.flowtron/PLAN-ARCHIVE.md` heading structure, and `SPEC/plan-filing.md` §"`## Completed` rotation" for the granularity/cohort/append rules.

- [x] **Best Practices Review** — N/A, pure data-move task with no code/module boundaries.

- [x] **Archive skim** — N/A for this task shape (PLAN.md/PLAN-ARCHIVE.md rotation mechanics are fully specified in SPEC/plan-filing.md; no prior tasknote precedent needed beyond CORE-620/CORE-604.4 which are cited in the epic and SPEC itself).

- [x] **Drift check** — PLAN.md line description matches: "Move the oldest checked rows... into PLAN-ARCHIVE.md under the existing `## Completed 2026-09` heading, verbatim and epic cohorts intact, until the section is at or below 60 rows." Confirmed 88 rows present, `## Completed 2026-09` heading exists at PLAN-ARCHIVE.md:24. No divergence from SPEC/plan-filing.md §"`## Completed` rotation".

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed (--unattended). Assumption: "append position" for the existing 2026-09 heading means immediately before the next heading (`## Completed 2026-08`), per SPEC's append-only/in-place-extension rule and the file's own structure.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared.

**Discovery Notes:**

`## Completed` in PLAN.md holds 88 checked rows (lines 32–119), bound is 60 per `SPEC/plan-filing.md` §"`## Completed` rotation". Rows are ordered newest-first; oldest 28 rows (lines 92–119, dated 2026-09-12 through 2026-09-14) can be cut as a contiguous block without splitting any epic cohort — the cut boundary (line 91/92) falls between two standalone rows (`FE-121` and `CORE-601`), and no cohort straddles it. All 28 rows fall in September 2026, matching the existing `## Completed 2026-09` heading in PLAN-ARCHIVE.md (line 24), so no new heading is needed. Per SPEC's "existing position... regardless of which newer month blocks have since been inserted above it," the rows append at the section's current end (immediately before `## Completed 2026-08` at PLAN-ARCHIVE.md:137), not interleaved by date.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — Mirrors the CORE-620 rotation precedent (same mechanics, cited in SPEC's rotation section and the epic description); no new pattern needed.

- [x] **Minimal refactor gate** — N/A, no refactor; pure verbatim row relocation.

- [x] Implemented the minimal solution — cut lines 92–119 from `.flowtron/PLAN.md`, inserted verbatim before `## Completed 2026-08` in `.flowtron/PLAN-ARCHIVE.md`.

- [x] Updated/added tests for non-trivial behavior — N/A, no code/tests; data-file edit only.

**Implementation Notes:**

Used `sed` to extract lines 92–119 into a temp file, verified 28 lines / cohort-clean boundary, then removed those lines from PLAN.md and inserted them into PLAN-ARCHIVE.md immediately before the `## Completed 2026-08` heading.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` (Pair R's underlying suite scope; PLAN.md/PLAN-ARCHIVE.md have no dedicated unit test, verified via the Pair R shell check instead)

- [x] Ran lint/type-check on changed code — N/A, markdown data files, no lint/type-check target

- [x] **Verification receipt** — recorded below; no duplication, dead code, or stale documentation introduced (pure verbatim row relocation)

- [x] (frontend) N/A — not a frontend change.

**Testing Notes:**

- `awk '/^## Completed$/{f=1;next}/^## /{f=0} f' .flowtron/PLAN.md | grep -c '^\s*- \[x\]'` → `60` (exit 0)
- `diff` of extracted rows (lines 92–119 of original PLAN.md) vs. the block landed in PLAN-ARCHIVE.md → identical, 28/28 lines (exit 0)
- Pair R inline check (mirrors `.github/workflows/ci.yml` "Pair R — checked PLAN stub rows carry a shortname pipe") on both `.flowtron/PLAN.md` and `.flowtron/PLAN-ARCHIVE.md` → green (exit 0)
- `node --test tools/update-adopters.test.mjs` → 54 pass, 0 fail (exit 0)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs": no change. None of the listed docs cite `## Completed` row counts or rotation state.

- [x] Closed — all Acceptance criteria ticked; `status:` flipped to `completed` below; PLAN.md line to be flipped to stub form and moved to `## Completed` (standalone row) as part of this same edit; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Rotated the oldest 28 checked rows (`CORE-601` … `FE-115`, dated 2026-09-12 through 2026-09-14) from `.flowtron/PLAN.md` `## Completed` into `.flowtron/PLAN-ARCHIVE.md`'s existing `## Completed 2026-09` heading, at its current append position (immediately before `## Completed 2026-08`). `## Completed` in PLAN.md dropped from 88 to 60 rows — at the bound. Rows moved verbatim (byte-identical `diff`), no epic cohort split (cut boundary sat between two standalone rows), and no new archive heading created since all 28 rows fell in September. No refactor, no code touched. Verification: row count (60), verbatim diff, Pair R (green on both files), and `node --test tools/update-adopters.test.mjs` (54/54 pass) — all recorded in Testing Notes. `touches:` scope (`.flowtron/PLAN.md`, `.flowtron/PLAN-ARCHIVE.md`) matches `git diff --name-only` exactly, plus this tasknote and the PLAN.md stub-flip for CORE-638.2 itself. Doc-drift sweep: no change needed. Maintainability effect: brings the plan file back under its 60-row operator-motion bound, restoring headroom before the next advisory trip.

**Archived:** 2026-09-20
