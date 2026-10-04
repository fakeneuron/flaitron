---
title: viz-majors-triage
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-EPIC-639, CORE-639.2, CORE-639.N, CORE-640, CORE-641]
touches:
  - viz/package.json
  - viz/package-lock.json
  - claude/skills/ft-release/step-7.1-standing-checks.md
  - claude/skills/ft-release/SKILL.md
  - docs/CONVENTIONS.md
---

# CORE-639.3 | viz-majors-triage

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-639]] [[CORE-639.2]] [[CORE-639.N]] [[CORE-640]] [[CORE-641]]

## 🎯 Goal

Triage the six pending majors in `viz/package.json`: bump each one whose full validation roster stays green, park the rest as `/ft-file-followup --park` stubs with the blocking reason, then add an advisory-only `npm --prefix viz outdated` majors line to `/ft-release` §7.1 standing checks.

## ✅ Acceptance

- [x] Each of the six pending majors (`typescript`, `vitest`, `js-yaml`, `@testing-library/jest-dom`, `globals`, `@types/node`) is either bumped in `viz/package.json` or parked as a `/ft-file-followup --park` stub whose Idea names the blocking reason — `npm --prefix viz outdated` (majors whose current major ≠ latest) plus PLAN.md / `.flowtron/sidequest/` for parks
- [x] Every landed bump keeps the AGENTS.md §"Validation" roster green — `npm --prefix viz test && npm --prefix viz run typecheck && npm --prefix viz run lint && npm --prefix viz run build && node --test tools/update-adopters.test.mjs && node --check tools/update-adopters.test.mjs && node --check tools/update-adopters.mjs`
- [x] `/ft-release` §7.1 standing-checks fragment has an advisory-only `npm --prefix viz outdated` majors check that never blocks the cut — `grep -A20 'Standing viz-majors-outdated check' claude/skills/ft-release/step-7.1-standing-checks.md`
- [x] `ft-release/SKILL.md` indexes the check and carries a §7.4 one-line verdict; the "standing advisories" sentence names it — `grep -n 'viz-majors\|outdated' claude/skills/ft-release/SKILL.md`
- [x] Dependabot stays security-only (`open-pull-requests-limit: 0`) — `grep -n 'open-pull-requests-limit' .github/dependabot.yml`
- [x] Touched `ft-release/SKILL.md` stays under 40,000; `ft-release/**` under 125,000 — `wc -c claude/skills/ft-release/SKILL.md; find claude/skills/ft-release -type f -exec cat {} + | wc -c`

## 🧩 Subtasks

- [x] Isolate-bump `@types/node` 24→26; full roster; keep or revert
- [x] Isolate-bump `globals` 15→17; full roster; keep or revert
- [x] Isolate-bump `@testing-library/jest-dom` 6→7; full roster; keep or revert
- [x] Isolate-bump `js-yaml` 4→5 (keep gray-matter `$js-yaml` override; no lockfile wipe); full roster; keep or revert
- [x] Isolate-bump `vitest` 4→5; full roster; keep or revert
- [x] Isolate-bump `typescript` 5.9→7.0; full roster; keep or revert
- [x] Park each reverted major via `/ft-file-followup --park --low` with the blocking reason
- [x] Add advisory-only viz-majors-outdated standing check + SKILL.md index / "standing advisories" sentence / §7.4 verdict line

## 🔗 Related

- [[CORE-EPIC-639]] — parent epic (toolchain-currency)
- [[CORE-639.2]] — predecessor (ci-node-matrix; completed)
- [[CORE-639.N]] — epic closure audit
- [[CORE-640]] — parked js-yaml 5 (gray-matter `safeLoad.bind` at import)
- [[CORE-641]] — parked typescript 7 (typescript-eslint <6.1.0 + TS2882 CSS import)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The six named majors are still pending on `npm outdated`; CORE-639.2 already landed the CI matrix; Dependabot is still security-only; the §7.1 advisory insert site exists (CORE-638.3 shape). Work remains exactly as filed.

