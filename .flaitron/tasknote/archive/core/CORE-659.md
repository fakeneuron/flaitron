---
title: gate-discipline-decay-window
status: completed
tags: []
created: 2026-09-22
due:
related-tasks: [CORE-660]
touches:
  - SPEC/gates.md
  - SPEC/procedures/ft-task.md
---

# CORE-659 | gate-discipline-decay-window

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-660]]

## 🎯 Goal

Open the gate-discipline decay experiment: drop the two live "read
`gate-discipline.md` before skipping a gate" triggers (in `SPEC/gates.md` and
`SPEC/procedures/ft-task.md`) and record the window-start SHA, so CORE-660 can
later trim `gate-discipline.md` to whichever failure modes the decay window
actually observed.

## ✅ Acceptance

- [x] Both skip-path triggers removed — `grep -c "Read it before you skip a gate" SPEC/gates.md` and `grep -c "Before skipping a gate, read" SPEC/procedures/ft-task.md` both `0`
- [x] No dangling references to the removed prose — `grep -rn "Load it when you are about to argue\|Before skipping a gate, read \[" --include="*.md" .` (excluding `archive/`) empty
- [x] `docs/AGENT-NEUTRALITY.md`'s `--fast`/`-f` ledger row (line 40) stays accurate — `judgment`: the row counts `SPEC/gates.md` sites by surviving heading, not paragraph content; §"Gate discipline — read before skipping a gate" heading is untouched, so the "8 sites" count and enumeration still hold
- [x] `gates.md` / `ft-task.md` stay under their `docs/CONTEXT-BUDGET.md` caps (25,000 / 38,000) — `wc -c SPEC/gates.md SPEC/procedures/ft-task.md` both under cap (edit only shrinks them, so no ledger re-measurement owed — precedent: [[CORE-664]] Learnings)
- [x] Window-start SHA recorded for CORE-660 to key its archive grep off — `👁️` / recorded below in Final Summary

## 🧩 Subtasks

- [ ] Locate the two live triggers (as opposed to the descriptive/roster mentions of `gate-discipline.md` that stay)
- [ ] Remove `SPEC/gates.md`'s "Load it when you are about to argue…" trigger paragraph; repair the now-dangling "here the trigger, there the content" clause in the adjacent Standing-rule paragraph
- [ ] Remove `SPEC/procedures/ft-task.md`'s "Before skipping a gate, read…" paragraph
- [ ] Verify no other file cites the removed text/anchors; verify `docs/AGENT-NEUTRALITY.md`'s ledger row doesn't need a recount
- [ ] Record the window-start SHA (`git rev-parse HEAD` at task start) in this tasknote for CORE-660

## 🔗 Related

- [[CORE-660]] — follow-up task that reads this task's decay-window record at Discovery

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md line 17 is current, unchecked, not archived. `git status --porcelain` clean at start. No tasknote or archive file existed for CORE-659 — fresh scaffold.

- [x] Read relevant source files — read `SPEC/gates.md` (full), `SPEC/procedures/ft-task.md` §"Agent-neutral primitives" surroundings, `docs/AGENT-NEUTRALITY.md` row 40/41, `docs/HARNESS-SURVEY.md` (the motivating survey finding), `docs/CONTEXT-BUDGET.md` rows for both target files, `.flowtron/tasknote/README.md` §"AI-referenced docs" and §"Archive layout".

- [x] **Best Practices Review** — both edits are prose deletions in existing SPEC modules, no new abstraction or module boundary introduced. Checked dependency direction (removing a cross-reference, not adding one) and confirmed no duplication introduced.

- [x] **Archive skim** — `archive/core/` has 5+ notes touching `gates.md`/`gate-discipline`; per the ~3-note line this would normally route to a probe, but the two most load-bearing sources (`docs/HARNESS-SURVEY.md`'s "Overkill" §2 naming CORE-659/660, and CORE-664's own Learnings on `docs/CONTEXT-BUDGET.md`) were already read directly and cover the relevant precedent: (1) this task is the opening move of a HARNESS-SURVEY-flagged "gate-discipline.md is a catalog of spring-2026 model failure modes" overkill finding, paired with CORE-660 (trim) and CORE-661 (a standing decay pass); (2) CORE-664 (2026-09-22) explicitly warns against refreshing a single `docs/CONTEXT-BUDGET.md` row against stale siblings — applied here by *not* touching that ledger, since the edit only shrinks both files.

