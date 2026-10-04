---
title: adopter-audit-overlay
status: completed
tags: []
created: 2026-06-05
due:
related-tasks: [CORE-288, CORE-289]
---

# CORE-287 | adopter-audit-overlay

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-288]] [[CORE-289]]

## 🎯 Goal

Design a sanctioned thin-overlay pattern for adopter audit forks: a short project SKILL.md that runs a bundled `ft-audit-*` skill's passes by reference, then layers project-specific deltas — instead of full-copying the body (drift) or symlinking verbatim (no deltas).

## ✅ Acceptance

- [ ] `docs/MIGRATION.md` §1.2.1 documents a third sanctioned install path — **thin overlay** — alongside full-copy fork and (rejected) verbatim symlink, naming when to choose it and its one limitation (relies on the agent loading the referenced scaffold at runtime; no per-pass body edits)
- [ ] An overlay-template ships at `templates/audit-overlay-template.md` matching flowtron's template conventions: a pointer to `.flowtron/core/claude/skills/ft-audit-<x>/SKILL.md` + a `## Deltas` block keyed to the §0 forker-checklist surface (glob / rubric / gates / sacred invariants / per-pass examples / extra hard rules)
- [ ] The stable reference path is the read-only submodule path (`.flowtron/core/claude/skills/ft-audit-<x>/SKILL.md`), since the audit family is forked-not-symlinked and absent from the AGENTS-snippet wiring
- [ ] Zero edits to the six bundled `ft-audit-*` scaffolds (their existing "Install per §1.2.1" pointer already covers the new path)
- [ ] Doc-drift sweep clean; `viz` lint/typecheck/test untouched (docs-only change)

## 🧩 Subtasks

- [ ] Add a **thin overlay** subsection to `docs/MIGRATION.md` §1.2.1 after the full-copy `cp` block: the overlay shape, the stable submodule reference path, the choose-overlay-vs-full-copy rule, and the single limitation
- [ ] Create `templates/audit-overlay-template.md` — frontmatter + pointer + `## Deltas` block mirroring the §0 forker-checklist slots, with a fill-in note
- [ ] Cross-check the new §1.2.1 prose against the bundled scaffolds' existing "fork, don't symlink" line (line 10) — confirm the overlay reads as a sanctioned *third* option, not a contradiction; no scaffold edits
- [ ] Phase 3: docs-only, so confirm no `viz` code touched; run doc-drift sweep over README §"AI-referenced docs"
- [ ] Phase 4: flip PLAN.md line to stub form, archive tasknote, recap

## 🔗 Related