- [x] Read relevant source files — `viz/package.json`, `npm --prefix viz outdated`, `.github/dependabot.yml`, `docs/CONVENTIONS.md` §"Dependency audit cadence", `claude/skills/ft-release/SKILL.md` §6.2 / §7.1 index / §7.4, `step-7.1-standing-checks.md` (completed-rotation advisory), `viz/src/tasknote-parse.ts` js-yaml engines, `viz/eslint.config.js` globals import, archived CORE-639.2, `park-mode.md`.

- [x] **Best Practices Review** — Isolate one major at a time so a red roster names the blocker. Copy CORE-638.3's advisory shape (never `exit 1`, index + §7.4 verdict, no CI Pair) rather than inventing a new gate. Do not lift `outdated` into Pair H / `validate` (CORE-575.4: registry-time-dependent). Keep Dependabot `open-pull-requests-limit: 0`. For `js-yaml`, preserve `overrides.gray-matter.js-yaml: $js-yaml` and never wipe-reinstall the lockfile (CORE-575.3). Do not change any `ci.yml` `- run:` line.

- [x] **Archive skim** — `archive/core/` confirmed via README table (852 notes). Probe distilled: CORE-581 Dependabot security-only; CORE-575.4 put `npm audit` in §6.2 not CI; CORE-638.3 is the §7.1 advisory precedent (rewrite the "standing advisories" count); CORE-575.3 gray-matter override; CORE-623 seven-command roster including build; CORE-639.2 Node 24/26 matrix with no run-line changes; CORE-114 majors allowed when roster green; CORE-457.4 deferred `npm outdated` majors to a later child. No CORE-639.1 / Fan-out (audit-repo supplied Discovery). Related IDs opened via the probe; no ⚠️ / `supersedes:` pointers on those hits.

