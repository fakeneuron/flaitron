---
title: decay-window-restore
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-724.7, CORE-EPIC-724, CORE-683]
touches:
  - docs/GATE-DISCIPLINE.md
  - .flaitron/PLAN.md
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

# CORE-727 | decay-window-restore

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-724.7]]

## 🎯 Goal

Read the CORE-724.7 decay window (`504f160f`..HEAD) against its single restore bar, and for each of the four dropped rule groups either restore it from the window-start SHA (failure observed) or close it as permanently deleted (no failure observed).

## ✅ Acceptance

- [x] Window depth meets the bar — ≥10 tasknotes archived after `504f160f` (724.7 excluded) and ≥1 `/ft-audit` filing commit — `git log --diff-filter=A --name-only --format= 504f160f..HEAD -- .flaitron/tasknote/archive/ | sort -u | grep -vc 'CORE-724.7.md'` ≥ 10; `git show --stat 56098c97` touches `.flaitron/PLAN.md`
- [x] Each of the four groups has a recorded verdict against its restore criterion — `judgment`: evidence read, recorded in Discovery Notes with note IDs
- [x] No group restored (no failure observed), so none of the dropped text returns — `grep -qE '^## (7\. Rationalizations|8\. Red Flags)' claude/skills/ft-audit/SKILL.md` exits 1; `grep -q 'Standing rule' SPEC/gates.md` exits 1; `grep -rnE '\bDRY\b|\bSRP\b|prefer(red)? composition' SPEC.md SPEC claude/skills templates` exits 1; `grep -rnE '~ ?(15|30) min' SPEC claude/skills` exits 1
- [x] `docs/GATE-DISCIPLINE.md` records the window outcome, not a pending decision — `grep -q 'decides whether it returns' docs/GATE-DISCIPLINE.md` exits 1; `grep -q 'CORE-727' docs/GATE-DISCIPLINE.md` exits 0
- [x] CI drift checks hold — `bash tools/drift-checks.sh` exits 0

## 🧩 Subtasks

- [x] Confirm window depth against the bar
- [x] Read the window evidence for each group (probes: groups 1+2; groups 3+4 split by note range)
- [x] Record per-group verdicts
- [x] Update `docs/GATE-DISCIPLINE.md`'s window sentence to the outcome
- [x] Run Acceptance greps + drift checks

## 🔗 Related

- [[CORE-724.7]] — predecessor: opened the window, recorded the bar
- [[CORE-EPIC-724]] — parent context-diet epic (closed)
- [[CORE-660]] — precedent window read (recount closed the CORE-659 window)
- [[CORE-683]] — sibling restore row, same shape, still open

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The row's `Blocked by decay-window depth` precondition now holds (46 tasknotes archived past `504f160f`, 724.7 excluded; one `/ft-audit docs` filing commit `56098c97`), so the window is readable.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`) — 46 notes + audit commits: three read-only probes (groups 1+2; groups 3+4 split by note range)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason) — `N/A`: evidence read plus one doc sentence; no code or module boundary

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

`[medium]` satisfied: active model Opus 5.5 (heavy ≥ medium). Area `core` confirmed against the README table.

**Window depth.** `504f160f..HEAD` holds 62 commits. Tasknotes archived after the SHA: 47, or 46 with CORE-724.7 excluded (724.N through 767, one micro: CORE-742.3). Audit condition: `56098c97` (`/ft-audit docs`) filed CORE-743–750 and fixed CORE-751–765 inline. The three `/ft-audit-repo` runs (`e69dd754`, `60c629a7`, `5d651e71`) are a different skill and do not count. The bar is met, with 4.6× the required count.

**Bar** (archived [[CORE-724.7]], "Restore bar for CORE-727"): restore a group from `504f160f` only if a note, audit run, or review in the window shows the failure it guarded against. Otherwise close the window.

**Per-group verdicts** (three probes read the evidence; the closest near-miss was spot-checked by hand):

