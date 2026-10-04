---
title: expand shipped skills
status: completed
tags: []
created: 2026-05-09
related-tasks: [CORE-049, CORE-057]
---

# CORE-054 | expand shipped skills

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-049]] [[CORE-057]]

## 🎯 Goal

Survey candidate flowtron skills beyond the current four (`task`, `starter-task`, `micro-task`, `new-project`), walk the candidate list with the user, and file approved candidates as children using [[CORE-049]]'s audit-then-cohort model.

## ✅ Acceptance

- [x] Candidate set walked with user; each given a verdict (drop / approve / defer)
- [x] Cohort shape decided — **single `CORE-EPIC-057`** with `.1` Discovery + `.2-.5` skill children + `.6` Audit (per "≥3 approved → epic" lean; 4 approvals)
- [x] Auto-wiring policy decided — **auto-symlink during `/new-project`** for adopter-relevant skills (`/epic-discovery`, `/close-epic`, `/file-followup`); `/release` stays flowtron-only
- [x] CORE-EPIC-057 + 6 child entries filed in PLAN.md (each with `[opus]` tag and concise description)
- [x] Version-bump intent confirmed at closure (minor — additive contract surface; bump fires only after all 4 child skills land, not at this task's closure)

## 🧩 Subtasks

- [x] Walk the six sketched candidates with the user, capturing per-candidate verdict + rationale (see Discovery Notes)
- [x] Surface any missing candidates the survey didn't sketch (none cleared the bar — see Discovery Notes)
- [x] Decide cohort shape — epic
- [x] Decide auto-wiring policy — auto-symlink for adopter-relevant; `/release` flowtron-only
- [x] File `CORE-EPIC-057` parent in PLAN.md Medium
- [x] File `CORE-057.1` Discovery child (scopes shared design before sibling children fire)
- [x] File `CORE-057.2` `/release` child
- [x] File `CORE-057.3` `/epic-discovery` child
- [x] File `CORE-057.4` `/close-epic` child
- [x] File `CORE-057.5` `/file-followup` child
- [x] File `CORE-057.6` Audit child (highest `.N` per SPEC/epic.md)

## 🔗 Related

- [[CORE-049]] — workflow token audit (precedent: survey-then-cohort filing model)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Six-candidate sketch in starter is concrete and well-scoped. Recent archive confirms strong precedent for two of them (`/release`: CORE-043/046/048; `/audit-skill`: CORE-049 + FE-018/CORE-056 in flight). The CORE-054/055/056 starter triple itself supplied empirical evidence for `/file-followup`'s gap. Worth proceeding.

- [x] Read relevant source files (existing `claude/skills/{task,starter-task,micro-task,new-project}/SKILL.md`; `claude/commands/*.md`; `docs/MIGRATION.md` §1.2 wire-symlinks block + "Pinning and bumping" section; `SPEC/epic.md`)
- [x] **Archive skim** — see Discovery Notes (CORE-043/046/048 release precedents; CORE-049 audit precedent; CORE-042 epic precedent)
- [x] **Drift check** — see Discovery Notes; one drift on starter's `/release` framing (`§3` → "Pinning and bumping" section)
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions (4-question AskUserQuestion walked the candidates + cohort shape + auto-wiring; all "Open at promotion" items resolved)
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Candidate-walk results (resolved 2026-05-09)

| Candidate | Verdict | Filed as | Rationale |
|---|---|---|---|
| `/release` | ✅ Approve | `CORE-057.2` | Strong precedent (CORE-043/046/048 = 3 release tasknotes with identical recipe). Flowtron-self only — not auto-wired into adopters. |
| `/audit-skill` | ❌ Drop | — | User dropped despite 3-audit precedent (CORE-049 + FE-018 + CORE-056). Reading: audit work is judgment-driven and doesn't slot well into a scaffolded skill; the precedent is legible enough as a pattern-by-example without ceremony. |
| `/epic-discovery` | ✅ Approve | `CORE-057.3` | Formalizes today's informal `<AREA>-<N>.1` Discovery convention (SPEC/epic.md). Auto-wired for adopters. |
| `/close-epic` | ✅ Approve | `CORE-057.4` | Symmetric pair with `/epic-discovery`. Acceptance always carries fixed doc-drift sweep line per SPEC/epic.md. Auto-wired for adopters. (My initial lean was defer-until-first-close; user shipped now for symmetry.) |
| `/file-followup` | ✅ Approve | `CORE-057.5` | The CORE-054/055/056 starter triple this week is empirical evidence — `/starter-task` is heavier than needed for "PLAN line + paragraph". Auto-wired for adopters. |
| out-of-scope (viz / project-domain skills) | ✅ Confirm | — | Belong in adopter `.claude/skills/`, not flowtron core. |

### Missing-candidate scan

Considered: `/blocked` (already inline in `/task`; no separate skill needed), `/promote-future` (too trivial), `/trim-restatement` (too narrow to recent CORE-050..053 cohort). Nothing else cleared the bar.

### Cohort shape & auto-wiring (resolved)

- **Shape:** single `CORE-EPIC-057` (4 approvals → epic per "≥3 → epic" lean).
- **Children:** `.1` Discovery (scopes shared design: install logic, slash-command stubs, MIGRATION.md §1.2 update plan, SPEC additions if any) → `.2`–`.5` one shipped skill each → `.6` Audit (verifies coherence with existing 4 shipped skills; fixed doc-drift sweep line per SPEC/epic.md).
- **Auto-wiring:** `/release` is flowtron-self only. `/epic-discovery`, `/close-epic`, `/file-followup` auto-symlink during `/new-project` alongside `/task /starter-task /micro-task`.
- **Model tags:** all `[opus]` — design + multi-file changes per global standards. Discovery may revisit if some skill implementations turn out to be mechanical post-design.

### Drift surfaced at promotion (2026-05-09):

- The starter's `/release` sketch cites "`docs/MIGRATION.md` §3 is manual" referring to submodule bumps. §3 is actually "Lightweight migration: current tasks only". The bump-related section is **"Pinning and bumping"** (heading at line ~301 of `docs/MIGRATION.md`). Reframe `/release` against that section during the Phase 1 walk.
- Shipped skills count confirmed at 4 (`task`, `starter-task`, `micro-task`, `new-project`).
- CORE-049 confirmed archived 2026-05-08 — audit-then-cohort precedent intact.

**Verbatim starter context (preserved at promotion 2026-05-09):**

> _Captured 2026-05-09 during post-CORE-053 retrospective — promote to full tasknote at `/task` checkout._
>
> ### Why this exists
>
> Flowtron currently ships 4 skills (`task`, `starter-task`, `micro-task`, `new-project`). Adopter workflows almost certainly have repetitive patterns that warrant additional shipped skills, but no systematic survey has been done. Mirror [[CORE-049]]'s audit-then-cohort model: survey candidates with rationale, walk with user, file approved children, implement.
>
> ### Solution shape (preliminary — survey at promotion)
>
> Phase 1 = candidate survey. Examples to evaluate:
>
> - **`/release` or `/bump-flowtron`** — automate flowtron submodule bumps in adopter projects: read tag annotation, walk migration steps from the per-release tasknote, scaffold a CORE task. Currently `docs/MIGRATION.md` §3 is manual.
> - **`/audit-skill`** — formalize CORE-049's workflow-token-audit pattern as a reusable kickoff. Surface inventory + ranked candidates + cohort filing.
> - **`/epic-discovery`** — first-subtask scaffolder for code-sweep epics (`<AREA>-<N>.1`). Formalize the Discovery pattern that today is informal SPEC convention.
> - **`/close-epic`** — final-subtask audit scaffolder (highest `.N`). Formalize the closing Audit pattern.
> - **`/file-followup`** — mid-flow lightweight follow-up filing while inside a tasknote. Lighter than `/starter-task`; outputs a single PLAN.md line + brief context note.
> - **(probably out of scope)** — viz-specific skills, project-domain skills (those belong in adopter projects, not flowtron core).
>
> Phase 2 = walk candidates with user, drop / approve / re-prioritize. Phase 3 = file approved as children of this task (single CORE-EPIC if ≥3 land, or individual tasks if fewer).
>
> ### Files to touch (preliminary survey — drift-check at promotion)
>
> Per child skill:
>
> - `claude/skills/<new>/SKILL.md` — skill body
> - `claude/commands/<new>.md` — slash command stub
> - `templates/<scaffold-target>.md` — if the skill scaffolds anything new
> - `claude/CLAUDE-snippet.md` — only if the skill becomes adopter-facing surface
> - `docs/MIGRATION.md` §1.2 — symlink wiring (if auto-installed alongside `/task`)
> - `claude/skills/new-project/` — install logic (if auto-wired during fresh adoption)
> - `SPEC.md` or `SPEC/<module>.md` — only if the skill introduces new contract concepts
>
> ### Explicitly out of scope
>
> - Project-domain skills (those belong in adopter `~/code/<project>/.claude/skills/`, not in flowtron's shipped core).
> - Replacing existing 4 skills — this task is purely additive.
> - Skill-runtime improvements (lazy-load, etc.) — separate concern.
>
> ### Decisions locked in this conversation
>
> | Decision | Choice | Rationale |
> |---|---|---|
> | Filing shape | Starter (this file) | Pre-research/survey value worth capturing; promote when ready to walk candidates |
> | Audit model | Mirror [[CORE-049]] | Survey → ranked candidates → user walk → cohort filing → child implementation |
> | Multi-child shape | Decide at Phase 1 (epic vs individual tasks) | Depends on how many candidates clear the bar |
> | Model | opus | Survey + design judgment across multiple skill candidates |
>
> ### Open at promotion (Phase 1 should resolve)
>
> - **Candidate set:** which of the sketched skills clear the worth-shipping bar? Are there missing candidates? (Lean: walk all six sketches; user picks.)
> - **Cohort shape:** epic with `.1` Discovery + child skill tasks, vs individual `/task` entries. (Lean: epic if ≥3 approved; individual otherwise.)
> - **Auto-wiring:** new skills auto-symlink during `/new-project` (like `/task` etc.), or opt-in per skill? (Lean: auto-wire by default for adopter ergonomics.)
> - **Version bump:** new skills are minor (additive contract surface for adopter `.claude/`). Confirm at closure.
>
> ### Related
>
> - [[CORE-049]] — workflow token audit (precedent: survey-then-cohort filing model).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — mirrored CORE-049's filing-style precedent (parent epic + Discovery `.1` + implementation children + Audit `.<final>` per SPEC/epic.md). Each child line follows the existing `<TASK-ID> [model] | shortname — description` grammar (SPEC §"Task-line format"). No new shape introduced.
- [x] Implemented the minimal solution — 7 lines added to `_project/PLAN.md` Medium (CORE-EPIC-057 parent + 6 children CORE-057.1 through CORE-057.6).
- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md filing; no code change).

**Implementation Notes:**

- Filing landed under `## Medium` after FE-020 to keep adopter-relevant work grouped before `## Low`.
- All 7 lines stayed under the 70-word filing-discipline cap (largest = epic parent at 42 words).
- `/release` child explicitly notes flowtron-self only; the other three skill children explicitly note auto-wiring via `/new-project`.
- Audit child carries the canonical "fixed doc-drift sweep line" callout from SPEC/epic.md to make the Acceptance constraint legible at filing time.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (pure PLAN.md filing; no code).
- [x] Ran lint/type-check on changed code — markdown mental-pass on edited block: indent matches existing `.N` child convention (2-space prefix), `[opus]` tag present on every line, em-dash separator consistent, no trailing whitespace. Visualizer parses the new lines on next reload (PLAN.md grammar unchanged).
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend change; the visualizer rendering is automatic from PLAN.md).

