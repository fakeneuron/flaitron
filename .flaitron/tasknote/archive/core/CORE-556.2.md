---
title: ft-release-fragment-split
status: completed
tags: []
created: 2026-09-09
due:
related-tasks: [CORE-EPIC-556, CORE-507, CORE-556.N]
touches:
  - claude/skills/ft-release/
---

# CORE-556.2 | ft-release-fragment-split

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-556]] [[CORE-507]] [[CORE-556.N]]

## 🎯 Goal

Extract the Step 5 dogfood/SOP-currency walk from `claude/skills/ft-release/SKILL.md` into a lazy fragment so the skill body has about two working units of margin under the 40,000-character release gate.

## ✅ Acceptance

- [x] `claude/skills/ft-release/SKILL.md` measures at least ~5,134 bytes of headroom under the 40,000-char budget (two working units per [[CORE-555]]; currently 685) — **30,619 bytes, headroom 9,381**
- [x] The dogfood-or-explicit-skip walk and the standing SOP-currency check live in `claude/skills/ft-release/step-5-dogfood-sop.md`, moved verbatim (scripted slice; losslessness proved by two-way line diff against the pre-extract body)
- [x] Step 5 in `SKILL.md` retains its heading and the 3 version edits, and dispatches a Read of the fragment (CORE-042.9 / CORE-507 shape)
- [x] Every relative cross-reference the move breaks is repaired; section-level `§5` citations still resolve
- [x] `docs/CONTEXT-BUDGET.md` is not edited — ledger refresh is the next `/ft-release` §7.1's job; the 40,000 cap is unchanged
- [x] Repo validation gates pass — `N/A` as written (`AGENTS.md` §"Validation" scopes its six commands to viz and the fleet updater). Substituted: two-way line diff of the slice, `wc -c` of the body, and a grep for stranded `above`/`below`/`this skill` pointers

## 🧩 Subtasks

- [x] Extract the dogfood + SOP-currency block (SKILL.md lines 174–230) verbatim → `step-5-dogfood-sop.md` with the fragment back-ref header
- [x] Replace that block in SKILL.md with a Read-dispatch stub; leave the heading, the 3 version edits, the version-pin grep, and the tick-boxes closer in the body
- [x] Repair broken relative references (at minimum: "the grep above" inside the moved block, which pointed at the version-pin grep that stays)
- [x] Verify sizes, two-way line diff, section-level `§5` citations, and that `step-7.1-standing-checks.md`'s "in Step 5" phrasing still holds

## 🔗 Related

