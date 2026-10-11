---
title: micro-fold-in discovery
status: completed
tags: []
created: 2026-10-10
due:
related-tasks: [CORE-EPIC-778, CORE-776.5]
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

# CORE-778.1 | micro-fold-in discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-778]]

## 🎯 Goal

Scope the `CORE-EPIC-778` epic (`micro-fold-in`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-778.2..5` in `.flaitron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-778.2 .. CORE-778.5 filed in .flaitron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds") — `.2` is 54w, under the hard cap and over the target by four words
- [x] Audit line CORE-778.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [ ] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [ ] Skim .flaitron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [ ] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [ ] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-778.2 .. CORE-778.5; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into .flaitron/PLAN.md under CORE-EPIC-778 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-778]] — parent epic: fold `/ft-micro-task` into `/ft-task --micro`
- [[CORE-776.5]] — predecessor: the micro-specific posture drift that motivated this epic (second micro drift ticket in CORE-EPIC-776)

## 🌳 Fan-out

- **Sequential:** [[CORE-778.2]] first (the flag and template the others cite) · [[CORE-778.3]] after [[CORE-778.2]] · [[CORE-778.4]] after [[CORE-778.3]] · [[CORE-778.5]] after [[CORE-778.4]]
- **Synthesis:** [[CORE-778.N]] — audit; also the release gate's doc-drift sweep for the major bump

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator-invoked after the CORE-776.5 closure surfaced that `/ft-micro-task` is a ceremony tier maintained as a second runner: 39 files outside its own directory name it, 2 of 5 CORE-EPIC-776 drift children were micro-specific, and usage has collapsed (141 of 1,167 archived notes ever; ~1 of the 60 most recent). The operator chose fold-in over scrap-or-keep in conversation; Discovery settles the shape.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable) — `touches:` omitted: no file deliverable beyond the PLAN.md filing

**Discovery Notes:**

**Shared design surface (inventoried 2026-10-10).** Four classes of surface name the micro runner or its template; the epic's children split along them.

