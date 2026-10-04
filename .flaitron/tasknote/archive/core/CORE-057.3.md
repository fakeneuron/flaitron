---
title: /epic-discovery skill
status: completed
tags: []
created: 2026-05-09
related-tasks: [CORE-EPIC-057, CORE-057.1, CORE-054]
---

# CORE-057.3 | /epic-discovery skill

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-057]] [[CORE-057.1]] [[CORE-054]]

## 🎯 Goal

Ship `/epic-discovery` per `SPEC/epic.md`: in one motion, file parent `<AREA>-EPIC-<N>` + `.1` Discovery + `.N` audit placeholder lines into PLAN.md, scaffold the `.1` tasknote with tailored epic-Discovery pre-fill, and drive its full 4-phase tasknote inline (Phase 2 deliverable = filed `.2..(N-1)` children). Auto-wired into adopters via `/new-project` Step 3 + `docs/MIGRATION.md` §1.2 + `claude/CLAUDE-snippet.md`.

## ✅ Acceptance

- [ ] `claude/skills/epic-discovery/SKILL.md` exists with the locked design: no-args, AskUserQuestion-driven inputs (area + shortname + priority + model + total-subtask-count N), files 3 PLAN.md lines (parent epic + `.1` Discovery + `.N` audit) at filing time, scaffolds `.1` tasknote with tailored `## ✅ Acceptance` + `## 🧩 Subtasks` parameterized to N, drives the full 4-phase tasknote inline (Phase 2 = file `.2..(N-1)` children) through closure
- [ ] `claude/commands/epic-discovery.md` slash-command stub exists (frontmatter `description`, no `argument-hint`, one-paragraph "invoke the skill" body, sibling cross-refs)
- [ ] `claude/skills/new-project/SKILL.md` Step 3 (symlinks) + Step 7 staging command + Step 8 readlink verification list + Step 8 hand-off message updated to wire `/epic-discovery` (+2 symlinks: `commands/epic-discovery.md` + `skills/epic-discovery`)
- [ ] `docs/MIGRATION.md` §1.2 mirrors the new-project Step 3 update (heading + intro list + symlink commands extended)
- [ ] `claude/CLAUDE-snippet.md` workflow-block paragraph extended to mention `/epic-discovery`; "One-time symlink wiring" section + verify list updated
- [ ] `SPEC/epic.md` gains a one-line executable-interpretation pointer to `/epic-discovery` (minimal SPEC change; SPEC contract itself unchanged)
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" (README.md / SPEC.md / docs/MIGRATION.md / claude/CLAUDE-snippet.md) — per-entry verdict
- [ ] Single `feat: CORE-057.3 — ship /epic-discovery skill` commit lands
- [ ] PLAN.md line for CORE-057.3 flipped to stub form `Completed YYYY-MM-DD.` (kept nested under `CORE-EPIC-057` in `## Medium` per epic-cohort grouping; cohort moves to `## Completed` only when all children close — mirrors CORE-057.1 / .2 / .5 closure precedent)
- [ ] Tasknote moved to `_project/tasknote/archive/core/CORE-057.3.md`

## 🧩 Subtasks

