---
title: seed-prep-merge discovery
status: completed
tags: [unattended, seed-unattended, prep-unattended, epic-discovery]
created: 2026-10-18
due:
related-tasks: [CORE-EPIC-812, CORE-619, CORE-783.1, CORE-783.3, CORE-797, CORE-810, CORE-811]
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

# CORE-812.1 | seed-prep-merge discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-812]]

## 🎯 Goal

Scope the `CORE-EPIC-812` epic (`seed-prep-merge`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-812.2..4` in `.flaitron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-812.2 .. CORE-812.4 filed in .flaitron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-812.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flaitron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-812.2 .. CORE-812.4; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flaitron/PLAN.md under CORE-EPIC-812 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-812]] — parent epic
- [[CORE-619]] — shipped `/ft-seed` (now `/ft-seed-unattended`); its wiring list is the roster a slug change touches
- [[CORE-783.1]] — Discovery that chose a sibling skill over extending seed; this epic revisits that decision
- [[CORE-783.3]] — shipped `/ft-prep-unattended`
- [[CORE-797]] — prep dry run; split-safety guard G2 must survive the merge
- [[CORE-810]] · [[CORE-811]] — latest prep guard tightenings (split deploy safety, drafted-row self-screen)

## 🌳 Fan-out

- **Sequential:** [[CORE-812.3]] after [[CORE-812.2]]; [[CORE-812.4]] after [[CORE-812.3]]
- **Synthesis:** [[CORE-812.N]]

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The operator asked whether prep and seed should be one command. Prep already runs the whole predicate to sort out candidates, then hands them to seed, so a full sweep takes two walks, two gates, and two commits. Steps 0, 1, 4, and 5 of the two bodies are near-duplicates.

- [x] Read relevant source files — both skill bodies, `SPEC/unattended-candidacy.md` (§"Recommend, never write", §"Seeding an existing plan", §"Preparing declined rows", surfaces table), `SPEC/plan-filing.md` §"ID allocation", `docs/MIGRATION.md` retired-skills section, `tools/drift-checks.sh:84`, `tools/update-adopters.mjs` rename header, natabula's `natabula-adopt` and `AGENTS.md`

- [x] **Best Practices Review** — duplication is the module-boundary finding: two bodies carry the same resolve/guard/walk/commit/report scaffolding, and a fix to one (CORE-810, CORE-811 touched prep only) is not picked up by the other. The predicate and taxonomy already live once in the module; the merge removes the duplicated procedure, not a duplicated rule.

- [x] **Archive skim** — CORE-619, CORE-783.1/.2/.3, CORE-797, CORE-810, CORE-811 read; findings below

- [x] **Drift check** — cited paths and section names match HEAD. One drift in the conversation, not the repo: I first called the retirement a v8.0.0 major; precedent says minor (below)

- [x] Asked clarifying questions — one structured ask, four questions; answers in "Resolved scoping"

- [x] Subtasks above populated with ordered steps; YAML `touches:` omitted — the deliverable is PLAN rows only (workflow files)

**Discovery Notes:**

