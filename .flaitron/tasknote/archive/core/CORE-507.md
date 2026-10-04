---
title: ft-release-context-split
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: [CORE-508]
touches:
  - claude/skills/ft-release/
---

# CORE-507 | ft-release-context-split

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-508]]

## 🎯 Goal

Split `claude/skills/ft-release/SKILL.md` (76,766 chars, ~2× the ~40k load
threshold) into a thin dispatcher plus lazy sub-files — extracting Step 7.1's
doc-drift sweep and Step 7.2's tag-message drafting following the established
`ft-task/` + `ft-audit/passes/` pattern — then re-evaluate whether Step 2.5's
context-budget escape hatch is still needed.

## ✅ Acceptance

- [x] `claude/skills/ft-release/SKILL.md` is under the ~40k load threshold — **38,824 bytes**, down from 76,767 (−49%). Missed the ~36k target by 2.8k of net-new content the task itself required (dispatch block + Step 2.5 re-evaluation); threshold met, headroom thin — see Final Summary.
- [x] §7.1's content lives in two sibling sub-files — `step-7.1-standing-checks.md` (11,650) and `step-7.1-mirror-pairs.md` (28,831) — moved **verbatim** (scripted slice; losslessness proved by two-way line diff against `HEAD`)
- [x] §7.1 in SKILL.md retains its heading and dispatches a parallel Read of both sub-files, following the CORE-042.9 fragment shape
- [x] Every relative cross-reference the move breaks is repaired — **seven, not six**: the six from Discovery §C plus §5's `(line 159)` citation, invalidated by the Step 2.5 paragraph shifting Step 5 by two lines
- [x] The external `§7.1` citations still resolve — **six, not four**: Discovery under-counted by missing `codex/AGENTS-snippet.md:22` and `grok/AGENTS-snippet.md:41`. All are section-level; the `### 7.1` heading stays in `SKILL.md`, so all six hold.
- [x] Step 2.5's escape hatch re-evaluated with a recorded verdict — **keep**, recorded in-file so the next reader sees the reasoning, not only in this tasknote
- [x] §7.2 left inline — de-scoped from the PLAN line with the measurement recorded (operator decision, Phase 1 §D)
- [x] Repo validation gates pass — `N/A` as written: `AGENTS.md` §"Validation" scopes its six commands to viz and the fleet updater, and this change touches neither. Substituted a stronger gate — every moved check re-executed from its new home (Phase 3 table), all clean.

## 🧩 Subtasks

- [ ] Extract lines 375–617 verbatim → `step-7.1-mirror-pairs.md` with the fragment back-ref header
- [ ] Extract lines 256–374 verbatim → `step-7.1-standing-checks.md` with the fragment back-ref header
- [ ] Replace §7.1's body in SKILL.md with the parallel-Read dispatch block
- [ ] Apply the six cross-reference repairs across the two sub-files
- [ ] Re-evaluate Step 2.5; record the verdict and add the one-sentence note if kept
- [ ] Verify sizes, run the validation gates, and re-run §7.1's own standing checks against the split repo

## 🔗 Related

- [[CORE-508]] — related-decision: the 30–40k band split (`ft-epic-discovery`, `ft-close-epic`); this task sets the extraction pattern those follow

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Condition verified live and byte-exact — `SKILL.md` is 76,767 bytes and §7.1 is 40,750, matching the filed numbers precisely. The extraction pattern (`ft-task/` lazy fragments, `ft-audit/passes/`) is established and applies cleanly. Proceeds with one operator-approved narrowing: §7.2 stays inline (see Discovery Notes §D).

- [x] Read relevant source files — `claude/skills/ft-release/SKILL.md` (full section map + §7.1 body), `claude/skills/ft-task/SKILL.md` Step 0 (fragment-dispatch idiom), `claude/skills/ft-audit/SKILL.md` (`passes/` dispatch + subroutine-safe rule), `SPEC.md` §"Tasknote frontmatter" / §"Phase 4".

