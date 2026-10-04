---
title: epic-discovery-deep
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-097]
---

# CORE-097.6 | epic-discovery-deep

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-097]]

## 🎯 Goal

Add an optional `--deep` mode to `/ft-epic-discovery` that stages a spec-kit-style `constitution → specify → clarify` pre-pass for high-uncertainty epics before child-line filing, leaving the default `/ft-epic-discovery` flow unchanged.

## ✅ Acceptance

- [ ] `claude/skills/ft-epic-discovery/SKILL.md` parses `$ARGUMENTS`: empty → existing default flow byte-identical; `--deep` → activates deep pre-pass; unknown args → surface usage line and ask user via AskUserQuestion.
- [ ] Deep pre-pass adds a `## 🧭 Deep Pre-pass` section (with three subsections: Constitution / Specification / Clarifications) to the `.1` Discovery tasknote scaffold, populated before Phase 1 Discovery begins.
- [ ] Three discrete review-and-confirm gates between stages (AskUserQuestion-driven — NOT banner-block, preserving SPEC §"Operator-gate cues" two-banner cap 🛠️/📦): after Constitution drafted; after Specification drafted; after Clarifications resolved. Each surfaces review / edit / proceed options.
- [ ] Default flow (no `--deep`) is byte-identical to existing behavior — no new prompts, no new sections, no new gates, no visible Step renumbering for default users.
- [ ] `claude/commands/ft-epic-discovery.md` stub updated: description mentions opt-in `--deep`; passes `$ARGUMENTS` to skill; usage line shows both forms.
- [ ] `SPEC/epic.md` gets a brief opt-in pointer (1-2 sentences or a short callout) noting `/ft-epic-discovery --deep` exists for high-uncertainty epics, when to reach for it, and that contract details live in the skill.
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" — per-entry verdict ("no change" or the update) for `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/CLAUDE-snippet.md`.

## 🧩 Subtasks

- [x] **Phase 2** — Add `$ARGUMENTS` parsing to `claude/skills/ft-epic-discovery/SKILL.md` (new Step 1.5 or extension of Step 1); recognize `--deep`; unknown args → usage line + AskUserQuestion.
- [x] **Phase 2** — Define the three-stage deep pre-pass body in SKILL.md (Constitution → Specification → Clarifications) with the AskUserQuestion review-and-confirm gate shape specified per stage.
- [x] **Phase 2** — Update Step 5 (tasknote scaffold) so `--deep` injects the `## 🧭 Deep Pre-pass` section (three subsections) into the `.1` tasknote between the H1 header block and `## 📝 Phase 1: Discovery`.
- [x] **Phase 2** — Update `claude/commands/ft-epic-discovery.md` stub: description, usage line ("`/ft-epic-discovery` | `/ft-epic-discovery --deep`"), and `$ARGUMENTS` plumbing.
- [x] **Phase 2** — Add a brief opt-in pointer to `SPEC/epic.md` referencing `/ft-epic-discovery --deep` for high-uncertainty epics; no new SPEC contract gates introduced.
- [x] **Phase 3** — Mental-walk the SKILL.md no-`--deep` branch to confirm default flow is byte-identical (zero new prompts / sections / gates for default users).
- [x] **Phase 3** — Markdown mental-pass on edited files (frontmatter, fence langtags, heading levels, no trailing whitespace, wikilink correctness).
- [x] **Phase 4** — Doc-drift sweep + flip PLAN.md `.6` line to stub form + archive tasknote.

## 🔗 Related

- [[CORE-EPIC-097]] — parent epic (external-skill-survey)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md `.6` line + parent epic Discovery (CORE-097.1) both establish this as the spec-kit-derived P2.b adoption — optional `--deep` mode on `/ft-epic-discovery` for high-uncertainty epics, staging `constitution → specify → clarify` before child filing. Skill-prompt edit; default flow unchanged; no scope ambiguity that warrants re-scope.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

