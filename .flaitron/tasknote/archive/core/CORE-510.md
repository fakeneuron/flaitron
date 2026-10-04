---
title: paste-block-restatement
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: [CORE-509, CORE-495, CORE-512]
touches:
  - claude/AGENTS-snippet.md
  - AGENTS.md
---

# CORE-510 | paste-block-restatement

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-509]] · [[CORE-495]] · [[CORE-512]]

## 🎯 Goal

Cut the five restatement-shaped bullets in `claude/AGENTS-snippet.md`'s adopter paste-block down to a one-line what-it-is plus the SPEC path they already cite, so adopters carry a pointer rather than a duplicate of the contract.

## ✅ Acceptance

- [x] Paste-block bullets 19 (filing-skill roster), 23 (`--unattended`), 24 (`/ft-goal-task`), 26 (`/ft-spec`), 27 (`/ft-refactor`) each reduced to a one-line what-it-is plus the SPEC path they already cite — no bullet re-derives a contract the cited path carries
- [x] Every SPEC path and `§"heading"` named in a trimmed bullet resolves to a real file and a real heading in this checkout
- [x] `/ft-file-followup`'s `--park [--low|--med|--fut|--high]` flag roster survives in bullet 19 (the KEEP IN SYNC comment's explicit exception carve-out)
- [x] No claim CORE-495 corrected in bullet 23 is reintroduced in a weaker form — the trimmed bullet asserts nothing about `--fast` inheritance beyond "never pass both"
- [x] The KEEP IN SYNC comment pair (`AGENTS.md:16`, `claude/AGENTS-snippet.md:9`) no longer claims richer detail lives in the paste-block where it no longer does
- [x] `/ft-release` §7.1's standing wiring-consumer + three platform-snippet derivation checks still pass (they read the `ln -s` block, which this task does not touch)
- [ ] Paste-block total drops materially from 7,255 chars (target ≤ 5,200) — **not met, by 29 chars**: landed at 5,229 (−2,026, 28%). The 5,200 figure was a round number set in Discovery, not a requirement from the PLAN line; shaving 29 more chars would have meant cutting prose to hit a self-set target rather than because it restated something. Substance of the criterion — a material drop — is met.

## 🧩 Subtasks

- [ ] Rewrite bullet 19 — keep skill names + park-flag roster, drop per-skill parentheticals, point at `SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)" + `SPEC/epic.md`
- [ ] Rewrite bullet 23 — one-line posture statement + "never pass both" + `SPEC/gates.md` §"`--unattended` operator posture"
- [ ] Rewrite bullet 24 — one-line `/ft-goal-task` statement + `SPEC/loop.md` + heartbeat template path
- [ ] Rewrite bullet 26 — one-line `/ft-spec` statement + `SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)"
- [ ] Rewrite bullet 27 — one-line `/ft-refactor` statement + same path
- [ ] Update the KEEP IN SYNC comment in `claude/AGENTS-snippet.md:9` (paste-block is no longer the richer-detail side)
- [ ] Update the mirrored KEEP IN SYNC comment in `AGENTS.md:16` the same way
- [ ] Verify every cited SPEC path + heading resolves; re-measure paste-block char count
- [ ] Run `/ft-release` §7.1's wiring-consumer + platform-snippet derivation checks

## 🔗 Related

- [[CORE-509]] — predecessor: established the dereference-not-restate pattern on this same paste-block (4-phase bullet → `SPEC.md` pointer)
- [[CORE-495]] — wrote the current text of the `--unattended` bullet; this task must not reintroduce the blanket-inheritance claim CORE-495 corrected
- [[CORE-512]] — sibling from the same 2026-08-30 audit-context run; targets `AGENTS.md:16` density (structural break-up), distinct from this task's snippet trims

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Every cited number verifies live — the paste-block fence (`claude/AGENTS-snippet.md:12-30`) measures 7,255 chars and line 23 measures exactly 1,498. Bullets 19/24/26/27 measure 789/555/596/645, all the same restate-then-cite shape. The task is well-scoped and actionable as filed.

