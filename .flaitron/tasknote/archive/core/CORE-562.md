---
title: pair-k-spec-md-roster
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-558.2]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-562 | pair-k-spec-md-roster

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-558.2]]

## 🎯 Goal

Decide whether `SPEC.md` §"What flowtron does NOT provide" belongs in `/ft-release` §7.1 Pair K2's checked roster or in its deliberate-exclusions bullet, and record the reason on the surface so the omission cannot be re-read as an oversight.

## ✅ Acceptance

- [x] Pair K carries a deliberate-exclusions entry naming the `SPEC.md` section — `grep -c 'deliberately not in K2' claude/skills/ft-release/step-7.1-mirror-pairs.md` returns `2`, and the new bullet names `SPEC.md`
- [x] The recorded reason names the contract module as the section's cited source — `grep -q 'scope-boundaries' claude/skills/ft-release/step-7.1-mirror-pairs.md` (within the new bullet)
- [x] K2's checked roster is unchanged at three rows and still asserts `VISION.md` — `git diff -U0 claude/skills/ft-release/step-7.1-mirror-pairs.md` shows no hunk inside the K2 `sh` fence
- [x] Both Pair K halves still print nothing against HEAD — extract and run the two `sh` fences from the file
- [x] No other surface restates Pair K's roster or exclusions — repo-wide `grep -rn 'Pair K'` sweep shows only history/CI-scope lines

## 🧩 Subtasks

- [x] Confirm the decision: exclusions bullet, not K2's roster (Discovery Notes §Decision)
- [x] Write a new deliberate-exclusions bullet into Pair K's design-note block in `claude/skills/ft-release/step-7.1-mirror-pairs.md`, after the existing PHILOSOPHY / WORKTREES / README bullet
- [x] Leave K2's `printf` roster and its `grep -q 'VISION\.md'` assertion untouched
- [x] Phase 3: run both Pair K shell fences against HEAD; run the repo validation commands
- [x] Phase 4: doc-drift sweep, closure, archive

## 🔗 Related

- [[CORE-558.2]] — `depends-on:` restored the `SPEC.md` section this task must place in or out of Pair K2's roster

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The cited gap is live at HEAD. `step-7.1-mirror-pairs.md:229-239` (K2) checks three files; `:247` (the exclusions bullet) names three others; `SPEC.md` §"What flowtron does NOT provide" is in neither. The section it concerns was restored by [[CORE-558.2]] and still exists at `SPEC.md:846`. Scope matches the PLAN line exactly: a decision plus a recorded reason on one surface.

- [x] Read relevant source files — `claude/skills/ft-release/step-7.1-mirror-pairs.md` (Pair K in full, plus the Pair A–M preambles to place the class), `SPEC.md:669-698` + `:846-866`, `SPEC/scope-boundaries.md`, `docs/VISION.md` §"What we won't accept", `claude/skills/ft-release/step-7.1-standing-checks.md` (section list), `docs/CONTEXT-BUDGET.md` §Budgets. No probe needed — the read set was named by the PLAN line and two greps.

- [x] **Best Practices Review** — `N/A` for module boundaries: markdown prose only, no code path, no dependency direction. The applicable convention is the pair idiom's own habit of recording deliberate exclusions in a design note (`docs/CONVENTIONS.md` §"Canonical source with labeled mirrors"), which this task extends rather than invents.

- [x] **Archive skim** — `archive/core/` (confirmed against `.flowtron/tasknote/README.md` §"Archive layout": `CORE-*` → `archive/core/`). 16 notes grep-hit `step-7.1-mirror-pairs`, 14 hit `Pair K`; read the three load-bearing ones. [[CORE-487]] minted Pair K and records *why* it guards labels not prose, and why PHILOSOPHY / WORKTREES / README are excluded from K2 — the bullet this task extends. [[CORE-491]] reworded Pair K's closing clause ("labels held in five other files") after the doc-drift sweep gained `docs/VISION.md`. [[CORE-558.2]] restored the `SPEC.md` section and, at its own doc-drift sweep, reasoned about exactly this relationship: *"the always-loaded summary restored into `SPEC.md` is a compaction of that same list with no new claim, so the mirror relationship is unchanged"* — i.e. it read the section as a mirror of `SPEC/scope-boundaries.md`, not of `docs/VISION.md`. That is the fact this task ratifies on the guard surface.

