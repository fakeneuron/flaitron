---
title: layout-flaitron-dirs
status: completed
tags: [docs, layout]
created: 2026-11-24
due:
related-tasks: []
touches:
  - SPEC/layout.md
---

# CORE-926 | layout-flaitron-dirs

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Name `.flaitron/grok-checkout/`, `.flaitron/grok-done/` and `.flaitron/screenshots/` in `SPEC/layout.md` §"Working in the flaitron repo itself", with who writes each.

## ✅ Acceptance

- [x] `SPEC/layout.md` §"Working in the flaitron repo itself" names all three directories — `for d in grok-checkout grok-done screenshots; do awk '/^## Working in the flaitron repo itself/{a=1;next} a&&/^## /{a=0} a' SPEC/layout.md | grep -q "\.flaitron/$d/" || echo "missing $d"; done` prints nothing
- [x] Each entry states who writes it — `judgment` (prose; no command decides "who writes it" correctly), checked by the External review against the three directories' tracked contents
- [x] The entries leak no private workflow identifier or Drive reference — `awk '/^## Working in the flaitron repo itself/{a=1;next} a&&/^## /{a=0} a' SPEC/layout.md | grep -iE 'drive|FLT-G|drive_id'` prints nothing
- [x] Doc drift checks and context budget stay green — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Read the three dirs' tracked contents and their archived provenance
- [x] Add three bullets to the §"Working in the flaitron repo itself" list in `SPEC/layout.md`
- [x] Run the full validation set; External review

## 🔗 Related

- [[CORE-914]] — wrote the `FLT-G001` claim and done markers these entries describe
- [[CORE-711.9]] — re-captured `.flaitron/screenshots/viz-board.png`, the README hero

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The three directories are tracked (`git ls-files .flaitron`) and `SPEC/layout.md` §"Working in the flaitron repo itself" does not name any of them (`grep` of the file for each path finds nothing). No contract decision: the section is a layout map and the writers are read off the tracked markers.

- [x] Read relevant source files — `SPEC/layout.md`; the tracked contents of `.flaitron/grok-checkout/`, `.flaitron/grok-done/`, `.flaitron/screenshots/`; `AGENTS.md` §"Grok Task Notes"; archived CORE-914 and CORE-711.9

- [x] **Best Practices Review** — N/A, documentation-only change in one SPEC module

- [x] **Archive skim** — `grep -l` over `.flaitron/tasknote/archive/core/` for the three paths hits CORE-914 (claim marker `.flaitron/grok-checkout/FLT-G001.md`, done marker `.flaitron/grok-done/FLT-G001.md`, written by the closing agent, no Drive ID or link in this public repo), CORE-711.9 (re-captured `viz-board.png` as the README hero from an isolated single-project workspace) and CORE-770.2 (the hero is the one tracked screenshot, a carve-out from the "screenshots live outside the repo" rule). `archive/core/` is the README table's folder for `CORE-*`.

- [x] **Drift check** — PLAN.md line matches the SPEC section it cites: the heading exists at `SPEC/layout.md:30`, and the list ends before `### Procedure SOPs`. Marker frontmatter read from the files: claim `note` / `task` / `at` / `by` / `read_at`; done `note` / `task` / `at` / `by` / `outcome` (+ `retargeted_to` when retargeted). Only the README references `.flaitron/screenshots/viz-board.png`.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

No clarifications needed (--unattended). Assumptions: the entries use the generic `<NOTE-ID>` and say "operator-assigned Grok task note", never the private workflow's names or Drive wording, because `AGENTS.md` §"Grok Task Notes" bars private workflow identifiers from git and `FLT-G001` is only the one existing instance.

Judgment: Discovery surfaced no significant deviation → skip 🛠️.

Size estimate: ~8 lines (rename-aware)

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing list's backticked-path + em-dash bullet shape

- [x] **Minimal refactor gate** — no refactor; three added lines only

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose-only SPEC edit

**Implementation Notes:**

- `SPEC/layout.md` §"Working in the flaitron repo itself": three bullets after the `audit-overlay` entry — claim markers (claiming agent writes, commits with the claim; cf. `f76e2cb6`), done markers (closing agent writes, in the closure commit, `outcome:` key; cf. `523ea4c4`), screenshots (README-embedded images; a task re-capturing the hero writes it; self-verification captures stay outside the repo). Generic `<NOTE-ID>`; no private workflow names.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no code; drift checks cover it

- [x] Ran lint/type-check on changed code — N/A, markdown only

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no UI surface. Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- A1 `for d in ...; grep -q "\.flaitron/$d/" || echo missing` → exit 0, no output
- A3 `awk ... | grep -iE 'drive|FLT-G|drive_id'` → exit 1 (no match)
- A4 `bash tools/drift-checks.sh` → exit 0 (all checks ok)
- External review (Sonnet subagent, non-author): no blockers; A2 confirmed against `f76e2cb6`, `523ea4c4`, `b44ffbaa`/`0955e779`. Note 1: "The operator or" had no history evidence → fixed (dropped). Note 2: single-line bullets vs one hard-wrapped neighbour → no change, other neighbours are single-line too.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: no change beyond the deliverable itself (`SPEC/layout.md`); AGENTS.md repo-layout bullets defer to `SPEC/layout.md`

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A

**Final Summary:**

`SPEC/layout.md` now names `.flaitron/grok-checkout/`, `.flaitron/grok-done/` and `.flaitron/screenshots/` with who writes each (+3 lines). `touches:` reconciliation: `git diff --name-only` = `SPEC/layout.md` (+ PLAN/tasknote closure files), matches declared. Maintainability: closes audit-structure Finding #6; the layout map now covers every tracked `.flaitron/` directory.

**Archived:** 2026-11-24
