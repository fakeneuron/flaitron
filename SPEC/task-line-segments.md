# Task-line segments — per-segment semantics and examples

> Lazy-loaded SPEC module, **consulted, not force-Read** — no skill step directs a Read of it, the same wiring [`SPEC/plan-parser.md`](plan-parser.md) has. Read it when you need what a segment *means*: authoring or reviewing a `PLAN.md` row, or implementing the grammar as an integrator ([`docs/EXTERNAL-AGENTS.md`](../docs/EXTERNAL-AGENTS.md)). The filing skills that cite it for per-segment facts (`/ft-file-task`, `/ft-epic-discovery`, `/ft-seed`) each carry the row shape they write inline, so none of them needs it loaded; the runners' shared `preamble.md` cites it for one fact (the legacy `## Critical` soft-migration) and likewise needs no load. A runner that only *reads* a row never needs it at all: capturing segments at Step 1 needs the grammar block and the ordering rule, both of which stay in [`SPEC.md`](../SPEC.md) §"Task-line format". See that section for the always-loaded grammar, and [`SPEC/plan-parser.md`](plan-parser.md) for tolerances, footguns, exclusions, and the reserved long-description conventions.

## Segment table

| Segment | Required | Notes |
|---|---|---|
| `- [ ]` / `- [x]` | yes | Open or completed checkbox |
| `**TASK-ID**` | yes | Bold ID, matching [`SPEC.md`](../SPEC.md) §"Task ID convention" pattern |
| ` [!critical]` | optional | Urgency flag — orthogonal to priority bucket. Flagged tasks render a red marker chip and sort to the top of the High column. Filed under whatever priority heading the row already lives under (typically `## High`). |
| ` [model]` | optional | Short identifier for the model assigned to this task. Recommended primary labels: `[heavy]` (design, multi-file, high-ambiguity, or exploratory work) \| `[medium]` (moderate, multi-step but well-scoped work) \| `[light]` (mechanical, clear-diff implementation). Two rungs sit outside the primary trio: `[frontier]` (chooser-assignable above `heavy`, but trigger-reached only — never a default) and `[xheavy]` (manual-only exploratory work; an automated chooser must never assign it). Specific names (`fable`, `opus`, `sonnet`, `haiku`, `grok`, `codex`, `gpt-5`, `gemini-pro`, etc.) are valid precision tokens; the parser accepts any short lowercase token. Owns the model assignment — `/ft-task` reads this BEFORE scaffolding (see [`SPEC.md`](../SPEC.md) §"Model field"). New entries should declare a model. |
| ` [unattended]` | optional | Task-level opt-in marker declaring this row safe to dispatch with **no operator present** — the row-scoped counterpart to the `--unattended` invocation posture ([`SPEC/gate-postures.md`](gate-postures.md)). Must sit AFTER `[model]`. Consumed by operator-less callers (see [`docs/EXTERNAL-AGENTS.md`](../docs/EXTERNAL-AGENTS.md)), which are expected to **deny by default**: an unmarked row is undecided, not approved. The runners read it too: on an attended invocation with no flag, it implies `--fast` — never the `--unattended` posture ([`SPEC/gate-postures.md`](gate-postures.md) §"`--fast` operator override"). Flaitron itself never writes it — seeding is an operator act. Parses into `Task.unattended: boolean`. |
| ` [handoff]` | optional | Task-level declaration that this row will **stop mid-run for a human act that is not another task** — a cross-repo filing prompt, a physical-access step, a credential. Not a dependency (nothing upstream completes to release it — that is `Blocked by [[ID]]`) and not an absent opt-in (no seeding makes it dispatchable): a durable property of the work, known at filing time. Sits in the same trailing run as `[unattended]`, AFTER `[model]`. An operator-less caller declines the row **even when `[unattended]` is also present** — the pair is mis-authored, and `[handoff]` wins. On an attended run it changes nothing: the hand-off is simply the work. Flaitron never writes it — marking is an operator act on the same footing as seeding `[unattended]`, and no filer proposes it. Parses into `Task.handoff: boolean`. |
| ` \| shortname` | optional | Short label up to ~30 chars; rendered as the row title in visualizers when present. Falls back to the tasknote frontmatter `title:` for tasks that have a tasknote, or the long description otherwise. |
| ` — long description` | optional | Full description. Carries `Completed YYYY-MM-DD.` markers, re-scope notes, and any rationale that doesn't fit in the shortname. |

## Examples

```markdown
- [ ] **CORE-023** [heavy] | task-line grammar — Extend grammar to declare shortname + model.
- [ ] **FE-200** [!critical] [heavy] | hotfix — Production breakage; floats to top of High.
- [ ] **BE-041** [light] [unattended] | regen fixtures — Mechanical; operator marked it safe to drain unattended.
- [ ] **DEPLOY-012** [medium] [handoff] | rotate API key — Stops for the operator to paste the new key; never dispatched headless.
- [ ] **CORE-016** [light] — Execute project adoption per CORE-008 playbook.
- [ ] **FE-003** | wikilink resolution — Parse [[TASK-ID]] in tasknote body text and render as clickable links.
- [ ] **CORE-024** [light] | quick housekeeping
- [ ] **CORE-016** — Execute project adoption per CORE-008 playbook.    (legacy)
```

## `[unattended]` candidacy

Because flaitron never seeds the marker, a filing surface *proposes* it
instead: every skill that writes a `- [ ]` row runs a conservative predicate
over the drafted line and, when attended, shows the candidates inside the
confirm gate it already has — the operator's confirmation is the act, and the
token is written only on confirmed rows. Under `--fast` / `--unattended` there
is no act, so the filer emits an `unattended-candidates:` line and writes no
token. Rows filed before or without that proposal are seeded in bulk through
`/ft-seed` — one attended walk, one gate, the same predicate. Predicate,
postures, persistence, bulk seeding, and the per-surface mirror table:
[`SPEC/unattended-candidacy.md`](unattended-candidacy.md).