- [x] **Drift check** — PLAN.md's parenthetical names `SPEC/gates.md` §"Conditional skip rule" as one of the two pointer locations, but that heading (lines 199–241) carries no `gate-discipline.md` link. The actual live trigger sits in the adjacent §"Gate discipline — read before skipping a gate" (lines 273–297), which is the section whose whole job is "read before skipping a gate" — the same concept the PLAN.md line is naming, just not the literal current heading text. Treated as the intended target; documented here rather than asked, per `[unattended]`-implied fast-mode. `docs/AGENT-NEUTRALITY.md` row 40 counts `SPEC/gates.md` sites at heading granularity (8 named headings = 8 sites) — confirmed by counting the enumerated list — so trimming a paragraph inside a surviving heading does not change that count; no ledger edit needed. `docs/CONTEXT-BUDGET.md`'s per-file byte figures are historical calibration snapshots, not live-updated on every edit (CORE-664 precedent), and this edit only reduces both files well under their caps, so no ledger update is owed there either.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — `No clarifications needed (--fast implied by [unattended] row marker)`. Assumptions: (1) "the two skip-path pointers" = the two live imperative "go read gate-discipline.md before skipping" instructions (not every descriptive mention of the file); (2) "drop" means remove the imperative trigger sentence/paragraph, not the section heading or the descriptive content that still legitimately points a spec-author at `gate-discipline.md`'s contents; (3) the window-start SHA is recorded in this tasknote (read by CORE-660 via `related-tasks`/archive skim) rather than embedded in a SPEC file.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

Window-start SHA (HEAD at task start, before any edit): `f8c44275438cba0d7ad96bb2afb0bb442c57c4bb` (`docs: CORE-664 — spec-section-extract`).

