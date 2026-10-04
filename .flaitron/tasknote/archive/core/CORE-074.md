---
title: cite-not-restate sweep
status: completed
tags: []
created: 2026-05-10
due:
related-tasks: [CORE-038, CORE-050, CORE-051]
---

# CORE-074 | cite-not-restate sweep

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-038]] [[CORE-050]] [[CORE-051]]

## 🎯 Goal

Replace inline area-prefix decoder lists and 📦 bundle-parts restatements in 6 SKILLs with citations to SPEC §"Task ID convention" / §"Post-closure protocol".

## ✅ Acceptance

- [x] All 6 area-prefix decoder lists (`CORE- → core, BE- → backend, ...`) collapsed to single-line SPEC citations; README fallback preserved
- [x] Bundle-parts items 1-3 + 🟢 line removed from `task/SKILL.md` Step 6 and `epic-discovery/SKILL.md` Step 10 (SPEC carries them); skill-specific commit message preserved for epic-discovery
- [x] Bundle-parts items 1-2 + 🟢 line removed from `close-epic/SKILL.md` Step 9; items 3-4 (parent-flip prompt + audit commit message) preserved (skill-specific)
- [x] Cold re-read of each touched file confirms operational coherence
- [x] No skill-specific imperative dropped (fallback "read README.md → ask" preserved; skill-specific commit message formats preserved)

## 🧩 Subtasks

- [x] Edit `claude/skills/task/SKILL.md` Step 2: collapse 3-line area-decoder to 1-line cite
- [x] Edit `claude/skills/task/SKILL.md` Step 6: collapse bundle-parts 1-3 + 🟢 line to cite
- [x] Edit `claude/skills/micro-task/SKILL.md` Step 1 Pre-flight: collapse 3-line area-decoder to 1-line cite
- [x] Edit `claude/skills/file-followup/SKILL.md` Step 1: collapse 3-line area-decoder to 1-line cite
- [x] Edit `claude/skills/starter-task/SKILL.md` Step 1: collapse 3-line area-decoder to 1-line cite
- [x] Edit `claude/skills/close-epic/SKILL.md` Step 1: trim inline area-list from Area bullet
- [x] Edit `claude/skills/close-epic/SKILL.md` Step 9: collapse bundle-parts 1-2 + 🟢 line to cite; keep items 3-4 as skill-specific
- [x] Edit `claude/skills/epic-discovery/SKILL.md` Step 2: trim inline area-list from Area input
- [x] Edit `claude/skills/epic-discovery/SKILL.md` Step 10: collapse bundle-parts 1-2 + 🟢 line to cite; keep item 3 (commit message) as skill-specific
- [x] Cold re-read each edited file for operational coherence
- [x] Citation grep: confirm SPEC §"Task ID convention" and §"Post-closure protocol" headings resolve

## 🔗 Related

- [[CORE-038]] — task SKILL.md cite-don't-restate (pattern source)
- [[CORE-050]] — micro-task SKILL cite-don't-restate (predecessor)
- [[CORE-051]] — starter-task SKILL cite-don't-restate (predecessor)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All 9 target instances verified live in the 6 SKILL files. SPEC §"Task ID convention" and §"Post-closure protocol" carry the full contracts (area-prefix table + README fallback at lines 62-73; bundle structure at lines 386-400). Pattern proven across CORE-038/050/051; savings are modest (area-decoders ~30-40w each; bundle-parts ~50-80w per SKILL) but the mechanical duplication is real and the restatements will diverge if SPEC evolves.

- [x] Read relevant source files — all 6 target SKILL files read in full; SPEC.md §"Task ID convention" (lines 57-76) and §"Post-closure protocol" (lines 378-428) read for citation targets.
- [x] **Archive skim** — 48 prior core archive entries; CORE-038/050/051 are the load-bearing predecessors (pattern source, drift-correction precedent, cold-re-read mandate). No prior tasknote touched these specific instances.
- [x] **Drift check** — all 9 target instances confirmed present in current code. No path drift. Hardlink note: `task/SKILL.md` has link count 1 (`.claude/skills/task` is a directory symlink to `../../claude/skills/task`, not a hardlink to the file); single-file edits throughout.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Assumptions:
  - Area-decoder replacement: collapse 3-line block to 1-line cite that preserves the README fallback and "stop and ask" instruction (SPEC carries the prefix mapping but not the operational fallback behavior).
  - Bundle-parts replacement: drop items that duplicate SPEC §"Post-closure protocol" step 1 verbatim; preserve skill-specific items (epic-discovery's commit message format; close-epic's parent-flip prompt + audit commit message format).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** See instance inventory and replacement shapes in tasknote body (filed at scaffold + Discovery).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended CORE-038/050/051's cite-don't-restate shape. No new pattern. All 6 SKILL files have single-file edit paths (no hardlinks).
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown skill files; functional verification = cold re-read)

