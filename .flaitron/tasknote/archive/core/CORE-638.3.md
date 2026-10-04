---
title: rotation-advisory-mirrors
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-EPIC-638, CORE-638.2, CORE-638.N]
touches:
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-close-epic/SKILL.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
  - claude/skills/ft-release/SKILL.md
  - docs/GLOSSARY.md
  - docs/MIGRATION.md
---

# CORE-638.3 | rotation-advisory-mirrors

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-638]]

## 🎯 Goal

Mirror `/ft-task`'s one-line Completed-rotation advisory into `/ft-micro-task` and `/ft-close-epic` at their PLAN.md-read step, and add a matching advisory-only standing check to `/ft-release` §7.1, keeping every touched body under its context-budget cap.

## ✅ Acceptance

- [x] `/ft-micro-task` Step 1 carries the Completed-rotation advisory (60-row bound, never-block, SPEC/plan-filing.md pointer) — `grep -A8 'Completed-rotation check' claude/skills/ft-micro-task/SKILL.md`
- [x] `/ft-close-epic` Step 2 (PLAN.md-read) carries the same advisory — `grep -A8 'Completed-rotation check' claude/skills/ft-close-epic/SKILL.md`
- [x] `/ft-release` §7.1 standing-checks fragment has a matching advisory-only check that never blocks the cut — `grep -A20 'Standing completed-rotation check' claude/skills/ft-release/step-7.1-standing-checks.md`
- [x] Warning copy matches `/ft-task` Step 1 (count, `>60`, PLAN-ARCHIVE.md) — `grep -F 'holds <N> rows (>60)' claude/skills/ft-task/SKILL.md claude/skills/ft-micro-task/SKILL.md claude/skills/ft-close-epic/SKILL.md`
- [x] Touched `SKILL.md` bodies stay under the 33,000 glob cap; `ft-release/SKILL.md` under 40,000; `ft-release/**` under 125,000 — `wc -c claude/skills/ft-micro-task/SKILL.md claude/skills/ft-close-epic/SKILL.md claude/skills/ft-release/SKILL.md; find claude/skills/ft-release -type f -exec cat {} + | wc -c`
- [x] GLOSSARY.md and MIGRATION.md no longer claim only `/ft-task` surfaces the advisory — `grep -n 'surfaces a one-line advisory' docs/GLOSSARY.md docs/MIGRATION.md``

## 🧩 Subtasks

- [x] Copy `/ft-task` Step 1 Completed-rotation check into `/ft-micro-task` Step 1 (after filing-discipline)
- [x] Copy the same check into `/ft-close-epic` Step 2 after the PLAN.md parent lookup
- [x] Add advisory-only standing completed-rotation check to `step-7.1-standing-checks.md`; index it and add a §7.4 closure-review line in `ft-release/SKILL.md`
- [x] Retarget GLOSSARY.md and MIGRATION.md from "`/ft-task` surfaces" to the SPEC-generic "runner skill that reads PLAN.md"
- [x] Verify greps + byte caps

## 🔗 Related

- [[CORE-EPIC-638]] — parent epic (completed-rotation-debt)
- [[CORE-638.2]] — predecessor; rotated PLAN.md `## Completed` to the 60-row bound
- [[CORE-638.N]] — follow-up epic audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN.md line names three concrete insert sites and a budget constraint; all three files exist, the `/ft-task` source block is intact, and SPEC/plan-filing.md already states the generic "runner skill" rule this task is making true.

- [x] Read relevant source files — `/ft-task` SKILL.md Step 1 (source block, lines 74–81), `/ft-micro-task` SKILL.md Step 1 (filing-discipline lives, no rotation check), `/ft-close-epic` SKILL.md Step 2 (PLAN.md-read), `step-7.1-standing-checks.md` (advisory precedent: machine-global wiring), `ft-release/SKILL.md` §7.1 index + §7.4 advisory verdicts, `SPEC/plan-filing.md` §"`## Completed` rotation", `docs/CONTEXT-BUDGET.md` caps, `docs/GLOSSARY.md` and `docs/MIGRATION.md` restatements.

