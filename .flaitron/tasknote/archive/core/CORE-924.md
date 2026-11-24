---
title: mirror-parity-checks
status: completed
tags: [drift-checks, ci]
created: 2026-11-24
due:
related-tasks: []
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
---

# CORE-924 | mirror-parity-checks

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-830]]

## 🎯 Goal

Add two CI drift checks — `snippet_roster_parity` (the `ln -s` slug sets of the four `*/AGENTS-snippet.md` agree) and `coverage_pin` (the `justfile` `coverage` recipe's diff-cover pin and floor match `ci.yml`'s) — each with a seeded case in the drift-checks self-test.

## ✅ Acceptance

- [x] `snippet_roster_parity()` exists in `tools/drift-checks.sh`, floored `VACUOUS`, and passes on the live tree — `bash tools/drift-checks.sh snippet_roster_parity`
- [x] `coverage_pin()` exists, floored `VACUOUS`, and passes on the live tree — `bash tools/drift-checks.sh coverage_pin`
- [x] Each has a seeded case that fails with its own finding line, and the one-case-per-check and floor tests pass — `node --test tools/drift-checks.test.mjs`
- [x] Every other drift check still passes — `bash tools/drift-checks.sh`
- [x] Adds no shellcheck finding — `shellcheck -f gcc` finding set of `tools/drift-checks.sh` equals HEAD's (the file carries pre-existing info/warning findings, and CI does not shellcheck it)

## 🧩 Subtasks

- [x] Add `snippet_roster_parity()` after `pair_t` in `tools/drift-checks.sh`: per file, column-0 `ln -s` lines → destination basename → sorted set; diff each platform set against `claude/AGENTS-snippet.md`'s; per-file `VACUOUS` floor
- [x] Add `coverage_pin()`: read `DC="diff-cover@X"; MIN=Y` from `justfile`, `DIFF_COVER_VERSION: 'X'` and `COVERAGE_MIN: 'Y'` from `.github/workflows/ci.yml`; `VACUOUS` when any read is empty; `PIN DRIFT` per mismatch
- [x] Add one seeded case per check to `CASES` in `tools/drift-checks.test.mjs`
- [x] Run the full validation set

## 🔗 Related

