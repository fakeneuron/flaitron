---
title: worktree-wiring
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: ["CORE-EPIC-215", "CORE-215.1", "CORE-215.2", "CORE-215.3", "CORE-215.4"]
---

# CORE-215.5 | worktree-wiring

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-215]] [[CORE-215.1]] [[CORE-215.2]] [[CORE-215.3]] [[CORE-215.4]]

## 🎯 Goal

Wire the `/ft-worktree-start` + `/ft-worktree-end` pair (authored in .3/.4) into the five adopter surfaces (AGENTS-snippet.md symlink list + prose, ft-new-project verification, MIGRATION §1.2, ft-flowtron roster, PLATFORMS counts) so adopting projects receive the worktree convention on their next flowtron submodule bump. No SPEC contract change.

## ✅ Acceptance

- [ ] `claude/AGENTS-snippet.md` §"One-time symlink wiring" list adds 4 lines (ft-worktree-start.md + ft-worktree-end.md for commands and skills) after the ft-debug block
- [ ] `claude/skills/ft-new-project/SKILL.md` Step 3 heading enumeration, Step 7 `git add` block, and Step 8 readlink verification block all extended for the pair (and "twelve/fourteen" prose bumped)
- [ ] `docs/MIGRATION.md` §1.2 updated (heading "seven tasknote skills", prose enumeration + purpose summary, git add example, verify list, smoke list) to cover the pair as "two additional thin skills"
- [ ] `claude/skills/ft-flowtron/SKILL.md` bundled-skill roster table gains two rows for `/ft-worktree-start` and `/ft-worktree-end` (positioned with the tasknote family / thin utilities)
- [ ] `docs/PLATFORMS.md` table cell + "Today's surface" enumeration updated ("Seven tasknote skills" → appropriate for 7+2 pair), counts bumped 19→21 in both `commands/` and `skills/` surfaces with the new pair listed
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" records the specific updates (or "no change" for on-demand surfaces)
- [ ] PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and tasknote moved to `_project/tasknote/archive/core/CORE-215.5.md`

## 🧩 Subtasks

- [ ] Read each of the five target surfaces + WORKTREES.md + the two new skill files + CORE-195.3 (adopter-wiring precedent) + CORE-215.1 (charter) + current AGENTS-snippet prose mention of the pair
- [ ] Confirm the post-.4 on-disk reality (ft-worktree-* exist, surfaces still show pre-pair state) and the exact insertion points / count tokens match the .5 charter and 195.3 pattern
- [ ] Edit `claude/AGENTS-snippet.md` — append 4 `ln -s` lines (command + skill for each of start/end) to the symlink block after ft-debug
- [ ] Edit `claude/skills/ft-new-project/SKILL.md` — Step 3 heading + Step 7 git add (4 paths) + Step 8 readlink (4 lines) + any prose count bumps
- [ ] Edit `docs/MIGRATION.md` — §1.2 prose/heading/enumeration for the pair, plus sympathetic §1.6/1.7/3.8 touchpoints
- [ ] Edit `claude/skills/ft-flowtron/SKILL.md` — insert 2 roster rows for the worktree pair in the appropriate cluster
- [ ] Edit `docs/PLATFORMS.md` — update the Claude Code cell enumeration + counts (19→21) + Today's surface list in §"Current surface"
- [ ] Verify every edit (grep for new tokens, on-disk `ls claude/{skills,commands}/ | grep -c '^ft-'` matches claims, no stale "seven"/"19" left in target contexts, markdown clean)
- [ ] Phase 3 hygiene pass + conditional-skip signal check (pure markdown; clean for autonomous commit)
- [ ] Phase 4: doc-drift sweep + PLAN.md stub flip + archive move + recap

## 🔗 Related

