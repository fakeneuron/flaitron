---
title: unattended-marker-grammar
status: completed
tags: []
created: 2026-08-29
due:
related-tasks: [CORE-495]
touches:
  - SPEC.md
  - viz/src/parser.ts
  - viz/src/parser.test.ts
---

# CORE-494 | unattended-marker-grammar

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-495]]

## 🎯 Goal

Promote `[unattended]` from an accidental stacked-`[model]` tolerance to a first-class, captured task-line segment in both `SPEC.md` §"Task-line format" and `viz/src/parser.ts`.

## ✅ Acceptance

- [x] `viz/src/parser.ts` captures a post-`[model]` `[unattended]` token into a new `Task.unattended: boolean`, leaving the stacked-`[model]` tolerance intact (first bracket token still becomes `model`; other trailing tokens still dropped)
- [x] `SPEC.md` §"Task-line format" carries the marker in the grammar line, the segment table, and an example — and the "Stacked `[model]` tokens" tolerance bullet no longer implies `[unattended]` is dropped
- [x] Both mis-authoring footguns are documented in SPEC and pinned by tests: `[!unattended]` fails the grammar; an `[unattended]` placed before `[model]` (or with no `[model]`) is captured *as* the model
- [x] `npm --prefix viz test`, `run typecheck`, and `run lint` all green

## 🧩 Subtasks

- [x] Capture the post-`[model]` token run in `TASK_LINE`; add `unattended: boolean` to `Task`; set it from marker membership in that run
- [x] Update the three UI test `Task` fixtures that construct the interface literally
- [x] Update `SPEC.md` §"Task-line format": grammar line, segment-table row, example, tolerances bullet, footgun note
- [x] Add parser tests: capture after `[model]`, stacked + marker, absent → `false`, both footguns
- [x] Run test / typecheck / lint
- [x] Phase 4 doc-drift sweep + closure

## 🔗 Related

- [[CORE-495]] — sibling upstream filing from the same caobunga epic (👁️→park under `--unattended`); shares no file with this one

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed 2026-08-29 by caobunga `CBN-EPIC-17.4` from a working reference implementation landed the same day; the gap is live at flowtron HEAD — `viz/src/parser.ts:99` still discards the token run as a `[model]` tolerance and SPEC §"Task-line format" has no marker row.

- [x] Read relevant source files — `viz/src/parser.ts` (full), `viz/src/parser.test.ts` (tolerance block), `SPEC.md` §"Task-line format", the three UI `Task` fixtures, and the reference implementation's tasknote at `~/code/caobunga/.flowtron/tasknote/archive/cbn/CBN-EPIC-17.2.md`. Narrow, known read set — no probe needed.

- [x] **Best Practices Review** — `parser.ts` is SPEC's declared canonical grammar reference; the marker belongs in the same composed-fragment shape the three FE-066 tolerances already use, not in a second pass over the line. `unattended` mirrors `critical: boolean` (required, not optional) so the flag pair reads uniformly; that requires touching the three UI test fixtures that build `Task` literally — a direct consequence of the field, not adjacent cleanup. No refactor needed.

- [x] **Archive skim** — 25 archived notes touch `viz/src/parser.ts`. Load-bearing hits: **FE-066** introduced the three tolerances (including the stacked-`[model]` run this task repurposes); **FE-084** composed `TASK_LINE` from named fragments and pinned the invariant that *fragment declaration order must match concatenation order*; **FE-087** added `CRITICAL_FLAG_AFTER` as group 5 and threaded `TASK_ID_BODY` through five regex slots; **FE-044** set the `## Critical` soft-migration precedent for a captured flag. No prior note claims `[unattended]` is deliberately decorative — it lands in the FE-066 run by accident of shape, not by decision.

- [x] **Drift check** — every cited fact re-read at HEAD: `STACKED_MODEL_TOKENS` at `viz/src/parser.ts:99` is still non-capturing; the SPEC tolerances bullet still says trailing bracket tokens "are tolerated and dropped"; the segment table has no marker row. One correction to the PLAN line's wording, recorded below. Plan matches the PLAN line otherwise; contradicts no SPEC contract (the grammar is explicitly additive).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Explicit assumptions: (1) scope is exactly the two surfaces the PLAN line names — SPEC + parser — so **no viz UI chip** is added and `Task.unattended` ships with no renderer, which is coherent because SPEC declares `parser.ts` the canonical grammar reference that adopters (caobunga) read rather than flowtron's own board; a UI chip is offered as a follow-up at closure rather than folded in. (2) The marker is matched anywhere in the post-`[model]` token run, mirroring the reference implementation, rather than pinned to the immediately-following slot. (3) `SPEC.md`'s `Version:` header is release-managed by `/ft-release` and is not bumped here.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Grammar mechanics.** `TASK_LINE` is composed from nine named fragments; capture groups today are `mark, id, criticalRaw, modelRaw, criticalAfter, shortnameRaw, longRaw`. Making `STACKED_MODEL_TOKENS` capturing inserts a group at position 5, shifting `criticalAfter` → 6, `shortnameRaw` → 7, `longRaw` → 8. The FE-084 invariant (declaration order == concatenation order) means the fragment rename and the destructure must move together.