- [x] **Drift check** — every citation in the PLAN line resolves at HEAD. K2's roster is `docs/EXTERNAL-AGENTS.md` · `SPEC/gates.md` · `SPEC/loop.md`; the exclusions bullet is `docs/PHILOSOPHY.md` · `docs/WORKTREES.md` · `README.md`; `SPEC.md` §"What flowtron does NOT provide" is in neither. The surface path is correct. No SPEC contract contradicts the plan: `SPEC/scope-boundaries.md` is unedited by this task, and the change ships no runtime (a design note inside an operator-run release procedure — the [[CORE-349.5]] / [[CORE-410.2]] precedent Pair K itself cites).

- [x] Asked clarifying questions — **No clarifications needed.** The PLAN line poses a two-way decision and states the discriminating fact ("it labels the contract, not the justification"); Discovery confirmed that fact independently rather than inheriting it. Explicit assumptions: (a) "which list it joins" means K2's checked roster *or* the deliberate-exclusions bullet — no third option is filed, and minting a new K3 pair for the `SPEC.md`-summary → `SPEC/`-module class is out of scope for this line; (b) the reason is recorded on the guard surface itself, in the pair idiom's design-note shape, not in a doc elsewhere.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:**

**The three-layer structure.** Reading the surfaces end to end resolves the question cleanly:

| Layer | Surface | Cites |
|---|---|---|
| Canonical **justification** | `docs/VISION.md` §"What we won't accept" | — |
| Terse AI-facing PR mirror | `SPEC/scope-boundaries.md` §"PR / suggestion archetypes…" | VISION.md *(guarded by K1)* |
| Canonical **contract** | `SPEC/scope-boundaries.md` §"What flowtron does NOT provide" | — |
| Always-loaded summary | `SPEC.md` §"What flowtron does NOT provide" | **`SPEC/scope-boundaries.md`** |
| Point-of-use restatements | `docs/EXTERNAL-AGENTS.md` · `SPEC/gates.md` · `SPEC/loop.md` | VISION.md *(guarded by K2)* |

K2's assertion is literally `grep -q 'VISION\.md'`. The `SPEC.md` section does not name VISION.md and should not: it summarises the **contract** and correctly points at the module that owns it. Adding it to K2's roster would either fail the check on a correct file, or pressure a spurious `VISION.md` pointer into always-loaded SPEC core — bytes the shrink budget ([[CORE-558.5]]) exists to protect.

**Decision — it joins the deliberate-exclusions bullet.** Reason: K2 guards *point-of-use restatements of a single rejection against the canonical justification*. The `SPEC.md` section is a different mirror relationship — a whole-list summary against the canonical contract — so it is outside the pair's remit, not missing from it.

**It is a class, not a one-off.** [[CORE-558.2]] restored three `SPEC.md` sections in the identical shape (always-loaded summary + `Canonical contract: see [SPEC/<module>]`): §"Cross-repo edit remit", §"Loop tasks", §"What flowtron does NOT provide". Two of the three (§"Loop tasks" and this one) *do* restate a VISION rejection while citing their `SPEC/` module. Naming only one in the exclusions bullet would invite the same re-filing against the sibling next cut, so the bullet names the class.

**Honest about what stays unguarded.** No §7.1 pair and no standing check binds a `SPEC.md` always-loaded summary to the `SPEC/` module it cites; [[CORE-558.2]]'s link/citation validator was a one-off Phase 3 run, not a standing gate. The exclusion bullet says so rather than implying the class is covered elsewhere — matching Pair K's existing habit of recording what it does not claim (`grep -qF --` note, "guards labels, not prose", "release-gate only").

**Separate bullet, not an extension of the existing one.** The existing exclusions bullet's reason is *"these are not sourced restatements at all"* (narrative identity, one-clause caveat). This one's reason is the opposite: *it is a sourced restatement, sourced elsewhere.* Merging would muddy a clean rationale; a sibling bullet in the same block keeps both legible.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the established shape. Pair K's design-note block already carries a deliberate-exclusions bullet (`docs/PHILOSOPHY.md` / `docs/WORKTREES.md` / `README.md`), and Pairs A, E, F, J and the "Positional arguments are out of scope" note under Pair J all use the same idiom: a bolded lead naming the excluded surfaces, the reason, and a closing clause saying the absence is scope rather than oversight. The new bullet is a sibling in that block, not a new shape.

