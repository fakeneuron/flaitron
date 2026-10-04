---
title: audit-docs-default-scope
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: []
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

# CORE-520 | audit-docs-default-scope

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Correct `docs/MIGRATION.md` §1.2.2 and `/ft-release` §7.1 so both name
`/ft-audit docs ai-referenced` explicitly instead of claiming a bare
`/ft-audit docs` walks the AI-referenced doc set, and fix the same
paragraph's docs-domain gate claim.

## ✅ Acceptance

- [x] `docs/MIGRATION.md` §1.2.2 no longer claims a bare `/ft-audit docs` walks
      the AI-referenced doc set; it names `/ft-audit docs ai-referenced`
      explicitly as the extra scope token that reaches that set.
- [x] The same §1.2.2 paragraph's verification-gate sentence no longer presents
      the `viz` npm scripts + `node --test tools/update-adopters.test.mjs` as
      the `docs` domain's gates; it scopes them to the code domains and states
      that `docs` has none configured in this repo.
- [x] `/ft-release` §7.1's prose and its `Skill(ft-audit)` invocation block both
      name `docs ai-referenced`, and describe it as an extra scope token rather
      than "the default scope".
- [x] `claude/skills/ft-audit/passes/docs.md` is unchanged — the bundled scaffold
      stays stack-neutral, its default-scope slot still a forker placeholder.
      (`git diff --stat -- claude/skills/ft-audit/` empty.)
- [x] No corrected surface implies that supplying `ai-referenced` avoids the
      `SKILL.md` §1 step 3 scaffold-bootstrap stop — both edits state the
      opposite explicitly ("whatever scope you pass").
- [x] Repo-wide grep confirms no other live surface repeats the
      bare-`/ft-audit docs`-walks-the-doc-set claim.

## 🧩 Subtasks

