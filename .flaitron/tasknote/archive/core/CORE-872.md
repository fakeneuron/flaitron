---
title: size-cap-renames
status: completed
tags: []
created: 2026-11-06
due:
touches:
  - SPEC/gate-postures.md
  - claude/skills/ft-task/unattended-mode.md
  - docs/GLOSSARY.md
related-tasks:
  - "[[CORE-843]]"
  - "[[CORE-850.5]]"
  - "[[CORE-869.5]]"
---

# CORE-872 | size-cap-renames

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-843]] [[CORE-850.5]] [[CORE-869.5]]

## 🎯 Goal

Make the `--unattended` 400-line size cap rename-aware: size counts a rename by its content delta through one named `-M` git invocation per surface (paths keep `--no-renames`), and Phase 1 estimates size under the same rule so an over-cap row parks `out-of-scope` at the Phase 1→2 exit gate rather than after the work is done.

## ✅ Acceptance

- [x] Drift checks pass, context budget included — `bash tools/drift-checks.sh`
- [x] A scratch-repo replay of a pure `git mv` of ~300 lines counts 0 under the named size command — `d=$(mktemp -d) && git -C $d init -q && seq 1 300 > $d/a && git -C $d add a && git -C $d -c user.name=t -c user.email=t commit -qm i && git -C $d mv a b && test "$(git -C $d diff -M --numstat HEAD | awk '{s+=$1+$2} END {print s+0}')" = 0`
- [x] `unattended-mode.md` Size step names `git diff -M --numstat HEAD` and `git show -M --numstat --pretty=format: <sha>`, and the paths paragraph keeps `--no-renames` — `grep -q 'git diff -M --numstat HEAD' claude/skills/ft-task/unattended-mode.md && grep -q 'git show -M --numstat --pretty=format: <sha>' claude/skills/ft-task/unattended-mode.md && grep -q 'git diff --no-renames --name-only HEAD' claude/skills/ft-task/unattended-mode.md && ! grep -q 'no-renames --numstat' claude/skills/ft-task/unattended-mode.md`
- [x] Unstaged-move guidance: stage moves with `git mv` / `git add -N`, else the move counts in full — `grep -q 'git add -N' claude/skills/ft-task/unattended-mode.md`
- [x] Phase 1 size estimate: `unattended-mode.md` records `Size estimate:` in Discovery Notes and the conversion-map scope row names the Step 4 exit gate — `grep -q 'Size estimate:' claude/skills/ft-task/unattended-mode.md && grep -E '^\| \*\*Scope guardrail\*\*' claude/skills/ft-task/unattended-mode.md | grep -q 'Step 4'`
- [x] `SPEC/gate-postures.md` §"Scope guardrails" Size bullet states the rename rule and the Phase 1 estimate — `awk '/^### Scope guardrails$/{a=1;next} a&&/^### /{a=0} a' SPEC/gate-postures.md | grep -q 'rename' && awk '/^### Scope guardrails$/{a=1;next} a&&/^### /{a=0} a' SPEC/gate-postures.md | grep -q 'Phase 1'`
- [x] `docs/GLOSSARY.md` **touches** entry names the rename rule — `grep '^\*\*touches\*\*' docs/GLOSSARY.md | grep -q 'rename'`

## 🧩 Subtasks

- [x] `claude/skills/ft-task/unattended-mode.md` §"Scope guardrails" step 2: swap `--no-renames --numstat` for `-M --numstat` (working tree + per-iteration `git show`); state that a rename row's destination faces the skip rules; add the stage-your-moves rule
- [x] `unattended-mode.md`: add the Phase 1 size estimate (Discovery Notes `Size estimate:` line; over 400 → park `out-of-scope` at the Step 4 exit gate); update the conversion-map scope row's columns
- [x] `SPEC/gate-postures.md` §"Scope guardrails": Size bullet gains the rename rule + Phase 1 estimate; trim in place to stay ≤ 22,000 bytes
- [x] `docs/GLOSSARY.md` **touches** entry: name the rename rule
- [x] Run Acceptance commands; drift checks; External review

## 🔗 Related

- [[CORE-843]] — related-decision: leaves non-note dirt uncommitted at a park (why a late park stalls the drain).
- [[CORE-850.5]] — predecessor: added §"Scope guardrails".
- [[CORE-869.5]] — parallel-safe-with: near-cap trims to the same `SPEC/gate-postures.md`; whichever lands second re-measures headroom.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Every cited surface still reads `--no-renames --numstat` and the 400-line cap with no rename rule; the marscharts FE-541 over-park reproduces on the current text.

- [x] Read relevant source files — `SPEC/gate-postures.md` §"Scope guardrails" + gate table, `claude/skills/ft-task/unattended-mode.md` §"Conversion map" + §"Scope guardrails", `docs/GLOSSARY.md` **touches**, `SPEC/blocked.md:149`, `claude/CAPABILITIES.md:33`.

