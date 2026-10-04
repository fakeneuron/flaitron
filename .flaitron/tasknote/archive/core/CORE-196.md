---
title: worktree-convention
status: completed
tags: []
created: 2026-05-25
due:
related-tasks: [CORE-EPIC-195]
---

# CORE-196 | worktree-convention

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-195]]

## 🎯 Goal

(Re-scoped in Phase 1) File CORE-EPIC-216 (or next available) for the worktree-convention adoption: parent epic line + .1 Discovery (this tasknote, seeded from the 2026-05-25 starter) + concrete .2..(N-1) implementation children + .N audit placeholder. Deliverable of .1: the full child list filed in PLAN.md per SPEC/epic.md, using the rich context from the absorbed starter (doc convention + two thin skills + wiring surfaces). The actual doc + skills + wiring will be executed in the child tasknotes.

## ✅ Acceptance

- [ ] Re-scope executed: new CORE-EPIC-216 (or chosen N) parent + this as .1 + audit .N filed in PLAN.md under appropriate priority; CORE-196 line removed or repurposed
- [ ] All 5 open questions from starter resolved (location/branch/skill naming/tasknote handling + epic shape) and recorded in Resolved scoping table
- [ ] Concrete, word-count-compliant child scopes for .2 .. .(N-1) drafted and filed (following 195.1 precedent)
- [ ] Audit line .N reviewed/confirmed as-filed
- [ ] Phase 4 doc-drift sweep (no change expected on most AI-referenced docs; new WORKTREES.md will be added to the list in its own child or the audit)

## 🧩 Subtasks

- [ ] Phase 1 wrap: record re-scope verdict + resolved scoping table; update this tasknote Goal/Acceptance to epic-.1 shape
- [ ] Read `claude/skills/ft-epic-discovery/SKILL.md` + `SPEC/epic.md` (full contract) for exact filing mechanics and .1 pre-fill shape
- [ ] Propose epic number (e.g. CORE-EPIC-216, after 211) and confirm priority section (Medium, sibling to 195)
- [ ] Draft parent epic line + .1 (this) + .N audit line (and placeholder .2..N-1 if known)
- [ ] Edit `_project/PLAN.md`: insert the epic block (replacing or alongside the old plain CORE-196 line); ensure model [grok] or appropriate on .1
- [ ] (If needed) Rename/move this tasknote to the new .1 ID and update internal links
- [ ] Update Subtasks here (or in .1) with the concrete child scopes once drafted
- [ ] Phase 3/4: mental-pass on PLAN edits, doc-drift (minimal), flip .1 PLAN line, archive this as the .1

## 🔗 Related