- `claude/skills/ft-epic-discovery/SKILL.md` — current skill body; currently advertises "Takes no arguments". Step 2 collects all inputs via AskUserQuestion; Step 5 scaffolds the `.1` tasknote.
- `claude/commands/ft-epic-discovery.md` — command stub; currently passes no `$ARGUMENTS` to the skill.
- `SPEC/epic.md` — epic lifecycle contract; currently makes no mention of any deep-mode variant.
- `SPEC.md` §"Operator-gate cues" (lines 281-334) — caps the 4-phase workflow at **two** banner-block gates (🛠️ + 📦); skill-level extensions bundle into 📦 rather than adding banners. Bears directly on Acceptance — see "Drift / contract impact" below.
- `claude/skills/ft-audit-docs/SKILL.md` + `claude/commands/ft-audit-docs.md` — canonical `$ARGUMENTS`-based scope-resolution precedent (passes `$ARGUMENTS` from command stub; skill body branches on the arg).
- `templates/tasknote-template.md` — canonical tasknote scaffold; `## 🧭 Deep Pre-pass` would slot above `## 📝 Phase 1: Discovery`.
- `_project/tasknote/archive/core/CORE-097.1.md` — parent epic Discovery; recorded P2.b adoption shape with cost "Small (skill-prompt edit)" + novelty "Low — adds an opt-in dimension to existing skill".

### Archive skim findings

`grep -l "ft-epic-discovery" _project/tasknote/archive/core/*.md` returns three hits:

- **CORE-097.1** — parent epic Discovery, already consumed above. Source of the P2.b adoption shape.
- **CORE-104** (skill namespace prefix) — renamed the skill from `epic-discovery` → `ft-epic-discovery`. Mechanical rename; no design impact on this task.
- **CORE-107** (`/ft-flowtron` template-list trim) — unrelated trim of unrelated skill body; no design impact.

No prior tasknote has touched `/ft-epic-discovery`'s argument-parsing surface or scaffold-time tasknote shape. Greenfield for both extensions.

### Drift / contract impact

- `claude/skills/ft-epic-discovery/SKILL.md` line 10 currently asserts "The skill takes **no arguments**." — this drifts on landing of `--deep`. The new SKILL prose must say "Takes optional `--deep` arg; all other inputs collected via AskUserQuestion."
- `claude/commands/ft-epic-discovery.md` line 7 "Takes no arguments — all inputs collected via AskUserQuestion." — same drift; same fix.
- `SPEC.md` §"Operator-gate cues" (lines 281-334) constrains the 4-phase workflow to **two** banner gates (🛠️ Phase 1→2 + 📦 ready-to-commit) and says "Skill-level extensions … bundle into the 📦 gate rather than adding their own banners. … The convention is a UX layer over the existing pause points — it does not introduce new gates." → The deep pre-pass's three discrete gates must therefore be **AskUserQuestion-driven review prompts**, not banner blocks. This is encoded into Acceptance.
- All other cited paths/concepts (template path, archive layout, skill/command file structure) verified present at HEAD.

### Resolved scoping (from AskUserQuestion)

