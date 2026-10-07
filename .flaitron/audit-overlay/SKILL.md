---
name: audit
description: flaitron-self audit — thin overlay over flaitron's bundled `ft-audit` (runs its passes by reference, applies the project deltas below). Forked from flaitron's audit-overlay template; see `docs/MIGRATION.md` §1.2.1.
flaitron-reconciled: v6.0.0
flaitron-tracks: ft-audit
---

# audit — thin overlay over `ft-audit`

> **Overlay skill.** This file does NOT restate the audit procedure. It points
> at flaitron's bundled scaffold and supplies only what diverges for this
> project. First action on every run: read the referenced scaffold below and
> run **its** procedure, finding format, closing sections, and hard rules —
> substituting the `## Deltas` values for the scaffold's `<placeholder>` slots.

**Referenced scaffold (read first, always):**
`claude/skills/ft-audit/SKILL.md` — this is a flaitron-self checkout (no
`.flaitron/core/` submodule), so the in-tree path is the stable reference.

**Pass files:** the scaffold loads its per-domain pass definitions from a
`passes/<domain>.md` sibling. This overlay has no `passes/` directory of its
own — resolve those reads **relative to the referenced scaffold's directory**,
i.e. `claude/skills/ft-audit/passes/<domain>.md`.

## Domains

All eight. `general` and `docs` are filled below — `docs` keyed per domain on
every delta, and also invokable as `/audit docs ai-referenced` (extra scope
token — `docs/MIGRATION.md` §1.2.2). The remaining six domains inherit the
unkeyed values and their own pass file's gate slots, so their judgment slots
still reach the dispatcher's scaffold-bootstrap check.

Domain tokens are `general` (default) · `backend` · `frontend` · `security` ·
`performance` · `docs` · `structure` · `context`. Invoked as `/audit <domain> [scope]`; a bare
invocation resolves to `general`.

## Deltas

These fill the bundled scaffold's §0-forker-checklist surface. Every fillable
slot lives in the pass files — the §"Scope & rubric hints" / §"The 5 passes" /
§"Severity guide" / §"Specialist additions" placeholders resolve to the values
here; everything else (the dispatcher's §1 resolution steps, pass order, capped
findings, finding format, closing sections, write-to-PLAN step, hard rules) is
inherited verbatim.

Where a value differs per domain, key it by domain as a nested sub-bullet
(`` `docs:` … ``) under the delta it overrides; an unkeyed value applies to
every domain this overlay covers that does not override it.

- **Scope glob** (default-`all` target): `viz/src/**` · `tools/**/*.mjs` (the only code surfaces — everything else is markdown; derived from repo layout, 2026-09-21)
  - `docs:` every tracked `*.md` except the two write-once archives — `git ls-files '*.md' | grep -v -e '^\.flaitron/tasknote/archive/' -e '^\.flaitron/PLAN-ARCHIVE\.md$'` (139 files at v6.0.0). Lifted from the `drift` job's Pair Q file selection in `.github/workflows/ci.yml`, whose two exclusions are already this pass file's write-once hard rule. An unqualified `**/*.md` default would be wrong by two orders of magnitude — 1,085 of the repo's 1,219 tracked markdown files are archived tasknotes.
- **Rubric files** (audit-against contracts): `AGENTS.md` (`CLAUDE.md` is a symlink to it), `SECURITY.md`, `docs/CONVENTIONS.md`, `viz/README.md` §"Architecture — three tiers" (no-Node-under-`src/ui/` rule + dependency direction), `docs/CONTEXT-BUDGET.md`
  - `docs:` `.flaitron/tasknote/README.md` §"AI-referenced docs" — the declared doc-set contract and the `ai-referenced` scope token's target; note its own distinction, that membership means *swept for drift*, not *loaded at cold start*. Then `SPEC.md` (the workflow contract any claim about phases, gates, or filing is graded against), `README.md` (public-facing first impression), `docs/CONVENTIONS.md` (what this project adheres to and declines, and the archived-tasknote integrity floor), and `docs/AGENT-NEUTRALITY.md` (the ledger of intentional Claude-specific surfaces — read it before flagging one).
