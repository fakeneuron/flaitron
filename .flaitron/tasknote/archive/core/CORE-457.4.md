---
title: viz-devdep-audit
status: completed
tags: []
created: 2026-08-20
due:
related-tasks: [CORE-EPIC-457]
touches:
  - viz/package-lock.json
---

# CORE-457.4 | viz-devdep-audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-457]]

## 🎯 Goal

Clear the three high-severity npm-audit findings in the viz lockfile (brace-expansion / nanoid / postcss) via `npm audit fix`, leaving production deps clean and the lockfile current.

## ✅ Acceptance

- [x] `npm --prefix viz audit --audit-level=high` reports 0 vulnerabilities (or only issues not fixable without a breaking major that this task explicitly defers) — 0 vulnerabilities
- [x] `npm --prefix viz audit --omit=dev --audit-level=high` remains clean — 0 vulnerabilities
- [x] viz test + typecheck + lint still pass after the lockfile change — 22 files / 362 tests; typecheck clean; lint clean
- [x] No intentional direct-dep major bumps beyond what `npm audit fix` applies — `package.json` untouched; lockfile-only patch bumps

## 🧩 Subtasks

- [x] Snapshot pre-fix audit (full + prod) and note which packages/advisories
- [x] Run `npm --prefix viz audit fix` (non-force; no `--force` / `--legacy-peer-deps` unless fix fails)
- [x] Re-audit full + prod; record remaining findings if any
- [x] Run `npm --prefix viz test`, `typecheck`, and `lint`
- [x] Stage only lockfile (and package.json if audit fix touched ranges)

## 🔗 Related

- [[CORE-EPIC-457]] — parent epic (currency-surfaces); Discovery supplied by audit-repo 2026-08-20
- [[CORE-457.2]] — sibling (stats-md-policy); closed
- [[CORE-457.3]] — sibling (new-project-agents-gate); closed
- [[CORE-457.N]] — follow-up audit child

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Live `npm audit` still reports exactly the three named highs in the viz tree; production omit-dev audit is clean. Mechanical lockfile hygiene; still needed.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

  N/A — lockfile hygiene via npm's own fix path; no module-boundary or app-code change. Prefer non-force `audit fix` so ranges stay within existing `package.json` constraints.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) non-force `npm audit fix` is enough; (2) if fix leaves residuals that need `--force` or a major direct-dep bump, stop and surface rather than force; (3) no Fan-out / no `.1` → omit `blocked-by:` / `parallel-safe-with:`; (4) app source and version pins stay untouched.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Evidence (2026-08-20).** `npm --prefix viz audit --audit-level=high` → 3 highs, all "fix available via `npm audit fix`":
- `brace-expansion` ≤1.1.17 || 4.0.0–5.0.8 — via `eslint`→`minimatch` (1.1.16) and `@typescript-eslint/typescript-estree`→`minimatch` (5.0.7)
- `nanoid` ≤3.3.17 — via `postcss@8.5.13` (3.3.12)
- `postcss` ≤8.5.22 — direct + via autoprefixer / tailwindcss / vite (8.5.13; wanted 8.5.26)

`npm --prefix viz audit --omit=dev --audit-level=high` → `found 0 vulnerabilities`. Matches PLAN claim.

**Archive skim.** No prior tasknote owned an npm-audit sweep of the viz lockfile. Hits on `package-lock` are release resyncs ([[CORE-449]] / [[CORE-443]] / [[CORE-427]] / [[CORE-405]]) and one direct dep add ([[FE-085]] js-yaml). Sibling [[CORE-457.2]] / [[CORE-457.3]] are unrelated currency surfaces. No Fan-out (no `.1`; Discovery by audit-repo) — same pattern as [[CORE-456.*]] cohort.

**Drift.** PLAN names brace-expansion / nanoid / postcss highs and production-clean — all still true. No SPEC contradiction. `touches:` scoped to `viz/package-lock.json` (plus package.json only if audit fix rewrites a range).

**Word count.** PLAN long description ~22w (under 70w cap).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

  Pattern: non-force `npm audit fix` against `viz/` (same lockfile surface release cuts resync). No new shape.

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

  No refactor. Deferred: unrelated `npm outdated` majors (eslint 10, vite 8, react 19, etc.) — out of Acceptance.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

  N/A — lockfile-only; no behavior surface to unit-test. Existing suite used as regression gate.

**Implementation Notes:**

`npm --prefix viz audit fix` changed 4 packages; `package.json` untouched. Lockfile bumps:
- `brace-expansion` 1.1.16 → 1.1.18; nested 5.0.7 → 5.0.9
- `nanoid` 3.3.12 → 3.3.18
- `postcss` 8.5.13 → 8.5.26 (nanoid range `^3.3.11` → `^3.3.17`)

Post-fix: full + prod audits both `found 0 vulnerabilities`. Diff: `viz/package-lock.json` +14/−14.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

  N/A — generated lockfile only; no app source / public surface / code-facing docs touched.

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

  N/A — lockfile-only transitive patch; no UI source or visual surface changed.

**Testing Notes:**

- `npm --prefix viz test` — 22 files / 362 tests passed
- `npm --prefix viz run typecheck` — clean
- `npm --prefix viz run lint` — clean
- Re-audit after fix: full + `--omit=dev` both 0 vulnerabilities

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change
  - `AGENTS.md` — no change
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `cursor/AGENTS-snippet.md` — no change
  - `grok/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change (supply-chain section is submodule-pin focused; lockfile patch does not alter it)
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change
  - `docs/EXTERNAL-AGENTS.md` — no change
  - `docs/WORKTREES.md` — no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Cleared the three viz lockfile npm-audit highs (`brace-expansion`, `nanoid`, `postcss`) with non-force `npm audit fix`. Only `viz/package-lock.json` changed (+14/−14); `package.json` and app source untouched. Full and prod audits are clean; viz test/typecheck/lint pass. No refactor; unrelated major upgrades deferred. Doc-drift: all AI-referenced docs no change. Maintainability: viz lockfile no longer carries known high-severity transitive advisories in the committed tree.

**Archived:** 2026-08-20
