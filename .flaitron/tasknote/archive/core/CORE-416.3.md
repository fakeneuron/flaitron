---
title: viz-closure-drift-surface
status: completed
tags: []
created: 2026-08-08
due:
related-tasks: [CORE-EPIC-416, CORE-416.1, CORE-416.2, CORE-393]
---

# CORE-416.3 | viz-closure-drift-surface

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-416]]

## 🎯 Goal

Give the viz board a detection surface for closure drift: flag an archived tasknote whose `## ✅ Acceptance` still carries unticked, unannotated criteria — scoped to notes archived after 2026-08-01, the day `CORE-393` created the tick-through obligation, so the ~320 pre-rule notes are not false-flagged.

## ✅ Acceptance

- [x] `viz/src/tasknote.ts` parses the `**Archived:** YYYY-MM-DD` stamp and computes closure drift, scoped by a named effective-date constant citing `CORE-393`
- [x] The annotation escape hatch is honoured — an unticked box carrying `N/A` / `not met` / `not-met` does not count as drift (per `SPEC.md` §"Acceptance tick-through")
- [x] Notes archived before the cutoff, and notes with no readable `**Archived:**` stamp, produce no flag (unknown ≠ drift)
- [x] A ⚠️ chip renders on flagged rows in both row shapes — top-level (`TaskRowInner`) and epic child (`SubtaskRow`) — with a title/aria label naming the count
- [x] Against the live flowtron archive the surface flags exactly `CORE-405` and `TEST-003`, and nothing else
- [x] `viz` unit tests cover the parse + scoping + annotation rules; `npm run lint` and `tsc` clean

## 🧩 Subtasks

- [x] Add `TICK_THROUGH_EFFECTIVE`, `extractArchivedDate`, and `closureDrift` to `viz/src/tasknote.ts`; extend the `Tasknote` type
- [x] Wire the computation into `parseTasknote` (`viz/src/tasknote-parse.ts`)
- [x] Add `viz/src/ui/ClosureDriftChip.tsx` following the `ModelChip` emoji-chip shape
- [x] Render the chip in `TaskRowInner` (top-level rows) and `SubtaskRow` (epic children)
- [x] Add unit tests to `viz/src/tasknote.test.ts`
- [x] Verify against the live archive that exactly `CORE-405` + `TEST-003` flag
- [x] Run targeted tests, lint, type-check; 👁️ visual confirmation at :5120
- [x] Phase 4: doc-drift sweep, flip `.3` PLAN line to stub form (nested), archive

## 🔗 Related

- [[CORE-EPIC-416]] — parent epic (closure-artifact-fidelity)
- [[CORE-416.2]] — measured post-rule compliance at 43/45 and re-scoped this child to the post-2026-08-01 window; identified `CORE-405` + `TEST-003` as the only genuine instances
- [[CORE-416.1]] — the epic Discovery; its 322-note headline is superseded by `.2`
- [[CORE-393]] — created the tick-through obligation on 2026-08-01; the source of this task's cutoff date

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — `## Medium`, nested under the active `CORE-EPIC-416`, unchecked, `[medium]🧩`.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `CORE-416.2` rewrote this line one commit ago against measured evidence, so the scope is fresh rather than inherited from the falsified `.1` framing. The deliverable — a detection surface, not a backfill — is the one part of the epic that survived `.2`'s reconciliation, and the two genuine instances it would flag still exist at HEAD.

- [x] Read relevant source files — `viz/src/tasknote.ts`, `viz/src/tasknote-parse.ts`, `viz/src/archiveCache.ts`, `viz/src/devApi.ts`, `viz/src/ui/{TaskDetail,DetailSection,TaskRowInner,SubtaskRow,TaskRow,EpicRow,CriticalChip,ModelChip,StatusChip,SubtaskProgress,PhaseDots,utils}.tsx|ts`, `viz/src/visibilityPrefs.ts`, `viz/src/ui/useProjectData.ts`, `viz/src/tasknote.test.ts`; archived `CORE-416.2`, `CORE-405`, `TEST-003`.

