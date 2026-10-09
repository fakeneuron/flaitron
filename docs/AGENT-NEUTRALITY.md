# Agent-neutrality contract

## Principle

Flaitron's **contract layer** (`SPEC.md`, `SPEC/`, `templates/`, `docs/`,
`README.md`, `SECURITY.md`) is agent-neutral — any AI assistant reading
`AGENTS.md` should be able to follow the workflow contract
conversationally. Flaitron's **wiring layer** (`claude/`, `codex/`,
`cursor/`, and `grok/`) is platform-specific by
design:
slash commands, skills, structured-ask primitives, operator flags, and
adopter symlinks under paths such as `.claude/`, `.agents/skills/`,
`.cursor/skills/`, or `.grok/skills/`
are execution-surface details of the target runtime.

Adding agent-specific execution surfaces is fine; leaking agent-specific
assumptions into the contract layer is not.

Future full platform wiring (Amp, Aider, Gemini CLI, …) plugs in symmetrically —
see [`docs/PLATFORMS.md`](PLATFORMS.md) ([[CORE-154.4]]) for the plug-in
pattern. Cursor and Grok thin siblings already ship under `cursor/` and
`grok/`.

## Intentional Claude-specific surfaces

The references below are **load-bearing** in the contract layer —
factual locators for the wiring that ships today, not assumptions that
Claude is the only runtime. Future audits should consult this table and
*not* re-flag the entries here. Lens-specific audit notes belong in the
parent epic's audit task ([[CORE-154.6]]), not as edits to the entries
below.

