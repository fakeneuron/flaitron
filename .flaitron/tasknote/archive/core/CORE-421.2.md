---
title: fence-aware scanners
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: ['CORE-EPIC-421', 'FE-004', 'FE-075', 'CORE-098.15', 'CORE-416.3']
---

# CORE-421.2 | fence-aware scanners

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-421]] [[FE-004]] [[FE-075]] [[CORE-098.15]] [[CORE-416.3]]

## 🎯 Goal

Make every line-scanner in `viz/src/tasknote.ts` skip fenced-code content so a
fenced block containing a heading, checkbox, or `---` rule is read as sample
text rather than as document structure.

## ✅ Acceptance

- [x] A single fence-state helper in `viz/src/tasknote.ts` marks lines inside ` ``` ` / `~~~` fences, and all four line-scanners consult it (no per-scanner copy) — `fenceMask`, read directly by `extractSection` and `extractStarterSubsections` and via the shared `structuralChecklistLines` by `countChecklist` and `closureDrift`
- [x] `extractSection` no longer ends a section on a `##` heading or `---` rule that sits inside a fence, and still returns the fenced lines verbatim in the section text
- [x] `countChecklist` no longer counts checkbox lines inside a fence
- [x] `closureDrift` no longer counts fenced Acceptance checkbox lines as unticked criteria
- [x] `extractStarterSubsections` no longer switches sub-section on a `###` heading or `---` rule inside a fence
- [x] Regression tests cover each of the four scanners, using the real-archive shapes found in Discovery (`CORE-098.1`, `FE-033.1`, `CORE-023`, `CORE-008`) — `CORE-098.1`'s fenced-example-rows shape is reproduced verbatim in a `parseTasknote` case; `FE-033.1` and `CORE-023` share that shape and are covered by the same `countChecklist` case; `CORE-008`'s distinct shape (fenced `##` headings + `---`) is the `extractSection` case
- [x] Real-archive verdict re-measured after the fix: the three miscounted notes read correctly and no other archived note's counts or section text changes
- [x] `npm --prefix viz test`, `npm --prefix viz run typecheck`, and `npm --prefix viz run lint` all clean

## 🧩 Subtasks

- [x] Add a `fenceMask(lines): boolean[]` helper to `viz/src/tasknote.ts` beside the existing line regexes
- [x] Thread it through `extractSection` (heading + HR checks) while preserving verbatim collected output
- [x] Thread it through `countChecklist`, `closureDrift`, and `extractStarterSubsections`
- [x] Add regression tests to `viz/src/tasknote.test.ts` — one per scanner, plus a `parseTasknote` end-to-end case
- [x] Re-run the throwaway archive probe, confirm the expected three-file delta and nothing else, then delete the probe
- [x] Run test / typecheck / lint; close

## 🔗 Related

- [[CORE-EPIC-421]] — parent epic (viz-robustness); sibling children `.3` `.4` `.5`
- [[FE-004]] — introduced `extractSection`; its stated purpose is "show only the spec layer"
- [[FE-075]] — prior surgical fix inside `extractSection` (word-boundary heading match); the shape this task follows
- [[CORE-098.15]] — wrote `extractStarterSubsections` as a deliberate mirror of `extractSection`
- [[CORE-416.3]] — wrote `closureDrift`; established "reuse the module-level regex, don't re-declare"

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The bug class is real and reproduced against the live archive — three archived notes currently render phantom unticked phase boxes because fenced example checkboxes are counted as document structure. The PLAN line's *cited symptom* and *named fixture* are both wrong (see Drift check), but that is a correction inside this task, not a change to what gets built: same root cause, same file, same fix.

- [x] Read relevant source files — `viz/src/tasknote.ts` (full, 233 LOC), `viz/src/tasknote-parse.ts` (full, 40 LOC), `viz/src/archiveCache.ts` (full), `viz/src/tasknote.test.ts` (style skim), plus the two UI consumers of `closureDrift` (`TaskRowInner.tsx`, `SubtaskRow.tsx`). Read set was narrow and known — no probe needed for the *search*; a throwaway probe was used for *measurement* (below).

