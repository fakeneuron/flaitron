---
title: ft-debug adopter-wiring
status: completed
tags: []
created: 2026-05-29
due:
related-tasks: [CORE-EPIC-195, CORE-195.1, CORE-195.2]
---

# CORE-195.3 | adopter-wiring

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-195]] · [[CORE-195.1]] · [[CORE-195.2]]

## 🎯 Goal

Wire the freshly-authored `/ft-debug` skill into the five adopter-facing surfaces enumerated in the parent epic's Discovery so adopters pick up the skill on their next flowtron bump.

## ✅ Acceptance

- [ ] `claude/AGENTS-snippet.md` paste-block skill enumeration includes `ft-debug` (correct alphabetic / functional grouping)
- [ ] `claude/AGENTS-snippet.md` §"One-time symlink wiring" list adds `ft-debug` (six → seven entries)
- [ ] `claude/skills/ft-new-project/SKILL.md` Step 3 symlink enumeration adds `ft-debug` (matches §1.2 ordering)
- [ ] `docs/MIGRATION.md` §1.2 prose updated: "six → seven" tasknote slash commands inside the submodule
- [ ] `claude/skills/ft-flowtron/SKILL.md` roster includes `ft-debug` with a tight one-line description
- [ ] `docs/PLATFORMS.md` skill counts updated 18→19 in both reported surfaces
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"
- [ ] PLAN.md line flipped to stub `Completed YYYY-MM-DD.` form and tasknote archived to `archive/core/`

## 🧩 Subtasks

- [ ] Read each of the five target files at HEAD and locate the exact insertion points
- [ ] Confirm CORE-186 (ft-audit-context) wiring pattern still matches each surface (insertion ordering, symbolic-link block shape)
- [ ] Edit `claude/AGENTS-snippet.md` — paste-block skill enumeration + §"One-time symlink wiring" list (two edits, same file)
- [ ] Edit `claude/skills/ft-new-project/SKILL.md` Step 3 symlink list
- [ ] Edit `docs/MIGRATION.md` §1.2 prose (six → seven; verify no other "six" tokens collide)
- [ ] Edit `claude/skills/ft-flowtron/SKILL.md` roster (add `ft-debug` entry; bump any total count if surfaced)
- [ ] Edit `docs/PLATFORMS.md` skill counts (18→19 in both surfaces)
- [ ] Verify each edit reads cleanly in context (no broken cross-refs, alphabetic ordering, em-dash separators)

## 🔗 Related

- [[CORE-EPIC-195]] — parent epic
- [[CORE-195.1]] — Discovery (the 5-surface wiring plan source)
- [[CORE-195.2]] — sibling: authored the SKILL.md + command stub being wired here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Scope matches the .1 Discovery plan exactly: wire `/ft-debug` (authored in .2) into the five enumerated adopter-facing surfaces so adopters pick it up on their next bump. No design questions outstanding — all structural decisions resolved in [[CORE-195.1]]. Skill body + command stub now exist in repo (verified absent of any prior wiring references). Pure mechanical insertion / count-bump work.

- [x] Read relevant source files — `claude/AGENTS-snippet.md` (paste-block + symlink list), `claude/skills/ft-new-project/SKILL.md` (Step 3 enumeration + Step 7 stage list + Step 8 readlink verify list), `docs/MIGRATION.md` (§1.2 prose + §1.6 commit list + §1.7 verify mention + §3.8 smoke list), `claude/skills/ft-flowtron/SKILL.md` (bundled-skill roster table, 18 rows pre-edit), `docs/PLATFORMS.md` (line 32 "Today's surface" enumeration + lines 169/174 skill counts), plus `_project/tasknote/README.md` §"AI-referenced docs" (for Phase 4 sweep), and archive precedents `CORE-195.1` (plan) + `CORE-195.2` (authoring).

- [x] **Archive skim** — `CORE-186` (`ft-audit-context` wiring) is the closest precedent for this surface footprint. Confirmed pre-existing ordering pattern: `ft-task, ft-starter-task, ft-micro-task, ft-file-followup, ft-epic-discovery, ft-close-epic` across all enumerations — chronological / functional grouping (default runner → filing → lightweight → follow-up → epic). No archived tasknote references `ft-debug` anywhere yet (grepped `ft-debug` across all five target files → zero hits). Clean delta.

