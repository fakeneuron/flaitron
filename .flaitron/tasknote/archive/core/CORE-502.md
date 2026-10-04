---
title: glyph-marker-ordering
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: [CORE-494]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-502 | glyph-marker-ordering

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-494]]

## 🎯 Goal

Stop `[xheavy]🔭 [unattended]` — a model token carrying its suggestion glyph followed by `[unattended]` — from failing `TASK_LINE` and dropping the whole PLAN row.

## ✅ Acceptance

- [x] `viz/src/parser.ts` parses `[model]<glyph> [unattended]` — the glyph is accepted on **either** side of the trailing-token run, and `[unattended]` in that run still sets `Task.unattended: true`
- [x] The currently-parsing shape `[model] [unattended]<glyph>` still parses (no regression; `parser.test.ts:278` stays green unmodified)
- [x] No capture-group renumbering — both glyph fragments stay non-capturing, so `parseTaskLine`'s destructure is untouched
- [x] `SPEC.md` §"Task-line format" tolerance bullet states the glyph may sit on either side of the trailing-token run
- [x] Parser tests pin both orderings plus the `[!critical]`-after-glyph tolerance
- [x] `npm --prefix viz test`, `run typecheck`, and `run lint` all green

## 🧩 Subtasks

- [x] Add `SUGGESTION_GLYPH_AFTER = SUGGESTION_GLYPH` (mirroring the existing `CRITICAL_FLAG_AFTER` precedent) and concatenate `SUGGESTION_GLYPH` before `TRAILING_TOKENS`, keeping `SUGGESTION_GLYPH_AFTER` in its current slot
- [x] Update the `parser.ts` header comment: the FE-084 fragment-order invariant listing and tolerance item 2
- [x] Update `SPEC.md` §"Task-line format" glyph tolerance bullet
- [x] Add parser tests for `[xheavy]🔭 [unattended]` and the space-separated variant
- [x] Run test / typecheck / lint
- [x] Phase 4 doc-drift sweep + closure

## 🔗 Related

- [[CORE-494]] — related-decision: filed the `[unattended]` marker grammar + mis-authoring footguns this task extends

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Reproduced against HEAD by reading the fragment order at `viz/src/parser.ts:116-127` — `SUGGESTION_GLYPH` (line 123) is concatenated *after* `TRAILING_TOKENS` (line 122), so a glyph sitting between `[model]` and a trailing token leaves the trailing token unconsumable. The gap is live and unaddressed.

- [x] Read relevant source files — `viz/src/parser.ts` (header comment block + fragment declarations + `TASK_LINE` composition + `parseTaskLine` destructure), `viz/src/parser.test.ts` (glyph + trailing-token blocks), `SPEC.md` §"Task-line format" (grammar line, segment table, tolerances, footguns). Narrow, known read set — no probe needed.

- [x] **Best Practices Review** — `parser.ts` is SPEC's declared canonical grammar reference. The change belongs in the same composed-fragment shape the file already uses; the file already carries an exact precedent for a fragment that must be matchable in two positions (`CRITICAL_FLAG_AFTER = CRITICAL_FLAG`, FE-087). Reusing that shape means no new idiom, no capture-group renumbering, and no second pass over the line. No refactor required; nothing adjacent needs cleanup.

- [x] **Archive skim** — 20 archived notes touch `viz/src/parser.ts`. Load-bearing hits: **FE-066** introduced the suggestion-glyph tolerance and the stacked-`[model]` run; **FE-084** composed `TASK_LINE` from named fragments and pinned the invariant that *fragment declaration order must match concatenation order* (so this task must move the declaration, not just the concatenation); **FE-087** added `CRITICAL_FLAG_AFTER` — the two-position-fragment precedent this task copies — and kept it non-capturing-adjacent so group numbering held; **CORE-494** made `TRAILING_TOKENS` capturing for `[unattended]` and is the note that put the glyph and the marker in conflict. No prior note decided the glyph must sit after the token run; the ordering is incidental to FE-066 predating CORE-494 by many releases.

