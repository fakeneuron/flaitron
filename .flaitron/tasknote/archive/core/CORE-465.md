---
title: wiring-roster-ssot
status: completed
tags: []
created: 2026-08-24
due:
related-tasks: [CORE-464]
supersedes:
  - CORE-329.2
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

# CORE-465 | wiring-roster-ssot

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-464]]

## 🎯 Goal

Declare `claude/AGENTS-snippet.md` §"One-time symlink wiring" the single source of truth for the adopter-wiring skill roster, reduce every other roster copy (codex/cursor/grok snippets, `docs/MIGRATION.md`, `/ft-new-project`) to a pointer or a path substitution, fold the repeated Codex translation boilerplate into `codex/AGENTS-snippet.md` §"Translation rules", and retire whichever §7.1 drift checks the SSOT makes vacuous.

## ✅ Acceptance

- [x] `claude/AGENTS-snippet.md` §"One-time symlink wiring" carries an explicit SSOT declaration naming its derived consumers; its 24-line `ln -s` block is unchanged in content.
- [x] The codex / cursor / grok snippets each open their wiring section with a **Derived surface** declaration stating the exact substitution from the SSOT; each `ln -s` block stays literal, runnable, and parseable by `tools/update-adopters.mjs` `wiredSkillKeys()`.
- [x] `claude/skills/ft-new-project/SKILL.md` Steps 7 + 8 and `docs/MIGRATION.md` §1.6 derive their staging / verify commands from the snippet — no restated 24-path enumeration and no prose count word left on either surface.
- [x] All 18 non-`ft-task` Codex wrappers replace the 7-line translation boilerplate with a one-line pointer to `codex/AGENTS-snippet.md` §"Translation rules", which holds the rules once; `ft-task`'s SOP-first shape is preserved.
- [x] `/ft-release` §7.1's "Standing Claude symlink-wiring count check" is retired as vacuous, and the "Standing installed-surface policy check" derives its expected set from the SSOT instead of the hardcoded 11-slug list (which is stale today — it omits `ft-refactor`).
- [x] A mechanical SSOT↔derived-block set-equality check exists in §7.1 and passes for all four platform surfaces.
- [x] `node --test tools/update-adopters.test.mjs`, both `node --check`s, and the three `viz` gates pass; the CI `drift` job's steps still pass unchanged.

## 🧩 Subtasks

