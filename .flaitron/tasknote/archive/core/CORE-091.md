---
title: wiring-snippet single-source collapse
status: completed
tags: []
created: 2026-05-14
due:
related-tasks: [CORE-005, CORE-044, CORE-082]
---

# CORE-091 | wiring-snippet single-source collapse

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CLAUDE-snippet]] · [[MIGRATION]] · [[new-project]]

## 🎯 Goal

Pick `claude/CLAUDE-snippet.md` as canonical owner of the 12-line symlink wiring block and trim `docs/MIGRATION.md` §1.2 + `claude/skills/new-project/SKILL.md` Step 3 to pointer blocks referencing the snippet.

## ✅ Acceptance

- [x] `docs/MIGRATION.md` §1.2 no longer contains the `ln -s` fenced block; trimmed to a pointer paragraph referencing `CLAUDE-snippet.md` §"One-time symlink wiring".
- [x] `claude/skills/new-project/SKILL.md` Step 3 no longer contains the `ln -s` fenced block; trimmed to a Read-and-execute pointer referencing the same snippet section.
- [x] `claude/CLAUDE-snippet.md` §"One-time symlink wiring" is the only repo location holding the full 12-line block (verified by grep).
- [x] Factual content preserved across the trim: per-command bullets in §1.2 (lines 63-68), the relative-paths-survive-clone rationale, the "symlinks don't change on bump" fact, and the `git add .claude/` commit step.
- [x] `/new-project` skill remains executable as written — Step 3 pointer is unambiguous about reading and running the snippet's bash (same Read-then-extract pattern Step 4 already uses).

## 🧩 Subtasks

- [x] Trim `docs/MIGRATION.md` §1.2 — remove the `ln -s` ```sh block (lines 72-86) and collapse the trailing rationale (lines 88-90) into one pointer paragraph that delegates the commands to `CLAUDE-snippet.md` §"One-time symlink wiring".
- [x] Trim `claude/skills/new-project/SKILL.md` Step 3 — remove the `ln -s` ```sh block (lines 60-74), replace with a Read-and-execute instruction mirroring Step 4's pattern; keep the "do not use absolute paths" admonition and the Reference footer (reorder canonical-first).
- [x] Re-read each trimmed section end-to-end to confirm flow still parses and no factual information was dropped.
- [x] Grep verification: re-run `grep -rnE "ln -s.*flowtron/claude/commands/task\.md"` and confirm only `CLAUDE-snippet.md` retains the full block.
- [x] Phase 4 doc-drift sweep against `_project/tasknote/README.md` §"AI-referenced docs".

## 🔗 Related

