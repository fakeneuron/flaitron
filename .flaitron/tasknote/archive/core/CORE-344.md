---
title: codex-wiring-parity
status: completed
tags: []
created: 2026-07-06
due:
related-tasks: [CORE-271.4, CORE-290, CORE-272, CORE-285, CORE-329.2]
---

# CORE-344 | codex-wiring-parity

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-271.4]] [[CORE-290]] [[CORE-272]] [[CORE-285]] [[CORE-329.2]]

## 🎯 Goal

Ship first-class Codex wiring for the full Flowtron `ft-*` skill inventory, with low-duplication routing and a release-time parity check against Claude wiring.

## ✅ Acceptance

- [x] `codex/` exports every `ft-*` skill slug currently exported by `claude/skills/`
- [x] Codex adopter wiring is documented against Codex's native repo-scoped `.agents/skills` discovery surface
- [x] `ft-task` Codex wiring routes through `SPEC/procedures/ft-task.md`; other wrappers avoid copied skill bodies
- [x] Release flow includes a Claude/Codex inventory parity check
- [x] Platform/capability docs no longer describe Codex as contract-only
- [x] No generator/codegen/runtime script is added for parity maintenance

## 🧩 Subtasks

- [x] Promote starter context and confirm current Codex/Claude wiring surfaces
- [x] Add Codex skill wrappers for the full Claude `ft-*` exported inventory
- [x] Add Codex adopter wiring snippet for `.agents/skills`
- [x] Add release-time Claude/Codex parity gate
- [x] Refresh platform, compatibility, migration, and repo-layout docs
- [x] Validate inventory parity and Codex skill frontmatter

## 🔗 Related

- [[CORE-271.4]] — shipped Codex/Grok `ft-task` procedure-pointer wrappers
- [[CORE-290]] — documented `codex/` as procedure-pointer shipped, full bundle hypothetical
- [[CORE-272]] — shipped `/ft-update`, relevant to adopter-side wiring expectations
- [[CORE-285]] — release flow precedent for standing gates
- [[CORE-329.2]] — release-time wiring fan-out count-check precedent

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The task remains valid: Claude has 25 shipped `ft-*` skills, while `codex/` only has a procedure pointer for `ft-task`.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Starter context absorbed into the full tasknote. The captured file survey still matches current state: `codex/` has only `procedures/ft-task.md`; `docs/PLATFORMS.md` and `docs/AGENT-COMPAT.md` still describe Codex as contract-only/no full bundle.
- Codex official/local skill docs confirm the native install surface is skill folders with `SKILL.md`, discovered from `.agents/skills` in the repo walk, user `~/.agents/skills`, admin, and system locations. Codex explicit invocation is `/skills` or `$skill-name`; arbitrary custom `/ft-*` CLI slash commands are not the documented primitive. Implementation therefore targets first-class Codex skills with the same exported `ft-*` slugs and documents the invocation surface precisely.
- Archive skim: `CORE-271.4` established the per-agent procedure-pointer convention and `codex/procedures/ft-task.md`; `CORE-290` intentionally described `codex/` as procedure-pointer shipped/full bundle hypothetical; `CORE-272` noted that only `ft-task` had Codex/Grok projection then; `CORE-285` and `CORE-329.2` are release-flow precedents for standing checks without adding scripts.
- No clarifications needed. Assumptions: parity means exported slug/routing coverage, not byte-identical body copies; Codex wiring may use Codex-native `$ft-*`/`/skills` invocation rather than claiming unsupported arbitrary `/ft-*` CLI commands; no generator/codegen will be introduced.

Discovery surfaced no significant deviation -> skip 🛠️.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: Claude ships 25 `claude/skills/<slug>/SKILL.md` bodies plus command stubs; Codex's local skill standard uses `SKILL.md` frontmatter and repo-scoped `.agents/skills` discovery. Existing `codex/procedures/ft-task.md` is retained as the `ft-task` SOP pointer.
- Added 25 `codex/skills/<slug>/SKILL.md` wrappers matching the Claude exported skill inventory. Wrappers keep short Codex-native frontmatter and route to `SPEC/procedures/ft-task.md` for `ft-task`; other wrappers route to the canonical Claude skill body with explicit Codex primitive translation.
- Added `codex/AGENTS-snippet.md` as the Codex-specific install surface for `.agents/skills` symlinks and `$ft-*` / `/skills` invocation.
- Added a release-time Claude/Codex parity check to `claude/skills/ft-release/SKILL.md` §7.1.
- Refreshed platform/currency docs and migration snippets so Codex is no longer described as contract-only.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `comm -3 <(find claude/skills ...) <(find codex/skills ...)` returned no output: exported skill inventories match.
- `grep -c '^ln -s ../../.flowtron/core/codex/skills/' codex/AGENTS-snippet.md` returned `25`, matching the Codex skill inventory count.
- Codex `quick_validate.py` could not run because the local script is not executable and `python3` lacks PyYAML (`ModuleNotFoundError: No module named 'yaml'`). Equivalent Ruby validation parsed all Codex `SKILL.md` frontmatter and checked name/folder match, required fields, lowercase-hyphen names, non-empty descriptions, and no extra frontmatter keys.
- `rg` stale-claim sweep found no remaining Codex contract-only/no-full-bundle claims outside the intentional `codex/procedures/ft-task.md` fallback wording.
- `git diff --check` passed.
- No frontend files changed; visual confirmation not applicable.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Shipped Codex first-class Flowtron skill wiring as 25 repo-scoped `codex/skills/<slug>/SKILL.md` wrappers matching the Claude exported inventory, plus `codex/AGENTS-snippet.md` for `.agents/skills` install and `$ft-*` / `/skills` invocation. Added a release-time Claude/Codex parity check and refreshed the platform, migration, compatibility, and repo-layout docs so Codex is no longer described as contract-only.

Doc-drift sweep:
- `README.md` — updated repo layout for shipped Codex wrappers.
- `SPEC.md` — updated flowtron-self layout notes for Codex wrappers and non-Claude SOP use.
- `docs/MIGRATION.md` — added Codex install/verify guidance and split Claude `/ft-*` from Codex `$ft-*`.
- `claude/AGENTS-snippet.md` — clarified Claude verification and pointed Codex users to `codex/AGENTS-snippet.md`.
- `docs/CONVENTIONS.md` — no change.
- `CONTRIBUTING.md` — no change.
- `SECURITY.md` — no change.
- `docs/AGENT-NEUTRALITY.md` — updated the MIGRATION ledger row for Codex wiring.
- `docs/PLATFORMS.md` — updated Today's surface, Codex worked example, and Codex trigger notes.
- `claude/CAPABILITIES.md` — no change.
- `docs/AGENT-COMPAT.md` — updated Codex row and pre-adoption narrative.
- `codex/AGENTS-snippet.md` — added to the AI-referenced docs set.

**Archived:** 2026-07-06
