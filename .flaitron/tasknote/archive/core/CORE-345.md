---
title: codex-adopter-update-wiring
status: completed
tags: []
created: 2026-07-07
due:
related-tasks: [CORE-272, CORE-312, CORE-320, CORE-329.2, CORE-344]
---

# CORE-345 | codex-adopter-update-wiring

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-272]] [[CORE-312]] [[CORE-320]] [[CORE-329.2]] [[CORE-344]]

## 🎯 Goal

Make adopter update wiring detect newly shipped Codex skill wrappers and guide `.agents/skills` symlinks alongside the existing Claude `.claude/` wiring.

## ✅ Acceptance

- [x] `tools/update-adopters.mjs` detects newly added `codex/skills/*` wrappers that are listed in `codex/AGENTS-snippet.md`
- [x] Batch-update output tells operators when Codex `.agents/skills` wiring may need `/ft-update`, not only Claude `.claude/` wiring
- [x] `ft-update` adopter procedure documents platform-aware symlink rewiring for Claude and Codex surfaces
- [x] Targeted validation covers script syntax and the new detection behavior

## 🧩 Subtasks

- [x] Inspect current updater and adopter wiring snippets
- [x] Extend script detection from Claude-only wiring keys to platform-aware wiring keys
- [x] Refresh `/ft-update` procedure prose for Codex `.agents/skills`
- [x] Validate syntax and behavior with targeted commands

## 🔗 Related

- [[CORE-272]] — introduced `/ft-update`
- [[CORE-312]] — introduced `tools/update-adopters.mjs`
- [[CORE-320]] — narrowed `update-adopters` new-skill detection to snippet-wired Claude skills
- [[CORE-329.2]] — synced `/ft-update` wiring fan-out and added release count checks
- [[CORE-344]] — shipped full Codex `ft-*` skill wrappers and `codex/AGENTS-snippet.md`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-344 added full Codex wrappers and a `.agents/skills` wiring snippet, but adopter update detection and `/ft-update` prose still key primarily off Claude `.claude/` wiring.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Current `tools/update-adopters.mjs` checks added paths only under `claude/skills/` and `claude/commands/`, then filters against `claude/AGENTS-snippet.md` wiring keys. This is the CORE-320 false-positive fix, but it cannot see newly added `codex/skills/*` wrappers.
- `codex/AGENTS-snippet.md` is now the Codex wiring authority and lists `.agents/skills/<slug>` symlinks for every `codex/skills/<slug>` wrapper. Codex has no commands surface.
- `claude/skills/ft-update/SKILL.md` Step 4 still describes the authoritative wiring list as the Claude `.claude/` snippet block and Step 5 only smoke-checks/stages `.claude/`. The Codex wrapper only says to translate `.claude/` paths to Codex equivalents; the underlying procedure needs explicit platform-aware instructions.
- Archive skim: [[CORE-272]] established `/ft-update` as the single-repo adopter bump recipe; [[CORE-312]] added the batch updater and deliberately routed newly shipped per-project skills back to `/ft-update`; [[CORE-329.2]] synced Claude wiring fan-out and added release-time count checks; [[CORE-344]] added the full Codex wrapper inventory and `codex/AGENTS-snippet.md`.
- Drift check: task premise is current. The release flow already checks Claude/Codex skill parity and Codex snippet count, so this task should not add another parity gate. No clarifications needed. Assumptions: "guide `.agents/skills` symlinks" means report/run `/ft-update` for Codex-wired adopters rather than making the batch updater mutate symlink trees; `/ft-update` should fill missing symlinks only on platform wiring surfaces already present in the adopter.

Discovery surfaced no significant deviation -> skip 🛠️.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: CORE-320's updater logic already had the right shape: compare added files in a release range against the authoritative snippet wiring list at `toTag`, then advise `/ft-update` instead of mutating adopter symlinks in the fleet script. Extended that pattern across a `WIRING_SURFACES` table rather than adding a Codex-only branch.
- `tools/update-adopters.mjs` now checks Claude `.claude/` and Codex `.agents/skills` surfaces independently. The new `newSkillWiringSurfaces()` compares added files under each platform path against the matching snippet keys and `formatSkillsNote()` names the affected platform(s) in dry-run/apply output.
- `claude/skills/ft-update/SKILL.md` Step 4 is now platform-aware: Claude reads `<FT>/claude/AGENTS-snippet.md` and fills `.claude/` if present; Codex reads `<FT>/codex/AGENTS-snippet.md` and fills `.agents/skills/` if present. Step 5 now smoke-checks and stages whichever wiring dirs exist.
- `docs/MIGRATION.md` §"Pinning and bumping" now names both `.claude/` and `.agents/skills/` as stable symlink surfaces and says the fleet updater flags newly shipped Claude or Codex skill symlinks.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `node --check tools/update-adopters.mjs` passed.
- Temporary test-module behavior check against `v5.10.1..HEAD` returned `["Codex .agents/skills"]` and formatted the note: `new skills shipped in range — run /ft-update to wire Codex .agents/skills symlinks`.
- `node tools/update-adopters.mjs --root /private/tmp` passed as a dry-run smoke check: no adopters found, latest release resolved as `v5.10.1`.
- `git diff --check` passed.
- No frontend files changed; visual confirmation not applicable.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change.
  - `SPEC.md` — no change.
  - `docs/MIGRATION.md` — updated §"Pinning and bumping" to include `.agents/skills` and the fleet updater's Claude/Codex symlink flag.
  - `claude/AGENTS-snippet.md` — no change.
  - `codex/AGENTS-snippet.md` — no change.
  - `docs/CONVENTIONS.md` — no change.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change.
  - `docs/AGENT-NEUTRALITY.md` — no change.
  - `docs/PLATFORMS.md` — no change.
  - `claude/CAPABILITIES.md` — no change.
  - `docs/AGENT-COMPAT.md` — no change.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-07.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Tightened adopter bump wiring for Codex: the batch updater now detects newly shipped `codex/skills/*` wrappers listed in `codex/AGENTS-snippet.md` and reports that Codex `.agents/skills` symlinks need `/ft-update`, alongside the existing Claude `.claude/` path. The `/ft-update` procedure now explicitly handles both platform wiring surfaces during Step 4/5 instead of relying on a Claude-only snippet description.

Technical detail: `tools/update-adopters.mjs` now uses a `WIRING_SURFACES` table for Claude and Codex diff paths/snippet keys, returning platform labels in the generated new-skills note. `claude/skills/ft-update/SKILL.md` documents platform-aware symlink fill, smoke checks, and staging; `docs/MIGRATION.md` now mirrors the Codex symlink stability/flagging behavior. Validation: `node --check`, extracted behavior check for `v5.10.1..HEAD`, dry-run smoke, and `git diff --check`.

**Archived:** 2026-07-07
