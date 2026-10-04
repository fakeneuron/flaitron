---
title: install-path doc reconcile
status: completed
tags: []
created: 2026-08-19
due:
related-tasks: [CORE-439]
touches:
  - docs/MIGRATION.md
  - docs/PLATFORMS.md
  - SPEC.md
---

# CORE-451 | install-path doc reconcile

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-439]]

## 🎯 Goal

Make the install-path docs match the CORE-439 rule: an agent home carries only the five true global-only utilities; `/ft-update` stays repo-scoped (adopter subset) and `/ft-release` stays flowtron-self-only, never globally installed.

## ✅ Acceptance

- [x] `docs/MIGRATION.md` §1.0 "One-time global installs" table lists exactly `/ft-new-project`, `/ft-flowtron`, `/ft-stats`, `/ft-audit-context`, `/ft-audit-repo` — no `/ft-update`, no `/ft-release`
- [x] `docs/PLATFORMS.md` Installed-surface policy Claude row no longer says `ft-update` "may also be installed globally"; its Global-only column lists only those five utilities
- [x] Codex / Cursor "Same utility set as Claude" rows still hold after the Claude-row edit (no extra `ft-update` global license)
- [x] `docs/MIGRATION.md` §1.2 no longer points at "the skill table above" for `/ft-update` after that row is gone
- [x] `SPEC.md` §"Working in the flowtron repo itself" no longer cites a deleted `Flowtron-self only` table row or calls `/ft-release` a global install
- [x] Re-grep: no surviving `may also be installed globally`; no `/ft-update` or `/ft-release` rows under the §1.0 table

## 🧩 Subtasks

- [x] Drop the `/ft-update` and `/ft-release` rows from `docs/MIGRATION.md` §1.0
- [x] Retarget the §1.2 "see the skill table above" parenthetical so it does not dangle
- [x] Delete the `ft-update` "may also be installed globally" clause from `docs/PLATFORMS.md` Claude Global-only cell
- [x] Retarget `SPEC.md:65` off the deleted table row
- [x] Re-grep the contradiction sites and markdown-pass the diff

## 🔗 Related

- [[CORE-439]] — related-decision: one canonical install path (repo-scoped is canonical; agent home carries only global-only utilities). This task closes leftover table/clause contradictions that audit-docs 2026-08-19 Finding #2 flagged against that rule.
- [[CORE-272]] — related-decision: originally added `/ft-update` to the MIGRATION §1.0 global-install table; that row is what this task removes.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both cited sites still contradict [[CORE-439]] at HEAD. `docs/MIGRATION.md:34-35` still lists `/ft-update` and `/ft-release` in the one-time global-install table; `docs/PLATFORMS.md:70` still says `ft-update` "may also be installed globally". §1.2 already states the correct policy (globals are the five utilities; `/ft-release` is flowtron-self-only; `/ft-update` is in the adopter-installed subset). This is leftover table/clause drift, not a new policy decision.

- [x] Read relevant source files — `docs/MIGRATION.md` §1.0 (table) + §1.2 (already-correct policy prose) + §1.2.2 (utilities-only global block); `docs/PLATFORMS.md` §"Installed-surface policy" table + §"One canonical install path per project"; `SPEC.md:65` (pointer at the `Flowtron-self only` row this table drop would delete); `claude/skills/ft-update/SKILL.md` Notes (runtime-guard language, left alone)

- [x] **Best Practices Review** — N/A: docs-only policy-table reconcile; no code or module-boundary work. Rule text stays in `docs/PLATFORMS.md`; this task only removes two table rows, one clause, and two dangling pointers.

- [x] **Archive skim** — enumerated `archive/core/`; grepped `docs/MIGRATION.md` + `docs/PLATFORMS.md` + install-path vocabulary. Load-bearing hits: [[CORE-439]] (the rule this reconciles to; deliberately left §1.0 table contents alone and only added the one-at-a-time paragraph); [[CORE-272]] (added the `/ft-update` global-install row); [[CORE-349.2]] (installed-surface policy table, including the later-added global-license clause). Sibling same-audit inline fixes [[CORE-452]] / [[CORE-453]] / [[CORE-454]] are unrelated surfaces.

- [x] **Drift check** — PLAN-cited paths and phrases match HEAD (`docs/MIGRATION.md:34-35`, `docs/PLATFORMS.md:70` "may also be installed globally"). No line-number drift. Two in-scope pointer consequences of dropping the rows, not named on the PLAN line: (1) `docs/MIGRATION.md:64` "see the skill table above" would dangle; (2) `SPEC.md:65` cites the `Flowtron-self only` row and calls `/ft-release` a global install. Both are retargeted here so the contract does not keep citing a deleted row. Out of scope: `claude/skills/ft-update/SKILL.md:181` "Both are global-symlink + layout-guarded" is a runtime-guard description, not install-policy. Plan matches the PLAN.md line; no SPEC-contract contradiction once the pointer is retargeted.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

No clarifications needed. Explicit assumptions:

- Keep the §1.0 install-command shape (`ln -s` one-at-a-time) and the surrounding "agent home carries only these global-only utilities" paragraph; only the two extra rows come out.
- Codex / Cursor inherit the Claude-row fix via "Same utility set as Claude"; no extra cells to edit.
- The SPEC.md pointer rewrite is forced coherence from deleting the row it cites, not a re-scope. Same for the §1.2 parenthetical.
- Do not expand into GLOSSARY, README, `ft-flowtron` roster, or skill-body runtime-guard wording.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Same shape as [[CORE-439]]: the rule lives once in `docs/PLATFORMS.md` §"One canonical install path per project"; projections cite it rather than restating it. This task only removes leftover table/clause contradictions against that rule — no new subsection, no restated policy paragraph.

