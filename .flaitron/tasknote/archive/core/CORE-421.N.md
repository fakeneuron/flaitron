---
title: viz-robustness audit
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-EPIC-421, CORE-421.2, CORE-421.3, CORE-421.4, CORE-421.5]
---

# CORE-421.N | viz-robustness audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-421]]

## 🎯 Goal

Verify the completed `CORE-EPIC-421` (`viz-robustness`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-421.N — audit CORE-EPIC-421` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-421.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-421.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-421` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-421.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-421]] — parent epic (viz-robustness)
- [[CORE-421.2]] — fence-aware scanners
- [[CORE-421.3]] — duplicate-epic guard
- [[CORE-421.4]] — devApi response hardening
- [[CORE-421.5]] — modal-gated keyboard nav

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — parent `CORE-EPIC-421` active under `## Medium`; children `.2` `.3` `.4` `.5` all `[x]`, `.N` the only open row. No open-sibling gate fired.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic` and every pre-flight passed (clean tree, canonical `.N` audit child, no open implementation siblings, no archived conflict). The cohort closed inside a single day (2026-08-09, all four children), which is exactly the condition an audit exists for — four notes written in rapid succession by separate sessions, each doc-drift-sweeping only its own slice.

- [x] Read relevant source files — all four archived cohort tasknotes read in full (`archive/core/CORE-421.{2,3,4,5}.md`); deliverables then verified against HEAD in `viz/src/tasknote.ts`, `viz/src/parser.ts`, `viz/src/devApi.ts`, `viz/src/ui/useKeyboardNav.ts`, and `SECURITY.md`. Read set was known and bounded — no probe needed.

- [x] **Best Practices Review** — N/A for the audit's own diff: the single inline fix is a one-line markdown deletion in an archived tasknote, touching no module boundary, abstraction, or dependency direction. The cohort's *own* boundary decisions were reviewed as part of the coherence pass (Phase 2) rather than here.

- [x] **Archive skim** — largely self-referential (the cohort children *are* the archive entries in scope). Two non-cohort reads earned their keep: [[CORE-353.N]] — a prior epic audit that fixed exactly the stray-`**Archived:** YYYY-MM-DD` defect found here, in an archived sibling, inside the audit commit; that is the precedent Finding A follows. [[CORE-416.2]] / [[CORE-411]] — both previously logged unfilled `Archived:` placeholders (`CORE-255`, `CORE-042.7`) as known, un-actioned archive-hygiene misses, confirming this is a recurring class rather than a one-off.

- [x] **Drift check** — every cohort deliverable confirmed present at HEAD: `FENCE_DELIMITER`/`fenceMask`/`structuralChecklistLines` in `tasknote.ts` (lines 119-273, all four scanners routed); `seenEpicKeys`/`pushedEpicKeys`/`DuplicateEpic`/`GroupTasksResult` in `parser.ts` (139-200); `applyApiHeaders`/`methodGuard` in `devApi.ts` wired ahead of `originGuard` at all five handlers (59-170); the `dialog[open]` guard at `useKeyboardNav.ts:48`. No cited path has moved. SPEC cross-reference: §"Tasknote frontmatter" write-once was read in full before any archived-note edit — its three explicitly-uncovered cases (superseded decision / spec evolution / bulk backfill) do not reach a same-cohort closure-hygiene defect, and [[CORE-353.N]] set the precedent directly.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  - **(a) The missing `.1` is intentional, not a filing gap.** The cohort runs `.2`…`.5` with no `.1`; the parent's PLAN line states "Discovery supplied by audit-repo 2026-08-08", so the epic-Discovery deliverable (the filed child list) was produced by `/ft-audit-repo` rather than a `.1` tasknote. Coherent with `SPEC/epic.md` lifecycle step 2, which names the deliverable, not the vehicle. Not filed as a finding.
  - **(b) Prevalence is measured before anything is called a defect.** Two candidate findings were killed this way rather than filed (see Implementation Notes) — an audit that normalizes archived notes against a convention the repo does not actually keep would be the "bulk backfill" write-once explicitly forbids.
  - **(c) Cosmetic divergence is reported, not edited.** Retroactively restyling an archived note is the spec-evolution case write-once protects; a contemporaneous contract breach is not.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort inventory** (all four closed 2026-08-09, all four green on test/lint/typecheck at their own closure):

| Child | Deliverable | Surface |
|---|---|---|
| `.2` fence-aware scanners | `fenceMask` + `structuralChecklistLines`; all four `tasknote.ts` line-scanners route through them. 8 regression tests; 629-note throwaway probe confirmed exactly 3 archived notes change count, 0 change render | `viz/src/tasknote.ts` (+119/-38), `tasknote.test.ts` (+137) |
| `.3` duplicate-epic guard | `groupTasks` first-write-wins guard on both passes; return shape grew to `{ nodes, duplicateEpics }` with an `App.tsx` badge/strip mirroring the existing `unparsed` diagnostic | `parser.ts` (+34/-5), `App.tsx` (+22/-1), 2 test files (+90/-10) |
| `.4` devApi response hardening | `applyApiHeaders` + `methodGuard` ahead of `originGuard` on all five handlers; nosniff + `default-src 'none'` on every `/api/*` response incl. error paths; 405 + `Allow` | `devApi.ts` (+27+10), `devApi.test.ts`, `SECURITY.md` |
| `.5` modal-gated keyboard nav | One-line `dialog[open]` early-return at the top of the keydown handler, inerting every shortcut (not just Escape) while a modal is open | `useKeyboardNav.ts:48`, `App.test.tsx` |

**Cohort shape.** Two of the four (`.2`, `.3`) are the same bug family — line-scanners reading quoted content as document structure — split across the two files that do the scanning (`tasknote.ts`, `parser.ts`). `.4` and `.5` are independent hardening/UX fixes that share only the `viz/` address. That split is what produced the one substantive finding below: the family was fixed in one file and left in the other.

**Cross-child forward references.** `.2`'s Implementation Notes and `.3`'s Discovery + Final Summary *both* flag `viz/src/parser.ts` fence-unawareness and both explicitly defer it to "the `.N` audit." That is the cohort handing this audit a named item, and it is Finding E.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the audit's own change is a single markdown deletion, so the survey that mattered was *procedural*: [[CORE-353.N]] established that an epic audit fixes a stray `**Archived:** YYYY-MM-DD` in a cohort sibling inline, inside the audit commit, rather than filing it. Followed exactly.

- [x] **Minimal refactor gate** — no refactor. One deletion; nothing adjacent touched.

- [x] Implemented the minimal solution — verification pass over the cohort, one inline fix applied, one follow-up logged.

- [x] Updated/added tests for non-trivial behavior — N/A; no code changed. Regression coverage for the cohort is the existing 279-test suite, re-run green (Phase 3).

**Implementation Notes:**

### Findings

**A — `CORE-421.4.md` carried two `**Archived:**` lines. Fixed inline.**
The real stamp (`2026-08-09`, L132) was written *above* the template's placeholder rather than replacing it, leaving `**Archived:** YYYY-MM-DD` at L134. No functional impact — `ARCHIVED_STAMP` in `tasknote.ts:246` is a non-global `/m` regex consumed by `.exec`, so `extractArchivedDate` takes the first match and closure-drift computes correctly — but it is a closure-hygiene defect against the note's own contemporaneous contract, and it is the fourth instance of this class in the archive (`CORE-255`, `CORE-042.7`, `CORE-353.6`, now this). Deleted the placeholder line, per [[CORE-353.N]]'s precedent. `.2`, `.3`, `.5` each carry exactly one stamp.

**E — `viz/src/parser.ts` has no fence-awareness. Follow-up candidate.**
The gap `.2` and `.3` both deferred here, confirmed open: `grep -n "fence" viz/src/parser.ts` returns zero hits, so `parsePlanWithDiagnostics` scans raw PLAN.md lines with no mask. A task row quoted inside a fenced block in a PLAN.md would be parsed as a real task — the same defect class `.2` closed in `tasknote.ts`, in the one file it deliberately left alone.

Dormancy re-measured fleet-wide rather than inherited from `.3`'s narrower check: **zero fenced blocks in any `.flowtron/PLAN.md` across every adopter under `~/code`**, plus flowtron's own PLAN.md and `templates/PLAN.md`. So the gap is real but unreachable today by any live input. That is precisely why it warrants a filed ticket instead of an inline fix — it is invisible, it will stay invisible until someone documents a task-line example in a PLAN.md, and the cohort has now twice written down that someone should look at it. Low priority, `[light]🔧` — the helper it needs already exists one module away.

**F — `CORE-421.3`'s reported test baseline does not reconcile with `.2`'s. Recorded, no pointer appended.**
`.2` closed at "266/266 across 18 files (258 before; +8 new)". `.3` then reports "273/273 across 18 files (**270 before; +3 new**)". `git log 96a77e7..05b619b` shows no commit between them, so 266 and 270 cannot both describe the same tree. `.3`'s figure is the wrong one, and it is also inconsistent with `.3`'s *own* Implementation Notes, which enumerate 4 new `parser.test.ts` cases + 3 new `App.test.tsx` cases = **7** new tests, not 3. A static `it(`/`test(` count across `viz/src/**/*.test.*` at each cohort commit gives deltas of +7 / +5 / +1 for `.3` / `.4` / `.5`, matching each note's *enumerated* tests (`.4`'s "10 new" is 5 new cases plus 5 assertions folded into existing ones, as its own note says).

So the **total** `.3` reported (273) is correct and every child's enumerated test work is real and present; only `.3`'s parenthetical decomposition is wrong. No code, coverage, or verification claim is affected — the suite is green at 279 and each child's tests exist as described.

**Disposition: recorded here, no `⚠️ Superseded by` pointer appended to `.3`.** SPEC §"Tasknote frontmatter" reserves that append-only pointer for a falsified factual claim someone might act on; a stale parenthetical inside a superseded test-count gloss is not re-derived by any future reader, and the carve-out is explicitly narrow. Stating the disposition rather than silently skipping it, since a later audit reading this cohort will hit the same 266-vs-270 mismatch.

### Non-findings (measured, not assumed)

**B — `CORE-421.3`'s six Subtasks are all unticked.** Looks like a closure miss; is not. Measured across the archive: **290 of 521** notes with a Subtasks section (56%) leave it fully unticked, including the immediately-prior cohort. Ticking Subtasks is de facto optional in this repo, and SPEC's Phase 4 checklist requires ticking `## ✅ Acceptance`, which `.3` did in full with per-criterion evidence. Filing this would have been a bulk-backfill normalization against a convention the repo does not keep.

