# Version history

Curated, moderately-coarse highlights of flowtron releases. Newest first.

This is **not** a [Keep a Changelog](https://keepachangelog.com/) file and not
a substitute for git tags. Full per-release notes, change groups, and adopter
migration steps live in each annotated tag message:

```sh
git show vX.Y.Z
```

**How to read an entry**

- **Minor / major** (`vX.Y.0` / `vX.0.0`) — headline + a few main themes;
  optional short “also” list for secondary wins.
- **Patch** (`vX.Y.Z` with `Z ≠ 0`) — one-line subject only.

**Maintenance.** `/ft-release` prepends a new entry when a cut lands (same
session as the annotated tag message). Do not hand-edit historical entries
unless correcting a factual error.

---

## v5.35.0 — the release cut stops on Medium and Low findings

- /ft-release stops and asks when a docs sweep still has Medium or Low findings. Release anyway files them. Stop holds the cut.
- Closure commits and does not push. Push stays its own gated step.
- Capability probes and the platform trigger rows limit unattended-mode.md to the three tasknote drivers. /ft-file-followup keeps the posture inline.
- The context-budget check exempts a specific row from the skill glob, so ft-release's 40,000 cap is the one that applies.

Also: calibration roster restamped; the neutrality ledger recounts flag sites after the gate-catalog move; the README names all five worktree decisions.

## v5.34.0 — Codex verification, a live Grok sub-agent row, and the gate catalog moved out of SPEC

- CORE-EPIC-677 records how Codex discovers and runs flowtron, repairs a workflow-route mismatch, and gives Codex-only new installs a staging command derived from the snippet.
- The Grok sub-agent row names the live spawn_subagent parameters. A probe is read-only only when the prompt says so.
- The historical gate-skip catalog moved to docs/GATE-DISCIPLINE.md. SPEC/gate-discipline.md keeps section homes and the refused carve-out.
- A filing whose PLAN.md dirt is only new task rows now commits those rows with itself.

Also: Grok 4.7 is the calibration default; the ft-task SOP restates the Phase 4 Learnings item; the viz lockfile picks up brace-expansion 5.0.12 and undici 8.11.2.

## v5.33.0 — a review probe closes Phase 3's self-grading gap, plus context-headroom and viz cleanup

- Phase 3 gains an External review box — a context that did not write the diff grades it against Acceptance before closure, on two rungs (blocker / note). Claude runners use `/code-review medium`; other runners brief a read-only sub-agent.
- `/ft-audit`'s `context` domain gains a sixth "Contract decay" pass (flowtron-self only).
- Visualizer gets a "Ready" filter (FE-124) and a comment/provenance trim pass (FE-EPIC-125 + FE-126).
- A context-headroom epic closed, shrinking several always-loaded and lazy SPEC surfaces with no cap raised; a second-pass harness survey added.

Also: `/code-review medium` pinned explicitly at every External-review call site; a CI Pair Q drift fix; a PLAN.md placeholder-convention doc.

## v5.32.0 — a Handoff Chip, natabula decoupled from the public tree, and a hardened gate-reliability epic

- The visualizer gains a Handoff Chip on task rows, surfacing hand-off context inline.
- CORE-EPIC-652 reworks or labels every non-archive reference to the operator's private `natabula` fleet layer in flowtron's own tree, so a public reader never meets a bare pointer into a layer they can't see.
- CORE-EPIC-651 closes out CI/test reliability gaps: Pair Q now skips out-of-repo citations instead of misreporting them, the fleet-updater test suite's cleanup race is fixed, and the Node engines matrix and lockfile are back in sync.
- `gray-matter` is replaced with an in-repo frontmatter splitter, unblocking the js-yaml 4→5 bump parked since v5.31.0.

Also: a `brand/` identity kit for flowtron itself; `/ft-audit`'s scaffold-bootstrap gains a flowtron-self install-context branch.

## v5.31.0 — dogfood-archive exclusion guidance, one-body mirror pairs, and rotation advisories on every closing surface

- Adopters are told to keep the submodule's ~14 MB dogfood archive at `.flowtron/core/.flowtron/` out of search and context tooling — a per-tool recipe in `docs/MIGRATION.md` §1.1, mirrored by every `AGENTS-snippet.md` and deposited by `/ft-new-project`.
- `ci.yml` becomes the single body for the ten lifted §7.1 mirror pairs; the release walk extracts and runs them locally before each cut, and `ft-release`'s directory total drops ~9k chars.
- `/ft-micro-task`, `/ft-close-epic`, and `/ft-release` surface the `## Completed` >60-row rotation advisory `/ft-task` already had; a PLAN-ARCHIVE month heading stays open to appends for as long as it exists.
- CI gains a Node 24/26 matrix, job timeouts, and Pair R (every checked stub row keeps its `| shortname`); four viz majors land, js-yaml 5 and typescript 7 park as upstream-blocked.

Also: `README.md` logo served as a 4.5 kB webp; `/ft-release` lists pending viz majors as an advisory; `docs/CONTEXT-BUDGET.md` rows for the gate-postures and ft-task SOP re-measured.

## v5.30.0 — a shared plan-grammar fixture suite, the /ft-seed skill, and drift ratchets lifted into CI

- `SPEC/fixtures/plan/` ships six whole-file PLAN.md samples with expected-parse JSON as the conformance suite every PLAN.md parser tests against; the visualizer's parser is the reference consumer.
- `/ft-seed` bulk-seeds `[unattended]` onto an existing plan — every open row walked with the candidacy predicate, the token written only on rows the operator keeps inside one review gate.
- CORE-EPIC-622 closes three drift-ratchet gaps: a directory-total budget row for `ft-release`, a section-citation resolver (Pair Q) over every path-bearing `§"Title"` citation in live markdown, and the `node:*` guard extended to the visualizer's shared-pure modules with `vite build` now run in CI.
- Under `--unattended`, Phase 3 runs the repo's full validation set instead of the attended targeted default; a red the run cannot make green parks `input-needed`.

Also: Pair H (validation roster) and an `.editorconfig` final-newline ratchet join the CI drift job; the CI gitleaks tarball is checksum-verified; dogfood receipts get a literal fenced template.

## v5.29.0 — a leaner skill roster, a tiered gate load, and an executable archive-integrity floor

- Three utility skills retire — `ft-flowtron`, `ft-stats`, `ft-audit-context` — the last folded into `/ft-audit` as its eighth `context` domain; the seven largest skill descriptions trim to ≤400 chars.
- The `--fast` / `--unattended` postures move into a lazy `SPEC/gate-postures.md`, the post-closure protocol into `SPEC/post-closure.md`, and the runners state the unattended posture once at Step 0 — a flagless `/ft-task` cold start drops from ≈172k to ≈119k chars.
- Every closure surface refuses the archive `mv` until `status: completed`, an annotated Acceptance list, and a filled `**Archived:**` stamp check out; CI Pair P enforces the same floor over tasknotes archived on or after 2026-09-20.
- `## Completed` rotation lowers to a single 60-row threshold (oldest rows by count, cohorts atomic); flowtron's own board rotates 88 rows.

Also: the `[model]` ladder lives in `SPEC.md` and the vendor calibration table in `docs/PLATFORMS.md`; the fleet updater reports legacy-only workspaces; the visualizer gains a shared `storage.ts` helper.

## v5.28.0 — the [handoff] marker, the flowtron↔caobunga caller boundary, and filing-contract hardening

- `[handoff]` is ratified as the second canonical trailing token on a PLAN.md row — an operator's declaration that the row stops mid-run for a human act; an operator-less caller declines it, an attended run is unchanged.
- The flowtron↔caobunga concert epic closes the caller-write boundary: a caller commits nothing of its own into a producer repo, `park-reason:` values are YAML-safe, and VISION records the one-real-consumer exception to the two-project rule.
- The PLAN.md-row contracts (filing commits, `## Completed` stub form, rotation) move into a new `SPEC/plan-filing.md` module, and every filing runner gains an index-empty pre-check plus a post-stage read of the staged index, bound by a new CI drift check (Pair O).
- The visualizer renders the `[unattended]` chip and tightens its SSE origin guard to reject same-site requests.

Also: `/ft-release`'s dogfood gate is hardened against parallel-session stamp writes, the consumer-less `paths:` frontmatter leaves the `SPEC/` modules, and the fleet updater's self-skip compares realpaths.

## v5.27.0 — skill consolidation, the [unattended] candidacy contract, and release/CI integrity hardening

- Five overlapping skills fold into their survivors: `ft-goal-task` into `ft-task`, `ft-starter-task` into `ft-file-followup --starter`, `ft-spec` and the `ft-worktree-start`/`-end` pair demoted into docs.
- Every filing surface (`/ft-epic-discovery`, `/ft-file-followup`, `/ft-audit`, `/ft-refactor`) now proposes the `[unattended]` marker under one shared candidacy contract, confirmed at the write-step review gate rather than seeded silently.
- Release/CI integrity hardens: a gitleaks secret-scan CI step, the context-budget check lifted into the CI drift job, and a documented `npm audit` cadence backed by Dependabot.

Also: a js-yaml CVE bump (GHSA-2883) in the visualizer, an `/ft-task` area-resolution fix, and a stricter `/ft-audit` finding format requiring a concrete operator action.

## v5.26.0 — the unattended posture reaches the filing motion

- `/ft-file-followup --unattended` lets an operator-less closure discharge the
  deferred-hand-off filing duty `SPEC.md` imposes on it — commit authority comes
  from the duty itself, with every attended guardrail still binding.
- The two skills that previously hung on the flag now terminate readably instead
  of firing a question into an empty session.
- `/ft-release` gained a blocking CI-status gate on the commit it builds on, after
  v5.25.0 was tagged on a commit whose own CI run had concluded `failure` with
  nothing reading it.
- §7.1 Pair L binds the `drift` CI job to the release checks it hand-copies,
  closing the gap that let that failure sit unnoticed through a whole cut.

Also: five doc-accuracy fixes including the stale grep that reddened the CI badge;
the agent-neutral `ft-task` SOP caught up with its source template; and
`viz/package.json`'s version documented as deliberately unmaintained.

## v5.25.0 — a context-load diet for the contract layer

- `SPEC.md` shed 647 lines into eight new lazy `SPEC/` modules that load only
  on the task shape that needs them — every section stays reachable, only the
  load timing moves.
- The three largest lifecycle skills now cite their canonical SPEC homes
  instead of restating them (83,391 → 72,450 bytes).
- New `docs/CONTEXT-BUDGET.md`: per-file byte budgets with a measured ledger,
  checked and refreshed by `/ft-release` at every cut — the ratchet the
  earlier `SPEC.md` split never had.
- Gate machinery untangled and relaxed where it was over-tight, with the cue
  vocabulary and skip-discipline prose split into their own modules.

Also: a cross-site navigation guard and three structural cleanups in the
visualizer; the fleet updater now exits cleanly on an unreadable fleet root.

## v5.24.0 — self-hosting Claude Code, and a documentation drift sweep

- Flowtron now self-hosts its own Claude Code agent guide via a repo-root `CLAUDE.md` → `AGENTS.md` symlink.
- An audit-context sweep fixed 12 cross-reference, wording, and drift issues across the contract-layer docs.
- Split `/ft-release` §7.1 and the epic-discovery/close-epic skills into lazy fragments for maintainability (no behavior change).

## v5.23.0 — scaffold-time orientation, a parser footgun closed, and a release-race backstop

- `/ft-task`, `/ft-micro-task`, and `/ft-goal-task` now emit a two-line
  plain-English purpose blurb before Phase 1 begins, closing the cold-start
  read gap after a bare `/ft-task <ID>` invocation.
- Fixed a PLAN-line parser footgun: a row combining the model-suggestion
  glyph with `[unattended]` (either order) now parses instead of silently
  dropping from the board.
- `/ft-release`'s dogfood-gate stamp writes now run a dirty-check before
  writing, catching a parallel dogfooding session's uncommitted edits
  instead of overwriting them.

Also: settled a re-raised carve-out attempt against the `--unattended` 👁️
visual-confirmation park (a passing visual baseline does not exempt a run).

## v5.22.0 — [unattended] grammar, cross-repo remit, and portable worktrees

- `[unattended]` is now canonical task-line grammar rather than a parser
  tolerance: SPEC names it, fixes its position after `[model]`, and the viz
  parser captures it into `Task.unattended`.
- New `SPEC.md` §"Cross-repo edit remit" — a tasknote's deliverable lands in
  the repo whose session opened it; cross-repo work gets filed there instead.
- `/ft-worktree-start` and `/ft-worktree-end` derive the worktree parent from
  the project root instead of hardcoding `~/code`, so they work for adopters
  whose repos live anywhere.
- Fleet updater stops reporting an unresolvable git lookup as `✓ current`,
  skips adopter hooks on the bump commit, and memoizes tag-SHA lookups.

Also: viz archive-scale performance (bounded cache, targeted SSE refetch,
collapsed-section unmount); the no-runtime mirror pattern ratified with a
release-time guard; `/ft-release` now files its own release line.

## v5.21.0 — the [xheavy] exploratory model tier

- New manual-only `[xheavy]🔭` rung above `[heavy]` for deliberate
  exploratory-depth work, always surfacing an under-tier advisory rather
  than blocking; automated choosers stay capped at `[heavy]`.
- Practical model-tag guidance flips to a round-up default (`[medium]`
  default, `[light]` reserved for provably mechanical work).
- New maintained platform×model×effort calibration table in `SPEC/model.md`.

Also: screenshot-discipline epic (personal policy only, no flowtron-shipped surface).

## v5.20.0 — the --unattended operator-less posture

- New `--unattended` posture (CORE-EPIC-473): callers with no operator
  present get a structured `status: blocked` park instead of a banner into
  an empty session, wired across `/ft-task`, `/ft-micro-task`,
  `/ft-goal-task`, and `/ft-close-epic`.
- New `park-reason:` frontmatter key (six-code closed set) and an
  interrupted-run resume path for a session stranded mid-flow.
- New `docs/EXTERNAL-AGENTS.md` §"The Orchestration Contract" for
  operator-less callers.
- `/ft-release`'s version-edit recipe trimmed from 5 pins to 3 (dead
  `VIZ_VERSION` constant removed); new Pair J drift gate for command
  `argument-hint:` flags.