- **The one PLAN-line correction.** The PLAN line says `[!unattended]` "drops the whole line." That is exactly true of *caobunga's* reader, which has no diagnostics channel. In **flowtron's** parser the line fails `TASK_LINE`, then falls through to `CHECKBOX_BULLET` + the `*`-emphasis check and surfaces in `parsePlanWithDiagnostics().unparsed` — it is dropped from the task list but **not** silent. SPEC must state flowtron's behavior, so the footgun is documented as "fails the grammar and surfaces as an unparsed diagnostic," not as a silent drop. Verified by test rather than by reading.

- **Reference implementation.** caobunga `CBN-EPIC-17.2` (`backend/caobunga/flowtron.py`) captures the same token run, sets `PlanTask.unattended` from `[unattended]` membership, and pins both footguns as behavior tests with doc-honesty docstrings. This task formalizes that grammar upstream; it does not import code (cross-repo edit remit — the deliverable lands in this repo only).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended two established shapes rather than inventing any: the marker rides `TASK_LINE`'s existing FE-066 trailing-token run (capture instead of discard), and `Task.unattended` mirrors `critical: boolean` — a required flag, not an optional one, so the two operator flags read uniformly at every consumer. The FE-084 fragment-order invariant and the FE-087 group-numbering comment were both updated in the same edit rather than left to drift.

- [x] **Minimal refactor gate** — one rename: `STACKED_MODEL_TOKENS` → `TRAILING_TOKENS`. The fragment no longer serves only the stacked-`[model]` tolerance, so keeping the old name would make the file lie about its own grammar. No other structural change; `parseTaskLine` gained one destructure slot and one field.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — 5 new parser tests (capture after `[model]`; capture composed with `[!critical]` + stacked models + suggestion glyph; absent → `false`; both footguns), plus the required `unattended: false` on the 8 `Task` fixtures that construct the interface literally

**Implementation Notes:**

- `viz/src/parser.ts` (+34/−17): `Task.unattended: boolean`; `STACKED_MODEL_TOKENS` → capturing `TRAILING_TOKENS`; new `UNATTENDED_MARKER` regex; `parseTaskLine` destructure gains `trailingTokens` at position 5 (shifting `criticalAfter`/`shortnameRaw`/`longRaw` to 6/7/8) and sets the field by membership test. The header comment block now documents the marker, the capture rationale, and both footguns beside the two remaining tolerances.
- `SPEC.md` (+28/−5): grammar line, segment-table row (semantics + deny-by-default expectation + "flowtron never writes it"), one example row, the amended tolerances bullet, and a new **`[unattended]` mis-authoring footguns** subsection naming both shapes.
- `templates/PLAN.md` (+8/−3): the adopter seed's grammar-reference comment was a complete projection of the old grammar line, so it was made complete again — with an explicit "most projects never use it" so the seed doesn't read as a recommendation.
- **8 `Task` fixtures** across 6 test files gained `unattended: false`. Required by the boolean-not-optional choice; vitest does not typecheck, so three of them (`taskView` / `utils` / `useBoardSelection`) only surfaced under `tsc --noEmit` after the suite was already green — worth noting for the next field addition.
- Deliberately **not** done: no viz UI chip. SPEC declares `parser.ts` the canonical grammar reference that adopters read, so the field's consumer is the adopter reader (caobunga), not flowtron's own board. Offered as a follow-up at closure instead of folded in.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test`: **28 files, 521 passed**; the 5 new tests verified by name via `-t "unattended"`

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` (`tsc --noEmit`) clean; `npm --prefix viz run lint` (`eslint src`) clean

- [x] **Quality assertions** — no duplication (one capture site, one membership test); no dead code in the parser (every new symbol is consumed by `parseTaskLine`) — `Task.unattended` is a deliberate contract surface with an out-of-repo consumer, recorded above rather than left implicit; complexity unchanged (one added group, one added regex); public-surface growth is exactly the one interface field the Acceptance requires; the parser's own header comment and SPEC were updated in the same diff, so no stale code-facing documentation

