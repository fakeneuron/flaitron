---
title: gate-discipline-trim
status: completed
tags: []
created: 2026-09-22
due:
related-tasks: [CORE-659, CORE-661]
touches:
  - SPEC/gate-discipline.md
  - SPEC/gates.md
  - docs/GATE-DISCIPLINE.md
  - docs/CONTEXT-BUDGET.md
  - docs/AGENT-NEUTRALITY.md
  - README.md
  - SPEC.md
blocked-by:
  - CORE-659
---

# CORE-660 | gate-discipline-trim

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-659]]

## 🎯 Goal

Trim `SPEC/gate-discipline.md` to the failure modes the CORE-659 decay window
actually observed, moving the rest to a `docs/` reference, without disturbing
the posture semantics `SPEC/gate-postures.md` owns.

## ✅ Acceptance

- [x] Decay window carries enough independent runs to read — 34 archive paths added since `f8c44275` (`git log --diff-filter=A … | sed | sort -u | wc -l` → 34). Park recorded 1, the control. No numeric N was stored at the park; this `/ft-task` resume is the read. The marker string appears only in `archive/core/CORE-659.md`, inside the counting instruction, not as an emitted closure line.
- [x] `SPEC/gate-discipline.md` materially smaller — `wc -c SPEC/gate-discipline.md` → 4,686 (was 16,077)
- [x] Moved material lands in `docs/GATE-DISCIPLINE.md` — `test -f docs/GATE-DISCIPLINE.md` → 0
- [x] No dangling inbound reference — live `gate-discipline` mentions outside `archive/` resolve to `SPEC/gate-discipline.md`, `docs/GATE-DISCIPLINE.md`, or a roster name. The three section headings remain.
- [x] `docs/AGENT-NEUTRALITY.md` 3-site count — `judgment`: no heading dropped (`## Rationalizations`, `## Red Flags`, `## Refused carve-outs` still present), so the row was not edited. The pre-existing duplicated `post-closure.md` clause on that row stays out of scope.
- [x] `SPEC/gate-postures.md` posture semantics untouched — `git diff --stat SPEC/gate-postures.md` empty. §"Refused carve-outs" still resolves from the deep link.
- [x] `README.md` layout line and `SPEC.md` roster still name the module, and the README docs index links the new reference — `judgment`: prose rosters, checked by read

## 🧩 Subtasks

> Deferred with the park — populated so the resume path has concrete steps.

- [x] Re-measure the decay window (`git log` since `f8c44275`); if still thin, re-gate with the operator before trimming
- [x] Count the skip-path marker (`✅ Closure complete; committing autonomously`) across tasknotes archived in the window — CORE-659's stated measurement
- [x] Classify the 22 §"Rationalizations" rows and 22 §"Red Flags" bullets (the parked note said 24; the file has 22): none recurred in the window record, so all moved
- [x] Create `docs/GATE-DISCIPLINE.md` with the moved material; add it to `README.md`'s `docs/` layout list
- [x] Trim `SPEC/gate-discipline.md` to the retained material plus a pointer to the new reference
- [x] Repair the inbound references in the Discovery Notes table; re-measure `docs/CONTEXT-BUDGET.md` lazy-module figure (the parked `:161` drifted)
- [x] Verify `SPEC/gate-postures.md`'s deep link into §"Refused carve-outs" still resolves (line drifted 206 → 196)

## 🔗 Related

