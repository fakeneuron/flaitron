---
title: spec-md-fidelity
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-EPIC-558, CORE-558.1, CORE-535.3, CORE-551, CORE-555, CORE-557]
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

# CORE-558.2 | spec-md-fidelity

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-558]]

## 🎯 Goal

Restore any load-bearing process `SPEC.md` lost or made ambiguous in [[CORE-535.3]]'s lazy split, and confirm every extracted section still has a reachable, unambiguous `SPEC/` home — merged to current (post-`--unattended`) truth, not reverted.

## ✅ Acceptance

- [x] Every always-loaded step in `SPEC.md` is either stated in `SPEC.md` or has a named, reachable `SPEC/` home — verified by diff against pre-`CORE-535.3` (`1fbc7a3`), with each unrelocated line classified relocated / reworded / restored
- [x] No dangling section citations left by the lazy split — every `[`file`](path) §"Section"` in `SPEC.md` resolves to an existing file AND an existing heading string in that file
- [x] The deferred-hand-off `--unattended` discharge path named by [[CORE-551]] is still present and unambiguous in `SPEC.md`
- [x] [[CORE-557]]'s surface (`SPEC.md` §"🧪 Phase 3: Testing & Linting") is untouched by this task
- [x] Byte delta measured and handed to [[CORE-558.5]] (raise needed, or still under the 55,000 cap)

## 🧩 Subtasks

- [x] Diff `SPEC.md` at HEAD against `1fbc7a3:SPEC.md`; mechanically classify every substantive deleted line as relocated to a `SPEC/` module, reworded in place, or unrelocated
- [x] Pointer-check the six `CORE-535.3` extraction homes (`plan-parser` · `layout` · `scope-boundaries` · `tasknote-inserts` · `purpose-blurb` · `superseded-claims`) — file exists, section string exists, trigger prose adequate
- [x] Confirm post-shrink features intact: `[unattended]` row marker, `--unattended` posture, [[CORE-551]] discharge path, [[CORE-552]] refusal
- [x] Phase 2: restore the operative body of `## Cross-repo edit remit` (the file-it-there rule)
- [x] Phase 2: restore an orienting definition to `## Loop tasks` so the shape is recognizable without loading `SPEC/loop.md`
- [x] Phase 2: restore the omission list to `## What flowtron does NOT provide` (anti-scope-creep guardrail)
- [x] Phase 3: re-run the link + section-citation validator; re-measure `wc -c SPEC.md`
- [x] Phase 4: doc-drift sweep + PLAN.md stub flip + archive

## 🔗 Related

- [[CORE-EPIC-558]] — parent epic (`post-shrink-fidelity`)
- [[CORE-558.1]] — epic Discovery that scoped this child (Deep Pre-pass Q1–Q5 settle the method)
- [[CORE-535.3]] — the shrink under review: ten `SPEC.md` sections into six lazy modules
- [[CORE-551]] — post-shrink feature to preserve: `--unattended` filing authority / deferred hand-off discharge path
- [[CORE-555]] — precedent authorizing growth: instruction clarity outranks byte discipline
- [[CORE-557]] — live sibling owning `SPEC.md` §"🧪 Phase 3"; `related-decision:` — do not pre-empt
- [[CORE-558.5]] — follow-up consuming this task's byte delta

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The diff against `1fbc7a3` is decisive: 561 lines removed, 108 substantive lines with no verbatim home in today's `SPEC.md` + `SPEC/**`. Classification puts all but three clusters in "relocated" or "reworded"; three sections (`Cross-repo edit remit` · `Loop tasks` · `What flowtron does NOT provide`) were reduced to bare pointers with zero always-loaded substance and are genuine fidelity loss. Scope matches the PLAN line exactly; no re-scope needed.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A` — markdown contract prose, no code module boundaries. The one boundary that governs is already locked and was re-verified: cite-don't-restate ([[CORE-535.4]]) — restores here go into `SPEC.md` itself, never as paste-back into skill bodies.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Method

