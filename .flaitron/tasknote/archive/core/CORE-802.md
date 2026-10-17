---
title: Adopter-owned audit decisions file for /ft-audit
status: completed
tags: [audit, adopter]
created: 2026-10-17
due:
related-tasks: [CORE-721]
touches:
  - claude/skills/ft-audit/SKILL.md
  - templates/audit-overlay-template.md
  - docs/MIGRATION.md
  - SPEC/layout.md
  - SPEC/plan-filing.md
  - docs/CONTEXT-BUDGET.md
  - codex/skills/ft-audit/SKILL.md
  - .flaitron/PLAN.md
---

# CORE-802 | Adopter-owned audit decisions file for /ft-audit

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-721]]

## 🎯 Goal

Give `/ft-audit` memory between runs: each run reads the adopter-owned
`.flaitron/audit-decisions/<domain>.md` before its passes and suppresses
findings that match a settled entry. Its write step asks how each dropped
finding should be bucketed and appends the by-design and won't-fix ones in
the locked one-line format, committing them with the filing. The overlay
template, MIGRATION §1.2.1 and `SPEC/layout.md` document the file as the home
for settled-decision lists that forks used to paste into skill bodies.

## ✅ Acceptance

All paths repo-relative; `S` = `claude/skills/ft-audit/SKILL.md`.

- [x] §1 gains a read step: every run reads every `.flaitron/audit-decisions/*.md` (revised from own-file-only at review round 2, operator choice); subject + location matching; an entry stops suppressing when its `Revisit if:` holds, the cited code changed since the entry was recorded, or it is older than 6 months — `grep -q 'audit-decisions/\*.md' S && grep -q '6 months' S`
- [x] The locked entry line is carried verbatim — `grep -qF "— <by-design | won't-fix>: <why>. Source: <TASK-ID> (YYYY-MM-DD). Revisit if: <trigger>." S`
- [x] §4 Summary names each matched entry instead of only counting them — `grep -q 'Settled, not re-reported' S`
- [x] §5 write-step confirmation asks each dropped finding's bucket (by-design / won't-fix / not-now) with a proposed `Revisit if:`, offers to reopen any suppressed entry, routes a `general` decline to the domain file covering its location, and removes or rewrites a reopened entry in the same commit — `grep -q 'not-now' S && grep -q 'reopen' S`
- [x] §5 commit: the pre-check covers the decisions file; staging and post-stage verification recognize decisions-file hunks; a decline-only run commits the append alone — `grep -q 'chore: audit record decisions' S SPEC/plan-filing.md` (both files hit)
- [x] §6: Subroutine-safe reads but never writes the decisions file; the fork-install carve-out's "one write outside PLAN.md" no longer contradicts the append — `judgment` (prose consistency across two §6 bullets)
- [x] Overlay template points settled decisions at the decisions file, not `## Deltas` — `grep -q 'audit-decisions' templates/audit-overlay-template.md`
- [x] MIGRATION §1.2.1 documents the file, migrating a fork's settled list in (fixed-item history left out), and full-copy forks gaining the steps only on re-reconcile — `grep -q 'audit-decisions' docs/MIGRATION.md` + `judgment` for coverage
- [x] `SPEC/layout.md` adopter tree lists `audit-decisions/` — `grep -q 'audit-decisions/' SPEC/layout.md`
- [x] Drift checks pass (budgets, Pair Q citations, final newlines) — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] `S` §1: insert step 5 "Load settled decisions" (old 5→6, 6→7); matching + three reopen conditions; Source fill for audit-written entries
- [x] `S` §4: Summary line listing matched entries
- [x] `S` §5 step 1: bucket ask + proposed `Revisit if:` + reopen offer; step 2: pre-check extended to the decisions file; step 3: append (locked format, `general` routing, reopened-entry rewrite); step 5: staging, post-stage recognition, decline-only commit
- [x] `S` §6: Subroutine-safe + fork-install carve-out wording
- [x] `SPEC/plan-filing.md` §"Filing commits": pathspec bullet + message-table row
- [x] `templates/audit-overlay-template.md`: decisions-file pointer
- [x] `docs/MIGRATION.md` §1.2.1: decisions-file paragraph + fork migration
- [x] `SPEC/layout.md`: adopter tree entry
- [x] Run drift checks