- [x] **Best Practices Review** — the drift rule is *contract interpretation*, so it belongs beside the other pure tasknote predicates in `viz/src/tasknote.ts` (`countChecklist`, `activePhaseIndex`), not in a component. `CHECKLIST_LINE` is already defined there and is reused rather than re-declared. Rendering follows the established emoji-chip shape (`ModelChip`): a tiny presentational component with no palette dependency. No refactor required; no dependency direction crossed (UI → tasknote, as everywhere else).

- [x] **Archive skim** — `grep -l` across `.flowtron/tasknote/archive/{core,fe}/` for `tasknote.ts`, `tasknote-parse.ts`, `TaskRowInner`, `SubtaskRow`. Load-bearing findings recorded in Discovery Notes: the archive read path deliberately tolerates malformed legacy notes silently (`archiveCache.ts:23-27`), and `utils.ts:20-24` records the standing "PLAN.md wins on completion" precedence that this feature must not contradict.

- [x] **Drift check** — the PLAN line's two structural claims hold at HEAD: the render path is `parseTasknote` → `useProjectData` → row components (PLAN parsing is a separate module, `viz/src/parser.ts`, untouched here), and the 2026-08-01 cutoff matches `CORE-393`'s landing commit `3a86452` as verified in `CORE-416.2`. No SPEC contract is contradicted — the indicator *reads* the tick-through rule, it does not restate or extend it, and it touches no archived note (write-once intact).

- [x] Asked clarifying questions — two asked via AskUserQuestion; both answered. See Discovery Notes.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Where the signal comes from

Two candidate sources for "archived on/after 2026-08-01":

1. **PLAN.md `Completed YYYY-MM-DD.` stub** — already parsed into `Task.completedDate` (`viz/src/parser.ts:289`).
2. **The tasknote's own `**Archived:** YYYY-MM-DD` stamp** — present in the Phase 4 block of every closed note.

Chose (2). The PLAN line explicitly scopes this work to "the tasknote-render path, not the PLAN parser", and the stamp is the note's own record of its closure — the same artifact the tick-through rule governs. It also doubles as the archived-ness signal, so one regex yields both facts and no path-sniffing (`path.includes('/archive/')`) is needed.

**Conservative failure mode.** `CORE-255` carries an unfilled `**Archived:** YYYY-MM-DD` placeholder. That parses to no date, which parses to no flag. Correct: unknown ≠ drift, mirroring the existing `versionCurrency` precedent in `viz/src/ui/utils.ts:30-33`.

### Clarifications (both answered)