Diffed `SPEC.md` at HEAD (49,285 chars) against `1fbc7a3:SPEC.md` (78,119 chars — parent of [[CORE-535.3]]). 561 lines deleted or replaced. Each substantive deleted line (normalized whitespace, >25 chars) was tested for a verbatim home across today's `SPEC.md` + every `SPEC/**.md`; **108 lines** had none. Those 108 were then read in context and classified by hand — a missing verbatim match means "moved and reworded" far more often than "lost".

### B. Classification of the 108 unrelocated lines

| Cluster | Pre-shrink lines | Verdict |
|---|---|---|
| Layout / working-in-flowtron / lazy-module frontmatter / procedure SOPs / skill namespace | 48–137 | **Relocated verbatim** → `SPEC/layout.md` (all five sub-parts present, links rewritten relative). Keep. |
| `[unattended]` row-marker table entry | 185 | **Reworded and improved** — present at `SPEC.md:80`; [[CORE-551]] added the implies-`--fast` sentence the pre-shrink row lacked. Keep. |
| `viz/src/parser.ts` canonical-reference note | 208–210 | **Relocated** → `SPEC/plan-parser.md:16`; `SPEC.md:104` carries the trigger prose. Keep. |
| `### Long-description conventions` | 303–336 | **Relocated** → `SPEC/plan-parser.md:111`; cited by three skill bodies. Keep. |
| Task-line rewrite authority (Re-scope / retag / stub flip) | 253–268 | **Reworded in place** — `SPEC.md:97` + `:386` carry the bracket-token-verbatim rule. Keep. |
| Superseded-claim policy | 371–395 | **Relocated** → `SPEC/superseded-claims.md`; pointer at `SPEC.md:132`, and the `supersedes:` frontmatter row survives at `:156`. Keep. |
| `### 🌳 Fan-out (optional)` / `### 🔄 Handoff (optional)` bodies | 520–676 | **Relocated** → `SPEC/tasknote-inserts.md`; pointer at `SPEC.md:330-333`, and the body-shape block still annotates each insert's trigger inline. Keep. |
| Two-banner-cap paragraph + gate-contract pointer | 685–702 | **Reworded and expanded** — `SPEC.md:339-364` states the cap, the destructive one-off exception, and splits the pointer across all three gate modules. Keep. |
| `### Operator-cue glossary` table | 704–730 | **Deliberately deleted duplicate** ([[CORE-535.3]]) → `SPEC/cue-vocabulary.md`. Every glyph an always-loaded step actually emits is still defined at its emission site (👁️ at `:493`, 🟢/📦/🏁/🔍/👇 + the tier glyphs across §"Post-closure protocol", 🗄️/▶️/📡/💻 and ✋ `ACTION` in the `park-reason` table at `:198-199`). Keep the deletion. |
| Purpose-blurb glyph-layer note | 781–785 | **Relocated** → `SPEC/purpose-blurb.md`; `SPEC.md:366-372` keeps a two-sentence in-place summary. Keep. |
| Phase 3 👁️ emphasis + `--fast` / `--unattended` interaction | 918–931 | **Reworded in place** at `SPEC.md:497-503`, routed to `cue-vocabulary.md` §"Emphasized inline ask shape" and `gates.md` §"Flag precedence and surface matrix". Intact — **and owned by live sibling [[CORE-557]]. Do not touch.** |
| Phase 4 standalone-vs-epic-child placement | 946–949 | **Reworded in place** at `SPEC.md:508`. Keep. |
| `## Cross-repo edit remit` body | 1030–1049 | **LOST** — see §C.1. |
| `## Loop tasks` body | 1052–1062 | **LOST** — see §C.2. |
| `## What flowtron does NOT provide` body + `### PR / suggestion archetypes` | 1213–1246 | **LOST (partial)** — see §C.3. |
| Post-closure 🟢 accepted replies / never-emit-`/clear` | 1076, 1110 | **Reworded in place** at `SPEC.md:622` and `:656`; pointers retargeted to `cue-vocabulary.md` / `layout.md`. Keep. |

### C. Restores (three)

Each was a section with real always-loaded body pre-shrink that [[CORE-535.3]] reduced to a bare `Canonical contract: see X.` stub. The stub pattern itself is fine and pre-dates the shrink — `## Blocked tasks`, `## Starter tasknotes`, `## Epic lifecycle`, `## Model field`, `## Versioning` were *already* bare pointers at `1fbc7a3`. These three were not; they were converted.

