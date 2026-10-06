---
title: ci-spine-align
status: completed
tags: [ci, security]
created: 2026-10-06
due:
related-tasks: [CORE-434, CORE-581, CORE-639.2]
touches:
  - .github/workflows/ci.yml
  - docs/CONVENTIONS.md
  - SECURITY.md
  - docs/CONTEXT-BUDGET.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
---

# CORE-715 | ci-spine-align

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-434]]

## 🎯 Goal

Bring `.github/workflows/ci.yml` onto the Natabula CI spine — action floor (checkout v5 / setup-node v6) kept as immutable SHA pins, bare `pull_request:` trigger, and `ci-${{ github.ref }}` cancel-in-progress concurrency — without changing any job or step.

## ✅ Acceptance

- [x] Every `actions/checkout` pin is the full SHA of `v5.1.0` and `actions/setup-node` the full SHA of `v6.5.0`, each with a `# vX.Y.Z` comment; no `@v4`/v4.4.0 SHA remains — `grep -cE 'actions/checkout@fbc6f3992d24b796d5a048ff273f7fcc4a7b6c09 # v5\.1\.0' .github/workflows/ci.yml` = 2, `grep -cE 'actions/setup-node@249970729cb0ef3589644e2896645e5dc5ba9c38 # v6\.5\.0' .github/workflows/ci.yml` = 1, `grep -c '11d5960a\|49933ea5' .github/workflows/ci.yml` = 0
- [x] Triggers are `push: {branches: [main]}` + bare `pull_request:`; top-level `concurrency: {group: ci-${{ github.ref }}, cancel-in-progress: true}` — `node -e` YAML-shape check (see Testing Notes)
- [x] Jobs and steps preserved — `git diff -U0 .github/workflows/ci.yml` touches only the `on:` block, the new `concurrency:` block, and the three `uses:` lines
- [x] Docs that restate the trigger shape / pin posture match the new workflow — `grep -rn "every push and pull request\|every push,\|pull request to .main." docs/ SECURITY.md CONTRIBUTING.md README.md AGENTS.md claude/ codex/ SPEC.md SPEC/` prints nothing (widened after External review)
- [x] Repo validation roster + drift-job Pairs stay green — AGENTS.md §"Validation" seven commands, plus Pair H extraction diff

## 🧩 Subtasks

- [x] Swap the two `actions/checkout` pins and the `actions/setup-node` pin to the floor SHAs
- [x] Drop `branches: [main]` from `pull_request:`; add top-level `concurrency:` block
- [x] Update `docs/CONVENTIONS.md` §"GitHub Actions CI" trigger clause + concurrency mention
- [x] Update `SECURITY.md` §"GitHub Actions CI" trigger clause and the `@v4` example
- [x] Run validation roster + Pair H; YAML-shape check

## 🔗 Related

- [[CORE-434]] — related-decision: hardened ci.yml with SHA pins + `permissions:`; this task keeps that posture
- [[CORE-581]] — Dependabot `github-actions` ecosystem (security-only, `open-pull-requests-limit: 0`) — unchanged
- [[CORE-639.2]] — Node 24/26 matrix on `validate`; untouched here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Natabula `docs/FLEET-CI.md` spine sweep (2026-10-05) shows flaitron as the only `ci.yml` row with `pr:main`, no concurrency, and checkout/setup-node at v4.4.0 — every other node repo is at checkout v5 · node v6 · `ci-ref · cancel`. Gap is real and current.

- [x] Read relevant source files — `.github/workflows/ci.yml`, `.github/dependabot.yml`, `docs/CONVENTIONS.md` §"GitHub Actions CI", `SECURITY.md` §"GitHub Actions CI", natabula `docs/STACK-TENDENCIES.md` §"Continuous integration", natabula `docs/FLEET-CI.md`, natabula `.github/workflows/ci.yml`

- [x] **Best Practices Review** — N/A for module boundaries (config-only). Spine keys copied in natabula's canonical form (`ci-${{ github.ref }}`, `cancel-in-progress: true`) rather than a local variant, per STACK-TENDENCIES "One canonical form — don't invent per-repo variants". No refactor.

- [x] **Archive skim** — `archive/core/` confirmed against README table (`CORE-*` → `archive/core/`). Hits: CORE-434 (SHA pins + `permissions:`; deferred Dependabot), CORE-581 (Dependabot github-actions, security-only), CORE-625 (gitleaks checksum + SECURITY.md compromise-path enumeration), CORE-639.2 (matrix; confirmed only job-level keys changed so Pair H held). Load-bearing: Pair H extracts `^      - run: ` lines — this change touches none; SECURITY.md enumerates SHA pinning as a mitigation, so the pin comment text there must stay accurate.

- [x] **Drift check** — PLAN line cites 46a94bd1 state; current HEAD still has checkout/setup-node v4.4.0 SHAs (lines 20, 25, 85), `pull_request: branches: [main]`, no `concurrency:`. Matches. No SPEC contract governs CI action versions; CONVENTIONS/SECURITY restate the trigger shape ("push and pull request to `main`") and need updating in-task.

- [x] No clarifications needed (--fast). Assumptions: "declared Natabula floor" = STACK-TENDENCIES `actions/checkout@v5`, `actions/setup-node@v6`; pinned at the latest release within each floor major (checkout v5.1.0 `fbc6f399…`, setup-node v6.5.0 `24997072…`, resolved via `gh api …/matching-refs/tags`), not a higher major. `cache: npm` stays explicit, so setup-node v6's auto-cache change is moot.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:**

