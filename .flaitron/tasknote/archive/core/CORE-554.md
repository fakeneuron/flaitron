---
title: micro-task-description-flags
status: completed
tags: []
created: 2026-09-09
due:
related-tasks: [CORE-420.5, CORE-420.3, CORE-475, CORE-460.2, CORE-536]
touches:
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-goal-task/SKILL.md
  - claude/skills/ft-task/SKILL.md
  - codex/skills/ft-micro-task/SKILL.md
  - codex/skills/ft-goal-task/SKILL.md
  - codex/skills/ft-task/SKILL.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
---

# CORE-554 | micro-task-description-flags

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-420.5]] · [[CORE-475]] · [[CORE-536]]

## 🎯 Goal

Make every flag a skill implements discoverable to description-dispatching
agents — fix the three `description:` pairs that document none (or not all) of
their flags, and encode the guard that catches the class instead of leaving it
to the next audit.

## ✅ Acceptance

- [x] `claude/skills/ft-micro-task/SKILL.md`'s `description:` documents `--fast` and `--unattended` outside any quoted illustration, in the established house voice
- [x] `codex/skills/ft-micro-task/SKILL.md`'s `description:` names the same two flags in Codex's own `` With `--flag`, … `` voice — not a copy of the Claude sentence
- [x] `ft-goal-task`'s Claude + Codex `description:` document `--fast`, `--unattended`, and `--worktree` unquoted
- [x] `ft-task`'s Claude + Codex `description:` document `--fast` unquoted alongside the `--debug` / `--unattended` they already name
- [x] `claude/skills/ft-release/step-7.1-mirror-pairs.md` carries a new **Pair M** binding each skill `description:` to its command stub's `argument-hint:`, in the section's bold-header + fenced-command + resolution-rule shape, with the deliberate properties recorded for a future editor
- [x] Pair M's exemption for the four park-priority flags is expressed as Pair F's owned set, not an ad-hoc blocklist
- [x] Pairs B, E, F, J and the new Pair M all run clean on the post-change repo
- [x] Doc-drift sweep run across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Rewrite `ft-micro-task`'s Claude `description:` to document both flags
- [x] Rewrite `ft-micro-task`'s Codex `description:` in Codex voice
- [x] Rewrite `ft-goal-task`'s Claude + Codex `description:` (three flags)
- [x] Rewrite `ft-task`'s Claude + Codex `description:` (add `--fast`)
- [x] Re-run Pair B; confirm the six halves agree
- [x] Re-run Pair E flag coverage; extend `ft-flowtron` roster rows if a newly documented flag is unnamed there
- [x] Draft Pair M: command, resolution rule, and the deliberate-properties list
- [x] Verify Pair M reports clean on the fixed repo, and prove it is not a false negative against synthetic drift
- [x] Re-run Pairs A–L spot checks touching the changed files (B, E, F, J, L)
- [x] Doc-drift sweep

## 🔗 Related

- [[CORE-420.5]] — minted Pairs A–D and the load-bearing quote-strip this task builds on; `related-decision:`
- [[CORE-420.3]] — fixed the two Codex fold descriptions; the instance class this task's Pair M generalizes
- [[CORE-475]] — minted Pair J (`argument-hint:` ↔ stub prose), which makes `argument-hint:` a gated ground truth Pair M can derive from
- [[CORE-460.2]] — traced the same drift class one field over; the precedent for encoding rather than hand-fixing
- [[CORE-536]] — gate-relaxation pass; last edit to `ft-micro-task`'s skill body, which wired the flag the `description:` never caught up to

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** The filed defect is real and live — `/ft-micro-task`'s
  `description:` names zero flags on both Claude and Codex while the skill body,
  its command stub, the `ft-flowtron` roster, `CAPABILITIES.md`,
  `PLATFORMS.md` (three rows), `SPEC/gates.md` and `EXTERNAL-AGENTS.md` all carry
  `--unattended`. But measuring the empty-set question the line asked me to
  "consider" showed the class is not a one-off: `/ft-goal-task` documents *none*
  of its three flags and `/ft-task` omits `--fast`, in both cases because the
  flags appear only inside `args="…"` illustrations that CORE-420.5's
  load-bearing quote-strip correctly discards. Operator decision (2026-09-09):
  fix all three skills on both surfaces and encode the guard as a new Pair M,
  rather than fixing the filed instance and leaving two live ones behind.
  PLAN.md line rewritten to match.