- [x] (frontend) N/A — `viz/` files changed are the parser and test fixtures only; no rendered surface was touched, so there is nothing to confirm visually

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

  - `README.md` — **no change.** Repo overview; carries no task-line grammar restatement.
  - `AGENTS.md` — **no change.** Layout + validation commands; the three viz commands it names are the ones this task ran, unchanged.
  - `SPEC.md` — **updated (in scope):** §"Task-line format" grammar line, segment-table row, example, tolerances bullet, and the new footguns subsection.
  - `docs/MIGRATION.md` — **no change.** Its two grammar mentions (:322, :407) point at SPEC §"Task-line format" rather than restating the line; the pointer stays correct.
  - `claude/AGENTS-snippet.md` · `codex/…` · `cursor/…` · `grok/…` — **no change.** Wiring blocks; none restates the task-line grammar.
  - `docs/CONVENTIONS.md` — **no change.** Commit / version / formatting conventions; not a grammar surface.
  - `CONTRIBUTING.md` · `SECURITY.md` — **no change.** Maintenance model and threat model respectively; untouched by an additive grammar segment.
  - `docs/AGENT-NEUTRALITY.md` — **no change.** The marker is agent-neutral markdown, so it adds no Claude-specific surface to the ledger.
  - `docs/PLATFORMS.md` — **no change.** Contract/wiring layering; no new platform wiring shipped.
  - `claude/CAPABILITIES.md` — **no change.** Claude Code capability triggers; unrelated.
  - `docs/AGENT-COMPAT.md` — **no change.** Per-agent consume-mode matrix; the grammar is read identically by every agent.
  - `docs/EXTERNAL-AGENTS.md` — **no change**, and this is the one entry that needed a real look: its sweep note warns that unattended-posture edits routinely drift against it. They do not here. §"The Orchestration Contract" describes the *invocation* posture (`--unattended` passed to a runner); this task adds an optional *row-level* segment and falsifies nothing it claims. Whether the orchestration contract should cite the marker is a genuine question, but it belongs with `CORE-495`'s posture edit, not with a grammar addition.
  - `docs/WORKTREES.md` — **no change.** Isolation convention; unrelated.
  - `docs/VISION.md` — **no change.** The marker is markdown the operator writes and a caller reads; it adds no runtime, scheduler, or validator, so no boundary moved.
  - **Outside the sweep set, considered and declined:** `docs/GLOSSARY.md` carries per-segment entries for `[!critical]` and `[model]`, so an `[unattended]` entry would fit — but its own Maintenance clause reserves new terms for "epic children or audit follow-ups," which this standalone task is not, and its `grammar elements` entry is explicitly non-exhaustive ("etc."). Left for the next audit follow-up. `templates/PLAN.md` was **updated**, by contrast, because its seed comment was a *complete* projection of the exact grammar line this task changed — leaving it would have shipped a stale grammar to every new adopter.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and moved to the top of `## Completed`, then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

`[unattended]` is now canonical task-line grammar instead of an accident of the stacked-`[model]` tolerance: flowtron's parser captures it into `Task.unattended`, and SPEC names it, positions it, and documents the two ways authors get it wrong.

- **Parser** (`viz/src/parser.ts`, +34/−17). The FE-066 trailing-token run became capturing (`STACKED_MODEL_TOKENS` → `TRAILING_TOKENS`), and `[unattended]` membership in that run sets a new required `Task.unattended: boolean`. Every other trailing token stays a dropped tolerance, so no existing row changes meaning.
- **Contract** (`SPEC.md`, +28/−5). The grammar line, segment table, and examples carry the marker with its position-after-`[model]` constraint, its deny-by-default expectation for operator-less callers, and an explicit "flowtron itself never writes it." The tolerances bullet no longer claims the token is dropped.
- **Footguns pinned, and one corrected.** Both mis-authoring shapes are documented and test-pinned: `[!unattended]` fails the grammar outright, and a pre-`[model]` or model-less `[unattended]` is captured *as* the model. The PLAN line called the first a whole-line drop — true of caobunga's reader, but flowtron surfaces it in `parsePlanWithDiagnostics().unparsed`, so SPEC states flowtron's behavior and names the sharper adopter-side edge in a parenthetical.
- **Verification.** 521 tests pass across 28 files (5 new, verified by name); `tsc --noEmit` and `eslint src` clean. Three of the eight fixture updates surfaced only under typecheck, not the suite.
- **Maintainability effect.** caobunga's shipped reference implementation now has an upstream contract to point at instead of a tolerance it reverse-engineered, and the next reader of `parser.ts` learns from the file itself which trailing tokens are grammar and which are decoration.

**Archived:** 2026-08-29