- [x] **Drift check** — every cited fact re-read at HEAD, and one correction recorded below. `SUGGESTION_GLYPH` is `viz/src/parser.ts:112`, concatenated at `:123` after `TRAILING_TOKENS` at `:122` — matches the PLAN line's root-cause claim exactly. The plan contradicts no SPEC contract: §"Task-line format" declares the grammar additive and lists the glyph as a *decorative tolerance*, so widening where the tolerance is accepted stays inside that contract rather than changing canonical authoring grammar.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Explicit assumptions: (1) the PLAN line's second option ("move the glyph fragment before the token run") is taken as *intent*, not as a literal instruction — see the regression finding below; (2) canonical authoring grammar is unchanged, so no example row anywhere gains a glyph and the `[unattended]` footguns subsection gains no third entry (with the fix there is no third footgun to name); (3) scope is the two surfaces the PLAN line names — parser + SPEC — plus their tests; (4) `SPEC.md`'s `Version:` header is release-managed by `/ft-release` and is not bumped here.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Root cause confirmed by trace.** For `- [ ] **X** [xheavy]🔭 [unattended] | s — d`: `MODEL_TOKEN` takes ` [xheavy]`; `TRAILING_TOKENS` (`(?:\s+\[[a-z][\w.-]*\])*`) sees `🔭` next and matches the empty run; `SUGGESTION_GLYPH` eats `🔭`; then ` [unattended]` can be consumed by nothing downstream — `SHORTNAME` needs `\s+\|`, `LONG_DESCRIPTION` needs `\s+—`. No backtracking path rescues it: `TRAILING_TOKENS` is the only fragment that consumes bracket tokens and it sits *before* the glyph. The line fails `TASK_LINE`, falls through to the `CHECKBOX_BULLET` + emphasis check, and surfaces in `parsePlanWithDiagnostics().unparsed` — dropped from the task list, but not silent in flowtron's own reader (the same distinction CORE-494 drew for `[!unattended]`; adopter readers without a diagnostics channel are where the drop goes silent).

- **The PLAN line's second option regresses, taken literally.** Moving `SUGGESTION_GLYPH` *before* `TRAILING_TOKENS` would fix `[xheavy]🔭 [unattended]` and break `[xheavy] [unattended]🔭` — which is not hypothetical: `viz/src/parser.test.ts:278` pins `[!critical] [fable] [light] [unattended]🔧` as a passing mixed-decoration row, landed by CORE-494. A move swaps one broken ordering for another. Accepting the glyph on **either** side of the run fixes the reported shape with no regression, and is the resolution this task takes.

- **Why the fix is nearly free.** `SUGGESTION_GLYPH` is non-capturing and optional, so emitting it in two slots adds no capture group, shifts no group index, and leaves `parseTaskLine`'s destructure untouched. `CRITICAL_FLAG_AFTER = CRITICAL_FLAG` (FE-087) is the same move already in this file, so the shape is established rather than invented. Cost is one fragment alias, one concatenation slot, and two comment lines.

- **Neighbouring tolerances re-checked against the new order.** `[medium]🧩 [!critical]` (`parser.test.ts:479`) still parses — `[!critical]` never matched `TRAILING_TOKENS` (the `!` fails `[a-z]`), so it still lands in `CRITICAL_FLAG_AFTER`. The leading status-glyph and stacked-`[model]` tolerances are upstream of the change and unaffected.

- **One PLAN-line stat correction.** The line reports "61 of 84 open rows across the ~/code fleet carry a glyph." A scan at HEAD over the 23 `~/code/*/.flowtron/PLAN.md` files counts **47 of 138** open rows carrying one — caobunga's figure was presumably taken over a narrower repo set at the v5.22.0 pin bump. The correction does not touch the finding: glyphs are widespread (≈1 open row in 3), which is what makes the ordering worth fixing rather than documenting. Not a factual claim in an archived tasknote, so no ⚠️ `Superseded by` pointer is owed.