Also: viz vitest-flake fix, `/api/plan` realpath-containment hardening, and
an internal registry/orphan-code trim.

## v5.19.0 — viz App decomposition, /ft-refactor depth-planner, PLAN.md rotation contract

- New `/ft-refactor` depth-planner skill: read-only survey (dependencies, seams, coverage) → sequenced, behavior-preserving refactor plan filed as an epic
- viz's `App.tsx` decomposed into extracted hooks and components (prefs/selection state, header, diagnostics, derived selectors)
- PLAN.md's `## Completed` section bounded by a rotation contract into a new sibling `.flowtron/PLAN-ARCHIVE.md`; viz and `/ft-stats` read both files
- `/ft-release` now publishes GitHub Releases on push-go, and its §7.1 drift checks also run in CI on every push

Also: Grok/Codex/Cursor platform-parity hardening (`--park`/`--worktree` flag parity, Codex trigger-table backfill), a viz major dependency bump (React 19, Vite 8, Tailwind 4), and a wave of doc-currency fixes.

## v5.18.0 — graph-lite planning YAML, epic fan-out, NAS/TERM cues

- Graph-lite: omit-when-absent YAML planning keys, Discovery `.1` fan-out, archive decision-link skim, viz optional-edge chips
- 📡 NAS and 💻 TERM destructive-action cues; ▶️ RUN narrowed to generic/agent-adjacent commands
- viz parser: completed rows by checkbox; tolerate adopter PLAN.md near-misses

