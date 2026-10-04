---
title: skill-roster-diet audit
status: completed
tags: []
created: 2026-09-18
due:
related-tasks: [CORE-EPIC-603, CORE-603.1, CORE-603.2, CORE-603.3, CORE-603.4]
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

# CORE-603.N | skill-roster-diet audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-603]]

## 🎯 Goal

Verify the completed `CORE-EPIC-603` (`skill-roster-diet`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded — two misses fixed inline; zero `/ft-file-followup` candidates.  Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-603.N — audit CORE-EPIC-603` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-603.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-603.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-603` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-603.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-603]] — parent epic
- [[CORE-603.1]] — discovery (fleet survey, scoping table)
- [[CORE-603.2]] — retire `ft-flowtron` + `ft-stats`
- [[CORE-603.3]] — fold `ft-audit-context` → `ft-audit` `context` domain
- [[CORE-603.4]] — trim seven `description:` fields to ≤400 chars

---
## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/ft-close-epic CORE-603.N` invoked explicitly; Step 2 pre-flight passed — parent `CORE-EPIC-603` active under `## Medium`, all four children `[x]` (`.1` 2026-09-17, `.2` 2026-09-17, `.3` 2026-09-18, `.4` 2026-09-18), `.N` unopened. Full cohort; no early-audit decision.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — N/A (verification pass; the two inline fixes are single-word doc edits).   for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — self-referential (the four cohort notes in `archive/core/`); CORE-571/572/573 read via `.1`'s precedent citations.   skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — see Discovery Notes; every path the children cite exists at HEAD.   file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] No clarifications needed — full cohort closed, scope unambiguous.  Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated (canonical epic-audit list; no `touches:` — inline fixes are audit findings, not a planned deliverable) with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Cohort inventory** (from each child's archived Final Summary + Implementation Notes):

- **[[CORE-603.1]]** — Discovery. Fleet survey (21 adopters): `ft-flowtron` 3 / `ft-stats` 7 / `ft-audit-context` 5 referencing files; 9,606 B of always-on `description:` frontmatter, 6,638 of it in the seven skills >700 chars. Filed `.2`–`.4` sequential; operator decisions: fold (not demote) `ft-audit-context`, trim floor = trigger + flags ≤400 chars, delete Pair E, `CONTEXT-BUDGET.md` release-measured not per child, `ft-release` diet out of scope.
- **[[CORE-603.2]]** — Retired `ft-flowtron` + `ft-stats` (six shipped paths, CORE-573 demote shape). Pair E deleted from `ci.yml` / §7.1 / Pair L mapping; Pair A 3→2 surfaces; 16 roster/rationale sites swept (`SPEC/model.md` ×3, `SPEC/plan-filing.md` ×3, `PLATFORMS.md` 14→12, three non-Claude snippets, `ft-update`, `AGENT-NEUTRALITY.md`, `GLOSSARY.md`, `CONVENTIONS.md`); two `docs/MIGRATION.md` retired rows (v5.29.0); `.gitignore` `STATS.md` block dropped. Net −208 lines, 24 files.
- **[[CORE-603.3]]** — `passes/context.md` (new, 8.0 KB, five passes, no forker placeholders); `ft-audit-context` retired (three paths); `context` registered on seven enumeration surfaces ("eight domains"); 15 roster sites swept (`PLATFORMS.md` 12→11); MIGRATION §1.7 + §3.8, `ft-new-project` Step 4, `SPEC/unattended-candidacy.md` repointed at `/ft-audit context`; retired row (v5.29.0). +1/−3 files, 26 paths.
- **[[CORE-603.4]]** — Seven Claude `description:` fields trimmed to ≤400 chars (224–397); `ft-audit` gained one body glossary line carrying the per-domain hints; Codex twins `ft-task` + `ft-file-followup` trimmed in their own voice; Pairs B/J/M clean. 9 files.

**Drift check at HEAD (fa7b93a).** Shipped inventory: `claude/skills` 11 · `codex/skills` 11 · `claude/commands` 11 — matches `docs/PLATFORMS.md` (`:261`, `:265`, `:290`). `passes/` = 8 files incl. `context.md`; `SPEC/layout.md` §"Skill namespace" enumerates all 11. Self-wiring diffs (`claude/` ↔ `.claude/`) print nothing. All 11 `description:` fields ≤601 chars (the seven trimmed: 225–398 incl. newline). `CONTEXT-BUDGET.md` still carries the 2026-09-14 ledger naming the three retired skills — by design (release-measured, `Measured 2026-09-14 at v5.28.0` header), consistent with all three children's deferral.