- FLEET-CI.md spine row for flaitron: `push:main · pr:main | checkout v4.4.0 (sha) · node v4.4.0 (sha) | npm-path | — | …`.
- STACK-TENDENCIES: "Stricter SHA-pinning is a security posture and may *exceed* the floor (e.g. marscharts)" — SHA pins retained.
- Phase 1→2: Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: workflow config, no test harness for CI YAML; covered by the YAML-shape check in Phase 3

**Implementation Notes:**

- Pattern: natabula's own `ci.yml` header (`pull_request:` bare + `concurrency: group: ci-${{ github.ref }} / cancel-in-progress: true`) copied verbatim in shape; SHA-pin + `# vX.Y.Z` comment convention kept from CORE-434.
- `ci.yml`: 3 `uses:` refs swapped, `branches: [main]` removed from `pull_request:`, 4-line `concurrency:` block added between `on:` and `permissions:`. No `- run:` line touched → Pair H unaffected.
- `docs/CONVENTIONS.md` §"GitHub Actions CI": trigger clause rewritten + concurrency group named. `SECURITY.md` §"GitHub Actions CI": trigger clause rewritten; "`@v4` tags" example → "major tags like `@v5`" so it no longer reads as the pinned version.
- No refactor.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Ran the full AGENTS.md roster (CI config change is repo-wide in effect):

- `npm --prefix viz test` → 0 · `npm --prefix viz run typecheck` → 0 · `npm --prefix viz run lint` → 0 · `npm --prefix viz run build` → 0
- `node --test tools/update-adopters.test.mjs` → 0 · `node --check tools/update-adopters.test.mjs` → 0 · `node --check tools/update-adopters.mjs` → 0

Acceptance receipts:

1. `grep -cE 'actions/checkout@fbc6f399… # v5\.1\.0'` → 2 · `grep -cE 'actions/setup-node@24997072… # v6\.5\.0'` → 1 · `grep -c '11d5960a\|49933ea5'` → 0 (exit 1, none)
2. js-yaml shape check (`on.push == {branches:[main]}`, `on.pull_request === null`, `concurrency.group == "ci-${{ github.ref }}"`, `cancel-in-progress === true`, jobs `[validate, drift]`) → 0
3. js-yaml diff of `jobs` vs `HEAD`, with `uses:` refs stripped of `@…` → 0 (identical; 11 + 16 steps)
4. `grep -n 'pull request to .main.' docs/CONVENTIONS.md SECURITY.md` → 1 (no match)
5. Every `drift`-job `run:` body extracted and run under `bash -e` (wrapper-name, skill parity, context budget, final newline, Pairs A B C H J M N O P Q R) → all 0

Quality: no duplication or dead config; public surface unchanged; code-facing docs updated in-task.

**External review** (`/code-review medium`, working-tree diff only):

1. `cancel-in-progress: true` also cancels superseded `main` pushes, leaving the earlier commit with a `cancelled` run — **note**, no change: the PLAN line and the canonical natabula spine mandate the cancelling `ci-ref` form; surfaced to the operator as a fleet-level trade-off (PR-only cancel would be `${{ github.event_name == 'pull_request' }}`).
2. `step-7.1-standing-checks.md:209` "on every push and pull request" — **blocker** vs Acceptance #4 → fixed (Phase 2 re-entered).
3. `docs/CONTEXT-BUDGET.md:322` same phrase — **blocker** → fixed.
4. `docs/CONVENTIONS.md:56` "on every push" — **blocker** → fixed.
5. `SECURITY.md` didn't name the wider PR surface from dropping the branch filter — **note** → fixed (one clause added).
6. Acceptance #4 grep too narrow to prove its claim — **blocker** → grep widened (now `stale-grep → 1`, no match).

Phase 3 re-run after fixes: roster 7/7 → 0; all 15 `drift` steps → 0; widened Acceptance #4 grep → 1 (no match).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update — `docs/CONVENTIONS.md`: trigger + concurrency clauses updated; `SECURITY.md`: trigger clause, wider-PR-surface clause, `@v4` example updated; README.md / AGENTS.md: name `ci.yml` only (badge, layout bullet) — no change; SPEC.md, docs/MIGRATION.md, the four AGENTS-snippets, CONTRIBUTING.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md, docs/EXTERNAL-AGENTS.md, docs/WORKTREES.md, docs/VISION.md — no change (no CI trigger/pin restatement)

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line — N/A

**Final Summary:**

Aligned `.github/workflows/ci.yml` with the Natabula CI spine: `actions/checkout` → v5.1.0 (`fbc6f399…`, ×2) and `actions/setup-node` → v6.5.0 (`24997072…`), SHA-pinned with version comments; `pull_request:` now bare; top-level `concurrency: {group: ci-${{ github.ref }}, cancel-in-progress: true}`. Jobs/steps byte-identical apart from `uses:` refs (js-yaml diff → 0). Trigger restatements fixed in `docs/CONVENTIONS.md` (×2), `SECURITY.md` (+ wider-PR-surface clause), `docs/CONTEXT-BUDGET.md`, and `claude/skills/ft-release/step-7.1-standing-checks.md`. 6 files, ~+21/−12. Verification: roster 7/7 green, 15/15 drift steps green. `touches:` reconciliation: initially declared ci.yml, CONVENTIONS.md, SECURITY.md; CONTEXT-BUDGET.md and step-7.1-standing-checks.md were added mid-task from External review findings and declared before closure — no undeclared paths. Maintainability: flaitron's FLEET-CI spine row now reads like its siblings (`push:main · pr`, `checkout v5.1.0 (sha) · node v6.5.0 (sha)`, `ci-ref · cancel`), so it drops out of fleet drift reports. Open trade-off (not changed): cancelling concurrency also cancels superseded `main` pushes.

**Archived:** 2026-10-06