- [x] **Best Practices Review** — Touched responsibility is one file's *load shape*, not its behavior: every check keeps its current semantics and moves verbatim. Dependency direction is one-way (SKILL.md → sub-files); no sub-file reaches back except by named section, which is why the six relative-reference repairs in §C are Acceptance-bearing rather than cosmetic. The established shape is CORE-042.9's fragment (H1 + one-line back-ref + verbatim content) plus `ft-audit`'s sibling-directory dispatch — extended, not replaced. No new abstraction: the sub-files are content, not machinery. Unrelated cleanup in `ft-release` (Step 5 at 10k is the next-largest section) is explicitly deferred — it is under the cap and out of scope.

- [x] **Archive skim** — `grep -rl 'claude/skills/ft-release' archive/core/` → 30+ hits; two are load-bearing, plus one shape precedent:
  - [[CORE-400]] (`model-edge-fragment-strategy`) — records the canonical fragment shape minted by [[CORE-042.9]]: *"H1 + 1-line back-ref note + verbatim moved content"*, with a parallel-Read stub at the branch entry. Also records the adopter-path trap it fixed (fragment paths must be `<root>`-prefixed). **Does not apply here** — `/ft-release` is flowtron-self-only and Step 0 hard-refuses to run in an adopter, so `<root>` is always the repo root and literal `claude/skills/ft-release/…` paths are correct. Recording this so the next reader does not "fix" it into a placeholder.
  - [[CORE-465]] — replaced §7.1's hand-maintained wiring *count* check with the derivation check; the "stop counting, start deriving" rationale is preserved verbatim in the move.
  - [[CORE-491]] — added Pair K last week. Pairs have grown A→K; this is the block's growth vector and the reason it gets its own file rather than sharing one 40k sub-file.

- [x] **Drift check** — see §B. Filed numbers verified byte-exact; four external `§7.1` citations enumerated; six internal references identified as breaking under the move.

- [x] Asked clarifying questions — 2 resolved via AskUserQuestion; see §D.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Measured state (bytes, matching the filed units)

| Region | Lines | Bytes |
|---|---|---|
| `SKILL.md` total | 1–759 | 76,767 |
| §7.1 whole | 256–617 | **40,750** |
| — standing checks | 256–374 | 12,618 |
| — mirror pairs A–K | 375–617 | 28,132 |
| §7.2 tag message | 618–669 | 2,375 |
| §5 execution (next largest) | 156–231 | ~10,051 |

`SKILL.md` after extracting §7.1 alone: **36,017 bytes** — under the ~40k threshold without touching §7.2.

### B. Drift check

**No drift in the filed claims.** Both cited figures are byte-exact (76,766/76,767 is a trailing-newline rounding; §7.1 = 40,750 on the nose). The `ft-task/` + `ft-audit/passes/` pattern cited as the model exists and is current.

**Wiring verified safe.** `.claude/skills/ft-release` and `~/.claude/skills/ft-release` are *directory* symlinks, so new sibling files travel with no re-wiring. `codex/skills/ft-release/SKILL.md` is a thin wrapper that reads the canonical body by relative path, so sub-files resolve relative to it. No `SPEC/procedures/ft-release.md` SOP exists, so there is no `last-verified:` currency impact (only `ft-task` has an SOP). §7.1's own shipped-skill and self-wiring checks compare *directories*, so adding files inside `ft-release/` cannot trip them.

**External `§7.1` citations (4) survive** — all cite the section, and the `### 7.1` heading stays in SKILL.md: `README.md:26-28`, `claude/AGENTS-snippet.md:54`, `cursor/AGENTS-snippet.md:38`, `claude/skills/ft-audit/SKILL.md:97`.

### C. The real risk surface — six references the move breaks

Relative pointers are load-bearing here; a verbatim move silently strands them. Swept all of 256–617 for `above` / `below` / `this skill` / `same file`:

