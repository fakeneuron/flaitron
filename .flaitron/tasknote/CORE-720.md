---
title: audit-overlay-docs-deltas
status: blocked
tags: []
created: 2026-10-06
park-reason: input-needed — deliverable path `.claude/skills/audit/SKILL.md` is gitignored, so the flaitron-self audit overlay has no committable home; closure needs an operator decision (force-commit, relocate to a tracked home, or accept unversioned)
due:
related-tasks: [CORE-073, CORE-644, CORE-661, CORE-711.4]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - .claude/skills/audit/SKILL.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-720 | audit-overlay-docs-deltas

[← PLAN.md](../PLAN.md) · ⏸ Blocked

## 🎯 Goal

Fill the `docs`-domain deltas in `.claude/skills/audit/SKILL.md` so `/audit docs`
runs against a real doc set and rubric instead of tripping the scaffold
bootstrap, and re-reconcile the overlay's `flaitron-reconciled:` pin from
v5.31.0 to the current released tag.

## ✅ Acceptance

- [ ] All five `## Deltas` bullets carry a `docs:`-keyed value — `[ "$(grep -c '^  - `docs:`' .claude/skills/audit/SKILL.md)" = 5 ]`
- [ ] No `docs:`-keyed delta leaves a placeholder behind — `! grep '^  - `docs:`' .claude/skills/audit/SKILL.md | grep -q '<'`
- [ ] `/audit docs` no-ops the dispatcher's §1 step-3 scan — `judgment`: the scan is prose-defined over two slot classes (`<…>` spans in §"Scope & rubric hints", `_(forker: …)_` notes anywhere), so no single command decides it; the two criteria above are its machine proxy, cross-checked against an enumeration of all 9 `passes/docs.md` forker slots in Testing Notes
- [ ] `flaitron-reconciled:` names the current released tag — `grep -q '^flaitron-reconciled: v6.0.0$' .claude/skills/audit/SKILL.md && [ v6.0.0 = "$(git tag --sort=-v:refname | head -1)" ]`
- [ ] The reconcile is substantive, not a string bump — `judgment`: evidence is the reviewed `git diff v5.31.0..v6.0.0 -- claude/skills/ft-audit/ templates/audit-overlay-template.md`, which must show no delta slot added or removed
- [ ] §"Domains" no longer claims `docs` inherits the unkeyed values — `! grep -q 'the remaining domains inherit the unkeyed values' .claude/skills/audit/SKILL.md`
- [ ] The unkeyed deltas and the other seven domains are untouched — no delta bullet appears among the removed lines and all three `<not derivable …>` values survive: `! git diff -U0 -- .claude/skills/audit/SKILL.md | grep '^-' | grep -v '^---' | grep -q -- '- \*\*'` and `[ "$(grep -c '<not derivable' .claude/skills/audit/SKILL.md)" = 3 ]`. **Verify command corrected in Phase 2** — the Phase 1 form counted removed lines against a literal `3`, which only holds if the two prose edits were single lines; both are wrapped paragraphs, so the count was never the right shape. The criterion itself is unchanged.
- [ ] Every section citation in the edited file resolves — a local bash reproduction of CI's Pair Q extraction loop over `.claude/skills/audit/SKILL.md`, exit 0 (7/7). **Rationale corrected in Phase 3:** the Phase 1 form said "so CI's `drift` Pair Q stays green", which is false — `.claude/` is gitignored, so Pair Q never sees this file. The criterion stands on its own merit instead: a stale citation here would misdirect a live `/audit docs` run regardless of CI.
- [ ] The overlay stays thin — `[ "$(wc -c < .claude/skills/audit/SKILL.md)" -lt 10000 ]`; no `.claude/` row exists in `docs/CONTEXT-BUDGET.md` §"Budgets", so no byte cap applies
- [ ] `.editorconfig` floor holds on the edited file — `[ -z "$(tail -c1 .claude/skills/audit/SKILL.md)" ] && ! grep -nq ' $' .claude/skills/audit/SKILL.md`

## 🧩 Subtasks

