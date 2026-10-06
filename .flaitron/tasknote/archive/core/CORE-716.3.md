---
title: updater-test-runtime
status: completed
tags: []
created: 2026-10-06
due:
related-tasks: [CORE-EPIC-716]
touches:
  - tools/update-adopters.test.mjs
---

# CORE-716.3 | updater-test-runtime

[← PLAN.md](../../../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-716]]

## 🎯 Goal

Cut `tools/update-adopters.test.mjs` wall-clock from ~52s to ≤25s by sharing fixture work, with every test still passing.

## ✅ Acceptance

- [x] Suite passes with no test dropped (65/65) — `node --test tools/update-adopters.test.mjs`
- [x] Suite wall-clock ≤25s (median of 3 local runs) — `time node --test tools/update-adopters.test.mjs`
- [x] Syntax checks clean — `node --check tools/update-adopters.test.mjs && node --check tools/update-adopters.mjs`
- [x] No production code changed; every test keeps its own assertions — `git diff --name-only` shows only the test file (plus workflow files)

## 🧩 Subtasks

- [x] Measure baseline per-group durations
- [x] Profile one `makeAdopter` call to find the dominant cost
- [x] Cut the dominant fixture cost (`clone -n`) and overlap fixture-isolated tests (`{ concurrency: true }` on 5 groups) — operator-chosen over literal fixture sharing
- [x] Re-time 3 runs; confirm 65/65

## 🔗 Related

- [[CORE-EPIC-716]] — parent epic (gate-hygiene)
- [[CORE-360]] — built the harness (`makeAdopter`, shared local mirror clone)
- [[CORE-651.3]] — `rmTree` retry for macOS `ENOTEMPTY` on cleanup

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** Outcome still valid (baseline 51.4s, 65/65). Mechanism changed: fixture sharing alone could not reach ≤25s, so the operator chose `clone -n` + per-group concurrency; PLAN line reworded to match.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flaitron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Baseline:** 51.4s, 65/65. Slowest groups: rename migration 14.0s, checkAdopter 12.5s, sandboxed --apply 6.8s, dry-run CLI 4.6s, canonicalTagSha memo 4.0s.
- **Profile:** `git clone --local --no-hardlinks` of the mirror takes ~0.6s, almost all of it the default-branch checkout that `makeAdopter` immediately replaces with `checkout <pinTag>`. `clone -n` + one checkout takes ~0.28s. `cp -R` of a template adopter (~0.7s) is no faster, so template-copy sharing would not pay.
- **Remaining cost:** each test also spends 1–2s in serial `git` subprocesses (`checkAdopter`, `applyBump`, `applyMigrate`). node:test runs a file's tests sequentially by default; a `{ concurrency: true }` prototype on the fixture-isolated groups measured 21.6 / 22.8 / 22.0s.
- **Best Practices Review:** test-only change. It keeps `makeAdopter`'s shape and leaves each test owning its fixture, so concurrency doesn't couple tests. Process-wide mutators stay serial: CORE-585 swaps `process.env.PATH`; CORE-424.3 adds a lightweight tag to FLAITRON_REPO.
- **Archive skim:** many hits for the test file, filtered by harness and runtime terms. [[CORE-360]] set up the shared local mirror "for speed"; `--no-hardlinks` is kept, though hardlinks aren't the cost. [[CORE-651.3]]'s `rmTree` retry still covers cleanup; group roots are removed in `after()` once concurrent tests settle. [[CORE-424.N]] recorded 51.6s for the 32-test suite, so this runtime has persisted.
- **Drift check:** the PLAN line's group timings (12.8s / 8.9s) are close to the measured 14.0s / 6.8s, and the 65-test count matches. No SPEC contract touched. PLAN-line mechanism drift resolved by Re-scope.
- **Clarifications:** AskUserQuestion on approach; operator chose "clone -n + group concurrency".

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey:** uses node:test's built-in `describe(name, { concurrency: true }, fn)` option; no new helpers.
- **Minimal refactor gate:** no refactor. The CORE-419.3 forged clone keeps its default checkout; it runs once and isn't worth touching.
- `makeAdopter`: added `-n` to the fixture clone, with a 2-line comment.
- `{ concurrency: true }` on checkAdopter classification, dry-run CLI, sandboxed --apply, applyBump rollback, and rename migration. One comment above the first group states the isolation rule and names the groups that stay serial.
- **Tests:** none added. The change is the test harness itself; all 65 existing tests carry the assertions unchanged.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) N/A — no frontend. Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- **Receipt so far:**
  - `node --test tools/update-adopters.test.mjs` → exit 0, 65/65 on every run (14 runs, including the A/B and capped runs).
  - `node --check tools/update-adopters.test.mjs && node --check tools/update-adopters.mjs` → exit 0.
  - `git diff --name-only` → `.flaitron/PLAN.md`, `tools/update-adopters.test.mjs`.