- [[CORE-005]] — original creation of `MIGRATION.md`; explicitly decided "No duplication of CLAUDE-snippet.md content — MIGRATION should *reference* it for the symlink commands rather than copy them, so there's a single source of truth for the wiring." This task restores that intent after drift.
- [[CORE-044]] — `/new-project` skill scaffold; the Step 3 duplicate likely originates here (skill written to mirror MIGRATION.md §1.2 verbatim rather than point at CLAUDE-snippet.md).
- [[CORE-082]] — most recent audit doc-drift sweep; the present audit (2026-05-14, Finding #3) is the same audit-skill discipline applied again.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Three confirmed file locations hold the symlink block; the contradiction with `MIGRATION.md:90`'s own "single source of truth" claim is real and visible to any adopter reading both files. Trim is small (delete two fenced blocks, replace with pointer paragraphs), low-risk (markdown docs only — no behavioral surface), and restores CORE-005's original intent. Audit Medium priority is right-sized: not load-bearing for daily work, but a future contributor seeing two competing copies of the wiring is exactly the kind of doc-drift that erodes trust in the snippet's claim.

- [x] Read relevant source files — `claude/CLAUDE-snippet.md` (canonical, lines 29-43 hold the block), `docs/MIGRATION.md` §1.2 (lines 73-86 duplicate it; lines 88-90 already say CLAUDE-snippet is canonical), `claude/skills/new-project/SKILL.md` Step 3 (lines 60-74 duplicate it; Reference footer at line 78 already lists CLAUDE-snippet alongside MIGRATION.md).
- [x] **Archive skim** — `_project/tasknote/archive/core/` (91 prior tasknotes). Load-bearing finding: **CORE-005** (Discovery Notes line 35 + Implementation Notes line 60) made the original decision "Defers to `claude/CLAUDE-snippet.md` for the canonical wiring snippet rather than duplicating it" when authoring MIGRATION.md. CORE-044 (the `/new-project` skill scaffold) inherited the duplication from MIGRATION.md's then-current shape. CORE-055 reviewed CLAUDE-snippet.md against Anthropic best-practices and didn't touch the wiring section. CORE-082 is the most recent precedent for an audit-driven doc-drift collapse; same shape as this task. No prior tasknote has attempted the symlink-block consolidation specifically.
- [x] **Drift check** — `MIGRATION.md:90` cited in the PLAN.md description: confirmed present and reads "The canonical wiring snippet (and the `CLAUDE.md` block to paste in the next step) lives in `_project/flowtron/claude/CLAUDE-snippet.md`. Refer to it directly rather than copying the commands here — that file is the single source of truth." ✓ Audit reference is accurate. Full-block grep confirms exactly three locations: `CLAUDE-snippet.md:31`, `MIGRATION.md:74`, `new-project/SKILL.md:62`. No fourth hidden copy. ✓ Drift check clean.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **No clarifications needed.** Assumptions: (1) "pointer block" means the duplicate fenced `ln -s` block is removed entirely, not retained-with-canonical-note — single source = one copy. (2) The per-command bullets in MIGRATION.md §1.2 (lines 61-69, describing what each of the six slash-commands does) are unique content and survive intact. (3) The `/new-project` skill's Step 3 retains its executable intent via Read-and-execute pattern, mirroring Step 4's snippet-extraction pattern. (4) The Reference footer in Step 3 reorders to canonical-first: `CLAUDE-snippet.md` (canonical) then `MIGRATION.md` §1.2 (adopter doc, points to the snippet).
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

The 12-line claim in PLAN.md refers to the 12 `ln -s` lines (6 commands + 6 skills); the full block in `CLAUDE-snippet.md` is 13 lines once the `mkdir -p` preamble is counted. Both adopter docs (MIGRATION.md §1.2, new-project/SKILL.md Step 3) duplicate the full 13-line `mkdir + 12 × ln -s` block verbatim — the cited audit finding is correct in substance and the trim removes both fenced blocks.

Both trim targets already have rationale paragraphs adjacent to the duplicated block that point at `CLAUDE-snippet.md` (MIGRATION.md:90 and new-project/SKILL.md:78), so the collapse is mostly mechanical: remove the fenced block, fold the adjacent rationale into the surviving pointer paragraph, preserve any fact that lives only in the caller (relative-paths-pin, never-changes-on-bump — both already in `CLAUDE-snippet.md` lines 45 and 51; nothing exclusive to the callers).

`/new-project` Step 4 already uses the Read-then-extract-then-execute pattern against `CLAUDE-snippet.md` for the CLAUDE.md paste-block; mirroring it in Step 3 keeps the skill internally consistent.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `MIGRATION.md` §1.3 and `new-project/SKILL.md` Step 4 already use the Read-snippet-then-execute pattern for the `CLAUDE.md` paste-block (no duplication of the paste content; the caller points at the snippet and the agent reads it). Mirrored that exact pattern in `new-project/SKILL.md` Step 3 for the symlink-wiring block. For `MIGRATION.md` §1.2, the existing §1.3 prose form ("Open `_project/flowtron/claude/CLAUDE-snippet.md` and copy the markdown block...") served as the template for the new sentence-form pointer paragraph. No new pattern introduced.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown docs only; no behavioral surface)

**Implementation Notes:**

Two edits, both content removal + one-paragraph-pointer insertion:

- `docs/MIGRATION.md` §1.2 (line 70): Replaced the "Adopting projects expose all six..." sentence + the 13-line `mkdir + 12 × ln -s` ```sh block + the two trailing rationale paragraphs (the relative-paths-survive-clone note and the "canonical wiring snippet... single source of truth" claim) with a single pointer paragraph that folds all preserved facts (where-to-find, single-source-of-truth, relative-paths-pin, symlinks-don't-change-on-bump, forward-ref to §1.3 paste-block) into one sentence-form pointer. The bullet list of six slash commands at lines 63-68 (unique content) is untouched.
- `claude/skills/new-project/SKILL.md` Step 3 (lines 60, 62): Replaced the 13-line ```sh block + the "relative paths are intentional / do not use absolute paths" rationale + the original Reference line with a two-paragraph Read-and-execute pointer mirroring Step 4's pattern. The Reference footer reorders canonical-first: `claude/CLAUDE-snippet.md` (canonical) before `docs/MIGRATION.md` §1.2 (adopter doc, points to the snippet).

