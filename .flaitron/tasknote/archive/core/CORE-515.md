---
title: adopter-claude-md-docs
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: [CORE-514]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - docs/MIGRATION.md
  - claude/AGENTS-snippet.md
  - claude/skills/ft-new-project/SKILL.md
---

# CORE-515 | adopter-claude-md-docs

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-514]]

## 🎯 Goal

Document for adopters how to make the flowtron contract in `AGENTS.md` actually
load in Claude Code — the `CLAUDE.md` → `AGENTS.md` compatibility symlink, how
to verify it, and the fallback when `AGENTS.md` isn't read.

## ✅ Acceptance

- [x] `docs/MIGRATION.md` §1.3 carries a loading check: how an adopter verifies their assistant actually loads `AGENTS.md`, and the two fallbacks (`CLAUDE.md` symlink when no `CLAUDE.md` exists; `@AGENTS.md` import when one does).
- [x] `docs/MIGRATION.md` §1.6 stages the symlink, and §3.7 (migration path) points at the §1.3 check rather than restating it.
- [x] `claude/AGENTS-snippet.md` documents the same loading step outside the paste fence (adopters must not paste it into `AGENTS.md`).
- [x] `/ft-new-project` Step 4 creates `CLAUDE.md -> AGENTS.md` when no `CLAUDE.md` exists, offers the `@AGENTS.md` import when a real one does, and Step 7 stages it.
- [x] `docs/AGENT-NEUTRALITY.md`'s `docs/MIGRATION.md` ledger row covers the new `CLAUDE.md` reference (contract-layer Claude mention must be registered).
- [x] No content is duplicated between `AGENTS.md` and `CLAUDE.md` — the recipe is a loading shim, not a second contract surface.

## 🧩 Subtasks

- [ ] Add the loading-check + fallback block to `docs/MIGRATION.md` §1.3.
- [ ] Stage `CLAUDE.md` in §1.6's `git add` line; point §3.7 at §1.3.
- [ ] Add the matching note to `claude/AGENTS-snippet.md` (outside the fenced block).
- [ ] Extend `/ft-new-project` Step 4 with the two-branch symlink motion; add `CLAUDE.md` to Step 7's `git add`.
- [ ] Extend the `docs/MIGRATION.md` row in `docs/AGENT-NEUTRALITY.md` §"Intentional Claude-specific surfaces".
- [ ] Verify: `ln -s` recipe is correct as written; grep for residual "read by Claude Code" assertions left unqualified.

## 🔗 Related