1. **The runner and its wiring** — `claude/skills/ft-micro-task/SKILL.md` (20,059 B; 18 self-mentions), `codex/skills/ft-micro-task/SKILL.md` (517 B pointer), the four `AGENTS-snippet.md` symlink lines (`claude` line 90, `codex` 32, `cursor` 47, `grok` 51) plus the Claude snippet's peer-skill roster (line 23), `CLAUDE.md` roster (lines 17, 22, 26), `tools/drift-checks.sh` line 84 (skill-body roster) and line 316 (marker-span comment), `claude/skills/ft-release/step-7.1-mirror-pairs.md` line 37 (template↔skill pair) and line 19 (template qualifier list), `tools/update-adopters.mjs` line 163 (the rename map — `ft-file-followup → ft-file-task` is the retirement precedent), `docs/MIGRATION.md` §"Retired skills" table (line 520 ff.) and the §1.2 wiring loop (line 543).
2. **The contract and posture layer** — `SPEC.md` (4 mentions: §"Phase 3" `N/A` clause, §"Paper-complete guard" runner split, selection pointers), `SPEC/gate-postures.md` (6), `claude/skills/ft-task/unattended-mode.md` (9: the conversion map's micro column, the dependency-park paragraph, the `model-mismatch` resume path, the Persistence hook), `SPEC/post-closure.md` (the 🟢 GO carve-out, line 19), `SPEC/gates.md` line 194, `SPEC/cue-vocabulary.md` line 103, `SPEC/blocked.md` lines 113-114 ("`/ft-task` is not micro-aware"), `SPEC/model.md` line 3, `SPEC/plan-filing.md` line 209, `SPEC/unattended-candidacy.md` line 212, `SPEC/layout.md` lines 44 and 68, `SPEC/tasknote-selection.md` §"When to use a tasknote" micro pair (lines 81-94), `claude/skills/ft-task/preamble.md` / `step-1.5-model-edge.md` / `step-5-loop-mode.md` (the shared-fragment `<SKILL>` substitutions), `claude/skills/ft-file-task/SKILL.md` + `park-mode.md` (routing: "execute now → `/ft-micro-task`"; promotion carries a stub into "a micro note's `## ⚡ Notes`"), `claude/skills/ft-open-epic/SKILL.md`, `claude/skills/ft-seed-unattended/SKILL.md`, `templates/subagent-probe-template.md` (the micro grading target written by [[CORE-776.5]]).
3. **The caller-facing stable surfaces** — `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers" rows "Tasknote body headings" and "Template labels" both carve out the micro template ("ships no phase headings … a micro note has no phase progress to read"; "`## ✅ Recap` + `**Archived:**` and no `**Final Summary:**`"), plus step 1 and the External review paragraph. `docs/PLATFORMS.md` (7: inventory tables, tree listings, Codex flag row), `claude/CAPABILITIES.md` (flag rows 32-33), `docs/CODEX-VERIFICATION.md` (3), `docs/AGENT-NEUTRALITY.md` (3; the template's closing recap line is a ledgered path fact). A stable-surface change is a versioned release, never a silent edit (EXTERNAL-AGENTS line 83).
4. **Templates, docs, budgets** — `templates/tasknote-micro-template.md` (2,241 B), `templates/tasknote-README.md` line 19, `templates/spec-template.md` line 47 (`[micro]` scope token), `docs/GLOSSARY.md` line 89, `docs/CONTEXT-BUDGET.md` (5: preamble row rationale, ledger prose; micro has no budget row of its own — it falls under `claude/skills/*/SKILL.md`), `docs/VERSION-HISTORY.md` (history; release-time only).

**Viz parser.** `grep -rn -i 'micro\|⚡' viz/src` is empty: the visualizer has no micro-specific code. A micro note parses with all-zero `phases[]` and `activePhaseIndex` returns the last index — the "Phase 4 active" quirk [[CORE-042.5]] predicted at ship time and the stable-surfaces table now documents as a reader limitation. The chosen `--micro` shape keeps `## 🎯 Goal` + `## ✅ Acceptance` and drops the phase headings for one `## ⚡ Notes` log, so the stable-surfaces rows need rewording, not parser work; a fixture for the new shape is the only viz touch.

**Archive skim** (`archive/core/`, 141 micro-shaped notes; the path grep over the runner and template returns 15 recent hits, read by ID). [[CORE-042.5]] shipped micro (v0.9.0) with two decisions that bear directly: *"`/task` not edited — `/micro-task` is independent; user picks the entry point at invocation"* (the second-runner choice this epic reverses) and *"No status-enum change — micro is body-shape only"* (still true; the fold-in keeps it body-shape only, now behind a flag). [[CORE-724.4]] already single-sourced the Step 1 / 1.5 preamble across both runners to cut duplication — the fold-in is that motion's end state. [[CORE-776.2]] and [[CORE-776.5]] are the two micro-specific drift tickets of the closing epic. The `ft-file-followup → ft-file-task` rename at v7.0.0 (MIGRATION line 520: "hard-cut rename with no alias"; `update-adopters.mjs` line 163 rename map; `/ft-update` reports dangling symlinks for retired skills) is the retirement precedent and the versioning precedent — a removed skill is a **major** bump (`SPEC/versioning.md`).

**Best Practices Review.** The runner axis today: `/ft-task` owns the 4-phase machinery and takes four orthogonal flags that compose (`step-0-flags.md`); `/ft-micro-task` re-implements scaffold / execute / close against a different template and routes the shared fragments through `<PREAMBLE>` / `<UNATTENDED>` path bindings. A `--micro` flag is a fifth orthogonal token on the one runner — the same shape `--debug` and `--loop` already take (mode flag → fragment dispatch). Two compositions are incoherent and should refuse at parse: `--micro --loop` (the loop needs the `## 🔁 Iterations` log and per-cycle Phase 2↔3) and `--micro --debug` (debug adds Phase 1 prompts and a Phase 3 re-verify to a note that has no Phase 1 or Phase 3 section). `--fast` and `--unattended` compose with it unchanged. Dependency direction is preserved: the shared fragments stop needing a `<SKILL>` placeholder for a second runner.

**Drift check.** Every path and line cited above exists at the quoted text at HEAD `fcd338cd`. The parent PLAN row matches the conversation that filed it. One contract clause the fold-in must reverse explicitly: `SPEC/blocked.md` lines 113-114 ("`/ft-task` is not micro-aware") becomes false by design — the child that edits it records the supersession on [[CORE-042.5]]'s decision as a reversed decision, not a ⚠️ pointer (`SPEC/superseded-claims.md` excludes reversed decisions).

**Resolved scoping** (one structured ask, four questions, all answered with the recommended option):

| Question | Answer |
|---|---|
| Fold-in vs scrap | `/ft-task --micro`: light record behind a flag on the one runner; the second runner retires |
| `--micro` note shape | Spec-on-top, one-section log: keep 🎯 Goal + ✅ Acceptance + 🧩 Subtasks, collapse the four phase sections into one `## ⚡ Notes` log + Final Summary |
| Retirement path | Hard cut per the v7.0.0 `ft-file-followup` precedent: delete runner + Codex wrapper, rename-map entry, MIGRATION row, snippet/roster edits; major bump at release |
| Child cohort | M=4, sequential `.2` → `.3` → `.4` → `.5` as drafted below |

Asserted, not asked: `--micro` refuses `--loop` and `--debug` at parse and composes with `--fast` / `--unattended`; the 141 archived micro notes stay as they are (write-once); the retired template file goes with the runner, since the new shape is a variant of the full template.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: pure PLAN.md filing

**Implementation Notes:**

Pattern: the CORE-EPIC-776 / FE-EPIC-127 cohorts directly above in PLAN.md (2-space nesting, `[model]` glyph on every row, ` — ` separator). Four child rows written between `.1` and `.N`; word counts `.2` 54 · `.3` 42 · `.4` 38 · `.5` 35 (all under the 70w cap; `.2` over the 50w target by four words, kept — every clause names a deliverable). M unchanged from the filing-time estimate of 4.

Per-child `[model]`, seeded `[heavy]` from the `[frontier]` epic: `.2` `[heavy]` (template variant + closure branches are design), `.3` `[medium]` (precedent-following hard cut), `.4` `[heavy]` (~20-file contract reconcile), `.5` `[light]` (grep-driven sweep + one fixture). The two departures were confirmed by the operator in the Step 7 review prompt.

Downstream-impact scan over the rest of the active PLAN: no reconcile edits. Ordering note recorded on the parent row — [[CORE-776.N]] (closure-contract-coherence audit) reads the posture docs `.4` will rewrite, so it closes before `.2` starts; FE-EPIC-127's children touch `devApi` / watch code, not the parser `.5` adds a fixture to; CORE-641 / CORE-774 untouched.

`[unattended]` candidacy: no candidates. `.2` / `.4` / `.N` fail clause 1 (`[heavy]`); `.3` trips the clause-3 keyword screen (`MIGRATION.md` carries *migration*) and, with `.5`, sits behind an unsettled predecessor in the sequential chain (clause 6). No token written anywhere.

Fan-out: Sequential `.2` → `.3` → `.4` → `.5`; Synthesis `.N`. Parent long description refined in place with the settled scope (shape, template, retirement path, ordering), bracket tokens preserved verbatim.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: PLAN.md filing

- [x] Ran lint/type-check on changed code — N/A: PLAN.md filing

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason) — N/A: no code; markdown mental-pass below

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason — N/A: the deliverable is filed PLAN lines, not a diff to grade

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Markdown mental-pass on the PLAN.md block: 2-space child indent on all four new rows; bold IDs intact; `[model]` + glyph on every row, none heavier than `[heavy]`; no `[unattended]` token on any row; `| shortname` present and ≤30 chars (`micro-flag` · `runner-retire` · `contract-reconcile` · `docs-sweep`); ` — ` separator consistent; ≤70w each; no trailing whitespace; `## 🌳 Fan-out` populated with wikilinks matching the filed children. `bash tools/drift-checks.sh` run at closure (receipt in Final Summary).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

  No change across the board — pure Discovery filing; the contract and doc edits land inside `.2`–`.5`.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

  N/A — the lesson ("a ceremony tier is a flag, not a runner") lands in the contract through `.2`/`.4`, which is where every session reads it.