- [[CORE-288]] — fork-provenance markers + `/ft-update` drift warning (sibling FinTown audit-context idea)
- [[CORE-289]] — promote commonly-forked audit orphans into bundled skills (sibling FinTown audit-context idea)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The two failure modes the task names are real and current — full-copy fork drifts (per-stack copies don't pick up scaffold improvements), verbatim symlink can't carry deltas. A sanctioned middle path is genuinely useful and on-label. Operator chose the **doc-convention** altitude (lightest; zero scaffold edits, no new abstraction) — the most flowtron-native answer given the one-project-precedent constraint (`SPEC.md:523`).

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Source read.** `docs/MIGRATION.md` §1.2.1 (lines 66-92) is the canonical fork doc: ships six stack-neutral scaffolds, instructs `cp` full-copy ("Forked, not symlinked"), points to the §0 forker checklist. `claude/skills/ft-audit/SKILL.md` §0 (lines 12-25) enumerates the exact divergence surface: scope glob · rubric files · verification gates · per-pass examples · sacred invariants (Critical) · extra hard rules. That checklist **is** the delta surface an overlay supplies.
- **Reference path is stable.** `claude/AGENTS-snippet.md:32-50` symlinks only the tasknote + worktree families into adopter `.claude/`; the audit family is **not** symlinked (matches §1.2.1 "forked, not symlinked"). So the only clone-independent way an overlay can point at a bundled scaffold is the read-only submodule path `.flowtron/core/claude/skills/ft-audit-<x>/SKILL.md`. This is the "by reference" target.
- **Precedent for by-reference loading.** `/ft-task` already lazy-loads SPEC modules by reference at runtime (Steps 1.5/2/3a/3c). The overlay reuses the same proven "read this file, then act" pattern — no new machinery.
- **Archive skim.** Audit-family archives (CORE-190 🔍-flag SPEC promotion, CORE-243 glossary categorization, CORE-264 dir-rename, the CORE-19x audit epic) cover flag/categorization/wiring — **none** designed a fork-mechanics overlay. New ground; no prior accept/reject decision to honor.
- **Constitution check.** `SPEC.md:523` rejects "abstractions without two-project precedent." The doc-convention altitude adds **no** abstraction and **no** scaffold change — it documents a leaner fork shape (pointer + delta block) that the agent executes with existing behavior. Fully compatible. (The heavier "scaffold-aware overlay mode" was declined precisely on this ground.)
- **Decision (operator).** Altitude 1 (doc convention) · implement inline. Deliverable: §1.2.1 overlay subsection + `templates/audit-overlay-template.md`. **No edits to the six bundled scaffolds** — their existing "Install per §1.2.1" pointer (line 10 of each) already covers the new path.
- **Exit-gate judgment.** Discovery surfaced no significant deviation — the operator confirmed the lightest on-label reading of the filed intent → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey.** Modeled the overlay template's frontmatter (`name:` / `description:`) on `claude/skills/ft-audit/SKILL.md` — an overlay *is* a skill, so it reuses the skill-frontmatter shape, just radically thinner. The `## Deltas` block is keyed 1:1 to the §0 forker-checklist slots so adopters who already know the full-copy path map across instantly. The by-reference run reuses `/ft-task`'s established lazy-load idiom ("read this file, then act").
- **`templates/audit-overlay-template.md`** (new) — ~20-line overlay skeleton: frontmatter + a "read the referenced scaffold first" directive + the stable submodule reference path + a `## Deltas` block (glob / rubric / gates / sacred invariants / per-pass examples / extra hard rules) + a forker note that explicitly tells you to full-copy instead if you outgrow deltas.
- **`docs/MIGRATION.md` §1.2.1** — added a "**Two ways to fork: full copy vs. thin overlay**" subsection after the full-copy `cp` block: names the drift cost of full copy, the overlay's `cp`-the-template install, the read-only submodule reference path, the inherits-improvements-automatically upside, the choose-by-divergence rule (overlay = only §0 surface changes; full copy = pass-body edits), the one limitation (agent must follow the runtime pointer), and an explicit note that verbatim symlink is *not* an option (no deltas).
- **No edits to the six bundled `ft-audit-*` scaffolds** — their line-10 "Install per §1.2.1" pointer already covers the new path; "fork, don't symlink" stays accurate (the overlay copies the *template*, it does not symlink the *scaffold*). No contradiction.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- Docs-only change (`docs/MIGRATION.md`, `README.md`, `SPEC.md`, new `templates/audit-overlay-template.md`). No `viz/` code touched → no targeted suite / lint / type-check applies, and no frontend surface to visually confirm. Verified no real `[[AREA-N]]` wikilinks were introduced into the docs (used the angle-bracket `<x>` placeholder form per SPEC §"Long-description conventions"), so the wikilink-integrity grep stays clean.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep verdicts:**

- `README.md` — **updated** (`templates/` line now lists the audit-overlay fork template alongside tasknote + PLAN).
- `SPEC.md` — **updated** (`templates/` description broadened + §1.2.1 cross-ref; the new audit-overlay template is a third `templates/` kind).
- `docs/MIGRATION.md` — **updated** (§1.2.1 thin-overlay subsection is the primary deliverable).
- `claude/AGENTS-snippet.md` — no change (audit family stays out of the wiring; overlay install is a manual §1.2.1 step).
- `docs/CONVENTIONS.md` · `CONTRIBUTING.md` · `docs/AGENT-NEUTRALITY.md` · `docs/PLATFORMS.md` · `claude/CAPABILITIES.md` · `docs/AGENT-COMPAT.md` — no change.
- `SECURITY.md` — no change (overlay reads a submodule file at runtime; existing submodule-trust threat model already covers it).

**Final Summary:**

Designed and shipped a sanctioned thin-overlay path for adopter audit forks at the doc-convention altitude (operator-chosen, lightest of three). Added a "full copy vs. thin overlay" subsection to `docs/MIGRATION.md` §1.2.1 and a new `templates/audit-overlay-template.md` — a ~20-line SKILL.md that points at the read-only submodule scaffold (`.flowtron/core/claude/skills/ft-audit-<x>/SKILL.md`), runs its 5 passes by reference, and carries only a `## Deltas` block keyed to the §0 forker checklist. Solves full-copy drift (overlays inherit scaffold improvements on bump) without adding any abstraction or touching the six bundled scaffolds — honoring `SPEC.md`'s two-project-precedent rule. Drift fixes to `README.md`/`SPEC.md` `templates/` descriptions. Sibling ideas CORE-288 (provenance drift-warning) and CORE-289 (orphan promotion) remain open.

**Archived:** 2026-06-05