- [x] Read relevant source files — the six `description:` fields, the three
  command stubs' `argument-hint:` lines, `claude/skills/ft-flowtron/SKILL.md`'s
  roster rows, and Pairs B / E / F / J / L in
  `claude/skills/ft-release/step-7.1-mirror-pairs.md`. Narrow, known read set;
  no probe warranted.

- [x] **Best Practices Review** — the touched responsibility is *dispatch-surface
  currency*, and it already has an owner: the §7.1 mirror-pair block. The
  correct shape is a new pair in that block's established form, not a script, a
  linter, or a new file — flowtron ships no runtime
  (`docs/VISION.md` §"What we won't accept"). Dependency direction is
  one-directional and derived (stub `argument-hint:` → skill `description:`),
  matching Pairs E and J. No refactor required; no duplication introduced,
  because Pair M reuses Pair B's quote-strip pipeline verbatim rather than
  minting a second definition of "documented flag".

- [x] **Archive skim** — 20 archived notes touch
  `claude/skills/ft-micro-task/SKILL.md`; none touch the Codex wrapper since
  [[CORE-465]]. Load-bearing findings: [[CORE-420.5]] minted Pairs A–D and
  measured the quote-strip (dropping it took Pair B "from three real findings to
  six, half of them noise"), so Pair M must reuse that pipeline verbatim or the
  two checks start disagreeing — Pair J already records this as a standing
  three-way obligation (B, E, J → now B, E, J, M). [[CORE-475]] minted Pair J and
  established `argument-hint:` as a gated, stub-local ground truth, which is what
  makes it safe to derive from. [[CORE-536]] last edited `ft-micro-task`'s body;
  the `description:` never caught up. Pair E and Pair J each record their
  one-directionality as *deliberate*, with `ft-file-followup`'s four
  park-priority flags named as the exemption both times — Pair M inherits that
  exemption by naming Pair F's owned set.

- [x] **Drift check** — every claim in the PLAN.md line verified against current
  code, and one correction made. The empty-set blindness is real for Pair B
  (both halves derive `[]`, compare equal, pass) and Pair E (empty `for` loop).
  It is **not** the failure mode for Pair J: J reads the *command stub*, not the
  skill, and `claude/commands/ft-micro-task.md` documents both flags in its
  `description:` and Usage bullets and names both in its `argument-hint:`, so J
  passes legitimately rather than vacuously. J's relevance is the opposite one —
  it is the pair that made `argument-hint:` trustworthy enough to derive Pair M
  from. The rewritten PLAN.md line no longer claims J skips this skill. The plan
  formed here contradicts no SPEC contract: adding a mirror pair is repo state,
  not a gate or a banner, so the two-banner cap
  (`SPEC/gates.md` §"Operator-gate cues") is untouched.

- [x] Asked clarifying questions — one structured ask on scope (fix the filed
  instance only vs. fix all three and encode the guard). Operator chose the
  latter, which is what drove the Re-scope verdict above. Explicit assumptions
  carried forward: `argument-hint:` is accepted as ground truth for
  *implemented* flags because Pair J gates it; short aliases (`-f`, `-d`, `-p`)
  stay out of scope because the `--[a-z]` extraction never sees them; and
  positional arguments stay out of scope, as Pair J already records.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The defect in one line.** A skill's `description:` is the dispatch surface —
what an agent matches against when it picks a skill from natural language. A
flag absent from it is wired, documented for humans, and invisible to that
agent.

**Measured state at HEAD** (skill `description:` flags vs. its stub's
`argument-hint:` flags, both run through Pair B's quote-strip):

| skill | `description:` | `argument-hint:` | gap |
|---|---|---|---|
| `ft-micro-task` | *(none)* | `--fast --unattended` | both |
| `ft-goal-task` | *(none)* | `--fast --unattended --worktree` | all three |
| `ft-task` | `--debug --unattended` | `--debug --fast --unattended` | `--fast` |
| `ft-file-followup` | `--park --unattended` | + `--low --med --fut --high` | Pair F's, exempt |
| every other shipped skill | — | — | none |

Sixteen of nineteen skills are clean, and the four priority flags are a known
deliberate exemption recorded in both Pair E and Pair J. So the guard's live
finding set is exactly the three rows above — small enough to fix in this commit
and ship the new pair green, which is the same shape [[CORE-420.5]] used when it
minted Pair B (fix the live drift in the same cut, then the check ships clean).

**Why `argument-hint:` is the right ground truth.** It is the flag roster Claude
Code shows the operator at the moment they type the slash command, it lives one
file per skill with no cross-file join, and Pair J already binds it to the
stub's own prose. Deriving Pair M from it adds no new maintained list. Its
known asymmetry — a hint may name more than prose documents — is harmless here,
because Pair M runs in that same direction (hint → description) and therefore
*wants* the hint to be the superset.

**Why not distinguish inside the existing guards.** The alternative was teaching
Pair B and Pair E to tell "documents none" from "implements undocumented"
internally. Rejected: both are `description:` ↔ `description:` /
`description:` ↔ roster comparisons whose empty-set skip is *correct* for what
they compare — B must not demand a Codex mirror of a flag neither side
documents, and E's flag half is one-directional on purpose. The missing
information is not inside either pair; it is a third surface. A new pair is the
honest encoding, and it keeps each pair's existing properties intact.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the established shape on both halves. The
  `description:` clauses follow the house voice already set by `ft-close-epic`,
  `ft-file-followup`, `ft-spec` and `ft-stats` (`` With `--flag`, <active verb> ``
  on Codex; `` `--flag` <verb>s … `` inline on Claude), and Pair M follows §7.1's
  bold-header → rationale → fenced command → resolution rule → deliberate-properties
  shape, reusing Pair B's extraction pipeline verbatim rather than defining
  "documented flag" a second time. No new file, script, or hook — flowtron ships
  no runtime, and this class already has an owner.

- [x] **Minimal refactor gate** — no refactor. The only edit outside the six
  `description:` fields and the new pair was forced by the checks themselves: Pair E
  reported `MISSING FLAG ft-goal-task --fast` the moment the description documented
  it, so the `ft-flowtron` roster row gained a matching clause. Unrelated cleanup
  deferred.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — the "test" for a mirror pair is
  the pair itself plus a synthetic-drift proof; both are recorded in Testing Notes,
  matching how [[CORE-420.5]] proved Pair C.

**Implementation Notes:**

Six `description:` fields rewritten, one roster row extended, one new pair, and two
pair-range citations corrected:

| File | Change |
|---|---|
| `claude/skills/ft-micro-task/SKILL.md` | documents `--fast` (`-f`) + `--unattended` |
| `codex/skills/ft-micro-task/SKILL.md` | same two, in Codex voice |
| `claude/skills/ft-goal-task/SKILL.md` | documents `--worktree`, `--unattended`, `--fast`; the four quoted `args="…"` illustrations collapse to one |
| `codex/skills/ft-goal-task/SKILL.md` | same three, in Codex voice |
| `claude/skills/ft-task/SKILL.md` | `--fast` promoted out of its quoted illustration |
| `codex/skills/ft-task/SKILL.md` | `--fast` clause added ahead of `--unattended` |
| `claude/skills/ft-flowtron/SKILL.md` | `/ft-goal-task` row gains the `--fast` clause Pair E demanded |
| `claude/skills/ft-release/step-7.1-mirror-pairs.md` | **Pair M** + two `F–K` range citations updated |
| `docs/CONVENTIONS.md` | release-gate-only enumeration `F–L` → `F–M` |

Two judgment calls worth recording:

**`ft-goal-task`'s `--fast` clause states the caveat, not just the flag.** Its Step 0
says `--fast` is "largely redundant here" because the loop already runs with `--fast`
semantics. A description that named the flag without that caveat would be discoverable
and misleading, so both surfaces say it reaches only the pre-loop Phase 1 surface. The
`ft-flowtron` roster row was given the same caveat rather than a bare flag name.

**Pair M was deliberately not lifted into the `drift` CI job.** It is
release-context-free and would qualify on the CORE-469 argument that minted the job,
but promoting it needs a companion Pair L mapping row, and that is scope this task did
not open. `docs/CONVENTIONS.md` and Pair L's coverage bullet both now name M as
release-gate-only, so the state is recorded rather than ambiguous — a later task that
wants CI coverage adds the step and the mapping row together.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` for a unit-test suite: the
  change is nine markdown files with no executable surface (`viz/` untouched, so
  `npm --prefix viz test` covers nothing here). The pair checks below are the
  applicable verification.

- [x] Ran lint/type-check on changed code — `N/A` (no TS/JS touched). `.editorconfig`
  compliance verified instead on all nine changed files: zero trailing whitespace,
  final newline present, LF endings, UTF-8.

- [x] **Quality assertions** — no duplication introduced (Pair M reuses Pair B's
  pipeline rather than restating it), no dead code, no unexplained complexity (each
  non-obvious line in the new command is justified in the properties list), no
  public-surface growth beyond the one intended pair, and the stale
  `docs/CONVENTIONS.md` range citation was repaired rather than left.

- [x] (frontend) Visual confirmation — `N/A`, no frontend surface.

**Testing Notes:**

Pair M, run on the fixed repo: **clean**. Proven not a false negative against two
synthetic drifts, each reverted immediately after:

| Control | Injected drift | Reported |
|---|---|---|
| 1 | restored `ft-micro-task`'s pre-fix `description:` | `UNDOCUMENTED FLAG ft-micro-task --fast` + `--unattended` |
| 2 | added `--json` to `ft-stats`'s `argument-hint:` | `UNDOCUMENTED FLAG ft-stats --json` |
| 3 | none — exemption check | silent on `ft-file-followup`'s four park-priority flags |

Full block re-run after the change — **every check clean**: Pair A (3 hits, one per
surface), Pair B (no mismatch — this is the check that catches a half-fixed Claude
description, and it went green only after all six halves landed), Pair C, Pair E row
coverage (`diff` exit 0) and flag coverage, Pair F (both halves), Pair J, Pair L (CI
drift job still agrees with its §7.1 sources — confirming the appended pair did not
disturb Pair E's fence extraction), plus the wrapper-name invariant and shipped-skill
parity. Pair E's one interim finding, `MISSING FLAG ft-goal-task --fast`, was the
block working as designed and is resolved.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 18-entry set walked; one real hit, one worth stating:
  - `docs/CONVENTIONS.md` — **updated.** §"GitHub Actions CI" enumerated the checks
    that stay release-gate-only as "Pairs D and F–L"; a new pair outside CI makes that
    range stale on the day it lands. Now `F–M`.
  - `claude/CAPABILITIES.md` — no change. Its `--fast` / `--unattended` rows describe
    flag *semantics*, which this task did not touch; its last-verified stamp moves at a
    version bump, not here.
  - `docs/PLATFORMS.md`, `docs/EXTERNAL-AGENTS.md` — no change. Both enumerate which
    skills accept the flags; that set is unchanged, only where the flags are documented.
  - `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `CONTRIBUTING.md`,
    `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/AGENT-COMPAT.md`,
    `docs/WORKTREES.md`, `docs/VISION.md`, and the four `AGENTS-snippet.md` surfaces —
    no change. The skill rosters they carry are names-only (the sole flag exception
    being `/ft-file-followup`'s park priorities, which Pair F owns and this task did
    not touch).

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` flipped to
  `completed`; PLAN.md line flipped to stub form and placed at the top of
  `## Completed`; tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Closed the dispatch-surface blind spot that let three skills ship flags no
description-dispatching agent could find, and encoded the guard so the fourth
instance is caught at the release cut instead of by an audit.

**Changed:** 10 files, all markdown. Six `description:` fields
(`ft-micro-task`, `ft-goal-task`, `ft-task` × Claude + Codex), one `ft-flowtron`
roster row, `+~2.9 KB` of new Pair M in `step-7.1-mirror-pairs.md`, and two
pair-range citations (`docs/CONVENTIONS.md`, Pair L's coverage bullet).

**Verified:** Pair M clean and proven against two synthetic drifts; Pairs A, B, C,
E, F, J, L plus the wrapper-name invariant and shipped-skill parity all clean;
`.editorconfig` compliance on every changed file.

**Refactors:** none made, none deferred. The one collateral edit (the `ft-goal-task`
roster row) was demanded by Pair E and is recorded above.

**Documentation verdict:** one update (`docs/CONVENTIONS.md`), seventeen no-change
verdicts, each reasoned rather than asserted.

**Maintainability effect:** the flag path from a stub's Usage bullet to the surface an
agent dispatches from is now gated end to end — Pair J carries prose → `argument-hint:`,
new Pair M carries `argument-hint:` → Claude `description:`, and Pair B carries that to
Codex. The class that produced this ticket cannot recur silently: the next flag added
without a description clause fails the cut with a named finding. Cost is one more
release-gate check and a four-way (was three-way) obligation to keep the quote-strip
pipeline identical across B, E, J and M — recorded in each pair's properties list.

**Archived:** 2026-09-09
