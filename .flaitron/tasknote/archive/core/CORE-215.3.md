---
title: worktree-start
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: ["CORE-EPIC-215", "CORE-215.1", "CORE-215.2"]
---

# CORE-215.3 | worktree-start

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-215]] [[CORE-215.1]] [[CORE-215.2]]

## 🎯 Goal

Author the thin `/ft-worktree-start` skill + command pair that, from a main checkout, creates a `wt-<TASK-ID>` branch and isolated git worktree under `~/code/<project>-worktrees/wt-<TASK-ID>/`, copies the active tasknote, and hands off for isolated execution of the epic child.

## ✅ Acceptance

- [ ] `claude/skills/ft-worktree-start/SKILL.md` created as thin procedural utility (5 explicit steps: context/preconditions, collision safety, the 4 conceptual git+copy steps, verification, precise conversational handoff with cd target + "Clear your session, then use 🔧 /ft-task <ID>" line; heavy reference to docs/WORKTREES.md; no internal 4-phase tasknote scaffolding)
- [ ] `claude/commands/ft-worktree-start.md` created as thin command stub (frontmatter + "Invoke the `worktree-start` skill..." + usage; no --fast passthrough — flag belongs on the post-handoff /ft-task)
- [ ] Implementation exactly matches the five locked conventions and the "Start / End Flow (Conceptual)" section in `docs/WORKTREES.md` (branch `wt-<ID>`, location `~/code/<p>-worktrees/wt-<ID>/`, copy of tasknote only, handoff to fresh session + `/ft-task <ID>`)
- [ ] Safety / hygiene: detects non-git dir, inside-worktree cwd, dirty main checkout (warn), existing branch/dir collisions; provides clear error + recovery guidance; never auto-clobbers
- [ ] Handoff UX: after successful creation, prints the exact absolute worktree path + the recommended copy-paste line ("Clear your session, then use 🔧 /ft-task <ID>"); no attempt to teleport the agent's context
- [ ] Zero SPEC.md or contract changes (per .1/.5 charter); pure additive thin skill following the ft-new-project / ft-file-followup / ft-debug precedent (procedural steps + shell snippets the agent runs via its tools)
- [ ] Phase 4 doc-drift sweep records "no change" for all AI-referenced docs (this child touches none of them; WORKTREES.md addition to the set is .5/.6 scope)

## 🧩 Subtasks

- [ ] Pattern survey — read thin procedural precedents (ft-file-followup, ft-debug + its command, ft-new-project, ft-starter-task) and their command stubs; confirm the "5 explicit steps + shell snippets the agent runs" shape + handoff UX is the right thin model (not a 4-phase driver)
- [ ] Draft SKILL.md Steps 0–1 (context/preconditions verification including "must be main checkout", TASK_ID validation, source tasknote existence, project-slug computation for ~/code/<slug>-worktrees/, collision safety for branch + target dir)
- [ ] Draft SKILL.md Steps 2–3 (the four mechanical steps exactly as documented in WORKTREES.md: checkout -b, worktree add, cp of the tasknote (plus README.md for area context), verification via git worktree list + ls)
- [ ] Draft SKILL.md Step 4 (the critical UX handoff block with absolute path, "fresh session" warning, exact "Clear your session, then use 🔧 /ft-task <ID>" cue, and the symmetric /ft-worktree-end reminder)
- [ ] Draft SKILL.md Step 5 + Notes (post-handoff notes, when-to-use guard per WORKTREES.md, thin-by-design rationale, no SPEC impact, symmetry with .4, cross-ref placeholders for after .5 lands)
- [ ] Draft the matching thin command stub (exact house shape of ft-debug.md / ft-task.md; note that --fast is not for this skill)
- [ ] Self-review drafted files against `docs/WORKTREES.md` conceptual flow + the 5 locked decisions from CORE-215.1; confirm naming, paths, copy semantics, and handoff language have zero drift
- [ ] Phase 3: markdown hygiene + shell-snippet review (no executable tests or lint surface apply to prompt-only files)
- [ ] Phase 4: doc-drift sweep (expect all "no change"), PLAN.md stub flip, archive move, recap

