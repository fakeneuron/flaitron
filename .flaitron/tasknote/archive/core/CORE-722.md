---
title: audit-deltas-remaining
status: completed
tags: [audit, overlay]
created: 2026-10-07
due:
related-tasks: [CORE-721, CORE-720, CORE-661]
touches:
  - .flaitron/audit-overlay/SKILL.md
---

# CORE-722 | audit-deltas-remaining

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-721]] · [[CORE-720]] · [[CORE-661]]

## 🎯 Goal

Make flaitron-self's `/audit` overlay stop tripping the scaffold bootstrap on every domain it claims, by filling the judgment deltas with real flaitron values and narrowing §Domains to drop `backend`, which flaitron has no surface for.

## ✅ Acceptance

- [x] No `<not derivable …>` placeholder survives in the overlay's `## Deltas` — `! grep -q 'not derivable' .flaitron/audit-overlay/SKILL.md`
- [x] Every `_(forker: …)_` slot in `passes/{general,frontend,security,performance,structure}.md` maps to a non-placeholder unkeyed or domain-keyed delta — `judgment` (slot-by-slot walk recorded in Testing Notes; the dispatcher's "less what Deltas supplies" test is agent-read, not scriptable)
- [x] §Domains names the seven covered domains, excludes `backend` with its reason, and no longer claims `general` filled while its slots were empty or `context` reaches the bootstrap — `awk '/^## Domains/,/^## Deltas/' .flaitron/audit-overlay/SKILL.md | grep -q 'backend'` plus `judgment` read
- [x] Frontmatter `description:` cites `docs/MIGRATION.md` §1.2.2 (CORE-721 review note 6) — `grep -q '§1.2.2' .flaitron/audit-overlay/SKILL.md`
- [x] Every repo path the new deltas cite exists — scripted `test -e` over the backticked paths (Testing Notes)
- [x] Every newly named gate command runs read-only and exits as recorded — `gitleaks dir . --config .gitleaks.toml --no-banner --redact`, `npm --prefix viz audit`, `npm --prefix viz run build`
- [x] CI `drift` job Pair Q passes locally over the edited file — extracted `run:` body under `bash -e`

## 🧩 Subtasks

- [x] Rewrite §Domains — seven covered, `backend` excluded with reason, honest about which are filled where
- [x] Fill unkeyed **Sacred invariants**, **Per-pass examples**, **Extra hard rules**
- [x] Add domain-keyed overrides: `frontend:` / `security:` / `performance:` / `structure:` for Scope glob, Rubric files, Verification gates, and the pass-specific forker slots each pass file asks for
- [x] Fix `description:` §1.2.1 → §1.2.2
- [x] Run Acceptance verify commands

## 🔗 Related

- [[CORE-721]] — predecessor: gave the overlay its tracked home; its review notes 4 and 6 were deferred here
- [[CORE-720]] — predecessor: filled the `docs`-keyed deltas; this task follows its shape
- [[CORE-661]] — related-decision: cleared `passes/context.md`'s placeholders, so `context` is clean with no delta needed

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN line's slot counts match the pass files exactly
  (backend/security/performance/structure 10, frontend 8, general 7 forker
  notes). It offered fill or narrow; the operator picked the hybrid, which sits
  inside that framing, so the plan shape is unchanged.

- [x] Read relevant source files — overlay, `templates/audit-overlay-template.md` §Domains, `claude/skills/ft-audit/SKILL.md` §1 step 3, `scaffold-bootstrap.md` §1–2, all five kept pass files' §"Scope & rubric hints" and forker notes, `SECURITY.md`, `viz/README.md` §"Architecture — three tiers", `viz/vite.config.ts`, `viz/src/originGuard.ts`, `.github/workflows/ci.yml`, `.github/dependabot.yml`, `viz/package.json`, `docs/MIGRATION.md` §1.2.1

- [x] **Best Practices Review** — `N/A`: this is a markdown config edit with no code surface. The one boundary is the overlay contract itself: it keeps the existing delta shape (unkeyed value plus domain-keyed sub-bullets, per [[CORE-720]]) rather than inventing per-domain sections

- [x] **Archive skim** — `archive/core/` (931 notes; area confirmed against the README table). Grepped `audit-overlay`; the load-bearing hits were [[CORE-720]] and [[CORE-721]], read directly. CORE-721's External review left two notes for this task: #4 (§Domains claims `general` filled while three unkeyed deltas are still `<not derivable>`, and claims all six reach the bootstrap though `context` is clean) and #6 (`description:` cites §1.2.1, while §1.2.2 now owns this file's home). Both are in scope here

- [x] **Drift check** — PLAN line paths and counts hold. `docs/MIGRATION.md:163` "One overlay covers all eight domains" describes the overlay *capability* for adopters, not flaitron-self's claim, so it is no drift. No SPEC contract is contradicted: the template's §Domains slot explicitly sanctions a subset ("backend, security, docs only")

- [x] Asked clarifying questions — fill vs narrow went to the operator via AskUserQuestion. Answer: **Hybrid** — fill general/frontend/security/performance/structure, drop `backend`

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:**