- [x] **Drift check:**
  - `claude/AGENTS-snippet.md` — ✅ paste-block at lines 9-21 + symlink list at lines 31-42 (6 command + 6 skill pairs) match Discovery expectation.
  - `claude/skills/ft-new-project/SKILL.md` — ✅ Step 3 heading at line 58 enumerates the 6 skills; Step 7 `git add` at lines 96-99 lists 6 command + 6 skill paths; Step 8 readlinks at lines 115-126 verify all 12 symlinks. All three touchpoints consistent.
  - `docs/MIGRATION.md` — ✅ §1.2 at lines 59-63 says "six tasknote slash commands" + enumerates them; §1.6 commit `git add` at lines 122-127 mirrors Step 7 of the skill; §1.7 verify at line 135 enumerates 5 sibling skills; §3.8 smoke list at line 286 also enumerates 5.
  - `claude/skills/ft-flowtron/SKILL.md` — ✅ 18 rows in the bundled-skill table (lines 44-61); confirmed count.
  - `docs/PLATFORMS.md` — ✅ line 32 says "Six tasknote skills" + enumerates them; lines 169 + 174 both say "18 .md slash-command stubs" / "18 SKILL.md skill bodies". `commands/` count grep confirmed: 2 occurrences of standalone "18" in PLATFORMS.md (the two target surfaces). Skill counts in `claude/skills/` and `claude/commands/` on disk = 19 each post-CORE-195.2 (the new `ft-debug` dir/file already landed).
  - All cited paths and counts are accurate.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **No clarifications needed**. Explicit assumptions: (a) `ft-debug` joins the existing enumeration at the **end of the chronological ordering** (not interleaved into the tasknote-vs-filing grouping), matching how CORE-186 wired `/ft-audit-context` (each new skill appended in landing order); (b) MIGRATION.md downstream touchpoints (§1.6 commit, §1.7 verify, §3.8 smoke) are in-scope for the wiring edit even though .1's PLAN line names only §1.2 — they reference the same enumeration and would drift if left stale; (c) PLATFORMS.md line 32 ("Today's surface" enumeration) is also in-scope for the same reason (named enumeration of the six tasknote skills); (d) the ft-flowtron roster gets ft-debug inserted in the tasknote-skill cluster at the top (rows 1-6 currently) as row 7, before the audit-family rows — keeps the table grouped by skill family; (e) AGENTS-snippet paste-block line 17 already groups "Other filing skills" — `ft-debug` is a tasknote-runner peer to `/ft-task`, not a filing skill, so it gets a short separate sentence after line 17's listing rather than being squeezed in.

- [x] Subtasks above populated with concrete, ordered steps — initial scaffold list refined during Discovery to reflect 5 distinct files + 3 secondary touchpoints in MIGRATION.md / ft-new-project surfaced by the drift check.

**Discovery Notes:**

**Five target surfaces (per .1 plan) + 3 sympathetic touchpoints (drift-check additions):**

| # | File | Edit shape |
|---|---|---|
| 1 | `claude/AGENTS-snippet.md` | (a) paste-block: add a short sentence after line 17 introducing `/ft-debug <ID>` as a hypothesis-first debugging skill; (b) §"One-time symlink wiring" block: add 2 lines (command + skill symlinks) at the end of the existing list |
| 2 | `claude/skills/ft-new-project/SKILL.md` | (a) Step 3 heading: add `, /ft-debug` to the comma-separated enumeration; (b) Step 7 `git add` block: append the 2 new symlink paths; (c) Step 8 `readlink` verification block: append 2 new readlink lines |
| 3 | `docs/MIGRATION.md` | (a) §1.2 prose "six → seven" + add `/ft-debug` to enumeration; (b) §1.6 `git add` mirror; (c) §1.7 verify mention; (d) §3.8 smoke list |
| 4 | `claude/skills/ft-flowtron/SKILL.md` | Add 1 row for `/ft-debug` to the bundled-skill table at the end of the tasknote-skill cluster |
| 5 | `docs/PLATFORMS.md` | (a) line 32: "Six tasknote skills" → "Seven", add `/ft-debug`; (b) line 169: `18` → `19`, add `ft-debug.md` to enumeration; (c) line 174: `18` → `19` |

