---
title: 4-skill expansion discovery
status: completed
tags: []
created: 2026-05-09
related-tasks: [CORE-EPIC-057, CORE-054]
---

# CORE-057.1 | 4-skill expansion discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-057]] [[CORE-054]]

## 🎯 Goal

Scope shared design across the four approved skills (`/release`, `/epic-discovery`, `/close-epic`, `/file-followup`) and refine the sibling-children scopes (CORE-057.2–.5) before any code ships.

## ✅ Acceptance

- [x] Shared design surface inventoried (install logic in `claude/skills/new-project/`, slash-command stubs, `docs/MIGRATION.md` §1.2, `claude/CLAUDE-snippet.md`, SPEC contract additions if any) — captured in Discovery Notes
- [x] Four open scoping questions resolved with the user (skill scope per child + `/release` install) — captured in "Scoping decisions" table
- [x] Refined sub-task scopes for CORE-057.2–.5 written into `_project/PLAN.md` (replacing current placeholders); CORE-057.6 audit line confirmed as-is
- [x] Each refined PLAN.md line stays under the 70w hard cap (target ≤50w) — measured at 40/42/44/40 words
- [x] Doc-drift sweep at closure: no AI-referenced doc updates land in this Discovery (it's pure PLAN.md filing); contract edits land inside CORE-057.2–.5

## 🧩 Subtasks

- [x] Refine CORE-057.2 (`/release`) PLAN.md line — global install + recipe pointer to CORE-048 precedent; flowtron-self only
- [x] Refine CORE-057.3 (`/epic-discovery`) PLAN.md line — file-epic-and-scaffold-.1 motion (writes parent + .1 + .N audit placeholder, then scaffolds .1 + drives Phase 1)
- [x] Refine CORE-057.4 (`/close-epic`) PLAN.md line — audit-with-fixed-doc-drift-line + prompt-to-flip-parent
- [x] Refine CORE-057.5 (`/file-followup`) PLAN.md line — one PLAN.md line on disk; paragraph conversational-only
- [x] Word-count each refined line; ensure ≤70w hard cap (target ≤50w); rewrite if any breach (all 4 measured at 40/42/44/40 words)
- [x] Re-read CORE-057.6 audit line; confirm no rewrite needed (no Discovery surface materially changes its scope — naming consistency, snippet parity, MIGRATION.md currency, fixed doc-drift sweep line all still apply unchanged)

## 🔗 Related

- [[CORE-EPIC-057]] — parent epic (4-skill expansion cohort)
- [[CORE-054]] — predecessor that surveyed candidates and filed this Discovery + sibling children

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Parent epic CORE-EPIC-057 + this Discovery + sibling children (CORE-057.2–.6) were filed today (2026-05-09) at CORE-054 closure. No sibling child has fired yet. This Discovery is the gating task for the cohort — its deliverable (filed concrete sub-task scopes) is required before any of CORE-057.2–.5 can run.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes (CORE-054 promotion record; CORE-048 release-recipe precedent; SPEC/epic.md current convention)
- [x] **Drift check** — see Discovery Notes (claude/skills/new-project/SKILL.md Step 3 symlinks confirmed at the wired set of 3; docs/MIGRATION.md §1.2 confirmed at line 50; SPEC/epic.md fully describes the .1/.N convention this skill pair will formalize)
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions (4-question AskUserQuestion resolved all four open scoping questions; answers captured in "Scoping decisions" table above)
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source-file inventory (live, on-spec at 2026-05-09)

- **Existing shipped skills** (4 SKILLs + 4 commands):
  - `claude/skills/{task,starter-task,micro-task,new-project}/SKILL.md`
  - `claude/skills/{task,micro-task}/step-1.5-model-edge.md` (lazy fragments)
  - `claude/skills/task/{step-3a-promote-starter,step-3c-resume-blocked}.md` (lazy fragments)
  - `claude/commands/{task,starter-task,micro-task,new-project}.md` (slash-command stubs)
- **Adopter-facing wiring surfaces:**
  - `claude/skills/new-project/SKILL.md` Step 3 — symlinks `/task /starter-task /micro-task` (3 entries today).
  - `docs/MIGRATION.md` §1.2 (lines 50-72) — manual symlink-wiring instructions, mirrors `new-project` Step 3.
  - `claude/CLAUDE-snippet.md` — adopter-facing block pasted into project CLAUDE.md (per CORE-055 starter, currently 55 lines; references `/task` minimum).
- **SPEC surfaces:**
  - `SPEC.md` always-loaded core (459 lines).
  - `SPEC/{epic,starter,blocked,model,versioning}.md` (5 lazy modules).
  - No "shipped skills contract" section today — skills are documented across SPEC + MIGRATION + CLAUDE-snippet ad hoc.
- **Templates:** `templates/{tasknote-template,tasknote-starter-template,tasknote-micro-template,tasknote-README,PLAN}.md`.
- **Release recipe precedent:** CORE-048 archived tasknote (lines 20-37) defines the canonical 7-step recipe — SPEC.md version line · SPEC/versioning.md example shifts · MIGRATION.md pin example · doc-drift sweep · single `feat:` commit · annotated tag · push.

### Archive skim (precedents)

- `archive/core/CORE-054.md` — predecessor; locked the 4-skill cohort decision, auto-wiring policy (`/release` flowtron-self only; other 3 auto-wire), and `[opus]` model tags. Final Summary calls out drift surfaced at promotion: starter's `/release` framing referenced `docs/MIGRATION.md §3` but the bump procedure actually lives in SPEC §"Pinning and bumping" — captured for CORE-057.2 to use.
- `archive/core/CORE-048.md` (and `CORE-046`, `CORE-043`) — three release-task precedents; recipe well-established, mechanical.
- `archive/core/CORE-049.md` — workflow-token-audit predecessor; precedent for the "survey → ranked candidates → user walk → cohort filing" model that CORE-054 mirrored.
- No prior tasknote touched `claude/skills/{epic-discovery,close-epic,file-followup,release}/` (none exist yet), and no archived tasknote modifies `claude/skills/new-project/SKILL.md` Step 3 — this Discovery is the first scope-shaper for that surface.

### Drift check

- `claude/skills/new-project/SKILL.md` Step 3 (lines 58-72) — currently wires 3 skills. Discovery's deliverable refines the diff to add 3 more (auto-wired children) under the same shape.
- `docs/MIGRATION.md` §1.2 (lines 50-72) — mirrors `new-project` Step 3; same diff shape applies.
- `SPEC/epic.md` already describes the `.1` Discovery / `.N` Audit convention completely (47 lines; includes "Audit acceptance — fixed doc-drift line" at lines 37-42). `/epic-discovery` and `/close-epic` make the convention executable; the SPEC module text needs no change beyond optional pointers.
- `SPEC.md` itself — no canonical "shipped skills" section; skills are referenced from §"Starter tasknotes" and §"When to use a tasknote" for `/starter-task` and `/micro-task` carve-out. Adding 3 new adopter-facing skills warrants similar in-context references but probably no new SPEC heading.
- `_project/PLAN.md` — CORE-057.2-.5 already filed by CORE-054 closure; this Discovery refines their scopes (they may need rewrite at >50w cap if scope-additions push them over).

### Shared design surface (per PLAN.md task line, refined)

The 4 skills share these wiring/contract surfaces (covered once for the cohort, applied per-child):

1. **Install logic** in `claude/skills/new-project/SKILL.md` Step 3 — add 3 new symlinks for `/epic-discovery`, `/close-epic`, `/file-followup`. `/release` is flowtron-self only (no entry).
2. **MIGRATION.md §1.2** — mirror update (3 new symlink lines + bullet points). Likely also a one-line mention in §1.0 description for the `/new-project` wrapper coverage.
3. **CLAUDE-snippet.md** — adopter-facing block; if it lists shipped commands, add the 3 new auto-wired skills (intersects CORE-055).
4. **Slash-command stubs** in `claude/commands/<name>.md` — 4 new files following the existing `/task` / `/micro-task` shape (frontmatter + one-paragraph "invoke the skill" body; argument-hint when applicable).
5. **SPEC contract additions** — minimal:
   - `SPEC/epic.md` may gain pointer lines to `/epic-discovery` and `/close-epic`.
   - `/file-followup` may need a new SPEC concept ("Follow-up filings") or live entirely under SPEC §"When to use a tasknote" between micro and starter — TBD on output shape (clarifying question below).
   - `/release` introduces no SPEC concept — the recipe is tasknote-internal; flowtron-self only.

### Scoping decisions (resolved 2026-05-09)

| Question | Choice | Implication for sibling-child scopes |
|---|---|---|
| `/epic-discovery` scope | **File epic + scaffold .1** | One motion: skill writes parent `<AREA>-EPIC-<N>` + `.1` Discovery + `.N` audit placeholder lines in PLAN.md, then scaffolds the `.1` tasknote and drives Phase 1. CORE-057.3 scope refined accordingly. |
| `/close-epic` scope | **Audit + prompt to flip** | Skill scaffolds + drives audit `.N` tasknote with fixed doc-drift sweep acceptance line; at audit closure surfaces parent epic state and asks user whether to flip parent to `Completed`. CORE-057.4 scope refined accordingly. |
| `/file-followup` output | **Conversational only** | Only the one-line PLAN.md entry is written to disk; the "short context paragraph" is delivered conversationally (no tasknote artifact). Lighter-than-starter contract is the differentiator. CORE-057.5 scope refined accordingly. |
| `/release` install | **Global symlink** | Like `/new-project`: `ln -s ~/code/flowtron/claude/skills/release ~/.claude/skills/release` + `~/.claude/commands/release.md`. Invokable from anywhere when cwd = flowtron repo. NOT symlinked into adopter projects. CORE-057.2 scope refined accordingly. |

### Refined sub-task scopes (deliverable — to be written into PLAN.md in Phase 2)

**CORE-057.2 — `/release` skill**
> Ship `/release` as flowtron-self only (global symlink: `~/.claude/skills/release` + `~/.claude/commands/release.md`). Scaffolds + drives a release tasknote per CORE-048 recipe: SPEC.md version bump, SPEC/versioning.md example shifts, docs/MIGRATION.md pin bump, doc-drift sweep, single `feat:` commit, annotated tag, push. NOT symlinked into adopter projects.

**CORE-057.3 — `/epic-discovery` skill**
> Ship `/epic-discovery` per SPEC/epic.md. One motion: skill writes parent `<AREA>-EPIC-<N>` + `.1` Discovery + `.N` audit placeholder lines in PLAN.md, then scaffolds the `.1` tasknote and drives Phase 1 (deliverable = filed `.2..(N-1)` children). Auto-wired into adopters via `/new-project` and `docs/MIGRATION.md` §1.2.

**CORE-057.4 — `/close-epic` skill**
> Ship `/close-epic` per SPEC/epic.md. Scaffolds + drives audit `.N` tasknote with fixed doc-drift sweep acceptance line across `tasknote/README.md` §"AI-referenced docs". At audit closure surfaces parent `<AREA>-EPIC-<N>` state and asks user whether to flip parent to `Completed`. Auto-wired into adopters via `/new-project` and `docs/MIGRATION.md` §1.2.

**CORE-057.5 — `/file-followup` skill**
> Ship `/file-followup` for mid-flow follow-up filing while inside an active tasknote. Output: one PLAN.md line written to disk + a short context paragraph delivered conversationally only (no tasknote artifact; lighter than `/starter-task`). Auto-wired into adopters via `/new-project` and `docs/MIGRATION.md` §1.2.

**CORE-057.6 — Audit child** — current PLAN line stays as-is (already well-scoped: naming consistency, snippet parity, MIGRATION.md currency, fixed doc-drift sweep line). Re-read at audit time against the design decisions above.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — mirrored CORE-054's filing-style precedent (refining sibling-children long descriptions in place under the existing `<TASK-ID> [model] | shortname — description` task-line grammar; SPEC §"Task-line format"). 2-space child indent + `[opus]` tag + em-dash separator preserved on every refined line. No new shape introduced.
- [x] Implemented the minimal solution — replaced the long descriptions of CORE-057.2–.5 in `_project/PLAN.md` with the refined scopes captured in Discovery Notes. CORE-057.6 audit line untouched. CORE-EPIC-057 parent line untouched.
- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md filing; no code change).