## 🔗 Related

- [[CORE-721]] — audit-overlay-home: the thin overlay this builds on (predecessor)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/ft-audit` still has no cross-run memory (no `audit-decisions` reference anywhere in the repo); the starter's motivation holds.

- [x] Read relevant source files — `S` (all), overlay template, MIGRATION §1.2.1, `SPEC/layout.md`, `SPEC/plan-filing.md` §"Filing commits", `codex/skills/ft-audit/SKILL.md`, `docs/CONTEXT-BUDGET.md`

- [x] **Best Practices Review** — procedure in flaitron, data in the adopter (dependency points one way: the skill reads an optional adopter file, never the reverse). The contract lives once in `S`; template, MIGRATION and layout point at it rather than restate it. The Codex wrapper only points at `S`, so it needs no edit.

- [x] **Archive skim** — `archive/core/` (README row confirmed): 62 notes cite `S`; no prior note mentions an audit decisions file. Load-bearing: [[CORE-721]] (overlay moved to tracked `.flaitron/audit-overlay/`, runs by reference → inherits this on its own); `S` measured 28,024 there, now 18,398 of the 33,000 cap. Only §5 step-3 citations come from outside `S` (passes/*.md), so inserting §1 step 5 breaks nothing.

- [x] **Drift check** — every cited section exists as the starter describes (§1 step 4 rubric load, §5 single write-step `AskUserQuestion`, §5 step 2 pre-check, step 5 post-stage verification, §6 Subroutine-safe). PLAN line matches. One conflict the starter missed: §6's fork-install carve-out calls itself "the one write this skill may make outside `.flaitron/PLAN.md`" — must be reworded. The new commit message also needs a row in `SPEC/plan-filing.md`'s message table → added to `touches:`.

- [x] Asked clarifying questions — resolved: subject + location matching; `general` routes declines by location; read set initially "`general` reads all, domain runs only their own" (**superseded in Phase 3**: every run reads every file); Summary **lists** matched entries (not just a count); the write step offers to reopen any suppressed entry; auto-reopen on `Revisit if:` / changed path / **entries older than 6 months** (operator asked for balance: "don't want to be too strict on previous audit decisions… balance between redoing futile work and ensuring a thorough audit"); full-copy forks gain it on re-reconcile; `/ft-audit-repo` seeding **dropped**, no follow-up filed. Assumption: an audit-written entry fills `<TASK-ID>` with the attribution `<slug>`, since a decline has no ticket. (The first draft used `<slug> Finding #N`; review round 1 #8 dropped the per-run number.) **Revised in Phase 3 (review round 2 #7, operator choice):** every run reads every decisions file. Per-domain files decide only where an entry is written.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

Starter block absorbed into the spec sections (original in git history at
`2e14974f`). The locked entry format is carried verbatim because at least one
adopter pre-creates files in this shape before the release:

> ```markdown
> # Audit decisions — <domain>
>
> > Settled `/audit <domain>` outcomes. Read before the passes; a finding that
> > matches an entry is not reported unless its "Revisit if" condition holds.
>
> - **<subject>** (`<path or symbol>`) — <by-design | won't-fix>: <why>. Source: <TASK-ID> (YYYY-MM-DD). Revisit if: <trigger>.
> ```

**Locked at filing:** the decisions live in the adopter repo, one file per
domain at `.flaitron/audit-decisions/<domain>.md`, created lazily (an absent
file means no settled decisions). Each entry is one line. Only by-design and
won't-fix go in; fixed and not-now findings stay out. The write step asks for
the bucket and never infers it. A reopened entry that becomes a ticket is
removed or rewritten in the same commit. Subroutine runs read the file and
never write it. Out of scope: fleet migration of existing forks,
`/ft-audit-repo` seeding, and any machine-parsed format.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `S`'s existing numbered §1 / §5 steps and plan-filing's message table; no new shape

