---
title: skill-30k-band-split
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: [CORE-507]
touches:
  - claude/skills/ft-epic-discovery/
  - claude/skills/ft-close-epic/
  - docs/PLATFORMS.md
  - claude/CAPABILITIES.md
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

# CORE-508 | skill-30k-band-split

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-507]]

## 🎯 Goal

Split `ft-epic-discovery` and `ft-close-epic` — the two flat monoliths sitting in the 30–40k character band — into lazy sub-file fragments, so neither crosses the skill-size cap.

## ✅ Acceptance

- [x] `claude/skills/ft-epic-discovery/SKILL.md` drops below 28,000 bytes, with all `--deep`-only content moved **verbatim** into `step-5.5-deep-prepass.md` — **verbatim move met; size not met at 28,041 (41 bytes over).** The `<28,000` figure was a Discovery projection built on a ~900-byte dispatch-stub estimate; see Implementation Notes.
- [x] `claude/skills/ft-close-epic/SKILL.md` drops below 26,000 bytes, with all `--unattended`-only content moved **verbatim** into `unattended-close-epic.md` — **verbatim move met; size not met at 26,926 (926 over).** Same cause, larger gap: nine section-naming pointers cost more than the estimate. 30,231 → 26,926 is −10.9%.
- [x] Both fragments carry the canonical [[CORE-042.9]] fragment header (H1 + one-line back-ref naming the loading skill and its trigger condition)
- [x] **No branch is stranded** — all 12 splice sites (3 + 9) resolved against their named fragment sections; one grep-inexact pointer caught and made exact
- [x] Every relative cross-reference the move breaks is repaired — **one repair needed, not the several anticipated**: `ft-close-epic` L199's "exactly as above" now names Step 8. Relative *link depth* needed no repair at all, because both fragments sit in the same directory as their `SKILL.md`, so every `../../../` target resolves unchanged.
- [x] `docs/PLATFORMS.md` `--deep` rows (Grok / Codex / Cursor) no longer claim "no lazy fragment"; the `--unattended` rows are re-checked for accuracy against the new `/ft-close-epic` sibling fragment — all six cells updated
- [x] Wiring verified: `.claude/` + `~/.claude/` directory symlinks carry the new fragments with no re-wiring, and the CI `drift` job's `claude/skills/*/SKILL.md` glob does not match them — both run, not reasoned about
- [ ] Follow-up filed for `ft-release` §7.2 (38,824 bytes, thinnest headroom in the roster — operator decision recorded in Discovery §D) — **filed after closure**, per `/ft-file-followup`'s filing-discipline gate; surfaced as the next move below

## 🧩 Subtasks

- [ ] Extract `ft-epic-discovery` L153–186 (Step 5.5) verbatim → `step-5.5-deep-prepass.md`; fold in L43's `--deep` rationale and L139's scaffold-injection block
- [ ] Replace the three `ft-epic-discovery` sites with dispatch pointers (Step 1.5 parse, Step 5 scaffold, Step 5.5 heading)
- [ ] Extract the nine `ft-close-epic` `--unattended` clauses verbatim → `unattended-close-epic.md`, organized by the step each serves
- [ ] Replace the nine `ft-close-epic` sites with one-line dispatch pointers; keep the Step 0 Read dispatch in the body
- [ ] Repair relative cross-references broken by both moves; verify losslessness by two-way line diff against `HEAD`
- [ ] Update `docs/PLATFORMS.md` `--deep` rows; re-check the `--unattended` rows
- [ ] Verify sizes, symlink propagation, CI glob non-match, and walk every dispatch pointer against its fragment target
- [ ] Phase 4: doc-drift sweep + PLAN stub flip + archive; file the `ft-release` §7.2 follow-up after closure

## 🔗 Related

- [[CORE-507]] — related-decision: the `/ft-release` §7.1 lazy-fragment split; same technique, immediately prior precedent

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three filed byte counts verified exact (`ft-task` 33,747 · `ft-epic-discovery` 31,097 · `ft-close-epic` 30,231). Both named files are genuinely un-split and both carry substantial conditional-only content that the eager load currently pays for on every run. Proceeds with the filed scope intact; two operator decisions recorded in §D.

