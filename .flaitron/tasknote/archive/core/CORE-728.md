---
title: snippet-bumping-dedupe
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-724.5]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/AGENTS-snippet.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-728 | snippet-bumping-dedupe

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-724.5]]

## 🎯 Goal

Cut `claude/AGENTS-snippet.md` §"Bumping the pinned flaitron version"'s fallback paragraph to a pointer at `docs/MIGRATION.md` §"Pinning and bumping", keeping the `/ft-update` sentence.

## ✅ Acceptance

- [x] Fallback paragraph no longer restates tag fetch/checkout or `git add` re-pin — `! grep -q 'Fetch + checkout the target tag' claude/AGENTS-snippet.md`
- [x] Snippet points at MIGRATION §"Pinning and bumping" — `grep -q 'Pinning and bumping' claude/AGENTS-snippet.md`
- [x] `/ft-update` sentence kept — `grep -q 'Run `/ft-update` from the project root' claude/AGENTS-snippet.md`
- [x] Snippet paste-block still renders sensibly — `judgment` (prose edit; no command decides it)

## 🧩 Subtasks

- [x] Replace the `Manual equivalent…` paragraph with a one-sentence pointer
- [x] Run the Acceptance greps

## 🔗 Related

- [[CORE-724.5]] — deferred this dedupe

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The snippet's fallback paragraph duplicates MIGRATION §"Pinning and bumping" (tag message, fetch/checkout, re-pin). The section sits outside the paste-block fence (line 14–30), so the pointer uses the repo-relative `../docs/MIGRATION.md` form, as line 73 does.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Drift check: PLAN line matches the snippet (§ at line 115, fallback at 119). `claude/skills/ft-update/SKILL.md:245` cites only the section heading, which stays. No other file quotes the fallback prose.
- Archive skim: `archive/core/` hits for the snippet are release/wiring tasknotes; none constrain this paragraph. Recorded: CORE-724.5 deferred this.
- Clarifications: No clarifications needed (--fast). Assumption: a pure pointer (no residual "no CHANGELOG.md" hint) is intended — MIGRATION step 1 already names the tag message.
- Best Practices Review: N/A — prose edit, no code or module boundary.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey: extends the snippet's existing cross-link style (`[`docs/MIGRATION.md`](../docs/MIGRATION.md)` at line 73). Minimal refactor gate: none needed. Replaced the one `Manual equivalent…` paragraph with a one-line pointer; the `/ft-update` paragraph is untouched. Tests: N/A — no behavior; the adopters-updater suite was run as a guard anyway.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `! grep -q 'Fetch + checkout the target tag' claude/AGENTS-snippet.md` → 0
- `grep -q 'Pinning and bumping' claude/AGENTS-snippet.md` → 0
- `grep -q 'Run `/ft-update` from the project root' claude/AGENTS-snippet.md` → 0
- `node --test tools/update-adopters.test.mjs` → 0 (65 pass, 0 fail)
- Lint/type-check: N/A — markdown-only change (no viz/ code touched).
- External review: N/A — one-paragraph, one-line-pointer diff is too small to grade independently.
- 👁️ CONFIRM: N/A — no rendered surface.
- Judgment criterion (paste-block renders sensibly): the edit sits outside the paste-block fence and reads as a plain sentence with a working relative link.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Replaced `claude/AGENTS-snippet.md` §"Bumping the pinned flaitron version"'s fallback paragraph (tag-message/fetch/checkout/re-pin prose) with a one-line pointer to `docs/MIGRATION.md` §"Pinning and bumping"; the `/ft-update` paragraph is unchanged. Doc-drift: no change (the snippet's README §"AI-referenced docs" entry is unaffected). `touches:` reconciliation: declared `claude/AGENTS-snippet.md` = diff, plus the closure files (tasknote, PLAN). Learnings: N/A.

**Archived:** 2026-10-07
