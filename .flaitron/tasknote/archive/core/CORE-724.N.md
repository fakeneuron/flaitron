---
title: context-diet audit
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-EPIC-724, CORE-724.1, CORE-724.2, CORE-724.3, CORE-724.4, CORE-724.5, CORE-724.6, CORE-724.7]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - AGENTS.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-724.N | context-diet audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-724]]

## 🎯 Goal

Verify the completed `CORE-EPIC-724` (`context-diet`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `chore: CORE-724.N — audit CORE-EPIC-724` commit lands (no code edits; one doc-roster fix)
- [x] PLAN.md line for `CORE-724.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-724.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8, bundled in the 📦 gate) — user confirms or declines flipping `CORE-EPIC-724` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-724.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-724]] — parent epic
- [[CORE-724.1]] .. [[CORE-724.7]] — audited cohort
- [[CORE-727]] — decay-window restore row opened by .7

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-724.N`; all seven implementation children (.1–.7) closed 2026-10-07, no early-audit decision.

- [x] Read relevant source files (all seven archived cohort notes) — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — N/A: verification pass, no code or module-boundary edit; code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — self-referential (cohort notes are the archive hits); precedents they cite (CORE-EPIC-558, CORE-659/660/680) already summarized in .1 — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] No clarifications needed (full cohort, no deferred children) — Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Cohort inventory (all closed 2026-10-07):

- **.1 context-diet discovery** — five-probe inventory, filed .2–.7, Resolved scoping table (personal conventions out, emoji cues + commit conventions kept, no-provenance rules through one window).
- **.2 cold-start-trim** — SPEC.md + gates + gate-postures + post-closure 96,308 → 84,842; gates.md "Moved to" stubs retired; one home per gate rule; four caps lowered.
- **.3 lazy-module-trim** — 14 `SPEC/` modules −16,551; `SPEC/gate-discipline.md` → `docs/GATE-DISCIPLINE.md`, `SPEC/purpose-blurb.md` → `SPEC/cue-vocabulary.md` §"🎯 Purpose blurb"; tasknote-selection gets a budget row; Fan-out single-homed.
- **.4 skill-body-dedupe** — 12 skill/SOP files + new `claude/skills/ft-task/preamble.md` 258,037 → 241,291; filing motion, candidacy mirrors, post-closure and Phase 4 re-listings cut to pointers; month-block line fixed; filed [[CORE-725]].
- **.5 adopter-surface-trim** — paste-block fence −43%, template −29%, MIGRATION −16%; §1.2.2 → CONTRIBUTING, v4/v5 recipes → new `docs/UPGRADING.md`; visualizer runbook single-homed in README; KEEP IN SYNC guards named, not line-pinned.
- **.6 personal-conventions-out** — natabula / caobunga / machine paths / `~/code` prose / personal viz fixtures removed; 📡 `NAS` → `REMOTE`.
- **.7 decay-window-batch** — ft-audit §7/§8, gate-discipline new-row rule, DRY/SRP imperative, ~15/~30-min heuristics dropped; window opened at `504f160f`; [[CORE-727]] holds the restore bar.

Drift check: all cohort-cited paths resolve at HEAD `7b5cf399`; CI drift job 15/15 green before any audit edit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: verification pass; the one inline fix follows .3's own citer-repair shape — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, no code

**Implementation Notes:**

Checks run (all at HEAD `7b5cf399`, excluding archive / PLAN / PLAN-ARCHIVE / VERSION-HISTORY):