**Early-audit decision:** none — full cohort.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A (verification pass; inline fixes follow the children's own residue-sweep shape).   extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — N/A (two one-word doc corrections, no refactor).   refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution — audit findings below; two inline fixes applied

- [x] Updated/added tests for non-trivial behavior — N/A (no executable surface)

**Implementation Notes:**

**Coherence pass — re-ran every child's residue and parity check against HEAD:**

- `.2` residue grep (`ft-flowtron` / `ft-stats` / `STATS.md`, A2 exclusions) → prints nothing.
- `.3` residue grep (`ft-audit-context` / `audit-context`, A4 exclusions) → prints nothing; `seven domain|seven-file|all seven` → prints nothing.
- CI `drift` job, all ten steps extracted from `ci.yml` and run locally (wrapper-name, parity, context budget, Pairs A/B/C/J/M/N/O) → every step exit 0.
- §7.1 symlink-roster derivation (`step-7.1-standing-checks.md`, five `diff -u` blocks) → all print nothing; exclusion list reads `ft-audit` / `ft-audit-repo` / `ft-new-project` / `ft-release`, matching `docs/PLATFORMS.md` §"Installed-surface policy" columns.
- `ft-audit` domain set consistent across `SKILL.md` description + "eight domains" + body glossary line + §1 step 1, `commands/ft-audit.md`, `codex/skills/ft-audit/SKILL.md`, `docs/GLOSSARY.md:17`, `docs/MIGRATION.md` §1.2.1, and `passes/` on disk.
- `docs/MIGRATION.md` retired-skills table: three v5.29.0 rows; `ft-audit-context` and `ft-stats` rows cross-ref `ft-flowtron`'s agent-home note — resolves.
- Description-size claims: no swept doc states description byte counts, so `.4`'s trim left nothing stale in the sweep set.

**Findings — two stale residues the children's greps could not see (both fixed inline):**

1. `docs/MIGRATION.md:224` — "(all audit variants, release, **stats**, new-project, etc.)" — bare word `stats`, invisible to `.2`'s `ft-stats` / `STATS.md` patterns. Fixed: dropped `stats, `.
2. `docs/PLATFORMS.md:424` — "holds that rule once for all **12** wrappers" — `.2` wrote 14→12 here, `.3`'s 12→11 sweep listed `:35 :74 :264 :266 :291` and missed this row. Fixed: `12` → `11`. A follow-up count sweep (`\b(12|14) (wrappers|skills|stubs|bodies)\b|all (12|14)\b`) prints nothing else.

**Not a miss — confirmed deferrals:** `docs/CONTEXT-BUDGET.md` per-skill ledger (`:136-137` still lists `ft-audit-context` / `ft-stats` / `ft-flowtron` at 2026-09-14 sizes) — release-measured by the doc's own header and by all three children's deferral; `/ft-release` re-measures. `docs/PLATFORMS.md:118` "18 skills (measured 2026-08-11)" — dated with an explicit "inventory has grown since" caveat; not stale.

**`/ft-file-followup` candidates:** none. Both misses were one-word and fixed inline; no larger gap surfaced.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only); CI `drift` job steps run locally instead (see Testing Notes)

- [x] Ran lint/type-check on changed code — `git diff --check` → 0

- [x] **Verification receipt** — see Testing Notes.   recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) N/A — Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `.2` residue `git grep … | grep -v …` → exit 1 (no match)
- `.3` residue `git grep … | grep -v …` → exit 1 (no match); seven-domain grep → exit 1
- CI `drift` job (10 steps, extracted and run locally) → all exit 0
- §7.1 symlink-roster derivation d1–d5 → all `diff -u` exit 0
- `diff <(ls claude/skills) <(ls .claude/skills)` + commands twin → 0
- `ls claude/skills | wc -l` / `ls codex/skills | wc -l` / `ls claude/commands | wc -l` → 11 / 11 / 11
- post-fix count sweep `git grep -E '\b(12|14) (wrappers|skills|stubs|bodies)\b|all (12|14)\b'` (archive/history excluded) → exit 1
- `git diff --check` → 0
- Structural: two single-word edits in prose; no duplication, dead content, or surface growth.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 16 of 18 "no change"; 2 updated (both audit findings): `README.md` no change · `AGENTS.md` no change (roster sentence "Three bundled skills are utility-only" matches `.3`) · `SPEC.md` no change · `docs/MIGRATION.md` **updated** (`:224` bare `stats` dropped; retired-skills table already carries the three v5.29.0 rows) · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change (lifted-pairs list already `A, B, C, J, M, N, O`) · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` **updated** (`:424` `12` → `11` wrappers; `:261/:265/:290` already 11) · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change · `docs/WORKTREES.md` no change · `docs/VISION.md` no change.   for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/plan-filing.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Audited the closed `CORE-EPIC-603` (skill-roster-diet) cohort — four children that retired `ft-flowtron`, `ft-stats`, and `ft-audit-context` (the last folded into `ft-audit` as the eighth `context` domain) and trimmed the seven heaviest `description:` fields to ≤400 chars, taking the shipped inventory 14 → 11 skills. Re-ran every child's residue grep, the full CI `drift` job, and the §7.1 symlink-roster derivation at HEAD: all clean. Two one-word stale residues surfaced that slug-based greps could not see — `docs/MIGRATION.md:224` bare `stats`, `docs/PLATFORMS.md:424` "12 wrappers" — both fixed inline. No follow-ups to file.

- **Files:** `docs/MIGRATION.md` (1 word), `docs/PLATFORMS.md` (1 char), `.flowtron/PLAN.md` (`.N` stub flip + parent flip + cohort move), this tasknote (scaffolded + archived).
- **Verification:** `.2`/`.3` residue greps → no match; CI drift ×10 → 0; §7.1 d1–d5 → 0; counts 11/11/11; post-fix count sweep → no match; `git diff --cached --check` → 0.
- **Refactors:** none. Deferred (by design, not by this audit): `docs/CONTEXT-BUDGET.md` per-skill ledger → `/ft-release` re-measure.
- **Documentation verdict:** doc-drift sweep 16/18 no change, 2 updated (the two findings).
- **`touches:` reconciliation:** none declared (audit); changed the two doc files above + PLAN + this note. Both doc edits are audit findings, recorded in Implementation Notes.
- **Maintainability effect:** the cohort's roster claims now agree on every swept surface (11 skills, 11 wrappers, eight domains, three v5.29.0 retired rows), so the next `/ft-release` inherits a consistent baseline and only the byte ledger remains to re-measure.

> **Parent-flip decision:** operator confirmed **Yes** at the 📦 gate — `CORE-EPIC-603` flipped to stub form and the parent + five children moved atomically to the top of `## Completed` (2026-09-18). `## Medium` left empty, matching this PLAN's existing no-placeholder style for `## High` / `## Low`.

**Archived:** 2026-09-18
