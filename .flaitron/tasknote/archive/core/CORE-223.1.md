---
title: discovery
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: [CORE-EPIC-223, CORE-223.5]
---

# CORE-223.1 | discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-223]] [[CORE-223.5]]

## 🎯 Goal

Scope the SPEC.md → lazy-module extraction boundaries (which sections move, where they land, how dispatch wires the loads) and file the implementation children `.2..4` per SPEC/epic.md.

## ✅ Acceptance

- [x] Extraction boundaries defined: which SPEC.md sections move to which `SPEC/*.md` modules, with byte/line estimates
- [x] Dispatch wiring mapped: which SKILL.md files (ft-task / ft-micro-task / ft-epic-discovery / ft-close-epic) load which new modules, and at which step
- [x] `--fast` dedup approach decided (4× restatement → single source)
- [x] Always-read budget target quantified (current SPEC.md size vs. ~40k goal)
- [x] Children `.2..4` filed in PLAN.md with model + shortname + scoped descriptions

## 🧩 Subtasks

- [x] Measure current SPEC.md + always-loaded core size; establish the budget baseline
- [x] Inventory extraction candidates (operator-gate cues, exit-gate flavors, conditional-skip rule, tasknote-selection matrix) with line ranges
- [x] Map each candidate to a target module (new vs. existing `SPEC/*.md`) and define load triggers
- [x] Trace SKILL.md dispatch points that must wire the new lazy loads
- [x] Decide `--fast` dedup single-source location
- [x] Partition the work into children `.2..4`; file them in PLAN.md

## 🔗 Related

- [[CORE-EPIC-223]] — parent epic (spec-lazy-module-split)
- [[CORE-223.5]] — final-subtask audit (verifies module loads, cross-refs, byte targets)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** SPEC.md is 39,862 chars — sitting *at* the ~40k always-read budget cap flagged by audit-context 2026-05-30. Extracting the deep gate machinery + selection matrix into lazy modules is the correct, still-needed remedy.

- [x] Read relevant source files

- [x] **Archive skim** — no prior `core/` tasknotes touched SPEC.md's gate-machinery or selection sections in a way that conflicts; the lazy-module pattern itself is well-established (CORE-042.2 SPEC modularization, CORE-042.9 SKILL-side lazy-load, epic/starter/blocked/model/versioning all already extracted). This epic extends that precedent, no regressions to avoid.

- [x] **Drift check** — section line ranges verified against current SPEC.md (HEAD). No drift; PLAN.md description matches code.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Budget baseline.** `SPEC.md` = 687 lines / 39,862 chars (~9,965 tokens), essentially *at* the ~40k char "always-read budget". Existing lazy `SPEC/*.md` total 14,484 chars across 5 modules (blocked/epic/model/starter/versioning).

**Extraction candidates (measured, current HEAD):**

| Block | Lines | Chars | Target |
|---|---|---|---|
| Operator-gate cues | 289–314 | 2,900 | `SPEC/gates.md` |
| Exit-gate flavors (in §Phase 1) | 332–383 | 2,756 | `SPEC/gates.md` |
| Conditional skip rule (in §Post-closure) | 450–491 | 3,286 | `SPEC/gates.md` |
| When-to-use-a-tasknote matrix | 530–605 | 5,543 | `SPEC/tasknote-selection.md` |
| Filing-discipline + `## Completed` conv | 607–642 | 1,656 | `SPEC/tasknote-selection.md` |

Gate machinery total ≈ 8,942 chars; selection total ≈ 7,199 chars. The 4× `--fast` restatement (SPEC.md lines 308, 375–379, 415–417, 481) is spread across all three gate blocks → consolidating them in `SPEC/gates.md` lets one canonical `--fast` subsection replace four.

**Projected budget.** Core reductions: gates ≈ 8,200 chars (after thin anchors), selection ≈ 6,900 chars (after pointer stubs). SPEC.md 39,862 → **≈ 24,700 chars** — comfortable margin under 40k.

**Cross-reference / wiring breadth (grep):**
- Gate machinery referenced by **6 skills** (ft-task, ft-micro-task, ft-epic-discovery, ft-close-epic, ft-debug, ft-release) + 3 docs (GLOSSARY, PLATFORMS, AGENT-NEUTRALITY) + SPEC.md.
- Selection matrix referenced by **~9 skills** (+ ft-starter-task, ft-file-followup, ft-worktree-{start,end}) + 3 docs (MIGRATION, GLOSSARY, AGENT-NEUTRALITY) + 2 templates (tasknote-README, tasknote-micro-template).
- Skill §-refs use `per SPEC §"…"` form → after extraction become `per SPEC/gates.md §"…"` / `per SPEC/tasknote-selection.md §"…"`.

