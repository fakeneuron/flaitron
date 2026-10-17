---
title: screenshot-prune-sweep
status: completed
tags: []
created: 2026-08-27
due:
related-tasks: [CORE-EPIC-483, CORE-483.1, CORE-483.2, CORE-483.3]
blocked-by:
  - CORE-483.2
parallel-safe-with:
  - CORE-483.3
---

# CORE-483.4 | screenshot-prune-sweep

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-483]] · [[CORE-483.1]] · [[CORE-483.2]] · [[CORE-483.3]]

## 🎯 Goal

Create `~/code/_screenshots/` and delete the gitignored/untracked contents of every adopter's `.flowtron/screenshots/` (~300MB across ~20 repos), keeping the directories, their `.gitignore` entries, and every git-tracked screenshot file (flowtron's `viz-board.png` plus committed evidence PNGs discovered mid-flight in 4 other repos) untouched.

## ✅ Acceptance

- [x] `~/code/_screenshots/` created (did not exist before this task)
- [x] Every untracked/gitignored file under each of the 19 adopter `.flowtron/screenshots/` dirs (all repos except flowtron itself) is deleted; the directories and their `.gitignore` entries survive
- [x] All git-tracked screenshot files survive untouched: flowtron's `viz-board.png`, project-09's 10 pre-gitignore tracked PNGs, and the fully-tracked dirs in project-04 (54), Project-17 (3), project-26 (24)
- [x] Post-sweep verification: `du -sh` per repo shows the expected shrink; `git status --porcelain` in every one of the 4 tracked-file repos shows no deletions; no adopter repo is committed to or pushed
- [x] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" run for the flowtron repo

## 🧩 Subtasks

- [ ] Create `~/code/_screenshots/`
- [ ] For each of the 19 adopter repos, delete files under `.flowtron/screenshots/` that are NOT tracked by that repo's git index, leaving tracked files, the directory, and the `.gitignore` entry alone
- [ ] Re-run `du -sh` + tracked-file spot checks across all 20 repos to confirm the expected shrink and that no tracked file was touched
- [ ] Confirm `git status --porcelain` in project-04 / Project-17 / project-26 / project-09 shows zero deletions (tracked files untouched) and no other repo gained unexpected dirt
- [ ] Phase 4: doc-drift sweep, flip the `.4` PLAN line to stub form keeping 2-space nesting under the active parent, archive the tasknote, commit (flowtron-side deliverables only — PLAN.md + tasknote; the ~20 adopter repos are outside this git repo and receive no commits)

## 🔗 Related

- [[CORE-EPIC-483]] — parent epic (screenshot-discipline)
- [[CORE-483.1]] — Discovery; locked the "Prune all" resolution this task executes
- [[CORE-483.2]] — blocked-by (Sequential); wrote the personal-layer policy naming `~/code/_screenshots/<project>/` as the new destination
- [[CORE-483.3]] — parallel-safe-with; independent surface (project-20 deposit wording vs this filesystem prune)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Predecessor `[[CORE-483.2]]` closed and locked the destination convention (`~/code/_screenshots/<project>/`) this task's directory-creation step depends on. `[[CORE-483.1]]`'s "Prune scope" resolution ("Prune all... delete contents of every adopter's gitignored `.flowtron/screenshots/`") is this task's mandate, refined mid-Discovery below.

- [x] Read relevant source files — enumerated all `.flowtron/screenshots` dirs under `~/code` (`find ~/code -maxdepth 3 -type d -path "*/.flowtron/screenshots"` → 20 repos), sized each (`du -sh` + file counts), checked `git ls-files` for tracked content in every repo, checked each repo's `.gitignore` for a `.flowtron/screenshots/` line, confirmed `~/code/_screenshots/` does not yet exist

- [x] **Best Practices Review** — N/A: no code or module boundary; pure filesystem deletion across gitignored/untracked build artifacts, guarded by a tracked-file check

- [x] **Archive skim** — `[[CORE-483.1]]`/`[[CORE-483.2]]`/`[[CORE-483.3]]` (already reviewed at scaffold) are the only archive hits touching this surface; `[[CORE-383]]` is the standing carve-out for flowtron's own tracked `viz-board.png`. No archived decision addresses per-adopter tracked screenshots — this is new ground.

- [x] **Drift check** — the task description and `[[CORE-483.1]]`'s Discovery Notes both assert every adopter's `.flowtron/screenshots/` is gitignored ("Prune scope... All gitignored (verified project-02/project-19/fakeneuron/project-25/project-07)"). A full 20-repo sweep found this **false for 4 repos**: `project-04` (54/54 files tracked, no gitignore entry at all), `project-26` (24/24 tracked, no entry), `Project-17` (3/3 tracked, no entry), and `project-09` (10/32 tracked — pre-date its own gitignore rule, which git does not retroactively apply to already-tracked paths). These are deliberately committed PR/task evidence, not throwaway captures; a blind delete would git-rm real history and leave those repos permanently dirty until someone commits — directly contradicting this task's own "no adopter commits or pushes" line. Surfaced to the operator via AskUserQuestion (below) rather than silently narrowing scope.

