---
title: audit-scaffold-bootstrap
status: completed
tags: []
created: 2026-08-23
due:
related-tasks: [CORE-EPIC-463, CORE-463.1]
parallel-safe-with:
  - CORE-463.2
  - CORE-463.3
touches:
  - claude/skills/ft-audit/SKILL.md
  - claude/skills/ft-update/SKILL.md
  - templates/audit-overlay-template.md
  - docs/MIGRATION.md
---

# CORE-463.4 | audit-scaffold-bootstrap

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-463]]

## 🎯 Goal

Stop `/ft-audit` silently degrading to generic output in the 18-of-24 repos running the unforked scaffold: detect unfilled placeholder rubrics and gates at dispatch time, auto-derive candidates from repo evidence, offer a prefilled thin-overlay fork inline, and teach `/ft-update` to refresh existing full-copy forks with newly-shipped pass files without clobbering filled rubrics.

## ✅ Acceptance

- [x] `claude/skills/ft-audit/SKILL.md` §1 gains a placeholder-detection step that runs after the pass file loads and before rubric load / gate run; zero placeholders → silent no-op (a filled fork never sees it)
- [x] Detection is a **hard stop** with an `AskUserQuestion` offering three branches: fork+fill now · run once with derived values in memory · proceed degraded (report carries an explicit unfilled-scaffold banner)
- [x] Auto-derivation table specifies the evidence sources (`package.json` scripts · `pyproject.toml` + `uv.lock` · `justfile`/`Makefile` · `.github/workflows/*` · `Cargo.toml`/`go.mod`/`Gemfile`) and what each derives (gates / scope glob / rubric files), with derived gate commands restricted to lint · type-check · test · build intents
- [x] Fork+fill branch writes `.claude/skills/audit/SKILL.md` from `templates/audit-overlay-template.md` with the `## Deltas` block prefilled and `flowtron-reconciled:` set to the pinned tag
- [x] Non-adopter repos (no resolvable `.flowtron/core/`) detect that state, skip the overlay offer, and fall back to run-once-with-derived-values
- [x] `claude/skills/ft-audit/SKILL.md` §6 carries an explicit hard-rule carve-out for the fork-install write (the only non-PLAN write the skill may make, gated behind the bootstrap's confirm)
- [x] `claude/skills/ft-audit/SKILL.md` §7/§8 gain the matching rationalization row + red flag for skipping detection
- [x] `claude/skills/ft-update/SKILL.md` Step 4.5 extends to full-copy `ft-audit` forks: compares the fork's `passes/` against the bundled set and classifies each missing file as **newly shipped** (offer to copy) vs **deliberately deleted at reconcile time** (report, never re-add), using `git ls-tree <reconciled>` as the discriminator
- [x] Files present in both are never touched — filled rubrics cannot be clobbered; overlay forks are reported as auto-inheriting with no action
- [x] `docs/MIGRATION.md` §1.2.1 documents the bootstrap and the pass-file refresh behavior
- [x] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Draft the placeholder-detection step (§1 step 1.5) — token set, scan target, zero-hit no-op, adopter/non-adopter branch
- [x] Draft the auto-derivation evidence table + the lint/type-check/test/build intent whitelist
- [x] Draft the three-branch `AskUserQuestion` (fork+fill · run-once · proceed-degraded) and the degraded-report banner
- [x] Write the §1 bootstrap into `claude/skills/ft-audit/SKILL.md`; add the §0 pointer line
- [x] Add the §6 fork-install carve-out + §7 rationalization row + §8 red flag
- [x] Extend `claude/skills/ft-update/SKILL.md` Step 4.5 with the pass-file refresh (newly-shipped vs deliberately-deleted classification via `git ls-tree <reconciled>`)
- [x] Update `docs/MIGRATION.md` §1.2.1 with both behaviors
- [x] Phase 3: markdown mental-pass (headings, cross-refs, command syntax, placeholder-token accuracy against the real pass files)
- [x] Phase 4: doc-drift sweep + flip PLAN line to stub form (kept nested under the active parent) + archive tasknote

## 🔗 Related

- [[CORE-EPIC-463]] — parent epic
- [[CORE-463.1]] — Discovery; sourced the root-cause finding this child exists to fix (`blocked-by:` satisfied — closed 2026-08-23)
- [[CORE-463.2]] — `structure` domain; parallel-safe (disjoint surface: new `passes/structure.md`)
- [[CORE-463.3]] — `/ft-refactor`; parallel-safe (disjoint surface: new skill dir)
- [[CORE-463.5]] — wiring-and-docs; sequential after this child
- [[CORE-288]] — built `flowtron-reconciled:`/`flowtron-tracks:` + `/ft-update` Step 4.5 (`depends-on:` — this task extends it)
- [[CORE-287]] — sanctioned the thin-overlay fork path + `templates/audit-overlay-template.md` (`related-decision:`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The motivating defect was verified live this session, not recalled from the `.1` note. `~/.claude/skills/ft-audit` is a symlink to `/Users/fakeneuron/Code/flowtron/claude/skills/ft-audit` — the unfilled bundled scaffold — so every repo without a local fork loads pass files whose rubric slots read `<rubric file 1>` / `<forker: what it defines>` and whose gates read `<lint command for your stack>`. Flowtron's own `.claude/skills/ft-audit` is the same symlink. The scope filed at `.1` is unchanged and no sibling child has landed since.

- [x] Read relevant source files — `claude/skills/ft-audit/SKILL.md` (all 8 sections), `claude/skills/ft-audit/passes/general.md` (representative placeholder shapes), `claude/skills/ft-update/SKILL.md` (Steps 0–5, esp. 4.5/4.6), `templates/audit-overlay-template.md`, `docs/MIGRATION.md` §1.2.1 incl. the pre-consolidation migration block.

- [x] **Best Practices Review** — see "Responsibility boundaries" in Discovery Notes.

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/CORE-288.md` (Step 4.5 + provenance markers) and `CORE-300.md` (v5.3.0 release that shipped them); the `CORE-389.*` cohort was already distilled by `.1` and not re-read. Findings below.

- [x] **Drift check** — every path and mechanism cited in the PLAN line verified against HEAD. One correction to the PLAN line's framing recorded below; no contradiction with any SPEC contract.

- [x] Asked clarifying questions — three-question `AskUserQuestion` round; all resolved. See "Resolved design choices".

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Drift check

| Cited in the PLAN line | State at HEAD | Verdict |
|---|---|---|
| `/ft-audit` degrades to generic output in unforked repos | Confirmed — global + flowtron-local symlinks both point at the unfilled scaffold | ✅ no drift |
| "detect placeholder rubrics and gates" | Placeholders confirmed in `passes/general.md`: `<default glob>`, `<rubric file 1>`, `<rubric file 2>`, `<lint command for your stack>`, `<type-check or build command>`, `<test command>`, plus inline `_(forker: …)_` notes in passes/severity/specialist sections | ✅ no drift |
| "auto-derive gates from package.json, pyproject.toml, and CI config" | None of the three exist in flowtron itself except `.github/workflows/ci.yml` — derivation must be evidence-driven per repo, not assume a fixed set | ✅ no drift; widens the source table |
| "Teach `/ft-update` to refresh existing forks" | **Partial pre-existing capability.** Step 4.5 already scans provenance-marked forks and warns on scaffold drift (CORE-288, shipped v5.3.0). This task **extends** Step 4.5 rather than adding a new step | ⚠️ framing correction — logged, no scope change |

The one correction: the PLAN line reads as if `/ft-update` has no fork awareness. It has drift *warning*; what it lacks is the *pass-file refresh* — the ability to notice a full-copy fork missing a pass file that upstream shipped after the fork's reconcile point, and to add it. Building on Step 4.5 (which already parses `flowtron-reconciled:` / `flowtron-tracks:` and has `<reconciled>`/`<target>` in hand) is strictly cheaper than a parallel step and keeps one fork-provenance surface.

### Root of the defect — a detection gap, not a missing rule

The rule already exists and is stated twice:

- §1 step 5: "If anything's unclear, stop and ask. Don't guess intent."
- §7 rationalization row: *"No project rubric turned up, so I'll audit against general best practices."* → refuted by §1 steps 3, 5.
- §8 red flag: *"A 'Why it matters' line would read identically in any codebase — a sign the project rubric was never loaded."*

What is missing is a step that *makes the auditor look*. Nothing in §1 instructs a scan for unfilled slots, so the auditor reads `<lint command for your stack>` as a gate it cannot run, silently skips it, reads `<rubric file 1>` as a file it cannot open, silently skips it, and arrives at pass 1 with the test suite as the only grounded artifact. The bootstrap converts three advisory prohibitions into one executable check.

### Responsibility boundaries (Best Practices Review)

- **Where the bootstrap lives.** §1 (shared procedure), never §0. §0 is explicitly deleted at fork time ("delete this §0 block from your fork"), so a bootstrap living there would vanish from exactly the forks that later go stale. §1 survives both fork styles and is inherited verbatim by overlays.
- **Self-disabling by construction.** A filled fork has zero placeholder tokens, so detection no-ops and adds no runtime cost — the same mechanism that gates the offer also silences it. No separate "am I a fork?" flag to keep in sync.
- **DRY against §0.** The bootstrap automates most of the §0 checklist. Rather than restructure §0 (out of this task's scope, and §0 still carries items derivation cannot produce — sacred invariants, per-pass stack examples), add one pointer line noting the bootstrap covers the mechanical slots. Deferred cleanup: none identified beyond that.
- **Dependency direction.** `ft-audit` gains no dependency on `ft-update`, and `ft-update` gains none on `ft-audit`'s procedure — it only reads fork frontmatter and compares directory listings, which is what Step 4.5 already does. The shared contract stays in `docs/MIGRATION.md` §1.2.1.
- **Write-surface tension.** §6 hard-rules "Write tickets, not fixes… Source files do NOT [get updated]". Installing a fork of the skill is an *install*, not a source edit, but it is still a write outside `.flowtron/PLAN.md` and must be named as an explicit carve-out rather than left to interpretation — otherwise it is indistinguishable from the "fix while I'm in here" the same rule forbids.

### Archive precedent — CORE-288 / CORE-300

- CORE-288 built the provenance markers and Step 4.5 with a deliberate constraint worth inheriting: **"Zero edits to the six bundled scaffolds"** and non-blocking, opt-in behavior — pre-marker forks keep working untouched. This task's `/ft-update` half follows the same discipline (report-and-offer, never auto-mutate; unmarked forks silently skipped).
- CORE-288's Step 4.5 originally scoped `git log … -- claude/skills/<tracked>/SKILL.md`; the path was later widened to the scaffold **directory** precisely so `passes/` changes register. That widening is what makes the pass-file refresh implementable here — the drift signal already covers the right surface.
- CORE-300 recorded that the whole overlay/provenance cohort required **no adopter migration** (opt-in, consumed via submodule pin). The same holds here: unforked repos gain a prompt, filled forks see nothing, unmarked forks are skipped.

### Auto-derivation source table (drafted)

| Evidence | Derives |
|---|---|
| `package.json` `scripts` (`lint`, `typecheck`/`tsc`, `test`, `build`) | gates |
| `pyproject.toml` `[tool.ruff]` / `[tool.mypy]` / `[tool.pytest.ini_options]`; `uv.lock` present → `uv run` prefix | gates |
| `justfile` / `Makefile` targets matching the four intents | gates |
| `.github/workflows/*.yml` `run:` steps | gates (authoritative — what CI actually enforces) |
| `Cargo.toml` / `go.mod` / `Gemfile` | gates (`cargo clippy`/`test`, `go vet`/`test`, `rubocop`/`rspec`) |
| Top-level layout (`src/`, `backend/`, `frontend/`) + dominant file extension | default scope glob |
| Root `CLAUDE.md` / `AGENTS.md`, `docs/ARCHITECTURE.md`, ADR dir, `SECURITY.md` | rubric files |

**Not derivable — stays an explicit gap:** sacred invariants (§"Severity guide" Critical) and per-pass stack examples. The bootstrap reports these as still-unfilled after a fork+fill so the operator knows the overlay is prefilled, not finished.

**Safety constraint:** derived gate commands are restricted to lint · type-check · test · build intents. A script matching none of those is never proposed and never run — mis-derivation must not be able to execute a deploy/publish/migrate script.

### Resolved design choices

| Question | Resolution |
|---|---|
| Gate strength on placeholder detection | **Hard stop + `AskUserQuestion`** — three branches: fork+fill now · run once with derived values in memory · proceed degraded (report carries an explicit unfilled-scaffold banner). Consistent with §1 step 5's existing "stop and ask" |
| What fork+fill writes | **Thin overlay, prefilled** — `templates/audit-overlay-template.md` with `## Deltas` filled from derivation and `flowtron-reconciled:` set to the pinned tag. Auto-inherits future scaffold improvements; full-copy stays a documented manual alternative |
| Non-adopter repos (no `.flowtron/core/`) | **Detect + degrade gracefully** — the overlay's referenced-scaffold path cannot resolve, so skip the fork offer entirely and fall back to run-once-with-derived-values |
| `/ft-update` refresh mechanism | Extend **Step 4.5** (not a new step) — it already holds `<reconciled>`, `<target>`, and the fork's frontmatter |
| Clobber protection | Files present in both fork and bundle are **never touched**. Missing files are classified via `git ls-tree <reconciled> -- claude/skills/ft-audit/passes/`: absent upstream at reconcile time → **newly shipped**, offer to copy; present upstream at reconcile time → **deliberately deleted** by the forker (§0 sanctions this), report only, never re-add |
| Overlay forks under `/ft-update` | No action — they carry no `passes/` of their own and resolve pass files from the scaffold, so they inherit new domains automatically. Report as such |

### Downstream-impact reconciliation

Not triggered — the design choices resolved above stay inside this child's filed scope. `## High`, `## Low`, and `## Future Opportunities` are `(none)`; `## Medium` holds only this epic's cohort, whose siblings touch disjoint surfaces (`.2` a new pass file, `.3` a new skill dir) and whose `.5` already owns the doc/wiring reconciliation. No PLAN entry needs a reconcile edit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended three established shapes rather than introducing any: (a) `/ft-audit`'s existing numbered-section layout, with the bootstrap as `## 1.5` between `## 1` and `## 2` so it sits at its true execution point; (b) its §7 Rationalizations / §8 Red Flags convention — every new rule got a matching excuse row and an outside-observable symptom, which is how this skill has enforced its rules since CORE-217; (c) `/ft-update`'s Step 4.5, extended in place rather than given a parallel Step 4.55, because it already holds `<reconciled>`, `<target>`, and the fork's parsed frontmatter. The one new *mechanism* is `git ls-tree` at the reconcile point as a deleted-vs-never-seen discriminator; justified below.

- [x] **Minimal refactor gate** — one adjacent edit made, one declined. **Made:** a pointer paragraph in §0 splitting the checklist into the mechanical half (§1.5 automates) and the judgment half (§0 still owns) — required, because leaving §0 claiming to own slots the bootstrap now fills is the doc drift this epic exists to reduce. **Declined:** restructuring or retiring §0 outright. It still carries the non-derivable items, and rewriting it is scope this child was not filed for.

- [x] Implemented the minimal solution — see the surface table below.

- [x] Updated/added tests — N/A: the deliverable is agent-facing markdown contract with no executable surface. The equivalent verification is the Phase 3 truth table, which exercises the detection rule against all six real pass files plus two real filled forks in the fleet.

**Implementation Notes:**

**Surfaces changed** (3 files, +187/−8):

| File | Change |
|---|---|
| `claude/skills/ft-audit/SKILL.md` | §0 pointer; §1 new step 3 + renumber 3→4/4→5/5→6; new **§1.5 Scaffold bootstrap** (5 steps); §6 fork-install carve-out; §7 two new rows + one row updated; §8 five new red flags |
| `claude/skills/ft-update/SKILL.md` | Step 4.5 retitled; new item 5 (pass-file refresh) + old item 5 → 6; closing paragraph amended for the one write |
| `docs/MIGRATION.md` | §1.2.1 gains two paragraphs — self-filling bootstrap, and full-copy `passes/` refresh |

**Why §1.5 and not §0.** §0 is explicitly deleted at fork time ("delete this §0 block from your fork"). A bootstrap living there would vanish from precisely the forks that later go stale. §1 is the shared procedure — it survives both fork styles and is inherited verbatim by overlays.

**Self-disabling by construction.** The same scan that gates the offer silences it: a filled fork has zero unresolved slots, so detection no-ops with no runtime cost and no second "am I forked?" flag to keep in sync.

**Two design corrections forced by Phase 3** (both would have shipped as real defects — detail in Testing Notes):

1. Detection was drafted as a **literal token list** taken from `passes/general.md`. Only `general` uses that wording; `backend` ships `<default backend glob>` / `<lint command, e.g. ruff check / golangci-lint run>`, `security` ships `<secret-scanner, …>`. The list matched 1 of 6 domains. Replaced with a **structural** rule — any `<…>` span in the pass file's §"Scope & rubric hints" block, or any `_(forker: …)_` note — which fires on 6/6 and stays correct for domains not yet written (notably `.2`'s `structure`).
2. The gate whitelist was drafted as a fixed **lint · type-check · test · build** list. Four of six domains declare gates outside it (`security` scanners, `performance` profiler/load-test, `frontend` bundle-analyzer/a11y, `docs` markdown-lint/link-check), so the whitelist would have refused the gates those domains actually ask for. Inverted: **the loaded pass file declares which slots are wanted**, derivation only supplies candidates for declared slots, and safety moves to a **destructive-intent denylist** (deploy · publish · release · migrate · seed · reset · push). Same protection, correct across domains, and no maintenance when a domain is added.

**Overlay exemption** — the negative test showed both filled forks in the fleet (`bidviz/audit-backend`, `marscharts/audit`) are thin overlays with no `passes/` sibling. They run the *bundled* pass files, which carry placeholders by design and are resolved one layer up by `## Deltas`. Without an exemption the bootstrap would have fired on every run of the fork style the docs recommend. Detection now subtracts anything the overlay's deltas supply, and an overlay that *does* reach §1.5 has its fork branch withheld (the fix is filling its deltas, not writing a second fork).

**Clobber protection in `/ft-update`** rests on one discriminator: a bundled pass file the fork lacks is *newly shipped* if it is absent from `git ls-tree <reconciled>`, and *deliberately deleted* if present there — §0 sanctions deleting pass files for surfaces a project doesn't have, and re-adding those on every bump would silently overturn that decision. Files present in both are never read, diffed, or written; that is where filled rubrics live. Changes to files the fork already has stay item 4's drift warning, not this item's.

**Write-surface discipline.** Two writes were added to skills that are otherwise read-only, both named explicitly rather than left to interpretation: `/ft-audit`'s fork-install (§6 carve-out — install, not source edit; confirm-gated; never overwrites an existing fork) and `/ft-update`'s per-file pass copy (confirm-gated; the one exception to Step 4.5's report-only stance, stated in its closing paragraph).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown contract only, no executable surface. `viz/` untouched.

- [x] Ran lint/type-check on changed code — N/A (no lintable code surface). Structural checks stood in; results below.

- [x] **Quality assertions** — no avoidable duplication (bootstrap lives once in §1.5; §0, §7, §8, and MIGRATION reference it rather than restating it), no dead prose, no unexplained complexity, no public-surface growth beyond the two named write carve-outs, no stale code-facing documentation (MIGRATION §1.2.1 updated in the same change).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

**Detection rule vs. all six real pass files** — the check that caught defect 1:

| Pass file | scope/rubric/gate slots | forker notes | detected |
|---|---|---|---|
| `backend.md` | 7 | 10 | ✅ |
| `docs.md` | 6 | 9 | ✅ |
| `frontend.md` | 8 | 8 | ✅ |
| `general.md` | 6 | 7 | ✅ |
| `performance.md` | 7 | 10 | ✅ |
| `security.md` | 7 | 10 | ✅ |

The literal-token draft matched only `general.md` — 1/6. The structural rule matches 6/6.

**Negative test vs. real filled forks in the fleet** — the check that caught the overlay false-positive:

| Fork | shape | slots | notes | verdict |
|---|---|---|---|---|
| `bidviz/.claude/skills/audit-backend/` | thin overlay | 0 | 0 | no-op ✅ |
| `marscharts/.claude/skills/audit/` | thin overlay | 0 | 0 | no-op ✅ |

Both are overlays, which is what surfaced the exemption gap. `bidviz`'s SKILL.md does carry two `<domain>` / `<placeholder>` angle spans, but as prose outside any scope/rubric block — the block-scoped rule correctly ignores them, confirming the scoping is load-bearing and not incidental.

**Behaviour truth table after both fixes:**

| Situation | Result |
|---|---|
| Unforked bundled scaffold (the 18-of-24 case) | 🔥 fires — was silently degrading |
| Filled thin overlay | no-op |
| Unfilled overlay from the template | 🔥 fires, fork branch withheld |
| Non-adopter repo (no `.flowtron/core/`) | 🔥 fires, fork branch withheld |
| Filled full-copy fork | no-op |

**Structural checks:** `ft-audit` §1 renumbering verified end-to-end (steps 1–6 sequential, no duplicates); every `§1 step N` cross-reference in the repo re-checked against the new numbering (`§7`'s "steps 3, 5" → "steps 3, 4, 6"; the six `passes/*.md` "loaded at §1 step 1" headers and `ft-audit-repo`'s "§1 step 2" all still correct — neither step moved); `ft-update` Step 4.5 items renumbered 1–6 with no gap; code fences balanced in all three files (10 / 22 / 46); zero trailing whitespace; overlay-template `## Deltas` keys confirmed to cover exactly what §1.5 step 5 prefills.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across `.flowtron/tasknote/README.md` §"AI-referenced docs":

  | Doc | Verdict |
  |---|---|
  | `README.md` | no change |
  | `AGENTS.md` | no change |
  | `SPEC.md` | no change — its `/ft-audit*` references are namespace and next-move-flag rules, untouched by this change |
  | `docs/MIGRATION.md` | **updated** — §1.2.1 gains the self-filling-bootstrap paragraph and the full-copy `passes/` refresh paragraph |
  | `claude/AGENTS-snippet.md` | no change — audit scaffold is forked, not symlinked; no wiring change |
  | `codex/AGENTS-snippet.md` | no change |
  | `cursor/AGENTS-snippet.md` | no change |
  | `grok/AGENTS-snippet.md` | no change |
  | `docs/CONVENTIONS.md` | no change — §"Customization" names the fork *seam*, which this change preserves rather than moves |
  | `CONTRIBUTING.md` | no change |
  | `SECURITY.md` | no change — no new external-content surface; both added writes are local, confirm-gated, and copy flowtron's own files |
  | `docs/AGENT-NEUTRALITY.md` | no change — no new Claude-specific surface introduced |
  | `docs/PLATFORMS.md` | no change — verified line 74's "forked/overlaid locally, not symlinked" claim still holds; the bootstrap offers an overlay, which that line already covers |
  | `claude/CAPABILITIES.md` | no change |
  | `docs/AGENT-COMPAT.md` | no change |
  | `docs/EXTERNAL-AGENTS.md` | no change |
  | `docs/WORKTREES.md` | no change |

  One out-of-list correction made in the same change: `/ft-update`'s own frontmatter `description:` was drift *this task created* (it enumerated the skill's behaviors and would have omitted the pass-file refresh), so the clause was added. `/ft-flowtron`'s roster one-liners were checked and left alone — none became false, and roster edits are `CORE-463.5`'s filed surface.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and kept nested beneath the active `CORE-EPIC-463` parent per the epic child-placement invariant, tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Closed the distribution defect `CORE-463.1` identified as the epic's root cause: `/ft-audit` shipping as a scaffold whose rubric, scope, and gate slots are placeholders, with nothing instructing the auditor to notice. The rule against auditing unfilled was already stated three times (§1's stop-and-ask, a §7 rationalization row, a §8 red flag) — what was missing was a step that makes the auditor *look*. `/ft-audit` §1 step 3 now scans the loaded pass file and routes to a new §1.5, which derives candidate gates, scope glob, and rubric files from what the repo declares (manifests, CI config, layout, rubric docs — each value citing its source), then stops and offers fork+fill · run-once · proceed-degraded. Detection is self-disabling: a filled fork has nothing to find, so the mechanism that gates the offer also silences it.

On the maintenance side, `/ft-update` Step 4.5 — which already warned about scaffold drift (CORE-288) — now also reconciles a full-copy fork's `passes/` file *set*. The clobber-safety rests on one discriminator: a bundled file the fork lacks is newly shipped if absent from `git ls-tree <reconciled>` and deliberately deleted if present there, so a domain the forker removed on purpose is never silently re-added, and files the fork already has are never read, diffed, or written.

Phase 3 caught two defects that would have shipped, both from testing the rules against the real files rather than the one file they were drafted from. Detection was written as a literal token list taken from `passes/general.md` and matched **1 of 6** domains — `backend` words the same slot `<default backend glob>`, `security` `<secret-scanner, …>`; replaced with a structural rule that matches 6/6 and will match `CORE-463.2`'s `structure` domain unmodified. The gate whitelist was a fixed lint/type-check/test/build list that would have **refused the gates four of six domains actually declare** (scanners, profilers, bundle analyzers, link checkers); inverted so the pass file declares which slots are wanted, with safety moved to a destructive-intent denylist. A negative test against the fleet's two genuinely filled forks then surfaced a third: both are thin overlays running the *bundled* placeholder-bearing pass files with values supplied via `## Deltas`, so the bootstrap would have false-positived on every run of the fork style the docs recommend — detection now subtracts what an overlay's deltas supply.

**Changed files:** `claude/skills/ft-audit/SKILL.md` · `claude/skills/ft-update/SKILL.md` · `docs/MIGRATION.md` (+187/−8) and this tasknote.
**Verification:** detection rule exercised against all 6 real pass files (6/6 fire) and both real filled forks in the fleet (2/2 no-op); 5-row behaviour truth table; §1 renumbering cross-checked against every `§1 step N` reference in the repo; Step 4.5 items renumbered 1–6; fences balanced, zero trailing whitespace. No test or lint surface — markdown contract only.
**Refactors:** one made (§0 split into the mechanical half §1.5 now automates and the judgment half §0 still owns — required, or §0 claims slots it no longer fills); one declined (restructuring §0 wholesale — it still carries the non-derivable items and is outside this child's filed scope).
**Documentation verdict:** 16/17 AI-referenced docs "no change"; `docs/MIGRATION.md` §1.2.1 updated in the same change; `/ft-update`'s own frontmatter description corrected for drift this task created.
**Maintainability effect:** converts three advisory prohibitions into one executable check at the point where it can still change the outcome, and makes both new rules read the pass file instead of hardcoding its contents — so `CORE-463.2`'s `structure` domain inherits correct detection, derivation, and fork-refresh behaviour with no edit to either skill.

**Archived:** 2026-08-23
