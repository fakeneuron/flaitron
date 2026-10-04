---
title: plan-completed-rotation
status: completed
tags: []
created: 2026-08-24
due:
related-tasks: []
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-467 | plan-completed-rotation

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Declare a bound on `PLAN.md` §`## Completed` — a rotation contract that spills
older closed rows verbatim into a sibling `.flowtron/PLAN-ARCHIVE.md`, so the
active plan file stops growing without number without losing any record.

## ✅ Acceptance

- [x] `SPEC/tasknote-selection.md` declares the rotation contract: bound, advisory threshold, archive-file path, month-block granularity, and the two never-split rules (current month; epic cohort)
- [x] The contract states rotation is an **operator motion** — surfaced advisory-only, never auto-applied (consistent with `SPEC.md` §"What flowtron does NOT provide")
- [x] Rotated rows are **verbatim and append-only** — self-contained inline-audit-fix rows (which have no archive tasknote) survive intact
- [x] `/ft-task` Step 1 surfaces the advisory when the bound is breached, mirroring the existing 70-word filing-discipline warning
- [x] `.flowtron/PLAN-ARCHIVE.md` exists and holds flowtron's own first rotation; `PLAN.md` §`## Completed` is at or below the declared bound (modulo the current-month rule)
- [x] No closed row is lost: pre-rotation row count == post-rotation `PLAN.md` rows + `PLAN-ARCHIVE.md` rows
- [x] `templates/PLAN.md` and `docs/MIGRATION.md` tell adopters the file exists and when it appears
- [x] Follow-ups filed for the two consumers that must learn to read both files: `viz/src/parser.ts` (FE) and `/ft-stats` (CORE)

## 🧩 Subtasks

- [x] Add §"`## Completed` rotation" to `SPEC/tasknote-selection.md`, directly after §"`## Completed` archive convention"
- [x] Wire the advisory into `claude/skills/ft-task/SKILL.md` Step 1 next to the 70-word filing-discipline check
- [x] Create `.flowtron/PLAN-ARCHIVE.md` with its header + provenance pointer
- [x] Rotate flowtron's own 2026-04 / 05 / 06 / 07 month blocks out of `PLAN.md`, verifying no epic cohort is split at the boundary
- [x] Verify row-count conservation (pre == post split across both files)
- [x] Note the archive file in `templates/PLAN.md` comment block and `docs/MIGRATION.md`
- [x] File FE follow-up (viz parser reads both files) and CORE follow-up (`/ft-stats` merges both) via `/ft-file-followup`
- [x] Phase 4: doc-drift sweep over `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🔗 Related

- [[CORE-007]] — `related-decision:` the founding adopter migration that *collapsed* `PLAN.md` + `ROADMAP.md` + `PLAN_ARCHIVE.md` + `FUTURE_OPPORTUNITIES.md` into one file; this task must not re-open that
- [[CORE-008]] — `related-decision:` same migration against a 124 KB `PLAN.md`; the size problem is not new

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** See Discovery Notes — the PLAN line frames a real decision between two live shapes; the task is to pick one and declare it.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Verdict:** Proceed.
**Rationale:** The PLAN line names a real, measurable problem and frames it as a
decision between two shapes. Both shapes are live; the task is exactly to pick
one and write it down. No re-scope needed.

**Drift check.** The line's figures have drifted since the 2026-08-23 audit that
surfaced them, in the same direction:

| Metric | PLAN line (audit) | Measured 2026-08-24 |
|---|---|---|
| `PLAN.md` size | 78.5 KB | **81.3 KB** |
| Completed rows | 551 | **827** checked rows |
| Open tasks | zero | **3** (FE-092, CORE-466, CORE-467) |

`SPEC.md` is 64.4 KB — `PLAN.md` is indeed the larger file. Monthly close rate
from the date histogram: 2026-04 → 15, 05 → 355, 06 → 110, 07 → 125, 08 → 197.
No SPEC contract contradicts the plan this note forms.

**Consumers of `## Completed`** (who breaks if the section moves):

| Consumer | Dependency | Effect of a split |
|---|---|---|
| `viz/src/parser.ts` | `SECTION_HEADINGS` set incl. `'Completed'`; parses one file | Loses rotated history until taught to read both — **follow-up** |
| `/ft-stats` | Needs *all-time* velocity + model distribution, plus a 30d window | All-time numbers truncate unless it merges both — **follow-up** |
| `/ft-close-epic` | Moves a parent + cohort into `## Completed` | Unaffected — writes at the top, always the current month |
| Runner skills (Step 1 / post-closure re-read) | Read the whole file | **Primary beneficiary** — this is the cost being paid per task |

