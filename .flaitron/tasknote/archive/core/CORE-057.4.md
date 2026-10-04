---
title: /close-epic skill
status: completed
tags: []
created: 2026-05-09
related-tasks: [CORE-EPIC-057, CORE-057.1, CORE-057.3, CORE-054]
---

# CORE-057.4 | /close-epic skill

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-057]] [[CORE-057.1]] [[CORE-057.3]] [[CORE-054]]

## 🎯 Goal

Ship `/close-epic` per `SPEC/epic.md`: scaffold + drive an audit `.N` tasknote with the fixed doc-drift sweep acceptance line across `_project/tasknote/README.md` §"AI-referenced docs"; at audit closure surface parent `<AREA>-EPIC-<N>` state and ask the user whether to flip the parent line to `Completed`. Auto-wired into adopters via `/new-project` Step 3 + `docs/MIGRATION.md` §1.2 + `claude/CLAUDE-snippet.md`.

## ✅ Acceptance

- [ ] `claude/skills/close-epic/SKILL.md` exists with the locked design: takes `<AUDIT-SUBTASK-ID>` arg, validates the ID is the highest `.N` child of its parent epic (hard-bail if not), warns-and-proceeds-on-user-confirm if any sibling implementation children are still open, scaffolds the audit `.N` tasknote with fixed doc-drift sweep acceptance line + parameterized Acceptance/Subtasks, drives the full 4-phase tasknote inline, and at Phase 4 closure surfaces parent `<AREA>-EPIC-<N>` state and asks the user whether to flip the parent line to `Completed` (default Yes) — atomic flip + move-cohort-to-`## Completed`
- [ ] `claude/commands/close-epic.md` slash-command stub exists (frontmatter `description` + `argument-hint: <AUDIT-SUBTASK-ID>`, one-paragraph "invoke the skill" body, sibling cross-refs to `/task`, `/starter-task`, `/micro-task`, `/file-followup`, `/epic-discovery`, `/new-project`)
- [ ] `claude/skills/new-project/SKILL.md` Step 3 (symlinks) + Step 7 staging command + Step 8 readlink verification list + Step 8 hand-off message updated to wire `/close-epic` (+2 symlinks: `commands/close-epic.md` + `skills/close-epic`; total 12 after this child)
- [ ] `docs/MIGRATION.md` §1.2 mirrors the new-project Step 3 update (heading + intro list + symlink commands extended)
- [ ] `claude/CLAUDE-snippet.md` workflow-block paragraph extended to mention `/close-epic`; "One-time symlink wiring" section + verify-list updated
- [ ] `SPEC/epic.md` "**Skill.**" paragraph (added by CORE-057.3) extended to also cite `/close-epic` for steps 4-5 of the lifecycle (Run Audit + Audit follow-ups); lifecycle text itself unchanged
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" (README.md / SPEC.md / docs/MIGRATION.md / claude/CLAUDE-snippet.md) — per-entry verdict
- [ ] Single `feat: CORE-057.4 — ship /close-epic skill` commit lands
- [ ] PLAN.md line for CORE-057.4 flipped to stub form `Completed YYYY-MM-DD.` (kept nested under `CORE-EPIC-057` in `## Medium` per epic-cohort grouping; cohort moves to `## Completed` only when all children close — mirrors CORE-057.1 / .2 / .3 / .5 closure precedent)
- [ ] Tasknote moved to `_project/tasknote/archive/core/CORE-057.4.md`

## 🧩 Subtasks

