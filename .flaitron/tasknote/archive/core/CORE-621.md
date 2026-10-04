---
title: editorconfig-final-newline
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: []
touches:
  - docs/GLOSSARY.md
  - templates/sidequest-template.md
  - .github/workflows/ci.yml
---

# CORE-621 | editorconfig-final-newline

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Add the missing final newline to `docs/GLOSSARY.md` and
`templates/sidequest-template.md`, and add a CI `drift` step that ratchets
the `.editorconfig` `insert_final_newline` rule across tracked text files so
the class stays closed.

## ✅ Acceptance

- [x] `docs/GLOSSARY.md` ends with a final newline — `tail -c1 docs/GLOSSARY.md | wc -l` → `1`
- [x] `templates/sidequest-template.md` ends with a final newline — `tail -c1 templates/sidequest-template.md | wc -l` → `1`
- [x] New CI `drift` step fails on a reintroduced violation and passes on the current tree — `judgment`, verified by a local before/after probe (CI runners aren't invokable from this session)

## 🧩 Subtasks

- [x] Append a trailing newline to `docs/GLOSSARY.md`
- [x] Append a trailing newline to `templates/sidequest-template.md`
- [x] Add a `drift` job CI step enumerating tracked text files (`git grep -Il '' -- .`, which naturally excludes binaries and the repo's one symlink) and failing on any missing a final newline, excluding `.flowtron/tasknote/archive/` (write-once history predating the check, per Pair P/Q precedent)
- [x] Locally verify the new check passes on the fixed tree and fails on a reintroduced violation

## 🔗 Related

- (none — no PLAN.md citation to a predecessor/parent; surfaced standalone by audit-repo 2026-09-20)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both named files are confirmed missing a trailing newline (verified byte-for-byte); `.editorconfig` already declares `insert_final_newline = true` for `[*]`; no CI step currently enforces it. Task as filed is accurate and actionable as-is.

- [x] Read relevant source files — `.editorconfig`, `docs/GLOSSARY.md` tail, `templates/sidequest-template.md` tail, `.github/workflows/ci.yml` (full `drift` job), `.gitattributes` (absent)

- [x] **Best Practices Review** — the `drift` job already has an established shape (`bad=` accumulator, `git ls-files`/`git grep` enumeration, `[ -z "$bad" ] || exit 1`) used by 11 existing steps; extended that shape rather than introducing a new pattern. Chose `git grep -Il '' -- .` over an extension allowlist: it uses git's own binary detection so it stays correct as new binary types are added, and it happens to also exclude the repo's one symlink (`CLAUDE.md` → `AGENTS.md`), which a `tail -c1` check on the link's literal target text would false-positive on.

- [x] **Archive skim** — greps for the two named files, `.editorconfig`, and `ci.yml` against `.flowtron/tasknote/archive/core/` each returned dozens of hits (these paths are named constantly in the doc-drift-sweep and validation-command sections of most tasknotes). Per the >3-hits guidance this was noise, not signal, so I narrowed via YAML `touches:` instead — still dozens of hits for the same structural reason (`docs/GLOSSARY.md` and `ci.yml` are named in most tasknotes' `touches:` lists because Phase 4's doc-drift sweep and Phase 3 validation touch them by convention, not because those tasknotes edited them). No note specifically about a final-newline ratchet turned up. The one directly relevant precedent — the `drift` job's own most recent addition, CORE-622.3 (Pair Q, section-citation-resolver) — was read in place from the live `ci.yml`, which already carries its comments and the archive-exclusion precedent (Pair P, Pair Q) this task follows.

- [x] **Drift check** — a full repo sweep (`git ls-files` minus binary extensions, `tail -c1` check) found the two named files plus five pre-existing violations inside `.flowtron/tasknote/archive/core/` (CORE-342.2/.3/.4, CORE-343, CORE-EPIC-342 — all predate this convention). Per this repo's Editing Rules ("treat archived tasknotes as historical records; do not rewrite them unless a specific workflow step requires it"), those five are out of scope for the fix and the new CI step excludes the archive directory rather than requiring their rewrite — matching the existing Pair P/Q exclusions in the same job for the same reason (write-once history).

- [x] No clarifications needed (--fast, implied by the `[unattended]` row marker) — assumptions: (1) the archive exclusion above is the correct scope boundary, consistent with two existing precedents in the same CI job; (2) a single new step in the existing `drift` job satisfies "a CI drift step," matching the task's singular phrasing and the job's existing multi-step shape.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit.

**Discovery Notes:** See Best Practices Review and Archive skim above for the design rationale (git-grep binary detection over extension allowlist; archive exclusion precedent).

**Downstream-impact reconciliation (surfaced during Phase 2, not Phase 1 — the drift-job architecture only became visible while writing the CI step).** Every existing step in the `drift` job is a hand-maintained mirror of a standing check whose original lives in `/ft-release` §7.1 (`claude/skills/ft-release/step-7.1-standing-checks.md` or `step-7.1-mirror-pairs.md`), bound by **Pair L** so the two copies can't silently diverge (`docs/CONVENTIONS.md` §"GitHub Actions CI"; `step-7.1-mirror-pairs.md` §"Pair L"). The new "Final newline" step has no §7.1 original — an approach decision reaching beyond this task (it's the first step in the job that breaks the "everything here is a lifted mirror" pattern). `step-7.1-mirror-pairs.md` §"Coverage is the twelve lifted checks, and only those" names exactly this fork: a new step either gets a new Pair L mapping row, or "ships unbound." Ran the confirm per SPEC/tasknote-selection.md §"Downstream-impact reconciliation" (fires regardless of `--fast`) — user chose **ship unbound**, reasoning that a full §7.1 mirror (a new standing-check block + Pair L mapping row, matching the Context-budget/Wrapper-name-invariant treatment) is more design work than this `[light]` task was filed for. `docs/CONVENTIONS.md` §"GitHub Actions CI" updated to record the exception and its citation so a later reader doesn't mistake it for an oversight.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the `drift` job's existing per-step shape (`bad=` accumulator + `while`/`case` loop + terminal `[ -z "$bad" ] || exit 1`), same as the 11 steps already in that job. No new job needed; this is a repo-wide convention check, not a two-file "Pair," so it was named plainly rather than added to the `Pair` lettering.

- [x] **Minimal refactor gate** — no refactor; only an append (two files) and one new CI step. Nothing pre-existing was touched beyond that.

- [x] Implemented the minimal solution — appended `\n` to both files; added the "Final newline" step to `.github/workflows/ci.yml` between "Context budget" and "Pair A".

- [x] Updated/added tests for non-trivial behavior — N/A, no test suite covers CI workflow YAML; verified the new step's logic locally instead (see Testing Notes).

**Implementation Notes:** `docs/GLOSSARY.md` and `templates/sidequest-template.md` diffs are each a single-line no-newline→newline change (confirmed via `git diff`, no other content moved). CI step added verbatim as:

```yaml
      - name: Final newline (.editorconfig insert_final_newline)
        run: |
          # `.flowtron/tasknote/archive/` is excluded like Pair P/Q above: it's
          # write-once history predating this check, not a live surface to ratchet.
          bad=
          while IFS= read -r f; do
            case "$f" in .flowtron/tasknote/archive/*) continue ;; esac
            [ -s "$f" ] || continue
            [ -z "$(tail -c1 "$f")" ] || { echo "NO FINAL NEWLINE  $f"; bad=1; }
          done < <(git grep -Il '' -- .)
          [ -z "$bad" ] || exit 1
```

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no test runner covers `.github/workflows/*.yml` or the two markdown files; verified by direct inspection and a local re-implementation of the new CI step instead (below).

- [x] Ran lint/type-check on changed code — N/A, no linter targets these files (`npm --prefix viz run lint` covers `viz/` only, untouched here).

- [x] **Verification receipt**
  - `tail -c1 docs/GLOSSARY.md | wc -l` → `1` (was `0` before the fix)
  - `tail -c1 templates/sidequest-template.md | wc -l` → `1` (was `0` before the fix)
  - New CI step logic, run locally against the fixed tree → passed (`PASS (no missing final newlines outside archive)`)
  - New CI step logic, run locally with a synthetic no-newline probe file staged → correctly printed `NO FINAL NEWLINE  docs/_ci_newline_probe.md` and failed; probe file removed and unstaged afterward, confirmed by `git status --porcelain`
  - No avoidable duplication, dead code, unnecessary public-surface growth, or stale documentation introduced; no code-facing docs describe the `drift` job's step list, so none needed updating beyond the CI file itself.

- [x] (frontend) Asked the user for visual confirmation — N/A, no rendered UI surface; this is a CI/YAML + docs change.

**Testing Notes:** GitHub Actions itself cannot be invoked from this session, so the new step's shell logic was validated by extracting and running it locally against both the passing (fixed) tree and a synthetic failing case, per the receipt above.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — grepped all `.flowtron/tasknote/README.md` §"AI-referenced docs" surfaces for the drift job's step-name enumeration and for `insert_final_newline`/"final newline" mentions. Only `docs/CONVENTIONS.md` §"GitHub Actions CI" enumerates the `drift` job's steps by name — updated to add the new step and its unbound status (see Downstream-impact reconciliation above). `AGENTS.md`'s existing `.editorconfig` bullet ("... final newline") already accurately described the convention being enforced and needed no change. All other AI-referenced docs: no change.

- [x] Closed — every Acceptance criterion ticked above; `status:` flipped to `completed` below; PLAN.md line to be flipped to stub form and moved to `## Completed` in the same commit as this archive move.

- [x] **Evidence-based recap** drafted below.

**Final Summary:** Fixed two files (`docs/GLOSSARY.md`, `templates/sidequest-template.md`) missing the `.editorconfig`-required final newline, and added a new `drift`-job CI step (`.github/workflows/ci.yml`) that ratchets `insert_final_newline` across all `git grep -Il`-detected tracked text files (excluding the write-once tasknote archive), verified locally against both a passing and a synthetic failing case. Discovered mid-task that the `drift` job's established convention is "every step mirrors a `/ft-release` §7.1 standing check, bound by Pair L" — the new step breaks that pattern with the operator's explicit sign-off to ship unbound rather than expand scope into a full §7.1 mirror; recorded in `docs/CONVENTIONS.md`. `touches:` reconciliation: declared `docs/GLOSSARY.md`, `templates/sidequest-template.md`, `.github/workflows/ci.yml`; `git diff --name-only` also shows `docs/CONVENTIONS.md` (the doc-drift-sweep fix triggered by this task's own CI change) — named here as the undeclared path. No refactors made; no code-facing documentation left stale. Five pre-existing final-newline violations inside `.flowtron/tasknote/archive/core/` were found and deliberately left unfixed (historical record, per this repo's Editing Rules) — the new CI check excludes the archive directory for that reason.

**Archived:** 2026-09-20
