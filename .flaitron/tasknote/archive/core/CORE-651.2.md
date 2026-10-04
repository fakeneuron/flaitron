---
title: pair-q-out-of-repo-skip
status: completed
tags: []
created: 2026-09-21
due:
related-tasks: [CORE-EPIC-651, CORE-643, CORE-622.3]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - .github/workflows/ci.yml
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - docs/CONVENTIONS.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-651.2 | pair-q-out-of-repo-skip

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-651]]

## 🎯 Goal

Teach Pair Q (`.github/workflows/ci.yml` + its `step-7.1-mirror-pairs.md` catalogue entry) to skip citations whose path is absolute or `~`-rooted, so the `brand/BRAND.md:18` / `brand/README.md:22` citations of `~/Code/natabula/docs/DESIGN-STANDARDS.md` stop reporting MISSING FILE, and replay the drift job locally to 16/16.

## ✅ Acceptance

- [x] Pair Q step replayed locally exits 0 with no `MISSING FILE` line for `brand/*.md` — `awk '…- name: Pair Q …' .github/workflows/ci.yml | bash -e`
- [x] The full `drift` job replays locally 16/16 (checkout + 15 named steps all `ok`) — the §7.1 runner loop extended to the four non-Pair steps
- [x] Pair L prints nothing after the change — its §7.1 fence
- [x] The skip is a path-shape rule, not a `brand/` allowlist: an absolute (`/…`) or `~`-rooted path skips, an in-repo missing path still reports `MISSING FILE` — standalone replay of the `case` line on `~/x.md`, `/x.md`, `SPEC/nope.md`
- [x] Both surfaces name the out-of-repo skip — `grep -q "rooted" .github/workflows/ci.yml && grep -q "rooted" claude/skills/ft-release/step-7.1-mirror-pairs.md`
- [x] Context budget still passes — the CI `Context budget` step replayed locally

## 🧩 Subtasks

- [x] Add the absolute / `~`-rooted skip to the Pair Q `case` skip line in `ci.yml`, quoted so the case pattern is not tilde-expanded
- [x] Update the step's `#` design note to name the skip
- [x] Update the catalogue entry's CI-step prose (`MISSING FILE` meaning) in `step-7.1-mirror-pairs.md`
- [x] Replay Pair Q, the full drift job, and Pair L locally

## 🔗 Related

