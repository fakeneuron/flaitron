---
title: retire-flowtron-stats
status: completed
tags: []
created: 2026-09-17
due:
related-tasks: [CORE-EPIC-603, CORE-603.1, CORE-573]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-flowtron/SKILL.md
  - claude/skills/ft-stats/SKILL.md
  - claude/commands/ft-flowtron.md
  - claude/commands/ft-stats.md
  - codex/skills/ft-flowtron/SKILL.md
  - codex/skills/ft-stats/SKILL.md
  - .github/workflows/ci.yml
  - .gitignore
  - AGENTS.md
  - SPEC/layout.md
  - SPEC/model.md
  - SPEC/plan-filing.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
  - claude/skills/ft-update/SKILL.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - docs/AGENT-NEUTRALITY.md
  - docs/CONVENTIONS.md
  - docs/GLOSSARY.md
  - docs/MIGRATION.md
  - docs/PLATFORMS.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-603.2 | retire-flowtron-stats

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-603]] · 🔗 [[CORE-603.1]] · 🔗 [[CORE-573]]

## 🎯 Goal

Retire `ft-flowtron` and `ft-stats` in the CORE-573 demote shape — delete the three shipped paths each, sweep every roster and rationale site, drop the CI/release checks that only existed for the info screen, and record both in `docs/MIGRATION.md` §"Retired skills".

## ✅ Acceptance

- [x] A1 The six shipped paths are gone — `test ! -e claude/skills/ft-flowtron -a ! -e claude/skills/ft-stats -a ! -e claude/commands/ft-flowtron.md -a ! -e claude/commands/ft-stats.md -a ! -e codex/skills/ft-flowtron -a ! -e codex/skills/ft-stats`
- [x] A2 No live `ft-flowtron` / `ft-stats` / `STATS.md` reference remains outside the archive, `PLAN-ARCHIVE.md`, `docs/VERSION-HISTORY.md`, `docs/CONTEXT-BUDGET.md` (dated measurement, re-measured at release), the `docs/MIGRATION.md` retired-skills rows, the epic's own PLAN.md rows, and the CORE-603.2 history clauses in `step-7.1-mirror-pairs.md` — `git grep -n -e 'ft-flowtron' -e 'ft-stats' -e 'STATS.md' -- . ':!.flowtron/tasknote/archive' ':!.flowtron/PLAN-ARCHIVE.md' ':!docs/VERSION-HISTORY.md' ':!docs/CONTEXT-BUDGET.md' ':!.flowtron/tasknote/CORE-603.2.md' | grep -v -e 'MIGRATION.md:.*| v5' -e 'PLAN.md:.*-603' -e 'mirror-pairs.md:.*CORE-603.2' -e 'mirror-pairs.md:.*since-retired'` prints nothing (exclusions widened at Phase 3: the parent `CORE-EPIC-603` row and the two `since-retired` history clauses in Pair A / Pair J)
- [x] A3 Pair E is gone from both surfaces and the Pair L mapping — `! grep -q 'Pair E' .github/workflows/ci.yml && ! grep -q '^\*\*Pair E' claude/skills/ft-release/step-7.1-mirror-pairs.md && ! grep -q "'Pair E|" claude/skills/ft-release/step-7.1-mirror-pairs.md`
- [x] A4 Pair A runs over two surfaces on both copies — `grep -c 'ft-flowtron' .github/workflows/ci.yml` → 0 and the Pair A `grep -n 'tasknote templates (full' README.md SPEC/layout.md` prints two hits
- [x] A5 `docs/MIGRATION.md` §"Retired skills leave dangling symlinks" gains `ft-flowtron` and `ft-stats` rows — `grep -q '| \`ft-flowtron\` |' docs/MIGRATION.md && grep -q '| \`ft-stats\` |' docs/MIGRATION.md`
- [x] A6 Shipped-skill parity and the wrapper-name invariant hold; the symlink-roster derivation in `step-7.1-standing-checks.md` prints nothing (exclusion list shrunk by two) — run the CI `drift` job's parity step + the four `diff -u` blocks
- [x] A7 Pair L (CI ↔ §7.1 path sets) prints nothing after the Pair A edit and the Pair E removal — run the Pair L loop from `step-7.1-mirror-pairs.md`
- [x] A8 Pairs F and J no longer name `ft-flowtron`; Pair F's loop covers four mirrors — `! grep -q 'ft-flowtron' <(sed -n '/^\*\*Pair F/,/^\*\*Pair G/p' claude/skills/ft-release/step-7.1-mirror-pairs.md)` and the Pair F loop prints nothing
- [x] A9 Local self-wiring check passes after the four gitignored `.claude/` links are removed — `diff <(ls claude/skills) <(ls .claude/skills)` and `diff <(ls claude/commands) <(ls .claude/commands)` print nothing
- [x] A10 `git diff --check` → 0

