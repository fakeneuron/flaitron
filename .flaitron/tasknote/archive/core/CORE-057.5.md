---
title: /file-followup skill
status: completed
tags: []
created: 2026-05-09
due:
related-tasks: [CORE-EPIC-057, CORE-057.1]
---

# CORE-057.5 | /file-followup skill

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-057]] [[CORE-057.1]]

## 🎯 Goal

Ship `/file-followup` — a lighter-than-`/starter-task` skill for mid-flow follow-up filing from inside an active tasknote, writing one PLAN.md line on disk and delivering a short context paragraph conversationally only (no tasknote artifact).

## ✅ Acceptance

- [ ] New SKILL at `claude/skills/file-followup/SKILL.md` mirrors `starter-task/SKILL.md`'s shape (cite-don't-restate per CORE-051), with steps for paths · pre-flight · input collection · review surface · append PLAN.md · deliver conversational paragraph · hand-off; honors 50w/70w filing-discipline thresholds
- [ ] New slash-command stub at `claude/commands/file-followup.md` mirrors `commands/starter-task.md` (frontmatter + one-paragraph invoke body + sibling cross-refs)
- [ ] `SPEC.md` §"When to use a tasknote (and when not to)" gains a `File a follow-up via /file-followup <ID> when:` block + matching skip block, mirroring the existing starter/micro carve-outs (no new top-level section; no SPEC lazy module)
- [ ] `claude/skills/new-project/SKILL.md` Step 3 + Step 8 verification block updated to wire `/file-followup` (2 new symlink lines: `commands/file-followup.md` + `skills/file-followup`)
- [ ] `docs/MIGRATION.md` §1.2 mirrors the new-project Step 3 update (description bullet + 2 new symlink lines)
- [ ] `claude/CLAUDE-snippet.md` workflow block mentions `/file-followup`; "One-time symlink wiring" section adds the 2 new symlink lines
- [ ] Doc-drift sweep at Phase 4 covers `README.md` / `SPEC.md` / `docs/MIGRATION.md` / `claude/CLAUDE-snippet.md` (per `_project/tasknote/README.md` §"AI-referenced docs")

## 🧩 Subtasks

