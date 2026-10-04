---
title: stats-md-policy
status: completed
tags: []
created: 2026-08-20
due:
related-tasks: [CORE-EPIC-457]
touches:
  - .flowtron/STATS.md
  - .gitignore
---

# CORE-457.2 | stats-md-policy

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-457]]

## 🎯 Goal

Pick and apply a durable policy for committed `.flowtron/STATS.md` so it stops lagging `PLAN.md` `## Completed` (refresh now, gitignore, or release-gate refresh).

## ✅ Acceptance

- [x] One of the three PLAN options is chosen and applied — **B: gitignore**
- [x] Policy outcome is durable: either STATS is current, ignored, or refreshed on release — ignored via `.gitignore` + `git rm --cached`
- [x] No silent keep-stale-tracked state remains — file no longer tracked; `git check-ignore` matches

## 🧩 Subtasks

- [x] Operator picks policy: refresh-now / gitignore / release-gate refresh — operator deferred; chose **B** (best judgment)
- [x] Apply the chosen option (and any minimal doc/skill touch it requires)
- [x] Verify: tracked freshness, ignore presence, or release-gate step as applicable

## 🔗 Related

- [[CORE-EPIC-457]] — parent epic (currency-surfaces); Discovery supplied by audit-repo 2026-08-20
- [[CORE-359.3]] — last commit that regenerated STATS.md (2026-07-16; 546 entries)
- [[CORE-456.4]] — dogfood Phase-1 drive already flagged this three-way fork → fire 🛠️

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Tracked STATS.md is ~5 weeks stale while SPEC/skill call it optional/regeneratable; the PLAN three-way fork is still open and must be resolved.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

  N/A — policy/artifact hygiene, not a module-boundary change. Existing abstraction is `/ft-stats --write` (markdown-only regenerator).

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  Clarification required: which of the three PLAN options? Surfaced at 🛠️; operator said use best judgment → **B gitignore**.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Evidence.** `.flowtron/STATS.md` is tracked (`git ls-files`), last committed `6bca131` / CORE-359.3 on 2026-07-16; header still `546 entries` / window ending 2026-07-16. Not in `.gitignore`. `SPEC.md` layout: `STATS.md # optional; /ft-stats --write regeneratable`. `claude/skills/ft-stats/SKILL.md` Step 4: regeneratable; adopters may gitignore or commit at their cadence; skill does not stage/commit. `/ft-release` has no STATS refresh step today.

**Archive skim.** [[CORE-359.3]] last wrote the file (sidequest cleanup + optional refresh). [[CORE-097.*]] / [[CORE-263]] / [[CORE-433.2]] name STATS as layout/regeneratable. Skill already documents the gitignore-or-commit choice the PLAN restates. [[CORE-456.4]] dry-drove this child and recorded fire-🛠️ on the same fork.

**Drift.** Paths and the three options still match. No SPEC contradiction.

**Decision (post-🛠️).** **B — gitignore.** Matches SPEC/skill regeneratable contract; permanently removes the stale-committed class of lag without release-recipe weight. Refresh-now alone would re-stale; release-gate is heavier than a `[light]` optional artifact warrants.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Extended the skill's documented adopter choice (gitignore or commit). No new shape; no release-gate step.

**Minimal refactor gate.** No refactor. Deferred: release-gate refresh (option C) and a one-shot refresh (option A) — both rejected for this policy.

**Deliverables:** `.gitignore` gains `.flowtron/STATS.md` with a short rationale comment; `git rm --cached .flowtron/STATS.md` untracks the stale snapshot (working tree file left for local regenerate-on-demand). SPEC.md layout line already correct — no doc edit.

Tests N/A — ignore/untrack only.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no test surface

- [x] Ran lint/type-check on changed code — `git diff --check` clean

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A: no UI surface

**Testing Notes:**

| Check | Result |
|---|---|
| `git check-ignore -v .flowtron/STATS.md` | `.gitignore:13:.flowtron/STATS.md` |
| `git ls-files .flowtron/STATS.md` | empty (untracked) |
| working-tree file | still present locally |
| `git diff --check` | clean |
| SPEC.md STATS layout | unchanged (already optional/regeneratable) |

Quality: no skill/SPEC rewrite; policy is the ignore rule alone.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change
  - `AGENTS.md` — no change
  - `SPEC.md` — no change (layout already optional/regeneratable)
  - `docs/MIGRATION.md` — no change
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

Chose gitignore for `.flowtron/STATS.md` so a regeneratable snapshot cannot lag PLAN again. Untracked the stale 2026-07-16 file; `/ft-stats --write` still regenerates locally on demand. Docs unchanged (SPEC already optional/regeneratable). Maintainability: currency-surface class of bug closed without release-recipe weight.

**Archived:** 2026-08-20