- [[CORE-659]] — `blocked-by:` predecessor; opened the decay window (start SHA `f8c44275`) this task reads
- [[CORE-661]] — follow-up; adds a standing decay pass to `/ft-audit`'s `passes/context.md`
- [[CORE-665]] — filed by this task's 🛠️ gate; widened `SPEC/blocked.md` §"Phase 1 entry" to admit the attended Phase-1 park this note sits in, and re-coded its `park-reason:` to `drift`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** PLAN.md line 17 is current, unchecked, under `## Medium`;
  `git status --porcelain` clean at start; no tasknote or archive file existed
  — fresh scaffold. But the task's stated evidence base does not exist: the
  decay window CORE-659 opened has observed **one** task run, CORE-659's own.
  "Trim to the failure modes the decay window actually observed" is not
  executable against n=1. Operator selected a park over a provenance-based
  re-scope, a literal zero-observation trim, or a De-scope (AskUserQuestion,
  2026-09-22), and pre-decided `docs/GATE-DISCIPLINE.md` as the destination for
  the moved material when the task does resume.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A`: no execution reached. The intended
  edit is a prose split of one SPEC module into a `docs/` reference; the
  module-boundary question (what stays a loaded contract vs. what becomes a
  reference) is the task's substance, not a side concern, and is deferred with
  the task.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one
  — `archive/core/` confirmed against the README table (12 notes cite
  `gate-discipline`); read CORE-659 in full, logged below.

- [x] **Drift check** — see Discovery Notes. The task description's own premise
  drifted: the decay window it reads is one run long. Two smaller drifts also
  logged (`docs/CONTEXT-BUDGET.md:183`, `docs/AGENT-NEUTRALITY.md:40`).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — asked via AskUserQuestion; answers recorded in the Relevance Assessment and Discovery Notes.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**The decay window is one run long.** CORE-659 recorded window-start SHA
`f8c44275` (`docs: CORE-664 — spec-section-extract`). Measured at this task's
start:

- `git log --oneline f8c44275..HEAD` → a single commit, `9d502321`
  (`docs: CORE-659 — gate-discipline-decay-window`).
- `git log --diff-filter=A f8c44275..HEAD -- .flowtron/tasknote/archive/` → one
  tasknote archived, `archive/core/CORE-659.md` — the window-opening task
  itself, which ran `[unattended]` (fast-mode, skip branch).

So the window has observed zero *independent* runs under the removed triggers.
CORE-659's Final Summary asks CORE-660 to "count the shared skip-path inline
marker (`✅ Closure complete; committing autonomously`) across tasknotes
archived after this SHA" — that count is 1, and its one sample is the
experiment's own control. The window was opened and read on the same day.

**What the trim would target, when it resumes.** `SPEC/gate-discipline.md` is
16,077 bytes in three sections: §"Rationalizations" (22-row excuse/refutation
table), §"Red Flags" (24 observer-symptom bullets), §"Refused carve-outs" (the
CORE-495 Q1 / CORE-503 visual-baseline argument, recorded in full). Only a
minority of rows cite a concrete motivating incident (InvisiPaw FE-64 on
paper-complete; CORE-432.2 on next-move-before-SHA; CORE-495/503 on the
carve-out; CORE-386/388 on the standing rule); the rest restate
`gates.md` / `gate-postures.md` clauses in excuse form. That provenance split
is the natural trim axis and needs no window — it was offered and not chosen.

**Destination pre-decided:** `docs/GATE-DISCIPLINE.md`, a new dedicated `docs/`
reference (operator answer, 2026-09-22), rather than folding into
`docs/PHILOSOPHY.md` or `docs/HARNESS-SURVEY.md`.

**Inbound references a trim must repair** (all outside `archive/`):

| File | Line | What it asserts |
|---|---|---|
| `SPEC.md` | 323 | Roster entry — "the discipline" |
| `README.md` | 293 | `SPEC/` module list |
| `SPEC/gate-postures.md` | 206 | Deep link into §"Refused carve-outs" |
| `docs/AGENT-NEUTRALITY.md` | 40 | Counts **3 sites** = the three section headings; a trim that drops a section changes this count |
| `docs/CONTEXT-BUDGET.md` | 161 | Measured size `16,077` (unbudgeted — no cap row) |
| `docs/CONTEXT-BUDGET.md` | 183 | "loaded when about to skip a gate" |
| `docs/HARNESS-SURVEY.md` | 61 | Overkill finding #1 — the trim's motivation |

**Pre-existing drift found, not fixed here** (no deliverable in this task, and
neither is CORE-660's to own):

1. `docs/CONTEXT-BUDGET.md:183` calls `gate-discipline.md` "loaded when about
   to skip a gate" as the reason it earns no budget row. CORE-659 removed both
   live skip-path triggers, so nothing loads it at that moment any more. The
   conclusion (no budget row) still holds — more strongly than before — but the
   stated reason is stale.
2. `docs/AGENT-NEUTRALITY.md:40` contains a duplicated clause: "the whole of
   `SPEC/post-closure.md` (1 site — …)" appears twice verbatim in the same row.

**Contract conflict surfaced at the Phase 1→2 boundary.**
[`SPEC/blocked.md`](../../SPEC/blocked.md) §"Phase 1 entry (Re-scope path)"
reserves `status: blocked` for mid-Phase-2 parking and prescribes, for a
Phase-1 blocker: add `Blocked by [[ID]]` to the PLAN.md line, **delete the
just-scaffolded tasknote**, halt — on the rationale that "a Phase 1 blocker has
no Phase 2 work to preserve." The operator's selected disposition is a park
(`status: blocked` + `park-reason: dependency`), which the attended Phase-1
path does not admit.

That rationale does not hold on this task. There is no Phase 2 work, but
Discovery produced the window measurement, the inbound-reference table above,
the provenance axis the eventual trim will use, and two pre-existing drift
findings — all of which the prescribed delete-and-halt would discard.
`blocked.md`'s own `--unattended` Phase 1→2 boundary carve-out already makes
exactly this argument ("Phase 1 *is* complete at that boundary and its
Discovery is exactly the work worth preserving") and then scopes it to
operator-less runs; this run is the attended instance of the same case.

**Resolution (🛠️ gate, operator, 2026-09-22):** park as chosen, and file the
spec gap as [[CORE-665]] rather than leave the deviation silent. This note
therefore sits at `status: blocked` from a Phase-1 verdict — a state
`SPEC/blocked.md` does not currently describe. CORE-665 decides whether the
reservation widens or whether attended runs are meant to differ.

> **Settled by [[CORE-665]] (2026-09-22, same day).** The reservation widened:
> `SPEC/blocked.md` §"Phase 1 entry" now offers park as one of two dispositions
> the operator picks at the 🛠️ gate, so this note's state is described rather
> than deviant. Its `park-reason:` was re-coded `dependency` → `drift` in that
> task's commit — §"`drift` vs `dependency`" codes a Phase-1 park by its
> verdict-stop, whatever blocker motivated it. Nothing else here changes, and
> the resume path is unaffected.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern is the CORE-535.5 / CORE-604.2 split: keep the loaded module as the home for new rows, move the historical catalog to `docs/`. Resumed by clearing `park-reason: drift — Phase 1 Re-scope; decay window opened by CORE-659 has observed 1 run, and that run is its own control`. Window recount: 34 added archive paths since `f8c44275`; not thin, so no re-gate. The parked "24 red flags" was a miscount; the file has 22 rows and 22 bullets, and the diff of first lines against `HEAD` is empty. None of those items recur as an incident in the window notes, so the whole catalog moved. §"Refused carve-outs" stayed in full because `SPEC/gate-postures.md` deep-links the reasoning. The three headings stayed so `docs/AGENT-NEUTRALITY.md`'s 3-site count does not move. Scope sentence and the "recognizing your own draft sentence" mechanism stayed after review. A header-only table remains under §"Rationalizations" so a new row has a shape to copy. `SPEC/gate-postures.md` was not edited. Tests N/A — prose only.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: prose-only diff, no test suite covers it

- [x] Ran lint/type-check on changed code — `N/A`: no code changed

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A`: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Structural half: `N/A` for duplication/dead code — the edit is a prose split. The scope fence and the mechanism sentence were restored so the loaded module does not lose a boundary the catalog rows never carried.