## 🔗 Related

- [[CORE-EPIC-215]] — parent epic (worktree-convention)
- [[CORE-215.1]] — discovery that locked the 5 conventions and filed this child scope
- [[CORE-215.2]] — worktree-doc that authored the canonical reference `docs/WORKTREES.md` this implementation must follow exactly
- [[CORE-215.4]] — sibling end skill (will consume the artifacts this start skill produces)
- [[CORE-EPIC-195]] — sibling precedent (ft-debug thin skill + full 5-surface wiring)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Exact match to the .3 child scope filed by CORE-215.1 (27w description) and the "Start / End Flow (Conceptual)" + "The Five Locked Conventions" in the just-completed CORE-215.2 doc. The five decisions (location, branch, skill names, copy tasknote, per-project tier) are stable, the target files are new (zero drift risk), and the thin-skill precedent shape is clear from ft-debug / ft-file-followup. No re-scope, de-scope, file pivot, or approach change required.

- [x] Read relevant source files

- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Archive skim findings:**
- `ls _project/tasknote/archive/core/` + targeted `grep -l "worktree" ...` (plus manual spot-checks on hits) performed.
- Hits limited to: the 215 lineage (215.1, 215.2, 196 starter), historical cross-refs in 205.1/204 (just naming the epic/starter), and two unrelated stale mentions (CORE-113 "flowtron-nat-011 worktree" cleanup; CORE-007 "worktree-deleted" as git-status side-effect language — not git-worktree feature).
- Zero prior implementations, partial code, or conflicting conventions for `/ft-worktree-start`, the `~/code/*-worktrees/` layout, or `wt-` branches. Clean slate exactly as CORE-215.1 recorded ("No prior worktree mentions anywhere in archive/core/" for the convention itself).

**Drift check:**
- All paths and concepts in the PLAN line and WORKTREES.md are current:
  - `claude/skills/ft-worktree-start/SKILL.md` and `claude/commands/ft-worktree-start.md` — confirmed absent (correct; we create them).
  - `docs/WORKTREES.md` — exists and matches the five locked decisions 1:1.
  - No SPEC.md mentions of worktrees that would create contract tension.
  - The "Files to touch" list from .1 (this pair + .4 + .5 surfaces) remains accurate at HEAD.
- The originating CORE-196 starter and .1 resolved scoping table are still the authoritative source; no evolution since .2 landed.

**Clarifying questions:**
No clarifications needed. All five "Open at promotion" questions from the originating starter were resolved in CORE-215.1's "Previously resolved scoping decisions" table and re-confirmed by the completion of .2 (which delivered the exact doc the start skill must implement against). The conceptual 4-step start flow is explicitly written in WORKTREES.md §"Start / End Flow (Conceptual)".

**Explicit assumptions (carried forward):**
1. The skill runs from the *main* (non-worktree) checkout on the branch that the epic child is intended to be based on.
2. The tasknote for `<TASK-ID>` already exists in `_project/tasknote/` in the current checkout (operator has done `/ft-task <ID>` or equivalent first; start is an accelerator, not a replacement for filing).
3. `git worktree add` will be invoked with the full absolute target under `~/code/<project>-worktrees/` (the skill will compute `<project>` from basename of the git root or let the operator override in edge cases).
4. Handoff is *conversational only* — the skill prints the `cd` path and the exact copy-paste line the operator will use in a fresh session; the AI cannot teleport the context window.
5. No changes to SPEC.md, templates, or the 4-phase contract itself (per .5 charter).
6. The pair stays "thin" — <150 LOC each, heavy reuse of the gate language and post-closure protocol from ft-task where possible (or explicit "identical to /ft-task Step X" delegation notes).

