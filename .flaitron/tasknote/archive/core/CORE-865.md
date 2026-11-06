---
title: agents-md-repo-layout-trim
status: completed
tags: []
created: 2026-11-06
due:
related-tasks: [CORE-628, CORE-647, CORE-370]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - AGENTS.md
  - docs/CONTEXT-BUDGET.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-865 | agents-md-repo-layout-trim

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-628]] · [[CORE-647]] · [[CORE-370]]

## 🎯 Goal

Trim `AGENTS.md` §"Repo Layout" to a pointer plus the entries an agent must know before editing, so prose outside `## Workflow` drops from 108 to ≤100 lines (natabula `check-fleet-agents-prose.sh` budget).

## ✅ Acceptance

- [x] Non-blank lines outside `## Workflow` ≤ 100 (natabula's `scan_agents` awk, fence-aware) — `awk '/^```/{f=!f} !f&&/^## /{h=tolower($0);sub(/[ \t]+$/,"",h);w=(h=="## workflow")} !w&&/[^[:space:]]/{n++} END{print n; exit (n>100)}' AGENTS.md`
- [x] `## Repo Layout` points at `SPEC/layout.md` and `README.md` and keeps the must-know entries (`.flaitron/` audit-overlay symlink note, `docs/CONTEXT-BUDGET.md`) — `grep -q 'SPEC/layout.md' AGENTS.md && grep -q 'audit-overlay' AGENTS.md && grep -q 'CONTEXT-BUDGET' AGENTS.md`
- [x] `## Validation` and `## Editing Rules` untouched — `git diff -U0 AGENTS.md | grep -E '^@@'` shows hunks only inside the Repo Layout line range
- [x] `docs/CONTEXT-BUDGET.md` `AGENTS.md` row re-measured — `bash tools/drift-checks.sh context_budget`
- [x] Full drift suite stays green — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Rewrite `AGENTS.md` `## Repo Layout` as a one-line pointer plus ~8 must-know bullets (SPEC, `.flaitron/` + audit-overlay, per-agent wiring dirs, `docs/` + CONTEXT-BUDGET, `brand/`, `tools/` + `install.sh` + `justfile`, `viz/`)
- [x] Re-measure `AGENTS.md` and update the `docs/CONTEXT-BUDGET.md` row (and the stale-ledger prose only if the sum is affected — AGENTS.md sits outside the sum)
- [x] Run Acceptance verify commands

## 🔗 Related

- [[TASK-ID]] — short context (predecessor / follow-up / parent epic; edge type hint when set — SPEC.md §"Tasknote body shape")

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Baseline re-measured with natabula's `scan_agents` awk: 108 non-blank lines outside `## Workflow` (matches the PLAN line); `## Repo Layout` is ~38 of them and restates `SPEC/layout.md` §"Working in the flaitron repo itself" and `README.md`. Cutting it to a pointer plus ~8 bullets lands ~83.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Best Practices Review: `N/A` — markdown-only change, no code or module boundary.
- Archive skim: CORE-370 / CORE-628 / CORE-647 each *added* a row to this map after an audit found it stale — the file-by-file shape is what keeps drifting and growing. A pointer plus must-know entries removes that churn. CORE-489.3 confirmed no drift check gates the Repo Layout section by name (re-checked: `tools/drift-checks.sh` reads only `## Validation` and the `## Workflow` pair-S lines, `drift-checks.test.mjs` seeds edits only in Workflow).
- Drift check: PLAN line says "line 60 on" — `## Repo Layout` is at AGENTS.md:60, matches. `.flaitron/audit-overlay/SKILL.md:70,86` cite the section ("where each concern lives"; "naming a directory that moved") — still true of a pointer+highlights shape. `docs/CONTEXT-BUDGET.md:234` carries an `AGENTS.md` byte row (10,324) that this edit will stale — in `touches:`.
- Clarifications: No clarifications needed. Assumptions: keep `.flaitron/` audit-overlay/symlink note (the only fact not derivable by `ls`), `docs/CONTEXT-BUDGET.md` budget enforcement, and one-line viz/brand contract pointers; drop `README/SECURITY/CONTRIBUTING/LICENSE/LOGO/.editorconfig/.gitleaks.toml/.github/templates` rows (discoverable via `ls`, `.editorconfig` already cited in Editing Rules, install-test.yml already cited in Validation).
- Exit gate: Discovery surfaced no significant deviation → skip 🛠️.



## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: shape follows `SPEC/layout.md`'s own pointer-style bullets; no new structure. Minimal refactor gate: none beyond the section rewrite. Tests: `N/A` (markdown; `drift-checks.sh` is the gate).
- `AGENTS.md` §"Repo Layout" 39 lines → 21: one-line pointer to `README.md` + `SPEC/layout.md`, 8 bullets. Dropped as `ls`-discoverable or already cited elsewhere in the file: `README/SECURITY/CONTRIBUTING/LICENSE/LOGO`, `.editorconfig` (cited in Editing Rules), `.gitleaks.toml`, `.github/` (`install-test.yml` is named in Validation), `templates/`. Folded `install.sh` + `justfile` + `tools/` into one bullet; folded the four per-agent dirs into one.
- `docs/CONTEXT-BUDGET.md`: `AGENTS.md` row 10,324 → 8,627 (bytes, same unit as the old figure) plus a one-paragraph re-measure note.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) `N/A` — markdown only, no UI

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipts (after review fixes; AGENTS.md 8,628 bytes):
- scan_agents awk (prose outside `## Workflow`) → 0, prints 91 (was 108; budget 100)
- `grep -q SPEC/layout.md && grep -q audit-overlay && grep -q CONTEXT-BUDGET AGENTS.md` → 0
- `git diff -U0 AGENTS.md | grep '^@@'` → hunks only in the Repo Layout span (old lines 60-98)
- `bash tools/drift-checks.sh` → 0 (all checks ok; pre-existing NEAR CAP note on `ft-release/**`, 107,766 of 113,000)
- `node --test tools/drift-checks.test.mjs` → 0 (40/40)
- Lint/type-check and targeted tests: `N/A` — markdown only.

