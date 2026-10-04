---
title: wiring-surface-policy
status: completed
tags: []
created: 2026-07-07
due:
related-tasks: [CORE-EPIC-349]
---

# CORE-349.2 | wiring-surface-policy

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-349]]

## 🎯 Goal

Define the canonical installed-surface policy for Claude and Codex: shipped inventory, adopter-installed subset, global-only utilities, and flowtron-self-only skills.

## ✅ Acceptance

- [x] Canonical policy identifies which Flowtron skills are shipped, adopter-installed, global-only, and flowtron-self-only for Claude and Codex.
- [x] Policy is written in the appropriate source-of-truth location without prematurely performing the downstream snippet/release guardrail changes assigned to sibling tasks.
- [x] Relevant docs/wiring surfaces have a clear follow-up path through the remaining CORE-349 children.

## 🧩 Subtasks

- [x] Complete Phase 1 Discovery across current wiring docs, snippets, and prior tasknotes.
- [x] Choose the narrow canonical policy surface and update it.
- [x] Run focused validation for markdown and parser-sensitive references.
- [x] Close the tasknote and archive the completed work.

## 🔗 Related

- [[CORE-EPIC-349]] — Parent epic for platform wiring policy cleanup.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The active PLAN.md row is open, policy-first, and still precedes the implementation/doc-sync/guardrail children that should consume the decision.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Read current wiring-policy surfaces: `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`, `docs/AGENT-NEUTRALITY.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `claude/skills/ft-update/SKILL.md`, and `claude/skills/ft-release/SKILL.md`.
- Archive skim: [[CORE-154.4]] established `docs/PLATFORMS.md` as the structural source of truth for platform wiring; [[CORE-205.1]] confirmed the contract/wiring split; [[CORE-344]] shipped full Codex wrapper parity and the Codex `.agents/skills` snippet; [[CORE-345]] made updater detection platform-aware; [[CORE-346]] shipped v5.11.0 with Codex wiring as optional adopter impact.
- Drift check: the task premise is current. `docs/PLATFORMS.md` and `docs/AGENT-COMPAT.md` say Claude and Codex both ship full `ft-*` inventories, while `docs/MIGRATION.md` and the snippets still blur shipped inventory, project-scoped install, global utilities, audit fork/overlay surfaces, and `ft-release`'s flowtron-self-only status. `codex/AGENTS-snippet.md` currently over-installs by listing the full wrapper inventory, including `ft-release`; that executable snippet correction belongs to [[CORE-349.3]] and [[CORE-349.4]].
- No clarifications needed. Assumptions: `docs/PLATFORMS.md` should own the canonical policy because it already owns platform structure; this child should define policy only, leaving install-snippet edits and broader doc sync to the sibling tasks; shipped inventory can remain full for parity/dogfooding even when adopter project wiring is a smaller subset.

Discovery surfaced no significant deviation -> skip 🛠️.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: `docs/PLATFORMS.md` already owns the two-layer contract/wiring model, "Today's surface" table, plug-in pattern, and mandatory/optional reference table. That makes it the narrow policy source; `docs/AGENT-COMPAT.md` is only the currency matrix, while `docs/MIGRATION.md` and the snippets own executable install motions.
- Added `docs/PLATFORMS.md` §"Installed-surface policy" defining shipped inventory, adopter-installed subset, global-only utilities, and flowtron-self-only skills.
- Policy table sets Claude and Codex to the same installed-surface rule: upstream ships the full `ft-*` inventory; adopter project wiring installs the tasknote execution family, worktree pair, and `ft-update`; focused audit scaffolds are fork/overlay surfaces; global utilities stay user-level; `ft-release` is flowtron-self-only.
- Adjusted nearby `docs/PLATFORMS.md` wording so the doc no longer says only Claude has wiring or that adopters symlink the whole bundle.
- Left `codex/AGENTS-snippet.md`, `docs/MIGRATION.md`, release checks, and updater guardrails untouched for [[CORE-349.3]], [[CORE-349.4]], and [[CORE-349.5]].

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `find claude/skills -mindepth 1 -maxdepth 1 -type d | wc -l` -> 25.
- `find codex/skills -mindepth 1 -maxdepth 1 -type d | wc -l` -> 25.
- `rg -n "Today only|symlink the bundle|wire the full Flowtron skill surface|ft-release \\.agents|full Flowtron skill surface" docs/PLATFORMS.md codex/AGENTS-snippet.md docs/MIGRATION.md` returned no hits in `docs/PLATFORMS.md`; remaining hits are the expected downstream `codex/AGENTS-snippet.md` drift assigned to [[CORE-349.3]]/[[CORE-349.4]].
- `git diff --check` passed.
- No frontend files changed; visual confirmation not applicable.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change; repo layout wording is handled by [[CORE-349.4]].
  - `SPEC.md` — no change; shipped-inventory wording remains factual and points to `docs/PLATFORMS.md`.
  - `docs/MIGRATION.md` — no change; adopter install prose is intentionally deferred to [[CORE-349.4]].
  - `claude/AGENTS-snippet.md` — no change; Claude executable symlink subset remains unchanged.
  - `codex/AGENTS-snippet.md` — no change in this task; known over-install of full wrapper inventory including `ft-release` is assigned to [[CORE-349.3]]/[[CORE-349.4]].
  - `docs/CONVENTIONS.md` — no change.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change.
  - `docs/AGENT-NEUTRALITY.md` — no change; contract/wiring split still matches the new policy.
  - `docs/PLATFORMS.md` — updated with the installed-surface policy and local stale wording cleanup.
  - `claude/CAPABILITIES.md` — no change.
  - `docs/AGENT-COMPAT.md` — no change; broader matrix wording sync is assigned to [[CORE-349.4]].

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-07.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Defined the canonical installed-surface policy in `docs/PLATFORMS.md`: Claude and Codex may ship the full `ft-*` inventory upstream, but adopter project wiring installs only the tasknote execution family, worktree pair, and `ft-update`; focused audits are fork/overlay surfaces, utility skills are global-only, and `ft-release` is flowtron-self-only.

Technical detail: the policy distinguishes shipped inventory, adopter-installed subset, global-only utilities, and flowtron-self-only skills, then maps those categories for both Claude Code and Codex CLI. Nearby stale PLATFORMS wording now recognizes Codex shipped wiring and avoids implying adopters symlink the whole bundle. Downstream executable snippet/doc guardrails remain for [[CORE-349.3]], [[CORE-349.4]], and [[CORE-349.5]].

**Archived:** 2026-07-07