- [ ] Edit `docs/MIGRATION.md` §1.2.2 — invocation token + docs-domain gate claim.
- [ ] Edit `claude/skills/ft-release/SKILL.md` §7.1 — prose sentence + code block.
- [ ] Grep the live surfaces for any remaining default-scope claim.
- [ ] Confirm `passes/docs.md` and the dispatcher `SKILL.md` are untouched.
- [ ] Phase 3 — no code changed; run the repo's CI drift checks that read these files.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both cited claims verified false against the shipped scaffold
  today; the fix is two doc edits and nothing upstream has changed them.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A` for module boundaries: documentation-only
  change, no code or dependency direction touched. The applicable "pattern" is
  the surrounding prose conventions in each file, which the edits match.

- [x] **Archive skim** — see Discovery Notes.

- [x] **Drift check** — see Discovery Notes.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The two false claims, verified against disk.**

`claude/skills/ft-audit/passes/docs.md:11-12` declares:

- Default scope (`all`/empty): `<default doc-set glob>` _(forker: set this)_ — an
  unfilled placeholder.
- Extra scope tokens: `ai-referenced` → walk `.flowtron/tasknote/README.md`
  §"AI-referenced docs".

So the AI-referenced doc set is reachable **only** via the `ai-referenced`
token; it is not the default. Both surfaces claim otherwise:

1. `docs/MIGRATION.md:236` — "`/ft-audit docs` with no extra scope walks
   `.flowtron/tasknote/README.md` §"AI-referenced docs" (the same default
   `/ft-release` §7.1 uses)."
2. `claude/skills/ft-release/SKILL.md:260` + its code block — "with the `docs`
   domain and the default scope (the AI-referenced docs set …)" over
   `Skill(ft-audit) with args "docs"`.

**Docs-domain gate claim.** The same MIGRATION paragraph asserts "Verification
gates are the `viz` `npm` scripts (`lint`, `typecheck`, `test`) plus the
portable `node --test tools/update-adopters.test.mjs` suite." Those are the
*code* domains' gates. `passes/docs.md` declares `<markdown lint if any>` /
`<link-check if any>` and says "Skip entirely if no doc tooling is configured."
Verified this repo configures neither: `.github/workflows/ci.yml` runs only
eslint / tsc / vitest / `node --test`, and `viz/package.json` `scripts` carries
no markdown or link tooling. So the `docs` domain has **no** gates here.

**Nuance the PLAN line does not capture (does not change the deliverable).**
The dispatcher's scaffold-bootstrap check (`ft-audit/SKILL.md:34`, §1 step 3)
scans the loaded pass file for `<…>` spans in §"Scope & rubric hints" **and any
`_(forker: …)_` note anywhere in the file**. `passes/docs.md` carries both, so
the stop fires on `/ft-audit docs ai-referenced` too — naming the token fixes
*scope resolution*, not the bootstrap stop. The corrected prose must therefore
not imply the token avoids it. This is expected behavior on flowtron-self, and
`docs/MIGRATION.md` §1.2.1 already documents the bootstrap and its three
branches in full, so §1.2.2 needs only a pointer, not a second explanation.

**Archive skim.** Grepped `archive/core/` for the default-scope claim; four
hits, one load-bearing:

- [[CORE-500]] (the v5.22.0-era release cut) records its §7.1 sweep as "scope
  supplied by the caller as the `ai-referenced` token, rubric = … , gates =
  none configured, matching the [[CORE-484]] precedent," with scaffold
  placeholders resolved by the bootstrap's **run-once** branch. That is
  independent confirmation of all three corrections: the token is what real
  cuts pass, the docs gates are none, and the bootstrap stop is routine.
- [[CORE-389.2]] records the consolidation that moved the `ai-referenced` token
  into `passes/docs.md` as a per-domain delta — i.e. the token has been
  opt-in since the seven-domain split, and the two prose surfaces were never
  updated to match.
- [[CORE-157]] / [[CORE-175]] predate the split; no bearing.

**Drift check.** Every path, section number, and line cited in the PLAN line
matches disk. No SPEC contract is contradicted: SPEC.md §"Cross-repo edit
remit" is satisfied (both files are in this checkout), and the change is a
factual correction to living docs, not an archived record, so the write-once
policy and the ⚠️ `Superseded by` pointer are both out of scope. `docs/MIGRATION.md`
is a member of the AI-referenced doc set, so the Phase 4 sweep covers it.

One structural observation, **not acted on** (would be scope creep): no §7.1
mirror pair binds `docs/MIGRATION.md` §1.2.2 to `/ft-release` §7.1, which is
why these two drifted in lockstep and survived several cuts. A Pair-L candidate;
worth filing separately if the operator wants the class closed rather than the
instance.

**No clarifications needed.** Explicit assumptions: (a) the bundled scaffold
stays stack-neutral — the fix is in the docs, not in `passes/docs.md`'s
placeholder, per the PLAN line's parenthetical; (b) narrative references to
"the `/ft-audit docs` subroutine" that make no scope claim
(`ft-release/SKILL.md:95,97,258`, `step-7.1-standing-checks.md:5`,
`ft-flowtron/SKILL.md:60`, `SPEC/model.md:173`, `ft-audit/SKILL.md:97`) are
correct as written and stay untouched.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — both edits stay inside their host paragraph and match
  its existing prose register (MIGRATION §1.2.2's dense single-paragraph style;
  §7.1's instruction-then-fenced-invocation shape). No new headings, no new
  contract surface.

- [x] **Minimal refactor gate** — no refactor. Two paragraphs edited in place;
  `passes/docs.md` and the `ft-audit` dispatcher deliberately untouched so the
  bundled scaffold stays stack-neutral (`git diff --stat -- claude/skills/ft-audit/`
  is empty).

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, documentation-only.

**Implementation Notes:**

Two edits, each correcting three things in one pass:

**`docs/MIGRATION.md:236`** — replaced "`/ft-audit docs` with no extra scope
walks … §"AI-referenced docs" (the same default `/ft-release` §7.1 uses)" with
a statement that `passes/docs.md` leaves the default slot a forker placeholder
and reaches the set through an **extra scope token**, naming
`/ft-audit docs ai-referenced` as the invocation. Added one clause noting the
run also trips the §1 step 3 scaffold bootstrap regardless of scope, pointing
at §1.2.1 rather than re-explaining it (§1.2.1 already documents the bootstrap
and its three branches in full). Split the flat gate sentence into per-domain
form: the `viz` npm scripts + `node --test` suite are the **code** domains'
gates; `docs` declares markdown-lint / link-check slots this repo configures
neither of, so it runs with none.

**`claude/skills/ft-release/SKILL.md:260-266`** — prose now names the
`ai-referenced` scope token and says a bare `docs` resolves to the unfilled
default and stops to ask; the fenced invocation becomes
`Skill(ft-audit) with args "docs ai-referenced"`. Added the bootstrap
expectation with the exact answer a cut should give (**run once**; rubric = the
doc-set contract; gates = none configured), which is what [[CORE-500]] actually
did in the last cut and had to rediscover.

Narrative `/ft-audit docs` references that make no scope claim were left alone,
per the Discovery assumption.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, no code changed. Ran the
  CI `drift` job's checks instead (they are the gates that read these files):
  wrapper-name invariant **OK**, shipped-skill parity **OK**, Pair A **OK**,
  Pair B **OK**, Pair C **OK**, Pair E rows **OK**.

- [x] Ran lint/type-check on changed code — `N/A`, markdown only; this repo
  configures no markdown linter or link checker (the very fact this task
  corrects).

- [x] **Quality assertions** — no duplication introduced: the bootstrap
  explanation is a one-clause pointer to §1.2.1 in MIGRATION and a
  two-sentence operational instruction in §7.1, not a second copy of the
  contract. No dead content, no public-surface growth (no new headings,
  flags, or tokens — `ai-referenced` already existed). Both edits **reduce**
  stale doc-facing claims.

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no UI surface.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

The narrowest meaningful validation for a two-paragraph doc correction is the
CI `drift` job, since it is the only automation that reads these files; all six
of its checks pass unchanged. The `viz` npm suite and
`node --test tools/update-adopters.test.mjs` were not run — neither reads
`docs/` or `claude/skills/`, and no file under `viz/` or `tools/` was touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  Grepped all 18 entries for `ft-audit docs` / `audit docs` / `ai-referenced`.
  **`docs/MIGRATION.md` — updated by this task** (the §1.2.2 corrections above).
  The other **17 entries: no change** — zero hits, verified rather than assumed:
  `README.md`, `AGENTS.md`, `SPEC.md`, `claude/AGENTS-snippet.md`,
  `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`,
  `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`,
  `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`,
  `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`,
  `docs/WORKTREES.md`, `docs/VISION.md` carry no audit-scope claim at all. The
  false claim lived on exactly two surfaces, both now corrected.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Two docs told operators to run `/ft-audit docs` with no scope and promised it
would walk the AI-referenced doc set. It never did: the shipped
`passes/docs.md` leaves its default-scope slot a forker placeholder and exposes
that doc set only through the opt-in `ai-referenced` token. `docs/MIGRATION.md`
§1.2.2 and `/ft-release` §7.1 now both name `/ft-audit docs ai-referenced`
explicitly, and §7.1's fenced invocation was corrected to match — so the next
release cut runs the sweep it thinks it is running instead of rediscovering the
token, as [[CORE-500]] had to.

Two further corrections rode the same two paragraphs. §1.2.2's flat "Verification
gates are the `viz` npm scripts … plus `node --test`" sentence was split
per-domain: those are the **code** domains' gates, while `docs` declares
markdown-lint / link-check slots this repo configures neither of and therefore
runs with none — verified against `.github/workflows/ci.yml` and
`viz/package.json` `scripts`. And both edits state that the bundled pass file
keeps its placeholders *whatever scope you pass*, so the §1 step 3 scaffold
bootstrap stops the run either way; §7.1 now names the answer a cut should give
(**run once**, rubric = the doc-set contract, gates = none). That last point was
not in the ticket — Discovery found that naming the token fixes scope resolution
but not the bootstrap stop, so correcting one claim without it would have
replaced a false promise with a surprising one.

Changed: `docs/MIGRATION.md` (1 paragraph) and
`claude/skills/ft-release/SKILL.md` §7.1 (2 paragraphs + 1 fenced line).
`claude/skills/ft-audit/` deliberately untouched — the bundled scaffold stays
stack-neutral, which is what the ticket's parenthetical asked for and what keeps
adopters' forks the place stack specifics live. No refactor made or deferred.
Verification: all six CI `drift` job checks pass; the `viz` suite and the
fleet-updater tests were correctly not run (no file under `viz/` or `tools/`
changed). Doc-drift sweep: 1 of 18 AI-referenced entries updated (this task's
own `docs/MIGRATION.md`), 17 grep-verified as carrying no audit-scope claim.

Maintainability effect: the release cut's most-repeated subroutine is now
documented as it actually behaves, including the bootstrap stop that has
surprised at least two cuts. Left unfixed by design — no §7.1 mirror pair binds
§1.2.2 to §7.1, which is why these two drifted in lockstep and survived several
releases; closing that class is a separate filing, noted in Discovery.

**Archived:** 2026-08-30
