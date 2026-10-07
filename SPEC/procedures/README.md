# Procedure SOPs

Agent-neutral **procedure SOPs**: the source-of-truth projection of a
flaitron *execution procedure* (e.g. driving the `/ft-task` 4-phase
workflow) for contract-only agents that lack Claude Code's skill
machinery.

Each `SPEC/procedures/<procedure>.md` describes how to *execute* a
procedure in plain, agent-neutral steps — distinct from the `SPEC/*.md`
lazy modules one level up, which carry contract *rules* loaded on demand
by the Claude `/ft-task` SKILL dispatch. A procedure SOP is loaded
instead by a thin per-agent **pointer wrapper**
(`<platform>/procedures/<procedure>.md`, e.g.
`grok/procedures/ft-task.md`, `codex/procedures/ft-task.md`,
`cursor/procedures/ft-task.md`) that
routes the agent here rather than copying the steps.

## Why this layer exists

Claude Code enforces the 4-phase gates through its skill files; a
contract-only agent (Codex CLI, Grok Build, …) drives the same workflow
conversationally from `AGENTS.md` + `SPEC.md`. A neutral SOP narrows that
adherence gap without copying Claude-specific machinery (`AskUserQuestion`,
slash dispatch). Two-layer model:
[`docs/PLATFORMS.md`](../../docs/PLATFORMS.md); neutrality posture:
[`docs/AGENT-NEUTRALITY.md`](../../docs/AGENT-NEUTRALITY.md). Not to be
confused with [`docs/DOGFOOD.md`](../../docs/DOGFOOD.md), the *operator*
verification runbook.

## Frontmatter schema

Every `SPEC/procedures/<procedure>.md` opens with a YAML frontmatter
block carrying three required fields and one optional one:

| Field | Required | Meaning |
|---|---|---|
| `procedure:` | yes | The procedure slug, matching the `ft-` skill/command name cross-platform per [`SPEC/layout.md` §"Skill namespace"](../layout.md) (e.g. `ft-task`). |
| `source:` | yes | The surfaces this SOP **mirrors** and is kept in sync with — the canonical Claude wiring it is derived from, plus any other file it restates closely enough that a change there implies a change here. One or more **space-separated** paths; a directory covers everything beneath it, so a skill's lazy fragments stay watched without listing each (e.g. `claude/skills/ft-task/ templates/tasknote-template.md`). The drift-tracking anchor for tier 1 of the currency check below. |
| `restates:` | no | Broad contract surfaces the SOP **paraphrases rather than mirrors** (e.g. `SPEC.md`). Same space-separated form. These feed tier 2 of the currency check — an advisory count, not per-commit candidates — because a file the whole repo edits changes far too often for commit-level adjudication to stay readable. Omit when the SOP restates nothing outside `source:`. |
| `last-verified:` | yes | Currency stamp, mirroring the [`docs/PLATFORMS.md`](../../docs/PLATFORMS.md) / [`claude/CAPABILITIES.md`](../../claude/CAPABILITIES.md) convention — `<version> · <YYYY-MM-DD>`. Bumped when the SOP is re-checked against its watched surfaces (`source:` + `restates:`). |

**Why two fields.** A `source:` commit that skipped the SOP is probably drift,
so each is worth adjudicating; a `SPEC.md` commit usually touches contract the
SOP never restates, so naming each would bury the real signal. Splitting them
keeps the adjudication list short without letting broad-contract drift go
unseen.

**Flagged at release, never bumped by it.** `last-verified:` records a
SOP↔upstream sync event, not a release pin — a release cut leaves it untouched
even though it carries a version prefix. A stamp nothing reads goes stale
silently, so `/ft-release` Step 5 runs a **flag-don't-bump** check, in two
tiers, both anchored on the stamp's **date**:

- **Tier 1 (`source:`)** — lists commits since that date that did not also touch
  the SOP, one adjudicable candidate each, routing a real finding to a follow-up
  tasknote.
- **Tier 2 (`restates:`)** — reports a single count per path, to skim.

The date is the anchor because the version half decouples from it whenever a SOP
is re-checked mid-cycle. Advisory only — a stale SOP never blocks a release.

Example:

```yaml
---
procedure: ft-task
source: claude/skills/ft-task/ templates/tasknote-template.md
restates: SPEC.md
last-verified: v5.1.0 · 2026-06-02
---
```

`source:` records derivation, not ownership: the long-term source of truth is
the neutral SOP, but the Claude skill stays canonical wiring until a generator
reconciles the two. The SOP is hand-authored *from* its watched surfaces, and
`last-verified:` tracks that sync.

## Loading convention

1. A contract-only agent is asked to run a flaitron procedure (e.g.
   "start CORE-123" → the `ft-task` procedure).
2. The agent's per-platform wrapper `<platform>/procedures/<procedure>.md`
   routes it to `SPEC/procedures/<procedure>.md` (it points; it does not
   restate the steps).
3. The agent loads this SOP and executes the procedure conversationally,
   substituting its own primitives where the SOP names a Claude-specific
   one (e.g. a prose ask in place of `AskUserQuestion`).

Claude Code does not use this layer — it runs the richer
`claude/skills/<procedure>/SKILL.md` directly. The SOP is the floor for
agents without that wiring, not a replacement for it.
