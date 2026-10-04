---
title: gate-reliability audit
status: completed
tags: []
created: 2026-09-21
due:
related-tasks: [CORE-EPIC-651]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-651.N | gate-reliability audit

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-651]]

## 🎯 Goal

Verify the completed CORE-651 gate-reliability epic (Pair Q out-of-repo skip, updater test-cleanup race fix, engines CI matrix) sits well in the codebase as a whole and catch any integration misses across the three implementation children.

## ✅ Acceptance

- [x] CORE-651.2's Pair Q out-of-repo skip still present and correctly cited — `grep -n "Pair Q" .github/workflows/ci.yml` + `grep -n "CORE-651.2" docs/CONVENTIONS.md claude/skills/ft-release/step-7.1-mirror-pairs.md`
- [x] CORE-651.3's cleanup-race fix still stable — `node --test tools/update-adopters.test.mjs` (x3, all 0 exit / 54 pass)
- [x] CORE-651.4's engines range still matches the CI node matrix — `grep -n engines viz/package.json` vs `grep -n "node:" .github/workflows/ci.yml`
- [x] Full viz validation roster passes post-epic — `npm --prefix viz test && npm --prefix viz run typecheck && npm --prefix viz run lint && npm --prefix viz run build`
- [x] Doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" — `judgment` (per-doc read; no single grep covers the roster) — 19/19 no change
- [x] Any integration misses across the three children get filed, not fixed inline — `judgment` (audit is verification-only, per CORE-639.N precedent) — one found (`viz/package-lock.json` drift), filed as CORE-651.5

## 🧩 Subtasks

- [ ] Re-verify CORE-651.2's Pair Q out-of-repo skip logic in `ci.yml` and its citations in `docs/CONVENTIONS.md` / `claude/skills/ft-release/step-7.1-mirror-pairs.md`
- [ ] Re-run `tools/update-adopters.test.mjs` 3x to confirm CORE-651.3's race fix holds
- [ ] Re-verify CORE-651.4's `viz/package.json` engines range against the CI `[24, 26]` matrix; run the full viz validation roster
- [ ] Grep repo-wide for stale restatements of the dropped `^22.22.2 ||` engines clause
- [ ] Cross-check `viz/package-lock.json` against `viz/package.json` for drift
- [ ] Doc-drift sweep across the AI-referenced docs roster
- [ ] File any misses found as follow-ups (not fixed inline)

## 🔗 Related

- [[CORE-EPIC-651]] — parent epic (gate-reliability); this is the terminal Audit subtask

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Standard epic-audit shape per `SPEC/epic.md` — CORE-651.2/.3/.4 are closed; this terminal `.N` verifies the cohort integrates cleanly before `/ft-close-epic` flips the parent.

- [x] Read relevant source files — `.github/workflows/ci.yml` (Pair Q step, node matrix), `docs/CONVENTIONS.md` (citer-obligations clause, CI roster paragraph), `claude/skills/ft-release/step-7.1-mirror-pairs.md` (Pair Q catalogue entry), `tools/update-adopters.test.mjs` (rmTree helper), `viz/package.json` + `viz/package-lock.json` (engines)

- [x] **Best Practices Review** — N/A: verification-only audit, no new code surface introduced by this task itself.

- [x] **Archive skim** — read `CORE-651.2.md`, `CORE-651.3.md`, `CORE-651.4.md` (frontmatter + Final Summary) for declared touches and verification results; read `CORE-639.N.md` as the precedent epic-audit shape (verification-only, findings recorded, no inline fixes, misses routed through `/ft-file-followup`).

- [x] **Drift check** — parent epic's PLAN.md description (Pair Q out-of-repo escape, `tools/` cleanup race, `viz/package.json` engines) matches what the three children actually shipped; no divergence between the epic description and the closed children.

- [x] Asked clarifying questions — No clarifications needed. Assumption: audit scope is the three implementation children (`.2`/`.3`/`.4`) plus cross-child integration; the parent-epic-row flip belongs to `/ft-close-epic`, not this `/ft-task` run, per SPEC §"Child placement invariant".

- [x] Subtasks above populated with concrete, ordered steps. No `touches:` declared — this task has no file deliverable of its own (findings route to a filed follow-up, `CORE-651.5`).

**Discovery Notes:** Three closed children: `.2` (Pair Q out-of-repo skip), `.3` (test-cleanup race fix via `rmTree`), `.4` (engines range trimmed to match the `[24, 26]` CI matrix). All three declared clean `touches:` reconciliation at their own closure.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: no new surface; verification pass over the three closed children plus a cross-child integration check, matching the `CORE-639.N` audit shape.

- [x] **Minimal refactor gate** — N/A: no edits applied by this task.

- [x] Implemented the minimal solution — verification only; one integration miss found (below) and routed to a filed follow-up rather than fixed inline, per the audit-is-verification-only precedent (`CORE-639.N`).

- [x] Updated/added tests for non-trivial behavior — N/A: no code edits landed.

**Implementation Notes:**

