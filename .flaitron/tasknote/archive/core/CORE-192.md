---
title: audit-family phrasing residuals
status: completed
tags: []
created: 2026-05-24
related-tasks: [CORE-187, CORE-185, CORE-164, CORE-190]
---

# CORE-192 | audit-family phrasing residuals

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-187]] [[CORE-185]] [[CORE-164]] [[CORE-190]]

## 🎯 Goal

Unify "audit family" scope phrasing across SPEC.md §"Skill namespace" (currently treats family as 5 specialists), docs/PLATFORMS.md:31 (uses 6-incl-base), and docs/MIGRATION.md §1.2.1 (uses 6-incl-base, avoids "family" word) — adopting the all-6 brace-set form per MIGRATION.md's canonical shape — and tighten PLATFORMS.md:31's "drive the SPEC's phases inline" claim to scope to the six tasknote skills only.

## ✅ Acceptance

- [x] SPEC §"Skill namespace" enumerates `/ft-audit` inside an all-6 brace-set form (not standalone + 5-specialist brace) so the family-size count aligns with PLATFORMS.md and MIGRATION.md.
- [x] PLATFORMS.md:31 "drive the SPEC's phases inline" claim is scoped to the six tasknote skills only; audit-family / release / info skills explicitly carry their own recipe label.
- [x] Doc-drift sweep at Phase 4 clean.

## 🧩 Subtasks