- [[CORE-EPIC-556]] — parent epic (release-skill-headroom); no `.1` Discovery note — Discovery supplied by audit-repo 2026-09-09
- [[CORE-507]] — depends-on: the extraction pattern this child extends (verbatim slice + dispatch; Step 5 was the deferred next-largest section)
- [[CORE-556.N]] — sibling audit placeholder; not started
- [[CORE-555]] — related-decision: one working unit = +2,567 chars; two units ≈ 5,134
- [[CORE-400]] / [[CORE-042.9]] — related-decision: fragment shape (`H1 + 1-line back-ref + verbatim moved content`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Condition is live and byte-exact — `SKILL.md` is 39,315 bytes against a 40,000 cap (685 of headroom). The named extract (dogfood + SOP-currency, 9,408 bytes) is still in the body, and CORE-507 explicitly deferred it as the next-largest section. The extraction pattern is established and applies cleanly.

- [x] Read relevant source files — `claude/skills/ft-release/SKILL.md` (full section map + Step 5 body), existing fragments `step-7.1-standing-checks.md` / `step-7.1-mirror-pairs.md` / `step-7.2-tag-message.md` (dispatch + header idiom), `docs/CONTEXT-BUDGET.md` §"Budgets" / §"Ledger", `SPEC/epic.md` (implementation-child YAML echo; no `.1` Fan-out to copy)

- [x] **Best Practices Review** — Touched responsibility is one file's *load shape*, not its behavior: the dogfood walk and SOP-currency check keep their current semantics and move verbatim. Dependency direction is one-way (`SKILL.md` → sibling fragment); no new abstraction. The established shape is CORE-042.9's fragment plus CORE-507's scripted slice. Required in-scope rewrite is only the relative-reference repairs the move itself creates. Unrelated cleanup deferred: do not extract §7.2, do not raise the 40,000 cap, do not refresh the CONTEXT-BUDGET ledger.

- [x] **Archive skim** — `grep -l 'claude/skills/ft-release/SKILL.md' .flowtron/tasknote/archive/core/` returned 88 hits; handed the reading to a probe. Load-bearing:

  - [[CORE-042.9]] / [[CORE-400]] — canonical fragment shape: H1 + 1-line back-ref + verbatim moved content; heading stays in `SKILL.md`. CORE-400's `<root>`-prefix trap does **not** apply (`/ft-release` is flowtron-self-only; CORE-507 recorded this so the next reader does not "fix" it).
  - [[CORE-507]] — the pattern to extend. Scripted byte-slice; losslessness by two-way line diff; dispatch is net-new (~1.1k) so projections undershoot. Step 5 (~10k) was deliberately left under the then-cap. §2.5 caveat: splitting defers load, it does not remove it — do not delete the escape hatch because of this extract. Linear-step tension: a full cut still pays the Read at Step 5; the 40,000 gate is eager `SKILL.md` load, which is the number this task moves.
  - [[CORE-508]] — same-directory siblings need no `../../../` repair. One file, not two, unless the slice itself would exceed ~40k.
  - [[CORE-397]] — SOP-currency lives in Step 5 beside the stamps, not in §7.1; wrappers also sit in the Step 3 Acceptance template and §7.4 closure-review and stay in `SKILL.md`.
  - [[CORE-406]] / [[CORE-501]] — parallel-dogfood race (only the release-driving session writes; dirty-check backstop) moves with the walk, verbatim.
  - [[CORE-555]] — working unit +2,567; two units ≈ 5,134. Edit CONTEXT-BUDGET in-task only for cap changes; leave the ledger to the next `/ft-release`.
  - [[CORE-535.2]] — numbers live only in that doc; the §7.1 check refreshes the measured column in the same cut.

  No `.1` Discovery note for this epic; parent PLAN line says "Discovery supplied by audit-repo 2026-09-09". No Fan-out to echo.

- [x] **Drift check** — PLAN.md line still matches HEAD: extract the Step 5 dogfood/SOP-currency walk (or equivalent) into a lazy fragment so the body has ~two working units of margin. Filed paths current. Measured: body 39,315 / 40,000; dogfood-gate through end of Step 5 = 9,408 bytes; version-edits preamble = 738 bytes. No SPEC contract is contradicted — this is a skill-body load-shape change, not a workflow-contract change. `SPEC/epic.md` Fan-out echo does not apply (no `.1`). Zero live `ft-release/SKILL.md:<line>` citations outside the write-once archive.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Measured state (bytes, matching the filed units / `wc -c`)

| Region | Lines | Bytes |
|---|---|---|
| `SKILL.md` total | 1–419 | **39,315** (budget 40,000; headroom **685**) |
| Step 5 whole | 158–232 | 10,146 |
| — version edits + pin grep (stays) | 158–172 | 738 |
| — dogfood + SOP-currency (moves) | 174–230 | **9,408** |
| — tick-boxes closer (stays) | 232 | ~200 |

Projected body after extract: 39,315 − 9,408 + dispatch (~400–1,100, CORE-507's two-file dispatch was ~1.1k; one-file stub should be smaller) ≈ **30.3–31.0k**. Headroom ≈ **9.0–9.7k**, above two working units (5,134) even after CORE-507's "dispatch is net-new, projections undershoot" warning.

### B. Seam and what stays

Keep the step's primary action in `SKILL.md` (CORE-507 kept §7.1's `/ft-audit docs` intro). Step 5's primary action is the 3 version edits. The dogfood walk and SOP-currency check are the large linear walks — same justification as extracting §7.1 even though every successful cut reaches it: the 40,000 gate is eager load, not session total.

One fragment, not two: combined slice is 9.4k, well under 40k, and CORE-397 put the two walks beside each other on purpose. Name: `step-5-dogfood-sop.md`, matching `step-7.1-standing-checks.md` / `step-7.2-tag-message.md`.

Dispatch idiom: §7.2's one-file `Read … now` (not §7.1's parallel-Read of two files).

