---
title: /release skill
status: completed
tags: []
created: 2026-05-09
due:
related-tasks: [CORE-EPIC-057, CORE-057.1, CORE-048]
---

# CORE-057.2 | /release skill

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-057]] [[CORE-057.1]] [[CORE-048]]

## 🎯 Goal

Ship `/release` as a flowtron-self-only skill that scaffolds and drives a release tasknote per the CORE-048 recipe (SPEC.md version bump, SPEC/versioning.md example shifts, MIGRATION.md pin bump, doc-drift sweep, single `feat:` commit, annotated tag, push).

## ✅ Acceptance

- [ ] `claude/skills/release/SKILL.md` exists with the locked design: strict no-args (PLAN-scan for the next pending `release v*` line; bail on 0 or >1 matches), auto-propose version-bump from `git log <last-tag>..HEAD` (user confirms/overrides), auto-draft annotated-tag message per CORE-048 structure (user reviews/edits), drives the 4-phase release tasknote inline through Phase 4 closure
- [ ] `claude/commands/release.md` slash-command stub exists (frontmatter `description`, no `argument-hint`, one-paragraph "invoke the skill" body)
- [ ] Global symlinks created and resolving correctly: `~/.claude/skills/release` → `~/code/flowtron/claude/skills/release` and `~/.claude/commands/release.md` → `~/code/flowtron/claude/commands/release.md` (mirror `/new-project`'s install shape)
- [ ] NOT added to `claude/skills/new-project/SKILL.md` Step 3 (flowtron-self only — never auto-wired into adopters)
- [ ] NOT added to `docs/MIGRATION.md` §1.2 (adopter-facing; verified untouched)
- [ ] NOT added to `claude/CLAUDE-snippet.md` (adopter-facing; verified untouched)
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" (README.md / SPEC.md / docs/MIGRATION.md / claude/CLAUDE-snippet.md) — per-entry verdict
- [ ] Single `feat: CORE-057.2 — ship /release skill` commit lands
- [ ] PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` nested under `CORE-EPIC-057` in `## Medium` (per epic-cohort grouping; cohort moves to `## Completed` only when all children close — CORE-057.1's precedent)
- [ ] Tasknote moved to `_project/tasknote/archive/core/CORE-057.2.md`

## 🧩 Subtasks

- [ ] Create `claude/skills/release/` directory
- [ ] Write `claude/skills/release/SKILL.md` — Step 0 (cwd guard; bail if not flowtron repo); Step 1 (PLAN scan for `release v*`; bail on 0 or >1); Step 2 (read `SPEC.md:3` current version + `git log <last-tag>..HEAD`; classify commit prefixes → patch/minor/major; surface proposed bump; user confirms/overrides); Step 3 (scaffold tasknote from `templates/tasknote-template.md` with Acceptance + Subtasks pre-populated as the 7-step recipe parameterized to chosen version); Step 4 (drive Phase 1 Discovery — drift check on `SPEC.md` / `SPEC/versioning.md` / `docs/MIGRATION.md` cited lines); Step 5 (drive Phase 2 — apply 3 doc edits); Step 6 (drive Phase 3 — markdown lint mental-pass); Step 7 (drive Phase 4 — doc-drift sweep, auto-draft tag message per CORE-048 structure for user review, single `feat:` commit, annotated tag, `git push` + `git push origin vA.B.C`, flip PLAN line, archive tasknote); Step 8 (recap + post-closure protocol)
- [ ] Write `claude/commands/release.md` slash-command stub — frontmatter (`description` line; no `argument-hint` since strict no-args) + one-paragraph "Invoke the `release` skill" body
- [ ] Create global symlinks: `ln -s ~/code/flowtron/claude/skills/release ~/.claude/skills/release` and `ln -s ~/code/flowtron/claude/commands/release.md ~/.claude/commands/release.md`
- [ ] Verify symlinks resolve: `readlink ~/.claude/skills/release` → `~/code/flowtron/claude/skills/release`; same for the command stub
- [ ] Verify untouched (ls / grep): `claude/skills/new-project/SKILL.md` Step 3 symlink list; `docs/MIGRATION.md` §1.2 symlink list; `claude/CLAUDE-snippet.md`
- [ ] Phase 3 — markdown lint mental-pass on the new SKILL.md + command stub (frontmatter well-formed, no trailing whitespace, fenced blocks balanced)
- [ ] Phase 4 — doc-drift sweep over the 4 AI-referenced docs (verdict each); flip PLAN.md line; archive tasknote

## 🔗 Related

- [[CORE-EPIC-057]] — parent epic (4-skill expansion cohort)
- [[CORE-057.1]] — Discovery that locked the cohort scopes (resolved `/release install = global symlink, flowtron-self only`)
- [[CORE-048]] — release-recipe precedent (v1.2.0); canonical 7-step recipe this skill encodes

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** CORE-057.1 Discovery (closed today, 2026-05-09) locked the cohort scopes. `/release` install = global symlink, flowtron-self only; recipe = CORE-048's canonical 7-step shape (SPEC.md version bump · SPEC/versioning.md example shifts · MIGRATION.md pin bump · doc-drift sweep · single `feat:` commit · annotated tag · push). Sibling subtask `.1` (Discovery) and `.5` (`/file-followup`) are closed; `.3` `.4` `.6` are still pending. This is the next implementation child in the cohort and the only one whose install policy differs (flowtron-self only — the other three auto-wire into adopters).

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes (CORE-048 release-recipe precedent; CORE-057.1 Discovery scope-lock; CORE-057.5 `/file-followup` — most recent sibling skill, same cohort)
- [x] **Drift check** — see Discovery Notes; no drift on cited paths/concepts
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions (3-question AskUserQuestion resolved args grammar / version-bump derivation / tag-message drafting; answers locked above)
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source-file inventory (live at 2026-05-09)

- **Closest install precedent:** `claude/skills/new-project/SKILL.md` + `claude/commands/new-project.md` — the only other flowtron-self global skill today. User-global symlinks confirmed live: `~/.claude/skills/new-project → ~/code/flowtron/claude/skills/new-project` and `~/.claude/commands/new-project.md → ~/code/flowtron/claude/commands/new-project.md`. Note: symlink targets use lowercase `~/code/` (case-insensitive on this filesystem; cwd reports `/Users/fakeneuron/Code/flowtron`).
- **Closest scaffold-and-drive precedent:** `claude/skills/task/SKILL.md` (200+ lines, 6 steps, lazy-load fragments under `claude/skills/task/`). `/release` mirrors the scaffold-and-drive shape but specialized for releases.
- **Slash-command stub precedent:** `claude/commands/{task,new-project}.md` — frontmatter (`description`, optional `argument-hint`) + one-paragraph "invoke the skill" body.
- **Recipe targets (live):**
  - `SPEC.md:3` — `**Version:** v1.2.0`
  - `SPEC/versioning.md:8` — patch example `v1.2.0 → v1.2.1`; `:11` — minor `v1.2.x → v1.3.0`; `:13` — major `v1.x.y → v2.0.0` (already future-looking; not shifted on minor/patch bumps)
  - `docs/MIGRATION.md:295` — example pin `(e.g., v1.2.0)`
- **Doc-drift sweep targets** (per `_project/tasknote/README.md` §"AI-referenced docs"): `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/CLAUDE-snippet.md` (4 entries).
- **Existing flowtron skills** (5 SKILLs + 5 commands at HEAD): `task`, `starter-task`, `micro-task`, `new-project`, `file-followup`. No `release/` directory yet.

### Archive skim (precedents)

- `archive/core/CORE-048.md` (v1.2.0 release) — most recent precedent. Subtasks list spells out the 7-step recipe verbatim. Acceptance lists 9 criteria (3 doc edits, doc-drift sweep, commit, tag, push, PLAN flip, archive). Tag-message structure: subject + summary + "Changes since vP.Q.R:" grouped (SPEC contract / Doc currency) + Migration block. Adopter migration block deviated from v1.1.0's "no required project-side edits" boilerplate to call out CORE-047's action item — proves the migration block must be context-sensitive, not boilerplate.
- `archive/core/CORE-046.md` (v1.1.0) — the precedent CORE-048 mirrored. Established the doc-currency-shift convention.
- `archive/core/CORE-043.md` (v1.0.0) — first release precedent.
- `archive/core/CORE-057.1.md` (Discovery) — locked install policy: global symlink under `~/.claude/`, like `/new-project`. Locked recipe pointer at CORE-048. Captured drift call-out from CORE-054 starter (its `docs/MIGRATION.md §3` reference was wrong; the bump procedure lives in SPEC §"Pinning and bumping") — refined PLAN line dropped that ambiguous reference and points at CORE-048 directly.
- `archive/core/CORE-057.5.md` (`/file-followup`) — most recent sibling shipped today. Confirms the cohort cadence (one skill at a time, `feat: CORE-057.<N> — ship /<name> skill` commit shape).
- No prior tasknote has touched `claude/skills/release/` (doesn't exist); no prior tasknote has modified `claude/skills/new-project/` Step 3 to add `/release` (and per Discovery's locked policy, never will — `/release` stays flowtron-self).

### Drift check

- `SPEC.md:3` — `**Version:** v1.2.0` confirmed at HEAD (matches CORE-048's post-release state). ✓
- `SPEC/versioning.md` patch/minor examples confirmed at HEAD (lines 8 and 11). ✓
- `docs/MIGRATION.md:295` example pin `(e.g., v1.2.0)` confirmed at HEAD (was line 294 at CORE-048; one line of insertion above shifted it). ✓
- `_project/tasknote/README.md` §"AI-referenced docs" — 4 entries confirmed (README.md / SPEC.md / docs/MIGRATION.md / claude/CLAUDE-snippet.md). ✓
- `~/.claude/skills/new-project` and `~/.claude/commands/new-project.md` — global symlinks confirmed live (lowercase `~/code/` target). The `/release` install will mirror this. ✓
- No drift detected on any path or concept cited in the PLAN.md long description.

### Recipe coverage (CORE-048's 7 steps, codified for `/release`)

The skill must encode and drive these — they are the canonical release contract:

1. `SPEC.md:3` version bump (`vX.Y.Z` → `vA.B.C`).
2. `SPEC/versioning.md` patch + minor example shifts off the just-cut release. Major line stays (already future-looking).
3. `docs/MIGRATION.md:295` example pin `(e.g., vX.Y.Z)` → `(e.g., vA.B.C)`.
4. Phase 4 doc-drift sweep over the 4 AI-referenced docs (README / SPEC / MIGRATION / CLAUDE-snippet).
5. Single `feat: CORE-XYZ — flowtron vA.B.C (...)` commit.
6. Annotated `vA.B.C` tag with adopter-facing release notes (subject + summary + "Changes since vX.Y.Z" + Migration block).
7. `git push` commit + `git push origin vA.B.C`.

### Open implementation choices (clarifying questions below)

The Discovery resolved the install + recipe at the cohort level. Remaining choices that bear on SKILL.md shape:

- **Args grammar.** `/release <TASK-ID>` (mirrors `/task`) vs. `/release` no-args (skill scans PLAN for the next pending `release v*` line).
- **Version-bump derivation.** Auto-propose from `git log <last-tag>..HEAD` commit-prefix classification (feat/fix/breaking → patch/minor/major), or ask the user up front.
- **Tag-message drafting.** Skill auto-drafts the annotated-tag message from commit log + PLAN context (user reviews/edits), or skill leaves message-writing as a conversational step.

Asking these via AskUserQuestion before writing Phase 1 subtasks.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — closest install precedent: `claude/skills/new-project/` (also flowtron-self global, mirrored install shape: `~/.claude/skills/<name>` + `~/.claude/commands/<name>.md`). Closest scaffold-and-drive precedent: `claude/skills/task/SKILL.md` (Step 0 path resolution → numbered steps → Step N hand-off shape). Most recent cohort sibling: `claude/skills/file-followup/SKILL.md` (CORE-057.5, shipped today — same cohort cadence, same `feat: CORE-057.<N> — ship /<name> skill` commit shape, same epic-nested PLAN closure pattern). No new shape introduced; `/release` follows the existing skill scaffold with release-specific Phase 2-4 driving steps.
- [x] Implemented the minimal solution — 2 new files + 2 new global symlinks + 0 adopter-wiring edits (flowtron-self only):
  - **NEW** `claude/skills/release/SKILL.md` (~180 lines; 9-step shape — cwd guard · PLAN scan · bump propose · scaffold · Phase 1 drive · Phase 2 drive · Phase 3 drive · Phase 4 drive · post-closure)
  - **NEW** `claude/commands/release.md` (frontmatter + invoke paragraph + sibling cross-refs)
  - **NEW** `~/.claude/skills/release` → `~/code/flowtron/claude/skills/release` (global symlink; mirrors `/new-project`)
  - **NEW** `~/.claude/commands/release.md` → `~/code/flowtron/claude/commands/release.md` (global symlink; mirrors `/new-project`)
  - **UNTOUCHED** `claude/skills/new-project/SKILL.md` (flowtron-self only — never auto-wired)
  - **UNTOUCHED** `docs/MIGRATION.md` §1.2 (adopter-facing)
  - **UNTOUCHED** `claude/CLAUDE-snippet.md` (adopter-facing)
- [x] Updated/added tests for non-trivial behavior — N/A (skill files + slash-command stub + symlinks; no executable code surface).

**Implementation Notes:**

- **Strict no-args contract.** SKILL Step 1 grep'd the un-checked PLAN lines under Critical/High/Medium/Low for `release v*` shortname. Bails on 0 (asks user to file the PLAN line first) or >1 (asks user to disambiguate). Single match drives the rest. The user explicitly chose this in Q1 over the optional-args alternative; the skill's `## Notes` block surfaces the rationale ("multiple un-cut releases queued is a process smell").
- **Auto-propose bump kind.** SKILL Step 2 reads `SPEC.md:3` + `git describe --tags --abbrev=0` + `git log <last-tag>..HEAD --oneline`; classifies by Conventional-Commits prefix (feat!→major, feat→minor, others→patch); proposes the bump. Drift between SPEC.md version and last tag short-circuits the skill (likely aborted prior release; reconcile first). PLAN-line target wins by default if it differs from auto-proposed.
- **Auto-draft tag message.** SKILL Step 7.2 uses CORE-048's structure verbatim (subject + summary + Changes since vX.Y.Z grouped + Migration block). The `## Notes` block surfaces CORE-048's "non-boilerplate Migration block" lesson — auto-draft seeds; user is expected to review/edit. Adopter-impact classification happens in Phase 1 Discovery and feeds the Migration block draft.
- **Why no SPEC.md cross-ref.** SPEC.md doesn't have a "Shipped skills" section; `/release` is flowtron-self only and doesn't fit any adopter-facing carve-out (§"When to use a tasknote" is for adopter filing skills). The release recipe was already canonical via CORE-048's archived tasknote precedent; the SKILL.md is now the executable codification of that precedent. No SPEC change needed.
- **Symlink target casing.** Used lowercase `~/code/flowtron/...` (matches `/new-project`'s existing symlink target). The filesystem is case-insensitive on this Mac; cwd reports `/Users/fakeneuron/Code/flowtron` but `~/code/flowtron/...` resolves to the same directory. Verified via `readlink`.
- **No new lazy SPEC module.** The release recipe lives entirely inside `claude/skills/release/SKILL.md`. SPEC/versioning.md (the existing lazy module) is about adopter-side pinning/bumping — different concern. No `SPEC/release.md` needed.
- **Sibling-cohort independence.** This task ships zero adopter-wiring edits — the 3 wiring surfaces (`new-project` Step 3, MIGRATION §1.2, CLAUDE-snippet) are explicitly NOT touched per the locked install policy from CORE-057.1 Discovery. CORE-057.3 (`/epic-discovery`) and CORE-057.4 (`/close-epic`) will each add 2 more symlinks per surface following CORE-057.5's pattern.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (skill files + slash-command stub + symlinks; no executable code surface).
- [x] Ran lint/type-check on changed code — N/A (no code). Markdown mental-pass on the 2 new files: `claude/skills/release/SKILL.md` frontmatter follows canonical `name:` / `description:` shape (matches sibling `file-followup/SKILL.md`); 9 numbered steps with consistent heading style; fenced code blocks balanced (4 sh fences in Steps 2/5/7); cite-don't-restate style holds (cites SPEC §"📝 Phase 1: Discovery" / §"Post-closure protocol" / §"PLAN.md filing-discipline thresholds" / §"Pinning and bumping" rather than restating). `claude/commands/release.md` frontmatter follows the canonical `description:` shape (no `argument-hint` since strict no-args, mirroring `commands/new-project.md`'s no-argument-hint shape).
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend change; PLAN.md grammar unchanged so the visualizer parses unchanged).

**Testing Notes:**

`readlink ~/.claude/skills/release` → `/Users/fakeneuron/code/flowtron/claude/skills/release` ✓
`readlink ~/.claude/commands/release.md` → `/Users/fakeneuron/code/flowtron/claude/commands/release.md` ✓

The harness picked up the new skill mid-task (visible in the available-skills system reminder after symlink creation). Symlink wiring is live. Functional smoke of the skill itself defers to the next release cut (when the recipe will actually fire); the SKILL.md content is the canonical executable interpretation and reviewed against CORE-048's archived precedent for fidelity.

`grep -c "release" claude/skills/new-project/SKILL.md docs/MIGRATION.md claude/CLAUDE-snippet.md` — 0 / 1 (line 310, pre-existing reference about reading annotated tag messages, unchanged) / 1 (line 47, pre-existing reference about release notes, unchanged). All three adopter-facing surfaces verified untouched.

## 🧪 Phase 3: Testing & Linting

- [ ] Ran targeted test suite for changed code
- [ ] Ran lint/type-check on changed code
- [ ] (frontend) Asked the user for visual confirmation

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** —
  - `README.md`: **no change.** Line 87 cites `(`/task`, `/new-project`)` as the entry-point pair (canonical task driver + bootstrap entry). Per CORE-057.5 precedent (and CORE-050 / CORE-051 before it), non-entry-point skills don't get appended to this list — keeping the entry-point-pair convention. `/release` is flowtron-self only and explicitly not an entry point for adopters; stays out.
  - `SPEC.md`: **no change.** SPEC.md has no canonical "Shipped skills" section; adopter-facing filing skills appear in §"When to use a tasknote (and when not to)" carve-outs. `/release` is flowtron-self only and doesn't fit that section's contract. The release recipe is canonical via CORE-048's archived tasknote precedent + the new `claude/skills/release/SKILL.md` (executable codification); SPEC contract unchanged.
  - `docs/MIGRATION.md`: **no change.** Adopter-facing — `/release` is explicitly not auto-wired into adopter projects per CORE-057.1's locked install policy. §1.2 symlink list stays at 4 commands (`/task`, `/starter-task`, `/micro-task`, `/file-followup`).
  - `claude/CLAUDE-snippet.md`: **no change.** Adopter-facing — same reason as MIGRATION.md. Workflow-block paragraph + symlink section stay at 4 commands.
- [x] Closed — PLAN.md line 30 flipped to stub form `[x] **CORE-057.2** [opus] | /release skill — Completed 2026-05-09.` (kept nested under `CORE-EPIC-057` in `## Medium` per epic-cohort grouping; parent + cohort move to `## Completed` only when all children close — mirrors CORE-057.1 / CORE-057.5 closure precedent) and tasknote moved to `_project/tasknote/archive/core/`
- [ ] Recapped changes with the user and got confirmation

**Final Summary:**

Shipped `/release` as flowtron-self-only skill that scaffolds and drives a release tasknote per the CORE-048 / CORE-046 / CORE-043 canonical recipe (SPEC.md version bump · SPEC/versioning.md example shifts · MIGRATION.md pin bump · doc-drift sweep · single `feat:` commit · annotated tag · push). Three design decisions locked in Phase 1 via AskUserQuestion: (1) **strict no-args** — SKILL grep's PLAN.md for the next un-checked `release v*` line and bails on 0 or >1 matches; (2) **auto-propose bump kind** — classifies commits since last tag by Conventional-Commits prefix (feat!→major, feat→minor, others→patch) and surfaces the proposed version for user confirm/override; (3) **auto-draft tag message** — uses CORE-048's structure verbatim (subject + summary + Changes since vX.Y.Z grouped + Migration block) for user review/edit before tagging. Two new files (`claude/skills/release/SKILL.md` + `claude/commands/release.md`) + two new global symlinks (`~/.claude/skills/release` and `~/.claude/commands/release.md` → `~/code/flowtron/claude/...`, mirroring `/new-project`'s install shape) + zero adopter-wiring edits per the locked flowtron-self-only install policy. SKILL `## Notes` surfaces the lessons learned: tag-message review is mandatory (CORE-048's non-boilerplate Migration block is the canonical example); multiple un-cut releases queued is a process smell that the no-args bail catches; the recipe is canonical via the SKILL + the archived precedent, no new SPEC lazy module needed. The 4-skill cohort progresses: CORE-057.1 (Discovery) and CORE-057.5 (`/file-followup`) closed today; CORE-057.2 (this) closes today; CORE-057.3 (`/epic-discovery`), CORE-057.4 (`/close-epic`), and CORE-057.6 (audit) remain. PLAN.md line for CORE-057.2 stays nested under CORE-EPIC-057 in `## Medium`; parent + cohort move to `## Completed` only when all children close.

**Archived:** 2026-05-09
