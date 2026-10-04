# CORE-010 | Reference flowtron in `~/Code/CLAUDE.md` as a suggested workflow option

**Goal:** Mention flowtron in `~/Code/CLAUDE.md` (workspace standards) as a suggested workflow option for new repos under `~/code/`, without implying that projects still on legacy systems (fintown, InvisiPaw) are out of compliance.

**Priority:** Medium
**Area:** core
**Model:** opus
**Status:** In Progress

## Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** PLAN.md line said "as canonical workflow"; user clarified flowtron should be presented as an option/suggestion since fintown and InvisiPaw haven't migrated yet. Framing flowtron as canonical at the workspace level would imply non-adopters are out of compliance. PLAN.md line + tasknote header re-scoped to match.

- [x] Read relevant source files
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Defined concrete execution steps below

**Discovery Notes:**

- Target file: `~/Code/CLAUDE.md` — workspace-standards layer above per-project `CLAUDE.md` files. Already loaded into every Claude Code session under `~/code/` via the harness's CLAUDE.md hierarchy.
- Existing section "Shared Workflow Philosophy" already speaks abstractly about "tasknote / plan-driven workflow (PLAN.md or plan.json + 4-phase tasknotes)" and explicitly says *"When a project defines its own task lifecycle, follow it precisely."* That's the natural insertion point — flowtron is a concrete realization of the abstract pattern that section already describes.
- Drift: none. The single path cited (`~/Code/CLAUDE.md`) exists. The "Shared Workflow Philosophy" section heading still matches.
- **No clarifications needed.** Explicit assumptions:
  - Extend the existing "Shared Workflow Philosophy" section rather than add a new section — keeps the workspace doc compact and reflects flowtron's actual relationship to the rule (it is *an* implementation, not a replacement).
  - Don't enumerate adopters (photard, flowtron itself) by name — names rot as more projects migrate and would force this doc to be edited every time. Generic "some projects under ~/code/ have adopted it" language stays evergreen.
  - Frame flowtron as "available" / "consider", not "preferred". Legacy plan.json + scripts (fintown) and free-form PLAN.md (InvisiPaw) remain valid until those projects migrate. The existing rule *"prefer the project's own task tracking system over ad-hoc notes"* already covers this.
  - Pointer to flowtron's docs (`~/code/flowtron/SPEC.md`, `docs/PHILOSOPHY.md`, `docs/MIGRATION.md`) for the curious, but no inline how-to — MIGRATION.md is the how-to.

**Execution Steps:**

1. Edit `~/Code/CLAUDE.md` — extend "Shared Workflow Philosophy" with a short paragraph naming flowtron as a suggested option for new repos, plus a pointer to its docs.
2. Verify the new prose composes cleanly with existing rules ("follow the project's own task lifecycle precisely" must remain dominant).
3. Update flowtron `_project/PLAN.md` (re-scope line, then in Phase 4 flip to `[x]` with `Completed YYYY-MM-DD`, move into `Completed` section).
4. Move this tasknote to `_project/tasknote/archive/core/CORE-010.md`.

## Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior
- [x] Ran targeted tests on changed files

**Implementation Notes:**

- Pattern survey: existing "Shared Workflow Philosophy" section uses single-line bullets; "Tech Stack Tendencies" includes a multi-line bullet. Multi-line bullets are an established shape in this file, so extending the section with one is a clean fit (vs. inventing a new section).
- Edit: appended a single bullet to "Shared Workflow Philosophy" naming flowtron as a ready-made option for new repos, with pointers to `SPEC.md` and `docs/MIGRATION.md`. Explicit "Suggestion, not a requirement; pre-existing legacy systems remain valid" framing per re-scope.
- Surgical change — no other content in `~/Code/CLAUDE.md` touched. Existing rules preserved (especially "When a project defines its own task lifecycle, follow it precisely" — still dominant).
- No tests applicable: prose change in an assistant-facing instructions file.

## Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation
- [x] Fixed all introduced issues

**Testing Notes:**

- Tests / lint / type-check: N/A — markdown instructions file, no executable code touched.
- Visual confirmation: diff sent to user for review before Phase 4 archive.

## Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change
- [x] Updated PLAN.md (status flipped to `Completed YYYY-MM-DD`)
- [x] Moved this tasknote to `_project/tasknote/archive/<area>/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Added a fourth bullet to `~/Code/CLAUDE.md` "Shared Workflow Philosophy" naming flowtron as a suggested option for new repos, with pointers to `SPEC.md` and `docs/MIGRATION.md`. Re-scoped from PLAN.md's original "as canonical workflow" framing — flowtron is now presented as a ready-made option, not a workspace-wide mandate. Pre-existing legacy systems explicitly remain valid until those projects choose to migrate.

Key decisions: extended the existing "Shared Workflow Philosophy" section instead of opening a new one (flowtron is a concrete realization of the abstract pattern that section already describes); kept the language adopter-agnostic (no project names by design) so the doc stays evergreen; `~/Code/CLAUDE.md` is the only file modified outside flowtron's `_project/`.

**Archived:** 2026-04-30
