---
title: viz near-miss diagnostics audit
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-EPIC-425, CORE-425.2, CORE-425.3, CORE-425.4]
---

# CORE-425.N | viz near-miss diagnostics audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-425]]

## 🎯 Goal

Verify the completed `CORE-EPIC-425` (viz near-miss diagnostics) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `chore: CORE-425.N — audit CORE-EPIC-425` commit lands
- [x] PLAN.md line for `CORE-425.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-425.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-425` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-425.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-425]] — parent epic (viz near-miss diagnostics)
- [[CORE-425.2]] — Escape precedence fix
- [[CORE-425.3]] — near-miss heading diagnostic
- [[CORE-425.4]] — devApi error hygiene

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-425.N`; Step 2 pre-flight passed. All three implementation children (`.2`, `.3`, `.4`) are `[x]` and archived — full cohort, no early-audit decision required. `.N` is the reserved terminal audit suffix and the epic's only open child.

- [x] Read relevant source files — read all three archived cohort tasknotes (`archive/core/CORE-425.{2,3,4}.md`) end-to-end, plus the live deliverables they claim at HEAD: `viz/src/ui/useKeyboardNav.ts`, `viz/src/parser.ts`, `viz/src/ui/App.tsx`, `viz/src/apiResponse.ts`, `SECURITY.md`

- [x] **Best Practices Review** — N/A for the audit's own diff (no new code surface; the audit is a verification pass). The cohort-level equivalent is folded into the coherence pass in Phase 2.

- [x] **Archive skim** — self-referential for an epic audit (the cohort children *are* the archive entries). Extended one hop: read `CORE-424.N` (the immediately preceding audit, same audit-repo filing wave) to check the audit's own shape against its most recent precedent.

- [x] **Drift check** — every path and symbol the cohort children cite verified present at HEAD (see Discovery Notes). No cited surface moved during the cohort.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **No clarifications needed.** Cohort scope is unambiguous: three implementation children, all closed, all archived, no deferrals.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort inventory (3 implementation children, all closed 2026-08-09).**

- **[[CORE-425.2]] — Escape precedence fix** (`fix:` @ `107e483`). Gated `useKeyboardNav`'s Escape collapse branch on `visibleIds.includes(expandedId)` so a stale `expandedId` no longer consumes the keypress with no visible change (+4 LOC). Delivered the cohort's test deliverable too: new `viz/src/ui/useKeyboardNav.test.ts` (157 LOC, 8 cases) pinning every rung of the Escape precedence chain. Revert-verified — stashing only the guard failed exactly the 3 stale-`expandedId` cases.
- **[[CORE-425.3]] — near-miss heading diagnostic** (`fix:` @ `6b9b357`). A `## heading` that case-insensitively matches a `Priority` name now collects a `NearMissHeading` diagnostic (`{ line, heading, matched }`) instead of silently zeroing `currentPriority`. Threaded `parser.ts` → `useProjectData.ts` → `App.tsx` badge + warning strip. Diagnostic-only by operator decision: tasks under the near-miss heading still drop. 5 files, 6 new tests.
- **[[CORE-425.4]] — devApi error hygiene** (`fix:` @ `7ad18ac`). New leaf module `viz/src/apiResponse.ts` exporting `endPlain(res, status, body)`; eleven inline status-plus-end pairs across `devApi.ts` (8) and `originGuard.ts` (3) converted, so every `/api/*` error body declares `Content-Type: text/plain; charset=utf-8`. `projectFromQuery` stopped reflecting the caller's `?project=` value, logging it to stderr instead ([[FE-047]] precedent). `SECURITY.md` §"Visualizer (`viz/`) dev-server scope" updated in-cohort.

**Drift check — all cohort claims verified live at HEAD, not recalled:**

| Claim | Verified |
|---|---|
| `useKeyboardNav.ts` Escape guard | `viz/src/ui/useKeyboardNav.ts:57` — `expandedId !== null && visibleIds.includes(expandedId)`, 3-line comment naming all three stale routes |
| `NearMissHeading` diagnostic | `viz/src/parser.ts:254` (type), `:266` (result field), `:270` (`LOWERCASE_TO_PRIORITY`), `:331-333` (collection), `:376` (return) |
| `endPlain` leaf module | `viz/src/apiResponse.ts` — 13 LOC, single export, header comment records the `nosniff` rationale + acyclic-import reason |
| `SECURITY.md` update | `SECURITY.md:153-162` — typed-error-body bullet + never-reflect-request-input bullet, both present and accurate |

**Precedent check — `CORE-424.N`.** Same-wave audit; confirms the audit shape used here (title `<shortname> audit`, `related-tasks` = parent + all implementation children, `chore:` commit prefix when no code lands) and confirms the `.2`-start child numbering discussed in Phase 2.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A for the verification pass itself. One inline correction landed (Finding 1 below); its "pattern" is simply matching the two sibling tasknotes' own closure hygiene.

