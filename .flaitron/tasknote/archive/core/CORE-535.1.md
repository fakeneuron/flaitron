---
title: context-load-diet discovery
status: completed
tags: []
created: 2026-09-06
due:
related-tasks: [CORE-EPIC-535, CORE-037, CORE-049, CORE-EPIC-223, CORE-507]
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

# CORE-535.1 | context-load-diet discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-535]]

## 🎯 Goal

Scope the `CORE-EPIC-535` epic (`context-load-diet`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-535.2..5` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (always-loaded + lazy surfaces with byte/token measurements, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-535.2 .. CORE-535.5 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-535.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (always-loaded vs lazy files with sizes, per-skill Step 0 load sets, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flowtron/tasknote/archive/core/ for relevant precedents (CORE-037, CORE-049, CORE-EPIC-223, CORE-507) — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (per-child shortname + scope + budget numbers + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-535.2 .. CORE-535.5; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-535 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-535]] — parent epic
- [[CORE-037]] — predecessor: first workflow token-cost audit (2026-05-05); method + "load-bearing for X doesn't mean live in Y"
- [[CORE-049]] — predecessor: second token audit; cite-don't-restate sweep across skills
- [[CORE-EPIC-223]] — predecessor: SPEC.md lazy-module split at the ~40k cap (SPEC.md → ~25k)
- [[CORE-507]] — precedent: ft-release SKILL.md split 77k → 38k; extraction pattern for 30–40k band

## 🌳 Fan-out

- **Sequential:** [[CORE-535.3]] after [[CORE-535.2]] · [[CORE-535.4]] after [[CORE-535.3]] · [[CORE-535.5]] after [[CORE-535.4]]
- **Synthesis:** [[CORE-535.N]]

---

# CORE-535.1 | context-load-diet discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-535]]

## 🎯 Goal

One-sentence goal of what this task accomplishes.

## ✅ Acceptance

- [ ] Criterion 1
- [ ] Criterion 2

## 🧩 Subtasks

- [ ] Step 1
- [ ] Step 2

## 🔗 Related

- [[TASK-ID]] — short context (predecessor / follow-up / parent epic; type-hint `blocked-by:` / `parallel-safe-with:` / `supersedes:` / `depends-on:` / `related-decision:` when the edge is set)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-epic-discovery` with a brief asking whether ~7% (~70k tokens) of context at task start is normal and whether flowtron's setup is tight. Measurement (below) shows flowtron-owned surfaces are roughly half that load and have regressed against the ~40k SPEC.md cap CORE-EPIC-223 targeted (SPEC.md 28k→77k chars since v5.0.0; gates.md 19k→52k). The operator offered a "push back and proceed as-is" exit; declined on the evidence.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A` (markdown contract + skill prose; no code module boundaries). Best-practice review of *context management* is the epic's subject and is captured in Discovery Notes §D instead. — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Measured surfaces (bytes at HEAD, v5.24.0; tokens ≈ chars/4)

Always-loaded on `/ft-task` (flowtron self-host):

| Surface | Bytes | ≈Tokens | v5.0.0 | v5.10.0 | v5.20.0 |
|---|---|---|---|---|---|
| `SPEC.md` | 77,322 | ~19k | 28,420 | 36,121 | 67,524 |
| `claude/skills/ft-task/SKILL.md` | 33,944 | ~8.5k | — | — | — |
| `templates/tasknote-template.md` | 4,820 | ~1.2k | | | |
| `.flowtron/tasknote/README.md` | 6,540 | ~1.6k | | | |
| `.flowtron/PLAN.md` | 1,190 (post-rotation) | ~0.3k | | | |

Loaded on the first gate / edge case (effectively per-task):

| Surface | Bytes | ≈Tokens | v5.0.0 | v5.20.0 |
|---|---|---|---|---|
| `SPEC/gates.md` | 51,812 | ~13k | 18,776 | 44,687 |
| `SPEC/tasknote-selection.md` | 24,468 | ~6k | 7,627 | 24,018 |
| `SPEC/model.md` | 18,681 | ~4.7k | | |
| `SPEC/epic.md` (epic IDs only) | 6,062 | ~1.5k | | |

SPEC.md largest H2s: "The 4-phase workflow" 22.6k · "Task-line format" 10.9k · "Tasknote frontmatter" 9.3k · "Post-closure protocol" 7.1k · "Phase 4: Closure" 4.3k · "What flowtron does NOT provide" 3.7k · "Working in the flowtron repo itself" 3.6k.
gates.md largest H2s: "Operator-cue vocabulary" 16.9k · "`--unattended` operator posture" 11.5k · "Rationalizations" 7.5k · "Operator-gate cues" 4.4k.

Skill bodies (top): ft-release 37.3k (post-CORE-507) · ft-task 33.9k · ft-epic-discovery 28.2k · ft-close-epic 26.9k · ft-goal-task 26.2k · ft-audit 21.7k · ft-micro-task 21.2k. All 19 skills total 333k.

Adopter-side always-loaded: `claude/AGENTS-snippet.md` 14.4k (pasted into adopter AGENTS.md) + `templates/tasknote-README.md` 4.3k + `templates/PLAN.md` 2.7k.

Harness baseline outside flowtron's remit (estimate ~30k tokens): tool schemas, plugin skill roster (Cloudflare plugin adds ~15 entries), MCP tool lists, three CLAUDE.md layers (the global port registry alone ≈3.5k tokens), memory index. Flowtron cannot trim this; the epic notes it so the operator can act separately.

**Answer to the brief:** 7% of a 1M window ≈ 70k tokens; ~35-40k of it is flowtron-owned and about half of *that* is regrowth since the CORE-EPIC-223 split. Not tight; proceed.

### B. Archive skim (load-bearing precedents)

- [[CORE-037]] (2026-05-05) — first token-cost audit; method = word-count + bytes/4 heuristic, section-level depth, propose-then-file. Lesson: "load-bearing for X doesn't mean live in Y" (context can move to starters / lazy modules).
- [[CORE-038]] / [[CORE-039]] — cite-don't-restate on task SKILL.md (−503w) and SPEC prose tightening (−596w). Both eroded since: ft-task SKILL.md is now 34k chars.
- [[CORE-049]] (2026-05-08) — second audit; filed CORE-050/051/052 trims. Ruled SPEC.md "round 3" diminishing returns at ~3.2k words — SPEC.md is now ~4× that.
- [[CORE-EPIC-223]] (2026-05-30) — SPEC.md at 39.9k hit the ~40k cap → split gates.md + tasknote-selection.md, projecting SPEC.md ≈24.7k. Actual today: 77.3k. **No budget was written into the contract or release gate, so the split had no ratchet.**
- [[CORE-507]] (2026-08-30) — ft-release SKILL.md 77k→38k via verbatim fragment extraction + parallel-Read dispatch (CORE-042.9 shape). Its Step 2.5 note observes the fragments "still arrive, just later" — i.e. splitting defers load, it does not remove it. [[CORE-508]] applied the same to the 30–40k band.
- [[CORE-390]] — `/ft-debug` folded into `ft-task --debug` lazy fragment (149-line skill → 67-line fragment); establishes fragment-fold as the preferred shape over sibling skills.
- [[CORE-382]] — context economy deliberately *demoted* from the pitch to a mechanism (Core Principle #3 is "one task per context window", not "small context"). Any new budget language must sit under #3 as mechanism, not become a new principle.
- ft-audit-context SKILL.md carries the only numeric threshold in the repo: ">40,000 chars → High (assistant context truncated)". The truncation claim is being verified against Claude Code docs during this Discovery (see §D); if it is not a real hard limit the threshold should be restated as a budget, not a truncation warning.

### C. Drift check

- All paths cited in the brief and in §A exist at HEAD (`wc -c` run 2026-09-06). Line counts are under the Read tool's 2000-line default (SPEC.md 1,237; gates.md 740), so no silent truncation on Read today.
- `.flowtron/PLAN.md` was rotated (CORE-534 era); open sections were empty at filing — no downstream-impact scan targets exist.
- Core Principle #2 "Zero scripts" — a byte-budget check must be a `wc -c` line in `/ft-release`'s standing checks (`claude/skills/ft-release/step-7.1-standing-checks.md`), not a new tool. `tools/` scripts are operator-side fleet tooling, a separate carve-out.
- Correction to a number surfaced in-conversation: 18 of the last 30 commits touch SPEC/skills/docs (not 22).


### D. Best-practice check against Claude Code docs (claude-code-guide, 2026-09-06)

- **The "~40,000-char truncation" claim is not a documented limit.** Docs: CLAUDE.md loads in full up to 4 MiB; guidance is *under ~200 lines* for adherence, not a byte cliff. Auto-memory caps at 200 lines / 25 KB. Read tool default is 2,000 lines. No SKILL.md line cap is documented. → `ft-audit-context` §Bloat's ">40k = truncated" wording is **drift**; restate as an adherence/attention budget.
- **Documented lean-context practices flowtron does not yet use or name:**
  - `.claude/rules/` path-scoped rules (`paths:` frontmatter) — load only when matching files are read. Candidate home for viz-only and tools-only guidance now inline in AGENTS.md / CLAUDE.md.
  - Skill-level progressive disclosure: SKILL.md small, supporting files loaded on demand — flowtron does this via fragments (CORE-042.9 shape) but SPEC.md is still an eager 77k monolith cited "always loaded core" by every lifecycle skill.
  - Subagent research to keep exploration out of the main window — flowtron has `templates/subagent-probe-template.md` and the Phase 1 "consider a probe" line; the archive skim (`grep -l` + read hits) is the largest un-probed read in Phase 1.
  - `/compact` custom instructions, `/btw`, `/clear` between tasks — operator-side; `/clear` is already the post-closure convention.
  - `skillListingBudgetFraction` + deferred MCP tool schemas — harness-side; the ~30k baseline is mostly tool schemas + plugin skill roster, outside flowtron's remit.
- **Practices flowtron already follows:** one task per context window (#3), lazy SPEC modules, fragment folds, `/clear` at closure, PLAN.md `## Completed` rotation (CORE-534 era), starter tasknotes to keep PLAN lines ≤50w.

### E. Redundancy + tangle scan (Explore probe over SPEC.md, gates.md, tasknote-selection.md, model.md, ft-task / ft-micro-task / ft-epic-discovery SKILL.md — 2026-09-06)

**E1. Contracts restated in skill bodies (canonical home in parentheses; ≈chars duplicated):**
1. Copy-paste helper paragraph — byte-identical in ft-task L195 + ft-epic-discovery L229, variant in ft-micro-task L145 (SPEC §"Post-closure protocol" step 3) ≈4.1k
2. Step 1.5 model-gate four-branch list — ft-task L101-108 + ft-micro-task L80-87 (SPEC/model.md §"Category-vs-concrete matching") ≈3.6k
3. Suggest-next-move / re-read-PLAN block — three skills (SPEC §"Post-closure protocol" step 2) ≈2.8k
4. Phase 4 closure mega-bullet — ft-task L180 (SPEC §"🚀 Phase 4: Closure") ≈2.4k
5. Downstream-impact scan restated while citing the module as authoritative — ft-task L178 + ft-epic-discovery L184 (tasknote-selection §"Downstream-impact reconciliation") ≈2.4k
6. Phase 1→2 exit-gate skip/fire case lists — ft-task L162-170 + ft-epic-discovery L171-174 (gates.md §"Phase 1→2 exit gate") ≈3.3k
7. Conditional-skip branches + `--fast`/`--unattended` overrides — three skills (gates.md §"Conditional skip rule") ≈4.5k, about half restatement
8. 🎯 purpose-blurb bounds — ft-task L74-81 + ft-micro-task L61-68 (SPEC §"🎯 Purpose blurb") ≈1.9k
Runners-up: foreign-dirt gate, archive-skim grep recipe, Step 0 layout resolution (identical in all three skills, ~500-600 each).

**E2. SPEC.md ↔ gates.md ↔ tasknote-selection.md double-homes:** operator-gate cues ¶ (both files); SPEC §"Operator-cue glossary" table (1.6k) is a lossy copy of four gates.md tables; Phase 3 👁️ block ≈ gates.md §"Emphasized inline ask shape"; SPEC frontmatter park-reason table (3.0k) ≈ gates.md §"Park conversions"; Phase 4 stub-form/placement ≈ tasknote-selection §"`## Completed` archive convention".

**E3. Lazy-load candidates inside always-loaded SPEC.md (≈26.5k of 77k):** Task-line parser tolerances/footguns 5.5k · What flowtron does NOT provide 3.7k · Working in the flowtron repo itself 3.6k · 🎯 Purpose blurb 3.6k · Handoff 2.3k · Fan-out 1.8k · Operator-cue glossary 1.6k · Skill namespace 1.4k · Cross-repo edit remit 1.1k · Loop tasks 0.9k.

**E4. Tangled logic:** (1) `--fast`×`--unattended` inheritance stated 5×; (2) 👁️ under three postures needs 4 cross-refs; (3) two-banner cap re-asserted in 7 places; (4) exit-gate flavors carry four separate case lists; (5) conditional-skip ↔ bundled-prompt ↔ `--fast` ↔ `--unattended` park spread over four clauses and three skills. Suggested shapes: one flag×surface matrix; one precedence ladder (bundled prompt > unattended park > `--fast` skip > signal); skills declare a flavor and stop restating.

**E5. gates.md tail:** §"Operator-cue vocabulary" (14.4k) is load-bearing except its ~2.6k history/glyph-reuse prose; §"Rationalizations" (7.5k) and §"Red Flags" (2.7k) are self-declared advisory — lazy-fragment candidates loaded at gate-decision time.

### F. Resolved scoping (AskUserQuestion, 2026-09-06)

| Question | Decision |
|---|---|
| Flow mode | Default (brief passed as arg was treated as epic context, not a flag) |
| Shortname / priority / model | `context-load-diet` · High · `[heavy]` parent; `.2` filed `[medium]` (mechanical ledger + doc edits) |
| Child count | M=4 + `.N` audit |
| Budgets set by `.2` | SPEC.md ≤50k chars · SPEC/gates.md ≤35k chars (gentler than the 40k/25k proposal; operator chose lower restructuring risk); lifecycle-skill cap chosen inside `.2` |
| §Rationalizations + §Red Flags home | Lazy `SPEC/gate-discipline.md` |
| `.claude/rules/` note + probe-by-default archive skim | Folded into `.2` (M stays 4) |
| Fan-out | All sequential: `.2 → .3 → .4 → .5 → .N` — `.4` cites sections `.3` relocates, and every trim is measured against `.2`'s ledger |

### G. Drafted child lines

See `.flowtron/PLAN.md` under `CORE-EPIC-535` (written in Phase 2). Word counts recorded in Implementation Notes.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A` (PLAN.md filing; no executable surface)

**Implementation Notes:**

- Pattern: CORE-EPIC-057 cohort shape — 2-space child indent, `[model]` on every line, em-dash separator, children inserted before the reserved `.N`.
- Wrote 4 child lines (`.2`–`.5`); M unchanged from the filing-time estimate of 4. Word counts: `.2` 62w · `.3` 53w · `.4` 50w · `.5` 51w — all under the 70w cap; `.2` exceeds the 50w target because the operator folded the `.claude/rules/` + probe-by-default practices into it rather than filing a `.6`.
- Downstream-impact scan: **no downstream impact** — every open PLAN section (`High` / `Medium` / `Low` / `Future Opportunities`) was empty at filing apart from this epic's own cohort.
- Fan-out filled: all sequential per operator decision; `.N` synthesis.

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

- Test suite / lint / 👁️: `N/A` — markdown-only PLAN.md + tasknote edits. Markdown mental-pass on the PLAN block: 2-space child indent on all six nested lines, bold IDs intact, `[model]` on every line, `| shortname` ≤30 chars, em-dash separators consistent, no trailing whitespace, all four children ≤70w. Fan-out wikilinks match the filed children.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Filed `CORE-EPIC-535` (context-load-diet) and scoped its four implementation children. Measured the per-task load: ~70k tokens (7% of 1M) at Phase 1, of which ~35-40k is flowtron-owned; SPEC.md has tripled since v5.0.0 (28k→77k chars) and SPEC/gates.md nearly tripled (19k→52k), re-growing past the ~40k cap CORE-EPIC-223 split against because no budget was ever written into the contract or release gate. A probe over SPEC.md / gates.md / tasknote-selection.md / the three lifecycle skills found ≈26k of narrow-use sections in the always-loaded core, ≈25k of contracts restated in skill bodies, five gate rules explained in 3-7 places, and ~10k of self-declared advisory prose in gates.md. Claude Code docs check: the ">40k chars = truncated" claim in ft-audit-context is not a documented limit (files load in full to 4 MiB); `.claude/rules/` path-scoped rules are a documented practice flowtron does not yet use.

Children (all sequential, `.N` synthesis): `.2` ledger + budgets (SPEC ≤50k, gates ≤35k) + release standing check + wording fix + folded practices [medium]; `.3` SPEC.md lazy split [heavy]; `.4` skills cite-don't-restate [heavy]; `.5` gates.md untangle + `SPEC/gate-discipline.md` [heavy]. M unchanged at 4.

**Doc-drift sweep:** no change across all 18 AI-referenced docs — pure Discovery filing; contract edits land in `.2`–`.5`.

**Archived:** 2026-09-06

