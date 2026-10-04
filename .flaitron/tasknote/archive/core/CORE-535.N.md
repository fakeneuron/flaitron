---
title: context-load-diet audit
status: completed
tags: []
created: 2026-09-07
due:
related-tasks: [CORE-EPIC-535, CORE-535.1, CORE-535.2, CORE-535.3, CORE-535.4, CORE-535.5]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-535.N | context-load-diet audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-535]]

## 🎯 Goal

Verify the completed `CORE-EPIC-535` (`context-load-diet`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-535.N — audit CORE-EPIC-535` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-535.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-535.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-535` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-535.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-535]] — parent epic (context-load-diet)
- [[CORE-535.1]] — cohort child: epic Discovery, filed .2–.5
- [[CORE-535.2]] — cohort child: context-load-ledger
- [[CORE-535.3]] — cohort child: spec-core-lazy-split
- [[CORE-535.4]] — cohort child: skills-cite-dont-restate
- [[CORE-535.5]] — cohort child: gate-logic-untangle

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-535.N`; pre-flight passed
  (clean tree, parent `CORE-EPIC-535` active in `## High`, all five
  implementation children `- [x]`, no open siblings, `.N` is the canonical
  reserved audit child). Full cohort, no early-audit decision needed.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort inventory** (read each child's archived tasknote Final Summary +
Implementation Notes at `.flowtron/tasknote/archive/core/`):

- **`.1` context-load-diet discovery** — measured the load (~70k tokens at
  Phase 1, ~35-40k flowtron-owned), filed `.2`–`.5`. Deliverable was filing,
  not code. Doc-drift: all 18 "no change".
- **`.2` context-load-ledger** — new `docs/CONTEXT-BUDGET.md` (budgets:
  `SPEC.md` ≤50,000 · `SPEC/gates.md` ≤35,000 · `claude/skills/*/SKILL.md`
  ≤30,000 · `ft-release` ≤40,000), a sixth `/ft-release` §7.1 standing check
  that reads it, plus three folded fixes (false-truncation retraction in
  `ft-audit-context`, `.claude/rules/` snippet section, probe-by-default
  archive-skim clause).
- **`.3` spec-core-lazy-split** — `SPEC.md` 78,119 → 49,005; ten sections moved
  verbatim into six new lazy modules; two spans deleted outright; 39 files'
  cross-references repaired.
- **`.4` skills-cite-dont-restate** — eight restated contract spans in
  `ft-task` / `ft-micro-task` / `ft-epic-discovery` collapsed to citations;
  83,391 → 72,450; `ft-task` under its 30,000 cap.
- **`.5` gate-logic-untangle** — `SPEC/gates.md` 51,809 → 32,299; two new
  modules (`cue-vocabulary.md`, `gate-discipline.md`); `## Known over budget`
  emptied.

**Best Practices Review:** N/A — this audit is a verification pass over
markdown contract surfaces; no code module boundaries in scope. The one
exception (three inline citation/figure fixes) is covered under Phase 2.

**Archive skim:** self-referential by construction — the five cohort children
*are* the relevant `archive/core/` entries, all read above. No non-cohort
prior notes touch the split surfaces at a depth this audit needs.

**Drift check:** the cohort's cited paths all resolve at HEAD; the six `.3`
modules and two `.5` modules exist with the recorded byte sizes (verified by
`wc -c` against the ledger — two exceptions, both findings below). PLAN.md line
for `CORE-535.N` matches the `.N` grammar and nests under an active parent, as
`SPEC/epic.md` requires.

**No clarifications needed.** Assumptions stated: (1) the audit runs the full
cohort, no partial scope; (2) inline fixes are limited to factual
citation/figure corrections in cohort-touched surfaces, per skill Step 5;
(3) anything larger is logged as a `/ft-file-followup` candidate rather than
absorbed.


## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey:** N/A as new-code work. For the verification method the audit
reused the cohort's own precedent: `.3` and `.5` both validated by resolving
`§"…"` citations repo-wide and by re-running the `/ft-release` §7.1 mirror
pairs, so this audit ran the same two checks plus the standing context-budget
check `.2` shipped.

**Minimal refactor gate:** three one-line factual corrections applied inline,
no restructuring. Each is a citation or figure that contradicts a surface the
cohort itself moved — the class skill Step 5 authorizes fixing in place.

### Verification run