- [ ] Add a `docs:`-keyed sub-bullet under **Scope glob** — the Pair Q live-doc selection (`git ls-files '*.md'` minus the two write-once archives), cited to `.github/workflows/ci.yml`
- [ ] Add a `docs:`-keyed sub-bullet under **Rubric files** — the declared doc-set contract, the workflow contract, the public overview, the conventions ledger, and the agent-neutrality ledger
- [ ] Add a `docs:`-keyed sub-bullet under **Verification gates** — the "no gates" note: no markdown linter or link checker is configured, so skip per `passes/docs.md`; name CI's `drift` job as the nearest coverage and why it is not a local gate
- [ ] Add a `docs:`-keyed sub-bullet under **Per-pass examples** — concrete flaitron drift shapes for docs passes 1-4
- [ ] Add a `docs:`-keyed sub-bullet under **Extra hard rules** — write-once surfaces, the agent-neutrality ledger check, and the don't-re-report-CI rule
- [ ] Update the §"Domains" sentence so it no longer says `docs` inherits the unkeyed values, and the `## Deltas` keying sentence so it describes the sub-bullet shape
- [ ] Bump `flaitron-reconciled:` to `v6.0.0` (the reconcile diff is already reviewed — Discovery Notes)
- [ ] Run the Acceptance verify commands, including the local Pair Q loop over the edited file

## 🔗 Related

- [[CORE-073]] — predecessor: forked this overlay into `.claude/skills/audit/` (`audit-flaitron-self`)
- [[CORE-644]] — predecessor: taught the bootstrap and `docs/MIGRATION.md` §1.2.2 the flaitron-self referenced-scaffold path this overlay already carries
- [[CORE-661]] — related-decision: cleared every placeholder from `passes/context.md` so the bootstrap scan no-ops on it; the same intent, applied one domain over
- [[CORE-711.4]] — predecessor: rebrand sweep that last rewrote this overlay's frontmatter keys

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN line's target file, its three named slots, and the
  v5.31.0 pin all match current state. One drift found and resolved by operator
  ask rather than re-scope: the three named deltas alone do **not** meet the
  line's stated goal (`/audit docs` stops tripping the bootstrap), because
  `passes/docs.md` carries five further `_(forker: …)_` notes that the overlay's
  *unkeyed* `Per-pass examples` / `Extra hard rules` deltas leave as
  `<not derivable …>`. Operator chose the docs-keyed five-slot fill, so the goal
  is reachable inside the filed scope and the plan shape is unchanged — the
  parenthetical was an under-count, not a different task.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flaitron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Target state.** `.claude/skills/audit/SKILL.md` (3,460 bytes) is a thin
overlay: no `passes/` sibling, a `## Deltas` block, and the flaitron-self
in-tree referenced-scaffold line. Its `## Deltas` currently holds **unkeyed**
values only — a code-shaped Scope glob (`viz/src/**` · `tools/**/*.mjs`), code
rubric files, and the four npm/node verification gates — plus three
`<not derivable — forker: …>` placeholders (Sacred invariants, Per-pass
examples, Extra hard rules).

**Why `/audit docs` trips the bootstrap.** Dispatcher §1 step 3 scans the loaded
`passes/<domain>.md` for two slot classes — any `<…>` span inside §"Scope &
rubric hints", and any `_(forker: …)_` note anywhere — *less anything a thin
overlay's `## Deltas` supplies*. `passes/docs.md` carries 6 angle spans and 9
forker notes. Four of the forker notes sit in §"Scope & rubric hints" (the
default glob and three rubric slots) and are the three the PLAN line names;
the remaining five sit in passes 1-4 and §"Hard rules", and map to the overlay's
`Per-pass examples` / `Extra hard rules` deltas, which are still placeholders.
So the three named deltas clear four of nine slots — hence the operator ask, and
the five-slot docs-keyed fill.

**Placeholder census across pass files** (`_(forker:` count · `<…>` spans inside
§"Scope & rubric hints"): `backend` 10·7, `context` **0·0**, `docs` 9·6,
`frontend` 8·8, `general` 7·6, `performance` 10·7, `security` 10·7,
`structure` 10·6. Only `context` is clean — cleared deliberately by
[[CORE-661]], whose Acceptance asserted "no forker placeholder introduced, so §1
step 3's bootstrap scan still no-ops on this file". That is the precedent this
task follows for `docs`; the other six unclean domains stay out of scope
(operator-confirmed) and remain a follow-up candidate.

**Derived values and their sources** (the bootstrap's own §3 rule — every
derived value cites the file it came from):

