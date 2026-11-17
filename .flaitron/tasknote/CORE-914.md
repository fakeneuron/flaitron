---
title: fleet-clean-line
status: starter
tags: [fleet, scope]
created: 2026-11-17
touches:
  - SPEC/scope-boundaries.md
---

# CORE-914 | fleet-clean-line

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-11-17)
Source: Grok Task Notes/FLT-G001 Fleet end-of-run summary line repos checked and clean starter tasknote.md (FLT-G001), read at fakeneuron/flaitron@a4f2a683

## 🌱 Starter context

_Captured 2026-11-17 by `/tasknote-intake` from note FLT-G001 (filed by Code Master on the operator's voice go, 2026-11-16 6:15 AM ET) — promote to full tasknote at `/ft-task` checkout._

### Why this exists

After a Fleet pass, emit **one compact line** listing the repos that were checked and came back clean, and store it where the next pass reads it. The next pass skips re-scanning those repos **for that run only**. It is **not time-based**: a same-day recheck still scans.

**Possible cross-app standard: Natabula to consider adopting.** No separate Natabula note is filed for that.

**Public repo.** fakeneuron/flaitron is public: its checkout and done markers leave out `drive_id:` and any Drive link, and no commit or `Source:` line carries the note's Drive ID. Cite the note as `FLT-G001` only.

**What exists today (read-only, 2026-11-16).**

- **fakeneuron/flaitron @ `a4f2a683`.** flaitron keeps no fleet run state. `SPEC/scope-boundaries.md` §"What flaitron does NOT provide" puts operator-side fleet maintenance outside flaitron. The one carve-out is `tools/update-adopters.mjs` (pin bumps across adopters, local commits only). Per-repo loop state is `.flaitron/LOOP-LOG.md` (heartbeat template `templates/loop-heartbeat-template.md`, contract `SPEC/loop.md`), which is per project, not per fleet pass.
- **The Fleet runner is caobunga's `caobunga fleet` (CBN-312)** in fakeneuron/caobunga-private @ `dd57b133` (2026-11-15):
  - `backend/caobunga/fleet.py` spawns one `caobunga run <slug>` per enabled registered project and prints one receipt after every child exits (`backend/caobunga/fleet_output.py`): a row per project (`id`, `exit`, `meaning`, `tasks run`, `commits`, `tier`, `duration`, `next action`) plus a tally.
  - That receipt is printed only. `fleet.py` says so: "no resume state: a re-run spawns again and `run`'s own exit 3 skips a repo with nothing eligible."
  - Run state lives in `$CAOBUNGA_HOME` (default `~/.caobunga/`; `docs/CONTRACT.md` (its On-disk layout section)): `invocations/{stamp}-{random}.yaml`, `runs/{id}/{stamp}-{task_id}.yaml`, `status/{id}.md`, `logs/`, under the `lock` file.
  - `.flaitron/specs/fleet-unattended-drain.md` (draft, 2026-09-29) already asks to "Persist a batch summary" and for resume that "reevaluates committed evidence and readiness".

**Feasibility.** Feasible; small. One new write of a few hundred bytes at the end of a fleet pass, and one read at the start of the next, both inside the runner's own state home. **But the runner is not in flaitron** (D1). In flaitron itself the change would breach `SPEC/scope-boundaries.md` unless flaitron adds a third carve-out.

### Solution shape

**Line format (one line, UTF-8, space-separated `key=value`):**

```
fleet-run run=<run_id> at=<YYYY-MM-DD HH:MM ET> clean=<repo>@<sha7>,<repo>@<sha7> findings=<repo>@<sha7>,... v=1
```

- `run`: the fleet pass's invocation stamp (caobunga's `compact_utc`, e.g. `20261116T111500123Z`).
- `at`: ET wall time, for people only; never used for skipping.
- `clean`: each repo checked with nothing eligible and nothing found, with its main HEAD SHA at check time.
- `findings`: each repo that ran work, parked, failed or was refused, with its HEAD SHA. These are never skipped.
- `v=1`: format version.

**Storage:** in the runner's state home, beside its other run state, not in any repo's git tree. If caobunga is the target: `$CAOBUNGA_HOME/fleet/last.line` (atomic temp-file plus `os.replace`, under the existing `lock`), plus `$CAOBUNGA_HOME/fleet/{run_id}.line` as history. If flaitron is kept: a gitignored file under the operator's working tree, `.flaitron/fleet-last.line`, never committed (it is a public repo).

**Consumption ("for that run only"):**