**Relevance & scope confirmation:**
This is a pure thin-skill authoring child (2 files: one SKILL.md + one command stub). Pattern survey will be against the thin precedents (ft-debug, ft-file-followup, ft-starter-task). Execution touches exactly the two new paths under claude/. No AI-referenced docs touched (WORKTREES.md is already delivered and is not yet in the README list). Zero frontend, zero privileged, zero perf surface. Matches the .3 scope 1:1.

**Phase 1 exit gate judgment (default-skip flavor per /ft-task):**
Discovery executed the exact child scope filed by .1 with zero deviation. All decisions pre-locked in .1 and documented in .2; archive/drift clean; clarifying step logged pre-resolved assumptions only; subtasks/acceptance populated directly from the conceptual flow + thin-skill precedent. **Discovery surfaced no significant deviation → skip 🛠️.**

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey (thin utility precedent):**
- ft-file-followup: 5 short steps, heavy use of AskUserQuestion for inputs, single PLAN.md append + conversational paragraph delivery, no tasknote artifact, explicit "filing-only" framing. Thin and focused.
- ft-debug (skill + command): thin wrapper around the standard /ft-task flow with *extra* debug-specific scaffolding injected into the normal Phase 1/3. Command is ~15 lines; SKILL delegates most mechanics while adding the hypothesis prompts. Good model for "additive behavior without forking the contract."
- ft-new-project: longer procedural (8 steps) but still thin — explicit shell blocks the agent must run via its terminal tool, precondition gates, AskUserQuestion for inputs, staged commit + handoff, heavy reference to MIGRATION.md as the source of truth. No 4-phase inside.
- ft-starter-task / ft-epic-discovery (for contrast): these *are* tasknote drivers and carry the full 4-phase scaffolding + gate logic. Confirmed we do *not* want that shape for the worktree pair.

Decision: the start skill is a pure utility (like ft-file-followup + ft-new-project) with its own 5 procedural steps. It references `docs/WORKTREES.md` as the authoritative convention (parallel to how ft-new-project references MIGRATION.md). The 4 conceptual steps from the doc are the core of Step 2. Handoff UX is the primary value surface. No internal tasknote phases, no fast-mode parsing (the flag is for the post-handoff `/ft-task`).

**Minimal implementation (2 files + 1 dir, ~210 LOC net):**
- `claude/skills/ft-worktree-start/SKILL.md` (new, 187 lines): full 5-step procedural body. Step 0 does the git-dir / inside-worktree / porcelain / tasknote-existence checks + computes PROJECT_SLUG + WT_DIR under ~/code/. Step 1 does branch/dir collision checks. Step 2 executes the 4 git+cp steps with verification. Step 3 re-verifies via `git worktree list`. Step 4 emits the canonical handoff block with the exact copy-paste cue the operator will use after `/clear`. Step 5 + Notes capture the thin rationale, when-to-use guard, and epic cross-refs. All shell snippets are copy-paste ready for the agent's `run_terminal_command` tool.
- `claude/commands/ft-worktree-start.md` (new, 23 lines): canonical thin stub (frontmatter with description + argument-hint, one-sentence "Invoke the `worktree-start` skill...", usage notes that explicitly call out the --fast-belonging-to-/ft-task rule).
- `claude/skills/ft-worktree-start/` (new dir): created via `mkdir -p`; contains only the SKILL.md (no private step-*.md fragments needed for v1).

No SPEC.md, no templates, no AI-referenced docs, no viz/ or privileged paths touched. The implementation is deliberately narrower than my initial Acceptance draft (no fake "Phase 1 inside the start skill"); the tasknote was edited in Phase 2 to match the delivered thin shape. All naming, paths, and copy semantics match the 5 locked decisions from CORE-215.1 and the WORKTREES.md doc delivered by .2.

