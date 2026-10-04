---
title: Codex trigger-table backfill
status: completed
tags: []
created: 2026-08-21
due:
related-tasks: [CORE-EPIC-460, CORE-458, CORE-460.3]
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

# CORE-460.4 | Codex trigger-table backfill

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-460]] · [[CORE-458]] · [[CORE-460.3]]

## 🎯 Goal

Bring the Codex trigger table to the same row shape as Cursor/Grok so the
Pair I mirror gate has a real surface to guard, restamp its `last-verified`,
and add the "fork, don't symlink" note to the `codex/skills/ft-audit` wrapper.

## ✅ Acceptance

- [x] `docs/PLATFORMS.md` §"Non-Claude capability triggers" → Codex CLI table carries **11 rows in Grok's order** — the 4 existing plus Force-skip (`--fast`), Debug mode (`--debug`), Park mode (`--park`), Worktree handoff (`--worktree`), Model / session switch, Context freshness, Structured ask
- [x] Each new row is written from its matching `claude/CAPABILITIES.md` row and **re-stated for Codex's own availability story** (wrapper-routing through `codex/skills/*/SKILL.md` + the SOP), not paraphrased from the Grok or Cursor tables
- [x] Pair I's derived check (`claude/skills/ft-release/SKILL.md` §7.1) prints nothing with Codex now naming flags; a simulated single-flag drop fires `MISSING TRIGGER FLAG ### Codex CLI`
- [x] The **Sub-agent / isolated exploration** row is rewritten against current vendor docs (native subagents; `explorer` as probe), retiring the "No documented sub-agent spawn primitive" claim and its second-session approximation
- [x] A provenance sentence is appended to the Codex first-use-verification paragraph naming the vendor-doc basis + date of the backfill; the `**Last verified:**` stamp stays `v5.18.0 · 2026-08-18 (dogfooded)`, with the reasoning logged — no claim of a Codex session that did not happen
- [x] Three Codex prose asides gain the one-clause triggers-table pointer Grok/Cursor already carry: `docs/PLATFORMS.md` §"Today's surface" Codex row, §"Worked example: Codex CLI" (new Operator-flags bullet), `docs/AGENT-COMPAT.md` Codex matrix row
- [x] `codex/skills/ft-audit/SKILL.md` carries a **fork, don't symlink** note naming the Codex-side unprefixed fork target and the `docs/MIGRATION.md` §1.2.1 install pointer; the other 17 Codex wrappers are untouched

## 🧩 Subtasks

- [x] Add the 7 new rows to the Codex CLI table in Grok's row order
- [x] Rewrite the Sub-agent / isolated exploration row against the vendor subagents doc
- [x] Append the provenance sentence to the first-use-verification paragraph; leave the stamp
- [x] Add the three pointer clauses (PLATFORMS ×2, AGENT-COMPAT ×1)
- [x] Add the fork-don't-symlink note to `codex/skills/ft-audit/SKILL.md`
- [x] Run Pair I's fence — positive, plus a negative simulation dropping one flag
- [x] Phase 4 doc-drift sweep + closure — one extra edit surfaced (`docs/AGENT-NEUTRALITY.md`)

## 🔗 Related

- [[CORE-EPIC-460]] — parent epic: platform-parity gate widening
- [[CORE-458]] — precedent: grok-trigger-table (the 11-row shape being mirrored)
- [[CORE-460.3]] — sibling: `--park`/`--worktree` flag parity; established Pair I

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** [[CORE-460.3]] shipped Pair I two days ago with an explicit
  `continue` guard that skips a section naming no flag, and its own prose names
  this task as the owner of Codex's backfill — "Codex is picked up automatically
  the moment it gains its first flag row." The gate is in place and waiting; the
  surface it guards is still 4 rows. Nothing since has touched the Codex section.

