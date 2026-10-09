# Model field

> Lazy-loaded SPEC module. Loaded by the Step 1.5 model gate of `/ft-task` and `/ft-micro-task`, only on the gate's edge cases (a category tag the active model is under-tier for, a concrete tag that mismatches the active model, or a PLAN line lacking a `[model]` segment). Consulted, not force-Read, by the filing and choosing skills (`/ft-file-followup`, `/ft-epic-discovery`, `/ft-audit`, `/ft-audit-repo`, `/ft-refactor`) when they pick a `[model]` token. See `SPEC.md` for the always-loaded core spec.

The model assignment lives on the PLAN.md task line — the `[model]` segment
of §"Task-line format". PLAN.md is the source of truth. The token is a short
identifier representing the cognitive load of the task.

Flaitron's recommended primary labels are `[heavy]` (design, multi-file,
high ambiguity, or exploratory work), `[medium]` (multi-step, well-scoped),
and `[light]` (mechanical, well-scoped, clear-diff implementation). A fourth,
**chooser-assignable** rung — `[frontier]`, glyph 💎 — sits above `heavy` for
work where a wrong answer costs more than tokens; it is reached by trigger,
never by default (§"When to choose `[frontier]`"). A fifth, **manual-only**
rung — `[xheavy]`, glyph 🔭 — sits above `frontier` for operator-driven
exploratory work; it is deliberately **not** a primary filing label, and
automated choosers cap at `[frontier]` (see §"Category-vs-concrete
matching"). Adopters MAY use any short token they prefer
(e.g. `fable`, `opus`, `sonnet`, `haiku`, `grok`, `codex`, `gpt-5`, `gemini-pro`, project-specific names).
The visualizer parser accepts any short lowercase token (`[a-z][\w.-]*`).

`/ft-task` reads the model BEFORE scaffolding (see `claude/skills/ft-task/preamble.md`
§"Model gate", run at its Step 1.5). The gate matches a **concrete** tag (`opus`/`sonnet`/`grok`/…) by exact
identity and a **category** tag (`[xheavy]`/`[frontier]`/`[heavy]`/`[medium]`/`[light]`) by *tier* — see
§"Category-vs-concrete matching" below:

- Tag satisfied — concrete tag equals the active model, OR category tag whose
  tier the active model meets or exceeds → proceed silently.
- Concrete tag differs from the active model → block and offer two paths: switch
  the active model via `/model <X>` then re-invoke `/ft-task`, or retag the
  PLAN.md line to the active model and proceed. No silent overrides. A retag
  changes only the `[model]` token — copy any other trailing bracket token
  (`[unattended]`, a stacked `[model]` tolerance) verbatim from the original
  line (`SPEC.md` §"Task-line format").
- Category tag tagged heavier than the active model's tier (e.g. `[heavy]` on a
  lower-tier model such as `grok` (medium) or `haiku` (light)) → emit a ⚠️ inline
  advisory note and proceed; the operator decides whether to escalate or keep the
  lighter model. Never a silent block.
- PLAN.md line has no `[model]` (legacy entry) → ask the user via a
  structured ask at `/ft-task` entry, before any scaffolding work.

A task runs end-to-end on a single model — no swapping mid-task between
Discovery, Execution, Testing, or Closure. If scope grows and the tagged
model no longer fits, retag the PLAN.md line and re-invoke; do not silently
swap.

When suggesting a next task, name the recommended model alongside the task
ID — the model is part of the PLAN.md grammar, so it's already known without
asking.

## Category-vs-concrete matching

The `[model]` tag is matched against the active model by one of two rules,
depending on whether the tag is a **category** label or a **concrete** name.

**Concrete tag** (`fable`, `opus`, `sonnet`, `grok`, `gpt-5`, `haiku`, …) — matched by
exact identity. The operator filed a specific assignment, so a different concrete
active model is a hard mismatch (block + offer switch-or-retag).

**Category tag** (`[xheavy]` / `[frontier]` / `[heavy]` / `[medium]` / `[light]`) — matched by
**tier**, not string. Tiers form an ordered ladder:

```text
light  <  medium  <  heavy  <  frontier  <  xheavy
```

**The `xheavy` rung is manual-only.** `[xheavy]` marks open-ended exploratory
work — multi-session research, greenfield architecture, high-uncertainty
design — that an operator drives by hand. Two properties follow:

- **Automated choosers cap at `[frontier]`.** An orchestrator or any other
  automated chooser must never assign `[xheavy]` to a task nor pick up an
  `[xheavy]`-tagged one; the tag is the operator's deliberate opt-in. This is
  prose contract, not gate machinery — no lock, no park, per
  [`docs/VISION.md`](../docs/VISION.md) §"What we won't accept".
- **No roster model self-assesses at the `xheavy` band by default.** The rung
  labels the *task's* cognitive load, above what any default-effort
  configuration bands at in `docs/PLATFORMS.md`
  §"Platform×model×effort calibration table". An `[xheavy]` tag therefore
  always lands the gate's ⚠️ under-tier advisory —
  note-then-proceed, never a block — which is expected, not an error: the note
  marks the deliberate entry into exploratory territory, and the operator (who
  is present by definition) decides how to run it.

Each concrete model has an inherent tier. This remains **guidance for the agent
to self-assess at gate time** — the gate never requires a lookup. The dated
per-family roster, effort ladders, and default-effort bands live in
`docs/PLATFORMS.md` §"Platform×model×effort calibration table", refreshed at
releases. Calibration baseline:

- **`frontier`** — each vendor's top-of-roster model, the step above the
  workhorse flagship: `fable` (with its limited-access `mythos` sibling) and
  peers; on a platform whose roster has no such model above its flagship,
  that flagship dialed up to `xhigh` (e.g. OpenAI's Astra) can also earn a
  `frontier` verdict — `opus` cannot, since `fable` sits above it. A platform
  with no frontier-band configuration lands the ⚠️ under-tier advisory on
  `[frontier]` work, and the map names the switch (§"Effort recommendations"
  below).
- **`heavy`** — deep-reasoning, large/long-context models at their default
  (unadjusted) effort setting: `opus` and peers; a `medium`-tier
  model dialed up to its highest effort setting can also earn a `heavy`
  verdict — see §"Effort axis" below.
- **`medium`** — capable mid-tier models that handle multi-step, well-scoped work
  reliably without the deep-reasoning / large-context profile that defines
  `heavy`: `sonnet`, `grok`, `codex` at its own recommended default effort, and
  peers. A medium-tier model comfortably covers both `[light]` and `[medium]`
  task work; it gets the ⚠️ under-tier note only on a `[heavy]`-or-above task. `sonnet`
  sits at the top of this rung but stays `medium` deliberately: the ladder
  labels the *task's* cognitive load, not the model's benchmark position, so a
  `[heavy]` task on `sonnet` still earns the advisory and the operator still
  makes the call.
- **`light`** — fast, small implementation models for mechanical, clear-diff
  work: `haiku`-class and peers.

The match compares the active model's tier against the tag's tier:

| Active vs. tag tier | Gate action |
|---|---|
| equal (`[light]` on light-tier, `[heavy]` on heavy-tier) | proceed silently |
| active **heavier** than tag (`[light]` on a heavy- or medium-tier model) | proceed — overkill is harmless, no flag |
| active **lighter** than tag (`[heavy]` on a lower-tier model, e.g. `grok`; `[frontier]` on `opus`) | ⚠️ inline advisory note, then proceed — operator decides whether to escalate; **not** a block |
| tag is `[xheavy]` (any active model) | **always** the ⚠️ inline advisory — no roster model bands at `xheavy` by default, so the tag is above every active tier; note-then-proceed, expected rather than exceptional (see "The `xheavy` rung is manual-only" above) |

## Effort axis (orthogonal to model choice)

Vendor APIs commonly expose a second axis alongside the choice of named
model: a reasoning-*effort* setting (per-family ladders and defaults: the
`docs/PLATFORMS.md` calibration table). This is orthogonal to the tier
ladder above: the *same* named model can be pushed toward `heavy`-band output
by raising its effort setting, or throttled toward `light`-band output by
lowering it.

Flaitron's tier stays a **cognitive-load label for the task** — a `[heavy]`
task is satisfied equally by a big model at low effort or a small model at
high effort, whichever the operator's session is actually running. The
`docs/PLATFORMS.md` §"Platform×model×effort calibration table" is the
maintained reference for where those combinations land. The Step 1.5 gate reads the *active model's*
self-assessed tier at gate time (this section); it does not separately read
or require an effort parameter.

Effort level and context-window size are both **session/agent configuration,
not PLAN.md fields**. The `[model]` token stays the bare family name whatever
variant the session runs: a 1M-context Opus session filed against a `[heavy]`
task is still `opus` — there is no `[opus-1m]` or `[opus-xhigh]` token, and a
variant suffix would fragment the token vocabulary for no signal gain.
Variants shift where a model lands on the tier ladder (that is the point of
this section); they do not multiply the vocabulary.

The ⚠️ note is an inline advisory only — not an operator-gate banner and not an
approval pause; the standing phase-gate count is unaffected. ⚠️ is not an
operator cue at all: it sits in the **non-cue residual** class
([`SPEC/cue-vocabulary.md` §"Glyph layers and reuse"](cue-vocabulary.md)), so nothing in the cue
vocabulary's emission contract governs it. In particular it is *not* the
emphasized shape 👁️ `CONFIRM` carries — 👁️ is an obligation-bearing ask that
gates task completion, while ⚠️ requires no operator response and stays a plain
inline note.

**No auto-retag.** A satisfied category tag is **never** rewritten to the concrete
running model. `[heavy]` stays `[heavy]` even when it runs on opus — the category
carries the task's cognitive-load signal (scannable, agent-neutral filing),
which a silent rewrite to the run's model would destroy.

## Effort recommendations

The gate stays tier-only. Effort enters where a session is *chosen* — the
next-move suggestion, or an orchestrator picking a model for a tagged task —
and there the recommendation names a concrete **`model @ effort`** for the
active platform, read from the tier × platform map in `docs/PLATFORMS.md`
§"Platform×model×effort calibration table". This module owns the rule; the
map owns the dated cells (vendor rosters move; the rule does not).

- **Effort vocabulary.** A recommendation names only `medium`, `high`, or
  `xhigh`. Never `low` — it trades reliability for tokens — and never `max`,
  which spends past the point of reliability gain. Vendor ladders may list
  more settings; the map records them as facts, not picks.
- **Reliability over tokens.** Every map cell's effort reaches the vendor's
  default or above it (a range such as `medium–high` qualifies when its top
  does), and where a cell gives a range, the upper end is the pick when in
  doubt. A re-run after a wrong answer costs more than the effort it saved.
  The round-up default (§"Practical guidance and agent-aware defaults")
  picks the tier; this bias picks the effort within it.
- **No frontier model on the platform.** The map flags the gap with ⚠️ and
  names the nearest cell plus a platform switch — advice, never a block.
- **Printing a cell.** A suggestion prints one pick from the active
  platform's cell: the primary model at the top of any effort range — a
  one-line pick cannot weigh doubt, so it always takes the upper end — with
  any `(alt …)` dropped (`Fable @ high–xhigh` → `Fable @ xhigh`). A ⚠️ cell
  prints as `⚠️ <model @ effort>` (`⚠️ Grok @ xhigh`), its trailing note
  dropped; the platform switch the map names under the table goes in prose
  where a switch is offered, never inside the pick. No cell, no pick:
  `[xheavy]` (manual-only), a concrete token (it already names its model),
  or a platform the map has no column for.

`model @ effort` is prose notation in suggestions and the map, never a
PLAN.md token (§"Effort axis").

## Practical guidance and agent-aware defaults

The labels exist to let the operator (and the agent) match the *cognitive shape*
of the work to the model's "thinking budget" for that turn. They are
observations from real usage, not rigid policy — with one standing bias:

**The round-up default.** `[medium]` is the default tag for a new filing.
Escalate freely to `[heavy]` on any ambiguity or design smell; reserve
`[light]` for work that is **provably mechanical** — a clear diff already in
mind, no judgment calls left. **When in doubt, round up.** This rule binds
automated choosers especially: an under-powered pick wastes a whole session
before anyone notices, while an over-powered one merely costs a little
headroom — the asymmetry is the argument. **Round-up stops at `[heavy]`:**
doubt alone never reaches `[frontier]` (its triggers do) nor `[xheavy]`
(only the operator does).

**Typical `[light]` work** (only when provably mechanical — clear diff in mind):

- Single-file edits, small refactors with a clear local pattern, adding tests
  or assertions, doc patches, config tweaks, simple bug fixes with obvious
  root cause.

**Typical `[medium]` work** (the default — the common middle of flaitron development):

- Multi-step but well-scoped changes with a clear shape: a feature spanning two
  or three known files, a refactor with a discoverable pattern, a bug fix whose
  root cause needs a little tracing. More than a clear-diff mechanical edit, but
  not deep cross-module synthesis or high-ambiguity design.
- Capable mid-tier models (`sonnet`, `grok`) sit here and cover both `[light]`
  and `[medium]` task work comfortably.

**When to choose `[heavy]`** (even on agents that otherwise favor light):

- Design decisions, high ambiguity, exploratory research that may re-scope
  mid-Discovery, new skills or design-bearing epic children, anything
  requiring synthesis across distant modules or contract surfaces,
  multi-file coordination without an obvious precedent.
- Rule of thumb: if Phase 1 Discovery surfaces "this is more than a clear-diff
  implementation or has hidden cross-cutting concerns," escalate the tag on
  the PLAN line and re-invoke rather than pushing a light model past its
  useful horizon.

**When to choose `[frontier]`** (chooser-assignable — trigger-reached only):

- **Contract or architecture design** — a change to a workflow contract, a
  public interface, a data model, or a system's shape.
- **High blast radius** — security, data migration, release, or fleet-wide
  edits, where a wrong answer is expensive to unwind.
- **Heavy-epic Discovery** — the `.1` Discovery of a `[heavy]`-or-above epic,
  whose scoping every child inherits.
- **Deep research and investigation** — a task whose deliverable *is* the
  finding (a root cause, a vendor or prior-art survey). Research that only
  informs an implementation stays `[heavy]`; open-ended multi-session
  research is `[xheavy]`.
- Not a trigger: a failed attempt alone, or ordinary design work — those stay
  `[heavy]`, as do audits by default.

**When to choose `[xheavy]`** (manual-only — never a default):

- Open-ended exploratory sessions the operator drives by hand: multi-session
  research, greenfield architecture with no precedent, design work whose
  scope is genuinely unknown at filing time. Filed deliberately by the
  operator, never by an automated chooser (which caps at `[frontier]`), and
  never reached by rounding up — round-up stops at `[heavy]`.

**Cross-provider calibration.** Agents differ in cost/quality curves on long
context and sustained reasoning; dated per-family observations sit
under the `docs/PLATFORMS.md` calibration table. Match the label to the *actual cognitive shape* surfaced in
Discovery, and resolve residual uncertainty toward the heavier tag — up to
`[heavy]` (the round-up default above).

The primary labels `[heavy]` / `[medium]` / `[light]` (plus a triggered
`[frontier]`) are the recommended starting vocabulary for new filers and for
keeping PLAN.md scannable. Specific names are the precision escape hatch when you have a strong observed preference
for a particular agent on a particular class of task.

**Pinning a named model.** A category tag only advises: `[heavy]` is satisfied
by any session at or above heavy tier, so it cannot route a task to one
specific model. When a task — an epic child included — must run on one named
model, file the concrete token (e.g. `[fable]`); the exact-identity gate then stops every
other session at its switch-or-retag block, so running elsewhere takes a
deliberate retag rather than a silent tier match. A concrete token fails
`[unattended]` candidacy clause 1, so a pinned row stays attended.

## Tier ladder vs. the next-move suggestion glyph

The five-rung tier ladder governs the **Step 1.5 gate**. The **next-move
suggestion glyph** (🔧 `LIGHT` / 🧩 `MEDIUM` / 🧠 `HEAVY` / 💎 `FRONTIER` /
🔭 `XHEAVY`) in the post-closure protocol
([`SPEC/post-closure.md`](post-closure.md) step 2) **mirrors that ladder 1:1**:
`[light]`→🔧, `[medium]`→🧩, `[heavy]`→🧠, `[frontier]`→💎, `[xheavy]`→🔭.
Concrete `[model]` tokens bucket to their inherent tier's glyph (e.g.
`sonnet`/`grok`→🧩, `opus`→🧠, `fable`→💎, `haiku`→🔧) — no concrete token
buckets to 🔭, since no roster model is inherently `xheavy`-band
(§"Category-vs-concrete matching"). The glyph stays a coarse
design↔mechanical fast-scan hint — five values, not two.
