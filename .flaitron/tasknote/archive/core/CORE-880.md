---
title: sparse-size-figures
status: completed
tags: []
created: 2026-11-07
due:
related-tasks: []
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - docs/MIGRATION.md
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - claude/skills/ft-adopt/SKILL.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-880 | sparse-size-figures

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-735.4]]

## 🎯 Goal

Refresh the sparse-checkout size figures in `docs/MIGRATION.md` §1.1 to measured values, and replace the copies in the four `*/AGENTS-snippet.md` files and `claude/skills/ft-adopt/SKILL.md` with "most of the checkout by bytes" plus a pointer to `docs/MIGRATION.md` §1.1.

## ✅ Acceptance

- [x] `docs/MIGRATION.md` §1.1 states the measured figures (~17 MB across ~1,300 files; ~20.7 → ~3.2 MB) and none of the old ones — `grep -c '17 MB across ~1,300 files' docs/MIGRATION.md` → 1; `! grep -nE '16 MB|1,200 files|18\.9' docs/MIGRATION.md`
- [x] The four snippets and `claude/skills/ft-adopt/SKILL.md` carry no MB / file-count figure and name "most of the checkout by bytes" — `grep -nE '[0-9] MB|1,[0-9]00 files'` over the five files finds nothing, and `tr '\n' ' ' <$f | grep -q 'most of the checkout by bytes'` succeeds for each
- [x] Each of those five files points at `docs/MIGRATION.md` §1.1 — `tr '\n' ' ' <$f | grep -qE 'MIGRATION\.md`?(\]\([^)]*\))? ?§1\.1'` succeeds for each (joined lines: the snippets hard-wrap)
- [x] Repo validation stays green — `just check` (includes `bash tools/drift-checks.sh`)

## 🧩 Subtasks

- [x] Edit `docs/MIGRATION.md` line 70: ~16 MB / ~1,200 files → ~17 MB / ~1,300 files; ~18.9 → ~3.0 MB → ~20.7 → ~3.2 MB
- [x] Edit the four `*/AGENTS-snippet.md` figure parentheticals → "most of the checkout by bytes" + §1.1 pointer
- [x] Edit `claude/skills/ft-adopt/SKILL.md` lines 80 and 105 likewise
- [x] Run the Acceptance verify commands and `bash tools/drift-checks.sh`

## 🔗 Related

- [[CORE-735.4]] — sparse-checkout-docs: wrote the §1.1 prose and the figures being refreshed

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The figures are stale against HEAD (measured below) and the same numbers are copied in six places that drift independently; the row is still open and no later task touched them.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Read: `docs/MIGRATION.md` §1.1 (line 70), `claude/AGENTS-snippet.md` line 102, `cursor|codex|grok/AGENTS-snippet.md` figure parentheticals, `claude/skills/ft-adopt/SKILL.md` lines 80 and 105. The grep across the repo (archive, `viz/`, `node_modules` excluded) found no other copy; `docs/VERSION-HISTORY.md:109` holds the historical "~18.5 → ~2.9 MB" for a past release and is a record, not a live figure — left alone.
- Measured at HEAD c610ca1f (tracked bytes via `git ls-files` + `cat | wc -c`): `.flaitron/` = 1,319 files, 17,429,974 B (~17 MB, ~1,300 files); whole tree = 20,670,708 B; tree without `.flaitron/` = 3,240,734 B. So the figures read ~20.7 → ~3.2 MB. The PLAN row says ~20.6; 20,670,708 B rounds to 20.7, so this run writes the measured ~20.7 and records the 0.1 MB difference here.
- Scope of the replacement (PLAN row): the four snippets and `ft-adopt` carry "(~16 MB, ~1,200 files)"; `ft-adopt` line 80 also carries "~18.9 → ~3.0 MB". All become "most of the checkout by bytes" with a §1.1 pointer. The three non-Claude snippets and the `ft-adopt` line already point at §1.1 or get one added; the Claude snippet's tail already does.
- Archive skim: `grep -lE 'sparse|~16 MB|18\.9' archive/core/` → 15 notes; read CORE-735.3 / .4 (the decision and the §1.1 prose: measured 18.5 → 2.9 MB at the time, "~85% of the working tree" and "grows with every release"), CORE-809 (a prior sweep that removed the stale 18.5/2.9 figures — the same drift class this row fixes). Load-bearing: the figures were always measured snapshots and go stale per release, which is why this row replaces the per-copy figures with "most of the checkout by bytes" and keeps measured numbers only in §1.1.
- Best Practices Review: N/A — prose-only edit, no code or module boundary.
- No clarifications needed (--unattended): assumptions — figures measured by tracked-file bytes (decimal MB), the same basis as the existing numbers; wording is the PLAN row's own phrase.
- Size estimate: ~14 lines (rename-aware)
- Phase 1→2: Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: prose-only; each edit swaps the figure parenthetical in place and keeps the surrounding sentence, so the six copies stay parallel. The three non-Claude snippets and the Claude snippet already pointed at §1.1; `ft-adopt` line 80 gained an inline pointer (the old text had no pointer there), line 105 gained one too.
- Edits: `docs/MIGRATION.md:70` (~16 → ~17 MB, ~1,200 → ~1,300 files, ~18.9 → ~20.7 MB and ~3.0 → ~3.2 MB); four snippets `(~16 MB, ~1,200 files)` → `(most of the checkout by bytes)`; `ft-adopt` SKILL lines 80 and 105. 7 lines changed in 6 files.
- Minimal refactor gate: none needed. Tests: N/A — wording-only change, no behavior; `just check` covers the drift pairs.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface (markdown prose only)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Full validation set (`--unattended`): the justfile defines `check`, `test`, `lint`, `typecheck`, `build`; `check` reaches all of them by dependency.