**Dispatch pattern.** Existing lazy modules load at explicit SKILL.md dispatch points (Step 1.5 model, Step 2 epic, Step 3a starter, Step 3c blocked). The new modules differ: gate machinery + selection are needed by *every* run of the consuming skills, so the wiring is reference-rewrite (point the existing `per SPEC §…` citations at the module) rather than a new conditional load gate. Core SPEC.md keeps a heading + pointer for each (mirroring §"Epic lifecycle" / §"Blocked tasks" / §"Model field" / §"Versioning"). The `SPEC_DIR` lazy-module enumeration in skill Step 0 + SPEC §"Working in the flowtron repo itself" + §"Lazy SPEC module frontmatter" need the two new module names added.

**Operator decisions (AskUserQuestion, 2026-05-30):**
1. **Child split — by module, self-contained.** Each extraction owns its own cross-ref rewiring; `.4` is the integration/verification child.
2. **Selection scope — move both adjacent sub-sections** (filing-discipline thresholds + `## Completed` convention) into `SPEC/tasknote-selection.md` with the matrix (~7,200 char core saving).
3. **Gate anchor — thin anchor + pointer** in core (keep the "up to two banners: 🛠️ Phase 1→2, 📦 ready-to-commit" sentence so the 4-phase narrative stays self-coherent), not a bare pointer.

**Exit judgment:** Discovery surfaced no significant deviation from the filed `.2..4` plan (still 3 implementation children extracting to lazy modules; asks refined boundaries within plan) → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — n/a for an epic Discovery subtask; deliverable is the filed child list, not code. Filing follows the established epic-discovery shape (`.2..(N-1)` implementation children + existing `.N` audit).

- [x] Implemented the minimal solution — filed children `.2`, `.3`, `.4` in PLAN.md between `.1` and the `.5` audit (see Implementation Notes).

- [x] Updated/added tests for non-trivial behavior — n/a (no code).

**Implementation Notes:**

Filed three implementation children into PLAN.md under `CORE-EPIC-223`:

- **CORE-223.2** `[opus] | gates-module` — extract gate machinery → `SPEC/gates.md` + `--fast` dedup + thin anchor/pointer in core + rewire 6 skills' gate §-refs.
- **CORE-223.3** `[opus] | selection-module` — extract selection matrix + filing-discipline + `## Completed` conv → `SPEC/tasknote-selection.md` + pointer stubs + rewire ~9 skills + 2 templates.
- **CORE-223.4** `[opus] | integration-wiring` — frontmatter `paths:` on both modules, refresh module-list sections, verify <40k margin, doc-currency sweep.

`.2` and `.3` are independent (each self-contained incl. its own rewiring); `.4` depends on both. Existing `.5` audit unchanged. All three models `[opus]` — extraction touches the contract surface and cross-skill wiring (design-weighted).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — n/a (no code; PLAN.md + tasknote markdown only).

- [x] Ran lint/type-check on changed code — n/a (no code).

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — n/a (no frontend).

**Testing Notes:** Pure planning deliverable — three PLAN.md child lines + this tasknote. No code, tests, or lint surface.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all AI-referenced docs **no change**: this Discovery only filed PLAN.md child lines + scaffolded this tasknote; no SPEC/doc content moved yet (extraction lands in `.2`/`.3`/`.4`). README §"AI-referenced docs" itself will gain the two new `SPEC/*.md` module mentions in `.4`, not here.

- [x] Closed — PLAN.md `CORE-223.1` line flipped to stub form (in place beneath the in-flight `CORE-EPIC-223` parent; parent stays open until all children close) and tasknote moved to `_project/tasknote/archive/core/`.

- [x] Recap drafted (inline on conditional skip).

**Final Summary:** Scoped the SPEC.md lazy-module split. SPEC.md measured at 39,862 chars (at the ~40k budget cap). Defined two target modules — `SPEC/gates.md` (gate machinery + deduped `--fast`, ≈8,200 char core saving) and `SPEC/tasknote-selection.md` (selection matrix + filing-discipline + `## Completed` conv, ≈6,900 char core saving) — projecting SPEC.md → ≈24,700 chars. Mapped cross-ref rewiring (6 skills for gates, ~9 skills + 2 templates for selection). Filed children `.2` (gates-module), `.3` (selection-module), `.4` (integration-wiring) per operator decisions on partitioning, selection scope, and gate-anchor style.

**Archived:** 2026-05-30
