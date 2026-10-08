---
title: sidequest-orphan-guard
status: completed
tags: []
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-742, CORE-606, CORE-714, CORE-359.3]
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - docs/CONVENTIONS.md
  - .flaitron/sidequest/CORE-714.md
---

# CORE-742.2 | sidequest-orphan-guard

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-742]]

## 🎯 Goal

Make an orphaned sidequest stub — `.flaitron/sidequest/<ID>.md` whose PLAN row is already `- [x]` — fail the CI `drift` job, and retire the one live orphan (`CORE-714.md`).

## ✅ Acceptance

- [x] `tools/drift-checks.sh` has a `sidequest_orphan` check that prints `ORPHANED STUB  <path>` and fails when a stub's ID has a checked row in `.flaitron/PLAN.md` or `.flaitron/PLAN-ARCHIVE.md`, with a `VACUOUS` floor — `node --test tools/drift-checks.test.mjs`
- [x] `drift-checks.test.mjs` carries a seeded case for it (coverage + floor tests stay green) — `node --test tools/drift-checks.test.mjs`
- [x] `.flaitron/sidequest/CORE-714.md` deleted and the live repo passes the new check — `bash tools/drift-checks.sh sidequest_orphan`
- [x] The check is documented where its siblings are (script header, `docs/CONVENTIONS.md` §"GitHub Actions CI") — `grep -q 'sidequest_orphan (CORE-742.2)' tools/drift-checks.sh && grep -q 'sidequest-orphan check' docs/CONVENTIONS.md` (verify command corrected in Phase 3: CONVENTIONS names checks in prose, not by function name)
- [x] Full drift job still green — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Add `sidequest_orphan()` to `tools/drift-checks.sh` (after `final_newline`), with design notes
- [x] Add the seeded case to `tools/drift-checks.test.mjs`
- [x] Delete `.flaitron/sidequest/CORE-714.md`
- [x] Update the script header and `docs/CONVENTIONS.md` "checks with neither a source rule nor a catalogue entry" sentence
- [x] Run the full validation set

## 🔗 Related

