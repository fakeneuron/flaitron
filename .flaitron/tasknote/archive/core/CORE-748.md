---
title: audit-scaffold-self-refs
status: completed
tags: []
created: 2026-10-08
due:
related-tasks: []
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-audit/SKILL.md
  - claude/skills/ft-audit/passes/backend.md
  - claude/skills/ft-audit/passes/frontend.md
  - claude/skills/ft-audit/scaffold-bootstrap.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-748 | audit-scaffold-self-refs

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 none

## 🎯 Goal

Make the `ft-audit` scaffold's self-references correct: the four stale "§5 step 2" area-prefix pointers name step 3, and `scaffold-bootstrap.md` §5 tells the filler to set the installed overlay's `name:`, `-<stack>` suffix (name, heading, invocation line) and `## Domains`.

## ✅ Acceptance

- [x] No "§5 step 2" remains in the scaffold — `! grep -rn '§5 step 2' claude/skills/ft-audit`
- [x] The two `passes/` area-prefix pointers and the two `SKILL.md` §0 pointers read "step 3" — `grep -c 'step 3' claude/skills/ft-audit/SKILL.md claude/skills/ft-audit/passes/backend.md claude/skills/ft-audit/passes/frontend.md`
- [x] `scaffold-bootstrap.md` §5's fill step names `name:`, the `-<stack>` suffix, and `## Domains` — `grep -nE 'name: audit|## Domains' claude/skills/ft-audit/scaffold-bootstrap.md`
- [x] Drift checks and context budgets stay green — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Retarget the four "§5 step 2" pointers to "§5 step 3" (SKILL.md ×2, passes/backend.md, passes/frontend.md)
- [x] Extend scaffold-bootstrap.md §5's closing fill paragraph with the `name:` / `-<stack>` / `## Domains` instructions
- [x] Run the Acceptance commands

## 🔗 Related

- Surfaced by audit-docs 2026-10-08 (Finding #5, Medium; Finding #11, Low).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both defects reproduce on HEAD: SKILL.md §5 step 2 is the filing-commit pre-check and step 3 is where "Pick the next free `<N>` per area prefix" lives; scaffold-bootstrap.md §5 ends with a fill paragraph naming only `## Deltas` and `flaitron-tracks:`, while templates/audit-overlay-template.md carries `name: audit-<stack>`, `<stack>` in description/heading/invocation line, and a `<…>` `## Domains` slot.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Best practices: doc-only edits to a lazy SKILL fragment and three scaffold files; no module-boundary or code change (`N/A`).
- Archive skim: 8 hits in `archive/core/` (CORE-682, 721, 722, 724.4/.5/.7, 741.4, 744); `grep` for `§5 step`, `name:`, `<stack>` in them returned nothing, so no prior decision constrains these edits.
- Drift check: `performance.md` ("dispatcher §5 step 3", write-step extra) and `security.md` ("§5 step 4", no-code-changes exception) cite the right steps and are left alone; exactly four "§5 step 2" sites exist (SKILL.md lines 18 and 25, passes/backend.md:42, passes/frontend.md:43). SKILL.md §0 is deleted by forks, so its two edits only affect the shipped scaffold.
- Install name: the command wrapper installs as `audit` (`cp ... .claude/commands/audit.md`; flaitron-self overlay is `name: audit`), so the fill step sets `name:` to `audit` and the invocation line to `/audit <domain> [scope]`.
- Clarifications: No clarifications needed (--fast). Assumptions: scope is the two defects named in the row; the template itself is untouched.


## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Four `§5 step 2` → `§5 step 3` (SKILL.md ×2, passes/backend.md, passes/frontend.md). `performance.md` (step 3) and `security.md` (step 4) were already right.
- `scaffold-bootstrap.md` §5 fill paragraph now drops the `-<stack>` suffix everywhere (`name: audit`, `# audit`, `/audit <domain> [scope]`), fills `description:`'s `<stack>` with the project name, and fills `## Domains`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Pattern survey: extended the existing fill paragraph; no new shape. Tests: N/A (markdown only). Lint/type-check: N/A (no code); `bash tools/drift-checks.sh` covers markdown.
- `! grep -rn '§5 step 2' claude/skills/ft-audit` → 0
- `grep -c 'step 3' SKILL.md passes/backend.md passes/frontend.md` → 0 (5 / 1 / 1)
- `grep -cE 'name: audit|## Domains' claude/skills/ft-audit/scaffold-bootstrap.md` → 0 (2 hits)
- `bash tools/drift-checks.sh` → 0 (re-run after the reword)
- 👁️ CONFIRM: N/A (no rendered surface).
- External review (`/code-review medium`, 5 findings): (1) name/`<stack>` wording ambiguous — **fixed** by the reword above, checked against `docs/MIGRATION.md` (both `audit` and `audit-*` shapes exist; the bootstrap installs `audit`); (2) fill paragraph precedes the never-overwrite guard — **note**, pre-existing order, the paragraph only operates on the just-copied file, no change; (3) line-122 reading — **note**, flaitron-self is an install context (step 2), not a non-adopter, so no contradiction; (4) tasknote unticked — expected mid-flow, resolved at closure; (5) step numbers implicit across five files — **note**, pre-existing design, no change.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Fixed four stale `§5 step 2` area-prefix pointers in the `ft-audit` scaffold and gave `scaffold-bootstrap.md` §5 the missing overlay fill instructions (`name:`, `-<stack>` suffix, `## Domains`). Drift checks green; `touches:` matched `git diff --name-only`. Doc-drift sweep: no change.

**Archived:** 2026-10-08