**Implementation Notes:**

- 4 lines edited (CORE-057.2 through CORE-057.5); 0 lines added or removed; cohort line count steady at 7 (parent + 6 children).
- Refined lines measure at 40 / 42 / 44 / 40 words — all comfortably under the 50w target (well below the 70w hard cap).
- CORE-054's drift call-out (starter referenced `docs/MIGRATION.md §3` but bump procedure lives in SPEC §"Pinning and bumping") is no longer load-bearing for CORE-057.2's scope — the refined line points at CORE-048 recipe directly, dropping the ambiguous MIGRATION.md §3 reference entirely.
- All four refined sibling-child scopes carry their auto-wiring policy verbatim (3 of 4 auto-wired via `/new-project` + `docs/MIGRATION.md` §1.2; `/release` flowtron-self only with global symlink).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (pure PLAN.md filing; no code).
- [x] Ran lint/type-check on changed code — markdown mental-pass on the 4 edited lines: `  - [ ]` 2-space child indent preserved, `**CORE-057.<N>**` bold ID intact, `[opus]` tag present, `| <shortname>` segment present (`/release skill`, `/epic-discovery skill`, `/close-epic skill`, `/file-followup skill`), em-dash separator consistent, no trailing whitespace. Visualizer parses the new descriptions on next reload (PLAN.md grammar unchanged from SPEC §"Task-line format").
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend change; visualizer rendering is automatic from PLAN.md and uses the same grammar).

