---
title: README mirror fixes
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-EPIC-420, CORE-411, CORE-383]
---

# CORE-420.2 | README mirror fixes

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-420]] · [[CORE-411]] · [[CORE-383]]

## 🎯 Goal

Bring `README.md`'s three drifted mirror citations back in sync with their
sources: the closed-task counter + as-of date, the `templates/` roster line
(vs `SPEC.md:55`), and the manual-path section range (vs `docs/MIGRATION.md`).

## ✅ Acceptance

- [x] `README.md:22-23` cites the recomputed closed-task count and a matching as-of date, both derived from `.flowtron/tasknote/archive/` per `/ft-release` §7.1's Standing README task-counter check
- [x] `README.md:255` templates roster names `subagent-probe`, matching `SPEC.md:55`
- [x] `README.md:57` manual-path citation reads `§1.1–1.7`, matching `docs/MIGRATION.md`'s actual manual-path range (§1.1 Add submodule … §1.7 Verify)
- [x] Sibling stale citations resolved per the scope decision recorded in Discovery Notes (fix-in-place or filed follow-up — no silent leave-behind) — all five fixed in place
- [x] Doc-drift sweep run across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Recompute count + date range from the archive (both §7.1 commands)
- [x] Edit `README.md:22-23` (counter + range end + as-of)
- [x] Edit `README.md:255` (add `subagent-probe` to the roster)
- [x] Edit `README.md:57` (`§1.1–1.6` → `§1.1–1.7`)
- [x] Apply the confirmed sibling-mirror decision
- [x] Verify: re-grep each fixed string against its source of truth

## 🔗 Related

- [[CORE-EPIC-420]] — parent epic: release-surface-sync (mirrored surfaces drift between releases)
- [[CORE-411]] — filed the Standing README task-counter check into `/ft-release` §7.1 after the same line drifted
- [[CORE-383]] — established the README quickstart's "not using Claude Code?" escape hatch that carries the `§1.1–1.6` citation

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three drifted citations verified present in `README.md`
  today; each source of truth confirmed to have moved past it. Purely
  mechanical text substitution, no contract change.

- [x] Read relevant source files — `README.md` (lines 22-23, 57, 255),
  `SPEC.md:55`, `docs/MIGRATION.md` (headings §1.0–§1.7),
  `claude/skills/ft-release/SKILL.md:359-367` (the §7.1 counter-check contract),
  `templates/` directory listing. Read set narrow; no probe needed.

- [x] **Best Practices Review** — `N/A` — documentation-only edits; no code,
  module boundaries, or dependency direction in scope.

- [x] **Archive skim** — `grep -l` over `.flowtron/tasknote/archive/*/*.md` for
  the counter and the `§1.1–1.6` string. Findings logged below.

- [x] **Drift check** — all three cited targets verified against current files;
  one numeric drift found (see below). PLAN.md line and `SPEC/epic.md`
  child-placement contract re-read, not recalled.

- [x] Asked clarifying questions — sibling-mirror scope confirmed with the
  operator (see Discovery Notes).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Verified state of the three in-scope targets:**

| Target | Current | Source of truth |
|---|---|---|
| `README.md:22-23` | `**606 tasks**` … `between 2026-04-28 and 2026-08-08 (as of 2026-08-08)` | `find .flowtron/tasknote/archive -name "*.md" \| wc -l` → **624**; `**Archived:**` range → `2026-04-28` … `2026-08-09` |
| `README.md:255` | `…(full, micro, starter, sidequest) plus spec, loop-heartbeat, and audit-overlay templates…` | `SPEC.md:55` — `…plus spec, loop-heartbeat, audit-overlay, and subagent-probe templates…`; `templates/` on disk holds `subagent-probe-template.md` |
| `README.md:57` | `the manual path (§1.1–1.6)` | `docs/MIGRATION.md` §1.1 Add submodule → §1.7 Verify; §1.7 is part of the manual path |

**Drift found (numeric).** The PLAN.md line cites "620 at audit time"
(2026-08-08). Live count is **624** — the CORE-419 cohort closed since. Not a
plan contradiction: the ticket's instruction is *recompute*, and 620 is a
timestamped observation, not a target. Executing against the live value.