- [x] **Best Practices Review** — N/A: contract-prose edit, no code or module boundary.

- [x] **Archive skim** — `grep -l no-renames archive/core/*.md` → CORE-769.7, CORE-769.N, CORE-827, CORE-850.5, CORE-852.5. Load-bearing: CORE-850.5 pass-2 note "`--no-renames` on every diff, so a move out of scope lists its source" — the rationale was path-only, and the size side picked the flag up collaterally, so changing size reverses no decision. CORE-850.5 pass-3 also moved loop size to per-commit `git show` (kept). CORE-769.7 / CORE-827 are `update-adopters.mjs` surfaces, unrelated.

- [x] **Drift check** — Starter line refs all hold: `gate-postures.md:61` table row, `:206` Size bullet; `unattended-mode.md:62` map row, `:80` "The diff", `:83` Size step 2; `GLOSSARY.md:147`. `gate-postures.md` still 21,999 / 22,000. Not in the starter survey: `SPEC/blocked.md:149` (`out-of-scope` code row) and `claude/CAPABILITIES.md:33` name the 400 cap but not how it is counted — no edit needed, out of `touches:`. `SPEC/unattended-candidacy.md` re-confirmed: does not size rows. `SPEC/procedures/ft-task.md` names no size command (points at the contract). Plan matches its PLAN.md line.

- [x] Asked clarifying questions — operator picked all three leans (below).

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- **Scratch replay** (`git diff -M --numstat HEAD`): pure `git mv` of 300 lines → `0 0` (`--no-renames` → 300 + 300); edited move → its real delta (`0 10`); `git show -M --numstat` same; lockfile move prints `b.lock => d/b.lock`; plain unstaged `mv` → `0 290` deletion + an untracked file (counted in full by `--no-index`); after `git add -N` on the destination → `0 0`. A copy under `-c diff.renames=copies` with explicit `-M` still counts 300 — `-M` does not enable copy detection, so no copy loophole.
- **Decisions (operator, 2026-11-06):**
  1. Rename rule: content delta via `-M` at git's default 50% threshold; below it a move counts as a full delete + add (conservative).
  2. Unstaged `mv`: document — workers stage moves (`git mv` / `git add -N` the destination); the check never writes the index.
  3. Phase 1 estimate: one Discovery Notes line `Size estimate: ~N lines (rename-aware)` under `--unattended` only; over 400 → park `out-of-scope` at the Phase 1→2 exit gate; added to the conversion-map row as a Step 4 entry.
- Skip rules on a rename row (`old => new`, or `pre/{old => new}/post`) read the destination; paths still come from the `--no-renames` list, so a move's source still faces the path check.
- Starter block absorbed (default); original in git history.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the Phase 1 estimate reuses the existing park shape (`out-of-scope` code, the Step 4 exit-gate slot the `drift` row already uses) and step 2's own counting rule; no new park code or gate.

- [x] **Minimal refactor gate** — non-additive edits are budget trims only (listed below), each a restatement or narration whose owner still carries the rule.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: contract prose, no executable surface. The scratch replay (A2) plus its `--no-renames` control (600) stands in.

**Implementation Notes:**

- `claude/skills/ft-task/unattended-mode.md`: Size step 2 is now `git diff -M --numstat HEAD` / `git show -M --numstat --pretty=format: <sha>`. Added: the content-delta rule and its 50% fallback; a rename row is skipped only when **both** ends match a skip rule (round-2 review: a destination-only skip let a move to `*.lock` hide its delta); `-z` for unambiguous paths; staging moves (`git mv` / `git add -N`). New **The Phase 1 size estimate** paragraph: `Proceed` only (a `Re-scope` / `De-scope` parks `drift` first); the line goes in Discovery Notes, or the `## ⚡ Notes` log under `--micro`; the park holds no work, and the park recipe's porcelain read still decides the commit. The timing sentence points at the estimate, and the conversion-map scope row gains the Step 4 entry in both columns. The paths paragraph is untouched (`--no-renames` kept).
- `claude/skills/ft-task/SKILL.md` Step 4: an `unattended-mode = true` bullet runs the estimate before either exit branch. Without it the estimate had no hook (round-1 blocker).
- `SPEC/procedures/ft-task.md` exit gate: the same pointer for non-Claude runners. Offset by trimming Phase 1 restatements the template checkboxes and the probe template already carry ("keep only its distilled return", "Log load-bearing findings…", the probe sentence compressed). 25,805 → 25,797 / 26,000.
- `SPEC/gate-postures.md`: the Size bullet gains the rename rule; the timing sentence names the Phase 1 estimate; the matrix row reads "Diff outside `touches:`, or diff or Phase 1 estimate over 400 lines". Budget offset: the full-suite "motivating case" narration compressed to a parenthetical. Round 1's trims (re-entry clause, lone-park "either way" sentence, loop.md provenance) were all reverted after review. 21,999 → 21,998 / 22,000.
- `SPEC/blocked.md` `out-of-scope` row and `docs/EXTERNAL-AGENTS.md` step 4: name the estimate park (no work held).
- `docs/GLOSSARY.md` **touches**: a parenthetical on the 400-line cap.
- `docs/CONTEXT-BUDGET.md`: `held` ledger entries for `gate-postures.md` and `procedures/ft-task.md`. The lazy-modules figure (`gate-postures.md 21,999`) is the release-stamped snapshot (§Ledger "Measured … at v8.3.0"), so it is left for the release refresh.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs` → 0

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` (markdown: Pair Q citations, final newlines, budgets) → 0