| File | Section / context | Reference | Why it stays |
|---|---|---|---|
| `SPEC/layout.md` | §"Working in the flaitron repo itself" | `` `claude/` — Claude Code skills ``; `` `.claude/skills/audit` `` symlink to `.flaitron/audit-overlay/` | Wiring-layer directory names; factual. Per [[CORE-721]] for the second: the overlay *body* is agent-neutral content in a tracked, non-Claude path, and only the link that reaches it is Claude Code wiring — a future platform pointing its own skill directory at the same body adds its own link, not another body. |
| `SPEC/layout.md` | §"Skill namespace" | `` `.claude/` `` adopter directory | Adopter Claude Code wiring location. |
| `SPEC/layout.md` | §"Skill namespace" — "Skill-name invariant (grep-able)" | `` `claude/skills/<name>/` `` + `` `codex/skills/<name>/` `` (prose; the check is `tools/drift-checks.sh` `skill_name_invariant`) | Per [[CORE-466]], re-pointed at [[CORE-769.2]] when the Claude command wrappers it read retired — the check is scoped to the two shipped skill directories by name; a future platform's skill directory joins its glob rather than getting a parallel check. |
| `SPEC/tasknote-selection.md` | §"When to use a tasknote (and when not to)" (`/ft-refactor` bullet block) and the trigger line | `/ft-task`, `/ft-refactor`, `/ft-micro-task`, `/ft-file-followup`, `/ft-epic-discovery`, `/ft-close-epic`, `/ft-release` | Canonical flaitron skill names. |
| `SPEC/plan-filing.md` | the trigger line; §"Filing commits" (the seven filing motions + the execution-skill fence); §"`## Completed` archive convention" (`/ft-audit*` trivial-fix carve-out, `/ft-close-epic` placement rule); §"`## Completed` rotation" (`/ft-audit` as a history consumer) — split out of the row above by [[CORE-595]] | `/ft-task`, `/ft-micro-task`, `/ft-file-followup`, `/ft-epic-discovery`, `/ft-close-epic`, `/ft-release`, `/ft-audit*`, `/ft-refactor`, `/ft-seed`, `/ft-new-project`, `/ft-update` | Canonical flaitron skill names. |
| `SPEC.md` + `SPEC/task-line-segments.md` + `SPEC/post-closure.md` + `SPEC/gates.md` + `SPEC/gate-postures.md` + `SPEC/cue-vocabulary.md` + `docs/GATE-DISCIPLINE.md` | §"Operator-gate cues", §"🧪 Phase 3: Testing & Linting", §"🚀 Phase 4: Closure", §"Loop tasks", §"Paper-complete guard" (5 sites in `SPEC.md` — [[CORE-535.3]] brought it from 6 to 4 by moving the purpose blurb and the loop-tasks summary out of the core spec; [[CORE-536]] added §"Task-line format", whose `[unattended]` row names the flag the marker implies; [[CORE-607]] moved §"Post-closure protocol" into its own module — the stub it left names no flag — and recounted by the any-mention rule: §"🚀 Phase 4: Closure" names `/ft-file-followup --unattended` as the handoff discharge path and the restored §"Loop tasks" summary names the `--fast` gate collapse, neither previously listed, so the true count went 7 → 6; [[CORE-664]] moved the §"Task-line format" segment table into `SPEC/task-line-segments.md` and recounted 6 → 5 — the `[unattended]` cell naming the implied `--fast` travelled with it, and the stub left behind names the marker but no flag; [[CORE-724.2]] cut §"📝 Phase 1: Discovery"'s restatement of the `--fast` drift carve-out down to a `gates.md` pointer, recounted 5 → 4; [[CORE-732]] added the foreign-dirt gate's `--unattended` clause under §"Paper-complete guard", recounted 4 → 5); the whole of `SPEC/task-line-segments.md` (1 site — the `[unattended]` row names the flag the marker implies, moved verbatim by [[CORE-664]]); the whole of `SPEC/post-closure.md` (1 site — the protocol's opening paragraph names what the flag does to the skip rule, moved verbatim by [[CORE-607]]); §"Operator-gate cues", §"Phase 1→2 exit gate", §"Conditional skip rule" (3 sites in `SPEC/gates.md`, same any-mention counting rule as the `SPEC.md` half — [[CORE-532]], following [[CORE-527]]; [[CORE-660]] left §"Gate discipline — read before skipping a gate" with no flag, recounted 8 → 7; [[CORE-724.2]] retired the three posture stubs and cut §"Destructive-action escalation"'s flag sentence to a pointer, recounted 7 → 3); §"Flag precedence and surface matrix" (+ its two subsections), §"`--fast` operator override", §"`--unattended` operator posture", §"What is inherited, and what is not", §"Park conversions", §"What `--unattended` never relaxes", §"Pre-scaffold stops", §"`/ft-close-epic` under the posture" (10 sites in `SPEC/gate-postures.md` — [[CORE-730]] added the skill/pin-mismatch `--unattended` stop to §"Pre-scaffold stops", recounted 9 → 10; [[CORE-604.2]] moved the flag postures out of `gates.md`, whose count had been 14; the three stubs it left behind named the flags until [[CORE-724.2]] retired them); §"Glyph layers and reuse", §"🎯 Purpose blurb", §"Emphasized inline ask shape", §"Accepted gate replies" (4 sites in `SPEC/cue-vocabulary.md` — [[CORE-724.3]] folded the one-site purpose-blurb module in, and moved the retired gate-discipline module's one site, §"Refused carve-outs", out of `SPEC/` into `docs/GATE-DISCIPLINE.md`) — the vocabulary group is prose [[CORE-535.5]] split out of `SPEC/gates.md` (that split left the gates.md count at 14: it removed four mentioning sections and the matrix added four); §"Rationalizations", §"Red Flags", §"Refused carve-outs" (3 sites in `docs/GATE-DISCIPLINE.md` — §"Rationalizations" and §"Red Flags" predate [[CORE-724.3]], which moved §"Refused carve-outs" in from the retired `SPEC/` module; `docs/` stays contract layer) | `` `--fast` / `-f` `` operator force-skip flag | Operator force-skip mechanism implemented in the Claude Code skill bundle. Concept (operator force-skip) is platform-neutral; flag syntax is wiring-layer detail. SPEC documents the operator UX inline rather than punting to SKILL.md for density. |
| `SPEC/procedures/ft-task.md` | §"Agent-neutral primitives" and invocation/lifecycle dispatch | Shared `claude/skills/ft-task/` flag, model-edge, promotion, resume, debug, loop and unattended fragments; their flag/tool vocabulary | The SOP names neutral operations and accepts the shared invocation spelling, routing to canonical executable fragments instead of copying bodies ([[CORE-670.3]], [[CORE-677.3]]). Fragment paths are derivation anchors; their asks and mode variables are translated to the SOP primitives. The contract and required approval obligations remain authoritative. |
| `SPEC/procedures/README.md` | §"Frontmatter schema" (`source:` example + the flag-don't-bump paragraph's `/ft-release` reference); §"Why this layer exists" + §"Loading convention" (the "Claude Code does not use this layer" contrast) | `claude/skills/<procedure>/` as the `source:` anchor; `/ft-release` as the skill running the SOP-currency check | Per [[CORE-397]] (the `/ft-release` reference; the rest pre-dates it and is registered here at the same time). This file's subject *is* the SOP↔Claude-skill relationship — `source:` names a Claude path by definition of the schema, and the currency check that reads it ships in the Claude release skill. The neutral contract (stamp semantics: flagged at release, never bumped by it) is stated independently of who runs the check, so a future platform's releaser inherits the rule without inheriting the skill. |
| `SPEC.md` + `templates/subagent-probe-template.md` + `README.md` + `docs/GLOSSARY.md` | §"🧪 Phase 3: Testing & Linting" → "The external review" → "Who reviews" (1 site in `SPEC.md`); §"Variant — review probe" intro (1 site in the template); §"Sessions, loops, and sub-agents" — the probe bullet's external-review sentence (1 site in `README.md`); the **review probe** entry (1 site in `docs/GLOSSARY.md`) — four sites by the same any-mention counting rule the `--fast` row uses, all four added by [[CORE-656]] | `` `/code-review` `` Claude-Code review skill | Per [[CORE-656]] — the Phase 3 external review is stated as a *property* ("a context that did **not** write the diff"), and `/code-review` is named only as the realization a Claude Code runner already has. The neutral path is shipped beside it in the same sentence: every other runner briefs a read-only sub-agent with `templates/subagent-probe-template.md` §"Variant — review probe", whose brief names no spawn primitive at all. Same shape as the `/loop` row — flaitron ships the contract and the two rungs; the review *runtime* is the runner's. The template's own mention is the skip instruction that routes Claude runners away from the neutral brief; the `README.md` and `docs/GLOSSARY.md` mentions each name the neutral path in the same breath. `docs/HARNESS-SURVEY.md`'s pre-existing `/code-review ≈ evaluator` line is **not** registered here: it is a dated survey observation *about* Claude Code's feature set, not a flaitron rule any runner executes, so there is no intentional-surface decision to record. |
| `SPEC/model.md` | §"Model field" Step 1.5 mismatch path (1 site) | `` `/model <X>` `` Claude-Code-UI command | Claude-Code-runtime UI command implemented by Claude Code (not flaitron). Concept (model switch on next-task hand-off) is platform-neutral; slash-command syntax is wiring-layer detail. The post-closure copy-paste line signals model via emoji (`[heavy]🧠` / `[medium]🧩` / `[light]🔧` / `[frontier]💎` / `[xheavy]🔭`) — `SPEC/post-closure.md` no longer prescribes literal `/model` or `/clear` commands. |
| `SPEC/loop.md` + `SPEC/scope-boundaries.md` | §"Runtime vs. contract — the boundary" + §"Gate collapse" (`SPEC/loop.md`); §"PR / suggestion archetypes flaitron does not accept" → "Loop runtime" bullet (`SPEC/scope-boundaries.md`) — [[CORE-535.3]] collapsed `SPEC.md` §"Loop tasks" to a pointer, so the core spec no longer names the runner | `` `/loop` `` Claude-Code loop runner; `claude/skills/ft-task/step-5-loop-mode.md` fragment path (§"Gate collapse", 2 sites) | Per [[CORE-330.2]] — the loop *runtime* is Claude Code's `/loop` (or any equivalent runner), implemented by the runner, not flaitron. Framed neutrally ("or any equivalent runner"); the iteration-loop concept is platform-neutral. Flaitron ships only the markdown *contract* the loop reports to ([`SPEC/loop.md`](../SPEC/loop.md)) — the runtime/contract boundary is the point of the reference. |
| `SPEC/loop.md` | §"Loop tasks" (header + intro, before "Runtime vs. contract") | `` `.claude/loop.md` `` heartbeat copy-target path; `` `/ft-task --loop` `` driver invocation | Per [[CORE-466]] — distinct from the row above, which covers this file's "Runtime vs. contract" + "Gate collapse" sections only. `.claude/loop.md` is the Claude Code adopter path the heartbeat template is copied to; see `templates/loop-heartbeat-template.md`'s own row for the template file itself. |
| `templates/loop-heartbeat-template.md` | Title (line 1) + copy instruction (line 8) | `` `.claude/loop.md` `` copy-target path | Per [[CORE-466]] — the heartbeat contract is agent-neutral (per-cycle duties + runner-agnostic framing), but its shipped copy-destination names the Claude Code adopter path; a future platform's wiring copies the same contract to its own path. |
| `SPEC/layout.md` | §"Procedure SOPs (`SPEC/procedures/`)" | `/ft-task` SKILL dispatch (contrast reference) | Explains that SOPs are loaded by per-agent pointer wrappers *rather than* the Claude Code SKILL dispatch; factual comparison that makes the distinction clear without implying Claude dependency. |
| `SPEC/epic.md` | §"Audit acceptance — fixed doc-drift line" (the "**Skills**" / "**Optional deep pre-pass**" bold labels, not separate headings) | `claude/skills/ft-epic-discovery/`, `claude/skills/ft-close-epic/`, `claude/skills/ft-new-project/SKILL.md` | Path facts. |
| `SPEC/model.md` | (intro + Step 1.5 dispatch reference) | `claude/skills/ft-task/preamble.md` | Path fact. |
| `docs/EXTERNAL-AGENTS.md` | §"Stable surfaces for callers" — the "Capability probes" row (1 site) | `claude/skills/ft-task/unattended-mode.md`, `claude/skills/ft-task/SKILL.md`, `claude/skills/ft-file-followup/SKILL.md` named as the paths an out-of-repo caller probes to learn whether the *pinned* skills accept `--unattended` | Per [[CORE-565.3]]. A capability probe answers what the pinned skill's arg parse accepts, and the pinned skills live under `claude/` — no agent-neutral file's presence proves the flag parses, so the probe surface is a wiring-layer path by construction. The row declares the *path* stable; the posture it proves stays SPEC-owned (`SPEC/gate-postures.md` §"`--unattended` operator posture"). Same shape as `SPEC/procedures/ft-task.md` naming `step-4-debug-mode.md` as a derivation anchor. |
| `SPEC/model.md` | (recommended-set paragraph + "Practical guidance and agent-aware defaults" subsection + §"Effort recommendations") | Primary labels `[heavy]` / `[medium]` / `[light]` (+ triggered `[frontier]`) + `fable`/`opus`/`sonnet`/`grok`/`haiku` as examples | Per CORE-206 (vocabulary) + [[CORE-207]] (practical examples, cross-provider calibration) + [[CORE-259]] (added the `[medium]` rung; Grok/Sonnet calibrate medium-tier) + [[CORE-303]] (added `fable` as the heavy-tier baseline example) + [[CORE-373]] (Claude 5 roster refresh: `mythos` as fable's limited-access sibling, Sonnet 5 held at medium, effort/context variants excluded from the token vocabulary) + [[CORE-482.2]] (platform×model×effort calibration table — a multi-vendor reference spanning Anthropic/OpenAI/xAI/Google, refreshed at releases; supersedes CORE-353.2's no-maintained-table decision; moved to `docs/PLATFORMS.md` by [[CORE-604.3]]; [[CORE-724.3]] retired the model.md stub and moved the remaining vendor facts there) + [[CORE-482.3]] (manual-only `[xheavy]`🔭 rung above `heavy` — automated choosers cap at `[heavy]`; practical guidance flipped to the round-up default: `[medium]` default, `[light]` only for provably mechanical work) + [[CORE-741.2]] (chooser-assignable `[frontier]`💎 rung between `heavy` and `xheavy`, trigger-reached only; chooser cap moves to `[frontier]`; `fable` bands frontier; `model @ effort` recommendations limited to medium/high/xhigh, cells in `docs/PLATFORMS.md`) + [[CORE-741.4]] (the "Printing a cell" rule, with `Fable @ xhigh` / `⚠️ Grok @ xhigh` as its examples) — neutral primary vocabulary + agent-aware usage guidance. Specific model names remain valid examples only. |
| `SPEC/post-closure.md` | step 2 candidate-line examples | `· Opus @ high` / `· Opus @ medium` `model @ effort` picks | Per [[CORE-741.4]] — illustrative picks from the Claude Code column of the `docs/PLATFORMS.md` tier × platform map. The rule prints the active platform's pick, so a Codex or Grok Build session prints its own column. |
| `templates/tasknote-README.md` | "AGENTS.md" entry | `AGENTS.md` read by Claude Code, Codex CLI, Cursor, Amp, Aider, Grok Build | Multi-agent paste-destination — explicitly agent-neutral framing. |
| `templates/tasknote-README.md` | "CLAUDE.md" entry | `CLAUDE.md` — optional Claude-specific directives | Explicit Claude-only carve-out; adopter agents skip the entry. |
| `templates/tasknote-micro-template.md` | (closing recap line) | `claude/skills/ft-micro-task/SKILL.md` | Path fact. |
| `SPEC/unattended-candidacy.md` | §"Surfaces and mirrors" (Pair N paragraph + adopter-fork paragraph) | `claude/skills/`, `.claude/skills/audit/` | Path fact — names the filer directory Pair N scans and the adopter fork location `/ft-update` refreshes. |
| `templates/audit-overlay-template.md` | referenced-scaffold path + pass-file note; `## Deltas` rubric example | `.flaitron/core/claude/skills/ft-audit/…`, `CLAUDE.md` | Path fact — the overlay reads the bundled scaffold by its submodule path; `CLAUDE.md` is an illustrative rubric placeholder. |
| `templates/PLAN.md` | (examples + rule comment) | `[heavy]` / `[medium]` / `[light]` primary labels (Grok/Sonnet as mid-tier examples) | Per CORE-206 + [[CORE-259]] — neutral primary vocabulary. |
| `docs/MIGRATION.md` | §1.2, §1.3, §1.6, §3, troubleshooting | `.claude/skills/...`, `claude/AGENTS-snippet.md`, slash-command verification, "fresh Claude Code session" references; §1.3's `ln -s AGENTS.md CLAUDE.md` shim + `@AGENTS.md` import fallback (staged in §1.6, cross-referenced from §3.7) | Per [[CORE-515]] for the §1.3/§1.6 shim: it is a *loading* fix, not a content surface — `AGENTS.md` stays the single source, and the section states the neutral rule (verify, then shim the agent's native context file) before naming Claude Code's. The same paragraph names `GROK.md` / `GEMINI.md` / `CONVENTIONS.md` as the equivalent move for other agents, so nothing here privileges Claude beyond it being the wiring that ships. Otherwise: MIGRATION remains the full Claude Code adoption guide and now points Codex users at `codex/AGENTS-snippet.md`, Cursor users at `cursor/AGENTS-snippet.md`, and Grok users at `grok/AGENTS-snippet.md` (already-wired Claude/Codex/Cursor path; Grok-only `.grok/skills/` block). Future platforms get their own adoption section if/when wiring lands — see [[CORE-154.4]] / `docs/PLATFORMS.md` for the plug-in pattern. |
| `docs/PHILOSOPHY.md` | (historical-narrative paragraphs) | `Claude Code` + "Claude can read markdown" framing | Per [[CORE-132]] defense — file's role is personal narrative; voice IS the deliverable. |
| `README.md` | §"Repo layout" | `` `claude/` `` — Claude Code skills + slash commands | Factual repo-layout description. |
| `README.md` | §"Agent memory"; §"Sessions, loops, and sub-agents" | "Claude Code sessions" (agent-memory intro); `` `--fast` `` on `` `/ft-task` `` (within-task-autonomy bullet); Claude Code's `` `/loop` `` (closing runtime paragraph) | Per [[CORE-408.4]]. The section's subject is operator-side session discipline — context reset, delegation, loop runtime — whose only *shipped* realizations are Claude Code's, so naming them is what makes the guidance concrete. Each is framed with its neutral escape hatch already in place ("or any equivalent runner"; `--fast` and `/loop` additionally hold their own ledger rows for their SPEC sites). Note what is **not** claimed here: the **probe** / **delegate** split this section carries is fully agent-neutral — no spawn primitive is named anywhere in the contract layer, and `templates/subagent-probe-template.md` explicitly leaves it to "the operator's and the platform's business". Claude Code's sub-agent mechanics live in `claude/CAPABILITIES.md` (wiring layer, no row); non-Claude equivalents in `docs/PLATFORMS.md`. |
| `README.md` | §"Quickstart" | `/ft-new-project`, `/ft-task`, `~/.claude/skills/` install path | Per [[CORE-383]] — the above-fold quickstart shows the shortest real path to a working setup, which today means the Claude Code wiring that ships. Framed with an explicit escape hatch ("not using Claude Code?" → `docs/MIGRATION.md` manual path §1.1–1.7 + Codex / Cursor / Grok wiring (§1.2); Grok is Cursor-shaped via `docs/PLATFORMS.md`), so the contract stays followable without Claude Code. Concept (bootstrap a project, run a task) is platform-neutral; the slash commands and `~/.claude/` paths are wiring-layer detail. |
| `SECURITY.md` | §"Prompt injection via user-authored markdown" (Claude Code subsection) | `.claude/settings.local.json` tool allowlist + Claude Code harness mention | Claude Code-specific mitigation; clearly scoped after the [[CORE-154.2]] reframe. |