## 🧩 Subtasks

- [x] Delete the six shipped paths + `rm` the four gitignored `.claude/` links (`ft-flowtron`, `ft-stats` under `skills/` and `commands/`)
- [x] CI: drop both Pair E steps; Pair A loop → two files; preamble comment "roster flag check" → "flag checks" (Pair J/M still use `case`)
- [x] `step-7.1-mirror-pairs.md`: Pair A → two surfaces (history clause for the retired third); delete Pair E block; Pair F → four mirrors, drop the `ft-flowtron` file from its loop + the Pair E cross-ref; Pair I / Pair K / Pair L prose → drop E from the lifted-check lists (`eleven` → `ten`), remove the Pair L mapping row, reword the prefix-key bullet; Pair J cascade note → drop the `ft-flowtron` clause
- [x] `step-7.1-standing-checks.md`: drop the two roster lines and the two regex alternatives
- [x] `docs/CONVENTIONS.md:58`: `A, B, C, E, J, M, N, and O` → `A, B, C, J, M, N, and O`
- [x] Rosters: `AGENTS.md:37-39` (Six → Four), `SPEC/layout.md` (`:20` STATS.md tree line, `:63` namespace list), `docs/PLATFORMS.md` (`:35`, `:74`, `:261/266/291/425` 14 → 12 + file lists), `docs/MIGRATION.md` (`:30-31` global-install rows, `:65` global list, two retired rows `v5.29.0`), `codex/` `cursor/` `grok/` AGENTS-snippet global-utility sentences, `claude/skills/ft-update/SKILL.md:90` parenthetical, `docs/AGENT-NEUTRALITY.md:39` (rotation consumers + skill-name column), `docs/GLOSSARY.md:31`
- [x] Rationale clauses: `SPEC/model.md` `:18` (drop the buckets clause), `:143` (vocabulary, not buckets), `:158` (drop the feeding clause); `SPEC/plan-filing.md` `:3` (visualizer as sole history consumer), `:224`, `:236`
- [x] `.gitignore`: drop the `STATS.md` block; delete the local untracked `.flowtron/STATS.md` (regeneratable by a skill that no longer exists — operator confirmed at Discovery: "Delete it")
- [x] Verify: A1–A10 commands, repo-wide residue grep

## 🔗 Related

- [[CORE-EPIC-603]] — parent epic (skill-roster-diet)
- [[CORE-603.1]] — Discovery that scoped this child; Fan-out: Sequential, `.2` first
- [[CORE-573]] — related-decision: the retire-and-record (demote) shape this task follows (A2–A9 acceptance template, residue-grep exclusion style)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Fleet survey at `.1` found 3 / 7 referencing files across 21 repos for the two skills; both are vanity surfaces whose every roster site is a maintenance liability (Pair E exists solely to keep the info screen honest). Scope in PLAN.md matches the residue survey exactly; nothing surfaced that widens or narrows it.

- [x] Read relevant source files — residue survey via `git grep` (both slugs + `STATS.md`, archive/history excluded): 12 files outside the six shipped paths. CI `drift` job (Pair A loop, two Pair E steps, preamble comment), `step-7.1-mirror-pairs.md` (Pairs A/E/F/I/J/K/L), `step-7.1-standing-checks.md` (roster + regex), `SPEC/layout.md`, `SPEC/model.md`, `SPEC/plan-filing.md`, `AGENTS.md`, three non-Claude snippets, `ft-update` SKILL, `docs/{AGENT-NEUTRALITY,CONVENTIONS,GLOSSARY,MIGRATION,PLATFORMS}.md`, `.gitignore`. `docs/CONTEXT-BUDGET.md:137` is a dated measurement — left for the release re-measure per `.1`. The CI context-budget step globs `claude/skills/*/SKILL.md`, so deleting two bodies cannot fail it.