- *Default doc-set glob* — `.github/workflows/ci.yml`, the `drift` job's Pair Q
  file selection: `git ls-files '*.md'` minus `^\.flaitron/tasknote/archive/`
  and `^\.flaitron/PLAN-ARCHIVE\.md$`. 139 live files at HEAD. This is the
  repo's existing machine definition of "live doc surface", and its two
  exclusions are exactly `passes/docs.md`'s own write-once hard rule, so the
  glob is lifted rather than invented. Repo markdown totals 1,219 tracked files,
  1,085 of them under `.flaitron/` — almost all archived tasknotes — which is
  why an unqualified `**/*.md` default would be wrong by two orders of
  magnitude.
- *Rubric files* — `.flaitron/tasknote/README.md` §"AI-referenced docs" (the
  declared doc-set contract, and the `ai-referenced` scope token's target),
  `SPEC.md`, `README.md`, `docs/CONVENTIONS.md`, `docs/AGENT-NEUTRALITY.md`.
  The last is named by the AI-referenced list itself as the ledger "audits and
  Phase 4 sweeps consult before flagging Claude-Code references in the contract
  layer" — a docs-audit rubric by its own description.
- *Verification gates* — **none.** There is no root `package.json`;
  `viz/package.json` declares no markdown script (`remark-gfm` /
  `react-markdown` are runtime deps of the visualizer, not linters); the
  `justfile` has six recipes (setup/dev/test/lint/typecheck/build), none for
  docs; `.github/workflows/ci.yml` configures no markdown linter or link
  checker. `passes/docs.md` says "Skip entirely if no doc tooling is
  configured", so the correct delta is an explicit no-gates note — not an
  invented command, which the bootstrap's §3 denylist paragraph forbids on the
  same grounds.

**Re-reconcile v5.31.0 → v6.0.0 (done in Discovery, so Phase 2 is a pin bump).**
Current released tag is `v6.0.0`; HEAD is `v6.0.0-22-g19c1f304`. Diffed the
tracked scaffold across the two pins (`claude/skills/ft-audit/`,
`claude/commands/ft-audit.md`, `templates/audit-overlay-template.md` — 7 files,
+111/-72):

- `passes/docs.md` — rebrand-only (three `.flowtron/` → `.flaitron/` paths). **No
  delta slot added or removed**, so the overlay's docs surface is unchanged.
- `SKILL.md` — §2 generalised from "The 5 passes" to "The passes" with a tighter
  per-pass cap rule ([[CORE-661]]), and the filing-commit post-stage check gained
  a PLAN-row carve-out. Neither is a delta slot.
- `scaffold-bootstrap.md` — gained the flaitron-self fork branch ([[CORE-644]]).
  The overlay already carries the in-tree referenced-scaffold line and the
  "no `passes/` directory of its own" note that branch prescribes, so nothing to
  reconcile.
- `templates/audit-overlay-template.md` — rebrand plus the same flaitron-self
  path guidance. Delta bullet list is byte-identical in substance.

Verdict: the pin bump is clean — no overlay edit is owed by the upstream drift
itself. The docs fill is the only substantive change.

**Citation safety.** ⚠️ **Corrected in Phase 3 — the premise was wrong.** This
note originally read "`.claude/` is tracked, and Pair Q's file set is
`git ls-files '*.md'` …, so every citation added to this overlay is checked in
CI." `.claude/` is **gitignored** (`.gitignore:21`), so the overlay is untracked
and Pair Q never sees it. See §"Phase 3" → *Blocker* for the consequence.

What survives the correction is the work itself, which was worth doing on its
own merits: a stale `§"Section"` citation in the overlay would misdirect a live
`/audit docs` run whether or not CI polices it. Pair Q is a prefix match against
`# <sec>` or `**<sec>`, heading-level-blind and emoji-literal (its own comment
warns `§"Phase 4: Closure"` does *not* resolve against `## 🚀 Phase 4: Closure`).
All eight candidate citations were pre-verified before being written, and the
seven that survived into the file were re-verified by a local Pair Q
reproduction in Phase 3.

**Budget.** `docs/CONTEXT-BUDGET.md` has no `.claude/` row (0 matches), so the
overlay carries no CI-enforced byte cap. Thinness is a judgment constraint from
the template's forker note ("if you find yourself editing pass *bodies* … you've
outgrown the overlay"), tracked here as a <10,000-byte Acceptance guard.

**Archive skim.** `ls .flaitron/tasknote/archive/core/` then
`grep -l '\.claude/skills/audit' …` → 17 notes. Load-bearing ones, read:
[[CORE-073]] created the fork; [[CORE-644]] added the flaitron-self path
guidance; [[CORE-661]] is the direct precedent (placeholder clearing so the
bootstrap no-ops); [[CORE-711.4]] last rewrote the frontmatter keys during the
rebrand and is the commit the `v5.31.0` pin dates from. The remaining 13 mention
the path incidentally (skill-roster and namespace sweeps), nothing load-bearing.

**Best Practices Review.** `N/A` for module boundaries — this is a
markdown-only edit to one skill file, no code surface, no dependency direction.
The one structural rule that does apply is the overlay contract itself: supply
deltas, never restate pass bodies. The fill is written as domain-keyed
sub-bullets under the existing five delta bullets, which is the shape
`## Deltas` already prescribes ("Where a value differs per domain, key it by
domain (`backend: …`)") — an extension of the established pattern, not a new
one.

**Drift check.** PLAN line claims re-verified against current state: target path
exists; the three named slots exist in `passes/docs.md`; the `v5.31.0` pin is
live in the frontmatter; "current tag" resolves to `v6.0.0`. One under-count
drift (three named slots vs. nine real ones) resolved by the operator ask above.
No SPEC contract contradicted — `SPEC.md`, `SPEC/tasknote-selection.md`, and
`docs/MIGRATION.md` §1.2.1/§1.2.2 all treat overlay-delta filling as ordinary
fork maintenance. Two consequential in-file edits follow from the fill and are
in scope: the §"Domains" sentence currently says `docs` is among "the remaining
domains [that] inherit the unkeyed values", which the fill falsifies, and the
`## Deltas` keying sentence should describe the sub-bullet shape.

**Clarification asked (operator answered).** Fill scope → "docs-keyed, all 5 slots": add `docs:` entries for Scope glob, Rubric files, Verification gates, Per-pass examples, and Extra hard rules. The other six unclean domains and the unkeyed `<not derivable …>` values stay untouched, noted as a follow-up candidate rather than folded in.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

One file changed: `.claude/skills/audit/SKILL.md`, 3,460 → 7,643 bytes.

**Pattern survey.** The fill extends the shape `## Deltas` already prescribes
("Where a value differs per domain, key it by domain") rather than inventing
one: five nested `` `docs:` `` sub-bullets, one under each existing delta bullet,
leaving every unkeyed value byte-identical. No pass body is restated, so the
overlay stays a thin overlay — the template's forker note draws that line, and
crossing it would mean outgrowing the overlay for a full copy.

**Five docs-keyed deltas written:** scope glob (CI Pair Q's live-doc selection,
cited to `.github/workflows/ci.yml`), rubric files (five, led by the declared
doc-set contract), verification gates (an explicit *none — skip*, with the
four pieces of evidence for why), per-pass examples (keyed `pass 1`…`pass 4`,
flaitron-specific drift shapes), extra hard rules (three, lettered).

**Two consequential in-file edits**, both falsified by the fill and so in scope:
§"Domains" no longer lists `docs` among the domains inheriting the unkeyed
values (now "the remaining six"), and the keying sentence describes the
sub-bullet shape.

**Minimal refactor gate.** No refactor. The three unkeyed `<not derivable …>`
values are deliberately untouched — filling them would clear the bootstrap for
the other six domains, which the operator scoped out.

**Tests.** None applicable: markdown-only edit to one skill file, no code
surface, no test fixture asserts on this path (it is untracked, so CI cannot
assert on it at all).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [ ] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

**Verification receipt.** All eight mechanical Acceptance commands, `command →
exit code`:

```text
[ "$(grep -c '^  - `docs:`' $F)" = 5 ]                                    → 0
! grep '^  - `docs:`' $F | grep -q '<'                                    → 0
grep -q '^flaitron-reconciled: v6.0.0$' $F && [ v6.0.0 = "$(git tag …)" ] → 0
! grep -q 'the remaining domains inherit the unkeyed values' $F           → 0
! git diff -U0 -- $F | grep '^-' | grep -v '^---' | grep -q -- '- \*\*'   → 0
[ "$(grep -c '<not derivable' $F)" = 3 ]                                  → 0
[ "$(wc -c < $F)" -lt 10000 ]                                → 0  (7,643 B)
[ -z "$(tail -c1 $F)" ] && ! grep -q ' $' $F                              → 0
bash pairq.sh .claude/skills/audit/SKILL.md                  → 0  (7/7 resolve)
bash pairq.sh            (full repo, 139 files)              → 0  PAIR Q GREEN
```

The repo's four `AGENTS.md` §"Validation" commands are **N/A** — markdown-only
change to one skill file, no code surface touched, and the file is outside
every npm/node project in the tree.

**Bootstrap-scan cross-check** (the one `judgment` criterion). Enumerated all 9
`_(forker: …)_` slots in `passes/docs.md` against the overlay after the fill:
4 in §"Scope & rubric hints" (default glob → `docs:` scope glob; rubric 1-3 →
`docs:` rubric files) plus the 6 `<…>` spans in that block (the two gate slots →
`docs:` verification gates), and 5 outside it (passes 1-4 → `docs:` per-pass
examples; §"Hard rules" → `docs:` extra hard rules). Every slot now resolves to
a filled `docs:` delta, so dispatcher §1 step 3's scan — placeholders *less what
the overlay's `## Deltas` supplies* — nets to zero for this domain and no-ops
silently. `claude/skills/ft-audit/passes/docs.md` §"Severity guide" carries no placeholder, so the
unkeyed `Sacred invariants` value is never consulted on a `docs` run and its
staying unfilled is not a gap here.

**Two corrections recorded, neither weakening a criterion:**

1. *A verify command was wrong* (fixed in Phase 2, noted on the criterion
   itself). The Phase 1 form counted removed diff lines against a literal `3`,
   which only holds if the two prose edits were single lines; both are wrapped
   paragraphs. Replaced with a check that no delta bullet appears among removed
   lines and all three `<not derivable …>` values survive.
2. *A Discovery premise was wrong* — see the ⚠️ correction in Discovery Notes
   and the blocker below.

**A local Pair Q reproduction was needed, and the first attempt fail-opened.**
Ran the CI block's shell locally under zsh; `path` is a **tied special variable**
in zsh, so `pth=${path#…}` clobbered `PATH` mid-loop and `sed` / `git` vanished.
The loop then reported green having extracted no citations at all — a fail-open
whose output was indistinguishable from a real pass. Re-ran as a bash script
with the variable renamed `pth`; both the single-file and full-repo runs are
genuinely green. CI is unaffected (it runs bash, where `path` is ordinary), so
this is a local-reproduction hazard, not a CI defect — worth recording because
the failure mode *looks like success*.

**🚫 Blocker — the deliverable has no committable home.** `.gitignore:21` ignores
`.claude/` with the comment "Personal Claude Code / Codex / Cursor / Grok wiring
for this checkout … Never commit per-machine state", added by CORE-219 and
reaffirmed by CORE-439 ("one canonical skill-install path per project").
Consequences:

- `.claude/skills/audit/SKILL.md` is untracked and absent from `HEAD`
  (`git cat-file -e HEAD:…` → "exists on disk, but not in 'HEAD'"). The four
  commits in its `git log` all predate the ignore rule.
- `git status --porcelain` shows only this tasknote. The 4,183 bytes of work
  cannot be staged, so **SPEC §"Paper-complete guard" forbids flipping the
  PLAN.md line or archiving this note** — the closure commit would be
  workflow-paper only while Acceptance requires a real deliverable.
- The cause is structural and pre-existing, not introduced here.
  `docs/MIGRATION.md` §1.2.1 prescribes installing the overlay at
  `.claude/skills/$SKILL/SKILL.md`; flaitron-self then ignores exactly that
  path. Every *other* skill in `.claude/skills/` is a symlink into the tracked
  `claude/skills/`, so the ignore rule costs nothing — `audit/` alone is a real
  directory holding a real file, because the audit scaffold is
  **forked-not-symlinked**. It is the one skill the rule strands.
- Practical exposure: flaitron's own `/audit` overlay — now including this
  task's fill — exists on one machine only and is outside every backup, review,
  and CI path the repo otherwise relies on.

Phase 3 therefore stops short of the **External review** box and Phase 4: the
disposition of this blocker is a repo-policy decision (force-commit, relocate to
a tracked home, or accept unversioned), which is the operator's to make, not
mine. Surfaced inline rather than parked, since the operator is attended.

## 🚀 Phase 4: Closure

- [ ] **Doc-drift sweep** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [ ] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [ ] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [ ] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

**Archived:** YYYY-MM-DD
