---
title: context-load-ledger
status: completed
tags: []
created: 2026-09-06
due:
related-tasks: [CORE-EPIC-535, CORE-535.1, CORE-EPIC-223, CORE-507]
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

# CORE-535.2 | context-load-ledger

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-535]]

## 🎯 Goal

Give the epic a ratchet: a per-file byte ledger with named budgets in `docs/CONTEXT-BUDGET.md`, enforced by a `wc -c` standing check in `/ft-release`, plus the four smaller context-hygiene fixes CORE-535.1 folded into this child.

## ✅ Acceptance

- [x] `docs/CONTEXT-BUDGET.md` exists and carries: (a) the framing that byte budgets are a *mechanism* under SPEC Core Principle #3, never a new principle (per [[CORE-382]]); (b) the measured per-file ledger for the always-loaded set, the lazy `SPEC/` modules, the lifecycle skill bodies and the adopter set, stamped with a measurement date + version; (c) a **Budgets** table — `SPEC.md` ≤50,000 · `SPEC/gates.md` ≤35,000 · lifecycle `claude/skills/*/SKILL.md` ≤30,000; (d) a self-liquidating **Known over budget** table naming the owning child task per violation; (e) an explicit note that the doc is lazy — read at release time, not loaded to run a task (the always-loaded shape [[CORE-194.1]] declined)
- [x] A sixth standing check in `claude/skills/ft-release/step-7.1-standing-checks.md` measures the budgeted surfaces with `wc -c`, compares against the doc's table (every number lives in the doc and is **not** restated in the check, per [[CORE-465]]), blocks on a violation with no open owner, treats an owned violation as informational, and refreshes the ledger's measured column + date in the same cut
- [x] `claude/skills/ft-release/SKILL.md` §7.1's dispatch paragraph names the new check in its enumeration of the fragment's contents
- [x] Both false-truncation sites in `claude/skills/ft-audit-context/SKILL.md` (the Pass (a) goal line and the `>40,000 chars` severity row) are restated as an adherence/attention budget; no claim survives that content past a byte cap silently fails to reach the assistant
- [x] `claude/AGENTS-snippet.md` carries a `.claude/rules/` note **outside** the fenced paste-block; the fence is byte-unchanged and `codex/` · `cursor/` · `grok/` snippets need no edit
- [x] `SPEC.md` §"📝 Phase 1: Discovery" archive-skim step and `templates/tasknote-template.md`'s matching checklist line carry a probe-by-default-above-~3-hits clause phrased as a **judgment prompt** — no new checklist box, no gate, skipping always correct ([[CORE-408.2]] shape)
- [x] `docs/CONTEXT-BUDGET.md` is registered in `README.md`'s doc index and repo-layout line, and in `AGENTS.md` §"Repo Layout" (the [[CORE-397]] miss [[CORE-489.3]] exists to prevent)
- [x] Phase 4 doc-drift sweep across all 18 `.flowtron/tasknote/README.md` §"AI-referenced docs" entries; the deliberate decision **not** to add `docs/CONTEXT-BUDGET.md` to that set is stated in the doc itself with its reason

## 🧩 Subtasks

- [x] Write `docs/CONTEXT-BUDGET.md` — framing, ledger, Budgets table, Known-over-budget table, sweep-set decision, pointer to the release check
- [x] Append the sixth standing check to `claude/skills/ft-release/step-7.1-standing-checks.md`; verify the `wc -c` command runs clean from the repo root
- [x] Add the new check to `claude/skills/ft-release/SKILL.md` §7.1's dispatch enumeration
- [x] Reword both `>40k` sites in `claude/skills/ft-audit-context/SKILL.md` Pass (a) as an adherence budget
- [x] Add the `.claude/rules/` note to `claude/AGENTS-snippet.md` outside the paste fence; confirm the fence bytes are untouched
- [x] Add the probe-by-default clause to `SPEC.md`'s archive-skim bullet + rationale ¶ and to `templates/tasknote-template.md`
- [x] Register the new doc in `README.md` (index + repo-layout line) and `AGENTS.md` §"Repo Layout"
- [x] Phase 3: re-measure every budgeted surface after the edits (the SPEC/template additions grow SPEC.md); markdown mental-pass on all edits
- [x] Phase 4: doc-drift sweep, flip the PLAN line to stub form nested under the parent, archive the tasknote