- [x] Add the SSOT declaration to `claude/AGENTS-snippet.md` §"One-time symlink wiring" (names the roster's authority + its four derived consumers).
- [x] Add **Derived surface** declarations to `codex/`, `cursor/`, `grok/AGENTS-snippet.md`, each stating its own substitution; leave the `ln -s` blocks literal.
- [x] Add §"Translation rules" to `codex/AGENTS-snippet.md`; reduce the 18 boilerplate-carrying wrappers to a one-line pointer, keeping `ft-task`'s SOP-first opening and `ft-audit`'s fork blockquote.
- [x] Reduce `ft-new-project` Step 3 heading + Step 7 staging + Step 8 verify to snippet-derived commands.
- [x] Reduce `docs/MIGRATION.md` §1.6 staging block and the pure slug enumerations at §3.8 / §3.9 to derivations or pointers.
- [x] Rewrite `/ft-release` §7.1: retire the count check, make the installed-surface check SSOT-derived, add the four-way set-equality check.
- [x] Run the six validation commands plus the rewritten §7.1 checks and the CI `drift` job steps.

## 🔗 Related

- [[CORE-464]] — predecessor (`depends-on:`); moved the §7.1 drift checks into CI, which is the surface this task prunes

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The duplication is live and measured — CORE-463.5 needed edits across 16 surfaces and 5 count words to ship one skill — and one consumer (§7.1's installed-surface expected list) is already stale against the snippets it guards.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The roster and its consumers.** The adopter-wiring roster is 12 skills:
`ft-close-epic`, `ft-epic-discovery`, `ft-file-followup`, `ft-goal-task`,
`ft-micro-task`, `ft-refactor`, `ft-spec`, `ft-starter-task`, `ft-task`,
`ft-update`, `ft-worktree-end`, `ft-worktree-start`. It is restated on nine
surfaces today: the four platform `AGENTS-snippet.md` files, `docs/MIGRATION.md`
(§1.2 prose, §1.6 staging block, §3.8 verify list, §3.9 smoke list),
`claude/skills/ft-new-project/SKILL.md` (Step 3 heading, Step 7 staging, Step 8
verify + prose count), `/ft-release` §7.1's expected-slug list, `AGENTS.md`
§Workflow, and `ft-flowtron`'s table. Only the last two are already bound by a
check (Pair E, in CI since [[CORE-464]]).

**Machine consumers — the constraint that shapes the fix.** The platform
`ln -s` blocks are not prose. `tools/update-adopters.mjs:350-366`
(`wiredSkillKeys()`) reads each snippet **at the target tag** through a
per-platform `WIRING_SURFACES` entry with its own `snippetKeyPattern`, and
`/ft-update` Step 4 names each platform's own snippet as "the authoritative
list" for that platform. So each block must stay literal, runnable, and
`ln -s`-shaped. This is why the fix declares them *derived* rather than
deleting them.

**Live drift found by the drift check.** `/ft-release` §7.1's "Standing
installed-surface policy check" hardcodes an 11-slug expected set that omits
`ft-refactor` — shipped by [[CORE-463.5]] on 2026-08-23 and present in all four
snippets. All four of its `diff -u` commands fail against HEAD today (verified:
`+ft-refactor` on each). The gate meant to catch roster drift is itself the
drifted surface. Making it SSOT-derived removes the class rather than patching
the instance.

**Counts verified against HEAD (the standing count check passes today).**
`claude/AGENTS-snippet.md` = 24 `ln -s` lines; `docs/MIGRATION.md` §1.6 = 24
`.claude/` paths; `ft-new-project` Step 7 = 24 paths, Step 8 = 24 `readlink`
lines + the prose word "twenty-four". Four hand-maintained restatements of one
number is exactly what [[CORE-329.2]] built the count check to police — and the
check becomes vacuous the moment the consumers derive instead of restate, which
is the PLAN line's "retire whichever §7.1 checks the SSOT makes vacuous".

**Codex boilerplate.** 19 wrappers ship; **18** carry the identical 7-line
translation block (`ft-task` is the SOP-first variant, sharing 6 of the 7 lines
and differing only on bullet 2, which points at lazy fragments instead of
sibling skills). The PLAN line says 17 — see Drift below. `ft-audit` also
carries a fork-don't-symlink blockquote above the boilerplate that must survive.

**Archive skim.** [[CORE-329.2]] (2026-07-02) authored the standing count check
after `e8f492a` left three consumers describing an 18-path wiring while the
snippet had grown to 20 — the drift class this task dissolves. [[CORE-463.5]]
(2026-08-23) is the cost measurement: wiring one skill moved counts on five
files (`ft-flowtron` 18→19, `ft-new-project` twenty-two→twenty-four, MIGRATION
eight→nine and nine→ten, PLATFORMS 18→19 and Eight→Nine, README eight→nine) and
touched 16 surfaces. [[CORE-464]] (predecessor) moved the release-context-free
§7.1 subset — wrapper-name invariant, shipped-skill parity, Pairs A/B/C/E — into
a CI `drift` job; it deliberately left the installed-surface and symlink-count
checks in §7.1, so this task edits §7.1 only and adds no CI step. [[CORE-410.4]]
warns off normalizing lowercase `~/code/flowtron` prose paths in these files —
they are generic clone-destination examples, not machine state; leave them.

**Drift check.**
- PLAN says "17 wrappers"; the actual count carrying the boilerplate is **18**
  (19 shipped, minus `ft-task`'s SOP-first variant). Executing against 18.
- PLAN says the claude snippet is "already de-facto authoritative for
  `/ft-update` Step 4 and `tools/update-adopters.mjs`". Precisely: both consult
  **each platform's own snippet** for that platform, not the claude one
  universally. The claude snippet is de-facto authoritative for *ordering and
  membership* (the other three mirror its set), not as a literal input to those
  two consumers. The SSOT declaration makes the membership claim explicit
  without changing what either consumer reads — which is what keeps this a
  documentation change.
- No SPEC contract contradicted: Core Principle #2 (zero scripts) is preserved —
  every change is markdown, and the new check is shell in a skill body, the same
  shape as every existing §7.1 check.

**Clarifications (asked and answered).** Two scope decisions, both resolved to
the recommended option:
1. *Platform blocks* — keep them runnable and parseable, add an explicit
   derived-surface declaration, and replace §7.1's four hardcoded-list diffs
   with one mechanical SSOT↔derived set-equality check. Rejected alternative:
   collapsing them to substitution prose, which would have required rewriting
   `WIRING_SURFACES` + its test suite and broken adopter copy-paste.
2. *Consumer docs* — replace the `ft-new-project` / MIGRATION enumerations with
   snippet-derived loops, which is what makes the count check vacuous and gives
   the PLAN line's retire clause something to retire.

**Explicit assumptions.** No CI workflow edits (respecting [[CORE-464]]'s
release-vs-CI split). No change to the 12-skill membership itself. No touch to
`AGENTS.md` §Workflow or the `ft-flowtron` table — both are already bound by
Pair E / the KEEP-IN-SYNC pair and are out of this task's surface.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** The SSOT/derived-surface split is the shape `docs/PLATFORMS.md`
already uses for the two-layer contract/wiring model, and the "declare the
authority, point the mirrors at it" idiom is how `cursor/` and `grok/` already
handle the AGENTS paste-block ("Use the block in `../claude/AGENTS-snippet.md`.
Do not maintain a second copy here."). This task extends that existing shape to
the wiring roster rather than inventing one. No new file, no script — Core
Principle #2 holds.

**Minimal refactor gate.** Two edits beyond the PLAN description, both made
stale *by this change* and therefore in scope: `codex/skills/ft-audit/SKILL.md`'s
blockquote pointed at "the bullets below" that the fold removed, and
`claude/skills/ft-new-project/SKILL.md` Step 8 carried a trailing
"If any resolves wrong, fix before reporting success." that the derived check
already says. Deferred: `docs/PLATFORMS.md`'s §"Installed-surface policy" table
and its "Nine tasknote skills" capability roster — those describe *capabilities*
per platform, not the wiring roster, and their wiring columns already defer to
the snippet; rewriting them is a different claim and a different task.

**What changed, by surface.**

1. **`claude/AGENTS-snippet.md`** — §"One-time symlink wiring" now opens with an
   explicit SSOT declaration and a five-row table naming each derived surface and
   its exact derivation. The 24 `ln -s` lines are untouched.
2. **`codex/` · `cursor/` · `grok/AGENTS-snippet.md`** — each wiring section opens
   with a **Derived surface** paragraph stating its own substitution and why the
   literal `ln -s` block stays (adopter copy-paste + `update-adopters.mjs`
   parsing). No `ln -s` line changed.
3. **`codex/AGENTS-snippet.md` §"Translation rules"** (new) — the three
   translation bullets plus the SPEC-authority line, held once.
4. **19 Codex wrappers** — the 7-line boilerplate collapses to a clause on the
   existing "Read and follow" line pointing at §"Translation rules".
   `ft-task` keeps its SOP-first opening and carries its lazy-fragment rule as an
   explicitly wrapper-specific addition; `ft-audit` keeps its fork blockquote.
5. **`ft-new-project` Steps 3 / 7 / 8** — Step 3's 12-slug heading becomes
   "Wire the adopter skill subset"; Step 7's 24-path `git add` and Step 8's 24
   `readlink` lines + the prose word "twenty-four" become two snippet-derived
   pipelines.
6. **`docs/MIGRATION.md`** — §1.2's wiring claim becomes a pointer (purpose
   glossary kept, count word dropped), §1.6's staging block becomes the same
   derivation, §1.7's verify enumeration becomes a pointer, §3.9's smoke list
   becomes a derived slug enumeration.
7. **`README.md`** — the `/ft-new-project` paragraph restated the nine tasknote
   slugs; now names the categories and points at the SSOT.
8. **`/ft-release` §7.1** — the count check is **retired** and replaced by a
   *derivation guard* (assert the two doc consumers contain no hand-maintained
   `.claude/**/ft-*` roster); the installed-surface check's hardcoded 11-slug
   list and five forbidden-install greps collapse into one derivation
   (`shipped claude/skills minus the declared non-adopter categories`) plus four
   set-equality diffs.
9. **`docs/PLATFORMS.md`** — Codex wrapper count 18→19 (stale since
   [[CORE-463.5]]) and both translation descriptions repointed at the new
   centralized rules.

**Deliberate non-change.** No `.github/workflows/ci.yml` edit. [[CORE-464]] chose
which §7.1 checks are release-context-free enough for CI and deliberately left
the installed-surface and symlink-count checks in the release gate; this task
respects that split. The new derivation-guard and set-equality checks are good
CI candidates, but promoting them is CORE-464's decision to revisit, not this
task's.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Validation suite — 6/6 pass.** `npm --prefix viz test` · `run typecheck` ·
`run lint` all exit 0; `node --test tools/update-adopters.test.mjs` **37 pass /
0 fail** (load-bearing here — that tool parses all four snippets I edited);
`node --check` clean on both tool files. `git diff --check` clean.

**CI `drift` job — 7/7 steps pass** against the working tree (wrapper-name
invariant, shipped-skill parity, Pair A, Pair B, Pair C, Pair E rows, Pair E
flags). Pair B is the one at risk from the wrapper fold — it reads `description:`
frontmatter, which the fold never touched, and it stays green.

**Remaining §7.1 pairs — F, G, H all pass**, including Pair H's CI-verbatim
half and both Pair F halves (the five named mirrors and the globbed command
stubs).

**The rewritten §7.1 checks pass — and, more importantly, fail correctly.** A
green detector proves nothing ([[CORE-464]]'s standard), so each new check was
run against a deliberately broken copy:

| Negative test | Expected | Result |
|---|---|---|
| Drop `ft-refactor` from the cursor block | set-equality diff reports it | `-ft-refactor` ✅ |
| Add `ft-release` to the SSOT block | policy diff reports it | `+ft-release` ✅ |
| Re-add a hardcoded `.claude/…/ft-task` path to MIGRATION §1.6 | derivation guard reports it | line reported ✅ |
| Unanchored `grep '^ln -s'` on the codex snippet | drags the hot-reload glob in | `*` leaks into the set ✅ |

The last one confirms the anchored `grep` prefixes are load-bearing, which is
why §7.1 documents them as such.

**The derived commands were executed, not just written.** The
`ft-new-project` / MIGRATION pipeline extracts **24** destination paths, all
under `.claude/`; the §3.9 smoke pipeline extracts exactly the **12** adopter
slugs; the §7.1 SSOT derivation extracts the same **12**.

**Quality assertions.** The change is subtractive by design — net **−99 lines**
across 27 files, with duplication removed rather than relocated. No dead
references left: `grep` for `twenty-four` / `twenty-two` / `ten total` /
`nine tasknote` / the retired count check finds no hit outside this tasknote and
one historical `## Completed` PLAN row. No public-surface growth (no new file, no
new skill, no new script). Stale code-facing docs found by the sweep were fixed
(`PLATFORMS.md`'s 18→19, the `ft-audit` "bullets below" pointer). `N/A`: no code
changed, so no test-coverage delta.

**Frontend:** N/A — no `viz/` change; the three `viz` gates were run only as
regression cover.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** over `.flowtron/tasknote/README.md` §"AI-referenced docs",
per-entry verdict:

| Doc | Verdict |
|---|---|
| `README.md` | **updated** — the `/ft-new-project` paragraph restated the nine tasknote slugs; now names the categories and points at the SSOT |
| `AGENTS.md` | no change — its peer-skill roster is a names-only capability list already bound by the KEEP-IN-SYNC pair + Pair F, not a wiring roster |
| `SPEC.md` | no change — §"Skill namespace" and the repo-layout bullet describe directories, not the adopter roster |
| `docs/MIGRATION.md` | **updated** — §1.2 pointer, §1.6 derivation, §1.7 pointer, §3.9 derivation |
| `claude/AGENTS-snippet.md` | **updated** — SSOT declaration + derived-consumer table |
| `codex/AGENTS-snippet.md` | **updated** — derived-surface declaration + new §"Translation rules" |
| `cursor/AGENTS-snippet.md` | **updated** — derived-surface declaration |
| `grok/AGENTS-snippet.md` | **updated** — derived-surface declaration |
| `docs/CONVENTIONS.md` | no change — its §7.1 summary names the wrapper-name invariant, shipped-skill parity, and Pairs A/B/C/E; none was retired or renamed |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |
| `docs/AGENT-NEUTRALITY.md` | no change — no ledger row covers the wrapper translation bullets; the unledgered-reference gap is [[CORE-466]]'s |
| `docs/PLATFORMS.md` | **updated** — Codex wrapper count 18→19 (stale since [[CORE-463.5]]); both translation descriptions repointed at §"Translation rules". §"Installed-surface policy" left as-is: capability roster, not wiring roster, and its wiring column already defers to the snippet |
| `claude/CAPABILITIES.md` | no change — no flag row touched |
| `docs/AGENT-COMPAT.md` | no change — carries no wrapper count or roster restatement |
| `docs/EXTERNAL-AGENTS.md` | no change |
| `docs/WORKTREES.md` | no change |

**No superseded-claim pointer written.** This task falsified no factual claim in
an archived tasknote. [[CORE-329.2]]'s count check is *retired*, not falsified —
it was an accurate response to the drift class as it stood, and superseding a
decision is recorded on the later note, not as a ⚠️ pointer on the old one
(SPEC §"Tasknote frontmatter", the "superseded decision" carve-out). Recorded
here instead via YAML `supersedes: [CORE-329.2]`.

**Final Summary:**

Gave the 12-skill adopter-wiring roster a declared single source of truth, so
shipping a skill stops being a sixteen-surface fan-out. `claude/AGENTS-snippet.md`
§"One-time symlink wiring" is now explicitly authoritative and carries a table of
its five derived surfaces; the codex / cursor / grok blocks keep their literal
`ln -s` lines (adopters copy-paste them and `tools/update-adopters.mjs` parses
them) but declare themselves derived under a stated substitution; and
`docs/MIGRATION.md` §1.6 + `ft-new-project` Steps 7–8 stopped restating 24 paths
apiece in favour of two `grep '^ln -s' … | awk '{print $NF}'` pipelines.

**Changed files:** 27, **+156 / −255 (net −99)**. `claude/AGENTS-snippet.md` ·
three platform snippets · 19 Codex wrappers · `ft-new-project/SKILL.md` ·
`ft-release/SKILL.md` · `docs/MIGRATION.md` · `docs/PLATFORMS.md` · `README.md`.
Markdown only — no code, no script, no new file.

**The §7.1 gate was itself the drift.** Its "Standing installed-surface policy
check" hardcoded an eleven-slug expected list that omitted `ft-refactor`; all
four of its `diff`s were failing against `main` when this task found them —
[[CORE-463.5]] wired the skill across sixteen surfaces and the gate's own list
was not one of them. That list and its five forbidden-install greps are gone,
replaced by one derivation (shipped `claude/skills` minus the declared
non-adopter categories) plus four set-equality diffs. A thirteenth adopter skill
now needs **zero** §7.1 edits; only a genuine policy change touches it.
[[CORE-329.2]]'s count check is retired as vacuous — with the consumers deriving,
the counts cannot disagree — and replaced by a guard that the consumers *stay*
derived.

**Codex boilerplate:** 19 wrappers × 7 lines of translation instructions collapse
to one clause each, pointing at the new `codex/AGENTS-snippet.md`
§"Translation rules". (The PLAN line said 17 wrappers; the real count carrying it
was 18, plus `ft-task`'s SOP-first variant sharing 6 of the 7 lines.)

**Verification:** 6/6 validation commands pass (`update-adopters` **37/0** — the
suite that parses every snippet edited here); the CI `drift` job's 7 steps pass;
§7.1 Pairs F, G, H pass. Every new check was **negative-tested**: dropping a slug
from a platform block, installing a forbidden slug, and re-introducing a
hardcoded roster copy each produce the expected finding, and the unanchored-grep
case confirms the documented `*`-leak. The derived pipelines were executed, not
just written — 24 destination paths, 12 adopter slugs, matching the SSOT.

**Beyond the PLAN description:** the Phase 4 sweep found `docs/PLATFORMS.md`
claiming 18 Codex wrappers against 19 shipped (stale since [[CORE-463.5]]) and
`README.md` restating the nine tasknote slugs; both fixed. Two pointers my own
change stranded (`ft-audit`'s "bullets below", `ft-new-project` Step 8's
redundant tail) repaired. **Deliberately not done:** no CI edit —
[[CORE-464]] chose which checks are release-context-free enough to promote, and
revisiting that split is its call, not this task's.

**Maintainability:** the roster now has one editable definition and five
mechanically-checked derivations. The five count words that [[CORE-463.5]] had to
move by hand no longer exist, and the class of failure that let a roster gate go
stale for a day short of a release cut is closed by construction rather than by
another standing check.

**Archived:** 2026-08-24