**C — `CORE-421.5`'s Phase 3 frontend box is `[ ]` with an `N/A` annotation.** SPEC §"🚀 Phase 4: Closure" permits exactly this ("ticked **or** explicitly annotated (`N/A` / not-met with a one-line reason)") and `.5`'s annotation carries its reason. 11 archived notes use the same form, two of them in the prior cohort. Compliant as written.

**D — `CORE-421.5`'s title is `Modal-gated keyboard nav`; siblings and its PLAN line are lowercase.** A genuine one-character divergence from the cohort's naming (`fence-aware scanners`, `duplicate-epic guard`, `devApi response hardening` all match their PLAN shortname exactly). Reported, not edited: SPEC §"Task-line format" imposes no casing rule, the visualizer's row title comes from the PLAN `| shortname` (which is already correct), and retroactively restyling an archived note for consistency is the spec-evolution case write-once exists to prevent. Recording it here is the correct disposition.

### Coherence verdict

No contradictions across the cohort's deliverables. Naming is consistent (`fenceMask`/`structuralChecklistLines`, `seenEpicKeys`/`pushedEpicKeys`, `applyApiHeaders`/`methodGuard` all read as one hand). Each child extended an established in-repo pattern rather than inventing one, and each said so: `.2` followed [[CORE-416.3]]'s reuse rule, `.3` mirrored the existing `unparsed` diagnostic UI rather than reaching for `console.warn`, `.4` extended the per-handler guard-clause chain and kept origin logic in `originGuard.ts`, `.5` reused the handler's existing early-return style. Public-surface growth is confined to `.3`'s `DuplicateEpic`/`GroupTasksResult` pair, which the diagnostic requires. No regressions in earlier children's surfaces — all four deliverables verified live at HEAD, full suite green.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A for the audit's own diff (one markdown line deleted from an archived note). Ran the full suite anyway as the cohort-regression check Acceptance criterion 3 requires: `npm --prefix viz test` → **279/279 across 18 files, 0 failures**. No child's tests regressed under a later child's changes. Attempting to reconcile that total against the four children's self-reported counts surfaced Finding F (below).

