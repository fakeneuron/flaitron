---
title: viz-version-drop
status: completed
tags: []
created: 2026-08-26
due:
related-tasks: []
touches:
  - viz/src/ui/constants.ts
  - claude/skills/ft-release/SKILL.md
---

# CORE-478 | viz-version-drop

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Delete the dead `VIZ_VERSION` constant (no footer renders it) and the `/ft-release` bump step that maintains it, since the git tag is already the version authority.

## ✅ Acceptance

- [x] `viz/src/ui/constants.ts` no longer exports `VIZ_VERSION` or its doc comment
- [x] `claude/skills/ft-release/SKILL.md` no longer has a bump step for `VIZ_VERSION` or for `viz/package.json`/`viz/package-lock.json`'s version; the "N version edits" prose is renumbered to 3 everywhere it appears
- [x] `npm --prefix viz run typecheck` / `run lint` / `test` pass with the constant removed
- [x] No live (non-archive) source or doc in the repo references `VIZ_VERSION`

## 🧩 Subtasks

- [x] Remove the `VIZ_VERSION` export and its doc comment from `viz/src/ui/constants.ts`
- [x] Remove the `VIZ_VERSION` bump step from `/ft-release`'s Acceptance list and Step 5 numbered edit list
- [x] Remove the `viz/package.json` + `viz/package-lock.json` bump step from `/ft-release` (operator-confirmed scope: package.json's version field only ever mirrored `VIZ_VERSION`, per FE-056)
- [x] Renumber "5 version edits" → "3 version edits" everywhere it's cited (Step 2.5 budget note, re-entry note, Step 5 header + verify grep + pin count, Step 6, Step 7.1, README-counter-check callout, git-add staging, commit-go preview line)
- [x] Reframe Step 6 (Testing & Linting) prose — the viz/fleet-updater validation gate is no longer tied to "the fourth and fifth edits" since no viz files are touched by future release cuts
- [x] Run `npm --prefix viz run typecheck` / `run lint` / `test` to confirm no regression
- [x] Re-run `/ft-release`'s own Pair H validation-roster standing check against the edited Step 6 to confirm it still passes
- [x] Grep repo-wide (excluding `archive/`) to confirm no live `VIZ_VERSION` reference remains

## 🔗 Related

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Confirmed live: `VIZ_VERSION` is defined at `viz/src/ui/constants.ts:41` and unreferenced anywhere else in `viz/src` (App.tsx dropped its only consumer at CORE-432.2). The `/ft-release` bump step for it is still live at SKILL.md's Acceptance list + Step 5. Task as filed is accurate — proceed as scoped.

- [x] Read relevant source files — `viz/src/ui/constants.ts` (VIZ_VERSION definition + doc comment), `viz/src/ui/App.tsx` (confirmed no consumer), `claude/skills/ft-release/SKILL.md` (full file, both halves — every VIZ_VERSION / "N version edits" / constants.ts / package.json / package-lock touch point), `viz/package.json` (confirmed `"version"` field has no code consumer either).

- [x] **Best Practices Review** — deleting a dead export + its stale doc comment, and the release-recipe steps that maintained it, in the same change. No new abstraction, no refactor beyond the deletion itself. The `/ft-release` edits ripple through several prose call-outs that restate the version-edit count (a known drift class this file's own "Pair" standing checks exist to catch) — updated all of them in the same pass rather than leaving any stale.

- [x] **Archive skim** — `FE-056` established `viz/package.json`'s version field as a pure mirror of `VIZ_VERSION` with no independent code consumer (private, never-published package). `CORE-262` renamed `FLOWTRON_VERSION` → `VIZ_VERSION` in this same release skill. `CORE-432.2` dropped the only runtime consumer (App.tsx header fallback), which is why the footer no longer renders it. `CORE-312` considered `VIZ_VERSION` as a candidate "current release" source and went a different direction. No prior tasknote proposed dropping the constant or the bump step outright. (`ft-release/SKILL.md` also turns up in dozens of unrelated archive hits — it's the target of many of the file's own self-referential "Pair" grep patterns; skimmed and confirmed none bear on version-edit count or VIZ_VERSION.)

- [x] **Drift check** — PLAN.md's claim "no footer renders it" verified true (no `VIZ_VERSION` reference in `App.tsx` or anywhere in `viz/src`). Constant still present at `constants.ts:41` as described. `/ft-release`'s bump step still present as described (Acceptance line + Step 5 item 4). No SPEC contract references `VIZ_VERSION` or the version-edit count. No drift.

- [x] Asked clarifying questions — one genuine scope call: whether `viz/package.json`/`package-lock.json`'s version bump step (justified only as a `VIZ_VERSION` mirror per FE-056, no independent code consumer) should also be dropped, or kept as a standalone npm-metadata convention with rewritten rationale. Operator chose **remove it too** — folded into this task's scope.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

`VIZ_VERSION` was the single source of truth for a footer version display that CORE-432.2 (2026-08-10) already removed — the header now omits the version segment entirely when a project's pin is unknown rather than falling back to it, and shows the known per-project pin otherwise. That left `VIZ_VERSION` write-only: still bumped every release, read by nothing. `viz/package.json`'s `"version"` field was wired (FE-056) purely to mirror `VIZ_VERSION` for a private, never-published package — also read by nothing. Both bump steps in `/ft-release`, and every piece of prose in that skill counting "N version edits," are updated together so the skill stays internally consistent (its own standing "Pair" checks exist precisely to catch this class of drift).

Discovery surfaced one clarification (package.json scope) that narrowed an ambiguity in the PLAN line rather than redirecting the approach or file set → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — no established pattern to extend; this is a subtractive change (dead export + orphaned recipe steps). Checked for any other consumer or mirror of the deleted values before removing (none found).

- [x] **Minimal refactor gate** — touched only the `VIZ_VERSION` export + comment in `constants.ts`, and the specific bump-step/count references in `ft-release/SKILL.md` (both VIZ_VERSION's and, per operator confirmation, package.json's). No unrelated cleanup in either file.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: pure deletion of an unconsumed constant and matching skill-doc bump steps; no new behavior to test. Existing suite re-run to confirm no regression (see Phase 3).

**Implementation Notes:**

- `viz/src/ui/constants.ts` — removed the 2-line doc comment + `export const VIZ_VERSION = 'v5.19.0';` (was lines 39-41, directly above `TYPOGRAPHY`).
- `claude/skills/ft-release/SKILL.md` — removed the VIZ_VERSION bump step (old Acceptance line + Step 5 item 4) and the `viz/package.json`/`viz/package-lock.json` bump step (old Acceptance line + Step 5 item 5, plus the package.json/package-lock verify block). Renumbered the Step 5 edit list from 5 items to 3 (SPEC.md / docs/MIGRATION.md / SECURITY.md only) and dropped `viz/src/ui/constants.ts` from the post-edit verify grep's target list. Reframed Step 6's testing prose: the viz + fleet-updater validation commands (`npm --prefix viz test`/`typecheck`/`lint` + the 3 `tools/update-adopters` node checks) are kept verbatim — required by the skill's own Pair H standing check — but are now framed as a standing gate independent of "the version edits" rather than "the fourth and fifth edits," since future release cuts no longer touch any viz file. Updated every other "5 version edits" / "four pins" count (Step 2.5 budget note, re-entry note, Implementation Notes prompt, §7.1 Critical/High rationale, README-counter-check callout, §7.4 git-add staging list, §7.4 commit-go preview line) to match.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz run test -- --run src/ui/App.test.tsx` (63/63 pass, confirming the header still renders correctly with no `VIZ_VERSION` reference), then the full suite: `npm --prefix viz test` (25 files / 476 tests, all pass).

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` clean, `npm --prefix viz run lint` clean.

- [x] **Quality assertions** — no duplication introduced; this removes dead code (the unconsumed export) and its now-orphaned doc process steps. No public-surface growth — pure removal. Re-ran `/ft-release/SKILL.md`'s own Pair H validation-roster check inline (the six AGENTS.md §Validation commands are still present verbatim in Step 6, and in all four other restatement sites) — clean, confirming the reframed Step 6 prose didn't drop the required command block. Verified fenced-code-block balance around the edited Step 5/Step 6 sections (4 and 2 backtick-fence lines respectively — both even/balanced).

- [x] (frontend) Asked the user for visual confirmation — N/A: no UI change (the footer already stopped rendering this value at CORE-432.2); this task only removes dead code and skill-doc process steps.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

`npm --prefix viz run typecheck` — clean. `npm --prefix viz run lint` — clean. `npm --prefix viz run test -- --run src/ui/App.test.tsx` — 63/63 pass. `npm --prefix viz test` (full suite) — 25 files / 476 tests, all pass. `grep -rn "VIZ_VERSION"` repo-wide (excluding `archive/`) — zero live hits. `/ft-release`'s own Pair H validation-roster check, re-run against the edited Step 6 — clean (all six AGENTS.md §Validation commands still present verbatim in Step 6 and all four other restatement sites).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs" (18 entries: README/AGENTS/SPEC/MIGRATION/snippets/CONVENTIONS/CONTRIBUTING/SECURITY/AGENT-NEUTRALITY/PLATFORMS/CAPABILITIES/AGENT-COMPAT/EXTERNAL-AGENTS/WORKTREES). No change — none reference `VIZ_VERSION` or the version-edit count (confirmed by repo-wide grep in Discovery). `claude/skills/ft-release/SKILL.md` is explicitly out-of-scope for this sweep per the README's own carve-out ("`claude/skills/*/SKILL.md` are loaded on demand... not part of the default cold-start sweep") — it was still fully edited in Phase 2 since it's this task's actual deliverable, just not part of the *sweep*.

- [x] Closed — all 4 Acceptance criteria ticked. `status:` flipped to `completed` below. PLAN.md line to be flipped to stub form and moved to top of `## Completed` in this same commit; tasknote moved to `.flowtron/tasknote/archive/core/CORE-478.md`.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Removed the dead `VIZ_VERSION` constant (`viz/src/ui/constants.ts`, −3 lines) — its only runtime consumer was dropped at CORE-432.2, leaving it write-only. Removed its `/ft-release` bump step, and, per operator-confirmed scope, the `viz/package.json`/`viz/package-lock.json` bump step that existed solely to mirror it (FE-056; no independent code consumer). `claude/skills/ft-release/SKILL.md` renumbered from a 5-edit to a 3-edit version-bump recipe (SPEC.md / docs/MIGRATION.md / SECURITY.md only) across every prose restatement of the count — budget note, re-entry note, Step 5 header/list/verify-grep, Step 6 (reframed as a standing viz-validation gate rather than tied to specific version edits), §7.1 rationale, README-counter callout, §7.4 git-add staging, §7.4 commit-go preview. No refactor beyond the deletions themselves. Verified: `npm --prefix viz run typecheck`/`run lint` clean, full test suite 476/476 pass, `/ft-release`'s own Pair H validation-roster standing check re-run clean against the edited Step 6, repo-wide grep confirms zero live `VIZ_VERSION` references remain. Doc-drift: no change to the AI-referenced doc set. Maintainability: git tag remains the sole version authority for viz; future `/ft-release` cuts do one less (now-orphaned) file pair, with no loss of information since nothing consumed either value.

**Archived:** 2026-08-26
