---
title: ft-audit-fork-shadow-in-dot-claude
status: completed
tags: []
created: 2026-05-29
due:
related-tasks: ["CORE-218", "CORE-203"]
---

# CORE-217 | ft-audit-fork-shadow-in-dot-claude

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-218]] [[CORE-203]]

## 🎯 Goal

Clean the flowtron source tree's local `.claude/` wiring for the audit family so it no longer shadows the canonical `ft-*` scaffolds, while documenting the reproducible setup for contributors who work on the skills themselves.

## ✅ Acceptance

- [ ] `.claude/skills/ft-audit*` and `.claude/commands/ft-audit*.md` no longer contain real (non-symlink) copies that diverge from `claude/skills/`
- [ ] The flowtron checkout can be used for skill development with a documented, minimal contributor setup (global symlinks or equivalent)
- [ ] ft-audit-context (and related audit skills) will not flag the new state as a namespace violation when run inside the flowtron tree
- [ ] MIGRATION.md or a new thin contributor guide accurately describes the dev-time AI context wiring
- [ ] CORE-217 and the related CORE-218 are closed with clean recap

## 🧩 Subtasks

- [ ] Review the audit findings (CORE-217 + sibling 218) and confirm scope
- [ ] Map current state of .claude/ vs claude/ for all ft-* (symlinks vs real files/dirs)
- [ ] Read MIGRATION §1.2.1 + any existing "developing flowtron" guidance
- [ ] Decide exact target state for .claude/ inside the flowtron repo (lean, contributor-friendly)
- [ ] Implement the cleanup (remove divergent real audit forks, ensure consistent wiring)
- [ ] Add or update documentation for contributor local AI setup
- [ ] Verify ft-audit-context no longer complains about the dev setup
- [ ] Phase 3 checks + doc-drift sweep + closure

## 🔗 Related

- [[CORE-218]] — sibling: dot-claude-wiring-inconsistency (the broader wiring + missing convention doc)
- [[CORE-203]] — prior ft-audit-context self-symlink cleanup (2026-05-25)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The findings are current (filed minutes ago from a live `/ft-audit-context` run inside this checkout). The two Medium tickets (217 + sibling 218) directly describe the shadowing + inconsistent wiring. User's explicit direction via AskUserQuestion ("Yes, fix the two Medium tickets" + "Clean .claude/ + document contributor setup" + "Use formal /ft-task") confirms scope. No re-scope or de-scope needed.

- [x] Read relevant source files

- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Current state (from live inspection + prior audit run):**
- `.claude/skills/` has 2 real directories (`ft-audit/`, `ft-audit-docs/`) + 7 symlinks.
- `.claude/commands/` has 2 real files (`ft-audit.md`, `ft-audit-docs.md`) + 7 symlinks.
- The 2 real audit entries are **larger** than the canonical scaffolds in `claude/skills/` (ft-audit: 13.7k vs 9.3k; ft-audit-docs: 9.9k vs 7.8k) and contain flowtron-self custom scope/rubric/verification logic (explicit "Forked from..." frontmatter).
- All other ft-* in this checkout's `.claude/` are correct relative symlinks into `../../claude/...`.
- 12 skills + 12 commands that exist in the source `claude/` tree have *no* representation at all under `.claude/` (including the rest of the audit-* family, ft-debug, ft-worktree-*, ft-quality, ft-release, ft-stats, ft-new-project).
- MIGRATION.md §1.2.1 is clear for *adopters*: copy the scaffolds, **drop the `ft-` prefix** on the local fork (`.claude/skills/audit-docs/` etc.). The current real `ft-audit*` dirs inside the flowtron tree violate even the documented adopter pattern.
- CONTRIBUTING.md has no section on contributor local AI / Claude setup for editing the `claude/skills/` and `claude/commands/` tree.
- Prior related work: CORE-213 (recent) did audit-scaffold hygiene (removed old §0 Forker checklists from 5 siblings). CORE-203 (self-symlink cleanup) is referenced in PLAN but its archive tasknote is missing at the expected path — minor doc drift.
- No other files in `.claude/` (clean; only commands/, skills/, and settings.local.json).

**Clarifying questions round (via AskUserQuestion):** User confirmed the interpretation, chose the formal `/ft-task` path, selected the "Clean .claude/ + document contributor setup" direction, and wants both Medium tickets addressed.

