---
title: skill-surface discovery
status: starter
tags: []
created: 2026-10-09
related-tasks: [CORE-EPIC-769, CORE-769.N, CORE-349.5, CORE-572, CORE-510]
---

# CORE-769.1 | skill-surface discovery

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-10-09) · 🔗 [[CORE-EPIC-769]]

## 🌱 Starter context

_Captured 2026-10-09 in the CORE-EPIC-768 closing session, as a cross-session hand-off: the operator wants epic Discovery to run in a fresh chat. Promote at `/ft-task CORE-769.1`, which runs the epic Discovery and files the children._

### Why this exists

The operator wants the skill surface rethought before the next release cut. Their questions:

- Why is the `ft-audit` family wired differently from every other skill ("an awkward rule to not use all ft-audit skills")? Shouldn't everything be bundled by default rather than wired separately?
- `ft-file-followup` is an awkward name; `ft-file-task` likely fits better. Are other skill names awkward?
- Which skills should be added, merged, or retired?

### Current policy and its stated rationale

- `docs/PLATFORMS.md` §"Installed-surface policy" separates the **shipped inventory** from the **adopter-installed subset**. Adopters wire the tasknote family (`ft-task`, `ft-micro-task`, `ft-file-followup`, `ft-epic-discovery`, `ft-close-epic`, `ft-refactor`) plus `ft-seed` and `ft-update`. The roster's single source of truth is `claude/AGENTS-snippet.md` §"One-time symlink wiring"; the codex/cursor/grok blocks, `docs/MIGRATION.md` §1.6, and `ft-new-project` Steps 7–8 derive from it.
- **`ft-audit`: fork or thin overlay, never symlinked** (`docs/MIGRATION.md` §1.2.1). Stated reason: rubrics, gates, and examples differ per stack, and a verbatim symlink "carries no deltas".
  - **Counterpoint to test.** Two later additions may have weakened that reason. `claude/skills/ft-audit/scaffold-bootstrap.md` detects unfilled placeholder slots at dispatch and repairs the install. The thin overlay (`templates/audit-overlay-template.md`) already runs the bundled scaffold by reference. A symlinked bundled `ft-audit` as the working default, with an overlay as optional customization, looks feasible. Catch: a project with an overlay would then expose both `audit` and `ft-audit`.
- **`ft-new-project` and `ft-audit-repo`: global-only** (agent home), because they run before flaitron is wired into a repo. Sound for `ft-new-project` (bootstrap chicken-and-egg). Weaker for `ft-audit-repo`, which runs by reference from the submodule and could be wired per project too.
- **`ft-release`: flaitron-self only.**
- **Hypothesis to measure:** every wired skill adds its description to every session's skill listing, so "wire everything" has a per-session context cost. Quantify before deciding.

### Rename candidates

Live-surface file counts (`git grep -l`, excluding archives, PLAN-ARCHIVE, VERSION-HISTORY):

| Current | Candidate | Problem | Files |
|---|---|---|---|
| `ft-file-followup` | `ft-file-task` | Used standalone, not only mid-flow; carries three weights (default / `--park` / `--starter`) | 51 |
| `ft-epic-discovery` | `ft-open-epic` | Word order doesn't match its bracket twin `ft-close-epic` | 49 |
| `ft-seed` | `ft-seed-unattended` | Opaque: it seeds `[unattended]` tokens | 23 |
| `ft-new-project` | `ft-adopt` | Also adopts existing repos; would pair with `ft-update` | 30 |
| `ft-audit-repo` | keep, or `ft-audit-first` | The name doesn't say "first contact" | 25 |

### Roster add / retire candidates

- **`claude/commands/*.md` wrappers** may be redundant now that Claude Code skills are slash-invocable directly. Retiring them would remove a whole derived surface: the snippet's command lines, `ft-new-project` Steps 7–8, MIGRATION §1.6, and the `wrapper_name_invariant` drift check.
- **`codex/skills/` wrapper parity** — how much of the full inventory Codex needs.
- **Merges** — e.g. `ft-micro-task` into `ft-task`.
- **Additions** — none identified yet; ask.

### Packaging channel

A Claude Code plugin would namespace skills as `flaitron:<skill>`, which makes the `ft-` prefix redundant. Weigh that against per-project version pinning through the `.flaitron/core/` submodule (can a plugin install be pinned per project?). **Settle the channel before renaming**, or the fleet takes two rename waves.

### Rename mechanics to account for

- `/ft-update` reports dangling symlinks left by retired skills but does not re-wire a renamed one (`docs/MIGRATION.md` §"Retired skills leave dangling symlinks").
- `tools/update-adopters.mjs` `wiredSkillKeys()` parses the literal `ln -s` blocks.
- `/ft-release` §7.1's installed-surface check diffs all four snippet blocks against the Claude roster.
- Renames are breaking for adopters: check `SPEC/versioning.md` for the bump level and whether a transitional alias is warranted.

### Files to touch (preliminary survey — drift-check at promotion)

- `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md` — roster
- `docs/PLATFORMS.md` §"Installed-surface policy"; `docs/MIGRATION.md` §1.0, §1.2, §1.2.1, §1.6
- `SPEC/layout.md` §"Skill namespace"
- `claude/skills/*`, `claude/commands/*`, `codex/skills/*` — renamed directories and cross-references
- `claude/skills/ft-new-project/SKILL.md`, `claude/skills/ft-update/SKILL.md`, `claude/skills/ft-release/step-7.1-standing-checks.md`
- `tools/update-adopters.mjs`, `tools/drift-checks.sh`
- `AGENTS.md` skill roster and its KEEP IN SYNC block; `docs/GLOSSARY.md`

### Explicitly out of scope

- Behavior changes inside skill bodies beyond renaming and wiring — file separately if Discovery surfaces any.
- The release cut itself — it follows this epic.

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| Cross-session bridge | Epic shell (parent + `.1` + `.N`) with `.1` as this starter | No starter→epic promotion path exists; this avoids an orphan row |
| Discovery scope | Bundling/wiring policy, renames, roster add/retire, packaging channel | Operator selected all four |
| Epic count | One, or two if Discovery finds a clean seam | Operator: "make 2 epics if it makes sense but 1 epic may be fine" |
| Sequencing | Before the next release | Ships renames and CORE-EPIC-768 in one adopter bump |

### Open at promotion (Phase 1 should resolve)

- One epic or two? Lean: two if packaging changes the naming (e.g. A = bundling + packaging, B = renames + roster), one otherwise.
- Are the `claude/commands/` wrappers still needed? Lean: verify against current Claude Code skill invocation before deciding.
- Can a plugin install be pinned per project? Lean: if not, keep the submodule as the pin and treat plugins as out of scope.
- Back-compat for renames: aliases or a clean break, and which semver level?
- Measured context cost of default-wiring every skill.
- Does `audit` / `ft-audit` coexistence cause real resolution confusion?

### Related

- [[CORE-EPIC-769]] — parent epic
- [[CORE-349.5]] — added the `/ft-release` §7.1 installed-surface check a roster change must satisfy
- [[CORE-572]] — precedent for retiring a skill (worktrees)
- [[CORE-510]] — made the adopter paste-block name the skills and point at SPEC
