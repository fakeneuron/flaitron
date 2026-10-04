---
title: wiring-doc-sync
status: completed
tags: []
created: 2026-07-07
due:
related-tasks: [CORE-EPIC-349, CORE-349.2, CORE-349.3]
---

# CORE-349.4 | wiring-doc-sync

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-349]] [[CORE-349.2]] [[CORE-349.3]]

## 🎯 Goal

Align the README, platform/adoption docs, Claude/Codex snippets, and updater wording with the installed-surface policy from [[CORE-349.2]].

## ✅ Acceptance

- [x] Public docs describe the shipped inventory, adopter-installed subset, global-only utilities, and flowtron-self-only release skill consistently.
- [x] Claude and Codex adopter snippets point to the same policy categories without implying every shipped `ft-*` skill is installed repo-scoped.
- [x] `/ft-update` wording treats Claude and Codex wiring surfaces consistently and no longer says Codex repo-scoped wiring installs the full wrapper inventory.
- [x] Focused validation finds no stale "full surface" / full-Codex-install wording in the targeted docs.

## 🧩 Subtasks

- [x] Sync README and platform/adoption docs to the installed-surface policy.
- [x] Sync Claude/Codex adopter snippets and `ft-update` wording.
- [x] Run focused grep/format validation.
- [x] Close the tasknote and archive the completed work.

## 🔗 Related

- [[CORE-EPIC-349]] — Parent epic for platform wiring policy cleanup.
- [[CORE-349.2]] — Established the installed-surface policy.
- [[CORE-349.3]] — Removed `ft-release` and non-adopter skills from the Codex repo-scoped snippet.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN row is open and still matches the remaining broad doc-sync work after [[CORE-349.2]] defined policy and [[CORE-349.3]] fixed the narrow Codex executable snippet.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Read `README.md`, `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `claude/skills/ft-update/SKILL.md`, `codex/skills/ft-update/SKILL.md`, and prior tasknotes [[CORE-349.2]] / [[CORE-349.3]].
- Archive skim: [[CORE-349.2]] made `docs/PLATFORMS.md` the canonical policy source and explicitly deferred downstream snippet/docs sync; [[CORE-349.3]] narrowed the Codex executable snippet to the adopter subset and excluded `ft-release`; [[CORE-345]] made updater detection platform-aware and is the precedent for `ft-update` wording.
- Drift check: the task premise is current. `docs/PLATFORMS.md` already owns the policy, `codex/AGENTS-snippet.md` no longer symlinks `ft-release`, but README/MIGRATION/AGENT-COMPAT/snippet/updater prose still has stale or incomplete wording around full shipped inventory versus repo-scoped adopter installs.
- No clarifications needed. Assumptions: this child should make wording consistent without adding release guardrail logic, which remains with [[CORE-349.5]]; `docs/PLATFORMS.md` remains the canonical policy rather than duplicating the full table everywhere.

Discovery surfaced no significant deviation -> skip 🛠️.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: `docs/PLATFORMS.md` owns the canonical installed-surface table, while `docs/MIGRATION.md` and the per-platform `AGENTS-snippet.md` files point to executable install commands. The right shape is short policy pointers in consumer docs, not a duplicated category table in every file.
- Updated `README.md` repo layout to distinguish Claude's full shipped inventory from the adopter-installed policy subset and `ft-release`'s flowtron-self-only status.
- Updated `docs/MIGRATION.md` §1.2 / §1.7 to describe the shared adopter subset for Claude and Codex, point global utilities and `ft-release` to their proper categories, and describe Codex verification as the wired subset.
- Updated `docs/AGENT-COMPAT.md` and `docs/PLATFORMS.md` so shipped inventories and repo-scoped adopter installs are no longer conflated, especially for Codex.
- Updated `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, and `claude/skills/ft-update/SKILL.md` to point at the same subset/global/self-only categories. The `ft-update` source skill no longer says Codex repo-scoped wiring installs the full wrapper inventory.
- No behavior tests were added because this is a docs/procedure wording task; validation is grep/count/format based.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `rg -n 'full Flowtron skill surface|full `codex/skills/\*`|full wrapper inventory|Codex repo-scoped wiring intentionally|wire the full|symlink the bundle|alongside the other flowtron skills|CORE-349\.4|exposes the shipped Flowtron' README.md docs/PLATFORMS.md docs/AGENT-COMPAT.md docs/MIGRATION.md claude/AGENTS-snippet.md codex/AGENTS-snippet.md claude/skills/ft-update/SKILL.md codex/skills/ft-update/SKILL.md` returned no matches.
- `grep -c '^ln -s ../../.flowtron/core/claude/commands/' claude/AGENTS-snippet.md` returned `12`.
- `grep -c '^ln -s ../../.flowtron/core/claude/skills/' claude/AGENTS-snippet.md` returned `12`.
- `grep -c '^ln -s ../../.flowtron/core/codex/skills/' codex/AGENTS-snippet.md` returned `12`.
- `git diff --check` passed.
- No frontend files changed; visual confirmation not applicable.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — updated repo-layout wording for full shipped Claude inventory vs adopter subset and `ft-release` self-only status.
  - `SPEC.md` — no change.
  - `docs/MIGRATION.md` — updated §1.2 and §1.7 to align adopter wiring docs with the policy subset for Claude and Codex.
  - `claude/AGENTS-snippet.md` — updated verification prose and added the adopter-subset/global/self-only note.
  - `codex/AGENTS-snippet.md` — added the policy pointer, clarified newly shipped adopter-subset symlinks, and avoided bundle wording in the maintainer hot-reload note.
  - `docs/CONVENTIONS.md` — no change.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change.
  - `docs/AGENT-NEUTRALITY.md` — no change.
  - `docs/PLATFORMS.md` — updated the Codex surface row, worked examples, trigger table, and follow-up note to keep shipped inventory distinct from adopter-installed subset.
  - `claude/CAPABILITIES.md` — no change.
  - `docs/AGENT-COMPAT.md` — updated matrix and reading notes to distinguish shipped inventories from adopter repo wiring.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-07.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Aligned the docs and updater wording with the installed-surface policy: Flowtron can ship the full Claude/Codex `ft-*` inventory upstream, but adopter projects wire only the tasknote family, worktree pair, and `ft-update`; global utilities stay in user-level wiring and `ft-release` stays flowtron-self-only.

Technical detail: refreshed README, MIGRATION, AGENT-COMPAT, PLATFORMS, Claude/Codex snippets, and `ft-update` prose. Validation confirmed no targeted stale full-surface/full-Codex-install wording remains, the Claude/Codex snippets still expose 12 adopter-subset links each, and formatting passes.

**Archived:** 2026-07-07