- [[CORE-830]] — predecessor; `pair_t` (justfile ↔ AGENTS.md), the shape these extend
- [[CORE-918.3]] — predecessor; most recent added check (`plan_placeholder`) and its seeded case
- [[CORE-928]] — sibling; `docs/CONVENTIONS.md` check roster count

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Neither check exists. The roster parity is today only a manual `/ft-release` §7.1 standing check (`claude/skills/ft-release/step-7.1-standing-checks.md` §"Standing installed-surface policy check"), and the coverage pin is held only by "bump both together" comments in `justfile` and `ci.yml`. Both surfaces currently agree, so the checks land green.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Read set:** `tools/drift-checks.sh` (header shape rules; `pair_s`, `pair_t`, dispatcher), `tools/drift-checks.test.mjs` (`CASES`, coverage + floor tests), the four `*/AGENTS-snippet.md` wiring blocks, `justfile` `coverage` recipe, `.github/workflows/ci.yml` `coverage` job, `step-7.1-standing-checks.md`.
- **Best practices:** follow the header's shape rules — one column-0 function per check with a `#` title line, `bad=` accumulator, `n` counter with a `VACUOUS <name>` floor on one line (the floor test's regex), `n=$((n+1))`, bash 3.2, no pipefail. Plain grep/sed, as `pair_t` does (the CI `drift` runner is checkout-only).
- **Roster read:** each snippet's wiring block is the only set of column-0 `ln -s ` lines; the other `ln -s` mentions are inline prose (`claude` line 35) or a `(cd … && ln -s …)` dev line (`codex` line 102), which `^ln -s ` excludes. Slug = destination basename (the `claude` block pads with spaces; `awk '{print $NF}'` handles it). Codex sources point at `codex/skills/`, the rest at `claude/skills/`, so compare destination slugs only.
- **Archive skim:** area `core` confirmed against the README table (`CORE-*` → `archive/core/`). 210 notes cite `tools/drift-checks.sh`; read the two load-bearing ones: CORE-918.3 (latest added check — named in the header's "neither a source rule nor a catalogue entry" list; its sweep filed CORE-928 for `docs/CONVENTIONS.md`) and CORE-830 (`pair_t`). CORE-875 is the only note naming `DIFF_COVER_VERSION` (SECURITY.md prose; no check).
- **Source rules:** both new checks have one — the roster in `claude/AGENTS-snippet.md` §"One-time symlink wiring" and §7.1's standing check; the pin in the `justfile`/`ci.yml` "bump both together" comments — so neither joins the header's "neither" list. `docs/CONVENTIONS.md`'s list is CORE-928's; untouched here.
- **Drift check:** PLAN line, paths and values match the tree (`diff-cover@10.5.1`/`MIN=80` vs `'10.5.1'`/`'80'`; eight slugs in all four blocks). No drift.
- **Clarifications:** No clarifications needed (--unattended). Assumptions: checks append after `pair_t`; finding lines `ROSTER DRIFT  <file>` + `diff -u`, and `PIN DRIFT  <what>  justfile <a> vs ci.yml <b>`; seeds drop one grok wiring line and bump `ci.yml`'s two pins.
- Size estimate: ~90 lines (rename-aware)

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: extended the script's one-function-per-check shape (`pair_s`'s indented helper so the column-0 dispatcher skips it; `pair_t`'s plain-awk justfile read). No new shape.
- Minimal refactor gate: no existing code touched beyond a four-line addition to the header's provenance paragraph naming both checks and their source rules.
- `snippet_roster_parity()`: in each snippet, a column-0 wiring line (`ln -s` into the submodule) must read `<platform source>/skills/<slug> <platform dest>/<slug>` — claude → `.claude/skills`, codex (sourced from `codex/skills`) → `.agents/skills`, cursor → `.cursor/skills`, grok → `.grok/skills`. A malformed line prints `BAD WIRING  <file> :: <line>`; a set mismatch against the claude SSOT prints `ROSTER DRIFT  <file>` + `diff -u`; a missing file `MISSING FILE  <file>`; per-file `VACUOUS` floor.
- `coverage_pin()`: reads `DC="diff-cover@X"; MIN=Y` from the `coverage` recipe body only, and `DIFF_COVER_VERSION` / `COVERAGE_MIN` from the ci.yml `coverage` job block only; `PIN DRIFT  <what>  justfile <a> vs ci.yml <b>` per mismatch; `VACUOUS` when any value is unread.
- Seeds: grok's `ft-refactor` line rewired into `.cursor/skills/` (BAD WIRING + ROSTER DRIFT `-ft-refactor`); ci.yml pin/floor regex-replaced to `0.0.0-zz` / `999`, so a future real bump does not break the seed.
- Ad-hoc probes beyond the seeds (temp copy, not committed): a missing grok snippet → `MISSING FILE`; a `MIN=90` in another justfile recipe → ignored, `coverage_pin ok`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A, no rendered surface (a shell script and its test file); no ask emitted

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Scope guardrail (each Phase 3 entry, and after the doc-drift sweep): paths `tools/drift-checks.sh`, `tools/drift-checks.test.mjs`, this note — all in `touches:` or workflow paths; size 98 lines (77+1, 20+0) against the 400 cap. Clear.

Receipt — full validation set (`--unattended`). `just check` reaches `test typecheck lint build` as dependencies; the justfile defines no other `test` / `lint` / `typecheck` recipe:

- `just check` → 0 (viz test/typecheck/lint/build, update-adopters suite + syntax, drift self-test 48/48, `bash tools/drift-checks.sh` 27 checks ok)
- `bash tools/drift-checks.sh snippet_roster_parity coverage_pin` → 0
- `node --test tools/drift-checks.test.mjs` → 0 (inside `just check`; both seeded cases, the one-case-per-check test and the floor test pass)
- `bash tools/drift-checks.sh` → 0 (inside `just check`)
- shellcheck `-f gcc` finding set vs HEAD's → identical (no new findings)

Changed code: no duplication beyond the §7.1 note below, no dead code.

External review — `/code-review medium` over this task's uncommitted diff:

- **important** — the roster read keyed only on the destination basename, so a block copied across platforms passed and a non-wiring column-0 `ln -s` would false-fire. **Fixed**: per-file source-prefix + destination-dir anchoring, a `BAD WIRING` finding, and the seed now exercises it.
- note — `coverage_pin` reads were not scoped to the recipe / job. **Fixed** (block-scoped reads; probed).
- note — a missing snippet was reported as VACUOUS. **Fixed** (`MISSING FILE`).
- note — the header's provenance paragraph named neither check. **Fixed**. The source surfaces (justfile / ci.yml comments, `docs/CONVENTIONS.md`) are outside `touches:` → filed with the doc-drift row (Phase 4).
- note — §7.1's standing installed-surface check keeps its own four `diff` commands, now a second shell for the roster comparison. Outside `touches:` → filed with the same row.
- Two findings fell on files this task never touched — `.github/workflows/arch-health.yml` (report-failure gating on `cancelled()` after a job timeout) and `SPEC/procedures/ft-task.md` (Step 5 item 5's cohort-move clause). The review's range swept earlier commits; they grade no line of this diff. Recorded for the operator, not filed.
- Re-run after the fixes: `just check` → 0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

Doc-drift sweep (per README §"AI-referenced docs"; under `--unattended`, out-of-scope drift is filed, not edited): `README.md` no change · `AGENTS.md` no change (§"Validation" names the drift job's checks "among others") · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` drift — §"One-time symlink wiring" says only `/ft-release` §7.1 diffs the four blocks; it should also name CI's `snippet_roster_parity` · `codex/AGENTS-snippet.md` / `cursor/AGENTS-snippet.md` / `grok/AGENTS-snippet.md` no change (their "§7.1 diffs it against the SSOT" stays true) · `docs/CONVENTIONS.md` drift — §"GitHub Actions CI" says installed-surface policy stays in §7.1 "and is not duplicated here", and its check enumeration names neither `snippet_roster_parity` nor `coverage_pin` · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change · `docs/WORKTREES.md` no change · `docs/VISION.md` no change. Not on the list, from the External review: `claude/skills/ft-release/step-7.1-standing-checks.md`'s four roster `diff` commands should defer to `snippet_roster_parity`, and the justfile / ci.yml "bump both together" comments should name `coverage_pin`. All in one filing; filed CORE-929.

**Final Summary:**

CORE-924 adds two CI drift checks: the three platform snippets' skill wiring must match the Claude roster line for line, and the local coverage recipe's diff-cover pin and floor must match CI's.

- Changed: `tools/drift-checks.sh` (+77/−1: `snippet_roster_parity()`, `coverage_pin()`, four header lines), `tools/drift-checks.test.mjs` (+20: two seeded cases), `.flaitron/PLAN.md` (this row's flip, plus the filed drift row).
- Verification: `just check` → 0 (27 drift checks ok, self-test 48/48); no new shellcheck findings.
- Refactors: none. Doc verdict: two swept docs drift (claude snippet, CONVENTIONS), plus §7.1 and two comments — filed, not edited.
- `touches:` reconciliation: `git diff --name-only` = `tools/drift-checks.sh`, `tools/drift-checks.test.mjs` + workflow paths; matches the declaration.
- Maintainability: two "keep in sync" promises that only a release walk or nothing checked now fail at push.
- Learnings: N/A.

unattended-candidates: CORE-929

**Archived:** 2026-11-24
