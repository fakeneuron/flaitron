---
title: cursor-wiring discovery
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-EPIC-438]
---

# CORE-438.1 | cursor-wiring discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-438]]

## 🎯 Goal

Scope the `CORE-EPIC-438` epic (`cursor-wiring`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-438.2..5` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via structured ask — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-438.2 .. CORE-438.5 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-438.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flowtron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via structured ask (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-438.2 .. CORE-438.5; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-438 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-438]] — parent epic: promote Cursor from contract-only stub to a shipped wiring platform

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator is working in Cursor daily and asked to promote it from
  contract-only stub to a supported platform, then dogfood it. `docs/PLATFORMS.md`
  already locks the symmetric plug-in pattern this epic instantiates, and the
  Cursor row is the oldest `unverified` stamp on the matrix.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Shared design surface

| Surface | What the epic touches |
|---|---|
| Wiring dirs | `claude/` (18 commands + 18 skill bodies), `codex/` (18 thin `SKILL.md` routers + `AGENTS-snippet.md` + `procedures/ft-task.md`), `grok/` (procedure pointer only). New sibling: `cursor/`. |
| Structural contract | `docs/PLATFORMS.md` — two-layer model, symmetric plug-in pattern, installed-surface policy, minimal scaffold sketch, per-agent trigger tables (Cursor is a stub at line 338). Tree at line 100 still labels `cursor/` "hypothetical". |
| Currency contract | `docs/AGENT-COMPAT.md` matrix row + the dogfood-or-explicit-skip release gate; `docs/DOGFOOD.md` 3-step procedure and its stamp-location table. |
| Neutrality ledger | `docs/AGENT-NEUTRALITY.md` — contract layer must stay free of Cursor-specific terms. |
| Enumeration sites | ~16 files name `codex/`: `README.md`, `SPEC.md`, `AGENTS.md`, `SECURITY.md`, `.flowtron/tasknote/README.md`, `docs/{MIGRATION,PLATFORMS,AGENT-COMPAT,AGENT-NEUTRALITY,VERSION-HISTORY}.md`, `claude/AGENTS-snippet.md`, `claude/skills/{ft-release,ft-update}/SKILL.md`, `SPEC/procedures/README.md`, `tools/update-adopters.mjs`. |
| Templates | None. No new template artifact — `docs/PLATFORMS.md` §"Minimal scaffold sketch" is deliberately a sketch, not a `templates/` file. |

### Probe return — Cursor primitives (read-only subagent, 2026-08-12)

Sourced from official Cursor docs via the `cursor-guide` probe; the load-bearing
items were additionally confirmed first-hand in this session.

- **Skill discovery:** `.cursor/skills/` + `.agents/skills/` (project),
  `~/.cursor/skills/` + `~/.agents/skills/` (user). Compatibility loading from
  `.claude/skills/` and `.codex/skills/` is **documented, not incidental**.
  Frontmatter: `name` (required, must match folder), `description` (required),
  optional `paths` / `disable-model-invocation` / `metadata`.
- **Slash commands:** a skill auto-exposes `/<skill-name>` — so flowtron gets
  true `/ft-task` parity with Claude Code, which Codex explicitly does not have.
  `disable-model-invocation: true` makes a skill command-only.
- **Context entry-point:** root `AGENTS.md` read with no configuration; nested
  `AGENTS.md` supported. Rules at `.cursor/rules/*.mdc`.
- **Structured ask:** native ("Ask questions" tool). No prose-degradation
  fallback needed — the divergence Codex/Grok wrappers are written around.
- **Sub-agents:** native `Task` tool, custom definitions in `.cursor/agents/`
  (+ `.claude/agents/` compat), `readonly` and `is_background` frontmatter.
  This makes SPEC.md's probe/delegate split natively supported.
- **Modes:** Agent / Plan / Ask / Debug, switchable mid-session.
- **Model + context:** CLI `/model` and `/clear`; IDE uses picker + new chat.

**First-hand confirmations this session:** flowtron's own `.claude/skills/ft-*`
bodies loaded and dispatched under Cursor (this `/ft-epic-discovery` run is the
evidence); the structured ask rendered a clean multi-option UI four times; the
`Task` subagent probe returned a distilled summary without polluting this
context window.

**Gaps the docs do not close (carried into `.2`):**

- **Symlink tolerance is undocumented** for skills/commands/rules/agents dirs.
  One third-party report claims Cursor's file watcher does not reliably follow
  directory symlinks. Flowtron's entire adopter install is relative symlinks
  into `.flowtron/core/`, so this is the epic's one blocking unknown.
- `.cursor/commands/` is not stated in official docs (commands appear only as a
  plugin component with a `commands/` dir).
- No documented argument-substitution syntax (`$ARGUMENTS` is unofficial).
- `.claude/commands/` compatibility is **not** documented (unlike
  `.claude/skills/` and `.claude/agents/`, which are).

### Archive skim — `.flowtron/tasknote/archive/core/`

- **[[CORE-154.3]]** — locks the wiring-layer structure: sibling top-level dirs,
  no parent `wiring/` dir, no rename of `claude/`. Adopter symlink path stability
  is a Constitution non-negotiable. This epic must not disturb it.
- **[[CORE-154.4]]** — produced `docs/PLATFORMS.md` and the plug-in pattern;
  named Cursor as a hypothetical sibling from the start.
- **[[CORE-344]]** / **[[CORE-345]]** — the codex wiring-parity precedent: thin
  wrappers that route to the SOP or the canonical Claude body rather than
  restating it. The shape `.3` should follow, minus the wrappers.
- **[[CORE-349.2]]** — wiring-surface policy: shipped inventory vs.
  adopter-installed subset vs. global-only vs. flowtron-self-only. A new platform
  must declare its row in the §"Installed-surface policy" table.
- **[[CORE-349.5]]** — release wiring guardrails that verify these surfaces stay
  aligned; `.4` extends them to `cursor/`.
- **[[CORE-271.4]]** — the procedure-pointer wrapper pattern (`grok/`, `codex/`);
  the exact artifact `.3` mirrors.
- **[[CORE-406]]** — parallel-dogfood stamp ownership: only the release-driving
  session writes stamp files. Relevant to `.5`.
- **[[CORE-320]]** — `update-adopters.mjs` `newSkillsShipped()` gates its
  "wire symlinks" note on the per-project `AGENTS-snippet.md` §"One-time symlink
  wiring" `ln -s` list. A new `cursor/AGENTS-snippet.md` must carry that section
  heading or the fleet updater will not flag Cursor adopters on bump.

### Drift check

- Paths cited above verified against HEAD (`278a908`). All resolve.
- `docs/PLATFORMS.md:100` labels `cursor/` "hypothetical Cursor wiring" — will be
  falsified by `.3`; flip is scoped into `.4`.
- `docs/PLATFORMS.md:338-344` Cursor stub claims "no capability-trigger research
  has been conducted" — true at HEAD, falsified by this Discovery's probe. `.5`
  owns replacing it with a real trigger table.
- `docs/AGENT-COMPAT.md:39` Cursor row reads "Native primitive exists; no
  flowtron bundle". The second clause is **already misleading at HEAD**: because
  Cursor documents `.claude/skills/` compat loading, any adopter that wired the
  Claude bundle is *already* getting flowtron skills under Cursor. Correcting
  this row is scoped into `.4`.
- No SPEC contract conflict. This epic is wiring-layer only: no `SPEC.md` or
  `SPEC/*.md` semantic change, and no Cursor-specific term enters the contract
  layer (`docs/AGENT-NEUTRALITY.md` posture preserved). The only `SPEC.md` edit
  is the §"Working in the flowtron repo itself" repo-layout list gaining a
  `cursor/` bullet — the same treatment `codex/` and `grok/` already have.
- No archived tasknote carries a falsified *factual* claim, so no
  §"Superseded-claim pointer" is owed by this closure.

### Best Practices Review

The touched boundary is the contract/wiring split (`docs/PLATFORMS.md` §"The
two-layer model"). Dependency direction is one-way: wiring dirs may reference
`SPEC/` and `claude/` bodies; the contract layer must not reference `cursor/`
semantics. The live duplication risk is 18 near-copy skill wrappers — the
operator's "thin" decision below avoids it, consistent with SPEC.md's rejection
of "abstractions without two-project precedent" and PLATFORMS.md
§"Single-source-of-truth posture". No refactor of existing wiring is in scope;
`claude/` and `codex/` are untouched.

### Resolved scoping

| Question | Resolution |
|---|---|
| Bundle depth, given Cursor loads `claude/skills/` bodies natively | **Thin.** `cursor/` ships `AGENTS-snippet.md` + `procedures/ft-task.md` only. Adopters symlink the canonical `claude/skills/` bodies into `.cursor/skills/`. No wrapper duplication — and it avoids Codex wrappers' "degrade to a prose ask" instruction, which would actively mis-instruct a Cursor agent that has a native structured ask. |
| Where the symlink-viability test lands | **First child (`.2`).** It gates the install mechanism; a failure re-routes `.3` from symlinks to copies and changes the pinning story in every downstream child. Verify before writing anything on top of it. |
| Cursor joining the per-release dogfood gate | **Yes.** Cursor becomes the 4th gated row alongside Claude / Grok / Codex, accepting the recurring per-release resolution cost, because it is now a daily-driver surface. Enrolment lands in `.5`, after a real dogfood pass exists to enrol. |
| Reach of the integration child | **Full parity.** Every site `codex/` occupies gets a `cursor/` counterpart, including `ft-release` §7.1 wiring guardrails and `update-adopters.mjs` skill-flagging. |

### Child cohort (M=4, filed in Phase 2)

`.2` install-mechanism verification → `.3` the `cursor/` bundle → `.4` full
surface propagation → `.5` dogfood + trigger table + gate enrolment. Strictly
ordered: `.3` consumes `.2`'s locked mechanism, `.4` documents what `.3` shipped,
`.5` verifies the whole thing end-to-end. The reserved `.N` audit stays terminal.

### Downstream-impact reconciliation scan

New-task-filing trigger. Scanned the rest of the active PLAN (`High` / `Medium` /
`Low` / `Future Opportunities`); two adjacencies, **no edits proposed**:

- **[[CORE-433.3]]** (widen gates — AGENTS.md into the AI-referenced docs walk;
  flag rosters under a check) — *unaffected, adjacent.* `.4` adds a new roster
  member; `433.3` builds the check that would cover it. Complementary, not
  contradictory. Action: **leave**.
- **[[CORE-433.4]]** (validation roster sync in `claude/skills/ft-release/SKILL.md`
  §7.1) — *unaffected, same file and adjacent section.* `.4` also edits §7.1, for
  wiring guardrails rather than the validation roster. Action: **leave**; whichever
  lands second rereads §7.1 before editing.
- `CORE-EPIC-431`, `CORE-434`, `CORE-435`, `CORE-436`, `CORE-437` — no shared
  surface (viz watcher, CI workflow, conventions rationale, README badge, gate
  skip rule). Unaffected.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Followed the `CORE-EPIC-432` / `CORE-EPIC-433` cohort shape for
child-line filing: 2-space indent under the parent, `[model]` + tier glyph on
every line, `| shortname` segment, ` — ` em-dash separator. No new shape invented.

**Minimal refactor gate.** N/A — pure PLAN.md filing, no code or contract surface
touched. No existing line rewritten (the reconciliation scan proposed no edits).

**Lines written:** 4 (`CORE-438.2` … `CORE-438.5`), inserted between the `.1`
Discovery line and the reserved terminal `.N` audit line.

| Line | Words | Cap |
|---|---|---|
| `CORE-438.2` | 41 | ≤70 ✅ |
| `CORE-438.3` | 48 | ≤70 ✅ |
| `CORE-438.4` | 52 | ≤70 ✅ |
| `CORE-438.5` | 44 | ≤70 ✅ |

**Change to M:** none. Filing-time estimate of 4 implementation children held
through Discovery. The audit's reserved `.N` suffix is unaffected and did not
renumber.

**Per-child model tags:** the epic and Discovery carry `[heavy]`; children were
tagged by actual shape rather than inheriting the parent — `.3` stays `[heavy]`
(new platform surface, neutrality-sensitive authoring), while `.2` / `.4` / `.5`
are `[medium]` (bounded empirical test, mechanical propagation across a known
site list, and a scripted dogfood procedure respectively).

**Audit line review:** `CORE-438.N` confirmed as-filed. Discovery surfaced no
scope shift that would change the audit's remit, and the epic remains
cross-cutting enough (~16 enumeration sites plus a new adopter install path) to
warrant the closing integration sweep.

**Downstream reconciliation:** two adjacencies recorded in Discovery Notes
([[CORE-433.3]], [[CORE-433.4]]); **no reconcile edits applied** — both are
complementary rather than stale, contradictory, or redundant.

**Updated/added tests:** N/A — pure markdown filing; no executable surface.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown-prose edits only, no executable surface

- [x] Ran lint/type-check on changed code — N/A: no code changed

- [x] **Quality assertions** — N/A: no code changed. Markdown mental-pass run in its place (below)

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend surface touched

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown mental-pass over the edited `.flowtron/PLAN.md` block (lines 14-20),
per-item:

- 2-space child indent preserved on all four new lines ✅
- `**CORE-438.<n>**` bold ID intact ✅
- `[model]` tag present on every new line, with the tier-matching glyph ✅
- `| <shortname>` segment present, longest is `cursor-surface-integration` (26 chars, ≤30) ✅
- Em-dash separator (` — `) consistent across all four ✅
- Long descriptions 41 / 48 / 52 / 44 words — all under the 70w hard cap ✅
- No trailing whitespace ✅
- Cohort ordering correct: `.1` Discovery → `.2`-`.5` implementation → terminal `.N` audit ✅
- No reconcile-edited existing lines to re-verify (scan proposed none) ✅

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs", per entry:

| Doc | Verdict |
|---|---|
| `README.md` | no change — `cursor/` repo-layout bullet is `.4`'s deliverable |
| `SPEC.md` | no change — §"Working in the flowtron repo itself" layout bullet deferred to `.4`; no contract semantics touched here |
| `docs/MIGRATION.md` | no change — Cursor adoption section deferred to `.4` |
| `claude/AGENTS-snippet.md` | no change |
| `codex/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change — new-platform threat-model line deferred to `.4` |
| `docs/AGENT-NEUTRALITY.md` | no change — this epic adds no Cursor term to the contract layer, so the ledger is unaffected |
| `docs/PLATFORMS.md` | no change **here** — the `cursor/` "hypothetical" tree comment (line 100) and the Cursor stub (line 338) are knowingly stale until `.4` / `.5`; recorded in Discovery Notes §"Drift check" so the staleness is tracked, not forgotten |
| `claude/CAPABILITIES.md` | no change — Claude-only trigger reference |
| `docs/AGENT-COMPAT.md` | no change **here** — the Cursor row's stale "no flowtron bundle" clause is `.4`'s deliverable, the `dogfooded` stamp is `.5`'s |
| `docs/EXTERNAL-AGENTS.md` | no change |
| `docs/WORKTREES.md` | no change |

All fourteen land "no change" for this closure, as expected for a pure Discovery
filing — every contract and doc edit this epic implies is scoped into `.3` / `.4` /
`.5` rather than landing in the Discovery.

**Final Summary:**

Filed `CORE-EPIC-438` (`cursor-wiring`) and scoped it into four ordered
implementation children, promoting Cursor from an `unverified` contract-only stub
to a planned first-class wiring platform.

Discovery's load-bearing finding **shrank the epic**. A `cursor-guide` doc probe
plus first-hand observation in this session established that Cursor discovers
skills from `.cursor/skills/` and `.agents/skills/` natively **and documents
`.claude/skills/` as a compatibility surface** — which is why flowtron's own
`.claude/skills/ft-*` bodies dispatched this very `/ft-epic-discovery` run.
Cursor also has a native structured ask, native `Task` sub-agents (satisfying
SPEC.md's probe/delegate split), four switchable modes, and CLI `/model` +
`/clear`. It is therefore *more* capable than Codex or Grok, not less. That
inverted the expected plan: instead of mirroring `codex/`'s 18 thin wrappers,
`cursor/` ships **thin** — snippet + procedure pointer — and adopters wire the
canonical `claude/skills/` bodies. Mirroring Codex would have been actively
harmful, since those wrappers instruct the agent to degrade a structured ask to
prose, which is wrong for a platform that has one.

The epic's one blocking unknown is **undocumented symlink tolerance** for
Cursor's skill directories, against an install mechanism that is entirely
relative symlinks into `.flowtron/core/`. `.2` was deliberately ordered first to
settle it empirically before `.3` builds on it.

**Changed files:** `.flowtron/PLAN.md` (+7 lines: parent epic, `.1`, four
implementation children, `.N` audit; `(none)` placeholder replaced under
`## High`) and this tasknote (scaffold → archive).

**Verification:** markdown mental-pass only — no code surface. Word-count check
on all four child lines (41 / 48 / 52 / 44, cap 70) and a cohort-ordering /
indent / glyph pass; both recorded in Testing Notes. Test suite, lint, and
type-check are `N/A` with reasons in Phase 3.

**Refactors:** none made, none deferred. The candidate refactor Discovery
explicitly *avoided* was 18 near-duplicate Cursor skill wrappers, rejected under
SPEC.md's "abstractions without two-project precedent" and PLATFORMS.md
§"Single-source-of-truth posture".

**Documentation verdict:** all fourteen AI-referenced docs "no change"; three
known-stale surfaces (`docs/PLATFORMS.md` ×2, `docs/AGENT-COMPAT.md` ×1) recorded
in Discovery Notes with their owning child.

**Maintainability effect:** the epic adds a fourth platform without adding a
fourth copy of the skill inventory — `cursor/` will carry two files against
`codex/`'s twenty, and the `ft-*` skill bodies keep a single upstream home. The
recurring cost taken on deliberately is one more gated row in the per-release
dogfood walk.

**Archived:** 2026-08-12
