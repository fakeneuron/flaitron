---
title: ft-audit-operator-action
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-386, CORE-463.2, CORE-389.2]
touches:
  - claude/skills/ft-audit/SKILL.md
  - claude/skills/ft-audit/passes/security.md
  - claude/skills/ft-audit/passes/structure.md
  - claude/skills/ft-audit-repo/SKILL.md
---

# CORE-561 | ft-audit-operator-action

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-386]]

## 🎯 Goal

Add an `Operator action: tell the agent to …` line to `/ft-audit`'s §3 finding format and make a finding that cannot produce one **disqualified**, encoding the disqualification as a detection filter in the §6 hard rules and the §7/§8 failure-mode pair rather than as a formatting nicety.

## ✅ Acceptance

- [x] `claude/skills/ft-audit/SKILL.md` §3's fenced format block carries an `Operator action:` line — `grep -q 'Operator action:' claude/skills/ft-audit/SKILL.md`
- [x] §6 carries a hard rule making a finding that cannot produce an operator action **disqualified**, sited beside "Targeted, not exhaustive" / "Don't repeat the gates" — `grep -c 'disqualified' claude/skills/ft-audit/SKILL.md` ≥ 2 (§3 note + §6 rule)
- [x] The §7 Rationalizations table gains a row and §8 Red Flags gains a bullet for the disqualification, each terminating in a real section reference — `grep -n 'Operator action' claude/skills/ft-audit/SKILL.md` shows hits in §§3, 6, 7, 8
- [x] `passes/structure.md` and `passes/security.md` carry the two targeted per-domain operator-action clauses; the other five pass files are untouched — `git diff --name-only` lists exactly the four `touches:` paths
- [x] `claude/skills/ft-audit-repo/SKILL.md` §3 names its deliberate omission of the line in one clause — `grep -q 'Operator action' claude/skills/ft-audit-repo/SKILL.md`
- [x] Every new `§"…"` cross-reference resolves to a real heading — grep-verified per target
- [x] Adds no new fillable placeholder to the fork surface, so overlays inherit verbatim — `grep -c '_(forker:' ` unchanged on both edited pass files, and no `<…>` slot added to SKILL.md
- [x] `claude/skills/ft-audit/SKILL.md` stays under its 33,000-char budget — `wc -c`
- [x] Existing suites still pass — `npm --prefix viz test -- --run`; `node --test tools/update-adopters.test.mjs`
- [x] The line's wording reads as a dispatchable instruction rather than a restatement of `Recommended fix:` — `judgment` (no command decides prose quality)

## 🧩 Subtasks

- [x] Add the `Operator action:` line to SKILL.md §3's fence + a sentence under it naming the disqualification and pointing at §6
- [x] Add the §6 hard rule ("Every finding names an operator action") beside the two named neighbours
- [x] Add §7 Rationalizations rows + §8 Red Flags bullets (two of each — the vague-action and the reworded-fix failure)
- [x] Add the targeted per-domain clause to `passes/structure.md` §"Specialist additions" (cluster → every site)
- [x] Add the targeted per-domain clause to `passes/security.md` §"Specialist additions" (never "apply inline")
- [x] Add the deliberate-omission clause to `ft-audit-repo` §3
- [x] Verify cross-references, budget, placeholder count, and the two suites

## 🔗 Related

