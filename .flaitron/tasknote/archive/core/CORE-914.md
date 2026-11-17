---
title: fleet-clean-line
status: completed
tags: [fleet, scope]
created: 2026-11-17
due:
related-tasks: []
touches:
  - .flaitron/PLAN.md
  - .flaitron/grok-done/FLT-G001.md
---

# CORE-914 | fleet-clean-line

[← PLAN.md](../PLAN.md) · ✅ Completed 2026-11-17
Source: Grok Task Notes/FLT-G001 Fleet end-of-run summary line repos checked and clean starter tasknote.md (FLT-G001), read at fakeneuron/flaitron@a4f2a683

## 🎯 Goal

Retarget the fleet clean-line work (FLT-G001) to caobunga-private, where `caobunga fleet` and its run state live. flaitron's scope boundary bars fleet tooling, so flaitron itself ships no code for this.

## ✅ Acceptance

Starter criteria (verbatim). Under De-scope they are carried to caobunga-private's starter, not met here:

- [ ] One line per fleet pass in the agreed place and format; the next pass skips only clean repos whose HEAD is unchanged, and prints each skip. — N/A (De-scope: carried to caobunga-private CBN-489)
- [ ] A second pass, `--full`, or any missing/stale/malformed line gives a full scan. — N/A (De-scope: carried to CBN-489)
- [ ] Tests in plan steps 3–5 pass; contract doc updated. — N/A (De-scope: carried to CBN-489)
- [x] Closed by a done marker; in this public repo it has no `drive_id:` and no Drive link. — `test -f .flaitron/grok-done/FLT-G001.md && ! grep -qiE 'drive_id|drive\.google' .flaitron/grok-done/FLT-G001.md`

Retarget criteria (added in Phase 1, after the operator answered D1):

- [x] The caobunga-private starter carries the full starter context, with D1 recorded as settled — `test -f ~/Code/caobunga/.flaitron/tasknote/CBN-489.md && grep -q 'CBN-489' ~/Code/caobunga/.flaitron/PLAN.md && grep -q 'D1' ~/Code/caobunga/.flaitron/tasknote/CBN-489.md`
- [x] The caobunga-private filing is committed locally there, not pushed — `git -C ~/Code/caobunga log -1 --name-only`
- [x] No flaitron SPEC or code change (no third carve-out) — `git diff --name-only HEAD` lists only `.flaitron/` paths

## 🧩 Subtasks

- [x] Settle D1 with the operator: retarget to caobunga-private
- [x] Write the caobunga-private starter `CBN-489` plus its `## Medium` PLAN row, and commit locally there
- [x] Write the FLT-G001 done marker (retargeted; no `drive_id`, no Drive link)
- [x] Close CORE-914 as De-scope: PLAN stub, archive, and commit

## 🔗 Related

- (none in this repo) — the work continues as caobunga-private `CBN-489`; source note FLT-G001 (claim marker `.flaitron/grok-checkout/FLT-G001.md`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** De-scope
  **Rationale:** The fleet runner (`caobunga fleet`), its receipt, and `$CAOBUNGA_HOME` all live in caobunga-private. `SPEC/scope-boundaries.md` §"What flaitron does NOT provide" calls its two CLI carve-outs "singular exceptions, not precedents". The operator chose retarget on 2026-11-17.

- [x] Read relevant source files: `SPEC/scope-boundaries.md`; caobunga-private `backend/caobunga/fleet.py` / `fleet_output.py` (present), `.flaitron/specs/fleet-unattended-drain.md` (present)

- [x] **Best Practices Review** — N/A: no code or module-boundary work lands in flaitron

- [x] **Archive skim** — not run: the De-scope means no flaitron source paths are in scope

- [x] **Drift check** — none. caobunga-private HEAD is still `dd57b13`. Both fleet modules and the draft spec exist. scope-boundaries still lists exactly two CLI carve-outs (updater, installer). The PLAN line matches the starter.

- [x] Asked clarifying questions. The operator answered (2026-11-17): D1 → retarget to caobunga-private. The agent files the CBN starter now, committed locally in caobunga and not pushed. FLT-G001 closes here with a "retargeted" done marker. D2–D7 go to caobunga as open questions, with their leans.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared. The caobunga-private writes sit outside this repo's tree and are listed in the Subtasks.

**Discovery Notes:**

- The `[heavy]` tag carries to CBN-489 unchanged. caobunga's own `/ft-task` gate decides from there.
- No caobunga-side `grok-checkout` marker: FLT-G001's claim and done markers both stay in flaitron. CBN-489's `Source:` line names FLT-G001 and CORE-914 as the trail.

## 🛠️ Phase 2: Execution

N/A — De-scope jumps to Phase 4 closure (SPEC §"📝 Phase 1: Discovery").

## 🧪 Phase 3: Testing & Linting

N/A — De-scope; the Acceptance verify commands run at closure and are recorded in Final Summary.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change: flaitron's SPEC, docs and skills are untouched, and `SPEC/scope-boundaries.md` already states the boundary this De-scope applies

- [x] Closed — Acceptance ticked or annotated (the three runner criteria are N/A and carried to CBN-489), YAML `status: completed`, PLAN.md line → `Completed 2026-11-17.` stub at the top of `## Completed`, tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary

- [x] **Learnings** — N/A

**Final Summary:**

De-scope: the fleet clean-line (FLT-G001) belongs to caobunga-private, which owns `caobunga fleet`, its receipt and `$CAOBUNGA_HOME`. flaitron's scope boundary bars fleet tooling. The operator settled D1 on 2026-11-17.

- **caobunga-private** `d26a3db` (local, not pushed): starter `.flaitron/tasknote/CBN-489.md` plus a `## Medium` row (`[heavy]`). It carries the full note context, with D1 locked and D2–D7 plus the drain-spec overlap open.
- **flaitron**: `.flaitron/grok-done/FLT-G001.md` (outcome: retargeted; no Drive ID, no Drive link), the PLAN stub, and this archived note. No SPEC or code change.
- **Verification:** marker check → 0 (after rewording a prose mention of the Drive-ID key, which tripped the first run); CBN starter/row/D1 grep → 0; caobunga `git log -1` → `d26a3db`, tree clean, ahead 1.
- **`touches:` reconciliation:** the flaitron diff is `.flaitron/PLAN.md`, `.flaitron/grok-done/FLT-G001.md` and this note's move, matching the declared paths plus the archive move.

**Archived:** 2026-11-17