- [x] **Best Practices Review** — Four scanners in `tasknote.ts` independently walk lines and independently mis-read fenced content: `extractSection` (`##` + `---`), `countChecklist` (`CHECKLIST_LINE`), `closureDrift` (same regex, on the extracted Acceptance substring), `extractStarterSubsections` (`###` + `---`). The single responsibility being violated is *"which lines are document structure"* — currently answered four times, never asked. [[CORE-416.3]] set the governing precedent when it added `closureDrift`: reuse the module-level `CHECKLIST_LINE` "rather than re-declaring one". A shared `fenceMask` helper is the same move one level up. No dependency direction crossed (UI → tasknote, as everywhere else); no deferred cleanup identified.

- [x] **Archive skim** — `grep -rl` over `.flowtron/tasknote/archive/` for the four function names and the source paths. Load-bearing findings:
  - [[FE-004]] — introduced `extractSection`; purpose is to surface *only* the spec layer, so section-boundary correctness is the whole contract.
  - [[FE-075]] — the direct precedent: a prior correctness bug in `extractSection`'s heading match, fixed surgically inside the function with a regression test. Same shape as this task. Its archive skim explicitly recorded that no prior note had found the substring-match flaw — nor, it turns out, the fence flaw.
  - [[CORE-098.15]] — `extractStarterSubsections` was written as a deliberate mirror of `extractSection`. It inherits the bug by construction, which is why the fix must reach it too.
  - [[CORE-416.3]] — `closureDrift` reuses `CHECKLIST_LINE` by design. It inherits the bug the same way.
  - [[CORE-417]] — established the **throwaway probe** convention for exactly this situation: to check a parser change against live archives, run a temporary probe and delete it, rather than committing a test that asserts against `archive/` (which would break on every future closure — [[CORE-416.N]]'s precedent). Followed here.

- [x] **Drift check** — **Drift found; the PLAN.md line is wrong on two counts.**

  1. **"regression fixture from archived CORE-008.md"** — `CORE-008.md` does contain 7 `##` headings inside fences, and they *do* truncate its Phase 2 section early. But the truncated tail holds no checkbox lines, so no count changes and no section string changes. Measured before/after across all 629 archived notes: `CORE-008.md` is byte-identical either way. It is not a regression fixture for anything observable.
  2. **"(renders a false closure-drift chip today)"** — false. `closureDrift` returns `null` for `CORE-008` twice over: its `**Archived:** 2026-04-30` stamp is ≤ `TICK_THROUGH_EFFECTIVE` (`2026-08-01`), and the note is pre-schema and has no `## ✅ Acceptance` section at all, so the Acceptance string is empty. No chip is rendered.

  The claim exists **only** in the PLAN.md line (filed by the `/ft-audit-repo` sweep of 2026-08-08); `grep -rn "false closure-drift" .flowtron/tasknote/archive/` returns nothing. No archived tasknote carries the falsified claim, so **no `⚠️ Superseded by` pointer is owed** at closure. Per SPEC §"Tasknote frontmatter", the correction is recorded here rather than in the PLAN description — that line collapses to a `Completed` stub at closure.

  **What is actually broken today** (measured, not inferred — throwaway probe over 629 archived notes, comparing current scanners against a fence-aware reference):

  | Note | Section | Today | Fence-aware | Cause |
  |---|---|---|---|---|
  | `core/CORE-098.1.md` | Phase 2 | `3/13` | `3/3` | ` ```markdown ` block of 10 example PLAN rows |
  | `fe/FE-033.1.md` | Phase 1 | `7/12` | `7/7` | 5 fenced example checkboxes |
  | `core/CORE-023.md` | Phase 1 | `6/7` | `6/6` | 1 fenced example checkbox |

  Three notes change; the other 626 are unaffected. Every Goal / Acceptance / Subtasks / Starter-context string is unchanged corpus-wide, so the fix carries no rendering risk to existing archives. The user-visible defect is **phantom unticked phase boxes** — a note that closed complete shows an in-progress phase — not a false closure-drift chip.

  Contract cross-reference: SPEC §"Tasknote body shape" and §"The 4-phase workflow" define the phase checklists this counts against; nothing in SPEC speaks to fenced content, so no contract is contradicted. The plan matches the PLAN.md line's *intent* (`Track fenced-code state in tasknote.ts extractSection/countChecklist`).

  Corpus facts that bound the helper: no `~~~` fences, no 4+-backtick fences, and no fence indented ≥4 spaces anywhere in `archive/` — but the helper implements the CommonMark rules anyway (matching delimiter char, closing run ≥ opening run, ≤3-space indent, no backtick in a backtick info string) because it is cheap and the corpus is not the only input.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  - **(a) Scope covers all four scanners, not the two the PLAN line names.** `closureDrift` and `extractStarterSubsections` have the identical defect in the same file — and `closureDrift` is precisely the surface the PLAN line *thought* was broken. Fixing two of four would leave the named symptom genuinely reachable by a future note. The shortname is `fence-aware scanners`, plural.
  - **(b) `parser.ts` (PLAN.md scanning) is out of scope.** Same bug class, different file, and `CORE-421.3` already owns the neighbouring `parser.ts` defect. Not folded in.
  - **(c) Tests use inline fixtures, not live archive files** — matching existing `tasknote.test.ts` style and [[CORE-417]] / [[CORE-416.N]]'s precedent. The real-archive verdict is produced by a throwaway probe that is deleted before closure.
  - **(d) An unclosed fence swallows the rest of the file.** This is CommonMark behaviour and a behaviour change vs today for malformed input. Accepted: no archived note has an unclosed fence, and the alternative (heuristic recovery) is more surface than the bug warrants.
  - **(e) No `Superseded by` pointer is written** — the falsified claim lives in a PLAN.md line, not an archived tasknote (verified by grep).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Why the bug is invisible in the common case.** `extractSection` scopes each phase's count to its own section, and most fenced examples in tasknotes sit in Implementation Notes *after* the phase checklist. The count is only polluted when a fence lands inside the extracted span — which is why 3 notes out of 629 are affected rather than dozens. Low blast radius, but the failure is silent and the direction is always the same: a complete note reads incomplete.

**One incidental finding, not filed.** `parseTasknote` throws on `archive/core/CORE-212.md` (`title: Retire "Pinned to:" from adopter seed surface` — an unquoted YAML scalar with a `: ` inside). `archiveCache.ts:19-28` already catches and silently skips such notes by explicit design, with a comment naming the write-once policy as the reason. Working as intended; no follow-up warranted. Recorded here only so the next reader does not re-derive it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the module's established shape is *pure predicate + module-level regex constant*, and [[CORE-416.3]] set the reuse rule when it added `closureDrift`: consume the existing `CHECKLIST_LINE` "rather than re-declaring one". `fenceMask` is that same move one level up — one module-level regex (`FENCE_DELIMITER`) plus one private helper the four scanners consult, instead of four private fence walks. No new shape introduced; no dependency direction crossed.

- [x] **Minimal refactor gate** — one refactor beyond the literal fence threading: `countChecklist` and `closureDrift` now share a private `structuralChecklistLines(markdown)` walk. Justified under the gate's duplication clause — threading the mask into both would have produced two identical split/mask/exec loops in the touched path, which is exactly the duplication [[CORE-416.3]] avoided at the regex level. Nothing else touched; no unrelated cleanup taken.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**`viz/src/tasknote.ts` (+119 / -38).** Two private helpers and four call-site changes:

- **`FENCE_DELIMITER` + `fenceMask(lines): boolean[]`** — one pass returning a per-line "is this fenced content" mask. Implements the CommonMark rules rather than a naive ` ``` ` toggle: ≤3-space indent, the closing run must be the same character and at least as long as the opening run, a backtick info string may not contain a backtick, and an unclosed fence runs to end-of-input. The corpus needs none of that precision today (no `~~~`, no 4+-backtick, no ≥4-space-indented fence exists in `archive/`) — but the corpus is not the only input, and the rules cost nine lines.
- **`structuralChecklistLines(markdown)`** — the shared "checklist lines that are document structure" walk behind `countChecklist` and `closureDrift`. Both collapse to one-liners over its result.
- **`extractSection` / `extractStarterSubsections`** — heading and `---` checks now sit behind `if (!inFence[i])`. Collection is deliberately *outside* that guard: fenced lines are still pushed verbatim, so section text renders exactly as before. This is what keeps the change invisible to the 626 unaffected notes.

**`viz/src/tasknote.test.ts` (+137).** Eight regression tests, one per scanner plus fence-grammar coverage: `extractSection` (fenced heading/rule does not end a section · tilde + 3-space-indent fences · longer-closing-run rule · unclosed fence runs to EOF), `countChecklist` (fenced rows not counted), `closureDrift` (fenced Acceptance example is not drift), `extractStarterSubsections` (fenced `###` does not switch sub-section), and a `parseTasknote` end-to-end case built from the real `CORE-098.1` shape.

**Deliberately not done.** No export of either helper — they are consumed only inside this module, and [[CORE-416.3]]'s quality assertion treats public-surface growth as a cost. `viz/src/parser.ts` has the same bug class against `PLAN.md` and is untouched: different file, and `CORE-421.3` already owns its neighbouring defect.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test -- tasknote` → 52/52. Full suite `npm --prefix viz test` → **266/266 across 18 files** (258 before; +8 new).

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` (`tsc --noEmit`) clean; `npm --prefix viz run lint` (`eslint src`) clean.

- [x] **Quality assertions** — no avoidable duplication (the change *removes* four independent line walks in favour of one mask + one shared checklist walk); no dead code (both helpers are consumed by all four scanners); no unexplained complexity (the one non-obvious branch — the backtick-in-info-string rule — is named in the comment); no public-surface growth (both helpers are module-private; the exported signatures are byte-identical); no stale code-facing docs (`SPEC.md` describes tasknote structure but says nothing about fenced content, so nothing restates the old behaviour — confirmed in the Phase 4 sweep).

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — asked (open archived `CORE-098.1` in viz, Phase 2 dots should read 3/3); operator waved it through. No rendering code changed: the diff is a pure data-module change and the phase-dot counts it feeds are asserted by unit tests plus the 629-note archive probe.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Real-archive verdict.** Per [[CORE-417]]'s throwaway-probe convention, a temporary `viz/src/zz-probe.test.ts` ran the *shipped* `parseTasknote` against the *pre-fix* scanner implementations inlined verbatim as a baseline, over all 629 archived notes, then was deleted. Result — **exactly the three notes predicted in Discovery change, and nothing else**:

| Note | Section | Before | After |
|---|---|---|---|
| `core/CORE-098.1.md` | Phase 2 | `3/13` | `3/3` |
| `fe/FE-033.1.md` | Phase 1 | `7/12` | `7/7` |
| `core/CORE-023.md` | Phase 1 | `6/7` | `6/6` |

Goal / Acceptance / Subtasks / Starter-context string lengths are identical before and after for **all 627 parseable notes** — the fix cannot change what any archived note renders, only what it counts. (627, not 629: two notes carry YAML frontmatter that `gray-matter` rejects — e.g. `CORE-212.md`'s unquoted `title: Retire "Pinned to:" …`. `archiveCache.ts:19-28` already catches and skips those by explicit design; pre-existing and out of scope.) No `closureDrift` value changed anywhere, confirming Discovery's finding that the PLAN line's chip symptom was not reachable in the current corpus.

**Test-strategy note.** Example-based tests, not property-based: the input space that matters here is *fence grammar*, which is a small closed set of rules (delimiter char, run length, indent, info string, unclosed), each covered by a named case. The wide-input half of the risk is covered instead by the 629-note archive probe above, which is a stronger check than generated inputs would be — it is the actual corpus.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 14/14 no change. `README.md` · `SPEC.md` · `docs/MIGRATION.md` · `claude/AGENTS-snippet.md` · `codex/AGENTS-snippet.md` · `CONTRIBUTING.md` · `SECURITY.md` · `docs/AGENT-NEUTRALITY.md` · `docs/PLATFORMS.md` · `claude/CAPABILITIES.md` · `docs/AGENT-COMPAT.md` · `docs/EXTERNAL-AGENTS.md` · `docs/WORKTREES.md` — none describes viz scanner behaviour; a `grep` for the four function names and "fenced" returns nothing in any of them. `docs/CONVENTIONS.md` — no change, and the one hit is confirming rather than drifting: its §"Markdown flavor" already declares flowtron markdown targets GFM (a CommonMark superset) with "fenced code blocks with language tags" in use, which is precisely the standard `fenceMask` now honours.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Tasknotes quote things that look like tasknotes — example PLAN.md rows, template
bodies, YAML frontmatter — and every line-scanner in `viz/src/tasknote.ts` was
reading that quoted content as if it were the note's own structure. All four now
consult one shared fence mask, so a heading, checkbox, or `---` rule inside a
fenced block is read as the sample text it is.

**Changed files (2).** `viz/src/tasknote.ts` (+119 / -38) — new module-private
`FENCE_DELIMITER` + `fenceMask(lines): boolean[]` implementing the CommonMark
fence rules, plus a shared `structuralChecklistLines` walk; `extractSection`,
`extractStarterSubsections`, `countChecklist`, and `closureDrift` all route
through them. `viz/src/tasknote.test.ts` (+137) — 8 regression tests covering
each scanner and the fence grammar (tilde fences, ≤3-space indent, longer-closing-run,
unclosed-fence-to-EOF).

**Verification.** `npm --prefix viz test` → 266/266 across 18 files (258 before).
`npm --prefix viz run typecheck` and `npm --prefix viz run lint` both clean. A
throwaway probe ([[CORE-417]]'s convention, deleted after use) diffed the shipped
scanners against the pre-fix implementations over all 629 archived notes: exactly
three change — `CORE-098.1` Phase 2 `3/13`→`3/3`, `FE-033.1` Phase 1 `7/12`→`7/7`,
`CORE-023` Phase 1 `6/7`→`6/6` — and every Goal/Acceptance/Subtasks/Starter-context
string is byte-identical across all 627 parseable notes. The fix changes what
notes *count*, never what they *render*.

**Discovery correction (the substantive finding).** The PLAN.md line was wrong on
both of its specifics: `CORE-008.md` is not a regression fixture (its in-fence
headings truncate a section whose tail holds no checkboxes, so nothing observable
changes), and it does not render a false closure-drift chip (`**Archived:**
2026-04-30` is ≤ `TICK_THROUGH_EFFECTIVE`, and the pre-schema note has no
Acceptance section at all). The real defect is phantom *unticked phase boxes* — a
note that closed complete rendering as in-progress. The claim lived only in the
PLAN line, not in any archived tasknote, so no `⚠️ Superseded by` pointer was owed;
it is recorded here because Phase 4 collapses that line to a stub.

**Refactors.** One taken: `countChecklist` and `closureDrift` share
`structuralChecklistLines` rather than each carrying an identical mask walk —
the duplication clause of the minimal-refactor gate, and the same reuse rule
[[CORE-416.3]] applied to `CHECKLIST_LINE`. One deferred by design:
`viz/src/parser.ts` has the same bug class against `PLAN.md`; different file, and
`CORE-421.3` already owns its neighbouring defect.

**Documentation.** 14/14 no change.

**Maintainability effect.** "Which lines are document structure" was answered four
times in this module and asked zero times; it is now asked once. A fifth scanner
added later inherits fence-awareness by calling one helper instead of
re-deriving it — which is exactly how `closureDrift` and `extractStarterSubsections`
inherited the bug in the first place.

**Archived:** 2026-08-09