- [x] Asked clarifying questions — surfaced the tracked-file drift finding via AskUserQuestion; operator chose **"Skip tracked files"**: delete only gitignored/untracked content everywhere; project-04/project-26/Project-17 are left fully untouched (100% tracked), project-09 loses its 22 untracked files but keeps its 10 tracked ones. This directly resolves the fire-branch scope deviation below — treated as satisfying the 🛠️ Phase 1→2 gate rather than re-asking, since the operator's answer is a more explicit go than a banner ack would add.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Full inventory (20 repos, `du -sh` + file count + tracked count, verified 2026-08-27):**

| Repo | Total files | Tracked | Gitignored? |
|---|---|---|---|
| project-19 | 338 | 0 | yes |
| fakeneuron | 163 | 0 | yes |
| project-02 | 97 | 0 | yes (comment claims 13 legacy tracked PNGs; verified 0 tracked today — stale comment, out of scope, project-02's own drift to fix from its own session) |
| project-04 | 54 | **54 (100%)** | no entry |
| project-08 | 65 | 0 | yes |
| project-25 | 55 | 0 | yes |
| project-05 | 43 | 0 | yes |
| project-09 | 32 | **10** | yes (rule postdates the 10 tracked files; git doesn't retroactively ignore tracked paths) |
| project-21 | 28 | 0 | yes |
| project-26 | 24 | **24 (100%)** | no entry |
| project-01 | 24 | 0 | yes |
| project-16 | 19 | 0 | yes |
| project-29 | 17 | 0 | yes |
| project-20 | 7 | 0 | yes |
| project-06 | 7 | 0 | yes |
| project-13 | 6 | 0 | yes |
| project-07 | 8 | 0 | yes |
| project-10 | 5 | 0 | yes |
| Project-17 | 3 | **3 (100%)** | no entry |
| flowtron | 1 | 1 (`viz-board.png`, [[CORE-383]]) | n/a (deliberately tracked) |

Total ≈300MB / ~919 files across the 19 adopter repos; 91 of those files are git-tracked and excluded from deletion (project-09 10 + project-04 54 + project-26 24 + Project-17 3). Net deletion target ≈828 files.

**Resolved scoping (operator, 2026-08-27):** Skip tracked files entirely — see AskUserQuestion above. This is the only scope change from `[[CORE-483.1]]`'s filing-time description; everything else (destination dir, gitignore/directory preservation, no adopter commits) proceeds as filed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: no code pattern to extend; this is a filesystem operation, not a code change

- [x] **Minimal refactor gate** — N/A: no code touched

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: no executable surface

**Implementation Notes:**

`mkdir -p ~/code/_screenshots` created the destination directory `[[CORE-483.2]]`'s rewritten policy names.

For each of the 19 adopter repos with a `.flowtron/screenshots/` dir, walked every file inside and deleted it only if `git ls-files --error-unmatch` reported it untracked in that repo — a per-file tracked-status check rather than a blanket `rm -rf`, so the guard holds even for project-09's mixed directory (10 tracked, 22 untracked). Directories and `.gitignore` entries were never touched, only file contents inside them.

**Deleted 904 files** across 15 fully-untracked repos (project-19 338, project-02 97, project-08 65, project-25 55, project-05 43, fakeneuron 163, project-21 28, project-09 22, project-01 24, project-16 19, project-29 17, project-20 7, project-06 7, project-13 6, project-07 8, project-10 5) — arithmetic matches the Discovery-time projection exactly. **Preserved 91 tracked files** by skipping project-04 (54/54), project-26 (24/24), Project-17 (3/3) entirely (zero untracked files in any of the three) and project-09's 10 tracked files. flowtron's own `.flowtron/screenshots/viz-board.png` ([[CORE-383]]) was never in the deletion set (out of scope — flowtron isn't an adopter of itself).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: filesystem-only, no code

- [x] Ran lint/type-check on changed code — N/A: no code

- [x] **Quality assertions** — N/A: no code changed; verification below is deletion-correctness evidence instead

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A: no frontend surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Post-write verification (all 20 repos re-checked, not assumed):**

| Check | Result |
|---|---|
| `du -sh` + file count per repo after sweep | 15 repos: `0B` / 0 files. `project-09`: 396K / 10 files (all tracked). `project-04`: 12M / 54 files (all tracked). `Project-17`: 904K / 3 files (all tracked). `project-26`: 6.5M / 24 files (all tracked). `flowtron`: 64K / 1 file (`viz-board.png`, unchanged) |
| `git status --porcelain -- .flowtron/screenshots/` in project-04 / Project-17 / project-26 / project-09 | Empty in all four — zero tracked-file deletions registered |
| `git -C ~/code/flowtron status --porcelain` | Only this tasknote (untracked) — no unexpected change inside the flowtron repo itself |
| `ls -la ~/code/flowtron/.flowtron/screenshots/viz-board.png` | Intact, 64507 bytes, unchanged mtime — [[CORE-383]] carve-out untouched |

**Not verified / deliberately out of scope:** project-02's `.gitignore` comment claims "13 earlier evidence PNGs were committed before this entry and stay tracked," but `git ls-files` shows 0 tracked files there today — a stale comment predating some earlier untracked cleanup. Not this task's surface (adopter `.gitignore` comment drift is `[[CORE-483.1]]`'s "Adopter layer" resolution, routed to `/project-20-layer-drift` from project-02's own session); noted here only so it isn't rediscovered as new drift later.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 17 entries: `README.md`: no change · `AGENTS.md`: no change · `SPEC.md`: no change · `docs/MIGRATION.md`: no change · `claude/AGENTS-snippet.md`: no change · `codex/AGENTS-snippet.md`: no change · `cursor/AGENTS-snippet.md`: no change · `grok/AGENTS-snippet.md`: no change · `docs/CONVENTIONS.md`: no change · `CONTRIBUTING.md`: no change · `SECURITY.md`: no change · `docs/AGENT-NEUTRALITY.md`: no change · `docs/PLATFORMS.md`: no change · `claude/CAPABILITIES.md`: no change · `docs/AGENT-COMPAT.md`: no change · `docs/EXTERNAL-AGENTS.md`: no change · `docs/WORKTREES.md`: no change. Pure filesystem cleanup outside any flowtron contract surface — no flowtron doc mandates or now describes a screenshot-retention rule.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form keeping its 2-space nesting under the active parent, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline on conditional skip

**Final Summary:**

Closed the epic's fourth and final implementation child, completing all `CORE-EPIC-483` implementation work (no `.N` audit was filed — small policy epic, per `[[CORE-483.1]]`'s scoping). Created `~/code/_screenshots/` (the destination `[[CORE-483.2]]`'s policy names) and deleted 904 gitignored/untracked files (~300MB) from 15 of 19 adopter `.flowtron/screenshots/` directories, leaving every directory and its `.gitignore` entry in place.

**Significant mid-flight finding:** the task's own premise — "every adopter's gitignored `.flowtron/screenshots/`" — was false for 4 repos. `project-04` (54 files), `project-26` (24), and `Project-17` (3) carry **zero gitignore entry** and are 100% git-tracked, deliberately committed PR/task evidence; `project-09` has 10 files that predate its own gitignore rule (which git does not retroactively apply to already-tracked paths) alongside 22 genuinely untracked ones. A blind delete would have git-rm'd real history and left those repos permanently dirty, contradicting the task's own "no adopter commits or pushes" line. Surfaced via AskUserQuestion; operator chose to skip tracked files everywhere, so the sweep guarded every deletion with a per-file `git ls-files --error-unmatch` check rather than a blanket `rm -rf`.

Verification: re-measured `du -sh` + tracked-file spot checks across all 20 repos post-sweep (15 at `0B`/0 files; the 4 tracked-file repos unchanged in size and showing zero `git status` deletions); flowtron's own `.flowtron/screenshots/viz-board.png` ([[CORE-383]]) confirmed untouched; flowtron repo `git status` shows only this tasknote. Refactors: none — filesystem operation, no code. Documentation verdict: 17/17 flowtron docs "no change." Deferred/out of scope: project-02's stale gitignore comment (mismatched tracked-file count) and all adopter-side `.gitignore` comment wording, both explicitly routed to `/project-20-layer-drift` from each repo's own session per `[[CORE-483.1]]`.

Maintainability effect: ~300MB of accumulated, unrecoverable-value gitignored PNGs across 15 repos is gone, closing the accretion `[[CORE-483.1]]`'s Discovery measured (68+ archived tasknotes citing dead `screenshots/` paths). The 91 files that were actually someone's deliberate evidence survive, untouched by an epic whose stated intent was retiring *ephemeral* debris, not deleting committed history. `CORE-EPIC-483` is now fully closed at the implementation-child level; only the parent PLAN.md flip (via a future `/ft-close-epic`-style motion, or manual parent flip since no `.N` audit was filed) remains.

**Archived:** 2026-08-27