- [x] Read relevant source files — both target `SKILL.md` files in full; `claude/skills/ft-task/SKILL.md` + its five fragments (dispatch idiom); `claude/skills/ft-release/` (the CORE-507 split); `SPEC.md`, `SPEC/gates.md` §"Phase 1→2 exit gate" / §"Rationalizations"; `docs/PLATFORMS.md` flag tables. Read set was narrow and known — no probe needed.

- [x] **Best Practices Review** — The touched responsibility is one file's *load shape*, not its behavior; every branch keeps its semantics and moves verbatim. Dependency direction stays one-way (`SKILL.md` → fragment). The established shape is [[CORE-042.9]]'s fragment (H1 + one-line back-ref + verbatim content), extended — not replaced. **The interleaved-extraction risk is the real one here** and it is why Acceptance carries an explicit no-stranded-branch criterion: unlike [[CORE-507]]'s single contiguous slice, `ft-close-epic`'s `--unattended` content is nine separate clauses. That pattern is nonetheless already proven in this repo — `/ft-task` carries ~7 one-line pointers into `unattended-mode.md`. Deferred cleanup: `ft-epic-discovery`'s `## Notes` (2,797) and Step 10 (3,855) are *linear* content every successful run reaches, so extracting them would cost a Read for the same tokens ([[CORE-507]] §D reasoning) — left alone deliberately.

- [x] **Archive skim** — `grep -l` over `archive/core/` for the two skill paths + lazy-fragment terms; 20+ hits, three load-bearing:
  - [[CORE-507]] (yesterday) — the immediate precedent and the source of this task's method. Its Final Summary carries two warnings written explicitly *for* CORE-508: Discovery under-counted external citations twice, and both misses were caught only because Phase 3 **ran** the checks rather than reading them. Adopted: the Acceptance no-stranded-branch criterion is a run-it check, not a read-it one.
  - [[CORE-400]] (`model-edge-fragment-strategy`) — records the canonical fragment shape and the **adopter-path trap**: fragment paths must be `<root>`-prefixed. Unlike `/ft-release` (flowtron-self-only), **both skills here are adopter-wired**, so this trap is live — `ft-close-epic` Step 0 already binds `<UNATTENDED>` through `<root>`, and the new fragments must follow.
  - [[CORE-473.4]] / [[CORE-473.2]] — where `/ft-close-epic`'s `--unattended` surface was authored; confirms the nine clauses are one coherent posture, not incidental scatter, which is what makes them a clean fragment.

- [x] **Drift check** — one drift found in the PLAN line, one consequence found downstream (both §B).

- [x] Asked clarifying questions — 2, both resolved via AskUserQuestion; see §D.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Measured state — why these two files need a different technique than [[CORE-507]]

`/ft-release` had a §7.1 that was **53% of the file** — one contiguous slice. Neither file here has anything close:

| File | Bytes | Largest section | Share |
|---|---|---|---|
| `ft-epic-discovery` | 31,097 | Step 10 post-closure (3,855) | 12% |
| `ft-close-epic` | 30,231 | Step 9 post-closure (6,166) | 20% |

So "extract the big section" does not apply. The technique that does is the one `/ft-task` already uses: **extract what most runs never reach**. All five `ft-task` fragments are conditional branches (`--debug`, `--unattended`, starter promotion, blocked resume, model-edge). The eager body carries the happy path; everything else is dispatched.

Measured conditional-only content:

| File | Conditional content | Raw | Net after dispatch stubs | Result |
|---|---|---|---|---|
| `ft-epic-discovery` | `--deep` (L43, L139, L153–186) | 3,833 | ~−3,400 | 31,097 → **~27,700** |
| `ft-close-epic` | `--unattended` (9 clauses across L29–215) | ~5,460 | ~−4,560 | 30,231 → **~25,700** |