## 🔗 Related

- [[CORE-EPIC-535]] — parent epic (`context-load-diet`)
- [[CORE-535.1]] — predecessor: Discovery that measured the surfaces and filed this scope (`depends-on:`)
- [[CORE-535.3]] — follow-up: SPEC.md lazy split, measured against this ledger
- [[CORE-EPIC-223]] — precedent: the ~40k SPEC.md split that had no budget ratchet and regrew
- [[CORE-507]] — precedent: ft-release SKILL.md 77k→38k fragment extraction

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All five deliverables in the PLAN line target surfaces that exist at HEAD and carry the cited content (drift check §B). Nothing in the archive contradicts the approach: no size budget was ever proposed *or* declined ([[CORE-508]] — the "~40k" figure has always been an unwritten working number), so this is the first time the ratchet [[CORE-EPIC-223]] lacked gets written down.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A` (markdown contract + skill prose; no code module boundaries). The nearest boundary question — where the budget *numbers* live — is resolved in Discovery Notes §C under [[CORE-465]]: one home (the doc), the check derives. — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Byte census (measured 2026-09-06, HEAD @ v5.24.0; tokens ≈ chars/4)

Always-loaded to run one task (flowtron self-host):

| Surface | Bytes | ≈Tok |
|---|---|---|
| `SPEC.md` | 77,322 | ~19k |
| `claude/skills/ft-task/SKILL.md` | 33,944 | ~8.5k |
| `.flowtron/tasknote/README.md` | 6,540 | ~1.6k |
| `templates/tasknote-template.md` | 4,820 | ~1.2k |
| `.flowtron/PLAN.md` | 3,638 | ~0.9k |
| `AGENTS.md` (= `CLAUDE.md` symlink) | 6,560 | ~1.6k |

Lazy `SPEC/` modules (first gate / edge case — effectively per-task for the big two):
`gates.md` 51,812 · `procedures/ft-task.md` 29,559 · `tasknote-selection.md` 24,468 ·
`model.md` 18,681 · `blocked.md` 8,034 · `loop.md` 7,953 · `procedures/README.md` 6,122 ·
`epic.md` 6,062 · `starter.md` 2,408 · `versioning.md` 1,074.

Skill bodies (SKILL.md only), top: ft-release 37,274 · ft-task 33,944 ·
ft-epic-discovery 28,152 · ft-close-epic 26,926 · ft-goal-task 26,162 ·
ft-audit 21,707 · ft-micro-task 21,240 · ft-update 16,078 · ft-file-followup 16,014 ·
ft-refactor 13,673 · ft-starter-task 13,236 · ft-worktree-end 12,598 ·
ft-worktree-start 12,008 · ft-new-project 11,425 · ft-audit-context 9,157 ·
ft-flowtron 9,134 · ft-stats 8,857 · ft-audit-repo 8,166 · ft-spec 7,684.
With fragments: ft-task 60,975 · ft-release 80,372.

Adopter always-loaded: `claude/AGENTS-snippet.md` 14,369 · `templates/tasknote-README.md`
4,257 · `templates/PLAN.md` 2,724.

Confirms CORE-535.1 §A within rounding; `.flowtron/PLAN.md` grew 1,190 → 3,638 since that
measurement (this epic's own cohort lines).

### B. Drift check

- All five deliverable targets exist at HEAD and carry the cited content:
  `claude/skills/ft-release/step-7.1-standing-checks.md` (5 standing checks today);
  `claude/skills/ft-audit-context/SKILL.md` carries the false truncation claim at **two**
  sites, not one — the §1 goal line ("content past that cap silently doesn't reach the
  assistant") *and* the `>40,000` heuristic row. Both must be reworded.
- `docs/CONTEXT-BUDGET.md` does not exist and the string `CONTEXT-BUDGET` appears nowhere
  in the repo — genuinely new, no collision.
- `.claude/rules` appears **nowhere** in the repo (SPEC, SPEC/, claude/, docs/, templates/)
  — confirms CORE-535.1 §D's "does not yet use or name".
- Archive-skim canonical home is `SPEC.md:802` (checklist) + `SPEC.md:825` (rationale ¶).
  Nine other surfaces restate the recipe (`SPEC/procedures/ft-task.md`, four skills,
  `templates/tasknote-template.md`, `templates/tasknote-micro-template.md`,
  `docs/DOGFOOD.md`). Collapsing those restatements is **CORE-535.4's** scope, not this
  task's — so `.2` edits the canonical home + the two templates that materialize into every
  tasknote, and leaves the skill restatements to `.4`.
- `/ft-release` §7.1's dispatch ¶ (`claude/skills/ft-release/SKILL.md:275-286`) enumerates
  the fragment's checks by name. Adding a sixth standing check requires editing that
  enumeration too — an undeclared sync pair discovered here.
- No downstream-impact scan targets: the only open PLAN entries are this epic's own cohort.

### C. Constraint check against standing contracts

- **Core Principle #2 (Zero scripts)** — the budget check must be a `wc -c` line inside
  `/ft-release` §7.1 that the assistant reads and judges, not a validator, hook, or CI job.
  `docs/CONVENTIONS.md` §"Release automation" + §"Pre-commit hooks" both refuse the
  alternative shapes explicitly.
- **CORE-382** — context economy is a *mechanism* under Core Principle #3, never a new
  principle. The ledger doc states this in its own opening so it cannot be promoted later.
- **CORE-465 ("stop counting")** — a budget number restated in both the doc and the check
  would be a hand-maintained pair, the exact drift class that gate retired. Resolved by
  making the check *measure* and the assistant *compare against the doc's table*: one home
  for every number.
- **Diátaxis (`docs/CONVENTIONS.md`)** — `docs/CONTEXT-BUDGET.md` is a Reference-quadrant
  doc; the convention's table names one exemplar per quadrant and needs no edit.
- **Agent neutrality** — `.claude/rules/` is a Claude-Code-only feature. It must go in
  `claude/AGENTS-snippet.md` prose **outside** the fenced paste-block: the fence is the
  single agent-neutral block that `codex/`, `cursor/`, and `grok/` snippets all point at
  rather than copy, so Claude-only content inside it would leak into three neutral
  surfaces. Outside the fence, no sibling edit is needed.

### D. Environment note (affects the check's shape)

This session's `grep` / `find` are shell-function wrappers (ugrep / bfs), and a
`grep | awk | while read` pipeline lost `PATH` intermittently under them. A derived-budget
pipeline (parse the ledger table, loop, emit only violations) worked once and then failed
reproducibly — a check that cannot be verified in the session that writes it is a
liability. Chose the plain measurement form instead:
`wc -c SPEC.md SPEC/gates.md claude/skills/*/SKILL.md | sort -rn`, verified working, with
the comparison done by the assistant against the doc's table. This also matches the
existing README task-counter check's shape (measure → compare → update) rather than
inventing a new one.

The `claude/skills/*/SKILL.md` glob is safe despite the fragment's "Glob-free by design"
note: that note guards *unmatched* globs (zsh aborts on `no matches found`), and this glob
always matches 19 shipped skills inside the repo.

### E. Archive skim (probe, 709 notes in `archive/core/`)

Grepping the five target paths returned ~7 · ~46 · **~350** · 0 · 4 hits — the
`AGENTS-snippet` grep alone would have been ~350 tasknote reads. Delegated to a read-only
probe (`templates/subagent-probe-template.md` shape); only its distilled return is recorded
here. This is itself the evidence for deliverable 5.

- **[[CORE-508]]** — *"No documented byte cap exists. The '~40k load threshold' is
  CORE-507's own working figure, not a SPEC contract."* No size budget has ever been
  proposed or declined; this task writes the first one.
- **[[CORE-EPIC-223]]** cohort verified `wc -c SPEC.md` = 25,789 in Phase 3 but wrote the
  number into no contract — the missing ratchet, confirmed at source.
- **[[CORE-194.1]]** declined a `CONTEXT.md` mega-doc because it *"competes with SPEC +
  SPEC modules + currently-loaded SKILL for context budget"*. **A new always-loaded doc is
  the declined shape; a lazy one is not** — so `docs/CONTEXT-BUDGET.md` must say plainly
  that it is read at release time, never loaded to run a task.
- **[[CORE-285]]** — `/ft-release` Step 2.5's context-budget self-assessment is the only
  budget-shaped mechanism that shipped, and it is a judgment prompt, not a measurement.
  The new check complements it rather than duplicating it.
- **[[CORE-186]]** (2026-05-24) originated the `>40,000` threshold when it created
  `ft-audit-context`; `git log -S "40,000"` returns exactly one commit and no source was
  ever cited for the truncation claim.
- **[[CORE-491]]** — sweep-set membership means *swept for drift*, not *loaded at cold
  start*; **[[CORE-492]]** — every added entry is walked at *every* Phase 4 closure, and
  that volume is why `SPEC/*.md` and skill bodies are excluded.
- **[[CORE-492]]** also declined a release-time citation guard: *"Citation rot and claim
  falsification are different classes; the proposed guard covers the one with zero
  instances."* **[[CORE-487]]** sets the bar a new §7.1 check must clear — it must guard a
  **derivable** roster, not a prose paraphrase. A `wc -c` budget is derivable, so it clears
  cleanly; **[[CORE-411]]** (the README task-counter check) is the positive precedent and
  the shape copied here: measure → compare → update in the same cut.
- **[[CORE-515]]** is the precedent for a Claude-Code-specific section living *outside* the
  paste fence; **[[CORE-510]]**'s live KEEP IN SYNC comment forbids new detail *inside* it;
  **[[CORE-465]]** / CORE-510 confirm prose in this file gates nothing, so no codex /
  cursor / grok mirror edit is required. `claude/AGENTS-snippet.md` is listed in
  `docs/AGENT-NEUTRALITY.md` as wiring-layer taking no table row, so a Claude-only note
  confined to it needs no ledger row either.
- **[[CORE-408.2]]** introduced the probe clause and chose a *conditional clause on an
  existing bullet* over a mandatory box: *"no mandatory box for a conditional action …
  the probe clause is a judgment prompt — skipping it is always correct."* **[[CORE-445.1]]**
  added the archive-skim bullet's own *"no query engine"* guard. Both constrain deliverable
  5 to a judgment prompt with a soft "~3" — never a threshold that fires.
- **[[CORE-397]]** created `SPEC/procedures/` without registering it in `AGENTS.md`
  §"Repo Layout"; **[[CORE-489.3]]** exists to clean that up. Registering the new doc in
  `README.md` + `AGENTS.md` is therefore an Acceptance criterion, not an afterthought.

### F. Clarifications resolved (AskUserQuestion, 2026-09-06)

| Question | Decision |
|---|---|
| Lifecycle-skill cap | **30,000 chars**, scoped to the tasknote-lifecycle family. Excludes `ft-release` (37,274 — flowtron-self-only, never loaded in an adopter task run, and already post-trim from CORE-507/508) and the audit family. Only `ft-task` (33,944) is over today, and CORE-535.4 already owns that fix; 25,000 was declined because it would strand `ft-close-epic` (26,926) and `ft-goal-task` (26,162) over budget with no child owning them, and 35,000 would flag nothing. |
| Standing-check posture | **Blocking, with self-liquidating grandfather rows.** A surface over budget *with* a named open owner is informational; over budget with *no* owner blocks the cut. Each child deletes its own row at closure, so the exemption expires without a follow-up flip — the failure mode of "advisory now, blocking later". |

### G. Assumptions taken without asking

- **`docs/CONTEXT-BUDGET.md` is not added to §"AI-referenced docs".** [[CORE-491]]'s
  criterion is "a lazy doc that drifts belongs", but [[CORE-492]]'s volume rule walks every
  entry at every closure, and this doc's numbers are stale on nearly every commit. They have
  a *better* owner — the §7.1 check refreshes them in the same cut that reads them. Adding
  the doc would buy a permanent "no change (numbers owned by /ft-release)" line at every
  Phase 4. The decision and its reason are stated in the doc so the next reader does not
  re-litigate it.
- **`ft-audit-context`'s 30k / 40k severity bands keep their numbers.** They govern an
  *adopter's* `CLAUDE.md` / `AGENTS.md`, a different surface from flowtron's own
  SPEC/skills, so flowtron's 50k/35k/30k do not transfer. Only the *claim* is wrong, and the
  PLAN line asks for exactly that: restate the wording as an adherence budget. Re-deriving
  adopter band boundaries would be scope the epic did not file.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A` (markdown contract + skill prose; no executable surface. The nearest thing to a test is the new standing check, and it was executed against the post-edit tree — see Testing Notes)

**Implementation Notes:**

Ten files: 2 new, 8 modified. 96 insertions, 7 deletions.

**1. `docs/CONTEXT-BUDGET.md` (new, 8,132 chars).** Opens by binding itself to Core
Principle #3 as a *mechanism* ([[CORE-382]]) and by declaring itself lazy — read at release
time, never loaded to run a task — which is what separates it from the always-loaded
`CONTEXT.md` shape [[CORE-194.1]] declined. Sections: why byte budgets (the
[[CORE-EPIC-223]] regrowth, with the ratchet's absence named as the cause), Budgets,
Known over budget, Ledger, How this is enforced, and why it is deliberately off the
doc-drift sweep list.

**Budgets as shipped:**

| Surface | Budget |
|---|---|
| `SPEC.md` | 50,000 |
| `SPEC/gates.md` | 35,000 |
| `claude/skills/*/SKILL.md` | 30,000 |
| `claude/skills/ft-release/SKILL.md` | 40,000 |

**Deviation from the approved option, stated plainly.** The AskUserQuestion option said the
30,000 cap "excludes flowtron-self `ft-release` (37,274) and the audit family". Shipped
instead: the glob row covers **every** shipped skill body, with `ft-release` given its own
more-specific 40,000 row and a stated precedence rule ("most specific row wins"). This is
strictly *more* coverage than approved and changes no verdict today — the audit family
(21,707 / 10,199 / 8,166) passes 30,000 comfortably, and `ft-release` at 37,369 passes
40,000 with ~2.6k headroom. The reason for budgeting rather than exempting: an exemption
list is a hand-maintained roster, the drift class [[CORE-465]] retired, and it would leave
the single largest skill body permanently unratcheted. 40,000 is set just above the
[[CORE-507]] post-trim floor, so `ft-release` still cannot regrow freely.

**2. Standing check appended to `claude/skills/ft-release/step-7.1-standing-checks.md`**
(+48 lines, sixth check). Shape copied from the [[CORE-411]] README task-counter check —
measure, compare, update in the same cut — rather than inventing one. One command:
`wc -c SPEC.md SPEC/gates.md claude/skills/*/SKILL.md | sort -rn`. Three verdicts: over
budget **with** an open owner → informational; over budget with **no** owner (or an owner
whose PLAN line has closed) → blocking, fixed by trimming *or* by deliberately raising the
budget in this cut; under → nothing. Closes with the ledger-refresh obligation, the
[[CORE-487]] derivability justification, and a note on why this glob is safe despite the
fragment's own §"Glob-free by design" warning (that warning guards *unmatched* globs; this
one always matches).

**Every budget number lives in the doc and is restated nowhere in the check** — the check
measures, the doc decides. Direct application of [[CORE-465]]'s "stop counting, start
deriving": a number duplicated into the gate drifts from the number written in the doc, and
the gate ends up guarding its own stale copy.

**3. `claude/skills/ft-release/SKILL.md` §7.1 dispatch** — the paragraph enumerating the
fragment's contents now names the sixth check. Undeclared sync pair found in Discovery;
without this edit the check would ship unlisted and be skippable.

**4. `claude/skills/ft-audit-context/SKILL.md` Pass (a)** — both false-truncation sites
fixed. The goal line is replaced with an *adherence budget* framing plus an explicit
retraction ("An earlier version of this pass claimed content past ~40,000 chars 'silently
doesn't reach the assistant'; that claim was never sourced and is wrong"), a one-line
statement of the real behavior, and a pointer to `docs/CONTEXT-BUDGET.md` that also warns
*not* to carry flowtron's numbers into an adopter audit. The `>40,000` severity row keeps
its band but loses the false mechanism: the file is still read in full; what degrades is
adherence for directives deep in a long file. Band boundaries unchanged per Discovery §G.

**5. `claude/AGENTS-snippet.md`** — new `### Keeping AGENTS.md small — .claude/rules/`
section, a sibling of §"Check that Claude Code loads it" and **outside** the paste fence
([[CORE-515]] precedent; [[CORE-510]]'s live KEEP IN SYNC comment forbids new detail
inside it). Covers what path-scoped rules are, a worked `paths:` example, the parallel to
flowtron's own lazy `SPEC/` module frontmatter, and two limits: never move the paste-block
(it is contract and always relevant), and `.claude/rules/` is Claude-Code-only so anything
a non-Claude agent must obey stays in `AGENTS.md`. The example fence is tagged ```` ```text ````
rather than ```` ```markdown ```` so the file still contains exactly one ```` ```markdown ````
fence — `/ft-audit-context` §2 locates the paste-block as "the fenced markdown block", and a
second one would have made that ambiguous. Paste-block verified byte-identical (5,612 before
and after). No codex / cursor / grok edit needed: those three point at this block rather than
copying it, and every automated check that reads this file targets the `ln -s` wiring block
([[CORE-510]] / [[CORE-465]]).

**6. Probe-by-default archive skim** — `SPEC.md` §"📝 Phase 1: Discovery" bullet gains one
clause ("when the grep returns more than a handful of notes (~3 is a fair line), prefer
handing the reading to a probe … rather than pulling every hit into this window"), and the
rationale paragraph below gains a short block explaining why the skim is where the read
step's probe clause bites hardest — a path grep's cost scales with the project's age, not
the task's size. Explicitly *not* a gate: "The `~3` is a judgment line, not a threshold that
fires — nothing counts hits, nothing gates on the number, and reading four notes directly is
always a correct call." This is the [[CORE-408.2]] shape (conditional clause on an existing
bullet, no new box) held deliberately, per the probe's constraint list.
`templates/tasknote-template.md` gets the same clause in its shorter register so every
scaffolded tasknote carries it. The **nine other surfaces** that restate the skim recipe
(`SPEC/procedures/ft-task.md`, four skills, the micro template, `docs/DOGFOOD.md`) are
left alone — collapsing those restatements is [[CORE-535.4]]'s filed scope, and duplicating
the clause into them now would be work `.4` immediately undoes.

**7. Registration** — `README.md` doc index (after `docs/WORKTREES.md`) + its repo-layout
line, and `AGENTS.md` §"Repo Layout". The [[CORE-397]] miss that [[CORE-489.3]] exists to
clean up.

**Refactors deferred:** none taken, none needed — every edit is additive except the two
`ft-audit-context` rewrites, which are the deliverable.

**Dogfooding note.** Deliverable 6 was written after this task's own Phase 1 hit the
problem: the `AGENTS-snippet` archive grep returned ~350 hits, and the skim ran as a probe.
The clause is a description of what worked, not a guess.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A`: no frontend surface touched; `viz/` is unchanged

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

No `viz/` or `tools/` code changed, so `npm --prefix viz test` / `node --test
tools/update-adopters.test.mjs` are `N/A`. The verification that matters here is running the
gate this task ships, against the tree this task produced.

**1. The new standing check, executed post-edit.**

```
$ wc -c SPEC.md SPEC/gates.md claude/skills/*/SKILL.md | sort -rn
   78119 SPEC.md
   51812 SPEC/gates.md
   37369 claude/skills/ft-release/SKILL.md
   33944 claude/skills/ft-task/SKILL.md
   28152 claude/skills/ft-epic-discovery/SKILL.md
   ... (16 more, all < 30,000; smallest ft-spec 7,684)
