---
title: verify-installer-index-pin
status: completed
tags: []
created: 2026-11-25
due:
related-tasks: [CORE-851, CORE-855, CORE-863]
touches:
  - install.sh
  - tools/install.test.sh
---

# CORE-943 | verify-installer-index-pin

[← PLAN.md](../../../PLAN.md) · 🟢 In progress · 🔗 [[CORE-851]] [[CORE-855]] [[CORE-863]]

## 🎯 Goal

Require the parent index gitlink to match the verified release before the installer reports success, while preserving a conflicting staged pin.

## ✅ Acceptance

- [x] A checkout already at the requested release with a different staged gitlink causes update to fail before wiring, without changing the index or checkout — `sh tools/install.test.sh install.sh`.
- [x] Fresh install, matching rerun, and ordinary updates leave the verified commit staged as a gitlink — `sh tools/install.test.sh install.sh`.
- [x] Installer and regression fixtures pass POSIX shell lint — `shellcheck -s sh install.sh tools/install.test.sh`.

## 🧩 Subtasks

- [x] Add a regression for an existing checkout and a separately staged gitlink.
- [x] Check the parent gitlink before overwriting it and verify it before reporting success.
- [x] Run installer validation and independent review.

## 🔗 Related

- [[CORE-851]] — original installer and scoped bootstrap contract.
- [[CORE-855]] — live installer validation.
- [[CORE-863]] — compatibility with older tagged checkouts.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The existing checkout fast path verifies the submodule HEAD and release tag, but never reads the parent index.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- `install_submodule` owns both the checkout and index write. Keep checkout/tag verification in `verify_commit` and check the parent index only for the project submodule. The global clone has no parent gitlink.
- Archive skim of declared paths found CORE-851, CORE-855, and CORE-863. The installer still stages the gitlink without committing, and existing release-tag compatibility remains in scope. The installer and its end-to-end test are one module.
- The PLAN row and installer carve-out in `SPEC/scope-boundaries.md` agree with the implementation scope. No clarifications needed. Treat an index entry equal to the requested release as usable, and refuse to replace a different index entry when the current checkout differs from it.
- Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Used the existing checkout and verification sequence. Read the exact stage-0 parent gitlink, refused a conflicting entry, and checked the stage again before announcing success. Verify the checkout before staging it and re-read the index immediately before writing so a new conflicting pin observed during checkout is preserved.
- Kept the change inside the installer and reused the end-to-end fixture's previous and latest release commits. No broader refactor.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] Visual confirmation — N/A, no rendered surface.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `sh tools/install.test.sh /tmp/core-943-installer-before.sh` → 1. First failure: `FAIL index mismatch refused`. The original script also failed the diagnostic and no-success-output checks.
- `sh tools/install.test.sh install.sh` → 0. The live suite covered fresh install, rerun, explicit and latest updates, and refusal with the prior release staged and the requested release checked out.
- `shellcheck -s sh install.sh tools/install.test.sh` → 0. `git diff --check` → 0. The changed code has no dead paths, duplicate parsing, or stale docs.
- Independent review found no blockers. Addressed both notes by re-reading the index before staging and asserting mode 160000 in the fresh-install test.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

The installer requires the parent's staged gitlink to agree with the verified release before reporting success. A conflicting staged pin gets a diagnostic and is preserved. The installer change was +29/−6 and the end-to-end suite added 20 lines. Declared 2 deliverable paths, changed 2, no undeclared paths. ShellCheck and the live installer test passed. The index verification stays local to the project install, with one parser shared by the preflight and final check.

Doc-drift sweep, no change per entry: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, and `docs/VISION.md`. The bootstrap, tag verification, wiring, and handoff contracts still apply.

`bash tools/drift-checks.sh` → 0.

Learnings: N/A. No always-loaded guidance needed.

**Archived:** 2026-11-25
