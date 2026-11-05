---
title: brand-nearmiss-guard
status: completed
tags: []
created: 2026-11-04
due:
related-tasks: [CORE-861]
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - docs/CONVENTIONS.md
---

# CORE-860 | brand-nearmiss-guard

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-861]]

## 🎯 Goal

Reject the filed near-miss spellings of flaitron in tracked text with a portable drift check, regression coverage, and release catalogue documentation.

## ✅ Acceptance

- [x] Tracked text rejects every filed spelling, case-insensitively, with file/line diagnostics; binary and untracked files, embedded identifier substrings, and the check/test sources are excluded — `node --test tools/drift-checks.test.mjs`.
- [x] The final checkout passes all drift checks and documents the new check in the release catalogue — `bash tools/drift-checks.sh` and `grep -q 'brand_nearmiss' claude/skills/ft-release/step-7.1-mirror-pairs.md`.
- [x] Existing declared validation remains green — the eight commands in `AGENTS.md` §"Validation".

## 🧩 Subtasks

- [x] Extend the shell dispatcher with a tracked-text brand check and vacuity/error handling.
- [x] Add seeded-drift coverage and focused positive/negative behavior tests.
- [x] Document the check, run validation and external review, then close atomically.

## 🔗 Related

- [[CORE-861]] — separate casing-policy decision; this task only rejects spelling near misses.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The filed guard fits the existing dispatcher and self-test pattern; casing remains separately owned by CORE-861.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Read the shell, seeded-case harness, release catalogue and conventions mirror. Extend the existing function-per-check abstraction, keeping shell in one place; no refactor required.
- Archive probe read CORE-739.2/.3, CORE-734.2/.7 and CORE-830 plus related predecessors. Preserve Bash 3.2-compatible arithmetic, a non-vacuity floor, and exactly one CASES entry per check asserting exit 1 plus its specific finding. A named non-pair check must be selected explicitly at release; update catalogue invocation/count and the conventions mirror together.
- Drift check found only this task's PLAN description contains standalone near misses. Its illustrative enumeration will be removed during Execution after the exact set lands in the excluded test source; closure replaces the row with its stub. A substring scan also found valid camel-case identifiers, so word boundaries are needed. No source changes or archived-history corrections are required.
- No clarifications needed (--fast). Assume case-insensitive standalone words, portable POSIX ERE boundaries, tracked text only, exact exclusions for the check and test; title-case policy stays out of scope. Explicitly test all filed variants, punctuation, substrings, binary/untracked inputs and paths containing spaces.
- Discovery surfaced no significant deviation → skip 🛠️. Declared scope includes the catalogue's conventions mirror; it is fixed at Phase 1 exit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Added `brand_nearmiss` using the dispatcher pattern, null-delimited tracked paths, POSIX ERE word boundaries, case-insensitive text scanning and explicit grep-error handling. No refactor.
- Added one seeded CASES entry plus isolated git-fixture tests for every variant and the clean/excluded cases. Updated the release invocation and catalogue, with its conventions mirror.
- Removed the intentional example enumeration from this task's own PLAN description after preserving it in the excluded test source; the requested behavior and row tokens remain intact.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no rendered surface changed.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Scope guard at Phase 3 entry and after the doc sweep passed. All deliverables match the four fixed `touches:` paths; PLAN and this tasknote are workflow exceptions. Added + deleted non-workflow lines = 74, below 400; no binary, lockfile or generated-path exemption needed.
- `node --test tools/drift-checks.test.mjs` → 0 (24 tests).
- `bash -n tools/drift-checks.sh` → 0.
- `node --check tools/drift-checks.test.mjs` → 0.
- `git diff --check` → 0.
- `npm --prefix viz test` → 0 (647 tests, 31 files).
- `npm --prefix viz run typecheck` → 0.
- `npm --prefix viz run lint` → 0.
- `npm --prefix viz run build` → 0.
- `node --test tools/update-adopters.test.mjs` → 0 (122 tests).
- `node --check tools/update-adopters.test.mjs` → 0.
- `node --check tools/update-adopters.mjs` → 0.
- `bash tools/drift-checks.sh` → 0 (all checks, including `brand_nearmiss`).
- `grep -q 'brand_nearmiss' claude/skills/ft-release/step-7.1-mirror-pairs.md` → 0.
- External review by a non-author read-only probe over this task's own working diff and Acceptance found no blockers. One note — missing CORE-861 nav chip despite the YAML relation — fixed in the active note. Reviewer independently confirmed shell/JS syntax and whitespace; did not rerun suites, another OS, or the external source script. No avoidable duplication, dead code, unexplained complexity or stale code-facing docs found.
- No rendered surface; visual confirmation N/A. No follow-up findings or deferred operator actions to file.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Added the portable `brand_nearmiss` guard, exhaustive spelling cases and isolated exclusion/boundary tests. CI discovers it automatically; the release catalogue explicitly runs it, and conventions reflect the new selection/count. All eight declared validation commands and the full drift scan passed; external review found no blockers and its metadata note was fixed. No refactor or unrelated cleanup.

Doc-drift sweep, per declared entry:
- README.md — no change; tools description remains accurate.
- AGENTS.md — no change; command roster and automatic dispatcher remain accurate.
- SPEC.md — no change; no workflow contract change.
- docs/MIGRATION.md — no change.
- claude/AGENTS-snippet.md — no change.
- codex/AGENTS-snippet.md — no change.
- cursor/AGENTS-snippet.md — no change.
- grok/AGENTS-snippet.md — no change.
- docs/CONVENTIONS.md — updated spelling-guard catalogue ownership, release selection and function count.
- CONTRIBUTING.md — no change.
- SECURITY.md — no change.
- docs/AGENT-NEUTRALITY.md — no change.
- docs/PLATFORMS.md — no change.
- claude/CAPABILITIES.md — no change; not a version bump.
- docs/AGENT-COMPAT.md — no change.
- docs/EXTERNAL-AGENTS.md — no change; no stable-surface changes.
- docs/WORKTREES.md — no change.
- docs/VISION.md — no change; self-host maintenance boundary retained.

Scope reconciled against `git diff --name-only HEAD` plus untracked paths; all four declared deliverables and only this task's workflow paths changed. Maintainability improves through one canonical shell implementation, automatic CI discovery and regression tests tied to diagnostics. Learnings N/A — no new always-loaded guidance needed. No deferred work; CORE-861 remains the already-filed casing-policy decision.

**Archived:** 2026-11-04
