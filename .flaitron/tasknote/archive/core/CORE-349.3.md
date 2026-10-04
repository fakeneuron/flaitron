---
title: codex-release-exposure
status: completed
tags: []
created: 2026-07-07
due:
related-tasks: [CORE-EPIC-349]
---

# CORE-349.3 | codex-release-exposure

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-349]]

## 🎯 Goal

Remove `ft-release` from the Codex adopter wiring snippet so adopter projects do not install a flowtron-self-only skill.

## ✅ Acceptance

- [x] `codex/AGENTS-snippet.md` no longer instructs adopter projects to symlink `ft-release` under `.agents/skills/`.
- [x] The Codex adopter wiring wording reflects the installed subset policy rather than telling adopters to wire the full wrapper inventory.
- [x] Focused validation confirms the snippet still exposes the intended adopter-facing Codex skill set and no longer exposes `ft-release`.

## 🧩 Subtasks

- [x] Scaffold the tasknote and record Discovery findings from the parent policy task plus current snippet drift.
- [x] Update the Codex adopter wiring snippet to match the installed-surface policy.
- [x] Run focused validation on the snippet diff and close the task.

## 🔗 Related

- [[CORE-EPIC-349]] — Parent epic for platform wiring policy cleanup.
- [[CORE-349.2]] — Established the installed-surface policy this snippet must now implement.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN row is open, narrowly scoped to the Codex adopter snippet, and directly implements the policy codified in [[CORE-349.2]].

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Read `codex/AGENTS-snippet.md`, `docs/PLATFORMS.md`, `docs/MIGRATION.md`, `SPEC.md`, `SPEC/epic.md`, and `.flowtron/tasknote/archive/core/CORE-349.2.md`.
- Archive skim: [[CORE-344]] introduced the Codex wrapper parity and snippet; [[CORE-345]] made updater detection platform-aware; [[CORE-349.2]] set the installed-surface policy and explicitly left the executable Codex snippet correction for this child.
- Drift check: the task premise is current. `codex/AGENTS-snippet.md` still says "wire the full Flowtron skill surface" and still includes `ln -s ../../.flowtron/core/codex/skills/ft-release .agents/skills/ft-release`, which contradicts `docs/PLATFORMS.md`'s policy that adopter projects wire only the tasknote execution family, worktree pair, and `ft-update`, while `ft-release` remains flowtron-self-only.
- No clarifications needed. Assumptions: this child should stay narrow and edit only the executable Codex snippet; broader wording sync across `docs/MIGRATION.md`, `docs/AGENT-COMPAT.md`, and `ft-update` references remains with [[CORE-349.4]] and [[CORE-349.5]].

Discovery surfaced no significant deviation -> skip 🛠️.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: `docs/PLATFORMS.md` now owns the installed-surface policy and `claude/AGENTS-snippet.md` already models the adopter-installed subset pattern, so the narrow change here is to make the Codex executable snippet match that policy rather than inventing a new wiring category.
- `codex/AGENTS-snippet.md` now describes the adopter-facing subset instead of the full wrapper inventory.
- Removed the adopter `.agents/skills` symlink lines for global-only utilities, focused audit overlays, and `ft-release`, leaving the tasknote execution family, worktree pair, and `ft-update`.
- Added explicit prose that global utility skills may live in the user skill directory and that `ft-release` is flowtron-self-only.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `rg -n "ft-release|full Flowtron skill surface|adopter-facing Flowtron skill subset|ft-new-project|ft-flowtron|ft-stats|ft-quality|ft-audit-context|ft-audit-repo" codex/AGENTS-snippet.md` confirms the executable snippet no longer wires `ft-release`, the old "full surface" wording is gone, and the remaining mentions are explanatory global/self-only notes.
- `grep -c "^ln -s ../../.flowtron/core/codex/skills/" codex/AGENTS-snippet.md` returned `12`, matching the policy subset: nine tasknote-family skills, two worktree utilities, and `ft-update`.
- `git diff --check` passed.
- No frontend files changed; visual confirmation not applicable.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change; broader wiring-surface wording remains with [[CORE-349.4]].
  - `SPEC.md` — no change.
  - `docs/MIGRATION.md` — no change in this task; the higher-level install guide still needs follow-on wording sync in [[CORE-349.4]].
  - `claude/AGENTS-snippet.md` — no change.
  - `codex/AGENTS-snippet.md` — updated adopter wiring to the installed subset and explicitly marked `ft-release` as flowtron-self-only.
  - `docs/CONVENTIONS.md` — no change.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change.
  - `docs/AGENT-NEUTRALITY.md` — no change.
  - `docs/PLATFORMS.md` — no change; this task consumes the policy already landed there.
  - `claude/CAPABILITIES.md` — no change.
  - `docs/AGENT-COMPAT.md` — no change; broader wording sync remains with [[CORE-349.4]].

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-07.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Aligned the Codex adopter wiring snippet with the installed-surface policy: adopter projects now wire only the tasknote execution family, worktree pair, and `ft-update`, while `ft-release` is explicitly called out as flowtron-self-only and excluded from `.agents/skills/`.

Technical detail: `codex/AGENTS-snippet.md` now removes the adopter symlinks for `ft-release`, global utility skills, and focused audit overlays, replacing the old "wire the full Flowtron skill surface" wording with the narrower adopter subset description. Validation confirmed the snippet now contains 12 symlink lines, no adopter `ft-release` command, and no formatting drift.

**Archived:** 2026-07-07
