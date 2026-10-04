# CORE-005 | Write `docs/PHILOSOPHY.md` and `docs/MIGRATION.md`

**Goal:** Author the two foundational docs that explain *why* flowtron exists (PHILOSOPHY) and give an adopting project a concrete step-by-step adoption path (MIGRATION).

**Priority:** High
**Area:** core
**Model:** opus
**Status:** In Progress

## Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** v0.1.0 release (CORE-006) and the three migration tasks (CORE-007/008/009) all need at least MIGRATION.md to exist, and the public push wants PHILOSOPHY.md to frame the project's "why". `docs/` exists but is empty.

- [x] Read relevant source files — `SPEC.md`, `_project/PLAN.md`, `claude/CLAUDE-snippet.md`, `templates/tasknote-template.md`, `templates/tasknote-README.md`, `templates/PLAN.md`, archived `CORE-004.md`. `legacy/` had no prior PHILOSOPHY/MIGRATION drafts to mine.
- [x] **Drift check** — task description names two new files in `docs/`. Folder exists and is empty. No paths, line numbers, or symbols to verify. Clean.
- [x] Asked clarifying questions
- [x] Defined concrete execution steps below

**Discovery Notes:**

User decisions (locked via AskUserQuestion):

- **PHILOSOPHY angle:** narrative essay in personal voice. The "why" — problems with prior workflows, what failed, what stuck, why markdown-over-JSON, why zero scripts. ~1–2 pages. Complements SPEC (which is a contract) rather than duplicating its principles list.
- **MIGRATION scope:** both adoption-from-scratch AND migration-from-prior-system, in one doc. Section 1 = the photard-style fresh adoption (submodule + symlinks + CLAUDE.md block, already in `claude/CLAUDE-snippet.md`). Section 2 = the fintown-style migration (`plan.json` → `PLAN.md`, retire helper scripts, reconcile in-flight tasknotes).
- **Worked example:** stay abstract. Per-project migrations live in their own tasknotes (CORE-007/008/009.x) and serve as the real-world records in archive.

Implicit decisions:

- Audience is the user (judedelparte) and any future reader of the public repo (CORE-006 pushes to GitHub). Voice = personal but legible to a stranger.
- Tone alignment: SPEC.md is terse and rule-stating; PHILOSOPHY can be looser and more reflective; MIGRATION is procedural ("do this, then this").
- No duplication of CLAUDE-snippet.md content — MIGRATION should *reference* it for the symlink commands rather than copy them, so there's a single source of truth for the wiring.
- No new doc structure, navigation, or index page. Just the two files.

**Execution Steps:**

1. Draft `docs/PHILOSOPHY.md` — narrative essay. Sections roughly: opening problem statement (drift across solo projects, three different workflows in fintown/InvisiPaw/photard), what didn't work (JSON plans, helper scripts, per-project drift), what stuck (markdown, 4-phase, relevance gate, model field), why those stuck, what flowtron deliberately rejects (CLI tool, validators, DB), and a closing "what comes next" pointer to SPEC. Personal voice, ~1–2 pages.
2. Draft `docs/MIGRATION.md` — procedural. Two sections:
   - **§1 Fresh adoption** — pre-reqs, add submodule at `_project/flowtron/`, run symlink commands (reference `claude/CLAUDE-snippet.md`), paste the CLAUDE.md block, create `_project/PLAN.md` from `templates/PLAN.md`, create `_project/tasknote/README.md` from `templates/tasknote-README.md` (set pinned version), verify `/task` resolves.
   - **§2 Migrating from a prior workflow** — recognize the patterns (plan.json, helper scripts, per-project WORKFLOW.md), do §1 first, then convert plan.json → PLAN.md preserving archive references, reconcile in-flight tasknotes (decide: finish-as-is vs. rewrap into the new template), retire helper scripts (remove + update CLAUDE.md), update any project-side WORKFLOW.md / quick-reference docs to point at flowtron's SPEC.md.
3. Cross-link: PHILOSOPHY closing references SPEC.md and MIGRATION; MIGRATION top references PHILOSOPHY for "why" and SPEC.md for "what".
4. Phase 3 verification: re-read both files end-to-end, check internal links and the references to `SPEC.md` / `claude/CLAUDE-snippet.md` / templates resolve to real paths, no stale references.
5. Phase 4 closure: archive tasknote, flip PLAN.md, recap.