Also: docs/SECURITY hygiene; CI full-history fetch for updater tests.

## v5.17.0 — Cursor wiring, viz fleet-scale watcher, CI + filing auto-commit

- Cursor first-class thin wiring (snippet + procedure pointer); fourth
  dogfood-gated row; Claude-wired projects already work via compat load
- viz fleet-scale watcher: split watch set + project-attributed SSE
- GitHub Actions CI; filing-skill auto-commit; 📦 fire set shrunk to
  privileged-ops + bundled prompts
- Curated VERSION-HISTORY prepended by `/ft-release`

Also: honest viz edge states; release-gate pairs F–H; canonical install-path
rule; YAML `!!omap` reject.

## v5.16.0 — release-gate hardening, fleet-updater fail-closed, viz correctness

- Standing release checks: mirror pairs, skill parity, self-wiring, README
  task-counter, SOP-currency (first end-to-end exercise of the post-v5.15.0 suite)
- Fleet updater fail-closed (unclassifiable tags treated as migration-bearing)
  plus exit/stderr hygiene and mid-fleet failure fixtures
- Large viz correctness cohort: fence-aware parsing, Escape precedence,
  near-miss diagnostics, modal-gated keyboard nav

Also: emoji-surface / tick-through / superseded-claim SPEC polish; archive-folder
naming rule; worktree isolation + portable Handoff + subagent-probe template.