```text
just check                                    → 0   (viz test/typecheck/lint/build, update-adopters + drift-checks suites, bash tools/drift-checks.sh all ok)
grep -c '17 MB across ~1,300 files' docs/MIGRATION.md   → 1
grep -c '~20.7 MB to ~3.2 MB' docs/MIGRATION.md         → 1
grep -nE '16 MB|1,200 files|18\.9' docs/MIGRATION.md    → 1 (no match)
grep -nE '[0-9] MB|1,[0-9]00 files' <five files>        → 1 (no match)
joined-line 'most of the checkout by bytes' per file    → present in all 5
joined-line MIGRATION.md §1.1 pointer per file          → present in all 5 (claude snippet via link form `[`docs/MIGRATION.md`](../docs/MIGRATION.md) §1.1`; first regex missed the link syntax, rechecked)
```

Scope guardrails (before Phase 3): `git diff --no-renames --name-only HEAD` = the six `touches:` paths; plus this note. Size 7 added + 7 deleted = 14 lines against the 400 cap. Both clear.

External review (`/code-review medium` over the working-tree diff, a context that did not write it) — no blockers, five notes:

1. Arithmetic: 17 MB vs 20.7 − 3.2 = 17.5. Rounding of the measured 17.43 / 20.67 / 3.24 MB; each figure is the nearest tenth or whole MB — no change.
2. Hand-maintained figures in §1.1 will go stale again — accepted: the PLAN row keeps measured figures in exactly one place and removes the other copies, which is what limits the drift; no drift check proposed (would be a new feature).
3. Snippets lose the concrete scale — accepted: the row asks for exactly this wording; the §1.1 pointer carries the numbers.
4. Wrapped-line width in codex/cursor/grok — cosmetic; the neighbouring lines in codex/grok already run to 104 chars. No change.
5. Bare `docs/MIGRATION.md` path in `ft-adopt` — matches the existing `Reference: docs/MIGRATION.md §1.1` convention in the same file. No change.

Nothing to file.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:** Refreshed the sparse-checkout size figures in `docs/MIGRATION.md` §1.1 to measured values (~17 MB across ~1,300 files; ~20.7 → ~3.2 MB) and replaced the stale copies in the four `*/AGENTS-snippet.md` files and `claude/skills/ft-adopt/SKILL.md` with "most of the checkout by bytes" plus a §1.1 pointer, so the numbers now live in one place.

- Changed: 6 files, 7 lines added / 7 deleted. Verification: `just check` → 0; every Acceptance grep passed (see Testing Notes). External review: no blockers, five notes, none acted on.
- Doc-drift sweep: the edited files are themselves the AI-referenced docs that carried the figures; every other entry — no change (a repo-wide grep found no other live copy; `docs/VERSION-HISTORY.md` keeps a historical ~18.5 → ~2.9 MB record by design).
- Scope: Declared 6 files, changed 6. Undeclared: none.
- Figure deviation: the PLAN row said ~20.6 MB; the measured 20,670,708 B rounds to ~20.7 MB, so §1.1 says ~20.7.
- Refactors: none made or deferred. Maintainability: six hand-copied sets of figures become one, so the next stale-size audit has a single place to fix.
- Learnings: N/A.

**Archived:** 2026-11-07