- [ ] Create `claude/skills/epic-discovery/` directory
- [ ] Write `claude/skills/epic-discovery/SKILL.md` — Step 0 (path resolution: adopter vs flowtron-self per `/task` precedent); Step 1 (pre-flight: `_project/PLAN.md` exists); Step 2 (single AskUserQuestion: area, shortname, priority, model, total-subtask-count N); Step 3 (resolve next available `<AREA>-EPIC-<N>` via PLAN.md scan over existing epic IDs; surface for user confirm); Step 4 (file 3 PLAN.md lines under chosen priority: parent epic + `.1` Discovery + `.N` audit placeholder); Step 5 (scaffold `.1` tasknote from `templates/tasknote-template.md` with tailored Goal + parameterized Acceptance + parameterized Subtasks); Step 6 (drive Phase 1 inline — relevance / file-reads / archive-skim / drift-check; clarifying-questions step uses AskUserQuestion for sibling-children shortnames + scopes); Step 7 (drive Phase 2 inline — write `.2..(N-1)` PLAN.md lines + tick boxes); Step 8 (drive Phase 3 inline — markdown lint mental-pass); Step 9 (drive Phase 4 inline — doc-drift sweep, flip `.1` PLAN line to stub, archive `.1` tasknote); Step 10 (post-closure protocol per SPEC §"Post-closure protocol")
- [ ] Write `claude/commands/epic-discovery.md` — frontmatter (`description`; no `argument-hint`) + invoke-the-skill paragraph + sibling cross-refs to `/task`, `/starter-task`, `/micro-task`, `/file-followup`, `/new-project`
- [ ] Edit `claude/skills/new-project/SKILL.md` — Step 3 (add 2 symlinks); Step 7 staging command (extend `git add` paths); Step 8 readlink verification (extend to 10 symlinks); Step 8 hand-off message (extend slash-command-menu list)
- [ ] Edit `docs/MIGRATION.md` §1.2 — heading + intro description list + symlink commands (mirror new-project Step 3)
- [ ] Edit `claude/CLAUDE-snippet.md` — workflow-block paragraph (extend); "One-time symlink wiring" section (add 2 symlink lines + extend verify-list)
- [ ] Edit `SPEC/epic.md` — add one-line pointer to `/epic-discovery` as the executable interpretation of the lifecycle's filing-and-Discovery step (placement: end of "Lifecycle" block or under a new one-line "Skill" caption)
- [ ] Targeted self-review (Phase 3): markdown mental-pass on each edited file; verify SKILL frontmatter shape, symlink column alignment, fenced-block balance, sibling-skill consistency. No executable code surface.
- [ ] Phase 4 closure: doc-drift sweep over the 4 AI-referenced docs (verdict each); flip CORE-057.3 PLAN line to stub form; archive tasknote to `_project/tasknote/archive/core/CORE-057.3.md`

## 🔗 Related

- [[CORE-EPIC-057]] — parent epic (4-skill expansion cohort)
- [[CORE-057.1]] — Discovery that locked this skill's scope (file-epic-and-scaffold-`.1` motion; auto-wire into adopters)
- [[CORE-054]] — predecessor that surveyed candidates and filed this cohort

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Parent epic CORE-EPIC-057 + Discovery (CORE-057.1) both filed/closed today (2026-05-09). CORE-057.1's locked scope ("One motion: skill writes parent `<AREA>-EPIC-<N>` + `.1` Discovery + `.N` audit placeholder lines in PLAN.md, then scaffolds the `.1` tasknote and drives Phase 1") is the exact contract this child implements. Cohort siblings .1 / .2 / .5 closed today (Discovery, `/release`, `/file-followup`); .4 / .6 still pending. CORE-057.3 is the next implementation child in serial order. Sibling-cohort independence holds: each skill ships its own `claude/skills/<name>/` + `claude/commands/<name>.md`; the 3 shared adopter-wiring surfaces (new-project Step 3, MIGRATION §1.2, CLAUDE-snippet) accept additive edits. No conflict with sibling order.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes; no drift on cited paths/concepts
- [x] Asked clarifying questions (4-question AskUserQuestion resolved args grammar / phase scope / audit numbering / scaffold pre-fill — answers locked under "Resolved scoping" below)
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source-file inventory (live at 2026-05-09)