### C. Relative references the move breaks

Swept the 174–230 range plus remaining Step 5 closer and the two standing-checks pointers:

| # | Where | Current | Breaks? | Repair |
|---|---|---|---|---|
| 1 | L186 in extract | "the grep **above**" | Yes — version-pin grep stays in `SKILL.md` | → "the version-pin grep in Step 5" |
| 2 | L186 in extract | "the SOP-currency check **below**" | No — both move together | leave |
| 3 | L184 in extract | "step 3's dirty check **above**" | No — item 3 is in the extract | leave |
| 4 | L188 / L230 in extract | "dogfood rows/gate **above**" | No — both in extract | leave |
| 5 | L232 closer (stays) | "the walk **above**" | Yes — walk moves into the fragment | → "the walk in `step-5-dogfood-sop.md`" |
| 6 | `step-7.1-standing-checks.md` L97 / L99 | "SOP-currency check/block **in Step 5**" | No — CORE-507 already named the section; heading stays | leave |
| 7 | `step-7.1-standing-checks.md` L108 | "same footing as the 3 version edits in Step 5" | No — version edits stay | leave |

External `§5` citations (`docs/DOGFOOD.md`, `docs/AGENT-COMPAT.md`, `SPEC/procedures/README.md`, `docs/AGENT-NEUTRALITY.md`) are section-level and survive because the heading stays.

### D. Assumptions (no clarifications needed)

1. Extract dogfood + SOP-currency as **one** fragment; leave the 3 version edits inline.
2. Do not extract §7.2 (out of scope; PLAN names Step 5).
3. Do not edit `docs/CONTEXT-BUDGET.md` (ledger is release-owned; cap unchanged).
4. Fragment paths stay literal `claude/skills/ft-release/…` (flowtron-self-only).
5. Do not delete or re-evaluate Step 2.5; CORE-507 already kept it for whole-cut budget, a superset of eager load.
6. No Fan-out YAML (`blocked-by` / `parallel-safe-with` omitted — no `.1` Discovery note).

### E. Cross-artifact half of the drift check