```

Verdict against `docs/CONTEXT-BUDGET.md` §"Budgets":

| Surface | Measured | Budget | Verdict |
|---|---|---|---|
| `SPEC.md` | 78,119 | 50,000 | over — owner [[CORE-535.3]], PLAN line `- [ ]` → **informational** |
| `SPEC/gates.md` | 51,812 | 35,000 | over — owner [[CORE-535.5]], PLAN line `- [ ]` → **informational** |
| `claude/skills/ft-task/SKILL.md` | 33,944 | 30,000 | over — owner [[CORE-535.4]], PLAN line `- [ ]` → **informational** |
| `claude/skills/ft-release/SKILL.md` | 37,369 | 40,000 | under (2,631 headroom) |
| all 17 other `SKILL.md` | ≤ 28,152 | 30,000 | under |

All three owner PLAN lines confirmed unchecked by re-reading `.flowtron/PLAN.md:17-19`.
**No unowned violation → the check does not block.** Both branches of the rule were
therefore exercised: the informational branch by three real surfaces, the blocking branch by
its absence on the other eighteen.

**2. Ledger refreshed, as the check itself demands.** This task's own edits moved four
measured surfaces, so the ledger was re-measured and updated rather than shipped stale on
day one: `SPEC.md` 77,322 → 78,119 · `ft-release` 37,274 → 37,369 · `ft-audit-context`
9,157 → 10,199 · `AGENTS.md` 6,560 → 6,628 · `tasknote-template.md` 4,820 → 4,935 ·
`AGENTS-snippet.md` 14,369 → 15,870 · `ft-release` dir total 80,372 → 83,273. Two prose
sentences citing the *historical* 77,322 were re-anchored ("measured at [[CORE-535.1]]" /
"had passed 77,000") so a narrative fact does not masquerade as a live measurement.

**3. Markdown + link validation** across all ten touched files: fence balance (even count in
every file), no CRLF, final newline present, no trailing whitespace, and every relative
`.md` link resolved on disk. Two dead links reported — `../PLAN.md` in `SPEC.md` and in
`templates/tasknote-template.md` — were confirmed **pre-existing and unchanged at HEAD**
(`git show HEAD:<f> | grep -c` = 1, same as now). The template's is correct by design: it
resolves once the file is materialized into `.flowtron/tasknote/`. Not touched, per the
surgical-changes rule.

**4. Paste-fence integrity.** `awk '/^```markdown$/,/^```$/' claude/AGENTS-snippet.md | wc -c`
= **5,612 at HEAD and 5,612 now** — the adopter paste-block is byte-identical, and the file
still holds exactly one ```` ```markdown ```` fence.