- [ ] Draft `claude/skills/file-followup/SKILL.md` (cite-don't-restate; lighter than `/starter-task` — no starter body, no file writes beyond PLAN.md, no active-tasknote breadcrumb)
- [ ] Draft `claude/commands/file-followup.md` (mirror `commands/starter-task.md`; argument-hint `<TASK-ID>`; cross-refs to `/task`, `/starter-task`, `/micro-task`, `/new-project`)
- [ ] Edit `SPEC.md` §"When to use a tasknote (and when not to)" — insert `File a follow-up` carve-out + `Skip the follow-up` block; choose placement after the starter blocks, before micro (lighter than starter, distinct from micro)
- [ ] Edit `claude/skills/new-project/SKILL.md` Step 3 (add symlinks) + Step 8 (extend readlink verification list)
- [ ] Edit `docs/MIGRATION.md` §1.2 (description bullet + symlink commands; mirror new-project Step 3)
- [ ] Edit `claude/CLAUDE-snippet.md` (workflow-block paragraph + symlink-wiring section)
- [ ] Targeted self-review: re-read each edited file; confirm grammar / indentation / cross-references parity. No code tests applicable (docs/skill files only)
- [ ] Phase 4: doc-drift sweep, PLAN.md flip to stub form, archive move

## 🔗 Related

- [[CORE-EPIC-057]] — parent epic (4-skill expansion cohort)
- [[CORE-057.1]] — Discovery predecessor that locked the conversational-only output shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Parent epic CORE-EPIC-057 + Discovery (CORE-057.1) both filed/closed today (2026-05-09) with the design space pre-resolved. CORE-057.1's Final Summary locked: "only the one-line PLAN.md entry is written to disk; the 'short context paragraph' is delivered conversationally only (no tasknote artifact)" — this child implements that contract. No sibling earlier in the cohort (CORE-057.2 `/release`, CORE-057.3 `/epic-discovery`, CORE-057.4 `/close-epic`) has fired yet, but `/file-followup` shares no source paths with them at the SKILL/command level (each gets its own `claude/skills/<name>/` + `claude/commands/<name>.md`). The 3 shared adopter-wiring surfaces (`new-project/SKILL.md` Step 3, `MIGRATION.md` §1.2, `CLAUDE-snippet.md`) are touched additively — additions are safe to land independently of sibling order.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions (3-question AskUserQuestion resolved SPEC home + paragraph shape + breadcrumb policy; answers captured under "Resolved scoping" below)
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source-file inventory (live, on-spec at 2026-05-09)

- **Existing skills** (4 SKILLs + 4 commands): `claude/skills/{task,starter-task,micro-task,new-project}/SKILL.md` and `claude/commands/{task,starter-task,micro-task,new-project}.md`. `/release`, `/epic-discovery`, `/close-epic` not yet shipped.
- **Adopter-wiring surfaces (3, all currently citing the same 3-skill / 6-symlink set):**
  - `claude/skills/new-project/SKILL.md` Step 3 (lines 58-72) + Step 8 readlink verification (lines 124-135).
  - `docs/MIGRATION.md` §1.2 (lines ~50-72): description bullets + symlink commands.
  - `claude/CLAUDE-snippet.md` workflow block (lines 9-21) + "One-time symlink wiring" section (lines 25-39).
- **SPEC home target:** `SPEC.md` §"When to use a tasknote (and when not to)" (lines 334-380). Existing carve-outs: starter (lines 350-362) + micro (lines 364-378). Cleanest placement for the new follow-up carve-out is after starter / before micro — `/file-followup` is lighter than starter (no body) but distinct from micro (no execution).
- **Filing-discipline cap:** `SPEC.md` §"PLAN.md filing-discipline thresholds" (lines 382-400) — 50w target / 70w hard cap apply to active task lines. `/file-followup` must enforce this same check (the line it writes is an active task line).
- **Templates:** `templates/{tasknote-template,tasknote-starter-template,tasknote-micro-template,tasknote-README,PLAN}.md`. No new template needed — `/file-followup` produces no tasknote file.

### Archive skim (precedents)

- `archive/core/CORE-057.1.md` — Discovery predecessor; locked SPEC home (still TBD at Discovery close, resolved by this Phase 1's clarifying questions), output shape ("only one PLAN.md line on disk; paragraph conversational-only"), and auto-wiring policy (auto-wired into adopters via `/new-project` + MIGRATION §1.2).
- `archive/core/CORE-054.md` — cohort-locking predecessor; established `[opus]` model tagging on all 6 children + auto-wiring policy.
- `archive/core/CORE-027.md` — original `/starter-task` ship; lightweight-skill-shipping pattern (closest precedent for shipping a new lightweight filing-only skill with adopter wiring).
- `archive/core/CORE-051.md` — `starter-task SKILL cite-don't-restate`; current SKILL.md style precedent (cite SPEC sections; don't restate). Apply this style to the new SKILL.
- `archive/core/CORE-050.md` — `micro-task SKILL cite-don't-restate`; same style precedent for the sibling lightweight skill.
- `archive/core/CORE-040.md` — set the 50w/70w filing-discipline thresholds; `/file-followup` enforces the same check `/starter-task` runs.
- No prior tasknote touches `claude/skills/file-followup/` (doesn't exist yet); no prior tasknote modifies the SPEC.md §"When to use" carve-out structure beyond the starter and micro adds — this is the third carve-out add to that section.

### Drift check

- `claude/skills/new-project/SKILL.md` Step 3 lines 58-72 — confirmed wires 3 skills today (3 commands + 3 skills = 6 symlinks). Step 8 readlink list at lines 124-135 mirrors. Diff this Phase 2 will land: +2 lines in each surface.
- `docs/MIGRATION.md` §1.2 — confirmed mirrors new-project Step 3 (description list + symlink commands). Diff: +1 description bullet + 2 symlink lines.
- `claude/CLAUDE-snippet.md` workflow block (lines 9-21) — currently mentions `/task`, `/starter-task`, `/micro-task` and points at SPEC §"When to use a tasknote (and when not to)". Diff: extend the existing starter/micro mention sentence to include `/file-followup`. Symlink section (lines 25-39): +2 lines.
- `SPEC.md` §"When to use a tasknote (and when not to)" — confirmed has the starter and micro carve-out blocks at the cited lines; mid-section structure is alternating "File a X when:" + "Skip the X when:" sub-blocks. Diff: +1 paired block following the existing pattern.
- `SPEC.md` §"PLAN.md filing-discipline thresholds" — confirmed 50w/70w cap in place; `/file-followup`'s threshold-check enforcement language can cite this section verbatim.
- `_project/PLAN.md` line for CORE-057.5 (line 33) — task-line grammar matches SPEC §"Task-line format" (`[opus]` tag + `| /file-followup skill` shortname + 40-word long description well under the 50w target). No drift; description is implementation-ready.

### Resolved scoping (this Phase 1, 2026-05-09)

| Question | Choice | Implication for Phase 2 |
|---|---|---|
| SPEC home for `/file-followup` | **Inline under §"When to use"** | Add a paired `File a follow-up via /file-followup <ID> when:` + `Skip the follow-up when:` block to SPEC.md mid-section. No new top-level section, no `SPEC/followup.md` lazy module. Lightest-touch SPEC change in the cohort. |
| Conversational paragraph shape | **Free-form prose** | SKILL prescribes intent only (rationale + suspected scope + recommended priority/model) — no fixed schema, no bold-prefix prompts, no sub-headings. Maximum lightness; AI writes naturally per conversation. |
| Active-tasknote breadcrumb when invoked from inside `/task` | **No trail** | Strict reading of CORE-057.1's "only one PLAN.md line on disk." Active tasknote is untouched even when `/file-followup` runs mid-flow. Cleanest separation; active tasknote stays a record of what it was for, not a coordination ledger. |

### Design implications

- `/file-followup` has the lightest contract of the 4 cohort skills: no tasknote file, no SPEC lazy module, no body schema, no breadcrumb. Filing-only like `/starter-task`, but produces **zero** disk artifacts beyond the appended PLAN.md line.
- The "short context paragraph" is ephemeral — it lives only in the chat where filing happened. If the user wants persistent rich context, they should use `/starter-task` instead. This is the exact differentiator the SKILL must surface.
- Filing-discipline cap (50w target / 70w hard cap from `/CORE-040`-introduced thresholds) applies. At >70w, the SKILL suggests promoting to `/starter-task` (where the rich context routes into the starter body). At ≤70w, the line goes into PLAN.md and the rest is conversational.
- Adopter wiring is a 3-surface diff (new-project Step 3 + MIGRATION §1.2 + CLAUDE-snippet) — same pattern as `/starter-task` and `/micro-task` already followed. Nothing new in shape; just 2 more symlinks per surface.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — closest sibling `claude/skills/starter-task/SKILL.md` (filing-only, lightweight, AskUserQuestion-driven inputs, no commit, sibling cross-refs). Cite-don't-restate style per CORE-051. Slash-command stub mirrors `claude/commands/starter-task.md`. SPEC carve-out mirrors the existing starter / micro paired-block pattern in §"When to use a tasknote (and when not to)". Adopter wiring (3 surfaces) follows the established 6-symlink → 8-symlink expansion shape. No new shape introduced; just lighter-weight extension of the established pattern.
- [x] Implemented the minimal solution — 7 file edits across 4 surfaces (2 new files + 4 edits):
  - **NEW** `claude/skills/file-followup/SKILL.md` (115 lines; 6-step shape — paths · pre-flight · inputs+threshold-gate · draft+review · file motion · hand-off; cite-don't-restate)
  - **NEW** `claude/commands/file-followup.md` (frontmatter + invoke paragraph + sibling cross-refs)
  - **EDIT** `SPEC.md` §"When to use a tasknote (and when not to)" — added paired `File a follow-up` / `Skip the follow-up` blocks between starter and micro carve-outs (lines ~364-381 inserted); also extended §"PLAN.md filing-discipline thresholds" closing paragraph to credit `/file-followup` as the third filing-time enforcer (decline-and-route at >70w)
  - **EDIT** `claude/skills/new-project/SKILL.md` Step 3 (added 2 symlinks: `commands/file-followup.md` + `skills/file-followup`); Step 7 staging command (added 2 paths to `git add` line); Step 8 readlink verification block (extended to 8 symlinks); Step 8 hand-off message (extended slash-command-menu list)
  - **EDIT** `docs/MIGRATION.md` §1.2 — heading + intro sentence + description list (added `/file-followup` bullet) + symlink commands (mirror new-project Step 3)
  - **EDIT** `claude/CLAUDE-snippet.md` workflow-block paragraph (extended starter/micro mention sentence to include `/file-followup`); "One-time symlink wiring" section (added 2 symlink lines + extended verify-list)
- [x] Updated/added tests for non-trivial behavior — N/A (skill files / SPEC prose / wiring docs only; no executable code surface).

**Implementation Notes:**

- **Tone of "lighter than starter".** The SKILL.md surfaces this in three places: the description frontmatter, the leading paragraph, and the `## Notes` cross-references. The decline-at-70w gate at Step 2 is the load-bearing enforcement of the lightness contract — it's where the SKILL routes the user to `/starter-task` rather than silently filing oversize lines.
- **No active-tasknote breadcrumb.** SKILL Step 4.2 ("Deliver the conversational paragraph") is explicit: "chat-only — never persisted to disk, never written into the active tasknote." The leading paragraph and `## Notes` reinforce this. Strict reading of CORE-057.1's locked output shape.
- **SPEC.md placement choice (after starter, before micro).** The existing structure of §"When to use" alternates `File X` / `Skip X` paired blocks. Inserting the follow-up pair after starter / before micro reads naturally on weight (starter heaviest → follow-up middleweight → micro lightest is wrong; the actual ordering is *kind*, not *weight*: starter and follow-up are both filing-only, micro is file+execute). Filing-only kin grouped together, with the lighter-than-starter pair right after starter; micro stays in its current slot below.
- **No new SPEC lazy module.** The follow-up contract is short enough to live entirely in the inline carve-out (~20 lines added). No `SPEC/followup.md` needed; the SKILL.md is the canonical executable interpretation, the SPEC carve-out is the canonical contract.
- **No template needed.** `/file-followup` produces no tasknote file. `templates/` directory unchanged.
- **Filing-discipline reuse.** The 50w/70w thresholds from CORE-040 apply unchanged; the SKILL cites SPEC §"PLAN.md filing-discipline thresholds" rather than restating. SPEC's threshold-section closing paragraph now lists three enforcers (`/starter-task` flag, `/file-followup` decline-and-route, `/task` scaffold-time flag) instead of two.
- **Adopter wiring (3 surfaces) ships in this tasknote.** When this lands, an adopter project bumping flowtron will get `/file-followup` automatically on next `git submodule update`. New adopter projects bootstrapping via `/new-project` will get all 4 commands wired by default. CLAUDE-snippet drift is in sync.
- **Sibling-cohort independence.** No edit in this tasknote depends on or pre-conflicts with CORE-057.2 / .3 / .4 / .6. Each sibling's SKILL + command + SPEC additions are fully independent surfaces; the 3 wiring surfaces (new-project Step 3, MIGRATION §1.2, CLAUDE-snippet) accept additive edits. CORE-057.2 (`/release`) ships zero adopter-wiring edits (flowtron-self only); CORE-057.3 (`/epic-discovery`) and CORE-057.4 (`/close-epic`) each add 2 more symlinks per surface following this same shape.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (skill files, SPEC prose, slash-command stubs, and adopter-wiring docs only; no executable code surface).
- [x] Ran lint/type-check on changed code — N/A (no code). Markdown mental-pass on each edited file: SPEC §"When to use" pair structure preserved (alternating `File X` / `Skip X` blocks; new follow-up pair sits between starter and micro symmetrically); SPEC §"PLAN.md filing-discipline thresholds" closing paragraph reads cleanly with three enforcers cited; new-project SKILL Step 3 + Step 7 + Step 8 column alignment intact (`.md` files spaced consistently in the `ln -s` block); MIGRATION §1.2 mirrors new-project Step 3 verbatim; CLAUDE-snippet workflow block paragraph + symlink section + verify-list all consistent. New `claude/skills/file-followup/SKILL.md` frontmatter follows the canonical `name:` / `description:` shape (matches `starter-task/SKILL.md`); `claude/commands/file-followup.md` frontmatter matches `commands/starter-task.md` (description + argument-hint + invoke paragraph + sibling cross-refs).
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend change; PLAN.md grammar unchanged so the visualizer parses unchanged).

**Testing Notes:**

Re-read SPEC.md lines 357-394 post-edit: the new follow-up paired block + standalone paragraph slot in cleanly between starter (357-362) and micro (378-394) blocks. Section structure remains symmetric — every sub-skill has `File X when:` + `Skip X when:` blocks, with optional clarifying paragraphs. No structural drift introduced.

`git status --short` confirms 4 modified files (SPEC.md, CLAUDE-snippet.md, new-project/SKILL.md, MIGRATION.md) + 2 new files (file-followup/SKILL.md, file-followup.md) + 1 active tasknote — exactly the 7-surface diff Phase 2 planned.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** —
  - `README.md`: **no change.** Lines 87 cites only `/task` + `/new-project` as the entry-point pair; full skill set lives in SPEC / MIGRATION / CLAUDE-snippet. Precedent: CORE-050 and CORE-051 (which shipped `/micro-task` and refactored `/starter-task`) did not add their commands to README.md either. Keeping `/file-followup` out of the README list maintains the entry-point-pair convention.
  - `SPEC.md`: **updated** — added paired `File a follow-up (`/file-followup <ID>`) when:` + `Skip the follow-up when:` blocks + standalone clarifying paragraph in §"When to use a tasknote (and when not to)" between the starter and micro carve-outs (~13 lines added at lines 364-376); extended §"PLAN.md filing-discipline thresholds" closing paragraph to credit `/file-followup` as the third filing-time enforcer (decline-and-route at >70w).
  - `docs/MIGRATION.md`: **updated** — §1.2 heading expanded to 4 commands; intro description list adds the `/file-followup` bullet; symlink commands block extended to 8 lines mirroring new-project Step 3.
  - `claude/CLAUDE-snippet.md`: **updated** — workflow-block paragraph (lines 17) extended to mention `/file-followup`; "One-time symlink wiring" section (lines 29-37) extended to 8-symlink set; verify-list updated to cite the 4-command menu.
- [x] Closed — PLAN.md line 33 flipped to stub form `[x] **CORE-057.5** [opus] | /file-followup skill — Completed 2026-05-09.` (kept nested under `CORE-EPIC-057` in `## Medium` per epic-cohort grouping; parent + cohort move to `## Completed` only when all children close, mirroring CORE-057.1 closure precedent) and tasknote moved to `_project/tasknote/archive/core/`
- [ ] Recapped changes with the user and got confirmation

**Final Summary:**

Shipped `/file-followup` — the lightest filing-only skill in the cohort. Two new files (`claude/skills/file-followup/SKILL.md` + `claude/commands/file-followup.md`) and four edited surfaces (SPEC.md §"When to use" + §"PLAN.md filing-discipline thresholds"; new-project SKILL Step 3/7/8; MIGRATION §1.2; CLAUDE-snippet workflow block + symlink section). Three design decisions locked in Phase 1: (1) SPEC home is inline under §"When to use" — no top-level section, no lazy module; (2) conversational paragraph is free-form prose with prescribed intent only (rationale + suspected scope + recommended priority/model) — no fixed schema; (3) no active-tasknote breadcrumb when invoked from inside `/task` — strict reading of CORE-057.1's "only one PLAN.md line on disk." Filing-discipline gate at SKILL Step 2 declines >70w filings and routes to `/starter-task`, making the lightness contract load-bearing rather than aspirational. Adopter wiring (3 surfaces) lands additively; new adopters via `/new-project` get `/file-followup` automatically, existing adopters pick it up on next flowtron version bump. CORE-057.6 audit will verify naming/snippet/MIGRATION currency across all 4 cohort skills. PLAN.md line for CORE-057.5 stays nested under CORE-EPIC-057 in `## Medium`; parent + cohort move to `## Completed` only when all children close.

**Archived:** 2026-05-09
