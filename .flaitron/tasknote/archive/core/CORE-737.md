---
title: symlink-sparse-guard
status: completed
tags: []
created: 2026-10-08
due:
related-tasks: [CORE-735.N]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-update/SKILL.md
  - claude/skills/ft-new-project/SKILL.md
  - docs/MIGRATION.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-737 | symlink-sparse-guard

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-735.N]]

## 🎯 Goal

Skip the `.flaitron/` sparse-checkout trim when the flaitron path is a symlink (SECURITY.md's local-dev link), so it can't trim the linked flaitron checkout's own `.flaitron/`.

## ✅ Acceptance

- [x] `ft-update` Step 1 gates the sparse re-apply on `<FT>` not being a symlink and names the skip in its outcome list — `grep -q 'symlink' claude/skills/ft-update/SKILL.md`
- [x] `ft-new-project` Step 2 skips the sparse line when `.flaitron/core` is a symlink — `grep -q 'symlink' claude/skills/ft-new-project/SKILL.md`
- [x] MIGRATION §1.1 carries the symlink clause and the `sparse-checkout disable` recovery — `grep -q 'sparse-checkout disable' docs/MIGRATION.md`
- [x] Recipe string unchanged at every site — `git grep -ho "sparse-checkout set --no-cone '[^']*' '[^']*'" -- ':!.flaitron' | sort | uniq -c` shows one variant
- [x] Budgets and drift hold — `bash tools/drift-checks.sh` exits 0

## 🧩 Subtasks

- [x] `ft-update` Step 1: gate the sparse bullet on `test -L <FT>` false; add "skipped (symlinked core)" to the outcome list
- [x] `ft-new-project` Step 2: one clause skipping the sparse line when `.flaitron/core` is a symlink
- [x] MIGRATION §1.1: one clause + recovery (`git -C <checkout> sparse-checkout disable`)
- [x] Verify (greps, recipe-string uniq, drift-checks)

## 🔗 Related

- [[CORE-735.N]] — audit that surfaced this (follow-up candidate 1)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN line matches CORE-735.N follow-up candidate 1 and current code; the three sites still carry the unguarded sparse line.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Sites read: `ft-update` Step 1 (first bullet, unconditional re-apply; outcome list "re-applied / already sparse / skipped on older git"), `ft-new-project` Step 2 (sparse line + git ≥ 2.35 sentence), MIGRATION §1.1 (code fence + "On older git, skip it" in the explainer paragraph). MIGRATION's bump step 2 (~line 492) says "Re-apply §1.1's sparse-checkout", so it inherits the §1.1 clause; left alone.
- Archive skim: `archive/core/` hits are CORE-735.2–.4 and .N; .N's probe confirmed the trim through a symlink and that no fleet adopter uses a symlinked core. `.4` set the recipe-string byte-identity invariant (6 sites) — the guard must not touch the command text.
- Mirrors: `codex/skills/ft-update` has no sparse text; cursor/grok snippets point at MIGRATION §1.1 → inherit.
- Budgets: `ft-update` 19,414 / `ft-new-project` 13,766 against a 33,000 per-skill cap; MIGRATION is exempt. A one-clause addition is far inside headroom.
- Detection: `test -L <FT>` (the path as resolved in Step 0). Skip is silent-safe: no state written, so nothing to undo; Step 3b's fence still covers the path.
- Clarifications: No clarifications needed. Assumptions: scope is the three named sites only; fleet updater unchanged (already doesn't apply sparse).
- Drift check: PLAN line, SPEC, and cited paths match current files.

Judgment: Discovery surfaced no significant deviation → skip 🛠️.



## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey: extended each site's existing older-git skip sentence; the `test -L` clause mirrors it. Three one-line edits, command text untouched. No refactor. No tests apply (markdown-only).


## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -q 'symlink' claude/skills/ft-update/SKILL.md` → 0
- `grep -q 'symlink' claude/skills/ft-new-project/SKILL.md` → 0
- `grep -q 'sparse-checkout disable' docs/MIGRATION.md` → 0
- `git grep -ho "sparse-checkout set --no-cone …" | sort | uniq -c` → one variant, 5 hits
- `bash tools/drift-checks.sh` → 0
- Lint/type-check: N/A (markdown only). Skill sizes 19,577 / 13,935, under the 33,000 cap.
- External review: N/A — 3-line markdown diff, too small to grade.
- Visual confirmation: N/A (no frontend).


## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Guarded the sparse trim against a symlinked flaitron path in `ft-update` Step 1 (`test -L <FT>`, new outcome in the recap list), `ft-new-project` Step 2, and MIGRATION §1.1 (with the `sparse-checkout disable` recovery). Doc-drift: CONTEXT-BUDGET's ledger sizes for these files were already stale before this change; no change made. touches: reconciled — diff matches the three declared paths. Learnings: N/A (CORE-735.N already recorded the lesson).


**Archived:** 2026-10-08
