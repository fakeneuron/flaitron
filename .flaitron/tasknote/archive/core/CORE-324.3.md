---
title: spec-skill-consistency
status: completed
tags: []
created: 2026-06-14
due:
related-tasks: [CORE-EPIC-324, CORE-324.1, CORE-324.2]
---

# CORE-324.3 | spec-skill-consistency

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-324]]

## 🎯 Goal

Review `SPEC.md`, the `SPEC/` lazy modules, and all skill `SKILL.md` files for internal consistency, stale cross-references, and contract drift; fix inline where clear, file follow-ups for larger gaps.

## ✅ Acceptance

- [ ] SPEC.md + all 7 SPEC/ modules + 2 procedure files reviewed for internal consistency, stale cross-refs, contract drift
- [ ] All 23 skill SKILL.md files (+ lazy fragments) reviewed; every cited `§"..."` anchor verified to resolve
- [ ] `/ft-micro-task` model gate aligned with SPEC/model.md category-vs-concrete tier matching (no longer STOPs on a satisfied category tag)
- [ ] `SPEC/model.md` loader list names all three Step-1.5 loaders (`/ft-task`, `/ft-micro-task`, `/ft-debug`)
- [ ] Brittle `SPEC.md:313` line-number citation in `/ft-release` replaced with a section anchor
- [ ] Larger gaps (if any) filed as follow-ups; observations not warranting a fix logged in the recap

## 🧩 Subtasks

- [ ] Read SPEC.md + SPEC/ modules + procedure SOPs; build the section-heading inventory
- [ ] Read the contract-bearing skills (runners, filers, epic, release, new-project) + lazy fragments
- [ ] Sweep all cited `§"..."` anchors against real headings (SPEC, modules, README, docs)
- [ ] Fix #1: `/ft-micro-task` Step 1.5 + `step-1.5-model-edge.md` → four-way category/concrete branch
- [ ] Fix #2: `SPEC/model.md` frontmatter loader line
- [ ] Fix #3: `/ft-release` `SPEC.md:313` → `SPEC §"Operator-gate cues"`
- [ ] Phase 3: markdown/consistency mental-pass on edited files
- [ ] Phase 4: doc-drift sweep + flip PLAN line + archive tasknote

## 🔗 Related

- [[CORE-EPIC-324]] — parent epic (repo-best-practices-sweep)
- [[CORE-324.1]] — Discovery subtask that scoped this child
- [[CORE-324.2]] — sibling (viz-best-practices)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed epic child; the review surface (SPEC + modules + skills) is well-defined and the deliverable ("fix inline where clear, file follow-ups for larger gaps") matches what Discovery surfaced. No re-scope.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Surface reviewed:** SPEC.md (full); all 7 SPEC/ modules (gates, tasknote-selection, model, starter, blocked, versioning, epic); both `SPEC/procedures/` files; contract-bearing skills — ft-task (skill prompt), ft-micro-task, ft-epic-discovery, ft-close-epic, ft-starter-task, ft-file-followup, ft-debug, ft-release, ft-new-project, ft-flowtron, + all 4 lazy fragments. Remaining skills (ft-update, ft-stats, ft-quality, ft-worktree-{start,end}, 8-skill audit family) cross-ref-swept (all cited `§"..."` anchors resolve) rather than full-read.

**Archive skim:** Sibling CORE-324.1 (Discovery) + CORE-324.2 (viz) archived 2026-06-14; both pure to their slices, no overlap with the SPEC/skill consistency surface. No prior consistency-sweep tasknote to inherit decisions from.

**Cross-reference sweep (all resolve — no stale anchors):** built the SPEC.md heading inventory and matched every cited `§"..."` anchor. Spot-checked the two non-obvious ones: `§"Area prefixes"` (cited 8× by the audit family) → resolves to `templates/tasknote-README.md` + self README `## Area prefixes` ✓; `§"Bumping the pinned flowtron version"` (ft-update) → `claude/AGENTS-snippet.md` ✓. ft-flowtron roster = 23 rows, matches 23 skills on disk ✓. ft-new-project wires 9 skills / verifies 18 symlinks, matches MIGRATION §1.2 ✓.

**Findings — 3 clear inline fixes, 0 follow-ups:**

