---
title: plan-auto-rotate discovery
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-768, CORE-683, CORE-467, CORE-604.4, CORE-638.3, CORE-473.5, CORE-089]
touches:
  - .flaitron/PLAN.md
---

# CORE-768.1 | plan-auto-rotate discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-768]]

## 🎯 Goal

Scope the `CORE-EPIC-768` epic (`plan-auto-rotate`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-768.2..4` in `.flaitron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-768.2 .. CORE-768.4 filed in .flaitron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-768.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flaitron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-768.2 .. CORE-768.4; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flaitron/PLAN.md under CORE-EPIC-768 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-683]] — origin: its run hit the 203-row `## Completed` advisory, which surfaced this epic
- [[CORE-467]] — predecessor: authored the rotation contract and the "operator motion" rule
- [[CORE-604.4]] — predecessor: collapsed the bound to a single 60-row threshold with row-count granularity
- [[CORE-638.3]] — predecessor: mirrored the advisory into every closing runner and `/ft-release` §7.1
- [[CORE-473.5]] — predecessor: `/ft-close-epic --unattended` parent-flip deferral
- [[CORE-089]] — predecessor: made the parent-flip the bundled in-📦 prompt that force-fires 📦

## 🌳 Fan-out

- **Sequential:** [[CORE-768.3]] after [[CORE-768.2]]; [[CORE-768.4]] after [[CORE-768.3]] (all three edit the post-closure / plan-filing contract)
- **Synthesis:** [[CORE-768.N]]

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The operator asked for this epic after [[CORE-683]] closed with `## Completed` at 203 rows, more than 3× the 60-row bound. That shows the advisory-only motion is not getting rotation done.

- [x] Read relevant source files — `SPEC/plan-filing.md` §"`## Completed` rotation" (full), `SPEC/post-closure.md` (steps 1–2), `SPEC/epic.md` (full), `SPEC/gate-postures.md` §"`/ft-close-epic` under the posture", `claude/skills/ft-close-epic/SKILL.md` Steps 8–9 + Notes, `SPEC/scope-boundaries.md` §"What flaitron does NOT provide", `docs/VISION.md` core principles. Full citer list from `git grep -iE "rotat|PLAN-ARCHIVE"` and a parent-flip grep (Discovery Notes).

- [x] **Best Practices Review** — `N/A` at the Discovery level: the deliverable is PLAN filing. The one design constraint is SPEC core principle #2 ("Zero scripts"). Rotation must stay an agent procedure that moves markdown, not a `tools/` script. `SPEC/scope-boundaries.md` says the two existing carve-outs are "singular exceptions, not precedents", and the operator confirmed it.

- [x] **Archive skim** — area `archive/core/` per the README table. Load-bearing:
  - [[CORE-467]] made rotation an operator motion only for consistency with "no validator, no CLI" (line 33), not because the move needs judgment. Its original design had hysteresis: advisory >150, target 100.
  - [[CORE-604.4]] collapsed that to one 60-row number. Its Final Summary calls the old two-number gap a gap "nothing depended on", because only the informational advisory ever fired. Hysteresis now has to come back on the *target* side (>60 → ~40), not as a second advisory number.
  - [[CORE-638.3]] copied the advisory into `/ft-micro-task`, `/ft-close-epic`, and `/ft-release` §7.1. All four sites are now replace-or-retire targets.
  - [[CORE-089]] made the parent-flip the **only** bundled in-📦 prompt. Its bundled-prompt override is written generically, so removing the prompt leaves the override with no live instance, but it stays valid.
  - [[CORE-473.5]] deferred the parent-flip under `--unattended` because autonomous commit "cannot resolve a user-input question". If the flip becomes mechanical, the question goes away, and so does the deferral (`SPEC/gate-postures.md` §"`/ft-close-epic` under the posture").
  - [[CORE-620]] is the most recent manual rotation (2026-09), the procedure this epic automates.

- [x] **Drift check** — paths and sections cited above all resolve at `cec9e2d9`. `## Completed` holds 204 rows; [[CORE-683]] added one. `PLAN-ARCHIVE.md` is 111 KB and runners never read it (only the viz parser and `tools/drift-checks.sh` Pair R do), so archive size costs no runner context. The `.flaitron/PLAN.md` epic row matches this note's scope. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — four asked; answers in "Resolved scoping" below

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Active model Opus 5.5 (heavy) under a `[frontier]` tag: ⚠️ under-tier advisory, proceeded.

**Shared design surface** (from `git grep -iE "rotat|PLAN-ARCHIVE"` and the parent-flip grep):