**Why the six trip.** The unkeyed Scope / Rubric / Gates deltas already answer
every domain's `§"Scope & rubric hints"` slots. What still trips are the three
unkeyed *judgment* deltas — Sacred invariants, Per-pass examples, Extra hard
rules — which are still `<not derivable — forker: …>`, plus pass-specific
forker notes (frontend perf budget / WCAG level; security secret source, auth
model, scanner count; performance profiler, bundle, DB, memory; structure
layer order, hotspots, size band, task runner) that need a domain-keyed answer.

**Why `backend` is dropped.** Its passes (Input & contracts, Error & lifecycle,
Persistence, Async correctness) target an API/DB service. Flaitron's only
server is the localhost-only viz dev API, which `security` (exposure) and
`general` (idioms) already grade; there is no persistence layer at all.
Narrowing leaves `/audit backend` tripping the bootstrap, which is honest —
the overlay no longer claims it.

**Derived facts (sources):**
- Security boundary — `SECURITY.md` §"Visualizer (`viz/`) dev-server scope":
  localhost:5120 bind, `allowedHosts`, `originGuard` (`viz/src/originGuard.ts`),
  CSP (`viz/vite.config.ts`), symlink containment (`viz/src/workspace.ts`,
  `viz/src/tasknoteRead.ts`). No runtime secrets; `.gitleaks.toml` + CI gitleaks
  step is the secret surface; Dependabot for `/viz` npm + actions, PRs capped at 0.
- Gates — `gitleaks` is installed locally (`/opt/homebrew/bin/gitleaks`); CI runs
  `gitleaks dir . --config .gitleaks.toml --no-banner --redact`. No bundle
  analyzer, a11y checker, profiler, benchmark, duplication / complexity /
  dead-code detector is configured (`viz/package.json` devDeps, `justfile`, CI).
- Size band — 66 non-test source files under `viz/src` + `tools/`: median 41
  lines, p90 227, max 1,188 (`tools/update-adopters.mjs`).
- Tier rule — `viz/README.md` three tiers, enforced by eslint
  `no-restricted-imports` on `src/ui/**`.
- Updater — `tools/update-adopters.mjs` header: dry-run by default, `--apply`
  commits locally and never pushes; per-adopter safety gates; zero-dependency.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown config, no executable surface; the dispatcher's slot check is agent-read

**Implementation Notes:**

- **Shape extended, not invented.** Domain-keyed sub-bullets under each existing delta, the form [[CORE-720]] established for `docs:`. No per-domain section was added.
- **Override semantics were load-bearing.** A keyed value *replaces* the unkeyed one for that domain. So `security:`'s Extra hard rule restates "(a) and (b) above, plus (c)" rather than listing (c) alone, which would have silently dropped the write-once and CI-dedupe rules for security runs. Per-pass examples are keyed per domain because the pass numbering differs across pass files.
- **"None declared" is an answer, not a placeholder.** Frontend a11y/perf-budget rubric slots, the performance budget/SLO/benchmark, and the structure detectors are filled with an explicit absence, as `docs:`'s gate slot already was. That follows `scaffold-bootstrap.md` §3's bar on inventing commands.
- **Two CORE-721 review notes closed here:** #4 (§Domains rewritten: `general`'s judgment slots are now actually filled, and `context` is correctly described as clean) and #6 (`description:` now cites §1.2.2 alongside §1.2.1).
- **Paths fully qualified.** Two new references that resolved only scaffold-relative or `viz/`-relative (`passes/context.md`, `src/ui/`) were qualified repo-root-relative. Pre-existing relative refs were left untouched.
- No refactor; nothing deferred.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no code changed; the Acceptance commands below are the targeted checks