Two live triggers identified and confirmed as the only two in-repo (outside `archive/`):
1. `SPEC/gates.md` §"Gate discipline — read before skipping a gate" — the "**Load it when you are about to argue.**...Each is refuted in the module." paragraph (was lines 283–291).
2. `SPEC/procedures/ft-task.md` — the "Before skipping a gate, read `SPEC/gate-discipline.md` §'Rationalizations' and [§'Red Flags'](../gates.md)…" paragraph (was lines 116–120; note this paragraph's second link was already mis-targeted at `gates.md` instead of `gate-discipline.md` — moot now, removed with the paragraph, not filed as a separate followup).

`gate-discipline.md` itself is untouched and remains reachable from `SPEC.md` §"the discipline" roster entry, `README.md`, `docs/AGENT-NEUTRALITY.md`, `docs/HARNESS-SURVEY.md`, `docs/CONTEXT-BUDGET.md`, and `SPEC/gate-postures.md` — this experiment removes the two *active* nudges at the moment of a skip decision, not the module's discoverability.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — pure prose deletion within existing sections; no new shape introduced. Preserved the surrounding paragraphs' referential integrity (fixed the now-dangling "here the trigger, there the content" clause in `gates.md`'s Standing-rule paragraph rather than leaving it stale).

- [x] **Minimal refactor gate** — touched only the two trigger paragraphs plus the one adjacent sentence they broke; did not rename the `gates.md` section heading (would have forced an unrelated `docs/AGENT-NEUTRALITY.md` ledger edit — deferred as out of scope for this pointer-drop), did not touch `gate-discipline.md` itself or `docs/CONTEXT-BUDGET.md`.

- [x] Implemented the minimal solution — see diff (`SPEC/gates.md`, `SPEC/procedures/ft-task.md`).

- [x] Updated/added tests for non-trivial behavior — `N/A`: prose-only SPEC edit, no test suite covers SPEC module content; correctness verified via grep checks in Phase 3.

**Implementation Notes:**

`SPEC/gates.md` — removed the "**Load it when you are about to argue.**" paragraph from §"Gate discipline — read before skipping a gate"; kept the heading and the descriptive paragraph (still names `gate-discipline.md` and its three sub-sections) and the "Standing rule (CORE-386/CORE-388)" paragraph, trimmed to drop the "here the trigger, there the content" clause since the trigger is now gone from this file.

`SPEC/procedures/ft-task.md` — removed the "Before skipping a gate, read…" paragraph outright (no adjacent prose depended on it).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: prose-only SPEC edit, no `viz`/`tools` code touched; `npm --prefix viz test` / `node --test tools/update-adopters.test.mjs` are out of scope for this diff.

- [x] Ran lint/type-check on changed code — `N/A`: no lint target covers `SPEC/*.md` prose (confirmed: `justfile` `lint` recipe only runs `npm --prefix viz run lint`).

- [x] **Verification receipt** — see Testing Notes. No duplication, dead code, unexplained complexity, public-surface growth, or stale code-facing documentation introduced — deletions only, with one repaired cross-reference.

- [x] **External review** — see Testing Notes.

- [ ] (frontend) Asked the user for visual confirmation — `N/A`: not a frontend change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipts (all commands run from repo root):

- `grep -c "Read it before you skip a gate" SPEC/gates.md` → exit 1 (0 matches, as intended)
- `grep -c "Before skipping a gate, read" SPEC/procedures/ft-task.md` → exit 1 (0 matches, as intended)
- `grep -rn "Load it when you are about to argue\|Before skipping a gate, read \[" --include="*.md" .` (excl. `archive/`) → empty
- `wc -c SPEC/gates.md SPEC/procedures/ft-task.md` → 20093 / 36074 (caps: 25,000 / 38,000 — both under, both shrunk from 20851/36864)
- Doc-drift sweep (18 `AI-referenced docs` entries): only `docs/AGENT-NEUTRALITY.md` and `SPEC.md`/`README.md` mention `gate-discipline.md` at all; `SPEC.md`/`README.md` mentions are unaffected roster/index prose (module still exists, unchanged); `docs/AGENT-NEUTRALITY.md` row 40 (`--fast`/`-f` ledger) counts `SPEC/gates.md` at heading granularity (8 named headings) — §"Gate discipline — read before skipping a gate" heading survives, so the count and enumeration are still accurate, **no change**. Remaining 15 entries: **no change** (grep confirmed none mention `gate-discipline`, `skip a gate`, or `skipping a gate`).

**External review:** `/code-review` (medium, scoped to this task's working-tree diff) — no findings. Confirmed the diff matches the tasknote's stated scope, the `docs/AGENT-NEUTRALITY.md` heading-count ledger is unaffected (heading kept, only the imperative paragraph removed), the `ft-task.md` paragraph's already-mistargeted second link was correctly removed with the paragraph rather than filed separately, and no dangling links/anchors were introduced.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 18 `AI-referenced docs` entries checked (see Testing Notes for the detail): `docs/AGENT-NEUTRALITY.md` — no change (heading-level ledger count unaffected); `SPEC.md` / `README.md` — no change (descriptive roster mentions, module untouched); remaining 15 — no change (no mention of the removed material).

- [x] Closed — every `## ✅ Acceptance` criterion ticked, `status:` flipped to `completed`, PLAN.md line to be flipped to stub form and tasknote archived to `archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary.

- [x] **Learnings** — `N/A`. No change to the always-loaded layer; the decay-window mechanism (record start SHA in the opening tasknote, count later at the trim task) is task-specific to this CORE-659/660/661 trio, not a generalizable workflow rule.

**Final Summary:**

Removed the two live imperative triggers that told an agent to read `SPEC/gate-discipline.md` before skipping a gate: `SPEC/gates.md` §"Gate discipline — read before skipping a gate" (kept the heading and descriptive paragraph, dropped the "Load it when you are about to argue…" directive, repaired the now-dangling "here the trigger, there the content" clause in the adjacent Standing-rule paragraph) and `SPEC/procedures/ft-task.md`'s "Before skipping a gate, read…" paragraph (removed outright). `gate-discipline.md` itself is untouched and remains reachable from five other locations. `SPEC/gates.md` 20851 → 20093 bytes; `SPEC/procedures/ft-task.md` 36864 → 36074 bytes — both shrank, both stay well under their `docs/CONTEXT-BUDGET.md` caps (25,000 / 38,000), so that ledger needed no update. `docs/AGENT-NEUTRALITY.md`'s `--fast`/`-f` site-count row was checked and confirmed unaffected (heading-level granularity, heading kept). No tests apply (prose-only SPEC edit); `/code-review` (medium) returned no findings. `touches:` reconciliation: `git diff --name-only` = `SPEC/gates.md`, `SPEC/procedures/ft-task.md` — matches declared `touches:` exactly.

**Window-start SHA for CORE-660:** `f8c44275438cba0d7ad96bb2afb0bb442c57c4bb` (repo HEAD at CORE-659's start, commit "docs: CORE-664 — spec-section-extract"). CORE-660 should count the shared skip-path inline marker (`✅ Closure complete; committing autonomously`, from `SPEC/gates.md` §"Conditional skip rule") across tasknotes archived after this SHA to measure what the decay window actually observed.

**Archived:** 2026-09-22