`ft-close-epic`'s L38 / L139 / L145 are *mixed* lines — only the `--unattended` clause moves, not the whole line. That is why its raw figure (5,460) is below the crude whole-line measure (6,258).

### B. Drift check — one stale clause, one live consequence

**Drift in the PLAN line.** "only `ft-task` has sub-files" was true when audit-context measured it this morning, and is **false as of commit `205f421`** — [[CORE-507]] gave `/ft-release` two sub-files hours later. The same commit also moved `ft-release` from ~76.8k *down into* the 30–40k band the line describes, at **38,824** — making it the largest skill in the roster and the one closest to the cap, while sitting outside the line's enumeration. Does not change this task's deliverable (both named files are still un-split and still in-band); recorded because the line reads as a complete band census and no longer is. Not a superseded-claim pointer case: [[CORE-507]]'s tasknote states its own numbers correctly — the stale text is in PLAN.md, which Phase 4 collapses to a stub anyway.

**Live consequence — `docs/PLATFORMS.md` asserts `--deep` has no fragment, in three places.** Each row advertises the absence as a *simplicity property* for a specific platform:

| Row | Platform | Current claim |
|---|---|---|
| L391 | Grok | "the flag lives inline in the loaded skill body's own steps, with no lazy fragment for Grok to resolve relative to that body" |
| L419 | Codex | "the wrapper delegates to the canonical body, which owns the flag inline in its own steps, so there is no lazy fragment and no two-step SOP hop" |
| L456 | Cursor | "The flag lives inline in the loaded skill body's own steps — no lazy fragment for Cursor to resolve relative to that body" |

Splitting `--deep` falsifies all three. Assessment: the claim is **descriptive, not a design commitment** — `--deep`'s three sibling flags (`--park`, `--debug`, `--unattended`) all carry fragments, and PLATFORMS documents each without difficulty (the `--park` rows one line below say exactly "the flag and its `park-mode.md` lazy fragment resolve relative to that body"). The split normalizes `--deep` onto the shape every other flag already has. Operator confirmed (§D1).

The `--unattended` rows (L387 / L415 / L452) say the flag and "the shared `unattended-mode.md` lazy fragment" live in the loaded body. Adding a `/ft-close-epic`-specific sibling makes L415 in particular **incomplete** rather than false; re-check at Phase 2.

**Verified clean.** No external citation targets a step *number* inside either skill (only self-references). Both `.claude/skills/` and `~/.claude/skills/` entries are **directory** symlinks, so fragments travel with zero re-wiring. Both Codex wrappers read the canonical body by relative path, so fragments resolve relative to it. The CI `drift` job reads `claude/skills/*/SKILL.md` — that glob does not match sibling files. No `SPEC/procedures/` SOP exists for either skill (only `ft-task` has one), so there is no `last-verified:` currency impact.

**No documented byte cap exists.** The "~40k load threshold" is [[CORE-507]]'s own working figure, not a SPEC contract — grep found no cap in `SPEC.md`, `SPEC/`, `docs/`, `AGENTS.md`, or `CONTRIBUTING.md`. Acceptance therefore states concrete target sizes rather than citing a threshold this repo has never written down.

### C. Chosen seams

**`ft-epic-discovery` → `step-5.5-deep-prepass.md`.** One flag, three splice points (Step 1.5 parse, Step 5 scaffold injection, Step 5.5 body). Directly analogous to `ft-task/step-4-debug-mode.md`.

**`ft-close-epic` → `unattended-close-epic.md`.** Nine splice points. The skill-specific deltas go in a **sibling** fragment, *not* into the shared `ft-task/unattended-mode.md` — that file is loaded by four skills, and close-epic-only prose there would make the other three pay for it. Step 0 keeps the `<UNATTENDED>` shared-fragment Read and adds the sibling alongside it.

### D. Clarifying questions — resolved

