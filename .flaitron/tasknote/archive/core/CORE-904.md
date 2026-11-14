---
title: supply-chain-drift-check
status: completed
tags: [security, ci, drift-checks]
created: 2026-11-14
due:
related-tasks: [CORE-888, CORE-868.2, CORE-906]
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - docs/CONVENTIONS.md
  - SECURITY.md
---

# CORE-904 | supply-chain-drift-check

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-888]] · [[CORE-868.2]]

## 🎯 Goal

Make CI enforce the audit overlay's sacred invariant (5) structurally: a `tools/drift-checks.sh` check fails when `install.sh` grows a top-level statement other than an assignment or the final `main "$@"`, or when a `.github/workflows/*.yml` drops its workflow-level `permissions:` or references an action by anything but a 40-hex commit SHA.

## ✅ Acceptance

- [x] A `supply_chain` check exists in `tools/drift-checks.sh` and passes on HEAD — `bash tools/drift-checks.sh supply_chain`
- [x] A seeded-drift case in `tools/drift-checks.test.mjs` hits all three finding kinds (stray top-level statement, missing `permissions:`, mutable `uses:` tag) — `node --test tools/drift-checks.test.mjs`
- [x] Full drift suite still green (header shape, VACUOUS floor, per-check case coverage) — `bash tools/drift-checks.sh`
- [x] `docs/CONVENTIONS.md`'s no-source-rule roster and `SECURITY.md`'s two mitigations name the new check — `grep -q 'supply_chain' docs/CONVENTIONS.md && grep -c 'supply_chain' SECURITY.md`

## 🧩 Subtasks

- [x] Add `supply_chain()` (titled `#` line, `bad=`/`n=` accumulators, VACUOUS floor, bash 3.2) after `installer_anchors` in `tools/drift-checks.sh`; add it to the header's no-catalogue-entry list
- [x] Add a `supply_chain` entry to `CASES` in `tools/drift-checks.test.mjs` seeding all three drifts
- [x] Update `docs/CONVENTIONS.md` ("Five checks" → six, with the new entry) and `SECURITY.md` (installer truncation + workflow mitigations name the check)
- [x] Run the full validation set

## 🔗 Related

- [[CORE-888]] — added invariant (5) to the audit overlay (predecessor)
- [[CORE-868.2]] — `installer_anchors`, the sibling installer drift check whose shape this follows
- [[CORE-906]] — sanctioned `arch-health.yml` `report-failure` `issues: write` exception

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** No check reads `install.sh`'s top level or the workflows' `permissions:` / `uses:` today (`installer_anchors` only evals named functions; CI `drift` runs only `tools/drift-checks.sh`). HEAD satisfies all three properties, so the check lands green.

- [x] Read relevant source files — `tools/drift-checks.sh` (header shape rules, `installer_anchors`, dispatcher), `tools/drift-checks.test.mjs` (`CASES`, coverage + VACUOUS-floor tests), `install.sh` (top level: 3 assignments, one-line and multi-line function defs, final `main "$@"`), the three workflows, `SECURITY.md` §"One-line installer" / §"GitHub Actions CI", `docs/CONVENTIONS.md` §"GitHub Actions CI".

- [x] **Best Practices Review** — one check per function per the header's shape rules; no new abstraction. The check reads text, not runs code, so it stays offline and side-effect free.

- [x] **Archive skim** — area `core` confirmed against the README table. Load-bearing hits: CORE-888 (added invariant (5) to the overlay; no enforcement), CORE-740 (coverage test asserts each check has a `VACUOUS <name> … exit 1` line unless EXEMPT), CORE-868.2 (`installer_anchors`; listed in the header + CONVENTIONS no-catalogue roster — the new check joins that roster).

- [x] **Drift check** — PLAN line matches: `install.sh` top level is assignments + `main "$@"` (lines 23–25, 433); all 3 workflows have column-0 `permissions:` and only 40-hex `uses:` pins. `docs/CONVENTIONS.md` line 58 counts "Five checks" with no source rule — must become six.