- [x] **Best Practices Review** — Copy the established `/ft-task` advisory block rather than invent a third wording. Close-epic insert belongs at Step 2 (the PLAN.md-read), not Step 1 (pre-flight, PLAN not yet walked). Release check follows the machine-global wiring shape: derivable count, never blocks, carry a one-line verdict into §7.4. Do not lift into CI — rotation is an operator motion. Do not mint a four-skill roster in GLOSSARY/MIGRATION; retarget those sentences to SPEC's generic "runner skill" so they cannot go stale the same way.

- [x] **Archive skim** — `archive/core/` confirmed via README table. Load-bearing hits: [[CORE-604.4]] authored the 60-row advisory on `/ft-task` + `SPEC/procedures/ft-task.md` only (explicitly those two surfaces); [[CORE-638.2]] rotated PLAN.md to 60 and left the advisory-gap to this child; [[CORE-620]] earlier rotation; no `.1` Discovery / Fan-out (audit-repo supplied Discovery) so YAML `blocked-by` / `parallel-safe-with` stay omitted. Codex wrappers for micro-task and close-epic route through the Claude SKILL.md bodies — no twin edit.

- [x] **Drift check** — cited paths exist at HEAD. `/ft-task` Step 1 still holds the 8-line advisory. `/ft-micro-task` Step 1 has filing-discipline but no rotation check. `/ft-close-epic` Step 2 reads PLAN.md and has no rotation check. `step-7.1-standing-checks.md` has no rotation check. SPEC already says "When a runner skill reads PLAN.md"; GLOSSARY.md:31 and MIGRATION.md:299 still say only `/ft-task` surfaces it — those two restatements are in-scope drift of this change (AI-referenced docs), not a Re-scope. `ft-release/SKILL.md:289` currently claims machine-global wiring is "the one standing advisory" — that sentence must move with the new check or it becomes false. No SPEC contradiction: advisory never blocks, never rotates.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed (--fast). Assumptions: (1) close-epic's PLAN.md-read is Step 2, not Step 1; (2) `ft-release/SKILL.md` index + §7.4 line are part of making the standing check real, not extra scope; (3) GLOSSARY/MIGRATION retarget to generic "runner skill" rather than listing four skills; (4) `SPEC/procedures/ft-task.md` already has the advisory — out of scope; (5) no CI Pair for this check.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

Source block to copy (`claude/skills/ft-task/SKILL.md` Step 1):

```text
**Completed-rotation check (advisory).** While PLAN.md is open, count the checked rows under `## Completed` (nested epic children included). If the count exceeds **60**, surface a one-line warning:

⚠️ PLAN.md `## Completed` holds <N> rows (>60). Consider rotating the
   oldest rows to `.flowtron/PLAN-ARCHIVE.md`. Proceeding.

Informational only — never block, never rotate. Rotation is an operator motion; the bound, the month-block granularity, and the two never-split rules are canonical in SPEC/plan-filing.md §"`## Completed` rotation".
```

Byte headroom (pre-edit): micro-task 20,755 / 33,000; close-epic 27,350 / 33,000; standing-checks 19,254 (unbudgeted per-file; directory 110,229 / 125,000). An ~500-char copy plus a ~800-char standing-check paragraph fits.

`## Completed` currently holds 60 checked rows including nested children (at the bound; advisory fires only when the count *exceeds* 60). An earlier unindented awk missed nested children and reported 36. CORE-638.2 already rotated; this child is the advisory-mirror, not another rotation.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — copied the `/ft-task` Step 1 advisory block verbatim into the two other PLAN.md-read steps; release standing check follows the machine-global wiring (advisory, never-block, §7.4 one-line verdict) rather than a blocking Pair. GLOSSARY/MIGRATION retargeted to SPEC's generic "runner skill" instead of minting a four-skill roster.

- [x] **Minimal refactor gate** — no refactor; insertions only, plus the two restatement retargets and the `ft-release/SKILL.md` index/§7.4 lines required for the new standing check not to contradict "the one standing advisory".

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose-only skill/doc edits; no test surface.

**Implementation Notes:**