- The next pass reads `last.line` once at start. A repo is skipped only when it is in `clean=` **and** its current main HEAD equals the recorded SHA.
- The line applies to **the immediately next pass** or a resume of the same `run` id, then it is superseded. The next pass writes its own line at the end, listing only what it checked itself.
- A skip is printed in the receipt as `skipped (clean in <run_id>, HEAD unchanged)`, so it is visible.
- A same-day recheck (an explicit `--full` flag, or a second pass after the one that consumed the line) scans everything. Time never decides a skip.

**Failure mode: always fall back to a full scan.** Missing file, unreadable or malformed line, unknown `v`, a `run` that is not the latest pass, a HEAD that differs, or a repo not in the line: scan that repo (or all of them). Never fail the pass because of the line.

**Plan (from the note):**

1. **Settle D1 (target repo) with the operator.** No code before that. *Check:* D1 recorded.
2. **Write the line at the end of a pass** (format above, atomic write under the runner's lock; history copy per run id). *Check:* a fixture pass with two clean repos and one with findings writes exactly one line that parses back to the same sets and SHAs.
3. **Read and apply it at the start of the next pass** (skip only clean plus same HEAD; print each skip). *Check:* tests cover HEAD unchanged (skipped), HEAD moved (scanned), repo with findings (scanned), and a second consecutive pass (scans everything; the line was superseded).
4. **Fallback.** *Check:* tests for missing, empty, malformed, wrong-version and stale-run-id lines all produce a full scan and exit codes unchanged from today's.
5. **`--full` (or equivalent) to ignore the line.** *Check:* with the flag, every enabled repo is scanned.
6. **Docs:** the runner's contract (caobunga `docs/CONTRACT.md` (its On-disk layout section) and the `fleet` paragraph, or the flaitron equivalent) names the file, the format and the fallback. *Check:* `rg -n "fleet-run run=" docs/` finds the format once.
7. **Close** with a done marker `.flaitron/grok-done/FLT-G001.md`, omitting `drive_id:` and any Drive link (public repo). Pushing needs the operator's go.

### Files to touch (preliminary survey — drift-check at promotion)

- `SPEC/scope-boundaries.md` — a third carve-out, only if D1 keeps the work in flaitron.
- The runner, its tests and its contract doc — in whichever repo D1 picks (caobunga-private: `backend/caobunga/fleet.py`, `backend/caobunga/fleet_output.py`, `docs/CONTRACT.md`).

### Explicitly out of scope

- A Natabula "last-pass clean line" convention for its own sweeps — flagged only (D6).
- Any time-window skip rule — the ask is explicitly not time-based.

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| (none) | — | All note decisions are open below. |

### Acceptance that decides it

- One line per fleet pass in the agreed place and format; the next pass skips only clean repos whose HEAD is unchanged, and prints each skip.
- A second pass, `--full`, or any missing/stale/malformed line gives a full scan.
- Tests in plan steps 3–5 pass; contract doc updated.
- Closed by a done marker; in this public repo it has no `drive_id:` and no Drive link.

### Open at promotion (Phase 1 should resolve)

- **D1 — Target repo:** fakeneuron/flaitron (as filed) or fakeneuron/caobunga-private (where `caobunga fleet` and its run state live)? Lean (Code Master): retarget to caobunga-private (would become a CBN-G note) — the runner, its receipt and `$CAOBUNGA_HOME` are there, its draft spec already asks for a persisted batch summary, and flaitron's scope boundary rules out fleet tooling. If flaitron is kept, the work must be a new carve-out recorded in `SPEC/scope-boundaries.md`.
- **D2 — Line format:** key=value line / JSON line / YAML file? Lean: key=value line, `v=1` — one grep-able line as asked; easy to parse.
- **D3 — Storage:** runner state home / repo working tree / committed file? Lean: runner state home, never committed — no git noise, nothing in a public tree.
- **D4 — Skip rule:** clean + same HEAD / clean only / time window? Lean: clean plus same HEAD, next pass only — a moved HEAD forces a rescan, and nothing is time-based.
- **D5 — Failure mode:** full scan / fail the pass / warn and skip? Lean: full scan, silently correct, with a one-line note in the receipt.
- **D6 — Cross-app standard:** Natabula adopts a "last-pass clean line" convention / not now? Lean: flag only; Natabula to consider once this ships.
- **D7 — Code Lawyer:** needed / not needed? Lean: not needed (repo-internal tooling; 00 AGENTS §7), unless the line is ever published publicly.

### Related

- FLT-G001 — source note; claim marker `.flaitron/grok-checkout/FLT-G001.md`.
- NAT-G001 (done-marker closure rule), #67 / NAT-599 (grok-sweep tool), NAT-G013 (00 INDEX trim) — related Grok notes, all outside this repo.
- caobunga-private `.flaitron/specs/fleet-unattended-drain.md` — draft spec whose "Persist a batch summary" overlaps (D1).
