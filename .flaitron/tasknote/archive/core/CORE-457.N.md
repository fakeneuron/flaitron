---
title: currency-surfaces audit
status: completed
tags: []
created: 2026-08-20
due:
related-tasks: [CORE-EPIC-457, CORE-457.2, CORE-457.3, CORE-457.4]
---

# CORE-457.N | currency-surfaces audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-457]]

## 🎯 Goal

Verify the completed `CORE-EPIC-457` (`currency-surfaces`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs) — no inconsistencies found
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate) — no misses found
- [x] Single `feat: <AUDIT-SUBTASK-ID> — audit <AREA>-EPIC-<NUMBER>` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-457.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-457.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-457` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-457.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-457]] — parent epic (currency-surfaces); Discovery supplied by audit-repo 2026-08-20
- [[CORE-457.2]] — sibling (stats-md-policy); closed
- [[CORE-457.3]] — sibling (new-project-agents-gate); closed
- [[CORE-457.4]] — sibling (viz-devdep-audit); closed

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three implementation children (`CORE-457.2`, `.3`, `.4`) are closed `[x]` in PLAN.md; no open siblings. This is the epic's terminal `.N` audit child (no legacy numeric audit exists) — canonical form, per SPEC/epic.md.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

  N/A — verification-only audit, no new code surface.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. No open siblings, no early-audit gate triggered.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort inventory** (read each sibling's archived tasknote at `.flowtron/tasknote/archive/core/`):

- **[[CORE-457.2]]** stats-md-policy — chose option B (gitignore) for the stale committed `.flowtron/STATS.md`. Added `.flowtron/STATS.md` to `.gitignore` (line 13) and `git rm --cached` untracked it; working-tree file left in place for local `/ft-stats --write` regeneration. No doc edits (SPEC.md layout line already said "optional; regeneratable").
- **[[CORE-457.3]]** new-project-agents-gate — widened `/ft-new-project`'s Step 0 project-validity precondition from CLAUDE.md-required to `AGENTS.md` OR `CLAUDE.md`. Edited three prose sites: `claude/skills/ft-new-project/SKILL.md:17`, `claude/commands/ft-new-project.md` summary line, `docs/MIGRATION.md` §1 intro + §1.0 description. Symlinks and the Codex wrapper needed no separate edit (they resolve to / delegate to the canonical files).
- **[[CORE-457.4]]** viz-devdep-audit — cleared three npm-audit highs (brace-expansion, nanoid, postcss) in `viz/package-lock.json` via non-force `npm audit fix`; `package.json` untouched. Full + prod audits clean; viz test/typecheck/lint passed post-fix.

**Cohort coherence pass (live re-verification, not recall):**

- `.gitignore:13` still has `.flowtron/STATS.md`; `git ls-files .flowtron/STATS.md` empty (untracked); working-tree file still present locally — matches CORE-457.2's claimed deliverable.
- `docs/MIGRATION.md` §1 intro parenthetical and §1.0 precondition description both read `AGENTS.md` or `CLAUDE.md` — matches CORE-457.3's claimed deliverable.
- `claude/skills/ft-new-project/SKILL.md:17` Step 0 precondition reads `AGENTS.md` or `CLAUDE.md` exists in cwd; `claude/commands/ft-new-project.md` summary line reads `AGENTS.md` or `CLAUDE.md` — both match.
- Repo-wide grep for stale CLAUDE.md-only gate wording (`CLAUDE.md exists in cwd`, `with CLAUDE.md`, `project-validity` outside the corrected phrasing) across `claude/` and `docs/` — no hits. No stale wording remains.
- `npm --prefix viz audit --audit-level=high` re-run live — `found 0 vulnerabilities`. Matches CORE-457.4's claimed post-fix state; no regression.
- No naming or style inconsistency across the three deliverables — each stays within its own surface (gitignore policy, precondition prose, lockfile hygiene); no contradictory cross-refs between them.

No regressions surfaced in earlier-shipped cohort children's surfaces.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

  N/A — audit is a verification pass, not new code.

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

  No refactor; no fixes needed (no misses found).

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

  N/A — no code edits.

**Implementation Notes:**

Cohort coherence findings: **no inconsistencies surfaced.** All three implementation children's deliverables are live-verified present and correct as claimed in their Final Summaries; no naming/style drift, no contradictory cross-refs, no regressions in earlier-shipped surfaces. No misses to log — no `/ft-file-followup` candidates from this audit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code edits this task

- [x] Ran lint/type-check on changed code — N/A: no code edits this task

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

  N/A — no code edits this task.

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A: no UI surface

**Testing Notes:**

| Check | Result |
|---|---|
| `.gitignore` / `git ls-files` / working-tree file for STATS.md | matches CORE-457.2 claim |
| `docs/MIGRATION.md`, `SKILL.md`, `ft-new-project.md` gate wording | matches CORE-457.3 claim; no stale wording remains repo-wide |
| `npm --prefix viz audit --audit-level=high` | 0 vulnerabilities — matches CORE-457.4 claim |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change
  - `AGENTS.md` — no change
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change (already updated by CORE-457.3; re-verified live, still correct)
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `cursor/AGENTS-snippet.md` — no change
  - `grok/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change
  - `docs/EXTERNAL-AGENTS.md` — no change
  - `docs/WORKTREES.md` — no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Audited the completed `CORE-EPIC-457` (currency-surfaces) cohort — three implementation children ([[CORE-457.2]] stats-md-policy, [[CORE-457.3]] new-project-agents-gate, [[CORE-457.4]] viz-devdep-audit). Live re-verified each child's claimed deliverable against current repo state: `.gitignore`/untracked STATS.md, the `AGENTS.md`-or-`CLAUDE.md` gate wording across three prose sites, and a clean `npm audit` on the viz lockfile — all matched, no drift, no regressions. Repo-wide grep found no remaining stale CLAUDE.md-only gate wording. No cohort coherence issues, no misses to file. No code edits this task; doc-drift sweep across all 17 AI-referenced docs — no change.

**Archived:** 2026-08-20