| Question | Answer |
|---|---|
| Trigger mechanism | Explicit `--deep` arg only (no auto-offer / no heuristic) |
| Output home | `## 🧭 Deep Pre-pass` section added to the `.1` tasknote scaffold with three subsections (Constitution / Specification / Clarifications) |
| Stage execution shape | Three discrete review-and-confirm gates between stages (AskUserQuestion-driven, NOT banner-block — preserves SPEC's 2-banner cap) |
| SPEC/epic.md mention | Brief opt-in pointer (1-2 sentences or short callout); no new SPEC contract gates |

### Open Phase 2 questions (resolve during execution, not before)

- Exact insertion point inside SKILL.md for the deep pre-pass (new Step 1.5 between current Step 1 and Step 2? new Step 2.5 between current Step 2 input-collection and Step 3 ID resolution? or new Step 4.5 between PLAN.md filing and tasknote scaffold?) — depends on whether constitution drafting needs the resolved task-ID (suggests after Step 3) or can use placeholder text (suggests earlier). Decide during Phase 2 pattern survey.
- AskUserQuestion shape for the per-stage review gates: 3-option (Looks good / Edit before proceeding / Restart this stage) vs. 2-option (Approve / Edit). 3-option is more spec-kit-faithful but heavier; 2-option is simpler. Default 3-option unless a survey of sibling skills shows otherwise.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `claude/skills/ft-audit-docs/SKILL.md` is the canonical `$ARGUMENTS`-resolution precedent: its Step 1 branches on the arg with explicit cases + an "ambiguous → stop and ask" fallback. Mirrored that shape in new Step 1.5 of `ft-epic-discovery/SKILL.md`. The deep pre-pass slots between Step 5 (scaffold) and Step 6 (Phase 1 Discovery) — the natural seam where the tasknote exists but no phase work has begun.
- [x] Implemented the minimal solution — 4 files edited.
- [x] Updated/added tests for non-trivial behavior — N/A (skill-prompt + SPEC-prose edits; no executable code surface).

**Implementation Notes:**

### Files edited (4)

| File | Change |
|---|---|
| `claude/skills/ft-epic-discovery/SKILL.md` | (1) Intro paragraph: "no arguments" → optional `--deep` arg; (2) inserted **Step 1.5 — Parse $ARGUMENTS** with three branches (empty / `--deep` / unknown); (3) Step 5: conditional injection of `## 🧭 Deep Pre-pass` placeholder section when `deep-mode = true`; (4) inserted **Step 5.5 — Deep pre-pass (only on `--deep`)** with three discrete stages (Constitution / Specification / Clarifications), each ending in an AskUserQuestion review-and-confirm gate. |
| `claude/commands/ft-epic-discovery.md` | (1) Frontmatter description appended with `--deep` mention; (2) body paragraph updated: skill parses `$ARGUMENTS`; (3) "Takes no arguments" line replaced with a Usage section showing both forms. |
| `SPEC/epic.md` | Added an **"Optional deep pre-pass"** paragraph at the end (after the "Skills" paragraph) — 1-paragraph opt-in pointer mentioning `/ft-epic-discovery --deep` for high-uncertainty epics; defers contract details to the skill. |
| `_project/PLAN.md` | (Phase 4 only — line `.6` flip to stub form + archive tasknote.) |

### Design decisions resolved during Phase 2 (open questions from Discovery Notes)

- **Insertion point in SKILL.md** — chose new **Step 1.5** (between Step 1 pre-flight and Step 2 input-collection) for arg parsing; new **Step 5.5** (between Step 5 scaffold and Step 6 Phase 1) for the pre-pass drive. Step 5 carries the conditional placeholder injection. Avoids renumbering existing steps; mirrors flowtron's `.5` insertion convention (cf. SPEC §"Step 1.5 — Model gate" in `claude/skills/ft-task/SKILL.md`).
- **AskUserQuestion shape per gate** — three-option (Approve / Edit / Restart). More spec-kit-faithful than two-option; the cost of one extra option is negligible vs. the value of explicit restart-this-stage semantics for an opt-in deep mode.
- **`## 🧭 Deep Pre-pass` placement in the `.1` tasknote** — between `## 🔗 Related` and the `---` rule that precedes `## 📝 Phase 1: Discovery`. Keeps the canonical 4-phase block intact below the `---` rule; archives with the tasknote.

### Default-flow invariance check

Step 1.5's empty-`$ARGUMENTS` branch sets `deep-mode = false`; Steps 5 and 5.5 are both guarded by `deep-mode = true`. For a default-flow user, Step 1.5 is a one-line internal flag-set; Step 5 has one new conditional line (no-op when false); Step 5.5 is a single "Skip this entire step if `deep-mode = false`" line. No new prompts, sections, or gates surface in the default-flow run.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (skill-prompt + SPEC-prose edits; no executable code surface).
- [x] Ran lint/type-check on changed code — N/A (markdown only); markdown mental-pass instead (see below).
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

### Default-flow invariance mental-walk

Walked the no-`--deep` branch through `claude/skills/ft-epic-discovery/SKILL.md` start-to-finish:

- Step 0 → unchanged (path resolution).
- Step 1 → unchanged (pre-flight).
- **Step 1.5 (new)** → `$ARGUMENTS` empty → sets `deep-mode = false` and continues to Step 2. No user-visible prompt; one internal flag-set.
- Step 2 → unchanged (input collection via AskUserQuestion).
- Step 3 → unchanged (`<AREA>-EPIC-<N>` resolution).
- Step 4 → unchanged (PLAN.md filing).
- **Step 5 (modified)** → unchanged scaffold output. The new conditional injection paragraph (`**If deep-mode = true** …`) is a no-op when `deep-mode = false`.
- **Step 5.5 (new)** → first line: `Skip this entire step if deep-mode = false`. Pure no-op.
- Steps 6 / 7 / 8 / 9 / 10 → unchanged.

Result: zero new prompts, sections, or gates surface for default-flow users. Default invocation is byte-identical to pre-`--deep` behavior.

### Markdown mental-pass

| File | Frontmatter | Headings | Fence langtags | Wikilinks | Trailing ws |
|---|---|---|---|---|---|
| `claude/skills/ft-epic-discovery/SKILL.md` | unchanged | new `## Step 1.5`, `## Step 5.5`, `### Stage 1-3` clean | no new fences | no new wikilinks | none |
| `claude/commands/ft-epic-discovery.md` | description appended cleanly; closed by `---` | new `Usage:` line + bullets clean | no fences | no wikilinks | none |
| `SPEC/epic.md` | unchanged (`paths:` frontmatter intact) | no new headings (paragraph addition only) | no fences | no wikilinks | none |
| `_project/tasknote/CORE-097.6.md` | scaffold-template-derived; valid YAML | canonical 4-phase headings | no fences | `[[CORE-EPIC-097]]` resolves | none |

`--deep`, `$ARGUMENTS`, `deep-mode`, and `constitution → specify → clarify` consistently rendered (backticks for literals; em-arrow for the stage flow).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary
- [x] Closed — PLAN.md `.6` line flipped to stub form; tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces inline on conditional skip per SPEC §"Post-closure protocol" §"Conditional skip rule")