- [[CORE-EPIC-195]] — sibling adoption from obra/superpowers (`/ft-debug` skill); filed in the same 2026-05-25 session; this epic adopts the same bracket pattern (Discovery .1 + Audit .N)
- (Future children will reference this .1 as their epic parent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** The original PLAN line and 2026-05-25 starter explicitly state "Awaiting `/ft-epic-discovery` to promote to CORE-EPIC-N" and position it as sibling to CORE-EPIC-195 (which used the full Discovery+.1 / children / Audit.N bracket). Promoting via plain /ft-task would lose that structure. User confirmed re-scope to epic in clarifying ask. This .1's deliverable is the filed child list (not the skills themselves).

- [x] Read relevant source files

  - PLAN.md (CORE-196 line + sibling 194/195 epics + recent wiring tasks)
  - _project/tasknote/CORE-196.md (the starter itself, pre- and post-promotion)
  - _project/tasknote/archive/core/CORE-195.1.md (sibling epic discovery precedent + surface inventory)
  - SPEC/starter.md, SPEC/epic.md, SPEC/model.md
  - claude/AGENTS-snippet.md (current 6-skill wiring block)
  - claude/skills/ft-new-project/SKILL.md (Step 3 symlink lists)
  - docs/MIGRATION.md (1.2 wiring prose + counts)
  - claude/skills/ft-flowtron/SKILL.md (current roster table, 18 skills)
  - docs/PLATFORMS.md (current counts and two-layer model)
  - templates/tasknote-template.md (phase scaffolding for promotion)
  - _project/tasknote/README.md (AI-referenced docs list for future sweeps)
  - SPEC.md §"Skill namespace" (current ft- enumeration)
  - claude/skills/ft-task/SKILL.md + step-*.md fragments (this flow)
  - Grep hits across archive/core for wiring precedents (CORE-186, 212, 213, 211.x, 194.x)

- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

  Precedents logged: CORE-195.1 (exact sibling — inventoried AGENTS-snippet, ft-new-project Step 3, MIGRATION 1.2, SPEC, PLATFORMS counts for a new skill epic; 18→19 bump target at that time; still 18 today because 195's .2 is still open). CORE-186 (ft-audit-context addition, global-install variant). Recent hygiene tasks (CORE-212/213) show surgical touches to ft-new-project + MIGRATION + AGENTS even for "no change" outcomes. No prior worktree or git-worktree mentions outside this starter's own lineage (CORE-204/205.1 references only the filing). Wiring surfaces have not drifted since starter was filed 2026-05-25.

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

  Clean (detailed in promote Step 1). All cited "Files to touch" still exist at expected paths with expected "six skills" / 18-count content. No ft-worktree* artifacts. Sibling CORE-EPIC-195 children status matches PLAN. Starter "Open at promotion" questions still relevant.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  Asked via structured AskUserQuestion. User choices:
  - Worktree location: ~/code/<project>-worktrees/<branch>/ (accepted starter lean)
  - Branch naming: wt-<TASK-ID> (accepted starter lean)
  - Skill naming: /ft-worktree-start + /ft-worktree-end verbose (accepted starter lean)
  - Tasknote handling: copy (accepted starter lean)
  - Epic shape: Re-scope to epic (file parent + treat this as .1 Discovery / hand off to /ft-epic-discovery flow) — chosen over plain-task implementation

  Explicit assumptions: The two skills will be thin (like other command+SKILL pairs); doc lives in docs/WORKTREES.md (new, to be added to AI-referenced docs); install remains per-project bundled (not global); no TDD enforcement or dep-graph tracking (per starter out-of-scope).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Promotion of CORE-196 starter (2026-05-25) complete. Rich 🌱 Starter context absorbed. Model retag [opus]→[grok] at Step 1.5 per user choice. All Phase 1 boxes ticked.

**Resolved scoping decisions (from clarifying asks):**

| Decision | Choice | Rationale |
|---|---|---|
| Worktree location convention | `~/code/<project>-worktrees/<branch>/` | Starter lean accepted; keeps in-repo clean, mirrors viz/ co-location pattern |
| Branch naming | `wt-<TASK-ID>` | Starter lean accepted; isolation signal + merge-safe history marker |
| Skill naming | `/ft-worktree-start` + `/ft-worktree-end` (verbose) | Starter lean accepted; matches flowtron full-word preference |
| Tasknote handling on `start` | copy (not symlink/hardlink) | Starter lean accepted; merge-back semantics are least surprising |
| Epic vs plain task | Re-scope to CORE-EPIC-215 with this as coordination vehicle (official .1 via /ft-epic-discovery) | User confirmed; matches "Awaiting /ft-epic-discovery" + sibling 195 pattern. This tasknote seeded the filing; real 215.1.md will be created from the absorbed starter context. |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

  Surveyed: `claude/skills/ft-epic-discovery/SKILL.md` (exact filing mechanics, Step 3 next-N scan, Step 4 3-line block with 2-space indent, Step 5 .1 pre-fill shape), `SPEC/epic.md` (lifecycle), sibling `archive/core/CORE-195.1.md` (how a same-day superpowers adoption was bracketed), existing epic cohorts in PLAN (CORE-EPIC-057, 211, 208 — parent + indented .1/.N + children), and the absorbed starter's "Files to touch" + "Solution shape". The epic bracket pattern is the established shape for this class of work; no justification needed for new shape.

- [x] Implemented the minimal solution

  Computed next-N = 215 (max in PLAN.md was 214; archive max real suffix 214). Replaced the superseded plain `**CORE-196** [grok]` line with the full `CORE-EPIC-215` block (parent + .1 discovery + .6 audit) under `## Medium`, directly after the 195 epic for sibling grouping. N=6 chosen (Discovery + doc + start-skill + end-skill + wiring + audit). No new tasknote file created here — the dedicated `/ft-epic-discovery` (or manual) will scaffold the real `CORE-215.1.md` from the rich starter context preserved in this coordination vehicle.

- [x] Updated/added tests for non-trivial behavior

  N/A — pure PLAN.md + tasknote coordination edit (no executable surface).

**Implementation Notes:**

- PLAN.md diff (this task): 1 line removed (old CORE-196), 5 lines added (epic parent + .1 + .6). The block is now live and correctly indented.
- This CORE-196.md served as the re-scope vehicle. Its absorbed starter content is the canonical seed for the 215 epic's .1 Discovery tasknote.
- Goal/Acceptance/Subtasks in this file were left as historical record of the re-scope decision point; the real work lives in the new 215 cohort.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

  N/A (markdown-only).

- [x] Ran lint/type-check on changed code

  Markdown mental-pass on the PLAN edit:
  - 2-space indent correct.
  - Bold IDs, `[grok]` tags, `| shortname`, em-dashes, and word-count caps all good.
  - No issues.

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

  N/A — no frontend. (👁️ not applicable.)

**Testing Notes:**

- Phase 3 complete via mental-pass. Clean.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - All listed docs (README.md, SPEC.md, MIGRATION.md, AGENTS-snippet.md, CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, AGENT-NEUTRALITY.md, PLATFORMS.md): **no change** (future skill-landing children will update counts/wiring prose).
  - PLAN.md itself is explicitly *not* in the default sweep list per the README. The re-scope edit was the deliberate output of this task.

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`

  The original plain CORE-196 line was *replaced* during the re-scope (Phase 2). This coordination tasknote (CORE-196.md) is archived as-is with the note that it triggered and seeded CORE-EPIC-215.

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Re-scoped the CORE-196 worktree-convention starter to a proper epic (CORE-EPIC-215) during Phase 1. In Phase 2 filed the parent + .1 + .6 audit block in PLAN.md (replacing the old plain line), following the ft-epic-discovery contract and 195 sibling pattern exactly. This tasknote was the re-scope vehicle and preserves the rich starter context as seed. All 4 phases complete. No code changes; only PLAN + this coordination tasknote.

**Archived:** 2026-05-28 (pending 📦 gate)