- **No live occurrence in the fleet.** A scan for the failing shape (`<glyph> [`) across the same 23 PLAN files returns only CORE-502's own row, where the sequence appears inside the long description and parses fine. This is a latent footgun being closed before it bites, not an active outage — which is also why no adopter PLAN.md needs repair as part of this task.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the file's own established shape rather than inventing one. `CRITICAL_FLAG_AFTER = CRITICAL_FLAG` (FE-087) is an exact precedent for a fragment that must match in two positions, so `SUGGESTION_GLYPH_AFTER = SUGGESTION_GLYPH` reads as the same idiom to the next reader. The FE-084 invariant (declaration order == concatenation order) was honoured by moving the `SUGGESTION_GLYPH` declaration, not just its concatenation slot. No duplication introduced — the alias is one identifier bound to the existing fragment, not a second copy of the pattern.

- [x] **Minimal refactor gate** — no refactor. The change is one moved declaration, one added alias, one added concatenation slot, and a comment block update; nothing structural was touched and nothing adjacent was cleaned up.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — 3 new parser tests (glyph-then-marker with no space; space-separated glyph; the same row clean in `parsePlanWithDiagnostics().unparsed`)

**Implementation Notes:**

- `viz/src/parser.ts` (+13/−2): `SUGGESTION_GLYPH` moved above `TRAILING_TOKENS`, new `SUGGESTION_GLYPH_AFTER` alias below it, and `TASK_LINE` now concatenates the glyph on both sides of the token run. Both slots are optional and non-capturing, so no capture group was added or shifted and `parseTaskLine`'s 8-slot destructure is byte-identical. The header comment's tolerance item 2 gained six lines recording the two-slot design, the shape it rescues, and — explicitly — why a *move* was rejected, so the next reader does not re-propose it.
- `viz/src/parser.test.ts` (+24): three tests in the CORE-494 block. CORE-494's own mixed-decoration test at `:278` (`[!critical] [fable] [light] [unattended]🔧`) was left untouched and stays green — it is the regression guard for the ordering that already worked.
- `SPEC.md` (+4/−1): the glyph tolerance bullet now states the glyph is accepted on either side of the trailing-token run and shows both equivalent orderings.
- Deliberately **not** done: no third entry in the `[unattended]` mis-authoring footguns subsection. The PLAN line proposed the shape as "a third mis-authoring shape," but a shape that parses correctly is a tolerance, not a footgun — documenting it as one would tell adopters to avoid something that now works. The two real footguns (`[!unattended]`, pre-`[model]` placement) are untouched.
- Deliberately **not** done: no change to `templates/PLAN.md`. CORE-494 updated the adopter seed because *canonical grammar* changed; here only a decorative tolerance widened, and the seed documents canonical authoring only (it never mentions the glyph).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test`: **28 files, 524 passed** (up from 521; +3 new). The 3 new tests and the CORE-494 regression guard verified by name via `--reporter=verbose -t "glyph"`.

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` (`tsc --noEmit`) clean; `npm --prefix viz run lint` (`eslint src`) clean

- [x] **Quality assertions** — no duplication (the alias binds the existing fragment; there is no second copy of the glyph pattern); no dead code (`SUGGESTION_GLYPH_AFTER` is consumed by `TASK_LINE`); complexity unchanged in the only sense that matters — no capture group added, no group index shifted, `parseTaskLine` untouched; zero public-surface growth (both fragments are module-private and `Task` is unchanged); no stale code-facing documentation — the parser header comment and `SPEC.md`'s tolerance bullet were updated in the same diff as the fragment order they describe