## v5.15.0 — skill-roster rationalization (26→18) + SOP-currency gate

- Roster cut: fold `/ft-debug` → `/ft-task --debug`, `/ft-sidequest` →
  `/ft-file-followup --park`; retire `/ft-quality`; collapse five
  `ft-audit-*` siblings into parameterized `/ft-audit <domain>`
- SOP-currency flag-don't-bump check on every `/ft-release` cut
- Dogfooded under Claude Code, Grok Build, and Codex CLI at this version

Also: Phase 4 status/closure hygiene; flag-surface and wrapper invoke-name
sweeps; self-symlink / cross-artifact consistency.

### v5.14.1 — doc-currency + mirror fixes

## v5.14.0 — clean-code contract, portable release gates, Claude 5 model roster

- Clean-code contract across all four phases (Best Practices → Minimal
  Refactor Gate → Quality Assertions → evidence-based recap) without a new
  phase or validator
- Model roster refreshed for Claude 5; effort / context variants stay off
  the `[model]` token vocabulary
- Updater hardened + portable release-gate suite (`update-adopters` tests
  registered beside viz checks)

Also: epic-child closure placement under active parent until `/ft-close-epic`.

## v5.13.0 — paper-complete guard

- Paper-complete guard: no Completed without deliverables in the same commit;
  foreign-dirt hard stop; deliverable-covering 🏁
