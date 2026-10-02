---
title: codex-workflow-parity
status: completed
tags: []
created: 2026-10-01
due:
related-tasks: [CORE-EPIC-677, CORE-677.1, CORE-677.2, CORE-677.4, CORE-675, CORE-670.3]
touches:
  - docs/CODEX-VERIFICATION.md
  - docs/PLATFORMS.md
  - docs/AGENT-NEUTRALITY.md
  - SPEC/procedures/ft-task.md
  - codex/skills/ft-new-project/SKILL.md
blocked-by:
  - CORE-677.2
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

# CORE-677.3 | codex-workflow-parity

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-677]]

## 🎯 Goal

Verify Codex workflow routes and representative lifecycle/mode behavior, repair evidenced parity gaps, and document static versus live coverage.

## ✅ Acceptance

- [x] All 12 wrapper routes, flags/aliases, lazy fragments and applicability reviewed — temporary static route check plus judgment matrix in docs/CODEX-VERIFICATION.md.
- [x] Representative entry, gate/park and mode fixtures exercised with prompts, runtime versions and deciding artifact receipts — temporary fixture verifier; unsupported/unrun cells explicitly labeled.
- [x] Evidenced SOP/translation drift fixed and full source/restates currency reviewed — judgment against canonical dispatch, templates and SPEC contracts; targeted regression checks.
- [x] Durable evidence distinguishes static checks, live model behavior and compatibility dogfood — judgment; no comparison or qualifying stamp claim.

## 🧩 Subtasks

- [x] Inventory wrapper dispatch and full SOP currency; inspect relevant archive decisions.
- [x] Run representative isolated Codex fixtures and fix evidenced gaps.
- [x] Record coverage, verify changed contracts/docs, and obtain independent review.
- [x] Sweep docs, reconcile scope, archive this child and commit deliverables atomically.

## 🔗 Related

- [[CORE-EPIC-677]] — parent; bounded Codex verification.
- [[CORE-677.1]] — scope, Acceptance seeds and sequential Fan-out.
- [[CORE-677.2]] — blocked-by: installation verification completed.
- [[CORE-677.4]] — successor owns same-model SOP control and Grok comparison.
- [[CORE-675]] — targeted Learnings repair did not establish full SOP currency.
- [[CORE-670.3]] — debug fragment routing precedent.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All wrapper routes resolve, but current SOP dispatch and Codex question/bootstrap guidance have evidenced parity gaps within the filed scope.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- Clean entry checked before scaffold; active/archive collisions absent. README table resolves CORE-* to archive/core/. CORE-677.2 is completed; .1 Fan-out declares sequential dependency, echoed in YAML. Completed count remains 57 (below 60).
- No clarifications needed. Preserve thin wrappers, reuse executable fragments, test isolated fixtures without comparison or dogfood claims. Temporary source-copy fixtures are not pinned submodule installation evidence. No production/Grok calibration edits.
- Read wrappers, SOP, templates, wiring/policy docs and relevant SPEC modules. Read-only probes inspected broad canonical dispatch and archive history; parent read CORE-677.1/.2. Archive CORE-670.3 requires route-to-fragment rather than duplicate modes; CORE-675 permits stamp refresh only after full source/restates review; CORE-258 bounds runtime claims.
- Best Practices Review: wrapper → SOP/canonical body → shared contract dependency remains; fixes should add missing route instructions rather than duplicate mode bodies. Bootstrap needs one Codex-specific rule because Claude body demands verbatim Claude wiring/settings/entrypoint paths.
- Full SOP review found loop/entry-edge fragment dispatch omissions, incomplete mode delegation language, missed filing advisory/receipt-tail/review-range/token-preservation/next-candidate instructions, and ambiguous hard-dependency handling. Probes found all explicit wrapper and lazy fragment targets resolving. These are in-scope evidenced corrections, not a direction change.
- Source currency since 2026-09-12: 22 source commits, eight without SOP; 22 SPEC.md commits. CORE-616 receipt-tail and CORE-604.3 model branches need explicit coverage; CORE-658 already fixed by CORE-675; CORE-673 is Claude review dispatch, CORE-664/622.3 citation-only, CORE-605 already matches placement, CORE-603.4 description-only. Final pass required before stamp write.
- docs/PLATFORMS Codex structured/deep rows contradict conditional wrapper fallback. Official App Server docs fetched 2026-10-01 expose tool/requestUserInput, but availability remains runtime/mode-specific. Current app async tool existence is not CLI rendering evidence.
- Seven disposable fixtures prepared at /private/tmp/core677-workflow from source HEAD 5230396eebf83a798a3dc6d9c92ea13c3f1a0c14; test entry dirt/model/unknown, debug-fast completion, loop completion, unattended drift, unattended epic audit boundary. No fixture commit will be merged. CLI sandbox initialization failed before a model turn; escalated dirty fixture pending.


## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: extended thin-pointer wrappers and existing canonical lazy fragments; no new skill inventory, validator, runner or mode body. Minimal refactor: routed missing SOP dispatch instead of duplicating behavior. Codex bootstrap's override is local because its Claude source specifies concrete verbatim paths; general translation stays centralized.
- Corrected SOP flag/model/loop/promotion/resume dispatch, pre-write guards and parked-content preservation, prerequisite disposition, filing advisory, tail receipts, review range, PLAN token preservation, handoff persistence and fresh candidate checks. Full read-only parity recheck supports stamp v5.33.0 · 2026-10-01; size remains below 38,000 bytes. Templates and canonical phase contract unchanged.
- Doc sweep also updated the neutrality ledger for the new shared fragment routes and the platform install-policy/flag-route wording; these are in-scope downstream restatements. Added neutrality doc to touches.
- Codex new-project override selects Codex install/stage/verify commands and makes Claude-only settings/entrypoint conditional on actual Claude usage. Platform deep/structured rows use conditional fallback and cite official App Server capability, with no universal UI guarantee.
- docs/CODEX-VERIFICATION.md extends the installation receipt with all 12 routes, flags/aliases, unsupported-parser limits, fragment/applicability matrix, currency adjudication, repair rationale and isolated fixture reproduction. Retains .2 installation facts; no bootstrap live claim or comparison/compatibility refresh.
- Added no permanent runtime/test tools. Temporary fixture setup/run/static assertion scripts live in /private/tmp; source-copy fixtures remain distinct from .2's real pinned submodule. Tests use existing calculator cases. Sandbox CLI initialization failed before turns; escalated retries retain child workspace-write and automatic approval review rather than bypass.


## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `python3 /private/tmp/core677-workflow/verify.py` → 0 for initial seven cases, then 0 for final eight runs (seven cases plus corrected unattended prompt). Checks entry baseline preservation, actual parks, completed Acceptance/YAML/date/nav, passing source tests, actual atomic commit contents, loop keys and real iteration commit object, epic nested parent deferral. Detailed receipts and exact commands in docs/CODEX-VERIFICATION.md and temporary manifests/JSONL. Debug closure 9ca05977db42; loop amended-cycle closure 1db13450768c (original 7fe84e004d25 remains a real historical object); audit b15612fd9167. No fixture commit merged.
- CLI 0.159.2 gpt-6.1-sol/high explicitly pinned. All live invocations → 0; valid stops also exit 0, so artifact assertions decide behavior. Original dirty/model/unknown sandbox initialization → 1 before model turns; approved retry succeeded under child workspace-write. No approval bypass or fake gate answer.
- First artifact verifier → 1: too-literal root cause matcher rejected valid root-cause/hypothesis evidence. Corrected checker inspects ranked hypotheses/minimal repro/exact pass. Intermediate check → 1: epic was still pending; complete run → 0. These harness assumptions are recorded rather than assigned to workflow defects. Drift first prompt conflicted with unattended no-question behavior; separate corrected retry → 0 and proved park without live question, original transcript retained.
- Inline Python route/roster check → 0: twelve names/relative routes, canonical targets and eight SSOT-derived adopter names. Read-only probes verified applicable/unsupported flags and all lazy targets. Final SOP full static parity review → no remaining substantive blocker; v5.33.0 · 2026-10-01 stamp supported, 37,538 / 38,000 bytes.
- CI-extracted checks: `bash -e /private/tmp/core677-install/check-shipped-skill.sh`, `check-context.sh`, `check-final.sh`, `check-pair-Q.sh`, `check-pair-B.sh` → 0 each; `git diff --check` → 0. `python3 -m py_compile` on temporary setup/edit/run/verifier scripts → 0. No production executable changed; visualizer/fleet tests and lint/typecheck N/A for Markdown routing/doc changes.
- Structural receipt: thin wrappers/shared-fragment dependency preserved, no duplicated mode body/public runtime/test service. Source code structure N/A because deliverables are Markdown instructions/evidence. Visual confirmation N/A — no rendered surface.
- Independent read-only workflow_review returned no blockers/notes for final source and seven-case evidence; follow-up against corrected retry also returned no blockers/notes. Original review notes (missing child traces and snapshot mismatch) were resolved by explicit evidence qualifiers. Child fixture review is recorded by authors but raw JSON lacks identifiable child spawn/results (debug none, loop/audit empty wait IDs); doc qualifies independence as uncorroborated. .4 owns captured comparison/reviewer receipts; this task's independent review cannot retroactively prove those child reviews.


## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:** Repaired Codex SOP dispatch and bootstrap translation, reviewed all twelve exported routes and flags, and recorded eight bounded runtime runs with explicit static-only and reviewer-trace limits. The full SOP source/restates recheck supports v5.33.0 · 2026-10-01; current source remains below budget. No mode body, runtime, permanent validator, compatibility stamp, or Grok calibration change.

- Deliverables: SPEC/procedures/ft-task.md (+66/-20), codex/skills/ft-new-project/SKILL.md (+9), docs/AGENT-NEUTRALITY.md (+1/-1), docs/CODEX-VERIFICATION.md (+211/-1), docs/PLATFORMS.md (+8/-8); 295 additions/30 deletions across five Markdown surfaces. PLAN and this tasknote are lifecycle records.
- Verification: all eight intended runtime artifact outcomes pass; source tests and real atomic closure contents checked, seven initial cases plus one conflicting-prompt correction. Routes/roster, context budget, Pair B/Q, final newline, whitespace and temporary helper compilation pass. Two independent review passes report no blockers/notes; final static parity probe agrees. Full viz/fleet validation N/A — product code unchanged.
- Refactor: routed shared fragments and kept one bootstrap override rather than duplicating workflow bodies. No unrelated cleanup. Maintainability: Codex now receives complete mode/entry dispatch and one consistent platform installation/ask translation; evidence separates runtime stops/closures from untested branches and unsupported claims.
- Scope reconciliation: declared five deliverable paths, changed exactly those five. Undeclared: none; own tasknote and PLAN row excluded. Neutrality doc was added when the required sweep exposed its route restatement.
- Deferred work: existing CORE-677.4 owns comparison and stronger captured reviewer traces; CORE-677.N owns evidence/claim audit. No new real-world operator handoff requiring a filing; parked disposable fixtures are test artifacts. No archived factual claim falsified.

### Doc-drift sweep

| Document | Verdict |
|---|---|
| `README.md` | no change — overview and installation pointers accurate |
| `AGENTS.md` | no change — lifecycle, model and wiring pointers remain accurate |
| `SPEC.md` | no change — repaired SOP realizes existing contracts |
| `docs/MIGRATION.md` | no change — Codex installation and conditional fences agree |
| `claude/AGENTS-snippet.md` | no change — canonical workflow block and adopter roster preserved |
| `codex/AGENTS-snippet.md` | no change — conditional ask fallback and literal roster remain canonical |
| `cursor/AGENTS-snippet.md` | no change — no Cursor wiring change |
| `grok/AGENTS-snippet.md` | no change — no Grok wiring/calibration change |
| `docs/CONVENTIONS.md` | no change — CI and currency boundaries preserved |
| `CONTRIBUTING.md` | no change — contribution/maintenance policy unaffected |
| `SECURITY.md` | no change — approval, sandbox and pinning obligations preserved |
| `docs/AGENT-NEUTRALITY.md` | updated — SOP ledger covers shared executable fragment routes/translations |
| `docs/PLATFORMS.md` | updated — conditional question/deep fallback, direct flag-fragment route and platform collision rationale |
| `claude/CAPABILITIES.md` | no change — no Claude capability or stamp claim |
| `docs/AGENT-COMPAT.md` | no change — no qualifying report-only dogfood, stamps preserved |
| `docs/EXTERNAL-AGENTS.md` | no change — stable paths, parks, handoff/review ownership preserved |
| `docs/WORKTREES.md` | no change — no isolation protocol change |
| `docs/VISION.md` | no change — no workflow runtime/schema/validator introduced |

**Learnings:** N/A — durable platform-specific observations belong in verification/policy docs; no new always-loaded workflow rule.

**Closure review:** Only CORE-677.3 becomes a checked stub, still nested under its active parent; all other PLAN rows preserved. All Acceptance satisfied. Stage five deliverables plus PLAN and this archive in one atomic commit. Proposed message: `fix: CORE-677.3 repair Codex workflow parity`. No push.


**Archived:** 2026-10-01
