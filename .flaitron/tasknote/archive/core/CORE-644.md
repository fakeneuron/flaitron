---
title: audit-bootstrap-self-branch
status: completed
tags: []
created: 2026-09-21
due:
related-tasks: []
touches:
  - claude/skills/ft-audit/scaffold-bootstrap.md
  - templates/audit-overlay-template.md
  - docs/MIGRATION.md
---

# CORE-644 | audit-bootstrap-self-branch

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Add a flowtron-self install-context branch to the `/ft-audit` scaffold bootstrap (step 2 + step 5) so a self-hosted checkout gets the same fork+fill treatment adopters get, and parameterize the referenced-scaffold path note in the overlay template and the §1.2.2 local-fork advice to match.

## ✅ Acceptance

- [x] `scaffold-bootstrap.md` step 2 names a Flowtron-self branch, detected the same way `passes/context.md` detects flowtron-mode — `judgment` (doc-only prose contract, no verify command) — met
- [x] `scaffold-bootstrap.md` step 5 fork+fill branches source paths by install context (adopter vs. flowtron-self) — `judgment` — met
- [x] `templates/audit-overlay-template.md`'s referenced-scaffold path note names both the adopter submodule path and the flowtron-self in-tree path — `judgment` — met
- [x] `docs/MIGRATION.md` §1.2.2's local-fork advice names the in-tree path — `grep -q "in-tree \`claude/skills/ft-audit/SKILL.md\`" docs/MIGRATION.md` → 0
- [x] No regressions in existing suites — `npm --prefix viz test` → 0; `node --test tools/update-adopters.test.mjs` → 0

## 🧩 Subtasks

- [x] Read `scaffold-bootstrap.md` step 2 + step 5, `templates/audit-overlay-template.md`, `docs/MIGRATION.md` §1.2.2, and `passes/context.md`'s flowtron-mode detection pattern
- [x] Add Flowtron-self branch to step 2
- [x] Branch step 5's fork+fill commands and tag lookup by install context
- [x] Parameterize the overlay template's referenced-scaffold note + forker line
- [x] Update §1.2.2's local-fork advice to name the in-tree path
- [x] Run viz test suite + fleet-updater suite

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task-line description is concrete and fully scoped to three named files; no ambiguity to resolve.

- [x] Read relevant source files — read `scaffold-bootstrap.md` in full, `templates/audit-overlay-template.md` in full, `docs/MIGRATION.md` §1.2.1–§1.2.2, and `passes/context.md`'s flowtron-mode detection (§"Scope & rubric hints") as the pattern to mirror.

- [x] **Best Practices Review** — this is a doc/prose-contract change, not code: mirrored the existing adopter-mode/flowtron-self-mode/no-flowtron three-way split already used by `passes/context.md`, rather than inventing a new detection shape. No refactor needed beyond the named files.

- [x] **Archive skim** — `archive/core/` has prior CORE-6xx tasknotes on audit-scaffold and MIGRATION.md work (audit consolidation, `docs.md` scope-token work); none touch `scaffold-bootstrap.md`'s install-context resolution or the overlay template's referenced-scaffold note specifically. No load-bearing prior decisions found.

- [x] **Drift check** — PLAN.md line, file paths, and section anchors (§1.2.1, §1.2.2) all match current repo state; no drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" — **No clarifications needed (--unattended).** Assumption: "flowtron-self" detection mirrors `passes/context.md`'s existing pattern (repo-root `SPEC.md` with heading `# Flowtron — Workflow Specification`) rather than inventing a new one, since the task description explicitly says "as `passes/context.md` already does."

- [x] Subtasks above populated; `touches:` declared.