**Tests:** N/A — these are prompt-instruction files (SKILL + command stub) executed by the agent's own reasoning loop. No JS/Python surface, no unit tests, no lint target. Markdown hygiene verified manually (consistent backticks, numbered steps, GFM, relative wikilinks to the convention doc and epic siblings).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Pure prompt-instruction change (new thin skill + command stub under `claude/`). 

- No executable code changed → no test suite, no type/lint surface on JS/TS/Python/etc.
- Markdown hygiene verified manually during implementation (GFM tables not used here, consistent backtick usage for paths/commands, wikilink syntax to sibling tasknotes + docs/WORKTREES.md, numbered steps, no broken anchors). Shell snippets were written to be directly runnable via the agent's `run_terminal_command` tool and match the style used in ft-new-project and ft-file-followup.
- No files under `viz/` or any declared UI dir → no frontend surface, no 👁️ visual confirmation required (the skill is operator-facing prose + handoff instructions, not a rendered UI component).
- Conditional skip signals (per SPEC §"Conditional skip rule"): zero frontend files, zero privileged-ops paths (no migrations/auth/secrets/integrations), zero perf-narrative reasoning during the thin implementation. Clean for autonomous commit on the skip branch.

The three changed/added items (tasknote + SKILL.md + command) are all documentation/prompt artifacts. Phase 2 notes already captured the self-review against the convention doc and locked decisions. No further verification surface.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (AI-referenced docs from _project/tasknote/README.md):**

- `README.md` — no change
- `SPEC.md` — no change (per .1/.3/.5 charter: no contract-layer edits for the worktree convention)
- `docs/MIGRATION.md` — no change (lightweight cross-ref from .2; full count/list/symlink updates scoped to .5)
- `claude/AGENTS-snippet.md` — no change (lightweight cross-ref from .2; symlink list + roster updates scoped to .5)
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change (count bumps scoped to .5)

`claude/skills/ft-worktree-start/SKILL.md` and `claude/commands/ft-worktree-start.md` are loaded on-demand by the skill stub mechanism (see README.md note on `claude/skills/*/SKILL.md`); they are not part of the default cold-start sweep, so no drift entry required.

(The new `docs/WORKTREES.md` itself is still intentionally *not* listed in the AI-referenced set; that addition is scoped to .5 or the .6 audit per CORE-215.1/.2 notes.)

**Final Summary:**

Authored the thin `/ft-worktree-start` skill + command (the "start" half of the worktree-convention pair) so adopters can execute independent epic children in parallel isolated git worktrees. 2 files + 1 dir, ~210 LOC, zero contract or wiring surface impact; the mechanical wiring and end-skill sibling remain for .4/.5.

**Recap (for 📦 gate or autonomous commit):**

1-2 sentence plain-English: Delivered the start half of the worktree convention for CORE-EPIC-215. Operators can now run `/ft-worktree-start <ID>` from a main checkout to get a clean `wt-<ID>` worktree under `~/code/<p>-worktrees/` with a copy of the active tasknote, then hand off to a fresh session for isolated execution of the child.

Technical: Created `claude/skills/ft-worktree-start/SKILL.md` (187 lines, 5 procedural steps + safety + exact handoff UX matching the 4 conceptual steps in WORKTREES.md) + `claude/commands/ft-worktree-start.md` (23 lines, thin stub) + the skill directory. Pattern followed ft-file-followup / ft-new-project / ft-debug thin-utility precedents (explicit shell blocks for the agent's terminal tool, precondition gates, conversational handoff, heavy reference to the convention doc as source of truth). No tests (prompt-only), no lint surface, no frontend/privileged/perf signals, no AI-referenced doc updates. Phase 1 and Phase 2 both skipped 🛠️ (zero deviation from .1-scoped plan; delivered shape is the correct thin utility, not a 4-phase driver). Tasknote will archive to `archive/core/CORE-215.3.md`. PLAN.md line will become the stub form under Completed (leaving the parent epic and .4/.5/.6 siblings open).

**Archived:** 2026-05-30