| Surface | Sites | Child |
|---|---|---|
| Rotation contract | `SPEC/plan-filing.md` §"`## Completed` rotation" ("Rotation is an operator motion" paragraph; bound; granularity) | .2 |
| Closing hook | `SPEC/post-closure.md` step 1 (loaded by every closing runner: `/ft-task`, `/ft-micro-task`, `/ft-close-epic`, `/ft-epic-discovery`, `/ft-release`) | .2 |
| Advisory sites | `claude/skills/ft-task/preamble.md` (shared with `/ft-micro-task`), `SPEC/procedures/ft-task.md`:166, `claude/skills/ft-close-epic/SKILL.md`:56, `claude/skills/ft-release/step-7.1-standing-checks.md`:114 + `SKILL.md`:275/286/336 | .3 |
| Prose mirrors | `templates/PLAN.md`:46, `docs/GLOSSARY.md`:31, `docs/MIGRATION.md`:268, `docs/EXTERNAL-AGENTS.md`:93 ("once an operator has rotated"), `SPEC.md`:701, `README.md`:215, `claude/AGENTS-snippet.md`:19 | .3 |
| Parent-flip | `claude/skills/ft-close-epic/SKILL.md` Steps 8–9 + Notes "Parent-flip is a prompt, not automatic", its `--unattended` fragment §"Step 8 — Parent-flip deferral", `SPEC/gate-postures.md` §"`/ft-close-epic` under the posture", `SPEC/gates.md`:180 (override example), `SPEC/epic.md` §"Child placement invariant", `SPEC/plan-filing.md`:194, `SPEC.md`:669 | .4 |
| Unaffected | viz parser/devApi (already reads both files; comments call the archive "machine-rotated"), `tools/drift-checks.sh` Pair R, `SPEC/fixtures/plan/rotated-history.*` | — |

Codex/Cursor/Grok wrappers carry no rotation text (they point at the canonical bodies), so no wrapper edits are needed.

**Resolved scoping** (operator, 2026-10-09):

| Question | Answer |
|---|---|
| Mechanism | Agent procedure, not a `tools/` script. A script would amend SPEC core principle #2 rather than add a carve-out (`SPEC/scope-boundaries.md`: carve-outs are "singular exceptions, not precedents"). |
| Commit | Separate autonomous `chore: rotate ## Completed` commit right after the closure commit, touching only `PLAN.md` + `PLAN-ARCHIVE.md`. Keeps the closure diff and 📦 review clean. |
| Hysteresis | Fires at >60 rows and rotates the oldest rows down to 40. The bound stays 60; target 40 restores the hysteresis [[CORE-604.4]] collapsed, but on the target side. |
| Parent auto-flip scope | Any closing runner. When a closure leaves every child of an epic `[x]`, flip the parent and move the cohort, in the shared post-closure step, before the rotation check. |
| Advisories | Retire the runner advisories (preamble, ft-task SOP, close-epic). Keep `/ft-release` §7.1 as a backstop that should always read under-bound. |
| Epic shape | M=3, `[heavy]` epic, Medium priority, `.N` audit kept. |

**Sequencing.** All three children edit the same post-closure / plan-filing contract, so the chain is sequential: .2 lays down the rotation procedure and hook; .3 retires the advisories that point at the old operator-motion rule; .4 adds the parent flip, which must run *before* the rotation check in the same hook so a just-flipped cohort is counted. flaitron-self's 204-row backlog needs no child of its own: .2's own post-closure is the first run of the new procedure and rotates it down to 40.

**`[unattended]` candidacy.** No candidates:
- .2, .4, and .N fail clause 1 (`[heavy]`).
- .3 fails clause 3 (`MIGRATION` keyword) and clause 6 (its predecessor .2 is not a candidate).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — cohort-children filing as in [[CORE-741.1]] / [[CORE-724.1]]: 2-space nesting, `[model]` plus glyph on every row, em-dash separator.

- [x] **Minimal refactor gate** — PLAN rows only; no refactor.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: pure PLAN.md filing.

**Implementation Notes:**

- Wrote 3 child rows (M=3, unchanged from filing). Word counts: .2 = 49, .3 = 35, .4 = 51. .4 is above the 50w target and under the 70w cap; operator approved the row text at 🛠️.
- Per-child `[model]`: .3 departs from the `[heavy]` seed to `[medium]` (mirror sweep); .2 and .4 stay `[heavy]`. Shown and approved at 🛠️.
- Downstream impact: none. The only other open row is CORE-641 (typescript-7), which is unrelated.
- `[unattended]` candidacy: no candidates (see Discovery Notes).
- `.N` audit row confirmed as filed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: PLAN filing only.

- [x] Ran lint/type-check on changed code — `N/A`.

- [x] **Verification receipt** — `N/A` for code. Markdown pass: 2-space indent, bold IDs, `[model]` + glyph, `| shortname` ≤30 chars, em-dash, no trailing whitespace, Fan-out wikilinks match the filed children. `bash tools/drift-checks.sh` → 0 after the archive move.

- [x] **External review** — `N/A`: the deliverable is filed PLAN rows the operator approved verbatim at 🛠️, not a diff to grade.

- [x] (frontend) Asked the user for visual confirmation — `N/A`.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Markdown mental-pass clean; drift checks recorded above.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line — `N/A`

**Final Summary:**

Filed CORE-EPIC-768 (`plan-auto-rotate`) and scoped it into three sequential children:
- .2 turns `## Completed` rotation into an automatic agent procedure: >60 → 40 rows, in a separate chore commit, hooked into post-closure.
- .3 retires the runner advisories and keeps `/ft-release` §7.1 as a backstop.
- .4 auto-flips an epic parent once every child is closed, in any closing runner.

The rotation stays a procedure, not a script, because of SPEC core principle #2. flaitron's own 204-row backlog rotates on .2's closure, with no extra child.

Changed: `.flaitron/PLAN.md` (3 child rows + .1 stub) and this archived note. Doc-drift sweep: "no change" for every AI-referenced doc, since the contract edits land in .2–.4. `touches:` reconciliation: declared `.flaitron/PLAN.md`, matching the diff apart from the archive add.

**Archived:** 2026-10-09
