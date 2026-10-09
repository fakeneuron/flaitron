---
name: audit
description: flaitron-self audit — thin overlay over flaitron's bundled `ft-audit` (runs its passes by reference, applies the project deltas below). Forked from flaitron's audit-overlay template; see `docs/MIGRATION.md` §1.2.1 (recipe) and `CONTRIBUTING.md` (this file's flaitron-self home).
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

Seven: `general` · `frontend` · `security` · `performance` · `structure` ·
`docs` · `context`. Every delta below carries an unkeyed value, and `frontend` /
`security` / `performance` / `structure` / `docs` override it where their pass
file asks something the unkeyed value cannot answer. `context` needs no delta:
[[CORE-661]] cleared every placeholder from `claude/skills/ft-audit/passes/context.md`. `docs` is
also invokable as `/audit docs ai-referenced` (extra scope token —
`claude/skills/ft-audit/passes/docs.md` §"Scope & rubric hints (→ dispatcher §1)").

**Not covered: `backend`.** Its passes (input contracts, persistence, async
lifecycle) target an API/DB service. Flaitron's only server is the
localhost-only viz dev API, which `security` grades for exposure and `general`
for idioms, and it has no persistence layer. A `/audit backend` run therefore
still reaches the scaffold bootstrap, which is accurate, because nothing here
answers it.

Domain tokens are `general` (default) · `backend` · `frontend` · `security` ·
`performance` · `docs` · `structure` · `context` (`backend` is not covered — above). Invoked as `/audit <domain> [scope]`; a bare
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

- **Scope glob** (default-`all` target): `viz/src/**` · `tools/**/*.mjs` · `tools/drift-checks.sh` (the only code surfaces — everything else is markdown; derived from repo layout, 2026-09-21; `drift-checks.sh` added 2026-10-08)
  - `docs:` every tracked `*.md` except the two write-once archives — `git ls-files '*.md' | grep -v -e '^\.flaitron/tasknote/archive/' -e '^\.flaitron/PLAN-ARCHIVE\.md$'` (139 files at v6.0.0). Lifted from the `drift` job's Pair Q file selection (`pair_q` in `tools/drift-checks.sh`), whose two exclusions are already this pass file's write-once hard rule. An unqualified `**/*.md` default would be wrong by two orders of magnitude — 1,085 of the repo's 1,219 tracked markdown files are archived tasknotes.
  - `frontend:` `viz/src/ui/**` · `viz/src/main.tsx` · `viz/src/styles.css` · `viz/src/{parser,tasknote,fence,sseChange,storage,viewMode,visibilityPrefs,projectStorage}.ts` — the Browser UI tier plus the Shared-pure modules it bundles (`viz/README.md` §"Architecture — three tiers"). The Node-only dev API never ships to the browser and is `security`'s and `general`'s.
  - `security:` `viz/src/**` · `viz/vite.config.ts` · `tools/**/*.mjs` — adds the Vite config, which holds the dev server's host allowlist and CSP.
  - `performance:` `viz/src/**` · `tools/update-adopters.mjs` as the `all` fallback, but the pass file prefers a narrow scope — name one path, e.g. `viz/src/ui/**` (bundle), `viz/src/archiveCache.ts` + `viz/src/flaitronWatch.ts` (workspace scan and watch), or `tools/update-adopters.mjs` (fleet sweep).
  - `structure:` every tracked file except the two write-once archives — `git ls-files | grep -v -e '^\.flaitron/tasknote/archive/' -e '^\.flaitron/PLAN-ARCHIVE\.md$'` (tracked-only keeps `node_modules/` and `viz/dist/` out). Markdown structure (`SPEC/` modules, `claude/` ↔ `codex/` ↔ `cursor/` ↔ `grok/` wiring siblings) is most of what there is to drift here.
- **Rubric files** (audit-against contracts): `AGENTS.md` (`CLAUDE.md` is a symlink to it), `SECURITY.md`, `docs/CONVENTIONS.md`, `viz/README.md` §"Architecture — three tiers" (no-Node-under-`src/ui/` rule + dependency direction), `docs/CONTEXT-BUDGET.md`
  - `docs:` `.flaitron/tasknote/README.md` §"AI-referenced docs" — the declared doc-set contract and the `ai-referenced` scope token's target; note its own distinction, that membership means *swept for drift*, not *loaded at cold start*. Then `SPEC.md` (the workflow contract any claim about phases, gates, or filing is graded against), `README.md` (public-facing first impression), `docs/CONVENTIONS.md` (what this project adheres to and declines, and the archived-tasknote integrity floor), and `docs/AGENT-NEUTRALITY.md` (the ledger of intentional Claude-specific surfaces — read it before flagging one).
  - `frontend:` `viz/README.md` §"Architecture — three tiers" (tier rule, enforced by `viz/eslint.config.js`), `brand/BRAND.md` (palette and type). No design-token, accessibility, or perf-budget doc is declared — leave those slots empty rather than grading against an invented one.
  - `security:` `SECURITY.md` — §"Threat model" (prompt injection through user-authored markdown) and §"Visualizer (`viz/`) dev-server scope" (the localhost-only, single-user boundary); `.gitleaks.toml` (secret-scan config); `.github/dependabot.yml` (update policy: `/viz` npm and Actions, open-PR limit 0).
  - `performance:` none declared — no perf budget, SLO, or benchmark baseline exists. Per the pass file, surface that first; the build's chunk-size table (gate below) is the only recorded number.
  - `structure:` `AGENTS.md` §"Repo Layout" (where each concern lives), `viz/README.md` §"Architecture — three tiers" (layer order), `SPEC/layout.md` (skill namespace and module layout).
- **Verification gates** (run before passes): `npm --prefix viz run lint` · `npm --prefix viz run typecheck` · `npm --prefix viz test` · `node --test tools/update-adopters.test.mjs` · `node --test tools/drift-checks.test.mjs` (sources: `.github/workflows/ci.yml:33-41`, `viz/package.json` scripts, `justfile`)
  - `docs:` `bash tools/drift-checks.sh pair_q final_newline context_budget` — the CI `drift` job's doc checks run locally (Pair Q section-citation resolver, final-newline, context budget). No markdown linter and no link checker is configured: there is no root `package.json`, `viz/package.json` declares no markdown script (`remark-gfm` / `react-markdown` are visualizer runtime deps, not linters), the `justfile` has no docs recipe, and `.github/workflows/ci.yml` configures neither — inventing one is barred by `scaffold-bootstrap.md` §3. A failing check here is reported per unkeyed hard rule (b)'s exception; hard rule (c) below covers why a passing one's coverage is not this audit's to re-report.
  - `frontend:` `npm --prefix viz run build` · `npm --prefix viz run lint` · `npm --prefix viz run typecheck` · `npm --prefix viz test`. No bundle analyzer or a11y checker is configured, so those two slots are skipped, not invented.
  - `security:` `gitleaks dir . --config .gitleaks.toml --no-banner --redact` (the CI `validate` job's invocation; needs a local `gitleaks`) · `npm --prefix viz audit` — devDependencies included on purpose: `vite` and `chokidar` *are* the dev server, the only runtime that ships here. No SAST is configured.
  - `performance:` `npm --prefix viz run build` — its chunk table (raw and gzip) is the only measurement. No profiler, benchmark, or load test exists.
  - `structure:` none — no duplication, complexity, or dead-code detector is configured. The pass file says to skip the gate step; passes run on read-the-code evidence.
- **Sacred invariants → Critical** (severity guide): (1) a `node:*` or Node-only-tier import reaching `viz/src/ui/**` — including through an `eslint-disable` that silences the `no-restricted-imports` rule; (2) any loosening of the viz dev server's exposure boundary — the loopback bind, `server.allowedHosts`, `originGuard`, the dev CSP, or the realpath containment on workspace and tasknote reads (`SECURITY.md` §"Visualizer (`viz/`) dev-server scope"); (3) `tools/update-adopters.mjs` writing to an adopter without `--apply`, pushing anything, or committing past one of its per-adopter safety gates (the file's own header); (4) a committed secret, i.e. a `.gitleaks.toml` hit.
  - `frontend:` (1)–(4) above, plus nothing user-facing: the viz is a single-user local tool with no declared accessibility or performance commitment, so beyond (1)–(4) grade by the pass's own Critical line.
  - `performance:` (1)–(4) above; none measurable on top — no budget or SLO is declared, so no perf finding is Critical on budget grounds alone.
  - `structure:` (1)–(4) above, plus duplicated logic whose copies can diverge on (2) or (3) — e.g. a second origin check or path-containment helper outside `viz/src/originGuard.ts` / `viz/src/fsSafe.ts`.
- **Per-pass examples** (concrete stack anti-patterns to add under each pass): **pass 1 (security)** — a dev-API handler that skips `originGuard`; a filesystem read that bypasses the realpath containment; tasknote markdown rendered with raw HTML enabled (`react-markdown` without HTML stays safe; adding `rehype-raw` or `dangerouslySetInnerHTML` does not). **pass 2 (idioms)** — React hooks rules (`eslint-plugin-react-hooks`), strict TypeScript with no `any` escape, Vitest + Testing Library over implementation-detail assertions, `node:test` and zero npm dependencies for `tools/*.mjs`.
  - `frontend:` **pass 1** — main chunk 75.6 kB gzip and lazy `TaskDetail` 47.0 kB gzip at v6.0.0 (`vite build`); a new eager import of a lazy-split module is the regression to look for. **pass 2** — no WCAG level is declared; report gaps against the pass's generic checks without citing a level.
  - `security:` **pass 1** — no runtime secrets exist; the only secret surface is what `.gitleaks.toml` scans for. **pass 2** — path traversal through a symlinked project or tasknote in the scanned workspace; an `/api/*` response missing `X-Content-Type-Options: nosniff`. **pass 3** — no auth model by design: single user, loopback only; `allowedHosts` + `originGuard` is the whole boundary, so a finding here is a gap in those two, not a missing login. **pass 5** — report the `npm --prefix viz audit` advisory count and the top advisory.
  - `performance:` **pass 1** — no profiler is configured; cite the code path read, not a measurement. **pass 2** — the `vite build` chunk table above. **pass 3** — no DB or ORM; data access is filesystem reads through `viz/src/archiveCache.ts` and chokidar watchers (`viz/src/flaitronWatch.ts`, `viz/src/watchSet.ts`) — look for unbounded rescans and watcher fan-out. **pass 4** — no memory budget; the declared resource bounds are the SSE client cap (`MAX_SSE_CLIENTS = 10`, `viz/src/devApi.ts`) and the archive-cache project cap (`MAX_CACHED_PROJECTS = 5`, `viz/src/archiveCache.ts`).
  - `structure:` **pass 1** — the same rule restated across `claude/`, `codex/`, `cursor/`, and `grok/` wiring, or across the four `*/AGENTS-snippet.md` siblings. **pass 2** — layer order `viz/src/ui/` → shared pure → nothing above it, and Node-only → shared pure only (`viz/README.md` §"Dependency direction"). **pass 3** — known hotspots: `KEEP IN SYNC` comment pairs, the validation roster in `AGENTS.md` §"Validation" vs CI vs the `justfile`. **pass 4** — non-test source runs median 41 lines, p90 227 (66 files under `viz/src` + `tools/` at v6.0.0); `tools/update-adopters.mjs` at 1,188 is the outlier. **pass 5** — destinations are the `justfile` recipes and `.github/workflows/ci.yml` jobs (`validate`, `drift`).
  - `docs:` **pass 1 (claims vs. code)** — an in-tree `SKILL.md` file tree out of sync with disk; `AGENTS.md` §"Repo Layout" naming a directory that moved; `AGENTS.md` §"Validation" listing a command that `viz/package.json`, the `justfile`, and `.github/workflows/ci.yml` no longer agree on; a skill roster in `claude/AGENTS-snippet.md` that `claude/skills/` on disk has outgrown. **pass 2 (cross-doc consistency)** — a `KEEP IN SYNC` comment block whose mirror target moved; the validation roster restated in three formats; `docs/VISION.md` §"What we won't accept" against its mirrors, one being `SPEC/scope-boundaries.md` §"What flaitron does NOT provide"; the four `*/AGENTS-snippet.md` siblings drifting apart; a flag or `[model]` token documented one way in a skill's `description:` and another in its `argument-hint:`. **pass 3 (cross-references)** — a `[[TASK-ID]]` wikilink with no matching tasknote; a relative link whose depth breaks across the `SPEC/` ↔ `docs/` ↔ `claude/skills/` nesting; a section citation whose heading was renamed. **pass 4 (currency)** — a `flaitron-reconciled:` pin behind the current tag; the last-verified stamp in `claude/CAPABILITIES.md`; the per-agent currency rows in `docs/AGENT-COMPAT.md`; a dated calibration line in `docs/PLATFORMS.md`; a version string in `README.md` or `docs/MIGRATION.md` behind the latest release.
- **Extra hard rules** (appended project-specific rules): (a) **Write-once surfaces are out of scope** — `.flaitron/tasknote/archive/**` and `.flaitron/PLAN-ARCHIVE.md` (`docs/CONVENTIONS.md` §"Archived-tasknote integrity floor"). (b) **Don't re-report what CI already enforces** — the `validate` job's eslint (including the `viz/src/ui/` import rule), type-check, tests, and gitleaks, and the `drift` job's pairs. A gap in that enforcement is a finding; a violation it would catch is not. **Exception:** a gate this audit runs that fails on the audited tree is always reported at its severity — a failing gate means CI is red or has not run, so nothing is enforcing it yet.
  - `security:` (a) and (b) above, plus (c) **Grade against the declared threat model.** `SECURITY.md` scopes flaitron as a single-user local tool, not a hardened product; a finding needs a path that crosses the stated boundary, not a generic OWASP item.
  - `docs:` (a) **Write-once surfaces are out of scope** — `.flaitron/tasknote/archive/**` and `.flaitron/PLAN-ARCHIVE.md`, matching this pass file's archive rule and `docs/CONVENTIONS.md` §"Archived-tasknote integrity floor". A closed `## Completed` or archive row that *quotes the drift it records* is the historical record, not a finding. (b) **Check the neutrality ledger before flagging a Claude-specific reference** — `docs/AGENT-NEUTRALITY.md` lists the intentional ones; an unledgered one is the finding. (c) **Don't re-report what CI already enforces.** The `drift` job's named pairs and the context-budget check run on every push, so a drift they already catch is not an audit finding. A drift that slips past them is — and so is a pair whose binding has gone stale against the source it lifts.
