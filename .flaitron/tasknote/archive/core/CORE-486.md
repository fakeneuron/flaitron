---
title: cross-project-carveouts-note
status: completed
tags: []
created: 2026-08-28
due:
related-tasks: []
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-486 | cross-project-carveouts-note

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Decide whether flowtron's two sanctioned cross-project surfaces (the `tools/update-adopters.mjs` singular CLI carve-out; the global viz `~/code` workspace default) deserve one consolidated bounded-carve-outs statement reconciling the fleet-blind tier claim, or whether the current per-doc declarations should be ratified as-is.

## ✅ Acceptance

- [x] Decision recorded (consolidate into one bounded-carve-outs statement, or ratify current per-doc declarations) with rationale
- [x] If ratified as-is: any minimal symmetry/clarity edit identified during Discovery is applied without inventing new structure
- [x] Final Summary documents the decision for future fleet-conformance sweeps (natabula) to cite

## 🧩 Subtasks

- [ ] Locate both carve-out declarations in flowtron's own docs and confirm current wording/cross-references
- [ ] Assess whether the two declarations are already coherent (adjacent, self-labeled, cross-referenced) or genuinely fragmented
- [ ] Decide: consolidate vs. ratify, per flowtron's own anti-abstraction principle and CORE-124 precedent
- [ ] Apply the minimal edit the decision implies (if any)
- [ ] Close and record the decision

## 🔗 Related

- [[NAT-182.3]] — natabula routing that filed this decision

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task is exactly as filed — a decide-consolidate-or-ratify call over two already-documented, still-present carve-outs. No drift; both cited surfaces (`tools/update-adopters.mjs`, viz `~/code` default) still exist and are still self-declared exceptions.

- [x] Read relevant source files — SPEC.md §"What flowtron does NOT provide" (lines 1059-1086), §"PR / suggestion archetypes flowtron does not accept"; docs/VISION.md §"What we won't accept" (Cross-project query layers bullet); README.md (`tools/` repo-layout line + global-viz line); docs/MIGRATION.md (global viz section); docs/PLATFORMS.md §"Installed-surface policy". Also read natabula's `NAT-182.3.md` (the routing tasknote that filed this line) for the originating context and exact finding wording.

- [x] **Best Practices Review** — this is a documentation-boundary decision, not code. The touched responsibility is SPEC.md's "flowtron does NOT provide" boundary list, which already has an established idiom (`- <thing> (<clause>)` bullets, cross-referenced by name when two exceptions relate — see CLI bullet's "like viz under the query-API exclusion" phrase). Any edit should extend that idiom, not introduce a new section.

- [x] **Archive skim** — `grep -rl "does NOT provide\|singular exception\|carve-out"` across `.flowtron/tasknote/archive/core/`. Load-bearing precedent: **CORE-124** rewrote this exact SPEC.md section in place (removed a stale "future visualizer" parenthetical, tightened the cross-project-query boundary statement) — confirms the established pattern is incremental in-place bullet refinement, not building a separate consolidated carve-outs doc. VISION.md's "Abstractions without two-project precedent" / "three similar lines is cheaper than an abstraction layer" principle argues the same direction for prose. No prior tasknote proposed or built a consolidated carve-outs section.

- [x] **Drift check** — confirmed both cited surfaces still exist at current HEAD: `tools/update-adopters.mjs` (SPEC.md:63-65, :1063-1069, self-labeled "singular CLI carve-out" / "singular exception, not a precedent"); viz `~/code` global default (`docs/MIGRATION.md`, README.md, SPEC.md:1072-1074 "the read-only visualizer is a single global instance — a multi-project query API is not", VISION.md "Cross-project query layers beyond the read-only visualizer... viz is the singular exception"). The PLAN.md line and natabula's NAT-182.3 finding both match current doc state — no contradiction with any SPEC contract; this task doesn't touch parser grammar, templates, or lifecycle rules.