- [[CORE-EPIC-651]] — parent epic (gate-reliability)
- [[CORE-643]] — brand-kit back-port that introduced the `~`-rooted citations
- [[CORE-622.3]] — landed Pair Q and its skip rules

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Reproduced locally — Pair Q reports `MISSING FILE` on both `brand/*.md` citations of `~/Code/natabula/docs/DESIGN-STANDARDS.md`; the other 14 named drift steps pass (15/16). The step's skip rule covers placeholders and regex escapes only; an out-of-repo path has no escape, so the CORE-643 back-port reddens CI on every push until this lands.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- Source: `.github/workflows/ci.yml` Pair Q step (L422–464). Skip line is `case "$path$sec" in ''|*'<'*|*'…'*|*'\'*) continue ;; esac`; the concatenation starts with `$path`, so `/*` and `'~/'*` anchor to the path start. The `~` must be quoted — bash tilde-expands unquoted case patterns.
- Only the backticked extraction shape can carry `~` (the bare-shape char class excludes it), so the two brand citations are the whole live set: `git grep -n '`~/' -- '*.md'` beyond archives → `brand/BRAND.md:18`, `brand/README.md:22`.
- Pair L (§7.1 fence, L167–213) compares repo-path tokens after stripping `#` comment lines and dropping non-repo-root first segments; neither a `~/` pattern nor the comment edit adds a token, so the `Reads:` line stays as is — verified by running the fence in Phase 3.
- Best practices: extend the existing skip `case` in place (one rule, one line) rather than a second `case` or a `brand/` allowlist; the catalogue entry's `MISSING FILE` sentence is the documented meaning and must say the same thing as the shell comment. No refactor.
- Archive skim: 9 notes mention Pair Q; load-bearing are [[CORE-622.3]] (landed the step + skip rule, retired N/O halves into it), [[CORE-631.2]] (moved the shell into `ci.yml`, Pair L binds `Reads:`), [[CORE-643]] (brand-kit back-port that wrote the `~`-rooted citations). Nothing prior on out-of-repo paths.
- Drift check: line numbers `brand/BRAND.md:18` / `brand/README.md:22` match; drift job is 16 steps (checkout + 15 named), so "16/16" is the whole job; budget `claude/skills/ft-release/**` at 113,772 / 125,000 — a two-sentence catalogue edit fits.
- No clarifications needed (--fast). Assumptions: (1) an out-of-repo citation is *skipped*, not resolved — Pair Q reads repo files only, and a citation into a private sibling layer is by definition unverifiable from CI; (2) the `~`-rooted brand citations stay as written — whether they should point at a public surface is CORE-EPIC-652's question, not this task's.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `ci.yml` Pair Q: extended the existing skip `case` with `/*|'~/'*` (the `~/` quoted — bash tilde-expands unquoted case patterns) and grew the step's design note by one sentence naming the rule. No new `case`, no allowlist, no refactor.
- `step-7.1-mirror-pairs.md` Pair Q catalogue: the `MISSING FILE` sentence now says an absolute / `~`-rooted path is skipped, not reported, citing [[CORE-651.2]]. `Reads:` untouched — Pair L verified.
- `docs/CONVENTIONS.md` §"Section citations may target a heading or a bold-lead paragraph" → "A citer's obligations": one clause so the documented rule matches the shell.
- Tests: N/A — the check *is* the test; verified by replay (Phase 3).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Pair Q replay (`awk … | bash -e`) → 0; the two `brand/*.md` `MISSING FILE` lines are gone.
- Full drift job replay, all 15 named steps under `bash -e` (checkout implicit) → 15/15 ok, 16/16 with checkout. Baseline before the change was 15/16 (Pair Q).
- Pair L §7.1 fence → 0, printed nothing.
- Case-line shape check (`~/zzz.md` → skip, `/zzz.md` → skip, `SPEC/nope.md` → MISSING, `SPEC/gates.md` → resolve, `<file>.md` → skip) → 0; the skip is a path-shape rule, not a `brand/` allowlist.
- `grep -q rooted` on both surfaces → 0.
- Context budget step → ok; `claude/skills/ft-release/**` 113,985 / 125,000.
- `ruby -ryaml` parse of `ci.yml` → ok, 16 drift steps.
- Structural quality: one case-pattern extension, no duplication, no dead code, no public-surface growth; the three prose surfaces (shell comment, catalogue, CONVENTIONS) say the same thing.
- 👁️ CONFIRM: N/A — no frontend change (suppressed under `--fast` regardless).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

- Doc-drift sweep: `README.md` no change · `AGENTS.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` **updated** (citer-obligations clause for out-of-repo paths) · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change.
- Changed: `.github/workflows/ci.yml` (+6/−2, one shell line + comment), `claude/skills/ft-release/step-7.1-mirror-pairs.md` (1 sentence), `docs/CONVENTIONS.md` (1 clause).
- Verification: drift job 16/16 locally (was 15/16); Pair L clean; shape check proves the skip is absolute/`~` only and in-repo misses still report.
- Refactors: none; deferred nothing.
- `touches:` reconciliation: declared `ci.yml`, `step-7.1-mirror-pairs.md`, `docs/CONVENTIONS.md`; `git diff --name-only` matches (CONVENTIONS added to `touches:` during Phase 4 when the sweep surfaced it).
- Maintainability effect: Pair Q now has an out-of-repo escape, so a citation into a private sibling layer neither reddens CI nor forces the citer into the placeholder shape; CORE-EPIC-652 decides separately whether those `brand/` pointers should exist at all.

**Archived:** 2026-09-21
