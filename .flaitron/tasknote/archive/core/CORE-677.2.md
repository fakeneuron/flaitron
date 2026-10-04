---
title: codex-install-verify
status: completed
tags: []
created: 2026-10-01
due:
related-tasks: [CORE-EPIC-677, CORE-677.1, CORE-677.3]
touches:
  - docs/CODEX-VERIFICATION.md
  - codex/AGENTS-snippet.md
  - docs/MIGRATION.md
  - docs/PLATFORMS.md
blocked-by:
  - CORE-677.1
---

# CORE-677.2 | codex-install-verify

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-677]]

## 🎯 Goal

Verify fresh Codex discovery and all wrapper routes, repair Flowtron-owned installation drift, and document reproducible self-host and pinned-adopter evidence.

## ✅ Acceptance

- [x] Before/after installation receipts distinguish filesystem inventory from a fresh Codex runtime roster — `python3 /private/tmp/core677-install/discover.py` and receipt inspection.
- [x] All shipped self-host wrappers resolve to their authoritative bodies; isolated adopter wiring matches the canonical subset through a pinned core — static route assertions and fresh `skills/list` receipts.
- [x] Only verified Flowtron-owned stale global links are retired; unrelated entries preserved and repo-scoped inventory complete — repair preconditions and before/after snapshot assertions.
- [x] Reproducible guidance and honest coverage limits recorded in docs/CODEX-VERIFICATION.md — `judgment`, including any blocked runtime obligation rather than claiming unrun checks.

## 🧩 Subtasks

- [x] Inventory installation and fresh discovery before writes.
- [x] Wire full self-host inventory and retire verified stale global links with filesystem escalation.
- [x] Verify wrapper targets and isolated pinned adopter subset in fresh runtime.
- [x] Document evidence, review independently, sweep docs, and close atomically.

## 🔗 Related

- [[CORE-EPIC-677]] — parent epic.
- [[CORE-677.1]] — blocked-by: completed Discovery; installation Acceptance seeds and sequential Fan-out.
- [[CORE-677.3]] — successor owns workflow/flag parity; this child owns installation evidence.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Fresh discovery confirms installed drift and the implementation matches the filed scope.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- Area lookup: README declares CORE-* → archive/core/. Entry clean; active/archive/sidequest collisions absent. CORE-677.1 closed; sequential Fan-out echoed as blocked-by. Completed has 57 rows, below the advisory bound.
- No clarifications needed. Assume this child verifies discovery and readable wrapper routes, while .3 exercises workflow/flags and .4 compares model runs. No compatibility stamp changes. Preserve discretionary global utilities; report observed duplication rather than silently removing them.
- Read all 12 Codex wrappers, wiring snippet, canonical adopter roster, installed-surface policy, migration retired table, SPEC/procedure and epic/model/gate contracts. Archive skim: CORE-677.1 gives bounded child scope; CORE-439 establishes repo-first wiring and observed duplicate/global collision hazards; retirement evidence is in MIGRATION and CORE-603.3/CORE-572. No past factual claim is falsified by later installed-state repair.
- Best Practices Review: wrappers remain thin pointers to canonical bodies/SOP; wiring follows the existing ignored repo-scoped symlink pattern. No new installer or second roster. Documentation and temporary verification scripts provide receipts; no production-code refactor.
- Before inventory: 18 Flowtron global symlinks, 8 dangling, 10 resolving; 19 unrelated global entries. No repo .agents/skills. Every repair candidate must still be a symlink with its exact target in this checkout. Retain ft-new-project and ft-audit-repo.
- Fresh Codex 0.159.2 app-server initialize + skills/list(forceReload=true) returned ten enabled user-scoped Flowtron skills and zero errors. ft-refactor/ft-seed absent; broken links silently omitted. This is a live runtime catalog, not lifecycle execution or model output. Sandbox attempt exited 1 (state runtime initialization under ~/.codex denied); escalated retry exited 0. No network/model request required for catalog.
- Official OpenAI Build skills page fetched via docs MCP confirms repo walk, symlink support, and possible duplicate names. Actual runtime receipts decide behavior on this version. All cited paths still exist; no Re-scope.


## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Closure doc sweep qualified universal duplicate-enumeration wording in docs/PLATFORMS.md and docs/MIGRATION.md against this runtime's same-target utility result and linked the receipt. No install policy change or distinct-body precedence claim; added those two paths to touches. This is the required in-scope doc-drift fix, not a new workflow approach.

