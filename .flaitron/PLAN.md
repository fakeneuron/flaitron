# flaitron — PLAN.md

## Vision

A lightweight, versioned, project-agnostic tasknote system for solo
AI-assisted coding. One source of truth, consumed via git submodule by every
project under `~/code/`. Replaces the disjointed per-project workflow files
those projects had each grown on their own.

See [SPEC.md](../SPEC.md) for the canonical workflow contract.

## High

(none)

## Medium

(none)

## Low

- [ ] **CORE-864** [light] | release-note-heading-casing — The release that ships CORE-863 must say in its tag notes that `SPEC.md`'s line-1 heading is now lowercase. An `install.sh` from an earlier tag refuses that core (`update` dies "does not hold flaitron"; global ft-adopt is skipped), so users fetch the latest installer. Close with that release.
- [ ] **CORE-877** [moderate] | refactor-reconcile-gate — `/ft-refactor` Step 5 runs the reconciliation scan after the Step 4 review, its only gate, so "apply only confirmed edits" has no confirm (none under `--fast`). Move the scan into Step 3 so proposals ride Step 4; under `--fast` report them in the Step 6 hand-off and apply none. Surfaced by audit-docs 2026-11-07 (Finding #7, Medium).
- [ ] **CORE-878** [light] [unattended] | grok-codex-wiring-wording — `docs/PLATFORMS.md` (:38, :77, :555) and `docs/AGENT-COMPAT.md` (:37, :65-67) say Grok in a Codex-wired repo runs the canonical bodies; it runs the `codex/skills/` wrappers. Reword; fix AGENT-COMPAT :69-70's "detail is filed"; rewrite `docs/AGENT-NEUTRALITY.md`'s README-Quickstart row for the installer-first README; add a §"Principle" exemption for PLATFORMS, AGENT-COMPAT and CODEX-VERIFICATION. Surfaced by audit-docs 2026-11-07 (Findings #8, #19, #21, Medium).
- [ ] **CORE-879** [light] [unattended] | roster-args-deep-flag — Reword KEEP IN SYNC guard item 1 in `AGENTS.md` and `claude/AGENTS-snippet.md` to "names plus per-skill flags" (only the snippet carries arguments); add `--deep` to `/ft-open-epic` in both rosters; add `--medium|--future` to `/ft-file-task`'s `argument-hint` (and to its `description:` and the Codex wrapper's) and `-p` to its usage notice; add `-d` / `-f` to `/ft-task`'s usage line. Surfaced by audit-docs 2026-11-07 (Finding #9, Low).
- [ ] **CORE-880** [light] [unattended] | sparse-size-figures — Refresh the sparse-checkout figures in `docs/MIGRATION.md` §1.1 (~17 MB across ~1,300 files; ~20.6 → ~3.2 MB) and replace the copies in the four `*/AGENTS-snippet.md` files and `claude/skills/ft-adopt/SKILL.md` with "most of the checkout by bytes" plus a pointer to `docs/MIGRATION.md` §1.1. Surfaced by audit-docs 2026-11-07 (Finding #17, Low).
- [ ] **CORE-881** [moderate] [unattended] | budget-shipped-surfaces — `docs/CONTEXT-BUDGET.md` neither caps nor exempts four shipped always-loaded surfaces. Add a §"Budgets" row for `claude/AGENTS-snippet.md` (13,187 chars; pasted into every adopter `AGENTS.md`) sized like its siblings (the file plus ~1.5 working units, the unit measured over the last twenty commits touching it), confirming `context_budget` enforces it; add `templates/tasknote-README.md`, `templates/PLAN.md` and `templates/tasknote-template.md` to "Not budgeted, deliberately" with a reason. Surfaced by audit-docs 2026-11-07 (Finding #18, Medium).
- [ ] **CORE-888** [light] | overlay-installer-invariants — `.flaitron/audit-overlay/SKILL.md`: extend the Sacred invariants (Critical) with `install.sh` integrity checks on the `curl | sh` path and CI workflow `permissions:` and SHA pinning; add `sh tools/install.test.sh install.sh` as a `security:` gate (needs network). Surfaced by CORE-874 External review.
- [ ] **CORE-889** [light] | cursor-grok-wiring-wording — Reword the canonical-bodies claim for Cursor and the Grok snippet: `docs/PLATFORMS.md` Cursor Skill invocation row (:610) and `grok/AGENTS-snippet.md` (:20-30) say a Codex-wired repo serves the canonical `claude/skills/` bodies; `.agents/skills/` links the `codex/skills/` wrappers. Surfaced by CORE-878 external review.

## Future Opportunities

- [ ] **CORE-866** [moderate] | handoff-row-drift-check — From natabula NAT-535: make SPEC.md §"Deferred hand-off filing" mechanical. Port natabula `scripts/check-handoff-rows.sh` (a hand-off block in an archived note must cite a PLAN row or say none deferred) as a `tools/drift-checks.sh` check or `/ft-task` Phase 4 step. Also have `/ft-close-epic`'s `.N` audit file a row per open hand-off it lists. NAT-495.N listed four and filed none.

## Completed

- [x] **CORE-876** [moderate]🧩 | ft-task-sop-reverify — Completed 2026-11-07.
- [x] **CORE-874** [light]🔧 | audit-overlay-refresh — Completed 2026-11-07.
- [x] **CORE-875** [light]🔧 | security-ci-coverage-job — Completed 2026-11-07.
- [x] **CORE-882** [light]🔧 | close-epic-plain-mv — `/ft-close-epic` Step 7 archives the untracked audit note with plain `mv`, not `git mv`. Surfaced by audit-docs 2026-11-07 (Finding #1, High), fixed inline.
- [x] **CORE-883** [light]🔧 | release-stages-readme — `/ft-release` §7.4 `git add`, §3 Acceptance and the line-8 recipe now include `README.md` (line 8 also `SECURITY.md`). Surfaced by audit-docs 2026-11-07 (Finding #2, High), fixed inline.
- [x] **CORE-884** [light]🔧 | skill-step-pointers — five stale step/section pointers corrected (`ft-adopt` Step 0 precondition, `ft-task` preamble "above", `step-3a` clarifying-questions item, `step-7.1-standing-checks` awk bound, `ft-open-epic` resume-entry scope) and `step-5.5-deep-prepass`'s misquote of SPEC replaced with a `SPEC/gates.md` §"Operator-gate cues" citation. Surfaced by audit-docs 2026-11-07 (Findings #4, #5, Low), fixed inline.
- [x] **CORE-885** [light]🔧 | loop-max-closure-clause — `step-5-loop-mode.md` Step 6 no longer implies a `loop-max` soft stop auto-closes. Surfaced by audit-docs 2026-11-07 (Finding #6, Medium), fixed inline.
- [x] **CORE-886** [light]🔧 | doc-crossref-fixes — `SPEC/scope-boundaries.md` security mirror matches the VISION heading; `docs/DOC-DRIFT-SWEEP.md` "above" pointers cite the tasknote README; README §"Repo layout" lists doc-drift-sweep. Surfaced by audit-docs 2026-11-07 (Findings #10, #11, #12, Low), fixed inline.
- [x] **CORE-887** [light]🔧 | stale-doc-figures — `docs/CONTEXT-BUDGET.md` `ft-task/SKILL.md` figure and cold-start sum (23,824; 106,657) in both places plus the CORE-865 entry, largest-body name dropped; `docs/GLOSSARY.md` last-update stamp. Surfaced by audit-docs 2026-11-07 (Findings #15, #20, Medium), fixed inline.
- [x] **CORE-865** [light]🔧 | agents-md-repo-layout-trim — `AGENTS.md` §"Repo Layout" cut from a file-by-file map to a pointer plus eight must-know bullets (prose outside `## Workflow` 108 → 91, under natabula's 100 budget); `docs/CONTEXT-BUDGET.md` `AGENTS.md` row 10,324 → 8,628. Completed 2026-11-06.
- [x] **CORE-870** [light]🔧 | near-cap-release-note — `step-7.1-standing-checks.md` now says a non-failing `NEAR CAP` line before `context_budget ok` needs no action; no tasknote. Completed 2026-11-06.
- [x] **CORE-873** [light]🔧 | unchecked-stub-row-check — Completed 2026-11-06.
- [x] **CORE-871** [light]🔧 | flaky-only-b-assertion — Completed 2026-11-06.
- [x] **CORE-EPIC-868** [heavy]🧠 | gate-blind-spots — Completed 2026-11-06.
  - [x] **CORE-868.2** [moderate]🧩 [unattended] | installer-anchor-drift-check — Completed 2026-11-06.
  - [x] **CORE-868.3** [moderate]🧩 | release-installs-new-tag — Completed 2026-11-06.
  - [x] **CORE-868.4** [light]🔧 | dependabot-minimatch-alert — Completed 2026-11-06.
  - [x] **CORE-868.N** [heavy]🧠 | gate-blind-spots audit — Completed 2026-11-06.
- [x] **CORE-EPIC-869** [heavy]🧠 | carrying-cost — Completed 2026-11-06.
  - [x] **CORE-869.2** [moderate]🧩 [unattended] | drift-check-batching — Completed 2026-11-06.
  - [x] **CORE-869.3** [light]🔧 [unattended] | budget-near-cap-report — Completed 2026-11-06.
  - [x] **CORE-869.4** [light]🔧 [unattended] | stale-size-figures — Completed 2026-11-06.
  - [x] **CORE-869.5** [heavy]🧠 | near-cap-trims — Completed 2026-11-06.
  - [x] **CORE-869.N** [heavy]🧠 | carrying-cost audit — Completed 2026-11-06.
- [x] **CORE-872** [heavy]🧠 | size-cap-renames — Completed 2026-11-06.
- [x] **CORE-867** [moderate] | doc-sweep-touches-scope — Completed 2026-11-06.
- [x] **CORE-863** [moderate]🧩 | brand-casing-guard — Completed 2026-11-05.
- [x] **CORE-861** [heavy]🧠 | brand-casing-policy — Completed 2026-11-05.
- [x] **CORE-862** [light]🔧 | ci-job-timeouts — Completed 2026-11-05.
- [x] **CORE-860** [moderate] [unattended] | brand-nearmiss-guard — Completed 2026-11-04.
- [x] **CORE-641** [light]🔧 | typescript-7 — Completed 2026-11-01. De-scoped: upstream toolchain watching is a fleet concern; re-filed in natabula as NAT-517.
- [x] **FE-151** [moderate] | viz-quality-stack — Completed 2026-11-01.
- [x] **CORE-855** [moderate]🧩 | release v8.3.0 — Completed 2026-11-01.
- [x] **CORE-859** [light]🔧 | file-task-nested-placement — `/ft-file-task` Step 4 placement now appends past 2-space-nested child rows; no tasknote. Completed 2026-11-01.
- [x] **CORE-858** [light]🔧 | seed-question-only-ask — Completed 2026-11-01.
- [x] **CORE-EPIC-857** [heavy]🧠 | context-redundancy — Completed 2026-11-01.
  - [x] **CORE-857.1** [frontier]💎 | context-redundancy discovery — Completed 2026-11-01.
  - [x] **CORE-857.2** [heavy]🧠 | procedure-point-not-narrate — Completed 2026-11-01.
  - [x] **CORE-857.3** [moderate]🧩 [unattended] | readme-history-out — Completed 2026-11-01.
  - [x] **CORE-857.4** [heavy]🧠 | skill-b2-pointers — Completed 2026-11-01.
  - [x] **CORE-857.5** [heavy]🧠 | small-task-routing — Completed 2026-11-01.
  - [x] **CORE-857.6** [heavy]🧠 | spec-c-extraction — Completed 2026-11-01.
  - [x] **CORE-857.N** [heavy]🧠 | context-redundancy audit — Completed 2026-11-01.
- [x] **CORE-856** [heavy]🧠 | agent-baseline-redundancy-survey — Completed 2026-11-01.
- [x] **CORE-851** [heavy] | one-line-installer — Completed 2026-11-01.