- [x] **Best Practices Review** — N/A for code; doc/config removal. Boundary note: Pair E is deleted rather than re-pointed (operator decision recorded at `.1`) because the drift class it guards — info-screen roster vs shipped skills — disappears with the screen. Pair A shrinks to its two byte-identical surfaces, which simplifies the pair (the "compressed variant" exemption goes with it).

- [x] **Archive skim** — `archive/core/` per the README table. [[CORE-573]] (v5.27.0) is the direct precedent: three shipped paths + gitignored local links, roster sweep, retired-row, residue grep with a named exclusion list, Pair-E/parity verification; A2–A9 there are the template for A1–A10 here. [[CORE-603.1]] carries the site inventory this note refines (Pairs A/E/F/J + the two SPEC rationale sites). CORE-546 / CORE-543 (Pair L) explain why the CI copy of Pair A must be edited in the same commit as its §7.1 source.

- [x] **Drift check** — PLAN.md line matches current code: Pair E lives at `ci.yml:137-150` and `mirror-pairs.md:52-80`; Pair A/F/J entries at `ci.yml:114`, `mirror-pairs.md:9-18,82-88,308`; `SPEC/model.md:18,143,158`; `SPEC/plan-filing.md:3,224,236`. Two sites the PLAN line does not name but the sweep must cover: the **Pair L mapping row + prefix-key bullet** (`mirror-pairs.md:260,285`) and `docs/CONVENTIONS.md:58`'s lifted-check list — both would fail Pair L / read stale after Pair E is removed. Also the CI preamble comment (`ci.yml:60-61`) cites "the roster flag check" as its `case`-pattern example; Pairs J/M still use `case`, so the comment is reworded, not deleted. Within scope ("sweep every roster site"), not a Re-scope.

- [x] Asked clarifying questions — one: whether to delete the local untracked `.flowtron/STATS.md` alongside its `.gitignore` entry (see Discovery Notes).

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:**

- **Retired-in version.** Current `SPEC.md` is v5.28.0; the retired rows record `v5.29.0` (next cut), matching how CORE-573's row was written ahead of its release.
- **Global `~/.claude/skills/` links.** `ft-flowtron` / `ft-stats` were global-install skills (MIGRATION §"One-time global installs"), so the operator's agent-home may hold symlinks that will dangle after this commit. Outside the repo — not touched here; flagged in the recap for the operator to `rm` by hand.
- **`.gitignore` `STATS.md` block.** Dropping it un-ignores the local `.flowtron/STATS.md` (1,739 bytes, 2026-07-16), which would then show as untracked dirt. Deleting the file is the clean end state: it is a regeneratable snapshot of a skill that no longer exists.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-573's retire-and-record shape extended verbatim: `git rm` the shipped paths, `rm` the gitignored local links, roster sweep, retired-rows, residue grep with a named exclusion list. No new shape.

- [x] **Minimal refactor gate** — Pair A shrank from three surfaces to two and lost its "compressed variant" exemption (Acceptance A4); Pair M's rationale dropped its Pair E half (would otherwise read stale). Nothing else touched; `docs/CONTEXT-BUDGET.md:137` deliberately deferred to the release re-measure.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (no code; CI `drift` job shrank by two steps, and the Pair L binding was re-run against it)

**Implementation Notes:**

- 24 files: 6 deletions (skill bodies, command stubs, Codex wrappers), `ci.yml` (−2 Pair E steps, Pair A loop 3→2 files, preamble example reworded since Pairs J/M still carry `case`), `.gitignore` (−STATS.md block), 16 markdown sweeps. Net −208 lines.
- Three sites beyond the PLAN line's list, all inside "sweep every roster site": the Pair L mapping row + prefix-key bullet (`mirror-pairs.md`), the Pair K "release-gate only" list, and `docs/CONVENTIONS.md:58`'s lifted-pairs list. Pair I and Pair M prose that leaned on Pair E as a co-example was reworded to Pair B alone.
- Two history clauses keep the slugs on purpose (`since-retired`): Pair A's CORE-422 miss story and Pair J's CORE-475 anecdote. Pair L's prefix-key bullet keeps Pair E as its worked example with a CORE-603.2 marker.
- `docs/MIGRATION.md` retired rows: `v5.29.0` (next cut, per the CORE-573 precedent). Replacement column points at `SPEC.md` version line + §"Core principles" + `SPEC/layout.md` §"Skill namespace" for the screen, and at `viz/` for the stats.
- Local: four gitignored `.claude/` links and the untracked `.flowtron/STATS.md` (2026-07-16 snapshot) removed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown + CI YAML; the CI `drift` steps were run locally instead, see receipt)