External review (`/code-review medium`, own diff only), 3 findings:
1. **note** — pointer overclaimed completeness (`SPEC/layout.md` lacks docs/brand/etc.). Fixed: reworded to "carry the fuller map; `ls` covers the rest".
2. **note** — unrelated wording change "thin overlay" → "overlay". Fixed: restored "thin overlay".
3. **note** — CORE-865 ledger paragraph lacks a blank line / unlisted rows. Declined: the CORE-854/855/867 notes are already stacked without blank lines, and no summed row was touched (`context_budget` ok).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Doc-drift sweep:** `.flaitron/tasknote/README.md` AI-referenced `AGENTS.md` entry ("repo layout, validation commands, workflow pointers…") still accurate; `.flaitron/audit-overlay/SKILL.md:70,86` cite §"Repo Layout" generically — still true. `docs/CONTEXT-BUDGET.md` updated. No other change.

**Learnings:** N/A for the always-loaded layer — the pointer shape itself stops the add-a-row-per-audit churn (CORE-370/628/647).

**Final Summary:** `AGENTS.md` §"Repo Layout" 39 → 21 lines (pointer to `README.md` + `SPEC/layout.md` plus eight must-know bullets: SPEC, `.flaitron/` audit-overlay symlink note, per-agent wiring, `docs/` + CONTEXT-BUDGET, `brand/`, tools/install/justfile, `viz/`). Prose outside `## Workflow` 108 → 91 (budget 100). `docs/CONTEXT-BUDGET.md` `AGENTS.md` row 10,324 → 8,628 plus a re-measure note. Verification: drift suite 0, drift self-test 40/40. External review: three notes — two fixed, one declined with reason. `touches:` reconciliation: declared `AGENTS.md`, `docs/CONTEXT-BUDGET.md`; diff also covers `.flaitron/PLAN.md` and this note (workflow bookkeeping). Maintainability: the layout map can no longer drift file-by-file.

**Archived:** 2026-11-06