Surface inventory (non-archive files naming `/ft-prep-unattended`, 23): `.flaitron/PLAN.md`, `AGENTS.md`, `README.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `claude/skills/ft-prep-unattended/SKILL.md`, `codex/skills/ft-prep-unattended/SKILL.md`, `claude/skills/ft-release/step-7.1-mirror-pairs.md` (starter-template writers row; Pair O prose), `docs/AGENT-NEUTRALITY.md`, `docs/CONTEXT-BUDGET.md` (filing-commit list; skill-body row), `docs/EXTERNAL-AGENTS.md`, `docs/GLOSSARY.md`, `docs/MIGRATION.md`, `docs/PLATFORMS.md`, `docs/VERSION-HISTORY.md` (history — not rewritten), `SPEC/layout.md`, `SPEC/model.md`, `SPEC/plan-filing.md` (module reader line; §"ID allocation" minter list), `SPEC/task-line-segments.md`, `SPEC/unattended-candidacy.md`, `tools/drift-checks.sh` (`skill_pin_guard_parity` list, line 84). natabula: `AGENTS.md:15` mirror and `docs/recipes/NAT-416-codex-wiring.md:155`; `/natabula-adopt` calls seed by name and is unaffected by the slug, but its adoption walk gets prep's work.

Contract: §"Recommend, never write" already allows the merge — the token lands when the operator confirms a row inside the surface's own gate. The only sentence in the way is §"Preparing declined rows"' "It never writes `[unattended]` or `[handoff]`. A later `/ft-seed-unattended` marks a row the predicate then admits." `[handoff]` stays never-written.

Archive findings:
- [[CORE-783.1]] chose "Sibling attended skill. Seed stays a one-gate marker walk." with no stated alternative weighed. The same note withdrew "seed is the only writer" — every attended filer writes the token on its own confirm. Prep's split mechanical row is the one filed row that gets no candidacy proposal.
- [[CORE-797]] G2: splits that shed a person act (AL-017, NAS-11.8) are stopped by "separates cleanly" alone. [[CORE-810]] and [[CORE-811]] since added the ship-before-the-act test and the drafted-row self-screen. The merge must keep all three; the dependent-mark item keeps the operator able to take a split without marking it.
- [[CORE-619]] is the wiring roster a slug change touches; its `touches:` list matches the inventory above.
- Version precedent: `docs/MIGRATION.md` retired table — `ft-debug` folded into `/ft-task --debug` at v5.15.0, `ft-audit-context` into `/ft-audit context` at v5.29.0. Both minors. Codex reconciliation prunes exact-owned retired links; `/ft-update` Step 4.6 reports the rest.
- `tools/update-adopters.mjs` carries a v7.0.0 `SKILL_RENAME` map that swaps or prunes renamed links on `--apply`. Whether a fold reuses it is a `.4` decision, not settled here.

### Resolved scoping

| Question | Answer |
|---|---|
| Shape | One skill. `/ft-seed-unattended` absorbs prep; `/ft-prep-unattended` retires. |
| Gate | One prose gate, three sections: marks (admitted rows as they stand, token in place), preparations (pins and splits, each followed by a dependent token item on any resulting row the predicate admits), stays (first failed clause). |
| Marks on prepared rows | Dependent item. Dropping the mark keeps the prep unmarked; dropping the prep drops its mark. Reuses seed's "drops every row leaning on it" rule. |
| Version | Minor, on the `ft-debug` / `ft-audit-context` fold precedent. A retired-table row, not a major migration. |
| natabula | Handoff row filed in natabula by `.4`. natabula owns its `AGENTS.md:15` mirror and whether `/natabula-adopt`'s walk keeps the prep half. |
| Children | `.2` contract, `.3` skill body, `.4` retirement and wiring. |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended CORE-783.1's child-filing pattern

- [x] **Minimal refactor gate** — no refactor; PLAN rows only

- [x] Implemented the minimal solution — three child lines written

- [x] Updated/added tests for non-trivial behavior — N/A (no code)

**Implementation Notes:**

Pattern: CORE-783.1's child filing — 2-space nested under the parent, before `.N`, `[model]` on every line. Three child lines written (M = 3, unchanged): `.2` 44w, `.3` 43w, `.4` 40w. `.3` leaves the prep body in place so CI's `skill_pin_guard_parity` and `shipped_skill_parity` stay green until `.4` removes body, wrapper, and roster entries together.

Downstream impact: the only other active row is CORE-641 (typescript-7) — no downstream impact.

Candidacy: no candidates. `.2` [frontier], `.3` [heavy], `.N` [heavy] fail clause 1. `.4` fails clause 3 (*handoff*) and clause 6 (its predecessor `.3` is not a candidate).

Models: `.2` [frontier] departs from the [heavy] seed (contract-design trigger, `SPEC/model.md` §"When to choose `[frontier]`"); `.4` [medium] departs (well-scoped multi-file sweep); `.3` uniform. Operator kept both at the review prompt.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (PLAN rows only; no executable surface)

- [x] Ran lint/type-check on changed code — N/A (no code)

- [x] **Verification receipt** — N/A: Acceptance carries no verify commands; markdown mental-pass and `bash tools/drift-checks.sh` in Testing Notes

- [x] **External review** — N/A: the deliverable is filed PLAN lines, not a diff to grade

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Markdown mental-pass on the PLAN block: 2-space indent on `.1`–`.4` and `.N`; bold IDs intact; `[model]` on every line (`.2` [frontier] is the category cap); no `[unattended]` anywhere in the cohort; shortnames ≤30 chars (`seed-prep-contract` 18, `seed-absorbs-prep` 17, `retire-prep-slug` 16); em-dash separators consistent; no trailing whitespace (`grep " $"` → 0 lines); Fan-out wikilinks match the filed children. `bash tools/drift-checks.sh` → exit 0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `AGENTS.md` no change · `README.md` no change · `SPEC.md` no change · `SPEC/epic.md` no change · `docs/VISION.md` no change · `docs/MIGRATION.md` no change (the retired-table row is `.4`'s) · `claude/` · `codex/` · `cursor/` · `grok/AGENTS-snippet.md` no change (`.4`) · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change (`.4`). Contract edits land in the children.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md `.1` line → stub nested under CORE-EPIC-812, tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below

- [x] **Learnings** — N/A

**Final Summary:**

Filed and scoped CORE-EPIC-812: `/ft-prep-unattended` folds into `/ft-seed-unattended`, so one attended walk marks admitted rows and prepares declined ones behind one gate and one commit. Three children are filed: `.2` contract (`[frontier]`), `.3` skill body (`[heavy]`), and `.4` retirement and wiring (`[medium]`). They run in sequence, and the `.N` audit closes the epic.

Changed: `.flaitron/PLAN.md` (parent refined; `.1` stubbed; `.2`–`.4` filed at 44 / 43 / 40 words) and this tasknote. M = 3, unchanged from filing. A correction during Discovery: the retirement is a minor, not v8.0.0, on the `ft-debug` (v5.15.0) and `ft-audit-context` (v5.29.0) fold precedent. Verification: markdown pass and `bash tools/drift-checks.sh` → 0. No refactor. `touches:` omitted (workflow files only).

**Archived:** 2026-10-18
