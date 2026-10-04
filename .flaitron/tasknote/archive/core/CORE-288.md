---
title: ft-update-fork-drift-warn
status: completed
tags: []
created: 2026-06-05
due:
related-tasks: [CORE-287]
---

# CORE-288 | ft-update-fork-drift-warn

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-287]]

## 🎯 Goal

Add fork-provenance markers (flowtron sha/version a fork was reconciled against) and a `/ft-update` check that warns when a bundled `ft-audit-*` skill has changed since an adopter's same-name fork was last pinned — turning silent drift into a visible prompt.

## ✅ Acceptance

- [ ] `templates/audit-overlay-template.md` frontmatter gains `flowtron-reconciled: <version>` + `flowtron-tracks: ft-audit-<x>` placeholders with a forker note to fill them in
- [ ] `docs/MIGRATION.md` §1.2.1 instructs both full-copy and overlay forkers to add provenance fields; names the fields; explains the `/ft-update` drift-detection integration
- [ ] `claude/skills/ft-update/SKILL.md` gets a Step 4.5 that scans `.claude/skills/*/SKILL.md` for `flowtron-reconciled:` + `flowtron-tracks:`, runs `git log <reconciled>..<target> -- claude/skills/<tracked>/SKILL.md`, and warns non-blockingly per-fork when non-empty
- [ ] Zero edits to the six bundled `ft-audit-*` scaffolds
- [ ] Doc-drift sweep clean

## 🧩 Subtasks

- [ ] Add `flowtron-reconciled: <version>` + `flowtron-tracks: ft-audit-<x>` to `templates/audit-overlay-template.md` frontmatter with placeholder + forker note
- [ ] Add provenance-marker paragraph to `docs/MIGRATION.md` §1.2.1 (after the "Splitting" note, before the "Optional section" close) for both full-copy and overlay forkers
- [ ] Add Step 4.5 — Audit-fork drift scan to `claude/skills/ft-update/SKILL.md` between current Step 4 and Step 5
- [ ] Doc-drift sweep + Phase 4 closure

## 🔗 Related

- [[CORE-287]] — sanctioned thin-overlay path for adopter audit forks (predecessor concept)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The problem is real and current — full-copy forks silently diverge from their upstream scaffolds across version bumps, with no signal to the adopter. CORE-287 established the overlay pattern; CORE-288 closes the feedback loop by making drift visible during `/ft-update`. Doc+skill-prose altitude; zero executable code.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Source read.** `claude/skills/ft-update/SKILL.md` currently has Steps 0–5 with no audit-fork scanning. `templates/audit-overlay-template.md` (shipped by CORE-287) is the install vehicle for overlays; frontmatter has only `name:` + `description:`. `docs/MIGRATION.md` §1.2.1 (lines 66–128) covers full-copy and overlay install; no provenance mentions.
- **Archive skim.** CORE-072 originally added §1.2.1; CORE-106 fixed namespace; CORE-185 aligned pass names. None designed provenance markers or drift-scan machinery. New ground.
- **Drift check.** All cited paths exist and match current state. No drift.
- **Implementation shape.** Two provenance frontmatter fields: `flowtron-reconciled: <version>` (version tag when fork last reconciled, e.g. `v5.2.0`) + `flowtron-tracks: ft-audit-<x>` (which bundled scaffold the fork mirrors). Both apply to full-copy and overlay forks. `/ft-update` Step 4.5 finds `.claude/skills/*/SKILL.md` regular files (not symlinks) with both fields, runs `git log <reconciled>..<target> -- claude/skills/<tracked>/SKILL.md`, warns non-blockingly per-fork when non-empty.
- **No clarifications needed.** Explicit assumptions: (1) version tag sufficient for `flowtron-reconciled:` (git log against tags works); (2) field-based detection is fork-type-agnostic (works for both full-copy and overlay); (3) warning is non-blocking (bump proceeds; adopter reconciles at their pace). Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey.** Frontmatter fields follow the existing SKILL.md + template frontmatter shape (e.g., `name:` / `description:` / `flowtron-reconciled:` / `flowtron-tracks:`). Step 4.5 prose mirrors Step 4's scan-and-report style — same "for each file, check condition, emit result" structure already in use. No new abstraction.
- **`templates/audit-overlay-template.md`** — added `flowtron-reconciled: <version>` + `flowtron-tracks: ft-audit-<x>` to frontmatter; added forker note at the bottom explaining how to fill them in and their purpose.
- **`docs/MIGRATION.md` §1.2.1** — added "Fork-provenance markers" paragraph after the "Splitting" note: documents both fields with YAML example, explains the `/ft-update` integration (scan → git log → non-blocking warn → update after reconcile), notes opt-in (pre-marker forks silently skipped).
- **`claude/skills/ft-update/SKILL.md`** — inserted Step 4.5 between Step 4 and Step 5: scan `.claude/skills/*/SKILL.md` regular files for `flowtron-reconciled:` + `flowtron-tracks:`, run `git log <reconciled>..<target>` per tracked scaffold, emit per-fork non-blocking warnings with diff command when non-empty, "no provenance-marked forks" notice when none found.
- **Zero edits to bundled `ft-audit-*` scaffolds.** Fields are opt-in on the adopter's fork side only.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Docs-only change (`templates/audit-overlay-template.md`, `docs/MIGRATION.md`, `claude/skills/ft-update/SKILL.md`). No `viz/` code touched → no targeted suite / lint / type-check applies; no frontend surface. Verified no spurious `[[AREA-N]]` wikilinks introduced. All three provenance field names are consistent across all three files.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep verdicts:**

- `README.md` — no change (`templates/` description already covers audit-overlay template; no field-level detail expected there)
- `SPEC.md` — no change (only names `/ft-update` by mention; step internals live in the skill, not SPEC)
- `docs/MIGRATION.md` — **updated** (§1.2.1 "Fork-provenance markers" paragraph added — primary deliverable)
- `claude/AGENTS-snippet.md` — no change (audit family stays out of wiring; Step 4.5 is inside ft-update, not a new skill)
- `docs/CONVENTIONS.md` · `CONTRIBUTING.md` · `SECURITY.md` · `docs/AGENT-NEUTRALITY.md` · `docs/PLATFORMS.md` · `claude/CAPABILITIES.md` · `docs/AGENT-COMPAT.md` — no change

**Final Summary:**

Added fork-provenance markers (`flowtron-reconciled:` + `flowtron-tracks:`) to `templates/audit-overlay-template.md` frontmatter; documented the convention in `docs/MIGRATION.md` §1.2.1 for both full-copy and overlay forks; added Step 4.5 to `claude/skills/ft-update/SKILL.md` that scans adopter `.claude/skills/*/SKILL.md` regular files for these markers and emits a non-blocking per-fork warning (with diff command) when the tracked scaffold changed between the reconciled version and the bump target. Turns silent audit-fork drift into a visible prompt during every `/ft-update` run. Zero edits to bundled scaffolds; opt-in for pre-marker forks.

**Archived:** 2026-06-05