PLAN.md long description is the work this note plans. `SPEC.md` / `SPEC/epic.md` are not being rewritten. `docs/CONTEXT-BUDGET.md` §"Budgets" `ft-release` row stays 40,000; §"Known over budget" stays empty. No contradiction.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Extended [[CORE-507]] / [[CORE-042.9]]: H1 + one-line back-ref + verbatim moved content; heading stays in `SKILL.md`; one-file `Read … now` dispatch matching §7.2 (not §7.1's two-file parallel-Read). No new shape.

**Minimal refactor gate.** Only two rewrites the move made necessary: (1) fragment "the grep above" → "the version-pin grep in Step 5"; (2) SKILL.md closer "the walk above" → "the walk in `step-5-dogfood-sop.md`". Intra-extract `above`/`below` left alone. `step-7.1-standing-checks.md`'s already-repaired "in Step 5" pointers left alone. §7.2 not extracted. CONTEXT-BUDGET.md not edited. Step 2.5 not re-evaluated.

**Extraction was scripted, not transcribed.** Python slice of SKILL.md lines 174–230 → `step-5-dogfood-sop.md` after the fragment header. Two-way line diff against the saved pre-extract slice: exactly 1 differing line — the planned grep-above repair.

**Sizes (`wc -c`).** `SKILL.md` 39,315 → **30,619** (−8,696). Fragment 9,545 (header + 9,220-byte slice + the one repair). Headroom **9,381** against the 40,000 cap — above two working units (5,134 per [[CORE-555]]). Dispatch stub is ~500 bytes, well under CORE-507's ~1.1k two-file block, which is why the projection held this time.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A`, no frontend surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Targeted tests / lint.** `N/A` — markdown only; `AGENTS.md` §"Validation" scopes its six commands to viz and the fleet updater, and this change touches neither. Substituted:

| Check | Result |
|---|---|
| Two-way line diff of lines 174–230 vs fragment body | 1 diff — the planned "grep above" repair |
| `wc -c` SKILL.md | 30,619 (headroom 9,381 ≥ 5,134) |
| Stranded `above`/`below` in fragment | remaining hits are intra-extract (dirty-check above, SOP below, dogfood rows/gate above) |
| Live `ft-release/SKILL.md:<line>` citations outside archive | none |
| Section-level `§5` citations (`docs/DOGFOOD.md`, `docs/AGENT-COMPAT.md`, `SPEC/procedures/README.md`) | heading still in SKILL.md |
| `step-7.1-standing-checks.md` "in Step 5" | still accurate |
| Trailing whitespace / final newline | clean |
| Privileged-ops keyword clause (`API_KEY`/`SECRET`/`TOKEN`/`PASSWORD`) | no hits |

**Quality assertions.** No duplication (two-way diff). No dead content. No public-surface growth beyond one dispatched sibling. Directory-symlink wiring (`.claude/skills/ft-release/`) picks the new file up with no re-wire, same as CORE-507.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update. All 18 **no change**: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/`/`codex/`/`cursor/`/`grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md` (SOP-currency still lives in `/ft-release` Step 5), `docs/PLATFORMS.md` (already documents `SKILL.md` (+ lazy fragments)), `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md` (cites `§5` at section level; heading stayed), `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`. Skill bodies are excluded from this set.. All 18 **no change**: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/`/`codex/`/`cursor/`/`grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md` (SOP-currency still lives in `/ft-release` Step 5), `docs/PLATFORMS.md` (already documents `SKILL.md` (+ lazy fragments)), `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md` (cites `§5` at section level; heading stayed), `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`. Skill bodies are excluded from this set.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

`/ft-release`'s skill body sat 685 bytes under its 40,000-char release gate — one moderate edit from tripping it. The Step 5 dogfood-or-explicit-skip walk and standing SOP-currency check now live in a sibling fragment the skill reads when it actually reaches Phase 2, so the body that loads at invocation dropped from 39,315 to 30,619 bytes. That leaves 9,381 bytes of headroom, about three and a half working units at the [[CORE-555]] +2,567 rate, which is the margin the parent epic asked for.

**Changed:** `claude/skills/ft-release/SKILL.md` (39,315 → 30,619); new `claude/skills/ft-release/step-5-dogfood-sop.md` (9,545). Two relative-reference repairs the move required. `docs/CONTEXT-BUDGET.md` deliberately untouched (ledger is the next `/ft-release` §7.1's job).

**Verification:** scripted byte-slice; two-way line diff shows exactly the one planned repair; `wc -c` headroom 9,381; section-level `§5` citations still resolve because the heading stayed; no live line-number pins outside the write-once archive.

**Refactors deferred:** §7.2 stays inline (out of scope; CORE-507 already declined it as a linear step). Step 2.5 escape hatch kept (CORE-507: splitting defers load, it does not remove it).

**Documentation:** 18 swept entries, all no change. Skill bodies are excluded from the sweep set; the four section-level `§5` citations in swept docs (`docs/DOGFOOD.md`, `docs/AGENT-COMPAT.md` ×3) plus `docs/PLATFORMS.md`'s already-correct "(+ lazy fragments)" wording survive because the heading stayed.

**Maintainability effect:** the next substantial edit to `/ft-release` no longer starts one paragraph from the release gate. The dogfood/SOP walk can keep growing in its own file without pushing the eager-load body back over the cap.

**Archived:** 2026-09-09