- [x] **Minimal refactor gate** — no refactor. One file, one inserted bullet. K2's `printf` roster and its `grep -q 'VISION\.md'` assertion are untouched; the existing exclusions bullet is untouched.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown prose, no code path changed. The standing guard for this surface is Pair K itself, run in Phase 3.

**Implementation Notes:**

**Separate bullet, not a merge.** Written as a sibling to the existing exclusions bullet rather than folded into it. The existing bullet's reason is *"these are not sourced restatements at all"*; this one's is *"it is a sourced restatement, sourced one layer down."* Folding the second into the first would blunt both.

**Three claims, in order.** (1) Why the section looks like a K2 candidate and is not — it restates a rejection but cites the module owning the **contract**, where K2 asserts presence of the **justification**. (2) Why the bullet names the class (§"Loop tasks" and §"Cross-repo edit remit" are the same shape) rather than the one section — otherwise the next auditor re-files against the sibling. (3) What stays unguarded and is not claimed — no pair binds a `SPEC.md` summary to its module, and [[CORE-558.2]]'s validator was a one-off. Claim (3) is the load-bearing half: [[CORE-558.N]] filed this precisely because an unrecorded absence reads as the oversight the bullet exists to prevent, and a bullet that implied coverage would swap one wrong reading for another.

**What was deliberately not done.** No K2 roster row added (it would fail on a correct file, or force a spurious `VISION.md` pointer into always-loaded SPEC core). No new K3 pair minted for the summary↔module class — that is a separate contract call, not implied by this line. No edit to `docs/VISION.md:32`'s four-site list: those are surfaces that point *back* at VISION, which `SPEC.md` does not.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` by `AGENTS.md` §"Validation" scope: markdown only, `viz/` and `tools/` untouched. Substituted the standing guard for this surface (both Pair K halves, run verbatim from the edited file) plus a citation-resolution scan over the new bullet. Same substitution as [[CORE-538]] and [[CORE-492]] on this surface.

- [x] Ran lint/type-check on changed code — `N/A` (no code). `.editorconfig` conformance checked instead: no trailing whitespace introduced, final newline intact, LF endings, UTF-8.

- [x] **Verification receipt** — all five Acceptance verify commands recorded below. Quality assertions: no duplication added (the bullet states the exclusion and its reason; it does not restate the contract or the K2 assertion, citing both instead), no dead prose, no public-surface growth (no new pair, flag, check, skill, template, or frontmatter key), and no stale doc left behind — the two live surfaces naming Pair K (`docs/VISION.md:32`, `docs/CONVENTIONS.md:73`) describe what Pair K *checks*, which this edit does not change.

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend surface. `viz/` untouched.

**Testing Notes:**

| Acceptance criterion | Command | Result |
|---|---|---|
| Exclusions entry present | `grep -c 'deliberately not in K2' claude/skills/ft-release/step-7.1-mirror-pairs.md` | `2` → exit 0 ✓ (was 1) |
| Reason names the contract module | `grep -c "SPEC.md\`'s always-loaded summaries.*scope-boundaries" …` | `1` → exit 0 ✓ |
| K2 fence untouched | `git diff -U0 claude/skills/ft-release/step-7.1-mirror-pairs.md` | one hunk, `@@ -247,0 +248 @@`, a single `+` line outside both `sh` fences → exit 0 ✓ |
| Pair K1 clean | K1 `sh` fence, extracted verbatim from the edited file | no output, exit 0 ✓ |
| Pair K2 clean | K2 `sh` fence, extracted verbatim from the edited file | no output, exit 0 ✓ |
| No stranded restatement | `grep -rn 'Pair K'` repo-wide, archive excluded | 2 live hits (`docs/VISION.md:32`, `docs/CONVENTIONS.md:73`), neither restating K2's roster or exclusions → exit 0 ✓ |

**Citation-resolution scan over the new bullet** — every reference resolves: `[[CORE-558.2]]` and `[[CORE-558.5]]` both present in `archive/core/`; `SPEC/scope-boundaries.md` and `SPEC/loop.md` both exist; all three cited `SPEC.md` headings (`## What flowtron does NOT provide`, `## Loop tasks`, `## Cross-repo edit remit`) match exactly.

