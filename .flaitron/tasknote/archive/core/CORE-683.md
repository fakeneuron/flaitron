---
title: epic-forward-restore
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-680, CORE-727]
touches:
  - .flaitron/PLAN.md
---

# CORE-683 | epic-forward-restore

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-680]]

## 🎯 Goal

Check the [[CORE-680]] decay window (`a78a8ae5`..HEAD) against its restore bar. Restore `SPEC/epic.md`'s deleted `**Forward-looking.**` paragraph only if an epic tasknote archived in the window followed it; otherwise close the window and leave it deleted.

## ✅ Acceptance

- [x] Window depth meets the bar: ≥8 epic tasknotes (`*-EPIC-*` or `*.<sub>`) archived after `a78a8ae5` — `git log --diff-filter=A --name-only --format= a78a8ae5..HEAD -- .flaitron/tasknote/archive .flowtron/tasknote/archive | grep -E '(EPIC-[0-9]+|[0-9]+\.([0-9]+|N))\.md$' | sed 's#.*/##' | sort -u | wc -l` ≥ 8
- [x] No counted note followed the deleted paragraph — `grep -liE 'forward-looking|in-flight epics need no migration|need no migration' <the counted notes>` prints nothing; the `.1`-less epics are attributed to their filing route — `judgment`: evidence recorded in Discovery Notes
- [x] Paragraph stays deleted and the intro judgment sentence stays — `grep -q '^\*\*Forward-looking\.\*\*' SPEC/epic.md` exits 1; `tr '\n' ' ' < SPEC/epic.md | grep -q "Simpler implementations don't need it — apply judgment."` exits 0
- [x] [[CORE-683]] is a Completed stub — `grep -q '^- \[x\] \*\*CORE-683\*\* .*Completed 2026-10-09\.$' .flaitron/PLAN.md` exits 0
- [x] CI drift checks hold — `bash tools/drift-checks.sh` exits 0

## 🧩 Subtasks

- [x] Count epic tasknotes archived after `a78a8ae5` and name the first eight
- [x] Grep the counted notes for any citation of the deleted paragraph
- [x] Attribute each `.1`-less epic in the window to its filing route
- [x] Record the verdict (no restore) and flip the PLAN row

## 🔗 Related

- [[CORE-680]] — predecessor: deleted the paragraph, opened the window at `a78a8ae5`, and holds the restore bar
- [[CORE-727]] — sibling decay-window close, same shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Unchecked Low row. The window's depth condition is met (49 epic tasknotes archived since `a78a8ae5`), so the block has cleared. No tasknote or archive file existed for this ID.

- [x] Read relevant source files — archived [[CORE-680]] (restore bar), `git show 4be1d124 -- SPEC/epic.md` (the deleted text), `SPEC/epic.md` (current state), archived [[CORE-727]] (precedent shape), and the counted epic notes, read by grep.

- [x] **Best Practices Review** — `N/A`: verdict-only task with no code or module change.

- [x] **Archive skim** — area `archive/core/` per the README table. The window's counted notes are the skim. Grepping them for `forward-looking`, `in-flight epics`, `need no migration`, `don't need it/the bracket`, `apply judgment`, and `skip … discovery/bracket` returns only [[CORE-724.3]]. It cites the *intro* sentence and the CORE-683 slot so that its own trim leaves them byte-identical. It does not follow the deleted paragraph.

- [x] **Drift check** — the row matches the bar in [[CORE-680]] §Implementation Notes. `SPEC/epic.md` has no `**Forward-looking.**` line, and the intro sentence "Simpler implementations don't need it — apply judgment." is intact. The window spans the flowtron → flaitron rename ([[CORE-711.4]] moved `.flowtron/` → `.flaitron/`), so the count has to search both archive roots. A rename-move re-adds a path, so the list is deduped by basename.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — `No clarifications needed`. Assumptions: (1) the bar counts `.N` audit notes as `*.<sub>`; (2) "the eight" are the first eight archived after `a78a8ae5`, but the grep covers all 49 so a later citation can't be missed; (3) a `.1`-less epic only counts as following the paragraph if it cites the paragraph. Epics filed by an audit skill with children already scoped are a different route.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Active model Opus 5.5 (heavy) satisfies `[medium]`. The `## Completed` rotation advisory fired at 203 rows; it is informational only.

