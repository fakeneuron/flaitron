---
title: gate-tiering-cold-start audit
status: completed
tags: []
created: 2026-09-18
due:
related-tasks: [CORE-EPIC-604, CORE-604.1, CORE-604.2, CORE-604.3, CORE-604.4, CORE-558.2, CORE-558.4]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - docs/DOGFOOD.md
  - docs/CONTEXT-BUDGET.md
  - .flowtron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-604.N | gate-tiering-cold-start audit

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-604]]

## 🎯 Goal

Audit the closed `CORE-EPIC-604` cohort (`.2` gate-postures split, `.3` runner / stub / `model.md` trim, `.4` rotation bound + ledger) as one integrated change: re-measure the flagless cold-start byte band, re-run the fidelity instruments over the moved and trimmed surfaces, and sweep for residual drift, so the parent can flip with findings recorded.

## ✅ Acceptance

- [x] Cold start re-measured at HEAD and recorded against `.1` §A's baseline, with the gap to `.1`'s projection explained — Discovery §A; `wc -c` over the nine default-path surfaces → 147,896; the flowtron-shipped subset (139,621) equals the `docs/CONTEXT-BUDGET.md` "Default-path cold start" figure — `grep -q '139,621' docs/CONTEXT-BUDGET.md`
- [x] Citation validator over every non-archive `§"…"` cite → 0 genuine dangling — Discovery §B (629 / 0); `judgment` on the 29 placeholder / historical artifacts
- [x] Deleted-sentence classifier over the epic diff (`075530a..HEAD`) → every no-home line in a named class (repoint / operator-decided rewrite / deliberate drop) — Discovery §B (311 / 39 / 3 classes); `judgment`
- [x] CI `drift` job passes locally against the unpushed epic commits — 10 steps extracted from `.github/workflows/ci.yml` → 10 PASS; release pairs I / K1 / K2 print nothing — Discovery §C
- [x] F1 fixed: `docs/DOGFOOD.md` Step 1 item 4 no longer says `gates.md` carries the cue vocabulary — `grep -c 'full operator-cue' docs/DOGFOOD.md` → 1 (the Step 2 inline list only)
- [x] F2 fixed: `docs/CONTEXT-BUDGET.md` wikilinks the real epic ID — `grep -c '\[\[CORE-604\]\]' docs/CONTEXT-BUDGET.md` → 0; `grep -q '\[\[CORE-EPIC-604\]\]' docs/CONTEXT-BUDGET.md`
- [x] F4 filed: `CORE-605` `[light]` standalone row under `## Medium`, ≤ 70 words — `grep -q '\*\*CORE-605\*\*' .flowtron/PLAN.md` + `wc -w` on the description
- [x] F3 / F5 recorded as findings with no change, reasons stated — Discovery §D; `judgment`
- [x] Parent-flip prompt bundled at the 📦 gate (Q1); on Yes, `CORE-EPIC-604` stub-flipped and the six-row cohort at the top of `## Completed` — `awk '/^## Completed$/{f=1} f' .flowtron/PLAN.md | head -7 | grep -c 'CORE-604\|CORE-EPIC-604'` → 6
- [x] Doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs": for each entry, "no change" or the update — Phase 4; `judgment`

## 🧩 Subtasks

- [x] Re-measure the nine default-path surfaces at HEAD; reconcile with `.1` §A and the `.4` ledger row
- [x] Citation validator (repo-wide, non-archive) + deleted-sentence classifier (epic diff) + adjacency / stale-claim greps
- [x] Run the CI `drift` job's 10 steps and release pairs I / K1 / K2 locally
- [x] Table the findings; AskUserQuestion on F3 / F4 / F6
- [x] Phase 2: fix F1 (`docs/DOGFOOD.md`), F2 (`docs/CONTEXT-BUDGET.md`); file `CORE-605` under `## Medium`
- [x] Phase 3: receipts for every Acceptance verify command; trailing-whitespace grep on touched files
- [x] Phase 4: doc-drift sweep, `.N` PLAN stub flip nested under the parent, archive; queue the parent-flip prompt for the 📦 bundle