- **Closest scaffold-and-drive precedent:** `claude/skills/release/SKILL.md` (~240 lines, 9 steps, drives full 4-phase tasknote inline). Same shape applies to `/epic-discovery`: pre-flight → input collection → file PLAN lines → scaffold → drive Phase 1-4 → post-closure.
- **Closest cohort sibling for adopter-wiring diff:** `claude/skills/file-followup/` (CORE-057.5, shipped today). Established the +2-symlink-per-surface pattern across 3 wiring surfaces (new-project Step 3, MIGRATION §1.2, CLAUDE-snippet). `/epic-discovery` repeats that exact diff shape.
- **Slash-command stub precedents:** `claude/commands/{release,new-project}.md` (no `argument-hint` — strict no-args); `claude/commands/{task,starter-task,micro-task,file-followup}.md` (with `argument-hint`). `/epic-discovery` is no-args → mirror `/release`'s stub shape.
- **Existing skills (5 SKILLs + 5 commands at HEAD):** `task`, `starter-task`, `micro-task`, `new-project`, `file-followup`, `release`. After this child lands: 7 SKILLs / 7 commands; after .4 lands: 8/8.
- **Adopter-wiring surfaces (currently 4-symlink set after CORE-057.5 landed):**
  - `claude/skills/new-project/SKILL.md` Step 3 (lines 58-72) wires 4 commands + 4 skills = 8 symlinks. Step 7 `git add` (lines 111-115) lists the 4 paths. Step 8 readlink verification (lines 130-138) mirrors. Diff this Phase 2 will land: +2 lines per surface (10 symlinks after).
  - `docs/MIGRATION.md` §1.2 (lines 50-72) mirrors new-project Step 3 — description list + symlink commands. Diff: +1 description bullet + 2 symlink lines.
  - `claude/CLAUDE-snippet.md` workflow-block paragraph (line 17) currently mentions `/starter-task`, `/micro-task`, `/file-followup`. Symlink section (lines 29-37) lists 8 symlinks. Verify-list (line 43) cites 4 commands. Diff: extend paragraph + 2 symlink lines + extend verify-list.
