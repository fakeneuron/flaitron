---
title: agents-release-skill
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-441]
---

# CORE-440 | agents-release-skill

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-441]]

## 🎯 Goal

Point the self-host AGENTS.md workflow guide at `/ft-release` for version bumps, instead of `/ft-update` which has no submodule to bump in this checkout.

## ✅ Acceptance

- [x] AGENTS.md §Workflow peer-skill roster names `/ft-release` as the self-host cut-a-release skill, not `/ft-update`
- [x] `claude/AGENTS-snippet.md` paste-block body still names `/ft-update` (adopter bump); `/ft-release` is not added there
- [x] KEEP IN SYNC comments on both roster sites document that version-bump skills are checkout-specific and allowed to diverge
- [x] AGENTS.md park-flag parenthetical (`--park [--low|--med|--fut|--high]`) is unchanged (Pair F)

## 🧩 Subtasks

- [x] Replace `/ft-update` (version bump) with `/ft-release` (cut a release) on AGENTS.md §Workflow peer-skill bullet
- [x] Update KEEP IN SYNC comments on AGENTS.md and `claude/AGENTS-snippet.md` to carve out the version-bump divergence
- [x] Confirm snippet paste-block body, symlink list, and "Bumping" section still name `/ft-update` only
- [x] Confirm Pair F park flags still present in AGENTS.md

## 🔗 Related

- [[CORE-441]] — sibling from the same audit-context pass: shortens this roster to names-only; do not steal that work

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The self-host guide still names the adopter-only bump skill; `/ft-update` bails in this checkout and `/ft-release` is the correct counterpart.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Best Practices:** N/A — docs/comment only; no code or module boundary.
- **Surfaces read:** `AGENTS.md:14` (peer roster + KEEP IN SYNC), `claude/AGENTS-snippet.md` (paste-block + KEEP IN SYNC + symlink list + bumping section), `claude/skills/ft-update/SKILL.md` Step 0 (bails in flowtron-self; points at `/ft-release`), `claude/skills/ft-release/SKILL.md` Step 0 (flowtron-self only) + Pair F (park flags in AGENTS.md), `claude/skills/ft-flowtron/SKILL.md` (already lists both, correctly labeled). No probe — three named files.
- **KEEP IN SYNC scope:** both comments say adding/removing a *tasknote-family* skill requires editing both. `/ft-update` is explicitly *not* tasknote-family (`ft-update` SKILL: thin procedural, no tasknote; snippet: "tasknote family, worktree pair, and `/ft-update`"). `/ft-release` is flowtron-self-only and must not enter the adopter paste-block. PLAN parenthetical ("keep `/ft-update` only if the KEEP IN SYNC roster must name the adopter skill") → drop it from AGENTS.md.
- **Durable carve-out:** without a comment update, a later KEEP IN SYNC pass can "fix" the last skill name back. In-scope: document the checkout-specific split on both comments. Do not change the snippet paste-block body.
- **Out of scope:** [[CORE-441]] names-only shortening of this same bullet; Pair F park-flag parenthetical stays.
- **Archive skim:** [[CORE-433.2]] — KEEP IN SYNC on AGENTS.md:14 is roster-membership, not the flag parenthetical. [[CORE-433.3]] added AGENTS.md to the AI-referenced sweep + Pair F. No prior note filed this self-host vs adopter version-bump split.
- **Drift check:** PLAN claim matches HEAD (`AGENTS.md:14` ends `, `/ft-update` (version bump).`; snippet paste-block line 24 is `/ft-update`). SPEC.md skill-namespace lists both; `ft-flowtron` already labels them self-only vs adopter-only. No contract contradiction.
- **Assumptions:** replace, don't list both; parenthetical becomes `(cut a release)` to match `/ft-release`; snippet body / symlinks / bumping section untouched; no tests (markdown comments).
- **No clarifications needed.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern:** reciprocal KEEP IN SYNC comments (CORE-318) plus the existing self-only vs adopter-only split already documented in `ft-flowtron` / `ft-update` Step 0. Extended the comments with a checkout-specific carve-out rather than inventing a third roster.
- **Minimal refactor:** none. Two comment/prose edits; CORE-441 owns names-only shortening.
- **Tests:** N/A — markdown comments, no behavior.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- Targeted tests: N/A — no code.
- Lint/type-check: N/A — markdown only.
- Quality assertions: N/A — two comment/prose edits; no public surface, no dead code.
- Frontend 👁️: N/A — not a UI change.
- Pair F park-flag presence loop over the five mirrors: clean (no `MISSING PARK FLAG`).
- Paste-block fence still names `/ft-update` only; AGENTS.md roster names `/ft-release` (cut a release).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

The self-host AGENTS.md peer roster now names `/ft-release` (cut a release) instead of the adopter-only `/ft-update` bump, which bails in this checkout. KEEP IN SYNC comments on both roster sites carve out version-bump skills as checkout-specific so a later name-list pass cannot "sync" them back.

**Changed files:** `AGENTS.md` (roster last skill + KEEP IN SYNC carve-out), `claude/AGENTS-snippet.md` (KEEP IN SYNC comment only; paste-block body unchanged).

**Verification:** Pair F park-flag loop clean; paste-block fence still `/ft-update` only.

**Refactors:** none; CORE-441 still owns names-only shortening.

**Documentation verdict:** AGENTS.md updated (this task); `claude/AGENTS-snippet.md` comment updated, paste-block body no change. Remaining AI-referenced docs: no change (`README.md`, `SPEC.md`, `docs/MIGRATION.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`).

**Maintainability:** a self-host session following AGENTS.md will invoke `/ft-release` instead of a skill that immediately bails; the comment carve-out keeps the split from being "fixed" at the next KEEP IN SYNC pass.

**Archived:** 2026-08-12