**Archive skim** (`archive/core/`, 626 notes; `archive/fe/`, `archive/test/`):

- **[[CORE-007]] / [[CORE-008]] — load-bearing.** flowtron's founding adopter
  migration explicitly collapsed four root planning files, `PLAN_ARCHIVE.md`
  among them, into a single `PLAN.md`. A naive split ledger re-creates exactly
  what was removed. **Reconciled:** the CORE-007/008 objection was *scattered
  active planning* — a reader had to check four files to know what was open.
  A rotation file holding only closed rows carries zero active work, so the
  single-active-plan-file property is preserved. This distinction is why the
  contract below binds rotation to closed rows only.
- CORE-008 recorded a 124 KB `PLAN.md` at an adopter. The growth problem is a
  known flowtron-shape issue, not a flowtron-self quirk.
- The `## Completed` stub form (long description dropped; archived tasknote is
  canonical) is already established across CORE-036/043/044/045/046/048/050/052/056.

**Hard constraint — inline audit fixes.** Per §"`## Completed` archive
convention", an inline `/ft-audit` fix has *no tasknote and no archive file*;
its PLAN line **is** the canonical record. Any drop-based retention window
would destroy those records. This is the decisive argument for rotate-don't-delete.

**Precedent reused.** The 70-word filing-discipline warning in `/ft-task` Step 1
is already an advisory-at-threshold that never blocks. The rotation advisory
copies that shape exactly rather than inventing a new mechanism, and stays
inside `SPEC.md` §"What flowtron does NOT provide" (no validator, no CLI, no
daemon — the control is the human at the gate).

**Structure of the existing section.** Flat, newest-first, no subheadings; epic
parents carry 2-space-nested children. Two rules fall out: never split an epic
parent from its children across the boundary, and cut on whole-month blocks so
the archive stays greppable.

**Clarifying questions — asked (AskUserQuestion), three answers:**

| Question | Decision |
|---|---|
| Bound shape | **Rotate to sibling archive** (`.flowtron/PLAN-ARCHIVE.md`), nothing deleted |
| Task scope | **Declaration + first rotation**, consumer updates filed as follow-ups |
| Trigger | **Advisory threshold**, mirroring the 70-word filing-discipline warning |

**Resolved design** (derived from those answers plus the constraints above):

- **Bound:** 100 checked rows under `## Completed`.
- **Advisory fires at:** >150 rows (hysteresis — rotation is not a per-task chore).
- **Archive:** `.flowtron/PLAN-ARCHIVE.md`, newest-month-first, `## Completed <YYYY-MM>` headings.
- **Granularity:** whole calendar-month blocks.
- **Never rotate the current calendar month** — this rule wins over the bound, so
  `## Completed` may legitimately exceed 100 when the current month alone does
  (flowtron-self today: 2026-08 has 197).
- **Never split an epic cohort** — a nested child follows its parent's block.
- **Rows move verbatim, append-only.** The archive is never rewritten.
- **Rotation is an operator motion.** Nothing auto-applies.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — **N/A**: no shipped code changed; verification is the conservation + parser checks in Testing Notes

**Implementation Notes:**

**Pattern survey.** The advisory extends the existing 70-word filing-discipline
warning in `/ft-task` Step 1 — same location, same `⚠️`-line shape, same
"informational only, do not block" closing sentence. No new mechanism. The
contract section sits in the module that already owns `## Completed`'s other
convention, directly beneath it, rather than in a new module.

**Minimal refactor gate.** No refactor. Every touched line traces to the
rotation contract or to a doc site it falsified.

**Contract gap found mid-execution.** 25 of the 827 rows carry no
`Completed YYYY-MM-DD.` token — they are the inline-audit-fix exception rows,
which use `Surfaced by <label> YYYY-MM-DD … fixed inline` instead. The first
rotation attempt crashed on them. Fixed by adding a **Date resolution** rule to
the contract (`Completed` token → `Surfaced by` clause → not rotated) rather
than special-casing the script. Verified all 25 carry a resolvable
`Surfaced by` date. This also exposed a latent `/ft-stats` gap, now folded into
CORE-470: those rows are silently skipped from stats today.