- [x] Asked clarifying questions — No clarifications needed. Assumption: "the fleet-blind tier claim" (PLAN.md wording, coined by natabula's FLEET-ARCHITECTURE.md doctrine) refers to flowtron's "project-agnostic" self-description (VISION.md, SPEC.md "What is Flowtron"), which the two carve-outs are bounded exceptions to. Natabula's own routing note (NAT-182.3 Final Summary) already classified both as "Confirmed (both self-declared carve-outs)" rather than defects — this task's job is the decide-or-ratify call, not re-litigating whether the carve-outs are legitimate.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Both carve-outs already live in the **same SPEC.md section** (§"What flowtron does NOT provide", lines 1059-1078), two bullets apart, and the CLI bullet already cross-references the viz one by name ("like viz under the query-API exclusion, it is the singular exception, not a precedent" — SPEC.md:1069). The cross-reference is currently **one-directional**: the CLI bullet points at the query-API bullet, but not vice versa.
- VISION.md independently mirrors the viz carve-out in its own "What we won't accept" list (the audience-facing identity doc), which is the intended split per SPEC.md's own framing ("terse AI-facing mirror" vs. "outward-facing" — see SPEC.md §"What flowtron does NOT provide" → "PR / suggestion archetypes" intro line). This split is deliberate, not fragmentation.
- **Decision: ratify the current per-doc declarations as-is — do not build a new consolidated bounded-carve-outs section.** Rationale: (1) both carve-outs already sit together in SPEC.md's canonical boundary list, self-labeled ("singular exception, not a precedent") and already cross-linked in one direction; (2) CORE-124 is direct precedent for refining this exact section in place rather than growing new structure around it; (3) flowtron's own anti-abstraction principle ("three similar lines is cheaper than an abstraction layer that fits none of them well") argues against manufacturing a consolidated doc for two items that already coexist coherently; (4) a new section would duplicate, not clarify — readers already land in §"What flowtron does NOT provide" for exactly this question.
- **Minimal follow-through kept in scope:** make the existing cross-reference reciprocal — add a matching backward pointer from the "Cross-project query API" bullet to the CLI carve-out, so a reader (or a future natabula fleet sweep) lands on either bullet and immediately sees "these two are flowtron's only sanctioned cross-project exceptions" without inferring it from one-directional prose. This is the smallest edit the ratify verdict implies, consistent with the Minimal Refactor Gate (Phase 2) — not a new section, not a rewrite, one clause.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing `- <thing> (<clause>)` bullet idiom already used by every bullet in §"What flowtron does NOT provide", matching the CLI bullet's existing "singular exception, not a precedent" phrasing verbatim so the two carve-outs now read as a matched pair. No new shape introduced.

- [x] **Minimal refactor gate** — N/A for structural refactor (pure prose); the one-clause addition is the entirety of what the ratify verdict requires. No unrelated cleanup taken.

- [x] Implemented the minimal solution — `SPEC.md` §"What flowtron does NOT provide", "Cross-project query API" bullet: appended "; like the CLI carve-out above, it is the singular exception, not a precedent" to make the existing one-directional cross-reference reciprocal.

- [x] Updated/added tests for non-trivial behavior — N/A (doc-only prose edit, no executable surface)

**Implementation Notes:**

- SPEC.md not version-bumped: consistent with CORE-124 precedent (same section, same class of in-place wording tightening) — SPEC version bumps batch at `/ft-release` time, not per doc-clarification task.
- No other file required a matching edit — README.md's `tools/` line and docs/VISION.md's viz bullet already point readers to SPEC.md as the canonical boundary statement; the reciprocal cross-reference only needed to exist once, at the canonical source.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only prose edit, no executable surface)

- [x] Ran lint/type-check on changed code — N/A; re-read the edited section in place (above) to confirm grammar, bullet-idiom consistency, and that the parenthetical closes correctly

- [x] **Quality assertions** — no duplication introduced (the added clause mirrors, doesn't restate, the CLI bullet's own wording); no dead code; no complexity added; no public-surface growth; the edit *removes* staleness (a previously one-directional cross-reference) rather than adding any

- [x] (frontend) Asked the user for visual confirmation — N/A (no UI surface)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs"; only `SPEC.md` is touched by this task (one clause, §"What flowtron does NOT provide"). All other entries: **no change** — `README.md`, `AGENTS.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`. (`docs/VISION.md` is not in this list; its own viz carve-out bullet is unaffected — it already stands independently as the outward-facing mirror.)

- [x] Closed — every `## ✅ Acceptance` criterion ticked (see below); YAML `status:` flipped to `completed`; PLAN.md line flipped to stub form and moved to top of `## Completed`; tasknote moved to `.flowtron/tasknote/archive/core/`.

  - [x] Decision recorded (consolidate vs. ratify) with rationale — **ratified as-is**, see Discovery Notes.
  - [x] Minimal symmetry edit applied without inventing new structure — one clause added to SPEC.md's "Cross-project query API" bullet.
  - [x] Final Summary documents the decision for future fleet-conformance sweeps to cite — below.

- [x] **Evidence-based recap** drafted — inline below (conditional-skip branch; no significant scope deviation, no privileged-ops surface).

**Final Summary:**

Ratified flowtron's two sanctioned cross-project carve-outs (`tools/update-adopters.mjs` CLI exception; viz's global `~/code` workspace default) as correctly-scoped per-doc declarations rather than building a new consolidated bounded-carve-outs statement — both already live together in `SPEC.md` §"What flowtron does NOT provide", self-labeled ("singular exception, not a precedent") and previously cross-referenced in one direction only. Applied the one minimal edit the ratify verdict implied: made that cross-reference reciprocal by appending "; like the CLI carve-out above, it is the singular exception, not a precedent" to the "Cross-project query API" bullet (`SPEC.md` §"What flowtron does NOT provide", +1 clause, no version bump — consistent with the CORE-124 precedent of tightening this same section in place). No new section, no restructuring, no other file touched: `README.md` and `docs/VISION.md` already point readers to `SPEC.md` as the canonical boundary statement. This closes the natabula NAT-182.3 finding "update-adopters.mjs + global viz vs fleet-blind claim" as **Confirmed, ratified, symmetry-fixed** — future fleet-conformance sweeps can cite `SPEC.md` §"What flowtron does NOT provide" as the single already-adequate source rather than expecting a separate carve-outs doc.

**Archived:** 2026-08-28