Verification receipt:

- archive-add count since `f8c44275` → 34 paths, exit 0
- `wc -c SPEC/gate-discipline.md` → 4686, exit 0 (was 16077)
- `test -f docs/GATE-DISCIPLINE.md` → 0
- `git diff --stat SPEC/gate-postures.md` → empty, exit 0
- live `gate-discipline` grep outside `archive/` → every hit names a file that exists
- `wc -c SPEC/gates.md` → 20444 (cap 25000); `wc -c SPEC.md` → 47007 (cap 53000)

External review (read-only sub-agent, working-tree diff): blockers none. Notes, all fixed in this run:

- Restored the deleted scope fence and the "recognizing your own draft sentence" sentence.
- Left a header-only §"Rationalizations" table so a new row has columns to copy.
- Corrected the marker claim: the one hit is CORE-659 quoting the count instruction, not an emitted closure line.
- Recorded the `SPEC.md` +84 and `gates.md` +112 stamp drift in `docs/CONTEXT-BUDGET.md` instead of refreshing the cold-start sum.
- Dropped the unrequested `harness-survey` token from the README `docs/` one-liner.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

The CORE-659 decay window is 34 archived tasknotes deep and recorded no independent gate-skip excuse, so the 22-row / 22-bullet catalog moved from `SPEC/gate-discipline.md` (16,077 → 4,686 bytes) to `docs/GATE-DISCIPLINE.md`. The SPEC module keeps the three section homes, a header-only table for the next new row, the scope fence, and the full §"Refused carve-outs" text `SPEC/gate-postures.md` deep-links. `SPEC/gate-postures.md` is untouched.

Doc-drift sweep: `README.md` updated (docs index bullet + `docs/` layout one-liner). `SPEC.md` roster updated. `docs/AGENT-NEUTRALITY.md` no change (headings kept; the duplicated post-closure clause stays). `docs/CONTEXT-BUDGET.md` updated (lazy-module size 16,077 → 4,686, stale "loaded when about to skip a gate" reason replaced, stamp aside for the `gates.md` +112 and `SPEC.md` +84 this task left unrefreshed in the cold-start sum). No change: `AGENTS.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`. `SPEC/gates.md` is outside the sweep set and was updated so its sibling blurb and standing rule match the move.

`touches:` reconciliation: declared `SPEC/gate-discipline.md`, `SPEC/gates.md`, `docs/GATE-DISCIPLINE.md`, `docs/CONTEXT-BUDGET.md`, `docs/AGENT-NEUTRALITY.md`, `README.md`, `SPEC.md`. `docs/AGENT-NEUTRALITY.md` was declared and not edited. Closure also stages `.flowtron/PLAN.md` and this tasknote's archive move.

Learnings: `N/A`. CORE-659 already recorded that this window's counting method is specific to the trio.

**Archived:** 2026-10-02