| group | verdict | evidence |
|---|---|---|
| 1. ft-audit §7/§8 | **stay deleted** | The one `/ft-audit` run (`56098c97`), checked against all five triggers. (a) Its 15 inline fixes are each one file and a few lines, inside §5's carve-out; the largest are CORE-759 (AGENTS.md, 9+/7−) and CORE-754 (7+/4−). (b) All 8 filings are docs-scoped. (c) No padding: 24 findings yielded 8 tickets plus 15 fixes. (d) Every filed row carries a dispatchable instruction, and no downstream note calls one non-actionable. (e) The subroutine run inside the CORE-767 release wrote no PLAN tickets. Near-miss: CORE-745 Re-scoped one clause that [[CORE-723]] had already shipped. That is a stale finding, not a §7/§8 failure mode. |
| 2. Gate-discipline new-row rule | **stay deleted** | Six gate-surface changes landed in the window: [[CORE-725]], [[CORE-730]], [[CORE-731]], [[CORE-733]], [[CORE-738]], [[CORE-741.2]]. No later run skipped or converted any gate they added or altered. The gate findings that did surface were reviewer catches of contract gaps (CORE-725 → filed CORE-731; CORE-730's unreachable `⏸`, fixed in-task), and each was fixed in SPEC. No real `--unattended` stop fired in the window. CORE-745's `--fast` Re-scope notice is the sanctioned matrix row, which the window did not change. |
| 3. DRY/SRP imperative | **stay deleted** | No closed window task shipped a new near-duplicate or tangled file that its own gates missed and something later caught. Every dedupe in the window (CORE-728, the 734 epic, CORE-745) removed duplication that predates `504f160f`. Duplicates added inside a diff were caught by its own review before closure: CORE-729 #6, CORE-731 (3), CORE-738 round 2, CORE-745 run 3 #9. Closest: CORE-740's review saw that `tools/drift-checks.test.mjs` repeats one function-name regex across two tests and kept it ("Not taken, accepted"). That is one literal, not a helper or section, and it was a deliberate call, so the imperative would not have changed it. |
| 4. ~15/~30-min heuristics | **stay deleted** | One micro ran (CORE-742.3) and did not escalate. No note records a mis-route or a skipped tasknote that needed one. Every window commit is a closure, a filing, an audit, or the release. Over-ceremony did occur (CORE-728, CORE-750 and CORE-766 ran as full tasknotes on one-to-two-line diffs), but the bar measures under-routing, and file count would have caught those as well as a time estimate. |

**Archive skim** (`archive/core/`): [[CORE-724.7]] (bar, restore source); [[CORE-660]] is the precedent read, where a recount closed the [[CORE-659]] window with no restore. [[CORE-683]] is a sibling restore row for a different window ([[CORE-680]]) and is not touched here.

**Drift check.** The PLAN line matches the bar in the archived note. All four groups are still absent at HEAD (Acceptance greps). One live pointer goes stale on closure: `docs/GATE-DISCIPLINE.md:19`, "[[CORE-727]] decides whether it returns."

No clarifications needed. Assumptions: the bar's "Otherwise close the window" clause is the deliverable. Closing means that no group is restored, the GATE-DISCIPLINE sentence records the outcome, and the row closes. A positive restore would have been the only reason to ask.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape — [[CORE-660]] shape: a window read closes with a recorded recount and, with no recurrence, the drop stands

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup — no refactor; one sentence edited

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: no code

**Implementation Notes:**

- No group restored. All four fail their restore criterion (Discovery table), so the bar's "Otherwise close the window" branch applies.
- `docs/GATE-DISCIPLINE.md`: the window sentence now records the outcome ("[[CORE-727]]'s read (46 tasknotes) found no later skip of a gate changed in the window, so it stays dropped") instead of a pending decision. The only other live `CORE-727` reference is the PLAN row itself.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: markdown only; drift checks are the targeted check

- [x] Ran lint/type-check on changed code — `N/A`: no code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason — `N/A`: the diff is one two-line doc sentence. The verdicts rest on three independent read-only probes, and the closest near-miss (CORE-740) was spot-checked by hand.

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`: no frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt:

- `git log --diff-filter=A … 504f160f..HEAD -- .flaitron/tasknote/archive/ | sort -u | grep -vc CORE-724.7.md` → 46 (≥10); `git show --stat 56098c97 | grep -q .flaitron/PLAN.md` → 0
- `grep -qE '^## (7\. Rationalizations|8\. Red Flags)' claude/skills/ft-audit/SKILL.md` → 1
- `grep -q 'Standing rule' SPEC/gates.md` → 1
- `grep -rnE '\bDRY\b|\bSRP\b|prefer(red)? composition' SPEC.md SPEC claude/skills templates` → 1
- `grep -rnE '~ ?(15|30) min' SPEC claude/skills` → 1
- `grep -q 'decides whether it returns' docs/GATE-DISCIPLINE.md` → 1; `grep -q CORE-727 docs/GATE-DISCIPLINE.md` → 0
- `bash tools/drift-checks.sh` → 0 (all checks ok)

Structural: one sentence replaced; no new section, heading, or citation target.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Doc-drift sweep:** `docs/GATE-DISCIPLINE.md` updated (window outcome sentence). No change: `AGENTS.md`, `README.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`. Nothing was restored, so nothing they describe changed.

**Final Summary:**

Closed the [[CORE-724.7]] decay window. It is 46 tasknotes deep, with one `/ft-audit docs` run (`56098c97`), and none of the four dropped rule groups shows the failure it guarded. All four stay deleted: `/ft-audit` §7/§8, the gate-discipline new-row rule, the DRY/SRP/composition imperative, and the ~15/~30-minute routing heuristics.

- **Evidence:** three read-only probes covered all 46 notes, the audit commit, and the six window gate-surface changes. Per-group verdicts and near-misses are in Discovery Notes. The closest near-miss, CORE-740's duplicated test regex, was reviewer-accepted on purpose and spot-checked by hand.
- **Changed:** `docs/GATE-DISCIPLINE.md` (one sentence: pending decision → outcome); `.flaitron/PLAN.md` (row → Completed stub).
- **Verification:** Acceptance greps all at expected exits; `bash tools/drift-checks.sh` → 0.
- **`touches:` reconciliation:** declared `docs/GATE-DISCIPLINE.md` and `.flaitron/PLAN.md`; the diff matches. The archive move is excluded.
- **Maintainability:** the context-diet cuts are now permanent. The restore source `504f160f` stays recorded in [[CORE-724.7]] if a later failure argues for one.
- **Signal for later, not a restore trigger:** the window showed over-ceremony (CORE-728, CORE-750 and CORE-766 ran full tasknotes on one-to-two-line diffs). The bar doesn't measure it, and no follow-up is filed.

**Learnings:** N/A. The window-read shape is already recorded in [[CORE-660]]/[[CORE-724.7]].

**Archived:** 2026-10-09