## Tool-call-specific terminology

SPEC's workflow contract uses agent-neutral terms for assistant-user
question primitives. The terms describe the *operation*, not any
specific tool:

| Concept | Canonical name in SPEC | Notes |
|---|---|---|
| Multi-option structured user question | **structured ask** | Was previously named `AskUserQuestion` (the Claude Code tool name); generalized via [[CORE-154.2]]. Adopter agents implement via their own primitives (Codex CLI question shapes, Cursor multi-choice prompts, etc.). |
| Free-prose user question | **prose ask** | Unchanged — always was agent-neutral. |

The pair `structured ask` / `prose ask` describes the operator-facing
mode, not the tool that delivers it.

## Out of scope for this ledger

This contract documents *why intentional Claude-specific surfaces are
intentional*. It does NOT:

- Spell out the platform-plug-in mechanism for adding `codex/` / `grok/` /
  Cursor wiring directories — see [[CORE-154.4]] /
  [`PLATFORMS.md`](PLATFORMS.md).
- Document the wiring-layer structure: locked at [[CORE-154.3]]
  (2026-05-23) — `claude/` keeps its name and location; future
  non-Claude-Code platform wirings plug in symmetrically as sibling
  top-level dirs (e.g., `codex/`, `grok/`, `cursor/`); see
  [`PLATFORMS.md`](PLATFORMS.md) ([[CORE-154.4]]) for the
  full plug-in pattern. Rationale: adopter-symlink stability
  ([[CORE-154.1]] Constitution non-negotiable) rules out renaming
  `claude/`; sibling-top-level convention preserves symmetry.