- **Timing (not decided yet):**
  - Quiet window, uncapped concurrency: 21.6 / 22.8 / 22.0s; later 23.6s at load ~9.
  - HEAD baseline: 51.4s.
  - Interleaved A/B under contention, HEAD → change: 68→43s, 148→107s, 215→55s.
  - Capped (`availableParallelism()`) at load 15–19 on 8 cores: 25.2 / 31.5 / 40.7s.
  - **Parked:** the operator is running many Claude Code sessions, so the host won't idle for a while. On resume, re-time 3 runs at load ≤8 and tick or annotate the ≤25s criterion.
  - **Resumed 2026-10-06** (no drift: no commit touched `tools/` since the park). Starting load 4.5–5.7 on 8 cores; it rose to ~8.8 during the runs. `node --test --test-reporter=tap tools/update-adopters.test.mjs` ×3 → exit 0, 65/65 each, `duration_ms` 28.6 / 21.2 / 24.0s → **median 24.0s ≤25s, met**. The first run's 28.6s shows the suite is still sensitive to host load; the median criterion absorbs it.
  - `node --check tools/update-adopters.test.mjs && node --check tools/update-adopters.mjs` → exit 0 (re-run on resume).
  - **Structural quality:** no duplication or dead code; one constant (`GROUP_CONCURRENCY`) and one comment block explain the concurrency rule; no public-surface growth (test file only); no code-facing doc cites the suite runtime.
- **External review** (`/code-review medium`, working-tree diff), 6 findings, all notes, none blocking:
  1. Suite at 38s misses the target, with "~16s in the before hook" — the hook's tag scan measured 64ms, and a filtered run including mirror clone and startup measured 2.2s at load 17. The 38s came from host contention; the timing criterion stays open (the park reason).
  2. `--no-hardlinks` copies objects, so the real cost is elsewhere — no change. Serial profiling showed `clone -n` with and without hardlinks at about the same time (0.109 vs 0.086s); the checkout was the dominant cost.
  3. Unbounded concurrency could flood a small CI runner — **fixed**: `GROUP_CONCURRENCY = availableParallelism()`.
  4. Shared module caches could cache a transient error — mitigated by fix 3's cap. The caches were already shared across tests before this change; no failures in 14 runs.
  5. `Promise.all` over sequential `makeAdopter` calls inside single tests — declined: an optional further gain, not needed for the criterion; revisit on resume only if the quiet re-time misses 25s.
  6. Concurrent groups widen the `rmTree` ENOTEMPTY race — no change: `rmTree` already retries 10× (CORE-651.3), and group roots are removed in `after()` once every test has settled; no failures in 14 runs.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

- **Doc-drift sweep:** no change to all 18 AI-referenced docs (README, AGENTS, SPEC, MIGRATION, the four agent snippets, CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT, EXTERNAL-AGENTS, WORKTREES, VISION). The change is test-harness-only, and grep found no doc citing the suite runtime.
- **Recap:** `tools/update-adopters.test.mjs` (+22/−7, landed in park commit `8fd1ee74`): `clone -n` in `makeAdopter`, plus `{ concurrency: GROUP_CONCURRENCY }` (= `availableParallelism()`) on 5 fixture-isolated groups. Process-wide mutators (CORE-585 PATH swap, CORE-424.3 tag) stay serial. Suite went from 51.4s to a 24.0s median, 65/65. No refactor; the review's `Promise.all` idea was declined as not needed.
- **`touches:` reconciliation:** declared `tools/update-adopters.test.mjs`, and it matches. Workflow files (`.flaitron/PLAN.md`, this note) are the only other paths.
- **Maintainability:** the gate's release suite now runs in about half the time; the isolation rule is documented at the first concurrent group.
- **Learnings:** N/A — the concurrency-isolation rule lives in the test file's own comment.

**Archived:** 2026-10-06