- **Verification gates** (run before passes): `npm --prefix viz run lint` · `npm --prefix viz run typecheck` · `npm --prefix viz test` · `node --test tools/update-adopters.test.mjs` (sources: `.github/workflows/ci.yml:31-35`, `viz/package.json` scripts, `justfile`)
  - `docs:` **none — skip the gate step.** No markdown linter and no link checker is configured: there is no root `package.json`, `viz/package.json` declares no markdown script (`remark-gfm` / `react-markdown` are visualizer runtime deps, not linters), the `justfile` has no docs recipe, and `.github/workflows/ci.yml` configures neither. This pass file says to skip entirely when no doc tooling exists, and inventing a command is barred by `scaffold-bootstrap.md` §3. The nearest coverage is CI's `drift` job — inline workflow shell, not a locally invokable command, so not a gate here; hard rule (c) below covers why its findings are also not this audit's to re-report.
- **Sacred invariants → Critical** (severity guide): `<not derivable — forker: name what this project must never break, e.g. a Node import under viz/src/ui/, update-adopters --apply mutating an adopter outside a dry run>`
- **Per-pass examples** (concrete stack anti-patterns to add under each pass): `<not derivable — forker: e.g. React hooks rules, Vite/Vitest idioms, zero-dependency constraint on tools/*.mjs>`
  - `docs:` **pass 1 (claims vs. code)** — an in-tree `SKILL.md` file tree out of sync with disk; `AGENTS.md` §"Repo Layout" naming a directory that moved; `AGENTS.md` §"Validation" listing a command that `viz/package.json`, the `justfile`, and `.github/workflows/ci.yml` no longer agree on; a skill roster in `claude/AGENTS-snippet.md` that `claude/skills/` on disk has outgrown. **pass 2 (cross-doc consistency)** — a `KEEP IN SYNC` comment block whose mirror target moved; the validation roster restated in three formats; `docs/VISION.md` §"What we won't accept" against its mirrors, one being `SPEC/scope-boundaries.md` §"What flaitron does NOT provide"; the four `*/AGENTS-snippet.md` siblings drifting apart; a flag or `[model]` token documented one way in a skill and another in its command stub. **pass 3 (cross-references)** — a `[[TASK-ID]]` wikilink with no matching tasknote; a relative link whose depth breaks across the `SPEC/` ↔ `docs/` ↔ `claude/skills/` nesting; a section citation whose heading was renamed. **pass 4 (currency)** — a `flaitron-reconciled:` pin behind the current tag; the last-verified stamp in `claude/CAPABILITIES.md`; the per-agent currency rows in `docs/AGENT-COMPAT.md`; a dated calibration line in `docs/PLATFORMS.md`; a version string in `README.md` or `docs/MIGRATION.md` behind the latest release.
- **Extra hard rules** (appended project-specific rules): `<not derivable — forker: "—" if none>`
  - `docs:` (a) **Write-once surfaces are out of scope** — `.flaitron/tasknote/archive/**` and `.flaitron/PLAN-ARCHIVE.md`, matching this pass file's archive rule and `docs/CONVENTIONS.md` §"Archived-tasknote integrity floor". A closed `## Completed` or archive row that *quotes the drift it records* is the historical record, not a finding. (b) **Check the neutrality ledger before flagging a Claude-specific reference** — `docs/AGENT-NEUTRALITY.md` lists the intentional ones; an unledgered one is the finding. (c) **Don't re-report what CI already enforces.** The `drift` job's named pairs and the context-budget check run on every push, so a drift they already catch is not an audit finding. A drift that slips past them is — and so is a pair whose binding has gone stale against the source it lifts.