- [x] (frontend) N/A — the changed `viz/` files are the parser and its tests; no rendered surface was touched, so there is nothing to confirm visually

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs":

  - `README.md` — **no change.** Repo overview; restates no task-line grammar or tolerance.
  - `AGENTS.md` — **no change.** Layout + validation commands; the three viz commands it names are exactly the ones this task ran, unchanged.
  - `SPEC.md` — **updated (in scope):** §"Task-line format" glyph tolerance bullet now states either-side acceptance with both orderings shown.
  - `docs/MIGRATION.md` — **no change.** Its grammar mentions point at SPEC §"Task-line format" rather than restating it; the pointer stays correct.
  - `claude/AGENTS-snippet.md` · `codex/…` · `cursor/…` · `grok/…` — **no change.** Wiring blocks; none restates the task-line grammar or its tolerances.
  - `docs/CONVENTIONS.md` — **no change.** Commit / version / formatting conventions; not a grammar surface.
  - `CONTRIBUTING.md` · `SECURITY.md` — **no change.** Maintenance model and threat model; a widened decorative tolerance touches neither.
  - `docs/AGENT-NEUTRALITY.md` — **no change.** The tolerance is agent-neutral markdown parsing; no Claude-specific surface added.
  - `docs/PLATFORMS.md` — **no change.** Contract/wiring layering; no platform wiring shipped.
  - `claude/CAPABILITIES.md` — **no change.** Claude Code capability triggers; unrelated.
  - `docs/AGENT-COMPAT.md` — **no change.** Per-agent consume-mode matrix; every agent reads the grammar identically.
  - `docs/EXTERNAL-AGENTS.md` — **no change**, and this is the entry its own sweep note flags for unattended-posture drift, so it got a real look. §"The Orchestration Contract" describes the `--unattended` *invocation* posture and the deny-by-default read of the row marker; this task changed neither the marker's meaning nor where it may be written — only which decorations may sit beside it. Nothing it claims is falsified.
  - `docs/WORKTREES.md` — **no change.** Isolation convention; unrelated.
  - `docs/VISION.md` — **no change.** No runtime, scheduler, or validator added; a regex fragment moved. No boundary moved.
  - **Outside the sweep set, considered and declined:** `templates/PLAN.md` restates the canonical grammar line and flag ordering, both unchanged here — the glyph is a decorative tolerance the seed has never mentioned, so adding it would advertise a decoration to new adopters as if it were grammar. `docs/GLOSSARY.md`'s glyph entries (`copy-paste line`, `[model]`) describe the next-move suggestion label and the tier ladder, not PLAN-row decoration; neither is falsified.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and moved to the top of `## Completed`, then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

A PLAN row written the natural way — `[xheavy]🔭 [unattended]`, glyph on the model token and the marker appended last — used to fail `TASK_LINE` and vanish from the board. It now parses, and so does the ordering that already worked.

- **Parser** (`viz/src/parser.ts`, +13/−2). `SUGGESTION_GLYPH` is now emitted on **both** sides of `TRAILING_TOKENS` via a `SUGGESTION_GLYPH_AFTER` alias — the same two-position shape `CRITICAL_FLAG_AFTER` has used since FE-087. Both slots are optional and non-capturing, so no capture group moved and `parseTaskLine` is untouched.
- **The PLAN line's own fix was rejected, with evidence.** It proposed moving the glyph fragment before the token run. That would have broken `[fable] [light] [unattended]🔧`, pinned at `parser.test.ts:278` by CORE-494 — a straight trade of one broken ordering for another. Accepting both sides costs one alias and one concatenation slot, and the parser comment now records *why* a move was rejected so it isn't re-proposed.
- **Contract** (`SPEC.md`, +4/−1). The glyph tolerance bullet states either-side acceptance and shows the two equivalent orderings. No third footgun was added: a shape that parses correctly is a tolerance, and naming it a footgun would warn adopters off something that now works.
- **Verification.** 524 tests pass across 28 files (3 new, verified by name); `tsc --noEmit` and `eslint src` clean.
- **Two PLAN-line facts corrected.** The reported fleet stat "61 of 84 open rows carry a glyph" measures **47 of 138** at HEAD across the 23 `~/code/*/.flowtron/PLAN.md` files, and a scan for the failing shape finds **no live occurrence** — this closed a latent footgun rather than an active outage, so no adopter PLAN.md needed repair.
- **Maintainability effect.** Roughly one open row in three across the fleet carries a suggestion glyph, and `[unattended]` seeding is a growing operator motion; the one ordering an author is most likely to write no longer silently deletes their row from the board.

**Archived:** 2026-08-30