1. **`## Cross-repo edit remit`** (20 lines → 4). The operative rule — Discovery surfacing out-of-repo work **files it there** rather than editing it directly — is the highest-value loss in the diff. It is a behavioral boundary that fires *mid-Phase-1*, at a moment when nothing has triggered a load of `SPEC/scope-boundaries.md`; a bare heading gives the agent no reason to suspect a rule exists before it has already broken it. Restore the rule and the symmetry sentence; leave the CORE-483.3 exception in the module.

2. **`## Loop tasks`** (16 lines → 4). No definition of the shape survives in always-loaded text. Lower blast radius than §C.1 (loop tasks are entered through `/ft-goal-task`, which loads `SPEC/loop.md` itself), but an agent cannot recognize it is *in* a shape it has never been shown. Restore one orienting paragraph, including the ships-the-contract-not-the-runtime line that doubles as scope defence.

3. **`## What flowtron does NOT provide`** (47 lines → 4). The omission list is the anti-scope-creep guardrail, and it is consulted exactly when an agent is *considering* adding a validator, a CLI, or a query API — a moment with no natural "go load a module" trigger. Restore the compact list plus the two carve-outs it names (`tools/update-adopters.mjs`, the visualizer), which other always-loaded prose in `SPEC/layout.md` already cross-references. Leave the PR-archetype expansion in `SPEC/scope-boundaries.md`.

### D. Pointer-check of the six CORE-535.3 homes (Acceptance #2)

Ran a mechanical validator over `SPEC.md`: every markdown link target resolves on disk (sole miss is `../PLAN.md`, which is inside the tasknote-body-shape example fence — correct as written), and **all 17** `§"Section"` citations name a file *and* match an existing heading string in that file. Zero dangling citations.

| Module | `SPEC.md` pointer | Trigger prose adequate? |
|---|---|---|
| `plan-parser.md` | `:102-104` | Yes — names tolerances, footguns, long-desc conventions |
| `layout.md` | `:28-31` | Yes — names all five sub-parts |
| `scope-boundaries.md` | `:606`, `:761` | **No** — both are bare stubs; fixed by restores §C.1 + §C.3 |
| `tasknote-inserts.md` | `:330-333` | Yes — body-shape block annotates each insert's trigger |
| `purpose-blurb.md` | `:366-372` | Yes — two-sentence in-place summary |
| `superseded-claims.md` | `:132` | Yes — sits inside the frontmatter contract it qualifies |

Per Q2, extracted modules are in-scope only where a pointer is broken. None is broken; the two `scope-boundaries.md` pointers were under-triggered, which the restores fix on the `SPEC.md` side. **No `SPEC/` module is edited by this task.**

### E. Post-shrink features confirmed intact

- `[unattended]` row marker: `SPEC.md:66,69,71,80,89` — grammar, ordering rule, table row, worked example.
- `--unattended` posture: `park-reason` enum at `:196-218`, gate-module pointer at `:355-359`.
- [[CORE-551]] deferred-hand-off discharge path: `SPEC.md:545-553` — present and unambiguous, naming `/ft-file-followup --unattended` and its `tasknote-selection.md` §"Filing commits" home.
- [[CORE-552]] `/ft-epic-discovery` refusal: lives in `SPEC/gates.md`, out of this child's surface — [[CORE-558.3]] owns it.

### F. Drift check

- PLAN.md line, `1fbc7a3` SHA, and the 49,285 measurement all match HEAD.
- No SPEC contradiction: [[CORE-555]] already established that instruction clarity outranks byte discipline and recast the caps as operating ceilings.
- No divergence from the PLAN line: it scopes exactly "restore missing or ambiguous always-loaded process; pointer-check 535.3 homes."
- **[[CORE-557]] guard honored** — `SPEC.md` §"🧪 Phase 3: Testing & Linting" was inspected and found intact, so it needs no restore and this task will not edit it.
- Budget headroom: 49,285 of 55,000. The three restores are ~1.6k, landing near 50.9k — comfortably under. Hand to [[CORE-558.5]] as "no raise needed from `.2`".

### G. Clarifications