- [ ] Create `claude/skills/close-epic/` directory
- [ ] Write `claude/skills/close-epic/SKILL.md` — Step 0 (path resolution: adopter vs flowtron-self per `/task` precedent); Step 1 (parse `<AUDIT-SUBTASK-ID>` arg, validate `<AREA>-<N>.<M>` shape); Step 2 (read PLAN.md, locate parent epic + all children, verify chosen ID = highest `.N` under that parent — hard-bail otherwise; check sibling un-checked `.M` children — warn + AskUserQuestion confirm if any open, default No bails); Step 3 (scaffold audit tasknote from `templates/tasknote-template.md` with parameterized Goal + fixed-doc-drift Acceptance + cohort-coherence Subtasks); Step 4 (drive Phase 1 inline — relevance / read cohort children's archived tasknotes / drift check / clarifying questions); Step 5 (drive Phase 2 inline — audit findings recorded as Implementation Notes; misses cited as candidates for `/file-followup`); Step 6 (drive Phase 3 inline — markdown lint mental-pass on any audit-fix edits); Step 7 (drive Phase 4 inline — fixed doc-drift sweep, flip audit's PLAN line to stub, archive audit tasknote); Step 8 (parent-epic flip prompt: scan PLAN for parent + all children; if all `[x]`, surface "All children closed → flip `<AREA>-EPIC-<N>` to Completed and move cohort to `## Completed`?" default Yes; on confirm, atomic flip parent line to stub form + move parent + all children to top of `## Completed`); Step 9 (post-closure protocol per SPEC §"Post-closure protocol" — commit + suggest next move + copy-paste line)
- [ ] Write `claude/commands/close-epic.md` — frontmatter (`description` + `argument-hint: <AUDIT-SUBTASK-ID>`) + invoke-the-skill paragraph + sibling cross-refs to `/task`, `/starter-task`, `/micro-task`, `/file-followup`, `/epic-discovery`, `/new-project`
- [ ] Edit `claude/skills/new-project/SKILL.md` — Step 3 (add 2 symlinks; column-align with existing 10-symlink block); Step 7 staging command (extend `git add` paths by 2); Step 8 readlink verification (10 → 12 symlinks; column-align); Step 8 hand-off slash-command-menu list (extend to 6 commands)
- [ ] Edit `docs/MIGRATION.md` §1.2 — heading expands to 6 commands; intro description list adds `/close-epic` bullet; symlink commands block extended by 2 lines (column-aligned, mirror new-project Step 3 verbatim)
- [ ] Edit `claude/CLAUDE-snippet.md` — workflow-block paragraph extended to mention `/close-epic` (paired with `/epic-discovery` since they're bracket twins; cite `SPEC/epic.md` once); "One-time symlink wiring" section (add 2 symlink lines + extend verify-list to 6 commands)
- [ ] Edit `SPEC/epic.md` — extend the existing "**Skill.**" paragraph (lines 48-51) to also cite `/close-epic` for steps 4-5 of the lifecycle (Run Audit + Audit follow-ups). Lifecycle text itself unchanged.
- [ ] Targeted self-review (Phase 3): markdown mental-pass on each edited file; verify SKILL frontmatter shape, symlink column alignment matches new entries to existing 10-row block, fenced-block balance, sibling-skill consistency. No executable code surface.
- [ ] Phase 4 closure: doc-drift sweep over the 4 AI-referenced docs (verdict each); flip CORE-057.4 PLAN line to stub form; archive tasknote to `_project/tasknote/archive/core/CORE-057.4.md`

## 🔗 Related

- [[CORE-EPIC-057]] — parent epic (4-skill expansion cohort)
- [[CORE-057.1]] — Discovery that locked this skill's scope (audit-with-fixed-doc-drift-line + prompt-to-flip-parent; auto-wire into adopters)
- [[CORE-057.3]] — bracket-twin sibling (`/epic-discovery`) that shipped today; closest scaffold-and-drive shape precedent + adopter-wiring diff precedent
- [[CORE-054]] — predecessor that surveyed candidates and filed this cohort

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Parent epic CORE-EPIC-057 + Discovery (CORE-057.1) both closed today (2026-05-09). CORE-057.1's locked scope ("Skill scaffolds + drives audit `.N` tasknote with fixed doc-drift sweep acceptance line; at audit closure surfaces parent epic state and asks user whether to flip parent to `Completed`. Auto-wired into adopters via `/new-project` and `docs/MIGRATION.md` §1.2.") is the exact contract this child implements. Cohort siblings .1 / .2 / .3 / .5 closed today; .4 (this) and .6 (audit) remain. CORE-057.3 (the bracket-twin `/epic-discovery`) closed today and established the adopter-wiring + scaffold-and-drive shape this child mirrors almost exactly. Sibling-cohort independence holds: each skill ships its own `claude/skills/<name>/` + `claude/commands/<name>.md`; the wiring surfaces (new-project Step 3/7/8, MIGRATION §1.2, CLAUDE-snippet, SPEC/epic.md "Skill" paragraph) accept additive edits. CORE-057.6 (the LAST cohort child) does not depend on `/close-epic` existing first, but having `/close-epic` available means CORE-057.6 itself becomes the first epic-audit subtask invokable via this skill — pleasing dogfood.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes; no drift on cited paths/concepts
- [x] Asked clarifying questions (4-question AskUserQuestion resolved args grammar / drive scope / open-children gate / follow-up handling — answers locked under "Resolved scoping" below)
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source-file inventory (live at 2026-05-09)

- **Bracket-twin precedent:** `claude/skills/epic-discovery/SKILL.md` (CORE-057.3, ~205 lines, 10 numbered steps, no-args + drives full 4-phase tasknote inline). The closest analog by far. `/close-epic` mirrors this shape but specialized for the audit `.N` end of the lifecycle: takes `<AUDIT-SUBTASK-ID>` arg (per Phase 1 question 1) instead of no-args; drives Phase 4 closure with parent-flip prompt instead of just `.1` Discovery closure.
- **Other scaffold-and-drive precedent:** `claude/skills/release/SKILL.md` (CORE-057.2, ~240 lines, no-args, full 4-phase inline including post-closure). Established the parameterized Acceptance/Subtasks pre-fill pattern that `/epic-discovery` carried forward and `/close-epic` repeats.
- **Lighter sibling for filing-discipline reference:** `claude/skills/file-followup/SKILL.md` (CORE-057.5, ~115 lines). The follow-up-filing companion that `/close-epic`'s `## Notes` section will cite for audit-surfaced miss filing (per Phase 1 question 4).
- **Slash-command stub precedents:**
  - With `argument-hint`: `claude/commands/{task,starter-task,micro-task,file-followup}.md` — these all take `<TASK-ID>` arg.
  - Without `argument-hint`: `claude/commands/{release,new-project,epic-discovery}.md` — these are no-args.
  - `/close-epic` has `argument-hint: <AUDIT-SUBTASK-ID>` (per Phase 1 question 1) → mirrors the `/task` family stub shape.
- **Existing skills (7 SKILLs + 7 commands at HEAD after CORE-057.3 landed):** `task`, `starter-task`, `micro-task`, `new-project`, `release`, `file-followup`, `epic-discovery`. After this child: 8 SKILLs / 8 commands.
- **Adopter-wiring surfaces (currently 5-symlink-pair set after CORE-057.3 landed = 10 symlinks):**
  - `claude/skills/new-project/SKILL.md` Step 3 (lines 60-72) wires 5 commands + 5 skills = 10 symlinks. Step 7 `git add` (lines 113-117) lists those 10 paths. Step 8 readlink verification (lines 132-142) mirrors. Step 8 hand-off message at line 153 cites 5 commands. Diff this Phase 2 will land: +1 symlink-pair per surface (12 symlinks after).
  - `docs/MIGRATION.md` §1.2 (lines 50-74) mirrors new-project Step 3 — heading + description list + symlink commands. Diff: heading expands to 6 commands; intro list adds `/close-epic` bullet; symlink commands extend by 2 lines.
  - `claude/CLAUDE-snippet.md` workflow-block paragraph (line 17) currently mentions all 5 auto-wired commands. Symlink section (lines 30-40) lists 10 symlinks. Verify-list (line 45) cites 5 commands. Diff: extend paragraph + 2 symlink lines + extend verify-list to 6 commands.
- **SPEC/epic.md (52 lines after CORE-057.3 added the "**Skill.**" paragraph at lines 48-51):** describes the lifecycle (lines 22-35) including steps 4-5 (Run Audit + Audit follow-ups). The "**Skill.**" paragraph currently cites only `/epic-discovery` for steps 1-2. `/close-epic` extends this paragraph to also cite steps 4-5; lifecycle text itself unchanged.
- **SPEC.md §"Epic lifecycle" stub at line 74-76:** 1-line pointer at SPEC/epic.md. SPEC.md itself does not need editing — canonical contract lives in SPEC/epic.md.
- **`templates/tasknote-template.md`:** standard 4-phase template that `/close-epic` parameterizes for the audit `.N` tasknote with tailored Goal + fixed-doc-drift Acceptance + Subtasks. No new template needed.

### Archive skim (precedents)

- `archive/core/CORE-057.1.md` — Discovery predecessor that locked this skill's exact scope (audit `.N` with fixed doc-drift sweep + prompt-to-flip-parent + auto-wire into adopters).
- `archive/core/CORE-057.3.md` — Bracket-twin sibling (`/epic-discovery`) shipped today. Closest scaffold-and-drive shape precedent + closest adopter-wiring diff precedent. Established the pattern of extending the SPEC/epic.md "**Skill.**" paragraph with skill citations rather than restating the lifecycle.
- `archive/core/CORE-057.5.md` — `/file-followup` ship; established the +2-symlinks-per-surface diff shape across the 3 wiring surfaces. `/epic-discovery` repeated it; `/close-epic` repeats it again.
- `archive/core/CORE-057.2.md` — `/release` ship; closest no-args + drive-full-4-phases precedent. Confirmed cohort cadence: `feat: CORE-057.<N> — ship /<name> skill` commit, PLAN line stays nested under `CORE-EPIC-057` in `## Medium` post-closure.
- `archive/core/CORE-051.md` — `/starter-task` SKILL cite-don't-restate; current SKILL style precedent. `/close-epic` SKILL applies the same style: cite SPEC/epic.md and SPEC §"Post-closure protocol" rather than restating.
- `archive/core/CORE-054.md` — cohort-locking predecessor; `[opus]` model + auto-wiring policy.
- No prior tasknote touches `claude/skills/close-epic/` (doesn't exist yet). The two existing forward-looking refs to `/close-epic` in HEAD (`claude/commands/epic-discovery.md:9` + `claude/skills/epic-discovery/SKILL.md:198`) are intentional sibling cross-refs CORE-057.3 wrote knowing CORE-057.4 was next; they resolve to live references the moment this child lands.
- No prior tasknote modifies the parent-epic-flip motion. The flip + move-to-`## Completed` pattern is canonical in the cohort closure precedent (children flip individually while parent moves only when all children close), but no prior skill encodes the auto-flip prompt — `/close-epic` is the first.

### Drift check

- `claude/skills/new-project/SKILL.md` — confirmed wires 5 commands + 5 skills (lines 60-72) after CORE-057.3 landed; staging block lines 113-117; readlink lines 132-142; hand-off line 153 cites 5 commands. Diff: +2 symlinks (lines 60-72), +2 paths (lines 113-117), +2 readlinks (lines 132-142), +1 command in hand-off list (line 153). Column alignment: longest path in `commands/` is `epic-discovery.md` (16 chars after `commands/`); `close-epic.md` (13 chars) needs 3 extra padding spaces to align. Longest path in `skills/` is `epic-discovery` (14 chars); `close-epic` (10 chars) needs 4 extra padding spaces. Will resolve precisely at Phase 2 edit time using actual byte counts.
- `docs/MIGRATION.md` §1.2 — heading at line 50 currently reads "Wire `/task`, `/starter-task`, `/micro-task`, `/file-followup`, `/epic-discovery` via symlinks". Diff: heading expands to 6 commands; intro description list at lines 52-58 adds a `/close-epic` bullet; symlink commands at lines 62-74 extend by 2 lines.
- `claude/CLAUDE-snippet.md` — workflow-block paragraph at line 17 currently reads "...for multi-child code-sweep or feature epics, use `/epic-discovery` (...)". Diff: extend the same paragraph to mention `/close-epic` (paired with `/epic-discovery` since they're bracket twins). Symlink section at lines 30-40 adds 2 lines; verify-list at line 45 extends to 6 commands.
- `SPEC/epic.md` — confirmed 52 lines; the existing "**Skill.**" paragraph at lines 48-51 cites only `/epic-discovery` for steps 1-2 of the lifecycle. Diff: extend the same paragraph to also cite `/close-epic` for steps 4-5 (Run Audit + Audit follow-ups). Lifecycle text at lines 22-35 unchanged.
- `_project/tasknote/README.md` §"AI-referenced docs" — 4 entries confirmed (README.md / SPEC.md / docs/MIGRATION.md / claude/CLAUDE-snippet.md). Phase 4 doc-drift sweep walks all 4.
- `_project/PLAN.md` line 32 for CORE-057.4 — task-line grammar matches SPEC §"Task-line format" (`[opus]` tag + `| /close-epic skill` shortname + ~46-word long description well under the 70w cap). No drift.
- `SPEC.md` §"Epic lifecycle" stub at line 74-76 is a 1-line pointer at SPEC/epic.md. SPEC.md itself does not need editing.
- Two existing forward-looking refs to `/close-epic` in HEAD (`claude/commands/epic-discovery.md:9` + `claude/skills/epic-discovery/SKILL.md:198`) — verified, intentional, become live references the moment this child lands. No retroactive edit needed.
- No drift on any cited path or concept.

### Resolved scoping (this Phase 1, 2026-05-09)

| Question | Choice | Implication for Phase 2 |
|---|---|---|
| Args grammar | **Audit subtask ID** (e.g., `/close-epic CORE-057.6`) | Mirrors `/task <ID>` slash-command convention. Slash-command stub frontmatter has `argument-hint: <AUDIT-SUBTASK-ID>`. Skill parses arg, validates `<AREA>-<N>.<M>` shape, walks PLAN.md to verify the ID is the highest `.N` child of its parent epic. If not the highest, hard-bail with a surface explaining why (audit must be the last child). |
| Drive scope | **Full 4-phase inline (like `/epic-discovery` / `/release`)** | Skill scaffolds + drives Phases 1-4 inline through closure. One clean exit at Phase 4, no seam mid-audit (rationale: `/task` won't restart an in-progress tasknote). SKILL is ~10-step shape mirroring `/epic-discovery`. |
| Open-children gate | **Warn and proceed if user confirms** (not hard bail) | Skill walks PLAN.md for sibling un-checked `.M` children of the parent epic. If any are open, surface the list to the user and ask "Sibling children X, Y still open. Audit early? (y/N)" — default No bails. Useful when a child got stuck and the user wants to audit known-good portions of the epic. |
| Audit follow-ups | **Note-only — defer to `/file-followup`** | `/close-epic` surfaces the audit's findings in Implementation Notes; user invokes `/file-followup <NEW-ID>` separately for each miss. SKILL `## Notes` cites `/file-followup` as the follow-up filer. Keeps `/close-epic` focused on the audit lifecycle; preserves `/file-followup`'s filing-discipline gate (50w/70w cap) at its natural boundary. |

### Design implications

- **`/close-epic` is the bracket twin of `/epic-discovery`.** `/epic-discovery` opens an epic (files parent + `.1` + `.N`, drives `.1` Discovery); `/close-epic` closes an epic (drives audit `.N`, prompts parent flip). Together they bracket the SPEC/epic.md lifecycle steps 1-2 and 4-5; user-driven `/task` runs the implementation children (step 3).
- **Auto-wired into adopters per CORE-057.1 locked policy.** Each ships +2 symlinks per surface across 3 wiring surfaces (new-project Step 3, MIGRATION §1.2, CLAUDE-snippet) + 1 paragraph in SPEC/epic.md. Diff shape identical to CORE-057.3.
- **Args grammar is the keyed difference from `/epic-discovery`.** `/epic-discovery` is no-args (no existing PLAN entry to key on at filing time). `/close-epic` takes the audit subtask ID (the audit IS already filed in PLAN by `/epic-discovery` at parent-filing time). The slash-command stub mirrors the `/task` family.
- **Parent-epic flip is the post-Phase-4 hook, not a Phase 4 step.** Per cohort precedent, Phase 4's PLAN-flip closes only the audit subtask line. The parent-epic flip is a separate atomic motion (skill Step 8) — flip parent line + move parent + all children to top of `## Completed`, conditional on all-children-checked. User confirms (default Yes); if user declines, the parent stays in its current section as `[ ]` (some siblings might still be deliberately deferred).
- **Hard-bail vs warn-and-proceed gate cost.** User chose warn-and-proceed for flexibility. Hard bail is simpler to implement; warn-and-proceed adds an AskUserQuestion in skill Step 2. Cost is one extra prompt; benefit is the user can audit early when needed.
- **Note-only follow-up handling preserves `/file-followup`'s contract.** Audit findings get logged in audit tasknote's Implementation Notes; user invokes `/file-followup <NEW-ID>` per miss with full filing-discipline gate intact. Avoids skill-overlap risk.
- **SPEC/epic.md "**Skill.**" paragraph extends, doesn't fork.** CORE-057.3 added a 4-line "**Skill.**" paragraph citing `/epic-discovery` for steps 1-2. CORE-057.4 extends the same paragraph to also cite `/close-epic` for steps 4-5. Preserves the cite-don't-restate style; keeps SPEC/epic.md compact.
- **CORE-057.6 (audit) becomes the first epic-audit invokable via `/close-epic`.** Pleasing dogfood: the cohort's audit subtask will be the first real test of the skill it ships. CORE-057.6's filing-discipline note in PLAN.md ("Acceptance includes fixed doc-drift sweep line") matches what `/close-epic`'s parameterized scaffold will pre-fill.
- **After this child lands:** 8 SKILLs / 8 commands at HEAD; 12 symlinks per adopter (6 commands + 6 skills); cohort one child away from completion (only CORE-057.6 audit remains).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — closest scaffold-and-drive precedent: `claude/skills/epic-discovery/SKILL.md` (CORE-057.3, ~205 lines, 10-step shape, drives full 4-phase tasknote inline). Bracket-twin shape mirrored exactly with 3 keyed differences specific to the audit side: (1) takes `<AUDIT-SUBTASK-ID>` arg vs no-args; (2) Step 2 validates audit position (highest `.N`) + checks sibling state vs `/epic-discovery`'s Step 4 PLAN-line filing; (3) Step 8 parent-flip prompt is post-Phase-4, vs `/epic-discovery`'s Step 9 closing only the `.1` subtask. Slash-command stub mirrors `claude/commands/file-followup.md` shape (with `argument-hint`). Adopter-wiring diff mirrors CORE-057.3's verbatim (+1 symlink-pair per surface). Cite-don't-restate per CORE-051. No new shape introduced.
- [x] Implemented the minimal solution — 2 new files + 4 edits across 6 distinct surfaces (1 SKILL + 1 command stub + 4 wiring surfaces):
  - **NEW** `claude/skills/close-epic/SKILL.md` (~210 lines; 10-step shape — paths · pre-flight (parse arg, validate `<AREA>-<NUMBER>.<SUB>` shape) · validate audit position + check sibling state · scaffold audit tasknote with parameterized fixed-doc-drift Acceptance + cohort-coherence Subtasks · drive Phase 1 inline · drive Phase 2 inline · drive Phase 3 inline · drive Phase 4 inline (audit subtask close) · parent-epic flip prompt · post-closure protocol)
  - **NEW** `claude/commands/close-epic.md` (frontmatter with `argument-hint: <AUDIT-SUBTASK-ID>` + invoke paragraph + sibling cross-refs to all 5 sibling skills + `/new-project`)
  - **EDIT** `claude/skills/new-project/SKILL.md` — Step 3 heading expanded to 6 commands; commands block extended by 1 line (close-epic.md, 6-space alignment matching micro-task.md); skills block extended by 1 line (close-epic, 6-space alignment matching micro-task); Step 7 `git add` extended (+1 path per list); Step 8 readlink verification list extended (10 → 12 symlinks; commands close-epic.md = 6-space alignment, skills close-epic = 11-space alignment matching micro-task); Step 8 hand-off slash-command-menu list extended (6 commands)
  - **EDIT** `docs/MIGRATION.md` §1.2 — heading expanded to 6 commands; description list extended with `/close-epic <AUDIT-SUBTASK-ID>` bullet (cites `SPEC/epic.md`); "five slash commands" → "six"; "all five" → "all six"; symlink commands block extended by 2 lines (column-aligned identically to new-project Step 3)
  - **EDIT** `claude/CLAUDE-snippet.md` — workflow-block paragraph extended in the same `/epic-discovery` sentence to mention `/close-epic <AUDIT-SUBTASK-ID>` paired with `/epic-discovery` as bracket twins; "One-time symlink wiring" section extended by 2 lines; verify-list cites 6 commands
  - **EDIT** `SPEC/epic.md` — extended the existing "**Skill.**" paragraph (lines 48-51, added by CORE-057.3) to "**Skills.**" (plural) and added one inline clause citing `claude/skills/close-epic/` for steps 4-5 of the lifecycle. Lifecycle text at lines 22-35 unchanged.
- [x] Updated/added tests for non-trivial behavior — N/A (skill files / SPEC prose / wiring docs; no executable code surface).

**Implementation Notes:**

- **Strict args-required contract.** SKILL Step 1 parses `args` as `<AREA>-<NUMBER>.<SUB>`; missing `.<SUB>` (standalone task ID) hard-bails with a pointer at `/task <ID>`. Mirrors `/task` and `/file-followup` arg-required contract; differs from `/release` and `/epic-discovery` no-args contract.
- **Hard-bail on wrong audit ID.** SKILL Step 2 walks the parent epic's children block in PLAN.md to find the highest `.<SUB>`; if the chosen ID isn't the highest, hard-bails. Audit must be the last child by SPEC convention.
- **Warn-and-proceed on open siblings.** SKILL Step 2 surveys un-checked sibling children and uses AskUserQuestion to confirm proceeding (default No bails). Per Phase 1 question 3 — chose flexibility over strictness so the user can audit early when needed.
- **Full 4-phase drive inline.** SKILL Steps 4-7 walk Phase 1 → 4 of the audit tasknote in one motion (vs. exit-after-Phase-1). Rationale per Phase 1 clarifying question: `/task` won't restart an in-progress tasknote, so stopping mid-flow creates an awkward seam. SKILL ends at clean Phase 4 closure with a recap; Step 8 covers the parent-flip prompt; Step 9 covers the canonical post-closure protocol.
- **Fixed doc-drift Acceptance pre-fill.** SKILL Step 3's parameterized Acceptance scaffolds with the fixed doc-drift sweep line as Acceptance criterion #1, marked non-negotiable per `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line". Other criteria seeded from the cohort-coherence shape (5 additional criteria).
- **Note-only follow-up handling.** SKILL `## Notes` cites `/file-followup` as the natural follow-up filer for audit-surfaced misses; the audit's Implementation Notes log misses as `/file-followup <NEW-ID>` candidates. Per Phase 1 question 4 — keeps `/close-epic` focused on the audit lifecycle and preserves `/file-followup`'s filing-discipline gate (50w/70w cap) at its natural boundary.
- **Parent-flip is post-Phase-4, not Phase-4.** SKILL Step 8 sits between Phase 4 closure and the post-closure protocol. Per cohort precedent, Phase 4's PLAN-flip closes only the audit subtask line; the parent-flip + cohort-move-to-`## Completed` is a separate atomic motion gated by user confirm (default Yes).
- **`**Skill.**` → `**Skills.**` rename in SPEC/epic.md.** CORE-057.3 added the paragraph as singular ("**Skill.**") citing only `/epic-discovery`; CORE-057.4 makes it plural ("**Skills.**") citing both bracket twins. Natural consequence of the +1 skill citation; preserves the cite-don't-restate style.
- **Adopter wiring follows CORE-057.3's diff shape verbatim.** Updated only §1.2 of MIGRATION.md (heading + intro list + symlink commands). §1.6 (commit example) and §1.7 (verify list) left untouched at their current state — their drift was scoped to CORE-057.6 audit by precedent. CORE-057.6 audit will sweep §1.6/§1.7 currency across all 6 shipped adopter commands (now including `/close-epic`).
- **Sibling-cohort independence.** No edit in this tasknote depends on or pre-conflicts with CORE-057.6 (audit). The 4 wiring surfaces all accept additive edits. CORE-057.6 will be the FIRST epic-audit invokable via `/close-epic` — pleasing dogfood; the audit subtask scaffolded by `/close-epic` itself will run against CORE-EPIC-057.
- **No flowtron-self local symlink.** Followed CORE-057.5 / CORE-057.3 precedent — `/close-epic` is adopter-facing only; not symlinked into flowtron's own `.claude/`. CORE-EPIC-057 will be closed by walking the audit conversationally; future flowtron-self epics could pick up `/close-epic` via a manual local symlink if the user wants.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (skill files + slash-command stub + SPEC prose + adopter-wiring docs; no executable code surface).
- [x] Ran lint/type-check on changed code — N/A (no code). Markdown mental-pass on the 6 edited surfaces:
  - `claude/skills/close-epic/SKILL.md` — frontmatter follows canonical `name:` / `description:` shape (matches `epic-discovery/SKILL.md`); 10 numbered steps with consistent heading style; fenced code blocks balanced (4 fences across Steps 2 / 3 / 3 / 8); cite-don't-restate style holds (cites SPEC §"📝 Phase 1: Discovery" / §"Task ID convention" / §"Tasknote frontmatter" / §"`## Completed` archive convention" / §"Post-closure protocol" / `SPEC/epic.md` rather than restating).
  - `claude/commands/close-epic.md` — frontmatter follows canonical `description:` + `argument-hint:` shape (matches `commands/file-followup.md`); sibling cross-refs to all 5 sibling skills + `/new-project` present.
  - `claude/skills/new-project/SKILL.md` Step 3 / 7 / 8 — symlink column alignment intact (close-epic.md uses 6 spaces matching micro-task.md, close-epic uses 6 spaces matching micro-task; readlink commands close-epic.md uses 6 spaces, readlink skills close-epic uses 11 spaces matching micro-task); 6-command heading parses as a complete English list; readlink verification count updated to 12.
  - `docs/MIGRATION.md` §1.2 — mirrors new-project Step 3 verbatim (heading + symlink commands column alignment); intro description list reads naturally with the new `/close-epic` bullet anchored on the bracket-twin pairing.
  - `claude/CLAUDE-snippet.md` workflow paragraph reads cleanly with the `/epic-discovery` + `/close-epic` bracket-twin pairing inline; symlink section column alignment intact; verify-list cites 6 commands per the snippet contract.
  - `SPEC/epic.md` — extended paragraph at lines 48-52; no other content touched; the singular → plural rename ("**Skill.**" → "**Skills.**") + added clause for `/close-epic` reads naturally.
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend change; PLAN.md grammar unchanged so the visualizer parses unchanged).

**Testing Notes:**

`git status --short` confirms 4 modified files (SPEC/epic.md, CLAUDE-snippet.md, new-project/SKILL.md, MIGRATION.md) + 2 new files (close-epic/SKILL.md, close-epic.md) + 1 active tasknote — exactly the 7-surface diff Phase 2 planned.

`grep -rn "close-epic"` across SPEC.md / SPEC/ / docs/ / claude/ returns 30 references, all consistent: SKILL itself, command stub (cross-refs), new-project SKILL (Step 3 heading + 2 symlinks + Step 7 staging + Step 8 readlinks + Step 8 hand-off), MIGRATION.md (§1.2 heading + bullet + 2 symlinks), CLAUDE-snippet.md (workflow paragraph + 2 symlinks + verify-list), SPEC/epic.md (1 inline ref). All outside the archive — no archive contamination.

The harness will pick up the new skill on next adopter `git submodule update` (auto-wired path) or on next `~/.claude/` cache refresh in flowtron's own checkout (not auto-wired locally per scope decision; would require manual local symlink if desired).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** —
  - `README.md`: **no change.** Per CORE-057.5 / CORE-057.3 / CORE-057.2 precedent, non-entry-point skills don't get appended to the entry-point pair (line 87 cites `/task` + `/new-project` only). `/close-epic` is auto-wired into adopters but is not the canonical entry point. Stays out.
  - `SPEC.md`: **no change.** SPEC.md has no canonical "Shipped skills" section; the executable-interpretation pointer for `/close-epic` lives in the lazy module `SPEC/epic.md` (which loads when an epic ID is detected at `/task` time). The §"Epic lifecycle" stub at SPEC.md line 76 already cites `SPEC/epic.md` as canonical contract; that pointer transitively reaches the extended Skills paragraph.
  - `docs/MIGRATION.md`: **updated** — §1.2 heading expanded to 6 commands; intro description list adds the `/close-epic` bullet (cites `SPEC/epic.md`); "five slash commands" → "six"; "all five" → "all six"; symlink commands block extended by 2 lines (column-aligned).
  - `claude/CLAUDE-snippet.md`: **updated** — workflow-block paragraph extended in the same `/epic-discovery` sentence to mention `/close-epic` as the bracket twin; "One-time symlink wiring" section extended by 2 lines; verify-list cites 6 commands.
- [x] Closed — PLAN.md line 32 flipped to stub form `[x] **CORE-057.4** [opus] | /close-epic skill — Completed 2026-05-09.` (kept nested under `CORE-EPIC-057` in `## Medium` per epic-cohort grouping; parent + cohort move to `## Completed` only when CORE-057.6 audit closes — mirrors CORE-057.1 / .2 / .3 / .5 closure precedent) and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Shipped `/close-epic` — the bracket twin of `/epic-discovery` and the cohort's 4th and final implementation skill. ~210 lines mirroring `/epic-discovery`'s scaffold-and-drive shape but specialized for the audit `.N` end of the SPEC/epic.md lifecycle: takes `<AUDIT-SUBTASK-ID>` arg, validates the ID is the highest `.N` child of its parent epic, warns-and-proceeds-on-user-confirm if any sibling implementation children remain open, scaffolds the audit tasknote with the fixed doc-drift sweep Acceptance line per `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line" + parameterized cohort-coherence Subtasks, drives the full 4-phase audit inline through closure, then surfaces parent-epic state and asks the user whether to flip the parent line + move the cohort to `## Completed` (default Yes). Two new files (`claude/skills/close-epic/SKILL.md` + `claude/commands/close-epic.md`) + four edited surfaces (new-project SKILL Step 3/7/8; MIGRATION §1.2; CLAUDE-snippet workflow + symlink + verify; SPEC/epic.md). Four design decisions locked via Phase 1 AskUserQuestion: (1) **audit subtask ID arg** — mirrors `/task` slash-command convention; SKILL hard-bails if not the highest `.N`; (2) **drive full 4 phases inline** — no seam mid-audit; (3) **warn-and-proceed on open siblings** — default No bails; useful for early-audit flexibility; (4) **note-only follow-up handling** — defers to `/file-followup` to preserve its filing-discipline gate. SPEC/epic.md's "**Skill.**" paragraph (added by CORE-057.3) is now "**Skills.**" (plural) citing both bracket twins; lifecycle text unchanged. Adopter wiring (3 surfaces × +2 symlinks + 1 SPEC paragraph extension) follows CORE-057.3's precedent verbatim. After this child lands: 8 SKILLs / 8 commands at HEAD; 12 symlinks per adopter; cohort one child away from completion (only CORE-057.6 audit remains — and it will be the first epic-audit invokable via this freshly-shipped skill, pleasing dogfood). PLAN.md line for CORE-057.4 stays nested under CORE-EPIC-057 in `## Medium`; parent + cohort move to `## Completed` only when CORE-057.6 audit closes.

**Archived:** 2026-05-09