- [[CORE-EPIC-742]] — parent epic (contract-guard-gaps)
- [[CORE-606]] — made stub retirement executable in the promoting runners; this adds the mechanical backstop
- [[CORE-714]] — closed 2026-10-04 leaving the orphan this task retires
- [[CORE-359.3]] — earlier manual orphan cleanup (CORE-348)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.flaitron/sidequest/CORE-714.md` still exists while PLAN.md line 107 reads `- [x] **CORE-714** … Completed 2026-10-04.` — the gap is live. No check in `tools/drift-checks.sh` reads `.flaitron/sidequest/`.

- [x] Read relevant source files — `tools/drift-checks.sh` (shape rules, every check), `tools/drift-checks.test.mjs` (CASES, coverage + floor tests), `.github/workflows/ci.yml` drift job, `docs/CONVENTIONS.md` §"GitHub Actions CI", `claude/skills/ft-file-followup/park-mode.md` §Notes "Promotion", both live stubs.

- [x] **Best Practices Review** — The check is a new standing function, not a mirror pair: it has no §7.1 catalogue entry, like `final_newline` / `skill_pin_guard_parity`, so it is named without the `pair_` prefix and documented in the same "neither a source rule nor a catalogue entry" sentence. The source rule is park-mode.md §Notes "Promotion". CI runs it automatically (`bash tools/drift-checks.sh` runs every function); the §7.1 release walk does not (`'pair_*' wrapper_name_invariant`), same as `final_newline`.

- [x] **Archive skim** — area `core` confirmed against README table. Hits: CORE-606 (made retirement executable at the runners' scaffold step; deleted CORE-587/588 orphans), CORE-359.3 (manual CORE-348 orphan cleanup) — this is the third orphan, so the runner-side fix alone is not enough; CORE-739.2/.3 (VACUOUS floor + seeded self-test conventions); CORE-714 archive carries the stub's idea in full, so deleting the stub loses nothing.

- [x] **Drift check** — PLAN line matches current state (CORE-714 stub present, row `- [x]`). Script shape rules re-read: one column-0 function per check, `bad=` accumulator, VACUOUS floor required (floor test's regex `VACUOUS <name>… exit 1`), bash 3.2, a seeded case per check.

- [x] No clarifications needed (--fast). Assumptions: (1) the stub's ID is its filename (park-mode.md contract `.flaitron/sidequest/<ID>.md`); (2) a closed row in `PLAN-ARCHIVE.md` counts too — a rotated row is still closed; (3) floor on "checked PLAN rows read", not on stubs examined — an empty sidequest dir is a legitimate state (CORE-641 will eventually be promoted), so flooring on stubs would make the check fail on a clean repo; (4) the seed uses a synthetic `ZZ-1` row + stub so it does not depend on live PLAN data.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Floor choice mirrors `shipped_skill_parity` (`[ -n "$cl$cx" ]` on the read set) rather than a per-row `n` counter: what can silently go empty is the PLAN read (moved file, reshaped row grammar), and an empty closed-ID set would pass every stub.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the standing-check shape (`final_newline` / `shipped_skill_parity`: column-0 function, `bad=` accumulator, read-set VACUOUS floor) and the `CASES` seeded-drift shape (`pair_r`'s PLAN-ARCHIVE append)

- [x] **Minimal refactor gate** — no refactor; only the header's counter rule gained one clause naming the read-set floor

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `sidequest_orphan()` added after `final_newline` in `tools/drift-checks.sh`: requires both PLAN files (`MISSING FILE` finding), builds the closed-ID set with one `sed` over every `- [x] **ID**` row (indented children included), floors `VACUOUS` on an empty set, then prints `ORPHANED STUB  <path>` per stub whose filename ID is closed.
- Seeded case seeds two orphans — a column-0 row appended to `PLAN-ARCHIVE.md` (`ZZ-1`) and an indented child row appended to `PLAN.md` (`ZZ-2.1`) — and the finding regex requires both lines, so both files and the indented-row match are exercised.
- `git rm .flaitron/sidequest/CORE-714.md` (its idea is fully carried by `archive/core/CORE-714.md`).
- Docs: script header (neither-source-rule-nor-catalogue sentence; read-set-floor clause in the counter rule) and `docs/CONVENTIONS.md` "Two checks…" → "Three checks…".
- Repro: restoring the CORE-714 stub from HEAD makes `bash tools/drift-checks.sh sidequest_orphan` print `ORPHANED STUB  .flaitron/sidequest/CORE-714.md` and exit 1.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A, no rendered surface (shell + test + markdown only); no 👁️ ask, no park

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Full validation set (`--unattended`; justfile first, then AGENTS.md §"Validation"):

- `just test` → 0 · `just lint` → 0 · `just typecheck` → 0
- `npm --prefix viz test` → 0 (591 passed) · `npm --prefix viz run typecheck` → 0 · `npm --prefix viz run lint` → 0 · `npm --prefix viz run build` → 0
- `node --test tools/update-adopters.test.mjs` → 0 (65 pass) · `node --check tools/update-adopters.test.mjs` → 0 · `node --check tools/update-adopters.mjs` → 0
- `node --test tools/drift-checks.test.mjs` → 0 (18 pass, incl. `sidequest_orphan fails on its seeded drift`, coverage and floor tests) — re-run after review fixes → 0
- `bash tools/drift-checks.sh sidequest_orphan` → 0 (live repo); with CORE-714 stub restored → 1, `ORPHANED STUB  .flaitron/sidequest/CORE-714.md`
- `bash tools/drift-checks.sh` → 0 (all 16 checks ok), re-run after review fixes → 0
- `grep -q 'sidequest_orphan (CORE-742.2)' tools/drift-checks.sh` → 0 · `grep -q 'sidequest-orphan check' docs/CONVENTIONS.md` → 0 (original `grep -q sidequest_orphan docs/CONVENTIONS.md` → 1: wrong verify command, corrected above)
- Quality: no duplication (one sed, one loop), no dead code, docs updated in both places that enumerate unnamed checks.

External review (`/code-review medium`, working-tree diff only) — no blockers; 5 notes:

1. note — `2>/dev/null` hid a missing PLAN-ARCHIVE.md while PLAN.md kept the floor green → **fixed**: both files required, `MISSING FILE` finding.
2. note — stub beside a live promoted tasknote unreported until the row flips → **filed** CORE-742.3 (`/ft-file-followup --unattended`; beyond the PLAN line's checked-row scope).
3. note — header counter rule did not mention the new check's missing `n` → **fixed**: header clause + function comment.
4. note — seed exercised only the PLAN-ARCHIVE branch → **fixed**: second seed is an indented child row in PLAN.md; regex requires both findings.
5. note — per-stub `printf | grep` instead of a set compare → **declined**: one live stub; clarity over a `comm` pipeline.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/CONVENTIONS.md`: updated ("Three checks have neither a source rule nor a catalogue entry" + the sidequest-orphan check). `AGENTS.md`, `README.md`: no change (name `drift-checks.sh` generically, enumerate no checks). `docs/AGENT-NEUTRALITY.md`: no change (cites `wrapper_name_invariant` only). Every other entry: no change (no drift-check or sidequest content).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A. A floor-on-the-read-set pattern for checks whose examined set may legitimately be empty is already recorded in the script header.

**Final Summary:**

Added a `sidequest_orphan` check to `tools/drift-checks.sh`. It fails with `ORPHANED STUB <path>` when a `.flaitron/sidequest/<ID>.md` stub's ID has a checked row in `.flaitron/PLAN.md` or `.flaitron/PLAN-ARCHIVE.md`, and with `MISSING FILE` when either PLAN file is absent. It floors `VACUOUS` on an empty closed-ID read; an empty sidequest dir is a legal state. CI's `drift` job picks it up automatically. It has a two-orphan seeded case in `drift-checks.test.mjs`. Retired the live orphan `CORE-714.md`, which reproduced the failure before the delete. Documented in the script header and `docs/CONVENTIONS.md`.

- **Changed files:** `tools/drift-checks.sh`, `tools/drift-checks.test.mjs`, `docs/CONVENTIONS.md`, `.flaitron/sidequest/CORE-714.md` (deleted), plus closure `.flaitron/PLAN.md` (this row's stub flip + the filed CORE-742.3 row) and this note's archive move.
- **Verification:** full validation set green (receipt in Testing Notes); external review: 0 blockers, 3 notes fixed, 1 filed (CORE-742.3), 1 declined.
- **Refactors:** none.
- **Doc verdict:** CONVENTIONS updated; all other AI-referenced docs no change.
- **`touches:` reconciliation:** `git diff --name-only` = the four declared paths + `.flaitron/PLAN.md` (closure flip + follow-up filing) — workflow file, expected; no undeclared deliverable.
- **Maintainability:** a third recurrence of the orphan-stub miss (CORE-348, CORE-587/588, CORE-714) is now a CI failure instead of a periodic manual cleanup.
- **Deferred:** CORE-742.3 (promotion-time variant: stub beside a live tasknote), filed via `/ft-file-followup --unattended`, uncommitted at filing and carried in this closure commit.

unattended-candidates: none

**Archived:** 2026-10-08