**5. Quality assertions.** No avoidable duplication — every budget number has exactly one
home (the doc), and the check reads rather than restates it. No dead code. Public-surface
growth is two items, both required by Acceptance: one doc and one standing check. No stale
code-facing documentation: the new doc is registered in `README.md` (index + layout line)
and `AGENTS.md` §"Repo Layout", and the §7.1 dispatch enumeration names the new check.

**Environment caveat worth recording.** This session's `grep` / `find` are shell-function
wrappers (ugrep / bfs) and a `grep | awk | while read` pipeline lost `PATH` under them
intermittently. An earlier, cleverer draft of the check *derived* budgets by parsing the
doc's table through such a pipeline; it worked once and then failed reproducibly. That is
the direct reason the shipped check is a single `wc -c` with the comparison done by the
assistant — a release gate that cannot be verified in the session that writes it is worse
than a simpler one that can.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Gave `CORE-EPIC-535` the ratchet its predecessor lacked. `docs/CONTEXT-BUDGET.md` (new,
8,132 chars) records per-file byte budgets for the surfaces an agent loads to run one task —
`SPEC.md` ≤50,000 · `SPEC/gates.md` ≤35,000 · `claude/skills/*/SKILL.md` ≤30,000 ·
`claude/skills/ft-release/SKILL.md` ≤40,000 — plus the measured ledger behind them and a
self-liquidating "known over budget" table naming the child task that owns each of the three
current violations. A sixth standing check in `claude/skills/ft-release/step-7.1-standing-checks.md`
(+48 lines) measures with one `wc -c`, blocks on an unowned violation, treats an owned one as
informational, and refreshes the ledger in the same cut; `ft-release` SKILL.md §7.1's dispatch
enumeration names it. This closes the gap [[CORE-EPIC-223]] left: it verified `wc -c SPEC.md`
= 25,789 in Phase 3, wrote the number into no contract, and `SPEC.md` regrew to 78,119.