## 🔗 Related

- [[CORE-EPIC-604]] — parent epic
- [[CORE-604.1]] — Discovery; §A is the baseline measurement this audit re-runs; §D lists what the epic deliberately did not do
- [[CORE-604.2]] — gate-postures split; deferred `docs/DOGFOOD.md:40` staleness to this audit
- [[CORE-604.3]] — runner / stub / `model.md` trim; deferred `SPEC/procedures/ft-task.md` and the §Ledger rows
- [[CORE-604.4]] — rotation bound + ledger sum line; flagged two stale §Ledger table rows
- [[CORE-558.2]] / [[CORE-558.4]] — related-decision: the fidelity instruments (citation validator + deleted-sentence classifier) this audit reuses

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three implementation children (`.2`, `.3`, `.4`) are `[x]` and archived; this is the epic's terminal audit child, invoked via `/ft-task CORE-604.N` (epic.md step 4 names both runners). The audit's job is fixed by `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line" plus what the siblings deferred to it by name: `.1` §A's re-measure, `.2`'s `docs/DOGFOOD.md:40` staleness, `.3`'s SOP + §Ledger deferrals, `.4`'s two stale ledger rows, and the [[CORE-558.2]] / [[CORE-558.4]] instruments over the whole epic diff. No deviation from the PLAN line.

- [x] Read relevant source files — the four archived cohort notes in full; `SPEC/gates.md` (intro, heading map, the three stubs), `SPEC/gate-postures.md` (header), `SPEC/model.md` (table stub), `SPEC.md` §"Model field", `docs/PLATFORMS.md` §"Platform×model×effort calibration table", `claude/commands/ft-task.md` (whole), `claude/skills/ft-task/SKILL.md` (whole — the runner driving this session), `docs/CONTEXT-BUDGET.md` (whole), `docs/DOGFOOD.md` §Step 1–2, `SPEC/procedures/ft-task.md` (unattended / citation sites), `.github/workflows/ci.yml` `drift` job, `claude/skills/ft-release/step-7.1-mirror-pairs.md` Pairs I–K

- [x] **Best Practices Review** — `N/A` — markdown contract + skill prose, no code module boundaries. The boundary the audit re-verifies is the one every child was held to: cite-don't-restate ([[CORE-535.4]]), operative rules never leave the always-loaded path ([[CORE-558.2]]), instruction clarity outranks bytes ([[CORE-555]]).

- [x] **Archive skim** — self-referential for an epic audit: the cohort children are the archive entries (read above). Beyond the cohort, [[CORE-558.N]]-class precedent for the instruments was already read by `.1` §B and inherited; `archive/core/` confirmed non-empty (`CORE-604.1..4` present).

- [x] **Drift check** — every path the four children name exists at HEAD `fc6065c`; byte counts in §A re-measured directly. `SPEC/epic.md` §"Audit acceptance" and §"Child placement invariant" read (not recalled). One process drift to surface: the precedents (`CORE-575.N`, `CORE-598.N`, `CORE-603.N`) all closed via `/ft-close-epic`, whose Step 8 owns the parent-flip prompt; `/ft-task` has no such step, and `/ft-close-epic` refuses once `archive/core/CORE-604.N.md` exists — resolved in §E.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — one AskUserQuestion, three questions; answers in §E

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

### A. Re-measure (bytes at HEAD `fc6065c`; `.1` §A baseline at `075530a` in parentheses)

Always Read on a flagless `/ft-task <ID>.<sub>` before Phase 1 writes (self-host):

| Surface | Now | Was | Δ |
|---|---|---|---|
| `claude/commands/ft-task.md` | 2,520 | 4,709 | −2,189 (`.3`) |
| `claude/skills/ft-task/SKILL.md` | 26,426 | 27,389 | −963 (`.3` fold, `.4` Step 1 line) |
| `SPEC.md` | 53,984 | 52,993 | +991 (`.2` module list, `.3` ladder) |
| `.flowtron/PLAN.md` | 8,275 | 16,140 | −7,865 (`.4` rotation) |
| `.flowtron/tasknote/README.md` | 8,816 | 8,816 | 0 |
| `templates/tasknote-template.md` | 5,173 | 5,173 | 0 |
| `SPEC/gates.md` | 20,804 | 35,910 | −15,106 (`.2`; 17,352 moved, ≈ 2.2k of stubs + intro back) |
| `SPEC/plan-filing.md` | 15,771 | 15,229 | +542 (`.4`) |
| `SPEC/epic.md` | 6,127 | 6,127 | 0 |
| **Sum** | **147,896** | **172,486** | **−24,590 (−14%)** |

≈ 37k tokens, down from ≈ 43k. Adopter band (PLAN.md ≈ 3k): ≈ 142.6k. The flowtron-shipped sum excluding PLAN.md is 139,621 — matches `docs/CONTEXT-BUDGET.md` §Ledger "Default-path cold start" exactly.

**Against `.1`'s projection (≈ 129k flagless self-host, ≈ 116k after rotation).** Realized 147.9k *after* rotation — ≈ 19k short of the post-rotation projection. The gap is not lost work; it is three things the projection did not book: `SPEC/plan-filing.md` (15.8k) still loads on every closure via the template's Closed-line citation (the projection appears to have treated it as droppable); the `gates.md` stubs + intro rewrite kept ≈ 2.2k of the 17.4k moved (by design — [[CORE-535.5]] shape, adopter paste-block citation); and `SPEC.md` grew ≈ 1k for the module list and the ladder ([[CORE-558.4]]'s Satisfied-without-reading fix, an operator decision). The flagged-path surfaces the epic also trimmed but that do not load on a flagless run: `SPEC/model.md` 16,984 → 14,626, `ft-micro-task/SKILL.md` 20,668 → 19,723, `SPEC/gate-postures.md` 19,029 (new, flag-only).

### B. Fidelity instruments (epic-wide, `075530a..HEAD`)

- **Citation validator** — 629 `§"…"` citations in every non-archive tracked `.md`, resolved against headings + bold-lead anchors of the target (adopter `.flowtron/core/` prefix, `<SPEC_DIR>` / `<SKILL_DIR>` / `<FT>` placeholders, and `../` relatives resolved by hand) → **0 genuine dangling**. The 29 raw misses are all placeholder forms (`passes/<domain>.md`, `SPEC/x.md`, `<section>`), two historical `PLAN-ARCHIVE.md` row descriptions, one quoted-history line in `step-7.1-mirror-pairs.md:253` (`.3` saw the same one), and one blockquote line-wrap in `codex/skills/ft-audit/SKILL.md`.
- **Deleted-sentence classifier** — 311 lines (> 45 chars) deleted from the nine trimmed / moved surfaces; 39 with no 60-char verbatim window anywhere at HEAD. All 39 fall in three classes: (i) 22 citation repoints and wrapped-line cross-file rewrites (`SPEC.md` ×4, `gates.md` ×11, `model.md` ×5, `ft-micro-task` Step 0 lazy list ×2); (ii) 15 lines of the `plan-filing.md` rotation rule + the runner's advisory text rewritten under `.4`'s operator-confirmed single-60-threshold / row-count decision, and the command stub's composition sentence shortened (`.3`, content kept); (iii) 1 deliberate drop, the `haiku` calibration row (`.3` §E). No operative imperative without a home.
- **Moved-section adjacency** — no non-archive surface cites a moved posture section under `gates.md` (two regex hits are the runners' `--fast` override paragraph, whose 80-char window spans a correct `gate-postures.md` cite).
- **Stale-claim greps** — no non-archive prose still says `gates.md` holds the postures / matrix (only the epic's own PLAN row, historically); no `**100**` / `**150**` operative rotation figure outside `plan-filing.md`'s own historical footnote; `haiku` survives only as a token example (`SPEC.md:89`, `step-1.5-model-edge.md:20`) per `.3` §E.

### C. Release / CI gates run locally

- CI `drift` job, all 10 steps extracted from `ci.yml` and run under bash → **10/10 PASS** (wrapper-name invariant, shipped-skill parity, context budget, Pairs A, B, C, J, M, N, O). The epic's four commits are unpushed (`main` ahead 14), so this is the first run of the job against them.
- Context budget readings: `SPEC.md` 53,984 / 57,000 · `gates.md` 20,804 / 25,000 · `gate-postures.md` 19,029 / 23,000 · `ft-release` 31,620 / 40,000 · glob row max `ft-epic-discovery` 29,100 / 33,000.
- Release-only pairs I, K1, K2 → print nothing.

### D. Findings

| # | Sev | Finding | Disposition |
|---|---|---|---|
| F1 | Low | `docs/DOGFOOD.md:40` Step 1 item 4 still describes `SPEC/gates.md` as carrying "the full operator-cue vocabulary" — stale since [[CORE-535.5]] moved it to `SPEC/cue-vocabulary.md`; deferred here by `.2` | Fix inline (one clause) |
| F2 | Low | `docs/CONTEXT-BUDGET.md:88` wikilinks `[[CORE-604]]`, an ID that does not exist — the epic is `CORE-EPIC-604` | Fix inline |
| F3 | Info | `docs/CONTEXT-BUDGET.md` §Ledger tables are release-owned and now stale from this epic (`SPEC.md`, `ft-task`, `ft-micro-task`, `model.md`, `plan-filing.md` rows) and from [[CORE-EPIC-603]] (skill list still names retired `ft-stats` and folded `ft-audit-context`); §"Always loaded" omits `claude/commands/ft-task.md` though the sum line counts it | See §E Q2 |
| F4 | Info | `SPEC/plan-filing.md` (15.8k) is on the default path only because the template's Closed line cites §"`## Completed` archive convention" while `SPEC.md` §"🚀 Phase 4: Closure" states the placement rule inline — the single largest remaining flagless load the epic did not touch | See §E Q3 |
| F5 | None | `SPEC/procedures/ft-task.md` keeps per-step unattended clauses (`.3` deferred it) — correct by design: the SOP is the self-contained runner for skill-less agents and never loads `unattended-mode.md`; its `last-verified: v5.27.0` stamp is the release's SOP-currency check to flag | No change |
| F6 | None | Parent-flip ownership: precedents closed via `/ft-close-epic` Step 8; this run is `/ft-task` | See §E Q1 |