- **Retired-surface grep** — `gate-discipline.md`, `purpose-blurb`, `month-block`, `Rationalizations` / `Red Flags`, `since the window`, `Standing rule`, `<MODEL_EDGE>`, MIGRATION `1.2.2` / `Upgrading from v`, `DRY` / `SRP`, `~15/30 min`, `NAS`, natabula, caobunga, fintown/invisipaw, machine paths. Remaining hits are all legitimate: CONTEXT-BUDGET ledger history (left for `/ft-release` by .2–.5), HARNESS-SURVEY:62 (dated survey, outside the sweep set), the plan-parser fixture's month-block *archive heading* grammar, GATE-DISCIPLINE's kept main tables, PHILOSOPHY's origin story.
- **Dangling-path scan** — every `SPEC/`, `docs/`, `templates/`, `claude/skills/` `.md` path cited outside history resolves, except adopter-rubric placeholders (`docs/THREAT-MODEL.md` etc.), a ci.yml `SPEC/x.md` example, and a Completed CORE-657 row.
- **Cross-child coherence** — Pattern-survey wording agrees across SPEC.md (canonical long form), template (.5's short imperative, .7's DRY/SRP clause gone), SOP and skills; 📡 `REMOTE` consistent across cue-vocabulary, gates.md, AGENT-COMPAT, DOGFOOD; no `minutes` routing heuristic survives (.7) in SPEC, skills, snippet, README; ft-audit has no reference to its deleted §7/§8; EXTERNAL-AGENTS stable template labels (`**Final Summary:**

Audited the seven-child `context-diet` cohort. The children's work holds together: retired files and labels have no live citers left, shared contracts edited by more than one child agree, and the CI drift job is green. One stale roster in `AGENTS.md` was fixed inline, and one unfiled deferral from .5 is a follow-up candidate.

- **Fix:** `AGENTS.md` `SPEC/` roster no longer names the retired gate-discipline and purpose-blurb modules.
- **Follow-up candidate:** snippet §"Bumping" ↔ MIGRATION §"Pinning and bumping" overlap (deferred by .5, never filed).
- **Verification:** CI drift 15/15 locally, before and after; `git diff --check` clean.
- **Parent flip:** operator confirmed Yes at the 📦 gate; CORE-EPIC-724 flipped to stub form and the cohort moved to `## Completed`.
- **`touches:` reconciliation:** declared `AGENTS.md`, changed `AGENTS.md`; plus this note and `.flaitron/PLAN.md` (closure flip).`, `**Archived:**`, `**Verdict:**`, phase headings) all survive .5's template trim; SPEC.md cites only extant modules.
- **Inline fix** — `AGENTS.md:58-64` (also CLAUDE.md via symlink) still listed "gate discipline" and "the purpose blurb" among `SPEC/` modules after .3 retired both; README's roster had been repaired but this one was missed. Dropped both names (the blurb now lives under "the operator-cue vocabulary", already listed). −1 line.
- **Follow-up candidate** — `/ft-file-followup` for the `claude/AGENTS-snippet.md` §"Bumping" ↔ `docs/MIGRATION.md` §"Pinning and bumping" overlap: .5 deferred it as out of its row's scope but never filed it.
- **Not misses** — the CONTEXT-BUDGET Ledger re-measure (incl. the "—" preamble row) is already the next `/ft-release` refresh's job; the `.git/info/exclude` caobunga line in other checkouts is operator-local (.6 recorded it).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, markdown only; CI drift job is the suite

- [x] Ran lint/type-check on changed code — `git diff --check` → 0

- [x] **Verification receipt** — see Testing Notes — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — N/A: one-line roster deletion of two retired names, diff too small to grade — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no UI surface; Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- CI `drift` job, all 15 steps extracted from `.github/workflows/ci.yml` and run locally, before and after the AGENTS.md fix → 15/15 exit 0 (Pair H covers AGENTS.md §"Validation", Pair Q citation resolution, context budget).
- `git diff --check` → 0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `AGENTS.md`: stale `SPEC/` roster fixed (above). No change: `README.md` (roster + docs list already current), `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md` (counts re-done by .2/.3), `docs/PLATFORMS.md`, `claude/CAPABILITIES.md` (stamp is a version-bump check), `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md` (stable labels intact), `docs/WORKTREES.md`, `docs/VISION.md` — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A: the miss (a prose roster outside Pair Q's reach) is the README §"Accepted residual risk" shape the epic-audit sweep exists to catch — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

**Archived:** 2026-10-07