- [[CORE-386]] — predecessor; created §7 Rationalizations + §8 Red Flags in this same file (`related-decision:`), and set the precedent that a stack-neutral audit rule adds no fillable §0 slot
- [[CORE-463.2]] — precedent for a per-pass finding-format extension (`Finding-format note` in `structure.md`) and for the composition rule that domain deltas live in pass files (`related-decision:`)
- [[CORE-389.2]] — established the dispatcher/`passes/` split whose `(→ dispatcher §N)` back-references constrain how §§1–6 may be edited (`depends-on:`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The routed proposal names a real gap: `Recommended fix:` says *what* to change, never who dispatches it. The two open decisions the PLAN line flags ("decide whether `/ft-audit-repo` carries the line", "each pass file's severity guide *may* need…") were resolved by operator ask, not widened. One drift item found (§"Failure modes" does not exist) and mapped rather than treated as a blocker, so scope is unchanged.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Drift check — one hit, mapped not blocked.** The PLAN line names
`claude/skills/ft-audit/SKILL.md` §"Failure modes" as a required surface.
**No such section exists** — `grep -rn "Failure modes"` across the repo returns
only the PLAN line itself. The file's failure-mode surface is the pair
[[CORE-386]] added: **§7 Rationalizations** (the excuse an auditor uses, each row
terminating in the clause that refutes it) and **§8 Red Flags** (the same failure
phrased as a symptom an outside observer would notice). Treating those two as the
named surface satisfies the routed intent — "belongs with the §6 hard rules and
in §'Failure modes', not only in the format block" — with one row and one bullet.
Everything else the PLAN line cites verified current: §3's fence is at lines
47–53, §3's *"Insert any extra finding-format lines the pass file declares"*
sentence is at line 55, `performance`'s `Measured impact:` declaration at
`passes/performance.md:47`, and the overlay template's §"Deltas" preamble does
list "finding format" among what is inherited verbatim (line 42).

**Where the finding format is actually restated — two places, not ten.**
`grep -rn "Recommended fix"` (archive excluded) hits exactly
`claude/skills/ft-audit/SKILL.md:52` and `claude/skills/ft-audit-repo/SKILL.md:42`.
Every other mention of "finding format" across `passes/*.md` headers,
`scaffold-bootstrap.md:5`, `templates/audit-overlay-template.md:13,42`, and
`docs/MIGRATION.md:76,154` is a *pointer* describing the format as
dispatcher-owned and inherited — none carries the field list, so none needs an
edit. Both wrappers (`claude/commands/ft-audit.md`, `codex/skills/ft-audit/SKILL.md`)
are pointers too. `docs/MIGRATION.md:154`'s "change the finding format" names a
*forker* divergence trigger (full-copy vs overlay); upstream editing the format
is exactly what the overlay path exists to inherit, so it stays correct as
written.

**Archive skim** — `archive/core/` (742 notes) grepped on all four `touches:`
paths; ~25 hits, titles enumerated, three load-bearing:

- [[CORE-386]] — created §7/§8 in this file and set two precedents this task
  follows. First: a stack-neutral audit rule is **inherited verbatim by forkers,
  and §0's checklist gains no new fillable slot** — the `Operator action:` line
  is stack-neutral, so it must add no `<…>` span and no `_(forker: …)_` note, or
  §1 step 3's placeholder scan starts tripping on a filled fork. Second: its
  summary records that *"appending leaves §§1–6 intact, so the `(→ dispatcher §N)`
  back-references in all six `passes/*.md` stay correct"* — the constraint on how
  this file may be edited. Adding a line inside §3's fence and a bullet inside §6
  renumbers nothing, so those back-references survive.
- [[CORE-463.2]] — the precedent for a per-pass finding-format extension: it added
  `structure.md`'s `Finding-format note` (`Location:` may name a cluster) without
  touching the dispatcher's procedure, and its summary states the composition rule
  plainly — a new domain absorbed *"as pure data (zero dispatcher-procedure edits)"*.
  It also shows bullet-level asymmetry across pass files is already normal: only
  `performance` declares a finding-format extra, only `docs`/`security`/`structure`
  declare carve-out adjustments. Its verified "structural parity across all 7 pass
  files" was parity of *headings*, not of every bullet — so a targeted two-file
  clause is consistent with it, not a violation.
- [[CORE-389.2]] — the dispatcher/`passes/` split itself; shared procedure lives
  once in `SKILL.md`, domain deltas in the pass file. This is the rule that puts
  the disqualification in the dispatcher rather than seven times over.

**Budget check.** `claude/skills/ft-audit/SKILL.md` measures 21,707 chars against
the 33,000 `claude/skills/*/SKILL.md` cap (`docs/CONTEXT-BUDGET.md` §"Budgets"),
so ~11,000 of headroom — this change is a few hundred chars. `passes/*.md`,
`templates/`, and `ft-audit-repo` are unbudgeted by that doc's
§"Not budgeted, deliberately". The ledger's measured `ft-audit 21,707` row goes
stale by design and is refreshed by `/ft-release` §7.1 at the cut, not here.
`claude/skills/*/SKILL.md` also sits **outside** the Phase 4 doc-drift sweep set
per `.flowtron/tasknote/README.md` §"AI-referenced docs", so no sweep entry owns
these files.

**Best Practices Review** — markdown contract surfaces, no code. Responsibilities
stay where the composition puts them: the *rule* (format line + detection filter +
failure-mode pair) is shared procedure and lands once in the dispatcher; the two
per-domain clauses land in the pass files whose existing bullets would otherwise
produce a wrong-shaped action. No refactor needed or made — the edit is additive
at four points and renumbers nothing.

**Clarifying questions — asked, both answered.** The PLAN line leaves two
decisions explicitly open; both were put to the operator via AskUserQuestion
rather than assumed:

1. *Does `/ft-audit-repo` carry the line?* → **Omit, with a named delta.** Its §3
   states sweep findings *"do not become standalone tickets outside the milestone
   plan"* — they feed §4 synthesis and §5 delegation, and the dispatch unit is the
   §6 milestone child, which is already a flowtron task line and dispatchable by
   construction. A dispatchability filter at sweep level would disqualify exactly
   the diagnostic observations first-contact synthesis needs. Because its §3 says
   *"Use the family finding format"*, the omission gets one explicit clause so a
   later reader does not read the divergence as drift and "fix" it.
2. *How far into the seven pass files?* → **Dispatcher + two targeted notes.** The
   rule reads identically in every domain, so it lives once in the dispatcher;
   per-domain clauses go only where an existing bullet would otherwise mislead —
   `structure` (its `Location:` may be a pair or cluster, so one operator action
   must name every site a fix touches) and `security` (its action must route to
   the leaked-secret path or a ticket, never "apply inline", per its own carve-out
   adjustment). `performance`'s "Measure, don't guess" and `docs`'s carve-out note
   already constrain their actions adequately; `general`/`backend`/`frontend` have
   no delta to state, and writing one anyway is the padding CORE-463.2 avoided.

**Assumptions carried forward:** the `Operator action:` line is additive to the
fence rather than a replacement for `Recommended fix:` — the two are distinct
(*what changes* vs *who is told to change it, and how it is dispatched*), and
collapsing them would lose the routed rationale.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Four additive edits, no renumbering, no deletions — so the `(→ dispatcher §N)`
back-references in all seven `passes/*.md` headers stay correct ([[CORE-386]]'s
constraint on this file).

**`claude/skills/ft-audit/SKILL.md` (+11 lines):**

1. **§3 fence** — one field appended after `Recommended fix:`:
   `- Operator action: tell the agent to … — one imperative sentence an operator can hand to an agent verbatim`
2. **§3 prose** — a paragraph under the fence separating the two lines by the
   question each answers (*what changes* vs *the instruction that dispatches it*),
   with a concrete example, the "pasting it into a fresh session is enough to
   start" test, and a forward pointer to the §6 rule. Placed **above** the
   existing severity/extra-lines paragraph so `performance`'s
   `Measured impact:` extension point keeps the last word on §3.
3. **§6 hard rule** — `**Every finding names an operator action.**`, inserted
   immediately before "Don't repeat the gates" and after "Write tickets, not
   fixes", so it sits inside the neighbourhood the PLAN line named. It states the
   disqualification, names the three vague-action shapes that trip it
   ("look into it" / "consider whether" / "monitor this"), asserts
   **detection filter, not a formatting rule** explicitly, and routes the
   disqualified item to §4 *Exploratory Insights* — which is what keeps the filter
   from silently deleting real observations.
4. **§7 Rationalizations** — two rows, each terminating in a real section
   reference per [[CORE-386]]'s pattern: the "too diffuse to write an action for"
   excuse (→ observations belong in §4) and the "obvious from the recommended fix"
   excuse (→ if restating is *not* trivial, that is the disqualification firing).
5. **§8 Red Flags** — two symptom bullets: an action reading
   "investigate/consider/review/keep an eye on" or naming no actor, and an action
   that is `Recommended fix:` reworded.

**Pass files — two targeted clauses, five untouched** (the operator-chosen
footprint). Both extend an *existing* bullet rather than adding one, which is why
neither file's placeholder count moves:

- `passes/structure.md` §"Specialist additions" — its `Finding-format note`
  already says `Location:` may be a pair/cluster; the clause carries that into the
  action ("must name **every** one of them"), with the reason: a structural fix
  applied to one copy of a diverged pair leaves the divergence in place while
  reporting it closed.
- `passes/security.md` §"Specialist additions" — its `Finding format` bullet gains
  the routing constraint: the action dispatches through the leaked-secret path or a
  normal ticket, never "apply the fix inline", which its own carve-out adjustment
  two bullets down already forbids for auth/validation/crypto/secret rotation.

**`claude/skills/ft-audit-repo/SKILL.md` (1 line rewritten)** — §3's trailing
sentence now leads with the deliberate omission before restating the
sweep-findings-are-not-tickets fact it already carried, and points dispatchability
at §6's milestone children. Rewriting the existing sentence rather than appending a
new one keeps the §3 block to one closing paragraph.

**Pattern survey:** every edit extends a shape already in the file — a fence field
beside `Recommended fix:`, a bold-lede bullet in §6, a three-column §7 row ending
in a section reference, a symptom bullet in §8, an existing pass-file bullet. No
new shape introduced, so nothing needed justifying.

**Refactors: none.** No duplication to collapse — the rule states itself once in
the dispatcher, and the two pass-file clauses say something the dispatcher cannot
(which sites, which route), not the same thing again.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — `N/A`: four markdown contract files, no rendered surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Verification receipt** — every Acceptance verify command, as run:

- `grep -q 'Operator action:' claude/skills/ft-audit/SKILL.md` → **0**
- `grep -c 'disqualified' claude/skills/ft-audit/SKILL.md` → **3** (≥2 required:
  §3 prose, §6 rule, §7 row)
- `grep -n 'Operator action' claude/skills/ft-audit/SKILL.md` → **0**; hits at
  lines 53 (§3 fence), 56 (§3 prose), 101 (§6 rule), 128 (§7 row), 164 + 167
  (§8 flags) — all four required sections covered
- `grep -q 'Operator action' claude/skills/ft-audit-repo/SKILL.md` → **0**
- `git diff --name-only` → **0**; exactly the four declared `touches:` paths, no
  fifth file
- Cross-reference resolution → **0** on each: §6 "Every finding names an operator
  action" (bold bullet present), §4 *Exploratory Insights* (closing section 2),
  §3 "Finding format" (heading), and both in-file targets the `security.md` clause
  leans on (leaked-secret path, carve-out adjustment)
- Placeholder parity → `_(forker:` **10** and `<…>` spans **7** on each edited pass
  file, identical to the `git stash`-ed baseline; and `git diff -U0 | grep '^+'`
  yields **zero** angle-bracket spans or `_(forker:` notes anywhere in the diff, so
  §1 step 3's scan is untouched and overlays inherit verbatim ([[CORE-386]])
- `wc -c claude/skills/ft-audit/SKILL.md` → **25,051** against the 33,000
  `claude/skills/*/SKILL.md` budget — 7,949 chars of headroom; +3,344 from 21,707
- `npm --prefix viz test -- --run` → **0** (28 files / 531 tests passed)
- `node --test tools/update-adopters.test.mjs` → **0** (51 pass / 0 fail)

Both suites were run rather than assumed even though nothing under `viz/src` or
`tools/` reads these files — the same standard [[CORE-386]] applied to the same
surface.

**Judgment criterion** — *the line reads as a dispatchable instruction rather than
a restatement of `Recommended fix:`*: **met.** The §3 prose separates them by the
question each answers and gives the paste-into-a-fresh-session test, the §7 second
row refutes the collapse-them excuse directly, and the §8 second bullet makes
"reworded fix line" an observable symptom. No command decides prose quality, which
is why the criterion carried `judgment` at Discovery.

**Frontend visual confirmation:** `N/A` — four markdown contract files, no
rendered surface.

**Structural quality assertions:** no duplication introduced (the rule lives once;
the two pass-file clauses add domain-specific content the dispatcher cannot),
no dead content, no public-surface growth on the fork side (zero new fillable
slots), and no stale code-facing documentation — `docs/MIGRATION.md`'s two
"finding format" mentions were re-read and both remain correct.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

`/ft-audit` findings now have to say who executes the fix. §3's format block gained
an `Operator action: tell the agent to …` field, and the load-bearing half — a
finding that cannot produce one is **disqualified** — landed as a §6 hard rule
beside "Targeted, not exhaustive" and "Don't repeat the gates", plus two §7
Rationalizations rows and two §8 Red Flags bullets, so it reads as a detection
filter rather than a formatting nicety. Disqualified items route to §4 *Exploratory
Insights* instead of being deleted, which is what keeps the filter from costing the
report its real observations.

**One drift item resolved, not worked around.** The PLAN line named
`SKILL.md` §"Failure modes" — **no such section exists**, in this file or anywhere
in the repo. Its failure-mode surface is the pair [[CORE-386]] built: §7
Rationalizations (the excuse) and §8 Red Flags (the symptom). Both were used, so
the routed intent is satisfied under the names the file actually carries.

**Two open decisions closed by operator ask, both narrowing scope:**

1. `/ft-audit-repo` **omits** the line, with the omission named in one clause. Its
   sweep findings are theme evidence feeding §4/§5, not dispatch units — the
   dispatch unit is the §6 milestone child, already a flowtron task line. A
   dispatchability filter at sweep level would disqualify exactly the diagnostic
   observations first contact exists to surface. The clause exists because its §3
   says *"Use the family finding format"*: an unexplained divergence would read as
   drift to the next person comparing the two blocks.
2. **Dispatcher + two targeted pass-file clauses**, not all seven. The rule reads
   identically in every domain, so it lives once in the dispatcher ([[CORE-389.2]]'s
   composition). Per-domain clauses went only where an existing bullet would
   otherwise produce a wrong-shaped action: `structure` (cluster locations → the
   action must name every site) and `security` (never "apply inline"). Five pass
   files untouched — `performance`'s "Measure, don't guess" and `docs`'s carve-out
   note already constrain theirs, and `general`/`backend`/`frontend` have no delta
   to state.

**Changed (4 files, +14/−3):**
- `claude/skills/ft-audit/SKILL.md` 167 → 178 lines, 21,707 → 25,051 chars — §3
  fence field + separating paragraph, §6 hard rule, 2 §7 rows, 2 §8 bullets.
- `claude/skills/ft-audit/passes/structure.md` — `Finding-format note` extended.
- `claude/skills/ft-audit/passes/security.md` — `Finding format` bullet extended.
- `claude/skills/ft-audit-repo/SKILL.md` — §3's closing sentence rewritten to lead
  with the named omission.

**Verification:** 11 receipts, all exit 0 — see Testing Notes. Notably
`wc -c` 25,051 against the 33,000 cap (7,949 headroom, `docs/CONTEXT-BUDGET.md`
§"Budgets"); placeholder counts byte-identical to a `git stash`-ed baseline and
zero angle-bracket spans or `_(forker:` notes anywhere in the diff, so §1 step 3's
scan cannot start tripping on filled forks; `npm --prefix viz test -- --run`
28/531 pass and `node --test tools/update-adopters.test.mjs` 51/0.

**`touches:` scope reconciliation:** `git diff --name-only` returns exactly the
four declared paths — no undeclared file, no declared-but-unedited path.

**Refactors:** none made, none needed. Every edit is additive at an existing
shape, and nothing was renumbered, so the `(→ dispatcher §N)` back-references in
all seven pass files stay correct — the constraint [[CORE-386]] recorded for this
exact file.

**Documentation verdict:** 18 AI-referenced entries swept, 18 no change.
`claude/skills/*/SKILL.md` sits outside the sweep set by
`.flowtron/tasknote/README.md` §"AI-referenced docs", so no entry owns the edited
files; `docs/MIGRATION.md`'s two "finding format" mentions were re-read anyway and
both stay correct — `:76` describes the format as dispatcher-owned (still true),
and `:154` names "change the finding format" as a *forker* divergence trigger,
which is unaffected by upstream editing the format that overlays inherit. The
`docs/CONTEXT-BUDGET.md` ledger's `ft-audit 21,707` row is now stale by design;
that doc states it is refreshed by `/ft-release` §7.1 at the cut, not per task.

**Maintainability effect:** the audit's output is now typed by what an operator can
do with it. Before, a finding could be a well-argued observation and still pass the
format — the report read as thorough while yielding nothing dispatchable. The filter
sits at detection, so it shapes what gets *looked for*, not just how it is written
up, and the §7/§8 pair gives the two ways it degrades (vague action, reworded fix)
names an outside reader can spot in a draft. Adopters get it on their next bump with
no fork step: stack-neutral, zero new fillable slots, so thin overlays inherit it
untouched and full-copy forks receive it through `/ft-update`.

**Archived:** 2026-09-10