**Final Summary:**

### Doc-drift sweep (AI-referenced docs)

| Doc | Verdict |
|---|---|
| `README.md` | no change (no `/ft-epic-discovery` mentions) |
| `SPEC.md` | no change (skill-list cite only at L85; contract details live in `SPEC/epic.md` which this task updated) |
| `docs/MIGRATION.md` | no change (L88 already cites `SPEC/epic.md` for lifecycle; `--deep` is reachable via that cite per the cite-don't-restate convention) |
| `claude/CLAUDE-snippet.md` | no change (L17 already cites `SPEC/epic.md` for lifecycle details; same pattern) |

The `SPEC/epic.md` opt-in pointer is the single canonical mention of `--deep`; the four cold-start docs all delegate to it correctly via existing cites, so no propagating updates are required.

### Recap

Added opt-in `--deep` mode to `/ft-epic-discovery` for high-uncertainty epics, staging a `constitution → specify → clarify` pre-pass before Phase 1 Discovery — sourced from spec-kit's deeper upfront-scoping convention (P2.b adoption from CORE-097.1). Default `/ft-epic-discovery` flow remains byte-identical; the pre-pass only fires when `--deep` is explicitly passed. Edited 4 files: SKILL.md (new Step 1.5 arg-parse + new Step 5.5 three-stage pre-pass driver + conditional Step 5 placeholder injection), command stub (`$ARGUMENTS` plumbing + Usage section), `SPEC/epic.md` (1-paragraph opt-in pointer), and PLAN.md (`.6` line flip). The three per-stage gates are AskUserQuestion-driven review-and-confirm prompts (not banner-blocks) — preserves SPEC §"Operator-gate cues" two-banner cap (🛠️ + 📦) per the "skill-level extensions don't introduce new gates" convention.

**Archived:** 2026-05-18