- [x] Ran lint/type-check on changed code — N/A; no code changed and no markdown linter is configured. `git status --porcelain` confirms only the intended files.

- [x] **Quality assertions** — N/A for the audit's own diff (a deletion introduces no duplication, dead code, complexity, or public surface). The equivalent assertions *over the cohort* are the coherence verdict in Implementation Notes.

- [x] (frontend) N/A — no UI surface touched by this audit. The cohort's own frontend changes were visually confirmed at their closures: `.3` live-verified the duplicate-epic badge/strip in the dev server against a temporary duplicate PLAN line (reverted, `git diff` clean); `.5` is a keyboard-event guard with no render change, covered by a regression test verified genuine via stash-revert.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — cumulative sweep across all 14 `.flowtron/tasknote/README.md` §"AI-referenced docs" entries, run as a grep for every surface the cohort touched (`groupTasks`, `useKeyboardNav`, `devApi`, `originGuard`, `fenceMask`, `extractSection`, `countChecklist`, `closureDrift`, `duplicate epic`, `nosniff`, `dialog[open]`) plus a read of the one hit:

  - `README.md` — no change
  - `SPEC.md` — no change (describes tasknote structure; says nothing about fenced content or viz internals)
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change; §"Markdown flavor" already declares GFM with fenced code blocks, which is the standard `.2`'s `fenceMask` honours — confirming, not drifting
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — **no further change; verified accurate.** `.4` updated §"Visualizer (`viz/`) dev-server scope" and this audit re-read it against HEAD: the 405-rejection bullet, the per-`/api/*` `default-src 'none'` CSP, and `X-Content-Type-Options: nosniff` all match `devApi.ts`'s `applyApiHeaders`/`methodGuard`, including the "set ahead of any guard clause" claim (both helpers precede `originGuard` at all five handlers). The doc correctly distinguishes the per-API CSP from the global HTML-page CSP in `vite.config.ts`.
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change
  - `docs/EXTERNAL-AGENTS.md` — no change
  - `docs/WORKTREES.md` — no change

  13/14 no change, 1 verified-accurate. The cohort was overwhelmingly `viz/`-internal, and `viz/` internals are deliberately absent from the contract-layer docs — the one doc that *does* describe a cohort surface (`SECURITY.md`) was correctly updated by the child that changed it.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and kept nested beneath `CORE-EPIC-421`, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary

**Final Summary:**

Audited the four-child `CORE-EPIC-421` (`viz-robustness`) cohort — all closed 2026-08-09 — for cumulative doc drift, cross-child coherence, and regressions. **The cohort is coherent and the code is sound:** all four deliverables verified live at HEAD, full viz suite green at **279/279 across 18 files**, no contradictory cross-refs, and every child extended an established in-repo pattern rather than inventing one.

**Findings: one inline fix, one follow-up, one recorded discrepancy.**

- **Fixed inline** — `archive/core/CORE-421.4.md` carried two `**Archived:**` lines: the real `2026-08-09` stamp was written above the template placeholder instead of replacing it. No functional impact (`ARCHIVED_STAMP` is a non-global `/m` regex, so `extractArchivedDate` takes the first match), but it is the fourth instance of this class in the archive. Deleted the placeholder, following [[CORE-353.N]]'s precedent of fixing exactly this defect in a cohort sibling inside the audit commit.
- **Follow-up owed** — `viz/src/parser.ts` still has no fence-awareness, the gap `.2` and `.3` *both* explicitly deferred to this audit. Confirmed open (zero `fence` hits), and confirmed genuinely dormant by a fleet-wide re-measure: **zero fenced blocks in any `.flowtron/PLAN.md` across every adopter under `~/code`**, plus flowtron's own PLAN.md and `templates/PLAN.md`. Real but currently unreachable — which is the argument for a filed ticket rather than an inline fix.
- **Recorded, no pointer** — `.3`'s test baseline ("270 before; +3 new") cannot be reconciled with `.2`'s closing 266 (no commit sits between them) and contradicts `.3`'s own enumeration of 7 new tests. Its *total* (273) is correct and all enumerated tests exist; only the parenthetical is wrong. Declined to append a `⚠️ Superseded by` pointer — SPEC reserves that for a falsified claim someone might act on.

**Two candidate findings killed by measurement, deliberately not filed.** `.3`'s fully-unticked Subtasks section looks like a closure miss until you count: **290 of 521** archived notes (56%) leave Subtasks fully unticked, so ticking them is de facto optional here and filing it would have been the bulk-backfill normalization write-once forbids. `.5`'s `[ ]`-with-`N/A` Phase 3 box is explicitly permitted by SPEC's "ticked **or** explicitly annotated" clause and appears in 11 archived notes including two in the prior cohort. A third, `.5`'s `Modal-gated` title casing diverging from its lowercase siblings, is real but cosmetic — reported, not edited, since the visualizer's row title comes from the PLAN `| shortname` (already correct) and retroactively restyling an archived note is precisely the spec-evolution case write-once protects.

**Changed files (2 + closure).** `.flowtron/tasknote/archive/core/CORE-421.4.md` (−2 lines: stray placeholder), `.flowtron/PLAN.md` (audit line → stub; parent flip per operator decision), plus this tasknote archived.

**Verification.** `npm --prefix viz test` → 279/279, 0 failures. Lint/typecheck N/A (no code changed). Cohort deliverables confirmed at HEAD by direct grep: `fenceMask`/`structuralChecklistLines` (`tasknote.ts:119-273`), `seenEpicKeys`/`pushedEpicKeys`/`GroupTasksResult` (`parser.ts:139-200`), `applyApiHeaders`/`methodGuard` ahead of `originGuard` at all five handlers (`devApi.ts:59-170`), `dialog[open]` guard (`useKeyboardNav.ts:48`).

**Documentation.** 13/14 no change; `SECURITY.md` verified accurate against `devApi.ts` rather than merely assumed.

**Maintainability effect.** The epic's headline achievement is that "which lines are document structure" is now asked once instead of four times in `tasknote.ts` — but the same question is still asked zero times in `parser.ts`, and this audit is the second document in a row to say so. That asymmetry is the whole content of the follow-up: the cohort fixed a bug family in one of the two files that has it.

**Archived:** 2026-08-09