- [x] Read relevant source files — `claude/AGENTS-snippet.md` (full), `AGENTS.md` (full), `SPEC.md`, `SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)", `SPEC/gates.md` headings, `claude/skills/ft-release/step-7.1-mirror-pairs.md` + `step-7.1-standing-checks.md`.

- [x] **Best Practices Review** — `N/A (no code)`: prose-only edit to one adopter-facing markdown surface plus a mirrored comment in `AGENTS.md`. No module boundaries, dependency direction, or abstractions in scope.

- [x] **Archive skim** — `grep -l "AGENTS-snippet"` over `archive/core/` returns broad noise (the file is named in most release-adjacent notes), so narrowed two ways: `grep -l "paste-block"` (25 hits) and `grep -l "^  - claude/AGENTS-snippet.md"` in YAML `touches:` (4 hits: CORE-196, CORE-205.4, CORE-456.3, CORE-495). Load-bearing findings:
  - **[[CORE-509]]** (closed 2026-08-30, the immediately preceding task) set the precedent this task extends: it dereferenced the paste-block's 4-phase bullet to `SPEC.md` §"The 4-phase workflow" rather than restating the phase names, and widened the KEEP IN SYNC comment pair to cover the path-convention bullets. Same file, same "reference, not restate" motion, one bullet at a time.
  - **[[CORE-495]]** wrote bullet 23's current text. It *narrowed* a previously wrong claim: the paragraph had enumerated five gates and asserted blanket `--fast` inheritance, when in fact `--unattended` supersets `--fast`'s autonomy but **not** its 👁️ delegation. Constraint for this task: the trim must not re-assert blanket inheritance in compressed form. Dropping the claim entirely (deferring to `SPEC/gates.md`) is the safe move.
  - **[[CORE-465]]** declared `claude/AGENTS-snippet.md` §"One-time symlink wiring" the SSOT for the adopter-wiring roster, with five derived surfaces. That is the `ln -s` block, **not** the prose paste-block — out of this task's scope and untouched.
  - **CORE-200** considered lifting a behavioral preference into the paste-block and explicitly weighed "paste-block bloat" as the cost, which is the same concern this task acts on. No prior decision anywhere argues the verbosity is deliberate.

- [x] **Drift check** — measured the current file: bullets 19/23/24/26/27 = 789/1,498/555/596/645 chars; fence total 7,255 (PLAN.md says 7,282 — a 27-char shrink from CORE-509's edit yesterday, not a discrepancy that changes anything). All five bullets already carry the SPEC path they restate, so the "reference, not restate" cut has a landing spot in every case:
  - 19 → `SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)" + `SPEC/epic.md` (both already cited in the bullet)
  - 23 → `SPEC/gates.md` §"`--unattended` operator posture" (heading confirmed at `SPEC/gates.md:463`)
  - 24 → `SPEC/loop.md` + `templates/loop-heartbeat-template.md` (both already cited)
  - 26 / 27 → `SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)" carries `/ft-spec` at :25-31 and `/ft-refactor` at :38-44 in full; neither bullet cites it today, so this adds the pointer they were missing
  - **Machine-safety:** every automated check that reads this file targets the `ln -s` wiring block, never the prose — `/ft-release` §7.1's standing wiring-consumer + platform-snippet derivation checks (`grep '^ln -s ...'`), and `tools/update-adopters.mjs` `wiredSkillKeys()`. Verified by `grep -rn "AGENTS-snippet"` over `claude/skills/ft-release/`, `tools/`, `.github/`. Trimming prose breaks no gate.
  - **Pair F carve-out:** the KEEP IN SYNC comment says the park-priority flags are required "on both surfaces", but Pair F's actual check globs `claude/commands/*.md` and names five files, none of which is `claude/AGENTS-snippet.md`. So the flags are a discipline convention here, not a gate. Keeping them costs 34 chars and honours the comment's explicit exception — do that rather than relitigating the carve-out.
  - **Cross-artifact half:** no SPEC contract governs paste-block length or requires these bullets to restate anything. `SPEC.md` §"Layout in adopting projects" and §"Skill namespace" describe the same skills without duplicating the gate contracts, which is the shape this task moves the paste-block toward.

- [x] Asked clarifying questions — **No clarifications needed.** Explicit assumptions: (1) scope is exactly the five bullets the PLAN line names — bullets 20/21/22 (reconciliation, worktrees, `--debug`; 518/395/334 chars) are the same family but were not filed, and widening scope mid-task is not this task's call; (2) skill *names* stay in bullet 19 — an adopter whose agent never opens SPEC still needs to know which slash commands exist, so "reference, not restate" cuts the per-skill descriptions, not the roster; (3) the KEEP IN SYNC comment pair is in scope as a mechanical consequence of the trim, not as independent work.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

The five bullets share one shape: a paragraph that re-derives a contract, followed by a citation of the SPEC path carrying that same contract. Bullet 23 is the extreme case — it enumerates six gate conversions, states the `--fast` superset relationship and its 👁️ exception, covers `/ft-close-epic`'s deferred parent-flip and the interrupted-session recovery path, then cites `SPEC/gates.md` §"`--unattended` operator posture" for the contract. Every one of those facts lives at the cited path.

The cost is structural, not stylistic: this text is copied into each adopter's `AGENTS.md`, so it is loaded into every context window in every adopting project, permanently, and it can drift from the SPEC independently in each repo (which is exactly what CORE-495 had to fix). A pointer cannot drift.

One consequence to handle in the same commit: both KEEP IN SYNC comments (`AGENTS.md:16`, `claude/AGENTS-snippet.md:9`) currently claim that "richer detail (stubs, gates)" lives in the paste-block. After this trim it lives in `SPEC/tasknote-selection.md` and `SPEC/gates.md` only, so both comments need the clause corrected. This overlaps `AGENTS.md:16` with the still-open [[CORE-512]] (that line's 756-char density), but only in the sense of touching the same line — CORE-512 is a structural break-up of the whole line, and correcting one clause here neither performs nor blocks it.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the shape [[CORE-509]] established on this exact file one day earlier: a bullet that restates a contract becomes a one-line statement plus the canonical `§"heading"` pointer, and the KEEP IN SYNC comment pair is corrected in the same commit. Also matched the citation idiom the untouched bullets already use (`Contract: <path> §"<heading>"`), so the five rewrites read as siblings of bullets 20/21/28/29/30 rather than a new voice. No new shape invented.

- [x] **Minimal refactor gate** — the only edit outside the five named bullets is the KEEP IN SYNC comment pair, which this change directly falsifies (both claimed richer detail lives in the paste-block). Deferred: bullets 20 (518 ch), 21 (395), 22 (334) are the same restate-then-cite family but were not filed — left for a future ticket rather than widened into this one.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: prose-only change to two markdown docs; no behavior to test.

**Implementation Notes:**

Two files, 7 lines changed. `claude/AGENTS-snippet.md`: five paste-block bullets rewritten, one KEEP IN SYNC comment corrected. `AGENTS.md`: the mirrored KEEP IN SYNC clause corrected.

Per-bullet result (chars before → after):

| Bullet | Subject | Before | After | Cut |
|---|---|---:|---:|---:|
| 19 | filing-skill roster | 789 | 370 | −419 |
| 23 | `--unattended` | 1,498 | 533 | −965 |
| 24 | `/ft-goal-task` | 555 | 460 | −95 |
| 26 | `/ft-spec` | 596 | 324 | −272 |
| 27 | `/ft-refactor` | 645 | 370 | −275 |

Paste-block fence total **7,255 → 5,229 chars (−2,026, 28%)**.

Judgment calls, each traceable to a Discovery finding:

- **Bullet 19 keeps the skill names.** "Reference, not restate" cuts the per-skill *descriptions*, not the roster — an adopter whose agent never opens SPEC still needs to know which slash commands exist. The `--park [--low|--med|--fut|--high]` flags stay for the KEEP IN SYNC comment's explicit exception carve-out (34 chars; Pair F doesn't actually gate this file, but the comment commits to it).
- **Bullet 23 drops the `--fast` superset explanation entirely** rather than compressing it. Compressing was the risk: CORE-495 had to correct exactly that claim once, and a shortened version is the likeliest place to re-flatten "supersets autonomy, not the 👁️ delegation" back into blanket inheritance. What survives is the operator-actionable half — the park behavior and "never pass both" — with the semantics left to `SPEC/gates.md`.
- **Bullets 26/27 gained a pointer they never had.** Neither cited `SPEC/tasknote-selection.md`, even though §"When to use a tasknote (and when not to)" carries `/ft-spec` (:25-31) and `/ft-refactor` (:38-44) in full. They restated without referencing; now they reference.
- **The KEEP IN SYNC comments name CORE-510** so a future editor reading "keep new detail out of the fence" can find why.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no code changed. In place of a suite, ran the checks that *do* cover these two files:
  - `/ft-release` §7.1 **standing platform-snippet derivation check** — `ln -s` skill set from `claude/AGENTS-snippet.md` diffed against `codex/`, `cursor/`, `grok/AGENTS-snippet.md`: all three clean (the wiring block was not touched).
  - `/ft-release` §7.1 **Pair F** — all four park-priority flags present in the five named mirrors, and in `claude/AGENTS-snippet.md` itself.
  - **Citation resolution** — all five SPEC/template paths cited by the rewritten bullets exist; both quoted headings resolve (`^## When to use a tasknote (and when not to)$` in `SPEC/tasknote-selection.md`, ``^## `--unattended` operator posture$`` in `SPEC/gates.md`).
  - **Fence integrity** — 6 fence markers (3 balanced fences), unchanged.

- [x] Ran lint/type-check on changed code — `N/A` for type-check (no code). Markdown hygiene verified directly: no trailing whitespace on either file, both end in a final newline (`.editorconfig`). `.github/workflows/ci.yml` runs structural greps over `claude/skills/`, `claude/commands/`, `README.md`, `SPEC.md`, and `templates/` — none reads `AGENTS-snippet.md` prose or `AGENTS.md`, confirmed by reading the workflow.

- [x] **Quality assertions** — reviewed the full `git diff`: 7 changed lines, all five in scope plus the two KEEP IN SYNC clauses; no unrelated edit. This change *removes* duplication rather than adding it — 2,026 chars of contract restatement replaced by pointers to the canonical text. No dead prose left behind (each cut fact verified present at the path now cited). No public-surface growth: the paste-block's skill roster, its flag roster, and the `ln -s` wiring block are all byte-identical in coverage. No stale doc-facing claim survives — the two comments that asserted the paste-block holds the richer detail were corrected in the same commit.

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend surface; markdown-only change.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Every automated surface that reads `claude/AGENTS-snippet.md` targets the `ln -s` wiring block, never the prose fence — verified during Discovery by `grep -rn "AGENTS-snippet"` over `claude/skills/ft-release/`, `tools/`, and `.github/`, and re-confirmed by running the three derivation diffs above clean after the edit. So the trim is machine-safe by construction, and the meaningful verification here is citation resolution rather than a suite.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked all 18 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs". Grepped the whole set for `paste-block` claims to catch any doc asserting the fence carries the trimmed detail:
  - `AGENTS.md` — **updated** (this task's second target: the KEEP IN SYNC clause claimed richer detail lives in the paste-block).
  - `claude/AGENTS-snippet.md` — **updated** (this task's primary target).
  - `docs/PLATFORMS.md` — no change. Its three paste-block claims survive intact: :39 already says the contract detail "all live in `SPEC.md`" (this trim moves the block *toward* that statement, not away); :169-170 requires agent-neutral framing (preserved — no Claude-specific text added); :247 calls the block "the contract entry-point" (still true — it names every skill and points at every contract).
  - `docs/MIGRATION.md` — no change. Its four references (:32, :66, :328, :437) point at the block as a location to copy from, never at its prose depth.
  - `docs/AGENT-COMPAT.md` — no change (:55, :58 describe the block as the cross-agent target file, not its content).
  - `docs/WORKTREES.md` — no change (:71 cites the block for wiring only; the worktree bullet 21 was not touched).
  - `codex/`, `cursor/`, `grok/AGENTS-snippet.md` — no change. Verified: none carries the prose fence, and all three `ln -s` sets still diff clean against the SSOT.
  - `README.md`, `SPEC.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `claude/CAPABILITIES.md`, `docs/EXTERNAL-AGENTS.md`, `docs/VISION.md` — no change (no paste-block content claims; `docs/EXTERNAL-AGENTS.md` owns the unattended *contract*, which this task did not touch — only the adopter-facing restatement of it).

- [x] Closed — Acceptance ticked through (six met, one annotated not-met with the 29-char reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and moved to the top of `## Completed`, tasknote moved to `.flowtron/tasknote/archive/core/`. No ⚠️ superseded-claim pointer written: this task falsified no *factual* claim in an archived note — the two stale statements it corrected live in active files, not the archive.

- [x] **Evidence-based recap** drafted

**Final Summary:**

Trimmed 2,026 characters (28%) out of the block every flowtron adopter pastes permanently into their own `AGENTS.md`, by replacing contract restatement with pointers to the contract.

Five bullets carried the same shape: a paragraph re-deriving a contract, followed by a citation of the SPEC path holding that same contract. Each is now a one-line statement of what the thing is plus that pointer. Bullet 23 (`--unattended`) went 1,498 → 533; bullet 19 (filing-skill roster) 789 → 370; 26 (`/ft-spec`) 596 → 324; 27 (`/ft-refactor`) 645 → 370; 24 (`/ft-goal-task`) 555 → 460. Fence total **7,255 → 5,229 chars**. Two files, 7 changed lines: `claude/AGENTS-snippet.md` (five bullets + its KEEP IN SYNC comment) and `AGENTS.md` (the mirrored comment clause), both of which had claimed the paste-block was where the richer detail lives.

**Verification.** No suite applies (prose-only), so the checks that actually cover this file were run instead: `/ft-release` §7.1's three platform-snippet derivation diffs (`codex`/`cursor`/`grok` vs the `ln -s` SSOT) all clean; Pair F's four park-priority flags present in the five named mirrors and in the snippet itself; all five cited SPEC/template paths exist and both quoted `§"headings"` resolve by anchored grep; fence integrity unchanged at 3 balanced fences; no trailing whitespace, final newlines intact. Discovery had already established that every automated reader of this file greps the `ln -s` block and never the prose, so the trim is machine-safe by construction.

**Refactors made / deferred.** Made: nothing beyond the five bullets and the comment pair this change directly falsified. Deferred: bullets 20 (518 ch), 21 (395), 22 (334) are the same restate-then-cite family and were left alone — the PLAN line named five bullets, and widening scope mid-task is the operator's call.

**Two judgment calls worth recording.** Bullet 19 keeps the skill *names* and the `--park` flag roster — "reference, not restate" cuts descriptions, not the roster an agent needs to know exists, and the flags are the KEEP IN SYNC comment's explicit exception. Bullet 23 drops the `--fast` superset explanation outright rather than compressing it: [[CORE-495]] had to correct exactly that claim once (it had asserted blanket inheritance when the 👁️ delegation is carved out), and a compressed restatement is the likeliest place to re-flatten it.

**Documentation verdict.** 18-entry sweep: 2 updated (both this task's targets), 16 no change. `docs/PLATFORMS.md:39` deserves note — it already stated the contract detail "all live in `SPEC.md`", so this trim brings the block into agreement with a claim the docs were already making about it.

**Maintainability effect.** This text is loaded into every context window in every adopting project, and — being a copy — could drift from the SPEC independently in each repo, which is the failure CORE-495 had to repair. A pointer cannot drift. The remaining exposure is narrowed to two guarded comments that now say plainly where new detail belongs, and to the three bullets left for a follow-up.

**Archived:** 2026-08-30