- [x] Edit SPEC.md §"Skill namespace": remove standalone `/ft-audit` from the explicit enumeration; change `/ft-audit-{docs,backend,frontend,performance,security}` → `/ft-audit{,-docs,-backend,-frontend,-performance,-security}` (preserves existing SPEC suffix order, folds base into the brace-set).
- [x] Edit PLATFORMS.md:31: restructure the Claude Code row to split the slash-command enumeration into three groups — six tasknote skills (drive the SPEC's 4-phase workflow inline), six audit-family skills (run the 5-pass capped-findings recipe), six standalone skills (follow their own recipes).
- [x] Doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs".
- [x] Close (PLAN.md line → stub form, tasknote → archive/core/).

## 🔗 Related

- [[CORE-187]] — same-day prior round: replaced the bare `ft-audit*/` glob with the all-6 brace-set in MIGRATION.md:67 and normalized PLATFORMS.md:31,171 phrasing. CORE-192 finishes the unification by pulling SPEC into the same 6-incl-base framing.
- [[CORE-185]] — canonized "six fork-and-customize specialists per MIGRATION.md §1.2.1" as the audit-family scope; established MIGRATION.md §1.2.1 as the de-facto canonical layer the other layers should align to.
- [[CORE-164]] — earlier PLATFORMS.md:31 fix replacing `/ft-audit-*` (hyphenated, excludes base) with an explicit 6-skill list; established the 6-incl-base treatment in PLATFORMS.
- [[CORE-190]] — promoted 🔍 audit-family flag to SPEC §"Post-closure protocol" step 2 (different SPEC section; symbolic ancestor of "audit family" as a first-class SPEC concept).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Real cross-doc inconsistency surfaced by audit-docs 2026-05-24 (Findings #1-2, Low). MIGRATION.md and PLATFORMS.md already treat the audit family as 6 (incl. base) per CORE-187 / CORE-164 / CORE-185; SPEC §"Skill namespace" is the outlier — lists `/ft-audit` standalone AND `/ft-audit-{...}` (5 specialists). Aligning SPEC eliminates a load-bearing scope ambiguity. The PLATFORMS.md:31 "drive the SPEC's phases inline" claim is also genuinely over-broad (applies cleanly to the six tasknote skills only).

- [x] Read relevant source files — `SPEC.md` §"Skill namespace" (lines 82-91), `docs/PLATFORMS.md` (lines 27-39 incl. line 31 table row; line 171 file-enumeration list), `docs/MIGRATION.md` §1.2.1 (lines 65-91).
- [x] **Archive skim** — Four directly-related prior tasknotes read in full:
  - CORE-187 (same-day): established the 6-incl-base brace-set framing in MIGRATION.md:67 and the "ft-audit-family" prose in PLATFORMS.md:31,171.
  - CORE-185: canonized "six fork-and-customize specialists per MIGRATION.md §1.2.1" as the family scope; MIGRATION.md §1.2.1 is the de-facto canonical layer.
  - CORE-164: original 6-incl-base treatment in PLATFORMS.md:31 (replacing hyphenated glob).
  - CORE-190: promoted 🔍 audit-family flag to SPEC §"Post-closure protocol" step 2 (different SPEC section; symbolic family ancestor).
  No prior tasknote touched SPEC §"Skill namespace" for audit-family scope; the section has been the lingering outlier since the audit family expanded.
- [x] **Drift check** — All three cited locations verified verbatim:
  - SPEC.md lines 82-91 still enumerate `/ft-audit` standalone (line 83) AND `/ft-audit-{docs,backend,frontend,performance,security}` (line 87) — 5-specialist brace.
  - PLATFORMS.md:31 still ends `drive the SPEC's phases inline.` after enumerating ~18 skills.
  - PLATFORMS.md:171 uses `the six ft-audit-family skills` (already 6-incl-base form, no action needed).
  - MIGRATION.md §1.2.1 headline at line 67 already uses `ft-audit{,-docs,-security,-frontend,-backend,-performance}/` (all-6 brace, no action needed). No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  - **Brace-set ordering:** preserve SPEC's existing suffix order (`docs, backend, frontend, performance, security`) and prepend the empty suffix → `/ft-audit{,-docs,-backend,-frontend,-performance,-security}`. MIGRATION.md uses a different order (`{,-docs,-security,-frontend,-backend,-performance}`); unifying the ordering across two layers is a separate concern (would also need touching PLATFORMS' explicit list). Per SPEC §"default-skip judgment rule" this is a format/style pick — skip case.
  - **PLATFORMS.md:31 restructuring shape:** split the slash-command enumeration into three labeled groups — tasknote (6: drives 4-phase), audit-family (6: 5-pass capped-findings), standalone (6: own recipes). This directly addresses the over-broad "drive the SPEC's phases inline" claim by giving each group its own predicate; matches the task description's "audit/release/info skills follow other recipes" gloss.
  - **PLATFORMS.md:171 untouched:** the file-enumeration list there has no "drive the SPEC's phases" claim attached and already uses 6-incl-base "ft-audit-family" form — no action needed.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

This is the SPEC-side completion of CORE-187's cross-doc unification round. CORE-187 normalized PLATFORMS.md + MIGRATION.md on the 6-incl-base framing; SPEC §"Skill namespace" was untouched and remained the 5-specialist outlier. CORE-192 closes that gap.

The PLATFORMS.md:31 "drive the SPEC's phases inline" sub-fix is technically separate but tightly coupled — both originate from audit-docs 2026-05-24 (Findings #1-2, Low) and both edit the same line. Co-bundling under one tasknote per the PLAN.md filing.

Discovery surfaced no significant deviation → skip 🛠️.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — SPEC §"Skill namespace" already uses comma-separated `/ft-*` enumeration with the audit family broken out as a tagged sub-cluster (`and the audit family /ft-audit-{...}`); the minimal-surgery move is to extend that shape — remove the standalone `/ft-audit` from the explicit enumeration and fold it into the brace-set as the empty-suffix entry. For PLATFORMS.md:31, the table-cell prose uses single-sentence enumeration; the three-group restructure splits the predicate across three clauses but keeps the same skill enumeration intact (no skill added/dropped) — extends the existing shape rather than replacing it.
- [x] Implemented the minimal solution — 2 edits across 2 files. SPEC.md: 1 line removed (`/ft-audit,` from enumeration), 1 line edited (brace-set form). PLATFORMS.md:31: table-cell prose restructured from one clause to three.
- [x] Updated/added tests for non-trivial behavior — N/A; pure markdown doc edits, no test toolchain applies.

**Implementation Notes:**

Edit 1 — `SPEC.md` §"Skill namespace" (lines 82-91):

Before:
> Bundled flowtron skills carry the `ft-` prefix in their slug (`/ft-task`, `/ft-audit`, `/ft-release`, `/ft-new-project`, `/ft-starter-task`, `/ft-micro-task`, `/ft-file-followup`, `/ft-epic-discovery`, `/ft-close-epic`, `/ft-flowtron`, `/ft-stats`, `/ft-quality`, `/ft-audit-context`, and the audit family `/ft-audit-{docs,backend,frontend,performance,security}`).

After:
> Bundled flowtron skills carry the `ft-` prefix in their slug (`/ft-task`, `/ft-release`, `/ft-new-project`, `/ft-starter-task`, `/ft-micro-task`, `/ft-file-followup`, `/ft-epic-discovery`, `/ft-close-epic`, `/ft-flowtron`, `/ft-stats`, `/ft-quality`, `/ft-audit-context`, and the audit family `/ft-audit{,-docs,-backend,-frontend,-performance,-security}`).

`/ft-audit` removed from explicit enumeration (now lives inside the brace-set as the empty-suffix entry). Suffix order preserved from prior 5-specialist form (`docs, backend, frontend, performance, security`).

Edit 2 — `docs/PLATFORMS.md:31` (Claude Code row of the "Today's surface" table):

Before:
> Wiring layer + contract layer. Slash commands (`/ft-task`, `/ft-starter-task`, `/ft-micro-task`, `/ft-file-followup`, `/ft-epic-discovery`, `/ft-close-epic`, the six `/ft-audit`-family skills (`/ft-audit`, `/ft-audit-docs`, `/ft-audit-backend`, `/ft-audit-frontend`, `/ft-audit-performance`, `/ft-audit-security`), and `/ft-new-project` / `/ft-release` / `/ft-flowtron` / `/ft-stats` / `/ft-quality` / `/ft-audit-context`) drive the SPEC's phases inline.

After:
> Wiring layer + contract layer. Six tasknote skills (`/ft-task`, `/ft-starter-task`, `/ft-micro-task`, `/ft-file-followup`, `/ft-epic-discovery`, `/ft-close-epic`) drive the SPEC's 4-phase workflow inline; the six `/ft-audit`-family skills (`/ft-audit`, `/ft-audit-docs`, `/ft-audit-backend`, `/ft-audit-frontend`, `/ft-audit-performance`, `/ft-audit-security`) run the 5-pass capped-findings recipe; standalone skills `/ft-new-project`, `/ft-release`, `/ft-flowtron`, `/ft-stats`, `/ft-quality`, `/ft-audit-context` follow their own recipes.

Three groups, each with its own predicate. "Drive the SPEC's phases" now scoped correctly. "4-phase workflow" replaces bare "phases" for additional precision (matches SPEC §"The 4-phase workflow" terminology).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A; pure markdown doc edits, no test toolchain.
- [x] Ran lint/type-check on changed code — N/A; pure markdown doc edits, no toolchain.
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A; no frontend surface.

**Testing Notes:**

Two grep sweeps after the edits:

1. **Negative sweep** — `grep -rnE '/ft-audit-\{docs,backend,frontend,performance,security\}'` against `SPEC.md SPEC/ docs/ claude/ templates/ README.md` returned 0 hits. The 5-specialist brace-set is fully removed from the contract surface.
2. **Positive sweep** — `grep -rnE 'ft-audit\{'` returned exactly two hits, both intentional:
   - `SPEC.md:88` — the new all-6 brace (this task's edit).
   - `docs/MIGRATION.md:67` — preexisting all-6 brace (CORE-187's edit).

   PLATFORMS.md uses an explicit 6-skill list (not a brace-set) — also unchanged in shape, only the predicate restructured.

Verified by inspection: SPEC §"Skill namespace" reads cleanly with `/ft-audit` no longer standalone; the all-6 brace renders as one disjunctive group covering all six audit-family skills. PLATFORMS.md:31 table row renders as three semicolon-separated clauses, each attributing the correct execution recipe to its skill group.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 9 AI-referenced docs walked:
  - `README.md` — no change (no audit-family scope references; grep clean)
  - `SPEC.md` — UPDATED (§"Skill namespace" now uses all-6 brace-set; standalone `/ft-audit` enumeration removed)
  - `docs/MIGRATION.md` — no change (§1.2.1 already uses 6-incl-base all-6 brace form per CORE-187)
  - `claude/AGENTS-snippet.md` — no change (grep clean)
  - `docs/CONVENTIONS.md` — no change (grep clean)
  - `CONTRIBUTING.md` — no change (grep clean)
  - `SECURITY.md` — no change (grep clean; mentions audit skills by ID only)
  - `docs/AGENT-NEUTRALITY.md` — no change (grep clean)
  - `docs/PLATFORMS.md` — UPDATED (line 31 split into three labeled groups: 6 tasknote → 4-phase, 6 audit-family → 5-pass, 6 standalone → own recipes; line 171 untouched, already 6-incl-base)
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-24.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted

**Final Summary:**

Unified "audit family" scope phrasing across SPEC.md, docs/PLATFORMS.md, and docs/MIGRATION.md to the 6-incl-base treatment that MIGRATION.md §1.2.1 already canonized (per CORE-187 / CORE-185). SPEC §"Skill namespace" was the lingering outlier — listed `/ft-audit` standalone AND `/ft-audit-{...}` (5 specialists); now uses one all-6 brace-set `/ft-audit{,-docs,-backend,-frontend,-performance,-security}` with `/ft-audit` folded in via the empty-suffix entry. Separately, tightened PLATFORMS.md:31's over-broad "drive the SPEC's phases inline" claim by splitting the slash-command enumeration into three labeled groups — six tasknote skills drive the 4-phase workflow, six audit-family skills run the 5-pass capped-findings recipe, six standalone skills follow their own recipes. 2 files touched; ~2 lines of SPEC + 1 table-cell row in PLATFORMS.md.

**Archived:** 2026-05-24