- [x] **Minimal refactor gate** — no refactor. One archived-artifact correction, scoped to the exact defect found.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A; no behavior changed. Cohort test coverage re-verified green instead (Phase 3).

**Implementation Notes:**

### Coherence pass

**Diagnostic-triad parity — clean.** `.3`'s new `nearMissHeadings` diagnostic sits alongside the two pre-existing ones with no divergence. `viz/src/ui/App.tsx` now carries three badges (`:327`, `:332`, `:337`) and three warning strips (`:418`, `:435`, `:450`), each following the identical shape: `⚠ N <label>` badge with singular/plural handling, then a strip with a summary line and a mapped list. `.3` explicitly pattern-matched [[CORE-421.3]]'s `duplicateEpics` work rather than inventing a third mechanism, and the result reads as one system — a reader cannot tell from `App.tsx` which of the three shipped last.

**Naming parity — clean.** The diagnostic types form a consistent family: `UnparsedLine` / `DuplicateEpic` / `NearMissHeading`, each an exported interface carrying a 1-based `line`, each surfaced as a plural array field on its producer's return shape (`unparsed` / `duplicateEpics` / `nearMissHeadings`). `.4`'s `endPlain` / `apiResponse.ts` follows the existing `fsSafe.ts` leaf-util precedent rather than the diagnostics family — correct, different concern.

**No contradictory cross-refs.** `.4`'s `SECURITY.md` edit extends [[CORE-421.4]]'s existing claim ("set ahead of any guard clause so even 403/400/405/500 error bodies carry them") rather than restating or contradicting it — the new bullets sit directly beneath it and close the `Content-Type` asymmetry that sentence left open. Verified by reading `SECURITY.md:139-162` as one block. `.2` and `.3` cite each other and their shared parent correctly; no stale sibling reference anywhere in the cohort.

**Cohort surface separation — no overlap.** The three children touched disjoint file sets (`useKeyboardNav.*` / `parser.ts`+`useProjectData.ts` / `devApi.ts`+`originGuard.ts`+`apiResponse.ts`), with `App.tsx` touched only by `.3`. No child re-edited another's lines, so there is no last-writer-wins risk to check.

### Findings

**Finding 1 — `CORE-425.3`'s archived Subtasks block left fully unchecked. Fixed inline.**
All six `## 🧩 Subtasks` entries in `archive/core/CORE-425.3.md` read `- [ ]` while every Acceptance criterion was ticked with evidence and the work demonstrably shipped at `6b9b357`. Siblings `.2` and `.4` both closed with `[x]` subtasks. The archived note therefore misrepresented itself as unfinished work. Corrected to `- [x]` — small, unambiguous (each subtask maps 1:1 to a verified deliverable in the same commit), and squarely the "stale reference in a sibling's deliverable" case the audit is meant to fix inline. No prose altered.

**Finding 2 — the epic's fourth scoped item shipped inside `.2`, not as its own child. No miss.**
`CORE-EPIC-425`'s PLAN description names four items but the epic has three implementation children, which reads as a dropped scope item on a quick pass. It isn't: "dedicated keyboard-nav coverage" is `viz/src/ui/useKeyboardNav.test.ts` (157 LOC, 8 cases), delivered by `.2` as its fourth Acceptance criterion. Folding it in was right — the test *is* the regression check for `.2`'s guard, and splitting it into a separate child would have shipped the fix unverified. Recorded here so the audit trail doesn't leave a phantom fourth child.

**Finding 3 — `.2`-start numbering (no `.1` Discovery child) is convention, not drift.**
`SPEC/epic.md` files Discovery as `.1`, and this epic's children begin at `.2`. That is deliberate: the PLAN line records "Discovery supplied by audit-repo 2026-08-09" — `/ft-audit-repo` did the scoping, so no Discovery child was filed and the numbering leaves `.1` vacant rather than renumbering. `CORE-EPIC-424`, filed in the same audit-repo wave, has the identical `.2`/`.3`/`.4`/`.N` shape. Two epics agreeing makes this an established local convention. No action; noted so a future reader doesn't file a "missing `.1`" ticket.

**No follow-up filings owed.** Finding 1 was fixed inline; Findings 2 and 3 are recorded observations with nothing to fix. No `/ft-file-followup` candidates.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — N/A for the audit's own diff: the only content change is six checkbox characters in an archived markdown tasknote. No code, no duplication, no surface growth.

- [x] (frontend) Asked the user for visual confirmation — **N/A.** The audit renders nothing. `.3`'s badge/strip UI and `.4`'s error paths were each live-verified by their own child (screenshot and `curl -D -` respectively); re-confirming unchanged surfaces would be ceremony.