1. **`--deep` extraction vs. three true PLATFORMS claims → extract, fix the rows.** The 12% cut is modest and the cost is three cells becoming false. Operator chose extraction on the reasoning in §B: the "no fragment" property is incidental description, and normalizing `--deep` onto its siblings' shape is worth three table-cell edits.
2. **`ft-release` §7.2 → file as a follow-up, do not fold in.** `ft-release` is the roster's most at-risk file (38,824; ~1.2k headroom) and [[CORE-507]] explicitly left its §7.2 extraction as an operator decision. It is not in CORE-508's PLAN line, so folding it in would widen filed scope; operator chose a separate follow-up filed at closure.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-042.9]]'s fragment shape (H1 + one-line back-ref + verbatim content) and `/ft-task`'s sited-pointer idiom. No new shape invented; both fragments are content, not machinery.

- [x] **Minimal refactor gate** — the only rewritten content is the twelve dispatch pointers the moves made necessary, plus one genuine de-duplication (see notes). `ft-epic-discovery`'s `## Notes` and Step 10, and `ft-close-epic`'s Step 9 body, are all *linear* content and were deliberately left inline.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: no executable code changed. The equivalent assurance is the two-way losslessness diff plus walking every dispatch pointer against its fragment section (Phase 3), which is stronger than a unit test here.

**Implementation Notes:**

**Two fragments, two different extraction shapes.**

`ft-epic-discovery` → `step-5.5-deep-prepass.md` (4,716) — a scripted byte-slice of L153–186 plus the L43 rationale and L139 scaffold-injection block, all moved verbatim. Three dispatch pointers (Step 1.5 parse, Step 5 scaffold, Step 5.5 heading). **31,097 → 28,041 (−9.8%).**

`ft-close-epic` → `unattended-close-epic.md` (6,707) — nine clauses, three of them *mid-line* (the foreign-dirt tail, the clarifying-questions clause, the clarifications-branch park), so each was split at the clause boundary rather than moved whole. Nine dispatch pointers, each naming its fragment section explicitly. **30,231 → 26,926 (−10.9%).**

**A `<SKILL_DIR>` binding was added to both Step 0 blocks**, `<root>`-prefixed per the [[CORE-400]] adopter-path trap — both skills are adopter-wired, so a literal `claude/skills/…` path would break under `.flowtron/core/`. This is the one place `/ft-release`'s precedent does *not* transfer: that skill is flowtron-self-only and correctly uses literal paths.

**Discovery missed something, found in Phase 2.** The shared `ft-task/unattended-mode.md` already carries a `## /ft-close-epic` section summarizing what this skill shares and differs on. The nine extracted clauses are the *sited executable* layer over that *orientation* layer — genuinely different roles, so both are kept and the new fragment's header states the split explicitly ("Read that one for the posture, this one for where each rule lands in the run"). Recorded rather than silently trimmed; a future reader deciding they are redundant should read this paragraph first. Verified zero literal duplication between the two.

**One de-duplication applied.** `ft-epic-discovery`'s new `--deep` pointer initially restated "flow is byte-identical to the pre-`--deep` skill", which the adjacent default-flow bullet already says. Removed — the only content cut that was not a pointer rewrite.