**Final Summary:**

CORE-EPIC-778 is filed and scoped: `/ft-micro-task` folds into `/ft-task --micro` as a spec-on-top, one-section-log template variant behind a flag on the one runner; the second runner is hard-cut per the v7.0.0 precedent (a major bump at release), and the ~39 surfaces that mirrored it are reconciled across four sequential children.

- Filed: `CORE-778.2` micro-flag `[heavy]` · `CORE-778.3` runner-retire `[medium]` · `CORE-778.4` contract-reconcile `[heavy]` · `CORE-778.5` docs-sweep `[light]`; `CORE-778.N` audit confirmed as filed. Parent description refined.
- Resolved scoping: fold-in over scrap; template keeps Goal + Acceptance + Subtasks and collapses the phase sections; hard cut over a deprecation shim; M=4 sequential. Asserted: `--micro` refuses `--loop` / `--debug`; archived micro notes untouched; the micro template file retires with the runner.
- Surface inventory (four classes, 39 files) and the viz finding (no micro-specific parser code; the "Phase 4 active" quirk is a documented reader limitation the new shape removes) are in Discovery Notes for the children.
- Ordering: run after [[CORE-776.N]] closes.
- Verification: markdown mental-pass; `bash tools/drift-checks.sh` → see commit. Scope reconciliation: `N/A — no file deliverable` (PLAN.md + this note only).

**Archived:** 2026-10-10