**Counter self-reference.** This tasknote archives in the same atomic closure
commit that lands the README edit, so the committed tree will hold **625**
archived tasknotes. Writing 624 would ship a README that is already off-by-one
against the very command it tells readers to run. Writing **625** makes the
committed state self-consistent. Date range end and as-of both become
**2026-08-09** (this note's `Archived:` date equals the current max, so the
range end does not move again).

**Archive skim:**

- `CORE-411` — filed the Standing README task-counter check into `/ft-release`
  §7.1 precisely because §5's version-string grep never covered this line. The
  check exists; it just has not run since the last cut. Confirms the counter
  fix is mechanical substitution, not a contract question.
- `CORE-416.N` — epic audit that re-surfaced the same counter line.
- `CORE-193` — scoped `docs/MIGRATION.md:10`'s `CLAUDE.md` requirement to the
  Quick path; the `§1.1–1.6` phrasing on that line dates from there.

**Sibling mirrors (scope decision).** The two citation classes are each
mirrored in files the ticket does not name:

- `§1.1–1.6` (stale, same fix): `docs/MIGRATION.md:10`, `:16`, `:23`;
  `docs/AGENT-NEUTRALITY.md:53`. Verified `/ft-new-project` Step 8 *is* the
  Verify step, so §1.1–1.7 is correct for the two "wrapped in a single
  command" citations as well.
- templates roster missing `subagent-probe` (stale, same fix):
  `claude/skills/ft-flowtron/SKILL.md:73`.

Both are one-token edits of the identical drift class this epic exists to
close, and `docs/AGENT-NEUTRALITY.md` + `README.md` are both on the
AI-referenced-docs list. Leaving them stale would mean the epic's own
mirror-pair theme survives its own fix. Raised with the operator at the
Phase 1→2 gate.

**Operator decision:** fold all five sibling citations into this task
(`docs/MIGRATION.md` ×3, `docs/AGENT-NEUTRALITY.md` ×1,
`claude/skills/ft-flowtron/SKILL.md` ×1). Scope widens from 1 file to 4;
the fix class and verification are unchanged.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — each edit matched the phrasing already used at its
  source of truth verbatim (`SPEC.md:55` for the roster, `docs/MIGRATION.md`'s
  own §1.1–1.7 heading span for the range), so no new phrasing was invented.

- [x] **Minimal refactor gate** — `N/A` — text substitution only; no structure,
  no code, nothing deferred.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, documentation-only.

**Implementation Notes:**

Eight one-line substitutions across four files (9 insertions / 9 deletions):

| File:line | Change |
|---|---|
| `README.md:22-23` | `**606 tasks**` → `**625 tasks**`; `and 2026-08-08 (as of 2026-08-08)` → `and 2026-08-09 (as of 2026-08-09)` |
| `README.md:57` | manual path `(§1.1–1.6)` → `(§1.1–1.7)` |
| `README.md:255` | roster → `spec, loop-heartbeat, audit-overlay, and subagent-probe templates` |
| `docs/MIGRATION.md:10` | `manual §1.1–1.6 path` → `§1.1–1.7` |
| `docs/MIGRATION.md:16` | `manual steps in §1.1–1.6` → `§1.1–1.7` |
| `docs/MIGRATION.md:23` | `walks through §1.1–1.6` → `§1.1–1.7` |
| `docs/AGENT-NEUTRALITY.md:53` | `manual path §1.1–1.6` → `§1.1–1.7` |
| `claude/skills/ft-flowtron/SKILL.md:73` | roster → `…audit-overlay, and subagent-probe templates` |

**Corroboration found mid-execution.** `docs/MIGRATION.md:46` — a line neither
the ticket nor Discovery flagged — *already* read `follow §1.1–1.7 manually
below`. The file was internally inconsistent with itself: one citation correct,
three stale. Independent confirmation that §1.7 is the right manual-path end,
and a clean illustration of the epic's theme (a mirror updated in one place and
not its siblings). Left as-is; it was already correct.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, no code changed
  (markdown prose only; `viz/` untouched).

- [x] Ran lint/type-check on changed code — `N/A`, no code changed.

- [x] **Quality assertions** — `N/A` for the code-facing clauses; the
  documentation clause is the deliverable itself and is verified below by
  exhaustive re-grep rather than assertion.

- [ ] (frontend) Asked the user for visual confirmation — `N/A`, no frontend
  surface touched.

**Testing Notes:**

Verification is a repo-wide re-grep for each stale string, excluding
`/archive/` (write-once historical records):