- **SPEC/epic.md (47 lines):** describes the `.1` Discovery / `.N` Audit convention completely. `/epic-discovery` makes the filing+Discovery side executable (the lifecycle's step 1+2 from `SPEC/epic.md` lines 24-28). The SPEC module needs only a one-line pointer ("Filing and Phase 1 Discovery are codified in `claude/skills/epic-discovery/`" or similar); the contract itself is already complete.
- **`templates/tasknote-template.md`:** standard 4-phase template that `/epic-discovery` parameterizes for the `.1` tasknote with tailored Goal + Acceptance + Subtasks. No new template needed.
- **`templates/PLAN.md`:** contains the canonical task-line grammar comment block (lines 35-43); the parent + `.1` + `.N` lines this skill writes follow that grammar verbatim.

### Archive skim (precedents)

- `archive/core/CORE-057.1.md` — Discovery predecessor that locked this skill's exact scope (file parent + `.1` + `.N` audit; scaffold `.1`; drive Phase 1; deliverable = filed `.2..(N-1)` children). Explicitly notes "Auto-wired into adopters via `/new-project` and `docs/MIGRATION.md` §1.2."
- `archive/core/CORE-057.2.md` — `/release` ship; closest scaffold-and-drive shape precedent (no-args, AskUserQuestion-driven inputs, drives full 4-phase tasknote inline). Also confirms cohort cadence: `feat: CORE-057.<N> — ship /<name> skill` commit, PLAN line stays nested under `CORE-EPIC-057` in `## Medium` post-closure.
- `archive/core/CORE-057.5.md` — `/file-followup` ship; closest adopter-wiring diff precedent (+2-symlinks-per-surface across 3 wiring surfaces). Confirms the `/epic-discovery` adopter-wiring diff shape verbatim.
- `archive/core/CORE-051.md` — `/starter-task` SKILL cite-don't-restate; current SKILL style precedent. `/epic-discovery` SKILL applies the same style: cite SPEC/epic.md and SPEC §"Post-closure protocol" rather than restating.
- `archive/core/CORE-054.md` — cohort-locking predecessor; `[opus]` model + auto-wiring policy.
- `archive/core/CORE-EPIC-009.md`, `archive/core/CORE-EPIC-057.md` — no archived audit precedent yet (CORE-EPIC-009 closed out-of-band; CORE-EPIC-057 is in flight). The `.1` Discovery shape this skill scaffolds is most strongly modeled on CORE-057.1 itself.
- No prior tasknote touches `claude/skills/epic-discovery/` (doesn't exist yet). No prior tasknote modifies the `<AREA>-EPIC-<N>` numbering convention beyond what SPEC/epic.md describes.

### Drift check

- `claude/skills/new-project/SKILL.md` Step 3 lines 58-72 — confirmed wires 4 skills + 4 commands today. Step 7 `git add` (lines 111-115) and Step 8 readlink verification (lines 130-138) mirror. Diff: +2 symlink lines per surface, +2 paths in `git add`, +2 readlink lines, extend hand-off message.
- `docs/MIGRATION.md` §1.2 — heading "Wire `/task`, `/starter-task`, `/micro-task`, `/file-followup` via symlinks" + intro list at lines 53-57 + symlink commands at lines 61-70. Diff: heading expands to 5 commands, intro list adds `/epic-discovery` bullet, symlink commands extend by 2 lines.
- `claude/CLAUDE-snippet.md` — workflow-block paragraph (line 17) currently reads "...mid-flow follow-ups whose long description fits in ≤50 words, use `/file-followup <ID>`...". Diff: extend the existing list to include `/epic-discovery`. Symlink section (lines 29-37) and verify-list (line 43) extend symmetrically.
- `SPEC/epic.md` (47 lines) — confirmed describes the lifecycle (lines 22-35) and the .1/.N numbering convention (lines 18-20) and audit-acceptance fixed-doc-drift line (lines 37-42). Does NOT mention `/epic-discovery` or `/close-epic` (don't exist yet). Diff: minimal — one-line skill pointer; the lifecycle text needs no rewrite.
- `_project/tasknote/README.md` §"AI-referenced docs" — 4 entries confirmed (README.md / SPEC.md / docs/MIGRATION.md / claude/CLAUDE-snippet.md). Phase 4 doc-drift sweep walks all 4.
- `_project/PLAN.md` line for CORE-057.3 (line 31) — task-line grammar matches SPEC §"Task-line format" (`[opus]` tag + `| /epic-discovery skill` shortname + 55-word long description well under the 70w cap). No drift.
- No drift on any cited path or concept.

### Resolved scoping (this Phase 1, 2026-05-09)

| Question | Choice | Implication for Phase 2 |
|---|---|---|
| Args grammar | **No-args + AskUserQuestion** | Like `/release`. Skill prompts for area + shortname + priority + model + total-subtask-count N via a single AskUserQuestion at start. Slash-command stub frontmatter has no `argument-hint`. |
| Phase drive scope | **Full 4 phases inline (like `/release`)** | Skill files PLAN lines, scaffolds `.1`, drives Phase 1 (scoping + clarifying questions for sibling-children shortnames/scopes) → Phase 2 (write `.2..(N-1)` PLAN lines) → Phase 3 (markdown lint mental-pass) → Phase 4 (doc-drift sweep + close + archive). One clean exit, no seam. SKILL is ~10-step shape mirroring `/release`. |
| Audit numbering at filing | **Ask for N up front; file `.1` + `.N` placeholder at filing** | AskUserQuestion in Step 2 collects total-subtask-count N (Discovery + N-2 implementation children + audit). Step 4 files 3 PLAN.md lines: parent epic, `.1` Discovery, `.N` audit placeholder. Phase 2 fills `.2..(N-1)`. If Discovery decides N is wrong, Phase 2 bumps the audit's number during PLAN edits. Matches CORE-057.1's literal scope. |
| Scaffold pre-fill | **Tailored epic-Discovery pre-fill** | Step 5 scaffolds `.1` from `templates/tasknote-template.md` with `## ✅ Acceptance` and `## 🧩 Subtasks` parameterized to N. Acceptance criteria seeded: "Parent epic line filed in PLAN.md", "Children `.2..(N-1)` shortnames + scopes locked", "Each child line ≤50w/70w cap", "Audit `.N` line filed", "Phase 4 doc-drift sweep — typically no AI-referenced doc updates land in pure Discovery filing". Mirrors `/release`'s parameterized recipe pattern. |

### Design implications

- `/epic-discovery` is a **scaffold-and-drive** skill (like `/release`), not a **filing-only** skill (like `/starter-task`/`/file-followup`). It owns the `.1` tasknote's full lifecycle, not just its filing.
- The `.1` tasknote becomes its own normal tasknote after this skill exits; future `/task CORE-057.3` would refuse to restart it (status `completed` after closure) — the skill's exit is the natural boundary.
- The SKILL is heavier than `/file-followup` (~115 lines) and roughly similar in weight to `/release` (~240 lines). Estimated ~200-220 lines.
- Adopter wiring (3 surfaces × +2 symlinks) is the same diff shape CORE-057.5 landed; precedent makes the edits mechanical.
- SPEC/epic.md gets the absolute minimum: one-line pointer. The lifecycle contract is already complete; the SKILL is the executable interpretation.
- `/epic-discovery` and `/close-epic` (CORE-057.4) are siblings — both auto-wire into adopters per CORE-057.1's locked policy. Each ships +2 symlinks per surface; CORE-057.4 will repeat this Phase 2's adopter-wiring diff shape.
- After `/epic-discovery` lands, an adopter project on next flowtron version bump will get `/epic-discovery` automatically. New adopter projects bootstrapping via `/new-project` will get all 5 auto-wired commands by default (`/task`, `/starter-task`, `/micro-task`, `/file-followup`, `/epic-discovery`). After `/close-epic` lands: 6 auto-wired commands.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — closest scaffold-and-drive precedent: `claude/skills/release/SKILL.md` (CORE-057.2; no-args, 9-step shape, drives full 4-phase tasknote inline). Closest cohort sibling for adopter-wiring diff: `claude/skills/file-followup/SKILL.md` (CORE-057.5; +2-symlinks-per-surface across the 3 wiring surfaces). Slash-command stub mirrors `claude/commands/release.md` (no `argument-hint` since strict no-args). Cite-don't-restate per CORE-051. No new shape introduced; `/epic-discovery` extends the established skill scaffold with epic-filing-specific Step 3 (next-`<AREA>-EPIC-<N>` resolution) and Step 4 (3-line PLAN filing).
- [x] Implemented the minimal solution — 2 new files + 4 edits across 6 distinct surfaces (1 SKILL + 1 stub + 4 wiring surfaces):
  - **NEW** `claude/skills/epic-discovery/SKILL.md` (~205 lines; 11-step shape — paths · pre-flight · inputs (single AskUserQuestion: area + shortname + priority + model + N) · resolve next epic ID · file 3 PLAN lines · scaffold `.1` with tailored pre-fill · drive Phase 1 inline · drive Phase 2 inline · drive Phase 3 inline · drive Phase 4 inline · post-closure)
  - **NEW** `claude/commands/epic-discovery.md` (frontmatter + invoke paragraph + sibling cross-refs to `/task`, `/starter-task`, `/micro-task`, `/file-followup`, `/new-project`, `/close-epic`)
  - **EDIT** `claude/skills/new-project/SKILL.md` — Step 3 heading expanded to 5 commands; symlink block extended by 2 lines (column-aligned to wider trailing path); Step 7 `git add` extended (+2 paths); Step 8 readlink verification list extended (8 → 10 symlinks; column-aligned); Step 8 hand-off slash-command-menu list extended
  - **EDIT** `docs/MIGRATION.md` §1.2 — heading expanded to 5 commands; intro description list adds `/epic-discovery` bullet; symlink commands block extended by 2 lines (column-aligned)
  - **EDIT** `claude/CLAUDE-snippet.md` — workflow-block paragraph extended to mention `/epic-discovery` (with SPEC/epic.md cross-ref); "One-time symlink wiring" section extended by 2 lines; verify-list cites 5 commands
  - **EDIT** `SPEC/epic.md` — added one-paragraph "**Skill.**" pointer at end (4 lines: cites `claude/skills/epic-discovery/` as the executable interpretation of lifecycle steps 1-2; auto-wiring statement). Lifecycle contract itself unchanged.
- [x] Updated/added tests for non-trivial behavior — N/A (skill files / SPEC prose / wiring docs; no executable code surface).

**Implementation Notes:**

- **Strict no-args contract.** SKILL Step 2 collects all inputs in a single AskUserQuestion (5 questions: area, shortname, priority, model, N). The user explicitly chose this in the Phase 1 clarifying questions over the area-as-args alternative. The slash-command stub frontmatter has no `argument-hint` (mirrors `commands/release.md`).
- **Full 4-phase drive inline.** SKILL Steps 6-9 walk Phase 1 → 4 of the `.1` Discovery tasknote in one motion (vs. exit-after-Phase-1). Rationale per the Phase 1 clarifying-question: `/task` won't restart an in-progress tasknote, so stopping mid-flow creates an awkward seam. SKILL ends at clean Phase 4 closure with a recap; Step 10 covers the canonical post-closure protocol (commit + suggest next move + copy-paste line).
- **`.N` audit number known at filing.** SKILL Step 2 collects N up front; Step 4 files `.1` Discovery + `.N` audit at filing time (matches CORE-057.1's literal scope). Phase 2 fills `.2..(N-1)` between them. If Discovery decides N was wrong, Phase 2 bumps the audit's number — captured in the SKILL's `## Notes` ("N can shift during Discovery").
- **Tailored Acceptance/Subtasks pre-fill.** SKILL Step 5 scaffolds `.1` with parameterized Acceptance (5 criteria: design surface inventory · resolved scoping table · children .2..(N-1) filed under cap · audit line confirmed · doc-drift sweep at closure) and Subtasks (8 ordered steps). Mirrors `/release`'s parameterized recipe pattern. Eliminates per-invocation boilerplate re-derivation.
- **Audit subtask is optional.** Step 2 offers a "skip audit" option per `SPEC/epic.md` line 11 ("simpler implementations don't need it — apply judgment"). When skipped, Step 4 files only parent + `.1` and N excludes the audit slot. SKILL `## Notes` surfaces the rationale.
- **Parent description is a placeholder.** SKILL Step 4 files the parent epic line with a one-paragraph placeholder description; the Discovery's Final Summary refines it at closure time. Surfaced in `## Notes`. Visualizer parses both states identically.
- **MIGRATION.md scope follows CORE-057.5 precedent.** Updated only §1.2 (heading + intro list + symlink commands). §1.6 (commit example) and §1.7 (verify list) left untouched at their CORE-057.5-era state — their drift was scoped to CORE-057.6 audit by precedent. My addition would otherwise have made the §1.6 list inconsistent (4 items missing `/file-followup` and now adding `/epic-discovery`). CORE-057.6 audit will sweep §1.6/§1.7 currency across all 5 shipped adopter commands.
- **SPEC/epic.md change is minimal.** Added a single 4-line paragraph at the end ("**Skill.** ..."). The lifecycle text (lines 22-35) is unchanged. CORE-057.4 will extend the same paragraph to cite `/close-epic` when it lands; mention is intentionally NOT forward-looking (cite skills that exist at HEAD only).
- **Sibling-cohort independence.** No edit in this tasknote depends on or pre-conflicts with CORE-057.4 (`/close-epic`) or CORE-057.6 (audit). The 4 wiring surfaces (new-project Step 3 + Step 7 + Step 8, MIGRATION §1.2, CLAUDE-snippet, SPEC/epic.md) accept additive edits. CORE-057.4 will add 2 more symlinks per adopter-wiring surface (mirror this Phase 2's diff shape) and extend the SPEC/epic.md skill paragraph.
- **No flowtron-self local symlink.** Followed CORE-057.5's precedent — `/epic-discovery` is adopter-facing only; not symlinked into flowtron's own `.claude/` folder. If the user later wants `/epic-discovery` invokable inside flowtron's own checkout (for filing flowtron's own epics), that's a follow-up filing.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (skill files + slash-command stub + SPEC prose + adopter-wiring docs; no executable code surface).
- [x] Ran lint/type-check on changed code — N/A (no code). Markdown mental-pass on the 6 edited surfaces:
  - `claude/skills/epic-discovery/SKILL.md` — frontmatter follows canonical `name:` / `description:` shape (matches `release/SKILL.md`); 11 numbered steps with consistent heading style; fenced code blocks balanced (4 fences across Steps 4 / 5 / 5 / 5); cite-don't-restate style holds (cites SPEC §"📝 Phase 1: Discovery" / §"Task ID convention" / §"Tasknote frontmatter" / §"Task-line format" / §"PLAN.md filing-discipline thresholds" / §"Post-closure protocol" / `SPEC/epic.md` rather than restating).
  - `claude/commands/epic-discovery.md` — frontmatter follows canonical `description:` shape; no `argument-hint` (strict no-args, mirrors `commands/release.md`); sibling cross-refs to all 5 sibling skills present.
  - `claude/skills/new-project/SKILL.md` Step 3 / 7 / 8 — symlink column alignment intact (both blocks extended to the wider trailing path width; spacing consistent across the 5-command set in each list); 5-command heading parses as a complete English list; readlink verification list count updated to 10.
  - `docs/MIGRATION.md` §1.2 — mirrors new-project Step 3 verbatim (heading + symlink commands column alignment); intro description list reads naturally with the new `/epic-discovery` bullet anchored on lifecycle/SPEC pointer.
  - `claude/CLAUDE-snippet.md` workflow paragraph reads cleanly with the SPEC.md + SPEC/epic.md cross-ref split; symlink section column alignment intact; verify-list cites 5 commands per the snippet contract.
  - `SPEC/epic.md` — added paragraph at file end; no other content touched; section-flow reads naturally (Forward-looking → Skill closes the lazy module).
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend change; PLAN.md grammar unchanged so the visualizer parses unchanged).

**Testing Notes:**

`git status --short` confirms 4 modified files (SPEC/epic.md, CLAUDE-snippet.md, new-project/SKILL.md, MIGRATION.md) + 2 new files (epic-discovery/SKILL.md, epic-discovery.md) + 1 active tasknote — exactly the 7-surface diff Phase 2 planned.

`grep -rn "epic-discovery"` across SPEC.md / SPEC/ / docs/ / claude/ returns 21 references, all consistent: SKILL itself (5 refs in its own body), command stub (cross-refs), new-project SKILL (5 refs across Step 3/7/8), MIGRATION.md (3 refs in §1.2), CLAUDE-snippet.md (3 refs in workflow paragraph + symlink section + verify-list), SPEC/epic.md (1 ref in new Skill paragraph). All outside the archive — no archive contamination.

The harness will pick up the new skill on next adopter `git submodule update` (auto-wired path) or on next `~/.claude/` cache refresh in flowtron's own checkout (not auto-wired locally per scope decision; would require manual local symlink if desired).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** —
  - `README.md`: **no change.** Per CORE-057.5 / CORE-057.2 precedent, non-entry-point skills don't get appended to the entry-point pair (line 87 cites `/task` + `/new-project` only). `/epic-discovery` is auto-wired into adopters but is not the canonical entry point — `/task` remains canonical for starting work. Stays out.
  - `SPEC.md`: **no change.** SPEC.md has no canonical "Shipped skills" section; the executable-interpretation pointer for `/epic-discovery` lives in the lazy module `SPEC/epic.md` (which loads when an epic ID is detected at `/task` time). The §"Epic lifecycle" stub at SPEC.md line 75 already cites `SPEC/epic.md` as canonical contract; that pointer transitively reaches the new SKILL paragraph. No SPEC.md change needed.
  - `docs/MIGRATION.md`: **updated** — §1.2 heading expanded to 5 commands; intro description list adds the `/epic-discovery` bullet (with `SPEC/epic.md` cross-ref); symlink commands block extended by 2 lines (column-aligned).
  - `claude/CLAUDE-snippet.md`: **updated** — workflow-block paragraph extended to mention `/epic-discovery` (with SPEC.md + SPEC/epic.md cross-ref split); "One-time symlink wiring" section extended by 2 lines; verify-list cites 5 commands.
- [x] Closed — PLAN.md line 31 flipped to stub form `[x] **CORE-057.3** [opus] | /epic-discovery skill — Completed 2026-05-09.` (kept nested under `CORE-EPIC-057` in `## Medium` per epic-cohort grouping; parent + cohort move to `## Completed` only when all children close — mirrors CORE-057.1 / .2 / .5 closure precedent) and tasknote moved to `_project/tasknote/archive/core/`
- [ ] Recapped changes with the user and got confirmation

**Final Summary:**

Shipped `/epic-discovery` — the cohort's heaviest skill at ~205 lines, mirroring `/release`'s scaffold-and-drive shape but specialized for filing new epics and driving their `.1` Discovery tasknote in one motion. Two new files (`claude/skills/epic-discovery/SKILL.md` + `claude/commands/epic-discovery.md`) + four edited surfaces (new-project SKILL Step 3/7/8; MIGRATION §1.2; CLAUDE-snippet workflow + symlink + verify; SPEC/epic.md). Four design decisions locked via Phase 1 AskUserQuestion: (1) **no-args + AskUserQuestion** (5 questions in Step 2: area + shortname + priority + model + total-subtask-count N); (2) **drive full 4 phases inline** (Steps 6-9) — no seam with `/task`; (3) **ask for N up front** — files `.1` + `.N` placeholder at filing; Phase 2 fills `.2..(N-1)` between them, bumping audit's number if Discovery shifts N; (4) **tailored epic-Discovery scaffold pre-fill** — Step 5 parameterizes `## ✅ Acceptance` (5 criteria) + `## 🧩 Subtasks` (8 steps) to N. SKILL `## Notes` surfaces the lessons: optional audit per `SPEC/epic.md` line 11 ("simpler implementations don't need it"); parent description is a placeholder refined at Discovery closure; N can shift during Discovery (audit number bumped in Phase 2 if needed). Adopter wiring (3 surfaces × +2 symlinks) follows CORE-057.5's precedent verbatim — `/file-followup` shipped this exact diff shape today; `/epic-discovery` repeats it. Symlinks add to a 10-entry set under `.claude/` for new adopters bootstrapping via `/new-project`. SPEC/epic.md gains one 4-line "**Skill.**" paragraph; CORE-057.4 will extend the same paragraph to cite `/close-epic`. The 4-skill cohort progresses: CORE-057.1 (Discovery), CORE-057.2 (`/release`), CORE-057.5 (`/file-followup`) closed today; CORE-057.3 (this) closes today; CORE-057.4 (`/close-epic`) and CORE-057.6 (audit) remain. PLAN.md line for CORE-057.3 stays nested under CORE-EPIC-057 in `## Medium`; parent + cohort move to `## Completed` only when all children close.

**Archived:** 2026-05-09