Four smaller fixes folded in by `.1`: both false-truncation sites in `ft-audit-context`
(originated by [[CORE-186]] in 2026-05, never sourced, never touched since) restated as an
adherence budget with an explicit retraction; a `.claude/rules/` path-scoped-rules section in
`claude/AGENTS-snippet.md` outside the paste fence; and a probe-by-default clause on the
Phase 1 archive skim in `SPEC.md` + `templates/tasknote-template.md`, phrased as a judgment
prompt per [[CORE-408.2]] — no new box, no gate, "reading four notes directly is always a
correct call". `docs/CONTEXT-BUDGET.md` registered in `README.md` and `AGENTS.md`.

**Verification.** The shipped check run against the post-edit tree: three surfaces over
budget, all three with owner PLAN lines confirmed `- [ ]` → informational, no unowned
violation, check does not block. `ft-release` 37,369 / 40,000 and all seventeen other skill
bodies under 30,000. Ledger refreshed for the seven surfaces this task's own edits moved.
Markdown/link validation clean across all ten touched files (two flagged `../PLAN.md` links
confirmed pre-existing and unchanged at HEAD). Adopter paste-block byte-identical, 5,612
before and after.

**Refactors:** none made, none deferred — every edit is additive except the two
`ft-audit-context` rewrites, which are the deliverable.