**Pre-existing enumeration ordering** (confirmed across all surfaces): `ft-task, ft-starter-task, ft-micro-task, ft-file-followup, ft-epic-discovery, ft-close-epic`. New skills append to the end of the list (chronological landing order) — matches CORE-186 precedent.

**Exit gate judgment** (default-skip flavor per ft-task Step 4): Discovery surfaced zero scope deviation from the .1 plan; the 3 sympathetic-touchpoint additions are integrity-preservers on the same edit (not scope creep). Zero clarifying questions fired. **Discovery surfaced no significant deviation → skip 🛠️.** Proceeding directly to Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — read `claude/AGENTS-snippet.md` (paste-block grouping + symlink-block ordering), `claude/skills/ft-new-project/SKILL.md` Steps 3/7/8 (heading + git add + readlink trinity), `docs/MIGRATION.md` §§1.2/1.6/1.7/3.8 (prose + commit + verify + smoke), `claude/skills/ft-flowtron/SKILL.md` roster table (tasknote-skill cluster grouping), `docs/PLATFORMS.md` (Today's-surface enumeration shape). Established pattern: new skills append in chronological order; symlink lists and `git add` lists mirror each other byte-for-byte; "six → seven" / "18 → 19" count updates are localized. CORE-186 (ft-audit-context wiring) was the closest single-skill-add precedent for the surface map. No new shape needed — extended existing pattern across all 5 files.

- [x] Implemented the minimal solution
  - `claude/AGENTS-snippet.md` (+2 hunks): paste-block gains a one-bullet `/ft-debug` introduction sentence after the "Other filing skills" bullet (re-frames it correctly as a peer to `/ft-task`, not a filing skill); symlink block appends 2 new `ln -s` lines (command + skill).
  - `claude/skills/ft-new-project/SKILL.md` (+3 hunks): Step 3 heading enumeration gains `, /ft-debug`; Step 7 `git add` block gains `.claude/commands/ft-debug.md` + `.claude/skills/ft-debug`; Step 8 readlink verification adds 2 new readlink lines + bumps the prose "twelve symlinks" → "fourteen".
  - `docs/MIGRATION.md` (+4 hunks): §1.2 heading "six → seven" + prose "six tasknote slash commands" → "seven" + enumeration adds `/ft-debug` + purpose summary appends "hypothesis-first debug runner"; §1.6 `git add` adds the 2 paths on continuation lines; §1.7 verify mention appends `/ft-debug` to the sibling list; §3.8 smoke list adds `/ft-debug` + "five" → "six" sibling count.
  - `claude/skills/ft-flowtron/SKILL.md` (+1 row): bundled-skill table inserts a new row for `/ft-debug` between `/ft-close-epic` and `/ft-audit` (preserves tasknote-skill cluster grouping).
  - `docs/PLATFORMS.md` (+3 hunks): line 31 "Six tasknote skills" → "Seven" + enumeration adds `/ft-debug`; line 169 "18 .md slash-command stubs" → "19" + enumeration adds `ft-debug.md`; line 174 "18 SKILL.md skill bodies" → "19".

- [x] Updated/added tests for non-trivial behavior — N/A (pure markdown documentation edits across 5 doc/skill files; no executable code surface; no parser shape change — visualizer is unaffected since no PLAN.md grammar changed).

**Implementation Notes:**

- Total delta: 5 files, 13 hunks. All edits append to or count-bump existing enumerations; zero deletions, zero restructuring. New text count: ~12 lines net.
- The pre-edit "five" appearances of "six" in MIGRATION.md target only the tasknote-skill set (§1.2 heading, §1.2 prose body); the legitimate "six" for the audit-family scaffold (line 67) and the rephrased "six" in §3.8's "confirm all six appear" (referring to siblings after ft-debug landed: starter, micro, file-followup, epic-discovery, close-epic, debug) both remain correct.
- The pre-edit "two" 18-count claims in PLATFORMS.md (lines 169, 174) bumped to 19 — verified on-disk: `ls claude/skills/ | grep -c '^ft-'` → 19, `ls claude/commands/ | grep -c '^ft-'` → 19. Counts and disk reality agree.
- AGENTS-snippet ordering decision recorded inline in the tasknote: `/ft-debug` got its own bullet (not squeezed into the "Other filing skills" bullet) because it's a tasknote-runner peer to `/ft-task`, not a filing skill — the grouping logic in the paste-block stays clean.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only edits across docs + skill SKILL.md files; no executable test surface).

- [x] Ran lint/type-check on changed code — structural sweep across all 5 files: `grep -n "ft-debug"` returned consistent hits across paste-block / symlink-block / Step 3 heading / git add / readlink / §1.2-1.7 / §3.8 / roster row / line 31 enumeration / lines 169-174 counts. `grep -nE "\b(six|18)\b"` confirmed remaining occurrences are all legitimate (audit-family count, sibling-skill count in §3.8 = 6 post-edit). On-disk skill+command counts both = 19, matching the new claims. No frontmatter or markdown syntax issues introduced.

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A. Pure documentation/wiring edits with no UI/viz/browser surface touched. Per Phase 3 contract, no 👁️ prose ask required.

**Testing Notes:**

The wiring edits are purely additive (new enumeration entries, new symlink lines, new readlinks, new roster row, count bumps from 18→19 and six→seven). The visualizer `viz/src/parser.ts` and any other adopter-facing parser is unaffected — no PLAN.md grammar change. Symlink instructions in the AGENTS-snippet are aligned with the on-disk reality and will produce working symlinks when adopters paste them.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `_project/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change (no skill enumeration; public overview only).
  - `SPEC.md` — no change (the §"Skill namespace" + §"When to use a tasknote" bumps for `/ft-debug` are sibling .4 spec-integration's scope, intentionally not this child).
  - `docs/MIGRATION.md` — **updated** (this task): §1.2 prose six→seven + `/ft-debug` enumeration; §1.6 commit `git add` adds 2 paths; §1.7 verify mention adds `/ft-debug`; §3.8 smoke list adds `/ft-debug` + sibling count 5→6.
  - `claude/AGENTS-snippet.md` — **updated** (this task): paste-block gains `/ft-debug` introduction bullet; §"One-time symlink wiring" adds 2 `ln -s` lines (command + skill).
  - `docs/CONVENTIONS.md` — no change.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change.
  - `docs/AGENT-NEUTRALITY.md` — no change.
  - `docs/PLATFORMS.md` — **updated** (this task): line 31 "Six tasknote skills" → "Seven" + `/ft-debug` enumeration; line 169 `commands/` 18 → 19 + enumeration; line 174 `skills/` 18 → 19.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-29.` and tasknote moved to `_project/tasknote/archive/core/CORE-195.3.md`.

- [x] Recap drafted (inline below per conditional-skip rule — pure markdown edits, no frontend / privileged-ops / perf concern).

**Final Summary:**

Wired the freshly-authored `/ft-debug` skill (landed in CORE-195.2) into the five adopter-facing surfaces so adopters pick it up on their next flowtron bump. Edits: `claude/AGENTS-snippet.md` (paste-block intro bullet + 2 symlinks), `claude/skills/ft-new-project/SKILL.md` (Step 3 heading + Step 7 git add + Step 8 readlink trinity), `docs/MIGRATION.md` (§1.2 six→seven + §1.6 commit + §1.7 verify + §3.8 smoke), `claude/skills/ft-flowtron/SKILL.md` (roster table row), `docs/PLATFORMS.md` (line 31 enumeration + lines 169/174 18→19 counts). 5 files, 13 hunks, ~12 net new lines. On-disk skill/command counts (19 each) verified to match the new claims. SPEC integration (the §"Skill namespace" enumeration + §"When to use a tasknote" bullet) is reserved for sibling CORE-195.4. Final epic audit lives in CORE-195.5.

**Archived:** 2026-05-29
