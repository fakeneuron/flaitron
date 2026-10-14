---
title: codex-wiring-bootstrap
status: completed
tags: [codex, skills, adoption]
created: 2026-10-14
due:
related-tasks: [CORE-772, CORE-777, CORE-677.2]
touches:
  - claude/skills/ft-adopt/SKILL.md
  - claude/skills/ft-update/SKILL.md
  - codex/skills/ft-adopt/SKILL.md
  - codex/skills/ft-update/SKILL.md
  - codex/AGENTS-snippet.md
  - codex/reconcile-skills.md
  - claude/AGENTS-snippet.md
  - docs/MIGRATION.md
  - docs/PLATFORMS.md
  - CONTRIBUTING.md
  - docs/WORKTREES.md
  - docs/CODEX-VERIFICATION.md
  - tools/update-adopters.test.mjs
---

# CORE-789 | codex-wiring-bootstrap

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-772]] [[CORE-777]] [[CORE-677.2]]

## 🎯 Goal

Make Codex-selected adoption/update establish and reconcile repo-scoped skills through the adopter pin, including same-version repair, while preserving custom destinations and other platform selection.

## ✅ Acceptance

- [x] Codex adoption and reconciliation bootstrap absent/partial surfaces from the canonical derived roster, preserve the pin and unrelated platform surfaces, and are idempotent — `node --test tools/update-adopters.test.mjs`.
- [x] Known retired links are removed only by exact target/type and absent-body proof; custom live/broken links, files, directories and redirected roots survive with conflicts reported — `node --test tools/update-adopters.test.mjs`.
- [x] Canonical adoption/update and wrappers explicitly select Codex and route same-version/offline/declined-bump repair before exits without gratuitous pin movement — judgment: read procedural control flow; executable fixture checks pin/index preservation.
- [x] Wiring docs agree on selected surfaces, pinned adopters, full self-host inventory, permitted global utilities and `$` invocation; fleet updater boundary stays intact — judgment plus `bash tools/drift-checks.sh`.
- [x] A fresh runtime catalog on a representative disposable pinned adopter is recorded separately from filesystem tests, without claiming fleet-wide discovery or workflow execution — fresh `codex app-server` `skills/list` receipt in `docs/CODEX-VERIFICATION.md`.

## 🧩 Subtasks

- [x] Promote starter; confirm source drift, prior decisions, selection policy and test seam.
- [x] Add a pinned Codex reconciliation block and route canonical adoption/update and wrappers through it.
- [x] Add fixtures for bootstrap/partial/healthy/idempotence/same-pin/retired/custom/multiple surfaces and align docs.
- [x] Run targeted verification, fresh runtime discovery and independent review; reconcile closure scope and archive atomically.

## 🔗 Related

- [[CORE-772]] — inline Claude self-host v7 repair; no tasknote was needed.
- [[CORE-777]] — fleet updater preserves ignored-path choices; no forced staging.
- [[CORE-677.2]] — prior Codex installation/discovery receipt and preservation rules.
- Natabula NAT-416 owns existing fleet backfill; no adopter or agent-home repairs here.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Absent Codex roots and same-version early returns remain reproducible gaps; task scope remains upstream prevention.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Clean entry, no archived collision; README resolves CORE-* to archive/core. Heavy model category satisfied; attended invocation, no flags.
- Starter absorbed from git history. Fidelity: pinned subset, explicit selection, exact ownership, custom conflicts, all listed fixture cases, source/doc parity, runtime evidence limits, and NAT-416 boundary carried into Acceptance/Subtasks.
- Drift surfaced: Codex adopt wrapper already substitutes its snippet at Steps 3/7/8; canonical adoption still routes Claude and update still skips absent Codex and returns before Step 4 at the same version. CORE-772 is an inline PLAN completion, not an archived note. No scope change.
- Archive skim: CORE-677.2 separates static links from fresh runtime catalogs and requires exact link proof; CORE-777 deliberately refuses forced staging of ignored paths. Preserve these choices. CORE-772's PLAN row records Claude-only repair. No historical factual claim falsified.
- Best Practices Review/pattern survey: markdown wiring and thin wrappers remain the production boundary; literal Codex roster stays derived from Claude. Reuse Node temp fixture and shell execution seams in updater tests; updater implementation is outside scope. One shared markdown reconciliation block prevents adopt/update duplication; no installer executable or new CLI.
- No clarifications needed. Selection is the invocation platform unless the operator names another surface; unknown callers ask. Codex-selected adoption creates Codex only; update also maintains already-present surfaces. Compatibility selections for Cursor/Grok stay as documented. Exact retired simple slugs derive from MIGRATION's existing table, never another roster. Conflicts preserve entries and fail repair; ignored path staging requires an operator choice.
- Official OpenAI Build skills page fetched 2026-10-14 confirms repo .agents/skills directory walk and symlink support. No discovery semantics changed. SPEC scope-boundaries and installed-surface policy prohibit a global task-family workaround or broad fleet installer.


## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Extended literal snippet derivation and Node temp fixtures. Shared `codex/reconcile-skills.md` keeps production wiring markdown-only and prevents adopt/update duplication; no fleet implementation changes.
- Caller selection is explicit; current-pin repair precedes fetch/early exits, runs again after an approved bump, and exact changed paths are staged. Same-version/offline/declined-bump hand-offs preserve the index gitlink. Custom destinations and redirected roots fail with a preservation report.
- Retirement derives exact simple slugs from the pinned MIGRATION table and requires symlink/exact own-slug target/absent body. Other platform retirement and unknown/grouped links remain report-only. Global utilities and full self-host inventory remain distinct.
- First new-suite run: 19/22 passed. Tests exposed retirement scanning stopping at a shell comment before the table (fixed heading match), plus a malformed older-roster fixture (fixed all-occurrence substitution). Rerun 22/22 passed.


## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node --test --test-name-pattern='pinned Codex wiring procedure' tools/update-adopters.test.mjs` → 1 initially (19/22); first failure `reconciles renamed/folded links using the pinned retirement table`. Fixed heading scan and malformed older-roster fixture; rerun → 0 (22/22). After external-review fixes → 0 (23/23).
- `node --test tools/update-adopters.test.mjs` (sandbox) → 1 (100/101); first failure `fatal: cannot lock ref refs/tags/v0.0.0-core-424-3-empty-... Operation not permitted`. Approved escalated retry → 0 (101/101); final post-review escalated run → 0 (102/102).
- `node --check tools/update-adopters.test.mjs` → 0; `node --check tools/update-adopters.mjs` → 0.
- `bash tools/drift-checks.sh` → 0 (all checks); `git diff --check` → 0. An intermediate post-archive/pre-stage drift run → 1, first failure `awk: can't open file .flaitron/tasknote/CORE-789.md` (Pair Q reads the tracked file list); Staged the archive/deletion; final post-stage rerun → 0.
- `codex --version` → 0, 0.162.1. `python3 /private/tmp/core789-runtime-5li3btnm/discover.py before` (sandbox) → 1, first failure `RuntimeError: server closed stdout`; approved escalated before/after/repeated → 0 each. Fresh catalogs: 0 repo skills before, 8 enabled after and repeated, zero errors. Shared reconciliation block → 0 both passes (8 CREATED then 8 KEPT); submodule HEAD and index gitlink preserved. Dated receipt appended to docs/CODEX-VERIFICATION.md. Snapshot pin is explicitly unreleased; no interactive invocation/lifecycle/fleet coverage claimed.
- Structural receipt: thin wrappers retained, one roster derived from Claude and one shared markdown procedure. No production installer/CLI, fleet code change, dead code, unrelated refactor, or unnecessary public API. Net-path selector addresses two-pass staging rather than broadening staging scope.
- External review `/root/core789_review`: blocker — wrappers could execute Codex despite explicit other-platform choice; fixed with conditional selection/present-root rules. Blocker — staging deleted untracked links failed git add, especially CREATED at old pin then REMOVED at target; fixed net-path selector with committed-deletion/two-pin regression. Note — repair-only skipped remaining dangling report; fixed Step 5 routing. Independent re-review returned no blockers or notes. Reviewer performed read-only grading, not execution.
- Frontend visual confirmation: N/A — no rendered surface changed.


## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:** Codex-selected adoption/update now establish the pinned repo skill subset, repair absent/partial wiring before same-version/offline/declined-bump exits, and reconcile again after an approved bump. Shared markdown derives the roster and retirement data from the pin, preserves custom destinations, removes only proven-owned retired symlinks, and selects net paths for staging across both pins.

- Deliverables: 13 files, including a new 112-line shared procedure and 298 lines of regression fixtures; thin wrappers and wiring/migration/self-host guidance aligned. Updater implementation and real adopter/global installs untouched.
- Verification: final suite 102/102 (23 new wiring cases); syntax checks, diff whitespace and every drift check pass. Fresh CLI 0.162.1 catalogs verify eight enabled repo skills after bootstrap and repetition; snapshot pin/index preserved. Independent review's two blockers and one note fixed; re-review clean. Rendered confirmation N/A.
- Refactor: one shared inline procedure prevents duplicate adoption/update repair logic. No installer executable, second roster, fleet scope expansion or compatibility stamp change. Custom conflicts remain explicit operator choices; tests do not prove interactive instruction adherence.
- Scope reconciliation: declared 13 deliverable files, changed 13; no undeclared paths. CONTRIBUTING.md and docs/WORKTREES.md were added to touches during the required sweep. Tasknote/PLAN excluded.
- Learnings: N/A — durable repo-first/pinned/exact-ownership principles already exist; their executable wiring now follows them.
- Handoff: proposed commit `fix: CORE-789 Codex wiring bootstrap`. Natabula NAT-416 remains the already-filed fleet repair; no new deferred operator prerequisite. Release/adopter bumps remain separate deliberate motions.

### Doc-drift sweep

| AI-referenced doc | Verdict |
|---|---|
| README.md | no change — Claude quickstart routes other platforms to MIGRATION |
| AGENTS.md | no change — wrapper/layout/validation pointers hold |
| SPEC.md | no change — markdown workflow and pin/scope contracts preserved |
| docs/MIGRATION.md | updated selection, Codex utility install, bootstrap, repair-only and exact-owned retirement/staging guidance |
| claude/AGENTS-snippet.md | updated missing-wiring and bounded Codex retirement description; roster unchanged |
| codex/AGENTS-snippet.md | updated shared reconciliation, selected bootstrap and self-host distinction |
| cursor/AGENTS-snippet.md | no change — compatibility/native selection and native retirement reporting hold |
| grok/AGENTS-snippet.md | no change — compatibility/native selection and native retirement reporting hold |
| docs/CONVENTIONS.md | no change — existing suite/CI/commit conventions preserved |
| CONTRIBUTING.md | updated self-host cleanup from blanket dangling deletion to inventory and exact ownership checks |
| SECURITY.md | no change — pinned markdown supply-chain and fleet implementation boundaries preserved |
| docs/AGENT-NEUTRALITY.md | no change — wiring remains platform-specific outside the neutral contract |
| docs/PLATFORMS.md | updated selection/repair policy and explicit full Codex self-host inventory |
| claude/CAPABILITIES.md | no change — no capability-trigger or currency change |
| docs/AGENT-COMPAT.md | no change — discovery receipt does not establish a new dogfood stamp |
| docs/EXTERNAL-AGENTS.md | no change — stable caller surfaces and orchestration boundaries unchanged |
| docs/WORKTREES.md | updated old Codex worktree-skill links may be pruned, other dangling links reported |
| docs/VISION.md | no change — no new installer/CLI/validator or workflow runtime |

Additional dated doc: docs/CODEX-VERIFICATION.md appended CORE-789's representative receipt without changing prior entries.

**Archived:** 2026-10-14