**Window depth.** 49 distinct epic tasknotes were archived in `a78a8ae5`..`cd15b450`. The first eight were [[CORE-678.2]], [[CORE-678.N]], [[CORE-679.2]], [[CORE-679.N]], [[CORE-711.1]], [[CORE-711.2]], [[CORE-711.3]], and [[CORE-711.4]]. The bar is met, with room to spare.

**Restore criterion 1: skipped an in-flight migration.** None found. No counted note cites "in-flight epics need no migration" or any exemption from an epic-shape change. The grep above has zero hits.

**Restore criterion 2: skipped the Discovery+Audit bracket by citing the deleted paragraph.** None found.

- Every epic in the window has a `.N` audit note, so no epic dropped the audit side.
- Seven epics have no `.1`: 678, 679, 716, 734, 735, 739, and 742. Their parent rows came from audit-skill filings with children already scoped. Their filing commits:
  - 678 and 679: `2d3ebb01 chore: file audit plan rows`
  - 734 and 735: `e69dd754 chore: audit-repo file epics`
  - 739: `60c629a7 chore: audit-repo file epics`
  - 742: `5d651e71 chore: audit-repo file epics`
  - 716: `90f9698f`, whose row reads "Discovery supplied by audit-repo 2026-10-06"

  In each case, the scoping Discovery happened in the audit pass.
- None of these notes cites the deleted paragraph, and none cites the intro sentence as grounds for skipping `.1`.
- The epics that did need scoping ran a `.1`: [[CORE-711.1]], [[CORE-724.1]], and [[CORE-741.1]].

**Verdict: no restore.** Leave the paragraph deleted and close the window. The intro judgment sentence covers the "simpler implementations don't need it" case on its own.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — same shape as [[CORE-727]]: read the window against its bar, record a per-criterion verdict, and close. Nothing is restored, so the only edit is the PLAN stub flip.

- [x] **Minimal refactor gate** — no refactor. `SPEC/epic.md` is untouched.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: no code. Acceptance is decided by shell checks.

**Implementation Notes:**

No restore, so `SPEC/epic.md` is unchanged. The window is closed and the deletion is now permanent. The only file edit is the [[CORE-683]] row flip to a Completed stub at the top of `## Completed`. Without this note, nothing records the decision, so the verdict lives here.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no code. The Acceptance commands are the suite.

- [x] Ran lint/type-check on changed code — `N/A`: no code.

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — `N/A`: the diff is a one-row PLAN stub flip plus this note. The judgment rests on the reproducible commands recorded below, not on code a reviewer could grade.

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt:

- window-depth `git log … | sort -u | wc -l` → 49 (≥ 8)
- counted-notes `xargs grep -liE 'forward-looking|in-flight epics need no migration|need no migration'` → no output (exit 1)
- `grep -q '^\*\*Forward-looking\.\*\*' SPEC/epic.md` → 1
- `tr '\n' ' ' < SPEC/epic.md | grep -q "Simpler implementations don't need it — apply judgment."` → 0
- `grep -q '^- \[x\] \*\*CORE-683\*\* .*Completed 2026-10-09\.$' .flaitron/PLAN.md` → 0
- `bash tools/drift-checks.sh` → 0 (re-run after the archive move)

Structural half: `N/A`, since no code changed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line — `N/A`

**Final Summary:**

The [[CORE-680]] decay window is closed with no restore, and `SPEC/epic.md`'s `**Forward-looking.**` paragraph stays deleted. 49 epic tasknotes were archived after `a78a8ae5` against a bar of 8, and none cited the paragraph or skipped an in-flight migration. The seven epics without a `.1` were all audit-filed, with Discovery supplied by the audit pass. None leaned on the deleted exemption.

Changed files: `.flaitron/PLAN.md` (row → Completed stub) and this archived note. Verification: all receipts above passed, and the drift checks exit 0.

Doc-drift sweep, all "no change": no SPEC, doc, or snippet text moved.

`touches:` reconciliation: declared `.flaitron/PLAN.md`, and that matches the diff apart from this note's archive add.

Maintainability: one open decay window removed. The epic module keeps the bracket judgment in its single intro sentence.

**Archived:** 2026-10-09