**No clarifications needed.** The Deep Pre-pass Q1–Q5 on [[CORE-558.1]] already settled baseline (both), surface (`SPEC.md` + pointer-check), restore style (merge to current truth), and the out-of-scope set. Explicit assumptions carried forward:

- Pre-shrink text is **evidence, not source of truth** — restores are written in today's vocabulary, not pasted back.
- A section that was *already* a bare pointer at `1fbc7a3` is not a regression and is left alone.
- "Ambiguous" is judged as: could an agent following only always-loaded text take the wrong action at the moment the rule applies? That is why §C.1 ranks above §C.2.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A` (markdown contract prose; no executable surface). The mechanical link + section-citation validator in Phase 3 is the standing check.

**Implementation Notes:**

Three sections restored in `SPEC.md`, +39 lines / −1, 49,285 → 51,566 chars (cap 55,000).

- **`## Cross-repo edit remit`** — restored the operative rule in one paragraph (file it in the target repo; that repo's own cycle executes it) plus the symmetry sentence naming the `CORE-` routing convention adopters already run in the other direction. The `CORE-483.3` precedent exception stays in `SPEC/scope-boundaries.md`; the stub line was retargeted to name it, so the pointer now carries a trigger instead of being bare.
- **`## Loop tasks`** — restored the shape definition (Phase 2 → Phase 3 repeats against fixed Acceptance until met / budget exhausted / relevance gate stops) and the ships-the-contract-not-the-runtime boundary, which doubles as scope defence against a loop scheduler.
- **`## What flowtron does NOT provide`** — restored the five-bullet omission list compacted to today's vocabulary, with both carve-outs (`tools/update-adopters.mjs`, the read-only visualizer) and the singular-exception-not-precedent framing. The PR-archetype expansion stays in `SPEC/scope-boundaries.md`.

**Pattern survey.** Extended the existing `SPEC.md` shape rather than inventing one: sections that keep always-loaded substance and *also* delegate close with a `Canonical contract: see [module].` line (§"🎯 Purpose blurb", §"Task ID convention" → `SPEC/epic.md`, §"Task-line format" → `SPEC/plan-parser.md` all do this). All three restores follow it, so no section grew a new structural idiom.