```sh
grep -rn --include='*.md' "1\.1–1\.6\|1\.1-1\.6" . | grep -v "/archive/"
grep -rn --include='*.md' "loop-heartbeat, and audit-overlay" . | grep -v "/archive/"
grep -rn --include='*.md' "606 tasks\|2026-08-08 (as of" . | grep -v "/archive/"
```

All three return **zero live hits**. Remaining matches are exactly two
intentional classes:

1. This tasknote's own Discovery table and subtask list, which quote the
   before-state as evidence.
2. `.flowtron/PLAN.md:149` — `CORE-365`'s `## Completed` description, a
   historical record of an earlier roster edit. Not a live citation; left alone.

Counter cross-check: `find .flowtron/tasknote/archive -name "*.md" | wc -l`
returns 624 pre-archive, becoming **625** when this tasknote lands in the same
closure commit — matching the number written to `README.md:22`.

`git diff --stat`: 4 files changed, 9 insertions(+), 9 deletions(-).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts below

| Doc | Verdict |
|---|---|
| `README.md` | **updated** — counter + as-of date (`:22-23`), manual-path range (`:57`), templates roster (`:255`) |
| `SPEC.md` | no change — `:55` is the roster's source of truth and was already correct |
| `docs/MIGRATION.md` | **updated** — three stale `§1.1–1.6` citations (`:10`, `:16`, `:23`); `:46` was already correct |
| `claude/AGENTS-snippet.md` | no change |
| `codex/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |
| `docs/AGENT-NEUTRALITY.md` | **updated** — `:53`'s `README.md` escape-hatch row cited `§1.1–1.6` |
| `docs/PLATFORMS.md` | no change |
| `claude/CAPABILITIES.md` | no change |
| `docs/AGENT-COMPAT.md` | no change |
| `docs/EXTERNAL-AGENTS.md` | no change |
| `docs/WORKTREES.md` | no change |

The "no change" verdicts are grep-backed, not asserted: the three repo-wide
scans in Testing Notes cover every `*.md` outside `/archive/`, so any stale
citation in an unlisted doc would have surfaced.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Resynced eight drifted citations across four docs so flowtron's public-facing
surfaces agree with the sources they mirror: the README's closed-task counter
(606 → 625, as of 2026-08-09), the `templates/` roster (now names
`subagent-probe`, matching `SPEC.md:55`), and the adoption manual-path range
(§1.1–1.6 → §1.1–1.7, matching `docs/MIGRATION.md`'s actual heading span).

Scope widened from the ticketed one file to four at the Phase 1→2 gate:
Discovery found the same two stale strings mirrored in `docs/MIGRATION.md` ×3,
`docs/AGENT-NEUTRALITY.md` ×1, and `claude/skills/ft-flowtron/SKILL.md` ×1.
Fixing only the README would have left the epic's own drift theme alive inside
its own fix, so the operator confirmed folding all five in. Cost was five
additional one-token edits; verification was unchanged.

**Evidence.** 4 files, 9 insertions / 9 deletions, all single-line text
substitution — no code, no contract change, no structural edit. Verified by
three repo-wide `grep -rn --include='*.md'` scans (one per stale string,
`/archive/` excluded), each returning zero live hits; remaining matches are
this tasknote's own before-state evidence and one `## Completed` historical
line. Counter cross-checked against `/ft-release` §7.1's own command:
`find .flowtron/tasknote/archive -name "*.md" | wc -l` yields 625 once this
note lands in the same commit, matching what `README.md:22` now claims.

**Refactors:** none made, none deferred — nothing structural was in scope.

**Documentation verdict:** documentation *is* the deliverable; sweep table
above carries per-entry verdicts, four updated and ten unchanged.

**Maintainability effect.** Two things a newcomer reads first — the README's
credibility number and its "not using Claude Code?" escape hatch — now point at
the truth, and `docs/MIGRATION.md` no longer contradicts itself four lines
apart. The counter fix is a one-cut patch by design: `/ft-release` §7.1's
standing check recomputes it every release, and it drifted only because that
check had not run since the last cut. The manual-path and roster fixes are
durable until the underlying section list or `templates/` dir changes again —
which is exactly what sibling [[CORE-420.5]] exists to make detectable, by
enumerating these mirror pairs in the release drift sweep.

**Archived:** 2026-08-09