**Testing Notes:**

Regression check across the whole cohort's surfaces, run against HEAD before any audit edit:

- `npm --prefix viz test` → **300 passed across 19 files** — matches `.4`'s closing count exactly (283 pre-cohort → 291 after `.2` → 297 after `.3` → 300 after `.4`). No test disturbed by a later sibling.
- `npm --prefix viz run typecheck` → clean.
- `npm --prefix viz run lint` → clean.

The count arithmetic is itself the no-regression evidence: each child's reported delta is additive and the total reconciles, so no sibling silently dropped or rewrote another's assertions. The audit's own edit touches no code, so no re-run was required after it.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and kept nested beneath its parent, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Doc-drift sweep — all 14 AI-referenced entries walked.** Method: `grep -rlniE 'useKeyboardNav|expandedId|nearMiss|near-miss|parsePlanWithDiagnostics|endPlain|apiResponse|devApi|originGuard|Escape'` across the roster → 3 hits, each read in context.

- **`SECURITY.md` — no change needed (updated in-cohort by `.4`).** `:153-162` carries the typed-error-body and never-reflect-request-input bullets; both verified accurate against `viz/src/apiResponse.ts` and `devApi.ts` at HEAD. The cohort's one doc surface, already current.
- **`SPEC.md` — no change.** Two hits, both unrelated to the cohort: `:218` ("surface in the `parsePlanWithDiagnostics` diagnostics otherwise") concerns decorative task-line tolerances, and `:238` concerns legacy label lines. Both describe *task-line* grammar; `.3` changed *heading* recognition, which neither sentence addresses. Confirmed still accurate as written — and correctly silent, since `.3` was diagnostic-only and introduced no new authoring tolerance to document.
- **`docs/AGENT-NEUTRALITY.md` — no change.** Two hits, both false positives on the word "escape" in "escape hatch" (`:52`, `:53`), unrelated to the Escape key.
- **No change** to the remaining 11: `README.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`. None describes viz internals — the visualizer is carved out of the workflow contract (`SPEC.md` §"What flowtron does NOT provide"), which is why a three-child viz epic lands on exactly one doc surface. `claude/CAPABILITIES.md`'s last-verified stamp is a version-bump obligation, not a per-epic one; no bump in this cohort, so not touched.

**Final Summary:**

Audited the closed `CORE-EPIC-425` cohort. The three children hold together well — one artifact-hygiene defect found and fixed inline, no code issues, no follow-ups owed.

- **Cohort verified live, not recalled.** Every deliverable each child claims was read at HEAD: the Escape guard (`useKeyboardNav.ts:57`), the `NearMissHeading` diagnostic chain (`parser.ts:254-376`), the `endPlain` leaf module (`apiResponse.ts`), and `.4`'s `SECURITY.md` bullets (`:153-162`). All present and accurate.
- **No regressions.** `npm --prefix viz test` → **300/300 across 19 files**; typecheck and lint clean. The per-child test-count deltas reconcile exactly (283 → 291 → 297 → 300), which is the evidence that no sibling disturbed another's assertions.
- **Coherence: clean.** `.3`'s `nearMissHeadings` slots into the existing diagnostic family without divergence — three badges and three warning strips in `App.tsx` with identical shape, and a consistent `UnparsedLine`/`DuplicateEpic`/`NearMissHeading` type family. `.4`'s `SECURITY.md` edit extends [[CORE-421.4]]'s adjacent claim rather than contradicting it. The children touched disjoint files, so no last-writer-wins risk existed.
- **Finding 1 (fixed inline).** `archive/core/CORE-425.3.md` closed with all six Subtasks still `- [ ]` while its Acceptance was fully ticked and the work shipped at `6b9b357` — the archived note read as unfinished. Ticked to match reality; siblings `.2` and `.4` were already correct. Prose untouched.
- **Finding 2 (no miss).** The epic's PLAN line names four items against three children, which looks like a dropped item but isn't: "dedicated keyboard-nav coverage" shipped inside `.2` as `useKeyboardNav.test.ts` (157 LOC, 8 cases). Folding it in was the right call — the test is the regression check for `.2`'s own guard.
- **Finding 3 (convention, not drift).** Children start at `.2` with `.1` vacant because `/ft-audit-repo` supplied the Discovery. `CORE-EPIC-424` from the same filing wave has the identical shape, making this an established local convention rather than a missing child.
- **Documentation.** All 14 AI-referenced docs walked; **no change** to any. `SECURITY.md` was the cohort's single doc surface and `.4` already updated it. `SPEC.md`'s two `parsePlanWithDiagnostics` mentions concern task-line grammar, not heading recognition — accurate as written and correctly silent, since `.3` added no new authoring tolerance.
- **Follow-ups.** None. The one defect was in-scope and fixed inline.

**Archived:** 2026-08-09