1. **[Moderate — contract drift] `/ft-micro-task` model gate is binary, not tier-aware.** SKILL.md Step 1.5 (lines 70-72) + `step-1.5-model-edge.md` implement only "matches active model / differs → STOP / absent → legacy". SPEC/model.md §"Category-vs-concrete matching" (the canonical contract) requires a **category** tag (`[heavy]`/`[medium]`/`[light]`) be matched by *tier*: satisfied → proceed silently; under-tier → ⚠️ advisory (not STOP). ft-task (and ft-debug, which inherits ft-task's fragment) implement the four-way branch correctly. As written, a micro-task tagged with any category label — now the *recommended primary* filing vocabulary — would wrongly STOP as a "mismatch" because `[light]` ≠ the model name. Unexplained asymmetry → drift, not design. **Fix:** align ft-micro-task Step 1.5 + its fragment to the four-way branch (mirror ft-task).

2. **[Low — stale cross-ref] `SPEC/model.md` frontmatter names only `/ft-task` as loader.** Line 7: "Loaded by `/ft-task` Step 1.5 only…". But ft-micro-task (Step 0/1.5) and ft-debug (Step 1.5) also load it. Peer modules (gates.md, tasknote-selection.md) enumerate all loaders. **Fix:** name all three.

3. **[Very low — brittle citation] `/ft-release` cites `SPEC.md:313`.** Line 299 cites a line number; the quoted text actually sits at SPEC.md ~310-311 (line numbers drift — exactly the anti-pattern). **Fix:** replace with the stable section anchor `SPEC §"Operator-gate cues"`.

**Observation, NOT fixed (deliberate):** `SPEC/procedures/ft-task.md` carries `last-verified: v5.1.0 · 2026-06-02` while SPEC is v5.7.0. This is a by-design currency stamp ("bumped when re-checked against `source:`" per procedures/README.md). Bumping it honestly requires an actual re-verification run against the v5.7.0 ft-task SKILL (a dogfood/release activity), not a consistency edit — bumping without re-verifying would be dishonest. Logged here; left as-is. (The SOP content itself reads current — it already covers the 👇 in-session exception, the default-skip gate, etc.)

**Exit-gate judgment:** Discovery surfaced no significant scope deviation — the findings ARE the filed deliverable, all three fixes are clear-cut and align skills to the existing SPEC contract (no contract changes, no plan rewrite). → **skip 🛠️**, enter Phase 2.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** Pattern survey: ft-task's `step-1.5-model-edge.md` + Step 1.5 are the canonical four-way gate — extended that exact shape to ft-micro-task rather than inventing a new one. Three fixes landed (4 files):

1. **ft-micro-task model gate → tier-aware.** `claude/skills/ft-micro-task/SKILL.md` Step 1.5 rewritten binary→four-way (Satisfied / Category under-tier ⚠️ / Concrete mismatch STOP / Absent legacy), matching ft-task. Step 0's 1.5-read note qualified to "edge-case branches only." `step-1.5-model-edge.md`: Mismatch heading narrowed to concrete-only, new "Category under-tier" section added (mirrors ft-task), legacy labels now include `[medium]`. Fragment section headings now identical to ft-task's (verified).
2. **`SPEC/model.md` loader line** now names all three Step-1.5 loaders (`/ft-task`, `/ft-micro-task`, `/ft-debug`).
3. **`/ft-release` SKILL.md** `SPEC.md:313` line-number citation → stable `SPEC §"Operator-gate cues"` anchor.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:** Pure SKILL/SPEC markdown edits — no executable surface, no test/lint/typecheck applicable, no frontend. Consistency mental-pass via grep: no residual `SPEC.md:313`; micro-task four-way branch labels present; micro fragment headings line-for-line identical to ft-task's fragment; model.md loader line reads clean.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep:** no change across all 11 AI-referenced docs — edits align skills to the existing SPEC contract; no doc claim invalidated.

**Final Summary:** Consistency review of SPEC.md + 7 SPEC/ modules + 2 procedure SOPs + the contract-bearing skills (with a cross-ref sweep over the rest). Cross-reference surface is sound — every cited `§"..."` anchor resolves, ft-flowtron roster matches 23 skills on disk, ft-new-project symlink counts match MIGRATION. Found and fixed 3 inline issues (1 moderate contract drift: ft-micro-task's model gate was binary and would wrongly STOP on category tags — the now-recommended primary filing vocabulary; 2 low: stale loader list, brittle line-number citation). One by-design observation left as-is: the `SPEC/procedures/ft-task.md` `last-verified` stamp lags (v5.1.0) — honest refresh needs a real re-verification run, not a consistency edit. No follow-ups warranted.

**Archived:** 2026-06-14