- **Surface → row chip only.** A ⚠️ chip in the row's right cluster, visible while scanning `## Completed` (which the board renders collapsed-by-default as a below-board section, `viz/src/ui/App.tsx:73`). The detail-panel alternative was rejected as invisible until expansion — a drifted note would stay unnoticed, which is the whole failure this surface exists to catch.
- **Annotations → compliant.** `SPEC.md` §"Acceptance tick-through" permits annotating a box in place (`N/A — reason` / `not met — reason`) instead of ticking it. An annotated box is a *satisfied* obligation, so it must not count as drift; omitting the check would false-flag correctly-closed future notes, which is precisely the false-flag failure `CORE-416.2` scoped this task against. The escape hatch is in real use in the archive (e.g. `CORE-058`'s Acceptance block is entirely `N/A — de-scoped at Phase 1`).

### Coverage gap found while reading the row components

`TaskRowInner` is shared by `TaskRow` and `EpicRow` — but **not** by `SubtaskRow`, which renders epic children with its own minimal layout (checkbox / ID / description / completed date). Since a large share of archived notes are epic children (`.1`, `.2`, …), a chip added only to `TaskRowInner` would miss most of the corpus. Both row shapes therefore get the chip. This is coverage of the stated scope, not scope growth.

### Assumptions

- The cutoff is a compile-time constant, not a setting. It marks a fixed historical event (`CORE-393` landing), so there is nothing for an operator to configure.
- No `visibilityPrefs` toggle. The chip renders on 2 of 615 notes; a preference for hiding a rare high-signal warning is speculative surface, and adding one would mean touching the persisted prefs schema for no demonstrated need.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the drift rule joins the existing pure tasknote predicates in `viz/src/tasknote.ts` (`countChecklist`, `activePhaseIndex`), reusing the module-level `CHECKLIST_LINE` regex rather than re-declaring one. The chip follows `ModelChip`'s emoji-chip shape (bare `<span className="text-xs">` + `title`/`aria-label`, no palette token) rather than `CriticalChip`'s background-chip shape, because it renders a glyph, not a letter. No new pattern introduced.

- [x] **Minimal refactor gate** — one incidental change only: `parseTasknote` now binds `acceptance` to a local before returning it, because the closure-drift call needs the same string. `SubtaskRow` likewise binds `tn` once instead of calling `tasknotesById.get(task.id)` inline, since the chip and the detail panel both need it. Both are required by the change; no unrelated cleanup.

- [x] Implemented the minimal solution — 6 files touched, 1 added; +171/-2 across `viz/src`.

- [x] Updated/added tests for non-trivial behavior — 12 new unit tests (`viz/src/tasknote.test.ts`, +112).

**Implementation Notes:**

**Detection (`viz/src/tasknote.ts`, +47).** Three additions: `TICK_THROUGH_EFFECTIVE`, `extractArchivedDate`, and `closureDrift`, plus a `ClosureDrift` interface and the `Tasknote.closureDrift` field. `closureDrift` returns `null` for everything that is not a reportable finding — no stamp, a pre-rule stamp, or a clean Acceptance block — so the UI condition is a single truthiness check and "no data" can never render as "no drift found".

**The boundary-day correction.** The PLAN line said *on/after 2026-08-01*; implementing that literally flagged three notes, not the two `CORE-416.2` identified. The extra hit was `CORE-389.3`, which `.2` had already verified closed at 21:24 while `CORE-393` landed at 23:32 the same day. `**Archived:**` stamps are date-only and cannot resolve that. Operator-confirmed resolution: compare strictly (`<=` returns null), excluding the landing day. This diverges from the PLAN line's literal wording to serve its stated purpose — *"so pre-rule notes aren't false-flagged"* — and costs only a hypothetical note archived in the 4.5-hour window between the rule landing and midnight, of which the 616-note corpus contains none. The rationale is written into the constant's comment so a future reader does not re-derive it from commit timestamps, as this task had to.

**Annotation escape hatch.** `ANNOTATED = /\b(?:N\/A|not[ -]met)\b/i` — an unticked box carrying it is a satisfied obligation per `SPEC.md` §"Acceptance tick-through", not drift. Without this, `CORE-058`-shaped notes (whose entire Acceptance block is `N/A — de-scoped at Phase 1`) would flag as maximally drifted.

**Rendering (`ClosureDriftChip.tsx`, 11 lines).** A ⚠️ glyph carrying the count in both `title` and `aria-label`. Wired into **both** row shapes: `TaskRowInner` (used by `TaskRow` + `EpicRow`) after the `StatusChip`, since it qualifies the completed status; and `SubtaskRow`, which renders epic children through its own layout and would otherwise have missed most of the archived corpus. No `visibilityPrefs` toggle — the chip fires on 2 of 616 notes, and a preference to hide a rare warning is speculative surface that would mean touching the persisted prefs schema.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz run test -- --run`: **18 files, 258 tests, all passing** (12 new).

- [x] Ran lint/type-check on changed code — `npm --prefix viz run lint` (eslint) clean; `npm --prefix viz run build` (`tsc --noEmit && vite build`) clean.

- [x] **Quality assertions** — no duplication (`CHECKLIST_LINE` reused, not re-declared; the chip is one component consumed by two row shapes); no dead code (every export is consumed — `closureDrift` + `extractArchivedDate` by `parseTasknote`, `TICK_THROUGH_EFFECTIVE` by `closureDrift`, `ClosureDrift` by the field and the chip's prop); no unexplained complexity (one date compare, one regex, one loop); public-surface growth is 4 exports + 1 field, each load-bearing; no stale code-facing docs (`viz/` carries no doc restating tick-through — verified in the sweep below).

- [x] (frontend) Asked the user for visual confirmation — 👁️ **CONFIRM** issued against the running dev server at `http://localhost:5120`; operator confirmed the ⚠️ chips render on `CORE-405` and `TEST-003` and nowhere else.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Unit coverage (12 new tests).** `extractArchivedDate` — real stamp / unfilled `YYYY-MM-DD` placeholder / no stamp. `closureDrift` — in-scope dirty block, the landing-day exclusion, a pre-rule date, a missing date, a fully-ticked block, an all-annotated block, a mixed annotated/unannotated block, an empty block. `parseTasknote` — end-to-end drift computation from a full note, and `null` on an active note whose Acceptance is legitimately unticked (the most likely false-positive shape).

**Corpus verification.** A throwaway probe ran the real `parseTasknote` over all **616** archived notes in `.flowtron/tasknote/archive/`. First pass (literal `on/after`) flagged 3 — `CORE-389.3 → 8/8`, `CORE-405 → 3/14`, `TEST-003 → 5/5`. After the boundary-day correction it flags exactly **2**: `CORE-405 → 3/14` and `TEST-003 → 5/5` — precisely the two genuine instances `CORE-416.2` identified by hand, and no others. The probe was deleted after use; it was verification, not a shipped test, since a test asserting against the live archive would break every time a note is closed.

**Visual.** Operator-confirmed at `http://localhost:5120` (see Phase 3 box 4). Dev server stopped afterward.

`git diff --stat` final: `viz/src` +171/-2 across 6 files, plus `viz/src/ui/ClosureDriftChip.tsx` (11 lines, new).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs": `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md` — **no change**, all 14. This task adds a *read-only detection surface* inside `viz/`; it neither restates nor amends the tick-through rule, so `SPEC.md` is untouched by design. `viz/` carries no markdown of its own (verified: no `viz/*.md`), and no cold-start doc documents viz internals — the visualizer is described only as an existence claim (`SPEC.md` §"What flowtron does NOT provide": the read-only single-instance carve-out), which this change does not alter.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — surfaces at the 📦 ready-to-commit gate (frontend signal hit: `viz/src/ui/` touched)

**Final Summary:**

The viz board can now detect closure drift on its own: an archived tasknote whose `## ✅ Acceptance` still carries unticked, unannotated criteria renders a ⚠️ chip. Against the live 616-note archive it flags exactly the two notes `CORE-416.2` had identified by hand — `CORE-405` and `TEST-003` — and nothing else.

**What shipped.** `viz/src/tasknote.ts` gained three pure functions (`TICK_THROUGH_EFFECTIVE`, `extractArchivedDate`, `closureDrift`) beside the existing tasknote predicates; `parseTasknote` computes the field once per note; `ClosureDriftChip` (11 lines) renders it in both row shapes. The detection reads the contract rather than restating it, so `SPEC.md` is untouched and no archived note was modified — write-once intact.

**Two judgment calls, both operator-confirmed.** *Annotations count as compliant* — `SPEC.md`'s escape hatch (`N/A — reason` / `not met — reason`) marks a satisfied obligation, and ignoring it would false-flag every correctly-closed note that used it, including `CORE-058`, whose entire Acceptance block is annotated. *The rule's landing day is excluded* — implementing the PLAN line's literal "on/after 2026-08-01" flagged a third note, `CORE-389.3`, which `CORE-416.2` had already verified closed at 21:24 while `CORE-393` landed at 23:32. `**Archived:**` stamps are date-only and cannot separate them, so the comparison is strict. That trades a 4.5-hour blind spot — empty in this corpus — for zero false flags, which is the failure mode this task was re-scoped to prevent.

**Coverage catch.** `TaskRowInner` is shared by `TaskRow` and `EpicRow` but not by `SubtaskRow`, which renders epic children through its own layout. A chip added only to `TaskRowInner` would have missed most of the archived corpus, since most archived notes are epic children. Both row shapes were wired.

**Verification.** 258 tests pass (12 new); eslint clean; `tsc --noEmit && vite build` clean; a throwaway probe ran the real parser over all 616 archived notes and confirmed the 2-hit result; operator visually confirmed the chips at `localhost:5120`. Documentation verdict: all 14 cold-start docs "no change".

**Maintainability effect.** The epic's remaining question — *how would we notice if this drifted again?* — now has a standing answer that costs nothing to maintain: 58 lines of pure, tested logic plus an 11-line component, with the boundary-day reasoning written into the constant's comment so the next reader inherits it instead of re-deriving it from commit timestamps.

**Archived:** 2026-08-08