- Automated tests for `update-adopters`; workflow-state hygiene (archive
  consolidate, orphan sidequest cleanup)

## v5.12.0 — /ft-spec review-first spec skill + model-roster glyph refresh

- New `/ft-spec` — review-first design capture (never files PLAN/tasknotes
  on its own); adopter-installed on Claude + Codex
- 🧩 MEDIUM third glyph + effort-axis calibration; viz glyph tolerance
- Suggested-id filers; release-wiring guardrails and safety-net fixes

## v5.11.0 — Codex skill bundle and updater parity

- Full Codex `ft-*` wrapper inventory under `codex/skills` +
  `.agents/skills` wiring path
- Updater detects and wires newly shipped Codex skills when that surface
  already exists
- Docs: sidequest wording; Claude bootstrap verification count alignment

### v5.10.1 — patch release closing CORE-EPIC-342 audit

## v5.10.0 — /ft-sidequest mid-session idea parker

- `/ft-sidequest` parks ideas/quick fixes mid-session (tiny stub + PLAN
  line); priority via `--low` / `--med` / `--fut`
- (Later folded into `/ft-file-followup --park` at v5.15.0; stubs keep working)

### v5.9.1 — plan-exhausted terminal-state SPEC branch

## v5.9.0 — dotN subtask grammar, viz parser/UI resilience

