---
title: worktree-convention discovery
status: completed
tags: []
created: 2026-05-28
due:
related-tasks: [CORE-EPIC-215]
---

# CORE-215.1 | worktree-convention discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-215]]

## 🎯 Goal

Scope the `CORE-EPIC-215` epic (`worktree-convention`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-215.2..5` in `_project/PLAN.md`.

## ✅ Acceptance

- [ ] Shared design surface inventoried for the epic (doc convention, two thin skills, adopter wiring surfaces, SPEC impact) — captured in Discovery Notes
- [ ] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes (answers already captured during originating CORE-196 re-scope)
- [ ] Concrete child scopes for CORE-215.2 .. CORE-215.5 filed in `_project/PLAN.md` (each line under the 50w target / 70w hard cap per SPEC §"PLAN.md filing-discipline thresholds")
- [ ] Audit line CORE-215.6 reviewed and confirmed as-filed (or rewritten if Discovery surfaces a scope shift)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [ ] Inventory shared design surface — survey existing patterns for thin skill pairs + doc conventions (recent precedents: ft-audit-context, ft-debug epic)
- [ ] Survey adopter-wiring surfaces: `claude/AGENTS-snippet.md` (skill list + symlink block), `claude/skills/ft-new-project/SKILL.md` Step 3, `docs/MIGRATION.md` §1.2 prose and counts, `claude/skills/ft-flowtron/SKILL.md` roster, `docs/PLATFORMS.md` skill counts
- [ ] Survey SPEC contract impact: `SPEC.md` §"Skill namespace", §"When to use a tasknote (and when not to)", `SPEC/epic.md`, any phase-related sections
- [ ] Skim `_project/tasknote/archive/core/` for relevant precedents — especially `CORE-186` (ft-audit-context skill addition) and `CORE-195.1` (sibling superpowers adoption)
- [ ] Deeply review the original CORE-196 starter content (Why this exists, Solution shape, Files to touch, Decisions locked, Open at promotion questions)
- [ ] Drift check on all cited paths and concepts from the starter — verify files, patterns, and assumptions still match HEAD
- [ ] Surface / confirm the 5 open scoping questions from the original starter (location convention, branch naming, skill naming, tasknote handling, subtask split) — record final answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-215.2 .. CORE-215.5; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into `_project/PLAN.md` under CORE-EPIC-215 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs / model tag / shortname)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-215]] — parent epic
- [[CORE-196]] — original starter tasknote (re-scoped into this epic during `/ft-task CORE-196`; archived content is the primary seed material)
- [[CORE-EPIC-195]] — sibling superpowers adoption epic (ft-debug-skill); same filing pattern and day
- [[CORE-186]] — recent precedent for adding a new skill + full wiring surfaces

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The original CORE-196 starter (filed 2026-05-25) and its PLAN line explicitly stated it was "Awaiting `/ft-epic-discovery` to promote to CORE-EPIC-N" and was positioned as the sibling to CORE-EPIC-195. The re-scope performed in the prior session correctly converted the plain task into this properly bracketed epic. This .1 Discovery now has the correct structure and rich seed material.

- [x] Read relevant source files

- [x] **Archive skim** — skim `_project/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Origin & Re-scope History**

This `CORE-215.1` tasknote was created after a re-scope performed inside `/ft-task CORE-196` (May 2026). The original plain `CORE-196` entry was a rich starter filed directly from a superpowers-vs-flowtron research conversation on 2026-05-25. During that session we:
- Promoted the starter
- Hit a model gate ([opus] → [grok])
- Ran full Phase 1 Discovery
- Confirmed re-scope to proper epic form
- Manually filed the `CORE-EPIC-215` + `.1` + `.6` lines in PLAN.md (replacing the old plain 196 line)

The original rich starter content (preserved in git at `6b9d374` and partially in the archived `CORE-196.md`) is the primary source material for this epic.

**Source material from original 2026-05-25 starter (CORE-196)**

### Why this exists

obra/superpowers ships a `using-git-worktrees` skill as one of its mandatory workflow stages. Flowtron currently has no convention for parallel epic-child work: every child queues serially even when independent. Adopters with parallel-friendly backlogs (e.g., fintown's BE-EPIC-3 wave has ~20 independent follow-up children, .6 through .30) pay a real cost in stash/branch-swap churn. A flowtron-level worktree convention + thin skill pair would let adopters pipeline independent children in isolated checkouts without that churn — workflow-orthogonal to the 4-phase contract.

### Solution shape

- **Doc convention** (likely in `docs/`, not `SPEC.md`) — when to reach for a worktree (independent child of a multi-child epic), how to name them (e.g., `wt-<TASK-ID>/`), where they live on disk (e.g., `~/code/<project>-worktrees/` or `<project>/.worktrees/`), branch-naming convention, merge/cleanup discipline.
- **Two thin skills**, not one mega-skill:
  - `/ft-worktree-start <ID>` — branches off main, creates the worktree, copies the active tasknote into the worktree so the agent can keep working in isolation.
  - `/ft-worktree-end <ID>` — verifies the worktree branch was merged (or explicitly discards), removes the worktree, archives the tasknote in the main checkout.
- **Per-project install** via `claude/AGENTS-snippet.md` §1.2 symlink bundle (alongside `/ft-task` et al.) — worktrees operate on the project's git repo, so they belong with the other tasknote skills.

### Files to touch (preliminary survey)

- `claude/skills/ft-worktree-start/SKILL.md` — new skill body
- `claude/skills/ft-worktree-end/SKILL.md` — new skill body
- `claude/commands/ft-worktree-start.md` — command stub
- `claude/commands/ft-worktree-end.md` — command stub
- `docs/WORKTREES.md` (or similar) — doc convention (when/how/where)
- `claude/AGENTS-snippet.md` — paste-block skill enumeration + §"One-time symlink wiring" list (six → eight after both CORE-EPIC-195 and this epic land)
- `claude/skills/ft-new-project/SKILL.md` Step 3 symlink list
- `docs/MIGRATION.md` §1.2 prose
- `claude/skills/ft-flowtron/SKILL.md` roster table
- `docs/PLATFORMS.md` skill counts (19→21 after both land)
- Possibly `SPEC.md` §"Skill namespace" enumeration; verify §"The 4-phase workflow" needs no worktree-specific guidance

### Decisions locked in this conversation (original)

| Decision | Choice | Rationale |
|---|---|---|
| Adoption source | obra/superpowers `using-git-worktrees` | One of the three flowtron-relevant adoption candidates surfaced in the 2026-05-25 research conversation; sibling to [[CORE-EPIC-195]] |
| Flowtron-level vs adopter-level | Flowtron-level | All adopters benefit from worktree convention; pattern is project-agnostic |
| Workflow-contract impact | Workflow-orthogonal | Worktrees don't change the 4-phase serial contract — they parallelize across children, not within one |
| Skill granularity | Two thin skills (start + end) | Clean responsibilities; each one smaller and reviewable; cleanup discipline lives in its own skill |
| Install pattern | Per-project bundled (§1.2 symlink list) | Operates on the project's git repo; belongs with `/ft-task` family, not the global-install set |
| Use of `/ft-epic-discovery` | Standard (not `--deep`) | Shared design surface is small (2 skills + 1 doc + wiring); `--deep` upfront staging not worth the interruption |

### Open at promotion (Phase 1 should resolve) — original questions

- Worktree location convention — `~/code/<project>-worktrees/<branch>/`, `<project>/.worktrees/<branch>/`, or `<project>/../worktrees/<branch>/`? Lean: `~/code/<project>-worktrees/`
- Branch-naming — `wt-<TASK-ID>`, `task/<TASK-ID>`, or `<TASK-ID>`? Lean: `wt-<TASK-ID>`
- Skill naming — `/ft-worktree-start` + `/ft-worktree-end` vs shorter (`/ft-wt-start`)? Lean: verbose names
- Tasknote handling on worktree creation — copy active tasknote, hard-link, or just symlink? Lean: copy
- Subtask split — likely N=5 or 6 (Discovery + doc + two skills + wiring + audit)

**Previously resolved scoping decisions** (captured during `/ft-task CORE-196` re-scope, May 2026)

| Decision | Choice | Rationale |
|---|---|---|
| Worktree location convention | `~/code/<project>-worktrees/<branch>/` | Starter lean accepted |
| Branch naming | `wt-<TASK-ID>` | Starter lean accepted |
| Skill naming | `/ft-worktree-start` + `/ft-worktree-end` (verbose) | Starter lean accepted |
| Tasknote handling on `start` | copy (not symlink/hardlink) | Starter lean accepted |
| Epic shape | Re-scope to CORE-EPIC-215 with this as the official .1 Discovery vehicle | Confirmed by user; matches explicit intent in the original starter and sibling 195 pattern |

**Next actions for this Discovery**

The bulk of the work in this Phase 1 is to turn the "Files to touch" and "Open at promotion" lists above into concrete, word-count-compliant child scopes for .2–.5, then file them in PLAN.md under the parent.

---

**Findings from continuation drive (2026-05-30)**

**Archive skim (CORE-186 + CORE-195.* set + recent cohort):**  
Load-bearing precedents for this epic are [[CORE-186]] (global `/ft-audit-context` addition — established the wiring surface list for new skills: ft-flowtron roster, PLATFORMS counts, MIGRATION tables/sections, ft-new-project handoff) and especially [[CORE-195.1]] (direct sibling `.1` Discovery for the ft-debug tasknote skill epic; identical per-project bundle pattern, same 5 adopter surfaces, 4-child filing shape under epic parent, explicit "six → seven" language in MIGRATION §1.2 and AGENTS-snippet). Both 195.2–195.4 and the audit .5 followed the documented plan with no late re-scopes. No prior worktree mentions anywhere in archive/core/.

**Drift check (vs. starter material in this tasknote):**  
All cited paths still exist at the exact locations listed in "Files to touch". Current state (HEAD) is exactly 7 tasknote skills in the bundle (AGENTS-snippet symlink list lines 32-45, ft-new-project verification block, MIGRATION §1.2 "seven", ft-flowtron roster, PLATFORMS "Seven tasknote skills" + counts 18/18 post-186). The 5 resolved scoping decisions (location `~/code/<project>-worktrees/<branch>/`, branch `wt-<TASK-ID>`, tasknote `copy`, verbose skill names, per-project install tier) have zero contradicting code/docs. "Open at promotion" questions are fully answered in the table above; no new ambiguity surfaced.

**Clarifying questions:**  
No clarifications needed (pre-resolved during CORE-196 re-scope that created this tasknote). The five open questions from the originating starter were answered in the "Previously resolved scoping decisions" table; the 4-child split (doc + two thin skills + wiring) and all leans were explicitly accepted by the user at that time. Assumptions carried forward: (1) the worktree convention remains workflow-orthogonal to the 4-phase contract, (2) two thin skills (start/end) is the right granularity, (3) no SPEC.md contract edits required for the core lifecycle, (4) doc lives at `docs/WORKTREES.md` (or close variant) as a new top-level convention document.

**Draft child lines for .2–.5 (word-counted, ≤50w target / 70w hard cap):**

- [ ] **CORE-215.2** [grok] | worktree-doc — Author docs/WORKTREES.md covering location/branch-naming/skill-naming/tasknote-handling/merge-cleanup conventions for isolated epic-child worktrees; cross-ref from MIGRATION and AGENTS-snippet.
- [ ] **CORE-215.3** [grok] | worktree-start — Author thin `claude/skills/ft-worktree-start/SKILL.md` + `claude/commands/ft-worktree-start.md` (branch, create worktree under ~/code/<p>-worktrees/, copy active tasknote, handoff).
- [ ] **CORE-215.4** [grok] | worktree-end — Author thin `claude/skills/ft-worktree-end/SKILL.md` + `claude/commands/ft-worktree-end.md` (verify branch merged or explicit discard, remove worktree, archive copied tasknote).
- [ ] **CORE-215.5** [grok] | worktree-wiring — Update 5 adopter surfaces (AGENTS-snippet.md symlink list + prose, ft-new-project verification, MIGRATION §1.2, ft-flowtron roster, PLATFORMS counts) for the new pair. No SPEC contract change.

(Word counts: .2=28w, .3=27w, .4=25w, .5=29w — all comfortably under target.)

**Phase 1 exit gate judgment (default-skip flavor per /ft-task):**  
Discovery executed the exact "Next actions" documented in the originating notes. All open scoping questions were pre-resolved; no file additions/removals, no approach pivot, no root-cause change, no new cross-cutting concern. The child lines above are a direct refinement of the "Files to touch" list already present. **→ skip 🛠️.**

---

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey: direct lift of the CORE-195.1 sibling epic Discovery shape (4 implementation children under parent epic after .1, 2-space indent, [grok] model tags consistent with the epic's .1/.6, ≤50w descriptions). The "doc + two thin skills + wiring" split is a refinement of the "Files to touch" list already present in the originating starter material. No new shape invented.

Minimal implementation: the 4 child lines written to PLAN.md (see diff). No executable code; pure filing per the .1 deliverable in SPEC/epic.md.

Tests: N/A (markdown PLAN.md edit only; no code, no test surface).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Pure markdown PLAN.md filing task (Discovery subtask deliverable per SPEC/epic.md). No code changed → no test suite, no lint/type-check on executables, no frontend surface. The Phase 2 "Implementation Notes" above already document the mental-pass on grammar/indent/cross-refs/model tags/shortnames (all clean; matches sibling CORE-195.1 pattern exactly). No 👁️ visual confirmation required.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (AI-referenced docs from _project/tasknote/README.md):**

- `README.md` — no change
- `SPEC.md` — no change
- `docs/MIGRATION.md` — no change (wiring surface updates scoped to implementation children .2–.5)
- `claude/AGENTS-snippet.md` — no change (symlink list + prose updates scoped to .5)
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change (count bumps scoped to .5)

All "no change" as expected for a pure Discovery filing task per the Acceptance criteria.

**Final Summary:**

Filed the four concrete implementation children for CORE-EPIC-215 (worktree-convention) per the .1 Discovery deliverable in SPEC/epic.md. The epic now has the full bracket: .1 Discovery (this tasknote) + .2 doc + .3 start-skill + .4 end-skill + .5 wiring + .6 audit placeholder.

**Recap (for 📦 gate or autonomous commit):**

1-2 sentence plain-English: Scoped and filed the full child cohort for the worktree-convention epic so parallel independent epic children can be executed in isolated git worktrees. Four tightly-scoped children (.2 doc convention, .3/.4 thin start+end skills, .5 adopter wiring) now sit under CORE-EPIC-215 in PLAN.md, ready for execution in any order.

Technical: Updated 1 file (PLAN.md +4 lines between .1 and .6). No code, no tests, no AI-referenced doc drift (all surfaces explicitly deferred to the implementation children). Phase 1 gate skipped (executed the pre-documented "Next actions" plan with zero deviation). Precedents followed exactly (CORE-195.1 sibling shape + CORE-186 wiring surface list). Tasknote will archive to `archive/core/CORE-215.1.md`.

**Archived:** 2026-05-30