**Discovery Notes:** Surfaced by audit-docs 2026-09-21 (Finding #6, Medium). Three edits: `scaffold-bootstrap.md` steps 2+5 (install-context branch), `templates/audit-overlay-template.md` (parameterized referenced-scaffold note + forker line), `docs/MIGRATION.md` §1.2.2 (local-fork advice names the in-tree path). All prose-only; no code paths, no tests to add beyond confirming no regressions in the repo's existing suites.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — reused `passes/context.md`'s existing adopter/flowtron-self/no-flowtron three-way detection split verbatim (same trigger: repo-root `SPEC.md` heading) rather than inventing a new convention.

- [x] **Minimal refactor gate** — no refactor; additive prose branches only, in the three named files.

- [x] Implemented the minimal solution — see Implementation Notes.

- [x] Updated/added tests for non-trivial behavior — N/A, doc-only prose contract; no test surface.

**Implementation Notes:**
- `claude/skills/ft-audit/scaffold-bootstrap.md` step 2: added a **Flowtron-self** branch between Adopter and Non-adopter, naming the detection (repo-root `SPEC.md` heading, same as `passes/context.md`) and its referenced-scaffold path (`claude/skills/ft-audit/SKILL.md`, in-tree, no submodule).
- Same file, step 5: split the fork+fill recipe into **Adopter** and **Flowtron-self** sub-branches — adopter copies from `.flowtron/core/...` and reads the pinned tag via `git -C .flowtron/core describe --tags`; flowtron-self copies from the in-tree `templates/`/`claude/commands/` and reads the tag via `git describe --tags` on the checkout itself, keeping the overlay's in-tree referenced-scaffold line.
- `templates/audit-overlay-template.md`: parameterized the "Referenced scaffold" note and the pass-files resolution line to name both the adopter submodule path and the flowtron-self in-tree path; added a line to the trailing forker note telling the forker to keep whichever path matches their checkout and delete the other.
- `docs/MIGRATION.md` §1.2.2: extended the local-fork-under-`.claude/skills/audit/` sentence to say the overlay's referenced-scaffold line should point at the in-tree path here, with a pointer back to `scaffold-bootstrap.md` §2.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, doc-only edits; no code path exercises these files directly. Ran the repo's existing suites as a regression check (below).

- [x] Ran lint/type-check on changed code — N/A, markdown prose; no linter configured for these files (per `docs/MIGRATION.md` §1.2.2's own note that this repo has no markdown linter — CI's `drift` job doc checks are the closest equivalent, not run standalone here since no cross-doc reference resolver applies to these edits).

- [x] **Verification receipt** — commands run, `command → exit code`:
  - `npm --prefix viz test` → 0 (29 files, 568 tests passed)
  - `node --test tools/update-adopters.test.mjs` → 0 (15 suites, 54 tests passed)
  - `node --check tools/update-adopters.test.mjs` → 0
  - `node --check tools/update-adopters.mjs` → 0
  - `grep -q "in-tree \`claude/skills/ft-audit/SKILL.md\`" docs/MIGRATION.md` → 0
  No avoidable duplication, dead code, unexplained complexity, or public-surface growth — three additive prose edits mirroring an existing pattern. No stale code-facing documentation introduced.

- [ ] (frontend) Asked the user for visual confirmation — N/A, no rendered surface; doc/prose-only change.

**Testing Notes:** All verification commands above passed (exit 0). No regressions in the viz suite or the fleet-updater suite, both unrelated to this change but run as the repo's standard regression gate.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs". `docs/MIGRATION.md` is in the swept set and was itself the edit target (§1.2.2) — now consistent with the new `scaffold-bootstrap.md` §2 branch it cites. `claude/skills/ft-audit/scaffold-bootstrap.md` (a `SKILL.md` sibling fragment) and `templates/audit-overlay-template.md` sit outside the sweep set by the README's own exclusion (`SPEC/*.md` and `claude/skills/*/SKILL.md` trees excluded on volume grounds). No other swept doc (`README.md`, `AGENTS.md`, `SPEC.md`, snippets, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`) references the audit-scaffold install-context mechanics. No change needed elsewhere.

- [x] Closed — every Acceptance criterion ticked below with its verify command; `status:` flipped to `completed`; PLAN.md line to be flipped to stub form and moved to `## Completed` top, then this tasknote archived to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Added a flowtron-self install-context branch to `/ft-audit`'s scaffold bootstrap (`claude/skills/ft-audit/scaffold-bootstrap.md` steps 2 + 5), mirroring `passes/context.md`'s existing adopter/flowtron-self/no-flowtron detection (repo-root `SPEC.md` heading) instead of inventing a new convention. Parameterized `templates/audit-overlay-template.md`'s referenced-scaffold note to name both the adopter submodule path and the flowtron-self in-tree path, and updated `docs/MIGRATION.md` §1.2.2's local-fork advice to name the in-tree path with a pointer back to the new branch.

Changed files: `claude/skills/ft-audit/scaffold-bootstrap.md` (+30/-8 lines), `templates/audit-overlay-template.md` (+12/-4 lines), `docs/MIGRATION.md` (+1/-1 line) — all prose-only, no code paths touched.

Verification: `npm --prefix viz test` → 0 (568 passed); `node --test tools/update-adopters.test.mjs` → 0 (54 passed); both `node --check` syntax checks → 0; `grep -q` confirming the new in-tree-path phrase landed in `docs/MIGRATION.md` → 0.

Refactors: none — additive branches only, reusing `passes/context.md`'s existing three-way detection pattern rather than introducing a new one.

Documentation verdict: doc-drift sweep clean (see above) — `docs/MIGRATION.md` was itself the edit target and is now self-consistent with the new scaffold-bootstrap branch it cites.

`touches:` scope reconciliation: declared `claude/skills/ft-audit/scaffold-bootstrap.md`, `templates/audit-overlay-template.md`, `docs/MIGRATION.md` — matches `git diff --name-only` exactly (plus this tasknote file itself and the PLAN.md/archive closure motion).

Maintainability effect: a flowtron-self checkout auditing its own tree now gets the same fork+fill offer (with correct in-tree paths) that adopter checkouts already had, instead of silently falling back to *run once* / *proceed degraded* only.

**Archived:** 2026-09-21