- [x] **Minimal refactor gate** — no refactor; §1 steps 5–6 renumbered to 6–7 (no citations outside `S`, checked in Discovery)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: prose contract, no executable code; drift checks are the mechanical guard

**Implementation Notes:**

_Final shape after five review rounds (the round log in Testing Notes records what changed along the way):_

- `S` §1 step 5 (new): every run reads every decisions file; verbatim entry format; subject + location matching; reopen triggers checked only on matched entries (`Revisit if:`, cited code changed since the commit that last wrote the entry's line (`git blame`; `git log -L` for a symbol; uncommitted edits too), more than 6 months old; when unsure, reopen); `Reopens settled decision:` line; unmatched entries left alone (prune by hand).
- `S` §4 Summary: `Settled, not re-reported (ask to reopen):` line.
- `S` §5 step 1: zero findings still skips the section (the operator reopens by asking); reopen offer; a follow-up ask for buckets + reopened ticket lines; an unanswered bucket counts as not-now. Step 2: a dirty or untracked decisions file sets `auto-commit = false`; a decisions-only filing skips the PLAN reading. Step 3: append, `general` routing (scope → passes → `general.md`), `Source: <slug>`, reopened line rewritten in full or removed, never duplicated. Step 5: staging, recognized hunks, decisions-only commit, no commit when nothing was written.
- `S` §6: Write-tickets rule names the decisions dir; fork-install carve-out reworded to "outside PLAN.md and audit-decisions/"; Subroutine-safe forbids the write and keeps the read.
- `SPEC/plan-filing.md`: pathspec bullet + message row. Overlay template: one paragraph steering settled findings away from `## Deltas`. MIGRATION §1.2.1: one paragraph, plus "~70-line" → "~80-line" (template now 78 lines because of this task's paragraph). `SPEC/layout.md`: tree entry.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: markdown only, nothing under `viz/` or `tools/` changed

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` (the markdown lint surface) → 0

- [x] **Verification receipt** — see Testing Notes; the contract lives once in `S`, and the other four files point at it rather than restating it

- [x] **External review** — `/code-review medium` × 9 rounds on the working-tree diff (rounds logged below); every blocker fixed, and each note fixed or dispositioned with a reason. The operator chose to close after round 9's fixes.

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (`S` = `claude/skills/ft-audit/SKILL.md`):

- `grep -q 'audit-decisions/\*.md' S && grep -q '6 months' S` → 0
- `grep -qF "— <by-design | won't-fix>: <why>. Source: <TASK-ID> (YYYY-MM-DD). Revisit if: <trigger>." S` → 0
- `grep -q 'Settled, not re-reported' S` → 0
- `grep -q 'not-now' S && grep -q 'reopen' S` → 0
- `grep -q 'chore: audit record decisions' S && … SPEC/plan-filing.md` → 0
- `grep -q 'audit-decisions' templates/audit-overlay-template.md` → 0
- `grep -q 'audit-decisions' docs/MIGRATION.md` → 0 (+ judgment: covers the file, migrating a fork's settled list with fixed history left out, and full copies gaining it on re-reconcile)
- `grep -q 'audit-decisions/' SPEC/layout.md` → 0
- `bash tools/drift-checks.sh` → 0 (all 20 checks ok; `S` at 21,543 of 33,000)
- §6 judgment: the Write-tickets rule, the fork-install carve-out and Subroutine-safe all name the decisions dir consistently

**External review, round 1** (`/code-review medium`, working-tree diff only, no commits yet). 10 findings:

- #1 **blocker**: the bucket ask sat inside the same prompt that decides the drops → fixed: a follow-up `AskUserQuestion` after drops and reopens are named.
- #2 **blocker**: a decline-only commit dropped accumulated PLAN filings → fixed: it stages PLAN.md when the pre-check recorded them.
- #4 **blocker**: a reopened entry re-dropped as not-now got its date refreshed (not-now → suppression) → fixed: not-now removes the entry; only by-design/won't-fix rewrites the date.
- #3 note: plan-filing reading 1 now points at `/ft-audit`'s dirty-decisions-file skip → fixed.
- #5 note: "changed since" made concrete (cited symbol or lines, `git log --since=<date> -p -- <path>`) → fixed.
- #6 note: `general` routing tie-break (the domain whose passes would raise it) → fixed.
- #7 note: zero-findings runs no longer block on a prompt; a reopened entry's ticket line is shown before writing → fixed.
- #8 note: `Source:` uses the stable `<slug>` instead of the per-run `Finding #N` → fixed.
- #9 note: entries whose path or symbol no longer exists are removed at step 3 → fixed.
- #10 note: plan-filing re-wrap → fixed.

Blockers → back to Phase 2. Phase 3 re-ran from the top: all verify commands → 0, `bash tools/drift-checks.sh` → 0.

**External review, round 2.** 10 findings:

- #1 **blocker**: an inline-fix-only run took the decisions-only commit branch → fixed: that branch is keyed on "only decisions-file changes, no ticket row, no inline fix".
- #2 **blocker**: an all-not-now run would make an empty or mislabeled commit → fixed: nothing written means no commit.
- #3 note: the `--since` same-day edge → fixed: `--since='<date> 23:59:59'`.
- #4 note: a path-only or symbol-only entry vs the reopen check → fixed: a symbol locates its file first; path-only means any edit.
- #5 note: `(gone)` entries → fixed: marked in the Summary and removed at step 3.
- #6 note: routing with unfilled scopes → fixed: falls back to the domain whose passes would raise it.
- #7 note: cross-domain re-raise → **operator chose that every run reads every file** (design revision).
- #8 note: an untracked decisions file → fixed: "modified or untracked" sets `auto-commit = false`.
- #9 note: exception sat in the "Index" reading → fixed: moved to its own paragraph after the readings.
- #10 note: wrap → fixed.

Phase 3 re-ran: verify commands → 0, drift-checks → 0.

**External review, round 3.** 8 findings, **no blockers**, all notes fixed:

- #1: `(gone)` cleanup on a zero-findings run → the operator clears it by asking.
- #2: uncommitted edits → `git diff HEAD -- <path>` added to the reopen check.
- #3: MIGRATION now says to commit a hand-made decisions file.
- #4: an inline fix also removes a reopened entry.
- #5: a moved path reopens instead of counting as `(gone)`.
- #6: "Two readings" now says `/ft-audit` adds a third.
- #7: the tasknote's `Source:` note corrected.
- #8: MIGRATION's reopen wording aligned with `S`.

Verify commands → 0, drift-checks → 0, `S` at 22,605.

**External review, round 4.** 9 findings. Several came from pruning sub-rules added in rounds 1–3, so I simplified rather than adding more rules:

- #2 **blocker**: an entry that reopened on its own had an unclear lifecycle (risk of duplicate lines) → fixed: one rule for every reopened entry — a reopened finding is a finding like any other, and its line is rewritten in place or removed, never duplicated.
- #1 note: `--since` end-of-day hid same-day commits → now `--since='<date> 00:00'`, erring toward a visible reopen.
- #3, #4, #7 notes: the `(gone)` machinery (zero-findings cleanup, stale entries, cross-file pre-check) → **`(gone)` dropped entirely**, reversing the round-1 #9 fix. An entry that matches nothing suppresses nothing; prune by hand.
- #9 note: the git check ran on every entry → now runs only on entries that match a candidate finding.
- #5 note: a `<domain>` placeholder inside the template's `## Deltas` block → path written without angle brackets.
- #6 note: an abandoned follow-up ask → an unanswered bucket counts as not-now; the commit authorization covers the follow-up.
- #8 note: "This file" → "The decisions file".

Phase 3 re-ran: verify commands → 0, drift-checks → 0, `S` at 22,828.

**External review, round 5.** 9 findings:

- #1 **blocker**: the round-4 `(gone)` removal merged §4 item 2 into item 1 (missing newline) → fixed; §4 has 4 items again.
- #2 **blocker**: a re-dropped reopened entry only refreshed its date, leaving a fired `Revisit if:` that reopens forever → fixed: the line is rewritten with the new verdict, *why*, `Revisit if:`, `Source:` and date.
- #3 note: `--since` same-day counted the recording commit itself → the change check now runs from the commit that last wrote the entry (`git log -S`), with a `--since` fallback for an uncommitted entry.
- #4 note: foreign PLAN edits blocked a decisions-only commit → a decisions-only filing skips the PLAN reading and stages only decisions files.
- #5 note: `general`-run commits name `general`, not the target domain file → no change: the subject names the run, and the staged paths name the files.
- #6 and #7 notes: stale tasknote notes → Implementation Notes rewritten to the final shape; superseded Discovery claims marked.
- #8 note: the `docs/CONTEXT-BUDGET.md` ledger row read 18,398 → 23,093 (live ledger; the other rows match disk) → `touches:` widened.
- #9 note: no prompt to reopen on a zero-findings run → the Summary line now reads `Settled, not re-reported (ask to reopen):`. Not blocking on clean runs keeps round 3 #7's tradeoff.

Phase 3 re-ran: verify commands → 0, drift-checks → 0, `S` at 23,093.

**External review, round 6.** 10 findings:

- #1–#3 **blockers**: the round-5 `git log -S` lookup misses in-place rewrites, can match another entry's subject, and breaks on an apostrophe → **reverted** to the entry's own date (`--since='<date> 00:00'`). A rewrite stamps today's date, so re-drops are covered. A same-day edit reopens, which is the visible error, accepted.
- #4 **blocker**: an unanswered bucket would delete a reopened entry → fixed: an unanswered reopened entry keeps its line unchanged.
- #5 note: MIGRATION's date wording → now matches the date rule; migrated entries are dated the day they're re-confirmed.
- #7 note: reopen-on-request stated twice → one statement.
- #8 note: the frontmatter description now names `.flaitron/audit-decisions/`.
- #6 note (repeat of round 5 #5) and #9 note (subroutine callers see the settled line in the inline report and own the reopen decision) → no change.
- #10 note: `touches:` already widened at round 5; PLAN.md is written at closure.

Phase 3 re-ran: verify commands → 0, drift-checks → 0, `S` at 23,007 (ledger re-sorted).

**External review, round 7.** 9 findings:

- #1 **blocker**: the date-only window (`--since='<date> 00:00'`) contains any commit made earlier on the entry's day, so that entry reopens on every later run → fixed: the anchor is `git blame` of the entry's own line (the exact commit that wrote it; an in-place rewrite moves it). This also fixes #2, a same-day re-drop. An uncommitted entry falls back to the date.
- #5 note: the symbol rule had no mechanism → `git log -L :<symbol>:<path> <sha>..HEAD`.
- #7 and #8 notes: the third reading was restated in plan-filing → plan-filing now points at `S` §5 step 2 as the single owner.
- #3 and #4 notes (zero-findings reopen prompt, subroutine reopen path) → no change; repeats of tradeoffs already recorded at rounds 3 and 6.
- #6 note: routing is now organization only → no change; route-by-location is the operator's pick and keeps domain files coherent.
- #9 note: a stale byte count in the round-5 log → no change; it was accurate when logged.

Phase 3 re-ran: verify commands → 0, drift-checks → 0, `S` at 23,178.

**External review, round 8.** 9 findings:

- #1 **blocker**: the not-now wording contradicted itself (removing a reopened entry's line is a write, but the run skipped the commit) → fixed: "a *new* not-now drop writes nothing"; no commit only when nothing at all was written.
- #2 **blocker**: `<sha>..HEAD` excluded code that landed in the recording commit → fixed: `<sha>^..HEAD`, which errs toward a one-time visible reopen.
- #3 note: a new file's header is now a recognized hunk.
- #5 note: a failing `git log -L` (symbol renamed or deleted) counts as changed.
- #7 note: MIGRATION gives migrated entries `Source:` = the settling task, or `migrated`.
- #9 note: the Codex wrapper's description now names the decisions dir (`touches:` widened).
- #4 note: the code block stages PLAN.md unconditionally → no change; the prose directly below covers the decisions-only case.
- #6 note: repeat of the zero-findings tradeoff → no change.
- #8 note: a generic "own paths clean" SPEC reading would change every filing motion → out of scope, no change.

Phase 3 re-ran: verify commands → 0, drift-checks → 0, `S` at 23,360.

**External review, round 9.** 7 findings plus one cosmetic:

- #1 **blocker**: SPEC plan-filing's canonical post-stage list didn't recognize decisions-file lines → fixed: the list now names them.
- #5 note: the SPEC authorization prose now covers decisions-file writes.
- #4 note: root-commit blame → `HEAD`.
- Cosmetic: the settled line now reads `<path or symbol>`.
- #3 note: including `<sha>` reopens an entry once when the same commit also carried an inline fix to the cited file → no change. This is the deliberate round-8 trade; it reverses round 6 #3, and the two oscillate. The visible error was chosen.
- #2 note: a dirty decisions file also holds back ticket commits → no change; same tradeoff as round 2 #8 (never commit over foreign decisions edits).
- #6 note: zero-findings prompt → no change; repeat of the round-3 tradeoff.
- #7 note: the commit subject names the run's domain → no change; repeat of round 5 #5.

Verify commands → 0, drift-checks → 0, `S` at 23,409.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/MIGRATION.md`: updated (§1.2.1 paragraph, "~80-line"). No change to `README.md`, `AGENTS.md`, `SPEC.md`, the four `*/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md` or `docs/VISION.md`: none describes `/ft-audit`'s run procedure or the adopter `.flaitron/` tree.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — see Final Summary

- [x] **Learnings** — `N/A` for the always-loaded layer. Process note: a prose-contract task under repeated `/code-review` rounds keeps surfacing finer edge cases. Each sub-rule added to fix a note became the next round's blocker (the `(gone)` pruning, the `-S` anchor). Simplifying beat accreting rules.

**Final Summary:**

`/ft-audit` now has memory between runs. Every run reads `.flaitron/audit-decisions/*.md` and holds back a finding that matches a settled entry (same subject, same location). It names each held-back entry in the Summary as `Settled, not re-reported (ask to reopen)`. An entry reopens when its `Revisit if:` holds, when it is more than 6 months old, or when the cited code changed since the commit that wrote it (`git blame` anchor, `git log -L` for symbols, uncommitted edits too). At the write step, a follow-up ask buckets each dropped finding as by-design, won't-fix or not-now. The first two are appended in the locked one-line format, a reopened entry's line is rewritten in place or removed, and the writes commit with the filing (`chore: audit record decisions — <domain>` when they're the only writes). Subroutine runs read and never write.

**Changed files (8 + PLAN):** `claude/skills/ft-audit/SKILL.md` (§1 step 5, §4, §5 steps 1/2/3/5, §6, description), `SPEC/plan-filing.md` (message row, pathspec, pre-check pointer, post-stage recognition, authorization prose), `templates/audit-overlay-template.md`, `docs/MIGRATION.md` §1.2.1, `SPEC/layout.md`, `codex/skills/ft-audit/SKILL.md` (description), `docs/CONTEXT-BUDGET.md` (ledger 18,398 → 23,409 of the 33,000 cap).

**Verification:** all 10 Acceptance verify commands → 0; `bash tools/drift-checks.sh` → 0 (20 checks); no viz or tools code changed. External review: 9 rounds, all blockers fixed.

**Design changes from the starter (all operator-approved):** every run reads every file (not own-domain only); matched entries are listed, not counted; the 6-month staleness window; reopen at the write step; `/ft-audit-repo` seeding dropped with no follow-up filed.

**`touches:` reconciliation:** declared 9; changed 8 + this note. `.flaitron/PLAN.md` changes in the closure flip. No refactors.

**Maintainability:** the contract has one owner (`S`); plan-filing, the template, MIGRATION and layout point at it. Adopters can now delete pasted settled-decision lists from full-copy forks, which may let some forks move back to the thin overlay.

**Archived:** 2026-10-17