- [x] No clarifications needed (--unattended). Assumptions: (a) "only assignments" also refuses a command substitution in a top-level assignment, since that is a statement executing outside a function (the invariant's wording); (b) `permissions:` means the workflow-level key at column 0 — per-job grants (the sanctioned `report-failure`) are out of this row's scope, which names presence, not grant breadth; (c) every `uses:` line must end its ref in a 40-hex SHA — no local-action exemption, as none exist (no speculative cases).

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

Size estimate: ~70 lines (rename-aware).

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape: one top-level check function in `tools/drift-checks.sh` following the header's shape rules (titled `#` line, `bad=`/`n=`, `VACUOUS supply_chain … exit 1`), plus one `CASES` entry, mirroring `installer_anchors`.

- [x] **Minimal refactor gate** — no refactor; only the header's no-catalogue roster line edited for the new name.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- First cut parsed `install.sh`'s top level with awk (function-open/close tracking + an assignment regex). Two External review rounds found bypasses a line-based parser cannot close (`X=1 cmd`, `f() { :; }; cmd #}`, an indented `  :; } ; cmd; g() {` closer, `}>/dev/null; cmd`).
- Final design asks bash itself: `install.sh` is sourced under `shopt -s extdebug; set -T` with a DEBUG trap that prints `$LINENO $BASH_COMMAND` to fd 3 and returns false, so **every** top-level command is listed and skipped — nothing in the file runs, and function definitions are not commands. Each listed command must be a plain assignment (one bare word or one single-quoted value) and the last must be the single `main "$@"`; a separate last-line read catches a function defined after `main`. Verified on bash 3.2.57 (macOS default) — CI runs bash 5 on ubuntu.
- Workflows: `.yml` + `.yaml`; column-0 `permissions:` must exist; any `permissions:` line (workflow or job level) with a value other than `{}` fails as `BROAD PERMISSIONS`; the first `uses:` value per line (quotes stripped, flow-style included, comments ignored) must be `<ref>@<40 hex>`.
- Findings: `INSTALL TOPLEVEL`, `INSTALL MAIN NOT LAST`, `INSTALL LAST LINE`, `NO PERMISSIONS`, `BROAD PERMISSIONS`, `UNPINNED ACTION`. The seed exercises all six, including the env-prefix, one-liner-hidden and reopen-closer bypasses.
- Mutation probes (temp copies): `X=$(id)`, `set -eu`, deleting `main`, `usage()\n{`, an `@main` pin, `} }` (parse error → MAIN NOT LAST), `}>/dev/null; cmd`, a quoted pinned ref (passes), harmless `say 'done }'` (passes).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no rendered surface (shell check + markdown).

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Scope guardrails (each Phase 3 entry + post-sweep): paths = `SECURITY.md`, `docs/CONVENTIONS.md`, `tools/drift-checks.sh`, `tools/drift-checks.test.mjs`, this note — all in `touches:` or workflow paths; size 95 lines (+90/−5 on the final diff) against the 400 cap.

Receipt (full validation set — `just check` covers `test typecheck lint build` plus the fleet-updater suite and drift checks):

- `just check` → 0 (update-adopters 122/122; drift-checks self-test 44/44; drift checks all ok)
- `bash tools/drift-checks.sh supply_chain` → 0
- `node --test tools/drift-checks.test.mjs` → 0
- `bash tools/drift-checks.sh` → 0
- `grep -q 'supply_chain' docs/CONVENTIONS.md && grep -c 'supply_chain' SECURITY.md` → 0 (2)
- `shellcheck -s sh install.sh tools/install.test.sh` → 0 (install.sh untouched)
- `shellcheck tools/drift-checks.sh` → 1 on pre-existing SC2016/SC2013/SC2088 lines only; none in the new block (not part of the validation set).

External review — `/code-review medium` over this task's working-tree diff, four rounds:

- Round 1 (awk parser): env-prefixed / chained assignments, one-liner hiding a statement, non-bare closer, function after `main`, `.yaml` skipped, `write-all` passes, SECURITY overclaim, thin seed, doubled "and" in CONVENTIONS → all fixed.
- Round 2: indented-closer bypass, unanchored pin filter (pinned-looking comment), `write-all`, roster taxonomy, heredoc false failure, `&` in sed path, seed anchors not asserted → fixed (bash DEBUG-trap redesign in round 3 supersedes the brace heuristics; awk for paths; split seeds). Taxonomy: wording clarified, see below.
- Round 3: same-line reopen / `} }` / `}>` bypasses, job-level `write-all` → fixed by the bash-enumeration redesign and the any-level `permissions:` value rule.
- Round 4 (final): quoted pinned ref false failure → fixed; seed regex coupled to `# v5.1.0` → loosened; duplicate MAIN NOT LAST label → `INSTALL LAST LINE`; SECURITY "Same reason" antecedent → sentence moved; taxonomy → CONVENTIONS entry now says the overlay states (5) as a severity guide and names no check (a back-pointer in `.flaitron/audit-overlay/SKILL.md` would leave `touches:`). Filed, not fixed: YAML-dialect edges a line reader misses (`uses :` / quoted `"uses":` keys, a `permissions:` scalar on the next line) and the fail-closed false positives (`uses:` text inside `run:`, a multi-line top-level assignment) — filed CORE-907.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/CONVENTIONS.md`: updated in scope (roster "Five" → "Six" + `supply_chain` entry). `SECURITY.md`: updated in scope (installer truncation + workflow mitigations name the check). All other AI-referenced docs: no change (none cite the drift-check roster or invariant (5)'s enforcement).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A` for the always-loaded layer. Local note: to enumerate a POSIX script's top-level commands without running them, source it under bash `extdebug` + a DEBUG trap that returns false; a line parser cannot match the shell's own grammar.

**Final Summary:**

CI's `drift` job now enforces the audit overlay's sacred invariant (5): `supply_chain` in `tools/drift-checks.sh` has bash list (and skip) every top-level command in `install.sh` and requires plain assignments then a single final `main "$@"`, and requires each workflow to keep a column-0 `permissions:` block, use no shorthand `permissions:` value, and pin every action to a 40-hex SHA. Changed: `tools/drift-checks.sh` (+57/−2), `tools/drift-checks.test.mjs` (+26), `SECURITY.md` (+6/−2), `docs/CONVENTIONS.md` (+1/−1). `touches:` declared 4 files, changed 4 (plus this note and PLAN.md). No refactors. Maintainability: the check reads install.sh through bash rather than a hand parser, so it needs no upkeep as install.sh's brace or quoting style changes. Live CI on ubuntu/bash 5 not yet observed (needs a push).

Filed CORE-907 (Low, [moderate], supply-chain-yaml-edges) via `/ft-file-task --unattended` for the review notes not fixed; reconciliation scan found no downstream impact.

unattended-candidates: none

**Archived:** 2026-11-14
