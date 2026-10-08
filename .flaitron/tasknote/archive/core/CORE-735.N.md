---
title: adopter-footprint audit
status: completed
tags: [epic-child, audit]
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-735, CORE-735.2, CORE-735.3, CORE-735.4]
touches:
  - .flaitron/PLAN.md
  - .flaitron/tasknote/CORE-735.N.md
---

# CORE-735.N | adopter-footprint audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-735]]

## 🎯 Goal

Verify the completed `CORE-EPIC-735` (`adopter-footprint`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-735.N — audit CORE-EPIC-735` (or `chore: ...` if no code edits land) commit lands — `chore:`, no code edits
- [x] PLAN.md line for `CORE-735.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-735.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-735` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-735.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-735]] — parent epic (adopter-footprint)
- [[CORE-735.2]] — cohort: submodule-weight measurements
- [[CORE-735.3]] — cohort: sparse-checkout decision
- [[CORE-735.4]] — cohort: sparse-checkout docs/skill edits; deferred the caveat-repetition trade to this audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — `CORE-735.N` nested under `CORE-EPIC-735` in `## Future Opportunities`; siblings `.2`, `.3`, `.4` all `[x]`. No `.1` child (the parent row says "Discovery supplied by audit-repo 2026-10-07").

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-735.N`; the pre-flight passed. Cohort state at audit time: `.2`, `.3`, and `.4` all closed 2026-10-08 (commits `bf6e75f0`, `def7b264`, `5044b594`). No open siblings, so this is not an early audit.

- [x] Read relevant source files — the three archived cohort notes in full; at HEAD: MIGRATION §1.1 and §"Pinning and bumping", `ft-new-project` Step 2/3b/recap, `ft-update` Steps 1/3/5, the four AGENTS-snippet fence paragraphs, PLATFORMS §snippet requirements, UPGRADING v6 recipe, SECURITY's viz-containment paragraph.

- [x] **Best Practices Review** — N/A: audit pass over prose deliverables; no code or module-boundary change.

- [x] **Archive skim** — area `core` confirmed against the README table (`CORE-*` → `archive/core/`). Cohort notes are the archive entries; [[CORE-632.3]] (snippet fence origin) and [[CORE-464]] (CI `fetch-depth: 0`) are the non-cohort hits the cohort already cites. Nothing else load-bearing.

- [x] **Drift check** — every surface `.4` names still carries its edit at HEAD, `tools/update-adopters.mjs` is unchanged, and `bash tools/drift-checks.sh` → 0. The PLAN row matches the SPEC/epic.md audit shape.

- [x] No clarifications needed. Assumptions: the audit judges `.4`'s deferred trade (sparse caveats repeated across ~10 surfaces) rather than re-opening `.3`'s decision; sibling-repo reads (natabula, fleet `.flaitron/core` symlink check) are covered by the `~/Code` standing exception.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Cohort deliverables:
- **CORE-735.2** (measurement, `.flaitron/` only): full submodule = 11.5 MB objects + 18.7 MB working tree, of which `.flaitron/` is 15.8 MB (~85%). `--depth 1` saves ~5 MB objects, but a re-clone undoes it and a bump then costs 10×. `shallow = true` saves ~2.6 MB and gives the cheapest bump. Every variant resolves tags.
- **CORE-735.3** (decision, `.flaitron/` only): adopters sparse-checkout `.flaitron/core` without `.flaitron/` (18.5 → 2.9 MB); flaitron-self's archive stays on `main`. Rejected: shallow, bare `--depth 1`, archive relocation. Filed `.4`.
- **CORE-735.4** (docs/skills, 8 paths): sparse line in MIGRATION §1.1 + §Pinning, `ft-new-project` Step 2, `ft-update` Step 1 (every run, git ≥ 2.35 guard), UPGRADING v6 recipe (optional); fence reworded as fallback across MIGRATION, `ft-new-project` 3b, four snippets, and PLATFORMS. Fleet updater unchanged (operator: docs only). Deferred the caveat-repetition judgment here.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: verification pass; no new surface. The two findings follow the epic-audit precedent of "fix inline if small, else cite a follow-up".

- [x] **Minimal refactor gate** — no source touched.

- [x] Implemented the minimal solution — the audit findings below.

- [x] Updated/added tests for non-trivial behavior — N/A: no code.

**Implementation Notes:**

Coherence inventory:
- **Recipe string** is byte-identical at all six sites: `sparse-checkout set --no-cone '/*' '!/.flaitron/'` (MIGRATION ×2, `ft-new-project`, UPGRADING, `ft-update` with `<FT>` for the path).
- **Git floor** reads "2.35" at all five sites that state one (MIGRATION §1.1, `ft-new-project` ×2, `ft-update` Step 1, UPGRADING). None says 2.25.
- **Size figures**: "~16 MB, ~1,000 files" in all four snippets and `ft-new-project` 3b; "~18.5 → ~2.9 MB" in MIGRATION and `ft-new-project` Step 2. These agree with `.2`'s measured 15.8 MB / `.3`'s probe. The only "~14 MB" left is in `docs/VERSION-HISTORY.md:71`, a dated release entry that stays as written.
- **Fallback framing**: every fence surface names sparse first and the ignore mechanism second, as PLATFORMS' snippet requirement now states. The claude snippet alone also mentions `/ft-update`'s re-apply. The others point at MIGRATION §1.1, which does too. Not a contradiction.
- **Cross-refs**: `.3`'s rejected options and decay-window claim still hold. The archive is at `.flaitron/tasknote/archive/` on `main`, and CORE-727 / CORE-683 read the same path. `.4` matches `.3`'s `.4` scope item for item. The one change is the re-apply point: it moved from after Step 3 to the top of Step 1. `.4`'s review rounds record the reason.
- **Nothing an adopter runs lives under the trimmed path.** Templates are in `templates/`, and `.flaitron/audit-overlay/` is flaitron-self only. The per-release tasknote is the one documented read, and MIGRATION §Pinning step 1 gives the object-store `show` route for it.

Regressions: none. `.2` and `.3` shipped nothing outside `.flaitron/`. `.4`'s surfaces are intact at HEAD, `drift-checks.sh` → 0, and flaitron-self is not sparse (`sparse-checkout list` → "this worktree is not sparse").

Deferred trade from `.4` (caveats repeated across ~10 surfaces): **accepted, no follow-up.** Each repetition sits at an action point. `ft-new-project` and `ft-update` are self-contained skill bodies, the snippets are one-liners pointing at §1.1 (as PLATFORMS requires), and the full rationale (non-cone, per-clone, objects unchanged) lives only in MIGRATION §1.1. The drift-prone facts are the recipe, the floor, and the size. All three agree today (above). A new drift pair to pin them would cut against [[CORE-EPIC-734]]'s mirror-tax direction.

Cross-repo: natabula's dogfood-archive fence (`natabula-init` Step 2b, `natabula-layer-drift` column 17, `natabula-layer-refresh`) is still correct as the fallback. `natabula-adopt` runs `/ft-new-project`, so it picks up sparse automatically. Nothing to hand off. Any rewording there is natabula's call, as `.3` recorded.

Inline fixes: none.

Follow-up candidates (`/ft-file-followup` after closure):
1. **Symlinked-core sparse guard** `[light]` — SECURITY.md calls `.flaitron/core -> ~/code/flaitron` "the common local-dev link". Through that link, the sparse line (MIGRATION §1.1, `ft-new-project` Step 2, `ft-update` Step 1's unconditional re-apply) trims the *linked flaitron checkout's own* `.flaitron/`: PLAN.md and the tasknote archive vanish from the developer's flaitron working tree. A scratchpad probe confirmed it. It is recoverable with `git -C <checkout> sparse-checkout disable`, and no fleet adopter uses a symlinked core today (checked `~/Code/*/.flaitron/core`). The fix: skip the sparse step when `<FT>` is a symlink, and add one clause to MIGRATION §1.1.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed; the deliverable is this audit record

- [x] Ran lint/type-check on changed code — N/A: markdown-only diff; `bash tools/drift-checks.sh` run as the repo-level check

- [x] **Verification receipt** — recorded in Testing Notes

- [x] **External review** — N/A: no inline fix landed, so there is no diff beyond this note and PLAN stub flips to grade

- [x] (frontend) N/A — no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `git grep -ho "sparse-checkout set --no-cone '[^']*' '[^']*'" -- ':!.flaitron' | sort | uniq -c` → one variant, 5 hits (+ `ft-update`'s `<FT>` form)
- `git grep -nE '2\.35|2\.25' -- ':!.flaitron' ':!viz'` → 5 hits, all 2.35
- `bash tools/drift-checks.sh` → 0
- `git -C /Users/fakeneuron/Code/flaitron sparse-checkout list` → "this worktree is not sparse" (flaitron-self unaffected)
- Symlink probe (scratchpad): `git -C <adopter>/.flaitron/core sparse-checkout set --no-cone '/*' '!/.flaitron/'` with `core` symlinked to a throwaway repo → that repo's `.flaitron/` gone from its working tree; `sparse-checkout disable` restores it

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — §"AI-referenced docs":
  - `README.md` — no change. It says only "consumed via git submodule" and points at MIGRATION for install.
  - `AGENTS.md` — no change.
  - `SPEC.md` — no change. There is no contract change.
  - `docs/MIGRATION.md` — no change. `.4`'s §1.1 and §Pinning edits are coherent (above).
  - `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md` — no change. They are consistent with each other and with PLATFORMS.
  - `docs/CONVENTIONS.md` — no change. Its line 164 ("a `git submodule add` plus symlink wiring") is still accurate.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change. The symlinked-core interaction is follow-up candidate 1; nothing in SECURITY is false.
  - `docs/AGENT-NEUTRALITY.md` — no change.
  - `docs/PLATFORMS.md` — no change. `.4` already updated the snippet requirement.
  - `claude/CAPABILITIES.md` — no change.
  - `docs/AGENT-COMPAT.md` — no change.
  - `docs/EXTERNAL-AGENTS.md` — no change. No stable-surface row moved, so there is no caller-side filing.
  - `docs/WORKTREES.md` — no change.
  - `docs/VISION.md` — no change.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A for the always-loaded layer. Task-local: a `git -C <path>` recipe acts on whatever `<path>` resolves to. When a doc elsewhere blesses a symlinked form of that path, check the recipe against the symlinked case too.

**Final Summary:**

The audit found the adopter-footprint cohort coherent: one recipe string, one git floor, and consistent size figures across every surface, with the fence framed as the fallback everywhere. Nothing regressed, and the doc-drift sweep is all "no change". `.4`'s deferred caveat-repetition trade is accepted, since each copy sits at an action point and the drift-prone facts agree. One follow-up candidate: skip the sparse step when `.flaitron/core` is a symlink. Without that guard, it trims the linked flaitron checkout's own `.flaitron/`, which is recoverable and unseen in the fleet today. Changed files: this note (new, archived) and `.flaitron/PLAN.md`. `touches:` reconciliation: declared = actual. No inline fixes or refactors.

Parent flip: operator confirmed **Yes** at the 📦 bundle. `CORE-EPIC-735` is flipped to stub form and the cohort (`.2`, `.3`, `.4`, `.N`) moved to the top of `## Completed`; `## Future Opportunities` is back to `(none)`.

**Archived:** 2026-10-08