**One deviation, stated:** the approved cap option described excluding `ft-release` and the
audit family from the 30,000 cap; shipped instead with the glob covering every skill body
plus a more-specific 40,000 row for `ft-release`. Strictly more coverage, no verdict changed,
and it avoids the hand-maintained exemption roster [[CORE-465]] retired.

**Maintainability effect.** Three numbers that governed flowtron's context cost by oral
tradition now have one written home and a gate that reads it. The next split cannot silently
regrow: a surface that passes its budget today and fails it in six months blocks a release
cut unless someone deliberately raises the number and says why, in that cut.

**Doc-drift sweep** across all 18 `.flowtron/tasknote/README.md` §"AI-referenced docs"
entries:

- `README.md` — **updated**: doc-index entry after `docs/WORKTREES.md` + repo-layout line
- `AGENTS.md` — **updated**: §"Repo Layout" `docs/` bullet names `CONTEXT-BUDGET.md`
- `SPEC.md` — **updated**: archive-skim probe clause + rationale block
- `docs/MIGRATION.md` — no change; adoption and bump procedures are untouched, and the
  `.claude/rules/` note is optional guidance in the snippet, not an adoption step
- `claude/AGENTS-snippet.md` — **updated**: `.claude/rules/` section outside the fence
- `codex/AGENTS-snippet.md` · `cursor/AGENTS-snippet.md` · `grok/AGENTS-snippet.md` —
  no change; all three point at the Claude paste-block rather than copying it, and every
  automated check that reads these files targets the `ln -s` wiring block ([[CORE-510]])
