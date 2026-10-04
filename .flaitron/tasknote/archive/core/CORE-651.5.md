---
title: lockfile-engines-sync
status: completed
tags: []
created: 2026-09-21
due:
related-tasks: []
touches:
  - viz/package-lock.json
---

# CORE-651.5 | lockfile-engines-sync

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-651.4]]

## 🎯 Goal

Regenerate `viz/package-lock.json` so its root `engines.node` matches the `viz/package.json` range CORE-651.4 set.

## ✅ Acceptance

- [x] `viz/package-lock.json`'s root `engines.node` matches `viz/package.json`'s `^24.15.0 || >=26.0.0` — `grep -n -A2 '"engines"' viz/package-lock.json | head -3`
- [x] Only that one field changed, no dependency-resolution shift — `git diff --stat viz/package-lock.json` (1 file, small diff)
- [x] Full viz validation roster passes — `npm --prefix viz test && npm --prefix viz run typecheck && npm --prefix viz run lint && npm --prefix viz run build`

## 🧩 Subtasks

- [x] Run `npm --prefix viz install` to regenerate `viz/package-lock.json`
- [x] Confirm the diff touches only the root `engines.node` field, no dependency-resolution shift — `git diff viz/package-lock.json`
- [x] Run the validation roster (`npm --prefix viz test && npm --prefix viz run typecheck && npm --prefix viz run lint && npm --prefix viz run build`)

## 🔗 Related

- [[CORE-651.4]] — dropped the `^22.22.2 ||` clause from `viz/package.json` `engines.node`; the lockfile's root `engines.node` still reads the pre-change range

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Confirmed live: `viz/package.json` `engines.node` is `^24.15.0 || >=26.0.0` (set by CORE-651.4); `viz/package-lock.json`'s root `""` package block still reads the pre-change `^22.22.2 || ^24.15.0 || >=26.0.0` (line 39). Matches the PLAN.md line's description exactly.

- [x] Read relevant source files — `viz/package.json` (`engines`), `viz/package-lock.json` (root `""` package block, `engines`).

- [x] **Best Practices Review** — N/A: single generated-file regen via `npm install`, no module boundaries or hand-written code involved.

- [x] **Archive skim** — grepped `archive/core/` for `package-lock`/`engines.node`; read `CORE-651.4.md` (the predecessor that edited `package.json` but not the lockfile) and `CORE-651.N.md` (the epic audit that found this exact drift, dry-ran the fix, reverted it, and filed this task). `CORE-651.N.md` Implementation Notes confirm: `npm --prefix viz install` changes only the root `engines.node` field, no dependency-resolution shift.

- [x] **Drift check** — no divergence: the PLAN.md description, the audit's dry-run finding, and current file contents all agree. No SPEC contract implicated (generated lockfile, not a workflow file).

- [x] Asked clarifying questions — No clarifications needed. Assumption: this task installs and commits the regenerated lockfile (per the PLAN.md line's prescribed fix and the audit's already-verified dry run); nothing further to decide.

- [x] Subtasks above populated with concrete, ordered steps; `touches:` declared (`viz/package-lock.json`).

**Discovery Notes:** CORE-651.N (the epic audit) already dry-ran this exact fix and reverted it before filing — `npm --prefix viz install` regenerates only the root `engines.node` field, no dependency shift. This task performs and commits that same regeneration.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: generated-file regeneration, no hand-written pattern to extend.

- [x] **Minimal refactor gate** — N/A: no refactor, `npm install` regenerates the lockfile mechanically.

- [x] Implemented the minimal solution — ran `npm --prefix viz install`; regenerated `viz/package-lock.json` with exactly the one-field change (`git diff --stat` → 1 file, +1/-1 line).

- [x] Updated/added tests for non-trivial behavior — N/A: lockfile regen, no application logic.

**Implementation Notes:** `npm --prefix viz install` → root `""` package block's `engines.node` changed from `^22.22.2 || ^24.15.0 || >=26.0.0` to `^24.15.0 || >=26.0.0`, matching `viz/package.json`. No other lines changed; `npm audit` reports 0 vulnerabilities.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` (lockfile change, ran full roster below)

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck`, `npm --prefix viz run lint`

- [x] **Verification receipt** — recorded below. No duplication/dead code/complexity introduced (generated file only); no stale code-facing documentation implicated.

- [x] (frontend) N/A — not a frontend change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**
- `grep -n -A2 '"engines"' viz/package-lock.json | head -3` → root `engines.node` reads `^24.15.0 || >=26.0.0`
- `git diff --stat viz/package-lock.json` → 0 (1 file changed, 1 insertion(+), 1 deletion(-))
- `npm --prefix viz test` → 0 (575/575 tests passed, 29 files)
- `npm --prefix viz run typecheck` → 0
- `npm --prefix viz run lint` → 0
- `npm --prefix viz run build` → 0 (317 modules, built in 221ms)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `AGENTS.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change · `docs/WORKTREES.md` no change · `docs/VISION.md` no change (lockfile-only regen; no doc in the roster mentions `package-lock.json` or discusses lockfile currency)

- [x] Closed — every `## ✅ Acceptance` criterion ticked; `status:` flipped to `completed`; PLAN.md line flipped to stub form and kept nested beneath the still-active `CORE-EPIC-651` parent; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:** Regenerated `viz/package-lock.json` via `npm --prefix viz install` (1 file, +1/-1 line) — root `""` package block's `engines.node` now reads `^24.15.0 || >=26.0.0`, matching the `viz/package.json` range CORE-651.4 set, closing the drift CORE-651.N's epic audit found and dry-ran. No dependency-resolution shift (confirmed by the audit's prior dry run and this task's own `git diff --stat`). Full validation roster passes: 575/575 tests, typecheck, lint, and build all exit 0. Doc-drift sweep: all 18 AI-referenced docs — no change (generated-file-only fix). `touches:` scope reconciliation: `git diff --name-only` → `viz/package-lock.json` — matches declared `touches:` exactly. Maintainability effect: closes the last open follow-up from the CORE-651 gate-reliability epic; `CORE-EPIC-651` is now ready for `/ft-close-epic`.

**Archived:** 2026-09-21