- [x] Read relevant source files — `docs/PLATFORMS.md` (§"Today's surface",
  §"Installed-surface policy", §"Worked example: Codex CLI", §"Non-Claude
  capability triggers" in full — all four agent tables), `claude/CAPABILITIES.md`
  (full), `claude/skills/ft-release/SKILL.md` §7.1 Pair I, `docs/AGENT-COMPAT.md`
  §"Reading the cells" + matrix rows, `codex/AGENTS-snippet.md`, and six
  `codex/skills/*/SKILL.md` wrappers (`ft-task`, `ft-goal-task`,
  `ft-file-followup`, `ft-micro-task`, `ft-audit`, `ft-audit-repo`,
  `ft-release`). No probe — named files, known shape.

- [x] **Best Practices Review** — `N/A` for module boundaries; this is doc +
  wrapper surface only. The one boundary that matters is editorial: the four
  agent tables in §"Non-Claude capability triggers" share a fixed four-column
  shape but deliberately *differ* in cell content per platform (Grok's rows carry
  a compat-surface-loading caveat Cursor's drop). Extending that shape is the
  established pattern; normalizing Codex's cells to Grok's wording would be the
  violation. No refactor needed, none deferred.

- [x] **Archive skim** — `grep -l` over `archive/core/*.md` for
  `docs/PLATFORMS.md` (12 recent hits), `codex/skills/ft-audit` (6 hits, the
  `CORE-EPIC-389` cohort), and `claude/CAPABILITIES.md` (6 hits). Read
  [[CORE-460.3]], [[CORE-458]], [[CORE-386]], and [[CORE-389.4]] in the relevant
  parts. Two load-bearing findings in Discovery Notes below.

- [x] **Drift check** — three deviations, all surfaced to the operator before
  writing. Details in Discovery Notes; the PLAN line's own "11-row shape" figure
  verified current (it was [[CORE-460.3]]'s own reconcile edit — Grok and Cursor
  both stand at 11 rows today, counted).

- [x] Asked clarifying questions — three, all answered; see Discovery Notes.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### The gate is already green, and that is the point

Pair I's fence runs clean today. Its section guard is Pair F's `continue` idiom
one level up: a section naming *no* flag is skipped, not failed, so Codex's
4-row table and the three stub sections don't mint false positives on the
check's first run. Verified by running the fence as-shipped — the derived roster
resolves to `--fast --debug --worktree --park` and nothing prints. That means
this task's real test is the **negative** one: after the backfill, dropping any
single flag from the Codex table must fire `MISSING TRIGGER FLAG ### Codex CLI`.
A green fence before and after proves nothing on its own.

### Row shape: Codex's availability story is not Grok's

Grok and Cursor reach the flags by *loading the canonical `claude/skills/`
bodies* off a compat surface — that is what their rows' "same availability as
`--fast`" framing encodes. Codex is the one non-Claude platform that ships its
own wrappers, so its story differs and the rows must say so rather than copy:

- `--park` / `--worktree` — the `ft-file-followup` / `ft-goal-task` wrappers
  route straight to the canonical body, so the flag and its lazy fragment
  (`park-mode.md`) resolve relative to that body. `ft-file-followup`'s wrapper
  frontmatter already names `--park` by hand; `ft-goal-task`'s does not name
  `--worktree` (a tail asymmetry, noted not fixed — out of this line's scope).
- `--fast` / `--debug` — `ft-task`'s wrapper is the one that routes to
  `SPEC/procedures/ft-task.md` **first**. The SOP names *autonomous mode* and
  *debug mode* as neutral primitives and records the Claude spellings; the
  literal flag parse lives in the Claude body the wrapper falls back to. The row
  should describe that two-step honestly rather than assert a flat "same
  spelling" claim.

### Finding 1 (archive) — the wrapper's "needs no change" precedent is about *content*

[[CORE-386]] and [[CORE-389.4]] both explicitly cleared
`codex/skills/ft-audit/SKILL.md` as needing no edit — "a 15-line 'read the
Claude file' pointer (inherits automatically)", "carries no family enumeration
(grep-verified)". Both conclusions are correct **and** don't reach Finding #6.
They are about inherited *body content*; Finding #6 is about the **install
boundary of the wrapper file itself**. The Claude body's fork note (line 12)
phrases its target as `.claude/skills/audit/`, which is the wrong path for a
Codex adopter, and `codex/AGENTS-snippet.md` §"One-time skill wiring"
deliberately omits `ft-audit` from the symlink block without saying why. An
adopter who opens the wrapper alone has no signal not to symlink it. So the note
is a genuine addition, not a duplication of the inherited line — recorded here
because the archive reads the other way at first glance.

### Finding 2 (archive) — the stamp means "last dogfood run"

[[CORE-458]] faced this exact question for Grok and resolved it explicitly:
the `**Last verified:**` stamp "denotes the last actual first-use dogfood session
under Grok", so desk research does not move it. It left the stamp untouched and
instead **appended a provenance sentence** to the table's first-use-verification
paragraph. That is the precedent this task follows.

### Drift check — three deviations

1. **The Codex Sub-agent row is factually stale.** It reads "No documented
   sub-agent spawn primitive exposed to the operator" and prescribes a
   second-session approximation. Vendor docs now document native Codex
   subagents: three built-ins (`explorer` read-heavy, `worker` execution,
   `default` general-purpose), custom TOML agents under `.codex/agents/` /
   `~/.codex/agents/` with an optional `sandbox_mode = "read-only"`, spawning by
   natural-language request, and `/agent` (alias `/subagents`) to switch and
   inspect agent threads. This is [[CORE-458]]'s Grok fix in the same shape.
   **Operator: rewrite in-scope.**
2. **"restamp last-verified" contradicts Finding 2.** The PLAN line says restamp
   flatly; the stamp semantics say a desk-research pass under Claude Code is not
   a Codex dogfood. **Operator: leave the stamp, append the provenance line** —
   the [[CORE-458]] pattern. The Acceptance criterion is satisfied by *reasoning
   to* "stamp semantics unchanged", not by skipping the question.
3. **Codex's three prose asides were skipped by [[CORE-460.3]] on purpose.**
   That task de-enumerated six Grok/Cursor asides into pointers and left Codex's
   alone precisely because Codex named no flags. Once it does, the asymmetry is
   live. **Operator: add all three pointers.**

### Vendor sources (desk research, 2026-08-21, under Claude Code)

- `learn.chatgpt.com/docs/developer-commands?surface=cli` — `/model` (change
  active model mid-session), `/clear` ("clear the terminal and start a fresh
  chat"), `/compact` ("summarize the visible chat to free tokens"), `/agent` +
  `/subagents` ("switch the active agent thread"), `/skills`, `/permissions`
  (with `/approvals` as a surviving alias).
- `learn.chatgpt.com/docs/agent-configuration/subagents.md` — the subagent
  model summarized above.
- **Structured ask: no positive finding.** No multi-option question primitive
  appears in the slash-command reference. All 18 `codex/skills/*/SKILL.md`
  wrappers already instruct a prose ask, and the CORE-258 first-use note records
  cues rendering legibly in conversation with labels as the durable fallback.
  The row therefore states prose-as-floor and invites an update on observation —
  it does not assert absence as a vendor fact.

### Explicit assumptions

- Grok's 11-row order is the target ordering (Effort · Skill invocation · four
  flags · Model · Context · Structured ask · Sub-agent · Procedure pointer).
  Codex already has Effort, so 4 + 7 = 11 lands exactly on Grok's shape. Cursor's
  11 differ (no Effort, plus a Modes row) — Codex gets no Modes-equivalent row,
  since `/permissions` is a sandbox control, not a reasoning-surface switch.
- `ft-audit-repo` and `ft-audit-context` wrappers get no fork note: both are
  run-by-reference global utilities with no fork step.

Discovery surfaced a stale factual row, a PLAN-line contradiction with an
established stamp convention, and a third de-enumeration surface — three
operator asks that each changed what lands → fire 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended three established shapes, invented none.
  (1) The trigger tables' fixed four-column row, following [[CORE-458]]'s and
  [[CORE-460.3]]'s instruction to match a sibling row's phrasing style — but
  deliberately *not* copying Grok's cells, because the tables already differ
  per platform by design and Codex's availability story is genuinely different
  (own wrappers vs. compat-surface loading). (2) [[CORE-460.3]]'s
  de-enumeration idiom for the three pointer clauses, reusing its exact
  "Those bodies' … operator flags come with them" phrasing so the four
  platforms' asides read as one family. (3) The Claude `ft-audit` body's own
  fork note (line 12) as the model for the Codex wrapper note, translated to
  `.agents/skills/` per the wrapper's existing translation bullet.

- [x] **Minimal refactor gate** — no refactor. Twelve surgical doc edits
  across four files: 7 new table rows, 1 rewritten row, 1 appended provenance
  sentence, 3 pointer clauses, 1 wrapper note, 1 one-word ledger correction.
  Grok's, Cursor's, and the three stub sections' content is byte-identical.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — Pair I's check fence **is**
  the test; run positive and negative below rather than asserted.

**Implementation Notes:**

Twelve edits across four files.

**`docs/PLATFORMS.md`** (the substance):

1. §"Non-Claude capability triggers" → Codex CLI table: 7 new rows —
   Force-skip (`--fast`), Debug mode (`--debug`), Park mode (`--park`),
   Worktree handoff (`--worktree`), Model / session switch, Context
   freshness, Structured ask. 4 → 11, in Grok's exact row order.
2. Same table: **Sub-agent / isolated exploration** rewritten from
   "No documented sub-agent spawn primitive" to the native model
   (`explorer` / `worker` / `default`, custom TOML agents with
   `sandbox_mode = "read-only"`, `/agent` + `/subagents`, `[agents]`
   config), mapping `explorer` → probe and `worker`/`default` → delegate.
3. Codex first-use-verification paragraph: appended the provenance sentence.
4. §"Today's surface" Codex row: pointer clause.
5. §"Worked example: Codex CLI": new **Operator flags** bullet, matching
   Cursor's and Grok's, plus the `ft-task` SOP-first caveat.

**`docs/AGENT-COMPAT.md`** — Codex matrix row gains the same pointer clause
Grok and Cursor carry, phrased to name the wrapper-routing step.

**`codex/skills/ft-audit/SKILL.md`** — the fork-don't-symlink blockquote, which
also explains *why* `ft-audit` is absent from the snippet's symlink block.

**`docs/AGENT-NEUTRALITY.md`** — one word, surfaced by the Phase 4 sweep:
the ledger's §"Sessions, loops, and sub-agents" note called the non-Claude
sub-agent surfaces "approximations". With Grok's row fixed at [[CORE-458]] and
Codex's fixed here, no approximation remains — every documented row is now a
native primitive. `approximations` → `equivalents`. In scope because this
task's own edit is what made the word false.

**Why the rows aren't copies.** Grok and Cursor reach the flags by loading
canonical `claude/skills/` bodies off a compat surface; their cells say so.
Codex ships wrappers, and `ft-task`'s wrapper reads `SPEC/procedures/ft-task.md`
*first* — the SOP names *autonomous mode* / *debug mode* as neutral primitives
and records the Claude spellings, with the literal parse living in the fallback
body. The `--fast` and `--debug` rows describe that two-step; `--park` and
`--worktree` describe the simpler direct-routing case. Copying Grok's "same
availability as `--fast`" framing would have asserted a mechanism Codex
doesn't use.

**Not fixed, deliberately.** `codex/skills/ft-goal-task/SKILL.md`'s frontmatter
doesn't name `--worktree`, where `ft-file-followup`'s names `--park`. Noted in
the `--worktree` row's Syntax cell so the table doesn't overstate the wrapper's
self-description; the wrapper edit itself is outside this line.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — Pair I's fence plus three
  adjacent §7.1 fences that name the touched files. All four clean; the Pair I
  negative simulation fired correctly.

- [x] Ran lint/type-check on changed code — `N/A`: markdown doc + one skill
  wrapper only. The repo's six validation commands cover `viz/` TypeScript and
  `tools/*.mjs`; neither has changed input.

- [x] **Quality assertions** — no avoidable duplication: the seven new rows
  restate `CAPABILITIES.md`'s *effects* but each carries Codex-specific syntax
  and availability, which is the table's whole reason to exist; the three
  pointer clauses *remove* the temptation to enumerate rather than adding a
  fourth roster. No dead content — the rewritten sub-agent row replaces the
  stale claim in place rather than leaving both. No public-surface growth: no
  new glyph, gate, banner, frontmatter key, table column, or release pair (Pair
  I already existed and was built for this). No stale code-facing documentation
  left behind — the Phase 4 sweep caught the one word my own change falsified
  (`docs/AGENT-NEUTRALITY.md`).

- [x] (frontend) Asked the user for visual confirmation — `N/A`; no frontend
  surface (`viz/` untouched).

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Pair I — positive.** The fence as shipped in `claude/skills/ft-release/SKILL.md`
§7.1, run verbatim against the edited `docs/PLATFORMS.md`: prints nothing. The
derived roster resolves to `--fast --debug --worktree --park`; all four now
appear in the Codex section, so it passes the guard *and* the completeness
check rather than being skipped by it.

**Pair I — negative (the load-bearing one).** The fence was already green
before this task, because the section guard skips a section naming no flag. So
a green run proves nothing on its own. Dropping the `--worktree` row from the
Codex table only:

```text
MISSING TRIGGER FLAG Codex CLI :: --worktree
```

Exactly one line, naming the right section and the right flag — Grok's and
Cursor's rows survived the edit and stayed silent. Codex is now genuinely
under the gate rather than exempted by it, which was the task's point.

**Adjacent §7.1 fences** (touched files, checked for collateral breakage):

- Codex snippet installs exactly the policy subset (`diff -u`) — clean.
- No forbidden slug in the Codex snippet's symlink block — prints nothing;
  `ft-audit` is still correctly absent, which the new wrapper note now explains.
- Pair G (`--worktree` present in both mirrors) — prints nothing.

**Row-shape verification.** Grok, Codex, and Cursor all count 11 rows; Codex's
row order was diffed against Grok's and matches 1:1 across all eleven.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 18 entries, verdicts below

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

### Doc-drift sweep — 18 entries

| Doc | Verdict |
|---|---|
| `README.md` | no change — its `--fast` bullet discusses one flag's semantics, not a per-agent roster |
| `AGENTS.md` | no change — peer-skill roster is names-only by design (Pair F-gated `KEEP IN SYNC` comment); not a trigger table |
| `SPEC.md` | no change — contract layer; §"Skill namespace" and the two-layer model untouched |
| `docs/MIGRATION.md` | **no change made — finding flagged.** `:72` and `:294` carry Grok-scoped `--fast` / `--debug` asides that read as complete rosters — the same defect class [[CORE-460.3]] closed in six places, and not in its surveyed set. Different platform, different section, outside this line's Codex scope; recorded here for [[CORE-460.N]] |
| `claude/AGENTS-snippet.md` | no change — describes flags per-skill in an agent-neutral paste-block, not per-agent |
| `codex/AGENTS-snippet.md` | no change — owns wiring commands only; Pair I explicitly records the thin snippets as deliberately not mirrors. Its `ft-audit` omission is now *explained* by the new wrapper note rather than needing its own text |
| `cursor/AGENTS-snippet.md` | no change |
| `grok/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change — `--fast` appears once inside CI rationale |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |
| `docs/AGENT-NEUTRALITY.md` | **updated** — §"Sessions, loops, and sub-agents" row called non-Claude sub-agent surfaces "approximations"; with Grok fixed at [[CORE-458]] and Codex fixed here, every documented row is a native primitive. One word → `equivalents` |
| `docs/PLATFORMS.md` | **updated** — 5 edits; the task's primary surface |
| `claude/CAPABILITIES.md` | no change — Claude-side roster already carries all four flags; its `Last verified` stamp is a release-gate concern, not this task's |
| `docs/AGENT-COMPAT.md` | **updated** — Codex matrix row gains the triggers-table pointer clause |
| `docs/EXTERNAL-AGENTS.md` | no change — grep-verified: names Codex only as an example handoff target, makes no sub-agent-capability claim |
| `docs/WORKTREES.md` | no change — `--worktree` described as an entry point, not enumerated as a roster |
| `docs/GLOSSARY.md` (via CONVENTIONS chain) | no change — no per-agent trigger vocabulary |

**Final Summary:**

Codex's capability-trigger table went from 4 rows to 11 — matching Grok's shape
exactly — so the Pair I release gate that shipped two days ago now actually
guards it instead of skipping it. Along the way the table's sub-agent row, which
claimed Codex has no sub-agent primitive, was rewritten against vendor docs that
now document a native one.

**Deliverables** (4 files, +31/−4 before the tasknote):

- `docs/PLATFORMS.md` — 7 new trigger rows (`--fast`, `--debug`, `--park`,
  `--worktree`, Model / session switch, Context freshness, Structured ask), the
  rewritten **Sub-agent / isolated exploration** row, a provenance sentence on
  the first-use-verification paragraph, and 2 pointer clauses (§"Today's
  surface" Codex row, §"Worked example: Codex CLI" Operator-flags bullet).
- `docs/AGENT-COMPAT.md` — Codex matrix row pointer clause (1 line).
- `codex/skills/ft-audit/SKILL.md` — fork-don't-symlink blockquote (+10 lines).
- `docs/AGENT-NEUTRALITY.md` — one word, surfaced by the doc-drift sweep.

**Verification:** Pair I's fence run verbatim — clean positive, and a negative
simulation dropping one Codex flag row produced exactly
`MISSING TRIGGER FLAG Codex CLI :: --worktree` with Grok and Cursor silent. The
negative is the load-bearing one: the fence was already green before this task
because its `continue` guard skips a flagless section. Three adjacent §7.1
fences (Codex snippet subset diff, forbidden-slug check, Pair G) re-run clean.
Row counts verified 11/11/11 and Codex's order diffed 1:1 against Grok's.
Lint/typecheck `N/A` — no `viz/` or `tools/` input changed.

**Refactors:** none made, none needed. Deliberately not fixed:
`codex/skills/ft-goal-task/SKILL.md`'s frontmatter omits `--worktree` where
`ft-file-followup`'s names `--park` — disclosed in the row's Syntax cell rather
than silently papered over.

**Three operator decisions** shaped this beyond the PLAN line: rewrite the stale
sub-agent row in-scope; leave the `(dogfooded)` stamp untouched and append
provenance instead (the [[CORE-458]] precedent — the PLAN line's flat "restamp"
would have claimed a Codex session that never happened); and complete
[[CORE-460.3]]'s de-enumeration across Codex's three asides.

**Documentation verdict:** 4 of 18 AI-referenced docs updated. One finding
logged not fixed — `docs/MIGRATION.md:72` / `:294` carry Grok-scoped two-flag
asides of the same class [[CORE-460.3]] closed elsewhere, left for
[[CORE-460.N]] since they belong to a different platform's surface.

**Maintainability effect:** the epic's stated theme was gates that lag the
surfaces they guard. Codex was the last non-Claude platform sitting outside Pair
I — not because the gate was broken, but because its own safety guard exempted a
table with nothing to check. That exemption is now spent: all three
wrapper-bearing platforms are inside the gate, and a fifth flag added to
`CAPABILITIES.md` fails the release for every one of them the day it lands.

**Archived:** 2026-08-21