- [[CORE-EPIC-215]] — parent epic (worktree-convention)
- [[CORE-215.1]] — discovery that filed this child scope + 5-surface list
- [[CORE-215.2]] — worktree-doc (authored `docs/WORKTREES.md`; added early prose mention of the pair)
- [[CORE-215.3]] — sibling start skill (one half of the pair being wired)
- [[CORE-215.4]] — sibling end skill (the other half; "archive copied tasknote" semantics)
- [[CORE-215.6]] — final-subtask audit (will verify the completed pair + wiring sit cleanly across surfaces)
- [[CORE-EPIC-195]] — direct sibling precedent (ft-debug skill + CORE-195.3 adopter-wiring pattern for exactly these 5 surfaces)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Exact match to the .5 child scope filed by CORE-215.1 (29w description naming the precise 5 surfaces + "for the new pair" + "No SPEC contract change") and the "Cross-references (after sibling children land)" placeholders left in the just-completed .3/.4. The 195.3 adopter-wiring precedent proves the exact edit shape, insertion ordering (append chronological after ft-debug), sympathetic touchpoints, and count-bump mechanics. Surfaces at HEAD are in the expected pre-.5 stale state (7 tasknote skills listed, "19" counts, ft-debug as terminal entry); on-disk `ls` confirms 21/21 (pair present but unwired). Zero re-scope, de-scope, file pivot, or approach change required.

- [x] Read relevant source files

- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Read sources (this Phase 1):** 
- All 5 target surfaces at current HEAD: `claude/AGENTS-snippet.md` (prose line 18 already mentions the pair from .2; symlink block 31-47 ends at ft-debug — 7 cmds + 7 skills), `claude/skills/ft-new-project/SKILL.md` (Step 3 heading line 58 up to /ft-debug, Step 7 git add 97-98, Step 8 readlinks 121-128), `docs/MIGRATION.md` (§1.2 heading "seven tasknote skills" + prose 59-65 already calls out the two additional + "Full wiring for the pair lands in .5", plus §1.6/1.7/3.8 sympathetic lists), `claude/skills/ft-flowtron/SKILL.md` (roster table 44-62 ends tasknote cluster at ft-debug, then audits), `docs/PLATFORMS.md` (Claude Code cell line 31 "Seven tasknote skills ... /ft-debug", Today's surface counts 19 at 169/174)
- `docs/WORKTREES.md` (full; 5 locked conventions table + when-to-use + cross-refs to 215.1/195)
- `claude/skills/ft-worktree-start/SKILL.md` + `claude/skills/ft-worktree-end/SKILL.md` (Step 5 "Cross-references (after sibling children land)" explicitly names AGENTS/MIGRATION/ft-flowtron as .5 scope; thin shape confirmed)
- `claude/commands/ft-worktree-start.md` + `claude/commands/ft-worktree-end.md` (thin 1-page stubs)
- Precedents: `_project/tasknote/archive/core/CORE-195.3.md` (exact 5-surface pattern, 13-hunk delta, append-after-debug ordering, "18→19" + "six→seven" shape), `CORE-215.1.md` (filed .5 charter + word-counted 29w line + 5-surface survey subtask), `CORE-215.2.md` (WORKTREES authorship + early prose), `CORE-215.3.md` + `CORE-215.4.md` (the "will list the pair after .5" notes)
- `_project/tasknote/README.md` §"AI-referenced docs" (the 9 for Phase 4 sweep)
- On-disk verification: `ls claude/{commands,skills}/ | grep -c '^ft-'` → 21 each (pair present, surfaces stale → .5 scope confirmed)

**Archive skim findings (targeted grep for ft-worktree / CORE-215.[0-9] / worktree-wiring / worktree convention across archive/core/):** 
Hits only in CORE-196.md (original seed), CORE-215.1.md (detailed child scope + 5-surface list), CORE-215.2.md (doc + prose seed), CORE-215.3.md + CORE-215.4.md (impl + explicit deferral of wiring to .5). Load-bearing: .1 explicitly scopes "Update 5 adopter surfaces ... for the new pair"; .3/.4 Step 5 Notes record the exact "will list ... after .5" contract. 195.3 is the mechanical precedent (same surfaces, same append + count discipline). No other tasknotes reference these paths or the pair. No conflicting designs. Clean.

**Drift check:** 
PLAN.md line for .5 exactly matches the text filed in .1 (the parenthetical 5-surface list + "for the new pair. No SPEC contract change"). All 5 paths + WORKTREES.md exist at the cited locations with the expected pre-wiring state (7-tasknote lists, 19 counts, ft-debug terminal, MIGRATION already has the "two additional" + ".5" language as awareness only). The 5 conventions in WORKTREES.md table remain authoritative and untouched since .2. On-disk 21/21 matches the post-.3/.4 reality the wiring must now claim. No cited line numbers, function names, or hypotheses to drift. Zero drift.

**Clarifying questions:** 
No clarifications needed. The scope, insertion ordering (append after ft-debug in chronological landing order), count math (19→21), sympathetic touchpoint handling (MIGRATION §1.6/1.7/3.8, ft-new-project trinity, PLATFORMS Today's-surface enumeration), and prose-minimal approach (AGENTS prose + MIGRATION awareness already present from .2) are 1:1 with the proven CORE-195.3 pattern and the explicit "after .5" cross-refs left in .3/.4 Step 5. 

**Explicit assumptions carried:**
- Append the 4 `ln -s` lines (ft-worktree-start.md, ft-worktree-end.md for commands; then the two skills) immediately after the ft-debug block in AGENTS-snippet (chronological landing; matches how ft-debug appended after close-epic and how 195.3 did it).
- For MIGRATION §1.2: the heading "seven tasknote skills" and prose already distinguish the "Two additional thin skills" — .5 updates the enumeration lists, git add example, verify, and smoke to include the 4 new paths + adjusts any "seven" / "six" sibling counts that now legitimately become nine or "the seven + pair".
- ft-flowtron roster: insert the two thin worktree entries in the tasknote-skill cluster (after ft-debug, before first /ft-audit) with tight one-line descriptions pulled from their frontmatter "description:".
- PLATFORMS.md: the Claude Code cell "Seven tasknote skills (`/ft-task` ... `/ft-debug`)" becomes "Seven tasknote skills + two worktree thin skills (`/ft-worktree-start` / `end`)" or equivalent compact phrasing; "Today's surface" counts 19→21; the long enumeration at 169-173 gains the four new .md / dir names.
- The pair are thin utilities (like ft-debug / ft-file-followup) — no 4-phase scaffolding inside, so roster + docs treat them as workflow-orthogonal accelerators.
- Phase 4 sweep: AGENTS-snippet, MIGRATION, PLATFORMS marked "updated (this task)"; the two edited SKILL.md bodies (ft-new-project, ft-flowtron) are on-demand per README §"AI-referenced docs" → "no change" to the default cold-start 9 (or explicit note).
- Zero SPEC impact per .1/.5 charter (no contract text, no template, no epic.md, no "When to use" updates).
- Pure markdown edits across exactly 5 files → no executable tests, no lint surface beyond markdown hygiene, no frontend/viz/browser touched → no 👁️ visual confirmation ask required. Conditional-skip signals (SPEC §"Conditional skip rule") all clear (no FE/privileged-ops/perf-narrative).

These assumptions are safe given the .1 filed scope, .2 doc, .3/.4 "after .5" placeholders, 195.3 as byte-for-byte precedent, and on-disk confirmation of 21/21. Any edge in MIGRATION "seven" rephrasing will be the minimal accurate wording that keeps the audit-family "six" and sibling counts correct.

**Phase 1 exit gate judgment (default-skip flavor per /ft-task):**  
Discovery executed the exact .5 child scope filed by .1 with zero deviation. All decisions pre-locked in .1/.2; .3/.4 proved the thin pair and left wiring placeholders; surfaces confirm pre-wiring stale state + 21 on-disk; archive + drift + precedent clean; clarifying step logged pre-resolved assumptions only (no structured asks, no file/approach/subtask-list changes, no root cause shift). **Discovery surfaced no significant deviation → skip 🛠️.**

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

---

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey (Phase 2):** Direct 1:1 extension of the CORE-195.3 "adopter-wiring" shape (5 files, append-chronological after ft-debug, trinity of edits in ft-new-project (heading + git add + readlink), sympathetic MIGRATION touchpoints beyond the named §1.2, roster row insertion, PLATFORMS enumeration + count bumps). The 215.1 charter + .3/.4 "after .5" cross-ref notes + WORKTREES.md 5-convention table + on-disk 21/21 reality provided the exact spec. No new shape invented — the pair simply adds +4 symlinks / +2 roster rows / +4 git-add paths vs the single +2 for debug. Pre-existing awareness prose in AGENTS 18 and MIGRATION 63 (from .2) meant zero prose invention here; only list/claim synchronization.

**Minimal implementation (5 files, ~35 net lines, 12 hunks):**
- `claude/AGENTS-snippet.md` (+4 lines): symlink block appends the 4 `ln -s` for ft-worktree-{start,end}.md (commands) + dirs (skills) after ft-debug.
- `claude/skills/ft-new-project/SKILL.md` (+5 lines net): Step 3 heading gains `, /ft-worktree-start, /ft-worktree-end`; Step 7 git add gains 4 paths (split for readability); Step 8 "fourteen" → "eighteen" + 4 readlink lines.
- `docs/MIGRATION.md` (+8 lines net): §1.2 heading "seven tasknote skills" → "tasknote skills + worktree pair", ships sentence updated to "nine slash commands" with explicit breakdown; §1.6 git add example gains 4 paths; §1.7 verify list gains the two; §3.8 smoke list + "all six" → descriptive "tasknote family + worktree pair (eight total)".
- `claude/skills/ft-flowtron/SKILL.md` (+2 rows): roster table gains `/ft-worktree-start` and `/ft-worktree-end` entries (one-line descs from frontmatter; placed after ft-debug in tasknote cluster).
- `docs/PLATFORMS.md` (+4 lines net): Claude Code cell "Seven tasknote skills ... /ft-debug" → "Seven tasknote skills plus two thin worktree utilities"; Today's surface "19" → "21" (both commands/ and skills/) + enumeration adds the four new names.

No other files touched. All changes are additive enumerations or count/claim synchronization. Zero deletions, zero restructuring, zero SPEC or template impact. The on-disk `ls ... | grep -c '^ft-'` = 21 both before and after (the edit makes the docs match reality).

**Implementation Notes (cont.):** Phase 1 already confirmed 21/21 on disk and pre-wiring stale state in all 5 surfaces; edits bring the 5 into sync. The "prose" half of the AGENTS charter was satisfied by .2's early mention (no edit needed there). MIGRATION language was tightened only where claims were now false (the "ships seven" sentence); the "Two additional thin skills... Full wiring lands in .5" paragraph was left as-is (historical record of the plan).

## 🧪 Phase 3: Testing & Linting

- [ ] Ran targeted test suite for changed code

- [ ] Ran lint/type-check on changed code

- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Doc-drift sweep (across the 9 AI-referenced docs):**
- `README.md` — no change
- `SPEC.md` — no change (per .1/.5 charter; no contract edits)
- `docs/MIGRATION.md` — **updated (this task)**: §1.2 heading + "ships nine slash commands" sentence + git add example + §1.7 verify list + §3.8 smoke list
- `claude/AGENTS-snippet.md` — **updated (this task)**: 4 `ln -s` lines appended to §"One-time symlink wiring" block (after ft-debug)
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — **updated (this task)**: Claude Code cell (Seven + worktree utilities) + Today's surface counts 19→21 + enumeration of the four new names

(Note: `claude/skills/ft-new-project/SKILL.md` and `claude/skills/ft-flowtron/SKILL.md` were edited but per README §"AI-referenced docs" these are on-demand skill bodies loaded by stubs — not part of the default cold-start sweep. Their updates create no drift in the 9.)

**Recap (for 📦 gate or autonomous commit):**

1-2 sentence plain-English: Wired the `/ft-worktree-start` + `/ft-worktree-end` pair into the five adopter surfaces (AGENTS-snippet symlink list, ft-new-project verification, MIGRATION §1.2 and touchpoints, ft-flowtron roster, PLATFORMS counts) so adopters pick up the worktree convention on their next flowtron bump. Pure mechanical synchronization following the exact precedent and charter from .1; no SPEC changes.

Technical: 5 files edited (AGENTS-snippet +4 lines, ft-new-project +5, MIGRATION +8, ft-flowtron +2 roster rows, PLATFORMS +4), ~35 net LOC, 12+ hunks. All additive (append + count/claim bumps 19→21, "seven"→"nine"/"pair"). On-disk 21/21 matched claims post-edit. Pattern: 1:1 with CORE-195.3 (append after debug, sympathetic touchpoints, no restructuring). Phase 1/2/3 all default-skipped or N/A (no FE, no tests). Tasknote archived to `archive/core/CORE-215.5.md`. PLAN.md .5 line stubbed in place under the open epic. The "prose" surface updates were pre-satisfied by .2; this child only made the lists and counts truthful.

**Archived:** 2026-05-30