**Minimal refactor gate.** No `SPEC/` module edited — Q2 restricts this child to `SPEC.md` unless a pointer is broken, and the Phase 1 validator found none broken. No skill body edited (cite-don't-restate, [[CORE-535.4]]). Sections that were *already* bare pointers before the shrink were deliberately left alone; converting them would be new work, not restoration.

**Downstream-impact reconciliation:** scan run — one active sibling shares the file, [[CORE-557]] (`SPEC.md` §"🧪 Phase 3"). Class: **Unaffected / Leave** — the diff hunks are at lines 606 / 621 / 783, all after Phase 3 at :468-503, and `git diff` confirms no Phase 3 line changed. [[CORE-558.3]]–[[CORE-558.5]] are downstream children of the same epic and are informed rather than reconciled: `.3` inherits an unchanged `SPEC/gates.md`, `.5` inherits the measured delta below. No reconcile edit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — mechanical validator over `SPEC.md`: every markdown link target resolves on disk, and all 17 `§"Section"` citations name a file whose body contains that heading string. **0 missing targets, 0 dangling citations.**

- [x] Ran lint/type-check on changed code — `.editorconfig` conformance on `SPEC.md`: no trailing whitespace, LF endings, final newline present. No JS/TS changed, so `npm --prefix viz` and `node --test tools/` are not in scope.

- [x] **Quality assertions** — restored prose is compacted, not pasted: the omission list drops the pre-shrink parenthetical repetition that `SPEC/scope-boundaries.md` still carries in full, so the always-loaded copy is a summary and the module stays canonical — no duplicated authority. No dead pointers, no public-surface growth (three existing headings gained bodies; none added). Checked against `SPEC/scope-boundaries.md` for contradiction: same five bullets, same two carve-outs, same closing instruction. — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — `N/A` (no UI surface; markdown contract only)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

`git diff --stat` → `SPEC.md | 40 +++-`, 1 file changed, 39 insertions, 1 deletion. Hunks at `@@ -606`, `@@ -609,0 +621`, `@@ -760,0 +783` — the three target sections and nothing else. `grep -c "🧪 Phase 3"` unchanged at 2 before and after; the only "Phase 3" string in the diff is inside the restored Loop-tasks paragraph, which describes the loop cycle rather than editing the section. [[CORE-557]] guard clean.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  `README.md` · `AGENTS.md` · `docs/MIGRATION.md` · `claude/AGENTS-snippet.md` · `codex/AGENTS-snippet.md` · `cursor/AGENTS-snippet.md` · `grok/AGENTS-snippet.md` · `docs/CONVENTIONS.md` · `CONTRIBUTING.md` · `SECURITY.md` · `docs/AGENT-NEUTRALITY.md` · `docs/PLATFORMS.md` · `claude/CAPABILITIES.md` · `docs/AGENT-COMPAT.md` · `docs/EXTERNAL-AGENTS.md` · `docs/WORKTREES.md` — **no change** (this task restored text into `SPEC.md` that these docs never mirrored; no contract semantics changed).

  `SPEC.md` — **changed**, and it is the deliverable: three sections regained always-loaded bodies. No other doc restates them.

  `docs/VISION.md` — **no change**, checked deliberately. It is mirrored by `SPEC/scope-boundaries.md` §"What flowtron does NOT provide", which is unedited; the always-loaded summary restored into `SPEC.md` is a compaction of that same list with no new claim, so the mirror relationship is unchanged.

  Out-of-sweep note for [[CORE-558.5]]: `docs/CONTEXT-BUDGET.md` measures `SPEC.md` at 49,285 and it is now **51,566** against a 55,000 cap. Still under — no ceiling raise needed from this child — but the ledger number is stale until `.5` refreshes it.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Reviewed `SPEC.md` for process lost in [[CORE-535.3]]'s lazy split and restored the three sections that actually lost contract. The shrink held far better than the raw numbers suggest: of 561 deleted lines, 108 had no verbatim home in today's `SPEC.md` + `SPEC/**`, and hand-classifying those 108 put all but three clusters in "relocated to a module" or "reworded in place" — several, notably the `[unattended]` row-marker row, are *better* now than pre-shrink because [[CORE-551]] improved them afterward.

The three genuine losses share a shape worth recording: each was a section with a real body at `1fbc7a3` that the shrink converted to a bare `Canonical contract: see X.` stub. The stub pattern itself is fine and pre-dates the shrink — `## Blocked tasks`, `## Starter tasknotes`, `## Epic lifecycle`, `## Model field` and `## Versioning` were already bare pointers before it — but those five name a *noun an agent is already looking for*, while §"Cross-repo edit remit", §"Loop tasks" and §"What flowtron does NOT provide" state *rules that fire unprompted*. A rule with no always-loaded trace has no trigger to load its module: the agent reaches the moment the rule applies with nothing telling it a rule exists. §"Cross-repo edit remit" was the sharpest case — it fires mid-Phase-1, and an agent editing another repo has already crossed the boundary by the time it could think to look.

Technical: `SPEC.md` +39/−1 lines, 49,285 → 51,566 chars (cap 55,000, no raise needed). Restored §"Cross-repo edit remit" (file-it-there rule + routing symmetry), §"Loop tasks" (cycle definition + ships-the-contract-not-the-runtime boundary), §"What flowtron does NOT provide" (five-bullet omission list + both carve-outs). Verification: link/citation validator over `SPEC.md` — 0 missing link targets, 0 dangling `§"Section"` citations across all 17. Pointer-checked all six [[CORE-535.3]] extraction homes: none broken, so **no `SPEC/` module was edited**, per Q2. Post-shrink features re-confirmed present: `[unattended]` grammar + table row, `--unattended` `park-reason` enum, [[CORE-551]]'s `/ft-file-followup --unattended` discharge path. [[CORE-557]]'s §"🧪 Phase 3" inspected, found intact, and left untouched — diff hunks confirm it. Doc-drift: 18/18 swept, `SPEC.md` the only change; `docs/CONTEXT-BUDGET.md` ledger number handed to [[CORE-558.5]] as stale.

**Archived:** 2026-09-10