- [x] Ran lint/type-check on changed code — `git diff --check --cached` → 0

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) N/A — no UI change. Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- A1 six-path `test ! -e …` → 0
- A2 residue `git grep … | grep -v …` → 0 lines
- A3 Pair E absent from `ci.yml`, §7.1 heading, Pair L mapping → 0
- A4 `grep -c ft-flowtron ci.yml` → 0; Pair A clause grep → 2 hits
- A5 both retired rows present → 0
- A6 CI parity `diff -u` → 0; wrapper-name loop → 0; standing-checks four `diff -u` (d1–d4) → all 0
- A7 Pair L loop over the ten mapped steps → prints nothing
- A8 Pair F section carries no `ft-flowtron`; Pair F four-mirror loop → prints nothing
- A9 `.claude/` self-wiring diffs → 0
- A10 `git diff --check --cached` → 0
- Extra: CI Pair B loop → 0; Pair A CI copy → 0; Pair J + Pair M CI steps extracted and run → 0. Context-budget step globs `claude/skills/*/SKILL.md`, unaffected by deletions.
- Structural: no duplication introduced; no dead code (the retired bodies are the deletion); no public-surface growth; code-facing docs (`ci.yml` preamble, Pair L bullets) updated in step.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — updated: `AGENTS.md` (utility roster Six→Four), `docs/MIGRATION.md` (global-install table −2 rows, §1.2 global list, +2 retired rows), `codex/` `cursor/` `grok/` snippets (global-utility sentence), `docs/CONVENTIONS.md` (lifted-pairs list), `docs/AGENT-NEUTRALITY.md` (plan-filing row), `docs/PLATFORMS.md` (14→12 counts, three roster sentences). No change: `README.md`, `SPEC.md`, `claude/AGENTS-snippet.md`, `CONTRIBUTING.md`, `SECURITY.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` (residue grep confirms none name either slug).   for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/plan-filing.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Retired `ft-flowtron` and `ft-stats` in the CORE-573 demote shape: six shipped paths deleted, Pair E (the CI/release check that existed only to keep the info screen honest) removed from `ci.yml`, §7.1, and the Pair L mapping, Pair A shrunk to its two byte-identical surfaces, and 16 roster/rationale sites swept — `AGENTS.md`, `SPEC/layout.md`, `SPEC/model.md` (three `[model]`-vocabulary clauses no longer cite a stats consumer), `SPEC/plan-filing.md` (the visualizer is the sole `## Completed` history consumer), the three non-Claude snippets, `ft-update`, and five `docs/` files (`PLATFORMS.md` counts 14→12). Two `docs/MIGRATION.md` retired rows point operators at `SPEC.md` / `SPEC/layout.md` / `viz/` and at their agent-home symlinks. Net −208 lines; CI `drift` job −2 steps.

- **Verification:** A1–A10 all pass; the surviving CI drift steps (parity, wrapper-name, Pairs A/B/J/M) and the release-only Pair F / Pair L loops were run locally and print nothing.
- **Refactors:** Pair A simplification (Acceptance-driven); Pair M rationale trimmed to Pair B. Deferred: `docs/CONTEXT-BUDGET.md:137` measurement line (release re-measure, per `.1`).
- **Documentation verdict:** 10 of 18 AI-referenced docs updated, 8 no change.
- **`touches:` reconciliation:** `git diff --cached --name-only` = the 23 declared paths + this tasknote. No undeclared paths.
- **Maintainability effect:** two fewer always-loaded `description:` blocks per session (~1.1 KB of the 9.6 KB the epic targets), one fewer hand-maintained roster (the info-screen table) and the two CI steps + §7.1 pair that policed it. Every future skill add/retire now touches one fewer mirror.
- **Operator follow-up (outside the repo):** the global `~/.claude/skills/{ft-flowtron,ft-stats}` + `~/.claude/commands/{ft-flowtron,ft-stats}.md` symlinks, if installed, now dangle — `rm` them by hand; not touched here per the path-access rule.

**Archived:** 2026-09-17