### E. Resolved scoping (AskUserQuestion, 2026-09-18)

| Question | Decision |
|---|---|
| Q1 — parent-flip under `/ft-task` (F6) | **Bundle the flip here.** Finish under this runner; at the 📦 gate ask Yes/No exactly as `/ft-close-epic` Step 8 would; on Yes flip `CORE-EPIC-604` to stub form and move parent + five children atomically to the top of `## Completed` in the same closure commit. The bundled prompt makes Step 6 a fire branch regardless of signals. |
| Q2 — `CONTEXT-BUDGET` always-loaded stub row (F3) | **Leave for the release refresh.** F3 recorded here only; `/ft-release` §7.1 owns every ledger row and the v5.28.0 stamp stays honest. |
| Q3 — `plan-filing.md` default-path load (F4) | **File a `[light]` follow-up** as a standalone `## Medium` row (the parent flips in this commit, so a numeric `.5` child would re-open it): `CORE-605`, next free ID. |

Assumptions asserted: F1 and F2 are audit-fix-inline class (one clause / one wikilink each), not follow-ups; no ledger number is touched; the epic's four commits stay unpushed until the operator pushes.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the epic-audit shape of [[CORE-603.N]] / [[CORE-598.N]] (findings table, inline fix for Low doc drift, follow-up filed for out-of-scope misses) and the audit's standalone-row filing pattern (`Surfaced by <audit> (F#)` suffix, as the CORE-602 / FE-117 rows use). No new shape