- `docs/CONVENTIONS.md` — no change; its "spends its context budget on the task" line
  (§MCP servers) is rhetorical and still accurate, and the new check's zero-script posture
  matches §"Release automation" + §"Pre-commit hooks" rather than contradicting them
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change. `.claude/rules/` is Claude-Code-specific, but the
  note is confined to `claude/AGENTS-snippet.md`, which that ledger already classifies as
  wiring-layer taking no table row. Considered and declined under its own rule.
- `docs/PLATFORMS.md` — no change; no new skill, no new platform surface, installed-surface
  policy untouched
- `claude/CAPABILITIES.md` — **considered and declined.** `.claude/rules/` would look like a
  §"The triggers" row, but that doc's stated scope is *operator-facing triggers that change
  how a flowtron skill runs* (reasoning depth, gate-skipping, model selection, context
  freshness, structured asks). Path-scoped rules are project configuration, not a run-time
  trigger; adding a row would widen the doc's declared remit. `last-verified` stamp
  (`v5.24.0 · 2026-08-30`) not bumped — no version bump in this task.
- `docs/AGENT-COMPAT.md` — no change
- `docs/EXTERNAL-AGENTS.md` — no change; nothing here touches delegation, handoff, or the
  unattended posture
- `docs/WORKTREES.md` — no change
- `docs/VISION.md` — no change; the check is a markdown recipe read by the assistant, not a
  validator, so §"What we won't accept" is not engaged

**Archived:** 2026-09-06
