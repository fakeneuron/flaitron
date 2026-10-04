---
title: Actions workflow — reuse AGENTS.md §Validation commands verbatim; Node 20; cache npm
status: completed
tags: []
created: 2026-08-10
due:
related-tasks: [CORE-EPIC-430]
---

# CORE-430.2 | Actions workflow — reuse AGENTS.md §Validation commands verbatim; Node 20; cache npm

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-430]]

## 🎯 Goal

Add a GitHub Actions workflow that runs the four existing gate commands (viz test/typecheck/lint + fleet-updater `node --test`) on push/PR to `main`, using Node 20 with npm caching, sourced verbatim from AGENTS.md §Validation.

## ✅ Acceptance

- [x] `.github/workflows/ci.yml` runs on push and pull_request targeting `main`
- [x] Workflow pins Node 20 via `actions/setup-node` with npm caching
- [x] All six AGENTS.md §Validation commands run verbatim (3 viz + 3 updater)
- [x] `docs/CONVENTIONS.md` §"CI / GitHub Actions" moved from Declines to Adheres to, rewritten to describe the shipped workflow
- [x] `README.md` and `CONTRIBUTING.md` declines-list mirrors updated to drop "CI / GitHub Actions" (per the CORE-384 mirror invariant)

## 🧩 Subtasks

