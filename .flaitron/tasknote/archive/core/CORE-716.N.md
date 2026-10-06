---
title: gate-hygiene audit
status: completed
tags: []
created: 2026-10-06
due:
related-tasks: [CORE-EPIC-716, CORE-716.2, CORE-716.3, CORE-716.4]
touches:
  - viz/vite.config.ts
---

# CORE-716.N | gate-hygiene audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-716]]

## 🎯 Goal

Verify the completed `CORE-EPIC-716` (`gate-hygiene`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `chore: CORE-716.N — audit CORE-EPIC-716` commit lands — `chore:` per audit precedent (CORE-679.N etc.); the one inline edit is a code comment, no behavior change
- [x] PLAN.md line for `CORE-716.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-716.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-716` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-716.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-716]] — parent epic (gate-hygiene)
- [[CORE-716.2]] / [[CORE-716.3]] / [[CORE-716.4]] — audited cohort
- [[CORE-581]] — shipped `.github/dependabot.yml`, the continuous-alert route this audit found inactive

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic` (passed the parent ID; confirmed `CORE-716.N` via ask). All three implementation children closed 2026-10-06; no early audit. The epic has no `.1` — Discovery was supplied by `/ft-audit-repo` 2026-10-06, which filed the cohort directly.

- [x] Read relevant source files — the three archived cohort notes plus the touched files at HEAD

- [x] **Best Practices Review** — N/A: verification pass; the one inline edit is a code comment

- [x] **Archive skim** — self-referential (cohort children are the archive entries); followed CORE-716.3's Related pointers (CORE-360, CORE-651.3) via its own notes, and `docs/CONVENTIONS.md`'s CORE-581 / CORE-EPIC-575 trail for the supply-chain theme

- [x] **Drift check** — every cohort deliverable present at HEAD (see Discovery Notes); no SPEC contract touched

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — no clarifications needed: cohort fully closed, scope is the epic line

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **CORE-716.2 (viz-audit-fix, micro):** `npm --prefix viz audit fix` → `viz/package-lock.json` source-map-js 1.2.1 → 1.2.2. HEAD: lockfile at 1.2.2; `npm --prefix viz audit --audit-level=high` → `found 0 vulnerabilities`.
- **CORE-716.3 (updater-test-runtime, full):** `tools/update-adopters.test.mjs` — `clone -n` in `makeAdopter` plus `{ concurrency: GROUP_CONCURRENCY }` (`availableParallelism()`) on 5 fixture-isolated groups; 51.4s → 24.0s median, 65/65. HEAD: `GROUP_CONCURRENCY` at line 345, five groups carry it (347/583/641/732/870).
- **CORE-716.4 (vitest-jsdom-pool, micro):** `pool: 'vmThreads'` in `viz/vite.config.ts` with a CORE-716.4 comment; jsdom share ~47% → ~20%. HEAD: line 175.
- **Epic theme context:** the filing cites "Supply-chain alerts have no route in". `docs/CONVENTIONS.md` §"npm audit cadence" names `.github/dependabot.yml` (CORE-581) plus GitHub's per-repo "Dependabot security updates" setting as the continuous complement to the per-cut audit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: verification pass; inline fix matches the surrounding comment style

- [x] **Minimal refactor gate** — no refactor; one stale word corrected

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: comment-only edit

**Implementation Notes:**

- **Cohort coherence:** the three deliverables don't overlap (lockfile / Node test harness / Vitest config) and none contradicts another. Both runtime children cite their own task ID in an inline comment (`CORE-716.3` at the first concurrent group, `CORE-716.4` at `pool:`), so they match each other. The micro notes (.2, .4) leave out the `🔗 [[CORE-EPIC-716]]` nav chip that .3 carries; YAML `related-tasks` links all three to the parent, so they stay traceable. That is template variance, and archived notes are not rewritten.
- **Inline fix:** `viz/vite.config.ts:165`: `// Cap fork-pool workers` → `// Cap pool workers`. CORE-716.4 moved the pool from the default forks to `vmThreads`, which left the older `maxWorkers` comment naming the wrong pool. `maxWorkers: '50%'` still caps vmThreads workers, so the rest of the rationale holds.
- **Regressions:** none. The viz audit is still clean, and the CORE-716.4 comment and the updater concurrency rule are intact at HEAD.
- **Miss (follow-up candidate):** GitHub-side Dependabot is **off** for `fakeneuron/flaitron`. `gh api repos/{owner}/{repo}/vulnerability-alerts` → 404 (alerts disabled), and `.../automated-security-fixes` → `{"enabled":false}`. So `.github/dependabot.yml` (CORE-581) has nothing to act on, and the "continuous complement" that `docs/CONVENTIONS.md` describes does not run. That explains how GHSA-68fv-2mgg-jv7q sat until an audit-repo pass found it. CORE-716.2 cleared the symptom; the theme's "no route in" root cause is still open. → `/ft-file-followup` candidate: the operator enables Dependabot alerts + security updates in the repo settings (an outward-facing settings change, so it stays operator-owned), optionally with a `/ft-release` §6 check that the setting is on. Not fixed inline.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: comment-only edit; config behavior unchanged

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — N/A: a one-word comment correction is too small to grade

- [x] (frontend) N/A — no rendered UI change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `npm --prefix viz run lint` → exit 0
- `npm --prefix viz run typecheck` → exit 0
- `npm --prefix viz audit --audit-level=high` → exit 0 (0 vulnerabilities)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — N/A: the Dependabot gap is a repo setting, not something the always-loaded layer should carry; it goes to a follow-up

**Final Summary:**

- **Doc-drift sweep:** no change to any of the 18 entries: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`. A grep for the cohort's topics (suite runtime, wall-clock, jsdom, `maxWorkers`, vmThreads, source-map-js) found only command and path mentions, all still accurate. That includes AGENTS.md §"Validation", which runs the updater suite, and README's "portable" claim (`availableParallelism` is in the node builtins). `docs/CONVENTIONS.md`'s Dependabot paragraph describes what the setting does and does not claim it is enabled, so the gap is a settings miss, not doc drift.
- **Recap:** the cohort is coherent, with no regressions. One inline fix: `viz/vite.config.ts` (+1/−1, a stale "fork-pool" comment). One miss for follow-up: GitHub Dependabot alerts and security updates are disabled on the repo, so the epic theme's root cause ("no route in") is still open.
- **`touches:` reconciliation:** declared `viz/vite.config.ts`, and it matches. The only other paths are workflow files (`.flaitron/PLAN.md`, this note).
- **Parent flip:** Yes — operator confirmed at the 📦 gate; `CORE-EPIC-716` flipped to stub form and the cohort moved to the top of `## Completed` in the closure commit.

**Archived:** 2026-10-06
