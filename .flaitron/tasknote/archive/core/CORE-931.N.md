---
title: updater-modules audit
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-931, CORE-931.2, CORE-931.3, CORE-931.4, CORE-931.5, CORE-931.6, CORE-931.7, CORE-931.8]
touches:
  - .flaitron/sidequest/CORE-930.md
---

# CORE-931.N | updater-modules audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-931]]

## 🎯 Goal

Verify the completed `CORE-EPIC-931` (`updater-modules`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and a child row filed for any miss.

## ✅ Acceptance

- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; each miss filed as an open child row of `CORE-EPIC-931` (Step 5), landing in the audit's closure commit — no misses, so no rows
- [x] Single `feat: CORE-931.N — audit CORE-EPIC-931` (or `chore: ...` if no code edits land) commit lands — `chore:` (only `.flaitron/` files change)
- [x] PLAN.md line for `CORE-931.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-931.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5)
- [x] Phase 4: flip `CORE-931.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-931]] — parent epic
- [[CORE-930]] — open starter whose stale path this audit repointed
- [[CORE-932]] — open follow-up (module `node --check` roster), filed by CORE-931.3
- [[CORE-935]] — open follow-up (Node-guard order), filed by CORE-931.8

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/ft-close-epic` invoked by the operator; pre-flight passed. Cohort state at audit time: all seven implementation children (`.2`–`.8`) closed 2026-11-24, no early audit. The epic has no `.1` (filed by `/ft-refactor`, plan on the child starters).

- [x] Read relevant source files — the seven archived cohort notes (Implementation Notes + Final Summary), the six module headers and import lines, and the entry's header, imports and exports

- [x] **Best Practices Review** — module boundaries checked: import graph is a DAG (`release` leaf → `workspace` → `text` → `wiring` → `check` / `apply`), no module imports the entry, the entry imports only `release`, `workspace`, `check`, `apply` and re-exports the rest

- [x] **Archive skim** — `<area>` = `core` (README table). Non-cohort archive hit for `CORE-931`: only `CORE-927` (the drift-line window cites CORE-931.5's citation fix); no bearing on the cohort's surfaces

- [x] **Drift check** — every path the cohort cited exists at HEAD (`tools/update-adopters/{apply,check,release,text,wiring,workspace}.mjs`); PLAN line matches; SPEC/epic.md re-read

- [x] No clarifications needed. Assumptions: full cohort closed; open follow-ups CORE-932 / CORE-935 (and pre-existing CORE-930) are standalone rows and stay outside the epic

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (the CORE-930 starter, the one inline fix)

**Discovery Notes:**

Cohort deliverables:

- **CORE-931.2** release-module — `release.mjs` (git runner, tag reads, release-note classification, four caches under one `memoByKey`); facade pins for the entry's export set and `FLAITRON_REPO`.
- **CORE-931.3** workspace-module — `workspace.mjs` (workspace root, path helpers, `pinnedVersion`, adopter discovery); Version-regex parity test repointed; `viz/src/workspace.ts` comments. Filed CORE-932.
- **CORE-931.4** text-module — `text.mjs` (pure markdown helpers: `PIN_LINE`, fence scan, Workflow-block / pin-line rewrites, `snippetLinks`, `codexRoster`).
- **CORE-931.5** wiring-module — `wiring.mjs` (`wiringPlan`, `wireSkills`, dangling-link prune, audit-fork reads; `cachedForkDrift` on `memoByKey`).
- **CORE-931.6** check-module — `check.mjs` (`gitlinkDrift`, `checkAdopter`, private gitlink / ledger reads); `release.mjs` comment repointed.
- **CORE-931.7** apply-module — `apply.mjs` (write path: `verifyPinnedSha`, `applyBump`, rollback, follow-through); entry down to the CLI.
- **CORE-931.8** entry-docs — 193-line header split onto the modules; module map in the entry; SECURITY.md, `SPEC/layout.md`, README, `SPEC/scope-boundaries.md`, audit overlay and `ft-update` pointers repointed. Filed CORE-935.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: verification pass, no new code surface; the one fix follows the cohort's own stale-pointer repoints (CORE-931.6's `release.mjs` comment, CORE-931.8's doc pointers)

- [x] **Minimal refactor gate** — no refactor; the ragged comment wrap below is noted, not touched

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: no code changed

**Implementation Notes:**

- **Cohort inventoried** — seven children, one module each plus the docs pass (Discovery Notes).
- **Coherence findings** — consistent: every module opens with an `update-adopters <area>: … (CORE-EPIC-931)` line; `text.mjs` and `workspace.mjs` keep a one-line header pointing to where their rules live (they hold no contract prose of their own), the other four carry their header sections. Every positional cross-reference in the modules ("above" / "below" / "in check.mjs") resolves within its own file or names the sibling. The entry's module map matches the six files. No doc outside the archive cites a line or section of the entry that moved. Import graph acyclic, no entry imports.
- **Regressions** — none: updater suite 124/124, `node --check` on the entry and all six modules → 0, `bash tools/drift-checks.sh` → 0.
- **Inline fix** — `.flaitron/sidequest/CORE-930.md:16` placed `workflowPasteBlock` in `tools/update-adopters.mjs`; CORE-931.4 moved it to `tools/update-adopters/text.mjs`. Repointed (one-clause edit). CORE-932 and CORE-935 notes checked: accurate.
- **Nit, not filed** — `tools/update-adopters/release.mjs:80–81` wraps ragged ("… return when git could not answer. It" / "used to be …") after CORE-931.6's one-line repoint. Cosmetic; reflow on the next touch of that file.
- **Misses filed as child rows** — none.
- **Open hand-offs** — none deferred; the cohort's follow-ups are already rows (CORE-932, CORE-935).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A for the diff (markdown only); ran the updater suite as the regression check

- [x] Ran lint/type-check on changed code — N/A: markdown-prose edit only

- [x] **Verification receipt** — see Testing Notes

- [x] **External review** — N/A: the only edit is a one-clause path repoint in an open starter note, verified against `tools/update-adopters/text.mjs:64`

- [x] (frontend) N/A — no frontend surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node --test tools/update-adopters.test.mjs` → 0 (124/124)
- `node --check` on `tools/update-adopters.mjs` and each of `tools/update-adopters/*.mjs` → 0 ×7
- `bash tools/drift-checks.sh` → 0

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry:
  - `README.md` — no change (CORE-931.8 already names the module directory)
  - `AGENTS.md` — no change; §"Validation" still lists only the entry's `node --check`, which CORE-932 owns
  - `SPEC.md` — no change (the carve-out names the tool, not its internals)
  - `docs/MIGRATION.md` — no change (describes behaviour, unchanged)
  - `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md` — no change ("parsed by `tools/update-adopters.mjs`" stays true at tool level)
  - `docs/CONVENTIONS.md`, `CONTRIBUTING.md` — no change (no updater reference)
  - `SECURITY.md` — no change (CORE-931.8 repointed `git()` and the no-push clause)
  - `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/WORKTREES.md` — no change (no updater reference)
  - `docs/EXTERNAL-AGENTS.md` — no change; no stable-surface row names the updater's internals

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A

**Final Summary:**

The CORE-EPIC-931 cohort sits coherently: six modules under `tools/update-adopters/` with matching header style, an acyclic import graph, a facade entry whose module map matches the files, and no stale citations into moved code in the live docs. One stale pointer outside the cohort's reach was repointed: the open CORE-930 starter now places `workflowPasteBlock` in `text.mjs`.

- **Changed:** `.flaitron/sidequest/CORE-930.md` (one clause); PLAN.md (audit stub, parent flip, cohort move); this note.
- **Verification:** updater suite 124/124; `node --check` ×7 → 0; drift checks → 0.
- **Refactors:** none. Nit noted, not filed: ragged wrap at `release.mjs:80–81`.
- **Doc verdict:** no change across all 17 entries.
- **`touches:` reconciliation:** the diff is the declared CORE-930 note plus the closure files (PLAN.md, this note).
- **Follow-ups:** none new; CORE-932 and CORE-935 stay standalone open rows.
- **Maintainability:** the epic's goal holds — the 1,671-line updater is now a 363-line CLI over six single-responsibility modules.

**Archived:** 2026-11-24