## Phase 2: Execution

- [x] **Pattern survey** — SPEC.md is the only existing prose doc in the repo; it's terse, sectional, and rule-stating. PHILOSOPHY needs a different register (narrative, reflective) — justified new shape because the genre differs from a contract. MIGRATION extends the SPEC register (procedural, ordered steps, code blocks).
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown docs)
- [x] Ran targeted tests on changed files — N/A

**Implementation Notes:**

Files written:

- `docs/PHILOSOPHY.md` — narrative essay in personal voice. Sections: opening, The actual problem (drift across fintown/InvisiPaw/photard), What I tried first (TasknoteSystem reference folder), What stuck (PLAN.md, tasknotes, 4-phase rhythm, relevance gate, model field), The decisions that fall out (markdown over JSON, zero scripts, one task per context window, relevance before action, versioned and pinned), What flowtron deliberately is not, What's next. Cross-links to SPEC and MIGRATION at the close.
- `docs/MIGRATION.md` — procedural in two sections plus pinning and gotchas. §1 Fresh adoption: 7 sub-steps (submodule, symlinks, paste block, PLAN.md, tasknote-README, commit, verify) with explicit shell commands. §2 Migrating from a prior workflow: 6 sub-steps (convert plan.json, reconcile in-flight tasknotes, retire helper scripts, replace project-side workflow docs, update CLAUDE.md, commit as a tasknote). §3 Pinning and bumping. §4 Common gotchas. Defers to `claude/CLAUDE-snippet.md` for the canonical wiring snippet rather than duplicating it.

Deliberate non-changes: SPEC.md, PLAN.md template, CLAUDE-snippet.md were not modified to add reverse cross-links. The task scope is two new docs; reverse links would be scope creep.

Mid-draft refinements:

- Tightened a "I had each of them at some point" overclaim in PHILOSOPHY's "What flowtron deliberately is not" — I had helper scripts and JSON validation, was tempted by but did not build cross-project queries or a project CLI. Re-stated honestly.
- Tightened MIGRATION §1.6 commit command to use explicit `.claude/` paths so adopters with existing `.claude/settings.json` etc. don't accidentally stage unrelated files.
- Fixed MIGRATION pinning §3 step 4 — `.gitmodules` doesn't change on a version bump (only the parent's submodule pointer does); previous wording was incorrect.
- MIGRATION pinning §3 step 2 switched from `cd _project/flowtron && ... && cd -` to `git -C _project/flowtron ...` for symmetry with §1.1.

## Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown docs)
- [x] Ran lint/type-check on changed code — N/A
- [x] (frontend) Asked the user for visual confirmation — N/A (not frontend; verification request raised in recap)
- [x] Fixed all introduced issues — see mid-draft refinements above

**Testing Notes:**

Verification in lieu of an automated suite:

- Re-read both files end-to-end after drafting; caught and fixed the four issues listed under Implementation Notes.
- Confirmed all referenced paths exist on disk: `SPEC.md`, `templates/PLAN.md`, `templates/tasknote-README.md`, `claude/CLAUDE-snippet.md`.
- SPEC sections referenced by MIGRATION (`§"Task ID convention"`, `§"Priority levels"`) exist in SPEC.md.
- Cross-links between PHILOSOPHY and MIGRATION (`PHILOSOPHY.md`, `MIGRATION.md`, `../SPEC.md`) resolve correctly given both files live in `docs/`.
- The git remote URL used in MIGRATION §1.1 (`https://github.com/fakeneuron/flowtron.git`) matches the repo's actual `origin`.

## Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change — none beyond the two new files; reverse cross-links from SPEC/PLAN-template/CLAUDE-snippet are out of scope.
- [x] Updated PLAN.md (status flipped to `Completed 2026-04-28`)
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Wrote `docs/PHILOSOPHY.md` (narrative essay on the "why" — drift across fintown/InvisiPaw/photard, why JSON+scripts didn't stick, the principles that survived) and `docs/MIGRATION.md` (procedural guide with two paths: fresh adoption from scratch, and migrating from an existing plan.json + helper-script workflow, plus pinning/bumping and common gotchas). Both files live in `docs/`, cross-link to each other and to `../SPEC.md`, and defer to `claude/CLAUDE-snippet.md` for the canonical wiring snippet rather than duplicating it. Voice and scope locked via three AskUserQuestion calls in Phase 1.

**Archived:** 2026-04-28