- Pattern survey: used existing ignored .agents/skills full self-host mirror and the eight literal adopter snippet commands; wrapper architecture unchanged. No second install roster/tool introduced. Minimal refactor gate: N/A — machine wiring and evidence docs only, no executable product source changed.
- Applied exact-target checked repair; backup at /private/tmp/core677-install/retired-global-links. Sandbox attempt failed creating protected repo .agents after writing only backup. Escalated retry verified backup content, installed 12 relative links, retired 16 globals, retained the two utilities and 19 unrelated entries. Temporary repair.json carries each link target. Home changes were explicitly approved through filesystem escalation.
- Isolated real git submodule fixture: /private/tmp/core677-install/adopter, pin 7b35a177012d2689505ce021855a6c20c874f25b, eight literal snippet links; static source-route checks cover all 12 self and eight adopter wrappers, every relative reference, frontmatter name, translation pointer, and SSOT derivation.
- Fresh after/adopter processes each ran initialize, skills/list(forceReload), and ephemeral thread/start. No model turns. Self catalog reports ten repo entries and two user utilities, all 12 names enabled and exact self-checkout paths. Adopter reports eight enabled pinned repo entries plus two discretionary user utilities. Zero errors. Unexpected same-target utility deduplication caused the first scope assertion to fail; corrected assertion tests the actual names/paths/scopes, not a promised universal precedence rule.
- Created docs/CODEX-VERIFICATION.md with dated inventory and runtime table, exact before/after target prefixes, preservation hash, approved repair/backup details, raw receipt locations, live reproduction code, static/live/UI/lifecycle coverage boundaries, and both failed commands and final passes. Added a link from codex/AGENTS-snippet.md without changing its parsed install block.
- Updated/added tests: temporary verification scripts only; no shipped runtime changed. Snapshot equality passed for all preserved entries. .3/.4 still own workflow parity, comparison and qualifying compatibility evidence. No direction-changing cross-task decision or downstream reconcile required.


## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered product surface.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `python3 /private/tmp/core677-install/verify.py` → 0: all 12 shipped slugs, self links and primary/relative/translation routes; eight SSOT-derived pinned adopter routes; saved fresh catalogs (names/exact paths/enabled/errors/scopes); exact snapshot preservation for 19 unrelated entries and two utilities. Structural half N/A — no production source changed; existing thin wrappers/install roster preserved, no shipped test/tool added.
- `python3 /private/tmp/core677-install/discover.py` before, escalated → 0: ten user skills, zero errors. Initial sandbox exit 1 with `RuntimeError: server closed stdout`; stderr failed sqlite state initialization under ~/.codex.
- `python3 /private/tmp/core677-install/verify.py` first escalated → 1 at repo-scope count assertion; both after/adopter fresh sessions and catalogs had succeeded. Corrected expectation to 10 repo + 2 same-target user utilities self and 8 pinned repo + 2 user utilities adopter; rechecked saved fresh raw responses → 0. These are runtime discovery receipts, not skill/model execution.
- Repair sandbox → 1, `PermissionError` creating repo .agents; approved escalated exact-target repair → 0. Fixture init/submodule/wiring → 0; `git -C /private/tmp/core677-install/adopter ls-files --stage .flowtron/core` → 0, mode 160000 and pin 7b35a177012d2689505ce021855a6c20c874f25b.
- `python3 -m py_compile` on temporary discovery/repair/verify scripts → 0. Compiling the Python fenced reproduction from the new doc → 0; new/changed Markdown whitespace/final-newline assertions → 0.
- `node --test tools/update-adopters.test.mjs` escalated → 0, 54 tests pass. Earlier sandbox run reported failure in the real-checkout lightweight-tag test and then daemon recovery interrupted the process; its final exit was unavailable. Escalated run restores a complete receipt. `node --check tools/update-adopters.mjs` → 0; `node --check tools/update-adopters.test.mjs` → 0.
- CI-extracted `bash -e` checks for shipped-skill parity, context budget, final newline, Pair B flags and Pair Q section citations → 0 each. Context/Pair Q repeated after the two sweep fixes → 0. `git diff --check` → 0. No visualizer executable changed, so viz tests/typecheck/lint/build N/A for this Markdown/wiring task.
- Independent read-only review (installation_review_recovery) → no blockers, no notes. Reviewer inspected actual links, saved fresh catalogs, repair preconditions, snapshots, route hashes, physical submodule HEAD and staged gitlink. Follow-up review of migration/platform qualifiers and appended receipts → no blockers/notes. Limits: did not rerun mutation/runtime/tests, fetch official docs, test interactive selector, execute lifecycle/modes, or revalidate historical CORE-439 measurement. Disposition: all limits match this child's documented coverage; lifecycle/compatibility remain explicit subsequent-child work.
- Frontend confirmation N/A — no rendered product surface. Judgment: reproducible guidance, preserved unrelated skills, honest coverage distinction and doc qualifiers met. No remaining blocked discovery obligation.


## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:** Installed the full self-host Codex mirror and retired 16 exact-target Flowtron global links with approved filesystem escalation, preserving two discretionary utilities and 19 unrelated entries. Fresh CLI 0.159.2 catalogs/sessions verify all 12 self wrapper names and eight pinned adopter repo skills; source-route checks pass, 54 updater tests pass, documentation gates pass, and independent review reports no blockers/notes. docs/CODEX-VERIFICATION.md records paths/scopes, failed and passing commands, reproduction and coverage limits; snippet links it, and migration/platform docs qualify a disproven universal enumeration assumption while retaining policy. No production-code refactor, workflow execution, model-comparison result or compatibility stamp change.

### Doc-drift sweep

| Document | Verdict |
|---|---|
| `README.md` | no change — existing migration/Codex entry points still resolve |
| `AGENTS.md` | no change — repo layout, validation and wiring description remain accurate |
| `SPEC.md` | no change — task lifecycle and installation policy unchanged |
| `docs/MIGRATION.md` | updated — qualifies duplicate-enumeration wording and links this bounded receipt |
| `claude/AGENTS-snippet.md` | no change — no altered platform wiring, workflow, security or contribution contract |
| `codex/AGENTS-snippet.md` | updated — links to reproducible installation evidence; derived install block unchanged |
| `cursor/AGENTS-snippet.md` | no change — no altered platform wiring, workflow, security or contribution contract |
| `grok/AGENTS-snippet.md` | no change — no altered platform wiring, workflow, security or contribution contract |
| `docs/CONVENTIONS.md` | no change — no altered platform wiring, workflow, security or contribution contract |
| `CONTRIBUTING.md` | no change — no altered platform wiring, workflow, security or contribution contract |
| `SECURITY.md` | no change — no altered platform wiring, workflow, security or contribution contract |
| `docs/AGENT-NEUTRALITY.md` | no change — no altered platform wiring, workflow, security or contribution contract |
| `docs/PLATFORMS.md` | updated — qualifies duplicate-enumeration wording against CLI 0.159.2 same-target utility deduplication; policy unchanged |
| `claude/CAPABILITIES.md` | no change — no Claude runtime or capability claim changed |
| `docs/AGENT-COMPAT.md` | no change — no qualifying report-only dogfood run; stamps preserved |
| `docs/EXTERNAL-AGENTS.md` | no change — no caller-facing stable surface moved/renamed/retired |
| `docs/WORKTREES.md` | no change — isolated installation fixture is not a parallel workflow change |
| `docs/VISION.md` | no change — no installer/runtime/service shipped |

**Scope reconciliation:** Non-workflow diff is exactly declared docs/CODEX-VERIFICATION.md, codex/AGENTS-snippet.md, docs/MIGRATION.md and docs/PLATFORMS.md. PLAN and this archive are lifecycle files. Ignored machine wiring and temporary fixture/scripts/backup remain outside git. No undeclared deliverable; the two sweep-fix paths were added to touches when found. Minimal refactor N/A — documentation/installation evidence preserves thin-wrapper responsibilities.

**Learnings:** N/A for the always-loaded layer — version-bounded catalog behavior is recorded in the evidence doc and installation docs; no new cold-start instruction needed.

**Closure review:** Only CORE-677.2 becomes a nested Completed stub; parent and successor rows remain open. Archive destination is .flowtron/tasknote/archive/core/CORE-677.2.md. All Acceptance criteria satisfied; archived status/stamp and tick-through mechanically checked before move. No deferred real-world hand-off: workflow parity/comparison were already filed as .3/.4. Proposed atomic commit: `docs: CORE-677.2 — verify Codex installation`. Commit docs, PLAN and archive together; no push. Repo link state is per-machine and reproducible from the snippet.

**Archived:** 2026-10-01
