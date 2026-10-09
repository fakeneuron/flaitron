---
name: ft-refactor
description: Plan a refactor of one named target as a sequenced, behavior-preserving epic. Read-only depth analysis, an operator-reviewed plan, then files the epic and implementation children. Never edits code. With `--fast` (`-f`), suppresses the conditional gates on filing.
argument-hint: <target> [--fast | -f]
---

# ft-refactor — flaitron refactor depth planner

You are planning a refactor of **one named target** and filing the result as
a sequenced epic. `/ft-refactor` is a **depth planner that files** — it sits
between a hand-drafted spec (`templates/spec-template.md`; plans, never
files) and `/ft-open-epic` (files an epic, then drives a generic
Discovery): it performs the depth
analysis itself, surfaces the plan for operator review, and on the
operator's go files the epic + per-child starter tasknotes in one motion.

**Read-only hard rule.** `.flaitron/PLAN.md` and `.flaitron/tasknote/` get
written (Step 5). Source files do NOT — no code edits, no formatters, no
"fix while I'm in here," no matter how small the move. Every code change
this skill plans happens later, through normal `/ft-task` cycles on the
filed children. This mirrors the audit family's "Write tickets, not fixes"
contract; efficiency is not an objection — unrequested diffs in a run the
operator asked to be a *plan* are.

Treat `<root>SPEC.md` and the lazy modules under `<root>SPEC/` as
authoritative when this skill is silent or in tension. Keep every artifact
aligned with `docs/PHILOSOPHY.md` / `docs/VISION.md`: zero scripts, no new
lifecycle phase or banner, no schema/validator, operator review over
autonomy.

## Step 0 — Resolve paths

Two layouts. Pick by which file exists:

- **Adopter project:** `.flaitron/core/SPEC.md` exists → `<root>` = `.flaitron/core/`.
- **Flaitron self-host:** repo-root `SPEC.md` with heading `# Flaitron — Workflow Specification` → `<root>` = repo-root.

If neither matches, bail.

**Skill/pin guard.** On the adopter layout, if the runtime names this skill's base directory and it lies outside this project (an agent-home install such as `~/.claude/skills/<slug>`), stop: this body is not the copy pinned at `.flaitron/core/`, and it can cite files the pin lacks. On either layout, a skill fragment, SPEC module, or template this skill says to Read that is absent also stops the run — never improvise its contents. Both stops make no further write, name anything this run already wrote, and print `⛔ skill/pin mismatch — <base directory or missing path>` (invoked with `--unattended`: `⏸ --unattended stop — skill-pin-mismatch: <same>; wrote <paths, or nothing>.`), pointing at flaitron's `docs/PLATFORMS.md` §"One canonical install path per project" (under `.flaitron/core/` in an adopter): remove the agent-home copy so the repo-scoped wiring runs.

Paths: SPEC=`<root>SPEC.md`, SPEC_DIR (lazy modules `epic.md` · `starter.md`)=`<root>SPEC/`, starter template=`<root>templates/tasknote-starter-template.md`, PLAN=`.flaitron/PLAN.md`, tasknote dir=`.flaitron/tasknote/` (always).

## Step 1 — Parse args

Split `args` on whitespace. Tokens:

- **`--fast` or `-f`** → set `fast-mode = true` (skips the Step 4 review
  pause; see there). Emit one inline marker: `⚡ --fast active — plan-review
  pause suppressed; still read-only on source files (writes PLAN + starter
  notes only).`
- **All other tokens** → join as the **target**: a file, directory, module,
  function/class, or named subsystem.

