---
title: ft-update-start-marker-stop
status: completed
tags: [ft-update, fleet-updater]
created: 2026-11-24
due:
related-tasks: [CORE-853, CORE-852.4]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
  - claude/skills/ft-update/SKILL.md
---

# CORE-916 | ft-update-start-marker-stop

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-853]] · [[CORE-852.4]]

## 🎯 Goal

`/ft-update`'s and the fleet updater's AGENTS.md `## Workflow` replace also ends the section at an unfenced `<!-- <name>:start -->` marker line, keeping that marker, so a marked section that follows the Workflow block survives a bump.

## ✅ Acceptance

- [x] `replaceWorkflowSection` ends the section at an unfenced line matching `<!-- [a-z0-9-]+:start -->` and keeps it, with one blank line before it — `node --test tools/update-adopters.test.mjs`
- [x] A fenced marker line does not end the section — `node --test tools/update-adopters.test.mjs`
- [x] `/ft-update` Step 3's Workflow-block rule names the marker stop — `grep -q ':start -->' claude/skills/ft-update/SKILL.md`
- [x] Syntax and drift checks pass — `node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs && bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Add the marker alternative to `SECTION_END`, which is already fence-aware via `headingLines`; update the comments
- [x] Add unit tests: marker after the section is kept; a fenced marker inside the section is not a stop
- [x] Update `/ft-update` Step 3 Workflow-block prose to match
- [x] Run the validation roster

## 🔗 Related

- [[CORE-853]] — predecessor: made the same replace fence-aware
- [[CORE-852.4]] — ported the Workflow replace from natabula wave-bump

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The defect is live: `SECTION_END = /^#{1,2} /` is the only stop in `replaceWorkflowSection` (`tools/update-adopters.mjs`), and SKILL.md Step 3 prose says the same. natabula NAT-643 saw the marker loss in four repos.

- [x] Read relevant source files — `tools/update-adopters.mjs` (~L996–1090), `tools/update-adopters.test.mjs` (~L1037–1080), `claude/skills/ft-update/SKILL.md` §"Step 3" Workflow block bullet

- [x] **Best Practices Review** — The change extends the existing fence-aware line scan; adding one more stop pattern beside `SECTION_END` keeps the responsibility in the same function. No new abstraction.

- [x] **Archive skim** — `archive/core/` (README table: `CORE-*` → `archive/core/`). CORE-853 made the same replace fence-aware, touching the same three files with a unit test, which is the shape to repeat. The CORE-852.x notes ported the replace from wave-bump. CORE-912 is the release re-measure.

- [x] **Drift check** — The PLAN line matches the code: Step 3 prose at SKILL.md:191–205, `SECTION_END` at update-adopters.mjs:1004. No codex/cursor/grok mirror carries the rule text (grep). Skill bodies are measured, not capped, in `docs/CONTEXT-BUDGET.md`.

- [x] No clarifications needed. Assumptions: (1) the marker matches a whole line, `^<!-- [a-z0-9-]+:start -->`, allowing trailing whitespace/CR like the heading regex; (2) the output shape matches the heading stop: block, one blank line, then the rest from the marker on; (3) `:end` markers are not stops (the PLAN line names only `:start`); (4) natabula's wave-bump mirror is out of scope (natabula's repo).

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:** The PLAN description is ~60 words, under the cap. It reads as full tier: three files, with a test.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `SECTION_END` (already filtered through the fence-aware `headingLines`), so the marker inherits CORE-853's fence skip for free

- [x] **Minimal refactor gate** — no refactor

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** `SECTION_END` gained a second alternative, `^<!-- [a-z0-9-]+:start -->[ \t]*\r?$`. The output shape is unchanged: block, blank line, rest from the stop line on, so the marker survives. Comments updated at the constant and at `replaceWorkflowSection`. SKILL.md Step 3 now names the marker stop, says it is kept, and says fenced markers never count. New unit test: a marker after Old. is kept, and a fenced `:start`, an `:end`, or an indented `:start` are not stops.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code — `node --check` on both files (the updater has no linter/type-check)

- [x] **Verification receipt** — see Testing Notes; no duplication or dead code; SKILL.md prose updated in the same diff

- [x] **External review** — `/code-review medium` over this task's uncommitted diff. No blockers; notes below

- [x] (frontend) N/A — no UI

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node --test tools/update-adopters.test.mjs` → 0 (123/123 pass). The new CORE-916 test, run against the pre-fix `update-adopters.mjs`, → 1 (fail 1), so it pins the defect.
- `node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs` → 0
- `bash tools/drift-checks.sh` → 0 (pair_p…pair_t ok)
- `grep -q ':start -->' claude/skills/ft-update/SKILL.md` → 0

**External review notes:**

- *Fixed:* added assertions for a marker line with trailing whitespace + CR, and for a marker as the first body line.
- *As designed:* a `:start` marker nested **inside** the Workflow section now cuts the replace short. The PLAN line asks for exactly this stop, and SKILL.md states it. flaitron's snippet carries no markers.
- *As designed:* only the exact `<!-- [a-z0-9-]+:start -->` form counts. That is the PLAN line's spec, and SKILL.md names the form.
- *Out of scope:* natabula's own wave-bump awk has the same H2-only stop. That is natabula's remit under NAT-643, the source of this row, and is not filed here.
- *Not filed:* the speculative case of a `:end` marker wrapping the Workflow section. It is pre-existing, and no adopter or snippet layout uses it.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `claude/skills/ft-update/SKILL.md` updated in this diff. `claude/AGENTS-snippet.md` and the other README-listed docs: no change. Skill bodies are measured (not capped) in `docs/CONTEXT-BUDGET.md`, and the next release re-measures them.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-11-24.` stub at top of `## Completed`, tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — changed files: `tools/update-adopters.mjs` (`SECTION_END` + 2 comments), `tools/update-adopters.test.mjs` (+1 test, 5 assertions), `claude/skills/ft-update/SKILL.md` (Step 3 Workflow bullet). The diff matches `touches:` exactly. No refactors. The rule still lives in one regex.

- [x] **Learnings** — N/A

**Final Summary:** The fleet updater's and `/ft-update`'s AGENTS.md `## Workflow` replace now also ends at an unfenced `<!-- <name>:start -->` marker line and keeps it, so a marked section after the Workflow block, such as `grok-tasknotes`, survives a bump. A unit test that fails on the old code pins the fix.

**Archived:** 2026-11-24