**Testing Notes:**

Refined block re-read at HEAD post-edit; all 4 entries well-formed under `## Medium` between CORE-057.1 (untouched) and CORE-057.6 (untouched). CORE-EPIC-057 parent line above untouched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: no change. `SPEC.md`: no change. `docs/MIGRATION.md`: no change. `claude/CLAUDE-snippet.md`: no change. (Pure PLAN.md sub-task scope refinement; the §1.2 / SPEC / snippet edits planned for CORE-057.3–.5 land inside those implementations, not in this Discovery.)
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-09.` (kept nested under `CORE-EPIC-057` in `## Medium` per epic-cohort grouping; parent + cohort move to `## Completed` only when all children close) and tasknote moved to `_project/tasknote/archive/core/`
- [ ] Recapped changes with the user and got confirmation

**Final Summary:**

Walked the four open scoping questions for the CORE-EPIC-057 cohort with the user and locked these decisions: `/epic-discovery` files-the-epic-and-scaffolds-`.1` in one motion (parent + `.1` + `.N` audit lines into PLAN.md, then drives Phase 1); `/close-epic` runs the audit `.N` with fixed doc-drift acceptance and prompts the user to flip the parent epic line at audit closure; `/file-followup` writes one PLAN.md line on disk + delivers the context paragraph conversationally only (no tasknote artifact); `/release` installs via global symlink (`~/.claude/skills/release` + `~/.claude/commands/release.md`) like `/new-project`, flowtron-self only, never symlinked into adopters. Refined the long descriptions for CORE-057.2–.5 in `_project/PLAN.md` per these decisions; all four lines measured at 40/42/44/40 words (well under the 50w target). CORE-057.6 audit line confirmed as-is — none of the design decisions materially change its scope. CORE-EPIC-057 parent line untouched. No AI-referenced doc updates land here — the SPEC / MIGRATION.md §1.2 / CLAUDE-snippet edits all land inside the implementation children CORE-057.3–.5. Discovery deliverable (filed concrete sibling-children scopes) is complete; CORE-057.2–.5 are now ready to fire one at a time.

**Archived:** 2026-05-09