- Reserved terminal `.N` audit-child grammar in epic skills + viz parser
  (numeric audit children stay backward-compatible)
- Viz resilience: exclude legacy unparsed noise, ProjectSelector overflow,
  HTML-comment-aware checkboxes, SSE write-error guard

## v5.8.0 — viz PLAN resilience, loop-integration, and adopter-surface polish

- Viz PLAN grammar tolerance (glyph/stacked models/status) that had been
  silently dropping rows; per-row ErrorBoundary; search reaches subtasks
- `/ft-goal-task` + `SPEC/loop.md` — execute→verify loop under budget
- Adopter-surface / agent-alignment sweep + new logo

### v5.7.2 — release migration sentinel hardening

### v5.7.1 — viz surface fixes + repo-best-practices sweep

## v5.7.0 — adopter version-currency visibility + batch updater

- Viz project chips show version-currency (green at latest / red behind)
- Maintainer-side `tools/update-adopters.mjs` batch-bumps clean adopters
  across `~/code` (dry-run default; never pushes)

## v5.6.0 — first-contact holistic audit skill

- `/ft-audit-repo` — first-contact holistic audit for freshly adopting projects

## v5.5.0 — clearer hand-off cues + fable model vocabulary

- Hand-off copy-paste de-anchored from a hardcoded 🔧 example glyph
- New 👇 HERE cue for in-session “run here, don’t clear” skills
- `fable` recognized as a heavy-tier concrete model token

## v5.4.0 — downstream-impact reconciliation

- Downstream-impact reconciliation scan on new filings and mid-flow
  direction changes — propose merge/nest/edit/delete/leave per impacted
  PLAN row; never auto-rewrite the plan

## v5.3.0 — adopter audit-fork overlays, drift detection, and release-flow hardening

- Thin audit-overlay fork path + fork-provenance markers so `/ft-update`
  can warn when upstream scaffolds moved
- `/ft-release` context-budget escape hatch; audit trivial-fix inline
  carve-out; worktree-end hardening

## v5.2.0 — cross-agent skill projection + /ft-update adopter bump

- `SPEC/procedures/` agent-neutral SOP layer + Grok/Codex pointer wrappers
- `/ft-update` — adopter pin bump to latest released tag (consumer
  counterpart to `/ft-release`)
- Claude / Grok / Codex all dogfooded at this version

## v5.1.0 — release-time dogfood gate

- Release-time dogfood gate: every dogfooded agent row must refresh or
  explicit-skip at each cut

## v5.0.0 — dotfolder convention (_project/ → .flowtron/)

- **Breaking layout:** `_project/` → `.flowtron/` across the contract,
  templates, migration, and skills
- Major line for the post-agent-neutral stack

## v4.5.0 — cross-agent operator cues + [medium] model tier

- Cross-agent operator-cue vocabulary
- `[medium]` third model tier on the light < medium < heavy ladder

## v4.4.0 — agent-compatibility surface

- Living agent-compatibility matrix + capabilities / platforms stamps
  (`docs/AGENT-COMPAT.md` and related)

## v4.3.0 — hypothesis-first debugging + isolated worktrees

- Hypothesis-first debug cadence (later `/ft-task --debug`)
- Isolated worktrees for parallel epic children (`/ft-worktree-start` /
  `/ft-worktree-end`)

## v4.2.0 — agent-neutral [heavy]/[light] model labels + post-closure UX

- Agent-neutral category model labels (`[heavy]` / `[light]`)
- Post-closure UX refinements (model-agnostic suggestion quality)

## v4.1.0 — context-chain portability + viz header + SPEC signal improvements

- Context-chain verified under Grok; CLAUDE.md surface consolidated
  (flowtron-self)
- Viz header logo + live version subline
- SPEC signal trims (Model Selection; Shell discipline stays out of
  agent-neutral contract by deliberate decision)

## v4.0.0 — agent-neutral contract + AGENTS.md as the paste-block destination

- **Major:** agent-neutral contract layer; `AGENTS.md` (not Claude-only)
  as the adopter paste-block destination