**Sizes missed both Acceptance targets, honestly.** `<28,000` → 28,041 (41 over); `<26,000` → 26,926 (926 over). Both targets were Discovery *projections* built on a ~900-byte dispatch-stub estimate. Actual pointer cost is higher because each names its fragment section verbatim — which is precisely the property that makes the no-stranded-branch check pass. Shaving load-bearing prose to cross a self-set line would have traded a real guarantee for a round number; the targets were wrong, not the work. Annotated on the criteria rather than met.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` in the unit sense (markdown only; `AGENTS.md` §"Validation" scopes its commands to viz and the fleet updater, neither touched). Substituted the stronger gate below: every CI drift check re-executed, and every dispatch pointer resolved against its target.

- [x] Ran lint/type-check on changed code — `N/A`, same reason. No JS/TS touched.

- [x] **Quality assertions** — no avoidable duplication (proved by two-way diff: zero substantive lines present in both a SKILL.md and its fragment), no dead content, no unexplained complexity, no public-surface growth beyond the two dispatched fragments. The stale-documentation class was actively hunted rather than assumed clean — six `docs/PLATFORMS.md` cells found false-or-incomplete and fixed, then a repo-wide sweep confirmed no other surface asserts the old state.

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Losslessness proved by two-way diff against `HEAD`.** Every substantive line of both original files was checked for presence in either the new `SKILL.md` or its fragment. Seven lines came back absent from both — all seven are *mixed* lines I rewrote in place (the Step 0 read dispatch, the `--deep` bullet, the foreign-dirt tail, open-siblings, clarifying-questions, the clarifications branch, the parent-flip opener), not lost content. The reverse check found **zero** substantive lines present in both a `SKILL.md` and its fragment — no duplication introduced.

**Content survival checked by phrase, not by line.** Because a line-level diff cannot distinguish "rewritten" from "dropped", every moved clause was re-verified by its distinctive phrase: 7 phrases for the deep fragment, 13 for the unattended fragment. **20/20 present.**

**Every dispatch pointer resolved against its target** — the check that actually guards the no-stranded-branch criterion, and the reason [[CORE-507]]'s parting advice was to run rather than read:

| Skill | Pointers | Fragment sections | Result |
|---|---|---|---|
| `ft-epic-discovery` | 3 | 6 | all resolve |
| `ft-close-epic` | 9 | 6 | all resolve |

One near-miss caught and fixed: the Step 5.5 pointer quoted `§"Step 5.5 — Deep pre-pass"` against a heading reading `§"Step 5.5 — Deep pre-pass (only on `--deep`)"` — unambiguous to a reader, but not grep-exact. Made exact.

**CI drift gates re-executed, all clean:** shipped-skill parity (claude ↔ codex), Pair A (templates roster), Pair B (description flags), Pair C (back-link depth), Pair E (roster rows + roster flags), and the SPEC wrapper-name invariant.

**Wiring verified, not assumed.** `.claude/skills/` and `~/.claude/skills/` both list the new fragments — directory symlinks, so they travelled with zero re-wiring. The CI `drift` job's `claude/skills/*/SKILL.md` glob was run and matches neither fragment. Both Codex wrappers read the canonical body by relative path, and both fragments sit in the same directory as their `SKILL.md`, so every `../../../` link inside the moved content resolves unchanged — no depth repairs were needed in either fragment.

**One cross-reference repair.** `ft-close-epic` L199's "Compute eligibility exactly as above" pointed at Step 8's eligibility rules, which stay in `SKILL.md`; inside the fragment "above" would have resolved to nothing. Rewritten to name Step 8 explicitly. The `<UNATTENDED>` / `<SPEC_DIR>` bindings referenced from inside the fragment are declared in its header as resolved by SKILL.md Step 0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 18 entries walked; **16 no change, 2 updated**:
  - `README.md` · `SPEC.md` · `AGENTS.md` · `docs/MIGRATION.md` · `docs/CONVENTIONS.md` · `CONTRIBUTING.md` · `SECURITY.md` · `docs/AGENT-COMPAT.md` · `docs/WORKTREES.md` · `docs/VISION.md` · `docs/EXTERNAL-AGENTS.md` — **no change**. None makes a claim about where a skill's `--deep` / `--unattended` content physically lives; behavior is unchanged, and `SPEC/*.md` + `claude/skills/*/SKILL.md` are outside the sweep set by declaration.
  - `claude/AGENTS-snippet.md` · `cursor/AGENTS-snippet.md` · `grok/AGENTS-snippet.md` — **no change**, verified by grep rather than assumed: none names a per-skill fragment roster.
  - `codex/AGENTS-snippet.md` — **no change**, and the interesting one. Its §"Translation rules" says "a wrapper may add a rule of its own — `ft-task` names one for its lazy fragments." Checked whether the two epic wrappers now need the same rule: **they do not.** `ft-task`'s Codex wrapper routes to the *SOP* first, and the SOP carries no fragment dispatch, so its wrapper must supply one. Both epic wrappers route straight to the canonical body, which owns the `<SKILL_DIR>` Read dispatch in its own Step 0 — exactly the asymmetry `docs/PLATFORMS.md`'s Codex `--deep` row already describes as "no two-step SOP hop". Recorded so a later reader does not "fix" the absence.
  - `docs/AGENT-NEUTRALITY.md` — **no change**. The ledger tracks Claude-specific surfaces inside *agent-neutral* files; `claude/skills/` is wholly Claude-side by construction, so two new fragments there add no neutral-file exception.
  - `docs/PLATFORMS.md` — **updated (6 cells).** Three `--deep` rows (Grok / Codex / Cursor) asserted the flag had "no lazy fragment" — the deliberate consequence surfaced in Discovery §B and confirmed by the operator. Three `--unattended` rows enumerated only the shared `unattended-mode.md`, which the new `/ft-close-epic` sibling makes incomplete.
  - `claude/CAPABILITIES.md` — **updated (2 cells).** Its `--deep` row was the only flag row not naming its fragment (the `--debug` and `--park` rows both open "loads the `X` lazy fragment"), so the split left it inconsistent with its own siblings; and the neutrality-ledger note on `--unattended` named only the shared fragment. Both brought current. The doc's last-verified stamp is untouched — this is not a version bump.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [ ] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Two of flowtron's three flat 30k-band skills now load only what a run actually reaches. `/ft-epic-discovery`'s `--deep` pre-pass and `/ft-close-epic`'s `--unattended` posture were being paid for on every invocation despite being opt-in branches most runs never take; both now live in lazy fragments the skill reads only when the flag is set. `ft-epic-discovery` dropped 31,097 → 28,041 (−9.8%), `ft-close-epic` 30,231 → 26,926 (−10.9%).

**Changed:** 6 files. Two `SKILL.md` bodies; two new fragments (`step-5.5-deep-prepass.md` 4,716 · `unattended-close-epic.md` 6,707); `docs/PLATFORMS.md` (6 cells); `claude/CAPABILITIES.md` (2 cells). Plus `.flowtron/PLAN.md` + the archive move.

**Verification:** losslessness proved by two-way diff against `HEAD` — zero content lost, zero duplication introduced — then re-checked at phrase level (20/20 moved clauses present), because a line diff cannot tell "rewritten" from "dropped". All 12 dispatch pointers were resolved against their fragment sections; one grep-inexact pointer was caught and fixed. Six CI drift gates re-executed clean, and wiring was confirmed by listing the live symlink targets rather than reasoning about them.

**Refactors:** none beyond the moves and their pointers, plus one duplicated sentence removed. `ft-epic-discovery`'s `## Notes` / Step 10 and `ft-close-epic`'s Step 9 body are linear content every successful run reaches — extracting them would cost a Read for the same tokens, so they were deliberately left inline.