Copied the 8-line `/ft-task` Completed-rotation check into `/ft-micro-task` Step 1 (after filing-discipline) and `/ft-close-epic` Step 2 (after the parent-under-Completed bail, while PLAN.md is open). Added `**Standing completed-rotation check (advisory)**` to `step-7.1-standing-checks.md` with the CORE-638.2 count command, no `exit 1`. Indexed it in `ft-release/SKILL.md` §7.1 and added a §7.4 closure-review verdict. Retargeted GLOSSARY.md:31 and MIGRATION.md:299 from "`/ft-task` surfaces" to "a runner skill that reads PLAN.md".

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — plus full unattended roster (`just test` / `just typecheck` / `just lint` / `just build` + fleet-updater)

- [x] Ran lint/type-check on changed code — N/A for markdown; `just lint` / `just typecheck` still ran as the unattended full set

- [x] **Verification receipt** — recorded below; no duplication (three copies of the same advisory is the intended mirror, not accidental DRY miss — each runner loads only its own SKILL.md); no dead code; no public-surface growth; GLOSSARY/MIGRATION restatements updated rather than left stale

- [x] (frontend) N/A — not a frontend change; no 👁️ ask, no `visual-confirm` park

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -A8 'Completed-rotation check' claude/skills/ft-micro-task/SKILL.md` → 0 (block present)
- `grep -A8 'Completed-rotation check' claude/skills/ft-close-epic/SKILL.md` → 0 (block present)
- `grep -A20 'Standing completed-rotation check' claude/skills/ft-release/step-7.1-standing-checks.md` → 0 (block present, never-blocks)
- `grep -F 'holds <N> rows (>60)' claude/skills/ft-task/SKILL.md claude/skills/ft-micro-task/SKILL.md claude/skills/ft-close-epic/SKILL.md` → 0 (three hits)
- `wc -c` → micro-task 21,319 (cap 33,000); close-epic 27,914 (cap 33,000); ft-release/SKILL.md 32,290 (cap 40,000); ft-release/** 111,752 (cap 125,000)
- `grep -n 'surfaces a one-line advisory' docs/GLOSSARY.md docs/MIGRATION.md` → 0 (both now "a runner skill that reads PLAN.md")
- standing-check dry-run → `n=60` (at bound, no warning printed)
- `just test` → 0 (568 tests, 29 files)
- `just typecheck` → 0
- `just lint` → 0
- `just build` → 0
- `node --test tools/update-adopters.test.mjs` → 0 (54/54)
- `node --check tools/update-adopters.test.mjs` → 0
- `node --check tools/update-adopters.mjs` → 0

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md no change; AGENTS.md no change; SPEC.md no change (already generic); docs/MIGRATION.md updated (this task); claude/AGENTS-snippet.md no change (points at SPEC, does not name `/ft-task` as the only advisor); codex/AGENTS-snippet.md no change; cursor/AGENTS-snippet.md no change; grok/AGENTS-snippet.md no change; docs/CONVENTIONS.md no change; CONTRIBUTING.md no change; SECURITY.md no change; docs/AGENT-NEUTRALITY.md no change (already lists the runner skills as consumers of plan-filing); docs/PLATFORMS.md no change; claude/CAPABILITIES.md no change; docs/AGENT-COMPAT.md no change; docs/EXTERNAL-AGENTS.md no change; docs/WORKTREES.md no change; docs/VISION.md no change; docs/GLOSSARY.md updated (this task)

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` flipped to `completed`; PLAN.md line to stub form nested under CORE-EPIC-638; tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Mirrored `/ft-task`'s one-line Completed-rotation advisory into `/ft-micro-task` Step 1 and `/ft-close-epic` Step 2, and added a matching advisory-only standing check to `/ft-release` §7.1 that never blocks the cut. GLOSSARY.md and MIGRATION.md now say "a runner skill that reads PLAN.md" instead of naming only `/ft-task`. No refactor. All touched SKILL.md bodies and the ft-release directory stay under their CONTEXT-BUDGET caps. Verification: greps for the advisory block and warning copy, byte counts, standing-check dry-run at 60 rows (no warning), and the full unattended validation roster — all recorded in Testing Notes. `touches:` matches the six declared paths (three named by PLAN plus `ft-release/SKILL.md` index/§7.4, GLOSSARY.md, MIGRATION.md). Doc-drift: two updates (GLOSSARY, MIGRATION), rest no change. Maintainability effect: a day of micro-tasks, epic closes, and a release cut can no longer accrue rotation debt without anyone being told.

**Archived:** 2026-09-20