| # | Line | Current | Breaks because | Repair |
|---|---|---|---|---|
| 1 | 362 | "the SOP-currency check **above**" | SOP-currency lives in Step 5, staying in SKILL.md | → "in Step 5" |
| 2 | 364 | "the SOP-currency block **above**" | same | → "in Step 5" |
| 3 | 388 | Pair B: "The shipped-skill parity check **above**" | that check moves to the *other* sub-file | → name `step-7.1-standing-checks.md` |
| 4 | 418 | Pair D: "the Standing README task-counter check **above**" | same | → name `step-7.1-standing-checks.md` |
| 5 | 488 | Pair H: "**this skill's** Step 6 fence" | "this skill" is ambiguous from inside a sub-file | → "`/ft-release` SKILL.md's Step 6 fence" |
| 6 | 490 | Pair H: "this pair's own command list lives in **the same file**, and a whole-file grep would never fail" | after the split the pair's list is in `step-7.1-mirror-pairs.md`, not SKILL.md — the stated justification becomes false | rewrite: the `awk` Step 6 scoping stays (now stricter, not self-defence) |

Verified **not** broken, left alone: L312/L335 (intra-standing-checks), L465/L612 (intra-mirror-pairs), Pair J L550 and Pair K L580 ("every check/pair above" — both resolve within the pairs file), and K1 L582's `… "<title>" above` which is a **quoted literal from `SPEC.md`**, not a cross-reference.

### D. Clarifying questions — resolved

1. **§7.1 granularity → two sub-files.** A single 40k sub-file would reproduce the exact >40k condition CORE-507 was filed about, one directory level down, and Pairs A→K are the demonstrated growth vector ([[CORE-491]] added K on 2026-08-29). Split lands on a real seam: mechanical shell diffs vs. a catalogue of drift classes. Accepted risk — two reads instead of one; a missed second read silently skips the Pair A–K gates, mitigated by an explicit parallel-Read dispatch line (the idiom `/ft-task` Step 1.5 already uses).
2. **§7.2 stays inline — de-scope of a named PLAN deliverable.** Extracting §7.1 alone already clears the threshold (36,017 bytes); §7.2 adds 2,375 (3.1%). §7.2 is a *linear* step — it runs on every cut — so deferring it saves nothing at load time and costs a Read at closure. Operator chose to leave it. The PLAN line's §7.2 clause is therefore not delivered; recorded here rather than silently dropped.

### E. Step 2.5 re-evaluation (the PLAN line's third ask)

Deferred to Phase 2, after the measured post-split size is real rather than projected. Framing: the escape hatch guards *remaining context budget for the whole cut*, which is a superset of eager skill-load size — the `/ft-audit docs` subroutine (5 passes), the dogfood walk, and §7.1's 40k arriving at Step 7 all still land inside one session. The split improves the odds; it does not remove the failure mode. Expected verdict is **keep**, with a note that eager load dropped.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-042.9]]'s fragment shape (H1 + one-line back-ref + verbatim content) and `ft-audit`'s sibling-file dispatch. No new shape invented; the fragments are content, not machinery. Composition over duplication — the checks are composed in by path, never copied.

- [x] **Minimal refactor gate** — the only content rewritten is the seven repairs the move made necessary (six identified in Discovery §C, plus one found in Phase 3). `ft-release`'s next-largest section (Step 5, ~10k) is under the cap and was deliberately left alone.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: no executable code changed. The equivalent assurance is dogfooding every moved check against the split repo (Phase 3), which is stronger than a unit test here.

**Implementation Notes:**

**Extraction was scripted, not transcribed.** A Python slice moved lines 272–373 → `step-7.1-standing-checks.md` and 375–617 → `step-7.1-mirror-pairs.md` byte-for-byte, so no content passed through hand-retyping. §7.1's intro (the `/ft-audit docs` subroutine invocation + Critical/High/Medium/Low triage, lines 258–270) stayed in `SKILL.md` — it is the step's primary action and the thing `ft-audit`'s subroutine-safe rule points at, so a reader of §7.1 still learns what the step *does* without opening a fragment.

**Losslessness proved against `HEAD`.** Diffing every substantive line of the old 272–617 range against the two fragments returned exactly 6 absent lines — precisely the 6 planned repairs, nothing else. A reverse check found only 2 lines present in both `SKILL.md` and a fragment: `node --test/--check tools/update-adopters.test.mjs`, which is Pair H's heredoc asserting Step 6 names those commands. That co-occurrence is the check working, not duplication.

