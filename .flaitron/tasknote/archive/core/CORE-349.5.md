---
title: release-wiring-guardrails
status: completed
tags: []
created: 2026-07-08
due:
related-tasks: [CORE-EPIC-349, CORE-349.2, CORE-349.3, CORE-349.4]
---

# CORE-349.5 | release-wiring-guardrails

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-349]] [[CORE-349.2]] [[CORE-349.3]] [[CORE-349.4]]

## 🎯 Goal

Extend release standing checks so Claude and Codex adopter snippets are verified against the installed-surface policy, not only against symlink-count parity.

## ✅ Acceptance

- [x] Release standing checks explicitly verify the adopter-installed subset for Claude and Codex.
- [x] Release standing checks fail when flowtron-self-only, global-only, or audit overlay skills are installed in adopter repo-scoped snippets.
- [x] Existing shipped-inventory parity between Claude and Codex remains covered.
- [x] Focused validation proves the current snippets pass the new policy checks.

## 🧩 Subtasks

- [x] Complete Discovery across release checks, installed-surface policy, snippets, and prior CORE-349 tasknotes.
- [x] Update the release standing checks to enforce explicit installed-surface policy categories.
- [x] Run focused shell validation for inventory parity and snippet policy membership.
- [x] Close and archive the tasknote.

## 🔗 Related

- [[CORE-EPIC-349]] — Parent epic for platform wiring policy cleanup.
- [[CORE-349.2]] — Established the installed-surface policy.
- [[CORE-349.3]] — Removed `ft-release` and non-adopter skills from the Codex snippet.
- [[CORE-349.4]] — Synced docs and updater wording to the installed-surface policy.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN row is open, scoped to the release guardrail left by the prior policy/doc children, and still matches the current release skill drift.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Read `claude/skills/ft-release/SKILL.md`, `codex/skills/ft-release/SKILL.md`, `docs/PLATFORMS.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, and prior tasknotes [[CORE-349.2]], [[CORE-349.3]], and [[CORE-349.4]].
- Archive skim: [[CORE-349.2]] made `docs/PLATFORMS.md` the canonical installed-surface policy; [[CORE-349.3]] removed `ft-release` and other non-adopter skills from the Codex repo-scoped snippet; [[CORE-349.4]] synced public docs and updater wording while explicitly leaving release guardrail logic for this child.
- Drift check: the task premise is current. `claude/skills/ft-release/SKILL.md` still has a Claude symlink count check and a Claude/Codex inventory parity check whose Codex snippet assertion compares repo-scoped symlink count to the full shipped inventory, which now contradicts the policy that adopter snippets install only the tasknote family, worktree pair, and `ft-update`.
- No clarifications needed. Assumptions: the release skill is the right enforcement surface because Codex delegates release execution to the Claude skill body; this task should keep Flowtron's no-runtime-validator posture and encode shellable release-time checks in the standing release procedure.

Discovery surfaced no significant deviation -> skip 🛠️.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: release standing checks already live in `claude/skills/ft-release/SKILL.md` §7.1 next to doc-drift, symlink-count, and shipped-inventory checks. Extending that section preserves the existing markdown-operated release gate instead of adding a new script or validator.
- Split the prior Claude/Codex check into shipped-skill parity and installed-surface policy checks, so full upstream inventory parity remains separate from repo-scoped adopter install policy.
- Added an explicit adopter-installed slug list for the tasknote family, worktree pair, and `ft-update`.
- Added an explicit forbidden repo-scoped install list covering the audit scaffolds/overlays, global utilities, and flowtron-self-only `ft-release`.
- Replaced the stale Codex "snippet count equals inventory count" assertion with exact-set `diff` checks for Claude skills, Claude commands, and Codex skills plus explicit forbidden-install greps.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `diff -u <(find claude/skills ... | sort) <(find codex/skills ... | sort)` produced no output and exited 0; shipped skill slugs remain in parity.
- Exact-set `diff` for `claude/AGENTS-snippet.md` skills against the 12-slug adopter subset produced no output and exited 0.
- Exact-set `diff` for `claude/AGENTS-snippet.md` commands against the 12-slug adopter subset produced no output and exited 0.
- Exact-set `diff` for `codex/AGENTS-snippet.md` skills against the 12-slug adopter subset produced no output and exited 0.
- `rg` over Claude/Codex repo-scoped symlink lines for forbidden slugs (`ft-release`, global utilities, and audit scaffolds) produced no matches; exit 1 is expected for the no-match assertion.
- `git diff --check` passed.
- No frontend files changed; visual confirmation not applicable.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change.
  - `SPEC.md` — no change.
  - `docs/MIGRATION.md` — no change.
  - `claude/AGENTS-snippet.md` — no change.
  - `codex/AGENTS-snippet.md` — no change.
  - `docs/CONVENTIONS.md` — no change.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change.
  - `docs/AGENT-NEUTRALITY.md` — no change.
  - `docs/PLATFORMS.md` — no change; the installed-surface policy already matched the new release check.
  - `claude/CAPABILITIES.md` — no change.
  - `docs/AGENT-COMPAT.md` — no change.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-08.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Extended `/ft-release`'s standing checks so release cuts verify the installed-surface policy directly: Claude and Codex adopter snippets must expose exactly the tasknote family, worktree pair, and `ft-update`, while upstream-only audit scaffolds, global utilities, and `ft-release` stay out of repo-scoped wiring.

Technical detail: `claude/skills/ft-release/SKILL.md` now separates shipped Claude/Codex inventory parity from adopter snippet exact-set checks and explicit forbidden-install scans. Focused validation confirmed both shipped inventories still match, all three adopter install surfaces expose the same 12 expected slugs, forbidden symlinks are absent, and markdown whitespace is clean.

**Archived:** 2026-07-08
