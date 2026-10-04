---
title: audit-decay-pass
status: completed
tags: []
created: 2026-09-22
due:
related-tasks: [CORE-659, CORE-660]
touches:
  - claude/skills/ft-audit/passes/context.md
  - claude/skills/ft-audit/SKILL.md
  - claude/commands/ft-audit.md
  - docs/MIGRATION.md
---

# CORE-661 | audit-decay-pass

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Add a standing decay pass to `/ft-audit`'s existing `passes/context.md` that
walks the SPEC + gate modules and proposes one clause to drop or demote per
run, naming the failure mode that clause guards so the operator can test
whether current models still exhibit it.

## ✅ Acceptance

- [x] `passes/context.md` carries a sixth pass named "Contract decay" under a `## The 6 passes` heading — `grep -q '^## The 6 passes (→ dispatcher §2)$' claude/skills/ft-audit/passes/context.md && grep -q '^6\. \*\*Contract decay\*\*' claude/skills/ft-audit/passes/context.md`
- [x] The dispatcher no longer asserts a fixed five for every domain — `grep -q '^## 2\. The passes (in order)$' claude/skills/ft-audit/SKILL.md && ! grep -q "pass file's five passes" claude/skills/ft-audit/SKILL.md`
- [x] No live surface still claims every domain walks exactly 5 passes — `grep -rn '5 passes\|five passes\|5-passes\|5 domain-specific\|Five findings per pass' claude/commands/ft-audit.md docs/MIGRATION.md claude/skills/ft-audit/SKILL.md claude/skills/ft-audit/passes/context.md` returns only the two verified forker-scoped sites (`SKILL.md:22`, `SKILL.md:136`) and nothing else. **Widened after external-review finding #4** — the original pattern missed the wrapper's `5 domain-specific passes` frontmatter and §6's `Five findings per pass`
- [x] `docs/MIGRATION.md`'s `context` row enumerates all six pass names — `grep -q 'Tooling & orphans · Contract decay' docs/MIGRATION.md`
- [x] Pass 6 is gated to flowtron-self mode and skipped elsewhere, reusing the existing three-way flowtron-mode resolution — `judgment`: no command decides mode-gating prose; read the pass text against the adopter/no-flowtron branches already in §"Scope & rubric hints"
- [x] No forker placeholder introduced, so §1 step 3's bootstrap scan still no-ops on this file — `! grep -q '_(forker:' claude/skills/ft-audit/passes/context.md` and no new `<…>` span inside §"Scope & rubric hints"
- [x] Pass 6 carries an explicit one-finding cap and an explicit exclusion from the trivial-fix carve-out — `grep -q 'one finding per run' claude/skills/ft-audit/passes/context.md && grep -q 'never the trivial-fix carve-out' claude/skills/ft-audit/passes/context.md`
- [x] Every `§"…"` citation added or touched still resolves (the `/ft-release` §7.1 Pair Q / CI `drift` idiom) — `judgment` + targeted grep per citation; there is no standalone local Pair Q runner
- [x] `claude/skills/ft-audit/SKILL.md` stays under its 33,000-char `docs/CONTEXT-BUDGET.md` cap — `wc -c claude/skills/ft-audit/SKILL.md`
- [x] Repo validation unaffected — `node --check tools/update-adopters.mjs` and `npm --prefix viz run lint` (markdown-only diff; confirms nothing else broke)

## 🧩 Subtasks

- [x] Extend `passes/context.md` §"Scope & rubric hints" — add `SPEC.md` + `SPEC/*.md` to the default scope **in flowtron-self mode only**, hanging off the existing flowtron-mode resolution; state the adopter/no-flowtron skip
- [x] Rename its pass-list heading to `## The 6 passes` and write pass 6 "Contract decay": provenance-based selection, decay-window proposal, one finding per run
- [x] Add a `Contract decay` row to §"Severity guide"
- [x] Extend §"Specialist additions": the one-per-run cap, the carve-out exclusion, the extra finding-format lines (guarded failure mode / stranded citers / proposed window), and the hard rules distilled from CORE-465 / CORE-539 / CORE-664 / CORE-468 / CORE-386 / VISION mirrors / archive write-once
- [x] Generalise dispatcher §2 in `claude/skills/ft-audit/SKILL.md` (heading + "five passes" sentence); leave §0:22 and §7:136 alone — both are forker-scoped and stay accurate
- [x] Update `claude/commands/ft-audit.md:5` — "the domain's 5 passes" → "the domain's passes"
- [x] Update `docs/MIGRATION.md:88,90,101` — the prose, the table header, and the `context` row's pass enumeration
- [x] Run the Acceptance verify commands and record the receipt

## 🔗 Related

- [[CORE-659]] — opened the one-off decay window this pass generalises (predecessor; `related-decision:`)
- [[CORE-660]] — parked trim task; its provenance-axis note supplies this pass's selection rule (`related-decision:`)
- [[CORE-387]] — prior "the 5-passes count is fixed by the dispatcher contract" statement, surfaced and overridden here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md line 18 is current, unchecked, under `## Medium`, not archived. `git status --porcelain` clean at start; no `.flowtron/tasknote/CORE-661.md`, no `.flowtron/sidequest/CORE-661.md`, no `archive/core/CORE-661.md`. The task as filed is still the right work — its motivating finding (`docs/HARNESS-SURVEY.md` verdict line) is one day old and its two sibling rows are live, one of them parked on the exact failure this pass has to route around.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

### Origin and intent

The PLAN line traces to `docs/HARNESS-SURVEY.md` §"2026-09-21 — first pass",
whose verdict line is explicit: *"lifecycle core well-balanced … meta layer
shows accretion because self-hosting has no subtractive force. → CORE-661
(decay pass)."* The rubric the pass should encode is already written in that
doc's **Method** paragraph — rank overkill by *"is the clause still
load-bearing for current models"*, citing Anthropic's harness lesson that
every component encodes an assumption about what the model can't do.

So this pass is the standing, per-run form of the survey's one-off "Overkill"
ranking. Its subject is flowtron's **meta layer**, not an adopter's code.

### Existing structure of `passes/context.md`

- 50 lines / 8,031 chars. Sections: Scope & rubric hints · The 5 passes ·
  Severity guide · Specialist additions.
- It already resolves a **flowtron-mode** three-way branch (adopter /
  flowtron-self / no-flowtron) once before pass 1, and already uses
  "skipped in no-flowtron mode" as the shape for a mode-conditional pass
  (passes 2 and 3). A mode-conditional decay pass extends that established
  pattern rather than inventing one.
- It is the one pass file that ships **unforked** (`context` has no forker
  placeholders and runs from `.flowtron/core/`), so the §0 forker checklist
  and `scaffold-bootstrap.md` placeholder detection do not apply to it.

### Constraint 1 — the "5 passes" count is coupled across six files

`grep` for `5 passes` / `five passes` outside the pass files:

- `claude/skills/ft-audit/SKILL.md:43` — `## 2. The 5 passes (in order)`
- `claude/skills/ft-audit/SKILL.md:45` — "Run the pass file's **five** passes"
- `claude/skills/ft-audit/SKILL.md:22` — §0 checklist cites §"The 5 passes"
- `claude/skills/ft-audit/SKILL.md:136` — rationalization row prose
- `claude/commands/ft-audit.md:5` — "walks the domain's 5 passes"
- `claude/skills/ft-audit/scaffold-bootstrap.md:30` — cites §"The 5 passes"
- `docs/MIGRATION.md:90` — table column header `| 5 passes |`
- `templates/audit-overlay-template.md:43` — cites §"The 5 passes"
- `claude/skills/ft-release/SKILL.md:95,265` — both refer specifically to the
  **`docs`** domain's 5 passes; they stay true and need no edit.

All eight pass files head their list `## The 5 passes (→ dispatcher §2)`.
Making `context` a six-pass domain means generalising the dispatcher's count
(it currently asserts five for every domain) while every other pass file keeps
its own five. The §0 / bootstrap / overlay citations govern **forked** pass
files only, and `context.md` is never forked — so those three references stay
accurate for the surfaces they bind.

No CI check and no `/ft-release` §7.1 mirror pair binds the pass count
(`grep 'passes/'` over `claude/skills/ft-release/`, `docs/CONVENTIONS.md`,
`.github/workflows/ci.yml` returns only the `docs`-domain subroutine line).

### Constraint 2 — SPEC is outside the context domain's declared scope

`passes/context.md` fixes its default scope to `CLAUDE.md`, `AGENTS.md`, and a
one-level listing of `.claude/commands/` + `.claude/skills/`. Its hard rules
add: *"`.flowtron/core/` itself — the submodule is the reference, not the
audited surface."*

A pass that walks `SPEC.md` + `SPEC/*.md` therefore needs a scope extension,
and the extension is only coherent in **flowtron-self mode**: in an adopter
checkout those files live in the pinned `.flowtron/core/` submodule, which the
adopter cannot meaningfully edit (they bump the pin instead), so a
drop-this-clause finding there is unactionable — and §6's *"Every finding names
an operator action"* disqualification filter would reject it on those grounds.

### Constraint 3 — must stay prose, not a validator

`docs/VISION.md` §"What we won't accept" sets the standing remedy for drift as
*"a sharper SPEC clause, not a validator"*, and rejects scan scripts and
health-check linters. A decay pass is the inverse force (clause **removal**)
but must land the same way: a report with one proposed clause per run, graded
by the operator. No tooling, no score, no gate. `SPEC/gate-discipline.md` is
the in-repo precedent for that shape — it states plainly *"This is prose, not a
gate. Nothing here is ticked, scored, or verified by tooling."*

### Supporting: SPEC/ has no other periodic review

`.flowtron/tasknote/README.md` §"AI-referenced docs" excludes `SPEC/*.md` and
`claude/skills/*/SKILL.md` from the Phase 4 doc-drift sweep on **volume**
grounds (~6,200 lines vs a ~4,100-line sweep set). So the lazy SPEC modules —
where the survey found the accretion — currently get no recurring review at
all. That is the gap this pass fills, and it argues for the pass's target being
`SPEC.md` + `SPEC/` specifically.

Current sizes: `SPEC.md` 46,916 · `SPEC/` total ~209,000. The gate cluster the
survey called out (`gates.md` 20,093 + `gate-postures.md` 21,592 +
`gate-discipline.md` 16,077 + `cue-vocabulary.md` 15,135) is 72,897 chars —
matching the survey's "~72KB of gate prose for two banners".

### The CORE-659/660/661 trio (archive probe)

CORE-661 is the third of three rows from the same survey finding:

- **CORE-659** (completed 2026-09-22) *opened* a decay window empirically:
  deleted the two live "read `gate-discipline.md` before you skip a gate"
  triggers and recorded window-start SHA `f8c44275`, keeping the heading, the
  descriptive paragraph, and `gate-discipline.md` itself — *"removes the two
  active nudges at the moment of a skip decision, not the module's
  discoverability."*
- **CORE-660** is **parked** (`status: blocked`, `park-reason: drift`): the
  window has observed one archived tasknote — CORE-659's own — so *"its one
  sample is the experiment's own control."*

**The regression this task must not repeat.** A pass whose *selection* depends
on having measured a window produces nothing per run, because flowtron archives
roughly one note per relevant window. CORE-659's own Learnings pre-empt the
generalisation: the SHA-window mechanism is *"task-specific to this
CORE-659/660/661 trio, not a generalizable workflow rule."*

**Resolution — separate selection from proposal.** CORE-660's tasknote records
the axis that needs no window: **provenance**. Of `gate-discipline.md`'s 22
Rationalization rows / 24 Red Flag bullets, only a minority cite a concrete
motivating incident; the rest restate `gates.md` / `gate-postures.md` clauses in
excuse form. *"That provenance split is the natural trim axis and needs no
window."* This task's own PLAN wording — *"naming the failure mode it guards"* —
**is** the provenance test. So: select by provenance (can the clause name a
concrete motivating incident?), propose a decay window (CORE-659's shape). The
operator's answers pick the second half; the first half is what makes the pass
able to yield a finding on its very first run.

### Prior subtraction precedent — what gets accepted and refused

- **Accepted drop-reason: made vacuous by construction.** CORE-465 retired
  `/ft-release` §7.1 checks "as vacuous — with the consumers deriving, the
  counts cannot disagree." Not "feels bloated".
- **Refused drop-reason: deleting real information to move a number.** CORE-539
  was offered shrink-vs-widen on the budget ledger and chose widen —
  *"losing real information to make a stale number go away."*
- **Demote-not-delete is the house move**, five instances: CORE-468, CORE-507,
  CORE-535.5, CORE-595, CORE-664.
- **Two hard limits on demote**, both recorded as deliberate counter-examples:
  never demote a clause whose trigger fires on **every run** (CORE-664: the
  split point is *"read-vs-write, not frequency"*; the trailing-bracket-token
  rule stayed behind because moving it "would have put this module on every
  closure"); never demote a clause that exists to **catch someone who skipped
  the fragment** (CORE-468: the §6/§7/§8 bootstrap rules "must stay
  always-loaded").
- **Stranded citations are the anti-decay guard.** CORE-386, which authored both
  prime targets, wrote it in: *"if a rule moves, the citation breaks visibly."*
  A proposal must name its inbound citers.
- **Deliberate labeled mirrors are not duplication.** `docs/VISION.md` ratifies
  the canonical-source-with-mirrors pattern, guarded by `/ft-release` §7.1
  Pair K. A decay finding that proposes dropping a mirror as redundant is
  proposing to break a ratified convention.
- **Archive is write-once** — no proposal may target `.flowtron/tasknote/archive/`.

### Precedent against a 6th pass — surfaced, verified, overridden

CORE-387 (`archive/core/CORE-387.md:74`) declined to cover a gap via the audit
skill and wrote: *"Its `## The 5 passes` count is **also fixed by the dispatcher
contract**, so covering this would mean overloading pass 2 rather than adding a
pass."* Read in place, the count is the **secondary** reason there — the primary
one is episodic-vs-in-flow timing ("a sweep that runs when no tasknote is in
flight finds nothing"), which does not apply to this task. CORE-561 separately
records that CORE-463.2's verified "structural parity across all 7 pass files"
was parity of **headings, not of every bullet**. Both were put to the operator
with the fold-into-pass-4 and addendum alternatives; the operator chose the 6th
pass. Proceeding on that decision — noting that `context.md` is already the one
pass file outside the forked-scaffold regime, which is what makes a divergent
heading tolerable here and would not be true of any other domain.

### Live mirrors of the pass count — audited site by site

Needing an edit (they assert the count for **every** domain):

- `claude/skills/ft-audit/SKILL.md:43,45` — `## 2. The 5 passes (in order)` / "the pass file's **five** passes"
- `claude/commands/ft-audit.md:5` — "walks the domain's 5 passes"
- `docs/MIGRATION.md:88,90,101` — "5-passes-in-order", the `| 5 passes |` table header, and the `context` row enumerating exactly five names. **`docs/MIGRATION.md` is in the Phase 4 sweep set.**

Verified as staying accurate, **no edit owed** (each binds *forked* pass files,
which keep five, and `context.md` is never forked):

- `claude/skills/ft-audit/SKILL.md:22` — §0 forker checklist
- `claude/skills/ft-audit/SKILL.md:136` — §7 row, "five passes of generic advice" (describes an unfilled fork)
- `claude/skills/ft-audit/scaffold-bootstrap.md:30` — placeholder-scan slot list
- `templates/audit-overlay-template.md:43` and `.claude/skills/audit/SKILL.md:38` — both `## Deltas` blocks naming the fillable-slot sections
- `claude/skills/ft-release/SKILL.md:95,265` — both scoped to the **`docs`** domain specifically

### Additional constraints the pass must satisfy

1. **No new forker placeholder** — `context.md` states it "carries no forker placeholders: it runs unforked … without tripping the §1 step 3 bootstrap." Pass 6 must add no `<…>` span inside §"Scope & rubric hints" and no `_(forker: …)_` note anywhere.
2. **`Operator action:` or disqualified** — CORE-561 encoded this as a *detection filter*, not a formatting rule. A finding shaped "consider whether clause X still earns its keep" is disqualified by construction; the proposal must name the target, the destination, and the stranded citers.
3. **Cap of 1 fights the shared cap of 5** — dispatcher §2 caps every pass at 5, so a deliberate one-per-run pass needs an explicit clause in §"Specialist additions" rather than silently diverging.
4. **Exclude from the trivial-fix carve-out** — `context.md` currently declares most context findings carve-out-sized. A decay proposal is the opposite and must be excluded explicitly, or it gets applied inline without an operator decision.
5. **Reuse the existing flowtron-mode detection** — repo-root `SPEC.md` with heading `# Flowtron — Workflow Specification`, already resolved once before pass 1. CORE-644 mirrored that same detection rather than inventing a second one; do the same.

### Byte budgets

`claude/skills/ft-audit/passes/context.md` is **not** a budgeted surface. The
enforced table (`docs/CONTEXT-BUDGET.md` §"Budgets") covers `SPEC.md`, four
`SPEC/` modules, `claude/skills/*/SKILL.md` (depth-1 glob), two `ft-release`
rows, and `SPEC/procedures/ft-task.md`. `ft-audit/SKILL.md` is 27,168 against a
33,000 cap — ~5,800 of headroom, ample for a dispatcher wording change.

### Drift check

- PLAN.md line 18 and `SPEC.md` both read; the plan above contradicts neither.
- The path the PLAN line names — `/ft-audit`'s "existing `passes/context.md`" —
  exists and is the `context` domain's pass file. "No new domain" holds: the
  `context` domain is unchanged, only its pass list grows.
- One genuine drift, surfaced above and resolved by operator decision: the PLAN
  line says "add a decay **pass**", while CORE-387 recorded the 5-pass count as
  "fixed by the dispatcher contract". Verified in place; the count turns out to
  be asserted in prose across four live files and bound by no CI check or
  `/ft-release` mirror pair.
- Second drift, resolved by design rather than by ask: the PLAN line says the
  pass "walks SPEC + gate modules", but `passes/context.md`'s declared scope
  excludes them and its hard rules exclude `.flowtron/core/` outright. Resolved
  by gating pass 6 to flowtron-self mode, where `SPEC.md` + `SPEC/` are the
  repo's own files and the `.flowtron/core/` rule does not apply.

### Clarifying questions — asked and answered

Three genuinely-ambiguous axes went to the operator via `AskUserQuestion`:

1. **Pass shape** → *new 6th pass*, generalising the dispatcher's count
   (over folding into pass 4, or a flowtron-self-only addendum section).
2. **Finding shape** → *a decay window* in CORE-659's shape — drop the live
   trigger, record a window-start SHA, re-evaluate after N archived runs — over
   a straight drop/demote recommendation.
3. **Adopter mode** → *flowtron-self only*, skipped elsewhere with a stated
   zero, the same shape passes 2 and 3 already use.

Assumptions carried forward, not asked: (a) "clause" means a paragraph, table
row, or bullet inside `SPEC.md` / `SPEC/*.md` — not a whole module, and not a
heading; (b) the pass proposes, and never applies, the drop; (c) "per run"
means per `/ft-audit context` invocation, not per task.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Four files, markdown only.

**`claude/skills/ft-audit/passes/context.md`** (8,031 → 14,432 chars):

- §"Scope & rubric hints" — default scope gains repo-root `SPEC.md` + `SPEC/*.md`
  **in flowtron-self mode only**, read by pass 6 and no other pass, with the
  reason stated inline (that repo's own contract prose is exactly what this
  domain audits; in an adopter checkout the same paths are the submodule and
  stay out). Each of the three flowtron-mode bullets gains a `Decay reference
  (pass 6)` clause — adopter and no-flowtron skip and report a stated zero, the
  same shape passes 2 and 3 already use.
- Heading `## The 5 passes` → `## The 6 passes`; pass 6 **Contract decay**
  added. Selection is by **provenance** (a clause that cannot name a concrete
  motivating incident), proposal is a **decay window** in CORE-659's shape
  (trigger to drop, window-start SHA, re-evaluation bar in archived tasknotes),
  capped at one clause per run.
- §"Severity guide" — decay candidates added to **Low**, plus a paragraph
  capping pass 6 at **Medium** and explaining why it can never be High or
  Critical (a decay candidate is a hypothesis about an expired assumption, not
  a defect, and the pass has no evidence that removal is safe — that is what
  the window is for).
- §"Specialist additions" — three extra finding-format lines (`Guards:`,
  `Stranded citers:`, `Proposed window:`); the one-finding-per-run cap stated
  explicitly against the dispatcher's five; explicit exclusion from the
  trivial-fix carve-out; and four new hard rules distilled from the archive
  probe — never target an always-on trigger (CORE-664's read-vs-write split),
  never target a clause that catches a reader who skipped the fragment
  (CORE-468), never call a deliberate labeled mirror duplication (VISION /
  Pair K), and the sanctioned drop-reason is vacuous-by-construction or
  provenance-absent, never a byte count (CORE-465 accepted, CORE-539 refused).

**`claude/skills/ft-audit/SKILL.md`** — §2 heading `## 2. The 5 passes` →
`## 2. The passes`, and the body now says "however many it declares — five for
every domain but `context`, which declares six", plus "unless the pass file
sets a tighter cap of its own" so pass 6's cap of one is sanctioned rather than
a silent divergence. §0:22 and §7:136 deliberately **untouched**: both describe
*forked* pass files, which keep five, and `context.md` is never forked.

**`claude/commands/ft-audit.md`** — the wrapper's "walks the domain's 5 passes
capped at 5 findings each" generalised the same way.

**`docs/MIGRATION.md`** — "5-passes-in-order" → "passes-in-order"; table header
`| 5 passes |` → `| Passes (5 each, except \`context\`) |`; the `context` row's
enumeration gains `Contract decay (flowtron-self only)`.

**Minimal-refactor note.** One dedup made during self-review: the first draft
added a standalone "archive is write-once" hard rule that restated the existing
one. Folded the pass-6-specific nuance into the existing bullet instead
(pass 6 *reads* the archive for provenance evidence, proposes no edit) rather
than shipping two bullets on the same rule.

**Deliberately not done.** No forker placeholder was introduced — `context.md`
states it runs unforked without tripping the §1 step 3 bootstrap scan, and a
`<…>` span or `_(forker: …)_` note would start tripping it on filled forks.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: markdown-only diff, no `viz/` or `tools/` code touched. Ran `node --check tools/update-adopters.mjs` and `npm --prefix viz run lint` as regression checks instead (both clean); `node --test tools/update-adopters.test.mjs` covers the fleet updater, which this diff does not reach.

- [x] Ran lint/type-check on changed code — no lint target covers `claude/skills/**` or `docs/**` markdown (the `justfile` `lint` recipe only runs `npm --prefix viz run lint`); ran it anyway, clean. Final-newline and UTF-8/LF conventions verified on the changed files.

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend change; the diff is four markdown files.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

**Verification receipt** — one line per `## ✅ Acceptance` criterion, run from
the repo root. `P` = `claude/skills/ft-audit/passes/context.md`.

- A1 `grep -q '^## The 6 passes (→ dispatcher §2)$' $P && grep -q '^6\. \*\*Contract decay\*\*' $P` → **0**
- A2 `grep -q '^## 2\. The passes (in order)$' .../SKILL.md && ! grep -q "pass file's five passes" .../SKILL.md` → **0**
- A3 `grep -rn '5 passes\|five passes\|5-passes' claude/commands/ft-audit.md docs/MIGRATION.md claude/skills/ft-audit/SKILL.md` → **0**, and the only two hits are `SKILL.md:22` (§0 forker checklist) and `SKILL.md:136` (§7 row, "five passes of generic advice"). Both describe *forked* pass files, which keep five; nothing in `ft-audit.md` or `MIGRATION.md`. Matches the criterion.
- A4 `grep -q 'Tooling & orphans · Contract decay' docs/MIGRATION.md` → **0**
- A5 `judgment` — pass 6 opens *"flowtron-self mode only; skipped in adopter and no-flowtron modes per §"Scope & rubric hints""*, and all three mode bullets there carry a matching `Decay reference (pass 6)` clause. Read against the existing passes-2-and-3 skip shape: same phrasing, same "report zero findings and say so in the Summary" obligation. **Met.**
- A6 `grep -q '_(forker:' $P` → **1** (no match — none introduced). No `<…>` span added inside §"Scope & rubric hints"; the `SPEC/*.md` glob is a real path, not a placeholder. §1 step 3's bootstrap scan still no-ops on this file.
- A7 `grep -q 'one finding per run' $P && grep -q 'never the trivial-fix carve-out' $P` → **0**
- A8 `judgment` + grep — the file's four `§"…"` citations are `§"Block to paste into AGENTS.md"` and `§"Skill namespace"` (both pre-existing, untouched) and the two I added, `§"Scope & rubric hints"` and `§"Specialist additions"`, which target headings at lines 17 and 45 of the same file. The first resolves by prefix against `## Scope & rubric hints (→ dispatcher §1)` — a shape the dispatcher's own §0 already uses and CI already passes — so no new resolution risk. **Met.**
- A9 `wc -c claude/skills/ft-audit/SKILL.md` → **27,298** against the 33,000 cap (was 27,168; +130). Under by 5,702.
- A10 `node --check tools/update-adopters.mjs` → **0**; `npm --prefix viz run lint` → **0** (eslint clean). Diff is markdown-only, so both are regression checks rather than coverage.

**External review.** `/code-review` (medium). It defaulted to
`git diff origin/main...HEAD` — seven commits, CORE-655…665 — rather than this
task's own diff, so each of its seven findings was graded against
`git status --porcelain` (four modified files + this tasknote) before
disposition. Three were mine; four belong to earlier commits already on `main`.

**Blockers — mine, fixed, Phase 3 re-run from the top:**

- **#4 `claude/commands/ft-audit.md:2` — stale frontmatter.** I updated the body
  (line 5) but left the YAML `description:` saying "runs **5 domain-specific
  passes**" — the string the operator sees in the command picker. Worse, it
  escaped my own A3 grep, which matched `5 passes` and not `5 domain-specific
  passes`, so the criterion passed while the claim stood. Fixed to "runs a
  domain's passes"; **A3's command widened** to catch the variant.
- **#5 `claude/skills/ft-audit/SKILL.md:45` — the tighter-cap exception was
  self-contradicting.** My edit sanctioned a tighter per-pass cap and then the
  next sentence still said "keep the top **5** by severity", so a run with
  three decay candidates would file three and defeat a cap the pass file calls
  "the point, not a shortage". Fixed to "keep the top **N** … N being that cap,
  not always 5". The review also caught that §6's hard rule ("Five findings per
  pass is a *ceiling*") — the section labelled as contract — was left
  unamended; fixed in the same pass.
- **#6 `passes/context.md:11` — the file's own summary contradicted its new
  scope.** The intro still listed four audited surfaces and asserted "the scope
  is fixed by definition", which §1 step 1 invites an agent to stop at; it
  would then never load SPEC prose for pass 6. Rewritten to name the
  flowtron-self `SPEC.md` + `SPEC/*.md` surface and the decay axis, and to
  sharpen "fixed by definition" into *declared here, never supplied by a
  forker* — which is what that clause was actually protecting.

**Notes — earlier commits, filed, no phase reopened:**

- **#1 `.flowtron/tasknote/CORE-660.md:156` (High, CI-red).** Verified
  independently: the link uses the adopter-relative `../core/SPEC/blocked.md`,
  which does not exist in flowtron-self (`ls` confirms; the file is at repo-root
  `SPEC/blocked.md`). `git log` puts it in `7a3ba9ba` (CORE-665). CI's `drift`
  Pair Q exits 1 on it. **Filed CORE-666 under `## High`** — not fixed here:
  it is another task's file and this task has no claim on it.
- **#2 / #3 `SPEC/gates.md:188`, `SPEC/procedures/ft-task.md:343-345`,
  `claude/skills/ft-task/SKILL.md:157` (Medium).** CORE-665 added the
  `--fast`-parks-on-blocked-prerequisite rule to `SPEC/blocked.md` and the
  `gate-postures.md` matrix but left three surfaces asserting the old
  proceed-into-Phase-2 behaviour. Merged and **filed as CORE-667**.
- **#7 `.flowtron/PLAN.md:12` (Low).** `## High` left with no `(none)`
  placeholder by `b39eb024`, diverging from `templates/PLAN.md`. **Filed as
  CORE-668.**

Its "checked and clean" half is corroborating, not load-bearing: 14 of the 15
CI `drift` steps pass locally, `SKILL.md` is under its cap, and the CORE-660
PLAN row does not trip `viz/src/parser.ts`'s `blockedBy` regex.

**Structural quality.** No duplication left: the first draft added a standalone
"archive is write-once" hard rule duplicating the existing one — caught on
self-review and folded into the existing bullet (`grep -c 'write-once' $P` → 1).
No dead prose, no public-surface growth beyond the one declared pass, no
code-facing documentation left stale — the four count-bearing surfaces were
audited site by site and the two that stay accurate are recorded above with
the reason. `passes/context.md` grew 8,031 → 14,432 chars (+6,401, +80%); it
is not a budgeted surface (`docs/CONTEXT-BUDGET.md` §"Budgets" covers
`SPEC.md`, four `SPEC/` modules, `claude/skills/*/SKILL.md` at depth 1, two
`ft-release` rows, and `SPEC/procedures/ft-task.md`), and the growth is rubric
content — the pass, its severity band, its finding-format additions, and four
hard rules — not prose padding. Flagged rather than trimmed because each hard
rule encodes a distinct precedent the archive probe verified as load-bearing.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Doc-drift sweep (18 entries).** `docs/MIGRATION.md` — **updated** (the
`5-passes-in-order` prose, the `| 5 passes |` table header, and the `context`
row's pass enumeration). The other 17 — **no change**: grepped each for
`ft-audit` / pass-count claims, and every hit is a roster or naming mention
(`AGENTS.md:38`, `SPEC.md:755`, the three non-Claude `AGENTS-snippet.md`
install notes, `docs/CONVENTIONS.md:172` fork-seam prose, `SECURITY.md:21`,
`docs/AGENT-NEUTRALITY.md:39,57`, `docs/PLATFORMS.md` inventory rows,
`docs/VISION.md:42`). None asserts how many passes a domain walks, so the
generalisation reaches none of them.

**Learnings.** `N/A` for the always-loaded layer. The one durable fact is
already recorded where it belongs — `passes/context.md` now states in its own
intro that its scope is *declared here, never supplied by a forker*, which is
the distinction external-review finding #6 showed the old "fixed by
definition" wording was blurring.

**Final Summary:**

Added **pass 6, Contract decay**, to `/ft-audit`'s `context` domain: a standing
per-run proposal to drop or demote one clause of flowtron's own contract,
giving the meta layer the subtractive force `docs/HARNESS-SURVEY.md` found it
lacks.

**The design turn.** Discovery found CORE-661 is the third of a trio and that
its sibling **CORE-660 is parked precisely because a decay window one run deep
measures nothing**. A pass that *selected* candidates by measurement would
therefore yield nothing on any run. Resolved by splitting the halves: select by
**provenance** (a clause that cannot name a concrete motivating incident —
which is what this task's own PLAN wording, "naming the failure mode it
guards", already asks for), then propose a **window** in CORE-659's shape. The
pass can fire on its first run and still produce a testable experiment rather
than an opinion.

**Files (4 changed, markdown only).**

- `claude/skills/ft-audit/passes/context.md` 8,031 → 14,677 chars — pass 6;
  flowtron-self-only scope extension to `SPEC.md` + `SPEC/*.md` hung off the
  existing three-way flowtron-mode resolution; a `Decay reference (pass 6)`
  clause on each mode bullet; decay entries in §"Severity guide" plus a
  cap-at-Medium paragraph; three extra finding-format lines; the
  one-finding-per-run cap; explicit exclusion from the trivial-fix carve-out;
  four new hard rules.
- `claude/skills/ft-audit/SKILL.md` 27,168 → 27,464 (cap 33,000) — §2
  generalised off a fixed five and the overflow rule made cap-relative; §6's
  "Five findings per pass is a ceiling" amended to match.
- `claude/commands/ft-audit.md` — body and YAML `description:` both generalised.
- `docs/MIGRATION.md` — prose, table header, `context` row enumeration.

**Verification.** All 10 Acceptance criteria met; receipts in Testing Notes
(8 commands → exit 0, 2 `judgment`). `node --check` and `eslint` clean.

**External review.** `/code-review` (medium) returned 7 findings. It defaulted
to `origin/main...HEAD` — seven commits — so each was graded against this
task's actual diff. **Three were mine and all three were real**: a stale YAML
`description:` that my own acceptance grep was too narrow to catch (the grep
was widened, not just the file fixed), a tighter-cap exception contradicted by
the very next sentence, and a file intro that still claimed a scope the edit
had widened. Fixed, Phase 3 re-run from the top. **Four belong to earlier
commits already on `main`** and were filed, not absorbed: **CORE-666** (High —
`CORE-660.md:156` uses an adopter-relative link that does not resolve in
flowtron-self; CI's `drift` Pair Q exits 1, verified independently),
**CORE-667** (Medium — CORE-665's `--fast`-parks rule left three surfaces
asserting the old behaviour), **CORE-668** (Low — missing `(none)` placeholder).

**`touches:` reconciliation.** Declared four paths; `git diff --name-only`
shows those four plus `.flowtron/PLAN.md`. The PLAN edit is undeclared and
expected — it carries this task's own stub flip *and* the three filed
follow-up rows, neither knowable at scaffold time. Recorded as a fact, not a
defect.

**Maintainability effect.** The lazy `SPEC/` modules sit outside the Phase 4
doc-drift sweep on volume grounds, so they had no recurring review at all;
this pass is now their only one. It is capped at one proposal per run and
excluded from the inline-fix carve-out, so it cannot itself become a source of
churn — every proposal costs an operator decision.

**Archived:** 2026-09-22
