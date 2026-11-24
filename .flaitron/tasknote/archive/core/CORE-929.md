---
title: roster-pin-check-docs
status: completed
tags: [docs, drift-checks]
created: 2026-11-24
due:
related-tasks: [CORE-924]
touches:
  - claude/AGENTS-snippet.md
  - tools/drift-checks.sh
  - claude/skills/ft-release/step-7.1-standing-checks.md
  - justfile
  - .github/workflows/ci.yml
  - docs/CONVENTIONS.md
---

# CORE-929 | roster-pin-check-docs

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-924]]

## 🎯 Goal

Make every place that states the rule behind CORE-924's two drift checks name the check that now enforces it: `snippet_roster_parity` and `coverage_pin`.

## ✅ Acceptance

- [x] `claude/AGENTS-snippet.md` §"One-time symlink wiring" names `snippet_roster_parity` — `grep -q snippet_roster_parity claude/AGENTS-snippet.md`
- [x] `step-7.1-standing-checks.md` runs `bash tools/drift-checks.sh snippet_roster_parity` in place of the three platform-block `diff -u` lines, and keeps the expected-set diff — `grep -c 'diff -u' claude/skills/ft-release/step-7.1-standing-checks.md` drops by 3 and `grep -q 'drift-checks.sh snippet_roster_parity' claude/skills/ft-release/step-7.1-standing-checks.md`
- [x] The `justfile` and `ci.yml` coverage comments name `coverage_pin` — `grep -q coverage_pin justfile .github/workflows/ci.yml` (both files)
- [x] `docs/CONVENTIONS.md` §"GitHub Actions CI" names both checks — `grep -c 'snippet_roster_parity\|coverage_pin' docs/CONVENTIONS.md` ≥ 2
- [x] The edits break no check — `bash tools/drift-checks.sh` exits 0, and `bash tools/drift-checks.sh snippet_roster_parity coverage_pin` still passes (the comment edits must not disturb `coverage_pin`'s reads)
- [x] No touched budgeted surface passes its cap — `bash tools/drift-checks.sh context_budget` prints no `OVER BUDGET`
- [x] CORE-924's archived note is untouched — `git diff --quiet -- .flaitron/tasknote/archive/core/CORE-924.md`

## 🧩 Subtasks

- [ ] `claude/AGENTS-snippet.md`: rewrite the closing sentence of §"One-time symlink wiring" to name CI's `snippet_roster_parity` (every push) beside §7.1's check
- [ ] `step-7.1-standing-checks.md`: keep the `ssot` derivation and the expected-set diff; replace the three platform `diff -u` lines with `bash tools/drift-checks.sh snippet_roster_parity`; rewrite the "four set-equality diffs" prose and the "anchored `grep` prefixes" paragraph to match
- [ ] `justfile`: name `coverage_pin` in the "bump both together" comment
- [ ] `.github/workflows/ci.yml`: same, in the `coverage` job's header comment
- [ ] `docs/CONVENTIONS.md` §"GitHub Actions CI": name both checks in the `drift` paragraph and the `coverage` paragraph
- [ ] Run `bash tools/drift-checks.sh`, `node --test tools/drift-checks.test.mjs`, `just check`

## 🔗 Related

- [[CORE-924]] — predecessor; added the two checks and filed this row from its doc-drift sweep and External review

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All five sites still state the rule without naming the check, and both checks exist and pass on the live tree. No later task closed this.

- [x] Read relevant source files — the two functions in `tools/drift-checks.sh`, the five sites, `docs/CONTEXT-BUDGET.md` rows, `SPEC.md` §"Tasknote frontmatter" write-once clauses and `SPEC/superseded-claims.md`

- [x] **Best Practices Review** — `N/A`: documentation and comment edits only, no code or module boundary.

- [x] **Archive skim** — see Discovery Notes

- [x] **Drift check** — see Discovery Notes

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Archive skim: path greps over `archive/core/` hit hundreds of notes (`claude/AGENTS-snippet.md` 570, `docs/CONVENTIONS.md` 668, `step-7.1-standing-checks` 74), too broad to read, so I narrowed to the two check names: only CORE-924 (filed this row) and CORE-936 (extended the same drift-checks shape, names neither site) mention them. The roster-derivation history (CORE-463.5, CORE-465) I took from the citations inside `step-7.1-standing-checks.md` itself, not from reading those notes. Only CORE-924 is load-bearing.
- Drift check: the PLAN line matches the CORE-924 sweep and its External review. One mismatch: the row says `snippet_roster_parity` replaces step-7.1's "four roster diffs", but the function covers three (each platform block against the claude block). The fourth diff, the claude roster against the shipped inventory minus non-adopter skills, has no check.
- Clarifications (AskUserQuestion): (1) leave CORE-924's archived Phase 4 untouched. Its "drift, filed CORE-929" line was true when written, so the superseded-claims carve-out does not apply and write-once holds; the row's "Updates: … CORE-924.md Phase 4" is not executed. (2) keep the fourth diff and replace only the three platform diffs.
- Budgets: `claude/AGENTS-snippet.md` is at 13,489 of 13,800, so about 310 bytes of headroom; the edit must stay well under that. `claude/skills/ft-release/**` is at 108,103 of 113,000, and the step-7.1 edit is net-negative.
- Comment edits must not disturb `coverage_pin`'s reads: the justfile comment sits inside the `coverage` recipe body, so it avoids `MIN=` and `DC="diff-cover@`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: extended `step-7.1-standing-checks.md`'s existing "run the function CI runs" shape (`shipped_skill_parity`, `context_budget`) for the platform-block diffs.
- Minimal refactor gate: none beyond the Acceptance edits. The "anchored `grep` prefixes" paragraph went because the three greps it explains are gone; the function's own comments now carry that rule.
- Tests: N/A — prose and comment edits. The existing seeded cases for both checks stay green.
- `claude/AGENTS-snippet.md` grew 13,489 → 13,544 (98% of its 13,800 cap, still `NEAR CAP`); `claude/skills/ft-release/**` shrank 108,103 → 108,019.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (final tree, after the review fixes):

```text
bash tools/drift-checks.sh                                        → 0
bash tools/drift-checks.sh snippet_roster_parity coverage_pin     → 0   (both ok)
node --test tools/drift-checks.test.mjs                           → 0   (49 pass, 0 fail)
bash tools/drift-checks.sh context_budget                         → 0   (no OVER BUDGET; AGENTS-snippet 13,544 of 13,800, NEAR CAP)
just check                                                        → 0
grep -c 'diff -u' step-7.1-standing-checks.md                     → 3    (was 6)
grep -q snippet_roster_parity claude/AGENTS-snippet.md            → 0
grep -q 'drift-checks.sh snippet_roster_parity' step-7.1 file     → 0
grep -q coverage_pin justfile / ci.yml                            → 0 / 0
grep -c 'snippet_roster_parity\|coverage_pin' docs/CONVENTIONS.md → 2
git diff --quiet -- archive/core/CORE-924.md                      → 0
```

Lint/type-check: N/A beyond `just check` (viz lint, typecheck and build ran inside it); no viz code changed. Duplication, dead code, stale docs: the "anchored `grep` prefixes" paragraph was dead once its greps went and was removed; the stale "diffs them only at release" comment in `tools/drift-checks.sh` was reworded.

External review (`/code-review medium` over this task's diff, a context that did not write it): no blocker. Two notes, both fixed: (1) step-7.1's "The `diff` must produce no output" was ambiguous between the one visible diff and the function's own; now "the expected-set `diff`", with the function's `ROSTER DRIFT` diff named separately. (2) the `snippet_roster_parity` header comment in `tools/drift-checks.sh` still said §7.1 diffs the blocks only at release; reworded, and `tools/drift-checks.sh` added to `touches:`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

Doc-drift sweep (per README §"AI-referenced docs"): `README.md` no change · `AGENTS.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` updated (this task) · `codex/AGENTS-snippet.md` / `cursor/AGENTS-snippet.md` / `grok/AGENTS-snippet.md` no change ("§7.1 diffs it against the SSOT as a set" stays true: §7.1 runs the function and adds the expected-set diff) · `docs/CONVENTIONS.md` updated (this task) · `CONTRIBUTING.md` / `SECURITY.md` / `docs/AGENT-NEUTRALITY.md` / `docs/PLATFORMS.md` / `claude/CAPABILITIES.md` / `docs/AGENT-COMPAT.md` / `docs/EXTERNAL-AGENTS.md` / `docs/WORKTREES.md` / `docs/VISION.md` no change.

**Final Summary:**

CORE-929 makes the docs and comments behind CORE-924's two drift checks name them: the snippet roster rule, the release skill's §7.1 diff, the justfile and ci.yml coverage comments, and CONVENTIONS all now point at `snippet_roster_parity` and `coverage_pin`.

- Changed: `claude/AGENTS-snippet.md` (+3/−3), `claude/skills/ft-release/step-7.1-standing-checks.md` (three platform `diff -u` lines replaced by `bash tools/drift-checks.sh snippet_roster_parity`; expected-set diff kept; prose and the anchored-grep paragraph rewritten), `justfile` and `.github/workflows/ci.yml` (one comment line each), `docs/CONVENTIONS.md` (two sentences), `tools/drift-checks.sh` (one stale comment reworded).
- Verification: `just check` → 0, drift self-test 49/49, `context_budget` ok.
- Deviations from the row, both operator-decided: CORE-924's archived Phase 4 left untouched (write-once; its line was true when written), and step-7.1 keeps the fourth diff because the function covers only the three platform blocks.
- Refactors: none. `touches:` reconciliation: declared 6 after adding `tools/drift-checks.sh`, changed 6; the one added during the External review fix.
- Maintainability: the platform-block roster rule now lives in one function that CI and the release walk both run. `claude/AGENTS-snippet.md` is now at 98% of its cap, so CORE-920.3's trim has less room.
- Learnings: N/A.

**Archived:** 2026-11-24
