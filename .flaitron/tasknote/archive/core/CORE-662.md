---
title: context-budget-cells
status: completed
tags: []
created: 2026-09-22
due:
related-tasks: []
touches:
  - docs/CONTEXT-BUDGET.md
---

# CORE-662 | context-budget-cells

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Collapse `docs/CONTEXT-BUDGET.md`'s `## Budgets` table "Why this number"
cells to one line each, moving the raise/lower history each cell currently
narrates out of the table (to a ledger section, or dropping it in favor of
`git log`/`git blame`).

## ✅ Acceptance

- [x] Every `## Budgets` row's third cell is a single sentence/line stating why the *current* number is sized as it is, with no embedded raise/lower narrative — `judgment` (no command distinguishes "concise" from "verbose" prose)
- [x] The CI budget-check script still parses the table — `awk '/^## Budgets$/,/^## Known over budget/' docs/CONTEXT-BUDGET.md | grep -cE '^\| \`[^\`]+\` \| [0-9,]+ \|'` returns `9` (unchanged row count)
- [x] No `[[CORE-###]]` history reference is silently deleted — each one either survives in a new history location or its removal is justified in Testing Notes
- [x] Doc still renders as a valid GFM table (each row one line, no unescaped `|`) — `judgment`

## 🧩 Subtasks

- [x] Re-read each of the 9 `## Budgets` rows and separate "why the number is what it is today" (keep, one line) from "how it got here" (raise/lower history — move)
- [x] Decide where moved history goes: a new `## Raise/lower history` section vs. dropping it in favor of `git log -p -- docs/CONTEXT-BUDGET.md` / `git blame`, per the PLAN.md line's own two options — chose a new `## Cap history` section (compact table, links preserved) over pure git-log, with git-log named for finer-grained per-commit detail
- [x] Rewrite the 9 cells
- [x] If a history section is added, verify it isn't itself unbounded growth (keep it terse — pointer-shaped, not prose-shaped) — table form, one line per surface
- [x] Confirm the CI awk/grep parser in `.github/workflows/ci.yml` still matches the row shape
- [x] Doc-drift sweep per `.flowtron/tasknote/README.md` §"AI-referenced docs" (note: `docs/CONTEXT-BUDGET.md` itself is explicitly excluded from that list per its own §"Not on the doc-drift sweep list")

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `docs/CONTEXT-BUDGET.md` §"Budgets" still has all 8 rows
  described by the PLAN line, each with a dense "Why this number" cell that
  narrates the full raise/lower history in prose (e.g. the `SPEC.md` row runs
  ~1,300 chars across five historical events). No drift — the file is exactly
  as bloated as the PLAN line implies (23,244 total chars).

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Best Practices Review.** No code/module-boundary work — `docs/CONTEXT-BUDGET.md`
is markdown prose plus one CI-parsed table. The only structural constraint is
the CI parser in `.github/workflows/ci.yml` §"Context budget", which greps rows
matching `^\| \`[^\`]+\` \| [0-9,]+ \|` (first two cells only) — the third cell's
content is free-form and unparsed, so shortening it cannot break the check as
long as the row stays a single line and columns 1–2 are untouched.

**Archive skim.** `.flowtron/tasknote/archive/core/` has ~10 prior notes
touching this file (CORE-608, CORE-629, CORE-631.N, CORE-642, CORE-654,
CORE-655, CORE-656, CORE-659, CORE-661, CORE-665, CORE-664). All are either
release-cut ledger refreshes (numbers only) or one-line "no change" mentions in
their doc-drift sweeps — none previously touched the *shape* of the Budgets
table's cells, so there's no established collapsing convention to match beyond
CORE-664's own precedent of adding a new row in the same verbose narrative
style it inherited. This task is the first to change the cell shape itself.

**Drift check.** PLAN.md line 26 and the file match exactly; no drift.