- [x] **Drift check** — PLAN names typescript 5.9→7.0 / vitest 4→5 / js-yaml 4→5 / jest-dom 6→7 / globals 15→17 / @types/node 24→26; live `npm outdated` matches (installed typescript is 5.9.3 under `^5.6.2`). `viz/package.json` and `ft-release` §7.1 paths exist. Sibling precedent put registry-time `npm audit` in §6.2; this PLAN line puts `outdated` in §7.1 — not a SPEC contradiction and not a Re-scope: follow the line, keep the never-block posture. `SKILL.md` currently names two standing advisories (machine-global + completed-rotation); a third must update that sentence. No Fan-out YAML to echo.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: (1) isolated sequential bumps, easy-first, revert on any roster failure; (2) "full validation roster" = AGENTS.md seven commands; (3) park blockers as `/ft-file-followup --park --low` (parent epic is Low; `--low` skips park-mode's priority ask); (4) Dependabot untouched; (5) in-range minors/patches out of scope; (6) parks ride park-mode's own filing commit when PLAN.md/index are otherwise clean, else this task's closure commit; (7) no CI Pair / no CONVENTIONS rewrite unless Phase 4 doc-drift requires a one-line pointer.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

Six live majors (`npm --prefix viz outdated`, 2026-09-20):

| package | current | latest |
|---|---|---|
| `@types/node` | 24.13.4 | 26.6.2 |
| `globals` | 15.15.0 | 17.12.0 |
| `@testing-library/jest-dom` | 6.9.1 | 7.0.1 |
| `js-yaml` | 4.3.2 | 5.4.2 |
| `vitest` | 4.1.11 | 5.0.1 |
| `typescript` | 5.9.3 | 7.0.2 |

`js-yaml` is used as `CORE_SCHEMA` + `load` in `viz/src/tasknote-parse.ts`; gray-matter engines are already overridden. `globals` is `...globals.browser` in `viz/eslint.config.js`. Advisory check command should report majors only (current major ≠ latest), flag-don't-block, same as completed-rotation.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — isolate-bump + revert follows CORE-114's "majors allowed if roster green" path; advisory insert copies CORE-638.3 (never-block standing check, SKILL.md index + §7.4 verdict, no CI Pair). Park-mode `--low` for blocked majors.

- [x] **Minimal refactor gate** — no viz source refactor. `js-yaml` 5 and `typescript` 7 were reverted rather than patched around gray-matter / typescript-eslint. CONVENTIONS gained one sentence so the cadence section is not stale against the new §7.1 check.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, no application-logic change; roster is the verify.

**Implementation Notes:**

Kept (roster green after isolate bump):

- `@types/node` `^24.13.4` → `^26.6.2`
- `globals` `^15.15.0` → `^17.12.0`
- `@testing-library/jest-dom` `^6.9.1` → `^7.0.1`
- `vitest` `^4.1.6` → `^5.0.1` (568 tests still pass on v5.0.1)

Reverted + parked:

- `js-yaml` 5 — gray-matter `lib/engines.js` does `yaml.safeLoad.bind` at import; `TypeError` loading `vite.config.ts`. Override `$js-yaml` (CORE-575.3) means root 5.x cannot hide behind nested 3.x. Parked [[CORE-640]] `c388ba9`.
- `typescript` 7 — `typescript-eslint@8.67` peer `<6.1.0` and hard-errors "does not support TS 7.0"; `tsc` also TS2882 on `src/main.tsx` side-effect CSS import. Parked [[CORE-641]] `da43754`.

`typescript` range rewritten by npm to `^5.9.3` (was `^5.6.2`; still 5.x). Dependabot untouched. Advisory check smoke: `⚠️ viz majors pending: js-yaml 4.3.2→5.4.2, typescript 5.9.3→7.0.2`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded below. No avoidable duplication/dead code/complexity; CONVENTIONS + SKILL.md updated with the new check (no stale code-facing docs).

- [x] (frontend) N/A — dependency and skill-doc change; no UI render path.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `npm --prefix viz test` → 0 (568 tests, vitest 5.0.1)
- `npm --prefix viz run typecheck` → 0
- `npm --prefix viz run lint` → 0
- `npm --prefix viz run build` → 0
- `node --test tools/update-adopters.test.mjs` → 0 (54 tests)
- `node --check tools/update-adopters.test.mjs` → 0
- `node --check tools/update-adopters.mjs` → 0
- advisory smoke (`npm --prefix viz outdated` majors) → 0, prints js-yaml + typescript only
- `grep -A20 'Standing viz-majors-outdated check' claude/skills/ft-release/step-7.1-standing-checks.md` → 0
- `grep -n 'viz-majors\|outdated' claude/skills/ft-release/SKILL.md` → 0 (index, advisories sentence, §7.4)
- `grep -n 'open-pull-requests-limit' .github/dependabot.yml` → 0 (still `0` on both ecosystems)
- `wc -c claude/skills/ft-release/SKILL.md` → 32803 (cap 40000)
- `find claude/skills/ft-release -type f -exec cat {} + | wc -c` → 113697 (cap 125000)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/CONVENTIONS.md` §"Dependency audit cadence" updated in-scope (majors currency pointer to §7.1). All other `.flowtron/tasknote/README.md` §"AI-referenced docs" entries: no change (README, AGENTS, SPEC, MIGRATION, platform snippets, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT, EXTERNAL-AGENTS, WORKTREES, VISION).

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` flipped to `completed`; PLAN.md line to stub form nested under CORE-EPIC-639; tasknote archived to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Landed four of six viz majors (`@types/node` 26, `globals` 17, `@testing-library/jest-dom` 7, `vitest` 5) with the AGENTS.md roster green; parked `js-yaml` 5 ([[CORE-640]], gray-matter `safeLoad.bind` at import) and `typescript` 7 ([[CORE-641]], typescript-eslint TS 7 hard-error + TS2882). Added `/ft-release` §7.1 advisory-only viz-majors-outdated check (index + §7.4 verdict; never blocks; no CI Pair) and a one-sentence CONVENTIONS pointer. `touches:` declared 5 paths after CONVENTIONS grew in; `git diff --name-only` (this closure, excluding tasknote/PLAN) matches those 5. Park filings `c388ba9` / `da43754` already committed. Maintainability: currency is a per-cut look instead of a silent six-major pile-up; the two remaining majors have resume stubs instead of a forgotten `npm outdated` line.

**Archived:** 2026-09-20