- [[CORE-514]] — predecessor; self-host `CLAUDE.md` handling (`related-decision:`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and verified. `docs/MIGRATION.md:251` asserts
  `AGENTS.md` is "read by Claude Code" with no verification step and no
  fallback; CORE-514 just fixed exactly this failure inside flowtron's own
  repo by adding `CLAUDE.md -> AGENTS.md`, and left documenting it for
  adopters to this task.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Best Practices Review:** Doc-only change across one contract-layer file
(`docs/MIGRATION.md`), two wiring-layer files (`claude/AGENTS-snippet.md`,
`claude/skills/ft-new-project/SKILL.md`), and the neutrality ledger. The
responsibility split already in place is respected: MIGRATION owns adopter
prose, the snippet owns the copy-paste surface, the skill owns the bootstrap
motion. The recipe itself is stated once per surface at the level that surface
needs — no third content copy of the contract is created, since the symlink
*is* `AGENTS.md`.

**Archive skim** (`grep -l 'docs/MIGRATION.md\|AGENTS-snippet.md\|ft-new-project'`
over `archive/core/`, plus `grep -rn 'compatibility symlink\|CLAUDE.md'`):

- [[CORE-514]] — direct predecessor. Created `CLAUDE.md -> AGENTS.md` at
  flowtron's own root; its closure note explicitly defers adopter-facing
  documentation to this task. Its "Docs touched: no change" verdict is why
  nothing is stale to fix, only missing.
- [[CORE-004]] / [[CORE-005]] / [[CORE-007]] — the *original* paste-block
  target was `CLAUDE.md` (`claude/CLAUDE-snippet.md`), later renamed to
  `AGENTS-snippet.md` when the contract went agent-neutral. **Load-bearing:**
  this task must not read as a partial revert. The symlink is a *loading*
  shim for one file; it is not a second content surface and not a return to a
  Claude-owned paste-block.
- [[CORE-510]] / [[CORE-511]] / [[CORE-512]] — recent `KEEP IN SYNC` /
  dereference work on the same two roster surfaces. Their pairing comment
  guards content *inside* the paste fence; the loading note lands outside it,
  so no `KEEP IN SYNC` obligation is created.

**Drift check:** No drift. `docs/MIGRATION.md:251` is verbatim the sentence the
PLAN.md line cites, and it still carries the unqualified "read by Claude Code"
claim. `AGENTS.md` and its `CLAUDE.md` symlink both exist at flowtron's root
(`readlink CLAUDE.md` → `AGENTS.md`), so the recipe is verified against a live
example. No SPEC contract is touched: `docs/AGENT-NEUTRALITY.md` already
registers `docs/MIGRATION.md` §1.3 as an intentional Claude-specific surface,
so the addition extends an existing ledger row rather than needing a new one.

**Empirical basis for the claim.** This session's own loaded-context set names
`/Users/fakeneuron/Code/flowtron/CLAUDE.md` (the symlink) and no separate
`AGENTS.md` entry — i.e. the symlink is what makes the guide load. The docs
are therefore written as *verify, then apply the fallback*, not as a flat
assertion about any Claude Code version's behavior.

**Clarification asked (structured ask).** Whether `/ft-new-project` should
create the symlink by default or only offer it. **Answer: create by default** —
when no `CLAUDE.md` exists, run `ln -s AGENTS.md CLAUDE.md` and stage it; when
a real `CLAUDE.md` file exists, leave it untouched and offer to append an
`@AGENTS.md` import line instead.

**Assumptions:** (1) `docs/AGENT-COMPAT.md`'s "native context files … are
orthogonal to flowtron" bullet needs no edit — "orthogonal" describes
*content*, and a symlink adds no second content surface. (2) The `@AGENTS.md`
import fallback is presented as the option to try-and-verify, alongside the
symlink, rather than asserted as guaranteed behavior.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, doc-only change; the existing `tools/update-adopters.test.mjs` gate covers the one machine-parsed surface touched (see the hazard note below).

**Implementation Notes:**

**Pattern survey.** Each surface states the recipe at its own altitude, matching
the existing division of labour: `docs/MIGRATION.md` §1.3 carries the full
rationale + both fallbacks (it is the adopter guide), `claude/AGENTS-snippet.md`
carries a four-line version pointing back at §1.3 (it is the copy-paste
surface), and `/ft-new-project` carries the executable branch (it is the
bootstrap motion). No new shape; the "one canonical statement + pointers"
pattern is the same one CORE-510/511 applied to this exact pair of files.

**Files changed:**

- `docs/MIGRATION.md` — §1.3 gained a "Confirm your assistant actually loads
  it" block (verification, the `ln -s AGENTS.md CLAUDE.md` route, the
  `@AGENTS.md` import route for projects with a real `CLAUDE.md`, and the
  generalization to other agents' native context files); §1.6 notes staging the
  shim; §3.7 routes the migration path through the same check and covers the
  "legacy block removed, `CLAUDE.md` now empty" case.
- `claude/AGENTS-snippet.md` — new `### Check that Claude Code loads it`
  subsection, **outside** the paste fence.
- `claude/skills/ft-new-project/SKILL.md` — Step 4 gained the three-way branch
  (no `CLAUDE.md` → create symlink; already a symlink → no-op; real file →
  offer `@AGENTS.md`, never a second copy of the block); Step 7 stages it
  conditionally.
- `docs/AGENT-NEUTRALITY.md` — extended the existing `docs/MIGRATION.md` ledger
  row rather than adding a new one; records *why* the shim is not a neutrality
  regression.
- `docs/AGENT-COMPAT.md` — one clause on the §"Reading the cells" entry-point
  bullet. Not on the PLAN.md line: MIGRATION §1.3 now points *at* this bullet,
  and its unqualified "orthogonal" would have read as "the shim is off-contract".
  Fixed at the sweep because this task created the pointer.

**Hazard found and fixed mid-execution.** The first draft put the recipe in a
fenced `sh` block in `claude/AGENTS-snippet.md`. That file is machine-parsed:
`docs/MIGRATION.md` §1.6 and `/ft-new-project` Step 7 both run
`grep '^ln -s' … | awk '{print $NF}' | xargs git add`, **unanchored**. The new
line matched, and `$NF` picked up the trailing comment — `grep '^ln -s' … |
awk '{print $NF}'` emitted `yet`, so every adopter's staging command would have
failed on `git add yet`. (`/ft-release` §7.1's checks and
`tools/update-adopters.mjs` `wiredSkillKeys()` were unaffected — both anchor on
`^ln -s ../../.flowtron/core/…` or require a `<platform>/skills/<name>` match.)
Fixed by stating the command as inline code, so no line in that file begins with
`ln -s` except the twelve real wiring lines. `step-7.1-standing-checks.md:66`
already documents that these prefixes are load-bearing.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` → **49 pass / 0 fail** (the release gate for the one machine-parsed surface touched).

- [x] Ran lint/type-check on changed code — `node --check tools/update-adopters.mjs` + `node --check tools/update-adopters.test.mjs` → clean. No `viz/` code touched, so the npm gates are `N/A`.

- [x] **Quality assertions** — no duplication introduced: the contract exists once (`AGENTS.md`), and the three doc surfaces carry a pointer-plus-altitude statement rather than three copies of the recipe. Existing ledger row extended instead of a new one added. No stale code-facing docs left.

- [ ] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface touched (markdown only).

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Doc-only change, so verification is consumer-behavior checks rather than a
suite over changed lines:

- `grep '^ln -s' claude/AGENTS-snippet.md | awk '{print $NF}' | grep -cv '^\.claude/'`
  → `0`. Before the fix this emitted `yet`; the consumer command in
  `docs/MIGRATION.md` §1.6 / `/ft-new-project` Step 7 is clean again.
- `grep -c '^ln -s ../../.flowtron/core/claude/skills/' claude/AGENTS-snippet.md`
  → `12`, unchanged — `/ft-release` §7.1's anchored derivation still sees the
  same roster.
- `node --test tools/update-adopters.test.mjs` → 49/49 pass.
- Line-number references into the edited files still resolve: `AGENTS.md:24`
  → `claude/AGENTS-snippet.md:9` (KEEP IN SYNC comment, above the insert) and
  `step-7.1-standing-checks.md:95` → `docs/MIGRATION.md:202-203` (above the
  §1.3 insert at ~251). Neither shifted.
- The `ln -s AGENTS.md CLAUDE.md` recipe is verified against a live example —
  flowtron's own root, `readlink CLAUDE.md` → `AGENTS.md`, created by
  [[CORE-514]]. Relative-link targets (`AGENT-COMPAT.md`, `MIGRATION.md`)
  exist.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs",
per entry:

- `README.md` — no change; carries no `AGENTS.md` loading claim (its quickstart
  is about wiring, not context load).
- `AGENTS.md` — no change; flowtron-self's own `CLAUDE.md -> AGENTS.md` already
  exists ([[CORE-514]]), and §Repo Layout completeness is CORE-517's ticket.
- `SPEC.md` — no change; the contract says nothing about which files an agent
  loads at cold start.
- `docs/MIGRATION.md` — **updated** (§1.3 loading check + both fallbacks, §1.6
  staging, §3.7 pointer).
- `claude/AGENTS-snippet.md` — **updated** (§"Check that Claude Code loads it",
  outside the fence).
- `codex/` / `cursor/` / `grok/AGENTS-snippet.md` — no change. All three read a
  repo-root `AGENTS.md` natively and already say "do not maintain a second copy
  here"; the shim is the Claude-side answer to the same rule.
- `docs/CONVENTIONS.md` — no change.
- `CONTRIBUTING.md` — no change.
- `SECURITY.md` — no change; a same-repo symlink to a tracked file adds no
  threat surface.
- `docs/AGENT-NEUTRALITY.md` — **updated** (existing `docs/MIGRATION.md` row
  extended to register the shim + its neutral framing).
- `docs/PLATFORMS.md` — no change; `:364` already documents Grok reading
  `CLAUDE.md` as a compat fallback, which the shim is consistent with.
- `claude/CAPABILITIES.md` — no change.
- `docs/AGENT-COMPAT.md` — **updated** (one clause scoping "orthogonal" to
  content, since §1.3 now points here).
- `docs/EXTERNAL-AGENTS.md` — no change.
- `docs/WORKTREES.md` — no change.
- `docs/VISION.md` — no change; the shim is adoption mechanics, not a scope
  boundary.

**Final Summary:**

Adopters were told to paste flowtron's contract into `AGENTS.md` on the strength
of "read by Claude Code", with no way to check that and nothing to do if it
turned out false — a failure that looks like nothing at all. Documented the
`CLAUDE.md -> AGENTS.md` compatibility symlink as the fix, framed as
*verify first, then shim*: `docs/MIGRATION.md` §1.3 carries the verification
steps plus two routes (the symlink when no `CLAUDE.md` exists, an `@AGENTS.md`
import when a real one does) and generalizes both to other agents' native
context files; §1.6 stages it; §3.7 routes migrating projects through the same
check. `claude/AGENTS-snippet.md` states it in four lines outside the paste
fence, and `/ft-new-project` Step 4 now performs it — creating the symlink by
default so a freshly bootstrapped project can't land in the broken state at all.
Throughout, `AGENTS.md` stays the single source: the shim points at the
contract, never copies it.

**Changed:** 5 files, ~40 net lines of markdown — `docs/MIGRATION.md` (+3
blocks), `claude/AGENTS-snippet.md` (+1 subsection),
`claude/skills/ft-new-project/SKILL.md` (Steps 4 + 7),
`docs/AGENT-NEUTRALITY.md` (1 ledger row extended, not added),
`docs/AGENT-COMPAT.md` (1 clause).

**Verified:** `node --test tools/update-adopters.test.mjs` 49/49 pass;
`node --check` clean on both tool files; the `^ln -s` consumer grep over
`claude/AGENTS-snippet.md` yields only the 12 real `.claude/` wiring paths;
`/ft-release` §7.1's anchored derivation still counts 12 skills; both live
line-number references into the edited files still resolve.

**Caught in Phase 3:** the first draft's fenced `ln -s AGENTS.md CLAUDE.md` in
`claude/AGENTS-snippet.md` was matched by the **unanchored** `grep '^ln -s'`
that `docs/MIGRATION.md` §1.6 and `/ft-new-project` Step 7 use to stage
symlinks — it emitted `yet` (the trailing comment's last field), which would
have broken `xargs git add` for every adopter following the doc. Restating the
command as inline code removed the match. A doc-only diff genuinely could have
broken adopter tooling here.

**Refactors:** none made, none deferred. **Maintainability:** the recipe is
stated once per surface at that surface's altitude and cross-referenced, so
there is one place to edit if the advice changes; the neutrality ledger now
carries the reasoning, so a future audit won't re-flag the `CLAUDE.md` mention
as a neutrality regression.

**Archived:** 2026-08-30