**Clarifying questions.** No clarifications needed. The PLAN line offers two
explicit dispositions for the removed history ("move raise/lower history to a
ledger section or leave it to git log") and leaves the choice to the
implementer. **Assumption:** add a compact `## Cap history` section (one table
row per surface, terse `old → new [[CORE-ID]]` deltas) rather than dropping to
git log alone. Reasoning: the removed prose is not just "how we got here" —
several cells encode forward-looking operational guidance (e.g.
`gate-postures.md`: "the next substantial posture edit should trim or extract
before it raises") and `[[CORE-xxx]]` wikilinks that other docs/tasknotes may
backlink through (this repo's wikilink convention is Obsidian-oriented
positioning, not decorative). A table row per surface stays one line each, so
it cannot regrow into the same essay problem it's replacing, while `git log`
alone would silently sever those links. Forward-looking guidance stays in the
main cell (it's "why the number is what it is *now*", not history); only the
retrospective raise/lower narrative moves.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** No existing "cap history" shape to extend in this doc —
the closest sibling is `## Ledger`, which tracks *measured sizes* refreshed at
release, a different axis from *cap changes*. Adding a new top-level `##
Cap history` section (rather than nesting it under `## Ledger`) keeps the two
concerns separate: Ledger answers "how big is it right now," Cap history
answers "when and why did the ceiling move." One table, one row per surface,
matches the Budgets table's own shape (SRP: one place per fact).

**Minimal refactor gate.** Single file, single section touched (`##
Budgets` cells rewritten, one new `## Cap history` section inserted). No
adjacent prose (`## Ledger`, `## How this is enforced`, etc.) was touched —
those are a separate concern (measured-size tracking, enforcement mechanism)
this task's PLAN line didn't scope in, even though they share the same
"dense historical prose" pattern the Ledger's own §Ledger paragraph exhibits.
Left as-is; out of scope.

**Implemented.** Rewrote all 9 `## Budgets` "Why this number" cells to one
line each: current rationale plus any forward-looking operational guidance
(e.g. `gate-postures.md`'s "next substantial edit should trim or extract"),
with the retrospective raise/lower narrative and its `[[CORE-xxx]]` links
moved into the new `## Cap history` table (one row per surface, terse `old →
new [[CORE-ID]]` chain), placed between `## Budgets` and `## Known over
budget`. A closing line points to `git log -p -- docs/CONTEXT-BUDGET.md` and
the cited tasknote archives for full per-commit provenance, satisfying the
PLAN line's "or leave it to git log" option for anything finer-grained than
the table captures.

**No tests.** Markdown-only change to a doc; the repo ships no test that
reads `docs/`. Verification is the CI parser re-run (Testing Notes) plus a
manual check that every `[[CORE-xxx]]` link present before the edit is still
present somewhere in the file.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

**Not applicable.** No targeted test suite and no lint/type-check exist for
`docs/`; the repo ships no test that reads markdown docs. `npm --prefix viz`
and `node --test tools/` cover paths this diff doesn't touch.

**Verification receipt.**

| # | Command | Result |
|---|---|---|
| 1 | Every `## Budgets` cell is one line, current-rationale only — `judgment` | Pass: 9/9 cells rewritten to one physical line each; each states the current sizing rationale (plus any forward-looking operational guidance, kept because it's not history); retrospective raise/lower narrative moved out |
| 2 | `awk '/^## Budgets$/,/^## Known over budget/' docs/CONTEXT-BUDGET.md \| grep -cE '^\| \`[^\`]+\` \| [0-9,]+ \|'` | `9` (unchanged row count) |
| 3 | Full CI `Context budget` step logic (copied verbatim from `.github/workflows/ci.yml`, run locally against the edited file) | exit `0`, no `OVER BUDGET` lines |
| 4 | No `[[CORE-xxx]]` silently deleted | 11 links dropped: `[[CORE-395]] [[CORE-496]] [[CORE-504]] [[CORE-536]] [[CORE-558.2]] [[CORE-558.3]] [[CORE-558.4]] [[CORE-571]] [[CORE-606]] [[CORE-610.3]] [[CORE-617]]` — all were fine-grained per-commit *measurement* citations supporting a stated range (e.g. "a substantial edit runs +524 to +892 chars ([[CORE-504]] +892 · …)"), never a cap-change event itself. Every cap-*change* event's link (`CORE-535.1/.2/.5, CORE-555, CORE-558.5, CORE-604.2, CORE-607, CORE-608, CORE-613, CORE-622.2, CORE-664`, etc.) survives, now in the new `## Cap history` table. The new §"Cap history" closing line points to `git log -p -- docs/CONTEXT-BUDGET.md` for the dropped per-commit detail, which is the PLAN line's own "leave it to git log" option applied to exactly this class of citation |
| 5 | GFM table well-formedness — pipe-count uniformity per table (`awk` range \| `grep '^\|'` \| `awk -F'\|' '{print NF-1}'` \| `sort \| uniq -c`) | `11 4` (Budgets: header+sep+9 rows × 3 cols) and `11 3` (Cap history: header+sep+9 rows × 2 cols) — no row broke into a wrong column count, so no cell smuggled an unescaped `\|` |

**Structural quality.** No duplication introduced (each surface's rationale
and its history now live in exactly one place, not two); no dead prose (every
sentence moved, not left half-duplicated); no unexplained complexity; no
public-surface growth (no new budgeted row, no CI script change); the one new
heading (`## Cap history`) is itself sized to stay terse — a table, not
prose, so it can't regrow into the problem it fixes. Stale documentation
checked: `docs/HARNESS-SURVEY.md:64` ("CONTEXT-BUDGET table cells are ~1KB of
history each. → CORE-662.") is a dated, append-only survey-pass record per
that file's own stated convention ("a later pass appends rather than
rewrites, so the record shows what the field looked like when a decision was
made") — not in `.flowtron/tasknote/README.md` §"AI-referenced docs", and
correctly left as-is: it already names the task that resolved the finding, no
"done" gloss needed.

**Context budget.** `docs/CONTEXT-BUDGET.md` is explicitly `docs/`, outside
the `## Budgets`-table surfaces it itself governs, and excluded from
`.flowtron/tasknote/README.md`'s doc-drift sweep — no cap applies to its own
size. Measured anyway since it's the whole point of this task: 23,244 →
20,224 chars (**−3,020**, −13%).

**External review.** `/code-review low` returned `(none)` — zero findings.
It noted the broader diff it saw ("57 files, largely `.flowtron/` archives
and `SPEC/*.md`, plus the uncommitted `docs/CONTEXT-BUDGET.md` change") is
mostly pre-existing tasknote/SPEC markdown, not this task's work; this run's
own change is the single `docs/CONTEXT-BUDGET.md` hunk within it, and the
reviewer flagged no bug in it. Nothing to grade against `## ✅ Acceptance`,
no disposition to record.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Doc-drift sweep.** All 18 entries checked by grep for `CONTEXT-BUDGET` /
`context.budget` / `budget.table` / `byte budget`:

| Doc | Verdict |
|---|---|
| `README.md`, `AGENTS.md`, `claude/AGENTS-snippet.md` | no change — link/one-line pointer only, no quoted cell content |
| `docs/CONVENTIONS.md`, `docs/MIGRATION.md` | no change — name "the context budget check" (the CI mechanism), not any cell's prose |
| All other 13 entries (`SPEC.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`) | no change — no reference to `CONTEXT-BUDGET.md` at all |

Off-list but worth naming: `docs/HARNESS-SURVEY.md:64` ("CONTEXT-BUDGET table
cells are ~1KB of history each. → CORE-662.") is a dated survey-pass record,
append-only by that file's own convention, not on the sweep list — correctly
left unchanged; it already names this task as the fix.

**`touches:` reconciliation.** Declared one path (`docs/CONTEXT-BUDGET.md`);
`git diff --name-only` plus this tasknote's own path gives exactly that one
plus the tasknote itself. No undeclared path.

**Final Summary:** `docs/CONTEXT-BUDGET.md`'s `## Budgets` table had grown
its own bloat problem: each of the 9 "Why this number" cells packed the full
raise/lower history of that surface's cap into one essay-length line (the
`SPEC.md` cell alone ran ~1,300 chars across five historical events), on a
doc whose entire purpose is to ratchet down exactly this kind of unbounded
growth elsewhere.

Rewrote all 9 cells to state only *why the current number is sized as it is*
— current rationale plus any forward-looking operational guidance (e.g.
`gate-postures.md`'s "next substantial posture edit should trim or extract
before it raises," which is a live instruction, not history) — one line
each. Moved the retrospective raise/lower narrative into a new `## Cap
history` section: one compact table, one row per surface, terse `old → new
[[CORE-ID]]` chains, placed between `## Budgets` and `## Known over budget`.
All 22 `[[CORE-xxx]]` links that marked an actual cap-change event survive
there; the 11 that were dropped were fine-grained per-commit *measurement*
citations supporting a stated range rather than cap-change events themselves
— exactly the class of detail the PLAN line's "leave it to git log" option
covers, and the new section's closing line points there. The CI budget-check
script (`.github/workflows/ci.yml`) only parses columns 1–2 of each row, so
it's untouched and re-verified passing (exit `0`) against the edited file.

`docs/CONTEXT-BUDGET.md`: 23,244 → 20,224 chars (**−3,020**, −13%). One file,
`## Budgets` cells plus one new `## Cap history` section. `/code-review low`
over the working-tree diff returned `(none)`.

**Learnings:** `N/A` — no always-loaded surface changed; `docs/` sits
outside the sweep set and outside the budget table's own governance.

**Archived:** 2026-09-22