**Epic-cohort boundary.** Two cohorts span months — `CORE-EPIC-389`
(2026-08 parent, 2026-07 children) and `CORE-EPIC-254` (2026-06 parent,
2026-05 children). Both resolved correctly under the never-split rule: children
travel with the parent's block, so `CORE-EPIC-389` stays in `PLAN.md` despite
having 2026-07 children.

**Rotation performed.** Kept 2026-08 (207 rows); rotated 2026-07 / 06 / 05 / 04
(620 rows) into `.flowtron/PLAN-ARCHIVE.md`. `PLAN.md` 81.3 KB → 22.5 KB
(−72%), now well below `SPEC.md`'s 64.4 KB — the size inversion the audit
flagged is resolved.

**Downstream-impact scan** (two new filings, FE-094 + CORE-470): active entries
FE-092 (`ui/*Row.tsx`) and CORE-466 (`docs/AGENT-NEUTRALITY.md`) share no
surface with `parser.ts` or `/ft-stats`. All **unaffected** — no edits proposed.

**Neutrality ledger.** The new contract section names `/ft-stats` as a history
consumer — a canonical flowtron skill name in the contract layer that the
`SPEC/tasknote-selection.md` row of `docs/AGENT-NEUTRALITY.md` did not cover.
Registered in that same row. (Independent of CORE-466's three references, which
remain open.)

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — **N/A**: no frontend code changed (markdown + plan-data only)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

| Check | Result |
|---|---|
| `npm --prefix viz test` | **449 passed / 25 files** |
| `npm --prefix viz run typecheck` | clean |
| `npm --prefix viz run lint` | clean |
| Row conservation (multiset equality) | **827 = 207 + 620**, rows byte-identical, zero lost or altered |
| Open sections byte-identical pre/post | yes — `diff` above `## Completed` is empty |
| `PLAN.md` through real `parsePlanWithDiagnostics` | 212 tasks, **zero diagnostics** (207 completed + 5 open) |
| `PLAN.md` pre-rotation, same parser | 830 tasks, zero diagnostics |
| `PLAN-ARCHIVE.md` through same parser | 0 tasks, **zero diagnostics** |

The archive result is the load-bearing one for FE-094: today's parser ignores
`## Completed <YYYY-MM>` headings cleanly (they miss `SECTION_HEADINGS` *and*
the near-miss check), so it reads the archive as empty rather than mis-parsing
it. FE-094 is a pure addition, not a fix.

No viz source changed — the parser run above used a throwaway harness, removed
before commit. **Quality assertions:** markdown-only diff; no duplication, dead
code, unexplained complexity, or public-surface growth. One visible effect to
expect: until FE-094 lands, the visualizer's Completed column shows 207 rows
instead of 830. Intended and temporary; no data lost.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Doc-drift sweep** — 17 AI-referenced docs walked; 3 drifted, all fixed:

| Doc | Verdict |
|---|---|
| `README.md` | **Updated** — state-model bullet claimed the `## Completed` history lives "in one scannable file"; now describes rotation |
| `AGENTS.md` | **Updated** — repo-layout bullets had no `.flowtron/PLAN-ARCHIVE.md` entry |
| `SPEC.md` | **Updated** — §"When to use a tasknote" summary of what the module carries omitted the rotation bound |
| `docs/MIGRATION.md` | **Updated** (deliverable, not drift) — §1.4 adopter note + `/ft-stats` row |
| `docs/AGENT-NEUTRALITY.md` | **Updated** — registered `/ft-stats` for the new section |
| `docs/EXTERNAL-AGENTS.md` | No change — describes closure writing the stub to `## Completed`; still exact |
| `claude/` · `codex/` · `cursor/` · `grok/AGENTS-snippet.md` | No change — wiring only |
| `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/WORKTREES.md` | No change — zero `Completed` references |

**Checked and clear:** `/ft-release` §7.1's Standing README task-counter check
derives its number from `find .flowtron/tasknote/archive -name "*.md" | wc -l`
— the archive *directory*, not `PLAN.md` — so rotation does not move it and the
README counter is unaffected.

**Deferred:** `docs/GLOSSARY.md` has no "rotation" entry. It sits outside the
AI-referenced sweep set, and adding a term would require bumping the "~60
entries" counter `/ft-release` §7.1 gates on — scope creep into a release
surface. Flagged here rather than filed.

**Archived:** 2026-08-24