**Documentation:** 18 entries swept, 16 unchanged, 2 updated (8 cells total).

**Three things the operator should know.**

1. **Both size targets were missed** — 28,041 against `<28,000` and 26,926 against `<26,000`. The targets came from a Discovery estimate of ~900 bytes of dispatch stubs; real pointers cost more because each names its fragment section verbatim, which is exactly what makes the no-stranded-branch check pass. Flagged rather than papered over: shaving load-bearing prose to cross a self-set line would have traded a real guarantee for a round number.
2. **`ft-release` is now the roster's most at-risk file**, at 38,824 with ~1.2k headroom — thinner than either file this task touched. Per §D2 it is filed as a follow-up rather than folded in, preserving [[CORE-507]]'s operator-owned deferral.
3. **The PLAN line's band census is stale** and Phase 4 collapses it to a stub, so it is recorded here instead: "only `ft-task` has sub-files" stopped being true at commit `205f421`, which also moved `ft-release` *into* the 30–40k band the line describes.

**Maintainability effect:** the conditional surfaces now have their own files. `--unattended` in particular has grown by accretion across [[CORE-473.2]] / [[CORE-473.4]] / [[CORE-494]] / [[CORE-495]]; that growth can continue in `unattended-close-epic.md` without pushing the skill body back toward the cap, which is the property the split was for.

**Archived:** 2026-08-30