**Minimal refactor.** Four surgical edits, all required by Acceptance or by dropping the cited row:

| File | Change |
|---|---|
| `docs/MIGRATION.md` §1.0 | Deleted the `/ft-update` and `/ft-release` table rows. Five true globals remain. Surrounding one-at-a-time paragraph left as-is (already correct). |
| `docs/MIGRATION.md` §1.2 | Retargeted `(see the skill table above)` → `(see [`PLATFORMS.md`](PLATFORMS.md) §"Installed-surface policy")` so the parenthetical does not dangle. Adopter-subset prose that *names* `/ft-update` as repo-scoped is unchanged — that is the correct category. |
| `docs/PLATFORMS.md` | Deleted `; \`ft-update\` may also be installed globally for adopter bumps but remains adopter-only at runtime` from the Claude Global-only cell. Codex/Cursor inherit via "Same utility set as Claude". Adopter-installed subset column still lists `ft-update` (correct). |
| `SPEC.md:65` | Replaced the pointer at the deleted `Flowtron-self only` row (which also called `/ft-release` a global install) with a two-sentence pointer: globals → MIGRATION §1.0; `/ft-release` repo-scoped in this checkout → PLATFORMS Installed-surface policy. |

**Deferred.** `claude/skills/ft-update/SKILL.md:181` "Both are global-symlink + layout-guarded" is runtime-guard language, not install-policy; left alone. `claude/skills/ft-release/SKILL.md` frontmatter still says "Flowtron-self only (global symlink)" — same class, out of scope.

**Tests.** N/A — markdown prose only; no executable surface. `codex/AGENTS-snippet.md` (a fleet-updater input) was not touched, so the updater suite is not in the blast radius.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A: no frontend surface

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
| `rg 'may also be installed globally'` (whole tree, excl. archive) | no matches |
| `rg '^\| `/ft-(update\|release)`'` in `docs/MIGRATION.md` | no matches (table is the five globals only) |
| `rg 'skill table above'` | no matches |
| `rg 'flowtron-self global installs'` | no matches (SPEC.md pointer rewritten) |
| `docs/MIGRATION.md` §1.0 table rows | `/ft-new-project`, `/ft-flowtron`, `/ft-stats`, `/ft-audit-context`, `/ft-audit-repo` |
| `docs/PLATFORMS.md:70` Claude Global-only cell | the five utilities, period. Codex/Cursor still "Same utility set as Claude" |
| `docs/PLATFORMS.md:101-103` one-canonical-path rule | unchanged: adopter subset and `ft-release` never installed globally |

Lint/type-check N/A (markdown). Tests N/A (no executable surface).

**Quality assertions.** No new policy text — net −2 table rows, −1 clause, two pointer retargets. No duplication of the CORE-439 rule. No public-surface growth. Stale in-file pointer (`see the skill table above`) and contract pointer (`Flowtron-self only` row) removed rather than left dangling. Skill-body runtime-guard wording left in place (recorded, not silently expanded).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs", per entry:

| Doc | Verdict |
|---|---|
| `README.md` | no change — §"Quickstart" still points at "the full one-time global-install table (§1.0)", which still exists (now the five true globals). `/ft-update` is named as an adopter-wired skill, which is correct. |
| `AGENTS.md` | no change — self-host peer-skill roster names `/ft-release` (repo-scoped in this checkout); comment already distinguishes adopter `/ft-update`. |
| `SPEC.md` | **updated** — §"Working in the flowtron repo itself" no longer points at a deleted `Flowtron-self only` table row or calls `/ft-release` a global install. |
| `docs/MIGRATION.md` | **updated** — §1.0 table dropped `/ft-update` + `/ft-release`; §1.2 parenthetical retargeted at PLATFORMS Installed-surface policy. |
| `claude/AGENTS-snippet.md` | no change — adopter repo-scoped wiring only; no machine-global install table. |
| `codex/AGENTS-snippet.md` | no change — already cites §"One canonical install path per project"; no extra global-license clause. |
| `cursor/AGENTS-snippet.md` | no change — thin wiring; no global-install table. |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |
| `docs/AGENT-NEUTRALITY.md` | no change — install-path policy stays in the wiring layer. |
| `docs/PLATFORMS.md` | **updated** — Claude Global-only cell no longer licenses a global `ft-update`. |
| `claude/CAPABILITIES.md` | no change |
| `docs/AGENT-COMPAT.md` | no change |
| `docs/EXTERNAL-AGENTS.md` | no change |
| `docs/WORKTREES.md` | no change |

**Final Summary:**

Removed the leftover install-path contradictions that audit-docs 2026-08-19 Finding #2 flagged against [[CORE-439]]: `/ft-update` and `/ft-release` no longer appear in the MIGRATION §1.0 global-install table, and PLATFORMS.md no longer licenses a global `ft-update`. Agent home now documents exactly the five true globals; `/ft-update` stays in the adopter-installed subset and `/ft-release` stays flowtron-self-only, repo-scoped.

Files: `docs/MIGRATION.md` (−2 table rows, one parenthetical retarget), `docs/PLATFORMS.md` (one clause deleted), `SPEC.md` (one pointer rewrite). Net −2 lines. Verification: re-grep of the four contradiction phrases, all clean. No tests (markdown only). Deferred skill-body "global-symlink" guard wording. Maintainability: the three install-path surfaces now agree, so a later `/ft-audit docs` pass will not re-file the same High finding.

**Archived:** 2026-08-19