- [x] **Verification receipt** — below; no duplicated or stale prose left (the estimate is stated once in each of SPEC and skill; the restatements were trimmed only where an owner still carries them)

- [x] **External review** — `/code-review medium` over this task's uncommitted diff, two rounds; findings below

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (final tree):

- A1 `bash tools/drift-checks.sh` → 0 (gate-postures 21,998 / 22,000; procedure 25,797 / 26,000)
- A2 scratch `git mv` replay under `git diff -M --numstat HEAD` → 0 (sum 0; the `--no-renames` control sums 600)
- A3 `-M` size commands present, `--no-renames --name-only` kept, no `no-renames --numstat` → 0
- A4 `git add -N` guidance → 0
- A5 `Size estimate:` + Step 4 in the conversion-map row → 0
- A6 gate-postures §"Scope guardrails" names rename + Phase 1 → 0
- A7 GLOSSARY **touches** names rename → 0
- `node --test tools/drift-checks.test.mjs` → 0

External review, round 1 (9 findings):
- Blocker, fixed: the estimate had no Step 4 hook → added to `SKILL.md` and the procedure.
- Blocker, fixed: the trim dropped the SPEC's "re-entry after a review blocker" → restored.
- Notes, fixed: `--micro` has no Discovery Notes → the ⚡ Notes log; ordering against `drift` → `Proceed` only; "holds only the note" overclaim → "holds no work"; `blocked.md` code row; matrix row; the lone-park "either way" sentence restored.
- Note, no change needed: the CONTEXT-BUDGET lazy-modules figure is a release-stamped snapshot.

External review, round 2 (8 findings):
- Blocker, fixed: the destination-only skip let a counted file moved to a lockfile, generated, or `.flaitron/` path hide its delta → skipped only when both ends match.
- Notes, fixed: the ledger entry was wrong → corrected; the procedure's +109 bytes had no offset → trimmed to net −8 plus a ledger entry; the loop.md provenance was lost → restored; the Implementation Notes misdescribed the diff → rewritten; the timing sentences omitted the estimate → added; ambiguous rename paths → `-z` named.
- Note, recorded: `touches:` vs diff → reconciled in the recap (attended run; `touches:` binds only `--unattended`).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/EXTERNAL-AGENTS.md` step 4: updated (caller contract names the estimate park). `claude/CAPABILITIES.md:33` ("passes 400 lines"): no change, still accurate. `SPEC.md:510`, `docs/GATE-DISCIPLINE.md:199`, `step-5-loop-mode.md:67`: no change (they name the code or the Phase 3 hook, not the counting). README §"AI-referenced docs" entries otherwise: no change.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-11-06.` stub at top of `## Completed`, tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary

- [x] **Learnings** — N/A for the always-loaded layer. Task-local lesson: on a file at its byte cap, trim narration first, never a contract clause. Both review rounds caught the trims that removed a rule.

**Final Summary:**

The `--unattended` size cap now counts a rename by its content delta (`git diff -M --numstat HEAD`, and `git show -M` per loop commit), while the path check keeps `--no-renames`. A rename row is skipped only when both ends match a skip rule, and workers stage moves so git can pair them. Phase 1 writes a `Size estimate:` line on `Proceed`; over 400 parks `out-of-scope` at the Phase 1→2 exit gate before any work, so a case like FE-541 parks clean instead of after the work is done. Both runners hook it at their exit gate.

- **Changed:** `claude/skills/ft-task/unattended-mode.md`, `claude/skills/ft-task/SKILL.md`, `SPEC/gate-postures.md`, `SPEC/procedures/ft-task.md`, `SPEC/blocked.md`, `docs/GLOSSARY.md`, `docs/EXTERNAL-AGENTS.md`, `docs/CONTEXT-BUDGET.md`.
- **`touches:` reconciliation:** declared 3. The diff adds 5 more: `SKILL.md` + procedure (exit-gate hooks, round-1 blocker), `blocked.md` + `EXTERNAL-AGENTS.md` (code meaning, caller contract), `CONTEXT-BUDGET.md` (ledger). All in service of Acceptance. An `--unattended` run would have parked here, which is the expected cost of a Re-scope found in review.
- **Verification:** A1–A7 → 0; drift self-test → 0.
- **Maintainability:** budgets net −1 byte on `gate-postures.md` and −8 on the procedure; no new park code or gate.

**Archived:** 2026-11-06