- **CORE-651.2 (Pair Q out-of-repo skip)** — confirmed live: `.github/workflows/ci.yml` `Pair Q` step (line 422) skips absolute/`~`-rooted citation paths per its comment block; `docs/CONVENTIONS.md` §"A citer's obligations" and `claude/skills/ft-release/step-7.1-mirror-pairs.md`'s Pair Q catalogue entry both cite `[[CORE-651.2]]` accurately.
- **CORE-651.3 (updater test-cleanup race)** — confirmed live: `tools/update-adopters.test.mjs` still uses the `rmTree` helper; 3 consecutive `node --test` runs → 0 fail, 54 pass each (see Testing Notes).
- **CORE-651.4 (engines/CI matrix)** — confirmed live: `viz/package.json` `engines.node` is `^24.15.0 || >=26.0.0`, matching the CI `validate` job's `strategy.matrix.node: [24, 26]`. Repo-wide grep for `22.22.2` found no stale restatements outside archived tasknotes.
- **Integration miss found:** `viz/package-lock.json`'s root-package `engines` field still read the pre-CORE-651.4 range (`^22.22.2 || ^24.15.0 || >=26.0.0`) — CORE-651.4 edited `viz/package.json` but never regenerated the lockfile. Verified the fix (`npm --prefix viz install` changes exactly that one field, no dependency-resolution shift), then **reverted** the local regeneration and **filed it as `CORE-651.5`** instead of fixing inline — consistent with `CORE-639.N`'s "audit findings → `/ft-file-followup`" precedent (audit's deliverable is verification, not code).
- **No other integration misses** — doc-drift sweep (below) found nothing else stale; no cohort-coherence conflicts between the three children (each touched disjoint files).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changes; full viz roster + fleet-updater suite re-run as the audit's own verification (below).

- [x] Ran lint/type-check on changed code — N/A: no code changes; `viz` lint/typecheck re-run as verification (below).

- [x] **Verification receipt** — recorded below. No avoidable duplication/dead code/complexity introduced (no code changed); no stale code-facing documentation found in the AI-referenced docs sweep.

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend UI change; `viz` is a passive read of existing source, not a rendered-page change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node --check tools/update-adopters.test.mjs` → 0
- `node --check tools/update-adopters.mjs` → 0
- `node --test tools/update-adopters.test.mjs` → 0 (x3 consecutive runs, 54/54 pass each time)
- `npm --prefix viz run typecheck` → 0
- `npm --prefix viz run lint` → 0
- `npm --prefix viz test` → 0 (575/575 pass, 29 files)
- `npm --prefix viz run build` → 0 (317 modules, built in 237ms)
- `grep -n "Pair Q" .github/workflows/ci.yml` → present, step body matches CORE-651.2's description
- `grep -rn "22\.22\.2"` repo-wide → hits only in archived tasknotes (historical record) and `viz/package-lock.json` (the miss, filed as CORE-651.5); no live stale restatement
- `grep -n "Node 2" <AI-referenced docs>` → `docs/CONVENTIONS.md` reads "on a Node 24/26 matrix" correctly; no other doc mentions a Node version

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `AGENTS.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change (already correct — CORE-651.2's citer-obligations clause and the "Node 24/26 matrix" CI paragraph both verified accurate) · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change · `docs/WORKTREES.md` no change · `docs/VISION.md` no change.

- [x] Closed — every `## ✅ Acceptance` criterion verified above; YAML `status:` flipped to `completed`; PLAN.md line flipped to stub form and kept nested beneath the still-active `CORE-EPIC-651` parent (the parent flip itself is `/ft-close-epic`'s job, not this run's); tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** — see Final Summary below.

**Final Summary:**

- Verified all three closed children's fixes are still live and correct: CORE-651.2's Pair Q out-of-repo skip (`ci.yml` + its two citing docs), CORE-651.3's `rmTree` cleanup-race fix (3x `node --test` → 0 fail, 54/54 pass each run), CORE-651.4's engines range vs the CI `[24, 26]` matrix.
- Full re-verification roster: `viz` test/typecheck/lint/build all pass (575 tests, 0 lint/type errors); fleet-updater suite syntax-checks and passes 3x.
- Doc-drift sweep: all 19 AI-referenced docs — no change.
- **One integration miss found and filed, not fixed inline:** `viz/package-lock.json`'s root `engines.node` still carried the pre-CORE-651.4 range because the lockfile was never regenerated after `package.json` was edited. Verified the one-line fix (`npm --prefix viz install`), then reverted the local regeneration and filed it as **CORE-651.5** (nested under the still-open `CORE-EPIC-651`, before the `.N` audit row) — audits stay verification-only, per the `CORE-639.N` precedent.
- `touches:` reconciliation: none declared (no file deliverable); `git diff --name-only` against the base commit (before this task's own scaffold + PLAN.md filing) shows only `.flowtron/PLAN.md` (the CORE-651.5 filing, already committed separately) and this tasknote's own path — matches.
- Maintainability effect: the CORE-651 gate-reliability epic's three fixes are confirmed integrated and mutually consistent; the one drift they left behind (lockfile out of sync with `package.json`) is captured as a tracked follow-up instead of silently lingering. `CORE-EPIC-651` is ready for `/ft-close-epic` once CORE-651.5 is also closed (or the operator judges it can close with the follow-up still open — that call belongs to the close-epic step, not this audit).

**Archived:** 2026-09-21
