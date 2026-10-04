---
title: mirror-pair-o-filing-commits
status: completed
tags: []
created: 2026-09-13
due:
related-tasks: [CORE-593, CORE-591, CORE-563, CORE-535.3]
touches:
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - .github/workflows/ci.yml
  - docs/CONVENTIONS.md
---

# CORE-594 | mirror-pair-o-filing-commits

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Add §7.1 Pair O binding every filing runner under `claude/skills/**` (any file carrying `auto-commit = `) to §"Filing commits" — a non-`--quiet` `git diff --cached` post-stage read and a citation that resolves to the section's heading — then lift it into the CI `drift` job with a Pair L mapping row.

## ⚡ Notes

**Relevance:** Proceed — the class is real and recent: CORE-563 minted the contract + four runners, CORE-591 patched only `ft-refactor`'s pre-check, CORE-593 (the immediately preceding commit) added its post-stage read. Three commits over one rule with no detector between them is exactly the §7.1 mirror-pair shape.
**Best Practices Review:** Extends the Pair N shape (trigger-literal-derived file set, `ft-release/` self-exclusion, `bad=` accumulator, one line per miss) rather than a runner allowlist. No refactor; the pair is additive at the end of the fragment. The citation half resolves the path each runner *names* (not a fixed `SPEC/tasknote-selection.md`) so CORE-595's planned split of §"Filing commits" into `SPEC/plan-filing.md` needs no edit here — a stale citation fails, a repointed one passes.
**Drift check:** no drift — `step-7.1-mirror-pairs.md` ends at Pair N; `ci.yml` `drift` job carries the release-context-free subset A/B/C/E/J/M/N per `docs/CONVENTIONS.md` §"GitHub Actions CI"; Pair L's mapping list ends at `Pair N`; all five `auto-commit = ` runners currently satisfy both halves (Pair O is clean at HEAD, non-vacuous — five files iterate). PLAN line's "non-`--quiet` `git diff --cached`" and "resolving `§"Filing commits"` citation" both encoded as written.
**Archive skim:** `archive/core/` grepped for `step-7.1-mirror-pairs` / `ci.yml`. CORE-574.3 (lifted Pairs J+M into `drift`), CORE-574.N (11 steps = 10 lifted checks at 2026-09-11), CORE-546 / CORE-535.3 (the Pair L origin: a §7.1 repair that missed its CI twin) and CORE-593 (worked example for the fix shape) are the load-bearing precedents; each is cited in the pair prose. Pair N's own tasknote shape (CORE-577.x) is the template followed.
**Declared scope:** `touches:` — `claude/skills/ft-release/step-7.1-mirror-pairs.md`, `.github/workflows/ci.yml`, `docs/CONVENTIONS.md` (YAML above).
**Pattern survey:** Pair N verbatim in structure: `grep -rl <literal> claude/skills --include='*.md' | grep -v '^claude/skills/ft-release/'` as the derived file set; three named findings; five deliberate-property bullets; "Lifted into the CI `drift` job" bullet; CI copy byte-identical to the fence modulo indentation. Pair L row + `docs/CONVENTIONS.md` roster + Pair K's subset parenthetical + Pair L's "ten lifted checks" count updated — the four places a new `drift` step is restated.
**Implementation:** `step-7.1-mirror-pairs.md`: appended **Pair O** (prose, fence, five property bullets); Pair K bullet subset → `(A, B, C, E, J, M, N, O)`; Pair L mapping gained the `Pair O` row and its coverage bullet reads "eleven lifted checks". `ci.yml`: new `Pair O` step after Pair N, same `- name:` + `run: |` shape. `docs/CONVENTIONS.md` §"GitHub Actions CI": mirror-pair roster → `A, B, C, E, J, M, N, and O`. Check semantics: `grep -e 'git diff --cached' | grep -qv -e '--quiet'` requires a post-stage read distinct from the pre-check probe; citation regex `SPEC/[A-Za-z0-9_.-]+\.md[`)]? §"Filing commits"` accepts backticked / bare / markdown-link shapes and resolves each named module against `^## Filing commits`. Verification receipt: Pair O fence run under `bash` and `zsh` at HEAD → exit 0, no output · injected drift (`--quiet`'d the ft-refactor post-stage diff + repointed its citation to a nonexistent `SPEC/plan-filing.md`) → `NO POST-STAGE DIFF` + `STALE CITATION`, exit 1 · stripped starter-mode's path-bearing citation → `NO RESOLVING CITATION`, exit 1 (both reverted, tree clean) · CI step body extracted from `ci.yml` by `awk` and piped to `bash` → exit 0 · Pair L with the new row → no `PAIR L MISS`, Pair O yields 5 paths after the `echo` strip (non-vacuous) · Pair H CI-verbatim → `ok` · `ruby -ryaml` parse → 13 `drift` steps, last = Pair O. Structural quality: N/A — markdown + workflow YAML, no code; no test/lint suite covers these surfaces.
**Docs touched:** `docs/CONVENTIONS.md` §"GitHub Actions CI" — roster updated (in the sweep set). All other AI-referenced docs: no change — the `drift` job's step list is restated only there and in the §7.1 fragment; `docs/CONTEXT-BUDGET.md` has no row for §7.1 fragments (the `claude/skills/*/SKILL.md` glob does not match `step-7.1-*.md`), so the +3.4 KB growth is unbudgeted by design.

## ✅ Recap

Minted §7.1 **Pair O** in `claude/skills/ft-release/step-7.1-mirror-pairs.md` (+32 lines): every `claude/skills/**/*.md` carrying `auto-commit = ` (five runners today — `ft-file-followup` default/park/starter, `ft-audit`, `ft-refactor`; `ft-release/` excluded as the check's home) must carry a non-`--quiet` `git diff --cached` and at least one `SPEC/<module>.md §"Filing commits"` citation whose module has a `^## Filing commits` heading. Three findings: `NO POST-STAGE DIFF` / `NO RESOLVING CITATION` / `STALE CITATION`. Lifted into the CI `drift` job as a 12th step (+13 lines in `ci.yml`), bound by a new Pair L mapping row; Pair K's subset parenthetical, Pair L's lifted-check count, and `docs/CONVENTIONS.md` §"GitHub Actions CI"'s roster all now name O. Key decision: the citation half resolves whatever module the runner names rather than pinning `SPEC/tasknote-selection.md`, so CORE-595's planned `SPEC/plan-filing.md` split repoints without touching this pair. Verified clean at HEAD under bash + zsh, each finding exercised by injected drift and reverted, Pair L / Pair H re-run clean, YAML parses. Scope reconciliation: `git diff --name-only` = the three declared `touches:` paths plus this tasknote and PLAN.md; no undeclared paths.

**Archived:** 2026-09-13