- **Standing context-budget check (`.2`'s deliverable, run against HEAD).**
  `SPEC.md` 48,771/50,000 PASS · `SPEC/gates.md` 32,299/35,000 PASS ·
  `ft-release` 37,369/40,000 PASS · all 18 other skill bodies under 30,000
  (largest `ft-task` 27,588). `docs/CONTEXT-BUDGET.md` §"Known over budget"
  confirmed empty. **No unowned violation; the check does not block.**
- **Citation resolution, repo-wide.** 527 resolvable `<file> §"…"` citations
  scanned (adopter-side `.flowtron/core/…` paths and `<SKILL_DIR>` placeholders
  excluded as unresolvable in a self-host checkout by design). Anchors counted
  as headings *or* bold-prose leads, which is flowtron's actual citation
  convention. **Before fixes: 3 genuine misses. After: 0.** The single residual
  report is a scanner artifact — `codex/skills/ft-audit/SKILL.md` cites
  `§"One-time skill wiring"` wrapped across a blockquote `>` prefix; the anchor
  exists at `codex/AGENTS-snippet.md:12`.
- **Release mirror pairs `.3` repaired mid-cohort.** Pair A (templates roster ↔
  `templates/` directory) — three hits, one per file, all ten template files
  named. Pair K1 (PR-archetype citations ↔ `docs/VISION.md` bullets) — zero
  misses. Pair K2 — zero misses. **`.3`'s repair holds; no silent break.**
- **Ledger vs. reality.** Every one of the 27 recorded surfaces re-measured with
  `wc -c`. 25 exact; two drifted (both findings below).

### Findings and inline fixes

**F1 — `AGENTS.md:41` cited a section `.3` had moved (cohort regression).**
`SPEC.md` §"Skill namespace" moved to `SPEC/layout.md` in `.3`. That task edited
this exact line — appending "(contract in `SPEC/layout.md`)" — but left the
primary citation pointing at `SPEC.md`, which no longer holds the heading. Its
doc-drift sweep recorded "the §"Skill namespace" pointer names `SPEC/layout.md`",
which overstates what landed: a parenthetical was added, the citation was not
repointed. Every other site in the repo (`docs/PLATFORMS.md` ×2,
`docs/MIGRATION.md`, and `SPEC.md`'s own internal cite) already reads
`SPEC/layout.md`, confirming a half-repair rather than an intentional
divergence. **Fixed** — citation repointed, parenthetical dropped as redundant.
`CLAUDE.md` is a symlink to `AGENTS.md`, so both surfaces are covered by the one
edit.

**F2 — `docs/CONTEXT-BUDGET.md` recorded `SPEC/gates.md` 528 bytes stale, at the
commit that wrote it (cohort regression).** Two sites said 31,771; the file was
**32,299 at `efac5f4` itself** (`git show efac5f4:SPEC/gates.md | wc -c`), and
`.5`'s own Final Summary says 32,299. The figure was measured mid-task and never
refreshed before closure, so the ledger shipped contradicting the summary in the
same commit. No verdict changes — 32,299 is still under the 35,000 budget — but
this is precisely the staleness class the ledger exists to prevent, in the
ledger. **Fixed** at both sites.

**F3 — `claude/skills/ft-stats/SKILL.md:53` cites the wrong file (pre-existing).**
It matches the closure stub form against `SPEC.md` §"`## Completed` archive
convention"; that section's home is `SPEC/tasknote-selection.md:209` and has been
since before this epic (`SPEC.md` at the pre-epic baseline already cited
`SPEC/tasknote-selection.md` for it). The sentence is self-contradicting as
written — it continues "the same **module**'s §"Exception — inline audit fixes"",
and "module" means a lazy `SPEC/` module, not `SPEC.md`. Predates the cohort;
surfaced by the cumulative sweep, which is what the fixed doc-drift line is for.
**Fixed** — repointed to `SPEC/tasknote-selection.md`.

**Ledger rows refreshed** for the surfaces these fixes moved: `AGENTS.md`
6,840 → 6,816, `ft-stats` 8,874 → 8,893, `.flowtron/PLAN.md` refreshed at
closure once this task's own PLAN write lands. Attribution line reassigned to
this task.

### Logged as `/ft-file-followup` candidates (not fixed here)

1. **The ledger's `.flowtron/PLAN.md` row is structurally unmaintainable.**
   Recorded 2,611, actual 2,775 — and it goes stale at *every* task closure,
   since every closure rewrites a PLAN line. Unlike the other 26 rows it tracks
   a file that changes by design. Worth deciding whether the row should be
   dropped, replaced with an order-of-magnitude band, or explicitly marked
   as refreshed-only-at-release. A fix inside this audit would be a contract
   judgment, not a factual correction.
2. **`.flowtron/tasknote/README.md:81` — "all 63 skill-body `§"…"` citations
   resolve today".** `.4` flagged this count as stale at its own closure and
   deliberately left it rather than re-derive by a different method than
   `CORE-492`'s. This audit reaches the same conclusion for the same reason: a
   naive count of `§"…"` in `claude/skills/*/SKILL.md` returns **254**, which
   cannot be reconciled with 63 without knowing CORE-492's counting rule, and
   guessing would replace a stale number with an unsourced one. The *truth* half
   of the claim was falsified by F3 and is restored by this commit; only the
   count remains open.


## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Repo test suites — `N/A`, by `AGENTS.md` §"Validation" scope.** That section
defines validation as the `viz/` suite (`npm --prefix viz test` / `typecheck` /
`lint`) and the fleet-updater suite (`node --test tools/update-adopters.test.mjs`).
This task changed four markdown files and touched neither `viz/` nor `tools/`,
so the narrowest validation that covers the change is markdown-structural, not
either suite.

**Lint/type-check — `N/A` for the same reason**; markdown-structural checks
substituted and run on all four touched files:

- Code fences balanced (`AGENTS.md` 6, `ft-stats` 4, `CONTEXT-BUDGET.md` 0,
  tasknote 0 — all even).
- `.editorconfig` conformance: zero trailing whitespace, zero CRLF, final
  newline present in each.
- Citation resolution re-run post-fix: **0 genuine unresolved** across 527
  citations (was 3).
- Standing context-budget check re-run post-fix: every budgeted surface passes;
  `SPEC.md` 48,771 and `SPEC/gates.md` 32,299 unchanged by this task's edits.
- Ledger re-measured after the fixes: `AGENTS.md` 6,816 and `ft-stats` 8,893
  written back, so the ledger is accurate for this commit rather than for the
  pre-edit tree.

**Quality assertions:** no duplication, dead code, or public-surface growth —
the diff is six lines across three files, each replacing a wrong file path or a
wrong number with the right one. No stale code-facing documentation introduced;
three instances removed.

**Frontend `👁️ CONFIRM` — `N/A`.** No UI surface; `viz/` untouched.


## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

The `CORE-EPIC-535` cohort holds up: every budget it set is met at HEAD, every
citation it rewrote resolves, and both release mirror-pairs it repaired
mid-flight still pass. The audit found **three factual defects and fixed all
three inline** — two of them regressions the cohort introduced in its own last
two commits, both of the same kind: a number or a path recorded correctly in a
task's Final Summary but written stale into the shipped surface.

**Cohort verification.** `SPEC.md` 48,771/50,000 · `SPEC/gates.md` 32,299/35,000
· `ft-release` 37,369/40,000 · the other 18 skill bodies all under 30,000
(largest `ft-task` 27,588); `docs/CONTEXT-BUDGET.md` §"Known over budget"
confirmed empty, as `.5` left it. 527 `§"…"` citations resolved repo-wide —
3 genuine misses before the fixes, 0 after, with the single residual report
confirmed a scanner artifact (a blockquote-wrapped anchor that does exist).
Release Pair A, K1, and K2 all zero-miss, which matters because `.3` repaired A
and K1 by hand and warned they would otherwise have broken silently at the next
cut. All 27 ledger rows re-measured with `wc -c`: 25 exact, 2 drifted.

**F1 (`.3` regression).** `AGENTS.md:41` still cited `SPEC.md` §"Skill
namespace" — a section `.3` moved to `SPEC/layout.md`. `.3` edited that very
line, appending "(contract in `SPEC/layout.md`)" without repointing the
citation, and its sweep recorded the pointer as updated. Every other site in the
repo already reads `SPEC/layout.md`, so this was a half-repair, not a divergence.
Fixed; `CLAUDE.md` is a symlink, so one edit covers both.

**F2 (`.5` regression).** `docs/CONTEXT-BUDGET.md` recorded `SPEC/gates.md` at
31,771 in two places while the file was **32,299 at `efac5f4` itself** — the
commit that wrote the number — contradicting `.5`'s own Final Summary in the
same commit. 528 bytes, no verdict change (still under 35,000), but it is the
staleness class the ledger exists to prevent, occurring inside the ledger.
Fixed at both sites.

**F3 (pre-existing).** `claude/skills/ft-stats/SKILL.md:53` matched the closure
stub form against `SPEC.md` §"`## Completed` archive convention"; that section
lives in `SPEC/tasknote-selection.md` and did before this epic. The sentence
contradicted itself — it goes on to say "the same **module**'s" — which is what
made it findable. Repointed.

**Ledger refreshed** for the rows these fixes moved (`AGENTS.md` 6,840 → 6,816,
`ft-stats` 8,874 → 8,893, `.flowtron/PLAN.md` re-measured at this closure), with
the attribution line reassigned to this audit.

**Two candidates logged, not fixed** — both are contract judgments rather than
factual corrections, so they belong in `/ft-file-followup`, not here: the
ledger's `.flowtron/PLAN.md` row is structurally unmaintainable (it goes stale
at every task closure, unlike the other 26 rows), and
`.flowtron/tasknote/README.md:81`'s "all 63 skill-body citations resolve today"
carries a count that cannot be re-derived without knowing `CORE-492`'s counting
rule — `.4` declined to guess at it and this audit declines for the same reason.
The claim's *truth* half, falsified by F3, is restored by this commit.

**Maintainability effect.** The epic's central promise — that the always-loaded
set stays measured and under a written cap — is now verified end-to-end against
the shipped tree rather than against the tasknotes that claimed it. The two
regressions found were both cases of a summary and a surface disagreeing inside
one commit, which is precisely the cumulative staleness a per-task Phase 4
closure cannot see and the fixed doc-drift line is positioned to catch.

**Doc-drift sweep** across all 18 `.flowtron/tasknote/README.md`
§"AI-referenced docs" entries:

- `README.md` — no change; cites no section this cohort moved (verified: no
  `Skill namespace` or `## Completed` archive-convention citation)
- `AGENTS.md` — **updated**: the §"Skill namespace" citation repointed from
  `SPEC.md` to `SPEC/layout.md`, and the now-redundant parenthetical dropped (F1)
- `SPEC.md` — no change; this audit moved no contract section, and `SPEC.md`'s
  own internal §"Skill namespace" citation was already correct at HEAD
- `docs/MIGRATION.md` — no change; its §"Skill namespace" citation already names
  `SPEC/layout.md`, and no adoption or bump step is affected by three
  citation/figure corrections
- `claude/AGENTS-snippet.md` — no change; the fenced paste-block is untouched
  and the file cites none of the corrected sections
- `codex/AGENTS-snippet.md` · `cursor/AGENTS-snippet.md` ·
  `grok/AGENTS-snippet.md` — no change; all three point at the Claude
  paste-block rather than copying it
- `docs/CONVENTIONS.md` — no change; its citations were repointed by `.3` and
  all resolve in this audit's sweep
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change, **and one deferred item resolved as
  already-correct.** `.5` flagged that the `--fast` `SPEC.md`-half site count
  read 6 against the 4 recorded and deferred it rather than silently correct it.
  Re-measured here: `SPEC.md` mentions `--fast` in exactly 4 places, matching the
  4 sections the row names, so the row is self-consistent at HEAD under its own
  stated any-mention-per-section rule. No edit needed; the deferral closes
- `docs/PLATFORMS.md` — no change; both its §"Skill namespace" citations already
  name `SPEC/layout.md`
- `claude/CAPABILITIES.md` — no change. `last-verified` stamp
  (`v5.24.0 · 2026-08-30`) **not** bumped: no version bump in this task, and no
  capability trigger changed
- `docs/AGENT-COMPAT.md` — no change; cites no corrected section
- `docs/EXTERNAL-AGENTS.md` — no change; its `SPEC/plan-parser.md`
  §"`[unattended]` mis-authoring footguns" citation, newly written by `.3`,
  verified resolving to a real bold anchor
- `docs/WORKTREES.md` — no change
- `docs/VISION.md` — no change; release Pair K1 and K2 both zero-miss, so every
  citation pointing at §"What we won't accept" still resolves and every
  point-of-use restatement still names its source

Off-sweep-set but same commit, by their own contracts:
`docs/CONTEXT-BUDGET.md` (F2 fix + three ledger rows + attribution) and
`claude/skills/ft-stats/SKILL.md` (F3 fix) — skill bodies and `docs/` files
outside the 18-entry list are excluded from the sweep set by
`.flowtron/tasknote/README.md`'s own volume decision.


**Archived:** 2026-09-07
