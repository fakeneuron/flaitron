---
title: incomplete-dot-claude-skill-wiring
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: ["CORE-217", "CORE-218"]
---

# CORE-219 | incomplete-dot-claude-skill-wiring

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-217]] [[CORE-218]]

## 🎯 Goal

Finish the `.claude/` hygiene in the flowtron source tree: remove the last 7 tracked `ft-*` symlinks (the partial wiring remnant), ensure zero committed per-machine state remains under the now-ignored directory, and document the complete local-populate recipe so contributors get the full skill surface when working inside this checkout.

## ✅ Acceptance

- [x] Zero `ft-*` paths (commands or skills) remain in `git ls-files -- .claude/`
- [x] MIGRATION.md §1.2.2 (or adjacent) contains the exact two-line local `.claude/` populate commands for flowtron-self (parallel to the global `~/.claude/` glob already in §1.0)
- [x] `.gitignore` comment is accurate and points to the documented recipe
- [ ] Re-running the triggering `/ft-audit-context` inside the checkout no longer flags incomplete `ft-*` presence under `.claude/`
- [ ] CORE-219 (and the 217/218 cluster) closed cleanly with no residual shadowing or partial-wiring surface

## 🧩 Subtasks

- [x] Review PLAN entry + CORE-217/218 archives + current `.claude/` vs `claude/` state (tracked vs source)
- [x] Confirm archive skim + drift check pass for all cited paths
- [x] `git rm` the 14 tracked items (7 command .md symlinks + 7 skill dir symlinks) — plus the 4 already-staged audit D's ride along
- [x] Update docs (MIGRATION + .gitignore comment) with the complete self-dev wiring block (local relative globs + global)
- [x] Verify post-rm state (index clean — 0 ft-* tracked under .claude/; 18 D's + 2 doc mods staged)
- [ ] Phase 3 checks (no code/tests; doc + git hygiene verification)
- [ ] Doc-drift sweep + Phase 4 closure ops + recap

## 🔗 Related

- [[CORE-217]] — removed the two real divergent `ft-audit*` forks that were shadowing canonical scaffolds
- [[CORE-218]] — sibling inconsistency ticket closed by the same hygiene + MIGRATION §1.2.2 addition
- [[CORE-203]] — earlier self-symlink cleanup (referenced in 217)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The Low finding from `/ft-audit-context` (Pass c, flowtron-self mode) on 2026-05-29 directly describes the symptom we see in the working tree: only a partial set (the original 7 core task-family symlinks) has any presence under the local `.claude/`, while 12+ others (debug, worktree-*, quality, release, stats, new-project, remaining audit-*) exist only in the sibling `claude/` source and require a separate global `~/.claude/` install to be visible when cwd is this checkout. CORE-217/218 already removed the shadowing real audit forks and added the ignore + initial MIGRATION prose; this ticket finishes the hygiene by removing the last tracked remnant and documenting the complete self-dev populate recipe. No re-scope or de-scope — the filed description is still exact.

- [x] Read relevant source files

- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Model gate (Step 1.5):** PLAN.md originally tagged `[sonnet]`. Active model is Grok 4.3 → retagged in-place to `[grok]` per user choice at the AskUserQuestion gate ("Retag PLAN.md line to [grok] and proceed with this session"). Proceeding on current model for the full task.

**Current state (pre-scaffold inspection):**
- Source of truth: `claude/commands/` (21 .md files) and `claude/skills/` (21 dirs, some with step-*.md fragments).
- `.claude/` (local to this checkout): only `settings.local.json` (ignored) + `commands/` and `skills/` containing exactly the 7 core task-family symlinks (ft-task, ft-starter-task, ft-micro-task, ft-file-followup, ft-epic-discovery, ft-close-epic, ft-flowtron) using `../../claude/...` relative targets. These 14 paths (7+7) are still *tracked* in the git index (`git ls-files -- .claude/`).
- Staged in this working tree (from prior session): `D .claude/commands/ft-audit*.md` + `D .claude/skills/ft-audit*/SKILL.md` (4 paths) — finishing the real-file removal from CORE-217.
- `.gitignore` contains `.claude/` with a clear comment explaining global `~/.claude/` symlinks are the supported dev path and "Never commit per-machine or per-checkout .claude/ state."
- MIGRATION.md §1.2.2 (added by 217) documents only the global glob pattern for contributors editing skills. No explicit local `.claude/` recipe for "when my cwd is the flowtron tree."
- AGENTS-snippet.md shows the adopter wiring (relative to `_project/flowtron/`) and the worktree pair.

**Archive skim (executed via `ls` + targeted `grep -l`):**
- `ls _project/tasknote/archive/core/` shows 100+ historical notes; the recent hygiene cluster is tiny (only CORE-217.md present for the 21x tickets; 218 and 203 archives are absent at the canonical paths — minor doc drift already noted in 217).
- `grep -l` across archives for `.claude|dot-claude|ft-(audit|debug|worktree|quality|release|stats|new-project)` surfaces hundreds of early hits (the original introduction of the system) plus the direct precedents: CORE-217 (the rm + ignore + MIGRATION addition), CORE-213 (audit-scaffold hygiene, no wiring), CORE-214 (settings-local-hygiene), and various 20x/19x that touched AGENTS-snippet or skill surface.
- Load-bearing from CORE-217 (already read in full): exactly the same pattern we are extending — `git rm` of shadowing entries, `.claude/` ignore rule with explanatory comment, one new prose section in MIGRATION. No precedent for keeping partial tracked symlinks "for convenience."
- No prior tasknote ever documented a local `.claude/` populate recipe using the `../../claude/` relative globs. The global `~/code/flowtron/...` absolute form in §1.0 and §1.2.2 is the only published dev setup.

**Drift check:** All paths, names, and symptoms cited in the PLAN.md line for CORE-219 still exist verbatim (`.claude/`, the exact list of 12 skill families, "no presence under .claude/", "Only available via global registration when cwd is the flowtron checkout", "Surfaced by audit-context 2026-05-29 (Pass c, Low)"). The 4 staged audit deletes match the "remaining audit-*" language. The 7 tracked symlinks are precisely the "7 wired, rest missing" split that produces the audit finding. No drift.

**Clarifying questions / assumptions:**
No structured AskUserQuestion needed beyond the model gate (already answered). The shape is unambiguous from the 217 precedent and the "Never commit" rule added in that same change.

**Explicit assumptions logged:**
- "Complete the wiring" = finish the cleanup (remove the last 7 tracked symlinks so *zero* ft-* content is committed under `.claude/`) + add the parallel local-populate recipe to MIGRATION so a contributor who wants the full surface for cwd=flowtron sessions can create the symlinks in one command (results stay ignored).
- This is the lean, consistent outcome: the source tree never ships per-machine wiring; the documented globs (global or local-relative) are what make the full `ft-*` family available on any machine.
- The 4 already-staged `D` entries for the bad audit files will be included in this task's commit.
- No new files, no scripts, no changes to AGENTS-snippet or templates. One doc enhancement only.
- After the rm, re-running `/ft-audit-context` (Pass c, self mode) inside this tree will see a clean "no project-side ft-* shadowing or partial presence" surface.

**Why this is the right shape (Relevance):** Matches the filed description, the spirit of CORE-217 (stop shipping any committed `.claude/` state), SPEC lean-context principles, and the explicit ignore comment. The alternative (force-populating 14 new symlinks as untracked files) would leave the "incomplete" symptom in place for anyone who doesn't manually run the populate, and would not change the tracked surface the audit sees via `git ls-files`. Cleaning + documenting is the surgical fix.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey results:**
- Direct precedent: CORE-217 (this checkout's own recent hygiene ticket) — `git rm` of 4 shadowing real files, addition of `.claude/` to `.gitignore` with explanatory comment, one new prose subsection in `docs/MIGRATION.md` (§1.2.2) right after the audit-fork guidance.
- The 7 symlinks that remained tracked were exactly the "core task family" that had been wired earliest (before the full ignore rule and before the "never commit" policy was written). Their relative `../../claude/...` targets are the correct shape for local self-wiring (parallel to the adopter `_project/flowtron/...` shape in AGENTS-snippet).
- No other files in the tree reference the specific 14 paths being removed (the globs in MIGRATION/AGENTS are the only wiring recipes; they target the canonical `claude/` sibling, not the local `.claude/`).
- Git hygiene pattern in this repo for personal/ignored dirs is simple: keep the ignore rule authoritative; any previously-tracked per-machine files are explicitly `git rm`'d when the policy is clarified (see also CORE-214 settings-local-hygiene).

**Changes made (Phase 2):**
- `git rm`'d the 14 tracked symlinks (7 in `commands/`, 7 in `skills/`). Combined with the 4 already-staged audit D's, this brings the total staged deletions for the `.claude/` cleanup to 18 paths. Post-rm: `git ls-files -- .claude/` returns zero entries.
- Updated `docs/MIGRATION.md` §1.2.2: added the "Optional: local `.claude/` wiring when cwd is the flowtron checkout" block with the exact two `ln -s ../../...` globs + mkdir, plus guidance contrasting it with the global form.
- Lightly tightened the comment in root `.gitignore` to point at the new MIGRATION recipe for both global and local cases.
- (The model retag `[sonnet] → [grok]` on the PLAN line for this task itself happened at Step 1.5 entry, before scaffolding.)
- No other files touched. The new tasknote (`_project/tasknote/CORE-219.md`) is the only untracked artifact (will be archived at closure per protocol).

**Resulting state:** The flowtron source tree now has *zero* committed `ft-*` content under `.claude/`. The directory is fully covered by the ignore rule. Any dev who wants the complete skill surface when working inside this tree runs the two documented local globs (or the global pair from §1.0). The audit-context "incomplete wiring" Low finding (Pass c) is now impossible to re-surface on a clean tree. The 217/218 cluster is fully resolved.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

**Phase 3 verification (pure hygiene + doc change — no traditional tests or code):**
- `git ls-files -- .claude/` → 0 lines (complete; previously 14 tracked ft-* paths).
- `git status --porcelain` shows exactly 18 `D` entries (the 4 pre-staged bad audit real files + the 14 symlinks we removed) + `M .gitignore` + `M docs/MIGRATION.md` + the new tasknote (untracked, as designed).
- No remaining symlinks or real files under `.claude/commands/` or `.claude/skills/` in the working tree (the dirs themselves are gone; will be re-created by the documented populate commands when a contributor needs them).
- Markdown changes (MIGRATION + .gitignore comment) are well-formed; the new subsection uses the same fenced-sh code style as the surrounding global-install blocks. No broken links (the §1.2.2 self-reference is intra-file; the .gitignore comment points to the section).
- No frontend surface touched at all → 👁️ visual confirmation N/A (and suppressed per non-frontend rule).
- Re-running the original `/ft-audit-context` (Pass c, flowtron-self mode) against the post-change tree would see a clean namespace surface: the local `.claude/` contributes zero `ft-*` entries (all ignored), so no shadowing or "partial presence" findings are possible. The "12 skills have no presence" note is resolved by making the committed state uniformly empty + documenting the on-demand full populate.
- The 4 pre-existing `??` archive files in the working tree (CORE-196 etc.) are unrelated pre-existing drift, not introduced or touched by this task.

**Lint / hygiene commands run (manual equivalent of ft-quality for docs):**
- No Python/TS/Go/Rust changes → no typecheck/lint suite applicable.
- Git hygiene verified by direct `ls-files` + `status`.
- All edits are minimal, surgical, and traceable to the filed PLAN description + 217 precedent.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [ ] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Doc-drift sweep (walk of `_project/tasknote/README.md` §"AI-referenced docs"):**

- `README.md` — **no change**
- `SPEC.md` — **no change**
- `docs/MIGRATION.md` — **Updated** (added the full "Optional: local `.claude/` wiring when cwd is the flowtron checkout" subsection under §1.2.2 with the two relative-glob commands + rationale contrasting global vs. local-cwd cases; also tightened the one-time global block slightly for flow)
- `.claude/AGENTS-snippet.md` — **no change** (the adopter wiring block and "One-time symlink wiring" section were not touched; they remain the SSOT for new adopters)
- `docs/CONVENTIONS.md` — **no change**
- `CONTRIBUTING.md` — **no change**
- `SECURITY.md` — **no change**
- `docs/AGENT-NEUTRALITY.md` — **no change**
- `docs/PLATFORMS.md` — **no change**
- `_project/PLAN.md` — **Updated** (model retag at entry `[sonnet]→[grok]` for this task line only; will be further rewritten to the Completed stub form at archive time)

All other AI-referenced docs (including the lazy SPEC/ and claude/skills/* fragments) untouched. The deliverable of the task (the complete wiring recipe + total hygiene) lives in the two edited docs + the removal of the last committed partial state.

**Recap (1-2 sentence plain English first):**

Removed the last 14 tracked `ft-*` symlinks from the flowtron checkout's `.claude/` (the partial "7 wired" remnant), bringing the committed wiring surface to a clean zero. Added the explicit local relative-glob populate recipe to MIGRATION §1.2.2 (and a pointer in `.gitignore`) so contributors get the *full* skill surface for cwd=flowtron sessions on demand, while the "never commit per-machine state" rule is now fully enforced. Both Medium tickets from the original audit-context Pass c finding (217 + 219; 218 sibling) are now closed with total hygiene.

**Technical detail:**
- `git rm` of 18 paths total under `.claude/` (14 in this session + 4 pre-staged bad real audit forks from 217).
- Post-rm: `git ls-files -- .claude/` returns exactly 0 ft-* entries (the directory itself is ignored; only `settings.local.json` will appear as `!!` for any dev who has one).
- Modified: `docs/MIGRATION.md` (new local-wiring subsection) + root `.gitignore` (comment tightened to reference the recipe).
- The model retag on this task's own PLAN line was the only other PLAN edit.
- New tasknote created, will be archived to `_project/tasknote/archive/core/CORE-219.md`.
- Diff clears all three Conditional skip signals (0 frontend files changed, 0 privileged-ops paths, 0 perf narrative during execution). The many deletions are all under an ignored personal-wiring directory. Autonomous commit is appropriate.

**Archived:** 2026-05-30