- [ ] Author `.github/workflows/ci.yml` — trigger `push`/`pull_request` on `main`; `actions/checkout` + `actions/setup-node@v4` (node-version 20, cache: npm, cache-dependency-path viz/package-lock.json); `npm --prefix viz ci`; then the three viz commands (test/typecheck/lint) + three updater commands (node --test, 2x node --check), verbatim from AGENTS.md §Validation
- [ ] Move `docs/CONVENTIONS.md` §"CI / GitHub Actions" from `## Declines` to `## Adheres to`, rewritten to reflect the shipped workflow and its rationale (extends existing Phase 3 gates as automatic on-push enforcement; doesn't replace them)
- [ ] Update `README.md:76` and `CONTRIBUTING.md:35` — drop "CI / GitHub Actions" from the declines parenthetical, add it to the adheres-to parenthetical
- [ ] Run the workflow's own commands locally to confirm they pass before considering the task done (no way to trigger real GitHub Actions from this session)

## 🔗 Related

- [[CORE-EPIC-430]] — parent epic: CI gate on push

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed (scope expanded per user direction)
  **Rationale:** PLAN.md line is accurate and current — build a GitHub Actions workflow reusing AGENTS.md §Validation verbatim. Drift check (below) surfaced that this reverses a repeatedly-reaffirmed "no CI" decision; user directed (via AskUserQuestion) to proceed with the epic and additionally reconcile `docs/CONVENTIONS.md` + its `README.md`/`CONTRIBUTING.md` mirrors in this same task, per the CORE-384 mirror invariant.

- [x] Read relevant source files — `AGENTS.md` §Validation (the 6 commands to reuse verbatim), `viz/package.json` (`engines.node >=20`, scripts, confirms `viz/package-lock.json` is the only lockfile in the repo), `tools/` (zero-dependency, no lockfile — `update-adopters.test.mjs` + `update-adopters.mjs`), `docs/CONVENTIONS.md` (full §Declines "CI / GitHub Actions" entry, lines 86-94), `README.md`/`CONTRIBUTING.md` mirror lines, `docs/PHILOSOPHY.md` (no CI-specific claims, no update needed there). No `.github/` directory exists yet. No probe needed — read set was narrow and known.

- [x] **Best Practices Review** — net-new surface (`.github/workflows/`), no existing pattern in-repo to extend or conflict with. AGENTS.md §Validation is the canonical command source; reusing it verbatim (rather than re-deriving CI-specific commands) keeps the workflow and the human-facing doc from drifting apart. N/A refactor — nothing existing to refactor.

- [x] **Archive skim** — `grep -ril "github actions\|\.github/workflows\|ci gate\|ci\.yml" archive/core/*.md` → 8 hits, load-bearing:
  - **CORE-099.1** (2026-05-18) — axis sweep explicitly declined `.github/` templates: "N/A for solo + adoption-by-submodule positioning; no public-contributor base to template for."
  - **CORE-115** — a PLAN line bundling a CI workflow + ESLint was re-scoped via AskUserQuestion to drop the CI half specifically to uphold the CORE-099.1 decline; ESLint-only shipped.
  - **CORE-321** (2026-06-14) — codified the decline into `docs/CONVENTIONS.md` §Declines "CI / GitHub Actions" with full rationale (Phase 3 + `/ft-release` already gate; solo system, no external PR surface).
  - **CORE-323** — an audit-repo simulation validated "deliberate CI-free minimalism" as internally consistent and picked CORE-321 as next-task specifically to reinforce it.
  - **CORE-374** / **CORE-384** — established the invariant that any `docs/CONVENTIONS.md` §Declines change must update its `README.md`/`CONTRIBUTING.md` mirrors in the same commit.
  - **CORE-383** — cited the CI decline when choosing which shields.io badges were honest (no build/coverage badge, since no CI existed).

  This is the third time the same "add CI" idea has surfaced and previously been rejected. Surfaced to the user via AskUserQuestion (twice — once for the initial conflict, once with the fuller history); user confirmed proceeding with a full reversal + mirror update.

- [x] **Drift check** — Per SPEC.md §"Tasknote frontmatter" → "A superseded decision": CORE-099.1/CORE-115/CORE-321 recorded accurate decisions *at the time*; reversing a decision is "the system working, not a defect," and is explicitly distinguished from a falsified factual claim. **No superseded-claim pointer needed** on any of those archived tasknotes — this is a decision change, not a factual correction. `docs/CONVENTIONS.md`'s CI decline text (lines 86-94) still matches current file state; no path/line drift beyond what's being intentionally changed here.

- [x] Asked clarifying questions — two AskUserQuestion rounds: (1) surfaced the CORE-321 conflict, user chose "Proceed with epic, update CONVENTIONS.md"; (2) surfaced the fuller CORE-099.1/CORE-115/CORE-384 history + mirror-invariant scope, user chose "Proceed, full mirror update."

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

This task reverses a documented, three-times-reaffirmed architectural decision (see Archive skim). The reversal itself is not this task's call to make silently — it was surfaced and explicitly authorized by the user across two AskUserQuestion rounds before any code or docs changed. Scope grew from "author one workflow file" (the PLAN.md line) to also include `docs/CONVENTIONS.md` + its two mirrors, to keep the decline-list invariant (CORE-384) intact rather than trading one drift for another.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `.github/workflows/` is net-new (no existing workflow to extend or conflict with). For the docs, followed `docs/CONVENTIONS.md`'s existing per-entry shape (H3 heading + rationale paragraphs) and moved the entry between its existing `## Adheres to` / `## Declines` sections rather than inventing a new structure.

- [x] **Minimal refactor gate** — N/A, no existing code/doc structure needed refactoring beyond the one entry moved.

- [x] Implemented the minimal solution — `.github/workflows/ci.yml` added (single job, Node 20, npm cache, the six AGENTS.md §Validation commands verbatim); `docs/CONVENTIONS.md` §"CI / GitHub Actions" moved from Declines to Adheres to with reversal rationale; `README.md`/`CONTRIBUTING.md` mirror lists updated to match.

- [x] Updated/added tests — N/A, no testable code (YAML workflow + markdown docs); verified in Phase 3 by running the workflow's own commands locally and validating the YAML.

**Implementation Notes:**

`.github/workflows/ci.yml` — single `validate` job: checkout, `actions/setup-node@v4` (node-version 20, cache: npm, cache-dependency-path `viz/package-lock.json`), `npm --prefix viz ci`, then the three viz commands and three updater commands from AGENTS.md §Validation, in the same order as that doc. `docs/CONVENTIONS.md` — removed the `### CI / GitHub Actions` Declines entry (was lines 86-94), added a `### GitHub Actions CI` Adheres-to entry naming the reversal and citing CORE-099.1/CORE-115/CORE-321 by ID. `README.md:76` and `CONTRIBUTING.md:35` — "CI / GitHub Actions" moved from each file's declines parenthetical to its adheres-to parenthetical.


## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no unit-testable code changed (YAML workflow + markdown docs); instead ran the workflow's own six commands locally (below) to confirm they pass as CI would run them.

- [x] Ran lint/type-check on changed code — `.github/workflows/ci.yml` YAML validated with `ruby -ryaml -e "YAML.load_file(...)"` (no PyYAML on this machine) → parses clean.

- [x] **Quality assertions** — no duplication (workflow reuses AGENTS.md's commands rather than restating logic elsewhere), no dead code, no added public surface, docs stay internally consistent (Declines/Adheres-to mirrors match across all 3 files).

- [x] (frontend) N/A — no frontend surface touched.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Ran all six AGENTS.md §Validation commands locally (matching the workflow's exact invocation order) since GitHub Actions can't be triggered from this session:
- `npm --prefix viz test` → 300 passed (19 files)
- `npm --prefix viz run typecheck` → clean
- `npm --prefix viz run lint` → clean
- `node --test tools/update-adopters.test.mjs` → 32 passed, 0 failed
- `node --check tools/update-adopters.test.mjs` → OK
- `node --check tools/update-adopters.mjs` → OK

`.github/workflows/ci.yml` parses as valid YAML (Ruby's `YAML.load_file`).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — grepped all remaining `.flowtron/tasknote/README.md` §"AI-referenced docs" entries for `CI / GitHub Actions|no CI|CI-free|.github/workflows`, zero hits beyond the three already updated.
  - `README.md` — updated (this task's change: declines→adheres mirror)
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — updated (this task's change: CI entry moved Declines→Adheres to)
  - `CONTRIBUTING.md` — updated (this task's change: declines→adheres mirror)
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change
  - `docs/EXTERNAL-AGENTS.md` — no change
  - `docs/WORKTREES.md` — no change

- [x] Closed — all 5 Acceptance criteria ticked; no `[[⚠️ Superseded]]` pointer needed (SPEC.md §"Tasknote frontmatter" → "A superseded decision" explicitly excludes decision reversals from that mechanism — CORE-099.1/CORE-115/CORE-321 remain accurate records of what was decided then).

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

Added `.github/workflows/ci.yml`, a single-job GitHub Actions workflow (Node 20, npm-cached) that runs the six AGENTS.md §Validation commands verbatim on push/PR to `main` — this is the epic's (`CORE-EPIC-430`) core deliverable.

Discovery surfaced that this reverses a decision reaffirmed three times over roughly two months (`CORE-099.1` 2026-05-18, `CORE-115`, `CORE-321` 2026-06-14) declining CI as duplicative of Phase 3 / `/ft-release` gating for a solo, no-external-PR project. Surfaced to the user via two AskUserQuestion rounds before writing any code; both confirmed proceeding, including the full-mirror-update path.

**Changed files:**
- `.github/workflows/ci.yml` (new, 21 lines)
- `docs/CONVENTIONS.md` (moved 1 entry, Declines §"CI / GitHub Actions" [9 lines removed] → Adheres to §"GitHub Actions CI" [5 lines added])
- `README.md` (1 line, declines→adheres mirror)
- `CONTRIBUTING.md` (1 line, declines→adheres mirror)

**Verification:** all six workflow commands run locally with the results the workflow will reproduce in CI (viz: 300/300 tests, clean typecheck, clean lint; updater: 32/32 tests, both syntax checks clean); workflow YAML validated with Ruby's `YAML.load_file`. No way to trigger an actual GitHub Actions run from this session — first real push to `main` is the live confirmation.

**Refactors:** none — net-new workflow file; one doc entry relocated (not rewritten beyond the reversal rationale).

**Documentation verdict:** `docs/CONVENTIONS.md` + its two declared mirrors (`README.md`, `CONTRIBUTING.md`) now agree; the CORE-384 mirror invariant holds. No other AI-referenced doc touched CI.

**Maintainability effect:** closes the epic's stated gap ("gates only fire when a human runs them") — the same four command families now also run automatically and can't be silently skipped. Reusing AGENTS.md's commands verbatim (rather than a parallel CI-specific list) means the human doc and the CI config can't drift from each other by construction.

**Archived:** 2026-08-10