- Re-survey the contract layer for new leaks — audits are point-in-time;
  the next epic touching the contract layer should consult this ledger
  and run its own check.

**Ledger currency.** This table is written at introduction, not swept
periodically: the task or epic that adds a new intentional
Claude-specific reference to the contract layer owns registering its own
row here, in the same commit — the same way every row above already
carries its introducing task ID. Nothing re-audits the ledger against the
contract layer on a cadence; per [[CORE-466]], that gap is what let three
references (`SPEC.md`'s wrapper-name invariant,
`templates/loop-heartbeat-template.md`, and `SPEC/loop.md`'s "Loop tasks"
intro) go unregistered until a structure audit caught them.

Near-neighbor surfaces explicitly out of [[CORE-154.2]]'s scope but
worth mentioning here:

- `CONTRIBUTING.md:8` — "Most edits land via Claude Code sessions" —
  historical narrative; defended by [[CORE-132]] (first-person
  CONTRIBUTING convention).
- `claude/AGENTS-snippet.md` — wiring-layer content (under `claude/`);
  examined by [[CORE-154.3]] and [[CORE-154.4]].
- `claude/CAPABILITIES.md` — wiring-layer content (under `claude/`): the
  Claude Code capability-trigger reference (effort/thinking, `--fast`,
  `--unattended`, `--debug`, `--loop`, `--park`, `--starter`, `--deep`, `/model`, `/clear`, structured ask,
  sub-agent / isolated exploration, and `/code-review`). Consolidates wiring-side *syntax*;
  introduces no new contract-layer surface, so it takes no table row above.
  Added by [[CORE-224.3]]; trigger list extended by [[CORE-408.4]];
  [[CORE-571]] swapped `--worktree` (whose `docs/WORKTREES.md` site was never
  ledgered) for `--loop`, whose site — `SPEC/loop.md` — already has rows above.