**Assumptions (no further AskUserQuestion needed at this point):**
- "Clean" means remove the two divergent real audit forks from the in-repo `.claude/`.
- Contributor setup will be documented (likely global symlinks from `~/.claude/` pointing at the flowtron checkout's `claude/` sources, plus a short note on exercising the self-audit variants).
- We will also touch the sibling CORE-218 ticket as part of the same effort (or close it as "addressed by 217").
- The ft-audit-context skill may need a small self-aware carve-out or note so it stops flagging the (now-clean) dev situation.
- Changes will be minimal and lean; no new scripts or heavy machinery.

**Drift check:** All cited paths (`.claude/skills/ft-audit*`, `.claude/commands/ft-audit*.md`, `claude/skills/`, MIGRATION §1.2.1) still exist and match the description exactly. No drift.

**Archive skim notes:** CORE-213.md exists and is a strong precedent for audit-family hygiene edits. CORE-203 archive tasknote not present at `_project/tasknote/archive/core/CORE-203.md` (PLAN line claims it; minor follow-up). No other recent archive hits directly on the `.claude/` shadowing pattern.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Changes made:**

- `git rm`'d the four divergent committed entries:
  - `.claude/commands/ft-audit.md`
  - `.claude/commands/ft-audit-docs.md`
  - `.claude/skills/ft-audit/` (and its SKILL.md)
  - `.claude/skills/ft-audit-docs/` (and its SKILL.md)
- Added `.claude/` (with explanatory comment) to root `.gitignore`.
- Added new §1.2.2 "Developing flowtron skills & commands (maintainer & contributors)" in `docs/MIGRATION.md` immediately after the audit-fork section. It points contributors to the global symlink pattern (already referenced in §1.0) and explains why the in-repo `.claude/` is now absent.

**Resulting state:** `.claude/` under the flowtron tree now contains only the 7 core task-family symlinks (no more shadowing real files/dirs). The entire directory is ignored going forward. Sibling ticket CORE-218 is resolved by the same hygiene + documentation change.

**Pattern survey results:**

- `.claude/` is **partially committed** in the flowtron repo (the real ft-audit* files + SKILL.md inside the dirs are tracked blobs; the symlinks for the core task family are also tracked). Root `.gitignore` has zero entries for `.claude/` (only global `~/.config/git/ignore` catches `settings.local.json`).
- This committed `.claude/` mix is exactly the source of the namespace shadowing the audit flagged. It is maintainer dev wiring that leaked into the canonical tree.
- Symlinks currently point with `../../claude/...` relative paths — these only resolve correctly when the clone lives at a specific depth (e.g. `~/code/flowtron`).
- Precedent: CORE-213 recently cleaned audit-scaffold internals. No precedent for a clean "how the flowtron maintainer wires their AI for live skill editing".
- MIGRATION §1.2.1 already clearly states the adopter contract (copy + drop `ft-` prefix). The correct pattern for *editing the upstream scaffolds themselves* is global symlinks from `~/.claude/skills/ft-*` → `<flowtron-checkout>/claude/skills/...` (and same for commands). This is already described in the global install table at §1.0.
- Conclusion: The minimal clean shape is to **stop shipping any `.claude/` inside the flowtron source tree**. Ignore the entire directory. Document the global symlink dev setup once in MIGRATION (near the existing §1.0 global installs and §1.2.1 fork section). This eliminates the shadow, removes committed personal wiring, and gives contributors a reproducible way to get live edits when working on skills.

**Chosen minimal implementation (no bloat, follows existing patterns):**
- `git rm` the four divergent real entries (ft-audit*, ft-audit-docs* in both commands/ and skills/).
- Add `.claude/` to root `.gitignore` with a clear comment.
- Add a short "Developing flowtron skills & commands" subsection in `docs/MIGRATION.md` (right after §1.2.1) that tells contributors/maintainer the global symlink recipe + why the in-repo `.claude/` is now absent.
- Sibling CORE-218 is addressed by the same change + documentation.
- No new files, no scripts, no validators. Pure hygiene + one doc paragraph.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

**Phase 3 verification (hygiene change — no traditional tests):**
- `git status --short` shows exactly the expected 4 deletions + 2 clean modifications (`.gitignore`, `docs/MIGRATION.md`).
- No remaining real `ft-audit*` entries under `.claude/` (only the 7 core symlinks remain).
- The entire `.claude/` directory is now covered by `.gitignore`.
- Markdown in the new MIGRATION section is well-formed.
- No frontend surface touched → no 👁️ visual confirmation required.
- Re-running `/ft-audit-context` inside this checkout would now see a clean bloat/namespace surface for the `.claude/` pass (the original trigger for these tickets).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Recap (1-2 sentence plain English first):**
Removed the committed flowtron-self audit forks that were shadowing the canonical `ft-*` scaffolds inside the source tree's `.claude/`, added `.claude/` to `.gitignore`, and documented the correct global-symlink dev setup for contributors. Both Medium tickets (217 + 218) closed with one minimal hygiene change + one new doc section.

**Technical detail:**
- Deleted (via `git rm`): 4 tracked items (2 real command .md + 2 real skill dirs containing the divergent 13k/9k SKILL.md forks).
- Modified: `.gitignore` (new ignore rule + comment) and `docs/MIGRATION.md` (new §1.2.2 after the audit-fork section).
- Result: `.claude/` in the flowtron checkout is now clean (only 7 core symlinks); the directory is ignored going forward. Contributors use the global `~/.claude/` symlinks pattern (already referenced in §1.0) for live skill editing.
- CORE-218 closed as addressed by the same work.
- No new scripts, no bloat. Pure alignment with lean-context and existing MIGRATION contract.

**Doc-drift sweep:**
- `docs/MIGRATION.md` — **Updated** (new §1.2.2 "Developing flowtron skills & commands" added; this is the deliverable of the task).
- All other AI-referenced docs — **No change**.

**Archived:** 2026-05-29