- [x] **Minimal refactor gate** — `N/A` — two one-clause doc fixes and one PLAN.md row; nothing refactored, nothing adjacent touched (the stale ledger rows, F3, deliberately left to the release per §E)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A` — no executable surface; the instruments in Discovery §B–C are one-off receipts, not standing checks (`SPEC/scope-boundaries.md`)

**Implementation Notes:**

- **F1** `docs/DOGFOOD.md:40-41` — Step 1 item 4 now reads "the gate machinery (the operator-cue inventory itself lives in `SPEC/cue-vocabulary.md`)". Step 2's own inline cue list and its `SPEC/cue-vocabulary.md` citation were already correct; no read was added to the dogfood procedure.
- **F2** `docs/CONTEXT-BUDGET.md:88` — `[[CORE-604]]` → `[[CORE-EPIC-604]]`.
- **F4** `.flowtron/PLAN.md` — `CORE-605` `[light]` `| plan-filing-off-default-path` filed as the only row under `## Medium`, 49 words after the separator. `[unattended]` candidacy (`SPEC/unattended-candidacy.md` §"Candidacy predicate"): clauses 1–6 all hold (`[light]`, no `[!critical]`, no keyword trip, no `Blocked by`, standalone) → **candidate**; attended filing, so the proposal rides the 📦 gate's bundled prompt rather than being written here.
- Downstream-impact scan: no direction-changing decision — the fixes are doc-local and the follow-up is a filing, not a contract change; the open sections held nothing else.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` — markdown only; `viz/` and `tools/` untouched

- [x] Ran lint/type-check on changed code — `N/A` — no markdown linter configured; trailing-whitespace grep below

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A` — no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
wc -c <nine default-path surfaces>                              → 147,896 (139,621 excl. PLAN.md)
grep -q '139,621' docs/CONTEXT-BUDGET.md                        → 0
citation validator, 629 cites, non-archive                      → 0 genuine dangling (29 artifacts)
deleted-sentence classifier, 075530a..HEAD, 9 surfaces          → 311 / 39 no-home / 3 classes
CI drift job, 10 steps extracted from ci.yml, bash              → 10 PASS
Pair I / K1 / K2 (release-only)                                 → print nothing
grep -c 'full operator-cue' docs/DOGFOOD.md                     → 0   (output 1)
grep -c '\[\[CORE-604\]\]' docs/CONTEXT-BUDGET.md               → 1   (output 0 — grep's no-match)
grep -q '\[\[CORE-EPIC-604\]\]' docs/CONTEXT-BUDGET.md          → 0
grep -q '**CORE-605**' .flowtron/PLAN.md                        → 0
wc -w on the CORE-605 description                               → 49 (≤ 50 target)
grep -n ' $' <4 touched files>                                  → 1   (no trailing whitespace)
```

Structural quality assertions: no duplication (each fix is a single sentence at its one home); no dead text; no public-surface growth; no stale code-facing documentation introduced — the release-owned ledger rows (F3) are recorded, not half-refreshed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  `README.md` no change (roster names `gate-postures`, checked) · `AGENTS.md` no change (`SPEC/` roster says "flag postures", checked) · `SPEC.md` no change (§"Model field" ladder, §"Operator-gate cues" four-module list, Phase 4 Closed line all current) · `docs/MIGRATION.md` no change (rotation figure 60, checked) · `claude/AGENTS-snippet.md` no change (posture cite → `gate-postures.md`, checked) · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change (none cites a moved section) · `docs/CONVENTIONS.md` no change (labeled-mirror roster names `gate-postures.md`) · `CONTRIBUTING.md` no change · `SECURITY.md` no change (cites `gates.md` sections that stayed) · `docs/AGENT-NEUTRALITY.md` no change (8 / 9 recount and the `model.md` row note are `.2` / `.3`'s) · `docs/PLATFORMS.md` no change (calibration table present, outside Pair I's range) · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change (posture cites → `gate-postures.md`; rotation wording is `.4`'s) · `docs/WORKTREES.md` no change · `docs/VISION.md` no change (labeled-mirror roster names `gate-postures.md`; K1 / K2 pass). Off-list but edited: `docs/DOGFOOD.md` (F1), `docs/CONTEXT-BUDGET.md` (F2 — deliberately not on the sweep list per its own §"Not on the doc-drift sweep list").

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/plan-filing.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Audited the closed `CORE-EPIC-604` cohort as one change. The flagless
`/ft-task <ID>.<sub>` cold start on this repo now reads 147,896 chars
(≈ 37k tokens) of flowtron-owned surfaces, down from 172,486 (≈ 43k) at
v5.28.0 — a 14% cut — with the flowtron-shipped subset matching the
`docs/CONTEXT-BUDGET.md` ledger row byte-for-byte. `.1`'s ≈ 129k projection
was not met, and the audit names why rather than restating it: `SPEC/plan-filing.md`
(15.8k) still loads on every closure through the template's Closed-line
citation, the `gates.md` stubs and `SPEC.md` ladder deliberately kept ≈ 3k,
and nothing was lost — the [[CORE-558.2]] / [[CORE-558.4]] instruments over the
whole epic diff return 0 dangling citations (629 checked) and 39 no-home
deleted lines that are all repoints, operator-decided rewrites, or the one
deliberate `haiku` drop. The CI `drift` job's ten steps pass locally against
the four unpushed epic commits, as do release pairs I / K1 / K2 and the
context-budget ratchet on every budgeted surface. Two Low doc-drift findings
fixed inline (`docs/DOGFOOD.md` still crediting `gates.md` with the cue
vocabulary; a `[[CORE-604]]` wikilink to a nonexistent ID), the largest
remaining default-path load filed as `CORE-605`, and the release-owned
ledger staleness (this epic's rows plus [[CORE-EPIC-603]]'s retired skills)
recorded for `/ft-release` §7.1 rather than half-refreshed.

- Files: `docs/DOGFOOD.md` (1 clause), `docs/CONTEXT-BUDGET.md` (1 wikilink), `.flowtron/PLAN.md` (`CORE-605` row + `.N` stub flip + parent flip / cohort move on operator Yes), this tasknote (scaffolded → archived).
- Verification: receipts above — validator 629 / 0, classifier 311 / 39 / 3 classes, CI drift 10 / 10, Pairs I / K1 / K2 clean, budget block 0, cold-start sum reconciles to the ledger.
- Refactors: none. Findings F3 (ledger rows) and F5 (SOP per-step clauses, correct by design) recorded with no change.
- Documentation verdict: 19 swept docs "no change"; 2 off-list docs fixed.
- `touches:` reconciliation: declared `docs/DOGFOOD.md`, `docs/CONTEXT-BUDGET.md`, `.flowtron/PLAN.md` — `git diff --name-only` matches; undeclared: none (the tasknote itself is workflow).
- Maintainability effect: the epic's three fidelity guards held under an epic-wide re-check, so the shape (stub-with-trigger, cite-don't-restate, ledger-not-budget) is safe to repeat on `CORE-605`; the projection-vs-realized gap is now a written number with a written cause instead of an oral "it should be smaller by now."

> **Parent-flip decision:** operator confirmed **Yes** at the 📦 gate — `CORE-EPIC-604` flipped to stub form and the parent + five children moved atomically to the top of `## Completed` (2026-09-18); `## High` is now empty. `[unattended]` on `CORE-605`: operator declined (contract surfaces, attended run). `## Completed` now holds 63 rows — the Step 1 advisory (> 60) will fire on the next run; rotation is the operator's motion.

**Archived:** 2026-09-18