If no target remains, ask the user for one — do not guess, and do not fall
back to a whole-repo sweep (that is `/ft-audit structure`'s job; see Notes).
If the target names a path that does not exist at HEAD, surface the miss and
ask for a correction before reading anything.

## Step 2 — Depth survey (read-only)

Build the evidence base for the plan. Read, never edit:

- **The target itself** — responsibilities, public surface, internal
  structure, size hot-spots.
- **Inbound dependencies** — call sites / importers of the target (grep for
  its exported names). These are the blast radius: every restructuring step
  must keep them working or explicitly migrate them.
- **Outbound dependencies** — what the target reaches into; note any
  boundary violations or cycles the refactor should fix or must not worsen.
- **Test coverage** — existing tests exercising the target; map which
  behaviors are pinned and which are uncovered. Uncovered-but-load-bearing
  behavior is exactly what characterization tests must pin first.
- **Seams** — the natural cut points (interfaces, composition joints,
  stable call boundaries) where the restructuring can proceed in
  independently-verifiable steps.
- **Declared structure** — the repo's own architecture/layout docs where
  they exist. Judge against what the project declares, not a textbook
  layering ideal.

When the read set is broad or its shape is unknown, consider isolating the
search in a probe (`<root>templates/subagent-probe-template.md`) and keeping
only its distilled return. Record the survey's load-bearing findings — they
feed the plan preview (Step 4) and the child starters' context (Step 5).

**De-scope valve.** If the survey concludes the restructuring fits one
`/ft-task`-sized change, do **not** file an epic — say so, sketch the single
change in a sentence or two, and recommend a single filing instead
(`/ft-file-task --starter` for rich context, or a plain PLAN.md line). The
operator converts; this skill files epics only.

## Step 3 — Draft the sequenced plan

Turn the survey into an ordered list of implementation steps, each sized to
one `/ft-task` cycle. Sequencing doctrine:

- **Pin behavior first.** The first step is typically a
  characterization-test step: write/extend tests that pin the target's
  current observable behavior at the seams the later steps will move.
  Where existing coverage already pins a seam, the step thins or drops —
  say so rather than filing make-work.
- **One seam per step.** Each subsequent step restructures along one seam
  (extract, move, inline, split, re-route callers) and leaves the suite
  green. Order steps so each stands on the pinned behavior of its
  predecessors — strangler-fig over big-bang.
- **Behavior-preservation contract per step.** Every step's commits are
  behavior-preserving and never mixed with feature change; public surface
  changes only where the step explicitly says so, with call-site migration
  inside the same step.
- **M is the step count.** Children file as `.2..(M+1)`; the reserved `.N`
  audit closes the epic (verifies the completed refactor sits well in the
  codebase and the suite pins held). Propose per-child model tags
  (`[heavy]🧠` / `[medium]🧩` / `[light]🔧` per `SPEC/model.md`;
  `[frontier]💎` only on a §"When to choose `[frontier]`" trigger; never
  `[xheavy]` — manual-only, an automated proposer never self-assigns it), an
  area prefix, a parent shortname, and a priority — the AI proposes, the
  operator confirms in Step 4.
- **`[unattended]` candidacy** (mirror of `SPEC/unattended-candidacy.md` §"Three postures"
  — Read that module now, at this write step). With the model tags and the
  sequence settled, run its §"Candidacy predicate" over each PLAN line as
  Step 5 will write it — the children `.2..(M+1)` and the `.N` audit; the
  parent is never proposed. Clause 6 on this surface: there is no `.1` (see
  Notes), so `.2` reads its predecessor as closed; every later child is
  admitted only when the predecessor its `blocked-by:` will name — or its stem
  predecessor where `parallel-safe-with:` decoupled it — is proposed in the
  same pass. The token lands only through the Step 4 review, never on a
  starter note; under `--fast` the Step 6 hand-off carries
  `unattended-candidates:` instead (Step 4).

## Step 4 — Review gate

**Default (`fast-mode = false`):** surface the plan inline — a short survey
summary (target shape, blast radius, coverage gaps), then the sequenced
step list with per-step one-liners and proposed model tags, then the
proposed filing (area · parent shortname · priority · M · audit included?).
Each Step 3 candidate is shown as its PLAN line with `[unattended]` in place
after `[<model>]`, naming the clause-6 predecessor where one applies.
Ask via AskUserQuestion whether to file as proposed, edit first (apply
edits and re-surface), or stop (plan stays in the conversation only). Wait
for the operator's go. The go keeps a token; an edit that drops it drops
it and every kept row leaning on it (module §"Three postures") — name those
in the Step 6 hand-off; a declined row shows no token and says nothing. No
cue, banner, or checklist box is added for the candidacy.

**`fast-mode = true`:** skip the pause and file as drafted — but still
surface the full plan in the hand-off so the operator sees what landed.
`--fast` never widens what gets written: PLAN lines + starter notes only,
source files never. The skipped pause is the act that would have confirmed
a Step 3 candidate, so under `--fast` **no `[unattended]` is written**; the
Step 6 hand-off carries the candidates on their own line instead, always —
`unattended-candidates: CORE-581.2, CORE-581.3` or `unattended-candidates: none`
(shape: the module's §"Three postures").

The operator may decline the `.N` audit child for a short, low-risk plan
(per `SPEC/epic.md`: "apply judgment") — default is to include it.

## Step 5 — File the epic

Only after the Step 4 go (or `fast-mode = true`).

**Filing-commit pre-check first.** Immediately before any write, run the
pre-check in `SPEC/plan-filing.md` §"Filing commits": `git diff --cached --quiet`
non-zero, or any PLAN.md change beyond earlier task-row filings →
`auto-commit = false`; otherwise `auto-commit = true`, recording any
accumulated-filing IDs.

1. **Resolve the epic ID.** Scan `.flaitron/PLAN.md` AND
   `.flaitron/tasknote/archive/<area>/` for the highest used numeric suffix
   in the chosen area across regular AND epic IDs (they share the suffix
   per SPEC §"Task ID convention"); `next-N = max-used + 1` →
   `<AREA>-EPIC-<next-N>`. Surface the resolved IDs; the operator may
   override the number.
2. **Write the PLAN.md lines** under the chosen `## <Priority>` heading,
   canonical grammar (SPEC §"Task-line format"), 2-space indent on
   children, each long description ≤50w target / 70w hard cap:
   - Parent: `- [ ] **<AREA>-EPIC-<next-N>** [<model>] | <shortname> — <one-line epic description> (filed via /ft-refactor; plan on the child starters).`
   - Children `.2..(M+1)`: one line each, model tag from the reviewed plan.
   - Audit: the standard reserved-`.N` line per `SPEC/epic.md` (omit if
     declined).
   - `[unattended]`: inserted after `[<model>]` on exactly the child / `.N`
     rows the Step 4 go kept, every other segment verbatim (position
     footgun in `SPEC/plan-parser.md`); never on the parent, never under
     `fast-mode = true`.
   There is **no `.1` line** — this run performed the discovery (see
   Notes).
3. **Write one starter tasknote per implementation child** from the starter
   template (`status: starter`; `/ft-task <ID>` later promotes it via its
   Step 3a path). Fill per `SPEC/starter.md` + the template's sections:
   - Frontmatter: `title:`, `created:`, `related-tasks: [<AREA>-EPIC-<next-N>]`,
     `touches:` (the step's files), `blocked-by:` (the preceding child —
     this chain IS the sequence; the first child omits it),
     `parallel-safe-with:` only where the plan genuinely decoupled steps.
   - **Why this exists** — the plan slice: what this step moves and why it
     sits at this position in the sequence.
   - **Solution shape** — the step's moves, plus the acceptance seeds
     Phase 1 will promote into `## ✅ Acceptance`: characterization tests
     pinning the touched seams written/extended and green **before**
     restructuring; restructuring commits behavior-preserving, never mixed
     with feature change; suite green after; public surface unchanged
     unless this step explicitly migrates it.
   - **Files to touch** — from the survey (drift-checked at promotion).
   - **Explicitly out of scope** — later steps' moves, by ID.
   - **Decisions locked** — sequencing/boundary decisions from the review.
   - **Open at promotion** — anything the survey left uncertain.
4. **Downstream-impact reconciliation scan** (per
   `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation" — a
   new-task filing trigger): scan the rest of the active PLAN for entries
   sharing a surface with the target; classify and propose reconcile
   actions; apply only operator-confirmed edits. A target nothing else is
   filed against skips the scan (judgment) — note "no downstream impact".

## Step 6 — Commit + hand off

**Commit the filing** (when `auto-commit = true`): stage the PLAN.md edit
and the starter files **by name**; the Step 4 approval is the commit
authorization:

```sh
git add .flaitron/PLAN.md <starter-file-paths>
git diff --cached   # whole index, no pathspec
git commit -m "chore: file <AREA>-EPIC-<next-N> refactor plan — <shortname>"
```

**Post-stage verification.** Recognized hunks: the appended PLAN.md rows, any
confirmed reconcile edit, each starter file as a new file, and the accumulated
filings the pre-check recorded (their IDs go in the body line that section
names). Anything else → `git restore --staged` every staged path, skip the
commit, and report it as the `auto-commit = false` case. `auto-commit = false` →
skip and say so. Explicit pathspecs, the whole-index read, commit-never-push,
and no 🏁: `SPEC/plan-filing.md` §"Filing commits".

Then, in one short message: where the epic and starters landed (IDs +
paths, or "plan left in conversation" on the stop branch), the commit SHA
as plain text (or why the commit was skipped), the `unattended-candidates:`
line when `fast-mode = true` (Step 4; own line, always), and the next move —
the first implementation child, with the copy-paste cue per SPEC §"Post-closure
protocol" step 3 (label line
`<glyph> Clear your session, then run on <model @ effort>:`, then
`` /ft-task <AREA>-<next-N>.2 `` alone as inline-code, no trailing period;
`<glyph>` and the pick match the child's model tag).

## Notes

- **Why no `.1` Discovery child.** `SPEC/epic.md`'s lifecycle defaults to a
  `.1` Discovery whose deliverable is the filed child list. Here the
  `/ft-refactor` run *is* that discovery — the survey, scoping, and child
  filing all happen in this invocation under operator review — so its epics
  file implementation children from `.2` with no `.1`, keeping child
  numbering aligned with every other epic. The reserved `.N` audit slot is
  unchanged. This is the epic module's own "apply judgment" clause, not a
  new epic shape.
- **Execution discipline lives on the children.** The skill encodes the
  characterization-test-first and behavior-preservation contract as
  acceptance seeds on each starter; `/ft-task` promotion (Step 3a) carries
  them into `## ✅ Acceptance`, where Phase 3 verifies them. The skill
  itself never runs tests and never edits code.
- **Compare with `/ft-audit structure`** — the breadth complement: 5 capped
  passes across the scope, flat tickets. Its findings that need a sequenced
  multi-step restructuring of one target recommend an `/ft-refactor
  <target>` run; this skill is that depth path. No target → you want the
  breadth sweep, not this.
- **Compare with `/ft-open-epic`** — generic epic opener: files parent
  + `.1` + `.N`, then drives the `.1` Discovery as its own tasknote. Use it
  when scope is genuinely open; use `/ft-refactor` when the epic is a
  restructuring of one named target and the analysis fits one reviewed run.
- **Compare with a spec** (`templates/spec-template.md`) — a planning
  artifact that never files. A spec captures a design worked out in
  conversation; `/ft-refactor` performs a code-grounded analysis and files
  the resulting epic on approval.
- **No new machinery.** No new lifecycle phase, no banner (the Step 4 gate
  is an AskUserQuestion review prompt), no schema/validator, no scripts —
  per `docs/PHILOSOPHY.md` / `docs/VISION.md`. Starters, epics, `blocked-by:`
  echoes, and filing commits all reuse existing SPEC contracts.
- **Install tier: symlinked** (stack-neutral driver, like `/ft-task`) —
  wired into adopters via `/ft-new-project` +
  `docs/MIGRATION.md` §1.2.