**Repairs applied (7).** The six from Discovery §C, plus one Phase 3 discovery: §5's version-pin grep moved from line 159 → 169 (the Step 2.5 re-evaluation paragraph shifted it), so the standing-checks fragment's `(line 159)` citation was replaced with a line-number-free description. Two further stale line-number citations into `SKILL.md` were found outside the skill — `.flowtron/tasknote/README.md:77`'s `SKILL.md:567`, now dead (the file is 430 lines), repointed to `/ft-release` §7.1. Every other `ft-release/SKILL.md:<line>` citation in the repo lives in `.flowtron/tasknote/archive/`, which is write-once and correctly untouched.

**Step 2.5 verdict — keep.** Recorded in-file as a re-evaluation paragraph rather than only here, so the next reader of Step 2.5 sees why it survived. The hatch guards remaining budget for the *whole cut*, a superset of eager skill-load size: the two fragments are ~40k that still arrives, just at Step 7 instead of Step 0, and the `/ft-audit docs` subroutine, dogfood walk, and version edits are unchanged. Halving the eager load improves the odds of a clean inline cut; it does not remove the failure mode.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` in the unit sense (markdown only; `AGENTS.md` §"Validation" says use the narrowest validation covering the change, and the viz/tools suites cover neither). Replaced by dogfooding the moved checks, below.

- [x] Ran lint/type-check on changed code — `N/A`, same reason. No JS/TS touched.

- [x] **Quality assertions** — no duplication (proved by the two-way line diff above), no dead content, no unexplained complexity, no public-surface growth beyond the two dispatched fragments, and the stale-documentation class was actively hunted rather than assumed clean (3 stale citations found and fixed).

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface.

**Testing Notes:**

**Every moved check was executed from its new home** — the real test, since the risk was a check that silently stops working once relocated:

| Check | Result |
|---|---|
| Pair H — presence across 5 sites | clean (its `awk` Step 6 scoping still resolves; both headings stayed in `SKILL.md`) |
| Pair H — CI verbatim half | clean |
| Pair K — K1 + K2, run verbatim from the fragment | clean, exit 0 |
| Wiring-consumer derivation (2 greps) | both silent, exit 1 |
| Shipped-skill parity (Claude ↔ Codex) | identical |
| Installed-surface policy (5 diffs) | all silent |
| Self-wiring parity, local (4 commands) | all silent |

**One false alarm, corrected.** An ad-hoc paraphrase of K1 reported 5 misses; re-running the fragment's actual script verbatim returned clean. The paraphrase was wrong, not the repo — recorded because it is the exact trap this task's structure invites (reading a check instead of running it).

**Wiring and consumers verified.** `.claude/skills/ft-release/` and `~/.claude/skills/ft-release/` both list all three files — they are *directory* symlinks, so the fragments travelled with zero re-wiring. Six external `§7.1` citations resolve (`README.md`, `claude/`, `codex/`, `cursor/`, `grok/` snippets, `ft-audit/SKILL.md`) — two more than Discovery enumerated, all section-level and all intact. `.github/workflows/ci.yml`'s `drift` job reads `claude/skills/*/SKILL.md` at directory/frontmatter level only; `*/SKILL.md` does not match the new siblings, so CI is unaffected.

**Size outcome — honest number.** `SKILL.md` is **38,824 bytes**, not the ~36k projected at Discovery. The 2.8k gap is net-new content the task itself required: the parallel-Read dispatch block (~1.1k) and the Step 2.5 re-evaluation paragraph (~0.7k), plus fragment-header overhead. Under the ~40k threshold and a 49% cut, but with only ~1.2k of headroom — see Final Summary.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 18 entries walked; **17 no change, 1 updated**:
  - `README.md` · `AGENTS.md` · `SPEC.md` · `docs/MIGRATION.md` · `CONTRIBUTING.md` · `SECURITY.md` · `docs/EXTERNAL-AGENTS.md` · `docs/WORKTREES.md` · `docs/VISION.md` · `claude/CAPABILITIES.md` — **no change**. Each either never names `/ft-release` or names it only as a slug; no flag or capability was added.
  - `claude/` · `codex/` · `cursor/` · `grok/AGENTS-snippet.md` — **no change**. All four cite `/ft-release` **§7.1** at section level; the heading stays in `SKILL.md`, so all four resolve. (Two of these were the citations Discovery missed.)
  - `docs/CONVENTIONS.md` — **no change**, verified rather than assumed: §"GitHub Actions CI" says the `drift` job runs "the release-context-free subset of `/ft-release` §7.1's standing cross-file checks." Read `ci.yml` — it reads `claude/skills/*/SKILL.md` at directory/frontmatter level only and never greps §7.1's body; `*/SKILL.md` does not match the new siblings. Claim still true.
  - `docs/PLATFORMS.md` — **no change**, and notably already correct: its Claude row describes the wiring surface as `skills/*/SKILL.md` **"(+ lazy fragments)"**, which is exactly what this task added. No edit needed.
  - `docs/AGENT-NEUTRALITY.md` — **no change**. The ledger tracks Claude-specific surfaces inside *agent-neutral* files; `claude/skills/` is wholly Claude-side by construction, so two new fragments there add no neutral-file exception.
  - `docs/AGENT-COMPAT.md` — **no change**. Cites `ft-release` §5/§7 at section level; §5 and §7 both remain in `SKILL.md`.
  - `.flowtron/tasknote/README.md` — **updated**. Its §"Accepted residual risk" cited `claude/skills/ft-release/SKILL.md:567`, a line this split put out of range (the file is now 430 lines). Repointed to `/ft-release` §7.1 — dropping the line number rather than re-pinning it, since the citation is illustrative and line numbers in this file demonstrably drift.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [ ] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

`/ft-release`'s skill body was roughly twice the size at which a skill file still loads cheaply, and almost all of the excess was one section: §7.1's doc-drift sweep. That section now lives in two sibling fragments the skill reads when it actually reaches closure, so the body that loads at invocation dropped from 76,767 to 38,824 bytes — a 49% cut — and a run that bails early (wrong directory, no release line, version drift) never pays for the sweep at all.

**Changed:** 5 files. `claude/skills/ft-release/SKILL.md` (76,767 → 38,824); new `step-7.1-standing-checks.md` (11,650) and `step-7.1-mirror-pairs.md` (28,831); `.flowtron/tasknote/README.md` (1 citation); `.flowtron/PLAN.md` + archive move.

**Verification:** the extraction was a scripted byte-slice, and losslessness was proved by diffing every substantive line of the old range against the two fragments — exactly the 7 intended repairs differ, nothing else. Then every moved check was *executed* from its new home rather than eyeballed: Pair H (both halves), Pair K's K1 and K2 run verbatim, the wiring-consumer derivation, shipped-skill parity, all five installed-surface diffs, and all four local self-wiring commands — all clean. Wiring needed no changes: `.claude/` and `~/.claude/` point at the directory, so the fragments travelled on their own.

**Refactors:** none beyond the move. `ft-release`'s next-largest section (Step 5, ~10k) is under the cap and was deliberately left alone.

**Documentation:** 18 swept entries, 17 unchanged, 1 fixed. `docs/PLATFORMS.md` already described the Claude surface as "`skills/*/SKILL.md` (+ lazy fragments)", so the shape this task produced was already the documented one.

**Two things the operator should know.**

1. **Headroom is thinner than the plan assumed.** The de-scope of §7.2 was decided on a projection of ~36k; the real number is 38,824, because the dispatch block and the Step 2.5 re-evaluation are net-new content. That leaves ~1.2k before the threshold — one moderate edit to `ft-release`. Extracting §7.2 (2,375 bytes) after all would restore real headroom and is a ~10-minute follow-up. Flagging rather than reversing a decision that was the operator's to make.
2. **Discovery under-counted twice** — four external §7.1 citations were really six, and six broken cross-references were really seven. Both were caught in Phase 3 because the checks were run rather than read, which is also how a false K1 failure got corrected. The pattern is worth carrying into CORE-508.

**Maintainability effect:** the growth vector now has its own file. Pairs A→K have been added one drift class at a time (K landed on 2026-08-29); that catalogue can keep growing without pushing the skill body back over the cap, which is the property this split was actually for.

**Archived:** 2026-08-30