- [x] Ran lint/type-check on changed code — `N/A` for the same reason; CI Pair Q (markdown citation lint) ran locally instead

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A`: no UI change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt:

- `! grep -q 'not derivable' .flaitron/audit-overlay/SKILL.md` → 0
- `awk '/^## Domains/,/^## Deltas/' … | grep -q 'backend'` → 0
- `grep -q '§1.2.2' .flaitron/audit-overlay/SKILL.md` → 0
- Path existence (`test -e` over backticked paths) → every path new in this diff resolves. The six misses are pre-existing scaffold-relative refs (`passes/`, `SKILL.md`, `scaffold-bootstrap.md`, `.flaitron/core/`, one `src/ui/`), unchanged from HEAD.
- `gitleaks dir . --config .gitleaks.toml --no-banner --redact` → 0
- `npm --prefix viz audit` → 0 (`found 0 vulnerabilities`; `--omit=dev` dropped after review finding 1)
- `npm --prefix viz run build` → 0 (main 75.64 kB gz, TaskDetail 46.99 kB gz — the figures quoted in the `frontend:` pass-1 example)
- CI `drift` Pair Q `run:` body extracted to scratchpad, `bash -e` → 0
- Re-run after the review fixes (all from the top): A1/A3/A4 greps → 0; path check → only the five pre-existing scaffold-relative misses, and the eight Shared-pure `viz/src/*.ts` files named in the `frontend:` glob all exist; `gitleaks` → 0; `npm --prefix viz audit` → 0; `npm --prefix viz run build` / `typecheck` / `lint` / `test` → 0 (the four `frontend:` gates); `structure:` selector lists 266 tracked files; Pair Q → 0
- (frontend) `N/A` — no UI change

Slot-by-slot walk (judgment criterion). Every `_(forker: …)_` note and every `<…>` gate span in each kept pass file has a non-placeholder answer:

| Domain | Slots | Answered by |
|---|---|---|
| `general` | 7 | unkeyed Scope / Rubric / Gates / Sacred / Per-pass (pass 1 security, pass 2 idioms) / Extra hard rules |
| `frontend` | 8 | keyed Scope, Rubric (incl. explicit "none declared" for the three doc slots), Gates, Sacred, Per-pass (pass 1 budget, pass 2 WCAG); unkeyed Extra hard rules |
| `security` | 10 | keyed Scope, Rubric ×3, Gates, Per-pass (pass 1 secret source, pass 2 stack, pass 3 auth, pass 5 scanner count), Extra hard rules; unkeyed Sacred |
| `performance` | 10 | keyed Scope, Rubric ×3 ("none declared"), Gates, Per-pass (pass 1 profiler, 2 bundle, 3 DB/ORM, 4 memory), Sacred (measurable invariants); unkeyed Extra hard rules |
| `structure` | 10 | keyed Scope, Rubric ×2, Gates ("none"), Per-pass (pass 1 stack, 2 layer order, 3 hotspots, 4 size band, 5 task runner), Sacred; unkeyed Extra hard rules |

External review — `/code-review medium` scoped to `.flaitron/audit-overlay/SKILL.md` (this task's only deliverable; working tree, no prior commits). Ten findings, all fixed; Phase 3 re-ran from the top:

| # | Finding | Rung | Disposition |
|---|---|---|---|
| 1 | Security gate `npm audit --omit=dev` skips `vite` / `chokidar`, the dev server itself | blocker | **Fixed** — flag dropped, with the reason inline |
| 2 | `frontend:` scope omits the Shared-pure modules bundled into the browser | note | **Fixed** — the eight modules named explicitly |
| 3 | Perf pass 4 called `MAX_SSE_CLIENTS` the only bound; `MAX_CACHED_PROJECTS = 5` exists | note | **Fixed** — both caps cited |
| 4 | `structure:` Sacred override dropped invariant (1), the very layering break pass 2 targets | blocker | **Fixed** — "(1)–(4) above, plus …" |
| 5 | Keyed Sacred overrides inconsistent replace-vs-extend; `performance:` had no Critical anchor | blocker | **Fixed** — every keyed override now opens with "(1)–(4) above" |
| 6 | Invariant (4) Critical vs hard rule (b) "don't re-report gitleaks" contradict | blocker | **Fixed** — (b) gains an exception: a gate failing on the audited tree is always reported |
| 7 | `frontend:` gates dropped typecheck and test | blocker | **Fixed** — all four viz gates listed |
| 8 | Domain-token roster still lists `backend` unannotated | note | **Fixed** — "(`backend` is not covered — above)" |
| 9 | `performance:` scope was prose, not a glob — the slot stayed effectively unfilled | blocker | **Fixed** — concrete `all` fallback, narrow scope still preferred |
| 10 | `structure:` scope was prose; a filesystem walk would hit `node_modules/` and `viz/dist/` | note | **Fixed** — `git ls-files` selector mirroring `docs:` |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update — no change across all 18 entries. None describes flaitron-self's overlay *contents*; `docs/MIGRATION.md` §1.2.1–1.2.2 describe the overlay mechanism generically, and its "One overlay covers all eight domains" is an adopter-capability statement, not this overlay's claim

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line — `N/A`. The one lesson (a domain-keyed delta *replaces* the unkeyed value, so it must restate what it keeps) is already the overlay's own stated rule; it bit here through authoring, not through a missing contract

**Final Summary:**

`.flaitron/audit-overlay/SKILL.md` (+~45 / −9 lines): seven domains now clear the scaffold bootstrap (`context` was already clean; `docs` was filled by [[CORE-720]]). §Domains narrowed to those seven, with `backend` excluded and its reason given. The three unkeyed judgment deltas are filled with flaitron's real invariants: the `viz/src/ui/` tier rule, the dev-server exposure boundary, `update-adopters` write discipline, and committed secrets. Domain-keyed overrides answer every pass-specific forker slot for frontend/security/performance/structure, citing explicit absences where no budget or tool exists rather than inventing one. Closed [[CORE-721]]'s review notes 4 and 6. Verification: three Acceptance greps, the path check, gitleaks, `npm audit`, the four viz gates, and local CI Pair Q all exit 0, re-run after the ten review fixes. `touches:` reconciliation: `git diff --name-only` = the declared overlay plus PLAN.md and this tasknote (workflow files); no undeclared deliverable. Maintainability: the next `/audit <domain>` on any covered domain grades against flaitron contracts instead of stopping at the bootstrap.

**Archived:** 2026-10-07
