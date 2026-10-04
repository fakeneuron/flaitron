---
title: release-migration-sentinel
status: completed
tags: []
created: 2026-06-14
due:
related-tasks: [CORE-325]
---

# CORE-326 | release-migration-sentinel

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-325]]

## 🎯 Goal

Harden the `/ft-release` migration sentinel so `update-adopters.mjs` no longer false-flags the whole fleet as migration-bearing when the tag message's "all-clear" line deviates from the exact expected prefix.

## ✅ Acceptance

- [ ] The bug from CORE-325 is reproduced / understood: which exact string mismatch caused the false positive
- [ ] A fix is chosen and implemented: either (a) pin the sentinel string in the skill template or (b) make the detector tolerant (case-insensitive / inline match)
- [ ] A release-time check is added that catches the mismatch before the fleet migration run
- [ ] No regression: a correctly-formed all-clear still passes; a genuinely migration-bearing release still flags

## 🧩 Subtasks

- [x] 1. Fix `ft-release/SKILL.md:232` — change placeholder to use exact sentinel `No required project-side edits` (capital N) with explicit "exact sentinel" framing
- [x] 2. Fix `ft-release/SKILL.md:322` — update the notes reference to capital N form
- [x] 3. Make `update-adopters.mjs:156` case-insensitive (`.toLowerCase()` on both sides)
- [x] 4. Update `update-adopters.mjs:138-140` comment to note case-insensitive behavior
- [x] 5. Add release-time check in `ft-release` §7.2 — sentinel check paragraph added before "Lock the tag message"

## 🔗 Related

- [[CORE-325]] — source of the tag-message bug; root cause of this task

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Root cause confirmed. Two lowercase template occurrences in ft-release SKILL.md (lines 232, 322) clash with the capital-N sentinel in update-adopters.mjs:156; no scope ambiguity.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Root cause: `update-adopters.mjs:156` uses `startsWith('No required project-side edits')` (capital N strict prefix match). `ft-release/SKILL.md:232` placeholder and :322 notes both quote `"no required project-side edits"` (lowercase n). An agent following the template literally → lowercase → startsWith fails → fleet false-flagged migration-bearing.

v5.7.1 tag happened to use capital N (the agent chose it correctly), so no false-positive fired, but the latent inconsistency is real.

Archive skim: CORE-322 (update-adopters Node guard) and CORE-319 (prior release) are the closest prior tasknotes; neither touched the sentinel logic. No load-bearing precedent.

Drift check: `update-adopters.mjs:156` and `ft-release/SKILL.md:232,322` confirmed at described locations. Clean.

Fix strategy (user confirmed): both approaches — fix the template to explicit capital-N sentinel + make the detector case-insensitive. Release-time check added in ft-release §7.2 auto-draft step.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern: single-point fix in `migrationBearingTags()`; no new abstraction needed. Three file changes:

1. `tools/update-adopters.mjs:138-140` — comment updated to say "case-insensitively"
2. `tools/update-adopters.mjs:157` — `firstBody.startsWith(...)` → `firstBody.toLowerCase().startsWith('no required project-side edits')`
3. `claude/skills/ft-release/SKILL.md:232` — placeholder changed to `<...; if none, start with the exact sentinel: \`No required project-side edits\`>`
4. `claude/skills/ft-release/SKILL.md` (§7.2 body) — **Sentinel check** paragraph added before "Lock the tag message…"
5. `claude/skills/ft-release/SKILL.md:322` — notes changed from `"no required project-side edits"` to backtick form `\`No required project-side edits\``

No behavioral change for valid tags (they already start with capital N). Only catches future false-negatives (lowercase n) and makes the template unambiguous.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Inline unit test (Node `--input-type=module`) verified all 7 sentinel cases: correct passing (capital N, lowercase, all-caps), correct blocking (empty, genuine migration, BREAKING). `npm --prefix viz run lint` and `typecheck` clean. No frontend surface changed → 👁️ N/A.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (11 AI-referenced docs):** all 11 entries — no change. Task touched `tools/update-adopters.mjs` (tool, not in the sweep) and `claude/skills/ft-release/SKILL.md` (lazy SKILL module, explicitly out-of-scope per tasknote/README.md). Zero findings.

**Final Summary:** Hardened the `/ft-release` migration sentinel against a latent inconsistency (CORE-325 tag-message observation): the `ft-release/SKILL.md` §7.2 template and notes quoted `"no required project-side edits"` (lowercase) while `update-adopters.mjs:migrationBearingTags()` checked `startsWith('No required project-side edits')` (capital N strict match). Fixed by: (1) updating both template and notes references to the canonical `No required project-side edits` form; (2) making the detector case-insensitive (`.toLowerCase().startsWith('no required project-side edits')`); (3) adding a **Sentinel check** paragraph to §7.2 so the agent verifies the drafted message passes the check before surfacing for review.

**Archived:** 2026-06-14