- Two-layer model: neutral contract + per-platform wiring

## v3.2.0 — SECURITY.md integration, critical-as-flag, viz security + code-quality pass

- `SECURITY.md` threat model added to the AI-referenced doc set
- `[!critical]` PLAN-line flag replaces a separate Critical priority
  (board column when present)
- Viz origin-guard / Vite v6 / Node ≥20 + UI polish cohort

## v3.1.0 — open-source foundations, three new global skills, and viz theme system

- MIT LICENSE, CONTRIBUTING, CONVENTIONS, `.editorconfig`, vault-tool README
- Global skills: `/ft-stats`, `/ft-quality`, `/ft-epic-discovery --deep`
- Viz theme system (palette picker + semantic tokens) foundations

## v3.0.0 — ft- skill namespace prefix (BREAKING)

- **Breaking:** all skills/commands gain the `ft-` namespace prefix
  (`/task` → `/ft-task`, etc.)
- Migration steps in the annotated tag message for adopters with old
  symlink names

## v2.2.0 — viz visual overhaul, theme-system foundations, audit family bundle

- Large viz visual overhaul (typography, density, motion, board switcher,
  keyboard overlay, empty/loading states)
- Theme-system foundations (semantic tokens; pickable palettes later)
- Audit-family forkable scaffolds; `/release` invokes `/audit-docs` as
  subroutine

## v2.1.0 — /flowtron info skill, gate-UX overhaul, doc consolidation

- `/flowtron` info skill (version + roster; later `/ft-flowtron`)
- Conditional Phase 2 / pre-commit gates (skip when already seen)
- Symlink-wiring block collapsed to a single canonical owner

### v2.0.1 — patch: audit doc fixes + release-skill cleanup

## v2.0.0 — gate-UX overhaul, audit infrastructure, and viz polish

- Operator-gate banners trimmed 4 → 2; recap bundles into ready-to-commit
- `/audit` skill (stack-neutral 5-pass scaffold; forked-not-symlinked)
- Cite-don't-restate / doc-tightening + viz polish cohort
- Major *number* for cumulative weight — no migration-required break

## v1.3.0 — 4-skill cohort, cite-don't-restate sweep, cross-project viz

- `/file-followup`, `/epic-discovery`, `/close-epic` (adopter-facing)
  plus flowtron-self `/release`
- Cite-don't-restate sweep across skills/templates
- Global viz can scan `~/code/` projects

## v1.2.0 — viz back-refs + doc-set drift contract

- Viz inbound wikilink back-refs
- Phase 4 doc-drift sweep over `## AI-referenced docs` (forced per-entry)
- One-time adopter action: add that section to tasknote README (see tag)

## v1.1.0 — post-closure /model + recap-only

- Post-closure copy-paste gains `/model` hand-off
- “Recap is recap-only” promoted to an enforced SPEC callout

## v1.0.0 — major release: contract stability stamp

- Stability stamp on the post–CORE-EPIC-042 modular SPEC (lazy `SPEC/`
  modules, status SoT split, micro-tasknotes, epic/blocked/starter lifecycle)
- Filing-discipline thresholds; archive skim mandatory in Discovery
- Intermediate v0.5–v0.10 tags intentionally not backfilled — this tag
  covers v0.4.0 → v1.0.0

## v0.4.0 — starter tasknotes

- `status: starter` lightweight capture shape + `/starter-task`
- Viz starter chip / filter

## v0.3.0 — frontmatter, spec-on-top body, task-line grammar

- YAML frontmatter on tasknotes
- Spec-on-top + log-below body shape and wikilinks
- `[model]` + `| shortname` on PLAN lines; long-description conventions
- First viz cut (Kanban → priority-grouped list path)

### v0.1.1 — patch: ghost CHANGELOG refs removed; first cross-repo adoption

## v0.1.0 — first stable release

- SPEC.md 4-phase lifecycle, relevance gate, post-closure protocol, semver
- Templates + `/task` skill; self-hosted roadmap
- `docs/PHILOSOPHY.md` + `docs/MIGRATION.md`; public README