**Implementation Notes:**

- **9 edits across 6 files**: 6 area-decoder collapses + 3 bundle-parts collapses.
- **Area-decoders (4 standard):** `task/SKILL.md` Step 2, `micro-task/SKILL.md` Step 1, `file-followup/SKILL.md` Step 1, `starter-task/SKILL.md` Step 1 — identical 3-line block (`Using SPEC §"Task ID convention": [list] / Unknown prefix → README`) collapsed to 1-line cite preserving the README fallback.
- **Area-decoders (2 variant):** `close-epic/SKILL.md` Step 1 — parenthetical list stripped from within a single bullet; `epic-discovery/SKILL.md` Step 2 — `CORE | BE | ...` pipe-list stripped from input-collection bullet.
- **Bundle-parts (task/SKILL.md Step 6):** Items 1-3 (Closure review, Recap, commit message) + 🟢 line removed; replaced with "(per SPEC §"Post-closure protocol" step 1)". Skill-specific orchestration (one-continuous-flow, 🏁 state-marker, next-move format, copy-paste line) all preserved.
- **Bundle-parts (epic-discovery/SKILL.md Step 10):** Items 1-2 + 🟢 line removed; item 3 (discovery commit message `feat: <AREA>-<next-N>.1 — file <AREA>-EPIC-<next-N> + scope children`) preserved inline as skill-specific.
- **Bundle-parts (close-epic/SKILL.md Step 9):** Items 1-2 + 🟢 line removed; items 3-4 (parent-flip AskUserQuestion block + audit commit message format) preserved as skill-specific bullets.
- **Citation grep verified:** `SPEC.md` heading `## Task ID convention` at line 57 and `## Post-closure protocol` at line 378 both resolve.
- **Cold re-read:** all 9 edit sites verified — flow coherent, no operational imperative dropped, no template-path regression (no template references changed).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only)
- [x] Ran lint/type-check on changed code — N/A (markdown only)
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A

**Testing Notes:**

- Functional verification = cold re-read of all 9 edit sites across 6 files. All citations resolve; every preserved skill-specific imperative still reads operationally.
- Citation grep: `## Task ID convention` (line 57) and `## Post-closure protocol` (line 378) confirmed in SPEC.md.
- No regressions — the README fallback ("Unknown prefix → read README.md; if still unresolved, stop and ask") is preserved in all 6 area-decoder edits. Skill-specific commit message formats and close-epic's parent-flip prompt preserved intact.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: no change · `SPEC.md`: no change · `docs/MIGRATION.md`: no change · `claude/CLAUDE-snippet.md`: no change. SKILL-internal edits only; no external surface cites SKILL internals.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-10.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Replaced 9 inline restatements across 6 SKILL files with SPEC citations. Six area-prefix decoder lists (the `CORE- → core, BE- → backend, ...` block repeated identically in every pre-flight step) collapsed to single-line cites pointing to SPEC §"Task ID convention"; README fallback preserved. Three bundle-parts restatements (numbered Closure review + Recap + 🟢 prompt items inside the 📦 gate) collapsed to "(per SPEC §"Post-closure protocol" step 1)"; skill-specific extensions preserved (epic-discovery's discovery commit message format; close-epic's parent-flip AskUserQuestion block + audit commit message format).

Doc-drift sweep: all 4 entries — no change. No regressions: citation grep confirmed both SPEC headings resolve; cold re-read of all 9 edit sites confirmed operational coherence.

Touched files: `claude/skills/task/SKILL.md`, `claude/skills/micro-task/SKILL.md`, `claude/skills/file-followup/SKILL.md`, `claude/skills/starter-task/SKILL.md`, `claude/skills/close-epic/SKILL.md`, `claude/skills/epic-discovery/SKILL.md`, `_project/PLAN.md`, `_project/tasknote/CORE-074.md` (this file).

**Archived:** 2026-05-10
