---
title: size-cap-renames
status: starter
tags: []
created: 2026-11-06
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

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-11-06) · 🔗 [[CORE-843]] · 🔗 [[CORE-850.5]] · 🔗 [[CORE-869.5]]

## 🌱 Starter context

_Captured 2026-11-06 from adopter evidence (marscharts FE-540 / FE-541, pin v8.3.0) — promote to full tasknote at `/ft-task` checkout._

### Why this exists

`SPEC/gate-postures.md` §"Scope guardrails" → **Size** caps an `--unattended`
run at 400 lines added + deleted, but says nothing about renames. The skill
(`claude/skills/ft-task/unattended-mode.md` §"Scope guardrails" step 2) measures
with `git diff --no-renames --numstat HEAD`, so a pure `git mv` counts as a full
delete + add.

- **FE-541:** 595 counted lines, 316 of them from two content-identical
  renames (a hook + its test). Work complete and green; parked `out-of-scope`
  at closure. CORE-843 leaves non-note dirt uncommitted by design, so the park
  held 13 files and stopped the caobunga drain. Invocation record:
  `~/.caobunga/invocations/20261106T173550470Z-e611ecc9b59d45e09b867656ffed61f0.yaml`.
- **FE-540:** Discovery sized a services/ move at ~1130 lines "under
  --no-renames" and parked for a split — a clean committed park, but driven by
  the same counting rule. It shows the right *timing*: an over-cap row should
  park at Discovery, not after the work is done.

### Solution shape

- **Split the invocations.** Paths keep `git diff --no-renames --name-only HEAD`
  (a move's source must still face `touches:`). Size moves to a rename-detecting
  numstat.
- **Name one exact command per surface** so every worker measures alike: working
  tree vs `HEAD`, each `--loop` iteration's `git show … <sha>`, and untracked
  paths (`git diff --no-index --numstat /dev/null <path>`).
- **Phase 1 size estimate** in the unattended flow under the same rule; a row
  expected to exceed 400 parks `out-of-scope` at the Phase 1→2 exit gate.

### Files to touch (preliminary survey — drift-check at promotion)

- `SPEC/gate-postures.md` — §"Scope guardrails" **Size** bullet and the gate
  table row "Diff outside `touches:` or over 400 lines" (line ~61). **At
  21,999 / 22,000 bytes** (`docs/CONTEXT-BUDGET.md`) — the edit must trim in
  place.
- `claude/skills/ft-task/unattended-mode.md` — conversion-map row (~line 62),
  "The diff" paragraph (~80), Size step 2 (~83), and the Phase 1 exit gate.
- `docs/GLOSSARY.md` — **touches** entry (~line 147) names the 400-line cap.
- `SPEC/unattended-candidacy.md` — surveyed: does not size rows; re-confirm.

### Explicitly out of scope

- Changing the 400 cap itself.
- CORE-843's leave-non-note-dirt-uncommitted behavior.

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| Path check under renames | Keeps `--no-renames` | A move out of scope must not hide behind its destination (existing rationale, `unattended-mode.md` "The diff"). |
| Same rule at both points | Phase 1 estimate and closure check share one invocation | Late parks hold the tree and stall the drain; early parks are clean. |

### Acceptance that decides it

- Drift checks pass, context budget included — `bash tools/drift-checks.sh`
- A scratch-repo replay of a pure `git mv` of ~300 lines counts 0 under the named size command — `<scratch replay command, fixed at Phase 1>`

### Open at promotion (Phase 1 should resolve)

- How a rename counts. Lean: content delta via `--find-renames` at git's default threshold — a pure move is 0/0 naturally, an edited move counts its real change. Alternative: exclude only 100%-similarity renames, count everything else as today.
- Unstaged plain `mv` shows as a deleted tracked file + an untracked file, which rename detection cannot pair. Lean: document it and tell workers to stage moves (`git mv` / `git add -N`); no pairing logic.
- Where and in what shape Phase 1 records the size estimate.

### Related

- [[CORE-843]] — related-decision: leaves non-note dirt uncommitted at a park (why a late park stalls the drain).
- [[CORE-850.5]] — predecessor: added §"Scope guardrails".
- [[CORE-869.5]] — parallel-safe-with: near-cap trims to the same `SPEC/gate-postures.md`; whichever lands second re-measures headroom.