**Testing Notes:**

Filing block re-read at HEAD post-edit; 7 entries well-formed under `## Medium`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: no change. `SPEC.md`: no change. `docs/MIGRATION.md`: no change. `claude/CLAUDE-snippet.md`: no change. Filing 4 future skills doesn't touch any AI-referenced doc; updates land in CORE-057.1 Discovery once the skills exist.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-09.` (see SPEC §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Walked the six-candidate skill survey from the starter with the user. Approvals: `/release` (CORE-057.2), `/epic-discovery` (CORE-057.3), `/close-epic` (CORE-057.4), `/file-followup` (CORE-057.5). Drop: `/audit-skill` (judgment-driven; doesn't slot into a scaffolded skill). Cohort filed as `CORE-EPIC-057` per "≥3 → epic" lean, with `.1` Discovery (scopes shared design: install logic, command stubs, MIGRATION.md §1.2 update plan, SPEC additions if any) and `.6` Audit (verifies coherence with existing 4 shipped skills; fixed doc-drift sweep line per SPEC/epic.md). Auto-wiring: 3 adopter-facing skills auto-symlink during `/new-project`; `/release` is flowtron-self only. All children filed as `[opus]`. Drift surfaced at promotion: starter's `/release` framing referenced `docs/MIGRATION.md §3` but the bump procedure actually lives in the "Pinning and bumping" section — captured in Discovery Notes for CORE-057.2 to use.

**Archived:** 2026-05-09
