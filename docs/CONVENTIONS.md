# Flaitron Conventions

This is the single canonical surface answering "what conventions does flaitron follow, and which does it deliberately decline?" For the workflow contract, see [SPEC.md](../SPEC.md). For the "why" behind flaitron's overall shape, see [PHILOSOPHY.md](PHILOSOPHY.md).

The list is scoped to external conventions flaitron has explicitly considered. An entry is here either because flaitron adopts the convention (often de-facto, undocumented elsewhere) or because flaitron declines it on purpose and the position is worth recording.

## Adheres to

### Conventional Commits 1.0

Commit subjects follow [Conventional Commits 1.0](https://www.conventionalcommits.org/en/v1.0.0/) with an em-dash separator and the originating task ID:

```text
<type>: <TASK-ID> — <description>
```

Types in active use: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `perf:`, `test:`, `ci:`. Scope segments (`feat(area):`) are not used — the `<TASK-ID>` prefix carries area information via its `CORE-` / `FE-` / `BE-` / `DB-` / `DEPLOY-` / `TEST-` prefix.

**Breaking changes** use the canonical `!` indicator on new commits:

```text
feat!: CORE-XXX — short description
```

The annotated tag message for the corresponding release lists migration steps regardless of indicator style. The v3.0.0 release commit itself (CORE-105) used a parenthetical `(BREAKING)` form in the subject; the canonical `!` is the going-forward convention.

### Semantic Versioning 2.0

Flaitron releases follow [Semantic Versioning 2.0](https://semver.org/spec/v2.0.0.html). The patch/minor/major split is enforced through the workflow contract — see [SPEC/versioning.md](../SPEC/versioning.md) for flaitron's specific definitions of each bump tier and for the adopter-side migration motion.

The cross-link is deliberate: `SPEC/versioning.md` is the operational doc (what the bump tiers mean for flaitron); the canonical spec is the underlying contract.

### GitHub Flavored Markdown

All flaitron markdown — `SPEC.md`, `SPEC/`, templates, tasknotes, `docs/`, `README.md`, and the bundled skills — targets [GitHub Flavored Markdown](https://github.github.com/gfm/) (a CommonMark superset). Features in use: fenced code blocks with language tags, tables, task lists, emoji shortcodes, `[[wikilink]]` syntax for cross-task references in tasknotes, and — in `README.md` only — inline raw HTML (`<p align="center">`, `<img>`, `<details>`/`<summary>`) for the landing-page layout GFM can't express natively.

GFM renders cleanly on GitHub and in Obsidian-family vault tools (Obsidian, Foam, Logseq) — the wikilink and frontmatter choices in tasknotes are compatible with those tools without flaitron depending on them. See `README.md` §"Working in markdown vaults" for the opt-in vault-tool integration surface.

### Diátaxis docs framework

The `docs/` and root-level documentation roughly follow [Diátaxis](https://diataxis.fr/)'s four-quadrant split:

| Quadrant     | File                                            |
|--------------|-------------------------------------------------|
| Reference    | [SPEC.md](../SPEC.md) — workflow contract       |
| How-to       | [docs/MIGRATION.md](MIGRATION.md) — adoption steps |
| Explanation  | [docs/PHILOSOPHY.md](PHILOSOPHY.md) — the "why" |
| Tutorial     | _(not provided)_                                |

The tutorial quadrant is intentionally absent. The `/ft-new-project` skill bootstraps a working flaitron-adopting repo in one pass; the tutorial substitute is "run the skill, then read MIGRATION.md if anything surprises you." A standalone tutorial would duplicate the skill's existing wiring and drift away from it.

### GitHub Actions CI

Flaitron ships a `.github/workflows/ci.yml` CI pipeline that runs on push to `main` and on every pull request, in two jobs, under a `ci-${{ github.ref }}` concurrency group that cancels a superseded run on the same ref (the Natabula CI spine shape, `CORE-715`). The `validate` job reuses [AGENTS.md](../AGENTS.md) §"Validation" verbatim — `npm --prefix viz test`, `npm --prefix viz run typecheck`, `npm --prefix viz run lint`, `npm --prefix viz run build`, `node --test tools/update-adopters.test.mjs`, `node --check tools/update-adopters.test.mjs`, and `node --check tools/update-adopters.mjs` — on a Node 24/26 matrix with npm caching, plus a `gitleaks` secret-scan step (`CORE-578`) scanning the working tree against a repo-root `.gitleaks.toml` deposited from an operator-private fleet baseline. The scan step is additive to the seven commands above, not part of the "passing" roster §7.1 Pair H binds to `AGENTS.md` §"Validation" — it is stack-agnostic and needs no local counterpart, the same off-machine argument as the rest of this job.

This reverses an earlier decision (`CORE-099.1`, `CORE-115`, `CORE-321`): CI was previously declined because Phase 3 and `/ft-release` already gate every change inline, and flaitron had no external contributor pull requests to gate automatically. That reasoning still holds for *enforcement* — the workflow doesn't replace Phase 3 or `/ft-release`, it duplicates their exact commands as a free, automatic check on every push to `main` and every pull request, catching the case where a change lands without the assistant running the gate (e.g., a manual edit, or a Phase 3 step skipped under `--fast`). That off-machine placement is why this duplication is accepted: the workflow runs on GitHub-hosted runners, not where Phase 3 was (or wasn't) run. A pre-commit hook (§"Pre-commit hooks" below) would rerun the same checks on the authoring machine and would not add enforcement. The commands are identical by design (see AGENTS.md §"Validation"): AGENTS.md is the source of truth, and the four restatements (this workflow, `/ft-release` Step 6, `.flaitron/tasknote/README.md` §"Project quick commands", and this paragraph) are release-gated mirrors.

The second job, `drift`, runs the release-context-free subset of `/ft-release` §7.1's standing cross-file checks — wrapper-name invariant ([SPEC/layout.md](../SPEC/layout.md) §"Skill namespace"), shipped-skill parity, the context-budget check ([docs/CONTEXT-BUDGET.md](../docs/CONTEXT-BUDGET.md) §"Budgets"), and mirror Pairs A, B, C, H, J, M, N, O, P, Q, and R — as inline `run:` steps over a checkout-only runner. Same off-machine argument, one layer up: §7.1 is correct but only fires when a human cuts a release, and `CORE-469` was a live Pair B failure sitting in `main` between cuts. §7.1 remains the release gate and the broader superset; the checks that need release context or human judgment (SOP currency, the README task counter, installed-surface policy, self-wiring, Pairs D, F, I, K, and L, and Pair A's content half) stay there and are not duplicated here. No script is added, and the shell of each check lives in exactly one place. For the first three steps that place is the source — `SPEC/layout.md` and `step-7.1-standing-checks.md` — and the step is a copy adapted only to fail on a finding. For the eleven mirror pairs the workflow step *is* the shell (`CORE-631.2`): `step-7.1-mirror-pairs.md` keeps a catalogue entry per pair (purpose, a `Reads:` line naming what the step reads, the step name, and what a finding means), the design notes sit as `#` comments inside the step, and the release walk extracts every `Pair *` step from this file and runs it locally under `bash -e` before the cut, so a version-pin or doc-sweep edit made during the cut is still checked on the working tree. Before that, both surfaces carried the shell and `claude/skills/ft-release/**` paid for it twice against its context budget. One step has neither a source nor a catalogue entry: the final-newline check (`.editorconfig` `insert_final_newline` ratchet over `git grep -Il`-detected tracked text files, excluding the write-once tasknote archive) ships unbound — `claude/skills/ft-release/step-7.1-mirror-pairs.md` §"Pair L" names this as the accepted alternative to a new mapping row for a step that has nothing to mirror (`CORE-621`).

The two jobs must stay separate. §7.1 Pair H pins the `validate` job's `run:` steps to AGENTS.md §"Validation" byte-for-byte by extracting every `      - run: ` line in this file; the `drift` job stays out of that extraction by writing its steps as `- name:` + `run: |` block scalars, which is also the shape its multi-line checks need. The workflow carries a comment saying so. The `drift` job has its own binding — §7.1 **Pair L**, which compares the set of repo paths each step reads against its source fence (the three copied checks — repair the copy) or against its catalogue entry's `Reads:` line (the eleven pairs — repair the line), since neither a copy's "fail the step on a finding" delta nor a prose catalogue allows byte identity. It was minted after a `SPEC.md` → `SPEC/layout.md` repair landed in §7.1 and not in the CI copy, failing the job through an entire release cut (`CORE-546`, `CORE-543`).

### Dependency audit cadence

`npm --prefix viz audit --audit-level=high` runs once per release cut (`/ft-release` §6.2), not as a `validate`-job CI step. The other `validate` commands (`test`, `run typecheck`, `run lint`, `run build`) are pure functions of the code at a given commit — the same commit always passes or fails them identically, which is exactly what §7.1 Pair H's byte-for-byte binding to AGENTS.md §"Validation" is built to protect: a deterministic "passing" definition, verbatim on both the human-run and CI-run sides. `npm audit`'s result additionally depends on the public advisory database's state *at the moment it runs* — a commit that passes audit today can fail it tomorrow with zero code change of its own, for a dependency nobody touched in that push. Folding that into the `validate` gate would make an unrelated future push red for a reason outside the pushed diff — the same class of self-inflicted CI-badge failure this file already documents as a cautionary precedent above (`CORE-546`, a `drift`-job mirror miss that reddened CI for an entire release cut), just triggered externally instead of by a repair that missed a mirror.

This follows the same split the `drift` job already draws above: checks that need release context or don't hold steady against the commit alone (Pairs D, F, I, K, and L) stay in `/ft-release` §7.1 rather than gating every push. `npm audit`'s time-dependence is a variant of that same problem, and `/ft-release` §6.1 (CI status) already runs a per-cut, non-`validate`-roster check with this shape — flag-don't-block against a fixed commit — so §6.2 extends that pattern rather than inventing a new one. Given how frequently flaitron cuts releases, the staleness window between a per-cut audit and no gate at all stays small, so the epic goal (`CORE-EPIC-575`: make `npm audit` a signal again) is met without wiring external-database noise into the deterministic gate every commit must clear. `CORE-575.4` decided this in favor of cadence over a `validate` step.

Findings at `--audit-level=high` or above are not silently absorbed into the release: `/ft-release` §6.2 surfaces them, and anything not fixed inline gets filed as a follow-up PLAN.md task (`/ft-file-followup`) before the cut closes.

`.github/dependabot.yml` (`CORE-581`) is the continuous complement to this cadence, not a duplicate of it: GitHub's per-repo "Dependabot security updates" setting opens a PR the moment an advisory is published, closing the staleness window this section accepts between per-cut audits, while `open-pull-requests-limit: 0` on each `updates:` entry keeps Dependabot's *version*-update PRs suppressed — that volume is exactly what `CORE-EPIC-575` chose cadence over, and folding it back in through Dependabot instead of `npm audit` would reintroduce it.

Majors currency is the sibling look, not a second `validate` step: `/ft-release` §7.1's standing viz-majors-outdated check runs `npm --prefix viz outdated` once per cut, advisory-only (`CORE-639.3`). Same registry-time reasoning as the audit cadence above — latest majors move on the public registry, not on the commit — so it never joins Pair H and never blocks the tag.

### Archived-tasknote integrity floor

Every tasknote archived on or after **2026-09-20** must satisfy two closure facts that [SPEC.md](../SPEC.md) §"Acceptance tick-through" and §"🚀 Phase 4: Closure" state and that, until `CORE-EPIC-610`, nothing executed: YAML `status: completed`, and no bare `- [ ]` under `## ✅ Acceptance` — every unticked box carries an annotation, canonically `N/A — <reason>` or `not met — <reason>`. The check is `/ft-release` §7.1 **Pair P**, lifted into the CI `drift` job (§"GitHub Actions CI" above) and bound to its source by Pair L.

- **The floor is forward-only and never moves.** Archived tasknotes are historical records (SPEC.md §"Write-once policy"); the September 2026 audit that filed the epic found 13 of 132 archivals with bare boxes and one with `status: in-progress`, and none of them is rewritten. A note whose `**Archived:**` stamp is before the floor is exempt by date. Moving the floor earlier is a backfill; moving it later is an amnesty. Neither is done.
- **The token is what the check reads.** `N/A` or `not met` / `not-met`, case-insensitive, anywhere on the box's line satisfies it. The em-dash form above is the canonical spelling and what closure writes; the tolerance exists so a punctuation variant in an already-archived note does not redden CI and invite an edit to a write-once record.
- **An unparseable stamp exempts the note.** A note with no `**Archived:** YYYY-MM-DD` line cannot be placed against the floor and is skipped. Two legacy notes carry the template placeholder, which is why the exemption exists; a future closure that leaves the placeholder unfilled is a stamp miss the pre-archive gate (`CORE-610.4`) owns, not this floor.
- **`## 🧩 Subtasks` is not read.** Unticked Subtasks boxes at archive time are correct, not drift (SPEC.md §"Acceptance tick-through" → "`## 🧩 Subtasks` is exempt").
- **A finding is fixed on the closure, not the archive.** Re-open the note, make the `status:` flip and the tick or annotation as the pre-archive write it should have been, and land it in one commit that says so. The archive is never patched in place to satisfy the check.

### Canonical source with labeled mirrors

When one rule has to be readable at several points of use, flaitron writes the justification **once** in a canonical section and restates it at each point of use as a **labeled mirror** — a restatement that names the canonical section it mirrors. It does not consolidate the restatements into bare pointers.

The worked example is the no-runtime rule (*contract in flaitron, runtime in the runner*). [VISION.md](VISION.md) §"What we won't accept" carries the justification; [SPEC/scope-boundaries.md](../SPEC/scope-boundaries.md) §"PR / suggestion archetypes flaitron does not accept" carries a terse per-bullet mirror for mid-task discipline; and [`SPEC/loop.md`](../SPEC/loop.md), [`SPEC/gate-postures.md`](../SPEC/gate-postures.md), [EXTERNAL-AGENTS.md](EXTERNAL-AGENTS.md), and [WORKTREES.md](WORKTREES.md) each restate the one rejection that bears on their own surface. Every one of those names VISION.

Two properties make this a convention rather than accumulated duplication:

- **A mirror is an application, not a copy.** Each restatement is the rule *as it bears on one surface* — a PR filter, a loop runner's boundary, the `--unattended` posture, a fan-out caveat. Collapsing them into one link loses the application, and it costs a doc-load at exactly the moment a reader is deciding something local. `SPEC/scope-boundaries.md`'s list declares itself "for future-AI mid-task discipline"; an assistant mid-task should not have to load `VISION.md` — which is deliberately lazy, never read at cold start (see `.flaitron/tasknote/README.md` §"AI-referenced docs", where membership means *swept for drift*, not *loaded at cold start*) — to learn that a scheduler is out of scope.
- **A mirror is labeled, so drift is legible.** An unsourced restatement reads as accidental duplication to anyone auditing from outside, which is how this convention came to be written down at all (CORE-487, routed in from a cross-repo sweep that could not tell intent from drift). The label is what makes the difference visible without a validator.

Consistent with §"Schema validators" in VISION.md, the prose is not machine-checked: markdown is the schema and the assistant catches wording drift. What *is* mechanical is the label — `/ft-release` §7.1 **Pair K** checks that each mirror's citation resolves to a real canonical bullet and that each point-of-use section still names VISION. That guards pointer rot and citation rot, and claims nothing about paraphrase.

### Section citations may target a heading or a bold-lead paragraph

A `` `<file>.md` §"<Section>" `` citation resolves against either a markdown heading (`## `/`### `) or a **bold-lead paragraph** — a paragraph opening `**Title.**` — and both shapes are in wide use across `SPEC.md` and its `SPEC/*.md` modules. Bold-leads let a section stay unpromoted prose while still being individually citable, without inflating the document's heading structure with every named concept. Four bold-lead targets surfaced the rule at once — `SPEC.md` §"Deferred hand-off filing", `SPEC/plan-filing.md` §"Unattended filing authority", `SPEC/blocked.md` §"Exit (resume)", `SPEC/tasknote-selection.md` §"File a starter" — each cited from other surfaces while every mechanical check of the day matched a literal `## ` heading only (surfaced by `/ft-audit-repo` 2026-09-19, CORE-609).

- **The check is `/ft-release` §7.1 Pair Q, lifted into the CI `drift` job.** It reads every path-bearing citation in live markdown (backticked, bare, or `[link](path)` shape) and asks the target for a line that opens `# <Section>` at any heading level or `**<Section>` as a bold-lead. CORE-609 recorded the gap as accepted, on the same reasoning `CORE-492` and `CORE-543` had declined a resolver twice: zero genuine dangles, and false positives from `## Completed` rows quoting the drift they record. `CORE-622.3` landed it once `CORE-620` had rotated those rows into `.flaitron/PLAN-ARCHIVE.md` (excluded with the tasknote archive, both write-once) and the remaining false positives were placeholders the skip rule reads as such.
- **A citer's obligations.** The title is a prefix of the heading text, emoji included (`§"🚀 Phase 4: Closure"`, not `§"Phase 4: Closure"`); a sentence-ending period sits outside the quotes; an illustrative citation uses the placeholder shape (`` `<file>.md` §"<Section>" ``); a bare `§"…"` with no adjacent path is prose, not a checkable pointer; an absolute or `~`-rooted path points out of the repo and is skipped, not resolved (CORE-651.2). A finding is fixed on the citer — repoint or retitle — never by renaming a heading back to satisfy it.

### Verify behavioral claims against flaitron's own source

When filing a PLAN.md line or SPEC prose that asserts a *consequence* of flaitron's own behavior — not just restating a rule — verify the claim against flaitron's own canonical implementation (`viz/src/parser.ts` for grammar/parsing claims) before writing it. An adopter's independent reimplementation, or that adopter's own observed behavior, is not evidence of what flaitron itself does. Flaitron ships no runtime (`SPEC/scope-boundaries.md` §"PR / suggestion archetypes flaitron does not accept"), so a consequence phrased in terms one presupposes — "dispatches," "executes," "runs" — usually describes an adopter's execution model rather than flaitron's.

The failure recurred twice before this was written down. CORE-494 corrected a PLAN.md line claiming `[!unattended]` "drops the whole line" — true of an adopter's reader, but flaitron's own parser instead fails `TASK_LINE` and surfaces the row in `parsePlanWithDiagnostics().unparsed`, not silently. CORE-531 then filed a "silently dispatches" consequence for a malformed `Blocked by` clause; CORE-533 replaced it with the flaitron-true consequence — "nothing that reads the field sees the dependency" (`SPEC/plan-parser.md` §"Long-description conventions") — since "dispatches" presupposed a runtime flaitron does not have.

A filer verifies each behavioral claim against `viz/src/parser.ts` before writing the line.

## Declines

### CHANGELOG.md

Flaitron does not maintain a separate `CHANGELOG.md`. The pattern declined is [Keep a Changelog 1.1](https://keepachangelog.com/en/1.1.0/) — no `[Unreleased]` section, no exhaustive Added/Changed/Fixed taxonomy, no parallel hand-maintained dump of every commit.

Each release tag's annotated message carries the per-release summary and migration steps. From the `README.md` §"Version": full notes live in the tags; adopters read them with `git show vX.Y.Z`. A Keep-a-Changelog file would have to be hand-maintained alongside those messages without adding information.

**Scannable highlights (not a CHANGELOG).** [`docs/VERSION-HISTORY.md`](VERSION-HISTORY.md) is a curated, moderately-coarse highlight reel (main themes + optional secondary wins; patches as one-liners). It is deliberately coarser than the tag bodies and is prepended by `/ft-release` when a cut lands — tags remain the SSOT for full notes and migration steps. The annotated-tag message structure (subject + summary + changes + adopter migration block) is also visible in the release tasknotes archived at `.flaitron/tasknote/archive/core/`.

### ADRs as a separate registry

The pattern declined is a separate `adr/` directory of numbered decision records (e.g. [adr.github.io](https://adr.github.io/) / Michael Nygard's template).

Important nuance: flaitron's tasknote shape already carries decision records. Each tasknote opens with spec-on-top (Goal, Acceptance, Subtasks, Related) and concludes with a log-below (4 phases of execution + final summary). That structure mirrors Context / Decision / Consequences. Tasknotes are searchable, cross-linked via `[[wikilink]]`, and archived alongside the code change they justify.

What flaitron declines is the separate registry — not the act of recording decisions. A new `adr/0001-*.md` would duplicate the tasknote it's mirroring.

### Release automation

Flaitron does not use tools like [release-please](https://github.com/googleapis/release-please) or [semantic-release](https://github.com/semantic-release/semantic-release). Releases are cut manually via the `/ft-release` skill.

Two reasons. First, release-automation tooling typically reads Conventional Commits to generate a CHANGELOG — which flaitron declines (see above). Second, automation couples release timing to commit history, where flaitron prefers release timing to be a deliberate human judgment ("is this a coherent release-worthy unit?"). The skill encodes the recipe; the decision to cut a release stays with the maintainer.

Backing principle: [PHILOSOPHY.md](PHILOSOPHY.md) §"The decisions that fall out" (Zero scripts) — flaitron's "operations" are markdown edits and `cp` / `mv`, executed by the assistant via skills, not by background tooling.

### Pre-commit hooks

Flaitron does not ship pre-commit hooks. The pattern declined is [pre-commit](https://pre-commit.com/)-style framework hooks.

Validation runs inline as Phase 3 of every tasknote — targeted tests, lint and type-check on changed code, optional visual confirmation for frontend changes. Phase 3 is part of the workflow contract (see [SPEC.md](../SPEC.md)) and runs in the same context where the change was authored. Hooks would duplicate that check at commit time on the same machine — if Phase 3 was skipped, a hook only repeats the gate in the same context; it does not catch a landed change the way §"GitHub Actions CI" does by running off the authoring machine.

Same backing principle as release automation: [PHILOSOPHY.md](PHILOSOPHY.md) §"The decisions that fall out" (Zero scripts) — the assistant is the validator, and the workflow phase is the gate.

### MCP servers

Flaitron does not ship an [MCP](https://modelcontextprotocol.io/) server. The pattern declined is exposing the workflow to the assistant as a tool surface rather than as markdown it reads — the shape taken by [claude-task-master](https://github.com/eyaltoledano/claude-task-master) and [Backlog.md](https://github.com/MrLesk/Backlog.md).

The objection is cost, not capability. An MCP server's tool definitions occupy the context window before any task work begins — task-master ships 36 tools totalling roughly 21k tokens, and added selective tool loading specifically to claw some of that back. That is a direct trade against [SPEC.md](../SPEC.md) §"Core principles" #3 (One task per context window), which sizes tasknotes so the assistant holds the whole scope in working memory. Flaitron spends its context budget on the task, not on the interface to the task.

Nothing in the workflow needs a tool call. A tasknote is a file the assistant reads; closure is a `mv`. Wrapping `cp` and `mv` in a protocol adds a server to run and a schema to version without changing what happens.

Backing principle: [PHILOSOPHY.md](PHILOSOPHY.md) §"The decisions that fall out" (Zero scripts) — "If a script feels needed, the answer is almost always 'no, that's the assistant's job.'"

### Package-manager and marketplace distribution

Flaitron is distributed as a git submodule only. The patterns declined are global package-manager install (`npm i -g backlog.md`, `uv tool install specify-cli`), agent plugin marketplaces (`/plugin marketplace add`), and skill-pack installers (`npx skills add …`).

The submodule is not incidental packaging — it *is* the mechanism behind [SPEC.md](../SPEC.md) §"Core principles" #5 (Versioned and pinned). An adopting project pins a specific flaitron commit, sees no change until a deliberate `/ft-update` bump, and can read its own pinned contract at `.flaitron/core/SPEC.md`. A package manager resolving a version range, or a marketplace pushing the current release, replaces that deliberate bump with an implicit one.

The skills also assume it. Every skill resolves its contract root to `.flaitron/core/` (see [`claude/skills/ft-task/SKILL.md`](../claude/skills/ft-task/SKILL.md) §"Step 0 — Resolve paths"). A marketplace install would deliver the skills without the contract they read, producing an inert install — or force a second bundled copy of SPEC.md, splitting the single source of truth the submodule exists to guarantee.

The cost is acknowledged: adoption is a `git submodule add` plus symlink wiring rather than one install command, which is real friction for a first-time adopter. `/ft-new-project` absorbs it in one pass. The friction buys the pin.

This is distinct from the CLI carve-out in [SPEC/scope-boundaries.md](../SPEC/scope-boundaries.md) §"What flaitron does NOT provide" — that entry rules out flaitron *being* a CLI; this one rules out flaitron being *delivered* by one. A package-manager-distributed flaitron would still be pure markdown, and is still declined.

### Template override stacking

Flaitron resolves each template from exactly one place: `templates/` in the pinned submodule. The pattern declined is layered template resolution — [spec-kit](https://github.com/github/spec-kit) stacks project overrides → presets → extensions → core defaults, four levels deep, with per-project override directories.

Customization is a real need and flaitron already answers it once, at a single seam: the `ft-audit` skill ships as a stack-neutral scaffold that adopters **fork** into `.claude/skills/audit/` (see [MIGRATION.md](MIGRATION.md) §1.2.1). A fork is legible — the adopter owns a file and can diff it against the scaffold. A four-level priority chain is not: answering "which template actually rendered, and why" requires resolving the stack in your head.

Backing principle: [SPEC/scope-boundaries.md](../SPEC/scope-boundaries.md) §"PR / suggestion archetypes flaitron does not accept" — "Abstractions without two-project precedent." No two adopters have yet needed the same override shape; until they do, forking a scaffold is cheaper than a resolution engine.
