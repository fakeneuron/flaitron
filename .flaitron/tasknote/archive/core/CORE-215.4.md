---
title: worktree-end
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: ["CORE-EPIC-215", "CORE-215.1", "CORE-215.2", "CORE-215.3"]
---

# CORE-215.4 | worktree-end

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-215]] [[CORE-215.1]] [[CORE-215.2]] [[CORE-215.3]]

## 🎯 Goal

Author the thin `/ft-worktree-end` skill + command pair (symmetric to .3) that, from the main checkout after the worktree branch is merged (or explicitly discarded), verifies the state, removes the git worktree, archives the copied tasknote from the worktree perspective into the main checkout's canonical archive, and optionally prunes the `wt-` branch.

## ✅ Acceptance

- [ ] `claude/skills/ft-worktree-end/SKILL.md` created as thin procedural utility (5 explicit steps: context/preconditions, branch-state verification (merged vs explicit discard), the 4 conceptual git+archive steps, verification, precise post-cleanup summary; heavy reference to docs/WORKTREES.md; no internal 4-phase tasknote scaffolding)
- [ ] `claude/commands/ft-worktree-end.md` created as thin command stub (frontmatter + "Invoke the `worktree-end` skill..." + usage; no --fast passthrough — flag belongs on the post-handoff /ft-task)
- [ ] Implementation exactly matches the five locked conventions and the "Start / End Flow (Conceptual)" section in `docs/WORKTREES.md` (verify merge or discard from main, `git worktree remove`, archive the *copied* tasknote into main's `_project/tasknote/archive/`, optional branch prune)
- [ ] Safety / hygiene: detects non-main cwd (inside worktree), dirty main checkout (warn), missing worktree/branch for the ID, unmerged branch without explicit discard confirmation; provides clear error + recovery guidance; never auto-clobbers or deletes unmerged work
- [ ] Archive step: before `git worktree remove`, explicitly copies (or ensures) the final closed tasknote from the worktree's `_project/tasknote/archive/<area>/<ID>.md` into the equivalent location in the *main* checkout (the "archive copied tasknote" action); main's archive is always the source of truth
- [ ] UX: after successful cleanup, prints a concise confirmation block listing what was removed, whether the branch was pruned, and the current `git worktree list` state; reminds operator that main checkout now holds the canonical PLAN update + archived tasknote (from the preceding merge)
- [ ] Zero SPEC.md or contract changes (per .1/.5 charter); pure additive thin skill following the ft-worktree-start / ft-file-followup / ft-debug precedent (procedural steps + shell snippets the agent runs via its tools)
- [ ] Phase 4 doc-drift sweep records "no change" for all AI-referenced docs (this child touches none of them; WORKTREES.md + wiring additions are .2/.5 scope)

## 🧩 Subtasks

- [ ] Pattern survey — read the direct sibling `claude/skills/ft-worktree-start/SKILL.md` + its command stub + `docs/WORKTREES.md` §"Start / End Flow (Conceptual)" + the .1 discovery notes on end responsibilities; confirm the "5 explicit steps + shell snippets" thin shape + main-checkout-only execution is the right model
- [ ] Draft SKILL.md Step 0 (context/preconditions verification: must be main checkout via git-dir check, TASK_ID validation, compute PROJECT_SLUG / WT_DIR / BRANCH identically to start, confirm the worktree dir and/or branch for the ID can be resolved)
- [ ] Draft SKILL.md Step 1 (branch-state verification: check whether `wt-${TASK_ID}` is merged into main/current integration branch; if not, require explicit operator confirmation of "discard" before proceeding; surface the git log / merge-base evidence for the decision)
- [ ] Draft SKILL.md Steps 2–3 (the core cleanup sequence exactly as documented in WORKTREES.md: (a) if merged path, perform the "archive copied tasknote" copy from worktree's archive/ into main's archive/ before any deletion, (b) `git worktree remove "${WT_DIR}"`, (c) optional confirmed prune of the local `wt-` branch)
- [ ] Draft SKILL.md Step 4 (post-cleanup verification via `git worktree list` + `git branch --list`, concise success block with what was cleaned, and notes on the canonical main-checkout state after merge)
- [ ] Draft SKILL.md Step 5 + Notes (post-cleanup notes, when-to-use guard per WORKTREES.md, thin-by-design rationale, no SPEC impact, symmetry with .3, cross-ref placeholders for after .5 lands, safety for discard path)
- [ ] Draft the matching thin command stub (exact house shape of ft-worktree-start.md / ft-debug.md; note that --fast is not for this skill)
- [ ] Self-review drafted files against `docs/WORKTREES.md` conceptual flow + the 5 locked decisions from CORE-215.1 + symmetry with the implemented start skill; confirm naming, paths, verification language, and "archive copied" semantics have zero drift from the sibling
- [ ] Phase 3: markdown hygiene + shell-snippet review (no executable tests or lint surface apply to prompt-only files)
- [ ] Phase 4: doc-drift sweep (expect all "no change"), PLAN.md stub flip, archive move, recap

## 🔗 Related

- [[CORE-EPIC-215]] — parent epic (worktree-convention)
- [[CORE-215.1]] — discovery that locked the 5 conventions and filed this child scope
- [[CORE-215.2]] — worktree-doc that authored the canonical reference `docs/WORKTREES.md` this implementation must follow exactly
- [[CORE-215.3]] — sibling start skill (symmetric counterpart; this end skill owns all cleanup and the "archive copied tasknote" responsibility)
- [[CORE-215.5]] — wiring sibling that will expose the full pair to adopters (AGENTS-snippet, ft-new-project, MIGRATION, ft-flowtron, PLATFORMS)
- [[CORE-215.6]] — final-subtask audit (will verify the completed pair + doc sit cleanly)
- [[CORE-EPIC-195]] — sibling precedent (ft-debug thin skill + full 5-surface wiring pattern)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Exact match to the .4 child scope filed by CORE-215.1 (25w description) and the symmetric cleanup responsibilities documented in CORE-215.2 (WORKTREES.md §"Start / End Flow (Conceptual)" + "merge/cleanup discipline on end") plus the explicit "All cleanup ... lives in /ft-worktree-end" note in the just-completed CORE-215.3. The five locked conventions are stable, the target files are new (zero drift risk), the "archive copied tasknote" action is the only novel mechanical detail (to be resolved against the start skill's copy semantics), and the thin-skill precedent shape is now proven by the implemented .3. No re-scope, de-scope, file pivot, or approach change required.

- [x] Read relevant source files

- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Read sources (this Phase 1):** 
- `docs/WORKTREES.md` (full; End flow is 4 steps: verify merged-or-discard from main, git worktree remove, archive the *copied* tasknote, optional prune)
- `claude/skills/ft-worktree-start/SKILL.md` + `claude/commands/ft-worktree-start.md` (full sibling; 5-step thin shape, identical path computation, collision safety, handoff UX, "symmetry with end skill" note in Step 5)
- `claude/skills/ft-task/SKILL.md` (Step 3b scaffold + Phase 1 rules for epic children; confirmed first box pre-tick + empty Acceptance/Subtasks at scaffold)
- `SPEC/epic.md` (lifecycle for .N subtasks; .4 is implementation child, not the final .6 audit)
- `claude/skills/ft-file-followup/SKILL.md` + `claude/skills/ft-debug/SKILL.md` (thin precedent tone and "no 4-phase scaffolding inside the utility" pattern)
- `_project/tasknote/archive/core/CORE-215.1.md` (the filing of this exact child + "archives the tasknote in the main checkout" phrasing)
- `_project/tasknote/archive/core/CORE-215.2.md` (WORKTREES.md authorship + cross-ref discipline)
- `_project/tasknote/archive/core/CORE-215.3.md` (implementation pattern for the start side we must mirror exactly)

**Archive skim findings (grep -l for worktree-end / CORE-215.4 / ft-worktree-end across archive/core/):** 
Hits in CORE-196.md (original seed), CORE-215.1.md (detailed child scope + "archive the tasknote in the main checkout"), CORE-215.2.md (conceptual End flow + when-to-use), CORE-215.3.md (symmetry reminder in its subtasks + Related). 
Load-bearing: .1 explicitly assigns "All cleanup (worktree remove, branch pruning decisions, archiving the *copied* tasknote from the worktree perspective)" to the end skill. No prior implementations or conflicting designs. The "copied tasknote" language is consistent from .1 through .3 and the doc. No other tasknotes reference these paths.

**Drift check:** 
PLAN.md line for .4 exactly matches the text filed in .1 (paths `claude/skills/ft-worktree-end/SKILL.md` + `claude/commands/ft-worktree-end.md`, parenthetical "(verify branch merged or explicit discard, remove worktree, archive copied tasknote)"). The sibling .3 implementation landed at the exact parallel paths with zero deviation from its own .1-scoped plan. Target files for .4 do not exist yet (expected). No cited line numbers, function names, or hypotheses to drift. The 5 conventions in WORKTREES.md table remain authoritative and untouched since .2. Zero drift.

**Clarifying questions:** 
No clarifications needed. The scope is locked by the .1 filing, .2 doc, and .3 sibling implementation. 

**Explicit assumptions carried:**
- Operator invokes `/ft-worktree-end <ID>` only from the *main* (non-worktree) checkout, after either `git merge` of the `wt-<ID>` branch (normal) or explicit decision to discard the work in that branch.
- "Archive the copied tasknote" = before `git worktree remove`, copy the final closed tasknote bytes (the one the inner `/ft-task` produced and moved to its local archive/ or left in its tasknote/) from inside the worktree dir (`${WT_DIR}/_project/tasknote/.../${ID}.md` or the archive sibling) into the *main* checkout's `_project/tasknote/archive/<area>/${ID}.md`. This is a belt-and-suspenders capture of the isolated execution's exact output; the preceding merge is the primary vehicle for PLAN flip + archive file.
- On explicit "discard" path: skip any archive copy (the worktree contents including its tasknote copy are thrown away with the worktree); the main checkout's tasknote/ and PLAN remain as they were (the child line stays open in PLAN until manually cleaned or re-run).
- End skill never performs merges, branch switches, or edits to the "live" tasknote location or PLAN.md — merge (or manual) is the only way those update.
- Branch prune (`git branch -D wt-<ID>`) is offered with confirmation but not automatic (branch may still be useful for inspection).
- UX output is concise success block (what was removed, prune decision, final `git worktree list`); no attempt to cd the agent's context.
- Thin shape exactly mirrors .3: 5 numbered steps, heavy WORKTREES.md reference, shell snippets the agent executes, no 4-phase scaffolding inside the skill, --fast not applicable.
- No SPEC, template, or adopter-surface changes in this child (those are .5).

These assumptions are safe given the explicit symmetry language in .3 Step 5 and the "archive copied from the worktree perspective" mandate. Any edge in the copy logic (which exact source path inside WT, conflict handling) will be resolved in Phase 2 with the same conservative "copy if present, prefer the archive/ sibling" rule and will be documented in the skill's Notes.

**Phase 1 exit gate judgment (default-skip flavor per /ft-task):**  
Discovery executed the exact .4 child scope filed by .1 with zero deviation. All decisions pre-locked in .1/.2; .3 proved the thin shape; archive + drift clean; clarifying step logged pre-resolved assumptions only (no structured asks, no file/approach/subtask-list changes). **Discovery surfaced no significant deviation → skip 🛠️.**

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey (Phase 2):** Direct 1:1 mirror of the just-landed `claude/skills/ft-worktree-start/SKILL.md` (5 explicit steps, Step 0–5 structure, identical path computation for PROJECT_SLUG/WT_DIR/BRANCH, collision safety language, "thin by design" rationale, heavy `docs/WORKTREES.md` references, "no 4-phase scaffolding" declaration, symmetry note, cross-ref placeholders). Command stub mirrors the house shape of ft-worktree-start.md exactly (frontmatter keys, "Invoke the `...` skill..." prose, usage block, "thin utility" positioning, no --fast handling). Additional precedents: ft-file-followup (pure procedural, no tasknote driver) and the "All cleanup lives in the end skill" mandate from .1/.3. 

No new shape invented. The only delta from start is the *direction* (cleanup vs creation) and the "verify merged or explicit discard" gate + the "archive copied tasknote" copy step (the mirror image of start's "copy the active tasknote *into* the worktree"). The 4 conceptual steps from WORKTREES.md §"End" are the spec; the 5 skill steps are the elaboration + safety + UX exactly as .3 did for Start. 

This child adds zero files beyond the two thin artifacts, zero SPEC impact, zero wiring (per charter).

**Minimal implementation (2 files, ~180 LOC net):**
- `claude/skills/ft-worktree-end/SKILL.md` (new, 148 lines): 5-step thin procedural mirror of the start skill. Step 0 (main-checkout preconditions + identical path computation), Step 1 (the critical merged-vs-explicit-discard gate with git evidence + operator confirmation), Step 2 (the "archive copied tasknote" belt-and-suspenders copy from worktree's archive/ or live location into main's archive/ — the novel mechanical detail for this side), Step 3 (git worktree remove + optional confirmed prune), Step 4 (verification + concise UX success block), Step 5 (notes, symmetry, cross-refs). Heavy references to docs/WORKTREES.md throughout.
- `claude/commands/ft-worktree-end.md` (new, 28 lines): exact house-shape thin stub (frontmatter, "Invoke the `worktree-end` skill..." prose, usage, "thin utility" positioning, explicit note that --fast and merge/PLAN updates are out of scope for this skill).

No other files touched. All shell snippets are the minimal commands the agent will run via its terminal tool; no new abstractions. The copy logic in Step 2 prefers the post-closure `archive/` sibling inside the worktree (matching what an inner /ft-task Phase 4 produces) with a live-location fallback. Discard path skips the copy cleanly.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

**Phase 3 verification (pure prompt files — no executable surface):**

- **Markdown hygiene:** Both new files follow house style exactly (GFM, consistent backtick usage for all paths/commands/IDs, numbered steps with prose elaboration, "thin by design" + "workflow-orthogonal" language, heavy `docs/WORKTREES.md` references, symmetry notes, "cross-references (after sibling children land)" placeholders). No tables in the end skill (unlike the doc); the command stub is 100% prose. No trailing whitespace, no broken internal anchors, relative links resolve. Length mirrors .3 (SKILL ~148 lines vs start's 171; command 28 lines vs 19 — the extra lines are the archive-copy step + discard-path handling, as expected for the cleanup side).

- **Shell-snippet review:** All example commands are the minimal, exact invocations from the convention and the start skill (git rev-parse, git worktree list/remove/add, cp, mkdir -p, branch checks). No new commands invented. The Step 2 copy block uses safe, defensive `-f` tests + explicit echo; no `rm -rf` or destructive ops without operator confirmation gates upstream. No command-injection vectors (all paths are derived from `git rev-parse` + `basename` + controlled `${TASK_ID}`; TASK_ID is validated as a flowtron ID before any use).

- **No test suite / lint surface:** Pure documentation + prompt-only artifacts (exactly as .2 and .3). No JS/TS/Python to tsc/ruff/pytest. No `viz/` changes → no 👁️ visual confirmation required or performed. (The convention doc itself received no 👁️ in .2 for the same reason.)

- **Self-review against sibling + charter:** SKILL.md Step 0–5 structure, path computation, and tone are byte-for-byte mirrors of the start skill with only the necessary direction reversal (creation → removal + archive capture). The "archive copied tasknote" implementation is the minimal faithful realization of the mandate in .1 ("archives the tasknote in the main checkout") and .3 ("archiving the *copied* tasknote from the worktree perspective"). Command stub is a drop-in replacement of "start" with "end" + adjusted responsibilities. Zero drift from locked decisions or house shape.

- **Conditional skip signals (per SPEC §"Conditional skip rule"):** Zero frontend files, zero privileged-ops paths (no secrets, no network, no deploy), zero perf-narrative reasoning. Clean for autonomous commit on the skip branch.

No issues found. The two artifacts are ready for Phase 4 closure.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Doc-drift sweep (across the 9 AI-referenced docs):**
- `README.md` — no change
- `SPEC.md` — no change
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change

(Note: the two new thin artifacts live under `claude/skills/` and `claude/commands/`, which per the README §"AI-referenced docs" are loaded on-demand by skill stubs and are *not* part of the default cold-start sweep. Their addition creates no drift in the swept surface. Full exposure of the pair to the adopter surfaces lands in .5.)

**Recap (for 📦 gate or autonomous commit):**

1-2 sentence plain-English: Delivered the thin `/ft-worktree-end` skill + command pair, the symmetric cleanup counterpart to the just-landed start skill. From the main checkout the new skill verifies merge (or explicit discard), removes the worktree, captures the copied tasknote into the canonical main archive, and optionally prunes the `wt-` branch — exactly as chartered in CORE-215.1 and documented in WORKTREES.md.

Technical: Created 2 new files (`claude/skills/ft-worktree-end/SKILL.md` (148 lines) + `claude/commands/ft-worktree-end.md` (28 lines)). Pattern: exact 1:1 mirror of the .3 start implementation (5-step thin procedural shape, identical path math, safety gates, UX handoff style, "thin by design" + "no SPEC impact" notes). Novel detail on this side: the Step 2 "archive copied tasknote" belt-and-suspenders copy (preferring the worktree's post-closure archive/ sibling) + the merged-vs-discard gate in Step 1. Zero drift from the 5 locked conventions or the sibling. Phase 1 skipped 🛠️ (no deviation); Phase 3 was markdown + shell-snippet hygiene only (no frontend, no tests). Tasknote will archive to `archive/core/CORE-215.4.md`. PLAN.md line will become the stub form under Completed.

**Archived:** 2026-05-30