Net diff (excluding the tasknote itself): `docs/MIGRATION.md` -20 lines (the `mkdir + 12 × ln -s` block + the surrounding sentence and rationale paragraphs, collapsed to one); `claude/skills/new-project/SKILL.md` -16 lines (the ```sh block + rationale, collapsed to two short paragraphs). `claude/CLAUDE-snippet.md` untouched — its §"One-time symlink wiring" remains the canonical and now sole copy of the wiring block.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown docs; no test surface)
- [x] Ran lint/type-check on changed code — N/A (no code changed)
- [x] (frontend) Asked the user for visual confirmation — N/A (not frontend)

**Testing Notes:**

Verification in lieu of an automated suite:

- Re-read `docs/MIGRATION.md` §1.2 end-to-end after the trim. Heading + six-command bullet list + new pointer paragraph + transition to §1.2.1 all parse cleanly. No orphaned references; the bullet list at lines 63-68 still introduces the six commands that the pointer paragraph then routes the adopter to wire.
- Re-read `claude/skills/new-project/SKILL.md` Step 3 end-to-end. New two-paragraph pointer mirrors Step 4's Read-then-extract pattern (Step 4 line 66: "Read `_project/flowtron/claude/CLAUDE-snippet.md` and extract the markdown block under the 'Block to paste into CLAUDE.md' heading..."); the skill remains executable — the agent reads `CLAUDE-snippet.md`, finds the `## One-time symlink wiring` heading, and runs the bash block verbatim.
- Grep verification: `grep -rnE "ln -s.*flowtron/claude/commands/task\.md" --include='*.md' .` (excluding `_project/tasknote/`) returns exactly one match — `claude/CLAUDE-snippet.md:31`. Confirms the wiring block is now single-sourced.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `_project/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change. No reference to the wiring block (`grep` for `symlink|wiring|CLAUDE-snippet|§1\.2` returned only one hit, line 69, "wiring" in a Dataview/Obsidian context — unrelated).
  - `SPEC.md` — no change. Line 53 already references `claude/CLAUDE-snippet.md` as the adopter snippet at the level of "where it lives," not the block contents; trim doesn't affect that pointer.
  - `docs/MIGRATION.md` — updated: §1.2 trimmed to a pointer paragraph; 13-line `ln -s` fenced block removed, replaced with a sentence-form pointer to `CLAUDE-snippet.md` §"One-time symlink wiring". Per-command bullets preserved.
  - `claude/CLAUDE-snippet.md` — no change. This file IS the canonical owner of the block; that role is unchanged. The §"One-time symlink wiring" section remains the sole copy.
  - (`claude/skills/new-project/SKILL.md` is also directly modified but lives outside the AI-referenced docs sweep per the README note: "claude/skills/*/SKILL.md are loaded on demand by skill stubs — not part of the default cold-start sweep.")
- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `_project/tasknote/archive/core/`.
- [x] Recap drafted.

**Final Summary:**

Restored CORE-005's original single-source-of-truth intent for the symlink wiring block after audit-surfaced drift. The 13-line `mkdir + 12 × ln -s` block now lives only in `claude/CLAUDE-snippet.md` §"One-time symlink wiring"; both prior duplicates — `docs/MIGRATION.md` §1.2 and `claude/skills/new-project/SKILL.md` Step 3 — collapsed to short pointer paragraphs that delegate to the canonical source. The adopter-doc bullet list of six slash commands (unique to §1.2) and the new-project skill's Step 4 Read-and-extract pattern (mirrored in the new Step 3) are unchanged; nothing factual was lost in the trim. Verified single-source via `grep -rnE "ln -s.*flowtron/claude/commands/task\.md"` returning exactly one hit (`claude/CLAUDE-snippet.md:31`).

**Archived:** 2026-05-14