**Context budget** — `step-7.1-mirror-pairs.md` 38,595 → 39,841 chars (+1,246). The file matches no `docs/CONTEXT-BUDGET.md` row (the globs are `claude/skills/*/SKILL.md` and the `ft-release/SKILL.md` override); `claude/skills/ft-release/SKILL.md` is unedited at 30,619 / 40,000. No budget action.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked all 18 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs". **All 18: no change.** `README.md`, `AGENTS.md`, `SPEC.md` (its §"What flowtron does NOT provide" is what the bullet *decides about*; unedited), `docs/MIGRATION.md`, the four `*/AGENTS-snippet.md`, `docs/CONVENTIONS.md` (its §"Canonical source with labeled mirrors" describes what Pair K checks — unchanged by an exclusion note; and no pair was added, so its §"GitHub Actions CI" release-only roster is untouched), `CONTRIBUTING.md`, `SECURITY.md` (no new injection surface — the guard reads repo files during an operator-run cut), `docs/AGENT-NEUTRALITY.md` (no new Claude-specific surface; §7.1 prose is an already-ledgered class), `docs/PLATFORMS.md` + `claude/CAPABILITIES.md` (no operator flag added, so Pair I is untouched), `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md` and `docs/WORKTREES.md` (both *read* by K2 / named in its exclusions; neither edited), `docs/VISION.md` (§32's four-site list names surfaces that point back at VISION — `SPEC.md` does not, so it correctly stays out). `SPEC/*.md` and `claude/skills/*/SKILL.md` sit outside the sweep set by that README's closing paragraph; the edited file is in the second tree.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and placed at the top of `## Completed` (standalone task), tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

One file, one inserted bullet (+1,246 chars): `claude/skills/ft-release/step-7.1-mirror-pairs.md` gains a second deliberate-exclusions note in Pair K's design-note block, recording that `SPEC.md`'s always-loaded summaries stay outside K2 because they mirror the **contract** (`SPEC/scope-boundaries.md`, `SPEC/loop.md`) rather than the **justification** (`docs/VISION.md`) that K2 asserts presence of.

**The decision and why.** K2's assertion is literally `grep -q 'VISION\.md'`. `SPEC.md` §"What flowtron does NOT provide" does not name VISION.md and should not — it summarises the contract and cites the module that owns it, exactly as [[CORE-558.2]] recorded at its own doc-drift sweep (*"a compaction of that same list with no new claim, so the mirror relationship is unchanged"*). Adding it to K2's roster would either fail the check on a correct file or pressure a spurious `VISION.md` pointer into always-loaded SPEC core — bytes the shrink budget exists to protect. So it joins the exclusions list, which is what [[CORE-558.N]] deferred to a contract judgment rather than fixing as a typo.

**Two choices worth recording.** The bullet names the **class**, not the one section: [[CORE-558.2]] restored three summaries in the identical shape, and two of them (§"Loop tasks" and this one) restate a rejection while citing their `SPEC/` module — a bullet naming only one would invite the same re-filing next cut. And it is a **sibling** bullet rather than an extension of the existing PHILOSOPHY / WORKTREES / README one, because the reasons are opposites: those three are not sourced restatements at all; this one is a sourced restatement, sourced one layer down.

**Honest about the gap it leaves.** No §7.1 pair and no standing check binds a `SPEC.md` always-loaded summary to the `SPEC/` module it cites, and the bullet says so. Recording an unguarded class as unguarded is the point — [[CORE-558.N]] filed this because an unrecorded absence reads as oversight, and a bullet implying coverage would trade one wrong reading for another. Minting a K3 for that class is a separate contract call, deliberately not taken here.

**Verification:** both Pair K halves extracted verbatim from the edited file and run from the repo root — no output, exit 0. Citation scan over the new bullet: 2/2 wikilinks resolve, 2/2 paths exist, 3/3 `SPEC.md` headings match. `git diff -U0` confirms a single hunk outside both `sh` fences, so K2's roster and assertion are byte-unchanged. `AGENTS.md` §"Validation" is `N/A` by scope (markdown only; `viz/` and `tools/` untouched) — the same substitution [[CORE-538]] and [[CORE-492]] made on this surface.

**`touches:` scope reconciliation:** declared `claude/skills/ft-release/step-7.1-mirror-pairs.md`; `git diff --name-only` matches exactly, plus the expected workflow paths (`.flowtron/PLAN.md`, the tasknote itself). No undeclared deliverable path.

**Archived:** 2026-09-10
